# GitHub Pages 发布

目标账户：xxxztq
建议仓库：port-knowledge（公开独立仓库）
预期网址：https://xxxztq.github.io/port-knowledge/

该网址是发布目标。只有 GitHub 部署成功且页面实际可访问，才算完成上线。

## 首次发布

1. 使用 GitHub CLI 登录账户 xxxztq：gh auth login --hostname github.com --git-protocol https --web 。在自己的浏览器完成登录与授权，不向他人发送密码或令牌。
2. 在项目目录确认 gh api user --jq .login 输出为 xxxztq，并检查同名仓库是否存在。若已存在先检查内容，不直接覆盖。
3. 若仓库不存在，创建并推送：gh repo create xxxztq/port-knowledge --public --source . --remote origin --push 。
4. 在仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions；或通过已授权的 GitHub API 创建 build_type=workflow 的 Pages 站点。
5. 如果首次推送发生在 Pages 开启前，可在 Actions → Deploy port knowledge to GitHub Pages → Run workflow 重新执行。
6. 等待 build 和 deploy 均成功，打开目标网址，再打开文章详情并刷新，验证子路径资源与页面直达。

仓库的创建、公开可见性和推送需要当前账户相应授权。项目中不存储令牌。

## 后续更新

修改内容 → npm run verify → Git 提交 → 推送 main。Actions 会重新构建 95 个页面（随着内容增加可变化）并发布。

## 更换仓库名或使用主站

当前 astro.config.mjs 的 site 为 https://xxxztq.github.io，base 为 /port-knowledge。若仓库改名，base 也要修改，并同步 scripts/check-links.mjs 的校验前缀。

若使用 xxxztq.github.io 用户主页仓库，base 应改为 /，并复核现有网站内容；请勿直接覆盖已有主页。项目仓库部署更适合与现有其他网站并存。

## 故障定位

- 构建失败：查看 Actions 的 npm run verify 输出。
- 发布提示找不到 Pages：检查 Settings → Pages 的 Source。
- 页面有内容但样式丢失：检查 site/base 与实际仓库路径是否匹配。
- 详情刷新 404：确认完整 dist 被上传，工作流没有误上传 src。
- CLI 登录过期：使用 gh auth status 检查，再完成浏览器授权。

## 官方资料

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.astro.build/en/guides/deploy/github/

部署工作流引用的 action.yml 已于 2026-11-21 在官方 actions 仓库读取核对。Node 24 用于本地与 CI。
