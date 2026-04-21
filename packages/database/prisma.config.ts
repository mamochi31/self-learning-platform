import 'dotenv/config'; // <-- これを必ず最初に追加
import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    // dotenv のおかげで process.env.DATABASE_URL が正しく読み込まれます
    url: process.env.DATABASE_URL,
  },
});