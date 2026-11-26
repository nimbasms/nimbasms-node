const Ressource = require('./_ressource');


/**
 * Represents a Purchase Manager responsible for handling purchase-related operations.
 * @extends Ressource
 */
class PurchaseManager extends Ressource {
    /**
     * Create a new PurchaseManager instance with the specified service ID and secret token.
     *
     * @constructor
     * @param {object} params - The parameters for initializing the PurchaseManager.
     * @param {string} params.SERVICE_ID - The service ID associated with the account.
     * @param {string} params.SECRET_TOKEN - The secret token used for authentication.
     * @extends {Ressource}
     * @memberof PurchaseManager
     */
    constructor({SERVICE_ID, SECRET_TOKEN}) {
        super({SERVICE_ID, SECRET_TOKEN});

        /**
         * The resource URL for purchases associated with the account.
         *
         * @type {string}
         * @readonly
         * @memberof PurchaseManager
         */
        this.RESSOURCE_URL = `${this.API_BASE_URL}/purchases`;
    }

    /**
     * List purchases with optional query parameters.
     * @async
     * @param {object} [params] - (Optional) Query parameters for listing purchases.
     * @param {number} [params.limit] - (Optional) The maximum number of purchases to retrieve.
     * @param {number} [params.offset] - (Optional) The offset for paginating through purchases.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of purchases.
     * @memberof PurchaseManager
     */
    async list(params) {
        return super.list(params);
    }
}

module.exports = PurchaseManager;
