import BlockchainPayments from './BlockchainPayments';
import Config from 'config';

describe('BlockchainPayments', () => {
    const Blockchain = new BlockchainPayments(Config.get('blockchain'));
    const webhookUrl = 'https://example.com?invoice_id=058921123';
    const watchers: number[] = [];

    test('Can create payment addresses', async () => {
        const request = await Blockchain.createAddress({ webhookUrl });

        expect(request.address).toBeDefined();
        expect(request.callback).toBeDefined();
        expect(request.index).toBeDefined();
    });

    test('Can watch Bitcoin addresses', async () => {
        const response = await Blockchain.watchAddress({
            address: '17KSXCEXhQjJ1bj4p7CsETZBAbieENcx42',
            onNotification: 'DELETE',
            confirmations: 1,
            webhookUrl,
        });

        expect(response.id).toBeDefined();
        watchers.push(response.id)
    })

    /**
     * Stop all test-created watchers to avoid adding unnecessary event listeners to Blockchain.com
     */
    afterAll(() => {
        return Promise.all(watchers.map(async (id) => {
            await Blockchain.stopWatch(id).catch((error) => {
                console.error(error);
                throw error;
            });
        }))
    })
});