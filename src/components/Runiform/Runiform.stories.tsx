import React from 'react';
import { storiesOf } from '@storybook/react';

import { Runiform } from '.';

const stories = storiesOf('Runiform', module);

stories.add('default', () => (
  <Runiform
    fieldSet={{
      firstName: {
        type: 'text',
        value: '',
        validation: (val) => val.length < 10,
      },
      lastName: {
        type: 'text',
        value: '',
        validation: Boolean,
      },
    }}
    onSubmit={() => {}}
  />
));
