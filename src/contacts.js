const Ressource = require('./_ressource');
const axios = require('axios');


/**
 * Represents a Contact Manager responsible for handling contact-related operations.
 * @extends Ressource
 */
class ContactManager extends Ressource {
    /**
     * Create a new contact.
     * @async
     * @param {object} body - The contact data to create.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the created contact data.
     */
    async create (body){
        console.log(body)
        try{
            const response = await axios.post(
                `${this.RESSOURCE_URL}`,
                body,
                {
                    headers: {
                        Authorization: `Basic ${this.API_KEY}`
                    },
                }
            ); 
            return response.data;
        } catch(error) {
            throw error.response ? error.response.data : error.message;
        }
    }

    /**
     * List contacts with optional query parameters.
     * @async
     * @param {object} params - Optional query parameters.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of contacts.
     */
    async list(params){
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
}

module.exports = ContactManager;