import React from 'react';
import { ActionType, FieldSet, RuniformReducerState } from './types';
import {
  createInitialState,
  createReducer,
  isFormInvalid,
  validatedAllFields,
} from './helpers';
import { TextField } from './components/TextField';
import defaultStyles from './Runiform.module.scss';

type RuniformProps = {
  fieldSet: FieldSet;
  onSubmit: (input: RuniformReducerState) => void;
  styles?: typeof defaultStyles;
};

export const Runiform: React.FC<RuniformProps> = ({
  fieldSet,
  onSubmit,
  styles = defaultStyles,
}) => {
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
        <TextField
          key={fieldName}
          fieldName={fieldName}
          value={state[fieldName].value}
          placeholder={fieldSet[fieldName].placeholder}
          styles={styles}
          label={fieldSet[fieldName].label || fieldName}
          dispatch={dispatch}
          validationErrors={state[fieldName].validationErrors}
        />
      ))}
      <button
        className={styles['submit-button']}
        type="submit"
        disabled={!isFormSubmittable}
      >
        Submit
      </button>
    </form>
  );
};
