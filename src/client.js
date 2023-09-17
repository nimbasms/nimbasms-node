const ContactManager = require('./contacts');
const SenderNameManager = require('./sendernames');
const GroupManager = require('./groups');
const AccountManager = require('./accounts');
const MessageManager = require('./messages');

/**
 * Represents a Nimba SMS client for interacting with Nimba SMS API resources.
 */
class NimbaSMSClient {
    /**
     * Create a new instance of the Nimba SMS client.
     * @param {object} options - Options for configuring the Nimba SMS client.
     * @param {string} options.API_KEY - The API key used for authorization.
     * @param {string} options.API_URL - The base URL for the Nimba SMS API.
     */
    constructor({API_KEY, API_URL}) {
        /**
         * Manager for interacting with contacts.
         * @type {ContactManager}
         */
        this.contacts = new ContactManager({API_KEY, RESSOURCE_URL: `${API_URL}/contacts`});
        
        /**
         * Manager for interacting with sender names.
         * @type {SenderNameManager}
         */
        this.sendernames = new SenderNameManager({API_KEY, RESSOURCE_URL: `${API_URL}/sendernames`});
        
        /**
         * Manager for interacting with groups.
         * @type {GroupManager}
         */
        this.groups = new GroupManager({API_KEY, RESSOURCE_URL: `${API_URL}/groups`});
        
        /**
         * Manager for interacting with accounts.
         * @type {AccountManager}
         */
        this.accounts = new AccountManager({API_KEY, RESSOURCE_URL: `${API_URL}/accounts`});
        
        /**
         * Manager for interacting with messages.
         * @type {MessageManager}
         */
        this.messages = new MessageManager({API_KEY, RESSOURCE_URL: `${API_URL}/messages`});
    }
}

module.exports = NimbaSMSClient;