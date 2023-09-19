const Ressource = require('./_ressource');
const axios = require('axios');

/**
 * Represents a Sender Name Manager responsible for handling sender name-related operations.
 * @extends Ressource
 */
class SenderNameManager extends Ressource {
    /**
     * Create a new SenderNameManager instance with the specified service ID and secret token.
     *
     * @constructor
     * @param {object} params - The parameters for initializing the SenderNameManager.
     * @param {string} params.SERVICE_ID - The service ID associated with the account.
     * @param {string} params.SECRET_TOKEN - The secret token used for authentication.
     * @extends {Ressource} - Inherits from the Ressource class.
     * @memberof SenderNameManager
     */
    constructor({SERVICE_ID, SECRET_TOKEN}) {
        super({SERVICE_ID, SECRET_TOKEN});

        /**
         * The resource URL for sender names associated with the service.
         *
         * @type {string}
         * @readonly
         * @memberof SenderNameManager
         */
        this.RESSOURCE_URL = `${this.API_BASE_URL}/sendernames`;
    }

    /**
     * List sender names with optional query parameters.
     * @async
     * @param {object} [params] - (Optional) Query parameters for listing sender names.
     * @param {number} [params.limit] - (Optional) The maximum number of sender names to retrieve.
     * @param {number} [params.offset] - (Optional) The offset for paginating through sender names.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of sender names.
     * @memberof SenderNameManager
     */
    list = async (params) => {
        return super.list(params);
    }
}

module.exports = SenderNameManager;