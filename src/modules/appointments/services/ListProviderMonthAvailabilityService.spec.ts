import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

beforeEach(() => {
  fakeAppointmentsRepository = new FakeAppointmentsRepository();
  listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
    fakeAppointmentsRepository,
  );
});
describe('ListProviderMonthAvailability', () => {
  it('shoul be able to list the month availability from provider', async () => {
    for (let index = 8; index < 18; index += 1) {
      fakeAppointmentsRepository.create({
        provider_id: 'provider_id',
        user_id: 'user_id',
        date: new Date(2020, 4, 20, index, 0, 0),
      });
    }

    await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 5,
    });
    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
