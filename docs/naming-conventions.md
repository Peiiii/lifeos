# 文件命名规范

## 基本原则

1. 所有文件名使用 kebab-case（短横线）命名法
2. 文件名应该清晰表达其内容或功能
3. 保持命名的一致性
4. 避免使用特殊字符和空格

## 命名规则

### 1. 组件文件
```
✅ 正确示例：
- button.tsx
- thought-capture.tsx
- mobile-header.tsx
- unified-notification-layer.tsx

❌ 错误示例：
- Button.tsx
- thoughtCapture.tsx
- mobileHeader.tsx
- UnifiedNotificationLayer.tsx
```

### 2. 工具函数文件
```
✅ 正确示例：
- date-utils.ts
- string-helpers.ts
- api-client.ts

❌ 错误示例：
- dateUtils.ts
- stringHelpers.ts
- apiClient.ts
```

### 3. 样式文件
```
✅ 正确示例：
- button.css
- thought-capture.css
- mobile-header.css

❌ 错误示例：
- Button.css
- thoughtCapture.css
- mobileHeader.css
```

### 4. 测试文件
```
✅ 正确示例：
- button.test.tsx
- thought-capture.test.tsx
- mobile-header.test.tsx

❌ 错误示例：
- Button.test.tsx
- thoughtCapture.test.tsx
- mobileHeader.test.tsx
```

### 5. 类型定义文件
```
✅ 正确示例：
- button.types.ts
- thought-capture.types.ts
- mobile-header.types.ts

❌ 错误示例：
- Button.types.ts
- thoughtCapture.types.ts
- mobileHeader.types.ts
```

## 目录命名

### 1. 功能模块目录
```
✅ 正确示例：
- thought-capture/
- mobile-header/
- unified-notification/

❌ 错误示例：
- ThoughtCapture/
- mobileHeader/
- UnifiedNotification/
```

### 2. 组件目录
```
✅ 正确示例：
- components/
- shared-components/
- ui-components/

❌ 错误示例：
- Components/
- sharedComponents/
- uiComponents/
```

## 特殊规则

### 1. 页面组件
```
✅ 正确示例：
- home-page.tsx
- settings-page.tsx
- profile-page.tsx

❌ 错误示例：
- HomePage.tsx
- settingsPage.tsx
- ProfilePage.tsx
```

### 2. 布局组件
```
✅ 正确示例：
- main-layout.tsx
- sidebar-layout.tsx
- mobile-layout.tsx

❌ 错误示例：
- MainLayout.tsx
- sidebarLayout.tsx
- MobileLayout.tsx
```

### 3. 上下文组件
```
✅ 正确示例：
- auth-context.tsx
- theme-context.tsx
- user-context.tsx

❌ 错误示例：
- AuthContext.tsx
- themeContext.tsx
- UserContext.tsx
```

## 导入规范

### 1. 组件导入
```typescript
// ✅ 正确示例
import { Button } from '@/shared/components/button'
import { ThoughtCapture } from '@/features/thought/thought-capture'

// ❌ 错误示例
import { Button } from '@/shared/components/Button'
import { ThoughtCapture } from '@/features/thought/ThoughtCapture'
```

### 2. 工具函数导入
```typescript
// ✅ 正确示例
import { formatDate } from '@/shared/utils/date-utils'
import { validateEmail } from '@/shared/utils/validation-utils'

// ❌ 错误示例
import { formatDate } from '@/shared/utils/dateUtils'
import { validateEmail } from '@/shared/utils/validationUtils'
```

## 注意事项

1. 保持命名的一致性
2. 避免使用缩写（除非是广泛接受的缩写）
3. 文件名应该反映其内容或功能
4. 避免使用数字作为文件名开头
5. 避免使用特殊字符
6. 保持文件名的简洁性
7. 使用有意义的名称
8. 避免使用过长的文件名 