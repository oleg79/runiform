export type ValidatorResult = string[];

export type Validator = (
  value: string,
  prevResult: ValidatorResult
) => ValidatorResult;

export type FieldOptions = Readonly<{
  type: 'text';
  value: string;
  label?: string;
  placeholder?: string;
  validation: Validator[];
}>;

export type FieldSet = { [key: string]: FieldOptions };

export type RuniformReducerState = {
  [Property in keyof FieldSet]: {
    value: FieldSet[Property]['value'];
    validationErrors: ValidatorResult;
  };
};

export enum ActionType {
  setValue = 'setValue',
  setErrors = 'setErrors',
}

export type RuniformReducerAction = {
  type: ActionType;
  payload: {
    fieldName: keyof FieldSet;
    value: string;
  };
};

export type RuniformProps = {
  fieldSet: FieldSet;
  onSubmit: (input: RuniformReducerState) => void;
};
