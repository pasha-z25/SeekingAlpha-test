export enum API_ENDPOINTS {
  user = '/user',
  ratings = '/ratings-summary',
  gradesNow = '/factor-grades/now',
  grades3m = '/factor-grades/3m',
  grades6m = '/factor-grades/6m',
  ranking = '/quant-ranking',
}

export interface NowFormat {
  [key: string]: { current: string };
}

export interface ThreeMFormat {
  [key: string]: string;
}

export interface SixMFormat {
  data: [string, string][];
}

export type GradesApiData = NowFormat | ThreeMFormat | SixMFormat;

export interface FactorHistory {
  now: string;
  threeM: string;
  sixM: string;
}

export type FactorGradesTable = Record<string, FactorHistory>;

export type RatingSource = {
  rating: string;
  score: number;
};

export type RatingsSummaryType = Record<string, RatingSource>;

export type RankingType = {
  rank: number;
  total: number;
};

export type QuantRankingsType = {
  sector: string;
  industry: string;
  rankings: {
    [key: string]: RankingType;
  };
};
