'use strict'
import { commands, Disposable, ExtensionContext } from 'vscode'
import prismo from './commands/prismo'

// (from docs)
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

  // log that everything is working as expected
  console.log('extension vscode-prismo is running')

  let disposable: Disposable = commands.registerCommand(
    'extension.prismo',
    prismo
  )
  // TODO: add commands for `extension.prismo-light`, `extension.prismo-hair`

  context.subscriptions.push(disposable)
}

// (from docs)
// this method is called when your extension is deactivated
export function deactivate() {}
