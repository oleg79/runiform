import {
  createInitialState,
  createReducer,
  createValidation,
  isFormInvalid,
} from './helpers';
import { ActionType, FieldSet } from './types';
import { maxLength, minLength, required, startsWith } from './validators';

describe('createValidation', () => {
  it('should create a proper validation with no validators', () => {
    const validation = createValidation([]);

    expect(typeof validation).toBe('function');
    expect(validation('some value')).toEqual([]);
  });

  it('should create a proper validation with validators', () => {
    const validation = createValidation([
      (v, p) => (v.length < 4 ? p : p.concat('error 1')),
      (v, p) => (v === 'some value' ? p : p.concat('error 2')),
      (v, p) => (v.startsWith('abc') ? p : p.concat('error 3')),
      (v, p) => (v.includes('abc') ? p : p.concat('error 4')),
    ]);

    expect(typeof validation).toBe('function');
    expect(validation('some value')).toEqual(['error 1', 'error 3', 'error 4']);
  });
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
          type: 'text',
          value: 'initial value',
          validation: [],
        },
        field2: {
          type: 'text',
          value: '',
          validation: [],
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
      type: 'text',
      value: '',
      validation: [required, minLength(4)],
    },
    field2: {
      type: 'text',
      value: '',
      validation: [required, maxLength(10), startsWith('wooga.name')],
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
        validationErrors: ['should have length more than 4'],
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
        validationErrors: [
          'should have length less than 10',
          'should start with "wooga.name"',
        ],
      },
    });
  });
});
