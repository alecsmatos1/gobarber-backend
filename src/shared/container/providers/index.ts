import { container } from 'tsyringe';

import IStorageProvider from './StoragedProvider/models/IStorageProvider';
import DiskStorageProvider from './StoragedProvider/implementations/DiskStorageProvider';

// import IMailProvider from './MailProvider/models/IMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
