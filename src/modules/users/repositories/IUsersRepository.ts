import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllUsersExeceptDTO from '../dtos/IFindAllUsersExeceptDTO';

export default interface IUsersRepository {
  findAllUsersExecept(data: IFindAllUsersExeceptDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
