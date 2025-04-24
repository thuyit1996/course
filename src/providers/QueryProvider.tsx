'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const QueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 30 * 1000,
        },
      },
    });
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default QueryProvider;
