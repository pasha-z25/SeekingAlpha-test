'use client';

import type {
  FactorGradesTable,
  QuantRankingsType,
  RatingsSummaryType,
} from '@/utils/types';
import {
  getFactorGradesTable,
  getRankingCardContent,
  getRatingsSummaryTable,
} from './content-helpers';

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
  return (
    <section>
      <div className="container">
        <h1 className="mb-4 text-primary">Home Page</h1>
        <div className="grid gap-4 items-start md:grid-cols-2 lg:grid-cols-3">
          {ratingsSummary && (
            <Card title="Ratings Summary">
              {getRatingsSummaryTable(ratingsSummary)}
            </Card>
          )}
          {factorGrades && (
            <Card title="Factor Grades">
              {getFactorGradesTable(factorGrades)}
            </Card>
          )}
          <Card title="Quant Ranking">
            {getRankingCardContent(quantRanking)}
          </Card>
        </div>
      </div>
    </section>
  );
}
