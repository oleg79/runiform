import { Validator } from './types';

export const required: Validator = (value, prevResult) =>
  value ? prevResult : prevResult.concat('should not be empty');

export const minLength =
  (len: number): Validator =>
  (value, prevResult) =>
    value.length >= len
      ? prevResult
      : prevResult.concat(`should have length more than ${len}`);

export const minLengthForNotRequired =
  (len: number): Validator =>
  (value, prevResult) =>
    !value.length || value.length >= len
      ? prevResult
      : prevResult.concat(`should have length more than ${len}`);

export const maxLength =
  (len: number): Validator =>
  (value, prevResult) =>
    value.length <= len
      ? prevResult
      : prevResult.concat(`should have length less than ${len}`);

export const startsWith =
  (start: string): Validator =>
  (value, prevResult) =>
    value.startsWith(start)
      ? prevResult
      : prevResult.concat(`should start with "${start}"`);
