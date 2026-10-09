"use client";

import { useState } from "react";

export default function ConnectionCheck() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("未確認");

  async function check() {
    setBusy(true);
    setMessage("接続を確認しています…");
    try {
      const response = await fetch("/api/health", {
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error("接続に失敗しました");
      const data: unknown = await response.json();
      if (!data || typeof data !== "object" || !("status" in data) || !("db" in data)
        || data.status !== "ok" || data.db !== 1) {
        throw new Error("接続結果を確認できませんでした");
      }
      setMessage("接続成功：フロント → バック → PostgreSQL");
    } catch {
      setMessage("接続できません。バックの起動状態とDB設定を確認してください。");
    } finally {
      setBusy(false);
    }
  }

  return <section aria-label="接続確認">
    <button onClick={check} disabled={busy}>{busy ? "確認中…" : "接続を確認する"}</button>
    <p role="status">{message}</p>
  </section>;
}
