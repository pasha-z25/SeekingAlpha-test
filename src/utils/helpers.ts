import type { FactorGradesTable, GradesApiData, NowFormat } from './types';

/**
 * Asynchronously fetches data from the specified endpoint using Fetch API.
 *
 * The function performs an HTTP request (GET by default), parses the JSON response,
 * checks for errors in the response (both in the JSON body and HTTP status),
 * and returns the data. In case of an error, it rejects the promise with an Error object.
 *
 * Supports generic type `T` for typing the returned data, allowing strong typing with TypeScript
 * (e.g., `getData<MyResponseType>('/api/users')`).
 *
 * @example
 * // Example with typing
 * interface User {
 *   id: number;
 *   name: string;
 * }
 *
 * const users = await getData<User[]>('/api/users');
 * console.log(users); // User[]
 *
 * @example
 * // Error handling
 * try {
 *   const data = await getData('/api/invalid');
 * } catch (error) {
 *   console.error(error.message); // 'Something went wrong!' or specific message
 * }
 *
 * @param endpoint - The URL of the endpoint to request (absolute or relative path).
 *                   Must be a valid string, e.g., 'https://api.example.com/users'
 *                   or '/api/users' (if base URL is configured in fetch).
 *
 * @typeParam T - The expected type of the response data (defaults to `unknown`).
 *                Allows TypeScript to infer the result type automatically.
 *
 * @returns Promise<T> - A promise that resolves with the API data (parsed JSON).
 *
 * @throws Error - Thrown in case of:
 *                 - Error in response body (result.status === 'error'):
 *                   Uses `result.error.message` if available, otherwise 'Something went wrong!'.
 *                 - HTTP errors (!response.ok, e.g., 4xx/5xx): 'Something went wrong!'.
 *                 - Network errors (e.g., CORS, timeout): Rejects the promise with the original error.
 *
 * @remarks
 * - The function uses the global `fetch`, so for custom settings (headers, credentials)
 *   use a wrapper with `fetch` options.
 * - Does not handle non-JSON responses — assumes the API always returns JSON.
 * - Recommended to use with `try/catch` for error handling.
 * - Compatible with async/await and .then/.catch.
 */
export async function getData<T = unknown>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(endpoint);
    const result = await response.json();

    if (result.status === 'error') {
      throw new Error(
        result.error?.message ? result.error.message : 'Something went wrong!',
      );
    }
    if (!response.ok) throw new Error('Something went wrong!');

    return result;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

/**
 * Parser for factor grades with API.
 *
 * @param data - Raw data from the API (one of three formats).
 * @returns Normalized object {factor: grade}.
 */
export function parseFactorGrades(data: GradesApiData): Record<string, string> {
  const result: Record<string, string> = {};

  // Type guard for /6m: { data: [ ['Growth', 'D'], ... ] }
  if ('data' in data && Array.isArray(data.data)) {
    data.data.forEach(([factor, grade]) => {
      if (typeof factor === 'string' && typeof grade === 'string') {
        result[factor] = grade;
      }
    });
    return result;
  }

  // Type guard for /now: { Valuation: { current: 'F' }, ... }
  const isNowFormat = (obj: GradesApiData): obj is NowFormat => {
    return Object.values(obj).every(
      (value) =>
        typeof value === 'object' &&
        value !== null &&
        'current' in value &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof (value as any).current === 'string',
    );
  };

  if (isNowFormat(data)) {
    // Now data — NowFormat, so Object.entries returns [string, {current: string}]
    Object.entries(data).forEach(([factor, details]) => {
      if (typeof factor === 'string') {
        result[factor] = details.current;
      }
    });
    return result;
  }

  // Format /3m: { Valuation: 'F', ... } — just copy
  Object.entries(data).forEach(([factor, grade]) => {
    if (typeof factor === 'string' && typeof grade === 'string') {
      result[factor] = grade;
    }
  });

  return result;
}

/**
 * Combines three sets of factor grades into one for.
 *
 * @param now - Grades for "Now" (Record<string, string>).
 * @param threeM - Grades for "3m ago".
 * @param sixM - Grades for "6m ago".
 * @returns Table { factor: { now: string, threeM: string, sixM: string } }.
 */
export function combineFactorGrades(
  now: Record<string, string>,
  threeM: Record<string, string>,
  sixM: Record<string, string>,
): FactorGradesTable {
  // Collect all unique factors (in case one is missing)
  const allFactors = new Set([
    ...Object.keys(now),
    ...Object.keys(threeM),
    ...Object.keys(sixM),
  ]);

  const result: FactorGradesTable = {};

  for (const factor of allFactors) {
    result[factor] = {
      now: now[factor] ?? '',
      threeM: threeM[factor] ?? '',
      sixM: sixM[factor] ?? '',
    };
  }

  return result;
}

// Function to convert key to display name (SA_Analysts -> SA Analysts)
export const formatSourceName = (key: string): string => {
  return key.replace(/_/g, ' '); // Replace underscores with spaces
};

// Function for formatting score (always 2 decimal places)
export const formatScore = (score: number): string => {
  return score.toFixed(2);
};
