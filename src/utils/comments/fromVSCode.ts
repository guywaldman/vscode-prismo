import {
  extensions,
  Extension,
  CommentRule,
  LanguageConfiguration
} from 'vscode'
import { raceToResolve } from '../helpers'

const resolveExtensionPaths = (languageId: string) => {
  const extensionsArr: Extension<any>[] = extensions.all.filter(({ id }) =>
    new RegExp(languageId, 'i').test(id)
  )
  return extensionsArr
    .filter(ext => !!ext)
    .map(({ extensionPath }) => extensionPath + '/language-configuration.json')
}

export async function getCommentForLanguageID(
  languageId: string
): Promise<any> {
  const extensionPaths: string[] = resolveExtensionPaths(languageId)
  return raceToResolve(
    extensionPaths.map(path => import(path)).map(
      promise =>
        new Promise((resolve, reject) =>
          promise.then((grammar: LanguageConfiguration) => {
            const commentRule: CommentRule = grammar.comments
            if (!commentRule) reject()

            const comment = commentRule.lineComment || commentRule.blockComment
            if (!comment) reject()
            resolve(comment)
          })
        )
    )
  )
}

export function computeLengthDiffForVSCodeCommentRule(
  comment: string | string[]
): number {
  let arr
  if (typeof comment === 'string') {
    arr = [comment]
  } else {
    arr = comment
  }
  return (
    arr.reduce((acc, commentSection) => acc + commentSection.length, 0) +
    arr.length
  )
}

export default async function resolveLengthDiff(
  languageId: string
): Promise<any> {
  const comment = await getCommentForLanguageID(languageId)
  return computeLengthDiffForVSCodeCommentRule(comment)
}
