import React from 'react';
import { ActionType, RuniformReducerAction } from '../types';

type TextFieldProps = {
  fieldName: string;
  label: string;
  hasErrors: boolean;
  styles: any;
  value: string;
  placeholder?: string;
  dispatch: React.Dispatch<RuniformReducerAction>;
};

export const TextField: React.FC<TextFieldProps> = ({
  fieldName,
  label,
  hasErrors,
  styles,
  value,
  placeholder,
  dispatch,
}) => (
  <label htmlFor={`runiform_${fieldName}`}>
    {label}:
    <input
      id={`runiform_${fieldName}`}
      className={hasErrors ? styles['input-with-error'] : styles.input}
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
            value: e.target.value,
          },
        })
      }
    />
  </label>
);
