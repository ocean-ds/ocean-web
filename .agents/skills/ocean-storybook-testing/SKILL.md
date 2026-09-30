---
name: ocean-storybook-runtime-testing
description: Run Ocean Web Storybook locally and verify CSS interaction states with real pointer/keyboard input and rendered pixels.
---

# Local Storybook

## Devin Secrets Needed
None for local component stories. No backend or authenticated session is required.

## Setup
- From the monorepo root, use the existing Yarn workspace dependencies. If absent, install with `yarn install --frozen-lockfile --ignore-scripts`.
- Compile core styling with `yarn -s build` in `packages/ocean-core`. Storybook imports `packages/ocean-core/dist/ocean.css`; SCSS changes require rebuilding unless the CSS watcher is running.
- Root `yarn -s watch:storybook --ci` starts Storybook on port 6006 without rebuilding every library. The configured relative static-assets argument may resolve twice under `.storybook`; use an absolute static-assets directory when correcting launch configuration.
- Query the local public `/index.json` for exact story IDs. Preview URLs use `/iframe.html?id=<encoded-story-id>&viewMode=story`.
- If DISPLAY is set but no X server is running, start the installed Xvfb on that display before starting the browser. Match screen and browser dimensions; verify the recording includes the entire application.

## Interaction and evidence
- Use real mouse hover, held mouse down, and keyboard Tab. Never force CSS pseudostates as substitutes for UI interactions.
- Wait for finite CSS transitions to finish before measuring background colors. Ignore infinite skeleton animations when awaiting animation completion.
- `mix-blend-mode` computed style is not rendered-color proof: sample blank pixels in actual screenshots as well.
- Loading rows may have `pointer-events:none`; an actionability-checked locator hover may time out. Move the real pointer to the element's bounding-box center, without changing its styles, then compare screenshot pixels.
- A computed focus outline can be fully clipped by ancestor `overflow:hidden`. Verify the outline visually; identical hover and keyboard-focus screenshots reveal missing differentiation.
- Preserve full-resolution screenshots and state metadata. Create labeled two-column crops only as supplementary presentation, retaining original images for measurements.
