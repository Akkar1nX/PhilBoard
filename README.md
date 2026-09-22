# PhilBoard

供个人阅读的哲学周刊与月刊，基于 Astro 6.1.5 和 Retypeset。查阅、选编、翻译及维护均由本机 Agent 完成；没有论文数据库、全文下载器或独立模型服务。

## 本机运行

要求 Node.js >= 22.12.0。依赖已安装时：

```powershell
cd D:\Code\PhilBoard\astro-theme-retypeset
npm run dev
```

打开 http://127.0.0.1:4321/ 。开发预览运行于本机；关闭终端后停止。

首次安装或恢复依赖时使用主题锁定的包管理器，不使用环境中的其他 pnpm 主版本：

```powershell
npx --yes pnpm@10.33.0 install --frozen-lockfile
```

正式构建与检查：

```powershell
npm run build
npm run verify
npm run preview -- --host 127.0.0.1 --port 4321
```

## 内容位置

- `src/content/issues/weekly-2026-09-20.mdx`：第 001 期周刊；名义刊期 9 月 20 日，实际编成 9 月 22 日。
- `src/content/issues/monthly-2026-09-30.mdx`：首期月刊草稿模板，尚未刊出。
- `src/components/Paper.astro`：完整双语摘要的展示组件。
- `src/content/colophon/about.md`：面向读者的编刊说明。
- `docs/EDITORIAL.md`：来源书签、术语和每期编刊步骤。
- `docs/2026-09-20-editorial-notes.md`：首期来源核对与主题试用记录。

每期是一个 MDX 文件。`kind: weekly` 或 `kind: monthly` 决定归档位置，`draft: true` 不进入首页、归档或正式构建。旧的主题示例保留供参考，但不属于刊物集合，不会生成示例页面。

```powershell
npm run new-issue -- weekly 2026-09-27
npm run new-issue -- monthly 2026-10-31
```

命令只建立草稿，Agent 查阅原始网页并直接翻译后才发布。`build` 不会上网抓取材料或调用模型。当前未启用定时任务，未来的本机 Agent 调度应调用完整编刊流程。

## Git 与恢复

仓库位于本目录，保留主题原始历史。`upstream` 只用于参考主题上游；本地修改在 `philboard` 分支，不向上游推送。尚未配置用户自己的远程仓库。

日常使用 `git status` / `git diff` 查看修改，每期检查完成后提交。备份本目录（包含隐藏的 `.git`），可排除 `node_modules`、`dist` 和 `.astro`；恢复后按锁文件安装依赖并重新构建。

## 外观与授权

沿用 Retypeset 的正文栏、侧栏、目录、明暗模式和响应式布局。英文优先使用本机 Athelas，中文使用思源宋体。没有将本机字体复制进仓库。

原主题代码遵循仓库保留的 MIT LICENSE。论文摘要版权与许可属于各自作者，见每篇署名与来源链接；中文译文是本刊编译，非原作者审定文本。原主题说明保存在 `docs/RETYPESET.md`。
