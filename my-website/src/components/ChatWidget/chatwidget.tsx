import React, {useMemo, useRef, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './chatwidget.module.css';

type Role = 'user' | 'assistant';
interface Msg { role: Role; text: string; }

const CHAT_ID = 'default';

export default function ChatWidget() {
  const {siteConfig} = useDocusaurusContext();
  const API_BASE =
    (siteConfig as any)?.customFields?.CHAT_API_BASE ?? 'http://localhost:8000';

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {role: 'assistant', text: '嗨，我是你的智能助手～'},
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useStream, setUseStream] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const chatUrl = useMemo(() => `${API_BASE}/chat`, [API_BASE]);
  const streamUrl = useMemo(() => `${API_BASE}/chat/stream`, [API_BASE]);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const el = listRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  };

  const send = async () => {
    const q = userInput.trim();
    if (!q || loading) return;
    setMsgs((m) => [...m, {role: 'user', text: q}]);
    setUserInput('');
    setLoading(true);

    try {
      if (!useStream || !('ReadableStream' in globalThis)) {
        // --- 非流式 ---
        const res = await fetch(chatUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            question: q,
            top_k: 4,
            model: 'qwen-plus',
            temperature: 0.3,
          }),
          credentials: 'include',
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        const answer = data?.answer ?? data?.data?.answer ?? '';
        setMsgs((m) => [...m, {role: 'assistant', text: String(answer)}]);
      } else {
        // --- 流式（SSE over fetch） ---
        const res = await fetch(streamUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            question: q,
            top_k: 4,
            model: 'qwen-plus',
            temperature: 0.3,
          }),
          credentials: 'include',
        });
        if (!res.ok || !res.body) throw new Error('SSE 不可用');

        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buf = '';

        while (true) {
          const {done, value} = await reader.read();
          if (done) break;
          buf += decoder.decode(value, {stream: true});

          // 按 SSE 块拆分：每块以 \n\n 结束，且行以 "data: " 开头
          const chunks = buf.split('\n\n');
          buf = chunks.pop() ?? '';

          for (const chunk of chunks) {
            if (!chunk.startsWith('data:')) continue;
            const payload = chunk.replace(/^data:\s*/, '').trim();
            if (!payload) continue;        // 最后一条空消息
            if (payload === '[DONE]') continue;

            let obj: any = null;
            try { obj = JSON.parse(payload); } catch { /* 纯文本 */ }

            if (obj?.type === 'meta') {
              // 开始事件，忽略
            } else if (obj?.type === 'reasoning') {
              setMsgs((m) => [...m, {role: 'assistant', text: `思考：${obj.text || ''}`}]);
            } else if (obj?.type === 'sep') {
              setMsgs((m) => [...m, {role: 'assistant', text: '———'}]);
            } else if (obj?.type === 'answer') {
              setMsgs((m) => [...m, {role: 'assistant', text: obj.text || ''}]);
            } else {
              // 兼容纯文本
              setMsgs((m) => [...m, {role: 'assistant', text: String(obj ?? payload)}]);
            }
            scrollToBottom();
          }
        }
      }
    } catch (e: any) {
      setMsgs((m) => [...m, {role: 'assistant', text: `❗请求失败：${e?.message || e}`}]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  return (
    <>
      <button className={styles.fab} onClick={() => setOpen((o) => !o)}>
        {open ? '×' : 'Chat'}
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            聊天助手
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={useStream}
                onChange={(e) => setUseStream(e.target.checked)}
              />
              <span>流式</span>
            </label>
          </div>

          <div className={styles.messages} ref={listRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`${styles.msg} ${styles[m.role]}`}>
                <div className={styles.bubble}>{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className={`${styles.msg} ${styles.assistant}`}>
                <div className={styles.bubble}>思考中…</div>
              </div>
            )}
          </div>

          <div className={styles.inputBar}>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => (e.key === 'Enter' ? send() : null)}
              placeholder="输入问题并回车"
            />
            <button onClick={send} disabled={loading || !userInput.trim()}>
              发送
            </button>
          </div>
        </div>
      )}
    </>
  );
}
