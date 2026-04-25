import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 他のモジュールで PrismaService を使えるようにエクスポート
})
export class PrismaModule {}