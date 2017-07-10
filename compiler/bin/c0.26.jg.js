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
  this.$tag="$$compiler$prelude_jg$$Unit"
};
var $$compiler$prelude_jg$$Unit = new $$$compiler$prelude_jg$$Unit();
$$compiler$prelude_jg$$Unit.$tag = "$$compiler$prelude_jg$$Unit";
var $$$compiler$prelude_jg$$Just = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$prelude_jg$$Just"
};
var $$compiler$prelude_jg$$Just = function($0){
  return new $$$compiler$prelude_jg$$Just($0)
};
$$compiler$prelude_jg$$Just.$tag = "$$compiler$prelude_jg$$Just";
var $$$compiler$prelude_jg$$Nothing = function(){
  this.$tag="$$compiler$prelude_jg$$Nothing"
};
var $$compiler$prelude_jg$$Nothing = new $$$compiler$prelude_jg$$Nothing();
$$compiler$prelude_jg$$Nothing.$tag = "$$compiler$prelude_jg$$Nothing";
var $$$compiler$prelude_jg$$Pair = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$prelude_jg$$Pair"
};
var $$compiler$prelude_jg$$Pair = function($0){
  return function($1){
    return new $$$compiler$prelude_jg$$Pair($0,$1)
  }
};
$$compiler$prelude_jg$$Pair.$tag = "$$compiler$prelude_jg$$Pair";
var $$$compiler$prelude_jg$$Left = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$prelude_jg$$Left"
};
var $$compiler$prelude_jg$$Left = function($0){
  return new $$$compiler$prelude_jg$$Left($0)
};
$$compiler$prelude_jg$$Left.$tag = "$$compiler$prelude_jg$$Left";
var $$$compiler$prelude_jg$$Right = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$prelude_jg$$Right"
};
var $$compiler$prelude_jg$$Right = function($0){
  return new $$$compiler$prelude_jg$$Right($0)
};
$$compiler$prelude_jg$$Right.$tag = "$$compiler$prelude_jg$$Right";
var $$$compiler$prelude_jg$$State = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$prelude_jg$$State"
};
var $$compiler$prelude_jg$$State = function($0){
  return new $$$compiler$prelude_jg$$State($0)
};
$$compiler$prelude_jg$$State.$tag = "$$compiler$prelude_jg$$State";
var $$$compiler$prelude_jg$$Empty = function(){
  this.$tag="$$compiler$prelude_jg$$Empty"
};
var $$compiler$prelude_jg$$Empty = new $$$compiler$prelude_jg$$Empty();
$$compiler$prelude_jg$$Empty.$tag = "$$compiler$prelude_jg$$Empty";
var $$$compiler$prelude_jg$$Leaf = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$prelude_jg$$Leaf"
};
var $$compiler$prelude_jg$$Leaf = function($0){
  return function($1){
    return new $$$compiler$prelude_jg$$Leaf($0,$1)
  }
};
$$compiler$prelude_jg$$Leaf.$tag = "$$compiler$prelude_jg$$Leaf";
var $$$compiler$prelude_jg$$Collision = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$prelude_jg$$Collision"
};
var $$compiler$prelude_jg$$Collision = function($0){
  return new $$$compiler$prelude_jg$$Collision($0)
};
$$compiler$prelude_jg$$Collision.$tag = "$$compiler$prelude_jg$$Collision";
var $$$compiler$prelude_jg$$BitmapIndexed = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$prelude_jg$$BitmapIndexed"
};
var $$compiler$prelude_jg$$BitmapIndexed = function($0){
  return function($1){
    return new $$$compiler$prelude_jg$$BitmapIndexed($0,$1)
  }
};
$$compiler$prelude_jg$$BitmapIndexed.$tag = "$$compiler$prelude_jg$$BitmapIndexed";
var $$class$Eq = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$class$Eq"
};
var $class$Eq = function($0){
  return new $$class$Eq($0)
};
$class$Eq.$tag = "$class$Eq";
var $$class$Ord = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$class$Ord"
};
var $class$Ord = function($0){
  return new $$class$Ord($0)
};
$class$Ord.$tag = "$class$Ord";
var $$class$Functor = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$class$Functor"
};
var $class$Functor = function($0){
  return new $$class$Functor($0)
};
$class$Functor.$tag = "$class$Functor";
var $$class$Applicative = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$class$Applicative"
};
var $class$Applicative = function($0){
  return function($1){
    return new $$class$Applicative($0,$1)
  }
};
$class$Applicative.$tag = "$class$Applicative";
var $$class$Alternative = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$class$Alternative"
};
var $class$Alternative = function($0){
  return function($1){
    return new $$class$Alternative($0,$1)
  }
};
$class$Alternative.$tag = "$class$Alternative";
var $$class$Monad = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$class$Monad"
};
var $class$Monad = function($0){
  return function($1){
    return new $$class$Monad($0,$1)
  }
};
$class$Monad.$tag = "$class$Monad";
var $$class$Hashable = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$class$Hashable"
};
var $class$Hashable = function($0){
  return new $$class$Hashable($0)
};
$class$Hashable.$tag = "$class$Hashable";
var $$$compiler$ast_jg$$AnnType = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$ast_jg$$AnnType"
};
var $$compiler$ast_jg$$AnnType = function($0){
  return new $$$compiler$ast_jg$$AnnType($0)
};
$$compiler$ast_jg$$AnnType.$tag = "$$compiler$ast_jg$$AnnType";
var $$$compiler$ast_jg$$AnnCodeLoc = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$ast_jg$$AnnCodeLoc"
};
var $$compiler$ast_jg$$AnnCodeLoc = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$ast_jg$$AnnCodeLoc($0,$1,$2)
    }
  }
};
$$compiler$ast_jg$$AnnCodeLoc.$tag = "$$compiler$ast_jg$$AnnCodeLoc";
var $$$compiler$ast_jg$$AnnUseCount = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$ast_jg$$AnnUseCount"
};
var $$compiler$ast_jg$$AnnUseCount = function($0){
  return new $$$compiler$ast_jg$$AnnUseCount($0)
};
$$compiler$ast_jg$$AnnUseCount.$tag = "$$compiler$ast_jg$$AnnUseCount";
var $$$compiler$ast_jg$$Var = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$ast_jg$$Var"
};
var $$compiler$ast_jg$$Var = function($0){
  return function($1){
    return new $$$compiler$ast_jg$$Var($0,$1)
  }
};
$$compiler$ast_jg$$Var.$tag = "$$compiler$ast_jg$$Var";
var $$$compiler$ast_jg$$Const = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$ast_jg$$Const"
};
var $$compiler$ast_jg$$Const = function($0){
  return function($1){
    return new $$$compiler$ast_jg$$Const($0,$1)
  }
};
$$compiler$ast_jg$$Const.$tag = "$$compiler$ast_jg$$Const";
var $$$compiler$ast_jg$$App = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$ast_jg$$App"
};
var $$compiler$ast_jg$$App = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$ast_jg$$App($0,$1,$2)
    }
  }
};
$$compiler$ast_jg$$App.$tag = "$$compiler$ast_jg$$App";
var $$$compiler$ast_jg$$Lam = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$ast_jg$$Lam"
};
var $$compiler$ast_jg$$Lam = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$ast_jg$$Lam($0,$1,$2)
    }
  }
};
$$compiler$ast_jg$$Lam.$tag = "$$compiler$ast_jg$$Lam";
var $$$compiler$ast_jg$$Case = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$ast_jg$$Case"
};
var $$compiler$ast_jg$$Case = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$ast_jg$$Case($0,$1,$2)
    }
  }
};
$$compiler$ast_jg$$Case.$tag = "$$compiler$ast_jg$$Case";
var $$$compiler$ast_jg$$Let = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$ast_jg$$Let"
};
var $$compiler$ast_jg$$Let = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$ast_jg$$Let($0,$1,$2)
    }
  }
};
$$compiler$ast_jg$$Let.$tag = "$$compiler$ast_jg$$Let";
var $$$compiler$ast_jg$$CNum = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$ast_jg$$CNum"
};
var $$compiler$ast_jg$$CNum = function($0){
  return new $$$compiler$ast_jg$$CNum($0)
};
$$compiler$ast_jg$$CNum.$tag = "$$compiler$ast_jg$$CNum";
var $$$compiler$ast_jg$$CStr = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$ast_jg$$CStr"
};
var $$compiler$ast_jg$$CStr = function($0){
  return new $$$compiler$ast_jg$$CStr($0)
};
$$compiler$ast_jg$$CStr.$tag = "$$compiler$ast_jg$$CStr";
var $$$compiler$ast_jg$$PVar = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$ast_jg$$PVar"
};
var $$compiler$ast_jg$$PVar = function($0){
  return function($1){
    return new $$$compiler$ast_jg$$PVar($0,$1)
  }
};
$$compiler$ast_jg$$PVar.$tag = "$$compiler$ast_jg$$PVar";
var $$$compiler$ast_jg$$PConst = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$ast_jg$$PConst"
};
var $$compiler$ast_jg$$PConst = function($0){
  return function($1){
    return new $$$compiler$ast_jg$$PConst($0,$1)
  }
};
$$compiler$ast_jg$$PConst.$tag = "$$compiler$ast_jg$$PConst";
var $$$compiler$ast_jg$$PData = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$ast_jg$$PData"
};
var $$compiler$ast_jg$$PData = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$ast_jg$$PData($0,$1,$2)
    }
  }
};
$$compiler$ast_jg$$PData.$tag = "$$compiler$ast_jg$$PData";
var $$$compiler$ast_jg$$Module = function($0,$1,$2,$3,$4,$5,$6){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$3=(($3===(undefined))?(error("con")):$3);
  this.$4=(($4===(undefined))?(error("con")):$4);
  this.$5=(($5===(undefined))?(error("con")):$5);
  this.$6=(($6===(undefined))?(error("con")):$6);
  this.$tag="$$compiler$ast_jg$$Module"
};
var $$compiler$ast_jg$$Module = function($0){
  return function($1){
    return function($2){
      return function($3){
        return function($4){
          return function($5){
            return function($6){
              return new $$$compiler$ast_jg$$Module($0,$1,$2,$3,$4,$5,$6)
            }
          }
        }
      }
    }
  }
};
$$compiler$ast_jg$$Module.$tag = "$$compiler$ast_jg$$Module";
var $$$compiler$ast_jg$$ModuleInterface = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$ast_jg$$ModuleInterface"
};
var $$compiler$ast_jg$$ModuleInterface = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$ast_jg$$ModuleInterface($0,$1,$2)
    }
  }
};
$$compiler$ast_jg$$ModuleInterface.$tag = "$$compiler$ast_jg$$ModuleInterface";
var $$$compiler$ast_jg$$Data = function($0,$1,$2,$3){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$3=(($3===(undefined))?(error("con")):$3);
  this.$tag="$$compiler$ast_jg$$Data"
};
var $$compiler$ast_jg$$Data = function($0){
  return function($1){
    return function($2){
      return function($3){
        return new $$$compiler$ast_jg$$Data($0,$1,$2,$3)
      }
    }
  }
};
$$compiler$ast_jg$$Data.$tag = "$$compiler$ast_jg$$Data";
var $$$compiler$ast_jg$$DataCon = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$ast_jg$$DataCon"
};
var $$compiler$ast_jg$$DataCon = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$ast_jg$$DataCon($0,$1,$2)
    }
  }
};
$$compiler$ast_jg$$DataCon.$tag = "$$compiler$ast_jg$$DataCon";
var $$$compiler$ast_jg$$Class = function($0,$1,$2,$3){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$3=(($3===(undefined))?(error("con")):$3);
  this.$tag="$$compiler$ast_jg$$Class"
};
var $$compiler$ast_jg$$Class = function($0){
  return function($1){
    return function($2){
      return function($3){
        return new $$$compiler$ast_jg$$Class($0,$1,$2,$3)
      }
    }
  }
};
$$compiler$ast_jg$$Class.$tag = "$$compiler$ast_jg$$Class";
var $$$compiler$ast_jg$$Instance = function($0,$1,$2,$3){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$3=(($3===(undefined))?(error("con")):$3);
  this.$tag="$$compiler$ast_jg$$Instance"
};
var $$compiler$ast_jg$$Instance = function($0){
  return function($1){
    return function($2){
      return function($3){
        return new $$$compiler$ast_jg$$Instance($0,$1,$2,$3)
      }
    }
  }
};
$$compiler$ast_jg$$Instance.$tag = "$$compiler$ast_jg$$Instance";
var $$$compiler$ast_jg$$TCBound = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$ast_jg$$TCBound"
};
var $$compiler$ast_jg$$TCBound = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$ast_jg$$TCBound($0,$1,$2)
    }
  }
};
$$compiler$ast_jg$$TCBound.$tag = "$$compiler$ast_jg$$TCBound";
var $$$compiler$ast_jg$$TConst = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$ast_jg$$TConst"
};
var $$compiler$ast_jg$$TConst = function($0){
  return function($1){
    return new $$$compiler$ast_jg$$TConst($0,$1)
  }
};
$$compiler$ast_jg$$TConst.$tag = "$$compiler$ast_jg$$TConst";
var $$$compiler$ast_jg$$TVar = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$ast_jg$$TVar"
};
var $$compiler$ast_jg$$TVar = function($0){
  return function($1){
    return new $$$compiler$ast_jg$$TVar($0,$1)
  }
};
$$compiler$ast_jg$$TVar.$tag = "$$compiler$ast_jg$$TVar";
var $$$compiler$ast_jg$$TApp = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$ast_jg$$TApp"
};
var $$compiler$ast_jg$$TApp = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$ast_jg$$TApp($0,$1,$2)
    }
  }
};
$$compiler$ast_jg$$TApp.$tag = "$$compiler$ast_jg$$TApp";
var $$$compiler$ast_jg$$TBot = function(){
  this.$tag="$$compiler$ast_jg$$TBot"
};
var $$compiler$ast_jg$$TBot = new $$$compiler$ast_jg$$TBot();
$$compiler$ast_jg$$TBot.$tag = "$$compiler$ast_jg$$TBot";
var $$$compiler$ast_jg$$TForall = function($0,$1,$2,$3){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$3=(($3===(undefined))?(error("con")):$3);
  this.$tag="$$compiler$ast_jg$$TForall"
};
var $$compiler$ast_jg$$TForall = function($0){
  return function($1){
    return function($2){
      return function($3){
        return new $$$compiler$ast_jg$$TForall($0,$1,$2,$3)
      }
    }
  }
};
$$compiler$ast_jg$$TForall.$tag = "$$compiler$ast_jg$$TForall";
var $$$compiler$ast_jg$$TUnknown = function(){
  this.$tag="$$compiler$ast_jg$$TUnknown"
};
var $$compiler$ast_jg$$TUnknown = new $$$compiler$ast_jg$$TUnknown();
$$compiler$ast_jg$$TUnknown.$tag = "$$compiler$ast_jg$$TUnknown";
var $$$compiler$ast_jg$$ImportClosed = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$ast_jg$$ImportClosed"
};
var $$compiler$ast_jg$$ImportClosed = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$ast_jg$$ImportClosed($0,$1,$2)
    }
  }
};
$$compiler$ast_jg$$ImportClosed.$tag = "$$compiler$ast_jg$$ImportClosed";
var $$$compiler$ast_jg$$ImportOpen = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$ast_jg$$ImportOpen"
};
var $$compiler$ast_jg$$ImportOpen = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$ast_jg$$ImportOpen($0,$1,$2)
    }
  }
};
$$compiler$ast_jg$$ImportOpen.$tag = "$$compiler$ast_jg$$ImportOpen";
var $$$compiler$ast_jg$$ImportAll = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$ast_jg$$ImportAll"
};
var $$compiler$ast_jg$$ImportAll = function($0){
  return function($1){
    return new $$$compiler$ast_jg$$ImportAll($0,$1)
  }
};
$$compiler$ast_jg$$ImportAll.$tag = "$$compiler$ast_jg$$ImportAll";
var $$$compiler$typer_jg$$Subs = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$typer_jg$$Subs"
};
var $$compiler$typer_jg$$Subs = function($0){
  return function($1){
    return new $$$compiler$typer_jg$$Subs($0,$1)
  }
};
$$compiler$typer_jg$$Subs.$tag = "$$compiler$typer_jg$$Subs";
var $$$compiler$typer_jg$$ICtx = function($0,$1,$2,$3){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$3=(($3===(undefined))?(error("con")):$3);
  this.$tag="$$compiler$typer_jg$$ICtx"
};
var $$compiler$typer_jg$$ICtx = function($0){
  return function($1){
    return function($2){
      return function($3){
        return new $$$compiler$typer_jg$$ICtx($0,$1,$2,$3)
      }
    }
  }
};
$$compiler$typer_jg$$ICtx.$tag = "$$compiler$typer_jg$$ICtx";
var $$$compiler$typer_jg$$IEnv = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$typer_jg$$IEnv"
};
var $$compiler$typer_jg$$IEnv = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$typer_jg$$IEnv($0,$1,$2)
    }
  }
};
$$compiler$typer_jg$$IEnv.$tag = "$$compiler$typer_jg$$IEnv";
var $$$compiler$declasser_jg$$S = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$declasser_jg$$S"
};
var $$compiler$declasser_jg$$S = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$declasser_jg$$S($0,$1,$2)
    }
  }
};
$$compiler$declasser_jg$$S.$tag = "$$compiler$declasser_jg$$S";
var $$$compiler$args_jg$$ArgBool = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$args_jg$$ArgBool"
};
var $$compiler$args_jg$$ArgBool = function($0){
  return function($1){
    return new $$$compiler$args_jg$$ArgBool($0,$1)
  }
};
$$compiler$args_jg$$ArgBool.$tag = "$$compiler$args_jg$$ArgBool";
var $$$compiler$args_jg$$ArgString = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$args_jg$$ArgString"
};
var $$compiler$args_jg$$ArgString = function($0){
  return function($1){
    return new $$$compiler$args_jg$$ArgString($0,$1)
  }
};
$$compiler$args_jg$$ArgString.$tag = "$$compiler$args_jg$$ArgString";
var $$$compiler$args_jg$$ParsedArgs = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$args_jg$$ParsedArgs"
};
var $$compiler$args_jg$$ParsedArgs = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$args_jg$$ParsedArgs($0,$1,$2)
    }
  }
};
$$compiler$args_jg$$ParsedArgs.$tag = "$$compiler$args_jg$$ParsedArgs";
var $$$compiler$js$ast_jg$$JSRef = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$js$ast_jg$$JSRef"
};
var $$compiler$js$ast_jg$$JSRef = function($0){
  return new $$$compiler$js$ast_jg$$JSRef($0)
};
$$compiler$js$ast_jg$$JSRef.$tag = "$$compiler$js$ast_jg$$JSRef";
var $$$compiler$js$ast_jg$$JSIndex = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$js$ast_jg$$JSIndex"
};
var $$compiler$js$ast_jg$$JSIndex = function($0){
  return function($1){
    return new $$$compiler$js$ast_jg$$JSIndex($0,$1)
  }
};
$$compiler$js$ast_jg$$JSIndex.$tag = "$$compiler$js$ast_jg$$JSIndex";
var $$$compiler$js$ast_jg$$JSUnOp = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$js$ast_jg$$JSUnOp"
};
var $$compiler$js$ast_jg$$JSUnOp = function($0){
  return function($1){
    return new $$$compiler$js$ast_jg$$JSUnOp($0,$1)
  }
};
$$compiler$js$ast_jg$$JSUnOp.$tag = "$$compiler$js$ast_jg$$JSUnOp";
var $$$compiler$js$ast_jg$$JSBinOp = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$js$ast_jg$$JSBinOp"
};
var $$compiler$js$ast_jg$$JSBinOp = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$js$ast_jg$$JSBinOp($0,$1,$2)
    }
  }
};
$$compiler$js$ast_jg$$JSBinOp.$tag = "$$compiler$js$ast_jg$$JSBinOp";
var $$$compiler$js$ast_jg$$JSCall = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$js$ast_jg$$JSCall"
};
var $$compiler$js$ast_jg$$JSCall = function($0){
  return function($1){
    return new $$$compiler$js$ast_jg$$JSCall($0,$1)
  }
};
$$compiler$js$ast_jg$$JSCall.$tag = "$$compiler$js$ast_jg$$JSCall";
var $$$compiler$js$ast_jg$$JSFun = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$js$ast_jg$$JSFun"
};
var $$compiler$js$ast_jg$$JSFun = function($0){
  return function($1){
    return new $$$compiler$js$ast_jg$$JSFun($0,$1)
  }
};
$$compiler$js$ast_jg$$JSFun.$tag = "$$compiler$js$ast_jg$$JSFun";
var $$$compiler$js$ast_jg$$JSTernary = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$js$ast_jg$$JSTernary"
};
var $$compiler$js$ast_jg$$JSTernary = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$js$ast_jg$$JSTernary($0,$1,$2)
    }
  }
};
$$compiler$js$ast_jg$$JSTernary.$tag = "$$compiler$js$ast_jg$$JSTernary";
var $$$compiler$js$ast_jg$$JSNum = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$js$ast_jg$$JSNum"
};
var $$compiler$js$ast_jg$$JSNum = function($0){
  return new $$$compiler$js$ast_jg$$JSNum($0)
};
$$compiler$js$ast_jg$$JSNum.$tag = "$$compiler$js$ast_jg$$JSNum";
var $$$compiler$js$ast_jg$$JSString = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$js$ast_jg$$JSString"
};
var $$compiler$js$ast_jg$$JSString = function($0){
  return new $$$compiler$js$ast_jg$$JSString($0)
};
$$compiler$js$ast_jg$$JSString.$tag = "$$compiler$js$ast_jg$$JSString";
var $$$compiler$js$ast_jg$$JSBool = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$js$ast_jg$$JSBool"
};
var $$compiler$js$ast_jg$$JSBool = function($0){
  return new $$$compiler$js$ast_jg$$JSBool($0)
};
$$compiler$js$ast_jg$$JSBool.$tag = "$$compiler$js$ast_jg$$JSBool";
var $$$compiler$js$ast_jg$$JSObject = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$js$ast_jg$$JSObject"
};
var $$compiler$js$ast_jg$$JSObject = function($0){
  return new $$$compiler$js$ast_jg$$JSObject($0)
};
$$compiler$js$ast_jg$$JSObject.$tag = "$$compiler$js$ast_jg$$JSObject";
var $$$compiler$js$ast_jg$$JSNull = function(){
  this.$tag="$$compiler$js$ast_jg$$JSNull"
};
var $$compiler$js$ast_jg$$JSNull = new $$$compiler$js$ast_jg$$JSNull();
$$compiler$js$ast_jg$$JSNull.$tag = "$$compiler$js$ast_jg$$JSNull";
var $$$compiler$js$ast_jg$$JSUndefined = function(){
  this.$tag="$$compiler$js$ast_jg$$JSUndefined"
};
var $$compiler$js$ast_jg$$JSUndefined = new $$$compiler$js$ast_jg$$JSUndefined();
$$compiler$js$ast_jg$$JSUndefined.$tag = "$$compiler$js$ast_jg$$JSUndefined";
var $$$compiler$js$ast_jg$$JSInstanceOf = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$js$ast_jg$$JSInstanceOf"
};
var $$compiler$js$ast_jg$$JSInstanceOf = function($0){
  return function($1){
    return new $$$compiler$js$ast_jg$$JSInstanceOf($0,$1)
  }
};
$$compiler$js$ast_jg$$JSInstanceOf.$tag = "$$compiler$js$ast_jg$$JSInstanceOf";
var $$$compiler$js$ast_jg$$JSNew = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$js$ast_jg$$JSNew"
};
var $$compiler$js$ast_jg$$JSNew = function($0){
  return function($1){
    return new $$$compiler$js$ast_jg$$JSNew($0,$1)
  }
};
$$compiler$js$ast_jg$$JSNew.$tag = "$$compiler$js$ast_jg$$JSNew";
var $$$compiler$js$ast_jg$$JSSeq = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$js$ast_jg$$JSSeq"
};
var $$compiler$js$ast_jg$$JSSeq = function($0){
  return new $$$compiler$js$ast_jg$$JSSeq($0)
};
$$compiler$js$ast_jg$$JSSeq.$tag = "$$compiler$js$ast_jg$$JSSeq";
var $$$compiler$js$ast_jg$$JSExpr = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$js$ast_jg$$JSExpr"
};
var $$compiler$js$ast_jg$$JSExpr = function($0){
  return new $$$compiler$js$ast_jg$$JSExpr($0)
};
$$compiler$js$ast_jg$$JSExpr.$tag = "$$compiler$js$ast_jg$$JSExpr";
var $$$compiler$js$ast_jg$$JSReturn = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$js$ast_jg$$JSReturn"
};
var $$compiler$js$ast_jg$$JSReturn = function($0){
  return new $$$compiler$js$ast_jg$$JSReturn($0)
};
$$compiler$js$ast_jg$$JSReturn.$tag = "$$compiler$js$ast_jg$$JSReturn";
var $$$compiler$js$ast_jg$$JSVar = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$js$ast_jg$$JSVar"
};
var $$compiler$js$ast_jg$$JSVar = function($0){
  return function($1){
    return new $$$compiler$js$ast_jg$$JSVar($0,$1)
  }
};
$$compiler$js$ast_jg$$JSVar.$tag = "$$compiler$js$ast_jg$$JSVar";
var $$$compiler$js$ast_jg$$JSSwitch = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$js$ast_jg$$JSSwitch"
};
var $$compiler$js$ast_jg$$JSSwitch = function($0){
  return function($1){
    return new $$$compiler$js$ast_jg$$JSSwitch($0,$1)
  }
};
$$compiler$js$ast_jg$$JSSwitch.$tag = "$$compiler$js$ast_jg$$JSSwitch";
var $$$compiler$js$ast_jg$$JSBreak = function(){
  this.$tag="$$compiler$js$ast_jg$$JSBreak"
};
var $$compiler$js$ast_jg$$JSBreak = new $$$compiler$js$ast_jg$$JSBreak();
$$compiler$js$ast_jg$$JSBreak.$tag = "$$compiler$js$ast_jg$$JSBreak";
var $$$compiler$js$ast_jg$$JSAssign = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$js$ast_jg$$JSAssign"
};
var $$compiler$js$ast_jg$$JSAssign = function($0){
  return function($1){
    return new $$$compiler$js$ast_jg$$JSAssign($0,$1)
  }
};
$$compiler$js$ast_jg$$JSAssign.$tag = "$$compiler$js$ast_jg$$JSAssign";
var $$$compiler$js$ast_jg$$JSIf = function($0,$1,$2){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$tag="$$compiler$js$ast_jg$$JSIf"
};
var $$compiler$js$ast_jg$$JSIf = function($0){
  return function($1){
    return function($2){
      return new $$$compiler$js$ast_jg$$JSIf($0,$1,$2)
    }
  }
};
$$compiler$js$ast_jg$$JSIf.$tag = "$$compiler$js$ast_jg$$JSIf";
var $$$compiler$js$jaguarToJs_jg$$RewriteState = function($0,$1,$2,$3){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$3=(($3===(undefined))?(error("con")):$3);
  this.$tag="$$compiler$js$jaguarToJs_jg$$RewriteState"
};
var $$compiler$js$jaguarToJs_jg$$RewriteState = function($0){
  return function($1){
    return function($2){
      return function($3){
        return new $$$compiler$js$jaguarToJs_jg$$RewriteState($0,$1,$2,$3)
      }
    }
  }
};
$$compiler$js$jaguarToJs_jg$$RewriteState.$tag = "$$compiler$js$jaguarToJs_jg$$RewriteState";
var $$$compiler$parsers_jg$$Success = function($0,$1){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$tag="$$compiler$parsers_jg$$Success"
};
var $$compiler$parsers_jg$$Success = function($0){
  return function($1){
    return new $$$compiler$parsers_jg$$Success($0,$1)
  }
};
$$compiler$parsers_jg$$Success.$tag = "$$compiler$parsers_jg$$Success";
var $$$compiler$parsers_jg$$Error = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$parsers_jg$$Error"
};
var $$compiler$parsers_jg$$Error = function($0){
  return new $$$compiler$parsers_jg$$Error($0)
};
$$compiler$parsers_jg$$Error.$tag = "$$compiler$parsers_jg$$Error";
var $$$compiler$parsers_jg$$Parser = function($0){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$tag="$$compiler$parsers_jg$$Parser"
};
var $$compiler$parsers_jg$$Parser = function($0){
  return new $$$compiler$parsers_jg$$Parser($0)
};
$$compiler$parsers_jg$$Parser.$tag = "$$compiler$parsers_jg$$Parser";
var $$$compiler$jaguarLexer_jg$$LexerState = function($0,$1,$2,$3){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$3=(($3===(undefined))?(error("con")):$3);
  this.$tag="$$compiler$jaguarLexer_jg$$LexerState"
};
var $$compiler$jaguarLexer_jg$$LexerState = function($0){
  return function($1){
    return function($2){
      return function($3){
        return new $$$compiler$jaguarLexer_jg$$LexerState($0,$1,$2,$3)
      }
    }
  }
};
$$compiler$jaguarLexer_jg$$LexerState.$tag = "$$compiler$jaguarLexer_jg$$LexerState";
var $$$compiler$jaguarLexer_jg$$WsTok = function(){
  this.$tag="$$compiler$jaguarLexer_jg$$WsTok"
};
var $$compiler$jaguarLexer_jg$$WsTok = new $$$compiler$jaguarLexer_jg$$WsTok();
$$compiler$jaguarLexer_jg$$WsTok.$tag = "$$compiler$jaguarLexer_jg$$WsTok";
var $$$compiler$jaguarLexer_jg$$SymTok = function(){
  this.$tag="$$compiler$jaguarLexer_jg$$SymTok"
};
var $$compiler$jaguarLexer_jg$$SymTok = new $$$compiler$jaguarLexer_jg$$SymTok();
$$compiler$jaguarLexer_jg$$SymTok.$tag = "$$compiler$jaguarLexer_jg$$SymTok";
var $$$compiler$jaguarLexer_jg$$NumTok = function(){
  this.$tag="$$compiler$jaguarLexer_jg$$NumTok"
};
var $$compiler$jaguarLexer_jg$$NumTok = new $$$compiler$jaguarLexer_jg$$NumTok();
$$compiler$jaguarLexer_jg$$NumTok.$tag = "$$compiler$jaguarLexer_jg$$NumTok";
var $$$compiler$jaguarLexer_jg$$StrTok = function(){
  this.$tag="$$compiler$jaguarLexer_jg$$StrTok"
};
var $$compiler$jaguarLexer_jg$$StrTok = new $$$compiler$jaguarLexer_jg$$StrTok();
$$compiler$jaguarLexer_jg$$StrTok.$tag = "$$compiler$jaguarLexer_jg$$StrTok";
var $$$compiler$jaguarLexer_jg$$OpTok = function(){
  this.$tag="$$compiler$jaguarLexer_jg$$OpTok"
};
var $$compiler$jaguarLexer_jg$$OpTok = new $$$compiler$jaguarLexer_jg$$OpTok();
$$compiler$jaguarLexer_jg$$OpTok.$tag = "$$compiler$jaguarLexer_jg$$OpTok";
var $$$compiler$jaguarLexer_jg$$IdTok = function(){
  this.$tag="$$compiler$jaguarLexer_jg$$IdTok"
};
var $$compiler$jaguarLexer_jg$$IdTok = new $$$compiler$jaguarLexer_jg$$IdTok();
$$compiler$jaguarLexer_jg$$IdTok.$tag = "$$compiler$jaguarLexer_jg$$IdTok";
var $$$compiler$jaguarLexer_jg$$ComTok = function(){
  this.$tag="$$compiler$jaguarLexer_jg$$ComTok"
};
var $$compiler$jaguarLexer_jg$$ComTok = new $$$compiler$jaguarLexer_jg$$ComTok();
$$compiler$jaguarLexer_jg$$ComTok.$tag = "$$compiler$jaguarLexer_jg$$ComTok";
var $$$compiler$jaguarLexer_jg$$Token = function($0,$1,$2,$3){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$3=(($3===(undefined))?(error("con")):$3);
  this.$tag="$$compiler$jaguarLexer_jg$$Token"
};
var $$compiler$jaguarLexer_jg$$Token = function($0){
  return function($1){
    return function($2){
      return function($3){
        return new $$$compiler$jaguarLexer_jg$$Token($0,$1,$2,$3)
      }
    }
  }
};
$$compiler$jaguarLexer_jg$$Token.$tag = "$$compiler$jaguarLexer_jg$$Token";
var $$$compiler$jaguarParser_jg$$ParserState = function($0,$1,$2,$3,$4){
  this.$0=(($0===(undefined))?(error("con")):$0);
  this.$1=(($1===(undefined))?(error("con")):$1);
  this.$2=(($2===(undefined))?(error("con")):$2);
  this.$3=(($3===(undefined))?(error("con")):$3);
  this.$4=(($4===(undefined))?(error("con")):$4);
  this.$tag="$$compiler$jaguarParser_jg$$ParserState"
};
var $$compiler$jaguarParser_jg$$ParserState = function($0){
  return function($1){
    return function($2){
      return function($3){
        return function($4){
          return new $$$compiler$jaguarParser_jg$$ParserState($0,$1,$2,$3,$4)
        }
      }
    }
  }
};
$$compiler$jaguarParser_jg$$ParserState.$tag = "$$compiler$jaguarParser_jg$$ParserState";
var $instance$Eq$0 = $class$Eq(jsEq);
var $instance$Eq$1 = $class$Eq(jsEq);
var $instance$Ord$2 = $class$Ord(jsLt);
var $instance$Ord$3 = $class$Ord(jsLt);
var $instance$Functor$4 = $class$Functor(function(_19_f_$u$273){
  return function(_19_m_$u$274){
    var $phi$0 = _19_m_$u$274;
    var $phi$1 = undefined;
    if($phi$0.$tag==$$compiler$prelude_jg$$Just.$tag){
      $phi$1 = ($$compiler$prelude_jg$$Just(_19_f_$u$273($phi$0.$0)))
    } else if($phi$0.$tag==$$compiler$prelude_jg$$Nothing.$tag){
      $phi$1 = $$compiler$prelude_jg$$Nothing
    } else error("pattern match fail",$phi$0);
    return $phi$1
  }
});
var $instance$Alternative$6 = ($class$Alternative($$compiler$prelude_jg$$Nothing))(function(_19_a_$u$280){
  return function(_19_b_$u$281){
    var $phi$2 = _19_a_$u$280;
    var $phi$3 = undefined;
    if($phi$2.$tag==$$compiler$prelude_jg$$Nothing.$tag){
      $phi$3 = _19_b_$u$281
    } else $phi$3 = _19_a_$u$280;
    return $phi$3
  }
});
var $instance$Functor$9 = $class$Functor(function(_19_f_$u$290){
  return function(_19_s_$u$291){
    var $phi$4 = _19_s_$u$291;
    var $phi$5 = undefined;
    $phi$5 = ($$compiler$prelude_jg$$State(function(_19_s_$u$293){
      var $phi$6 = $phi$4.$0(_19_s_$u$293);
      var $phi$7 = undefined;
      $phi$7 = (($$compiler$prelude_jg$$Pair($phi$6.$0))(_19_f_$u$290($phi$6.$1)));
      return $phi$7
    }));
    return $phi$5
  }
});
var $instance$Applicative$10 = ($class$Applicative(function(_19_a_$u$296){
  return $$compiler$prelude_jg$$State(function(_19_s_$u$297){
    return ($$compiler$prelude_jg$$Pair(_19_s_$u$297))(_19_a_$u$296)
  })
}))(function(_19_f_$u$298){
  return function(_19_a_$u$299){
    var $phi$8 = _19_f_$u$298;
    var $phi$9 = undefined;
    var $phi$10 = _19_a_$u$299;
    var $phi$11 = undefined;
    $phi$11 = ($$compiler$prelude_jg$$State(function(_19_s_$u$302){
      var $phi$12 = $phi$8.$0(_19_s_$u$302);
      var $phi$13 = undefined;
      var $phi$14 = $phi$10.$0($phi$12.$0);
      var $phi$15 = undefined;
      $phi$15 = (($$compiler$prelude_jg$$Pair($phi$14.$0))($phi$12.$1($phi$14.$1)));
      $phi$13 = $phi$15;
      return $phi$13
    }));
    $phi$9 = $phi$11;
    return $phi$9
  }
});
var $phi$16 = $instance$Applicative$10;
var $phi$17 = undefined;
$phi$17 = $phi$16.$0;
var $instance$Monad$11 = ($class$Monad($phi$17))(function(_19_a_$u$307){
  return function(_19_f_$u$308){
    var $phi$18 = _19_a_$u$307;
    var $phi$19 = undefined;
    $phi$19 = ($$compiler$prelude_jg$$State(function(_19_s_$u$310){
      var $phi$20 = $phi$18.$0(_19_s_$u$310);
      var $phi$21 = undefined;
      var $phi$22 = _19_f_$u$308($phi$20.$1);
      var $phi$23 = undefined;
      $phi$23 = ($phi$22.$0($phi$20.$0));
      $phi$21 = $phi$23;
      return $phi$21
    }));
    return $phi$19
  }
});
var $instance$Hashable$13 = $class$Hashable(function(_19_s_$u$315){
  return strHashCode(_19_s_$u$315)
});
var $$compiler$prelude_jg$$$div$eq = function(local$instance$Eq$0){
  return function(_19_a_$u$2){
    return function(_19_b_$u$3){
      var $phi$24 = local$instance$Eq$0;
      var $phi$25 = undefined;
      $phi$25 = $phi$24.$0;
      var $inl$_19_b_$u$44_$u$11 = ($phi$25(_19_a_$u$2))(_19_b_$u$3);
      var $phi$26 = $inl$_19_b_$u$44_$u$11;
      var $phi$27 = undefined;
      if($phi$26){
        $phi$27 = false
      } else if(!$phi$26){
        $phi$27 = true
      } else error("pattern match fail",$phi$26);
      return $phi$27
    }
  }
};
var $$compiler$prelude_jg$$hamtMask = function(_19_depth_$u$156){
  return function(_19_hash_$u$157){
    var _19_h_$u$158 = (_19_hash_$u$157>>>(_19_depth_$u$156*5))&31;
    return 1<<_19_h_$u$158
  }
};
var $$compiler$prelude_jg$$hamtIndex = function(_19_bitmap_$u$159){
  return function(_19_mask_$u$160){
    var $inl$_19_n_$u$150_$u$15 = _19_bitmap_$u$159&(_19_mask_$u$160-1);
    var $inl$_19_n2_$u$151_$u$16 = $inl$_19_n_$u$150_$u$15-(($inl$_19_n_$u$150_$u$15>>>1)&1431655765);
    var $inl$_19_n3_$u$152_$u$17 = ($inl$_19_n2_$u$151_$u$16&858993459)+(($inl$_19_n2_$u$151_$u$16>>>2)&858993459);
    var $inl$_19_n4_$u$153_$u$18 = ($inl$_19_n3_$u$152_$u$17+($inl$_19_n3_$u$152_$u$17>>>4))&252645135;
    var $inl$_19_n5_$u$154_$u$19 = $inl$_19_n4_$u$153_$u$18+($inl$_19_n4_$u$153_$u$18>>>8);
    var $inl$_19_n6_$u$155_$u$20 = $inl$_19_n5_$u$154_$u$19+($inl$_19_n5_$u$154_$u$19>>>16);
    return $inl$_19_n6_$u$155_$u$20&127
  }
};
var $$compiler$prelude_jg$$insert = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(_19_k_$u$175){
      return function(_19_v_$u$176){
        return function(_19_t_$u$177){
          var $phi$28 = local$instance$Hashable$1;
          var $phi$29 = undefined;
          $phi$29 = $phi$28.$0;
          var _19_hash_$u$178 = $phi$29(_19_k_$u$175);
          var _19_f_$u$179 = function(_19_depth_$u$180){
            return function(_19_t_$u$181){
              var $phi$30 = _19_t_$u$181;
              var $phi$31 = undefined;
              if($phi$30.$tag==$$compiler$prelude_jg$$Empty.$tag){
                $phi$31 = (($$compiler$prelude_jg$$Leaf(_19_k_$u$175))(_19_v_$u$176))
              } else if($phi$30.$tag==$$compiler$prelude_jg$$Collision.$tag){
                $phi$31 = ($$compiler$prelude_jg$$Collision((push(($$compiler$prelude_jg$$Pair(_19_k_$u$175))(_19_v_$u$176)))((filter(function(_19_e_$u$183){
                  var $phi$42 = _19_e_$u$183;
                  var $phi$43 = undefined;
                  $phi$43 = $phi$42.$0;
                  return (($$compiler$prelude_jg$$$div$eq(local$instance$Eq$0))($phi$43))(_19_k_$u$175)
                }))($phi$30.$0))))
              } else if($phi$30.$tag==$$compiler$prelude_jg$$Leaf.$tag){
                var $phi$36 = local$instance$Eq$0;
                var $phi$37 = undefined;
                $phi$37 = $phi$36.$0;
                var $phi$34 = ($phi$37(_19_k_$u$175))($phi$30.$0);
                var $phi$35 = undefined;
                if($phi$34){
                  $phi$35 = (($$compiler$prelude_jg$$Leaf(_19_k_$u$175))(_19_v_$u$176))
                } else if(!$phi$34){
                  var $phi$38 = _19_depth_$u$180;
                  var $phi$39 = undefined;
                  if(7==$phi$38){
                    var $inl$_19_x_$u$104_$u$28 = ($$compiler$prelude_jg$$Pair($phi$30.$0))($phi$30.$1);
                    $phi$39 = ($$compiler$prelude_jg$$Collision((function($inl$_19_y_$u$105_$u$29){
                      return (push($inl$_19_y_$u$105_$u$29))((push($inl$_19_x_$u$104_$u$28))(emptyArray))
                    })(($$compiler$prelude_jg$$Pair(_19_k_$u$175))(_19_v_$u$176))))
                  } else {
                    var $phi$40 = local$instance$Hashable$1;
                    var $phi$41 = undefined;
                    $phi$41 = $phi$40.$0;
                    $phi$39 = ((_19_f_$u$179(_19_depth_$u$180))(($$compiler$prelude_jg$$BitmapIndexed(($$compiler$prelude_jg$$hamtMask(_19_depth_$u$180))($phi$41($phi$30.$0))))((push(_19_t_$u$181))(emptyArray))))
                  };
                  $phi$35 = $phi$39
                } else error("pattern match fail",$phi$34);
                $phi$31 = $phi$35
              } else if($phi$30.$tag==$$compiler$prelude_jg$$BitmapIndexed.$tag){
                var _19_m_$u$189 = ($$compiler$prelude_jg$$hamtMask(_19_depth_$u$180))(_19_hash_$u$178);
                var _19_bitmap2_$u$190 = _19_m_$u$189|$phi$30.$0;
                var _19_ix_$u$191 = ($$compiler$prelude_jg$$hamtIndex(_19_bitmap2_$u$190))(_19_m_$u$189);
                var $phi$32 = _19_m_$u$189&$phi$30.$0;
                var $phi$33 = undefined;
                if(0==$phi$32){
                  var $inl$_19_x_$u$103_$u$34 = ($$compiler$prelude_jg$$Leaf(_19_k_$u$175))(_19_v_$u$176);
                  $phi$33 = (($$compiler$prelude_jg$$BitmapIndexed(_19_bitmap2_$u$190))((((splice(_19_ix_$u$191))(0))((push($inl$_19_x_$u$103_$u$34))(emptyArray)))($phi$30.$1)))
                } else {
                  var $inl$_19_f_$u$68_$u$35 = _19_f_$u$179(_19_depth_$u$180+1);
                  $phi$33 = (($$compiler$prelude_jg$$BitmapIndexed(_19_bitmap2_$u$190))(((function($inl$_19_ix_$u$69_$u$36){
                    return function($inl$_19_xs_$u$70_$u$37){
                      return ((setIx($inl$_19_ix_$u$69_$u$36))($inl$_19_f_$u$68_$u$35((getIx($inl$_19_ix_$u$69_$u$36))($inl$_19_xs_$u$70_$u$37))))($inl$_19_xs_$u$70_$u$37)
                    }
                  })(_19_ix_$u$191))($phi$30.$1)))
                };
                $phi$31 = $phi$33
              } else error("pattern match fail",$phi$30);
              return $phi$31
            }
          };
          return (_19_f_$u$179(0))(_19_t_$u$177)
        }
      }
    }
  }
};
var $$compiler$prelude_jg$$setAdd = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(_19_a_$u$249){
      return function(_19_s_$u$250){
        return (((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_19_a_$u$249))($$compiler$prelude_jg$$Unit))(_19_s_$u$250)
      }
    }
  }
};
var $$compiler$prelude_jg$$loop = function(_19_f_$u$45){
  return function(_19_start_$u$46){
    var _19_sp_$u$49 = ($$compiler$prelude_jg$$Pair(_19_start_$u$46))($$compiler$prelude_jg$$Nothing);
    var _19_result_$u$50 = ((iterate(_19_sp_$u$49))(function($inl$_19_x_$u$51_$u$38){
      var $phi$44 = $inl$_19_x_$u$51_$u$38;
      var $phi$45 = undefined;
      if($phi$44.$1.$tag==$$compiler$prelude_jg$$Nothing.$tag){
        $phi$45 = false
      } else $phi$45 = true;
      return $phi$45
    }))(function($inl$_19_xr_$u$54_$u$41){
      var $phi$46 = $inl$_19_xr_$u$54_$u$41;
      var $phi$47 = undefined;
      var $phi$48 = _19_f_$u$45($phi$46.$0);
      var $phi$49 = undefined;
      if($phi$48.$tag==$$compiler$prelude_jg$$Left.$tag){
        $phi$49 = (($$compiler$prelude_jg$$Pair($phi$48.$0))($$compiler$prelude_jg$$Nothing))
      } else if($phi$48.$tag==$$compiler$prelude_jg$$Right.$tag){
        $phi$49 = (($$compiler$prelude_jg$$Pair($phi$46.$0))($$compiler$prelude_jg$$Just($phi$48.$0)))
      } else error("pattern match fail",$phi$48);
      $phi$47 = $phi$49;
      return $phi$47
    });
    var $phi$52 = _19_result_$u$50;
    var $phi$53 = undefined;
    $phi$53 = $phi$52.$1;
    var $phi$50 = $phi$53;
    var $phi$51 = undefined;
    if($phi$50.$tag==$$compiler$prelude_jg$$Just.$tag){
      $phi$51 = $phi$50.$0
    } else error("pattern match fail",$phi$50);
    return $phi$51
  }
};
var $$compiler$prelude_jg$$find = function(_19_predicate_$u$64){
  return function(_19_xs_$u$65){
    return ($$compiler$prelude_jg$$loop(function($inl$_19_i_$u$67_$u$51){
      var $phi$56 = $instance$Ord$2;
      var $phi$57 = undefined;
      $phi$57 = $phi$56.$0;
      var $phi$54 = ($phi$57($inl$_19_i_$u$67_$u$51))(length(_19_xs_$u$65));
      var $phi$55 = undefined;
      if(!$phi$54){
        $phi$55 = ($$compiler$prelude_jg$$Right($$compiler$prelude_jg$$Nothing))
      } else if($phi$54){
        var $phi$58 = _19_predicate_$u$64((getIx($inl$_19_i_$u$67_$u$51))(_19_xs_$u$65));
        var $phi$59 = undefined;
        if($phi$58){
          $phi$59 = ($$compiler$prelude_jg$$Right($$compiler$prelude_jg$$Just((getIx($inl$_19_i_$u$67_$u$51))(_19_xs_$u$65))))
        } else if(!$phi$58){
          $phi$59 = ($$compiler$prelude_jg$$Left($inl$_19_i_$u$67_$u$51+1))
        } else error("pattern match fail",$phi$58);
        $phi$55 = $phi$59
      } else error("pattern match fail",$phi$54);
      return $phi$55
    }))(0)
  }
};
var $$compiler$prelude_jg$$lookup = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(_19_k_$u$161){
      return function(_19_t_$u$162){
        var $phi$60 = local$instance$Hashable$1;
        var $phi$61 = undefined;
        $phi$61 = $phi$60.$0;
        var _19_hash_$u$163 = $phi$61(_19_k_$u$161);
        var _19_f_$u$164 = function(_19_depth_$u$165){
          return function(_19_t_$u$166){
            var $phi$62 = _19_t_$u$166;
            var $phi$63 = undefined;
            if($phi$62.$tag==$$compiler$prelude_jg$$Empty.$tag){
              $phi$63 = $$compiler$prelude_jg$$Nothing
            } else if($phi$62.$tag==$$compiler$prelude_jg$$Leaf.$tag){
              var $phi$76 = local$instance$Eq$0;
              var $phi$77 = undefined;
              $phi$77 = $phi$76.$0;
              var $phi$74 = ($phi$77(_19_k_$u$161))($phi$62.$0);
              var $phi$75 = undefined;
              if(!$phi$74){
                $phi$75 = $$compiler$prelude_jg$$Nothing
              } else if($phi$74){
                $phi$75 = ($$compiler$prelude_jg$$Just($phi$62.$1))
              } else error("pattern match fail",$phi$74);
              $phi$63 = $phi$75
            } else if($phi$62.$tag==$$compiler$prelude_jg$$Collision.$tag){
              var $phi$66 = $instance$Functor$4;
              var $phi$67 = undefined;
              $phi$67 = $phi$66.$0;
              var $inl$_19_f_$u$0_$u$58 = $phi$67(function($inl$_19_p_$u$27_$u$62){
                var $phi$68 = $inl$_19_p_$u$27_$u$62;
                var $phi$69 = undefined;
                $phi$69 = $phi$68.$1;
                return $phi$69
              });
              $phi$63 = ((function($inl$_19_a_$u$1_$u$59){
                return $inl$_19_f_$u$0_$u$58($inl$_19_a_$u$1_$u$59)
              })(($$compiler$prelude_jg$$find(function(_19_e_$u$170){
                var $phi$70 = local$instance$Eq$0;
                var $phi$71 = undefined;
                $phi$71 = $phi$70.$0;
                var $phi$72 = _19_e_$u$170;
                var $phi$73 = undefined;
                $phi$73 = $phi$72.$0;
                return ($phi$71($phi$73))(_19_k_$u$161)
              }))($phi$62.$0)))
            } else if($phi$62.$tag==$$compiler$prelude_jg$$BitmapIndexed.$tag){
              var _19_m_$u$173 = ($$compiler$prelude_jg$$hamtMask(_19_depth_$u$165))(_19_hash_$u$163);
              var $phi$64 = _19_m_$u$173&$phi$62.$0;
              var $phi$65 = undefined;
              if(0==$phi$64){
                $phi$65 = $$compiler$prelude_jg$$Nothing
              } else $phi$65 = ((_19_f_$u$164(_19_depth_$u$165+1))((getIx(($$compiler$prelude_jg$$hamtIndex($phi$62.$0))(_19_m_$u$173)))($phi$62.$1)));
              $phi$63 = $phi$65
            } else error("pattern match fail",$phi$62);
            return $phi$63
          }
        };
        return (_19_f_$u$164(0))(_19_t_$u$162)
      }
    }
  }
};
var $$compiler$prelude_jg$$setContains = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(_19_a_$u$255){
      return function(_19_s_$u$256){
        var $inl$_19_m_$u$22_$u$70 = ((($$compiler$prelude_jg$$lookup(local$instance$Hashable$1))(local$instance$Eq$0))(_19_a_$u$255))(_19_s_$u$256);
        var $phi$78 = $inl$_19_m_$u$22_$u$70;
        var $phi$79 = undefined;
        if($phi$78.$tag==$$compiler$prelude_jg$$Just.$tag){
          $phi$79 = true
        } else if($phi$78.$tag==$$compiler$prelude_jg$$Nothing.$tag){
          $phi$79 = false
        } else error("pattern match fail",$phi$78);
        return $phi$79
      }
    }
  }
};
var $$compiler$prelude_jg$$foldTrie = function(_19_f_$u$218){
  return function(_19_a_$u$219){
    return function(_19_t_$u$220){
      var $phi$80 = _19_t_$u$220;
      var $phi$81 = undefined;
      if($phi$80.$tag==$$compiler$prelude_jg$$Empty.$tag){
        $phi$81 = _19_a_$u$219
      } else if($phi$80.$tag==$$compiler$prelude_jg$$Leaf.$tag){
        $phi$81 = (((_19_f_$u$218(_19_a_$u$219))($phi$80.$0))($phi$80.$1))
      } else if($phi$80.$tag==$$compiler$prelude_jg$$Collision.$tag){
        $phi$81 = (((foldl(function(_19_a_$u$224){
          return function(_19_e_$u$225){
            var $phi$82 = _19_e_$u$225;
            var $phi$83 = undefined;
            $phi$83 = $phi$82.$0;
            var $phi$84 = _19_e_$u$225;
            var $phi$85 = undefined;
            $phi$85 = $phi$84.$1;
            return ((_19_f_$u$218(_19_a_$u$224))($phi$83))($phi$85)
          }
        }))(_19_a_$u$219))($phi$80.$0))
      } else if($phi$80.$tag==$$compiler$prelude_jg$$BitmapIndexed.$tag){
        $phi$81 = (((foldl($$compiler$prelude_jg$$foldTrie(_19_f_$u$218)))(_19_a_$u$219))($phi$80.$1))
      } else error("pattern match fail",$phi$80);
      return $phi$81
    }
  }
};
var $$compiler$prelude_jg$$setIntersection = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(_19_a_$u$265){
      return function(_19_b_$u$266){
        return (($$compiler$prelude_jg$$foldTrie(function($inl$_19_r_$u$268_$u$78){
          return function($inl$_19_v_$u$269_$u$79){
            return function($inl$_19___$u$270_$u$80){
              var $phi$86 = ((($$compiler$prelude_jg$$setContains(local$instance$Hashable$1))(local$instance$Eq$0))($inl$_19_v_$u$269_$u$79))(_19_b_$u$266);
              var $phi$87 = undefined;
              if(!$phi$86){
                $phi$87 = $inl$_19_r_$u$268_$u$78
              } else if($phi$86){
                $phi$87 = (((($$compiler$prelude_jg$$setAdd(local$instance$Hashable$1))(local$instance$Eq$0))($inl$_19_v_$u$269_$u$79))($inl$_19_r_$u$268_$u$78))
              } else error("pattern match fail",$phi$86);
              return $phi$87
            }
          }
        }))($$compiler$prelude_jg$$Empty))(_19_a_$u$265)
      }
    }
  }
};
var $$compiler$prelude_jg$$remove = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(_19_k_$u$198){
      return function(_19_t_$u$199){
        var $phi$88 = local$instance$Hashable$1;
        var $phi$89 = undefined;
        $phi$89 = $phi$88.$0;
        var _19_hash_$u$200 = $phi$89(_19_k_$u$198);
        var _19_f_$u$201 = function(_19_depth_$u$202){
          return function(_19_t_$u$203){
            var $phi$90 = _19_t_$u$203;
            var $phi$91 = undefined;
            if($phi$90.$tag==$$compiler$prelude_jg$$Empty.$tag){
              $phi$91 = $$compiler$prelude_jg$$Empty
            } else if($phi$90.$tag==$$compiler$prelude_jg$$Leaf.$tag){
              var $phi$108 = local$instance$Eq$0;
              var $phi$109 = undefined;
              $phi$109 = $phi$108.$0;
              var $phi$106 = ($phi$109($phi$90.$0))(_19_k_$u$198);
              var $phi$107 = undefined;
              if($phi$106){
                $phi$107 = $$compiler$prelude_jg$$Empty
              } else if(!$phi$106){
                $phi$107 = _19_t_$u$203
              } else error("pattern match fail",$phi$106);
              $phi$91 = $phi$107
            } else if($phi$90.$tag==$$compiler$prelude_jg$$Collision.$tag){
              var _19_entries2_$u$207 = (filter(function(_19_e_$u$208){
                var $phi$98 = _19_e_$u$208;
                var $phi$99 = undefined;
                $phi$99 = $phi$98.$0;
                return (($$compiler$prelude_jg$$$div$eq(local$instance$Eq$0))($phi$99))(_19_k_$u$198)
              }))($phi$90.$0);
              var $phi$100 = length(_19_entries2_$u$207);
              var $phi$101 = undefined;
              if(0==$phi$100){
                $phi$101 = $$compiler$prelude_jg$$Empty
              } else if(1==$phi$100){
                var $inl$_19_p_$u$24_$u$88 = (getIx(0))(_19_entries2_$u$207);
                var $phi$102 = $inl$_19_p_$u$24_$u$88;
                var $phi$103 = undefined;
                $phi$103 = $phi$102.$0;
                var $inl$_19_p_$u$27_$u$91 = (getIx(0))(_19_entries2_$u$207);
                var $phi$104 = $inl$_19_p_$u$27_$u$91;
                var $phi$105 = undefined;
                $phi$105 = $phi$104.$1;
                $phi$101 = (($$compiler$prelude_jg$$Leaf($phi$103))($phi$105))
              } else $phi$101 = ($$compiler$prelude_jg$$Collision(_19_entries2_$u$207));
              $phi$91 = $phi$101
            } else if($phi$90.$tag==$$compiler$prelude_jg$$BitmapIndexed.$tag){
              var _19_m_$u$212 = ($$compiler$prelude_jg$$hamtMask(_19_depth_$u$202))(_19_hash_$u$200);
              var _19_ix_$u$213 = ($$compiler$prelude_jg$$hamtIndex($phi$90.$0))(_19_m_$u$212);
              var $phi$92 = _19_m_$u$212&$phi$90.$0;
              var $phi$93 = undefined;
              if(0==$phi$92){
                $phi$93 = _19_t_$u$203
              } else {
                var $phi$94 = (_19_f_$u$201(_19_depth_$u$202+1))((getIx(_19_ix_$u$213))($phi$90.$1));
                var $phi$95 = undefined;
                if($phi$94.$tag==$$compiler$prelude_jg$$Empty.$tag){
                  var _19_bitmap2_$u$215 = (bitNot(_19_m_$u$212))&$phi$90.$0;
                  var $phi$96 = _19_bitmap2_$u$215;
                  var $phi$97 = undefined;
                  if(0==$phi$96){
                    $phi$97 = $$compiler$prelude_jg$$Empty
                  } else $phi$97 = (($$compiler$prelude_jg$$BitmapIndexed(_19_bitmap2_$u$215))((((splice(_19_ix_$u$213))(1))(emptyArray))($phi$90.$1)));
                  $phi$95 = $phi$97
                } else $phi$95 = (($$compiler$prelude_jg$$BitmapIndexed($phi$90.$0))(((setIx(_19_ix_$u$213))($phi$94))($phi$90.$1)));
                $phi$93 = $phi$95
              };
              $phi$91 = $phi$93
            } else error("pattern match fail",$phi$90);
            return $phi$91
          }
        };
        return (_19_f_$u$201(0))(_19_t_$u$199)
      }
    }
  }
};
var $$compiler$prelude_jg$$setDiff = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(_19_a_$u$260){
      return function(_19_b_$u$261){
        return (($$compiler$prelude_jg$$foldTrie(function(_19_a_$u$262){
          return function(_19_v_$u$263){
            return function(_19___$u$264){
              var $inl$local$instance$Eq$0_$u$95 = local$instance$Eq$0;
              return ((($$compiler$prelude_jg$$remove(local$instance$Hashable$1))($inl$local$instance$Eq$0_$u$95))(_19_v_$u$263))(_19_a_$u$262)
            }
          }
        }))(_19_a_$u$260))(_19_b_$u$261)
      }
    }
  }
};
var $$compiler$prelude_jg$$setToArray = ($$compiler$prelude_jg$$foldTrie(function(_19_vs_$u$257){
  return function(_19_v_$u$258){
    return function(_19___$u$259){
      return (push(_19_v_$u$258))(_19_vs_$u$257)
    }
  }
}))(emptyArray);
var $$compiler$prelude_jg$$mergeTrie = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(_19_a_$u$244){
      return function(_19_b_$u$245){
        return (($$compiler$prelude_jg$$foldTrie(function(_19_a_$u$246){
          return function(_19_k_$u$247){
            return function(_19_v_$u$248){
              return (((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_19_k_$u$247))(_19_v_$u$248))(_19_a_$u$246)
            }
          }
        }))(_19_a_$u$244))(_19_b_$u$245)
      }
    }
  }
};
var $$compiler$prelude_jg$$size = function(_19_t_$u$236){
  var $phi$110 = _19_t_$u$236;
  var $phi$111 = undefined;
  if($phi$110.$tag==$$compiler$prelude_jg$$Empty.$tag){
    $phi$111 = 0
  } else if($phi$110.$tag==$$compiler$prelude_jg$$Leaf.$tag){
    $phi$111 = 1
  } else if($phi$110.$tag==$$compiler$prelude_jg$$Collision.$tag){
    $phi$111 = (length($phi$110.$0))
  } else if($phi$110.$tag==$$compiler$prelude_jg$$BitmapIndexed.$tag){
    $phi$111 = (((foldl($add))(0))((map($$compiler$prelude_jg$$size))($phi$110.$1)))
  } else error("pattern match fail",$phi$110);
  return $phi$111
};
var $$compiler$prelude_jg$$evalState = function(_19_s_$u$148){
  return function(_19_m_$u$149){
    var $inl$_19_m_$u$146_$u$115 = _19_m_$u$149;
    var $phi$112 = $inl$_19_m_$u$146_$u$115;
    var $phi$113 = undefined;
    $phi$113 = ($phi$112.$0(_19_s_$u$148));
    var $inl$_19_p_$u$27_$u$111 = $phi$113;
    var $phi$114 = $inl$_19_p_$u$27_$u$111;
    var $phi$115 = undefined;
    $phi$115 = $phi$114.$1;
    return $phi$115
  }
};
var $$compiler$prelude_jg$$gets = $$compiler$prelude_jg$$State(function(_19_s_$u$142){
  return ($$compiler$prelude_jg$$Pair(_19_s_$u$142))(_19_s_$u$142)
});
var $$compiler$prelude_jg$$foldM = function(local$instance$Monad$0){
  return function(_19_f_$u$129){
    return function(_19_r_$u$130){
      return function(_19_xs_$u$131){
        var $phi$118 = local$instance$Monad$0;
        var $phi$119 = undefined;
        $phi$119 = $phi$118.$0;
        return ((foldl(function(_19_r_$u$132){
          return function(_19_x_$u$133){
            var $phi$116 = local$instance$Monad$0;
            var $phi$117 = undefined;
            $phi$117 = $phi$116.$1;
            return ($phi$117(_19_r_$u$132))(function(_19_r_$u$134){
              return (_19_f_$u$129(_19_r_$u$134))(_19_x_$u$133)
            })
          }
        }))($phi$119(_19_r_$u$130)))(_19_xs_$u$131)
      }
    }
  }
};
var $$compiler$prelude_jg$$mapM = function(local$instance$Monad$0){
  return function(_19_f_$u$135){
    return function(_19_xs_$u$136){
      return ((($$compiler$prelude_jg$$foldM(local$instance$Monad$0))(function(_19_xs_$u$137){
        return function(_19_x_$u$138){
          var $phi$120 = local$instance$Monad$0;
          var $phi$121 = undefined;
          $phi$121 = $phi$120.$1;
          return ($phi$121(_19_f_$u$135(_19_x_$u$138)))(function(_19_x_$u$139){
            var $phi$122 = local$instance$Monad$0;
            var $phi$123 = undefined;
            $phi$123 = $phi$122.$0;
            return $phi$123((push(_19_x_$u$139))(_19_xs_$u$137))
          })
        }
      }))(emptyArray))(_19_xs_$u$136)
    }
  }
};
var $$compiler$prelude_jg$$toRecord = (foldl(function(_19_r_$u$120){
  return function(_19_p_$u$121){
    var $phi$124 = _19_p_$u$121;
    var $phi$125 = undefined;
    $phi$125 = (((set($phi$124.$0))($phi$124.$1))(_19_r_$u$120));
    return $phi$125
  }
}))(empty);
var $$compiler$prelude_jg$$reverse = (foldl(function(_19_xs_$u$118){
  return function(_19_x_$u$119){
    return (enqueue(_19_x_$u$119))(_19_xs_$u$118)
  }
}))(emptyArray);
var $$compiler$prelude_jg$$tail = slice(1);
var $$compiler$prelude_jg$$head = getIx(0);
var $$compiler$prelude_jg$$uniq = function(local$instance$Eq$0){
  return function(_19_xs_$u$117){
    var $phi$128 = $instance$Ord$2;
    var $phi$129 = undefined;
    $phi$129 = $phi$128.$0;
    var $phi$126 = ($phi$129(length(_19_xs_$u$117)))(2);
    var $phi$127 = undefined;
    if($phi$126){
      $phi$127 = _19_xs_$u$117
    } else if(!$phi$126){
      var $phi$132 = local$instance$Eq$0;
      var $phi$133 = undefined;
      $phi$133 = $phi$132.$0;
      var $phi$130 = ($phi$133((getIx(0))(_19_xs_$u$117)))((getIx(1))(_19_xs_$u$117));
      var $phi$131 = undefined;
      if(!$phi$130){
        $phi$131 = ((enqueue($$compiler$prelude_jg$$head(_19_xs_$u$117)))(($$compiler$prelude_jg$$uniq(local$instance$Eq$0))($$compiler$prelude_jg$$tail(_19_xs_$u$117))))
      } else if($phi$130){
        $phi$131 = (($$compiler$prelude_jg$$uniq(local$instance$Eq$0))($$compiler$prelude_jg$$tail(_19_xs_$u$117)))
      } else error("pattern match fail",$phi$130);
      $phi$127 = $phi$131
    } else error("pattern match fail",$phi$126);
    return $phi$127
  }
};
var $$compiler$prelude_jg$$mergeSet = function(local$instance$Ord$1){
  return function(local$instance$Eq$0){
    return function(_19_xs_$u$113){
      return function(_19_ys_$u$114){
        var $phi$134 = length(_19_xs_$u$113);
        var $phi$135 = undefined;
        if(0==$phi$134){
          $phi$135 = _19_ys_$u$114
        } else {
          var $phi$136 = length(_19_ys_$u$114);
          var $phi$137 = undefined;
          if(0==$phi$136){
            $phi$137 = _19_xs_$u$113
          } else {
            var $phi$140 = local$instance$Ord$1;
            var $phi$141 = undefined;
            $phi$141 = $phi$140.$0;
            var $phi$138 = ($phi$141($$compiler$prelude_jg$$head(_19_xs_$u$113)))($$compiler$prelude_jg$$head(_19_ys_$u$114));
            var $phi$139 = undefined;
            if($phi$138){
              $phi$139 = ((enqueue($$compiler$prelude_jg$$head(_19_xs_$u$113)))(((($$compiler$prelude_jg$$mergeSet(local$instance$Ord$1))(local$instance$Eq$0))($$compiler$prelude_jg$$tail(_19_xs_$u$113)))(_19_ys_$u$114)))
            } else if(!$phi$138){
              var $phi$144 = local$instance$Eq$0;
              var $phi$145 = undefined;
              $phi$145 = $phi$144.$0;
              var $phi$142 = ($phi$145($$compiler$prelude_jg$$head(_19_xs_$u$113)))($$compiler$prelude_jg$$head(_19_ys_$u$114));
              var $phi$143 = undefined;
              if($phi$142){
                $phi$143 = ((enqueue($$compiler$prelude_jg$$head(_19_xs_$u$113)))(((($$compiler$prelude_jg$$mergeSet(local$instance$Ord$1))(local$instance$Eq$0))($$compiler$prelude_jg$$tail(_19_xs_$u$113)))($$compiler$prelude_jg$$tail(_19_ys_$u$114))))
              } else if(!$phi$142){
                $phi$143 = ((enqueue($$compiler$prelude_jg$$head(_19_ys_$u$114)))(((($$compiler$prelude_jg$$mergeSet(local$instance$Ord$1))(local$instance$Eq$0))(_19_xs_$u$113))($$compiler$prelude_jg$$tail(_19_ys_$u$114))))
              } else error("pattern match fail",$phi$142);
              $phi$139 = $phi$143
            } else error("pattern match fail",$phi$138);
            $phi$137 = $phi$139
          };
          $phi$135 = $phi$137
        };
        return $phi$135
      }
    }
  }
};
var $$compiler$prelude_jg$$last = function(_19_l_$u$101){
  return (getIx((length(_19_l_$u$101))-1))(_19_l_$u$101)
};
var $$compiler$prelude_jg$$concatMap = function(_19_f_$u$93){
  return function(_19_a_$u$94){
    return ((foldl(concat))(emptyArray))((map(_19_f_$u$93))(_19_a_$u$94))
  }
};
var $$compiler$prelude_jg$$zip = function(_19_xs_$u$91){
  return function(_19_ys_$u$92){
    var $phi$148 = $instance$Eq$0;
    var $phi$149 = undefined;
    $phi$149 = $phi$148.$0;
    var $phi$150 = $instance$Eq$0;
    var $phi$151 = undefined;
    $phi$151 = $phi$150.$0;
    var $phi$146 = ($or(($phi$149(length(_19_xs_$u$91)))(0)))(($phi$151(length(_19_ys_$u$92)))(0));
    var $phi$147 = undefined;
    if($phi$146){
      $phi$147 = emptyArray
    } else if(!$phi$146){
      $phi$147 = ((enqueue(($$compiler$prelude_jg$$Pair($$compiler$prelude_jg$$head(_19_xs_$u$91)))($$compiler$prelude_jg$$head(_19_ys_$u$92))))(($$compiler$prelude_jg$$zip($$compiler$prelude_jg$$tail(_19_xs_$u$91)))($$compiler$prelude_jg$$tail(_19_ys_$u$92))))
    } else error("pattern match fail",$phi$146);
    return $phi$147
  }
};
var $$compiler$prelude_jg$$zipWithIndex2 = function(_19_n_$u$88){
  return function(_19_xs_$u$89){
    var $phi$152 = length(_19_xs_$u$89);
    var $phi$153 = undefined;
    if(0==$phi$152){
      $phi$153 = emptyArray
    } else $phi$153 = ((enqueue(($$compiler$prelude_jg$$Pair(_19_n_$u$88))($$compiler$prelude_jg$$head(_19_xs_$u$89))))(($$compiler$prelude_jg$$zipWithIndex2(_19_n_$u$88+1))($$compiler$prelude_jg$$tail(_19_xs_$u$89))));
    return $phi$153
  }
};
var $$compiler$prelude_jg$$zipWithIndex = $$compiler$prelude_jg$$zipWithIndex2(0);
var $$compiler$prelude_jg$$join = function(_19_xs_$u$83){
  return function(_19_s_$u$84){
    var $phi$154 = length(_19_xs_$u$83);
    var $phi$155 = undefined;
    if(0==$phi$154){
      $phi$155 = ""
    } else $phi$155 = ((foldl1(function(_19_a_$u$86){
      return function(_19_b_$u$87){
        return ($concat(($concat(_19_a_$u$86))(_19_s_$u$84)))(_19_b_$u$87)
      }
    }))(_19_xs_$u$83));
    return $phi$155
  }
};
var $$compiler$prelude_jg$$all = function(_19_f_$u$79){
  return function(_19_xs_$u$80){
    return ((foldl(function(_19_r_$u$81){
      return function(_19_x_$u$82){
        return ($and(_19_f_$u$79(_19_x_$u$82)))(_19_r_$u$81)
      }
    }))(true))(_19_xs_$u$80)
  }
};
var $$compiler$prelude_jg$$exists = function(_19_f_$u$75){
  return function(_19_xs_$u$76){
    return ((foldl(function(_19_r_$u$77){
      return function(_19_x_$u$78){
        return ($or(_19_f_$u$75(_19_x_$u$78)))(_19_r_$u$77)
      }
    }))(false))(_19_xs_$u$76)
  }
};
var $$compiler$prelude_jg$$containsChar = function(_19_x_$u$71){
  return function(_19_xs_$u$72){
    var _19_f_$u$73 = function(_19_i_$u$74){
      var $phi$158 = $instance$Ord$2;
      var $phi$159 = undefined;
      $phi$159 = $phi$158.$0;
      var $phi$156 = ($phi$159(_19_i_$u$74))(length(_19_xs_$u$72));
      var $phi$157 = undefined;
      if(!$phi$156){
        $phi$157 = false
      } else if($phi$156){
        var $phi$162 = $instance$Eq$1;
        var $phi$163 = undefined;
        $phi$163 = $phi$162.$0;
        var $phi$160 = ($phi$163((getChar(_19_i_$u$74))(_19_xs_$u$72)))(_19_x_$u$71);
        var $phi$161 = undefined;
        if($phi$160){
          $phi$161 = true
        } else if(!$phi$160){
          $phi$161 = (_19_f_$u$73(_19_i_$u$74+1))
        } else error("pattern match fail",$phi$160);
        $phi$157 = $phi$161
      } else error("pattern match fail",$phi$156);
      return $phi$157
    };
    return _19_f_$u$73(0)
  }
};
var $$compiler$prelude_jg$$contains = function(local$instance$Eq$0){
  return function(_19_x_$u$60){
    return function(_19_xs_$u$61){
      return ($$compiler$prelude_jg$$loop(function($inl$_19_i_$u$63_$u$162){
        var $phi$166 = $instance$Ord$2;
        var $phi$167 = undefined;
        $phi$167 = $phi$166.$0;
        var $phi$164 = ($phi$167($inl$_19_i_$u$63_$u$162))(length(_19_xs_$u$61));
        var $phi$165 = undefined;
        if(!$phi$164){
          $phi$165 = ($$compiler$prelude_jg$$Right(false))
        } else if($phi$164){
          var $phi$170 = local$instance$Eq$0;
          var $phi$171 = undefined;
          $phi$171 = $phi$170.$0;
          var $phi$168 = ($phi$171(_19_x_$u$60))((getIx($inl$_19_i_$u$63_$u$162))(_19_xs_$u$61));
          var $phi$169 = undefined;
          if($phi$168){
            $phi$169 = ($$compiler$prelude_jg$$Right(true))
          } else if(!$phi$168){
            $phi$169 = ($$compiler$prelude_jg$$Left($inl$_19_i_$u$63_$u$162+1))
          } else error("pattern match fail",$phi$168);
          $phi$165 = $phi$169
        } else error("pattern match fail",$phi$164);
        return $phi$165
      }))(0)
    }
  }
};
var $$compiler$prelude_jg$$either = function(_19_f_$u$30){
  return function(_19_g_$u$31){
    return function(_19_e_$u$32){
      var $phi$172 = _19_e_$u$32;
      var $phi$173 = undefined;
      if($phi$172.$tag==$$compiler$prelude_jg$$Left.$tag){
        $phi$173 = (_19_f_$u$30($phi$172.$0))
      } else if($phi$172.$tag==$$compiler$prelude_jg$$Right.$tag){
        $phi$173 = (_19_g_$u$31($phi$172.$0))
      } else error("pattern match fail",$phi$172);
      return $phi$173
    }
  }
};
var $$compiler$prelude_jg$$splitEither = function(_19_a_$u$35){
  return ($$compiler$prelude_jg$$Pair((map(function(_19_e_$u$36){
    var $phi$174 = _19_e_$u$36;
    var $phi$175 = undefined;
    if($phi$174.$tag==$$compiler$prelude_jg$$Left.$tag){
      $phi$175 = $phi$174.$0
    } else error("pattern match fail",$phi$174);
    return $phi$175
  }))((filter(($$compiler$prelude_jg$$either(function(_19___$u$38){
    return true
  }))(function(_19___$u$39){
    return false
  })))(_19_a_$u$35))))((map(function(_19_e_$u$40){
    var $phi$176 = _19_e_$u$40;
    var $phi$177 = undefined;
    if($phi$176.$tag==$$compiler$prelude_jg$$Right.$tag){
      $phi$177 = $phi$176.$0
    } else error("pattern match fail",$phi$176);
    return $phi$177
  }))((filter(($$compiler$prelude_jg$$either(function(_19___$u$42){
    return false
  }))(function(_19___$u$43){
    return true
  })))(_19_a_$u$35)))
};
var $$compiler$prelude_jg$$$gt$gt = function(local$instance$Monad$0){
  return function(_19_a_$u$10){
    return function(_19_b_$u$11){
      var $phi$178 = local$instance$Monad$0;
      var $phi$179 = undefined;
      $phi$179 = $phi$178.$1;
      return ($phi$179(_19_a_$u$10))(function(_19___$u$12){
        return _19_b_$u$11
      })
    }
  }
};
var $$compiler$prelude_jg$$$gt = function(local$instance$Ord$0){
  return function(_19_a_$u$4){
    return function(_19_b_$u$5){
      var $phi$180 = local$instance$Ord$0;
      var $phi$181 = undefined;
      $phi$181 = $phi$180.$0;
      return ($phi$181(_19_b_$u$5))(_19_a_$u$4)
    }
  }
};
var $$compiler$ast_jg$$breakableDownAndUpM = function(local$instance$Monad$0){
  return function(_18_down_$u$180){
    return function(_18_up_$u$181){
      return function(_18_e_$u$182){
        var _18_go_$u$183 = (($$compiler$ast_jg$$breakableDownAndUpM(local$instance$Monad$0))(_18_down_$u$180))(_18_up_$u$181);
        var _18_gos_$u$184 = ($$compiler$prelude_jg$$mapM(local$instance$Monad$0))(function(_18_d_$u$185){
          var $phi$182 = _18_d_$u$185;
          var $phi$183 = undefined;
          var $phi$184 = local$instance$Monad$0;
          var $phi$185 = undefined;
          $phi$185 = $phi$184.$1;
          $phi$183 = (($phi$185(_18_go_$u$183($phi$182.$1)))(function(_18_e_$u$188){
            var $phi$186 = local$instance$Monad$0;
            var $phi$187 = undefined;
            $phi$187 = $phi$186.$0;
            return $phi$187(($$compiler$prelude_jg$$Pair($phi$182.$0))(_18_e_$u$188))
          }));
          return $phi$183
        });
        var $phi$188 = local$instance$Monad$0;
        var $phi$189 = undefined;
        $phi$189 = $phi$188.$1;
        return ($phi$189(_18_down_$u$180(_18_e_$u$182)))(function(_18_e_$u$189){
          var $phi$190 = _18_e_$u$189;
          var $phi$191 = undefined;
          if($phi$190.$tag==$$compiler$prelude_jg$$Right.$tag){
            var $phi$208 = local$instance$Monad$0;
            var $phi$209 = undefined;
            $phi$209 = $phi$208.$0;
            $phi$191 = ($phi$209($phi$190.$0))
          } else if($phi$190.$tag==$$compiler$prelude_jg$$Left.$tag){
            var $phi$192 = $phi$190.$0;
            var $phi$193 = undefined;
            if($phi$192.$tag==$$compiler$ast_jg$$Lam.$tag){
              var $phi$206 = local$instance$Monad$0;
              var $phi$207 = undefined;
              $phi$207 = $phi$206.$1;
              $phi$193 = (($phi$207(_18_go_$u$183($phi$192.$2)))(function(_18_e_$u$195){
                return _18_up_$u$181((($$compiler$ast_jg$$Lam($phi$192.$0))($phi$192.$1))(_18_e_$u$195))
              }))
            } else if($phi$192.$tag==$$compiler$ast_jg$$App.$tag){
              var $phi$202 = local$instance$Monad$0;
              var $phi$203 = undefined;
              $phi$203 = $phi$202.$1;
              $phi$193 = (($phi$203(_18_go_$u$183($phi$192.$1)))(function(_18_f_$u$199){
                var $phi$204 = local$instance$Monad$0;
                var $phi$205 = undefined;
                $phi$205 = $phi$204.$1;
                return ($phi$205(_18_go_$u$183($phi$192.$2)))(function(_18_x_$u$200){
                  return _18_up_$u$181((($$compiler$ast_jg$$App($phi$192.$0))(_18_f_$u$199))(_18_x_$u$200))
                })
              }))
            } else if($phi$192.$tag==$$compiler$ast_jg$$Case.$tag){
              var $phi$198 = local$instance$Monad$0;
              var $phi$199 = undefined;
              $phi$199 = $phi$198.$1;
              $phi$193 = (($phi$199(_18_go_$u$183($phi$192.$1)))(function(_18_e_$u$204){
                var $phi$200 = local$instance$Monad$0;
                var $phi$201 = undefined;
                $phi$201 = $phi$200.$1;
                return ($phi$201(_18_gos_$u$184($phi$192.$2)))(function(_18_ps_$u$205){
                  return _18_up_$u$181((($$compiler$ast_jg$$Case($phi$192.$0))(_18_e_$u$204))(_18_ps_$u$205))
                })
              }))
            } else if($phi$192.$tag==$$compiler$ast_jg$$Let.$tag){
              var $phi$194 = local$instance$Monad$0;
              var $phi$195 = undefined;
              $phi$195 = $phi$194.$1;
              $phi$193 = (($phi$195(_18_gos_$u$184($phi$192.$1)))(function(_18_bs_$u$209){
                var $phi$196 = local$instance$Monad$0;
                var $phi$197 = undefined;
                $phi$197 = $phi$196.$1;
                return ($phi$197(_18_go_$u$183($phi$192.$2)))(function(_18_e_$u$210){
                  return _18_up_$u$181((($$compiler$ast_jg$$Let($phi$192.$0))(_18_bs_$u$209))(_18_e_$u$210))
                })
              }))
            } else $phi$193 = (_18_up_$u$181($phi$190.$0));
            $phi$191 = $phi$193
          } else error("pattern match fail",$phi$190);
          return $phi$191
        })
      }
    }
  }
};
var $$compiler$ast_jg$$breakableDownM = function(local$instance$Monad$0){
  return function(_18_f_$u$217){
    var $phi$210 = local$instance$Monad$0;
    var $phi$211 = undefined;
    $phi$211 = $phi$210.$0;
    return (($$compiler$ast_jg$$breakableDownAndUpM(local$instance$Monad$0))(_18_f_$u$217))($phi$211)
  }
};
var $$compiler$ast_jg$$breakableDownAndUp = function(_18_down_$u$130){
  return function(_18_up_$u$131){
    return function(_18_a_$u$132){
      return function(_18_e_$u$133){
        var _18_go_$u$134 = ($$compiler$ast_jg$$breakableDownAndUp(_18_down_$u$130))(_18_up_$u$131);
        var _18_gos_$u$135 = function(_18_a_$u$136){
          return (foldl(function(_18_ar_$u$137){
            return function(_18_p_$u$138){
              var $inl$_19_p_$u$24_$u$4502 = _18_ar_$u$137;
              var $phi$214 = _18_ar_$u$137;
              var $phi$215 = undefined;
              $phi$215 = $phi$214.$0;
              var $inl$_19_p_$u$27_$u$4505 = _18_p_$u$138;
              var $phi$216 = _18_p_$u$138;
              var $phi$217 = undefined;
              $phi$217 = $phi$216.$1;
              var $phi$212 = (_18_go_$u$134($phi$215))($phi$217);
              var $phi$213 = undefined;
              var $inl$_19_p_$u$24_$u$4508 = _18_p_$u$138;
              var $phi$218 = _18_p_$u$138;
              var $phi$219 = undefined;
              $phi$219 = $phi$218.$0;
              var $inl$_19_p_$u$27_$u$4511 = _18_ar_$u$137;
              var $phi$220 = _18_ar_$u$137;
              var $phi$221 = undefined;
              $phi$221 = $phi$220.$1;
              $phi$213 = (($$compiler$prelude_jg$$Pair($phi$212.$0))((push(($$compiler$prelude_jg$$Pair($phi$219))($phi$212.$1)))($phi$221)));
              return $phi$213
            }
          }))(($$compiler$prelude_jg$$Pair(_18_a_$u$136))(emptyArray))
        };
        var $phi$222 = (_18_down_$u$130(_18_a_$u$132))(_18_e_$u$133);
        var $phi$223 = undefined;
        if($phi$222.$tag==$$compiler$prelude_jg$$Right.$tag){
          $phi$223 = $phi$222.$0
        } else if($phi$222.$tag==$$compiler$prelude_jg$$Left.$tag){
          var $phi$224 = $phi$222.$0.$1;
          var $phi$225 = undefined;
          if($phi$224.$tag==$$compiler$ast_jg$$Lam.$tag){
            var $phi$238 = (_18_go_$u$134($phi$222.$0.$0))($phi$224.$2);
            var $phi$239 = undefined;
            $phi$239 = (($$compiler$prelude_jg$$Pair($phi$238.$0))((($$compiler$ast_jg$$Lam($phi$224.$0))($phi$224.$1))($phi$238.$1)));
            $phi$225 = $phi$239
          } else if($phi$224.$tag==$$compiler$ast_jg$$App.$tag){
            var $phi$234 = (_18_go_$u$134($phi$222.$0.$0))($phi$224.$1);
            var $phi$235 = undefined;
            var $phi$236 = (_18_go_$u$134($phi$234.$0))($phi$224.$2);
            var $phi$237 = undefined;
            $phi$237 = (($$compiler$prelude_jg$$Pair($phi$236.$0))((($$compiler$ast_jg$$App($phi$224.$0))($phi$234.$1))($phi$236.$1)));
            $phi$235 = $phi$237;
            $phi$225 = $phi$235
          } else if($phi$224.$tag==$$compiler$ast_jg$$Case.$tag){
            var $phi$230 = (_18_go_$u$134($phi$222.$0.$0))($phi$224.$1);
            var $phi$231 = undefined;
            var $phi$232 = (_18_gos_$u$135($phi$230.$0))($phi$224.$2);
            var $phi$233 = undefined;
            $phi$233 = (($$compiler$prelude_jg$$Pair($phi$232.$0))((($$compiler$ast_jg$$Case($phi$224.$0))($phi$230.$1))($phi$232.$1)));
            $phi$231 = $phi$233;
            $phi$225 = $phi$231
          } else if($phi$224.$tag==$$compiler$ast_jg$$Let.$tag){
            var $phi$226 = (_18_gos_$u$135($phi$222.$0.$0))($phi$224.$1);
            var $phi$227 = undefined;
            var $phi$228 = (_18_go_$u$134($phi$226.$0))($phi$224.$2);
            var $phi$229 = undefined;
            $phi$229 = (($$compiler$prelude_jg$$Pair($phi$228.$0))((($$compiler$ast_jg$$Let($phi$224.$0))($phi$226.$1))($phi$228.$1)));
            $phi$227 = $phi$229;
            $phi$225 = $phi$227
          } else $phi$225 = (($$compiler$prelude_jg$$Pair($phi$222.$0.$0))($phi$222.$0.$1));
          var _18_ae_$u$144 = $phi$225;
          var $phi$240 = _18_ae_$u$144;
          var $phi$241 = undefined;
          $phi$241 = ((_18_up_$u$131($phi$240.$0))($phi$240.$1));
          $phi$223 = $phi$241
        } else error("pattern match fail",$phi$222);
        return $phi$223
      }
    }
  }
};
var $$compiler$ast_jg$$downAndUp = function(_18_down_$u$174){
  return function(_18_up_$u$175){
    return ($$compiler$ast_jg$$breakableDownAndUp(function(_18_a_$u$176){
      return function(_18_e_$u$177){
        return $$compiler$prelude_jg$$Left((_18_down_$u$174(_18_a_$u$176))(_18_e_$u$177))
      }
    }))(_18_up_$u$175)
  }
};
var $$compiler$ast_jg$$up = $$compiler$ast_jg$$downAndUp($$compiler$prelude_jg$$Pair);
var $$compiler$ast_jg$$getAnn = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(_18_name_$u$0){
      return function(_18_ann_$u$1){
        return ((($$compiler$prelude_jg$$lookup(local$instance$Hashable$1))(local$instance$Eq$0))(_18_name_$u$0))(_18_ann_$u$1)
      }
    }
  }
};
var $$compiler$ast_jg$$getAnnType = function(_18_ann_$u$5){
  var $phi$242 = ((($$compiler$ast_jg$$getAnn($instance$Hashable$13))($instance$Eq$1))("type"))(_18_ann_$u$5);
  var $phi$243 = undefined;
  if(($phi$242.$tag==$$compiler$prelude_jg$$Just.$tag)&&($phi$242.$0.$tag==$$compiler$ast_jg$$AnnType.$tag)){
    $phi$243 = $phi$242.$0.$0
  } else if($phi$242.$tag==$$compiler$prelude_jg$$Nothing.$tag){
    $phi$243 = $$compiler$ast_jg$$TUnknown
  } else error("pattern match fail",$phi$242);
  return $phi$243
};
var $$compiler$ast_jg$$annOf = function(_18_e_$u$94){
  var $phi$244 = _18_e_$u$94;
  var $phi$245 = undefined;
  if($phi$244.$tag==$$compiler$ast_jg$$Var.$tag){
    $phi$245 = $phi$244.$0
  } else if($phi$244.$tag==$$compiler$ast_jg$$Const.$tag){
    $phi$245 = $phi$244.$0
  } else if($phi$244.$tag==$$compiler$ast_jg$$App.$tag){
    $phi$245 = $phi$244.$0
  } else if($phi$244.$tag==$$compiler$ast_jg$$Lam.$tag){
    $phi$245 = $phi$244.$0
  } else if($phi$244.$tag==$$compiler$ast_jg$$Case.$tag){
    $phi$245 = $phi$244.$0
  } else if($phi$244.$tag==$$compiler$ast_jg$$Let.$tag){
    $phi$245 = $phi$244.$0
  } else error("pattern match fail",$phi$244);
  return $phi$245
};
var $$compiler$ast_jg$$setAnn = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(_18_name_$u$2){
      return function(_18_val_$u$3){
        return function(_18_ann_$u$4){
          return (((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_18_name_$u$2))(_18_val_$u$3))(_18_ann_$u$4)
        }
      }
    }
  }
};
var $$compiler$ast_jg$$setAnnType = function(_18_t_$u$7){
  return function(_18_ann_$u$8){
    return (((($$compiler$ast_jg$$setAnn($instance$Hashable$13))($instance$Eq$1))("type"))($$compiler$ast_jg$$AnnType(_18_t_$u$7)))(_18_ann_$u$8)
  }
};
var $$compiler$ast_jg$$setType = function(_18_t_$u$76){
  return function(_18_e_$u$77){
    var $phi$246 = _18_e_$u$77;
    var $phi$247 = undefined;
    if($phi$246.$tag==$$compiler$ast_jg$$Var.$tag){
      $phi$247 = (($$compiler$ast_jg$$Var(($$compiler$ast_jg$$setAnnType(_18_t_$u$76))($phi$246.$0)))($phi$246.$1))
    } else if($phi$246.$tag==$$compiler$ast_jg$$Const.$tag){
      $phi$247 = (($$compiler$ast_jg$$Const(($$compiler$ast_jg$$setAnnType(_18_t_$u$76))($phi$246.$0)))($phi$246.$1))
    } else if($phi$246.$tag==$$compiler$ast_jg$$App.$tag){
      $phi$247 = ((($$compiler$ast_jg$$App(($$compiler$ast_jg$$setAnnType(_18_t_$u$76))($phi$246.$0)))($phi$246.$1))($phi$246.$2))
    } else if($phi$246.$tag==$$compiler$ast_jg$$Lam.$tag){
      $phi$247 = ((($$compiler$ast_jg$$Lam(($$compiler$ast_jg$$setAnnType(_18_t_$u$76))($phi$246.$0)))($phi$246.$1))($phi$246.$2))
    } else if($phi$246.$tag==$$compiler$ast_jg$$Case.$tag){
      $phi$247 = ((($$compiler$ast_jg$$Case(($$compiler$ast_jg$$setAnnType(_18_t_$u$76))($phi$246.$0)))($phi$246.$1))($phi$246.$2))
    } else if($phi$246.$tag==$$compiler$ast_jg$$Let.$tag){
      $phi$247 = ((($$compiler$ast_jg$$Let(($$compiler$ast_jg$$setAnnType(_18_t_$u$76))($phi$246.$0)))($phi$246.$1))($phi$246.$2))
    } else error("pattern match fail",$phi$246);
    return $phi$247
  }
};
var $$compiler$ast_jg$$dataConNames = function(_18_d_$u$63){
  var $phi$248 = _18_d_$u$63;
  var $phi$249 = undefined;
  $phi$249 = ((map(function($inl$_18_dc_$u$59_$u$238){
    var $phi$250 = $inl$_18_dc_$u$59_$u$238;
    var $phi$251 = undefined;
    $phi$251 = $phi$250.$1;
    return $phi$251
  }))($phi$248.$3));
  return $phi$249
};
var $$compiler$ast_jg$$equivBound = function(_18_a_$u$18){
  return function(_18_b_$u$19){
    var $phi$252 = _18_a_$u$18;
    var $phi$253 = undefined;
    var $phi$254 = _18_b_$u$19;
    var $phi$255 = undefined;
    var $phi$256 = $instance$Eq$1;
    var $phi$257 = undefined;
    $phi$257 = $phi$256.$0;
    $phi$255 = (($and(($phi$257($phi$252.$1))($phi$254.$1)))(($$compiler$ast_jg$$equivType($phi$252.$2))($phi$254.$2)));
    $phi$253 = $phi$255;
    return $phi$253
  }
};
var $$compiler$ast_jg$$equivType = function(_18_a_$u$26){
  return function(_18_b_$u$27){
    var $phi$258 = _18_a_$u$26;
    var $phi$259 = undefined;
    if($phi$258.$tag==$$compiler$ast_jg$$TConst.$tag){
      var $phi$282 = _18_b_$u$27;
      var $phi$283 = undefined;
      if($phi$282.$tag==$$compiler$ast_jg$$TConst.$tag){
        var $phi$284 = $instance$Eq$1;
        var $phi$285 = undefined;
        $phi$285 = $phi$284.$0;
        $phi$283 = (($phi$285($phi$258.$1))($phi$282.$1))
      } else $phi$283 = false;
      $phi$259 = $phi$283
    } else if($phi$258.$tag==$$compiler$ast_jg$$TVar.$tag){
      var $phi$278 = _18_b_$u$27;
      var $phi$279 = undefined;
      if($phi$278.$tag==$$compiler$ast_jg$$TVar.$tag){
        var $phi$280 = $instance$Eq$1;
        var $phi$281 = undefined;
        $phi$281 = $phi$280.$0;
        $phi$279 = (($phi$281($phi$258.$1))($phi$278.$1))
      } else $phi$279 = false;
      $phi$259 = $phi$279
    } else if($phi$258.$tag==$$compiler$ast_jg$$TApp.$tag){
      var $phi$276 = _18_b_$u$27;
      var $phi$277 = undefined;
      if($phi$276.$tag==$$compiler$ast_jg$$TApp.$tag){
        $phi$277 = (($and(($$compiler$ast_jg$$equivType($phi$258.$1))($phi$276.$1)))(($$compiler$ast_jg$$equivType($phi$258.$2))($phi$276.$2)))
      } else $phi$277 = false;
      $phi$259 = $phi$277
    } else if($phi$258.$tag==$$compiler$ast_jg$$TBot.$tag){
      var $phi$274 = _18_b_$u$27;
      var $phi$275 = undefined;
      if($phi$274.$tag==$$compiler$ast_jg$$TBot.$tag){
        $phi$275 = true
      } else $phi$275 = false;
      $phi$259 = $phi$275
    } else if($phi$258.$tag==$$compiler$ast_jg$$TUnknown.$tag){
      var $phi$272 = _18_b_$u$27;
      var $phi$273 = undefined;
      if($phi$272.$tag==$$compiler$ast_jg$$TUnknown.$tag){
        $phi$273 = true
      } else $phi$273 = false;
      $phi$259 = $phi$273
    } else if($phi$258.$tag==$$compiler$ast_jg$$TForall.$tag){
      var $phi$260 = _18_b_$u$27;
      var $phi$261 = undefined;
      if($phi$260.$tag==$$compiler$ast_jg$$TForall.$tag){
        var _18_rbs_$u$56 = ($$compiler$prelude_jg$$all(function(_18_p_$u$58){
          var $inl$_19_p_$u$24_$u$4519 = _18_p_$u$58;
          var $phi$262 = _18_p_$u$58;
          var $phi$263 = undefined;
          $phi$263 = $phi$262.$0;
          var $inl$_19_p_$u$27_$u$4522 = _18_p_$u$58;
          var $phi$264 = _18_p_$u$58;
          var $phi$265 = undefined;
          $phi$265 = $phi$264.$1;
          return ($$compiler$ast_jg$$equivBound($phi$263))($phi$265)
        }))(($$compiler$prelude_jg$$zip($phi$258.$2))($phi$260.$2));
        var _18_rvs_$u$55 = ($$compiler$prelude_jg$$all(function(_18_p_$u$57){
          var $phi$266 = $instance$Eq$1;
          var $phi$267 = undefined;
          $phi$267 = $phi$266.$0;
          var $inl$_19_p_$u$24_$u$4525 = _18_p_$u$57;
          var $phi$268 = _18_p_$u$57;
          var $phi$269 = undefined;
          $phi$269 = $phi$268.$0;
          var $inl$_19_p_$u$27_$u$4528 = _18_p_$u$57;
          var $phi$270 = _18_p_$u$57;
          var $phi$271 = undefined;
          $phi$271 = $phi$270.$1;
          return ($phi$267($phi$269))($phi$271)
        }))(($$compiler$prelude_jg$$zip($phi$258.$1))($phi$260.$1));
        $phi$261 = (($and(($and(_18_rvs_$u$55))(_18_rbs_$u$56)))(($$compiler$ast_jg$$equivType($phi$258.$3))($phi$260.$3)))
      } else error("pattern match fail",$phi$260);
      $phi$259 = $phi$261
    } else error("pattern match fail",$phi$258);
    return $phi$259
  }
};
var $$compiler$ast_jg$$getAnnCodeLoc = function(_18_ann_$u$9){
  return ((($$compiler$ast_jg$$getAnn($instance$Hashable$13))($instance$Eq$1))("codeLoc"))(_18_ann_$u$9)
};
var $$compiler$uniquifier_jg$$rewriteExpr = function(_17_pre_$u$2){
  return function(_17_env_$u$3){
    return function(_17_e_$u$4){
      var _17_rename_$u$5 = function(_17_n_$u$9){
        var $phi$286 = $instance$Functor$9;
        var $phi$287 = undefined;
        $phi$287 = $phi$286.$0;
        var $phi$288 = $instance$Monad$11;
        var $phi$289 = undefined;
        $phi$289 = $phi$288.$1;
        return ($phi$287($concat(_17_pre_$u$2)))(($phi$289($$compiler$prelude_jg$$gets))(function($inl$_17_i_$u$1_$u$277){
          var $inl$_19_s_$u$143_$u$4531 = $inl$_17_i_$u$1_$u$277+1;
          var $phi$290 = $instance$Monad$11;
          var $phi$291 = undefined;
          $phi$291 = $phi$290.$0;
          return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$4532){
            return ($$compiler$prelude_jg$$Pair($inl$_19_s_$u$143_$u$4531))($$compiler$prelude_jg$$Unit)
          })))($phi$291(($concat(($concat(_17_n_$u$9))("_$u$")))(intToString($inl$_17_i_$u$1_$u$277))))
        }))
      };
      var _17_renamePat_$u$6 = function(_17_p_$u$10){
        var $phi$292 = _17_p_$u$10;
        var $phi$293 = undefined;
        if($phi$292.$tag==$$compiler$ast_jg$$PConst.$tag){
          var $phi$314 = $instance$Monad$11;
          var $phi$315 = undefined;
          $phi$315 = $phi$314.$0;
          $phi$293 = ($phi$315(($$compiler$prelude_jg$$Pair(_17_p_$u$10))(empty)))
        } else if($phi$292.$tag==$$compiler$ast_jg$$PVar.$tag){
          var $phi$310 = $instance$Monad$11;
          var $phi$311 = undefined;
          $phi$311 = $phi$310.$1;
          $phi$293 = (($phi$311(_17_rename_$u$5($phi$292.$1)))(function(_17_n_$u$15){
            var $phi$312 = $instance$Monad$11;
            var $phi$313 = undefined;
            $phi$313 = $phi$312.$0;
            return $phi$313(($$compiler$prelude_jg$$Pair(($$compiler$ast_jg$$PVar($phi$292.$0))(_17_n_$u$15)))(((set($phi$292.$1))(_17_n_$u$15))(empty)))
          }))
        } else if($phi$292.$tag==$$compiler$ast_jg$$PData.$tag){
          var $phi$294 = $instance$Monad$11;
          var $phi$295 = undefined;
          $phi$295 = $phi$294.$1;
          $phi$293 = (($phi$295((($$compiler$prelude_jg$$mapM($instance$Monad$11))(_17_renamePat_$u$6))($phi$292.$2)))(function(_17_ps_$u$19){
            var $phi$296 = (has($phi$292.$1))(_17_env_$u$3);
            var $phi$297 = undefined;
            if(!$phi$296){
              var $phi$304 = $instance$Monad$11;
              var $phi$305 = undefined;
              $phi$305 = $phi$304.$0;
              $phi$297 = ($phi$305(($$compiler$prelude_jg$$Pair((($$compiler$ast_jg$$PData($phi$292.$0))($phi$292.$1))((map(function($inl$_19_p_$u$24_$u$4533){
                var $phi$306 = $inl$_19_p_$u$24_$u$4533;
                var $phi$307 = undefined;
                $phi$307 = $phi$306.$0;
                return $phi$307
              }))(_17_ps_$u$19))))(((foldl(merge))(empty))((map(function($inl$_19_p_$u$27_$u$4536){
                var $phi$308 = $inl$_19_p_$u$27_$u$4536;
                var $phi$309 = undefined;
                $phi$309 = $phi$308.$1;
                return $phi$309
              }))(_17_ps_$u$19)))))
            } else if($phi$296){
              var $phi$298 = $instance$Monad$11;
              var $phi$299 = undefined;
              $phi$299 = $phi$298.$0;
              $phi$297 = ($phi$299(($$compiler$prelude_jg$$Pair((($$compiler$ast_jg$$PData($phi$292.$0))((get($phi$292.$1))(_17_env_$u$3)))((map(function($inl$_19_p_$u$24_$u$4539){
                var $phi$300 = $inl$_19_p_$u$24_$u$4539;
                var $phi$301 = undefined;
                $phi$301 = $phi$300.$0;
                return $phi$301
              }))(_17_ps_$u$19))))(((foldl(merge))(empty))((map(function($inl$_19_p_$u$27_$u$4542){
                var $phi$302 = $inl$_19_p_$u$27_$u$4542;
                var $phi$303 = undefined;
                $phi$303 = $phi$302.$1;
                return $phi$303
              }))(_17_ps_$u$19)))))
            } else error("pattern match fail",$phi$296);
            return $phi$297
          }))
        } else error("pattern match fail",$phi$292);
        return $phi$293
      };
      return (($$compiler$ast_jg$$breakableDownM($instance$Monad$11))(function($inl$_17_e_$u$27_$u$366){
        var $phi$316 = $inl$_17_e_$u$27_$u$366;
        var $phi$317 = undefined;
        if($phi$316.$tag==$$compiler$ast_jg$$Lam.$tag){
          var $phi$356 = $instance$Monad$11;
          var $phi$357 = undefined;
          $phi$357 = $phi$356.$1;
          $phi$317 = (($phi$357(_17_rename_$u$5($phi$316.$1)))(function($inl$_17_n_$u$31_$u$370){
            var $phi$358 = $instance$Monad$11;
            var $phi$359 = undefined;
            $phi$359 = $phi$358.$1;
            return ($phi$359((($$compiler$uniquifier_jg$$rewriteExpr(_17_pre_$u$2))(((set($phi$316.$1))($inl$_17_n_$u$31_$u$370))(_17_env_$u$3)))($phi$316.$2)))(function($inl$_17_e_$u$32_$u$371){
              var $phi$360 = $instance$Monad$11;
              var $phi$361 = undefined;
              $phi$361 = $phi$360.$0;
              return $phi$361($$compiler$prelude_jg$$Right((($$compiler$ast_jg$$Lam($phi$316.$0))($inl$_17_n_$u$31_$u$370))($inl$_17_e_$u$32_$u$371)))
            })
          }))
        } else if($phi$316.$tag==$$compiler$ast_jg$$Let.$tag){
          var $inl$_17_ns_$u$36_$u$375 = (map(function($inl$_19_p_$u$24_$u$4545){
            var $phi$342 = $inl$_19_p_$u$24_$u$4545;
            var $phi$343 = undefined;
            $phi$343 = $phi$342.$0;
            return $phi$343
          }))($phi$316.$1);
          var $inl$_17_ns2_$u$37_$u$376 = (($$compiler$prelude_jg$$mapM($instance$Monad$11))(_17_rename_$u$5))($inl$_17_ns_$u$36_$u$375);
          var $phi$344 = $instance$Monad$11;
          var $phi$345 = undefined;
          $phi$345 = $phi$344.$1;
          $phi$317 = (($phi$345($inl$_17_ns2_$u$37_$u$376))(function($inl$_17_ns_$u$38_$u$377){
            var $inl$_17_env2_$u$39_$u$378 = (merge(_17_env_$u$3))($$compiler$prelude_jg$$toRecord(($$compiler$prelude_jg$$zip((map(function($inl$_19_p_$u$24_$u$4548){
              var $phi$346 = $inl$_19_p_$u$24_$u$4548;
              var $phi$347 = undefined;
              $phi$347 = $phi$346.$0;
              return $phi$347
            }))($phi$316.$1)))($inl$_17_ns_$u$38_$u$377)));
            var $inl$_17_e2_$u$41_$u$379 = (($$compiler$uniquifier_jg$$rewriteExpr(_17_pre_$u$2))($inl$_17_env2_$u$39_$u$378))($phi$316.$2);
            var $inl$_17_bs2_$u$40_$u$380 = (($$compiler$prelude_jg$$mapM($instance$Monad$11))(($$compiler$uniquifier_jg$$rewriteExpr(_17_pre_$u$2))($inl$_17_env2_$u$39_$u$378)))((map(function($inl$_19_p_$u$27_$u$4551){
              var $phi$348 = $inl$_19_p_$u$27_$u$4551;
              var $phi$349 = undefined;
              $phi$349 = $phi$348.$1;
              return $phi$349
            }))($phi$316.$1));
            var $phi$350 = $instance$Monad$11;
            var $phi$351 = undefined;
            $phi$351 = $phi$350.$1;
            return ($phi$351($inl$_17_bs2_$u$40_$u$380))(function($inl$_17_bs_$u$42_$u$381){
              var $phi$352 = $instance$Monad$11;
              var $phi$353 = undefined;
              $phi$353 = $phi$352.$1;
              return ($phi$353($inl$_17_e2_$u$41_$u$379))(function($inl$_17_e_$u$43_$u$382){
                var $phi$354 = $instance$Monad$11;
                var $phi$355 = undefined;
                $phi$355 = $phi$354.$0;
                return $phi$355($$compiler$prelude_jg$$Right((($$compiler$ast_jg$$Let($phi$316.$0))(($$compiler$prelude_jg$$zip($inl$_17_ns_$u$38_$u$377))($inl$_17_bs_$u$42_$u$381)))($inl$_17_e_$u$43_$u$382)))
              })
            })
          }))
        } else if($phi$316.$tag==$$compiler$ast_jg$$Case.$tag){
          var $phi$326 = $instance$Monad$11;
          var $phi$327 = undefined;
          $phi$327 = $phi$326.$1;
          $phi$317 = (($phi$327((($$compiler$uniquifier_jg$$rewriteExpr(_17_pre_$u$2))(_17_env_$u$3))($phi$316.$1)))(function($inl$_17_e_$u$47_$u$386){
            var $phi$328 = $instance$Monad$11;
            var $phi$329 = undefined;
            $phi$329 = $phi$328.$1;
            return ($phi$329((($$compiler$prelude_jg$$mapM($instance$Monad$11))(function($inl$_17_p_$u$20_$u$418){
              var $phi$330 = $inl$_17_p_$u$20_$u$418;
              var $phi$331 = undefined;
              var $phi$332 = $instance$Monad$11;
              var $phi$333 = undefined;
              $phi$333 = $phi$332.$1;
              $phi$331 = (($phi$333(_17_renamePat_$u$6($phi$330.$0)))(function($inl$_17_pe_$u$23_$u$421){
                var $phi$334 = $inl$_17_pe_$u$23_$u$421;
                var $phi$335 = undefined;
                var $phi$336 = $instance$Monad$11;
                var $phi$337 = undefined;
                $phi$337 = $phi$336.$1;
                $phi$335 = (($phi$337((($$compiler$uniquifier_jg$$rewriteExpr(_17_pre_$u$2))((merge(_17_env_$u$3))($phi$334.$1)))($phi$330.$1)))(function($inl$_17_e_$u$26_$u$424){
                  var $phi$338 = $instance$Monad$11;
                  var $phi$339 = undefined;
                  $phi$339 = $phi$338.$0;
                  return $phi$339(($$compiler$prelude_jg$$Pair($phi$334.$0))($inl$_17_e_$u$26_$u$424))
                }));
                return $phi$335
              }));
              return $phi$331
            }))($phi$316.$2)))(function($inl$_17_ps_$u$48_$u$387){
              var $phi$340 = $instance$Monad$11;
              var $phi$341 = undefined;
              $phi$341 = $phi$340.$0;
              return $phi$341($$compiler$prelude_jg$$Right((($$compiler$ast_jg$$Case($phi$316.$0))($inl$_17_e_$u$47_$u$386))($inl$_17_ps_$u$48_$u$387)))
            })
          }))
        } else if($phi$316.$tag==$$compiler$ast_jg$$Var.$tag){
          var $phi$320 = (has($phi$316.$1))(_17_env_$u$3);
          var $phi$321 = undefined;
          if($phi$320){
            var $phi$324 = $instance$Monad$11;
            var $phi$325 = undefined;
            $phi$325 = $phi$324.$0;
            $phi$321 = ($phi$325($$compiler$prelude_jg$$Left(($$compiler$ast_jg$$Var($phi$316.$0))((get($phi$316.$1))(_17_env_$u$3)))))
          } else if(!$phi$320){
            var $phi$322 = $instance$Monad$11;
            var $phi$323 = undefined;
            $phi$323 = $phi$322.$0;
            $phi$321 = ($phi$323($$compiler$prelude_jg$$Left($inl$_17_e_$u$27_$u$366)))
          } else error("pattern match fail",$phi$320);
          $phi$317 = $phi$321
        } else {
          var $phi$318 = $instance$Monad$11;
          var $phi$319 = undefined;
          $phi$319 = $phi$318.$0;
          $phi$317 = ($phi$319($$compiler$prelude_jg$$Left($inl$_17_e_$u$27_$u$366)))
        };
        return $phi$317
      }))(_17_e_$u$4)
    }
  }
};
var $$compiler$uniquifier_jg$$addPrefix = function(_17_fn_$u$127){
  return function(_17_n_$u$128){
    return ($concat(($concat(((stringReplaceChar("/"))("$"))(((stringReplaceChar("."))("_"))(_17_fn_$u$127))))("$$")))(_17_n_$u$128)
  }
};
var $$compiler$uniquifier_jg$$uniquify = function(_17_pre_$u$149){
  return function(_17_ms_$u$150){
    return function(_17_m_$u$151){
      var $inl$_17_pre_$u$75_$u$562 = _17_pre_$u$149;
      return ($$compiler$prelude_jg$$evalState(0))(((function($inl$_17_ms_$u$76_$u$563){
        return function($inl$_17_m_$u$77_$u$564){
          var $phi$362 = $inl$_17_m_$u$77_$u$564;
          var $phi$363 = undefined;
          var $inl$_17_addBindings_$u$85_$u$572 = function($inl$_17_env_$u$94_$u$581){
            return function($inl$_17_bs_$u$95_$u$582){
              return ((foldl(function($inl$_17_env_$u$96_$u$583){
                return function($inl$_17_b_$u$97_$u$584){
                  var $inl$_19_p_$u$24_$u$4554 = $inl$_17_b_$u$97_$u$584;
                  var $phi$364 = $inl$_17_b_$u$97_$u$584;
                  var $phi$365 = undefined;
                  $phi$365 = $phi$364.$0;
                  var $inl$_19_f_$u$0_$u$4557 = $$compiler$uniquifier_jg$$addPrefix($phi$362.$1);
                  var $inl$_19_p_$u$24_$u$4559 = $inl$_17_b_$u$97_$u$584;
                  var $phi$366 = $inl$_17_b_$u$97_$u$584;
                  var $phi$367 = undefined;
                  $phi$367 = $phi$366.$0;
                  return ((set($phi$365))((function($inl$_19_a_$u$1_$u$4558){
                    return $inl$_19_f_$u$0_$u$4557($inl$_19_a_$u$1_$u$4558)
                  })($phi$367)))($inl$_17_env_$u$96_$u$583)
                }
              }))($inl$_17_env_$u$94_$u$581))($inl$_17_bs_$u$95_$u$582)
            }
          };
          var $inl$_17_addBindingsNoPrefix_$u$86_$u$573 = function($inl$_17_env_$u$98_$u$585){
            return function($inl$_17_bs_$u$99_$u$586){
              return ((foldl(function($inl$_17_env_$u$100_$u$587){
                return function($inl$_17_b_$u$101_$u$588){
                  var $inl$_19_p_$u$24_$u$4562 = $inl$_17_b_$u$101_$u$588;
                  var $phi$368 = $inl$_17_b_$u$101_$u$588;
                  var $phi$369 = undefined;
                  $phi$369 = $phi$368.$0;
                  var $inl$_19_p_$u$24_$u$4565 = $inl$_17_b_$u$101_$u$588;
                  var $phi$370 = $inl$_17_b_$u$101_$u$588;
                  var $phi$371 = undefined;
                  $phi$371 = $phi$370.$0;
                  return ((set($phi$369))($phi$371))($inl$_17_env_$u$100_$u$587)
                }
              }))($inl$_17_env_$u$98_$u$585))($inl$_17_bs_$u$99_$u$586)
            }
          };
          var $inl$_17_addClass_$u$87_$u$574 = function($inl$_17_env_$u$102_$u$589){
            return function($inl$_17_c_$u$103_$u$590){
              var $phi$372 = $inl$_17_c_$u$103_$u$590;
              var $phi$373 = undefined;
              $phi$373 = (($inl$_17_addBindingsNoPrefix_$u$86_$u$573($inl$_17_env_$u$102_$u$589))($phi$372.$3));
              return $phi$373
            }
          };
          var $inl$_17_env_$u$91_$u$576 = ((foldl(function($inl$$inl$_17_env_$u$108_$u$595_$u$4580){
            return function($inl$$inl$_17_i_$u$109_$u$596_$u$4581){
              var $phi$374 = $inl$$inl$_17_i_$u$109_$u$596_$u$4581;
              var $phi$375 = undefined;
              if(($phi$374.$tag==$$compiler$ast_jg$$ImportOpen.$tag)&&("./builtins.js"==$phi$374.$1)){
                var $phi$382 = (get("./builtins.js"))($inl$_17_ms_$u$76_$u$563);
                var $phi$383 = undefined;
                $phi$383 = $phi$382.$1;
                $phi$375 = (($inl$_17_addBindingsNoPrefix_$u$86_$u$573(((foldl($inl$_17_addClass_$u$87_$u$574))($inl$$inl$_17_env_$u$108_$u$595_$u$4580))($phi$383)))((map(function($inl$$inl$_17_n_$u$115_$u$602_$u$4587){
                  var $inl$_19_p_$u$27_$u$4595 = $inl$$inl$_17_n_$u$115_$u$602_$u$4587;
                  var $phi$384 = $inl$$inl$_17_n_$u$115_$u$602_$u$4587;
                  var $phi$385 = undefined;
                  $phi$385 = $phi$384.$1;
                  var $inl$_19_p_$u$24_$u$4598 = $inl$$inl$_17_n_$u$115_$u$602_$u$4587;
                  var $phi$386 = $inl$$inl$_17_n_$u$115_$u$602_$u$4587;
                  var $phi$387 = undefined;
                  $phi$387 = $phi$386.$0;
                  return ($$compiler$prelude_jg$$Pair($phi$385))($phi$387)
                }))($phi$374.$2)))
              } else if($phi$374.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
                var $phi$376 = (get($phi$374.$1))($inl$_17_ms_$u$76_$u$563);
                var $phi$377 = undefined;
                $phi$377 = $phi$376.$1;
                $phi$375 = (($inl$_17_addBindings_$u$85_$u$572(((foldl($inl$_17_addClass_$u$87_$u$574))($inl$$inl$_17_env_$u$108_$u$595_$u$4580))($phi$377)))((map(function($inl$$inl$_17_n_$u$122_$u$609_$u$4594){
                  var $inl$_19_p_$u$27_$u$4601 = $inl$$inl$_17_n_$u$122_$u$609_$u$4594;
                  var $phi$378 = $inl$$inl$_17_n_$u$122_$u$609_$u$4594;
                  var $phi$379 = undefined;
                  $phi$379 = $phi$378.$1;
                  var $inl$_19_p_$u$24_$u$4604 = $inl$$inl$_17_n_$u$122_$u$609_$u$4594;
                  var $phi$380 = $inl$$inl$_17_n_$u$122_$u$609_$u$4594;
                  var $phi$381 = undefined;
                  $phi$381 = $phi$380.$0;
                  return ($$compiler$prelude_jg$$Pair($phi$379))($phi$381)
                }))($phi$374.$2)))
              } else error("pattern match fail",$phi$374);
              return $phi$375
            }
          }))(((foldl($inl$_17_addClass_$u$87_$u$574))(($inl$_17_addBindings_$u$85_$u$572($$compiler$prelude_jg$$toRecord(($$compiler$prelude_jg$$concatMap(function($inl$_17_d_$u$123_$u$610){
            return (map(function($inl$_17_n_$u$124_$u$611){
              return ($$compiler$prelude_jg$$Pair($inl$_17_n_$u$124_$u$611))(($$compiler$uniquifier_jg$$addPrefix($phi$362.$1))($inl$_17_n_$u$124_$u$611))
            }))($$compiler$ast_jg$$dataConNames($inl$_17_d_$u$123_$u$610))
          }))($phi$362.$3))))($phi$362.$6)))($phi$362.$4)))($phi$362.$2);
          var $inl$_17_pre_$u$52_$u$614 = _17_pre_$u$149;
          var $inl$_17_ins2_$u$93_$u$577 = (($$compiler$prelude_jg$$mapM($instance$Monad$11))((function($inl$_17_env_$u$53_$u$615){
            return function($inl$_17_i_$u$54_$u$616){
              var $phi$388 = $inl$_17_i_$u$54_$u$616;
              var $phi$389 = undefined;
              var $phi$390 = $instance$Monad$11;
              var $phi$391 = undefined;
              $phi$391 = $phi$390.$1;
              var $inl$_17_env_$u$69_$u$626 = $inl$_17_env_$u$53_$u$615;
              $phi$389 = (($phi$391((function($inl$_17_bs_$u$70_$u$627){
                return (($$compiler$prelude_jg$$mapM($instance$Monad$11))(function($inl$_17_d_$u$71_$u$628){
                  var $phi$392 = $inl$_17_d_$u$71_$u$628;
                  var $phi$393 = undefined;
                  var $phi$394 = $instance$Monad$11;
                  var $phi$395 = undefined;
                  $phi$395 = $phi$394.$1;
                  $phi$393 = (($phi$395((($$compiler$uniquifier_jg$$rewriteExpr(_17_pre_$u$149))($inl$_17_env_$u$69_$u$626))($phi$392.$1)))(function($inl$_17_e_$u$74_$u$631){
                    var $phi$396 = $instance$Monad$11;
                    var $phi$397 = undefined;
                    $phi$397 = $phi$396.$0;
                    return $phi$397(($$compiler$prelude_jg$$Pair($phi$392.$0))($inl$_17_e_$u$74_$u$631))
                  }));
                  return $phi$393
                }))($inl$_17_bs_$u$70_$u$627)
              })($phi$388.$3)))(function($inl$_17_bs_$u$59_$u$621){
                var $phi$398 = $instance$Monad$11;
                var $phi$399 = undefined;
                $phi$399 = $phi$398.$0;
                return $phi$399(((($$compiler$ast_jg$$Instance($phi$388.$0))($phi$388.$1))($phi$388.$2))($inl$_17_bs_$u$59_$u$621))
              }));
              return $phi$389
            }
          })($inl$_17_env_$u$91_$u$576)))($phi$362.$5);
          var $inl$_17_fn_$u$61_$u$642 = $phi$362.$1;
          var $inl$_17_bs2_$u$92_$u$578 = ((function($inl$_17_env_$u$62_$u$643){
            return function($inl$_17_bs_$u$63_$u$644){
              return (($$compiler$prelude_jg$$mapM($instance$Monad$11))(function($inl$_17_d_$u$64_$u$645){
                var $phi$400 = $inl$_17_d_$u$64_$u$645;
                var $phi$401 = undefined;
                var $phi$402 = $instance$Monad$11;
                var $phi$403 = undefined;
                $phi$403 = $phi$402.$1;
                $phi$401 = (($phi$403((($$compiler$uniquifier_jg$$rewriteExpr(_17_pre_$u$149))($inl$_17_env_$u$62_$u$643))($phi$400.$1)))(function($inl$_17_e_$u$67_$u$648){
                  var $phi$404 = $instance$Monad$11;
                  var $phi$405 = undefined;
                  $phi$405 = $phi$404.$0;
                  return $phi$405(($$compiler$prelude_jg$$Pair(($$compiler$uniquifier_jg$$addPrefix($inl$_17_fn_$u$61_$u$642))($phi$400.$0)))($inl$_17_e_$u$67_$u$648))
                }));
                return $phi$401
              }))($inl$_17_bs_$u$63_$u$644)
            }
          })($inl$_17_env_$u$91_$u$576))($phi$362.$6);
          var $inl$_17_is2_$u$90_$u$579 = (map(function($inl$_17_i_$u$140_$u$656){
            var $phi$406 = $inl$_17_i_$u$140_$u$656;
            var $phi$407 = undefined;
            if(($phi$406.$tag==$$compiler$ast_jg$$ImportOpen.$tag)&&("./builtins.js"==$phi$406.$1)){
              $phi$407 = $inl$_17_i_$u$140_$u$656
            } else if($phi$406.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
              $phi$407 = ((($$compiler$ast_jg$$ImportOpen($phi$406.$0))($phi$406.$1))((map(function($inl$_17_p_$u$146_$u$662){
                var $phi$408 = $inl$_17_p_$u$146_$u$662;
                var $phi$409 = undefined;
                $phi$409 = (($$compiler$prelude_jg$$Pair($phi$408.$0))(($$compiler$uniquifier_jg$$addPrefix($phi$362.$1))($phi$408.$1)));
                return $phi$409
              }))($phi$406.$2)))
            } else error("pattern match fail",$phi$406);
            return $phi$407
          }))($phi$362.$2);
          var $inl$_17_ds2_$u$89_$u$580 = (map(function($inl$_17_d_$u$130_$u$666){
            var $phi$410 = $inl$_17_d_$u$130_$u$666;
            var $phi$411 = undefined;
            $phi$411 = (((($$compiler$ast_jg$$Data($phi$410.$0))($phi$410.$1))($phi$410.$2))((map(function($inl$_17_c_$u$135_$u$671){
              var $phi$412 = $inl$_17_c_$u$135_$u$671;
              var $phi$413 = undefined;
              $phi$413 = ((($$compiler$ast_jg$$DataCon($phi$412.$0))(($$compiler$uniquifier_jg$$addPrefix($phi$362.$1))($phi$412.$1)))($phi$412.$2));
              return $phi$413
            }))($phi$410.$3)));
            return $phi$411
          }))($phi$362.$3);
          var $phi$414 = $instance$Monad$11;
          var $phi$415 = undefined;
          $phi$415 = $phi$414.$1;
          $phi$363 = (($phi$415($inl$_17_bs2_$u$92_$u$578))(function($inl$_17_bs_$u$125_$u$612){
            var $phi$416 = $instance$Monad$11;
            var $phi$417 = undefined;
            $phi$417 = $phi$416.$1;
            return ($phi$417($inl$_17_ins2_$u$93_$u$577))(function($inl$_17_ins_$u$126_$u$613){
              var $phi$418 = $instance$Monad$11;
              var $phi$419 = undefined;
              $phi$419 = $phi$418.$0;
              return $phi$419((((((($$compiler$ast_jg$$Module($phi$362.$0))($phi$362.$1))($inl$_17_is2_$u$90_$u$579))($inl$_17_ds2_$u$89_$u$580))($phi$362.$4))($inl$_17_ins_$u$126_$u$613))($inl$_17_bs_$u$125_$u$612))
            })
          }));
          return $phi$363
        }
      })(_17_ms_$u$150))(_17_m_$u$151))
    }
  }
};
var $$compiler$printer_jg$$printType = function(_16_t_$u$0){
  var _16_printParen_$u$1 = function(_16_t_$u$5){
    return ($concat(($concat("("))($$compiler$printer_jg$$printType(_16_t_$u$5))))(")")
  };
  var $phi$420 = _16_t_$u$0;
  var $phi$421 = undefined;
  if($phi$420.$tag==$$compiler$ast_jg$$TConst.$tag){
    $phi$421 = $phi$420.$1
  } else if($phi$420.$tag==$$compiler$ast_jg$$TVar.$tag){
    $phi$421 = $phi$420.$1
  } else if($phi$420.$tag==$$compiler$ast_jg$$TBot.$tag){
    $phi$421 = "~bottom~"
  } else if($phi$420.$tag==$$compiler$ast_jg$$TUnknown.$tag){
    $phi$421 = "?"
  } else if(($phi$420.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$420.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$420.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$phi$420.$1.$1.$1)))){
    var $phi$428 = $phi$420.$1.$2;
    var $phi$429 = undefined;
    if(($phi$428.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$428.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$428.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$phi$428.$1.$1.$1)))){
      $phi$429 = (_16_printParen_$u$1($phi$420.$1.$2))
    } else if($phi$428.$tag==$$compiler$ast_jg$$TForall.$tag){
      $phi$429 = (_16_printParen_$u$1($phi$420.$1.$2))
    } else $phi$429 = ($$compiler$printer_jg$$printType($phi$420.$1.$2));
    $phi$421 = (($concat(($concat($phi$429))(" -> ")))($$compiler$printer_jg$$printType($phi$420.$2)))
  } else if($phi$420.$tag==$$compiler$ast_jg$$TApp.$tag){
    var $phi$424 = $phi$420.$1;
    var $phi$425 = undefined;
    if(($phi$424.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$424.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$424.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$phi$424.$1.$1.$1)))){
      $phi$425 = (_16_printParen_$u$1($phi$420.$1))
    } else if($phi$424.$tag==$$compiler$ast_jg$$TForall.$tag){
      $phi$425 = (_16_printParen_$u$1($phi$420.$1))
    } else $phi$425 = ($$compiler$printer_jg$$printType($phi$420.$1));
    var $phi$426 = $phi$420.$2;
    var $phi$427 = undefined;
    if($phi$426.$tag==$$compiler$ast_jg$$TApp.$tag){
      $phi$427 = (_16_printParen_$u$1($phi$420.$2))
    } else if($phi$426.$tag==$$compiler$ast_jg$$TForall.$tag){
      $phi$427 = (_16_printParen_$u$1($phi$420.$2))
    } else $phi$427 = ($$compiler$printer_jg$$printType($phi$420.$2));
    $phi$421 = (($concat(($concat($phi$425))(" ")))($phi$427))
  } else if($phi$420.$tag==$$compiler$ast_jg$$TForall.$tag){
    var $phi$422 = length($phi$420.$2);
    var $phi$423 = undefined;
    if(0==$phi$422){
      $phi$423 = ""
    } else $phi$423 = (($concat(" with "))((intercalate(", "))((map($$compiler$printer_jg$$printTypeBound))($phi$420.$2))));
    var _16_bounds_$u$53 = $phi$423;
    $phi$421 = (($concat(($concat(($concat(($concat("forall "))((intercalate(", "))($phi$420.$1))))(_16_bounds_$u$53)))(". ")))($$compiler$printer_jg$$printType($phi$420.$3)))
  } else $phi$421 = (error(($concat("cannot print "))(jsonStringify(_16_t_$u$0))));
  return $phi$421
};
var $$compiler$printer_jg$$printTypeBound = function(_16_b_$u$56){
  var $phi$430 = _16_b_$u$56;
  var $phi$431 = undefined;
  $phi$431 = (($concat(($concat(($concat(($concat($phi$430.$1))(" ")))("(")))($$compiler$printer_jg$$printType($phi$430.$2))))(")"));
  return $phi$431
};
var $$compiler$printer_jg$$indent = map(function(_16_l_$u$116){
  return ($concat("  "))(_16_l_$u$116)
});
var $$compiler$inliner_jg$$patSize = function(_15_p_$u$127){
  var $phi$432 = _15_p_$u$127;
  var $phi$433 = undefined;
  if($phi$432.$tag==$$compiler$ast_jg$$PVar.$tag){
    $phi$433 = 1
  } else if($phi$432.$tag==$$compiler$ast_jg$$PConst.$tag){
    $phi$433 = 1
  } else if($phi$432.$tag==$$compiler$ast_jg$$PData.$tag){
    $phi$433 = (((foldl(function(_15_c_$u$135){
      return function(_15_p_$u$136){
        return _15_c_$u$135+($$compiler$inliner_jg$$patSize(_15_p_$u$136))
      }
    }))(1))($phi$432.$2))
  } else error("pattern match fail",$phi$432);
  return $phi$433
};
var $$compiler$inliner_jg$$exprSize = function(_15_e_$u$104){
  var $phi$434 = _15_e_$u$104;
  var $phi$435 = undefined;
  if($phi$434.$tag==$$compiler$ast_jg$$Var.$tag){
    $phi$435 = 1
  } else if($phi$434.$tag==$$compiler$ast_jg$$Const.$tag){
    $phi$435 = 1
  } else if($phi$434.$tag==$$compiler$ast_jg$$App.$tag){
    $phi$435 = ((1+($$compiler$inliner_jg$$exprSize($phi$434.$1)))+($$compiler$inliner_jg$$exprSize($phi$434.$2)))
  } else if($phi$434.$tag==$$compiler$ast_jg$$Lam.$tag){
    $phi$435 = (1+($$compiler$inliner_jg$$exprSize($phi$434.$2)))
  } else if($phi$434.$tag==$$compiler$ast_jg$$Case.$tag){
    $phi$435 = (1+(((foldl(function(_15_c_$u$118){
      return function(_15_p_$u$119){
        var $phi$438 = _15_p_$u$119;
        var $phi$439 = undefined;
        $phi$439 = ((_15_c_$u$118+($$compiler$inliner_jg$$patSize($phi$438.$0)))+($$compiler$inliner_jg$$exprSize($phi$438.$1)));
        return $phi$439
      }
    }))($$compiler$inliner_jg$$exprSize($phi$434.$1)))($phi$434.$2)))
  } else if($phi$434.$tag==$$compiler$ast_jg$$Let.$tag){
    $phi$435 = (1+(((foldl(function(_15_c_$u$125){
      return function(_15_b_$u$126){
        var $inl$_19_p_$u$27_$u$4621 = _15_b_$u$126;
        var $phi$436 = _15_b_$u$126;
        var $phi$437 = undefined;
        $phi$437 = $phi$436.$1;
        return _15_c_$u$125+($$compiler$inliner_jg$$exprSize($phi$437))
      }
    }))($$compiler$inliner_jg$$exprSize($phi$434.$2)))($phi$434.$1)))
  } else error("pattern match fail",$phi$434);
  return $phi$435
};
var $$compiler$inliner_jg$$getCount = function(_15_e_$u$0){
  var $phi$440 = ((($$compiler$ast_jg$$getAnn($instance$Hashable$13))($instance$Eq$1))("useCount"))($$compiler$ast_jg$$annOf(_15_e_$u$0));
  var $phi$441 = undefined;
  if(($phi$440.$tag==$$compiler$prelude_jg$$Just.$tag)&&($phi$440.$0.$tag==$$compiler$ast_jg$$AnnUseCount.$tag)){
    $phi$441 = $phi$440.$0.$0
  } else error("pattern match fail",$phi$440);
  return $phi$441
};
var $$compiler$inliner_jg$$mergeCount = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(_15_a_$u$2){
      return function(_15_b_$u$3){
        return (($$compiler$prelude_jg$$foldTrie(function(_15_a_$u$4){
          return function(_15_k_$u$5){
            return function(_15_v_$u$6){
              var $inl$_19_d_$u$17_$u$4624 = 0;
              return (((($$compiler$prelude_jg$$insert(local$instance$Hashable$1))(local$instance$Eq$0))(_15_k_$u$5))(_15_v_$u$6+((function($inl$_19_m_$u$18_$u$4625){
                var $phi$442 = $inl$_19_m_$u$18_$u$4625;
                var $phi$443 = undefined;
                if($phi$442.$tag==$$compiler$prelude_jg$$Just.$tag){
                  $phi$443 = $phi$442.$0
                } else if($phi$442.$tag==$$compiler$prelude_jg$$Nothing.$tag){
                  $phi$443 = 0
                } else error("pattern match fail",$phi$442);
                return $phi$443
              })(((($$compiler$prelude_jg$$lookup(local$instance$Hashable$1))(local$instance$Eq$0))(_15_k_$u$5))(_15_a_$u$4)))))(_15_a_$u$4)
            }
          }
        }))(_15_a_$u$2))(_15_b_$u$3)
      }
    }
  }
};
var $$compiler$inliner_jg$$chooseForInlining = function(_15_baseCount_$u$137){
  return function(_15_bs_$u$138){
    var _15_useCount_$u$139 = ((foldl(($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1)))(_15_baseCount_$u$137))((map(function(_15_b_$u$141){
      var $inl$_19_p_$u$27_$u$4627 = _15_b_$u$141;
      var $phi$444 = _15_b_$u$141;
      var $phi$445 = undefined;
      $phi$445 = $phi$444.$1;
      return $$compiler$inliner_jg$$getCount($phi$445)
    }))(_15_bs_$u$138));
    return ((foldl(function($inl$_15_r_$u$142_$u$770){
      return function($inl$_15_b_$u$143_$u$771){
        var $phi$446 = $inl$_15_b_$u$143_$u$771;
        var $phi$447 = undefined;
        var $phi$448 = $phi$446.$1;
        var $phi$449 = undefined;
        if($phi$448.$tag==$$compiler$ast_jg$$Var.$tag){
          $phi$449 = ((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))($phi$446.$0))($phi$446.$1))($inl$_15_r_$u$142_$u$770))
        } else if($phi$448.$tag==$$compiler$ast_jg$$Const.$tag){
          $phi$449 = ((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))($phi$446.$0))($phi$446.$1))($inl$_15_r_$u$142_$u$770))
        } else if($phi$448.$tag==$$compiler$ast_jg$$Lam.$tag){
          var $phi$452 = $instance$Ord$2;
          var $phi$453 = undefined;
          $phi$453 = $phi$452.$0;
          var $phi$454 = $instance$Eq$0;
          var $phi$455 = undefined;
          $phi$455 = $phi$454.$0;
          var $inl$_19_d_$u$17_$u$4630 = 0;
          var $phi$450 = ($or(($phi$453($$compiler$inliner_jg$$exprSize($phi$446.$1)))(10)))(($phi$455(1))((function($inl$_19_m_$u$18_$u$4631){
            var $phi$456 = $inl$_19_m_$u$18_$u$4631;
            var $phi$457 = undefined;
            if($phi$456.$tag==$$compiler$prelude_jg$$Just.$tag){
              $phi$457 = $phi$456.$0
            } else if($phi$456.$tag==$$compiler$prelude_jg$$Nothing.$tag){
              $phi$457 = 0
            } else error("pattern match fail",$phi$456);
            return $phi$457
          })(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))($phi$446.$0))(_15_useCount_$u$139))));
          var $phi$451 = undefined;
          if(!$phi$450){
            $phi$451 = $inl$_15_r_$u$142_$u$770
          } else if($phi$450){
            $phi$451 = ((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))($phi$446.$0))($phi$446.$1))($inl$_15_r_$u$142_$u$770))
          } else error("pattern match fail",$phi$450);
          $phi$449 = $phi$451
        } else $phi$449 = $inl$_15_r_$u$142_$u$770;
        $phi$447 = $phi$449;
        return $phi$447
      }
    }))($$compiler$prelude_jg$$Empty))(_15_bs_$u$138)
  }
};
var $$compiler$inliner_jg$$mapBindingsM = function(local$instance$Monad$0){
  return function(_15_f_$u$67){
    return function(_15_bs_$u$68){
      return (($$compiler$prelude_jg$$mapM(local$instance$Monad$0))(function(_15_b_$u$69){
        var $phi$458 = _15_b_$u$69;
        var $phi$459 = undefined;
        var $phi$460 = local$instance$Monad$0;
        var $phi$461 = undefined;
        $phi$461 = $phi$460.$1;
        $phi$459 = (($phi$461((_15_f_$u$67($phi$458.$0))($phi$458.$1)))(function(_15_e_$u$72){
          var $phi$462 = local$instance$Monad$0;
          var $phi$463 = undefined;
          $phi$463 = $phi$462.$0;
          return $phi$463(($$compiler$prelude_jg$$Pair($phi$458.$0))(_15_e_$u$72))
        }));
        return $phi$459
      }))(_15_bs_$u$68)
    }
  }
};
var $$compiler$inliner_jg$$inlineCode = function(_15_always_$u$171){
  return function(_15_e_$u$172){
    var _15_inlinePat_$u$174 = function(_15_p_$u$195){
      var $phi$464 = _15_p_$u$195;
      var $phi$465 = undefined;
      if($phi$464.$tag==$$compiler$ast_jg$$PData.$tag){
        var $phi$466 = ((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))($phi$464.$1))(_15_always_$u$171);
        var $phi$467 = undefined;
        if(($phi$466.$tag==$$compiler$prelude_jg$$Just.$tag)&&($phi$466.$0.$tag==$$compiler$ast_jg$$Var.$tag)){
          $phi$467 = ((($$compiler$ast_jg$$PData($phi$464.$0))($phi$466.$0.$1))((map(_15_inlinePat_$u$174))($phi$464.$2)))
        } else $phi$467 = ((($$compiler$ast_jg$$PData($phi$464.$0))($phi$464.$1))((map(_15_inlinePat_$u$174))($phi$464.$2)));
        $phi$465 = $phi$467
      } else $phi$465 = _15_p_$u$195;
      return $phi$465
    };
    return (($$compiler$ast_jg$$breakableDownM($instance$Monad$11))(function($inl$_15_e_$u$175_$u$815){
      var $phi$468 = $inl$_15_e_$u$175_$u$815;
      var $phi$469 = undefined;
      if($phi$468.$tag==$$compiler$ast_jg$$Var.$tag){
        var $phi$486 = ((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))($phi$468.$1))(_15_always_$u$171);
        var $phi$487 = undefined;
        if($phi$486.$tag==$$compiler$prelude_jg$$Nothing.$tag){
          var $phi$490 = $instance$Monad$11;
          var $phi$491 = undefined;
          $phi$491 = $phi$490.$0;
          $phi$487 = ($phi$491($$compiler$prelude_jg$$Left($inl$_15_e_$u$175_$u$815)))
        } else if($phi$486.$tag==$$compiler$prelude_jg$$Just.$tag){
          var $phi$488 = $instance$Functor$9;
          var $phi$489 = undefined;
          $phi$489 = $phi$488.$0;
          $phi$487 = (($phi$489($$compiler$prelude_jg$$Left))((($$compiler$uniquifier_jg$$rewriteExpr("$inl$"))(empty))($phi$486.$0)))
        } else error("pattern match fail",$phi$486);
        $phi$469 = $phi$487
      } else if($phi$468.$tag==$$compiler$ast_jg$$Let.$tag){
        var $inl$_15_always2_$u$182_$u$822 = ((($$compiler$prelude_jg$$mergeTrie($instance$Hashable$13))($instance$Eq$1))(_15_always_$u$171))(($$compiler$inliner_jg$$chooseForInlining($$compiler$inliner_jg$$getCount($phi$468.$2)))($phi$468.$1));
        var $phi$476 = $instance$Monad$11;
        var $phi$477 = undefined;
        $phi$477 = $phi$476.$1;
        $phi$469 = (($phi$477((($$compiler$inliner_jg$$mapBindingsM($instance$Monad$11))(function($inl$_15_n_$u$183_$u$823){
          return function($inl$_15_e_$u$184_$u$824){
            return ($$compiler$inliner_jg$$inlineCode(((($$compiler$prelude_jg$$remove($instance$Hashable$13))($instance$Eq$1))($inl$_15_n_$u$183_$u$823))($inl$_15_always2_$u$182_$u$822)))($inl$_15_e_$u$184_$u$824)
          }
        }))($phi$468.$1)))(function($inl$_15_bs_$u$185_$u$825){
          var $phi$478 = $instance$Monad$11;
          var $phi$479 = undefined;
          $phi$479 = $phi$478.$1;
          return ($phi$479(($$compiler$inliner_jg$$inlineCode($inl$_15_always2_$u$182_$u$822))($phi$468.$2)))(function($inl$_15_e_$u$186_$u$826){
            var $phi$480 = length($inl$_15_bs_$u$185_$u$825);
            var $phi$481 = undefined;
            if(0==$phi$480){
              var $phi$484 = $instance$Monad$11;
              var $phi$485 = undefined;
              $phi$485 = $phi$484.$0;
              $phi$481 = ($phi$485($$compiler$prelude_jg$$Right($inl$_15_e_$u$186_$u$826)))
            } else {
              var $phi$482 = $instance$Monad$11;
              var $phi$483 = undefined;
              $phi$483 = $phi$482.$0;
              $phi$481 = ($phi$483($$compiler$prelude_jg$$Right((($$compiler$ast_jg$$Let($phi$468.$0))($inl$_15_bs_$u$185_$u$825))($inl$_15_e_$u$186_$u$826))))
            };
            return $phi$481
          })
        }))
      } else if($phi$468.$tag==$$compiler$ast_jg$$Case.$tag){
        var $phi$472 = $instance$Monad$11;
        var $phi$473 = undefined;
        $phi$473 = $phi$472.$0;
        $phi$469 = ($phi$473($$compiler$prelude_jg$$Left((($$compiler$ast_jg$$Case($phi$468.$0))($phi$468.$1))((map(function($inl$_15_p_$u$191_$u$831){
          var $phi$474 = $inl$_15_p_$u$191_$u$831;
          var $phi$475 = undefined;
          $phi$475 = (($$compiler$prelude_jg$$Pair(_15_inlinePat_$u$174($phi$474.$0)))($phi$474.$1));
          return $phi$475
        }))($phi$468.$2)))))
      } else {
        var $phi$470 = $instance$Monad$11;
        var $phi$471 = undefined;
        $phi$471 = $phi$470.$0;
        $phi$469 = ($phi$471($$compiler$prelude_jg$$Left($inl$_15_e_$u$175_$u$815)))
      };
      return $phi$469
    }))(_15_e_$u$172)
  }
};
var $$compiler$inliner_jg$$dropDeadBindings = function(_15_preserve_$u$203){
  return function(_15_useCount_$u$204){
    return function(_15_bs_$u$205){
      return (filter(function($inl$_15_b_$u$207_$u$858){
        var $phi$492 = $inl$_15_b_$u$207_$u$858;
        var $phi$493 = undefined;
        var $inl$_19_d_$u$17_$u$4633 = 0;
        var $inl$_15_totalCount_$u$210_$u$861 = (function($inl$_19_m_$u$18_$u$4634){
          var $phi$494 = $inl$_19_m_$u$18_$u$4634;
          var $phi$495 = undefined;
          if($phi$494.$tag==$$compiler$prelude_jg$$Just.$tag){
            $phi$495 = $phi$494.$0
          } else if($phi$494.$tag==$$compiler$prelude_jg$$Nothing.$tag){
            $phi$495 = 0
          } else error("pattern match fail",$phi$494);
          return $phi$495
        })(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))($phi$492.$0))(_15_useCount_$u$204));
        var $inl$_19_d_$u$17_$u$4636 = 0;
        var $inl$_15_recursiveCount_$u$211_$u$862 = (function($inl$_19_m_$u$18_$u$4637){
          var $phi$496 = $inl$_19_m_$u$18_$u$4637;
          var $phi$497 = undefined;
          if($phi$496.$tag==$$compiler$prelude_jg$$Just.$tag){
            $phi$497 = $phi$496.$0
          } else if($phi$496.$tag==$$compiler$prelude_jg$$Nothing.$tag){
            $phi$497 = 0
          } else error("pattern match fail",$phi$496);
          return $phi$497
        })(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))($phi$492.$0))($$compiler$inliner_jg$$getCount($phi$492.$1)));
        var $inl$_15_keep_$u$212_$u$863 = ($or((($$compiler$prelude_jg$$contains($instance$Eq$1))($phi$492.$0))(_15_preserve_$u$203)))((($$compiler$prelude_jg$$$gt($instance$Ord$2))($inl$_15_totalCount_$u$210_$u$861-$inl$_15_recursiveCount_$u$211_$u$862))(0));
        $phi$493 = $inl$_15_keep_$u$212_$u$863;
        return $phi$493
      }))(_15_bs_$u$205)
    }
  }
};
var $$compiler$inliner_jg$$mapBindings = function(_15_f_$u$62){
  return function(_15_bs_$u$63){
    return (map(function(_15_b_$u$64){
      var $phi$498 = _15_b_$u$64;
      var $phi$499 = undefined;
      $phi$499 = (($$compiler$prelude_jg$$Pair($phi$498.$0))(_15_f_$u$62($phi$498.$1)));
      return $phi$499
    }))(_15_bs_$u$63)
  }
};
var $$compiler$inliner_jg$$loopPasses = function(local$instance$Monad$0){
  return function(_15_n_$u$73){
    return function(_15_p_$u$74){
      return function(_15_bs_$u$75){
        var $phi$500 = _15_n_$u$73;
        var $phi$501 = undefined;
        if(0==$phi$500){
          var $phi$504 = local$instance$Monad$0;
          var $phi$505 = undefined;
          $phi$505 = $phi$504.$0;
          $phi$501 = ($phi$505(_15_bs_$u$75))
        } else {
          var $phi$502 = local$instance$Monad$0;
          var $phi$503 = undefined;
          $phi$503 = $phi$502.$1;
          $phi$501 = (($phi$503(_15_p_$u$74(_15_bs_$u$75)))((($$compiler$inliner_jg$$loopPasses(local$instance$Monad$0))(_15_n_$u$73-1))(_15_p_$u$74)))
        };
        return $phi$501
      }
    }
  }
};
var $$compiler$graph_jg$$dfs = function(_13_g_$u$0){
  return function(_13_visited_$u$1){
    return function(_13_v_$u$2){
      var _13_es_$u$4 = (filter(function(_13_v_$u$8){
        var $inl$_19_b_$u$44_$u$4761 = (($$compiler$prelude_jg$$contains($instance$Eq$1))(_13_v_$u$8))(_13_visited_$u$1);
        var $phi$506 = $inl$_19_b_$u$44_$u$4761;
        var $phi$507 = undefined;
        if($phi$506){
          $phi$507 = false
        } else if(!$phi$506){
          $phi$507 = true
        } else error("pattern match fail",$phi$506);
        return $phi$507
      }))((get(_13_v_$u$2))(_13_g_$u$0));
      var _13_r_$u$5 = ((foldr(function($inl$_13_r_$u$6_$u$1144){
        return function($inl$_13_e_$u$7_$u$1145){
          var $phi$508 = (($$compiler$prelude_jg$$contains($instance$Eq$1))($inl$_13_e_$u$7_$u$1145))($inl$_13_r_$u$6_$u$1144);
          var $phi$509 = undefined;
          if($phi$508){
            $phi$509 = $inl$_13_r_$u$6_$u$1144
          } else if(!$phi$508){
            $phi$509 = ((concat((($$compiler$graph_jg$$dfs(_13_g_$u$0))((push(_13_v_$u$2))((concat($inl$_13_r_$u$6_$u$1144))(_13_visited_$u$1))))($inl$_13_e_$u$7_$u$1145)))($inl$_13_r_$u$6_$u$1144))
          } else error("pattern match fail",$phi$508);
          return $phi$509
        }
      }))(emptyArray))(_13_es_$u$4);
      return (enqueue(_13_v_$u$2))(_13_r_$u$5)
    }
  }
};
var $$compiler$graph_jg$$fullDfs = function(_13_g_$u$9){
  var _13_result_$u$11 = ((foldRecord(function($inl$_13_result_$u$12_$u$1146){
    return function($inl$_13_v_$u$13_$u$1147){
      return function($inl$_13___$u$14_$u$1148){
        var $phi$510 = (($$compiler$prelude_jg$$contains($instance$Eq$1))($inl$_13_v_$u$13_$u$1147))($inl$_13_result_$u$12_$u$1146);
        var $phi$511 = undefined;
        if($phi$510){
          $phi$511 = $inl$_13_result_$u$12_$u$1146
        } else if(!$phi$510){
          $phi$511 = ((concat((($$compiler$graph_jg$$dfs(_13_g_$u$9))($inl$_13_result_$u$12_$u$1146))($inl$_13_v_$u$13_$u$1147)))($inl$_13_result_$u$12_$u$1146))
        } else error("pattern match fail",$phi$510);
        return $phi$511
      }
    }
  }))(emptyArray))(_13_g_$u$9);
  return _13_result_$u$11
};
var $$compiler$typer_jg$$instanceToTypeBound = function(_12_i_$u$532){
  var $phi$512 = _12_i_$u$532;
  var $phi$513 = undefined;
  $phi$513 = ((($$compiler$ast_jg$$TCBound($$compiler$prelude_jg$$Empty))($phi$512.$1))($phi$512.$2));
  return $phi$513
};
var $$compiler$typer_jg$$mkTForall = function(_12_ann_$u$168){
  return function(_12_vs_$u$169){
    return function(_12_bs_$u$170){
      return function(_12_t_$u$171){
        return ((($$compiler$ast_jg$$TForall(_12_ann_$u$168))(_12_vs_$u$169))(((foldl(function($inl$_12_bs_$u$173_$u$1326){
          return function($inl$_12_b_$u$174_$u$1327){
            var $phi$514 = ($$compiler$prelude_jg$$exists($$compiler$ast_jg$$equivBound($inl$_12_b_$u$174_$u$1327)))($inl$_12_bs_$u$173_$u$1326);
            var $phi$515 = undefined;
            if($phi$514){
              $phi$515 = $inl$_12_bs_$u$173_$u$1326
            } else if(!$phi$514){
              $phi$515 = ((push($inl$_12_b_$u$174_$u$1327))($inl$_12_bs_$u$173_$u$1326))
            } else error("pattern match fail",$phi$514);
            return $phi$515
          }
        }))(emptyArray))(_12_bs_$u$170)))(_12_t_$u$171)
      }
    }
  }
};
var $$compiler$typer_jg$$f1 = function(_12_a_$u$166){
  return function(_12_b_$u$167){
    return (($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))((($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("->")))(_12_a_$u$166)))(_12_b_$u$167)
  }
};
var $$compiler$typer_jg$$conTypes = function(_12_d_$u$625){
  var $phi$516 = _12_d_$u$625;
  var $phi$517 = undefined;
  var $inl$_12_tvs_$u$631_$u$1329 = $phi$516.$2;
  $phi$517 = ((map(function($inl$_12_c_$u$632_$u$1330){
    var $phi$518 = $inl$_12_c_$u$632_$u$1330;
    var $phi$519 = undefined;
    $phi$519 = (($$compiler$prelude_jg$$Pair($phi$518.$1))(((($$compiler$typer_jg$$mkTForall($$compiler$prelude_jg$$Empty))($inl$_12_tvs_$u$631_$u$1329))(emptyArray))(((foldr(function($inl$_12_b_$u$636_$u$1334){
      return function($inl$_12_a_$u$637_$u$1335){
        return ($$compiler$typer_jg$$f1($inl$_12_a_$u$637_$u$1335))($inl$_12_b_$u$636_$u$1334)
      }
    }))(((foldl(function($inl$_12_r_$u$638_$u$1336){
      return function($inl$_12_v_$u$639_$u$1337){
        return (($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))($inl$_12_r_$u$638_$u$1336))(($$compiler$ast_jg$$TVar($$compiler$prelude_jg$$Empty))($inl$_12_v_$u$639_$u$1337))
      }
    }))(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))($phi$516.$1)))($inl$_12_tvs_$u$631_$u$1329)))($phi$518.$2))));
    return $phi$519
  }))($phi$516.$3));
  return $phi$517
};
var $$compiler$typer_jg$$getTypedExports = function(_12_m_$u$640){
  var $phi$520 = _12_m_$u$640;
  var $phi$521 = undefined;
  var _12_et_$u$648 = ($$compiler$prelude_jg$$concatMap($$compiler$typer_jg$$conTypes))($phi$520.$3);
  var _12_ed_$u$649 = (map(function(_12_d_$u$651){
    var $inl$_19_p_$u$24_$u$4800 = _12_d_$u$651;
    var $phi$522 = _12_d_$u$651;
    var $phi$523 = undefined;
    $phi$523 = $phi$522.$0;
    var $inl$_19_p_$u$27_$u$4806 = _12_d_$u$651;
    var $phi$524 = _12_d_$u$651;
    var $phi$525 = undefined;
    $phi$525 = $phi$524.$1;
    var $inl$_18_e_$u$129_$u$4803 = $phi$525;
    var $inl$_19_f_$u$0_$u$4804 = $$compiler$ast_jg$$getAnnType;
    return ($$compiler$prelude_jg$$Pair($phi$523))((function($inl$_19_a_$u$1_$u$4805){
      return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$4805)
    })($$compiler$ast_jg$$annOf($inl$_18_e_$u$129_$u$4803)))
  }))($phi$520.$6);
  var _12_bs_$u$650 = ((foldl(function(_12_es_$u$652){
    return function(_12_e_$u$653){
      var $inl$_19_p_$u$24_$u$4809 = _12_e_$u$653;
      var $phi$526 = _12_e_$u$653;
      var $phi$527 = undefined;
      $phi$527 = $phi$526.$0;
      var $inl$_19_p_$u$27_$u$4812 = _12_e_$u$653;
      var $phi$528 = _12_e_$u$653;
      var $phi$529 = undefined;
      $phi$529 = $phi$528.$1;
      return ((set($phi$527))($phi$529))(_12_es_$u$652)
    }
  }))(empty))((concat(_12_et_$u$648))(_12_ed_$u$649));
  $phi$521 = ((($$compiler$ast_jg$$ModuleInterface(_12_bs_$u$650))($phi$520.$4))((map($$compiler$typer_jg$$instanceToTypeBound))($phi$520.$5)));
  return $phi$521
};
var $$compiler$typer_jg$$getSub = function(_12_v_$u$2){
  return function(_12_subs_$u$3){
    var $phi$530 = _12_subs_$u$3;
    var $phi$531 = undefined;
    var $phi$532 = $instance$Alternative$6;
    var $phi$533 = undefined;
    $phi$533 = $phi$532.$1;
    $phi$531 = (($phi$533(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$2))($phi$530.$0)))(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$2))($phi$530.$1)));
    return $phi$531
  }
};
var $$compiler$typer_jg$$applySubs = function(_12_subs_$u$201){
  return function(_12_t_$u$202){
    var $phi$534 = _12_t_$u$202;
    var $phi$535 = undefined;
    if($phi$534.$tag==$$compiler$ast_jg$$TForall.$tag){
      var $inl$_12_subs_$u$53_$u$1342 = _12_subs_$u$201;
      var $phi$538 = $inl$_12_subs_$u$53_$u$1342;
      var $phi$539 = undefined;
      $phi$539 = (($$compiler$typer_jg$$Subs(((foldl(function($inl$_12_r_$u$56_$u$1345){
        return function($inl$_12_v_$u$57_$u$1346){
          return ((($$compiler$prelude_jg$$remove($instance$Hashable$13))($instance$Eq$1))($inl$_12_v_$u$57_$u$1346))($inl$_12_r_$u$56_$u$1345)
        }
      }))($phi$538.$0))($phi$534.$1)))(((foldl(function($inl$_12_r_$u$58_$u$1347){
        return function($inl$_12_v_$u$59_$u$1348){
          return ((($$compiler$prelude_jg$$remove($instance$Hashable$13))($instance$Eq$1))($inl$_12_v_$u$59_$u$1348))($inl$_12_r_$u$58_$u$1347)
        }
      }))($phi$538.$1))($phi$534.$1)));
      var _12_subs2_$u$207 = $phi$539;
      $phi$535 = (((($$compiler$typer_jg$$mkTForall($phi$534.$0))($phi$534.$1))((map($$compiler$typer_jg$$applySubsBound(_12_subs2_$u$207)))($phi$534.$2)))(($$compiler$typer_jg$$applySubs(_12_subs2_$u$207))($phi$534.$3)))
    } else if($phi$534.$tag==$$compiler$ast_jg$$TVar.$tag){
      var $phi$536 = ($$compiler$typer_jg$$getSub($phi$534.$1))(_12_subs_$u$201);
      var $phi$537 = undefined;
      if($phi$536.$tag==$$compiler$prelude_jg$$Nothing.$tag){
        $phi$537 = _12_t_$u$202
      } else if($phi$536.$tag==$$compiler$prelude_jg$$Just.$tag){
        $phi$537 = $phi$536.$0
      } else error("pattern match fail",$phi$536);
      $phi$535 = $phi$537
    } else if($phi$534.$tag==$$compiler$ast_jg$$TApp.$tag){
      $phi$535 = ((($$compiler$ast_jg$$TApp($phi$534.$0))(($$compiler$typer_jg$$applySubs(_12_subs_$u$201))($phi$534.$1)))(($$compiler$typer_jg$$applySubs(_12_subs_$u$201))($phi$534.$2)))
    } else $phi$535 = _12_t_$u$202;
    return $phi$535
  }
};
var $$compiler$typer_jg$$applySubsBound = function(_12_subs_$u$215){
  return function(_12_b_$u$216){
    var $phi$540 = _12_b_$u$216;
    var $phi$541 = undefined;
    $phi$541 = ((($$compiler$ast_jg$$TCBound($phi$540.$0))($phi$540.$1))(($$compiler$typer_jg$$applySubs(_12_subs_$u$215))($phi$540.$2)));
    return $phi$541
  }
};
var $$compiler$typer_jg$$applySubsE = function(_12_subs_$u$457){
  return function(_12_e_$u$458){
    var $inl$_18_f_$u$178_$u$4818 = function($inl$_12_a_$u$460_$u$1349){
      return function($inl$_12_e_$u$461_$u$1350){
        var $inl$_18_e_$u$129_$u$4819 = $inl$_12_e_$u$461_$u$1350;
        var $inl$_19_f_$u$0_$u$4820 = $$compiler$ast_jg$$getAnnType;
        var $inl$_12_t2_$u$462_$u$1351 = ($$compiler$typer_jg$$applySubs(_12_subs_$u$457))((function($inl$_19_a_$u$1_$u$4821){
          return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$4821)
        })($$compiler$ast_jg$$annOf($inl$_12_e_$u$461_$u$1350)));
        return ($$compiler$prelude_jg$$Pair($inl$_12_a_$u$460_$u$1349))(($$compiler$ast_jg$$setType($inl$_12_t2_$u$462_$u$1351))($inl$_12_e_$u$461_$u$1350))
      }
    };
    var $inl$_19_p_$u$27_$u$4815 = ((($$compiler$ast_jg$$downAndUp(function($inl$$inl$_12_a_$u$460_$u$1349_$u$5782){
      return function($inl$$inl$_12_e_$u$461_$u$1350_$u$5783){
        var $inl$$inl$_18_e_$u$129_$u$4819_$u$5785 = $inl$$inl$_12_e_$u$461_$u$1350_$u$5783;
        var $inl$$inl$_19_f_$u$0_$u$4820_$u$5786 = $$compiler$ast_jg$$getAnnType;
        var $inl$$inl$_12_t2_$u$462_$u$1351_$u$5784 = ($$compiler$typer_jg$$applySubs(_12_subs_$u$457))((function($inl$$inl$_19_a_$u$1_$u$4821_$u$5787){
          return $$compiler$ast_jg$$getAnnType($inl$$inl$_19_a_$u$1_$u$4821_$u$5787)
        })($$compiler$ast_jg$$annOf($inl$$inl$_12_e_$u$461_$u$1350_$u$5783)));
        return ($$compiler$prelude_jg$$Pair($inl$$inl$_12_a_$u$460_$u$1349_$u$5782))(($$compiler$ast_jg$$setType($inl$$inl$_12_t2_$u$462_$u$1351_$u$5784))($inl$$inl$_12_e_$u$461_$u$1350_$u$5783))
      }
    }))($$compiler$prelude_jg$$Pair))(true))(_12_e_$u$458);
    var $phi$542 = $inl$_19_p_$u$27_$u$4815;
    var $phi$543 = undefined;
    $phi$543 = $phi$542.$1;
    return $phi$543
  }
};
var $$compiler$typer_jg$$freeVars = function(_12_e_$u$463){
  var _12_namesInPat_$u$466 = function(_12_p_$u$476){
    var $phi$544 = _12_p_$u$476;
    var $phi$545 = undefined;
    if($phi$544.$tag==$$compiler$ast_jg$$PVar.$tag){
      var $inl$_19_x_$u$103_$u$4822 = $phi$544.$1;
      $phi$545 = ((push($phi$544.$1))(emptyArray))
    } else if($phi$544.$tag==$$compiler$ast_jg$$PConst.$tag){
      $phi$545 = emptyArray
    } else if($phi$544.$tag==$$compiler$ast_jg$$PData.$tag){
      $phi$545 = (((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))(emptyArray))((map(_12_namesInPat_$u$466))($phi$544.$2)))
    } else error("pattern match fail",$phi$544);
    return $phi$545
  };
  var _12_freeVarsInPData_$u$465 = function(_12_p_$u$471){
    var $phi$546 = _12_p_$u$471;
    var $phi$547 = undefined;
    if($phi$546.$tag==$$compiler$ast_jg$$PData.$tag){
      var $inl$_19_x_$u$103_$u$4823 = $phi$546.$1;
      $phi$547 = (((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))((push($phi$546.$1))(emptyArray)))((map(_12_freeVarsInPData_$u$465))($phi$546.$2)))
    } else $phi$547 = emptyArray;
    return $phi$547
  };
  var $phi$548 = _12_e_$u$463;
  var $phi$549 = undefined;
  if($phi$548.$tag==$$compiler$ast_jg$$Var.$tag){
    var $inl$_19_x_$u$103_$u$4824 = $phi$548.$1;
    $phi$549 = ((push($phi$548.$1))(emptyArray))
  } else if($phi$548.$tag==$$compiler$ast_jg$$Const.$tag){
    $phi$549 = emptyArray
  } else if($phi$548.$tag==$$compiler$ast_jg$$App.$tag){
    $phi$549 = (((($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1))($$compiler$typer_jg$$freeVars($phi$548.$1)))($$compiler$typer_jg$$freeVars($phi$548.$2)))
  } else if($phi$548.$tag==$$compiler$ast_jg$$Lam.$tag){
    $phi$549 = ((filter(function(_12_v_$u$494){
      return (($$compiler$prelude_jg$$$div$eq($instance$Eq$1))(_12_v_$u$494))($phi$548.$1)
    }))($$compiler$typer_jg$$freeVars($phi$548.$2)))
  } else if($phi$548.$tag==$$compiler$ast_jg$$Case.$tag){
    $phi$549 = (((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))($$compiler$typer_jg$$freeVars($phi$548.$1)))((map(function($inl$_12_p_$u$467_$u$1363){
      var $phi$556 = $inl$_12_p_$u$467_$u$1363;
      var $phi$557 = undefined;
      $phi$557 = (((($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1))((filter(function($inl$_12_v_$u$470_$u$1366){
        var $inl$_19_b_$u$44_$u$4825 = (($$compiler$prelude_jg$$contains($instance$Eq$1))($inl$_12_v_$u$470_$u$1366))(_12_namesInPat_$u$466($phi$556.$0));
        var $phi$558 = $inl$_19_b_$u$44_$u$4825;
        var $phi$559 = undefined;
        if($phi$558){
          $phi$559 = false
        } else if(!$phi$558){
          $phi$559 = true
        } else error("pattern match fail",$phi$558);
        return $phi$559
      }))($$compiler$typer_jg$$freeVars($phi$556.$1))))(_12_freeVarsInPData_$u$465($phi$556.$0)));
      return $phi$557
    }))($phi$548.$2)))
  } else if($phi$548.$tag==$$compiler$ast_jg$$Let.$tag){
    $phi$549 = ((filter(function(_12_v_$u$501){
      var $inl$_19_b_$u$44_$u$4826 = (($$compiler$prelude_jg$$contains($instance$Eq$1))(_12_v_$u$501))((map(function($inl$_19_p_$u$24_$u$4827){
        var $phi$550 = $inl$_19_p_$u$24_$u$4827;
        var $phi$551 = undefined;
        $phi$551 = $phi$550.$0;
        return $phi$551
      }))($phi$548.$1));
      var $phi$552 = $inl$_19_b_$u$44_$u$4826;
      var $phi$553 = undefined;
      if($phi$552){
        $phi$553 = false
      } else if(!$phi$552){
        $phi$553 = true
      } else error("pattern match fail",$phi$552);
      return $phi$553
    }))(((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))($$compiler$typer_jg$$freeVars($phi$548.$2)))((map(function(_12_d_$u$502){
      var $inl$_19_p_$u$27_$u$4830 = _12_d_$u$502;
      var $phi$554 = _12_d_$u$502;
      var $phi$555 = undefined;
      $phi$555 = $phi$554.$1;
      return $$compiler$typer_jg$$freeVars($phi$555)
    }))($phi$548.$1))))
  } else error("pattern match fail",$phi$548);
  return $phi$549
};
var $phi$560 = $instance$Monad$11;
var $phi$561 = undefined;
$phi$561 = $phi$560.$1;
var $$compiler$typer_jg$$newTVarM = ($phi$561($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$66){
  var $phi$562 = _12_ctx_$u$66;
  var $phi$563 = undefined;
  var _12_n_$u$71 = ($concat("$"))(intToString($phi$562.$2));
  var $inl$_19_s_$u$143_$u$4833 = ((($$compiler$typer_jg$$ICtx($phi$562.$0))($phi$562.$1))($phi$562.$2+1))($phi$562.$3);
  var $phi$564 = $instance$Monad$11;
  var $phi$565 = undefined;
  $phi$565 = $phi$564.$0;
  $phi$563 = ((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$4834){
    return ($$compiler$prelude_jg$$Pair($inl$_19_s_$u$143_$u$4833))($$compiler$prelude_jg$$Unit)
  })))($phi$565(($$compiler$ast_jg$$TVar($$compiler$prelude_jg$$Empty))(_12_n_$u$71))));
  return $phi$563
});
var $$compiler$typer_jg$$errorM = function(_12_s_$u$101){
  var $phi$566 = $instance$Monad$11;
  var $phi$567 = undefined;
  $phi$567 = $phi$566.$1;
  return ($phi$567($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$102){
    var $phi$568 = _12_ctx_$u$102;
    var $phi$569 = undefined;
    $phi$569 = (error($phi$568.$3(_12_s_$u$101)));
    return $phi$569
  })
};
var $$compiler$typer_jg$$getSafe = function(_12_k_$u$0){
  return function(_12_r_$u$1){
    var $phi$570 = (has(_12_k_$u$0))(_12_r_$u$1);
    var $phi$571 = undefined;
    if(!$phi$570){
      $phi$571 = (error(($concat(($concat(($concat("no "))(_12_k_$u$0)))(" in record ")))(jsonStringify(_12_r_$u$1))))
    } else if($phi$570){
      $phi$571 = ((get(_12_k_$u$0))(_12_r_$u$1))
    } else error("pattern match fail",$phi$570);
    return $phi$571
  }
};
var $$compiler$typer_jg$$getBinding = function(_12_n_$u$122){
  return function(_12_env_$u$123){
    var $phi$572 = _12_env_$u$123;
    var $phi$573 = undefined;
    $phi$573 = (($$compiler$typer_jg$$getSafe(_12_n_$u$122))($phi$572.$0));
    return $phi$573
  }
};
var $$compiler$typer_jg$$getBindingM = function(_12_n_$u$127){
  return function(_12_env_$u$128){
    var $phi$574 = $instance$Monad$11;
    var $phi$575 = undefined;
    $phi$575 = $phi$574.$1;
    return ($phi$575($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$129){
      var $phi$576 = $instance$Monad$11;
      var $phi$577 = undefined;
      $phi$577 = $phi$576.$0;
      var $inl$_19_f_$u$0_$u$4835 = $phi$577;
      var $phi$578 = _12_ctx_$u$129;
      var $phi$579 = undefined;
      $phi$579 = $phi$578.$0;
      return (function($inl$_19_a_$u$1_$u$4836){
        return $inl$_19_f_$u$0_$u$4835($inl$_19_a_$u$1_$u$4836)
      })(($$compiler$typer_jg$$applySubs($phi$579))(($$compiler$typer_jg$$getBinding(_12_n_$u$127))(_12_env_$u$128)))
    })
  }
};
var $$compiler$typer_jg$$hasBinding = function(_12_n_$u$134){
  return function(_12_env_$u$135){
    var $phi$580 = _12_env_$u$135;
    var $phi$581 = undefined;
    $phi$581 = ((has(_12_n_$u$134))($phi$580.$0));
    return $phi$581
  }
};
var $$compiler$typer_jg$$freeTVars = function(_12_t_$u$257){
  var $phi$582 = _12_t_$u$257;
  var $phi$583 = undefined;
  if($phi$582.$tag==$$compiler$ast_jg$$TVar.$tag){
    $phi$583 = (((($$compiler$prelude_jg$$setAdd($instance$Hashable$13))($instance$Eq$1))($phi$582.$1))($$compiler$prelude_jg$$Empty))
  } else if($phi$582.$tag==$$compiler$ast_jg$$TBot.$tag){
    $phi$583 = $$compiler$prelude_jg$$Empty
  } else if($phi$582.$tag==$$compiler$ast_jg$$TUnknown.$tag){
    $phi$583 = $$compiler$prelude_jg$$Empty
  } else if($phi$582.$tag==$$compiler$ast_jg$$TConst.$tag){
    $phi$583 = $$compiler$prelude_jg$$Empty
  } else if($phi$582.$tag==$$compiler$ast_jg$$TForall.$tag){
    var $inl$local$instance$Hashable$1_$u$4839 = $instance$Hashable$13;
    $phi$583 = (((foldl(function(_12_s_$u$266){
      return function(_12_v_$u$267){
        var $inl$local$instance$Hashable$1_$u$4837 = $instance$Hashable$13;
        return (((function($inl$local$instance$Eq$0_$u$4838){
          return ($$compiler$prelude_jg$$remove($instance$Hashable$13))($inl$local$instance$Eq$0_$u$4838)
        })($instance$Eq$1))(_12_v_$u$267))(_12_s_$u$266)
      }
    }))(((foldl((function($inl$local$instance$Eq$0_$u$4840){
      return ($$compiler$prelude_jg$$mergeTrie($instance$Hashable$13))($inl$local$instance$Eq$0_$u$4840)
    })($instance$Eq$1)))($$compiler$typer_jg$$freeTVars($phi$582.$3)))((map($$compiler$typer_jg$$freeTVarsInBound))($phi$582.$2))))($phi$582.$1))
  } else if($phi$582.$tag==$$compiler$ast_jg$$TApp.$tag){
    var $inl$local$instance$Hashable$1_$u$4841 = $instance$Hashable$13;
    $phi$583 = ((((function($inl$local$instance$Eq$0_$u$4842){
      return ($$compiler$prelude_jg$$mergeTrie($instance$Hashable$13))($inl$local$instance$Eq$0_$u$4842)
    })($instance$Eq$1))($$compiler$typer_jg$$freeTVars($phi$582.$1)))($$compiler$typer_jg$$freeTVars($phi$582.$2)))
  } else error("pattern match fail",$phi$582);
  return $phi$583
};
var $$compiler$typer_jg$$freeTVarsInBound = function(_12_b_$u$271){
  var $phi$584 = _12_b_$u$271;
  var $phi$585 = undefined;
  $phi$585 = ($$compiler$typer_jg$$freeTVars($phi$584.$2));
  return $phi$585
};
var $$compiler$typer_jg$$addBinding = function(_12_n_$u$139){
  return function(_12_t_$u$140){
    return function(_12_env_$u$141){
      var $phi$586 = _12_env_$u$141;
      var $phi$587 = undefined;
      var $inl$local$instance$Hashable$1_$u$4843 = $instance$Hashable$13;
      $phi$587 = ((($$compiler$typer_jg$$IEnv(((set(_12_n_$u$139))(_12_t_$u$140))($phi$586.$0)))($phi$586.$1))((((function($inl$local$instance$Eq$0_$u$4844){
        return ($$compiler$prelude_jg$$mergeTrie($instance$Hashable$13))($inl$local$instance$Eq$0_$u$4844)
      })($instance$Eq$1))($phi$586.$2))($$compiler$typer_jg$$freeTVars(_12_t_$u$140))));
      return $phi$587
    }
  }
};
var $$compiler$typer_jg$$emptySubs = ($$compiler$typer_jg$$Subs($$compiler$prelude_jg$$Empty))($$compiler$prelude_jg$$Empty);
var $$compiler$typer_jg$$composeSubs = function(_12_ef_$u$6){
  return function(_12_sa_$u$7){
    return function(_12_sb_$u$8){
      var $phi$588 = _12_sb_$u$8;
      var $phi$589 = undefined;
      $phi$589 = ((($$compiler$prelude_jg$$foldTrie(function(_12_r_$u$11){
        return function(_12_v_$u$12){
          return function(_12_t_$u$13){
            return ((($$compiler$typer_jg$$addSub(_12_ef_$u$6))(_12_v_$u$12))(_12_t_$u$13))(_12_r_$u$11)
          }
        }
      }))((($$compiler$prelude_jg$$foldTrie(function(_12_r_$u$14){
        return function(_12_v_$u$15){
          return function(_12_t_$u$16){
            var $inl$_12_v_$u$36_$u$1388 = _12_v_$u$15;
            return ((function($inl$_12_t_$u$37_$u$1389){
              return function($inl$_12_subs_$u$38_$u$1390){
                var $phi$590 = ($$compiler$typer_jg$$getSub($inl$_12_v_$u$36_$u$1388))($inl$_12_subs_$u$38_$u$1390);
                var $phi$591 = undefined;
                if($phi$590.$tag==$$compiler$prelude_jg$$Nothing.$tag){
                  var $phi$592 = $inl$_12_subs_$u$38_$u$1390;
                  var $phi$593 = undefined;
                  var $inl$$inl$local$instance$Hashable$1_$u$1397_$u$4847 = $instance$Hashable$13;
                  var $inl$_12_su_$u$42_$u$1394 = (($$compiler$prelude_jg$$foldTrie((function($inl$$inl$local$instance$Eq$0_$u$1398_$u$4848){
                    return function($inl$$inl$_12_su_$u$45_$u$1399_$u$4849){
                      return function($inl$$inl$_12_uv_$u$46_$u$1400_$u$4850){
                        return function($inl$$inl$_12_ut_$u$47_$u$1401_$u$4851){
                          var $phi$594 = $inl$$inl$_12_su_$u$45_$u$1399_$u$4849;
                          var $phi$595 = undefined;
                          var $inl$$inl$_12_ut2_$u$50_$u$1404_$u$4854 = (($$compiler$typer_jg$$substitute($inl$_12_v_$u$36_$u$1388))($inl$_12_t_$u$37_$u$1389))($inl$$inl$_12_ut_$u$47_$u$1401_$u$4851);
                          var $inl$_19_t_$u$242_$u$4855 = $$compiler$typer_jg$$freeTVars($inl$$inl$_12_ut2_$u$50_$u$1404_$u$4854);
                          var $phi$598 = $inl$_19_t_$u$242_$u$4855;
                          var $phi$599 = undefined;
                          if($phi$598.$tag==$$compiler$prelude_jg$$Empty.$tag){
                            $phi$599 = true
                          } else $phi$599 = false;
                          var $phi$596 = $phi$599;
                          var $phi$597 = undefined;
                          if($phi$596){
                            $phi$597 = (($$compiler$prelude_jg$$Pair((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($inl$$inl$local$instance$Eq$0_$u$1398_$u$4848))($inl$$inl$_12_uv_$u$46_$u$1400_$u$4850))($inl$$inl$_12_ut2_$u$50_$u$1404_$u$4854))($phi$594.$0)))($phi$594.$1))
                          } else if(!$phi$596){
                            $phi$597 = (($$compiler$prelude_jg$$Pair($phi$594.$0))((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($inl$$inl$local$instance$Eq$0_$u$1398_$u$4848))($inl$$inl$_12_uv_$u$46_$u$1400_$u$4850))($inl$$inl$_12_ut2_$u$50_$u$1404_$u$4854))($phi$594.$1)))
                          } else error("pattern match fail",$phi$596);
                          $phi$595 = $phi$597;
                          return $phi$595
                        }
                      }
                    }
                  })($instance$Eq$1)))(($$compiler$prelude_jg$$Pair($phi$592.$0))($$compiler$prelude_jg$$Empty)))($phi$592.$1);
                  var $inl$_19_p_$u$27_$u$4857 = $inl$_12_su_$u$42_$u$1394;
                  var $phi$600 = $inl$_12_su_$u$42_$u$1394;
                  var $phi$601 = undefined;
                  $phi$601 = $phi$600.$1;
                  var $inl$_12_unsat2_$u$44_$u$1395 = $phi$601;
                  var $inl$_19_p_$u$24_$u$4860 = $inl$_12_su_$u$42_$u$1394;
                  var $phi$602 = $inl$_12_su_$u$42_$u$1394;
                  var $phi$603 = undefined;
                  $phi$603 = $phi$602.$0;
                  var $inl$_12_sat2_$u$43_$u$1396 = $phi$603;
                  $phi$593 = (($$compiler$typer_jg$$Subs((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))($inl$_12_v_$u$36_$u$1388))($inl$_12_t_$u$37_$u$1389))($inl$_12_sat2_$u$43_$u$1396)))($inl$_12_unsat2_$u$44_$u$1395));
                  $phi$591 = $phi$593
                } else if($phi$590.$tag==$$compiler$prelude_jg$$Just.$tag){
                  $phi$591 = ((($$compiler$typer_jg$$composeSubs(_12_ef_$u$6))($inl$_12_subs_$u$38_$u$1390))((($$compiler$typer_jg$$unify(_12_ef_$u$6))($phi$590.$0))($inl$_12_t_$u$37_$u$1389)))
                } else error("pattern match fail",$phi$590);
                return $phi$591
              }
            })(_12_t_$u$16))(_12_r_$u$14)
          }
        }
      }))(_12_sa_$u$7))($phi$588.$0)))($phi$588.$1));
      return $phi$589
    }
  }
};
var $$compiler$typer_jg$$addSub = function(_12_ef_$u$17){
  return function(_12_v_$u$18){
    return function(_12_t_$u$19){
      return function(_12_subs_$u$20){
        var _12_t2_$u$21 = ($$compiler$typer_jg$$applySubs(_12_subs_$u$20))(_12_t_$u$19);
        var $phi$604 = ($$compiler$typer_jg$$getSub(_12_v_$u$18))(_12_subs_$u$20);
        var $phi$605 = undefined;
        if($phi$604.$tag==$$compiler$prelude_jg$$Nothing.$tag){
          var $phi$606 = _12_subs_$u$20;
          var $phi$607 = undefined;
          var $inl$local$instance$Eq$0_$u$1407 = $instance$Eq$1;
          var _12_su_$u$25 = (($$compiler$prelude_jg$$foldTrie(function($inl$_12_su_$u$28_$u$1408){
            return function($inl$_12_uv_$u$29_$u$1409){
              return function($inl$_12_ut_$u$30_$u$1410){
                var $phi$608 = $inl$_12_su_$u$28_$u$1408;
                var $phi$609 = undefined;
                var $inl$_12_ut2_$u$33_$u$1413 = (($$compiler$typer_jg$$substitute(_12_v_$u$18))(_12_t2_$u$21))($inl$_12_ut_$u$30_$u$1410);
                var $inl$_19_t_$u$242_$u$4863 = $$compiler$typer_jg$$freeTVars($inl$_12_ut2_$u$33_$u$1413);
                var $phi$612 = $inl$_19_t_$u$242_$u$4863;
                var $phi$613 = undefined;
                if($phi$612.$tag==$$compiler$prelude_jg$$Empty.$tag){
                  $phi$613 = true
                } else $phi$613 = false;
                var $phi$610 = $phi$613;
                var $phi$611 = undefined;
                if($phi$610){
                  $phi$611 = (($$compiler$prelude_jg$$Pair((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($inl$local$instance$Eq$0_$u$1407))($inl$_12_uv_$u$29_$u$1409))($inl$_12_ut2_$u$33_$u$1413))($phi$608.$0)))($phi$608.$1))
                } else if(!$phi$610){
                  $phi$611 = (($$compiler$prelude_jg$$Pair($phi$608.$0))((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($inl$local$instance$Eq$0_$u$1407))($inl$_12_uv_$u$29_$u$1409))($inl$_12_ut2_$u$33_$u$1413))($phi$608.$1)))
                } else error("pattern match fail",$phi$610);
                $phi$609 = $phi$611;
                return $phi$609
              }
            }
          }))(($$compiler$prelude_jg$$Pair($phi$606.$0))($$compiler$prelude_jg$$Empty)))($phi$606.$1);
          var $inl$_19_p_$u$27_$u$4865 = _12_su_$u$25;
          var $phi$614 = _12_su_$u$25;
          var $phi$615 = undefined;
          $phi$615 = $phi$614.$1;
          var _12_unsat2_$u$27 = $phi$615;
          var $inl$_19_p_$u$24_$u$4868 = _12_su_$u$25;
          var $phi$616 = _12_su_$u$25;
          var $phi$617 = undefined;
          $phi$617 = $phi$616.$0;
          var _12_sat2_$u$26 = $phi$617;
          var $inl$_19_t_$u$242_$u$4871 = $$compiler$typer_jg$$freeTVars(_12_t2_$u$21);
          var $phi$620 = $inl$_19_t_$u$242_$u$4871;
          var $phi$621 = undefined;
          if($phi$620.$tag==$$compiler$prelude_jg$$Empty.$tag){
            $phi$621 = true
          } else $phi$621 = false;
          var $phi$618 = $phi$621;
          var $phi$619 = undefined;
          if($phi$618){
            $phi$619 = (($$compiler$typer_jg$$Subs((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$18))(_12_t2_$u$21))(_12_sat2_$u$26)))(_12_unsat2_$u$27))
          } else if(!$phi$618){
            $phi$619 = (($$compiler$typer_jg$$Subs(_12_sat2_$u$26))((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$18))(_12_t2_$u$21))(_12_unsat2_$u$27)))
          } else error("pattern match fail",$phi$618);
          $phi$607 = $phi$619;
          $phi$605 = $phi$607
        } else if($phi$604.$tag==$$compiler$prelude_jg$$Just.$tag){
          $phi$605 = ((($$compiler$typer_jg$$composeSubs(_12_ef_$u$17))(_12_subs_$u$20))((($$compiler$typer_jg$$unify(_12_ef_$u$17))($phi$604.$0))(_12_t2_$u$21)))
        } else error("pattern match fail",$phi$604);
        return $phi$605
      }
    }
  }
};
var $$compiler$typer_jg$$substitute = function(_12_n_$u$197){
  return function(_12_s_$u$198){
    return function(_12_t_$u$199){
      return ($$compiler$typer_jg$$applySubs(((($$compiler$typer_jg$$addSub(function(_12_s_$u$200){
        return ($concat("substitute: "))(_12_s_$u$200)
      }))(_12_n_$u$197))(_12_s_$u$198))($$compiler$typer_jg$$emptySubs)))(_12_t_$u$199)
    }
  }
};
var $$compiler$typer_jg$$unify = function(_12_ef_$u$224){
  return function(_12_a_$u$225){
    return function(_12_b_$u$226){
      var _12_err_$u$228 = function(_12_a_$u$234){
        return function(_12_b_$u$235){
          return error(_12_ef_$u$224(($concat(($concat(($concat("cannot unify "))($$compiler$printer_jg$$printType(_12_a_$u$234))))(" with ")))($$compiler$printer_jg$$printType(_12_b_$u$235))))
        }
      };
      var _12_bind_$u$227 = function(_12_n_$u$229){
        return function(_12_t_$u$230){
          var $phi$622 = _12_t_$u$230;
          var $phi$623 = undefined;
          if($phi$622.$tag==$$compiler$ast_jg$$TVar.$tag){
            var $phi$628 = $instance$Eq$1;
            var $phi$629 = undefined;
            $phi$629 = $phi$628.$0;
            var $phi$626 = ($phi$629(_12_n_$u$229))($phi$622.$1);
            var $phi$627 = undefined;
            if($phi$626){
              $phi$627 = $$compiler$typer_jg$$emptySubs
            } else if(!$phi$626){
              $phi$627 = (((($$compiler$typer_jg$$addSub(_12_ef_$u$224))(_12_n_$u$229))(_12_t_$u$230))($$compiler$typer_jg$$emptySubs))
            } else error("pattern match fail",$phi$626);
            $phi$623 = $phi$627
          } else {
            var $phi$624 = ((($$compiler$prelude_jg$$setContains($instance$Hashable$13))($instance$Eq$1))(_12_n_$u$229))($$compiler$typer_jg$$freeTVars(_12_t_$u$230));
            var $phi$625 = undefined;
            if($phi$624){
              $phi$625 = (error(_12_ef_$u$224("occurs check failed")))
            } else if(!$phi$624){
              $phi$625 = (((($$compiler$typer_jg$$addSub(_12_ef_$u$224))(_12_n_$u$229))(_12_t_$u$230))($$compiler$typer_jg$$emptySubs))
            } else error("pattern match fail",$phi$624);
            $phi$623 = $phi$625
          };
          return $phi$623
        }
      };
      var $phi$630 = _12_a_$u$225;
      var $phi$631 = undefined;
      if($phi$630.$tag==$$compiler$ast_jg$$TVar.$tag){
        $phi$631 = ((_12_bind_$u$227($phi$630.$1))(_12_b_$u$226))
      } else if($phi$630.$tag==$$compiler$ast_jg$$TConst.$tag){
        var $phi$634 = _12_b_$u$226;
        var $phi$635 = undefined;
        if($phi$634.$tag==$$compiler$ast_jg$$TConst.$tag){
          var $phi$638 = $instance$Eq$1;
          var $phi$639 = undefined;
          $phi$639 = $phi$638.$0;
          var $phi$636 = ($phi$639($phi$630.$1))($phi$634.$1);
          var $phi$637 = undefined;
          if($phi$636){
            $phi$637 = $$compiler$typer_jg$$emptySubs
          } else if(!$phi$636){
            $phi$637 = ((_12_err_$u$228(_12_a_$u$225))(_12_b_$u$226))
          } else error("pattern match fail",$phi$636);
          $phi$635 = $phi$637
        } else if($phi$634.$tag==$$compiler$ast_jg$$TVar.$tag){
          $phi$635 = ((_12_bind_$u$227($phi$634.$1))(_12_a_$u$225))
        } else $phi$635 = ((_12_err_$u$228(_12_a_$u$225))(_12_b_$u$226));
        $phi$631 = $phi$635
      } else if($phi$630.$tag==$$compiler$ast_jg$$TUnknown.$tag){
        $phi$631 = ((_12_err_$u$228(_12_a_$u$225))(_12_b_$u$226))
      } else if($phi$630.$tag==$$compiler$ast_jg$$TBot.$tag){
        $phi$631 = ((_12_err_$u$228(_12_a_$u$225))(_12_b_$u$226))
      } else if($phi$630.$tag==$$compiler$ast_jg$$TApp.$tag){
        var $phi$632 = _12_b_$u$226;
        var $phi$633 = undefined;
        if($phi$632.$tag==$$compiler$ast_jg$$TVar.$tag){
          $phi$633 = ((_12_bind_$u$227($phi$632.$1))(_12_a_$u$225))
        } else if($phi$632.$tag==$$compiler$ast_jg$$TApp.$tag){
          var _12_fsubs_$u$253 = (($$compiler$typer_jg$$unify(_12_ef_$u$224))($phi$630.$1))($phi$632.$1);
          var _12_xsubs_$u$254 = (($$compiler$typer_jg$$unify(_12_ef_$u$224))(($$compiler$typer_jg$$applySubs(_12_fsubs_$u$253))($phi$630.$2)))(($$compiler$typer_jg$$applySubs(_12_fsubs_$u$253))($phi$632.$2));
          $phi$633 = ((($$compiler$typer_jg$$composeSubs(_12_ef_$u$224))(_12_fsubs_$u$253))(_12_xsubs_$u$254))
        } else $phi$633 = ((_12_err_$u$228(_12_a_$u$225))(_12_b_$u$226));
        $phi$631 = $phi$633
      } else $phi$631 = ((_12_err_$u$228(_12_a_$u$225))(_12_b_$u$226));
      return $phi$631
    }
  }
};
var $$compiler$typer_jg$$instantiate = function(_12_t_$u$175){
  var $phi$640 = $instance$Monad$11;
  var $phi$641 = undefined;
  $phi$641 = $phi$640.$1;
  return ($phi$641($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$176){
    var $phi$642 = _12_t_$u$175;
    var $phi$643 = undefined;
    if($phi$642.$tag==$$compiler$ast_jg$$TForall.$tag){
      var $phi$646 = ((foldl(function($inl$_12_cs_$u$178_$u$1435){
        return function($inl$_12_v_$u$179_$u$1436){
          var $phi$648 = $inl$_12_cs_$u$178_$u$1435;
          var $phi$649 = undefined;
          var $phi$652 = $phi$648.$0;
          var $phi$653 = undefined;
          var $inl$_12_n_$u$65_$u$1447 = ($concat("$"))(intToString($phi$652.$2));
          $phi$653 = (($$compiler$prelude_jg$$Pair(((($$compiler$typer_jg$$ICtx($phi$652.$0))($phi$652.$1))($phi$652.$2+1))($phi$652.$3)))(($$compiler$ast_jg$$TVar($$compiler$prelude_jg$$Empty))($inl$_12_n_$u$65_$u$1447)));
          var $phi$650 = $phi$653;
          var $phi$651 = undefined;
          $phi$651 = (($$compiler$prelude_jg$$Pair($phi$650.$0))(((($$compiler$typer_jg$$addSub(function($inl$_12_s_$u$184_$u$1441){
            return ($concat("instantiate: "))($inl$_12_s_$u$184_$u$1441)
          }))($inl$_12_v_$u$179_$u$1436))($phi$650.$1))($phi$648.$1)));
          $phi$649 = $phi$651;
          return $phi$649
        }
      }))(($$compiler$prelude_jg$$Pair(_12_ctx_$u$176))($$compiler$typer_jg$$emptySubs)))($phi$642.$1);
      var $phi$647 = undefined;
      var _12_bs2_$u$192 = (map($$compiler$typer_jg$$applySubsBound($phi$646.$1)))($phi$642.$2);
      var _12_ctx3_$u$193 = ((foldl(function(_12_ctx_$u$194){
        return function(_12_b_$u$195){
          var $inl$_12_ctx_$u$85_$u$1449 = _12_ctx_$u$194;
          var $phi$654 = $inl$_12_ctx_$u$85_$u$1449;
          var $phi$655 = undefined;
          $phi$655 = (((($$compiler$typer_jg$$ICtx($phi$654.$0))((push(_12_b_$u$195))($phi$654.$1)))($phi$654.$2))($phi$654.$3));
          return $phi$655
        }
      }))($phi$646.$0))(_12_bs2_$u$192);
      var _12_t2_$u$191 = ($$compiler$typer_jg$$applySubs($phi$646.$1))($phi$642.$3);
      var $inl$_19_s_$u$143_$u$4873 = _12_ctx3_$u$193;
      var $phi$656 = $instance$Monad$11;
      var $phi$657 = undefined;
      $phi$657 = $phi$656.$0;
      $phi$647 = ((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$4874){
        return ($$compiler$prelude_jg$$Pair(_12_ctx3_$u$193))($$compiler$prelude_jg$$Unit)
      })))($phi$657(_12_t2_$u$191)));
      $phi$643 = $phi$647
    } else {
      var $phi$644 = $instance$Monad$11;
      var $phi$645 = undefined;
      $phi$645 = $phi$644.$0;
      $phi$643 = ($phi$645(_12_t_$u$175))
    };
    return $phi$643
  })
};
var $$compiler$typer_jg$$setSubs = function(_12_subs_$u$78){
  return function(_12_ctx_$u$79){
    var $phi$658 = _12_ctx_$u$79;
    var $phi$659 = undefined;
    $phi$659 = (((($$compiler$typer_jg$$ICtx(_12_subs_$u$78))((map($$compiler$typer_jg$$applySubsBound(_12_subs_$u$78)))($phi$658.$1)))($phi$658.$2))($phi$658.$3));
    return $phi$659
  }
};
var $phi$660 = $instance$Monad$11;
var $phi$661 = undefined;
$phi$661 = $phi$660.$1;
var $$compiler$typer_jg$$getErrorF = ($phi$661($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$117){
  var $phi$662 = _12_ctx_$u$117;
  var $phi$663 = undefined;
  var $phi$664 = $instance$Monad$11;
  var $phi$665 = undefined;
  $phi$665 = $phi$664.$0;
  $phi$663 = ($phi$665($phi$662.$3));
  return $phi$663
});
var $$compiler$typer_jg$$unifyM = function(_12_a_$u$220){
  return function(_12_b_$u$221){
    var $phi$666 = $instance$Monad$11;
    var $phi$667 = undefined;
    $phi$667 = $phi$666.$1;
    return ($phi$667($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$222){
      var $phi$668 = $instance$Monad$11;
      var $phi$669 = undefined;
      $phi$669 = $phi$668.$1;
      return ($phi$669($$compiler$typer_jg$$getErrorF))(function(_12_ef_$u$223){
        var $phi$670 = _12_ctx_$u$222;
        var $phi$671 = undefined;
        $phi$671 = $phi$670.$0;
        var $inl$_19_s_$u$143_$u$4875 = ($$compiler$typer_jg$$setSubs((($$compiler$typer_jg$$composeSubs(_12_ef_$u$223))($phi$671))((($$compiler$typer_jg$$unify(_12_ef_$u$223))(_12_a_$u$220))(_12_b_$u$221))))(_12_ctx_$u$222);
        return $$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$4876){
          return ($$compiler$prelude_jg$$Pair($inl$_19_s_$u$143_$u$4875))($$compiler$prelude_jg$$Unit)
        })
      })
    })
  }
};
var $$compiler$typer_jg$$onError = function(_12_e_$u$107){
  var $phi$672 = $instance$Monad$11;
  var $phi$673 = undefined;
  $phi$673 = $phi$672.$1;
  return ($phi$673($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$108){
    var $phi$674 = _12_ctx_$u$108;
    var $phi$675 = undefined;
    var $inl$_19_s_$u$143_$u$4877 = ((($$compiler$typer_jg$$ICtx($phi$674.$0))($phi$674.$1))($phi$674.$2))(_12_e_$u$107);
    $phi$675 = ($$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$4878){
      return ($$compiler$prelude_jg$$Pair($inl$_19_s_$u$143_$u$4877))($$compiler$prelude_jg$$Unit)
    }));
    return $phi$675
  })
};
var $$compiler$typer_jg$$unrollDataConType = function(_12_t_$u$444){
  var $phi$676 = _12_t_$u$444;
  var $phi$677 = undefined;
  if(($phi$676.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$676.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$676.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$phi$676.$1.$1.$1)))){
    var $phi$678 = $$compiler$typer_jg$$unrollDataConType($phi$676.$2);
    var $phi$679 = undefined;
    $phi$679 = (($$compiler$prelude_jg$$Pair((enqueue($phi$676.$1.$2))($phi$678.$0)))($phi$678.$1));
    $phi$677 = $phi$679
  } else $phi$677 = (($$compiler$prelude_jg$$Pair(emptyArray))(_12_t_$u$444));
  return $phi$677
};
var $$compiler$typer_jg$$setBounds = function(_12_bs_$u$95){
  return function(_12_ctx_$u$96){
    var $phi$680 = _12_ctx_$u$96;
    var $phi$681 = undefined;
    $phi$681 = (((($$compiler$typer_jg$$ICtx($phi$680.$0))(_12_bs_$u$95))($phi$680.$2))($phi$680.$3));
    return $phi$681
  }
};
var $$compiler$typer_jg$$generalize = function(_12_env_$u$412){
  return function(_12_t_$u$413){
    var $phi$682 = $instance$Monad$11;
    var $phi$683 = undefined;
    $phi$683 = $phi$682.$1;
    return ($phi$683($$compiler$prelude_jg$$gets))(function(_12_ctx_$u$414){
      var $phi$684 = _12_ctx_$u$414;
      var $phi$685 = undefined;
      $phi$685 = $phi$684.$0;
      var _12_subs_$u$415 = $phi$685;
      var $phi$686 = _12_env_$u$412;
      var $phi$687 = undefined;
      $phi$687 = $phi$686.$2;
      var _12_envTVars_$u$416 = $phi$687;
      var $phi$688 = _12_subs_$u$415;
      var $phi$689 = undefined;
      $phi$689 = ((($$compiler$prelude_jg$$foldTrie(function(_12_s_$u$423){
        return function(_12_v_$u$424){
          return function(_12___$u$425){
            var $inl$local$instance$Hashable$1_$u$4879 = $instance$Hashable$13;
            var $inl$_19_d_$u$17_$u$4881 = $$compiler$prelude_jg$$Empty;
            var $phi$692 = $instance$Functor$4;
            var $phi$693 = undefined;
            $phi$693 = $phi$692.$0;
            return (((function($inl$local$instance$Eq$0_$u$4880){
              return ($$compiler$prelude_jg$$mergeTrie($instance$Hashable$13))($inl$local$instance$Eq$0_$u$4880)
            })($instance$Eq$1))(_12_s_$u$423))((function($inl$_19_m_$u$18_$u$4882){
              var $phi$690 = $inl$_19_m_$u$18_$u$4882;
              var $phi$691 = undefined;
              if($phi$690.$tag==$$compiler$prelude_jg$$Just.$tag){
                $phi$691 = $phi$690.$0
              } else if($phi$690.$tag==$$compiler$prelude_jg$$Nothing.$tag){
                $phi$691 = $$compiler$prelude_jg$$Empty
              } else error("pattern match fail",$phi$690);
              return $phi$691
            })(($phi$693($$compiler$typer_jg$$freeTVars))(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))(_12_v_$u$424))($phi$688.$1))))
          }
        }
      }))(_12_envTVars_$u$416))(_12_envTVars_$u$416));
      var _12_nonFree_$u$417 = $phi$689;
      var _12_vs_$u$418 = ((($$compiler$prelude_jg$$setDiff($instance$Hashable$13))($instance$Eq$1))($$compiler$typer_jg$$freeTVars(_12_t_$u$413)))(_12_nonFree_$u$417);
      var $phi$704 = _12_ctx_$u$414;
      var $phi$705 = undefined;
      $phi$705 = $phi$704.$1;
      var _12_vbb_$u$419 = ((foldl(function($inl$_12_vbb_$u$426_$u$1518){
        return function($inl$_12_b_$u$427_$u$1519){
          var $phi$694 = $inl$_12_vbb_$u$426_$u$1518;
          var $phi$695 = undefined;
          var $inl$_12_boundVars_$u$431_$u$1523 = $$compiler$typer_jg$$freeTVarsInBound($inl$_12_b_$u$427_$u$1519);
          var $inl$_12_sharedVars_$u$432_$u$1524 = ((($$compiler$prelude_jg$$setIntersection($instance$Hashable$13))($instance$Eq$1))($inl$_12_boundVars_$u$431_$u$1523))(_12_vs_$u$418);
          var $inl$_19_t_$u$242_$u$4884 = $inl$_12_sharedVars_$u$432_$u$1524;
          var $phi$698 = $inl$_12_sharedVars_$u$432_$u$1524;
          var $phi$699 = undefined;
          if($phi$698.$tag==$$compiler$prelude_jg$$Empty.$tag){
            $phi$699 = true
          } else $phi$699 = false;
          var $phi$696 = $phi$699;
          var $phi$697 = undefined;
          if($phi$696){
            $phi$697 = (($$compiler$prelude_jg$$Pair($phi$694.$0))(($$compiler$prelude_jg$$Pair($phi$694.$1.$0))((push($inl$_12_b_$u$427_$u$1519))($phi$694.$1.$1))))
          } else if(!$phi$696){
            var $phi$702 = $instance$Eq$0;
            var $phi$703 = undefined;
            $phi$703 = $phi$702.$0;
            var $phi$700 = ($phi$703($$compiler$prelude_jg$$size($inl$_12_sharedVars_$u$432_$u$1524)))($$compiler$prelude_jg$$size($inl$_12_boundVars_$u$431_$u$1523));
            var $phi$701 = undefined;
            if($phi$700){
              $phi$701 = (($$compiler$prelude_jg$$Pair($phi$694.$0))(($$compiler$prelude_jg$$Pair((push($inl$_12_b_$u$427_$u$1519))($phi$694.$1.$0)))($phi$694.$1.$1)))
            } else if(!$phi$700){
              var $inl$local$instance$Hashable$1_$u$4886 = $instance$Hashable$13;
              $phi$701 = (($$compiler$prelude_jg$$Pair((((function($inl$local$instance$Eq$0_$u$4887){
                return ($$compiler$prelude_jg$$mergeTrie($instance$Hashable$13))($inl$local$instance$Eq$0_$u$4887)
              })($instance$Eq$1))($phi$694.$0))($inl$_12_sharedVars_$u$432_$u$1524)))(($$compiler$prelude_jg$$Pair($phi$694.$1.$0))((push($inl$_12_b_$u$427_$u$1519))($phi$694.$1.$1))))
            } else error("pattern match fail",$phi$700);
            $phi$697 = $phi$701
          } else error("pattern match fail",$phi$696);
          $phi$695 = $phi$697;
          return $phi$695
        }
      }))(($$compiler$prelude_jg$$Pair($$compiler$prelude_jg$$Empty))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray))))($phi$705);
      var $phi$706 = _12_vbb_$u$419;
      var $phi$707 = undefined;
      var _12_finalVars_$u$436 = ((($$compiler$prelude_jg$$setDiff($instance$Hashable$13))($instance$Eq$1))(_12_vs_$u$418))($phi$706.$0);
      var $phi$708 = _12_subs_$u$415;
      var $phi$709 = undefined;
      var $inl$local$instance$Eq$0_$u$1533 = $instance$Eq$1;
      $phi$709 = (($$compiler$typer_jg$$Subs($phi$708.$0))((($$compiler$prelude_jg$$foldTrie(function($inl$_12_r_$u$439_$u$1534){
        return function($inl$_12_v_$u$440_$u$1535){
          return function($inl$_12_t_$u$441_$u$1536){
            var $inl$_19_f_$u$0_$u$4888 = function($inl$_19_t_$u$242_$u$4890){
              var $phi$712 = $inl$_19_t_$u$242_$u$4890;
              var $phi$713 = undefined;
              if($phi$712.$tag==$$compiler$prelude_jg$$Empty.$tag){
                $phi$713 = true
              } else $phi$713 = false;
              return $phi$713
            };
            var $phi$710 = (function($inl$_19_a_$u$1_$u$4889){
              var $inl$$inl$_19_t_$u$242_$u$4890_$u$5788 = $inl$_19_a_$u$1_$u$4889;
              var $phi$714 = $inl$$inl$_19_t_$u$242_$u$4890_$u$5788;
              var $phi$715 = undefined;
              if($phi$714.$tag==$$compiler$prelude_jg$$Empty.$tag){
                $phi$715 = true
              } else $phi$715 = false;
              return $phi$715
            })(((($$compiler$prelude_jg$$setIntersection($instance$Hashable$13))($instance$Eq$1))(_12_finalVars_$u$436))($$compiler$typer_jg$$freeTVars($inl$_12_t_$u$441_$u$1536)));
            var $phi$711 = undefined;
            if($phi$710){
              $phi$711 = ((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($inl$local$instance$Eq$0_$u$1533))($inl$_12_v_$u$440_$u$1535))($inl$_12_t_$u$441_$u$1536))($inl$_12_r_$u$439_$u$1534))
            } else if(!$phi$710){
              $phi$711 = $inl$_12_r_$u$439_$u$1534
            } else error("pattern match fail",$phi$710);
            return $phi$711
          }
        }
      }))($$compiler$prelude_jg$$Empty))($phi$708.$1)));
      var _12_subs2_$u$438 = $phi$709;
      var $inl$_19_s_$u$143_$u$4892 = ($$compiler$typer_jg$$setBounds($phi$706.$1.$1))(($$compiler$typer_jg$$setSubs(_12_subs2_$u$438))(_12_ctx_$u$414));
      var $inl$_19_f_$u$0_$u$4894 = function($inl$_19_b_$u$44_$u$4896){
        var $phi$718 = $inl$_19_b_$u$44_$u$4896;
        var $phi$719 = undefined;
        if($phi$718){
          $phi$719 = false
        } else if(!$phi$718){
          $phi$719 = true
        } else error("pattern match fail",$phi$718);
        return $phi$719
      };
      var $inl$_19_t_$u$242_$u$4897 = _12_finalVars_$u$436;
      var $phi$722 = _12_finalVars_$u$436;
      var $phi$723 = undefined;
      if($phi$722.$tag==$$compiler$prelude_jg$$Empty.$tag){
        $phi$723 = true
      } else $phi$723 = false;
      var $phi$716 = ($or((function($inl$_19_a_$u$1_$u$4895){
        var $inl$$inl$_19_b_$u$44_$u$4896_$u$5790 = $inl$_19_a_$u$1_$u$4895;
        var $phi$720 = $inl$$inl$_19_b_$u$44_$u$4896_$u$5790;
        var $phi$721 = undefined;
        if($phi$720){
          $phi$721 = false
        } else if(!$phi$720){
          $phi$721 = true
        } else error("pattern match fail",$phi$720);
        return $phi$721
      })($phi$723)))((($$compiler$prelude_jg$$$gt($instance$Ord$2))(length($phi$706.$1.$0)))(0));
      var $phi$717 = undefined;
      if($phi$716){
        var $phi$726 = $instance$Monad$11;
        var $phi$727 = undefined;
        $phi$727 = $phi$726.$0;
        var $inl$_19_f_$u$0_$u$4899 = $phi$727;
        $phi$717 = ((function($inl$_19_a_$u$1_$u$4900){
          return $inl$_19_f_$u$0_$u$4899($inl$_19_a_$u$1_$u$4900)
        })(((($$compiler$typer_jg$$mkTForall($$compiler$prelude_jg$$Empty))($$compiler$prelude_jg$$setToArray(_12_finalVars_$u$436)))($phi$706.$1.$0))(_12_t_$u$413)))
      } else if(!$phi$716){
        var $phi$724 = $instance$Monad$11;
        var $phi$725 = undefined;
        $phi$725 = $phi$724.$0;
        $phi$717 = ($phi$725(_12_t_$u$413))
      } else error("pattern match fail",$phi$716);
      $phi$707 = ((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$4893){
        return ($$compiler$prelude_jg$$Pair($inl$_19_s_$u$143_$u$4892))($$compiler$prelude_jg$$Unit)
      })))($phi$717));
      return $phi$707
    })
  }
};
var $$compiler$typer_jg$$satisfies = function(_12_a_$u$654){
  return function(_12_b_$u$655){
    var $phi$728 = _12_a_$u$654;
    var $phi$729 = undefined;
    if($phi$728.$tag==$$compiler$ast_jg$$TVar.$tag){
      $phi$729 = true
    } else if($phi$728.$tag==$$compiler$ast_jg$$TConst.$tag){
      var $phi$732 = _12_b_$u$655;
      var $phi$733 = undefined;
      if($phi$732.$tag==$$compiler$ast_jg$$TConst.$tag){
        var $phi$734 = $instance$Eq$1;
        var $phi$735 = undefined;
        $phi$735 = $phi$734.$0;
        $phi$733 = (($phi$735($phi$728.$1))($phi$732.$1))
      } else $phi$733 = false;
      $phi$729 = $phi$733
    } else if($phi$728.$tag==$$compiler$ast_jg$$TApp.$tag){
      var $phi$730 = _12_b_$u$655;
      var $phi$731 = undefined;
      if($phi$730.$tag==$$compiler$ast_jg$$TApp.$tag){
        $phi$731 = (($and(($$compiler$typer_jg$$satisfies($phi$728.$1))($phi$730.$1)))(($$compiler$typer_jg$$satisfies($phi$728.$2))($phi$730.$2)))
      } else $phi$731 = false;
      $phi$729 = $phi$731
    } else $phi$729 = (error(($concat("unexpected type in satisfies "))($$compiler$printer_jg$$printType(_12_a_$u$654))));
    return $phi$729
  }
};
var $$compiler$typer_jg$$satisfiesBound = function(_12_a_$u$671){
  return function(_12_b_$u$672){
    var $phi$736 = _12_a_$u$671;
    var $phi$737 = undefined;
    var $phi$738 = _12_b_$u$672;
    var $phi$739 = undefined;
    var $phi$740 = $instance$Eq$1;
    var $phi$741 = undefined;
    $phi$741 = $phi$740.$0;
    $phi$739 = (($and(($phi$741($phi$736.$1))($phi$738.$1)))(($$compiler$typer_jg$$satisfies($phi$736.$2))($phi$738.$2)));
    $phi$737 = $phi$739;
    return $phi$737
  }
};
var $$compiler$typer_jg$$infer = function(_12_env_$u$279){
  return function(_12_e_$u$280){
    var _12_inferPat_$u$283 = function(_12_env_$u$297){
      return function(_12_te_$u$298){
        return function(_12_pat_$u$299){
          var $phi$742 = _12_pat_$u$299;
          var $phi$743 = undefined;
          if($phi$742.$tag==$$compiler$ast_jg$$PVar.$tag){
            var $phi$776 = $instance$Monad$11;
            var $phi$777 = undefined;
            $phi$777 = $phi$776.$1;
            $phi$743 = (($phi$777($$compiler$typer_jg$$newTVarM))(function(_12_tv_$u$302){
              var $phi$778 = $instance$Monad$11;
              var $phi$779 = undefined;
              $phi$779 = $phi$778.$0;
              return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($$compiler$typer_jg$$unifyM(_12_te_$u$298))(_12_tv_$u$302)))($phi$779(($$compiler$prelude_jg$$Pair(((set($phi$742.$1))(_12_tv_$u$302))(empty)))(($$compiler$ast_jg$$PVar(($$compiler$ast_jg$$setAnnType(_12_tv_$u$302))($phi$742.$0)))($phi$742.$1))))
            }))
          } else if(($phi$742.$tag==$$compiler$ast_jg$$PConst.$tag)&&($phi$742.$1.$tag==$$compiler$ast_jg$$CNum.$tag)){
            var $phi$774 = $instance$Monad$11;
            var $phi$775 = undefined;
            $phi$775 = $phi$774.$0;
            $phi$743 = ((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($$compiler$typer_jg$$unifyM(_12_te_$u$298))(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("Number"))))($phi$775(($$compiler$prelude_jg$$Pair(empty))(_12_pat_$u$299))))
          } else if(($phi$742.$tag==$$compiler$ast_jg$$PConst.$tag)&&($phi$742.$1.$tag==$$compiler$ast_jg$$CStr.$tag)){
            var $phi$772 = $instance$Monad$11;
            var $phi$773 = undefined;
            $phi$773 = $phi$772.$0;
            $phi$743 = ((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($$compiler$typer_jg$$unifyM(_12_te_$u$298))(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("String"))))($phi$773(($$compiler$prelude_jg$$Pair(empty))(_12_pat_$u$299))))
          } else if($phi$742.$tag==$$compiler$ast_jg$$PData.$tag){
            var $phi$744 = ($$compiler$typer_jg$$hasBinding($phi$742.$1))(_12_env_$u$297);
            var $phi$745 = undefined;
            if(!$phi$744){
              $phi$745 = (error(($concat("unknown data type "))($phi$742.$1)))
            } else if($phi$744){
              var $phi$746 = $instance$Monad$11;
              var $phi$747 = undefined;
              $phi$747 = $phi$746.$1;
              var $phi$748 = $instance$Monad$11;
              var $phi$749 = undefined;
              $phi$749 = $phi$748.$1;
              $phi$745 = (($phi$747(($phi$749(($$compiler$typer_jg$$getBindingM($phi$742.$1))(_12_env_$u$297)))($$compiler$typer_jg$$instantiate)))(function(_12_t_$u$310){
                var $phi$750 = $$compiler$typer_jg$$unrollDataConType(_12_t_$u$310);
                var $phi$751 = undefined;
                var $phi$754 = $instance$Eq$0;
                var $phi$755 = undefined;
                $phi$755 = $phi$754.$0;
                var $phi$752 = ($phi$755(length($phi$742.$2)))(length($phi$750.$0));
                var $phi$753 = undefined;
                if(!$phi$752){
                  $phi$753 = ($$compiler$typer_jg$$errorM("number of pattern params does not match the number of constructor params"))
                } else if($phi$752){
                  var $phi$756 = $instance$Monad$11;
                  var $phi$757 = undefined;
                  $phi$757 = $phi$756.$1;
                  $phi$753 = (($phi$757(((($$compiler$prelude_jg$$foldM($instance$Monad$11))(function($inl$_12_bp_$u$317_$u$1583){
                    return function($inl$_12_pt_$u$318_$u$1584){
                      var $phi$758 = $inl$_12_bp_$u$317_$u$1583;
                      var $phi$759 = undefined;
                      var $phi$760 = $inl$_12_pt_$u$318_$u$1584;
                      var $phi$761 = undefined;
                      var $phi$762 = $instance$Monad$11;
                      var $phi$763 = undefined;
                      $phi$763 = $phi$762.$1;
                      $phi$761 = (($phi$763(((_12_inferPat_$u$283(_12_env_$u$297))($phi$760.$1))($phi$760.$0)))(function($inl$_12_bp_$u$323_$u$1589){
                        var $phi$764 = $inl$_12_bp_$u$323_$u$1589;
                        var $phi$765 = undefined;
                        var $phi$766 = $instance$Monad$11;
                        var $phi$767 = undefined;
                        $phi$767 = $phi$766.$0;
                        var $inl$_19_f_$u$0_$u$4901 = $phi$767;
                        $phi$765 = ((function($inl$_19_a_$u$1_$u$4902){
                          return $inl$_19_f_$u$0_$u$4901($inl$_19_a_$u$1_$u$4902)
                        })(($$compiler$prelude_jg$$Pair((merge($phi$758.$0))($phi$764.$0)))((push($phi$764.$1))($phi$758.$1))));
                        return $phi$765
                      }));
                      $phi$759 = $phi$761;
                      return $phi$759
                    }
                  }))(($$compiler$prelude_jg$$Pair(empty))(emptyArray)))(($$compiler$prelude_jg$$zip($phi$742.$2))($phi$750.$0))))(function(_12_bps_$u$313){
                    var $phi$768 = _12_bps_$u$313;
                    var $phi$769 = undefined;
                    var $phi$770 = $instance$Monad$11;
                    var $phi$771 = undefined;
                    $phi$771 = $phi$770.$0;
                    var $inl$_19_f_$u$0_$u$4903 = $phi$771;
                    $phi$769 = ((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($$compiler$typer_jg$$unifyM(_12_te_$u$298))($phi$750.$1)))((function($inl$_19_a_$u$1_$u$4904){
                      return $inl$_19_f_$u$0_$u$4903($inl$_19_a_$u$1_$u$4904)
                    })(($$compiler$prelude_jg$$Pair($phi$768.$0))((($$compiler$ast_jg$$PData($phi$742.$0))($phi$742.$1))($phi$768.$1)))));
                    return $phi$769
                  }))
                } else error("pattern match fail",$phi$752);
                $phi$751 = $phi$753;
                return $phi$751
              }))
            } else error("pattern match fail",$phi$744);
            $phi$743 = $phi$745
          } else error("pattern match fail",$phi$742);
          return $phi$743
        }
      }
    };
    var _12_setFinalType_$u$281 = function(_12_t_$u$285){
      return function(_12_e_$u$286){
        var $inl$_18_e_$u$129_$u$4905 = _12_e_$u$286;
        var $inl$_19_f_$u$0_$u$4906 = $$compiler$ast_jg$$getAnnType;
        var $phi$780 = (function($inl$_19_a_$u$1_$u$4907){
          return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$4907)
        })($$compiler$ast_jg$$annOf(_12_e_$u$286));
        var $phi$781 = undefined;
        if($phi$780.$tag==$$compiler$ast_jg$$TUnknown.$tag){
          var $phi$784 = $instance$Monad$11;
          var $phi$785 = undefined;
          $phi$785 = $phi$784.$0;
          $phi$781 = ($phi$785(($$compiler$ast_jg$$setType(_12_t_$u$285))(_12_e_$u$286)))
        } else {
          var $phi$782 = $instance$Monad$11;
          var $phi$783 = undefined;
          $phi$783 = $phi$782.$0;
          $phi$781 = ((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($$compiler$typer_jg$$unifyM(_12_t_$u$285))($phi$780)))($phi$783(_12_e_$u$286)))
        };
        return $phi$781
      }
    };
    var $inl$_19_f_$u$0_$u$4908 = function($inl$_12_f_$u$276_$u$1631){
      var $phi$786 = $$compiler$ast_jg$$getAnnCodeLoc($$compiler$ast_jg$$annOf(_12_e_$u$280));
      var $phi$787 = undefined;
      if($phi$786.$tag==$$compiler$prelude_jg$$Nothing.$tag){
        $phi$787 = $inl$_12_f_$u$276_$u$1631
      } else if($phi$786.$tag==$$compiler$prelude_jg$$Just.$tag){
        var $inl$_12_f_$u$114_$u$1635 = $inl$_12_f_$u$276_$u$1631;
        var $phi$788 = $instance$Monad$11;
        var $phi$789 = undefined;
        $phi$789 = $phi$788.$1;
        $phi$787 = (($phi$789($$compiler$typer_jg$$getErrorF))(function($inl$_12_old_$u$115_$u$1636){
          var $phi$790 = $instance$Monad$11;
          var $phi$791 = undefined;
          $phi$791 = $phi$790.$1;
          return ($phi$791((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$typer_jg$$onError(function($inl$$inl$_12_s_$u$278_$u$1633_$u$4914){
            var $inl$_18_l_$u$14_$u$4915 = $phi$786.$0;
            var $phi$792 = $phi$786.$0;
            var $phi$793 = undefined;
            if($phi$792.$tag==$$compiler$ast_jg$$AnnCodeLoc.$tag){
              $phi$793 = (($concat(($concat(($concat(($concat(($concat("in "))($phi$792.$0)))(" at line ")))(intToString($phi$792.$1+1))))(", column ")))(intToString($phi$792.$2+1)))
            } else error("pattern match fail",$phi$792);
            return ($concat(($concat($inl$$inl$_12_s_$u$278_$u$1633_$u$4914))(" ")))($phi$793)
          })))($inl$_12_f_$u$114_$u$1635)))(function($inl$_12_r_$u$116_$u$1637){
            var $phi$794 = $instance$Monad$11;
            var $phi$795 = undefined;
            $phi$795 = $phi$794.$0;
            return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$typer_jg$$onError($inl$_12_old_$u$115_$u$1636)))($phi$795($inl$_12_r_$u$116_$u$1637))
          })
        }))
      } else error("pattern match fail",$phi$786);
      return $phi$787
    };
    var $phi$796 = _12_e_$u$280;
    var $phi$797 = undefined;
    if(($phi$796.$tag==$$compiler$ast_jg$$Const.$tag)&&($phi$796.$1.$tag==$$compiler$ast_jg$$CNum.$tag)){
      $phi$797 = ((_12_setFinalType_$u$281(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("Number")))(_12_e_$u$280))
    } else if(($phi$796.$tag==$$compiler$ast_jg$$Const.$tag)&&($phi$796.$1.$tag==$$compiler$ast_jg$$CStr.$tag)){
      $phi$797 = ((_12_setFinalType_$u$281(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("String")))(_12_e_$u$280))
    } else if($phi$796.$tag==$$compiler$ast_jg$$Var.$tag){
      var $phi$834 = ($$compiler$typer_jg$$hasBinding($phi$796.$1))(_12_env_$u$279);
      var $phi$835 = undefined;
      if(!$phi$834){
        var $inl$_19_f_$u$0_$u$4919 = keys;
        var $phi$840 = _12_env_$u$279;
        var $phi$841 = undefined;
        $phi$841 = $phi$840.$0;
        $phi$835 = ($$compiler$typer_jg$$errorM(($concat(($concat(($concat("unknown identifier "))($phi$796.$1)))(", env: ")))(jsonStringify((function($inl$_19_a_$u$1_$u$4920){
          return keys($inl$_19_a_$u$1_$u$4920)
        })($phi$841)))))
      } else if($phi$834){
        var $phi$836 = $instance$Monad$11;
        var $phi$837 = undefined;
        $phi$837 = $phi$836.$1;
        var $phi$838 = $instance$Monad$11;
        var $phi$839 = undefined;
        $phi$839 = $phi$838.$1;
        $phi$835 = (($phi$837(($phi$839(($$compiler$typer_jg$$getBindingM($phi$796.$1))(_12_env_$u$279)))($$compiler$typer_jg$$instantiate)))(function(_12_t_$u$332){
          return (_12_setFinalType_$u$281(_12_t_$u$332))(_12_e_$u$280)
        }))
      } else error("pattern match fail",$phi$834);
      $phi$797 = $phi$835
    } else if($phi$796.$tag==$$compiler$ast_jg$$Lam.$tag){
      var $phi$830 = $instance$Monad$11;
      var $phi$831 = undefined;
      $phi$831 = $phi$830.$1;
      $phi$797 = (($phi$831($$compiler$typer_jg$$newTVarM))(function(_12_tv_$u$336){
        var $phi$832 = $instance$Monad$11;
        var $phi$833 = undefined;
        $phi$833 = $phi$832.$1;
        return ($phi$833(($$compiler$typer_jg$$infer((($$compiler$typer_jg$$addBinding($phi$796.$1))(_12_tv_$u$336))(_12_env_$u$279)))($phi$796.$2)))(function(_12_a_$u$337){
          var $inl$_18_e_$u$129_$u$4921 = _12_a_$u$337;
          var $inl$_19_f_$u$0_$u$4922 = $$compiler$ast_jg$$getAnnType;
          return (_12_setFinalType_$u$281((($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))((($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("->")))(_12_tv_$u$336)))((function($inl$_19_a_$u$1_$u$4923){
            return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$4923)
          })($$compiler$ast_jg$$annOf(_12_a_$u$337)))))((($$compiler$ast_jg$$Lam($phi$796.$0))($phi$796.$1))(_12_a_$u$337))
        })
      }))
    } else if($phi$796.$tag==$$compiler$ast_jg$$App.$tag){
      var $phi$824 = $instance$Monad$11;
      var $phi$825 = undefined;
      $phi$825 = $phi$824.$1;
      $phi$797 = (($phi$825($$compiler$typer_jg$$newTVarM))(function(_12_tv_$u$341){
        var $phi$826 = $instance$Monad$11;
        var $phi$827 = undefined;
        $phi$827 = $phi$826.$1;
        return ($phi$827(($$compiler$typer_jg$$infer(_12_env_$u$279))($phi$796.$1)))(function(_12_f_$u$342){
          var $phi$828 = $instance$Monad$11;
          var $phi$829 = undefined;
          $phi$829 = $phi$828.$1;
          return ($phi$829(($$compiler$typer_jg$$infer(_12_env_$u$279))($phi$796.$2)))(function(_12_a_$u$343){
            var $inl$_18_e_$u$129_$u$4924 = _12_a_$u$343;
            var $inl$_19_f_$u$0_$u$4925 = $$compiler$ast_jg$$getAnnType;
            var _12_synth_$u$344 = ($$compiler$typer_jg$$f1((function($inl$_19_a_$u$1_$u$4926){
              return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$4926)
            })($$compiler$ast_jg$$annOf(_12_a_$u$343))))(_12_tv_$u$341);
            var $inl$_18_e_$u$129_$u$4927 = _12_f_$u$342;
            var $inl$_19_f_$u$0_$u$4928 = $$compiler$ast_jg$$getAnnType;
            return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($$compiler$typer_jg$$unifyM((function($inl$_19_a_$u$1_$u$4929){
              return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$4929)
            })($$compiler$ast_jg$$annOf(_12_f_$u$342))))(_12_synth_$u$344)))((_12_setFinalType_$u$281(_12_tv_$u$341))((($$compiler$ast_jg$$App($phi$796.$0))(_12_f_$u$342))(_12_a_$u$343)))
          })
        })
      }))
    } else if($phi$796.$tag==$$compiler$ast_jg$$Case.$tag){
      var $phi$804 = $instance$Monad$11;
      var $phi$805 = undefined;
      $phi$805 = $phi$804.$1;
      $phi$797 = (($phi$805(($$compiler$typer_jg$$infer(_12_env_$u$279))($phi$796.$1)))(function(_12_e_$u$348){
        var $phi$806 = $instance$Monad$11;
        var $phi$807 = undefined;
        $phi$807 = $phi$806.$1;
        var $inl$_18_e_$u$129_$u$4932 = _12_e_$u$348;
        var $inl$_19_f_$u$0_$u$4933 = $$compiler$ast_jg$$getAnnType;
        var $inl$_12_te_$u$289_$u$1679 = (function($inl$_19_a_$u$1_$u$4934){
          return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$4934)
        })($$compiler$ast_jg$$annOf(_12_e_$u$348));
        return ($phi$807((($$compiler$prelude_jg$$mapM($instance$Monad$11))(function($inl$_12_p_$u$290_$u$1680){
          var $phi$808 = $inl$_12_p_$u$290_$u$1680;
          var $phi$809 = undefined;
          var $phi$810 = $instance$Monad$11;
          var $phi$811 = undefined;
          $phi$811 = $phi$810.$1;
          $phi$809 = (($phi$811(((_12_inferPat_$u$283(_12_env_$u$279))($inl$_12_te_$u$289_$u$1679))($phi$808.$0)))(function($inl$_12_cb_$u$293_$u$1683){
            var $phi$812 = $inl$_12_cb_$u$293_$u$1683;
            var $phi$813 = undefined;
            var $phi$814 = $instance$Monad$11;
            var $phi$815 = undefined;
            $phi$815 = $phi$814.$1;
            var $inl$_12_env_$u$146_$u$1694 = _12_env_$u$279;
            var $phi$816 = $inl$_12_env_$u$146_$u$1694;
            var $phi$817 = undefined;
            $phi$817 = ((($$compiler$typer_jg$$IEnv((merge($phi$816.$0))($phi$812.$0)))($phi$816.$1))(((foldRecord(function($inl$_12_fvs_$u$150_$u$1698){
              return function($inl$_12___$u$151_$u$1699){
                return function($inl$_12_t_$u$152_$u$1700){
                  var $inl$local$instance$Hashable$1_$u$4930 = $instance$Hashable$13;
                  return (((function($inl$local$instance$Eq$0_$u$4931){
                    return ($$compiler$prelude_jg$$mergeTrie($instance$Hashable$13))($inl$local$instance$Eq$0_$u$4931)
                  })($instance$Eq$1))($inl$_12_fvs_$u$150_$u$1698))($$compiler$typer_jg$$freeTVars($inl$_12_t_$u$152_$u$1700))
                }
              }
            }))($phi$816.$2))($phi$812.$0)));
            $phi$813 = (($phi$815(($$compiler$typer_jg$$infer($phi$817))($phi$808.$1)))(function($inl$_12_e_$u$296_$u$1686){
              var $phi$818 = $instance$Monad$11;
              var $phi$819 = undefined;
              $phi$819 = $phi$818.$0;
              return $phi$819(($$compiler$prelude_jg$$Pair($phi$812.$1))($inl$_12_e_$u$296_$u$1686))
            }));
            return $phi$813
          }));
          return $phi$809
        }))($phi$796.$2)))(function(_12_ps_$u$349){
          var $inl$_19_p_$u$27_$u$4938 = $$compiler$prelude_jg$$head(_12_ps_$u$349);
          var $phi$820 = $inl$_19_p_$u$27_$u$4938;
          var $phi$821 = undefined;
          $phi$821 = $phi$820.$1;
          var $inl$_18_e_$u$129_$u$4935 = $phi$821;
          var $inl$_19_f_$u$0_$u$4936 = $$compiler$ast_jg$$getAnnType;
          var _12_t_$u$350 = (function($inl$_19_a_$u$1_$u$4937){
            return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$4937)
          })($$compiler$ast_jg$$annOf($inl$_18_e_$u$129_$u$4935));
          return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))((($$compiler$prelude_jg$$mapM($instance$Monad$11))(function(_12_p_$u$351){
            var $inl$_19_f_$u$0_$u$4941 = function($inl$_18_e_$u$129_$u$4943){
              var $inl$_19_f_$u$0_$u$4944 = $$compiler$ast_jg$$getAnnType;
              return (function($inl$_19_a_$u$1_$u$4945){
                return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$4945)
              })($$compiler$ast_jg$$annOf($inl$_18_e_$u$129_$u$4943))
            };
            var $inl$_19_p_$u$27_$u$4946 = _12_p_$u$351;
            var $phi$822 = _12_p_$u$351;
            var $phi$823 = undefined;
            $phi$823 = $phi$822.$1;
            return ($$compiler$typer_jg$$unifyM(_12_t_$u$350))((function($inl$_19_a_$u$1_$u$4942){
              var $inl$$inl$_18_e_$u$129_$u$4943_$u$5791 = $inl$_19_a_$u$1_$u$4942;
              var $inl$$inl$_19_f_$u$0_$u$4944_$u$5792 = $$compiler$ast_jg$$getAnnType;
              return (function($inl$$inl$_19_a_$u$1_$u$4945_$u$5793){
                return $$compiler$ast_jg$$getAnnType($inl$$inl$_19_a_$u$1_$u$4945_$u$5793)
              })($$compiler$ast_jg$$annOf($inl$$inl$_18_e_$u$129_$u$4943_$u$5791))
            })($phi$823))
          }))($$compiler$prelude_jg$$tail(_12_ps_$u$349))))((_12_setFinalType_$u$281(_12_t_$u$350))((($$compiler$ast_jg$$Case($phi$796.$0))(_12_e_$u$348))(_12_ps_$u$349)))
        })
      }))
    } else if($phi$796.$tag==$$compiler$ast_jg$$Let.$tag){
      var $phi$798 = $instance$Monad$11;
      var $phi$799 = undefined;
      $phi$799 = $phi$798.$1;
      $phi$797 = (($phi$799(($$compiler$typer_jg$$inferDefs(_12_env_$u$279))($phi$796.$1)))(function(_12_ds_$u$355){
        var _12_env2_$u$356 = ((foldl(function(_12_env_$u$357){
          return function(_12_d_$u$358){
            var $phi$800 = _12_d_$u$358;
            var $phi$801 = undefined;
            var $inl$_18_e_$u$129_$u$4949 = $phi$800.$1;
            var $inl$_19_f_$u$0_$u$4950 = $$compiler$ast_jg$$getAnnType;
            $phi$801 = ((($$compiler$typer_jg$$addBinding($phi$800.$0))((function($inl$_19_a_$u$1_$u$4951){
              return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$4951)
            })($$compiler$ast_jg$$annOf($phi$800.$1))))(_12_env_$u$357));
            return $phi$801
          }
        }))(_12_env_$u$279))(_12_ds_$u$355);
        var $phi$802 = $instance$Monad$11;
        var $phi$803 = undefined;
        $phi$803 = $phi$802.$1;
        return ($phi$803(($$compiler$typer_jg$$infer(_12_env2_$u$356))($phi$796.$2)))(function(_12_e_$u$361){
          var $inl$_18_e_$u$129_$u$4952 = _12_e_$u$361;
          var $inl$_19_f_$u$0_$u$4953 = $$compiler$ast_jg$$getAnnType;
          return (_12_setFinalType_$u$281((function($inl$_19_a_$u$1_$u$4954){
            return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$4954)
          })($$compiler$ast_jg$$annOf(_12_e_$u$361))))((($$compiler$ast_jg$$Let($phi$796.$0))(_12_ds_$u$355))(_12_e_$u$361))
        })
      }))
    } else $phi$797 = (error("type inference not supported for this AST node"));
    return (function($inl$_19_a_$u$1_$u$4909){
      return $inl$_19_f_$u$0_$u$4908($inl$_19_a_$u$1_$u$4909)
    })($phi$797)
  }
};
var $$compiler$typer_jg$$inferDefs = function(_12_env_$u$396){
  return function(_12_ds_$u$397){
    var _12_ns_$u$398 = (map(function($inl$_19_p_$u$24_$u$4955){
      var $phi$842 = $inl$_19_p_$u$24_$u$4955;
      var $phi$843 = undefined;
      $phi$843 = $phi$842.$0;
      return $phi$843
    }))(_12_ds_$u$397);
    var _12_g_$u$399 = ((foldl(function(_12_g_$u$402){
      return function(_12_d_$u$403){
        var $phi$844 = _12_d_$u$403;
        var $phi$845 = undefined;
        $phi$845 = (((set($phi$844.$0))((filter(function(_12_v_$u$406){
          return ($and((($$compiler$prelude_jg$$contains($instance$Eq$1))(_12_v_$u$406))(_12_ns_$u$398)))((($$compiler$prelude_jg$$$div$eq($instance$Eq$1))(_12_v_$u$406))($phi$844.$0))
        }))($$compiler$typer_jg$$freeVars($phi$844.$1))))(_12_g_$u$402));
        return $phi$845
      }
    }))(empty))(_12_ds_$u$397);
    var $inl$_13_g_$u$38_$u$4958 = _12_g_$u$399;
    var $inl$$inl$_13_invertEdge_$u$20_$u$1173_$u$4966 = function($inl$$inl$_13_v_$u$22_$u$1175_$u$4968){
      return function($inl$$inl$_13_ig_$u$23_$u$1176_$u$4969){
        return function($inl$$inl$_13_e_$u$24_$u$1177_$u$4970){
          var $phi$846 = (has($inl$$inl$_13_e_$u$24_$u$1177_$u$4970))($inl$$inl$_13_ig_$u$23_$u$1176_$u$4969);
          var $phi$847 = undefined;
          if($phi$846){
            $phi$847 = (((set($inl$$inl$_13_e_$u$24_$u$1177_$u$4970))((push($inl$$inl$_13_v_$u$22_$u$1175_$u$4968))((get($inl$$inl$_13_e_$u$24_$u$1177_$u$4970))($inl$$inl$_13_ig_$u$23_$u$1176_$u$4969))))($inl$$inl$_13_ig_$u$23_$u$1176_$u$4969))
          } else if(!$phi$846){
            var $inl$_19_x_$u$103_$u$5004 = $inl$$inl$_13_v_$u$22_$u$1175_$u$4968;
            $phi$847 = (((set($inl$$inl$_13_e_$u$24_$u$1177_$u$4970))((push($inl$$inl$_13_v_$u$22_$u$1175_$u$4968))(emptyArray)))($inl$$inl$_13_ig_$u$23_$u$1176_$u$4969))
          } else error("pattern match fail",$phi$846);
          return $phi$847
        }
      }
    };
    var $inl$$inl$_13_invert_$u$21_$u$1174_$u$4967 = function($inl$$inl$_13_ig_$u$25_$u$1178_$u$4971){
      return function($inl$$inl$_13_v_$u$26_$u$1179_$u$4972){
        return function($inl$$inl$_13_es_$u$27_$u$1180_$u$4973){
          var $phi$848 = (has($inl$$inl$_13_v_$u$26_$u$1179_$u$4972))($inl$$inl$_13_ig_$u$25_$u$1178_$u$4971);
          var $phi$849 = undefined;
          if($phi$848){
            $phi$849 = $inl$$inl$_13_ig_$u$25_$u$1178_$u$4971
          } else if(!$phi$848){
            $phi$849 = (((set($inl$$inl$_13_v_$u$26_$u$1179_$u$4972))(emptyArray))($inl$$inl$_13_ig_$u$25_$u$1178_$u$4971))
          } else error("pattern match fail",$phi$848);
          var $inl$$inl$_13_ig2_$u$28_$u$1181_$u$4974 = $phi$849;
          var $inl$$inl$$inl$_13_v_$u$22_$u$1175_$u$4968_$u$5794 = $inl$$inl$_13_v_$u$26_$u$1179_$u$4972;
          return ((foldl(function($inl$$inl$$inl$_13_ig_$u$23_$u$1176_$u$4969_$u$5795){
            return function($inl$$inl$$inl$_13_e_$u$24_$u$1177_$u$4970_$u$5796){
              var $phi$850 = (has($inl$$inl$$inl$_13_e_$u$24_$u$1177_$u$4970_$u$5796))($inl$$inl$$inl$_13_ig_$u$23_$u$1176_$u$4969_$u$5795);
              var $phi$851 = undefined;
              if($phi$850){
                $phi$851 = (((set($inl$$inl$$inl$_13_e_$u$24_$u$1177_$u$4970_$u$5796))((push($inl$$inl$$inl$_13_v_$u$22_$u$1175_$u$4968_$u$5794))((get($inl$$inl$$inl$_13_e_$u$24_$u$1177_$u$4970_$u$5796))($inl$$inl$$inl$_13_ig_$u$23_$u$1176_$u$4969_$u$5795))))($inl$$inl$$inl$_13_ig_$u$23_$u$1176_$u$4969_$u$5795))
              } else if(!$phi$850){
                var $inl$$inl$_19_x_$u$103_$u$5004_$u$5797 = $inl$$inl$$inl$_13_v_$u$22_$u$1175_$u$4968_$u$5794;
                $phi$851 = (((set($inl$$inl$$inl$_13_e_$u$24_$u$1177_$u$4970_$u$5796))((push($inl$$inl$$inl$_13_v_$u$22_$u$1175_$u$4968_$u$5794))(emptyArray)))($inl$$inl$$inl$_13_ig_$u$23_$u$1176_$u$4969_$u$5795))
              } else error("pattern match fail",$phi$850);
              return $phi$851
            }
          }))($inl$$inl$_13_ig2_$u$28_$u$1181_$u$4974))($inl$$inl$_13_es_$u$27_$u$1180_$u$4973)
        }
      }
    };
    var $inl$$inl$_13_invertedG_$u$16_$u$1169_$u$4962 = ((foldRecord(function($inl$$inl$$inl$_13_ig_$u$25_$u$1178_$u$4971_$u$5798){
      return function($inl$$inl$$inl$_13_v_$u$26_$u$1179_$u$4972_$u$5799){
        return function($inl$$inl$$inl$_13_es_$u$27_$u$1180_$u$4973_$u$5800){
          var $phi$852 = (has($inl$$inl$$inl$_13_v_$u$26_$u$1179_$u$4972_$u$5799))($inl$$inl$$inl$_13_ig_$u$25_$u$1178_$u$4971_$u$5798);
          var $phi$853 = undefined;
          if($phi$852){
            $phi$853 = $inl$$inl$$inl$_13_ig_$u$25_$u$1178_$u$4971_$u$5798
          } else if(!$phi$852){
            $phi$853 = (((set($inl$$inl$$inl$_13_v_$u$26_$u$1179_$u$4972_$u$5799))(emptyArray))($inl$$inl$$inl$_13_ig_$u$25_$u$1178_$u$4971_$u$5798))
          } else error("pattern match fail",$phi$852);
          var $inl$$inl$$inl$_13_ig2_$u$28_$u$1181_$u$4974_$u$5801 = $phi$853;
          var $inl$$inl$$inl$_13_v_$u$22_$u$1175_$u$4968_$u$5802 = $inl$$inl$$inl$_13_v_$u$26_$u$1179_$u$4972_$u$5799;
          return ((foldl(function($inl$$inl$$inl$_13_ig_$u$23_$u$1176_$u$4969_$u$5803){
            return function($inl$$inl$$inl$_13_e_$u$24_$u$1177_$u$4970_$u$5804){
              var $phi$854 = (has($inl$$inl$$inl$_13_e_$u$24_$u$1177_$u$4970_$u$5804))($inl$$inl$$inl$_13_ig_$u$23_$u$1176_$u$4969_$u$5803);
              var $phi$855 = undefined;
              if($phi$854){
                $phi$855 = (((set($inl$$inl$$inl$_13_e_$u$24_$u$1177_$u$4970_$u$5804))((push($inl$$inl$$inl$_13_v_$u$22_$u$1175_$u$4968_$u$5802))((get($inl$$inl$$inl$_13_e_$u$24_$u$1177_$u$4970_$u$5804))($inl$$inl$$inl$_13_ig_$u$23_$u$1176_$u$4969_$u$5803))))($inl$$inl$$inl$_13_ig_$u$23_$u$1176_$u$4969_$u$5803))
              } else if(!$phi$854){
                var $inl$$inl$_19_x_$u$103_$u$5004_$u$5805 = $inl$$inl$$inl$_13_v_$u$22_$u$1175_$u$4968_$u$5802;
                $phi$855 = (((set($inl$$inl$$inl$_13_e_$u$24_$u$1177_$u$4970_$u$5804))((push($inl$$inl$$inl$_13_v_$u$22_$u$1175_$u$4968_$u$5802))(emptyArray)))($inl$$inl$$inl$_13_ig_$u$23_$u$1176_$u$4969_$u$5803))
              } else error("pattern match fail",$phi$854);
              return $phi$855
            }
          }))($inl$$inl$$inl$_13_ig2_$u$28_$u$1181_$u$4974_$u$5801))($inl$$inl$$inl$_13_es_$u$27_$u$1180_$u$4973_$u$5800)
        }
      }
    }))(empty))(_12_g_$u$399);
    var $inl$$inl$_13_assembleCc_$u$17_$u$1170_$u$4963 = function($inl$$inl$_13_gs_$u$29_$u$1182_$u$4975){
      return function($inl$$inl$_13_v_$u$30_$u$1183_$u$4976){
        var $phi$856 = $inl$$inl$_13_gs_$u$29_$u$1182_$u$4975;
        var $phi$857 = undefined;
        var $phi$858 = ($$compiler$prelude_jg$$exists(($$compiler$prelude_jg$$contains($instance$Eq$1))($inl$$inl$_13_v_$u$30_$u$1183_$u$4976)))($phi$856.$1);
        var $phi$859 = undefined;
        if($phi$858){
          $phi$859 = (($$compiler$prelude_jg$$Pair($phi$856.$0))($phi$856.$1))
        } else if(!$phi$858){
          var $inl$$inl$_13_cc_$u$33_$u$1186_$u$4979 = (($$compiler$graph_jg$$dfs($phi$856.$0))(emptyArray))($inl$$inl$_13_v_$u$30_$u$1183_$u$4976);
          var $inl$$inl$_13_ig2_$u$34_$u$1187_$u$4980 = ((foldl(function($inl$$inl$_13_g_$u$35_$u$1188_$u$4981){
            return function($inl$$inl$_13_v_$u$36_$u$1189_$u$4982){
              return (del($inl$$inl$_13_v_$u$36_$u$1189_$u$4982))((mapRecord(filter(function($inl$$inl$_13_w_$u$37_$u$1190_$u$4983){
                return (($$compiler$prelude_jg$$$div$eq($instance$Eq$1))($inl$$inl$_13_w_$u$37_$u$1190_$u$4983))($inl$$inl$_13_v_$u$36_$u$1189_$u$4982)
              })))($inl$$inl$_13_g_$u$35_$u$1188_$u$4981))
            }
          }))($phi$856.$0))($inl$$inl$_13_cc_$u$33_$u$1186_$u$4979);
          $phi$859 = (($$compiler$prelude_jg$$Pair($inl$$inl$_13_ig2_$u$34_$u$1187_$u$4980))((push($inl$$inl$_13_cc_$u$33_$u$1186_$u$4979))($phi$856.$1)))
        } else error("pattern match fail",$phi$858);
        $phi$857 = $phi$859;
        return $phi$857
      }
    };
    var $inl$$inl$_13_firstDfs_$u$18_$u$1171_$u$4964 = $$compiler$graph_jg$$fullDfs(_12_g_$u$399);
    var $inl$_19_p_$u$27_$u$5005 = ((foldl(function($inl$$inl$$inl$_13_gs_$u$29_$u$1182_$u$4975_$u$5806){
      return function($inl$$inl$$inl$_13_v_$u$30_$u$1183_$u$4976_$u$5807){
        var $phi$860 = $inl$$inl$$inl$_13_gs_$u$29_$u$1182_$u$4975_$u$5806;
        var $phi$861 = undefined;
        var $phi$862 = ($$compiler$prelude_jg$$exists(($$compiler$prelude_jg$$contains($instance$Eq$1))($inl$$inl$$inl$_13_v_$u$30_$u$1183_$u$4976_$u$5807)))($phi$860.$1);
        var $phi$863 = undefined;
        if($phi$862){
          $phi$863 = (($$compiler$prelude_jg$$Pair($phi$860.$0))($phi$860.$1))
        } else if(!$phi$862){
          var $inl$$inl$$inl$_13_cc_$u$33_$u$1186_$u$4979_$u$5810 = (($$compiler$graph_jg$$dfs($phi$860.$0))(emptyArray))($inl$$inl$$inl$_13_v_$u$30_$u$1183_$u$4976_$u$5807);
          var $inl$$inl$$inl$_13_ig2_$u$34_$u$1187_$u$4980_$u$5811 = ((foldl(function($inl$$inl$$inl$_13_g_$u$35_$u$1188_$u$4981_$u$5812){
            return function($inl$$inl$$inl$_13_v_$u$36_$u$1189_$u$4982_$u$5813){
              return (del($inl$$inl$$inl$_13_v_$u$36_$u$1189_$u$4982_$u$5813))((mapRecord(filter(function($inl$$inl$$inl$_13_w_$u$37_$u$1190_$u$4983_$u$5814){
                return (($$compiler$prelude_jg$$$div$eq($instance$Eq$1))($inl$$inl$$inl$_13_w_$u$37_$u$1190_$u$4983_$u$5814))($inl$$inl$$inl$_13_v_$u$36_$u$1189_$u$4982_$u$5813)
              })))($inl$$inl$$inl$_13_g_$u$35_$u$1188_$u$4981_$u$5812))
            }
          }))($phi$860.$0))($inl$$inl$$inl$_13_cc_$u$33_$u$1186_$u$4979_$u$5810);
          $phi$863 = (($$compiler$prelude_jg$$Pair($inl$$inl$$inl$_13_ig2_$u$34_$u$1187_$u$4980_$u$5811))((push($inl$$inl$$inl$_13_cc_$u$33_$u$1186_$u$4979_$u$5810))($phi$860.$1)))
        } else error("pattern match fail",$phi$862);
        $phi$861 = $phi$863;
        return $phi$861
      }
    }))(($$compiler$prelude_jg$$Pair($inl$$inl$_13_invertedG_$u$16_$u$1169_$u$4962))(emptyArray)))($inl$$inl$_13_firstDfs_$u$18_$u$1171_$u$4964);
    var $phi$864 = $inl$_19_p_$u$27_$u$5005;
    var $phi$865 = undefined;
    $phi$865 = $phi$864.$1;
    var $inl$$inl$_13_ccs_$u$19_$u$1172_$u$4965 = $phi$865;
    var $inl$_13_ccs_$u$39_$u$4959 = $inl$$inl$_13_ccs_$u$19_$u$1172_$u$4965;
    var $inl$$inl$_13_f_$u$47_$u$1209_$u$4989 = function($inl$$inl$_13_r_$u$48_$u$1210_$u$4990){
      return function($inl$$inl$_13_icc_$u$49_$u$1211_$u$4991){
        var $phi$866 = $inl$$inl$_13_icc_$u$49_$u$1211_$u$4991;
        var $phi$867 = undefined;
        $phi$867 = (((foldl(function($inl$$inl$_13_r_$u$52_$u$1214_$u$4994){
          return function($inl$$inl$_13_c_$u$53_$u$1215_$u$4995){
            return ((set($inl$$inl$_13_c_$u$53_$u$1215_$u$4995))(intToString($phi$866.$0)))($inl$$inl$_13_r_$u$52_$u$1214_$u$4994)
          }
        }))($inl$$inl$_13_r_$u$48_$u$1210_$u$4990))($phi$866.$1));
        return $phi$867
      }
    };
    var $inl$$inl$_13_g2g_$u$43_$u$1205_$u$4985 = ((foldl(function($inl$$inl$$inl$_13_r_$u$48_$u$1210_$u$4990_$u$5815){
      return function($inl$$inl$$inl$_13_icc_$u$49_$u$1211_$u$4991_$u$5816){
        var $phi$868 = $inl$$inl$$inl$_13_icc_$u$49_$u$1211_$u$4991_$u$5816;
        var $phi$869 = undefined;
        $phi$869 = (((foldl(function($inl$$inl$$inl$_13_r_$u$52_$u$1214_$u$4994_$u$5819){
          return function($inl$$inl$$inl$_13_c_$u$53_$u$1215_$u$4995_$u$5820){
            return ((set($inl$$inl$$inl$_13_c_$u$53_$u$1215_$u$4995_$u$5820))(intToString($phi$868.$0)))($inl$$inl$$inl$_13_r_$u$52_$u$1214_$u$4994_$u$5819)
          }
        }))($inl$$inl$$inl$_13_r_$u$48_$u$1210_$u$4990_$u$5815))($phi$868.$1));
        return $phi$869
      }
    }))(empty))($$compiler$prelude_jg$$zipWithIndex($inl$_13_ccs_$u$39_$u$4959));
    var $inl$$inl$_13_addGraph_$u$44_$u$1206_$u$4986 = function($inl$$inl$_13_r_$u$54_$u$1216_$u$4996){
      return function($inl$$inl$_13_v_$u$55_$u$1217_$u$4997){
        return function($inl$$inl$_13_es_$u$56_$u$1218_$u$4998){
          var $inl$$inl$_13_rv_$u$57_$u$1219_$u$4999 = (get($inl$$inl$_13_v_$u$55_$u$1217_$u$4997))($inl$$inl$_13_g2g_$u$43_$u$1205_$u$4985);
          var $inl$$inl$_13_res_$u$58_$u$1220_$u$5000 = ($$compiler$prelude_jg$$uniq($instance$Eq$1))(sort((filter(function($inl$$inl$_13_re_$u$59_$u$1221_$u$5001){
            return (($$compiler$prelude_jg$$$div$eq($instance$Eq$1))($inl$$inl$_13_re_$u$59_$u$1221_$u$5001))($inl$$inl$_13_rv_$u$57_$u$1219_$u$4999)
          }))((map(function($inl$$inl$_13_e_$u$60_$u$1222_$u$5002){
            return (get($inl$$inl$_13_e_$u$60_$u$1222_$u$5002))($inl$$inl$_13_g2g_$u$43_$u$1205_$u$4985)
          }))($inl$$inl$_13_es_$u$56_$u$1218_$u$4998))));
          var $phi$870 = (has($inl$$inl$_13_rv_$u$57_$u$1219_$u$4999))($inl$$inl$_13_r_$u$54_$u$1216_$u$4996);
          var $phi$871 = undefined;
          if(!$phi$870){
            $phi$871 = (((set($inl$$inl$_13_rv_$u$57_$u$1219_$u$4999))($inl$$inl$_13_res_$u$58_$u$1220_$u$5000))($inl$$inl$_13_r_$u$54_$u$1216_$u$4996))
          } else if($phi$870){
            $phi$871 = (((set($inl$$inl$_13_rv_$u$57_$u$1219_$u$4999))(((($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1))($inl$$inl$_13_res_$u$58_$u$1220_$u$5000))((get($inl$$inl$_13_rv_$u$57_$u$1219_$u$4999))($inl$$inl$_13_r_$u$54_$u$1216_$u$4996))))($inl$$inl$_13_r_$u$54_$u$1216_$u$4996))
          } else error("pattern match fail",$phi$870);
          return $phi$871
        }
      }
    };
    var $inl$$inl$_13_cg_$u$45_$u$1207_$u$4987 = ((foldRecord(function($inl$$inl$$inl$_13_r_$u$54_$u$1216_$u$4996_$u$5821){
      return function($inl$$inl$$inl$_13_v_$u$55_$u$1217_$u$4997_$u$5822){
        return function($inl$$inl$$inl$_13_es_$u$56_$u$1218_$u$4998_$u$5823){
          var $inl$$inl$$inl$_13_rv_$u$57_$u$1219_$u$4999_$u$5824 = (get($inl$$inl$$inl$_13_v_$u$55_$u$1217_$u$4997_$u$5822))($inl$$inl$_13_g2g_$u$43_$u$1205_$u$4985);
          var $inl$$inl$$inl$_13_res_$u$58_$u$1220_$u$5000_$u$5825 = ($$compiler$prelude_jg$$uniq($instance$Eq$1))(sort((filter(function($inl$$inl$$inl$_13_re_$u$59_$u$1221_$u$5001_$u$5826){
            return (($$compiler$prelude_jg$$$div$eq($instance$Eq$1))($inl$$inl$$inl$_13_re_$u$59_$u$1221_$u$5001_$u$5826))($inl$$inl$$inl$_13_rv_$u$57_$u$1219_$u$4999_$u$5824)
          }))((map(function($inl$$inl$$inl$_13_e_$u$60_$u$1222_$u$5002_$u$5827){
            return (get($inl$$inl$$inl$_13_e_$u$60_$u$1222_$u$5002_$u$5827))($inl$$inl$_13_g2g_$u$43_$u$1205_$u$4985)
          }))($inl$$inl$$inl$_13_es_$u$56_$u$1218_$u$4998_$u$5823))));
          var $phi$872 = (has($inl$$inl$$inl$_13_rv_$u$57_$u$1219_$u$4999_$u$5824))($inl$$inl$$inl$_13_r_$u$54_$u$1216_$u$4996_$u$5821);
          var $phi$873 = undefined;
          if(!$phi$872){
            $phi$873 = (((set($inl$$inl$$inl$_13_rv_$u$57_$u$1219_$u$4999_$u$5824))($inl$$inl$$inl$_13_res_$u$58_$u$1220_$u$5000_$u$5825))($inl$$inl$$inl$_13_r_$u$54_$u$1216_$u$4996_$u$5821))
          } else if($phi$872){
            $phi$873 = (((set($inl$$inl$$inl$_13_rv_$u$57_$u$1219_$u$4999_$u$5824))(((($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1))($inl$$inl$$inl$_13_res_$u$58_$u$1220_$u$5000_$u$5825))((get($inl$$inl$$inl$_13_rv_$u$57_$u$1219_$u$4999_$u$5824))($inl$$inl$$inl$_13_r_$u$54_$u$1216_$u$4996_$u$5821))))($inl$$inl$$inl$_13_r_$u$54_$u$1216_$u$4996_$u$5821))
          } else error("pattern match fail",$phi$872);
          return $phi$873
        }
      }
    }))(empty))(_12_g_$u$399);
    var $inl$$inl$_13_ord_$u$46_$u$1208_$u$4988 = $$compiler$graph_jg$$fullDfs($inl$$inl$_13_cg_$u$45_$u$1207_$u$4987);
    var $inl$_13_result_$u$41_$u$4960 = $$compiler$prelude_jg$$reverse((map(function($inl$$inl$_13_i_$u$61_$u$1223_$u$5003){
      return (getIx(unsafeStringToInt($inl$$inl$_13_i_$u$61_$u$1223_$u$5003)))($inl$_13_ccs_$u$39_$u$4959)
    }))($inl$$inl$_13_ord_$u$46_$u$1208_$u$4988));
    var _12_ccs_$u$400 = $inl$_13_result_$u$41_$u$4960;
    return ((($$compiler$prelude_jg$$foldM($instance$Monad$11))(function($inl$_12_rs_$u$407_$u$1895){
      return function($inl$_12_cc_$u$408_$u$1896){
        var $phi$874 = $instance$Functor$9;
        var $phi$875 = undefined;
        $phi$875 = $phi$874.$0;
        var $inl$_12_env_$u$363_$u$1902 = ((foldl(function($inl$_12_env_$u$409_$u$1897){
          return function($inl$_12_r_$u$410_$u$1898){
            var $inl$_19_p_$u$24_$u$5008 = $inl$_12_r_$u$410_$u$1898;
            var $phi$876 = $inl$_12_r_$u$410_$u$1898;
            var $phi$877 = undefined;
            $phi$877 = $phi$876.$0;
            var $inl$_19_p_$u$27_$u$5014 = $inl$_12_r_$u$410_$u$1898;
            var $phi$878 = $inl$_12_r_$u$410_$u$1898;
            var $phi$879 = undefined;
            $phi$879 = $phi$878.$1;
            var $inl$_18_e_$u$129_$u$5011 = $phi$879;
            var $inl$_19_f_$u$0_$u$5012 = $$compiler$ast_jg$$getAnnType;
            return (($$compiler$typer_jg$$addBinding($phi$877))((function($inl$_19_a_$u$1_$u$5013){
              return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$5013)
            })($$compiler$ast_jg$$annOf($inl$_18_e_$u$129_$u$5011))))($inl$_12_env_$u$409_$u$1897)
          }
        }))(_12_env_$u$396))($inl$_12_rs_$u$407_$u$1895);
        return ($phi$875(concat($inl$_12_rs_$u$407_$u$1895)))((function($inl$_12_ds_$u$364_$u$1903){
          var $phi$880 = $instance$Monad$11;
          var $phi$881 = undefined;
          $phi$881 = $phi$880.$1;
          return ($phi$881(((($$compiler$prelude_jg$$foldM($instance$Monad$11))(function($inl$$inl$_12_env_$u$369_$u$1922_$u$5026){
            return function($inl$$inl$_12_d_$u$370_$u$1923_$u$5027){
              var $phi$882 = $instance$Monad$11;
              var $phi$883 = undefined;
              $phi$883 = $phi$882.$1;
              return ($phi$883($$compiler$typer_jg$$newTVarM))(function($inl$$inl$_12_tv_$u$371_$u$1924_$u$5031){
                var $phi$884 = $instance$Monad$11;
                var $phi$885 = undefined;
                $phi$885 = $phi$884.$0;
                var $inl$_19_p_$u$24_$u$5035 = $inl$$inl$_12_d_$u$370_$u$1923_$u$5027;
                var $phi$886 = $inl$$inl$_12_d_$u$370_$u$1923_$u$5027;
                var $phi$887 = undefined;
                $phi$887 = $phi$886.$0;
                return $phi$885((($$compiler$typer_jg$$addBinding($phi$887))($inl$$inl$_12_tv_$u$371_$u$1924_$u$5031))($inl$$inl$_12_env_$u$369_$u$1922_$u$5026))
              })
            }
          }))($inl$_12_env_$u$363_$u$1902))($inl$_12_ds_$u$364_$u$1903)))(function($inl$_12_env2_$u$386_$u$1925){
            var $phi$888 = $instance$Monad$11;
            var $phi$889 = undefined;
            $phi$889 = $phi$888.$1;
            var $inl$$inl$_12_env_$u$372_$u$1917_$u$5038 = $inl$_12_env2_$u$386_$u$1925;
            return ($phi$889((($$compiler$prelude_jg$$mapM($instance$Monad$11))(function($inl$$inl$_12_d_$u$373_$u$1918_$u$5039){
              var $phi$890 = $inl$$inl$_12_d_$u$373_$u$1918_$u$5039;
              var $phi$891 = undefined;
              var $phi$892 = $instance$Monad$11;
              var $phi$893 = undefined;
              $phi$893 = $phi$892.$1;
              $phi$891 = (($phi$893(($$compiler$typer_jg$$infer($inl$_12_env2_$u$386_$u$1925))($phi$890.$1)))(function($inl$$inl$_12_e_$u$376_$u$1921_$u$5045){
                var $phi$894 = $instance$Monad$11;
                var $phi$895 = undefined;
                $phi$895 = $phi$894.$0;
                return $phi$895(($$compiler$prelude_jg$$Pair($phi$890.$0))($inl$$inl$_12_e_$u$376_$u$1921_$u$5045))
              }));
              return $phi$891
            }))($inl$_12_ds_$u$364_$u$1903)))(function($inl$_12_ds2_$u$387_$u$1926){
              var $phi$896 = $instance$Monad$11;
              var $phi$897 = undefined;
              $phi$897 = $phi$896.$1;
              var $inl$$inl$_12_env_$u$377_$u$1913_$u$5049 = $inl$_12_env2_$u$386_$u$1925;
              return ($phi$897((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))((($$compiler$prelude_jg$$mapM($instance$Monad$11))(function($inl$$inl$_12_d_$u$378_$u$1914_$u$5050){
                var $phi$898 = $inl$$inl$_12_d_$u$378_$u$1914_$u$5050;
                var $phi$899 = undefined;
                var $inl$_18_e_$u$129_$u$5053 = $phi$898.$1;
                var $inl$_19_f_$u$0_$u$5054 = $$compiler$ast_jg$$getAnnType;
                $phi$899 = (($$compiler$typer_jg$$unifyM((function($inl$_19_a_$u$1_$u$5055){
                  return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$5055)
                })($$compiler$ast_jg$$annOf($phi$898.$1))))(($$compiler$typer_jg$$getBinding($phi$898.$0))($inl$_12_env2_$u$386_$u$1925)));
                return $phi$899
              }))($inl$_12_ds2_$u$387_$u$1926)))((($$compiler$prelude_jg$$mapM($instance$Monad$11))(function($inl$_12_d_$u$453_$u$1955){
                var $phi$900 = $inl$_12_d_$u$453_$u$1955;
                var $phi$901 = undefined;
                var $phi$902 = $instance$Monad$11;
                var $phi$903 = undefined;
                $phi$903 = $phi$902.$1;
                $phi$901 = (($phi$903($$compiler$prelude_jg$$gets))(function($inl$_12_ctx_$u$456_$u$1958){
                  var $phi$904 = $instance$Monad$11;
                  var $phi$905 = undefined;
                  $phi$905 = $phi$904.$0;
                  var $inl$_19_f_$u$0_$u$5056 = $phi$905;
                  var $phi$906 = $inl$_12_ctx_$u$456_$u$1958;
                  var $phi$907 = undefined;
                  $phi$907 = $phi$906.$0;
                  return (function($inl$_19_a_$u$1_$u$5057){
                    return $inl$_19_f_$u$0_$u$5056($inl$_19_a_$u$1_$u$5057)
                  })(($$compiler$prelude_jg$$Pair($phi$900.$0))(($$compiler$typer_jg$$applySubsE($phi$907))($phi$900.$1)))
                }));
                return $phi$901
              }))($inl$_12_ds2_$u$387_$u$1926))))(function($inl$_12_ds3_$u$388_$u$1927){
                var $inl$_12_env_$u$389_$u$1970 = $inl$_12_env_$u$363_$u$1902;
                var $phi$908 = $instance$Monad$11;
                var $phi$909 = undefined;
                $phi$909 = $phi$908.$1;
                var $inl$$inl$_12_env_$u$381_$u$1908_$u$5061 = $inl$_12_env_$u$363_$u$1902;
                return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($phi$909($$compiler$prelude_jg$$gets))(function($inl$_12_ctx_$u$390_$u$1971){
                  var $phi$910 = $inl$_12_env_$u$363_$u$1902;
                  var $phi$911 = undefined;
                  $phi$911 = $phi$910.$1;
                  var $inl$_12_is_$u$391_$u$1972 = $phi$911;
                  var $phi$912 = $inl$_12_ctx_$u$390_$u$1971;
                  var $phi$913 = undefined;
                  $phi$913 = $phi$912.$1;
                  var $inl$_12_bs_$u$392_$u$1973 = $phi$913;
                  var $inl$_12_bs2_$u$393_$u$1974 = (filter(function($inl$_12_b_$u$394_$u$1975){
                    var $inl$_19_b_$u$44_$u$5058 = ($$compiler$prelude_jg$$exists(function($inl$_12_i_$u$395_$u$1976){
                      return ($$compiler$typer_jg$$satisfiesBound($inl$_12_i_$u$395_$u$1976))($inl$_12_b_$u$394_$u$1975)
                    }))($inl$_12_is_$u$391_$u$1972);
                    var $phi$914 = $inl$_19_b_$u$44_$u$5058;
                    var $phi$915 = undefined;
                    if($phi$914){
                      $phi$915 = false
                    } else if(!$phi$914){
                      $phi$915 = true
                    } else error("pattern match fail",$phi$914);
                    return $phi$915
                  }))($inl$_12_bs_$u$392_$u$1973);
                  var $inl$_19_s_$u$143_$u$5059 = ($$compiler$typer_jg$$setBounds($inl$_12_bs2_$u$393_$u$1974))($inl$_12_ctx_$u$390_$u$1971);
                  return $$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$5060){
                    return ($$compiler$prelude_jg$$Pair($inl$_19_s_$u$143_$u$5059))($$compiler$prelude_jg$$Unit)
                  })
                })))((($$compiler$prelude_jg$$mapM($instance$Monad$11))(function($inl$$inl$_12_d_$u$382_$u$1909_$u$5062){
                  var $phi$916 = $inl$$inl$_12_d_$u$382_$u$1909_$u$5062;
                  var $phi$917 = undefined;
                  var $phi$918 = $instance$Monad$11;
                  var $phi$919 = undefined;
                  $phi$919 = $phi$918.$1;
                  var $inl$_18_e_$u$129_$u$5072 = $phi$916.$1;
                  var $inl$_19_f_$u$0_$u$5073 = $$compiler$ast_jg$$getAnnType;
                  $phi$917 = (($phi$919(($$compiler$typer_jg$$generalize($inl$_12_env_$u$363_$u$1902))((function($inl$_19_a_$u$1_$u$5074){
                    return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$5074)
                  })($$compiler$ast_jg$$annOf($phi$916.$1)))))(function($inl$$inl$_12_t_$u$385_$u$1912_$u$5068){
                    var $phi$920 = $instance$Monad$11;
                    var $phi$921 = undefined;
                    $phi$921 = $phi$920.$0;
                    return $phi$921(($$compiler$prelude_jg$$Pair($phi$916.$0))(($$compiler$ast_jg$$setType($inl$$inl$_12_t_$u$385_$u$1912_$u$5068))($phi$916.$1)))
                  }));
                  return $phi$917
                }))($inl$_12_ds3_$u$388_$u$1927))
              })
            })
          })
        })((filter(function($inl$_12_d_$u$411_$u$1899){
          var $inl$_19_p_$u$24_$u$5075 = $inl$_12_d_$u$411_$u$1899;
          var $phi$922 = $inl$_12_d_$u$411_$u$1899;
          var $phi$923 = undefined;
          $phi$923 = $phi$922.$0;
          return (($$compiler$prelude_jg$$contains($instance$Eq$1))($phi$923))($inl$_12_cc_$u$408_$u$1896)
        }))(_12_ds_$u$397)))
      }
    }))(emptyArray))(_12_ccs_$u$400)
  }
};
var $$compiler$typer_jg$$newCtx = ((($$compiler$typer_jg$$ICtx($$compiler$typer_jg$$emptySubs))(emptyArray))(1))(function(_12_s_$u$72){
  return ($concat("unknown error context: "))(_12_s_$u$72)
});
var $$compiler$typer_jg$$classToBindings = function(_12_c_$u$537){
  var $phi$924 = _12_c_$u$537;
  var $phi$925 = undefined;
  $phi$925 = ((map(function($inl$_12_b_$u$543_$u$2004){
    var $phi$926 = $inl$_12_b_$u$543_$u$2004;
    var $phi$927 = undefined;
    var $inl$_12_ftv_$u$546_$u$2007 = $$compiler$typer_jg$$freeTVars($phi$926.$1);
    var $phi$928 = ((($$compiler$prelude_jg$$setContains($instance$Hashable$13))($instance$Eq$1))($phi$924.$2))($inl$_12_ftv_$u$546_$u$2007);
    var $phi$929 = undefined;
    if(!$phi$928){
      $phi$929 = (error(($concat(($concat(($concat("invalid clas definition "))($phi$924.$1)))(", binding ")))($phi$926.$0)))
    } else if($phi$928){
      var $inl$_19_x_$u$103_$u$5078 = (($$compiler$ast_jg$$TCBound($$compiler$prelude_jg$$Empty))($phi$924.$1))(($$compiler$ast_jg$$TVar($$compiler$prelude_jg$$Empty))($phi$924.$2));
      $phi$929 = (($$compiler$prelude_jg$$Pair($phi$926.$0))(((($$compiler$typer_jg$$mkTForall($$compiler$prelude_jg$$Empty))($$compiler$prelude_jg$$setToArray($inl$_12_ftv_$u$546_$u$2007)))((push($inl$_19_x_$u$103_$u$5078))(emptyArray)))($phi$926.$1)))
    } else error("pattern match fail",$phi$928);
    $phi$927 = $phi$929;
    return $phi$927
  }))($phi$924.$3));
  return $phi$925
};
var $$compiler$typer_jg$$emptyEnv = (($$compiler$typer_jg$$IEnv(empty))(emptyArray))($$compiler$prelude_jg$$Empty);
var $$compiler$typer_jg$$addInstance = function(_12_b_$u$157){
  return function(_12_env_$u$158){
    var $phi$930 = _12_env_$u$158;
    var $phi$931 = undefined;
    $phi$931 = ((($$compiler$typer_jg$$IEnv($phi$930.$0))((push(_12_b_$u$157))($phi$930.$1)))($phi$930.$2));
    return $phi$931
  }
};
var $$compiler$typer_jg$$inferTypeModule = function(_12_ms_$u$547){
  return function(_12_m_$u$548){
    var _12_addClass_$u$552 = function(_12_env_$u$582){
      return function(_12_c_$u$583){
        return ((foldl(function(_12_env_$u$584){
          return function(_12_b_$u$585){
            var $inl$_19_p_$u$24_$u$5079 = _12_b_$u$585;
            var $phi$932 = _12_b_$u$585;
            var $phi$933 = undefined;
            $phi$933 = $phi$932.$0;
            var $inl$_19_p_$u$27_$u$5082 = _12_b_$u$585;
            var $phi$934 = _12_b_$u$585;
            var $phi$935 = undefined;
            $phi$935 = $phi$934.$1;
            return (($$compiler$typer_jg$$addBinding($phi$933))($phi$935))(_12_env_$u$584)
          }
        }))(_12_env_$u$582))($$compiler$typer_jg$$classToBindings(_12_c_$u$583))
      }
    };
    var $phi$936 = _12_m_$u$548;
    var $phi$937 = undefined;
    var _12_env2_$u$609 = ((foldl(function($inl$_12_env_$u$559_$u$2012){
      return function($inl$_12_i_$u$560_$u$2013){
        var $phi$940 = $inl$_12_i_$u$560_$u$2013;
        var $phi$941 = undefined;
        if($phi$940.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
          $phi$941 = $phi$940.$1
        } else error("pattern match fail",$phi$940);
        var $phi$938 = ($$compiler$typer_jg$$getSafe($phi$941))(_12_ms_$u$547);
        var $phi$939 = undefined;
        var $phi$942 = $inl$_12_i_$u$560_$u$2013;
        var $phi$943 = undefined;
        if($phi$942.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
          $phi$943 = (((foldl(function($inl$_12_env_$u$570_$u$2023){
            return function($inl$_12_n_$u$571_$u$2024){
              var $phi$944 = $inl$_12_n_$u$571_$u$2024;
              var $phi$945 = undefined;
              $phi$945 = ((($$compiler$typer_jg$$addBinding($phi$944.$1))(($$compiler$typer_jg$$getSafe($phi$944.$0))($phi$938.$0)))($inl$_12_env_$u$570_$u$2023));
              return $phi$945
            }
          }))($inl$_12_env_$u$559_$u$2012))($phi$942.$2))
        } else error("pattern match fail",$phi$942);
        var $inl$_12_env2_$u$564_$u$2017 = $phi$943;
        var $inl$_12_env3_$u$565_$u$2018 = ((foldl(_12_addClass_$u$552))($inl$_12_env2_$u$564_$u$2017))($phi$938.$1);
        var $inl$_12_env4_$u$566_$u$2019 = ((foldl(function($inl$_12_env_$u$574_$u$2027){
          return function($inl$_12_i_$u$575_$u$2028){
            return ($$compiler$typer_jg$$addInstance($inl$_12_i_$u$575_$u$2028))($inl$_12_env_$u$574_$u$2027)
          }
        }))($inl$_12_env3_$u$565_$u$2018))($phi$938.$2);
        $phi$939 = $inl$_12_env4_$u$566_$u$2019;
        return $phi$939
      }
    }))($$compiler$typer_jg$$emptyEnv))($phi$936.$2);
    var _12_env3_$u$610 = ((foldl(function($inl$_12_env_$u$576_$u$2033){
      return function($inl$_12_dt_$u$577_$u$2034){
        return ((foldl(function($inl$_12_env_$u$578_$u$2035){
          return function($inl$_12_c_$u$579_$u$2036){
            var $phi$946 = $inl$_12_c_$u$579_$u$2036;
            var $phi$947 = undefined;
            $phi$947 = ((($$compiler$typer_jg$$addBinding($phi$946.$0))($phi$946.$1))($inl$_12_env_$u$578_$u$2035));
            return $phi$947
          }
        }))($inl$_12_env_$u$576_$u$2033))($$compiler$typer_jg$$conTypes($inl$_12_dt_$u$577_$u$2034))
      }
    }))(_12_env2_$u$609))($phi$936.$3);
    var _12_env4_$u$611 = ((foldl(_12_addClass_$u$552))(_12_env3_$u$610))($phi$936.$4);
    var _12_env5_$u$612 = ((foldl(function($inl$_12_env_$u$586_$u$2039){
      return function($inl$_12_i_$u$587_$u$2040){
        return ($$compiler$typer_jg$$addInstance($$compiler$typer_jg$$instanceToTypeBound($inl$_12_i_$u$587_$u$2040)))($inl$_12_env_$u$586_$u$2039)
      }
    }))(_12_env4_$u$611))($phi$936.$5);
    var _12_ds2_$u$613 = ($$compiler$prelude_jg$$evalState($$compiler$typer_jg$$newCtx))(($$compiler$typer_jg$$inferDefs(_12_env5_$u$612))($phi$936.$6));
    var _12_ds3_$u$614 = (map(function($inl$_12_d_$u$588_$u$2041){
      var $inl$_19_p_$u$27_$u$5088 = $inl$_12_d_$u$588_$u$2041;
      var $phi$950 = $inl$_12_d_$u$588_$u$2041;
      var $phi$951 = undefined;
      $phi$951 = $phi$950.$1;
      var $inl$_18_e_$u$129_$u$5085 = $phi$951;
      var $inl$_19_f_$u$0_$u$5086 = $$compiler$ast_jg$$getAnnType;
      var $phi$948 = (function($inl$_19_a_$u$1_$u$5087){
        return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$5087)
      })($$compiler$ast_jg$$annOf($inl$_18_e_$u$129_$u$5085));
      var $phi$949 = undefined;
      if($phi$948.$tag==$$compiler$ast_jg$$TForall.$tag){
        var $phi$952 = $phi$948.$3;
        var $phi$953 = undefined;
        if(($phi$952.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$952.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$952.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$phi$952.$1.$1.$1)))){
          $phi$953 = $inl$_12_d_$u$588_$u$2041
        } else {
          var $phi$954 = length($phi$948.$2);
          var $phi$955 = undefined;
          if(0==$phi$954){
            $phi$955 = $inl$_12_d_$u$588_$u$2041
          } else {
            var $inl$_19_p_$u$24_$u$5091 = $inl$_12_d_$u$588_$u$2041;
            var $phi$956 = $inl$_12_d_$u$588_$u$2041;
            var $phi$957 = undefined;
            $phi$957 = $phi$956.$0;
            var $inl$_19_p_$u$27_$u$5097 = $inl$_12_d_$u$588_$u$2041;
            var $phi$958 = $inl$_12_d_$u$588_$u$2041;
            var $phi$959 = undefined;
            $phi$959 = $phi$958.$1;
            var $inl$_18_e_$u$129_$u$5094 = $phi$959;
            var $inl$_19_f_$u$0_$u$5095 = $$compiler$ast_jg$$getAnnType;
            $phi$955 = (error(($concat(($concat(($concat("unsatisfied bounds in def of "))($phi$957)))(" :: ")))($$compiler$printer_jg$$printType((function($inl$_19_a_$u$1_$u$5096){
              return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$5096)
            })($$compiler$ast_jg$$annOf($inl$_18_e_$u$129_$u$5094))))))
          };
          $phi$953 = $phi$955
        };
        $phi$949 = $phi$953
      } else $phi$949 = $inl$_12_d_$u$588_$u$2041;
      return $phi$949
    }))(_12_ds2_$u$613);
    var _12_env6_$u$615 = ((foldl(function(_12_env_$u$617){
      return function(_12_d_$u$618){
        var $phi$960 = _12_d_$u$618;
        var $phi$961 = undefined;
        var $inl$_18_e_$u$129_$u$5100 = $phi$960.$1;
        var $inl$_19_f_$u$0_$u$5101 = $$compiler$ast_jg$$getAnnType;
        $phi$961 = ((($$compiler$typer_jg$$addBinding($phi$960.$0))((function($inl$_19_a_$u$1_$u$5102){
          return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$5102)
        })($$compiler$ast_jg$$annOf($phi$960.$1))))(_12_env_$u$617));
        return $phi$961
      }
    }))(_12_env5_$u$612))(_12_ds3_$u$614);
    var $inl$_12_cs_$u$504_$u$2055 = (concat($phi$936.$4))(($$compiler$prelude_jg$$concatMap(function(_12_i_$u$621){
      var $phi$964 = _12_i_$u$621;
      var $phi$965 = undefined;
      if($phi$964.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
        $phi$965 = $phi$964.$1
      } else error("pattern match fail",$phi$964);
      var $phi$962 = ($$compiler$typer_jg$$getSafe($phi$965))(_12_ms_$u$547);
      var $phi$963 = undefined;
      $phi$963 = $phi$962.$1;
      return $phi$963
    }))($phi$936.$2));
    var _12_ins2_$u$616 = (map(function($inl$_12_i_$u$505_$u$2056){
      var $phi$966 = $inl$_12_i_$u$505_$u$2056;
      var $phi$967 = undefined;
      var $phi$968 = ($$compiler$prelude_jg$$find(function($inl$_12_c_$u$514_$u$2065){
        var $phi$970 = $inl$_12_c_$u$514_$u$2065;
        var $phi$971 = undefined;
        var $phi$972 = $instance$Eq$1;
        var $phi$973 = undefined;
        $phi$973 = $phi$972.$0;
        $phi$971 = (($phi$973($phi$966.$1))($phi$970.$1));
        return $phi$971
      }))($inl$_12_cs_$u$504_$u$2055);
      var $phi$969 = undefined;
      if($phi$968.$tag==$$compiler$prelude_jg$$Nothing.$tag){
        $phi$969 = (error(($concat("Cannot find clas "))($phi$966.$1)))
      } else if($phi$968.$tag==$$compiler$prelude_jg$$Just.$tag){
        var $inl$_12_bs2_$u$523_$u$2074 = ((foldl(function($inl$_12_bs_$u$525_$u$2076){
          return function($inl$_12_b_$u$526_$u$2077){
            var $phi$974 = $inl$_12_b_$u$526_$u$2077;
            var $phi$975 = undefined;
            $phi$975 = (((set($phi$974.$0))((($$compiler$typer_jg$$substitute($phi$968.$0.$2))($phi$966.$2))($phi$974.$1)))($inl$_12_bs_$u$525_$u$2076));
            return $phi$975
          }
        }))(empty))($phi$968.$0.$3);
        var $inl$_12_ds2_$u$524_$u$2075 = (map(function($inl$_12_d_$u$529_$u$2080){
          var $phi$976 = $inl$_12_d_$u$529_$u$2080;
          var $phi$977 = undefined;
          var $inl$$inl$_12_e_$u$507_$u$2058_$u$5108 = ($$compiler$ast_jg$$setType(($$compiler$typer_jg$$getSafe($phi$976.$0))($inl$_12_bs2_$u$523_$u$2074)))($phi$976.$1);
          var $inl$_19_s_$u$145_$u$5118 = $$compiler$typer_jg$$newCtx;
          var $inl$_19_f_$u$0_$u$5116 = function($inl$_19_m_$u$146_$u$5119){
            var $phi$980 = $inl$_19_m_$u$146_$u$5119;
            var $phi$981 = undefined;
            $phi$981 = ($phi$980.$0($$compiler$typer_jg$$newCtx));
            return $phi$981
          };
          var $phi$978 = (function($inl$_19_a_$u$1_$u$5117){
            return $inl$_19_f_$u$0_$u$5116($inl$_19_a_$u$1_$u$5117)
          })(($$compiler$typer_jg$$infer(_12_env6_$u$615))($inl$$inl$_12_e_$u$507_$u$2058_$u$5108));
          var $phi$979 = undefined;
          var $phi$982 = $phi$978.$0;
          var $phi$983 = undefined;
          $phi$983 = $phi$982.$0;
          $phi$979 = (($$compiler$typer_jg$$applySubsE($phi$983))($phi$978.$1));
          $phi$977 = (($$compiler$prelude_jg$$Pair($phi$976.$0))($phi$979));
          return $phi$977
        }))($phi$966.$3);
        $phi$969 = (((($$compiler$ast_jg$$Instance($phi$966.$0))($phi$966.$1))($phi$966.$2))($inl$_12_ds2_$u$524_$u$2075))
      } else error("pattern match fail",$phi$968);
      $phi$967 = $phi$969;
      return $phi$967
    }))($phi$936.$5);
    $phi$937 = ((((((($$compiler$ast_jg$$Module($phi$936.$0))($phi$936.$1))($phi$936.$2))($phi$936.$3))($phi$936.$4))(_12_ins2_$u$616))(_12_ds3_$u$614));
    return $phi$937
  }
};
var $$compiler$importNormalizer_jg$$normalizeImports = function(_11_ms_$u$0){
  return function(_11_m_$u$1){
    var $phi$984 = _11_m_$u$1;
    var $phi$985 = undefined;
    var _11_getFromDefs_$u$9 = function(_11_ds_$u$15){
      return ((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))(emptyArray))((map(function(_11_v_$u$16){
        var $inl$_19_p_$u$27_$u$5121 = _11_v_$u$16;
        var $phi$986 = _11_v_$u$16;
        var $phi$987 = undefined;
        $phi$987 = $phi$986.$1;
        return $$compiler$typer_jg$$freeVars($phi$987)
      }))(_11_ds_$u$15))
    };
    var _11_freeVarsInDefs_$u$10 = _11_getFromDefs_$u$9($phi$984.$6);
    var _11_freeVarsInIns_$u$11 = ((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))(emptyArray))((map(function(_11_i_$u$17){
      var $phi$988 = _11_i_$u$17;
      var $phi$989 = undefined;
      $phi$989 = (_11_getFromDefs_$u$9($phi$988.$3));
      return $phi$989
    }))($phi$984.$5));
    var _11_fvs_$u$13 = (filter(function(_11_v_$u$22){
      var $inl$_19_b_$u$44_$u$5124 = (($$compiler$prelude_jg$$contains($instance$Eq$1))(_11_v_$u$22))(emptyArray);
      var $phi$990 = $inl$_19_b_$u$44_$u$5124;
      var $phi$991 = undefined;
      if($phi$990){
        $phi$991 = false
      } else if(!$phi$990){
        $phi$991 = true
      } else error("pattern match fail",$phi$990);
      return $phi$991
    }))(((($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1))(_11_freeVarsInDefs_$u$10))(_11_freeVarsInIns_$u$11));
    var $inl$_11_freeVars_$u$24_$u$2101 = _11_fvs_$u$13;
    var _11_is2_$u$14 = (map(function($inl$_11_i_$u$25_$u$2102){
      var $phi$992 = $inl$_11_i_$u$25_$u$2102;
      var $phi$993 = undefined;
      if($phi$992.$tag==$$compiler$ast_jg$$ImportClosed.$tag){
        $phi$993 = (error("closed imports not supported"))
      } else if($phi$992.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
        $phi$993 = ((($$compiler$ast_jg$$ImportOpen($phi$992.$0))($phi$992.$1))((map(function($inl$_11_p_$u$32_$u$2109){
          var $phi$998 = $inl$_11_p_$u$32_$u$2109;
          var $phi$999 = undefined;
          var $inl$_11_n_$u$47_$u$2124 = $phi$998.$0;
          $phi$999 = (($$compiler$prelude_jg$$Pair(($concat(($concat(((stringReplaceChar("/"))("$"))(((stringReplaceChar("."))("_"))($phi$992.$1))))("$$")))($inl$_11_n_$u$47_$u$2124)))($phi$998.$1));
          return $phi$999
        }))($phi$992.$2)))
      } else if(($phi$992.$tag==$$compiler$ast_jg$$ImportAll.$tag)&&("./builtins.js"==$phi$992.$1)){
        var $phi$996 = (get("./builtins.js"))(_11_ms_$u$0);
        var $phi$997 = undefined;
        $phi$997 = ((($$compiler$ast_jg$$ImportOpen($phi$992.$0))("./builtins.js"))((map(function($inl$_11_n_$u$39_$u$2116){
          return ($$compiler$prelude_jg$$Pair($inl$_11_n_$u$39_$u$2116))($inl$_11_n_$u$39_$u$2116)
        }))(keys($phi$996.$0))));
        $phi$993 = $phi$997
      } else if($phi$992.$tag==$$compiler$ast_jg$$ImportAll.$tag){
        var $phi$994 = (get($phi$992.$1))(_11_ms_$u$0);
        var $phi$995 = undefined;
        $phi$995 = ((($$compiler$ast_jg$$ImportOpen($phi$992.$0))($phi$992.$1))((map(function($inl$_11_n_$u$45_$u$2122){
          return ($$compiler$prelude_jg$$Pair($inl$_11_n_$u$45_$u$2122))((drop((length($phi$992.$1))+2))($inl$_11_n_$u$45_$u$2122))
        }))(keys($phi$994.$0))));
        $phi$993 = $phi$995
      } else error("pattern match fail",$phi$992);
      return $phi$993
    }))((enqueue(($$compiler$ast_jg$$ImportAll($$compiler$prelude_jg$$Empty))("./builtins.js")))($phi$984.$2));
    $phi$985 = ((((((($$compiler$ast_jg$$Module($phi$984.$0))($phi$984.$1))(_11_is2_$u$14))($phi$984.$3))($phi$984.$4))($phi$984.$5))($phi$984.$6));
    return $phi$985
  }
};
var $$compiler$declasser_jg$$rewriteExpr = function(_10_is_$u$105){
  return function(_10_env_$u$106){
    return function(_10_e_$u$107){
      var $inl$_10_setEnv_$u$201_$u$2295 = function($inl$_10_env_$u$96_$u$2386){
        return function($inl$_10_s_$u$97_$u$2387){
          var $phi$1000 = $inl$_10_s_$u$97_$u$2387;
          var $phi$1001 = undefined;
          $phi$1001 = ((($$compiler$declasser_jg$$S($inl$_10_env_$u$96_$u$2386))($phi$1000.$1))($phi$1000.$2));
          return $phi$1001
        }
      };
      var $inl$_19_x_$u$103_$u$5224 = _10_env_$u$106;
      var $inl$_19_p_$u$27_$u$5125 = ((((function($inl$_10_down_$u$202_$u$2296){
        return function($inl$_10_up_$u$203_$u$2297){
          return function($inl$_10_a_$u$204_$u$2298){
            return function($inl$_10_e_$u$205_$u$2299){
              var $inl$_10_exitScope_$u$208_$u$2300 = function($inl$_10_a_$u$219_$u$2307){
                var $inl$$inl$_10_s_$u$92_$u$2382_$u$5128 = $inl$_10_a_$u$219_$u$2307;
                var $phi$1002 = $inl$_10_a_$u$219_$u$2307;
                var $phi$1003 = undefined;
                $phi$1003 = $phi$1002.$0;
                return ($inl$_10_setEnv_$u$201_$u$2295($$compiler$prelude_jg$$tail($phi$1003)))($inl$_10_a_$u$219_$u$2307)
              };
              var $inl$_10_patBindings_$u$212_$u$2302 = function($inl$_10_p_$u$278_$u$2318){
                var $phi$1004 = $inl$_10_p_$u$278_$u$2318;
                var $phi$1005 = undefined;
                if($phi$1004.$tag==$$compiler$ast_jg$$PConst.$tag){
                  $phi$1005 = empty
                } else if($phi$1004.$tag==$$compiler$ast_jg$$PVar.$tag){
                  $phi$1005 = (((set($phi$1004.$1))($$compiler$ast_jg$$getAnnType($phi$1004.$0)))(empty))
                } else if($phi$1004.$tag==$$compiler$ast_jg$$PData.$tag){
                  $phi$1005 = (((foldr(function($inl$_10_env_$u$286_$u$2326){
                    return function($inl$_10_p_$u$287_$u$2327){
                      return (merge($inl$_10_patBindings_$u$212_$u$2302($inl$_10_p_$u$287_$u$2327)))($inl$_10_env_$u$286_$u$2326)
                    }
                  }))(empty))($phi$1004.$2))
                } else error("pattern match fail",$phi$1004);
                return $phi$1005
              };
              var $inl$_10_enterScope_$u$207_$u$2303 = function($inl$_10_bs_$u$215_$u$2328){
                return function($inl$_10_a_$u$216_$u$2329){
                  var $inl$$inl$_10_s_$u$92_$u$2382_$u$5132 = $inl$_10_a_$u$216_$u$2329;
                  var $phi$1006 = $inl$_10_a_$u$216_$u$2329;
                  var $phi$1007 = undefined;
                  $phi$1007 = $phi$1006.$0;
                  var $inl$_10_es_$u$217_$u$2330 = $phi$1007;
                  var $inl$_10_e_$u$218_$u$2331 = (merge($$compiler$prelude_jg$$head($inl$_10_es_$u$217_$u$2330)))($inl$_10_bs_$u$215_$u$2328);
                  return ($inl$_10_setEnv_$u$201_$u$2295((enqueue($inl$_10_e_$u$218_$u$2331))($inl$_10_es_$u$217_$u$2330)))($inl$_10_a_$u$216_$u$2329)
                }
              };
              var $inl$_10_go_$u$206_$u$2304 = function($inl$_10_a_$u$213_$u$2332){
                return function($inl$_10_e_$u$214_$u$2333){
                  return ((($$compiler$ast_jg$$breakableDownAndUp(function($inl$$inl$_10_a_$u$220_$u$2334_$u$5136){
                    return function($inl$$inl$_10_e_$u$221_$u$2335_$u$5137){
                      var $phi$1008 = ($inl$_10_down_$u$202_$u$2296($inl$$inl$_10_a_$u$220_$u$2334_$u$5136))($inl$$inl$_10_e_$u$221_$u$2335_$u$5137);
                      var $phi$1009 = undefined;
                      if($phi$1008.$tag==$$compiler$prelude_jg$$Right.$tag){
                        $phi$1009 = ($$compiler$prelude_jg$$Right($phi$1008.$0))
                      } else if($phi$1008.$tag==$$compiler$prelude_jg$$Left.$tag){
                        var $phi$1010 = $phi$1008.$0.$1;
                        var $phi$1011 = undefined;
                        if($phi$1010.$tag==$$compiler$ast_jg$$Lam.$tag){
                          var $inl$_18_e_$u$129_$u$5175 = $phi$1008.$0.$1;
                          var $inl$_19_f_$u$0_$u$5176 = $$compiler$ast_jg$$getAnnType;
                          var $phi$1024 = (function($inl$_19_a_$u$1_$u$5177){
                            return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$5177)
                          })($$compiler$ast_jg$$annOf($phi$1008.$0.$1));
                          var $phi$1025 = undefined;
                          if(($phi$1024.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$1024.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$1024.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$phi$1024.$1.$1.$1)))){
                            $phi$1025 = $phi$1024.$1.$2
                          } else if(($phi$1024.$tag==$$compiler$ast_jg$$TForall.$tag)&&(($phi$1024.$3.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$1024.$3.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$1024.$3.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$phi$1024.$3.$1.$1.$1))))){
                            $phi$1025 = $phi$1024.$3.$1.$2
                          } else $phi$1025 = $$compiler$ast_jg$$TUnknown;
                          var $inl$$inl$_10_t_$u$228_$u$2342_$u$5144 = $phi$1025;
                          $phi$1011 = ($$compiler$prelude_jg$$Left(($$compiler$prelude_jg$$Pair(($inl$_10_enterScope_$u$207_$u$2303(((set($phi$1010.$1))($inl$$inl$_10_t_$u$228_$u$2342_$u$5144))(empty)))($phi$1008.$0.$0)))($phi$1008.$0.$1)))
                        } else if($phi$1010.$tag==$$compiler$ast_jg$$Let.$tag){
                          var $inl$$inl$_10_ts_$u$246_$u$2360_$u$5162 = ((foldl(function($inl$$inl$_10_ts_$u$247_$u$2361_$u$5163){
                            return function($inl$$inl$_10_b_$u$248_$u$2362_$u$5164){
                              var $phi$1022 = $inl$$inl$_10_b_$u$248_$u$2362_$u$5164;
                              var $phi$1023 = undefined;
                              var $inl$_18_e_$u$129_$u$5178 = $phi$1022.$1;
                              var $inl$_19_f_$u$0_$u$5179 = $$compiler$ast_jg$$getAnnType;
                              $phi$1023 = (((set($phi$1022.$0))((function($inl$_19_a_$u$1_$u$5180){
                                return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$5180)
                              })($$compiler$ast_jg$$annOf($phi$1022.$1))))($inl$$inl$_10_ts_$u$247_$u$2361_$u$5163));
                              return $phi$1023
                            }
                          }))(empty))($phi$1010.$1);
                          $phi$1011 = ($$compiler$prelude_jg$$Left(($$compiler$prelude_jg$$Pair(($inl$_10_enterScope_$u$207_$u$2303($inl$$inl$_10_ts_$u$246_$u$2360_$u$5162))($phi$1008.$0.$0)))($phi$1008.$0.$1)))
                        } else if($phi$1010.$tag==$$compiler$ast_jg$$Case.$tag){
                          var $phi$1012 = ($inl$_10_go_$u$206_$u$2304($phi$1008.$0.$0))($phi$1010.$1);
                          var $phi$1013 = undefined;
                          var $phi$1014 = ((foldl(function($inl$$inl$_10_ar_$u$259_$u$2373_$u$5181){
                            return function($inl$$inl$_10_pat_$u$260_$u$2374_$u$5182){
                              var $phi$1016 = $inl$$inl$_10_ar_$u$259_$u$2373_$u$5181;
                              var $phi$1017 = undefined;
                              var $phi$1018 = $inl$$inl$_10_pat_$u$260_$u$2374_$u$5182;
                              var $phi$1019 = undefined;
                              var $inl$$inl$_10_bs_$u$265_$u$2379_$u$5187 = $inl$_10_patBindings_$u$212_$u$2302($phi$1018.$0);
                              var $phi$1020 = ($inl$_10_go_$u$206_$u$2304(($inl$_10_enterScope_$u$207_$u$2303($inl$$inl$_10_bs_$u$265_$u$2379_$u$5187))($phi$1016.$0)))($phi$1018.$1);
                              var $phi$1021 = undefined;
                              $phi$1021 = (($$compiler$prelude_jg$$Pair($inl$_10_exitScope_$u$208_$u$2300($phi$1020.$0)))((push(($$compiler$prelude_jg$$Pair($phi$1018.$0))($phi$1020.$1)))($phi$1016.$1)));
                              $phi$1019 = $phi$1021;
                              $phi$1017 = $phi$1019;
                              return $phi$1017
                            }
                          }))(($$compiler$prelude_jg$$Pair($phi$1012.$0))(emptyArray)))($phi$1010.$2);
                          var $phi$1015 = undefined;
                          $phi$1015 = ($$compiler$prelude_jg$$Right(($$compiler$prelude_jg$$Pair($phi$1014.$0))((($$compiler$ast_jg$$Case($phi$1010.$0))($phi$1012.$1))($phi$1014.$1))));
                          $phi$1013 = $phi$1015;
                          $phi$1011 = $phi$1013
                        } else $phi$1011 = ($$compiler$prelude_jg$$Left(($$compiler$prelude_jg$$Pair($phi$1008.$0.$0))($phi$1008.$0.$1)));
                        $phi$1009 = $phi$1011
                      } else error("pattern match fail",$phi$1008);
                      return $phi$1009
                    }
                  }))(function($inl$$inl$_10_a_$u$268_$u$2308_$u$5190){
                    return function($inl$$inl$_10_e_$u$269_$u$2309_$u$5191){
                      var $phi$1026 = $inl$$inl$_10_e_$u$269_$u$2309_$u$5191;
                      var $phi$1027 = undefined;
                      if($phi$1026.$tag==$$compiler$ast_jg$$Lam.$tag){
                        $phi$1027 = ($inl$_10_exitScope_$u$208_$u$2300($inl$$inl$_10_a_$u$268_$u$2308_$u$5190))
                      } else if($phi$1026.$tag==$$compiler$ast_jg$$Let.$tag){
                        $phi$1027 = ($inl$_10_exitScope_$u$208_$u$2300($inl$$inl$_10_a_$u$268_$u$2308_$u$5190))
                      } else $phi$1027 = $inl$$inl$_10_a_$u$268_$u$2308_$u$5190;
                      var $inl$$inl$_10_a2_$u$270_$u$2310_$u$5192 = $phi$1027;
                      return ($inl$_10_up_$u$203_$u$2297($inl$$inl$_10_a2_$u$270_$u$2310_$u$5192))($inl$$inl$_10_e_$u$269_$u$2309_$u$5191)
                    }
                  }))($inl$_10_a_$u$213_$u$2332))($inl$_10_e_$u$214_$u$2333)
                }
              };
              return ($inl$_10_go_$u$206_$u$2304($inl$_10_a_$u$204_$u$2298))($inl$_10_e_$u$205_$u$2299)
            }
          }
        }
      })(function(_10_a_$u$186){
        return function(_10_e_$u$187){
          var $inl$_10_e_$u$152_$u$2392 = _10_e_$u$187;
          var $inl$_18_e_$u$129_$u$5215 = $inl$_10_e_$u$152_$u$2392;
          var $inl$_19_f_$u$0_$u$5216 = $$compiler$ast_jg$$getAnnType;
          var $phi$1028 = (function($inl$_19_a_$u$1_$u$5217){
            return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$5217)
          })($$compiler$ast_jg$$annOf($inl$_10_e_$u$152_$u$2392));
          var $phi$1029 = undefined;
          if($phi$1028.$tag==$$compiler$ast_jg$$TForall.$tag){
            var $phi$1030 = (($$compiler$prelude_jg$$$gt($instance$Ord$2))(length($phi$1028.$2)))(0);
            var $phi$1031 = undefined;
            if(!$phi$1030){
              $phi$1031 = (($$compiler$prelude_jg$$Pair(_10_a_$u$186))($inl$_10_e_$u$152_$u$2392))
            } else if($phi$1030){
              $phi$1031 = (((foldr(function($inl$_10_ae_$u$158_$u$2398){
                return function($inl$_10_ib_$u$159_$u$2399){
                  var $phi$1032 = $inl$_10_ib_$u$159_$u$2399;
                  var $phi$1033 = undefined;
                  var $phi$1034 = $inl$_10_ae_$u$158_$u$2398;
                  var $phi$1035 = undefined;
                  var $inl$_10_a_$u$126_$u$2407 = $phi$1034.$0;
                  var $phi$1038 = $inl$_10_a_$u$126_$u$2407;
                  var $phi$1039 = undefined;
                  var $inl$_10_b_$u$336_$u$2413 = $phi$1032.$1;
                  var $phi$1040 = $inl$_10_b_$u$336_$u$2413;
                  var $phi$1041 = undefined;
                  $phi$1041 = (($concat(($concat(($concat("local$instance$"))($phi$1040.$1)))("$")))(intToString($phi$1038.$2)));
                  var $inl$_10_name_$u$130_$u$2411 = $phi$1041;
                  $phi$1039 = (($$compiler$prelude_jg$$Pair((($$compiler$declasser_jg$$S($phi$1038.$0))((push(($$compiler$prelude_jg$$Pair($inl$_10_name_$u$130_$u$2411))($phi$1032.$1)))($phi$1038.$1)))($phi$1038.$2+1)))($inl$_10_name_$u$130_$u$2411));
                  var $phi$1036 = $phi$1039;
                  var $phi$1037 = undefined;
                  $phi$1037 = (($$compiler$prelude_jg$$Pair($phi$1036.$0))((($$compiler$ast_jg$$Lam($$compiler$prelude_jg$$Empty))($phi$1036.$1))($phi$1034.$1)));
                  $phi$1035 = $phi$1037;
                  $phi$1033 = $phi$1035;
                  return $phi$1033
                }
              }))(($$compiler$prelude_jg$$Pair(_10_a_$u$186))(($$compiler$ast_jg$$setType($phi$1028.$3))($inl$_10_e_$u$152_$u$2392))))($$compiler$prelude_jg$$zipWithIndex($phi$1028.$2)))
            } else error("pattern match fail",$phi$1030);
            $phi$1029 = $phi$1031
          } else $phi$1029 = (($$compiler$prelude_jg$$Pair(_10_a_$u$186))($inl$_10_e_$u$152_$u$2392));
          return $$compiler$prelude_jg$$Left($phi$1029)
        }
      }))(function($inl$_10_a_$u$166_$u$2417){
        return function($inl$_10_e_$u$167_$u$2418){
          var $phi$1042 = $inl$_10_e_$u$167_$u$2418;
          var $phi$1043 = undefined;
          if($phi$1042.$tag==$$compiler$ast_jg$$Var.$tag){
            var $inl$_18_e_$u$129_$u$5218 = $inl$_10_e_$u$167_$u$2418;
            var $inl$_19_f_$u$0_$u$5219 = $$compiler$ast_jg$$getAnnType;
            var $phi$1048 = (function($inl$_19_a_$u$1_$u$5220){
              return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$5220)
            })($$compiler$ast_jg$$annOf($inl$_10_e_$u$167_$u$2418));
            var $phi$1049 = undefined;
            if($phi$1048.$tag==$$compiler$ast_jg$$TForall.$tag){
              $phi$1049 = (($$compiler$prelude_jg$$Pair($inl$_10_a_$u$166_$u$2417))($inl$_10_e_$u$167_$u$2418))
            } else {
              var $phi$1050 = $inl$_10_a_$u$166_$u$2417;
              var $phi$1051 = undefined;
              $phi$1051 = $phi$1050.$0;
              var $inl$_10_envs_$u$117_$u$2438 = $phi$1051;
              var $inl$_10_env_$u$118_$u$2439 = $$compiler$prelude_jg$$head($inl$_10_envs_$u$117_$u$2438);
              var $phi$1052 = (has($phi$1042.$1))($inl$_10_env_$u$118_$u$2439);
              var $phi$1053 = undefined;
              if(!$phi$1052){
                $phi$1053 = (error(($concat(($concat(($concat("no "))($phi$1042.$1)))(" in env ")))(jsonStringify(keys($inl$_10_env_$u$118_$u$2439)))))
              } else if($phi$1052){
                $phi$1053 = ((get($phi$1042.$1))($inl$_10_env_$u$118_$u$2439))
              } else error("pattern match fail",$phi$1052);
              var $inl$_10_t_$u$175_$u$2426 = $phi$1053;
              var $inl$_10_td_$u$143_$u$2445 = $inl$_10_t_$u$175_$u$2426;
              var $inl$_10_t_$u$189_$u$2454 = $inl$_10_td_$u$143_$u$2445;
              var $phi$1056 = $inl$_10_t_$u$189_$u$2454;
              var $phi$1057 = undefined;
              if($phi$1056.$tag==$$compiler$ast_jg$$TForall.$tag){
                var $inl$_10_subs_$u$194_$u$2459 = ((foldl(function($inl$_10_subs_$u$195_$u$2460){
                  return function($inl$_10_v_$u$196_$u$2461){
                    return ((($$compiler$typer_jg$$addSub(function($inl$_10_s_$u$197_$u$2462){
                      return ($concat("declasser: "))($inl$_10_s_$u$197_$u$2462)
                    }))($inl$_10_v_$u$196_$u$2461))(($$compiler$ast_jg$$TVar($$compiler$prelude_jg$$Empty))(($concat("ins$"))($inl$_10_v_$u$196_$u$2461))))($inl$_10_subs_$u$195_$u$2460)
                  }
                }))($$compiler$typer_jg$$emptySubs))($phi$1056.$1);
                $phi$1057 = (($$compiler$typer_jg$$applySubs($inl$_10_subs_$u$194_$u$2459))(((($$compiler$ast_jg$$TForall($phi$1056.$0))((map(function($inl$_10_v_$u$198_$u$2463){
                  return ($concat("ins$"))($inl$_10_v_$u$198_$u$2463)
                }))($phi$1056.$1)))($phi$1056.$2))($phi$1056.$3)))
              } else $phi$1057 = $inl$_10_t_$u$189_$u$2454;
              var $phi$1054 = $phi$1057;
              var $phi$1055 = undefined;
              if($phi$1054.$tag==$$compiler$ast_jg$$TForall.$tag){
                var $inl$_10_subs_$u$148_$u$2450 = (($$compiler$typer_jg$$unify(function($inl$_10_s_$u$149_$u$2451){
                  return ($concat("declasser: "))($inl$_10_s_$u$149_$u$2451)
                }))($phi$1048))($phi$1054.$3);
                $phi$1055 = ((map($$compiler$typer_jg$$applySubsBound($inl$_10_subs_$u$148_$u$2450)))($phi$1054.$2))
              } else $phi$1055 = emptyArray;
              var $inl$_10_is_$u$176_$u$2427 = $phi$1055;
              var $inl$_10_mis_$u$177_$u$2428 = (map(function($inl$_10_b_$u$179_$u$2430){
                var $inl$_10_a_$u$132_$u$2466 = $inl$_10_a_$u$166_$u$2417;
                var $phi$1058 = $inl$_10_a_$u$132_$u$2466;
                var $phi$1059 = undefined;
                var $phi$1060 = ($$compiler$prelude_jg$$find(function($inl$_10_p_$u$136_$u$2470){
                  var $phi$1062 = $inl$_10_p_$u$136_$u$2470;
                  var $phi$1063 = undefined;
                  $phi$1063 = (($$compiler$typer_jg$$satisfiesBound($phi$1062.$1))($inl$_10_b_$u$179_$u$2430));
                  return $phi$1063
                }))($phi$1058.$1);
                var $phi$1061 = undefined;
                if($phi$1060.$tag==$$compiler$prelude_jg$$Just.$tag){
                  $phi$1061 = $phi$1060.$0.$0
                } else $phi$1061 = (error(($concat("declasser failed to find satisfying instance for "))($$compiler$printer_jg$$printTypeBound($inl$_10_b_$u$179_$u$2430))));
                $phi$1059 = $phi$1061;
                return $phi$1059
              }))($inl$_10_is_$u$176_$u$2427);
              var $inl$_10_e2_$u$178_$u$2429 = ((foldl(function($inl$_10_e_$u$180_$u$2431){
                return function($inl$_10_v_$u$181_$u$2432){
                  return (($$compiler$ast_jg$$App($$compiler$prelude_jg$$Empty))($inl$_10_e_$u$180_$u$2431))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))($inl$_10_v_$u$181_$u$2432))
                }
              }))($inl$_10_e_$u$167_$u$2418))($inl$_10_mis_$u$177_$u$2428);
              $phi$1049 = (($$compiler$prelude_jg$$Pair($inl$_10_a_$u$166_$u$2417))($inl$_10_e2_$u$178_$u$2429))
            };
            $phi$1043 = $phi$1049
          } else if($phi$1042.$tag==$$compiler$ast_jg$$Lam.$tag){
            var $inl$_10_a_$u$120_$u$2477 = $inl$_10_a_$u$166_$u$2417;
            var $phi$1044 = $inl$_10_a_$u$120_$u$2477;
            var $phi$1045 = undefined;
            $phi$1045 = ((($$compiler$declasser_jg$$S($phi$1044.$0))((filter(function($inl$_10_p_$u$124_$u$2481){
              var $inl$_19_p_$u$24_$u$5221 = $inl$_10_p_$u$124_$u$2481;
              var $phi$1046 = $inl$_10_p_$u$124_$u$2481;
              var $phi$1047 = undefined;
              $phi$1047 = $phi$1046.$0;
              return (($$compiler$prelude_jg$$$div$eq($instance$Eq$1))($phi$1047))($phi$1042.$1)
            }))($phi$1044.$1)))($phi$1044.$2));
            $phi$1043 = (($$compiler$prelude_jg$$Pair($phi$1045))($inl$_10_e_$u$167_$u$2418))
          } else $phi$1043 = (($$compiler$prelude_jg$$Pair($inl$_10_a_$u$166_$u$2417))($inl$_10_e_$u$167_$u$2418));
          return $phi$1043
        }
      }))((($$compiler$declasser_jg$$S((push(_10_env_$u$106))(emptyArray)))(_10_is_$u$105))(0)))(_10_e_$u$107);
      var $phi$1064 = $inl$_19_p_$u$27_$u$5125;
      var $phi$1065 = undefined;
      $phi$1065 = $phi$1064.$1;
      return $phi$1065
    }
  }
};
var $$compiler$declasser_jg$$instanceName = function(_10_ix_$u$329){
  return function(_10_i_$u$330){
    var $phi$1066 = _10_i_$u$330;
    var $phi$1067 = undefined;
    $phi$1067 = (($concat(($concat(($concat("$instance$"))($phi$1066.$1)))("$")))(intToString(_10_ix_$u$329)));
    return $phi$1067
  }
};
var $$compiler$declasser_jg$$declassModule = function(_10_ms_$u$0){
  return function(_10_m_$u$1){
    var $phi$1068 = _10_m_$u$1;
    var $phi$1069 = undefined;
    var _10_isi_$u$9 = ((foldl(function($inl$_10_isi_$u$33_$u$2570){
      return function($inl$_10_ixi_$u$34_$u$2571){
        var $phi$1070 = $inl$_10_isi_$u$33_$u$2570;
        var $phi$1071 = undefined;
        var $phi$1072 = $inl$_10_ixi_$u$34_$u$2571;
        var $phi$1073 = undefined;
        if($phi$1072.$1.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
          var $phi$1074 = (get($phi$1072.$1.$1))(_10_ms_$u$0);
          var $phi$1075 = undefined;
          var $inl$_10_imix_$u$53_$u$2590 = $phi$1072.$0;
          var $phi$1076 = ((foldl(function($inl$_10_nbs_$u$54_$u$2591){
            return function($inl$_10_ib_$u$55_$u$2592){
              var $phi$1078 = $inl$_10_nbs_$u$54_$u$2591;
              var $phi$1079 = undefined;
              var $phi$1080 = $inl$_10_ib_$u$55_$u$2592;
              var $phi$1081 = undefined;
              var $inl$_10_inix_$u$346_$u$2600 = $phi$1080.$0;
              var $inl$_10_alias_$u$61_$u$2597 = (function($inl$_10_b_$u$347_$u$2601){
                var $phi$1082 = $inl$_10_b_$u$347_$u$2601;
                var $phi$1083 = undefined;
                $phi$1083 = (($concat(($concat(($concat(($concat(($concat("$import"))(intToString($phi$1072.$0))))("$instance$")))($phi$1082.$1)))("$")))(intToString($inl$_10_inix_$u$346_$u$2600)));
                return $phi$1083
              })($phi$1080.$1);
              var $inl$_10_i_$u$341_$u$2606 = $phi$1080.$1;
              var $phi$1084 = $inl$_10_i_$u$341_$u$2606;
              var $phi$1085 = undefined;
              $phi$1085 = (($concat(($concat(($concat("$instance$"))($phi$1084.$1)))("$")))(intToString($phi$1080.$0)));
              var $inl$_10_symbol_$u$60_$u$2598 = $phi$1085;
              $phi$1081 = (($$compiler$prelude_jg$$Pair((push(($$compiler$prelude_jg$$Pair($inl$_10_symbol_$u$60_$u$2598))($inl$_10_alias_$u$61_$u$2597)))($phi$1078.$0)))((push(($$compiler$prelude_jg$$Pair($inl$_10_alias_$u$61_$u$2597))($phi$1080.$1)))($phi$1078.$1)));
              $phi$1079 = $phi$1081;
              return $phi$1079
            }
          }))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray)))($$compiler$prelude_jg$$zipWithIndex($phi$1074.$2));
          var $phi$1077 = undefined;
          var $inl$_10_cns_$u$46_$u$2583 = (map(function($inl$_10_n_$u$47_$u$2584){
            return ($$compiler$prelude_jg$$Pair($inl$_10_n_$u$47_$u$2584))($inl$_10_n_$u$47_$u$2584)
          }))(($$compiler$prelude_jg$$concatMap(function($inl$_10_c_$u$48_$u$2585){
            var $phi$1086 = $inl$_10_c_$u$48_$u$2585;
            var $phi$1087 = undefined;
            $phi$1087 = ((enqueue(($concat("$class$"))($phi$1086.$1)))((map(function($inl$_19_p_$u$24_$u$5225){
              var $phi$1088 = $inl$_19_p_$u$24_$u$5225;
              var $phi$1089 = undefined;
              $phi$1089 = $phi$1088.$0;
              return $phi$1089
            }))($phi$1086.$3)));
            return $phi$1087
          }))($phi$1074.$1));
          $phi$1077 = (($$compiler$prelude_jg$$Pair((push((($$compiler$ast_jg$$ImportOpen($phi$1072.$1.$0))($phi$1072.$1.$1))((concat($phi$1072.$1.$2))((concat($phi$1076.$0))($inl$_10_cns_$u$46_$u$2583)))))($phi$1070.$0)))((concat($phi$1070.$1))($phi$1076.$1)));
          $phi$1075 = $phi$1077;
          $phi$1073 = $phi$1075
        } else error("pattern match fail",$phi$1072);
        $phi$1071 = $phi$1073;
        return $phi$1071
      }
    }))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray)))($$compiler$prelude_jg$$zipWithIndex($phi$1068.$2));
    var $inl$_19_p_$u$27_$u$5228 = _10_isi_$u$9;
    var $phi$1090 = _10_isi_$u$9;
    var $phi$1091 = undefined;
    $phi$1091 = $phi$1090.$1;
    var _10_importedInstances_$u$11 = $phi$1091;
    var _10_availableInstances_$u$14 = (concat(_10_importedInstances_$u$11))((map(function(_10_p_$u$21){
      var $phi$1092 = _10_p_$u$21;
      var $phi$1093 = undefined;
      $phi$1093 = (($$compiler$prelude_jg$$Pair(($$compiler$declasser_jg$$instanceName($phi$1092.$0))($phi$1092.$1)))($$compiler$typer_jg$$instanceToTypeBound($phi$1092.$1)));
      return $phi$1093
    }))($$compiler$prelude_jg$$zipWithIndex($phi$1068.$5)));
    var _10_classesAsData_$u$12 = (map(function($inl$_10_c_$u$62_$u$2611){
      var $phi$1094 = $inl$_10_c_$u$62_$u$2611;
      var $phi$1095 = undefined;
      var $inl$_10_ps_$u$68_$u$2616 = (map(function($inl$_19_p_$u$27_$u$5231){
        var $phi$1096 = $inl$_19_p_$u$27_$u$5231;
        var $phi$1097 = undefined;
        $phi$1097 = $phi$1096.$1;
        return $phi$1097
      }))(sort($$compiler$typer_jg$$classToBindings($inl$_10_c_$u$62_$u$2611)));
      var $inl$_10_name_$u$67_$u$2617 = ($concat("$class$"))($phi$1094.$1);
      var $inl$_19_x_$u$103_$u$5234 = $phi$1094.$2;
      var $inl$_19_x_$u$103_$u$5235 = (($$compiler$ast_jg$$DataCon($$compiler$prelude_jg$$Empty))($inl$_10_name_$u$67_$u$2617))($inl$_10_ps_$u$68_$u$2616);
      $phi$1095 = (((($$compiler$ast_jg$$Data($$compiler$prelude_jg$$Empty))($inl$_10_name_$u$67_$u$2617))((push($phi$1094.$2))(emptyArray)))((push($inl$_19_x_$u$103_$u$5235))(emptyArray)));
      return $phi$1095
    }))($phi$1068.$4);
    var _10_dt2_$u$15 = (concat($phi$1068.$3))(_10_classesAsData_$u$12);
    var _10_dataFuns_$u$16 = ($$compiler$prelude_jg$$concatMap($$compiler$typer_jg$$conTypes))(_10_dt2_$u$15);
    var _10_classFuns_$u$13 = ($$compiler$prelude_jg$$concatMap(function($inl$_10_c_$u$69_$u$2619){
      var $phi$1098 = $inl$_10_c_$u$69_$u$2619;
      var $phi$1099 = undefined;
      var $phi$1100 = $inl$_10_c_$u$69_$u$2619;
      var $phi$1101 = undefined;
      $phi$1101 = (($concat("$class$"))($phi$1100.$1));
      var $inl$_10_name_$u$74_$u$2624 = $phi$1101;
      var $inl$_10_bsForPat_$u$75_$u$2625 = (map(function($inl$_10_b_$u$78_$u$2628){
        var $inl$_19_p_$u$24_$u$5236 = $inl$_10_b_$u$78_$u$2628;
        var $phi$1102 = $inl$_10_b_$u$78_$u$2628;
        var $phi$1103 = undefined;
        $phi$1103 = $phi$1102.$0;
        return ($$compiler$ast_jg$$PVar($$compiler$prelude_jg$$Empty))(($concat($phi$1103))("_"))
      }))(sort($phi$1098.$3));
      var $inl$_10_v_$u$76_$u$2626 = ($concat("x_"))($inl$_10_name_$u$74_$u$2624);
      $phi$1099 = ((map(function($inl$$inl$_10_b_$u$79_$u$2629_$u$5240){
        var $phi$1104 = $inl$$inl$_10_b_$u$79_$u$2629_$u$5240;
        var $phi$1105 = undefined;
        var $inl$_19_x_$u$103_$u$5243 = ($$compiler$prelude_jg$$Pair((($$compiler$ast_jg$$PData($$compiler$prelude_jg$$Empty))($inl$_10_name_$u$74_$u$2624))($inl$_10_bsForPat_$u$75_$u$2625)))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))(($concat($phi$1104.$0))("_")));
        $phi$1105 = (($$compiler$prelude_jg$$Pair($phi$1104.$0))(($$compiler$ast_jg$$setType($phi$1104.$1))((($$compiler$ast_jg$$Lam($$compiler$prelude_jg$$Empty))($inl$_10_v_$u$76_$u$2626))((($$compiler$ast_jg$$Case($$compiler$prelude_jg$$Empty))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))($inl$_10_v_$u$76_$u$2626)))((push($inl$_19_x_$u$103_$u$5243))(emptyArray))))));
        return $phi$1105
      }))($$compiler$typer_jg$$classToBindings($inl$_10_c_$u$69_$u$2619)));
      return $phi$1099
    }))($phi$1068.$4);
    var $inl$_10_is_$u$289_$u$2639 = $phi$1068.$2;
    var _10_env_$u$17 = ((foldl(function(_10_env_$u$24){
      return function(_10_b_$u$25){
        var $phi$1106 = _10_b_$u$25;
        var $phi$1107 = undefined;
        var $inl$_18_e_$u$129_$u$5244 = $phi$1106.$1;
        var $inl$_19_f_$u$0_$u$5245 = $$compiler$ast_jg$$getAnnType;
        $phi$1107 = (((set($phi$1106.$0))((function($inl$_19_a_$u$1_$u$5246){
          return $$compiler$ast_jg$$getAnnType($inl$_19_a_$u$1_$u$5246)
        })($$compiler$ast_jg$$annOf($phi$1106.$1))))(_10_env_$u$24));
        return $phi$1107
      }
    }))(((foldl(function($inl$$inl$_10_env_$u$306_$u$2656_$u$5272){
      return function($inl$$inl$_10_i_$u$307_$u$2657_$u$5273){
        var $inl$$inl$_10_i_$u$293_$u$2643_$u$5289 = $inl$$inl$_10_i_$u$307_$u$2657_$u$5273;
        var $phi$1110 = $inl$$inl$_10_i_$u$307_$u$2657_$u$5273;
        var $phi$1111 = undefined;
        if($phi$1110.$tag==$$compiler$ast_jg$$ImportAll.$tag){
          $phi$1111 = $phi$1110.$1
        } else if($phi$1110.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
          $phi$1111 = $phi$1110.$1
        } else if($phi$1110.$tag==$$compiler$ast_jg$$ImportClosed.$tag){
          $phi$1111 = $phi$1110.$1
        } else error("pattern match fail",$phi$1110);
        var $phi$1108 = (get($phi$1111))(_10_ms_$u$0);
        var $phi$1109 = undefined;
        var $phi$1112 = $inl$$inl$_10_i_$u$307_$u$2657_$u$5273;
        var $phi$1113 = undefined;
        if($phi$1112.$tag==$$compiler$ast_jg$$ImportAll.$tag){
          $phi$1113 = ((merge($inl$$inl$_10_env_$u$306_$u$2656_$u$5272))($phi$1108.$0))
        } else if($phi$1112.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
          $phi$1113 = (((foldl(function($inl$$inl$_10_env_$u$318_$u$2668_$u$5284){
            return function($inl$$inl$_10_n_$u$319_$u$2669_$u$5285){
              var $phi$1114 = $inl$$inl$_10_n_$u$319_$u$2669_$u$5285;
              var $phi$1115 = undefined;
              $phi$1115 = (((set($phi$1114.$1))((get($phi$1114.$0))($phi$1108.$0)))($inl$$inl$_10_env_$u$318_$u$2668_$u$5284));
              return $phi$1115
            }
          }))($inl$$inl$_10_env_$u$306_$u$2656_$u$5272))($phi$1112.$2))
        } else $phi$1113 = (error("import type not supported in type inference"));
        var $inl$$inl$_10_env2_$u$311_$u$2661_$u$5277 = $phi$1113;
        var $inl$$inl$_10_env3_$u$312_$u$2662_$u$5278 = ((foldl(function($inl$$inl$_10_env_$u$302_$u$2652_$u$5298){
          return function($inl$$inl$_10_c_$u$303_$u$2653_$u$5299){
            return ((foldl(function($inl$$inl$_10_env_$u$304_$u$2654_$u$5300){
              return function($inl$$inl$_10_b_$u$305_$u$2655_$u$5301){
                var $inl$_19_p_$u$24_$u$5302 = $inl$$inl$_10_b_$u$305_$u$2655_$u$5301;
                var $phi$1116 = $inl$$inl$_10_b_$u$305_$u$2655_$u$5301;
                var $phi$1117 = undefined;
                $phi$1117 = $phi$1116.$0;
                var $inl$_19_p_$u$27_$u$5305 = $inl$$inl$_10_b_$u$305_$u$2655_$u$5301;
                var $phi$1118 = $inl$$inl$_10_b_$u$305_$u$2655_$u$5301;
                var $phi$1119 = undefined;
                $phi$1119 = $phi$1118.$1;
                return ((set($phi$1117))($phi$1119))($inl$$inl$_10_env_$u$304_$u$2654_$u$5300)
              }
            }))($inl$$inl$_10_env_$u$302_$u$2652_$u$5298))($$compiler$typer_jg$$classToBindings($inl$$inl$_10_c_$u$303_$u$2653_$u$5299))
          }
        }))($inl$$inl$_10_env2_$u$311_$u$2661_$u$5277))($phi$1108.$1);
        $phi$1109 = $inl$$inl$_10_env3_$u$312_$u$2662_$u$5278;
        return $phi$1109
      }
    }))(empty))((enqueue(($$compiler$ast_jg$$ImportAll($$compiler$prelude_jg$$Empty))("./builtins.js")))($inl$_10_is_$u$289_$u$2639))))((concat(_10_classFuns_$u$13))($phi$1068.$6));
    var _10_env2_$u$18 = (merge(_10_env_$u$17))($$compiler$prelude_jg$$toRecord(_10_dataFuns_$u$16));
    var _10_instancesAsDefs_$u$20 = (map(function(_10_p_$u$29){
      var $phi$1120 = _10_p_$u$29;
      var $phi$1121 = undefined;
      var $inl$_10_env_$u$83_$u$2674 = _10_env2_$u$18;
      $phi$1121 = (((function($inl$_10_ix_$u$84_$u$2675){
        return function($inl$_10_i_$u$85_$u$2676){
          var $phi$1122 = $inl$_10_i_$u$85_$u$2676;
          var $phi$1123 = undefined;
          var $inl$_10_args_$u$91_$u$2681 = (map(($$compiler$declasser_jg$$rewriteExpr(_10_availableInstances_$u$14))($inl$_10_env_$u$83_$u$2674)))((map(function($inl$_19_p_$u$27_$u$5308){
            var $phi$1124 = $inl$_19_p_$u$27_$u$5308;
            var $phi$1125 = undefined;
            $phi$1125 = $phi$1124.$1;
            return $phi$1125
          }))(sort($phi$1122.$3)));
          var $inl$_10_name_$u$90_$u$2682 = ($$compiler$declasser_jg$$instanceName($inl$_10_ix_$u$84_$u$2675))($inl$_10_i_$u$85_$u$2676);
          $phi$1123 = (($$compiler$prelude_jg$$Pair($inl$_10_name_$u$90_$u$2682))(((foldl($$compiler$ast_jg$$App($$compiler$prelude_jg$$Empty)))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))(($concat("$class$"))($phi$1122.$1))))($inl$_10_args_$u$91_$u$2681)));
          return $phi$1123
        }
      })($phi$1120.$0))($phi$1120.$1));
      return $phi$1121
    }))($$compiler$prelude_jg$$zipWithIndex($phi$1068.$5));
    var _10_ds2_$u$19 = (map(function(_10_d_$u$28){
      var $inl$_19_p_$u$24_$u$5311 = _10_d_$u$28;
      var $phi$1126 = _10_d_$u$28;
      var $phi$1127 = undefined;
      $phi$1127 = $phi$1126.$0;
      var $inl$_19_p_$u$27_$u$5314 = _10_d_$u$28;
      var $phi$1128 = _10_d_$u$28;
      var $phi$1129 = undefined;
      $phi$1129 = $phi$1128.$1;
      return ($$compiler$prelude_jg$$Pair($phi$1127))((($$compiler$declasser_jg$$rewriteExpr(_10_availableInstances_$u$14))(_10_env2_$u$18))($phi$1129))
    }))($phi$1068.$6);
    var $inl$_19_p_$u$24_$u$5317 = _10_isi_$u$9;
    var $phi$1130 = _10_isi_$u$9;
    var $phi$1131 = undefined;
    $phi$1131 = $phi$1130.$0;
    var _10_is2_$u$10 = $phi$1131;
    $phi$1069 = ((((((($$compiler$ast_jg$$Module($phi$1068.$0))($phi$1068.$1))(_10_is2_$u$10))(_10_dt2_$u$15))($phi$1068.$4))($phi$1068.$5))((concat(_10_classFuns_$u$13))((concat(_10_instancesAsDefs_$u$20))(_10_ds2_$u$19))));
    return $phi$1069
  }
};
var $instance$Eq$0 = $class$Eq(function(_9_a_$u$39){
  return function(_9_b_$u$40){
    return _9_a_$u$39===_9_b_$u$40
  }
});
var $$compiler$args_jg$$getString = function(_9_p_$u$20){
  return function(_9_def_$u$21){
    var $phi$1132 = _9_p_$u$20;
    var $phi$1133 = undefined;
    var $phi$1134 = (($$compiler$prelude_jg$$contains($instance$Eq$0))(_9_def_$u$21))($phi$1132.$2);
    var $phi$1135 = undefined;
    if(!$phi$1134){
      $phi$1135 = (error("unrecognized arg that was not present for parsing"))
    } else if($phi$1134){
      var $phi$1136 = _9_def_$u$21;
      var $phi$1137 = undefined;
      if($phi$1136.$tag==$$compiler$args_jg$$ArgString.$tag){
        var $phi$1138 = (has($phi$1136.$0))($phi$1132.$1);
        var $phi$1139 = undefined;
        if(!$phi$1138){
          var $phi$1140 = $phi$1136.$1;
          var $phi$1141 = undefined;
          if($phi$1140.$tag==$$compiler$prelude_jg$$Just.$tag){
            $phi$1141 = $phi$1140.$0
          } else if($phi$1140.$tag==$$compiler$prelude_jg$$Nothing.$tag){
            $phi$1141 = (error(($concat("no value for required arg "))($phi$1136.$0)))
          } else error("pattern match fail",$phi$1140);
          $phi$1139 = $phi$1141
        } else if($phi$1138){
          $phi$1139 = ((get($phi$1136.$0))($phi$1132.$1))
        } else error("pattern match fail",$phi$1138);
        $phi$1137 = $phi$1139
      } else $phi$1137 = (error("arg is not a string"));
      $phi$1135 = $phi$1137
    } else error("pattern match fail",$phi$1134);
    $phi$1133 = $phi$1135;
    return $phi$1133
  }
};
var $$compiler$js$deadCode_jg$$tryDCE = function(_7_e_$u$0){
  var $phi$1142 = _7_e_$u$0;
  var $phi$1143 = undefined;
  if((($phi$1142.$tag==$$compiler$js$ast_jg$$JSBinOp.$tag)&&("&&"==$phi$1142.$0))&&(($phi$1142.$1.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&$phi$1142.$1.$0)){
    $phi$1143 = $phi$1142.$2
  } else if((($phi$1142.$tag==$$compiler$js$ast_jg$$JSBinOp.$tag)&&("&&"==$phi$1142.$0))&&(($phi$1142.$2.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&$phi$1142.$2.$0)){
    $phi$1143 = $phi$1142.$1
  } else if(($phi$1142.$tag==$$compiler$js$ast_jg$$JSTernary.$tag)&&(($phi$1142.$0.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&$phi$1142.$0.$0)){
    $phi$1143 = $phi$1142.$1
  } else if(($phi$1142.$tag==$$compiler$js$ast_jg$$JSTernary.$tag)&&(($phi$1142.$0.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&(!$phi$1142.$0.$0))){
    $phi$1143 = $phi$1142.$2
  } else $phi$1143 = $phi$1142;
  return $phi$1143
};
var $$compiler$js$deadCode_jg$$rewriteDCE = function(_7_e_$u$8){
  var $phi$1144 = _7_e_$u$8;
  var $phi$1145 = undefined;
  if($phi$1144.$tag==$$compiler$js$ast_jg$$JSIndex.$tag){
    $phi$1145 = (($$compiler$js$ast_jg$$JSIndex($$compiler$js$deadCode_jg$$rewriteDCE($phi$1144.$0)))($$compiler$js$deadCode_jg$$rewriteDCE($phi$1144.$1)))
  } else if($phi$1144.$tag==$$compiler$js$ast_jg$$JSBinOp.$tag){
    $phi$1145 = ($$compiler$js$deadCode_jg$$tryDCE((($$compiler$js$ast_jg$$JSBinOp($phi$1144.$0))($$compiler$js$deadCode_jg$$rewriteDCE($phi$1144.$1)))($$compiler$js$deadCode_jg$$rewriteDCE($phi$1144.$2))))
  } else if($phi$1144.$tag==$$compiler$js$ast_jg$$JSCall.$tag){
    $phi$1145 = (($$compiler$js$ast_jg$$JSCall($$compiler$js$deadCode_jg$$rewriteDCE($phi$1144.$0)))((map($$compiler$js$deadCode_jg$$rewriteDCE))($phi$1144.$1)))
  } else if($phi$1144.$tag==$$compiler$js$ast_jg$$JSFun.$tag){
    $phi$1145 = (($$compiler$js$ast_jg$$JSFun($phi$1144.$0))(($$compiler$prelude_jg$$concatMap($$compiler$js$deadCode_jg$$rewriteStmt))($phi$1144.$1)))
  } else if($phi$1144.$tag==$$compiler$js$ast_jg$$JSTernary.$tag){
    $phi$1145 = ($$compiler$js$deadCode_jg$$tryDCE((($$compiler$js$ast_jg$$JSTernary($$compiler$js$deadCode_jg$$rewriteDCE($phi$1144.$0)))($$compiler$js$deadCode_jg$$rewriteDCE($phi$1144.$1)))($$compiler$js$deadCode_jg$$rewriteDCE($phi$1144.$2))))
  } else if($phi$1144.$tag==$$compiler$js$ast_jg$$JSObject.$tag){
    $phi$1145 = ($$compiler$js$ast_jg$$JSObject((map(function(_7_kv_$u$22){
      var $phi$1146 = _7_kv_$u$22;
      var $phi$1147 = undefined;
      $phi$1147 = (($$compiler$prelude_jg$$Pair($phi$1146.$0))($$compiler$js$deadCode_jg$$rewriteDCE($phi$1146.$1)));
      return $phi$1147
    }))($phi$1144.$0)))
  } else if($phi$1144.$tag==$$compiler$js$ast_jg$$JSInstanceOf.$tag){
    $phi$1145 = (($$compiler$js$ast_jg$$JSInstanceOf($$compiler$js$deadCode_jg$$rewriteDCE($phi$1144.$0)))($$compiler$js$deadCode_jg$$rewriteDCE($phi$1144.$1)))
  } else if($phi$1144.$tag==$$compiler$js$ast_jg$$JSNew.$tag){
    $phi$1145 = (($$compiler$js$ast_jg$$JSNew($$compiler$js$deadCode_jg$$rewriteDCE($phi$1144.$0)))((map($$compiler$js$deadCode_jg$$rewriteDCE))($phi$1144.$1)))
  } else $phi$1145 = $phi$1144;
  return $phi$1145
};
var $$compiler$js$deadCode_jg$$rewriteStmt = function(_7_s_$u$30){
  var $phi$1148 = _7_s_$u$30;
  var $phi$1149 = undefined;
  if($phi$1148.$tag==$$compiler$js$ast_jg$$JSExpr.$tag){
    var $inl$_19_x_$u$103_$u$5320 = $$compiler$js$ast_jg$$JSExpr($$compiler$js$deadCode_jg$$rewriteDCE($phi$1148.$0));
    $phi$1149 = ((push($inl$_19_x_$u$103_$u$5320))(emptyArray))
  } else if($phi$1148.$tag==$$compiler$js$ast_jg$$JSReturn.$tag){
    var $inl$_19_x_$u$103_$u$5321 = $$compiler$js$ast_jg$$JSReturn($$compiler$js$deadCode_jg$$rewriteDCE($phi$1148.$0));
    $phi$1149 = ((push($inl$_19_x_$u$103_$u$5321))(emptyArray))
  } else if($phi$1148.$tag==$$compiler$js$ast_jg$$JSVar.$tag){
    var $inl$_19_x_$u$103_$u$5322 = ($$compiler$js$ast_jg$$JSVar($phi$1148.$0))($$compiler$js$deadCode_jg$$rewriteDCE($phi$1148.$1));
    $phi$1149 = ((push($inl$_19_x_$u$103_$u$5322))(emptyArray))
  } else if($phi$1148.$tag==$$compiler$js$ast_jg$$JSAssign.$tag){
    var $inl$_19_x_$u$103_$u$5323 = ($$compiler$js$ast_jg$$JSAssign($$compiler$js$deadCode_jg$$rewriteDCE($phi$1148.$0)))($$compiler$js$deadCode_jg$$rewriteDCE($phi$1148.$1));
    $phi$1149 = ((push($inl$_19_x_$u$103_$u$5323))(emptyArray))
  } else if(($phi$1148.$tag==$$compiler$js$ast_jg$$JSIf.$tag)&&(($phi$1148.$0.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&$phi$1148.$0.$0)){
    $phi$1149 = (($$compiler$prelude_jg$$concatMap($$compiler$js$deadCode_jg$$rewriteStmt))($phi$1148.$1))
  } else if(($phi$1148.$tag==$$compiler$js$ast_jg$$JSIf.$tag)&&(($phi$1148.$0.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&(!$phi$1148.$0.$0))){
    $phi$1149 = (($$compiler$prelude_jg$$concatMap($$compiler$js$deadCode_jg$$rewriteStmt))($phi$1148.$2))
  } else if($phi$1148.$tag==$$compiler$js$ast_jg$$JSIf.$tag){
    var $phi$1150 = $$compiler$js$deadCode_jg$$rewriteDCE($phi$1148.$0);
    var $phi$1151 = undefined;
    if(($phi$1150.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&$phi$1150.$0){
      $phi$1151 = (($$compiler$prelude_jg$$concatMap($$compiler$js$deadCode_jg$$rewriteStmt))($phi$1148.$1))
    } else if(($phi$1150.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&(!$phi$1150.$0)){
      $phi$1151 = (($$compiler$prelude_jg$$concatMap($$compiler$js$deadCode_jg$$rewriteStmt))($phi$1148.$2))
    } else {
      var $inl$_19_x_$u$103_$u$5324 = (($$compiler$js$ast_jg$$JSIf($phi$1150))(($$compiler$prelude_jg$$concatMap($$compiler$js$deadCode_jg$$rewriteStmt))($phi$1148.$1)))(($$compiler$prelude_jg$$concatMap($$compiler$js$deadCode_jg$$rewriteStmt))($phi$1148.$2));
      $phi$1151 = ((push($inl$_19_x_$u$103_$u$5324))(emptyArray))
    };
    $phi$1149 = $phi$1151
  } else {
    var $inl$_19_x_$u$103_$u$5325 = $phi$1148;
    $phi$1149 = ((push($phi$1148))(emptyArray))
  };
  return $phi$1149
};
var $$compiler$js$printer_jg$$printIndent = function(_6_indent_$u$68){
  var $phi$1152 = _6_indent_$u$68;
  var $phi$1153 = undefined;
  if(0==$phi$1152){
    $phi$1153 = ""
  } else $phi$1153 = (($concat("  "))($$compiler$js$printer_jg$$printIndent($phi$1152-1)));
  return $phi$1153
};
var $$compiler$js$printer_jg$$paren = function(_6_s_$u$70){
  return ($concat(($concat("("))(_6_s_$u$70)))(")")
};
var $$compiler$js$printer_jg$$jsExprToString = function(_6_indent_$u$0){
  return function(_6_e_$u$1){
    var $phi$1154 = _6_e_$u$1;
    var $phi$1155 = undefined;
    if($phi$1154.$tag==$$compiler$js$ast_jg$$JSNull.$tag){
      $phi$1155 = "null"
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSUndefined.$tag){
      $phi$1155 = "undefined"
    } else if(($phi$1154.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&$phi$1154.$0){
      $phi$1155 = "true"
    } else if(($phi$1154.$tag==$$compiler$js$ast_jg$$JSBool.$tag)&&(!$phi$1154.$0)){
      $phi$1155 = "false"
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSNum.$tag){
      $phi$1155 = (jsonStringify($phi$1154.$0))
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSString.$tag){
      $phi$1155 = (jsonStringify($phi$1154.$0))
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSRef.$tag){
      $phi$1155 = $phi$1154.$0
    } else if(($phi$1154.$tag==$$compiler$js$ast_jg$$JSIndex.$tag)&&($phi$1154.$1.$tag==$$compiler$js$ast_jg$$JSString.$tag)){
      var $phi$1158 = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))($phi$1154.$1.$0);
      var $phi$1159 = undefined;
      if(""==$phi$1158){
        $phi$1159 = (($concat(($concat(($concat(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$0)))("[")))($phi$1154.$1.$0)))("]"))
      } else $phi$1159 = (($concat(($concat(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$0)))(".")))($phi$1158));
      $phi$1155 = $phi$1159
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSIndex.$tag){
      $phi$1155 = (($concat(($concat(($concat(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$0)))("[")))(($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$0))($phi$1154.$1))))("]"))
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSUnOp.$tag){
      $phi$1155 = (($concat($phi$1154.$0))(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$1)))
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSBinOp.$tag){
      $phi$1155 = (($concat(($concat(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$1)))($phi$1154.$0)))(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$2)))
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSCall.$tag){
      $phi$1155 = (($concat(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$0)))($$compiler$js$printer_jg$$paren((intercalate(","))((map(function($inl$_6_e_$u$4_$u$2717){
        return ($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$0))($inl$_6_e_$u$4_$u$2717)
      }))($phi$1154.$1)))))
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSNew.$tag){
      $phi$1155 = (($concat(($concat("new "))(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$0))))($$compiler$js$printer_jg$$paren((intercalate(","))((map(function($inl$_6_e_$u$4_$u$2719){
        return ($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$0))($inl$_6_e_$u$4_$u$2719)
      }))($phi$1154.$1)))))
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSFun.$tag){
      $phi$1155 = (($concat(($concat(($concat(($concat(($concat(($concat(($concat("function("))((intercalate(","))($phi$1154.$0))))("){\n")))($$compiler$js$printer_jg$$printIndent(_6_indent_$u$0+1))))((intercalate(($concat(";\n"))($$compiler$js$printer_jg$$printIndent(_6_indent_$u$0+1))))((map($$compiler$js$printer_jg$$jsStmtToString(_6_indent_$u$0+1)))($phi$1154.$1)))))("\n")))($$compiler$js$printer_jg$$printIndent(_6_indent_$u$0))))("}"))
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSTernary.$tag){
      $phi$1155 = (($concat(($concat(($concat(($concat(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$0)))("?")))(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$1))))(":")))(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$2)))
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSObject.$tag){
      $phi$1155 = (($concat(($concat("{"))((intercalate(","))((map(function($inl$_6_kv_$u$46_$u$2724){
        var $phi$1156 = $inl$_6_kv_$u$46_$u$2724;
        var $phi$1157 = undefined;
        $phi$1157 = (($concat(($concat($phi$1156.$0))(":")))(($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$0))($phi$1156.$1)));
        return $phi$1157
      }))($phi$1154.$0)))))("}"))
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSInstanceOf.$tag){
      $phi$1155 = (($concat(($concat(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$0)))(" instanceof ")))(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$0))($phi$1154.$1)))
    } else if($phi$1154.$tag==$$compiler$js$ast_jg$$JSSeq.$tag){
      $phi$1155 = ((intercalate(","))((map(function($inl$_6_e_$u$4_$u$2729){
        return ($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$0))($inl$_6_e_$u$4_$u$2729)
      }))($phi$1154.$0)))
    } else $phi$1155 = (error($phi$1154));
    return $phi$1155
  }
};
var $$compiler$js$printer_jg$$jsExprToParenString = function(_6_indent_$u$33){
  return function(_6_e_$u$34){
    var $phi$1160 = _6_e_$u$34;
    var $phi$1161 = undefined;
    if($phi$1160.$tag==$$compiler$js$ast_jg$$JSRef.$tag){
      $phi$1161 = (($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$33))(_6_e_$u$34))
    } else if($phi$1160.$tag==$$compiler$js$ast_jg$$JSNum.$tag){
      $phi$1161 = (($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$33))(_6_e_$u$34))
    } else if($phi$1160.$tag==$$compiler$js$ast_jg$$JSString.$tag){
      $phi$1161 = (($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$33))(_6_e_$u$34))
    } else if($phi$1160.$tag==$$compiler$js$ast_jg$$JSBool.$tag){
      $phi$1161 = (($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$33))(_6_e_$u$34))
    } else if($phi$1160.$tag==$$compiler$js$ast_jg$$JSIndex.$tag){
      $phi$1161 = (($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$33))(_6_e_$u$34))
    } else if($phi$1160.$tag==$$compiler$js$ast_jg$$JSNew.$tag){
      $phi$1161 = (($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$33))(_6_e_$u$34))
    } else if($phi$1160.$tag==$$compiler$js$ast_jg$$JSObject.$tag){
      $phi$1161 = (($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$33))(_6_e_$u$34))
    } else $phi$1161 = ($$compiler$js$printer_jg$$paren(($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$33))($phi$1160)));
    return $phi$1161
  }
};
var $$compiler$js$printer_jg$$jsStmtToString = function(_6_indent_$u$49){
  return function(_6_s_$u$50){
    var $phi$1162 = _6_s_$u$50;
    var $phi$1163 = undefined;
    if($phi$1162.$tag==$$compiler$js$ast_jg$$JSExpr.$tag){
      $phi$1163 = (($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$49))($phi$1162.$0))
    } else if($phi$1162.$tag==$$compiler$js$ast_jg$$JSReturn.$tag){
      $phi$1163 = (($concat("return "))(($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$49))($phi$1162.$0)))
    } else if($phi$1162.$tag==$$compiler$js$ast_jg$$JSVar.$tag){
      $phi$1163 = (($concat(($concat(($concat("var "))($phi$1162.$0)))(" = ")))(($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$49))($phi$1162.$1)))
    } else if($phi$1162.$tag==$$compiler$js$ast_jg$$JSBreak.$tag){
      $phi$1163 = "break"
    } else if($phi$1162.$tag==$$compiler$js$ast_jg$$JSSwitch.$tag){
      var $inl$_6_indent_$u$64_$u$2730 = _6_indent_$u$49+1;
      $phi$1163 = (($concat(($concat(($concat(($concat(($concat(($concat(($concat("switch"))($$compiler$js$printer_jg$$paren(($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$49))($phi$1162.$0)))))("{\n")))($$compiler$js$printer_jg$$printIndent(_6_indent_$u$49+1))))((intercalate(($concat(";\n"))($$compiler$js$printer_jg$$printIndent(_6_indent_$u$49+1))))((map(function($inl$_6_c_$u$65_$u$2731){
        var $phi$1166 = $inl$_6_c_$u$65_$u$2731;
        var $phi$1167 = undefined;
        $phi$1167 = (($concat(($concat(($concat(($concat("case "))($$compiler$js$printer_jg$$paren(($$compiler$js$printer_jg$$jsExprToString($inl$_6_indent_$u$64_$u$2730))($phi$1166.$0)))))(":\n")))($$compiler$js$printer_jg$$printIndent($inl$_6_indent_$u$64_$u$2730+1))))((intercalate(($concat(";\n"))($$compiler$js$printer_jg$$printIndent($inl$_6_indent_$u$64_$u$2730+1))))((map($$compiler$js$printer_jg$$jsStmtToString($inl$_6_indent_$u$64_$u$2730)))($phi$1166.$1))));
        return $phi$1167
      }))($phi$1162.$1)))))("\n")))($$compiler$js$printer_jg$$printIndent(_6_indent_$u$49))))("}"))
    } else if($phi$1162.$tag==$$compiler$js$ast_jg$$JSAssign.$tag){
      $phi$1163 = (($concat(($concat(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$49))($phi$1162.$0)))(" = ")))(($$compiler$js$printer_jg$$jsExprToParenString(_6_indent_$u$49))($phi$1162.$1)))
    } else if($phi$1162.$tag==$$compiler$js$ast_jg$$JSIf.$tag){
      var $phi$1164 = length($phi$1162.$2);
      var $phi$1165 = undefined;
      if(1==$phi$1164){
        $phi$1165 = (($$compiler$js$printer_jg$$jsStmtToString(_6_indent_$u$49))((getIx(0))($phi$1162.$2)))
      } else $phi$1165 = (($concat(($concat(($concat(($concat(($concat("{\n"))($$compiler$js$printer_jg$$printIndent(_6_indent_$u$49+1))))((intercalate(($concat(";\n"))($$compiler$js$printer_jg$$printIndent(_6_indent_$u$49+1))))((map($$compiler$js$printer_jg$$jsStmtToString(_6_indent_$u$49+1)))($phi$1162.$2)))))("\n")))($$compiler$js$printer_jg$$printIndent(_6_indent_$u$49))))("}"));
      var _6_els_$u$62 = $phi$1165;
      $phi$1163 = (($concat(($concat(($concat(($concat(($concat(($concat(($concat(($concat("if("))(($$compiler$js$printer_jg$$jsExprToString(_6_indent_$u$49))($phi$1162.$0))))("){\n")))($$compiler$js$printer_jg$$printIndent(_6_indent_$u$49+1))))((intercalate(($concat(";\n"))($$compiler$js$printer_jg$$printIndent(_6_indent_$u$49+1))))((map($$compiler$js$printer_jg$$jsStmtToString(_6_indent_$u$49+1)))($phi$1162.$1)))))("\n")))($$compiler$js$printer_jg$$printIndent(_6_indent_$u$49))))("} else ")))(_6_els_$u$62))
    } else error("pattern match fail",$phi$1162);
    return $phi$1163
  }
};
var $$compiler$js$jaguarToJs_jg$$opName = function(_5_op_$u$231){
  var $phi$1168 = _5_op_$u$231;
  var $phi$1169 = undefined;
  if("+"==$phi$1168){
    $phi$1169 = "$add"
  } else if("-"==$phi$1168){
    $phi$1169 = "$del"
  } else if("*"==$phi$1168){
    $phi$1169 = "$mul"
  } else if("&&"==$phi$1168){
    $phi$1169 = "$and"
  } else if("||"==$phi$1168){
    $phi$1169 = "$or"
  } else if("++"==$phi$1168){
    $phi$1169 = "$concat"
  } else {
    var $inl$_19_s_$u$124_$u$5326 = $phi$1168;
    $phi$1169 = (((foldl(function(_5_s_$u$233){
      return function(_5_c_$u$234){
        var $phi$1170 = _5_c_$u$234;
        var $phi$1171 = undefined;
        if("-"==$phi$1170){
          $phi$1171 = "$mns"
        } else if("+"==$phi$1170){
          $phi$1171 = "$pls"
        } else if("*"==$phi$1170){
          $phi$1171 = "$mul"
        } else if("/"==$phi$1170){
          $phi$1171 = "$div"
        } else if("="==$phi$1170){
          $phi$1171 = "$eq"
        } else if(":"==$phi$1170){
          $phi$1171 = "$col"
        } else if("&"==$phi$1170){
          $phi$1171 = "$amp"
        } else if("|"==$phi$1170){
          $phi$1171 = "$pip"
        } else if("<"==$phi$1170){
          $phi$1171 = "$lt"
        } else if(">"==$phi$1170){
          $phi$1171 = "$gt"
        } else if("^"==$phi$1170){
          $phi$1171 = "$rof"
        } else $phi$1171 = _5_c_$u$234;
        return ($concat(_5_s_$u$233))($phi$1171)
      }
    }))(""))(($$compiler$prelude_jg$$loop(function($inl$$inl$_19_p_$u$126_$u$131_$u$5327){
      var $phi$1172 = $inl$$inl$_19_p_$u$126_$u$131_$u$5327;
      var $phi$1173 = undefined;
      var $phi$1176 = $instance$Ord$2;
      var $phi$1177 = undefined;
      $phi$1177 = $phi$1176.$0;
      var $phi$1174 = ($phi$1177($phi$1172.$0))(length($phi$1168));
      var $phi$1175 = undefined;
      if(!$phi$1174){
        $phi$1175 = ($$compiler$prelude_jg$$Right($phi$1172.$1))
      } else if($phi$1174){
        $phi$1175 = ($$compiler$prelude_jg$$Left(($$compiler$prelude_jg$$Pair($phi$1172.$0+1))((push((getChar($phi$1172.$0))($phi$1168)))($phi$1172.$1))))
      } else error("pattern match fail",$phi$1174);
      $phi$1173 = $phi$1175;
      return $phi$1173
    }))(($$compiler$prelude_jg$$Pair(0))(emptyArray))))
  };
  return $phi$1169
};
var $phi$1178 = $instance$Monad$11;
var $phi$1179 = undefined;
$phi$1179 = $phi$1178.$1;
var $$compiler$js$jaguarToJs_jg$$newPhi = ($phi$1179($$compiler$prelude_jg$$gets))(function(_5_s_$u$13){
  var $phi$1180 = _5_s_$u$13;
  var $phi$1181 = undefined;
  var $inl$_19_s_$u$143_$u$5332 = ((($$compiler$js$jaguarToJs_jg$$RewriteState($phi$1180.$0))($phi$1180.$1))($phi$1180.$2))($phi$1180.$3+1);
  var $phi$1182 = $instance$Monad$11;
  var $phi$1183 = undefined;
  $phi$1183 = $phi$1182.$0;
  $phi$1181 = ((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$5333){
    return ($$compiler$prelude_jg$$Pair($inl$_19_s_$u$143_$u$5332))($$compiler$prelude_jg$$Unit)
  })))($phi$1183(($concat("$phi$"))(intToString($phi$1180.$3)))));
  return $phi$1181
});
var $$compiler$js$jaguarToJs_jg$$processPattern = function(_5_cons_$u$147){
  return function(_5_pm_$u$148){
    return function(_5_p_$u$149){
      var $phi$1184 = _5_p_$u$149;
      var $phi$1185 = undefined;
      if(($phi$1184.$tag==$$compiler$ast_jg$$PVar.$tag)&&("_"==$phi$1184.$1)){
        $phi$1185 = (($$compiler$prelude_jg$$Pair($$compiler$js$ast_jg$$JSBool(true)))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray)))
      } else if($phi$1184.$tag==$$compiler$ast_jg$$PVar.$tag){
        var $inl$_19_x_$u$103_$u$5334 = $$compiler$js$jaguarToJs_jg$$opName($phi$1184.$1);
        var $inl$_19_x_$u$103_$u$5335 = _5_pm_$u$148;
        $phi$1185 = (($$compiler$prelude_jg$$Pair($$compiler$js$ast_jg$$JSBool(true)))(($$compiler$prelude_jg$$Pair((push($inl$_19_x_$u$103_$u$5334))(emptyArray)))((push(_5_pm_$u$148))(emptyArray))))
      } else if(($phi$1184.$tag==$$compiler$ast_jg$$PConst.$tag)&&($phi$1184.$1.$tag==$$compiler$ast_jg$$CNum.$tag)){
        $phi$1185 = (($$compiler$prelude_jg$$Pair((($$compiler$js$ast_jg$$JSBinOp("=="))($$compiler$js$ast_jg$$JSNum($phi$1184.$1.$0)))(_5_pm_$u$148)))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray)))
      } else if(($phi$1184.$tag==$$compiler$ast_jg$$PConst.$tag)&&($phi$1184.$1.$tag==$$compiler$ast_jg$$CStr.$tag)){
        $phi$1185 = (($$compiler$prelude_jg$$Pair((($$compiler$js$ast_jg$$JSBinOp("=="))($$compiler$js$ast_jg$$JSString($phi$1184.$1.$0)))(_5_pm_$u$148)))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray)))
      } else if(($phi$1184.$tag==$$compiler$ast_jg$$PData.$tag)&&("True"==$phi$1184.$1)){
        $phi$1185 = (($$compiler$prelude_jg$$Pair(_5_pm_$u$148))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray)))
      } else if(($phi$1184.$tag==$$compiler$ast_jg$$PData.$tag)&&("False"==$phi$1184.$1)){
        $phi$1185 = (($$compiler$prelude_jg$$Pair(($$compiler$js$ast_jg$$JSUnOp("!"))(_5_pm_$u$148)))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray)))
      } else if($phi$1184.$tag==$$compiler$ast_jg$$PData.$tag){
        var $phi$1186 = ((($$compiler$prelude_jg$$setContains($instance$Hashable$13))($instance$Eq$1))($phi$1184.$1))(_5_cons_$u$147);
        var $phi$1187 = undefined;
        if($phi$1186){
          $phi$1187 = ($$compiler$js$ast_jg$$JSBool(true))
        } else if(!$phi$1186){
          $phi$1187 = ((($$compiler$js$ast_jg$$JSBinOp("=="))(($$compiler$js$ast_jg$$JSIndex(_5_pm_$u$148))($$compiler$js$ast_jg$$JSString("$tag"))))(($$compiler$js$ast_jg$$JSIndex($$compiler$js$ast_jg$$JSRef($phi$1184.$1)))($$compiler$js$ast_jg$$JSString("$tag"))))
        } else error("pattern match fail",$phi$1186);
        var _5_tagCheck_$u$164 = $phi$1187;
        $phi$1185 = (((foldl(function(_5_a_$u$165){
          return function(_5_b_$u$166){
            var $phi$1188 = _5_a_$u$165;
            var $phi$1189 = undefined;
            var $phi$1190 = _5_b_$u$166;
            var $phi$1191 = undefined;
            $phi$1191 = (($$compiler$prelude_jg$$Pair((($$compiler$js$ast_jg$$JSBinOp("&&"))($phi$1188.$0))($phi$1190.$0)))(($$compiler$prelude_jg$$Pair((concat($phi$1188.$1.$0))($phi$1190.$1.$0)))((concat($phi$1188.$1.$1))($phi$1190.$1.$1))));
            $phi$1189 = $phi$1191;
            return $phi$1189
          }
        }))(($$compiler$prelude_jg$$Pair(_5_tagCheck_$u$164))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray))))((map(function(_5_p_$u$173){
          var $phi$1192 = _5_p_$u$173;
          var $phi$1193 = undefined;
          $phi$1193 = ((($$compiler$js$jaguarToJs_jg$$processPattern(_5_cons_$u$147))(($$compiler$js$ast_jg$$JSIndex(_5_pm_$u$148))($$compiler$js$ast_jg$$JSString(($concat("$"))(intToString($phi$1192.$0))))))($phi$1192.$1));
          return $phi$1193
        }))($$compiler$prelude_jg$$zipWithIndex($phi$1184.$2))))
      } else $phi$1185 = (error("failure to match pattern during processing"));
      return $phi$1185
    }
  }
};
var $phi$1194 = $instance$Monad$11;
var $phi$1195 = undefined;
$phi$1195 = $phi$1194.$1;
var $$compiler$js$jaguarToJs_jg$$getCons = ($phi$1195($$compiler$prelude_jg$$gets))(function(_5_s_$u$50){
  var $phi$1196 = _5_s_$u$50;
  var $phi$1197 = undefined;
  var $phi$1198 = $instance$Monad$11;
  var $phi$1199 = undefined;
  $phi$1199 = $phi$1198.$0;
  $phi$1197 = ($phi$1199($phi$1196.$0));
  return $phi$1197
});
var $$compiler$js$jaguarToJs_jg$$addStmt = function(_5_stmt_$u$5){
  var $phi$1200 = $instance$Monad$11;
  var $phi$1201 = undefined;
  $phi$1201 = $phi$1200.$1;
  return ($phi$1201($$compiler$prelude_jg$$gets))(function(_5_s_$u$6){
    var $phi$1202 = _5_s_$u$6;
    var $phi$1203 = undefined;
    var $inl$_19_s_$u$143_$u$5336 = ((($$compiler$js$jaguarToJs_jg$$RewriteState($phi$1202.$0))($phi$1202.$1))((push(_5_stmt_$u$5))($phi$1202.$2)))($phi$1202.$3);
    $phi$1203 = ($$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$5337){
      return ($$compiler$prelude_jg$$Pair($inl$_19_s_$u$143_$u$5336))($$compiler$prelude_jg$$Unit)
    }));
    return $phi$1203
  })
};
var $$compiler$js$jaguarToJs_jg$$addVar = function(_5_n_$u$11){
  return function(_5_e_$u$12){
    return $$compiler$js$jaguarToJs_jg$$addStmt(($$compiler$js$ast_jg$$JSVar($$compiler$js$jaguarToJs_jg$$opName(_5_n_$u$11)))(_5_e_$u$12))
  }
};
var $$compiler$js$jaguarToJs_jg$$binOp2 = function(_5_op_$u$0){
  return function(_5_a_$u$1){
    return function(_5_b_$u$2){
      var $phi$1204 = $instance$Monad$11;
      var $phi$1205 = undefined;
      $phi$1205 = $phi$1204.$1;
      return ($phi$1205($$compiler$js$jaguarToJs_jg$$rewriteExpr(_5_a_$u$1)))(function(_5_a_$u$3){
        var $phi$1206 = $instance$Monad$11;
        var $phi$1207 = undefined;
        $phi$1207 = $phi$1206.$1;
        return ($phi$1207($$compiler$js$jaguarToJs_jg$$rewriteExpr(_5_b_$u$2)))(function(_5_b_$u$4){
          var $phi$1208 = $instance$Monad$11;
          var $phi$1209 = undefined;
          $phi$1209 = $phi$1208.$0;
          return $phi$1209((($$compiler$js$ast_jg$$JSBinOp(_5_op_$u$0))(_5_a_$u$3))(_5_b_$u$4))
        })
      })
    }
  }
};
var $$compiler$js$jaguarToJs_jg$$rewriteExprToStmts = function(_5_w_$u$18){
  return function(_5_e_$u$19){
    var $phi$1210 = $instance$Monad$11;
    var $phi$1211 = undefined;
    $phi$1211 = $phi$1210.$1;
    return ($phi$1211($$compiler$prelude_jg$$gets))(function(_5_s_$u$20){
      var $phi$1212 = _5_s_$u$20;
      var $phi$1213 = undefined;
      var $phi$1214 = $instance$Monad$11;
      var $phi$1215 = undefined;
      $phi$1215 = $phi$1214.$1;
      var $inl$_19_s_$u$143_$u$5338 = ((($$compiler$js$jaguarToJs_jg$$RewriteState($phi$1212.$0))($phi$1212.$1))(emptyArray))($phi$1212.$3);
      $phi$1213 = (($phi$1215((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$5339){
        return ($$compiler$prelude_jg$$Pair($inl$_19_s_$u$143_$u$5338))($$compiler$prelude_jg$$Unit)
      })))($$compiler$js$jaguarToJs_jg$$rewriteExpr(_5_e_$u$19))))(function(_5_e_$u$25){
        var $phi$1216 = $instance$Monad$11;
        var $phi$1217 = undefined;
        $phi$1217 = $phi$1216.$1;
        return ($phi$1217($$compiler$prelude_jg$$gets))(function(_5_s_$u$26){
          var $phi$1218 = _5_s_$u$26;
          var $phi$1219 = undefined;
          var $inl$_19_s_$u$143_$u$5340 = ((($$compiler$js$jaguarToJs_jg$$RewriteState($phi$1218.$0))($phi$1218.$1))($phi$1212.$2))($phi$1218.$3);
          var $phi$1220 = $instance$Monad$11;
          var $phi$1221 = undefined;
          $phi$1221 = $phi$1220.$0;
          $phi$1219 = ((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$5341){
            return ($$compiler$prelude_jg$$Pair($inl$_19_s_$u$143_$u$5340))($$compiler$prelude_jg$$Unit)
          })))($phi$1221((push(_5_w_$u$18(_5_e_$u$25)))($phi$1218.$2))));
          return $phi$1219
        })
      }));
      return $phi$1213
    })
  }
};
var $$compiler$js$jaguarToJs_jg$$rewriteExpr = function(_5_e_$u$55){
  var $phi$1222 = _5_e_$u$55;
  var $phi$1223 = undefined;
  if(($phi$1222.$tag==$$compiler$ast_jg$$Var.$tag)&&("True"==$phi$1222.$1)){
    var $phi$1294 = $instance$Monad$11;
    var $phi$1295 = undefined;
    $phi$1295 = $phi$1294.$0;
    $phi$1223 = ($phi$1295($$compiler$js$ast_jg$$JSBool(true)))
  } else if(($phi$1222.$tag==$$compiler$ast_jg$$Var.$tag)&&("False"==$phi$1222.$1)){
    var $phi$1292 = $instance$Monad$11;
    var $phi$1293 = undefined;
    $phi$1293 = $phi$1292.$0;
    $phi$1223 = ($phi$1293($$compiler$js$ast_jg$$JSBool(false)))
  } else if($phi$1222.$tag==$$compiler$ast_jg$$Var.$tag){
    var $phi$1278 = $instance$Monad$11;
    var $phi$1279 = undefined;
    $phi$1279 = $phi$1278.$1;
    var $inl$_5_n_$u$44_$u$2848 = $$compiler$js$jaguarToJs_jg$$opName($phi$1222.$1);
    var $phi$1280 = $instance$Monad$11;
    var $phi$1281 = undefined;
    $phi$1281 = $phi$1280.$1;
    $phi$1223 = (($phi$1279(($phi$1281($$compiler$prelude_jg$$gets))(function($inl$_5_s_$u$45_$u$2849){
      var $phi$1282 = $inl$_5_s_$u$45_$u$2849;
      var $phi$1283 = undefined;
      var $phi$1284 = $instance$Monad$11;
      var $phi$1285 = undefined;
      $phi$1285 = $phi$1284.$0;
      $phi$1283 = ($phi$1285(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))($inl$_5_n_$u$44_$u$2848))($phi$1282.$1)));
      return $phi$1283
    })))(function(_5_r_$u$60){
      var $phi$1286 = _5_r_$u$60;
      var $phi$1287 = undefined;
      if($phi$1286.$tag==$$compiler$prelude_jg$$Nothing.$tag){
        var $phi$1290 = $instance$Monad$11;
        var $phi$1291 = undefined;
        $phi$1291 = $phi$1290.$0;
        $phi$1287 = ($phi$1291($$compiler$js$ast_jg$$JSRef($$compiler$js$jaguarToJs_jg$$opName($phi$1222.$1))))
      } else if($phi$1286.$tag==$$compiler$prelude_jg$$Just.$tag){
        var $phi$1288 = $instance$Monad$11;
        var $phi$1289 = undefined;
        $phi$1289 = $phi$1288.$0;
        $phi$1287 = ($phi$1289($phi$1286.$0))
      } else error("pattern match fail",$phi$1286);
      return $phi$1287
    }))
  } else if(($phi$1222.$tag==$$compiler$ast_jg$$Const.$tag)&&($phi$1222.$1.$tag==$$compiler$ast_jg$$CNum.$tag)){
    var $phi$1276 = $instance$Monad$11;
    var $phi$1277 = undefined;
    $phi$1277 = $phi$1276.$0;
    $phi$1223 = ($phi$1277($$compiler$js$ast_jg$$JSNum($phi$1222.$1.$0)))
  } else if(($phi$1222.$tag==$$compiler$ast_jg$$Const.$tag)&&($phi$1222.$1.$tag==$$compiler$ast_jg$$CStr.$tag)){
    var $phi$1274 = $instance$Monad$11;
    var $phi$1275 = undefined;
    $phi$1275 = $phi$1274.$0;
    $phi$1223 = ($phi$1275($$compiler$js$ast_jg$$JSString($phi$1222.$1.$0)))
  } else if(($phi$1222.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("+"==$phi$1222.$1.$1.$1)))){
    $phi$1223 = ((($$compiler$js$jaguarToJs_jg$$binOp2("+"))($phi$1222.$1.$2))($phi$1222.$2))
  } else if(($phi$1222.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("-"==$phi$1222.$1.$1.$1)))){
    $phi$1223 = ((($$compiler$js$jaguarToJs_jg$$binOp2("-"))($phi$1222.$1.$2))($phi$1222.$2))
  } else if(($phi$1222.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("*"==$phi$1222.$1.$1.$1)))){
    $phi$1223 = ((($$compiler$js$jaguarToJs_jg$$binOp2("*"))($phi$1222.$1.$2))($phi$1222.$2))
  } else if(($phi$1222.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("jsLt"==$phi$1222.$1.$1.$1)))){
    $phi$1223 = ((($$compiler$js$jaguarToJs_jg$$binOp2("<"))($phi$1222.$1.$2))($phi$1222.$2))
  } else if(($phi$1222.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("jsEq"==$phi$1222.$1.$1.$1)))){
    $phi$1223 = ((($$compiler$js$jaguarToJs_jg$$binOp2("==="))($phi$1222.$1.$2))($phi$1222.$2))
  } else if(($phi$1222.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("bitAnd"==$phi$1222.$1.$1.$1)))){
    $phi$1223 = ((($$compiler$js$jaguarToJs_jg$$binOp2("&"))($phi$1222.$1.$2))($phi$1222.$2))
  } else if(($phi$1222.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("bitOr"==$phi$1222.$1.$1.$1)))){
    $phi$1223 = ((($$compiler$js$jaguarToJs_jg$$binOp2("|"))($phi$1222.$1.$2))($phi$1222.$2))
  } else if(($phi$1222.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("bitShiftLeft"==$phi$1222.$1.$1.$1)))){
    $phi$1223 = ((($$compiler$js$jaguarToJs_jg$$binOp2("<<"))($phi$1222.$1.$2))($phi$1222.$2))
  } else if(($phi$1222.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$tag==$$compiler$ast_jg$$App.$tag)&&(($phi$1222.$1.$1.$tag==$$compiler$ast_jg$$Var.$tag)&&("bitShiftRight"==$phi$1222.$1.$1.$1)))){
    $phi$1223 = ((($$compiler$js$jaguarToJs_jg$$binOp2(">>>"))($phi$1222.$1.$2))($phi$1222.$2))
  } else if($phi$1222.$tag==$$compiler$ast_jg$$App.$tag){
    var $phi$1268 = $instance$Monad$11;
    var $phi$1269 = undefined;
    $phi$1269 = $phi$1268.$1;
    $phi$1223 = (($phi$1269($$compiler$js$jaguarToJs_jg$$rewriteExpr($phi$1222.$1)))(function(_5_f_$u$114){
      var $phi$1270 = $instance$Monad$11;
      var $phi$1271 = undefined;
      $phi$1271 = $phi$1270.$1;
      return ($phi$1271($$compiler$js$jaguarToJs_jg$$rewriteExpr($phi$1222.$2)))(function(_5_a_$u$115){
        var $phi$1272 = $instance$Monad$11;
        var $phi$1273 = undefined;
        $phi$1273 = $phi$1272.$0;
        var $inl$_19_x_$u$103_$u$5342 = _5_a_$u$115;
        return $phi$1273(($$compiler$js$ast_jg$$JSCall(_5_f_$u$114))((push(_5_a_$u$115))(emptyArray)))
      })
    }))
  } else if($phi$1222.$tag==$$compiler$ast_jg$$Lam.$tag){
    var $phi$1264 = $instance$Monad$11;
    var $phi$1265 = undefined;
    $phi$1265 = $phi$1264.$1;
    $phi$1223 = (($phi$1265(($$compiler$js$jaguarToJs_jg$$rewriteExprToStmts($$compiler$js$ast_jg$$JSReturn))($phi$1222.$2)))(function(_5_stmts_$u$119){
      var $phi$1266 = $instance$Monad$11;
      var $phi$1267 = undefined;
      $phi$1267 = $phi$1266.$0;
      var $inl$_19_x_$u$103_$u$5343 = $phi$1222.$1;
      return $phi$1267(($$compiler$js$ast_jg$$JSFun((push($phi$1222.$1))(emptyArray)))(_5_stmts_$u$119))
    }))
  } else if($phi$1222.$tag==$$compiler$ast_jg$$Case.$tag){
    var $phi$1228 = $instance$Monad$11;
    var $phi$1229 = undefined;
    $phi$1229 = $phi$1228.$1;
    $phi$1223 = (($phi$1229($$compiler$js$jaguarToJs_jg$$newPhi))(function(_5_phiIn_$u$123){
      var $phi$1230 = $instance$Monad$11;
      var $phi$1231 = undefined;
      $phi$1231 = $phi$1230.$1;
      return ($phi$1231($$compiler$js$jaguarToJs_jg$$newPhi))(function(_5_phiOut_$u$124){
        var $phi$1232 = $instance$Monad$11;
        var $phi$1233 = undefined;
        $phi$1233 = $phi$1232.$1;
        var $phi$1234 = $instance$Monad$11;
        var $phi$1235 = undefined;
        $phi$1235 = $phi$1234.$1;
        var $inl$_5_phiOut_$u$132_$u$2900 = _5_phiOut_$u$124;
        var $inl$_19_x_$u$104_$u$5355 = $$compiler$js$ast_jg$$JSString("pattern match fail");
        var $phi$1262 = $instance$Monad$11;
        var $phi$1263 = undefined;
        $phi$1263 = $phi$1262.$0;
        return (($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($phi$1233((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))(($phi$1235($$compiler$js$jaguarToJs_jg$$rewriteExpr($phi$1222.$1)))($$compiler$js$jaguarToJs_jg$$addVar(_5_phiIn_$u$123))))(($$compiler$js$jaguarToJs_jg$$addVar(_5_phiOut_$u$124))($$compiler$js$ast_jg$$JSUndefined))))(((($$compiler$prelude_jg$$foldM($instance$Monad$11))(function($inl$_5_alt_$u$133_$u$2901){
          return function($inl$_5_p_$u$134_$u$2902){
            var $phi$1236 = $instance$Monad$11;
            var $phi$1237 = undefined;
            $phi$1237 = $phi$1236.$1;
            return ($phi$1237($$compiler$js$jaguarToJs_jg$$getCons))(function($inl$_5_cons_$u$135_$u$2903){
              var $phi$1238 = $inl$_5_p_$u$134_$u$2902;
              var $phi$1239 = undefined;
              var $phi$1240 = (($$compiler$js$jaguarToJs_jg$$processPattern($inl$_5_cons_$u$135_$u$2903))($$compiler$js$ast_jg$$JSRef(_5_phiIn_$u$123)))($phi$1238.$0);
              var $phi$1241 = undefined;
              var $inl$_5_rep_$u$141_$u$2909 = ((foldl(function($inl$_5_r_$u$142_$u$2910){
                return function($inl$_5_p_$u$143_$u$2911){
                  var $inl$_19_p_$u$24_$u$5344 = $inl$_5_p_$u$143_$u$2911;
                  var $phi$1242 = $inl$_5_p_$u$143_$u$2911;
                  var $phi$1243 = undefined;
                  $phi$1243 = $phi$1242.$0;
                  var $inl$_19_p_$u$27_$u$5347 = $inl$_5_p_$u$143_$u$2911;
                  var $phi$1244 = $inl$_5_p_$u$143_$u$2911;
                  var $phi$1245 = undefined;
                  $phi$1245 = $phi$1244.$1;
                  return (((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))($phi$1243))($phi$1245))($inl$_5_r_$u$142_$u$2910)
                }
              }))($$compiler$prelude_jg$$Empty))(($$compiler$prelude_jg$$zip($phi$1240.$1.$0))($phi$1240.$1.$1));
              var $phi$1246 = $instance$Monad$11;
              var $phi$1247 = undefined;
              $phi$1247 = $phi$1246.$1;
              var $inl$_5_m_$u$32_$u$2920 = ($$compiler$js$jaguarToJs_jg$$rewriteExprToStmts($$compiler$js$ast_jg$$JSAssign($$compiler$js$ast_jg$$JSRef($inl$_5_phiOut_$u$132_$u$2900))))($phi$1238.$1);
              var $phi$1248 = $instance$Monad$11;
              var $phi$1249 = undefined;
              $phi$1249 = $phi$1248.$1;
              $phi$1241 = (($phi$1247(($phi$1249($$compiler$prelude_jg$$gets))(function($inl$_5_s_$u$33_$u$2921){
                var $phi$1250 = $inl$_5_s_$u$33_$u$2921;
                var $phi$1251 = undefined;
                var $phi$1252 = $instance$Monad$11;
                var $phi$1253 = undefined;
                $phi$1253 = $phi$1252.$1;
                var $inl$_19_s_$u$143_$u$5350 = ((($$compiler$js$jaguarToJs_jg$$RewriteState($phi$1250.$0))(((($$compiler$prelude_jg$$mergeTrie($instance$Hashable$13))($instance$Eq$1))($phi$1250.$1))($inl$_5_rep_$u$141_$u$2909)))($phi$1250.$2))($phi$1250.$3);
                $phi$1251 = (($phi$1253((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$5351){
                  return ($$compiler$prelude_jg$$Pair($inl$_19_s_$u$143_$u$5350))($$compiler$prelude_jg$$Unit)
                })))($inl$_5_m_$u$32_$u$2920)))(function($inl$_5_r_$u$38_$u$2926){
                  var $phi$1254 = $instance$Monad$11;
                  var $phi$1255 = undefined;
                  $phi$1255 = $phi$1254.$1;
                  return ($phi$1255($$compiler$prelude_jg$$gets))(function($inl$_5_s_$u$39_$u$2927){
                    var $phi$1256 = $inl$_5_s_$u$39_$u$2927;
                    var $phi$1257 = undefined;
                    var $inl$_19_s_$u$143_$u$5352 = ((($$compiler$js$jaguarToJs_jg$$RewriteState($phi$1256.$0))($phi$1250.$1))($phi$1256.$2))($phi$1256.$3);
                    var $phi$1258 = $instance$Monad$11;
                    var $phi$1259 = undefined;
                    $phi$1259 = $phi$1258.$0;
                    $phi$1257 = ((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))($$compiler$prelude_jg$$State(function($inl$_19___$u$144_$u$5353){
                      return ($$compiler$prelude_jg$$Pair($inl$_19_s_$u$143_$u$5352))($$compiler$prelude_jg$$Unit)
                    })))($phi$1259($inl$_5_r_$u$38_$u$2926)));
                    return $phi$1257
                  })
                }));
                return $phi$1251
              })))(function($inl$_5_stmts_$u$144_$u$2912){
                var $phi$1260 = $instance$Monad$11;
                var $phi$1261 = undefined;
                $phi$1261 = $phi$1260.$0;
                var $inl$_19_x_$u$103_$u$5354 = $inl$_5_alt_$u$133_$u$2901;
                return $phi$1261((($$compiler$js$ast_jg$$JSIf($phi$1240.$0))($inl$_5_stmts_$u$144_$u$2912))((push($inl$_5_alt_$u$133_$u$2901))(emptyArray)))
              }));
              $phi$1239 = $phi$1241;
              return $phi$1239
            })
          }
        }))($$compiler$js$ast_jg$$JSExpr(($$compiler$js$ast_jg$$JSCall($$compiler$js$ast_jg$$JSRef("error")))((function($inl$_19_y_$u$105_$u$5356){
          return (push($inl$_19_y_$u$105_$u$5356))((push($inl$_19_x_$u$104_$u$5355))(emptyArray))
        })($$compiler$js$ast_jg$$JSRef(_5_phiIn_$u$123))))))($$compiler$prelude_jg$$reverse($phi$1222.$2)))))($$compiler$js$jaguarToJs_jg$$addStmt)))($phi$1263($$compiler$js$ast_jg$$JSRef(_5_phiOut_$u$124)))
      })
    }))
  } else if($phi$1222.$tag==$$compiler$ast_jg$$Let.$tag){
    $phi$1223 = ((($$compiler$prelude_jg$$$gt$gt($instance$Monad$11))((($$compiler$prelude_jg$$mapM($instance$Monad$11))(function(_5_d_$u$128){
      var $phi$1224 = _5_d_$u$128;
      var $phi$1225 = undefined;
      var $phi$1226 = $instance$Monad$11;
      var $phi$1227 = undefined;
      $phi$1227 = $phi$1226.$1;
      $phi$1225 = (($phi$1227($$compiler$js$jaguarToJs_jg$$rewriteExpr($phi$1224.$1)))($$compiler$js$jaguarToJs_jg$$addVar($phi$1224.$0)));
      return $phi$1225
    }))($phi$1222.$1)))($$compiler$js$jaguarToJs_jg$$rewriteExpr($phi$1222.$2)))
  } else error("pattern match fail",$phi$1222);
  return $phi$1223
};
var $$compiler$js$jaguarToJs_jg$$dataConFieldIds = function(_5_ts_$u$187){
  return (map(function(_5_p_$u$188){
    var $inl$_19_p_$u$24_$u$5358 = _5_p_$u$188;
    var $phi$1296 = _5_p_$u$188;
    var $phi$1297 = undefined;
    $phi$1297 = $phi$1296.$0;
    return ($concat("$"))(intToString($phi$1297))
  }))($$compiler$prelude_jg$$zipWithIndex(_5_ts_$u$187))
};
var $$compiler$js$backend_jg$$compileModule = function(_4_importSymbols_$u$0){
  return function(_4_m_$u$1){
    var $inl$_5_m_$u$205_$u$5398 = _4_m_$u$1;
    var $phi$1298 = $inl$_5_m_$u$205_$u$5398;
    var $phi$1299 = undefined;
    var $inl$_18_m_$u$68_$u$5450 = $inl$_5_m_$u$205_$u$5398;
    var $phi$1300 = $inl$_5_m_$u$205_$u$5398;
    var $phi$1301 = undefined;
    $phi$1301 = ((concat(($$compiler$prelude_jg$$concatMap($$compiler$ast_jg$$dataConNames))($phi$1300.$3)))((map(function($inl$_19_p_$u$24_$u$5458){
      var $phi$1302 = $inl$_19_p_$u$24_$u$5458;
      var $phi$1303 = undefined;
      $phi$1303 = $phi$1302.$0;
      return $phi$1303
    }))($phi$1300.$6)));
    var $inl$_5_exportDef_$u$217_$u$5406 = ($$compiler$js$ast_jg$$JSVar("exports"))($$compiler$js$ast_jg$$JSObject((map(function($inl$$inl$_5_n_$u$203_$u$3007_$u$5412){
      return ($$compiler$prelude_jg$$Pair($$compiler$js$jaguarToJs_jg$$opName($inl$$inl$_5_n_$u$203_$u$3007_$u$5412)))($$compiler$js$ast_jg$$JSRef($$compiler$js$jaguarToJs_jg$$opName($inl$$inl$_5_n_$u$203_$u$3007_$u$5412)))
    }))($phi$1301)));
    var $inl$local$instance$Hashable$1_$u$5461 = $instance$Hashable$13;
    var $inl$_19_f_$u$95_$u$5467 = function($inl$$inl$_5_d_$u$219_$u$3008_$u$5413){
      var $phi$1304 = $inl$$inl$_5_d_$u$219_$u$3008_$u$5413;
      var $phi$1305 = undefined;
      var $phi$1306 = length($phi$1304.$3);
      var $phi$1307 = undefined;
      if(1==$phi$1306){
        var $phi$1308 = (getIx(0))($phi$1304.$3);
        var $phi$1309 = undefined;
        $phi$1309 = $phi$1308.$1;
        $phi$1307 = ($$compiler$prelude_jg$$Just($phi$1309))
      } else $phi$1307 = $$compiler$prelude_jg$$Nothing;
      $phi$1305 = $phi$1307;
      return $phi$1305
    };
    var $inl$_5_cons_$u$215_$u$5407 = (((function($inl$local$instance$Eq$0_$u$5462){
      return function($inl$_19_vs_$u$251_$u$5463){
        return function($inl$_19_s_$u$252_$u$5464){
          return ((foldl(function($inl$_19_s_$u$253_$u$5465){
            return function($inl$_19_v_$u$254_$u$5466){
              return ((($$compiler$prelude_jg$$setAdd($instance$Hashable$13))($inl$local$instance$Eq$0_$u$5462))($inl$_19_v_$u$254_$u$5466))($inl$_19_s_$u$253_$u$5465)
            }
          }))($inl$_19_s_$u$252_$u$5464))($inl$_19_vs_$u$251_$u$5463)
        }
      }
    })($instance$Eq$1))((function($inl$_19_xs_$u$96_$u$5468){
      return ((foldl(function($inl$$inl$_19_r_$u$98_$u$147_$u$5469){
        return function($inl$$inl$_19_x_$u$99_$u$148_$u$5470){
          var $inl$$inl$$inl$_5_d_$u$219_$u$3008_$u$5413_$u$5833 = $inl$$inl$_19_x_$u$99_$u$148_$u$5470;
          var $phi$1312 = $inl$$inl$$inl$_5_d_$u$219_$u$3008_$u$5413_$u$5833;
          var $phi$1313 = undefined;
          var $phi$1314 = length($phi$1312.$3);
          var $phi$1315 = undefined;
          if(1==$phi$1314){
            var $phi$1316 = (getIx(0))($phi$1312.$3);
            var $phi$1317 = undefined;
            $phi$1317 = $phi$1316.$1;
            $phi$1315 = ($$compiler$prelude_jg$$Just($phi$1317))
          } else $phi$1315 = $$compiler$prelude_jg$$Nothing;
          $phi$1313 = $phi$1315;
          var $phi$1310 = $phi$1313;
          var $phi$1311 = undefined;
          if($phi$1310.$tag==$$compiler$prelude_jg$$Nothing.$tag){
            $phi$1311 = $inl$$inl$_19_r_$u$98_$u$147_$u$5469
          } else if($phi$1310.$tag==$$compiler$prelude_jg$$Just.$tag){
            $phi$1311 = ((push($phi$1310.$0))($inl$$inl$_19_r_$u$98_$u$147_$u$5469))
          } else error("pattern match fail",$phi$1310);
          return $phi$1311
        }
      }))(emptyArray))($inl$_19_xs_$u$96_$u$5468)
    })($phi$1298.$3)))($$compiler$prelude_jg$$Empty);
    var $inl$_19_f_$u$0_$u$5472 = foldl1(concat);
    var $inl$_5_defs_$u$216_$u$5408 = (function($inl$_19_a_$u$1_$u$5473){
      return $inl$_19_f_$u$0_$u$5472($inl$_19_a_$u$1_$u$5473)
    })(($$compiler$prelude_jg$$evalState(((($$compiler$js$jaguarToJs_jg$$RewriteState($inl$_5_cons_$u$215_$u$5407))($$compiler$prelude_jg$$Empty))(emptyArray))(0)))((($$compiler$prelude_jg$$mapM($instance$Monad$11))(function($inl$_5_v_$u$228_$u$5422){
      var $phi$1318 = $inl$_5_v_$u$228_$u$5422;
      var $phi$1319 = undefined;
      $phi$1319 = (($$compiler$js$jaguarToJs_jg$$rewriteExprToStmts($$compiler$js$ast_jg$$JSVar($$compiler$js$jaguarToJs_jg$$opName($phi$1318.$0))))($phi$1318.$1));
      return $phi$1319
    }))($phi$1298.$6)));
    var $inl$_5_dataDefs_$u$214_$u$5409 = ($$compiler$prelude_jg$$concatMap(function($inl$$inl$_5_d_$u$197_$u$3017_$u$5425){
      var $phi$1320 = $inl$$inl$_5_d_$u$197_$u$3017_$u$5425;
      var $phi$1321 = undefined;
      $phi$1321 = (($$compiler$prelude_jg$$concatMap(function($inl$$inl$_5_dc_$u$189_$u$3022_$u$5430){
        var $phi$1322 = $inl$$inl$_5_dc_$u$189_$u$3022_$u$5430;
        var $phi$1323 = undefined;
        var $inl$$inl$_5_conName_$u$193_$u$3026_$u$5434 = ($concat("$"))($phi$1322.$1);
        var $inl$_19_x_$u$106_$u$5474 = ($$compiler$js$ast_jg$$JSVar($inl$$inl$_5_conName_$u$193_$u$3026_$u$5434))(($$compiler$js$ast_jg$$JSFun($$compiler$js$jaguarToJs_jg$$dataConFieldIds($phi$1322.$2)))((push($$compiler$js$ast_jg$$JSExpr((($$compiler$js$ast_jg$$JSBinOp("="))(($$compiler$js$ast_jg$$JSIndex($$compiler$js$ast_jg$$JSRef("this")))($$compiler$js$ast_jg$$JSString("$tag"))))($$compiler$js$ast_jg$$JSString($phi$1322.$1)))))((map(function($inl$$inl$_5_f_$u$194_$u$3027_$u$5435){
          var $inl$_19_f_$u$0_$u$5480 = function($inl$$inl$_5_expr_$u$146_$u$3031_$u$5437){
            var $inl$_19_x_$u$103_$u$5482 = $$compiler$js$ast_jg$$JSString("con");
            return (($$compiler$js$ast_jg$$JSTernary((($$compiler$js$ast_jg$$JSBinOp("==="))($inl$$inl$_5_expr_$u$146_$u$3031_$u$5437))($$compiler$js$ast_jg$$JSUndefined)))(($$compiler$js$ast_jg$$JSCall($$compiler$js$ast_jg$$JSRef("error")))((push($inl$_19_x_$u$103_$u$5482))(emptyArray))))($inl$$inl$_5_expr_$u$146_$u$3031_$u$5437)
          };
          return $$compiler$js$ast_jg$$JSExpr((($$compiler$js$ast_jg$$JSBinOp("="))(($$compiler$js$ast_jg$$JSIndex($$compiler$js$ast_jg$$JSRef("this")))($$compiler$js$ast_jg$$JSString($inl$$inl$_5_f_$u$194_$u$3027_$u$5435))))((function($inl$_19_a_$u$1_$u$5481){
            return $inl$_19_f_$u$0_$u$5480($inl$_19_a_$u$1_$u$5481)
          })($$compiler$js$ast_jg$$JSRef($inl$$inl$_5_f_$u$194_$u$3027_$u$5435))))
        }))($$compiler$js$jaguarToJs_jg$$dataConFieldIds($phi$1322.$2)))));
        $phi$1323 = (((function($inl$_19_y_$u$107_$u$5475){
          return function($inl$_19_z_$u$108_$u$5476){
            var $inl$$inl$_19_x_$u$104_$u$144_$u$5477 = $inl$_19_x_$u$106_$u$5474;
            return (push($inl$_19_z_$u$108_$u$5476))((function($inl$$inl$_19_y_$u$105_$u$145_$u$5478){
              return (push($inl$$inl$_19_y_$u$105_$u$145_$u$5478))((push($inl$_19_x_$u$106_$u$5474))(emptyArray))
            })($inl$_19_y_$u$107_$u$5475))
          }
        })(($$compiler$js$ast_jg$$JSVar($phi$1322.$1))(((foldr(function($inl$$inl$_5_b_$u$195_$u$3028_$u$5438){
          return function($inl$$inl$_5_f_$u$196_$u$3029_$u$5439){
            var $inl$_19_x_$u$103_$u$5483 = $inl$$inl$_5_f_$u$196_$u$3029_$u$5439;
            var $inl$_19_x_$u$103_$u$5484 = $$compiler$js$ast_jg$$JSReturn($inl$$inl$_5_b_$u$195_$u$3028_$u$5438);
            return ($$compiler$js$ast_jg$$JSFun((push($inl$$inl$_5_f_$u$196_$u$3029_$u$5439))(emptyArray)))((push($inl$_19_x_$u$103_$u$5484))(emptyArray))
          }
        }))(($$compiler$js$ast_jg$$JSNew($$compiler$js$ast_jg$$JSRef($inl$$inl$_5_conName_$u$193_$u$3026_$u$5434)))((map($$compiler$js$ast_jg$$JSRef))($$compiler$js$jaguarToJs_jg$$dataConFieldIds($phi$1322.$2)))))($$compiler$js$jaguarToJs_jg$$dataConFieldIds($phi$1322.$2)))))(($$compiler$js$ast_jg$$JSAssign(($$compiler$js$ast_jg$$JSIndex($$compiler$js$ast_jg$$JSRef($phi$1322.$1)))($$compiler$js$ast_jg$$JSString("$tag"))))($$compiler$js$ast_jg$$JSString($phi$1322.$1))));
        return $phi$1323
      }))($phi$1320.$3));
      return $phi$1321
    }))($phi$1298.$3);
    var $inl$_5_imports_$u$213_$u$5410 = ($$compiler$prelude_jg$$concatMap(function($inl$$inl$_5_i_$u$183_$u$3032_$u$5440){
      var $phi$1324 = $inl$$inl$_5_i_$u$183_$u$3032_$u$5440;
      var $phi$1325 = undefined;
      if($phi$1324.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
        var $inl$$inl$_5_f_$u$178_$u$3036_$u$5444 = $phi$1324.$1;
        $phi$1325 = ((function($inl$$inl$_5_ns_$u$179_$u$3037_$u$5445){
          return (map(function($inl$$inl$_5_n_$u$180_$u$3038_$u$5446){
            var $phi$1326 = $inl$$inl$_5_n_$u$180_$u$3038_$u$5446;
            var $phi$1327 = undefined;
            var $inl$_19_x_$u$103_$u$5485 = $$compiler$js$ast_jg$$JSString($phi$1324.$1);
            $phi$1327 = (($$compiler$js$ast_jg$$JSVar($$compiler$js$jaguarToJs_jg$$opName($phi$1326.$1)))(($$compiler$js$ast_jg$$JSIndex(($$compiler$js$ast_jg$$JSCall($$compiler$js$ast_jg$$JSRef("_require")))((push($inl$_19_x_$u$103_$u$5485))(emptyArray))))($$compiler$js$ast_jg$$JSString($$compiler$js$jaguarToJs_jg$$opName($phi$1326.$0)))));
            return $phi$1327
          }))($inl$$inl$_5_ns_$u$179_$u$3037_$u$5445)
        })($phi$1324.$2))
      } else error("pattern match fail",$phi$1324);
      return $phi$1325
    }))($phi$1298.$2);
    $phi$1299 = ((push($inl$_5_exportDef_$u$217_$u$5406))((concat($inl$_5_imports_$u$213_$u$5410))((concat($inl$_5_dataDefs_$u$214_$u$5409))($inl$_5_defs_$u$216_$u$5408))));
    var $inl$_19_xs_$u$83_$u$5828 = (map($$compiler$js$printer_jg$$jsStmtToString(0)))(($$compiler$prelude_jg$$concatMap($$compiler$js$deadCode_jg$$rewriteStmt))($phi$1299));
    return (function($inl$_19_s_$u$84_$u$5829){
      var $phi$1328 = length($inl$_19_xs_$u$83_$u$5828);
      var $phi$1329 = undefined;
      if(0==$phi$1328){
        $phi$1329 = ""
      } else $phi$1329 = ((foldl1(function($inl$_19_a_$u$86_$u$5831){
        return function($inl$_19_b_$u$87_$u$5832){
          return ($concat(($concat($inl$_19_a_$u$86_$u$5831))($inl$_19_s_$u$84_$u$5829)))($inl$_19_b_$u$87_$u$5832)
        }
      }))($inl$_19_xs_$u$83_$u$5828));
      return $phi$1329
    })(";\n")
  }
};
var $instance$Applicative$1 = ($class$Applicative(function(_3_x_$u$38){
  return $$compiler$parsers_jg$$Parser($$compiler$parsers_jg$$Success(_3_x_$u$38))
}))(function(_3_pf_$u$39){
  return function(_3_pa_$u$40){
    var $phi$1330 = _3_pf_$u$39;
    var $phi$1331 = undefined;
    var $phi$1332 = _3_pa_$u$40;
    var $phi$1333 = undefined;
    $phi$1333 = ($$compiler$parsers_jg$$Parser(function(_3_i_$u$43){
      var $phi$1334 = $phi$1330.$0(_3_i_$u$43);
      var $phi$1335 = undefined;
      if($phi$1334.$tag==$$compiler$parsers_jg$$Error.$tag){
        $phi$1335 = ($$compiler$parsers_jg$$Error($phi$1334.$0))
      } else if($phi$1334.$tag==$$compiler$parsers_jg$$Success.$tag){
        var $phi$1336 = $phi$1332.$0($phi$1334.$1);
        var $phi$1337 = undefined;
        if($phi$1336.$tag==$$compiler$parsers_jg$$Error.$tag){
          $phi$1337 = ($$compiler$parsers_jg$$Error($phi$1336.$0))
        } else if($phi$1336.$tag==$$compiler$parsers_jg$$Success.$tag){
          $phi$1337 = (($$compiler$parsers_jg$$Success($phi$1334.$0($phi$1336.$0)))($phi$1336.$1))
        } else error("pattern match fail",$phi$1336);
        $phi$1335 = $phi$1337
      } else error("pattern match fail",$phi$1334);
      return $phi$1335
    }));
    $phi$1331 = $phi$1333;
    return $phi$1331
  }
});
var $instance$Alternative$2 = ($class$Alternative($$compiler$parsers_jg$$Parser(function(_3___$u$50){
  return $$compiler$parsers_jg$$Error("parser failure")
})))(function(_3_pa_$u$51){
  return function(_3_pb_$u$52){
    var $phi$1338 = _3_pa_$u$51;
    var $phi$1339 = undefined;
    var $phi$1340 = _3_pb_$u$52;
    var $phi$1341 = undefined;
    $phi$1341 = ($$compiler$parsers_jg$$Parser(function(_3_i_$u$55){
      var $phi$1342 = $phi$1338.$0(_3_i_$u$55);
      var $phi$1343 = undefined;
      if($phi$1342.$tag==$$compiler$parsers_jg$$Error.$tag){
        $phi$1343 = ($phi$1340.$0(_3_i_$u$55))
      } else if($phi$1342.$tag==$$compiler$parsers_jg$$Success.$tag){
        $phi$1343 = (($$compiler$parsers_jg$$Success($phi$1342.$0))($phi$1342.$1))
      } else error("pattern match fail",$phi$1342);
      return $phi$1343
    }));
    $phi$1339 = $phi$1341;
    return $phi$1339
  }
});
var $$compiler$parsers_jg$$letters = ($concat("abcdefghijklmnopqrstuvwxyz"))("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
var $$compiler$parsers_jg$$digits = "0123456789";
var $$compiler$parsers_jg$$opt = function(_3_a_$u$30){
  var $phi$1344 = $instance$Alternative$2;
  var $phi$1345 = undefined;
  $phi$1345 = $phi$1344.$1;
  var $phi$1346 = $instance$Applicative$1;
  var $phi$1347 = undefined;
  $phi$1347 = $phi$1346.$1;
  var $phi$1348 = $instance$Applicative$1;
  var $phi$1349 = undefined;
  $phi$1349 = $phi$1348.$0;
  return ($phi$1345(($phi$1347($phi$1349($$compiler$prelude_jg$$Just)))(_3_a_$u$30)))($$compiler$parsers_jg$$Parser($$compiler$parsers_jg$$Success($$compiler$prelude_jg$$Nothing)))
};
var $$compiler$parsers_jg$$$pip$gt = function(local$instance$Applicative$0){
  return function(_3_a_$u$3){
    return function(_3_b_$u$4){
      var $phi$1350 = local$instance$Applicative$0;
      var $phi$1351 = undefined;
      $phi$1351 = $phi$1350.$1;
      var $phi$1352 = local$instance$Applicative$0;
      var $phi$1353 = undefined;
      $phi$1353 = $phi$1352.$1;
      var $phi$1354 = local$instance$Applicative$0;
      var $phi$1355 = undefined;
      $phi$1355 = $phi$1354.$0;
      return ($phi$1351(($phi$1353($phi$1355(function(_3___$u$5){
        return function(_3_b_$u$6){
          return _3_b_$u$6
        }
      })))(_3_a_$u$3)))(_3_b_$u$4)
    }
  }
};
var $$compiler$parsers_jg$$many = function(_3_p_$u$11){
  return $$compiler$parsers_jg$$Parser(function($inl$_3_s_$u$13_$u$3121){
    var $inl$_3_r_$u$14_$u$3122 = ((iterate($$compiler$prelude_jg$$Left(($$compiler$parsers_jg$$Success(emptyArray))($inl$_3_s_$u$13_$u$3121))))(function($inl$_3_r_$u$15_$u$3123){
      var $phi$1356 = $inl$_3_r_$u$15_$u$3123;
      var $phi$1357 = undefined;
      if($phi$1356.$tag==$$compiler$prelude_jg$$Left.$tag){
        $phi$1357 = false
      } else if($phi$1356.$tag==$$compiler$prelude_jg$$Right.$tag){
        $phi$1357 = true
      } else error("pattern match fail",$phi$1356);
      return $phi$1357
    }))(function($inl$_3_rs_$u$18_$u$3126){
      var $phi$1358 = $inl$_3_rs_$u$18_$u$3126;
      var $phi$1359 = undefined;
      if(($phi$1358.$tag==$$compiler$prelude_jg$$Left.$tag)&&($phi$1358.$0.$tag==$$compiler$parsers_jg$$Success.$tag)){
        var $inl$_3_i_$u$1_$u$3135 = $phi$1358.$0.$1;
        var $phi$1362 = _3_p_$u$11;
        var $phi$1363 = undefined;
        $phi$1363 = ($phi$1362.$0($inl$_3_i_$u$1_$u$3135));
        var $phi$1360 = $phi$1363;
        var $phi$1361 = undefined;
        if($phi$1360.$tag==$$compiler$parsers_jg$$Success.$tag){
          $phi$1361 = ($$compiler$prelude_jg$$Left(($$compiler$parsers_jg$$Success((push($phi$1360.$0))($phi$1358.$0.$0)))($phi$1360.$1)))
        } else if($phi$1360.$tag==$$compiler$parsers_jg$$Error.$tag){
          $phi$1361 = ($$compiler$prelude_jg$$Right(($$compiler$parsers_jg$$Success($phi$1358.$0.$0))($phi$1358.$0.$1)))
        } else error("pattern match fail",$phi$1360);
        $phi$1359 = $phi$1361
      } else error("pattern match fail",$phi$1358);
      return $phi$1359
    });
    var $phi$1364 = $inl$_3_r_$u$14_$u$3122;
    var $phi$1365 = undefined;
    if($phi$1364.$tag==$$compiler$prelude_jg$$Right.$tag){
      $phi$1365 = $phi$1364.$0
    } else if($phi$1364.$tag==$$compiler$prelude_jg$$Left.$tag){
      $phi$1365 = (error("manyIterate should never return a Left"))
    } else error("pattern match fail",$phi$1364);
    return $phi$1365
  })
};
var $$compiler$parsers_jg$$sepBy1 = function(_3_p_$u$28){
  return function(_3_sp_$u$29){
    var $phi$1366 = $instance$Applicative$1;
    var $phi$1367 = undefined;
    $phi$1367 = $phi$1366.$1;
    var $phi$1368 = $instance$Applicative$1;
    var $phi$1369 = undefined;
    $phi$1369 = $phi$1368.$1;
    var $phi$1370 = $instance$Applicative$1;
    var $phi$1371 = undefined;
    $phi$1371 = $phi$1370.$0;
    return ($phi$1367(($phi$1369($phi$1371(enqueue)))(_3_p_$u$28)))($$compiler$parsers_jg$$many((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))(_3_sp_$u$29))(_3_p_$u$28)))
  }
};
var $$compiler$parsers_jg$$some = function(_3_p_$u$26){
  var $phi$1372 = $instance$Applicative$1;
  var $phi$1373 = undefined;
  $phi$1373 = $phi$1372.$1;
  var $phi$1374 = $instance$Applicative$1;
  var $phi$1375 = undefined;
  $phi$1375 = $phi$1374.$1;
  var $phi$1376 = $instance$Applicative$1;
  var $phi$1377 = undefined;
  $phi$1377 = $phi$1376.$0;
  return ($phi$1373(($phi$1375($phi$1377(enqueue)))(_3_p_$u$26)))($$compiler$parsers_jg$$many(_3_p_$u$26))
};
var $$compiler$parsers_jg$$$lt$pip = function(local$instance$Applicative$0){
  return function(_3_a_$u$7){
    return function(_3_b_$u$8){
      var $phi$1378 = local$instance$Applicative$0;
      var $phi$1379 = undefined;
      $phi$1379 = $phi$1378.$1;
      var $phi$1380 = local$instance$Applicative$0;
      var $phi$1381 = undefined;
      $phi$1381 = $phi$1380.$1;
      var $phi$1382 = local$instance$Applicative$0;
      var $phi$1383 = undefined;
      $phi$1383 = $phi$1382.$0;
      return ($phi$1379(($phi$1381($phi$1383(function(_3_a_$u$9){
        return function(_3___$u$10){
          return _3_a_$u$9
        }
      })))(_3_a_$u$7)))(_3_b_$u$8)
    }
  }
};
var $$compiler$jaguarLexer_jg$$mkTok = function(_2_t_$u$0){
  return $$compiler$parsers_jg$$Parser(function($inl$_2_i_$u$2_$u$3165){
    var $phi$1384 = $inl$_2_i_$u$2_$u$3165;
    var $phi$1385 = undefined;
    $phi$1385 = (($$compiler$parsers_jg$$Success(function($inl$_2_r_$u$7_$u$3170){
      return ((($$compiler$jaguarLexer_jg$$Token(_2_t_$u$0))($inl$_2_r_$u$7_$u$3170))($phi$1384.$2))($phi$1384.$3)
    }))($inl$_2_i_$u$2_$u$3165));
    return $phi$1385
  })
};
var $$compiler$jaguarLexer_jg$$parseChar = function(_2_p_$u$13){
  return $$compiler$parsers_jg$$Parser(function($inl$_2_s_$u$15_$u$3173){
    var $phi$1386 = $inl$_2_s_$u$15_$u$3173;
    var $phi$1387 = undefined;
    var $phi$1390 = $instance$Ord$2;
    var $phi$1391 = undefined;
    $phi$1391 = $phi$1390.$0;
    var $phi$1388 = ($phi$1391($phi$1386.$1))(length($phi$1386.$0));
    var $phi$1389 = undefined;
    if(!$phi$1388){
      $phi$1389 = ($$compiler$parsers_jg$$Error("no more input available"))
    } else if($phi$1388){
      var $phi$1392 = _2_p_$u$13((getChar($phi$1386.$1))($phi$1386.$0));
      var $phi$1393 = undefined;
      if(!$phi$1392){
        $phi$1393 = ($$compiler$parsers_jg$$Error("parser failed"))
      } else if($phi$1392){
        var $phi$1394 = (getChar($phi$1386.$1))($phi$1386.$0);
        var $phi$1395 = undefined;
        if("\n"==$phi$1394){
          $phi$1395 = (($$compiler$parsers_jg$$Success((getChar($phi$1386.$1))($phi$1386.$0)))(((($$compiler$jaguarLexer_jg$$LexerState($phi$1386.$0))($phi$1386.$1+1))($phi$1386.$2+1))(0)))
        } else $phi$1395 = (($$compiler$parsers_jg$$Success((getChar($phi$1386.$1))($phi$1386.$0)))(((($$compiler$jaguarLexer_jg$$LexerState($phi$1386.$0))($phi$1386.$1+1))($phi$1386.$2))($phi$1386.$3+1)));
        $phi$1393 = $phi$1395
      } else error("pattern match fail",$phi$1392);
      $phi$1389 = $phi$1393
    } else error("pattern match fail",$phi$1388);
    $phi$1387 = $phi$1389;
    return $phi$1387
  })
};
var $$compiler$jaguarLexer_jg$$concatStr = (foldl(function(_2_cs_$u$8){
  return function(_2_c_$u$9){
    return ($concat(_2_cs_$u$8))(_2_c_$u$9)
  }
}))("");
var $$compiler$jaguarLexer_jg$$someStr = function(_2_p_$u$27){
  var $phi$1396 = $instance$Applicative$1;
  var $phi$1397 = undefined;
  $phi$1397 = $phi$1396.$1;
  var $phi$1398 = $instance$Applicative$1;
  var $phi$1399 = undefined;
  $phi$1399 = $phi$1398.$0;
  return ($phi$1397($phi$1399($$compiler$jaguarLexer_jg$$concatStr)))($$compiler$parsers_jg$$some(_2_p_$u$27))
};
var $phi$1400 = $instance$Applicative$1;
var $phi$1401 = undefined;
$phi$1401 = $phi$1400.$1;
var $$compiler$jaguarLexer_jg$$whitespaceP = ($phi$1401($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$WsTok)))($$compiler$jaguarLexer_jg$$someStr($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3191){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3191))(" \n")
})));
var $$compiler$jaguarLexer_jg$$intP = $$compiler$jaguarLexer_jg$$someStr($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3193){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3193))("0123456789")
}));
var $phi$1402 = $instance$Applicative$1;
var $phi$1403 = undefined;
$phi$1403 = $phi$1402.$1;
var $phi$1404 = $instance$Applicative$1;
var $phi$1405 = undefined;
$phi$1405 = $phi$1404.$1;
var $phi$1406 = $instance$Applicative$1;
var $phi$1407 = undefined;
$phi$1407 = $phi$1406.$1;
var $phi$1408 = $instance$Applicative$1;
var $phi$1409 = undefined;
$phi$1409 = $phi$1408.$0;
var $phi$1410 = $instance$Alternative$2;
var $phi$1411 = undefined;
$phi$1411 = $phi$1410.$1;
var $phi$1412 = $instance$Applicative$1;
var $phi$1413 = undefined;
$phi$1413 = $phi$1412.$1;
var $phi$1414 = $instance$Applicative$1;
var $phi$1415 = undefined;
$phi$1415 = $phi$1414.$1;
var $phi$1416 = $instance$Applicative$1;
var $phi$1417 = undefined;
$phi$1417 = $phi$1416.$0;
var $phi$1418 = $instance$Applicative$1;
var $phi$1419 = undefined;
$phi$1419 = $phi$1418.$0;
var $$compiler$jaguarLexer_jg$$numP = ($phi$1403($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$NumTok)))(($phi$1405(($phi$1407($phi$1409($concat)))($$compiler$jaguarLexer_jg$$intP)))(($phi$1411(($phi$1413(($phi$1415($phi$1417($concat)))($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3219){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3219))(".")
}))))($$compiler$jaguarLexer_jg$$intP)))($phi$1419(""))));
var $$compiler$jaguarLexer_jg$$notCharP = function(_2_cs_$u$24){
  return $$compiler$jaguarLexer_jg$$parseChar(function(_2_c_$u$25){
    var $inl$_19_b_$u$44_$u$5486 = ($$compiler$prelude_jg$$containsChar(_2_c_$u$25))(_2_cs_$u$24);
    var $phi$1420 = $inl$_19_b_$u$44_$u$5486;
    var $phi$1421 = undefined;
    if($phi$1420){
      $phi$1421 = false
    } else if(!$phi$1420){
      $phi$1421 = true
    } else error("pattern match fail",$phi$1420);
    return $phi$1421
  })
};
var $$compiler$jaguarLexer_jg$$manyStr = function(_2_p_$u$26){
  var $phi$1422 = $instance$Applicative$1;
  var $phi$1423 = undefined;
  $phi$1423 = $phi$1422.$1;
  var $phi$1424 = $instance$Applicative$1;
  var $phi$1425 = undefined;
  $phi$1425 = $phi$1424.$0;
  return ($phi$1423($phi$1425($$compiler$jaguarLexer_jg$$concatStr)))($$compiler$parsers_jg$$many(_2_p_$u$26))
};
var $phi$1426 = $instance$Applicative$1;
var $phi$1427 = undefined;
$phi$1427 = $phi$1426.$1;
var $$compiler$jaguarLexer_jg$$lineCommentP = ($phi$1427($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$ComTok)))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3233){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3233))("/")
})))($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3235){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3235))("/")
}))))($$compiler$jaguarLexer_jg$$manyStr($$compiler$jaguarLexer_jg$$notCharP("\n"))));
var $phi$1428 = $instance$Applicative$1;
var $phi$1429 = undefined;
$phi$1429 = $phi$1428.$1;
var $$compiler$jaguarLexer_jg$$symbolP = ($phi$1429($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$SymTok)))($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3240){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3240))("()[]{},\\")
}));
var $phi$1430 = $instance$Applicative$1;
var $phi$1431 = undefined;
$phi$1431 = $phi$1430.$1;
var $phi$1432 = $instance$Applicative$1;
var $phi$1433 = undefined;
$phi$1433 = $phi$1432.$1;
var $phi$1434 = $instance$Applicative$1;
var $phi$1435 = undefined;
$phi$1435 = $phi$1434.$1;
var $phi$1436 = $instance$Applicative$1;
var $phi$1437 = undefined;
$phi$1437 = $phi$1436.$0;
var $inl$_2_cs_$u$22_$u$3253 = ($concat($$compiler$parsers_jg$$letters))("_");
var $inl$_2_cs_$u$22_$u$3255 = ($concat(($concat($$compiler$parsers_jg$$letters))("0123456789")))("_");
var $$compiler$jaguarLexer_jg$$identP = ($phi$1431($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$IdTok)))(($phi$1433(($phi$1435($phi$1437($concat)))($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3254){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3254))($inl$_2_cs_$u$22_$u$3253)
}))))($$compiler$jaguarLexer_jg$$manyStr($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3256){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3256))($inl$_2_cs_$u$22_$u$3255)
}))));
var $phi$1438 = $instance$Applicative$1;
var $phi$1439 = undefined;
$phi$1439 = $phi$1438.$1;
var $$compiler$jaguarLexer_jg$$opIdentP = ($phi$1439($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$IdTok)))((($$compiler$parsers_jg$$$lt$pip($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3261){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3261))("(")
})))($$compiler$jaguarLexer_jg$$someStr($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3263){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3263))("-+*/=:&|<>^$")
})))))($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3265){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3265))(")")
})));
var $phi$1440 = $instance$Applicative$1;
var $phi$1441 = undefined;
$phi$1441 = $phi$1440.$1;
var $$compiler$jaguarLexer_jg$$opP = ($phi$1441($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$OpTok)))($$compiler$jaguarLexer_jg$$someStr($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3270){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3270))("-+*/=:&|<>^$")
})));
var $$compiler$jaguarLexer_jg$$anyCharP = $$compiler$jaguarLexer_jg$$parseChar(function(_2___$u$21){
  return true
});
var _2_notEndOfStringP_$u$30 = $$compiler$jaguarLexer_jg$$notCharP("'");
var _2_escapeP_$u$29 = (($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3272){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3272))("\\")
})))($$compiler$jaguarLexer_jg$$anyCharP);
var $phi$1442 = $instance$Applicative$1;
var $phi$1443 = undefined;
$phi$1443 = $phi$1442.$0;
var _2_newLineP_$u$28 = (($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3274){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3274))("\\")
})))($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3276){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3276))("n")
}))))($phi$1443("\n"));
var $phi$1444 = $instance$Alternative$2;
var $phi$1445 = undefined;
$phi$1445 = $phi$1444.$1;
var $phi$1446 = $instance$Alternative$2;
var $phi$1447 = undefined;
$phi$1447 = $phi$1446.$1;
var $$compiler$jaguarLexer_jg$$stringCharP = ($phi$1445(($phi$1447(_2_newLineP_$u$28))(_2_escapeP_$u$29)))(_2_notEndOfStringP_$u$30);
var $phi$1448 = $instance$Applicative$1;
var $phi$1449 = undefined;
$phi$1449 = $phi$1448.$1;
var $$compiler$jaguarLexer_jg$$stringP = ($phi$1449($$compiler$jaguarLexer_jg$$mkTok($$compiler$jaguarLexer_jg$$StrTok)))((($$compiler$parsers_jg$$$lt$pip($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3290){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3290))("'")
})))($$compiler$jaguarLexer_jg$$manyStr($$compiler$jaguarLexer_jg$$stringCharP))))($$compiler$jaguarLexer_jg$$parseChar(function($inl$_2_c_$u$23_$u$3292){
  return ($$compiler$prelude_jg$$containsChar($inl$_2_c_$u$23_$u$3292))("'")
})));
var $phi$1450 = $instance$Alternative$2;
var $phi$1451 = undefined;
$phi$1451 = $phi$1450.$1;
var $phi$1452 = $instance$Alternative$2;
var $phi$1453 = undefined;
$phi$1453 = $phi$1452.$1;
var $phi$1454 = $instance$Alternative$2;
var $phi$1455 = undefined;
$phi$1455 = $phi$1454.$1;
var $phi$1456 = $instance$Alternative$2;
var $phi$1457 = undefined;
$phi$1457 = $phi$1456.$1;
var $phi$1458 = $instance$Alternative$2;
var $phi$1459 = undefined;
$phi$1459 = $phi$1458.$1;
var $phi$1460 = $instance$Alternative$2;
var $phi$1461 = undefined;
$phi$1461 = $phi$1460.$1;
var $phi$1462 = $instance$Alternative$2;
var $phi$1463 = undefined;
$phi$1463 = $phi$1462.$1;
var $$compiler$jaguarLexer_jg$$jaguarTokenP = $$compiler$parsers_jg$$many(($phi$1451(($phi$1453(($phi$1455(($phi$1457(($phi$1459(($phi$1461(($phi$1463($$compiler$jaguarLexer_jg$$stringP))($$compiler$jaguarLexer_jg$$whitespaceP)))($$compiler$jaguarLexer_jg$$numP)))($$compiler$jaguarLexer_jg$$lineCommentP)))($$compiler$jaguarLexer_jg$$identP)))($$compiler$jaguarLexer_jg$$opIdentP)))($$compiler$jaguarLexer_jg$$opP)))($$compiler$jaguarLexer_jg$$symbolP));
var $$compiler$jaguarLexer_jg$$tokenize = function($inl$_2_s_$u$11_$u$3315){
  var $phi$1464 = $$compiler$jaguarLexer_jg$$jaguarTokenP;
  var $phi$1465 = undefined;
  $phi$1465 = ($phi$1464.$0(((($$compiler$jaguarLexer_jg$$LexerState($inl$_2_s_$u$11_$u$3315))(0))(0))(0)));
  return $phi$1465
};
var $$compiler$jaguarParser_jg$$filterWhitespaceAndComments = filter(function(_1_t_$u$6){
  var $phi$1466 = _1_t_$u$6;
  var $phi$1467 = undefined;
  if($phi$1466.$0.$tag==$$compiler$jaguarLexer_jg$$WsTok.$tag){
    $phi$1467 = false
  } else if($phi$1466.$0.$tag==$$compiler$jaguarLexer_jg$$ComTok.$tag){
    $phi$1467 = false
  } else $phi$1467 = true;
  return $phi$1467
});
var $$compiler$jaguarParser_jg$$runParser = function(_1_p_$u$14){
  return function(_1_s_$u$15){
    return function(_1_f_$u$16){
      var $phi$1468 = $$compiler$jaguarLexer_jg$$tokenize(_1_s_$u$15);
      var $phi$1469 = undefined;
      if($phi$1468.$tag==$$compiler$parsers_jg$$Success.$tag){
        var $inl$_3_p_$u$0_$u$5487 = _1_p_$u$14;
        var $inl$_1_ts_$u$0_$u$3358 = $$compiler$jaguarParser_jg$$filterWhitespaceAndComments($phi$1468.$0);
        $phi$1469 = ((function($inl$_3_i_$u$1_$u$5488){
          var $phi$1470 = _1_p_$u$14;
          var $phi$1471 = undefined;
          $phi$1471 = ($phi$1470.$0($inl$_3_i_$u$1_$u$5488));
          return $phi$1471
        })((function($inl$_1_f_$u$1_$u$3359){
          var $phi$1472 = (getIx(0))($inl$_1_ts_$u$0_$u$3358);
          var $phi$1473 = undefined;
          $phi$1473 = $phi$1472.$3;
          return (((($$compiler$jaguarParser_jg$$ParserState($inl$_1_ts_$u$0_$u$3358))(0))($phi$1473))(0))($inl$_1_f_$u$1_$u$3359)
        })(_1_f_$u$16)))
      } else if($phi$1468.$tag==$$compiler$parsers_jg$$Error.$tag){
        $phi$1469 = ($$compiler$parsers_jg$$Error($phi$1468.$0))
      } else error("pattern match fail",$phi$1468);
      return $phi$1469
    }
  }
};
var $$compiler$jaguarParser_jg$$$lt$mul$mns$gt = function(_1_pf_$u$48){
  return function(_1_pa_$u$49){
    var $phi$1474 = _1_pf_$u$48;
    var $phi$1475 = undefined;
    var $phi$1476 = _1_pa_$u$49;
    var $phi$1477 = undefined;
    $phi$1477 = ($$compiler$parsers_jg$$Parser(function($inl$_1_s_$u$53_$u$3364){
      var $phi$1478 = $inl$_1_s_$u$53_$u$3364;
      var $phi$1479 = undefined;
      var $phi$1480 = $phi$1474.$0($inl$_1_s_$u$53_$u$3364);
      var $phi$1481 = undefined;
      if($phi$1480.$tag==$$compiler$parsers_jg$$Success.$tag){
        var $phi$1482 = $phi$1476.$0((((($$compiler$jaguarParser_jg$$ParserState($phi$1480.$1.$0))($phi$1480.$1.$1))($phi$1480.$1.$2))($phi$1478.$2+1))($phi$1480.$1.$4));
        var $phi$1483 = undefined;
        if($phi$1482.$tag==$$compiler$parsers_jg$$Success.$tag){
          $phi$1483 = (($$compiler$parsers_jg$$Success($phi$1480.$0($phi$1482.$0)))((((($$compiler$jaguarParser_jg$$ParserState($phi$1482.$1.$0))($phi$1482.$1.$1))($phi$1482.$1.$2))($phi$1478.$3))($phi$1482.$1.$4)))
        } else if($phi$1482.$tag==$$compiler$parsers_jg$$Error.$tag){
          $phi$1483 = ($$compiler$parsers_jg$$Error($phi$1482.$0))
        } else error("pattern match fail",$phi$1482);
        $phi$1481 = $phi$1483
      } else if($phi$1480.$tag==$$compiler$parsers_jg$$Error.$tag){
        $phi$1481 = ($$compiler$parsers_jg$$Error($phi$1480.$0))
      } else error("pattern match fail",$phi$1480);
      $phi$1479 = $phi$1481;
      return $phi$1479
    }));
    $phi$1475 = $phi$1477;
    return $phi$1475
  }
};
var $$compiler$jaguarParser_jg$$parseToken = function(_1_f_$u$20){
  return $$compiler$parsers_jg$$Parser(function($inl$_1_s_$u$22_$u$3390){
    var $phi$1484 = $inl$_1_s_$u$22_$u$3390;
    var $phi$1485 = undefined;
    var $phi$1488 = $instance$Ord$2;
    var $phi$1489 = undefined;
    $phi$1489 = $phi$1488.$0;
    var $phi$1486 = ($phi$1489($phi$1484.$1))(length($phi$1484.$0));
    var $phi$1487 = undefined;
    if(!$phi$1486){
      $phi$1487 = ($$compiler$parsers_jg$$Error("run out of tokens"))
    } else if($phi$1486){
      var $phi$1490 = (getIx($phi$1484.$1))($phi$1484.$0);
      var $phi$1491 = undefined;
      var $phi$1494 = $instance$Ord$2;
      var $phi$1495 = undefined;
      $phi$1495 = $phi$1494.$0;
      var $phi$1492 = ($phi$1495($phi$1490.$3))($phi$1484.$3);
      var $phi$1493 = undefined;
      if($phi$1492){
        $phi$1493 = ($$compiler$parsers_jg$$Error("token not indented sufficiently"))
      } else if(!$phi$1492){
        var $phi$1496 = _1_f_$u$20((getIx($phi$1484.$1))($phi$1484.$0));
        var $phi$1497 = undefined;
        if($phi$1496.$tag==$$compiler$prelude_jg$$Nothing.$tag){
          $phi$1497 = ($$compiler$parsers_jg$$Error("parser fun failed"))
        } else if($phi$1496.$tag==$$compiler$prelude_jg$$Just.$tag){
          var $phi$1500 = $instance$Ord$2;
          var $phi$1501 = undefined;
          $phi$1501 = $phi$1500.$0;
          var $phi$1498 = ($phi$1501($phi$1484.$1+1))(length($phi$1484.$0));
          var $phi$1499 = undefined;
          if(!$phi$1498){
            $phi$1499 = (($$compiler$parsers_jg$$Success($phi$1496.$0))((((($$compiler$jaguarParser_jg$$ParserState($phi$1484.$0))($phi$1484.$1+1))($phi$1484.$2))($phi$1484.$3))($phi$1484.$4)))
          } else if($phi$1498){
            var $phi$1502 = (getIx($phi$1484.$1+1))($phi$1484.$0);
            var $phi$1503 = undefined;
            var $phi$1504 = (($$compiler$prelude_jg$$$gt($instance$Ord$2))($phi$1502.$2))($phi$1490.$2);
            var $phi$1505 = undefined;
            if(!$phi$1504){
              $phi$1505 = (($$compiler$parsers_jg$$Success($phi$1496.$0))((((($$compiler$jaguarParser_jg$$ParserState($phi$1484.$0))($phi$1484.$1+1))($phi$1484.$2))($phi$1484.$3))($phi$1484.$4)))
            } else if($phi$1504){
              $phi$1505 = (($$compiler$parsers_jg$$Success($phi$1496.$0))((((($$compiler$jaguarParser_jg$$ParserState($phi$1484.$0))($phi$1484.$1+1))($phi$1502.$3))($phi$1484.$3))($phi$1484.$4)))
            } else error("pattern match fail",$phi$1504);
            $phi$1503 = $phi$1505;
            $phi$1499 = $phi$1503
          } else error("pattern match fail",$phi$1498);
          $phi$1497 = $phi$1499
        } else error("pattern match fail",$phi$1496);
        $phi$1493 = $phi$1497
      } else error("pattern match fail",$phi$1492);
      $phi$1491 = $phi$1493;
      $phi$1487 = $phi$1491
    } else error("pattern match fail",$phi$1486);
    $phi$1485 = $phi$1487;
    return $phi$1485
  })
};
var $$compiler$jaguarParser_jg$$operatorP = function(_1_s_$u$83){
  return $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$84){
    var $phi$1506 = _1_t_$u$84;
    var $phi$1507 = undefined;
    if($phi$1506.$0.$tag==$$compiler$jaguarLexer_jg$$OpTok.$tag){
      var $phi$1510 = $instance$Eq$1;
      var $phi$1511 = undefined;
      $phi$1511 = $phi$1510.$0;
      var $phi$1508 = ($phi$1511($phi$1506.$1))(_1_s_$u$83);
      var $phi$1509 = undefined;
      if($phi$1508){
        $phi$1509 = ($$compiler$prelude_jg$$Just(_1_s_$u$83))
      } else if(!$phi$1508){
        $phi$1509 = $$compiler$prelude_jg$$Nothing
      } else error("pattern match fail",$phi$1508);
      $phi$1507 = $phi$1509
    } else $phi$1507 = $$compiler$prelude_jg$$Nothing;
    return $phi$1507
  })
};
var $$compiler$jaguarParser_jg$$symP = function(_1_s_$u$77){
  return $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$78){
    var $phi$1512 = _1_t_$u$78;
    var $phi$1513 = undefined;
    if($phi$1512.$0.$tag==$$compiler$jaguarLexer_jg$$SymTok.$tag){
      var $phi$1516 = $instance$Eq$1;
      var $phi$1517 = undefined;
      $phi$1517 = $phi$1516.$0;
      var $phi$1514 = ($phi$1517($phi$1512.$1))(_1_s_$u$77);
      var $phi$1515 = undefined;
      if($phi$1514){
        $phi$1515 = ($$compiler$prelude_jg$$Just(_1_s_$u$77))
      } else if(!$phi$1514){
        $phi$1515 = $$compiler$prelude_jg$$Nothing
      } else error("pattern match fail",$phi$1514);
      $phi$1513 = $phi$1515
    } else $phi$1513 = $$compiler$prelude_jg$$Nothing;
    return $phi$1513
  })
};
var $$compiler$jaguarParser_jg$$parenP = function(_1_p_$u$115){
  return (($$compiler$parsers_jg$$$lt$pip($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$symP("(")))(_1_p_$u$115)))($$compiler$jaguarParser_jg$$symP(")"))
};
var $$compiler$jaguarParser_jg$$reserved = (push("as"))((push("class"))((push("where"))((push("instance"))((push("let"))((push("in"))((push("from"))((push("import"))((push("case"))((push("of"))((push("data"))(emptyArray)))))))))));
var $$compiler$jaguarParser_jg$$notUpperCaseId = $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$110){
  var $phi$1518 = _1_t_$u$110;
  var $phi$1519 = undefined;
  if($phi$1518.$0.$tag==$$compiler$jaguarLexer_jg$$IdTok.$tag){
    var $phi$1520 = ($$compiler$prelude_jg$$containsChar((getChar(0))($phi$1518.$1)))("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    var $phi$1521 = undefined;
    if(!$phi$1520){
      var $phi$1522 = (($$compiler$prelude_jg$$contains($instance$Eq$1))($phi$1518.$1))($$compiler$jaguarParser_jg$$reserved);
      var $phi$1523 = undefined;
      if(!$phi$1522){
        $phi$1523 = ($$compiler$prelude_jg$$Just($phi$1518.$1))
      } else if($phi$1522){
        $phi$1523 = $$compiler$prelude_jg$$Nothing
      } else error("pattern match fail",$phi$1522);
      $phi$1521 = $phi$1523
    } else if($phi$1520){
      $phi$1521 = $$compiler$prelude_jg$$Nothing
    } else error("pattern match fail",$phi$1520);
    $phi$1519 = $phi$1521
  } else $phi$1519 = $$compiler$prelude_jg$$Nothing;
  return $phi$1519
});
var $phi$1524 = $instance$Applicative$1;
var $phi$1525 = undefined;
$phi$1525 = $phi$1524.$1;
var $phi$1526 = $instance$Applicative$1;
var $phi$1527 = undefined;
$phi$1527 = $phi$1526.$0;
var $$compiler$jaguarParser_jg$$tvarP = ($phi$1525($phi$1527($$compiler$ast_jg$$TVar($$compiler$prelude_jg$$Empty))))($$compiler$jaguarParser_jg$$notUpperCaseId);
var $$compiler$jaguarParser_jg$$upperCaseId = $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$105){
  var $phi$1528 = _1_t_$u$105;
  var $phi$1529 = undefined;
  if($phi$1528.$0.$tag==$$compiler$jaguarLexer_jg$$IdTok.$tag){
    var $phi$1530 = ($$compiler$prelude_jg$$containsChar((getChar(0))($phi$1528.$1)))("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    var $phi$1531 = undefined;
    if($phi$1530){
      $phi$1531 = ($$compiler$prelude_jg$$Just($phi$1528.$1))
    } else if(!$phi$1530){
      $phi$1531 = $$compiler$prelude_jg$$Nothing
    } else error("pattern match fail",$phi$1530);
    $phi$1529 = $phi$1531
  } else $phi$1529 = $$compiler$prelude_jg$$Nothing;
  return $phi$1529
});
var $phi$1532 = $instance$Applicative$1;
var $phi$1533 = undefined;
$phi$1533 = $phi$1532.$1;
var $phi$1534 = $instance$Applicative$1;
var $phi$1535 = undefined;
$phi$1535 = $phi$1534.$0;
var $$compiler$jaguarParser_jg$$tconstP = ($phi$1533($phi$1535($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))))($$compiler$jaguarParser_jg$$upperCaseId);
var $$compiler$jaguarParser_jg$$typeP = $$compiler$parsers_jg$$Parser(function(_1_s_$u$173){
  var $inl$_3_p_$u$0_$u$5490 = $$compiler$jaguarParser_jg$$tfunP;
  return (function($inl$_3_i_$u$1_$u$5491){
    var $phi$1536 = $$compiler$jaguarParser_jg$$tfunP;
    var $phi$1537 = undefined;
    $phi$1537 = ($phi$1536.$0($inl$_3_i_$u$1_$u$5491));
    return $phi$1537
  })(_1_s_$u$173)
});
var $phi$1538 = $instance$Alternative$2;
var $phi$1539 = undefined;
$phi$1539 = $phi$1538.$1;
var $phi$1540 = $instance$Alternative$2;
var $phi$1541 = undefined;
$phi$1541 = $phi$1540.$1;
var $$compiler$jaguarParser_jg$$simpleTypeP = ($phi$1539(($phi$1541($$compiler$jaguarParser_jg$$tconstP))($$compiler$jaguarParser_jg$$tvarP)))($$compiler$jaguarParser_jg$$parenP($$compiler$jaguarParser_jg$$typeP));
var $phi$1542 = $instance$Applicative$1;
var $phi$1543 = undefined;
$phi$1543 = $phi$1542.$1;
var $phi$1544 = $instance$Applicative$1;
var $phi$1545 = undefined;
$phi$1545 = $phi$1544.$0;
var $$compiler$jaguarParser_jg$$tappP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1543($phi$1545(foldl($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty)))))($$compiler$jaguarParser_jg$$simpleTypeP)))($$compiler$parsers_jg$$many($$compiler$jaguarParser_jg$$simpleTypeP));
var $phi$1546 = $instance$Applicative$1;
var $phi$1547 = undefined;
$phi$1547 = $phi$1546.$1;
var $phi$1548 = $instance$Applicative$1;
var $phi$1549 = undefined;
$phi$1549 = $phi$1548.$0;
var $$compiler$jaguarParser_jg$$tfunP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1547($phi$1549(function(_1_t_$u$174){
  return function(_1_ts_$u$175){
    return (foldr1(function(_1_b_$u$176){
      return function(_1_a_$u$177){
        return (($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))((($$compiler$ast_jg$$TApp($$compiler$prelude_jg$$Empty))(($$compiler$ast_jg$$TConst($$compiler$prelude_jg$$Empty))("->")))(_1_a_$u$177)))(_1_b_$u$176)
      }
    }))((enqueue(_1_t_$u$174))(_1_ts_$u$175))
  }
})))($$compiler$jaguarParser_jg$$tappP)))($$compiler$parsers_jg$$many((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("->")))($$compiler$jaguarParser_jg$$tappP)));
var $$compiler$jaguarParser_jg$$parseType = $$compiler$jaguarParser_jg$$runParser($$compiler$jaguarParser_jg$$typeP);
var $$compiler$jaguarParser_jg$$withLocAnn = function(_1_a_$u$116){
  return (((($$compiler$ast_jg$$setAnn($instance$Hashable$13))($instance$Eq$1))("codeLoc"))(_1_a_$u$116))($$compiler$prelude_jg$$Empty)
};
var $$compiler$jaguarParser_jg$$locP = $$compiler$parsers_jg$$Parser(function($inl$_1_s_$u$38_$u$3447){
  var $phi$1550 = $inl$_1_s_$u$38_$u$3447;
  var $phi$1551 = undefined;
  var $phi$1554 = $instance$Ord$2;
  var $phi$1555 = undefined;
  $phi$1555 = $phi$1554.$0;
  var $phi$1552 = ($phi$1555($phi$1550.$1))(length($phi$1550.$0));
  var $phi$1553 = undefined;
  if(!$phi$1552){
    $phi$1553 = ($$compiler$parsers_jg$$Error("run out of tokens"))
  } else if($phi$1552){
    var $phi$1556 = (getIx($phi$1550.$1))($phi$1550.$0);
    var $phi$1557 = undefined;
    var $inl$_19_f_$u$0_$u$5493 = $$compiler$jaguarParser_jg$$withLocAnn;
    $phi$1557 = (($$compiler$parsers_jg$$Success((function($inl$_19_a_$u$1_$u$5494){
      return $$compiler$jaguarParser_jg$$withLocAnn($inl$_19_a_$u$1_$u$5494)
    })((($$compiler$ast_jg$$AnnCodeLoc($phi$1550.$4))($phi$1556.$2))($phi$1556.$3))))($inl$_1_s_$u$38_$u$3447));
    $phi$1553 = $phi$1557
  } else error("pattern match fail",$phi$1552);
  $phi$1551 = $phi$1553;
  return $phi$1551
});
var $$compiler$jaguarParser_jg$$$pip$mns$gt = function(_1_pa_$u$73){
  return function(_1_pb_$u$74){
    var $phi$1558 = $instance$Applicative$1;
    var $phi$1559 = undefined;
    $phi$1559 = $phi$1558.$1;
    var $phi$1560 = $instance$Applicative$1;
    var $phi$1561 = undefined;
    $phi$1561 = $phi$1560.$0;
    return ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1559($phi$1561(function(_1___$u$75){
      return function(_1_b_$u$76){
        return _1_b_$u$76
      }
    })))(_1_pa_$u$73)))(_1_pb_$u$74)
  }
};
var $$compiler$jaguarParser_jg$$anyOpP = $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$89){
  var $phi$1562 = _1_t_$u$89;
  var $phi$1563 = undefined;
  if($phi$1562.$0.$tag==$$compiler$jaguarLexer_jg$$OpTok.$tag){
    $phi$1563 = ($$compiler$prelude_jg$$Just($phi$1562.$1))
  } else $phi$1563 = $$compiler$prelude_jg$$Nothing;
  return $phi$1563
});
var $$compiler$jaguarParser_jg$$reservedP = function(_1_s_$u$94){
  return $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$95){
    var $phi$1564 = _1_t_$u$95;
    var $phi$1565 = undefined;
    if($phi$1564.$0.$tag==$$compiler$jaguarLexer_jg$$IdTok.$tag){
      var $phi$1568 = $instance$Eq$1;
      var $phi$1569 = undefined;
      $phi$1569 = $phi$1568.$0;
      var $phi$1566 = ($phi$1569($phi$1564.$1))(_1_s_$u$94);
      var $phi$1567 = undefined;
      if($phi$1566){
        $phi$1567 = ($$compiler$prelude_jg$$Just(_1_s_$u$94))
      } else if(!$phi$1566){
        $phi$1567 = $$compiler$prelude_jg$$Nothing
      } else error("pattern match fail",$phi$1566);
      $phi$1565 = $phi$1567
    } else $phi$1565 = $$compiler$prelude_jg$$Nothing;
    return $phi$1565
  })
};
var $phi$1570 = $instance$Applicative$1;
var $phi$1571 = undefined;
$phi$1571 = $phi$1570.$1;
var $phi$1572 = $instance$Applicative$1;
var $phi$1573 = undefined;
$phi$1573 = $phi$1572.$1;
var $phi$1574 = $instance$Applicative$1;
var $phi$1575 = undefined;
$phi$1575 = $phi$1574.$0;
var $$compiler$jaguarParser_jg$$varP = ($phi$1571(($phi$1573($phi$1575($$compiler$ast_jg$$Var)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$118){
  var $phi$1576 = _1_t_$u$118;
  var $phi$1577 = undefined;
  if($phi$1576.$0.$tag==$$compiler$jaguarLexer_jg$$IdTok.$tag){
    var $phi$1578 = (($$compiler$prelude_jg$$contains($instance$Eq$1))($phi$1576.$1))($$compiler$jaguarParser_jg$$reserved);
    var $phi$1579 = undefined;
    if($phi$1578){
      $phi$1579 = $$compiler$prelude_jg$$Nothing
    } else if(!$phi$1578){
      $phi$1579 = ($$compiler$prelude_jg$$Just($phi$1576.$1))
    } else error("pattern match fail",$phi$1578);
    $phi$1577 = $phi$1579
  } else $phi$1577 = $$compiler$prelude_jg$$Nothing;
  return $phi$1577
}));
var $phi$1580 = $instance$Applicative$1;
var $phi$1581 = undefined;
$phi$1581 = $phi$1580.$1;
var $phi$1582 = $instance$Applicative$1;
var $phi$1583 = undefined;
$phi$1583 = $phi$1582.$1;
var $phi$1584 = $instance$Applicative$1;
var $phi$1585 = undefined;
$phi$1585 = $phi$1584.$0;
var $$compiler$jaguarParser_jg$$cnumP = ($phi$1581(($phi$1583($phi$1585($$compiler$ast_jg$$Const)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$123){
  var $phi$1586 = _1_t_$u$123;
  var $phi$1587 = undefined;
  if($phi$1586.$0.$tag==$$compiler$jaguarLexer_jg$$NumTok.$tag){
    $phi$1587 = ($$compiler$prelude_jg$$Just($$compiler$ast_jg$$CNum(unsafeStringToInt($phi$1586.$1))))
  } else $phi$1587 = $$compiler$prelude_jg$$Nothing;
  return $phi$1587
}));
var $phi$1588 = $instance$Applicative$1;
var $phi$1589 = undefined;
$phi$1589 = $phi$1588.$1;
var $phi$1590 = $instance$Applicative$1;
var $phi$1591 = undefined;
$phi$1591 = $phi$1590.$1;
var $phi$1592 = $instance$Applicative$1;
var $phi$1593 = undefined;
$phi$1593 = $phi$1592.$0;
var $$compiler$jaguarParser_jg$$cstrP = ($phi$1589(($phi$1591($phi$1593($$compiler$ast_jg$$Const)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$128){
  var $phi$1594 = _1_t_$u$128;
  var $phi$1595 = undefined;
  if($phi$1594.$0.$tag==$$compiler$jaguarLexer_jg$$StrTok.$tag){
    $phi$1595 = ($$compiler$prelude_jg$$Just($$compiler$ast_jg$$CStr($phi$1594.$1)))
  } else $phi$1595 = $$compiler$prelude_jg$$Nothing;
  return $phi$1595
}));
var $phi$1596 = $instance$Alternative$2;
var $phi$1597 = undefined;
$phi$1597 = $phi$1596.$1;
var $$compiler$jaguarParser_jg$$constP = ($phi$1597($$compiler$jaguarParser_jg$$cstrP))($$compiler$jaguarParser_jg$$cnumP);
var $phi$1598 = $instance$Applicative$1;
var $phi$1599 = undefined;
$phi$1599 = $phi$1598.$1;
var $phi$1600 = $instance$Applicative$1;
var $phi$1601 = undefined;
$phi$1601 = $phi$1600.$1;
var $phi$1602 = $instance$Applicative$1;
var $phi$1603 = undefined;
$phi$1603 = $phi$1602.$0;
var $$compiler$jaguarParser_jg$$pvarP = ($phi$1599(($phi$1601($phi$1603($$compiler$ast_jg$$PVar)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$notUpperCaseId);
var $phi$1604 = $instance$Applicative$1;
var $phi$1605 = undefined;
$phi$1605 = $phi$1604.$1;
var $phi$1606 = $instance$Applicative$1;
var $phi$1607 = undefined;
$phi$1607 = $phi$1606.$1;
var $phi$1608 = $instance$Applicative$1;
var $phi$1609 = undefined;
$phi$1609 = $phi$1608.$0;
var $$compiler$jaguarParser_jg$$pcstrP = ($phi$1605(($phi$1607($phi$1609($$compiler$ast_jg$$PConst)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$147){
  var $phi$1610 = _1_t_$u$147;
  var $phi$1611 = undefined;
  if($phi$1610.$0.$tag==$$compiler$jaguarLexer_jg$$StrTok.$tag){
    $phi$1611 = ($$compiler$prelude_jg$$Just($$compiler$ast_jg$$CStr($phi$1610.$1)))
  } else $phi$1611 = $$compiler$prelude_jg$$Nothing;
  return $phi$1611
}));
var $phi$1612 = $instance$Applicative$1;
var $phi$1613 = undefined;
$phi$1613 = $phi$1612.$1;
var $phi$1614 = $instance$Applicative$1;
var $phi$1615 = undefined;
$phi$1615 = $phi$1614.$1;
var $phi$1616 = $instance$Applicative$1;
var $phi$1617 = undefined;
$phi$1617 = $phi$1616.$0;
var $$compiler$jaguarParser_jg$$pcnumP = ($phi$1613(($phi$1615($phi$1617($$compiler$ast_jg$$PConst)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$142){
  var $phi$1618 = _1_t_$u$142;
  var $phi$1619 = undefined;
  if($phi$1618.$0.$tag==$$compiler$jaguarLexer_jg$$NumTok.$tag){
    $phi$1619 = ($$compiler$prelude_jg$$Just($$compiler$ast_jg$$CNum(unsafeStringToInt($phi$1618.$1))))
  } else $phi$1619 = $$compiler$prelude_jg$$Nothing;
  return $phi$1619
}));
var $phi$1620 = $instance$Alternative$2;
var $phi$1621 = undefined;
$phi$1621 = $phi$1620.$1;
var $$compiler$jaguarParser_jg$$pconstP = ($phi$1621($$compiler$jaguarParser_jg$$pcnumP))($$compiler$jaguarParser_jg$$pcstrP);
var $$compiler$jaguarParser_jg$$patP = $$compiler$parsers_jg$$Parser(function(_1_s_$u$141){
  var $inl$_3_p_$u$0_$u$5495 = $$compiler$jaguarParser_jg$$allPatP;
  return (function($inl$_3_i_$u$1_$u$5496){
    var $phi$1622 = $$compiler$jaguarParser_jg$$allPatP;
    var $phi$1623 = undefined;
    $phi$1623 = ($phi$1622.$0($inl$_3_i_$u$1_$u$5496));
    return $phi$1623
  })(_1_s_$u$141)
});
var $phi$1624 = $instance$Applicative$1;
var $phi$1625 = undefined;
$phi$1625 = $phi$1624.$1;
var $phi$1626 = $instance$Applicative$1;
var $phi$1627 = undefined;
$phi$1627 = $phi$1626.$1;
var $phi$1628 = $instance$Applicative$1;
var $phi$1629 = undefined;
$phi$1629 = $phi$1628.$0;
var $phi$1630 = $instance$Alternative$2;
var $phi$1631 = undefined;
$phi$1631 = $phi$1630.$1;
var $phi$1632 = $instance$Alternative$2;
var $phi$1633 = undefined;
$phi$1633 = $phi$1632.$1;
var $$compiler$jaguarParser_jg$$pdataP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1625(($phi$1627($phi$1629($$compiler$ast_jg$$PData)))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$upperCaseId)))($$compiler$parsers_jg$$many(($phi$1631(($phi$1633($$compiler$jaguarParser_jg$$pvarP))($$compiler$jaguarParser_jg$$pconstP)))($$compiler$jaguarParser_jg$$parenP($$compiler$jaguarParser_jg$$patP))));
var $phi$1634 = $instance$Alternative$2;
var $phi$1635 = undefined;
$phi$1635 = $phi$1634.$1;
var $phi$1636 = $instance$Alternative$2;
var $phi$1637 = undefined;
$phi$1637 = $phi$1636.$1;
var $$compiler$jaguarParser_jg$$allPatP = ($phi$1635(($phi$1637($$compiler$jaguarParser_jg$$pvarP))($$compiler$jaguarParser_jg$$pconstP)))($$compiler$jaguarParser_jg$$pdataP);
var $$compiler$jaguarParser_jg$$exprP = $$compiler$parsers_jg$$Parser(function(_1_s_$u$133){
  var $inl$_3_p_$u$0_$u$5498 = $$compiler$jaguarParser_jg$$opP;
  return (function($inl$_3_i_$u$1_$u$5499){
    var $phi$1638 = $$compiler$jaguarParser_jg$$opP;
    var $phi$1639 = undefined;
    $phi$1639 = ($phi$1638.$0($inl$_3_i_$u$1_$u$5499));
    return $phi$1639
  })(_1_s_$u$133)
});
var $phi$1640 = $instance$Alternative$2;
var $phi$1641 = undefined;
$phi$1641 = $phi$1640.$1;
var $phi$1642 = $instance$Alternative$2;
var $phi$1643 = undefined;
$phi$1643 = $phi$1642.$1;
var $$compiler$jaguarParser_jg$$simpleExprP = ($phi$1641(($phi$1643($$compiler$jaguarParser_jg$$varP))($$compiler$jaguarParser_jg$$constP)))($$compiler$jaguarParser_jg$$parenP($$compiler$jaguarParser_jg$$exprP));
var $phi$1644 = $instance$Applicative$1;
var $phi$1645 = undefined;
$phi$1645 = $phi$1644.$1;
var $phi$1646 = $instance$Applicative$1;
var $phi$1647 = undefined;
$phi$1647 = $phi$1646.$0;
var $phi$1652 = $instance$Alternative$2;
var $phi$1653 = undefined;
$phi$1653 = $phi$1652.$1;
var $$compiler$jaguarParser_jg$$appP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1645($phi$1647(foldl(function(_1_f_$u$134){
  return function(_1_a_$u$135){
    var $inl$_19_f_$u$0_$u$5501 = function($inl$_19_m_$u$20_$u$5503){
      var $phi$1648 = $inl$_19_m_$u$20_$u$5503;
      var $phi$1649 = undefined;
      if($phi$1648.$tag==$$compiler$prelude_jg$$Just.$tag){
        $phi$1649 = $phi$1648.$0
      } else if($phi$1648.$tag==$$compiler$prelude_jg$$Nothing.$tag){
        $phi$1649 = (error("expected Just but got Nothing"))
      } else error("pattern match fail",$phi$1648);
      return $phi$1649
    };
    return (($$compiler$ast_jg$$App($$compiler$jaguarParser_jg$$withLocAnn((function($inl$_19_a_$u$1_$u$5502){
      var $inl$$inl$_19_m_$u$20_$u$5503_$u$5842 = $inl$_19_a_$u$1_$u$5502;
      var $phi$1650 = $inl$$inl$_19_m_$u$20_$u$5503_$u$5842;
      var $phi$1651 = undefined;
      if($phi$1650.$tag==$$compiler$prelude_jg$$Just.$tag){
        $phi$1651 = $phi$1650.$0
      } else if($phi$1650.$tag==$$compiler$prelude_jg$$Nothing.$tag){
        $phi$1651 = (error("expected Just but got Nothing"))
      } else error("pattern match fail",$phi$1650);
      return $phi$1651
    })(((($$compiler$ast_jg$$getAnn($instance$Hashable$13))($instance$Eq$1))("codeLoc"))($$compiler$ast_jg$$annOf(_1_f_$u$134))))))(_1_f_$u$134))(_1_a_$u$135)
  }
}))))(($phi$1653($$compiler$jaguarParser_jg$$varP))($$compiler$jaguarParser_jg$$parenP($$compiler$jaguarParser_jg$$exprP)))))($$compiler$parsers_jg$$many($$compiler$jaguarParser_jg$$simpleExprP));
var $phi$1654 = $instance$Applicative$1;
var $phi$1655 = undefined;
$phi$1655 = $phi$1654.$1;
var $phi$1656 = $instance$Applicative$1;
var $phi$1657 = undefined;
$phi$1657 = $phi$1656.$1;
var $phi$1658 = $instance$Applicative$1;
var $phi$1659 = undefined;
$phi$1659 = $phi$1658.$0;
var $$compiler$jaguarParser_jg$$lamP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1655(($phi$1657($phi$1659(function(_1_l_$u$136){
  return function(_1_ps_$u$137){
    return function(_1_a_$u$138){
      return ((foldr(function(_1_a_$u$139){
        return function(_1_p_$u$140){
          return (($$compiler$ast_jg$$Lam(_1_l_$u$136))(_1_p_$u$140))(_1_a_$u$139)
        }
      }))(_1_a_$u$138))(_1_ps_$u$137)
    }
  }
})))($$compiler$jaguarParser_jg$$locP)))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$symP("\\")))($$compiler$parsers_jg$$some($$compiler$jaguarParser_jg$$notUpperCaseId)))))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("->")))($$compiler$jaguarParser_jg$$exprP));
var $phi$1660 = $instance$Applicative$1;
var $phi$1661 = undefined;
$phi$1661 = $phi$1660.$1;
var $phi$1662 = $instance$Applicative$1;
var $phi$1663 = undefined;
$phi$1663 = $phi$1662.$0;
var $$compiler$jaguarParser_jg$$ofP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1661($phi$1663($$compiler$prelude_jg$$Pair)))($$compiler$jaguarParser_jg$$patP)))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("->")))($$compiler$jaguarParser_jg$$exprP));
var $phi$1664 = $instance$Applicative$1;
var $phi$1665 = undefined;
$phi$1665 = $phi$1664.$1;
var $phi$1666 = $instance$Applicative$1;
var $phi$1667 = undefined;
$phi$1667 = $phi$1666.$1;
var $phi$1668 = $instance$Applicative$1;
var $phi$1669 = undefined;
$phi$1669 = $phi$1668.$0;
var $$compiler$jaguarParser_jg$$caseP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1665(($phi$1667($phi$1669($$compiler$ast_jg$$Case)))($$compiler$jaguarParser_jg$$locP)))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$reservedP("case")))($$compiler$jaguarParser_jg$$simpleExprP))))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$reservedP("of")))($$compiler$parsers_jg$$some($$compiler$jaguarParser_jg$$ofP)));
var $phi$1670 = $instance$Applicative$1;
var $phi$1671 = undefined;
$phi$1671 = $phi$1670.$1;
var $phi$1672 = $instance$Applicative$1;
var $phi$1673 = undefined;
$phi$1673 = $phi$1672.$1;
var $phi$1674 = $instance$Applicative$1;
var $phi$1675 = undefined;
$phi$1675 = $phi$1674.$0;
var $$compiler$jaguarParser_jg$$defP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1671(($phi$1673($phi$1675(function(_1_l_$u$157){
  return function(_1_n_$u$158){
    return function(_1_ps_$u$159){
      return function(_1_e_$u$160){
        return ($$compiler$prelude_jg$$Pair(_1_n_$u$158))(((foldr(function(_1_e_$u$161){
          return function(_1_p_$u$162){
            return (($$compiler$ast_jg$$Lam(_1_l_$u$157))(_1_p_$u$162))(_1_e_$u$161)
          }
        }))(_1_e_$u$160))(_1_ps_$u$159))
      }
    }
  }
})))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$notUpperCaseId)))($$compiler$parsers_jg$$many($$compiler$jaguarParser_jg$$notUpperCaseId))))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("=")))($$compiler$jaguarParser_jg$$exprP));
var $phi$1676 = $instance$Applicative$1;
var $phi$1677 = undefined;
$phi$1677 = $phi$1676.$1;
var $phi$1678 = $instance$Applicative$1;
var $phi$1679 = undefined;
$phi$1679 = $phi$1678.$1;
var $phi$1680 = $instance$Applicative$1;
var $phi$1681 = undefined;
$phi$1681 = $phi$1680.$1;
var $phi$1682 = $instance$Applicative$1;
var $phi$1683 = undefined;
$phi$1683 = $phi$1682.$0;
var $$compiler$jaguarParser_jg$$letP = ($phi$1677(($phi$1679(($phi$1681($phi$1683($$compiler$ast_jg$$Let)))($$compiler$jaguarParser_jg$$locP)))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$reservedP("let")))($$compiler$parsers_jg$$some($$compiler$jaguarParser_jg$$defP)))))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$reservedP("in")))($$compiler$jaguarParser_jg$$exprP));
var $phi$1684 = $instance$Alternative$2;
var $phi$1685 = undefined;
$phi$1685 = $phi$1684.$1;
var $phi$1686 = $instance$Alternative$2;
var $phi$1687 = undefined;
$phi$1687 = $phi$1686.$1;
var $phi$1688 = $instance$Alternative$2;
var $phi$1689 = undefined;
$phi$1689 = $phi$1688.$1;
var $phi$1690 = $instance$Alternative$2;
var $phi$1691 = undefined;
$phi$1691 = $phi$1690.$1;
var $$compiler$jaguarParser_jg$$primaryExprP = ($phi$1685(($phi$1687(($phi$1689(($phi$1691($$compiler$jaguarParser_jg$$appP))($$compiler$jaguarParser_jg$$constP)))($$compiler$jaguarParser_jg$$lamP)))($$compiler$jaguarParser_jg$$caseP)))($$compiler$jaguarParser_jg$$letP);
var $phi$1692 = $instance$Applicative$1;
var $phi$1693 = undefined;
$phi$1693 = $phi$1692.$1;
var $phi$1694 = $instance$Applicative$1;
var $phi$1695 = undefined;
$phi$1695 = $phi$1694.$0;
var $phi$1698 = $instance$Applicative$1;
var $phi$1699 = undefined;
$phi$1699 = $phi$1698.$1;
var $phi$1700 = $instance$Applicative$1;
var $phi$1701 = undefined;
$phi$1701 = $phi$1700.$1;
var $phi$1702 = $instance$Applicative$1;
var $phi$1703 = undefined;
$phi$1703 = $phi$1702.$1;
var $phi$1704 = $instance$Applicative$1;
var $phi$1705 = undefined;
$phi$1705 = $phi$1704.$0;
var $$compiler$jaguarParser_jg$$opP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1693($phi$1695(function(_1_e_$u$163){
  return function(_1_oes_$u$164){
    return ((foldl(function(_1_a_$u$165){
      return function(_1_lob_$u$166){
        var $phi$1696 = _1_lob_$u$166;
        var $phi$1697 = undefined;
        $phi$1697 = ((($$compiler$ast_jg$$App($phi$1696.$0))((($$compiler$ast_jg$$App($phi$1696.$0))(($$compiler$ast_jg$$Var($phi$1696.$0))($phi$1696.$1.$0)))(_1_a_$u$165)))($phi$1696.$1.$1));
        return $phi$1697
      }
    }))(_1_e_$u$163))(_1_oes_$u$164)
  }
})))($$compiler$jaguarParser_jg$$primaryExprP)))($$compiler$parsers_jg$$many(($phi$1699(($phi$1701(($phi$1703($phi$1705(function(_1_l_$u$170){
  return function(_1_op_$u$171){
    return function(_1_e_$u$172){
      return ($$compiler$prelude_jg$$Pair(_1_l_$u$170))(($$compiler$prelude_jg$$Pair(_1_op_$u$171))(_1_e_$u$172))
    }
  }
})))($$compiler$jaguarParser_jg$$locP)))($$compiler$jaguarParser_jg$$anyOpP)))($$compiler$jaguarParser_jg$$primaryExprP)));
var $$compiler$jaguarParser_jg$$strP = $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$152){
  var $phi$1706 = _1_t_$u$152;
  var $phi$1707 = undefined;
  if($phi$1706.$0.$tag==$$compiler$jaguarLexer_jg$$StrTok.$tag){
    $phi$1707 = ($$compiler$prelude_jg$$Just($phi$1706.$1))
  } else $phi$1707 = $$compiler$prelude_jg$$Nothing;
  return $phi$1707
});
var $phi$1708 = $instance$Applicative$1;
var $phi$1709 = undefined;
$phi$1709 = $phi$1708.$1;
var $phi$1710 = $instance$Applicative$1;
var $phi$1711 = undefined;
$phi$1711 = $phi$1710.$0;
var $$compiler$jaguarParser_jg$$importAllP = ($phi$1709($phi$1711($$compiler$ast_jg$$ImportAll($$compiler$prelude_jg$$Empty))))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("*")))($$compiler$jaguarParser_jg$$reservedP("from"))))($$compiler$jaguarParser_jg$$strP));
var $$compiler$jaguarParser_jg$$nonReservedP = $$compiler$jaguarParser_jg$$parseToken(function(_1_t_$u$100){
  var $phi$1712 = _1_t_$u$100;
  var $phi$1713 = undefined;
  if($phi$1712.$0.$tag==$$compiler$jaguarLexer_jg$$IdTok.$tag){
    var $phi$1714 = (($$compiler$prelude_jg$$contains($instance$Eq$1))($phi$1712.$1))($$compiler$jaguarParser_jg$$reserved);
    var $phi$1715 = undefined;
    if($phi$1714){
      $phi$1715 = $$compiler$prelude_jg$$Nothing
    } else if(!$phi$1714){
      $phi$1715 = ($$compiler$prelude_jg$$Just($phi$1712.$1))
    } else error("pattern match fail",$phi$1714);
    $phi$1713 = $phi$1715
  } else $phi$1713 = $$compiler$prelude_jg$$Nothing;
  return $phi$1713
});
var $phi$1716 = $instance$Applicative$1;
var $phi$1717 = undefined;
$phi$1717 = $phi$1716.$1;
var $phi$1718 = $instance$Applicative$1;
var $phi$1719 = undefined;
$phi$1719 = $phi$1718.$0;
var $$compiler$jaguarParser_jg$$importNoAliasP = ($phi$1717($phi$1719(function(_1_n_$u$184){
  return ($$compiler$prelude_jg$$Pair(_1_n_$u$184))(_1_n_$u$184)
})))($$compiler$jaguarParser_jg$$nonReservedP);
var $phi$1720 = $instance$Applicative$1;
var $phi$1721 = undefined;
$phi$1721 = $phi$1720.$1;
var $phi$1722 = $instance$Applicative$1;
var $phi$1723 = undefined;
$phi$1723 = $phi$1722.$1;
var $phi$1724 = $instance$Applicative$1;
var $phi$1725 = undefined;
$phi$1725 = $phi$1724.$0;
var $$compiler$jaguarParser_jg$$importAliasP = ($phi$1721(($phi$1723($phi$1725($$compiler$prelude_jg$$Pair)))($$compiler$jaguarParser_jg$$nonReservedP)))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$reservedP("as")))($$compiler$jaguarParser_jg$$nonReservedP));
var $phi$1726 = $instance$Applicative$1;
var $phi$1727 = undefined;
$phi$1727 = $phi$1726.$1;
var $phi$1728 = $instance$Applicative$1;
var $phi$1729 = undefined;
$phi$1729 = $phi$1728.$1;
var $phi$1730 = $instance$Applicative$1;
var $phi$1731 = undefined;
$phi$1731 = $phi$1730.$0;
var $phi$1732 = $instance$Alternative$2;
var $phi$1733 = undefined;
$phi$1733 = $phi$1732.$1;
var $$compiler$jaguarParser_jg$$importOpenP = ($phi$1727(($phi$1729($phi$1731(function(_1_ns_$u$185){
  return function(_1_f_$u$186){
    return (($$compiler$ast_jg$$ImportOpen($$compiler$prelude_jg$$Empty))(_1_f_$u$186))(_1_ns_$u$185)
  }
})))((($$compiler$parsers_jg$$$lt$pip($instance$Applicative$1))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$symP("{")))(($$compiler$parsers_jg$$sepBy1(($phi$1733($$compiler$jaguarParser_jg$$importAliasP))($$compiler$jaguarParser_jg$$importNoAliasP)))($$compiler$jaguarParser_jg$$symP(",")))))($$compiler$jaguarParser_jg$$symP("}")))))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$reservedP("from")))($$compiler$jaguarParser_jg$$strP));
var $phi$1734 = $instance$Alternative$2;
var $phi$1735 = undefined;
$phi$1735 = $phi$1734.$1;
var $$compiler$jaguarParser_jg$$importP = (($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$reservedP("import")))(($phi$1735($$compiler$jaguarParser_jg$$importOpenP))($$compiler$jaguarParser_jg$$importAllP));
var $$compiler$jaguarParser_jg$$eitherP = function(_1_a_$u$200){
  return function(_1_b_$u$201){
    var $inl$_19_f_$u$0_$u$5505 = $$compiler$parsers_jg$$Parser;
    return (function($inl$_19_a_$u$1_$u$5506){
      return $$compiler$parsers_jg$$Parser($inl$_19_a_$u$1_$u$5506)
    })(function(_1_s_$u$202){
      var $phi$1736 = $instance$Alternative$2;
      var $phi$1737 = undefined;
      $phi$1737 = $phi$1736.$1;
      var $phi$1738 = $instance$Applicative$1;
      var $phi$1739 = undefined;
      $phi$1739 = $phi$1738.$1;
      var $phi$1740 = $instance$Applicative$1;
      var $phi$1741 = undefined;
      $phi$1741 = $phi$1740.$0;
      var $phi$1742 = $instance$Applicative$1;
      var $phi$1743 = undefined;
      $phi$1743 = $phi$1742.$1;
      var $phi$1744 = $instance$Applicative$1;
      var $phi$1745 = undefined;
      $phi$1745 = $phi$1744.$0;
      var $inl$_3_p_$u$0_$u$5507 = ($phi$1737(($phi$1739($phi$1741($$compiler$prelude_jg$$Left)))(_1_a_$u$200)))(($phi$1743($phi$1745($$compiler$prelude_jg$$Right)))(_1_b_$u$201));
      return (function($inl$_3_i_$u$1_$u$5508){
        var $phi$1746 = $inl$_3_p_$u$0_$u$5507;
        var $phi$1747 = undefined;
        $phi$1747 = ($phi$1746.$0($inl$_3_i_$u$1_$u$5508));
        return $phi$1747
      })(_1_s_$u$202)
    })
  }
};
var $phi$1748 = $instance$Applicative$1;
var $phi$1749 = undefined;
$phi$1749 = $phi$1748.$1;
var $phi$1750 = $instance$Applicative$1;
var $phi$1751 = undefined;
$phi$1751 = $phi$1750.$0;
var $$compiler$jaguarParser_jg$$classMemberP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1749($phi$1751($$compiler$prelude_jg$$Pair)))($$compiler$jaguarParser_jg$$notUpperCaseId)))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("::")))($$compiler$jaguarParser_jg$$typeP));
var $phi$1752 = $instance$Applicative$1;
var $phi$1753 = undefined;
$phi$1753 = $phi$1752.$1;
var $phi$1754 = $instance$Applicative$1;
var $phi$1755 = undefined;
$phi$1755 = $phi$1754.$0;
var $$compiler$jaguarParser_jg$$classP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1753($phi$1755(function(_1_name_$u$178){
  return function(_1_tv_$u$179){
    return function(_1_maybeDefs_$u$180){
      var $inl$_19_d_$u$17_$u$5510 = emptyArray;
      return ((($$compiler$ast_jg$$Class($$compiler$prelude_jg$$Empty))(_1_name_$u$178))(_1_tv_$u$179))((function($inl$_19_m_$u$18_$u$5511){
        var $phi$1756 = $inl$_19_m_$u$18_$u$5511;
        var $phi$1757 = undefined;
        if($phi$1756.$tag==$$compiler$prelude_jg$$Just.$tag){
          $phi$1757 = $phi$1756.$0
        } else if($phi$1756.$tag==$$compiler$prelude_jg$$Nothing.$tag){
          $phi$1757 = emptyArray
        } else error("pattern match fail",$phi$1756);
        return $phi$1757
      })(_1_maybeDefs_$u$180))
    }
  }
})))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$reservedP("class")))($$compiler$jaguarParser_jg$$upperCaseId))))($$compiler$jaguarParser_jg$$notUpperCaseId)))($$compiler$parsers_jg$$opt((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$reservedP("where")))($$compiler$parsers_jg$$some($$compiler$jaguarParser_jg$$classMemberP))));
var $phi$1758 = $instance$Applicative$1;
var $phi$1759 = undefined;
$phi$1759 = $phi$1758.$1;
var $phi$1760 = $instance$Applicative$1;
var $phi$1761 = undefined;
$phi$1761 = $phi$1760.$0;
var $$compiler$jaguarParser_jg$$instanceP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1759($phi$1761(function(_1_name_$u$181){
  return function(_1_t_$u$182){
    return function(_1_maybeDefs_$u$183){
      var $inl$_19_d_$u$17_$u$5513 = emptyArray;
      return ((($$compiler$ast_jg$$Instance($$compiler$prelude_jg$$Empty))(_1_name_$u$181))(_1_t_$u$182))((function($inl$_19_m_$u$18_$u$5514){
        var $phi$1762 = $inl$_19_m_$u$18_$u$5514;
        var $phi$1763 = undefined;
        if($phi$1762.$tag==$$compiler$prelude_jg$$Just.$tag){
          $phi$1763 = $phi$1762.$0
        } else if($phi$1762.$tag==$$compiler$prelude_jg$$Nothing.$tag){
          $phi$1763 = emptyArray
        } else error("pattern match fail",$phi$1762);
        return $phi$1763
      })(_1_maybeDefs_$u$183))
    }
  }
})))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$reservedP("instance")))($$compiler$jaguarParser_jg$$upperCaseId))))($$compiler$jaguarParser_jg$$simpleTypeP)))($$compiler$parsers_jg$$opt((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$reservedP("where")))($$compiler$parsers_jg$$some($$compiler$jaguarParser_jg$$defP))));
var $phi$1764 = $instance$Applicative$1;
var $phi$1765 = undefined;
$phi$1765 = $phi$1764.$1;
var $phi$1766 = $instance$Applicative$1;
var $phi$1767 = undefined;
$phi$1767 = $phi$1766.$0;
var $$compiler$jaguarParser_jg$$dataConP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1765($phi$1767($$compiler$ast_jg$$DataCon($$compiler$prelude_jg$$Empty))))($$compiler$jaguarParser_jg$$upperCaseId)))($$compiler$parsers_jg$$many($$compiler$jaguarParser_jg$$simpleTypeP));
var $phi$1768 = $instance$Applicative$1;
var $phi$1769 = undefined;
$phi$1769 = $phi$1768.$1;
var $phi$1770 = $instance$Applicative$1;
var $phi$1771 = undefined;
$phi$1771 = $phi$1770.$0;
var $$compiler$jaguarParser_jg$$dataP = ($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($$compiler$jaguarParser_jg$$$lt$mul$mns$gt(($phi$1769($phi$1771($$compiler$ast_jg$$Data($$compiler$prelude_jg$$Empty))))(($$compiler$jaguarParser_jg$$$pip$mns$gt($$compiler$jaguarParser_jg$$reservedP("data")))($$compiler$jaguarParser_jg$$upperCaseId))))($$compiler$parsers_jg$$many($$compiler$jaguarParser_jg$$notUpperCaseId))))((($$compiler$parsers_jg$$$pip$gt($instance$Applicative$1))($$compiler$jaguarParser_jg$$operatorP("=")))(($$compiler$parsers_jg$$sepBy1($$compiler$jaguarParser_jg$$dataConP))($$compiler$jaguarParser_jg$$operatorP("|"))));
var $$compiler$jaguarParser_jg$$topLevelP = ($$compiler$jaguarParser_jg$$eitherP(($$compiler$jaguarParser_jg$$eitherP($$compiler$jaguarParser_jg$$dataP))($$compiler$jaguarParser_jg$$defP)))(($$compiler$jaguarParser_jg$$eitherP($$compiler$jaguarParser_jg$$classP))($$compiler$jaguarParser_jg$$instanceP));
var $phi$1772 = $instance$Applicative$1;
var $phi$1773 = undefined;
$phi$1773 = $phi$1772.$1;
var $phi$1774 = $instance$Applicative$1;
var $phi$1775 = undefined;
$phi$1775 = $phi$1774.$1;
var $phi$1776 = $instance$Applicative$1;
var $phi$1777 = undefined;
$phi$1777 = $phi$1776.$1;
var $phi$1778 = $instance$Applicative$1;
var $phi$1779 = undefined;
$phi$1779 = $phi$1778.$0;
var $$compiler$jaguarParser_jg$$moduleP = ($phi$1773(($phi$1775(($phi$1777($phi$1779(function(_1_loc_$u$187){
  return function(_1_is_$u$188){
    return function(_1_es_$u$189){
      var $phi$1782 = $$compiler$prelude_jg$$splitEither(_1_es_$u$189);
      var $phi$1783 = undefined;
      $phi$1783 = (($$compiler$prelude_jg$$Pair($$compiler$prelude_jg$$splitEither($phi$1782.$0)))($$compiler$prelude_jg$$splitEither($phi$1782.$1)));
      var $phi$1780 = $phi$1783;
      var $phi$1781 = undefined;
      var $phi$1784 = $$compiler$ast_jg$$getAnnCodeLoc(_1_loc_$u$187);
      var $phi$1785 = undefined;
      if(($phi$1784.$tag==$$compiler$prelude_jg$$Just.$tag)&&($phi$1784.$0.$tag==$$compiler$ast_jg$$AnnCodeLoc.$tag)){
        $phi$1785 = $phi$1784.$0.$0
      } else error("pattern match fail",$phi$1784);
      $phi$1781 = ((((((($$compiler$ast_jg$$Module(_1_loc_$u$187))($phi$1785))(_1_is_$u$188))($phi$1780.$0.$0))($phi$1780.$1.$0))($phi$1780.$1.$1))($phi$1780.$0.$1));
      return $phi$1781
    }
  }
})))($$compiler$jaguarParser_jg$$locP)))($$compiler$parsers_jg$$many($$compiler$jaguarParser_jg$$importP))))($$compiler$parsers_jg$$some($$compiler$jaguarParser_jg$$topLevelP));
var $$compiler$jaguarParser_jg$$parseModule = $$compiler$jaguarParser_jg$$runParser($$compiler$jaguarParser_jg$$moduleP);
var $$compiler$compiler_jg$$findImports = function(_0_m_$u$9){
  var $phi$1786 = _0_m_$u$9;
  var $phi$1787 = undefined;
  $phi$1787 = ((map(function($inl$_0_i_$u$11_$u$4402){
    var $phi$1788 = $inl$_0_i_$u$11_$u$4402;
    var $phi$1789 = undefined;
    if($phi$1788.$tag==$$compiler$ast_jg$$ImportAll.$tag){
      $phi$1789 = $phi$1788.$1
    } else if($phi$1788.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
      $phi$1789 = $phi$1788.$1
    } else if($phi$1788.$tag==$$compiler$ast_jg$$ImportClosed.$tag){
      $phi$1789 = $phi$1788.$1
    } else error("pattern match fail",$phi$1788);
    return $phi$1789
  }))($phi$1786.$2));
  return $phi$1787
};
var $$compiler$compiler_jg$$parseT = function(_0_s_$u$27){
  var $phi$1790 = ($$compiler$jaguarParser_jg$$parseType(_0_s_$u$27))("");
  var $phi$1791 = undefined;
  if($phi$1790.$tag==$$compiler$parsers_jg$$Success.$tag){
    $phi$1791 = $phi$1790.$0
  } else $phi$1791 = (error($phi$1790));
  return $phi$1791
};
var $$compiler$compiler_jg$$parseExports = function(_0_e_$u$31){
  var _0_bs_$u$32 = (mapRecord(function(_0_s_$u$33){
    var $phi$1792 = ($$compiler$jaguarParser_jg$$parseType(_0_s_$u$33))("");
    var $phi$1793 = undefined;
    if($phi$1792.$tag==$$compiler$parsers_jg$$Success.$tag){
      $phi$1793 = $phi$1792.$0
    } else $phi$1793 = (error($phi$1792));
    return ($$compiler$prelude_jg$$evalState($$compiler$typer_jg$$newCtx))(($$compiler$typer_jg$$generalize($$compiler$typer_jg$$emptyEnv))($phi$1793))
  }))(_0_e_$u$31);
  return (($$compiler$ast_jg$$ModuleInterface(_0_bs_$u$32))(emptyArray))(emptyArray)
};
var $$compiler$compiler_jg$$instrument = function(_0_m_$u$34){
  var _0_instrumentExpr_$u$36 = function(_0_n_$u$44){
    return function(_0_e_$u$45){
      var $phi$1794 = _0_e_$u$45;
      var $phi$1795 = undefined;
      if($phi$1794.$tag==$$compiler$ast_jg$$Lam.$tag){
        $phi$1795 = ((($$compiler$ast_jg$$Lam($phi$1794.$0))($phi$1794.$1))((_0_instrumentExpr_$u$36(_0_n_$u$44))($phi$1794.$2)))
      } else {
        var _0_we_$u$50 = (($$compiler$ast_jg$$Lam($$compiler$prelude_jg$$Empty))("$unused$"))(_0_e_$u$45);
        $phi$1795 = ((($$compiler$ast_jg$$App($$compiler$prelude_jg$$Empty))((($$compiler$ast_jg$$App($$compiler$prelude_jg$$Empty))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))("perfTime")))(($$compiler$ast_jg$$Const($$compiler$prelude_jg$$Empty))($$compiler$ast_jg$$CStr(_0_n_$u$44)))))(_0_we_$u$50))
      };
      return $phi$1795
    }
  };
  var $phi$1796 = _0_m_$u$34;
  var $phi$1797 = undefined;
  $phi$1797 = ((((((($$compiler$ast_jg$$Module($phi$1796.$0))($phi$1796.$1))((map(function($inl$_0_i_$u$51_$u$4415){
    var $phi$1798 = $inl$_0_i_$u$51_$u$4415;
    var $phi$1799 = undefined;
    if(($phi$1798.$tag==$$compiler$ast_jg$$ImportOpen.$tag)&&("./builtins.js"==$phi$1798.$1)){
      $phi$1799 = ((($$compiler$ast_jg$$ImportOpen($phi$1798.$0))("./builtins.js"))((push(($$compiler$prelude_jg$$Pair("perfTime"))("perfTime")))($phi$1798.$2)))
    } else $phi$1799 = $inl$_0_i_$u$51_$u$4415;
    return $phi$1799
  }))($phi$1796.$2)))($phi$1796.$3))($phi$1796.$4))($phi$1796.$5))((map(function($inl$_0_d_$u$38_$u$4419){
    var $phi$1800 = $inl$_0_d_$u$38_$u$4419;
    var $phi$1801 = undefined;
    if($phi$1800.$1.$tag==$$compiler$ast_jg$$Lam.$tag){
      $phi$1801 = (($$compiler$prelude_jg$$Pair($phi$1800.$0))((_0_instrumentExpr_$u$36($phi$1800.$0))((($$compiler$ast_jg$$Lam($phi$1800.$1.$0))($phi$1800.$1.$1))($phi$1800.$1.$2))))
    } else $phi$1801 = $inl$_0_d_$u$38_$u$4419;
    return $phi$1801
  }))($phi$1796.$6)));
  return $phi$1797
};
var $$compiler$compiler_jg$$builtinsPathArg = ($$compiler$args_jg$$ArgString("builtins"))($$compiler$prelude_jg$$Nothing);
var $$compiler$compiler_jg$$outPathArg = ($$compiler$args_jg$$ArgString("out"))($$compiler$prelude_jg$$Nothing);
var $$compiler$compiler_jg$$mainArg = ($$compiler$args_jg$$ArgString("main"))($$compiler$prelude_jg$$Nothing);
var $$compiler$compiler_jg$$profileArg = ($$compiler$args_jg$$ArgBool("profile"))($$compiler$prelude_jg$$Just(false));
var $$compiler$compiler_jg$$compile = function(_0_s_$u$0){
  return function(_0_fn_$u$1){
    var $phi$1802 = ($$compiler$jaguarParser_jg$$parseModule(_0_s_$u$0))(_0_fn_$u$1);
    var $phi$1803 = undefined;
    if($phi$1802.$tag==$$compiler$parsers_jg$$Success.$tag){
      var $phi$1806 = $instance$Eq$0;
      var $phi$1807 = undefined;
      $phi$1807 = $phi$1806.$0;
      var $phi$1804 = ($phi$1807($phi$1802.$1.$1))(length($phi$1802.$1.$0));
      var $phi$1805 = undefined;
      if($phi$1804){
        $phi$1805 = $phi$1802.$0
      } else if(!$phi$1804){
        $phi$1805 = (error(($concat("failed to parse all tokens, stopped at "))(jsonStringify((getIx($phi$1802.$1.$1))($phi$1802.$1.$0)))))
      } else error("pattern match fail",$phi$1804);
      $phi$1803 = $phi$1805
    } else $phi$1803 = (error($phi$1802));
    return $phi$1803
  }
};
var $$compiler$compiler_jg$$argDefs = (push($$compiler$compiler_jg$$builtinsPathArg))((push($$compiler$compiler_jg$$outPathArg))((push($$compiler$compiler_jg$$mainArg))((push($$compiler$compiler_jg$$profileArg))(emptyArray))));
var $$compiler$compiler_jg$$main = function(_0_argv_$u$62){
  var $inl$_9_defs_$u$5_$u$5516 = $$compiler$compiler_jg$$argDefs;
  var _0_args_$u$63 = (function($inl$_9_argv_$u$6_$u$5517){
    var $phi$1808 = ((foldl(function($inl$$inl$_9_r_$u$8_$u$2693_$u$5518){
      return function($inl$$inl$_9_arg_$u$9_$u$2694_$u$5519){
        var $phi$1810 = $inl$$inl$_9_r_$u$8_$u$2693_$u$5518;
        var $phi$1811 = undefined;
        var $phi$1814 = $instance$Eq$1;
        var $phi$1815 = undefined;
        $phi$1815 = $phi$1814.$0;
        var $phi$1816 = $instance$Eq$1;
        var $phi$1817 = undefined;
        $phi$1817 = $phi$1816.$0;
        var $phi$1812 = ($and(($phi$1815((getChar(0))($inl$$inl$_9_arg_$u$9_$u$2694_$u$5519)))("-")))(($phi$1817((getChar(1))($inl$$inl$_9_arg_$u$9_$u$2694_$u$5519)))("-"));
        var $phi$1813 = undefined;
        if(!$phi$1812){
          $phi$1813 = (($$compiler$prelude_jg$$Pair((push($inl$$inl$_9_arg_$u$9_$u$2694_$u$5519))($phi$1810.$0)))($phi$1810.$1))
        } else if($phi$1812){
          var $inl$$inl$_9_value_$u$13_$u$2697_$u$5526 = (drop(1))((match("=.*"))($inl$$inl$_9_arg_$u$9_$u$2694_$u$5519));
          var $inl$$inl$_9_name_$u$12_$u$2698_$u$5527 = (match("[^=]+"))((drop(2))($inl$$inl$_9_arg_$u$9_$u$2694_$u$5519));
          var $phi$1818 = (($$compiler$prelude_jg$$contains($instance$Eq$1))($inl$$inl$_9_name_$u$12_$u$2698_$u$5527))((map(function($inl$$inl$_9_a_$u$0_$u$2703_$u$5528){
            var $phi$1820 = $inl$$inl$_9_a_$u$0_$u$2703_$u$5528;
            var $phi$1821 = undefined;
            if($phi$1820.$tag==$$compiler$args_jg$$ArgBool.$tag){
              $phi$1821 = $phi$1820.$0
            } else if($phi$1820.$tag==$$compiler$args_jg$$ArgString.$tag){
              $phi$1821 = $phi$1820.$0
            } else error("pattern match fail",$phi$1820);
            return $phi$1821
          }))($$compiler$compiler_jg$$argDefs));
          var $phi$1819 = undefined;
          if(!$phi$1818){
            $phi$1819 = (error(($concat("unrecognized argument "))($inl$$inl$_9_arg_$u$9_$u$2694_$u$5519)))
          } else if($phi$1818){
            $phi$1819 = (($$compiler$prelude_jg$$Pair($phi$1810.$0))(((set($inl$$inl$_9_name_$u$12_$u$2698_$u$5527))($inl$$inl$_9_value_$u$13_$u$2697_$u$5526))($phi$1810.$1)))
          } else error("pattern match fail",$phi$1818);
          $phi$1813 = $phi$1819
        } else error("pattern match fail",$phi$1812);
        $phi$1811 = $phi$1813;
        return $phi$1811
      }
    }))(($$compiler$prelude_jg$$Pair(emptyArray))(empty)))($inl$_9_argv_$u$6_$u$5517);
    var $phi$1809 = undefined;
    $phi$1809 = ((($$compiler$args_jg$$ParsedArgs($phi$1808.$0))($phi$1808.$1))($$compiler$compiler_jg$$argDefs));
    return $phi$1809
  })((slice(2))(_0_argv_$u$62));
  var _0_builtinsPath_$u$64 = ($$compiler$args_jg$$getString(_0_args_$u$63))($$compiler$compiler_jg$$builtinsPathArg);
  var _0_mainName_$u$66 = ($concat("//"))(($$compiler$args_jg$$getString(_0_args_$u$63))($$compiler$compiler_jg$$mainArg));
  var _0_builtinsExports_$u$69 = loadJSExports(_0_builtinsPath_$u$64);
  var $inl$_0_bs_$u$32_$u$4428 = (mapRecord(function($inl$_0_s_$u$33_$u$4429){
    var $phi$1822 = ($$compiler$jaguarParser_jg$$parseType($inl$_0_s_$u$33_$u$4429))("");
    var $phi$1823 = undefined;
    if($phi$1822.$tag==$$compiler$parsers_jg$$Success.$tag){
      $phi$1823 = $phi$1822.$0
    } else $phi$1823 = (error($phi$1822));
    return ($$compiler$prelude_jg$$evalState($$compiler$typer_jg$$newCtx))(($$compiler$typer_jg$$generalize($$compiler$typer_jg$$emptyEnv))($phi$1823))
  }))(_0_builtinsExports_$u$69);
  var _0_exports_$u$73 = ((set("./builtins.js"))((($$compiler$ast_jg$$ModuleInterface($inl$_0_bs_$u$32_$u$4428))(emptyArray))(emptyArray)))(empty);
  var $inl$_9_p_$u$16_$u$5535 = _0_args_$u$63;
  var $phi$1824 = _0_args_$u$63;
  var $phi$1825 = undefined;
  $phi$1825 = $phi$1824.$0;
  var _0_srcFiles_$u$67 = $phi$1825;
  var _0_compiled_$u$70 = ((foldl(function(_0_ss_$u$81){
    return function(_0_s_$u$82){
      var _0_n_$u$83 = ($concat("//"))(_0_s_$u$82);
      var $inl$_0_s_$u$0_$u$4434 = readFile(_0_s_$u$82);
      return ((set(_0_n_$u$83))((function($inl$_0_fn_$u$1_$u$4435){
        var $phi$1826 = ($$compiler$jaguarParser_jg$$parseModule($inl$_0_s_$u$0_$u$4434))($inl$_0_fn_$u$1_$u$4435);
        var $phi$1827 = undefined;
        if($phi$1826.$tag==$$compiler$parsers_jg$$Success.$tag){
          var $phi$1830 = $instance$Eq$0;
          var $phi$1831 = undefined;
          $phi$1831 = $phi$1830.$0;
          var $phi$1828 = ($phi$1831($phi$1826.$1.$1))(length($phi$1826.$1.$0));
          var $phi$1829 = undefined;
          if($phi$1828){
            $phi$1829 = $phi$1826.$0
          } else if(!$phi$1828){
            $phi$1829 = (error(($concat("failed to parse all tokens, stopped at "))(jsonStringify((getIx($phi$1826.$1.$1))($phi$1826.$1.$0)))))
          } else error("pattern match fail",$phi$1828);
          $phi$1827 = $phi$1829
        } else $phi$1827 = (error($phi$1826));
        return $phi$1827
      })(_0_n_$u$83)))(_0_ss_$u$81)
    }
  }))(empty))(_0_srcFiles_$u$67);
  var _0_imports_$u$71 = (mapRecord(function($inl$_0_m_$u$9_$u$4445){
    var $phi$1832 = $inl$_0_m_$u$9_$u$4445;
    var $phi$1833 = undefined;
    $phi$1833 = ((map(function($inl$$inl$_0_i_$u$11_$u$4447_$u$5539){
      var $phi$1834 = $inl$$inl$_0_i_$u$11_$u$4447_$u$5539;
      var $phi$1835 = undefined;
      if($phi$1834.$tag==$$compiler$ast_jg$$ImportAll.$tag){
        $phi$1835 = $phi$1834.$1
      } else if($phi$1834.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
        $phi$1835 = $phi$1834.$1
      } else if($phi$1834.$tag==$$compiler$ast_jg$$ImportClosed.$tag){
        $phi$1835 = $phi$1834.$1
      } else error("pattern match fail",$phi$1834);
      return $phi$1835
    }))($phi$1832.$2));
    return $phi$1833
  }))(_0_compiled_$u$70);
  var _0_ordered_$u$72 = (($$compiler$graph_jg$$dfs(_0_imports_$u$71))(emptyArray))(_0_mainName_$u$66);
  var $inl$_19_p_$u$27_$u$5548 = ((foldr(function($inl$_0_er_$u$84_$u$4463){
    return function($inl$_0_ixn_$u$85_$u$4464){
      var $phi$1836 = $inl$_0_er_$u$84_$u$4463;
      var $phi$1837 = undefined;
      var $phi$1838 = $inl$_0_ixn_$u$85_$u$4464;
      var $phi$1839 = undefined;
      var $inl$_0_m_$u$90_$u$4469 = (get($phi$1838.$1))(_0_compiled_$u$70);
      var $inl$_17_pre_$u$149_$u$5844 = ($concat(($concat("_"))(intToString($phi$1838.$0))))("_");
      var $inl$_11_ms_$u$0_$u$5981 = $phi$1836.$0;
      var $inl$_0_normalized_$u$91_$u$4470 = ((function($inl$_17_ms_$u$150_$u$5845){
        return function($inl$_17_m_$u$151_$u$5846){
          var $inl$$inl$_17_pre_$u$75_$u$562_$u$5847 = $inl$_17_pre_$u$149_$u$5844;
          return ($$compiler$prelude_jg$$evalState(0))(((function($inl$$inl$_17_ms_$u$76_$u$563_$u$5848){
            return function($inl$$inl$_17_m_$u$77_$u$564_$u$5849){
              var $phi$1840 = $inl$$inl$_17_m_$u$77_$u$564_$u$5849;
              var $phi$1841 = undefined;
              var $inl$$inl$_17_addBindings_$u$85_$u$572_$u$5857 = function($inl$$inl$_17_env_$u$94_$u$581_$u$5865){
                return function($inl$$inl$_17_bs_$u$95_$u$582_$u$5866){
                  return ((foldl(function($inl$$inl$_17_env_$u$96_$u$583_$u$5867){
                    return function($inl$$inl$_17_b_$u$97_$u$584_$u$5868){
                      var $inl$$inl$_19_p_$u$24_$u$4554_$u$5869 = $inl$$inl$_17_b_$u$97_$u$584_$u$5868;
                      var $phi$1842 = $inl$$inl$_17_b_$u$97_$u$584_$u$5868;
                      var $phi$1843 = undefined;
                      $phi$1843 = $phi$1842.$0;
                      var $inl$$inl$_19_f_$u$0_$u$4557_$u$5872 = $$compiler$uniquifier_jg$$addPrefix($phi$1840.$1);
                      var $inl$$inl$_19_p_$u$24_$u$4559_$u$5874 = $inl$$inl$_17_b_$u$97_$u$584_$u$5868;
                      var $phi$1844 = $inl$$inl$_17_b_$u$97_$u$584_$u$5868;
                      var $phi$1845 = undefined;
                      $phi$1845 = $phi$1844.$0;
                      return ((set($phi$1843))((function($inl$$inl$_19_a_$u$1_$u$4558_$u$5873){
                        return $inl$$inl$_19_f_$u$0_$u$4557_$u$5872($inl$$inl$_19_a_$u$1_$u$4558_$u$5873)
                      })($phi$1845)))($inl$$inl$_17_env_$u$96_$u$583_$u$5867)
                    }
                  }))($inl$$inl$_17_env_$u$94_$u$581_$u$5865))($inl$$inl$_17_bs_$u$95_$u$582_$u$5866)
                }
              };
              var $inl$$inl$_17_addBindingsNoPrefix_$u$86_$u$573_$u$5858 = function($inl$$inl$_17_env_$u$98_$u$585_$u$5877){
                return function($inl$$inl$_17_bs_$u$99_$u$586_$u$5878){
                  return ((foldl(function($inl$$inl$_17_env_$u$100_$u$587_$u$5879){
                    return function($inl$$inl$_17_b_$u$101_$u$588_$u$5880){
                      var $inl$$inl$_19_p_$u$24_$u$4562_$u$5881 = $inl$$inl$_17_b_$u$101_$u$588_$u$5880;
                      var $phi$1846 = $inl$$inl$_17_b_$u$101_$u$588_$u$5880;
                      var $phi$1847 = undefined;
                      $phi$1847 = $phi$1846.$0;
                      var $inl$$inl$_19_p_$u$24_$u$4565_$u$5884 = $inl$$inl$_17_b_$u$101_$u$588_$u$5880;
                      var $phi$1848 = $inl$$inl$_17_b_$u$101_$u$588_$u$5880;
                      var $phi$1849 = undefined;
                      $phi$1849 = $phi$1848.$0;
                      return ((set($phi$1847))($phi$1849))($inl$$inl$_17_env_$u$100_$u$587_$u$5879)
                    }
                  }))($inl$$inl$_17_env_$u$98_$u$585_$u$5877))($inl$$inl$_17_bs_$u$99_$u$586_$u$5878)
                }
              };
              var $inl$$inl$_17_addClass_$u$87_$u$574_$u$5859 = function($inl$$inl$_17_env_$u$102_$u$589_$u$5887){
                return function($inl$$inl$_17_c_$u$103_$u$590_$u$5888){
                  var $phi$1850 = $inl$$inl$_17_c_$u$103_$u$590_$u$5888;
                  var $phi$1851 = undefined;
                  $phi$1851 = (($inl$$inl$_17_addBindingsNoPrefix_$u$86_$u$573_$u$5858($inl$$inl$_17_env_$u$102_$u$589_$u$5887))($phi$1850.$3));
                  return $phi$1851
                }
              };
              var $inl$$inl$_17_env_$u$91_$u$576_$u$5860 = ((foldl(function($inl$$inl$$inl$_17_env_$u$108_$u$595_$u$4580_$u$5893){
                return function($inl$$inl$$inl$_17_i_$u$109_$u$596_$u$4581_$u$5894){
                  var $phi$1852 = $inl$$inl$$inl$_17_i_$u$109_$u$596_$u$4581_$u$5894;
                  var $phi$1853 = undefined;
                  if(($phi$1852.$tag==$$compiler$ast_jg$$ImportOpen.$tag)&&("./builtins.js"==$phi$1852.$1)){
                    var $phi$1860 = (get("./builtins.js"))($inl$$inl$_17_ms_$u$76_$u$563_$u$5848);
                    var $phi$1861 = undefined;
                    $phi$1861 = $phi$1860.$1;
                    $phi$1853 = (($inl$$inl$_17_addBindingsNoPrefix_$u$86_$u$573_$u$5858(((foldl($inl$$inl$_17_addClass_$u$87_$u$574_$u$5859))($inl$$inl$$inl$_17_env_$u$108_$u$595_$u$4580_$u$5893))($phi$1861)))((map(function($inl$$inl$$inl$_17_n_$u$115_$u$602_$u$4587_$u$5900){
                      var $inl$$inl$_19_p_$u$27_$u$4595_$u$5901 = $inl$$inl$$inl$_17_n_$u$115_$u$602_$u$4587_$u$5900;
                      var $phi$1862 = $inl$$inl$$inl$_17_n_$u$115_$u$602_$u$4587_$u$5900;
                      var $phi$1863 = undefined;
                      $phi$1863 = $phi$1862.$1;
                      var $inl$$inl$_19_p_$u$24_$u$4598_$u$5904 = $inl$$inl$$inl$_17_n_$u$115_$u$602_$u$4587_$u$5900;
                      var $phi$1864 = $inl$$inl$$inl$_17_n_$u$115_$u$602_$u$4587_$u$5900;
                      var $phi$1865 = undefined;
                      $phi$1865 = $phi$1864.$0;
                      return ($$compiler$prelude_jg$$Pair($phi$1863))($phi$1865)
                    }))($phi$1852.$2)))
                  } else if($phi$1852.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
                    var $phi$1854 = (get($phi$1852.$1))($inl$$inl$_17_ms_$u$76_$u$563_$u$5848);
                    var $phi$1855 = undefined;
                    $phi$1855 = $phi$1854.$1;
                    $phi$1853 = (($inl$$inl$_17_addBindings_$u$85_$u$572_$u$5857(((foldl($inl$$inl$_17_addClass_$u$87_$u$574_$u$5859))($inl$$inl$$inl$_17_env_$u$108_$u$595_$u$4580_$u$5893))($phi$1855)))((map(function($inl$$inl$$inl$_17_n_$u$122_$u$609_$u$4594_$u$5913){
                      var $inl$$inl$_19_p_$u$27_$u$4601_$u$5914 = $inl$$inl$$inl$_17_n_$u$122_$u$609_$u$4594_$u$5913;
                      var $phi$1856 = $inl$$inl$$inl$_17_n_$u$122_$u$609_$u$4594_$u$5913;
                      var $phi$1857 = undefined;
                      $phi$1857 = $phi$1856.$1;
                      var $inl$$inl$_19_p_$u$24_$u$4604_$u$5917 = $inl$$inl$$inl$_17_n_$u$122_$u$609_$u$4594_$u$5913;
                      var $phi$1858 = $inl$$inl$$inl$_17_n_$u$122_$u$609_$u$4594_$u$5913;
                      var $phi$1859 = undefined;
                      $phi$1859 = $phi$1858.$0;
                      return ($$compiler$prelude_jg$$Pair($phi$1857))($phi$1859)
                    }))($phi$1852.$2)))
                  } else error("pattern match fail",$phi$1852);
                  return $phi$1853
                }
              }))(((foldl($inl$$inl$_17_addClass_$u$87_$u$574_$u$5859))(($inl$$inl$_17_addBindings_$u$85_$u$572_$u$5857($$compiler$prelude_jg$$toRecord(($$compiler$prelude_jg$$concatMap(function($inl$$inl$_17_d_$u$123_$u$610_$u$5920){
                return (map(function($inl$$inl$_17_n_$u$124_$u$611_$u$5921){
                  return ($$compiler$prelude_jg$$Pair($inl$$inl$_17_n_$u$124_$u$611_$u$5921))(($$compiler$uniquifier_jg$$addPrefix($phi$1840.$1))($inl$$inl$_17_n_$u$124_$u$611_$u$5921))
                }))($$compiler$ast_jg$$dataConNames($inl$$inl$_17_d_$u$123_$u$610_$u$5920))
              }))($phi$1840.$3))))($phi$1840.$6)))($phi$1840.$4)))($phi$1840.$2);
              var $inl$$inl$_17_pre_$u$52_$u$614_$u$5922 = $inl$_17_pre_$u$149_$u$5844;
              var $inl$$inl$_17_ins2_$u$93_$u$577_$u$5861 = (($$compiler$prelude_jg$$mapM($instance$Monad$11))((function($inl$$inl$_17_env_$u$53_$u$615_$u$5923){
                return function($inl$$inl$_17_i_$u$54_$u$616_$u$5924){
                  var $phi$1866 = $inl$$inl$_17_i_$u$54_$u$616_$u$5924;
                  var $phi$1867 = undefined;
                  var $phi$1868 = $instance$Monad$11;
                  var $phi$1869 = undefined;
                  $phi$1869 = $phi$1868.$1;
                  var $inl$$inl$_17_env_$u$69_$u$626_$u$5931 = $inl$$inl$_17_env_$u$53_$u$615_$u$5923;
                  $phi$1867 = (($phi$1869((function($inl$$inl$_17_bs_$u$70_$u$627_$u$5932){
                    return (($$compiler$prelude_jg$$mapM($instance$Monad$11))(function($inl$$inl$_17_d_$u$71_$u$628_$u$5933){
                      var $phi$1870 = $inl$$inl$_17_d_$u$71_$u$628_$u$5933;
                      var $phi$1871 = undefined;
                      var $phi$1872 = $instance$Monad$11;
                      var $phi$1873 = undefined;
                      $phi$1873 = $phi$1872.$1;
                      $phi$1871 = (($phi$1873((($$compiler$uniquifier_jg$$rewriteExpr($inl$_17_pre_$u$149_$u$5844))($inl$$inl$_17_env_$u$69_$u$626_$u$5931))($phi$1870.$1)))(function($inl$$inl$_17_e_$u$74_$u$631_$u$5938){
                        var $phi$1874 = $instance$Monad$11;
                        var $phi$1875 = undefined;
                        $phi$1875 = $phi$1874.$0;
                        return $phi$1875(($$compiler$prelude_jg$$Pair($phi$1870.$0))($inl$$inl$_17_e_$u$74_$u$631_$u$5938))
                      }));
                      return $phi$1871
                    }))($inl$$inl$_17_bs_$u$70_$u$627_$u$5932)
                  })($phi$1866.$3)))(function($inl$$inl$_17_bs_$u$59_$u$621_$u$5941){
                    var $phi$1876 = $instance$Monad$11;
                    var $phi$1877 = undefined;
                    $phi$1877 = $phi$1876.$0;
                    return $phi$1877(((($$compiler$ast_jg$$Instance($phi$1866.$0))($phi$1866.$1))($phi$1866.$2))($inl$$inl$_17_bs_$u$59_$u$621_$u$5941))
                  }));
                  return $phi$1867
                }
              })($inl$$inl$_17_env_$u$91_$u$576_$u$5860)))($phi$1840.$5);
              var $inl$$inl$_17_fn_$u$61_$u$642_$u$5944 = $phi$1840.$1;
              var $inl$$inl$_17_bs2_$u$92_$u$578_$u$5862 = ((function($inl$$inl$_17_env_$u$62_$u$643_$u$5945){
                return function($inl$$inl$_17_bs_$u$63_$u$644_$u$5946){
                  return (($$compiler$prelude_jg$$mapM($instance$Monad$11))(function($inl$$inl$_17_d_$u$64_$u$645_$u$5947){
                    var $phi$1878 = $inl$$inl$_17_d_$u$64_$u$645_$u$5947;
                    var $phi$1879 = undefined;
                    var $phi$1880 = $instance$Monad$11;
                    var $phi$1881 = undefined;
                    $phi$1881 = $phi$1880.$1;
                    $phi$1879 = (($phi$1881((($$compiler$uniquifier_jg$$rewriteExpr($inl$_17_pre_$u$149_$u$5844))($inl$$inl$_17_env_$u$62_$u$643_$u$5945))($phi$1878.$1)))(function($inl$$inl$_17_e_$u$67_$u$648_$u$5952){
                      var $phi$1882 = $instance$Monad$11;
                      var $phi$1883 = undefined;
                      $phi$1883 = $phi$1882.$0;
                      return $phi$1883(($$compiler$prelude_jg$$Pair(($$compiler$uniquifier_jg$$addPrefix($inl$$inl$_17_fn_$u$61_$u$642_$u$5944))($phi$1878.$0)))($inl$$inl$_17_e_$u$67_$u$648_$u$5952))
                    }));
                    return $phi$1879
                  }))($inl$$inl$_17_bs_$u$63_$u$644_$u$5946)
                }
              })($inl$$inl$_17_env_$u$91_$u$576_$u$5860))($phi$1840.$6);
              var $inl$$inl$_17_is2_$u$90_$u$579_$u$5863 = (map(function($inl$$inl$_17_i_$u$140_$u$656_$u$5955){
                var $phi$1884 = $inl$$inl$_17_i_$u$140_$u$656_$u$5955;
                var $phi$1885 = undefined;
                if(($phi$1884.$tag==$$compiler$ast_jg$$ImportOpen.$tag)&&("./builtins.js"==$phi$1884.$1)){
                  $phi$1885 = $inl$$inl$_17_i_$u$140_$u$656_$u$5955
                } else if($phi$1884.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
                  $phi$1885 = ((($$compiler$ast_jg$$ImportOpen($phi$1884.$0))($phi$1884.$1))((map(function($inl$$inl$_17_p_$u$146_$u$662_$u$5961){
                    var $phi$1886 = $inl$$inl$_17_p_$u$146_$u$662_$u$5961;
                    var $phi$1887 = undefined;
                    $phi$1887 = (($$compiler$prelude_jg$$Pair($phi$1886.$0))(($$compiler$uniquifier_jg$$addPrefix($phi$1840.$1))($phi$1886.$1)));
                    return $phi$1887
                  }))($phi$1884.$2)))
                } else error("pattern match fail",$phi$1884);
                return $phi$1885
              }))($phi$1840.$2);
              var $inl$$inl$_17_ds2_$u$89_$u$580_$u$5864 = (map(function($inl$$inl$_17_d_$u$130_$u$666_$u$5964){
                var $phi$1888 = $inl$$inl$_17_d_$u$130_$u$666_$u$5964;
                var $phi$1889 = undefined;
                $phi$1889 = (((($$compiler$ast_jg$$Data($phi$1888.$0))($phi$1888.$1))($phi$1888.$2))((map(function($inl$$inl$_17_c_$u$135_$u$671_$u$5969){
                  var $phi$1890 = $inl$$inl$_17_c_$u$135_$u$671_$u$5969;
                  var $phi$1891 = undefined;
                  $phi$1891 = ((($$compiler$ast_jg$$DataCon($phi$1890.$0))(($$compiler$uniquifier_jg$$addPrefix($phi$1840.$1))($phi$1890.$1)))($phi$1890.$2));
                  return $phi$1891
                }))($phi$1888.$3)));
                return $phi$1889
              }))($phi$1840.$3);
              var $phi$1892 = $instance$Monad$11;
              var $phi$1893 = undefined;
              $phi$1893 = $phi$1892.$1;
              $phi$1841 = (($phi$1893($inl$$inl$_17_bs2_$u$92_$u$578_$u$5862))(function($inl$$inl$_17_bs_$u$125_$u$612_$u$5975){
                var $phi$1894 = $instance$Monad$11;
                var $phi$1895 = undefined;
                $phi$1895 = $phi$1894.$1;
                return ($phi$1895($inl$$inl$_17_ins2_$u$93_$u$577_$u$5861))(function($inl$$inl$_17_ins_$u$126_$u$613_$u$5978){
                  var $phi$1896 = $instance$Monad$11;
                  var $phi$1897 = undefined;
                  $phi$1897 = $phi$1896.$0;
                  return $phi$1897((((((($$compiler$ast_jg$$Module($phi$1840.$0))($phi$1840.$1))($inl$$inl$_17_is2_$u$90_$u$579_$u$5863))($inl$$inl$_17_ds2_$u$89_$u$580_$u$5864))($phi$1840.$4))($inl$$inl$_17_ins_$u$126_$u$613_$u$5978))($inl$$inl$_17_bs_$u$125_$u$612_$u$5975))
                })
              }));
              return $phi$1841
            }
          })($inl$_17_ms_$u$150_$u$5845))($inl$_17_m_$u$151_$u$5846))
        }
      })($phi$1836.$0))((function($inl$_11_m_$u$1_$u$5982){
        var $phi$1898 = $inl$_11_m_$u$1_$u$5982;
        var $phi$1899 = undefined;
        var $inl$_11_getFromDefs_$u$9_$u$5990 = function($inl$_11_ds_$u$15_$u$5995){
          return ((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))(emptyArray))((map(function($inl$_11_v_$u$16_$u$5996){
            var $inl$$inl$_19_p_$u$27_$u$5121_$u$5997 = $inl$_11_v_$u$16_$u$5996;
            var $phi$1900 = $inl$_11_v_$u$16_$u$5996;
            var $phi$1901 = undefined;
            $phi$1901 = $phi$1900.$1;
            return $$compiler$typer_jg$$freeVars($phi$1901)
          }))($inl$_11_ds_$u$15_$u$5995))
        };
        var $inl$_11_freeVarsInDefs_$u$10_$u$5991 = $inl$_11_getFromDefs_$u$9_$u$5990($phi$1898.$6);
        var $inl$_11_freeVarsInIns_$u$11_$u$5992 = ((foldl(($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1)))(emptyArray))((map(function($inl$_11_i_$u$17_$u$6000){
          var $phi$1902 = $inl$_11_i_$u$17_$u$6000;
          var $phi$1903 = undefined;
          $phi$1903 = ($inl$_11_getFromDefs_$u$9_$u$5990($phi$1902.$3));
          return $phi$1903
        }))($phi$1898.$5));
        var $inl$_11_fvs_$u$13_$u$5993 = (filter(function($inl$_11_v_$u$22_$u$6005){
          var $inl$$inl$_19_b_$u$44_$u$5124_$u$6006 = (($$compiler$prelude_jg$$contains($instance$Eq$1))($inl$_11_v_$u$22_$u$6005))(emptyArray);
          var $phi$1904 = $inl$$inl$_19_b_$u$44_$u$5124_$u$6006;
          var $phi$1905 = undefined;
          if($phi$1904){
            $phi$1905 = false
          } else if(!$phi$1904){
            $phi$1905 = true
          } else error("pattern match fail",$phi$1904);
          return $phi$1905
        }))(((($$compiler$prelude_jg$$mergeSet($instance$Ord$3))($instance$Eq$1))($inl$_11_freeVarsInDefs_$u$10_$u$5991))($inl$_11_freeVarsInIns_$u$11_$u$5992));
        var $inl$$inl$_11_freeVars_$u$24_$u$2101_$u$6007 = $inl$_11_fvs_$u$13_$u$5993;
        var $inl$_11_is2_$u$14_$u$5994 = (map(function($inl$$inl$_11_i_$u$25_$u$2102_$u$6008){
          var $phi$1906 = $inl$$inl$_11_i_$u$25_$u$2102_$u$6008;
          var $phi$1907 = undefined;
          if($phi$1906.$tag==$$compiler$ast_jg$$ImportClosed.$tag){
            $phi$1907 = (error("closed imports not supported"))
          } else if($phi$1906.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
            $phi$1907 = ((($$compiler$ast_jg$$ImportOpen($phi$1906.$0))($phi$1906.$1))((map(function($inl$$inl$_11_p_$u$32_$u$2109_$u$6015){
              var $phi$1912 = $inl$$inl$_11_p_$u$32_$u$2109_$u$6015;
              var $phi$1913 = undefined;
              var $inl$$inl$_11_n_$u$47_$u$2124_$u$6018 = $phi$1912.$0;
              $phi$1913 = (($$compiler$prelude_jg$$Pair(($concat(($concat(((stringReplaceChar("/"))("$"))(((stringReplaceChar("."))("_"))($phi$1906.$1))))("$$")))($inl$$inl$_11_n_$u$47_$u$2124_$u$6018)))($phi$1912.$1));
              return $phi$1913
            }))($phi$1906.$2)))
          } else if(($phi$1906.$tag==$$compiler$ast_jg$$ImportAll.$tag)&&("./builtins.js"==$phi$1906.$1)){
            var $phi$1910 = (get("./builtins.js"))($inl$_11_ms_$u$0_$u$5981);
            var $phi$1911 = undefined;
            $phi$1911 = ((($$compiler$ast_jg$$ImportOpen($phi$1906.$0))("./builtins.js"))((map(function($inl$$inl$_11_n_$u$39_$u$2116_$u$6023){
              return ($$compiler$prelude_jg$$Pair($inl$$inl$_11_n_$u$39_$u$2116_$u$6023))($inl$$inl$_11_n_$u$39_$u$2116_$u$6023)
            }))(keys($phi$1910.$0))));
            $phi$1907 = $phi$1911
          } else if($phi$1906.$tag==$$compiler$ast_jg$$ImportAll.$tag){
            var $phi$1908 = (get($phi$1906.$1))($inl$_11_ms_$u$0_$u$5981);
            var $phi$1909 = undefined;
            $phi$1909 = ((($$compiler$ast_jg$$ImportOpen($phi$1906.$0))($phi$1906.$1))((map(function($inl$$inl$_11_n_$u$45_$u$2122_$u$6029){
              return ($$compiler$prelude_jg$$Pair($inl$$inl$_11_n_$u$45_$u$2122_$u$6029))((drop((length($phi$1906.$1))+2))($inl$$inl$_11_n_$u$45_$u$2122_$u$6029))
            }))(keys($phi$1908.$0))));
            $phi$1907 = $phi$1909
          } else error("pattern match fail",$phi$1906);
          return $phi$1907
        }))((enqueue(($$compiler$ast_jg$$ImportAll($$compiler$prelude_jg$$Empty))("./builtins.js")))($phi$1898.$2));
        $phi$1899 = ((((((($$compiler$ast_jg$$Module($phi$1898.$0))($phi$1898.$1))($inl$_11_is2_$u$14_$u$5994))($phi$1898.$3))($phi$1898.$4))($phi$1898.$5))($phi$1898.$6));
        return $phi$1899
      })($inl$_0_m_$u$90_$u$4469));
      var $inl$_12_ms_$u$547_$u$6030 = $phi$1836.$0;
      var $inl$_0_typed_$u$92_$u$4471 = (function($inl$_12_m_$u$548_$u$6031){
        var $inl$_12_addClass_$u$552_$u$6032 = function($inl$_12_env_$u$582_$u$6033){
          return function($inl$_12_c_$u$583_$u$6034){
            return ((foldl(function($inl$_12_env_$u$584_$u$6035){
              return function($inl$_12_b_$u$585_$u$6036){
                var $inl$$inl$_19_p_$u$24_$u$5079_$u$6037 = $inl$_12_b_$u$585_$u$6036;
                var $phi$1914 = $inl$_12_b_$u$585_$u$6036;
                var $phi$1915 = undefined;
                $phi$1915 = $phi$1914.$0;
                var $inl$$inl$_19_p_$u$27_$u$5082_$u$6040 = $inl$_12_b_$u$585_$u$6036;
                var $phi$1916 = $inl$_12_b_$u$585_$u$6036;
                var $phi$1917 = undefined;
                $phi$1917 = $phi$1916.$1;
                return (($$compiler$typer_jg$$addBinding($phi$1915))($phi$1917))($inl$_12_env_$u$584_$u$6035)
              }
            }))($inl$_12_env_$u$582_$u$6033))($$compiler$typer_jg$$classToBindings($inl$_12_c_$u$583_$u$6034))
          }
        };
        var $phi$1918 = $inl$_12_m_$u$548_$u$6031;
        var $phi$1919 = undefined;
        var $inl$_12_env2_$u$609_$u$6050 = ((foldl(function($inl$$inl$_12_env_$u$559_$u$2012_$u$6058){
          return function($inl$$inl$_12_i_$u$560_$u$2013_$u$6059){
            var $phi$1922 = $inl$$inl$_12_i_$u$560_$u$2013_$u$6059;
            var $phi$1923 = undefined;
            if($phi$1922.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
              $phi$1923 = $phi$1922.$1
            } else error("pattern match fail",$phi$1922);
            var $phi$1920 = ($$compiler$typer_jg$$getSafe($phi$1923))($inl$_12_ms_$u$547_$u$6030);
            var $phi$1921 = undefined;
            var $phi$1924 = $inl$$inl$_12_i_$u$560_$u$2013_$u$6059;
            var $phi$1925 = undefined;
            if($phi$1924.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
              $phi$1925 = (((foldl(function($inl$$inl$_12_env_$u$570_$u$2023_$u$6072){
                return function($inl$$inl$_12_n_$u$571_$u$2024_$u$6073){
                  var $phi$1926 = $inl$$inl$_12_n_$u$571_$u$2024_$u$6073;
                  var $phi$1927 = undefined;
                  $phi$1927 = ((($$compiler$typer_jg$$addBinding($phi$1926.$1))(($$compiler$typer_jg$$getSafe($phi$1926.$0))($phi$1920.$0)))($inl$$inl$_12_env_$u$570_$u$2023_$u$6072));
                  return $phi$1927
                }
              }))($inl$$inl$_12_env_$u$559_$u$2012_$u$6058))($phi$1924.$2))
            } else error("pattern match fail",$phi$1924);
            var $inl$$inl$_12_env2_$u$564_$u$2017_$u$6066 = $phi$1925;
            var $inl$$inl$_12_env3_$u$565_$u$2018_$u$6067 = ((foldl($inl$_12_addClass_$u$552_$u$6032))($inl$$inl$_12_env2_$u$564_$u$2017_$u$6066))($phi$1920.$1);
            var $inl$$inl$_12_env4_$u$566_$u$2019_$u$6068 = ((foldl(function($inl$$inl$_12_env_$u$574_$u$2027_$u$6076){
              return function($inl$$inl$_12_i_$u$575_$u$2028_$u$6077){
                return ($$compiler$typer_jg$$addInstance($inl$$inl$_12_i_$u$575_$u$2028_$u$6077))($inl$$inl$_12_env_$u$574_$u$2027_$u$6076)
              }
            }))($inl$$inl$_12_env3_$u$565_$u$2018_$u$6067))($phi$1920.$2);
            $phi$1921 = $inl$$inl$_12_env4_$u$566_$u$2019_$u$6068;
            return $phi$1921
          }
        }))($$compiler$typer_jg$$emptyEnv))($phi$1918.$2);
        var $inl$_12_env3_$u$610_$u$6051 = ((foldl(function($inl$$inl$_12_env_$u$576_$u$2033_$u$6078){
          return function($inl$$inl$_12_dt_$u$577_$u$2034_$u$6079){
            return ((foldl(function($inl$$inl$_12_env_$u$578_$u$2035_$u$6080){
              return function($inl$$inl$_12_c_$u$579_$u$2036_$u$6081){
                var $phi$1928 = $inl$$inl$_12_c_$u$579_$u$2036_$u$6081;
                var $phi$1929 = undefined;
                $phi$1929 = ((($$compiler$typer_jg$$addBinding($phi$1928.$0))($phi$1928.$1))($inl$$inl$_12_env_$u$578_$u$2035_$u$6080));
                return $phi$1929
              }
            }))($inl$$inl$_12_env_$u$576_$u$2033_$u$6078))($$compiler$typer_jg$$conTypes($inl$$inl$_12_dt_$u$577_$u$2034_$u$6079))
          }
        }))($inl$_12_env2_$u$609_$u$6050))($phi$1918.$3);
        var $inl$_12_env4_$u$611_$u$6052 = ((foldl($inl$_12_addClass_$u$552_$u$6032))($inl$_12_env3_$u$610_$u$6051))($phi$1918.$4);
        var $inl$_12_env5_$u$612_$u$6053 = ((foldl(function($inl$$inl$_12_env_$u$586_$u$2039_$u$6084){
          return function($inl$$inl$_12_i_$u$587_$u$2040_$u$6085){
            return ($$compiler$typer_jg$$addInstance($$compiler$typer_jg$$instanceToTypeBound($inl$$inl$_12_i_$u$587_$u$2040_$u$6085)))($inl$$inl$_12_env_$u$586_$u$2039_$u$6084)
          }
        }))($inl$_12_env4_$u$611_$u$6052))($phi$1918.$5);
        var $inl$_12_ds2_$u$613_$u$6054 = ($$compiler$prelude_jg$$evalState($$compiler$typer_jg$$newCtx))(($$compiler$typer_jg$$inferDefs($inl$_12_env5_$u$612_$u$6053))($phi$1918.$6));
        var $inl$_12_ds3_$u$614_$u$6055 = (map(function($inl$$inl$_12_d_$u$588_$u$2041_$u$6086){
          var $inl$$inl$_19_p_$u$27_$u$5088_$u$6088 = $inl$$inl$_12_d_$u$588_$u$2041_$u$6086;
          var $phi$1932 = $inl$$inl$_12_d_$u$588_$u$2041_$u$6086;
          var $phi$1933 = undefined;
          $phi$1933 = $phi$1932.$1;
          var $inl$$inl$_18_e_$u$129_$u$5085_$u$6087 = $phi$1933;
          var $inl$$inl$_19_f_$u$0_$u$5086_$u$6091 = $$compiler$ast_jg$$getAnnType;
          var $phi$1930 = (function($inl$$inl$_19_a_$u$1_$u$5087_$u$6092){
            return $$compiler$ast_jg$$getAnnType($inl$$inl$_19_a_$u$1_$u$5087_$u$6092)
          })($$compiler$ast_jg$$annOf($inl$$inl$_18_e_$u$129_$u$5085_$u$6087));
          var $phi$1931 = undefined;
          if($phi$1930.$tag==$$compiler$ast_jg$$TForall.$tag){
            var $phi$1934 = $phi$1930.$3;
            var $phi$1935 = undefined;
            if(($phi$1934.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$1934.$1.$tag==$$compiler$ast_jg$$TApp.$tag)&&(($phi$1934.$1.$1.$tag==$$compiler$ast_jg$$TConst.$tag)&&("->"==$phi$1934.$1.$1.$1)))){
              $phi$1935 = $inl$$inl$_12_d_$u$588_$u$2041_$u$6086
            } else {
              var $phi$1936 = length($phi$1930.$2);
              var $phi$1937 = undefined;
              if(0==$phi$1936){
                $phi$1937 = $inl$$inl$_12_d_$u$588_$u$2041_$u$6086
              } else {
                var $inl$$inl$_19_p_$u$24_$u$5091_$u$6104 = $inl$$inl$_12_d_$u$588_$u$2041_$u$6086;
                var $phi$1938 = $inl$$inl$_12_d_$u$588_$u$2041_$u$6086;
                var $phi$1939 = undefined;
                $phi$1939 = $phi$1938.$0;
                var $inl$$inl$_19_p_$u$27_$u$5097_$u$6108 = $inl$$inl$_12_d_$u$588_$u$2041_$u$6086;
                var $phi$1940 = $inl$$inl$_12_d_$u$588_$u$2041_$u$6086;
                var $phi$1941 = undefined;
                $phi$1941 = $phi$1940.$1;
                var $inl$$inl$_18_e_$u$129_$u$5094_$u$6107 = $phi$1941;
                var $inl$$inl$_19_f_$u$0_$u$5095_$u$6111 = $$compiler$ast_jg$$getAnnType;
                $phi$1937 = (error(($concat(($concat(($concat("unsatisfied bounds in def of "))($phi$1939)))(" :: ")))($$compiler$printer_jg$$printType((function($inl$$inl$_19_a_$u$1_$u$5096_$u$6112){
                  return $$compiler$ast_jg$$getAnnType($inl$$inl$_19_a_$u$1_$u$5096_$u$6112)
                })($$compiler$ast_jg$$annOf($inl$$inl$_18_e_$u$129_$u$5094_$u$6107))))))
              };
              $phi$1935 = $phi$1937
            };
            $phi$1931 = $phi$1935
          } else $phi$1931 = $inl$$inl$_12_d_$u$588_$u$2041_$u$6086;
          return $phi$1931
        }))($inl$_12_ds2_$u$613_$u$6054);
        var $inl$_12_env6_$u$615_$u$6056 = ((foldl(function($inl$_12_env_$u$617_$u$6114){
          return function($inl$_12_d_$u$618_$u$6115){
            var $phi$1942 = $inl$_12_d_$u$618_$u$6115;
            var $phi$1943 = undefined;
            var $inl$$inl$_18_e_$u$129_$u$5100_$u$6118 = $phi$1942.$1;
            var $inl$$inl$_19_f_$u$0_$u$5101_$u$6119 = $$compiler$ast_jg$$getAnnType;
            $phi$1943 = ((($$compiler$typer_jg$$addBinding($phi$1942.$0))((function($inl$$inl$_19_a_$u$1_$u$5102_$u$6120){
              return $$compiler$ast_jg$$getAnnType($inl$$inl$_19_a_$u$1_$u$5102_$u$6120)
            })($$compiler$ast_jg$$annOf($phi$1942.$1))))($inl$_12_env_$u$617_$u$6114));
            return $phi$1943
          }
        }))($inl$_12_env5_$u$612_$u$6053))($inl$_12_ds3_$u$614_$u$6055);
        var $inl$$inl$_12_cs_$u$504_$u$2055_$u$6121 = (concat($phi$1918.$4))(($$compiler$prelude_jg$$concatMap(function($inl$_12_i_$u$621_$u$6158){
          var $phi$1946 = $inl$_12_i_$u$621_$u$6158;
          var $phi$1947 = undefined;
          if($phi$1946.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
            $phi$1947 = $phi$1946.$1
          } else error("pattern match fail",$phi$1946);
          var $phi$1944 = ($$compiler$typer_jg$$getSafe($phi$1947))($inl$_12_ms_$u$547_$u$6030);
          var $phi$1945 = undefined;
          $phi$1945 = $phi$1944.$1;
          return $phi$1945
        }))($phi$1918.$2));
        var $inl$_12_ins2_$u$616_$u$6057 = (map(function($inl$$inl$_12_i_$u$505_$u$2056_$u$6122){
          var $phi$1948 = $inl$$inl$_12_i_$u$505_$u$2056_$u$6122;
          var $phi$1949 = undefined;
          var $phi$1950 = ($$compiler$prelude_jg$$find(function($inl$$inl$_12_c_$u$514_$u$2065_$u$6127){
            var $phi$1952 = $inl$$inl$_12_c_$u$514_$u$2065_$u$6127;
            var $phi$1953 = undefined;
            var $phi$1954 = $instance$Eq$1;
            var $phi$1955 = undefined;
            $phi$1955 = $phi$1954.$0;
            $phi$1953 = (($phi$1955($phi$1948.$1))($phi$1952.$1));
            return $phi$1953
          }))($inl$$inl$_12_cs_$u$504_$u$2055_$u$6121);
          var $phi$1951 = undefined;
          if($phi$1950.$tag==$$compiler$prelude_jg$$Nothing.$tag){
            $phi$1951 = (error(($concat("Cannot find clas "))($phi$1948.$1)))
          } else if($phi$1950.$tag==$$compiler$prelude_jg$$Just.$tag){
            var $inl$$inl$_12_bs2_$u$523_$u$2074_$u$6137 = ((foldl(function($inl$$inl$_12_bs_$u$525_$u$2076_$u$6139){
              return function($inl$$inl$_12_b_$u$526_$u$2077_$u$6140){
                var $phi$1956 = $inl$$inl$_12_b_$u$526_$u$2077_$u$6140;
                var $phi$1957 = undefined;
                $phi$1957 = (((set($phi$1956.$0))((($$compiler$typer_jg$$substitute($phi$1950.$0.$2))($phi$1948.$2))($phi$1956.$1)))($inl$$inl$_12_bs_$u$525_$u$2076_$u$6139));
                return $phi$1957
              }
            }))(empty))($phi$1950.$0.$3);
            var $inl$$inl$_12_ds2_$u$524_$u$2075_$u$6138 = (map(function($inl$$inl$_12_d_$u$529_$u$2080_$u$6143){
              var $phi$1958 = $inl$$inl$_12_d_$u$529_$u$2080_$u$6143;
              var $phi$1959 = undefined;
              var $inl$$inl$$inl$_12_e_$u$507_$u$2058_$u$5108_$u$6146 = ($$compiler$ast_jg$$setType(($$compiler$typer_jg$$getSafe($phi$1958.$0))($inl$$inl$_12_bs2_$u$523_$u$2074_$u$6137)))($phi$1958.$1);
              var $inl$$inl$_19_s_$u$145_$u$5118_$u$6148 = $$compiler$typer_jg$$newCtx;
              var $inl$$inl$_19_f_$u$0_$u$5116_$u$6147 = function($inl$$inl$_19_m_$u$146_$u$5119_$u$6149){
                var $phi$1962 = $inl$$inl$_19_m_$u$146_$u$5119_$u$6149;
                var $phi$1963 = undefined;
                $phi$1963 = ($phi$1962.$0($$compiler$typer_jg$$newCtx));
                return $phi$1963
              };
              var $phi$1960 = (function($inl$$inl$_19_a_$u$1_$u$5117_$u$6151){
                return $inl$$inl$_19_f_$u$0_$u$5116_$u$6147($inl$$inl$_19_a_$u$1_$u$5117_$u$6151)
              })(($$compiler$typer_jg$$infer($inl$_12_env6_$u$615_$u$6056))($inl$$inl$$inl$_12_e_$u$507_$u$2058_$u$5108_$u$6146));
              var $phi$1961 = undefined;
              var $phi$1964 = $phi$1960.$0;
              var $phi$1965 = undefined;
              $phi$1965 = $phi$1964.$0;
              $phi$1961 = (($$compiler$typer_jg$$applySubsE($phi$1965))($phi$1960.$1));
              $phi$1959 = (($$compiler$prelude_jg$$Pair($phi$1958.$0))($phi$1961));
              return $phi$1959
            }))($phi$1948.$3);
            $phi$1951 = (((($$compiler$ast_jg$$Instance($phi$1948.$0))($phi$1948.$1))($phi$1948.$2))($inl$$inl$_12_ds2_$u$524_$u$2075_$u$6138))
          } else error("pattern match fail",$phi$1950);
          $phi$1949 = $phi$1951;
          return $phi$1949
        }))($phi$1918.$5);
        $phi$1919 = ((((((($$compiler$ast_jg$$Module($phi$1918.$0))($phi$1918.$1))($phi$1918.$2))($phi$1918.$3))($phi$1918.$4))($inl$_12_ins2_$u$616_$u$6057))($inl$_12_ds3_$u$614_$u$6055));
        return $phi$1919
      })($inl$_0_normalized_$u$91_$u$4470);
      var $inl$_10_ms_$u$0_$u$6165 = $phi$1836.$0;
      var $inl$_0_declassed_$u$94_$u$4472 = (function($inl$_10_m_$u$1_$u$6166){
        var $phi$1966 = $inl$_10_m_$u$1_$u$6166;
        var $phi$1967 = undefined;
        var $inl$_10_isi_$u$9_$u$6174 = ((foldl(function($inl$$inl$_10_isi_$u$33_$u$2570_$u$6186){
          return function($inl$$inl$_10_ixi_$u$34_$u$2571_$u$6187){
            var $phi$1968 = $inl$$inl$_10_isi_$u$33_$u$2570_$u$6186;
            var $phi$1969 = undefined;
            var $phi$1970 = $inl$$inl$_10_ixi_$u$34_$u$2571_$u$6187;
            var $phi$1971 = undefined;
            if($phi$1970.$1.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
              var $phi$1972 = (get($phi$1970.$1.$1))($inl$_10_ms_$u$0_$u$6165);
              var $phi$1973 = undefined;
              var $inl$$inl$_10_imix_$u$53_$u$2590_$u$6197 = $phi$1970.$0;
              var $phi$1974 = ((foldl(function($inl$$inl$_10_nbs_$u$54_$u$2591_$u$6198){
                return function($inl$$inl$_10_ib_$u$55_$u$2592_$u$6199){
                  var $phi$1976 = $inl$$inl$_10_nbs_$u$54_$u$2591_$u$6198;
                  var $phi$1977 = undefined;
                  var $phi$1978 = $inl$$inl$_10_ib_$u$55_$u$2592_$u$6199;
                  var $phi$1979 = undefined;
                  var $inl$$inl$_10_inix_$u$346_$u$2600_$u$6206 = $phi$1978.$0;
                  var $inl$$inl$_10_alias_$u$61_$u$2597_$u$6204 = (function($inl$$inl$_10_b_$u$347_$u$2601_$u$6207){
                    var $phi$1980 = $inl$$inl$_10_b_$u$347_$u$2601_$u$6207;
                    var $phi$1981 = undefined;
                    $phi$1981 = (($concat(($concat(($concat(($concat(($concat("$import"))(intToString($phi$1970.$0))))("$instance$")))($phi$1980.$1)))("$")))(intToString($inl$$inl$_10_inix_$u$346_$u$2600_$u$6206)));
                    return $phi$1981
                  })($phi$1978.$1);
                  var $inl$$inl$_10_i_$u$341_$u$2606_$u$6211 = $phi$1978.$1;
                  var $phi$1982 = $inl$$inl$_10_i_$u$341_$u$2606_$u$6211;
                  var $phi$1983 = undefined;
                  $phi$1983 = (($concat(($concat(($concat("$instance$"))($phi$1982.$1)))("$")))(intToString($phi$1978.$0)));
                  var $inl$$inl$_10_symbol_$u$60_$u$2598_$u$6205 = $phi$1983;
                  $phi$1979 = (($$compiler$prelude_jg$$Pair((push(($$compiler$prelude_jg$$Pair($inl$$inl$_10_symbol_$u$60_$u$2598_$u$6205))($inl$$inl$_10_alias_$u$61_$u$2597_$u$6204)))($phi$1976.$0)))((push(($$compiler$prelude_jg$$Pair($inl$$inl$_10_alias_$u$61_$u$2597_$u$6204))($phi$1978.$1)))($phi$1976.$1)));
                  $phi$1977 = $phi$1979;
                  return $phi$1977
                }
              }))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray)))($$compiler$prelude_jg$$zipWithIndex($phi$1972.$2));
              var $phi$1975 = undefined;
              var $inl$$inl$_10_cns_$u$46_$u$2583_$u$6217 = (map(function($inl$$inl$_10_n_$u$47_$u$2584_$u$6218){
                return ($$compiler$prelude_jg$$Pair($inl$$inl$_10_n_$u$47_$u$2584_$u$6218))($inl$$inl$_10_n_$u$47_$u$2584_$u$6218)
              }))(($$compiler$prelude_jg$$concatMap(function($inl$$inl$_10_c_$u$48_$u$2585_$u$6219){
                var $phi$1984 = $inl$$inl$_10_c_$u$48_$u$2585_$u$6219;
                var $phi$1985 = undefined;
                $phi$1985 = ((enqueue(($concat("$class$"))($phi$1984.$1)))((map(function($inl$$inl$_19_p_$u$24_$u$5225_$u$6224){
                  var $phi$1986 = $inl$$inl$_19_p_$u$24_$u$5225_$u$6224;
                  var $phi$1987 = undefined;
                  $phi$1987 = $phi$1986.$0;
                  return $phi$1987
                }))($phi$1984.$3)));
                return $phi$1985
              }))($phi$1972.$1));
              $phi$1975 = (($$compiler$prelude_jg$$Pair((push((($$compiler$ast_jg$$ImportOpen($phi$1970.$1.$0))($phi$1970.$1.$1))((concat($phi$1970.$1.$2))((concat($phi$1974.$0))($inl$$inl$_10_cns_$u$46_$u$2583_$u$6217)))))($phi$1968.$0)))((concat($phi$1968.$1))($phi$1974.$1)));
              $phi$1973 = $phi$1975;
              $phi$1971 = $phi$1973
            } else error("pattern match fail",$phi$1970);
            $phi$1969 = $phi$1971;
            return $phi$1969
          }
        }))(($$compiler$prelude_jg$$Pair(emptyArray))(emptyArray)))($$compiler$prelude_jg$$zipWithIndex($phi$1966.$2));
        var $inl$$inl$_19_p_$u$27_$u$5228_$u$6227 = $inl$_10_isi_$u$9_$u$6174;
        var $phi$1988 = $inl$_10_isi_$u$9_$u$6174;
        var $phi$1989 = undefined;
        $phi$1989 = $phi$1988.$1;
        var $inl$_10_importedInstances_$u$11_$u$6175 = $phi$1989;
        var $inl$_10_availableInstances_$u$14_$u$6176 = (concat($inl$_10_importedInstances_$u$11_$u$6175))((map(function($inl$_10_p_$u$21_$u$6230){
          var $phi$1990 = $inl$_10_p_$u$21_$u$6230;
          var $phi$1991 = undefined;
          $phi$1991 = (($$compiler$prelude_jg$$Pair(($$compiler$declasser_jg$$instanceName($phi$1990.$0))($phi$1990.$1)))($$compiler$typer_jg$$instanceToTypeBound($phi$1990.$1)));
          return $phi$1991
        }))($$compiler$prelude_jg$$zipWithIndex($phi$1966.$5)));
        var $inl$_10_classesAsData_$u$12_$u$6177 = (map(function($inl$$inl$_10_c_$u$62_$u$2611_$u$6233){
          var $phi$1992 = $inl$$inl$_10_c_$u$62_$u$2611_$u$6233;
          var $phi$1993 = undefined;
          var $inl$$inl$_10_ps_$u$68_$u$2616_$u$6238 = (map(function($inl$$inl$_19_p_$u$27_$u$5231_$u$6240){
            var $phi$1994 = $inl$$inl$_19_p_$u$27_$u$5231_$u$6240;
            var $phi$1995 = undefined;
            $phi$1995 = $phi$1994.$1;
            return $phi$1995
          }))(sort($$compiler$typer_jg$$classToBindings($inl$$inl$_10_c_$u$62_$u$2611_$u$6233)));
          var $inl$$inl$_10_name_$u$67_$u$2617_$u$6239 = ($concat("$class$"))($phi$1992.$1);
          var $inl$$inl$_19_x_$u$103_$u$5234_$u$6243 = $phi$1992.$2;
          var $inl$$inl$_19_x_$u$103_$u$5235_$u$6244 = (($$compiler$ast_jg$$DataCon($$compiler$prelude_jg$$Empty))($inl$$inl$_10_name_$u$67_$u$2617_$u$6239))($inl$$inl$_10_ps_$u$68_$u$2616_$u$6238);
          $phi$1993 = (((($$compiler$ast_jg$$Data($$compiler$prelude_jg$$Empty))($inl$$inl$_10_name_$u$67_$u$2617_$u$6239))((push($phi$1992.$2))(emptyArray)))((push($inl$$inl$_19_x_$u$103_$u$5235_$u$6244))(emptyArray)));
          return $phi$1993
        }))($phi$1966.$4);
        var $inl$_10_dt2_$u$15_$u$6178 = (concat($phi$1966.$3))($inl$_10_classesAsData_$u$12_$u$6177);
        var $inl$_10_dataFuns_$u$16_$u$6179 = ($$compiler$prelude_jg$$concatMap($$compiler$typer_jg$$conTypes))($inl$_10_dt2_$u$15_$u$6178);
        var $inl$_10_classFuns_$u$13_$u$6180 = ($$compiler$prelude_jg$$concatMap(function($inl$$inl$_10_c_$u$69_$u$2619_$u$6245){
          var $phi$1996 = $inl$$inl$_10_c_$u$69_$u$2619_$u$6245;
          var $phi$1997 = undefined;
          var $phi$1998 = $inl$$inl$_10_c_$u$69_$u$2619_$u$6245;
          var $phi$1999 = undefined;
          $phi$1999 = (($concat("$class$"))($phi$1998.$1));
          var $inl$$inl$_10_name_$u$74_$u$2624_$u$6250 = $phi$1999;
          var $inl$$inl$_10_bsForPat_$u$75_$u$2625_$u$6251 = (map(function($inl$$inl$_10_b_$u$78_$u$2628_$u$6257){
            var $inl$$inl$_19_p_$u$24_$u$5236_$u$6258 = $inl$$inl$_10_b_$u$78_$u$2628_$u$6257;
            var $phi$2000 = $inl$$inl$_10_b_$u$78_$u$2628_$u$6257;
            var $phi$2001 = undefined;
            $phi$2001 = $phi$2000.$0;
            return ($$compiler$ast_jg$$PVar($$compiler$prelude_jg$$Empty))(($concat($phi$2001))("_"))
          }))(sort($phi$1996.$3));
          var $inl$$inl$_10_v_$u$76_$u$2626_$u$6252 = ($concat("x_"))($inl$$inl$_10_name_$u$74_$u$2624_$u$6250);
          $phi$1997 = ((map(function($inl$$inl$$inl$_10_b_$u$79_$u$2629_$u$5240_$u$6261){
            var $phi$2002 = $inl$$inl$$inl$_10_b_$u$79_$u$2629_$u$5240_$u$6261;
            var $phi$2003 = undefined;
            var $inl$$inl$_19_x_$u$103_$u$5243_$u$6264 = ($$compiler$prelude_jg$$Pair((($$compiler$ast_jg$$PData($$compiler$prelude_jg$$Empty))($inl$$inl$_10_name_$u$74_$u$2624_$u$6250))($inl$$inl$_10_bsForPat_$u$75_$u$2625_$u$6251)))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))(($concat($phi$2002.$0))("_")));
            $phi$2003 = (($$compiler$prelude_jg$$Pair($phi$2002.$0))(($$compiler$ast_jg$$setType($phi$2002.$1))((($$compiler$ast_jg$$Lam($$compiler$prelude_jg$$Empty))($inl$$inl$_10_v_$u$76_$u$2626_$u$6252))((($$compiler$ast_jg$$Case($$compiler$prelude_jg$$Empty))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))($inl$$inl$_10_v_$u$76_$u$2626_$u$6252)))((push($inl$$inl$_19_x_$u$103_$u$5243_$u$6264))(emptyArray))))));
            return $phi$2003
          }))($$compiler$typer_jg$$classToBindings($inl$$inl$_10_c_$u$69_$u$2619_$u$6245)));
          return $phi$1997
        }))($phi$1966.$4);
        var $inl$$inl$_10_is_$u$289_$u$2639_$u$6272 = $phi$1966.$2;
        var $inl$_10_env_$u$17_$u$6181 = ((foldl(function($inl$_10_env_$u$24_$u$6265){
          return function($inl$_10_b_$u$25_$u$6266){
            var $phi$2004 = $inl$_10_b_$u$25_$u$6266;
            var $phi$2005 = undefined;
            var $inl$$inl$_18_e_$u$129_$u$5244_$u$6269 = $phi$2004.$1;
            var $inl$$inl$_19_f_$u$0_$u$5245_$u$6270 = $$compiler$ast_jg$$getAnnType;
            $phi$2005 = (((set($phi$2004.$0))((function($inl$$inl$_19_a_$u$1_$u$5246_$u$6271){
              return $$compiler$ast_jg$$getAnnType($inl$$inl$_19_a_$u$1_$u$5246_$u$6271)
            })($$compiler$ast_jg$$annOf($phi$2004.$1))))($inl$_10_env_$u$24_$u$6265));
            return $phi$2005
          }
        }))(((foldl(function($inl$$inl$$inl$_10_env_$u$306_$u$2656_$u$5272_$u$6273){
          return function($inl$$inl$$inl$_10_i_$u$307_$u$2657_$u$5273_$u$6274){
            var $inl$$inl$$inl$_10_i_$u$293_$u$2643_$u$5289_$u$6275 = $inl$$inl$$inl$_10_i_$u$307_$u$2657_$u$5273_$u$6274;
            var $phi$2008 = $inl$$inl$$inl$_10_i_$u$307_$u$2657_$u$5273_$u$6274;
            var $phi$2009 = undefined;
            if($phi$2008.$tag==$$compiler$ast_jg$$ImportAll.$tag){
              $phi$2009 = $phi$2008.$1
            } else if($phi$2008.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
              $phi$2009 = $phi$2008.$1
            } else if($phi$2008.$tag==$$compiler$ast_jg$$ImportClosed.$tag){
              $phi$2009 = $phi$2008.$1
            } else error("pattern match fail",$phi$2008);
            var $phi$2006 = (get($phi$2009))($inl$_10_ms_$u$0_$u$6165);
            var $phi$2007 = undefined;
            var $phi$2010 = $inl$$inl$$inl$_10_i_$u$307_$u$2657_$u$5273_$u$6274;
            var $phi$2011 = undefined;
            if($phi$2010.$tag==$$compiler$ast_jg$$ImportAll.$tag){
              $phi$2011 = ((merge($inl$$inl$$inl$_10_env_$u$306_$u$2656_$u$5272_$u$6273))($phi$2006.$0))
            } else if($phi$2010.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
              $phi$2011 = (((foldl(function($inl$$inl$$inl$_10_env_$u$318_$u$2668_$u$5284_$u$6294){
                return function($inl$$inl$$inl$_10_n_$u$319_$u$2669_$u$5285_$u$6295){
                  var $phi$2012 = $inl$$inl$$inl$_10_n_$u$319_$u$2669_$u$5285_$u$6295;
                  var $phi$2013 = undefined;
                  $phi$2013 = (((set($phi$2012.$1))((get($phi$2012.$0))($phi$2006.$0)))($inl$$inl$$inl$_10_env_$u$318_$u$2668_$u$5284_$u$6294));
                  return $phi$2013
                }
              }))($inl$$inl$$inl$_10_env_$u$306_$u$2656_$u$5272_$u$6273))($phi$2010.$2))
            } else $phi$2011 = (error("import type not supported in type inference"));
            var $inl$$inl$$inl$_10_env2_$u$311_$u$2661_$u$5277_$u$6287 = $phi$2011;
            var $inl$$inl$$inl$_10_env3_$u$312_$u$2662_$u$5278_$u$6288 = ((foldl(function($inl$$inl$$inl$_10_env_$u$302_$u$2652_$u$5298_$u$6299){
              return function($inl$$inl$$inl$_10_c_$u$303_$u$2653_$u$5299_$u$6300){
                return ((foldl(function($inl$$inl$$inl$_10_env_$u$304_$u$2654_$u$5300_$u$6301){
                  return function($inl$$inl$$inl$_10_b_$u$305_$u$2655_$u$5301_$u$6302){
                    var $inl$$inl$_19_p_$u$24_$u$5302_$u$6303 = $inl$$inl$$inl$_10_b_$u$305_$u$2655_$u$5301_$u$6302;
                    var $phi$2014 = $inl$$inl$$inl$_10_b_$u$305_$u$2655_$u$5301_$u$6302;
                    var $phi$2015 = undefined;
                    $phi$2015 = $phi$2014.$0;
                    var $inl$$inl$_19_p_$u$27_$u$5305_$u$6306 = $inl$$inl$$inl$_10_b_$u$305_$u$2655_$u$5301_$u$6302;
                    var $phi$2016 = $inl$$inl$$inl$_10_b_$u$305_$u$2655_$u$5301_$u$6302;
                    var $phi$2017 = undefined;
                    $phi$2017 = $phi$2016.$1;
                    return ((set($phi$2015))($phi$2017))($inl$$inl$$inl$_10_env_$u$304_$u$2654_$u$5300_$u$6301)
                  }
                }))($inl$$inl$$inl$_10_env_$u$302_$u$2652_$u$5298_$u$6299))($$compiler$typer_jg$$classToBindings($inl$$inl$$inl$_10_c_$u$303_$u$2653_$u$5299_$u$6300))
              }
            }))($inl$$inl$$inl$_10_env2_$u$311_$u$2661_$u$5277_$u$6287))($phi$2006.$1);
            $phi$2007 = $inl$$inl$$inl$_10_env3_$u$312_$u$2662_$u$5278_$u$6288;
            return $phi$2007
          }
        }))(empty))((enqueue(($$compiler$ast_jg$$ImportAll($$compiler$prelude_jg$$Empty))("./builtins.js")))($inl$$inl$_10_is_$u$289_$u$2639_$u$6272))))((concat($inl$_10_classFuns_$u$13_$u$6180))($phi$1966.$6));
        var $inl$_10_env2_$u$18_$u$6182 = (merge($inl$_10_env_$u$17_$u$6181))($$compiler$prelude_jg$$toRecord($inl$_10_dataFuns_$u$16_$u$6179));
        var $inl$_10_instancesAsDefs_$u$20_$u$6183 = (map(function($inl$_10_p_$u$29_$u$6309){
          var $phi$2018 = $inl$_10_p_$u$29_$u$6309;
          var $phi$2019 = undefined;
          var $inl$$inl$_10_env_$u$83_$u$2674_$u$6312 = $inl$_10_env2_$u$18_$u$6182;
          $phi$2019 = (((function($inl$$inl$_10_ix_$u$84_$u$2675_$u$6313){
            return function($inl$$inl$_10_i_$u$85_$u$2676_$u$6314){
              var $phi$2020 = $inl$$inl$_10_i_$u$85_$u$2676_$u$6314;
              var $phi$2021 = undefined;
              var $inl$$inl$_10_args_$u$91_$u$2681_$u$6319 = (map(($$compiler$declasser_jg$$rewriteExpr($inl$_10_availableInstances_$u$14_$u$6176))($inl$$inl$_10_env_$u$83_$u$2674_$u$6312)))((map(function($inl$$inl$_19_p_$u$27_$u$5308_$u$6321){
                var $phi$2022 = $inl$$inl$_19_p_$u$27_$u$5308_$u$6321;
                var $phi$2023 = undefined;
                $phi$2023 = $phi$2022.$1;
                return $phi$2023
              }))(sort($phi$2020.$3)));
              var $inl$$inl$_10_name_$u$90_$u$2682_$u$6320 = ($$compiler$declasser_jg$$instanceName($inl$$inl$_10_ix_$u$84_$u$2675_$u$6313))($inl$$inl$_10_i_$u$85_$u$2676_$u$6314);
              $phi$2021 = (($$compiler$prelude_jg$$Pair($inl$$inl$_10_name_$u$90_$u$2682_$u$6320))(((foldl($$compiler$ast_jg$$App($$compiler$prelude_jg$$Empty)))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))(($concat("$class$"))($phi$2020.$1))))($inl$$inl$_10_args_$u$91_$u$2681_$u$6319)));
              return $phi$2021
            }
          })($phi$2018.$0))($phi$2018.$1));
          return $phi$2019
        }))($$compiler$prelude_jg$$zipWithIndex($phi$1966.$5));
        var $inl$_10_ds2_$u$19_$u$6184 = (map(function($inl$_10_d_$u$28_$u$6324){
          var $inl$$inl$_19_p_$u$24_$u$5311_$u$6325 = $inl$_10_d_$u$28_$u$6324;
          var $phi$2024 = $inl$_10_d_$u$28_$u$6324;
          var $phi$2025 = undefined;
          $phi$2025 = $phi$2024.$0;
          var $inl$$inl$_19_p_$u$27_$u$5314_$u$6328 = $inl$_10_d_$u$28_$u$6324;
          var $phi$2026 = $inl$_10_d_$u$28_$u$6324;
          var $phi$2027 = undefined;
          $phi$2027 = $phi$2026.$1;
          return ($$compiler$prelude_jg$$Pair($phi$2025))((($$compiler$declasser_jg$$rewriteExpr($inl$_10_availableInstances_$u$14_$u$6176))($inl$_10_env2_$u$18_$u$6182))($phi$2027))
        }))($phi$1966.$6);
        var $inl$$inl$_19_p_$u$24_$u$5317_$u$6331 = $inl$_10_isi_$u$9_$u$6174;
        var $phi$2028 = $inl$_10_isi_$u$9_$u$6174;
        var $phi$2029 = undefined;
        $phi$2029 = $phi$2028.$0;
        var $inl$_10_is2_$u$10_$u$6185 = $phi$2029;
        $phi$1967 = ((((((($$compiler$ast_jg$$Module($phi$1966.$0))($phi$1966.$1))($inl$_10_is2_$u$10_$u$6185))($inl$_10_dt2_$u$15_$u$6178))($phi$1966.$4))($phi$1966.$5))((concat($inl$_10_classFuns_$u$13_$u$6180))((concat($inl$_10_instancesAsDefs_$u$20_$u$6183))($inl$_10_ds2_$u$19_$u$6184))));
        return $phi$1967
      })($inl$_0_typed_$u$92_$u$4471);
      var $inl$_12_m_$u$640_$u$6334 = $inl$_0_typed_$u$92_$u$4471;
      var $phi$2030 = $inl$_12_m_$u$640_$u$6334;
      var $phi$2031 = undefined;
      var $inl$_12_et_$u$648_$u$6342 = ($$compiler$prelude_jg$$concatMap($$compiler$typer_jg$$conTypes))($phi$2030.$3);
      var $inl$_12_ed_$u$649_$u$6343 = (map(function($inl$_12_d_$u$651_$u$6345){
        var $inl$$inl$_19_p_$u$24_$u$4800_$u$6346 = $inl$_12_d_$u$651_$u$6345;
        var $phi$2032 = $inl$_12_d_$u$651_$u$6345;
        var $phi$2033 = undefined;
        $phi$2033 = $phi$2032.$0;
        var $inl$$inl$_19_p_$u$27_$u$4806_$u$6350 = $inl$_12_d_$u$651_$u$6345;
        var $phi$2034 = $inl$_12_d_$u$651_$u$6345;
        var $phi$2035 = undefined;
        $phi$2035 = $phi$2034.$1;
        var $inl$$inl$_18_e_$u$129_$u$4803_$u$6349 = $phi$2035;
        var $inl$$inl$_19_f_$u$0_$u$4804_$u$6353 = $$compiler$ast_jg$$getAnnType;
        return ($$compiler$prelude_jg$$Pair($phi$2033))((function($inl$$inl$_19_a_$u$1_$u$4805_$u$6354){
          return $$compiler$ast_jg$$getAnnType($inl$$inl$_19_a_$u$1_$u$4805_$u$6354)
        })($$compiler$ast_jg$$annOf($inl$$inl$_18_e_$u$129_$u$4803_$u$6349)))
      }))($phi$2030.$6);
      var $inl$_12_bs_$u$650_$u$6344 = ((foldl(function($inl$_12_es_$u$652_$u$6355){
        return function($inl$_12_e_$u$653_$u$6356){
          var $inl$$inl$_19_p_$u$24_$u$4809_$u$6357 = $inl$_12_e_$u$653_$u$6356;
          var $phi$2036 = $inl$_12_e_$u$653_$u$6356;
          var $phi$2037 = undefined;
          $phi$2037 = $phi$2036.$0;
          var $inl$$inl$_19_p_$u$27_$u$4812_$u$6360 = $inl$_12_e_$u$653_$u$6356;
          var $phi$2038 = $inl$_12_e_$u$653_$u$6356;
          var $phi$2039 = undefined;
          $phi$2039 = $phi$2038.$1;
          return ((set($phi$2037))($phi$2039))($inl$_12_es_$u$652_$u$6355)
        }
      }))(empty))((concat($inl$_12_et_$u$648_$u$6342))($inl$_12_ed_$u$649_$u$6343));
      $phi$2031 = ((($$compiler$ast_jg$$ModuleInterface($inl$_12_bs_$u$650_$u$6344))($phi$2030.$4))((map($$compiler$typer_jg$$instanceToTypeBound))($phi$2030.$5)));
      var $inl$_0_e_$u$93_$u$4473 = $phi$2031;
      $phi$1839 = (($$compiler$prelude_jg$$Pair(((set($phi$1838.$1))($inl$_0_e_$u$93_$u$4473))($phi$1836.$0)))((push($inl$_0_declassed_$u$94_$u$4472))($phi$1836.$1)));
      $phi$1837 = $phi$1839;
      return $phi$1837
    }
  }))(($$compiler$prelude_jg$$Pair(_0_exports_$u$73))(emptyArray)))($$compiler$prelude_jg$$zipWithIndex(_0_ordered_$u$72));
  var $phi$2040 = $inl$_19_p_$u$27_$u$5548;
  var $phi$2041 = undefined;
  $phi$2041 = $phi$2040.$1;
  var _0_modules_$u$75 = $phi$2041;
  var $inl$_19_l_$u$101_$u$6363 = _0_modules_$u$75;
  var $phi$2042 = (getIx((length($inl$_19_l_$u$101_$u$6363))-1))($inl$_19_l_$u$101_$u$6363);
  var $phi$2043 = undefined;
  $phi$2043 = ((concat((map(function($inl$_19_p_$u$24_$u$5551){
    var $phi$2044 = $inl$_19_p_$u$24_$u$5551;
    var $phi$2045 = undefined;
    $phi$2045 = $phi$2044.$0;
    return $phi$2045
  }))($phi$2042.$6)))(($$compiler$prelude_jg$$concatMap($$compiler$ast_jg$$dataConNames))($phi$2042.$3)));
  var _0_external_$u$76 = $phi$2043;
  var $inl$_14_ms_$u$0_$u$5554 = _0_modules_$u$75;
  var _0_merged_$u$77 = (foldl1(function($inl$$inl$_14_a_$u$1_$u$1113_$u$5555){
    return function($inl$$inl$_14_b_$u$2_$u$1114_$u$5556){
      var $phi$2046 = $inl$$inl$_14_a_$u$1_$u$1113_$u$5555;
      var $phi$2047 = undefined;
      var $phi$2048 = $inl$$inl$_14_b_$u$2_$u$1114_$u$5556;
      var $phi$2049 = undefined;
      $phi$2049 = ((((((($$compiler$ast_jg$$Module($phi$2046.$0))($phi$2048.$1))($phi$2046.$2))((concat($phi$2046.$3))($phi$2048.$3)))(emptyArray))(emptyArray))((concat($phi$2046.$6))((concat(($$compiler$prelude_jg$$concatMap(function($inl$$inl$_14_i_$u$17_$u$1129_$u$5571){
        var $phi$2050 = $inl$$inl$_14_i_$u$17_$u$1129_$u$5571;
        var $phi$2051 = undefined;
        if(($phi$2050.$tag==$$compiler$ast_jg$$ImportOpen.$tag)&&("./builtins.js"==$phi$2050.$1)){
          $phi$2051 = emptyArray
        } else if($phi$2050.$tag==$$compiler$ast_jg$$ImportOpen.$tag){
          $phi$2051 = ((map(function($inl$$inl$_14_p_$u$23_$u$1135_$u$5577){
            var $phi$2052 = $inl$$inl$_14_p_$u$23_$u$1135_$u$5577;
            var $phi$2053 = undefined;
            $phi$2053 = (($$compiler$prelude_jg$$Pair($phi$2052.$1))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))($phi$2052.$0)));
            return $phi$2053
          }))((filter(function($inl$$inl$_14_p_$u$26_$u$1138_$u$5580){
            var $inl$_19_p_$u$24_$u$5581 = $inl$$inl$_14_p_$u$26_$u$1138_$u$5580;
            var $phi$2054 = $inl$$inl$_14_p_$u$26_$u$1138_$u$5580;
            var $phi$2055 = undefined;
            $phi$2055 = $phi$2054.$0;
            var $inl$_19_p_$u$27_$u$5584 = $inl$$inl$_14_p_$u$26_$u$1138_$u$5580;
            var $phi$2056 = $inl$$inl$_14_p_$u$26_$u$1138_$u$5580;
            var $phi$2057 = undefined;
            $phi$2057 = $phi$2056.$1;
            return (($$compiler$prelude_jg$$$div$eq($instance$Eq$1))($phi$2055))($phi$2057)
          }))($phi$2050.$2)))
        } else error("pattern match fail",$phi$2050);
        return $phi$2051
      }))($phi$2048.$2)))($phi$2048.$6))));
      $phi$2047 = $phi$2049;
      return $phi$2047
    }
  }))(_0_modules_$u$75);
  var $inl$_15_preserve_$u$48_$u$5587 = _0_external_$u$76;
  var _0_optimized_$u$78 = (function($inl$_15_m_$u$49_$u$5588){
    var $phi$2058 = $inl$_15_m_$u$49_$u$5588;
    var $phi$2059 = undefined;
    var $inl$_15_bs2_$u$57_$u$5596 = ($$compiler$prelude_jg$$evalState(0))(((($$compiler$inliner_jg$$loopPasses($instance$Monad$11))(3))(function($inl$$inl$_15_bs_$u$78_$u$1003_$u$5601){
      var $inl$$inl$_15_bs2_$u$79_$u$1004_$u$5602 = ($$compiler$inliner_jg$$mapBindings(function($inl$$inl$_15_e_$u$83_$u$1008_$u$5606){
        var $inl$_19_f_$u$0_$u$5694 = function($inl$_19_p_$u$27_$u$5696){
          var $phi$2060 = $inl$_19_p_$u$27_$u$5696;
          var $phi$2061 = undefined;
          $phi$2061 = $phi$2060.$1;
          return $phi$2061
        };
        var $inl$$inl$_15_dropCount_$u$8_$u$1014_$u$5608 = function($inl$$inl$local$instance$Hashable$1_$u$1018_$u$5612){
          return function($inl$$inl$local$instance$Eq$0_$u$1019_$u$5613){
            return function($inl$$inl$_15_n_$u$12_$u$1020_$u$5614){
              return function($inl$$inl$_15_c_$u$13_$u$1021_$u$5615){
                return ((($$compiler$prelude_jg$$remove($inl$$inl$local$instance$Hashable$1_$u$1018_$u$5612))($inl$$inl$local$instance$Eq$0_$u$1019_$u$5613))($inl$$inl$_15_n_$u$12_$u$1020_$u$5614))($inl$$inl$_15_c_$u$13_$u$1021_$u$5615)
              }
            }
          }
        };
        var $inl$$inl$_15_countPat_$u$10_$u$1015_$u$5609 = function($inl$$inl$_15_c_$u$17_$u$1022_$u$5616){
          return function($inl$$inl$_15_p_$u$18_$u$1023_$u$5617){
            var $phi$2064 = $inl$$inl$_15_p_$u$18_$u$1023_$u$5617;
            var $phi$2065 = undefined;
            if($phi$2064.$tag==$$compiler$ast_jg$$PVar.$tag){
              $phi$2065 = (((($inl$$inl$_15_dropCount_$u$8_$u$1014_$u$5608($instance$Hashable$13))($instance$Eq$1))($phi$2064.$1))($inl$$inl$_15_c_$u$17_$u$1022_$u$5616))
            } else if($phi$2064.$tag==$$compiler$ast_jg$$PData.$tag){
              var $inl$_19_d_$u$17_$u$5699 = 0;
              $phi$2065 = (((foldl($inl$$inl$_15_countPat_$u$10_$u$1015_$u$5609))((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))($phi$2064.$1))(1+((function($inl$_19_m_$u$18_$u$5700){
                var $phi$2066 = $inl$_19_m_$u$18_$u$5700;
                var $phi$2067 = undefined;
                if($phi$2066.$tag==$$compiler$prelude_jg$$Just.$tag){
                  $phi$2067 = $phi$2066.$0
                } else if($phi$2066.$tag==$$compiler$prelude_jg$$Nothing.$tag){
                  $phi$2067 = 0
                } else error("pattern match fail",$phi$2066);
                return $phi$2067
              })(((($$compiler$prelude_jg$$lookup($instance$Hashable$13))($instance$Eq$1))($phi$2064.$1))($inl$$inl$_15_c_$u$17_$u$1022_$u$5616)))))($inl$$inl$_15_c_$u$17_$u$1022_$u$5616)))($phi$2064.$2))
            } else $phi$2065 = $inl$$inl$_15_c_$u$17_$u$1022_$u$5616;
            return $phi$2065
          }
        };
        var $inl$$inl$_15_countCase_$u$9_$u$1016_$u$5610 = function($inl$$inl$_15_pe_$u$14_$u$1030_$u$5624){
          var $phi$2068 = $inl$$inl$_15_pe_$u$14_$u$1030_$u$5624;
          var $phi$2069 = undefined;
          $phi$2069 = (($inl$$inl$_15_countPat_$u$10_$u$1015_$u$5609($$compiler$inliner_jg$$getCount($phi$2068.$1)))($phi$2068.$0));
          return $phi$2069
        };
        var $inl$$inl$_15_countExpr_$u$11_$u$1017_$u$5611 = function($inl$$inl$_15_e_$u$25_$u$1033_$u$5627){
          var $phi$2070 = $inl$$inl$_15_e_$u$25_$u$1033_$u$5627;
          var $phi$2071 = undefined;
          if($phi$2070.$tag==$$compiler$ast_jg$$Var.$tag){
            $phi$2071 = ((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))($phi$2070.$1))(1))($$compiler$prelude_jg$$Empty))
          } else if($phi$2070.$tag==$$compiler$ast_jg$$App.$tag){
            $phi$2071 = (((($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1))($$compiler$inliner_jg$$getCount($phi$2070.$1)))($$compiler$inliner_jg$$getCount($phi$2070.$2)))
          } else if($phi$2070.$tag==$$compiler$ast_jg$$Lam.$tag){
            $phi$2071 = (((($inl$$inl$_15_dropCount_$u$8_$u$1014_$u$5608($instance$Hashable$13))($instance$Eq$1))($phi$2070.$1))($$compiler$inliner_jg$$getCount($phi$2070.$2)))
          } else if($phi$2070.$tag==$$compiler$ast_jg$$Let.$tag){
            $phi$2071 = (((foldl(function($inl$$inl$_15_c_$u$37_$u$1045_$u$5639){
              return function($inl$$inl$_15_n_$u$38_$u$1046_$u$5640){
                return ((($inl$$inl$_15_dropCount_$u$8_$u$1014_$u$5608($instance$Hashable$13))($instance$Eq$1))($inl$$inl$_15_n_$u$38_$u$1046_$u$5640))($inl$$inl$_15_c_$u$37_$u$1045_$u$5639)
              }
            }))(((foldl(function($inl$$inl$_15_c_$u$39_$u$1047_$u$5641){
              return function($inl$$inl$_15_e_$u$40_$u$1048_$u$5642){
                return ((($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1))($inl$$inl$_15_c_$u$39_$u$1047_$u$5641))($$compiler$inliner_jg$$getCount($inl$$inl$_15_e_$u$40_$u$1048_$u$5642))
              }
            }))($$compiler$inliner_jg$$getCount($phi$2070.$2)))((map(function($inl$_19_p_$u$27_$u$5702){
              var $phi$2074 = $inl$_19_p_$u$27_$u$5702;
              var $phi$2075 = undefined;
              $phi$2075 = $phi$2074.$1;
              return $phi$2075
            }))($phi$2070.$1))))((map(function($inl$_19_p_$u$24_$u$5705){
              var $phi$2076 = $inl$_19_p_$u$24_$u$5705;
              var $phi$2077 = undefined;
              $phi$2077 = $phi$2076.$0;
              return $phi$2077
            }))($phi$2070.$1)))
          } else if($phi$2070.$tag==$$compiler$ast_jg$$Case.$tag){
            $phi$2071 = (((foldl(($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1)))($$compiler$inliner_jg$$getCount($phi$2070.$1)))((map(function($inl$$inl$$inl$_15_pe_$u$14_$u$1030_$u$5624_$u$6367){
              var $phi$2072 = $inl$$inl$$inl$_15_pe_$u$14_$u$1030_$u$5624_$u$6367;
              var $phi$2073 = undefined;
              $phi$2073 = (($inl$$inl$_15_countPat_$u$10_$u$1015_$u$5609($$compiler$inliner_jg$$getCount($phi$2072.$1)))($phi$2072.$0));
              return $phi$2073
            }))($phi$2070.$2)))
          } else if($phi$2070.$tag==$$compiler$ast_jg$$Const.$tag){
            $phi$2071 = $$compiler$prelude_jg$$Empty
          } else error("pattern match fail",$phi$2070);
          return $phi$2071
        };
        return (function($inl$_19_a_$u$1_$u$5695){
          var $inl$$inl$_19_p_$u$27_$u$5696_$u$6364 = $inl$_19_a_$u$1_$u$5695;
          var $phi$2062 = $inl$$inl$_19_p_$u$27_$u$5696_$u$6364;
          var $phi$2063 = undefined;
          $phi$2063 = $phi$2062.$1;
          return $phi$2063
        })((($$compiler$ast_jg$$up(function($inl$$inl$_15_a_$u$46_$u$1054_$u$5648){
          return function($inl$$inl$_15_e_$u$47_$u$1055_$u$5649){
            var $inl$_19_f_$u$0_$u$5708 = $$compiler$prelude_jg$$Pair($inl$$inl$_15_a_$u$46_$u$1054_$u$5648);
            var $inl$_19_f_$u$0_$u$5728 = $$compiler$ast_jg$$AnnUseCount;
            var $inl$$inl$$inl$_15_e_$u$25_$u$1033_$u$5627_$u$6370 = $inl$$inl$_15_e_$u$47_$u$1055_$u$5649;
            var $phi$2078 = $inl$$inl$$inl$_15_e_$u$25_$u$1033_$u$5627_$u$6370;
            var $phi$2079 = undefined;
            if($phi$2078.$tag==$$compiler$ast_jg$$Var.$tag){
              $phi$2079 = ((((($$compiler$prelude_jg$$insert($instance$Hashable$13))($instance$Eq$1))($phi$2078.$1))(1))($$compiler$prelude_jg$$Empty))
            } else if($phi$2078.$tag==$$compiler$ast_jg$$App.$tag){
              $phi$2079 = (((($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1))($$compiler$inliner_jg$$getCount($phi$2078.$1)))($$compiler$inliner_jg$$getCount($phi$2078.$2)))
            } else if($phi$2078.$tag==$$compiler$ast_jg$$Lam.$tag){
              $phi$2079 = (((($inl$$inl$_15_dropCount_$u$8_$u$1014_$u$5608($instance$Hashable$13))($instance$Eq$1))($phi$2078.$1))($$compiler$inliner_jg$$getCount($phi$2078.$2)))
            } else if($phi$2078.$tag==$$compiler$ast_jg$$Let.$tag){
              $phi$2079 = (((foldl(function($inl$$inl$$inl$_15_c_$u$37_$u$1045_$u$5639_$u$6382){
                return function($inl$$inl$$inl$_15_n_$u$38_$u$1046_$u$5640_$u$6383){
                  return ((($inl$$inl$_15_dropCount_$u$8_$u$1014_$u$5608($instance$Hashable$13))($instance$Eq$1))($inl$$inl$$inl$_15_n_$u$38_$u$1046_$u$5640_$u$6383))($inl$$inl$$inl$_15_c_$u$37_$u$1045_$u$5639_$u$6382)
                }
              }))(((foldl(function($inl$$inl$$inl$_15_c_$u$39_$u$1047_$u$5641_$u$6384){
                return function($inl$$inl$$inl$_15_e_$u$40_$u$1048_$u$5642_$u$6385){
                  return ((($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1))($inl$$inl$$inl$_15_c_$u$39_$u$1047_$u$5641_$u$6384))($$compiler$inliner_jg$$getCount($inl$$inl$$inl$_15_e_$u$40_$u$1048_$u$5642_$u$6385))
                }
              }))($$compiler$inliner_jg$$getCount($phi$2078.$2)))((map(function($inl$$inl$_19_p_$u$27_$u$5702_$u$6386){
                var $phi$2082 = $inl$$inl$_19_p_$u$27_$u$5702_$u$6386;
                var $phi$2083 = undefined;
                $phi$2083 = $phi$2082.$1;
                return $phi$2083
              }))($phi$2078.$1))))((map(function($inl$$inl$_19_p_$u$24_$u$5705_$u$6389){
                var $phi$2084 = $inl$$inl$_19_p_$u$24_$u$5705_$u$6389;
                var $phi$2085 = undefined;
                $phi$2085 = $phi$2084.$0;
                return $phi$2085
              }))($phi$2078.$1)))
            } else if($phi$2078.$tag==$$compiler$ast_jg$$Case.$tag){
              $phi$2079 = (((foldl(($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1)))($$compiler$inliner_jg$$getCount($phi$2078.$1)))((map(function($inl$$inl$$inl$_15_pe_$u$14_$u$1030_$u$5624_$u$6397){
                var $phi$2080 = $inl$$inl$$inl$_15_pe_$u$14_$u$1030_$u$5624_$u$6397;
                var $phi$2081 = undefined;
                $phi$2081 = (($inl$$inl$_15_countPat_$u$10_$u$1015_$u$5609($$compiler$inliner_jg$$getCount($phi$2080.$1)))($phi$2080.$0));
                return $phi$2081
              }))($phi$2078.$2)))
            } else if($phi$2078.$tag==$$compiler$ast_jg$$Const.$tag){
              $phi$2079 = $$compiler$prelude_jg$$Empty
            } else error("pattern match fail",$phi$2078);
            var $inl$_18_ann_$u$111_$u$5710 = (((($$compiler$ast_jg$$setAnn($instance$Hashable$13))($instance$Eq$1))("useCount"))((function($inl$_19_a_$u$1_$u$5729){
              return $$compiler$ast_jg$$AnnUseCount($inl$_19_a_$u$1_$u$5729)
            })($phi$2079)))($$compiler$ast_jg$$annOf($inl$$inl$_15_e_$u$47_$u$1055_$u$5649));
            return (function($inl$_19_a_$u$1_$u$5709){
              return $inl$_19_f_$u$0_$u$5708($inl$_19_a_$u$1_$u$5709)
            })((function($inl$_18_e_$u$112_$u$5711){
              var $phi$2086 = $inl$_18_e_$u$112_$u$5711;
              var $phi$2087 = undefined;
              if($phi$2086.$tag==$$compiler$ast_jg$$Var.$tag){
                $phi$2087 = (($$compiler$ast_jg$$Var($inl$_18_ann_$u$111_$u$5710))($phi$2086.$1))
              } else if($phi$2086.$tag==$$compiler$ast_jg$$Const.$tag){
                $phi$2087 = (($$compiler$ast_jg$$Const($inl$_18_ann_$u$111_$u$5710))($phi$2086.$1))
              } else if($phi$2086.$tag==$$compiler$ast_jg$$App.$tag){
                $phi$2087 = ((($$compiler$ast_jg$$App($inl$_18_ann_$u$111_$u$5710))($phi$2086.$1))($phi$2086.$2))
              } else if($phi$2086.$tag==$$compiler$ast_jg$$Lam.$tag){
                $phi$2087 = ((($$compiler$ast_jg$$Lam($inl$_18_ann_$u$111_$u$5710))($phi$2086.$1))($phi$2086.$2))
              } else if($phi$2086.$tag==$$compiler$ast_jg$$Case.$tag){
                $phi$2087 = ((($$compiler$ast_jg$$Case($inl$_18_ann_$u$111_$u$5710))($phi$2086.$1))($phi$2086.$2))
              } else if($phi$2086.$tag==$$compiler$ast_jg$$Let.$tag){
                $phi$2087 = ((($$compiler$ast_jg$$Let($inl$_18_ann_$u$111_$u$5710))($phi$2086.$1))($phi$2086.$2))
              } else error("pattern match fail",$phi$2086);
              return $phi$2087
            })($inl$$inl$_15_e_$u$47_$u$1055_$u$5649))
          }
        }))($$compiler$prelude_jg$$Unit))($inl$$inl$_15_e_$u$83_$u$1008_$u$5606))
      }))($inl$$inl$_15_bs_$u$78_$u$1003_$u$5601);
      var $inl$$inl$_15_useCount_$u$80_$u$1005_$u$5603 = ((foldl(($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1)))($$compiler$prelude_jg$$Empty))((map(function($inl$$inl$_15_b_$u$84_$u$1009_$u$5650){
        var $inl$_19_p_$u$27_$u$5730 = $inl$$inl$_15_b_$u$84_$u$1009_$u$5650;
        var $phi$2088 = $inl$$inl$_15_b_$u$84_$u$1009_$u$5650;
        var $phi$2089 = undefined;
        $phi$2089 = $phi$2088.$1;
        return $$compiler$inliner_jg$$getCount($phi$2089)
      }))($inl$$inl$_15_bs2_$u$79_$u$1004_$u$5602));
      var $inl$$inl$_15_bs3_$u$81_$u$1006_$u$5604 = ($$compiler$inliner_jg$$mapBindings(function($inl$$inl$_15_e_$u$92_$u$1056_$u$5651){
        var $inl$$inl$_15_f_$u$93_$u$1057_$u$5652 = function($inl$$inl$_15_e_$u$94_$u$1058_$u$5653){
          var $phi$2090 = $inl$$inl$_15_e_$u$94_$u$1058_$u$5653;
          var $phi$2091 = undefined;
          if($phi$2090.$tag==$$compiler$ast_jg$$Let.$tag){
            var $inl$$inl$_15_useCount_$u$98_$u$1062_$u$5657 = ((foldl(($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1)))($$compiler$inliner_jg$$getCount($phi$2090.$2)))((map(function($inl$$inl$_15_b_$u$100_$u$1064_$u$5659){
              var $inl$_19_p_$u$27_$u$5733 = $inl$$inl$_15_b_$u$100_$u$1064_$u$5659;
              var $phi$2092 = $inl$$inl$_15_b_$u$100_$u$1064_$u$5659;
              var $phi$2093 = undefined;
              $phi$2093 = $phi$2092.$1;
              return $$compiler$inliner_jg$$getCount($phi$2093)
            }))($phi$2090.$1));
            var $inl$$inl$_15_bs2_$u$99_$u$1063_$u$5658 = (($$compiler$inliner_jg$$dropDeadBindings(emptyArray))($inl$$inl$_15_useCount_$u$98_$u$1062_$u$5657))($phi$2090.$1);
            $phi$2091 = ((($$compiler$ast_jg$$Let($phi$2090.$0))($inl$$inl$_15_bs2_$u$99_$u$1063_$u$5658))($phi$2090.$2))
          } else $phi$2091 = $inl$$inl$_15_e_$u$94_$u$1058_$u$5653;
          return $phi$2091
        };
        var $inl$_18_f_$u$178_$u$5739 = function($inl$$inl$_15_a_$u$102_$u$1066_$u$5661){
          return function($inl$$inl$_15_e_$u$103_$u$1067_$u$5662){
            var $inl$$inl$$inl$_15_e_$u$94_$u$1058_$u$5653_$u$6400 = $inl$$inl$_15_e_$u$103_$u$1067_$u$5662;
            var $phi$2094 = $inl$$inl$$inl$_15_e_$u$94_$u$1058_$u$5653_$u$6400;
            var $phi$2095 = undefined;
            if($phi$2094.$tag==$$compiler$ast_jg$$Let.$tag){
              var $inl$$inl$$inl$_15_useCount_$u$98_$u$1062_$u$5657_$u$6404 = ((foldl(($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1)))($$compiler$inliner_jg$$getCount($phi$2094.$2)))((map(function($inl$$inl$$inl$_15_b_$u$100_$u$1064_$u$5659_$u$6406){
                var $inl$$inl$_19_p_$u$27_$u$5733_$u$6407 = $inl$$inl$$inl$_15_b_$u$100_$u$1064_$u$5659_$u$6406;
                var $phi$2096 = $inl$$inl$$inl$_15_b_$u$100_$u$1064_$u$5659_$u$6406;
                var $phi$2097 = undefined;
                $phi$2097 = $phi$2096.$1;
                return $$compiler$inliner_jg$$getCount($phi$2097)
              }))($phi$2094.$1));
              var $inl$$inl$$inl$_15_bs2_$u$99_$u$1063_$u$5658_$u$6405 = (($$compiler$inliner_jg$$dropDeadBindings(emptyArray))($inl$$inl$$inl$_15_useCount_$u$98_$u$1062_$u$5657_$u$6404))($phi$2094.$1);
              $phi$2095 = ((($$compiler$ast_jg$$Let($phi$2094.$0))($inl$$inl$$inl$_15_bs2_$u$99_$u$1063_$u$5658_$u$6405))($phi$2094.$2))
            } else $phi$2095 = $inl$$inl$$inl$_15_e_$u$94_$u$1058_$u$5653_$u$6400;
            return ($$compiler$prelude_jg$$Pair($inl$$inl$_15_a_$u$102_$u$1066_$u$5661))($phi$2095)
          }
        };
        var $inl$_19_p_$u$27_$u$5736 = ((($$compiler$ast_jg$$downAndUp(function($inl$$inl$$inl$_15_a_$u$102_$u$1066_$u$5661_$u$6411){
          return function($inl$$inl$$inl$_15_e_$u$103_$u$1067_$u$5662_$u$6412){
            var $inl$$inl$$inl$_15_e_$u$94_$u$1058_$u$5653_$u$6413 = $inl$$inl$$inl$_15_e_$u$103_$u$1067_$u$5662_$u$6412;
            var $phi$2098 = $inl$$inl$$inl$_15_e_$u$94_$u$1058_$u$5653_$u$6413;
            var $phi$2099 = undefined;
            if($phi$2098.$tag==$$compiler$ast_jg$$Let.$tag){
              var $inl$$inl$$inl$_15_useCount_$u$98_$u$1062_$u$5657_$u$6417 = ((foldl(($$compiler$inliner_jg$$mergeCount($instance$Hashable$13))($instance$Eq$1)))($$compiler$inliner_jg$$getCount($phi$2098.$2)))((map(function($inl$$inl$$inl$_15_b_$u$100_$u$1064_$u$5659_$u$6419){
                var $inl$$inl$_19_p_$u$27_$u$5733_$u$6420 = $inl$$inl$$inl$_15_b_$u$100_$u$1064_$u$5659_$u$6419;
                var $phi$2100 = $inl$$inl$$inl$_15_b_$u$100_$u$1064_$u$5659_$u$6419;
                var $phi$2101 = undefined;
                $phi$2101 = $phi$2100.$1;
                return $$compiler$inliner_jg$$getCount($phi$2101)
              }))($phi$2098.$1));
              var $inl$$inl$$inl$_15_bs2_$u$99_$u$1063_$u$5658_$u$6418 = (($$compiler$inliner_jg$$dropDeadBindings(emptyArray))($inl$$inl$$inl$_15_useCount_$u$98_$u$1062_$u$5657_$u$6417))($phi$2098.$1);
              $phi$2099 = ((($$compiler$ast_jg$$Let($phi$2098.$0))($inl$$inl$$inl$_15_bs2_$u$99_$u$1063_$u$5658_$u$6418))($phi$2098.$2))
            } else $phi$2099 = $inl$$inl$$inl$_15_e_$u$94_$u$1058_$u$5653_$u$6413;
            return ($$compiler$prelude_jg$$Pair($inl$$inl$$inl$_15_a_$u$102_$u$1066_$u$5661_$u$6411))($phi$2099)
          }
        }))($$compiler$prelude_jg$$Pair))($$compiler$prelude_jg$$Unit))($inl$$inl$_15_e_$u$92_$u$1056_$u$5651);
        var $phi$2102 = $inl$_19_p_$u$27_$u$5736;
        var $phi$2103 = undefined;
        $phi$2103 = $phi$2102.$1;
        return $phi$2103
      }))((($$compiler$inliner_jg$$dropDeadBindings(_0_external_$u$76))($inl$$inl$_15_useCount_$u$80_$u$1005_$u$5603))($inl$$inl$_15_bs2_$u$79_$u$1004_$u$5602));
      var $inl$$inl$_15_always_$u$82_$u$1007_$u$5605 = ($$compiler$inliner_jg$$chooseForInlining($$compiler$prelude_jg$$Empty))($inl$$inl$_15_bs3_$u$81_$u$1006_$u$5604);
      var $phi$2104 = $instance$Monad$11;
      var $phi$2105 = undefined;
      $phi$2105 = $phi$2104.$1;
      return ($phi$2105((($$compiler$inliner_jg$$mapBindingsM($instance$Monad$11))(function($inl$$inl$_15_n_$u$85_$u$1010_$u$5666){
        return function($inl$$inl$_15_e_$u$86_$u$1011_$u$5667){
          return ($$compiler$inliner_jg$$inlineCode(((($$compiler$prelude_jg$$remove($instance$Hashable$13))($instance$Eq$1))($inl$$inl$_15_n_$u$85_$u$1010_$u$5666))($inl$$inl$_15_always_$u$82_$u$1007_$u$5605)))($inl$$inl$_15_e_$u$86_$u$1011_$u$5667)
        }
      }))($inl$$inl$_15_bs3_$u$81_$u$1006_$u$5604)))(function($inl$$inl$_15_bs_$u$87_$u$1012_$u$5668){
        var $phi$2106 = $instance$Monad$11;
        var $phi$2107 = undefined;
        $phi$2107 = $phi$2106.$0;
        return $phi$2107(($$compiler$inliner_jg$$mapBindings(function($inl$$inl$_15_e_$u$154_$u$1074_$u$5672){
          var $inl$$inl$_15_f_$u$155_$u$1075_$u$5673 = function($inl$$inl$_15_e_$u$156_$u$1076_$u$5674){
            var $phi$2108 = $inl$$inl$_15_e_$u$156_$u$1076_$u$5674;
            var $phi$2109 = undefined;
            if((($phi$2108.$tag==$$compiler$ast_jg$$App.$tag)&&($phi$2108.$1.$tag==$$compiler$ast_jg$$Lam.$tag))&&($phi$2108.$2.$tag==$$compiler$ast_jg$$Var.$tag)){
              var $phi$2112 = $instance$Eq$1;
              var $phi$2113 = undefined;
              $phi$2113 = $phi$2112.$0;
              var $phi$2110 = ($phi$2113($phi$2108.$1.$1))($phi$2108.$2.$1);
              var $phi$2111 = undefined;
              if($phi$2110){
                $phi$2111 = $phi$2108.$1.$2
              } else if(!$phi$2110){
                var $inl$_19_x_$u$103_$u$5740 = ($$compiler$prelude_jg$$Pair($phi$2108.$1.$1))(($$compiler$ast_jg$$Var($phi$2108.$2.$0))($phi$2108.$2.$1));
                $phi$2111 = ((($$compiler$ast_jg$$Let($phi$2108.$0))((push($inl$_19_x_$u$103_$u$5740))(emptyArray)))($phi$2108.$1.$2))
              } else error("pattern match fail",$phi$2110);
              $phi$2109 = $phi$2111
            } else if(($phi$2108.$tag==$$compiler$ast_jg$$App.$tag)&&($phi$2108.$1.$tag==$$compiler$ast_jg$$Lam.$tag)){
              var $inl$_19_x_$u$103_$u$5741 = ($$compiler$prelude_jg$$Pair($phi$2108.$1.$1))($phi$2108.$2);
              $phi$2109 = ((($$compiler$ast_jg$$Let($phi$2108.$0))((push($inl$_19_x_$u$103_$u$5741))(emptyArray)))($phi$2108.$1.$2))
            } else $phi$2109 = $inl$$inl$_15_e_$u$156_$u$1076_$u$5674;
            return $phi$2109
          };
          var $inl$_18_f_$u$178_$u$5745 = function($inl$$inl$_15_a_$u$169_$u$1089_$u$5689){
            return function($inl$$inl$_15_e_$u$170_$u$1090_$u$5690){
              var $inl$$inl$$inl$_15_e_$u$156_$u$1076_$u$5674_$u$6424 = $inl$$inl$_15_e_$u$170_$u$1090_$u$5690;
              var $phi$2114 = $inl$$inl$$inl$_15_e_$u$156_$u$1076_$u$5674_$u$6424;
              var $phi$2115 = undefined;
              if((($phi$2114.$tag==$$compiler$ast_jg$$App.$tag)&&($phi$2114.$1.$tag==$$compiler$ast_jg$$Lam.$tag))&&($phi$2114.$2.$tag==$$compiler$ast_jg$$Var.$tag)){
                var $phi$2118 = $instance$Eq$1;
                var $phi$2119 = undefined;
                $phi$2119 = $phi$2118.$0;
                var $phi$2116 = ($phi$2119($phi$2114.$1.$1))($phi$2114.$2.$1);
                var $phi$2117 = undefined;
                if($phi$2116){
                  $phi$2117 = $phi$2114.$1.$2
                } else if(!$phi$2116){
                  var $inl$$inl$_19_x_$u$103_$u$5740_$u$6432 = ($$compiler$prelude_jg$$Pair($phi$2114.$1.$1))(($$compiler$ast_jg$$Var($phi$2114.$2.$0))($phi$2114.$2.$1));
                  $phi$2117 = ((($$compiler$ast_jg$$Let($phi$2114.$0))((push($inl$$inl$_19_x_$u$103_$u$5740_$u$6432))(emptyArray)))($phi$2114.$1.$2))
                } else error("pattern match fail",$phi$2116);
                $phi$2115 = $phi$2117
              } else if(($phi$2114.$tag==$$compiler$ast_jg$$App.$tag)&&($phi$2114.$1.$tag==$$compiler$ast_jg$$Lam.$tag)){
                var $inl$$inl$_19_x_$u$103_$u$5741_$u$6438 = ($$compiler$prelude_jg$$Pair($phi$2114.$1.$1))($phi$2114.$2);
                $phi$2115 = ((($$compiler$ast_jg$$Let($phi$2114.$0))((push($inl$$inl$_19_x_$u$103_$u$5741_$u$6438))(emptyArray)))($phi$2114.$1.$2))
              } else $phi$2115 = $inl$$inl$$inl$_15_e_$u$156_$u$1076_$u$5674_$u$6424;
              return ($$compiler$prelude_jg$$Pair($inl$$inl$_15_a_$u$169_$u$1089_$u$5689))($phi$2115)
            }
          };
          var $inl$_19_p_$u$27_$u$5742 = ((($$compiler$ast_jg$$downAndUp(function($inl$$inl$$inl$_15_a_$u$169_$u$1089_$u$5689_$u$6440){
            return function($inl$$inl$$inl$_15_e_$u$170_$u$1090_$u$5690_$u$6441){
              var $inl$$inl$$inl$_15_e_$u$156_$u$1076_$u$5674_$u$6442 = $inl$$inl$$inl$_15_e_$u$170_$u$1090_$u$5690_$u$6441;
              var $phi$2120 = $inl$$inl$$inl$_15_e_$u$156_$u$1076_$u$5674_$u$6442;
              var $phi$2121 = undefined;
              if((($phi$2120.$tag==$$compiler$ast_jg$$App.$tag)&&($phi$2120.$1.$tag==$$compiler$ast_jg$$Lam.$tag))&&($phi$2120.$2.$tag==$$compiler$ast_jg$$Var.$tag)){
                var $phi$2124 = $instance$Eq$1;
                var $phi$2125 = undefined;
                $phi$2125 = $phi$2124.$0;
                var $phi$2122 = ($phi$2125($phi$2120.$1.$1))($phi$2120.$2.$1);
                var $phi$2123 = undefined;
                if($phi$2122){
                  $phi$2123 = $phi$2120.$1.$2
                } else if(!$phi$2122){
                  var $inl$$inl$_19_x_$u$103_$u$5740_$u$6450 = ($$compiler$prelude_jg$$Pair($phi$2120.$1.$1))(($$compiler$ast_jg$$Var($phi$2120.$2.$0))($phi$2120.$2.$1));
                  $phi$2123 = ((($$compiler$ast_jg$$Let($phi$2120.$0))((push($inl$$inl$_19_x_$u$103_$u$5740_$u$6450))(emptyArray)))($phi$2120.$1.$2))
                } else error("pattern match fail",$phi$2122);
                $phi$2121 = $phi$2123
              } else if(($phi$2120.$tag==$$compiler$ast_jg$$App.$tag)&&($phi$2120.$1.$tag==$$compiler$ast_jg$$Lam.$tag)){
                var $inl$$inl$_19_x_$u$103_$u$5741_$u$6456 = ($$compiler$prelude_jg$$Pair($phi$2120.$1.$1))($phi$2120.$2);
                $phi$2121 = ((($$compiler$ast_jg$$Let($phi$2120.$0))((push($inl$$inl$_19_x_$u$103_$u$5741_$u$6456))(emptyArray)))($phi$2120.$1.$2))
              } else $phi$2121 = $inl$$inl$$inl$_15_e_$u$156_$u$1076_$u$5674_$u$6442;
              return ($$compiler$prelude_jg$$Pair($inl$$inl$$inl$_15_a_$u$169_$u$1089_$u$5689_$u$6440))($phi$2121)
            }
          }))($$compiler$prelude_jg$$Pair))($$compiler$prelude_jg$$Unit))($inl$$inl$_15_e_$u$154_$u$1074_$u$5672);
          var $phi$2126 = $inl$_19_p_$u$27_$u$5742;
          var $phi$2127 = undefined;
          $phi$2127 = $phi$2126.$1;
          return $phi$2127
        }))($inl$$inl$_15_bs_$u$87_$u$1012_$u$5668))
      })
    }))($phi$2058.$6));
    var $inl$$inl$_15_is_$u$89_$u$1094_$u$5692 = $phi$2058.$2;
    var $inl$_15_is2_$u$60_$u$5598 = $phi$2058.$2;
    var $inl$$inl$_15_ds_$u$91_$u$1096_$u$5693 = $phi$2058.$3;
    var $inl$_15_ds2_$u$59_$u$5599 = $phi$2058.$3;
    $phi$2059 = ((((((($$compiler$ast_jg$$Module($phi$2058.$0))($phi$2058.$1))($inl$_15_is2_$u$60_$u$5598))($inl$_15_ds2_$u$59_$u$5599))($phi$2058.$4))($phi$2058.$5))($inl$_15_bs2_$u$57_$u$5596));
    return $phi$2059
  })(_0_merged_$u$77);
  var $inl$_9_p_$u$29_$u$5749 = _0_args_$u$63;
  var _0_profile_$u$68 = (function($inl$_9_def_$u$30_$u$5750){
    var $phi$2128 = _0_args_$u$63;
    var $phi$2129 = undefined;
    var $phi$2130 = (($$compiler$prelude_jg$$contains($instance$Eq$0))($inl$_9_def_$u$30_$u$5750))($phi$2128.$2);
    var $phi$2131 = undefined;
    if(!$phi$2130){
      $phi$2131 = (error("unrecognized arg that was not present for parsing"))
    } else if($phi$2130){
      var $phi$2132 = $inl$_9_def_$u$30_$u$5750;
      var $phi$2133 = undefined;
      if($phi$2132.$tag==$$compiler$args_jg$$ArgBool.$tag){
        var $phi$2134 = (has($phi$2132.$0))($phi$2128.$1);
        var $phi$2135 = undefined;
        if(!$phi$2134){
          var $phi$2138 = $phi$2132.$1;
          var $phi$2139 = undefined;
          if($phi$2138.$tag==$$compiler$prelude_jg$$Just.$tag){
            $phi$2139 = $phi$2138.$0
          } else if($phi$2138.$tag==$$compiler$prelude_jg$$Nothing.$tag){
            $phi$2139 = (error(($concat("no value for required arg "))($phi$2132.$0)))
          } else error("pattern match fail",$phi$2138);
          $phi$2135 = $phi$2139
        } else if($phi$2134){
          var $phi$2136 = (get($phi$2132.$0))($phi$2128.$1);
          var $phi$2137 = undefined;
          if(""==$phi$2136){
            $phi$2137 = true
          } else if("True"==$phi$2136){
            $phi$2137 = true
          } else if("true"==$phi$2136){
            $phi$2137 = true
          } else if("1"==$phi$2136){
            $phi$2137 = true
          } else if("False"==$phi$2136){
            $phi$2137 = false
          } else if("false"==$phi$2136){
            $phi$2137 = false
          } else if("0"==$phi$2136){
            $phi$2137 = false
          } else $phi$2137 = (error(($concat("invalid value for a bool argument: "))($phi$2136)));
          $phi$2135 = $phi$2137
        } else error("pattern match fail",$phi$2134);
        $phi$2133 = $phi$2135
      } else $phi$2133 = (error("arg is not a bool"));
      $phi$2131 = $phi$2133
    } else error("pattern match fail",$phi$2130);
    $phi$2129 = $phi$2131;
    return $phi$2129
  })($$compiler$compiler_jg$$profileArg);
  var $phi$2140 = _0_profile_$u$68;
  var $phi$2141 = undefined;
  if($phi$2140){
    var $inl$_0_instrumentExpr_$u$36_$u$4476 = function($inl$_0_n_$u$44_$u$4482){
      return function($inl$_0_e_$u$45_$u$4483){
        var $phi$2142 = $inl$_0_e_$u$45_$u$4483;
        var $phi$2143 = undefined;
        if($phi$2142.$tag==$$compiler$ast_jg$$Lam.$tag){
          $phi$2143 = ((($$compiler$ast_jg$$Lam($phi$2142.$0))($phi$2142.$1))(($inl$_0_instrumentExpr_$u$36_$u$4476($inl$_0_n_$u$44_$u$4482))($phi$2142.$2)))
        } else {
          var $inl$_0_we_$u$50_$u$4488 = (($$compiler$ast_jg$$Lam($$compiler$prelude_jg$$Empty))("$unused$"))($inl$_0_e_$u$45_$u$4483);
          $phi$2143 = ((($$compiler$ast_jg$$App($$compiler$prelude_jg$$Empty))((($$compiler$ast_jg$$App($$compiler$prelude_jg$$Empty))(($$compiler$ast_jg$$Var($$compiler$prelude_jg$$Empty))("perfTime")))(($$compiler$ast_jg$$Const($$compiler$prelude_jg$$Empty))($$compiler$ast_jg$$CStr($inl$_0_n_$u$44_$u$4482)))))($inl$_0_we_$u$50_$u$4488))
        };
        return $phi$2143
      }
    };
    var $phi$2144 = _0_optimized_$u$78;
    var $phi$2145 = undefined;
    $phi$2145 = ((((((($$compiler$ast_jg$$Module($phi$2144.$0))($phi$2144.$1))((map(function($inl$$inl$_0_i_$u$51_$u$4478_$u$5759){
      var $phi$2146 = $inl$$inl$_0_i_$u$51_$u$4478_$u$5759;
      var $phi$2147 = undefined;
      if(($phi$2146.$tag==$$compiler$ast_jg$$ImportOpen.$tag)&&("./builtins.js"==$phi$2146.$1)){
        $phi$2147 = ((($$compiler$ast_jg$$ImportOpen($phi$2146.$0))("./builtins.js"))((push(($$compiler$prelude_jg$$Pair("perfTime"))("perfTime")))($phi$2146.$2)))
      } else $phi$2147 = $inl$$inl$_0_i_$u$51_$u$4478_$u$5759;
      return $phi$2147
    }))($phi$2144.$2)))($phi$2144.$3))($phi$2144.$4))($phi$2144.$5))((map(function($inl$$inl$_0_d_$u$38_$u$4489_$u$5763){
      var $phi$2148 = $inl$$inl$_0_d_$u$38_$u$4489_$u$5763;
      var $phi$2149 = undefined;
      if($phi$2148.$1.$tag==$$compiler$ast_jg$$Lam.$tag){
        $phi$2149 = (($$compiler$prelude_jg$$Pair($phi$2148.$0))(($inl$_0_instrumentExpr_$u$36_$u$4476($phi$2148.$0))((($$compiler$ast_jg$$Lam($phi$2148.$1.$0))($phi$2148.$1.$1))($phi$2148.$1.$2))))
      } else $phi$2149 = $inl$$inl$_0_d_$u$38_$u$4489_$u$5763;
      return $phi$2149
    }))($phi$2144.$6)));
    $phi$2141 = (($$compiler$js$backend_jg$$compileModule(_0_exports_$u$73))($phi$2145))
  } else if(!$phi$2140){
    $phi$2141 = (($$compiler$js$backend_jg$$compileModule(_0_exports_$u$73))(_0_optimized_$u$78))
  } else error("pattern match fail",$phi$2140);
  var _0_rawjs_$u$79 = $phi$2141;
  var $inl$_4_mainName_$u$2_$u$5769 = _0_mainName_$u$66;
  var $inl$_19_f_$u$0_$u$5779 = function($inl$_19_x_$u$103_$u$5781){
    return (push($inl$_19_x_$u$103_$u$5781))(emptyArray)
  };
  var _0_js_$u$80 = ((function($inl$_4_builtinsPath_$u$3_$u$5770){
    return function($inl$_4_ms_$u$4_$u$5771){
      var $inl$_4_mainFun_$u$8_$u$5772 = ($$compiler$uniquifier_jg$$addPrefix(_0_mainName_$u$66))("main");
      var $inl$_4_runStmt_$u$9_$u$5773 = ($concat(($concat(($concat(($concat("if (module.exports."))($inl$_4_mainFun_$u$8_$u$5772)))(")module.exports.")))($inl$_4_mainFun_$u$8_$u$5772)))("(process.argv)");
      var $inl$_4_exportStmt_$u$7_$u$5774 = ($concat(($concat("module.exports = cache[\""))(_0_mainName_$u$66)))("\"]\n");
      var $inl$_4_requireFun_$u$6_$u$5775 = ($concat(($concat(($concat(($concat(($concat("var cache = {}\n"))("function _require(f) {\n")))("  return cache[f] || require(f == \"./builtins.js\" ? process.cwd() + \"/\" + \"")))($inl$_4_builtinsPath_$u$3_$u$5770)))("\" : f);\n")))("}\n");
      return ($concat(($concat(($concat($inl$_4_requireFun_$u$6_$u$5775))((intercalate("\n"))((map(function($inl$$inl$_4_nm_$u$10_$u$3096_$u$5776){
        var $phi$2150 = $inl$$inl$_4_nm_$u$10_$u$3096_$u$5776;
        var $phi$2151 = undefined;
        $phi$2151 = (($concat(($concat(($concat(($concat("cache[\""))($phi$2150.$0)))("\"] = (function() {")))($phi$2150.$1)))("\nreturn exports;})();"));
        return $phi$2151
      }))($inl$_4_ms_$u$4_$u$5771)))))($inl$_4_exportStmt_$u$7_$u$5774)))($inl$_4_runStmt_$u$9_$u$5773)
    }
  })(_0_builtinsPath_$u$64))((function($inl$_19_a_$u$1_$u$5780){
    var $inl$$inl$_19_x_$u$103_$u$5781_$u$6458 = $inl$_19_a_$u$1_$u$5780;
    return (push($inl$$inl$_19_x_$u$103_$u$5781_$u$6458))(emptyArray)
  })(($$compiler$prelude_jg$$Pair(_0_mainName_$u$66))(_0_rawjs_$u$79)));
  var _0_outPath_$u$65 = ($$compiler$args_jg$$getString(_0_args_$u$63))($$compiler$compiler_jg$$outPathArg);
  return (writeFile(_0_js_$u$80))(_0_outPath_$u$65)
};
var exports = {$$compiler$prelude_jg$$Unit:$$compiler$prelude_jg$$Unit,$$compiler$prelude_jg$$Just:$$compiler$prelude_jg$$Just,$$compiler$prelude_jg$$Nothing:$$compiler$prelude_jg$$Nothing,$$compiler$prelude_jg$$Pair:$$compiler$prelude_jg$$Pair,$$compiler$prelude_jg$$Left:$$compiler$prelude_jg$$Left,$$compiler$prelude_jg$$Right:$$compiler$prelude_jg$$Right,$$compiler$prelude_jg$$State:$$compiler$prelude_jg$$State,$$compiler$prelude_jg$$Empty:$$compiler$prelude_jg$$Empty,$$compiler$prelude_jg$$Leaf:$$compiler$prelude_jg$$Leaf,$$compiler$prelude_jg$$Collision:$$compiler$prelude_jg$$Collision,$$compiler$prelude_jg$$BitmapIndexed:$$compiler$prelude_jg$$BitmapIndexed,$class$Eq:$class$Eq,$class$Ord:$class$Ord,$class$Functor:$class$Functor,$class$Applicative:$class$Applicative,$class$Alternative:$class$Alternative,$class$Monad:$class$Monad,$class$Hashable:$class$Hashable,$$compiler$ast_jg$$AnnType:$$compiler$ast_jg$$AnnType,$$compiler$ast_jg$$AnnCodeLoc:$$compiler$ast_jg$$AnnCodeLoc,$$compiler$ast_jg$$AnnUseCount:$$compiler$ast_jg$$AnnUseCount,$$compiler$ast_jg$$Var:$$compiler$ast_jg$$Var,$$compiler$ast_jg$$Const:$$compiler$ast_jg$$Const,$$compiler$ast_jg$$App:$$compiler$ast_jg$$App,$$compiler$ast_jg$$Lam:$$compiler$ast_jg$$Lam,$$compiler$ast_jg$$Case:$$compiler$ast_jg$$Case,$$compiler$ast_jg$$Let:$$compiler$ast_jg$$Let,$$compiler$ast_jg$$CNum:$$compiler$ast_jg$$CNum,$$compiler$ast_jg$$CStr:$$compiler$ast_jg$$CStr,$$compiler$ast_jg$$PVar:$$compiler$ast_jg$$PVar,$$compiler$ast_jg$$PConst:$$compiler$ast_jg$$PConst,$$compiler$ast_jg$$PData:$$compiler$ast_jg$$PData,$$compiler$ast_jg$$Module:$$compiler$ast_jg$$Module,$$compiler$ast_jg$$ModuleInterface:$$compiler$ast_jg$$ModuleInterface,$$compiler$ast_jg$$Data:$$compiler$ast_jg$$Data,$$compiler$ast_jg$$DataCon:$$compiler$ast_jg$$DataCon,$$compiler$ast_jg$$Class:$$compiler$ast_jg$$Class,$$compiler$ast_jg$$Instance:$$compiler$ast_jg$$Instance,$$compiler$ast_jg$$TCBound:$$compiler$ast_jg$$TCBound,$$compiler$ast_jg$$TConst:$$compiler$ast_jg$$TConst,$$compiler$ast_jg$$TVar:$$compiler$ast_jg$$TVar,$$compiler$ast_jg$$TApp:$$compiler$ast_jg$$TApp,$$compiler$ast_jg$$TBot:$$compiler$ast_jg$$TBot,$$compiler$ast_jg$$TForall:$$compiler$ast_jg$$TForall,$$compiler$ast_jg$$TUnknown:$$compiler$ast_jg$$TUnknown,$$compiler$ast_jg$$ImportClosed:$$compiler$ast_jg$$ImportClosed,$$compiler$ast_jg$$ImportOpen:$$compiler$ast_jg$$ImportOpen,$$compiler$ast_jg$$ImportAll:$$compiler$ast_jg$$ImportAll,$$compiler$typer_jg$$Subs:$$compiler$typer_jg$$Subs,$$compiler$typer_jg$$ICtx:$$compiler$typer_jg$$ICtx,$$compiler$typer_jg$$IEnv:$$compiler$typer_jg$$IEnv,$$compiler$declasser_jg$$S:$$compiler$declasser_jg$$S,$$compiler$args_jg$$ArgBool:$$compiler$args_jg$$ArgBool,$$compiler$args_jg$$ArgString:$$compiler$args_jg$$ArgString,$$compiler$args_jg$$ParsedArgs:$$compiler$args_jg$$ParsedArgs,$$compiler$js$ast_jg$$JSRef:$$compiler$js$ast_jg$$JSRef,$$compiler$js$ast_jg$$JSIndex:$$compiler$js$ast_jg$$JSIndex,$$compiler$js$ast_jg$$JSUnOp:$$compiler$js$ast_jg$$JSUnOp,$$compiler$js$ast_jg$$JSBinOp:$$compiler$js$ast_jg$$JSBinOp,$$compiler$js$ast_jg$$JSCall:$$compiler$js$ast_jg$$JSCall,$$compiler$js$ast_jg$$JSFun:$$compiler$js$ast_jg$$JSFun,$$compiler$js$ast_jg$$JSTernary:$$compiler$js$ast_jg$$JSTernary,$$compiler$js$ast_jg$$JSNum:$$compiler$js$ast_jg$$JSNum,$$compiler$js$ast_jg$$JSString:$$compiler$js$ast_jg$$JSString,$$compiler$js$ast_jg$$JSBool:$$compiler$js$ast_jg$$JSBool,$$compiler$js$ast_jg$$JSObject:$$compiler$js$ast_jg$$JSObject,$$compiler$js$ast_jg$$JSNull:$$compiler$js$ast_jg$$JSNull,$$compiler$js$ast_jg$$JSUndefined:$$compiler$js$ast_jg$$JSUndefined,$$compiler$js$ast_jg$$JSInstanceOf:$$compiler$js$ast_jg$$JSInstanceOf,$$compiler$js$ast_jg$$JSNew:$$compiler$js$ast_jg$$JSNew,$$compiler$js$ast_jg$$JSSeq:$$compiler$js$ast_jg$$JSSeq,$$compiler$js$ast_jg$$JSExpr:$$compiler$js$ast_jg$$JSExpr,$$compiler$js$ast_jg$$JSReturn:$$compiler$js$ast_jg$$JSReturn,$$compiler$js$ast_jg$$JSVar:$$compiler$js$ast_jg$$JSVar,$$compiler$js$ast_jg$$JSSwitch:$$compiler$js$ast_jg$$JSSwitch,$$compiler$js$ast_jg$$JSBreak:$$compiler$js$ast_jg$$JSBreak,$$compiler$js$ast_jg$$JSAssign:$$compiler$js$ast_jg$$JSAssign,$$compiler$js$ast_jg$$JSIf:$$compiler$js$ast_jg$$JSIf,$$compiler$js$jaguarToJs_jg$$RewriteState:$$compiler$js$jaguarToJs_jg$$RewriteState,$$compiler$parsers_jg$$Success:$$compiler$parsers_jg$$Success,$$compiler$parsers_jg$$Error:$$compiler$parsers_jg$$Error,$$compiler$parsers_jg$$Parser:$$compiler$parsers_jg$$Parser,$$compiler$jaguarLexer_jg$$LexerState:$$compiler$jaguarLexer_jg$$LexerState,$$compiler$jaguarLexer_jg$$WsTok:$$compiler$jaguarLexer_jg$$WsTok,$$compiler$jaguarLexer_jg$$SymTok:$$compiler$jaguarLexer_jg$$SymTok,$$compiler$jaguarLexer_jg$$NumTok:$$compiler$jaguarLexer_jg$$NumTok,$$compiler$jaguarLexer_jg$$StrTok:$$compiler$jaguarLexer_jg$$StrTok,$$compiler$jaguarLexer_jg$$OpTok:$$compiler$jaguarLexer_jg$$OpTok,$$compiler$jaguarLexer_jg$$IdTok:$$compiler$jaguarLexer_jg$$IdTok,$$compiler$jaguarLexer_jg$$ComTok:$$compiler$jaguarLexer_jg$$ComTok,$$compiler$jaguarLexer_jg$$Token:$$compiler$jaguarLexer_jg$$Token,$$compiler$jaguarParser_jg$$ParserState:$$compiler$jaguarParser_jg$$ParserState,$instance$Eq$0:$instance$Eq$0,$instance$Eq$1:$instance$Eq$1,$instance$Ord$2:$instance$Ord$2,$instance$Ord$3:$instance$Ord$3,$instance$Functor$4:$instance$Functor$4,$instance$Alternative$6:$instance$Alternative$6,$instance$Functor$9:$instance$Functor$9,$instance$Applicative$10:$instance$Applicative$10,$instance$Monad$11:$instance$Monad$11,$instance$Hashable$13:$instance$Hashable$13,$$compiler$prelude_jg$$$div$eq:$$compiler$prelude_jg$$$div$eq,$$compiler$prelude_jg$$hamtMask:$$compiler$prelude_jg$$hamtMask,$$compiler$prelude_jg$$hamtIndex:$$compiler$prelude_jg$$hamtIndex,$$compiler$prelude_jg$$insert:$$compiler$prelude_jg$$insert,$$compiler$prelude_jg$$setAdd:$$compiler$prelude_jg$$setAdd,$$compiler$prelude_jg$$loop:$$compiler$prelude_jg$$loop,$$compiler$prelude_jg$$find:$$compiler$prelude_jg$$find,$$compiler$prelude_jg$$lookup:$$compiler$prelude_jg$$lookup,$$compiler$prelude_jg$$setContains:$$compiler$prelude_jg$$setContains,$$compiler$prelude_jg$$foldTrie:$$compiler$prelude_jg$$foldTrie,$$compiler$prelude_jg$$setIntersection:$$compiler$prelude_jg$$setIntersection,$$compiler$prelude_jg$$remove:$$compiler$prelude_jg$$remove,$$compiler$prelude_jg$$setDiff:$$compiler$prelude_jg$$setDiff,$$compiler$prelude_jg$$setToArray:$$compiler$prelude_jg$$setToArray,$$compiler$prelude_jg$$mergeTrie:$$compiler$prelude_jg$$mergeTrie,$$compiler$prelude_jg$$size:$$compiler$prelude_jg$$size,$$compiler$prelude_jg$$evalState:$$compiler$prelude_jg$$evalState,$$compiler$prelude_jg$$gets:$$compiler$prelude_jg$$gets,$$compiler$prelude_jg$$foldM:$$compiler$prelude_jg$$foldM,$$compiler$prelude_jg$$mapM:$$compiler$prelude_jg$$mapM,$$compiler$prelude_jg$$toRecord:$$compiler$prelude_jg$$toRecord,$$compiler$prelude_jg$$reverse:$$compiler$prelude_jg$$reverse,$$compiler$prelude_jg$$tail:$$compiler$prelude_jg$$tail,$$compiler$prelude_jg$$head:$$compiler$prelude_jg$$head,$$compiler$prelude_jg$$uniq:$$compiler$prelude_jg$$uniq,$$compiler$prelude_jg$$mergeSet:$$compiler$prelude_jg$$mergeSet,$$compiler$prelude_jg$$last:$$compiler$prelude_jg$$last,$$compiler$prelude_jg$$concatMap:$$compiler$prelude_jg$$concatMap,$$compiler$prelude_jg$$zip:$$compiler$prelude_jg$$zip,$$compiler$prelude_jg$$zipWithIndex2:$$compiler$prelude_jg$$zipWithIndex2,$$compiler$prelude_jg$$zipWithIndex:$$compiler$prelude_jg$$zipWithIndex,$$compiler$prelude_jg$$join:$$compiler$prelude_jg$$join,$$compiler$prelude_jg$$all:$$compiler$prelude_jg$$all,$$compiler$prelude_jg$$exists:$$compiler$prelude_jg$$exists,$$compiler$prelude_jg$$containsChar:$$compiler$prelude_jg$$containsChar,$$compiler$prelude_jg$$contains:$$compiler$prelude_jg$$contains,$$compiler$prelude_jg$$either:$$compiler$prelude_jg$$either,$$compiler$prelude_jg$$splitEither:$$compiler$prelude_jg$$splitEither,$$compiler$prelude_jg$$$gt$gt:$$compiler$prelude_jg$$$gt$gt,$$compiler$prelude_jg$$$gt:$$compiler$prelude_jg$$$gt,$$compiler$ast_jg$$breakableDownAndUpM:$$compiler$ast_jg$$breakableDownAndUpM,$$compiler$ast_jg$$breakableDownM:$$compiler$ast_jg$$breakableDownM,$$compiler$ast_jg$$breakableDownAndUp:$$compiler$ast_jg$$breakableDownAndUp,$$compiler$ast_jg$$downAndUp:$$compiler$ast_jg$$downAndUp,$$compiler$ast_jg$$up:$$compiler$ast_jg$$up,$$compiler$ast_jg$$getAnn:$$compiler$ast_jg$$getAnn,$$compiler$ast_jg$$getAnnType:$$compiler$ast_jg$$getAnnType,$$compiler$ast_jg$$annOf:$$compiler$ast_jg$$annOf,$$compiler$ast_jg$$setAnn:$$compiler$ast_jg$$setAnn,$$compiler$ast_jg$$setAnnType:$$compiler$ast_jg$$setAnnType,$$compiler$ast_jg$$setType:$$compiler$ast_jg$$setType,$$compiler$ast_jg$$dataConNames:$$compiler$ast_jg$$dataConNames,$$compiler$ast_jg$$equivBound:$$compiler$ast_jg$$equivBound,$$compiler$ast_jg$$equivType:$$compiler$ast_jg$$equivType,$$compiler$ast_jg$$getAnnCodeLoc:$$compiler$ast_jg$$getAnnCodeLoc,$$compiler$uniquifier_jg$$rewriteExpr:$$compiler$uniquifier_jg$$rewriteExpr,$$compiler$uniquifier_jg$$addPrefix:$$compiler$uniquifier_jg$$addPrefix,$$compiler$uniquifier_jg$$uniquify:$$compiler$uniquifier_jg$$uniquify,$$compiler$printer_jg$$printType:$$compiler$printer_jg$$printType,$$compiler$printer_jg$$printTypeBound:$$compiler$printer_jg$$printTypeBound,$$compiler$printer_jg$$indent:$$compiler$printer_jg$$indent,$$compiler$inliner_jg$$patSize:$$compiler$inliner_jg$$patSize,$$compiler$inliner_jg$$exprSize:$$compiler$inliner_jg$$exprSize,$$compiler$inliner_jg$$getCount:$$compiler$inliner_jg$$getCount,$$compiler$inliner_jg$$mergeCount:$$compiler$inliner_jg$$mergeCount,$$compiler$inliner_jg$$chooseForInlining:$$compiler$inliner_jg$$chooseForInlining,$$compiler$inliner_jg$$mapBindingsM:$$compiler$inliner_jg$$mapBindingsM,$$compiler$inliner_jg$$inlineCode:$$compiler$inliner_jg$$inlineCode,$$compiler$inliner_jg$$dropDeadBindings:$$compiler$inliner_jg$$dropDeadBindings,$$compiler$inliner_jg$$mapBindings:$$compiler$inliner_jg$$mapBindings,$$compiler$inliner_jg$$loopPasses:$$compiler$inliner_jg$$loopPasses,$$compiler$graph_jg$$dfs:$$compiler$graph_jg$$dfs,$$compiler$graph_jg$$fullDfs:$$compiler$graph_jg$$fullDfs,$$compiler$typer_jg$$instanceToTypeBound:$$compiler$typer_jg$$instanceToTypeBound,$$compiler$typer_jg$$mkTForall:$$compiler$typer_jg$$mkTForall,$$compiler$typer_jg$$f1:$$compiler$typer_jg$$f1,$$compiler$typer_jg$$conTypes:$$compiler$typer_jg$$conTypes,$$compiler$typer_jg$$getTypedExports:$$compiler$typer_jg$$getTypedExports,$$compiler$typer_jg$$getSub:$$compiler$typer_jg$$getSub,$$compiler$typer_jg$$applySubs:$$compiler$typer_jg$$applySubs,$$compiler$typer_jg$$applySubsBound:$$compiler$typer_jg$$applySubsBound,$$compiler$typer_jg$$applySubsE:$$compiler$typer_jg$$applySubsE,$$compiler$typer_jg$$freeVars:$$compiler$typer_jg$$freeVars,$$compiler$typer_jg$$newTVarM:$$compiler$typer_jg$$newTVarM,$$compiler$typer_jg$$errorM:$$compiler$typer_jg$$errorM,$$compiler$typer_jg$$getSafe:$$compiler$typer_jg$$getSafe,$$compiler$typer_jg$$getBinding:$$compiler$typer_jg$$getBinding,$$compiler$typer_jg$$getBindingM:$$compiler$typer_jg$$getBindingM,$$compiler$typer_jg$$hasBinding:$$compiler$typer_jg$$hasBinding,$$compiler$typer_jg$$freeTVars:$$compiler$typer_jg$$freeTVars,$$compiler$typer_jg$$freeTVarsInBound:$$compiler$typer_jg$$freeTVarsInBound,$$compiler$typer_jg$$addBinding:$$compiler$typer_jg$$addBinding,$$compiler$typer_jg$$emptySubs:$$compiler$typer_jg$$emptySubs,$$compiler$typer_jg$$composeSubs:$$compiler$typer_jg$$composeSubs,$$compiler$typer_jg$$addSub:$$compiler$typer_jg$$addSub,$$compiler$typer_jg$$substitute:$$compiler$typer_jg$$substitute,$$compiler$typer_jg$$unify:$$compiler$typer_jg$$unify,$$compiler$typer_jg$$instantiate:$$compiler$typer_jg$$instantiate,$$compiler$typer_jg$$setSubs:$$compiler$typer_jg$$setSubs,$$compiler$typer_jg$$getErrorF:$$compiler$typer_jg$$getErrorF,$$compiler$typer_jg$$unifyM:$$compiler$typer_jg$$unifyM,$$compiler$typer_jg$$onError:$$compiler$typer_jg$$onError,$$compiler$typer_jg$$unrollDataConType:$$compiler$typer_jg$$unrollDataConType,$$compiler$typer_jg$$setBounds:$$compiler$typer_jg$$setBounds,$$compiler$typer_jg$$generalize:$$compiler$typer_jg$$generalize,$$compiler$typer_jg$$satisfies:$$compiler$typer_jg$$satisfies,$$compiler$typer_jg$$satisfiesBound:$$compiler$typer_jg$$satisfiesBound,$$compiler$typer_jg$$infer:$$compiler$typer_jg$$infer,$$compiler$typer_jg$$inferDefs:$$compiler$typer_jg$$inferDefs,$$compiler$typer_jg$$newCtx:$$compiler$typer_jg$$newCtx,$$compiler$typer_jg$$classToBindings:$$compiler$typer_jg$$classToBindings,$$compiler$typer_jg$$emptyEnv:$$compiler$typer_jg$$emptyEnv,$$compiler$typer_jg$$addInstance:$$compiler$typer_jg$$addInstance,$$compiler$typer_jg$$inferTypeModule:$$compiler$typer_jg$$inferTypeModule,$$compiler$importNormalizer_jg$$normalizeImports:$$compiler$importNormalizer_jg$$normalizeImports,$$compiler$declasser_jg$$rewriteExpr:$$compiler$declasser_jg$$rewriteExpr,$$compiler$declasser_jg$$instanceName:$$compiler$declasser_jg$$instanceName,$$compiler$declasser_jg$$declassModule:$$compiler$declasser_jg$$declassModule,$instance$Eq$0:$instance$Eq$0,$$compiler$args_jg$$getString:$$compiler$args_jg$$getString,$$compiler$js$deadCode_jg$$tryDCE:$$compiler$js$deadCode_jg$$tryDCE,$$compiler$js$deadCode_jg$$rewriteDCE:$$compiler$js$deadCode_jg$$rewriteDCE,$$compiler$js$deadCode_jg$$rewriteStmt:$$compiler$js$deadCode_jg$$rewriteStmt,$$compiler$js$printer_jg$$printIndent:$$compiler$js$printer_jg$$printIndent,$$compiler$js$printer_jg$$paren:$$compiler$js$printer_jg$$paren,$$compiler$js$printer_jg$$jsExprToString:$$compiler$js$printer_jg$$jsExprToString,$$compiler$js$printer_jg$$jsExprToParenString:$$compiler$js$printer_jg$$jsExprToParenString,$$compiler$js$printer_jg$$jsStmtToString:$$compiler$js$printer_jg$$jsStmtToString,$$compiler$js$jaguarToJs_jg$$opName:$$compiler$js$jaguarToJs_jg$$opName,$$compiler$js$jaguarToJs_jg$$newPhi:$$compiler$js$jaguarToJs_jg$$newPhi,$$compiler$js$jaguarToJs_jg$$processPattern:$$compiler$js$jaguarToJs_jg$$processPattern,$$compiler$js$jaguarToJs_jg$$getCons:$$compiler$js$jaguarToJs_jg$$getCons,$$compiler$js$jaguarToJs_jg$$addStmt:$$compiler$js$jaguarToJs_jg$$addStmt,$$compiler$js$jaguarToJs_jg$$addVar:$$compiler$js$jaguarToJs_jg$$addVar,$$compiler$js$jaguarToJs_jg$$binOp2:$$compiler$js$jaguarToJs_jg$$binOp2,$$compiler$js$jaguarToJs_jg$$rewriteExprToStmts:$$compiler$js$jaguarToJs_jg$$rewriteExprToStmts,$$compiler$js$jaguarToJs_jg$$rewriteExpr:$$compiler$js$jaguarToJs_jg$$rewriteExpr,$$compiler$js$jaguarToJs_jg$$dataConFieldIds:$$compiler$js$jaguarToJs_jg$$dataConFieldIds,$$compiler$js$backend_jg$$compileModule:$$compiler$js$backend_jg$$compileModule,$instance$Applicative$1:$instance$Applicative$1,$instance$Alternative$2:$instance$Alternative$2,$$compiler$parsers_jg$$letters:$$compiler$parsers_jg$$letters,$$compiler$parsers_jg$$digits:$$compiler$parsers_jg$$digits,$$compiler$parsers_jg$$opt:$$compiler$parsers_jg$$opt,$$compiler$parsers_jg$$$pip$gt:$$compiler$parsers_jg$$$pip$gt,$$compiler$parsers_jg$$many:$$compiler$parsers_jg$$many,$$compiler$parsers_jg$$sepBy1:$$compiler$parsers_jg$$sepBy1,$$compiler$parsers_jg$$some:$$compiler$parsers_jg$$some,$$compiler$parsers_jg$$$lt$pip:$$compiler$parsers_jg$$$lt$pip,$$compiler$jaguarLexer_jg$$mkTok:$$compiler$jaguarLexer_jg$$mkTok,$$compiler$jaguarLexer_jg$$parseChar:$$compiler$jaguarLexer_jg$$parseChar,$$compiler$jaguarLexer_jg$$concatStr:$$compiler$jaguarLexer_jg$$concatStr,$$compiler$jaguarLexer_jg$$someStr:$$compiler$jaguarLexer_jg$$someStr,$$compiler$jaguarLexer_jg$$whitespaceP:$$compiler$jaguarLexer_jg$$whitespaceP,$$compiler$jaguarLexer_jg$$intP:$$compiler$jaguarLexer_jg$$intP,$$compiler$jaguarLexer_jg$$numP:$$compiler$jaguarLexer_jg$$numP,$$compiler$jaguarLexer_jg$$notCharP:$$compiler$jaguarLexer_jg$$notCharP,$$compiler$jaguarLexer_jg$$manyStr:$$compiler$jaguarLexer_jg$$manyStr,$$compiler$jaguarLexer_jg$$lineCommentP:$$compiler$jaguarLexer_jg$$lineCommentP,$$compiler$jaguarLexer_jg$$symbolP:$$compiler$jaguarLexer_jg$$symbolP,$$compiler$jaguarLexer_jg$$identP:$$compiler$jaguarLexer_jg$$identP,$$compiler$jaguarLexer_jg$$opIdentP:$$compiler$jaguarLexer_jg$$opIdentP,$$compiler$jaguarLexer_jg$$opP:$$compiler$jaguarLexer_jg$$opP,$$compiler$jaguarLexer_jg$$anyCharP:$$compiler$jaguarLexer_jg$$anyCharP,$$compiler$jaguarLexer_jg$$stringCharP:$$compiler$jaguarLexer_jg$$stringCharP,$$compiler$jaguarLexer_jg$$stringP:$$compiler$jaguarLexer_jg$$stringP,$$compiler$jaguarLexer_jg$$jaguarTokenP:$$compiler$jaguarLexer_jg$$jaguarTokenP,$$compiler$jaguarLexer_jg$$tokenize:$$compiler$jaguarLexer_jg$$tokenize,$$compiler$jaguarParser_jg$$filterWhitespaceAndComments:$$compiler$jaguarParser_jg$$filterWhitespaceAndComments,$$compiler$jaguarParser_jg$$runParser:$$compiler$jaguarParser_jg$$runParser,$$compiler$jaguarParser_jg$$$lt$mul$mns$gt:$$compiler$jaguarParser_jg$$$lt$mul$mns$gt,$$compiler$jaguarParser_jg$$parseToken:$$compiler$jaguarParser_jg$$parseToken,$$compiler$jaguarParser_jg$$operatorP:$$compiler$jaguarParser_jg$$operatorP,$$compiler$jaguarParser_jg$$symP:$$compiler$jaguarParser_jg$$symP,$$compiler$jaguarParser_jg$$parenP:$$compiler$jaguarParser_jg$$parenP,$$compiler$jaguarParser_jg$$reserved:$$compiler$jaguarParser_jg$$reserved,$$compiler$jaguarParser_jg$$notUpperCaseId:$$compiler$jaguarParser_jg$$notUpperCaseId,$$compiler$jaguarParser_jg$$tvarP:$$compiler$jaguarParser_jg$$tvarP,$$compiler$jaguarParser_jg$$upperCaseId:$$compiler$jaguarParser_jg$$upperCaseId,$$compiler$jaguarParser_jg$$tconstP:$$compiler$jaguarParser_jg$$tconstP,$$compiler$jaguarParser_jg$$typeP:$$compiler$jaguarParser_jg$$typeP,$$compiler$jaguarParser_jg$$simpleTypeP:$$compiler$jaguarParser_jg$$simpleTypeP,$$compiler$jaguarParser_jg$$tappP:$$compiler$jaguarParser_jg$$tappP,$$compiler$jaguarParser_jg$$tfunP:$$compiler$jaguarParser_jg$$tfunP,$$compiler$jaguarParser_jg$$parseType:$$compiler$jaguarParser_jg$$parseType,$$compiler$jaguarParser_jg$$withLocAnn:$$compiler$jaguarParser_jg$$withLocAnn,$$compiler$jaguarParser_jg$$locP:$$compiler$jaguarParser_jg$$locP,$$compiler$jaguarParser_jg$$$pip$mns$gt:$$compiler$jaguarParser_jg$$$pip$mns$gt,$$compiler$jaguarParser_jg$$anyOpP:$$compiler$jaguarParser_jg$$anyOpP,$$compiler$jaguarParser_jg$$reservedP:$$compiler$jaguarParser_jg$$reservedP,$$compiler$jaguarParser_jg$$varP:$$compiler$jaguarParser_jg$$varP,$$compiler$jaguarParser_jg$$cnumP:$$compiler$jaguarParser_jg$$cnumP,$$compiler$jaguarParser_jg$$cstrP:$$compiler$jaguarParser_jg$$cstrP,$$compiler$jaguarParser_jg$$constP:$$compiler$jaguarParser_jg$$constP,$$compiler$jaguarParser_jg$$pvarP:$$compiler$jaguarParser_jg$$pvarP,$$compiler$jaguarParser_jg$$pcstrP:$$compiler$jaguarParser_jg$$pcstrP,$$compiler$jaguarParser_jg$$pcnumP:$$compiler$jaguarParser_jg$$pcnumP,$$compiler$jaguarParser_jg$$pconstP:$$compiler$jaguarParser_jg$$pconstP,$$compiler$jaguarParser_jg$$patP:$$compiler$jaguarParser_jg$$patP,$$compiler$jaguarParser_jg$$pdataP:$$compiler$jaguarParser_jg$$pdataP,$$compiler$jaguarParser_jg$$allPatP:$$compiler$jaguarParser_jg$$allPatP,$$compiler$jaguarParser_jg$$exprP:$$compiler$jaguarParser_jg$$exprP,$$compiler$jaguarParser_jg$$simpleExprP:$$compiler$jaguarParser_jg$$simpleExprP,$$compiler$jaguarParser_jg$$appP:$$compiler$jaguarParser_jg$$appP,$$compiler$jaguarParser_jg$$lamP:$$compiler$jaguarParser_jg$$lamP,$$compiler$jaguarParser_jg$$ofP:$$compiler$jaguarParser_jg$$ofP,$$compiler$jaguarParser_jg$$caseP:$$compiler$jaguarParser_jg$$caseP,$$compiler$jaguarParser_jg$$defP:$$compiler$jaguarParser_jg$$defP,$$compiler$jaguarParser_jg$$letP:$$compiler$jaguarParser_jg$$letP,$$compiler$jaguarParser_jg$$primaryExprP:$$compiler$jaguarParser_jg$$primaryExprP,$$compiler$jaguarParser_jg$$opP:$$compiler$jaguarParser_jg$$opP,$$compiler$jaguarParser_jg$$strP:$$compiler$jaguarParser_jg$$strP,$$compiler$jaguarParser_jg$$importAllP:$$compiler$jaguarParser_jg$$importAllP,$$compiler$jaguarParser_jg$$nonReservedP:$$compiler$jaguarParser_jg$$nonReservedP,$$compiler$jaguarParser_jg$$importNoAliasP:$$compiler$jaguarParser_jg$$importNoAliasP,$$compiler$jaguarParser_jg$$importAliasP:$$compiler$jaguarParser_jg$$importAliasP,$$compiler$jaguarParser_jg$$importOpenP:$$compiler$jaguarParser_jg$$importOpenP,$$compiler$jaguarParser_jg$$importP:$$compiler$jaguarParser_jg$$importP,$$compiler$jaguarParser_jg$$eitherP:$$compiler$jaguarParser_jg$$eitherP,$$compiler$jaguarParser_jg$$classMemberP:$$compiler$jaguarParser_jg$$classMemberP,$$compiler$jaguarParser_jg$$classP:$$compiler$jaguarParser_jg$$classP,$$compiler$jaguarParser_jg$$instanceP:$$compiler$jaguarParser_jg$$instanceP,$$compiler$jaguarParser_jg$$dataConP:$$compiler$jaguarParser_jg$$dataConP,$$compiler$jaguarParser_jg$$dataP:$$compiler$jaguarParser_jg$$dataP,$$compiler$jaguarParser_jg$$topLevelP:$$compiler$jaguarParser_jg$$topLevelP,$$compiler$jaguarParser_jg$$moduleP:$$compiler$jaguarParser_jg$$moduleP,$$compiler$jaguarParser_jg$$parseModule:$$compiler$jaguarParser_jg$$parseModule,$$compiler$compiler_jg$$findImports:$$compiler$compiler_jg$$findImports,$$compiler$compiler_jg$$parseT:$$compiler$compiler_jg$$parseT,$$compiler$compiler_jg$$parseExports:$$compiler$compiler_jg$$parseExports,$$compiler$compiler_jg$$instrument:$$compiler$compiler_jg$$instrument,$$compiler$compiler_jg$$builtinsPathArg:$$compiler$compiler_jg$$builtinsPathArg,$$compiler$compiler_jg$$outPathArg:$$compiler$compiler_jg$$outPathArg,$$compiler$compiler_jg$$mainArg:$$compiler$compiler_jg$$mainArg,$$compiler$compiler_jg$$profileArg:$$compiler$compiler_jg$$profileArg,$$compiler$compiler_jg$$compile:$$compiler$compiler_jg$$compile,$$compiler$compiler_jg$$argDefs:$$compiler$compiler_jg$$argDefs,$$compiler$compiler_jg$$main:$$compiler$compiler_jg$$main}
return exports;})();module.exports = cache["//compiler/compiler.jg"]
if (module.exports.$$compiler$compiler_jg$$main)module.exports.$$compiler$compiler_jg$$main(process.argv)