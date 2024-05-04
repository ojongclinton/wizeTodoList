import { Todo } from "@/types/Todo";
import WizeModal from "@components/WizeModal/WizeModal";
import { useEffect, useState } from "react";
import AssigneeTodoList from "./AssigneeTodoList";
import WizeInput from "@/components/WizeInput/WizeInput";
import { v4 as uuidv4 } from "uuid";
import { createUser, updateUser } from "@/utils/api/Assignees";
import WizeButton from "@/components/WizeButton/WizeButton";
import { validateInputObj } from "@/utils/validator";

interface AddUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
  addAssigneeFunc: (u: Assignee) => void;
  editAssigneeFunc: (u: Assignee) => void;
  selectedAssignee: Assignee | undefined;
}

enum ModalAction {
  VIEW = "view",
  EDIT = "edit",
  NEW = "new",
}

//TODO: set selected assignee to null on modal close ?
const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  handleClose,
  selectedAssignee,
  addAssigneeFunc,
  editAssigneeFunc,
}) => {
  const emptyAssignee: Assignee = {
    id: uuidv4(),
    name: "",
    email: "",
    phone: "",
  };

  const [modalAssignee, setModalAssignee] = useState<Assignee>(
    selectedAssignee ? selectedAssignee : emptyAssignee
  );
  const [modalAction, setModalAction] = useState(
    selectedAssignee ? ModalAction.VIEW : ModalAction.NEW
  );

  const [showErrors, setShowErrors] = useState(false);

  const [assigneeTodos, setAssigneeTodos] = useState<Todo | []>([]);
  let validationRes = validateInputObj(modalAssignee);
  console.log(validationRes);

  useEffect(() => {
    setShowErrors(false);
    if (selectedAssignee) {
      setModalAction(ModalAction.VIEW);
      setModalAssignee(selectedAssignee);
    } else {
      setModalAction(ModalAction.NEW);
      setModalAssignee(emptyAssignee);
    }
  }, [selectedAssignee]);

  const handleChange = (name: string, value: string) => {
    setModalAssignee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserCreate = async () => {
    setShowErrors(true);
    if (Object.values(validationRes).every((val) => val)) {
      let res = await createUser(modalAssignee);
      console.log(res);
      addAssigneeFunc(res?.data);
      setModalAssignee(emptyAssignee);
      handleClose();
      setShowErrors(false);
      return;
    }
  };

  const handleEdit = async () => {
    console.log(modalAssignee);
    setShowErrors(true);
    if (Object.values(validationRes).every((val) => val)) {
      let res = await updateUser(modalAssignee);
      console.log(res);
      editAssigneeFunc(modalAssignee);
      setModalAssignee(emptyAssignee);
      handleClose();
      setShowErrors(false);
      return;
    }
  };

  return (
    <div>
      <WizeModal isOpen={isOpen} onClose={handleClose}>
        <div style={{ maxWidth: "700px" }}>
          <h3>Create new Assignee</h3>
          <div style={{ padding: "10px" }}>
            <div className="inputContainer">
              <label id="assign-name">Assignee Name :</label>
              <WizeInput
                id="assign-name"
                type="text"
                name="name"
                value={modalAssignee?.name}
                readOnly={modalAction == ModalAction?.VIEW ? true : false}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <p className="error">
                {showErrors && !validationRes?.name && (
                  <span>Enter a valid name</span>
                )}
              </p>
            </div>
            <div className="inputContainer">
              <label id="assign-email">Assignee Email :</label>
              <WizeInput
                id="assign-email"
                type="email"
                name="email"
                value={modalAssignee?.email}
                readOnly={modalAction == ModalAction?.VIEW ? true : false}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <p className="error">
                {showErrors && !validationRes?.email && (
                  <span>Enter a valid Email</span>
                )}
              </p>
            </div>
            <div className="inputContainer">
              <label>Assignee Telephone :</label>
              <WizeInput
                type="tel"
                name="phone"
                value={modalAssignee?.phone}
                readOnly={modalAction == ModalAction?.VIEW ? true : false}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <p className="error">
                {showErrors && !validationRes?.phone && (
                  <span>Enter a valid Phone number</span>
                )}
              </p>
            </div>
          </div>
          <div>
            <AssigneeTodoList assigneeId={modalAssignee?.id} />
          </div>
          {modalAction == ModalAction.NEW && (
            <div style={{ float: "right" }}>
              <WizeButton onClick={handleUserCreate}>Create User</WizeButton>
            </div>
          )}
          {modalAction == ModalAction.VIEW && (
            <div style={{ float: "right" }}>
              <WizeButton onClick={() => setModalAction(ModalAction.EDIT)}>
                Edit Mode
              </WizeButton>
            </div>
          )}
          {modalAction == ModalAction.EDIT && (
            <div style={{ float: "right" }}>
              <WizeButton onClick={handleEdit}>Save</WizeButton>
            </div>
          )}
        </div>
      </WizeModal>
    </div>
  );
};

export default AddUserModal;
