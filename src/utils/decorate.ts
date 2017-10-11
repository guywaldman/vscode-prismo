import { Config, defaultConfig } from './config'

/**
 * Formats raw title string and returns the formatted string.
 * @param {string} title raw title to format
 * @param {boolean} [shouldUppercase] whether the title should be uppercased (default: true)
 * @return {string} formatted title
 */
const formatTitle: (string, boolean?) => string = (
  title: string,
  shouldUppercase?: boolean
) => {
  return shouldUppercase ? title.toUpperCase() : title
}

/**
 * Returns decorated text, formatted according to defined padding and dash
 * @export
 * @param {string} title title to format
 * @param {number} width width of ruler
 * @return {string} formatted title
 */
export default function decorate(
  title: string,
  width: number,
  options: Config = defaultConfig
): string {
  // resolve settings from config
  const { padding: titlePadding, dash, shouldUppercase } = options

  const { length: titleLength } = title.trim()
  const padding: number = Math.max(((width - titleLength - titlePadding) / 2), 0)
  const paddingLeft: number = Math.floor(padding)
  const paddingRight: number = Math.ceil(padding)
  const titlePaddingStr: string = ' '.repeat(titlePadding)

  const formattedTitle: string = formatTitle(title, shouldUppercase)

  return (
    dash.repeat(paddingLeft) +
    titlePaddingStr +
    formattedTitle +
    titlePaddingStr +
    dash.repeat(paddingRight)
  )
}
