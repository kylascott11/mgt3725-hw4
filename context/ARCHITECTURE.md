# ARCHITECTURE.md

## The Gate: HW4 rerun
*Where should entries live now that they must survive a cleared cache?*

| Criterion | Weight | Build (Worker + D1) | Buy (hosted BaaS) | Delegate (AI builder hosts it) |
|---|---|---|---|---|
| Cost to start | *3* | *5*| *4*| *5*|
| Cost to maintain | *5*| *3*| *4*|*3* |
| Time to working | *3* | *1*| *5*| *3*|
| Inspectability | *5* |*5* |*3* | *2*|
| Switching cost | *3* | *5* | *3*| *1*|
| Fit to spec | *5* | *5*| *5*| *4*|
| **Weighted total** | | *98*| *96*| *72*|

## ADR-002: Entries move from localStorage to Cloudflare D1

**Status:** *Proposed*
**Supersedes:** *ADR-001*

### Context
*ADR-001 delegated development of the progress-marker feature to AI assistance and initially stored entries in localStorage. Because localStorage data can be lost when the browser cache is cleared, HW4 requires a new decision about where entries should be stored. This data, including the name and description of the goal/expectations saved and their respective percentage complete and status, must leave the browser and be stored remotely. This data will be sent from the application to a Cloudflare Worker to be stored in Cloudflare D1. Cloudflare will provide the Worker and D1 infrastructure, while I am accountable for building the application's data model, how data is sent and retrieved, and how the feature is tested.*

### Decision

*Store entries in Cloudflare D1 by sending data through a Cloudflare Worker.*

### Alternatives considered

Buy (Score: 96): *Use a hosted Baas to store progress markers, which would reduce development time and maintenance but provide less inspectability and increase switching costs.*

Delegate (Score: 72): *Use an AI builder like bolt.new to generate and host the backend, reducing manual development but making it more difficult to maintain, inspect, and switch.*

### Consequences

*Building the backend will make offline use more limited because the application will now be dependent on an internet connection to save and retrieve progress markers, unlike localStorage. Because the backend is remotely accessible, data from other users could be stored in the same database, making user separation an issue.*

### Revisit trigger

*Revisit this decision if the architecture changes and Cloudflare Worker + D1 can no longer meet the required performance, data storage, or functionality needs.* 

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