import { Priority, Todo } from "@/types/Todo";
import WizeModal from "@components/WizeModal/WizeModal";
import { useEffect, useState } from "react";
import WizeInput from "@/components/WizeInput/WizeInput";
import { v4 as uuidv4 } from "uuid";
import { createTodo, updateTodo } from "@/utils/api/Todos";
import WizeButton from "@/components/WizeButton/WizeButton";
import { validateInputObj } from "@/utils/validator";
import { Autocomplete, TextField } from "@mui/material";
import { getAllUsers } from "@/utils/api/Assignees";

interface AddUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
  addTodoFunc: (u: Todo) => void;
  editTodoFunc: (u: Todo) => void;
  selectedTodo: Todo | undefined;
}

enum ModalAction {
  VIEW = "view",
  EDIT = "edit",
  NEW = "new",
}

//TODO: set selected assignee to null on modal close ?
const AddTodoModal: React.FC<AddUserModalProps> = ({
  isOpen,
  handleClose,
  selectedTodo,
  addTodoFunc,
  editTodoFunc,
}) => {
  const emptyTodo: Todo = {
    id: uuidv4(),
    title: "",
    assignee: null,
    startDate: new Date(),
    endDate: null,
    description: "",
    priority: Priority.LOW,
    labels: [],
  };

  const [modalTodo, setModalTodo] = useState<Todo>(
    selectedTodo ? selectedTodo : emptyTodo
  );
  const [modalAction, setModalAction] = useState(
    selectedTodo ? ModalAction.VIEW : ModalAction.NEW
  );
  let shouldShowCheckBox = false;

  if (!modalTodo.endDate && modalAction === ModalAction.EDIT) {
    shouldShowCheckBox = true;
  }

  const [allUsers, setAllUsers] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const allLabels = [
    "BACKLOG",
    "IN_PROGRESS",
    "IN_REVIEW",
    "DONE",
    "PAIRING",
    "FEATURE",
    "BUG",
  ];
  const allPriorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];
  let validationRes = validateInputObj(modalTodo);

  useEffect(() => {
    getAllUsers().then((res: any) => {
      setAllUsers(res.data);
    });
  }, []);

  useEffect(() => {
    setShowErrors(false);
    if (selectedTodo) {
      setModalAction(ModalAction.VIEW);
      setModalTodo(selectedTodo);
    } else {
      setModalAction(ModalAction.NEW);
      setModalTodo(emptyTodo);
    }
  }, [selectedTodo]);

  
  const handleChange = (name: string, value: any) => {
    setModalTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserCreate = async () => {
    setShowErrors(true);
    if (Object.values(validationRes).every((val) => val)) {
      let res = await createTodo(modalTodo);
      console.log(res);
      addTodoFunc(res?.data);
      setModalTodo(emptyTodo);
      handleClose();
      setShowErrors(false);
      return;
    }
  };

  const handleEdit = async () => {
    console.log(modalTodo);
    setShowErrors(true);
    if (Object.values(validationRes).every((val) => val)) {
      let res = await updateTodo(modalTodo);
      console.log(res);
      editTodoFunc(modalTodo);
      setModalTodo(emptyTodo);
      handleClose();
      setShowErrors(false);
      return;
    }
  };

  return (
    <div>
      <WizeModal isOpen={isOpen} onClose={handleClose}>
        <div style={{ maxWidth: "700px" }}>
          <h3>Create new TODO</h3>
          <div style={{ padding: "10px" }}>
            <div className="flex justify-btw">
              <div className="inputContainer">
                <label id="assign-name">Task Title:</label>
                <WizeInput
                  id="assign-name"
                  type="text"
                  name="name"
                  value={modalTodo?.title}
                  readOnly={modalAction == ModalAction?.VIEW ? true : false}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
                <p className="error">
                  {showErrors && !validationRes?.name && (
                    <span>Enter a valid name</span>
                  )}
                </p>
              </div>
              <div className="inputContainer">
                <label id="assign-name">Select assignee</label>
                <Autocomplete
                  disablePortal
                  autoHighlight
                  onChange={(e) => {
                    handleChange(
                      "assignee",
                      allUsers[parseInt(e.target.dataset.optionIndex)]
                    );
                  }}
                  readOnly={modalAction == ModalAction?.VIEW ? true : false}
                  value={modalTodo?.assignee}
                  getOptionLabel={(option: any) => option?.email}
                  options={allUsers}
                  renderInput={(params) => (
                    <div style={{ width: "20rem" }}>
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        label="Assignee"
                        variant="outlined"
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="flex">
              <div className="inputContainer mr-2">
                <label id="todo-startDate">Start date:</label>
                <WizeInput
                  id="todo-startDate"
                  type="date"
                  name="name"
                  value={
                    modalTodo?.startDate
                      ? new Date(modalTodo?.startDate)
                          .toISOString()
                          .slice(0, 10)
                      : ""
                  }
                  readOnly={modalAction === ModalAction.VIEW}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />
                <p className="error">
                  {showErrors && !validationRes?.name && (
                    <span>Enter a valid name</span>
                  )}
                </p>
              </div>

              <div className="inputContainer">
                <label id="todo-endDate">Priority</label>
                <Autocomplete
                  disablePortal
                  autoHighlight
                  onChange={(e) => {
                    handleChange(
                      "priority",
                      allPriorities[parseInt(e.target.dataset.optionIndex)]
                    );
                  }}
                  readOnly={modalAction == ModalAction?.VIEW ? true : false}
                  value={modalTodo.priority}
                  getOptionLabel={(option: any) => option}
                  options={allPriorities}
                  renderInput={(params) => (
                    <div style={{ width: "20rem" }}>
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        label="Assignee"
                        variant="outlined"
                      />
                    </div>
                  )}
                />
                <p className="error">
                  {showErrors && !validationRes?.name && (
                    <span>Select task priority</span>
                  )}
                </p>
              </div>
              {shouldShowCheckBox && (
                <div className="inputContainer mr-2">
                  <label id="todo-endDate">Completed</label>
                  <WizeInput
                    id="todo-endDate"
                    type="checkbox"
                    name="name"
                    checked={modalTodo?.endDate ? true : false}
                    onChange={(e) => {
                      if (e.target.checked) handleChange("endDate", new Date());
                      if (!e.target.checked) handleChange("endDate", null);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="inputContainer">
              <label id="todo-endDate">Description</label> <br />
              <textarea
                name="description"
                cols={110}
                rows={5}
                readOnly={modalAction === ModalAction.VIEW}
                value={modalTodo?.description}
                onChange={(e) => handleChange("description", e.target.value)}
              ></textarea>
              <p className="error">
                {showErrors && !validationRes?.name && (
                  <span>Enter task Descript</span>
                )}
              </p>
            </div>
            <div className="inputContainer flex justify-btw">
              <div className="addedLabels">
                <p>Added labels (click to remove)</p>
                {modalTodo?.labels?.map((label, i) => (
                  <p
                    className="chip"
                    key={i}
                    onClick={() => {
                      handleChange(
                        "labels",
                        modalTodo.labels.filter((l) => l != label)
                      );
                    }}
                  >
                    {label}
                  </p>
                ))}
              </div>
              <div className="adableLabel">
                <p>
                  <u> Available labels(Click to add)</u>
                </p>
                {allLabels.map((label, i) => {
                  let found = modalTodo?.labels?.find((l) => l == label);
                  if (!found) {
                    return (
                      <p
                        className="chip"
                        key={i}
                        onClick={() => {
                          handleChange("labels", [...modalTodo.labels, label]);
                        }}
                      >
                        {label}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          {modalAction == ModalAction.NEW && (
            <div className="fl-r">
              <WizeButton onClick={handleUserCreate}>Create Todo</WizeButton>
            </div>
          )}
          {modalAction == ModalAction.VIEW && (
            <div className="fl-r">
              <WizeButton onClick={() => setModalAction(ModalAction.EDIT)}>
                Edit Mode
              </WizeButton>
            </div>
          )}
          {modalAction == ModalAction.EDIT && (
            <div className="fl-r">
              <WizeButton onClick={handleEdit}>Save</WizeButton>
            </div>
          )}
        </div>
      </WizeModal>
    </div>
  );
};

export default AddTodoModal;
