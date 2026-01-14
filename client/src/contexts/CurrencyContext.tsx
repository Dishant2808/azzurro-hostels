import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  flag: string;
  name: string;
  rate: number; // Exchange rate relative to AUD
}

interface CurrencyContextType {
  currency: string;
  setCurrency: (code: string) => void;
  currencies: Currency[];
  formatPrice: (audPrice: number) => string;
  convertPrice: (audPrice: number) => number;
  getCurrencySymbol: () => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCIES: Currency[] = [
  { code: "AUD", symbol: "A$", flag: "🇦🇺", name: "Australian Dollar", rate: 1.0 },
  { code: "USD", symbol: "$", flag: "🇺🇸", name: "US Dollar", rate: 0.63 },
  { code: "EUR", symbol: "€", flag: "🇪🇺", name: "Euro", rate: 0.59 },
  { code: "GBP", symbol: "£", flag: "🇬🇧", name: "British Pound", rate: 0.50 },
  { code: "JPY", symbol: "¥", flag: "🇯🇵", name: "Japanese Yen", rate: 98.0 },
  { code: "CAD", symbol: "C$", flag: "🇨🇦", name: "Canadian Dollar", rate: 0.88 },
  { code: "SGD", symbol: "S$", flag: "🇸🇬", name: "Singapore Dollar", rate: 0.85 },
  { code: "NZD", symbol: "NZ$", flag: "🇳🇿", name: "New Zealand Dollar", rate: 1.08 }
];

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<string>("AUD");

  // Load saved currency from localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem('azzurro-currency');
    if (savedCurrency && CURRENCIES.find(c => c.code === savedCurrency)) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrency = (code: string) => {
    setCurrencyState(code);
    localStorage.setItem('azzurro-currency', code);
  };

  const getCurrentCurrency = () => {
    return CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];
  };

  const convertPrice = (audPrice: number): number => {
    const currentCurrency = getCurrentCurrency();
    const convertedPrice = audPrice * currentCurrency.rate;
    
    // Round to appropriate decimal places based on currency
    if (currentCurrency.code === 'JPY') {
      return Math.round(convertedPrice); // JPY has no decimal places
    }
    return Math.round(convertedPrice * 100) / 100; // 2 decimal places for others
  };

  const formatPrice = (audPrice: number): string => {
    const currentCurrency = getCurrentCurrency();
    const convertedPrice = convertPrice(audPrice);
    
    if (currentCurrency.code === 'JPY') {
      return `${currentCurrency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
    
    return `${currentCurrency.symbol}${convertedPrice.toFixed(2)}`;
  };

  const getCurrencySymbol = (): string => {
    return getCurrentCurrency().symbol;
  };

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    currencies: CURRENCIES,
    formatPrice,
    convertPrice,
    getCurrencySymbol
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}