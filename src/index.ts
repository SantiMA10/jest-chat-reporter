import { AggregatedResult, Context, Reporter } from '@jest/reporters';
import tmi from 'tmi.js';

import { TwitchChatService } from './services/chat/TwitchChatService';
import { ReportTestResults } from './useCases/ReportTestResults';

export default class TwitchJestReporter implements Pick<Reporter, 'onRunComplete'> {
	private tmiClient: tmi.Client;

	public constructor(
		_: Record<string, unknown>,
		reporterConfig: { channels: string[]; username: string; password: string },
	) {
		this.tmiClient = new tmi.Client({
			identity: {
				username: reporterConfig.username,
				password: reporterConfig.password,
			},
			channels: reporterConfig.channels,
		});
	}

	public onRunComplete = async (_: Set<Context>, results: AggregatedResult): Promise<void> => {
		await new ReportTestResults(new TwitchChatService(this.tmiClient)).run(results);
	};
}
