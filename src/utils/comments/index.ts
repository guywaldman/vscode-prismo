import { window } from "vscode";
import patternFromPresets from "./patternFromPresets";

/**
 * Resolves difference in length from a string pattern.
 * The string pattern is how the string looks after being commented, where
 * `%s` replaces the string
 * @param {string} commentPattern pattern for the comment (i.e. `// %s`)
 * @return {number} difference in length
 */
const lengthDiffFromCommentPattern: (string) => number = (
  commentPattern: string
) => commentPattern.length - 2;

/**
 * Resolves a comment pattern from the languageId in the active editor.
 * In case the languageId is not inside the presets (defined by the extension),
 * the user will input their own style of comment.
 *
 * > The setting will be saved in the configuration for future uses.
 * @param languageId language id in the editor
 * @return {Promise<string>} the comment pattern for the languageId
 */
async function commentPatternFromLanguage(languageId: string): Promise<string> {
  // const tryPatternFromPresets = patternFromPresets(languageId);
  // if (tryPatternFromPresets) {
  //   return Promise.resolve(tryPatternFromPresets);
  // }
  let input = "";
  while (!input.includes("%s")) {
    input = await window.showInputBox({
      prompt:
        "This language is not recognized. Enter a comment pattern for this language in the style `// %s` where %s is the comment text",
      value: "// %s"
    });
  }
  return Promise.resolve(input);
}

export { lengthDiffFromCommentPattern, commentPatternFromLanguage };
