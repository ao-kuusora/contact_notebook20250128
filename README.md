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



## Tech Stack（技術構成）

Framework：Next.js (App Router)
Language：TypeScript
Styling：CSS Modules / Tailwind（必要に応じて）
DatabasePri：sma + SQLite（または任意のDB）
Auth：JWT（ローカル運用前提）


## Getting Started（ローカル起動）

### 1. 依存関係のインストール
npm install

### 2. Prisma のセットアップ
npx prisma generate npx prisma migrate dev

### 3. 開発サーバー起動
npm run dev

ブラウザで  
`http://localhost:3000`  
にアクセス。

---

## Environment Variables（環境変数）

`.env.local` を作成して以下を設定：
DATABASE_URL="file:./dev.db" JWT_SECRET="your-secret-key"

※ `.env.local` は **GitHub に公開しないでください**

---

## License

MIT License  
自由に利用・改変できます。

---

## Notes

このプロジェクトは、  
**「共同生活を送る2人がすこしだけ快適になるアプリケーション」**  
というコンセプトで設計されています。







