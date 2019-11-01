export declare namespace BlockchainApi {
    interface ApiRequest {
        /**
         * Your Blockchain.info API key.
         */
        key: string;
    }

    namespace GenerateAddress {
        interface Request extends ApiRequest {

            /**
             * Your HD wallet xPub.
             */
            xpub: string;

            /**
             * Callback URL to receive payment updates on.
             */
            callback: string;

        }

        interface Response {

            /**
             * Bitcoin receiving address.
             */
            address: string;

            /**
             * Wallet address index.
             */
            index: string;

            /**
             * The payments callback URL you submitted with your address generation request.
             */
            callback: string;

        }
    }

    namespace BalanceUpdates {
        type Operation = 'RECEIVE' | 'SPEND';
        type NotificationAction = 'KEEP' | 'DELETE';

        interface Request extends ApiRequest {

            /**
             * Bitcoin address you would like to monitor.
             */
            addr: string;

            /**
             * URL to receive payment notifications on.
             */
            callback: string;

            /**
             * Request notification behaviour.
             * Likely whether to keep or end notifying the provided callback URL once the transaction reaches the
             * specified number of confirmations.
             */
            onNotification: NotificationAction;

            /**
             * Number of confirmations to wait for before sending a notification to your callback URL.
             * (Default: 3)
             */
            confs: number;

            /**
             * Address operation (send/receive) you would like to receive notifications for.
             * (Default: 'ALL')
             */
            op: Operation | 'ALL';

        }

        interface Response {

            /**
             * Notification ID
             */
            id: number;

            /**
             * The Bitcoin address you're watching.
             */
            addr: string;

            /**
             * Address operation. (send/receive)
             */
            op: Operation;

            /**
             * Number of confirmations a transaction needs before a notification is sent to your callback URL.
             */
            confs: number;

            /**
             * The URL you are receiving notifications on.
             */
            callback: string;

            /**
             * Request notification behaviour.
             * Likely whether to keep or end notifying the provided callback URL once the transaction reaches the
             * specified number of confirmations.
             */
            onNotification: NotificationAction;

        }
    }
}