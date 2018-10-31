import * as vscode from "vscode";
import {
  commentPatternFromLanguage,
  regionPatternFromLanguage
} from "../utils/comments";
import { constructRegionTitle } from "../utils/decorate";

function endOfLine(eol: vscode.EndOfLine) {
  return eol === 1 ? "\n" : "\r\n";
}

type RegionComments = {
  start: string;
  end: string;
};

async function createRegionComments(
  languageId: string,
  title: string
): Promise<RegionComments> {
  const regionPattern = await regionPatternFromLanguage(languageId);
  return {
    start: constructRegionTitle(regionPattern, `region ${title}`, 0),
    end: constructRegionTitle(regionPattern, `endregion ${title}`, 0)
  };
}

export default async function regionize(editor: vscode.TextEditor) {
  const selection = editor.selection;
  const selectionStart = selection.start;
  const selectionEnd = selection.end;
  const regionTitle = await vscode.window.showInputBox({
    prompt: "Title for your region",
    placeHolder: "Region title"
  });
  const { start, end } = await createRegionComments(
    editor.document.languageId,
    regionTitle
  );
  const eol = endOfLine(editor.document.eol);
  const startChar = editor.document.lineAt(selectionStart.line)
    .firstNonWhitespaceCharacterIndex;
  const endChar = editor.document.lineAt(selectionEnd.line)
    .firstNonWhitespaceCharacterIndex;
  const indent = editor.document.getText(
    new vscode.Range(
      new vscode.Position(selection.start.line, 0),
      new vscode.Position(selection.start.line, startChar)
    )
  );

  await editor.edit(edit => {
    edit.insert(
      new vscode.Position(selection.start.line, 0),
      indent + start + eol
    );
    edit.insert(
      new vscode.Position(selection.end.line, selection.end.character + 1),
      eol + indent + end
    );
  });
}
