import * as vscode from "vscode";

const DEFAULT_PATTERN = "// %s";

// TODO: doc
async function patternFromConfiguration(languageId: string) {

  const configuration = vscode.workspace.getConfiguration();
  const patternsFromConfiguration = configuration.get("prismo.commentPatterns");
  if (patternsFromConfiguration.hasOwnProperty(languageId)) {
    return patternsFromConfiguration[languageId];
  }

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

  await configuration.update(
    `prismo.commentPatterns`,
    { ...patternsFromConfiguration, [languageId]: patternFromInput },
    vscode.ConfigurationTarget.Global
  );

  return patternFromInput || DEFAULT_PATTERN;
}

export default patternFromConfiguration;
