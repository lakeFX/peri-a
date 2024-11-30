import React from 'react';
import { MsalProvider as DefaultMsalProvider } from '@azure/msal-react';
import { msalInstance } from './config';

interface MsalProviderProps {
  children: React.ReactNode;
}

export default function MsalProvider({ children }: MsalProviderProps) {
  return (
    <DefaultMsalProvider instance={msalInstance}>
      {children}
    </DefaultMsalProvider>
  );
}