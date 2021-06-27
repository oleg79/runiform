import React from 'react';

type FieldOptions = Readonly<{
  type: 'text';
  value: string;
  label?: string;
  placeholder?: string;
  validation?: (val: string) => boolean;
}>;

type FieldSet = { [key: string]: FieldOptions };

type RuniformProps = {
  fieldSet: FieldSet;
  onSubmit: (
    input: { [Property in keyof FieldSet]: FieldSet[Property]['value'] }
  ) => void;
};

type RuniformReducerState = {
  [Property in keyof FieldSet]: {
    value: FieldSet[Property]['value'];
    isValid: boolean;
  };
};

type RuniformReducerAction = {
  fieldName: keyof FieldSet;
  value: string;
};

const transformConfigToInitialState = (
  fieldSet: FieldSet
): RuniformReducerState =>
  Object.entries(fieldSet).reduce(
    (state, [fieldName, fieldOptions]) => ({
      ...state,
      [fieldName]: {
        value: fieldOptions.value,
        isValid: true,
      },
    }),
    {}
  );

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
        // isValid: fieldSet[action.fieldName]?.validation?(action.value) ?? true,
        isValid: fieldSet[action.fieldName].validation
          ? fieldSet[action.fieldName].validation(action.value)
          : true,
      },
    },
  });

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {Object.keys(fieldSet).map((fieldName) => (
        <label htmlFor={`runiform_${fieldName}`}>
          {fieldSet[fieldName].label || fieldName}
          <input
            style={
              state[fieldName].isValid
                ? {}
                : { color: 'red', borderColor: 'red' }
            }
            key={fieldName}
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
      ))}
    </div>
  );
};
