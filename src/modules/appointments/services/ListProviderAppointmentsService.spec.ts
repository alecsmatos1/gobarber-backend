import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

beforeEach(() => {
  fakeAppointmentsRepository = new FakeAppointmentsRepository();
  fakeCacheProvider = new FakeCacheProvider();
  listProviderAppointmentsService = new ListProviderAppointmentsService(
    fakeAppointmentsRepository,
    fakeCacheProvider,
  );
});
describe('ListProviderAppointments', () => {
  it('shoul be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });
    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 5,
      day: 20,
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
