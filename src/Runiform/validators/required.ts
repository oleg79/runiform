import { ValidatorCreator } from './types';

export const required: ValidatorCreator<string | boolean> =
  (message) => (value, prevResult) =>
    value ? prevResult : prevResult.concat(message);
