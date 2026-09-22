import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'node-html-parser'

const root = fileURLToPath(new URL('../dist/', import.meta.url))
const deploymentBase = '/PhilBoard'
assert(existsSync(join(root, 'index.html')), '请先执行 npm run build')
const files = readdirSync(root, { recursive: true }).filter(f => f.endsWith('.html'))
let papers = 0
for (const name of files) {
  const path = join(root, name)
  const raw = readFileSync(path, 'utf8')
  const doc = parse(raw)
  assert(!raw.includes('views.radishzz.cc/script.js'), `${name}: 包含主题演示站的统计脚本`)
  assert(!raw.includes('retypeset-comment.radishzz.cc'), `${name}: 包含演示站评论连接`)
  for (const paper of doc.querySelectorAll('.paper')) {
    papers++
    const en = paper.querySelector('.abstract-original')
    const zh = paper.querySelector('.abstract-translation')
    assert(en && zh, `${name}: 缺少双语摘要`)
    const paragraphs = block => block.querySelectorAll('p').filter(p => !p.classList.contains('language-label'))
    assert(paragraphs(en).length > 0 && paragraphs(en).length === paragraphs(zh).length, `${name}: 摘要段落不对应`)
    assert(en.textContent.trim().length > 80 && zh.textContent.trim().length > 40, `${name}: 摘要内容不足`)
    assert(paper.querySelector('.paper-meta time[datetime]'), `${name}: 缺少公开日期`)
    assert(paper.querySelector('.paper-original-title a')?.getAttribute('href')?.startsWith('https://'), `${name}: 缺少原文链接`)
  }
  for (const a of doc.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href')
    if (!href || /^(?:https?:|mailto:|data:|tel:)/.test(href))
      continue
    const url = new URL(href, `http://localhost/${name.replace(/index\.html$/, '')}`)
    if (url.origin !== 'http://localhost')
      continue
    let pathname = url.pathname
    if (pathname === deploymentBase)
      pathname = '/'
    else if (pathname.startsWith(`${deploymentBase}/`))
      pathname = pathname.slice(deploymentBase.length)
    let target = resolve(root, `.${decodeURIComponent(pathname)}`)
    if (url.pathname.endsWith('/'))
      target = join(target, 'index.html')
    else if (!existsSync(target))
      target = join(target, 'index.html')
    assert(existsSync(target), `${name}: 内部链接不存在 ${href}`)
    if (url.hash && target.endsWith('.html')) {
      const dest = target === path ? doc : parse(readFileSync(target, 'utf8'))
      const id = decodeURIComponent(url.hash.slice(1))
      assert(dest.querySelectorAll('[id]').some(n => n.id === id), `${name}: 目录锚点不存在 ${href}`)
    }
  }
}
console.log(`检查通过：${files.length} 个页面，${papers} 篇双语摘要；内部链接、段落结构与来源字段完整。语义与原文完整性仍须编者核对。`)
