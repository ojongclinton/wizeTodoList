import React from "react";

interface AssigneeTodoListProps {
  assigneeId: string | undefined;
}

//TODO: implement fetch tasks by assignee
const AssigneeTodoList: React.FC<AssigneeTodoListProps> = ({ assigneeId }) => {
  return (
    <div>
      {/* <p>THe id of the user is {assigneeId}</p> */}
    </div>
  );
};

export default AssigneeTodoList;
