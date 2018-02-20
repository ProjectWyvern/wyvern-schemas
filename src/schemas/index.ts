import {
  Schema,
} from '../types';

import { rinkebySchemas } from './rinkeby/index';
import { mainSchemas } from './main/index';

export const schemas = {
  rinkeby: rinkebySchemas,
  main: mainSchemas,
};
