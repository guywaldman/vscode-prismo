import { window, workspace, WorkspaceConfiguration } from "vscode";

// TODO: document
export interface LevelConfig {
  padding: number;
  dash: string;
  shouldUppercase: boolean;
  width: number;
}

// TODO: document
export interface Config extends LevelConfig {
  normal: LevelConfig;
  light: LevelConfig;
  hair: LevelConfig;
}

// TODO: document
export enum Level {
  Normal = 0,
  Light,
  Hair
}

export type LevelKey = "normal" | "light" | "hair";

export const CONFIG_OPTIONS: string[] = [
  "padding",
  "dash",
  "shouldUppercase",
  "width",
  "light",
  "hair"
];

const DEFAULT_CONFIG_OPTIONS: LevelConfig = {
  padding: 1,
  dash: "-",
  shouldUppercase: true,
  width: 0
};

export const DEFAULT_CONFIG: Config = Object.assign({}, DEFAULT_CONFIG_OPTIONS, {
  normal: DEFAULT_CONFIG_OPTIONS,
  light: {
    ...DEFAULT_CONFIG_OPTIONS,
    width: 40,
    shouldUppercase: false
  },
  hair: {
    ...DEFAULT_CONFIG_OPTIONS,
    width: 30,
    shouldUppercase: false
  }
});

/**
 * Returns configuration object
 * Note:  This is unmemoized and is expensive (configuration includes nested objects).
 *        Therefore, call with caution.
 * @returns {object} configuration object
 */
export function getConfig(): WorkspaceConfiguration {
  return workspace.getConfiguration(
    "prismo",
    window.activeTextEditor.document.uri
  );
}

// TODO: document
export function levelKeyFromIndex(level: Level) : string {
  switch (level) {
    case 0:
      return "normal";
    case 1:
      return "light";
    case 2:
    default:
      return "hair";
  }
}
