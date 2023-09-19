const NimbaSMSClient = require('../src/client');
require("dotenv").config();


/**
 * A sample script to demonstrate how to use the NimbaSMSClient.
 */

/**
 * Replace with your actual SERVICE_ID.
 * @type {string}
 */
const SERVICE_ID = process.env.SERVICE_ID;


/**
 * Replace with your actual API SECRET TOKEN.
 * @type {string}
*/
const SECRET_TOKEN = process.env.SECRET_TOKEN;

/**
 * Create an instance of NimbaSMSClient.
 * @type {NimbaSMSClient}
 */
const nimbaClient = new NimbaSMSClient({ SERVICE_ID, SECRET_TOKEN });

/**
 * Sample usage of the ContactManager to list contacts.
 */
async function listContacts() {
  try {
    const contacts = await nimbaClient.contacts.list({ limit: 10 });
    console.log('List of Contacts:', contacts);
  } catch (error) {
    console.error('Error listing contacts:', error);
  }
}

/**
 * Sample usage of the SenderNameManager to list sender names.
 */
async function listSenderNames() {
  try {
    const senderNames = await nimbaClient.sendernames.list({ limit: 5 });
    console.log('List of Sender Names:', senderNames);
  } catch (error) {
    console.error('Error listing sender names:', error);
  }
}

/**
 * Sample usage of the GroupManager to list groups.
 */
async function listGroups() {
  try {
    const groups = await nimbaClient.groups.list({ limit: 3 });
    console.log('List of Groups:', groups);
  } catch (error) {
    console.error('Error listing groups:', error);
  }
}

/**
 * Sample usage of the AccountManager to get account information.
 */
async function getAccountInfo() {
  try {
    const accountInfo = await nimbaClient.accounts.get();
    console.log('Account Information:', accountInfo);
  } catch (error) {
    console.error('Error getting account information:', error);
  }
}

/**
 * Sample usage of the MessageManager to list messages.
 */
async function listMessages() {
  try {
    const messages = await nimbaClient.messages.list({ limit: 5 });
    console.log('List of Messages:', messages);
  } catch (error) {
    console.error('Error listing messages:', error);
  }
}

// Uncomment and call the functions you want to test.
// listContacts();
// listSenderNames();
// listGroups();
// getAccountInfo();
// listMessages();
