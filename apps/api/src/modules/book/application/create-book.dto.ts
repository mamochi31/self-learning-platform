// 入力データの形を定義
export interface CreateBookInput {
  isbn?: string;
  title: string;
  author?: string;
  thumbnail?: string;
  userId: string;
}