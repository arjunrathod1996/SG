import axios from 'axios';

class RoleService {

  static BASE_URL = "http://localhost:8080/api";

  static getAuthHeaders() {
    const token = localStorage.getItem("token"); // or however you store the JWT token
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  static async getRoles() {
    try {
      const response = await axios.get(`${this.BASE_URL}/roles`, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      // Improved error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request data:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
      throw error;
    }
  }
}

export default RoleService;
