import { useState } from "react";
import styles from "./ChatRoom.module.scss";
import { useEffect, useRef } from "react";
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
  isLoading,
  messages = [],
  onSend,
  onAudioSend,
}: ChatRoomProps) {
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const { recording, startRecording, stopRecording } =
    useAudioRecorder(onAudioSend);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend?.(input);
    setInput("");
  };

  console.log("Rendering ChatRoom with messages:", messages);

  return (
    <div className={styles.chatRoom}>
      <div ref={chatRef} className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={msg.sender === "left" ? styles.msgLeft : styles.msgRight}
          >
            <div className={styles.bubble}>
              <ChatRoomMessage content={msg.text} />
            </div>
          </div>
        ))}
      </div>
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
