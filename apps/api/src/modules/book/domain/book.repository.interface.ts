import { Book } from './book.entity';

export interface IBookRepository {
  /**
   * 書籍を保存（新規作成または更新）する
   */
  save(book: Book): Promise<void>;

  /**
   * IDを指定して書籍を取得する
   */
  findById(id: string): Promise<Book | null>;

  /**
   * ユーザーIDに紐づくすべての書籍を取得する
   */
//   findByUserId(userId: string): Promise<Book[]>;

  /**
   * 書籍を削除する
   */
//   delete(id: string): Promise<void>;
}

// NestJSのDI（依存性注入）で使用するためのトークン（ユニークな名前）を定義
export const IBookRepository = Symbol('IBookRepository');