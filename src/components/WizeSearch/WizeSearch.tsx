import { Todo } from "@/types/Todo";
import React, { useEffect } from "react";

interface WizeSearchProps {
  data: Todo[] | Assignee[];
  originalData: Todo[] | Assignee[];
  setData: (newData: any) => void;
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

//TODO: search nested onject too
const searchItem = (item: Todo | Assignee, searchString: string): boolean => {
  for (let key in item) {
    const value = item[key];
    if (typeof value === "object" && value !== null) {
      if (searchItem(value as Todo | Assignee, searchString)) {
        return true;
      }
    } else if (
      value?.toString().toLowerCase().includes(searchString.toLowerCase())
    ) {
      return true;
    }
  }
  return false;
};

const WizeSearch: React.FC<WizeSearchProps> = ({
  setData,
  searchString,
  setSearchString,
  originalData,
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchString.length > 0) {
        setData(originalData.filter((item) => searchItem(item, searchString)));
      } else {
        setData(originalData);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchString, originalData, setData]);

  return (
    <div className="mb-2">
      <input
        placeholder="Start typing to search"
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
    </div>
  );
};

export default WizeSearch;
