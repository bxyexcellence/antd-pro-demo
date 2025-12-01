import { lazy, createElement } from 'react';
import type { RouteObject } from 'react-router-dom';
import { routes as routeConfigs } from '../config/routes';
import type { RouteConfig } from '../config/routes';

// 动态导入组件
const componentMap: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  './Welcome': lazy(() => import('../pages/Welcome')),
  './Dashboard': lazy(() => import('../pages/Dashboard')),
  './Users': lazy(() => import('../pages/Users')),
};

/**
 * 将路由配置转换为 React Router 路由
 */
const convertRoutes = (configs: RouteConfig[]): RouteObject[] => {
  return configs.map((config) => {
    const route: RouteObject = {
      path: config.path,
    };

    if (config.component && componentMap[config.component]) {
      const Component = componentMap[config.component];
      route.element = createElement(Component);
    }

    if (config.routes) {
      route.children = convertRoutes(config.routes);
    }

    return route;
  });
};

/**
 * React Router 路由配置
 */
export const routes: RouteObject[] = convertRoutes(routeConfigs);
