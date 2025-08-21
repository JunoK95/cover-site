import { useState } from "react";
import styles from "./ChatRoom.module.scss";
import { useEffect, useRef } from "react";
import { colors } from "@/constants/colors";
import ChatRoomMessage from "./ChatRoomMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import HapticButton from "../HapticButton/HapticButton";

interface Message {
  id: number;
  text: string;
  sender: "left" | "right";
}

export default function ChatRoom({
  isLoading,
  messages = [],
  onSend,
  onAudioSend,
}: {
  isLoading?: boolean;
  messages?: Message[];
  onSend?: (message: string) => void;
  onAudioSend?: (formData: FormData) => void;
}) {
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    setInput("");
    onSend?.(input);
  };

  const handleRecord = async () => {
    if (!recording) {
      // 🎙️ Start recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Convert to Blob
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const formData = new FormData();
        formData.append("audio", audioBlob, "recorded.webm");

        console.log("⏳ Sending audio...");

        try {
          await onAudioSend?.(formData);
          console.log("✅ Done");
        } catch (err) {
          console.error("❌ Error sending audio", err);
        }

        // Stop mic tracks (release mic permission)
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;

      setRecording(true);
      console.log("🔴 Recording...");
    } else {
      // ⏹️ Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop(); // triggers onstop
      }
      setRecording(false);
      console.log("⏹️ Processing...");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        borderRadius: 8,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        className={styles.conversationContainer}
        ref={chatContainerRef}
        style={{ flex: 1, overflowY: "auto", marginBottom: 16 }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.sender === "left" ? "flex-start" : "flex-end",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                background:
                  msg.sender === "left" ? `${colors.red}44` : "#1976d2",
                color: msg.sender === "left" ? "#333" : "#fff",
                padding: "8px 12px",
                borderRadius: 16,
                maxWidth: "70%",
                textAlign: msg.sender === "left" ? "left" : "right",
              }}
            >
              <ChatRoomMessage content={msg.text} />
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          position: "relative",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "100%",
            padding: "8px", // space for the button
            boxSizing: "border-box",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          disabled={isLoading}
        />
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            color: "white",
            padding: "0 12px",
          }}
        >
          <button
            onClick={handleRecord}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "24px",
              width: "24px",
              border: "none",
              background: "transparent",
              color: "#1976d2",
              cursor: "pointer",
            }}
            disabled={isLoading}
            aria-label="Record audio"
          >
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        </div>
        <div>
          <HapticButton
            onClick={handleSend}
            ariaLabel="Send message"
            disabled={isLoading}
            style={{ width: "40px", height: "40px" }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </HapticButton>
        </div>
      </div>
    </div>
  );
}
