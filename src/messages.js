const Ressource = require('./_ressource');
const axios = require('axios');

/**
 * Represents a Message Manager responsible for handling message-related operations.
 * @extends Ressource
 */
class MessageManager extends Ressource {
    /**
     * Create a new MessageManager instance with the specified service ID and secret token.
     *
     * @constructor
     * @param {object} params - The parameters for initializing the MessageManager.
     * @param {string} params.SERVICE_ID - The service ID associated with the account.
     * @param {string} params.SECRET_TOKEN - The secret token used for authentication.
     * @extends {Ressource} - Inherits from the Ressource class.
     * @memberof MessageManager
     */
    constructor({SERVICE_ID, SECRET_TOKEN}) {
        super({SERVICE_ID, SECRET_TOKEN});

        /**
         * The resource URL for messages associated with the service.
         *
         * @type {string}
         * @readonly
         * @memberof MessageManager
         */
        this.RESSOURCE_URL = `${this.API_BASE_URL}/messages`;
    }

    /**
     * List messages with optional query parameters.
     * @async
     * @param {object} params - (Optional) Query parameters for listing messages.
     * @param {number} [params.limit] - (Optional) The maximum number of messages to retrieve.
     * @param {number} [params.offset] - (Optional) The offset for paginating through messages.
     * @param {string} [params.sent_at] - (Optional) Filter messages sent at a specific date and time.
     * @param {string} [params.sent_at__lte] - (Optional) Filter messages sent before or at a specific date and time.
     * @param {string} [params.sent_at__gte] - (Optional) Filter messages sent after or at a specific date and time.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with a list of messages.
     * @memberof MessageManager
     */
    async list (params) {
        // Validate the dates

        
        return super.list(params);
    }

    /**
     * Create a new message with the specified sender name, recipient, and message content.
     *
     * @async
     * @param {object} body - The message data to create.
     * @param {string} body.sender_name - The sender's name for the message.
     * @param {string[]} body.to - An array of recipient phone numbers.
     * @param {string} body.message - The content of the message.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the created message data.
     * @throws {Error} If the request fails or the server returns an error.
     * @memberof MessageManager
     */
    async create(body) {
        return super.create(body);
    }

    /**
     * Get details of a specific message.
     *
     * @async
     * @param {string} messageId - The ID of the message to retrieve.
     * @throws {Error} If the request fails or the server returns an error.
     * @returns {Promise<object>} A promise that resolves with the message details.
     * @memberof MessageManager
     */
    async get(messageId) {
        const data = this.request({
            url: `${this.RESSOURCE_URL}/${messageId}`,
        })
        
        return data;
    }
}

module.exports = MessageManager;