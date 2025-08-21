import { useEffect, useState } from "react";

const TypingEffect = ({
  text,
  speed = 50,
}: {
  text: string;
  speed: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
      {displayedText}
    </p>
  );
};

export default TypingEffect;
