import { COMPANY_SITE } from '@/utils/env';
import { formatScore, formatSourceName } from '@/utils/helpers';
import type {
  FactorGradesTable,
  QuantRankingsType,
  RatingsSummaryType,
} from '@/utils/types';

export const getRankingCardContent = (data: QuantRankingsType) => (
  <>
    <div className="content rows">
      <div className="row py-1">
        <p className="flex gap-4 items-center justify-between">
          <span className="font-bold">Sector</span>
          <span className="text-primary text-right">{data.sector}</span>
        </p>
      </div>
      <div className="row py-1 border-t-2 border-t-gray-100">
        <p className="flex gap-4 items-center justify-between">
          <span className="font-bold">Industry</span>
          <span className="text-primary text-right">{data.industry}</span>
        </p>
      </div>
      <div className="row py-1 border-t-2 border-t-gray-100">
        <p className="flex gap-4 items-center justify-between">
          <span className="font-bold">Ranked Overall</span>
          <span className="text-primary text-right">
            {data.rankings.overall.rank} out of {data.rankings.overall.total}
          </span>
        </p>
      </div>
      <div className="row py-1 border-t-2 border-t-gray-100">
        <p className="flex gap-4 items-center justify-between">
          <span className="font-bold">Ranked in Sector</span>
          <span className="text-primary text-right">
            {data.rankings.sector.rank} out of {data.rankings.sector.total}
          </span>
        </p>
      </div>
      <div className="row py-1 border-t-2 border-t-gray-100">
        <p className="flex gap-4 items-center justify-between">
          <span className="font-bold">Ranked in Industry</span>
          <span className="text-primary text-right">
            {data.rankings.industry_specific.rank} out of{' '}
            {data.rankings.industry_specific.total}
          </span>
        </p>
      </div>
    </div>
    <p className="text-primary font-bold mt-4">
      <a href={COMPANY_SITE} target="_blank" rel="noopener noreferrer">
        Quant Ratings Beat The Market &raquo;
      </a>
    </p>
  </>
);

export const getFactorGradesTable = (data: FactorGradesTable) => {
  const factors = Object.entries(data);

  return (
    <table
      style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}
    >
      <thead>
        <tr className="text-gray-500">
          <th></th>
          <th
            style={{
              textAlign: 'center',
              padding: '4px 2px',
            }}
          >
            Now
          </th>
          <th
            style={{
              textAlign: 'center',
              padding: '4px 2px',
            }}
          >
            3m ago
          </th>
          <th
            style={{
              textAlign: 'center',
              padding: '4px 2px',
            }}
          >
            6m ago
          </th>
        </tr>
      </thead>
      <tbody>
        {factors.map(([factor, grades]) => (
          <tr key={factor} className="font-bold">
            <td className="text-primary" style={{ padding: '6px 2px' }}>
              {factor}
            </td>
            <td
              className="text-gray-700"
              style={{ textAlign: 'center', padding: '6px 2px' }}
            >
              {grades.now}
            </td>
            <td
              className="text-gray-700"
              style={{ textAlign: 'center', padding: '6px 2px' }}
            >
              {grades.threeM}
            </td>
            <td
              className="text-gray-700"
              style={{ textAlign: 'center', padding: '6px 2px' }}
            >
              {grades.sixM}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const getRatingsSummaryTable = (data: RatingsSummaryType) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        {Object.entries(data).map(([key, source]) => {
          if (!source) return null;

          return (
            <tr key={key} className="font-bold">
              <td className="text-primary" style={{ padding: '6px 2px' }}>
                {formatSourceName(key)}
              </td>
              <td
                className="text-gray-700"
                style={{ padding: '6px 2px', textAlign: 'center' }}
              >
                {source.rating}
              </td>
              <td
                className="text-gray-700"
                style={{ padding: '6px 2px', textAlign: 'center' }}
              >
                {formatScore(source.score)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
