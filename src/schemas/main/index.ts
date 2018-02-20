import { Schema } from '../../types';

import { cryptoKittiesSchema } from './CryptoKitties/index';

export const mainSchemas: Array<Schema<any>> = [
  cryptoKittiesSchema,
];
