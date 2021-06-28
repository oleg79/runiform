import { Validator } from './types';

export const required =
  (message: string): Validator<string | boolean> =>
  (value, prevResult) =>
    value ? prevResult : prevResult.concat(message);

export const minLength =
  (message: string, len: number): Validator<string> =>
  (value, prevResult) =>
    value.length >= len ? prevResult : prevResult.concat(message);

export const minLengthForNotRequired =
  (message: string, len: number): Validator<string> =>
  (value, prevResult) =>
    !value.length || value.length >= len
      ? prevResult
      : prevResult.concat(message);

export const maxLength =
  (message: string, len: number): Validator<string> =>
  (value, prevResult) =>
    value.length <= len ? prevResult : prevResult.concat(message);

export const startsWith =
  (message: string, start: string): Validator<string> =>
  (value, prevResult) =>
    value.startsWith(start) ? prevResult : prevResult.concat(message);
