import React from 'react';
import { render } from '@testing-library/react';

import { Runiform } from '.';
import {maxLength, minLength, required, startsWith} from "./validators";

describe('Runiform', () => {
  it('checks render', () => {
    const { getAllByRole } = render(
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
        onSubmit={() => {}}
      />
    );

    expect(getAllByRole('textbox').length).toBe(2);
  });
});
