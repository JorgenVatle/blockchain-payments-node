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
            onNotification: 'KEEP' | 'DELETE';

            /**
             * Number of confirmations to wait for before sending a notification to your callback URL.
             * (Default: 3)
             */
            confs: number;

            /**
             * Address operation you would like to receive notifications for.
             * (Default: 'ALL')
             */
            op: 'ALL' | 'RECEIVE' | 'SPEND'

        }
    }
}