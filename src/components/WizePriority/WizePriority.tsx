import React from "react";

interface WizePriorityProps {
  level: "low" | "medium" | "high" | "urgent"; // Added "urgent" to level prop
}

const WizePriority: React.FC<WizePriorityProps> = ({ level }) => {
  let color: string;
  let label: string;

  switch (level) {
    case "low":
      color = "#3BB273"; // Green for low priority
      label = level.toUpperCase();
      break;
    case "medium":
      color = "#FFA500"; // Orange for medium priority
      label = level.toUpperCase();
      break;
    case "high":
      color = "#FF5733"; // Red for high priority
      label = level.toUpperCase();
      break;
    case "urgent":
      color = "#FF0000"; // Red for urgent priority
      label = "URGENT";
      break;
    default:
      color = "#000000"; // Default color for unknown priority level
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
      }}
    >
      {label}
    </div>
  );
};

export default WizePriority;
