# 本机编刊流程

## 每周

1. 确定名义刊期与截止日。通常为周日，论文日期范围为之前周一至周日。补编时另填 compiled，不倒填实际完成时间。
2. 从下面的来源入口人工查阅本期材料。只保留有阅读价值的候选；遇到某站访问问题记在当期编刊记录，不无限重试，不推断没有新文章。
3. `npm run new-issue -- weekly 2026-09-27` 建立草稿。读取已刊目录即可，不开发论文匹配系统。
4. Agent 阅读原始来源，复制完整摘要并直接翻译。参考首期的 Paper 组件用法：标题、作者、来源、日期、来源链接及双语段落都在该期文件内。
5. 对照原文检查遗漏、否定、模态、术语与日期。编者评论写在摘要之外。新文章与旧文回顾分开。
6. 删除无实质内容的栏目。确认截止日及所有来源后改为 `draft: false`。
7. `npm run build`，`npm run verify`；打开本机预览检查新一期正文。完成一次 Git 提交。

## 每月

`npm run new-issue -- monthly 2026-09-30` 建立月刊草稿。回看当月周刊以及额外查阅的来源，按问题组织材料。重复论文仍复制完整元信息与双语摘要，不要求读者回到周刊。专题评论必须说明依据，只有摘要时不能伪装成全文评述。月刊和周刊使用同一渲染模板，kind 决定归档位置。

## 来源入口

这些是查阅书签，不代表已经对每个来源实现自动接入或完成穷尽检查。

| 范围 | 入口 |
| --- | --- |
| 综合及分析哲学 | [Mind](https://academic.oup.com/mind/advance-articles)、[Analysis](https://academic.oup.com/analysis/advance-articles)、[Noûs](https://onlinelibrary.wiley.com/journal/14680068)、[The Philosophical Quarterly](https://academic.oup.com/pq/advance-articles) |
| 综合及专业研究 | [The Philosophical Review](https://read.dukeupress.edu/the-philosophical-review)、[Synthese](https://link.springer.com/journal/11229)、[Ethics](https://www.journals.uchicago.edu/toc/et/current) |
| 欧陆与现象学 | [Continental Philosophy Review](https://link.springer.com/journal/11007)、[Research in Phenomenology](https://brill.com/view/journals/rip/rip-overview.xml)、[Philosophy Today](https://www.pdcnet.org/philtoday) |
| 观念论及批判理论 | [Hegel Bulletin](https://www.cambridge.org/core/journals/hegel-bulletin)、[Constellations](https://onlinelibrary.wiley.com/journal/14678675) |
| 书评 | [Notre Dame Philosophical Reviews](https://ndpr.nd.edu/)、各期刊正式书评栏目 |
| 会议与讨论 | [PhilEvents](https://philevents.org/)、[SPEP](https://www.spep.org/)、[APA](https://www.apaonline.org/)、[Daily Nous](https://dailynous.com/)、[PEA Soup](https://peasoupblog.com/) |

## 术语约定

- reduction 在首期物理哲学语境中首次作“约化”（reduction），后续保留 reduction；sophistication 保留原文。
- sedimentation 首次作“沉积（sedimentation）”。genetic phenomenology / generative phenomenology 分别用“发生现象学 / 生成现象学”并附原文，避免混淆。
- epistemic deference 首次作“认识上的信从（epistemic deference）”；Total Certainty 作为原则名称保留原文。
- 人名首次采用通行中文并注明原文；不凭猜测创造作者的中文名。
- 不把某篇文章的术语选择自动套用到其他哲学传统。

## 修订与触发

修订直接修改该期文件，必要时加 updated 日期和刊末勘误，不悄悄改变作者原文。构建输出是可删除、可重建的静态文件；内容文件和 Git 历史是维护对象。

当前没有启用定时任务。可由用户在本任务中发送“编下一期周刊”触发同一套工作。以后若启用本机 Agent 定时任务，任务提示应要求先阅读 AGENTS.md 和本文件，再执行完整编刊流程；不能只定时运行 build 并称为内容更新。
