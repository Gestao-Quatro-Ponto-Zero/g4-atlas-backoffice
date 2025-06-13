import { renderHook } from '../../../tests';
import { useAnalytics } from './useAnalytics';
import * as analyticsUtils from '@/utils/analytics';

// Mock analytics utils
vi.mock('@/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  trackButtonClick: vi.fn(),
  trackError: vi.fn(),
}));

describe('useAnalytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should track user action', () => {
    const { result } = renderHook(() => useAnalytics());
    
    result.current.trackUserAction('search', { query: 'test' });
    
    expect(analyticsUtils.trackEvent).toHaveBeenCalledWith('user_action', {
      event_category: 'engagement',
      event_label: 'search',
      custom_parameters: { query: 'test' },
    });
  });

  it('should track page view', () => {
    const { result } = renderHook(() => useAnalytics());
    
    result.current.trackPageView('/test-page');
    
    expect(analyticsUtils.trackPageView).toHaveBeenCalledWith('/test-page');
  });

  it('should track button click', () => {
    const { result } = renderHook(() => useAnalytics());
    
    result.current.trackButtonClick('login-button', { section: 'header' });
    
    expect(analyticsUtils.trackButtonClick).toHaveBeenCalledWith('login-button', { section: 'header' });
  });

  it('should track error', () => {
    const { result } = renderHook(() => useAnalytics());
    const error = new Error('Test error');
    
    result.current.trackError(error, { component: 'TestComponent' });
    
    expect(analyticsUtils.trackError).toHaveBeenCalledWith(error, { component: 'TestComponent' });
  });

  it('should track form submit', () => {
    const { result } = renderHook(() => useAnalytics());
    
    result.current.trackFormSubmit('contact-form', { fields: ['name', 'email'] });
    
    expect(analyticsUtils.trackEvent).toHaveBeenCalledWith('form_submit', {
      event_category: 'engagement',
      event_label: 'contact-form',
      custom_parameters: { fields: ['name', 'email'] },
    });
  });
});