import { useCallback } from 'react';
import { trackEvent, trackPageView, trackButtonClick, trackError } from '@/utils/analytics';
import { UseAnalyticsReturn } from './useAnalytics.types';

export const useAnalytics = (): UseAnalyticsReturn => {
  const trackUserAction = useCallback((action: string, parameters?: Record<string, any>) => {
    trackEvent('user_action', {
      event_category: 'engagement',
      event_label: action,
      custom_parameters: parameters,
    });
  }, []);

  const trackPageViewAction = useCallback((url?: string) => {
    trackPageView(url);
  }, []);

  const trackButtonClickAction = useCallback((buttonName: string, additionalData?: Record<string, any>) => {
    trackButtonClick(buttonName, additionalData);
  }, []);

  const trackErrorAction = useCallback((error: Error, additionalData?: Record<string, any>) => {
    trackError(error, additionalData);
  }, []);

  const trackFormSubmit = useCallback((formName: string, additionalData?: Record<string, any>) => {
    trackEvent('form_submit', {
      event_category: 'engagement',
      event_label: formName,
      custom_parameters: additionalData,
    });
  }, []);

  return {
    trackUserAction,
    trackPageView: trackPageViewAction,
    trackButtonClick: trackButtonClickAction,
    trackError: trackErrorAction,
    trackFormSubmit,
  };
};