# React + Ant Design + TypeScript + Vite

这是一个使用现代技术栈构建的 React 项目模板，集成了以下技术：

- ⚛️ **React 19.2.0** - 用于构建用户界面的 JavaScript 库
- 🎨 **Ant Design 6.0.0** - 企业级 UI 设计语言和 React UI 库
- 📘 **TypeScript 5.9.3** - JavaScript 的超集，提供类型安全
- ⚡ **Vite 7.2.4** - 下一代前端构建工具，提供极速的开发体验

## 功能特性

- 🚀 快速的热模块替换 (HMR)
- 📦 基于 Vite 的极速构建
- 🎯 TypeScript 支持，提供完整的类型检查
- 🎨 Ant Design 组件库，开箱即用
- 🔧 ESLint 代码检查配置
- 📱 响应式设计支持

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 项目结构

```
antd-init/
├── public/          # 静态资源文件
├── src/
│   ├── assets/      # 资源文件（图片、字体等）
│   ├── App.tsx      # 主应用组件
│   ├── App.css      # 应用样式
│   ├── main.tsx     # 应用入口文件
│   └── index.css    # 全局样式
├── index.html       # HTML 模板
├── package.json     # 项目配置和依赖
├── tsconfig.json    # TypeScript 配置
└── vite.config.ts   # Vite 配置
```

## 使用 Ant Design

项目已经配置好 Ant Design，你可以直接在组件中导入使用：

```tsx
import { Button, Card, Layout } from 'antd';

function MyComponent() {
  return (
    <Card>
      <Button type="primary">点击我</Button>
    </Card>
  );
}
```

更多 Ant Design 组件和用法，请参考 [Ant Design 官方文档](https://ant.design/)

## 技术栈版本

- React: ^19.2.0
- Ant Design: ^6.0.0
- TypeScript: ~5.9.3
- Vite: ^7.2.4

## 开发建议

1. **组件开发**: 在 `src` 目录下创建你的组件
2. **样式管理**: 可以使用 Ant Design 的主题定制功能，或添加自定义 CSS
3. **类型定义**: 充分利用 TypeScript 的类型系统，为组件和函数添加类型注解
4. **代码规范**: 项目已配置 ESLint，建议在提交代码前运行 `npm run lint`

## 相关链接

- [React 文档](https://react.dev/)
- [Ant Design 文档](https://ant.design/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://vite.dev/)

## License

MIT
