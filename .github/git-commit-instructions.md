# AI-Powered Git Commit Message Generation Instructions

This document provides rules for an AI assistant to generate standardized Git commit messages for the Portfolio project.

## Core Task

Your primary function is to generate a commit message that strictly follows the template below. You will be provided with the current branch name and a diff of the file changes.

## Commit Message Template

```
<type>(<scope>): <subject>

<body>

<footer>
```

---

## Component Rules

### **1. Header: `<type>(<scope>): <subject>`**

- **`<type>`**: Categorize the changes using one of these keywords:
  - `feat`: A new feature for the user.
  - `fix`: A bug fix for the user.
  - `docs`: Documentation changes only (e.g., updating README, comments).
  - `style`: Code style changes that do not affect logic (e.g., formatting).
  - `refactor`: Code changes that neither fix a bug nor add a feature.
  - `test`: Adding or correcting tests.
  - `chore`: Routine tasks or maintenance (e.g., updating dependencies).

- **`<scope>`**: A short, lowercase noun identifying the primary area of the codebase affected.
  - Infer this from the file paths in the diff (e.g., `home`, `navigation`, `api`, `store`).
  - Common scopes for this project:
    - `home`: Changes to home view/components
    - `navigation`: Navigation and routing changes
    - `styling`: CSS/Tailwind styling changes
    - `api`: API integration changes
    - `store`: Pinia store changes
    - `config`: Configuration file changes
    - `setup`: Project setup and build configuration
  - If multiple areas are affected, choose the most significant one.

- **`<subject>`**: A concise, lowercase summary of the changes, written in the present tense.
  - Do not capitalize the first letter.
  - Do not end with a period.
  - Example: `add matrix background video with overlay`

### **2. Body: `<body>`**

- Provide a bulleted list (using `-`) of the specific changes made.
- Summarize the changes from the provided file diffs.
- Keep each line under 100 characters.
- Example:
  ```
  - Add matrix background video to public folder
  - Create video background component with overlay
  - Update App.vue to include background video
  - Add white overlay for dimming effect
  ```

### **3. Footer: `<footer>`**

- The footer has a flexible format for this project:
  - If working on a specific task/issue: `refs #<issue-number>`
  - If time tracking is needed: `#time <time>` (format: `0h30m`)
  - If neither applies, the footer can be omitted or contain relevant metadata

- **Time estimate format**:
  - Format must be `Xh Ym` (e.g., `1h30m`, `0h45m`, `2h00m`)
  - If user does not provide time, you may estimate based on changes or ask

---

## Examples

### Example 1: Feature Addition
```
feat(home): add matrix background video with overlay

- Copy matrix-background.mp4 to public folder
- Add video element with autoplay and loop
- Create semi-transparent white overlay for dimming
- Update z-index layers for proper stacking

#time 1h00m
```

### Example 2: Bug Fix
```
fix(styling): remove default body margin and padding

- Add body margin and padding reset to main.css
- Ensure full-screen background coverage

#time 0h15m
```

### Example 3: Configuration
```
chore(setup): configure tailwind css v4 with postcss

- Install @tailwindcss/postcss package
- Update postcss.config.js to use new plugin
- Add @import directive support for @apply in components

#time 0h30m
```

### Example 4: Documentation
```
docs(readme): translate documentation to english

- Convert all Serbian text to English
- Update setup instructions
- Revise project structure documentation

#time 0h20m
```

---

## AI Instructions

1. **Analyze the Git diff** to understand what files changed and how.
2. **Determine the type** based on the nature of changes.
3. **Extract the scope** from the file paths (prioritize the most significant area).
4. **Write the subject line** as a concise summary in present tense, lowercase.
5. **List changes** in the body with bullet points.
6. **Add footer** with time estimate if provided, or omit if not applicable.
7. **Ensure formatting** matches the template exactly (including empty lines).

---

## Notes

- For breaking changes, add `BREAKING CHANGE:` in the footer with explanation
- Keep the entire commit message focused and concise
- If changes span multiple unrelated areas, consider suggesting separate commits
- Always use lowercase for type, scope, and subject
- Maintain consistency with previous commit messages in the repository
