export abstract class ValidatorResult {
  value: string[];

  constructor(value: string | string[]) {
    this.value = typeof value === 'string' ? [value] : value;
  }

  get length(): number {
    return this.value.length;
  }

  abstract concat(message: string): ValidatorResult;
}
