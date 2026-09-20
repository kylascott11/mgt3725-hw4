# ARCHITECTURE.md

Decisions, in order. An ADR is never edited after it is accepted; it is superseded.

## The Gate: HW4 rerun

Where should entries live now that they must survive a cleared cache?

| Criterion | Weight | Build (Worker + D1) | Buy (hosted BaaS) | Delegate (AI builder hosts it) |
|---|---|---|---|---|
| Cost to start | *?* | | | |
| Cost to maintain | *?* | | | |
| Time to working | *?* | | | |
| Inspectability | *?* | | | |
| Switching cost | *?* | *scored from Session B experience* | | |
| Fit to spec | *?* | | | |
| **Weighted total** | | | | |

*Keep your HW3 weights unless you can say in one sentence why one changed.*

## ADR-002: Entries move from localStorage to Cloudflare D1

**Status:** *Proposed / Accepted*
**Supersedes:** ADR-001

### Context

*What data leaves the browser, to which vendor, under what terms, and who is accountable. All four, or the decision is not recorded.*

### Decision

*...*

### Alternatives considered

*Buy and Delegate from the Gate above, with the score and one sentence each.*

### Consequences

*At least one thing that got harder: offline use, testing, cost ceiling, a stranger's data in your table.*

### Revisit trigger

*When would this decision be wrong? "When a second user needs their own entries" is ADR-003 waiting to happen.*

---

## ADR-001: Store entries in localStorage
**Title and date:** Delegate editable progress markers to AI assistance - 9-11-2026

**Status:** Superseded by ADR-002

**Door / concrete acquisition and execution choice:** Delegate

**Context:** FEATURES.md requires users to create, edit, update, view, and remove their own progress markers. The feature must persist progress markers and cannot rank users. The budget is zero, and I cannot yet read server code well enough to create or check an entire implementation myself.

**Decision:** Delegate development of the editable progress-tracker feature to AI assistance.

**Consequences and revisit trigger:** 
- **Easier:** Faster development, less technical difficulty with implementation
- **Harder:** Difficulty inspecting the code, especially if the code requires debugging; does not guarantee that all acceptance criteria will be met
- **Revisit:** Module 4, when a database becomes available; if the architecture changes, write ADR-002 and supersede this decision