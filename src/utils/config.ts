import { window, workspace, WorkspaceConfiguration } from 'vscode'

export interface Config {
  padding: number
  dash: string
  shouldUppercase: boolean
  commentPatterns: object
  light: object
  hair: object
}

export const configOptions: string[] = [
  'padding',
  'dash',
  'shouldUppercase',
  'commentPatterns',
  'light',
  'hair'
]

const defaultConfigTopLevel = {
  padding: 1,
  dash: '-',
  shouldUppercase: true
}

export const defaultConfig = Object.assign(defaultConfigTopLevel, {
  commentPatterns: {},
  light: defaultConfigTopLevel,
  hair: defaultConfigTopLevel
})

/**
 * Returns configuration object
 * Note:  This is unmemoized and is expensive (configuration includes nested objects).
 *        Therefore, call with caution.
 * @export
 * @returns {object} configuration object
 */
export function getConfig(): Config {
  const config: WorkspaceConfiguration = workspace.getConfiguration(
    'prismo',
    window.activeTextEditor.document.uri
  )
  return <Config>configOptions.reduce((acc: object, key: string) => {
    const value = config.get(key) || defaultConfig[key]
    if (value !== undefined) {
      return Object.assign(acc, { [key]: value })
    }
    return acc
  }, {})
}
