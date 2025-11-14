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
  isPremium: boolean;
}

export default function Home({
  quantRanking,
  factorGrades,
  ratingsSummary,
  isPremium,
}: IHomeProps) {
  return (
    <section className="py-4">
      <div className="container">
        <h1 className="mb-4 text-4xl">
          Seeking Alpha <sup className="text-orange-500">&alpha;</sup>
        </h1>
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
        {!isPremium && (
          <h3 className="text-xl font-medium mt-6">
            Upgrade to{' '}
            <a
              className="text-primary"
              href="https://seekingalpha.com/subscriptions/premium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Premium
            </a>{' '}
            to see full info
          </h3>
        )}
      </div>
    </section>
  );
}
