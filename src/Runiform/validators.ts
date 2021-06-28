import { Validator } from './types';

export const required: Validator<string | boolean> = (value, prevResult) =>
  value ? prevResult : prevResult.concat('This field is required');

export const minLength =
  (len: number): Validator<string> =>
  (value, prevResult) =>
    value.length >= len
      ? prevResult
      : prevResult.concat(`should have length more than ${len}`);

export const minLengthForNotRequired =
  (len: number): Validator<string> =>
  (value, prevResult) =>
    !value.length || value.length >= len
      ? prevResult
      : prevResult.concat(`should have length more than ${len}`);

export const maxLength =
  (len: number): Validator<string> =>
  (value, prevResult) =>
    value.length <= len
      ? prevResult
      : prevResult.concat(`should have length less than ${len}`);

export const startsWith =
  (start: string): Validator<string> =>
  (value, prevResult) =>
    value.startsWith(start)
      ? prevResult
      : prevResult.concat(`should start with "${start}"`);
