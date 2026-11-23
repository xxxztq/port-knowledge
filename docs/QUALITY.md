# 质量检查与发布

`npm run verify` 检查内容结构、配图、场景模型、五个基础专题、单元测试、完整静态构建及内部链接。构建后自动提取所有教学正文生成 `dist/search-index.json`，包括通过交互切换的隐藏教学面板。公共导航、学习工具与脚本不进入正文索引。

`npx playwright install chromium` 后运行 `npm run test:browser`。测试使用构建产物和预览服务器，覆盖正文搜索、网址与历史记录、收藏/已读、路线进度、旧收藏兼容、箱型、地图入口、手机菜单、存储失败、索引加载失败重试及基础专题练习。GitHub Pages 发布前运行同一组测试，失败时上传报告，不发布失败构建。

`npm run check:sources` 提取构建页面 main 中的外部链接，去重并以最多五个并发检查；不扫描 GitHub 与本网站导航。可使用 `--limit 5` 试跑。HEAD 失败后 GET，404/410 需两次 GET 确认；403、429、超时、网络错误及服务故障归为 `manual-review`。`--strict` 仅在确认 broken 时退出失败。报告位于 `artifacts/source-check.json` 和 `.md`，不进入站点。

外部检查不属于普通 verify，防止网站阻挡自动请求时误报内容错误。可在 Actions 手动运行 “Check external knowledge sources”。可达不等于引用正确、法规有效或专业审阅完成；需人工核查的来源不自动删掉，也不能宣称已通过。

学习记录仅在当前浏览器 localStorage 中保存，无服务器、账号或跨设备同步。旧知识卡 ID 原样沿用；新专题按页面保存，箱型保存到各自锚点。存储不可读或不可写时显示明确失败信息，避免误报保存成功。
