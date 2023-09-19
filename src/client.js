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
     * 
     * @constructor
     * @param {object} options - Options for configuring the Nimba SMS client.
     * @param {string} options.SERVICE_ID - Unique identifier for your application.
     * @param {string} options.SECRET_TOKEN - The secret token used to authenticate your application.
     * @memberof NimbaSMSClient
     */
    constructor({SERVICE_ID, SECRET_TOKEN}) {
        /**
         * Manager for interacting with contacts.
         * @type {ContactManager}
         * @memberof NimbaSMSClient
         */
        this.contacts = new ContactManager({SERVICE_ID, SECRET_TOKEN});
        
        /**
         * Manager for interacting with sender names.
         * @type {SenderNameManager}
         * @memberof NimbaSMSClient
         */
        this.sendernames = new SenderNameManager({SERVICE_ID, SECRET_TOKEN});
        
        /**
         * Manager for interacting with groups.
         * @type {GroupManager}
         * @memberof NimbaSMSClient
         */
        this.groups = new GroupManager({SERVICE_ID, SECRET_TOKEN});
        
        /**
         * Manager for interacting with accounts.
         * @type {AccountManager}
         * @memberof NimbaSMSClient
         */
        this.accounts = new AccountManager({SERVICE_ID, SECRET_TOKEN});
        
        /**
         * Manager for interacting with messages.
         * @type {MessageManager}
         * @memberof NimbaSMSClient
         */
        this.messages = new MessageManager({SERVICE_ID, SECRET_TOKEN});
    }
}

module.exports = NimbaSMSClient;