'use client';

import type {
  FactorGradesTable,
  QuantRankingsType,
  RatingsSummaryType,
} from '@/utils/types';

import Card from '@/components/Card';

interface IHomeProps {
  quantRanking: QuantRankingsType;
  factorGrades: FactorGradesTable | null;
  ratingsSummary: RatingsSummaryType | null;
}

export default function Home({
  quantRanking,
  factorGrades,
  ratingsSummary,
}: IHomeProps) {
  console.log('Home page view', {
    quantRanking,
    factorGrades,
    ratingsSummary,
  });

  return (
    <section>
      <h1>Home Page</h1>
      <Card title="Card title">Some card content</Card>
      <Card>Another card content</Card>
    </section>
  );
}
