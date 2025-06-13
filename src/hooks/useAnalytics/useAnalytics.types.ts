export interface UseAnalyticsReturn {
  trackUserAction: (action: string, parameters?: Record<string, any>) => void;
  trackPageView: (url?: string) => void;
  trackButtonClick: (buttonName: string, additionalData?: Record<string, any>) => void;
  trackError: (error: Error, additionalData?: Record<string, any>) => void;
  trackFormSubmit: (formName: string, additionalData?: Record<string, any>) => void;
}