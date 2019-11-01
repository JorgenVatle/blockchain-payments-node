export declare namespace BlockchainApi {
    namespace GenerateAddress {
        interface Request {

            /**
             * Your HD wallet xPub.
             */
            xpub: string;

            /**
             * Callback URL to receive payment updates on.
             */
            callback: string;

            /**
             * Your Blockchain.info API key.
             */
            key: string;

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
}