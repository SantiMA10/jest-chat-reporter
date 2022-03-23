import { ChatService } from '../services/chat/ChatService';

export class ReportTestResults {
	public constructor(private chatService: ChatService) {}

	public async run(results: {
		numFailedTests: number;
		numPassedTests: number;
		numTotalTests: number;
	}): Promise<void> {
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
