import React from 'react';
import {ActionType, RuniformProps} from './types';
import { createInitialState, createReducer, isFormInvalid } from './helpers';

export const Runiform: React.FC<RuniformProps> = ({ fieldSet, onSubmit }) => {
  const initialState = createInitialState(fieldSet);
  const reducer = createReducer(fieldSet);

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
                  type: ActionType.setValue,
                  payload: {
                    fieldName,
                    value: e.target.value,
                  },
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
