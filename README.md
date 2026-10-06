# 盛大兴泰企业网站

从用户提供的 Figma Make 源码 ZIP 导入，使用 React、TypeScript、React Router、Vite 和 Tailwind CSS。

## 本地运行

Node.js 24：

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

构建输出为 dist/。Cloudflare Pages 默认 SPA 回退支持直接打开业务子页面；不要添加顶层 404.html。

## CI/CD

main 推送及 PR 自动执行 TypeScript 检查、生产构建，并保留产物。仅 main 构建成功且仓库变量 CLOUDFLARE_DEPLOY_ENABLED=true 才部署。

一次性配置：

1. Cloudflare Pages 创建 Direct Upload 项目 shengdaxingtai，生产分支 main。
2. GitHub Actions Secrets 设置 CLOUDFLARE_ACCOUNT_ID、CLOUDFLARE_API_TOKEN。令牌使用目标账户的 Account / Cloudflare Pages / Edit 权限。
3. Pages Custom domains 添加 shengdaxingtai.com，检查既有 DNS 后完成绑定，确认 DNS 和 TLS 证书激活。
4. 在 GitHub 将 CLOUDFLARE_DEPLOY_ENABLED 设为 true，然后手动运行工作流；以后 main 推送自动部署。

PR 不发布。不要把令牌放入源码或聊天。

## 当前上线限制

咨询表单源码原本仅模拟成功，没有发送或保存数据。当前改为诚实提示尚未发送，且保留已输入内容。正式接通需确认接收邮箱和邮件发送服务。

源码中的 Unsplash 图片仍使用原始外链。企业数字、文案和品牌拼写按用户提供源码保留，正式上线前由企业核对。

## 回滚

在 Cloudflare Pages 回滚到之前成功的生产部署，并 revert 对应 Git 提交。

参考：https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/
