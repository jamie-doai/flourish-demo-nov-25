# Deploying to a New Repository

## Option 1: Clone and Push (Preserves Full Git History)

### Step 1: Create a new repository on GitHub/GitLab
- Create a new empty repository (don't initialize with README)

### Step 2: Clone the current repository
```bash
# Navigate to where you want the new copy
cd /Users/jamiebarter/Documents/repos

# Clone the current repo
git clone git@github.com:DoAI-NZ/flourish-grow-master-24331.git new-repo-name
cd new-repo-name
```

### Step 3: Remove old remote and add new one
```bash
# Remove the old remote
git remote remove origin

# Add your new repository as the remote
git remote add origin git@github.com:YOUR-ORG/new-repo-name.git

# Verify
git remote -v
```

### Step 4: Push all branches to new repository
```bash
# Push main branch
git checkout main
git push -u origin main

# Push other branches (if needed)
git checkout lovable-tidy-up
git push -u origin lovable-tidy-up

# Or push all branches at once
git push origin --all

# Push all tags (if any)
git push origin --tags
```

---

## Option 2: Mirror Repository (Exact Copy with All Branches/Tags)

```bash
# Create a bare clone
cd /Users/jamiebarter/Documents/repos
git clone --bare git@github.com:DoAI-NZ/flourish-grow-master-24331.git new-repo-name.git

# Mirror push to new repository
cd new-repo-name.git
git remote set-url --push origin git@github.com:YOUR-ORG/new-repo-name.git
git push --mirror
```

---

## Option 3: Fresh Start (No Git History)

### Step 1: Create new repository on GitHub/GitLab
- Create a new empty repository

### Step 2: Remove .git and reinitialize
```bash
# Navigate to your current repo
cd /Users/jamiebarter/Documents/repos/flourish-grow-master-24331

# Copy files (excluding .git)
cd ..
cp -r flourish-grow-master-24331 new-repo-name
cd new-repo-name

# Remove old git history
rm -rf .git

# Initialize new git repo
git init
git add .
git commit -m "Initial commit"

# Add new remote
git remote add origin git@github.com:YOUR-ORG/new-repo-name.git
git branch -M main
git push -u origin main
```

---

## Option 4: Using GitHub CLI (If you have `gh` installed)

```bash
# Create new repo and push
gh repo create new-repo-name --private --source=. --remote=new-origin --push
```

---

## Important Considerations

### Before Deploying:
1. **Check for sensitive data:**
   - API keys, secrets, tokens
   - Environment variables
   - Database credentials
   - Personal information

2. **Update configuration files:**
   - `package.json` (name, repository field)
   - Any hardcoded URLs or references
   - CI/CD configuration files

3. **Review .gitignore:**
   - Ensure sensitive files are excluded
   - Verify build artifacts are ignored

### After Deploying:
1. Update any CI/CD pipelines
2. Set up environment variables in new repo
3. Update documentation with new repo URL
4. Configure branch protection rules if needed

---

## Quick Command Reference

```bash
# Check current remotes
git remote -v

# Add new remote (keeping old one)
git remote add new-origin git@github.com:YOUR-ORG/new-repo.git

# Push to new remote
git push new-origin main

# Switch default remote
git remote set-url origin git@github.com:YOUR-ORG/new-repo.git
```
