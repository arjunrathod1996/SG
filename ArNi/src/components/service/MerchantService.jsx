import axios from "axios";




class MerchantService {
    static BASE_URL = "http://localhost:8080/api";

     //Assuming you store the JWT token in localStorage
     static getAuthHeaders() {
      const token = localStorage.getItem("token"); // or however you store the JWT token
      return {
          Authorization: `Bearer ${token}`
      };
  }



static async saveMerchant(merchant, id = null, businessID = null, regionID = null) {
  // Construct the URL with query parameters if they are present
  let url = `${this.BASE_URL}/merchant`;
  const params = new URLSearchParams();
  if (id) params.append('id', id);
  if (businessID) params.append('businessID', businessID);
  if (regionID) params.append('regionID', regionID);

  if (params.toString()) {
      url += `?${params.toString()}`;
  }

  try {
      console.log('Request URL:', url);
      console.log('Request Body:', merchant);

      const response = await axios.post(url, merchant, {
          headers: this.getAuthHeaders() // Include Authorization header
      });
      return response.data;
  } catch (error) {
      console.error('Error saving or updating merchant:', error);
      throw error;
  }
}

static async fetchMerchantPageWise(page = 0, size = 10) {
  try {
    const response = await axios.get(`${this.BASE_URL}/merchantPageWise`, {
     // params: { page, size, sort: 'id,desc' },
      params: {
          page: page - 1,
          size,
          sort: "id,desc",
        },
      headers: this.getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error;
  }
}

static async searchMerchant(name) {
  console.log("Searching for merchant with name: " + name);

  try {
      const response = await axios.get(`${this.BASE_URL}/merchant/search`, {
          params: { name },
          headers: this.getAuthHeaders(),
      });

      return response.data;
  } catch (error) {
      console.error("Error fetching merchants:", error);
      throw error;
  }
}


// static async saveUser(userData) {

//   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> id : " + JSON.stringify(userData));

//   try {
//     // Base URL for the request
//     let url = `${this.BASE_URL}/merchant/user`;

//     // Create an empty params object
//     const params = {};

//     // Conditionally add query parameters if they are present in userData
//     if (userData.id) {
//       params.id = userData.id;
//     }
//     if (userData.businessID) {
//       params.businessID = userData.businessID;
//     }
//     if (userData.merchantID) {
//       params.merchantID = userData.merchantID;
//     }

//     // Send a POST request to create or update the user
//     const response = await axios.post(url, userData, {
//       headers: this.getAuthHeaders(),
//       params: params,  // Add params to the request
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error saving user:", error);
//     throw error;
//   }
// }


// static async saveUser(userData, id=null, businessID = null, merchantID = null) {
//   console.log("Preparing to send user data:", JSON.stringify(userData));

//    // Create an empty params object
//    const params = {};

//    if (id) params.id = id;

//    if (businessID) params.businessID = businessID;

//    if (merchantID) params.merchantID = merchantID;

  
//     try {
//       const response = await axios.post(`${this.BASE_URL}/merchant/user`, FormData, {
//           headers: this.getAuthHeaders(),
//           params
//       });
//       return response.data;
//   } catch (error) {
//       console.error("Error saving region:", error);
//       throw error;
//   }
//   }

static async saveUser(userData, id = null, businessID = null, merchantID = null) {
  console.log("Preparing to send user data:", JSON.stringify(userData));

  // Create an empty params object
  const params = {};

  if (id) params.id = id;
  if (businessID) params.businessID = businessID;
  if (merchantID) params.merchantID = merchantID;

  try {
    const response = await axios.post(`${this.BASE_URL}/merchant/user`, userData, {
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json'
      },
      params
    });
    return response.data;
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
}




}



export default MerchantService;


