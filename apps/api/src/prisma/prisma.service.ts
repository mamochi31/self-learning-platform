// apps/api/src/modules/learning-flow/infrastructure/prisma.service.ts
import 'dotenv/config'; // 念のためここでも読み込む
import { Injectable, OnModuleInit, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@repo/database';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    // 診断用ログ（開発完了後に消してOK）
    if (!connectionString) {
      console.error('❌ DATABASE_URL が設定されていません。apps/api/.env を確認してください。');
      throw new InternalServerErrorException('Database configuration missing');
    }

    const pool = new pg.Pool({
      connectionString: connectionString,
    });

    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}