# Attenda フロントエンド

出席管理Webシステムの開発用の土台です。接続確認ページのみ実装しています。
ログイン、QR登録、学生・教員・管理者画面は今後の開発対象です。

## 必要な環境

- Node.js 24 LTS（作成時は24.21.0）とnpm
- Git、VS Code
- Next.js 16.4.0 / React 19.3.0 / TypeScript
- バックエンド: https://github.com/Kirua657/attenda-backend

依存関係は `package-lock.json` で共有します。各自でアプリを生成し直さず、取得したコードで `npm.cmd ci` を実行してください。

## 初めて取得する

PowerShellで実行します。既に取得済みならcloneは不要です。

```powershell
New-Item -ItemType Directory -Force C:\dev\attenda
Set-Location C:\dev\attenda
git clone https://github.com/Kirua657/attenda-frontend.git
Set-Location .\attenda-frontend
git switch develop
npm.cmd ci
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
npm.cmd run dev
```

http://localhost:3000 を開きます。バックを別のターミナルで起動し、「接続を確認する」を押してください。
成功すればフロント → バック → PostgreSQLの通信を確認できています。停止はCtrl+Cです。

`.env.local` の `API_BASE_URL` がバックの接続先です。変更後はフロントを再起動します。
画面からのAPI通信は `fetch("/api/...")` にそろえます。Next.jsがバックへ転送します。

## 作業する場所

- `src/app`: URLごとの `page.tsx`、レイアウト
- `src/screens`: 設計書の画面部品。例: `StudentHomePage.tsx`
- `src/components`: 共通部品
- `src/lib`: API呼び出しなどの共通処理

## 日常の作業

```powershell
git status
git switch develop
git pull --ff-only origin develop
git switch -c feature/student-home
```

実装したら確認します。

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
git diff
git add src
git diff --cached
git commit -m "feat: add student home"
git push -u origin feature/student-home
```

設定ファイルを変更した場合も、そのファイルを個別に `git add` します。
GitHubで **base: develop / compare: 自分のfeature** のPRを作り、他の1人が確認してからマージします。
`main` は提出用、`develop` は開発の結合先です。

## 共有しないもの

`.env.local`、パスワード、学生の実データ、`node_modules`、`.next` はコミットしません。
`.env.example` は秘密を含まない設定の見本なので共有します。
カメラを使う画面をスマホで検証する段階ではHTTPSの接続方法を別途決めます。

## 依存パッケージの確認

作成時の `npm audit` では、ESLintの開発用依存（bracesを含む連鎖）にhighの報告が5件あります。
現時点で互換性のある修正版は確認できていません。Next.jsを古い版へ落とす
`npm audit fix --force` は使わず、修正版の公開後にlockfileを更新します。

## チームのGitHub作業手順

[メンバー用GitHub作業テンプレート](docs/github-guide.md)に、作業開始・保存・PR・レビュー・取り込みの手順と記入例をまとめています。
