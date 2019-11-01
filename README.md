# Blockchain Payments API for Node.js
A simple wrapper over [Blockchain.com](https://www.blockchain.com/)'s 
[Payments API](https://www.blockchain.com/api/api_receive). Create and receive addresses and payment notification 
webhooks.

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
```typescript
Blockchain.createAddress({
    webhookUrl: 'https://example.com/ipn/btc' // URL to receive payment notification requests on.
})
```

### Watch any Bitcoin address for incoming/outgoing payments
```typescript
Blockchain.watchAddress({
    address: '3HoDXkm5iY...',                  // Bitcoin address to watch.
    webhookUrl: 'https://example.com/ipn/btc', // URL to receive payment notification requests on.

    // Optional parameters:
    confirmations: 1,       // Number of confirmations to wait for before hitting the specified webhook URL. (default: 1)
    onNotification: 'KEEP', // (DELETE, KEEP) Whether to keep sending webhooks to the specified URL once requested confirmations has been reached. (Default: 'Keep')
    type: 'ALL'             // (ALL, RECEIVE, SPEND) The type of action to receive notifications for. (default: 'ALL') Useful if you only want to track incoming payments.
})
```

## License
This repository is licensed under the ISC license.

Copyright (c) 2019, Jørgen Vatle.