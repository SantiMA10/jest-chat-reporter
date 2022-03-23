export interface ChatService {
	say(message: string): Promise<void>;
}
