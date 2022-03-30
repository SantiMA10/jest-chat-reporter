import { EnvironmentService } from '../../src/services/EnvironmentService';

export class EnvironmentServiceMock implements EnvironmentService {
	public getServiceName = jest.fn(() => 'local');
	public getBuildUrl = jest.fn(() => 'localhost');
	public isCI = jest.fn();
}
