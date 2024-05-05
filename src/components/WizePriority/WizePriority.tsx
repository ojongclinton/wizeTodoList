import React from "react";

interface WizePriorityProps {
  level: "low" | "medium" | "high" | "urgent"; // Added "urgent" to level prop
}

const WizePriority: React.FC<WizePriorityProps> = ({ level }) => {
  let color: string;
  let label: string;

  switch (level) {
    case "low":
      color = "#3BB273"; // Green
      label = level.toUpperCase();
      break;
    case "medium":
      color = "#FFA500"; // Orange
      label = level.toUpperCase();
      break;
    case "high":
      color = "#FF5733"; // Red
      label = level.toUpperCase();
      break;
    case "urgent":
      color = "#FF0000"; // Redder
      label = "URGENT";
      break;
    default:
      color = "#000000"; // Default
      label = "UNKNOWN";
  }

  return (
    <div
      style={{
        backgroundColor: color,
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "4px",
        display: "inline-block",
        cursor: "pointer",
      }}
    >
      {label}
    </div>
  );
};

export default WizePriority;
