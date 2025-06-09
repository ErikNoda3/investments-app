'use client'

import { queryClient } from "@/lib/react-query"
import { QueryClientProvider } from "@tanstack/react-query"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}