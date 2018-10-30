import { commands, TextEditor, ExtensionContext } from "vscode";
import { Level } from "./utils/config";
import prismo from "./commands/prismo";
import regionize from "./commands/regionize";

const COMMANDS = {
  prismo: prismo(),
  "prismo-light": prismo(1),
  "prismo-hair": prismo(2),
  regionize: regionize
};

export function activate(context: ExtensionContext) {
  console.log("[vscode-prismo] Extension is running.");

  for (let [title, command] of Object.entries(COMMANDS)) {
    context.subscriptions.push(
      commands.registerTextEditorCommand(`extension.${title}`, command)
    );
  }
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log("[vscode-prismo] Extension has been deactivated.");
}
