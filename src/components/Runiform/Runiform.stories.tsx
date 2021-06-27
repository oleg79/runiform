import React from 'react';
import { storiesOf } from '@storybook/react';

import { Runiform } from '.';
import { maxLength, minLength, required, startsWith } from './validators';

const stories = storiesOf('Runiform', module);

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
        validation: [required, maxLength(10), startsWith('wooga.name')],
      },
    }}
    onSubmit={(val) => console.log(val)}
  />
));
