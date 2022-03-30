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

		if (this.config.onlyCI && !this.environmentService.isCI()) {
			return;
		}

		if (results.numPassedTests > 0) {
			await this.chatService.say(
				`✅ ${results.numPassedTests}/${results.numTotalTests} tests passed`,
			);
		}

		if (results.numFailedTests > 0) {
			await this.chatService.say(
				`❌ ${results.numFailedTests}/${results.numTotalTests} tests failed`,
			);
		}
	}
}
