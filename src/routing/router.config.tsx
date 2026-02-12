import { lazy } from 'react';
import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router';

import { PrivateRoute } from '@/routing/PrivateRoute';
import LayoutHeader from '@/Layout/LayoutHeader/Layout';
import { AdminRoute } from '@/routing/AdminRoute';

interface CommonRoute {
  element: ReactNode;
  children?: RouteItem[];
};

type RouteIndex = CommonRoute & { path?: never, index: boolean };
type RoutePath = CommonRoute & { path: string, index?: never };

type RouteItem = RouteIndex | RoutePath;

const Student = lazy(() => import("@/pages/Student/Student"));
const SignUp = lazy(() => import("@/pages/Auth/SignUp/SignUp"));
const SignIn = lazy(() => import("@/pages/Auth/SignIn/SignIn"));
const Admin = lazy(() => import("@/pages/Admin/Admin"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));

export const RouterConfig: RouteItem[] = [
  {
    index: true,
    element: (
      <PrivateRoute>
        <LayoutHeader>
          <Student />
        </LayoutHeader>
      </PrivateRoute>
      ),
  },
  {
    path: "signup",
    element: <SignUp />
  },
  {
    path: "signin",
    element: <SignIn />
  },
  {
    path: "admin",
    element: (
      <AdminRoute>
        <LayoutHeader>
          <Admin />
        </LayoutHeader>
      </AdminRoute>
    )
  },
  {
    path: "*",
    element: <NotFound />
  }
];

export const mapRoutes = (routes: RouteItem[]): RouteObject[] => {
  return routes.map(route => {
    if ('index' in route && route.index) {
      return {
        index: true,
        element: route.element,
      };
    }

    return {
      path: route.path,
      element: route.element,
      children: route.children ? mapRoutes(route.children) : undefined,
    };
  });
};