import { Suspense } from 'react';
import './styles/global.scss';
import './styles/reset.scss';
import { Outlet } from 'react-router';
import { Loader } from './components/Loader/Loader';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

export const App = () => {

    return (
        <ErrorBoundary>
            <Suspense fallback={<Loader />} >
                <Outlet />
            </Suspense>
        </ErrorBoundary>
    );
};