# Git Workflow & Conventional Commits

This rule defines the strict version control workflow that all agents and models must follow when interacting with the `ZerShizGiven` repository.

## 1. Branching Strategy

**Never push or commit directly to the `main` branch.**
Any modifications must be performed on a dedicated branch created from `main`.

### When to Branch
You must create a new branch for:
- Adding a new feature or page.
- Fixing a bug.
- Refactoring existing code or design.
- Updating configurations or dependencies.

### Branch Naming Conventions
Use descriptive, lower-case, kebab-case names prefixed by the branch type:
- `feature/<short-description>`: For new features (e.g., `feature/dark-mode-toggle`)
- `fix/<short-description>`: For bug fixes (e.g., `fix/header-alignment`)
- `chore/<short-description>`: For maintenance, dependencies, or configuration (e.g., `chore/update-packages`)
- `refactor/<short-description>`: For code restructuring without behavior changes (e.g., `refactor/extract-post-component`)
- `docs/<short-description>`: For documentation updates (e.g., `docs/update-readme`)

## 2. Conventional Commits

All commit messages must strictly adhere to the [Conventional Commits v1.0.0 specification](https://www.conventionalcommits.org/en/v1.0.0/).

### Format
```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat:` A new feature.
- `fix:` A bug fix.
- `docs:` Documentation only changes.
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- `refactor:` A code change that neither fixes a bug nor adds a feature.
- `perf:` A code change that improves performance.
- `test:` Adding missing tests or correcting existing tests.
- `build:` Changes that affect the build system or external dependencies.
- `ci:` Changes to CI configuration files and scripts.
- `chore:` Other changes that don't modify src or test files.

### Rules for the Description
- Use the imperative, present tense: "change" not "changed" nor "changes".
- Do not capitalize the first letter.
- No dot (.) at the end.

## 3. Workflow Execution

1. Check out `main` and pull the latest changes.
2. Create your branch following the naming conventions: `git checkout -b feature/example`.
3. Implement the required changes.
4. Stage your files: `git add <files>`.
5. Commit using the conventional commit format: `git commit -m "feat: implement example feature"`.
6. Push your branch to the remote repository: `git push -u origin feature/example`.
7. Advise the user to review the code and open a Pull Request.
