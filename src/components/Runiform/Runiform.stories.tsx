import React from 'react';
import { storiesOf } from '@storybook/react';

import { Runiform } from '.';
import { maxLength, minLength, required, startsWith } from './validators';

const stories = storiesOf('Runiform', module);

const Container: React.FC = ({ children }) => (
  <div style={{ width: '400px' }}>{children}</div>
);

stories.add('default', () => (
  <Container>
    <Runiform
      fieldSet={{
        firstName: {
          type: 'text',
          label: 'First Name',
          placeholder: 'Please enter your first name...',
          value: '',
          validation: [required, minLength(4)],
        },
        lastName: {
          type: 'text',
          label: 'Last Name',
          value: '',
          validation: [required, maxLength(20), startsWith('wooga.name')],
        },
        nickName: {
          type: 'text',
          label: 'Nickname',
          value: '',
          validation: [maxLength(20)],
        },
      }}
      onSubmit={(val) => console.log(val)}
    />
  </Container>
));
