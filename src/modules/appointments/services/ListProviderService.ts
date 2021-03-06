import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface Request {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const cashKey = `providers-list:${user_id}`;

    let users = await this.cacheProvider.recover<User[]>(cashKey);
    if (!users) {
      users = await this.usersRepository.findAllUsersExecept({
        except_user_id: user_id,
      });
      await this.cacheProvider.save(cashKey, classToClass(users));
    }

    return users;
  }
}
export default ListProviderService;
