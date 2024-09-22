import axios from "axios";

class BusinessService {
    static BASE_URL = "http://localhost:8080/api";
    

    // Assuming you store the JWT token in localStorage
    static getAuthHeaders() {
        const token = localStorage.getItem("token"); // or however you store the JWT token
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    }

    static async fetchBusinesses() {
        return axios.get(`${this.BASE_URL}/businesses`, { headers: this.getAuthHeaders() })
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching businesses:", error);
                throw error;
            });
    }

    static async saveBusiness(business) {
        return axios.post(`${this.BASE_URL}/business`, business, { headers: this.getAuthHeaders() })
            .then(response => response.data)
            .catch(error => {
                console.error("Error saving business:", error);
                throw error;
            });
    }

    static async updateBusiness(business) {
        return axios.put(`${this.BASE_URL}/business/${business.id}`, business, { headers: this.getAuthHeaders() })
            .then(response => response.data)
            .catch(error => {
                console.error("Error updating business:", error);
                throw error;
            });
    }

    static async fetchCategories() {
        try {
            const response = await axios.get(`${this.BASE_URL}/categories`, { headers: this.getAuthHeaders() });
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    }

    static async searchBusiness(name) {
        console.log("Searching for business with name: " + name);
    
        try {
            const response = await axios.get(`${this.BASE_URL}/business/search`, {
                params: { name }, // Pass the name parameter here
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching businesses:", error);
            throw error;
        }
    }
    
    


     // Search businesses with filters
     static async searchBusinesses(name, fullName, category, startDate, endDate, page, size) {
        const params = {
            name,
            fullName,
            category,
            startDate,
            endDate,
            page,
            size
        };

        try {
            const response = await axios.get(`${this.BASE_URL}/businesses/search`, {
                headers: this.getAuthHeaders(),
                params
            });
            return response.data;
        } catch (error) {
            console.error("Error searching businesses:", error);
            throw error;
        }
    }

    
}

export default BusinessService;
