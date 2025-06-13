import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AnalyticsProvider } from '@/components/Analytics';

// Mock analytics para testes
vi.mock('@/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  trackButtonClick: vi.fn(),
  trackError: vi.fn(),
  initGA: vi.fn(),
  getGAId: vi.fn(() => 'G-TEST'),
}));

// Provider para testes
const TestProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

// Render customizado com providers
const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: TestProviders, ...options });

// Re-export tudo do testing-library
export * from '@testing-library/react';
export { customRender as render };

// Utilitários de teste
export const sanitizeProps = (props: Record<string, any>) => {
  const sanitized = { ...props };
  delete sanitized.children;
  delete sanitized.className;
  return sanitized;
};

export const mockFetch = (
  data?: any,
  rejectError = false,
  fetchError = false
) => {
  return vi.fn(() => {
    if (rejectError) {
      return Promise.reject(new Error('Network Error'));
    }
    
    if (fetchError) {
      return Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Server Error' }),
      });
    }
    
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(data),
    });
  });
};