import React, { useReducer, useEffect, useState } from "react";
import LocationService from "../service/LocationService";
import MessageDisplay from "../common/MessageModalDisplay";
import ActionButtons from "../common/ActionButtons";
import RegionFormModal from "../modal/RegionFormModal.jsx";
import DataTable from "react-data-table-component";
import api from "../api/api.js";

const initialState = {
  region: {
    id: "",
    state: "",
    city: "",
    zone: "",
    country: {}
  },
  messages: {
    general: "",
    state: "",
    city: "",
    zone: "",
    modal: ""
  }
};

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#f1f5f9",
    },
  },
};

function reducer(state, action) {
  console.log("Action dispatched:", action);
  switch (action.type) {
    case "SET_REGION":
      return { ...state, region: { ...state.region, ...action.payload } };
    case "SET_MESSAGES":
      return { ...state, messages: { ...state.messages, ...action.payload } };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function RegionPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    fetchData(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Field changed:", name, value);
    dispatch({ type: "SET_REGION", payload: { [name]: value } });
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    console.log("Field focused:", name);
    dispatch({ type: "SET_MESSAGES", payload: { [name]: "" } });
  };

  const handleStateChange = handleChange;
  const handleCityChange = handleChange;
  const handleZoneChange = handleChange;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", state.region);
    let valid = true;
    let newMessages = {
      state: "",
      city: "",
      zone: "",
      country: "",
      modal: ""
    };

    if (!state.region.state) {
      valid = false;
      newMessages.state = "Please select a state.";
    }
    if (!state.region.city) {
      valid = false;
      newMessages.city = "Please select a city.";
    }
    if (!state.region.zone) {
      valid = false;
      newMessages.zone = "Please select a zone.";
    }

    if (!valid) {
      dispatch({ type: "SET_MESSAGES", payload: newMessages });
      return;
    }

    try {
      const safeRegion = {
        id: state.region.id || "",
        state: state.region.state || "",
        city: state.region.city || "",
        zone: state.region.zone || "",
        countryID: state.region.countryID || "",
      };

      console.log("Region data with countryID:", safeRegion);

      if (safeRegion.id) {
        console.log(" >>>>>>>>>>>>>>>>>>>>>>> updated" + state.region.country.id);
        await LocationService.saveRegion(safeRegion, safeRegion.id, state.region.country.id);
      } else {
        console.log(" >>>>>>>>>>>>>>>>>>> created ");
        await LocationService.saveRegion(safeRegion, null, state.region.countryID);
      }

      newMessages.modal = "Successfully saved data.";
      dispatch({ type: "SET_MESSAGES", payload: newMessages });
      console.log("Data saved successfully");
      setTimeout(closeModal, 8000);
      fetchData(currentPage, rowsPerPage);
    } catch (error) {
      console.error("Error saving/updating region:", error);
      newMessages.modal = "Error saving/updating region. Please try again.";
      dispatch({ type: "SET_MESSAGES", payload: newMessages });
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "auto";
    dispatch({ type: "RESET" });
  };

  const handleEdit = () => {
    if (!selectedRow) {
      dispatch({
        type: "SET_MESSAGES",
        payload: { general: "Please select a region to edit." }
      });
      return;
    }
    dispatch({ type: "SET_REGION", payload: selectedRow });
    openModal();
    console.log("Editing row:", selectedRow);
  };

  useEffect(() => {
    let timer;
    if (state.messages.modal) {
      timer = setTimeout(() => {
        closeModal();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [state.messages.modal]);

  const fetchData = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const response = await api.get("/location/regionPageWise", {
        params: {
          page: page - 1,
          size,
          sort: "id,desc",
        },
      });
      setData(response.data.content);
      setTotalRows(response.data.totalElements);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleRowSelected = (row) => {
    if (selectedRow && selectedRow.id === row.id) {
      setSelectedRow(null);
      console.log("Row deselected:", row);
    } else {
      setSelectedRow(row);
      console.log("Row selected:", row);
    }
  };

  const isRowSelected = (row) => {
    return selectedRow && selectedRow.id === row.id;
  };

  const columns = [
    {
      name: "Select",
      cell: (row) => (
        <input
          type="checkbox"
          checked={isRowSelected(row)}
          onChange={() => handleRowSelected(row)}
          style={{ cursor: 'pointer' }}
        />
      ),
      ignoreRowClick: true
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true
    },
    {
      name: "Zone",
      selector: (row) => row.zone,
      sortable: true
    },
    {
      name: "Date",
      selector: (row) => row.creationTime,
      sortable: true
    }
  ];

  return (
    <>
      <div className="p-3 lg:ml-64 z-10 static mt-7">
        <MessageDisplay message={state.messages.general} />
        <h1 className="text-2xl font-bold text-gray-300 uppercase mt-8 mb-2 z-0">
          Region
        </h1>
        <div
          className="table-container table-responsive p-4 bg-white shadow-md rounded-lg"
          style={{ overflowX: "auto" }}
        >
          <ActionButtons openModal={openModal} handleEdit={handleEdit} />
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={data}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              paginationComponentOptions={{
                noRowsPerPage: true
              }}
              onChangePage={(page) => setCurrentPage(page)}
              customStyles={customStyles}
            />
          </div>
          <RegionFormModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            region={state.region}
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleStateChange={handleStateChange}
            handleCityChange={handleCityChange}
            handleZoneChange={handleZoneChange}
            messages={state.messages}
          />
        </div>
      </div>
    </>
  );
}

export default RegionPage;

