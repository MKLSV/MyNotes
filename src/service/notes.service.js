const axios = require('axios');

export const noteService = {
    addNote,
    getNotes,
    removeNote,
};
const url = 'https://dist.nd.ru/api/notes'

async function addNote(data) {
    const dataToSend = JSON.parse(JSON.stringify(data))
    try {
        const response = await axios.post(url, dataToSend.note, {
            headers: {
                Authorization: `Bearer ${dataToSend.token}`
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error processing symbol:', error);
        throw error.response.data.message;
    }
}

async function getNotes(token) {
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error processing symbol:', error);
        throw error.response.data.message;
    }
}

async function removeNote(data) {
    try {
        await axios.delete(`${url}/${data.id}`, {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        })
        console.log('removed succesfuly')
    } catch (error) {
        console.error('Error processing symbol:', error);
        throw error.response;
    }
}

