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
    }
}

module.exports = Ressource;