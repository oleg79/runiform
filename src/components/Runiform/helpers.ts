import {
  ActionType,
  FieldSet,
  RuniformReducerAction,
  RuniformReducerState,
  Validator,
  ValidatorResult,
} from './types';

export const createValidation = (validators: Validator[]) => (value: string) =>
  validators.reduce<ValidatorResult>(
    (result, validator) => validator(value, result),
    []
  );

export const isFormInvalid = (state: RuniformReducerState): boolean =>
  Object.values(state).some(({ validationErrors }) => validationErrors.length);

export const createInitialState = (fieldSet: FieldSet): RuniformReducerState =>
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
    state: RuniformReducerState,
    action: RuniformReducerAction
  ): RuniformReducerState => {
    switch (action.type) {
      case ActionType.setValue:
        return {
          ...state,
          ...{
            [action.payload.fieldName]: {
              ...state[action.payload.fieldName],
              value: action.payload.value,
              validationErrors: createValidation(
                fieldSet[action.payload.fieldName].validation
              )(action.payload.value),
            },
          },
        };
      case ActionType.setErrors:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };

export const validatedAllFields = (
  fieldSet: FieldSet,
  state: RuniformReducerState
): RuniformReducerState | null => {
  const fieldsWithErrorsEntries = Object.entries(state).reduce(
    (err: any[], [fieldName, data]) => {
      const validationErrors = createValidation(fieldSet[fieldName].validation)(
        data.value
      );

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
