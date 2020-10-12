import { getRepository, Not, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllUsersExeceptDTO from '@modules/users/dtos/IFindAllUsersExeceptDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private orgmRepository: Repository<User>;

  constructor() {
    this.orgmRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.orgmRepository.findOne({ where: { email } });
    return user;
  }

  public async findAllUsersExecept({
    except_user_id,
  }: IFindAllUsersExeceptDTO): Promise<User[]> {
    let users: User[];
    if (except_user_id) {
      users = await this.orgmRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.orgmRepository.find();
    }
    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.orgmRepository.findOne(id);
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.orgmRepository.create(userData);

    await this.orgmRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.orgmRepository.save(user);
  }
}
export default UsersRepository;
