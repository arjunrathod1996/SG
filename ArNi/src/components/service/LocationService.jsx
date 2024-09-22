import axios from 'axios';

class LocationService {
    static BASE_URL = "http://localhost:8080/api";

    //Assuming you store the JWT token in localStorage
    static getAuthHeaders() {
        const token = localStorage.getItem("token"); // or however you store the JWT token
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
            
        };
    }

    static async saveCountry(country, id = null) {
        const url = id ? `${this.BASE_URL}/location/country?id=${id}` : `${this.BASE_URL}/location/country`;
        try {
            const response = await axios.post(url, country, { headers: this.getAuthHeaders() });
            return response.data;
        } catch (error) {
            console.error("Error saving country:", error);
            throw error;
        }
    }

    static async saveRegion(region, id = null, countryID = null) {
        const params = {};
        if (id) params.id = id;
        
        if (countryID) params.countryID = countryID;

        try {
            const response = await axios.post(`${this.BASE_URL}/location/region`, region, {
                headers: this.getAuthHeaders(),
                params
            });
            return response.data;
        } catch (error) {
            console.error("Error saving region:", error);
            throw error;
        }
    }
    
      static async fetchRegions(page = 0, size = 10) {
        try {
          const response = await axios.get(`${this.BASE_URL}/location/regionPageWise`, {
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

    

    // Fetch countries with pagination
    static async fetchCountries(page, size) {
        try {
            const response = await axios.get(`${this.BASE_URL}/location/countryPageWise`, {
                headers: this.getAuthHeaders(),
                params: { page, size }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching countries:", error);
            throw error;
        }
    }

    static async fetchRegions(page = 0, size = 10, name = null, startDate = null, endDate = null) {
        const params = { page, size, name, startDate, endDate };

        try {
            const response = await axios.get(`${this.BASE_URL}/location/regionPageWise`, {
                headers: this.getAuthHeaders(),
                params
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching regions:", error);
            throw error;
        }
    }

    static async searchCountries(name = '') { // Default to empty string if name is not provided
        console.log("Searching for country with name: " + name);
        try {
          const response = await axios.get(`${this.BASE_URL}/country/search`, {
            headers: this.getAuthHeaders(),
            params: { name }
          });
          return response;
        } catch (error) {
          console.error("Error searching countries:", error);
          throw error;
        }
      }
    

   

    // static async searchCities(name) {
    //     try {
    //         const response = await axios.get(`${this.BASE_URL}/location/search`, {
    //             headers: this.getAuthHeaders(),
    //             params: { name }
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error searching cities:", error);
    //         throw error;
    //     }
    // }

    static async mockLiveLocation(latitude, longitude) {
        try {
            const response = await axios.get(`${this.BASE_URL}/location/mock-live-location`, {
                headers: this.getAuthHeaders(),
                params: { latitude, longitude }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching mock live location:", error);
            throw error;
        }
    }


    // static async searchRegion(city = '') {
    //     console.log("Searching for business with name: " + city);
    
    //     try {
    //         const response = await axios.get(`${this.BASE_URL}/location/search`, {
    //             params: { city }, // Pass the name parameter here
    //             headers: this.getAuthHeaders(),
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error fetching cities:", error);
    //         throw error;
    //     }
    // }

    static async searchRegion(city) {
        console.log("Searching for regions with name: " + city);
        try {
            const response = await axios.get(`${this.BASE_URL}/location/search`, {
                headers: this.getAuthHeaders(),
                params: { city }
            });
            return response; // Return the entire response object
        } catch (error) {
            console.error("Error searching regions:", error);
            throw error;
        }
    }
    

    
}

export default LocationService;

