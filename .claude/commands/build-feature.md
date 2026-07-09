---
description: Run the full designer → frontend engineer → QA multi-agent build workflow defined in CLAUDE.md
argument-hint: <feature description>
---

Run the full multi-agent build workflow defined in CLAUDE.md for: $ARGUMENTS

Follow these phases **in strict sequence**. Do not skip, reorder, or parallelize across phases (parallelizing *within* a phase is fine — e.g. multiple independent design explorations, or several teammates each owning a disjoint set of files during implementation).

## Phase 1 — Design

Invoke the `senior-product-designer` subagent (Agent tool) with the feature description above. Do not proceed to Phase 2 until:

- A design spec file (e.g. `DESIGN_SPEC.md`) exists on disk — confirm with Read yourself, don't take the agent's self-report on faith.
- It covers copy, colors, type, spacing, layout, responsive behavior, and every component state for every required section, with nothing left as "TBD" or "engineer's choice" (unless the spec explicitly and intentionally reserves a decision for engineering).

## Phase 2 — Implementation

Invoke the `senior-frontend-engineer` subagent with the completed spec's file path. Do not proceed to Phase 3 until:

- `README.md` and `IMPLEMENTATION_NOTES.md` exist (the latter documenting any judgment calls the spec left open).
- You have independently run install/dev/build/test commands yourself and confirmed they are clean — do not trust the engineer's self-report of "done."

## Phase 3 — QA bug loop

Invoke the `qa-engineer` subagent to test the running app against the design spec — not personal taste. Then:

- Act as the go-between: relay every critical/high bug back to the frontend engineer yourself rather than letting QA and the engineer message each other unsupervised, unless you've deliberately decided speed matters more than that checkpoint.
- After each fix, re-invoke QA to independently re-verify the fix and check for regressions in what previously passed — never mark a bug fixed on the engineer's say-so alone.
- Repeat until zero open critical/high bugs remain. Medium/low bugs are logged but never block a ship verdict.

## Phase 4 — QA finalizes

Have QA update `TEST_REPORT.md` in place with the final test matrix, bug log, accessibility/responsiveness audit summaries, and an unambiguous ship/no-ship verdict. The verdict must be "not ready" if any critical/high bug is still open.

## Phase 5 — Assemble and independently verify

As the orchestrator (not a subagent), assemble the final deliverable set: app code, `README.md`, `TEST_REPORT.md`, plus `DESIGN_SPEC.md` as supporting reference. Independently re-run build/test commands yourself at this handoff — do not rely on any agent's self-reported "done."

## Phase 6 — Ship

Only if QA's verdict is "ready to ship" **and** your own independent build/test run just passed:

- Create a new branch off `main` (never commit or push directly to `main`).
- Commit using [Conventional Commits](https://www.conventionalcommits.org/) format (`feat:`, `fix:`, `docs:`, `test:`, `chore:`, etc.) — scope each commit to what actually changed; a bug-fix pass from the QA loop is its own `fix:` commit, not folded into the original `feat:` commit.
- Push the branch.
- Open a PR with `gh pr create` summarizing what was built, pointing to `DESIGN_SPEC.md` and `TEST_REPORT.md` for full detail.

Never open the PR before this phase — i.e. never before QA has signed off with zero open critical/high bugs and you have independently confirmed build/tests pass.


## Rules

- Phases are a hard sequential dependency — the next role's work assumes the previous deliverable exists and is complete. Don't parallelize across phases; parallelizing *within* a phase (e.g. several independent design explorations, or several teammates each owning a disjoint set of files during implementation) is fine.
- The orchestrator relays bug reports between QA and the frontend engineer (rather than having them message each other unsupervised) so severity triage and independent re-verification happen in one place. Direct teammate-to-teammate messaging is also a valid pattern per `AGENT_TEAMS.md` if speed matters more than that extra checkpoint — pick deliberately, don't default to it silently.
- Never mark a bug fixed, a build green, or a spec complete based on an agent's self-report alone when you can cheaply re-run the command yourself.
- Never open the PR/MR before step 6 — i.e. never before QA has signed off with zero open critical/high bugs and the orchestrator has independently confirmed it.
