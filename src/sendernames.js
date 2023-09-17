const Ressource = require('./_ressource');
const axios = require('axios');

/**
 * Represents a Sender Name Manager responsible for handling sender name-related operations.
 * @extends Ressource
 */
class SenderNameManager extends Ressource {
    /**
     * List sender names with optional query parameters.
     * @async
     * @param {object} params - Optional query parameters.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of sender names.
     */
    list = async (params) => {
        try {
            const response = await axios.get(this.RESSOURCE_URL, { headers: { Authorization: `Basic ${this.API_KEY}` } });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    }
}

module.exports = SenderNameManager;