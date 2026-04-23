# 概述
**Vue AI Mind** — 名为“AI心理健康助手”——是一款功能完备的 **Vue 3 单页应用**，提供 AI 驱动的心理咨询、情绪追踪和知识管理功能。该应用通过**双布局架构**服务两类不同的受众：在公共前端寻求心理健康支持的普通用户，以及通过专用后台仪表盘管理平台的管理员。
项目名称在 package.json 中注册为 `vue-ai-mind`，其 HTML 入口文件在 index.html 中将应用标题声明为“AI心理健康助手”。该应用的核心在于，通过 **Server-Sent Events (SSE)** 集成实时 AI 流式聊天，使用自定义 **Markdown 渲染器**呈现 AI 响应，并通过 **ECharts** 仪表盘可视化情绪分析数据——所有这些都构建在现代 Vue 3 + Vite 工具链之上，并使用 Element Plus 作为 UI 框架。
## 应用功能概述
该平台针对心理健康领域的三个核心用户需求，每个需求均映射到应用内的专属模块：

1. **AI 心理咨询** — 用户与名为“小暖”的 AI 助手进行实时对话。聊天界面支持创建会话、多轮对话以及以 Markdown 格式渲染的流式 AI 响应。每次会话还会生成一份**情绪分析报告**，包含主要情绪识别、强度评分、风险等级评估以及个性化的改善建议。这是应用的核心所在，在 `Consultation.vue` 视图中实现，仅该文件就超过 1000 行代码。
 
2. **情绪日记** — 用户可以通过结构化表单记录每日的情绪状态，捕获情绪评分（1-10 分制）、主导情绪（支持表情符号选择）、情绪触发因素、日记内容、睡眠质量和压力水平。系统支持八种不同的情绪类别：开心、平静、焦虑、悲伤、兴奋、疲惫、惊讶和困惑。

3. **知识库** — 一个支持分页浏览的文章库，可按发布日期或阅读量排序，并设有推荐阅读区。每篇文章均可通过专属路由 (/knowledge/article/:id) 查看详情。管理员对知识文章拥有完整的 CRUD 权限，包括富文本编辑和封面上传。
## 顶层架构
应用遵循**双布局模式**，由三个独立的布局组件控制不同用户角色的视觉外壳。每个布局包裹其自身的子路由集，路由器中的全局路由守卫通过检查存储在 localStorage 中的 userType 来强制执行基于角色的访问控制。
**布局组件**是纯粹的外壳，将内容渲染委托给 `<router-view>`。BackendLayout.vue 使用 Element Plus 容器包裹了一个侧边栏-导航栏-主体三区域结构。FrontendLayout.vue 提供了顶部导航栏、内容区和页脚。AuthLayout.vue 展示了分屏设计，左侧为品牌面板，右侧为表单区域。
## 技术栈
项目依赖了一套精简但功能强大的技术栈，每一项都是为了满足特定的架构需求而选型：
| **类别**   | **技术**                      | **版本**    | **用途**                                   |
| ---------- | ----------------------------- | ---------- | ------------------------------------------ |
| 框架       | Vue 3                         | ^3.5.31    | 核心响应式 UI 框架 (Composition API)       |
| 构建工具   | Vite                          | ^8.0.3     | 开发服务器与生产环境打包工具               |
| UI 组件库  | Element Plus                  | ^2.13.7    | 组件库 (表格、表单、对话框、菜单)          |
| 路由       | Vue Router                    | ^5.0.4     | 带有路由守卫的客户端 SPA 路由              |
| 状态管理   | Pinia                         | ^3.0.4     | 轻量级状态管理 (侧边栏折叠状态)            |
| HTTP 客户端| Axios                         | ^1.15.0    | REST API 通信与拦截器                      |
| 流式传输   | @microsoft/fetch-event-source | ^2.0.1     | 用于 AI 聊天响应的 SSE 流式传输            |
| 图表       | ECharts                       | ^6.0.0     | 后台仪表盘的数据可视化                     |
| 富文本     | WangEditor                    | ^5.1.23    | 知识文章的所见即所得编辑器                 |
| 样式       | Sass                          | 1.97.2     | 组件作用域样式                             |
| 代码规范   | ESLint + OxLint + Prettier    | 最新三件套 | 代码质量约束                               |
## 基于角色的访问模型
应用使用与认证令牌一起存储在 localStorage 中的 userType 值，实现了一个简单但有效的角色系统。router/index.js 中的路由守卫强制执行以下规则：
| userType               | 角色       | 允许访问的路由                | 行为                                       |
| ---------------------- | ---------- | ----------------------------- | ------------------------------------------ |
| undefined（无令牌）    | 访客       | `/auth/*`、`/`（仅前端）      | 将 `/back/*` 重定向至 `/auth/login`        |
| 1                      | 普通用户   | `/`（仅前端）                 | 将 `/back/*` 和 `/auth/*` 重定向至首页      |
| 2                      | 管理员     | `/back/*`（仅后台）           | 将所有前端路由重定向至 `/back/dashboard`    |

这意味着管理员被`限制在后台`，而普通用户永远无法访问管理面板——一种完全在路由器层面强制执行的清晰隔离，无需复杂的权限配置。
## 项目结构概览
以下是包含所有应用逻辑的 `src/` 文件夹的可视化目录结构：
```
src/
├── main.js                          ├── App.vue                          # 根组件 — 仅包含 <router-view>
├── assets/
│   ├── images/                      # 图标、Logo、情绪表情符号
│   └── style.css                    # 全局 CSS 重置与基础样式
├── api/
│   ├── frontend.js                  # 公共用户 API (认证、聊天、日记、知识库)
│   └── admin.js                     # 管理员 API (登录、CRUD、数据分析、登出)
├── components/                      # 共享可复用组件
│   ├── MarkdownRenderer.vue         # 自定义 Markdown→HTML 渲染器 (防 XSS)
│   ├── RichTextEditor.vue           # 知识文章的 WangEditor 封装
│   ├── TableSearch.vue              # 通用带搜索功能的分页表格
│   ├── ArticleDialog.vue            # 文章创建/编辑对话框
│   └── PageHead.vue                 # 页面头部组件
├── config/
│   └── index.js                     # 文件基础 URL 配置
├── router/
│   └── index.js                     # 路由、布局与基于角色的守卫
├── stores/
│   └── admin.js                     # Pinia 状态管理 (侧边栏折叠状态)
├── utils/
│   └── request.js                   # 带令牌与错误拦截器的 Axios 实例
└── views/
    ├── layout/
    │   ├── BackendLayout.vue        # 管理后台外壳 (侧边栏 + 导航栏 + 内容区)
    │   ├── FrontendLayout.vue       # 公共前端外壳 (导航 + 内容区 + 页脚)
    │   ├── AuthLayout.vue           # 认证外壳 (品牌展示 + 表单)
    │   └── components/
    │       ├── Sidebar.vue          # 管理后台导航侧边栏
    │       └── Navbar.vue           # 管理后台顶部栏 (含用户下拉菜单)
    ├── home/Home.vue                # 带有行动号召按钮的落地页
    ├── login/LoginPage.vue          # 管理员登录表单
    ├── register/RegisterPage.vue    # 用户注册表单
    ├── frontendConsultation/
    │   └── Consultation.vue         # AI 聊天界面 (SSE 流式传输，1060 行)
    ├── frontendEmotionalDiary/
    │   └── EmotionalDairy.vue       # 用户情绪日记表单
    ├── frontendKnowledge/
    │   ├── Knowledge.vue            # 公共文章列表与推荐
    │   └── ArticleDetail.vue        # 文章阅读视图
    ├── dashboard/Dashboard.vue      # 管理员数据分析 (ECharts，605 行)
    ├── knowledge/Knowledge.vue      # 管理员文章管理 (CRUD)
    ├── consultations/
    │   └── Consultations.vue        # 管理员咨询记录查看器
    └── emotional/Emotional.vue      # 管理员情绪日记管理
```
### 核心特性总结
该应用提供了几个区别于典型 CRUD 仪表盘的显著特性：

**SSE 流式聊天** — 咨询界面并未等待完整的 API 响应，而是使用 `@microsoft/fetch-event-source` 库逐令牌流式传输 AI 响应。消息实时追加，营造出自然的打字效果。系统会处理诸如 `done` 之类的特殊事件以完成响应，并触发对话后的情绪分析。

**情绪花园** — 一个独特的侧边栏小部件，在每次 AI 对话后可视化用户当前的情绪状态。它展示主要情绪、强度评分 (0-100)、风险等级分类 (正常/关注/预警/危机)、个性化建议以及“治愈行动”——所有数据均从后端分析端点动态加载。

**ECharts 分析仪表盘** — 管理后台集成了三种不同的图表类型：情绪趋势折线图、咨询量分析和用户活动可视化。这些图表在组件挂载时初始化，并从单一的 getAnalysisOverview API 调用中获取数据，让管理员一眼就能全面掌握平台的健康状况。

**自定义 Markdown 渲染** — 项目并未引入笨重的第三方库，而是实现了一个轻量级的 MarkdownRenderer 组件，可处理代码块、行内代码、加粗、斜体、标题、链接和列表——并通过 HTML 实体转义提供 XSS 防护。这在支持丰富 AI 对话格式的同时保持了打包体积的精简。
