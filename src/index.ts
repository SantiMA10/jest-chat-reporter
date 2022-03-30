import { AggregatedResult, Config, Context, Reporter } from '@jest/reporters';
import tmi from 'tmi.js';

import { TwitchChatService } from './services/chat/TwitchChatService';
import { EnvCIEnvironmentService } from './services/EnvCIEnvironmentService';
import { ReportTestResults } from './useCases/ReportTestResults';

export default class TwitchJestReporter implements Pick<Reporter, 'onRunComplete'> {
	private tmiClient: tmi.Client;

	public constructor(
		private globalConfig: Config.GlobalConfig,
		private reporterConfig: {
			channels: string[];
			username: string;
			password: string;
			messagesOnWatchMode?: boolean;
			onlyCI?: boolean;
		},
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
		await new ReportTestResults(
			new TwitchChatService(this.tmiClient),
			new EnvCIEnvironmentService(),
			{
				messagesOnWatchMode: !!this.reporterConfig.messagesOnWatchMode,
				onlyCI: !!this.reporterConfig.onlyCI,
			},
		).run({
			...results,
			runningOnWatchMode: this.globalConfig.watch || this.globalConfig.watchAll,
		});
	};
}
