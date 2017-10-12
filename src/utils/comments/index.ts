import resolveFromExtension from './fromExtension'
import resolveFromVSCode from './fromVSCode'

/**
 * I check for all vscode extensions with the language id name in them,
 * and then dynamically import their language configurations.
 * If it doesn't work, I resort to using my own comment patterns.
 */

export default function resolveLengthDiff(languageId: string): Promise<any> {
  return resolveFromExtension(languageId).catch(
    () => new Promise(resolve => resolve(resolveFromVSCode(languageId)))
  )
}
