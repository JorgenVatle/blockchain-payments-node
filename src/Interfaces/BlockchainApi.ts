export namespace BlockchainApi {
    namespace GenerateAddress {
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