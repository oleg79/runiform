import { ValidatorCreator } from './types';

export const startsWith: ValidatorCreator<string> =
  (message, start: string) => (value, prevResult) =>
    value.startsWith(start) ? prevResult : prevResult.concat(message);
