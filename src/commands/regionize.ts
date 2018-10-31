import * as vscode from "vscode";
import { commentPatternFromLanguage } from "../utils/comments";

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
  const commentPattern = await commentPatternFromLanguage(languageId);
  return {
    start: commentPattern.replace("%s", `region ${title}`),
    end: commentPattern.replace("%s", `endregion ${title}`)
  };
}

export default async function regionize(editor: vscode.TextEditor) {
  const selection = editor.selection;
  const startLine = selection.start.line;
  const endLine = selection.end.line;
  const regionTitle = await vscode.window.showInputBox({
    prompt: "Title for your region",
    placeHolder: "Region title"
  });
  const { start, end } = await createRegionComments(
    editor.document.languageId,
    regionTitle
  );
  const eol = endOfLine(editor.document.eol);
  await editor.edit(edit => {
    edit.insert(new vscode.Position(startLine, 0), start + eol + eol);
    edit.insert(new vscode.Position(endLine + 1, 0), end + eol + eol);
  });
}
