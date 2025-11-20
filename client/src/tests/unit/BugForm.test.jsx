import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../components/BugForm';

test('validates short title', async () => {
  const onCreate = jest.fn();
  render(<BugForm onCreate={onCreate} />);
  fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'ab' }});
  fireEvent.click(screen.getByText(/Report Bug/i));
  expect(await screen.findByRole('alert')).toHaveTextContent('Title must be at least 3 characters');
  expect(onCreate).not.toHaveBeenCalled();
});

test('calls onCreate on valid submit', async () => {
  const onCreate = jest.fn().mockResolvedValue({});
  render(<BugForm onCreate={onCreate} />);
  fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Long title' }});
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'desc' }});
  fireEvent.click(screen.getByText(/Report Bug/i));
  expect(onCreate).toHaveBeenCalledTimes(1);
});
