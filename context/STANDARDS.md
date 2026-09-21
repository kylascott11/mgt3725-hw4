# STANDARDS.md

Coding and documentation rules, for humans. Restated for agents in CLAUDE.md.
Copy in from HW3; the HW4 rows are added for you.

## Rules
1. **Structure:** Separate HTML, CSS, and JavaScript into index.html, styles.css, and app.js. Use lexical scope; do not create accidental global variables.
2. **Forbidden:** Do not use inline styles.*
3. **(HW4)** User values reach SQL through `bind()`, never string concatenation.
4. **(HW4)** No credential in the repository. Not in code, not in config, not in a context file. Database ids are addresses and may appear in `wrangler.toml`.
5. **(HW4)** A failed request is shown to the user on the page and is never thrown in the console.
6. No stray `console.log` in committed code.

## Naming
- Use descriptive camelCase identifiers. Short conventional event/index names are acceptable when their role is obvious; avoid unnecessary abbreviations. Use names that clearly describe what the variable or function represents. Keep naming consistent between HTML IDs and JavaScript selectors.

## Documentation
-  **Comments:** Use comments to explain the reasoning behind code, especially when AI-assisted code is not immediately understandable. Comments should help another person understand the code without explaining every line. If the code needs a comment to say what it does, rename something.
- **Commits:** Keep commit messages under 10 words. Write them in present tense. Make sure to include a verb and a specific noun. For example, "Add goal tracking" or "Fix status formatting."

