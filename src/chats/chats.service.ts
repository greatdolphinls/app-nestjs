import { Injectable } from '@nestjs/common';
import { ChatUserCreateDto } from './dto';
// tslint:disable-next-line
const CHATKIT = require('@pusher/chatkit-server');

// TODO: move the following values to env
const chatkit = new CHATKIT.default({
  instanceLocator: 'v1:us1:f31b48b8-88e5-4817-9129-1bbfbeafbfaa',
  key: '75424be9-8e8c-42d8-9c36-1301559ddb4f:IkNBbn0AeOn2QQEeL1QbMFj59hSghxYLagqbF0VEx5M=',
});

@Injectable()
export class ChatsService {
  public test(): any {
    return { test: 'test' };
  }

  public async createChatUser({username, id, avatar_url}: ChatUserCreateDto): Promise<any> {
    let result = null;
    try {
      result = await chatkit
      .createUser({
        id,
        name: username,
        avatar_url,
      });
    } catch (error) {
      if (error.error === 'services/chatkit/user_already_exists') {
        return {username, id, avatar_url};
      }
    }

    return result;
  }

  public async updateChatUser({username, id, avatar_url}: ChatUserCreateDto): Promise<any> {
    let result = null;
    try {
      result = await chatkit
      .updateUser({
        id,
        name: username,
        avatar_url,
      });
    } catch (error) {
      return null;
    }

    return result;
  }
}
