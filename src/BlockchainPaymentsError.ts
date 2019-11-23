export class BlockchainPaymentsError extends Error {

    /**
     * Blockchain Payments error data.
     */
    public readonly data: any;

    /**
     * Blockchain Payments Error constructor.
     */
    constructor(message: string, data?: any) {
        super(message);
        if (data) {
            this.data = data;
        }
    }
}