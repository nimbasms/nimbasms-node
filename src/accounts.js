const Ressource = require('./_ressource');


/**
 * Represents an Account Manager responsible for handling account-related operations.
 * @extends Ressource
 */
class AccountManager extends Ressource {   
    /**
     * Create a new AccountManager instance with the specified service ID and secret token.
     *
     * @constructor
     * @param {object} params - The parameters for initializing the AccountManager.
     * @param {string} params.SERVICE_ID - The service ID associated with the account.
     * @param {string} params.SECRET_TOKEN - The secret token used for authentication.
     * @extends {Ressource} - Inherits from the Ressource class.
     * @memberof AccountManager
     */
    constructor({SERVICE_ID, SECRET_TOKEN}) {
        super({SERVICE_ID, SECRET_TOKEN});

        /**
         * The resource URL for accounts associated with the service.
         *
         * @type {string}
         * @readonly
         * @memberof AccountManager
         */
        this.RESSOURCE_URL = `${this.API_BASE_URL}/accounts`;
    }

    /**
     * Fetch account information.
     * @async
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the account information.
     * @memberof AccountManager
     */
    async get(){
        const data = this.request({ 
            url: this.RESSOURCE_URL 
        });
        
        return data;
    }
}

module.exports = AccountManager;