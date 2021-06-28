import React from 'react';

type ErrorListProps = {
  validationErrors: string[];
  styles: any;
};

export const ErrorList: React.FC<ErrorListProps> = ({ validationErrors }) => (
  <ul>
    {validationErrors.map((err) => (
      <li key={err}>{err}</li>
    ))}
  </ul>
);
