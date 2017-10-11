import { window, workspace, WorkspaceConfiguration } from 'vscode'

// TODO: document
export interface TitleConfig {
  padding: number
  dash: string
  shouldUppercase: boolean
}

// TODO: document
export interface SubtitleConfig extends TitleConfig {
  width?: number
}

// TODO: document
export interface Config extends TitleConfig {
  commentPatterns: object
  light: SubtitleConfig
  hair: SubtitleConfig
}

// TODO: document
export enum Level {
  normal,
  light,
  hair
}

export const configOptions: string[] = [
  'padding',
  'dash',
  'shouldUppercase',
  'commentPatterns',
  'light',
  'hair'
]

const defaultConfigTopLevel: TitleConfig = {
  padding: 1,
  dash: '-',
  shouldUppercase: true
}
const defaultConfigSubtitle: SubtitleConfig = defaultConfigTopLevel

export const defaultConfig: Config = Object.assign({}, defaultConfigTopLevel, {
  commentPatterns: {},
  light: Object.assign({}, defaultConfigSubtitle, {
    width: 40,
    shouldUppercase: false
  }),
  hair: Object.assign({}, defaultConfigSubtitle, {
    width: 30,
    shouldUppercase: false
  })
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
