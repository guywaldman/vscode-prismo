import * as vscode from "vscode";

// TODO: doc
function tryResolveFromConfig(
  configuration: vscode.WorkspaceConfiguration,
  languageId: string
): string | undefined {
  const patternFromConfig: string = configuration.get(languageId);
  return patternFromConfig;
}

// TODO: doc
async function tryUpdateConfigWithUserInput(
  configuration: vscode.WorkspaceConfiguration,
  languageId: string
) {
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
  if (!patternFromInput) {
    throw new Error(
      `User input for comment pattern for language ${languageId} could not be determined.`
    );
  }

  const patternsFromConfiguration = configuration.get(
    "prismo.commentPatterns",
    {}
  );
  try {
    await vscode.workspace
      .getConfiguration()
      .update(
        "prismo.commentPatterns",
        { ...patternsFromConfiguration, [languageId]: patternFromInput },
        vscode.ConfigurationTarget.Global
      );
  } catch (e) {
    throw new Error(
      `Error occured while attempting to update configuration for user input: ${e}`
    );
  }

  return Promise.resolve(patternFromInput);
}

export { tryResolveFromConfig, tryUpdateConfigWithUserInput };
