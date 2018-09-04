import * as vscode from "vscode";

import {
  tryResolveFromConfig,
  tryUpdateConfigWithUserInput
} from "./patternFromConfiguration";
import patternFromPresets from "./patternFromPresets";

const DEFAULT_PATTERN = "// %s";

/**
 * Resolves difference in length from a string pattern.
 * The string pattern is how the string looks after being commented, where
 * `%s` replaces the string
 * @param {string} commentPattern pattern for the comment (i.e. `// %s`)
 * @return {number} difference in length
 */
function lengthDiffFromCommentPattern (commentPattern: string) : number {
  return commentPattern.length - 2;
}

/**
 * Resolves a comment pattern from the languageId in the active editor, as follows:
 *  1. Try resolving from configuration.
 *  2. Try resolving from presets.
 *  3. Ask for user input and update configuration.
 *     > The setting will be saved in the configuration for future uses.
 * @param languageId language id in the editor
 * @return {Promise<string>} the comment pattern for the languageId
 */
async function commentPatternFromLanguage(languageId: string): Promise<string> {
  const configuration = vscode.workspace.getConfiguration(
    "prismo.commentPatterns",
    null
  );

  // resolve from config
  const patternFromConfig = tryResolveFromConfig(configuration, languageId);
  if (patternFromConfig) {
    return Promise.resolve(patternFromConfig);
  }

  // resolve from presets
  const tryPatternFromPresets = patternFromPresets(languageId);
  if (tryPatternFromPresets) {
    return Promise.resolve(tryPatternFromPresets);
  }

  // ask for user input and update config
  try {
    const userPattern = await tryUpdateConfigWithUserInput(
      configuration,
      languageId
    );
    return userPattern;
  } catch (e) {
    console.log(e);
  }

  return DEFAULT_PATTERN;
}

export { lengthDiffFromCommentPattern, commentPatternFromLanguage };
