import React from 'react';
import { render } from '@testing-library/react';

import { Runiform } from '.';

describe('Runiform', () => {
  it('checks render', () => {
    const { container } = render(<Runiform />);

    expect(container.firstChild?.textContent).toBe('Component goes here');
  });
});
