import JelloText from "../../components/JelloText/JelloText";
import { PageLayout } from "../../layouts/PageLayout";
import joinClassnames from "../../utils/joinClassnames";
import styles from "./HomePage.module.scss";
import { colors } from "../../constants/colors";
import ChatRoom from "@/components/ChatRoom/ChatRoom";
import { useState } from "react";
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
    text: "Hello! I am Juno's AI assistant to help you learn more his qualifications as a software engineer. If you have any questions about his skills, experience, or resume, feel free to ask!",
    sender: "left",
  },
];

const leftContent = (
  <div className={joinClassnames([styles.left, styles.centered])}>
    <span className={styles.divDecor}>{`<div>`}</span>
    <span className={styles.subtitle}>Hi I'm</span>
    <div className={styles.title}>
      <JelloText>JUNO</JelloText>
    </div>
    <span className={joinClassnames([styles.subtitle, styles.alignRight])}>
      - Software Engineer
    </span>
    <span className={styles.divDecor}>{`</div>`}</span>
  </div>
);

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const onSend = async (message: string) => {
    console.log("onSend called with message:", message);
    setIsLoading(true);
    setMessages([
      ...messages,
      { id: messages.length + 1, text: message, sender: "right" },
      { id: messages.length + 2, text: "Loading", sender: "left" },
    ]);

    const receivedMessage = await postChat(message);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.sender === "left" && msg.text === "Loading"
          ? {
              ...msg,
              text: `${receivedMessage.reply}`,
            }
          : msg
      )
    );
    setIsLoading(false);
  };

  const onAudioSend = async (formData: FormData) => {
    console.log("onSend called with message:", formData);
    setIsLoading(true);
    setMessages([
      ...messages,
      { id: messages.length + 1, text: "Loading", sender: "right" },
      { id: messages.length + 2, text: "Loading", sender: "left" },
    ]);

    const receivedMessage = await postAudioChat(formData);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messages.length + 1 && msg.sender === "right"
          ? {
              ...msg,
              text: `${receivedMessage.msg}`,
            }
          : msg
      )
    );
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messages.length + 2 && msg.sender === "left"
          ? {
              ...msg,
              text: `${receivedMessage.reply}`,
            }
          : msg
      )
    );
    setIsLoading(false);
  };

  const rightContent = (
    <div className={joinClassnames([styles.right, styles.centered])}>
      <ChatRoom
        isLoading={isLoading}
        messages={messages}
        onSend={onSend}
        onAudioSend={onAudioSend}
      />
    </div>
  );

  return (
    <PageLayout
      leftContent={leftContent}
      leftColor={colors.red}
      rightContent={rightContent}
    />
  );
}

export default HomePage;
