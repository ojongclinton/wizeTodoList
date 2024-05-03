import React, { useEffect, useState } from "react";
import WizeModal from "@components/WizeModal/WizeModal";

interface AddUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
  selectedAssignee: Assignee | undefined;
}

//TODO: set selected assignee to null on modal close ?
const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  handleClose,
  selectedAssignee,
}) => {
  return (
    <div>
      <WizeModal isOpen={isOpen} onClose={handleClose}>
        <div style={{ maxWidth: "700px" }}>
          <p>{selectedAssignee?.name}</p>
        </div>
      </WizeModal>
    </div>
  );
};

export default AddUserModal;
