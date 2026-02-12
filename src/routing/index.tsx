import { createBrowserRouter } from "react-router";

import { App } from "@/App";
import { mapRoutes, RouterConfig } from "@/routing/router.config";

export const router = createBrowserRouter([
    {
        path: 'waitroom',
        element: <App />,
        children: mapRoutes(RouterConfig)
    },
]);