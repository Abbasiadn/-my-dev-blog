<!-- posts/design-systems-scale.md -->
---
title: "Building a Design System That Scales"
date: "2026-08-15"
description: "Lessons learned from scaling a component library across multiple products and teams — without losing the soul of your design."
category: "Design Systems"
tags: ["Design Systems", "Components", "Architecture", "UI"]
author: "Marcus Chen"
coverImage: "/images/posts/design-system.jpg"
---

A design system is more than a component library. It's a shared language that helps teams ship consistent, accessible products faster.

## Start with Tokens, Not Components

Design tokens are the atomic units of your system — colors, spacing, typography. Start here before building components.

```css
:root {
  --color-primary: #A8A6D9;
  --spacing-md: 1rem;
  --radius-card: 10px;
}