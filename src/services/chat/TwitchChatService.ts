import tmi from 'tmi.js';

import { ChatService } from './ChatService';

export class TwitchChatService implements ChatService {
	public constructor(private readonly tmiClient: tmi.Client) {}

	public async say(message: string): Promise<void> {
		await this.tmiClient.connect();

		const channels = this.tmiClient.getOptions().channels || [];

		for (const channel of channels) {
			await this.tmiClient.say(channel, message);
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
