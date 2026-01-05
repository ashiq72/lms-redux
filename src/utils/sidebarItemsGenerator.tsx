import { NavLink } from "react-router-dom";
import type { TSidebarItem, TUserPath } from "../types";

export const generateSidebarItems = (
  items: TUserPath[],
  basePath: string
): TSidebarItem[] => {
  return items.map((item) => {
    if (item.children) {
      return {
        key: item.name,
        label: item.name,
        children: generateSidebarItems(item.children, basePath),
      };
    }

    return {
      key: item.name,
      label: <NavLink to={`${basePath}/${item.path}`}>{item.name}</NavLink>,
    };
  });
};
