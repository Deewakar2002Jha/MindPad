import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';
import * as ClerkReact from '@clerk/react';
import Dashboard from '../pages/Dashboard';

// Mock API calls
vi.mock('../api', () => ({
  getNotes: vi.fn().mockResolvedValue({ data: [] }),
  createNote: vi.fn().mockResolvedValue({ data: { _id: '1', title: 'Test', body: 'Body' } })
}));

import { createNote } from '../api';

// Partially mock clerk react
vi.mock('@clerk/react', async () => {
  const actual = await vi.importActual('@clerk/react');
  return {
    ...actual,
    useUser: vi.fn(),
    useAuth: vi.fn(),
    Show: vi.fn(),
    UserButton: () => <button>UserButton</button>
  };
});

describe('Authentication and Form Validation Tests', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects unauthenticated users to login or shows login via Show rules', () => {
    // Mock user out
    ClerkReact.useUser.mockReturnValue({ isLoaded: true, isSignedIn: false, user: null });
    ClerkReact.useAuth.mockReturnValue({ getToken: vi.fn().mockResolvedValue(null) });
    
    // For unauthenticated, Show when="signed-out" should render children, when="signed-in" should not
    ClerkReact.Show.mockImplementation(({ when, children }) => {
       if (when === 'signed-out') return <>{children}</>;
       return null;
    });

    render(<App />);

    const loginElements = screen.getAllByText('Login');
    expect(loginElements.length).toBeGreaterThan(0);
  });

  it('allows authenticated users to access dashboard and validates form submission', async () => {
    // Mock user in
    ClerkReact.useUser.mockReturnValue({ isLoaded: true, isSignedIn: true, user: { id: 'user_123', publicMetadata: {} } });
    const mockGetToken = vi.fn().mockResolvedValue('fake-token');
    ClerkReact.useAuth.mockReturnValue({ getToken: mockGetToken });

    // For authenticated
    ClerkReact.Show.mockImplementation(({ when, children }) => {
       if (when === 'signed-in') return <>{children}</>;
       return null;
    });

    // Render specifically the Dashboard to test form
    render(<Dashboard />);

    // Wait for Dashboard to load and fetch notes
    await waitFor(() => {
      expect(screen.getByText('My Notes')).toBeInTheDocument();
    });

    // Check token was grabbed for authentication
    expect(mockGetToken).toHaveBeenCalled();

    // FORM VALIDATION CHECK
    const titleInput = screen.getByPlaceholderText('Note Title');
    const bodyInput = screen.getByPlaceholderText("What's heavily on your mind?");
    const submitBtn = screen.getByText('Add Note');

    expect(titleInput).toBeRequired();
    expect(bodyInput).toBeRequired();

    // Assuming we click submit without filling body
    await userEvent.type(titleInput, 'New Title');
    // Not filling body textarea, native HTML5 validation will block it
    
    // We can also test our programmatic block:
    // Calling submit directly requires testing library form submission override or validating the state
    
    await userEvent.click(submitBtn);

    // Because body is empty, createNote should NOT have been called due to HTML5 validation / our programmatic check: if (!title || !body) return;
    expect(createNote).not.toHaveBeenCalled();

    // Now fill body and submit
    await userEvent.type(bodyInput, 'New Body Text');
    await userEvent.click(submitBtn);

    // Wait for the note API to be called with correct data and token
    await waitFor(() => {
      expect(createNote).toHaveBeenCalledWith({ title: 'New Title', body: 'New Body Text' }, 'fake-token');
    });
  });
});
