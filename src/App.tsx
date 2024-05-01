import { useState, useEffect } from "react";
import "./App.css";
import todoMock from "@/utils/mocks/apiMockData";
import axiosInstance from "@utils/axios";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    axiosInstance.get("/users").then((response: any) => {
      console.log(response);
    });
  }, []);
  return <div></div>;
}

export default App;
