"use server";

import { revalidatePath } from "next/cache";

export async function createBookAction(formData: FormData) {
  const title = formData.get("title");
  const author = formData.get("author");

  // NestJS API に POST リクエストを投げる
  const res = await fetch("http://localhost:3001/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      author,
      userId: "test1", // Prisma Studio等で作成したIDを入れてください
    }),
  });

  if (!res.ok) throw new Error("登録に失敗しました");

  // 一覧ページを再検証（最新の状態に更新）
  revalidatePath("/books");
}
