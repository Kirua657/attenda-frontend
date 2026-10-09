import ConnectionCheck from "@/components/ConnectionCheck";

export default function Home() {
  return (
    <main>
      <p className="brand">ATTENDA / DEVELOPMENT</p>
      <h1>開発環境の確認</h1>
      <p>フロントエンドが起動しました。バックエンドとデータベースへの接続を確認してください。</p>
      <ConnectionCheck />
      <p className="note">このページは開発用です。ログイン・出席登録は、これから実装します。</p>
    </main>
  );
}
