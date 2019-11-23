import QueryString from 'qs';
import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { KeyValue } from './Interfaces/TypeScriptUtility';
import { BlockchainApi } from './Interfaces/BlockchainApi';
import { BlockchainPaymentsError } from './Errors/BlockchainPaymentsError';

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
    private readonly webhookSecret?: string;

    /**
     * Bitcoin BIP 32 wallet xPub
     *
     * @link https://api.blockchain.info/v2/apikey/request/
     * @link https://blog.blockonomics.co/how-to-find-your-xpub-key-with-these-8-popular-bitcoin-wallets-ce8ea665ffdc
     */
    private readonly xpub: string;

    /**
     * Blockchain.info API Key
     *
     * @link https://api.blockchain.info/v2/apikey/request/
     */
    private readonly apiKey: string;

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
            baseURL: 'https://api.blockchain.info/v2/receive',
            paramsSerializer(params: KeyValue<string>) {
                return QueryString.stringify(params);
            }
        });
        this.api.interceptors.response.use(undefined, this.handleException);
    }

    /**
     * Handle an API request error.
     */
    private handleException(error: AxiosError) {
        let data;

        if (error.response && typeof error.response.data === 'object') {
            data = error.response.data;
        }

        throw new BlockchainPaymentsError(error.message, data);
    }

    /**
     * Prepare querystring, including the API key using the given data.
     */
    private buildQuery<T = KeyValue<string>>(data: Omit<T, 'key'>) {
        return {
            key: this.apiKey,
            ...data,
        };
    }

    /**
     * Create a payment address.
     */
    public createAddress(options: Method.Options.createPayment) {
        return this.api.get('', {
            params: this.buildQuery<BlockchainApi.GenerateAddress.Request>({
                xpub: this.xpub,
                callback: options.webhookUrl,
            }),
        }).then(({ data }: AxiosResponse<BlockchainApi.GenerateAddress.Response>) => {
            return data;
        });
    }

    /**
     * Monitor any Bitcoin address for incoming payments.
     */
    public watchAddress(options: Method.Options.monitorAddress) {
        const defaults: Partial<Method.Options.monitorAddress> = {
            onNotification: 'KEEP',
            confirmations: 1,
            type: 'ALL',
        };
        const { address: addr, webhookUrl: callback, type: op, confirmations: confs, onNotification } = {
            ...defaults,
            ...options,
        };

        return this.api.get('/balance_update', {
            params: this.buildQuery<BlockchainApi.BalanceUpdates.Request>({
                addr, callback, op, confs,
                // @ts-ignore
                onNotification,
            }),
        }).then((response: AxiosResponse<BlockchainApi.BalanceUpdates.Response>) => {
            return response.data;
        });
    }

}

/**
 * Options and responses for BlockchainPayments methods.
 */
declare namespace Method {
    namespace Options {

        interface createPayment {
            /**
             * URL to receive notifications whenever you receive a payment to the returned address.
             */
            webhookUrl: string;
        }

        interface monitorAddress {
            /**
             * Bitcoin address to monitor.
             */
            address: BlockchainApi.BalanceUpdates.Request['addr'];

            /**
             * URL to receive notifications on whenever you receive a payment for the submitted address.
             */
            webhookUrl: BlockchainApi.BalanceUpdates.Request['callback'];

            /**
             * Request notification behaviour.
             * Likely whether to keep or end notifying the provided callback URL once the transaction reaches the
             * specified number of confirmations.
             */
            onNotification?: BlockchainApi.BalanceUpdates.Request['onNotification'];

            /**
             * Number of confirmations to wait for before sending a notification to your callback URL.
             * (Default: 3)
             */
            confirmations?: BlockchainApi.BalanceUpdates.Request['confs'];

            /**
             * Address operation (send/receive) you would like to receive notifications for.
             * (Default: 'ALL')
             */
            type?: BlockchainApi.BalanceUpdates.Request['op'];

        }

    }
}

/**
 * BlockchainPayments constructor options.
 */
interface ConstructorOptions {
    xpub: string;
    apiKey: string;
    webhookSecret?: string;
}