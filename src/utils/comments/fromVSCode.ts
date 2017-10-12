import {
  extensions,
  Extension,
  CommentRule,
  LanguageConfiguration
} from 'vscode'
import { List } from 'immutable'

import { raceToResolve } from '../helpers'

/**
 * This module is basically a hack.
 * I check for all vscode extensions with the language id name in them,
 * and then dynamically import their language configurations.
 * If it doesn't work, I resort to using my own comment patterns.
 */

const resolveExtensionPaths = (languageId: string) => {
  const extensionsArr: Extension<any>[] = extensions.all.filter(({ id }) =>
    new RegExp(languageId, 'i').test(id)
  )
  return List(
    extensionsArr
      .filter(ext => !!ext)
      .map(({ extensionPath }) =>
        List([
          extensionPath + '/language-configuration.json',
          extensionPath + '/' + languageId + '.configuration.json'
        ])
      )
  ).flatten()
}

export function getCommentForLanguageID(languageId: string): Promise<any> {
  return new Promise((resolve) => {
    const extensionPromises = resolveExtensionPaths(languageId)
      .map(path => import(path))
      .map(promise =>
        promise.then((grammar: LanguageConfiguration) => {
          const commentRule: CommentRule = grammar.comments
          if (!commentRule) return Promise.reject(null)
          const comment = commentRule.lineComment || commentRule.blockComment
          if (!comment) return Promise.reject(null)
          return Promise.resolve(comment)
        })
      )
      .toJS()
    raceToResolve(extensionPromises)
      .then(resolve)
  })
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

export default function resolveLengthDiff(languageId: string): Promise<number> {
  return new Promise((resolve, reject) => {
    getCommentForLanguageID(languageId)
      .then(comment => {
        resolve(computeLengthDiffForVSCodeCommentRule(comment))
      })
      .catch(() => reject())
  })
}
