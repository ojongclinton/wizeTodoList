import { getAllTodos, deleteTodo } from "@/utils/api/Todos";
import { useEffect, useState } from "react";
import WizeButton from "@/components/WizeButton/WizeButton";
import { Todo } from "@/types/Todo";
import AddTodoModal from "./Partials/AddTodoModal";
import WizeDataGrid from "@/components/WizeDataGrid/WIzeDataGrid";
import WizeSearch from "@/components/WizeSearch/WizeSearch";
import WizePaginate from "@/components/Wizepaginate/WizePaginate";
import WizePriority from "@/components/WizePriority/WizePriority";
import WizeFilter from "@/components/WizeFilter/WIzeFilter";

function Todos() {
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTodos();
        setAllTodos(data?.data);
        setAllTodosCopy(data?.data);
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [allTodosCopy, setAllTodosCopy] = useState<Todo[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [paginatedTodos, setPaginatedTodos] = useState<Assignee[]>([]);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);

  const [todoModalVisible, setTodoModalVisible] = useState<boolean>(false);

  const handlePageChange = (data: any[]) => {
    setCurrentPageData(data);
  };

  const handleViewTodo: (t: Todo) => void = (todo) => {
    setTodoModalVisible(true);
    setSelectedTodo(todo);
  };

  const handleModalClose = () => {
    setTodoModalVisible(false);
    setSelectedTodo(undefined);
  };

  const addTodoToList = (u: Todo) => {
    setAllTodos([...allTodos, u]);
    setAllTodosCopy([...allTodos, u]);
  };

  const editTodoInList = (u: Todo) => {
    setAllTodos(allTodos.map((a) => (a.id === u.id ? u : a)));
    setAllTodosCopy(allTodos.map((a) => (a.id === u.id ? u : a)));
  };

  const removeTodoFromList = async (u: Todo) => {
    setAllTodos(allTodos.filter((a) => a.id !== u.id));
    setAllTodosCopy(allTodos.filter((a) => a.id !== u.id));
    let delRes = await deleteTodo(u.id);
  };
  const todosColumns = [
    {
      label: "Task Name",
      acess: "title",
    },
    {
      label: "Priority",
      acess: "priority",
      render: (priority: string) => {
        return <WizePriority level={priority.toLowerCase()} />;
      },
    },
    {
      label: "Assignee",
      acess: "assignee.email",
    },
    {
      label: "Status",
      acess: "endDate",
      render: (endDate: string) => {
        return endDate ? "Done" : "Not Done";
      },
    },
    {
      label: "Start Date",
      acess: "startDate",
      render: (startDate: any) => {
        return startDate
          ? new Date(startDate).toLocaleDateString()
          : "Not started";
      },
    },
  ];
  const todosActions = [
    { label: "View", onClick: handleViewTodo },
    { label: "Delete", onClick: removeTodoFromList },
  ];

  return (
    <div>
      <div className="mt-3 mb-3">
        <p>Search</p>
        <WizeSearch
          data={allTodos}
          setData={setAllTodos}
          searchString={searchString}
          setSearchString={setSearchString}
          originalData={allTodosCopy}
        />
        <WizeFilter
          data={allTodos}
          setData={setAllTodos}
          originalData={allTodosCopy}
        />
        <WizeDataGrid
          allData={allTodosCopy}
          data={paginatedTodos}
          columns={todosColumns}
          actions={todosActions}
        />
      </div>
      <WizePaginate
        data={allTodos}
        setData={setPaginatedTodos}
        onPageChange={handlePageChange}
      />

      <WizeButton onClick={() => setTodoModalVisible(!todoModalVisible)}>
        Create Todo
      </WizeButton>
      <AddTodoModal
        addTodoFunc={addTodoToList}
        editTodoFunc={editTodoInList}
        selectedTodo={selectedTodo}
        handleClose={handleModalClose}
        isOpen={todoModalVisible}
      />
    </div>
  );
}

export default Todos;
