"use client";

import React, { useState, useMemo, useCallback } from "react";
import BookItem from "./book-item";

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

export default function BookListClient({
  initialBooks,
}: {
  initialBooks: Book[];
}) {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0); // 検索に関係ない別のステート

  console.log("🛑 親のレンダリング");

  // 【学習用】useMemo によるフィルタリングと「重い処理」のシミュレーション
  const filteredBooks = useMemo(() => {
    // 検索語がない場合は、重い処理をスキップして全件返す
    if (!query) return initialBooks;

    console.log("🔍 フィルタリング実行中... (意図的な遅延 100ms)");

    // 重い処理のシミュレーション (学習用)
    const startTime = performance.now();
    while (performance.now() - startTime < 100) {
      /* 100ms 待機 */
    }

    return initialBooks.filter((book: Book) =>
      book._props.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [initialBooks, query]);

  // 【学習用】useCallback による関数固定
  const handleClear = useCallback(() => {
    setQuery("");
  }, []);

  return (
    <div className="space-y-8">
      {/* 検索・操作エリア */}
      <div className="flex flex-col gap-4 max-w-md">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="メモ化：検索中..."
            className="flex-1 p-3 border border-red-300 rounded-lg bg-white"
          />
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-red-100 text-red-700 font-bold rounded-lg"
          >
            クリア
          </button>
        </div>

        {/* 検索とは全く関係ないボタン (学習用) */}
        <button
          onClick={() => setCount((c) => c + 1)}
          className="p-2 bg-slate-100 border rounded text-xs"
        >
          関係ないボタン（再レンダリング誘発）: {count}
        </button>
      </div>

      <p className="text-slate-500 text-sm">
        該当件数: {filteredBooks.length} 件
      </p>

      {/* 書籍一覧グリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book: Book) => (
          <BookItem
            key={book._id}
            title={book._props.title}
            author={book._props.author}
            thumbnail={book._props.thumbnail}
          />
        ))}
      </div>
    </div>
  );
}
