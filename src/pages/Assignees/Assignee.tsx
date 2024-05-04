import { getAllUsers } from "@/utils/api/Assignees";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddUserModal from "./Partials/AddUserModal";
import WizeButton from "@/components/WizeButton/WizeButton";

function Assignee() {
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        console.log(data);
        setAllAssignees(data?.data);
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);
  const [allAssignees, setAllAssignees] = useState<Assignee[]>([]);
  const [userModalVisible, setUserModalVisible] = useState<boolean>(false);

  const handleViewUser: (a: Assignee) => void = (assignee) => {
    setUserModalVisible(true);
    setSelectedAssignee(assignee);
  };

  const handleModalClose = () => {
    setUserModalVisible(false);
    setSelectedAssignee(undefined);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" style={{ fontWeight: 900 }}>
                Full name
              </TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="right">Telephone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allAssignees.map((row) => (
              <TableRow key={row.id}>
                <TableCell scope="row">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">
                  <button onClick={() => handleViewUser(row)}>View</button>
                  <button>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      in assignee page, usemodal is : {userModalVisible ? "true" : "false"}
      <WizeButton onClick={() => setUserModalVisible(!userModalVisible)} />
      <AddUserModal
        selectedAssignee={selectedAssignee}
        handleClose={handleModalClose}
        isOpen={userModalVisible}
      />
    </div>
  );
}

export default Assignee;