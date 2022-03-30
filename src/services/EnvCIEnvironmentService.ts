import envCi from 'env-ci';

import { EnvironmentService } from './EnvironmentService';

export class EnvCIEnvironmentService implements EnvironmentService {
	public constructor(private readonly env: typeof envCi = envCi) {}

	public isCI: EnvironmentService['isCI'] = () => this.env().isCi;

	public getServiceName: EnvironmentService['getServiceName'] = () => {
		const ci = this.env();
		return ci.isCi ? ci.service : 'local';
	};

	public getBuildUrl: EnvironmentService['getBuildUrl'] = () => {
		const ci = this.env();

		if (!ci.isCi) {
			return 'localhost';
		}

		if ('buildUrl' in ci && !!ci.buildUrl) {
			return ci.buildUrl;
		}

		if ('slug' in ci) {
			return ci.slug;
		}

		return 'localhost';
	};
}
