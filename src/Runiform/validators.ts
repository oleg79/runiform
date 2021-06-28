import { ValidatorCreator } from './types';

export const required: ValidatorCreator<string | boolean> =
  (message) => (value, prevResult) =>
    value ? prevResult : prevResult.concat(message);

export const minLength: ValidatorCreator<string> =
  (message, len: number) => (value, prevResult) =>
    value.length >= len ? prevResult : prevResult.concat(message);

export const minLengthForNotRequired: ValidatorCreator<string> =
  (message, len: number) => (value, prevResult) =>
    !value.length || value.length >= len
      ? prevResult
      : prevResult.concat(message);

export const maxLength: ValidatorCreator<string> =
  (message, len: number) => (value, prevResult) =>
    value.length <= len ? prevResult : prevResult.concat(message);

export const startsWith: ValidatorCreator<string> =
  (message, start: string) => (value, prevResult) =>
    value.startsWith(start) ? prevResult : prevResult.concat(message);
