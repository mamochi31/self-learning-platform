"use client";

import React from "react";
import Image from "next/image";

interface BookItemProps {
  title: string;
  author?: string;
  thumbnail?: string;
}

// React.memo でラップすることで、Props変わらない限り、このコンポーネントは再レンダリングされない
const BookItem = React.memo(({ title, author, thumbnail }: BookItemProps) => {
  console.log(`🎨 BookItem の描画: ${title}`);

  return (
    <div className="group flex flex-col border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white">
      <div className="flex-grow">
        <h2 className="font-bold text-lg leading-snug line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
          {title}
        </h2>
        <p className="text-slate-500 text-sm mb-4">{author || "著者不明"}</p>
      </div>
      {thumbnail && (
        <div className="mt-auto flex justify-center w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-100 pt-4 pb-4">
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
});

// デバッグ用に表示名を設定
BookItem.displayName = "BookItem";

export default BookItem;
