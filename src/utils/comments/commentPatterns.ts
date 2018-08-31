const BY_LANGUAGE = {
  'xml': '<!-- %s -->',
  'hash': '# %s',
  'bat': 'REM %s',
  'percent': '% %s',
  'handlebars': '{{!-- %s --}}',
  'doubleDash': '-- %s',
  'block': '/* %s */',
  'pug': '//- %s',
  'common': '// %s'
};

const BY_PATTERN = {
  'block': ['css'],
  'hash': ['shellscript', 'dockerfile', 'ruby', 'coffeescript'],
  'xml': ['xml', 'xsl', 'html', 'markdown'],
  'percent': ['tex', 'prolog'],
  'pug': ['pug', 'jade'],
  'doubleDash': ['lua', 'sql', 'haskell', 'cabal'],
  'common':
      ['javascript', 'javascriptreact', 'typescript', 'java', 'c', 'cpp', 'd']
};

function computePatternByLanguage() : { [s: string]: string } {
    let result : { [s: string]: string } = {};
    for (let [pattern, languages] of Object.entries(BY_PATTERN)) {
        languages.forEach(language => {
            result[language] = BY_LANGUAGE[language];
        })
    }
    return result;
}

export default computePatternByLanguage();
