import resolveFromExtension, { DEFAULT_LENGTH_DIFF } from './fromExtension'
import resolveFromVSCode from './fromVSCode'

/**
 * I check for all vscode extensions with the language id name in them,
 * and then dynamically import their language configurations.
 * If it doesn't work, I resort to using my own comment patterns.
 */

export default function resolveLengthDiff(languageId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    resolveFromExtension(languageId)
      .then(diff => resolve(diff))
      .catch(() => {
        resolveFromVSCode(languageId)
          .then(diff => resolve(diff))
          .catch(() => reject(DEFAULT_LENGTH_DIFF))
      }
      )
  })
}
