import React, { useState, useEffect } from "react";
import BusinessTable from "../Tables/BusinessTable";
import ActionButtons from "../common/ActionButtons";
import BusinessFormModal from "../modal/BusinessFormModal";
import BusinessService from "../service/BusinessService";
import MessageDisplay from "../common/MessageModalDisplay";
import "react-datepicker/dist/react-datepicker.css";

function BusinessPageTry() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [business, setBusiness] = useState({
    id: "",
    name: "",
    fullName: "",
    address: "",
    description: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [messages, setMessages] = useState({
    general: "",
    name: "",
    fullName: "",
    address: "",
    description: "",
    category: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
    fetchCategories();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const data = await BusinessService.fetchBusinesses();
      setBusinesses(data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await BusinessService.fetchCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusiness({ ...business, [name]: value });
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setMessages({ ...messages, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newMessages = {
      general: "",
      name: "",
      fullName: "",
      address: "",
      description: "",
      category: "",
      modal: "",
    };
  
    if (!business.name) {
      valid = false;
      newMessages.name = "Please enter a name.";
    }
    if (!business.fullName) {
      valid = false;
      newMessages.fullName = "Please enter a full name.";
    }
    if (!business.address) {
      valid = false;
      newMessages.address = "Please enter an address.";
    }
    if (!business.description) {
      valid = false;
      newMessages.description = "Please enter a description.";
    }
    if (!business.category) {
      valid = false;
      newMessages.category = "Please select a category.";
    }
  
    if (!valid) {
      setMessages(newMessages);
      return;
    }
  
    try {
      if (business.id) {
        await BusinessService.updateBusiness(business);
      } else {
        await BusinessService.saveBusiness(business);
        
      }
      fetchBusinesses();
      const successMessage = "Successfully Saved data.";
      newMessages.modal = successMessage;
      setMessages(newMessages);
      closeModal();
    } catch (error) {
      console.error("Error saving/updating business:", error);
      const errorMessage = error.response?.data?.message || "Error saving/updating business. Please try again.";
      newMessages.modal = errorMessage;
      setMessages(newMessages);
    }
  };
  

  const handleEdit = () => {
    if (!selectedBusiness) {
      setMessages({ ...messages, general: "Please select a business to edit." });
      return;
    }
    const selectedBusinessData = businesses.find((b) => b.id === selectedBusiness);
    setBusiness(selectedBusinessData);
    openModal();
  };

  const handleDelete = async () => {
    if (!selectedBusiness) {
      setMessages({ ...messages, general: "Please select a business to delete." });
      return;
    }
    try {
      await BusinessService.deleteBusiness(selectedBusiness);
      fetchBusinesses();
      setSelectedBusiness(null);
      setMessages({ ...messages, general: "" });
    } catch (error) {
      console.error("Error deleting business:", error);
      setMessages({ ...messages, general: "Error deleting business. Please try again." });
    }
  };

  const handleCategoryChange = (e) => {
    setBusiness({ ...business, category: e.target.value });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setBusiness({
      id: "",
      name: "",
      fullName: "",
      address: "",
      description: "",
      category: "",
    });
    setMessages({
      general: "",
      name: "",
      fullName: "",
      address: "",
      description: "",
      category: "",
      modal: "",
    });
  };

  return (
    <>
      <div className="">
        <div className="border-gray-200 rounded-lg dark:border-gray-700">
          <MessageDisplay message={messages.general} />
          <h1 className="p-4 sm:ml-64 text-2xl font-bold text-gray-300 uppercase">
            Business Management
          </h1>
          <ActionButtons openModal={openModal} handleEdit={handleEdit} handleDelete={handleDelete} />
          <BusinessTable businesses={businesses} />
          <BusinessFormModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            business={business}
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleCategoryChange={handleCategoryChange}
            filteredCategories={categories}
            messages={messages}
          />
        </div>
      </div>
    </>
  );
}

export default BusinessPageTry;
