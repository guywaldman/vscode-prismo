import { LevelConfig, Level, LevelKey, levelKeyFromIndex, getConfig } from "./config";

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
  level: Level = 0,
  configOverrides: Partial<{ [s in LevelKey]: Partial<LevelConfig> }> = {}
): string {
  // resolve settings from config
  const config = getConfig();
  const levelKey = levelKeyFromIndex(level);
  const configForLevel : LevelConfig = { ...config.get(levelKey), ...configOverrides[levelKey] };
  
  const { padding: paddingFromConfig, dash, shouldUppercase } = configForLevel;

  const titleLength = title.trim().length;
  const padding: number = Math.max(width - titleLength - 2 * paddingFromConfig, 0);
  const dashRepeatLeft: number = Math.max(Math.ceil(padding / 2), 0);
  const dashRepeatRight: number = Math.max(padding - dashRepeatLeft, 0);
  const titlePaddingStr: string = " ".repeat(paddingFromConfig);

  const formattedTitle: string = formatTitle(title, shouldUppercase);

  return (
    dash.repeat(dashRepeatLeft) +
    titlePaddingStr +
    formattedTitle +
    titlePaddingStr +
    dash.repeat(dashRepeatRight)
  );
}
