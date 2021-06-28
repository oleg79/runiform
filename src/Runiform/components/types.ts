import React from 'react';
import { RuniformReducerAction } from '../types';

export type FieldProps<T> = {
  fieldName: string;
  label: string;
  validationErrors: string[];
  styles: any;
  value: T;
  placeholder?: string;
  dispatch: React.Dispatch<RuniformReducerAction<T>>;
};
