# claude_markdown_server

A local web server for reviewing planning documents. Running at `http://192.168.50.196:8181`.

## Dropping Files

All markdown files go in the `docs/` directory relative to this project:

```
/home/work/projects/claude_markdown_server/docs/
```

Files appear in the sidebar immediately — no server restart needed. The sidebar is nestable: subdirectories become collapsible sections.

## Organizing with Subdirectories

This server is used for multiple planning efforts. Each project gets its own top-level subfolder under `docs/`. The sidebar renders them as collapsible sections.

```
docs/
├── cems-q2/                    # CEMS Q2 2026 quarterly planning
│   ├── q2-2026-overview.md     # strategy, priorities, success criteria
│   ├── tracker.md              # ← live status; update when work completes or blockers emerge
│   ├── roadmap.md              # multi-quarter cems-api upgrade roadmap
│   ├── service-matrix.md       # side-by-side service comparison
│   ├── services/               # one file per service: current state + Q2 plan
│   │   ├── cems-api.md
│   │   ├── cems-api-upgrade-plan.md   # full 5-phase reference (25–48 wks)
│   │   ├── c3.md               # C3 Shopify sync service + SQS integration
│   │   ├── c3-worker-plan.md   # plan: persistent worker service (not yet implemented)
│   │   ├── dts.md
│   │   └── fms.md
│   └── initiatives/            # cross-cutting initiatives
│       ├── ai-infrastructure.md
│       └── ops-simplification.md
├── cems-q3/                    # CEMS Q3 2026 — cems-api Phase 1 focus
│   ├── q3-2026-overview.md
│   └── tracker.md
└── <future-project>/
    └── ...
```

## Quarterly Planning

Planning is organized by quarter under `docs/`. Each quarter has its own folder.

**Q2 2026** (`docs/cems-q2/`) — Current quarter. Priorities: DTS upgrade, cems-api Phase 0, FMS bump, C3 SQS integration.
**Q3 2026** (`docs/cems-q3/`) — cems-api Phase 1 (Symfony 3.4 + PHP 8.0).

When doing any quarter-related work:

- Check the relevant quarter's `tracker.md` for current initiative status and next actions
- Update `tracker.md` when steps complete, blockers are discovered, or status changes
- Check the relevant `services/` file before starting work on a service

When adding a new planning effort, create a new top-level folder under `docs/`. Nest further with subdirectories as needed — the sidebar supports arbitrary depth.

## Source of Truth Rules

These rules prevent docs from going stale and contradicting each other:

| What | Lives in | Everyone else does |
|------|----------|--------------------|
| Initiative status, checklists, next actions | `tracker.md` | Link to tracker — do not repeat |
| Service tech stack, architecture, gotchas | `services/<name>.md` | Link — do not repeat |
| Side-by-side version/EOL comparison | `service-matrix.md` | Link — do not repeat |
| Multi-quarter roadmap | `roadmap.md` | Link — do not repeat |
| Initiative rationale and approach | `initiatives/<name>.md` | Tracker links to it |

**After any work session on CEMS services:** update `tracker.md` to reflect what changed. That's the only doc that needs touching for status updates — other docs stay correct because they link rather than copy.

## File Naming

- Use lowercase, hyphen-separated names: `user-auth-flow.md`, `data-model.md`
- The sidebar strips the `.md` extension and uses the filename as the label
- Directory names become section headers in the sidebar (also hyphen-separated is fine)

## Managing the Server

```bash
cd /home/work/projects/claude_markdown_server

# Start
docker-compose up -d

# Stop
docker-compose down

# Logs
docker-compose logs -f
```

> **Note:** This machine currently uses `docker-compose` (v1). Docker Compose v2 (`docker compose`) is available and migration is planned as part of ops standardization — but hasn't happened yet, so use v1 syntax for now.
