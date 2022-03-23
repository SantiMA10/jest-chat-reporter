import { ReportTestResults } from '../../src/useCases/ReportTestResults';
import { ChatServiceMock } from '../mocks/ChatServiceMock';

describe('ReportTestResults', () => {
	describe('#run', () => {
		it('uses the ChatService to send the messages', async () => {
			const chatService = new ChatServiceMock();
			const subject = new ReportTestResults(chatService);

			await subject.run({ numFailedTests: 1, numPassedTests: 1, numTotalTests: 2 });

			expect(chatService.say).toHaveBeenNthCalledWith(1, '✅ 1/2 tests passed');
			expect(chatService.say).toHaveBeenNthCalledWith(2, '❌ 1/2 tests failed');
		});

		it('only sends the failed message if there is any failed test', async () => {
			const chatService = new ChatServiceMock();
			const subject = new ReportTestResults(chatService);

			await subject.run({ numFailedTests: 0, numPassedTests: 1, numTotalTests: 1 });

			expect(chatService.say).toHaveBeenNthCalledWith(1, '✅ 1/1 tests passed');
			expect(chatService.say).not.toHaveBeenNthCalledWith(2, '❌ 0/1 tests failed');
		});

		it('only sends the passed message if there is any passed test', async () => {
			const chatService = new ChatServiceMock();
			const subject = new ReportTestResults(chatService);

			await subject.run({ numFailedTests: 1, numPassedTests: 0, numTotalTests: 1 });

			expect(chatService.say).toHaveBeenNthCalledWith(1, '❌ 1/1 tests failed');
			expect(chatService.say).not.toHaveBeenNthCalledWith(2, '✅ 0/1 tests passed');
		});
	});
});
