# Ant Design Pro

基于 React + Ant Design + TypeScript + Vite 构建的企业级中后台前端解决方案。

## 技术栈

- ⚛️ **React 19.2.0** - 用于构建用户界面的 JavaScript 库
- 🎨 **Ant Design 6.0.0** - 企业级 UI 设计语言和 React UI 库
- 📘 **TypeScript 5.9.3** - JavaScript 的超集，提供类型安全
- ⚡ **Vite 7.2.4** - 下一代前端构建工具，提供极速的开发体验
- 🛣️ **React Router 7.9.6** - 声明式路由管理

## 功能特性

- 🚀 快速的热模块替换 (HMR)
- 📦 基于 Vite 的极速构建
- 🎯 TypeScript 支持，提供完整的类型检查
- 🎨 Ant Design 组件库，开箱即用
- 🛣️ 配置式路由系统，自动生成菜单
- 🎭 完整的布局系统，支持侧边栏折叠
- 🔐 权限控制基础架构
- 🔧 ESLint 代码检查配置
- 📱 响应式设计支持
- 🛠️ 请求工具封装
- 🎪 工具函数集合

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 pnpm >= 7.0.0

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

项目将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
# 或
pnpm build
```

### 预览生产构建

```bash
npm run preview
# 或
pnpm preview
```

### 代码检查

```bash
npm run lint
# 或
pnpm lint
```

## 项目结构

```
antd-init/
├── public/              # 静态资源文件
├── src/
│   ├── access.ts       # 权限定义
│   ├── App.tsx         # 应用入口组件
│   ├── main.tsx        # 应用启动文件
│   ├── assets/         # 资源文件（图片、字体等）
│   ├── components/     # 公共组件
│   ├── config/         # 配置文件
│   │   ├── app.tsx     # 应用配置（运行时配置）
│   │   ├── defaultSettings.ts  # 默认设置
│   │   └── routes.tsx  # 路由配置
│   ├── constants/      # 常量定义
│   ├── layouts/        # 布局组件
│   │   └── BasicLayout.tsx  # 基础布局
│   ├── pages/          # 页面组件
│   │   ├── Welcome/    # 欢迎页
│   │   └── Dashboard/  # 仪表盘
│   ├── routes/         # 路由转换
│   │   └── index.tsx   # 路由转换逻辑
│   ├── services/       # API 服务
│   │   └── api.ts      # API 接口定义
│   └── utils/          # 工具函数
│       ├── index.ts    # 通用工具函数
│       └── request.ts  # 请求封装
├── index.html          # HTML 模板
├── package.json        # 项目配置和依赖
├── tsconfig.json       # TypeScript 配置
├── vite.config.ts      # Vite 配置
└── README.md           # 项目说明文档
```

## 配置说明

### 路由配置

路由配置位于 `src/config/routes.tsx`，采用配置驱动的方式：

```tsx
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
];
```

路由配置会自动转换为 React Router 路由，并生成菜单项。

**路由配置字段说明：**

- `path`: 路由路径
- `name`: 路由名称，也是菜单显示名称
- `icon`: 图标组件（Ant Design Icons）
- `component`: 组件路径（相对于 `src/pages`）
- `hideInMenu`: 是否在菜单中隐藏
- `access`: 权限标识
- `routes`: 嵌套路由

### 应用配置

应用配置位于 `src/config/app.tsx`，包含运行时配置：

```tsx
export const request = {
  timeout: 10000,
  // 请求配置
};

export const layout = () => {
  return {
    logo: '...',
    menu: {
      locale: false,
    },
    // 布局配置
  };
};
```

### 默认设置

默认设置位于 `src/config/defaultSettings.ts`：

```tsx
const Settings = {
  navTheme: 'realDark',      // 导航主题
  primaryColor: '#1890ff',   // 主题色
  layout: 'side',            // 布局方式
  contentWidth: 'Fluid',     // 内容宽度
  fixedHeader: false,         // 固定头部
  fixSiderbar: true,         // 固定侧边栏
  title: 'Ant Design Pro',   // 标题
  // ...
};
```

### 权限控制

权限定义位于 `src/access.ts`：

```tsx
export default function access() {
  return {
    canAdmin: true,  // 管理员权限
    canUser: true,   // 用户权限
  };
}
```

在路由配置中使用 `access` 字段来指定权限要求。

## 开发指南

### 添加新页面

1. 在 `src/pages` 目录下创建页面组件
2. 在 `src/config/routes.tsx` 中添加路由配置
3. 在 `src/routes/index.tsx` 的 `componentMap` 中添加组件映射

示例：

```tsx
// 1. 创建页面 src/pages/User/index.tsx
const User = () => {
  return <div>用户管理</div>;
};
export default User;

// 2. 添加路由配置
{
  path: '/user',
  name: '用户管理',
  icon: UserOutlined,
  component: './User',
}

// 3. 添加组件映射
const componentMap = {
  // ...
  './User': lazy(() => import('../pages/User')),
};
```

### 使用 API 服务

在 `src/services/api.ts` 中定义 API 接口：

```tsx
import { get, post } from '../utils/request';

export const getUserInfo = () => {
  return get<UserInfo>('/api/user/info');
};
```

在组件中使用：

```tsx
import { getUserInfo } from '@/services/api';

const MyComponent = () => {
  useEffect(() => {
    getUserInfo().then(data => {
      console.log(data);
    });
  }, []);
};
```

### 使用工具函数

项目提供了常用的工具函数：

```tsx
import { formatDate, debounce, throttle, deepClone } from '@/utils';

// 格式化日期
const date = formatDate(new Date(), 'YYYY-MM-DD');

// 防抖
const debouncedFn = debounce(() => {
  console.log('防抖执行');
}, 300);

// 节流
const throttledFn = throttle(() => {
  console.log('节流执行');
}, 300);

// 深拷贝
const cloned = deepClone(original);
```

### 路径别名

项目配置了路径别名 `@`，指向 `src` 目录：

```tsx
import { getUserInfo } from '@/services/api';
import { formatDate } from '@/utils';
import BasicLayout from '@/layouts/BasicLayout';
```

## 布局系统

项目使用 `BasicLayout` 作为基础布局，包含：

- **侧边栏**：可折叠的导航菜单
- **顶部栏**：用户信息和操作
- **内容区**：页面内容展示

布局配置通过 `src/config/defaultSettings.ts` 进行配置。

## 代码规范

项目已配置 ESLint，建议在提交代码前运行：

```bash
npm run lint
```

## 技术栈版本

- React: ^19.2.0
- Ant Design: ^6.0.0
- TypeScript: ~5.9.3
- Vite: ^7.2.4
- React Router: ^7.9.6

## 相关链接

- [React 文档](https://react.dev/)
- [Ant Design 文档](https://ant.design/)
- [Ant Design Pro 文档](https://pro.ant.design/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://vite.dev/)
- [React Router 文档](https://reactrouter.com/)

## 常见问题

### 如何修改主题色？

修改 `src/config/defaultSettings.ts` 中的 `primaryColor` 字段。

### 如何添加新的菜单项？

在 `src/config/routes.tsx` 中添加路由配置即可，菜单会自动生成。

### 如何自定义布局？

修改 `src/layouts/BasicLayout.tsx` 组件。

### 如何配置 API 基础路径？

修改 `src/utils/request.ts` 中的请求逻辑，添加 baseURL。

## License

MIT
