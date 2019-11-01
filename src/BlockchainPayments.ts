import QueryString from 'qs';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { KeyValue } from './Interfaces/TypeScriptUtility';
import { BlockchainApi } from './Interfaces/BlockchainApi';

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
     * Blockchain.info Payments API client.
     */
    private api: AxiosInstance;

    /**
     * Blockchain Payments constructor
     */
    public constructor({ apiKey, xpub, webhookSecret }: ConstructorOptions) {
        this.apiKey = apiKey;
        this.xpub = xpub;
        this.webhookSecret = webhookSecret;

        this.api = Axios.create({
            baseURL: 'https://api.blockchain.info/v2/receive/',
        });
    }

    /**
     * Prepare querystring, including the API key using the given data.
     */
    private buildQuery(data: KeyValue<string>) {
        return QueryString.stringify({
            key: this.apiKey,
            ...data,
        });
    }

    /**
     * Create a payment address.
     */
    public createPayment(options: CreatePaymentOptions) {
        return this.api.get('/', {
            data: this.buildQuery({
                xpub: this.xpub,
                callback: options.webhookUrl,
            }),
        }).then(({ data }: AxiosResponse<BlockchainApi.GenerateAddress.Response>) => {
            return data;
        });
    }

}

interface CreatePaymentOptions {
    /**
     * URL to receive notifications whenever you receive a payment to the returned address.
     */
    webhookUrl: string;
}

interface ConstructorOptions {
    xpub: string;
    apiKey: string;
    webhookSecret?: string;
}
