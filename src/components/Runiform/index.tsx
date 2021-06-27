import React from 'react';

type ValidatorResult = string[];

export type Validator = (
  value: string,
  prevResult: ValidatorResult
) => ValidatorResult;

type FieldOptions = Readonly<{
  type: 'text';
  value: string;
  label?: string;
  placeholder?: string;
  validation: Validator[];
}>;

type FieldSet = { [key: string]: FieldOptions };

type RuniformReducerState = {
  [Property in keyof FieldSet]: {
    value: FieldSet[Property]['value'];
    validationErrors: ValidatorResult;
  };
};

type RuniformReducerAction = {
  fieldName: keyof FieldSet;
  value: string;
};

type RuniformProps = {
  fieldSet: FieldSet;
  onSubmit: (input: RuniformReducerState) => void;
};

const transformConfigToInitialState = (
  fieldSet: FieldSet
): RuniformReducerState =>
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

const createValidation = (validators: Validator[]) => (value: string) =>
  validators.reduce(
    (result, validator) => validator(value, result),
    [] as ValidatorResult
  );

const isFormInvalid = (state: RuniformReducerState): boolean =>
  Object.values(state).some(({ validationErrors }) => validationErrors.length);

export const Runiform: React.FC<RuniformProps> = ({ fieldSet, onSubmit }) => {
  const initialState = transformConfigToInitialState(fieldSet);

  const reducer = (
    state: RuniformReducerState,
    action: RuniformReducerAction
  ) => ({
    ...state,
    ...{
      [action.fieldName]: {
        ...state[action.fieldName],
        value: action.value,
        validationErrors: createValidation(
          fieldSet[action.fieldName].validation
        )(action.value),
      },
    },
  });

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(state);
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit}
    >
      {Object.keys(fieldSet).map((fieldName) => (
        <React.Fragment key={fieldName}>
          <label htmlFor={`runiform_${fieldName}`}>
            {fieldSet[fieldName].label || fieldName}
            <input
              style={
                state[fieldName].validationErrors.length
                  ? { color: 'red', borderColor: 'red' }
                  : {}
              }
              id={`runiform_${fieldName}`}
              name={fieldName}
              type={fieldSet[fieldName].type}
              value={state[fieldName].value}
              placeholder={fieldSet[fieldName].placeholder}
              onChange={(e) =>
                dispatch({
                  fieldName,
                  value: e.target.value,
                })
              }
            />
          </label>
          <ul>
            {state[fieldName].validationErrors.map((err) => (
              <li key={`${fieldName}${err}`}>{err}</li>
            ))}
          </ul>
        </React.Fragment>
      ))}
      <button type="submit" disabled={isFormInvalid(state)}>
        Submit
      </button>
    </form>
  );
};
