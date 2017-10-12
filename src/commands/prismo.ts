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
import { getConfig } from '../utils/config'
import resolveLengthDiff from '../utils/comments/index'
import { resolveCommentPattern } from '../utils/comments/fromExtension'

/**
 * 
 * TODO: document
 * @export
 * @param {number} [level=0] 
 */
export default function prismo(level: number = 0): void {
  const editor: TextEditor = window.activeTextEditor
  if (!editor) {
    window.showErrorMessage('[Prismo]: No currently active editor.')
    return
  }
  const selection: Selection = editor.selection
  if (!selection.isSingleLine) {
    // TODO: handle multiple lines
    window.showErrorMessage(
      '[Prismo]: Decorating multiple lines is not currently supported.'
    )
    return
  }
  const document: TextDocument = editor.document

  const lineNumber = selection.anchor.line
  const line = document.lineAt(lineNumber)
  const { firstNonWhitespaceCharacterIndex: indentStartIndex } = line
  const range: Range = line.range

  const title = editor.document.getText(range).trim()
  const rulerWidth: number = getRulerByLevel(level)
  const { languageId } = document
  resolveLengthDiff(languageId)
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
    .catch(() => {
      window.showErrorMessage('Prismo: Ruler could not be computed.')
    })
}
