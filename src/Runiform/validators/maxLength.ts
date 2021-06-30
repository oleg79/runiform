import { ValidatorCreator } from './types';

export const maxLength: ValidatorCreator<string> =
  (message, len: number) => (value, prevResult) =>
    value.length <= len ? prevResult : prevResult.concat(message);
