import { ChatService } from '../services/chat/ChatService';
import { EnvironmentService } from '../services/EnvironmentService';

export class ReportTestResults {
	public constructor(
		private chatService: ChatService,
		private environmentService: EnvironmentService,
		private config: { messagesOnWatchMode?: boolean; onlyCI?: boolean } = {
			messagesOnWatchMode: false,
			onlyCI: false,
		},
	) {}

	public async run(results: {
		numFailedTests: number;
		numPassedTests: number;
		numTotalTests: number;
		runningOnWatchMode?: boolean;
	}): Promise<void> {
		if (!this.config.messagesOnWatchMode && results.runningOnWatchMode) {
			return;
		}

		const isCi = this.environmentService.isCI();

		if (this.config.onlyCI && !isCi) {
			return;
		}

		const service = this.environmentService.getServiceName();
		const buildUrl = this.environmentService.getBuildUrl();

		if (results.numPassedTests > 0) {
			await this.chatService.say(
				`[${service}] ✅ ${results.numPassedTests}/${results.numTotalTests} tests passed${
					isCi ? `. More info: ${buildUrl}` : ''
				}`,
			);
		}

		if (results.numFailedTests > 0) {
			await this.chatService.say(
				`[${service}] ❌ ${results.numFailedTests}/${results.numTotalTests} tests failed${
					isCi ? `. More info: ${buildUrl}` : ''
				}`,
			);
		}
	}
}
