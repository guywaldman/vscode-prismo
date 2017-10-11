import resolveFromExtension from './fromExtension'
import resolveFromVSCode from './fromVSCode'

export default function resolveLengthDiff(languageId: string): Promise<any> {
  return resolveFromVSCode(languageId).catch(
    () => new Promise(resolve => resolve(resolveFromExtension(languageId)))
  )
}
