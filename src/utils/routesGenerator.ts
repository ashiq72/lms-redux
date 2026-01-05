import type { RouteObject } from "react-router-dom";
import type { TUserPath } from "../types";

export const generateRoutes = (items: TUserPath[]): RouteObject[] => {
  return items.flatMap((item) => {
    const routes: RouteObject[] = [];

    if (item.path && item.element) {
      routes.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      routes.push(...generateRoutes(item.children));
    }

    return routes;
  });
};
