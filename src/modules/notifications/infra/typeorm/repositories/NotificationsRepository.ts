import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private orgmRepository: MongoRepository<Notification>;

  constructor() {
    this.orgmRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.orgmRepository.create({
      content,
      recipient_id,
    });

    await this.orgmRepository.save(notification);
    return notification;
  }
}

export default NotificationsRepository;
