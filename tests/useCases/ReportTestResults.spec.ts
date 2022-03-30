import { ReportTestResults } from '../../src/useCases/ReportTestResults';
import { ChatServiceMock } from '../mocks/ChatServiceMock';
import { EnvironmentServiceMock } from '../mocks/EnvironmentServiceMock';

describe('ReportTestResults', () => {
	describe('#run', () => {
		it('uses the ChatService to send the messages', async () => {
			const chatService = new ChatServiceMock();
			const environmentService = new EnvironmentServiceMock();
			const subject = new ReportTestResults(chatService, environmentService);

			await subject.run({ numFailedTests: 1, numPassedTests: 1, numTotalTests: 2 });

			expect(chatService.say).toHaveBeenNthCalledWith(1, '✅ 1/2 tests passed');
			expect(chatService.say).toHaveBeenNthCalledWith(2, '❌ 1/2 tests failed');
		});

		it('only sends the failed message if there is any failed test', async () => {
			const chatService = new ChatServiceMock();
			const environmentService = new EnvironmentServiceMock();
			const subject = new ReportTestResults(chatService, environmentService);

			await subject.run({ numFailedTests: 0, numPassedTests: 1, numTotalTests: 1 });

			expect(chatService.say).toHaveBeenNthCalledWith(1, '✅ 1/1 tests passed');
			expect(chatService.say).not.toHaveBeenNthCalledWith(2, '❌ 0/1 tests failed');
		});

		it('only sends the passed message if there is any passed test', async () => {
			const chatService = new ChatServiceMock();
			const environmentService = new EnvironmentServiceMock();
			const subject = new ReportTestResults(chatService, environmentService);

			await subject.run({ numFailedTests: 1, numPassedTests: 0, numTotalTests: 1 });

			expect(chatService.say).toHaveBeenNthCalledWith(1, '❌ 1/1 tests failed');
			expect(chatService.say).not.toHaveBeenNthCalledWith(2, '✅ 0/1 tests passed');
		});

		it('sent messages if the tests are running in watch mode and the watch mode is enabled', async () => {
			const chatService = new ChatServiceMock();
			const environmentService = new EnvironmentServiceMock();
			const subject = new ReportTestResults(chatService, environmentService, {
				messagesOnWatchMode: true,
			});

			await subject.run({
				numFailedTests: 1,
				numPassedTests: 0,
				numTotalTests: 1,
				runningOnWatchMode: true,
			});

			expect(chatService.say).toHaveBeenCalled();
		});

		it('does not sent messages if the tests are running in watch mode and the watch mode is disabled', async () => {
			const chatService = new ChatServiceMock();
			const environmentService = new EnvironmentServiceMock();
			const subject = new ReportTestResults(chatService, environmentService);

			await subject.run({
				numFailedTests: 1,
				numPassedTests: 0,
				numTotalTests: 1,
				runningOnWatchMode: true,
			});

			expect(chatService.say).not.toHaveBeenCalled();
		});

		it('does not sent messages if the mode onlyCI is enabled and we are not in a CI environment', async () => {
			const environmentService = {
				isCI: () => false,
			};
			const chatService = new ChatServiceMock();
			const subject = new ReportTestResults(chatService, environmentService, { onlyCI: true });

			await subject.run({
				numFailedTests: 1,
				numPassedTests: 0,
				numTotalTests: 1,
			});

			expect(chatService.say).not.toHaveBeenCalled();
		});

		it('sent messages if the mode onlyCI is enabled and we are in a CI environment', async () => {
			const environmentService = {
				isCI: () => true,
			};
			const chatService = new ChatServiceMock();
			const subject = new ReportTestResults(chatService, environmentService, { onlyCI: true });

			await subject.run({
				numFailedTests: 1,
				numPassedTests: 0,
				numTotalTests: 1,
			});

			expect(chatService.say).toHaveBeenCalled();
		});
	});
});
