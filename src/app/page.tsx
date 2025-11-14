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
  const [userRes, quantRes] = await Promise.all([
    getData<{ premium: boolean }>(`${EXTERNAL_API_URL}${API_ENDPOINTS.user}`),
    getData<QuantRankingsType>(`${EXTERNAL_API_URL}${API_ENDPOINTS.ranking}`),
  ]);
  const user = userRes;
  const quantRanking = quantRes;

  let ratingsSummary: RatingsSummaryType | null = null;
  let factorGrades: FactorGradesTable | null = null;

  if (user.premium) {
    [ratingsSummary, factorGrades] = await Promise.all([
      getData<RatingsSummaryType>(
        `${EXTERNAL_API_URL}${API_ENDPOINTS.ratings}`,
      ),
      getData<FactorGradesTable>(`${BASE_URL}${INTERNAL_API_URL}`),
    ]);
  }

  return (
    <HomePage
      quantRanking={quantRanking}
      factorGrades={factorGrades}
      ratingsSummary={ratingsSummary}
      isPremium={user.premium}
    />
  );
}
