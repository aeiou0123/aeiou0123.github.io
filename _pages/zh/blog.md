---
layout: page
title: 博客
description: 关于研究、学习与生活的记录。
permalink: /zh/blog/
lang: zh
---

<div class="post">
  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <h3><a class="post-title" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
        {% if post.description %}<p>{{ post.description | escape }}</p>{% endif %}
        <p class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
      </li>
    {% else %}
      <li>暂无文章。</li>
    {% endfor %}
  </ul>
</div>
