import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUseAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateUseAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    user.password = '';

    return response.json(user);
  }
}
