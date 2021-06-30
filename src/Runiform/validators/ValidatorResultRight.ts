import { ValidatorResult } from './ValidatorResult';

class ValidatorResultRight extends ValidatorResult {
  concat = (message: string): ValidatorResultRight =>
    new ValidatorResultRight(message);

  static get empty() {
    return new ValidatorResultRight([]);
  }
}

export const Last = ValidatorResultRight;
