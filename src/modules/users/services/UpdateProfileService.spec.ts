import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;
beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();
  fakeHashProvider = new FakeHashProvider();

  updateProfile = new UpdateProfileService(
    fakeUsersRepository,
    fakeHashProvider,
  );
});
describe('UpdateProfile', () => {
  it('shoul be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'JohnDoe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jhontre@example.com',
    });

    expect(updateUser.name).toBe('John Trê');
    expect(updateUser.email).toBe('jhontre@example.com');
  });

  it('shoul not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'JohnDoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste tst',
      email: 'teste@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoul be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'JohnDoe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jhontre@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('shoul not be able update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'JohnDoe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'jhontre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoul not be able update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'JohnDoe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'jhontre@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoul not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
