import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Runiform } from '.';
import { maxLength, minLength, required, startsWith } from './validators';
import { FieldSet } from './types';

describe('Runiform', () => {
  const handleSubmit = jest.fn();
  const fieldSet: FieldSet = {
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
  };

  afterEach(handleSubmit.mockReset);

  it('should render a proper number of input fields', () => {
    const { getAllByRole } = render(
      <Runiform fieldSet={fieldSet} onSubmit={handleSubmit} />
    );
    expect(getAllByRole('textbox').length).toBe(2);
  });

  it('should not trigger onSubmit on invalid form', async () => {
    const { findByTestId } = render(
      <Runiform fieldSet={fieldSet} onSubmit={handleSubmit} />
    );
    const firstNameInput = await findByTestId('firstName-element');
    fireEvent.change(firstNameInput, { target: { value: 'val' } });
    const form = await findByTestId('form-element');
    fireEvent.submit(form);

    expect(handleSubmit).not.toBeCalled();
  });

  it('should trigger onSubmit on valid form', async () => {
    const { findByTestId } = render(
      <Runiform fieldSet={fieldSet} onSubmit={handleSubmit} />
    );

    const firstNameInput = await findByTestId('firstName-element');
    const lastNameInput = await findByTestId('lastName-element');

    fireEvent.change(firstNameInput, {
      target: { value: 'value' },
    });
    fireEvent.change(lastNameInput, {
      target: { value: 'wooga.name.value' },
    });

    const form = await findByTestId('form-element');
    fireEvent.submit(form);

    expect(handleSubmit).toBeCalledWith({
      firstName: { value: 'value', validationErrors: [] },
      lastName: { value: 'wooga.name.value', validationErrors: [] },
    });
  });
});
