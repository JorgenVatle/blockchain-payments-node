/**
 * Blockchain.info Payments API (V2)
 *
 * @link https://www.blockchain.com/api/api_receive
 */
export default class BlockchainPayments {

    /**
     * Webhook callback secret key. Used to validate incoming webhooks.
     *
     * @note You decide the value of this.
     * @link https://www.blockchain.com/api/api_receive
     */
    private webhookSecret?: string;

    /**
     * Bitcoin BIP 32 wallet xPub
     *
     * @link https://api.blockchain.info/v2/apikey/request/
     * @link https://blog.blockonomics.co/how-to-find-your-xpub-key-with-these-8-popular-bitcoin-wallets-ce8ea665ffdc
     */
    private xpub: string;

    /**
     * Blockchain.info API Key
     *
     * @link https://api.blockchain.info/v2/apikey/request/
     */
    private apiKey: string;

    /**
     * Blockchain Payments constructor
     */
    public constructor({ apiKey, xpub, webhookSecret }: ConstructorOptions) {
        this.apiKey = apiKey;
        this.xpub = xpub;
        this.webhookSecret = webhookSecret;
    }

}

interface ConstructorOptions {
    xpub: string;
    apiKey: string;
    webhookSecret?: string;
}