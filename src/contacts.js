const Ressource = require('./_ressource');
const axios = require('axios');


/**
 * Represents a Contact Manager responsible for handling contact-related operations.
 * @extends Ressource
 */
class ContactManager extends Ressource {
    /**
     * Create a new ContactManager instance with the specified service ID and secret token.
     *
     * @constructor
     * @param {object} options - The parameters for initializing the ContactManager.
     * @param {string} options.SERVICE_ID - The service ID associated with the account.
     * @param {string} options.SECRET_TOKEN - The secret token used for authentication.
     * @extends {Ressource} - Inherits from the Ressource class.
     * @memberof ContactManager
     */
    constructor({SERVICE_ID, SECRET_TOKEN}) {
        super({SERVICE_ID, SECRET_TOKEN});

        /**
         * The resource URL for contacts associated with the service.
         *
         * @type {string}
         * @readonly
         * @memberof ContactManager
         */
        this.RESSOURCE_URL = `${this.API_BASE_URL}/contacts`;
    }

    /**
     * Create a new contact.
     * @async
     * @param {object} body - The contact data to create.
     * @param {string} body.numero - The phone number of the contact.
     * @param {string} [body.name] - (Optional) The name of the contact.
     * @param {string[]} [body.groups] - (Optional) An array of strings representing the groups to which the contact belongs.     
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the created contact data.
     * @memberof ContactManager 
     */
    async create (body){
        return super.create(body);
    }

    /**
     * List contacts with optional query parameters.
     * @async
     * @param {object} [params] - (Optional) Query parameters for listing contacts.
     * @param {number} [params.limit] - (Optional) The maximum number of contacts to retrieve.
     * @param {number} [params.offset] - (Optional) The offset for paginating through contacts.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of contacts.
     * @memberof ContactManager 
     */
    async list(params){
        return super.list(params);
    }
}

module.exports = ContactManager;