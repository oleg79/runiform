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
        validation: [required, maxLength(20), startsWith('wooga.name')],
      },
      nickName: {
        type: 'text',
        value: '',
        validation: [maxLength(20)],
      },
    }}
    onSubmit={(val) => console.log(val)}
  />
));
