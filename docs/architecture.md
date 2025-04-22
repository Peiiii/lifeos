# 项目架构设计

## 目录结构

```
src/
  ├── shared/           # 最底层，不依赖其他模块
  │   ├── components/   # 通用UI组件
  │   ├── hooks/        # 通用hooks
  │   ├── utils/        # 工具函数
  │   └── styles/       # 全局样式
  │
  ├── core/            # 依赖 shared
  │   ├── layout/      # 布局相关
  │   ├── navigation/  # 导航相关
  │   └── auth/        # 认证相关
  │
  ├── features/        # 依赖 shared 和 core
  │   ├── thought/     # 想法记录功能
  │   ├── calendar/    # 日历功能
  │   └── habits/      # 习惯功能
  │
  └── app/            # 依赖 features, core, shared
      ├── App.tsx     # 应用入口
      ├── routes.tsx  # 路由配置
      └── providers/  # 全局Provider
```

## 依赖关系

```
app → features, core, shared
features → core, shared
core → shared
shared → 无依赖
```

## 模块职责

### 1. shared 模块
- 最底层模块，不依赖其他模块
- 包含通用组件、hooks、工具函数等
- 提供基础UI组件和工具函数

### 2. core 模块
- 依赖 shared 模块
- 提供核心功能（布局、导航、认证等）
- 不依赖 features 模块
- 实现应用的基础架构

### 3. features 模块
- 依赖 shared 和 core 模块
- 实现具体业务功能
- 不依赖其他 features 模块
- 每个功能模块独立

### 4. app 模块
- 依赖 features, core, shared 模块
- 组装应用
- 配置路由
- 提供全局Provider

## 实现细节

### 1. 路径别名配置
```json
{
  "compilerOptions": {
    "paths": {
      "@shared/*": ["src/shared/*"],
      "@core/*": ["src/core/*"],
      "@features/*": ["src/features/*"],
      "@app/*": ["src/app/*"]
    }
  }
}
```

### 2. ESLint 规则
```json
{
  "rules": {
    "import/no-restricted-paths": [
      "error",
      {
        "zones": [
          {
            "target": "src/shared",
            "from": "src/core"
          },
          {
            "target": "src/shared",
            "from": "src/features"
          },
          {
            "target": "src/core",
            "from": "src/features"
          },
          {
            "target": "src/shared",
            "from": "src/app"
          },
          {
            "target": "src/core",
            "from": "src/app"
          },
          {
            "target": "src/features",
            "from": "src/app"
          }
        ]
      }
    ]
  }
}
```

## 代码示例

### 1. shared 模块
```typescript
// src/shared/components/Button.tsx
export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>
}

// src/shared/hooks/useMobile.ts
export function useMobile() {
  // 实现
}
```

### 2. core 模块
```typescript
// src/core/layout/components/Sidebar.tsx
import { Button } from '@/shared/components/Button'
import { useMobile } from '@/shared/hooks/useMobile'

export function Sidebar() {
  const isMobile = useMobile()
  return (
    <nav>
      <Button>Menu</Button>
    </nav>
  )
}
```

### 3. features 模块
```typescript
// src/features/thought/components/ThoughtCapture.tsx
import { Button } from '@/shared/components/Button'
import { useMobile } from '@/shared/hooks/useMobile'
import { Sidebar } from '@/core/layout/components/Sidebar'

export function ThoughtCapture() {
  const isMobile = useMobile()
  return (
    <div>
      <Sidebar />
      <Button>Capture</Button>
    </div>
  )
}
```

### 4. app 模块
```typescript
// src/app/App.tsx
import { ThoughtFeature } from '@/features/thought'
import { Sidebar } from '@/core/layout/components/Sidebar'
import { Button } from '@/shared/components/Button'

function App() {
  return (
    <div>
      <Sidebar />
      <ThoughtFeature />
    </div>
  )
}

// src/app/providers/AppProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AmbientProvider } from '@/core/context/AmbientProvider'

export function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AmbientProvider>
        {children}
      </AmbientProvider>
    </QueryClientProvider>
  )
}
```

## 迁移步骤

1. 创建基础目录结构
2. 迁移共享资源
3. 迁移核心功能
4. 迁移业务功能
5. 更新入口文件
6. 更新导入路径
7. 配置路径别名
8. 配置ESLint规则

## 注意事项

1. 保持组件独立性
2. 避免循环依赖
3. 使用清晰的接口
4. 保持代码可测试性
5. 保持向后兼容
6. 逐步废弃旧代码 