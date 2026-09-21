# CLAUDE.md

## Read first

PROJECT.md, FEATURES.md, ARCHITECTURE.md, STANDARDS.md, TOOLS.md, STYLE.md.
Do not read /curiosity unless asked.

## Rules
- Never build SQL by concatenating strings. Use `prepare(...).bind(...)`.
- Never write a credential, token, or key into any file in this repository.
- Never add a dependency without adding a row to TOOLS.md.
- Handle failed responses on the page. Never throw to the console.
- Use descriptive camelCase names and avoid unnecessary abbreviations.
- Keep naming consistent between HTML IDs and JavaScript selectors. 
- Keep HTML, CSS, and JavaScript separate and use lexical scope. 
- Explain reasoning in comments when code is not immediately understandable. 
- Do not use inline styles. Verify expected behavior before claiming completion. 
- Never invent interview evidence or test results. 
- Leave preview files as previews.

## When unsure

Ask, in a comment or in the chat, rather than guessing. Say what you could
not verify.
