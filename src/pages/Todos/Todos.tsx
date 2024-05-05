import { getAllTodos, deleteTodo } from "@/utils/api/Todos";
import { useEffect, useState } from "react";
import WizeButton from "@/components/WizeButton/WizeButton";
import { Todo } from "@/types/Todo";
import AddTodoModal from "./Partials/AddTodoModal";
import WizeDataGrid from "@/components/WizeDataGrid/WIzeDataGrid";

function Todos() {
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTodos();
        setAllTodos(data?.data);
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todoModalVisible, setTodoModalVisible] = useState<boolean>(false);

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
  };

  const editTodoInList = (u: Todo) => {
    setAllTodos(allTodos.map((a) => (a.id === u.id ? u : a)));
  };

  const removeTodoFromList = async (u: Todo) => {
    setAllTodos(allTodos.filter((a) => a.id !== u.id));
    let delRes = await deleteTodo(u.id);
    console.log(delRes);
  };
  const todosColumns = [
    {
      label: "Task Name",
      acess: "title",
    },
    {
      label: "Priority",
      acess: "priority",
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
        console.log(startDate);
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
        <WizeDataGrid
          data={allTodos}
          columns={todosColumns}
          actions={todosActions}
        />
      </div>
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
