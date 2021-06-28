import React from 'react';
import { ActionType, RuniformReducerAction } from '../types';
import { ErrorList } from './ErrorList';

type TextFieldProps = {
  fieldName: string;
  label: string;
  validationErrors: string[];
  styles: any;
  value: string;
  placeholder?: string;
  dispatch: React.Dispatch<RuniformReducerAction>;
};

const _TextField: React.FC<TextFieldProps> = ({
  fieldName,
  label,
  validationErrors,
  styles,
  value,
  placeholder,
  dispatch,
}) => (
  <div className={styles['input-field']}>
    <label className={styles.label} htmlFor={`runiform_${fieldName}`}>
      {label}:
    </label>
    <input
      id={`runiform_${fieldName}`}
      className={
        validationErrors.length ? styles['input-with-error'] : styles.input
      }
      data-testid={`${fieldName}-element`}
      aria-label={fieldName}
      name={fieldName}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) =>
        dispatch({
          type: ActionType.setValue,
          payload: {
            fieldName,
            value: e.currentTarget.value,
          },
        })
      }
    />
    <ErrorList validationErrors={validationErrors} styles={styles} />
  </div>
);

export const TextField = React.memo(
  _TextField,
  (prev, next) =>
    prev.value === next.value &&
    prev.validationErrors.length === next.validationErrors.length
);
