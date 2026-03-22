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
│   ├── service-matrix.md       # side-by-side service comparison
│   ├── services/               # one file per service: current state + Q2 plan
│   │   ├── cems-api.md
│   │   ├── cems-api-upgrade-plan.md   # full 5-phase reference (25–48 wks)
│   │   ├── dts.md
│   │   └── fms.md
│   └── initiatives/            # cross-cutting initiatives
│       ├── ai-infrastructure.md
│       └── ops-simplification.md
└── <future-project>/
    └── ...
```

## Q2 Planning

Q2 2026 initiative planning lives in `docs/cems-q2/`. When doing any Q2-related work:

- Check `docs/cems-q2/tracker.md` for current initiative status and next actions
- Update `tracker.md` when steps complete, blockers are discovered, or status changes
- Check the relevant `assessments/` file before starting work on a service

When adding a new planning effort, create a new top-level folder under `docs/`. Nest further with subdirectories as needed — the sidebar supports arbitrary depth.

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
