const Ressource = require('./_ressource');


/**
 * Represents an Extension Manager responsible for handling extension-related operations.
 * @extends Ressource
 */
class ExtensionManager extends Ressource {
    /**
     * Create a new ExtensionManager instance with the specified service ID and secret token.
     *
     * @constructor
     * @param {object} params - The parameters for initializing the ExtensionManager.
     * @param {string} params.SERVICE_ID - The service ID associated with the account.
     * @param {string} params.SECRET_TOKEN - The secret token used for authentication.
     * @extends {Ressource}
     * @memberof ExtensionManager
     */
    constructor({SERVICE_ID, SECRET_TOKEN}) {
        super({SERVICE_ID, SECRET_TOKEN});

        /**
         * The resource URL for extensions associated with the service.
         *
         * @type {string}
         * @readonly
         * @memberof ExtensionManager
         */
        this.RESSOURCE_URL = `${this.API_BASE_URL}/extensions`;
    }

    /**
     * List extensions with optional query parameters.
     * @async
     * @param {object} [params] - (Optional) Query parameters for listing extensions.
     * @param {number} [params.limit] - (Optional) The maximum number of extensions to retrieve.
     * @param {number} [params.offset] - (Optional) The offset for paginating through extensions.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of extensions.
     * @memberof ExtensionManager
     */
    async list(params) {
        return super.list(params);
    }

    /**
     * Create a new extension.
     * @async
     * @param {object} body - The extension data to create.
     * @param {string} body.name - The extension name.
     * @param {string} body.category - The extension category.
     * @param {string} body.description - The extension description.
     * @param {string} body.base_api_url - The base URL of the extension API.
     * @param {string} body.auth_type - The authentication type (`none`, `api_key` or `oauth2`).
     * @param {boolean} body.is_paid - Whether the extension is paid.
     * @param {string} [body.documentation_url] - (Optional) The documentation URL.
     * @param {string} [body.website_url] - (Optional) The website URL.
     * @param {object} [body.oauth2_config] - (Optional) The OAuth2 configuration.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the created extension.
     * @memberof ExtensionManager
     */
    async create(body) {
        return super.create(body);
    }

    /**
     * Retrieve a specific extension.
     * @async
     * @param {string} extensionId - The identifier of the extension to retrieve.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the extension details.
     * @memberof ExtensionManager
     */
    async get(extensionId) {
        return super.retrieve(extensionId);
    }

    /**
     * Partially update an existing extension.
     * @async
     * @param {string} extensionId - The identifier of the extension to update.
     * @param {object} body - The extension fields to update.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the updated extension.
     * @memberof ExtensionManager
     */
    async update(extensionId, body) {
        return super.update(extensionId, body);
    }

    /**
     * Publish or unpublish an extension.
     * @async
     * @param {string} extensionId - The identifier of the extension to publish.
     * @param {boolean} [isPublished=true] - Whether the extension should be published.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the publish result.
     * @memberof ExtensionManager
     */
    async publish(extensionId, isPublished = true) {
        return this.request({
            url: `${this.RESSOURCE_URL}/${extensionId}/publish`,
            method: "POST",
            data: { is_published: isPublished },
        });
    }
}

module.exports = ExtensionManager;
