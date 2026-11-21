# 看懂港口

面向零基础读者的中文港口知识网站：从船、货、车出发，串起设备、岗位、单证、监管、费用与交接。

## 内容与功能

- 24 个知识域、60 篇知识卡，其中 12 篇设备卡、8 篇岗位卡。
- 26 条场景、127 个业务步骤，含 20 条集装箱场景；每步说明责任人、输入、校验、输出与异常。
- 4 个跨部门协作案例：船舶计划、岸桥故障、闸口差异、完工结算。
- 5 类闸口任务，分别演示进出闸校验、授权、抬杆反馈、实际通过和记录确认。
- 虚构参数经营测算，区分服务收入、变动成本、固定成本与折旧。
- 全文关键词搜索、类型和领域筛选、本地收藏与已读、移动端导航。

首版为教学内容和知识框架，不代表所有港口操作细则均已覆盖或已获机构专业审定。正文标注适用范围和来源。模拟器不连接真实海关、电子口岸或设备。

## 本地运行

使用 Node.js 24。

```sh
npm ci
npm run dev
```

默认首页路径为 /port-knowledge/。发布构建与校验：

```sh
npm run verify
npm run preview
```

构建产物位于 dist/，由 HTTP 静态服务器或 GitHub Pages 提供。不要通过双击 HTML 的 file:// 方式测试脚本及路由。

## GitHub Pages

配置目标为仓库 xxxztq/port-knowledge，预期网址 https://xxxztq.github.io/port-knowledge/ 。仓库创建、首次推送和 Pages 开启后才能访问；源代码中的目标地址不表示已经发布。

在仓库 Settings → Pages 中选择 GitHub Actions；向 main 分支推送后，.github/workflows/deploy.yml 自动安装依赖、执行校验、构建并发布。细节见 [发布指南](docs/GITHUB_PAGES.md)。

## 维护入口

| 文件 | 用途 |
| --- | --- |
| src/data/knowledge.js | 来源登记、24 个知识域、知识卡 |
| src/data/scenarios.js | 场景、部门协作与闸口任务 |
| src/lib/gate-model.mjs | 纯教学闸口状态模型 |
| src/lib/economics-model.mjs | 纯教学经营测算 |
| src/pages/ | 页面模板与交互 |
| src/styles/global.css | 全站与移动布局 |
| scripts/check-content.mjs | 内容结构、引用完整性校验 |
| scripts/check-links.mjs | 静态页面链接、锚点、资源路径校验 |
| tests/models.test.mjs | 业务状态与测算边界测试 |

新增知识卡后应补齐范围、来源、检查项、常见误区与相关链接，再运行 npm run verify。具体文件夹组织和校审建议见 [内容维护](docs/CONTENT.md)。

当前没有后端账户或数据服务。收藏和阅读标记只存在浏览器 localStorage，不跨设备同步。
