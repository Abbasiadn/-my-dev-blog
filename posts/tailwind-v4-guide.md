<!-- posts/tailwind-v4-guide.md -->
---
title: "Tailwind CSS v4: The Complete Migration Guide"
date: "2026-06-28"
description: "Everything you need to know about migrating to Tailwind CSS v4 — the CSS-first configuration, new features, and breaking changes."
category: "Tailwind CSS"
tags: ["Tailwind", "CSS", "Styling", "Frontend"]
author: "Marcus Chen"
coverImage: "/images/posts/tailwind-v4.jpg"
---

Tailwind CSS v4 represents a fundamental shift in how we configure and use utility-first CSS. The config file is gone, replaced by CSS-first configuration.

## The New @theme Directive

Instead of `tailwind.config.js`, you now define your theme in CSS:

```css
@theme {
  --color-primary: #A8A6D9;
  --font-serif: "Fraunces", serif;
}