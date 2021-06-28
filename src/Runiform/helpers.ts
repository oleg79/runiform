import {
  ActionType,
  FieldSet,
  InputType,
  RuniformAction,
  RuniformState,
  ValidatorResult,
  Validators,
  ValuesTypeMap,
} from './types';

export const createValidation =
  <T>(validators: Validators<T>) =>
  (value: T) =>
    validators.reduce<ValidatorResult>(
      (result, validator) => validator(value, result),
      []
    );

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
    action: RuniformAction<ValuesTypeMap[InputType]>
  ): RuniformState => {
    switch (action.type) {
      case ActionType.setValue:
        return {
          ...state,
          ...{
            [action.payload.fieldName]: {
              ...state[action.payload.fieldName],
              value: action.payload.value,
              validationErrors: createValidation(
                fieldSet[action.payload.fieldName].validators as any
              )(action.payload.value),
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
  const fieldsWithErrorsEntries = Object.entries(state).reduce(
    (err: any[], [fieldName, data]) => {
      const validationErrors = createValidation(
        fieldSet[fieldName].validators as any
      )(data.value);

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
