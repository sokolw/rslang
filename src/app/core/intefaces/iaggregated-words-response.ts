import { IAggregatedWords } from './iaggregated-words';

export interface IAggregatedWordsResponse {
  paginatedResults: IAggregatedWords[];
  totalCount: [
    {
      count: number;
    },
  ];
}
