const Ressource = require('./_ressource');
const axios = require('axios');


/**
 * Represents an Account Manager responsible for handling account-related operations.
 * @extends Ressource
 */
class AccountManager extends Ressource {    
    /**
     * Fetch account information.
     * @async
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the account information.
     */
    async get(){
        try{
            const response = await axios.get(`${this.RESSOURCE_URL}`, {
                headers: `Authorization: Basic ${this.API_KEY}`
            })
            return response.data;
        } catch(error) {
            throw error.response ? error.response.data : error.message;
        }
    }
}

module.exports = AccountManager;