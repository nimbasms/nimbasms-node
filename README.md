# nimbasms-node
A NodeJS module for communicating with Nimba SMS API.

# Usage

 - [Installation](#installation)
 - [Check balance](#account)
 - [Groups](#group)
 - [Sendernames](#sendername)
 - [Create Contacts](#contact)
 - [Send Message](#message)


## <a name="installation"></a> Installation
```sh
npm install nimbasms
```

## <a name="account"></a> Check balance
```js
const Client = require('nimbasms/client');

const config = {
    API_KEY = 'XXXX', // Base 64 encoded 
    API_URL = 'https://api.nimbasms.com/v1',
}

const client = new Client(config)

// Get your account balance
client.accounts.get()
    .then(account => {
        console.log(`My Account balance: ${account['balance']}`);
    })
    .catch(error => {
        console.log(error);
    })
```


## <a name="group"></a> Groups

```js
const Client = require('nimbasms/client');

const config = {
    API_KEY = 'XXXX', // Base 64 encoded 
    API_URL = 'https://api.nimbasms.com/v1',
}

const client = new Client(config)

client.groups.list()
    .then(groups => {
      console.log(`There are ${groups.count} groups.`);
      // or
      // console.log(`There are ${groups.results.length} groups.`);
    })
    .catch(error => {
        console.log(error);
    })
```



## <a name="sendername"></a> Sendernames

```js
const Client = require('nimbasms/client');

const config = {
    API_KEY = 'XXXX', // Base 64 encoded 
    API_URL = 'https://api.nimbasms.com/v1',
}

const client = new Client(config)

client.sendernames.list()
  .then(sendernames => {
      console.log(`There are ${sendernames.count} sendernames.`);
      for(let sendername of sendernames.results)  {
          console.log(sendername)
      }
  })
  .catch(error => {
      console.log(error);
  })
```


## <a name="contact"></a> Create Contact

```js
const Client = require('nimbasms/client');

const config = {
    API_KEY = 'XXXX', // Base 64 encoded 
    API_URL = 'https://api.nimbasms.com/v1',
}

const client = new Client(config)

// List of all contacts
client.contacts.list()
  .then(contacts => {
      console.log(`There are ${contacts.results.length} contacts.`);
      for(let contact of contacts.results) {
          console.log(contact);
      }
  })
  .catch(error => {
      console.log(error);
  })


// This contact will be added to the default contact list
const body = {
    numero: '224XXXXXXXXX'
}
client.contacts.create(body)
  .then(contact => {
        console.log(`A contact has been added : `, contact);
    })
    .catch(error => {
        console.log(error);
    });

// Create with groups and name - name and groups are optional.
const body = {
    numero: '224XXXXXXXXX',
    name: 'Foo',
    groups: ['API', 'Facebook Client'],
}

client.contacts.create(body)
    .then(contact => {
        console.log(`A contact has been added :`, contact);
    })
    .catch(error => {
        console.log(error);
    });
```


## <a name="message"></a> Messages

```js
const Client = require('nimbasms/client');

const config = {
    API_KEY = 'XXXX', // Base 64 encoded 
    API_URL = 'https://api.nimbasms.com/v1',
}

const client = new Client(config)


// Get All messages
client.messages.list()
    .then(messages => {
        console.log(`There are ${messages.count} messages in your account.`);
    })
    .catch(error => {
        console.log(error);
    });

// Get only 10 last messages
client.messages.list({limit: 10})
    .then(messages => {
        console.log('Here are the last 10 messages in your account:')
        for( message of messages.results){
            console.log(message)
        }
    })
    .catch(error => {
        console.log(error);
    });

// Send a message
const body = {
  to: ['6XXXXXXXXX'], // The recepients
  message: 'Hello from Nimba SMS !', 
  sender_name: 'YYYYYYYYYY', // Replace with your sender name
}

client.messages.create(body)
  .then(message => {
      console.log(`A new message has been sent : `, message);
  })
  .catch(error => {
      console.log(error);
  });

// Retrieve a message's details
const messageId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
client.messages.get(messageId)
  .then(message => {
    console.log('Got one message : ', message)
  })
  .catch(error => {
    console.log(error);
  });
```

## Credit
Nimba SMS
