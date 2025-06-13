import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { initGA, getGAId } from '@/utils/analytics';

interface AnalyticsContextType {
  isInitialized: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  isInitialized: false,
});

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    const gaId = getGAId();
    if (gaId && !isInitialized) {
      initGA(gaId);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  return (
    <AnalyticsContext.Provider value={{ isInitialized }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within AnalyticsProvider');
  }
  return context;
};