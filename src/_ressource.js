/**
 * Represents a base resource manager class responsible for handling common operations.
 */
class Ressource{
    /**
     * Create a new instance of the resource manager.
     * @param {object} options - Options for configuring the resource manager.
     * @param {string} options.API_KEY - The API key used for authorization.
     * @param {string} options.RESSOURCE_URL - The base URL for the resource.
     */
    constructor({API_KEY, RESSOURCE_URL}) {
        if (new.target === Ressource) {
            throw new Error("Cannot instanciate this class !");
        }
        /**
         * The API key used for authorization.
         * @type {string}
         */
        this.API_KEY = API_KEY;

        /**
         * The base URL for the resource.
         * @type {string}
         */
        this.RESSOURCE_URL = RESSOURCE_URL;
    }
}

module.exports = Ressource;