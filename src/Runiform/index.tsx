import React from 'react';
import { ActionType, FieldSet, InputType, RuniformState } from './types';
import {
  createInitialState,
  createReducer,
  isFormInvalid,
  validatedAllFields,
} from './helpers';
import { TextField } from './components/TextField';
import { CheckboxField } from './components/CheckboxField';
import defaultStyles from './Runiform.module.scss';
import { FieldProps } from './components/types';

type RuniformProps = {
  fieldSet: FieldSet;
  onSubmit: (input: RuniformState) => void;
  submitText: string;
  styles?: typeof defaultStyles;
};

const typeToComponentMap: Record<InputType, React.FC<FieldProps<any>>> = {
  [InputType.text]: TextField,
  [InputType.checkbox]: CheckboxField,
};

export const Runiform: React.FC<RuniformProps> = ({
  fieldSet,
  onSubmit,
  submitText,
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
      {Object.keys(fieldSet).map((fieldName) => {
        const InputComponent = typeToComponentMap[fieldSet[fieldName].type];
        return (
          <InputComponent
            key={fieldName}
            fieldName={fieldName}
            value={state[fieldName].value}
            placeholder={fieldSet[fieldName].placeholder}
            styles={styles}
            label={fieldSet[fieldName].label || fieldName}
            dispatch={dispatch}
            validationErrors={state[fieldName].validationErrors}
          />
        );
      })}
      <button
        className={styles['submit-button']}
        type="submit"
        disabled={!isFormSubmittable}
      >
        {submitText}
      </button>
    </form>
  );
};
