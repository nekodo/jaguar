var cache = {}
function _require(f) {
  return cache[f] || require(f == "./builtins.js" ? process.cwd() + "/" + "compiler/builtins.js" : f);
}
cache["//compiler/compiler.jg"] = (function() {var writeFile = (_require("./builtins.js")).writeFile;
var readFile = (_require("./builtins.js")).readFile;
var processCwd = (_require("./builtins.js")).processCwd;
var processArgv = (_require("./builtins.js")).processArgv;
var loadJSExports = (_require("./builtins.js")).loadJSExports;
var $add = (_require("./builtins.js")).$add;
var $del = (_require("./builtins.js")).$del;
var $mul = (_require("./builtins.js")).$mul;
var jsLt = (_require("./builtins.js")).jsLt;
var $lt = (_require("./builtins.js")).$lt;
var $gt = (_require("./builtins.js")).$gt;
var jsEq = (_require("./builtins.js")).jsEq;
var $and = (_require("./builtins.js")).$and;
var $or = (_require("./builtins.js")).$or;
var $concat = (_require("./builtins.js")).$concat;
var empty = (_require("./builtins.js")).empty;
var get = (_require("./builtins.js")).get;
var getIx = (_require("./builtins.js")).getIx;
var setIx = (_require("./builtins.js")).setIx;
var getChar = (_require("./builtins.js")).getChar;
var keys = (_require("./builtins.js")).keys;
var has = (_require("./builtins.js")).has;
var del = (_require("./builtins.js")).del;
var set = (_require("./builtins.js")).set;
var mapRecord = (_require("./builtins.js")).mapRecord;
var foldRecord = (_require("./builtins.js")).foldRecord;
var merge = (_require("./builtins.js")).merge;
var unsafeStringToInt = (_require("./builtins.js")).unsafeStringToInt;
var match = (_require("./builtins.js")).match;
var drop = (_require("./builtins.js")).drop;
var length = (_require("./builtins.js")).length;
var emptyArray = (_require("./builtins.js")).emptyArray;
var push = (_require("./builtins.js")).push;
var enqueue = (_require("./builtins.js")).enqueue;
var intToString = (_require("./builtins.js")).intToString;
var intercalate = (_require("./builtins.js")).intercalate;
var slice = (_require("./builtins.js")).slice;
var slice2 = (_require("./builtins.js")).slice2;
var splice = (_require("./builtins.js")).splice;
var concat = (_require("./builtins.js")).concat;
var map = (_require("./builtins.js")).map;
var filter = (_require("./builtins.js")).filter;
var foldr = (_require("./builtins.js")).foldr;
var foldr1 = (_require("./builtins.js")).foldr1;
var foldl = (_require("./builtins.js")).foldl;
var foldl1 = (_require("./builtins.js")).foldl1;
var sort = (_require("./builtins.js")).sort;
var error = (_require("./builtins.js")).error;
var debug = (_require("./builtins.js")).debug;
var jsonStringify = (_require("./builtins.js")).jsonStringify;
var iterate = (_require("./builtins.js")).iterate;
var True = (_require("./builtins.js")).True;
var False = (_require("./builtins.js")).False;
var perfTime = (_require("./builtins.js")).perfTime;
var bitAnd = (_require("./builtins.js")).bitAnd;
var bitOr = (_require("./builtins.js")).bitOr;
var bitShiftRight = (_require("./builtins.js")).bitShiftRight;
var bitShiftLeft = (_require("./builtins.js")).bitShiftLeft;
var strHashCode = (_require("./builtins.js")).strHashCode;
var bitNot = (_require("./builtins.js")).bitNot;
var stringReplaceChar = (_require("./builtins.js")).stringReplaceChar;
var $$$compiler$prelude_jg$$Unit = function(){
this.$tag="$$compiler$prelude_jg$$Unit"};
var $$compiler$prelude_jg$$Unit = new $$$compiler$prelude_jg$$Unit();
$$compiler$prelude_jg$$Unit.$tag = "$$compiler$prelude_jg$$Unit";
var $$$compiler$prelude_jg$$Just = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$prelude_jg$$Just"};
var $$compiler$prelude_jg$$Just = function($0){
return new $$$compiler$prelude_jg$$Just($0)};
$$compiler$prelude_jg$$Just.$tag = "$$compiler$prelude_jg$$Just";
var $$$compiler$prelude_jg$$Nothing = function(){
this.$tag="$$compiler$prelude_jg$$Nothing"};
var $$compiler$prelude_jg$$Nothing = new $$$compiler$prelude_jg$$Nothing();
$$compiler$prelude_jg$$Nothing.$tag = "$$compiler$prelude_jg$$Nothing";
var $$$compiler$prelude_jg$$Pair = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$prelude_jg$$Pair"};
var $$compiler$prelude_jg$$Pair = function($0){
return function($1){
return new $$$compiler$prelude_jg$$Pair($0,$1)}};
$$compiler$prelude_jg$$Pair.$tag = "$$compiler$prelude_jg$$Pair";
var $$$compiler$prelude_jg$$Left = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$prelude_jg$$Left"};
var $$compiler$prelude_jg$$Left = function($0){
return new $$$compiler$prelude_jg$$Left($0)};
$$compiler$prelude_jg$$Left.$tag = "$$compiler$prelude_jg$$Left";
var $$$compiler$prelude_jg$$Right = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$prelude_jg$$Right"};
var $$compiler$prelude_jg$$Right = function($0){
return new $$$compiler$prelude_jg$$Right($0)};
$$compiler$prelude_jg$$Right.$tag = "$$compiler$prelude_jg$$Right";
var $$$compiler$prelude_jg$$State = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$prelude_jg$$State"};
var $$compiler$prelude_jg$$State = function($0){
return new $$$compiler$prelude_jg$$State($0)};
$$compiler$prelude_jg$$State.$tag = "$$compiler$prelude_jg$$State";
var $$$compiler$prelude_jg$$Empty = function(){
this.$tag="$$compiler$prelude_jg$$Empty"};
var $$compiler$prelude_jg$$Empty = new $$$compiler$prelude_jg$$Empty();
$$compiler$prelude_jg$$Empty.$tag = "$$compiler$prelude_jg$$Empty";
var $$$compiler$prelude_jg$$Leaf = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$prelude_jg$$Leaf"};
var $$compiler$prelude_jg$$Leaf = function($0){
return function($1){
return new $$$compiler$prelude_jg$$Leaf($0,$1)}};
$$compiler$prelude_jg$$Leaf.$tag = "$$compiler$prelude_jg$$Leaf";
var $$$compiler$prelude_jg$$Collision = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$prelude_jg$$Collision"};
var $$compiler$prelude_jg$$Collision = function($0){
return new $$$compiler$prelude_jg$$Collision($0)};
$$compiler$prelude_jg$$Collision.$tag = "$$compiler$prelude_jg$$Collision";
var $$$compiler$prelude_jg$$BitmapIndexed = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$prelude_jg$$BitmapIndexed"};
var $$compiler$prelude_jg$$BitmapIndexed = function($0){
return function($1){
return new $$$compiler$prelude_jg$$BitmapIndexed($0,$1)}};
$$compiler$prelude_jg$$BitmapIndexed.$tag = "$$compiler$prelude_jg$$BitmapIndexed";
var $$class$Eq = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$class$Eq"};
var $class$Eq = function($0){
return new $$class$Eq($0)};
$class$Eq.$tag = "$class$Eq";
var $$class$Ord = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$class$Ord"};
var $class$Ord = function($0){
return new $$class$Ord($0)};
$class$Ord.$tag = "$class$Ord";
var $$class$Functor = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$class$Functor"};
var $class$Functor = function($0){
return new $$class$Functor($0)};
$class$Functor.$tag = "$class$Functor";
var $$class$Applicative = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$class$Applicative"};
var $class$Applicative = function($0){
return function($1){
return new $$class$Applicative($0,$1)}};
$class$Applicative.$tag = "$class$Applicative";
var $$class$Alternative = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$class$Alternative"};
var $class$Alternative = function($0){
return function($1){
return new $$class$Alternative($0,$1)}};
$class$Alternative.$tag = "$class$Alternative";
var $$class$Monad = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$class$Monad"};
var $class$Monad = function($0){
return function($1){
return new $$class$Monad($0,$1)}};
$class$Monad.$tag = "$class$Monad";
var $$class$Hashable = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$class$Hashable"};
var $class$Hashable = function($0){
return new $$class$Hashable($0)};
$class$Hashable.$tag = "$class$Hashable";
var $$$compiler$ast_jg$$AnnType = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$ast_jg$$AnnType"};
var $$compiler$ast_jg$$AnnType = function($0){
return new $$$compiler$ast_jg$$AnnType($0)};
$$compiler$ast_jg$$AnnType.$tag = "$$compiler$ast_jg$$AnnType";
var $$$compiler$ast_jg$$AnnCodeLoc = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$ast_jg$$AnnCodeLoc"};
var $$compiler$ast_jg$$AnnCodeLoc = function($0){
return function($1){
return function($2){
return new $$$compiler$ast_jg$$AnnCodeLoc($0,$1,$2)}}};
$$compiler$ast_jg$$AnnCodeLoc.$tag = "$$compiler$ast_jg$$AnnCodeLoc";
var $$$compiler$ast_jg$$AnnUseCount = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$ast_jg$$AnnUseCount"};
var $$compiler$ast_jg$$AnnUseCount = function($0){
return new $$$compiler$ast_jg$$AnnUseCount($0)};
$$compiler$ast_jg$$AnnUseCount.$tag = "$$compiler$ast_jg$$AnnUseCount";
var $$$compiler$ast_jg$$Var = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$ast_jg$$Var"};
var $$compiler$ast_jg$$Var = function($0){
return function($1){
return new $$$compiler$ast_jg$$Var($0,$1)}};
$$compiler$ast_jg$$Var.$tag = "$$compiler$ast_jg$$Var";
var $$$compiler$ast_jg$$Const = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$ast_jg$$Const"};
var $$compiler$ast_jg$$Const = function($0){
return function($1){
return new $$$compiler$ast_jg$$Const($0,$1)}};
$$compiler$ast_jg$$Const.$tag = "$$compiler$ast_jg$$Const";
var $$$compiler$ast_jg$$App = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$ast_jg$$App"};
var $$compiler$ast_jg$$App = function($0){
return function($1){
return function($2){
return new $$$compiler$ast_jg$$App($0,$1,$2)}}};
$$compiler$ast_jg$$App.$tag = "$$compiler$ast_jg$$App";
var $$$compiler$ast_jg$$Lam = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$ast_jg$$Lam"};
var $$compiler$ast_jg$$Lam = function($0){
return function($1){
return function($2){
return new $$$compiler$ast_jg$$Lam($0,$1,$2)}}};
$$compiler$ast_jg$$Lam.$tag = "$$compiler$ast_jg$$Lam";
var $$$compiler$ast_jg$$Case = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$ast_jg$$Case"};
var $$compiler$ast_jg$$Case = function($0){
return function($1){
return function($2){
return new $$$compiler$ast_jg$$Case($0,$1,$2)}}};
$$compiler$ast_jg$$Case.$tag = "$$compiler$ast_jg$$Case";
var $$$compiler$ast_jg$$Let = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$ast_jg$$Let"};
var $$compiler$ast_jg$$Let = function($0){
return function($1){
return function($2){
return new $$$compiler$ast_jg$$Let($0,$1,$2)}}};
$$compiler$ast_jg$$Let.$tag = "$$compiler$ast_jg$$Let";
var $$$compiler$ast_jg$$CNum = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$ast_jg$$CNum"};
var $$compiler$ast_jg$$CNum = function($0){
return new $$$compiler$ast_jg$$CNum($0)};
$$compiler$ast_jg$$CNum.$tag = "$$compiler$ast_jg$$CNum";
var $$$compiler$ast_jg$$CStr = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$ast_jg$$CStr"};
var $$compiler$ast_jg$$CStr = function($0){
return new $$$compiler$ast_jg$$CStr($0)};
$$compiler$ast_jg$$CStr.$tag = "$$compiler$ast_jg$$CStr";
var $$$compiler$ast_jg$$PVar = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$ast_jg$$PVar"};
var $$compiler$ast_jg$$PVar = function($0){
return function($1){
return new $$$compiler$ast_jg$$PVar($0,$1)}};
$$compiler$ast_jg$$PVar.$tag = "$$compiler$ast_jg$$PVar";
var $$$compiler$ast_jg$$PConst = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$ast_jg$$PConst"};
var $$compiler$ast_jg$$PConst = function($0){
return function($1){
return new $$$compiler$ast_jg$$PConst($0,$1)}};
$$compiler$ast_jg$$PConst.$tag = "$$compiler$ast_jg$$PConst";
var $$$compiler$ast_jg$$PData = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$ast_jg$$PData"};
var $$compiler$ast_jg$$PData = function($0){
return function($1){
return function($2){
return new $$$compiler$ast_jg$$PData($0,$1,$2)}}};
$$compiler$ast_jg$$PData.$tag = "$$compiler$ast_jg$$PData";
var $$$compiler$ast_jg$$Module = function($0,$1,$2,$3,$4,$5,$6){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$3=(($3===(undefined))?(error("con")):$3);this.$4=(($4===(undefined))?(error("con")):$4);this.$5=(($5===(undefined))?(error("con")):$5);this.$6=(($6===(undefined))?(error("con")):$6);this.$tag="$$compiler$ast_jg$$Module"};
var $$compiler$ast_jg$$Module = function($0){
return function($1){
return function($2){
return function($3){
return function($4){
return function($5){
return function($6){
return new $$$compiler$ast_jg$$Module($0,$1,$2,$3,$4,$5,$6)}}}}}}};
$$compiler$ast_jg$$Module.$tag = "$$compiler$ast_jg$$Module";
var $$$compiler$ast_jg$$ModuleInterface = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$ast_jg$$ModuleInterface"};
var $$compiler$ast_jg$$ModuleInterface = function($0){
return function($1){
return function($2){
return new $$$compiler$ast_jg$$ModuleInterface($0,$1,$2)}}};
$$compiler$ast_jg$$ModuleInterface.$tag = "$$compiler$ast_jg$$ModuleInterface";
var $$$compiler$ast_jg$$Data = function($0,$1,$2,$3){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$3=(($3===(undefined))?(error("con")):$3);this.$tag="$$compiler$ast_jg$$Data"};
var $$compiler$ast_jg$$Data = function($0){
return function($1){
return function($2){
return function($3){
return new $$$compiler$ast_jg$$Data($0,$1,$2,$3)}}}};
$$compiler$ast_jg$$Data.$tag = "$$compiler$ast_jg$$Data";
var $$$compiler$ast_jg$$DataCon = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$ast_jg$$DataCon"};
var $$compiler$ast_jg$$DataCon = function($0){
return function($1){
return function($2){
return new $$$compiler$ast_jg$$DataCon($0,$1,$2)}}};
$$compiler$ast_jg$$DataCon.$tag = "$$compiler$ast_jg$$DataCon";
var $$$compiler$ast_jg$$Class = function($0,$1,$2,$3){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$3=(($3===(undefined))?(error("con")):$3);this.$tag="$$compiler$ast_jg$$Class"};
var $$compiler$ast_jg$$Class = function($0){
return function($1){
return function($2){
return function($3){
return new $$$compiler$ast_jg$$Class($0,$1,$2,$3)}}}};
$$compiler$ast_jg$$Class.$tag = "$$compiler$ast_jg$$Class";
var $$$compiler$ast_jg$$Instance = function($0,$1,$2,$3){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$3=(($3===(undefined))?(error("con")):$3);this.$tag="$$compiler$ast_jg$$Instance"};
var $$compiler$ast_jg$$Instance = function($0){
return function($1){
return function($2){
return function($3){
return new $$$compiler$ast_jg$$Instance($0,$1,$2,$3)}}}};
$$compiler$ast_jg$$Instance.$tag = "$$compiler$ast_jg$$Instance";
var $$$compiler$ast_jg$$TCBound = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$ast_jg$$TCBound"};
var $$compiler$ast_jg$$TCBound = function($0){
return function($1){
return function($2){
return new $$$compiler$ast_jg$$TCBound($0,$1,$2)}}};
$$compiler$ast_jg$$TCBound.$tag = "$$compiler$ast_jg$$TCBound";
var $$$compiler$ast_jg$$TConst = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$ast_jg$$TConst"};
var $$compiler$ast_jg$$TConst = function($0){
return function($1){
return new $$$compiler$ast_jg$$TConst($0,$1)}};
$$compiler$ast_jg$$TConst.$tag = "$$compiler$ast_jg$$TConst";
var $$$compiler$ast_jg$$TVar = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$ast_jg$$TVar"};
var $$compiler$ast_jg$$TVar = function($0){
return function($1){
return new $$$compiler$ast_jg$$TVar($0,$1)}};
$$compiler$ast_jg$$TVar.$tag = "$$compiler$ast_jg$$TVar";
var $$$compiler$ast_jg$$TApp = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$ast_jg$$TApp"};
var $$compiler$ast_jg$$TApp = function($0){
return function($1){
return function($2){
return new $$$compiler$ast_jg$$TApp($0,$1,$2)}}};
$$compiler$ast_jg$$TApp.$tag = "$$compiler$ast_jg$$TApp";
var $$$compiler$ast_jg$$TBot = function(){
this.$tag="$$compiler$ast_jg$$TBot"};
var $$compiler$ast_jg$$TBot = new $$$compiler$ast_jg$$TBot();
$$compiler$ast_jg$$TBot.$tag = "$$compiler$ast_jg$$TBot";
var $$$compiler$ast_jg$$TForall = function($0,$1,$2,$3){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$3=(($3===(undefined))?(error("con")):$3);this.$tag="$$compiler$ast_jg$$TForall"};
var $$compiler$ast_jg$$TForall = function($0){
return function($1){
return function($2){
return function($3){
return new $$$compiler$ast_jg$$TForall($0,$1,$2,$3)}}}};
$$compiler$ast_jg$$TForall.$tag = "$$compiler$ast_jg$$TForall";
var $$$compiler$ast_jg$$TUnknown = function(){
this.$tag="$$compiler$ast_jg$$TUnknown"};
var $$compiler$ast_jg$$TUnknown = new $$$compiler$ast_jg$$TUnknown();
$$compiler$ast_jg$$TUnknown.$tag = "$$compiler$ast_jg$$TUnknown";
var $$$compiler$ast_jg$$ImportClosed = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$ast_jg$$ImportClosed"};
var $$compiler$ast_jg$$ImportClosed = function($0){
return function($1){
return function($2){
return new $$$compiler$ast_jg$$ImportClosed($0,$1,$2)}}};
$$compiler$ast_jg$$ImportClosed.$tag = "$$compiler$ast_jg$$ImportClosed";
var $$$compiler$ast_jg$$ImportOpen = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$ast_jg$$ImportOpen"};
var $$compiler$ast_jg$$ImportOpen = function($0){
return function($1){
return function($2){
return new $$$compiler$ast_jg$$ImportOpen($0,$1,$2)}}};
$$compiler$ast_jg$$ImportOpen.$tag = "$$compiler$ast_jg$$ImportOpen";
var $$$compiler$ast_jg$$ImportAll = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$ast_jg$$ImportAll"};
var $$compiler$ast_jg$$ImportAll = function($0){
return function($1){
return new $$$compiler$ast_jg$$ImportAll($0,$1)}};
$$compiler$ast_jg$$ImportAll.$tag = "$$compiler$ast_jg$$ImportAll";
var $$$compiler$typer_jg$$Subs = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$typer_jg$$Subs"};
var $$compiler$typer_jg$$Subs = function($0){
return function($1){
return new $$$compiler$typer_jg$$Subs($0,$1)}};
$$compiler$typer_jg$$Subs.$tag = "$$compiler$typer_jg$$Subs";
var $$$compiler$typer_jg$$ICtx = function($0,$1,$2,$3){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$3=(($3===(undefined))?(error("con")):$3);this.$tag="$$compiler$typer_jg$$ICtx"};
var $$compiler$typer_jg$$ICtx = function($0){
return function($1){
return function($2){
return function($3){
return new $$$compiler$typer_jg$$ICtx($0,$1,$2,$3)}}}};
$$compiler$typer_jg$$ICtx.$tag = "$$compiler$typer_jg$$ICtx";
var $$$compiler$typer_jg$$IEnv = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$typer_jg$$IEnv"};
var $$compiler$typer_jg$$IEnv = function($0){
return function($1){
return function($2){
return new $$$compiler$typer_jg$$IEnv($0,$1,$2)}}};
$$compiler$typer_jg$$IEnv.$tag = "$$compiler$typer_jg$$IEnv";
var $$$compiler$declasser_jg$$S = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$declasser_jg$$S"};
var $$compiler$declasser_jg$$S = function($0){
return function($1){
return function($2){
return new $$$compiler$declasser_jg$$S($0,$1,$2)}}};
$$compiler$declasser_jg$$S.$tag = "$$compiler$declasser_jg$$S";
var $$$compiler$args_jg$$ArgBool = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$args_jg$$ArgBool"};
var $$compiler$args_jg$$ArgBool = function($0){
return function($1){
return new $$$compiler$args_jg$$ArgBool($0,$1)}};
$$compiler$args_jg$$ArgBool.$tag = "$$compiler$args_jg$$ArgBool";
var $$$compiler$args_jg$$ArgString = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$args_jg$$ArgString"};
var $$compiler$args_jg$$ArgString = function($0){
return function($1){
return new $$$compiler$args_jg$$ArgString($0,$1)}};
$$compiler$args_jg$$ArgString.$tag = "$$compiler$args_jg$$ArgString";
var $$$compiler$args_jg$$ParsedArgs = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$args_jg$$ParsedArgs"};
var $$compiler$args_jg$$ParsedArgs = function($0){
return function($1){
return function($2){
return new $$$compiler$args_jg$$ParsedArgs($0,$1,$2)}}};
$$compiler$args_jg$$ParsedArgs.$tag = "$$compiler$args_jg$$ParsedArgs";
var $$$compiler$js$ast_jg$$JSRef = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$js$ast_jg$$JSRef"};
var $$compiler$js$ast_jg$$JSRef = function($0){
return new $$$compiler$js$ast_jg$$JSRef($0)};
$$compiler$js$ast_jg$$JSRef.$tag = "$$compiler$js$ast_jg$$JSRef";
var $$$compiler$js$ast_jg$$JSIndex = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$js$ast_jg$$JSIndex"};
var $$compiler$js$ast_jg$$JSIndex = function($0){
return function($1){
return new $$$compiler$js$ast_jg$$JSIndex($0,$1)}};
$$compiler$js$ast_jg$$JSIndex.$tag = "$$compiler$js$ast_jg$$JSIndex";
var $$$compiler$js$ast_jg$$JSUnOp = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$js$ast_jg$$JSUnOp"};
var $$compiler$js$ast_jg$$JSUnOp = function($0){
return function($1){
return new $$$compiler$js$ast_jg$$JSUnOp($0,$1)}};
$$compiler$js$ast_jg$$JSUnOp.$tag = "$$compiler$js$ast_jg$$JSUnOp";
var $$$compiler$js$ast_jg$$JSBinOp = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$js$ast_jg$$JSBinOp"};
var $$compiler$js$ast_jg$$JSBinOp = function($0){
return function($1){
return function($2){
return new $$$compiler$js$ast_jg$$JSBinOp($0,$1,$2)}}};
$$compiler$js$ast_jg$$JSBinOp.$tag = "$$compiler$js$ast_jg$$JSBinOp";
var $$$compiler$js$ast_jg$$JSCall = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$js$ast_jg$$JSCall"};
var $$compiler$js$ast_jg$$JSCall = function($0){
return function($1){
return new $$$compiler$js$ast_jg$$JSCall($0,$1)}};
$$compiler$js$ast_jg$$JSCall.$tag = "$$compiler$js$ast_jg$$JSCall";
var $$$compiler$js$ast_jg$$JSFun = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$js$ast_jg$$JSFun"};
var $$compiler$js$ast_jg$$JSFun = function($0){
return function($1){
return new $$$compiler$js$ast_jg$$JSFun($0,$1)}};
$$compiler$js$ast_jg$$JSFun.$tag = "$$compiler$js$ast_jg$$JSFun";
var $$$compiler$js$ast_jg$$JSTernary = function($0,$1,$2){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$tag="$$compiler$js$ast_jg$$JSTernary"};
var $$compiler$js$ast_jg$$JSTernary = function($0){
return function($1){
return function($2){
return new $$$compiler$js$ast_jg$$JSTernary($0,$1,$2)}}};
$$compiler$js$ast_jg$$JSTernary.$tag = "$$compiler$js$ast_jg$$JSTernary";
var $$$compiler$js$ast_jg$$JSNum = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$js$ast_jg$$JSNum"};
var $$compiler$js$ast_jg$$JSNum = function($0){
return new $$$compiler$js$ast_jg$$JSNum($0)};
$$compiler$js$ast_jg$$JSNum.$tag = "$$compiler$js$ast_jg$$JSNum";
var $$$compiler$js$ast_jg$$JSString = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$js$ast_jg$$JSString"};
var $$compiler$js$ast_jg$$JSString = function($0){
return new $$$compiler$js$ast_jg$$JSString($0)};
$$compiler$js$ast_jg$$JSString.$tag = "$$compiler$js$ast_jg$$JSString";
var $$$compiler$js$ast_jg$$JSBool = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$js$ast_jg$$JSBool"};
var $$compiler$js$ast_jg$$JSBool = function($0){
return new $$$compiler$js$ast_jg$$JSBool($0)};
$$compiler$js$ast_jg$$JSBool.$tag = "$$compiler$js$ast_jg$$JSBool";
var $$$compiler$js$ast_jg$$JSObject = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$js$ast_jg$$JSObject"};
var $$compiler$js$ast_jg$$JSObject = function($0){
return new $$$compiler$js$ast_jg$$JSObject($0)};
$$compiler$js$ast_jg$$JSObject.$tag = "$$compiler$js$ast_jg$$JSObject";
var $$$compiler$js$ast_jg$$JSNull = function(){
this.$tag="$$compiler$js$ast_jg$$JSNull"};
var $$compiler$js$ast_jg$$JSNull = new $$$compiler$js$ast_jg$$JSNull();
$$compiler$js$ast_jg$$JSNull.$tag = "$$compiler$js$ast_jg$$JSNull";
var $$$compiler$js$ast_jg$$JSUndefined = function(){
this.$tag="$$compiler$js$ast_jg$$JSUndefined"};
var $$compiler$js$ast_jg$$JSUndefined = new $$$compiler$js$ast_jg$$JSUndefined();
$$compiler$js$ast_jg$$JSUndefined.$tag = "$$compiler$js$ast_jg$$JSUndefined";
var $$$compiler$js$ast_jg$$JSInstanceOf = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$js$ast_jg$$JSInstanceOf"};
var $$compiler$js$ast_jg$$JSInstanceOf = function($0){
return function($1){
return new $$$compiler$js$ast_jg$$JSInstanceOf($0,$1)}};
$$compiler$js$ast_jg$$JSInstanceOf.$tag = "$$compiler$js$ast_jg$$JSInstanceOf";
var $$$compiler$js$ast_jg$$JSNew = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$js$ast_jg$$JSNew"};
var $$compiler$js$ast_jg$$JSNew = function($0){
return function($1){
return new $$$compiler$js$ast_jg$$JSNew($0,$1)}};
$$compiler$js$ast_jg$$JSNew.$tag = "$$compiler$js$ast_jg$$JSNew";
var $$$compiler$js$ast_jg$$JSSeq = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$js$ast_jg$$JSSeq"};
var $$compiler$js$ast_jg$$JSSeq = function($0){
return new $$$compiler$js$ast_jg$$JSSeq($0)};
$$compiler$js$ast_jg$$JSSeq.$tag = "$$compiler$js$ast_jg$$JSSeq";
var $$$compiler$js$ast_jg$$JSExpr = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$js$ast_jg$$JSExpr"};
var $$compiler$js$ast_jg$$JSExpr = function($0){
return new $$$compiler$js$ast_jg$$JSExpr($0)};
$$compiler$js$ast_jg$$JSExpr.$tag = "$$compiler$js$ast_jg$$JSExpr";
var $$$compiler$js$ast_jg$$JSReturn = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$js$ast_jg$$JSReturn"};
var $$compiler$js$ast_jg$$JSReturn = function($0){
return new $$$compiler$js$ast_jg$$JSReturn($0)};
$$compiler$js$ast_jg$$JSReturn.$tag = "$$compiler$js$ast_jg$$JSReturn";
var $$$compiler$js$ast_jg$$JSVar = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$js$ast_jg$$JSVar"};
var $$compiler$js$ast_jg$$JSVar = function($0){
return function($1){
return new $$$compiler$js$ast_jg$$JSVar($0,$1)}};
$$compiler$js$ast_jg$$JSVar.$tag = "$$compiler$js$ast_jg$$JSVar";
var $$$compiler$js$ast_jg$$JSSwitch = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$js$ast_jg$$JSSwitch"};
var $$compiler$js$ast_jg$$JSSwitch = function($0){
return function($1){
return new $$$compiler$js$ast_jg$$JSSwitch($0,$1)}};
$$compiler$js$ast_jg$$JSSwitch.$tag = "$$compiler$js$ast_jg$$JSSwitch";
var $$$compiler$js$ast_jg$$JSBreak = function(){
this.$tag="$$compiler$js$ast_jg$$JSBreak"};
var $$compiler$js$ast_jg$$JSBreak = new $$$compiler$js$ast_jg$$JSBreak();
$$compiler$js$ast_jg$$JSBreak.$tag = "$$compiler$js$ast_jg$$JSBreak";
var $$$compiler$js$ast_jg$$JSAssign = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$js$ast_jg$$JSAssign"};
var $$compiler$js$ast_jg$$JSAssign = function($0){
return function($1){
return new $$$compiler$js$ast_jg$$JSAssign($0,$1)}};
$$compiler$js$ast_jg$$JSAssign.$tag = "$$compiler$js$ast_jg$$JSAssign";
var $$$compiler$parsers_jg$$Success = function($0,$1){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$tag="$$compiler$parsers_jg$$Success"};
var $$compiler$parsers_jg$$Success = function($0){
return function($1){
return new $$$compiler$parsers_jg$$Success($0,$1)}};
$$compiler$parsers_jg$$Success.$tag = "$$compiler$parsers_jg$$Success";
var $$$compiler$parsers_jg$$Error = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$parsers_jg$$Error"};
var $$compiler$parsers_jg$$Error = function($0){
return new $$$compiler$parsers_jg$$Error($0)};
$$compiler$parsers_jg$$Error.$tag = "$$compiler$parsers_jg$$Error";
var $$$compiler$parsers_jg$$Parser = function($0){
this.$0=(($0===(undefined))?(error("con")):$0);this.$tag="$$compiler$parsers_jg$$Parser"};
var $$compiler$parsers_jg$$Parser = function($0){
return new $$$compiler$parsers_jg$$Parser($0)};
$$compiler$parsers_jg$$Parser.$tag = "$$compiler$parsers_jg$$Parser";
var $$$compiler$jaguarLexer_jg$$LexerState = function($0,$1,$2,$3){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$3=(($3===(undefined))?(error("con")):$3);this.$tag="$$compiler$jaguarLexer_jg$$LexerState"};
var $$compiler$jaguarLexer_jg$$LexerState = function($0){
return function($1){
return function($2){
return function($3){
return new $$$compiler$jaguarLexer_jg$$LexerState($0,$1,$2,$3)}}}};
$$compiler$jaguarLexer_jg$$LexerState.$tag = "$$compiler$jaguarLexer_jg$$LexerState";
var $$$compiler$jaguarLexer_jg$$WsTok = function(){
this.$tag="$$compiler$jaguarLexer_jg$$WsTok"};
var $$compiler$jaguarLexer_jg$$WsTok = new $$$compiler$jaguarLexer_jg$$WsTok();
$$compiler$jaguarLexer_jg$$WsTok.$tag = "$$compiler$jaguarLexer_jg$$WsTok";
var $$$compiler$jaguarLexer_jg$$SymTok = function(){
this.$tag="$$compiler$jaguarLexer_jg$$SymTok"};
var $$compiler$jaguarLexer_jg$$SymTok = new $$$compiler$jaguarLexer_jg$$SymTok();
$$compiler$jaguarLexer_jg$$SymTok.$tag = "$$compiler$jaguarLexer_jg$$SymTok";
var $$$compiler$jaguarLexer_jg$$NumTok = function(){
this.$tag="$$compiler$jaguarLexer_jg$$NumTok"};
var $$compiler$jaguarLexer_jg$$NumTok = new $$$compiler$jaguarLexer_jg$$NumTok();
$$compiler$jaguarLexer_jg$$NumTok.$tag = "$$compiler$jaguarLexer_jg$$NumTok";
var $$$compiler$jaguarLexer_jg$$StrTok = function(){
this.$tag="$$compiler$jaguarLexer_jg$$StrTok"};
var $$compiler$jaguarLexer_jg$$StrTok = new $$$compiler$jaguarLexer_jg$$StrTok();
$$compiler$jaguarLexer_jg$$StrTok.$tag = "$$compiler$jaguarLexer_jg$$StrTok";
var $$$compiler$jaguarLexer_jg$$OpTok = function(){
this.$tag="$$compiler$jaguarLexer_jg$$OpTok"};
var $$compiler$jaguarLexer_jg$$OpTok = new $$$compiler$jaguarLexer_jg$$OpTok();
$$compiler$jaguarLexer_jg$$OpTok.$tag = "$$compiler$jaguarLexer_jg$$OpTok";
var $$$compiler$jaguarLexer_jg$$IdTok = function(){
this.$tag="$$compiler$jaguarLexer_jg$$IdTok"};
var $$compiler$jaguarLexer_jg$$IdTok = new $$$compiler$jaguarLexer_jg$$IdTok();
$$compiler$jaguarLexer_jg$$IdTok.$tag = "$$compiler$jaguarLexer_jg$$IdTok";
var $$$compiler$jaguarLexer_jg$$ComTok = function(){
this.$tag="$$compiler$jaguarLexer_jg$$ComTok"};
var $$compiler$jaguarLexer_jg$$ComTok = new $$$compiler$jaguarLexer_jg$$ComTok();
$$compiler$jaguarLexer_jg$$ComTok.$tag = "$$compiler$jaguarLexer_jg$$ComTok";
var $$$compiler$jaguarLexer_jg$$Token = function($0,$1,$2,$3){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$3=(($3===(undefined))?(error("con")):$3);this.$tag="$$compiler$jaguarLexer_jg$$Token"};
var $$compiler$jaguarLexer_jg$$Token = function($0){
return function($1){
return function($2){
return function($3){
return new $$$compiler$jaguarLexer_jg$$Token($0,$1,$2,$3)}}}};
$$compiler$jaguarLexer_jg$$Token.$tag = "$$compiler$jaguarLexer_jg$$Token";
var $$$compiler$jaguarParser_jg$$ParserState = function($0,$1,$2,$3,$4){
this.$0=(($0===(undefined))?(error("con")):$0);this.$1=(($1===(undefined))?(error("con")):$1);this.$2=(($2===(undefined))?(error("con")):$2);this.$3=(($3===(undefined))?(error("con")):$3);this.$4=(($4===(undefined))?(error("con")):$4);this.$tag="$$compiler$jaguarParser_jg$$ParserState"};
var $$compiler$jaguarParser_jg$$ParserState = function($0){
return function($1){
return function($2){
return function($3){
return function($4){
return new $$$compiler$jaguarParser_jg$$ParserState($0,$1,$2,$3,$4)}}}}};
$$compiler$jaguarParser_jg$$ParserState.$tag = "$$compiler$jaguarParser_jg$$ParserState";
var $eq$eq = function(x){
return (function(){
var $pm = x;return ($pm.$tag==$class$Eq.$tag)?((function($eq$eq){
return $eq$eq})($pm.$0)):(error("pattern match fail"))})()};
var $lt = function(x){
return (function(){
var $pm = x;return ($pm.$tag==$class$Ord.$tag)?((function($lt){
return $lt})($pm.$0)):(error("pattern match fail"))})()};
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
var $lt$pip$gt = function(x){
return (function(){
var $pm = x;return ($pm.$tag==$class$Alternative.$tag)?((function(zero,$lt$pip$gt){
return $lt$pip$gt})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var ret = function(x){
return (function(){
var $pm = x;return ($pm.$tag==$class$Monad.$tag)?((function(ret,$gt$gt$eq){
return ret})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var $gt$gt$eq = function(x){
return (function(){
var $pm = x;return ($pm.$tag==$class$Monad.$tag)?((function(ret,$gt$gt$eq){
return $gt$gt$eq})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var hashCode = function(x){
return (function(){
var $pm = x;return ($pm.$tag==$class$Hashable.$tag)?((function(hashCode){
return hashCode})($pm.$0)):(error("pattern match fail"))})()};
var $instance$Eq$0 = $class$Eq(jsEq);
var $instance$Eq$1 = $class$Eq(jsEq);
var $instance$Ord$2 = $class$Ord(jsLt);
var $instance$Ord$3 = $class$Ord(jsLt);
var $instance$Functor$4 = $class$Functor(function(_19_f_$u$265){
return function(_19_m_$u$266){
return (function(){
var $pm = _19_m_$u$266;return ($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_19_x_$u$267){
return $$compiler$prelude_jg$$Just(_19_f_$u$265(_19_x_$u$267))})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return $$compiler$prelude_jg$$Nothing})()):(error("pattern match fail")))})()}});
var $instance$Applicative$5 = ($class$Applicative(function(_19_x_$u$268){
return $$compiler$prelude_jg$$Just(_19_x_$u$268)}))(function(_19_f_$u$269){
return function(_19_x_$u$270){
return (function(){
var $pm = _19_f_$u$269;return ($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return $$compiler$prelude_jg$$Nothing})()):(($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_19_f_$u$271){
return ((fmap($instance$Functor$4))(_19_f_$u$271))(_19_x_$u$270)})($pm.$0)):(error("pattern match fail")))})()}});
var $instance$Alternative$6 = ($class$Alternative($$compiler$prelude_jg$$Nothing))(function(_19_a_$u$272){
return function(_19_b_$u$273){
return (function(){
var $pm = _19_a_$u$272;return ($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return _19_b_$u$273})()):((function(_19___$u$274){
return _19_a_$u$272})($pm))})()}});
var $instance$Functor$9 = $class$Functor(function(_19_f_$u$282){
return function(_19_s_$u$283){
return (function(){
var $pm = _19_s_$u$283;return ($pm.$tag==$$compiler$prelude_jg$$State.$tag)?((function(_19_sf_$u$284){
return $$compiler$prelude_jg$$State(function(_19_s_$u$285){
return (function(){
var $pm = _19_sf_$u$284(_19_s_$u$285);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_19_s_$u$286,_19_a_$u$287){
return ($$compiler$prelude_jg$$Pair(_19_s_$u$286))(_19_f_$u$282(_19_a_$u$287))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})})($pm.$0)):(error("pattern match fail"))})()}});
var $instance$Applicative$10 = ($class$Applicative(function(_19_a_$u$288){
return $$compiler$prelude_jg$$State(function(_19_s_$u$289){
return ($$compiler$prelude_jg$$Pair(_19_s_$u$289))(_19_a_$u$288)})}))(function(_19_f_$u$290){
return function(_19_a_$u$291){
return (function(){
var $pm = _19_f_$u$290;return ($pm.$tag==$$compiler$prelude_jg$$State.$tag)?((function(_19_sf_$u$292){
return (function(){
var $pm = _19_a_$u$291;return ($pm.$tag==$$compiler$prelude_jg$$State.$tag)?((function(_19_sa_$u$293){
return $$compiler$prelude_jg$$State(function(_19_s_$u$294){
return (function(){
var $pm = _19_sf_$u$292(_19_s_$u$294);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_19_s_$u$295,_19_f_$u$296){
return (function(){
var $pm = _19_sa_$u$293(_19_s_$u$295);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_19_s_$u$297,_19_a_$u$298){
return ($$compiler$prelude_jg$$Pair(_19_s_$u$297))(_19_f_$u$296(_19_a_$u$298))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})})($pm.$0)):(error("pattern match fail"))})()})($pm.$0)):(error("pattern match fail"))})()}});
var $instance$Monad$11 = ($class$Monad(pure($instance$Applicative$10)))(function(_19_a_$u$299){
return function(_19_f_$u$300){
return (function(){
var $pm = _19_a_$u$299;return ($pm.$tag==$$compiler$prelude_jg$$State.$tag)?((function(_19_sa_$u$301){
return $$compiler$prelude_jg$$State(function(_19_s_$u$302){
return (function(){
var $pm = _19_sa_$u$301(_19_s_$u$302);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_19_s_$u$303,_19_a_$u$304){
return (function(){
var $pm = _19_f_$u$300(_19_a_$u$304);return ($pm.$tag==$$compiler$prelude_jg$$State.$tag)?((function(_19_sb_$u$305){
return _19_sb_$u$305(_19_s_$u$303)})($pm.$0)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})})($pm.$0)):(error("pattern match fail"))})()}});
var $instance$Hashable$13 = $class$Hashable(function(_19_s_$u$307){
return strHashCode(_19_s_$u$307)});
var $$compiler$prelude_jg$$emptySet = $$compiler$prelude_jg$$Empty;
var $$compiler$prelude_jg$$not = function(_19_b_$u$44){
return (function(){
var $pm = _19_b_$u$44;return $pm?((function(){
return false})()):((!$pm)?((function(){
return true})()):(error("pattern match fail")))})()};
var $$compiler$prelude_jg$$$div$eq = function(local$instance$Eq$0){
return function(_19_a_$u$2){
return function(_19_b_$u$3){
return $$compiler$prelude_jg$$not((($eq$eq(local$instance$Eq$0))(_19_a_$u$2))(_19_b_$u$3))}}};
var $$compiler$prelude_jg$$fst = function(_19_p_$u$24){
return (function(){
var $pm = _19_p_$u$24;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_19_a_$u$25,_19_b_$u$26){
return _19_a_$u$25})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var $$compiler$prelude_jg$$mapIx = function(_19_f_$u$68){
return function(_19_ix_$u$69){
return function(_19_xs_$u$70){
return ((setIx(_19_ix_$u$69))(_19_f_$u$68((getIx(_19_ix_$u$69))(_19_xs_$u$70))))(_19_xs_$u$70)}}};
var $$compiler$prelude_jg$$arr1 = function(_19_x_$u$97){
return (push(_19_x_$u$97))(emptyArray)};
var $$compiler$prelude_jg$$arr2 = function(_19_x_$u$98){
return function(_19_y_$u$99){
return (push(_19_y_$u$99))($$compiler$prelude_jg$$arr1(_19_x_$u$98))}};
var $$compiler$prelude_jg$$hamtMask = function(_19_depth_$u$150){
return function(_19_hash_$u$151){
return (function(){
var _19_h_$u$152 = (_19_hash_$u$151>>>(_19_depth_$u$150*5))&31;return 1<<_19_h_$u$152})()}};
var $$compiler$prelude_jg$$popCount = function(_19_n_$u$144){
return (function(){
var _19_n2_$u$145 = _19_n_$u$144-((_19_n_$u$144>>>1)&1431655765);var _19_n3_$u$146 = (_19_n2_$u$145&858993459)+((_19_n2_$u$145>>>2)&858993459);var _19_n4_$u$147 = (_19_n3_$u$146+(_19_n3_$u$146>>>4))&252645135;var _19_n5_$u$148 = _19_n4_$u$147+(_19_n4_$u$147>>>8);var _19_n6_$u$149 = _19_n5_$u$148+(_19_n5_$u$148>>>16);return _19_n6_$u$149&127})()};
var $$compiler$prelude_jg$$hamtIndex = function(_19_bitmap_$u$153){
return function(_19_mask_$u$154){
return $$compiler$prelude_jg$$popCount(_19_bitmap_$u$153&(_19_mask_$u$154-1))}};
var $$compiler$prelude_jg$$insert = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_19_k_$u$169){
return function(_19_v_$u$170){
return function(_19_t_$u$171){
return (function(){
var _19_hash_$u$172 = (hashCode(local$instance$Hashable$1))(_19_k_$u$169);var _19_f_$u$173 = function(_19_depth_$u$174){
return function(_19_t_$u$175){
return (function(){
var $pm = _19_t_$u$175;return ($pm.$tag==$$compiler$prelude_jg$$Empty.$tag)?((function(){
return ($$compiler$prelude_jg$$Leaf(_19_k_$u$169))(_19_v_$u$170)})()):(($pm.$tag==$$compiler$prelude_jg$$Collision.$tag)?((function(_19_entries_$u$176){
return $$compiler$prelude_jg$$Collision((push(($$compiler$prelude_jg$$Pair(_19_k_$u$169))(_19_v_$u$170)))((filter(function(_19_e_$u$177){
return (($$compiler$prelude_jg$$$div$eq(local$instance$Eq$0))($$compiler$prelude_jg$$fst(_19_e_$u$177)))(_19_k_$u$169)}))(_19_entries_$u$176)))})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$Leaf.$tag)?((function(_19_k2_$u$178,_19_v2_$u$179){
return (function(){
var $pm = (($eq$eq(local$instance$Eq$0))(_19_k_$u$169))(_19_k2_$u$178);return $pm?((function(){
return ($$compiler$prelude_jg$$Leaf(_19_k_$u$169))(_19_v_$u$170)})()):((!$pm)?((function(){
return (function(){
var $pm = _19_depth_$u$174;return (7==$pm)?((function(){
return $$compiler$prelude_jg$$Collision(($$compiler$prelude_jg$$arr2(($$compiler$prelude_jg$$Pair(_19_k2_$u$178))(_19_v2_$u$179)))(($$compiler$prelude_jg$$Pair(_19_k_$u$169))(_19_v_$u$170)))})()):((function(_19___$u$180){
return (_19_f_$u$173(_19_depth_$u$174))(($$compiler$prelude_jg$$BitmapIndexed(($$compiler$prelude_jg$$hamtMask(_19_depth_$u$174))((hashCode(local$instance$Hashable$1))(_19_k2_$u$178))))($$compiler$prelude_jg$$arr1(_19_t_$u$175)))})($pm))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$prelude_jg$$BitmapIndexed.$tag)?((function(_19_bitmap_$u$181,_19_entries_$u$182){
return (function(){
var _19_m_$u$183 = ($$compiler$prelude_jg$$hamtMask(_19_depth_$u$174))(_19_hash_$u$172);var _19_bitmap2_$u$184 = _19_m_$u$183|_19_bitmap_$u$181;var _19_ix_$u$185 = ($$compiler$prelude_jg$$hamtIndex(_19_bitmap2_$u$184))(_19_m_$u$183);return (function(){
var $pm = _19_m_$u$183&_19_bitmap_$u$181;return (0==$pm)?((function(){
return ($$compiler$prelude_jg$$BitmapIndexed(_19_bitmap2_$u$184))((((splice(_19_ix_$u$185))(0))($$compiler$prelude_jg$$arr1(($$compiler$prelude_jg$$Leaf(_19_k_$u$169))(_19_v_$u$170))))(_19_entries_$u$182))})()):((function(_19___$u$186){
return ($$compiler$prelude_jg$$BitmapIndexed(_19_bitmap2_$u$184))((($$compiler$prelude_jg$$mapIx(_19_f_$u$173(_19_depth_$u$174+1)))(_19_ix_$u$185))(_19_entries_$u$182))})($pm))})()})()})($pm.$0,$pm.$1)):(error("pattern match fail")))))})()}};return (_19_f_$u$173(0))(_19_t_$u$171)})()}}}}};
var $$compiler$prelude_jg$$setAdd = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_19_a_$u$243){
return function(_19_s_$u$244){
return (((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_19_a_$u$243))($$compiler$prelude_jg$$Unit))(_19_s_$u$244)}}}};
var $$compiler$prelude_jg$$isJust = function(_19_m_$u$22){
return (function(){
var $pm = _19_m_$u$22;return ($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_19___$u$23){
return true})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return false})()):(error("pattern match fail")))})()};
var $$compiler$prelude_jg$$$ = function(_19_f_$u$0){
return function(_19_a_$u$1){
return _19_f_$u$0(_19_a_$u$1)}};
var $$compiler$prelude_jg$$snd = function(_19_p_$u$27){
return (function(){
var $pm = _19_p_$u$27;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_19_a_$u$28,_19_b_$u$29){
return _19_b_$u$29})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var $$compiler$prelude_jg$$loop = function(_19_f_$u$45){
return function(_19_start_$u$46){
return (function(){
var _19_shouldStop_$u$47 = function(_19_x_$u$51){
return (function(){
var $pm = _19_x_$u$51;return (($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)&&($pm.$1.$tag==$$compiler$prelude_jg$$Nothing.$tag))?((function(_19___$u$52){
return false})($pm.$0)):((function(_19___$u$53){
return true})($pm))})()};var _19_next_$u$48 = function(_19_xr_$u$54){
return (function(){
var $pm = _19_xr_$u$54;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_19_x_$u$55,_19___$u$56){
return (function(){
var $pm = _19_f_$u$45(_19_x_$u$55);return ($pm.$tag==$$compiler$prelude_jg$$Left.$tag)?((function(_19_x2_$u$57){
return ($$compiler$prelude_jg$$Pair(_19_x2_$u$57))($$compiler$prelude_jg$$Nothing)})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$Right.$tag)?((function(_19_r_$u$58){
return ($$compiler$prelude_jg$$Pair(_19_x_$u$55))($$compiler$prelude_jg$$Just(_19_r_$u$58))})($pm.$0)):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};var _19_sp_$u$49 = ($$compiler$prelude_jg$$Pair(_19_start_$u$46))($$compiler$prelude_jg$$Nothing);var _19_result_$u$50 = ((iterate(_19_sp_$u$49))(_19_shouldStop_$u$47))(_19_next_$u$48);return (function(){
var $pm = $$compiler$prelude_jg$$snd(_19_result_$u$50);return ($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_19_r_$u$59){
return _19_r_$u$59})($pm.$0)):(error("pattern match fail"))})()})()}};
var $$compiler$prelude_jg$$find = function(_19_predicate_$u$64){
return function(_19_xs_$u$65){
return (function(){
var _19_f_$u$66 = function(_19_i_$u$67){
return (function(){
var $pm = (($lt($instance$Ord$2))(_19_i_$u$67))(length(_19_xs_$u$65));return (!$pm)?((function(){
return $$compiler$prelude_jg$$Right($$compiler$prelude_jg$$Nothing)})()):($pm?((function(){
return (function(){
var $pm = _19_predicate_$u$64((getIx(_19_i_$u$67))(_19_xs_$u$65));return $pm?((function(){
return $$compiler$prelude_jg$$Right($$compiler$prelude_jg$$Just((getIx(_19_i_$u$67))(_19_xs_$u$65)))})()):((!$pm)?((function(){
return $$compiler$prelude_jg$$Left(_19_i_$u$67+1)})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()};return ($$compiler$prelude_jg$$loop(_19_f_$u$66))(0)})()}};
var $$compiler$prelude_jg$$lookup = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_19_k_$u$155){
return function(_19_t_$u$156){
return (function(){
var _19_hash_$u$157 = (hashCode(local$instance$Hashable$1))(_19_k_$u$155);var _19_f_$u$158 = function(_19_depth_$u$159){
return function(_19_t_$u$160){
return (function(){
var $pm = _19_t_$u$160;return ($pm.$tag==$$compiler$prelude_jg$$Empty.$tag)?((function(){
return $$compiler$prelude_jg$$Nothing})()):(($pm.$tag==$$compiler$prelude_jg$$Leaf.$tag)?((function(_19_k2_$u$161,_19_v_$u$162){
return (function(){
var $pm = (($eq$eq(local$instance$Eq$0))(_19_k_$u$155))(_19_k2_$u$161);return (!$pm)?((function(){
return $$compiler$prelude_jg$$Nothing})()):($pm?((function(){
return $$compiler$prelude_jg$$Just(_19_v_$u$162)})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$prelude_jg$$Collision.$tag)?((function(_19_entries_$u$163){
return ($$compiler$prelude_jg$$$((fmap($instance$Functor$4))($$compiler$prelude_jg$$snd)))(($$compiler$prelude_jg$$find(function(_19_e_$u$164){
return (($eq$eq(local$instance$Eq$0))($$compiler$prelude_jg$$fst(_19_e_$u$164)))(_19_k_$u$155)}))(_19_entries_$u$163))})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$BitmapIndexed.$tag)?((function(_19_bitmap_$u$165,_19_entries_$u$166){
return (function(){
var _19_m_$u$167 = ($$compiler$prelude_jg$$hamtMask(_19_depth_$u$159))(_19_hash_$u$157);return (function(){
var $pm = _19_m_$u$167&_19_bitmap_$u$165;return (0==$pm)?((function(){
return $$compiler$prelude_jg$$Nothing})()):((function(_19___$u$168){
return (_19_f_$u$158(_19_depth_$u$159+1))((getIx(($$compiler$prelude_jg$$hamtIndex(_19_bitmap_$u$165))(_19_m_$u$167)))(_19_entries_$u$166))})($pm))})()})()})($pm.$0,$pm.$1)):(error("pattern match fail")))))})()}};return (_19_f_$u$158(0))(_19_t_$u$156)})()}}}};
var $$compiler$prelude_jg$$setContains = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_19_a_$u$249){
return function(_19_s_$u$250){
return $$compiler$prelude_jg$$isJust(((($$compiler$prelude_jg$$lookup(local$instance$Hashable$1))(local$instance$Eq$0))(_19_a_$u$249))(_19_s_$u$250))}}}};
var $$compiler$prelude_jg$$foldTrie = function(_19_f_$u$212){
return function(_19_a_$u$213){
return function(_19_t_$u$214){
return (function(){
var $pm = _19_t_$u$214;return ($pm.$tag==$$compiler$prelude_jg$$Empty.$tag)?((function(){
return _19_a_$u$213})()):(($pm.$tag==$$compiler$prelude_jg$$Leaf.$tag)?((function(_19_k_$u$215,_19_v_$u$216){
return ((_19_f_$u$212(_19_a_$u$213))(_19_k_$u$215))(_19_v_$u$216)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$prelude_jg$$Collision.$tag)?((function(_19_entries_$u$217){
return ((foldl(function(_19_a_$u$218){
return function(_19_e_$u$219){
return ((_19_f_$u$212(_19_a_$u$218))($$compiler$prelude_jg$$fst(_19_e_$u$219)))($$compiler$prelude_jg$$snd(_19_e_$u$219))}}))(_19_a_$u$213))(_19_entries_$u$217)})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$BitmapIndexed.$tag)?((function(_19___$u$220,_19_entries_$u$221){
return ((foldl($$compiler$prelude_jg$$foldTrie(_19_f_$u$212)))(_19_a_$u$213))(_19_entries_$u$221)})($pm.$0,$pm.$1)):(error("pattern match fail")))))})()}}};
var $$compiler$prelude_jg$$setIntersection = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_19_a_$u$259){
return function(_19_b_$u$260){
return (function(){
var _19_f_$u$261 = function(_19_r_$u$262){
return function(_19_v_$u$263){
return function(_19___$u$264){
return (function(){
var $pm = ((($$compiler$prelude_jg$$setContains(local$instance$Hashable$1))(local$instance$Eq$0))(_19_v_$u$263))(_19_b_$u$260);return (!$pm)?((function(){
return _19_r_$u$262})()):($pm?((function(){
return ((($$compiler$prelude_jg$$setAdd(local$instance$Hashable$1))(local$instance$Eq$0))(_19_v_$u$263))(_19_r_$u$262)})()):(error("pattern match fail")))})()}}};return (($$compiler$prelude_jg$$foldTrie(_19_f_$u$261))($$compiler$prelude_jg$$Empty))(_19_a_$u$259)})()}}}};
var $$compiler$prelude_jg$$remove = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_19_k_$u$192){
return function(_19_t_$u$193){
return (function(){
var _19_hash_$u$194 = (hashCode(local$instance$Hashable$1))(_19_k_$u$192);var _19_f_$u$195 = function(_19_depth_$u$196){
return function(_19_t_$u$197){
return (function(){
var $pm = _19_t_$u$197;return ($pm.$tag==$$compiler$prelude_jg$$Empty.$tag)?((function(){
return $$compiler$prelude_jg$$Empty})()):(($pm.$tag==$$compiler$prelude_jg$$Leaf.$tag)?((function(_19_k2_$u$198,_19___$u$199){
return (function(){
var $pm = (($eq$eq(local$instance$Eq$0))(_19_k2_$u$198))(_19_k_$u$192);return $pm?((function(){
return $$compiler$prelude_jg$$Empty})()):((!$pm)?((function(){
return _19_t_$u$197})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$prelude_jg$$Collision.$tag)?((function(_19_entries_$u$200){
return (function(){
var _19_entries2_$u$201 = (filter(function(_19_e_$u$202){
return (($$compiler$prelude_jg$$$div$eq(local$instance$Eq$0))($$compiler$prelude_jg$$fst(_19_e_$u$202)))(_19_k_$u$192)}))(_19_entries_$u$200);return (function(){
var $pm = length(_19_entries2_$u$201);return (0==$pm)?((function(){
return $$compiler$prelude_jg$$Empty})()):((1==$pm)?((function(){
return ($$compiler$prelude_jg$$Leaf($$compiler$prelude_jg$$fst((getIx(0))(_19_entries2_$u$201))))($$compiler$prelude_jg$$snd((getIx(0))(_19_entries2_$u$201)))})()):((function(_19___$u$203){
return $$compiler$prelude_jg$$Collision(_19_entries2_$u$201)})($pm)))})()})()})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$BitmapIndexed.$tag)?((function(_19_bitmap_$u$204,_19_entries_$u$205){
return (function(){
var _19_m_$u$206 = ($$compiler$prelude_jg$$hamtMask(_19_depth_$u$196))(_19_hash_$u$194);var _19_ix_$u$207 = ($$compiler$prelude_jg$$hamtIndex(_19_bitmap_$u$204))(_19_m_$u$206);return (function(){
var $pm = _19_m_$u$206&_19_bitmap_$u$204;return (0==$pm)?((function(){
return _19_t_$u$197})()):((function(_19___$u$208){
return (function(){
var $pm = (_19_f_$u$195(_19_depth_$u$196+1))((getIx(_19_ix_$u$207))(_19_entries_$u$205));return ($pm.$tag==$$compiler$prelude_jg$$Empty.$tag)?((function(){
return (function(){
var _19_bitmap2_$u$209 = (bitNot(_19_m_$u$206))&_19_bitmap_$u$204;return (function(){
var $pm = _19_bitmap2_$u$209;return (0==$pm)?((function(){
return $$compiler$prelude_jg$$Empty})()):((function(_19___$u$210){
return ($$compiler$prelude_jg$$BitmapIndexed(_19_bitmap2_$u$209))((((splice(_19_ix_$u$207))(1))(emptyArray))(_19_entries_$u$205))})($pm))})()})()})()):((function(_19_e_$u$211){
return ($$compiler$prelude_jg$$BitmapIndexed(_19_bitmap_$u$204))(((setIx(_19_ix_$u$207))(_19_e_$u$211))(_19_entries_$u$205))})($pm))})()})($pm))})()})()})($pm.$0,$pm.$1)):(error("pattern match fail")))))})()}};return (_19_f_$u$195(0))(_19_t_$u$193)})()}}}};
var $$compiler$prelude_jg$$setRemove = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return ($$compiler$prelude_jg$$remove(local$instance$Hashable$1))(local$instance$Eq$0)}};
var $$compiler$prelude_jg$$setDiff = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_19_a_$u$254){
return function(_19_b_$u$255){
return (($$compiler$prelude_jg$$foldTrie(function(_19_a_$u$256){
return function(_19_v_$u$257){
return function(_19___$u$258){
return ((($$compiler$prelude_jg$$setRemove(local$instance$Hashable$1))(local$instance$Eq$0))(_19_v_$u$257))(_19_a_$u$256)}}}))(_19_a_$u$254))(_19_b_$u$255)}}}};
var $$compiler$prelude_jg$$setToArray = ($$compiler$prelude_jg$$foldTrie(function(_19_vs_$u$251){
return function(_19_v_$u$252){
return function(_19___$u$253){
return (push(_19_v_$u$252))(_19_vs_$u$251)}}}))(emptyArray);
var $$compiler$prelude_jg$$mergeTrie = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_19_a_$u$238){
return function(_19_b_$u$239){
return (($$compiler$prelude_jg$$foldTrie(function(_19_a_$u$240){
return function(_19_k_$u$241){
return function(_19_v_$u$242){
return (((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_19_k_$u$241))(_19_v_$u$242))(_19_a_$u$240)}}}))(_19_a_$u$238))(_19_b_$u$239)}}}};
var $$compiler$prelude_jg$$setUnion = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return ($$compiler$prelude_jg$$mergeTrie(local$instance$Hashable$1))(local$instance$Eq$0)}};
var $$compiler$prelude_jg$$isEmpty = function(_19_t_$u$236){
return (function(){
var $pm = _19_t_$u$236;return ($pm.$tag==$$compiler$prelude_jg$$Empty.$tag)?((function(){
return true})()):((function(_19___$u$237){
return false})($pm))})()};
var $$compiler$prelude_jg$$size = function(_19_t_$u$230){
return (function(){
var $pm = _19_t_$u$230;return ($pm.$tag==$$compiler$prelude_jg$$Empty.$tag)?((function(){
return 0})()):(($pm.$tag==$$compiler$prelude_jg$$Leaf.$tag)?((function(_19___$u$231,_19___$u$232){
return 1})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$prelude_jg$$Collision.$tag)?((function(_19_entries_$u$233){
return length(_19_entries_$u$233)})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$BitmapIndexed.$tag)?((function(_19___$u$234,_19_entries_$u$235){
return ((foldl($add))(0))((map($$compiler$prelude_jg$$size))(_19_entries_$u$235))})($pm.$0,$pm.$1)):(error("pattern match fail")))))})()};
var $$compiler$prelude_jg$$runState = function(_19_s_$u$139){
return function(_19_m_$u$140){
return (function(){
var $pm = _19_m_$u$140;return ($pm.$tag==$$compiler$prelude_jg$$State.$tag)?((function(_19_f_$u$141){
return _19_f_$u$141(_19_s_$u$139)})($pm.$0)):(error("pattern match fail"))})()}};
var $$compiler$prelude_jg$$evalState = function(_19_s_$u$142){
return function(_19_m_$u$143){
return $$compiler$prelude_jg$$snd(($$compiler$prelude_jg$$runState(_19_s_$u$142))(_19_m_$u$143))}};
var $$compiler$prelude_jg$$sets = function(_19_s_$u$137){
return $$compiler$prelude_jg$$State(function(_19___$u$138){
return ($$compiler$prelude_jg$$Pair(_19_s_$u$137))($$compiler$prelude_jg$$Unit)})};
var $$compiler$prelude_jg$$gets = $$compiler$prelude_jg$$State(function(_19_s_$u$136){
return ($$compiler$prelude_jg$$Pair(_19_s_$u$136))(_19_s_$u$136)});
var $$compiler$prelude_jg$$foldM = function(local$instance$Monad$0){
return function(_19_f_$u$123){
return function(_19_r_$u$124){
return function(_19_xs_$u$125){
return ((foldl(function(_19_r_$u$126){
return function(_19_x_$u$127){
return (($gt$gt$eq(local$instance$Monad$0))(_19_r_$u$126))(function(_19_r_$u$128){
return (_19_f_$u$123(_19_r_$u$128))(_19_x_$u$127)})}}))((ret(local$instance$Monad$0))(_19_r_$u$124)))(_19_xs_$u$125)}}}};
var $$compiler$prelude_jg$$mapM = function(local$instance$Monad$0){
return function(_19_f_$u$129){
return function(_19_xs_$u$130){
return ((($$compiler$prelude_jg$$foldM(local$instance$Monad$0))(function(_19_xs_$u$131){
return function(_19_x_$u$132){
return (($gt$gt$eq(local$instance$Monad$0))(_19_f_$u$129(_19_x_$u$132)))(function(_19_x_$u$133){
return (ret(local$instance$Monad$0))((push(_19_x_$u$133))(_19_xs_$u$131))})}}))(emptyArray))(_19_xs_$u$130)}}};
var $$compiler$prelude_jg$$strToArray = function(_19_s_$u$118){
return (function(){
var _19_f_$u$119 = function(_19_p_$u$120){
return (function(){
var $pm = _19_p_$u$120;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_19_i_$u$121,_19_r_$u$122){
return (function(){
var $pm = (($lt($instance$Ord$2))(_19_i_$u$121))(length(_19_s_$u$118));return (!$pm)?((function(){
return $$compiler$prelude_jg$$Right(_19_r_$u$122)})()):($pm?((function(){
return $$compiler$prelude_jg$$Left(($$compiler$prelude_jg$$Pair(_19_i_$u$121+1))((push((getChar(_19_i_$u$121))(_19_s_$u$118)))(_19_r_$u$122)))})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return ($$compiler$prelude_jg$$loop(_19_f_$u$119))(($$compiler$prelude_jg$$Pair(0))(emptyArray))})()};
var $$compiler$prelude_jg$$toRecord = (foldl(function(_19_r_$u$114){
return function(_19_p_$u$115){
return (function(){
var $pm = _19_p_$u$115;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_19_k_$u$116,_19_v_$u$117){
return ((set(_19_k_$u$116))(_19_v_$u$117))(_19_r_$u$114)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(empty);
var $$compiler$prelude_jg$$reverse = (foldl(function(_19_xs_$u$112){
return function(_19_x_$u$113){
return (enqueue(_19_x_$u$113))(_19_xs_$u$112)}}))(emptyArray);
var $$compiler$prelude_jg$$tail = slice(1);
var $$compiler$prelude_jg$$head = getIx(0);
var $$compiler$prelude_jg$$uniq = function(local$instance$Eq$0){
return function(_19_xs_$u$111){
return (function(){
var $pm = (($lt($instance$Ord$2))(length(_19_xs_$u$111)))(2);return $pm?((function(){
return _19_xs_$u$111})()):((!$pm)?((function(){
return (function(){
var $pm = (($eq$eq(local$instance$Eq$0))((getIx(0))(_19_xs_$u$111)))((getIx(1))(_19_xs_$u$111));return (!$pm)?((function(){
return (enqueue($$compiler$prelude_jg$$head(_19_xs_$u$111)))(($$compiler$prelude_jg$$uniq(local$instance$Eq$0))($$compiler$prelude_jg$$tail(_19_xs_$u$111)))})()):($pm?((function(){
return ($$compiler$prelude_jg$$uniq(local$instance$Eq$0))($$compiler$prelude_jg$$tail(_19_xs_$u$111))})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()}};
var $$compiler$prelude_jg$$mergeSet = function(local$instance$Ord$1){
return function(local$instance$Eq$0){
return function(_19_xs_$u$107){
return function(_19_ys_$u$108){
return (function(){
var $pm = length(_19_xs_$u$107);return (0==$pm)?((function(){
return _19_ys_$u$108})()):((function(_19_lx_$u$109){
return (function(){
var $pm = length(_19_ys_$u$108);return (0==$pm)?((function(){
return _19_xs_$u$107})()):((function(_19_ly_$u$110){
return (function(){
var $pm = (($lt(local$instance$Ord$1))($$compiler$prelude_jg$$head(_19_xs_$u$107)))($$compiler$prelude_jg$$head(_19_ys_$u$108));return $pm?((function(){
return (enqueue($$compiler$prelude_jg$$head(_19_xs_$u$107)))(((($$compiler$prelude_jg$$mergeSet(local$instance$Ord$1))(local$instance$Eq$0))($$compiler$prelude_jg$$tail(_19_xs_$u$107)))(_19_ys_$u$108))})()):((!$pm)?((function(){
return (function(){
var $pm = (($eq$eq(local$instance$Eq$0))($$compiler$prelude_jg$$head(_19_xs_$u$107)))($$compiler$prelude_jg$$head(_19_ys_$u$108));return $pm?((function(){
return (enqueue($$compiler$prelude_jg$$head(_19_xs_$u$107)))(((($$compiler$prelude_jg$$mergeSet(local$instance$Ord$1))(local$instance$Eq$0))($$compiler$prelude_jg$$tail(_19_xs_$u$107)))($$compiler$prelude_jg$$tail(_19_ys_$u$108)))})()):((!$pm)?((function(){
return (enqueue($$compiler$prelude_jg$$head(_19_ys_$u$108)))(((($$compiler$prelude_jg$$mergeSet(local$instance$Ord$1))(local$instance$Eq$0))(_19_xs_$u$107))($$compiler$prelude_jg$$tail(_19_ys_$u$108)))})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()})($pm))})()})($pm))})()}}}};
var $$compiler$prelude_jg$$arr3 = function(_19_x_$u$100){
return function(_19_y_$u$101){
return function(_19_z_$u$102){
return (push(_19_z_$u$102))(($$compiler$prelude_jg$$arr2(_19_x_$u$100))(_19_y_$u$101))}}};
var $$compiler$prelude_jg$$init = function(_19_l_$u$96){
return ((slice2(0))((length(_19_l_$u$96))-1))(_19_l_$u$96)};
var $$compiler$prelude_jg$$last = function(_19_l_$u$95){
return (getIx((length(_19_l_$u$95))-1))(_19_l_$u$95)};
var $$compiler$prelude_jg$$concatMap = function(_19_f_$u$93){
return function(_19_a_$u$94){
return ((foldl(concat))(emptyArray))((map(_19_f_$u$93))(_19_a_$u$94))}};
var $$compiler$prelude_jg$$zip = function(_19_xs_$u$91){
return function(_19_ys_$u$92){
return (function(){
var $pm = ($or((($eq$eq($instance$Eq$0))(length(_19_xs_$u$91)))(0)))((($eq$eq($instance$Eq$0))(length(_19_ys_$u$92)))(0));return $pm?((function(){
return emptyArray})()):((!$pm)?((function(){
return (enqueue(($$compiler$prelude_jg$$Pair($$compiler$prelude_jg$$head(_19_xs_$u$91)))($$compiler$prelude_jg$$head(_19_ys_$u$92))))(($$compiler$prelude_jg$$zip($$compiler$prelude_jg$$tail(_19_xs_$u$91)))($$compiler$prelude_jg$$tail(_19_ys_$u$92)))})()):(error("pattern match fail")))})()}};
var $$compiler$prelude_jg$$zipWithIndex2 = function(_19_n_$u$88){
return function(_19_xs_$u$89){
return (function(){
var $pm = length(_19_xs_$u$89);return (0==$pm)?((function(){
return emptyArray})()):((function(_19_x_$u$90){
return (enqueue(($$compiler$prelude_jg$$Pair(_19_n_$u$88))($$compiler$prelude_jg$$head(_19_xs_$u$89))))(($$compiler$prelude_jg$$zipWithIndex2(_19_n_$u$88+1))($$compiler$prelude_jg$$tail(_19_xs_$u$89)))})($pm))})()}};
var $$compiler$prelude_jg$$zipWithIndex = $$compiler$prelude_jg$$zipWithIndex2(0);
var $$compiler$prelude_jg$$join = function(_19_xs_$u$83){
return function(_19_s_$u$84){
return (function(){
var $pm = length(_19_xs_$u$83);return (0==$pm)?((function(){
return ""})()):((function(_19_n_$u$85){
return (foldl1(function(_19_a_$u$86){
return function(_19_b_$u$87){
return ($concat(($concat(_19_a_$u$86))(_19_s_$u$84)))(_19_b_$u$87)}}))(_19_xs_$u$83)})($pm))})()}};
var $$compiler$prelude_jg$$all = function(_19_f_$u$79){
return function(_19_xs_$u$80){
return ((foldl(function(_19_r_$u$81){
return function(_19_x_$u$82){
return ($and(_19_f_$u$79(_19_x_$u$82)))(_19_r_$u$81)}}))(true))(_19_xs_$u$80)}};
var $$compiler$prelude_jg$$exists = function(_19_f_$u$75){
return function(_19_xs_$u$76){
return ((foldl(function(_19_r_$u$77){
return function(_19_x_$u$78){
return ($or(_19_f_$u$75(_19_x_$u$78)))(_19_r_$u$77)}}))(false))(_19_xs_$u$76)}};
var $$compiler$prelude_jg$$containsChar = function(_19_x_$u$71){
return function(_19_xs_$u$72){
return (function(){
var _19_f_$u$73 = function(_19_i_$u$74){
return (function(){
var $pm = (($lt($instance$Ord$2))(_19_i_$u$74))(length(_19_xs_$u$72));return (!$pm)?((function(){
return false})()):($pm?((function(){
return (function(){
var $pm = (($eq$eq($instance$Eq$1))((getChar(_19_i_$u$74))(_19_xs_$u$72)))(_19_x_$u$71);return $pm?((function(){
return true})()):((!$pm)?((function(){
return _19_f_$u$73(_19_i_$u$74+1)})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()};return _19_f_$u$73(0)})()}};
var $$compiler$prelude_jg$$contains = function(local$instance$Eq$0){
return function(_19_x_$u$60){
return function(_19_xs_$u$61){
return (function(){
var _19_f_$u$62 = function(_19_i_$u$63){
return (function(){
var $pm = (($lt($instance$Ord$2))(_19_i_$u$63))(length(_19_xs_$u$61));return (!$pm)?((function(){
return $$compiler$prelude_jg$$Right(false)})()):($pm?((function(){
return (function(){
var $pm = (($eq$eq(local$instance$Eq$0))(_19_x_$u$60))((getIx(_19_i_$u$63))(_19_xs_$u$61));return $pm?((function(){
return $$compiler$prelude_jg$$Right(true)})()):((!$pm)?((function(){
return $$compiler$prelude_jg$$Left(_19_i_$u$63+1)})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()};return ($$compiler$prelude_jg$$loop(_19_f_$u$62))(0)})()}}};
var $$compiler$prelude_jg$$either = function(_19_f_$u$30){
return function(_19_g_$u$31){
return function(_19_e_$u$32){
return (function(){
var $pm = _19_e_$u$32;return ($pm.$tag==$$compiler$prelude_jg$$Left.$tag)?((function(_19_a_$u$33){
return _19_f_$u$30(_19_a_$u$33)})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$Right.$tag)?((function(_19_b_$u$34){
return _19_g_$u$31(_19_b_$u$34)})($pm.$0)):(error("pattern match fail")))})()}}};
var $$compiler$prelude_jg$$splitEither = function(_19_a_$u$35){
return ($$compiler$prelude_jg$$Pair((map(function(_19_e_$u$36){
return (function(){
var $pm = _19_e_$u$36;return ($pm.$tag==$$compiler$prelude_jg$$Left.$tag)?((function(_19_a_$u$37){
return _19_a_$u$37})($pm.$0)):(error("pattern match fail"))})()}))((filter(($$compiler$prelude_jg$$either(function(_19___$u$38){
return true}))(function(_19___$u$39){
return false})))(_19_a_$u$35))))((map(function(_19_e_$u$40){
return (function(){
var $pm = _19_e_$u$40;return ($pm.$tag==$$compiler$prelude_jg$$Right.$tag)?((function(_19_b_$u$41){
return _19_b_$u$41})($pm.$0)):(error("pattern match fail"))})()}))((filter(($$compiler$prelude_jg$$either(function(_19___$u$42){
return false}))(function(_19___$u$43){
return true})))(_19_a_$u$35)))};
var $$compiler$prelude_jg$$fromJust = function(_19_m_$u$20){
return (function(){
var $pm = _19_m_$u$20;return ($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_19_x_$u$21){
return _19_x_$u$21})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return error("expected Just but got Nothing")})()):(error("pattern match fail")))})()};
var $$compiler$prelude_jg$$justOr = function(_19_d_$u$17){
return function(_19_m_$u$18){
return (function(){
var $pm = _19_m_$u$18;return ($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_19_x_$u$19){
return _19_x_$u$19})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return _19_d_$u$17})()):(error("pattern match fail")))})()}};
var $$compiler$prelude_jg$$$gt$gt = function(local$instance$Monad$0){
return function(_19_a_$u$10){
return function(_19_b_$u$11){
return (($gt$gt$eq(local$instance$Monad$0))(_19_a_$u$10))(function(_19___$u$12){
return _19_b_$u$11})}}};
var $$compiler$prelude_jg$$$gt = function(local$instance$Ord$0){
return function(_19_a_$u$4){
return function(_19_b_$u$5){
return (($lt(local$instance$Ord$0))(_19_b_$u$5))(_19_a_$u$4)}}};
var $$compiler$ast_jg$$Empty = $$compiler$prelude_jg$$Empty;
var $$compiler$ast_jg$$breakableDownAndUpM = function(local$instance$Monad$0){
return function(_18_down_$u$180){
return function(_18_up_$u$181){
return function(_18_e_$u$182){
return (function(){
var _18_go_$u$183 = (($$compiler$ast_jg$$breakableDownAndUpM(local$instance$Monad$0))(_18_down_$u$180))(_18_up_$u$181);var _18_gos_$u$184 = ($$compiler$prelude_jg$$mapM(local$instance$Monad$0))(function(_18_d_$u$185){
return (function(){
var $pm = _18_d_$u$185;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_18_n_$u$186,_18_e_$u$187){
return (($gt$gt$eq(local$instance$Monad$0))(_18_go_$u$183(_18_e_$u$187)))(function(_18_e_$u$188){
return (ret(local$instance$Monad$0))(($$compiler$prelude_jg$$Pair(_18_n_$u$186))(_18_e_$u$188))})})($pm.$0,$pm.$1)):(error("pattern match fail"))})()});return (($gt$gt$eq(local$instance$Monad$0))(_18_down_$u$180(_18_e_$u$182)))(function(_18_e_$u$189){
return (function(){
var $pm = _18_e_$u$189;return ($pm.$tag==$$compiler$prelude_jg$$Right.$tag)?((function(_18_e_$u$190){
return (ret(local$instance$Monad$0))(_18_e_$u$190)})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$Left.$tag)?((function(_18_e_$u$191){
return (function(){
var $pm = _18_e_$u$191;return ($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_18_ann_$u$192,_18_p_$u$193,_18_e_$u$194){
return (($gt$gt$eq(local$instance$Monad$0))(_18_go_$u$183(_18_e_$u$194)))(function(_18_e_$u$195){
return _18_up_$u$181((($$compiler$ast_jg$$Lam(_18_ann_$u$192))(_18_p_$u$193))(_18_e_$u$195))})})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$App.$tag)?((function(_18_ann_$u$196,_18_f_$u$197,_18_x_$u$198){
return (($gt$gt$eq(local$instance$Monad$0))(_18_go_$u$183(_18_f_$u$197)))(function(_18_f_$u$199){
return (($gt$gt$eq(local$instance$Monad$0))(_18_go_$u$183(_18_x_$u$198)))(function(_18_x_$u$200){
return _18_up_$u$181((($$compiler$ast_jg$$App(_18_ann_$u$196))(_18_f_$u$199))(_18_x_$u$200))})})})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_18_ann_$u$201,_18_e_$u$202,_18_ps_$u$203){
return (($gt$gt$eq(local$instance$Monad$0))(_18_go_$u$183(_18_e_$u$202)))(function(_18_e_$u$204){
return (($gt$gt$eq(local$instance$Monad$0))(_18_gos_$u$184(_18_ps_$u$203)))(function(_18_ps_$u$205){
return _18_up_$u$181((($$compiler$ast_jg$$Case(_18_ann_$u$201))(_18_e_$u$204))(_18_ps_$u$205))})})})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_18_ann_$u$206,_18_bs_$u$207,_18_e_$u$208){
return (($gt$gt$eq(local$instance$Monad$0))(_18_gos_$u$184(_18_bs_$u$207)))(function(_18_bs_$u$209){
return (($gt$gt$eq(local$instance$Monad$0))(_18_go_$u$183(_18_e_$u$208)))(function(_18_e_$u$210){
return _18_up_$u$181((($$compiler$ast_jg$$Let(_18_ann_$u$206))(_18_bs_$u$209))(_18_e_$u$210))})})})($pm.$0,$pm.$1,$pm.$2)):((function(_18___$u$211){
return _18_up_$u$181(_18_e_$u$191)})($pm)))))})()})($pm.$0)):(error("pattern match fail")))})()})})()}}}};
var $$compiler$ast_jg$$breakableDownM = function(local$instance$Monad$0){
return function(_18_f_$u$217){
return (($$compiler$ast_jg$$breakableDownAndUpM(local$instance$Monad$0))(_18_f_$u$217))(ret(local$instance$Monad$0))}};
var $$compiler$ast_jg$$downAndUpM = function(local$instance$Monad$0){
return function(_18_down_$u$212){
return function(_18_up_$u$213){
return (($$compiler$ast_jg$$breakableDownAndUpM(local$instance$Monad$0))(function(_18_e_$u$214){
return (($gt$gt$eq(local$instance$Monad$0))(_18_down_$u$212(_18_e_$u$214)))(function(_18_e_$u$215){
return (ret(local$instance$Monad$0))($$compiler$prelude_jg$$Left(_18_e_$u$215))})}))(_18_up_$u$213)}}};
var $$compiler$ast_jg$$breakableDownAndUp = function(_18_down_$u$130){
return function(_18_up_$u$131){
return function(_18_a_$u$132){
return function(_18_e_$u$133){
return (function(){
var _18_go_$u$134 = ($$compiler$ast_jg$$breakableDownAndUp(_18_down_$u$130))(_18_up_$u$131);var _18_gos_$u$135 = function(_18_a_$u$136){
return (foldl(function(_18_ar_$u$137){
return function(_18_p_$u$138){
return (function(){
var $pm = (_18_go_$u$134($$compiler$prelude_jg$$fst(_18_ar_$u$137)))($$compiler$prelude_jg$$snd(_18_p_$u$138));return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_18_a2_$u$139,_18_e_$u$140){
return ($$compiler$prelude_jg$$Pair(_18_a2_$u$139))((push(($$compiler$prelude_jg$$Pair($$compiler$prelude_jg$$fst(_18_p_$u$138)))(_18_e_$u$140)))($$compiler$prelude_jg$$snd(_18_ar_$u$137)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(($$compiler$prelude_jg$$Pair(_18_a_$u$136))(emptyArray))};return (function(){
var $pm = (_18_down_$u$130(_18_a_$u$132))(_18_e_$u$133);return ($pm.$tag==$$compiler$prelude_jg$$Right.$tag)?((function(_18_ae_$u$141){
return _18_ae_$u$141})($pm.$0)):((($pm.$tag==$$compiler$prelude_jg$$Left.$tag)&&($pm.$0.$tag==$$compiler$prelude_jg$$Pair.$tag))?((function(_18_a2_$u$142,_18_e2_$u$143){
return (function(){
var _18_ae_$u$144 = (function(){
var $pm = _18_e2_$u$143;return ($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_18_ann_$u$145,_18_p_$u$146,_18_e_$u$147){
return (function(){
var $pm = (_18_go_$u$134(_18_a2_$u$142))(_18_e_$u$147);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_18_a_$u$148,_18_e_$u$149){
return ($$compiler$prelude_jg$$Pair(_18_a_$u$148))((($$compiler$ast_jg$$Lam(_18_ann_$u$145))(_18_p_$u$146))(_18_e_$u$149))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$App.$tag)?((function(_18_ann_$u$150,_18_f_$u$151,_18_x_$u$152){
return (function(){
var $pm = (_18_go_$u$134(_18_a2_$u$142))(_18_f_$u$151);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_18_a_$u$153,_18_f_$u$154){
return (function(){
var $pm = (_18_go_$u$134(_18_a_$u$153))(_18_x_$u$152);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_18_a_$u$155,_18_x_$u$156){
return ($$compiler$prelude_jg$$Pair(_18_a_$u$155))((($$compiler$ast_jg$$App(_18_ann_$u$150))(_18_f_$u$154))(_18_x_$u$156))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_18_ann_$u$157,_18_e_$u$158,_18_ps_$u$159){
return (function(){
var $pm = (_18_go_$u$134(_18_a2_$u$142))(_18_e_$u$158);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_18_a_$u$160,_18_e_$u$161){
return (function(){
var $pm = (_18_gos_$u$135(_18_a_$u$160))(_18_ps_$u$159);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_18_a_$u$162,_18_ps_$u$163){
return ($$compiler$prelude_jg$$Pair(_18_a_$u$162))((($$compiler$ast_jg$$Case(_18_ann_$u$157))(_18_e_$u$161))(_18_ps_$u$163))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_18_ann_$u$164,_18_bs_$u$165,_18_e_$u$166){
return (function(){
var $pm = (_18_gos_$u$135(_18_a2_$u$142))(_18_bs_$u$165);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_18_a_$u$167,_18_bs_$u$168){
return (function(){
var $pm = (_18_go_$u$134(_18_a_$u$167))(_18_e_$u$166);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_18_a_$u$169,_18_e_$u$170){
return ($$compiler$prelude_jg$$Pair(_18_a_$u$169))((($$compiler$ast_jg$$Let(_18_ann_$u$164))(_18_bs_$u$168))(_18_e_$u$170))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):((function(_18___$u$171){
return ($$compiler$prelude_jg$$Pair(_18_a2_$u$142))(_18_e2_$u$143)})($pm)))))})();return (function(){
var $pm = _18_ae_$u$144;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_18_a_$u$172,_18_e_$u$173){
return (_18_up_$u$131(_18_a_$u$172))(_18_e_$u$173)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()})($pm.$0.$0,$pm.$0.$1)):(error("pattern match fail")))})()})()}}}};
var $$compiler$ast_jg$$breakableDown = function(_18_f_$u$179){
return ($$compiler$ast_jg$$breakableDownAndUp(_18_f_$u$179))($$compiler$prelude_jg$$Pair)};
var $$compiler$ast_jg$$downAndUp = function(_18_down_$u$174){
return function(_18_up_$u$175){
return ($$compiler$ast_jg$$breakableDownAndUp(function(_18_a_$u$176){
return function(_18_e_$u$177){
return $$compiler$prelude_jg$$Left((_18_down_$u$174(_18_a_$u$176))(_18_e_$u$177))}}))(_18_up_$u$175)}};
var $$compiler$ast_jg$$down = function(_18_f_$u$178){
return ($$compiler$ast_jg$$downAndUp(_18_f_$u$178))($$compiler$prelude_jg$$Pair)};
var $$compiler$ast_jg$$up = $$compiler$ast_jg$$downAndUp($$compiler$prelude_jg$$Pair);
var $$compiler$ast_jg$$getAnn = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_18_name_$u$0){
return function(_18_ann_$u$1){
return ((($$compiler$prelude_jg$$lookup(local$instance$Hashable$1))(local$instance$Eq$0))(_18_name_$u$0))(_18_ann_$u$1)}}}};
var $$compiler$ast_jg$$getAnnType = function(_18_ann_$u$5){
return (function(){
var $pm = ((($$compiler$ast_jg$$getAnn($instance$Hashable$13))($instance$Eq$1))("type"))(_18_ann_$u$5);return (($pm.$tag==$$compiler$prelude_jg$$Just.$tag)&&($pm.$0.$tag==$$compiler$ast_jg$$AnnType.$tag))?((function(_18_t_$u$6){
return _18_t_$u$6})($pm.$0.$0)):(($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return $$compiler$ast_jg$$TUnknown})()):(error("pattern match fail")))})()};
var $$compiler$ast_jg$$annOf = function(_18_e_$u$94){
return (function(){
var $pm = _18_e_$u$94;return ($pm.$tag==$$compiler$ast_jg$$Var.$tag)?((function(_18_ann_$u$95,_18_v_$u$96){
return _18_ann_$u$95})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$Const.$tag)?((function(_18_ann_$u$97,_18_c_$u$98){
return _18_ann_$u$97})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$App.$tag)?((function(_18_ann_$u$99,_18_f_$u$100,_18_a_$u$101){
return _18_ann_$u$99})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_18_ann_$u$102,_18_p_$u$103,_18_b_$u$104){
return _18_ann_$u$102})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_18_ann_$u$105,_18_e_$u$106,_18_ps_$u$107){
return _18_ann_$u$105})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_18_ann_$u$108,_18_ds_$u$109,_18_e_$u$110){
return _18_ann_$u$108})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))))})()};
var $$compiler$ast_jg$$getType = function(_18_e_$u$129){
return ($$compiler$prelude_jg$$$($$compiler$ast_jg$$getAnnType))($$compiler$ast_jg$$annOf(_18_e_$u$129))};
var $$compiler$ast_jg$$withAnn = function(_18_ann_$u$111){
return function(_18_e_$u$112){
return (function(){
var $pm = _18_e_$u$112;return ($pm.$tag==$$compiler$ast_jg$$Var.$tag)?((function(_18___$u$113,_18_v_$u$114){
return ($$compiler$ast_jg$$Var(_18_ann_$u$111))(_18_v_$u$114)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$Const.$tag)?((function(_18___$u$115,_18_c_$u$116){
return ($$compiler$ast_jg$$Const(_18_ann_$u$111))(_18_c_$u$116)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$App.$tag)?((function(_18___$u$117,_18_f_$u$118,_18_a_$u$119){
return (($$compiler$ast_jg$$App(_18_ann_$u$111))(_18_f_$u$118))(_18_a_$u$119)})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_18___$u$120,_18_p_$u$121,_18_b_$u$122){
return (($$compiler$ast_jg$$Lam(_18_ann_$u$111))(_18_p_$u$121))(_18_b_$u$122)})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_18___$u$123,_18_e_$u$124,_18_ps_$u$125){
return (($$compiler$ast_jg$$Case(_18_ann_$u$111))(_18_e_$u$124))(_18_ps_$u$125)})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_18___$u$126,_18_ds_$u$127,_18_e_$u$128){
return (($$compiler$ast_jg$$Let(_18_ann_$u$111))(_18_ds_$u$127))(_18_e_$u$128)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))))})()}};
var $$compiler$ast_jg$$setAnn = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_18_name_$u$2){
return function(_18_val_$u$3){
return function(_18_ann_$u$4){
return (((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_18_name_$u$2))(_18_val_$u$3))(_18_ann_$u$4)}}}}};
var $$compiler$ast_jg$$setAnnType = function(_18_t_$u$7){
return function(_18_ann_$u$8){
return (((($$compiler$ast_jg$$setAnn($instance$Hashable$13))($instance$Eq$1))("type"))($$compiler$ast_jg$$AnnType(_18_t_$u$7)))(_18_ann_$u$8)}};
var $$compiler$ast_jg$$setType = function(_18_t_$u$76){
return function(_18_e_$u$77){
return (function(){
var $pm = _18_e_$u$77;return ($pm.$tag==$$compiler$ast_jg$$Var.$tag)?((function(_18_ann_$u$78,_18_v_$u$79){
return ($$compiler$ast_jg$$Var(($$compiler$ast_jg$$setAnnType(_18_t_$u$76))(_18_ann_$u$78)))(_18_v_$u$79)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$Const.$tag)?((function(_18_ann_$u$80,_18_c_$u$81){
return ($$compiler$ast_jg$$Const(($$compiler$ast_jg$$setAnnType(_18_t_$u$76))(_18_ann_$u$80)))(_18_c_$u$81)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$App.$tag)?((function(_18_ann_$u$82,_18_f_$u$83,_18_a_$u$84){
return (($$compiler$ast_jg$$App(($$compiler$ast_jg$$setAnnType(_18_t_$u$76))(_18_ann_$u$82)))(_18_f_$u$83))(_18_a_$u$84)})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_18_ann_$u$85,_18_p_$u$86,_18_b_$u$87){
return (($$compiler$ast_jg$$Lam(($$compiler$ast_jg$$setAnnType(_18_t_$u$76))(_18_ann_$u$85)))(_18_p_$u$86))(_18_b_$u$87)})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_18_ann_$u$88,_18_e_$u$89,_18_ps_$u$90){
return (($$compiler$ast_jg$$Case(($$compiler$ast_jg$$setAnnType(_18_t_$u$76))(_18_ann_$u$88)))(_18_e_$u$89))(_18_ps_$u$90)})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_18_ann_$u$91,_18_ds_$u$92,_18_e_$u$93){
return (($$compiler$ast_jg$$Let(($$compiler$ast_jg$$setAnnType(_18_t_$u$76))(_18_ann_$u$91)))(_18_ds_$u$92))(_18_e_$u$93)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))))})()}};
var $$compiler$ast_jg$$dataConName = function(_18_dc_$u$59){
return (function(){
var $pm = _18_dc_$u$59;return ($pm.$tag==$$compiler$ast_jg$$DataCon.$tag)?((function(_18___$u$60,_18_n_$u$61,_18_ts_$u$62){
return _18_n_$u$61})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var $$compiler$ast_jg$$dataConNames = function(_18_d_$u$63){
return (function(){
var $pm = _18_d_$u$63;return ($pm.$tag==$$compiler$ast_jg$$Data.$tag)?((function(_18___$u$64,_18_n_$u$65,_18_ps_$u$66,_18_cs_$u$67){
return (map($$compiler$ast_jg$$dataConName))(_18_cs_$u$67)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var $$compiler$ast_jg$$getExports = function(_18_m_$u$68){
return (function(){
var $pm = _18_m_$u$68;return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_18___$u$69,_18___$u$70,_18_is_$u$71,_18_ds_$u$72,_18___$u$73,_18___$u$74,_18_vs_$u$75){
return (concat(($$compiler$prelude_jg$$concatMap($$compiler$ast_jg$$dataConNames))(_18_ds_$u$72)))((map($$compiler$prelude_jg$$fst))(_18_vs_$u$75))})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})()};
var $$compiler$ast_jg$$equivBound = function(_18_a_$u$18){
return function(_18_b_$u$19){
return (function(){
var $pm = _18_a_$u$18;return ($pm.$tag==$$compiler$ast_jg$$TCBound.$tag)?((function(_18___$u$20,_18_n_$u$21,_18_t_$u$22){
return (function(){
var $pm = _18_b_$u$19;return ($pm.$tag==$$compiler$ast_jg$$TCBound.$tag)?((function(_18___$u$23,_18_n2_$u$24,_18_t2_$u$25){
return ($and((($eq$eq($instance$Eq$1))(_18_n_$u$21))(_18_n2_$u$24)))(($$compiler$ast_jg$$equivType(_18_t_$u$22))(_18_t2_$u$25))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var $$compiler$ast_jg$$equivType = function(_18_a_$u$26){
return function(_18_b_$u$27){
return (function(){
var $pm = _18_a_$u$26;return ($pm.$tag==$$compiler$ast_jg$$TConst.$tag)?((function(_18___$u$28,_18_n_$u$29){
return (function(){
var $pm = _18_b_$u$27;return ($pm.$tag==$$compiler$ast_jg$$TConst.$tag)?((function(_18___$u$30,_18_n2_$u$31){
return (($eq$eq($instance$Eq$1))(_18_n_$u$29))(_18_n2_$u$31)})($pm.$0,$pm.$1)):((function(_18___$u$32){
return false})($pm))})()})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TVar.$tag)?((function(_18___$u$33,_18_v_$u$34){
return (function(){
var $pm = _18_b_$u$27;return ($pm.$tag==$$compiler$ast_jg$$TVar.$tag)?((function(_18___$u$35,_18_v2_$u$36){
return (($eq$eq($instance$Eq$1))(_18_v_$u$34))(_18_v2_$u$36)})($pm.$0,$pm.$1)):((function(_18___$u$37){
return false})($pm))})()})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TApp.$tag)?((function(_18___$u$38,_18_f_$u$39,_18_a_$u$40){
return (function(){
var $pm = _18_b_$u$27;return ($pm.$tag==$$compiler$ast_jg$$TApp.$tag)?((function(_18___$u$41,_18_f2_$u$42,_18_a2_$u$43){
return ($and(($$compiler$ast_jg$$equivType(_18_f_$u$39))(_18_f2_$u$42)))(($$compiler$ast_jg$$equivType(_18_a_$u$40))(_18_a2_$u$43))})($pm.$0,$pm.$1,$pm.$2)):((function(_18___$u$44){
return false})($pm))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$TBot.$tag)?((function(){
return (function(){
var $pm = _18_b_$u$27;return ($pm.$tag==$$compiler$ast_jg$$TBot.$tag)?((function(){
return true})()):((function(_18___$u$45){
return false})($pm))})()})()):(($pm.$tag==$$compiler$ast_jg$$TUnknown.$tag)?((function(){
return (function(){
var $pm = _18_b_$u$27;return ($pm.$tag==$$compiler$ast_jg$$TUnknown.$tag)?((function(){
return true})()):((function(_18___$u$46){
return false})($pm))})()})()):(($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_18___$u$47,_18_vs_$u$48,_18_bs_$u$49,_18_t_$u$50){
return (function(){
var $pm = _18_b_$u$27;return ($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_18___$u$51,_18_vs2_$u$52,_18_bs2_$u$53,_18_t2_$u$54){
return (function(){
var _18_rbs_$u$56 = ($$compiler$prelude_jg$$all(function(_18_p_$u$58){
return ($$compiler$ast_jg$$equivBound($$compiler$prelude_jg$$fst(_18_p_$u$58)))($$compiler$prelude_jg$$snd(_18_p_$u$58))}))(($$compiler$prelude_jg$$zip(_18_bs_$u$49))(_18_bs2_$u$53));var _18_rvs_$u$55 = ($$compiler$prelude_jg$$all(function(_18_p_$u$57){
return (($eq$eq($instance$Eq$1))($$compiler$prelude_jg$$fst(_18_p_$u$57)))($$compiler$prelude_jg$$snd(_18_p_$u$57))}))(($$compiler$prelude_jg$$zip(_18_vs_$u$48))(_18_vs2_$u$52));return ($and(($and(_18_rvs_$u$55))(_18_rbs_$u$56)))(($$compiler$ast_jg$$equivType(_18_t_$u$50))(_18_t2_$u$54))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail")))))))})()}};
var $$compiler$ast_jg$$printCodeLoc = function(_18_l_$u$14){
return (function(){
var $pm = _18_l_$u$14;return ($pm.$tag==$$compiler$ast_jg$$AnnCodeLoc.$tag)?((function(_18_file_$u$15,_18_line_$u$16,_18_col_$u$17){
return ($concat(($concat(($concat(($concat(($concat("in "))(_18_file_$u$15)))(" at line ")))(intToString(_18_line_$u$16+1))))(", column ")))(intToString(_18_col_$u$17+1))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var $$compiler$ast_jg$$getAnnCodeLoc = function(_18_ann_$u$9){
return ((($$compiler$ast_jg$$getAnn($instance$Hashable$13))($instance$Eq$1))("codeLoc"))(_18_ann_$u$9)};
var $$compiler$ast_jg$$emptyAnn = $$compiler$prelude_jg$$Empty;
var $$compiler$inliner_jg$$mergeCount = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_17_a_$u$2){
return function(_17_b_$u$3){
return (($$compiler$prelude_jg$$foldTrie(function(_17_a_$u$4){
return function(_17_k_$u$5){
return function(_17_v_$u$6){
return (((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_17_k_$u$5))(_17_v_$u$6+(($$compiler$prelude_jg$$justOr(0))(((($$compiler$prelude_jg$$lookup(local$instance$Hashable$1))(local$instance$Eq$0))(_17_k_$u$5))(_17_a_$u$4)))))(_17_a_$u$4)}}}))(_17_a_$u$2))(_17_b_$u$3)}}}};
var $$compiler$inliner_jg$$processImports = function(_17_useCount_$u$79){
return function(_17_is_$u$80){
return _17_is_$u$80}};
var $$compiler$inliner_jg$$processData = function(_17_usecount_$u$81){
return function(_17_ds_$u$82){
return _17_ds_$u$82}};
var $$compiler$inliner_jg$$getCount = function(_17_e_$u$0){
return (function(){
var $pm = ((($$compiler$ast_jg$$getAnn($instance$Hashable$13))($instance$Eq$1))("useCount"))($$compiler$ast_jg$$annOf(_17_e_$u$0));return (($pm.$tag==$$compiler$prelude_jg$$Just.$tag)&&($pm.$0.$tag==$$compiler$ast_jg$$AnnUseCount.$tag))?((function(_17_c_$u$1){
return _17_c_$u$1})($pm.$0.$0)):(error("pattern match fail"))})()};
var $$compiler$inliner_jg$$annWithUseCount = function(_17_e_$u$7){
return (function(){
var _17_dropCount_$u$8 = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_17_n_$u$12){
return function(_17_c_$u$13){
return ((($$compiler$prelude_jg$$remove(local$instance$Hashable$1))(local$instance$Eq$0))(_17_n_$u$12))(_17_c_$u$13)}}}};var _17_countPat_$u$10 = function(_17_c_$u$17){
return function(_17_p_$u$18){
return (function(){
var $pm = _17_p_$u$18;return ($pm.$tag==$$compiler$ast_jg$$PVar.$tag)?((function(_17___$u$19,_17_n_$u$20){
return (((_17_dropCount_$u$8($instance$Hashable$13))($instance$Eq$1))(_17_n_$u$20))(_17_c_$u$17)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$PData.$tag)?((function(_17___$u$21,_17_n_$u$22,_17_ps_$u$23){
return ((foldl(_17_countPat_$u$10))((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))(_17_n_$u$22))(1+(($$compiler$prelude_jg$$justOr(0))(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))(_17_n_$u$22))(_17_c_$u$17)))))(_17_c_$u$17)))(_17_ps_$u$23)})($pm.$0,$pm.$1,$pm.$2)):((function(_17___$u$24){
return _17_c_$u$17})($pm)))})()}};var _17_countCase_$u$9 = function(_17_pe_$u$14){
return (function(){
var $pm = _17_pe_$u$14;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_17_p_$u$15,_17_e_$u$16){
return (_17_countPat_$u$10($$compiler$inliner_jg$$getCount(_17_e_$u$16)))(_17_p_$u$15)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};var _17_countExpr_$u$11 = function(_17_e_$u$25){
return (function(){
var $pm = _17_e_$u$25;return ($pm.$tag==$$compiler$ast_jg$$Var.$tag)?((function(_17___$u$26,_17_n_$u$27){
return (((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))(_17_n_$u$27))(1))($$compiler$prelude_jg$$Empty)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$App.$tag)?((function(_17___$u$28,_17_f_$u$29,_17_e_$u$30){
return ((($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1))($$compiler$inliner_jg$$getCount(_17_f_$u$29)))($$compiler$inliner_jg$$getCount(_17_e_$u$30))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_17___$u$31,_17_p_$u$32,_17_e_$u$33){
return (((_17_dropCount_$u$8($instance$Hashable$13))($instance$Eq$1))(_17_p_$u$32))($$compiler$inliner_jg$$getCount(_17_e_$u$33))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_17___$u$34,_17_bs_$u$35,_17_e_$u$36){
return ((foldl(function(_17_c_$u$37){
return function(_17_n_$u$38){
return (((_17_dropCount_$u$8($instance$Hashable$13))($instance$Eq$1))(_17_n_$u$38))(_17_c_$u$37)}}))(((foldl(function(_17_c_$u$39){
return function(_17_e_$u$40){
return ((($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1))(_17_c_$u$39))($$compiler$inliner_jg$$getCount(_17_e_$u$40))}}))($$compiler$inliner_jg$$getCount(_17_e_$u$36)))((map($$compiler$prelude_jg$$snd))(_17_bs_$u$35))))((map($$compiler$prelude_jg$$fst))(_17_bs_$u$35))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_17___$u$41,_17_e_$u$42,_17_ps_$u$43){
return ((foldl(($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1)))($$compiler$inliner_jg$$getCount(_17_e_$u$42)))((map(_17_countCase_$u$9))(_17_ps_$u$43))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Const.$tag)?((function(_17___$u$44,_17___$u$45){
return $$compiler$prelude_jg$$Empty})($pm.$0,$pm.$1)):(error("pattern match fail")))))))})()};return (($$compiler$ast_jg$$up(function(_17_a_$u$46){
return function(_17_e_$u$47){
return ($$compiler$prelude_jg$$$($$compiler$prelude_jg$$Pair(_17_a_$u$46)))(($$compiler$ast_jg$$withAnn((((($$compiler$ast_jg$$setAnn($instance$Hashable$13))($instance$Eq$1))("useCount"))(($$compiler$prelude_jg$$$($$compiler$ast_jg$$AnnUseCount))(_17_countExpr_$u$11(_17_e_$u$47))))($$compiler$ast_jg$$annOf(_17_e_$u$47))))(_17_e_$u$47))}}))($$compiler$prelude_jg$$Unit))(_17_e_$u$7)})()};
var $$compiler$inliner_jg$$chooseForInlining = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_17_baseCount_$u$95){
return function(_17_bs_$u$96){
return (function(){
var _17_f_$u$98 = function(local$instance$Hashable$3){
return function(local$instance$Eq$2){
return function(_17_r_$u$100){
return function(_17_b_$u$101){
return (function(){
var $pm = _17_b_$u$101;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_17_n_$u$102,_17_e_$u$103){
return (function(){
var $pm = _17_e_$u$103;return ($pm.$tag==$$compiler$ast_jg$$Var.$tag)?((function(_17___$u$104,_17___$u$105){
return (((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_17_n_$u$102))(_17_e_$u$103))(_17_r_$u$100)})($pm.$0,$pm.$1)):((function(_17___$u$106){
return _17_r_$u$100})($pm))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}}};return ((foldl((_17_f_$u$98(local$instance$Hashable$1))(local$instance$Eq$0)))($$compiler$prelude_jg$$Empty))(_17_bs_$u$96)})()}}}};
var $$compiler$inliner_jg$$inlineCode = function(_17_always_$u$107){
return function(_17_e_$u$108){
return (function(){
var _17_inlinePat_$u$110 = function(_17_p_$u$132){
return (function(){
var $pm = _17_p_$u$132;return ($pm.$tag==$$compiler$ast_jg$$PData.$tag)?((function(_17_ann_$u$133,_17_n_$u$134,_17_ps_$u$135){
return (function(){
var $pm = ((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))(_17_n_$u$134))(_17_always_$u$107);return (($pm.$tag==$$compiler$prelude_jg$$Just.$tag)&&($pm.$0.$tag==$$compiler$ast_jg$$Var.$tag))?((function(_17___$u$136,_17_v_$u$137){
return (($$compiler$ast_jg$$PData(_17_ann_$u$133))(_17_v_$u$137))((map(_17_inlinePat_$u$110))(_17_ps_$u$135))})($pm.$0.$0,$pm.$0.$1)):((function(_17___$u$138){
return (($$compiler$ast_jg$$PData(_17_ann_$u$133))(_17_n_$u$134))((map(_17_inlinePat_$u$110))(_17_ps_$u$135))})($pm))})()})($pm.$0,$pm.$1,$pm.$2)):((function(_17___$u$139){
return _17_p_$u$132})($pm))})()};var _17_inlineExpr_$u$109 = function(_17_unused_$u$111){
return function(_17_e_$u$112){
return (function(){
var $pm = _17_e_$u$112;return ($pm.$tag==$$compiler$ast_jg$$Var.$tag)?((function(_17___$u$113,_17_v_$u$114){
return (function(){
var $pm = ((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))(_17_v_$u$114))(_17_always_$u$107);return ($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return $$compiler$prelude_jg$$Left(($$compiler$prelude_jg$$Pair(_17_unused_$u$111))(_17_e_$u$112))})()):(($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_17_e_$u$115){
return $$compiler$prelude_jg$$Left(($$compiler$prelude_jg$$Pair(_17_unused_$u$111))(_17_e_$u$115))})($pm.$0)):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_17_ann_$u$116,_17_bs_$u$117,_17_e_$u$118){
return (function(){
var _17_always2_$u$119 = ((($$compiler$prelude_jg$$mergeTrie($instance$Hashable$13))($instance$Eq$1))(_17_always_$u$107))(((($$compiler$inliner_jg$$chooseForInlining($instance$Hashable$13))($instance$Eq$1))($$compiler$inliner_jg$$getCount(_17_e_$u$118)))(_17_bs_$u$117));var _17_e2_$u$121 = ($$compiler$inliner_jg$$inlineCode(_17_always2_$u$119))(_17_e_$u$118);var _17_bs2_$u$120 = (map(function(_17_b_$u$122){
return (function(){
var $pm = _17_b_$u$122;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_17_n_$u$123,_17_e_$u$124){
return ($$compiler$prelude_jg$$Pair(_17_n_$u$123))(($$compiler$inliner_jg$$inlineCode(((($$compiler$prelude_jg$$remove($instance$Hashable$13))($instance$Eq$1))(_17_n_$u$123))(_17_always2_$u$119)))(_17_e_$u$124))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(_17_bs_$u$117);return $$compiler$prelude_jg$$Right(($$compiler$prelude_jg$$Pair(_17_unused_$u$111))((($$compiler$ast_jg$$Let(_17_ann_$u$116))(_17_bs2_$u$120))(_17_e2_$u$121)))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_17_ann_$u$125,_17_e_$u$126,_17_ps_$u$127){
return $$compiler$prelude_jg$$Left(($$compiler$prelude_jg$$Pair(_17_unused_$u$111))((($$compiler$ast_jg$$Case(_17_ann_$u$125))(_17_e_$u$126))((map(function(_17_p_$u$128){
return (function(){
var $pm = _17_p_$u$128;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_17_pat_$u$129,_17_e_$u$130){
return ($$compiler$prelude_jg$$Pair(_17_inlinePat_$u$110(_17_pat_$u$129)))(_17_e_$u$130)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(_17_ps_$u$127))))})($pm.$0,$pm.$1,$pm.$2)):((function(_17___$u$131){
return $$compiler$prelude_jg$$Left(($$compiler$prelude_jg$$Pair(_17_unused_$u$111))(_17_e_$u$112))})($pm))))})()}};return $$compiler$prelude_jg$$snd((($$compiler$ast_jg$$breakableDown(_17_inlineExpr_$u$109))($$compiler$prelude_jg$$Unit))(_17_e_$u$108))})()}};
var $$compiler$inliner_jg$$dropDeadBindings = function(_17_preserve_$u$140){
return function(_17_useCount_$u$141){
return function(_17_bs_$u$142){
return (function(){
var _17_f_$u$143 = function(_17_b_$u$144){
return (function(){
var $pm = _17_b_$u$144;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_17_n_$u$145,_17_e_$u$146){
return (function(){
var _17_totalCount_$u$147 = ($$compiler$prelude_jg$$justOr(0))(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))(_17_n_$u$145))(_17_useCount_$u$141));var _17_recursiveCount_$u$148 = ($$compiler$prelude_jg$$justOr(0))(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))(_17_n_$u$145))($$compiler$inliner_jg$$getCount(_17_e_$u$146)));var _17_keep_$u$149 = ($or((($$compiler$prelude_jg$$contains($instance$Eq$1))(_17_n_$u$145))(_17_preserve_$u$140)))((($$compiler$prelude_jg$$$gt($instance$Ord$2))(_17_totalCount_$u$147-_17_recursiveCount_$u$148))(0));return _17_keep_$u$149})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return (filter(_17_f_$u$143))(_17_bs_$u$142)})()}}};
var $$compiler$inliner_jg$$deadCode = function(_17_e_$u$83){
return (function(){
var _17_f_$u$84 = function(_17_e_$u$85){
return (function(){
var $pm = _17_e_$u$85;return ($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_17_ann_$u$86,_17_bs_$u$87,_17_e_$u$88){
return (function(){
var _17_useCount_$u$89 = ((foldl(($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1)))($$compiler$inliner_jg$$getCount(_17_e_$u$88)))((map(function(_17_b_$u$91){
return $$compiler$inliner_jg$$getCount($$compiler$prelude_jg$$snd(_17_b_$u$91))}))(_17_bs_$u$87));var _17_bs2_$u$90 = (($$compiler$inliner_jg$$dropDeadBindings(emptyArray))(_17_useCount_$u$89))(_17_bs_$u$87);return (($$compiler$ast_jg$$Let(_17_ann_$u$86))(_17_bs2_$u$90))(_17_e_$u$88)})()})($pm.$0,$pm.$1,$pm.$2)):((function(_17___$u$92){
return _17_e_$u$85})($pm))})()};return $$compiler$prelude_jg$$snd((($$compiler$ast_jg$$down(function(_17_a_$u$93){
return function(_17_e_$u$94){
return ($$compiler$prelude_jg$$Pair(_17_a_$u$93))(_17_f_$u$84(_17_e_$u$94))}}))($$compiler$prelude_jg$$Unit))(_17_e_$u$83))})()};
var $$compiler$inliner_jg$$pass = function(_17_preserve_$u$62){
return function(_17_bs_$u$63){
return (function(){
var _17_bs2_$u$64 = (map(function(_17_b_$u$68){
return (function(){
var $pm = _17_b_$u$68;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_17_n_$u$69,_17_e_$u$70){
return ($$compiler$prelude_jg$$Pair(_17_n_$u$69))(($$compiler$prelude_jg$$$($$compiler$prelude_jg$$snd))($$compiler$inliner_jg$$annWithUseCount(_17_e_$u$70)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(_17_bs_$u$63);var _17_useCount_$u$65 = ((foldl(($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1)))($$compiler$prelude_jg$$Empty))((map(function(_17_b_$u$71){
return $$compiler$inliner_jg$$getCount($$compiler$prelude_jg$$snd(_17_b_$u$71))}))(_17_bs2_$u$64));var _17_bs3_$u$66 = (map(function(_17_b_$u$72){
return (function(){
var $pm = _17_b_$u$72;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_17_n_$u$73,_17_e_$u$74){
return ($$compiler$prelude_jg$$Pair(_17_n_$u$73))($$compiler$inliner_jg$$deadCode(_17_e_$u$74))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((($$compiler$inliner_jg$$dropDeadBindings(_17_preserve_$u$62))(_17_useCount_$u$65))(_17_bs2_$u$64));var _17_bs4_$u$67 = (function(){
var _17_always_$u$75 = ((($$compiler$inliner_jg$$chooseForInlining($instance$Hashable$13))($instance$Eq$1))($$compiler$prelude_jg$$Empty))(_17_bs3_$u$66);return (map(function(_17_b_$u$76){
return (function(){
var $pm = _17_b_$u$76;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_17_n_$u$77,_17_e_$u$78){
return ($$compiler$prelude_jg$$Pair(_17_n_$u$77))(($$compiler$inliner_jg$$inlineCode(((($$compiler$prelude_jg$$remove($instance$Hashable$13))($instance$Eq$1))(_17_n_$u$77))(_17_always_$u$75)))(_17_e_$u$78))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(_17_bs3_$u$66)})();return _17_bs4_$u$67})()}};
var $$compiler$inliner_jg$$inline = function(_17_preserve_$u$48){
return function(_17_m_$u$49){
return (function(){
var $pm = _17_m_$u$49;return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_17_ann_$u$50,_17_fn_$u$51,_17_is_$u$52,_17_ds_$u$53,_17_cs_$u$54,_17_ins_$u$55,_17_bs_$u$56){
return (function(){
var _17_bs2_$u$57 = ($$compiler$inliner_jg$$pass(_17_preserve_$u$48))(($$compiler$inliner_jg$$pass(_17_preserve_$u$48))(_17_bs_$u$56));var _17_useCount_$u$58 = ((foldl(($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1)))($$compiler$prelude_jg$$Empty))((map(function(_17_b_$u$61){
return $$compiler$inliner_jg$$getCount($$compiler$prelude_jg$$snd(_17_b_$u$61))}))(_17_bs2_$u$57));var _17_is2_$u$60 = ($$compiler$inliner_jg$$processImports(_17_useCount_$u$58))(_17_is_$u$52);var _17_ds2_$u$59 = ($$compiler$inliner_jg$$processData(_17_useCount_$u$58))(_17_ds_$u$53);return (((((($$compiler$ast_jg$$Module(_17_ann_$u$50))(_17_fn_$u$51))(_17_is2_$u$60))(_17_ds2_$u$59))(_17_cs_$u$54))(_17_ins_$u$55))(_17_bs2_$u$57)})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})()}};
var $$compiler$uniquifier_jg$$newIdent = function(_16_n_$u$0){
return (($gt$gt$eq($instance$Monad$11))($$compiler$prelude_jg$$gets))(function(_16_i_$u$1){
return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$sets(_16_i_$u$1+1)))((ret($instance$Monad$11))(($concat(($concat(_16_n_$u$0))("_$u$")))(intToString(_16_i_$u$1))))})};
var $$compiler$uniquifier_jg$$rewriteExpr = function(_16_pre_$u$2){
return function(_16_env_$u$3){
return function(_16_e_$u$4){
return (function(){
var _16_rename_$u$5 = function(_16_n_$u$9){
return ((fmap($instance$Functor$9))($concat(_16_pre_$u$2)))($$compiler$uniquifier_jg$$newIdent(_16_n_$u$9))};var _16_renamePat_$u$6 = function(_16_p_$u$10){
return (function(){
var $pm = _16_p_$u$10;return ($pm.$tag==$$compiler$ast_jg$$PConst.$tag)?((function(_16___$u$11,_16___$u$12){
return (ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair(_16_p_$u$10))(empty))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$PVar.$tag)?((function(_16_ann_$u$13,_16_v_$u$14){
return (($gt$gt$eq($instance$Monad$11))(_16_rename_$u$5(_16_v_$u$14)))(function(_16_n_$u$15){
return (ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair(($$compiler$ast_jg$$PVar(_16_ann_$u$13))(_16_n_$u$15)))(((set(_16_v_$u$14))(_16_n_$u$15))(empty)))})})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$PData.$tag)?((function(_16_ann_$u$16,_16_n_$u$17,_16_ps_$u$18){
return (($gt$gt$eq($instance$Monad$11))((($$compiler$prelude_jg$$mapM($instance$Monad$11))(_16_renamePat_$u$6))(_16_ps_$u$18)))(function(_16_ps_$u$19){
return (function(){
var $pm = (has(_16_n_$u$17))(_16_env_$u$3);return (!$pm)?((function(){
return (ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair((($$compiler$ast_jg$$PData(_16_ann_$u$16))(_16_n_$u$17))((map($$compiler$prelude_jg$$fst))(_16_ps_$u$19))))(((foldl(merge))(empty))((map($$compiler$prelude_jg$$snd))(_16_ps_$u$19))))})()):($pm?((function(){
return (ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair((($$compiler$ast_jg$$PData(_16_ann_$u$16))((get(_16_n_$u$17))(_16_env_$u$3)))((map($$compiler$prelude_jg$$fst))(_16_ps_$u$19))))(((foldl(merge))(empty))((map($$compiler$prelude_jg$$snd))(_16_ps_$u$19))))})()):(error("pattern match fail")))})()})})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))))})()};var _16_rewritePat_$u$7 = function(_16_p_$u$20){
return (function(){
var $pm = _16_p_$u$20;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_16_pat_$u$21,_16_e_$u$22){
return (($gt$gt$eq($instance$Monad$11))(_16_renamePat_$u$6(_16_pat_$u$21)))(function(_16_pe_$u$23){
return (function(){
var $pm = _16_pe_$u$23;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_16_pat_$u$24,_16_penv_$u$25){
return (($gt$gt$eq($instance$Monad$11))((($$compiler$uniquifier_jg$$rewriteExpr(_16_pre_$u$2))((merge(_16_env_$u$3))(_16_penv_$u$25)))(_16_e_$u$22)))(function(_16_e_$u$26){
return (ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair(_16_pat_$u$24))(_16_e_$u$26))})})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};var _16_f_$u$8 = function(_16_e_$u$27){
return (function(){
var $pm = _16_e_$u$27;return ($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_16_ann_$u$28,_16_p_$u$29,_16_e_$u$30){
return (($gt$gt$eq($instance$Monad$11))(_16_rename_$u$5(_16_p_$u$29)))(function(_16_n_$u$31){
return (($gt$gt$eq($instance$Monad$11))((($$compiler$uniquifier_jg$$rewriteExpr(_16_pre_$u$2))(((set(_16_p_$u$29))(_16_n_$u$31))(_16_env_$u$3)))(_16_e_$u$30)))(function(_16_e_$u$32){
return (ret($instance$Monad$11))($$compiler$prelude_jg$$Right((($$compiler$ast_jg$$Lam(_16_ann_$u$28))(_16_n_$u$31))(_16_e_$u$32)))})})})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_16_ann_$u$33,_16_bs_$u$34,_16_e_$u$35){
return (function(){
var _16_ns_$u$36 = (map($$compiler$prelude_jg$$fst))(_16_bs_$u$34);var _16_ns2_$u$37 = (($$compiler$prelude_jg$$mapM($instance$Monad$11))(_16_rename_$u$5))(_16_ns_$u$36);return (($gt$gt$eq($instance$Monad$11))(_16_ns2_$u$37))(function(_16_ns_$u$38){
return (function(){
var _16_env2_$u$39 = (merge(_16_env_$u$3))($$compiler$prelude_jg$$toRecord(($$compiler$prelude_jg$$zip((map($$compiler$prelude_jg$$fst))(_16_bs_$u$34)))(_16_ns_$u$38)));var _16_e2_$u$41 = (($$compiler$uniquifier_jg$$rewriteExpr(_16_pre_$u$2))(_16_env2_$u$39))(_16_e_$u$35);var _16_bs2_$u$40 = (($$compiler$prelude_jg$$mapM($instance$Monad$11))(($$compiler$uniquifier_jg$$rewriteExpr(_16_pre_$u$2))(_16_env2_$u$39)))((map($$compiler$prelude_jg$$snd))(_16_bs_$u$34));return (($gt$gt$eq($instance$Monad$11))(_16_bs2_$u$40))(function(_16_bs_$u$42){
return (($gt$gt$eq($instance$Monad$11))(_16_e2_$u$41))(function(_16_e_$u$43){
return (ret($instance$Monad$11))($$compiler$prelude_jg$$Right((($$compiler$ast_jg$$Let(_16_ann_$u$33))(($$compiler$prelude_jg$$zip(_16_ns_$u$38))(_16_bs_$u$42)))(_16_e_$u$43)))})})})()})})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_16_ann_$u$44,_16_e_$u$45,_16_ps_$u$46){
return (($gt$gt$eq($instance$Monad$11))((($$compiler$uniquifier_jg$$rewriteExpr(_16_pre_$u$2))(_16_env_$u$3))(_16_e_$u$45)))(function(_16_e_$u$47){
return (($gt$gt$eq($instance$Monad$11))((($$compiler$prelude_jg$$mapM($instance$Monad$11))(_16_rewritePat_$u$7))(_16_ps_$u$46)))(function(_16_ps_$u$48){
return (ret($instance$Monad$11))($$compiler$prelude_jg$$Right((($$compiler$ast_jg$$Case(_16_ann_$u$44))(_16_e_$u$47))(_16_ps_$u$48)))})})})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Var.$tag)?((function(_16_ann_$u$49,_16_v_$u$50){
return (function(){
var $pm = (has(_16_v_$u$50))(_16_env_$u$3);return $pm?((function(){
return (ret($instance$Monad$11))($$compiler$prelude_jg$$Left(($$compiler$ast_jg$$Var(_16_ann_$u$49))((get(_16_v_$u$50))(_16_env_$u$3))))})()):((!$pm)?((function(){
return (ret($instance$Monad$11))($$compiler$prelude_jg$$Left(_16_e_$u$27))})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):((function(_16___$u$51){
return (ret($instance$Monad$11))($$compiler$prelude_jg$$Left(_16_e_$u$27))})($pm)))))})()};return (($$compiler$ast_jg$$breakableDownM($instance$Monad$11))(_16_f_$u$8))(_16_e_$u$4)})()}}};
var $$compiler$uniquifier_jg$$rewriteBindingsNoPrefix = function(_16_pre_$u$68){
return function(_16_env_$u$69){
return function(_16_bs_$u$70){
return (($$compiler$prelude_jg$$mapM($instance$Monad$11))(function(_16_d_$u$71){
return (function(){
var $pm = _16_d_$u$71;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_16_n_$u$72,_16_e_$u$73){
return (($gt$gt$eq($instance$Monad$11))((($$compiler$uniquifier_jg$$rewriteExpr(_16_pre_$u$68))(_16_env_$u$69))(_16_e_$u$73)))(function(_16_e_$u$74){
return (ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair(_16_n_$u$72))(_16_e_$u$74))})})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(_16_bs_$u$70)}}};
var $$compiler$uniquifier_jg$$rewriteInstance = function(_16_pre_$u$52){
return function(_16_env_$u$53){
return function(_16_i_$u$54){
return (function(){
var $pm = _16_i_$u$54;return ($pm.$tag==$$compiler$ast_jg$$Instance.$tag)?((function(_16_ann_$u$55,_16_n_$u$56,_16_t_$u$57,_16_bs_$u$58){
return (($gt$gt$eq($instance$Monad$11))((($$compiler$uniquifier_jg$$rewriteBindingsNoPrefix(_16_pre_$u$52))(_16_env_$u$53))(_16_bs_$u$58)))(function(_16_bs_$u$59){
return (ret($instance$Monad$11))(((($$compiler$ast_jg$$Instance(_16_ann_$u$55))(_16_n_$u$56))(_16_t_$u$57))(_16_bs_$u$59))})})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}}};
var $$compiler$uniquifier_jg$$addPrefix = function(_16_fn_$u$127){
return function(_16_n_$u$128){
return ($concat(($concat(((stringReplaceChar("/"))("$"))(((stringReplaceChar("."))("_"))(_16_fn_$u$127))))("$$")))(_16_n_$u$128)}};
var $$compiler$uniquifier_jg$$rewriteBindings = function(_16_pre_$u$60){
return function(_16_fn_$u$61){
return function(_16_env_$u$62){
return function(_16_bs_$u$63){
return (($$compiler$prelude_jg$$mapM($instance$Monad$11))(function(_16_d_$u$64){
return (function(){
var $pm = _16_d_$u$64;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_16_n_$u$65,_16_e_$u$66){
return (($gt$gt$eq($instance$Monad$11))((($$compiler$uniquifier_jg$$rewriteExpr(_16_pre_$u$60))(_16_env_$u$62))(_16_e_$u$66)))(function(_16_e_$u$67){
return (ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair(($$compiler$uniquifier_jg$$addPrefix(_16_fn_$u$61))(_16_n_$u$65)))(_16_e_$u$67))})})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(_16_bs_$u$63)}}}};
var $$compiler$uniquifier_jg$$renameImport = function(_16_fn_$u$139){
return function(_16_i_$u$140){
return (function(){
var $pm = _16_i_$u$140;return (($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)&&("./builtins.js"==$pm.$1))?((function(_16___$u$141,_16___$u$142){
return _16_i_$u$140})($pm.$0,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)?((function(_16_ann_$u$143,_16_f_$u$144,_16_ns_$u$145){
return (($$compiler$ast_jg$$ImportOpen(_16_ann_$u$143))(_16_f_$u$144))((map(function(_16_p_$u$146){
return (function(){
var $pm = _16_p_$u$146;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_16_nf_$u$147,_16_nt_$u$148){
return ($$compiler$prelude_jg$$Pair(_16_nf_$u$147))(($$compiler$uniquifier_jg$$addPrefix(_16_fn_$u$139))(_16_nt_$u$148))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(_16_ns_$u$145))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))})()}};
var $$compiler$uniquifier_jg$$renameData = function(_16_fn_$u$129){
return function(_16_d_$u$130){
return (function(){
var $pm = _16_d_$u$130;return ($pm.$tag==$$compiler$ast_jg$$Data.$tag)?((function(_16_ann_$u$131,_16_n_$u$132,_16_tvs_$u$133,_16_cs_$u$134){
return ((($$compiler$ast_jg$$Data(_16_ann_$u$131))(_16_n_$u$132))(_16_tvs_$u$133))((map(function(_16_c_$u$135){
return (function(){
var $pm = _16_c_$u$135;return ($pm.$tag==$$compiler$ast_jg$$DataCon.$tag)?((function(_16_ann_$u$136,_16_n_$u$137,_16_ts_$u$138){
return (($$compiler$ast_jg$$DataCon(_16_ann_$u$136))(($$compiler$uniquifier_jg$$addPrefix(_16_fn_$u$129))(_16_n_$u$137)))(_16_ts_$u$138)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}))(_16_cs_$u$134))})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}};
var $$compiler$uniquifier_jg$$rewriteModule = function(_16_pre_$u$75){
return function(_16_ms_$u$76){
return function(_16_m_$u$77){
return (function(){
var $pm = _16_m_$u$77;return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_16_ann_$u$78,_16_fn_$u$79,_16_is_$u$80,_16_ds_$u$81,_16_cs_$u$82,_16_ins_$u$83,_16_bs_$u$84){
return (function(){
var _16_addBindings_$u$85 = function(_16_env_$u$94){
return function(_16_bs_$u$95){
return ((foldl(function(_16_env_$u$96){
return function(_16_b_$u$97){
return ((set($$compiler$prelude_jg$$fst(_16_b_$u$97)))(($$compiler$prelude_jg$$$($$compiler$uniquifier_jg$$addPrefix(_16_fn_$u$79)))($$compiler$prelude_jg$$fst(_16_b_$u$97))))(_16_env_$u$96)}}))(_16_env_$u$94))(_16_bs_$u$95)}};var _16_addBindingsNoPrefix_$u$86 = function(_16_env_$u$98){
return function(_16_bs_$u$99){
return ((foldl(function(_16_env_$u$100){
return function(_16_b_$u$101){
return ((set($$compiler$prelude_jg$$fst(_16_b_$u$101)))($$compiler$prelude_jg$$fst(_16_b_$u$101)))(_16_env_$u$100)}}))(_16_env_$u$98))(_16_bs_$u$99)}};var _16_addClass_$u$87 = function(_16_env_$u$102){
return function(_16_c_$u$103){
return (function(){
var $pm = _16_c_$u$103;return ($pm.$tag==$$compiler$ast_jg$$Class.$tag)?((function(_16___$u$104,_16___$u$105,_16___$u$106,_16_bs_$u$107){
return (_16_addBindingsNoPrefix_$u$86(_16_env_$u$102))(_16_bs_$u$107)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}};var _16_addImport_$u$88 = function(_16_env_$u$108){
return function(_16_i_$u$109){
return (function(){
var $pm = _16_i_$u$109;return (($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)&&("./builtins.js"==$pm.$1))?((function(_16___$u$110,_16_ns_$u$111){
return (_16_addBindingsNoPrefix_$u$86(((foldl(_16_addClass_$u$87))(_16_env_$u$108))((function(){
var $pm = (get("./builtins.js"))(_16_ms_$u$76);return ($pm.$tag==$$compiler$ast_jg$$ModuleInterface.$tag)?((function(_16___$u$112,_16_cs_$u$113,_16___$u$114){
return _16_cs_$u$113})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})())))((map(function(_16_n_$u$115){
return ($$compiler$prelude_jg$$Pair($$compiler$prelude_jg$$snd(_16_n_$u$115)))($$compiler$prelude_jg$$fst(_16_n_$u$115))}))(_16_ns_$u$111))})($pm.$0,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)?((function(_16___$u$116,_16_f_$u$117,_16_ns_$u$118){
return (_16_addBindings_$u$85(((foldl(_16_addClass_$u$87))(_16_env_$u$108))((function(){
var $pm = (get(_16_f_$u$117))(_16_ms_$u$76);return ($pm.$tag==$$compiler$ast_jg$$ModuleInterface.$tag)?((function(_16___$u$119,_16_cs_$u$120,_16___$u$121){
return _16_cs_$u$120})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})())))((map(function(_16_n_$u$122){
return ($$compiler$prelude_jg$$Pair($$compiler$prelude_jg$$snd(_16_n_$u$122)))($$compiler$prelude_jg$$fst(_16_n_$u$122))}))(_16_ns_$u$118))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))})()}};var _16_env_$u$91 = ((foldl(_16_addImport_$u$88))(((foldl(_16_addClass_$u$87))((_16_addBindings_$u$85($$compiler$prelude_jg$$toRecord(($$compiler$prelude_jg$$concatMap(function(_16_d_$u$123){
return (map(function(_16_n_$u$124){
return ($$compiler$prelude_jg$$Pair(_16_n_$u$124))(($$compiler$uniquifier_jg$$addPrefix(_16_fn_$u$79))(_16_n_$u$124))}))($$compiler$ast_jg$$dataConNames(_16_d_$u$123))}))(_16_ds_$u$81))))(_16_bs_$u$84)))(_16_cs_$u$82)))(_16_is_$u$80);var _16_ins2_$u$93 = (($$compiler$prelude_jg$$mapM($instance$Monad$11))(($$compiler$uniquifier_jg$$rewriteInstance(_16_pre_$u$75))(_16_env_$u$91)))(_16_ins_$u$83);var _16_bs2_$u$92 = ((($$compiler$uniquifier_jg$$rewriteBindings(_16_pre_$u$75))(_16_fn_$u$79))(_16_env_$u$91))(_16_bs_$u$84);var _16_is2_$u$90 = (map($$compiler$uniquifier_jg$$renameImport(_16_fn_$u$79)))(_16_is_$u$80);var _16_ds2_$u$89 = (map($$compiler$uniquifier_jg$$renameData(_16_fn_$u$79)))(_16_ds_$u$81);return (($gt$gt$eq($instance$Monad$11))(_16_bs2_$u$92))(function(_16_bs_$u$125){
return (($gt$gt$eq($instance$Monad$11))(_16_ins2_$u$93))(function(_16_ins_$u$126){
return (ret($instance$Monad$11))((((((($$compiler$ast_jg$$Module(_16_ann_$u$78))(_16_fn_$u$79))(_16_is2_$u$90))(_16_ds2_$u$89))(_16_cs_$u$82))(_16_ins_$u$126))(_16_bs_$u$125))})})})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})()}}};
var $$compiler$uniquifier_jg$$uniquify = function(_16_pre_$u$149){
return function(_16_ms_$u$150){
return function(_16_m_$u$151){
return ($$compiler$prelude_jg$$evalState(0))((($$compiler$uniquifier_jg$$rewriteModule(_16_pre_$u$149))(_16_ms_$u$150))(_16_m_$u$151))}}};
var $$compiler$moduleMerger_jg$$importAsBindings = function(_15_i_$u$17){
return (function(){
var $pm = _15_i_$u$17;return (($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)&&("./builtins.js"==$pm.$1))?((function(_15___$u$18,_15___$u$19){
return emptyArray})($pm.$0,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)?((function(_15___$u$20,_15___$u$21,_15_ns_$u$22){
return (map(function(_15_p_$u$23){
return (function(){
var $pm = _15_p_$u$23;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_15_nf_$u$24,_15_nt_$u$25){
return ($$compiler$prelude_jg$$Pair(_15_nt_$u$25))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))(_15_nf_$u$24))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))((filter(function(_15_p_$u$26){
return (($$compiler$prelude_jg$$$div$eq($instance$Eq$1))($$compiler$prelude_jg$$fst(_15_p_$u$26)))($$compiler$prelude_jg$$snd(_15_p_$u$26))}))(_15_ns_$u$22))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))})()};
var $$compiler$moduleMerger_jg$$mergeInto = function(_15_a_$u$1){
return function(_15_b_$u$2){
return (function(){
var $pm = _15_a_$u$1;return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_15_ann_$u$3,_15___$u$4,_15_is_$u$5,_15_ds_$u$6,_15___$u$7,_15___$u$8,_15_bs_$u$9){
return (function(){
var $pm = _15_b_$u$2;return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_15___$u$10,_15_fn_$u$11,_15_is2_$u$12,_15_ds2_$u$13,_15___$u$14,_15___$u$15,_15_bs2_$u$16){
return (((((($$compiler$ast_jg$$Module(_15_ann_$u$3))(_15_fn_$u$11))(_15_is_$u$5))((concat(_15_ds_$u$6))(_15_ds2_$u$13)))(emptyArray))(emptyArray))((concat(_15_bs_$u$9))((concat(($$compiler$prelude_jg$$concatMap($$compiler$moduleMerger_jg$$importAsBindings))(_15_is2_$u$12)))(_15_bs2_$u$16)))})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})()}};
var $$compiler$moduleMerger_jg$$mergeModules = function(_15_ms_$u$0){
return (foldl1($$compiler$moduleMerger_jg$$mergeInto))(_15_ms_$u$0)};
var $$compiler$graph_jg$$dfs = function(_14_g_$u$0){
return function(_14_visited_$u$1){
return function(_14_v_$u$2){
return (function(){
var _14_visit_$u$3 = function(_14_r_$u$6){
return function(_14_e_$u$7){
return (function(){
var $pm = (($$compiler$prelude_jg$$contains($instance$Eq$1))(_14_e_$u$7))(_14_r_$u$6);return $pm?((function(){
return _14_r_$u$6})()):((!$pm)?((function(){
return (concat((($$compiler$graph_jg$$dfs(_14_g_$u$0))((push(_14_v_$u$2))((concat(_14_r_$u$6))(_14_visited_$u$1))))(_14_e_$u$7)))(_14_r_$u$6)})()):(error("pattern match fail")))})()}};var _14_es_$u$4 = (filter(function(_14_v_$u$8){
return $$compiler$prelude_jg$$not((($$compiler$prelude_jg$$contains($instance$Eq$1))(_14_v_$u$8))(_14_visited_$u$1))}))((get(_14_v_$u$2))(_14_g_$u$0));var _14_r_$u$5 = ((foldr(_14_visit_$u$3))(emptyArray))(_14_es_$u$4);return (enqueue(_14_v_$u$2))(_14_r_$u$5)})()}}};
var $$compiler$graph_jg$$fullDfs = function(_14_g_$u$9){
return (function(){
var _14_visit_$u$10 = function(_14_result_$u$12){
return function(_14_v_$u$13){
return function(_14___$u$14){
return (function(){
var $pm = (($$compiler$prelude_jg$$contains($instance$Eq$1))(_14_v_$u$13))(_14_result_$u$12);return $pm?((function(){
return _14_result_$u$12})()):((!$pm)?((function(){
return (concat((($$compiler$graph_jg$$dfs(_14_g_$u$9))(_14_result_$u$12))(_14_v_$u$13)))(_14_result_$u$12)})()):(error("pattern match fail")))})()}}};var _14_result_$u$11 = ((foldRecord(_14_visit_$u$10))(emptyArray))(_14_g_$u$9);return _14_result_$u$11})()};
var $$compiler$graph_jg$$scc = function(_14_g_$u$15){
return (function(){
var _14_invertedG_$u$16 = (function(){
var _14_invertEdge_$u$20 = function(_14_v_$u$22){
return function(_14_ig_$u$23){
return function(_14_e_$u$24){
return (function(){
var $pm = (has(_14_e_$u$24))(_14_ig_$u$23);return $pm?((function(){
return ((set(_14_e_$u$24))((push(_14_v_$u$22))((get(_14_e_$u$24))(_14_ig_$u$23))))(_14_ig_$u$23)})()):((!$pm)?((function(){
return ((set(_14_e_$u$24))($$compiler$prelude_jg$$arr1(_14_v_$u$22)))(_14_ig_$u$23)})()):(error("pattern match fail")))})()}}};var _14_invert_$u$21 = function(_14_ig_$u$25){
return function(_14_v_$u$26){
return function(_14_es_$u$27){
return (function(){
var _14_ig2_$u$28 = (function(){
var $pm = (has(_14_v_$u$26))(_14_ig_$u$25);return $pm?((function(){
return _14_ig_$u$25})()):((!$pm)?((function(){
return ((set(_14_v_$u$26))(emptyArray))(_14_ig_$u$25)})()):(error("pattern match fail")))})();return ((foldl(_14_invertEdge_$u$20(_14_v_$u$26)))(_14_ig2_$u$28))(_14_es_$u$27)})()}}};return ((foldRecord(_14_invert_$u$21))(empty))(_14_g_$u$15)})();var _14_assembleCc_$u$17 = function(_14_gs_$u$29){
return function(_14_v_$u$30){
return (function(){
var $pm = _14_gs_$u$29;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_14_ig_$u$31,_14_ccs_$u$32){
return (function(){
var $pm = ($$compiler$prelude_jg$$exists(($$compiler$prelude_jg$$contains($instance$Eq$1))(_14_v_$u$30)))(_14_ccs_$u$32);return $pm?((function(){
return ($$compiler$prelude_jg$$Pair(_14_ig_$u$31))(_14_ccs_$u$32)})()):((!$pm)?((function(){
return (function(){
var _14_cc_$u$33 = (($$compiler$graph_jg$$dfs(_14_ig_$u$31))(emptyArray))(_14_v_$u$30);var _14_ig2_$u$34 = ((foldl(function(_14_g_$u$35){
return function(_14_v_$u$36){
return (del(_14_v_$u$36))((mapRecord(filter(function(_14_w_$u$37){
return (($$compiler$prelude_jg$$$div$eq($instance$Eq$1))(_14_w_$u$37))(_14_v_$u$36)})))(_14_g_$u$35))}}))(_14_ig_$u$31))(_14_cc_$u$33);return ($$compiler$prelude_jg$$Pair(_14_ig2_$u$34))((push(_14_cc_$u$33))(_14_ccs_$u$32))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};var _14_firstDfs_$u$18 = $$compiler$graph_jg$$fullDfs(_14_g_$u$15);var _14_ccs_$u$19 = $$compiler$prelude_jg$$snd(((foldl(_14_assembleCc_$u$17))(($$compiler$prelude_jg$$Pair(_14_invertedG_$u$16))(emptyArray)))(_14_firstDfs_$u$18));return _14_ccs_$u$19})()};
var $$compiler$graph_jg$$sccSorted = function(_14_g_$u$38){
return (function(){
var _14_ccs_$u$39 = $$compiler$graph_jg$$scc(_14_g_$u$38);var _14_topSort_$u$40 = function(_14_ccs_$u$42){
return (function(){
var _14_g2g_$u$43 = (function(){
var _14_f_$u$47 = function(_14_r_$u$48){
return function(_14_icc_$u$49){
return (function(){
var $pm = _14_icc_$u$49;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_14_i_$u$50,_14_cc_$u$51){
return ((foldl(function(_14_r_$u$52){
return function(_14_c_$u$53){
return ((set(_14_c_$u$53))(intToString(_14_i_$u$50)))(_14_r_$u$52)}}))(_14_r_$u$48))(_14_cc_$u$51)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};return ((foldl(_14_f_$u$47))(empty))($$compiler$prelude_jg$$zipWithIndex(_14_ccs_$u$42))})();var _14_addGraph_$u$44 = function(_14_r_$u$54){
return function(_14_v_$u$55){
return function(_14_es_$u$56){
return (function(){
var _14_rv_$u$57 = (get(_14_v_$u$55))(_14_g2g_$u$43);var _14_res_$u$58 = ($$compiler$prelude_jg$$uniq($instance$Eq$1))(sort((filter(function(_14_re_$u$59){
return (($$compiler$prelude_jg$$$div$eq($instance$Eq$1))(_14_re_$u$59))(_14_rv_$u$57)}))((map(function(_14_e_$u$60){
return (get(_14_e_$u$60))(_14_g2g_$u$43)}))(_14_es_$u$56))));return (function(){
var $pm = (has(_14_rv_$u$57))(_14_r_$u$54);return (!$pm)?((function(){
return ((set(_14_rv_$u$57))(_14_res_$u$58))(_14_r_$u$54)})()):($pm?((function(){
return ((set(_14_rv_$u$57))(((($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1))(_14_res_$u$58))((get(_14_rv_$u$57))(_14_r_$u$54))))(_14_r_$u$54)})()):(error("pattern match fail")))})()})()}}};var _14_cg_$u$45 = ((foldRecord(_14_addGraph_$u$44))(empty))(_14_g_$u$38);var _14_ord_$u$46 = $$compiler$graph_jg$$fullDfs(_14_cg_$u$45);return $$compiler$prelude_jg$$reverse((map(function(_14_i_$u$61){
return (getIx(unsafeStringToInt(_14_i_$u$61)))(_14_ccs_$u$42)}))(_14_ord_$u$46))})()};var _14_result_$u$41 = _14_topSort_$u$40(_14_ccs_$u$39);return _14_result_$u$41})()};
var $$compiler$printer_jg$$printType = function(_13_t_$u$0){
return (function(){
var _13_printParen_$u$1 = function(_13_t_$u$5){
return ($concat(($concat("("))($$compiler$printer_jg$$printType(_13_t_$u$5))))(")")};var _13_printSecondTypeInApp_$u$4 = function(_13_t_$u$28){
return (function(){
var $pm = _13_t_$u$28;return ($pm.$tag==$$compiler$ast_jg$$TApp.$tag)?((function(_13___$u$29,_13_a_$u$30,_13_b_$u$31){
return _13_printParen_$u$1(_13_t_$u$28)})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_13___$u$32,_13_vs_$u$33,_13___$u$34,_13_a_$u$35){
return _13_printParen_$u$1(_13_t_$u$28)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):((function(_13___$u$36){
return $$compiler$printer_jg$$printType(_13_t_$u$28)})($pm)))})()};var _13_printFirstTypeInApp_$u$3 = function(_13_t_$u$17){
return (function(){
var $pm = _13_t_$u$17;return (($pm.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$pm.$1.$1.$1))))?((function(_13___$u$18,_13___$u$19,_13___$u$20,_13_a_$u$21,_13_b_$u$22){
return _13_printParen_$u$1(_13_t_$u$17)})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_13___$u$23,_13_vs_$u$24,_13___$u$25,_13_a_$u$26){
return _13_printParen_$u$1(_13_t_$u$17)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):((function(_13___$u$27){
return $$compiler$printer_jg$$printType(_13_t_$u$17)})($pm)))})()};var _13_printTypeInFun_$u$2 = function(_13_t_$u$6){
return (function(){
var $pm = _13_t_$u$6;return (($pm.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$pm.$1.$1.$1))))?((function(_13___$u$7,_13___$u$8,_13___$u$9,_13_c_$u$10,_13_d_$u$11){
return _13_printParen_$u$1(_13_t_$u$6)})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_13___$u$12,_13_vs_$u$13,_13___$u$14,_13_a_$u$15){
return _13_printParen_$u$1(_13_t_$u$6)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):((function(_13___$u$16){
return $$compiler$printer_jg$$printType(_13_t_$u$6)})($pm)))})()};return (function(){
var $pm = _13_t_$u$0;return ($pm.$tag==$$compiler$ast_jg$$TConst.$tag)?((function(_13___$u$37,_13_t_$u$38){
return _13_t_$u$38})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TVar.$tag)?((function(_13___$u$39,_13_v_$u$40){
return _13_v_$u$40})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TBot.$tag)?((function(){
return "~bottom~"})()):(($pm.$tag==$$compiler$ast_jg$$TUnknown.$tag)?((function(){
return "?"})()):((($pm.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$pm.$1.$1.$1))))?((function(_13___$u$41,_13___$u$42,_13___$u$43,_13_a_$u$44,_13_b_$u$45){
return ($concat(($concat(_13_printTypeInFun_$u$2(_13_a_$u$44)))(" -> ")))($$compiler$printer_jg$$printType(_13_b_$u$45))})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$TApp.$tag)?((function(_13___$u$46,_13_a_$u$47,_13_b_$u$48){
return ($concat(($concat(_13_printFirstTypeInApp_$u$3(_13_a_$u$47)))(" ")))(_13_printSecondTypeInApp_$u$4(_13_b_$u$48))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_13___$u$49,_13_vs_$u$50,_13_bs_$u$51,_13_a_$u$52){
return (function(){
var _13_bounds_$u$53 = (function(){
var $pm = length(_13_bs_$u$51);return (0==$pm)?((function(){
return ""})()):((function(_13___$u$54){
return ($concat(" with "))((intercalate(", "))((map($$compiler$printer_jg$$printTypeBound))(_13_bs_$u$51)))})($pm))})();return ($concat(($concat(($concat(($concat("forall "))((intercalate(", "))(_13_vs_$u$50))))(_13_bounds_$u$53)))(". ")))($$compiler$printer_jg$$printType(_13_a_$u$52))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):((function(_13___$u$55){
return error(($concat("cannot print "))(jsonStringify(_13_t_$u$0)))})($pm))))))))})()})()};
var $$compiler$printer_jg$$printTypeBound = function(_13_b_$u$56){
return (function(){
var $pm = _13_b_$u$56;return ($pm.$tag==$$compiler$ast_jg$$TCBound.$tag)?((function(_13___$u$57,_13_n_$u$58,_13_t_$u$59){
return ($concat(($concat(($concat(($concat(_13_n_$u$58))(" ")))("(")))($$compiler$printer_jg$$printType(_13_t_$u$59))))(")")})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var $$compiler$printer_jg$$indent = map(function(_13_l_$u$116){
return ($concat("  "))(_13_l_$u$116)});
var $$compiler$printer_jg$$printExprTyped = function(_13_typed_$u$60){
return function(_13_e_$u$61){
return (function(){
var _13_sameLine_$u$63 = function(_13_xs_$u$72){
return function(_13_ys_$u$73){
return (concat($$compiler$prelude_jg$$init(_13_xs_$u$72)))((enqueue(($concat($$compiler$prelude_jg$$last(_13_xs_$u$72)))($$compiler$prelude_jg$$head(_13_ys_$u$73))))($$compiler$prelude_jg$$tail(_13_ys_$u$73)))}};var _13_sameLine3_$u$64 = function(_13_a_$u$74){
return function(_13_b_$u$75){
return function(_13_c_$u$76){
return (_13_sameLine_$u$63(_13_a_$u$74))((_13_sameLine_$u$63(_13_b_$u$75))(_13_c_$u$76))}}};var _13_printT_$u$68 = function(_13_e_$u$109){
return (function(){
var _13_t_$u$110 = $$compiler$ast_jg$$getType(_13_e_$u$109);return $$compiler$printer_jg$$printType(_13_t_$u$110)})()};var _13_printPat_$u$66 = function(_13_p_$u$80){
return (function(){
var $pm = _13_p_$u$80;return ($pm.$tag==$$compiler$ast_jg$$PVar.$tag)?((function(_13___$u$81,_13_v_$u$82){
return _13_v_$u$82})($pm.$0,$pm.$1)):((($pm.$tag==$$compiler$ast_jg$$PConst.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$CNum.$tag))?((function(_13___$u$83,_13_n_$u$84){
return jsonStringify(_13_n_$u$84)})($pm.$0,$pm.$1.$0)):((($pm.$tag==$$compiler$ast_jg$$PConst.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$CStr.$tag))?((function(_13___$u$85,_13_s_$u$86){
return jsonStringify(_13_s_$u$86)})($pm.$0,$pm.$1.$0)):(($pm.$tag==$$compiler$ast_jg$$PData.$tag)?((function(_13___$u$87,_13_n_$u$88,_13_ps_$u$89){
return ($concat(($concat(($concat(_13_n_$u$88))(" (")))(($$compiler$prelude_jg$$join((map(_13_printPat_$u$66))(_13_ps_$u$89)))(") ("))))(")")})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))})()};var _13_printParen_$u$62 = function(_13_e_$u$71){
return ((_13_sameLine3_$u$64($$compiler$prelude_jg$$arr1("(")))(_13_printExpr_$u$69(_13_e_$u$71)))($$compiler$prelude_jg$$arr1(")"))};var _13_printCasePat_$u$65 = function(_13_cp_$u$77){
return (function(){
var $pm = _13_cp_$u$77;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_13_p_$u$78,_13_e_$u$79){
return (enqueue(($concat(_13_printPat_$u$66(_13_p_$u$78)))(" ->")))($$compiler$printer_jg$$indent(_13_printExpr_$u$69(_13_e_$u$79)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};var _13_printE_$u$67 = function(_13_e_$u$90){
return (function(){
var $pm = _13_e_$u$90;return ($pm.$tag==$$compiler$ast_jg$$Var.$tag)?((function(_13___$u$91,_13_n_$u$92){
return $$compiler$prelude_jg$$arr1(_13_n_$u$92)})($pm.$0,$pm.$1)):((($pm.$tag==$$compiler$ast_jg$$Const.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$CNum.$tag))?((function(_13___$u$93,_13_n_$u$94){
return $$compiler$prelude_jg$$arr1(jsonStringify(_13_n_$u$94))})($pm.$0,$pm.$1.$0)):((($pm.$tag==$$compiler$ast_jg$$Const.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$CStr.$tag))?((function(_13___$u$95,_13_s_$u$96){
return $$compiler$prelude_jg$$arr1(jsonStringify(_13_s_$u$96))})($pm.$0,$pm.$1.$0)):(($pm.$tag==$$compiler$ast_jg$$App.$tag)?((function(_13___$u$97,_13_f_$u$98,_13_a_$u$99){
return ((_13_sameLine3_$u$64(_13_printParen_$u$62(_13_f_$u$98)))($$compiler$prelude_jg$$arr1(" ")))(_13_printParen_$u$62(_13_a_$u$99))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_13___$u$100,_13_v_$u$101,_13_e_$u$102){
return (enqueue(($concat(($concat("\\"))(_13_v_$u$101)))(" ->")))($$compiler$printer_jg$$indent(_13_printExpr_$u$69(_13_e_$u$102)))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_13___$u$103,_13_e_$u$104,_13_ps_$u$105){
return (concat(((_13_sameLine3_$u$64($$compiler$prelude_jg$$arr1("case ")))(_13_printParen_$u$62(_13_e_$u$104)))($$compiler$prelude_jg$$arr1(" of"))))($$compiler$printer_jg$$indent(($$compiler$prelude_jg$$concatMap(_13_printCasePat_$u$65))(_13_ps_$u$105)))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_13___$u$106,_13_ds_$u$107,_13_e_$u$108){
return (concat((push("in"))((enqueue("let"))($$compiler$printer_jg$$indent(($$compiler$prelude_jg$$concatMap($$compiler$printer_jg$$printDef(_13_typed_$u$60)))(_13_ds_$u$107))))))($$compiler$printer_jg$$indent(_13_printExpr_$u$69(_13_e_$u$108)))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))))))))})()};var _13_printExpr_$u$69 = function(_13_e_$u$111){
return (function(){
var $pm = _13_typed_$u$60;return (!$pm)?((function(){
return _13_printE_$u$67(_13_e_$u$111)})()):($pm?((function(){
return ((_13_sameLine3_$u$64($$compiler$prelude_jg$$arr1("(")))(_13_printE_$u$67(_13_e_$u$111)))($$compiler$prelude_jg$$arr1(($concat(($concat(" :: "))(_13_printT_$u$68(_13_e_$u$111))))(" )")))})()):(error("pattern match fail")))})()};return _13_printExpr_$u$69(_13_e_$u$61)})()}};
var $$compiler$printer_jg$$printDef = function(_13_typed_$u$112){
return function(_13_d_$u$113){
return (function(){
var $pm = _13_d_$u$113;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_13_n_$u$114,_13_e_$u$115){
return (enqueue(($concat(_13_n_$u$114))(" =")))($$compiler$printer_jg$$indent(($$compiler$printer_jg$$printExprTyped(_13_typed_$u$112))(_13_e_$u$115)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};
var $$compiler$printer_jg$$reallyPrintExpr = function(_13_typed_$u$117){
return function(_13_e_$u$118){
return ($$compiler$prelude_jg$$join(($$compiler$printer_jg$$printExprTyped(_13_typed_$u$117))(_13_e_$u$118)))("\n")}};
var $$compiler$typer_jg$$instanceToTypeBound = function(_12_i_$u$532){
return (function(){
var $pm = _12_i_$u$532;return ($pm.$tag==$$compiler$ast_jg$$Instance.$tag)?((function(_12___$u$533,_12_n_$u$534,_12_t_$u$535,_12___$u$536){
return (($$compiler$ast_jg$$TCBound($$compiler$prelude_jg$$Empty))(_12_n_$u$534))(_12_t_$u$535)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var $$compiler$typer_jg$$mkTForall = function(_12_ann_$u$168){
return function(_12_vs_$u$169){
return function(_12_bs_$u$170){
return function(_12_t_$u$171){
return (function(){
var _12_f_$u$172 = function(_12_bs_$u$173){
return function(_12_b_$u$174){
return (function(){
var $pm = ($$compiler$prelude_jg$$exists($$compiler$ast_jg$$equivBound(_12_b_$u$174)))(_12_bs_$u$173);return $pm?((function(){
return _12_bs_$u$173})()):((!$pm)?((function(){
return (push(_12_b_$u$174))(_12_bs_$u$173)})()):(error("pattern match fail")))})()}};return ((($$compiler$ast_jg$$TForall(_12_ann_$u$168))(_12_vs_$u$169))(((foldl(_12_f_$u$172))(emptyArray))(_12_bs_$u$170)))(_12_t_$u$171)})()}}}};
var $$compiler$typer_jg$$f1 = function(_12_a_$u$166){
return function(_12_b_$u$167){
return (($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))((($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("->")))(_12_a_$u$166)))(_12_b_$u$167)}};
var $$compiler$typer_jg$$conType = function(_12_dn_$u$630){
return function(_12_tvs_$u$631){
return function(_12_c_$u$632){
return (function(){
var $pm = _12_c_$u$632;return ($pm.$tag==$$compiler$ast_jg$$DataCon.$tag)?((function(_12___$u$633,_12_n_$u$634,_12_ts_$u$635){
return ($$compiler$prelude_jg$$Pair(_12_n_$u$634))(((($$compiler$typer_jg$$mkTForall($$compiler$prelude_jg$$Empty))(_12_tvs_$u$631))(emptyArray))(((foldr(function(_12_b_$u$636){
return function(_12_a_$u$637){
return ($$compiler$typer_jg$$f1(_12_a_$u$637))(_12_b_$u$636)}}))(((foldl(function(_12_r_$u$638){
return function(_12_v_$u$639){
return (($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))(_12_r_$u$638))(($$compiler$ast_jg$$TVar($$compiler$prelude_jg$$Empty))(_12_v_$u$639))}}))(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))(_12_dn_$u$630)))(_12_tvs_$u$631)))(_12_ts_$u$635)))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}}};
var $$compiler$typer_jg$$conTypes = function(_12_d_$u$625){
return (function(){
var $pm = _12_d_$u$625;return ($pm.$tag==$$compiler$ast_jg$$Data.$tag)?((function(_12___$u$626,_12_n_$u$627,_12_vs_$u$628,_12_cs_$u$629){
return (map(($$compiler$typer_jg$$conType(_12_n_$u$627))(_12_vs_$u$628)))(_12_cs_$u$629)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var $$compiler$typer_jg$$getTypedExports = function(_12_m_$u$640){
return (function(){
var $pm = _12_m_$u$640;return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_12___$u$641,_12___$u$642,_12___$u$643,_12_ts_$u$644,_12_cs_$u$645,_12_ins_$u$646,_12_ds_$u$647){
return (function(){
var _12_et_$u$648 = ($$compiler$prelude_jg$$concatMap($$compiler$typer_jg$$conTypes))(_12_ts_$u$644);var _12_ed_$u$649 = (map(function(_12_d_$u$651){
return ($$compiler$prelude_jg$$Pair($$compiler$prelude_jg$$fst(_12_d_$u$651)))($$compiler$ast_jg$$getType($$compiler$prelude_jg$$snd(_12_d_$u$651)))}))(_12_ds_$u$647);var _12_bs_$u$650 = ((foldl(function(_12_es_$u$652){
return function(_12_e_$u$653){
return ((set($$compiler$prelude_jg$$fst(_12_e_$u$653)))($$compiler$prelude_jg$$snd(_12_e_$u$653)))(_12_es_$u$652)}}))(empty))((concat(_12_et_$u$648))(_12_ed_$u$649));return (($$compiler$ast_jg$$ModuleInterface(_12_bs_$u$650))(_12_cs_$u$645))((map($$compiler$typer_jg$$instanceToTypeBound))(_12_ins_$u$646))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})()};
var $$compiler$typer_jg$$getSubs = function(_12_ctx_$u$73){
return (function(){
var $pm = _12_ctx_$u$73;return ($pm.$tag==$$compiler$typer_jg$$ICtx.$tag)?((function(_12_subs_$u$74,_12___$u$75,_12___$u$76,_12___$u$77){
return _12_subs_$u$74})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var $$compiler$typer_jg$$getSub = function(_12_v_$u$2){
return function(_12_subs_$u$3){
return (function(){
var $pm = _12_subs_$u$3;return ($pm.$tag==$$compiler$typer_jg$$Subs.$tag)?((function(_12_sat_$u$4,_12_unsat_$u$5){
return (($lt$pip$gt($instance$Alternative$6))(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$2))(_12_sat_$u$4)))(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$2))(_12_unsat_$u$5))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};
var $$compiler$typer_jg$$dropSubs = function(_12_vs_$u$52){
return function(_12_subs_$u$53){
return (function(){
var $pm = _12_subs_$u$53;return ($pm.$tag==$$compiler$typer_jg$$Subs.$tag)?((function(_12_sat_$u$54,_12_unsat_$u$55){
return ($$compiler$typer_jg$$Subs(((foldl(function(_12_r_$u$56){
return function(_12_v_$u$57){
return ((($$compiler$prelude_jg$$remove($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$57))(_12_r_$u$56)}}))(_12_sat_$u$54))(_12_vs_$u$52)))(((foldl(function(_12_r_$u$58){
return function(_12_v_$u$59){
return ((($$compiler$prelude_jg$$remove($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$59))(_12_r_$u$58)}}))(_12_unsat_$u$55))(_12_vs_$u$52))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};
var $$compiler$typer_jg$$applySubs = function(_12_subs_$u$201){
return function(_12_t_$u$202){
return (function(){
var $pm = _12_t_$u$202;return ($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_12_ann_$u$203,_12_vs_$u$204,_12_bs_$u$205,_12_t_$u$206){
return (function(){
var _12_subs2_$u$207 = ($$compiler$typer_jg$$dropSubs(_12_vs_$u$204))(_12_subs_$u$201);return ((($$compiler$typer_jg$$mkTForall(_12_ann_$u$203))(_12_vs_$u$204))((map($$compiler$typer_jg$$applySubsBound(_12_subs2_$u$207)))(_12_bs_$u$205)))(($$compiler$typer_jg$$applySubs(_12_subs2_$u$207))(_12_t_$u$206))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(($pm.$tag==$$compiler$ast_jg$$TVar.$tag)?((function(_12___$u$208,_12_v_$u$209){
return (function(){
var $pm = ($$compiler$typer_jg$$getSub(_12_v_$u$209))(_12_subs_$u$201);return ($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return _12_t_$u$202})()):(($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_12_subT_$u$210){
return _12_subT_$u$210})($pm.$0)):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TApp.$tag)?((function(_12_ann_$u$211,_12_f_$u$212,_12_a_$u$213){
return (($$compiler$ast_jg$$TApp(_12_ann_$u$211))(($$compiler$typer_jg$$applySubs(_12_subs_$u$201))(_12_f_$u$212)))(($$compiler$typer_jg$$applySubs(_12_subs_$u$201))(_12_a_$u$213))})($pm.$0,$pm.$1,$pm.$2)):((function(_12___$u$214){
return _12_t_$u$202})($pm))))})()}};
var $$compiler$typer_jg$$applySubsBound = function(_12_subs_$u$215){
return function(_12_b_$u$216){
return (function(){
var $pm = _12_b_$u$216;return ($pm.$tag==$$compiler$ast_jg$$TCBound.$tag)?((function(_12_ann_$u$217,_12_n_$u$218,_12_t_$u$219){
return (($$compiler$ast_jg$$TCBound(_12_ann_$u$217))(_12_n_$u$218))(($$compiler$typer_jg$$applySubs(_12_subs_$u$215))(_12_t_$u$219))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var $$compiler$typer_jg$$applySubsE = function(_12_subs_$u$457){
return function(_12_e_$u$458){
return (function(){
var _12_f_$u$459 = function(_12_a_$u$460){
return function(_12_e_$u$461){
return (function(){
var _12_t2_$u$462 = ($$compiler$typer_jg$$applySubs(_12_subs_$u$457))($$compiler$ast_jg$$getType(_12_e_$u$461));return ($$compiler$prelude_jg$$Pair(_12_a_$u$460))(($$compiler$ast_jg$$setType(_12_t2_$u$462))(_12_e_$u$461))})()}};return $$compiler$prelude_jg$$snd((($$compiler$ast_jg$$down(_12_f_$u$459))(true))(_12_e_$u$458))})()}};
var $$compiler$typer_jg$$applySubsDef = function(_12_d_$u$453){
return (function(){
var $pm = _12_d_$u$453;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_n_$u$454,_12_e_$u$455){
return (($gt$gt$eq($instance$Monad$11))($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$456){
return ($$compiler$prelude_jg$$$(ret($instance$Monad$11)))(($$compiler$prelude_jg$$Pair(_12_n_$u$454))(($$compiler$typer_jg$$applySubsE($$compiler$typer_jg$$getSubs(_12_ctx_$u$456)))(_12_e_$u$455)))})})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var $$compiler$typer_jg$$freeVars = function(_12_e_$u$463){
return (function(){
var _12_namesInPat_$u$466 = function(_12_p_$u$476){
return (function(){
var $pm = _12_p_$u$476;return ($pm.$tag==$$compiler$ast_jg$$PVar.$tag)?((function(_12___$u$477,_12_v_$u$478){
return $$compiler$prelude_jg$$arr1(_12_v_$u$478)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$PConst.$tag)?((function(_12___$u$479,_12_c_$u$480){
return emptyArray})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$PData.$tag)?((function(_12___$u$481,_12_n_$u$482,_12_ps_$u$483){
return ((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))(emptyArray))((map(_12_namesInPat_$u$466))(_12_ps_$u$483))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))))})()};var _12_freeVarsInPData_$u$465 = function(_12_p_$u$471){
return (function(){
var $pm = _12_p_$u$471;return ($pm.$tag==$$compiler$ast_jg$$PData.$tag)?((function(_12___$u$472,_12_n_$u$473,_12_ps_$u$474){
return ((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))($$compiler$prelude_jg$$arr1(_12_n_$u$473)))((map(_12_freeVarsInPData_$u$465))(_12_ps_$u$474))})($pm.$0,$pm.$1,$pm.$2)):((function(_12___$u$475){
return emptyArray})($pm))})()};var _12_freeVarsInPat_$u$464 = function(_12_p_$u$467){
return (function(){
var $pm = _12_p_$u$467;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_pat_$u$468,_12_e_$u$469){
return ((($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1))((filter(function(_12_v_$u$470){
return $$compiler$prelude_jg$$not((($$compiler$prelude_jg$$contains($instance$Eq$1))(_12_v_$u$470))(_12_namesInPat_$u$466(_12_pat_$u$468)))}))($$compiler$typer_jg$$freeVars(_12_e_$u$469))))(_12_freeVarsInPData_$u$465(_12_pat_$u$468))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return (function(){
var $pm = _12_e_$u$463;return ($pm.$tag==$$compiler$ast_jg$$Var.$tag)?((function(_12___$u$484,_12_v_$u$485){
return $$compiler$prelude_jg$$arr1(_12_v_$u$485)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$Const.$tag)?((function(_12___$u$486,_12_c_$u$487){
return emptyArray})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$App.$tag)?((function(_12___$u$488,_12_f_$u$489,_12_x_$u$490){
return ((($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1))($$compiler$typer_jg$$freeVars(_12_f_$u$489)))($$compiler$typer_jg$$freeVars(_12_x_$u$490))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_12___$u$491,_12_p_$u$492,_12_b_$u$493){
return (filter(function(_12_v_$u$494){
return (($$compiler$prelude_jg$$$div$eq($instance$Eq$1))(_12_v_$u$494))(_12_p_$u$492)}))($$compiler$typer_jg$$freeVars(_12_b_$u$493))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_12___$u$495,_12_e_$u$496,_12_ps_$u$497){
return ((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))($$compiler$typer_jg$$freeVars(_12_e_$u$496)))((map(_12_freeVarsInPat_$u$464))(_12_ps_$u$497))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_12___$u$498,_12_ds_$u$499,_12_e_$u$500){
return (filter(function(_12_v_$u$501){
return $$compiler$prelude_jg$$not((($$compiler$prelude_jg$$contains($instance$Eq$1))(_12_v_$u$501))((map($$compiler$prelude_jg$$fst))(_12_ds_$u$499)))}))(((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))($$compiler$typer_jg$$freeVars(_12_e_$u$500)))((map(function(_12_d_$u$502){
return $$compiler$typer_jg$$freeVars($$compiler$prelude_jg$$snd(_12_d_$u$502))}))(_12_ds_$u$499)))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))))})()})()};
var $$compiler$typer_jg$$newTVarM = (($gt$gt$eq($instance$Monad$11))($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$66){
return (function(){
var $pm = _12_ctx_$u$66;return ($pm.$tag==$$compiler$typer_jg$$ICtx.$tag)?((function(_12_subs_$u$67,_12_bs_$u$68,_12_i_$u$69,_12_e_$u$70){
return (function(){
var _12_n_$u$71 = ($concat("$"))(intToString(_12_i_$u$69));return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$sets(((($$compiler$typer_jg$$ICtx(_12_subs_$u$67))(_12_bs_$u$68))(_12_i_$u$69+1))(_12_e_$u$70))))((ret($instance$Monad$11))(($$compiler$ast_jg$$TVar($$compiler$prelude_jg$$Empty))(_12_n_$u$71)))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()});
var $$compiler$typer_jg$$errorM = function(_12_s_$u$101){
return (($gt$gt$eq($instance$Monad$11))($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$102){
return (function(){
var $pm = _12_ctx_$u$102;return ($pm.$tag==$$compiler$typer_jg$$ICtx.$tag)?((function(_12___$u$103,_12___$u$104,_12___$u$105,_12_e_$u$106){
return error(_12_e_$u$106(_12_s_$u$101))})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()})};
var $$compiler$typer_jg$$getSafe = function(_12_k_$u$0){
return function(_12_r_$u$1){
return (function(){
var $pm = (has(_12_k_$u$0))(_12_r_$u$1);return (!$pm)?((function(){
return error(($concat(($concat(($concat("no "))(_12_k_$u$0)))(" in record ")))(jsonStringify(_12_r_$u$1)))})()):($pm?((function(){
return (get(_12_k_$u$0))(_12_r_$u$1)})()):(error("pattern match fail")))})()}};
var $$compiler$typer_jg$$getBinding = function(_12_n_$u$122){
return function(_12_env_$u$123){
return (function(){
var $pm = _12_env_$u$123;return ($pm.$tag==$$compiler$typer_jg$$IEnv.$tag)?((function(_12_bs_$u$124,_12___$u$125,_12___$u$126){
return ($$compiler$typer_jg$$getSafe(_12_n_$u$122))(_12_bs_$u$124)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var $$compiler$typer_jg$$getBindingM = function(_12_n_$u$127){
return function(_12_env_$u$128){
return (($gt$gt$eq($instance$Monad$11))($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$129){
return ($$compiler$prelude_jg$$$(ret($instance$Monad$11)))(($$compiler$typer_jg$$applySubs($$compiler$typer_jg$$getSubs(_12_ctx_$u$129)))(($$compiler$typer_jg$$getBinding(_12_n_$u$127))(_12_env_$u$128)))})}};
var $$compiler$typer_jg$$getBindings = function(_12_env_$u$130){
return (function(){
var $pm = _12_env_$u$130;return ($pm.$tag==$$compiler$typer_jg$$IEnv.$tag)?((function(_12_bs_$u$131,_12___$u$132,_12___$u$133){
return _12_bs_$u$131})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var $$compiler$typer_jg$$hasBinding = function(_12_n_$u$134){
return function(_12_env_$u$135){
return (function(){
var $pm = _12_env_$u$135;return ($pm.$tag==$$compiler$typer_jg$$IEnv.$tag)?((function(_12_bs_$u$136,_12___$u$137,_12___$u$138){
return (has(_12_n_$u$134))(_12_bs_$u$136)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var $$compiler$typer_jg$$freeTVars = function(_12_t_$u$257){
return (function(){
var $pm = _12_t_$u$257;return ($pm.$tag==$$compiler$ast_jg$$TVar.$tag)?((function(_12___$u$258,_12_v_$u$259){
return ((($$compiler$prelude_jg$$setAdd($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$259))($$compiler$prelude_jg$$Empty)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TBot.$tag)?((function(){
return $$compiler$prelude_jg$$Empty})()):(($pm.$tag==$$compiler$ast_jg$$TUnknown.$tag)?((function(){
return $$compiler$prelude_jg$$Empty})()):(($pm.$tag==$$compiler$ast_jg$$TConst.$tag)?((function(_12___$u$260,_12_c_$u$261){
return $$compiler$prelude_jg$$Empty})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_12___$u$262,_12_vs_$u$263,_12_bs_$u$264,_12_t_$u$265){
return ((foldl(function(_12_s_$u$266){
return function(_12_v_$u$267){
return ((($$compiler$prelude_jg$$setRemove($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$267))(_12_s_$u$266)}}))(((foldl(($$compiler$prelude_jg$$setUnion($instance$Hashable$13))($instance$Eq$1)))($$compiler$typer_jg$$freeTVars(_12_t_$u$265)))((map($$compiler$typer_jg$$freeTVarsInBound))(_12_bs_$u$264))))(_12_vs_$u$263)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(($pm.$tag==$$compiler$ast_jg$$TApp.$tag)?((function(_12___$u$268,_12_f_$u$269,_12_a_$u$270){
return ((($$compiler$prelude_jg$$setUnion($instance$Hashable$13))($instance$Eq$1))($$compiler$typer_jg$$freeTVars(_12_f_$u$269)))($$compiler$typer_jg$$freeTVars(_12_a_$u$270))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))))})()};
var $$compiler$typer_jg$$freeTVarsInBound = function(_12_b_$u$271){
return (function(){
var $pm = _12_b_$u$271;return ($pm.$tag==$$compiler$ast_jg$$TCBound.$tag)?((function(_12___$u$272,_12___$u$273,_12_t_$u$274){
return $$compiler$typer_jg$$freeTVars(_12_t_$u$274)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var $$compiler$typer_jg$$addBinding = function(_12_n_$u$139){
return function(_12_t_$u$140){
return function(_12_env_$u$141){
return (function(){
var $pm = _12_env_$u$141;return ($pm.$tag==$$compiler$typer_jg$$IEnv.$tag)?((function(_12_bs_$u$142,_12_ts_$u$143,_12_fvs_$u$144){
return (($$compiler$typer_jg$$IEnv(((set(_12_n_$u$139))(_12_t_$u$140))(_12_bs_$u$142)))(_12_ts_$u$143))(((($$compiler$prelude_jg$$setUnion($instance$Hashable$13))($instance$Eq$1))(_12_fvs_$u$144))($$compiler$typer_jg$$freeTVars(_12_t_$u$140)))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}}};
var $$compiler$typer_jg$$addBindings = function(_12_nbs_$u$145){
return function(_12_env_$u$146){
return (function(){
var $pm = _12_env_$u$146;return ($pm.$tag==$$compiler$typer_jg$$IEnv.$tag)?((function(_12_bs_$u$147,_12_ts_$u$148,_12_fvs_$u$149){
return (($$compiler$typer_jg$$IEnv((merge(_12_bs_$u$147))(_12_nbs_$u$145)))(_12_ts_$u$148))(((foldRecord(function(_12_fvs_$u$150){
return function(_12___$u$151){
return function(_12_t_$u$152){
return ((($$compiler$prelude_jg$$setUnion($instance$Hashable$13))($instance$Eq$1))(_12_fvs_$u$150))($$compiler$typer_jg$$freeTVars(_12_t_$u$152))}}}))(_12_fvs_$u$149))(_12_nbs_$u$145))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var $$compiler$typer_jg$$emptySubs = ($$compiler$typer_jg$$Subs($$compiler$prelude_jg$$Empty))($$compiler$prelude_jg$$Empty);
var $$compiler$typer_jg$$composeSubs = function(_12_ef_$u$6){
return function(_12_sa_$u$7){
return function(_12_sb_$u$8){
return (function(){
var $pm = _12_sb_$u$8;return ($pm.$tag==$$compiler$typer_jg$$Subs.$tag)?((function(_12_sat_$u$9,_12_unsat_$u$10){
return (($$compiler$prelude_jg$$foldTrie(function(_12_r_$u$11){
return function(_12_v_$u$12){
return function(_12_t_$u$13){
return ((($$compiler$typer_jg$$addSub(_12_ef_$u$6))(_12_v_$u$12))(_12_t_$u$13))(_12_r_$u$11)}}}))((($$compiler$prelude_jg$$foldTrie(function(_12_r_$u$14){
return function(_12_v_$u$15){
return function(_12_t_$u$16){
return ((($$compiler$typer_jg$$addSatSub(_12_ef_$u$6))(_12_v_$u$15))(_12_t_$u$16))(_12_r_$u$14)}}}))(_12_sa_$u$7))(_12_sat_$u$9)))(_12_unsat_$u$10)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}};
var $$compiler$typer_jg$$addSub = function(_12_ef_$u$17){
return function(_12_v_$u$18){
return function(_12_t_$u$19){
return function(_12_subs_$u$20){
return (function(){
var _12_t2_$u$21 = ($$compiler$typer_jg$$applySubs(_12_subs_$u$20))(_12_t_$u$19);return (function(){
var $pm = ($$compiler$typer_jg$$getSub(_12_v_$u$18))(_12_subs_$u$20);return ($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return (function(){
var $pm = _12_subs_$u$20;return ($pm.$tag==$$compiler$typer_jg$$Subs.$tag)?((function(_12_sat_$u$22,_12_unsat_$u$23){
return (function(){
var _12_subUnsat_$u$24 = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_12_su_$u$28){
return function(_12_uv_$u$29){
return function(_12_ut_$u$30){
return (function(){
var $pm = _12_su_$u$28;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_sat_$u$31,_12_unsat_$u$32){
return (function(){
var _12_ut2_$u$33 = (($$compiler$typer_jg$$substitute(_12_v_$u$18))(_12_t2_$u$21))(_12_ut_$u$30);return (function(){
var $pm = $$compiler$prelude_jg$$isEmpty($$compiler$typer_jg$$freeTVars(_12_ut2_$u$33));return $pm?((function(){
return ($$compiler$prelude_jg$$Pair((((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_12_uv_$u$29))(_12_ut2_$u$33))(_12_sat_$u$31)))(_12_unsat_$u$32)})()):((!$pm)?((function(){
return ($$compiler$prelude_jg$$Pair(_12_sat_$u$31))((((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_12_uv_$u$29))(_12_ut2_$u$33))(_12_unsat_$u$32))})()):(error("pattern match fail")))})()})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}}}};var _12_su_$u$25 = (($$compiler$prelude_jg$$foldTrie((_12_subUnsat_$u$24($instance$Hashable$13))($instance$Eq$1)))(($$compiler$prelude_jg$$Pair(_12_sat_$u$22))($$compiler$prelude_jg$$Empty)))(_12_unsat_$u$23);var _12_unsat2_$u$27 = $$compiler$prelude_jg$$snd(_12_su_$u$25);var _12_sat2_$u$26 = $$compiler$prelude_jg$$fst(_12_su_$u$25);return (function(){
var $pm = $$compiler$prelude_jg$$isEmpty($$compiler$typer_jg$$freeTVars(_12_t2_$u$21));return $pm?((function(){
return ($$compiler$typer_jg$$Subs((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$18))(_12_t2_$u$21))(_12_sat2_$u$26)))(_12_unsat2_$u$27)})()):((!$pm)?((function(){
return ($$compiler$typer_jg$$Subs(_12_sat2_$u$26))((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$18))(_12_t2_$u$21))(_12_unsat2_$u$27))})()):(error("pattern match fail")))})()})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()):(($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_12_subT_$u$34){
return (($$compiler$typer_jg$$composeSubs(_12_ef_$u$17))(_12_subs_$u$20))((($$compiler$typer_jg$$unify(_12_ef_$u$17))(_12_subT_$u$34))(_12_t2_$u$21))})($pm.$0)):(error("pattern match fail")))})()})()}}}};
var $$compiler$typer_jg$$addSatSub = function(_12_ef_$u$35){
return function(_12_v_$u$36){
return function(_12_t_$u$37){
return function(_12_subs_$u$38){
return (function(){
var $pm = ($$compiler$typer_jg$$getSub(_12_v_$u$36))(_12_subs_$u$38);return ($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return (function(){
var $pm = _12_subs_$u$38;return ($pm.$tag==$$compiler$typer_jg$$Subs.$tag)?((function(_12_sat_$u$39,_12_unsat_$u$40){
return (function(){
var _12_subUnsat_$u$41 = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_12_su_$u$45){
return function(_12_uv_$u$46){
return function(_12_ut_$u$47){
return (function(){
var $pm = _12_su_$u$45;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_sat_$u$48,_12_unsat_$u$49){
return (function(){
var _12_ut2_$u$50 = (($$compiler$typer_jg$$substitute(_12_v_$u$36))(_12_t_$u$37))(_12_ut_$u$47);return (function(){
var $pm = $$compiler$prelude_jg$$isEmpty($$compiler$typer_jg$$freeTVars(_12_ut2_$u$50));return $pm?((function(){
return ($$compiler$prelude_jg$$Pair((((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_12_uv_$u$46))(_12_ut2_$u$50))(_12_sat_$u$48)))(_12_unsat_$u$49)})()):((!$pm)?((function(){
return ($$compiler$prelude_jg$$Pair(_12_sat_$u$48))((((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_12_uv_$u$46))(_12_ut2_$u$50))(_12_unsat_$u$49))})()):(error("pattern match fail")))})()})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}}}};var _12_su_$u$42 = (($$compiler$prelude_jg$$foldTrie((_12_subUnsat_$u$41($instance$Hashable$13))($instance$Eq$1)))(($$compiler$prelude_jg$$Pair(_12_sat_$u$39))($$compiler$prelude_jg$$Empty)))(_12_unsat_$u$40);var _12_unsat2_$u$44 = $$compiler$prelude_jg$$snd(_12_su_$u$42);var _12_sat2_$u$43 = $$compiler$prelude_jg$$fst(_12_su_$u$42);return ($$compiler$typer_jg$$Subs((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$36))(_12_t_$u$37))(_12_sat2_$u$43)))(_12_unsat2_$u$44)})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()):(($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_12_subT_$u$51){
return (($$compiler$typer_jg$$composeSubs(_12_ef_$u$35))(_12_subs_$u$38))((($$compiler$typer_jg$$unify(_12_ef_$u$35))(_12_subT_$u$51))(_12_t_$u$37))})($pm.$0)):(error("pattern match fail")))})()}}}};
var $$compiler$typer_jg$$substitute = function(_12_n_$u$197){
return function(_12_s_$u$198){
return function(_12_t_$u$199){
return ($$compiler$typer_jg$$applySubs(((($$compiler$typer_jg$$addSub(function(_12_s_$u$200){
return ($concat("substitute: "))(_12_s_$u$200)}))(_12_n_$u$197))(_12_s_$u$198))($$compiler$typer_jg$$emptySubs)))(_12_t_$u$199)}}};
var $$compiler$typer_jg$$unify = function(_12_ef_$u$224){
return function(_12_a_$u$225){
return function(_12_b_$u$226){
return (function(){
var _12_err_$u$228 = function(_12_a_$u$234){
return function(_12_b_$u$235){
return error(_12_ef_$u$224(($concat(($concat(($concat("cannot unify "))($$compiler$printer_jg$$printType(_12_a_$u$234))))(" with ")))($$compiler$printer_jg$$printType(_12_b_$u$235))))}};var _12_bind_$u$227 = function(_12_n_$u$229){
return function(_12_t_$u$230){
return (function(){
var $pm = _12_t_$u$230;return ($pm.$tag==$$compiler$ast_jg$$TVar.$tag)?((function(_12___$u$231,_12_m_$u$232){
return (function(){
var $pm = (($eq$eq($instance$Eq$1))(_12_n_$u$229))(_12_m_$u$232);return $pm?((function(){
return $$compiler$typer_jg$$emptySubs})()):((!$pm)?((function(){
return ((($$compiler$typer_jg$$addSub(_12_ef_$u$224))(_12_n_$u$229))(_12_t_$u$230))($$compiler$typer_jg$$emptySubs)})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):((function(_12___$u$233){
return (function(){
var $pm = ((($$compiler$prelude_jg$$setContains($instance$Hashable$13))($instance$Eq$1))(_12_n_$u$229))($$compiler$typer_jg$$freeTVars(_12_t_$u$230));return $pm?((function(){
return error(_12_ef_$u$224("occurs check failed"))})()):((!$pm)?((function(){
return ((($$compiler$typer_jg$$addSub(_12_ef_$u$224))(_12_n_$u$229))(_12_t_$u$230))($$compiler$typer_jg$$emptySubs)})()):(error("pattern match fail")))})()})($pm))})()}};return (function(){
var $pm = _12_a_$u$225;return ($pm.$tag==$$compiler$ast_jg$$TVar.$tag)?((function(_12___$u$236,_12_v_$u$237){
return (_12_bind_$u$227(_12_v_$u$237))(_12_b_$u$226)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TConst.$tag)?((function(_12___$u$238,_12_ca_$u$239){
return (function(){
var $pm = _12_b_$u$226;return ($pm.$tag==$$compiler$ast_jg$$TConst.$tag)?((function(_12___$u$240,_12_cb_$u$241){
return (function(){
var $pm = (($eq$eq($instance$Eq$1))(_12_ca_$u$239))(_12_cb_$u$241);return $pm?((function(){
return $$compiler$typer_jg$$emptySubs})()):((!$pm)?((function(){
return (_12_err_$u$228(_12_a_$u$225))(_12_b_$u$226)})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TVar.$tag)?((function(_12___$u$242,_12_v_$u$243){
return (_12_bind_$u$227(_12_v_$u$243))(_12_a_$u$225)})($pm.$0,$pm.$1)):((function(_12___$u$244){
return (_12_err_$u$228(_12_a_$u$225))(_12_b_$u$226)})($pm)))})()})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TUnknown.$tag)?((function(){
return (_12_err_$u$228(_12_a_$u$225))(_12_b_$u$226)})()):(($pm.$tag==$$compiler$ast_jg$$TBot.$tag)?((function(){
return (_12_err_$u$228(_12_a_$u$225))(_12_b_$u$226)})()):(($pm.$tag==$$compiler$ast_jg$$TApp.$tag)?((function(_12___$u$245,_12_fa_$u$246,_12_xa_$u$247){
return (function(){
var $pm = _12_b_$u$226;return ($pm.$tag==$$compiler$ast_jg$$TVar.$tag)?((function(_12___$u$248,_12_v_$u$249){
return (_12_bind_$u$227(_12_v_$u$249))(_12_a_$u$225)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TApp.$tag)?((function(_12___$u$250,_12_fb_$u$251,_12_xb_$u$252){
return (function(){
var _12_fsubs_$u$253 = (($$compiler$typer_jg$$unify(_12_ef_$u$224))(_12_fa_$u$246))(_12_fb_$u$251);var _12_xsubs_$u$254 = (($$compiler$typer_jg$$unify(_12_ef_$u$224))(($$compiler$typer_jg$$applySubs(_12_fsubs_$u$253))(_12_xa_$u$247)))(($$compiler$typer_jg$$applySubs(_12_fsubs_$u$253))(_12_xb_$u$252));return (($$compiler$typer_jg$$composeSubs(_12_ef_$u$224))(_12_fsubs_$u$253))(_12_xsubs_$u$254)})()})($pm.$0,$pm.$1,$pm.$2)):((function(_12___$u$255){
return (_12_err_$u$228(_12_a_$u$225))(_12_b_$u$226)})($pm)))})()})($pm.$0,$pm.$1,$pm.$2)):((function(_12___$u$256){
return (_12_err_$u$228(_12_a_$u$225))(_12_b_$u$226)})($pm))))))})()})()}}};
var $$compiler$typer_jg$$newTVar = function(_12_ctx_$u$60){
return (function(){
var $pm = _12_ctx_$u$60;return ($pm.$tag==$$compiler$typer_jg$$ICtx.$tag)?((function(_12_subs_$u$61,_12_bs_$u$62,_12_i_$u$63,_12_e_$u$64){
return (function(){
var _12_n_$u$65 = ($concat("$"))(intToString(_12_i_$u$63));return ($$compiler$prelude_jg$$Pair(((($$compiler$typer_jg$$ICtx(_12_subs_$u$61))(_12_bs_$u$62))(_12_i_$u$63+1))(_12_e_$u$64)))(($$compiler$ast_jg$$TVar($$compiler$prelude_jg$$Empty))(_12_n_$u$65))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var $$compiler$typer_jg$$addBound = function(_12_b_$u$84){
return function(_12_ctx_$u$85){
return (function(){
var $pm = _12_ctx_$u$85;return ($pm.$tag==$$compiler$typer_jg$$ICtx.$tag)?((function(_12_subs_$u$86,_12_bs_$u$87,_12_i_$u$88,_12_e_$u$89){
return ((($$compiler$typer_jg$$ICtx(_12_subs_$u$86))((push(_12_b_$u$84))(_12_bs_$u$87)))(_12_i_$u$88))(_12_e_$u$89)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}};
var $$compiler$typer_jg$$instantiate = function(_12_t_$u$175){
return (($gt$gt$eq($instance$Monad$11))($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$176){
return (function(){
var _12_mkvar_$u$177 = function(_12_cs_$u$178){
return function(_12_v_$u$179){
return (function(){
var $pm = _12_cs_$u$178;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_ctx_$u$180,_12_subs_$u$181){
return (function(){
var $pm = $$compiler$typer_jg$$newTVar(_12_ctx_$u$180);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_ctx2_$u$182,_12_tv_$u$183){
return ($$compiler$prelude_jg$$Pair(_12_ctx2_$u$182))(((($$compiler$typer_jg$$addSub(function(_12_s_$u$184){
return ($concat("instantiate: "))(_12_s_$u$184)}))(_12_v_$u$179))(_12_tv_$u$183))(_12_subs_$u$181))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};return (function(){
var $pm = _12_t_$u$175;return ($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_12___$u$185,_12_vs_$u$186,_12_bs_$u$187,_12_t_$u$188){
return (function(){
var $pm = ((foldl(_12_mkvar_$u$177))(($$compiler$prelude_jg$$Pair(_12_ctx_$u$176))($$compiler$typer_jg$$emptySubs)))(_12_vs_$u$186);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_ctx2_$u$189,_12_subs_$u$190){
return (function(){
var _12_bs2_$u$192 = (map($$compiler$typer_jg$$applySubsBound(_12_subs_$u$190)))(_12_bs_$u$187);var _12_ctx3_$u$193 = ((foldl(function(_12_ctx_$u$194){
return function(_12_b_$u$195){
return ($$compiler$typer_jg$$addBound(_12_b_$u$195))(_12_ctx_$u$194)}}))(_12_ctx2_$u$189))(_12_bs2_$u$192);var _12_t2_$u$191 = ($$compiler$typer_jg$$applySubs(_12_subs_$u$190))(_12_t_$u$188);return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$sets(_12_ctx3_$u$193)))((ret($instance$Monad$11))(_12_t2_$u$191))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):((function(_12___$u$196){
return (ret($instance$Monad$11))(_12_t_$u$175)})($pm))})()})()})};
var $$compiler$typer_jg$$setSubs = function(_12_subs_$u$78){
return function(_12_ctx_$u$79){
return (function(){
var $pm = _12_ctx_$u$79;return ($pm.$tag==$$compiler$typer_jg$$ICtx.$tag)?((function(_12___$u$80,_12_bs_$u$81,_12_i_$u$82,_12_e_$u$83){
return ((($$compiler$typer_jg$$ICtx(_12_subs_$u$78))((map($$compiler$typer_jg$$applySubsBound(_12_subs_$u$78)))(_12_bs_$u$81)))(_12_i_$u$82))(_12_e_$u$83)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}};
var $$compiler$typer_jg$$getErrorF = (($gt$gt$eq($instance$Monad$11))($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$117){
return (function(){
var $pm = _12_ctx_$u$117;return ($pm.$tag==$$compiler$typer_jg$$ICtx.$tag)?((function(_12___$u$118,_12___$u$119,_12___$u$120,_12_e_$u$121){
return (ret($instance$Monad$11))(_12_e_$u$121)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()});
var $$compiler$typer_jg$$unifyM = function(_12_a_$u$220){
return function(_12_b_$u$221){
return (($gt$gt$eq($instance$Monad$11))($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$222){
return (($gt$gt$eq($instance$Monad$11))($$compiler$typer_jg$$getErrorF))(function(_12_ef_$u$223){
return $$compiler$prelude_jg$$sets(($$compiler$typer_jg$$setSubs((($$compiler$typer_jg$$composeSubs(_12_ef_$u$223))($$compiler$typer_jg$$getSubs(_12_ctx_$u$222)))((($$compiler$typer_jg$$unify(_12_ef_$u$223))(_12_a_$u$220))(_12_b_$u$221))))(_12_ctx_$u$222))})})}};
var $$compiler$typer_jg$$onError = function(_12_e_$u$107){
return (($gt$gt$eq($instance$Monad$11))($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$108){
return (function(){
var $pm = _12_ctx_$u$108;return ($pm.$tag==$$compiler$typer_jg$$ICtx.$tag)?((function(_12_subs_$u$109,_12_bs_$u$110,_12_i_$u$111,_12___$u$112){
return $$compiler$prelude_jg$$sets(((($$compiler$typer_jg$$ICtx(_12_subs_$u$109))(_12_bs_$u$110))(_12_i_$u$111))(_12_e_$u$107))})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()})};
var $$compiler$typer_jg$$withError = function(_12_e_$u$113){
return function(_12_f_$u$114){
return (($gt$gt$eq($instance$Monad$11))($$compiler$typer_jg$$getErrorF))(function(_12_old_$u$115){
return (($gt$gt$eq($instance$Monad$11))((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$typer_jg$$onError(_12_e_$u$113)))(_12_f_$u$114)))(function(_12_r_$u$116){
return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$typer_jg$$onError(_12_old_$u$115)))((ret($instance$Monad$11))(_12_r_$u$116))})})}};
var $$compiler$typer_jg$$withLocError = function(_12_e_$u$275){
return function(_12_f_$u$276){
return (function(){
var $pm = $$compiler$ast_jg$$getAnnCodeLoc($$compiler$ast_jg$$annOf(_12_e_$u$275));return ($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return _12_f_$u$276})()):(($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_12_loc_$u$277){
return ($$compiler$typer_jg$$withError(function(_12_s_$u$278){
return ($concat(($concat(_12_s_$u$278))(" ")))($$compiler$ast_jg$$printCodeLoc(_12_loc_$u$277))}))(_12_f_$u$276)})($pm.$0)):(error("pattern match fail")))})()}};
var $$compiler$typer_jg$$unrollDataConType = function(_12_t_$u$444){
return (function(){
var $pm = _12_t_$u$444;return (($pm.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$pm.$1.$1.$1))))?((function(_12___$u$445,_12___$u$446,_12___$u$447,_12_a_$u$448,_12_b_$u$449){
return (function(){
var $pm = $$compiler$typer_jg$$unrollDataConType(_12_b_$u$449);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_ps_$u$450,_12_t_$u$451){
return ($$compiler$prelude_jg$$Pair((enqueue(_12_a_$u$448))(_12_ps_$u$450)))(_12_t_$u$451)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):((function(_12___$u$452){
return ($$compiler$prelude_jg$$Pair(emptyArray))(_12_t_$u$444)})($pm))})()};
var $$compiler$typer_jg$$getBounds = function(_12_ctx_$u$90){
return (function(){
var $pm = _12_ctx_$u$90;return ($pm.$tag==$$compiler$typer_jg$$ICtx.$tag)?((function(_12___$u$91,_12_bs_$u$92,_12___$u$93,_12___$u$94){
return _12_bs_$u$92})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var $$compiler$typer_jg$$setBounds = function(_12_bs_$u$95){
return function(_12_ctx_$u$96){
return (function(){
var $pm = _12_ctx_$u$96;return ($pm.$tag==$$compiler$typer_jg$$ICtx.$tag)?((function(_12_subs_$u$97,_12___$u$98,_12_i_$u$99,_12_e_$u$100){
return ((($$compiler$typer_jg$$ICtx(_12_subs_$u$97))(_12_bs_$u$95))(_12_i_$u$99))(_12_e_$u$100)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}};
var $$compiler$typer_jg$$freeTVarsInEnv = function(_12_env_$u$153){
return (function(){
var $pm = _12_env_$u$153;return ($pm.$tag==$$compiler$typer_jg$$IEnv.$tag)?((function(_12___$u$154,_12___$u$155,_12_fvs_$u$156){
return _12_fvs_$u$156})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var $$compiler$typer_jg$$generalize = function(_12_env_$u$412){
return function(_12_t_$u$413){
return (($gt$gt$eq($instance$Monad$11))($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$414){
return (function(){
var _12_subs_$u$415 = $$compiler$typer_jg$$getSubs(_12_ctx_$u$414);var _12_envTVars_$u$416 = $$compiler$typer_jg$$freeTVarsInEnv(_12_env_$u$412);var _12_nonFree_$u$417 = (function(){
var $pm = _12_subs_$u$415;return ($pm.$tag==$$compiler$typer_jg$$Subs.$tag)?((function(_12___$u$421,_12_unsat_$u$422){
return (($$compiler$prelude_jg$$foldTrie(function(_12_s_$u$423){
return function(_12_v_$u$424){
return function(_12___$u$425){
return ((($$compiler$prelude_jg$$setUnion($instance$Hashable$13))($instance$Eq$1))(_12_s_$u$423))(($$compiler$prelude_jg$$justOr($$compiler$prelude_jg$$Empty))(((fmap($instance$Functor$4))($$compiler$typer_jg$$freeTVars))(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$424))(_12_unsat_$u$422))))}}}))(_12_envTVars_$u$416))(_12_envTVars_$u$416)})($pm.$0,$pm.$1)):(error("pattern match fail"))})();var _12_vs_$u$418 = ((($$compiler$prelude_jg$$setDiff($instance$Hashable$13))($instance$Eq$1))($$compiler$typer_jg$$freeTVars(_12_t_$u$413)))(_12_nonFree_$u$417);var _12_processBounds_$u$420 = function(_12_vbb_$u$426){
return function(_12_b_$u$427){
return (function(){
var $pm = _12_vbb_$u$426;return (($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)&&($pm.$1.$tag==$$compiler$prelude_jg$$Pair.$tag))?((function(_12_bvs_$u$428,_12_rbs_$u$429,_12_obs_$u$430){
return (function(){
var _12_boundVars_$u$431 = $$compiler$typer_jg$$freeTVarsInBound(_12_b_$u$427);var _12_sharedVars_$u$432 = ((($$compiler$prelude_jg$$setIntersection($instance$Hashable$13))($instance$Eq$1))(_12_boundVars_$u$431))(_12_vs_$u$418);return (function(){
var $pm = $$compiler$prelude_jg$$isEmpty(_12_sharedVars_$u$432);return $pm?((function(){
return ($$compiler$prelude_jg$$Pair(_12_bvs_$u$428))(($$compiler$prelude_jg$$Pair(_12_rbs_$u$429))((push(_12_b_$u$427))(_12_obs_$u$430)))})()):((!$pm)?((function(){
return (function(){
var $pm = (($eq$eq($instance$Eq$0))($$compiler$prelude_jg$$size(_12_sharedVars_$u$432)))($$compiler$prelude_jg$$size(_12_boundVars_$u$431));return $pm?((function(){
return ($$compiler$prelude_jg$$Pair(_12_bvs_$u$428))(($$compiler$prelude_jg$$Pair((push(_12_b_$u$427))(_12_rbs_$u$429)))(_12_obs_$u$430))})()):((!$pm)?((function(){
return ($$compiler$prelude_jg$$Pair(((($$compiler$prelude_jg$$setUnion($instance$Hashable$13))($instance$Eq$1))(_12_bvs_$u$428))(_12_sharedVars_$u$432)))(($$compiler$prelude_jg$$Pair(_12_rbs_$u$429))((push(_12_b_$u$427))(_12_obs_$u$430)))})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()})()})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()}};var _12_vbb_$u$419 = ((foldl(_12_processBounds_$u$420))(($$compiler$prelude_jg$$Pair($$compiler$prelude_jg$$Empty))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray))))($$compiler$typer_jg$$getBounds(_12_ctx_$u$414));return (function(){
var $pm = _12_vbb_$u$419;return (($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)&&($pm.$1.$tag==$$compiler$prelude_jg$$Pair.$tag))?((function(_12_bvs_$u$433,_12_rbs_$u$434,_12_obs_$u$435){
return (function(){
var _12_finalVars_$u$436 = ((($$compiler$prelude_jg$$setDiff($instance$Hashable$13))($instance$Eq$1))(_12_vs_$u$418))(_12_bvs_$u$433);var _12_drop_$u$437 = function(local$instance$Hashable$1){
return function(local$instance$Eq$0){
return function(_12_r_$u$439){
return function(_12_v_$u$440){
return function(_12_t_$u$441){
return (function(){
var $pm = ($$compiler$prelude_jg$$$($$compiler$prelude_jg$$isEmpty))(((($$compiler$prelude_jg$$setIntersection($instance$Hashable$13))($instance$Eq$1))(_12_finalVars_$u$436))($$compiler$typer_jg$$freeTVars(_12_t_$u$441)));return $pm?((function(){
return (((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_12_v_$u$440))(_12_t_$u$441))(_12_r_$u$439)})()):((!$pm)?((function(){
return _12_r_$u$439})()):(error("pattern match fail")))})()}}}}};var _12_subs2_$u$438 = (function(){
var $pm = _12_subs_$u$415;return ($pm.$tag==$$compiler$typer_jg$$Subs.$tag)?((function(_12_sat_$u$442,_12_unsat_$u$443){
return ($$compiler$typer_jg$$Subs(_12_sat_$u$442))((($$compiler$prelude_jg$$foldTrie((_12_drop_$u$437($instance$Hashable$13))($instance$Eq$1)))($$compiler$prelude_jg$$Empty))(_12_unsat_$u$443))})($pm.$0,$pm.$1)):(error("pattern match fail"))})();return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$sets(($$compiler$typer_jg$$setBounds(_12_obs_$u$435))(($$compiler$typer_jg$$setSubs(_12_subs2_$u$438))(_12_ctx_$u$414)))))((function(){
var $pm = ($or(($$compiler$prelude_jg$$$($$compiler$prelude_jg$$not))($$compiler$prelude_jg$$isEmpty(_12_finalVars_$u$436))))((($$compiler$prelude_jg$$$gt($instance$Ord$2))(length(_12_rbs_$u$434)))(0));return $pm?((function(){
return ($$compiler$prelude_jg$$$(ret($instance$Monad$11)))(((($$compiler$typer_jg$$mkTForall($$compiler$prelude_jg$$Empty))($$compiler$prelude_jg$$setToArray(_12_finalVars_$u$436)))(_12_rbs_$u$434))(_12_t_$u$413))})()):((!$pm)?((function(){
return (ret($instance$Monad$11))(_12_t_$u$413)})()):(error("pattern match fail")))})())})()})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()})()})}};
var $$compiler$typer_jg$$getInstances = function(_12_env_$u$162){
return (function(){
var $pm = _12_env_$u$162;return ($pm.$tag==$$compiler$typer_jg$$IEnv.$tag)?((function(_12___$u$163,_12_ts_$u$164,_12___$u$165){
return _12_ts_$u$164})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var $$compiler$typer_jg$$satisfies = function(_12_a_$u$654){
return function(_12_b_$u$655){
return (function(){
var $pm = _12_a_$u$654;return ($pm.$tag==$$compiler$ast_jg$$TVar.$tag)?((function(_12___$u$656,_12___$u$657){
return true})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TConst.$tag)?((function(_12___$u$658,_12_c_$u$659){
return (function(){
var $pm = _12_b_$u$655;return ($pm.$tag==$$compiler$ast_jg$$TConst.$tag)?((function(_12___$u$660,_12_c2_$u$661){
return (($eq$eq($instance$Eq$1))(_12_c_$u$659))(_12_c2_$u$661)})($pm.$0,$pm.$1)):((function(_12___$u$662){
return false})($pm))})()})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$TApp.$tag)?((function(_12___$u$663,_12_fa_$u$664,_12_xa_$u$665){
return (function(){
var $pm = _12_b_$u$655;return ($pm.$tag==$$compiler$ast_jg$$TApp.$tag)?((function(_12___$u$666,_12_fb_$u$667,_12_xb_$u$668){
return ($and(($$compiler$typer_jg$$satisfies(_12_fa_$u$664))(_12_fb_$u$667)))(($$compiler$typer_jg$$satisfies(_12_xa_$u$665))(_12_xb_$u$668))})($pm.$0,$pm.$1,$pm.$2)):((function(_12___$u$669){
return false})($pm))})()})($pm.$0,$pm.$1,$pm.$2)):((function(_12___$u$670){
return error(($concat("unexpected type in satisfies "))($$compiler$printer_jg$$printType(_12_a_$u$654)))})($pm))))})()}};
var $$compiler$typer_jg$$satisfiesBound = function(_12_a_$u$671){
return function(_12_b_$u$672){
return (function(){
var $pm = _12_a_$u$671;return ($pm.$tag==$$compiler$ast_jg$$TCBound.$tag)?((function(_12___$u$673,_12_na_$u$674,_12_ta_$u$675){
return (function(){
var $pm = _12_b_$u$672;return ($pm.$tag==$$compiler$ast_jg$$TCBound.$tag)?((function(_12___$u$676,_12_nb_$u$677,_12_tb_$u$678){
return ($and((($eq$eq($instance$Eq$1))(_12_na_$u$674))(_12_nb_$u$677)))(($$compiler$typer_jg$$satisfies(_12_ta_$u$675))(_12_tb_$u$678))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var $$compiler$typer_jg$$dropSatisfiedBounds = function(_12_env_$u$389){
return (($gt$gt$eq($instance$Monad$11))($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$390){
return (function(){
var _12_is_$u$391 = $$compiler$typer_jg$$getInstances(_12_env_$u$389);var _12_bs_$u$392 = $$compiler$typer_jg$$getBounds(_12_ctx_$u$390);var _12_bs2_$u$393 = (filter(function(_12_b_$u$394){
return $$compiler$prelude_jg$$not(($$compiler$prelude_jg$$exists(function(_12_i_$u$395){
return ($$compiler$typer_jg$$satisfiesBound(_12_i_$u$395))(_12_b_$u$394)}))(_12_is_$u$391))}))(_12_bs_$u$392);return $$compiler$prelude_jg$$sets(($$compiler$typer_jg$$setBounds(_12_bs2_$u$393))(_12_ctx_$u$390))})()})};
var $$compiler$typer_jg$$infer = function(_12_env_$u$279){
return function(_12_e_$u$280){
return (function(){
var _12_inferPat_$u$283 = function(_12_env_$u$297){
return function(_12_te_$u$298){
return function(_12_pat_$u$299){
return (function(){
var $pm = _12_pat_$u$299;return ($pm.$tag==$$compiler$ast_jg$$PVar.$tag)?((function(_12_ann_$u$300,_12_v_$u$301){
return (($gt$gt$eq($instance$Monad$11))($$compiler$typer_jg$$newTVarM))(function(_12_tv_$u$302){
return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($$compiler$typer_jg$$unifyM(_12_te_$u$298))(_12_tv_$u$302)))((ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair(((set(_12_v_$u$301))(_12_tv_$u$302))(empty)))(($$compiler$ast_jg$$PVar(($$compiler$ast_jg$$setAnnType(_12_tv_$u$302))(_12_ann_$u$300)))(_12_v_$u$301))))})})($pm.$0,$pm.$1)):((($pm.$tag==$$compiler$ast_jg$$PConst.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$CNum.$tag))?((function(_12___$u$303,_12_n_$u$304){
return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($$compiler$typer_jg$$unifyM(_12_te_$u$298))(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("Number"))))((ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair(empty))(_12_pat_$u$299)))})($pm.$0,$pm.$1.$0)):((($pm.$tag==$$compiler$ast_jg$$PConst.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$CStr.$tag))?((function(_12___$u$305,_12_s_$u$306){
return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($$compiler$typer_jg$$unifyM(_12_te_$u$298))(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("String"))))((ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair(empty))(_12_pat_$u$299)))})($pm.$0,$pm.$1.$0)):(($pm.$tag==$$compiler$ast_jg$$PData.$tag)?((function(_12_ann_$u$307,_12_n_$u$308,_12_ps_$u$309){
return (function(){
var $pm = ($$compiler$typer_jg$$hasBinding(_12_n_$u$308))(_12_env_$u$297);return (!$pm)?((function(){
return error(($concat("unknown data type "))(_12_n_$u$308))})()):($pm?((function(){
return (($gt$gt$eq($instance$Monad$11))((($gt$gt$eq($instance$Monad$11))(($$compiler$typer_jg$$getBindingM(_12_n_$u$308))(_12_env_$u$297)))($$compiler$typer_jg$$instantiate)))(function(_12_t_$u$310){
return (function(){
var $pm = $$compiler$typer_jg$$unrollDataConType(_12_t_$u$310);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_tps_$u$311,_12_dt_$u$312){
return (function(){
var $pm = (($eq$eq($instance$Eq$0))(length(_12_ps_$u$309)))(length(_12_tps_$u$311));return (!$pm)?((function(){
return $$compiler$typer_jg$$errorM("number of pattern params does not match the number of constructor params")})()):($pm?((function(){
return (($gt$gt$eq($instance$Monad$11))(((($$compiler$prelude_jg$$foldM($instance$Monad$11))(_12_inferSubPat_$u$284(_12_env_$u$297)))(($$compiler$prelude_jg$$Pair(empty))(emptyArray)))(($$compiler$prelude_jg$$zip(_12_ps_$u$309))(_12_tps_$u$311))))(function(_12_bps_$u$313){
return (function(){
var $pm = _12_bps_$u$313;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_bs_$u$314,_12_ps_$u$315){
return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($$compiler$typer_jg$$unifyM(_12_te_$u$298))(_12_dt_$u$312)))(($$compiler$prelude_jg$$$(ret($instance$Monad$11)))(($$compiler$prelude_jg$$Pair(_12_bs_$u$314))((($$compiler$ast_jg$$PData(_12_ann_$u$307))(_12_n_$u$308))(_12_ps_$u$315))))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))})()}}};var _12_inferSubPat_$u$284 = function(_12_env_$u$316){
return function(_12_bp_$u$317){
return function(_12_pt_$u$318){
return (function(){
var $pm = _12_bp_$u$317;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_bs_$u$319,_12_ps_$u$320){
return (function(){
var $pm = _12_pt_$u$318;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_pat_$u$321,_12_t_$u$322){
return (($gt$gt$eq($instance$Monad$11))(((_12_inferPat_$u$283(_12_env_$u$316))(_12_t_$u$322))(_12_pat_$u$321)))(function(_12_bp_$u$323){
return (function(){
var $pm = _12_bp_$u$323;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_bs2_$u$324,_12_pat_$u$325){
return ($$compiler$prelude_jg$$$(ret($instance$Monad$11)))(($$compiler$prelude_jg$$Pair((merge(_12_bs_$u$319))(_12_bs2_$u$324)))((push(_12_pat_$u$325))(_12_ps_$u$320)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}};var _12_inferCase_$u$282 = function(_12_env_$u$288){
return function(_12_te_$u$289){
return function(_12_p_$u$290){
return (function(){
var $pm = _12_p_$u$290;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_pat_$u$291,_12_e_$u$292){
return (($gt$gt$eq($instance$Monad$11))(((_12_inferPat_$u$283(_12_env_$u$288))(_12_te_$u$289))(_12_pat_$u$291)))(function(_12_cb_$u$293){
return (function(){
var $pm = _12_cb_$u$293;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_bs_$u$294,_12_pat_$u$295){
return (($gt$gt$eq($instance$Monad$11))(($$compiler$typer_jg$$infer(($$compiler$typer_jg$$addBindings(_12_bs_$u$294))(_12_env_$u$288)))(_12_e_$u$292)))(function(_12_e_$u$296){
return (ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair(_12_pat_$u$295))(_12_e_$u$296))})})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}};var _12_setFinalType_$u$281 = function(_12_t_$u$285){
return function(_12_e_$u$286){
return (function(){
var $pm = $$compiler$ast_jg$$getType(_12_e_$u$286);return ($pm.$tag==$$compiler$ast_jg$$TUnknown.$tag)?((function(){
return (ret($instance$Monad$11))(($$compiler$ast_jg$$setType(_12_t_$u$285))(_12_e_$u$286))})()):((function(_12_te_$u$287){
return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($$compiler$typer_jg$$unifyM(_12_t_$u$285))(_12_te_$u$287)))((ret($instance$Monad$11))(_12_e_$u$286))})($pm))})()}};return ($$compiler$prelude_jg$$$($$compiler$typer_jg$$withLocError(_12_e_$u$280)))((function(){
var $pm = _12_e_$u$280;return (($pm.$tag==$$compiler$ast_jg$$Const.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$CNum.$tag))?((function(_12___$u$326,_12_n_$u$327){
return (_12_setFinalType_$u$281(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("Number")))(_12_e_$u$280)})($pm.$0,$pm.$1.$0)):((($pm.$tag==$$compiler$ast_jg$$Const.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$CStr.$tag))?((function(_12___$u$328,_12_s_$u$329){
return (_12_setFinalType_$u$281(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("String")))(_12_e_$u$280)})($pm.$0,$pm.$1.$0)):(($pm.$tag==$$compiler$ast_jg$$Var.$tag)?((function(_12___$u$330,_12_v_$u$331){
return (function(){
var $pm = ($$compiler$typer_jg$$hasBinding(_12_v_$u$331))(_12_env_$u$279);return (!$pm)?((function(){
return $$compiler$typer_jg$$errorM(($concat(($concat(($concat("unknown identifier "))(_12_v_$u$331)))(", env: ")))(jsonStringify(($$compiler$prelude_jg$$$(keys))($$compiler$typer_jg$$getBindings(_12_env_$u$279)))))})()):($pm?((function(){
return (($gt$gt$eq($instance$Monad$11))((($gt$gt$eq($instance$Monad$11))(($$compiler$typer_jg$$getBindingM(_12_v_$u$331))(_12_env_$u$279)))($$compiler$typer_jg$$instantiate)))(function(_12_t_$u$332){
return (_12_setFinalType_$u$281(_12_t_$u$332))(_12_e_$u$280)})})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_12_ann_$u$333,_12_p_$u$334,_12_a_$u$335){
return (($gt$gt$eq($instance$Monad$11))($$compiler$typer_jg$$newTVarM))(function(_12_tv_$u$336){
return (($gt$gt$eq($instance$Monad$11))(($$compiler$typer_jg$$infer((($$compiler$typer_jg$$addBinding(_12_p_$u$334))(_12_tv_$u$336))(_12_env_$u$279)))(_12_a_$u$335)))(function(_12_a_$u$337){
return (_12_setFinalType_$u$281((($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))((($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("->")))(_12_tv_$u$336)))($$compiler$ast_jg$$getType(_12_a_$u$337))))((($$compiler$ast_jg$$Lam(_12_ann_$u$333))(_12_p_$u$334))(_12_a_$u$337))})})})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$App.$tag)?((function(_12_ann_$u$338,_12_f_$u$339,_12_a_$u$340){
return (($gt$gt$eq($instance$Monad$11))($$compiler$typer_jg$$newTVarM))(function(_12_tv_$u$341){
return (($gt$gt$eq($instance$Monad$11))(($$compiler$typer_jg$$infer(_12_env_$u$279))(_12_f_$u$339)))(function(_12_f_$u$342){
return (($gt$gt$eq($instance$Monad$11))(($$compiler$typer_jg$$infer(_12_env_$u$279))(_12_a_$u$340)))(function(_12_a_$u$343){
return (function(){
var _12_synth_$u$344 = ($$compiler$typer_jg$$f1($$compiler$ast_jg$$getType(_12_a_$u$343)))(_12_tv_$u$341);return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($$compiler$typer_jg$$unifyM($$compiler$ast_jg$$getType(_12_f_$u$342)))(_12_synth_$u$344)))((_12_setFinalType_$u$281(_12_tv_$u$341))((($$compiler$ast_jg$$App(_12_ann_$u$338))(_12_f_$u$342))(_12_a_$u$343)))})()})})})})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_12_ann_$u$345,_12_e_$u$346,_12_ps_$u$347){
return (($gt$gt$eq($instance$Monad$11))(($$compiler$typer_jg$$infer(_12_env_$u$279))(_12_e_$u$346)))(function(_12_e_$u$348){
return (($gt$gt$eq($instance$Monad$11))((($$compiler$prelude_jg$$mapM($instance$Monad$11))((_12_inferCase_$u$282(_12_env_$u$279))($$compiler$ast_jg$$getType(_12_e_$u$348))))(_12_ps_$u$347)))(function(_12_ps_$u$349){
return (function(){
var _12_t_$u$350 = $$compiler$ast_jg$$getType($$compiler$prelude_jg$$snd($$compiler$prelude_jg$$head(_12_ps_$u$349)));return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))((($$compiler$prelude_jg$$mapM($instance$Monad$11))(function(_12_p_$u$351){
return ($$compiler$typer_jg$$unifyM(_12_t_$u$350))(($$compiler$prelude_jg$$$($$compiler$ast_jg$$getType))($$compiler$prelude_jg$$snd(_12_p_$u$351)))}))($$compiler$prelude_jg$$tail(_12_ps_$u$349))))((_12_setFinalType_$u$281(_12_t_$u$350))((($$compiler$ast_jg$$Case(_12_ann_$u$345))(_12_e_$u$348))(_12_ps_$u$349)))})()})})})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_12_ann_$u$352,_12_ds_$u$353,_12_e_$u$354){
return (($gt$gt$eq($instance$Monad$11))(($$compiler$typer_jg$$inferDefs(_12_env_$u$279))(_12_ds_$u$353)))(function(_12_ds_$u$355){
return (function(){
var _12_env2_$u$356 = ((foldl(function(_12_env_$u$357){
return function(_12_d_$u$358){
return (function(){
var $pm = _12_d_$u$358;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_n_$u$359,_12_e_$u$360){
return (($$compiler$typer_jg$$addBinding(_12_n_$u$359))($$compiler$ast_jg$$getType(_12_e_$u$360)))(_12_env_$u$357)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(_12_env_$u$279))(_12_ds_$u$355);return (($gt$gt$eq($instance$Monad$11))(($$compiler$typer_jg$$infer(_12_env2_$u$356))(_12_e_$u$354)))(function(_12_e_$u$361){
return (_12_setFinalType_$u$281($$compiler$ast_jg$$getType(_12_e_$u$361)))((($$compiler$ast_jg$$Let(_12_ann_$u$352))(_12_ds_$u$355))(_12_e_$u$361))})})()})})($pm.$0,$pm.$1,$pm.$2)):((function(_12___$u$362){
return error("type inference not supported for this AST node")})($pm))))))))})())})()}};
var $$compiler$typer_jg$$inferSccDefs = function(_12_env_$u$363){
return function(_12_ds_$u$364){
return (function(){
var _12_generalizeDef_$u$368 = function(_12_env_$u$381){
return function(_12_d_$u$382){
return (function(){
var $pm = _12_d_$u$382;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_n_$u$383,_12_e_$u$384){
return (($gt$gt$eq($instance$Monad$11))(($$compiler$typer_jg$$generalize(_12_env_$u$381))($$compiler$ast_jg$$getType(_12_e_$u$384))))(function(_12_t_$u$385){
return (ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair(_12_n_$u$383))(($$compiler$ast_jg$$setType(_12_t_$u$385))(_12_e_$u$384)))})})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};var _12_unifyDef_$u$367 = function(_12_env_$u$377){
return function(_12_d_$u$378){
return (function(){
var $pm = _12_d_$u$378;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_n_$u$379,_12_e_$u$380){
return ($$compiler$typer_jg$$unifyM($$compiler$ast_jg$$getType(_12_e_$u$380)))(($$compiler$typer_jg$$getBinding(_12_n_$u$379))(_12_env_$u$377))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};var _12_inferDef_$u$366 = function(_12_env_$u$372){
return function(_12_d_$u$373){
return (function(){
var $pm = _12_d_$u$373;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_n_$u$374,_12_e_$u$375){
return (($gt$gt$eq($instance$Monad$11))(($$compiler$typer_jg$$infer(_12_env_$u$372))(_12_e_$u$375)))(function(_12_e_$u$376){
return (ret($instance$Monad$11))(($$compiler$prelude_jg$$Pair(_12_n_$u$374))(_12_e_$u$376))})})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};var _12_generateTVar_$u$365 = function(_12_env_$u$369){
return function(_12_d_$u$370){
return (($gt$gt$eq($instance$Monad$11))($$compiler$typer_jg$$newTVarM))(function(_12_tv_$u$371){
return (ret($instance$Monad$11))((($$compiler$typer_jg$$addBinding($$compiler$prelude_jg$$fst(_12_d_$u$370)))(_12_tv_$u$371))(_12_env_$u$369))})}};return (($gt$gt$eq($instance$Monad$11))(((($$compiler$prelude_jg$$foldM($instance$Monad$11))(_12_generateTVar_$u$365))(_12_env_$u$363))(_12_ds_$u$364)))(function(_12_env2_$u$386){
return (($gt$gt$eq($instance$Monad$11))((($$compiler$prelude_jg$$mapM($instance$Monad$11))(_12_inferDef_$u$366(_12_env2_$u$386)))(_12_ds_$u$364)))(function(_12_ds2_$u$387){
return (($gt$gt$eq($instance$Monad$11))((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))((($$compiler$prelude_jg$$mapM($instance$Monad$11))(_12_unifyDef_$u$367(_12_env2_$u$386)))(_12_ds2_$u$387)))((($$compiler$prelude_jg$$mapM($instance$Monad$11))($$compiler$typer_jg$$applySubsDef))(_12_ds2_$u$387))))(function(_12_ds3_$u$388){
return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$typer_jg$$dropSatisfiedBounds(_12_env_$u$363)))((($$compiler$prelude_jg$$mapM($instance$Monad$11))(_12_generalizeDef_$u$368(_12_env_$u$363)))(_12_ds3_$u$388))})})})})()}};
var $$compiler$typer_jg$$inferDefs = function(_12_env_$u$396){
return function(_12_ds_$u$397){
return (function(){
var _12_infer_$u$401 = function(_12_rs_$u$407){
return function(_12_cc_$u$408){
return ((fmap($instance$Functor$9))(concat(_12_rs_$u$407)))(($$compiler$typer_jg$$inferSccDefs(((foldl(function(_12_env_$u$409){
return function(_12_r_$u$410){
return (($$compiler$typer_jg$$addBinding($$compiler$prelude_jg$$fst(_12_r_$u$410)))($$compiler$ast_jg$$getType($$compiler$prelude_jg$$snd(_12_r_$u$410))))(_12_env_$u$409)}}))(_12_env_$u$396))(_12_rs_$u$407)))((filter(function(_12_d_$u$411){
return (($$compiler$prelude_jg$$contains($instance$Eq$1))($$compiler$prelude_jg$$fst(_12_d_$u$411)))(_12_cc_$u$408)}))(_12_ds_$u$397)))}};var _12_ns_$u$398 = (map($$compiler$prelude_jg$$fst))(_12_ds_$u$397);var _12_g_$u$399 = ((foldl(function(_12_g_$u$402){
return function(_12_d_$u$403){
return (function(){
var $pm = _12_d_$u$403;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_n_$u$404,_12_e_$u$405){
return ((set(_12_n_$u$404))((filter(function(_12_v_$u$406){
return ($and((($$compiler$prelude_jg$$contains($instance$Eq$1))(_12_v_$u$406))(_12_ns_$u$398)))((($$compiler$prelude_jg$$$div$eq($instance$Eq$1))(_12_v_$u$406))(_12_n_$u$404))}))($$compiler$typer_jg$$freeVars(_12_e_$u$405))))(_12_g_$u$402)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(empty))(_12_ds_$u$397);var _12_ccs_$u$400 = $$compiler$graph_jg$$sccSorted(_12_g_$u$399);return ((($$compiler$prelude_jg$$foldM($instance$Monad$11))(_12_infer_$u$401))(emptyArray))(_12_ccs_$u$400)})()}};
var $$compiler$typer_jg$$newCtx = ((($$compiler$typer_jg$$ICtx($$compiler$typer_jg$$emptySubs))(emptyArray))(1))(function(_12_s_$u$72){
return ($concat("unknown error context: "))(_12_s_$u$72)});
var $$compiler$typer_jg$$inferInstance = function(_12_env_$u$503){
return function(_12_cs_$u$504){
return function(_12_i_$u$505){
return (function(){
var _12_inferE_$u$506 = function(_12_e_$u$507){
return (function(){
var $pm = ($$compiler$prelude_jg$$$($$compiler$prelude_jg$$runState($$compiler$typer_jg$$newCtx)))(($$compiler$typer_jg$$infer(_12_env_$u$503))(_12_e_$u$507));return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_ctx_$u$508,_12_e2_$u$509){
return ($$compiler$typer_jg$$applySubsE($$compiler$typer_jg$$getSubs(_12_ctx_$u$508)))(_12_e2_$u$509)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return (function(){
var $pm = _12_i_$u$505;return ($pm.$tag==$$compiler$ast_jg$$Instance.$tag)?((function(_12_ann_$u$510,_12_n_$u$511,_12_it_$u$512,_12_ds_$u$513){
return (function(){
var $pm = ($$compiler$prelude_jg$$find(function(_12_c_$u$514){
return (function(){
var $pm = _12_c_$u$514;return ($pm.$tag==$$compiler$ast_jg$$Class.$tag)?((function(_12___$u$515,_12_m_$u$516,_12___$u$517,_12___$u$518){
return (($eq$eq($instance$Eq$1))(_12_n_$u$511))(_12_m_$u$516)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}))(_12_cs_$u$504);return ($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return error(($concat("Cannot find clas "))(_12_n_$u$511))})()):((($pm.$tag==$$compiler$prelude_jg$$Just.$tag)&&($pm.$0.$tag==$$compiler$ast_jg$$Class.$tag))?((function(_12___$u$519,_12___$u$520,_12_v_$u$521,_12_bs_$u$522){
return (function(){
var _12_bs2_$u$523 = ((foldl(function(_12_bs_$u$525){
return function(_12_b_$u$526){
return (function(){
var $pm = _12_b_$u$526;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_n_$u$527,_12_t_$u$528){
return ((set(_12_n_$u$527))((($$compiler$typer_jg$$substitute(_12_v_$u$521))(_12_it_$u$512))(_12_t_$u$528)))(_12_bs_$u$525)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(empty))(_12_bs_$u$522);var _12_ds2_$u$524 = (map(function(_12_d_$u$529){
return (function(){
var $pm = _12_d_$u$529;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_dn_$u$530,_12_e_$u$531){
return ($$compiler$prelude_jg$$Pair(_12_dn_$u$530))(_12_inferE_$u$506(($$compiler$ast_jg$$setType(($$compiler$typer_jg$$getSafe(_12_dn_$u$530))(_12_bs2_$u$523)))(_12_e_$u$531)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(_12_ds_$u$513);return ((($$compiler$ast_jg$$Instance(_12_ann_$u$510))(_12_n_$u$511))(_12_it_$u$512))(_12_ds2_$u$524)})()})($pm.$0.$0,$pm.$0.$1,$pm.$0.$2,$pm.$0.$3)):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()})()}}};
var $$compiler$typer_jg$$classToBindings = function(_12_c_$u$537){
return (function(){
var $pm = _12_c_$u$537;return ($pm.$tag==$$compiler$ast_jg$$Class.$tag)?((function(_12___$u$538,_12_n_$u$539,_12_tv_$u$540,_12_bs_$u$541){
return (function(){
var _12_process_$u$542 = function(_12_b_$u$543){
return (function(){
var $pm = _12_b_$u$543;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_v_$u$544,_12_t_$u$545){
return (function(){
var _12_ftv_$u$546 = $$compiler$typer_jg$$freeTVars(_12_t_$u$545);return (function(){
var $pm = ((($$compiler$prelude_jg$$setContains($instance$Hashable$13))($instance$Eq$1))(_12_tv_$u$540))(_12_ftv_$u$546);return (!$pm)?((function(){
return error(($concat(($concat(($concat("invalid clas definition "))(_12_n_$u$539)))(", binding ")))(_12_v_$u$544))})()):($pm?((function(){
return ($$compiler$prelude_jg$$Pair(_12_v_$u$544))(((($$compiler$typer_jg$$mkTForall($$compiler$prelude_jg$$Empty))($$compiler$prelude_jg$$setToArray(_12_ftv_$u$546)))($$compiler$prelude_jg$$arr1((($$compiler$ast_jg$$TCBound($$compiler$prelude_jg$$Empty))(_12_n_$u$539))(($$compiler$ast_jg$$TVar($$compiler$prelude_jg$$Empty))(_12_tv_$u$540)))))(_12_t_$u$545))})()):(error("pattern match fail")))})()})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return (map(_12_process_$u$542))(_12_bs_$u$541)})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var $$compiler$typer_jg$$emptyEnv = (($$compiler$typer_jg$$IEnv(empty))(emptyArray))($$compiler$prelude_jg$$Empty);
var $$compiler$typer_jg$$addInstance = function(_12_b_$u$157){
return function(_12_env_$u$158){
return (function(){
var $pm = _12_env_$u$158;return ($pm.$tag==$$compiler$typer_jg$$IEnv.$tag)?((function(_12_bs_$u$159,_12_ts_$u$160,_12_fvs_$u$161){
return (($$compiler$typer_jg$$IEnv(_12_bs_$u$159))((push(_12_b_$u$157))(_12_ts_$u$160)))(_12_fvs_$u$161)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var $$compiler$typer_jg$$inferTypeModule = function(_12_ms_$u$547){
return function(_12_m_$u$548){
return (function(){
var _12_checkForUnsatisfiedBounds_$u$554 = function(_12_d_$u$588){
return (function(){
var $pm = $$compiler$ast_jg$$getType($$compiler$prelude_jg$$snd(_12_d_$u$588));return ($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_12___$u$589,_12___$u$590,_12_bs_$u$591,_12_t_$u$592){
return (function(){
var $pm = _12_t_$u$592;return (($pm.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$pm.$1.$1.$1))))?((function(_12___$u$593,_12___$u$594,_12___$u$595,_12___$u$596,_12___$u$597){
return _12_d_$u$588})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):((function(_12___$u$598){
return (function(){
var $pm = length(_12_bs_$u$591);return (0==$pm)?((function(){
return _12_d_$u$588})()):((function(_12___$u$599){
return error(($concat(($concat(($concat("unsatisfied bounds in def of "))($$compiler$prelude_jg$$fst(_12_d_$u$588))))(" :: ")))($$compiler$printer_jg$$printType($$compiler$ast_jg$$getType($$compiler$prelude_jg$$snd(_12_d_$u$588)))))})($pm))})()})($pm))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):((function(_12___$u$600){
return _12_d_$u$588})($pm))})()};var _12_addIns_$u$553 = function(_12_env_$u$586){
return function(_12_i_$u$587){
return ($$compiler$typer_jg$$addInstance($$compiler$typer_jg$$instanceToTypeBound(_12_i_$u$587)))(_12_env_$u$586)}};var _12_addTypes_$u$551 = function(_12_env_$u$576){
return function(_12_dt_$u$577){
return ((foldl(function(_12_env_$u$578){
return function(_12_c_$u$579){
return (function(){
var $pm = _12_c_$u$579;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_n_$u$580,_12_t_$u$581){
return (($$compiler$typer_jg$$addBinding(_12_n_$u$580))(_12_t_$u$581))(_12_env_$u$578)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(_12_env_$u$576))($$compiler$typer_jg$$conTypes(_12_dt_$u$577))}};var _12_getFile_$u$549 = function(_12_i_$u$555){
return (function(){
var $pm = _12_i_$u$555;return ($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)?((function(_12___$u$556,_12_f_$u$557,_12___$u$558){
return _12_f_$u$557})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};var _12_addClass_$u$552 = function(_12_env_$u$582){
return function(_12_c_$u$583){
return ((foldl(function(_12_env_$u$584){
return function(_12_b_$u$585){
return (($$compiler$typer_jg$$addBinding($$compiler$prelude_jg$$fst(_12_b_$u$585)))($$compiler$prelude_jg$$snd(_12_b_$u$585)))(_12_env_$u$584)}}))(_12_env_$u$582))($$compiler$typer_jg$$classToBindings(_12_c_$u$583))}};var _12_addImports_$u$550 = function(_12_env_$u$559){
return function(_12_i_$u$560){
return (function(){
var $pm = ($$compiler$typer_jg$$getSafe(_12_getFile_$u$549(_12_i_$u$560)))(_12_ms_$u$547);return ($pm.$tag==$$compiler$ast_jg$$ModuleInterface.$tag)?((function(_12_bs_$u$561,_12_cs_$u$562,_12_is_$u$563){
return (function(){
var _12_env2_$u$564 = (function(){
var $pm = _12_i_$u$560;return ($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)?((function(_12___$u$567,_12_f_$u$568,_12_ns_$u$569){
return ((foldl(function(_12_env_$u$570){
return function(_12_n_$u$571){
return (function(){
var $pm = _12_n_$u$571;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_n_$u$572,_12_a_$u$573){
return (($$compiler$typer_jg$$addBinding(_12_a_$u$573))(($$compiler$typer_jg$$getSafe(_12_n_$u$572))(_12_bs_$u$561)))(_12_env_$u$570)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(_12_env_$u$559))(_12_ns_$u$569)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})();var _12_env3_$u$565 = ((foldl(_12_addClass_$u$552))(_12_env2_$u$564))(_12_cs_$u$562);var _12_env4_$u$566 = ((foldl(function(_12_env_$u$574){
return function(_12_i_$u$575){
return ($$compiler$typer_jg$$addInstance(_12_i_$u$575))(_12_env_$u$574)}}))(_12_env3_$u$565))(_12_is_$u$563);return _12_env4_$u$566})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};return (function(){
var $pm = _12_m_$u$548;return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_12_ann_$u$601,_12_fn_$u$602,_12_is_$u$603,_12_ts_$u$604,_12_cs_$u$605,_12_ins_$u$606,_12_ds_$u$607){
return (function(){
var _12_env2_$u$609 = ((foldl(_12_addImports_$u$550))($$compiler$typer_jg$$emptyEnv))(_12_is_$u$603);var _12_env3_$u$610 = ((foldl(_12_addTypes_$u$551))(_12_env2_$u$609))(_12_ts_$u$604);var _12_env4_$u$611 = ((foldl(_12_addClass_$u$552))(_12_env3_$u$610))(_12_cs_$u$605);var _12_env5_$u$612 = ((foldl(_12_addIns_$u$553))(_12_env4_$u$611))(_12_ins_$u$606);var _12_ds2_$u$613 = ($$compiler$prelude_jg$$evalState($$compiler$typer_jg$$newCtx))(($$compiler$typer_jg$$inferDefs(_12_env5_$u$612))(_12_ds_$u$607));var _12_ds3_$u$614 = (map(_12_checkForUnsatisfiedBounds_$u$554))(_12_ds2_$u$613);var _12_env6_$u$615 = ((foldl(function(_12_env_$u$617){
return function(_12_d_$u$618){
return (function(){
var $pm = _12_d_$u$618;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_12_n_$u$619,_12_e_$u$620){
return (($$compiler$typer_jg$$addBinding(_12_n_$u$619))($$compiler$ast_jg$$getType(_12_e_$u$620)))(_12_env_$u$617)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(_12_env5_$u$612))(_12_ds3_$u$614);var _12_ins2_$u$616 = (map(($$compiler$typer_jg$$inferInstance(_12_env6_$u$615))((concat(_12_cs_$u$605))(($$compiler$prelude_jg$$concatMap(function(_12_i_$u$621){
return (function(){
var $pm = ($$compiler$typer_jg$$getSafe(_12_getFile_$u$549(_12_i_$u$621)))(_12_ms_$u$547);return ($pm.$tag==$$compiler$ast_jg$$ModuleInterface.$tag)?((function(_12___$u$622,_12_cs_$u$623,_12___$u$624){
return _12_cs_$u$623})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}))(_12_is_$u$603)))))(_12_ins_$u$606);return (((((($$compiler$ast_jg$$Module(_12_ann_$u$601))(_12_fn_$u$602))(_12_is_$u$603))(_12_ts_$u$604))(_12_cs_$u$605))(_12_ins2_$u$616))(_12_ds3_$u$614)})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})()})()}};
var $$compiler$importNormalizer_jg$$addPrefix = function(_11_fn_$u$46){
return function(_11_n_$u$47){
return ($concat(($concat(((stringReplaceChar("/"))("$"))(((stringReplaceChar("."))("_"))(_11_fn_$u$46))))("$$")))(_11_n_$u$47)}};
var $$compiler$importNormalizer_jg$$normalize = function(_11_ms_$u$23){
return function(_11_freeVars_$u$24){
return function(_11_i_$u$25){
return (function(){
var $pm = _11_i_$u$25;return ($pm.$tag==$$compiler$ast_jg$$ImportClosed.$tag)?((function(_11___$u$26,_11___$u$27,_11___$u$28){
return error("closed imports not supported")})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)?((function(_11_ann_$u$29,_11_f_$u$30,_11_ns_$u$31){
return (($$compiler$ast_jg$$ImportOpen(_11_ann_$u$29))(_11_f_$u$30))((map(function(_11_p_$u$32){
return (function(){
var $pm = _11_p_$u$32;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_11_n_$u$33,_11_m_$u$34){
return ($$compiler$prelude_jg$$Pair(($$compiler$importNormalizer_jg$$addPrefix(_11_f_$u$30))(_11_n_$u$33)))(_11_m_$u$34)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(_11_ns_$u$31))})($pm.$0,$pm.$1,$pm.$2)):((($pm.$tag==$$compiler$ast_jg$$ImportAll.$tag)&&("./builtins.js"==$pm.$1))?((function(_11_ann_$u$35){
return (function(){
var $pm = (get("./builtins.js"))(_11_ms_$u$23);return ($pm.$tag==$$compiler$ast_jg$$ModuleInterface.$tag)?((function(_11_bs_$u$36,_11___$u$37,_11___$u$38){
return (($$compiler$ast_jg$$ImportOpen(_11_ann_$u$35))("./builtins.js"))((map(function(_11_n_$u$39){
return ($$compiler$prelude_jg$$Pair(_11_n_$u$39))(_11_n_$u$39)}))(keys(_11_bs_$u$36)))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()})($pm.$0)):(($pm.$tag==$$compiler$ast_jg$$ImportAll.$tag)?((function(_11_ann_$u$40,_11_f_$u$41){
return (function(){
var $pm = (get(_11_f_$u$41))(_11_ms_$u$23);return ($pm.$tag==$$compiler$ast_jg$$ModuleInterface.$tag)?((function(_11_bs_$u$42,_11___$u$43,_11___$u$44){
return (($$compiler$ast_jg$$ImportOpen(_11_ann_$u$40))(_11_f_$u$41))((map(function(_11_n_$u$45){
return ($$compiler$prelude_jg$$Pair(_11_n_$u$45))((drop((length(_11_f_$u$41))+2))(_11_n_$u$45))}))(keys(_11_bs_$u$42)))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail")))))})()}}};
var $$compiler$importNormalizer_jg$$normalizeImports = function(_11_ms_$u$0){
return function(_11_m_$u$1){
return (function(){
var $pm = _11_m_$u$1;return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_11_ann_$u$2,_11_fn_$u$3,_11_is_$u$4,_11_ds_$u$5,_11_cs_$u$6,_11_ins_$u$7,_11_vs_$u$8){
return (function(){
var _11_getFromDefs_$u$9 = function(_11_ds_$u$15){
return ((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))(emptyArray))((map(function(_11_v_$u$16){
return $$compiler$typer_jg$$freeVars($$compiler$prelude_jg$$snd(_11_v_$u$16))}))(_11_ds_$u$15))};var _11_freeVarsInDefs_$u$10 = _11_getFromDefs_$u$9(_11_vs_$u$8);var _11_freeVarsInIns_$u$11 = ((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))(emptyArray))((map(function(_11_i_$u$17){
return (function(){
var $pm = _11_i_$u$17;return ($pm.$tag==$$compiler$ast_jg$$Instance.$tag)?((function(_11___$u$18,_11___$u$19,_11___$u$20,_11_ds_$u$21){
return _11_getFromDefs_$u$9(_11_ds_$u$21)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}))(_11_ins_$u$7));var _11_fvs_$u$13 = (filter(function(_11_v_$u$22){
return $$compiler$prelude_jg$$not((($$compiler$prelude_jg$$contains($instance$Eq$1))(_11_v_$u$22))(emptyArray))}))(((($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1))(_11_freeVarsInDefs_$u$10))(_11_freeVarsInIns_$u$11));var _11_is2_$u$14 = (map(($$compiler$importNormalizer_jg$$normalize(_11_ms_$u$0))(_11_fvs_$u$13)))((enqueue(($$compiler$ast_jg$$ImportAll($$compiler$prelude_jg$$Empty))("./builtins.js")))(_11_is_$u$4));return (((((($$compiler$ast_jg$$Module(_11_ann_$u$2))(_11_fn_$u$3))(_11_is2_$u$14))(_11_ds_$u$5))(_11_cs_$u$6))(_11_ins_$u$7))(_11_vs_$u$8)})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})()}};
var $$compiler$declasser_jg$$setEnv = function(_10_env_$u$95){
return function(_10_s_$u$96){
return (function(){
var $pm = _10_s_$u$96;return ($pm.$tag==$$compiler$declasser_jg$$S.$tag)?((function(_10___$u$97,_10_is_$u$98,_10_n_$u$99){
return (($$compiler$declasser_jg$$S(_10_env_$u$95))(_10_is_$u$98))(_10_n_$u$99)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var $$compiler$declasser_jg$$instanceNameFromBound = function(_10_ix_$u$334){
return function(_10_b_$u$335){
return (function(){
var $pm = _10_b_$u$335;return ($pm.$tag==$$compiler$ast_jg$$TCBound.$tag)?((function(_10___$u$336,_10_n_$u$337,_10___$u$338){
return ($concat(($concat(($concat("local$instance$"))(_10_n_$u$337)))("$")))(intToString(_10_ix_$u$334))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var $$compiler$declasser_jg$$getEnv = function(_10_s_$u$91){
return (function(){
var $pm = _10_s_$u$91;return ($pm.$tag==$$compiler$declasser_jg$$S.$tag)?((function(_10_env_$u$92,_10___$u$93,_10___$u$94){
return _10_env_$u$92})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var $$compiler$declasser_jg$$breakableDownAndUpWithEnv = function(_10_getEnv_$u$199){
return function(_10_setEnv_$u$200){
return function(_10_down_$u$201){
return function(_10_up_$u$202){
return function(_10_a_$u$203){
return function(_10_e_$u$204){
return (function(){
var _10_exitScope_$u$207 = function(_10_a_$u$218){
return (_10_setEnv_$u$200($$compiler$prelude_jg$$tail(_10_getEnv_$u$199(_10_a_$u$218))))(_10_a_$u$218)};var _10_processUp_$u$210 = function(_10_a_$u$267){
return function(_10_e_$u$268){
return (function(){
var _10_a2_$u$269 = (function(){
var $pm = _10_e_$u$268;return ($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_10___$u$270,_10___$u$271,_10___$u$272){
return _10_exitScope_$u$207(_10_a_$u$267)})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_10___$u$273,_10___$u$274,_10___$u$275){
return _10_exitScope_$u$207(_10_a_$u$267)})($pm.$0,$pm.$1,$pm.$2)):((function(_10___$u$276){
return _10_a_$u$267})($pm)))})();return (_10_up_$u$202(_10_a2_$u$269))(_10_e_$u$268)})()}};var _10_patBindings_$u$211 = function(_10_p_$u$277){
return (function(){
var $pm = _10_p_$u$277;return ($pm.$tag==$$compiler$ast_jg$$PConst.$tag)?((function(_10___$u$278,_10___$u$279){
return empty})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$PVar.$tag)?((function(_10_ann_$u$280,_10_v_$u$281){
return ((set(_10_v_$u$281))($$compiler$ast_jg$$getAnnType(_10_ann_$u$280)))(empty)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$PData.$tag)?((function(_10___$u$282,_10___$u$283,_10_ps_$u$284){
return ((foldr(function(_10_env_$u$285){
return function(_10_p_$u$286){
return (merge(_10_patBindings_$u$211(_10_p_$u$286)))(_10_env_$u$285)}}))(empty))(_10_ps_$u$284)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))))})()};var _10_enterScope_$u$206 = function(_10_bs_$u$214){
return function(_10_a_$u$215){
return (function(){
var _10_es_$u$216 = _10_getEnv_$u$199(_10_a_$u$215);var _10_e_$u$217 = (merge($$compiler$prelude_jg$$head(_10_es_$u$216)))(_10_bs_$u$214);return (_10_setEnv_$u$200((enqueue(_10_e_$u$217))(_10_es_$u$216)))(_10_a_$u$215)})()}};var _10_go_$u$205 = function(_10_a_$u$212){
return function(_10_e_$u$213){
return ((($$compiler$ast_jg$$breakableDownAndUp(_10_processDown_$u$208))(_10_processUp_$u$210))(_10_a_$u$212))(_10_e_$u$213)}};var _10_processDown_$u$208 = function(_10_a_$u$219){
return function(_10_e_$u$220){
return (function(){
var $pm = (_10_down_$u$201(_10_a_$u$219))(_10_e_$u$220);return ($pm.$tag==$$compiler$prelude_jg$$Right.$tag)?((function(_10_ae_$u$221){
return $$compiler$prelude_jg$$Right(_10_ae_$u$221)})($pm.$0)):((($pm.$tag==$$compiler$prelude_jg$$Left.$tag)&&($pm.$0.$tag==$$compiler$prelude_jg$$Pair.$tag))?((function(_10_a_$u$222,_10_e_$u$223){
return (function(){
var $pm = _10_e_$u$223;return ($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_10___$u$224,_10_p_$u$225,_10_b_$u$226){
return (function(){
var _10_t_$u$227 = (function(){
var $pm = $$compiler$ast_jg$$getType(_10_e_$u$223);return (($pm.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$pm.$1.$1.$1))))?((function(_10___$u$228,_10___$u$229,_10___$u$230,_10_t_$u$231,_10___$u$232){
return _10_t_$u$231})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):((($pm.$tag==$$compiler$ast_jg$$TForall.$tag)&&(($pm.$3.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$3.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($pm.$3.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$pm.$3.$1.$1.$1)))))?((function(_10___$u$233,_10___$u$234,_10___$u$235,_10___$u$236,_10___$u$237,_10___$u$238,_10_t_$u$239,_10___$u$240){
return _10_t_$u$239})($pm.$0,$pm.$1,$pm.$2,$pm.$3.$0,$pm.$3.$1.$0,$pm.$3.$1.$1.$0,$pm.$3.$1.$2,$pm.$3.$2)):((function(_10___$u$241){
return $$compiler$ast_jg$$TUnknown})($pm)))})();return $$compiler$prelude_jg$$Left(($$compiler$prelude_jg$$Pair((_10_enterScope_$u$206(((set(_10_p_$u$225))(_10_t_$u$227))(empty)))(_10_a_$u$222)))(_10_e_$u$223))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_10___$u$242,_10_bs_$u$243,_10___$u$244){
return (function(){
var _10_ts_$u$245 = ((foldl(function(_10_ts_$u$246){
return function(_10_b_$u$247){
return (function(){
var $pm = _10_b_$u$247;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_n_$u$248,_10_e_$u$249){
return ((set(_10_n_$u$248))($$compiler$ast_jg$$getType(_10_e_$u$249)))(_10_ts_$u$246)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(empty))(_10_bs_$u$243);return $$compiler$prelude_jg$$Left(($$compiler$prelude_jg$$Pair((_10_enterScope_$u$206(_10_ts_$u$245))(_10_a_$u$222)))(_10_e_$u$223))})()})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_10_ann_$u$250,_10_e_$u$251,_10_ps_$u$252){
return (function(){
var $pm = (_10_go_$u$205(_10_a_$u$222))(_10_e_$u$251);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_a_$u$253,_10_e_$u$254){
return (function(){
var $pm = ((foldl(_10_processPat_$u$209))(($$compiler$prelude_jg$$Pair(_10_a_$u$253))(emptyArray)))(_10_ps_$u$252);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_a_$u$255,_10_ps_$u$256){
return $$compiler$prelude_jg$$Right(($$compiler$prelude_jg$$Pair(_10_a_$u$255))((($$compiler$ast_jg$$Case(_10_ann_$u$250))(_10_e_$u$254))(_10_ps_$u$256)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):((function(_10___$u$257){
return $$compiler$prelude_jg$$Left(($$compiler$prelude_jg$$Pair(_10_a_$u$222))(_10_e_$u$223))})($pm))))})()})($pm.$0.$0,$pm.$0.$1)):(error("pattern match fail")))})()}};var _10_processPat_$u$209 = function(_10_ar_$u$258){
return function(_10_pat_$u$259){
return (function(){
var $pm = _10_ar_$u$258;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_a_$u$260,_10_r_$u$261){
return (function(){
var $pm = _10_pat_$u$259;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_pat_$u$262,_10_e_$u$263){
return (function(){
var _10_bs_$u$264 = _10_patBindings_$u$211(_10_pat_$u$262);return (function(){
var $pm = (_10_go_$u$205((_10_enterScope_$u$206(_10_bs_$u$264))(_10_a_$u$260)))(_10_e_$u$263);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_a_$u$265,_10_e_$u$266){
return ($$compiler$prelude_jg$$Pair(_10_exitScope_$u$207(_10_a_$u$265)))((push(($$compiler$prelude_jg$$Pair(_10_pat_$u$262))(_10_e_$u$266)))(_10_r_$u$261))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};return (_10_go_$u$205(_10_a_$u$203))(_10_e_$u$204)})()}}}}}};
var $$compiler$declasser_jg$$addPrefix = function(_10_p_$u$187){
return function(_10_t_$u$188){
return (function(){
var $pm = _10_t_$u$188;return ($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_10_ann_$u$189,_10_vs_$u$190,_10_bs_$u$191,_10_t_$u$192){
return (function(){
var _10_subs_$u$193 = ((foldl(function(_10_subs_$u$194){
return function(_10_v_$u$195){
return ((($$compiler$typer_jg$$addSub(function(_10_s_$u$196){
return ($concat("declasser: "))(_10_s_$u$196)}))(_10_v_$u$195))(($$compiler$ast_jg$$TVar($$compiler$prelude_jg$$Empty))(($concat(_10_p_$u$187))(_10_v_$u$195))))(_10_subs_$u$194)}}))($$compiler$typer_jg$$emptySubs))(_10_vs_$u$190);return ($$compiler$typer_jg$$applySubs(_10_subs_$u$193))(((($$compiler$ast_jg$$TForall(_10_ann_$u$189))((map(function(_10_v_$u$197){
return ($concat(_10_p_$u$187))(_10_v_$u$197)}))(_10_vs_$u$190)))(_10_bs_$u$191))(_10_t_$u$192))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):((function(_10___$u$198){
return _10_t_$u$188})($pm))})()}};
var $$compiler$declasser_jg$$rewriteExpr = function(_10_is_$u$104){
return function(_10_env_$u$105){
return function(_10_e_$u$106){
return (function(){
var _10_fromEnv_$u$107 = function(_10_n_$u$115){
return function(_10_envs_$u$116){
return (function(){
var _10_env_$u$117 = $$compiler$prelude_jg$$head(_10_envs_$u$116);return (function(){
var $pm = (has(_10_n_$u$115))(_10_env_$u$117);return (!$pm)?((function(){
return error(($concat(($concat(($concat("no "))(_10_n_$u$115)))(" in env ")))(jsonStringify(keys(_10_env_$u$117))))})()):($pm?((function(){
return (get(_10_n_$u$115))(_10_env_$u$117)})()):(error("pattern match fail")))})()})()}};var _10_dropInstance_$u$108 = function(_10_v_$u$118){
return function(_10_a_$u$119){
return (function(){
var $pm = _10_a_$u$119;return ($pm.$tag==$$compiler$declasser_jg$$S.$tag)?((function(_10_env_$u$120,_10_is_$u$121,_10_n_$u$122){
return (($$compiler$declasser_jg$$S(_10_env_$u$120))((filter(function(_10_p_$u$123){
return (($$compiler$prelude_jg$$$div$eq($instance$Eq$1))($$compiler$prelude_jg$$fst(_10_p_$u$123)))(_10_v_$u$118)}))(_10_is_$u$121)))(_10_n_$u$122)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};var _10_findMatching_$u$110 = function(_10_b_$u$130){
return function(_10_a_$u$131){
return (function(){
var $pm = _10_a_$u$131;return ($pm.$tag==$$compiler$declasser_jg$$S.$tag)?((function(_10___$u$132,_10_is_$u$133,_10___$u$134){
return (function(){
var $pm = ($$compiler$prelude_jg$$find(function(_10_p_$u$135){
return (function(){
var $pm = _10_p_$u$135;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10___$u$136,_10_ib_$u$137){
return ($$compiler$typer_jg$$satisfiesBound(_10_ib_$u$137))(_10_b_$u$130)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(_10_is_$u$133);return (($pm.$tag==$$compiler$prelude_jg$$Just.$tag)&&($pm.$0.$tag==$$compiler$prelude_jg$$Pair.$tag))?((function(_10_n_$u$138,_10___$u$139){
return _10_n_$u$138})($pm.$0.$0,$pm.$0.$1)):((function(_10___$u$140){
return error(($concat("declasser failed to find satisfying instance for "))($$compiler$printer_jg$$printTypeBound(_10_b_$u$130)))})($pm))})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};var _10_requiredInstances_$u$111 = function(_10_tv_$u$141){
return function(_10_td_$u$142){
return (function(){
var $pm = ($$compiler$declasser_jg$$addPrefix("ins$"))(_10_td_$u$142);return ($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_10___$u$143,_10___$u$144,_10_bs_$u$145,_10_t_$u$146){
return (function(){
var _10_subs_$u$147 = (($$compiler$typer_jg$$unify(function(_10_s_$u$148){
return ($concat("declasser: "))(_10_s_$u$148)}))(_10_tv_$u$141))(_10_t_$u$146);return (map($$compiler$typer_jg$$applySubsBound(_10_subs_$u$147)))(_10_bs_$u$145)})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):((function(_10___$u$149){
return emptyArray})($pm))})()}};var _10_rewriteVar_$u$114 = function(_10_a_$u$165){
return function(_10_e_$u$166){
return (function(){
var $pm = _10_e_$u$166;return ($pm.$tag==$$compiler$ast_jg$$Var.$tag)?((function(_10___$u$167,_10_v_$u$168){
return (function(){
var $pm = $$compiler$ast_jg$$getType(_10_e_$u$166);return ($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_10___$u$169,_10___$u$170,_10___$u$171,_10___$u$172){
return ($$compiler$prelude_jg$$Pair(_10_a_$u$165))(_10_e_$u$166)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):((function(_10_tv_$u$173){
return (function(){
var _10_t_$u$174 = (_10_fromEnv_$u$107(_10_v_$u$168))($$compiler$declasser_jg$$getEnv(_10_a_$u$165));var _10_is_$u$175 = (_10_requiredInstances_$u$111(_10_tv_$u$173))(_10_t_$u$174);var _10_mis_$u$176 = (map(function(_10_b_$u$178){
return (_10_findMatching_$u$110(_10_b_$u$178))(_10_a_$u$165)}))(_10_is_$u$175);var _10_e2_$u$177 = ((foldl(function(_10_e_$u$179){
return function(_10_v_$u$180){
return (($$compiler$ast_jg$$App($$compiler$prelude_jg$$Empty))(_10_e_$u$179))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))(_10_v_$u$180))}}))(_10_e_$u$166))(_10_mis_$u$176);return ($$compiler$prelude_jg$$Pair(_10_a_$u$165))(_10_e2_$u$177)})()})($pm))})()})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_10___$u$181,_10_p_$u$182,_10___$u$183){
return ($$compiler$prelude_jg$$Pair((_10_dropInstance_$u$108(_10_p_$u$182))(_10_a_$u$165)))(_10_e_$u$166)})($pm.$0,$pm.$1,$pm.$2)):((function(_10___$u$184){
return ($$compiler$prelude_jg$$Pair(_10_a_$u$165))(_10_e_$u$166)})($pm)))})()}};var _10_addInstance_$u$109 = function(_10_b_$u$124){
return function(_10_a_$u$125){
return (function(){
var $pm = _10_a_$u$125;return ($pm.$tag==$$compiler$declasser_jg$$S.$tag)?((function(_10_env_$u$126,_10_is_$u$127,_10_n_$u$128){
return (function(){
var _10_name_$u$129 = ($$compiler$declasser_jg$$instanceNameFromBound(_10_n_$u$128))(_10_b_$u$124);return ($$compiler$prelude_jg$$Pair((($$compiler$declasser_jg$$S(_10_env_$u$126))((push(($$compiler$prelude_jg$$Pair(_10_name_$u$129))(_10_b_$u$124)))(_10_is_$u$127)))(_10_n_$u$128+1)))(_10_name_$u$129)})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};var _10_rewriteBound_$u$113 = function(_10_ae_$u$157){
return function(_10_ib_$u$158){
return (function(){
var $pm = _10_ib_$u$158;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_ix_$u$159,_10_b_$u$160){
return (function(){
var $pm = _10_ae_$u$157;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_a_$u$161,_10_e_$u$162){
return (function(){
var $pm = (_10_addInstance_$u$109(_10_b_$u$160))(_10_a_$u$161);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_a_$u$163,_10_name_$u$164){
return ($$compiler$prelude_jg$$Pair(_10_a_$u$163))((($$compiler$ast_jg$$Lam($$compiler$prelude_jg$$Empty))(_10_name_$u$164))(_10_e_$u$162))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};var _10_rewriteBounds_$u$112 = function(_10_a_$u$150){
return function(_10_e_$u$151){
return (function(){
var $pm = $$compiler$ast_jg$$getType(_10_e_$u$151);return ($pm.$tag==$$compiler$ast_jg$$TForall.$tag)?((function(_10___$u$152,_10___$u$153,_10_bs_$u$154,_10_t_$u$155){
return (function(){
var $pm = (($$compiler$prelude_jg$$$gt($instance$Ord$2))(length(_10_bs_$u$154)))(0);return (!$pm)?((function(){
return ($$compiler$prelude_jg$$Pair(_10_a_$u$150))(_10_e_$u$151)})()):($pm?((function(){
return ((foldr(_10_rewriteBound_$u$113))(($$compiler$prelude_jg$$Pair(_10_a_$u$150))(($$compiler$ast_jg$$setType(_10_t_$u$155))(_10_e_$u$151))))($$compiler$prelude_jg$$zipWithIndex(_10_bs_$u$154))})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):((function(_10___$u$156){
return ($$compiler$prelude_jg$$Pair(_10_a_$u$150))(_10_e_$u$151)})($pm))})()}};return $$compiler$prelude_jg$$snd(((((($$compiler$declasser_jg$$breakableDownAndUpWithEnv($$compiler$declasser_jg$$getEnv))($$compiler$declasser_jg$$setEnv))(function(_10_a_$u$185){
return function(_10_e_$u$186){
return $$compiler$prelude_jg$$Left((_10_rewriteBounds_$u$112(_10_a_$u$185))(_10_e_$u$186))}}))(_10_rewriteVar_$u$114))((($$compiler$declasser_jg$$S($$compiler$prelude_jg$$arr1(_10_env_$u$105)))(_10_is_$u$104))(0)))(_10_e_$u$106))})()}}};
var $$compiler$declasser_jg$$instanceNameFromImport = function(_10_imix_$u$344){
return function(_10_inix_$u$345){
return function(_10_b_$u$346){
return (function(){
var $pm = _10_b_$u$346;return ($pm.$tag==$$compiler$ast_jg$$TCBound.$tag)?((function(_10___$u$347,_10_n_$u$348,_10___$u$349){
return ($concat(($concat(($concat(($concat(($concat("$import"))(intToString(_10_imix_$u$344))))("$instance$")))(_10_n_$u$348)))("$")))(intToString(_10_inix_$u$345))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}}};
var $$compiler$declasser_jg$$instanceName2 = function(_10_ix_$u$339){
return function(_10_i_$u$340){
return (function(){
var $pm = _10_i_$u$340;return ($pm.$tag==$$compiler$ast_jg$$TCBound.$tag)?((function(_10___$u$341,_10_n_$u$342,_10___$u$343){
return ($concat(($concat(($concat("$instance$"))(_10_n_$u$342)))("$")))(intToString(_10_ix_$u$339))})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var $$compiler$declasser_jg$$rewriteImportedBound = function(_10_imix_$u$53){
return function(_10_nbs_$u$54){
return function(_10_ib_$u$55){
return (function(){
var $pm = _10_nbs_$u$54;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_ns_$u$56,_10_bs_$u$57){
return (function(){
var $pm = _10_ib_$u$55;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_inix_$u$58,_10_b_$u$59){
return (function(){
var _10_alias_$u$61 = (($$compiler$declasser_jg$$instanceNameFromImport(_10_imix_$u$53))(_10_inix_$u$58))(_10_b_$u$59);var _10_symbol_$u$60 = ($$compiler$declasser_jg$$instanceName2(_10_inix_$u$58))(_10_b_$u$59);return ($$compiler$prelude_jg$$Pair((push(($$compiler$prelude_jg$$Pair(_10_symbol_$u$60))(_10_alias_$u$61)))(_10_ns_$u$56)))((push(($$compiler$prelude_jg$$Pair(_10_alias_$u$61))(_10_b_$u$59)))(_10_bs_$u$57))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}};
var $$compiler$declasser_jg$$className = function(_10_n_$u$322){
return ($concat("$class$"))(_10_n_$u$322)};
var $$compiler$declasser_jg$$rewriteImportedInstances = function(_10_ms_$u$32){
return function(_10_isi_$u$33){
return function(_10_ixi_$u$34){
return (function(){
var $pm = _10_isi_$u$33;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_is_$u$35,_10_ibs_$u$36){
return (function(){
var $pm = _10_ixi_$u$34;return (($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$ImportOpen.$tag))?((function(_10_imix_$u$37,_10_ann_$u$38,_10_f_$u$39,_10_ns_$u$40){
return (function(){
var $pm = (get(_10_f_$u$39))(_10_ms_$u$32);return ($pm.$tag==$$compiler$ast_jg$$ModuleInterface.$tag)?((function(_10___$u$41,_10_cs_$u$42,_10_bs_$u$43){
return (function(){
var $pm = ((foldl($$compiler$declasser_jg$$rewriteImportedBound(_10_imix_$u$37)))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray)))($$compiler$prelude_jg$$zipWithIndex(_10_bs_$u$43));return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_nas_$u$44,_10_nbs_$u$45){
return (function(){
var _10_cns_$u$46 = (map(function(_10_n_$u$47){
return ($$compiler$prelude_jg$$Pair(_10_n_$u$47))(_10_n_$u$47)}))(($$compiler$prelude_jg$$concatMap(function(_10_c_$u$48){
return (function(){
var $pm = _10_c_$u$48;return ($pm.$tag==$$compiler$ast_jg$$Class.$tag)?((function(_10___$u$49,_10_n_$u$50,_10___$u$51,_10_bs_$u$52){
return (enqueue($$compiler$declasser_jg$$className(_10_n_$u$50)))((map($$compiler$prelude_jg$$fst))(_10_bs_$u$52))})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}))(_10_cs_$u$42));return ($$compiler$prelude_jg$$Pair((push((($$compiler$ast_jg$$ImportOpen(_10_ann_$u$38))(_10_f_$u$39))((concat(_10_ns_$u$40))((concat(_10_nas_$u$44))(_10_cns_$u$46)))))(_10_is_$u$35)))((concat(_10_ibs_$u$36))(_10_nbs_$u$45))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()})($pm.$0,$pm.$1.$0,$pm.$1.$1,$pm.$1.$2)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}};
var $$compiler$declasser_jg$$className2 = function(_10_c_$u$323){
return (function(){
var $pm = _10_c_$u$323;return ($pm.$tag==$$compiler$ast_jg$$Class.$tag)?((function(_10___$u$324,_10_n_$u$325,_10___$u$326,_10___$u$327){
return $$compiler$declasser_jg$$className(_10_n_$u$325)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var $$compiler$declasser_jg$$rewriteClassToFun = function(_10_c_$u$69){
return (function(){
var $pm = _10_c_$u$69;return ($pm.$tag==$$compiler$ast_jg$$Class.$tag)?((function(_10___$u$70,_10___$u$71,_10___$u$72,_10_bs_$u$73){
return (function(){
var _10_name_$u$74 = $$compiler$declasser_jg$$className2(_10_c_$u$69);var _10_bsForPat_$u$75 = (map(function(_10_b_$u$77){
return ($$compiler$ast_jg$$PVar($$compiler$prelude_jg$$Empty))($$compiler$prelude_jg$$fst(_10_b_$u$77))}))(sort(_10_bs_$u$73));var _10_rewrite_$u$76 = function(_10_b_$u$78){
return (function(){
var $pm = _10_b_$u$78;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_n_$u$79,_10_t_$u$80){
return ($$compiler$prelude_jg$$Pair(_10_n_$u$79))(($$compiler$ast_jg$$setType(_10_t_$u$80))((($$compiler$ast_jg$$Lam($$compiler$prelude_jg$$Empty))("x"))((($$compiler$ast_jg$$Case($$compiler$prelude_jg$$Empty))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))("x")))($$compiler$prelude_jg$$arr1(($$compiler$prelude_jg$$Pair((($$compiler$ast_jg$$PData($$compiler$prelude_jg$$Empty))(_10_name_$u$74))(_10_bsForPat_$u$75)))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))(_10_n_$u$79)))))))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return (map(_10_rewrite_$u$76))($$compiler$typer_jg$$classToBindings(_10_c_$u$69))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var $$compiler$declasser_jg$$rewriteClassToData = function(_10_c_$u$62){
return (function(){
var $pm = _10_c_$u$62;return ($pm.$tag==$$compiler$ast_jg$$Class.$tag)?((function(_10___$u$63,_10_n_$u$64,_10_v_$u$65,_10___$u$66){
return (function(){
var _10_ps_$u$68 = (map($$compiler$prelude_jg$$snd))(sort($$compiler$typer_jg$$classToBindings(_10_c_$u$62)));var _10_name_$u$67 = $$compiler$declasser_jg$$className(_10_n_$u$64);return ((($$compiler$ast_jg$$Data($$compiler$prelude_jg$$Empty))(_10_name_$u$67))($$compiler$prelude_jg$$arr1(_10_v_$u$65)))($$compiler$prelude_jg$$arr1((($$compiler$ast_jg$$DataCon($$compiler$prelude_jg$$Empty))(_10_name_$u$67))(_10_ps_$u$68)))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var $$compiler$declasser_jg$$importsToTypeEnv = function(_10_ms_$u$287){
return function(_10_is_$u$288){
return (function(){
var _10_getFile_$u$289 = function(_10_i_$u$292){
return (function(){
var $pm = _10_i_$u$292;return ($pm.$tag==$$compiler$ast_jg$$ImportAll.$tag)?((function(_10___$u$293,_10_f_$u$294){
return _10_f_$u$294})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)?((function(_10___$u$295,_10_f_$u$296,_10___$u$297){
return _10_f_$u$296})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$ImportClosed.$tag)?((function(_10___$u$298,_10_f_$u$299,_10___$u$300){
return _10_f_$u$299})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))))})()};var _10_addClass_$u$290 = function(_10_env_$u$301){
return function(_10_c_$u$302){
return ((foldl(function(_10_env_$u$303){
return function(_10_b_$u$304){
return ((set($$compiler$prelude_jg$$fst(_10_b_$u$304)))($$compiler$prelude_jg$$snd(_10_b_$u$304)))(_10_env_$u$303)}}))(_10_env_$u$301))($$compiler$typer_jg$$classToBindings(_10_c_$u$302))}};var _10_addImports_$u$291 = function(_10_env_$u$305){
return function(_10_i_$u$306){
return (function(){
var $pm = (get(_10_getFile_$u$289(_10_i_$u$306)))(_10_ms_$u$287);return ($pm.$tag==$$compiler$ast_jg$$ModuleInterface.$tag)?((function(_10_bs_$u$307,_10_cs_$u$308,_10_is_$u$309){
return (function(){
var _10_env2_$u$310 = (function(){
var $pm = _10_i_$u$306;return ($pm.$tag==$$compiler$ast_jg$$ImportAll.$tag)?((function(_10___$u$312,_10_f_$u$313){
return (merge(_10_env_$u$305))(_10_bs_$u$307)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)?((function(_10___$u$314,_10_f_$u$315,_10_ns_$u$316){
return ((foldl(function(_10_env_$u$317){
return function(_10_n_$u$318){
return (function(){
var $pm = _10_n_$u$318;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_n_$u$319,_10_a_$u$320){
return ((set(_10_a_$u$320))((get(_10_n_$u$319))(_10_bs_$u$307)))(_10_env_$u$317)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(_10_env_$u$305))(_10_ns_$u$316)})($pm.$0,$pm.$1,$pm.$2)):((function(_10___$u$321){
return error("import type not supported in type inference")})($pm)))})();var _10_env3_$u$311 = ((foldl(_10_addClass_$u$290))(_10_env2_$u$310))(_10_cs_$u$308);return _10_env3_$u$311})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};return ((foldl(_10_addImports_$u$291))(empty))((enqueue(($$compiler$ast_jg$$ImportAll($$compiler$prelude_jg$$Empty))("./builtins.js")))(_10_is_$u$288))})()}};
var $$compiler$declasser_jg$$instanceName = function(_10_ix_$u$328){
return function(_10_i_$u$329){
return (function(){
var $pm = _10_i_$u$329;return ($pm.$tag==$$compiler$ast_jg$$Instance.$tag)?((function(_10___$u$330,_10_n_$u$331,_10___$u$332,_10___$u$333){
return ($concat(($concat(($concat("$instance$"))(_10_n_$u$331)))("$")))(intToString(_10_ix_$u$328))})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}};
var $$compiler$declasser_jg$$rewriteInstance = function(_10_is_$u$81){
return function(_10_env_$u$82){
return function(_10_ix_$u$83){
return function(_10_i_$u$84){
return (function(){
var $pm = _10_i_$u$84;return ($pm.$tag==$$compiler$ast_jg$$Instance.$tag)?((function(_10___$u$85,_10_n_$u$86,_10___$u$87,_10_bs_$u$88){
return (function(){
var _10_args_$u$90 = (map(($$compiler$declasser_jg$$rewriteExpr(_10_is_$u$81))(_10_env_$u$82)))((map($$compiler$prelude_jg$$snd))(sort(_10_bs_$u$88)));var _10_name_$u$89 = ($$compiler$declasser_jg$$instanceName(_10_ix_$u$83))(_10_i_$u$84);return ($$compiler$prelude_jg$$Pair(_10_name_$u$89))(((foldl($$compiler$ast_jg$$App($$compiler$prelude_jg$$Empty)))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))($$compiler$declasser_jg$$className(_10_n_$u$86))))(_10_args_$u$90))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()}}}};
var $$compiler$declasser_jg$$declassModule = function(_10_ms_$u$0){
return function(_10_m_$u$1){
return (function(){
var $pm = _10_m_$u$1;return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_10_ann_$u$2,_10_fn_$u$3,_10_is_$u$4,_10_dt_$u$5,_10_cs_$u$6,_10_ins_$u$7,_10_ds_$u$8){
return (function(){
var _10_isi_$u$9 = ((foldl($$compiler$declasser_jg$$rewriteImportedInstances(_10_ms_$u$0)))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray)))($$compiler$prelude_jg$$zipWithIndex(_10_is_$u$4));var _10_importedInstances_$u$11 = $$compiler$prelude_jg$$snd(_10_isi_$u$9);var _10_availableInstances_$u$14 = (concat(_10_importedInstances_$u$11))((map(function(_10_p_$u$21){
return (function(){
var $pm = _10_p_$u$21;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_ix_$u$22,_10_i_$u$23){
return ($$compiler$prelude_jg$$Pair(($$compiler$declasser_jg$$instanceName(_10_ix_$u$22))(_10_i_$u$23)))($$compiler$typer_jg$$instanceToTypeBound(_10_i_$u$23))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))($$compiler$prelude_jg$$zipWithIndex(_10_ins_$u$7)));var _10_classesAsData_$u$12 = (map($$compiler$declasser_jg$$rewriteClassToData))(_10_cs_$u$6);var _10_dt2_$u$15 = (concat(_10_dt_$u$5))(_10_classesAsData_$u$12);var _10_dataFuns_$u$16 = ($$compiler$prelude_jg$$concatMap($$compiler$typer_jg$$conTypes))(_10_dt2_$u$15);var _10_classFuns_$u$13 = ($$compiler$prelude_jg$$concatMap($$compiler$declasser_jg$$rewriteClassToFun))(_10_cs_$u$6);var _10_env_$u$17 = ((foldl(function(_10_env_$u$24){
return function(_10_b_$u$25){
return (function(){
var $pm = _10_b_$u$25;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_v_$u$26,_10_e_$u$27){
return ((set(_10_v_$u$26))($$compiler$ast_jg$$getType(_10_e_$u$27)))(_10_env_$u$24)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}}))(($$compiler$declasser_jg$$importsToTypeEnv(_10_ms_$u$0))(_10_is_$u$4)))((concat(_10_classFuns_$u$13))(_10_ds_$u$8));var _10_env2_$u$18 = (merge(_10_env_$u$17))($$compiler$prelude_jg$$toRecord(_10_dataFuns_$u$16));var _10_instancesAsDefs_$u$20 = (map(function(_10_p_$u$29){
return (function(){
var $pm = _10_p_$u$29;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_10_n_$u$30,_10_i_$u$31){
return ((($$compiler$declasser_jg$$rewriteInstance(_10_availableInstances_$u$14))(_10_env2_$u$18))(_10_n_$u$30))(_10_i_$u$31)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))($$compiler$prelude_jg$$zipWithIndex(_10_ins_$u$7));var _10_ds2_$u$19 = (map(function(_10_d_$u$28){
return ($$compiler$prelude_jg$$Pair($$compiler$prelude_jg$$fst(_10_d_$u$28)))((($$compiler$declasser_jg$$rewriteExpr(_10_availableInstances_$u$14))(_10_env2_$u$18))($$compiler$prelude_jg$$snd(_10_d_$u$28)))}))(_10_ds_$u$8);var _10_is2_$u$10 = $$compiler$prelude_jg$$fst(_10_isi_$u$9);return (((((($$compiler$ast_jg$$Module(_10_ann_$u$2))(_10_fn_$u$3))(_10_is2_$u$10))(_10_dt2_$u$15))(_10_cs_$u$6))(_10_ins_$u$7))((concat(_10_classFuns_$u$13))((concat(_10_instancesAsDefs_$u$20))(_10_ds2_$u$19)))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})()}};
var $instance$Eq$0 = $class$Eq(function(_9_a_$u$39){
return function(_9_b_$u$40){
return _9_a_$u$39===_9_b_$u$40}});
var $$compiler$args_jg$$getBool = function(_9_p_$u$29){
return function(_9_def_$u$30){
return (function(){
var $pm = _9_p_$u$29;return ($pm.$tag==$$compiler$args_jg$$ParsedArgs.$tag)?((function(_9___$u$31,_9_r_$u$32,_9_dfs_$u$33){
return (function(){
var $pm = (($$compiler$prelude_jg$$contains($instance$Eq$0))(_9_def_$u$30))(_9_dfs_$u$33);return (!$pm)?((function(){
return error("unrecognized arg that was not present for parsing")})()):($pm?((function(){
return (function(){
var $pm = _9_def_$u$30;return ($pm.$tag==$$compiler$args_jg$$ArgBool.$tag)?((function(_9_n_$u$34,_9_defaultVal_$u$35){
return (function(){
var $pm = (has(_9_n_$u$34))(_9_r_$u$32);return (!$pm)?((function(){
return (function(){
var $pm = _9_defaultVal_$u$35;return ($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_9_v_$u$36){
return _9_v_$u$36})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return error(($concat("no value for required arg "))(_9_n_$u$34))})()):(error("pattern match fail")))})()})()):($pm?((function(){
return (function(){
var $pm = (get(_9_n_$u$34))(_9_r_$u$32);return (""==$pm)?((function(){
return true})()):(("True"==$pm)?((function(){
return true})()):(("true"==$pm)?((function(){
return true})()):(("1"==$pm)?((function(){
return true})()):(("False"==$pm)?((function(){
return false})()):(("false"==$pm)?((function(){
return false})()):(("0"==$pm)?((function(){
return false})()):((function(_9_v_$u$37){
return error(($concat("invalid value for a bool argument: "))(_9_v_$u$37))})($pm))))))))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):((function(_9___$u$38){
return error("arg is not a bool")})($pm))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var $$compiler$args_jg$$getString = function(_9_p_$u$20){
return function(_9_def_$u$21){
return (function(){
var $pm = _9_p_$u$20;return ($pm.$tag==$$compiler$args_jg$$ParsedArgs.$tag)?((function(_9___$u$22,_9_r_$u$23,_9_dfs_$u$24){
return (function(){
var $pm = (($$compiler$prelude_jg$$contains($instance$Eq$0))(_9_def_$u$21))(_9_dfs_$u$24);return (!$pm)?((function(){
return error("unrecognized arg that was not present for parsing")})()):($pm?((function(){
return (function(){
var $pm = _9_def_$u$21;return ($pm.$tag==$$compiler$args_jg$$ArgString.$tag)?((function(_9_n_$u$25,_9_defaultVal_$u$26){
return (function(){
var $pm = (has(_9_n_$u$25))(_9_r_$u$23);return (!$pm)?((function(){
return (function(){
var $pm = _9_defaultVal_$u$26;return ($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_9_v_$u$27){
return _9_v_$u$27})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return error(($concat("no value for required arg "))(_9_n_$u$25))})()):(error("pattern match fail")))})()})()):($pm?((function(){
return (get(_9_n_$u$25))(_9_r_$u$23)})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):((function(_9___$u$28){
return error("arg is not a string")})($pm))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()}};
var $$compiler$args_jg$$getPositional = function(_9_p_$u$16){
return (function(){
var $pm = _9_p_$u$16;return ($pm.$tag==$$compiler$args_jg$$ParsedArgs.$tag)?((function(_9_p_$u$17,_9___$u$18,_9_dfs_$u$19){
return _9_p_$u$17})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var $$compiler$args_jg$$argName = function(_9_a_$u$0){
return (function(){
var $pm = _9_a_$u$0;return ($pm.$tag==$$compiler$args_jg$$ArgBool.$tag)?((function(_9_n_$u$1,_9___$u$2){
return _9_n_$u$1})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$args_jg$$ArgString.$tag)?((function(_9_n_$u$3,_9___$u$4){
return _9_n_$u$3})($pm.$0,$pm.$1)):(error("pattern match fail")))})()};
var $$compiler$args_jg$$parseArgs = function(_9_defs_$u$5){
return function(_9_argv_$u$6){
return (function(){
var _9_parse_$u$7 = function(_9_r_$u$8){
return function(_9_arg_$u$9){
return (function(){
var $pm = _9_r_$u$8;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_9_positional_$u$10,_9_args_$u$11){
return (function(){
var $pm = ($and((($eq$eq($instance$Eq$1))((getChar(0))(_9_arg_$u$9)))("-")))((($eq$eq($instance$Eq$1))((getChar(1))(_9_arg_$u$9)))("-"));return (!$pm)?((function(){
return ($$compiler$prelude_jg$$Pair((push(_9_arg_$u$9))(_9_positional_$u$10)))(_9_args_$u$11)})()):($pm?((function(){
return (function(){
var _9_value_$u$13 = (drop(1))((match("=.*"))(_9_arg_$u$9));var _9_name_$u$12 = (match("[^=]+"))((drop(2))(_9_arg_$u$9));return (function(){
var $pm = (($$compiler$prelude_jg$$contains($instance$Eq$1))(_9_name_$u$12))((map($$compiler$args_jg$$argName))(_9_defs_$u$5));return (!$pm)?((function(){
return error(($concat("unrecognized argument "))(_9_arg_$u$9))})()):($pm?((function(){
return ($$compiler$prelude_jg$$Pair(_9_positional_$u$10))(((set(_9_name_$u$12))(_9_value_$u$13))(_9_args_$u$11))})()):(error("pattern match fail")))})()})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};return (function(){
var $pm = ((foldl(_9_parse_$u$7))(($$compiler$prelude_jg$$Pair(emptyArray))(empty)))(_9_argv_$u$6);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_9_pos_$u$14,_9_args_$u$15){
return (($$compiler$args_jg$$ParsedArgs(_9_pos_$u$14))(_9_args_$u$15))(_9_defs_$u$5)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})()}};
var $$compiler$js$deadCode_jg$$tryDCE = function(_7_e_$u$0){
return (function(){
var $pm = _7_e_$u$0;return ((($pm.$tag==$$compiler$js$ast_jg$$JSBinOp.$tag)&&("&&"==$pm.$0))&&(($pm.$1.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&$pm.$1.$0))?((function(_7_e_$u$1){
return _7_e_$u$1})($pm.$2)):(((($pm.$tag==$$compiler$js$ast_jg$$JSBinOp.$tag)&&("&&"==$pm.$0))&&(($pm.$2.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&$pm.$2.$0))?((function(_7_e_$u$2){
return _7_e_$u$2})($pm.$1)):((($pm.$tag==$$compiler$js$ast_jg$$JSTernary.$tag)&&(($pm.$0.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&$pm.$0.$0))?((function(_7_a_$u$3,_7_b_$u$4){
return _7_a_$u$3})($pm.$1,$pm.$2)):((($pm.$tag==$$compiler$js$ast_jg$$JSTernary.$tag)&&(($pm.$0.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&(!$pm.$0.$0)))?((function(_7_a_$u$5,_7_b_$u$6){
return _7_b_$u$6})($pm.$1,$pm.$2)):((function(_7_e_$u$7){
return _7_e_$u$7})($pm)))))})()};
var $$compiler$js$deadCode_jg$$rewriteDCE = function(_7_e_$u$8){
return (function(){
var $pm = _7_e_$u$8;return ($pm.$tag==$$compiler$js$ast_jg$$JSIndex.$tag)?((function(_7_xs_$u$9,_7_i_$u$10){
return ($$compiler$js$ast_jg$$JSIndex($$compiler$js$deadCode_jg$$rewriteDCE(_7_xs_$u$9)))($$compiler$js$deadCode_jg$$rewriteDCE(_7_i_$u$10))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSBinOp.$tag)?((function(_7_op_$u$11,_7_a_$u$12,_7_b_$u$13){
return $$compiler$js$deadCode_jg$$tryDCE((($$compiler$js$ast_jg$$JSBinOp(_7_op_$u$11))($$compiler$js$deadCode_jg$$rewriteDCE(_7_a_$u$12)))($$compiler$js$deadCode_jg$$rewriteDCE(_7_b_$u$13)))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$js$ast_jg$$JSCall.$tag)?((function(_7_f_$u$14,_7_xs_$u$15){
return ($$compiler$js$ast_jg$$JSCall($$compiler$js$deadCode_jg$$rewriteDCE(_7_f_$u$14)))((map($$compiler$js$deadCode_jg$$rewriteDCE))(_7_xs_$u$15))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSFun.$tag)?((function(_7_ps_$u$16,_7_bs_$u$17){
return ($$compiler$js$ast_jg$$JSFun(_7_ps_$u$16))((map($$compiler$js$deadCode_jg$$rewriteStmt))(_7_bs_$u$17))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSTernary.$tag)?((function(_7_b_$u$18,_7_x_$u$19,_7_y_$u$20){
return $$compiler$js$deadCode_jg$$tryDCE((($$compiler$js$ast_jg$$JSTernary($$compiler$js$deadCode_jg$$rewriteDCE(_7_b_$u$18)))($$compiler$js$deadCode_jg$$rewriteDCE(_7_x_$u$19)))($$compiler$js$deadCode_jg$$rewriteDCE(_7_y_$u$20)))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$js$ast_jg$$JSObject.$tag)?((function(_7_kvs_$u$21){
return $$compiler$js$ast_jg$$JSObject((map(function(_7_kv_$u$22){
return (function(){
var $pm = _7_kv_$u$22;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_7_k_$u$23,_7_v_$u$24){
return ($$compiler$prelude_jg$$Pair(_7_k_$u$23))($$compiler$js$deadCode_jg$$rewriteDCE(_7_v_$u$24))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(_7_kvs_$u$21))})($pm.$0)):(($pm.$tag==$$compiler$js$ast_jg$$JSInstanceOf.$tag)?((function(_7_x_$u$25,_7_c_$u$26){
return ($$compiler$js$ast_jg$$JSInstanceOf($$compiler$js$deadCode_jg$$rewriteDCE(_7_x_$u$25)))($$compiler$js$deadCode_jg$$rewriteDCE(_7_c_$u$26))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSNew.$tag)?((function(_7_c_$u$27,_7_xs_$u$28){
return ($$compiler$js$ast_jg$$JSNew($$compiler$js$deadCode_jg$$rewriteDCE(_7_c_$u$27)))((map($$compiler$js$deadCode_jg$$rewriteDCE))(_7_xs_$u$28))})($pm.$0,$pm.$1)):((function(_7_e_$u$29){
return _7_e_$u$29})($pm)))))))))})()};
var $$compiler$js$deadCode_jg$$rewriteStmt = function(_7_s_$u$30){
return (function(){
var $pm = _7_s_$u$30;return ($pm.$tag==$$compiler$js$ast_jg$$JSExpr.$tag)?((function(_7_e_$u$31){
return $$compiler$js$ast_jg$$JSExpr($$compiler$js$deadCode_jg$$rewriteDCE(_7_e_$u$31))})($pm.$0)):(($pm.$tag==$$compiler$js$ast_jg$$JSReturn.$tag)?((function(_7_e_$u$32){
return $$compiler$js$ast_jg$$JSReturn($$compiler$js$deadCode_jg$$rewriteDCE(_7_e_$u$32))})($pm.$0)):(($pm.$tag==$$compiler$js$ast_jg$$JSVar.$tag)?((function(_7_n_$u$33,_7_v_$u$34){
return ($$compiler$js$ast_jg$$JSVar(_7_n_$u$33))($$compiler$js$deadCode_jg$$rewriteDCE(_7_v_$u$34))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSAssign.$tag)?((function(_7_l_$u$35,_7_r_$u$36){
return ($$compiler$js$ast_jg$$JSAssign($$compiler$js$deadCode_jg$$rewriteDCE(_7_l_$u$35)))($$compiler$js$deadCode_jg$$rewriteDCE(_7_r_$u$36))})($pm.$0,$pm.$1)):((function(_7_s_$u$37){
return _7_s_$u$37})($pm)))))})()};
var $$compiler$js$printer_jg$$paren = function(_6_s_$u$54){
return ($concat(($concat("("))(_6_s_$u$54)))(")")};
var $$compiler$js$printer_jg$$jsExprToString = function(_6_e_$u$0){
return (function(){
var $pm = _6_e_$u$0;return ($pm.$tag==$$compiler$js$ast_jg$$JSNull.$tag)?((function(){
return "null"})()):(($pm.$tag==$$compiler$js$ast_jg$$JSUndefined.$tag)?((function(){
return "undefined"})()):((($pm.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&$pm.$0)?((function(){
return "true"})()):((($pm.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&(!$pm.$0))?((function(){
return "false"})()):(($pm.$tag==$$compiler$js$ast_jg$$JSNum.$tag)?((function(_6_n_$u$1){
return jsonStringify(_6_n_$u$1)})($pm.$0)):(($pm.$tag==$$compiler$js$ast_jg$$JSString.$tag)?((function(_6_s_$u$2){
return jsonStringify(_6_s_$u$2)})($pm.$0)):((($pm.$tag==$$compiler$js$ast_jg$$JSRef.$tag)&&("+"==$pm.$0))?((function(){
return "$add"})()):((($pm.$tag==$$compiler$js$ast_jg$$JSRef.$tag)&&("-"==$pm.$0))?((function(){
return "$del"})()):((($pm.$tag==$$compiler$js$ast_jg$$JSRef.$tag)&&("*"==$pm.$0))?((function(){
return "$mul"})()):((($pm.$tag==$$compiler$js$ast_jg$$JSRef.$tag)&&("<"==$pm.$0))?((function(){
return "$lt"})()):((($pm.$tag==$$compiler$js$ast_jg$$JSRef.$tag)&&(">"==$pm.$0))?((function(){
return "$gt"})()):((($pm.$tag==$$compiler$js$ast_jg$$JSRef.$tag)&&("=="==$pm.$0))?((function(){
return "$eq"})()):((($pm.$tag==$$compiler$js$ast_jg$$JSRef.$tag)&&("/="==$pm.$0))?((function(){
return "$neq"})()):((($pm.$tag==$$compiler$js$ast_jg$$JSRef.$tag)&&("&&"==$pm.$0))?((function(){
return "$and"})()):((($pm.$tag==$$compiler$js$ast_jg$$JSRef.$tag)&&("||"==$pm.$0))?((function(){
return "$or"})()):((($pm.$tag==$$compiler$js$ast_jg$$JSRef.$tag)&&("++"==$pm.$0))?((function(){
return "$concat"})()):(($pm.$tag==$$compiler$js$ast_jg$$JSRef.$tag)?((function(_6_v_$u$3){
return _6_v_$u$3})($pm.$0)):((($pm.$tag==$$compiler$js$ast_jg$$JSIndex.$tag)&&($pm.$1.$tag==$$compiler$js$ast_jg$$JSString.$tag))?((function(_6_xs_$u$4,_6_i_$u$5){
return (function(){
var $pm = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))(_6_i_$u$5);return (""==$pm)?((function(){
return ($concat(($concat(($concat($$compiler$js$printer_jg$$jsExprToParenString(_6_xs_$u$4)))("[")))(_6_i_$u$5)))("]")})()):((function(_6_i_$u$6){
return ($concat(($concat($$compiler$js$printer_jg$$jsExprToParenString(_6_xs_$u$4)))(".")))(_6_i_$u$6)})($pm))})()})($pm.$0,$pm.$1.$0)):(($pm.$tag==$$compiler$js$ast_jg$$JSIndex.$tag)?((function(_6_xs_$u$7,_6_i_$u$8){
return ($concat(($concat(($concat($$compiler$js$printer_jg$$jsExprToParenString(_6_xs_$u$7)))("[")))($$compiler$js$printer_jg$$jsExprToString(_6_i_$u$8))))("]")})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSUnOp.$tag)?((function(_6_op_$u$9,_6_e_$u$10){
return ($concat(_6_op_$u$9))($$compiler$js$printer_jg$$jsExprToParenString(_6_e_$u$10))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSBinOp.$tag)?((function(_6_op_$u$11,_6_a_$u$12,_6_b_$u$13){
return ($concat(($concat($$compiler$js$printer_jg$$jsExprToParenString(_6_a_$u$12)))(_6_op_$u$11)))($$compiler$js$printer_jg$$jsExprToParenString(_6_b_$u$13))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$js$ast_jg$$JSCall.$tag)?((function(_6_f_$u$14,_6_xs_$u$15){
return ($concat($$compiler$js$printer_jg$$jsExprToParenString(_6_f_$u$14)))($$compiler$js$printer_jg$$paren((intercalate(","))((map($$compiler$js$printer_jg$$jsExprToString))(_6_xs_$u$15))))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSNew.$tag)?((function(_6_c_$u$16,_6_xs_$u$17){
return ($concat(($concat("new "))($$compiler$js$printer_jg$$jsExprToParenString(_6_c_$u$16))))($$compiler$js$printer_jg$$paren((intercalate(","))((map($$compiler$js$printer_jg$$jsExprToString))(_6_xs_$u$17))))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSFun.$tag)?((function(_6_ps_$u$18,_6_bs_$u$19){
return ($concat(($concat(($concat(($concat("function("))((intercalate(","))(_6_ps_$u$18))))("){\n")))((intercalate(";"))((map($$compiler$js$printer_jg$$jsStmtToString))(_6_bs_$u$19)))))("}")})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSTernary.$tag)?((function(_6_b_$u$20,_6_x_$u$21,_6_y_$u$22){
return ($concat(($concat(($concat(($concat($$compiler$js$printer_jg$$jsExprToParenString(_6_b_$u$20)))("?")))($$compiler$js$printer_jg$$jsExprToParenString(_6_x_$u$21))))(":")))($$compiler$js$printer_jg$$jsExprToParenString(_6_y_$u$22))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$js$ast_jg$$JSObject.$tag)?((function(_6_kvs_$u$23){
return ($concat(($concat("{"))((intercalate(","))((map($$compiler$js$printer_jg$$keyValueToString))(_6_kvs_$u$23)))))("}")})($pm.$0)):(($pm.$tag==$$compiler$js$ast_jg$$JSInstanceOf.$tag)?((function(_6_x_$u$24,_6_c_$u$25){
return ($concat(($concat($$compiler$js$printer_jg$$jsExprToParenString(_6_x_$u$24)))(" instanceof ")))($$compiler$js$printer_jg$$jsExprToParenString(_6_c_$u$25))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSSeq.$tag)?((function(_6_es_$u$26){
return (intercalate(","))((map($$compiler$js$printer_jg$$jsExprToString))(_6_es_$u$26))})($pm.$0)):((function(_6_e_$u$27){
return error(_6_e_$u$27)})($pm)))))))))))))))))))))))))))))})()};
var $$compiler$js$printer_jg$$jsExprToParenString = function(_6_e_$u$28){
return (function(){
var $pm = _6_e_$u$28;return ($pm.$tag==$$compiler$js$ast_jg$$JSRef.$tag)?((function(_6_r_$u$29){
return $$compiler$js$printer_jg$$jsExprToString(_6_e_$u$28)})($pm.$0)):(($pm.$tag==$$compiler$js$ast_jg$$JSNum.$tag)?((function(_6_n_$u$30){
return $$compiler$js$printer_jg$$jsExprToString(_6_e_$u$28)})($pm.$0)):(($pm.$tag==$$compiler$js$ast_jg$$JSString.$tag)?((function(_6_s_$u$31){
return $$compiler$js$printer_jg$$jsExprToString(_6_e_$u$28)})($pm.$0)):(($pm.$tag==$$compiler$js$ast_jg$$JSBool.$tag)?((function(_6_b_$u$32){
return $$compiler$js$printer_jg$$jsExprToString(_6_e_$u$28)})($pm.$0)):(($pm.$tag==$$compiler$js$ast_jg$$JSIndex.$tag)?((function(_6_xs_$u$33,_6_i_$u$34){
return $$compiler$js$printer_jg$$jsExprToString(_6_e_$u$28)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSNew.$tag)?((function(_6_c_$u$35,_6_xs_$u$36){
return $$compiler$js$printer_jg$$jsExprToString(_6_e_$u$28)})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSObject.$tag)?((function(_6_kvs_$u$37){
return $$compiler$js$printer_jg$$jsExprToString(_6_e_$u$28)})($pm.$0)):((function(_6_e_$u$38){
return $$compiler$js$printer_jg$$paren($$compiler$js$printer_jg$$jsExprToString(_6_e_$u$38))})($pm))))))))})()};
var $$compiler$js$printer_jg$$keyValueToString = function(_6_kv_$u$39){
return (function(){
var $pm = _6_kv_$u$39;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_6_k_$u$40,_6_v_$u$41){
return ($concat(($concat(_6_k_$u$40))(":")))($$compiler$js$printer_jg$$jsExprToString(_6_v_$u$41))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var $$compiler$js$printer_jg$$jsStmtToString = function(_6_s_$u$42){
return (function(){
var $pm = _6_s_$u$42;return ($pm.$tag==$$compiler$js$ast_jg$$JSExpr.$tag)?((function(_6_e_$u$43){
return $$compiler$js$printer_jg$$jsExprToString(_6_e_$u$43)})($pm.$0)):(($pm.$tag==$$compiler$js$ast_jg$$JSReturn.$tag)?((function(_6_e_$u$44){
return ($concat("return "))($$compiler$js$printer_jg$$jsExprToString(_6_e_$u$44))})($pm.$0)):(($pm.$tag==$$compiler$js$ast_jg$$JSVar.$tag)?((function(_6_v_$u$45,_6_e_$u$46){
return ($concat(($concat(($concat("var "))(_6_v_$u$45)))(" = ")))($$compiler$js$printer_jg$$jsExprToString(_6_e_$u$46))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSBreak.$tag)?((function(){
return "break"})()):(($pm.$tag==$$compiler$js$ast_jg$$JSSwitch.$tag)?((function(_6_e_$u$47,_6_cs_$u$48){
return ($concat(($concat(($concat(($concat("switch"))($$compiler$js$printer_jg$$paren($$compiler$js$printer_jg$$jsExprToString(_6_e_$u$47)))))("{")))((intercalate(";\n"))((map($$compiler$js$printer_jg$$caseToString))(_6_cs_$u$48)))))("}")})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$js$ast_jg$$JSAssign.$tag)?((function(_6_l_$u$49,_6_r_$u$50){
return ($concat(($concat($$compiler$js$printer_jg$$jsExprToParenString(_6_l_$u$49)))(" = ")))($$compiler$js$printer_jg$$jsExprToParenString(_6_r_$u$50))})($pm.$0,$pm.$1)):(error("pattern match fail")))))))})()};
var $$compiler$js$printer_jg$$caseToString = function(_6_c_$u$51){
return (function(){
var $pm = _6_c_$u$51;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_6_m_$u$52,_6_ss_$u$53){
return ($concat(($concat(($concat("case "))($$compiler$js$printer_jg$$paren($$compiler$js$printer_jg$$jsExprToString(_6_m_$u$52)))))(":\n  ")))((intercalate(";"))((map($$compiler$js$printer_jg$$jsStmtToString))(_6_ss_$u$53)))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var $$compiler$js$jaguarToJs_jg$$opChar = function(_5_c_$u$153){
return (function(){
var $pm = _5_c_$u$153;return ("-"==$pm)?((function(){
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
return "$rof"})()):((function(_5___$u$154){
return _5_c_$u$153})($pm))))))))))))})()};
var $$compiler$js$jaguarToJs_jg$$opName = function(_5_op_$u$149){
return (function(){
var $pm = _5_op_$u$149;return ("+"==$pm)?((function(){
return "$add"})()):(("-"==$pm)?((function(){
return "$del"})()):(("*"==$pm)?((function(){
return "$mul"})()):(("&&"==$pm)?((function(){
return "$and"})()):(("||"==$pm)?((function(){
return "$or"})()):(("++"==$pm)?((function(){
return "$concat"})()):((function(_5_nonOp_$u$150){
return ((foldl(function(_5_s_$u$151){
return function(_5_c_$u$152){
return ($concat(_5_s_$u$151))($$compiler$js$jaguarToJs_jg$$opChar(_5_c_$u$152))}}))(""))($$compiler$prelude_jg$$strToArray(_5_nonOp_$u$150))})($pm)))))))})()};
var $$compiler$js$jaguarToJs_jg$$processPattern = function(_5_pm_$u$78){
return function(_5_p_$u$79){
return (function(){
var $pm = _5_p_$u$79;return (($pm.$tag==$$compiler$ast_jg$$PVar.$tag)&&("_"==$pm.$1))?((function(_5___$u$80){
return ($$compiler$prelude_jg$$Pair($$compiler$js$ast_jg$$JSBool(true)))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray))})($pm.$0)):(($pm.$tag==$$compiler$ast_jg$$PVar.$tag)?((function(_5___$u$81,_5_v_$u$82){
return ($$compiler$prelude_jg$$Pair($$compiler$js$ast_jg$$JSBool(true)))(($$compiler$prelude_jg$$Pair($$compiler$prelude_jg$$arr1($$compiler$js$jaguarToJs_jg$$opName(_5_v_$u$82))))($$compiler$prelude_jg$$arr1(_5_pm_$u$78)))})($pm.$0,$pm.$1)):((($pm.$tag==$$compiler$ast_jg$$PConst.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$CNum.$tag))?((function(_5___$u$83,_5_n_$u$84){
return ($$compiler$prelude_jg$$Pair((($$compiler$js$ast_jg$$JSBinOp("=="))($$compiler$js$ast_jg$$JSNum(_5_n_$u$84)))(_5_pm_$u$78)))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray))})($pm.$0,$pm.$1.$0)):((($pm.$tag==$$compiler$ast_jg$$PConst.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$CStr.$tag))?((function(_5___$u$85,_5_s_$u$86){
return ($$compiler$prelude_jg$$Pair((($$compiler$js$ast_jg$$JSBinOp("=="))($$compiler$js$ast_jg$$JSString(_5_s_$u$86)))(_5_pm_$u$78)))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray))})($pm.$0,$pm.$1.$0)):((($pm.$tag==$$compiler$ast_jg$$PData.$tag)&&("True"==$pm.$1))?((function(_5___$u$87,_5_ps_$u$88){
return ($$compiler$prelude_jg$$Pair(_5_pm_$u$78))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray))})($pm.$0,$pm.$2)):((($pm.$tag==$$compiler$ast_jg$$PData.$tag)&&("False"==$pm.$1))?((function(_5___$u$89,_5_ps_$u$90){
return ($$compiler$prelude_jg$$Pair(($$compiler$js$ast_jg$$JSUnOp("!"))(_5_pm_$u$78)))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray))})($pm.$0,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$PData.$tag)?((function(_5___$u$91,_5_t_$u$92,_5_ps_$u$93){
return ((foldl(function(_5_a_$u$94){
return function(_5_b_$u$95){
return (function(){
var $pm = _5_a_$u$94;return (($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)&&($pm.$1.$tag==$$compiler$prelude_jg$$Pair.$tag))?((function(_5_fa_$u$96,_5_na_$u$97,_5_va_$u$98){
return (function(){
var $pm = _5_b_$u$95;return (($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)&&($pm.$1.$tag==$$compiler$prelude_jg$$Pair.$tag))?((function(_5_fb_$u$99,_5_nb_$u$100,_5_vb_$u$101){
return ($$compiler$prelude_jg$$Pair((($$compiler$js$ast_jg$$JSBinOp("&&"))(_5_fa_$u$96))(_5_fb_$u$99)))(($$compiler$prelude_jg$$Pair((concat(_5_na_$u$97))(_5_nb_$u$100)))((concat(_5_va_$u$98))(_5_vb_$u$101)))})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()}}))(($$compiler$prelude_jg$$Pair((($$compiler$js$ast_jg$$JSBinOp("=="))(($$compiler$js$ast_jg$$JSIndex(_5_pm_$u$78))($$compiler$js$ast_jg$$JSString("$tag"))))(($$compiler$js$ast_jg$$JSIndex($$compiler$js$ast_jg$$JSRef(_5_t_$u$92)))($$compiler$js$ast_jg$$JSString("$tag")))))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray))))((map(function(_5_p_$u$102){
return (function(){
var $pm = _5_p_$u$102;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_5_n_$u$103,_5_pat_$u$104){
return ($$compiler$js$jaguarToJs_jg$$processPattern(($$compiler$js$ast_jg$$JSIndex(_5_pm_$u$78))($$compiler$js$ast_jg$$JSString(($concat("$"))(intToString(_5_n_$u$103))))))(_5_pat_$u$104)})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))($$compiler$prelude_jg$$zipWithIndex(_5_ps_$u$93)))})($pm.$0,$pm.$1,$pm.$2)):((function(_5_z_$u$105){
return error("failure to match pattern during processing")})($pm))))))))})()}};
var $$compiler$js$jaguarToJs_jg$$binOp = function(_5_op_$u$0){
return function(_5_a_$u$1){
return function(_5_b_$u$2){
return (($$compiler$js$ast_jg$$JSBinOp(_5_op_$u$0))($$compiler$js$jaguarToJs_jg$$jaguarExprToJsExpr(_5_a_$u$1)))($$compiler$js$jaguarToJs_jg$$jaguarExprToJsExpr(_5_b_$u$2))}}};
var $$compiler$js$jaguarToJs_jg$$jaguarExprToJsExpr = function(_5_e_$u$3){
return (function(){
var $pm = _5_e_$u$3;return (($pm.$tag==$$compiler$ast_jg$$Var.$tag)&&("True"==$pm.$1))?((function(_5___$u$4){
return $$compiler$js$ast_jg$$JSBool(true)})($pm.$0)):((($pm.$tag==$$compiler$ast_jg$$Var.$tag)&&("False"==$pm.$1))?((function(_5___$u$5){
return $$compiler$js$ast_jg$$JSBool(false)})($pm.$0)):(($pm.$tag==$$compiler$ast_jg$$Var.$tag)?((function(_5___$u$6,_5_v_$u$7){
return $$compiler$js$ast_jg$$JSRef($$compiler$js$jaguarToJs_jg$$opName(_5_v_$u$7))})($pm.$0,$pm.$1)):((($pm.$tag==$$compiler$ast_jg$$Const.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$CNum.$tag))?((function(_5___$u$8,_5_n_$u$9){
return $$compiler$js$ast_jg$$JSNum(_5_n_$u$9)})($pm.$0,$pm.$1.$0)):((($pm.$tag==$$compiler$ast_jg$$Const.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$CStr.$tag))?((function(_5___$u$10,_5_s_$u$11){
return $$compiler$js$ast_jg$$JSString(_5_s_$u$11)})($pm.$0,$pm.$1.$0)):((($pm.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("+"==$pm.$1.$1.$1))))?((function(_5___$u$12,_5___$u$13,_5___$u$14,_5_a_$u$15,_5_b_$u$16){
return (($$compiler$js$jaguarToJs_jg$$binOp("+"))(_5_a_$u$15))(_5_b_$u$16)})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):((($pm.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("-"==$pm.$1.$1.$1))))?((function(_5___$u$17,_5___$u$18,_5___$u$19,_5_a_$u$20,_5_b_$u$21){
return (($$compiler$js$jaguarToJs_jg$$binOp("-"))(_5_a_$u$20))(_5_b_$u$21)})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):((($pm.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("*"==$pm.$1.$1.$1))))?((function(_5___$u$22,_5___$u$23,_5___$u$24,_5_a_$u$25,_5_b_$u$26){
return (($$compiler$js$jaguarToJs_jg$$binOp("*"))(_5_a_$u$25))(_5_b_$u$26)})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):((($pm.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("jsLt"==$pm.$1.$1.$1))))?((function(_5___$u$27,_5___$u$28,_5___$u$29,_5_a_$u$30,_5_b_$u$31){
return (($$compiler$js$jaguarToJs_jg$$binOp("<"))(_5_a_$u$30))(_5_b_$u$31)})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):((($pm.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("jsEq"==$pm.$1.$1.$1))))?((function(_5___$u$32,_5___$u$33,_5___$u$34,_5_a_$u$35,_5_b_$u$36){
return (($$compiler$js$jaguarToJs_jg$$binOp("==="))(_5_a_$u$35))(_5_b_$u$36)})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):((($pm.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("bitAnd"==$pm.$1.$1.$1))))?((function(_5___$u$37,_5___$u$38,_5___$u$39,_5_a_$u$40,_5_b_$u$41){
return (($$compiler$js$jaguarToJs_jg$$binOp("&"))(_5_a_$u$40))(_5_b_$u$41)})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):((($pm.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("bitOr"==$pm.$1.$1.$1))))?((function(_5___$u$42,_5___$u$43,_5___$u$44,_5_a_$u$45,_5_b_$u$46){
return (($$compiler$js$jaguarToJs_jg$$binOp("|"))(_5_a_$u$45))(_5_b_$u$46)})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):((($pm.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("bitShiftLeft"==$pm.$1.$1.$1))))?((function(_5___$u$47,_5___$u$48,_5___$u$49,_5_a_$u$50,_5_b_$u$51){
return (($$compiler$js$jaguarToJs_jg$$binOp("<<"))(_5_a_$u$50))(_5_b_$u$51)})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):((($pm.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($pm.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("bitShiftRight"==$pm.$1.$1.$1))))?((function(_5___$u$52,_5___$u$53,_5___$u$54,_5_a_$u$55,_5_b_$u$56){
return (($$compiler$js$jaguarToJs_jg$$binOp(">>>"))(_5_a_$u$55))(_5_b_$u$56)})($pm.$0,$pm.$1.$0,$pm.$1.$1.$0,$pm.$1.$2,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$App.$tag)?((function(_5___$u$57,_5_f_$u$58,_5_a_$u$59){
return ($$compiler$js$ast_jg$$JSCall($$compiler$js$jaguarToJs_jg$$jaguarExprToJsExpr(_5_f_$u$58)))($$compiler$prelude_jg$$arr1($$compiler$js$jaguarToJs_jg$$jaguarExprToJsExpr(_5_a_$u$59)))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_5___$u$60,_5_p_$u$61,_5_e_$u$62){
return ($$compiler$js$ast_jg$$JSFun($$compiler$prelude_jg$$arr1(_5_p_$u$61)))($$compiler$prelude_jg$$arr1($$compiler$js$ast_jg$$JSReturn($$compiler$js$jaguarToJs_jg$$jaguarExprToJsExpr(_5_e_$u$62))))})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Case.$tag)?((function(_5___$u$63,_5_e_$u$64,_5_ps_$u$65){
return ($$compiler$js$ast_jg$$JSCall(($$compiler$js$ast_jg$$JSFun(emptyArray))(($$compiler$prelude_jg$$arr2(($$compiler$js$ast_jg$$JSVar("$pm"))($$compiler$js$jaguarToJs_jg$$jaguarExprToJsExpr(_5_e_$u$64))))($$compiler$js$ast_jg$$JSReturn(((foldr($$compiler$js$jaguarToJs_jg$$assemblePatternMatch))(($$compiler$js$ast_jg$$JSCall($$compiler$js$ast_jg$$JSRef("error")))($$compiler$prelude_jg$$arr1($$compiler$js$ast_jg$$JSString("pattern match fail")))))(_5_ps_$u$65))))))(emptyArray)})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$Let.$tag)?((function(_5___$u$66,_5_ds_$u$67,_5_e_$u$68){
return ($$compiler$js$ast_jg$$JSCall(($$compiler$js$ast_jg$$JSFun(emptyArray))((push($$compiler$js$ast_jg$$JSReturn($$compiler$js$jaguarToJs_jg$$jaguarExprToJsExpr(_5_e_$u$68))))((map($$compiler$js$jaguarToJs_jg$$defToJs))(_5_ds_$u$67)))))(emptyArray)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail")))))))))))))))))))})()};
var $$compiler$js$jaguarToJs_jg$$assemblePatternMatch = function(_5_alt_$u$69){
return function(_5_p_$u$70){
return (function(){
var $pm = _5_p_$u$70;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_5_pat_$u$71,_5_e_$u$72){
return (function(){
var $pm = ($$compiler$js$jaguarToJs_jg$$processPattern($$compiler$js$ast_jg$$JSRef("$pm")))(_5_pat_$u$71);return (($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)&&($pm.$1.$tag==$$compiler$prelude_jg$$Pair.$tag))?((function(_5_f_$u$73,_5_ns_$u$74,_5_vs_$u$75){
return (($$compiler$js$ast_jg$$JSTernary(_5_f_$u$73))(($$compiler$js$ast_jg$$JSCall(($$compiler$js$ast_jg$$JSFun(_5_ns_$u$74))($$compiler$prelude_jg$$arr1($$compiler$js$ast_jg$$JSReturn($$compiler$js$jaguarToJs_jg$$jaguarExprToJsExpr(_5_e_$u$72))))))(_5_vs_$u$75)))(_5_alt_$u$69)})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};
var $$compiler$js$jaguarToJs_jg$$defToJs = function(_5_p_$u$106){
return (function(){
var $pm = _5_p_$u$106;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_5_n_$u$107,_5_e_$u$108){
return ($$compiler$js$ast_jg$$JSVar($$compiler$js$jaguarToJs_jg$$opName(_5_n_$u$107)))($$compiler$js$jaguarToJs_jg$$jaguarExprToJsExpr(_5_e_$u$108))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var $$compiler$js$jaguarToJs_jg$$requireExpr = function(_5_f_$u$109){
return ($$compiler$js$ast_jg$$JSCall($$compiler$js$ast_jg$$JSRef("_require")))($$compiler$prelude_jg$$arr1($$compiler$js$ast_jg$$JSString(_5_f_$u$109)))};
var $$compiler$js$jaguarToJs_jg$$buildImports = function(_5_f_$u$110){
return function(_5_ns_$u$111){
return (map(function(_5_n_$u$112){
return (function(){
var $pm = _5_n_$u$112;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_5_n_$u$113,_5_a_$u$114){
return ($$compiler$js$ast_jg$$JSVar($$compiler$js$jaguarToJs_jg$$opName(_5_a_$u$114)))(($$compiler$js$ast_jg$$JSIndex($$compiler$js$jaguarToJs_jg$$requireExpr(_5_f_$u$110)))($$compiler$js$ast_jg$$JSString($$compiler$js$jaguarToJs_jg$$opName(_5_n_$u$113))))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}))(_5_ns_$u$111)}};
var $$compiler$js$jaguarToJs_jg$$importToJs = function(_5_i_$u$115){
return (function(){
var $pm = _5_i_$u$115;return ($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)?((function(_5___$u$116,_5_f_$u$117,_5_ns_$u$118){
return ($$compiler$js$jaguarToJs_jg$$buildImports(_5_f_$u$117))(_5_ns_$u$118)})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var $$compiler$js$jaguarToJs_jg$$checkUndefined = function(_5_label_$u$76){
return function(_5_expr_$u$77){
return (($$compiler$js$ast_jg$$JSTernary((($$compiler$js$ast_jg$$JSBinOp("==="))(_5_expr_$u$77))($$compiler$js$ast_jg$$JSUndefined)))(($$compiler$js$ast_jg$$JSCall($$compiler$js$ast_jg$$JSRef("error")))($$compiler$prelude_jg$$arr1($$compiler$js$ast_jg$$JSString(_5_label_$u$76)))))(_5_expr_$u$77)}};
var $$compiler$js$jaguarToJs_jg$$dataConFieldIds = function(_5_ts_$u$119){
return (map(function(_5_p_$u$120){
return ($concat("$"))(intToString($$compiler$prelude_jg$$fst(_5_p_$u$120)))}))($$compiler$prelude_jg$$zipWithIndex(_5_ts_$u$119))};
var $$compiler$js$jaguarToJs_jg$$dataConToJs = function(_5_dc_$u$121){
return (function(){
var $pm = _5_dc_$u$121;return ($pm.$tag==$$compiler$ast_jg$$DataCon.$tag)?((function(_5___$u$122,_5_n_$u$123,_5_ts_$u$124){
return (function(){
var _5_conName_$u$125 = ($concat("$"))(_5_n_$u$123);return (($$compiler$prelude_jg$$arr3(($$compiler$js$ast_jg$$JSVar(_5_conName_$u$125))(($$compiler$js$ast_jg$$JSFun($$compiler$js$jaguarToJs_jg$$dataConFieldIds(_5_ts_$u$124)))((push($$compiler$js$ast_jg$$JSExpr((($$compiler$js$ast_jg$$JSBinOp("="))(($$compiler$js$ast_jg$$JSIndex($$compiler$js$ast_jg$$JSRef("this")))($$compiler$js$ast_jg$$JSString("$tag"))))($$compiler$js$ast_jg$$JSString(_5_n_$u$123)))))((map(function(_5_f_$u$126){
return $$compiler$js$ast_jg$$JSExpr((($$compiler$js$ast_jg$$JSBinOp("="))(($$compiler$js$ast_jg$$JSIndex($$compiler$js$ast_jg$$JSRef("this")))($$compiler$js$ast_jg$$JSString(_5_f_$u$126))))(($$compiler$prelude_jg$$$($$compiler$js$jaguarToJs_jg$$checkUndefined("con")))($$compiler$js$ast_jg$$JSRef(_5_f_$u$126))))}))($$compiler$js$jaguarToJs_jg$$dataConFieldIds(_5_ts_$u$124)))))))(($$compiler$js$ast_jg$$JSVar(_5_n_$u$123))(((foldr(function(_5_b_$u$127){
return function(_5_f_$u$128){
return ($$compiler$js$ast_jg$$JSFun($$compiler$prelude_jg$$arr1(_5_f_$u$128)))($$compiler$prelude_jg$$arr1($$compiler$js$ast_jg$$JSReturn(_5_b_$u$127)))}}))(($$compiler$js$ast_jg$$JSNew($$compiler$js$ast_jg$$JSRef(_5_conName_$u$125)))((map($$compiler$js$ast_jg$$JSRef))($$compiler$js$jaguarToJs_jg$$dataConFieldIds(_5_ts_$u$124)))))($$compiler$js$jaguarToJs_jg$$dataConFieldIds(_5_ts_$u$124)))))(($$compiler$js$ast_jg$$JSAssign(($$compiler$js$ast_jg$$JSIndex($$compiler$js$ast_jg$$JSRef(_5_n_$u$123)))($$compiler$js$ast_jg$$JSString("$tag"))))($$compiler$js$ast_jg$$JSString(_5_n_$u$123)))})()})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))})()};
var $$compiler$js$jaguarToJs_jg$$dataToJs = function(_5_d_$u$129){
return (function(){
var $pm = _5_d_$u$129;return ($pm.$tag==$$compiler$ast_jg$$Data.$tag)?((function(_5___$u$130,_5_n_$u$131,_5_ps_$u$132,_5_cs_$u$133){
return ($$compiler$prelude_jg$$concatMap($$compiler$js$jaguarToJs_jg$$dataConToJs))(_5_cs_$u$133)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};
var $$compiler$js$jaguarToJs_jg$$exportObject = function(_5_m_$u$134){
return $$compiler$js$ast_jg$$JSObject((map(function(_5_n_$u$135){
return ($$compiler$prelude_jg$$Pair($$compiler$js$jaguarToJs_jg$$opName(_5_n_$u$135)))($$compiler$js$ast_jg$$JSRef($$compiler$js$jaguarToJs_jg$$opName(_5_n_$u$135)))}))($$compiler$ast_jg$$getExports(_5_m_$u$134)))};
var $$compiler$js$jaguarToJs_jg$$moduleToJs = function(_5_importSymbols_$u$136){
return function(_5_m_$u$137){
return (function(){
var $pm = _5_m_$u$137;return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_5___$u$138,_5___$u$139,_5_is_$u$140,_5_ds_$u$141,_5_cs_$u$142,_5_ins_$u$143,_5_vs_$u$144){
return (function(){
var _5_exportDef_$u$148 = ($$compiler$js$ast_jg$$JSVar("exports"))($$compiler$js$jaguarToJs_jg$$exportObject(_5_m_$u$137));var _5_defs_$u$147 = (map($$compiler$js$jaguarToJs_jg$$defToJs))(_5_vs_$u$144);var _5_dataDefs_$u$146 = ($$compiler$prelude_jg$$concatMap($$compiler$js$jaguarToJs_jg$$dataToJs))(_5_ds_$u$141);var _5_imports_$u$145 = ($$compiler$prelude_jg$$concatMap($$compiler$js$jaguarToJs_jg$$importToJs))(_5_is_$u$140);return (push(_5_exportDef_$u$148))((concat(_5_imports_$u$145))((concat(_5_dataDefs_$u$146))(_5_defs_$u$147)))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})()}};
var $$compiler$js$backend_jg$$combineModules = function(_4_mainName_$u$3){
return function(_4_builtinsPath_$u$4){
return function(_4_ms_$u$5){
return (function(){
var _4_mainFun_$u$9 = ($$compiler$uniquifier_jg$$addPrefix(_4_mainName_$u$3))("main");var _4_runStmt_$u$10 = ($concat(($concat(($concat(($concat("if (module.exports."))(_4_mainFun_$u$9)))(")module.exports.")))(_4_mainFun_$u$9)))("(process.argv)");var _4_exportStmt_$u$8 = ($concat(($concat("module.exports = cache[\""))(_4_mainName_$u$3)))("\"]\n");var _4_requireFun_$u$7 = ($concat(($concat(($concat(($concat(($concat("var cache = {}\n"))("function _require(f) {\n")))("  return cache[f] || require(f == \"./builtins.js\" ? process.cwd() + \"/\" + \"")))(_4_builtinsPath_$u$4)))("\" : f);\n")))("}\n");var _4_wrapModule_$u$6 = function(_4_nm_$u$11){
return (function(){
var $pm = _4_nm_$u$11;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_4_n_$u$12,_4_m_$u$13){
return ($concat(($concat(($concat(($concat("cache[\""))(_4_n_$u$12)))("\"] = (function() {")))(_4_m_$u$13)))("\nreturn exports;})();")})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};return ($concat(($concat(($concat(_4_requireFun_$u$7))((intercalate("\n"))((map(_4_wrapModule_$u$6))(_4_ms_$u$5)))))(_4_exportStmt_$u$8)))(_4_runStmt_$u$10)})()}}};
var $$compiler$js$backend_jg$$compileModule = function(_4_importSymbols_$u$1){
return function(_4_m_$u$2){
return ($$compiler$prelude_jg$$join((map($$compiler$js$printer_jg$$jsStmtToString))((map($$compiler$js$deadCode_jg$$rewriteStmt))(($$compiler$js$jaguarToJs_jg$$moduleToJs(_4_importSymbols_$u$1))(_4_m_$u$2)))))(";\n")}};
var $instance$Applicative$1 = ($class$Applicative(function(_3_x_$u$38){
return $$compiler$parsers_jg$$Parser($$compiler$parsers_jg$$Success(_3_x_$u$38))}))(function(_3_pf_$u$39){
return function(_3_pa_$u$40){
return (function(){
var $pm = _3_pf_$u$39;return ($pm.$tag==$$compiler$parsers_jg$$Parser.$tag)?((function(_3_pf_$u$41){
return (function(){
var $pm = _3_pa_$u$40;return ($pm.$tag==$$compiler$parsers_jg$$Parser.$tag)?((function(_3_pa_$u$42){
return $$compiler$parsers_jg$$Parser(function(_3_i_$u$43){
return (function(){
var $pm = _3_pf_$u$41(_3_i_$u$43);return ($pm.$tag==$$compiler$parsers_jg$$Error.$tag)?((function(_3_e_$u$44){
return $$compiler$parsers_jg$$Error(_3_e_$u$44)})($pm.$0)):(($pm.$tag==$$compiler$parsers_jg$$Success.$tag)?((function(_3_f_$u$45,_3_i_$u$46){
return (function(){
var $pm = _3_pa_$u$42(_3_i_$u$46);return ($pm.$tag==$$compiler$parsers_jg$$Error.$tag)?((function(_3_e_$u$47){
return $$compiler$parsers_jg$$Error(_3_e_$u$47)})($pm.$0)):(($pm.$tag==$$compiler$parsers_jg$$Success.$tag)?((function(_3_a_$u$48,_3_i_$u$49){
return ($$compiler$parsers_jg$$Success(_3_f_$u$45(_3_a_$u$48)))(_3_i_$u$49)})($pm.$0,$pm.$1)):(error("pattern match fail")))})()})($pm.$0,$pm.$1)):(error("pattern match fail")))})()})})($pm.$0)):(error("pattern match fail"))})()})($pm.$0)):(error("pattern match fail"))})()}});
var $instance$Alternative$2 = ($class$Alternative($$compiler$parsers_jg$$Parser(function(_3___$u$50){
return $$compiler$parsers_jg$$Error("parser failure")})))(function(_3_pa_$u$51){
return function(_3_pb_$u$52){
return (function(){
var $pm = _3_pa_$u$51;return ($pm.$tag==$$compiler$parsers_jg$$Parser.$tag)?((function(_3_pa_$u$53){
return (function(){
var $pm = _3_pb_$u$52;return ($pm.$tag==$$compiler$parsers_jg$$Parser.$tag)?((function(_3_pb_$u$54){
return $$compiler$parsers_jg$$Parser(function(_3_i_$u$55){
return (function(){
var $pm = _3_pa_$u$53(_3_i_$u$55);return ($pm.$tag==$$compiler$parsers_jg$$Error.$tag)?((function(_3___$u$56){
return _3_pb_$u$54(_3_i_$u$55)})($pm.$0)):(($pm.$tag==$$compiler$parsers_jg$$Success.$tag)?((function(_3_a_$u$57,_3_i_$u$58){
return ($$compiler$parsers_jg$$Success(_3_a_$u$57))(_3_i_$u$58)})($pm.$0,$pm.$1)):(error("pattern match fail")))})()})})($pm.$0)):(error("pattern match fail"))})()})($pm.$0)):(error("pattern match fail"))})()}});
var $$compiler$parsers_jg$$upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var $$compiler$parsers_jg$$letters = ($concat("abcdefghijklmnopqrstuvwxyz"))($$compiler$parsers_jg$$upperCaseLetters);
var $$compiler$parsers_jg$$digits = "0123456789";
var $$compiler$parsers_jg$$success = function(_3_a_$u$27){
return $$compiler$parsers_jg$$Parser($$compiler$parsers_jg$$Success(_3_a_$u$27))};
var $$compiler$parsers_jg$$opt = function(_3_a_$u$30){
return (($lt$pip$gt($instance$Alternative$2))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$prelude_jg$$Just)))(_3_a_$u$30)))($$compiler$parsers_jg$$success($$compiler$prelude_jg$$Nothing))};
var $$compiler$parsers_jg$$$pip$gt = function(local$instance$Applicative$0){
return function(_3_a_$u$3){
return function(_3_b_$u$4){
return (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(function(_3___$u$5){
return function(_3_b_$u$6){
return _3_b_$u$6}})))(_3_a_$u$3)))(_3_b_$u$4)}}};
var $$compiler$parsers_jg$$applyParser = function(_3_p_$u$0){
return function(_3_i_$u$1){
return (function(){
var $pm = _3_p_$u$0;return ($pm.$tag==$$compiler$parsers_jg$$Parser.$tag)?((function(_3_f_$u$2){
return _3_f_$u$2(_3_i_$u$1)})($pm.$0)):(error("pattern match fail"))})()}};
var $$compiler$parsers_jg$$many = function(_3_p_$u$11){
return (function(){
var _3_manyIterate_$u$12 = function(_3_s_$u$13){
return (function(){
var _3_r_$u$14 = ((iterate($$compiler$prelude_jg$$Left(($$compiler$parsers_jg$$Success(emptyArray))(_3_s_$u$13))))(function(_3_r_$u$15){
return (function(){
var $pm = _3_r_$u$15;return ($pm.$tag==$$compiler$prelude_jg$$Left.$tag)?((function(_3_s_$u$16){
return false})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$Right.$tag)?((function(_3_s_$u$17){
return true})($pm.$0)):(error("pattern match fail")))})()}))(function(_3_rs_$u$18){
return (function(){
var $pm = _3_rs_$u$18;return (($pm.$tag==$$compiler$prelude_jg$$Left.$tag)&&($pm.$0.$tag==$$compiler$parsers_jg$$Success.$tag))?((function(_3_rs_$u$19,_3_s_$u$20){
return (function(){
var $pm = ($$compiler$parsers_jg$$applyParser(_3_p_$u$11))(_3_s_$u$20);return ($pm.$tag==$$compiler$parsers_jg$$Success.$tag)?((function(_3_r_$u$21,_3_s_$u$22){
return $$compiler$prelude_jg$$Left(($$compiler$parsers_jg$$Success((push(_3_r_$u$21))(_3_rs_$u$19)))(_3_s_$u$22))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$parsers_jg$$Error.$tag)?((function(_3_e_$u$23){
return $$compiler$prelude_jg$$Right(($$compiler$parsers_jg$$Success(_3_rs_$u$19))(_3_s_$u$20))})($pm.$0)):(error("pattern match fail")))})()})($pm.$0.$0,$pm.$0.$1)):(error("pattern match fail"))})()});return (function(){
var $pm = _3_r_$u$14;return ($pm.$tag==$$compiler$prelude_jg$$Right.$tag)?((function(_3_a_$u$24){
return _3_a_$u$24})($pm.$0)):(($pm.$tag==$$compiler$prelude_jg$$Left.$tag)?((function(_3___$u$25){
return error("manyIterate should never return a Left")})($pm.$0)):(error("pattern match fail")))})()})()};return $$compiler$parsers_jg$$Parser(_3_manyIterate_$u$12)})()};
var $$compiler$parsers_jg$$sepBy1 = function(_3_p_$u$28){
return function(_3_sp_$u$29){
return (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(enqueue)))(_3_p_$u$28)))($$compiler$parsers_jg$$many((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))(_3_sp_$u$29))(_3_p_$u$28)))}};
var $$compiler$parsers_jg$$some = function(_3_p_$u$26){
return (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(enqueue)))(_3_p_$u$26)))($$compiler$parsers_jg$$many(_3_p_$u$26))};
var $$compiler$parsers_jg$$$lt$pip = function(local$instance$Applicative$0){
return function(_3_a_$u$7){
return function(_3_b_$u$8){
return (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(function(_3_a_$u$9){
return function(_3___$u$10){
return _3_a_$u$9}})))(_3_a_$u$7)))(_3_b_$u$8)}}};
var $$compiler$jaguarLexer_jg$$runLexer = function(_2_p_$u$10){
return function(_2_s_$u$11){
return (function(){
var $pm = _2_p_$u$10;return ($pm.$tag==$$compiler$parsers_jg$$Parser.$tag)?((function(_2_p_$u$12){
return _2_p_$u$12(((($$compiler$jaguarLexer_jg$$LexerState(_2_s_$u$11))(0))(0))(0))})($pm.$0)):(error("pattern match fail"))})()}};
var $$compiler$jaguarLexer_jg$$mkTok = function(_2_t_$u$0){
return (function(){
var _2_parse_$u$1 = function(_2_i_$u$2){
return (function(){
var $pm = _2_i_$u$2;return ($pm.$tag==$$compiler$jaguarLexer_jg$$LexerState.$tag)?((function(_2___$u$3,_2___$u$4,_2_l_$u$5,_2_c_$u$6){
return ($$compiler$parsers_jg$$Success(function(_2_r_$u$7){
return ((($$compiler$jaguarLexer_jg$$Token(_2_t_$u$0))(_2_r_$u$7))(_2_l_$u$5))(_2_c_$u$6)}))(_2_i_$u$2)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};return $$compiler$parsers_jg$$Parser(_2_parse_$u$1)})()};
var $$compiler$jaguarLexer_jg$$parseChar = function(_2_p_$u$13){
return (function(){
var _2_parse_$u$14 = function(_2_s_$u$15){
return (function(){
var $pm = _2_s_$u$15;return ($pm.$tag==$$compiler$jaguarLexer_jg$$LexerState.$tag)?((function(_2_s_$u$16,_2_i_$u$17,_2_l_$u$18,_2_c_$u$19){
return (function(){
var $pm = (($lt($instance$Ord$2))(_2_i_$u$17))(length(_2_s_$u$16));return (!$pm)?((function(){
return $$compiler$parsers_jg$$Error("no more input available")})()):($pm?((function(){
return (function(){
var $pm = _2_p_$u$13((getChar(_2_i_$u$17))(_2_s_$u$16));return (!$pm)?((function(){
return $$compiler$parsers_jg$$Error("parser failed")})()):($pm?((function(){
return (function(){
var $pm = (getChar(_2_i_$u$17))(_2_s_$u$16);return ("\n"==$pm)?((function(){
return ($$compiler$parsers_jg$$Success((getChar(_2_i_$u$17))(_2_s_$u$16)))(((($$compiler$jaguarLexer_jg$$LexerState(_2_s_$u$16))(_2_i_$u$17+1))(_2_l_$u$18+1))(0))})()):((function(_2_x_$u$20){
return ($$compiler$parsers_jg$$Success((getChar(_2_i_$u$17))(_2_s_$u$16)))(((($$compiler$jaguarLexer_jg$$LexerState(_2_s_$u$16))(_2_i_$u$17+1))(_2_l_$u$18))(_2_c_$u$19+1))})($pm))})()})()):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()};return $$compiler$parsers_jg$$Parser(_2_parse_$u$14)})()};
var $$compiler$jaguarLexer_jg$$charP = function(_2_cs_$u$22){
return $$compiler$jaguarLexer_jg$$parseChar(function(_2_c_$u$23){
return ($$compiler$prelude_jg$$containsChar(_2_c_$u$23))(_2_cs_$u$22)})};
var $$compiler$jaguarLexer_jg$$concatStr = (foldl(function(_2_cs_$u$8){
return function(_2_c_$u$9){
return ($concat(_2_cs_$u$8))(_2_c_$u$9)}}))("");
var $$compiler$jaguarLexer_jg$$someStr = function(_2_p_$u$27){
return (($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$jaguarLexer_jg$$concatStr)))($$compiler$parsers_jg$$some(_2_p_$u$27))};
var $$compiler$jaguarLexer_jg$$whitespaceP = (($lt$mul$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$WsTok)))($$compiler$jaguarLexer_jg$$someStr($$compiler$jaguarLexer_jg$$charP(" \n")));
var $$compiler$jaguarLexer_jg$$intP = $$compiler$jaguarLexer_jg$$someStr($$compiler$jaguarLexer_jg$$charP($$compiler$parsers_jg$$digits));
var $$compiler$jaguarLexer_jg$$numP = (($lt$mul$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$NumTok)))((($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($concat)))($$compiler$jaguarLexer_jg$$intP)))((($lt$pip$gt($instance$Alternative$2))((($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($concat)))($$compiler$jaguarLexer_jg$$charP("."))))($$compiler$jaguarLexer_jg$$intP)))((pure($instance$Applicative$1))(""))));
var $$compiler$jaguarLexer_jg$$notCharP = function(_2_cs_$u$24){
return $$compiler$jaguarLexer_jg$$parseChar(function(_2_c_$u$25){
return $$compiler$prelude_jg$$not(($$compiler$prelude_jg$$containsChar(_2_c_$u$25))(_2_cs_$u$24))})};
var $$compiler$jaguarLexer_jg$$manyStr = function(_2_p_$u$26){
return (($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$jaguarLexer_jg$$concatStr)))($$compiler$parsers_jg$$many(_2_p_$u$26))};
var $$compiler$jaguarLexer_jg$$lineCommentP = (($lt$mul$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$ComTok)))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$charP("/")))($$compiler$jaguarLexer_jg$$charP("/"))))($$compiler$jaguarLexer_jg$$manyStr($$compiler$jaguarLexer_jg$$notCharP("\n"))));
var $$compiler$jaguarLexer_jg$$symbolP = (($lt$mul$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$SymTok)))($$compiler$jaguarLexer_jg$$charP("()[]{},\\"));
var $$compiler$jaguarLexer_jg$$identP = (($lt$mul$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$IdTok)))((($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($concat)))($$compiler$jaguarLexer_jg$$charP(($concat($$compiler$parsers_jg$$letters))("_")))))($$compiler$jaguarLexer_jg$$manyStr($$compiler$jaguarLexer_jg$$charP(($concat(($concat($$compiler$parsers_jg$$letters))($$compiler$parsers_jg$$digits)))("_")))));
var $$compiler$jaguarLexer_jg$$opIdentP = (($lt$mul$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$IdTok)))((($$compiler$parsers_jg$$$lt$pip($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$charP("(")))($$compiler$jaguarLexer_jg$$someStr($$compiler$jaguarLexer_jg$$charP("-+*/=:&|<>^$")))))($$compiler$jaguarLexer_jg$$charP(")")));
var $$compiler$jaguarLexer_jg$$opP = (($lt$mul$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$OpTok)))($$compiler$jaguarLexer_jg$$someStr($$compiler$jaguarLexer_jg$$charP("-+*/=:&|<>^$")));
var $$compiler$jaguarLexer_jg$$anyCharP = $$compiler$jaguarLexer_jg$$parseChar(function(_2___$u$21){
return true});
var $$compiler$jaguarLexer_jg$$stringCharP = (function(){
var _2_notEndOfStringP_$u$30 = $$compiler$jaguarLexer_jg$$notCharP("'");var _2_escapeP_$u$29 = (($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$charP("\\")))($$compiler$jaguarLexer_jg$$anyCharP);var _2_newLineP_$u$28 = (($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$charP("\\")))($$compiler$jaguarLexer_jg$$charP("n"))))((pure($instance$Applicative$1))("\n"));return (($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))(_2_newLineP_$u$28))(_2_escapeP_$u$29)))(_2_notEndOfStringP_$u$30)})();
var $$compiler$jaguarLexer_jg$$stringP = (($lt$mul$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$StrTok)))((($$compiler$parsers_jg$$$lt$pip($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$charP("'")))($$compiler$jaguarLexer_jg$$manyStr($$compiler$jaguarLexer_jg$$stringCharP))))($$compiler$jaguarLexer_jg$$charP("'")));
var $$compiler$jaguarLexer_jg$$jaguarTokenP = $$compiler$parsers_jg$$many((($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))($$compiler$jaguarLexer_jg$$stringP))($$compiler$jaguarLexer_jg$$whitespaceP)))($$compiler$jaguarLexer_jg$$numP)))($$compiler$jaguarLexer_jg$$lineCommentP)))($$compiler$jaguarLexer_jg$$identP)))($$compiler$jaguarLexer_jg$$opIdentP)))($$compiler$jaguarLexer_jg$$opP)))($$compiler$jaguarLexer_jg$$symbolP));
var $$compiler$jaguarLexer_jg$$tokenize = $$compiler$jaguarLexer_jg$$runLexer($$compiler$jaguarLexer_jg$$jaguarTokenP);
var $$compiler$jaguarParser_jg$$mkParserState = function(_1_ts_$u$0){
return function(_1_f_$u$1){
return (((($$compiler$jaguarParser_jg$$ParserState(_1_ts_$u$0))(0))((function(){
var $pm = (getIx(0))(_1_ts_$u$0);return ($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)?((function(_1_t_$u$2,_1_v_$u$3,_1_l_$u$4,_1_c_$u$5){
return _1_c_$u$5})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()))(0))(_1_f_$u$1)}};
var $$compiler$jaguarParser_jg$$filterWhitespaceAndComments = filter(function(_1_t_$u$6){
return (function(){
var $pm = _1_t_$u$6;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$WsTok.$tag))?((function(_1_v_$u$7,_1_l_$u$8,_1_c_$u$9){
return false})($pm.$1,$pm.$2,$pm.$3)):((($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$ComTok.$tag))?((function(_1_v_$u$10,_1_l_$u$11,_1_c_$u$12){
return false})($pm.$1,$pm.$2,$pm.$3)):((function(_1_t_$u$13){
return true})($pm)))})()});
var $$compiler$jaguarParser_jg$$runParser = function(_1_p_$u$14){
return function(_1_s_$u$15){
return function(_1_f_$u$16){
return (function(){
var $pm = $$compiler$jaguarLexer_jg$$tokenize(_1_s_$u$15);return ($pm.$tag==$$compiler$parsers_jg$$Success.$tag)?((function(_1_ts_$u$17,_1_s_$u$18){
return ($$compiler$parsers_jg$$applyParser(_1_p_$u$14))(($$compiler$jaguarParser_jg$$mkParserState($$compiler$jaguarParser_jg$$filterWhitespaceAndComments(_1_ts_$u$17)))(_1_f_$u$16))})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$parsers_jg$$Error.$tag)?((function(_1_e_$u$19){
return $$compiler$parsers_jg$$Error(_1_e_$u$19)})($pm.$0)):(error("pattern match fail")))})()}}};
var $$compiler$jaguarParser_jg$$$lt$mul$mns$gt = function(_1_pf_$u$48){
return function(_1_pa_$u$49){
return (function(){
var $pm = _1_pf_$u$48;return ($pm.$tag==$$compiler$parsers_jg$$Parser.$tag)?((function(_1_pf_$u$50){
return (function(){
var $pm = _1_pa_$u$49;return ($pm.$tag==$$compiler$parsers_jg$$Parser.$tag)?((function(_1_pa_$u$51){
return (function(){
var _1_parse_$u$52 = function(_1_s_$u$53){
return (function(){
var $pm = _1_s_$u$53;return ($pm.$tag==$$compiler$jaguarParser_jg$$ParserState.$tag)?((function(_1_ts_$u$54,_1_p_$u$55,_1_li_$u$56,_1_ri_$u$57,_1_fn_$u$58){
return (function(){
var $pm = _1_pf_$u$50(_1_s_$u$53);return (($pm.$tag==$$compiler$parsers_jg$$Success.$tag)&&($pm.$1.$tag==$$compiler$jaguarParser_jg$$ParserState.$tag))?((function(_1_f_$u$59,_1_ts_$u$60,_1_p2_$u$61,_1_li2_$u$62,_1_ri2_$u$63,_1_fn_$u$64){
return (function(){
var $pm = _1_pa_$u$51((((($$compiler$jaguarParser_jg$$ParserState(_1_ts_$u$60))(_1_p2_$u$61))(_1_li2_$u$62))(_1_li_$u$56+1))(_1_fn_$u$64));return (($pm.$tag==$$compiler$parsers_jg$$Success.$tag)&&($pm.$1.$tag==$$compiler$jaguarParser_jg$$ParserState.$tag))?((function(_1_a_$u$65,_1_ts_$u$66,_1_p3_$u$67,_1_li3_$u$68,_1_ri3_$u$69,_1_fn_$u$70){
return ($$compiler$parsers_jg$$Success(_1_f_$u$59(_1_a_$u$65)))((((($$compiler$jaguarParser_jg$$ParserState(_1_ts_$u$66))(_1_p3_$u$67))(_1_li3_$u$68))(_1_ri_$u$57))(_1_fn_$u$70))})($pm.$0,$pm.$1.$0,$pm.$1.$1,$pm.$1.$2,$pm.$1.$3,$pm.$1.$4)):(($pm.$tag==$$compiler$parsers_jg$$Error.$tag)?((function(_1_e_$u$71){
return $$compiler$parsers_jg$$Error(_1_e_$u$71)})($pm.$0)):(error("pattern match fail")))})()})($pm.$0,$pm.$1.$0,$pm.$1.$1,$pm.$1.$2,$pm.$1.$3,$pm.$1.$4)):(($pm.$tag==$$compiler$parsers_jg$$Error.$tag)?((function(_1_e_$u$72){
return $$compiler$parsers_jg$$Error(_1_e_$u$72)})($pm.$0)):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4)):(error("pattern match fail"))})()};return $$compiler$parsers_jg$$Parser(_1_parse_$u$52)})()})($pm.$0)):(error("pattern match fail"))})()})($pm.$0)):(error("pattern match fail"))})()}};
var $$compiler$jaguarParser_jg$$parseToken = function(_1_f_$u$20){
return (function(){
var _1_parse_$u$21 = function(_1_s_$u$22){
return (function(){
var $pm = _1_s_$u$22;return ($pm.$tag==$$compiler$jaguarParser_jg$$ParserState.$tag)?((function(_1_ts_$u$23,_1_p_$u$24,_1_li_$u$25,_1_ri_$u$26,_1_fn_$u$27){
return (function(){
var $pm = (($lt($instance$Ord$2))(_1_p_$u$24))(length(_1_ts_$u$23));return (!$pm)?((function(){
return $$compiler$parsers_jg$$Error("run out of tokens")})()):($pm?((function(){
return (function(){
var $pm = (getIx(_1_p_$u$24))(_1_ts_$u$23);return ($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)?((function(_1_t_$u$28,_1_v_$u$29,_1_l_$u$30,_1_c_$u$31){
return (function(){
var $pm = (($lt($instance$Ord$2))(_1_c_$u$31))(_1_ri_$u$26);return $pm?((function(){
return $$compiler$parsers_jg$$Error("token not indented sufficiently")})()):((!$pm)?((function(){
return (function(){
var $pm = _1_f_$u$20((getIx(_1_p_$u$24))(_1_ts_$u$23));return ($pm.$tag==$$compiler$prelude_jg$$Nothing.$tag)?((function(){
return $$compiler$parsers_jg$$Error("parser fun failed")})()):(($pm.$tag==$$compiler$prelude_jg$$Just.$tag)?((function(_1_r_$u$32){
return (function(){
var $pm = (($lt($instance$Ord$2))(_1_p_$u$24+1))(length(_1_ts_$u$23));return (!$pm)?((function(){
return ($$compiler$parsers_jg$$Success(_1_r_$u$32))((((($$compiler$jaguarParser_jg$$ParserState(_1_ts_$u$23))(_1_p_$u$24+1))(_1_li_$u$25))(_1_ri_$u$26))(_1_fn_$u$27))})()):($pm?((function(){
return (function(){
var $pm = (getIx(_1_p_$u$24+1))(_1_ts_$u$23);return ($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)?((function(_1_t_$u$33,_1_v_$u$34,_1_l2_$u$35,_1_c_$u$36){
return (function(){
var $pm = (($$compiler$prelude_jg$$$gt($instance$Ord$2))(_1_l2_$u$35))(_1_l_$u$30);return (!$pm)?((function(){
return ($$compiler$parsers_jg$$Success(_1_r_$u$32))((((($$compiler$jaguarParser_jg$$ParserState(_1_ts_$u$23))(_1_p_$u$24+1))(_1_li_$u$25))(_1_ri_$u$26))(_1_fn_$u$27))})()):($pm?((function(){
return ($$compiler$parsers_jg$$Success(_1_r_$u$32))((((($$compiler$jaguarParser_jg$$ParserState(_1_ts_$u$23))(_1_p_$u$24+1))(_1_c_$u$36))(_1_ri_$u$26))(_1_fn_$u$27))})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()})()):(error("pattern match fail")))})()})($pm.$0)):(error("pattern match fail")))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4)):(error("pattern match fail"))})()};return $$compiler$parsers_jg$$Parser(_1_parse_$u$21)})()};
var $$compiler$jaguarParser_jg$$operatorP = function(_1_s_$u$83){
return $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$84){
return (function(){
var $pm = _1_t_$u$84;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$OpTok.$tag))?((function(_1_v_$u$85,_1_i_$u$86,_1_c_$u$87){
return (function(){
var $pm = (($eq$eq($instance$Eq$1))(_1_v_$u$85))(_1_s_$u$83);return $pm?((function(){
return $$compiler$prelude_jg$$Just(_1_s_$u$83)})()):((!$pm)?((function(){
return $$compiler$prelude_jg$$Nothing})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(_1_x_$u$88){
return $$compiler$prelude_jg$$Nothing})($pm))})()})};
var $$compiler$jaguarParser_jg$$symP = function(_1_s_$u$77){
return $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$78){
return (function(){
var $pm = _1_t_$u$78;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$SymTok.$tag))?((function(_1_v_$u$79,_1_i_$u$80,_1_c_$u$81){
return (function(){
var $pm = (($eq$eq($instance$Eq$1))(_1_v_$u$79))(_1_s_$u$77);return $pm?((function(){
return $$compiler$prelude_jg$$Just(_1_s_$u$77)})()):((!$pm)?((function(){
return $$compiler$prelude_jg$$Nothing})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(_1_x_$u$82){
return $$compiler$prelude_jg$$Nothing})($pm))})()})};
var $$compiler$jaguarParser_jg$$parenP = function(_1_p_$u$115){
return (($$compiler$parsers_jg$$$lt$pip($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$symP("(")))(_1_p_$u$115)))($$compiler$jaguarParser_jg$$symP(")"))};
var $$compiler$jaguarParser_jg$$reserved = (push("as"))((push("class"))((push("where"))((push("instance"))((push("let"))((push("in"))((push("from"))((push("import"))((push("case"))((push("of"))((push("data"))(emptyArray)))))))))));
var $$compiler$jaguarParser_jg$$notUpperCaseId = $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$110){
return (function(){
var $pm = _1_t_$u$110;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$IdTok.$tag))?((function(_1_v_$u$111,_1_i_$u$112,_1_c_$u$113){
return (function(){
var $pm = ($$compiler$prelude_jg$$containsChar((getChar(0))(_1_v_$u$111)))($$compiler$parsers_jg$$upperCaseLetters);return (!$pm)?((function(){
return (function(){
var $pm = (($$compiler$prelude_jg$$contains($instance$Eq$1))(_1_v_$u$111))($$compiler$jaguarParser_jg$$reserved);return (!$pm)?((function(){
return $$compiler$prelude_jg$$Just(_1_v_$u$111)})()):($pm?((function(){
return $$compiler$prelude_jg$$Nothing})()):(error("pattern match fail")))})()})()):($pm?((function(){
return $$compiler$prelude_jg$$Nothing})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(_1_t_$u$114){
return $$compiler$prelude_jg$$Nothing})($pm))})()});
var $$compiler$jaguarParser_jg$$tvarP = (($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$TVar($$compiler$prelude_jg$$Empty))))($$compiler$jaguarParser_jg$$notUpperCaseId);
var $$compiler$jaguarParser_jg$$upperCaseId = $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$105){
return (function(){
var $pm = _1_t_$u$105;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$IdTok.$tag))?((function(_1_v_$u$106,_1_i_$u$107,_1_c_$u$108){
return (function(){
var $pm = ($$compiler$prelude_jg$$containsChar((getChar(0))(_1_v_$u$106)))($$compiler$parsers_jg$$upperCaseLetters);return $pm?((function(){
return $$compiler$prelude_jg$$Just(_1_v_$u$106)})()):((!$pm)?((function(){
return $$compiler$prelude_jg$$Nothing})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(_1_t_$u$109){
return $$compiler$prelude_jg$$Nothing})($pm))})()});
var $$compiler$jaguarParser_jg$$tconstP = (($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))))($$compiler$jaguarParser_jg$$upperCaseId);
var $$compiler$jaguarParser_jg$$typeP = $$compiler$parsers_jg$$Parser(function(_1_s_$u$173){
return ($$compiler$parsers_jg$$applyParser($$compiler$jaguarParser_jg$$tfunP))(_1_s_$u$173)});
var $$compiler$jaguarParser_jg$$simpleTypeP = (($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))($$compiler$jaguarParser_jg$$tconstP))($$compiler$jaguarParser_jg$$tvarP)))($$compiler$jaguarParser_jg$$parenP($$compiler$jaguarParser_jg$$typeP));
var $$compiler$jaguarParser_jg$$tappP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(foldl($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty)))))($$compiler$jaguarParser_jg$$simpleTypeP)))($$compiler$parsers_jg$$many($$compiler$jaguarParser_jg$$simpleTypeP));
var $$compiler$jaguarParser_jg$$tfunP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(function(_1_t_$u$174){
return function(_1_ts_$u$175){
return (foldr1(function(_1_b_$u$176){
return function(_1_a_$u$177){
return (($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))((($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("->")))(_1_a_$u$177)))(_1_b_$u$176)}}))((enqueue(_1_t_$u$174))(_1_ts_$u$175))}})))($$compiler$jaguarParser_jg$$tappP)))($$compiler$parsers_jg$$many((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("->")))($$compiler$jaguarParser_jg$$tappP)));
var $$compiler$jaguarParser_jg$$parseType = $$compiler$jaguarParser_jg$$runParser($$compiler$jaguarParser_jg$$typeP);
var $$compiler$jaguarParser_jg$$withLocAnn = function(_1_a_$u$116){
return (((($$compiler$ast_jg$$setAnn($instance$Hashable$13))($instance$Eq$1))("codeLoc"))(_1_a_$u$116))($$compiler$prelude_jg$$Empty)};
var $$compiler$jaguarParser_jg$$locP = (function(){
var _1_parse_$u$37 = function(_1_s_$u$38){
return (function(){
var $pm = _1_s_$u$38;return ($pm.$tag==$$compiler$jaguarParser_jg$$ParserState.$tag)?((function(_1_ts_$u$39,_1_p_$u$40,_1___$u$41,_1___$u$42,_1_fn_$u$43){
return (function(){
var $pm = (($lt($instance$Ord$2))(_1_p_$u$40))(length(_1_ts_$u$39));return (!$pm)?((function(){
return $$compiler$parsers_jg$$Error("run out of tokens")})()):($pm?((function(){
return (function(){
var $pm = (getIx(_1_p_$u$40))(_1_ts_$u$39);return ($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)?((function(_1___$u$44,_1___$u$45,_1_l_$u$46,_1_c_$u$47){
return ($$compiler$parsers_jg$$Success(($$compiler$prelude_jg$$$($$compiler$jaguarParser_jg$$withLocAnn))((($$compiler$ast_jg$$AnnCodeLoc(_1_fn_$u$43))(_1_l_$u$46))(_1_c_$u$47))))(_1_s_$u$38)})($pm.$0,$pm.$1,$pm.$2,$pm.$3)):(error("pattern match fail"))})()})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4)):(error("pattern match fail"))})()};return $$compiler$parsers_jg$$Parser(_1_parse_$u$37)})();
var $$compiler$jaguarParser_jg$$$pip$mns$gt = function(_1_pa_$u$73){
return function(_1_pb_$u$74){
return ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(function(_1___$u$75){
return function(_1_b_$u$76){
return _1_b_$u$76}})))(_1_pa_$u$73)))(_1_pb_$u$74)}};
var $$compiler$jaguarParser_jg$$anyOpP = $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$89){
return (function(){
var $pm = _1_t_$u$89;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$OpTok.$tag))?((function(_1_v_$u$90,_1_i_$u$91,_1_c_$u$92){
return $$compiler$prelude_jg$$Just(_1_v_$u$90)})($pm.$1,$pm.$2,$pm.$3)):((function(_1_x_$u$93){
return $$compiler$prelude_jg$$Nothing})($pm))})()});
var $$compiler$jaguarParser_jg$$reservedP = function(_1_s_$u$94){
return $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$95){
return (function(){
var $pm = _1_t_$u$95;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$IdTok.$tag))?((function(_1_v_$u$96,_1_i_$u$97,_1_c_$u$98){
return (function(){
var $pm = (($eq$eq($instance$Eq$1))(_1_v_$u$96))(_1_s_$u$94);return $pm?((function(){
return $$compiler$prelude_jg$$Just(_1_s_$u$94)})()):((!$pm)?((function(){
return $$compiler$prelude_jg$$Nothing})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(_1_x_$u$99){
return $$compiler$prelude_jg$$Nothing})($pm))})()})};
var $$compiler$jaguarParser_jg$$withLocOf = function(_1_e_$u$117){
return $$compiler$jaguarParser_jg$$withLocAnn(($$compiler$prelude_jg$$$($$compiler$prelude_jg$$fromJust))(((($$compiler$ast_jg$$getAnn($instance$Hashable$13))($instance$Eq$1))("codeLoc"))($$compiler$ast_jg$$annOf(_1_e_$u$117))))};
var $$compiler$jaguarParser_jg$$varP = (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$Var)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$118){
return (function(){
var $pm = _1_t_$u$118;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$IdTok.$tag))?((function(_1_v_$u$119,_1_l_$u$120,_1_c_$u$121){
return (function(){
var $pm = (($$compiler$prelude_jg$$contains($instance$Eq$1))(_1_v_$u$119))($$compiler$jaguarParser_jg$$reserved);return $pm?((function(){
return $$compiler$prelude_jg$$Nothing})()):((!$pm)?((function(){
return $$compiler$prelude_jg$$Just(_1_v_$u$119)})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(_1_x_$u$122){
return $$compiler$prelude_jg$$Nothing})($pm))})()}));
var $$compiler$jaguarParser_jg$$cnumP = (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$Const)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$123){
return (function(){
var $pm = _1_t_$u$123;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$NumTok.$tag))?((function(_1_v_$u$124,_1_l_$u$125,_1_c_$u$126){
return $$compiler$prelude_jg$$Just($$compiler$ast_jg$$CNum(unsafeStringToInt(_1_v_$u$124)))})($pm.$1,$pm.$2,$pm.$3)):((function(_1_x_$u$127){
return $$compiler$prelude_jg$$Nothing})($pm))})()}));
var $$compiler$jaguarParser_jg$$cstrP = (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$Const)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$128){
return (function(){
var $pm = _1_t_$u$128;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$StrTok.$tag))?((function(_1_v_$u$129,_1_l_$u$130,_1_c_$u$131){
return $$compiler$prelude_jg$$Just($$compiler$ast_jg$$CStr(_1_v_$u$129))})($pm.$1,$pm.$2,$pm.$3)):((function(_1_x_$u$132){
return $$compiler$prelude_jg$$Nothing})($pm))})()}));
var $$compiler$jaguarParser_jg$$constP = (($lt$pip$gt($instance$Alternative$2))($$compiler$jaguarParser_jg$$cstrP))($$compiler$jaguarParser_jg$$cnumP);
var $$compiler$jaguarParser_jg$$pvarP = (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$PVar)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$notUpperCaseId);
var $$compiler$jaguarParser_jg$$pcstrP = (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$PConst)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$147){
return (function(){
var $pm = _1_t_$u$147;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$StrTok.$tag))?((function(_1_v_$u$148,_1_l_$u$149,_1_c_$u$150){
return $$compiler$prelude_jg$$Just($$compiler$ast_jg$$CStr(_1_v_$u$148))})($pm.$1,$pm.$2,$pm.$3)):((function(_1_x_$u$151){
return $$compiler$prelude_jg$$Nothing})($pm))})()}));
var $$compiler$jaguarParser_jg$$pcnumP = (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$PConst)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$142){
return (function(){
var $pm = _1_t_$u$142;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$NumTok.$tag))?((function(_1_v_$u$143,_1_l_$u$144,_1_c_$u$145){
return $$compiler$prelude_jg$$Just($$compiler$ast_jg$$CNum(unsafeStringToInt(_1_v_$u$143)))})($pm.$1,$pm.$2,$pm.$3)):((function(_1_x_$u$146){
return $$compiler$prelude_jg$$Nothing})($pm))})()}));
var $$compiler$jaguarParser_jg$$pconstP = (($lt$pip$gt($instance$Alternative$2))($$compiler$jaguarParser_jg$$pcnumP))($$compiler$jaguarParser_jg$$pcstrP);
var $$compiler$jaguarParser_jg$$patP = $$compiler$parsers_jg$$Parser(function(_1_s_$u$141){
return ($$compiler$parsers_jg$$applyParser($$compiler$jaguarParser_jg$$allPatP))(_1_s_$u$141)});
var $$compiler$jaguarParser_jg$$pdataP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$PData)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$upperCaseId)))($$compiler$parsers_jg$$many((($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))($$compiler$jaguarParser_jg$$pvarP))($$compiler$jaguarParser_jg$$pconstP)))($$compiler$jaguarParser_jg$$parenP($$compiler$jaguarParser_jg$$patP))));
var $$compiler$jaguarParser_jg$$allPatP = (($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))($$compiler$jaguarParser_jg$$pvarP))($$compiler$jaguarParser_jg$$pconstP)))($$compiler$jaguarParser_jg$$pdataP);
var $$compiler$jaguarParser_jg$$exprP = $$compiler$parsers_jg$$Parser(function(_1_s_$u$133){
return ($$compiler$parsers_jg$$applyParser($$compiler$jaguarParser_jg$$opP))(_1_s_$u$133)});
var $$compiler$jaguarParser_jg$$simpleExprP = (($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))($$compiler$jaguarParser_jg$$varP))($$compiler$jaguarParser_jg$$constP)))($$compiler$jaguarParser_jg$$parenP($$compiler$jaguarParser_jg$$exprP));
var $$compiler$jaguarParser_jg$$appP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(foldl(function(_1_f_$u$134){
return function(_1_a_$u$135){
return (($$compiler$ast_jg$$App($$compiler$jaguarParser_jg$$withLocOf(_1_f_$u$134)))(_1_f_$u$134))(_1_a_$u$135)}}))))((($lt$pip$gt($instance$Alternative$2))($$compiler$jaguarParser_jg$$varP))($$compiler$jaguarParser_jg$$parenP($$compiler$jaguarParser_jg$$exprP)))))($$compiler$parsers_jg$$many($$compiler$jaguarParser_jg$$simpleExprP));
var $$compiler$jaguarParser_jg$$lamP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(function(_1_l_$u$136){
return function(_1_ps_$u$137){
return function(_1_a_$u$138){
return ((foldr(function(_1_a_$u$139){
return function(_1_p_$u$140){
return (($$compiler$ast_jg$$Lam(_1_l_$u$136))(_1_p_$u$140))(_1_a_$u$139)}}))(_1_a_$u$138))(_1_ps_$u$137)}}})))($$compiler$jaguarParser_jg$$locP)))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$symP("\\")))($$compiler$parsers_jg$$some($$compiler$jaguarParser_jg$$notUpperCaseId)))))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("->")))($$compiler$jaguarParser_jg$$exprP));
var $$compiler$jaguarParser_jg$$ofP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$prelude_jg$$Pair)))($$compiler$jaguarParser_jg$$patP)))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("->")))($$compiler$jaguarParser_jg$$exprP));
var $$compiler$jaguarParser_jg$$caseP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$Case)))($$compiler$jaguarParser_jg$$locP)))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$reservedP("case")))($$compiler$jaguarParser_jg$$simpleExprP))))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$reservedP("of")))($$compiler$parsers_jg$$some($$compiler$jaguarParser_jg$$ofP)));
var $$compiler$jaguarParser_jg$$defP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(function(_1_l_$u$157){
return function(_1_n_$u$158){
return function(_1_ps_$u$159){
return function(_1_e_$u$160){
return ($$compiler$prelude_jg$$Pair(_1_n_$u$158))(((foldr(function(_1_e_$u$161){
return function(_1_p_$u$162){
return (($$compiler$ast_jg$$Lam(_1_l_$u$157))(_1_p_$u$162))(_1_e_$u$161)}}))(_1_e_$u$160))(_1_ps_$u$159))}}}})))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$notUpperCaseId)))($$compiler$parsers_jg$$many($$compiler$jaguarParser_jg$$notUpperCaseId))))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("=")))($$compiler$jaguarParser_jg$$exprP));
var $$compiler$jaguarParser_jg$$letP = (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$Let)))($$compiler$jaguarParser_jg$$locP)))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$reservedP("let")))($$compiler$parsers_jg$$some($$compiler$jaguarParser_jg$$defP)))))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$reservedP("in")))($$compiler$jaguarParser_jg$$exprP));
var $$compiler$jaguarParser_jg$$primaryExprP = (($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))((($lt$pip$gt($instance$Alternative$2))($$compiler$jaguarParser_jg$$appP))($$compiler$jaguarParser_jg$$constP)))($$compiler$jaguarParser_jg$$lamP)))($$compiler$jaguarParser_jg$$caseP)))($$compiler$jaguarParser_jg$$letP);
var $$compiler$jaguarParser_jg$$opP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(function(_1_e_$u$163){
return function(_1_oes_$u$164){
return ((foldl(function(_1_a_$u$165){
return function(_1_lob_$u$166){
return (function(){
var $pm = _1_lob_$u$166;return (($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)&&($pm.$1.$tag==$$compiler$prelude_jg$$Pair.$tag))?((function(_1_l_$u$167,_1_op_$u$168,_1_b_$u$169){
return (($$compiler$ast_jg$$App(_1_l_$u$167))((($$compiler$ast_jg$$App(_1_l_$u$167))(($$compiler$ast_jg$$Var(_1_l_$u$167))(_1_op_$u$168)))(_1_a_$u$165)))(_1_b_$u$169)})($pm.$0,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()}}))(_1_e_$u$163))(_1_oes_$u$164)}})))($$compiler$jaguarParser_jg$$primaryExprP)))($$compiler$parsers_jg$$many((($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(function(_1_l_$u$170){
return function(_1_op_$u$171){
return function(_1_e_$u$172){
return ($$compiler$prelude_jg$$Pair(_1_l_$u$170))(($$compiler$prelude_jg$$Pair(_1_op_$u$171))(_1_e_$u$172))}}})))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$anyOpP)))($$compiler$jaguarParser_jg$$primaryExprP)));
var $$compiler$jaguarParser_jg$$strP = $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$152){
return (function(){
var $pm = _1_t_$u$152;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$StrTok.$tag))?((function(_1_v_$u$153,_1_l_$u$154,_1_c_$u$155){
return $$compiler$prelude_jg$$Just(_1_v_$u$153)})($pm.$1,$pm.$2,$pm.$3)):((function(_1_x_$u$156){
return $$compiler$prelude_jg$$Nothing})($pm))})()});
var $$compiler$jaguarParser_jg$$importAllP = (($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$ImportAll($$compiler$prelude_jg$$Empty))))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("*")))($$compiler$jaguarParser_jg$$reservedP("from"))))($$compiler$jaguarParser_jg$$strP));
var $$compiler$jaguarParser_jg$$nonReservedP = $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$100){
return (function(){
var $pm = _1_t_$u$100;return (($pm.$tag==$$compiler$jaguarLexer_jg$$Token.$tag)&&($pm.$0.$tag==$$compiler$jaguarLexer_jg$$IdTok.$tag))?((function(_1_v_$u$101,_1_l_$u$102,_1_c_$u$103){
return (function(){
var $pm = (($$compiler$prelude_jg$$contains($instance$Eq$1))(_1_v_$u$101))($$compiler$jaguarParser_jg$$reserved);return $pm?((function(){
return $$compiler$prelude_jg$$Nothing})()):((!$pm)?((function(){
return $$compiler$prelude_jg$$Just(_1_v_$u$101)})()):(error("pattern match fail")))})()})($pm.$1,$pm.$2,$pm.$3)):((function(_1_x_$u$104){
return $$compiler$prelude_jg$$Nothing})($pm))})()});
var $$compiler$jaguarParser_jg$$importNoAliasP = (($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(function(_1_n_$u$184){
return ($$compiler$prelude_jg$$Pair(_1_n_$u$184))(_1_n_$u$184)})))($$compiler$jaguarParser_jg$$nonReservedP);
var $$compiler$jaguarParser_jg$$importAliasP = (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$prelude_jg$$Pair)))($$compiler$jaguarParser_jg$$nonReservedP)))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$reservedP("as")))($$compiler$jaguarParser_jg$$nonReservedP));
var $$compiler$jaguarParser_jg$$importOpenP = (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(function(_1_ns_$u$185){
return function(_1_f_$u$186){
return (($$compiler$ast_jg$$ImportOpen($$compiler$prelude_jg$$Empty))(_1_f_$u$186))(_1_ns_$u$185)}})))((($$compiler$parsers_jg$$$lt$pip($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$symP("{")))(($$compiler$parsers_jg$$sepBy1((($lt$pip$gt($instance$Alternative$2))($$compiler$jaguarParser_jg$$importAliasP))($$compiler$jaguarParser_jg$$importNoAliasP)))($$compiler$jaguarParser_jg$$symP(",")))))($$compiler$jaguarParser_jg$$symP("}")))))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$reservedP("from")))($$compiler$jaguarParser_jg$$strP));
var $$compiler$jaguarParser_jg$$importP = (($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$reservedP("import")))((($lt$pip$gt($instance$Alternative$2))($$compiler$jaguarParser_jg$$importOpenP))($$compiler$jaguarParser_jg$$importAllP));
var $$compiler$jaguarParser_jg$$eitherP = function(_1_a_$u$200){
return function(_1_b_$u$201){
return ($$compiler$prelude_jg$$$($$compiler$parsers_jg$$Parser))(function(_1_s_$u$202){
return ($$compiler$parsers_jg$$applyParser((($lt$pip$gt($instance$Alternative$2))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$prelude_jg$$Left)))(_1_a_$u$200)))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$prelude_jg$$Right)))(_1_b_$u$201))))(_1_s_$u$202)})}};
var $$compiler$jaguarParser_jg$$classMemberP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$prelude_jg$$Pair)))($$compiler$jaguarParser_jg$$notUpperCaseId)))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("::")))($$compiler$jaguarParser_jg$$typeP));
var $$compiler$jaguarParser_jg$$classP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(function(_1_name_$u$178){
return function(_1_tv_$u$179){
return function(_1_maybeDefs_$u$180){
return ((($$compiler$ast_jg$$Class($$compiler$prelude_jg$$Empty))(_1_name_$u$178))(_1_tv_$u$179))(($$compiler$prelude_jg$$justOr(emptyArray))(_1_maybeDefs_$u$180))}}})))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$reservedP("class")))($$compiler$jaguarParser_jg$$upperCaseId))))($$compiler$jaguarParser_jg$$notUpperCaseId)))($$compiler$parsers_jg$$opt((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$reservedP("where")))($$compiler$parsers_jg$$some($$compiler$jaguarParser_jg$$classMemberP))));
var $$compiler$jaguarParser_jg$$instanceP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(function(_1_name_$u$181){
return function(_1_t_$u$182){
return function(_1_maybeDefs_$u$183){
return ((($$compiler$ast_jg$$Instance($$compiler$prelude_jg$$Empty))(_1_name_$u$181))(_1_t_$u$182))(($$compiler$prelude_jg$$justOr(emptyArray))(_1_maybeDefs_$u$183))}}})))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$reservedP("instance")))($$compiler$jaguarParser_jg$$upperCaseId))))($$compiler$jaguarParser_jg$$simpleTypeP)))($$compiler$parsers_jg$$opt((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$reservedP("where")))($$compiler$parsers_jg$$some($$compiler$jaguarParser_jg$$defP))));
var $$compiler$jaguarParser_jg$$dataConP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$DataCon($$compiler$prelude_jg$$Empty))))($$compiler$jaguarParser_jg$$upperCaseId)))($$compiler$parsers_jg$$many($$compiler$jaguarParser_jg$$simpleTypeP));
var $$compiler$jaguarParser_jg$$dataP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($$compiler$jaguarParser_jg$$$lt$mul$mns$gt((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))($$compiler$ast_jg$$Data($$compiler$prelude_jg$$Empty))))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$reservedP("data")))($$compiler$jaguarParser_jg$$upperCaseId))))($$compiler$parsers_jg$$many($$compiler$jaguarParser_jg$$notUpperCaseId))))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("=")))(($$compiler$parsers_jg$$sepBy1($$compiler$jaguarParser_jg$$dataConP))($$compiler$jaguarParser_jg$$operatorP("|"))));
var $$compiler$jaguarParser_jg$$topLevelP = ($$compiler$jaguarParser_jg$$eitherP(($$compiler$jaguarParser_jg$$eitherP($$compiler$jaguarParser_jg$$dataP))($$compiler$jaguarParser_jg$$defP)))(($$compiler$jaguarParser_jg$$eitherP($$compiler$jaguarParser_jg$$classP))($$compiler$jaguarParser_jg$$instanceP));
var $$compiler$jaguarParser_jg$$splitFourWay = function(_1_e_$u$197){
return (function(){
var $pm = $$compiler$prelude_jg$$splitEither(_1_e_$u$197);return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_1_a_$u$198,_1_b_$u$199){
return ($$compiler$prelude_jg$$Pair($$compiler$prelude_jg$$splitEither(_1_a_$u$198)))($$compiler$prelude_jg$$splitEither(_1_b_$u$199))})($pm.$0,$pm.$1)):(error("pattern match fail"))})()};
var $$compiler$jaguarParser_jg$$moduleP = (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(function(_1_loc_$u$187){
return function(_1_is_$u$188){
return function(_1_es_$u$189){
return (function(){
var $pm = $$compiler$jaguarParser_jg$$splitFourWay(_1_es_$u$189);return ((($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)&&($pm.$0.$tag==$$compiler$prelude_jg$$Pair.$tag))&&($pm.$1.$tag==$$compiler$prelude_jg$$Pair.$tag))?((function(_1_dts_$u$190,_1_dfs_$u$191,_1_cs_$u$192,_1_ins_$u$193){
return (((((($$compiler$ast_jg$$Module(_1_loc_$u$187))((function(){
var $pm = $$compiler$ast_jg$$getAnnCodeLoc(_1_loc_$u$187);return (($pm.$tag==$$compiler$prelude_jg$$Just.$tag)&&($pm.$0.$tag==$$compiler$ast_jg$$AnnCodeLoc.$tag))?((function(_1_f_$u$194,_1___$u$195,_1___$u$196){
return _1_f_$u$194})($pm.$0.$0,$pm.$0.$1,$pm.$0.$2)):(error("pattern match fail"))})()))(_1_is_$u$188))(_1_dts_$u$190))(_1_cs_$u$192))(_1_ins_$u$193))(_1_dfs_$u$191)})($pm.$0.$0,$pm.$0.$1,$pm.$1.$0,$pm.$1.$1)):(error("pattern match fail"))})()}}})))($$compiler$jaguarParser_jg$$locP)))($$compiler$parsers_jg$$many($$compiler$jaguarParser_jg$$importP))))($$compiler$parsers_jg$$some($$compiler$jaguarParser_jg$$topLevelP));
var $$compiler$jaguarParser_jg$$parseModule = $$compiler$jaguarParser_jg$$runParser($$compiler$jaguarParser_jg$$moduleP);
var $$compiler$compiler_jg$$findImports = function(_0_m_$u$9){
return (function(){
var _0_importFileName_$u$10 = function(_0_i_$u$11){
return (function(){
var $pm = _0_i_$u$11;return ($pm.$tag==$$compiler$ast_jg$$ImportAll.$tag)?((function(_0___$u$12,_0_f_$u$13){
return _0_f_$u$13})($pm.$0,$pm.$1)):(($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)?((function(_0___$u$14,_0_f_$u$15,_0_ns_$u$16){
return _0_f_$u$15})($pm.$0,$pm.$1,$pm.$2)):(($pm.$tag==$$compiler$ast_jg$$ImportClosed.$tag)?((function(_0___$u$17,_0_f_$u$18,_0_n_$u$19){
return _0_f_$u$18})($pm.$0,$pm.$1,$pm.$2)):(error("pattern match fail"))))})()};return (function(){
var $pm = _0_m_$u$9;return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_0___$u$20,_0___$u$21,_0_is_$u$22,_0_ds_$u$23,_0_cs_$u$24,_0_ins_$u$25,_0_vs_$u$26){
return (map(_0_importFileName_$u$10))(_0_is_$u$22)})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})()})()};
var $$compiler$compiler_jg$$parseT = function(_0_s_$u$27){
return (function(){
var $pm = ($$compiler$jaguarParser_jg$$parseType(_0_s_$u$27))("");return ($pm.$tag==$$compiler$parsers_jg$$Success.$tag)?((function(_0_t_$u$28,_0_ps_$u$29){
return _0_t_$u$28})($pm.$0,$pm.$1)):((function(_0_e_$u$30){
return error(_0_e_$u$30)})($pm))})()};
var $$compiler$compiler_jg$$parseExports = function(_0_e_$u$31){
return (function(){
var _0_bs_$u$32 = (mapRecord(function(_0_s_$u$33){
return ($$compiler$prelude_jg$$evalState($$compiler$typer_jg$$newCtx))(($$compiler$typer_jg$$generalize($$compiler$typer_jg$$emptyEnv))($$compiler$compiler_jg$$parseT(_0_s_$u$33)))}))(_0_e_$u$31);return (($$compiler$ast_jg$$ModuleInterface(_0_bs_$u$32))(emptyArray))(emptyArray)})()};
var $$compiler$compiler_jg$$instrument = function(_0_m_$u$34){
return (function(){
var _0_addImport_$u$37 = function(_0_i_$u$51){
return (function(){
var $pm = _0_i_$u$51;return (($pm.$tag==$$compiler$ast_jg$$ImportOpen.$tag)&&("./builtins.js"==$pm.$1))?((function(_0_ann_$u$52,_0_syms_$u$53){
return (($$compiler$ast_jg$$ImportOpen(_0_ann_$u$52))("./builtins.js"))((push(($$compiler$prelude_jg$$Pair("perfTime"))("perfTime")))(_0_syms_$u$53))})($pm.$0,$pm.$2)):((function(_0___$u$54){
return _0_i_$u$51})($pm))})()};var _0_instrumentExpr_$u$36 = function(_0_n_$u$44){
return function(_0_e_$u$45){
return (function(){
var $pm = _0_e_$u$45;return ($pm.$tag==$$compiler$ast_jg$$Lam.$tag)?((function(_0_a_$u$46,_0_p_$u$47,_0_e_$u$48){
return (($$compiler$ast_jg$$Lam(_0_a_$u$46))(_0_p_$u$47))((_0_instrumentExpr_$u$36(_0_n_$u$44))(_0_e_$u$48))})($pm.$0,$pm.$1,$pm.$2)):((function(_0___$u$49){
return (function(){
var _0_we_$u$50 = (($$compiler$ast_jg$$Lam($$compiler$prelude_jg$$Empty))("$unused$"))(_0_e_$u$45);return (($$compiler$ast_jg$$App($$compiler$prelude_jg$$Empty))((($$compiler$ast_jg$$App($$compiler$prelude_jg$$Empty))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))("perfTime")))(($$compiler$ast_jg$$Const($$compiler$prelude_jg$$Empty))($$compiler$ast_jg$$CStr(_0_n_$u$44)))))(_0_we_$u$50)})()})($pm))})()}};var _0_instrumentDef_$u$35 = function(_0_d_$u$38){
return (function(){
var $pm = _0_d_$u$38;return (($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)&&($pm.$1.$tag==$$compiler$ast_jg$$Lam.$tag))?((function(_0_n_$u$39,_0_a_$u$40,_0_p_$u$41,_0_e_$u$42){
return ($$compiler$prelude_jg$$Pair(_0_n_$u$39))((_0_instrumentExpr_$u$36(_0_n_$u$39))((($$compiler$ast_jg$$Lam(_0_a_$u$40))(_0_p_$u$41))(_0_e_$u$42)))})($pm.$0,$pm.$1.$0,$pm.$1.$1,$pm.$1.$2)):((function(_0___$u$43){
return _0_d_$u$38})($pm))})()};return (function(){
var $pm = _0_m_$u$34;return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_0_ann_$u$55,_0_fn_$u$56,_0_is_$u$57,_0_ds_$u$58,_0_cs_$u$59,_0_ins_$u$60,_0_vs_$u$61){
return (((((($$compiler$ast_jg$$Module(_0_ann_$u$55))(_0_fn_$u$56))((map(_0_addImport_$u$37))(_0_is_$u$57)))(_0_ds_$u$58))(_0_cs_$u$59))(_0_ins_$u$60))((map(_0_instrumentDef_$u$35))(_0_vs_$u$61))})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})()})()};
var $$compiler$compiler_jg$$builtinsPathArg = ($$compiler$args_jg$$ArgString("builtins"))($$compiler$prelude_jg$$Nothing);
var $$compiler$compiler_jg$$outPathArg = ($$compiler$args_jg$$ArgString("out"))($$compiler$prelude_jg$$Nothing);
var $$compiler$compiler_jg$$mainArg = ($$compiler$args_jg$$ArgString("main"))($$compiler$prelude_jg$$Nothing);
var $$compiler$compiler_jg$$profileArg = ($$compiler$args_jg$$ArgBool("profile"))($$compiler$prelude_jg$$Just(false));
var $$compiler$compiler_jg$$compile = function(_0_s_$u$0){
return function(_0_fn_$u$1){
return (function(){
var $pm = ($$compiler$jaguarParser_jg$$parseModule(_0_s_$u$0))(_0_fn_$u$1);return (($pm.$tag==$$compiler$parsers_jg$$Success.$tag)&&($pm.$1.$tag==$$compiler$jaguarParser_jg$$ParserState.$tag))?((function(_0_m_$u$2,_0_ts_$u$3,_0_p_$u$4,_0_li_$u$5,_0_ri_$u$6,_0___$u$7){
return (function(){
var $pm = (($eq$eq($instance$Eq$0))(_0_p_$u$4))(length(_0_ts_$u$3));return $pm?((function(){
return _0_m_$u$2})()):((!$pm)?((function(){
return error(($concat("failed to parse all tokens, stopped at "))(jsonStringify((getIx(_0_p_$u$4))(_0_ts_$u$3))))})()):(error("pattern match fail")))})()})($pm.$0,$pm.$1.$0,$pm.$1.$1,$pm.$1.$2,$pm.$1.$3,$pm.$1.$4)):((function(_0_e_$u$8){
return error(_0_e_$u$8)})($pm))})()}};
var $$compiler$compiler_jg$$argDefs = (push($$compiler$compiler_jg$$builtinsPathArg))((push($$compiler$compiler_jg$$outPathArg))((push($$compiler$compiler_jg$$mainArg))((push($$compiler$compiler_jg$$profileArg))(emptyArray))));
var $$compiler$compiler_jg$$main = function(_0_argv_$u$62){
return (function(){
var _0_args_$u$63 = ($$compiler$args_jg$$parseArgs($$compiler$compiler_jg$$argDefs))((slice(2))(_0_argv_$u$62));var _0_builtinsPath_$u$64 = ($$compiler$args_jg$$getString(_0_args_$u$63))($$compiler$compiler_jg$$builtinsPathArg);var _0_mainName_$u$66 = ($concat("//"))(($$compiler$args_jg$$getString(_0_args_$u$63))($$compiler$compiler_jg$$mainArg));var _0_builtinsExports_$u$69 = loadJSExports(_0_builtinsPath_$u$64);var _0_exports_$u$73 = ((set("./builtins.js"))($$compiler$compiler_jg$$parseExports(_0_builtinsExports_$u$69)))(empty);var _0_srcFiles_$u$67 = $$compiler$args_jg$$getPositional(_0_args_$u$63);var _0_compiled_$u$70 = ((foldl(function(_0_ss_$u$81){
return function(_0_s_$u$82){
return (function(){
var _0_n_$u$83 = ($concat("//"))(_0_s_$u$82);return ((set(_0_n_$u$83))(($$compiler$compiler_jg$$compile(readFile(_0_s_$u$82)))(_0_n_$u$83)))(_0_ss_$u$81)})()}}))(empty))(_0_srcFiles_$u$67);var _0_imports_$u$71 = (mapRecord($$compiler$compiler_jg$$findImports))(_0_compiled_$u$70);var _0_ordered_$u$72 = (($$compiler$graph_jg$$dfs(_0_imports_$u$71))(emptyArray))(_0_mainName_$u$66);var _0_perModulePasses_$u$74 = function(_0_er_$u$84){
return function(_0_ixn_$u$85){
return (function(){
var $pm = _0_er_$u$84;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_0_exports_$u$86,_0_result_$u$87){
return (function(){
var $pm = _0_ixn_$u$85;return ($pm.$tag==$$compiler$prelude_jg$$Pair.$tag)?((function(_0_ix_$u$88,_0_n_$u$89){
return (function(){
var _0_m_$u$90 = (get(_0_n_$u$89))(_0_compiled_$u$70);var _0_normalized_$u$91 = (($$compiler$uniquifier_jg$$uniquify(($concat(($concat("_"))(intToString(_0_ix_$u$88))))("_")))(_0_exports_$u$86))(($$compiler$importNormalizer_jg$$normalizeImports(_0_exports_$u$86))(_0_m_$u$90));var _0_typed_$u$92 = ($$compiler$typer_jg$$inferTypeModule(_0_exports_$u$86))(_0_normalized_$u$91);var _0_declassed_$u$94 = ($$compiler$declasser_jg$$declassModule(_0_exports_$u$86))(_0_typed_$u$92);var _0_e_$u$93 = $$compiler$typer_jg$$getTypedExports(_0_typed_$u$92);return ($$compiler$prelude_jg$$Pair(((set(_0_n_$u$89))(_0_e_$u$93))(_0_exports_$u$86)))((push(_0_declassed_$u$94))(_0_result_$u$87))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()})($pm.$0,$pm.$1)):(error("pattern match fail"))})()}};var _0_modules_$u$75 = $$compiler$prelude_jg$$snd(((foldr(_0_perModulePasses_$u$74))(($$compiler$prelude_jg$$Pair(_0_exports_$u$73))(emptyArray)))($$compiler$prelude_jg$$zipWithIndex(_0_ordered_$u$72)));var _0_external_$u$76 = (function(){
var $pm = $$compiler$prelude_jg$$last(_0_modules_$u$75);return ($pm.$tag==$$compiler$ast_jg$$Module.$tag)?((function(_0___$u$95,_0___$u$96,_0___$u$97,_0_ds_$u$98,_0___$u$99,_0___$u$100,_0_bs_$u$101){
return (concat((map($$compiler$prelude_jg$$fst))(_0_bs_$u$101)))(($$compiler$prelude_jg$$concatMap($$compiler$ast_jg$$dataConNames))(_0_ds_$u$98))})($pm.$0,$pm.$1,$pm.$2,$pm.$3,$pm.$4,$pm.$5,$pm.$6)):(error("pattern match fail"))})();var _0_merged_$u$77 = $$compiler$moduleMerger_jg$$mergeModules(_0_modules_$u$75);var _0_optimized_$u$78 = ($$compiler$inliner_jg$$inline(_0_external_$u$76))(_0_merged_$u$77);var _0_profile_$u$68 = ($$compiler$args_jg$$getBool(_0_args_$u$63))($$compiler$compiler_jg$$profileArg);var _0_rawjs_$u$79 = (function(){
var $pm = _0_profile_$u$68;return $pm?((function(){
return ($$compiler$js$backend_jg$$compileModule(_0_exports_$u$73))($$compiler$compiler_jg$$instrument(_0_optimized_$u$78))})()):((!$pm)?((function(){
return ($$compiler$js$backend_jg$$compileModule(_0_exports_$u$73))(_0_optimized_$u$78)})()):(error("pattern match fail")))})();var _0_js_$u$80 = (($$compiler$js$backend_jg$$combineModules(_0_mainName_$u$66))(_0_builtinsPath_$u$64))(($$compiler$prelude_jg$$$($$compiler$prelude_jg$$arr1))(($$compiler$prelude_jg$$Pair(_0_mainName_$u$66))(_0_rawjs_$u$79)));var _0_outPath_$u$65 = ($$compiler$args_jg$$getString(_0_args_$u$63))($$compiler$compiler_jg$$outPathArg);return (writeFile(_0_js_$u$80))(_0_outPath_$u$65)})()};
var exports = {$$compiler$prelude_jg$$Unit:$$compiler$prelude_jg$$Unit,$$compiler$prelude_jg$$Just:$$compiler$prelude_jg$$Just,$$compiler$prelude_jg$$Nothing:$$compiler$prelude_jg$$Nothing,$$compiler$prelude_jg$$Pair:$$compiler$prelude_jg$$Pair,$$compiler$prelude_jg$$Left:$$compiler$prelude_jg$$Left,$$compiler$prelude_jg$$Right:$$compiler$prelude_jg$$Right,$$compiler$prelude_jg$$State:$$compiler$prelude_jg$$State,$$compiler$prelude_jg$$Empty:$$compiler$prelude_jg$$Empty,$$compiler$prelude_jg$$Leaf:$$compiler$prelude_jg$$Leaf,$$compiler$prelude_jg$$Collision:$$compiler$prelude_jg$$Collision,$$compiler$prelude_jg$$BitmapIndexed:$$compiler$prelude_jg$$BitmapIndexed,$class$Eq:$class$Eq,$class$Ord:$class$Ord,$class$Functor:$class$Functor,$class$Applicative:$class$Applicative,$class$Alternative:$class$Alternative,$class$Monad:$class$Monad,$class$Hashable:$class$Hashable,$$compiler$ast_jg$$AnnType:$$compiler$ast_jg$$AnnType,$$compiler$ast_jg$$AnnCodeLoc:$$compiler$ast_jg$$AnnCodeLoc,$$compiler$ast_jg$$AnnUseCount:$$compiler$ast_jg$$AnnUseCount,$$compiler$ast_jg$$Var:$$compiler$ast_jg$$Var,$$compiler$ast_jg$$Const:$$compiler$ast_jg$$Const,$$compiler$ast_jg$$App:$$compiler$ast_jg$$App,$$compiler$ast_jg$$Lam:$$compiler$ast_jg$$Lam,$$compiler$ast_jg$$Case:$$compiler$ast_jg$$Case,$$compiler$ast_jg$$Let:$$compiler$ast_jg$$Let,$$compiler$ast_jg$$CNum:$$compiler$ast_jg$$CNum,$$compiler$ast_jg$$CStr:$$compiler$ast_jg$$CStr,$$compiler$ast_jg$$PVar:$$compiler$ast_jg$$PVar,$$compiler$ast_jg$$PConst:$$compiler$ast_jg$$PConst,$$compiler$ast_jg$$PData:$$compiler$ast_jg$$PData,$$compiler$ast_jg$$Module:$$compiler$ast_jg$$Module,$$compiler$ast_jg$$ModuleInterface:$$compiler$ast_jg$$ModuleInterface,$$compiler$ast_jg$$Data:$$compiler$ast_jg$$Data,$$compiler$ast_jg$$DataCon:$$compiler$ast_jg$$DataCon,$$compiler$ast_jg$$Class:$$compiler$ast_jg$$Class,$$compiler$ast_jg$$Instance:$$compiler$ast_jg$$Instance,$$compiler$ast_jg$$TCBound:$$compiler$ast_jg$$TCBound,$$compiler$ast_jg$$TConst:$$compiler$ast_jg$$TConst,$$compiler$ast_jg$$TVar:$$compiler$ast_jg$$TVar,$$compiler$ast_jg$$TApp:$$compiler$ast_jg$$TApp,$$compiler$ast_jg$$TBot:$$compiler$ast_jg$$TBot,$$compiler$ast_jg$$TForall:$$compiler$ast_jg$$TForall,$$compiler$ast_jg$$TUnknown:$$compiler$ast_jg$$TUnknown,$$compiler$ast_jg$$ImportClosed:$$compiler$ast_jg$$ImportClosed,$$compiler$ast_jg$$ImportOpen:$$compiler$ast_jg$$ImportOpen,$$compiler$ast_jg$$ImportAll:$$compiler$ast_jg$$ImportAll,$$compiler$typer_jg$$Subs:$$compiler$typer_jg$$Subs,$$compiler$typer_jg$$ICtx:$$compiler$typer_jg$$ICtx,$$compiler$typer_jg$$IEnv:$$compiler$typer_jg$$IEnv,$$compiler$declasser_jg$$S:$$compiler$declasser_jg$$S,$$compiler$args_jg$$ArgBool:$$compiler$args_jg$$ArgBool,$$compiler$args_jg$$ArgString:$$compiler$args_jg$$ArgString,$$compiler$args_jg$$ParsedArgs:$$compiler$args_jg$$ParsedArgs,$$compiler$js$ast_jg$$JSRef:$$compiler$js$ast_jg$$JSRef,$$compiler$js$ast_jg$$JSIndex:$$compiler$js$ast_jg$$JSIndex,$$compiler$js$ast_jg$$JSUnOp:$$compiler$js$ast_jg$$JSUnOp,$$compiler$js$ast_jg$$JSBinOp:$$compiler$js$ast_jg$$JSBinOp,$$compiler$js$ast_jg$$JSCall:$$compiler$js$ast_jg$$JSCall,$$compiler$js$ast_jg$$JSFun:$$compiler$js$ast_jg$$JSFun,$$compiler$js$ast_jg$$JSTernary:$$compiler$js$ast_jg$$JSTernary,$$compiler$js$ast_jg$$JSNum:$$compiler$js$ast_jg$$JSNum,$$compiler$js$ast_jg$$JSString:$$compiler$js$ast_jg$$JSString,$$compiler$js$ast_jg$$JSBool:$$compiler$js$ast_jg$$JSBool,$$compiler$js$ast_jg$$JSObject:$$compiler$js$ast_jg$$JSObject,$$compiler$js$ast_jg$$JSNull:$$compiler$js$ast_jg$$JSNull,$$compiler$js$ast_jg$$JSUndefined:$$compiler$js$ast_jg$$JSUndefined,$$compiler$js$ast_jg$$JSInstanceOf:$$compiler$js$ast_jg$$JSInstanceOf,$$compiler$js$ast_jg$$JSNew:$$compiler$js$ast_jg$$JSNew,$$compiler$js$ast_jg$$JSSeq:$$compiler$js$ast_jg$$JSSeq,$$compiler$js$ast_jg$$JSExpr:$$compiler$js$ast_jg$$JSExpr,$$compiler$js$ast_jg$$JSReturn:$$compiler$js$ast_jg$$JSReturn,$$compiler$js$ast_jg$$JSVar:$$compiler$js$ast_jg$$JSVar,$$compiler$js$ast_jg$$JSSwitch:$$compiler$js$ast_jg$$JSSwitch,$$compiler$js$ast_jg$$JSBreak:$$compiler$js$ast_jg$$JSBreak,$$compiler$js$ast_jg$$JSAssign:$$compiler$js$ast_jg$$JSAssign,$$compiler$parsers_jg$$Success:$$compiler$parsers_jg$$Success,$$compiler$parsers_jg$$Error:$$compiler$parsers_jg$$Error,$$compiler$parsers_jg$$Parser:$$compiler$parsers_jg$$Parser,$$compiler$jaguarLexer_jg$$LexerState:$$compiler$jaguarLexer_jg$$LexerState,$$compiler$jaguarLexer_jg$$WsTok:$$compiler$jaguarLexer_jg$$WsTok,$$compiler$jaguarLexer_jg$$SymTok:$$compiler$jaguarLexer_jg$$SymTok,$$compiler$jaguarLexer_jg$$NumTok:$$compiler$jaguarLexer_jg$$NumTok,$$compiler$jaguarLexer_jg$$StrTok:$$compiler$jaguarLexer_jg$$StrTok,$$compiler$jaguarLexer_jg$$OpTok:$$compiler$jaguarLexer_jg$$OpTok,$$compiler$jaguarLexer_jg$$IdTok:$$compiler$jaguarLexer_jg$$IdTok,$$compiler$jaguarLexer_jg$$ComTok:$$compiler$jaguarLexer_jg$$ComTok,$$compiler$jaguarLexer_jg$$Token:$$compiler$jaguarLexer_jg$$Token,$$compiler$jaguarParser_jg$$ParserState:$$compiler$jaguarParser_jg$$ParserState,$eq$eq:$eq$eq,$lt:$lt,fmap:fmap,pure:pure,$lt$mul$gt:$lt$mul$gt,$lt$pip$gt:$lt$pip$gt,ret:ret,$gt$gt$eq:$gt$gt$eq,hashCode:hashCode,$instance$Eq$0:$instance$Eq$0,$instance$Eq$1:$instance$Eq$1,$instance$Ord$2:$instance$Ord$2,$instance$Ord$3:$instance$Ord$3,$instance$Functor$4:$instance$Functor$4,$instance$Applicative$5:$instance$Applicative$5,$instance$Alternative$6:$instance$Alternative$6,$instance$Functor$9:$instance$Functor$9,$instance$Applicative$10:$instance$Applicative$10,$instance$Monad$11:$instance$Monad$11,$instance$Hashable$13:$instance$Hashable$13,$$compiler$prelude_jg$$emptySet:$$compiler$prelude_jg$$emptySet,$$compiler$prelude_jg$$not:$$compiler$prelude_jg$$not,$$compiler$prelude_jg$$$div$eq:$$compiler$prelude_jg$$$div$eq,$$compiler$prelude_jg$$fst:$$compiler$prelude_jg$$fst,$$compiler$prelude_jg$$mapIx:$$compiler$prelude_jg$$mapIx,$$compiler$prelude_jg$$arr1:$$compiler$prelude_jg$$arr1,$$compiler$prelude_jg$$arr2:$$compiler$prelude_jg$$arr2,$$compiler$prelude_jg$$hamtMask:$$compiler$prelude_jg$$hamtMask,$$compiler$prelude_jg$$popCount:$$compiler$prelude_jg$$popCount,$$compiler$prelude_jg$$hamtIndex:$$compiler$prelude_jg$$hamtIndex,$$compiler$prelude_jg$$insert:$$compiler$prelude_jg$$insert,$$compiler$prelude_jg$$setAdd:$$compiler$prelude_jg$$setAdd,$$compiler$prelude_jg$$isJust:$$compiler$prelude_jg$$isJust,$$compiler$prelude_jg$$$:$$compiler$prelude_jg$$$,$$compiler$prelude_jg$$snd:$$compiler$prelude_jg$$snd,$$compiler$prelude_jg$$loop:$$compiler$prelude_jg$$loop,$$compiler$prelude_jg$$find:$$compiler$prelude_jg$$find,$$compiler$prelude_jg$$lookup:$$compiler$prelude_jg$$lookup,$$compiler$prelude_jg$$setContains:$$compiler$prelude_jg$$setContains,$$compiler$prelude_jg$$foldTrie:$$compiler$prelude_jg$$foldTrie,$$compiler$prelude_jg$$setIntersection:$$compiler$prelude_jg$$setIntersection,$$compiler$prelude_jg$$remove:$$compiler$prelude_jg$$remove,$$compiler$prelude_jg$$setRemove:$$compiler$prelude_jg$$setRemove,$$compiler$prelude_jg$$setDiff:$$compiler$prelude_jg$$setDiff,$$compiler$prelude_jg$$setToArray:$$compiler$prelude_jg$$setToArray,$$compiler$prelude_jg$$mergeTrie:$$compiler$prelude_jg$$mergeTrie,$$compiler$prelude_jg$$setUnion:$$compiler$prelude_jg$$setUnion,$$compiler$prelude_jg$$isEmpty:$$compiler$prelude_jg$$isEmpty,$$compiler$prelude_jg$$size:$$compiler$prelude_jg$$size,$$compiler$prelude_jg$$runState:$$compiler$prelude_jg$$runState,$$compiler$prelude_jg$$evalState:$$compiler$prelude_jg$$evalState,$$compiler$prelude_jg$$sets:$$compiler$prelude_jg$$sets,$$compiler$prelude_jg$$gets:$$compiler$prelude_jg$$gets,$$compiler$prelude_jg$$foldM:$$compiler$prelude_jg$$foldM,$$compiler$prelude_jg$$mapM:$$compiler$prelude_jg$$mapM,$$compiler$prelude_jg$$strToArray:$$compiler$prelude_jg$$strToArray,$$compiler$prelude_jg$$toRecord:$$compiler$prelude_jg$$toRecord,$$compiler$prelude_jg$$reverse:$$compiler$prelude_jg$$reverse,$$compiler$prelude_jg$$tail:$$compiler$prelude_jg$$tail,$$compiler$prelude_jg$$head:$$compiler$prelude_jg$$head,$$compiler$prelude_jg$$uniq:$$compiler$prelude_jg$$uniq,$$compiler$prelude_jg$$mergeSet:$$compiler$prelude_jg$$mergeSet,$$compiler$prelude_jg$$arr3:$$compiler$prelude_jg$$arr3,$$compiler$prelude_jg$$init:$$compiler$prelude_jg$$init,$$compiler$prelude_jg$$last:$$compiler$prelude_jg$$last,$$compiler$prelude_jg$$concatMap:$$compiler$prelude_jg$$concatMap,$$compiler$prelude_jg$$zip:$$compiler$prelude_jg$$zip,$$compiler$prelude_jg$$zipWithIndex2:$$compiler$prelude_jg$$zipWithIndex2,$$compiler$prelude_jg$$zipWithIndex:$$compiler$prelude_jg$$zipWithIndex,$$compiler$prelude_jg$$join:$$compiler$prelude_jg$$join,$$compiler$prelude_jg$$all:$$compiler$prelude_jg$$all,$$compiler$prelude_jg$$exists:$$compiler$prelude_jg$$exists,$$compiler$prelude_jg$$containsChar:$$compiler$prelude_jg$$containsChar,$$compiler$prelude_jg$$contains:$$compiler$prelude_jg$$contains,$$compiler$prelude_jg$$either:$$compiler$prelude_jg$$either,$$compiler$prelude_jg$$splitEither:$$compiler$prelude_jg$$splitEither,$$compiler$prelude_jg$$fromJust:$$compiler$prelude_jg$$fromJust,$$compiler$prelude_jg$$justOr:$$compiler$prelude_jg$$justOr,$$compiler$prelude_jg$$$gt$gt:$$compiler$prelude_jg$$$gt$gt,$$compiler$prelude_jg$$$gt:$$compiler$prelude_jg$$$gt,$$compiler$ast_jg$$Empty:$$compiler$ast_jg$$Empty,$$compiler$ast_jg$$breakableDownAndUpM:$$compiler$ast_jg$$breakableDownAndUpM,$$compiler$ast_jg$$breakableDownM:$$compiler$ast_jg$$breakableDownM,$$compiler$ast_jg$$downAndUpM:$$compiler$ast_jg$$downAndUpM,$$compiler$ast_jg$$breakableDownAndUp:$$compiler$ast_jg$$breakableDownAndUp,$$compiler$ast_jg$$breakableDown:$$compiler$ast_jg$$breakableDown,$$compiler$ast_jg$$downAndUp:$$compiler$ast_jg$$downAndUp,$$compiler$ast_jg$$down:$$compiler$ast_jg$$down,$$compiler$ast_jg$$up:$$compiler$ast_jg$$up,$$compiler$ast_jg$$getAnn:$$compiler$ast_jg$$getAnn,$$compiler$ast_jg$$getAnnType:$$compiler$ast_jg$$getAnnType,$$compiler$ast_jg$$annOf:$$compiler$ast_jg$$annOf,$$compiler$ast_jg$$getType:$$compiler$ast_jg$$getType,$$compiler$ast_jg$$withAnn:$$compiler$ast_jg$$withAnn,$$compiler$ast_jg$$setAnn:$$compiler$ast_jg$$setAnn,$$compiler$ast_jg$$setAnnType:$$compiler$ast_jg$$setAnnType,$$compiler$ast_jg$$setType:$$compiler$ast_jg$$setType,$$compiler$ast_jg$$dataConName:$$compiler$ast_jg$$dataConName,$$compiler$ast_jg$$dataConNames:$$compiler$ast_jg$$dataConNames,$$compiler$ast_jg$$getExports:$$compiler$ast_jg$$getExports,$$compiler$ast_jg$$equivBound:$$compiler$ast_jg$$equivBound,$$compiler$ast_jg$$equivType:$$compiler$ast_jg$$equivType,$$compiler$ast_jg$$printCodeLoc:$$compiler$ast_jg$$printCodeLoc,$$compiler$ast_jg$$getAnnCodeLoc:$$compiler$ast_jg$$getAnnCodeLoc,$$compiler$ast_jg$$emptyAnn:$$compiler$ast_jg$$emptyAnn,$$compiler$inliner_jg$$mergeCount:$$compiler$inliner_jg$$mergeCount,$$compiler$inliner_jg$$processImports:$$compiler$inliner_jg$$processImports,$$compiler$inliner_jg$$processData:$$compiler$inliner_jg$$processData,$$compiler$inliner_jg$$getCount:$$compiler$inliner_jg$$getCount,$$compiler$inliner_jg$$annWithUseCount:$$compiler$inliner_jg$$annWithUseCount,$$compiler$inliner_jg$$chooseForInlining:$$compiler$inliner_jg$$chooseForInlining,$$compiler$inliner_jg$$inlineCode:$$compiler$inliner_jg$$inlineCode,$$compiler$inliner_jg$$dropDeadBindings:$$compiler$inliner_jg$$dropDeadBindings,$$compiler$inliner_jg$$deadCode:$$compiler$inliner_jg$$deadCode,$$compiler$inliner_jg$$pass:$$compiler$inliner_jg$$pass,$$compiler$inliner_jg$$inline:$$compiler$inliner_jg$$inline,$$compiler$uniquifier_jg$$newIdent:$$compiler$uniquifier_jg$$newIdent,$$compiler$uniquifier_jg$$rewriteExpr:$$compiler$uniquifier_jg$$rewriteExpr,$$compiler$uniquifier_jg$$rewriteBindingsNoPrefix:$$compiler$uniquifier_jg$$rewriteBindingsNoPrefix,$$compiler$uniquifier_jg$$rewriteInstance:$$compiler$uniquifier_jg$$rewriteInstance,$$compiler$uniquifier_jg$$addPrefix:$$compiler$uniquifier_jg$$addPrefix,$$compiler$uniquifier_jg$$rewriteBindings:$$compiler$uniquifier_jg$$rewriteBindings,$$compiler$uniquifier_jg$$renameImport:$$compiler$uniquifier_jg$$renameImport,$$compiler$uniquifier_jg$$renameData:$$compiler$uniquifier_jg$$renameData,$$compiler$uniquifier_jg$$rewriteModule:$$compiler$uniquifier_jg$$rewriteModule,$$compiler$uniquifier_jg$$uniquify:$$compiler$uniquifier_jg$$uniquify,$$compiler$moduleMerger_jg$$importAsBindings:$$compiler$moduleMerger_jg$$importAsBindings,$$compiler$moduleMerger_jg$$mergeInto:$$compiler$moduleMerger_jg$$mergeInto,$$compiler$moduleMerger_jg$$mergeModules:$$compiler$moduleMerger_jg$$mergeModules,$$compiler$graph_jg$$dfs:$$compiler$graph_jg$$dfs,$$compiler$graph_jg$$fullDfs:$$compiler$graph_jg$$fullDfs,$$compiler$graph_jg$$scc:$$compiler$graph_jg$$scc,$$compiler$graph_jg$$sccSorted:$$compiler$graph_jg$$sccSorted,$$compiler$printer_jg$$printType:$$compiler$printer_jg$$printType,$$compiler$printer_jg$$printTypeBound:$$compiler$printer_jg$$printTypeBound,$$compiler$printer_jg$$indent:$$compiler$printer_jg$$indent,$$compiler$printer_jg$$printExprTyped:$$compiler$printer_jg$$printExprTyped,$$compiler$printer_jg$$printDef:$$compiler$printer_jg$$printDef,$$compiler$printer_jg$$reallyPrintExpr:$$compiler$printer_jg$$reallyPrintExpr,$$compiler$typer_jg$$instanceToTypeBound:$$compiler$typer_jg$$instanceToTypeBound,$$compiler$typer_jg$$mkTForall:$$compiler$typer_jg$$mkTForall,$$compiler$typer_jg$$f1:$$compiler$typer_jg$$f1,$$compiler$typer_jg$$conType:$$compiler$typer_jg$$conType,$$compiler$typer_jg$$conTypes:$$compiler$typer_jg$$conTypes,$$compiler$typer_jg$$getTypedExports:$$compiler$typer_jg$$getTypedExports,$$compiler$typer_jg$$getSubs:$$compiler$typer_jg$$getSubs,$$compiler$typer_jg$$getSub:$$compiler$typer_jg$$getSub,$$compiler$typer_jg$$dropSubs:$$compiler$typer_jg$$dropSubs,$$compiler$typer_jg$$applySubs:$$compiler$typer_jg$$applySubs,$$compiler$typer_jg$$applySubsBound:$$compiler$typer_jg$$applySubsBound,$$compiler$typer_jg$$applySubsE:$$compiler$typer_jg$$applySubsE,$$compiler$typer_jg$$applySubsDef:$$compiler$typer_jg$$applySubsDef,$$compiler$typer_jg$$freeVars:$$compiler$typer_jg$$freeVars,$$compiler$typer_jg$$newTVarM:$$compiler$typer_jg$$newTVarM,$$compiler$typer_jg$$errorM:$$compiler$typer_jg$$errorM,$$compiler$typer_jg$$getSafe:$$compiler$typer_jg$$getSafe,$$compiler$typer_jg$$getBinding:$$compiler$typer_jg$$getBinding,$$compiler$typer_jg$$getBindingM:$$compiler$typer_jg$$getBindingM,$$compiler$typer_jg$$getBindings:$$compiler$typer_jg$$getBindings,$$compiler$typer_jg$$hasBinding:$$compiler$typer_jg$$hasBinding,$$compiler$typer_jg$$freeTVars:$$compiler$typer_jg$$freeTVars,$$compiler$typer_jg$$freeTVarsInBound:$$compiler$typer_jg$$freeTVarsInBound,$$compiler$typer_jg$$addBinding:$$compiler$typer_jg$$addBinding,$$compiler$typer_jg$$addBindings:$$compiler$typer_jg$$addBindings,$$compiler$typer_jg$$emptySubs:$$compiler$typer_jg$$emptySubs,$$compiler$typer_jg$$composeSubs:$$compiler$typer_jg$$composeSubs,$$compiler$typer_jg$$addSub:$$compiler$typer_jg$$addSub,$$compiler$typer_jg$$addSatSub:$$compiler$typer_jg$$addSatSub,$$compiler$typer_jg$$substitute:$$compiler$typer_jg$$substitute,$$compiler$typer_jg$$unify:$$compiler$typer_jg$$unify,$$compiler$typer_jg$$newTVar:$$compiler$typer_jg$$newTVar,$$compiler$typer_jg$$addBound:$$compiler$typer_jg$$addBound,$$compiler$typer_jg$$instantiate:$$compiler$typer_jg$$instantiate,$$compiler$typer_jg$$setSubs:$$compiler$typer_jg$$setSubs,$$compiler$typer_jg$$getErrorF:$$compiler$typer_jg$$getErrorF,$$compiler$typer_jg$$unifyM:$$compiler$typer_jg$$unifyM,$$compiler$typer_jg$$onError:$$compiler$typer_jg$$onError,$$compiler$typer_jg$$withError:$$compiler$typer_jg$$withError,$$compiler$typer_jg$$withLocError:$$compiler$typer_jg$$withLocError,$$compiler$typer_jg$$unrollDataConType:$$compiler$typer_jg$$unrollDataConType,$$compiler$typer_jg$$getBounds:$$compiler$typer_jg$$getBounds,$$compiler$typer_jg$$setBounds:$$compiler$typer_jg$$setBounds,$$compiler$typer_jg$$freeTVarsInEnv:$$compiler$typer_jg$$freeTVarsInEnv,$$compiler$typer_jg$$generalize:$$compiler$typer_jg$$generalize,$$compiler$typer_jg$$getInstances:$$compiler$typer_jg$$getInstances,$$compiler$typer_jg$$satisfies:$$compiler$typer_jg$$satisfies,$$compiler$typer_jg$$satisfiesBound:$$compiler$typer_jg$$satisfiesBound,$$compiler$typer_jg$$dropSatisfiedBounds:$$compiler$typer_jg$$dropSatisfiedBounds,$$compiler$typer_jg$$infer:$$compiler$typer_jg$$infer,$$compiler$typer_jg$$inferSccDefs:$$compiler$typer_jg$$inferSccDefs,$$compiler$typer_jg$$inferDefs:$$compiler$typer_jg$$inferDefs,$$compiler$typer_jg$$newCtx:$$compiler$typer_jg$$newCtx,$$compiler$typer_jg$$inferInstance:$$compiler$typer_jg$$inferInstance,$$compiler$typer_jg$$classToBindings:$$compiler$typer_jg$$classToBindings,$$compiler$typer_jg$$emptyEnv:$$compiler$typer_jg$$emptyEnv,$$compiler$typer_jg$$addInstance:$$compiler$typer_jg$$addInstance,$$compiler$typer_jg$$inferTypeModule:$$compiler$typer_jg$$inferTypeModule,$$compiler$importNormalizer_jg$$addPrefix:$$compiler$importNormalizer_jg$$addPrefix,$$compiler$importNormalizer_jg$$normalize:$$compiler$importNormalizer_jg$$normalize,$$compiler$importNormalizer_jg$$normalizeImports:$$compiler$importNormalizer_jg$$normalizeImports,$$compiler$declasser_jg$$setEnv:$$compiler$declasser_jg$$setEnv,$$compiler$declasser_jg$$instanceNameFromBound:$$compiler$declasser_jg$$instanceNameFromBound,$$compiler$declasser_jg$$getEnv:$$compiler$declasser_jg$$getEnv,$$compiler$declasser_jg$$breakableDownAndUpWithEnv:$$compiler$declasser_jg$$breakableDownAndUpWithEnv,$$compiler$declasser_jg$$addPrefix:$$compiler$declasser_jg$$addPrefix,$$compiler$declasser_jg$$rewriteExpr:$$compiler$declasser_jg$$rewriteExpr,$$compiler$declasser_jg$$instanceNameFromImport:$$compiler$declasser_jg$$instanceNameFromImport,$$compiler$declasser_jg$$instanceName2:$$compiler$declasser_jg$$instanceName2,$$compiler$declasser_jg$$rewriteImportedBound:$$compiler$declasser_jg$$rewriteImportedBound,$$compiler$declasser_jg$$className:$$compiler$declasser_jg$$className,$$compiler$declasser_jg$$rewriteImportedInstances:$$compiler$declasser_jg$$rewriteImportedInstances,$$compiler$declasser_jg$$className2:$$compiler$declasser_jg$$className2,$$compiler$declasser_jg$$rewriteClassToFun:$$compiler$declasser_jg$$rewriteClassToFun,$$compiler$declasser_jg$$rewriteClassToData:$$compiler$declasser_jg$$rewriteClassToData,$$compiler$declasser_jg$$importsToTypeEnv:$$compiler$declasser_jg$$importsToTypeEnv,$$compiler$declasser_jg$$instanceName:$$compiler$declasser_jg$$instanceName,$$compiler$declasser_jg$$rewriteInstance:$$compiler$declasser_jg$$rewriteInstance,$$compiler$declasser_jg$$declassModule:$$compiler$declasser_jg$$declassModule,$instance$Eq$0:$instance$Eq$0,$$compiler$args_jg$$getBool:$$compiler$args_jg$$getBool,$$compiler$args_jg$$getString:$$compiler$args_jg$$getString,$$compiler$args_jg$$getPositional:$$compiler$args_jg$$getPositional,$$compiler$args_jg$$argName:$$compiler$args_jg$$argName,$$compiler$args_jg$$parseArgs:$$compiler$args_jg$$parseArgs,$$compiler$js$deadCode_jg$$tryDCE:$$compiler$js$deadCode_jg$$tryDCE,$$compiler$js$deadCode_jg$$rewriteDCE:$$compiler$js$deadCode_jg$$rewriteDCE,$$compiler$js$deadCode_jg$$rewriteStmt:$$compiler$js$deadCode_jg$$rewriteStmt,$$compiler$js$printer_jg$$paren:$$compiler$js$printer_jg$$paren,$$compiler$js$printer_jg$$jsExprToString:$$compiler$js$printer_jg$$jsExprToString,$$compiler$js$printer_jg$$jsExprToParenString:$$compiler$js$printer_jg$$jsExprToParenString,$$compiler$js$printer_jg$$keyValueToString:$$compiler$js$printer_jg$$keyValueToString,$$compiler$js$printer_jg$$jsStmtToString:$$compiler$js$printer_jg$$jsStmtToString,$$compiler$js$printer_jg$$caseToString:$$compiler$js$printer_jg$$caseToString,$$compiler$js$jaguarToJs_jg$$opChar:$$compiler$js$jaguarToJs_jg$$opChar,$$compiler$js$jaguarToJs_jg$$opName:$$compiler$js$jaguarToJs_jg$$opName,$$compiler$js$jaguarToJs_jg$$processPattern:$$compiler$js$jaguarToJs_jg$$processPattern,$$compiler$js$jaguarToJs_jg$$binOp:$$compiler$js$jaguarToJs_jg$$binOp,$$compiler$js$jaguarToJs_jg$$jaguarExprToJsExpr:$$compiler$js$jaguarToJs_jg$$jaguarExprToJsExpr,$$compiler$js$jaguarToJs_jg$$assemblePatternMatch:$$compiler$js$jaguarToJs_jg$$assemblePatternMatch,$$compiler$js$jaguarToJs_jg$$defToJs:$$compiler$js$jaguarToJs_jg$$defToJs,$$compiler$js$jaguarToJs_jg$$requireExpr:$$compiler$js$jaguarToJs_jg$$requireExpr,$$compiler$js$jaguarToJs_jg$$buildImports:$$compiler$js$jaguarToJs_jg$$buildImports,$$compiler$js$jaguarToJs_jg$$importToJs:$$compiler$js$jaguarToJs_jg$$importToJs,$$compiler$js$jaguarToJs_jg$$checkUndefined:$$compiler$js$jaguarToJs_jg$$checkUndefined,$$compiler$js$jaguarToJs_jg$$dataConFieldIds:$$compiler$js$jaguarToJs_jg$$dataConFieldIds,$$compiler$js$jaguarToJs_jg$$dataConToJs:$$compiler$js$jaguarToJs_jg$$dataConToJs,$$compiler$js$jaguarToJs_jg$$dataToJs:$$compiler$js$jaguarToJs_jg$$dataToJs,$$compiler$js$jaguarToJs_jg$$exportObject:$$compiler$js$jaguarToJs_jg$$exportObject,$$compiler$js$jaguarToJs_jg$$moduleToJs:$$compiler$js$jaguarToJs_jg$$moduleToJs,$$compiler$js$backend_jg$$combineModules:$$compiler$js$backend_jg$$combineModules,$$compiler$js$backend_jg$$compileModule:$$compiler$js$backend_jg$$compileModule,$instance$Applicative$1:$instance$Applicative$1,$instance$Alternative$2:$instance$Alternative$2,$$compiler$parsers_jg$$upperCaseLetters:$$compiler$parsers_jg$$upperCaseLetters,$$compiler$parsers_jg$$letters:$$compiler$parsers_jg$$letters,$$compiler$parsers_jg$$digits:$$compiler$parsers_jg$$digits,$$compiler$parsers_jg$$success:$$compiler$parsers_jg$$success,$$compiler$parsers_jg$$opt:$$compiler$parsers_jg$$opt,$$compiler$parsers_jg$$$pip$gt:$$compiler$parsers_jg$$$pip$gt,$$compiler$parsers_jg$$applyParser:$$compiler$parsers_jg$$applyParser,$$compiler$parsers_jg$$many:$$compiler$parsers_jg$$many,$$compiler$parsers_jg$$sepBy1:$$compiler$parsers_jg$$sepBy1,$$compiler$parsers_jg$$some:$$compiler$parsers_jg$$some,$$compiler$parsers_jg$$$lt$pip:$$compiler$parsers_jg$$$lt$pip,$$compiler$jaguarLexer_jg$$runLexer:$$compiler$jaguarLexer_jg$$runLexer,$$compiler$jaguarLexer_jg$$mkTok:$$compiler$jaguarLexer_jg$$mkTok,$$compiler$jaguarLexer_jg$$parseChar:$$compiler$jaguarLexer_jg$$parseChar,$$compiler$jaguarLexer_jg$$charP:$$compiler$jaguarLexer_jg$$charP,$$compiler$jaguarLexer_jg$$concatStr:$$compiler$jaguarLexer_jg$$concatStr,$$compiler$jaguarLexer_jg$$someStr:$$compiler$jaguarLexer_jg$$someStr,$$compiler$jaguarLexer_jg$$whitespaceP:$$compiler$jaguarLexer_jg$$whitespaceP,$$compiler$jaguarLexer_jg$$intP:$$compiler$jaguarLexer_jg$$intP,$$compiler$jaguarLexer_jg$$numP:$$compiler$jaguarLexer_jg$$numP,$$compiler$jaguarLexer_jg$$notCharP:$$compiler$jaguarLexer_jg$$notCharP,$$compiler$jaguarLexer_jg$$manyStr:$$compiler$jaguarLexer_jg$$manyStr,$$compiler$jaguarLexer_jg$$lineCommentP:$$compiler$jaguarLexer_jg$$lineCommentP,$$compiler$jaguarLexer_jg$$symbolP:$$compiler$jaguarLexer_jg$$symbolP,$$compiler$jaguarLexer_jg$$identP:$$compiler$jaguarLexer_jg$$identP,$$compiler$jaguarLexer_jg$$opIdentP:$$compiler$jaguarLexer_jg$$opIdentP,$$compiler$jaguarLexer_jg$$opP:$$compiler$jaguarLexer_jg$$opP,$$compiler$jaguarLexer_jg$$anyCharP:$$compiler$jaguarLexer_jg$$anyCharP,$$compiler$jaguarLexer_jg$$stringCharP:$$compiler$jaguarLexer_jg$$stringCharP,$$compiler$jaguarLexer_jg$$stringP:$$compiler$jaguarLexer_jg$$stringP,$$compiler$jaguarLexer_jg$$jaguarTokenP:$$compiler$jaguarLexer_jg$$jaguarTokenP,$$compiler$jaguarLexer_jg$$tokenize:$$compiler$jaguarLexer_jg$$tokenize,$$compiler$jaguarParser_jg$$mkParserState:$$compiler$jaguarParser_jg$$mkParserState,$$compiler$jaguarParser_jg$$filterWhitespaceAndComments:$$compiler$jaguarParser_jg$$filterWhitespaceAndComments,$$compiler$jaguarParser_jg$$runParser:$$compiler$jaguarParser_jg$$runParser,$$compiler$jaguarParser_jg$$$lt$mul$mns$gt:$$compiler$jaguarParser_jg$$$lt$mul$mns$gt,$$compiler$jaguarParser_jg$$parseToken:$$compiler$jaguarParser_jg$$parseToken,$$compiler$jaguarParser_jg$$operatorP:$$compiler$jaguarParser_jg$$operatorP,$$compiler$jaguarParser_jg$$symP:$$compiler$jaguarParser_jg$$symP,$$compiler$jaguarParser_jg$$parenP:$$compiler$jaguarParser_jg$$parenP,$$compiler$jaguarParser_jg$$reserved:$$compiler$jaguarParser_jg$$reserved,$$compiler$jaguarParser_jg$$notUpperCaseId:$$compiler$jaguarParser_jg$$notUpperCaseId,$$compiler$jaguarParser_jg$$tvarP:$$compiler$jaguarParser_jg$$tvarP,$$compiler$jaguarParser_jg$$upperCaseId:$$compiler$jaguarParser_jg$$upperCaseId,$$compiler$jaguarParser_jg$$tconstP:$$compiler$jaguarParser_jg$$tconstP,$$compiler$jaguarParser_jg$$typeP:$$compiler$jaguarParser_jg$$typeP,$$compiler$jaguarParser_jg$$simpleTypeP:$$compiler$jaguarParser_jg$$simpleTypeP,$$compiler$jaguarParser_jg$$tappP:$$compiler$jaguarParser_jg$$tappP,$$compiler$jaguarParser_jg$$tfunP:$$compiler$jaguarParser_jg$$tfunP,$$compiler$jaguarParser_jg$$parseType:$$compiler$jaguarParser_jg$$parseType,$$compiler$jaguarParser_jg$$withLocAnn:$$compiler$jaguarParser_jg$$withLocAnn,$$compiler$jaguarParser_jg$$locP:$$compiler$jaguarParser_jg$$locP,$$compiler$jaguarParser_jg$$$pip$mns$gt:$$compiler$jaguarParser_jg$$$pip$mns$gt,$$compiler$jaguarParser_jg$$anyOpP:$$compiler$jaguarParser_jg$$anyOpP,$$compiler$jaguarParser_jg$$reservedP:$$compiler$jaguarParser_jg$$reservedP,$$compiler$jaguarParser_jg$$withLocOf:$$compiler$jaguarParser_jg$$withLocOf,$$compiler$jaguarParser_jg$$varP:$$compiler$jaguarParser_jg$$varP,$$compiler$jaguarParser_jg$$cnumP:$$compiler$jaguarParser_jg$$cnumP,$$compiler$jaguarParser_jg$$cstrP:$$compiler$jaguarParser_jg$$cstrP,$$compiler$jaguarParser_jg$$constP:$$compiler$jaguarParser_jg$$constP,$$compiler$jaguarParser_jg$$pvarP:$$compiler$jaguarParser_jg$$pvarP,$$compiler$jaguarParser_jg$$pcstrP:$$compiler$jaguarParser_jg$$pcstrP,$$compiler$jaguarParser_jg$$pcnumP:$$compiler$jaguarParser_jg$$pcnumP,$$compiler$jaguarParser_jg$$pconstP:$$compiler$jaguarParser_jg$$pconstP,$$compiler$jaguarParser_jg$$patP:$$compiler$jaguarParser_jg$$patP,$$compiler$jaguarParser_jg$$pdataP:$$compiler$jaguarParser_jg$$pdataP,$$compiler$jaguarParser_jg$$allPatP:$$compiler$jaguarParser_jg$$allPatP,$$compiler$jaguarParser_jg$$exprP:$$compiler$jaguarParser_jg$$exprP,$$compiler$jaguarParser_jg$$simpleExprP:$$compiler$jaguarParser_jg$$simpleExprP,$$compiler$jaguarParser_jg$$appP:$$compiler$jaguarParser_jg$$appP,$$compiler$jaguarParser_jg$$lamP:$$compiler$jaguarParser_jg$$lamP,$$compiler$jaguarParser_jg$$ofP:$$compiler$jaguarParser_jg$$ofP,$$compiler$jaguarParser_jg$$caseP:$$compiler$jaguarParser_jg$$caseP,$$compiler$jaguarParser_jg$$defP:$$compiler$jaguarParser_jg$$defP,$$compiler$jaguarParser_jg$$letP:$$compiler$jaguarParser_jg$$letP,$$compiler$jaguarParser_jg$$primaryExprP:$$compiler$jaguarParser_jg$$primaryExprP,$$compiler$jaguarParser_jg$$opP:$$compiler$jaguarParser_jg$$opP,$$compiler$jaguarParser_jg$$strP:$$compiler$jaguarParser_jg$$strP,$$compiler$jaguarParser_jg$$importAllP:$$compiler$jaguarParser_jg$$importAllP,$$compiler$jaguarParser_jg$$nonReservedP:$$compiler$jaguarParser_jg$$nonReservedP,$$compiler$jaguarParser_jg$$importNoAliasP:$$compiler$jaguarParser_jg$$importNoAliasP,$$compiler$jaguarParser_jg$$importAliasP:$$compiler$jaguarParser_jg$$importAliasP,$$compiler$jaguarParser_jg$$importOpenP:$$compiler$jaguarParser_jg$$importOpenP,$$compiler$jaguarParser_jg$$importP:$$compiler$jaguarParser_jg$$importP,$$compiler$jaguarParser_jg$$eitherP:$$compiler$jaguarParser_jg$$eitherP,$$compiler$jaguarParser_jg$$classMemberP:$$compiler$jaguarParser_jg$$classMemberP,$$compiler$jaguarParser_jg$$classP:$$compiler$jaguarParser_jg$$classP,$$compiler$jaguarParser_jg$$instanceP:$$compiler$jaguarParser_jg$$instanceP,$$compiler$jaguarParser_jg$$dataConP:$$compiler$jaguarParser_jg$$dataConP,$$compiler$jaguarParser_jg$$dataP:$$compiler$jaguarParser_jg$$dataP,$$compiler$jaguarParser_jg$$topLevelP:$$compiler$jaguarParser_jg$$topLevelP,$$compiler$jaguarParser_jg$$splitFourWay:$$compiler$jaguarParser_jg$$splitFourWay,$$compiler$jaguarParser_jg$$moduleP:$$compiler$jaguarParser_jg$$moduleP,$$compiler$jaguarParser_jg$$parseModule:$$compiler$jaguarParser_jg$$parseModule,$$compiler$compiler_jg$$findImports:$$compiler$compiler_jg$$findImports,$$compiler$compiler_jg$$parseT:$$compiler$compiler_jg$$parseT,$$compiler$compiler_jg$$parseExports:$$compiler$compiler_jg$$parseExports,$$compiler$compiler_jg$$instrument:$$compiler$compiler_jg$$instrument,$$compiler$compiler_jg$$builtinsPathArg:$$compiler$compiler_jg$$builtinsPathArg,$$compiler$compiler_jg$$outPathArg:$$compiler$compiler_jg$$outPathArg,$$compiler$compiler_jg$$mainArg:$$compiler$compiler_jg$$mainArg,$$compiler$compiler_jg$$profileArg:$$compiler$compiler_jg$$profileArg,$$compiler$compiler_jg$$compile:$$compiler$compiler_jg$$compile,$$compiler$compiler_jg$$argDefs:$$compiler$compiler_jg$$argDefs,$$compiler$compiler_jg$$main:$$compiler$compiler_jg$$main}
return exports;})();module.exports = cache["//compiler/compiler.jg"]
if (module.exports.$$compiler$compiler_jg$$main)module.exports.$$compiler$compiler_jg$$main(process.argv)