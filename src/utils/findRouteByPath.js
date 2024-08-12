export const findRouteByPath = (path, routeList) => {
  for (const route of routeList) {
    if (route.path === path) {
      return route;
    }

    if (route.children) {
      const nestedRotue = findRouteByPath(path, route.children);
      return nestedRotue;
    }
  }
};
