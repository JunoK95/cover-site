import { useState } from "react";
import JelloText from "@/components/JelloText/JelloText";
import ChatRoom from "@/components/ChatRoom/ChatRoom";
import { PageLayout } from "@/layouts/PageLayout";
import joinClassnames from "@/utils/joinClassnames";
import styles from "./HomePage.module.scss";
import { colors } from "@/constants/colors";
import { postChat } from "@/api/postChat";
import { postAudioChat } from "@/api/postAudioChat";

interface Message {
  id: number;
  text: string;
  sender: "left" | "right";
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I am Juno's AI assistant to help you learn more about his qualifications as a software engineer. If you have any questions about his skills, experience, or resume, feel free to ask!",
    sender: "left",
  },
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const addMessage = (text: string, sender: "left" | "right") =>
    setMessages((prev) => [...prev, { id: prev.length + 1, text, sender }]);

  const replaceLoading = (sender: "left" | "right", newText: string) =>
    setMessages((prev) =>
      prev.map((msg) =>
        msg.sender === sender && msg.text === "Loading"
          ? { ...msg, text: newText }
          : msg
      )
    );

  const handleSend = async (message: string) => {
    setIsLoading(true);
    addMessage(message, "right");
    addMessage("Loading", "left");

    try {
      const { reply } = await postChat(message);
      replaceLoading("left", reply);
      setIsLoading(false);
    } catch (error) {
      console.error("Error posting chat message:", error);
      replaceLoading("left", "Sorry, something went wrong. Please try again.");
    }
  };

  const handleAudioSend = async (formData: FormData) => {
    setIsLoading(true);
    addMessage("Loading", "right");
    addMessage("Loading", "left");

    try {
      const { msg, reply } = await postAudioChat(formData);
      replaceLoading("right", msg);
      replaceLoading("left", reply);
      setIsLoading(false);
    } catch (error) {
      console.error("Error posting audio chat message:", error);
      replaceLoading("left", "Sorry, something went wrong. Please try again.");
      replaceLoading("right", "Sorry, something went wrong. Please try again.");
    }
  };

  return (
    <PageLayout
      leftColor={colors.red}
      leftContent={
        <div className={joinClassnames([styles.left, styles.centered])}>
          <span className={styles.divDecor}>{`<div>`}</span>
          <span className={styles.subtitle}>Hi I'm</span>
          <div className={styles.title}>
            <JelloText>JUNO</JelloText>
          </div>
          <span
            className={joinClassnames([styles.subtitle, styles.alignRight])}
          >
            - Software Engineer
          </span>
          <span className={styles.divDecor}>{`</div>`}</span>
        </div>
      }
      rightContent={
        <div className={joinClassnames([styles.right, styles.centered])}>
          <ChatRoom
            isLoading={isLoading}
            messages={messages}
            onSend={handleSend}
            onAudioSend={handleAudioSend}
          />
        </div>
      }
    />
  );
}
