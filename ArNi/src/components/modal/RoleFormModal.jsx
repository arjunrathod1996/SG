import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from "react-icons/fa";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-modal";
import BusinessService from '../service/BusinessService';
import MerchantService from '../service/MerchantService';
import RoleService from '../service/RoleService'; // Import your role service

const NoOptionsMessage = ({ inputValue, filteredOptions }) => {
  if (inputValue.length < 3) {
    return <div className="p-1 text-gray-500">Enter 3 characters to search</div>;
  }
  if (filteredOptions.length === 0) {
    return <div className="p-1 text-gray-500">Data not found</div>;
  }
  return null;
};

function RoleFormModal({ isOpen, closeModal, handleSubmit }) {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [validityDate, setValidityDate] = useState(null);
  const [email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessOptions, setBusinessOptions] = useState([]);
  const [merchantOptions, setMerchantOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]); // Add role options state
  const [filteredBusinessOptions, setFilteredBusinessOptions] = useState([]);
  const [filteredMerchantOptions, setFilteredMerchantOptions] = useState([]);
  const [businessInputValue, setBusinessInputValue] = useState('');
  const [merchantInputValue, setMerchantInputValue] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchBusinessOptions() {
      try {
        const businesses = await BusinessService.searchBusiness('');
        const options = businesses.map(business => ({
          value: business.id,
          label: business.name,
        }));
        setBusinessOptions(options);
        setFilteredBusinessOptions(options); // Initialize with all options
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    }

    fetchBusinessOptions();
  }, []);

  useEffect(() => {
    async function fetchMerchantOptions() {
      try {
        const merchants = await MerchantService.searchMerchant('');
        const options = merchants.map(merchant => ({
          value: merchant.id,
          label: merchant.name,
        }));
        setMerchantOptions(options);
        setFilteredMerchantOptions(options); // Initialize with all options
      } catch (error) {
        console.error("Error fetching merchants:", error);
      }
    }

    fetchMerchantOptions();
  }, []);

  useEffect(() => {
    async function fetchRoleOptions() {
      try {
        const roles = await RoleService.getRoles();
        const options = roles.map(role => ({
          value: role.name, // or use role.name if more appropriate
          label: role.tag,
        }));
        setRoleOptions(options);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    }

    fetchRoleOptions();
  }, []);

  useEffect(() => {
    if (businessInputValue.length >= 3) {
      const businessResults = businessOptions.filter(option =>
        option.label && option.label.toLowerCase().startsWith(businessInputValue.toLowerCase())
      );
      setFilteredBusinessOptions(businessResults);
    } else {
      setFilteredBusinessOptions([]);
    }
  }, [businessInputValue, businessOptions]);

  useEffect(() => {
    if (merchantInputValue.length >= 3) {
      const merchantResults = merchantOptions.filter(option =>
        option.label && option.label.toLowerCase().startsWith(merchantInputValue.toLowerCase())
      );
      setFilteredMerchantOptions(merchantResults);
    } else {
      setFilteredMerchantOptions([]);
    }
  }, [merchantInputValue, merchantOptions]);

  const validate = () => {
    const newErrors = {};
    if (!selectedBusiness) newErrors.business = "Business is required";
    if (!selectedMerchant) newErrors.merchant = "Merchant is required";
    if (!selectedRole) newErrors.role = "Role is required";
    if (!validityDate) newErrors.validityDate = "Validity Date is required";
    if (!password) newErrors.password = "Password is required";
    if (!email) newErrors.email = "Email is required";
    return newErrors;
  };



const onSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("Submitting userData:", {
        business: selectedBusiness,
        merchant: selectedMerchant,
        role: selectedRole ? selectedRole.value : null, // Pass only the role name or value
        validityDate,
        password,
        email
      });
      handleSubmit({
        business: selectedBusiness,
        merchant: selectedMerchant,
        roleName: selectedRole ? selectedRole.value : null, // Pass only the role name or value
        validityDate,
        password,
        email
      });
    }
  };
  

  const handleBusinessChange = (selectedOption) => {
    setSelectedBusiness(selectedOption);
    if (selectedOption) {
      setErrors(prevErrors => ({ ...prevErrors, business: undefined }));
    }
  };

  const handleMerchantChange = (selectedOption) => {
    setSelectedMerchant(selectedOption);
    if (selectedOption) {
      setErrors(prevErrors => ({ ...prevErrors, merchant: undefined }));
    }
  };

  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption);
    if (selectedOption) {
      setErrors(prevErrors => ({ ...prevErrors, role: undefined }));
    }
  };

  const handleValidityDateChange = (date) => {
    setValidityDate(date);
    if (date) {
      setErrors(prevErrors => ({ ...prevErrors, validityDate: undefined }));
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    if (value) {
      setErrors(prevErrors => ({ ...prevErrors, password: undefined }));
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setUserEmail(value);
    if (value) {
      setErrors(prevErrors => ({ ...prevErrors, password: undefined }));
    }
  };

  const handleBusinessInputChange = (newValue) => {
    setBusinessInputValue(newValue);
  };

  const handleMerchantInputChange = (newValue) => {
    setMerchantInputValue(newValue);
  };

  return (
    <Draggable handle=".drag-handle">
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Role Form Modal"
          className="relative w-full max-w-lg p-4 bg-white rounded-lg shadow-lg mx-2 sm:mx-4 md:mx-auto mt-40 lg:mt-20 md:mt-40 z-40"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center overflow-auto"
        >
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <div className="drag-handle cursor-move mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Role Form</h2>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Business</label>
                <Select
                  options={filteredBusinessOptions}
                  value={selectedBusiness}
                  onChange={handleBusinessChange}
                  onInputChange={handleBusinessInputChange}
                  placeholder="Select Business"
                  noOptionsMessage={() => <NoOptionsMessage inputValue={businessInputValue} filteredOptions={filteredBusinessOptions} />}
                />
                {errors.business && <span className="text-red-500 text-sm">{errors.business}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Merchant</label>
                <Select
                  options={filteredMerchantOptions}
                  value={selectedMerchant}
                  onChange={handleMerchantChange}
                  onInputChange={handleMerchantInputChange}
                  placeholder="Select Merchant"
                  noOptionsMessage={() => <NoOptionsMessage inputValue={merchantInputValue} filteredOptions={filteredMerchantOptions} />}
                />
                {errors.merchant && <span className="text-red-500 text-sm">{errors.merchant}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <Select
                  options={roleOptions}
                  value={selectedRole}
                  onChange={handleRoleChange}
                  placeholder="Select Role"
                />
                {errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Validity Date</label>
                <DatePicker
                  selected={validityDate}
                  onChange={handleValidityDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.validityDate && <span className="text-red-500 text-sm">{errors.validityDate}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter Email"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter Password"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </Draggable>
  );
}

export default RoleFormModal;
