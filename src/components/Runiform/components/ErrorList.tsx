import React from 'react';

type ErrorListProps = {
  validationErrors: string[];
  styles: any;
};

const _ErrorList: React.FC<ErrorListProps> = ({ validationErrors, styles }) => (
  <ul className={styles['error-list']}>
    {validationErrors.map((err) => (
      <li key={err} className={styles.error}>
        {err}
      </li>
    ))}
  </ul>
);

export const ErrorList = React.memo(
  _ErrorList,
  (prev, next) => prev.validationErrors.length === next.validationErrors.length
);
