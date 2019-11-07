import BlockchainPayments from './BlockchainPayments';
import Config from 'config';

describe('BlockchainPayments', () => {
    const Blockchain = new BlockchainPayments(Config.get('blockchain'));
    const webhookUrl = 'http://example.com';

    test('Can create payment addresses', async () => {
        const request = await Blockchain.createAddress({ webhookUrl });

        expect(request.address).toBeDefined();
        expect(request.callback).toBeDefined();
        expect(request.index).toBeDefined();
    });
});