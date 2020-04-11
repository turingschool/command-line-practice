import React from 'react';
import ReactDOM from 'react-dom';
import Terminal from './';
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';

describe('Terminal', () => {

  it('displays the prompt for a command', () => {
    const { getByLabelText } = render(
      <Terminal handleNewCommand={jest.fn()} />
    );

    expect(getByLabelText("~")).toBeInTheDocument();
  });

  it('displays the users command', () => {
    const { getByLabelText } = render(
      <Terminal handleNewCommand={jest.fn()} />
    );

    fireEvent.change(getByLabelText("~"), { target: { value: "ls" }});
    expect(getByLabelText("~").value).toBe("ls");
  });

  it('calls handleSubmit', () => {
    const mockHandleSubmit = jest.fn();
    const { getByDisplayValue, getByLabelText } = render(
      <Terminal handleNewCommand={mockHandleSubmit} />
    );

    fireEvent.change(getByLabelText("~"), { target: { value: "ls" }});
    fireEvent.keyPress(getByLabelText("~"), { key: 'Enter', code: 'Enter' });

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

});
