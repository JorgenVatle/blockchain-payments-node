export class BlockchainPaymentsError extends Error {
    constructor(message: string, data?: any) {
        super(message);
        if (data) {
            console.error(data);
        }
    }
}