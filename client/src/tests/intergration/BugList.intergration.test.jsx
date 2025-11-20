import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import * as api from '../api';

jest.mock('../api');

test('renders empty state then adds a bug', async () => {
  api.fetchBugs.mockResolvedValue([]);
  const mockCreated = { _id: '1', title: 'a', description: '', severity: 'low', status: 'open' };
  api.createBug.mockResolvedValue(mockCreated);

  render(<App />);

  await waitFor(() => expect(screen.getByText(/No bugs reported yet/i)).toBeInTheDocument());

  // fill form
  fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'a bug' }});
  fireEvent.click(screen.getByText(/Report Bug/i));

  // ensure rendered
  await waitFor(() => expect(screen.getByText('a bug')).toBeInTheDocument());
});
