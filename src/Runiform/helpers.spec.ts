import {
  createInitialState,
  createReducer,
  createValidation,
  isFormInvalid,
  validatedAllFields,
} from './helpers';
import { ActionType, FieldSet, SimpleInputType } from './types';
import {
  maxLength,
  minLength,
  required,
  startsWith,
  All,
  First,
  Last,
} from './validators';

describe('createValidation', () => {
  it('should create a proper validation with no validators', () => {
    const validation = createValidation([All.empty]);

    expect(typeof validation).toBe('function');
    expect(validation('some value')).toEqual([]);
  });

  test.each([
    ['All', All.empty, ['error 1', 'error 3', 'error 4']],
    ['First', First.empty, ['error 1']],
    ['Last', Last.empty, ['error 4']],
  ])(
    'should create a proper validation function for %s validation result strategy',
    (_, strategy, result) => {
      const validation = createValidation<string>([
        strategy,
        (v, p) => (v.length < 4 ? p : p.concat('error 1')),
        (v, p) => (v === 'some value' ? p : p.concat('error 2')),
        (v, p) => (v.startsWith('abc') ? p : p.concat('error 3')),
        (v, p) => (v.includes('abc') ? p : p.concat('error 4')),
      ]);

      expect(typeof validation).toBe('function');
      expect(validation('some value')).toEqual(result);
    }
  );
});

describe('isFormInvalid', () => {
  test.each([
    [
      {
        field1: { value: 'some', validationErrors: ['error'] },
        field2: { value: '', validationErrors: [] },
      },
      true,
    ],
    [
      {
        field1: { value: 'some', validationErrors: [] },
        field2: { value: '', validationErrors: [] },
      },
      false,
    ],
  ])('%s => %s', (state, result) => {
    expect(isFormInvalid(state)).toBe(result);
  });
});

describe('createInitialState', () => {
  it('should create a proper initial state', () => {
    expect(
      createInitialState({
        field1: {
          type: SimpleInputType.text,
          value: 'initial value',
        },
        field2: {
          type: SimpleInputType.text,
          value: '',
        },
      })
    ).toEqual({
      field1: { value: 'initial value', validationErrors: [] },
      field2: { value: '', validationErrors: [] },
    });
  });
});

describe('createReducer', () => {
  const fieldSet: FieldSet = {
    field1: {
      type: SimpleInputType.text,
      value: '',
      validators: [
        All.empty,
        required('required'),
        minLength('minLength 4', 4),
      ],
    },
    field2: {
      type: SimpleInputType.text,
      value: '',
      validators: [
        All.empty,
        required('required'),
        maxLength('maxLength 10', 10),
        startsWith('startsWith "wooga.name"', 'wooga.name'),
      ],
    },
  };

  const reducer = createReducer(fieldSet);
  const initialState = createInitialState(fieldSet);

  it('should update state properly', () => {
    let state = reducer(initialState, {
      type: ActionType.setValue,
      payload: { fieldName: 'field1', value: 'val' },
    });
    expect(state).toEqual({
      field1: {
        value: 'val',
        validationErrors: ['minLength 4'],
      },
      field2: { value: '', validationErrors: [] },
    });

    state = reducer(state, {
      type: ActionType.setValue,
      payload: { fieldName: 'field1', value: 'value' },
    });

    expect(state).toEqual({
      field1: {
        value: 'value',
        validationErrors: [],
      },
      field2: { value: '', validationErrors: [] },
    });

    state = reducer(state, {
      type: ActionType.setValue,
      payload: { fieldName: 'field2', value: 'val val val' },
    });

    expect(state).toEqual({
      field1: {
        value: 'value',
        validationErrors: [],
      },
      field2: {
        value: 'val val val',
        validationErrors: ['maxLength 10', 'startsWith "wooga.name"'],
      },
    });
  });
});

describe('validatedAllFields', () => {
  const fieldSet: FieldSet = {
    field1: {
      type: SimpleInputType.text,
      value: '',
      validators: [
        All.empty,
        required('required'),
        minLength('minLength 4', 4),
      ],
    },
    field2: {
      type: SimpleInputType.text,
      value: '',
      validators: [
        All.empty,
        required('required'),
        maxLength('maxLength 20', 20),
        startsWith('startsWith "wooga.name"', 'wooga.name'),
      ],
    },
  };

  test.each([
    [
      {
        field1: { value: 'value', validationErrors: [] },
        field2: { value: 'wooga.name.value', validationErrors: [] },
      },
      null,
    ],
    [
      {
        field1: { value: '', validationErrors: [] },
        field2: { value: 'some some some some some', validationErrors: [] },
      },
      {
        field1: {
          value: '',
          validationErrors: ['required', 'minLength 4'],
        },
        field2: {
          value: 'some some some some some',
          validationErrors: ['maxLength 20', 'startsWith "wooga.name"'],
        },
      },
    ],
  ])('%s => %s', (state, result) => {
    expect(validatedAllFields(fieldSet, state)).toEqual(result);
  });
});
