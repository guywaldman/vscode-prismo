import * as vscode from "vscode";

const DEFAULT_PATTERN = "// %s";

// TODO: doc
async function patternFromSettings(languageId: string) {
  let patternFromInput = "";
  while (
    patternFromInput !== null &&
    patternFromInput !== undefined &&
    !patternFromInput.includes("%s")
  ) {
    patternFromInput = await vscode.window.showInputBox({
      prompt: `This language ("${languageId}") is not recognized by Prismo.\nEnter a comment pattern for this language in the style "// %s" where "%s" is the comment text`,
      value: "// %s"
    });
  }
  return patternFromInput || DEFAULT_PATTERN;
}

export default patternFromSettings;
