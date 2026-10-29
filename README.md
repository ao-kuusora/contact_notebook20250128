<div align="center">

# 📒 ふたりの連絡帳

**大事なことを、無理なく共有できるふたりの場所。**

夫婦・同棲カップルなど、日々の暮らしを一緒に送る2人のための連絡帳アプリです。

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?logo=postgresql&logoColor=white)](https://supabase.com/)
[![Deploy](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel)](https://contact-notebook20250128-es1q.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**[🌐 デモを見る](https://contact-notebook20250128-es1q.vercel.app/)**

</div>

---

## 📖 目次

- [開発の背景](#-開発の背景)
- [スクリーンショット](#-スクリーンショット)
- [主な機能](#-主な機能)
- [使い方の流れ](#-使い方の流れ)
- [技術スタック](#-技術スタック)
- [アーキテクチャ](#-アーキテクチャ)
- [データ設計](#-データ設計)
- [API 一覧](#-api-一覧)
- [ディレクトリ構成](#-ディレクトリ構成)
- [ローカルでの起動方法](#-ローカルでの起動方法)
- [環境変数](#-環境変数)
- [テストとビルド](#-テストとビルド)
- [本番環境へのデプロイ](#-本番環境へのデプロイ)
- [設計上の工夫](#-設計上の工夫)
- [セキュリティ](#-セキュリティ)
- [今後の改善候補](#-今後の改善候補)
- [ライセンス](#-ライセンス)

## 💡 開発の背景

一緒に暮らしていても、洗濯を回したか、牛乳を買ったか、今日は相手が忙しいか――といった**小さな情報は意外と伝え忘れる**ものです。LINE のトークに流れてしまうと、あとから探すのも大変です。

「ふたりの連絡帳」は、そうした情報を**種類ごとに整理して残せる、ふたり専用の共有スペース**として作りました。

- 口頭やトークでは流れてしまう情報を、種類別に残す
- 相手が読んだかどうかが分かる（既読・未読）
- ホーム画面を開けば、最新の状況がひと目で分かる
- スマートフォンからでも、短い操作で入力できる

## 📸 スクリーンショット

> 📌 画像は `docs/screenshots/` に配置する想定です。追加後、下のコメントアウトを外してください。

<!--
| ホーム | 家事報告 | おつかいメモ |
| :---: | :---: | :---: |
| ![ホーム](docs/screenshots/dashboard.png) | ![家事報告](docs/screenshots/chores.png) | ![おつかいメモ](docs/screenshots/errands.png) |

| ふたりのタスク | 今日の体調 | 今日の忙しさ |
| :---: | :---: | :---: |
| ![タスク](docs/screenshots/tasks.png) | ![体調](docs/screenshots/health.png) | ![忙しさ](docs/screenshots/workload.png) |

| 交換日記 | ログイン | スマートフォン表示 |
| :---: | :---: | :---: |
| ![日記](docs/screenshots/diary.png) | ![ログイン](docs/screenshots/login.png) | ![モバイル](docs/screenshots/mobile.png) |
-->

## ✨ 主な機能

アカウントとカップルの紐付けを基盤に、ふたりの生活に必要な情報を6種類の「投稿」として共有します。

| 画面 | パス | できること |
| --- | --- | --- |
| 🏠 **ホーム** | `/dashboard` | 各機能の最新情報と未読バッジをまとめて表示。連絡帳IDの確認 |
| 🧺 **家事報告** | `/chores` | 洗濯・洗い物など、やった家事を報告。相手が書いた分は既読管理 |
| 🛒 **おつかいメモ** | `/errands` | 買い物など忘れたくない用事を共有。期限の設定、完了状態の管理 |
| ✅ **ふたりのタスク** | `/tasks` | 共有チェックリスト。期限（任意）、未完了／完了の絞り込み、件数の集計 |
| 💗 **今日の体調** | `/health` | 体調（元気／まあまあ／少し不調／しんどい）・顔文字の気分・ひとことを報告。直近14日の推移グラフ |
| ⏰ **今日の忙しさ** | `/workload` | 「とても忙しい」「普通」「余裕あり」「飲みあり」から選んで共有 |
| 📔 **交換日記** | `/diary` | 今日の気持ちや出来事を書き残す。日付ごとに見返せる |

### ホーム画面（ダッシュボード）

- 家事・おつかい・忙しさ・日記の**未読バッジ**
- 最新の家事報告 / **期限が最も近い未完了のおつかい** / 今日の忙しさ / 最新の日記 / 最新のタスク / 最新の体調
- 各カードに**投稿者名**を表示し、誰が書いたかが分かる
- 表示に必要なデータは **1 回の API 呼び出し**で取得（読み込みを軽くするため）

### 既読・未読

- 相手が書いた投稿だけが既読管理の対象（自分の投稿は常に既読扱い）
- 一覧画面を開いて表示した投稿を、まとめて既読に更新
- メニューやホームに、未読のある機能がバッジで分かる

### アカウントとふたりの連携

- メールアドレスとパスワードによる登録・ログイン・ログアウト
- **連絡帳ID（招待コード）** でふたりを紐付け
  - 片方が「連絡帳を作る」→ IDを発行 → もう片方が「連絡帳に参加する」でIDを入力
- ログインが必要な画面は、未ログインなら自動でログイン画面へ

### ナビゲーション

- モバイルでも画面を広く使えるよう、**折りたたみ式のボトムメニュー**
- ホーム／家事／おつかい／タスク／体調／忙しさ／日記／ログアウト

## 🚶 使い方の流れ

```mermaid
flowchart LR
    A[新規登録] --> B{連絡帳は?}
    B -->|まだない| C[連絡帳を作る<br/>連絡帳IDを発行]
    B -->|相手が作成済み| D[連絡帳に参加する<br/>IDを入力]
    C --> E[相手にIDを伝える]
    E --> D
    C --> F[ホーム]
    D --> F
    F --> G[家事・おつかい・タスク<br/>体調・忙しさ・日記を共有]
```

1. **新規登録**：表示名・メールアドレス・パスワードを入力
2. **連絡帳を作る / 参加する**：1人目が連絡帳IDを発行し、2人目がそのIDで参加
3. **ホームから共有を始める**：メニューから使いたい機能を開いて投稿

## 🛠 技術スタック

| 分類 | 技術 | 用途 |
| --- | --- | --- |
| フレームワーク | Next.js 14（App Router） | 画面表示とAPIルート |
| UI | React 18 | コンポーネント |
| 言語 | TypeScript | 型による安全な実装 |
| データベース | PostgreSQL（Supabase） | ユーザー・カップル・投稿・既読状態の保存 |
| ORM | Prisma 5.12 | スキーマ管理・マイグレーション・DBアクセス |
| 認証 | JSON Web Token（`jsonwebtoken`）+ httpOnly Cookie | セッション管理（有効期限7日） |
| パスワード | bcryptjs | ハッシュ化 |
| スタイル | CSS Modules | 画面ごとのスタイリング |
| テスト | Node.js 標準テストランナー（`node:test`）+ tsx | サービス層の自動テスト |
| ホスティング | Vercel | Webアプリの公開 |
| ローカルDB | Docker Compose（PostgreSQL 16） | 開発用データベース |

## 🏗 アーキテクチャ

画面・API・ビジネスロジック・DBアクセスを分け、**ビジネスロジックを DB なしでテストできる**構成にしています。

```mermaid
flowchart TB
    subgraph Client[ブラウザ]
        P[Next.js ページ / React コンポーネント]
    end
    subgraph Server[Next.js サーバー（Vercel）]
        MW[middleware.ts<br/>Cookie の有無を確認]
        API[app/api/*<br/>Route Handlers]
        SVC[lib/services<br/>ビジネスロジック・検証]
        REPO[lib/repo/prismaRepo.ts<br/>DBアクセス]
    end
    DB[(PostgreSQL<br/>Supabase)]

    P -->|保護ページへのアクセス| MW
    P -->|fetch| API
    API --> SVC
    SVC -->|EntryRepo / ReadRepo<br/>インターフェース| REPO
    REPO --> DB
```

| 層 | 場所 | 役割 |
| --- | --- | --- |
| ミドルウェア | `middleware.ts` | 保護ページに session Cookie がなければ `/login` へリダイレクト |
| API | `app/api/` | リクエストの受け渡し。認証ユーザーを取得してサービス層を呼び出す |
| サービス | `lib/services/` | 入力検証、権限チェック、レスポンス形式の決定（DBに依存しない） |
| リポジトリ | `lib/repo/` | Prisma を使った実際のDB操作 |
| 検証 | `lib/validate.ts` | 投稿種別・メールアドレス・文字数の検証 |

## 🗄 データ設計

```mermaid
erDiagram
    Couple ||--o{ User : "メンバー"
    Couple ||--o{ Entry : "共有する投稿"
    User ||--o{ Entry : "書いた"
    Entry ||--o{ ReadStatus : "既読状態"
    User ||--o{ ReadStatus : "読んだ"

    User {
        string id PK
        string email UK
        string passwordHash
        string displayName
        string iconUrl
        string coupleId FK
    }
    Couple {
        string id PK
        string inviteCode UK
    }
    Entry {
        string id PK
        string type
        string content
        datetime dueDate
        boolean done
        string userId FK
        string coupleId FK
    }
    ReadStatus {
        string id PK
        string entryId FK
        string userId FK
        boolean isRead
        datetime readAt
    }
```

| モデル | 役割 |
| --- | --- |
| `User` | メールアドレス、パスワードハッシュ、表示名、所属カップル |
| `Couple` | 招待コード（連絡帳ID）を持つ、ふたりの共有単位 |
| `Entry` | すべての共有項目。`type` で種類を区別し、期限（`dueDate`）と完了状態（`done`）を持つ |
| `ReadStatus` | 投稿ごと・ユーザーごとの既読状態（`entryId` + `userId` で一意） |

### 投稿の種類（`Entry.type`）

| type | 画面 | 備考 |
| --- | --- | --- |
| `CHORE` | 家事報告 | |
| `ERRAND` | おつかいメモ | 期限・完了あり |
| `TASK` | ふたりのタスク | 期限（任意）・完了あり |
| `HEALTH` | 今日の体調 | 1日1件を前提にグラフ化 |
| `WORKLOAD` | 今日の忙しさ | |
| `DIARY` | 交換日記 | |

- すべての共有データは `coupleId` で分離され、**他のカップルのデータは参照できません**
- 一覧取得を速くするため `Entry` に `(coupleId, type, createdAt)` のインデックスを設定
- 内容の最大文字数は 2,000 文字

## 🔌 API 一覧

すべて `/api` 配下です。認証が必要なAPIは、未ログインなら `401` を返します。

| メソッド | パス | 説明 |
| --- | --- | --- |
| POST | `/api/auth/register` | 新規登録（レート制限：IPごとに1時間10回） |
| POST | `/api/auth/login` | ログイン（レート制限：IP+メールごとに15分10回） |
| POST | `/api/auth/logout` | ログアウト（Cookie を破棄） |
| GET | `/api/auth/me` | ログイン中のユーザー情報 |
| POST | `/api/couple/create` | 連絡帳を作成し、連絡帳IDを発行 |
| POST | `/api/couple/join` | 連絡帳IDで参加（レート制限：10分10回） |
| GET | `/api/dashboard` | ホーム画面用のデータを一括取得 |
| GET | `/api/entries` | 投稿の一覧（`type` / `date` / `done` / `limit` で絞り込み） |
| POST | `/api/entries` | 投稿を作成 |
| GET / PATCH | `/api/entries/[id]` | 投稿の取得・更新（完了状態など） |
| GET | `/api/unread` | 種類ごとの未読の有無 |
| POST | `/api/read` | 投稿を既読にする（最大200件まとめて） |

`/api/entries` の主なクエリ：

| パラメータ | 例 | 説明 |
| --- | --- | --- |
| `type` | `ERRAND` | 投稿の種類で絞り込み |
| `date` | `2026-10-28` | 日本時間（JST）の1日分に絞り込み |
| `done` | `false` | 完了／未完了で絞り込み |
| `limit` | `50` | 件数（既定100、最大200） |

## 📁 ディレクトリ構成

```
contact_notebook20250128/
├── app/
│   ├── api/               # APIルート（auth / couple / entries / dashboard / read / unread）
│   ├── dashboard/         # ホーム
│   ├── chores/            # 家事報告
│   ├── errands/           # おつかいメモ
│   ├── tasks/             # ふたりのタスク
│   ├── health/            # 今日の体調
│   ├── workload/          # 今日の忙しさ
│   ├── diary/             # 交換日記
│   ├── couple/            # 連絡帳の作成・参加・選択
│   ├── login/ register/   # 認証画面
│   └── layout.tsx
├── components/            # BottomNav / TopBar / SimpleEntryDetail など共通UI
├── lib/
│   ├── services/          # ビジネスロジック（entries / read / result）
│   ├── repo/              # Prisma を使ったDBアクセス
│   ├── auth.ts            # JWT の発行・検証、Cookie 設定
│   ├── rateLimit.ts       # 簡易レート制限
│   ├── validate.ts        # 入力検証
│   └── types.ts           # 画面とAPIで共有する型
├── prisma/
│   ├── schema.prisma      # データモデル
│   └── migrations/        # PostgreSQL 用マイグレーション
├── tests/                 # 自動テスト
├── middleware.ts          # ログイン必須ページの保護
├── docker-compose.yml     # ローカル用 PostgreSQL
└── .env.example           # 環境変数のひな形
```

## 🚀 ローカルでの起動方法

### 必要なもの

- Node.js（Next.js 14 が動作するバージョン）と npm
- Git
- Docker / Docker Compose（同梱の設定で PostgreSQL を起動する場合）。既存の PostgreSQL を使う場合は不要です

### 1. リポジトリを取得して依存関係をインストール

```bash
git clone https://github.com/ao-kuusora/contact_notebook20250128.git
cd contact_notebook20250128
npm install
```

`postinstall` で Prisma Client が自動生成されます。

### 2. 環境変数を設定

```bash
cp .env.example .env
cp .env.example .env.local
```

- `.env`：Prisma CLI 用
- `.env.local`：Next.js 用

Windows のコマンドプロンプトで `cp` が使えない場合は、ファイルをコピーして同じ名前で保存してください。`JWT_SECRET` は必ず書き換えてください（[環境変数](#-環境変数)参照）。

### 3. PostgreSQL を起動

```bash
docker compose up -d
```

### 4. マイグレーションを適用

```bash
npx prisma migrate dev
```

> ⚠️ 既存データのあるデータベースに対して、内容を確認せずにリセット系のコマンドを実行しないでください。

### 5. 開発サーバーを起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開き、新規登録から始めます。

## 🔐 環境変数

| 変数名 | 必須 | 説明 | 例 |
| --- | :---: | --- | --- |
| `DATABASE_URL` | ✅ | PostgreSQL の接続文字列 | `postgresql://postgres:postgres@localhost:5432/contact_notebook` |
| `JWT_SECRET` | ✅ | セッション用トークンの署名に使う秘密鍵 | ランダムな長い文字列 |

秘密鍵の生成例（OpenSSL が使える環境）：

```bash
openssl rand -base64 48
```

`JWT_SECRET` が未設定の場合、ログイン処理はエラーになります。

## 🧪 テストとビルド

```bash
npm test            # 自動テスト
npm run build       # 本番ビルド
npm run start       # 本番モードで起動（ビルド後）
```

テストは、DB を使わない**フェイクのリポジトリ**でサービス層を検証しています。

| テスト | 内容 |
| --- | --- |
| `entries.service.test.ts` | 未ログイン時の拒否、カップル未参加時の空応答、不正な `type`・日付の拒否、件数上限、他カップルの投稿が見えないこと など |
| `read.service.test.ts` | 既読更新の入力検証、件数の上限、自分の投稿や他カップルの投稿が対象外になること |
| `validate.test.ts` | 投稿種別・メールアドレス・文字数の検証 |
| `dates.test.ts` | JST の日付・月範囲の変換（存在しない日付の拒否を含む） |

## ☁️ 本番環境へのデプロイ

Vercel と PostgreSQL（Supabase など）の組み合わせで公開できます。

1. **PostgreSQL を用意する**：Supabase などで接続文字列を取得します。アプリ用（プール経由）とマイグレーション用（直接接続）で接続先が分かれている場合は、それぞれ確認してください
2. **Vercel にリポジトリを接続する**：GitHub リポジトリをインポートします
3. **環境変数を設定する**：`DATABASE_URL`（本番DB）と `JWT_SECRET`（本番用に新しく生成した値）を設定します
4. **マイグレーションを適用する**：

   ```bash
   npx prisma migrate deploy
   ```

   対象の `DATABASE_URL` が本番DBを指していることを確認してから実行してください
5. **動作確認する**：下のチェックリストを確認します

### 公開後のチェックリスト

- [ ] トップページとログイン画面が開く
- [ ] 登録・ログイン・ログアウトが動く
- [ ] 未ログインで `/dashboard` などにアクセスするとログイン画面に移動する
- [ ] 連絡帳の作成と、別アカウントからの参加ができる
- [ ] 各機能で投稿・表示ができ、相手側で未読バッジが付く
- [ ] 他のカップルのデータを参照・変更できない
- [ ] スマートフォンの画面幅で主要な操作ができる

## 🧩 設計上の工夫

- **ホームの読み込みを1リクエストに集約**：以前はブラウザから複数のAPIを呼んでいたため、認証とDB往復がその都度発生していました。`/api/dashboard` で認証を1回にし、クエリを並列実行しています
- **サービス層とDBアクセスの分離**：ロジックを `EntryRepo` / `ReadRepo` のインターフェースに依存させ、DB なしで高速にテストできるようにしています
- **他カップルの投稿は「存在しない」扱い**：存在しない投稿と他カップルの投稿は同じ `404` で返し、IDの存在を推測されないようにしています
- **日本時間（JST）基準の日付処理**：「今日」の範囲を JST で計算し、`2026-02-31` のような存在しない日付は拒否します
- **未読判定の共通化**：ホームの未読バッジと `/api/unread` で同じ関数を使い、表示のずれを防いでいます
- **アクセシビリティへの配慮**：フォームの `label`、エラー表示の `role="alert"`、グラフの代替テキスト、メニューの `aria-expanded` などを設定しています

## 🛡 セキュリティ

実装済みの対策：

- パスワードは bcrypt でハッシュ化して保存（平文では保存しません）
- セッションは JWT を **httpOnly / SameSite=Lax** の Cookie に保存（本番では `Secure` を付与、有効期限7日）
- 保護ページはミドルウェアで制御し、APIでも毎回ユーザーを検証
- データはすべて `coupleId` で分離し、所属先を確認
- 入力値の検証（投稿種別、メールアドレス形式、文字数、日付形式、件数上限）
- ログイン・登録・参加にレート制限

運用上の注意：

- `.env` や秘密鍵、実ユーザーのデータはリポジトリに含めないでください（`.gitignore` で除外済み）
- 本番では推測困難な `JWT_SECRET` を使い、開発用の値を使い回さないでください
- 現在のレート制限は**メモリ上の簡易版**です。Vercel のように複数インスタンスに分散する環境では、インスタンス間で共有されません。本格運用では Upstash（Redis）などへの置き換えを推奨します
- デモ用・テスト用のアカウントを本番に残さないでください

## 🗺 今後の改善候補

- [ ] 主要な操作（投稿・既読・参加フロー）を対象にした E2E テストの追加
- [ ] レート制限の外部ストア（Redis など）への移行
- [ ] フォーム入力エラーや通信失敗時の案内の改善
- [ ] スマートフォン向けレイアウトの調整と表示の高速化
- [ ] アクセシビリティの継続的な改善
- [ ] データのバックアップと復旧手順の整理
- [ ] README へのスクリーンショット追加

## 📄 ライセンス

[MIT License](LICENSE)

---

<div align="center">

共同生活を送るふたりが、日々の小さな情報や気持ちを無理なく共有できることを目指して開発しています。

</div>
