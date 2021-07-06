import React from 'react';
import { storiesOf } from '@storybook/react';

import { Runiform } from '.';
import {
  All,
  First,
  Last,
  maxLength,
  minLength,
  minLengthForNotRequired,
  required,
  startsWith,
} from './validators';
import { ComplexInputType, SimpleInputType } from './types';

const stories = storiesOf('Runiform', module);

const Container: React.FC = ({ children }) => (
  <div style={{ width: '300px' }}>{children}</div>
);

stories.add('default', () => (
  <Container>
    <Runiform
      fieldSet={{
        firstName: {
          type: SimpleInputType.text,
          label: 'First Name:',
          placeholder: 'Please enter your first name...',
          value: '',
          validators: [
            First.empty,
            required('This field is required'),
            minLength('Must contain at least 4 characters', 4),
          ],
        },
        lastName: {
          type: SimpleInputType.text,
          label: 'Last Name:',
          value: '',
          validators: [
            Last.empty,
            startsWith('Has to start with "wooga.name"', 'wooga.name'),
            maxLength('Must be 20 characters at most', 20),
          ],
        },
        nickName: {
          type: SimpleInputType.text,
          label: 'Nickname:',
          value: '',
          validators: [
            All.empty,
            minLengthForNotRequired('Must contain at least 4 characters', 4),
            maxLength('Must be 20 characters at most', 20),
          ],
        },
        noValidation: {
          type: SimpleInputType.text,
          label: 'No validation:',
          value: '',
        },
        agreement: {
          type: SimpleInputType.checkbox,
          label: 'I agree with providing my information',
          value: false,
          validators: [All.empty, required('Please confirm')],
        },
        petType: {
          type: ComplexInputType.radio,
          label: 'Pet type:',
          value: undefined,
          options: [
            { label: '🐕', value: 'dogs' },
            { label: '🐈', value: 'cats' },
            { label: '🐍', value: 'reptiles' },
            { label: '🕷️', value: 'insects' },
            { label: '🐄', value: 'cows' },
          ],
        },
      }}
      submitText="Submit"
      onSubmit={(val) => console.log(val)}
    />
  </Container>
));

stories.add('Shows all error messages', () => (
  <Container>
    <Runiform
      fieldSet={{
        firstName: {
          type: SimpleInputType.text,
          label: 'First Name:',
          placeholder: 'Please enter your first name...',
          value: '',
          validators: [
            All.empty,
            required('This field is required'),
            startsWith('Must start with "abc"', 'abc'),
            minLength('Must contain at least 4 characters', 4),
          ],
        },
      }}
      submitText="Submit"
      onSubmit={(val) => console.log(val)}
    />
  </Container>
));

stories.add('Shows first error message', () => (
  <Container>
    <Runiform
      fieldSet={{
        firstName: {
          type: SimpleInputType.text,
          label: 'First Name:',
          placeholder: 'Please enter your first name...',
          value: '',
          validators: [
            First.empty,
            required('This field is required'),
            startsWith('Must start with "abc"', 'abc'),
            minLength('Must contain at least 4 characters', 4),
          ],
        },
      }}
      submitText="Submit"
      onSubmit={(val) => console.log(val)}
    />
  </Container>
));

stories.add('Shows last error message', () => (
  <Container>
    <Runiform
      fieldSet={{
        firstName: {
          type: SimpleInputType.text,
          label: 'First Name:',
          placeholder: 'Please enter your first name...',
          value: '',
          validators: [
            Last.empty,
            required('This field is required'),
            startsWith('Must start with "abc"', 'abc'),
            minLength('Must contain at least 4 characters', 4),
          ],
        },
      }}
      submitText="Submit"
      onSubmit={(val) => console.log(val)}
    />
  </Container>
));

stories.add('No validation', () => (
  <Container>
    <Runiform
      fieldSet={{
        firstName: {
          type: SimpleInputType.text,
          label: 'First Name:',
          placeholder: 'Please enter your first name...',
          value: '',
        },
      }}
      submitText="Submit"
      onSubmit={(val) => console.log(val)}
    />
  </Container>
));
