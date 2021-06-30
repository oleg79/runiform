import { ValidatorResult } from './ValidatorResult';

export type Validator<T> = (
  value: T,
  prevResult: ValidatorResult
) => ValidatorResult;

export type ValidatorCreator<T> = (
  message: string,
  ...args: any[]
) => Validator<T>;
