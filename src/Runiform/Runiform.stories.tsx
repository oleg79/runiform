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
          validators: [required, minLength(4)],
        },
        lastName: {
          type: InputType.text,
          label: 'Last Name:',
          value: '',
          validators: [required, maxLength(20), startsWith('wooga.name')],
        },
        nickName: {
          type: InputType.text,
          label: 'Nickname:',
          value: '',
          validators: [minLengthForNotRequired(4), maxLength(20)],
        },
        agreement: {
          type: InputType.checkbox,
          label: 'I agree with providing my information',
          value: false,
          validators: [required],
        },
      }}
      onSubmit={(val) => console.log(val)}
    />
  </Container>
));
