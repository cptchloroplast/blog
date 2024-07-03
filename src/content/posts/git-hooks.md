---
# layout: ../../layouts/PostLayout.astro
type: post
title: Git Hooks
published: 2023-08-07
tags: code,jupyter
---

# `pre-commit`

Clear outputs of Jupyter notebooks.

```bash
#!/bin/bash

# Stash unstaged changes
git stash -q --keep-index

# Clear notebook outputs
jupyter nbconvert --clear-output *.ipynb

# Stage updated files
git add -u

# Re-apply original unstaged changes
git stash pop -q
```