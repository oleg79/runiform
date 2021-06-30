import { Validator, ValidatorResult } from './validators';

export enum InputType {
  text = 'text',
  checkbox = 'checkbox',
}

export type ValuesTypeMap = {
  [InputType.text]: string;
  [InputType.checkbox]: boolean;
};

export type Validators<T> = [ValidatorResult, ...Validator<T>[]];

type DistinctFields<T extends InputType> = {
  type: T;
  value: ValuesTypeMap[T];
  validators?: Validators<ValuesTypeMap[T]>;
};

type MakeFieldConfiguration<T extends InputType> = DistinctFields<T> & {
  label?: string;
  placeholder?: string;
};

export type FieldConfiguration =
  | MakeFieldConfiguration<InputType.text>
  | MakeFieldConfiguration<InputType.checkbox>;

export type FieldSet = { [key: string]: FieldConfiguration };

export type RuniformState = {
  [Property in keyof FieldSet]: {
    value: FieldSet[Property]['value'];
    validationErrors: string[];
  };
};

export enum ActionType {
  setValue = 'setValue',
  setErrors = 'setErrors',
  resetForm = 'resetForm',
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
  payload: RuniformState;
};

export type ResetFormAction = {
  type: ActionType.resetForm;
};

export type RuniformAction<T> =
  | SetValueAction<T>
  | SetErrorAction
  | ResetFormAction;
