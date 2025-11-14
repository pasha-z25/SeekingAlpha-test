import fetch from 'node-fetch';

import { NextResponse } from 'next/server';
import { EXTERNAL_API_URL } from '@/utils/env';
import {
  API_ENDPOINTS,
  type NowFormat,
  type SixMFormat,
  type ThreeMFormat,
} from '@/utils/types';
import { combineFactorGrades, parseFactorGrades } from '@/utils/helpers';

export async function GET() {
  let factorGradesTable = {};

  try {
    const responseNow = await fetch(
      `${EXTERNAL_API_URL}${API_ENDPOINTS.gradesNow}`,
    );
    const resultNow = (await responseNow.json()) as NowFormat;
    const factorGradesNow = parseFactorGrades(resultNow);

    const response3m = await fetch(
      `${EXTERNAL_API_URL}${API_ENDPOINTS.grades3m}`,
    );
    const result3m = (await response3m.json()) as ThreeMFormat;
    const factorGrades3m = parseFactorGrades(result3m);

    const response6m = await fetch(
      `${EXTERNAL_API_URL}${API_ENDPOINTS.grades6m}`,
    );
    const result6m = (await response6m.json()) as SixMFormat;
    const factorGrades6m = parseFactorGrades(result6m);

    factorGradesTable = combineFactorGrades(
      factorGradesNow,
      factorGrades3m,
      factorGrades6m,
    );

    return NextResponse.json({ ...factorGradesTable }, { status: 200 });
  } catch (error) {
    console.error('Getting data error:', error);
    return NextResponse.json(
      { message: 'Error getting data' },
      { status: 500 },
    );
  }
}
