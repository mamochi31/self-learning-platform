import React from "react";
import Image from "next/image";
import { createBookAction } from "./actions";

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
            className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
          />
          <input
            type="text"
            name="author"
            placeholder="著者"
            className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white font-bold p-3 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm"
        >
          登録する
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="group flex flex-col border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white"
          >
            <div className="flex-grow">
              <h2 className="font-bold text-lg leading-snug line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                {book._props.title}
              </h2>
              <p className="text-slate-500 text-sm mb-4">
                {book._props.author || "著者不明"}
              </p>
            </div>
            {book._props.thumbnail && (
              <div className="mt-auto flex justify-center w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-100 pt-4 pb-4">
                <Image
                  src={book._props.thumbnail}
                  alt={book._props.title}
                  width={120}
                  height={160}
                  className="h-40 w-auto object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
