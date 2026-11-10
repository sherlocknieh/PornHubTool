# PornHubTool 项目索引

## 项目概览

这是一个使用 Vite 构建的浏览器用户脚本，用于增强 PornHub 及其他目标站点的浏览体验。源码为原生 JavaScript ES modules，不使用前端框架。

## 目录与职责

- `src/main.js`：唯一运行入口，按顺序初始化所有 handler。
- `src/core/ElementTracker.js`：基于 `MutationObserver` 的动态 DOM 元素跟踪器；当前实现为单例，避免各 handler 重复监听。
- `src/handlers/video.js`：通用 `<video>` 处理；将视频音量设为 50%、取消静音，并在 Musedam 页面尝试自动播放。
- `src/handlers/pornhub/index.js`：PornHub handler 的聚合入口；负责域名判断，并组合年龄验证、背景播放、favicon、标题、GIF 链接和搜索切换功能。
- `src/handlers/pornhub/`：
  - `backgroundPlayback.js`：阻止页面因切后台而暂停媒体。
  - `favicon.js`：替换 favicon。
  - `videoEnhancements.js`：移除年龄验证、取消 GIF 静音、显示原始标题。
  - `gifLink.js`：为带 `data-gif` 的元素添加 GIF 链接。
  - `searchSwitch.js`：在 Video/GIF 搜索页之间跳转或添加切换按钮；跳转 GIF 搜索页时把搜索词清理为字母、数字和空格。
- `src/handlers/sexcom.js`：为 Sex.com GIF 图片添加 NameThatPorn 搜索按钮。
- `src/handlers/greasyfork.js`：在 GreasyFork 与 SleazyFork 页面之间添加互链。
- `src/handlers/tekjam.js`：在 Tekjam 相册页恢复移动端视图切换控件，并让图片列表使用响应式多列瀑布流（默认 4 列，中等宽度 3 列，窄屏 2 列）；选择 Large photos 时尊重页面的 `data-aview="large"` 状态并恢复单列。
- `vite.config.js`：userscript 元数据、匹配域名和构建产物配置。
- `dist/pornhub-tool.user.js`：构建生成的 userscript 产物；修改源码后通过构建命令更新，不要手工编辑。

## 运行与验证

```bash
npm install
npm run build
```

`npm run dev` 启动 Vite 开发服务，`npm run preview` 预览构建结果。仓库当前没有单元测试脚本；完成修改后至少运行 `npm run build`。

## 开发约定

- 新增站点功能时优先在 `src/handlers/` 下增加或扩展现有 handler，并在 `src/main.js` 注册初始化函数。
- 站点专属 handler 应自行判断当前 URL，不要让不匹配的站点执行 DOM 修改。
- 页面可能动态加载内容；处理动态元素时复用 `ElementTracker` 的 `track(selector, callback)`，并保证回调可重复触发而不会重复插入 UI。
- 保持现有的 ES module 写法和单引号风格，避免引入框架或新的运行时依赖。
- 修改 userscript 匹配域名、版本或元数据时同步检查 `vite.config.js`；不要只修改生成的 `dist/` 文件。
- 提交时更新 `vite.config.js` 中的版本号 (使用当前时间戳，例如 `2026.06.15.1800`), 并完成构建推送到仓库。
