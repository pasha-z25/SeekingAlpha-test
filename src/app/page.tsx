import { INTERNAL_API_URL } from '@/utils/constants';
import { BASE_URL, EXTERNAL_API_URL } from '@/utils/env';
import { getData } from '@/utils/helpers';
import {
  API_ENDPOINTS,
  type FactorGradesTable,
  type RatingsSummaryType,
  type QuantRankingsType,
} from '@/utils/types';

import HomePage from '@/views/HomePage';

export default async function Home() {
  const user = await getData<{ premium: boolean }>(
    `${EXTERNAL_API_URL}${API_ENDPOINTS.user}`,
  );
  const quantRanking = await getData<QuantRankingsType>(
    `${EXTERNAL_API_URL}${API_ENDPOINTS.ranking}`,
  );

  const ratingsSummary = user.premium
    ? await getData<RatingsSummaryType>(
        `${EXTERNAL_API_URL}${API_ENDPOINTS.ratings}`,
      )
    : null;
  const factorGrades = user.premium
    ? await getData<FactorGradesTable>(`${BASE_URL}${INTERNAL_API_URL}`)
    : null;

  return (
    <HomePage
      quantRanking={quantRanking}
      factorGrades={factorGrades}
      ratingsSummary={ratingsSummary}
    />
  );
}
