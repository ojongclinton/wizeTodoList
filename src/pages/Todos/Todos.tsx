import { getAllTodos, deleteTodo } from "@/utils/api/Todos";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import AddUserModal from "./Partials/AddAssigneeModal";
import WizeButton from "@/components/WizeButton/WizeButton";
import { Todo } from "@/types/Todo";
import AddTodoModal from "./Partials/AddTodoModal";

function Todos() {
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTodos();
        console.log(data);
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

  return (
    <div>
      <div style={{ margin: "10px 0px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell component="th" style={{ fontWeight: 900 }}>
                  Task name
                </TableCell>
                <TableCell align="left">Priority</TableCell>
                {/* <TableCell align="center">labels</TableCell> */}
                <TableCell align="center">Assignee</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allTodos.map((row) => (
                <TableRow key={row.id}>
                  <TableCell scope="row">{row.title}</TableCell>
                  <TableCell align="left">{row.priority}</TableCell>
                  {/* <TableCell align="center">
                    {row.labels.map((label, i) => (
                      <span key={i} style={{ margin: "0px 1px" }}>
                        {label},
                      </span>
                    ))}
                  </TableCell> */}
                  <TableCell align="center">
                    {row?.assignee ? row?.assignee?.email : "Not Assigned "}
                  </TableCell>

                  <TableCell scope="row" align="right">
                    {row.endDate
                      ? `Done on : ${new Date(
                          row.endDate
                        ).toLocaleDateString()}`
                      : "Not Done"}
                  </TableCell>
                  <TableCell scope="row" align="right">
                    {row.startDate
                      ? new Date(row.startDate).toLocaleDateString()
                      : "Not started"}
                  </TableCell>

                  <TableCell align="right">
                    <WizeButton onClick={() => handleViewTodo(row)}>
                      View
                    </WizeButton>
                    <WizeButton onClick={() => removeTodoFromList(row)}>
                      Delete
                    </WizeButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
