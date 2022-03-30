import { EnvironmentService } from '../../src/services/EnvironmentService';

export class EnvironmentServiceMock implements EnvironmentService {
	public isCI = jest.fn();
}
