# Git Workflow Guide for Feature Development

This guide outlines the standard workflow for creating feature branches, staying up-to-date with `main`, and submitting clean pull requests (PRs) with minimal merge conflicts.

---

## 🔧 Branching Strategy

- **Main branch:** `main` is our default and protected branch. All production-ready code should live here.
- **Feature branches:** Create a new branch off `main` for each new feature, bug fix, or task.

### **Naming Convention:**

Use `feature/your-feature-name` or `bugfix/short-description`, for example:

- `feature/login-form`
- `bugfix/navbar-render`

---

## 🚀 Creating a New Feature Branch

```bash
git checkout main
git pull origin main         # Make sure your local main is up to date
git checkout -b feature/your-feature-name
```

Make your changes and commit them locally.

---

## 🔄 Keeping Your Branch Updated with Main

If someone else merges into `main` while you’re still working, you must bring the latest `main` changes into your feature branch **before** submitting a PR.

### **Step-by-step:**

```bash
# 1. Switch to main and get the latest changes
git checkout main
git pull origin main

# 2. Switch back to your branch
git checkout feature/your-feature-name

# 3. Merge main into your branch
git merge main
```

### **If there are merge conflicts:**

- Git will show conflicted files.
- Open them, look for `<<<<<<<`, `=======`, `>>>>>>>`, and resolve the conflicts.
- After resolving:

```bash
git add .
git commit     # Finalize the merge
```

### **Push your updated branch:**

```bash
git push origin feature/your-feature-name
```

---

## 🧪 Test and Submit PR

Before submitting or updating a PR:

- Test your changes locally.  
- Confirm your feature works alongside recent changes from `main`.
- Keep PRs small and focused (preferably <10-15 files changed).

Once ready:

- Open a PR to merge your feature branch into `main`.

---

## ✅ Summary

|Task|Command Sequence|
|---|---|
|Create feature branch|`git checkout -b feature/xyz` from `main`|
|Update local main|`git checkout main` → `git pull origin main`|
|Merge main into your branch|`git checkout feature/xyz` → `git merge main`|
|Resolve conflicts|Manually edit, then `git add .` → `git commit`|
|Push updated branch|`git push origin feature/xyz`|
|Submit PR|Open PR from `feature/xyz` → `main` on GitHub|

---

Keep things clean. Communicate. Review before merging.

Happy coding! 🚀
