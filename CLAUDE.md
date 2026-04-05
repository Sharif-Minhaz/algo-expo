# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a minimal problem-solving scratch space with two entry-point files:

- [main.py](main.py) — Python scratch file
- [main.js](main.js) — JavaScript scratch file

There is no build system, test framework, package manager, or project configuration. Files are run directly.

## Running Files

```bash
python main.py
node main.js
```

## Custom Commands

### `update dsa`

When the user says "update dsa", perform the following:

1. **Scan** the `DSA/` folder for all files.
2. **Check** each file against the tracked list in memory (`dsa_tracked_files.md`). Skip files already processed.
3. **For each new/unprocessed file:**
   - Read the file name (it's a self-explanatory DSA topic name).
   - Read the code to understand the algorithm.
   - **Append** detailed code comments BELOW the existing code (never modify the code itself — not even a comma). The comments must include:
     - DSA name
     - Basic description
     - Full code explanation
     - Step-by-step dry run covering most cases with detailed comments
     - When to use
     - Real-life applications
     - Time & space complexity
4. **Update** the tracked files list in memory (`dsa_tracked_files.md`) so future runs skip already-processed files.
