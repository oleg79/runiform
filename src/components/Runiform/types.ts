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

export type SetValueAction = {
  type: ActionType.setValue;
  payload: {
    fieldName: keyof FieldSet;
    value: string;
  };
};

export type SetErrorAction = {
  type: ActionType.setErrors;
  payload: RuniformReducerState;
};

export type RuniformReducerAction = SetValueAction | SetErrorAction;

export type RuniformProps = {
  fieldSet: FieldSet;
  onSubmit: (input: RuniformReducerState) => void;
};
