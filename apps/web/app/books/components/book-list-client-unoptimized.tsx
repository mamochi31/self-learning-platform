"use client";

import React, { useState } from "react";
import Image from "next/image";

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

// --- 子コンポーネント: React.memo なし ---
// 親が再描画されると、Propsが全く同じでも強制的にログが出る
const BookItemUnoptimized = ({
  title,
  author,
  thumbnail,
}: {
  title: string;
  author?: string;
  thumbnail?: string;
}) => {
  console.log(`🎨 BookItem の描画(非メモ化): ${title}`);

  return (
    <div className="flex flex-col border border-red-200 p-5 rounded-2xl shadow-sm bg-white">
      <div className="flex-grow">
        <h2 className="font-bold text-lg leading-snug line-clamp-2 mb-1">
          {title}
        </h2>
        <p className="text-slate-500 text-sm mb-4">{author || "著者不明"}</p>
      </div>
      {thumbnail && (
        <div className="mt-auto flex justify-center w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-100 py-4">
          <Image
            src={thumbnail}
            alt={title}
            width={120}
            height={160}
            className="h-40 w-auto object-cover"
          />
        </div>
      )}
    </div>
  );
};

// --- 親コンポーネント: useMemo / useCallback なし ---
export default function BookListClientUnoptimized({
  initialBooks,
}: {
  initialBooks: Book[];
}) {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0); // 関係ないステート

  console.log("🛑 親のレンダリング");

  // useMemo なしのフィルタリング
  const filteredBooks = initialBooks.filter((book: Book) => {
    // 検索語がない場合は、重い処理をスキップして全件返す
    if (!query) return initialBooks;

    console.log("🔍 フィルタリング実行中... (意図的な遅延 100ms)");

    // 重い処理のシミュレーション (学習用)
    const startTime = performance.now();
    while (performance.now() - startTime < 100) {
      /* 100ms 待機 */
    }

    return book._props.title.toLowerCase().includes(query.toLowerCase());
  });

  // useCallback なしの関数
  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="space-y-8">
      {/* 検索・操作エリア */}
      <div className="flex flex-col gap-4 max-w-md">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="非メモ化：検索中..."
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book: Book) => (
          <BookItemUnoptimized
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
