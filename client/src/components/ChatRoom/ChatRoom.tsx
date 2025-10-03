import { useState, useEffect, useRef } from "react";
import styles from "./ChatRoom.module.scss";
import { colors } from "@/constants/colors";
import ChatRoomMessage from "./ChatRoomMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPaperPlane,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import HapticButton from "../HapticButton/HapticButton";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import { faqs } from "@/constants/faqs";

// --- Types ---
interface Message {
  id: number;
  text: string;
  sender: "left" | "right";
}

interface ChatRoomProps {
  isLoading?: boolean;
  messages?: Message[];
  onSend?: (message: string) => void;
  onAudioSend?: (formData: FormData) => void;
}

export default function ChatRoom({
  isLoading = false,
  messages = [],
  onSend,
  onAudioSend,
}: ChatRoomProps) {
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const { recording, startRecording, stopRecording } =
    useAudioRecorder(onAudioSend);

  // Auto-scroll when messages update
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSend?.(input);
      setInput("");
    }
  };

  const onFAQClick = (question: { label: string; message: string }) => {
    const { message } = question;
    onSend?.(message);
  };

  return (
    <div className={styles.chatRoom}>
      {/* Messages */}
      <div ref={chatRef} className={styles.messages}>
        {messages.map(({ id, text, sender }) => (
          <div
            key={id}
            className={sender === "left" ? styles.msgLeft : styles.msgRight}
          >
            <div className={styles.bubble}>
              <ChatRoomMessage content={text} />
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className={styles.recommendationRow}>
        {faqs.map((question, idx) => {
          const { label } = question;
          return (
            <button
              key={idx}
              className={styles.recommendationButton}
              disabled={isLoading}
              onClick={() => onFAQClick(question)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Input Row */}
      <div className={styles.inputRow}>
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className={styles.input}
        />

        <button
          onClick={recording ? stopRecording : startRecording}
          disabled={isLoading}
          className={styles.iconButton}
        >
          <FontAwesomeIcon
            icon={recording ? faSquare : faMicrophone}
            color={recording ? colors.red : "#1976d2"}
          />
        </button>

        <HapticButton
          onClick={handleSend}
          ariaLabel="Send message"
          disabled={isLoading}
          className={styles.iconButton}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </HapticButton>
      </div>
    </div>
  );
}
