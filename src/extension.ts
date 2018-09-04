import { commands, Disposable, TextEditor, TextEditorEdit, ExtensionContext } from "vscode";
import { Level } from "./utils/config";
import prismo from "./commands/prismo";

function prismoCommand(level: Level = 0): (TextEditor) => void {
  return (editor: TextEditor) => prismo(editor, level);
}

// (from docs)
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // log that everything is working as expected
  console.log("extension vscode-prismo is running");

  let disposable: Disposable = commands.registerTextEditorCommand(
    "extension.prismo",
    prismoCommand()
  );

  let disposableLight: Disposable = commands.registerTextEditorCommand(
    "extension.prismo-light",
    prismoCommand(1)
  );

  let disposableHair: Disposable = commands.registerTextEditorCommand(
    "extension.prismo-hair",
    prismoCommand(2)
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposableLight);
  context.subscriptions.push(disposableHair);
}

// (from docs)
// this method is called when your extension is deactivated
export function deactivate() {}
