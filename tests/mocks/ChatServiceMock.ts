import { ChatService } from '../../src/services/chat/ChatService';

export class ChatServiceMock implements ChatService {
	public say = jest.fn();
}
