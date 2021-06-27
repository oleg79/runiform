import React from 'react';
import { storiesOf } from '@storybook/react';

import { Runiform, Validator } from '.';

const stories = storiesOf('Runiform', module);

const required: Validator = (value, prevResult) =>
  value ? prevResult : prevResult.concat('should not be empty');

const minLength =
  (len: number): Validator =>
  (value, prevResult) =>
    value.length >= len
      ? prevResult
      : prevResult.concat(`should have length more than ${len}`);

const maxLength =
  (len: number): Validator =>
  (value, prevResult) =>
    value.length < len
      ? prevResult
      : prevResult.concat(`should have length less than ${len}`);

const startWith =
  (start: string): Validator =>
  (value, prevResult) =>
    value.startsWith(start)
      ? prevResult
      : prevResult.concat(`should start with "${start}"`);

stories.add('default', () => (
  <Runiform
    fieldSet={{
      firstName: {
        type: 'text',
        value: '',
        validation: [required, minLength(4)],
      },
      lastName: {
        type: 'text',
        value: '',
        validation: [required, maxLength(10), startWith('Mr. ')],
      },
    }}
    onSubmit={() => {}}
  />
));
