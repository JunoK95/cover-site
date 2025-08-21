import React, { useEffect, useMemo, useRef, useState } from "react";

export type TypingEffectProps = {
  children: React.ReactNode;
  speed?: number;
  startDelay?: number;
  pauseOnPunctuation?: number;
  punctuation?: string;
  className?: string;
  cursor?: boolean;
  caret?: React.ReactNode;
  onDone?: () => void;
};

function isTextNode(n: unknown): n is string | number {
  return typeof n === "string" || typeof n === "number";
}

function flattenText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (isTextNode(node)) return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (React.isValidElement(node))
    // @ts-expect-error children may be undefined or not typed as React.ReactNode
    return flattenText(node.props.children as React.ReactNode);
  return "";
}

function measureTextLength(node: React.ReactNode): number {
  return flattenText(node).length;
}

function revealNode(
  node: React.ReactNode,
  visible: number
): [React.ReactNode, number] {
  if (visible <= 0) {
    if (isTextNode(node)) return ["", 0];
    if (Array.isArray(node)) return [node.map(() => ""), 0];
    if (React.isValidElement(node)) {
      // @ts-expect-error children may be undefined or not typed as React.ReactNode
      const [child] = revealNode(node.props.children as React.ReactNode, 0);
      return [React.cloneElement(node, undefined, child), 0];
    }
    return [node, 0];
  }

  if (isTextNode(node)) {
    const t = String(node);
    const slice = t.slice(0, visible);
    const consumed = Math.min(visible, t.length);
    return [slice, visible - consumed];
  }

  if (Array.isArray(node)) {
    const out: React.ReactNode[] = [];
    let remain = visible;
    for (const ch of node) {
      const [r, rem] = revealNode(ch, remain);
      out.push(r);
      remain = rem;
    }
    return [out, remain];
  }

  if (React.isValidElement(node)) {
    const [child, rem] = revealNode(
      // @ts-expect-error children may be undefined or not typed as React.ReactNode
      node.props.children as React.ReactNode,
      visible
    );
    return [React.cloneElement(node, undefined, child), rem];
  }

  return [node, visible];
}

function lastVisibleChar(
  root: React.ReactNode,
  visible: number
): string | null {
  const text = flattenText(root);
  if (visible <= 0 || visible > text.length) return null;
  return text[visible - 1];
}

export default function TypingEffect({
  children,
  speed = 50,
  startDelay = 0,
  pauseOnPunctuation = 6,
  punctuation = ",.;:!?…",
  className,
  cursor = false,
  caret,
  onDone,
}: TypingEffectProps) {
  const [visible, setVisible] = useState(0);
  const [snapshot, setSnapshot] = useState(children);
  const prevText = useRef(flattenText(children));
  const total = useMemo(() => measureTextLength(snapshot), [snapshot]);

  useEffect(() => {
    const newText = flattenText(children);
    if (newText !== prevText.current) {
      prevText.current = newText;
      setSnapshot(children);
      setVisible(0);
    }
  }, [children]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (visible >= total) return;

    const last = lastVisibleChar(snapshot, visible) || "";
    const isPunct = punctuation.includes(last);
    const delay = isPunct ? speed * pauseOnPunctuation : speed;

    const id = window.setTimeout(
      () => setVisible((v) => Math.min(total, v + 1)),
      visible === 0 && startDelay > 0 ? startDelay : delay
    );

    return () => window.clearTimeout(id);
  }, [
    visible,
    total,
    speed,
    pauseOnPunctuation,
    punctuation,
    startDelay,
    snapshot,
  ]);

  useEffect(() => {
    if (visible >= total) onDone?.();
  }, [visible, total, onDone]);

  const [revealed] = useMemo(
    () => revealNode(snapshot, visible),
    [snapshot, visible]
  );

  return (
    <span
      className={className}
      style={{
        whiteSpace: "pre-wrap",
        display: "inline-block",
        position: "relative",
      }}
    >
      <span style={{ display: "inline" }}>{revealed}</span>
      {cursor && visible < total && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            position: "absolute",
            right: 0,
            top: 0,
            transform: "translateX(100%)",
          }}
          className="w-[0.6ch] h-[1em] bg-current animate-caret"
        >
          {caret}
        </span>
      )}
      <style>{`
        @keyframes caretBlink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
        .animate-caret { animation: caretBlink 1s steps(1, end) infinite }
      `}</style>
    </span>
  );
}
