const axios = require('axios');

export const authService = {
    login,
    registration,
    logout,
};

const url = 'https://dist.nd.ru/'

async function registration(data) {
    try {
        const endpoint = 'api/reg'
        const APIurl = url + endpoint
        const response = await axios.post(APIurl, data)
        return response.data;
    } catch (error) {
        console.error('Error processing symbol:', error);
        throw error.response.data.message;
    }
}

async function login(data) {
    try {
        const endpoint = 'api/auth'
        const APIurl = url + endpoint
        const token = await axios.post(APIurl, data)
        const user = await autorization(token.data.accessToken)
        return user;
    } catch (error) {
        console.error('Error processing symbol:', error);
        throw error.response.data.message;
    }
}

async function autorization(token) {
    try {
        const endpoint = 'api/auth'
        const APIurl = url + endpoint
        const response = await axios.get(APIurl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        response.data.token = token
        return response.data;
    } catch (error) {
        console.error('Error processing symbol:', error);
        return error;
    }
}

async function logout(token) {
    try {
        const endpoint = 'api/auth'
        const APIurl = url + endpoint
        await axios.delete(APIurl,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return "Успешно";
    } catch (error) {
        console.error('Error processing symbol:', error);
        return error;
    }

}
