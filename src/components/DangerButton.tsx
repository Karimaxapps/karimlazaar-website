"use client";

export default function DangerButton({
  children,
  confirmText,
}: {
  children: React.ReactNode;
  confirmText: string;
}) {
  return (
    <button
      type="submit"
      className="btn"
      style={{
        background: "transparent",
        color: "#f08080",
        border: "1.5px solid rgba(240,128,128,0.4)",
        fontSize: "0.88rem",
        padding: "10px 20px",
      }}
      onClick={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
