import { ValidatorCreator } from './types';

export const minLengthForNotRequired: ValidatorCreator<string> =
  (message, len: number) => (value, prevResult) =>
    !value.length || value.length >= len
      ? prevResult
      : prevResult.concat(message);
