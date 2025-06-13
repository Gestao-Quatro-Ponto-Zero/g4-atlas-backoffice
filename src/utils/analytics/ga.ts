// Google Analytics 4 integration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export interface GAEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

/**
 * Inicializa o Google Analytics 4
 */
export const initGA = (measurementId: string): void => {
  if (typeof window === 'undefined') return;

  // Carregar script do GA4
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Inicializar dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

/**
 * Rastreia visualização de página
 */
export const trackPageView = (url?: string): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', import.meta.env.VITE_GA_ID, {
    page_path: url || window.location.pathname,
    page_title: document.title,
    page_location: window.location.href,
  });
};

/**
 * Rastreia evento customizado
 */
export const trackEvent = (eventName: string, parameters: GAEvent = {}): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, {
    event_category: parameters.event_category,
    event_label: parameters.event_label,
    value: parameters.value,
    ...parameters.custom_parameters,
  });
};

/**
 * Rastreia clique em botão
 */
export const trackButtonClick = (buttonName: string, additionalData?: Record<string, any>): void => {
  trackEvent('button_click', {
    event_category: 'engagement',
    event_label: buttonName,
    ...additionalData,
  });
};

/**
 * Rastreia erro
 */
export const trackError = (error: Error, additionalData?: Record<string, any>): void => {
  trackEvent('exception', {
    event_category: 'error',
    event_label: error.message,
    custom_parameters: {
      error_name: error.name,
      error_stack: error.stack,
      ...additionalData,
    },
  });
};

/**
 * Obtém ID do GA4 das variáveis de ambiente
 */
export const getGAId = (): string | undefined => {
  return import.meta.env.VITE_GA_ID;
};