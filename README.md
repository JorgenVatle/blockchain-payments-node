# Blockchain Payments API for Node.js
A simple wrapper over [Blockchain.com](https://www.blockchain.com/)'s 
[Payments API](https://www.blockchain.com/api/api_receive).
Create and receive Bitcoin addresses and payment notification webhooks in seconds!

[![Downloads](https://img.shields.io/npm/dt/blockchain-payments-node.svg)](https://www.npmjs.com/package/blockchain-payments-node)
[![Version](https://img.shields.io/npm/v/blockchain-payments-node.svg)](https://www.npmjs.com/package/blockchain-payments-node)
[![Node Version](https://img.shields.io/node/v/blockchain-payments-node.svg)](https://www.npmjs.com/package/blockchain-payments-node)

## Installation
```bash
npm install blockchain-payments-node
```

## Prerequisites
- A Blockchain.com API Key ([request one here](https://api.blockchain.info/v2/apikey/request/)).
- A Bitcoin wallet where you have access to its xPub key.
    - You can grab one from your existing wallet if it has support for it. 
    See [this article](https://blog.blockonomics.co/how-to-find-your-xpub-key-with-these-8-popular-bitcoin-wallets-ce8ea665ffdc)
    for instructions for the more popular wallets out there.
    - You can also obtain it directly from [Blockchain.com](https://blockchain.com) by visiting your wallet settings. 
    (**Settings -> Addresses -> Manage -> More Options -> Show xPub**)

## Usage

### Setup
New up an instance of the Blockchain API wrapper.
```typescript
import BlockchainPayments from 'blockchain-payments-node';

const Blockchain = new BlockchainPayments({
    xpub: 'xpub6DQC9f...',        // See above for instructions on creating one
    apiKey: '5b1ae17...',         // Your blockchain.com API key
    webhookSecret: 'supersecret', // A secret code of your choice to validate incoming webhooks
})
```

### Create payment address
Simply supply a webhook URI to be notified on. Once a payment is received for the returned address, you'll promptly
receive an HTTP request on the specified URL.
```typescript
Blockchain.createAddress({
    webhookUrl: 'https://example.com/ipn/btc' // URL to receive payment notification requests on.
})
```

### Watch any Bitcoin address for payments
Blockchain's API isn't limited to just watching addresses _you've_ created. You can watch any Bitcoin address for
incoming and/or outgoing payments.
```typescript
Blockchain.watchAddress({
    address: '3HoDXkm5iY...',                  // Bitcoin address to watch.
    webhookUrl: 'https://example.com/ipn/btc', // URL to receive payment notification requests on.

    // Optional parameters:
    confirmations: 1,       // Number of confirmations to wait for before a notification is sent to your webhook URL. (default: 1)
    onNotification: 'KEEP', // (DELETE, KEEP) Whether to keep sending webhooks to the specified URL once requested confirmations has been reached. (Default: 'Keep')
    type: 'ALL'             // (ALL, RECEIVE, SPEND) The type of action to receive notifications for. (default: 'ALL') Useful if you only want to track incoming payments.
})
```

## Notes
While this wrapper takes care of most for you, it is still encouraged that you go over the API docs as there are some
caveats with address generation. Particularly in instances where one creates more than 20 unused addresses - this will
result in an error until one of the 20 addresses receive at least one transaction.
- [Payments API Documentation](https://www.blockchain.com/api/api_receive)

## License
This repository is licensed under the ISC license.

Copyright (c) 2019, Jørgen Vatle.