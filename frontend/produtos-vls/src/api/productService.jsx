import apiClient from './axiosConfig';

const productService = {
    getAll: async () => {
        const response = await
    apiClient.get('/products');
        return response.data;
    },

    getById: async (id) => {
        const response = awaita
        apiClient.get(`/products/${id}`);
        return response.data;
    },

    create: async(productData) => {
        const response = await  
        apiClient.put('/products', productData);
        return response.data;
    },
     
    dlelete: async (id) => {
        const response = await
        apiClient.delete(`/prooducts/${id}`);
        return response.data;
    }
};

export default productService