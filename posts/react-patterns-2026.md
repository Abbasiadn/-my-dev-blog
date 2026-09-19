
```markdown
<!-- posts/react-patterns-2026.md -->
---
title: "React Patterns I Use Every Day in 2026"
date: "2026-08-01"
description: "The React patterns that have stood the test of time — hooks, composition, and state management that actually works."
category: "React"
tags: ["React", "JavaScript", "Patterns", "Frontend"]
author: "Elena Voss"
coverImage: "/images/posts/react-patterns.jpg"
---

React has evolved significantly, but the core patterns that make applications maintainable remain surprisingly stable.

## Composition Over Configuration

The most powerful React pattern is simple composition. Instead of building components with dozens of props, compose smaller components together.

## Custom Hooks

Custom hooks are the secret weapon of React development. They encapsulate logic and make it reusable.

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}