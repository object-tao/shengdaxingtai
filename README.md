# 盛达兴泰企业网站

域名：shengdaxingtai.com。部署平台：Cloudflare Pages。

当前是 CI/CD 初始化版本，包含筹备中页面，尚未导入 Figma 原型源码。
生产部署默认关闭，不会自动发布筹备中页面。

## 本地开发

使用 Node.js 24：

```sh
npm ci
npm run check
npm run build
```

当前构建将 public/ 复制到 dist/。导入 Figma Make 源码后，按源码框架更新 package.json、锁文件和检查命令，保持构建输出为 dist/。

## CI/CD

main 推送和 pull request 执行检查、构建，保存构建产物。只有 main 检查通过且仓库变量 CLOUDFLARE_DEPLOY_ENABLED=true 时，才部署 Cloudflare Pages。

一次性配置：

1. 创建 Cloudflare Pages Direct Upload 项目 shengdaxingtai，生产分支 main。
2. GitHub Actions Secrets 添加 CLOUDFLARE_ACCOUNT_ID 和 CLOUDFLARE_API_TOKEN；令牌只需目标账户的 Account / Cloudflare Pages / Edit 权限。
3. 在 Pages 项目的 Custom domains 中添加 shengdaxingtai.com，再确认 DNS 和证书已激活。已有 DNS 记录应先检查。
4. 原型源码导入并验收后，将仓库变量 CLOUDFLARE_DEPLOY_ENABLED 设为 true，通过 Actions 手动触发工作流。

不要把令牌写入源码或发送到聊天。后续 main 更新检查通过后自动部署；PR 只检查，不发布。

回滚：优先在 Cloudflare Pages 控制台将生产版本回滚到之前成功的部署，然后 revert 对应 Git 提交，保证下一次部署仍为正确版本。

参考：https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/
