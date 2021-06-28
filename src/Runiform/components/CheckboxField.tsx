import React from 'react';
import { ActionType } from '../types';
import { ErrorList } from './ErrorList';
import { FieldProps } from './types';

const _CheckboxField: React.FC<FieldProps<boolean>> = ({
  fieldName,
  label,
  validationErrors,
  styles,
  value,
  dispatch,
}) => (
  <div className={styles['input-field']}>
    <input
      id={`runiform_${fieldName}`}
      className={styles['input-checkbox']}
      data-testid={`${fieldName}-element`}
      aria-label={fieldName}
      name={fieldName}
      type="checkbox"
      checked={value}
      onChange={(e) =>
        dispatch({
          type: ActionType.setValue,
          payload: {
            fieldName,
            value: e.target.checked,
          },
        })
      }
    />
    <label className={styles.label} htmlFor={`runiform_${fieldName}`}>
      {label}
    </label>
    <ErrorList validationErrors={validationErrors} styles={styles} />
  </div>
);

export const CheckboxField = React.memo(
  _CheckboxField,
  (prev, next) =>
    prev.value === next.value &&
    prev.validationErrors.length === next.validationErrors.length
);
