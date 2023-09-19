const Ressource = require('./_ressource');
const axios = require('axios');


/**
 * Represents a Group Manager responsible for handling group-related operations.
 * @extends Ressource
 */
class GroupManager extends Ressource {
    /**
     * Create a new GroupManager instance with the specified service ID and secret token.
     *
     * @constructor
     * @param {object} params - The parameters for initializing the GroupManager.
     * @param {string} params.SERVICE_ID - The service ID associated with the account.
     * @param {string} params.SECRET_TOKEN - The secret token used for authentication.
     * @extends {Ressource} - Inherits from the Ressource class.
     * @memberof GroupManager
     */
    constructor({SERVICE_ID, SECRET_TOKEN}) {
        super({SERVICE_ID, SECRET_TOKEN});

        /**
         * The resource URL for groups associated with the service.
         *
         * @type {string}
         * @readonly
         * @memberof GroupManager
         */
        this.RESSOURCE_URL = `${this.API_BASE_URL}/groups`;
    }

    /**
     * List groups with optional query parameters.
     * @async
     * @param {object} [params] - (Optional) Parameters for listing groups.
     * @param {number} [params.limit] - (Optional) The maximum number of groups to retrieve.
     * @param {number} [params.offset] - (Optional) The offset for paginating through groups.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of groups.
     * @memberof GroupManager
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