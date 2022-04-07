import tmi from 'tmi.js';

import { ChatService } from './ChatService';

export class TwitchChatService implements ChatService {
	public constructor(
		private readonly tmiClient: tmi.Client,
		private readonly config: { useAnnounce?: boolean } = {},
	) {}

	public async say(message: string): Promise<void> {
		await this.tmiClient.connect();

		const channels = this.tmiClient.getOptions().channels || [];

		for (const channel of channels) {
			await this.tmiClient.say(channel, `${this.config.useAnnounce ? '/announce ' : ''}${message}`);
		}

		const disconnected = new Promise<void>((resolve) => {
			this.tmiClient.on('disconnected', () => {
				resolve();
			});
		});
		await this.tmiClient.disconnect();

		await disconnected;
	}
}
