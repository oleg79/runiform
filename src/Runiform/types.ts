import { Validator, ValidatorResult } from './validators';

export enum SimpleInputType {
  text = 'text',
  checkbox = 'checkbox',
}

export enum ComplexInputType {
  radio = 'radio',
}

export type ValuesTypeMap = {
  [SimpleInputType.text]: string;
  [SimpleInputType.checkbox]: boolean;
  [ComplexInputType.radio]: string;
};

export type Validators<T> = [ValidatorResult, ...Validator<T>[]];

type SimpleField<T extends SimpleInputType> = {
  type: T;
  value: ValuesTypeMap[T];
  validators?: Validators<ValuesTypeMap[T]>;
};

type ComplexField<T extends ComplexInputType> = {
  type: T;
  value: ValuesTypeMap[T] | undefined;
  options: { value: T; label: string }[];
  validators?: Validators<ValuesTypeMap[T]>;
  label?: string;
  placeholder?: string;
};

type MakeSimpleFieldConfiguration<T extends SimpleInputType> =
  SimpleField<T> & {
    label?: string;
    placeholder?: string;
  };

export type FieldConfiguration =
  | MakeSimpleFieldConfiguration<SimpleInputType.text>
  | MakeSimpleFieldConfiguration<SimpleInputType.checkbox>
  | ComplexField<ComplexInputType.radio>;

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
