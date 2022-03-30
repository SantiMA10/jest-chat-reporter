export interface EnvironmentService {
	isCI: () => boolean;
	getServiceName: () => string;
	getBuildUrl: () => string;
}
