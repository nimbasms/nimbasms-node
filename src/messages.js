const Ressource = require('./_ressource');
const axios = require('axios');

/**
 * Represents a Message Manager responsible for handling message-related operations.
 * @extends Ressource
 */
class MessageManager extends Ressource {
    /**
     * List messages with optional query parameters.
     * @async
     * @param {object} params - Optional query parameters.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of messages.
     */
    async list (params) {
        const _params = new URLSearchParams();
        for(let p in params) {
            _params.append(p, params[p]);
        }

        try {
            const response = await axios.get(`${this.RESSOURCE_URL}?${_params.toString()}`, {
                headers: `Authorization: Basic ${this.API_KEY}`
            })
            return response.data;
        } catch(error) {
            throw error.response ? error.response.data : error.message;
        }
    }

    /**
     * Create a new message.
     * @async
     * @param {object} body - The message data to create.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the created message data.
     */
    async create(body) {
        try {
            const response = await axios.post(this.RESSOURCE_URL, body, { headers : { Authorization: `Basic ${this.API_KEY}`}});
            return response.data;
        
        } catch(error) {
            return error.response ? error.response.data : error.message;
        }
    }

    /**
     * Get details of a specific message.
     * @async
     * @param {string} messageId - The ID of the message to retrieve.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the message details.
     */
    async get(messageId) {
        try {
            const response = await axios.get(`${this.RESSOURCE_URL}/${messageId}`, { headers : { Authorization: `Basic ${this.API_KEY}`}});
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : error.message;
        }
    }
}

module.exports = MessageManager;