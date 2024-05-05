import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import WizeButton from "@components/WizeButton/WizeButton";

interface WizeDataGridProps {
  data: Array<any>;
  columns: Array<any>;
  actions: Array<{ label: string; onClick: (row: any) => void }>;
}

const WizeDataGrid: React.FC<WizeDataGridProps> = ({
  data,
  columns,
  actions,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column: any) => (
              <TableCell
                key={column.label}
                component="th"
                style={{ fontWeight: 900 }}
              >
                {column.label}
              </TableCell>
            ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column, index) => {
                if (column.acess.includes(".")) {
                  let parts = column.acess.split(".");
                  return (
                    <TableCell key={index} scope="row">
                      {row[[parts[0]]]
                        ? row[[parts[0]]][parts[1]]
                        : "Unassigned"}
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={index} scope="row">
                    {column.render ? (
                      <>{column.render(row[column.acess])}</>
                    ) : (
                      <>{row[column.acess.toLowerCase()]}</>
                    )}
                  </TableCell>
                );
              })}
              <TableCell align="right">
                {actions.map((action, index) => (
                  <WizeButton key={index} onClick={() => action.onClick(row)}>
                    {action.label}
                  </WizeButton>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WizeDataGrid;
