import { ValidatorResult } from './ValidatorResult';

class ValidatorResultSum extends ValidatorResult {
  concat = (message: string): ValidatorResultSum =>
    new ValidatorResultSum(this.value.concat(message));

  static get empty() {
    return new ValidatorResultSum([]);
  }
}

export const All = ValidatorResultSum;
