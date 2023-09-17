const Ressource = require('./_ressource');
const axios = require('axios');


/**
 * Represents a Group Manager responsible for handling group-related operations.
 * @extends Ressource
 */
class GroupManager extends Ressource {
    /**
     * List groups with optional query parameters.
     * @async
     * @param {object} params - Optional query parameters.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of groups.
     */
    async list (params) {
        const _params = new URLSearchParams();
        for(let p in params) {
            _params.append(p, params[p]);
        }

        try{
            const response = await axios.get(`${this.RESSOURCE_URL}?${_params.toString()}`, {
                headers: {
                    Authorization: `Basic ${this.API_KEY}`,
                }
            });

            return response.data;
        } catch(error) {
            throw error.response ? error.response.data : error.message
        }
    }
}

module.exports = GroupManager;