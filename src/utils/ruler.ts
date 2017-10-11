import { workspace, window, WorkspaceConfiguration } from 'vscode'
import { getConfig, Level, Config, SubtitleConfig } from '../utils/config'

const DEFAULT_RULER = 80

/**
 * Returns ruler to be used as full width.
 * Utilizes editor.rulers (or [80] by default) and returns the first item
 * in the array.
 * 
 * @export
 * @returns {number} 
 */
export function getRuler() {
  const editorConfig: WorkspaceConfiguration = workspace.getConfiguration(
    'editor',
    window.activeTextEditor.document.uri
  )
  const rulers: number[] = editorConfig.get('rulers') || [DEFAULT_RULER]
  return rulers[0]
}

/**
 * Returns ruler to be used as full width.
 * Utilizes editor.rulers (or [80] by default) and returns the first item
 * in the array.
 * 
 * @export
 * @param {0|1|2} [level=0]
 * @returns {number} 
 */
export function getRulerByLevel(level: Level = 0): number {
  if (level === 0) {
    return getRuler()
  }
  const config: Config = getConfig()
  const configForLevel: SubtitleConfig =
    level === 1 ? config.light : config.hair
  return configForLevel.width || getRuler()
}
