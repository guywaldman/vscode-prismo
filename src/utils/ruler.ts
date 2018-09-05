import { workspace, window, WorkspaceConfiguration } from "vscode";
import { getConfig, Level, Config, levelKeyFromIndex, LevelConfig } from "../utils/config";

const DEFAULT_RULER = 80;

/**
 * Returns ruler to be used as full width.
 * Utilizes editor.rulers (or [80] by default) and returns the first
 * ruler boundary
 *
 * @export
 * @returns {number}
 */
export function getRuler() {
  const editorConfig: WorkspaceConfiguration = workspace.getConfiguration(
    "editor",
    window.activeTextEditor.document.uri
  );
  const rulers: number[] = editorConfig.get("rulers") || [DEFAULT_RULER];
  return Math.max(rulers.reduce(toFirstBoundary, 0), DEFAULT_RULER);
}

/**
 * Returns ruler to be used as full width.
 * Utilizes editor.rulers (or [80] by default) and returns the first
 * ruler boundary
 *
 * @export
 * @param {0|1|2} [level=0]
 * @returns {number}
 */
export function getRulerByLevel(level: Level = 0): number {
  const config = getConfig();
  const levelConfig : LevelConfig = config.get(levelKeyFromIndex(level));
  return levelConfig.width;
}

/**
 * Returns the first ruler boundary starting from 0
 * assuming code is most likely intended to end there
 * @param {rulerTarget}
 * @param {rulerPosition}
 * @returns {number}
 */
function toFirstBoundary(rulerTarget: number, rulerPosition: number): number {
  return rulerTarget === 0 ? rulerPosition : rulerTarget;
}
