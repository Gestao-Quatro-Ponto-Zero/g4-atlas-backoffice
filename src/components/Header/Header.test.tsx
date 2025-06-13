import React from 'react';
import { render } from '../../../tests';
import Header from './Header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
    // Component is intentionally empty, so just test it renders
  });
});