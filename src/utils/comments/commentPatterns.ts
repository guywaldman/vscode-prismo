// TODO: add all languages from https://code.visualstudio.com/docs/languages/identifiers

const BY_LANGUAGE = {
  xml: "<!--%s-->",
  hash: "#%s",
  bat: "REM%s",
  percent: "%%s",
  handlebars: "{{!--%s--}}",
  doubleDash: "--%s",
  block: "/*%s*/",
  doubleLine: "--%s",
  pug: "//-%s",
  common: "//%s"
};

const BY_PATTERN = {
  block: ["css"],
  hash: [
    "coffeescript",
    "dockerfile",
    "dockerfile",
    "elixir",
    "julia",
    "makefile",
    "perl",
    "python",
    "ruby",
    "shellscript",
    "yaml"
  ],
  xml: ["xml", "xsl", "html", "markdown"],
  percent: ["tex", "prolog"],
  pug: ["pug", "jade"],
  doubleDash: ["lua", "sql", "haskell", "cabal"],
  doubleLine: ["sql", "ada", "haskell", "lua", "pig"],
  common: [
    "c",
    "c#",
    "cpp",
    "csharp",
    "d",
    "java",
    "javascript",
    "javascriptreact",
    "rust",
    "typescript"
  ]
};

function computePatternByLanguage(): { [s: string]: string } {
  let result: { [s: string]: string } = {};
  for (let [pattern, languages] of Object.entries(BY_PATTERN)) {
    languages.forEach(language => {
      result[language] = BY_LANGUAGE[pattern];
    });
  }
  return result;
}

const patterns = computePatternByLanguage();

export default patterns;
