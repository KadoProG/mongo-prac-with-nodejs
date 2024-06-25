export interface IMeta {
  currentPage: number; // 現在のページ
  perPage?: number; // 1ページあたりのデータ数
  total: number; // データの総数
  lastPage: number; // ページ数
  scoringAiId?: number; // 検索するスコアリングAI ID
  error?: string; // エラーメッセージ
}

export interface IMetaSearch {
  page: number;
  perPage?: number;
  scoringAiId?: number;
  search?: string;
}
