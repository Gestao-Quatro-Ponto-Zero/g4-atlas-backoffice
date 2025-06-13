import { vi } from 'vitest';
import { initGA, trackPageView, trackEvent, trackButtonClick, trackError } from './ga';

// Mock window.gtag
const mockGtag = vi.fn();

describe('Google Analytics Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup window mock
    Object.defineProperty(window, 'gtag', {
      value: mockGtag,
      writable: true,
    });
    
    Object.defineProperty(window, 'dataLayer', {
      value: [],
      writable: true,
    });
  });

  describe('initGA', () => {
    it('should initialize GA with measurement ID', () => {
      const measurementId = 'G-XXXXXXXXXX';
      initGA(measurementId);

      expect(mockGtag).toHaveBeenCalledWith('js', expect.any(Date));
      expect(mockGtag).toHaveBeenCalledWith('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    });
  });

  describe('trackPageView', () => {
    it('should track page view with custom URL', () => {
      const customUrl = '/custom-page';
      trackPageView(customUrl);

      expect(mockGtag).toHaveBeenCalledWith('config', undefined, {
        page_path: customUrl,
        page_title: document.title,
        page_location: window.location.href,
      });
    });
  });

  describe('trackEvent', () => {
    it('should track custom event', () => {
      const eventName = 'custom_event';
      const parameters = {
        event_category: 'test',
        event_label: 'test_label',
        value: 1,
      };

      trackEvent(eventName, parameters);

      expect(mockGtag).toHaveBeenCalledWith('event', eventName, parameters);
    });
  });

  describe('trackButtonClick', () => {
    it('should track button click event', () => {
      const buttonName = 'header_login';
      const additionalData = { section: 'navigation' };

      trackButtonClick(buttonName, additionalData);

      expect(mockGtag).toHaveBeenCalledWith('event', 'button_click', {
        event_category: 'engagement',
        event_label: buttonName,
        section: 'navigation',
      });
    });
  });

  describe('trackError', () => {
    it('should track error event', () => {
      const error = new Error('Test error');
      const additionalData = { component: 'TestComponent' };

      trackError(error, additionalData);

      expect(mockGtag).toHaveBeenCalledWith('event', 'exception', {
        event_category: 'error',
        event_label: 'Test error',
        custom_parameters: {
          error_name: 'Error',
          error_stack: error.stack,
          component: 'TestComponent',
        },
      });
    });
  });
});