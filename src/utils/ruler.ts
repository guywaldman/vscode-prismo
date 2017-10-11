import { workspace, window, WorkspaceConfiguration } from 'vscode'

const DEFAULT_RULER = 80

/**
 * Returns ruler to be used as full width.
 * Utilizes editor.rulers (or [80] by default) and returns the first item
 * in the array.
 * 
 * @export
 * @returns {number} 
 */
export function getRuler(): number {
  const editorConfig: WorkspaceConfiguration = workspace.getConfiguration(
    'editor',
    window.activeTextEditor.document.uri
  )
  const rulers: number[] = editorConfig.get('rulers') || [DEFAULT_RULER]
  return rulers[0]
}
