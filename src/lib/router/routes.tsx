import Home from "lib/pages/Home";
import type { PathRouteProps } from "react-router-dom";

export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
];
