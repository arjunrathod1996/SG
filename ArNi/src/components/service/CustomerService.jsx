import axios from 'axios';

class CustomerService {
  static BASE_URL = "http://localhost:8080/api";

  static getAuthHeaders() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return {};
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  static async createCustomer(customer, countryID = null, regionID = null) {
    console.log("customer:", customer);
    console.log("customer countryID:", countryID);
    console.log("customer regionID:", regionID);

    const params = {};
    if (countryID) params.countryID = countryID;
    if (regionID) params.regionID = regionID;

    try {
      const response = await axios.post(`${this.BASE_URL}/customers`, customer, {
        headers: this.getAuthHeaders(),
        params
      });

      console.log('Customer created successfully:', response.data);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized request: Check your token and permissions');
        alert('Unauthorized access. Please login again.');
      } else {
        console.error('Error creating customer:', error.response ? error.response.data : error.message);
      }
      throw error;
    }
  }

  static async updateCustomer(id, customer, countryID, regionID) {
    console.log("customer:", customer);
    console.log("customer countryID:", countryID);
    console.log("customer regionID:", regionID);

    const payload = { ...customer };
    if (countryID) payload.countryID = countryID;
    if (regionID) payload.regionID = regionID;

    const url = `${this.BASE_URL}/customers/${id}`;

    try {
      const response = await axios.put(url, payload, {
        headers: this.getAuthHeaders()
      });

      console.log('Customer updated successfully:', response.data);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized request: Check your token and permissions');
        alert('Unauthorized access. Please login again.');
      } else {
        console.error('Error updating customer:', error.response ? error.response.data : error.message);
      }
      throw error;
    }
  }
}

export default CustomerService;
