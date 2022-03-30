import envCi from 'env-ci';

import { EnvCIEnvironmentService } from '../../src/services/EnvCIEnvironmentService';

describe('EnvCIEnvironmentService', () => {
	describe('#getBuildUrl', () => {
		it('returns localhost if the environment is not a CI server', async () => {
			const subject = new EnvCIEnvironmentService((() => ({
				isCi: false,
			})) as unknown as typeof envCi);

			expect(subject.getBuildUrl()).toBe('localhost');
		});

		it('returns the buildUrl value if it is available', async () => {
			const subject = new EnvCIEnvironmentService((() => ({
				isCi: true,
				buildUrl: 'ci-example.com',
			})) as unknown as typeof envCi);

			expect(subject.getBuildUrl()).toBe('ci-example.com');
		});

		it('returns the slug value if the buildUrl is not available', async () => {
			const subject = new EnvCIEnvironmentService((() => ({
				isCi: true,
				buildUrl: undefined,
				slug: 'SantiMA10/jest-chat-reporter',
			})) as unknown as typeof envCi);

			expect(subject.getBuildUrl()).toBe('SantiMA10/jest-chat-reporter');
		});
	});
});
