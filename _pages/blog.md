---
layout: page
title: blog
description: Notes on research, learning, and life.
permalink: /blog/
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
      <li>No posts yet.</li>
    {% endfor %}
  </ul>
</div>
