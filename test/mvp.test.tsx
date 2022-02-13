import * as React from 'react';
import { render, cleanup, act, waitFor, screen } from '@testing-library/react';

import { Demo } from '../src/Demo';

describe('create', function () {
  it('should display pass in number', async function () {
    // arrange
    render(<Demo theme="theme1" setTheme={console.log} />);

    //act
    // fireEvent.click(screen.getByText('Load Greeting'))
    await waitFor(() => screen.findByText('theme1'));

    // assert
    expect(screen.getAllByRole('button').at(1)).toHaveTextContent('Click me');
  });
});
