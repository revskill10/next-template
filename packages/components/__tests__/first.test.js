import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

const Hello = () => <h1>Hello World</h1>

test('first hello test', () => {
  const { container } = render(<Hello />);

  expect(container).toHaveTextContent('Hello World');
});
