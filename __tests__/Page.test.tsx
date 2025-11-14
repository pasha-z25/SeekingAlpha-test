import { render, screen } from '@testing-library/react';
import Home from '@/views/HomePage/Page';
import type { QuantRankingsType } from '@/utils/types';

const mockQuant: QuantRankingsType = {
  sector: 'Tech',
  industry: 'Technology Hardware',
  rankings: {
    overall: { rank: 3, total: 300 },
    sector: { rank: 2, total: 200 },
    industry_specific: { rank: 1, total: 100 },
  },
};

test('renders Quant Ranking always', () => {
  render(
    <Home
      quantRanking={mockQuant}
      factorGrades={null}
      ratingsSummary={null}
      isPremium={false}
    />,
  );

  expect(screen.getByText('Quant Ranking')).toBeInTheDocument(); // title from Card
});

test('hides Ratings Summary for non-premium', () => {
  render(
    <Home
      quantRanking={mockQuant}
      factorGrades={null}
      ratingsSummary={null}
      isPremium={false}
    />,
  );
  expect(screen.queryByText('Ratings Summary')).not.toBeInTheDocument();
});

test('renders Factor Grades table', () => {
  const mockGrades = { Valuation: { now: 'F', threeM: 'B-', sixM: 'D' } };
  render(
    <Home
      quantRanking={mockQuant}
      factorGrades={mockGrades}
      ratingsSummary={{}}
      isPremium={true}
    />,
  );
  expect(screen.getByText('Valuation')).toBeInTheDocument();
  expect(screen.getByText('F')).toBeInTheDocument();
});
