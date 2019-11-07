import BlockchainPayments from './BlockchainPayments';
import Config from 'config';

describe('BlockchainPayments', () => {
    const Blockchain = new BlockchainPayments(Config.get('blockchain'));
    const webhookUrl = 'https://example.com?invoice_id=058921123';

    test('Can create payment addresses', async () => {
        const request = await Blockchain.createAddress({ webhookUrl });

        expect(request.address).toBeDefined();
        expect(request.callback).toBeDefined();
        expect(request.index).toBeDefined();
    });
});