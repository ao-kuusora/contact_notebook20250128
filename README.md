# contact_notebook20250128

夫婦・同棲カップル向けの “連絡帳アプリ”

このアプリは、同じ家に住むパートナー同士が  
**「伝え忘れ」「言いそびれ」「共有漏れ」** をなくすための  
シンプルで使いやすい連絡帳アプリです。

---

## Features（特徴）

ユーザーとユーザーをIDで結びつけることでその二人だけの連絡帳に。お互いのスケジュール把握や共同生活の助けになることを目指したシンプルな機能を搭載。

**主な機能**

- 家事報告  
  洗濯・洗い物など家事報告をワンクリックで可能

- おつかいメモ  
  買わなきゃいけないものを期限付きで共有

- 仕事の忙しさ  
  お互いの仕事の忙しさを共有することで疲労具合の把握、スケジュール調整に役に立つ

- 交換日記  
  お互いの気持ちを思うままに綴って残そう

---

## Tech Stack（技術構成）

- Framework：Next.js (App Router)
- Language：TypeScript
- Styling：CSS Modules / Tailwind（必要に応じて）
- Database：Prisma + PostgreSQL
- Auth：JWT（httpOnly Cookie、ローカル運用前提）

---

## Getting Started（ローカル起動）

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

```bash
cp .env.example .env
cp .env.example .env.local
```

`JWT_SECRET` は十分に長いランダム文字列に変更してください。  
（`.env` は Prisma CLI 用、`.env.local` は Next.js 用です）

### 3. データベースの起動とマイグレーション

PostgreSQL をローカルで起動します（Docker が使えない場合は、手元の PostgreSQL に合わせて `DATABASE_URL` を変更してください）。

```bash
docker compose up -d
npx prisma migrate dev
```

### 4. 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセス。

---

## Environment Variables（環境変数）

| 変数 | 説明 | 例 |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL の接続文字列 | `postgresql://postgres:postgres@localhost:5432/contact_notebook` |
| `JWT_SECRET` | セッション署名用の秘密鍵 | 長いランダム文字列 |

※ `.env` / `.env.local` / `*.db` は **GitHub に公開しないでください**（`.gitignore` 済み）

---

## Deploy（本番公開）

1. Neon / Supabase / Render などで PostgreSQL を用意し、接続文字列を控える
2. Vercel などにリポジトリを接続し、環境変数 `DATABASE_URL` と `JWT_SECRET` を設定する
3. 本番DBにテーブルを作る（手元から1回実行）

```bash
DATABASE_URL="<本番の接続文字列>" npx prisma migrate deploy
```

※ Neon / Supabase の接続プーラーを使う場合は、マイグレーション用に直結URL（`directUrl`）が必要になることがあります。

---

## License

MIT License  
自由に利用・改変できます。

---

## Notes

このプロジェクトは、  
**「共同生活を送る2人がすこしだけ快適になるアプリケーション」**  
というコンセプトで設計されています。
