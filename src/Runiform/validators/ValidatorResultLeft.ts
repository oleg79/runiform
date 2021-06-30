import { ValidatorResult } from './ValidatorResult';

class ValidatorResultLeft extends ValidatorResult {
  concat = (message: string): ValidatorResultLeft =>
    this.value.length ? this : new ValidatorResultLeft(message);

  static get empty() {
    return new ValidatorResultLeft([]);
  }
}

export const First = ValidatorResultLeft;
