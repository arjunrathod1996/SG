import axios from "axios";



class UserService{
    static BASE_URL = "http://localhost:8080";

    
    static async login(email, password) {
        try {
          const response = await axios.post(`${UserService.BASE_URL}/login/authenticate`, { email, password });
          // Log the entire response for debugging
          console.log("Login response:", response);
          
          // Extract the jwtToken from response
          if (response.data && response.data.jwtToken) {
            return { token: response.data.jwtToken }; // Return token in expected structure
          } else {
            throw new Error('Token not found in response');
          }
        } catch (error) {
          // Log the error response for debugging
          console.error("Login error:", error.response || error.message);
          throw new Error(error.response?.data || error.message || "An error occurred");
        }
      }

      // static async loginWithPhone(phoneNumber, otp) {
      //   const response = await fetch(`${this.BASE_URL}/login/otp`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ phoneNumber, otp }),
      //   });
      //   const data = await response.json();
      //   if (response.ok) {
      //     localStorage.setItem("token", data.token);
      //   }
      //   return data;
      // }

    static async getCurrentUser() {
        try {
          const response = await fetch(`${UserService.BASE_URL}/user/current`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch current user');
          }
          return await response.json();
        } catch (error) {
          console.error("Error fetching current user:", error);
          return null;
        }
      }

    static isAuthenticated() {
        return !!localStorage.getItem('token');
    }

     // Logout method
  static async logout() {
    // Remove token from local storage
    localStorage.removeItem('token');
    
    // Optionally, you can perform other cleanup tasks here

    // Redirect to login page
  //  window.location.href = "/login";
  }


  static async sendOtp(phoneNumber) {
    try {
      // const token = localStorage.getItem('token');
      // if (!token) {
      //   throw new Error('No token found');
      // }

      const response = await axios.post(`${this.BASE_URL}/auth/generate-otp/${phoneNumber}`, null, {
        // headers: {
        //   "Authorization": `Bearer ${token}`
        // }
      });

      // Log the entire response for debugging
      console.log("Send OTP response:", response);

      return response.data;
    } catch (error) {
      // Log the error response for debugging
      console.error("Send OTP error:", error.response || error.message);
      throw new Error(error.response?.data || error.message || 'Failed to send OTP');
    }
  }

  // static async loginWithPhone(phoneNumber, otp) {

  //   console.log(" >>>>>>>>> : phoneNumber : ", phoneNumber);
  //   console.log(" >>>>>>>>> : otp : ", otp);

  //   const response = await axios.post(`${this.BASE_URL}/auth/verify-otp/${phoneNumber}/${otp}`);
  //   try{
  //     // Extract the jwtToken from response
  //     if (response.data && response.data.jwtToken) {
  //       return { token: response.data.jwtToken }; // Return token in expected structure
  //     } else {
  //       throw new Error('Token not found in response');
  //     }
  //   }catch (error) {
  //     // Log the error response for debugging
  //     console.error("Login error:", error.response || error.message);
  //     throw new Error(error.response?.data || error.message || "An error occurred");
  //   }
  // }

  static async loginWithPhone(phoneNumber, otp) {
    console.log(" >>>>>>>>> : phoneNumber : ", phoneNumber);
    console.log(" >>>>>>>>> : otp : ", otp);

    try {
        const response = await axios.post(`${this.BASE_URL}/auth/verify-otp/${phoneNumber}/${otp}`);

        // Extract the jwtToken from response
        if (response.data && response.data.token) { // Adjusted key to 'token'
            return { token: response.data.token }; // Return token in expected structure
        } else {
            throw new Error('Token not found in response');
        }
    } catch (error) {
        // Log the error response for debugging
        console.error("Login error:", error.response || error.message);
        throw new Error(error.response?.data || error.message || "An error occurred");
    }
  }

 
}

export default UserService;