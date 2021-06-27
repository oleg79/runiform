import React from 'react';
import { ActionType, RuniformProps } from './types';
import {
  createInitialState,
  createReducer,
  isFormInvalid,
  validatedAllFields,
} from './helpers';
import styles from './Runiform.module.scss';

export const Runiform: React.FC<RuniformProps> = ({ fieldSet, onSubmit }) => {
  const initialState = createInitialState(fieldSet);
  const reducer = createReducer(fieldSet);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const isFormSubmittable = !isFormInvalid(state);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preSubmitErrors = validatedAllFields(fieldSet, state);

    if (!preSubmitErrors && isFormSubmittable) {
      onSubmit(state);
    } else if (preSubmitErrors) {
      dispatch({ type: ActionType.setErrors, payload: preSubmitErrors });
    }
  };

  return (
    <form
      data-testid="form-element"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      {Object.keys(fieldSet).map((fieldName) => (
        <React.Fragment key={fieldName}>
          <label htmlFor={`runiform_${fieldName}`}>
            {fieldSet[fieldName].label || fieldName}:
            <input
              id={`runiform_${fieldName}`}
              className={
                state[fieldName].validationErrors.length
                  ? styles['input-with-error']
                  : styles.input
              }
              data-testid={`${fieldName}-element`}
              aria-label={fieldName}
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
      <button type="submit" disabled={!isFormSubmittable}>
        Submit
      </button>
    </form>
  );
};
