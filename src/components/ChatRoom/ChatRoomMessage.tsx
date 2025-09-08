import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import EllipsisAnimation from "../EllipsisAnimation/EllipsisAnimation";
import TypingEffect from "../TypingEffect/TypingEffect";
import collapseBlankLines from "@/utils/collapseBlankLines";

type ChatMessageProps = {
  content: string;
};

export default function ChatRoomMessage({ content }: ChatMessageProps) {
  // Use EllipsisAnimation for loading state
  if (content === "Loading") {
    return <EllipsisAnimation />;
  }

  // Render markdown content
  return (
    <TypingEffect speed={25}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          p: (props) => (
            <p style={{ margin: "0", display: "block" }}>{props.children}</p>
          ),
          ul: (props) => (
            <ul style={{ margin: 0, padding: 0, display: "grid", gap: "8px" }}>
              {props.children}
            </ul>
          ),
          li: (props) => (
            <li style={{ margin: 0, padding: 0, height: "auto" }}>
              {props.children}
            </li>
          ),
          img: (props) => (
            <img
              {...props}
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                margin: "8px 0",
              }}
              alt={props.alt || ""}
            />
          ),
          blockquote: (props) => (
            <blockquote
              style={{
                borderLeft: "4px solid #ccc",
                paddingLeft: "1em",
                color: "#555",
                fontStyle: "italic",
                margin: "8px 0",
              }}
            >
              {props.children}
            </blockquote>
          ),
          code: (props) => {
            const { children, className } = props;
            const isInline = !className;

            return isInline ? (
              <code
                style={{
                  background: "#f5f5f5",
                  padding: "2px 4px",
                  borderRadius: "4px",
                }}
              >
                {children}
              </code>
            ) : (
              <pre
                style={{
                  background: "#f5f5f5",
                  padding: "12px",
                  borderRadius: "8px",
                  overflowX: "auto",
                }}
              >
                <code className={className}>{children}</code>
              </pre>
            );
          },
        }}
      >
        {collapseBlankLines(content)}
      </ReactMarkdown>
    </TypingEffect>
  );
}
