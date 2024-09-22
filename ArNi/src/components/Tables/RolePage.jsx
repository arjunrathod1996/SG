import React, { useState } from 'react';
import ActionButtons from '../common/ActionButtons';
import RoleFormModal from '../modal/RoleFormModal';
import MerchantService from '../service/MerchantService';

function RolePage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const openModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = "hidden";
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "auto";
  };

//   const handleSubmit = (formData) => {
//     console.log("Form Data:", formData);
//     // Perform the desired action with formData, e.g., send it to an API

//     closeModal(); // Close the modal after submitting
//   };

// const handleSubmit = async (formData) => {
//     // try {
//     //   const result = await MerchantService.saveUser(formData);

//     //   console.log('Operation successful:', result);
//     //   // Optionally refresh data or update UI
//     // } catch (error) {
//     //   console.error('Error submitting form:', error);
//     //   // Optionally display error message to user
//     // } finally {
//     //   closeModal(); // Close the modal regardless of success or failure
//     // }


//     try {
//       // const safeRole = {
//       //   id: safeRole.id || "",
//       //   businssID : safeRole.business.value || "",
//       //   merchantID: safeRole.merchant.value || "",
//       //   roleName: safeRole.roleName || "",
//       //   email: safeRole.email,
//       //   password : safeRole.password || "",
//       // };

//      /// console.log(">>>>>>>>>>>>>>>>>>>>>>> : " + safeRole);

//       if (formData.id) {
//         console.log(" >>>>>>>>>>>>>>>>>>>>>>> updated" + formData.id);
//         await LocationService.saveRegion(safeRegion, safeRegion.id, state.region.country.id);
//       } else {
//         console.log(" >>>>>>>>>>>>>>>>>>> created " + formData.merchant.value);
//         await MerchantService.saveUser(formData, null, formData.business.value, formData.merchant.value );
//       }

   
//       console.log("Data saved successfully");
//       // setTimeout(closeModal, 8000);
//       // fetchData(currentPage, rowsPerPage);
//     } catch (error) {
//       console.error("Error saving/updating region:", error);
//       //newMessages.modal = "Error saving/updating region. Please try again.";
//      // dispatch({ type: "SET_MESSAGES", payload: newMessages });
//     }
//   };

const handleSubmit = async (formData) => {
  try {
    if (formData.id) {
      console.log(" >>>>>>>>>>>>>>>>>>>>>>> updated" + formData.id);
      await LocationService.saveRegion(formData, formData.id, formData.region.country.id);
    } else {
      console.log(" >>>>>>>>>>>>>>>>>>> created " + formData.merchant.value);
      await MerchantService.saveUser(formData, null, formData.business.value, formData.merchant.value);
    }

    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving/updating region:", error);
  }
};



  return (
    <>
      <div className="p-3 lg:ml-64 z-10 static mt-7">
        <h1 className="text-2xl font-bold text-gray-300 uppercase mt-8 mb-2 z-0">
          Role
        </h1>
        <ActionButtons openModal={openModal} />
        <RoleFormModal 
          isOpen={modalIsOpen}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default RolePage;
