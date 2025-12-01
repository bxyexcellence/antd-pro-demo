import {
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

/**
 * 路由配置
 * @param path 路由路径
 * @param name 路由名称，也是菜单名称
 * @param icon 图标组件
 * @param component 组件路径
 * @param hideInMenu 在菜单中隐藏
 * @param access 权限标识
 */
export interface RouteConfig {
  path: string;
  name?: string;
  icon?: React.ComponentType;
  component?: string;
  hideInMenu?: boolean;
  access?: string;
  routes?: RouteConfig[];
}

/**
 * 路由配置列表
 */
export const routes: RouteConfig[] = [
  {
    path: '/',
    name: '欢迎',
    icon: HomeOutlined,
    component: './Welcome',
  },
  {
    path: '/dashboard',
    name: '仪表盘',
    icon: DashboardOutlined,
    component: './Dashboard',
  },
  {
    path: '/users',
    name: '用户管理',
    icon: UserOutlined,
    component: './Users',
  },
];

/**
 * 菜单项类型
 */
export type MenuItem = Required<MenuProps>['items'][number];

/**
 * 将路由配置转换为菜单数据
 */
export const getMenuData = (routes: RouteConfig[]): MenuItem[] => {
  return routes
    .filter((route) => !route.hideInMenu)
    .map((route) => {
      const IconComponent = route.icon;
      return {
        key: route.path,
        label: route.name,
        icon: IconComponent ? <IconComponent /> : undefined,
        children: route.routes ? getMenuData(route.routes) : undefined,
      };
    }) as MenuItem[];
};
