// 書籍の読書状態を定義（PrismaのEnumと合わせるか、独自に定義）
export type ReadingStatus = 'UNREAD' | 'READING' | 'COMPLETED';

// Bookエンティティが持つ属性の型定義
export interface BookProps {
  id?: string;
  isbn?: string;
  title: string;
  author?: string;
  thumbnail?: string;
  status: ReadingStatus;
  userId: string;
  flowId?: string;
}

export class Book {
  private readonly _id?: string;
  private _props: BookProps;

  // コンストラクタを private にして、createメソッド経由の生成を強制する
  private constructor(props: BookProps, id?: string) {
    this._id = id;
    this._props = props;
  }

  /**
   * エンティティを生成するための静的ファクトリメソッド
   * ここでビジネスルールのバリデーションを行う
   */
  public static create(props: BookProps, id?: string): Book {
    // 例：タイトルは必須であるというルール
    if (!props.title || props.title.trim() === '') {
      throw new Error('書籍のタイトルは必須です');
    }
    
    // ステータスが未指定の場合はデフォルト値をセット
    const status = props.status || 'UNREAD';

    return new Book({ ...props, status }, id);
  }

  // ゲッター：外部からは値を変えられないようにする
  get id() { return this._id; }
  get title() { return this._props.title; }
  get status() { return this._props.status; }
  get userId() { return this._props.userId; }
  get isbn() { return this._props.isbn; }

  /**
   * 読書状態を更新するビジネスロジック
   */
  public updateStatus(newStatus: ReadingStatus): void {
    // 特定のルール（例：完了後は未読に戻せないなど）をここに追加できる
    this._props.status = newStatus;
  }
}