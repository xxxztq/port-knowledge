# 看懂港口

面向零基础读者的中文港口知识网站：从船、货、车出发，串起设备、岗位、单证、监管、费用与交接。

## 内容与功能

- 24 个知识域、60 篇知识卡，其中 12 篇设备卡、8 篇岗位卡。
- 26 条场景、127 个业务步骤，含 20 条集装箱场景；每步说明责任人、输入、校验、输出与异常。
- 4 个跨部门协作案例：船舶计划、岸桥故障、闸口差异、完工结算。
- 5 类闸口任务，分别演示进出闸校验、授权、抬杆反馈、实际通过和记录确认。
- 虚构参数经营测算，区分服务收入、变动成本、固定成本与折旧。
- 全文关键词搜索、类型和领域筛选、本地收藏与已读、移动端导航。
- 12 张原创黑白设备结构图、36 个交互观察点、作业位置筛选与两组相似设备对比。
- 48 篇非设备文章配交互关系图，区分流程、并行职责、概念对照与循环；支持键盘操作和无脚本阅读。
- 3 类虚构单证教学样张、逐栏解释；26 条流程的步骤导览；首页地图节点预览。
- 采用用户提供头像的方案 A 品牌标识、移动图标与分享封面，补充阅读进度和返回页首。

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

网站已于 2026-11-21 发布：[在线访问](https://xxxztq.github.io/port-knowledge/) · [源码仓库](https://github.com/xxxztq/port-knowledge)。

在仓库 Settings → Pages 中选择 GitHub Actions；向 main 分支推送后，.github/workflows/deploy.yml 自动安装依赖、执行校验、构建并发布。细节见 [发布指南](docs/GITHUB_PAGES.md)。

## 维护入口

| 文件 | 用途 |
| --- | --- |
| src/data/knowledge.js | 来源登记、24 个知识域、知识卡 |
| src/data/equipment-visuals.js | 设备插图、部位坐标与设备对比 |
| src/data/article-diagrams.js | 48 篇文章的关系图数据 |
| src/data/document-examples.js | 虚构单证样张与字段解释 |
| public/illustrations/equipment/ | 12 张原创 SVG 教学示意 |
| src/data/scenarios.js | 场景、部门协作与闸口任务 |
| src/lib/gate-model.mjs | 纯教学闸口状态模型 |
| src/lib/economics-model.mjs | 纯教学经营测算 |
| src/pages/ | 页面模板与交互 |
| src/styles/global.css、visual.css | 全站布局与图解视觉风格 |
| scripts/check-content.mjs | 内容结构、引用完整性校验 |
| scripts/check-visuals.mjs | 图解覆盖、连线、编号及资源完整性校验 |
| scripts/check-links.mjs | 静态页面链接、锚点、资源路径校验 |
| tests/models.test.mjs | 业务状态与测算边界测试 |

新增知识卡后应补齐范围、来源、检查项、常见误区与相关链接，再运行 npm run verify。具体文件夹组织和校审建议见 [内容维护](docs/CONTENT.md)。

当前没有后端账户或数据服务。收藏和阅读标记只存在浏览器 localStorage，不跨设备同步。
