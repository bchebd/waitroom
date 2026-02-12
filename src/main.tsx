import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { router } from '@/routing/index.tsx';
import { store, persistor } from '@/store/store';
import { ThemeProvider } from '@/hooks/useTheme';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <HashRouter>
                        <RouterProvider router={router} />
                    </HashRouter>
                </PersistGate>
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
