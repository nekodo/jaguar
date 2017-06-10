var cache = {}
function _require(f) {
  return cache[f] || require(f == "./builtins.js" ? process.cwd() + "/" + "compiler/builtins.js" : f);
}
cache["//compiler/prelude.jg"] = (function() {var $add = (_require("./builtins.js")).$add;
var $del = (_require("./builtins.js")).$del;
var $lt = (_require("./builtins.js")).$lt;
var $eq = (_require("./builtins.js")).$eq;
var $or = (_require("./builtins.js")).$or;
var $concat = (_require("./builtins.js")).$concat;
var empty = (_require("./builtins.js")).empty;
var getIx = (_require("./builtins.js")).getIx;
var getChar = (_require("./builtins.js")).getChar;
var set = (_require("./builtins.js")).set;
var length = (_require("./builtins.js")).length;
var emptyArray = (_require("./builtins.js")).emptyArray;
var push = (_require("./builtins.js")).push;
var enqueue = (_require("./builtins.js")).enqueue;
var slice = (_require("./builtins.js")).slice;
var slice2 = (_require("./builtins.js")).slice2;
var concat = (_require("./builtins.js")).concat;
var map = (_require("./builtins.js")).map;
var filter = (_require("./builtins.js")).filter;
var foldl = (_require("./builtins.js")).foldl;
var foldl1 = (_require("./builtins.js")).foldl1;
var iterate = (_require("./builtins.js")).iterate;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var $Just = function($0){
this.$0=$0;this.$tag="Just"};
var Just = function($0){
return new $Just($0)};
Just.$tag = "Just";
var $Nothing = function(){
this.$tag="Nothing"};
var Nothing = new $Nothing();
Nothing.$tag = "Nothing";
var $Pair = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="Pair"};
var Pair = function($0){
return function($1){
return new $Pair($0,$1)}};
Pair.$tag = "Pair";
var $Left = function($0){
this.$0=$0;this.$tag="Left"};
var Left = function($0){
return new $Left($0)};
Left.$tag = "Left";
var $Right = function($0){
this.$0=$0;this.$tag="Right"};
var Right = function($0){
return new $Right($0)};
Right.$tag = "Right";
var $$class$Functor = function($0){
this.$0=$0;this.$tag="$class$Functor"};
var $class$Functor = function($0){
return new $$class$Functor($0)};
$class$Functor.$tag = "$class$Functor";
var $$class$Applicative = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="$class$Applicative"};
var $class$Applicative = function($0){
return function($1){
return new $$class$Applicative($0,$1)}};
$class$Applicative.$tag = "$class$Applicative";
var $$class$Alternative = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="$class$Alternative"};
var $class$Alternative = function($0){
return function($1){
return new $$class$Alternative($0,$1)}};
$class$Alternative.$tag = "$class$Alternative";
var fmap = function(x){
return (function(){
var $pm = x;return ($pm.$tag==$class$Functor.$tag)?((function(fmap){
return fmap})($pm.$0)):(error("pattern match fail"))})()};
var pure = function(x){
return (function(){
var $pm = x;return ($pm.$tag==$class$Applicative.$tag)?((function(pure,$lt$mul$gt){
return pure})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var $lt$mul$gt = function(x){
return (function(){
var $pm = x;return ($pm.$tag==$class$Applicative.$tag)?((function(pure,$lt$mul$gt){
return $lt$mul$gt})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var zero = function(x){
return (function(){
var $pm = x;return ($pm.$tag==$class$Alternative.$tag)?((function(zero,$lt$pip$gt){
return zero})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var $lt$pip$gt = function(x){
return (function(){
var $pm = x;return ($pm.$tag==$class$Alternative.$tag)?((function(zero,$lt$pip$gt){
return $lt$pip$gt})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var $instance$Functor$0 = $class$Functor(function(f){
return function(m){
return (function(){
var $pm = m;return ($pm.$tag==Just.$tag)?((function(x){
return Just(f(x))})($pm.$0)):(($pm.$tag==Nothing.$tag)?((function(){
return Nothing})()):(error("pattern match fail")))})()}});
var $instance$Applicative$1 = ($class$Applicative(function(x){
return Just(x)}))(function(f){
return function(x){
return (function(){
var $pm = f;return ($pm.$tag==Nothing.$tag)?((function(){
return Nothing})()):(($pm.$tag==Just.$tag)?((function(f){
return (function(){
var $pm = x;return ($pm.$tag==Nothing.$tag)?((function(){
return Nothing})()):(($pm.$tag==Just.$tag)?((function(x){
return Just(f(x))})($pm.$0)):(error("pattern match fail")))})()})($pm.$0)):(error("pattern match fail")))})()}});
var $instance$Alternative$2 = ($class$Alternative(Nothing))(function(a){
return function(b){
return (function(){
var $pm = a;return ($pm.$tag==Nothing.$tag)?((function(){
return b})()):((function(){
return a})())})()}});
var $instance$Functor$3 = $class$Functor(function(f){
return function(e){
return (function(){
var $pm = e;return ($pm.$tag==Left.$tag)?((function(l){
return Left(l)})($pm.$0)):(($pm.$tag==Right.$tag)?((function(r){
return Right(f(r))})($pm.$0)):(error("pattern match fail")))})()}});
var snd = function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(a,b){
return b})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var loop = function(f){
return function(start){
return (function(){
var shouldStop = function(x){
return (function(){
var $pm = x;return (($pm.$tag==Pair.$tag)&&($pm.$1.$tag==Nothing.$tag))?((function(){
return false})()):((function(){
return true})())})()};var next = function(xr){
return (function(){
var $pm = xr;return ($pm.$tag==Pair.$tag)?((function(x){
return (function(){
var $pm = f(x);return ($pm.$tag==Left.$tag)?((function(x2){
return (Pair(x2))(Nothing)})($pm.$0)):(($pm.$tag==Right.$tag)?((function(r){
return (Pair(x))(Just(r))})($pm.$0)):(error("pattern match fail")))})()})($pm.$0)):(error("pattern match fail"))})()};var sp = (Pair(start))(Nothing);var result = ((iterate(sp))(shouldStop))(next);return (function(){
var $pm = snd(result);return ($pm.$tag==Just.$tag)?((function(r){
return r})($pm.$0)):(error("pattern match fail"))})()})()}};
var strToArray = function(s){
return (function(){
var f = function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(i,r){
return (function(){
var $pm = ($lt(i))(length(s));return (!$pm)?((function(){
return Right(r)})()):($pm?((function(){
return Left((Pair(($add(i))(1)))((push((getChar(i))(s)))(r)))})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return (loop(f))((Pair(0))(emptyArray))})()};
var toRecord = (foldl(function(r){
return function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(k,v){
return ((set(k))(v))(r)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(empty);
var reverse = (foldl(function(xs){
return function(x){
return (enqueue(x))(xs)}}))(emptyArray);
var tail = slice(1);
var head = getIx(0);
var uniq = function(xs){
return (function(){
var $pm = ($lt(length(xs)))(2);return $pm?((function(){
return xs})()):((!$pm)?((function(){
return (function(){
var $pm = ($eq((getIx(0))(xs)))((getIx(1))(xs));return (!$pm)?((function(){
return (enqueue(head(xs)))(uniq(tail(xs)))})()):($pm?((function(){
return uniq(tail(xs))})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()};
var mergeSet = function(xs){
return function(ys){
return (function(){
var $pm = length(xs);return (0==$pm)?((function(){
return ys})()):((function(lx){
return (function(){
var $pm = length(ys);return (0==$pm)?((function(){
return xs})()):((function(ly){
return (function(){
var $pm = ($lt(head(xs)))(head(ys));return $pm?((function(){
return (enqueue(head(xs)))((mergeSet(tail(xs)))(ys))})()):((!$pm)?((function(){
return (function(){
var $pm = ($eq(head(xs)))(head(ys));return $pm?((function(){
return (enqueue(head(xs)))((mergeSet(tail(xs)))(tail(ys)))})()):((!$pm)?((function(){
return (enqueue(head(ys)))((mergeSet(xs))(tail(ys)))})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()})($pm))})()})($pm))})()}};
var arr1 = function(x){
return (push(x))(emptyArray)};
var arr2 = function(x){
return function(y){
return (push(y))(arr1(x))}};
var arr3 = function(x){
return function(y){
return function(z){
return (push(z))((arr2(x))(y))}}};
var arr4 = function(x){
return function(y){
return function(z){
return function(xx){
return (push(xx))(((arr3(x))(y))(z))}}}};
var init = function(l){
return ((slice2(0))(($del(length(l)))(1)))(l)};
var last = function(l){
return (getIx(($del(length(l)))(1)))(l)};
var concatMap = function(f){
return function(a){
return ((foldl(concat))(emptyArray))((map(f))(a))}};
var zip = function(xs){
return function(ys){
return (function(){
var $pm = ($or(($eq(length(xs)))(0)))(($eq(length(ys)))(0));return $pm?((function(){
return emptyArray})()):((!$pm)?((function(){
return (enqueue((Pair(head(xs)))(head(ys))))((zip(tail(xs)))(tail(ys)))})()):(error("pattern match fail")))})()}};
var zipWithIndex2 = function(n){
return function(xs){
return (function(){
var $pm = length(xs);return (0==$pm)?((function(){
return emptyArray})()):((function(x){
return (enqueue((Pair(n))(head(xs))))((zipWithIndex2(($add(n))(1)))(tail(xs)))})($pm))})()}};
var zipWithIndex = zipWithIndex2(0);
var join = function(xs){
return function(s){
return (function(){
var $pm = length(xs);return (0==$pm)?((function(){
return ""})()):((function(n){
return (foldl1(function(a){
return function(b){
return ($concat(($concat(a))(s)))(b)}}))(xs)})($pm))})()}};
var exists = function(f){
return function(xs){
return ((foldl(function(r){
return function(x){
return ($or(f(x)))(r)}}))(false))(xs)}};
var containsChar = function(x){
return function(xs){
return (function(){
var f = function(i){
return (function(){
var $pm = ($lt(i))(length(xs));return (!$pm)?((function(){
return false})()):($pm?((function(){
return (function(){
var $pm = ($eq((getChar(i))(xs)))(x);return $pm?((function(){
return true})()):((!$pm)?((function(){
return f(($add(i))(1))})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()};return f(0)})()}};
var find = function(predicate){
return function(xs){
return (function(){
var f = function(i){
return (function(){
var $pm = ($lt(i))(length(xs));return (!$pm)?((function(){
return Right(Nothing)})()):($pm?((function(){
return (function(){
var $pm = predicate((getIx(i))(xs));return $pm?((function(){
return Right(Just((getIx(i))(xs)))})()):((!$pm)?((function(){
return Left(($add(i))(1))})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()};return (loop(f))(0)})()}};
var contains = function(x){
return function(xs){
return (function(){
var f = function(i){
return (function(){
var $pm = ($lt(i))(length(xs));return (!$pm)?((function(){
return Right(false)})()):($pm?((function(){
return (function(){
var $pm = ($eq(x))((getIx(i))(xs));return $pm?((function(){
return Right(true)})()):((!$pm)?((function(){
return Left(($add(i))(1))})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()};return (loop(f))(0)})()}};
var not = function(b){
return (function(){
var $pm = b;return $pm?((function(){
return false})()):((!$pm)?((function(){
return true})()):(error("pattern match fail")))})()};
var either = function(f){
return function(g){
return function(e){
return (function(){
var $pm = e;return ($pm.$tag==Left.$tag)?((function(a){
return f(a)})($pm.$0)):(($pm.$tag==Right.$tag)?((function(b){
return g(b)})($pm.$0)):(error("pattern match fail")))})()}}};
var splitEither = function(a){
return (Pair((map(function(e){
return (function(){
var $pm = e;return ($pm.$tag==Left.$tag)?((function(a){
return a})($pm.$0)):(error("pattern match fail"))})()}))((filter((either(function(_){
return true}))(function(_){
return false})))(a))))((map(function(e){
return (function(){
var $pm = e;return ($pm.$tag==Right.$tag)?((function(b){
return b})($pm.$0)):(error("pattern match fail"))})()}))((filter((either(function(_){
return false}))(function(_){
return true})))(a)))};
var fst = function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(a,b){
return a})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var justOr = function(d){
return function(m){
return (function(){
var $pm = m;return ($pm.$tag==Just.$tag)?((function(x){
return x})($pm.$0)):(($pm.$tag==Nothing.$tag)?((function(){
return d})()):(error("pattern match fail")))})()}};
var maybe = function(a){
return function(b){
return function(m){
return (function(){
var $pm = m;return ($pm.$tag==Just.$tag)?((function(x){
return a(x)})($pm.$0)):(($pm.$tag==Nothing.$tag)?((function(){
return b})()):(error("pattern match fail")))})()}}};
var exports = {Just:Just,Nothing:Nothing,Pair:Pair,Left:Left,Right:Right,$class$Functor:$class$Functor,$class$Applicative:$class$Applicative,$class$Alternative:$class$Alternative,fmap:fmap,pure:pure,$lt$mul$gt:$lt$mul$gt,zero:zero,$lt$pip$gt:$lt$pip$gt,$instance$Functor$0:$instance$Functor$0,$instance$Applicative$1:$instance$Applicative$1,$instance$Alternative$2:$instance$Alternative$2,$instance$Functor$3:$instance$Functor$3,snd:snd,loop:loop,strToArray:strToArray,toRecord:toRecord,reverse:reverse,tail:tail,head:head,uniq:uniq,mergeSet:mergeSet,arr1:arr1,arr2:arr2,arr3:arr3,arr4:arr4,init:init,last:last,concatMap:concatMap,zip:zip,zipWithIndex2:zipWithIndex2,zipWithIndex:zipWithIndex,join:join,exists:exists,containsChar:containsChar,find:find,contains:contains,not:not,either:either,splitEither:splitEither,fst:fst,justOr:justOr,maybe:maybe}
return exports;})();
cache["//compiler/graph.jg"] = (function() {var $neq = (_require("./builtins.js")).$neq;
var empty = (_require("./builtins.js")).empty;
var get = (_require("./builtins.js")).get;
var getIx = (_require("./builtins.js")).getIx;
var has = (_require("./builtins.js")).has;
var del = (_require("./builtins.js")).del;
var set = (_require("./builtins.js")).set;
var mapRecord = (_require("./builtins.js")).mapRecord;
var foldRecord = (_require("./builtins.js")).foldRecord;
var unsafeStringToInt = (_require("./builtins.js")).unsafeStringToInt;
var emptyArray = (_require("./builtins.js")).emptyArray;
var push = (_require("./builtins.js")).push;
var enqueue = (_require("./builtins.js")).enqueue;
var intToString = (_require("./builtins.js")).intToString;
var concat = (_require("./builtins.js")).concat;
var map = (_require("./builtins.js")).map;
var filter = (_require("./builtins.js")).filter;
var foldr = (_require("./builtins.js")).foldr;
var foldl = (_require("./builtins.js")).foldl;
var sort = (_require("./builtins.js")).sort;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var snd = (_require("//compiler/prelude.jg")).snd;
var reverse = (_require("//compiler/prelude.jg")).reverse;
var uniq = (_require("//compiler/prelude.jg")).uniq;
var mergeSet = (_require("//compiler/prelude.jg")).mergeSet;
var arr1 = (_require("//compiler/prelude.jg")).arr1;
var zipWithIndex = (_require("//compiler/prelude.jg")).zipWithIndex;
var exists = (_require("//compiler/prelude.jg")).exists;
var contains = (_require("//compiler/prelude.jg")).contains;
var not = (_require("//compiler/prelude.jg")).not;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var dfs = function(g){
return function(visited){
return function(v){
return (function(){
var visit = function(r){
return function(e){
return (function(){
var $pm = (contains(e))(r);return $pm?((function(){
return r})()):((!$pm)?((function(){
return (concat(((dfs(g))((push(v))((concat(r))(visited))))(e)))(r)})()):(error("pattern match fail")))})()}};var es = (filter(function(v){
return not((contains(v))(visited))}))((get(v))(g));var r = ((foldr(visit))(emptyArray))(es);return (enqueue(v))(r)})()}}};
var fullDfs = function(g){
return (function(){
var visit = function(result){
return function(v){
return function(_){
return (function(){
var $pm = (contains(v))(result);return $pm?((function(){
return result})()):((!$pm)?((function(){
return (concat(((dfs(g))(result))(v)))(result)})()):(error("pattern match fail")))})()}}};var result = ((foldRecord(visit))(emptyArray))(g);return result})()};
var scc = function(g){
return (function(){
var invertedG = (function(){
var invertEdge = function(v){
return function(ig){
return function(e){
return (function(){
var $pm = (has(e))(ig);return $pm?((function(){
return ((set(e))((push(v))((get(e))(ig))))(ig)})()):((!$pm)?((function(){
return ((set(e))(arr1(v)))(ig)})()):(error("pattern match fail")))})()}}};var invert = function(ig){
return function(v){
return function(es){
return (function(){
var ig2 = (function(){
var $pm = (has(v))(ig);return $pm?((function(){
return ig})()):((!$pm)?((function(){
return ((set(v))(emptyArray))(ig)})()):(error("pattern match fail")))})();return ((foldl(invertEdge(v)))(ig2))(es)})()}}};return ((foldRecord(invert))(empty))(g)})();var assembleCc = function(gs){
return function(v){
return (function(){
var $pm = gs;return ($pm.$tag==Pair.$tag)?((function(ig,ccs){
return (function(){
var $pm = (exists(contains(v)))(ccs);return $pm?((function(){
return (Pair(ig))(ccs)})()):((!$pm)?((function(){
return (function(){
var cc = ((dfs(ig))(emptyArray))(v);var ig2 = ((foldl(function(g){
return function(v){
return (del(v))((mapRecord(filter(function(w){
return ($neq(w))(v)})))(g))}}))(ig))(cc);return (Pair(ig2))((push(cc))(ccs))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};var firstDfs = fullDfs(g);var ccs = snd(((foldl(assembleCc))((Pair(invertedG))(emptyArray)))(firstDfs));return ccs})()};
var sccSorted = function(g){
return (function(){
var ccs = scc(g);var topSort = function(ccs){
return (function(){
var g2g = (function(){
var f = function(r){
return function(icc){
return (function(){
var $pm = icc;return ($pm.$tag==Pair.$tag)?((function(i,cc){
return ((foldl(function(r){
return function(c){
return ((set(c))(intToString(i)))(r)}}))(r))(cc)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};return ((foldl(f))(empty))(zipWithIndex(ccs))})();var addGraph = function(r){
return function(v){
return function(es){
return (function(){
var rv = (get(v))(g2g);var res = uniq(sort((filter(function(re){
return ($neq(re))(rv)}))((map(function(e){
return (get(e))(g2g)}))(es))));return (function(){
var $pm = (has(rv))(r);return (!$pm)?((function(){
return ((set(rv))(res))(r)})()):($pm?((function(){
return ((set(rv))((mergeSet(res))((get(rv))(r))))(r)})()):(error("pattern match fail")))})()})()}}};var cg = ((foldRecord(addGraph))(empty))(g);var ord = fullDfs(cg);return reverse((map(function(i){
return (getIx(unsafeStringToInt(i)))(ccs)}))(ord))})()};var result = topSort(ccs);return result})()};
var exports = {dfs:dfs,fullDfs:fullDfs,scc:scc,sccSorted:sccSorted}
return exports;})();
cache["//compiler/ast.jg"] = (function() {var emptyArray = (_require("./builtins.js")).emptyArray;
var push = (_require("./builtins.js")).push;
var concat = (_require("./builtins.js")).concat;
var map = (_require("./builtins.js")).map;
var foldl = (_require("./builtins.js")).foldl;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var Left = (_require("//compiler/prelude.jg")).Left;
var Right = (_require("//compiler/prelude.jg")).Right;
var snd = (_require("//compiler/prelude.jg")).snd;
var concatMap = (_require("//compiler/prelude.jg")).concatMap;
var fst = (_require("//compiler/prelude.jg")).fst;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var $Ann = function($0){
this.$0=$0;this.$tag="Ann"};
var Ann = function($0){
return new $Ann($0)};
Ann.$tag = "Ann";
var $Var = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="Var"};
var Var = function($0){
return function($1){
return new $Var($0,$1)}};
Var.$tag = "Var";
var $Const = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="Const"};
var Const = function($0){
return function($1){
return new $Const($0,$1)}};
Const.$tag = "Const";
var $App = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="App"};
var App = function($0){
return function($1){
return function($2){
return new $App($0,$1,$2)}}};
App.$tag = "App";
var $Lam = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="Lam"};
var Lam = function($0){
return function($1){
return function($2){
return new $Lam($0,$1,$2)}}};
Lam.$tag = "Lam";
var $Case = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="Case"};
var Case = function($0){
return function($1){
return function($2){
return new $Case($0,$1,$2)}}};
Case.$tag = "Case";
var $Let = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="Let"};
var Let = function($0){
return function($1){
return function($2){
return new $Let($0,$1,$2)}}};
Let.$tag = "Let";
var $CNum = function($0){
this.$0=$0;this.$tag="CNum"};
var CNum = function($0){
return new $CNum($0)};
CNum.$tag = "CNum";
var $CStr = function($0){
this.$0=$0;this.$tag="CStr"};
var CStr = function($0){
return new $CStr($0)};
CStr.$tag = "CStr";
var $PVar = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="PVar"};
var PVar = function($0){
return function($1){
return new $PVar($0,$1)}};
PVar.$tag = "PVar";
var $PConst = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="PConst"};
var PConst = function($0){
return function($1){
return new $PConst($0,$1)}};
PConst.$tag = "PConst";
var $PData = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="PData"};
var PData = function($0){
return function($1){
return function($2){
return new $PData($0,$1,$2)}}};
PData.$tag = "PData";
var $Module = function($0,$1,$2,$3,$4,$5){
this.$0=$0;this.$1=$1;this.$2=$2;this.$3=$3;this.$4=$4;this.$5=$5;this.$tag="Module"};
var Module = function($0){
return function($1){
return function($2){
return function($3){
return function($4){
return function($5){
return new $Module($0,$1,$2,$3,$4,$5)}}}}}};
Module.$tag = "Module";
var $ModuleInterface = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="ModuleInterface"};
var ModuleInterface = function($0){
return function($1){
return function($2){
return new $ModuleInterface($0,$1,$2)}}};
ModuleInterface.$tag = "ModuleInterface";
var $Data = function($0,$1,$2,$3){
this.$0=$0;this.$1=$1;this.$2=$2;this.$3=$3;this.$tag="Data"};
var Data = function($0){
return function($1){
return function($2){
return function($3){
return new $Data($0,$1,$2,$3)}}}};
Data.$tag = "Data";
var $DataCon = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="DataCon"};
var DataCon = function($0){
return function($1){
return function($2){
return new $DataCon($0,$1,$2)}}};
DataCon.$tag = "DataCon";
var $Class = function($0,$1,$2,$3){
this.$0=$0;this.$1=$1;this.$2=$2;this.$3=$3;this.$tag="Class"};
var Class = function($0){
return function($1){
return function($2){
return function($3){
return new $Class($0,$1,$2,$3)}}}};
Class.$tag = "Class";
var $Instance = function($0,$1,$2,$3){
this.$0=$0;this.$1=$1;this.$2=$2;this.$3=$3;this.$tag="Instance"};
var Instance = function($0){
return function($1){
return function($2){
return function($3){
return new $Instance($0,$1,$2,$3)}}}};
Instance.$tag = "Instance";
var $TCBound = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="TCBound"};
var TCBound = function($0){
return function($1){
return function($2){
return new $TCBound($0,$1,$2)}}};
TCBound.$tag = "TCBound";
var $TConst = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="TConst"};
var TConst = function($0){
return function($1){
return new $TConst($0,$1)}};
TConst.$tag = "TConst";
var $TVar = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="TVar"};
var TVar = function($0){
return function($1){
return new $TVar($0,$1)}};
TVar.$tag = "TVar";
var $TApp = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="TApp"};
var TApp = function($0){
return function($1){
return function($2){
return new $TApp($0,$1,$2)}}};
TApp.$tag = "TApp";
var $TBot = function(){
this.$tag="TBot"};
var TBot = new $TBot();
TBot.$tag = "TBot";
var $TForall = function($0,$1,$2,$3){
this.$0=$0;this.$1=$1;this.$2=$2;this.$3=$3;this.$tag="TForall"};
var TForall = function($0){
return function($1){
return function($2){
return function($3){
return new $TForall($0,$1,$2,$3)}}}};
TForall.$tag = "TForall";
var $TUnknown = function($0){
this.$0=$0;this.$tag="TUnknown"};
var TUnknown = function($0){
return new $TUnknown($0)};
TUnknown.$tag = "TUnknown";
var $ImportClosed = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="ImportClosed"};
var ImportClosed = function($0){
return function($1){
return function($2){
return new $ImportClosed($0,$1,$2)}}};
ImportClosed.$tag = "ImportClosed";
var $ImportOpen = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="ImportOpen"};
var ImportOpen = function($0){
return function($1){
return function($2){
return new $ImportOpen($0,$1,$2)}}};
ImportOpen.$tag = "ImportOpen";
var $ImportAll = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="ImportAll"};
var ImportAll = function($0){
return function($1){
return new $ImportAll($0,$1)}};
ImportAll.$tag = "ImportAll";
var breakableDownAndUp = function(down){
return function(up){
return function(a){
return function(e){
return (function(){
var go = (breakableDownAndUp(down))(up);var gos = function(a){
return (foldl(function(ar){
return function(p){
return (function(){
var $pm = (go(fst(ar)))(snd(p));return ($pm.$tag==Pair.$tag)?((function(a2,e){
return (Pair(a2))((push((Pair(fst(p)))(e)))(snd(ar)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))((Pair(a))(emptyArray))};return (function(){
var $pm = (down(a))(e);return ($pm.$tag==Right.$tag)?((function(ae){
return ae})($pm.$0)):((($pm.$tag==Left.$tag)&&($pm.$0.$tag==Pair.$tag))?((function(a2,e2){
return (function(){
var ae = (function(){
var $pm = e2;return ($pm.$tag==Lam.$tag)?((function(ann,p,e){
return (function(){
var $pm = (go(a2))(e);return ($pm.$tag==Pair.$tag)?((function(a,e){
return (Pair(a))(((Lam(ann))(p))(e))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==App.$tag)?((function(ann,f,x){
return (function(){
var $pm = (go(a2))(f);return ($pm.$tag==Pair.$tag)?((function(a,f){
return (function(){
var $pm = (go(a))(x);return ($pm.$tag==Pair.$tag)?((function(a,x){
return (Pair(a))(((App(ann))(f))(x))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==Case.$tag)?((function(ann,e,ps){
return (function(){
var $pm = (go(a2))(e);return ($pm.$tag==Pair.$tag)?((function(a,e){
return (function(){
var $pm = (gos(a))(ps);return ($pm.$tag==Pair.$tag)?((function(a,ps){
return (Pair(a))(((Case(ann))(e))(ps))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==Let.$tag)?((function(ann,bs,e){
return (function(){
var $pm = (gos(a2))(bs);return ($pm.$tag==Pair.$tag)?((function(a,bs){
return (function(){
var $pm = (go(a))(e);return ($pm.$tag==Pair.$tag)?((function(a,e){
return (Pair(a))(((Let(ann))(bs))(e))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):((function(){
return (Pair(a2))(e2)})()))))})();return (function(){
var $pm = ae;return ($pm.$tag==Pair.$tag)?((function(a,e){
return (up(a))(e)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()})($pm.$0.$0,$pm.$0.$1)):(error("pattern match fail")))})()})()}}}};
var breakableDown = function(f){
return (breakableDownAndUp(f))(Pair)};
var downAndUp = function(down){
return function(up){
return (breakableDownAndUp(function(a){
return function(e){
return Left((down(a))(e))}}))(up)}};
var down = function(f){
return (downAndUp(f))(Pair)};
var up = downAndUp(Pair);
var getType = function(e){
return (function(){
var $pm = e;return (($pm.$tag==Var.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,v){
return t})($pm.$0.$0,$pm.$1)):((($pm.$tag==Const.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,c){
return t})($pm.$0.$0,$pm.$1)):((($pm.$tag==App.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,f,a){
return t})($pm.$0.$0,$pm.$1,$pm.$2)):((($pm.$tag==Lam.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,p,b){
return t})($pm.$0.$0,$pm.$1,$pm.$2)):((($pm.$tag==Case.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,e,ps){
return t})($pm.$0.$0,$pm.$1,$pm.$2)):((($pm.$tag==Let.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,ds,e){
return t})($pm.$0.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))))})()};
var setType = function(t){
return function(e){
return (function(){
var $pm = e;return (($pm.$tag==Var.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(x,v){
return (Var(Ann(t)))(v)})($pm.$0.$0,$pm.$1)):((($pm.$tag==Const.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(x,c){
return (Const(Ann(t)))(c)})($pm.$0.$0,$pm.$1)):((($pm.$tag==App.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(x,f,a){
return ((App(Ann(t)))(f))(a)})($pm.$0.$0,$pm.$1,$pm.$2)):((($pm.$tag==Lam.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(x,p,b){
return ((Lam(Ann(t)))(p))(b)})($pm.$0.$0,$pm.$1,$pm.$2)):((($pm.$tag==Case.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(x,e,ps){
return ((Case(Ann(t)))(e))(ps)})($pm.$0.$0,$pm.$1,$pm.$2)):((($pm.$tag==Let.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(x,ds,e){
return ((Let(Ann(t)))(ds))(e)})($pm.$0.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))))})()}};
var dataConName = function(dc){
return (function(){
var $pm = dc;return ($pm.$tag==DataCon.$tag)?((function(n,ts){
return n})($pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var dataConNames = function(d){
return (function(){
var $pm = d;return ($pm.$tag==Data.$tag)?((function(n,ps,cs){
return (map(dataConName))(cs)})($pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var getExports = function(m){
return (function(){
var $pm = m;return ($pm.$tag==Module.$tag)?((function(is,ds,vs){
return (concat((concatMap(dataConNames))(ds)))((map(fst))(vs))})($pm.$1,$pm.$2,$pm.$5)):(error("pattern match fail"))})()};
var emptyAnn = Ann(TUnknown(Ann(TBot)));
var exports = {Ann:Ann,Var:Var,Const:Const,App:App,Lam:Lam,Case:Case,Let:Let,CNum:CNum,CStr:CStr,PVar:PVar,PConst:PConst,PData:PData,Module:Module,ModuleInterface:ModuleInterface,Data:Data,DataCon:DataCon,Class:Class,Instance:Instance,TCBound:TCBound,TConst:TConst,TVar:TVar,TApp:TApp,TBot:TBot,TForall:TForall,TUnknown:TUnknown,ImportClosed:ImportClosed,ImportOpen:ImportOpen,ImportAll:ImportAll,breakableDownAndUp:breakableDownAndUp,breakableDown:breakableDown,downAndUp:downAndUp,down:down,up:up,getType:getType,setType:setType,dataConName:dataConName,dataConNames:dataConNames,getExports:getExports,emptyAnn:emptyAnn}
return exports;})();
cache["//compiler/printer.jg"] = (function() {var $concat = (_require("./builtins.js")).$concat;
var length = (_require("./builtins.js")).length;
var push = (_require("./builtins.js")).push;
var enqueue = (_require("./builtins.js")).enqueue;
var intercalate = (_require("./builtins.js")).intercalate;
var concat = (_require("./builtins.js")).concat;
var map = (_require("./builtins.js")).map;
var error = (_require("./builtins.js")).error;
var jsonStringify = (_require("./builtins.js")).jsonStringify;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var tail = (_require("//compiler/prelude.jg")).tail;
var head = (_require("//compiler/prelude.jg")).head;
var arr1 = (_require("//compiler/prelude.jg")).arr1;
var init = (_require("//compiler/prelude.jg")).init;
var last = (_require("//compiler/prelude.jg")).last;
var concatMap = (_require("//compiler/prelude.jg")).concatMap;
var join = (_require("//compiler/prelude.jg")).join;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var Ann = (_require("//compiler/ast.jg")).Ann;
var Var = (_require("//compiler/ast.jg")).Var;
var Const = (_require("//compiler/ast.jg")).Const;
var App = (_require("//compiler/ast.jg")).App;
var Lam = (_require("//compiler/ast.jg")).Lam;
var Case = (_require("//compiler/ast.jg")).Case;
var Let = (_require("//compiler/ast.jg")).Let;
var CNum = (_require("//compiler/ast.jg")).CNum;
var CStr = (_require("//compiler/ast.jg")).CStr;
var PVar = (_require("//compiler/ast.jg")).PVar;
var PConst = (_require("//compiler/ast.jg")).PConst;
var PData = (_require("//compiler/ast.jg")).PData;
var TCBound = (_require("//compiler/ast.jg")).TCBound;
var TConst = (_require("//compiler/ast.jg")).TConst;
var TVar = (_require("//compiler/ast.jg")).TVar;
var TApp = (_require("//compiler/ast.jg")).TApp;
var TBot = (_require("//compiler/ast.jg")).TBot;
var TForall = (_require("//compiler/ast.jg")).TForall;
var TUnknown = (_require("//compiler/ast.jg")).TUnknown;
var printType = function(t){
return (function(){
var printParen = function(t){
return ($concat(($concat("("))(printType(t))))(")")};var printSecondTypeInApp = function(t){
return (function(){
var $pm = t;return ($pm.$tag==TApp.$tag)?((function(a,b){
return printParen(t)})($pm.$1,$pm.$2)):(($pm.$tag==TForall.$tag)?((function(vs,a){
return printParen(t)})($pm.$1,$pm.$3)):((function(){
return printType(t)})()))})()};var printFirstTypeInApp = function(t){
return (function(){
var $pm = t;return (($pm.$tag==TApp.$tag)&&(($pm.$1.$tag==TApp.$tag)&&(($pm.$1.$1.$tag==TConst.$tag)&&("->"==$pm.$1.$1.$1))))?((function(a,b){
return printParen(t)})($pm.$1.$2,$pm.$2)):(($pm.$tag==TForall.$tag)?((function(vs,a){
return printParen(t)})($pm.$1,$pm.$3)):((function(){
return printType(t)})()))})()};var printTypeInFun = function(t){
return (function(){
var $pm = t;return (($pm.$tag==TApp.$tag)&&(($pm.$1.$tag==TApp.$tag)&&(($pm.$1.$1.$tag==TConst.$tag)&&("->"==$pm.$1.$1.$1))))?((function(c,d){
return printParen(t)})($pm.$1.$2,$pm.$2)):(($pm.$tag==TForall.$tag)?((function(vs,a){
return printParen(t)})($pm.$1,$pm.$3)):((function(){
return printType(t)})()))})()};return (function(){
var $pm = t;return ($pm.$tag==TConst.$tag)?((function(t){
return t})($pm.$1)):(($pm.$tag==TVar.$tag)?((function(v){
return v})($pm.$1)):(($pm.$tag==TBot.$tag)?((function(){
return "~bottom~"})()):(($pm.$tag==TUnknown.$tag)?((function(){
return "?"})()):((($pm.$tag==TApp.$tag)&&(($pm.$1.$tag==TApp.$tag)&&(($pm.$1.$1.$tag==TConst.$tag)&&("->"==$pm.$1.$1.$1))))?((function(a,b){
return ($concat(($concat(printTypeInFun(a)))(" -> ")))(printType(b))})($pm.$1.$2,$pm.$2)):(($pm.$tag==TApp.$tag)?((function(a,b){
return ($concat(($concat(printFirstTypeInApp(a)))(" ")))(printSecondTypeInApp(b))})($pm.$1,$pm.$2)):(($pm.$tag==TForall.$tag)?((function(vs,bs,a){
return (function(){
var bounds = (function(){
var $pm = length(bs);return (0==$pm)?((function(){
return ""})()):((function(){
return ($concat(" with "))((intercalate(", "))((map(printTypeBound))(bs)))})())})();return ($concat(($concat(($concat(($concat("forall "))((intercalate(", "))(vs))))(bounds)))(". ")))(printType(a))})()})($pm.$1,$pm.$2,$pm.$3)):((function(){
return error(($concat("cannot print "))(jsonStringify(t)))})())))))))})()})()};
var printTypeBound = function(b){
return (function(){
var $pm = b;return ($pm.$tag==TCBound.$tag)?((function(n,t){
return ($concat(($concat(($concat(($concat(n))(" ")))("(")))(printType(t))))(")")})($pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var indent = map(function(l){
return ($concat("  "))(l)});
var printExprTyped = function(typed){
return function(e){
return (function(){
var sameLine = function(xs){
return function(ys){
return (concat(init(xs)))((enqueue(($concat(last(xs)))(head(ys))))(tail(ys)))}};var sameLine3 = function(a){
return function(b){
return function(c){
return (sameLine(a))((sameLine(b))(c))}}};var printT = function(e){
return (function(){
var t = (function(){
var $pm = e;return (($pm.$tag==Var.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,v){
return t})($pm.$0.$0,$pm.$1)):((($pm.$tag==Const.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,c){
return t})($pm.$0.$0,$pm.$1)):((($pm.$tag==App.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,f,a){
return t})($pm.$0.$0,$pm.$1,$pm.$2)):((($pm.$tag==Lam.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,p,b){
return t})($pm.$0.$0,$pm.$1,$pm.$2)):((($pm.$tag==Case.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,e,ps){
return t})($pm.$0.$0,$pm.$1,$pm.$2)):((($pm.$tag==Let.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,ds,e){
return t})($pm.$0.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))))})();return printType(t)})()};var printPat = function(p){
return (function(){
var $pm = p;return ($pm.$tag==PVar.$tag)?((function(v){
return v})($pm.$1)):((($pm.$tag==PConst.$tag)&&($pm.$1.$tag==CNum.$tag))?((function(n){
return jsonStringify(n)})($pm.$1.$0)):((($pm.$tag==PConst.$tag)&&($pm.$1.$tag==CStr.$tag))?((function(s){
return jsonStringify(s)})($pm.$1.$0)):(($pm.$tag==PData.$tag)?((function(n,ps){
return ($concat(($concat(($concat(n))(" (")))((join((map(printPat))(ps)))(") ("))))(")")})($pm.$1,$pm.$2)):(error("pattern match fail")))))})()};var printParen = function(e){
return ((sameLine3(arr1("(")))(printExpr(e)))(arr1(")"))};var printCasePat = function(cp){
return (function(){
var $pm = cp;return ($pm.$tag==Pair.$tag)?((function(p,e){
return (enqueue(($concat(printPat(p)))(" ->")))(indent(printExpr(e)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};var printE = function(e){
return (function(){
var $pm = e;return ($pm.$tag==Var.$tag)?((function(n){
return arr1(n)})($pm.$1)):((($pm.$tag==Const.$tag)&&($pm.$1.$tag==CNum.$tag))?((function(n){
return arr1(jsonStringify(n))})($pm.$1.$0)):((($pm.$tag==Const.$tag)&&($pm.$1.$tag==CStr.$tag))?((function(s){
return arr1(jsonStringify(s))})($pm.$1.$0)):(($pm.$tag==App.$tag)?((function(f,a){
return ((sameLine3(printParen(f)))(arr1(" ")))(printParen(a))})($pm.$1,$pm.$2)):(($pm.$tag==Lam.$tag)?((function(v,e){
return (enqueue(($concat(($concat("\\"))(v)))(" ->")))(indent(printExpr(e)))})($pm.$1,$pm.$2)):(($pm.$tag==Case.$tag)?((function(e,ps){
return (concat(((sameLine3(arr1("case ")))(printParen(e)))(arr1(" of"))))(indent((concatMap(printCasePat))(ps)))})($pm.$1,$pm.$2)):(($pm.$tag==Let.$tag)?((function(ds,e){
return (concat((push("in"))((enqueue("let"))(indent((concatMap(printDef(typed)))(ds))))))(indent(printExpr(e)))})($pm.$1,$pm.$2)):(error("pattern match fail"))))))))})()};var printExpr = function(e){
return (function(){
var $pm = typed;return (!$pm)?((function(){
return printE(e)})()):($pm?((function(){
return ((sameLine3(arr1("(")))(printE(e)))(arr1(($concat(($concat(" :: "))(printT(e))))(" )")))})()):(error("pattern match fail")))})()};var pe = printE(e);return printExpr(e)})()}};
var printDef = function(typed){
return function(d){
return (function(){
var $pm = d;return ($pm.$tag==Pair.$tag)?((function(n,e){
return (enqueue(($concat(n))(" =")))(indent((printExprTyped(typed))(e)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};
var reallyPrintExpr = function(typed){
return function(e){
return (join((printExprTyped(typed))(e)))("\n")}};
var exports = {printType:printType,printTypeBound:printTypeBound,indent:indent,printExprTyped:printExprTyped,printDef:printDef,reallyPrintExpr:reallyPrintExpr}
return exports;})();
cache["//compiler/typer.jg"] = (function() {var $add = (_require("./builtins.js")).$add;
var $gt = (_require("./builtins.js")).$gt;
var $eq = (_require("./builtins.js")).$eq;
var $neq = (_require("./builtins.js")).$neq;
var $and = (_require("./builtins.js")).$and;
var $or = (_require("./builtins.js")).$or;
var $concat = (_require("./builtins.js")).$concat;
var empty = (_require("./builtins.js")).empty;
var get = (_require("./builtins.js")).get;
var has = (_require("./builtins.js")).has;
var del = (_require("./builtins.js")).del;
var set = (_require("./builtins.js")).set;
var mapRecord = (_require("./builtins.js")).mapRecord;
var foldRecord = (_require("./builtins.js")).foldRecord;
var merge = (_require("./builtins.js")).merge;
var length = (_require("./builtins.js")).length;
var emptyArray = (_require("./builtins.js")).emptyArray;
var push = (_require("./builtins.js")).push;
var enqueue = (_require("./builtins.js")).enqueue;
var intToString = (_require("./builtins.js")).intToString;
var concat = (_require("./builtins.js")).concat;
var map = (_require("./builtins.js")).map;
var filter = (_require("./builtins.js")).filter;
var foldr = (_require("./builtins.js")).foldr;
var foldl = (_require("./builtins.js")).foldl;
var error = (_require("./builtins.js")).error;
var debug = (_require("./builtins.js")).debug;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var Just = (_require("//compiler/prelude.jg")).Just;
var Nothing = (_require("//compiler/prelude.jg")).Nothing;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var snd = (_require("//compiler/prelude.jg")).snd;
var head = (_require("//compiler/prelude.jg")).head;
var mergeSet = (_require("//compiler/prelude.jg")).mergeSet;
var arr1 = (_require("//compiler/prelude.jg")).arr1;
var concatMap = (_require("//compiler/prelude.jg")).concatMap;
var zip = (_require("//compiler/prelude.jg")).zip;
var exists = (_require("//compiler/prelude.jg")).exists;
var find = (_require("//compiler/prelude.jg")).find;
var contains = (_require("//compiler/prelude.jg")).contains;
var not = (_require("//compiler/prelude.jg")).not;
var fst = (_require("//compiler/prelude.jg")).fst;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var Ann = (_require("//compiler/ast.jg")).Ann;
var Var = (_require("//compiler/ast.jg")).Var;
var Const = (_require("//compiler/ast.jg")).Const;
var App = (_require("//compiler/ast.jg")).App;
var Lam = (_require("//compiler/ast.jg")).Lam;
var Case = (_require("//compiler/ast.jg")).Case;
var Let = (_require("//compiler/ast.jg")).Let;
var CNum = (_require("//compiler/ast.jg")).CNum;
var CStr = (_require("//compiler/ast.jg")).CStr;
var PVar = (_require("//compiler/ast.jg")).PVar;
var PConst = (_require("//compiler/ast.jg")).PConst;
var PData = (_require("//compiler/ast.jg")).PData;
var Module = (_require("//compiler/ast.jg")).Module;
var ModuleInterface = (_require("//compiler/ast.jg")).ModuleInterface;
var Data = (_require("//compiler/ast.jg")).Data;
var DataCon = (_require("//compiler/ast.jg")).DataCon;
var Class = (_require("//compiler/ast.jg")).Class;
var Instance = (_require("//compiler/ast.jg")).Instance;
var TCBound = (_require("//compiler/ast.jg")).TCBound;
var TConst = (_require("//compiler/ast.jg")).TConst;
var TVar = (_require("//compiler/ast.jg")).TVar;
var TApp = (_require("//compiler/ast.jg")).TApp;
var TBot = (_require("//compiler/ast.jg")).TBot;
var TForall = (_require("//compiler/ast.jg")).TForall;
var TUnknown = (_require("//compiler/ast.jg")).TUnknown;
var ImportOpen = (_require("//compiler/ast.jg")).ImportOpen;
var getType = (_require("//compiler/ast.jg")).getType;
var setType = (_require("//compiler/ast.jg")).setType;
var emptyAnn = (_require("//compiler/ast.jg")).emptyAnn;
var printType = (_require("//compiler/printer.jg")).printType;
var printTypeBound = (_require("//compiler/printer.jg")).printTypeBound;
var sccSorted = (_require("//compiler/graph.jg")).sccSorted;
var $ICtx = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="ICtx"};
var ICtx = function($0){
return function($1){
return function($2){
return new $ICtx($0,$1,$2)}}};
ICtx.$tag = "ICtx";
var $IEnv = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="IEnv"};
var IEnv = function($0){
return function($1){
return new $IEnv($0,$1)}};
IEnv.$tag = "IEnv";
var instanceToTypeBound = function(i){
return (function(){
var $pm = i;return ($pm.$tag==Instance.$tag)?((function(n,t){
return ((TCBound(emptyAnn))(n))(t)})($pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var f1 = function(a){
return function(b){
return ((TApp(emptyAnn))(((TApp(emptyAnn))((TConst(emptyAnn))("->")))(a)))(b)}};
var conType = function(dn){
return function(tvs){
return function(c){
return (function(){
var $pm = c;return ($pm.$tag==DataCon.$tag)?((function(n,ts){
return (Pair(n))((((TForall(emptyAnn))(tvs))(emptyArray))(((foldr(function(b){
return function(a){
return (f1(a))(b)}}))(((foldl(function(r){
return function(v){
return ((TApp(emptyAnn))(r))((TVar(emptyAnn))(v))}}))((TConst(emptyAnn))(dn)))(tvs)))(ts)))})($pm.$1,$pm.$2)):(error("pattern match fail"))})()}}};
var conTypes = function(d){
return (function(){
var $pm = d;return ($pm.$tag==Data.$tag)?((function(n,vs,cs){
return (map((conType(n))(vs)))(cs)})($pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var getTypedExports = function(m){
return (function(){
var $pm = m;return ($pm.$tag==Module.$tag)?((function(ts,cs,ins,ds){
return (function(){
var et = (concatMap(conTypes))(ts);var ed = (map(function(d){
return (Pair(fst(d)))(getType(snd(d)))}))(ds);var bs = ((foldl(function(es){
return function(e){
return ((set(fst(e)))(snd(e)))(es)}}))(empty))((concat(et))(ed));return ((ModuleInterface(bs))(cs))((map(instanceToTypeBound))(ins))})()})($pm.$2,$pm.$3,$pm.$4,$pm.$5)):(error("pattern match fail"))})()};
var newTVar = function(ctx){
return (function(){
var $pm = ctx;return ($pm.$tag==ICtx.$tag)?((function(subs,bs,i){
return (function(){
var n = ($concat("$"))(intToString(i));return (Pair(((ICtx(subs))(bs))(($add(i))(1))))((TVar(emptyAnn))(n))})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var getSubs = function(ctx){
return (function(){
var $pm = ctx;return ($pm.$tag==ICtx.$tag)?((function(subs){
return subs})($pm.$0)):(error("pattern match fail"))})()};
var applySubs = function(subs){
return function(t){
return (function(){
var $pm = t;return ($pm.$tag==TForall.$tag)?((function(ann,vs,bs,t){
return (function(){
var subs2 = ((foldl(function(s){
return function(v){
return (del(v))(s)}}))(subs))(vs);return (((TForall(ann))(vs))((map(applySubsBound(subs2)))(bs)))((applySubs(subs2))(t))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(($pm.$tag==TVar.$tag)?((function(v){
return (function(){
var $pm = (has(v))(subs);return (!$pm)?((function(){
return t})()):($pm?((function(){
return (get(v))(subs)})()):(error("pattern match fail")))})()})($pm.$1)):(($pm.$tag==TApp.$tag)?((function(ann,f,a){
return ((TApp(ann))((applySubs(subs))(f)))((applySubs(subs))(a))})($pm.$0,$pm.$1,$pm.$2)):((function(){
return t})())))})()}};
var applySubsBound = function(subs){
return function(b){
return (function(){
var $pm = b;return ($pm.$tag==TCBound.$tag)?((function(ann,n,t){
return ((TCBound(ann))(n))((applySubs(subs))(t))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var setSubs = function(subs){
return function(ctx){
return (function(){
var $pm = ctx;return ($pm.$tag==ICtx.$tag)?((function(bs,i){
return ((ICtx(subs))((map(applySubsBound(subs)))(bs)))(i)})($pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var getBinding = function(n){
return function(env){
return (function(){
var $pm = env;return ($pm.$tag==IEnv.$tag)?((function(bs){
return (get(n))(bs)})($pm.$0)):(error("pattern match fail"))})()}};
var hasBinding = function(n){
return function(env){
return (function(){
var $pm = env;return ($pm.$tag==IEnv.$tag)?((function(bs){
return (has(n))(bs)})($pm.$0)):(error("pattern match fail"))})()}};
var addBinding = function(n){
return function(t){
return function(env){
return (function(){
var $pm = env;return ($pm.$tag==IEnv.$tag)?((function(bs,ts){
return (IEnv(((set(n))(t))(bs)))(ts)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}};
var addBindings = function(nbs){
return function(env){
return (function(){
var $pm = env;return ($pm.$tag==IEnv.$tag)?((function(bs,ts){
return (IEnv((merge(bs))(nbs)))(ts)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};
var applySubsEnv = function(subs){
return function(env){
return (function(){
var $pm = env;return ($pm.$tag==IEnv.$tag)?((function(bs,ts){
return (IEnv((mapRecord(applySubs(subs)))(bs)))(ts)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};
var addBound = function(b){
return function(ctx){
return (function(){
var $pm = ctx;return ($pm.$tag==ICtx.$tag)?((function(subs,bs,i){
return ((ICtx(subs))((push(b))(bs)))(i)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var instantiate = function(ctx){
return function(t){
return (function(){
var mkvar = function(cs){
return function(v){
return (function(){
var $pm = cs;return ($pm.$tag==Pair.$tag)?((function(ctx,subs){
return (function(){
var $pm = newTVar(ctx);return ($pm.$tag==Pair.$tag)?((function(ctx2,tv){
return (Pair(ctx2))(((set(v))(tv))(subs))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};return (function(){
var $pm = t;return ($pm.$tag==TForall.$tag)?((function(vs,bs,t){
return (function(){
var $pm = ((foldl(mkvar))((Pair(ctx))(empty)))(vs);return ($pm.$tag==Pair.$tag)?((function(ctx2,subs){
return (function(){
var bs2 = (map(applySubsBound(subs)))(bs);var ctx3 = ((foldl(function(ctx){
return function(b){
return (addBound(b))(ctx)}}))(ctx2))(bs2);var t2 = (applySubs(subs))(t);return (Pair(ctx3))(t2)})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$1,$pm.$2,$pm.$3)):((function(){
return (Pair(ctx))(t)})())})()})()}};
var freeTVars = function(t){
return (function(){
var $pm = t;return ($pm.$tag==TVar.$tag)?((function(v){
return arr1(v)})($pm.$1)):(($pm.$tag==TBot.$tag)?((function(){
return emptyArray})()):(($pm.$tag==TUnknown.$tag)?((function(){
return emptyArray})()):(($pm.$tag==TConst.$tag)?((function(c){
return emptyArray})($pm.$1)):(($pm.$tag==TForall.$tag)?((function(vs,bs,t){
return (filter(function(n){
return not((contains(n))(vs))}))(((foldl(mergeSet))(freeTVars(t)))((map(freeTVarsInBound))(bs)))})($pm.$1,$pm.$2,$pm.$3)):(($pm.$tag==TApp.$tag)?((function(f,a){
return (mergeSet(freeTVars(f)))(freeTVars(a))})($pm.$1,$pm.$2)):(error("pattern match fail")))))))})()};
var freeTVarsInBound = function(b){
return (function(){
var $pm = b;return ($pm.$tag==TCBound.$tag)?((function(t){
return freeTVars(t)})($pm.$2)):(error("pattern match fail"))})()};
var substitute = function(n){
return function(s){
return function(t){
return (applySubs(((set(n))(s))(empty)))(t)}}};
var composeSubs = function(sa){
return function(sb){
return (function(){
var compose = function(subs){
return function(n){
return function(t){
return (function(){
var t2 = (applySubs(subs))(t);return (function(){
var $pm = (has(n))(subs);return (!$pm)?((function(){
return ((set(n))(t2))((mapRecord((substitute(n))(t2)))(subs))})()):($pm?((function(){
return (function(){
var msubs = (unify((get(n))(subs)))(t2);return (composeSubs(subs))(msubs)})()})()):(error("pattern match fail")))})()})()}}};return ((foldRecord(compose))(sa))(sb)})()}};
var unify = function(a){
return function(b){
return (function(){
var err = function(a){
return function(b){
return error(($concat(($concat(($concat("cannot unify "))(printType(a))))(" with ")))(printType(b)))}};var bind = function(n){
return function(t){
return (function(){
var $pm = t;return ($pm.$tag==TVar.$tag)?((function(m){
return (function(){
var $pm = ($eq(n))(m);return $pm?((function(){
return empty})()):((!$pm)?((function(){
return ((set(n))(t))(empty)})()):(error("pattern match fail")))})()})($pm.$1)):((function(){
return (function(){
var $pm = (contains(n))(freeTVars(t));return $pm?((function(){
return (function(){
var _ = 13;return error("occurs check failed")})()})()):((!$pm)?((function(){
return ((set(n))(t))(empty)})()):(error("pattern match fail")))})()})())})()}};return (function(){
var $pm = a;return ($pm.$tag==TVar.$tag)?((function(v){
return (bind(v))(b)})($pm.$1)):(($pm.$tag==TConst.$tag)?((function(ca){
return (function(){
var $pm = b;return ($pm.$tag==TConst.$tag)?((function(cb){
return (function(){
var $pm = ($eq(ca))(cb);return $pm?((function(){
return empty})()):((!$pm)?((function(){
return (err(a))(b)})()):(error("pattern match fail")))})()})($pm.$1)):(($pm.$tag==TVar.$tag)?((function(v){
return (bind(v))(a)})($pm.$1)):((function(){
return (err(a))(b)})()))})()})($pm.$1)):(($pm.$tag==TUnknown.$tag)?((function(){
return (err(a))(b)})()):(($pm.$tag==TBot.$tag)?((function(){
return (err(a))(b)})()):(($pm.$tag==TApp.$tag)?((function(fa,xa){
return (function(){
var $pm = b;return ($pm.$tag==TVar.$tag)?((function(v){
return (bind(v))(a)})($pm.$1)):(($pm.$tag==TApp.$tag)?((function(fb,xb){
return (function(){
var fsubs = (unify(fa))(fb);var xsubs = (unify((applySubs(fsubs))(xa)))((applySubs(fsubs))(xb));return (composeSubs(fsubs))(xsubs)})()})($pm.$1,$pm.$2)):((function(){
return (err(a))(b)})()))})()})($pm.$1,$pm.$2)):((function(){
return (err(a))(b)})())))))})()})()}};
var unrollDataConType = function(t){
return (function(){
var $pm = t;return (($pm.$tag==TApp.$tag)&&(($pm.$1.$tag==TApp.$tag)&&(($pm.$1.$1.$tag==TConst.$tag)&&("->"==$pm.$1.$1.$1))))?((function(a,b){
return (function(){
var $pm = unrollDataConType(b);return ($pm.$tag==Pair.$tag)?((function(ps,t){
return (Pair((enqueue(a))(ps)))(t)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$1.$2,$pm.$2)):((function(){
return (Pair(emptyArray))(t)})())})()};
var getBounds = function(ctx){
return (function(){
var $pm = ctx;return ($pm.$tag==ICtx.$tag)?((function(bs){
return bs})($pm.$1)):(error("pattern match fail"))})()};
var setBounds = function(bs){
return function(ctx){
return (function(){
var $pm = ctx;return ($pm.$tag==ICtx.$tag)?((function(subs,i){
return ((ICtx(subs))(bs))(i)})($pm.$0,$pm.$2)):(error("pattern match fail"))})()}};
var freeTVarsInEnv = function(env){
return (function(){
var $pm = env;return ($pm.$tag==IEnv.$tag)?((function(bs){
return ((foldRecord(function(vs){
return function(_){
return function(t){
return (concat(vs))(freeTVars(t))}}}))(emptyArray))(bs)})($pm.$0)):(error("pattern match fail"))})()};
var generalize = function(env){
return function(ctx){
return function(t){
return (function(){
var envTVars = freeTVarsInEnv(env);var subs = getSubs(ctx);var tvarsSubstitutingForEnvTVars = (function(){
var f = function(rs){
return function(v){
return function(t){
return (function(){
var $pm = (contains(v))(envTVars);return (!$pm)?((function(){
return rs})()):($pm?((function(){
return (concat(rs))(freeTVars(t))})()):(error("pattern match fail")))})()}}};return ((foldRecord(f))(emptyArray))(subs)})();var nonFree = (concat(envTVars))(tvarsSubstitutingForEnvTVars);var vs = (filter(function(v){
return not((contains(v))(nonFree))}))(freeTVars(t));var processBounds = function(vbb){
return function(b){
return (function(){
var $pm = vbb;return (($pm.$tag==Pair.$tag)&&($pm.$1.$tag==Pair.$tag))?((function(bvs,rbs,obs){
return (function(){
var boundVars = freeTVarsInBound(b);var sharedVars = (filter(function(v){
return (contains(v))(vs)}))(boundVars);return (function(){
var $pm = ($eq(length(sharedVars)))(0);return $pm?((function(){
return (Pair(bvs))((Pair(rbs))((push(b))(obs)))})()):((!$pm)?((function(){
return (function(){
var $pm = ($eq(length(sharedVars)))(length(boundVars));return $pm?((function(){
return (Pair(bvs))((Pair((push(b))(rbs)))(obs))})()):((!$pm)?((function(){
return (Pair((concat(bvs))(sharedVars)))((Pair(rbs))((push(b))(obs)))})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()})()})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()}};var vbb = ((foldl(processBounds))((Pair(emptyArray))((Pair(emptyArray))(emptyArray))))(getBounds(ctx));return (function(){
var $pm = vbb;return (($pm.$tag==Pair.$tag)&&($pm.$1.$tag==Pair.$tag))?((function(bvs,rbs,obs){
return (function(){
var finalVars = (filter(function(v){
return not((contains(v))(bvs))}))(vs);return (function(){
var $pm = ($or(($gt(length(finalVars)))(0)))(($gt(length(rbs)))(0));return $pm?((function(){
return (Pair((setBounds(obs))(ctx)))((((TForall(emptyAnn))(finalVars))(rbs))(t))})()):((!$pm)?((function(){
return (Pair((setBounds(obs))(ctx)))(t)})()):(error("pattern match fail")))})()})()})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()})()}}};
var getInstances = function(env){
return (function(){
var $pm = env;return ($pm.$tag==IEnv.$tag)?((function(ts){
return ts})($pm.$1)):(error("pattern match fail"))})()};
var satisfies = function(a){
return function(b){
return (function(){
var $pm = a;return ($pm.$tag==TVar.$tag)?((function(){
return true})()):(($pm.$tag==TConst.$tag)?((function(c){
return (function(){
var $pm = b;return ($pm.$tag==TConst.$tag)?((function(c2){
return ($eq(c))(c2)})($pm.$1)):((function(){
return false})())})()})($pm.$1)):(($pm.$tag==TApp.$tag)?((function(fa,xa){
return (function(){
var $pm = b;return ($pm.$tag==TApp.$tag)?((function(fb,xb){
return ($and((satisfies(fa))(fb)))((satisfies(xa))(xb))})($pm.$1,$pm.$2)):((function(){
return false})())})()})($pm.$1,$pm.$2)):((function(){
return error(($concat("unexpected type in satisfies "))(printType(a)))})())))})()}};
var satisfiesBound = function(a){
return function(b){
return (function(){
var $pm = a;return ($pm.$tag==TCBound.$tag)?((function(na,ta){
return (function(){
var $pm = b;return ($pm.$tag==TCBound.$tag)?((function(nb,tb){
return ($and(($eq(na))(nb)))((satisfies(ta))(tb))})($pm.$1,$pm.$2)):(error("pattern match fail"))})()})($pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var dropSatisfiedBounds = function(env){
return function(ctx){
return (function(){
var is = getInstances(env);var bs = getBounds(ctx);var bs2 = (filter(function(b){
return not((exists(function(i){
return (satisfiesBound(i))(b)}))(is))}))(bs);return (setBounds(bs2))(ctx)})()}};
var dropNonEnvSubs = function(env){
return function(subs){
return (function(){
var ftv = freeTVarsInEnv(env);var drop = function(subs){
return function(v){
return function(t){
return (function(){
var $pm = (contains(v))(ftv);return (!$pm)?((function(){
return subs})()):($pm?((function(){
return ((set(v))(t))(subs)})()):(error("pattern match fail")))})()}}};return ((foldRecord(drop))(empty))(subs)})()}};
var applySubsDef = function(subs){
return function(d){
return (function(){
var $pm = d;return ($pm.$tag==Pair.$tag)?((function(n,e){
return (Pair(n))((applySubsE(subs))(e))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};
var applySubsE = function(subs){
return function(e){
return (function(){
var applySubsCase = function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(pat,e){
return (Pair(pat))((applySubsE(subs))(e))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return (function(){
var $pm = e;return (($pm.$tag==Var.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,v){
return (Var(Ann((applySubs(subs))(t))))(v)})($pm.$0.$0,$pm.$1)):((($pm.$tag==Const.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,c){
return (Const(Ann((applySubs(subs))(t))))(c)})($pm.$0.$0,$pm.$1)):((($pm.$tag==App.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,f,a){
return ((App(Ann((applySubs(subs))(t))))((applySubsE(subs))(f)))((applySubsE(subs))(a))})($pm.$0.$0,$pm.$1,$pm.$2)):((($pm.$tag==Lam.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,p,b){
return ((Lam(Ann((applySubs(subs))(t))))(p))((applySubsE(subs))(b))})($pm.$0.$0,$pm.$1,$pm.$2)):((($pm.$tag==Case.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,e,ps){
return ((Case(Ann((applySubs(subs))(t))))((applySubsE(subs))(e)))((map(applySubsCase))(ps))})($pm.$0.$0,$pm.$1,$pm.$2)):((($pm.$tag==Let.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,ds,e){
return ((Let(Ann((applySubs(subs))(t))))((map(applySubsDef(subs)))(ds)))((applySubsE(subs))(e))})($pm.$0.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))))})()})()}};
var freeVars = function(e){
return (function(){
var namesInPat = function(p){
return (function(){
var $pm = p;return ($pm.$tag==PVar.$tag)?((function(v){
return arr1(v)})($pm.$1)):(($pm.$tag==PConst.$tag)?((function(c){
return emptyArray})($pm.$1)):(($pm.$tag==PData.$tag)?((function(n,ps){
return ((foldl(mergeSet))(emptyArray))((map(namesInPat))(ps))})($pm.$1,$pm.$2)):(error("pattern match fail"))))})()};var freeVarsInPData = function(p){
return (function(){
var $pm = p;return ($pm.$tag==PData.$tag)?((function(n,ps){
return ((foldl(mergeSet))(arr1(n)))((map(freeVarsInPData))(ps))})($pm.$1,$pm.$2)):((function(){
return emptyArray})())})()};var freeVarsInPat = function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(pat,e){
return (mergeSet((filter(function(v){
return not((contains(v))(namesInPat(pat)))}))(freeVars(e))))(freeVarsInPData(pat))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return (function(){
var $pm = e;return ($pm.$tag==Var.$tag)?((function(v){
return arr1(v)})($pm.$1)):(($pm.$tag==Const.$tag)?((function(c){
return emptyArray})($pm.$1)):(($pm.$tag==App.$tag)?((function(f,x){
return (mergeSet(freeVars(f)))(freeVars(x))})($pm.$1,$pm.$2)):(($pm.$tag==Lam.$tag)?((function(p,b){
return (filter(function(v){
return ($neq(v))(p)}))(freeVars(b))})($pm.$1,$pm.$2)):(($pm.$tag==Case.$tag)?((function(e,ps){
return ((foldl(mergeSet))(freeVars(e)))((map(freeVarsInPat))(ps))})($pm.$1,$pm.$2)):(($pm.$tag==Let.$tag)?((function(ds,e){
return (filter(function(v){
return not((contains(v))((map(fst))(ds)))}))(((foldl(mergeSet))(freeVars(e)))((map(function(d){
return freeVars(snd(d))}))(ds)))})($pm.$1,$pm.$2)):(error("pattern match fail")))))))})()})()};
var infer = function(env){
return function(ctx){
return function(e){
return (function(){
var inferPat = function(env){
return function(ctx){
return function(te){
return function(pat){
return (function(){
var $pm = pat;return ($pm.$tag==PVar.$tag)?((function(v){
return (function(){
var $pm = newTVar(ctx);return ($pm.$tag==Pair.$tag)?((function(ctx2,tv){
return (function(){
var usubs = (unify(te))(tv);var subs2 = (composeSubs(getSubs(ctx2)))(usubs);var tv2 = (applySubs(subs2))(tv);return (Pair((Pair((setSubs(subs2))(ctx2)))(((set(v))(tv2))(empty))))((PVar(Ann(tv2)))(v))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$1)):((($pm.$tag==PConst.$tag)&&($pm.$1.$tag==CNum.$tag))?((function(n){
return (function(){
var usubs = (unify(te))((TConst(emptyAnn))("Number"));var subs2 = (composeSubs(getSubs(ctx)))(usubs);return (Pair((Pair((setSubs(subs2))(ctx)))(empty)))(pat)})()})($pm.$1.$0)):((($pm.$tag==PConst.$tag)&&($pm.$1.$tag==CStr.$tag))?((function(s){
return (function(){
var usubs = (unify(te))((TConst(emptyAnn))("String"));var subs2 = (composeSubs(getSubs(ctx)))(usubs);return (Pair((Pair((setSubs(subs2))(ctx)))(empty)))(pat)})()})($pm.$1.$0)):(($pm.$tag==PData.$tag)?((function(ann,n,ps){
return (function(){
var $pm = (hasBinding(n))(env);return (!$pm)?((function(){
return error(($concat("unknown data type "))(n))})()):($pm?((function(){
return (function(){
var $pm = (instantiate(ctx))((getBinding(n))(env));return ($pm.$tag==Pair.$tag)?((function(ctx2,t){
return (function(){
var $pm = unrollDataConType(t);return ($pm.$tag==Pair.$tag)?((function(tps,dt){
return (function(){
var $pm = ($eq(length(ps)))(length(tps));return (!$pm)?((function(){
return error("number of pattern params does not match the number of constructor params")})()):($pm?((function(){
return (function(){
var $pm = ((foldl(inferSubPat(env)))((Pair((Pair(ctx2))(empty)))(emptyArray)))((zip(ps))(tps));return (($pm.$tag==Pair.$tag)&&($pm.$0.$tag==Pair.$tag))?((function(ctx3,bs,ps){
return (function(){
var usubs = (unify(te))((applySubs(getSubs(ctx3)))(dt));var subs = (composeSubs(getSubs(ctx3)))(usubs);return (Pair((Pair((setSubs(subs))(ctx3)))((mapRecord(applySubs(subs)))(bs))))(((PData(ann))(n))(ps))})()})($pm.$0.$0,$pm.$0.$1,$pm.$1)):(error("pattern match fail"))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))})()}}}};var inferSubPat = function(env){
return function(cbp){
return function(pt){
return (function(){
var $pm = cbp;return (($pm.$tag==Pair.$tag)&&($pm.$0.$tag==Pair.$tag))?((function(ctx,bs,ps){
return (function(){
var $pm = pt;return ($pm.$tag==Pair.$tag)?((function(pat,t){
return (function(){
var $pm = (((inferPat(env))(ctx))(t))(pat);return (($pm.$tag==Pair.$tag)&&($pm.$0.$tag==Pair.$tag))?((function(ctx2,bs2,pat){
return (Pair((Pair(ctx2))((merge(bs))(bs2))))((push(pat))(ps))})($pm.$0.$0,$pm.$0.$1,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0.$0,$pm.$0.$1,$pm.$1)):(error("pattern match fail"))})()}}};var inferCase = function(env){
return function(cps){
return function(p){
return (function(){
var $pm = cps;return (($pm.$tag==Pair.$tag)&&($pm.$1.$tag==Pair.$tag))?((function(ctx,te,ps){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(pat,e){
return (function(){
var $pm = (((inferPat(env))(ctx))(te))(pat);return (($pm.$tag==Pair.$tag)&&($pm.$0.$tag==Pair.$tag))?((function(ctx2,bs,pat){
return (function(){
var subs = getSubs(ctx2);var bs2 = (mapRecord(applySubs(subs)))(bs);var te2 = (applySubs(subs))(te);return (function(){
var $pm = ((infer((addBindings(bs2))(env)))(ctx2))(e);return ($pm.$tag==Pair.$tag)?((function(ctx2,e2){
return (Pair(ctx2))((Pair(te2))((push((Pair(pat))(e2)))(ps)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()})($pm.$0.$0,$pm.$0.$1,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()}}};var setFinalType = function(ctx){
return function(t){
return function(e){
return (function(){
var $pm = getType(e);return ($pm.$tag==TUnknown.$tag)?((function(){
return (Pair(ctx))((setType(t))(e))})()):((function(te){
return (function(){
var subs = (composeSubs(getSubs(ctx)))((unify(t))(te));return (Pair((setSubs(subs))(ctx)))(e)})()})($pm))})()}}};return (function(){
var $pm = e;return (($pm.$tag==Const.$tag)&&($pm.$1.$tag==CNum.$tag))?((function(n){
return ((setFinalType(ctx))((TConst(emptyAnn))("Number")))(e)})($pm.$1.$0)):((($pm.$tag==Const.$tag)&&($pm.$1.$tag==CStr.$tag))?((function(s){
return ((setFinalType(ctx))((TConst(emptyAnn))("String")))(e)})($pm.$1.$0)):(($pm.$tag==Var.$tag)?((function(v){
return (function(){
var $pm = (hasBinding(v))(env);return (!$pm)?((function(){
return error(($concat(($concat("no var "))(v)))(" in environment"))})()):($pm?((function(){
return (function(){
var $pm = (instantiate(ctx))((getBinding(v))(env));return ($pm.$tag==Pair.$tag)?((function(ctx2,t){
return ((setFinalType(ctx2))(t))(e)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()):(error("pattern match fail")))})()})($pm.$1)):(($pm.$tag==Lam.$tag)?((function(ann,p,a){
return (function(){
var $pm = newTVar(ctx);return ($pm.$tag==Pair.$tag)?((function(ctx2,tv){
return (function(){
var $pm = ((infer(((addBinding(p))(tv))(env)))(ctx2))(a);return ($pm.$tag==Pair.$tag)?((function(ctx3,a2){
return ((setFinalType(ctx3))(((TApp(emptyAnn))(((TApp(emptyAnn))((TConst(emptyAnn))("->")))((applySubs(getSubs(ctx3)))(tv))))(getType(a2))))(((Lam(ann))(p))(a2))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==App.$tag)?((function(ann,f,a){
return (function(){
var $pm = newTVar(ctx);return ($pm.$tag==Pair.$tag)?((function(ctx2,tv){
return (function(){
var $pm = ((infer(env))(ctx2))(f);return ($pm.$tag==Pair.$tag)?((function(ctx3,f2){
return (function(){
var $pm = ((infer((applySubsEnv(getSubs(ctx3)))(env)))(ctx3))(a);return ($pm.$tag==Pair.$tag)?((function(ctx4,a2){
return (function(){
var subs2 = getSubs(ctx4);var tf = (applySubs(subs2))(getType(f2));var synth = (f1(getType(a2)))(tv);var usubs = (unify(tf))(synth);var subs3 = (composeSubs(subs2))(usubs);var t = (applySubs(subs3))(tv);return ((setFinalType((setSubs(subs3))(ctx4)))(t))(((App(ann))(f2))(a2))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==Case.$tag)?((function(ann,e,ps){
return (function(){
var $pm = ((infer(env))(ctx))(e);return ($pm.$tag==Pair.$tag)?((function(ctx2,e2){
return (function(){
var $pm = ((foldl(inferCase(env)))((Pair(ctx2))((Pair(getType(e2)))(emptyArray))))(ps);return (($pm.$tag==Pair.$tag)&&($pm.$1.$tag==Pair.$tag))?((function(ctx3,te,ps2){
return (function(){
var t = getType(snd(head(ps2)));var subs = ((foldl(composeSubs))(getSubs(ctx3)))((map(function(p){
return (unify(t))(getType(snd(p)))}))(ps2));return ((setFinalType((setSubs(subs))(ctx3)))((applySubs(subs))(t)))(((Case(ann))((setType(te))(e2)))(ps2))})()})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==Let.$tag)?((function(ann,ds,e){
return (function(){
var $pm = ((inferDefs(env))(ctx))(ds);return ($pm.$tag==Pair.$tag)?((function(ctx2,ds2){
return (function(){
var env2 = ((foldl(function(env){
return function(d){
return (function(){
var $pm = d;return ($pm.$tag==Pair.$tag)?((function(n,e){
return ((addBinding(n))(getType(e)))(env)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(env))(ds2);return (function(){
var $pm = ((infer(env2))(ctx2))(e);return ($pm.$tag==Pair.$tag)?((function(ctx3,e2){
return ((setFinalType(ctx3))(getType(e2)))(((Let(ann))(ds2))(e2))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):((function(){
return error("type inference not supported for this AST node")})())))))))})()})()}}};
var inferSccDefs = function(env){
return function(ctx){
return function(ds){
return (function(){
var generalizeDef = function(env){
return function(cr){
return function(d){
return (function(){
var $pm = cr;return ($pm.$tag==Pair.$tag)?((function(ctx,r){
return (function(){
var $pm = d;return ($pm.$tag==Pair.$tag)?((function(n,e){
return (function(){
var $pm = ((generalize(env))(ctx))(getType(e));return ($pm.$tag==Pair.$tag)?((function(ctx2,t){
return (Pair(ctx2))((push((Pair(n))((setType(t))(e))))(r))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}};var unifyDef = function(env){
return function(d){
return (function(){
var $pm = d;return ($pm.$tag==Pair.$tag)?((function(n,e){
return (unify(getType(e)))((getBinding(n))(env))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};var inferDef = function(env){
return function(cds){
return function(d){
return (function(){
var $pm = cds;return ($pm.$tag==Pair.$tag)?((function(ctx,ds){
return (function(){
var $pm = d;return ($pm.$tag==Pair.$tag)?((function(n,e){
return (function(){
var $pm = ((infer(env))(ctx))(e);return ($pm.$tag==Pair.$tag)?((function(ctx2,e2){
return (Pair(ctx2))((push((Pair(n))(e2)))(ds))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}};var generateTVar = function(ce){
return function(d){
return (function(){
var $pm = ce;return ($pm.$tag==Pair.$tag)?((function(ctx,env){
return (function(){
var $pm = d;return ($pm.$tag==Pair.$tag)?((function(n){
return (function(){
var $pm = newTVar(ctx);return ($pm.$tag==Pair.$tag)?((function(ctx2,tv){
return (Pair(ctx2))(((addBinding(n))(tv))(env))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};return (function(){
var $pm = ((foldl(generateTVar))((Pair(ctx))(env)))(ds);return ($pm.$tag==Pair.$tag)?((function(ctx2,env2){
return (function(){
var $pm = ((foldl(inferDef(env2)))((Pair(ctx2))(emptyArray)))(ds);return ($pm.$tag==Pair.$tag)?((function(ctx3,ds2){
return (function(){
var subs = getSubs(ctx3);var dsSubs = (map(unifyDef(env2)))(ds2);var subs2 = ((foldl(composeSubs))(subs))(dsSubs);var ds3 = (map(applySubsDef(subs2)))(ds2);var subs3 = (dropNonEnvSubs(env))(subs2);var ctx4 = (dropSatisfiedBounds(env))((setSubs(subs3))(ctx3));var cds = ((foldl(generalizeDef(env)))((Pair(ctx4))(emptyArray)))(ds3);return cds})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()}}};
var inferDefs = function(env){
return function(ctx){
return function(ds){
return (function(){
var infer = function(cr){
return function(cc){
return (function(){
var $pm = cr;return ($pm.$tag==Pair.$tag)?((function(ctx,rs){
return (function(){
var $pm = ((inferSccDefs(((foldl(function(env){
return function(r){
return ((addBinding(fst(r)))(getType(snd(r))))(env)}}))(env))(rs)))(ctx))((filter(function(d){
return (contains(fst(d)))(cc)}))(ds));return ($pm.$tag==Pair.$tag)?((function(ctx2,ds){
return (Pair(ctx2))((concat(rs))(ds))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};var ns = (map(fst))(ds);var g = ((foldl(function(g){
return function(d){
return (function(){
var $pm = d;return ($pm.$tag==Pair.$tag)?((function(n,e){
return ((set(n))((filter(function(v){
return ($and((contains(v))(ns)))(($neq(v))(n))}))(freeVars(e))))(g)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(empty))(ds);var ccs = sccSorted(g);return ((foldl(infer))((Pair(ctx))(emptyArray)))(ccs)})()}}};
var newCtx = ((ICtx(empty))(emptyArray))(1);
var inferInstance = function(env){
return function(cs){
return function(i){
return (function(){
var inferE = function(e){
return (function(){
var $pm = ((infer(env))(newCtx))(e);return ($pm.$tag==Pair.$tag)?((function(ctx,e2){
return (applySubsE(getSubs(ctx)))(e2)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return (function(){
var $pm = i;return ($pm.$tag==Instance.$tag)?((function(ann,n,it,ds){
return (function(){
var $pm = (find(function(c){
return (function(){
var $pm = c;return ($pm.$tag==Class.$tag)?((function(m){
return ($eq(n))(m)})($pm.$1)):(error("pattern match fail"))})()}))(cs);return ($pm.$tag==Nothing.$tag)?((function(){
return error(($concat("Cannot find clas "))(n))})()):((($pm.$tag==Just.$tag)&&($pm.$0.$tag==Class.$tag))?((function(v,bs){
return (function(){
var bs2 = ((foldl(function(bs){
return function(b){
return (function(){
var $pm = b;return ($pm.$tag==Pair.$tag)?((function(n,t){
return ((set(n))(((substitute(v))(it))(t)))(bs)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(empty))(bs);var ds2 = (map(function(d){
return (function(){
var $pm = d;return ($pm.$tag==Pair.$tag)?((function(dn,e){
return (Pair(dn))(inferE((setType((get(dn))(bs2)))(e)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(ds);return (((Instance(ann))(n))(it))(ds2)})()})($pm.$0.$2,$pm.$0.$3)):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()})()}}};
var classToBindings = function(c){
return (function(){
var $pm = c;return ($pm.$tag==Class.$tag)?((function(n,tv,bs){
return (function(){
var process = function(b){
return (function(){
var $pm = b;return ($pm.$tag==Pair.$tag)?((function(v,t){
return (function(){
var ftv = freeTVars(t);return (function(){
var $pm = (contains(tv))(ftv);return (!$pm)?((function(){
return error(($concat(($concat(($concat("invalid clas definition "))(n)))(", binding ")))(v))})()):($pm?((function(){
return (Pair(v))((((TForall(emptyAnn))(ftv))(arr1(((TCBound(emptyAnn))(n))((TVar(emptyAnn))(tv)))))(t))})()):(error("pattern match fail")))})()})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return (map(process))(bs)})()})($pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var emptyEnv = (IEnv(empty))(emptyArray);
var addInstance = function(b){
return function(env){
return (function(){
var $pm = env;return ($pm.$tag==IEnv.$tag)?((function(bs,ts){
return (IEnv(bs))((push(b))(ts))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};
var inferTypeModule = function(ms){
return function(m){
return (function(){
var checkForUnsatisfiedBounds = function(d){
return (function(){
var $pm = getType(snd(d));return ($pm.$tag==TForall.$tag)?((function(t){
return (function(){
var $pm = t;return (($pm.$tag==TApp.$tag)&&(($pm.$1.$tag==TApp.$tag)&&(($pm.$1.$1.$tag==TConst.$tag)&&("->"==$pm.$1.$1.$1))))?((function(){
return d})()):((function(){
return error(($concat(($concat(($concat("unsatisfied bounds in def of "))(fst(d))))(" :: ")))(printType(getType(snd(d)))))})())})()})($pm.$3)):((function(){
return d})())})()};var addIns = function(env){
return function(i){
return (addInstance(instanceToTypeBound(i)))(env)}};var addTypes = function(env){
return function(dt){
return ((foldl(function(env){
return function(c){
return (function(){
var $pm = c;return ($pm.$tag==Pair.$tag)?((function(n,t){
return ((addBinding(n))(t))(env)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(env))(conTypes(dt))}};var getFile = function(i){
return (function(){
var $pm = i;return ($pm.$tag==ImportOpen.$tag)?((function(f){
return f})($pm.$1)):(error("pattern match fail"))})()};var addClass = function(env){
return function(c){
return ((foldl(function(env){
return function(b){
return ((addBinding(fst(b)))(snd(b)))(env)}}))(env))(classToBindings(c))}};var addImports = function(env){
return function(i){
return (function(){
var $pm = (get(getFile(i)))(ms);return ($pm.$tag==ModuleInterface.$tag)?((function(bs,cs,is){
return (function(){
var env2 = (function(){
var $pm = i;return ($pm.$tag==ImportOpen.$tag)?((function(f,ns){
return ((foldl(function(env){
return function(n){
return (function(){
var $pm = n;return ($pm.$tag==Pair.$tag)?((function(n,a){
return ((addBinding(a))((get(n))(bs)))(env)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(env))(ns)})($pm.$1,$pm.$2)):(error("pattern match fail"))})();var env3 = ((foldl(addClass))(env2))(cs);var env4 = ((foldl(function(env){
return function(i){
return (addInstance(i))(env)}}))(env3))(is);return env4})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};return (function(){
var $pm = m;return ($pm.$tag==Module.$tag)?((function(ann,is,ts,cs,ins,ds){
return (function(){
var env = emptyEnv;var env2 = ((foldl(addImports))(env))(is);var env3 = ((foldl(addTypes))(env2))(ts);var env4 = ((foldl(addClass))(env3))(cs);var env5 = ((foldl(addIns))(env4))(ins);var ds2 = snd(((inferDefs(env5))(newCtx))(ds));var ds3 = (map(checkForUnsatisfiedBounds))(ds2);var env6 = ((foldl(function(env){
return function(d){
return (function(){
var $pm = d;return ($pm.$tag==Pair.$tag)?((function(n,e){
return ((addBinding(n))(getType(e)))(env)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(env5))(ds3);var ins2 = (map((inferInstance(env6))((concat(cs))((concatMap(function(i){
return (function(){
var $pm = (get(getFile(i)))(ms);return ($pm.$tag==ModuleInterface.$tag)?((function(cs){
return cs})($pm.$1)):(error("pattern match fail"))})()}))(is)))))(ins);return (((((Module(ann))(is))(ts))(cs))(ins2))(ds3)})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5)):(error("pattern match fail"))})()})()}};
var checkSubs = function(subs){
return (function(){
var rhs = ((foldRecord(function(rs){
return function(_){
return function(t){
return (concat(rs))(freeTVars(t))}}}))(emptyArray))(subs);var check = function(_){
return function(v){
return function(_){
return (function(){
var $pm = (contains(v))(rhs);return $pm?((function(){
return error(($concat(($concat("tvar "))(v)))(" appears both at LHS and RHS of subs"))})()):((!$pm)?((function(){
return true})()):(error("pattern match fail")))})()}}};return ((foldRecord(check))(true))(subs)})()};
var inferType = function(env){
return function(ctx){
return function(e){
return (function(){
var $pm = ((infer(env))(ctx))(e);return ($pm.$tag==Pair.$tag)?((function(ctx,e2){
return (applySubsE(getSubs(ctx)))(e2)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}};
var debugEnv = function(e){
return (function(){
var $pm = e;return ($pm.$tag==IEnv.$tag)?((function(bs,ts){
return (function(){
var _2 = debug((map(printTypeBound))(ts));var _ = debug((mapRecord(printType))(bs));return e})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var exports = {ICtx:ICtx,IEnv:IEnv,instanceToTypeBound:instanceToTypeBound,f1:f1,conType:conType,conTypes:conTypes,getTypedExports:getTypedExports,newTVar:newTVar,getSubs:getSubs,applySubs:applySubs,applySubsBound:applySubsBound,setSubs:setSubs,getBinding:getBinding,hasBinding:hasBinding,addBinding:addBinding,addBindings:addBindings,applySubsEnv:applySubsEnv,addBound:addBound,instantiate:instantiate,freeTVars:freeTVars,freeTVarsInBound:freeTVarsInBound,substitute:substitute,composeSubs:composeSubs,unify:unify,unrollDataConType:unrollDataConType,getBounds:getBounds,setBounds:setBounds,freeTVarsInEnv:freeTVarsInEnv,generalize:generalize,getInstances:getInstances,satisfies:satisfies,satisfiesBound:satisfiesBound,dropSatisfiedBounds:dropSatisfiedBounds,dropNonEnvSubs:dropNonEnvSubs,applySubsDef:applySubsDef,applySubsE:applySubsE,freeVars:freeVars,infer:infer,inferSccDefs:inferSccDefs,inferDefs:inferDefs,newCtx:newCtx,inferInstance:inferInstance,classToBindings:classToBindings,emptyEnv:emptyEnv,addInstance:addInstance,inferTypeModule:inferTypeModule,checkSubs:checkSubs,inferType:inferType,debugEnv:debugEnv}
return exports;})();
cache["//compiler/importNormalizer.jg"] = (function() {var get = (_require("./builtins.js")).get;
var keys = (_require("./builtins.js")).keys;
var emptyArray = (_require("./builtins.js")).emptyArray;
var enqueue = (_require("./builtins.js")).enqueue;
var map = (_require("./builtins.js")).map;
var filter = (_require("./builtins.js")).filter;
var foldl = (_require("./builtins.js")).foldl;
var error = (_require("./builtins.js")).error;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var snd = (_require("//compiler/prelude.jg")).snd;
var mergeSet = (_require("//compiler/prelude.jg")).mergeSet;
var contains = (_require("//compiler/prelude.jg")).contains;
var not = (_require("//compiler/prelude.jg")).not;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var Module = (_require("//compiler/ast.jg")).Module;
var ModuleInterface = (_require("//compiler/ast.jg")).ModuleInterface;
var Instance = (_require("//compiler/ast.jg")).Instance;
var ImportClosed = (_require("//compiler/ast.jg")).ImportClosed;
var ImportOpen = (_require("//compiler/ast.jg")).ImportOpen;
var ImportAll = (_require("//compiler/ast.jg")).ImportAll;
var emptyAnn = (_require("//compiler/ast.jg")).emptyAnn;
var freeVars = (_require("//compiler/typer.jg")).freeVars;
var normalize = function(ms){
return function(freeVars){
return function(i){
return (function(){
var $pm = i;return ($pm.$tag==ImportClosed.$tag)?((function(){
return error("closed imports not supported")})()):(($pm.$tag==ImportOpen.$tag)?((function(ann,f,ns){
return ((ImportOpen(ann))(f))((filter(function(n){
return (function(){
var $pm = n;return ($pm.$tag==Pair.$tag)?((function(n,a){
return (contains(a))(freeVars)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(ns))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==ImportAll.$tag)?((function(ann,f){
return (function(){
var $pm = (get(f))(ms);return ($pm.$tag==ModuleInterface.$tag)?((function(bs){
return ((ImportOpen(ann))(f))((filter(function(n){
return (function(){
var $pm = n;return ($pm.$tag==Pair.$tag)?((function(n,a){
return (contains(a))(freeVars)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((map(function(n){
return (Pair(n))(n)}))(keys(bs))))})($pm.$0)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))))})()}}};
var normalizeImports = function(ms){
return function(m){
return (function(){
var $pm = m;return ($pm.$tag==Module.$tag)?((function(ann,is,ds,cs,ins,vs){
return (function(){
var getFromDefs = function(ds){
return ((foldl(mergeSet))(emptyArray))((map(function(v){
return freeVars(snd(v))}))(ds))};var freeVarsInDefs = getFromDefs(vs);var freeVarsInIns = ((foldl(mergeSet))(emptyArray))((map(function(i){
return (function(){
var $pm = i;return ($pm.$tag==Instance.$tag)?((function(ds){
return getFromDefs(ds)})($pm.$3)):(error("pattern match fail"))})()}))(ins));var topLevelNames = emptyArray;var fvs = (filter(function(v){
return not((contains(v))(topLevelNames))}))((mergeSet(freeVarsInDefs))(freeVarsInIns));var is2 = (map((normalize(ms))(fvs)))((enqueue((ImportAll(emptyAnn))("./builtins.js")))(is));return (((((Module(ann))(is2))(ds))(cs))(ins))(vs)})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5)):(error("pattern match fail"))})()}};
var exports = {normalize:normalize,normalizeImports:normalizeImports}
return exports;})();
cache["//compiler/declasser.jg"] = (function() {var $add = (_require("./builtins.js")).$add;
var $gt = (_require("./builtins.js")).$gt;
var $neq = (_require("./builtins.js")).$neq;
var $concat = (_require("./builtins.js")).$concat;
var empty = (_require("./builtins.js")).empty;
var get = (_require("./builtins.js")).get;
var keys = (_require("./builtins.js")).keys;
var has = (_require("./builtins.js")).has;
var set = (_require("./builtins.js")).set;
var merge = (_require("./builtins.js")).merge;
var length = (_require("./builtins.js")).length;
var emptyArray = (_require("./builtins.js")).emptyArray;
var push = (_require("./builtins.js")).push;
var enqueue = (_require("./builtins.js")).enqueue;
var intToString = (_require("./builtins.js")).intToString;
var concat = (_require("./builtins.js")).concat;
var map = (_require("./builtins.js")).map;
var filter = (_require("./builtins.js")).filter;
var foldr = (_require("./builtins.js")).foldr;
var foldl = (_require("./builtins.js")).foldl;
var sort = (_require("./builtins.js")).sort;
var error = (_require("./builtins.js")).error;
var jsonStringify = (_require("./builtins.js")).jsonStringify;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var Just = (_require("//compiler/prelude.jg")).Just;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var Left = (_require("//compiler/prelude.jg")).Left;
var Right = (_require("//compiler/prelude.jg")).Right;
var snd = (_require("//compiler/prelude.jg")).snd;
var toRecord = (_require("//compiler/prelude.jg")).toRecord;
var tail = (_require("//compiler/prelude.jg")).tail;
var head = (_require("//compiler/prelude.jg")).head;
var arr1 = (_require("//compiler/prelude.jg")).arr1;
var concatMap = (_require("//compiler/prelude.jg")).concatMap;
var zipWithIndex = (_require("//compiler/prelude.jg")).zipWithIndex;
var find = (_require("//compiler/prelude.jg")).find;
var fst = (_require("//compiler/prelude.jg")).fst;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var Ann = (_require("//compiler/ast.jg")).Ann;
var Var = (_require("//compiler/ast.jg")).Var;
var App = (_require("//compiler/ast.jg")).App;
var Lam = (_require("//compiler/ast.jg")).Lam;
var Case = (_require("//compiler/ast.jg")).Case;
var Let = (_require("//compiler/ast.jg")).Let;
var PVar = (_require("//compiler/ast.jg")).PVar;
var PConst = (_require("//compiler/ast.jg")).PConst;
var PData = (_require("//compiler/ast.jg")).PData;
var Module = (_require("//compiler/ast.jg")).Module;
var ModuleInterface = (_require("//compiler/ast.jg")).ModuleInterface;
var Data = (_require("//compiler/ast.jg")).Data;
var DataCon = (_require("//compiler/ast.jg")).DataCon;
var Class = (_require("//compiler/ast.jg")).Class;
var Instance = (_require("//compiler/ast.jg")).Instance;
var TCBound = (_require("//compiler/ast.jg")).TCBound;
var TConst = (_require("//compiler/ast.jg")).TConst;
var TVar = (_require("//compiler/ast.jg")).TVar;
var TApp = (_require("//compiler/ast.jg")).TApp;
var TForall = (_require("//compiler/ast.jg")).TForall;
var TUnknown = (_require("//compiler/ast.jg")).TUnknown;
var ImportClosed = (_require("//compiler/ast.jg")).ImportClosed;
var ImportOpen = (_require("//compiler/ast.jg")).ImportOpen;
var ImportAll = (_require("//compiler/ast.jg")).ImportAll;
var breakableDownAndUp = (_require("//compiler/ast.jg")).breakableDownAndUp;
var getType = (_require("//compiler/ast.jg")).getType;
var setType = (_require("//compiler/ast.jg")).setType;
var emptyAnn = (_require("//compiler/ast.jg")).emptyAnn;
var classToBindings = (_require("//compiler/typer.jg")).classToBindings;
var conTypes = (_require("//compiler/typer.jg")).conTypes;
var unify = (_require("//compiler/typer.jg")).unify;
var applySubs = (_require("//compiler/typer.jg")).applySubs;
var applySubsBound = (_require("//compiler/typer.jg")).applySubsBound;
var instanceToTypeBound = (_require("//compiler/typer.jg")).instanceToTypeBound;
var satisfiesBound = (_require("//compiler/typer.jg")).satisfiesBound;
var $S = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="S"};
var S = function($0){
return function($1){
return function($2){
return new $S($0,$1,$2)}}};
S.$tag = "S";
var setEnv = function(env){
return function(s){
return (function(){
var $pm = s;return ($pm.$tag==S.$tag)?((function(is,n){
return ((S(env))(is))(n)})($pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var instanceNameFromBound = function(ix){
return function(b){
return (function(){
var $pm = b;return ($pm.$tag==TCBound.$tag)?((function(n){
return ($concat(($concat(($concat("local$instance$"))(n)))("$")))(intToString(ix))})($pm.$1)):(error("pattern match fail"))})()}};
var getEnv = function(s){
return (function(){
var $pm = s;return ($pm.$tag==S.$tag)?((function(env){
return env})($pm.$0)):(error("pattern match fail"))})()};
var breakableDownAndUpWithEnv = function(getEnv){
return function(setEnv){
return function(down){
return function(up){
return function(a){
return function(e){
return (function(){
var exitScope = function(a){
return (setEnv(tail(getEnv(a))))(a)};var processUp = function(a){
return function(e){
return (function(){
var a2 = (function(){
var $pm = e;return ($pm.$tag==Lam.$tag)?((function(){
return exitScope(a)})()):(($pm.$tag==Let.$tag)?((function(){
return exitScope(a)})()):((function(){
return a})()))})();return (up(a2))(e)})()}};var patBindings = function(p){
return (function(){
var $pm = p;return ($pm.$tag==PConst.$tag)?((function(){
return empty})()):((($pm.$tag==PVar.$tag)&&($pm.$0.$tag==Ann.$tag))?((function(t,v){
return ((set(v))(t))(empty)})($pm.$0.$0,$pm.$1)):(($pm.$tag==PData.$tag)?((function(ps){
return ((foldr(function(env){
return function(p){
return (merge(patBindings(p)))(env)}}))(empty))(ps)})($pm.$2)):(error("pattern match fail"))))})()};var enterScope = function(bs){
return function(a){
return (function(){
var es = getEnv(a);var e = (merge(head(es)))(bs);return (setEnv((enqueue(e))(es)))(a)})()}};var go = function(a){
return function(e){
return (((breakableDownAndUp(processDown))(processUp))(a))(e)}};var processDown = function(a){
return function(e){
return (function(){
var $pm = (down(a))(e);return ($pm.$tag==Right.$tag)?((function(ae){
return Right(ae)})($pm.$0)):((($pm.$tag==Left.$tag)&&($pm.$0.$tag==Pair.$tag))?((function(a,e){
return (function(){
var $pm = e;return ($pm.$tag==Lam.$tag)?((function(p,b){
return (function(){
var t = (function(){
var $pm = getType(e);return (($pm.$tag==TApp.$tag)&&(($pm.$1.$tag==TApp.$tag)&&(($pm.$1.$1.$tag==TConst.$tag)&&("->"==$pm.$1.$1.$1))))?((function(t){
return t})($pm.$1.$2)):((($pm.$tag==TForall.$tag)&&(($pm.$3.$tag==TApp.$tag)&&(($pm.$3.$1.$tag==TApp.$tag)&&(($pm.$3.$1.$1.$tag==TConst.$tag)&&("->"==$pm.$3.$1.$1.$1)))))?((function(t){
return t})($pm.$3.$1.$2)):((function(){
return TUnknown(emptyAnn)})()))})();return Left((Pair((enterScope(((set(p))(t))(empty)))(a)))(e))})()})($pm.$1,$pm.$2)):(($pm.$tag==Let.$tag)?((function(bs){
return (function(){
var ts = ((foldl(function(ts){
return function(b){
return (function(){
var $pm = b;return ($pm.$tag==Pair.$tag)?((function(n,e){
return ((set(n))(getType(e)))(ts)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(empty))(bs);return Left((Pair((enterScope(ts))(a)))(e))})()})($pm.$1)):(($pm.$tag==Case.$tag)?((function(ann,e,ps){
return (function(){
var $pm = (go(a))(e);return ($pm.$tag==Pair.$tag)?((function(a,e){
return (function(){
var $pm = ((foldl(processPat))((Pair(a))(emptyArray)))(ps);return ($pm.$tag==Pair.$tag)?((function(a,ps){
return Right((Pair(a))(((Case(ann))(e))(ps)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):((function(){
return Left((Pair(a))(e))})())))})()})($pm.$0.$0,$pm.$0.$1)):(error("pattern match fail")))})()}};var processPat = function(ar){
return function(pat){
return (function(){
var $pm = ar;return ($pm.$tag==Pair.$tag)?((function(a,r){
return (function(){
var $pm = pat;return ($pm.$tag==Pair.$tag)?((function(pat,e){
return (function(){
var bs = patBindings(pat);return (function(){
var $pm = (go((enterScope(bs))(a)))(e);return ($pm.$tag==Pair.$tag)?((function(a,e){
return (Pair(exitScope(a)))((push((Pair(pat))(e)))(r))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};return (go(a))(e)})()}}}}}};
var addPrefix = function(p){
return function(t){
return (function(){
var $pm = t;return ($pm.$tag==TForall.$tag)?((function(ann,vs,bs,t){
return (function(){
var subs = ((foldl(function(subs){
return function(v){
return ((set(v))((TVar(emptyAnn))(($concat(p))(v))))(subs)}}))(empty))(vs);return (applySubs(subs))((((TForall(ann))((map(function(v){
return ($concat(p))(v)}))(vs)))(bs))(t))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):((function(){
return t})())})()}};
var rewriteExpr = function(is){
return function(env){
return function(e){
return (function(){
var fromEnv = function(n){
return function(envs){
return (function(){
var env = head(envs);return (function(){
var $pm = (has(n))(env);return (!$pm)?((function(){
return error(($concat(($concat(($concat("no "))(n)))(" in env ")))(jsonStringify(keys(env))))})()):($pm?((function(){
return (get(n))(env)})()):(error("pattern match fail")))})()})()}};var dropInstance = function(v){
return function(a){
return (function(){
var $pm = a;return ($pm.$tag==S.$tag)?((function(env,is,n){
return ((S(env))((filter(function(p){
return ($neq(fst(p)))(v)}))(is)))(n)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};var findMatching = function(b){
return function(a){
return (function(){
var $pm = a;return ($pm.$tag==S.$tag)?((function(is){
return (function(){
var $pm = (find(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(ib){
return (satisfiesBound(ib))(b)})($pm.$1)):(error("pattern match fail"))})()}))(is);return (($pm.$tag==Just.$tag)&&($pm.$0.$tag==Pair.$tag))?((function(n){
return n})($pm.$0.$0)):((function(){
return error("declasser failed to find satisfying instance")})())})()})($pm.$1)):(error("pattern match fail"))})()}};var requiredInstances = function(tv){
return function(td){
return (function(){
var $pm = (addPrefix("ins$"))(td);return ($pm.$tag==TForall.$tag)?((function(bs,t){
return (function(){
var subs = (unify(tv))(t);return (map(applySubsBound(subs)))(bs)})()})($pm.$2,$pm.$3)):((function(){
return emptyArray})())})()}};var rewriteVar = function(a){
return function(e){
return (function(){
var $pm = e;return ($pm.$tag==Var.$tag)?((function(v){
return (function(){
var $pm = getType(e);return ($pm.$tag==TForall.$tag)?((function(){
return (Pair(a))(e)})()):((function(tv){
return (function(){
var t = (fromEnv(v))(getEnv(a));var is = (requiredInstances(tv))(t);var mis = (map(function(b){
return (findMatching(b))(a)}))(is);var e2 = ((foldl(function(e){
return function(v){
return ((App(emptyAnn))(e))((Var(emptyAnn))(v))}}))(e))(mis);return (Pair(a))(e2)})()})($pm))})()})($pm.$1)):(($pm.$tag==Lam.$tag)?((function(p){
return (Pair((dropInstance(p))(a)))(e)})($pm.$1)):((function(){
return (Pair(a))(e)})()))})()}};var addInstance = function(b){
return function(a){
return (function(){
var $pm = a;return ($pm.$tag==S.$tag)?((function(env,is,n){
return (function(){
var name = (instanceNameFromBound(n))(b);return (Pair(((S(env))((push((Pair(name))(b)))(is)))(($add(n))(1))))(name)})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};var rewriteBound = function(ae){
return function(ib){
return (function(){
var $pm = ib;return ($pm.$tag==Pair.$tag)?((function(ix,b){
return (function(){
var $pm = ae;return ($pm.$tag==Pair.$tag)?((function(a,e){
return (function(){
var $pm = (addInstance(b))(a);return ($pm.$tag==Pair.$tag)?((function(a,name){
return (Pair(a))(((Lam(emptyAnn))(name))(e))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};var rewriteBounds = function(a){
return function(e){
return (function(){
var $pm = getType(e);return ($pm.$tag==TForall.$tag)?((function(bs,t){
return (function(){
var $pm = ($gt(length(bs)))(0);return (!$pm)?((function(){
return (Pair(a))(e)})()):($pm?((function(){
return ((foldr(rewriteBound))((Pair(a))((setType(t))(e))))(zipWithIndex(bs))})()):(error("pattern match fail")))})()})($pm.$2,$pm.$3)):((function(){
return (Pair(a))(e)})())})()}};return snd((((((breakableDownAndUpWithEnv(getEnv))(setEnv))(function(a){
return function(e){
return Left((rewriteBounds(a))(e))}}))(rewriteVar))(((S(arr1(env)))(is))(0)))(e))})()}}};
var instanceName = function(ix){
return function(i){
return (function(){
var $pm = i;return ($pm.$tag==Instance.$tag)?((function(n){
return ($concat(($concat(($concat("$instance$"))(n)))("$")))(intToString(ix))})($pm.$1)):(error("pattern match fail"))})()}};
var className = function(n){
return ($concat("$class$"))(n)};
var rewriteInstance = function(is){
return function(env){
return function(ix){
return function(i){
return (function(){
var $pm = i;return ($pm.$tag==Instance.$tag)?((function(n,bs){
return (function(){
var args = (map((rewriteExpr(is))(env)))((map(snd))(sort(bs)));var name = (instanceName(ix))(i);return (Pair(name))(((foldl(App(emptyAnn)))((Var(emptyAnn))(className(n))))(args))})()})($pm.$1,$pm.$3)):(error("pattern match fail"))})()}}}};
var instanceNameFromImport = function(imix){
return function(inix){
return function(b){
return (function(){
var $pm = b;return ($pm.$tag==TCBound.$tag)?((function(n){
return ($concat(($concat(($concat(($concat(($concat("$import"))(intToString(imix))))("$instance$")))(n)))("$")))(intToString(inix))})($pm.$1)):(error("pattern match fail"))})()}}};
var instanceName2 = function(ix){
return function(i){
return (function(){
var $pm = i;return ($pm.$tag==TCBound.$tag)?((function(n){
return ($concat(($concat(($concat("$instance$"))(n)))("$")))(intToString(ix))})($pm.$1)):(error("pattern match fail"))})()}};
var rewriteImportedBound = function(imix){
return function(nbs){
return function(ib){
return (function(){
var $pm = nbs;return ($pm.$tag==Pair.$tag)?((function(ns,bs){
return (function(){
var $pm = ib;return ($pm.$tag==Pair.$tag)?((function(inix,b){
return (function(){
var alias = ((instanceNameFromImport(imix))(inix))(b);var symbol = (instanceName2(inix))(b);return (Pair((push((Pair(symbol))(alias)))(ns)))((push((Pair(alias))(b)))(bs))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}};
var rewriteImportedInstances = function(ms){
return function(isi){
return function(ixi){
return (function(){
var $pm = isi;return ($pm.$tag==Pair.$tag)?((function(is,ibs){
return (function(){
var $pm = ixi;return (($pm.$tag==Pair.$tag)&&($pm.$1.$tag==ImportOpen.$tag))?((function(imix,ann,f,ns){
return (function(){
var $pm = (get(f))(ms);return ($pm.$tag==ModuleInterface.$tag)?((function(cs,bs){
return (function(){
var $pm = ((foldl(rewriteImportedBound(imix)))((Pair(emptyArray))(emptyArray)))(zipWithIndex(bs));return ($pm.$tag==Pair.$tag)?((function(nas,nbs){
return (function(){
var cns = (map(function(n){
return (Pair(n))(n)}))((concatMap(function(c){
return (function(){
var $pm = c;return ($pm.$tag==Class.$tag)?((function(n,bs){
return (enqueue(className(n)))((map(fst))(bs))})($pm.$1,$pm.$3)):(error("pattern match fail"))})()}))(cs));return (Pair((push(((ImportOpen(ann))(f))((concat(ns))((concat(nas))(cns)))))(is)))((concat(ibs))(nbs))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$1,$pm.$2)):(error("pattern match fail"))})()})($pm.$0,$pm.$1.$0,$pm.$1.$1,$pm.$1.$2)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}};
var className2 = function(c){
return (function(){
var $pm = c;return ($pm.$tag==Class.$tag)?((function(n){
return className(n)})($pm.$1)):(error("pattern match fail"))})()};
var rewriteClassToFun = function(c){
return (function(){
var $pm = c;return ($pm.$tag==Class.$tag)?((function(bs){
return (function(){
var name = className2(c);var bsForPat = (map(function(b){
return (PVar(emptyAnn))(fst(b))}))(sort(bs));var rewrite = function(b){
return (function(){
var $pm = b;return ($pm.$tag==Pair.$tag)?((function(n,t){
return (Pair(n))((setType(t))(((Lam(emptyAnn))("x"))(((Case(emptyAnn))((Var(emptyAnn))("x")))(arr1((Pair(((PData(emptyAnn))(name))(bsForPat)))((Var(emptyAnn))(n)))))))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return (map(rewrite))(classToBindings(c))})()})($pm.$3)):(error("pattern match fail"))})()};
var rewriteClassToData = function(c){
return (function(){
var $pm = c;return ($pm.$tag==Class.$tag)?((function(n,v){
return (function(){
var ps = (map(snd))(sort(classToBindings(c)));var name = className(n);return (((Data(emptyAnn))(name))(arr1(v)))(arr1(((DataCon(emptyAnn))(name))(ps)))})()})($pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var importsToTypeEnv = function(ms){
return function(is){
return (function(){
var getFile = function(i){
return (function(){
var $pm = i;return ($pm.$tag==ImportAll.$tag)?((function(f){
return f})($pm.$1)):(($pm.$tag==ImportOpen.$tag)?((function(f){
return f})($pm.$1)):(($pm.$tag==ImportClosed.$tag)?((function(f){
return f})($pm.$1)):(error("pattern match fail"))))})()};var addClass = function(env){
return function(c){
return ((foldl(function(env){
return function(b){
return ((set(fst(b)))(snd(b)))(env)}}))(env))(classToBindings(c))}};var addImports = function(env){
return function(i){
return (function(){
var $pm = (get(getFile(i)))(ms);return ($pm.$tag==ModuleInterface.$tag)?((function(bs,cs,is){
return (function(){
var env2 = (function(){
var $pm = i;return ($pm.$tag==ImportAll.$tag)?((function(f){
return (merge(env))(bs)})($pm.$1)):(($pm.$tag==ImportOpen.$tag)?((function(f,ns){
return ((foldl(function(env){
return function(n){
return (function(){
var $pm = n;return ($pm.$tag==Pair.$tag)?((function(n,a){
return ((set(a))((get(n))(bs)))(env)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(env))(ns)})($pm.$1,$pm.$2)):((function(){
return error("import type not supported in type inference")})()))})();var env3 = ((foldl(addClass))(env2))(cs);return env3})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};return ((foldl(addImports))(empty))((enqueue((ImportAll(emptyAnn))("./builtins.js")))(is))})()}};
var declassModule = function(ms){
return function(m){
return (function(){
var $pm = m;return ($pm.$tag==Module.$tag)?((function(ann,is,dt,cs,ins,ds){
return (function(){
var isi = ((foldl(rewriteImportedInstances(ms)))((Pair(emptyArray))(emptyArray)))(zipWithIndex(is));var importedInstances = snd(isi);var availableInstances = (concat(importedInstances))((map(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(ix,i){
return (Pair((instanceName(ix))(i)))(instanceToTypeBound(i))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(zipWithIndex(ins)));var classesAsData = (map(rewriteClassToData))(cs);var dt2 = (concat(dt))(classesAsData);var dataFuns = (concatMap(conTypes))(dt2);var classFuns = (concatMap(rewriteClassToFun))(cs);var env = ((foldl(function(env){
return function(b){
return (function(){
var $pm = b;return ($pm.$tag==Pair.$tag)?((function(v,e){
return ((set(v))(getType(e)))(env)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))((importsToTypeEnv(ms))(is)))((concat(classFuns))(ds));var env2 = (merge(env))(toRecord(dataFuns));var instancesAsDefs = (map(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(n,i){
return (((rewriteInstance(availableInstances))(env2))(n))(i)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(zipWithIndex(ins));var ds2 = (map(function(d){
return (Pair(fst(d)))(((rewriteExpr(availableInstances))(env2))(snd(d)))}))(ds);var is2 = fst(isi);return (((((Module(ann))(is2))(dt2))(cs))(ins))((concat(classFuns))((concat(instancesAsDefs))(ds2)))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5)):(error("pattern match fail"))})()}};
var exports = {S:S,setEnv:setEnv,instanceNameFromBound:instanceNameFromBound,getEnv:getEnv,breakableDownAndUpWithEnv:breakableDownAndUpWithEnv,addPrefix:addPrefix,rewriteExpr:rewriteExpr,instanceName:instanceName,className:className,rewriteInstance:rewriteInstance,instanceNameFromImport:instanceNameFromImport,instanceName2:instanceName2,rewriteImportedBound:rewriteImportedBound,rewriteImportedInstances:rewriteImportedInstances,className2:className2,rewriteClassToFun:rewriteClassToFun,rewriteClassToData:rewriteClassToData,importsToTypeEnv:importsToTypeEnv,declassModule:declassModule}
return exports;})();
cache["//compiler/args.jg"] = (function() {var $eq = (_require("./builtins.js")).$eq;
var $and = (_require("./builtins.js")).$and;
var $concat = (_require("./builtins.js")).$concat;
var empty = (_require("./builtins.js")).empty;
var get = (_require("./builtins.js")).get;
var getChar = (_require("./builtins.js")).getChar;
var has = (_require("./builtins.js")).has;
var set = (_require("./builtins.js")).set;
var match = (_require("./builtins.js")).match;
var drop = (_require("./builtins.js")).drop;
var emptyArray = (_require("./builtins.js")).emptyArray;
var push = (_require("./builtins.js")).push;
var map = (_require("./builtins.js")).map;
var foldl = (_require("./builtins.js")).foldl;
var error = (_require("./builtins.js")).error;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var Just = (_require("//compiler/prelude.jg")).Just;
var Nothing = (_require("//compiler/prelude.jg")).Nothing;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var contains = (_require("//compiler/prelude.jg")).contains;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var $ArgBool = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="ArgBool"};
var ArgBool = function($0){
return function($1){
return new $ArgBool($0,$1)}};
ArgBool.$tag = "ArgBool";
var $ArgString = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="ArgString"};
var ArgString = function($0){
return function($1){
return new $ArgString($0,$1)}};
ArgString.$tag = "ArgString";
var $ParsedArgs = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="ParsedArgs"};
var ParsedArgs = function($0){
return function($1){
return function($2){
return new $ParsedArgs($0,$1,$2)}}};
ParsedArgs.$tag = "ParsedArgs";
var getBool = function(p){
return function(def){
return (function(){
var $pm = p;return ($pm.$tag==ParsedArgs.$tag)?((function(r,dfs){
return (function(){
var $pm = (contains(def))(dfs);return (!$pm)?((function(){
return error("unrecognized arg that was not present for parsing")})()):($pm?((function(){
return (function(){
var $pm = def;return ($pm.$tag==ArgBool.$tag)?((function(n,defaultVal){
return (function(){
var $pm = (has(n))(r);return (!$pm)?((function(){
return (function(){
var $pm = defaultVal;return ($pm.$tag==Just.$tag)?((function(v){
return v})($pm.$0)):(($pm.$tag==Nothing.$tag)?((function(){
return error(($concat("no value for required arg "))(n))})()):(error("pattern match fail")))})()})()):($pm?((function(){
return (function(){
var $pm = (get(n))(r);return (""==$pm)?((function(){
return true})()):(("True"==$pm)?((function(){
return true})()):(("true"==$pm)?((function(){
return true})()):(("1"==$pm)?((function(){
return true})()):(("False"==$pm)?((function(){
return false})()):(("false"==$pm)?((function(){
return false})()):(("0"==$pm)?((function(){
return false})()):((function(v){
return error(($concat("invalid value for a bool argument: "))(v))})($pm))))))))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):((function(){
return error("arg is not a bool")})())})()})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var getString = function(p){
return function(def){
return (function(){
var $pm = p;return ($pm.$tag==ParsedArgs.$tag)?((function(r,dfs){
return (function(){
var $pm = (contains(def))(dfs);return (!$pm)?((function(){
return error("unrecognized arg that was not present for parsing")})()):($pm?((function(){
return (function(){
var $pm = def;return ($pm.$tag==ArgString.$tag)?((function(n,defaultVal){
return (function(){
var $pm = (has(n))(r);return (!$pm)?((function(){
return (function(){
var $pm = defaultVal;return ($pm.$tag==Just.$tag)?((function(v){
return v})($pm.$0)):(($pm.$tag==Nothing.$tag)?((function(){
return error(($concat("no value for required arg "))(n))})()):(error("pattern match fail")))})()})()):($pm?((function(){
return (get(n))(r)})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):((function(){
return error("arg is not a string")})())})()})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var getPositional = function(p){
return (function(){
var $pm = p;return ($pm.$tag==ParsedArgs.$tag)?((function(p,dfs){
return p})($pm.$0,$pm.$2)):(error("pattern match fail"))})()};
var argName = function(a){
return (function(){
var $pm = a;return ($pm.$tag==ArgBool.$tag)?((function(n){
return n})($pm.$0)):(($pm.$tag==ArgString.$tag)?((function(n){
return n})($pm.$0)):(error("pattern match fail")))})()};
var parseArgs = function(defs){
return function(argv){
return (function(){
var parse = function(r){
return function(arg){
return (function(){
var $pm = r;return ($pm.$tag==Pair.$tag)?((function(positional,args){
return (function(){
var $pm = ($and(($eq((getChar(0))(arg)))("-")))(($eq((getChar(1))(arg)))("-"));return (!$pm)?((function(){
return (Pair((push(arg))(positional)))(args)})()):($pm?((function(){
return (function(){
var value = (drop(1))((match("=.*"))(arg));var name = (match("[^=]+"))((drop(2))(arg));return (function(){
var $pm = (contains(name))((map(argName))(defs));return (!$pm)?((function(){
return error(($concat("unrecognized argument "))(arg))})()):($pm?((function(){
return (Pair(positional))(((set(name))(value))(args))})()):(error("pattern match fail")))})()})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};return (function(){
var $pm = ((foldl(parse))((Pair(emptyArray))(empty)))(argv);return ($pm.$tag==Pair.$tag)?((function(pos,args){
return ((ParsedArgs(pos))(args))(defs)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()}};
var exports = {ArgBool:ArgBool,ArgString:ArgString,ParsedArgs:ParsedArgs,getBool:getBool,getString:getString,getPositional:getPositional,argName:argName,parseArgs:parseArgs}
return exports;})();
cache["//compiler/js/ast.jg"] = (function() {var $JSRef = function($0){
this.$0=$0;this.$tag="JSRef"};
var JSRef = function($0){
return new $JSRef($0)};
JSRef.$tag = "JSRef";
var $JSIndex = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="JSIndex"};
var JSIndex = function($0){
return function($1){
return new $JSIndex($0,$1)}};
JSIndex.$tag = "JSIndex";
var $JSUnOp = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="JSUnOp"};
var JSUnOp = function($0){
return function($1){
return new $JSUnOp($0,$1)}};
JSUnOp.$tag = "JSUnOp";
var $JSBinOp = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="JSBinOp"};
var JSBinOp = function($0){
return function($1){
return function($2){
return new $JSBinOp($0,$1,$2)}}};
JSBinOp.$tag = "JSBinOp";
var $JSCall = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="JSCall"};
var JSCall = function($0){
return function($1){
return new $JSCall($0,$1)}};
JSCall.$tag = "JSCall";
var $JSFun = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="JSFun"};
var JSFun = function($0){
return function($1){
return new $JSFun($0,$1)}};
JSFun.$tag = "JSFun";
var $JSTernary = function($0,$1,$2){
this.$0=$0;this.$1=$1;this.$2=$2;this.$tag="JSTernary"};
var JSTernary = function($0){
return function($1){
return function($2){
return new $JSTernary($0,$1,$2)}}};
JSTernary.$tag = "JSTernary";
var $JSNum = function($0){
this.$0=$0;this.$tag="JSNum"};
var JSNum = function($0){
return new $JSNum($0)};
JSNum.$tag = "JSNum";
var $JSString = function($0){
this.$0=$0;this.$tag="JSString"};
var JSString = function($0){
return new $JSString($0)};
JSString.$tag = "JSString";
var $JSBool = function($0){
this.$0=$0;this.$tag="JSBool"};
var JSBool = function($0){
return new $JSBool($0)};
JSBool.$tag = "JSBool";
var $JSObject = function($0){
this.$0=$0;this.$tag="JSObject"};
var JSObject = function($0){
return new $JSObject($0)};
JSObject.$tag = "JSObject";
var $JSNull = function(){
this.$tag="JSNull"};
var JSNull = new $JSNull();
JSNull.$tag = "JSNull";
var $JSUndefined = function(){
this.$tag="JSUndefined"};
var JSUndefined = new $JSUndefined();
JSUndefined.$tag = "JSUndefined";
var $JSInstanceOf = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="JSInstanceOf"};
var JSInstanceOf = function($0){
return function($1){
return new $JSInstanceOf($0,$1)}};
JSInstanceOf.$tag = "JSInstanceOf";
var $JSNew = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="JSNew"};
var JSNew = function($0){
return function($1){
return new $JSNew($0,$1)}};
JSNew.$tag = "JSNew";
var $JSExpr = function($0){
this.$0=$0;this.$tag="JSExpr"};
var JSExpr = function($0){
return new $JSExpr($0)};
JSExpr.$tag = "JSExpr";
var $JSReturn = function($0){
this.$0=$0;this.$tag="JSReturn"};
var JSReturn = function($0){
return new $JSReturn($0)};
JSReturn.$tag = "JSReturn";
var $JSVar = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="JSVar"};
var JSVar = function($0){
return function($1){
return new $JSVar($0,$1)}};
JSVar.$tag = "JSVar";
var $JSSwitch = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="JSSwitch"};
var JSSwitch = function($0){
return function($1){
return new $JSSwitch($0,$1)}};
JSSwitch.$tag = "JSSwitch";
var $JSBreak = function(){
this.$tag="JSBreak"};
var JSBreak = new $JSBreak();
JSBreak.$tag = "JSBreak";
var $JSAssign = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="JSAssign"};
var JSAssign = function($0){
return function($1){
return new $JSAssign($0,$1)}};
JSAssign.$tag = "JSAssign";
var exports = {JSRef:JSRef,JSIndex:JSIndex,JSUnOp:JSUnOp,JSBinOp:JSBinOp,JSCall:JSCall,JSFun:JSFun,JSTernary:JSTernary,JSNum:JSNum,JSString:JSString,JSBool:JSBool,JSObject:JSObject,JSNull:JSNull,JSUndefined:JSUndefined,JSInstanceOf:JSInstanceOf,JSNew:JSNew,JSExpr:JSExpr,JSReturn:JSReturn,JSVar:JSVar,JSSwitch:JSSwitch,JSBreak:JSBreak,JSAssign:JSAssign}
return exports;})();
cache["//compiler/js/deadCode.jg"] = (function() {var map = (_require("./builtins.js")).map;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var JSIndex = (_require("//compiler/js/ast.jg")).JSIndex;
var JSBinOp = (_require("//compiler/js/ast.jg")).JSBinOp;
var JSCall = (_require("//compiler/js/ast.jg")).JSCall;
var JSFun = (_require("//compiler/js/ast.jg")).JSFun;
var JSTernary = (_require("//compiler/js/ast.jg")).JSTernary;
var JSBool = (_require("//compiler/js/ast.jg")).JSBool;
var JSObject = (_require("//compiler/js/ast.jg")).JSObject;
var JSInstanceOf = (_require("//compiler/js/ast.jg")).JSInstanceOf;
var JSNew = (_require("//compiler/js/ast.jg")).JSNew;
var JSExpr = (_require("//compiler/js/ast.jg")).JSExpr;
var JSReturn = (_require("//compiler/js/ast.jg")).JSReturn;
var JSVar = (_require("//compiler/js/ast.jg")).JSVar;
var JSAssign = (_require("//compiler/js/ast.jg")).JSAssign;
var tryDCE = function(e){
return (function(){
var $pm = e;return ((($pm.$tag==JSBinOp.$tag)&&("&&"==$pm.$0))&&(($pm.$1.$tag==JSBool.$tag)&&$pm.$1.$0))?((function(e){
return e})($pm.$2)):(((($pm.$tag==JSBinOp.$tag)&&("&&"==$pm.$0))&&(($pm.$2.$tag==JSBool.$tag)&&$pm.$2.$0))?((function(e){
return e})($pm.$1)):((($pm.$tag==JSTernary.$tag)&&(($pm.$0.$tag==JSBool.$tag)&&$pm.$0.$0))?((function(a,b){
return a})($pm.$1,$pm.$2)):((($pm.$tag==JSTernary.$tag)&&(($pm.$0.$tag==JSBool.$tag)&&(!$pm.$0.$0)))?((function(a,b){
return b})($pm.$1,$pm.$2)):((function(e){
return e})($pm)))))})()};
var rewriteDCE = function(e){
return (function(){
var $pm = e;return ($pm.$tag==JSIndex.$tag)?((function(xs,i){
return (JSIndex(rewriteDCE(xs)))(rewriteDCE(i))})($pm.$0,$pm.$1)):(($pm.$tag==JSBinOp.$tag)?((function(op,a,b){
return tryDCE(((JSBinOp(op))(rewriteDCE(a)))(rewriteDCE(b)))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==JSCall.$tag)?((function(f,xs){
return (JSCall(rewriteDCE(f)))((map(rewriteDCE))(xs))})($pm.$0,$pm.$1)):(($pm.$tag==JSFun.$tag)?((function(ps,bs){
return (JSFun(ps))((map(rewriteStmt))(bs))})($pm.$0,$pm.$1)):(($pm.$tag==JSTernary.$tag)?((function(b,x,y){
return tryDCE(((JSTernary(rewriteDCE(b)))(rewriteDCE(x)))(rewriteDCE(y)))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==JSObject.$tag)?((function(kvs){
return JSObject((map(function(kv){
return (function(){
var $pm = kv;return ($pm.$tag==Pair.$tag)?((function(k,v){
return (Pair(k))(rewriteDCE(v))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(kvs))})($pm.$0)):(($pm.$tag==JSInstanceOf.$tag)?((function(x,c){
return (JSInstanceOf(rewriteDCE(x)))(rewriteDCE(c))})($pm.$0,$pm.$1)):(($pm.$tag==JSNew.$tag)?((function(c,xs){
return (JSNew(rewriteDCE(c)))((map(rewriteDCE))(xs))})($pm.$0,$pm.$1)):((function(e){
return e})($pm)))))))))})()};
var rewriteStmt = function(s){
return (function(){
var $pm = s;return ($pm.$tag==JSExpr.$tag)?((function(e){
return JSExpr(rewriteDCE(e))})($pm.$0)):(($pm.$tag==JSReturn.$tag)?((function(e){
return JSReturn(rewriteDCE(e))})($pm.$0)):(($pm.$tag==JSVar.$tag)?((function(n,v){
return (JSVar(n))(rewriteDCE(v))})($pm.$0,$pm.$1)):(($pm.$tag==JSAssign.$tag)?((function(l,r){
return (JSAssign(rewriteDCE(l)))(rewriteDCE(r))})($pm.$0,$pm.$1)):((function(s){
return s})($pm)))))})()};
var exports = {tryDCE:tryDCE,rewriteDCE:rewriteDCE,rewriteStmt:rewriteStmt}
return exports;})();
cache["//compiler/js/printer.jg"] = (function() {var $concat = (_require("./builtins.js")).$concat;
var match = (_require("./builtins.js")).match;
var intercalate = (_require("./builtins.js")).intercalate;
var map = (_require("./builtins.js")).map;
var error = (_require("./builtins.js")).error;
var jsonStringify = (_require("./builtins.js")).jsonStringify;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var JSRef = (_require("//compiler/js/ast.jg")).JSRef;
var JSIndex = (_require("//compiler/js/ast.jg")).JSIndex;
var JSUnOp = (_require("//compiler/js/ast.jg")).JSUnOp;
var JSBinOp = (_require("//compiler/js/ast.jg")).JSBinOp;
var JSCall = (_require("//compiler/js/ast.jg")).JSCall;
var JSFun = (_require("//compiler/js/ast.jg")).JSFun;
var JSTernary = (_require("//compiler/js/ast.jg")).JSTernary;
var JSNum = (_require("//compiler/js/ast.jg")).JSNum;
var JSString = (_require("//compiler/js/ast.jg")).JSString;
var JSBool = (_require("//compiler/js/ast.jg")).JSBool;
var JSObject = (_require("//compiler/js/ast.jg")).JSObject;
var JSNull = (_require("//compiler/js/ast.jg")).JSNull;
var JSUndefined = (_require("//compiler/js/ast.jg")).JSUndefined;
var JSInstanceOf = (_require("//compiler/js/ast.jg")).JSInstanceOf;
var JSNew = (_require("//compiler/js/ast.jg")).JSNew;
var JSExpr = (_require("//compiler/js/ast.jg")).JSExpr;
var JSReturn = (_require("//compiler/js/ast.jg")).JSReturn;
var JSVar = (_require("//compiler/js/ast.jg")).JSVar;
var JSSwitch = (_require("//compiler/js/ast.jg")).JSSwitch;
var JSBreak = (_require("//compiler/js/ast.jg")).JSBreak;
var JSAssign = (_require("//compiler/js/ast.jg")).JSAssign;
var paren = function(s){
return ($concat(($concat("("))(s)))(")")};
var jsExprToString = function(e){
return (function(){
var $pm = e;return ($pm.$tag==JSNull.$tag)?((function(){
return "null"})()):(($pm.$tag==JSUndefined.$tag)?((function(){
return "undefined"})()):((($pm.$tag==JSBool.$tag)&&$pm.$0)?((function(){
return "true"})()):((($pm.$tag==JSBool.$tag)&&(!$pm.$0))?((function(){
return "false"})()):(($pm.$tag==JSNum.$tag)?((function(n){
return jsonStringify(n)})($pm.$0)):(($pm.$tag==JSString.$tag)?((function(s){
return jsonStringify(s)})($pm.$0)):((($pm.$tag==JSRef.$tag)&&("+"==$pm.$0))?((function(){
return "$add"})()):((($pm.$tag==JSRef.$tag)&&("-"==$pm.$0))?((function(){
return "$del"})()):((($pm.$tag==JSRef.$tag)&&("*"==$pm.$0))?((function(){
return "$mul"})()):((($pm.$tag==JSRef.$tag)&&("<"==$pm.$0))?((function(){
return "$lt"})()):((($pm.$tag==JSRef.$tag)&&(">"==$pm.$0))?((function(){
return "$gt"})()):((($pm.$tag==JSRef.$tag)&&("=="==$pm.$0))?((function(){
return "$eq"})()):((($pm.$tag==JSRef.$tag)&&("/="==$pm.$0))?((function(){
return "$neq"})()):((($pm.$tag==JSRef.$tag)&&("&&"==$pm.$0))?((function(){
return "$and"})()):((($pm.$tag==JSRef.$tag)&&("||"==$pm.$0))?((function(){
return "$or"})()):((($pm.$tag==JSRef.$tag)&&("++"==$pm.$0))?((function(){
return "$concat"})()):(($pm.$tag==JSRef.$tag)?((function(v){
return v})($pm.$0)):((($pm.$tag==JSIndex.$tag)&&($pm.$1.$tag==JSString.$tag))?((function(xs,i){
return (function(){
var $pm = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))(i);return (""==$pm)?((function(){
return ($concat(($concat(($concat(jsExprToParenString(xs)))("[")))(i)))("]")})()):((function(i){
return ($concat(($concat(jsExprToParenString(xs)))(".")))(i)})($pm))})()})($pm.$0,$pm.$1.$0)):(($pm.$tag==JSIndex.$tag)?((function(xs,i){
return ($concat(($concat(($concat(jsExprToParenString(xs)))("[")))(jsExprToString(i))))("]")})($pm.$0,$pm.$1)):(($pm.$tag==JSUnOp.$tag)?((function(op,e){
return ($concat(op))(jsExprToParenString(e))})($pm.$0,$pm.$1)):(($pm.$tag==JSBinOp.$tag)?((function(op,a,b){
return ($concat(($concat(jsExprToParenString(a)))(op)))(jsExprToParenString(b))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==JSCall.$tag)?((function(f,xs){
return ($concat(jsExprToParenString(f)))(paren((intercalate(","))((map(jsExprToString))(xs))))})($pm.$0,$pm.$1)):(($pm.$tag==JSNew.$tag)?((function(c,xs){
return ($concat(($concat("new "))(jsExprToParenString(c))))(paren((intercalate(","))((map(jsExprToString))(xs))))})($pm.$0,$pm.$1)):(($pm.$tag==JSFun.$tag)?((function(ps,bs){
return ($concat(($concat(($concat(($concat("function("))((intercalate(","))(ps))))("){\n")))((intercalate(";"))((map(jsStmtToString))(bs)))))("}")})($pm.$0,$pm.$1)):(($pm.$tag==JSTernary.$tag)?((function(b,x,y){
return ($concat(($concat(($concat(($concat(jsExprToParenString(b)))("?")))(jsExprToParenString(x))))(":")))(jsExprToParenString(y))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==JSObject.$tag)?((function(kvs){
return ($concat(($concat("{"))((intercalate(","))((map(keyValueToString))(kvs)))))("}")})($pm.$0)):(($pm.$tag==JSInstanceOf.$tag)?((function(x,c){
return ($concat(($concat(jsExprToParenString(x)))(" instanceof ")))(jsExprToParenString(c))})($pm.$0,$pm.$1)):((function(e){
return error(e)})($pm))))))))))))))))))))))))))))})()};
var jsExprToParenString = function(e){
return (function(){
var $pm = e;return ($pm.$tag==JSRef.$tag)?((function(r){
return jsExprToString(e)})($pm.$0)):(($pm.$tag==JSNum.$tag)?((function(n){
return jsExprToString(e)})($pm.$0)):(($pm.$tag==JSString.$tag)?((function(s){
return jsExprToString(e)})($pm.$0)):(($pm.$tag==JSBool.$tag)?((function(b){
return jsExprToString(e)})($pm.$0)):(($pm.$tag==JSIndex.$tag)?((function(xs,i){
return jsExprToString(e)})($pm.$0,$pm.$1)):(($pm.$tag==JSNew.$tag)?((function(c,xs){
return jsExprToString(e)})($pm.$0,$pm.$1)):(($pm.$tag==JSObject.$tag)?((function(kvs){
return jsExprToString(e)})($pm.$0)):((function(e){
return paren(jsExprToString(e))})($pm))))))))})()};
var keyValueToString = function(kv){
return (function(){
var $pm = kv;return ($pm.$tag==Pair.$tag)?((function(k,v){
return ($concat(($concat(k))(":")))(jsExprToString(v))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var jsStmtToString = function(s){
return (function(){
var $pm = s;return ($pm.$tag==JSExpr.$tag)?((function(e){
return jsExprToString(e)})($pm.$0)):(($pm.$tag==JSReturn.$tag)?((function(e){
return ($concat("return "))(jsExprToString(e))})($pm.$0)):(($pm.$tag==JSVar.$tag)?((function(v,e){
return ($concat(($concat(($concat("var "))(v)))(" = ")))(jsExprToString(e))})($pm.$0,$pm.$1)):(($pm.$tag==JSBreak.$tag)?((function(){
return "break"})()):(($pm.$tag==JSSwitch.$tag)?((function(e,cs){
return ($concat(($concat(($concat(($concat("switch"))(paren(jsExprToString(e)))))("{")))((intercalate(";\n"))((map(caseToString))(cs)))))("}")})($pm.$0,$pm.$1)):(($pm.$tag==JSAssign.$tag)?((function(l,r){
return ($concat(($concat(jsExprToParenString(l)))(" = ")))(jsExprToParenString(r))})($pm.$0,$pm.$1)):(error("pattern match fail")))))))})()};
var caseToString = function(c){
return (function(){
var $pm = c;return ($pm.$tag==Pair.$tag)?((function(m,ss){
return ($concat(($concat(($concat("case "))(paren(jsExprToString(m)))))(":\n  ")))((intercalate(";"))((map(jsStmtToString))(ss)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var exports = {paren:paren,jsExprToString:jsExprToString,jsExprToParenString:jsExprToParenString,keyValueToString:keyValueToString,jsStmtToString:jsStmtToString,caseToString:caseToString}
return exports;})();
cache["//compiler/js/jaguarToJs.jg"] = (function() {var $concat = (_require("./builtins.js")).$concat;
var emptyArray = (_require("./builtins.js")).emptyArray;
var push = (_require("./builtins.js")).push;
var intToString = (_require("./builtins.js")).intToString;
var concat = (_require("./builtins.js")).concat;
var map = (_require("./builtins.js")).map;
var foldr = (_require("./builtins.js")).foldr;
var foldl = (_require("./builtins.js")).foldl;
var error = (_require("./builtins.js")).error;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var strToArray = (_require("//compiler/prelude.jg")).strToArray;
var arr1 = (_require("//compiler/prelude.jg")).arr1;
var arr2 = (_require("//compiler/prelude.jg")).arr2;
var arr3 = (_require("//compiler/prelude.jg")).arr3;
var concatMap = (_require("//compiler/prelude.jg")).concatMap;
var zipWithIndex = (_require("//compiler/prelude.jg")).zipWithIndex;
var fst = (_require("//compiler/prelude.jg")).fst;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var Var = (_require("//compiler/ast.jg")).Var;
var Const = (_require("//compiler/ast.jg")).Const;
var App = (_require("//compiler/ast.jg")).App;
var Lam = (_require("//compiler/ast.jg")).Lam;
var Case = (_require("//compiler/ast.jg")).Case;
var Let = (_require("//compiler/ast.jg")).Let;
var CNum = (_require("//compiler/ast.jg")).CNum;
var CStr = (_require("//compiler/ast.jg")).CStr;
var PVar = (_require("//compiler/ast.jg")).PVar;
var PConst = (_require("//compiler/ast.jg")).PConst;
var PData = (_require("//compiler/ast.jg")).PData;
var Module = (_require("//compiler/ast.jg")).Module;
var Data = (_require("//compiler/ast.jg")).Data;
var DataCon = (_require("//compiler/ast.jg")).DataCon;
var ImportOpen = (_require("//compiler/ast.jg")).ImportOpen;
var getExports = (_require("//compiler/ast.jg")).getExports;
var JSRef = (_require("//compiler/js/ast.jg")).JSRef;
var JSIndex = (_require("//compiler/js/ast.jg")).JSIndex;
var JSUnOp = (_require("//compiler/js/ast.jg")).JSUnOp;
var JSBinOp = (_require("//compiler/js/ast.jg")).JSBinOp;
var JSCall = (_require("//compiler/js/ast.jg")).JSCall;
var JSFun = (_require("//compiler/js/ast.jg")).JSFun;
var JSTernary = (_require("//compiler/js/ast.jg")).JSTernary;
var JSNum = (_require("//compiler/js/ast.jg")).JSNum;
var JSString = (_require("//compiler/js/ast.jg")).JSString;
var JSBool = (_require("//compiler/js/ast.jg")).JSBool;
var JSObject = (_require("//compiler/js/ast.jg")).JSObject;
var JSNew = (_require("//compiler/js/ast.jg")).JSNew;
var JSExpr = (_require("//compiler/js/ast.jg")).JSExpr;
var JSReturn = (_require("//compiler/js/ast.jg")).JSReturn;
var JSVar = (_require("//compiler/js/ast.jg")).JSVar;
var JSAssign = (_require("//compiler/js/ast.jg")).JSAssign;
var opChar = function(c){
return (function(){
var $pm = c;return ("-"==$pm)?((function(){
return "$mns"})()):(("+"==$pm)?((function(){
return "$pls"})()):(("*"==$pm)?((function(){
return "$mul"})()):(("/"==$pm)?((function(){
return "$div"})()):(("="==$pm)?((function(){
return "$eq"})()):((":"==$pm)?((function(){
return "$col"})()):(("&"==$pm)?((function(){
return "$amp"})()):(("|"==$pm)?((function(){
return "$pip"})()):(("<"==$pm)?((function(){
return "$lt"})()):((">"==$pm)?((function(){
return "$gt"})()):(("^"==$pm)?((function(){
return "$rof"})()):((function(){
return c})())))))))))))})()};
var opName = function(op){
return (function(){
var $pm = op;return ("+"==$pm)?((function(){
return "$add"})()):(("-"==$pm)?((function(){
return "$del"})()):(("*"==$pm)?((function(){
return "$mul"})()):(("<"==$pm)?((function(){
return "$lt"})()):((">"==$pm)?((function(){
return "$gt"})()):(("=="==$pm)?((function(){
return "$eq"})()):(("/="==$pm)?((function(){
return "$neq"})()):(("&&"==$pm)?((function(){
return "$and"})()):(("||"==$pm)?((function(){
return "$or"})()):(("++"==$pm)?((function(){
return "$concat"})()):((function(nonOp){
return ((foldl(function(s){
return function(c){
return ($concat(s))(opChar(c))}}))(""))(strToArray(nonOp))})($pm)))))))))))})()};
var processPattern = function(pm){
return function(p){
return (function(){
var $pm = p;return (($pm.$tag==PVar.$tag)&&("_"==$pm.$1))?((function(){
return (Pair(JSBool(true)))((Pair(emptyArray))(emptyArray))})()):(($pm.$tag==PVar.$tag)?((function(v){
return (Pair(JSBool(true)))((Pair(arr1(opName(v))))(arr1(pm)))})($pm.$1)):((($pm.$tag==PConst.$tag)&&($pm.$1.$tag==CNum.$tag))?((function(n){
return (Pair(((JSBinOp("=="))(JSNum(n)))(pm)))((Pair(emptyArray))(emptyArray))})($pm.$1.$0)):((($pm.$tag==PConst.$tag)&&($pm.$1.$tag==CStr.$tag))?((function(s){
return (Pair(((JSBinOp("=="))(JSString(s)))(pm)))((Pair(emptyArray))(emptyArray))})($pm.$1.$0)):((($pm.$tag==PData.$tag)&&("True"==$pm.$1))?((function(ps){
return (Pair(pm))((Pair(emptyArray))(emptyArray))})($pm.$2)):((($pm.$tag==PData.$tag)&&("False"==$pm.$1))?((function(ps){
return (Pair((JSUnOp("!"))(pm)))((Pair(emptyArray))(emptyArray))})($pm.$2)):(($pm.$tag==PData.$tag)?((function(t,ps){
return ((foldl(function(a){
return function(b){
return (function(){
var $pm = a;return (($pm.$tag==Pair.$tag)&&($pm.$1.$tag==Pair.$tag))?((function(fa,na,va){
return (function(){
var $pm = b;return (($pm.$tag==Pair.$tag)&&($pm.$1.$tag==Pair.$tag))?((function(fb,nb,vb){
return (Pair(((JSBinOp("&&"))(fa))(fb)))((Pair((concat(na))(nb)))((concat(va))(vb)))})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()}}))((Pair(((JSBinOp("=="))((JSIndex(pm))(JSString("$tag"))))((JSIndex(JSRef(t)))(JSString("$tag")))))((Pair(emptyArray))(emptyArray))))((map(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(n,pat){
return (processPattern((JSIndex(pm))(JSString(($concat("$"))(intToString(n))))))(pat)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(zipWithIndex(ps)))})($pm.$1,$pm.$2)):((function(z){
return error("failure to match pattern during processing")})($pm))))))))})()}};
var jaguarExprToJsExpr = function(e){
return (function(){
var $pm = e;return (($pm.$tag==Var.$tag)&&("True"==$pm.$1))?((function(){
return JSBool(true)})()):((($pm.$tag==Var.$tag)&&("False"==$pm.$1))?((function(){
return JSBool(false)})()):(($pm.$tag==Var.$tag)?((function(v){
return JSRef(opName(v))})($pm.$1)):((($pm.$tag==Const.$tag)&&($pm.$1.$tag==CNum.$tag))?((function(n){
return JSNum(n)})($pm.$1.$0)):((($pm.$tag==Const.$tag)&&($pm.$1.$tag==CStr.$tag))?((function(s){
return JSString(s)})($pm.$1.$0)):(($pm.$tag==App.$tag)?((function(f,a){
return (JSCall(jaguarExprToJsExpr(f)))(arr1(jaguarExprToJsExpr(a)))})($pm.$1,$pm.$2)):(($pm.$tag==Lam.$tag)?((function(p,e){
return (JSFun(arr1(p)))(arr1(JSReturn(jaguarExprToJsExpr(e))))})($pm.$1,$pm.$2)):(($pm.$tag==Case.$tag)?((function(e,ps){
return (JSCall((JSFun(emptyArray))((arr2((JSVar("$pm"))(jaguarExprToJsExpr(e))))(JSReturn(((foldr(assemblePatternMatch))((JSCall(JSRef("error")))(arr1(JSString("pattern match fail")))))(ps))))))(emptyArray)})($pm.$1,$pm.$2)):(($pm.$tag==Let.$tag)?((function(ds,e){
return (JSCall((JSFun(emptyArray))((push(JSReturn(jaguarExprToJsExpr(e))))((map(defToJs))(ds)))))(emptyArray)})($pm.$1,$pm.$2)):(error("pattern match fail"))))))))))})()};
var assemblePatternMatch = function(alt){
return function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(pat,e){
return (function(){
var $pm = (processPattern(JSRef("$pm")))(pat);return (($pm.$tag==Pair.$tag)&&($pm.$1.$tag==Pair.$tag))?((function(f,ns,vs){
return ((JSTernary(f))((JSCall((JSFun(ns))(arr1(JSReturn(jaguarExprToJsExpr(e))))))(vs)))(alt)})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};
var defToJs = function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(n,e){
return (JSVar(opName(n)))(jaguarExprToJsExpr(e))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var requireExpr = function(f){
return (JSCall(JSRef("_require")))(arr1(JSString(f)))};
var buildImports = function(f){
return function(ns){
return (map(function(n){
return (function(){
var $pm = n;return ($pm.$tag==Pair.$tag)?((function(n,a){
return (JSVar(opName(a)))((JSIndex(requireExpr(f)))(JSString(opName(n))))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(ns)}};
var importToJs = function(importSymbols){
return function(i){
return (function(){
var $pm = i;return ($pm.$tag==ImportOpen.$tag)?((function(f,ns){
return (buildImports(f))(ns)})($pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var dataConFieldIds = function(ts){
return (map(function(p){
return ($concat("$"))(intToString(fst(p)))}))(zipWithIndex(ts))};
var dataConToJs = function(dc){
return (function(){
var $pm = dc;return ($pm.$tag==DataCon.$tag)?((function(n,ts){
return (function(){
var conName = ($concat("$"))(n);return ((arr3((JSVar(conName))((JSFun(dataConFieldIds(ts)))((push(JSExpr(((JSBinOp("="))((JSIndex(JSRef("this")))(JSString("$tag"))))(JSString(n)))))((map(function(f){
return JSExpr(((JSBinOp("="))((JSIndex(JSRef("this")))(JSString(f))))(JSRef(f)))}))(dataConFieldIds(ts)))))))((JSVar(n))(((foldr(function(b){
return function(f){
return (JSFun(arr1(f)))(arr1(JSReturn(b)))}}))((JSNew(JSRef(conName)))((map(JSRef))(dataConFieldIds(ts)))))(dataConFieldIds(ts)))))((JSAssign((JSIndex(JSRef(n)))(JSString("$tag"))))(JSString(n)))})()})($pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var dataToJs = function(d){
return (function(){
var $pm = d;return ($pm.$tag==Data.$tag)?((function(n,ps,cs){
return (concatMap(dataConToJs))(cs)})($pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var exportObject = function(m){
return JSObject((map(function(n){
return (Pair(opName(n)))(JSRef(opName(n)))}))(getExports(m)))};
var moduleToJs = function(importSymbols){
return function(m){
return (function(){
var $pm = m;return ($pm.$tag==Module.$tag)?((function(is,ds,cs,ins,vs){
return (function(){
var exportDef = (JSVar("exports"))(exportObject(m));var defs = (map(defToJs))(vs);var dataDefs = (concatMap(dataToJs))(ds);var imports = (concatMap(importToJs(importSymbols)))(is);return (push(exportDef))((concat(imports))((concat(dataDefs))(defs)))})()})($pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5)):(error("pattern match fail"))})()}};
var exports = {opChar:opChar,opName:opName,processPattern:processPattern,jaguarExprToJsExpr:jaguarExprToJsExpr,assemblePatternMatch:assemblePatternMatch,defToJs:defToJs,requireExpr:requireExpr,buildImports:buildImports,importToJs:importToJs,dataConFieldIds:dataConFieldIds,dataConToJs:dataConToJs,dataToJs:dataToJs,exportObject:exportObject,moduleToJs:moduleToJs}
return exports;})();
cache["//compiler/js/backend.jg"] = (function() {var $concat = (_require("./builtins.js")).$concat;
var intercalate = (_require("./builtins.js")).intercalate;
var map = (_require("./builtins.js")).map;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var join = (_require("//compiler/prelude.jg")).join;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var jaguarExprToJsExpr = (_require("//compiler/js/jaguarToJs.jg")).jaguarExprToJsExpr;
var moduleToJs = (_require("//compiler/js/jaguarToJs.jg")).moduleToJs;
var jsExprToString = (_require("//compiler/js/printer.jg")).jsExprToString;
var jsStmtToString = (_require("//compiler/js/printer.jg")).jsStmtToString;
var rewriteStmt = (_require("//compiler/js/deadCode.jg")).rewriteStmt;
var combineModules = function(mainName){
return function(builtinsPath){
return function(ms){
return (function(){
var runStmt = "if (module.exports.main)module.exports.main(process.argv)";var exportStmt = ($concat(($concat("module.exports = cache[\""))(mainName)))("\"]\n");var requireFun = ($concat(($concat(($concat(($concat(($concat("var cache = {}\n"))("function _require(f) {\n")))("  return cache[f] || require(f == \"./builtins.js\" ? process.cwd() + \"/\" + \"")))(builtinsPath)))("\" : f);\n")))("}\n");var wrapModule = function(nm){
return (function(){
var $pm = nm;return ($pm.$tag==Pair.$tag)?((function(n,m){
return ($concat(($concat(($concat(($concat("cache[\""))(n)))("\"] = (function() {")))(m)))("\nreturn exports;})();")})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return ($concat(($concat(($concat(requireFun))((intercalate("\n"))((map(wrapModule))(ms)))))(exportStmt)))(runStmt)})()}}};
var compileModule = function(importSymbols){
return function(m){
return (join((map(jsStmtToString))((map(rewriteStmt))((moduleToJs(importSymbols))(m)))))(";\n")}};
var compileExpr = function(e){
return jsExprToString(jaguarExprToJsExpr(e))};
var exports = {combineModules:combineModules,compileModule:compileModule,compileExpr:compileExpr}
return exports;})();
cache["//compiler/parsers.jg"] = (function() {var $concat = (_require("./builtins.js")).$concat;
var emptyArray = (_require("./builtins.js")).emptyArray;
var push = (_require("./builtins.js")).push;
var enqueue = (_require("./builtins.js")).enqueue;
var error = (_require("./builtins.js")).error;
var iterate = (_require("./builtins.js")).iterate;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var Just = (_require("//compiler/prelude.jg")).Just;
var Nothing = (_require("//compiler/prelude.jg")).Nothing;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var Left = (_require("//compiler/prelude.jg")).Left;
var Right = (_require("//compiler/prelude.jg")).Right;
var snd = (_require("//compiler/prelude.jg")).snd;
var fst = (_require("//compiler/prelude.jg")).fst;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var $Success = function($0,$1){
this.$0=$0;this.$1=$1;this.$tag="Success"};
var Success = function($0){
return function($1){
return new $Success($0,$1)}};
Success.$tag = "Success";
var $Error = function($0){
this.$0=$0;this.$tag="Error"};
var Error = function($0){
return new $Error($0)};
Error.$tag = "Error";
var $Parser = function($0){
this.$0=$0;this.$tag="Parser"};
var Parser = function($0){
return new $Parser($0)};
Parser.$tag = "Parser";
var $instance$Functor$0 = $class$Functor(function(f){
return function(pa){
return (function(){
var $pm = pa;return ($pm.$tag==Parser.$tag)?((function(pa){
return Parser(function(i){
return (function(){
var $pm = pa(i);return ($pm.$tag==Error.$tag)?((function(e){
return Error(e)})($pm.$0)):(($pm.$tag==Success.$tag)?((function(a,i){
return (Success(f(a)))(i)})($pm.$0,$pm.$1)):(error("pattern match fail")))})()})})($pm.$0)):(error("pattern match fail"))})()}});
var $instance$Applicative$1 = ($class$Applicative(function(x){
return Parser(Success(x))}))(function(pf){
return function(pa){
return (function(){
var $pm = pf;return ($pm.$tag==Parser.$tag)?((function(pf){
return (function(){
var $pm = pa;return ($pm.$tag==Parser.$tag)?((function(pa){
return Parser(function(i){
return (function(){
var $pm = pf(i);return ($pm.$tag==Error.$tag)?((function(e){
return Error(e)})($pm.$0)):(($pm.$tag==Success.$tag)?((function(f,i){
return (function(){
var $pm = pa(i);return ($pm.$tag==Error.$tag)?((function(e){
return Error(e)})($pm.$0)):(($pm.$tag==Success.$tag)?((function(a,i){
return (Success(f(a)))(i)})($pm.$0,$pm.$1)):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(error("pattern match fail")))})()})})($pm.$0)):(error("pattern match fail"))})()})($pm.$0)):(error("pattern match fail"))})()}});
var $instance$Alternative$2 = ($class$Alternative(Parser(function(_){
return Error("parser failure")})))(function(pa){
return function(pb){
return (function(){
var $pm = pa;return ($pm.$tag==Parser.$tag)?((function(pa){
return (function(){
var $pm = pb;return ($pm.$tag==Parser.$tag)?((function(pb){
return Parser(function(i){
return (function(){
var $pm = pa(i);return ($pm.$tag==Error.$tag)?((function(){
return pb(i)})()):(($pm.$tag==Success.$tag)?((function(a,i){
return (Success(a))(i)})($pm.$0,$pm.$1)):(error("pattern match fail")))})()})})($pm.$0)):(error("pattern match fail"))})()})($pm.$0)):(error("pattern match fail"))})()}});
var upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var letters = ($concat("abcdefghijklmnopqrstuvwxyz"))(upperCaseLetters);
var digits = "0123456789";
var opt = function(a){
return function(s){
return (function(){
var $pm = a(s);return ($pm.$tag==Success.$tag)?((function(r,s){
return (Success(Just(r)))(s)})($pm.$0,$pm.$1)):((function(e){
return (Success(Nothing))(s)})($pm))})()}};
var and = function(pa){
return function(pb){
return function(s){
return (function(){
var $pm = pa(s);return ($pm.$tag==Success.$tag)?((function(a,s2){
return (function(){
var $pm = pb(s2);return ($pm.$tag==Success.$tag)?((function(b,s3){
return (Success((Pair(a))(b)))(s3)})($pm.$0,$pm.$1)):(($pm.$tag==Error.$tag)?((function(e){
return Error(e)})($pm.$0)):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(($pm.$tag==Error.$tag)?((function(e){
return Error(e)})($pm.$0)):(error("pattern match fail")))})()}}};
var apply = function(f){
return function(p){
return function(s){
return (function(){
var $pm = p(s);return ($pm.$tag==Success.$tag)?((function(r,s){
return (Success(f(r)))(s)})($pm.$0,$pm.$1)):(($pm.$tag==Error.$tag)?((function(e){
return Error(e)})($pm.$0)):(error("pattern match fail")))})()}}};
var precedes = function(a){
return function(b){
return (apply(snd))((and(a))(b))}};
var manyIterate = function(p){
return function(s){
return ((iterate(Left((Success(emptyArray))(s))))(function(r){
return (function(){
var $pm = r;return ($pm.$tag==Left.$tag)?((function(s){
return false})($pm.$0)):(($pm.$tag==Right.$tag)?((function(s){
return true})($pm.$0)):(error("pattern match fail")))})()}))(function(rs){
return (function(){
var $pm = rs;return (($pm.$tag==Left.$tag)&&($pm.$0.$tag==Success.$tag))?((function(rs,s){
return (function(){
var $pm = p(s);return ($pm.$tag==Success.$tag)?((function(r,s){
return Left((Success((push(r))(rs)))(s))})($pm.$0,$pm.$1)):(($pm.$tag==Error.$tag)?((function(e){
return Right((Success(rs))(s))})($pm.$0)):(error("pattern match fail")))})()})($pm.$0.$0,$pm.$0.$1)):(error("pattern match fail"))})()})}};
var many = function(p){
return function(s){
return (function(){
var $pm = (manyIterate(p))(s);return ($pm.$tag==Right.$tag)?((function(a){
return a})($pm.$0)):(($pm.$tag==Left.$tag)?((function(b){
return error("manyIterate should never return a Left")})($pm.$0)):(error("pattern match fail")))})()}};
var sepBy1 = function(p){
return function(sp){
return (apply(function(rrs){
return (function(){
var $pm = rrs;return ($pm.$tag==Pair.$tag)?((function(r,rs){
return (enqueue(r))(rs)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((and(p))(many((precedes(sp))(p))))}};
var or = function(a){
return function(b){
return function(s){
return (function(){
var $pm = a(s);return ($pm.$tag==Error.$tag)?((function(e){
return b(s)})($pm.$0)):((function(s){
return s})($pm))})()}}};
var succeeds = function(a){
return function(b){
return (apply(fst))((and(a))(b))}};
var between = function(a){
return function(b){
return function(c){
return (precedes(a))((succeeds(b))(c))}}};
var many1 = function(a){
return function(s){
return (function(){
var $pm = a(s);return ($pm.$tag==Success.$tag)?((function(r,s){
return ((apply(enqueue(r)))(many(a)))(s)})($pm.$0,$pm.$1)):(($pm.$tag==Error.$tag)?((function(e){
return Error(e)})($pm.$0)):(error("pattern match fail")))})()}};
var fsome = function(p){
return (function(){
var $pm = p;return ($pm.$tag==Parser.$tag)?((function(p){
return Parser(function(i){
return (many1(p))(i)})})($pm.$0)):(error("pattern match fail"))})()};
var fmany = function(p){
return (function(){
var $pm = p;return ($pm.$tag==Parser.$tag)?((function(p){
return Parser(function(i){
return (many(p))(i)})})($pm.$0)):(error("pattern match fail"))})()};
var $lt$pip = function(local$instance$Applicative$2){
return function(local$instance$Applicative$1){
return function(local$instance$Applicative$0){
return function(a){
return function(b){
return (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(function(a){
return function(b){
return a}})))(a)))(b)}}}}};
var $pip$gt = function(local$instance$Applicative$2){
return function(local$instance$Applicative$1){
return function(local$instance$Applicative$0){
return function(a){
return function(b){
return (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(function(a){
return function(b){
return b}})))(a)))(b)}}}}};
var exports = {Success:Success,Error:Error,Parser:Parser,$instance$Functor$0:$instance$Functor$0,$instance$Applicative$1:$instance$Applicative$1,$instance$Alternative$2:$instance$Alternative$2,upperCaseLetters:upperCaseLetters,letters:letters,digits:digits,opt:opt,and:and,apply:apply,precedes:precedes,manyIterate:manyIterate,many:many,sepBy1:sepBy1,or:or,succeeds:succeeds,between:between,many1:many1,fsome:fsome,fmany:fmany,$lt$pip:$lt$pip,$pip$gt:$pip$gt}
return exports;})();
cache["//compiler/jaguarLexer.jg"] = (function() {var $add = (_require("./builtins.js")).$add;
var $concat = (_require("./builtins.js")).$concat;
var getChar = (_require("./builtins.js")).getChar;
var foldl = (_require("./builtins.js")).foldl;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var containsChar = (_require("//compiler/prelude.jg")).containsChar;
var not = (_require("//compiler/prelude.jg")).not;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var Success = (_require("//compiler/parsers.jg")).Success;
var Error = (_require("//compiler/parsers.jg")).Error;
var Parser = (_require("//compiler/parsers.jg")).Parser;
var letters = (_require("//compiler/parsers.jg")).letters;
var digits = (_require("//compiler/parsers.jg")).digits;
var fsome = (_require("//compiler/parsers.jg")).fsome;
var fmany = (_require("//compiler/parsers.jg")).fmany;
var $lt$pip = (_require("//compiler/parsers.jg")).$lt$pip;
var $pip$gt = (_require("//compiler/parsers.jg")).$pip$gt;
var $import2$instance$Functor$0 = (_require("//compiler/parsers.jg")).$instance$Functor$0;
var $import2$instance$Applicative$1 = (_require("//compiler/parsers.jg")).$instance$Applicative$1;
var $import2$instance$Alternative$2 = (_require("//compiler/parsers.jg")).$instance$Alternative$2;
var $LexerState = function($0,$1,$2,$3){
this.$0=$0;this.$1=$1;this.$2=$2;this.$3=$3;this.$tag="LexerState"};
var LexerState = function($0){
return function($1){
return function($2){
return function($3){
return new $LexerState($0,$1,$2,$3)}}}};
LexerState.$tag = "LexerState";
var $WsTok = function(){
this.$tag="WsTok"};
var WsTok = new $WsTok();
WsTok.$tag = "WsTok";
var $SymTok = function(){
this.$tag="SymTok"};
var SymTok = new $SymTok();
SymTok.$tag = "SymTok";
var $NumTok = function(){
this.$tag="NumTok"};
var NumTok = new $NumTok();
NumTok.$tag = "NumTok";
var $StrTok = function(){
this.$tag="StrTok"};
var StrTok = new $StrTok();
StrTok.$tag = "StrTok";
var $OpTok = function(){
this.$tag="OpTok"};
var OpTok = new $OpTok();
OpTok.$tag = "OpTok";
var $IdTok = function(){
this.$tag="IdTok"};
var IdTok = new $IdTok();
IdTok.$tag = "IdTok";
var $ComTok = function(){
this.$tag="ComTok"};
var ComTok = new $ComTok();
ComTok.$tag = "ComTok";
var $Token = function($0,$1,$2,$3){
this.$0=$0;this.$1=$1;this.$2=$2;this.$3=$3;this.$tag="Token"};
var Token = function($0){
return function($1){
return function($2){
return function($3){
return new $Token($0,$1,$2,$3)}}}};
Token.$tag = "Token";
var runLexer = function(p){
return function(s){
return (function(){
var $pm = p;return ($pm.$tag==Parser.$tag)?((function(p){
return p((((LexerState(s))(0))(0))(0))})($pm.$0)):(error("pattern match fail"))})()}};
var mkTok = function(t){
return (function(){
var parse = function(i){
return (function(){
var $pm = i;return ($pm.$tag==LexerState.$tag)?((function(l,c){
return (Success(function(r){
return (((Token(t))(r))(l))(c)}))(i)})($pm.$2,$pm.$3)):(error("pattern match fail"))})()};return Parser(parse)})()};
var parseChar = function(p){
return (function(){
var parse = function(s){
return (function(){
var $pm = s;return ($pm.$tag==LexerState.$tag)?((function(s,i,l,c){
return (function(){
var $pm = p((getChar(i))(s));return (!$pm)?((function(){
return Error("parser failed")})()):($pm?((function(){
return (function(){
var $pm = (getChar(i))(s);return ("\n"==$pm)?((function(){
return (Success((getChar(i))(s)))((((LexerState(s))(($add(i))(1)))(($add(l))(1)))(0))})()):((function(x){
return (Success((getChar(i))(s)))((((LexerState(s))(($add(i))(1)))(l))(($add(c))(1)))})($pm))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};return Parser(parse)})()};
var charP = function(cs){
return parseChar(function(c){
return (containsChar(c))(cs)})};
var concatStr = (foldl(function(cs){
return function(c){
return ($concat(cs))(c)}}))("");
var someStr = function(p){
return (($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))(concatStr)))(fsome(p))};
var whitespaceP = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok(WsTok)))(someStr(charP(" \n")));
var intP = someStr(charP(digits));
var numP = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok(NumTok)))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(intP)))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(charP("."))))(intP)))((pure($import2$instance$Applicative$1))(""))));
var notCharP = function(cs){
return parseChar(function(c){
return not((containsChar(c))(cs))})};
var manyStr = function(p){
return (($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))(concatStr)))(fmany(p))};
var lineCommentP = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok(ComTok)))((((($pip$gt($import2$instance$Applicative$1))($import2$instance$Applicative$1))($import2$instance$Applicative$1))((((($pip$gt($import2$instance$Applicative$1))($import2$instance$Applicative$1))($import2$instance$Applicative$1))(charP("/")))(charP("/"))))(manyStr(notCharP("\n"))));
var symbolP = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok(SymTok)))(charP("()[]{},\\"));
var identP = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok(IdTok)))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(charP(($concat(letters))("_")))))(manyStr(charP(($concat(($concat(letters))(digits)))("_")))));
var opIdentP = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok(IdTok)))((((($lt$pip($import2$instance$Applicative$1))($import2$instance$Applicative$1))($import2$instance$Applicative$1))((((($pip$gt($import2$instance$Applicative$1))($import2$instance$Applicative$1))($import2$instance$Applicative$1))(charP("(")))(someStr(charP("-+*/=:&|<>^")))))(charP(")")));
var opP = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok(OpTok)))(someStr(charP("-+*/=:&|<>^")));
var anyCharP = parseChar(function(_){
return true});
var stringCharP = (function(){
var notEndOfStringP = notCharP("'");var escapeP = (((($pip$gt($import2$instance$Applicative$1))($import2$instance$Applicative$1))($import2$instance$Applicative$1))(charP("\\")))(anyCharP);var newLineP = (((($pip$gt($import2$instance$Applicative$1))($import2$instance$Applicative$1))($import2$instance$Applicative$1))((((($pip$gt($import2$instance$Applicative$1))($import2$instance$Applicative$1))($import2$instance$Applicative$1))(charP("\\")))(charP("n"))))((pure($import2$instance$Applicative$1))("\n"));return (($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))(newLineP))(escapeP)))(notEndOfStringP)})();
var stringP = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok(StrTok)))((((($lt$pip($import2$instance$Applicative$1))($import2$instance$Applicative$1))($import2$instance$Applicative$1))((((($pip$gt($import2$instance$Applicative$1))($import2$instance$Applicative$1))($import2$instance$Applicative$1))(charP("'")))(manyStr(stringCharP))))(charP("'")));
var jaguarTokenP = fmany((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))(stringP))(whitespaceP)))(numP)))(lineCommentP)))(identP)))(opIdentP)))(opP)))(symbolP));
var tokenize = runLexer(jaguarTokenP);
var exports = {LexerState:LexerState,WsTok:WsTok,SymTok:SymTok,NumTok:NumTok,StrTok:StrTok,OpTok:OpTok,IdTok:IdTok,ComTok:ComTok,Token:Token,runLexer:runLexer,mkTok:mkTok,parseChar:parseChar,charP:charP,concatStr:concatStr,someStr:someStr,whitespaceP:whitespaceP,intP:intP,numP:numP,notCharP:notCharP,manyStr:manyStr,lineCommentP:lineCommentP,symbolP:symbolP,identP:identP,opIdentP:opIdentP,opP:opP,anyCharP:anyCharP,stringCharP:stringCharP,stringP:stringP,jaguarTokenP:jaguarTokenP,tokenize:tokenize}
return exports;})();
cache["//compiler/jaguarParser.jg"] = (function() {var $add = (_require("./builtins.js")).$add;
var $lt = (_require("./builtins.js")).$lt;
var $gt = (_require("./builtins.js")).$gt;
var $eq = (_require("./builtins.js")).$eq;
var getIx = (_require("./builtins.js")).getIx;
var getChar = (_require("./builtins.js")).getChar;
var unsafeStringToInt = (_require("./builtins.js")).unsafeStringToInt;
var length = (_require("./builtins.js")).length;
var emptyArray = (_require("./builtins.js")).emptyArray;
var push = (_require("./builtins.js")).push;
var enqueue = (_require("./builtins.js")).enqueue;
var filter = (_require("./builtins.js")).filter;
var foldr = (_require("./builtins.js")).foldr;
var foldr1 = (_require("./builtins.js")).foldr1;
var foldl = (_require("./builtins.js")).foldl;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var Just = (_require("//compiler/prelude.jg")).Just;
var Nothing = (_require("//compiler/prelude.jg")).Nothing;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var Left = (_require("//compiler/prelude.jg")).Left;
var Right = (_require("//compiler/prelude.jg")).Right;
var snd = (_require("//compiler/prelude.jg")).snd;
var containsChar = (_require("//compiler/prelude.jg")).containsChar;
var contains = (_require("//compiler/prelude.jg")).contains;
var splitEither = (_require("//compiler/prelude.jg")).splitEither;
var justOr = (_require("//compiler/prelude.jg")).justOr;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var Var = (_require("//compiler/ast.jg")).Var;
var Const = (_require("//compiler/ast.jg")).Const;
var App = (_require("//compiler/ast.jg")).App;
var Lam = (_require("//compiler/ast.jg")).Lam;
var Case = (_require("//compiler/ast.jg")).Case;
var Let = (_require("//compiler/ast.jg")).Let;
var CNum = (_require("//compiler/ast.jg")).CNum;
var CStr = (_require("//compiler/ast.jg")).CStr;
var PVar = (_require("//compiler/ast.jg")).PVar;
var PConst = (_require("//compiler/ast.jg")).PConst;
var PData = (_require("//compiler/ast.jg")).PData;
var Module = (_require("//compiler/ast.jg")).Module;
var Data = (_require("//compiler/ast.jg")).Data;
var DataCon = (_require("//compiler/ast.jg")).DataCon;
var Class = (_require("//compiler/ast.jg")).Class;
var Instance = (_require("//compiler/ast.jg")).Instance;
var TConst = (_require("//compiler/ast.jg")).TConst;
var TVar = (_require("//compiler/ast.jg")).TVar;
var TApp = (_require("//compiler/ast.jg")).TApp;
var ImportClosed = (_require("//compiler/ast.jg")).ImportClosed;
var ImportOpen = (_require("//compiler/ast.jg")).ImportOpen;
var ImportAll = (_require("//compiler/ast.jg")).ImportAll;
var emptyAnn = (_require("//compiler/ast.jg")).emptyAnn;
var Success = (_require("//compiler/parsers.jg")).Success;
var Error = (_require("//compiler/parsers.jg")).Error;
var upperCaseLetters = (_require("//compiler/parsers.jg")).upperCaseLetters;
var opt = (_require("//compiler/parsers.jg")).opt;
var and = (_require("//compiler/parsers.jg")).and;
var apply = (_require("//compiler/parsers.jg")).apply;
var precedes = (_require("//compiler/parsers.jg")).precedes;
var many = (_require("//compiler/parsers.jg")).many;
var sepBy1 = (_require("//compiler/parsers.jg")).sepBy1;
var or = (_require("//compiler/parsers.jg")).or;
var between = (_require("//compiler/parsers.jg")).between;
var many1 = (_require("//compiler/parsers.jg")).many1;
var $import3$instance$Functor$0 = (_require("//compiler/parsers.jg")).$instance$Functor$0;
var $import3$instance$Applicative$1 = (_require("//compiler/parsers.jg")).$instance$Applicative$1;
var $import3$instance$Alternative$2 = (_require("//compiler/parsers.jg")).$instance$Alternative$2;
var tokenize = (_require("//compiler/jaguarLexer.jg")).tokenize;
var Token = (_require("//compiler/jaguarLexer.jg")).Token;
var WsTok = (_require("//compiler/jaguarLexer.jg")).WsTok;
var SymTok = (_require("//compiler/jaguarLexer.jg")).SymTok;
var NumTok = (_require("//compiler/jaguarLexer.jg")).NumTok;
var StrTok = (_require("//compiler/jaguarLexer.jg")).StrTok;
var OpTok = (_require("//compiler/jaguarLexer.jg")).OpTok;
var IdTok = (_require("//compiler/jaguarLexer.jg")).IdTok;
var ComTok = (_require("//compiler/jaguarLexer.jg")).ComTok;
var $ParserState = function($0,$1,$2,$3){
this.$0=$0;this.$1=$1;this.$2=$2;this.$3=$3;this.$tag="ParserState"};
var ParserState = function($0){
return function($1){
return function($2){
return function($3){
return new $ParserState($0,$1,$2,$3)}}}};
ParserState.$tag = "ParserState";
var mkParserState = function(ts){
return (((ParserState(ts))(0))((function(){
var $pm = (getIx(0))(ts);return ($pm.$tag==Token.$tag)?((function(t,v,l,c){
return c})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()))(0)};
var filterWhitespaceAndComments = filter(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==WsTok.$tag))?((function(v,l,c){
return false})($pm.$1,$pm.$2,$pm.$3)):((($pm.$tag==Token.$tag)&&($pm.$0.$tag==ComTok.$tag))?((function(v,l,c){
return false})($pm.$1,$pm.$2,$pm.$3)):((function(t){
return true})($pm)))})()});
var runParser = function(p){
return function(s){
return (function(){
var $pm = tokenize(s);return ($pm.$tag==Success.$tag)?((function(ts,s){
return p(mkParserState(filterWhitespaceAndComments(ts)))})($pm.$0,$pm.$1)):(($pm.$tag==Error.$tag)?((function(e){
return Error(e)})($pm.$0)):(error("pattern match fail")))})()}};
var andIndent = function(pa){
return function(pb){
return function(s){
return (function(){
var $pm = s;return ($pm.$tag==ParserState.$tag)?((function(ts,p,li,ri){
return (function(){
var $pm = pa(s);return (($pm.$tag==Success.$tag)&&($pm.$1.$tag==ParserState.$tag))?((function(a,ts,p2,li2,ri2){
return (function(){
var $pm = pb((((ParserState(ts))(p2))(li2))(($add(li))(1)));return (($pm.$tag==Success.$tag)&&($pm.$1.$tag==ParserState.$tag))?((function(b,ts,p3,li3,ri3){
return (Success((Pair(a))(b)))((((ParserState(ts))(p3))(li3))(ri))})($pm.$0,$pm.$1.$0,$pm.$1.$1,$pm.$1.$2,$pm.$1.$3)):(($pm.$tag==Error.$tag)?((function(e){
return Error(e)})($pm.$0)):(error("pattern match fail")))})()})($pm.$0,$pm.$1.$0,$pm.$1.$1,$pm.$1.$2,$pm.$1.$3)):(($pm.$tag==Error.$tag)?((function(e){
return Error(e)})($pm.$0)):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}}};
var parseToken = function(f){
return function(s){
return (function(){
var $pm = s;return ($pm.$tag==ParserState.$tag)?((function(ts,p,li,ri){
return (function(){
var $pm = ($lt(p))(length(ts));return (!$pm)?((function(){
return Error("run out of tokens")})()):($pm?((function(){
return (function(){
var $pm = (getIx(p))(ts);return ($pm.$tag==Token.$tag)?((function(t,v,l,c){
return (function(){
var $pm = ($lt(c))(ri);return $pm?((function(){
return Error("token not indented sufficiently")})()):((!$pm)?((function(){
return (function(){
var $pm = f((getIx(p))(ts));return ($pm.$tag==Nothing.$tag)?((function(){
return Error("parser fun failed")})()):(($pm.$tag==Just.$tag)?((function(r){
return (function(){
var $pm = ($lt(($add(p))(1)))(length(ts));return (!$pm)?((function(){
return (Success(r))((((ParserState(ts))(($add(p))(1)))(li))(ri))})()):($pm?((function(){
return (function(){
var $pm = (getIx(($add(p))(1)))(ts);return ($pm.$tag==Token.$tag)?((function(t,v,l2,c){
return (function(){
var $pm = ($gt(l2))(l);return (!$pm)?((function(){
return (Success(r))((((ParserState(ts))(($add(p))(1)))(li))(ri))})()):($pm?((function(){
return (Success(r))((((ParserState(ts))(($add(p))(1)))(c))(ri))})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()})()):(error("pattern match fail")))})()})($pm.$0)):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}};
var operatorP = function(s){
return parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==OpTok.$tag))?((function(v,i,c){
return (function(){
var $pm = ($eq(v))(s);return $pm?((function(){
return Just(s)})()):((!$pm)?((function(){
return Nothing})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(x){
return Nothing})($pm))})()})};
var symP = function(s){
return parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==SymTok.$tag))?((function(v,i,c){
return (function(){
var $pm = ($eq(v))(s);return $pm?((function(){
return Just(s)})()):((!$pm)?((function(){
return Nothing})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(x){
return Nothing})($pm))})()})};
var parenP = function(p){
return ((between(symP("(")))(p))(symP(")"))};
var upperCaseId = parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==IdTok.$tag))?((function(v,i,c){
return (function(){
var $pm = (containsChar((getChar(0))(v)))(upperCaseLetters);return $pm?((function(){
return Just(v)})()):((!$pm)?((function(){
return Nothing})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(t){
return Nothing})($pm))})()});
var tconstP = (apply(TConst(emptyAnn)))(upperCaseId);
var reserved = (push("as"))((push("class"))((push("where"))((push("instance"))((push("let"))((push("in"))((push("from"))((push("import"))((push("case"))((push("of"))((push("data"))(emptyArray)))))))))));
var notUpperCaseId = parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==IdTok.$tag))?((function(v,i,c){
return (function(){
var $pm = (containsChar((getChar(0))(v)))(upperCaseLetters);return (!$pm)?((function(){
return (function(){
var $pm = (contains(v))(reserved);return (!$pm)?((function(){
return Just(v)})()):($pm?((function(){
return Nothing})()):(error("pattern match fail")))})()})()):($pm?((function(){
return Nothing})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(t){
return Nothing})($pm))})()});
var tvarP = (apply(TVar(emptyAnn)))(notUpperCaseId);
var simpleTypeP = function(s){
return ((or(tconstP))((or(tvarP))(parenP(typeP))))(s)};
var tappP = (apply(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(t,ts){
return ((foldl(function(a){
return function(b){
return ((TApp(emptyAnn))(a))(b)}}))(t))(ts)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((andIndent(simpleTypeP))(many(simpleTypeP)));
var tfunP = (apply(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(t,ts){
return (foldr1(function(b){
return function(a){
return ((TApp(emptyAnn))(((TApp(emptyAnn))((TConst(emptyAnn))("->")))(a)))(b)}}))((enqueue(t))(ts))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((andIndent(tappP))(many((precedes(operatorP("->")))(tappP))));
var typeP = tfunP;
var parseType = runParser(typeP);
var anyOpP = parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==OpTok.$tag))?((function(v,i,c){
return Just(v)})($pm.$1,$pm.$2,$pm.$3)):((function(x){
return Nothing})($pm))})()});
var reservedP = function(s){
return parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==IdTok.$tag))?((function(v,i,c){
return (function(){
var $pm = ($eq(v))(s);return $pm?((function(){
return Just(s)})()):((!$pm)?((function(){
return Nothing})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(x){
return Nothing})($pm))})()})};
var varP = parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==IdTok.$tag))?((function(v,l,c){
return (function(){
var $pm = (contains(v))(reserved);return $pm?((function(){
return Nothing})()):((!$pm)?((function(){
return Just((Var(emptyAnn))(v))})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(x){
return Nothing})($pm))})()});
var cnumP = parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==NumTok.$tag))?((function(v,l,c){
return Just((Const(emptyAnn))(CNum(unsafeStringToInt(v))))})($pm.$1,$pm.$2,$pm.$3)):((function(x){
return Nothing})($pm))})()});
var cstrP = parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==StrTok.$tag))?((function(v,l,c){
return Just((Const(emptyAnn))(CStr(v)))})($pm.$1,$pm.$2,$pm.$3)):((function(x){
return Nothing})($pm))})()});
var constP = (or(cstrP))(cnumP);
var pvarP = (apply(PVar(emptyAnn)))(notUpperCaseId);
var pcstrP = parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==StrTok.$tag))?((function(v,l,c){
return Just((PConst(emptyAnn))(CStr(v)))})($pm.$1,$pm.$2,$pm.$3)):((function(x){
return Nothing})($pm))})()});
var pcnumP = parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==NumTok.$tag))?((function(v,l,c){
return Just((PConst(emptyAnn))(CNum(unsafeStringToInt(v))))})($pm.$1,$pm.$2,$pm.$3)):((function(x){
return Nothing})($pm))})()});
var pconstP = (or(pcnumP))(pcstrP);
var pdataP = function(s){
return ((apply(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(n,ps){
return ((PData(emptyAnn))(n))(ps)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((andIndent(upperCaseId))(many((or(pvarP))((or(pconstP))(parenP(patP)))))))(s)};
var patP = (or(pvarP))((or(pconstP))(pdataP));
var simpleExprP = function(s){
return ((or(varP))((or(constP))(parenP(exprP))))(s)};
var appP = function(s){
return ((apply(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(f,xs){
return ((foldl(function(f){
return function(x){
return ((App(emptyAnn))(f))(x)}}))(f))(xs)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((andIndent((or(varP))(parenP(exprP))))(many(simpleExprP))))(s)};
var lamP = function(s){
return ((apply(function(p){
return (function(){
var $pm = p;return (($pm.$tag==Pair.$tag)&&($pm.$1.$tag==Pair.$tag))?((function(ps,a){
return ((foldr(function(a){
return function(p){
return ((Lam(emptyAnn))(p))(a)}}))(a))(ps)})($pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()}))((andIndent(symP("\\")))((and(many1(notUpperCaseId)))((precedes(operatorP("->")))(exprP)))))(s)};
var ofP = function(s){
return ((andIndent(patP))((precedes(operatorP("->")))(exprP)))(s)};
var caseP = (apply(function(p){
return (function(){
var $pm = p;return (($pm.$tag==Pair.$tag)&&($pm.$1.$tag==Pair.$tag))?((function(e,ps){
return ((Case(emptyAnn))(e))(ps)})($pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()}))((andIndent(reservedP("case")))((and(simpleExprP))((precedes(reservedP("of")))(many1(ofP)))));
var defP = (apply(function(p){
return (function(){
var $pm = p;return (($pm.$tag==Pair.$tag)&&($pm.$0.$tag==Pair.$tag))?((function(n,ps,e){
return (Pair(n))(((foldr(function(e){
return function(p){
return ((Lam(emptyAnn))(p))(e)}}))(e))(ps))})($pm.$0.$0,$pm.$0.$1,$pm.$1)):(error("pattern match fail"))})()}))((andIndent((andIndent(notUpperCaseId))(many(notUpperCaseId))))((precedes(operatorP("=")))(function(s){
return exprP(s)})));
var letDefsP = (apply(snd))((andIndent(reservedP("let")))(many1(defP)));
var letInP = function(s){
return ((precedes(reservedP("in")))(exprP))(s)};
var letP = (apply(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(ds,e){
return ((Let(emptyAnn))(ds))(e)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((and(letDefsP))(letInP));
var primaryExprP = function(s){
return ((or(appP))((or(constP))((or(lamP))((or(caseP))(letP)))))(s)};
var exprP = (apply(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(e,oes){
return ((foldl(function(a){
return function(ob){
return (function(){
var $pm = ob;return ($pm.$tag==Pair.$tag)?((function(op,b){
return ((App(emptyAnn))(((App(emptyAnn))((Var(emptyAnn))(op)))(a)))(b)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(e))(oes)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((andIndent(primaryExprP))(many((and(anyOpP))(primaryExprP))));
var parseExpr = runParser(exprP);
var strP = parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==StrTok.$tag))?((function(v,l,c){
return Just(v)})($pm.$1,$pm.$2,$pm.$3)):((function(x){
return Nothing})($pm))})()});
var importAllP = (apply(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(n,f){
return (ImportAll(emptyAnn))(f)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((and(operatorP("*")))((precedes(reservedP("from")))(strP)));
var nonReservedP = parseToken(function(t){
return (function(){
var $pm = t;return (($pm.$tag==Token.$tag)&&($pm.$0.$tag==IdTok.$tag))?((function(v,l,c){
return (function(){
var $pm = (contains(v))(reserved);return $pm?((function(){
return Nothing})()):((!$pm)?((function(){
return Just(v)})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(x){
return Nothing})($pm))})()});
var importClosedP = (apply(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(n,f){
return ((ImportClosed(emptyAnn))(f))(n)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((and(nonReservedP))((precedes(reservedP("from")))(strP)));
var importNoAliasP = (apply(function(n){
return (Pair(n))(n)}))(nonReservedP);
var importAliasP = (and(nonReservedP))((precedes(reservedP("as")))(nonReservedP));
var importOpenP = (apply(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(ns,f){
return ((ImportOpen(emptyAnn))(f))(ns)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((and(((between(symP("{")))((sepBy1((or(importAliasP))(importNoAliasP)))(symP(","))))(symP("}"))))((precedes(reservedP("from")))(strP)));
var importP = (apply(snd))((andIndent(reservedP("import")))((or(importClosedP))((or(importOpenP))(importAllP))));
var parseImports = runParser(many(importP));
var eitherP = function(a){
return function(b){
return (or((apply(Left))(a)))((apply(Right))(b))}};
var precedesIndent = function(pa){
return function(pb){
return (apply(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(r){
return r})($pm.$1)):(error("pattern match fail"))})()}))((andIndent(pa))(pb))}};
var classMemberP = (andIndent(notUpperCaseId))((precedes(operatorP("::")))(typeP));
var classP = (apply(function(r){
return (function(){
var $pm = r;return (($pm.$tag==Pair.$tag)&&($pm.$0.$tag==Pair.$tag))?((function(name,tv,maybeDefs){
return (((Class(emptyAnn))(name))(tv))((justOr(emptyArray))(maybeDefs))})($pm.$0.$0,$pm.$0.$1,$pm.$1)):(error("pattern match fail"))})()}))((precedesIndent(reservedP("class")))((and((and(upperCaseId))(notUpperCaseId)))(opt((precedes(reservedP("where")))(many1(classMemberP))))));
var instanceP = (apply(function(r){
return (function(){
var $pm = r;return (($pm.$tag==Pair.$tag)&&($pm.$0.$tag==Pair.$tag))?((function(name,t,maybeDefs){
return (((Instance(emptyAnn))(name))(t))((justOr(emptyArray))(maybeDefs))})($pm.$0.$0,$pm.$0.$1,$pm.$1)):(error("pattern match fail"))})()}))((precedesIndent(reservedP("instance")))((and((and(upperCaseId))(simpleTypeP)))(opt((precedes(reservedP("where")))(many1(defP))))));
var dataConP = (apply(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(n,ts){
return ((DataCon(emptyAnn))(n))(ts)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((andIndent(upperCaseId))(many(simpleTypeP)));
var dataP = (apply(function(r){
return (function(){
var $pm = r;return (($pm.$tag==Pair.$tag)&&(($pm.$1.$tag==Pair.$tag)&&($pm.$1.$1.$tag==Pair.$tag)))?((function(n,ps,cs){
return (((Data(emptyAnn))(n))(ps))(cs)})($pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$1.$1)):(error("pattern match fail"))})()}))((andIndent(reservedP("data")))((and(upperCaseId))((and(many(notUpperCaseId)))((precedes(operatorP("=")))((sepBy1(dataConP))(operatorP("|")))))));
var topLevelP = (eitherP((eitherP(dataP))(defP)))((eitherP(classP))(instanceP));
var splitFourWay = function(e){
return (function(){
var $pm = splitEither(e);return ($pm.$tag==Pair.$tag)?((function(a,b){
return (Pair(splitEither(a)))(splitEither(b))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var moduleP = (apply(function(p){
return (function(){
var $pm = p;return ($pm.$tag==Pair.$tag)?((function(is,es){
return (function(){
var $pm = splitFourWay(es);return ((($pm.$tag==Pair.$tag)&&($pm.$0.$tag==Pair.$tag))&&($pm.$1.$tag==Pair.$tag))?((function(dts,dfs,cs,ins){
return (((((Module(emptyAnn))(is))(dts))(cs))(ins))(dfs)})($pm.$0.$0,$pm.$0.$1,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((and(many(importP)))(many1(topLevelP)));
var parseModule = runParser(moduleP);
var exports = {ParserState:ParserState,mkParserState:mkParserState,filterWhitespaceAndComments:filterWhitespaceAndComments,runParser:runParser,andIndent:andIndent,parseToken:parseToken,operatorP:operatorP,symP:symP,parenP:parenP,upperCaseId:upperCaseId,tconstP:tconstP,reserved:reserved,notUpperCaseId:notUpperCaseId,tvarP:tvarP,simpleTypeP:simpleTypeP,tappP:tappP,tfunP:tfunP,typeP:typeP,parseType:parseType,anyOpP:anyOpP,reservedP:reservedP,varP:varP,cnumP:cnumP,cstrP:cstrP,constP:constP,pvarP:pvarP,pcstrP:pcstrP,pcnumP:pcnumP,pconstP:pconstP,pdataP:pdataP,patP:patP,simpleExprP:simpleExprP,appP:appP,lamP:lamP,ofP:ofP,caseP:caseP,defP:defP,letDefsP:letDefsP,letInP:letInP,letP:letP,primaryExprP:primaryExprP,exprP:exprP,parseExpr:parseExpr,strP:strP,importAllP:importAllP,nonReservedP:nonReservedP,importClosedP:importClosedP,importNoAliasP:importNoAliasP,importAliasP:importAliasP,importOpenP:importOpenP,importP:importP,parseImports:parseImports,eitherP:eitherP,precedesIndent:precedesIndent,classMemberP:classMemberP,classP:classP,instanceP:instanceP,dataConP:dataConP,dataP:dataP,topLevelP:topLevelP,splitFourWay:splitFourWay,moduleP:moduleP,parseModule:parseModule}
return exports;})();
cache["//compiler/compiler.jg"] = (function() {var writeFile = (_require("./builtins.js")).writeFile;
var readFile = (_require("./builtins.js")).readFile;
var loadJSExports = (_require("./builtins.js")).loadJSExports;
var $eq = (_require("./builtins.js")).$eq;
var $concat = (_require("./builtins.js")).$concat;
var empty = (_require("./builtins.js")).empty;
var get = (_require("./builtins.js")).get;
var getIx = (_require("./builtins.js")).getIx;
var set = (_require("./builtins.js")).set;
var mapRecord = (_require("./builtins.js")).mapRecord;
var length = (_require("./builtins.js")).length;
var emptyArray = (_require("./builtins.js")).emptyArray;
var push = (_require("./builtins.js")).push;
var slice = (_require("./builtins.js")).slice;
var map = (_require("./builtins.js")).map;
var foldr = (_require("./builtins.js")).foldr;
var foldl = (_require("./builtins.js")).foldl;
var error = (_require("./builtins.js")).error;
var jsonStringify = (_require("./builtins.js")).jsonStringify;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var Just = (_require("//compiler/prelude.jg")).Just;
var Nothing = (_require("//compiler/prelude.jg")).Nothing;
var Pair = (_require("//compiler/prelude.jg")).Pair;
var snd = (_require("//compiler/prelude.jg")).snd;
var $import1$instance$Functor$0 = (_require("//compiler/prelude.jg")).$instance$Functor$0;
var $import1$instance$Applicative$1 = (_require("//compiler/prelude.jg")).$instance$Applicative$1;
var $import1$instance$Alternative$2 = (_require("//compiler/prelude.jg")).$instance$Alternative$2;
var $import1$instance$Functor$3 = (_require("//compiler/prelude.jg")).$instance$Functor$3;
var $class$Functor = (_require("//compiler/prelude.jg")).$class$Functor;
var fmap = (_require("//compiler/prelude.jg")).fmap;
var $class$Applicative = (_require("//compiler/prelude.jg")).$class$Applicative;
var pure = (_require("//compiler/prelude.jg")).pure;
var $lt$mul$gt = (_require("//compiler/prelude.jg")).$lt$mul$gt;
var $class$Alternative = (_require("//compiler/prelude.jg")).$class$Alternative;
var zero = (_require("//compiler/prelude.jg")).zero;
var $lt$pip$gt = (_require("//compiler/prelude.jg")).$lt$pip$gt;
var Success = (_require("//compiler/parsers.jg")).Success;
var $import2$instance$Functor$0 = (_require("//compiler/parsers.jg")).$instance$Functor$0;
var $import2$instance$Applicative$1 = (_require("//compiler/parsers.jg")).$instance$Applicative$1;
var $import2$instance$Alternative$2 = (_require("//compiler/parsers.jg")).$instance$Alternative$2;
var Var = (_require("//compiler/ast.jg")).Var;
var Const = (_require("//compiler/ast.jg")).Const;
var App = (_require("//compiler/ast.jg")).App;
var Lam = (_require("//compiler/ast.jg")).Lam;
var CStr = (_require("//compiler/ast.jg")).CStr;
var Module = (_require("//compiler/ast.jg")).Module;
var ModuleInterface = (_require("//compiler/ast.jg")).ModuleInterface;
var ImportClosed = (_require("//compiler/ast.jg")).ImportClosed;
var ImportOpen = (_require("//compiler/ast.jg")).ImportOpen;
var ImportAll = (_require("//compiler/ast.jg")).ImportAll;
var emptyAnn = (_require("//compiler/ast.jg")).emptyAnn;
var parseModule = (_require("//compiler/jaguarParser.jg")).parseModule;
var parseType = (_require("//compiler/jaguarParser.jg")).parseType;
var ParserState = (_require("//compiler/jaguarParser.jg")).ParserState;
var compileModule = (_require("//compiler/js/backend.jg")).compileModule;
var combineModules = (_require("//compiler/js/backend.jg")).combineModules;
var newCtx = (_require("//compiler/typer.jg")).newCtx;
var inferTypeModule = (_require("//compiler/typer.jg")).inferTypeModule;
var getTypedExports = (_require("//compiler/typer.jg")).getTypedExports;
var generalize = (_require("//compiler/typer.jg")).generalize;
var emptyEnv = (_require("//compiler/typer.jg")).emptyEnv;
var dfs = (_require("//compiler/graph.jg")).dfs;
var ArgBool = (_require("//compiler/args.jg")).ArgBool;
var ArgString = (_require("//compiler/args.jg")).ArgString;
var parseArgs = (_require("//compiler/args.jg")).parseArgs;
var getPositional = (_require("//compiler/args.jg")).getPositional;
var getString = (_require("//compiler/args.jg")).getString;
var getBool = (_require("//compiler/args.jg")).getBool;
var declassModule = (_require("//compiler/declasser.jg")).declassModule;
var normalizeImports = (_require("//compiler/importNormalizer.jg")).normalizeImports;
var findImports = function(m){
return (function(){
var importFileName = function(i){
return (function(){
var $pm = i;return ($pm.$tag==ImportAll.$tag)?((function(f){
return f})($pm.$1)):(($pm.$tag==ImportOpen.$tag)?((function(f,ns){
return f})($pm.$1,$pm.$2)):(($pm.$tag==ImportClosed.$tag)?((function(f,n){
return f})($pm.$1,$pm.$2)):(error("pattern match fail"))))})()};return (function(){
var $pm = m;return ($pm.$tag==Module.$tag)?((function(is,ds,cs,ins,vs){
return (map(importFileName))(is)})($pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5)):(error("pattern match fail"))})()})()};
var parseT = function(s){
return (function(){
var $pm = parseType(s);return ($pm.$tag==Success.$tag)?((function(t,ps){
return t})($pm.$0,$pm.$1)):((function(e){
return error(e)})($pm))})()};
var parseExports = function(e){
return (function(){
var bs = (mapRecord(function(s){
return snd(((generalize(emptyEnv))(newCtx))(parseT(s)))}))(e);return ((ModuleInterface(bs))(emptyArray))(emptyArray)})()};
var instrument = function(m){
return (function(){
var instrumentExpr = function(n){
return function(e){
return (function(){
var $pm = e;return ($pm.$tag==Lam.$tag)?((function(a,p,e){
return ((Lam(a))(p))((instrumentExpr(n))(e))})($pm.$0,$pm.$1,$pm.$2)):((function(){
return (function(){
var we = ((Lam(emptyAnn))("$unused$"))(e);return ((App(emptyAnn))(((App(emptyAnn))((Var(emptyAnn))("perfTime")))((Const(emptyAnn))(CStr(n)))))(we)})()})())})()}};var instrumentDef = function(d){
return (function(){
var $pm = d;return (($pm.$tag==Pair.$tag)&&($pm.$1.$tag==Lam.$tag))?((function(n,a,p,e){
return (Pair(n))((instrumentExpr(n))(((Lam(a))(p))(e)))})($pm.$0,$pm.$1.$0,$pm.$1.$1,$pm.$1.$2)):((function(){
return d})())})()};return (function(){
var $pm = m;return ($pm.$tag==Module.$tag)?((function(ann,is,ds,cs,ins,vs){
return (((((Module(ann))(is))(ds))(cs))(ins))((map(instrumentDef))(vs))})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5)):(error("pattern match fail"))})()})()};
var builtinsPathArg = (ArgString("builtins"))(Nothing);
var outPathArg = (ArgString("out"))(Nothing);
var mainArg = (ArgString("main"))(Nothing);
var profileArg = (ArgBool("profile"))(Just(false));
var compile = function(s){
return (function(){
var $pm = parseModule(s);return (($pm.$tag==Success.$tag)&&($pm.$1.$tag==ParserState.$tag))?((function(m,ts,p,li,ri){
return (function(){
var $pm = ($eq(p))(length(ts));return $pm?((function(){
return m})()):((!$pm)?((function(){
return error(($concat("failed to parse all tokens, stopped at "))(jsonStringify((getIx(p))(ts))))})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1.$0,$pm.$1.$1,$pm.$1.$2,$pm.$1.$3)):((function(e){
return error(e)})($pm))})()};
var argDefs = (push(builtinsPathArg))((push(outPathArg))((push(mainArg))((push(profileArg))(emptyArray))));
var main = function(argv){
return (function(){
var args = (parseArgs(argDefs))((slice(2))(argv));var builtinsPath = (getString(args))(builtinsPathArg);var mainName = ($concat("//"))((getString(args))(mainArg));var srcFiles = getPositional(args);var srcs = ((foldl(function(ss){
return function(s){
return ((set(($concat("//"))(s)))(readFile(s)))(ss)}}))(empty))(srcFiles);var compiled = (mapRecord(compile))(srcs);var imports = (mapRecord(findImports))(compiled);var ordered = ((dfs(imports))(emptyArray))(mainName);var builtinsExports = loadJSExports(builtinsPath);var exports = ((set("./builtins.js"))(parseExports(builtinsExports)))(empty);var profile = (getBool(args))(profileArg);var toJs = function(er){
return function(n){
return (function(){
var $pm = er;return ($pm.$tag==Pair.$tag)?((function(exports,result){
return (function(){
var m = (get(n))(compiled);var typed = (inferTypeModule(exports))((normalizeImports(exports))(m));var declassed = (declassModule(exports))(typed);var transpiled = (function(){
var $pm = profile;return $pm?((function(){
return (compileModule(exports))(instrument(declassed))})()):((!$pm)?((function(){
return (compileModule(exports))(declassed)})()):(error("pattern match fail")))})();var e = getTypedExports(typed);return (Pair(((set(n))(e))(exports)))((push((Pair(n))(transpiled)))(result))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};var jsms = snd(((foldr(toJs))((Pair(exports))(emptyArray)))(ordered));var js = ((combineModules(mainName))(builtinsPath))(jsms);var outPath = (getString(args))(outPathArg);return (writeFile(js))(outPath)})()};
var exports = {findImports:findImports,parseT:parseT,parseExports:parseExports,instrument:instrument,builtinsPathArg:builtinsPathArg,outPathArg:outPathArg,mainArg:mainArg,profileArg:profileArg,compile:compile,argDefs:argDefs,main:main}
return exports;})();module.exports = cache["//compiler/compiler.jg"]
if (module.exports.main)module.exports.main(process.argv)