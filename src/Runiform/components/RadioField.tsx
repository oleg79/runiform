import React from 'react';
import { FieldProps } from './types';
import { ActionType } from '../types';

export const RadioField: React.FC<FieldProps<string>> = ({
  label,
  options = [],
  fieldName,
  value,
  dispatch,
  styles,
}) => (
  <div className={styles['input-field']}>
    <p>{label}</p>
    <div className={styles['input-checkbox-options-wrapper']}>
      {options.map((option) => (
        <div>
          <input
            type="radio"
            id={option.value}
            name={fieldName}
            value={option.value}
            checked={value === option.value}
            onChange={(e) =>
              dispatch({
                type: ActionType.setValue,
                payload: {
                  fieldName,
                  value: option.value,
                },
              })
            }
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  </div>
);
