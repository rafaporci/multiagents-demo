# CLAUDE.md

## Multi-agent build workflow

This project builds features using a three-role agent team. The roles are defined as reusable subagents in [.claude/agents/](.claude/agents/): `senior-product-designer`, `senior-frontend-engineer`, `qa-engineer`. See [AGENT_TEAMS.md](AGENT_TEAMS.md) for how Claude Code's agent-teams feature works in general.

### Handoff sequence

1. **Designer → Frontend Engineer.** The designer produces a written design spec (e.g. `DESIGN_SPEC.md`) first — copy, colors, type, spacing, layout, responsive behavior, and component states for every required section, with nothing left for engineering to invent. The frontend engineer does not start until this file exists and is complete.
2. **Frontend Engineer → QA.** The frontend engineer implements the spec faithfully, writes `README.md` and `IMPLEMENTATION_NOTES.md` (documenting any judgment calls the spec left open), and independently verifies install/dev/build/tests are clean itself before handing off — QA's time shouldn't be spent finding problems the engineer could have caught.
3. **QA → Frontend Engineer (bug loop).** QA tests the running app against the design spec — not personal taste — and logs every bug by severity (critical/high/medium/low) with precise repro steps and expected-vs-actual. Critical/high bugs go back to the frontend engineer for fixes. QA re-verifies each fix itself (never on faith) and checks for regressions in what was previously passing. Repeat until no critical/high bugs remain open. Medium/low bugs are logged but never block a ship verdict.
4. **QA finalizes.** Once clean, QA updates `TEST_REPORT.md` in place with the final test matrix, bug log, accessibility/responsiveness audit summaries, and an unambiguous ship / no-ship verdict. The verdict must be "not ready" if any critical/high bug is still open.
5. **Orchestrator assembles.** The lead session — not a subagent — assembles the final deliverable set (app code, `README.md`, `TEST_REPORT.md`, plus `DESIGN_SPEC.md` as supporting reference) and independently re-runs build/test commands at each handoff rather than trusting an agent's self-reported "done."

### Rules

- Phases are a hard sequential dependency — the next role's work assumes the previous deliverable exists and is complete. Don't parallelize across phases; parallelizing *within* a phase (e.g. several independent design explorations, or several teammates each owning a disjoint set of files during implementation) is fine.
- The orchestrator relays bug reports between QA and the frontend engineer (rather than having them message each other unsupervised) so severity triage and independent re-verification happen in one place. Direct teammate-to-teammate messaging is also a valid pattern per `AGENT_TEAMS.md` if speed matters more than that extra checkpoint — pick deliberately, don't default to it silently.
- Never mark a bug fixed, a build green, or a spec complete based on an agent's self-report alone when you can cheaply re-run the command yourself.
