const expected = {
  addition: 11,
  match: 'foo',
  kittenName: 'Fluffbun',
  ponyName: 'Fluttershy',
  nestedMatch: 6,
  letExpr: 15,
  letExpr2: true,
  fx: 42,
  letF: 13,
  scc1: [['a', 'b'], ['c']],
  scc2: [ [ '//compiler/ast.jg' ],
    [ '//compiler/e2e/basic_module_test.jg' ],
    [ '//compiler/jaguarLexer.jg' ],
    [ '//compiler/jaguarParser.jg' ],
    [ '//compiler/parsers.jg' ],
    [ '//compiler/prelude.jg' ] ],
  typeClass: 'pony',
  tryit: 'pony',
  tryit2: 'ponyfoo',
  tryit3: 42,
};

module.exports = expected;
