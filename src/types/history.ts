import type { IPosts } from './posts';

export interface IHistoryItem {
  id: string | number;
  message: string;
  posts: IPosts;
}

export type IHistory = IHistoryItem[];
