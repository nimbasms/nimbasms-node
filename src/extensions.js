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

    /**
     * List the actions of an extension.
     * @async
     * @param {string} extensionId - The identifier of the parent extension.
     * @param {object} [params] - (Optional) Query parameters for listing actions.
     * @param {number} [params.limit] - (Optional) The maximum number of actions to retrieve.
     * @param {number} [params.offset] - (Optional) The offset for paginating through actions.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of actions.
     * @memberof ExtensionManager
     */
    async listActions(extensionId, params) {
        return this.listUrl(`${this.RESSOURCE_URL}/${extensionId}/actions`, params);
    }

    /**
     * Create a new action for an extension.
     * @async
     * @param {string} extensionId - The identifier of the parent extension.
     * @param {object} body - The action data to create.
     * @param {string} body.name - The name of the action.
     * @param {string} body.method - The HTTP method of the action.
     * @param {string} body.endpoint - The endpoint of the action.
     * @param {string} body.description - The description of the action.
     * @param {object} [body.required_params] - (Optional) The required parameters.
     * @param {object} [body.optional_params] - (Optional) The optional parameters.
     * @param {object} [body.response_format] - (Optional) The response format.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the created action.
     * @memberof ExtensionManager
     */
    async createAction(extensionId, body) {
        return this.request({
            url: `${this.RESSOURCE_URL}/${extensionId}/actions`,
            method: "POST",
            data: body,
        });
    }

    /**
     * Retrieve a specific action of an extension.
     * @async
     * @param {string} extensionId - The identifier of the parent extension.
     * @param {string} actionId - The identifier of the action to retrieve.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the action details.
     * @memberof ExtensionManager
     */
    async getAction(extensionId, actionId) {
        return this.request({
            url: `${this.RESSOURCE_URL}/${extensionId}/actions/${actionId}`,
        });
    }

    /**
     * Partially update an existing action of an extension.
     * @async
     * @param {string} extensionId - The identifier of the parent extension.
     * @param {string} actionId - The identifier of the action to update.
     * @param {object} body - The action fields to update.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the updated action.
     * @memberof ExtensionManager
     */
    async updateAction(extensionId, actionId, body) {
        return this.request({
            url: `${this.RESSOURCE_URL}/${extensionId}/actions/${actionId}`,
            method: "PATCH",
            data: body,
        });
    }

    /**
     * Delete an existing action of an extension.
     * @async
     * @param {string} extensionId - The identifier of the parent extension.
     * @param {string} actionId - The identifier of the action to delete.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the server response.
     * @memberof ExtensionManager
     */
    async deleteAction(extensionId, actionId) {
        return this.request({
            url: `${this.RESSOURCE_URL}/${extensionId}/actions/${actionId}`,
            method: "DELETE",
        });
    }

    /**
     * Publish or unpublish an action of an extension.
     * @async
     * @param {string} extensionId - The identifier of the parent extension.
     * @param {string} actionId - The identifier of the action to publish.
     * @param {boolean} [isPublished=true] - Whether the action should be published.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the publish result.
     * @memberof ExtensionManager
     */
    async publishAction(extensionId, actionId, isPublished = true) {
        return this.request({
            url: `${this.RESSOURCE_URL}/${extensionId}/actions/${actionId}/publish`,
            method: "POST",
            data: { is_published: isPublished },
        });
    }

    /**
     * Create a new pricing plan for an extension.
     * @async
     * @param {string} extensionId - The identifier of the parent extension.
     * @param {object} body - The pricing plan data to create.
     * @param {string} body.name - The name of the pricing plan.
     * @param {string} body.price - The price of the pricing plan, in GNF without the currency.
     * @param {string} body.billing_period - The billing period (`monthly` or `yearly`).
     * @param {object} body.features - The features associated with the pricing plan.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the created pricing plan.
     * @memberof ExtensionManager
     */
    async createPricingPlan(extensionId, body) {
        return this.request({
            url: `${this.RESSOURCE_URL}/${extensionId}/pricing-plans`,
            method: "POST",
            data: body,
        });
    }

    /**
     * Partially update an existing pricing plan of an extension.
     * @async
     * @param {string} extensionId - The identifier of the parent extension.
     * @param {string} pricingPlanId - The identifier of the pricing plan to update.
     * @param {object} body - The pricing plan fields to update.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the updated pricing plan.
     * @memberof ExtensionManager
     */
    async updatePricingPlan(extensionId, pricingPlanId, body) {
        return this.request({
            url: `${this.RESSOURCE_URL}/${extensionId}/pricing-plans/${pricingPlanId}`,
            method: "PATCH",
            data: body,
        });
    }

    /**
     * Delete an existing pricing plan of an extension.
     * @async
     * @param {string} extensionId - The identifier of the parent extension.
     * @param {string} pricingPlanId - The identifier of the pricing plan to delete.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the server response.
     * @memberof ExtensionManager
     */
    async deletePricingPlan(extensionId, pricingPlanId) {
        return this.request({
            url: `${this.RESSOURCE_URL}/${extensionId}/pricing-plans/${pricingPlanId}`,
            method: "DELETE",
        });
    }
}

module.exports = ExtensionManager;
