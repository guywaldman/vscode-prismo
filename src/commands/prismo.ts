import {
  window,
  TextEditor,
  commands,
  Range,
  Position,
  TextDocument,
  Selection
} from 'vscode'
import decorate from '../utils/decorate'
import { getRulerByLevel } from '../utils/ruler'
import { getConfig, Level } from '../utils/config'
import resolveLengthDiff from '../utils/comments/index'
import { resolveCommentPattern } from '../utils/comments/fromExtension'

export class Prismo {
  public prismo(
    level: Level = 0,
    editor: TextEditor = window.activeTextEditor
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!editor) reject('No currently active editor.')

      const selection: Selection = editor.selection
      // TODO: handle multiple lines
      if (!selection.isSingleLine)
        reject('Decorating multiple lines is not currently supported.')

      const document: TextDocument = editor.document

      const lineNumber = selection.anchor.line
      const line = document.lineAt(lineNumber)
      const { firstNonWhitespaceCharacterIndex: indentStartIndex } = line
      const range: Range = line.range

      const title = editor.document.getText(range).trim()
      const rulerWidth: number = getRulerByLevel(level)
      const { languageId } = document
      return resolveLengthDiff(languageId)
        .then(diff => {
          const decoratedTitle: string = decorate(
            title,
            rulerWidth - indentStartIndex - diff,
            getConfig(),
            level
          )

          const rangeToReplace: Range = new Range(
            new Position(lineNumber, indentStartIndex),
            new Position(lineNumber, rulerWidth)
          )

          // comment out the title
          const commentPattern: string = resolveCommentPattern(languageId)
          if (commentPattern === null) {
            // if the comment pattern couldn't get resolved from the extension,
            // use the editor's commenting
            editor.edit(edit => edit.replace(rangeToReplace, decoratedTitle))
            commands.executeCommand('editor.action.commentLine')
          } else {
            editor.edit(edit =>
              edit.replace(
                rangeToReplace,
                commentPattern.replace('%s', decoratedTitle)
              )
            )
          }
        })
    })
  }
}

/**
 * 
 * TODO: document
 * @export
 * @param {number} [level=0] 
 */
export default function prismo(level: number = 0): void {
  const prismo: Prismo = new Prismo()
  prismo
    .prismo(level)
    .catch(e => window.showErrorMessage('Prismo ' + e || 'Unexepected error.'))
}
