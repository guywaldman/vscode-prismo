import {
  window,
  TextEditor,
  TextEditorEdit,
  commands,
  Range,
  Position,
  TextDocument,
  Selection
} from "vscode";
import decorate from "../utils/decorate";
import { getRulerByLevel } from "../utils/ruler";
import { getConfig, Level } from "../utils/config";
import {
  commentPatternFromLanguage,
  lengthDiffFromCommentPattern
} from "../utils/comments/index";

interface Prismo {
  new (TextEditor, Level);
  decorate(): Promise<any>;
}

class Prismo implements Prismo {
  private _level: number;
  private _editor: TextEditor;

  constructor(editor: TextEditor, level: Level) {
    this._editor = editor;
    this._level = level;
  }

  // TODO: document
  public async decorate(): Promise<any> {
    const editor = this._editor;
    const selection = editor.selection;

    if (!this._editor)
      return Promise.reject(new Error("No currently active editor."));

    const {
      document: { languageId }
    } = editor;

    const commentPattern = await commentPatternFromLanguage(languageId);
    const linesDecorationInfo = await this._computeRangeAndTitle();

    for (let { rangeToReplace, decoratedTitle } of linesDecorationInfo) {
      await editor.edit((edit: TextEditorEdit) => {
        edit.replace(
          rangeToReplace,
          commentPattern.replace("%s", decoratedTitle)
        );
      });
    }
    let linesToMoveDown =
      Math.max(0, selection.start.line - selection.end.line) + 1;
    commands.executeCommand("cursorMove", {
      to: "down",
      by: "line",
      value: linesToMoveDown
    });
  }

  // TODO: document
  private _computeRangeAndTitle(): Promise<
    Array<{ decoratedTitle: string; rangeToReplace: Range }>
  > {
    const editor = this._editor;
    const selection: Selection = editor.selection;

    const diff = lengthDiffFromCommentPattern(editor.document.languageId);

    let results = [];
    for (
      let lineNumber = selection.start.line;
      lineNumber <= selection.end.line;
      lineNumber++
    ) {
      const { document } = editor;
      const line = document.lineAt(lineNumber);
      const rulerWidth: number = getRulerByLevel(this._level);
      const { firstNonWhitespaceCharacterIndex: indentStartIndex } = line;
      const rangeToReplace: Range = new Range(
        new Position(lineNumber, indentStartIndex),
        new Position(lineNumber, rulerWidth)
      );

      const range: Range = line.range;

      const title = editor.document.getText(range).trim();
      const decoratedTitle: string = decorate(
        title,
        rulerWidth - indentStartIndex - diff,
        this._level
      );

      results.push({ decoratedTitle, rangeToReplace });
    }
    return Promise.resolve(results);
  }
}

// TODO: document
export default function prismo(level: number = 0) {
  return (editor: TextEditor) => {
    const prismo: Prismo = new Prismo(editor, level);
    prismo
      .decorate()
      .catch(e =>
        window.showErrorMessage("[PRISMO]: " + e || "Unexepected error.")
      );
  };
}
