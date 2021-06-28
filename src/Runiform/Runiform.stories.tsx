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
          validation: [required, minLength(4)],
        },
        lastName: {
          type: InputType.text,
          label: 'Last Name:',
          value: '',
          validation: [required, maxLength(20), startsWith('wooga.name')],
        },
        nickName: {
          type: InputType.text,
          label: 'Nickname:',
          value: '',
          validation: [minLengthForNotRequired(4), maxLength(20)],
        },
        agreement: {
          type: InputType.checkbox,
          label: 'I agree with providing my information',
          value: false,
          validation: [required],
        },
      }}
      onSubmit={(val) => console.log(val)}
    />
  </Container>
));
