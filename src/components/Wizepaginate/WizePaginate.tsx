import React, { useState, useEffect } from "react";

interface PaginatorProps {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  onPageChange: (data: any[]) => void; // Callback function to handle page change
}

const WizePaginate: React.FC<PaginatorProps> = ({
  data,
  setData,
  onPageChange,
}) => {
  const perPage = 2; // Number of items per page
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedData = data.slice(startIndex, endIndex);
    if (paginatedData) setData(paginatedData);
    onPageChange(paginatedData); // Pass paginated data back to parent component
  }, [currentPage, data, setData, perPage]); // Only re-run the effect if these dependencies change

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pagination mt-3 mb-3">
      <button
        className="btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span style={{ fontSize: "20px" }} className="ml-2 mr-2">
        {currentPage}
      </span>
      <button
        className="btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage * perPage >= data.length}
      >
        Next
      </button>
    </div>
  );
};

export default WizePaginate;
