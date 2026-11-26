# nimbasms-node
A NodeJS module for communicating with Nimba SMS API.

# Usage

 - [Installation](#installation)
 - [Check balance](#account)
 - [Purchases](#purchases)
 - [Groups](#group)
 - [Sendernames](#sendername)
 - [Create Contacts](#contact)
 - [Send Message](#message)
 - [Verifications](#verifications)


## <a name="installation"></a> Installation
```sh
npm install nimbasms
```

## <a name="account"></a> Check balance
```js
const { Client } = require('nimbasms');

const config = {
    SERVICE_ID : 'XXXXXXXXXXX', 
    SECRET_TOKEN : 'YYYYYYYYYYYYYYYYYYY',
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


## <a name="purchases"></a> Purchases

```js
const { Client } = require('nimbasms');

const config = {
    SERVICE_ID : 'XXXXXXXXXXX', 
    SECRET_TOKEN : 'YYYYYYYYYYYYYYYYYYY',
}

const client = new Client(config)

// List your purchases
client.purchases.list({ limit: 10 })
    .then(purchases => {
        console.log(`There are ${purchases.count} purchases.`);
        for(let purchase of purchases.results) {
            console.log(purchase);
        }
    })
    .catch(error => {
        console.log(error);
    });

// Pagination
client.purchases.next()
    .then(nextPage => console.log(nextPage))
    .catch(error => console.log(error));

client.purchases.previous()
    .then(previousPage => console.log(previousPage))
    .catch(error => console.log(error));
```


## <a name="group"></a> Groups

```js
const { Client } = require('nimbasms');

const config = {
    SERVICE_ID : 'XXXXXXXXXXX', 
    SECRET_TOKEN : 'YYYYYYYYYYYYYYYYYYY',
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
const { Client } = require('nimbasms');

const config = {
    SERVICE_ID : 'XXXXXXXXXXX', 
    SECRET_TOKEN : 'YYYYYYYYYYYYYYYYYYY',
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
const { Client } = require('nimbasms');

const config = {
    SERVICE_ID : 'XXXXXXXXXXX', 
    SECRET_TOKEN : 'YYYYYYYYYYYYYYYYYYY',
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
const bodyWithGroups = {
    numero: '224XXXXXXXXX',
    name: 'Foo',
    groups: ['API', 'Facebook Client'],
}

client.contacts.create(bodyWithGroups)
    .then(contact => {
        console.log(`A contact has been added :`, contact);
    })
    .catch(error => {
        console.log(error);
    });

// Create a contact with an email address
const emailContact = {
    numero: '224XXXXXXXXX',
    name: 'Foo',
    email: 'foo@example.com',
    groups: ['API'],
}

client.contacts.create(emailContact)
    .then(contact => {
        console.log(`A contact has been added :`, contact);
    })
    .catch(error => {
        console.log(error);
    });
```


## <a name="message"></a> Messages

```js
const { Client } = require('nimbasms');

const config = {
    SERVICE_ID : 'XXXXXXXXXXX', 
    SECRET_TOKEN : 'YYYYYYYYYYYYYYYYYYY',
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

// Send a WhatsApp message using a validated template
const whatsappBody = {
  sender_name: 'YYYYYYYYYY',
  to: ['224XXXXXXXXX'],
  channel: 'whatsapp',
  template_name: 'my_template',
  template_variables: {
    body: { '1': 'value 1', '2': 'value 2' },
  },
}

client.messages.create(whatsappBody)
  .then(message => {
    console.log(`A WhatsApp message has been sent : `, message);
  })
  .catch(error => {
    console.log(error);
  });

// Send an email with HTML content, a reply-to address and attachments
const emailBody = {
  sender_name: 'YYYYYYYYYY',
  to: ['client@example.com'],
  channel: 'email',
  subject: 'Your invoice',
  message: 'Plain text version of the email',
  html: '<p>HTML version of the email</p>',
  reply_to: ['support@example.com'],
  attachments: [
    { filename: 'invoice.pdf', content: '<base64>' },
  ],
}

client.messages.create(emailBody)
  .then(message => {
    console.log(`An email has been sent : `, message);
  })
  .catch(error => {
    console.log(error);
  });
```

## <a name="verifications"></a> Verifications
```js
const { Client } = require('nimbasms');

const config = {
    SERVICE_ID : 'XXXXXXXXXXX', 
    SECRET_TOKEN : 'YYYYYYYYYYYYYYYYYYY',
}

const client = new Client(config)


// Send a verification request
const verification = {
    to: "+123456789",
    message: "Your verification code is: <1234>",
    expiry_time: 5,
};

client.verifications.create(verification)
    .then(response => {
        console.log("A verification request is issued: ", response);
    })
    .catch(error => {
        console.log(error);
    });


// Verify a verification request
const verificationParams = {
    verificationId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    code: "YYYY",
};

client.verifications.verify(verificationParams)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })

// Request a verification code by WhatsApp
const whatsappVerification = {
    to: "+123456789",
    channels: ["whatsapp"],
    sender_name: "YYYYYYYYYY",
};

client.verifications.create(whatsappVerification)
    .then(response => {
        console.log("A WhatsApp verification request is issued: ", response);
    })
    .catch(error => {
        console.log(error);
    });

// Request a verification code by email
const emailVerification = {
    channels: ["email"],
    email: "client@example.com",
    email_sender_name: "no-reply@example.com",
    email_subject: "Your verification code",
};

client.verifications.create(emailVerification)
    .then(response => {
        console.log("An email verification request is issued: ", response);
    })
    .catch(error => {
        console.log(error);
    });
```

## Credit
Nimba SMS
