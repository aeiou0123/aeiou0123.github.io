# Writing a blog post

Create a Markdown file in `_posts/` named `YYYY-MM-DD-title.md`. For example:

```markdown
---
layout: post
title: "文章标题"
date: 2026-11-02
lang: zh
description: "一句简短介绍"
---

正文写在这里。
```

Use `lang: en` for English. Both blog indexes show all published posts; the language switch on an individual post goes to the other language's blog index. Posts are published when committed to the deployment branch. Use `published: false` to keep a draft out of the site, or write in `_drafts/`. The default post URL is `/blog/:year/:title/`; avoid renaming a published file unless its URL is preserved with a `permalink` in its front matter.
