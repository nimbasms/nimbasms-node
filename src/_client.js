const ContactManager = require('./contacts');
const SenderNameManager = require('./sendernames');
const GroupManager = require('./groups');
const AccountManager = require('./accounts');
const MessageManager = require('./messages');
const VerificationManager = require('./verifications');

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
         * The service ID associated with the Nimba SMS client.
         * @type {string}
         * @private
         */
        this._serviceId = SERVICE_ID;

        /**
         * The secret token associated with the Nimba SMS client.
         * @type {string}
         * @private
         */
        this._secretToken = SECRET_TOKEN;

        /**
         * Manager for interacting with contacts.
         * @type {ContactManager}
         * @memberof NimbaSMSClient
         */
        this._accountManager = null;
        
        /**
         * Manager for interacting with messages.
         * @type {MessageManager}
         * @memberof NimbaSMSClient
         */
        this._messageManager = null;

        /**
         * Manager for interacting with groups.
         * @type {GroupManager}
         * @memberof NimbaSMSClient
         */
        this._groupManager = null;

        /**
         * Manager for interacting with sendernames.
         * @type {SenderManager}
         * @memberof NimbaSMSClient
         */
        this._senderNameManager = null;

        /**
         * Manager for interacting with verifications.
         * @type {VerificationManager}
         * @memberof NimbaSMSClient
         */
        this._verificationManager = null;
    }

    /**
     * Gets the manager for interacting with messages.
     * @returns {MessageManager} The manager for messages.
     */
    get messages() {
        if(!this._messageManager) {
            this._messageManager = new MessageManager({
                SERVICE_ID: this._serviceId,
                SECRET_TOKEN: this._secretToken,
            });
        }
        return this._messageManager;
    }

    /**
     * Gets the manager for interacting with groups.
     * @returns {GroupManager} The manager for groups.
     */
    get groups() {
        if(!this._groupManager) {
            this._groupManager = new GroupManager({
                SERVICE_ID: this._serviceId,
                SECRET_TOKEN: this._secretToken,
            });
        }
        return this._groupManager;
    }

    /**
     * Gets the manager for interacting with sender names.
     * @returns {SenderNameManager} The manager for sender names.
     */
    get sendernames() {
        if(!this._senderNameManager) {
            this._senderNameManager = new SenderNameManager({
                SERVICE_ID: this._serviceId,
                SECRET_TOKEN: this._secretToken,
            });
        }
        return this._senderNameManager;
    }

    /**
     * Gets the manager for interacting with contacts.
     * @returns {ContactManager} The manager for contacts.
     */
    get contacts() {
        if(!this._contactManager) {
            this._contactManager = new ContactManager({
                SERVICE_ID: this._serviceId,
                SECRET_TOKEN: this._secretToken,
            });
        }
        return this._contactManager;
    }

    /**
     * Gets the manager for interacting with accounts.
     * @returns {AccountManager} The manager for accounts.
     */
    get accounts() {
        if(!this._accountManager) {
            this._accountManager = new AccountManager({
                SECRET_TOKEN: this._secretToken,
                SERVICE_ID: this._serviceId,
            });
        }
        return this._accountManager;
    }
    
    /**
     * Gets the manager for interacting with verifications.
     * @returns {VerificationManager} The manager for verifications.
     */
    get verifications() {
        if(!this._verificationManager) {
            this._verificationManager = new VerificationManager({
                SECRET_TOKEN: this._secretToken,
                SERVICE_ID: this._serviceId,
            });
        }
        return this._verificationManager;
    }
}

module.exports = NimbaSMSClient;