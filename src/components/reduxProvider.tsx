// app/providers.tsx
'use client'

import { Provider } from 'react-redux'
import { store, persistor } from '@/components/state/persist/store'
import { PersistGate } from 'redux-persist/integration/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
