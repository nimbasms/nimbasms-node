const axios = require('axios');

/**
 * Represents a base resource manager class responsible for handling common operations.
 */
class Ressource{
    /**
     * Create a new instance of the resource manager.
     * @param {object} options - Options for configuring the Nimba SMS client.
     * @param {string} options.SERVICE_ID - Unique identifier for your application.
     * @param {string} options.SECRET_TOKEN - The secret token used to authenticate your application.
     */
    constructor({SERVICE_ID, SECRET_TOKEN}) {
        if (new.target === Ressource) {
            throw new Error("Cannot instanciate this class !");
        }

        /**
         * The API key used for authorization.
         * @type {string}
         */
        this.API_KEY = Buffer.from(`${SERVICE_ID}:${SECRET_TOKEN}`).toString('base64');
        
        /**
         * The base route to Nimba SMS API.
         * @type {string}
         */
        this.API_BASE_URL = 'https://api.nimbasms.com/v1';

        /**
         * Indicates the next page of results in a paginated resource listing.
         * @type {string|null}
         * @private
         */
        this._next = null;

        /**
         * Indicates the previous page of results in a paginated resource listing.
         * @type {string|null}
         * @private
         */
        this._previous = null;

        /**
         * The total count of resources available for pagination.
         * @type {number}
         * @private
         */
        this._count = 0;
    }

    /**
     * List ressource with optional query parameters.
     * @async
     * @param {object} params - (Optional) Query parameters for listing ressource.
     * @param {number} [params.limit] - (Optional) The maximum number of ressource to retrieve.
     * @param {number} [params.offset] - (Optional) The offset for paginating through ressource.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of ressource.
     * @memberof Ressource
     */

    async list(params){
        // Validate the query parameters
        if(params !== undefined) {
            if(!(params instanceof Object)) {
                throw new Error("Query parameters must be an object")
            }

            if(params.limit && (isNaN(params.limit) || params.limit < 0)) {
                throw new Error("limit query parameter must be greater than 0");
            }
    
            if(params.offset && (isNaN(params.offset) || params.offset < 0)) {
                throw new Error("offset query parameter must be greater than 0");
            }
        }

        const data = await this.request({
            url: this.RESSOURCE_URL,
            params: params,
        });

        this._next = data.next;
        this._count = data.count;
        this._previous = data.previous;
        
        return data;

    }

    /**
     * Send a custom HTTP request.
     * @async
     * @param {object} options - Configuration options for the HTTP request.
     * @param {string} options.url - The URL for the request.
     * @param {string} options.method - The HTTP method for the request (e.g., 'GET', 'POST').
     * @param {object} [options.params] - (Optional) Query parameters for the request.
     * @param {object} [options.data] - (Optional) Data to send in the request body.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the response data.
     * @memberof Ressource
     */
    async request({url, method, params, data}) {
        try {
            const response = await axios({url, method, params, data, headers : { 'Authorization': `Basic ${this.API_KEY}`}});
            return response.data;
        } catch (error) { 
            throw error.response ? error.response.data : error.message;
        }
    }

    /**
     * Retrieve the next page of results.
     * @async
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object|null>} A promise that resolves with the next page of results or null if there are no more pages.
     * @memberof Ressource
     */
    async next() {
        if (this._next === null) {
            return null;
        }

        const data = await this.request({
            url: this._next,
            method: 'GET',
        });

        this._count = data.count;
        this._previous = data.previous;
        this._next = data.next;

        return data;
    }

    /**
     * Retrieve the previous page of results.
     * @async
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object|null>} A promise that resolves with the previous page of results or null if there are no previous pages.
     * @memberof Ressource
     */
    async previous() {
        if (this._previous === null) {
            return null;
        }

        const data = await this.request({
            url: this._previous,
            method: 'GET',
        });

        this._count = data.count;
        this._previous = data.previous;
        this._next = data.next;

        return data;
    }

    /**
     * Create a new resource.
     * @async
     * @param {object} body - The data for creating the resource.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the created resource data.
     * @memberof Ressource
     */
    async create(body) {
        const data = this.request({
            url: this.RESSOURCE_URL,
            data: body,
            method: "POST"
        })
        
        return data;
    }
}

module.exports = Ressource;