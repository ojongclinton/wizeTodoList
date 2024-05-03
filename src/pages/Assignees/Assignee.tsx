import { getAllUsers } from "@/utils/api/Assignees";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Assignee() {
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
                <TableCell align="right" component="div">
                  <button>View</button>
                  <button>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Assignee;
