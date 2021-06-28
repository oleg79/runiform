export type ValidatorResult = string[];

export type Validator = (
  value: string,
  prevResult: ValidatorResult
) => ValidatorResult;

export enum InputType {
  text = 'text',
  checkbox = 'checkbox',
}

type CommonOptions<T> = T & {
  type: InputType;
  label?: string;
  placeholder?: string;
  validation: Validator[];
};

export type FieldOptions = CommonOptions<
  | { type: InputType.text; value: string }
  | { type: InputType.checkbox; value: boolean }
>;

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

export type SetValueAction<T> = {
  type: ActionType.setValue;
  payload: {
    fieldName: keyof FieldSet;
    value: T;
  };
};

export type SetErrorAction = {
  type: ActionType.setErrors;
  payload: RuniformReducerState;
};

export type RuniformReducerAction<T> = SetValueAction<T> | SetErrorAction;
