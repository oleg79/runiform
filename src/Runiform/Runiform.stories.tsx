import React from 'react';
import { storiesOf } from '@storybook/react';

import { Runiform } from '.';
import {
  maxLength,
  minLength,
  minLengthForNotRequired,
  required,
  startsWith,
} from './validators';
import { InputType } from './types';

const stories = storiesOf('Runiform', module);

const Container: React.FC = ({ children }) => (
  <div style={{ width: '300px' }}>{children}</div>
);

stories.add('default', () => (
  <Container>
    <Runiform
      fieldSet={{
        firstName: {
          type: InputType.text,
          label: 'First Name:',
          placeholder: 'Please enter your first name...',
          value: '',
          validators: [
            required('This field is required'),
            minLength('Must contain at least 4 characters', 4),
          ],
        },
        lastName: {
          type: InputType.text,
          label: 'Last Name:',
          value: '',
          validators: [
            required('This field is required'),
            maxLength('Must be 20 characters at most', 20),
            startsWith('Has to start with "wooga.name"', 'wooga.name'),
          ],
        },
        nickName: {
          type: InputType.text,
          label: 'Nickname:',
          value: '',
          validators: [
            minLengthForNotRequired('Must contain at least 4 characters', 4),
            maxLength('Must be 20 characters at most', 20),
          ],
        },
        agreement: {
          type: InputType.checkbox,
          label: 'I agree with providing my information',
          value: false,
          validators: [required('Please confirm')],
        },
      }}
      onSubmit={(val) => console.log(val)}
    />
  </Container>
));
