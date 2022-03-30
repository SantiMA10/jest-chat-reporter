import envCi from 'env-ci';

import { EnvironmentService } from './EnvironmentService';

export class EnvCIEnvironmentService implements EnvironmentService {
	public isCI: EnvironmentService['isCI'] = () => envCi().isCi;

	public getServiceName: EnvironmentService['getServiceName'] = () => {
		const ci = envCi();
		return ci.isCi ? ci.service : 'local';
	};

	public getBuildUrl: EnvironmentService['getBuildUrl'] = () => {
		const ci = envCi();

		if ('buildUrl' in ci) {
			return ci.buildUrl;
		}

		return 'localhost';
	};
}
