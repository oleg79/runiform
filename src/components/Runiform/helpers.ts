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
    { type, payload }: RuniformReducerAction
  ): RuniformReducerState => {
    switch (type) {
      case ActionType.setValue:
        return {
          ...state,
          ...{
            [payload.fieldName]: {
              ...state[payload.fieldName],
              value: payload.value,
              validationErrors: createValidation(
                fieldSet[payload.fieldName].validation
              )(payload.value),
            },
          },
        };
      default:
        return state;
    }
  };
