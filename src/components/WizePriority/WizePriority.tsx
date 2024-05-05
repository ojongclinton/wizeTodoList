import React from "react";

interface WizePriorityProps {
  level: "low" | "medium" | "high"; // Level prop can only be one of these three values
}

const WizePriority: React.FC<WizePriorityProps> = ({ level }) => {
  let color: string;
  switch (level) {
    case "low":
      color = "#3BB273"; // Green for low priority
      break;
    case "medium":
      color = "#FFA500"; // Orange for medium priority
      break;
    case "high":
      color = "#FF5733"; // Red for high priority
      break;
    default:
      color = "#000000"; // Default color for unknown priority level
  }

  return (
    <div
      style={{
        backgroundColor: color,
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "4px",
        display: "inline-block",
      }}
    >
      {level.toUpperCase()}
    </div>
  );
};

export default WizePriority;
