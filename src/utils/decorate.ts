import { window } from "vscode";
import {
  LevelConfig,
  Level,
  LevelKey,
  levelKeyFromIndex,
  getConfig,
  getConfigForLevel
} from "./config";

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

// TODO: document
export function constructTitle(
  commentPattern: string,
  title: string,
  margin: number = 1
) {
  const indexOfTitle = commentPattern.indexOf("%s");
  const leftOfPattern = commentPattern.slice(0, indexOfTitle);
  const rightOfPattern = commentPattern.slice(indexOfTitle + 2);
  const marginString = " ".repeat(margin);
  const marginRight = rightOfPattern.length > 0 ? marginString : "";
  return `${leftOfPattern}${marginString}${title}${marginRight}${rightOfPattern}`;
}

// TODO: document
// TODO: refactor to accept object
export function constructRegionTitle(
  commentPattern: string,
  title: string,
  margin: number = 1,
  shouldAddMarginLeft: boolean = false,
  shouldAddMarginRight: boolean = true
) {
  const indexOfTitle = commentPattern.indexOf("%s");
  const leftOfPattern = commentPattern.slice(0, indexOfTitle);
  const rightOfPattern = commentPattern.slice(indexOfTitle + 2);
  const marginLeft = shouldAddMarginLeft ? " ".repeat(margin) : "";
  const marginRight = shouldAddMarginRight ? " ".repeat(margin) : "";
  return `${leftOfPattern}${marginLeft}${title}${marginRight}${rightOfPattern}`;
}

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
  const config = getConfigForLevel(level, configOverrides);
  const { padding: paddingFromConfig, dash, shouldUppercase } = config;

  const titleLength = title.trim().length;
  let padding: number = width - titleLength - 2 * paddingFromConfig;
  if (padding < 0) {
    window.showErrorMessage(
      "[PRISMO]: Title was too long for configured width"
    );
    padding = 0;
  }
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
