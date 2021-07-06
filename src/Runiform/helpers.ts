import {
  ActionType,
  FieldSet,
  SimpleInputType,
  RuniformAction,
  RuniformState,
  Validators,
  ValuesTypeMap,
} from './types';
import { Validator, ValidatorResult } from './validators';

const getValidatorReducer =
  <T>(value: T) =>
  (result: ValidatorResult, validator: Validator<T>) =>
    validator(value, result);

export const createValidation =
  <T>([initial, ...validators]: Validators<T>) =>
  (value: T) =>
    validators.reduce(getValidatorReducer(value), initial).value;

export const isFormInvalid = (state: RuniformState): boolean =>
  Object.values(state).some(({ validationErrors }) => validationErrors.length);

export const createInitialState = (fieldSet: FieldSet): RuniformState =>
  Object.entries(fieldSet).reduce(
    (state, [fieldName, fieldOptions]) => ({
      ...state,
      [fieldName]: {
        value: fieldOptions.value,
        validationErrors: [],
      },
    }),
    {}
  );

export const createReducer =
  (fieldSet: FieldSet) =>
  (
    state: RuniformState,
    action: RuniformAction<ValuesTypeMap[SimpleInputType]>
  ): RuniformState => {
    switch (action.type) {
      case ActionType.setValue:
        const { validators } = fieldSet[action.payload.fieldName];
        const { value } = action.payload;

        const validationErrors = validators
          ? createValidation(validators as Validators<typeof value>)(value)
          : [];

        return {
          ...state,
          ...{
            [action.payload.fieldName]: {
              ...state[action.payload.fieldName],
              value: action.payload.value,
              validationErrors,
            },
          },
        };
      case ActionType.setErrors:
        return { ...state, ...action.payload };
      case ActionType.resetForm:
        return createInitialState(fieldSet);
      default:
        return state;
    }
  };

export const validatedAllFields = (
  fieldSet: FieldSet,
  state: RuniformState
): RuniformState | null => {
  const stateEntries = Object.entries(state);

  const fieldsWithErrorsEntries = stateEntries.reduce(
    (err: typeof stateEntries, [fieldName, data]) => {
      const { validators } = fieldSet[fieldName];
      const { value } = data;

      const validationErrors = validators
        ? createValidation(validators as Validators<typeof value>)(value)
        : [];

      return validationErrors.length
        ? err.concat([[fieldName, { ...data, validationErrors }]])
        : err;
    },
    []
  );

  if (!fieldsWithErrorsEntries.length) {
    return null;
  }

  return Object.fromEntries(fieldsWithErrorsEntries);
};
