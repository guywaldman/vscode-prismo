import { Config, Level, defaultConfig } from "./config";

/**
 * Formats raw title string and returns the formatted string.
 * @param {string} title raw title to format
 * @param {boolean} shouldUppercase whether the title should be uppercased (default: true)
 * @return {string} formatted title
 */
const formatTitle: (string, boolean?) => string = (
  title: string,
  shouldUppercase: boolean
) => {
  return shouldUppercase ? title.toUpperCase() : title;
};

/**
 * Returns decorated text, formatted according to defined padding and dash
 * @export
 * @param {string} title title to format
 * @param {number} width width of ruler
 * @param {0|1|2} level
 * @return {string} formatted title
 */
export default function decorate(
  title: string,
  width: number,
  options: Partial<Config> = defaultConfig,
  level: Level = 0
): string {
  // resolve settings from config
  const additionalOptions =
    level === 0
      ? {}
      : level === 1
        ? options.light || defaultConfig.light
        : options.hair || defaultConfig.hair;
  const { padding: titlePadding, dash, shouldUppercase } = Object.assign(
    {},
    defaultConfig,
    options,
    additionalOptions
  );

  const titleLength = title.trim().length;
  const padding: number = Math.max(width - titleLength - 2 * titlePadding, 0);
  const dashRepeatLeft: number = Math.max(Math.ceil(padding / 2), 0);
  const dashRepeatRight: number = Math.max(padding - dashRepeatLeft, 0);
  const titlePaddingStr: string = " ".repeat(titlePadding);

  const formattedTitle: string = formatTitle(title, shouldUppercase);

  return (
    dash.repeat(dashRepeatLeft) +
    titlePaddingStr +
    formattedTitle +
    titlePaddingStr +
    dash.repeat(dashRepeatRight)
  );
}
