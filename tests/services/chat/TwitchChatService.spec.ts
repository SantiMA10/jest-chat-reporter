import tmi from 'tmi.js';

import { TwitchChatService } from '../../../src/services/chat/TwitchChatService';

describe('TwitchChatService', () => {
	describe('#say', () => {
		it('uses the tmi client to send the message to all channels', async () => {
			const tmiClient = {
				connect: jest.fn(),
				say: jest.fn(),
				getOptions: () => ({ channels: ['#channel', '#channel2'] }),
				disconnect: jest.fn(),
				on: (_: string, callback: () => void) => {
					callback();
				},
			};

			const twitchChatService = new TwitchChatService(tmiClient as unknown as tmi.Client);

			await twitchChatService.say('Hello, world!');

			expect(tmiClient.connect).toHaveBeenCalled();
			expect(tmiClient.say).toHaveBeenCalledWith('#channel', 'Hello, world!');
			expect(tmiClient.say).toHaveBeenCalledWith('#channel2', 'Hello, world!');
			expect(tmiClient.disconnect).toHaveBeenCalled();
		});

		it('announces the message if the option is enabled', async () => {
			const tmiClient = {
				connect: jest.fn(),
				say: jest.fn(),
				getOptions: () => ({ channels: ['#channel'] }),
				disconnect: jest.fn(),
				on: (_: string, callback: () => void) => {
					callback();
				},
			};

			const twitchChatService = new TwitchChatService(tmiClient as unknown as tmi.Client, {
				useAnnounce: true,
			});

			await twitchChatService.say('Hello, world!');

			expect(tmiClient.connect).toHaveBeenCalled();
			expect(tmiClient.say).toHaveBeenCalledWith('#channel', '/announce Hello, world!');
			expect(tmiClient.disconnect).toHaveBeenCalled();
		});
	});
});
