const API_BASE_URL = 'http://localhost:8080/api/v1';

const API = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('ps_token');
        
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
            
            if (response.status === 401 || response.status === 403) {
                // Handle unauthorized state
                if (!endpoint.includes('/auth/login')) {
                    localStorage.removeItem('ps_token');
                    localStorage.removeItem('ps_user');
                    // Changed to relative index.html path
                    window.location.href = './index.html?session=expired';
                    return;
                }
            }

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || data || 'An unknown error occurred');
            }

            return data;
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    },

    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    },

    post(endpoint, body) {
        return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) });
    },

    put(endpoint, body) {
        return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
    },

    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
};