import { getAllUsers, deleteUser } from "@/utils/api/Assignees";
import { useEffect, useState } from "react";
import AddUserModal from "./Partials/AddAssigneeModal";
import WizeButton from "@/components/WizeButton/WizeButton";
import WizeDataGrid from "@/components/WizeDataGrid/WIzeDataGrid";
import WizeSearch from "@/components/WizeSearch/WizeSearch";
import WizePaginate from "@/components/Wizepaginate/WizePaginate";

function Assignee() {
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        console.log(data);
        setAllAssignees(data?.data);
        setAllAssigneesCopy(data?.data);
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);
  const [allAssignees, setAllAssignees] = useState<Assignee[]>([]);
  const [allAssigneesCopy, setAllAssigneesCopy] = useState<Assignee[]>([]);
  const [userModalVisible, setUserModalVisible] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");
  const [paginatedAssignees, setPaginatedAssignees] = useState<Assignee[]>([]);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);

  const handleViewUser: (a: Assignee) => void = (assignee) => {
    setUserModalVisible(true);
    setSelectedAssignee(assignee);
  };

  const handlePageChange = (data: any[]) => {
    setCurrentPageData(data);
  };

  const handleModalClose = () => {
    setUserModalVisible(false);
    setSelectedAssignee(undefined);
  };

  const addAssigneeToList = (u: Assignee) => {
    setAllAssignees([...allAssignees, u]);
    setAllAssigneesCopy([...allAssignees, u]);
  };

  const editAssigneeInList = (u: Assignee) => {
    setAllAssignees(allAssignees.map((a) => (a.id === u.id ? u : a)));
    setAllAssigneesCopy(allAssignees.map((a) => (a.id === u.id ? u : a)));
  };

  const removeAssigneeFromList = async (u: Assignee) => {
    setAllAssignees(allAssignees.filter((a) => a.id !== u.id));
    setAllAssigneesCopy(allAssignees.filter((a) => a.id !== u.id));
    await deleteUser(u.id);
  };

  useEffect(() => {
    if (searchString.length == 0) {
      setAllAssignees(allAssigneesCopy);
    }
  }, [searchString]);

  const assigneesColumns = [
    {
      label: "Full Name",
      acess: "name",
    },
    {
      label: "Email",
      acess: "email",
    },
    {
      label: "Telephone",
      acess: "phone",
    },
  ];
  const assigneesActions = [
    { label: "View", onClick: handleViewUser },
    { label: "Delete", onClick: removeAssigneeFromList },
  ];
  return (
    <div>
      <div className="mt-3 mb-3">
        <p>Search</p>
        <WizeSearch
          data={allAssignees}
          setData={setAllAssignees}
          searchString={searchString}
          setSearchString={setSearchString}
          originalData={allAssigneesCopy}
        />
        <WizeDataGrid
          allData={allAssigneesCopy}
          data={paginatedAssignees}
          columns={assigneesColumns}
          actions={assigneesActions}
        />
      </div>
      <WizePaginate
        data={allAssignees}
        setData={setPaginatedAssignees}
        onPageChange={handlePageChange}
      />
      <WizeButton onClick={() => setUserModalVisible(!userModalVisible)}>
        Create Assignee
      </WizeButton>
      <AddUserModal
        addAssigneeFunc={addAssigneeToList}
        editAssigneeFunc={editAssigneeInList}
        selectedAssignee={selectedAssignee}
        handleClose={handleModalClose}
        isOpen={userModalVisible}
      />
    </div>
  );
}

export default Assignee;
