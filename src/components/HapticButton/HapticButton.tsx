import React from "react";

type HapticButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  ariaLabel?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const HapticButton = ({
  children,
  onClick,
  style,
  ariaLabel,
  disabled = false,
  ...props
}: HapticButtonProps) => {
  const defaultStyle = {
    padding: "0.5rem 0.75rem",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "Roboto, Arial, sans-serif",
    color: "#fff",
    backgroundColor: "#1976d2",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    transition: "background-color 0.3s, box-shadow 0.3s",
  };

  const hoverStyle = {
    backgroundColor: "#1565c0",
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  };

  const [isHovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        ...defaultStyle,
        ...(isHovered ? hoverStyle : {}),
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      aria-label={ariaLabel}
      {...(disabled ? { "aria-disabled": true } : {})}
      {...props}
    >
      {children}
    </button>
  );
};

export default HapticButton;
