import React from "react";
import { createBookAction } from "./actions";
// 以下のインポートを切り替えることでメモ化による挙動の違いを確認可能
import BookListClient from "./components/book-list-client"; // メモ化したコンポーネント
// import BookListClient from "./components/book-list-client-unoptimized"; // メモ化していないコンポーネント(比較用)

// 書籍データの型定義
interface Book {
  _id: string;
  _props: {
    title: string;
    isbn?: string;
    status?: string;
    userId?: string;
    author?: string;
    thumbnail?: string;
  };
}

// NestJS API からデータを取得する非同期関数
async function getBooks(): Promise<Book[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const res = await fetch(`${apiUrl}/books`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="p-8 max-w-6xl mx-auto text-slate-800">
      <h1 className="text-3xl font-extrabold mb-8 text-slate-900 tracking-tight">
        読書ライブラリ
      </h1>

      {/* 新規登録フォーム */}
      <form
        action={createBookAction}
        className="mb-10 p-6 border border-slate-200 rounded-xl bg-slate-50 shadow-sm flex flex-col gap-4 max-w-md"
      >
        <h2 className="font-bold text-xl text-slate-800">新しい本を登録</h2>
        <div className="flex flex-col gap-3 mt-2">
          <input
            type="text"
            name="title"
            placeholder="タイトル (必須)"
            required
            className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <input
            type="text"
            name="author"
            placeholder="著者"
            className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white font-bold p-3 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm"
        >
          登録する
        </button>
      </form>

      {/* クライアント側での検索・表示エリア */}
      <BookListClient initialBooks={books} />
    </div>
  );
}
