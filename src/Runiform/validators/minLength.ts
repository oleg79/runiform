import { ValidatorCreator } from './types';

export const minLength: ValidatorCreator<string> =
  (message, len: number) => (value, prevResult) =>
    value.length >= len ? prevResult : prevResult.concat(message);
