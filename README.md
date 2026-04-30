# Self-Learning Platform

「自己学習のすべてを一つの場所で」をコンセプトにした、エンジニアのためのパーソナル・プラットフォーム。
学習フローの可視化、タスク管理、成果物の一元管理、そしてAIを活用した知識の定着までを完結させることを目指します。

## 1. プロジェクト・ビジョン

エンジニアが学習内容を体系的に整理し、活動記録を資産として一元管理できる場を提供します。
- **学習フローの可視化**: React Flow による技術ロードマップの管理。
- **活動集約 (Portfolio Hub)**: GitHub, Qiita, note 等の活動情報を集約。
- **知的財産の蓄積**: Markdown ベースのブログエンジンと技術書ライブラリの連携。
- **AI 活用**: 記事や書籍の要約、学習内容に基づいた確認クイズの自動生成。

## 2. 技術スタック

モダンかつメンテナンス性を重視した最新の技術構成を採用しています。

- **Monorepo**: Turborepo, npm workspaces
- **Frontend**: Next.js (App Router), Tailwind CSS, React Flow
- **Backend**: NestJS (Modular Monolith)
- **Database/ORM**: PostgreSQL, Prisma 7 (Custom Encapsulation)
- **Infrastructure**: Docker, Docker Compose
- **Language**: TypeScript (v5.x)
- **Architecture**: ドメイン駆動設計 (DDD) の思想に基づく 4 層レイヤー構造

## 3. ディレクトリ構成

```text
.
├── apps
│   ├── api                 # NestJS (Backend: 3001)
│   │   └── src/modules     # DDD 構成 (domain, application, infrastructure, presentation)
│   └── web                 # Next.js (Frontend: 3000)
├── packages
│   └── database            # 共有 Prisma パッケージ
│       ├── prisma/schema.prisma
│       └── generated/client  # ホーイスティングを回避した独自の型生成先
├── docker-compose.yml
└── package.json
```

## 4. こだわりのポイント

- **DDD の実践**: ビジネスロジック（ドメイン）を技術基盤（インフラ）から分離し、長期的な拡張性を確保。
- **Prisma 7 の最適化**: 接続情報を `prisma.config.ts` で管理し、`dotenv` による安全な注入と、パッケージ内への型定義のカプセル化を実現。
- **最新の TS 設定**: `moduleResolution: "Node16"` や `module: "Node16"`, `target: "ESNext"` を採用し、モダンなモジュール解決に準拠したクリーンなビルド環境を構築。
- **DX (開発体験)**: 新しい ESLint の形式である Flat Config (`eslint.config.mjs`) を導入し、モノレポ全体で統一されたクリーンな Lint 環境を構築。

## 5. 起動手順

### 5.1 事前準備
- Node.js (最新の LTS 推奨)
- Docker / Docker Desktop

### 5.2 セットアップ
1. **依存関係のインストール**:
   ```bash
   npm install
   ```

2. **環境変数の設定**:
   `packages/database/.env` を作成し、データベース接続情報を設定します。
   ```text
   DATABASE_URL="postgresql://user:password@localhost:5432/self_learning_db?schema=public"
   ```

3. **データベースの起動**:
   ```bash
   docker compose up -d
   ```

4. **マイグレーションと型定義の生成**:
   ```bash
   cd packages/database
   npx prisma migrate dev --name init
   npx prisma generate
   ```

### 5.3 アプリケーションの実行
ルートディレクトリにて、モノリポ全体を一括起動します。
```bash
npm run dev
```
- API (NestJS): `http://localhost:3001`
- Web (Next.js): `http://localhost:3000`

### 5.4 登録データの確認
packages/databaseにて、Prisma Studioを起動します。
```bash
cd packages/database
npx prisma studio
```

---
