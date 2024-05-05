import React, { useState } from "react";
import WizePriority from "@components/WizePriority/WizePriority";

interface WizeFilterProps {
  data: any[];
  originalData: any[];
  setData: (newData: any) => void;
}

const WizeFilter: React.FC<WizeFilterProps> = ({
  data,
  originalData,
  setData,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<
    null | "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  >(null);

  const handleFilter = (priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT") => {
    const filteredData = originalData.filter(
      (item) => item.priority === priority
    );
    setData(filteredData);
    setSelectedPriority(priority);
  };

  const handleFilterByEndDate = () => {
    const filteredData = originalData.filter((item) => item.endDate !== null);
    setData(filteredData);
    setSelectedPriority(null);
  };

  const handleFilterByEndDate2 = () => {
    const filteredData = originalData.filter((item) => item.endDate === null);
    setData(filteredData);
    setSelectedPriority(null);
  };

  const handleResetFilter = () => {
    setData(originalData);
    setSelectedPriority(null);
  };

  return (
    <div>
      <h3>Filter by Priority:</h3>
      <div className="priority-filters flex justify-arn mt-3 mb-3">
        <div onClick={() => handleFilter("LOW")}>
          <WizePriority level="low" />
        </div>
        <div onClick={() => handleFilter("MEDIUM")}>
          <WizePriority level="medium" />
        </div>
        <div onClick={() => handleFilter("HIGH")}>
          <WizePriority level="high" />
        </div>
        <div onClick={() => handleFilter("URGENT")}>
          <WizePriority level="urgent" />
        </div>
        <button onClick={handleResetFilter} className="btn">
          Reset Filter
        </button>
      </div>
      <div className="flex justify-btw">
        <div
          onClick={handleFilterByEndDate}
          style={{
            border: "2px solid black ",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          show done tasks
        </div>
        <div
          onClick={handleFilterByEndDate2}
          style={{
            border: "2px solid black",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          show uncompleted tasks
        </div>
      </div>
    </div>
  );
};

export default WizeFilter;
