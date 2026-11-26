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
        return this.listUrl(this.RESSOURCE_URL, params);
    }

    /**
     * List a resource from a custom URL with optional query parameters.
     * @async
     * @param {string} url - The URL to list the resource from.
     * @param {object} [params] - (Optional) Query parameters for listing the resource.
     * @param {number} [params.limit] - (Optional) The maximum number of resources to retrieve.
     * @param {number} [params.offset] - (Optional) The offset for paginating through resources.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of resources.
     * @memberof Ressource
     */
    async listUrl(url, params){
        // Validate the query parameters
        if(params !== undefined) {
            if(!(params instanceof Object)) {
                throw new Error("Query parameters must be an object")
            }

            const { limit, offset } = params;

            if(limit !== undefined && (typeof limit !== 'number' || limit <= 0)) {
                throw new Error("limit query parameter must be a positive number.");
            }
    
            if(offset !== undefined && (typeof offset !== 'number' || offset < 0)) {
                throw new Error("offset query parameter must be a non-negative number.");
            }
        }

        const response = await this.request({
            url: url,
            params: params,
        });

        this._next = response?.next ?? null;
        this._count = response?.count ?? 0;
        this._previous = response?.previous ?? null;

        return response;
    }

    /**
     * Send a custom HTTP request.
     * @async
     * @param {object} options - Configuration options for the HTTP request.
     * @param {string} options.url - The URL for the request.
     * @param {string} options.method - The HTTP method for the request (e.g., 'GET', 'POST').
     * @param {object} [options.params] - (Optional) Query parameters for the request.
     * @param {object|Buffer} [options.data] - (Optional) Data to send in the request body.
     * @param {object} [options.headers] - (Optional) Additional HTTP headers.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the response data.
     * @memberof Ressource
     */
     async request({url, method, params, data, headers}) {
         try {
             let requestUrl = url;

             if (params !== undefined) {
                 const query = new URLSearchParams();
                 for (const [key, value] of Object.entries(params)) {
                     if (value !== undefined) {
                         query.append(key, value);
                     }
                 }
                 const queryString = query.toString();
                 if (queryString) {
                     requestUrl += `${requestUrl.includes('?') ? '&' : '?'}${queryString}`;
                 }
             }

             const response = await fetch(requestUrl, {
                 method,
                 headers: {
                     'Authorization': `Basic ${this.API_KEY}`,
                     ...(data !== undefined ? { 'Content-Type': 'application/json' } : {}),
                     ...headers,
                 },
                 ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
             });

             const text = await response.text();
             let responseData = null;
             if (text) {
                 try {
                     responseData = JSON.parse(text);
                } catch {
                    responseData = text;
                }
             }

             if (!response.ok) {
                 throw responseData ?? `HTTP ${response.status} ${response.statusText}`;
             }

             return responseData;
         } catch (error) {
             if (error instanceof TypeError) {
                 throw error.message;
             }
             throw error;
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

        const response = await this.request({
            url: this._next,
        });

        this._next = response?.next ?? null;
        this._count = response?.count ?? 0;
        this._previous = response?.previous ?? null;

        return response;
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

        const response = await this.request({
            url: this._previous,
        });

        this._next = response?.next ?? null;
        this._count = response?.count ?? 0;
        this._previous = response?.previous ?? null;

        return response;
    }

    /**
     * Retrieve a single resource by its identifier.
     * @async
     * @param {string} id - The identifier of the resource to retrieve.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the resource data.
     * @memberof Ressource
     */
    async retrieve(id) {
        return this.request({
            url: `${this.RESSOURCE_URL}/${id}`,
        });
    }

    /**
     * Partially update a resource by its identifier.
     * @async
     * @param {string} id - The identifier of the resource to update.
     * @param {object} body - The data to update on the resource.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the updated resource data.
     * @memberof Ressource
     */
    async update(id, body) {
        return this.request({
            url: `${this.RESSOURCE_URL}/${id}`,
            method: "PATCH",
            data: body,
        });
    }

    /**
     * Delete a resource by its identifier.
     * @async
     * @param {string} id - The identifier of the resource to delete.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the server response.
     * @memberof Ressource
     */
    async delete(id) {
        return this.request({
            url: `${this.RESSOURCE_URL}/${id}`,
            method: "DELETE",
        });
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
        return this.request({
            url: this.RESSOURCE_URL,
            data: body,
            method: "POST"
        });
    }
}

module.exports = Ressource;