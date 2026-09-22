import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const [kind, date] = process.argv.slice(2)
if (!['weekly', 'monthly'].includes(kind) || !/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) {
  console.error('用法：npm run new-issue -- weekly 2026-09-27（或 monthly 2026-09-30）')
  process.exit(1)
}
const dir = fileURLToPath(new URL('../src/content/issues/', import.meta.url))
mkdirSync(dir, { recursive: true })
const path = join(dir, `${kind}-${date}.mdx`)
if (existsSync(path)) {
  console.error(`刊物文件已存在，未覆盖：${path}`)
  process.exit(1)
}
const previous = readdirSync(dir).filter(f => /\.mdx?$/.test(f)).map(f => readFileSync(join(dir, f), 'utf8')).filter(s => new RegExp(`^kind: ${kind}$`, 'm').test(s))
const number = Math.max(0, ...previous.map(s => Number(s.match(/^number: (\d+)/m)?.[1] || 0))) + 1
const end = new Date(`${date}T00:00:00Z`)
const start = new Date(end)
start.setUTCDate(start.getUTCDate() - 6)
const period = kind === 'weekly' ? `${start.toISOString().slice(0, 10)} — ${date}` : `${date.slice(0, 4)} 年 ${Number(date.slice(5, 7))} 月`
const compiled = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
const title = kind === 'weekly' ? '待编周刊' : '待编月刊'
writeFileSync(path, `---\ntitle: '${title}'\nkind: ${kind}\nnumber: ${number}\npublished: ${date}\ncompiled: ${compiled}\nperiod: '${period}'\ndescription: '待完成内容与来源核对。'\nabbrlink: ${kind}-${date}\ntags: []\ndraft: true\ntoc: true\nlang: zh\n---\n\nimport Paper from '@/components/Paper.astro'\n\n{/* 刊出前：填写导语、正文与来源，完成原摘要和译文核对，再改 draft: false。 */}\n\n## ${kind === 'weekly' ? '本周论文' : '本月论文与讨论'}\n\n## ${kind === 'weekly' ? '学术资讯' : '专著、书评与学术资讯'}\n\n## 本期说明\n`, { flag: 'wx' })
console.log(`已建立草稿：${path}\n草稿不会出现在刊物列表或正式构建中。`)
