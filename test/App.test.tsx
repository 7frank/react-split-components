import * as React from 'react';
import {
  render,
  cleanup,
  act,
  waitFor,
  screen,
  fireEvent,
} from '@testing-library/react';

import App from '../src/App';

describe('given a "create" scenario with "App" component when clicking "click me"', function () {
  it('should change the theming state ', async function () {
    // arrange
    render(<App />);

    await waitFor(() => screen.getByText('light'));

    //act
    fireEvent.click(screen.getAllByRole('button').at(1)!);

    // assert
    await waitFor(() => screen.getByText('dark'));
  });
});
