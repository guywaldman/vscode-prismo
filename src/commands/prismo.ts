import * as vscode from "vscode";

import decorateTitle, { constructTitle } from "../utils/decorate";
import { getRulerByLevel } from "../utils/ruler";
import {
  commentPatternFromLanguage,
  lengthDiffFromCommentPattern
} from "../utils/comments/index";
import { getConfig, getConfigForLevel } from "../utils/config";

type DecoratedTitle = {
  decoratedTitle: string;
  rangeToReplace: vscode.Range;
};

// TODO: document
async function computeRangeAndTitle(
  editor: vscode.TextEditor,
  level: number
): Promise<DecoratedTitle[]> {
  const selection = editor.selection;

  const diff = lengthDiffFromCommentPattern(editor.document.languageId);

  let results = [];
  for (
    let lineNumber = selection.start.line;
    lineNumber <= selection.end.line;
    lineNumber++
  ) {
    const { document } = editor;
    const line = document.lineAt(lineNumber);
    const rulerWidth: number = getRulerByLevel(level);
    const { firstNonWhitespaceCharacterIndex: indentStartIndex } = line;
    const rangeToReplace: vscode.Range = new vscode.Range(
      new vscode.Position(lineNumber, indentStartIndex),
      new vscode.Position(lineNumber, rulerWidth)
    );

    const range: vscode.Range = line.range;

    const title = editor.document.getText(range).trim();
    const decoratedTitle: string = decorateTitle(
      title,
      rulerWidth - indentStartIndex - diff,
      level
    );

    results.push({ decoratedTitle, rangeToReplace });
  }
  return Promise.resolve(results);
}

// TODO: document
async function decorate(
  editor: vscode.TextEditor | null,
  level: number
): Promise<any> {
  if (!editor) {
    return Promise.reject(new Error("No currently active editor."));
  }

  const selection = editor.selection;
  const languageId = editor.document.languageId;

  const commentPattern = await commentPatternFromLanguage(languageId);
  const linesDecorationInfo = await computeRangeAndTitle(editor, level);
  const config = getConfigForLevel(level);

  for (let { rangeToReplace, decoratedTitle } of linesDecorationInfo) {
    const title = constructTitle(commentPattern, decoratedTitle);
    await editor.edit(edit => {
      edit.replace(rangeToReplace, title);
    });
  }
  let linesToMoveDown =
    Math.max(0, selection.start.line - selection.end.line) + 1;
  vscode.commands.executeCommand("cursorMove", {
    to: "down",
    by: "line",
    value: linesToMoveDown
  });
}

export default function prismo(level: number = 0) {
  return (editor: vscode.TextEditor) =>
    decorate(editor, level).catch(e => {
      vscode.window.showErrorMessage(
        `[vscode-prismo]: ${e || "Unexpected error"}`
      );
    });
}
