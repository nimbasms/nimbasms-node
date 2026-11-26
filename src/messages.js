const Ressource = require("./_ressource");

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
  constructor({ SERVICE_ID, SECRET_TOKEN }) {
    super({ SERVICE_ID, SECRET_TOKEN });

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
  async list(params) {
    // Validate the dates

    return super.list(params);
  }

  /**
   * Create a new message with the specified sender name, recipients, and content.
   *
   * Supports the `sms`, `whatsapp` and `email` channels.
   *
   * @async
   * @param {object} body - The message data to create.
   * @param {string} body.sender_name - The sender's name for the message.
   * @param {string[]} body.to - An array of recipient phone numbers, or email addresses when `channel` is `email`. Up to 30 recipients.
   * @param {string} [body.message] - The content of the message. For email, the plain-text version.
   * @param {string} [body.channel="sms"] - (Optional) The delivery channel. Accepted values: `"sms"`, `"whatsapp"`, `"email"`.
   * @param {string} [body.subject] - (Optional) The email subject. Required for email unless `template_name` is provided.
   * @param {string} [body.html] - (Optional) The HTML content of the email.
   * @param {string[]} [body.reply_to] - (Optional) Email reply-to addresses. Up to 5 addresses.
   * @param {object[]} [body.attachments] - (Optional) Email attachments. Up to 10 files and 18 MB in total.
   * @param {string} body.attachments[].filename - The attachment filename.
   * @param {string} body.attachments[].content - The attachment content, Base64 encoded.
   * @param {string} [body.attachments[].content_type] - (Optional) The attachment content type. Inferred from the filename when omitted.
   * @param {string} [body.template_name] - (Optional) The validated template name. Required when `channel` is `whatsapp`.
   * @param {object} [body.template_variables] - (Optional) The template variables, for example `{ body: { "1": "value 1" } }`.
   * @throws {Error} If the request fails or the server returns an error.
   * @returns {Promise<object>} A promise that resolves with the created message data.
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
    });

    return data;
  }
}

module.exports = MessageManager;
