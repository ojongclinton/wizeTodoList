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
import * as XLSX from "xlsx";

interface WizeDataGridProps {
  allData: Array<any>;
  data: Array<any>;
  columns: Array<any>;
  actions: Array<{ label: string; onClick: (row: any) => void }>;
}

const WizeDataGrid: React.FC<WizeDataGridProps> = ({
  data,
  columns,
  actions,
  allData,
}) => {
  const exportToExcel = () => {
    const exportData = allData.map((row) => {
      const exportedRow: { [key: string]: any } = {};
      columns.forEach((column) => {
        if (column.acess.includes(".")) {
          let parts: string[] = column.acess.split(".");
          exportedRow[column.label] =
            row[parts[0]] && row[parts[0]][parts[1]]
              ? row[parts[0]][parts[1]]
              : "Unassigned";
        } else {
          if (column?.label?.toLowerCase() == "priority") {
            exportedRow[column.label] = row[column.acess.toLowerCase()];
          } else {
            exportedRow[column.label] = column.render
              ? column.render(row[column.acess])
              : row[column.acess.toLowerCase()];
          }
        }
      });
      return exportedRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "exported_data.xlsx");
  };

  return (
    <div>
      <div className="mt-2 mb-2">
        <WizeButton onClick={exportToExcel}>Export to Excel</WizeButton>
      </div>
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
                    let parts: string[] = column.acess.split(".");
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
    </div>
  );
};

export default WizeDataGrid;
