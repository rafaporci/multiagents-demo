# Agent Teams — Reference

Source: https://code.claude.com/docs/en/agent-teams (as of Claude Code v2.1.199)

> Agent teams are **experimental** and disabled by default.

## What it is

Agent teams let you coordinate multiple Claude Code instances working together:

- One session acts as the **team lead** — coordinates work, assigns tasks, synthesizes results.
- **Teammates** work independently, each in its own context window, and communicate directly with each other (not just back to the lead).
- Different from [subagents](https://code.claude.com/docs/en/sub-agents): subagents only report back to the main agent; teammates share a task list and message each other directly.

| | Subagents | Agent teams |
|---|---|---|
| Context | Own context window; results return to caller | Own context window; fully independent |
| Communication | Report to main agent only | Message each other directly |
| Coordination | Main agent manages all work | Shared task list, self-coordination |
| Best for | Focused tasks, only result matters | Complex work needing discussion/collaboration |
| Token cost | Lower | Higher (each teammate = separate Claude instance) |

## Enabling

Set the env var (already configured in this project's `.claude/settings.local.json`):

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Without this, no team is set up, no team directories are written, and Claude never spawns or proposes teammates.

## When to use

Best for parallel exploration:
- **Research and review** — multiple angles investigated simultaneously, findings cross-checked
- **New modules/features** — independent ownership per teammate
- **Debugging with competing hypotheses** — parallel theories converge faster
- **Cross-layer coordination** — frontend/backend/tests owned by different teammates

Avoid for: sequential tasks, same-file edits, heavily-dependent work chains — coordination overhead outweighs benefit; use a single session or subagents instead.

## Starting a team

Just describe the task and desired teammates in natural language:

```text
I'm designing a CLI tool that helps developers track TODO comments across
their codebase. Spawn three teammates to explore this from different angles:
one on UX, one on technical architecture, one playing devil's advocate.
```

Claude populates a shared task list, spawns teammates, and synthesizes findings.

**Agent panel** (below prompt input, lead's terminal):
- ↑/↓ — select a teammate
- Enter — open transcript / message directly
- Esc — interrupt selected teammate's current turn

Idle teammate rows stay visible while any agent is still working; once everyone is idle, rows hide after 30s (teammate keeps running, addressable by name). More than 3 idle teammates collapse into one `N idle agents` row — select + Enter to expand.

## Controlling the team

### Display modes (`teammateMode` setting)

- **`in-process`** (default) — all teammates run in the main terminal; select via agent panel. Works anywhere.
- **`auto`** — split panes if already in tmux or iTerm2 (with `it2` CLI), else in-process.
- **`tmux`** — split-pane mode, auto-detects tmux vs iTerm2.
- **`iterm2`** — explicit iTerm2 native split panes (requires [`it2` CLI](https://github.com/mkusaka/it2)).

Set globally in `~/.claude/settings.json`:
```json
{ "teammateMode": "auto" }
```
Or per-session:
```bash
claude --teammate-mode auto
```

Split-pane mode requires tmux or iTerm2 + `it2` CLI; not supported in VS Code integrated terminal, Windows Terminal, or Ghostty.

### Specifying teammates and models

```text
Spawn 4 teammates to refactor these modules in parallel. Use Sonnet for
each teammate.
```

Teammates do **not** inherit the lead's `/model` by default — set **Default teammate model** in `/config` (or pick "Default (leader's model)"). Teammates do inherit the lead's **effort level**.

### Plan approval gating

```text
Spawn an architect teammate to refactor the authentication module.
Require plan approval before they make any changes.
```

Teammate plans in read-only plan mode → sends approval request to lead → lead approves/rejects (with feedback) → teammate revises or proceeds. Give the lead explicit approval criteria in your prompt for predictable judgment.

### Talking to teammates directly

- In-process: ↑/↓ to select, Enter to view/message, `x` to stop, Ctrl+T toggles task list.
- Split-pane: click into the pane.
- `/model` and `/fast` while viewing a teammate apply to the **lead**, not the teammate (teammate's model/fast-mode fixed at spawn). `/effort` does apply to the viewed teammate.

### Tasks

Shared task list: pending / in progress / completed, with dependency blocking. Lead can assign explicitly, or teammates self-claim next unblocked task. File locking prevents race conditions on claiming.

### Shutting down a teammate

```text
Ask the researcher teammate to shut down
```
Lead sends a shutdown request; teammate can approve (exits gracefully) or reject with explanation. Team directories clean up automatically at session end.

### Quality gates via hooks

- `TeammateIdle` — runs before a teammate goes idle; exit code 2 sends feedback and keeps it working.
- `TaskCreated` — runs on task creation; exit code 2 blocks creation + feedback.
- `TaskCompleted` — runs on task completion; exit code 2 blocks completion + feedback.

## Architecture

| Component | Role |
|---|---|
| Team lead | Main session; spawns teammates, coordinates |
| Teammates | Separate Claude Code instances working assigned tasks |
| Task list | Shared work items teammates claim/complete |
| Mailbox | Inter-agent messaging |

Storage (local, session-derived name `session-<first 8 chars of session ID>`):
- Team config: `~/.claude/teams/{team-name}/config.json` — removed when session ends; don't hand-edit (overwritten on state updates).
- Task list: `~/.claude/tasks/{team-name}/` — persists locally (never uploaded), so resumed sessions keep tasks. Retention follows `cleanupPeriodDays`.

Team config's `members` array lists each teammate's name/agent ID/agent type — teammates can read this to discover each other. No project-level team config exists; a hand-authored `.claude/teams/teams.json` is just an ordinary file, not recognized config.

### Using subagent definitions as teammate roles

Reference an existing subagent type (project/user/plugin/CLI-defined) when spawning:

```text
Spawn a teammate using the security-reviewer agent type to audit the auth module.
```

Teammate honors the subagent's `tools` allowlist and `model`; the subagent body is *appended* to the teammate's system prompt (not a replacement). `SendMessage` and task-management tools are always available regardless of `tools` restriction. Note: subagent `skills` and `mcpServers` frontmatter fields are **not** applied to teammates — teammates load skills/MCP servers from project/user settings like a normal session.

### Permissions

- Teammates start with the lead's permission settings (including `--dangerously-skip-permissions` if the lead has it).
- Per-teammate mode can be changed after spawn, but not set at spawn time.
- A teammate cannot approve permission prompts or relay consent on your behalf; a denied action can't be laundered through another teammate. In auto mode, a relayed "approval" from another agent is treated as untrusted input.
- Teammate permission prompts bubble up to the **lead** session — approve there.

### Context and communication

- Each teammate: own context window, loads CLAUDE.md/MCP servers/skills fresh, receives the spawn prompt — does **not** inherit lead's conversation history.
- Message delivery is automatic (no polling needed).
- Idle notifications: teammate notifies lead automatically on finishing/stopping (including on API-error-terminated turns, which are reported as failures with error text).
- Send to one teammate by name; to reach everyone, send one message per recipient.
- Names are assigned by the lead at spawn — tell the lead what to call teammates if you want to reference them later.

### Token usage

Scales roughly linearly with number of active teammates — each is a full separate context window. Worth it for research/review/new-feature work; not for routine tasks.

## Use case examples

**Parallel code review:**
```text
Spawn three teammates to review PR #142:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
```

**Competing hypotheses debugging:**
```text
Users report the app exits after one message instead of staying connected.
Spawn 5 agent teammates to investigate different hypotheses. Have them talk to
each other to try to disprove each other's theories, like a scientific
debate. Update the findings doc with whatever consensus emerges.
```
Adversarial framing counters anchoring bias — the surviving theory after cross-examination is more likely correct than a single sequential investigation's first plausible answer.

## Best practices

1. **Give teammates full context in the spawn prompt** — they don't get the lead's history. Include specifics (file paths, constraints, what "done" looks like).
2. **Team size**: start with 3–5 teammates. Token cost scales linearly, coordination overhead grows, and returns diminish past a point. Aim for ~5–6 tasks per teammate.
3. **Task size**: not so small that coordination overhead dominates, not so large that a teammate goes too long without checking in. Self-contained deliverable (a function, a test file, a review) is the sweet spot.
4. **Tell the lead to wait** for teammates instead of doing the work itself if it starts implementing directly:
   ```text
   Wait for your teammates to complete their tasks before proceeding
   ```
5. **Start with research/review tasks** (no code writing) if new to agent teams — lower coordination risk, same parallel-exploration payoff.
6. **Avoid file conflicts** — assign each teammate a disjoint set of files.
7. **Monitor and steer** — don't let a team run unattended too long; check progress, redirect, synthesize as findings arrive.

## Troubleshooting

- **Teammates not appearing**: check agent panel (↑/↓ + Enter); idle rows hide after 30s but teammate is still running — message by name to bring it back; confirm the task was actually complex enough for Claude to spawn a team; for split panes confirm `tmux`/`it2` installed (`which tmux`).
- **Too many permission prompts**: pre-approve common operations in permission settings before spawning — teammate prompts bubble up to the lead.
- **Teammates stopping on errors**: open the teammate's transcript, give it further instructions, or spawn a replacement. (v2.1.198+: a message wakes an in-process teammate that's waiting to retry a failed API call.)
- **Lead shuts down early**: tell it to keep going / wait for teammates.
- **Orphaned tmux sessions**: `tmux ls` then `tmux kill-session -t <session-name>`.

## Limitations (experimental status)

- **No session resumption for in-process teammates** — `/resume`/`/rewind` don't restore them; lead may try messaging teammates that no longer exist (tell it to respawn).
- **Task status can lag** — teammates sometimes fail to mark tasks complete, blocking dependents; check manually or nudge via lead.
- **Shutdown can be slow** — teammates finish current tool call/request first.
- **One team per session**, scoped to that session — no multiple named teams, no sharing across sessions.
- **No nested teams** — teammates cannot spawn their own teammates; only the lead manages the team.
- **No background subagents from in-process teammates** — a teammate's subagent work can't outlive the lead's process; requesting `run_in_background` or `background: true` from a teammate errors.
- **Lead is fixed** for the session's lifetime — no promoting a teammate or transferring leadership.
- **Permissions fixed at spawn** — per-teammate mode changeable after, not at spawn time.
- **Split panes need tmux or iTerm2** — not supported in VS Code integrated terminal, Windows Terminal, or Ghostty; in-process mode works everywhere.

`CLAUDE.md` works normally — teammates read it from their working directory, so use it for project-wide guidance to the whole team.

## Related

- [Subagents](https://code.claude.com/docs/en/sub-agents) — lightweight delegation within one session, no inter-agent coordination needed.
- [Git worktrees](https://code.claude.com/docs/en/worktrees) — manual parallel sessions without automated coordination.
- [Feature comparison](https://code.claude.com/docs/en/features-overview#compare-similar-features) — subagents vs agent teams side-by-side.
