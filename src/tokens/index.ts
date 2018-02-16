import {
  NetworkTokens,
} from '../types';

import { rinkebyTokens } from './rinkeby/index';
import { mainTokens } from './main/index';

export const tokens = {
  rinkeby: rinkebyTokens,
  main: mainTokens,
};
