import CI from 'is-ci';

import { EnvironmentService } from './EnvironmentService';

export class IsCIEnvironmentService implements EnvironmentService {
	public isCI: EnvironmentService['isCI'] = () => CI;
}
