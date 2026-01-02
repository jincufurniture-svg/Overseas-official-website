# 后台管理系统与后端接口实现计划

我们将集成 Supabase 作为数据库和身份验证服务，使用 Vercel Blob 进行文件存储，并构建后台管理界面。

## 1. 基础设施搭建
- [ ] 安装依赖: `@nuxtjs/supabase`, `@vercel/blob`
- [ ] 配置 `nuxt.config.ts` 集成 Supabase
- [ ] 创建数据库 Schema 文件 (`supabase/schema.sql`)，定义 `products`, `categories`, `contacts` 等表结构

## 2. 后端 API 开发 (`server/api`)
### 公共接口
- [ ] `GET /api/products`: 获取产品列表 (支持分类筛选)
- [ ] `GET /api/products/[id]`: 获取产品详情
- [ ] `POST /api/contact`: 提交联系信息

### 管理端接口 (需鉴权)
- [ ] `POST /api/admin/upload`: 文件上传 (Vercel Blob)
- [ ] `GET/POST/PUT/DELETE /api/admin/categories`: 分类管理
- [ ] `GET/POST/PUT/DELETE /api/admin/products`: 产品管理
- [ ] `GET /api/admin/contacts`: 查看联系信息

## 3. 后台管理前端开发 (`app/pages/admin`)
- [ ] **登录页**: `app/pages/admin/login.vue` (集成 Supabase Auth)
- [ ] **布局**: `app/layouts/admin.vue` (侧边栏导航)
- [ ] **产品管理**: 列表、添加、编辑页面 (支持多语言输入、图片上传)
- [ ] **分类管理**: 简单的分类增删改查
- [ ] **联系人管理**: 查看用户提交的表单数据

## 4. 公共前端重构
- [ ] 更新 `useProducts` Composable: 从 API 获取数据替代硬编码
- [ ] 更新 `ContactSection`: 对接提交接口
- [ ] 确保国际化兼容数据库的多语言数据结构

## 5. 验证与交付
- [ ] 验证后台登录流程
- [ ] 验证数据的增删改查
- [ ] 验证文件上传功能
- [ ] 确保前台页面正常展示数据库数据
