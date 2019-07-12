const $$builtins = (function() {
 const module = {};
const fs = require('fs');

var builtins = {};

builtins.$add = function(a) {
    return function(b) {
        return a + b
    }
}

builtins.$del = function(a) {
    return function(b) {
        return a - b
    }
}

builtins.$mul = function(a) {
    return function(b) {
        return a * b
    }
}

function _jsLt(a, b) {
        return a < b
    }
builtins.jsLt = function(a) {
    return _jsLt.bind(null, a);
}

function _jsEq(a, b) {
    return a === b;
}

builtins.jsEq = function(a) {
    return _jsEq.bind(null, a);
}


builtins.$and = function(a) {
    return function(b) {
        return a && b
    }
}

builtins.$or = function(a) {
    return function(b) {
        return a || b
    }
}

builtins.$concat = function(a) {
    return function(b) {
        return a + b
    }
}

builtins.empty = {}

function _get(f, r) {
    const v = r[f];
        if (v !== undefined) {
          return v
        } else {
          //throw Error(`no key ${f} in ${r}`)
        }
}
builtins.get = function(f) {
    return _get.bind(null, f);
}

builtins.getIx = builtins.get;
builtins.getChar = builtins.get;

builtins.keys = function(r) {
    return Object.keys(r);
}

builtins.has = function(f) {
    return function(r) {
        return f in r;
    }
}

builtins.del = function(f) {
    return function(r) {
        var out = {};
        for (var x in r)
            if (x != f) out[x] = r[x];
        return out;
    }
}

builtins.set = function(f) {
    return function(a) {
        return function(r) {
            var out = {};
            for (var x in r)
                out[x] = r[x];
            out[f] = a;
            return out;
        }
    }
}

function _setIx(i, a, as) {
  const r = as.slice(0);
  r[i] = a;
  return r;
}
function _setIx1(i, a) {
    return _setIx.bind(null, i, a);
}
builtins.setIx = i => _setIx1.bind(null, i);

builtins.mapRecord = function(f) {
    return function(r) {
        var out = {};
        for (var x in r)
            out[x] = f(r[x]);
        return out;
    }
}

builtins.foldRecord = function(f) {
    return function(v) {
        return function(r) {
            for (var x in r)
                v = f(v)(x)(r[x]);
            return v;
        }
    }
}

builtins.merge = function(a) {
    return function(b) {
        var out = {};
        for (var x in a)
            out[x] = a[x];
        for (var x in b)
            out[x] = b[x];
        return out;
    }
}

builtins.unsafeStringToInt = function(s) {
    return Number(s);
}

builtins.match = function(r) {
  return function(s) {
		var m = s.match(r);
  	return m ? m[0] : '';
  };
}

builtins.drop = function(n) {
	return function(s) {
  	return s.substring(n);
  }
}

builtins.length = function(s) {
	return s.length;
}

builtins.emptyArray = [];

function _push(x, xs) {
    var xs2 = xs.slice(0);
    xs2.push(x);
    return xs2;
}
builtins.push = function(x) {
    return _push.bind(null, x);
}

function _enqueue(x, xs) {
    var xs2 = xs.slice(0);
    xs2.unshift(x);
    return xs2;
}
builtins.enqueue = function(x) {
    return _enqueue.bind(null, x);
}

builtins.intToString = function(i) {
	return String(i);
}

builtins.intercalate = function(sep) {
	return function(arr) {
  	if (arr.length == 0) {
    	return '';
    }
    return arr.slice(1).reduce(function(s, x) { return s + sep + x }, arr[0]);
  }
}

builtins.slice = function(i) {
	return function(arr) {
  	return arr.slice(i);
  }
}

builtins.slice2 = function(from) {
  return function(to) {
  	return function(arr) {
    	return arr.slice(from, to);
    }
  }
}

builtins.splice = start => del => newItems => arr => {
  const r = arr.slice(0);
  r.splice(start, del, ...newItems);
  return r;
};

function _arrDel(ix, len, arr) {
    const r = arr.slice(0);
    r.splice(ix, len);
    return r;
}
builtins.arrDel = ix => len => _arrDel.bind(null, ix, len);

builtins.arrIns = ix => x => arr => {
  const r = arr.slice(0);
  r.splice(ix, 0, x);
  return r;
};

builtins.concat = function(a) {
    return a.concat.bind(a);
}

function _map(f, arr) {
    return arr.map(f);
}
builtins.map = function(f) {
    return _map.bind(null, f);
}

function _filter(f, arr) {
    return arr.filter(f);
}
builtins.filter = function(f) {
    return _filter.bind(null, f);
}

builtins.foldr = function(f) {
  return function(a) {
    return function(arr) {
      return arr.reduceRight(function(b, a) { return f(b)(a) }, a)
    }
  }
}

builtins.foldr1 = function(f) {
  return function(arr) {
    return arr.reduceRight(function(b, a) { return f(b)(a) })
  }
}

builtins.foldl = function(f) {
  return function(a) {
    return function(arr) {
      return arr.reduce(function(b, a) { return f(b)(a) }, a)
    }
  }
}

builtins.foldl1 = function(f) {
  return function(arr) {
    return arr.reduce(function(b, a) { return f(b)(a) })
  }
}

builtins.sort = function(arr) {
	return arr.slice(0).sort();
}

builtins.sortBy = function(f) {
  return function(arr) {
    return arr.slice(0).sort(function(a, b) {
      return f(a)(b);
    });
  }
}

builtins.error = function(s, x) {
    debugger;
    if (x) console.log(JSON.stringify(x));
    throw Error(s);
}

builtins.debug = function(x) {
	console.log(x);
	return x;
}

builtins.jsonStringify = function(s) {
	return JSON.stringify(s);
}

builtins.iterate = start => isFinished => fun => {
  let i = 0;
	let x = start;
  while (!isFinished(x)) {
  	x = fun(x);
    if (i++ > 1000000) {
    	throw Error('infinite loop protection ' + i);
    }
  }
  return x;
}

builtins.True = true;

builtins.False = false;

function period(start, end) {
  var nanos = end[1] - start[1];
  var secs = end[0] - start[0];
  if (nanos < 0) {
    nanos += 1000000000;
    secs -= 1;
  }
  return [secs, nanos];
}

function compare(a, b) {
  if (a[0] == b[0]) return a[1] - b[1];
  return a[0] - b[0];
}

var timingInfo = {};
var inProgress = function() {};
builtins.perfTime = function(label) {
  return function(f) {
    if (!timingInfo[label]) {
      timingInfo[label] = [];
    }
    var times = timingInfo[label];
    timingInfo[label] = inProgress;
    var result = null;
    var start = process.hrtime();
    result = f();
    var end = process.hrtime();
    if (times != inProgress) {
      times.push({start: start, end: end});
      timingInfo[label] = times;
    }
    return result;
  }
}
process.on('exit', function() {
  if (Object.keys(timingInfo).length) {
    console.log('Computing timing stats...');
    var counts = [];
    for (var label in timingInfo) {
      var totalSecs = 0;
      var totalNanos = 0;
      var times = timingInfo[label].sort(function(a,b) { return compare(a.start,b.start)});
      var currentEnd = [0, 0];
      times.forEach(function(m) {
        if (compare(currentEnd, m.end) < 0) {
          currentEnd = m.end;
          var p = period(m.start, m.end);
          totalSecs += p[0];
          totalNanos += p[1];
        }
      });
      totalSecs += Math.floor(totalNanos / 1000000000);
      totalNanos %= 1000000000;
      counts.push({
        label: label,
        count: times.length,
        secs: totalSecs,
        nanos: totalNanos
      });
    }
    counts.sort(function(a, b) {return a.secs - b.secs;});
    counts.forEach(function(c) {
      console.log(`${c.label}: called ${c.count} times for a total runtime of ${c.secs}s ${c.nanos}ns`)
    })
  }
});

builtins.writeFile = function(contents) {
  return function(f) {
    var out = fs.openSync(f, 'w');
    fs.writeSync(out, contents);
  }
}

builtins.readFile = function(f) {
    return fs.readFileSync(f, 'utf8');
}

builtins.processCwd = function(x) {
  return process.cwd();
}

builtins.processArgv = function(x) {
  return process.argv;
}

builtins.loadJSExports = function(f) {
  return require(process.cwd() + '/' + f).$TYPE;
}

builtins.bitAnd = a => b => a & b;
builtins.bitOr = a => b => a | b;
builtins.bitShiftRight = a => b => a >>> b;
builtins.bitShiftLeft = a => b => a << b;
builtins.bitNot = a => ~a;

builtins.strHashCode = function(s) {
  var hash = 0, i, chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr   = s.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
    return hash;
};

builtins.stringReplaceChar = a => b => s => {
  const r = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    r.push(c == a ? b : c);
  }
  return r.join('');
}

builtins.stringSplit = x => s => s.split(x);

builtins.currentTimeMs = unused => {
  const [secs, nanos] = process.hrtime();
  return secs * 1000 + nanos / 1000000;
}

// === INLINE CUT ===

builtins.$TYPE = {
    'writeFile': 'String -> String -> Bool',
    'readFile': 'String -> String',
    'processCwd': 'Bool -> String',
    'processArgv': 'Bool -> Array String',
    'loadJSExports': 'String -> Record String',
    '+': 'Number -> Number -> Number',
    '-': 'Number -> Number -> Number',
    '*': 'Number -> Number -> Number',
    'jsLt': 'a -> a -> Bool',
    'jsEq': 'a -> a -> Bool',
    '&&': 'Bool -> Bool -> Bool',
    '||': 'Bool -> Bool -> Bool',
    '++': 'String -> String -> String',
    empty: 'Record a',
    get: 'String -> Record a -> a',
    getIx: 'Number -> Array a -> a',
    setIx: 'Number -> a -> Array a -> Array a',
    getChar: 'Number -> String -> String',
    keys: 'Record a -> Array String',
    has: 'String -> Record a -> Bool',
    del: 'String -> Record a -> Record a',
    set: 'String -> a -> Record a -> Record a',
    mapRecord: '(a -> b) -> Record a -> Record b',
    foldRecord: '(b -> String -> a -> b) -> b -> Record a -> b',
    merge: 'Record a -> Record a -> Record a',
    unsafeStringToInt: 'String -> Number',
    match: 'String -> String -> String',
    drop: 'Number -> String -> String',
    length: 'a -> Number',
    emptyArray: 'Array a',
    push: 'a -> Array a -> Array a',
    enqueue: 'a -> Array a -> Array a',
    intToString: 'Number -> String',
    intercalate: 'String -> Array String -> String',
    slice: 'Number -> Array a -> Array a',
    slice2: 'Number -> Number -> Array a -> Array a',
    splice: 'Number -> Number -> Array a -> Array a -> Array a',
    arrDel: 'Number -> Number -> Array a -> Array a',
    arrIns: 'Number -> a -> Array a -> Array a',
    concat: 'Array a -> Array a -> Array a',
    map: '(a -> b) -> Array a -> Array b',
    filter: '(a -> Bool) -> Array a -> Array a',
    foldr: '(b -> a -> b) -> b -> Array a -> b',
    foldr1: '(a -> a -> a) -> Array a -> a',
    foldl: '(b -> a -> b) -> b -> Array a -> b',
    foldl1: '(a -> a -> a) -> Array a -> a',
    sort: 'Array a -> Array a',
    sortBy: '(a -> a -> Number) -> Array a -> Array a',
    error: 'a -> b',
    debug: 'a -> a',
    jsonStringify: 'a -> String',
    iterate: 'a -> (a -> Bool) -> (a -> a) -> a',
    True: 'Bool',
    False: 'Bool',
    perfTime: 'String -> (a -> b) -> b',
    bitAnd: 'Number -> Number -> Number',
    bitOr: 'Number -> Number -> Number',
    bitShiftRight: 'Number -> Number -> Number',
    bitShiftLeft: 'Number -> Number -> Number',
    strHashCode: 'String -> Number',
    bitNot: 'Number -> Number',
    stringReplaceChar: 'String -> String -> String -> String',
    stringSplit: 'String -> String -> Array String',
    currentTimeMs: 'Unit -> Number',
};

module.exports = builtins;
;
 return builtins})();
function _require(f) {
  return f == "./builtins.js" ? $$builtins : require(f);
}
(function() {const $and = (_require("./builtins.js")).$and;
const slice2 = (_require("./builtins.js")).slice2;
const $concat = (_require("./builtins.js")).$concat;
const foldr1 = (_require("./builtins.js")).foldr1;
const $or = (_require("./builtins.js")).$or;
const intercalate = (_require("./builtins.js")).intercalate;
const processCwd = (_require("./builtins.js")).processCwd;
const set = (_require("./builtins.js")).set;
const False = (_require("./builtins.js")).False;
const jsonStringify = (_require("./builtins.js")).jsonStringify;
const match = (_require("./builtins.js")).match;
const getIx = (_require("./builtins.js")).getIx;
const foldl1 = (_require("./builtins.js")).foldl1;
const bitNot = (_require("./builtins.js")).bitNot;
const length = (_require("./builtins.js")).length;
const bitShiftRight = (_require("./builtins.js")).bitShiftRight;
const enqueue = (_require("./builtins.js")).enqueue;
const error = (_require("./builtins.js")).error;
const stringSplit = (_require("./builtins.js")).stringSplit;
const $mul = (_require("./builtins.js")).$mul;
const bitAnd = (_require("./builtins.js")).bitAnd;
const arrDel = (_require("./builtins.js")).arrDel;
const del = (_require("./builtins.js")).del;
const $add = (_require("./builtins.js")).$add;
const foldl = (_require("./builtins.js")).foldl;
const currentTimeMs = (_require("./builtins.js")).currentTimeMs;
const emptyArray = (_require("./builtins.js")).emptyArray;
const strHashCode = (_require("./builtins.js")).strHashCode;
const getChar = (_require("./builtins.js")).getChar;
const $del = (_require("./builtins.js")).$del;
const mapRecord = (_require("./builtins.js")).mapRecord;
const empty = (_require("./builtins.js")).empty;
const arrIns = (_require("./builtins.js")).arrIns;
const True = (_require("./builtins.js")).True;
const drop = (_require("./builtins.js")).drop;
const processArgv = (_require("./builtins.js")).processArgv;
const loadJSExports = (_require("./builtins.js")).loadJSExports;
const bitOr = (_require("./builtins.js")).bitOr;
const foldr = (_require("./builtins.js")).foldr;
const jsLt = (_require("./builtins.js")).jsLt;
const setIx = (_require("./builtins.js")).setIx;
const readFile = (_require("./builtins.js")).readFile;
const slice = (_require("./builtins.js")).slice;
const foldRecord = (_require("./builtins.js")).foldRecord;
const debug = (_require("./builtins.js")).debug;
const keys = (_require("./builtins.js")).keys;
const concat = (_require("./builtins.js")).concat;
const sortBy = (_require("./builtins.js")).sortBy;
const jsEq = (_require("./builtins.js")).jsEq;
const perfTime = (_require("./builtins.js")).perfTime;
const get = (_require("./builtins.js")).get;
const merge = (_require("./builtins.js")).merge;
const filter = (_require("./builtins.js")).filter;
const stringReplaceChar = (_require("./builtins.js")).stringReplaceChar;
const iterate = (_require("./builtins.js")).iterate;
const has = (_require("./builtins.js")).has;
const push = (_require("./builtins.js")).push;
const writeFile = (_require("./builtins.js")).writeFile;
const intToString = (_require("./builtins.js")).intToString;
const bitShiftLeft = (_require("./builtins.js")).bitShiftLeft;
const map = (_require("./builtins.js")).map;
const splice = (_require("./builtins.js")).splice;
const unsafeStringToInt = (_require("./builtins.js")).unsafeStringToInt;
const sort = (_require("./builtins.js")).sort;
const Unit_0 = {};
const Just_1 = $_0_95 => ({$0:$_0_95,$tag:0});
const Nothing_2 = {$tag:1};
const Pair_3 = $_0_96 => $_1_97 => ({$0:$_0_96,$1:$_1_97});
const Tuple3_4 = $_0_98 => $_1_99 => $_2_100 => ({$0:$_0_98,$1:$_1_99,$2:$_2_100});
const Tuple4_5 = $_0_101 => $_1_102 => $_2_103 => $_3_104 => ({$0:$_0_101,$1:$_1_102,$2:$_2_103,$3:$_3_104});
const Tuple5_6 = $_0_105 => $_1_106 => $_2_107 => $_3_108 => $_4_109 => ({$0:$_0_105,$1:$_1_106,$2:$_2_107,$3:$_3_108,$4:$_4_109});
const Tuple6_7 = $_0_110 => $_1_111 => $_2_112 => $_3_113 => $_4_114 => $_5_115 => ({$0:$_0_110,$1:$_1_111,$2:$_2_112,$3:$_3_113,$4:$_4_114,$5:$_5_115});
const Left_8 = $_0_116 => ({$0:$_0_116,$tag:0});
const Right_9 = $_0_117 => ({$0:$_0_117,$tag:1});
const State_10 = $_0_118 => ({$0:$_0_118});
const Empty_11 = {$tag:0};
const Leaf_12 = $_0_119 => $_1_120 => ({$0:$_0_119,$1:$_1_120,$tag:1});
const Collision_13 = $_0_121 => ({$0:$_0_121,$tag:2});
const BitmapIndexed_14 = $_0_122 => $_1_123 => ({$0:$_0_122,$1:$_1_123,$tag:3});
const Identity_15 = $_0_124 => ({$0:$_0_124});
const $class$Eq = $_0 => ({$0:$_0});
const $class$Ord = $_0 => ({$0:$_0});
const $class$Functor = $_0 => ({$0:$_0});
const $class$Applicative = $_0 => $_1 => ({$0:$_0,$1:$_1});
const $class$Alternative = $_0 => $_1 => ({$0:$_0,$1:$_1});
const $class$Monad = $_0 => $_1 => ({$0:$_0,$1:$_1});
const $class$Semigroup = $_0 => ({$0:$_0});
const $class$Monoid = $_0 => ({$0:$_0});
const $class$Hashable = $_0 => ({$0:$_0});
const $eq$eq = x_$class$Eq => x_$class$Eq.$0;
const $lt = x_$class$Ord => x_$class$Ord.$0;
const fmap = x_$class$Functor => x_$class$Functor.$0;
const $lt$mul$gt = x_$class$Applicative => x_$class$Applicative.$1;
const pure = x_$class$Applicative => x_$class$Applicative.$0;
const zero = x_$class$Alternative => x_$class$Alternative.$0;
const $lt$pip$gt = x_$class$Alternative => x_$class$Alternative.$1;
const ret = x_$class$Monad => x_$class$Monad.$0;
const $gt$gt$eq = x_$class$Monad => x_$class$Monad.$1;
const $lt$gt = x_$class$Semigroup => x_$class$Semigroup.$0;
const mzero = x_$class$Monoid => x_$class$Monoid.$0;
const hashCode = x_$class$Hashable => x_$class$Hashable.$0;
const $instance_446 = $class$Eq(jsEq);
const $instance_447 = $class$Eq(jsEq);
const $instance_448 = $class$Ord(jsLt);
const $instance_449 = $class$Ord(jsLt);
const $instance_450 = $class$Semigroup(concat);
const $instance_451 = $class$Semigroup($concat);
const $instance_452 = $class$Monoid([]);
const $instance_453 = $class$Monoid("");
const $instance_457 = $class$Functor(f_454 => m_455 => {
  if(m_455.$tag==0){
    return Just_1(f_454(m_455.$0))
  } else if(m_455.$tag==1){
    return Nothing_2
  } else error("pattern match fail in //compiler/prelude.jg at line 68, column 14",m_455)
});
const $instance_462 = ($class$Applicative(x_458 => Just_1(x_458)))(f_459 => x_460 => {
  if(f_459.$tag==1){
    return Nothing_2
  } else if(f_459.$tag==0){
    return ((fmap($instance_457))(f_459.$0))(x_460)
  } else error("pattern match fail in //compiler/prelude.jg at line 74, column 15",f_459)
});
const $instance_466 = ($class$Alternative(Nothing_2))(a_463 => b_464 => {
  if(a_463.$tag==1){
    return b_464
  } else return a_463
});
const $instance_470 = ($class$Monad(pure($instance_462)))(a_467 => f_468 => {
  if(a_467.$tag==1){
    return Nothing_2
  } else if(a_467.$tag==0){
    return f_468(a_467.$0)
  } else error("pattern match fail in //compiler/prelude.jg at line 86, column 15",a_467)
});
const $instance_475 = $class$Functor(f_471 => e_472 => {
  if(e_472.$tag==0){
    return Left_8(e_472.$0)
  } else if(e_472.$tag==1){
    return Right_9(f_471(e_472.$0))
  } else error("pattern match fail in //compiler/prelude.jg at line 119, column 14",e_472)
});
const $instance_482 = $class$Functor(f_476 => $pat_477 => State_10(s_479 => {
  const $phi$19 = $pat_477.$0(s_479);
  return (Pair_3($phi$19.$0))(f_476($phi$19.$1))
}));
const $instance_494 = ($class$Applicative(a_483 => State_10(s_484 => (Pair_3(s_484))(a_483))))($pat_485 => $pat_487 => State_10(s_489 => {
  const $phi$23 = $pat_485.$0(s_489);
  const $phi$25 = $pat_487.$0($phi$23.$0);
  return (Pair_3($phi$25.$0))($phi$23.$1($phi$25.$1))
}));
const $instance_502 = ($class$Monad(pure($instance_494)))($pat_495 => f_497 => State_10(s_498 => {
  const $phi$28 = $pat_495.$0(s_498);
  const $phi$30 = f_497($phi$28.$1);
  return $phi$30.$0($phi$28.$0)
}));
const $instance_504 = $class$Hashable(n_503 => n_503);
const $instance_506 = $class$Hashable(s_505 => strHashCode(s_505));
const $instance_510 = $class$Functor(f_507 => $pat_508 => Identity_15(f_507($pat_508.$0)));
const $instance_515 = ($class$Applicative(x_511 => Identity_15(x_511)))($pat_512 => x_514 => ((fmap($instance_510))($pat_512.$0))(x_514));
const $instance_519 = ($class$Monad(pure($instance_515)))($pat_516 => f_518 => f_518($pat_516.$0));
const head_46 = getIx(0);
const last_48 = l_228 => (getIx((length(l_228))-1))(l_228);
const tail_47 = slice(1);
const dedup_53 = local$instance$Eq$0 => xs_237 => {
  const f_238 = local$instance$Eq$1 => xs_239 => x_240 => {
    const $phi$35 = (($eq$eq(local$instance$Eq$1))(last_48(xs_239)))(x_240);
    if($phi$35){
      return xs_239
    } else if(!$phi$35){
      return (push(x_240))(xs_239)
    } else error("pattern match fail in //compiler/prelude.jg at line 226, column 12",$phi$35)
  };
  const $phi$37 = length(xs_237);
  if(0==$phi$37){
    return xs_237
  } else if(1==$phi$37){
    return xs_237
  } else return ((foldl(f_238(local$instance$Eq$0)))([head_46(xs_237)]))(tail_47(xs_237))
};
const justOr_24 = d_142 => m_143 => {
  if(m_143.$tag==0){
    return m_143.$0
  } else if(m_143.$tag==1){
    return d_142
  } else error("pattern match fail in //compiler/prelude.jg at line 94, column 14",m_143)
};
const all_38 = f_204 => xs_205 => ((foldl(r_206 => x_207 => (f_204(x_207))&&r_206))(true))(xs_205);
const foldTrie_70 = f_351 => a_352 => t_353 => {
  if(t_353.$tag==0){
    return a_352
  } else if(t_353.$tag==1){
    return ((f_351(a_352))(t_353.$0))(t_353.$1)
  } else if(t_353.$tag==2){
    return ((foldl(a_357 => $pat_358 => ((f_351(a_357))($pat_358.$0))($pat_358.$1)))(a_352))(t_353.$0)
  } else if(t_353.$tag==3){
    return ((foldl(foldTrie_70(f_351)))(a_352))(t_353.$1)
  } else error("pattern match fail in //compiler/prelude.jg at line 371, column 18",t_353)
};
const setToArray_84 = (foldTrie_70(vs_408 => v_409 => __410 => (push(v_409))(vs_408)))([]);
const foldM_56 = local$instance$Monad$0 => f_251 => r_252 => xs_253 => ((foldl(r_254 => x_255 => (($gt$gt$eq(local$instance$Monad$0))(r_254))(r_256 => (f_251(r_256))(x_255))))((ret(local$instance$Monad$0))(r_252)))(xs_253);
const mapM_57 = local$instance$Monad$0 => f_257 => xs_258 => (((foldM_56(local$instance$Monad$0))(xs_259 => x_260 => (($gt$gt$eq(local$instance$Monad$0))(f_257(x_260)))(x_261 => (ret(local$instance$Monad$0))((push(x_261))(xs_259)))))([]))(xs_258);
const $_16 = f_125 => a_126 => f_125(a_126);
const mapTrie_71 = f_363 => t_364 => {
  if(t_364.$tag==0){
    return Empty_11
  } else if(t_364.$tag==1){
    return (Leaf_12(t_364.$0))((f_363(t_364.$0))(t_364.$1))
  } else if(t_364.$tag==2){
    return ($_16(Collision_13))((map($pat_368 => (Pair_3($pat_368.$0))((f_363($pat_368.$0))($pat_368.$1))))(t_364.$0))
  } else if(t_364.$tag==3){
    return ($_16(BitmapIndexed_14(t_364.$0)))((map(mapTrie_71(f_363)))(t_364.$1))
  } else error("pattern match fail in //compiler/prelude.jg at line 377, column 15",t_364)
};
const $gt$gt_21 = local$instance$Monad$0 => a_135 => b_136 => (($gt$gt$eq(local$instance$Monad$0))(a_135))(__137 => b_136);
const not_31 = b_169 => {
  if(b_169){
    return false
  } else if(!b_169){
    return true
  } else error("pattern match fail in //compiler/prelude.jg at line 132, column 9",b_169)
};
const $div$eq_17 = local$instance$Eq$0 => a_127 => b_128 => not_31((($eq$eq(local$instance$Eq$0))(a_127))(b_128));
const mapIx_35 = f_193 => ix_194 => xs_195 => ((setIx(ix_194))(f_193((getIx(ix_194))(xs_195))))(xs_195);
const hamtMask_64 = depth_278 => hash_279 => {
  const h_280 = (hash_279>>>(depth_278*5))&31;
  return 1<<h_280
};
const popCount_63 = n_272 => {
  const n2_273 = n_272-((n_272>>>1)&1431655765);
  const n3_274 = (n2_273&858993459)+((n2_273>>>2)&858993459);
  const n4_275 = (n3_274+(n3_274>>>4))&252645135;
  const n5_276 = n4_275+(n4_275>>>8);
  const n6_277 = n5_276+(n5_276>>>16);
  return n6_277&127
};
const hamtIndex_65 = bitmap_281 => mask_282 => popCount_63(bitmap_281&(mask_282-1));
const insert_67 = local$instance$Eq$1 => local$instance$Hashable$0 => k_297 => v_298 => t_299 => {
  const hash_300 = (hashCode(local$instance$Hashable$0))(k_297);
  const f_301 = depth_302 => t_303 => {
    if(t_303.$tag==0){
      return (Leaf_12(k_297))(v_298)
    } else if(t_303.$tag==2){
      return Collision_13((push((Pair_3(k_297))(v_298)))((filter($pat_305 => (($div$eq_17(local$instance$Eq$1))($pat_305.$0))(k_297)))(t_303.$0)))
    } else if(t_303.$tag==1){
      const $phi$48 = (($eq$eq(local$instance$Eq$1))(k_297))(t_303.$0);
      if($phi$48){
        return (Leaf_12(k_297))(v_298)
      } else if(!$phi$48){
        if(7==depth_302){
          return Collision_13([(Pair_3(t_303.$0))(t_303.$1),(Pair_3(k_297))(v_298)])
        } else {
          const m_311 = (hamtMask_64(depth_302))((hashCode(local$instance$Hashable$0))(t_303.$0));
          return (f_301(depth_302))((BitmapIndexed_14(m_311))([(Leaf_12(t_303.$0))(t_303.$1)]))
        }
      } else error("pattern match fail in //compiler/prelude.jg at line 320, column 19",$phi$48)
    } else if(t_303.$tag==3){
      const m_314 = (hamtMask_64(depth_302))(hash_300);
      const bitmap2_315 = m_314|t_303.$0;
      const ix_316 = (hamtIndex_65(bitmap2_315))(m_314);
      const $phi$46 = m_314&t_303.$0;
      if(0==$phi$46){
        return (BitmapIndexed_14(bitmap2_315))(((arrIns(ix_316))((Leaf_12(k_297))(v_298)))(t_303.$1))
      } else return (BitmapIndexed_14(bitmap2_315))(((mapIx_35(f_301(depth_302+1)))(ix_316))(t_303.$1))
    } else error("pattern match fail in //compiler/prelude.jg at line 317, column 15",t_303)
  };
  return (f_301(0))(t_299)
};
const setAdd_79 = local$instance$Eq$1 => local$instance$Hashable$0 => a_400 => s_401 => ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(a_400))(Unit_0))(s_401);
const $gt$eq_20 = local$instance$Ord$0 => a_133 => b_134 => not_31((($lt(local$instance$Ord$0))(a_133))(b_134));
const mergeSet_50 = local$instance$Eq$1 => local$instance$Ord$0 => xs_230 => ys_231 => {
  const $phi$52 = length(xs_230);
  if(0==$phi$52){
    return ys_231
  } else {
    const $phi$54 = length(ys_231);
    if(0==$phi$54){
      return xs_230
    } else {
      const $phi$56 = (($lt(local$instance$Ord$0))(head_46(xs_230)))(head_46(ys_231));
      if($phi$56){
        return (enqueue(head_46(xs_230)))((((mergeSet_50(local$instance$Eq$1))(local$instance$Ord$0))(tail_47(xs_230)))(ys_231))
      } else if(!$phi$56){
        const $phi$58 = (($eq$eq(local$instance$Eq$1))(head_46(xs_230)))(head_46(ys_231));
        if($phi$58){
          return (enqueue(head_46(xs_230)))((((mergeSet_50(local$instance$Eq$1))(local$instance$Ord$0))(tail_47(xs_230)))(tail_47(ys_231)))
        } else if(!$phi$58){
          return (enqueue(head_46(ys_231)))((((mergeSet_50(local$instance$Eq$1))(local$instance$Ord$0))(xs_230))(tail_47(ys_231)))
        } else error("pattern match fail in //compiler/prelude.jg at line 213, column 16",$phi$58)
      } else error("pattern match fail in //compiler/prelude.jg at line 211, column 11",$phi$56)
    }
  }
};
const forM_58 = local$instance$Monad$0 => xs_262 => f_263 => ((mapM_57(local$instance$Monad$0))(f_263))(xs_262);
const either_29 = f_155 => g_156 => e_157 => {
  if(e_157.$tag==0){
    return f_155(e_157.$0)
  } else if(e_157.$tag==1){
    return g_156(e_157.$0)
  } else error("pattern match fail in //compiler/prelude.jg at line 123, column 20",e_157)
};
const splitEither_30 = a_160 => (Pair_3((map(e_161 => {
  if(e_161.$tag==0){
    return e_161.$0
  } else error("pattern match fail in //compiler/prelude.jg at line 129, column 15",e_161)
}))((filter((either_29(__163 => true))(__164 => false)))(a_160))))((map(e_165 => {
  if(e_165.$tag==1){
    return e_165.$0
  } else error("pattern match fail in //compiler/prelude.jg at line 130, column 15",e_165)
}))((filter((either_29(__167 => false))(__168 => true)))(a_160)));
const trieKeys_75 = m_386 => ((foldTrie_70(ks_387 => k_388 => __389 => (push(k_388))(ks_387)))([]))(m_386);
const zip_43 = xs_218 => ys_219 => {
  const $phi$63 = ((($eq$eq($instance_446))(length(xs_218)))(0))||((($eq$eq($instance_446))(length(ys_219)))(0));
  if($phi$63){
    return []
  } else if(!$phi$63){
    return (enqueue((Pair_3(head_46(xs_218)))(head_46(ys_219))))((zip_43(tail_47(xs_218)))(tail_47(ys_219)))
  } else error("pattern match fail in //compiler/prelude.jg at line 190, column 13",$phi$63)
};
const snd_28 = p_152 => p_152.$1;
const debug2_87 = p_422 => x_423 => snd_28((Pair_3(debug(p_422)))(x_423));
const debugIf_88 = p_424 => m_425 => x_426 => {
  if(!p_424){
    return x_426
  } else if(p_424){
    return (debug2_87(m_425))(x_426)
  } else error("pattern match fail in //compiler/prelude.jg at line 416, column 17",p_424)
};
const join_39 = xs_208 => s_209 => {
  const $phi$67 = length(xs_208);
  if(0==$phi$67){
    return ""
  } else return (foldl1(a_211 => b_212 => (a_211+s_209)+b_212))(xs_208)
};
const isJust_26 = m_147 => {
  if(m_147.$tag==0){
    return true
  } else if(m_147.$tag==1){
    return false
  } else error("pattern match fail in //compiler/prelude.jg at line 102, column 12",m_147)
};
const uniq_51 = local$instance$Eq$0 => xs_234 => {
  const $phi$70 = (($lt($instance_448))(length(xs_234)))(2);
  if($phi$70){
    return xs_234
  } else if(!$phi$70){
    const $phi$72 = (($eq$eq(local$instance$Eq$0))((getIx(0))(xs_234)))((getIx(1))(xs_234));
    if(!$phi$72){
      return (enqueue(head_46(xs_234)))((uniq_51(local$instance$Eq$0))(tail_47(xs_234)))
    } else if($phi$72){
      return (uniq_51(local$instance$Eq$0))(tail_47(xs_234))
    } else error("pattern match fail in //compiler/prelude.jg at line 219, column 12",$phi$72)
  } else error("pattern match fail in //compiler/prelude.jg at line 217, column 11",$phi$70)
};
const mapFst_92 = f_436 => $pat_437 => (Pair_3(f_436($pat_437.$0)))($pat_437.$1);
const reverse_52 = (foldl(xs_235 => x_236 => (enqueue(x_236))(xs_235)))([]);
const mergeTrie_74 = local$instance$Eq$1 => local$instance$Hashable$0 => a_381 => b_382 => ((foldTrie_70(a_383 => k_384 => v_385 => ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(k_384))(v_385))(a_383)))(a_381))(b_382);
const setUnion_83 = local$instance$Eq$1 => local$instance$Hashable$0 => (mergeTrie_74(local$instance$Eq$1))(local$instance$Hashable$0);
const size_72 = t_373 => {
  if(t_373.$tag==0){
    return 0
  } else if(t_373.$tag==1){
    return 1
  } else if(t_373.$tag==2){
    return length(t_373.$0)
  } else if(t_373.$tag==3){
    return ((foldl($add))(0))((map(size_72))(t_373.$1))
  } else error("pattern match fail in //compiler/prelude.jg at line 383, column 10",t_373)
};
const containsChar_36 = x_196 => xs_197 => {
  const f_198 = i_199 => {
    const $phi$76 = (($lt($instance_448))(i_199))(length(xs_197));
    if(!$phi$76){
      return false
    } else if($phi$76){
      const $phi$78 = (($eq$eq($instance_447))((getChar(i_199))(xs_197)))(x_196);
      if($phi$78){
        return true
      } else if(!$phi$78){
        return f_198(i_199+1)
      } else error("pattern match fail in //compiler/prelude.jg at line 168, column 13",$phi$78)
    } else error("pattern match fail in //compiler/prelude.jg at line 166, column 9",$phi$76)
  };
  return f_198(0)
};
const debugWrap_90 = tag_430 => f_431 => {
  const x_432 = f_431(Unit_0);
  return ($_16(debug2_87("** start: "+tag_430)))((debug2_87("** stop: "+tag_430))(x_432))
};
const $gt$eq$gt_91 = local$instance$Monad$0 => a_433 => b_434 => x_435 => (($gt$gt$eq(local$instance$Monad$0))(a_433(x_435)))(b_434);
const fromJust_25 = m_145 => {
  if(m_145.$tag==0){
    return m_145.$0
  } else if(m_145.$tag==1){
    return error("expected Just but got Nothing")
  } else error("pattern match fail in //compiler/prelude.jg at line 98, column 14",m_145)
};
const repeat_40 = s_213 => n_214 => {
  const $phi$81 = (($lt($instance_448))(n_214))(1);
  if($phi$81){
    return ""
  } else if(!$phi$81){
    return s_213+((repeat_40(s_213))(n_214-1))
  } else error("pattern match fail in //compiler/prelude.jg at line 180, column 14",$phi$81)
};
const isEmpty_73 = t_379 => {
  if(t_379.$tag==0){
    return true
  } else return false
};
const mapSnd_93 = f_440 => $pat_441 => (Pair_3($pat_441.$0))(f_440($pat_441.$1));
const contains_33 = local$instance$Eq$0 => x_185 => xs_186 => {
  const f_187 = i_188 => {
    const $phi$85 = (($lt($instance_448))(i_188))(length(xs_186));
    if(!$phi$85){
      return false
    } else if($phi$85){
      const $phi$87 = (($eq$eq(local$instance$Eq$0))(x_185))((getIx(i_188))(xs_186));
      if($phi$87){
        return true
      } else if(!$phi$87){
        return f_187(i_188+1)
      } else error("pattern match fail in //compiler/prelude.jg at line 150, column 13",$phi$87)
    } else error("pattern match fail in //compiler/prelude.jg at line 148, column 9",$phi$85)
  };
  return f_187(0)
};
const mapJust_45 = f_222 => xs_223 => {
  const g_224 = r_225 => x_226 => {
    const $phi$89 = f_222(x_226);
    if($phi$89.$tag==1){
      return r_225
    } else if($phi$89.$tag==0){
      return (push($phi$89.$0))(r_225)
    } else error("pattern match fail in //compiler/prelude.jg at line 197, column 11",$phi$89)
  };
  return ((foldl(g_224))([]))(xs_223)
};
const emptySet_78 = Empty_11;
const maybe_23 = a_138 => b_139 => m_140 => {
  if(m_140.$tag==0){
    return a_138(m_140.$0)
  } else if(m_140.$tag==1){
    return b_139
  } else error("pattern match fail in //compiler/prelude.jg at line 90, column 19",m_140)
};
const fst_27 = p_149 => p_149.$0;
const find_34 = predicate_189 => xs_190 => {
  const f_191 = i_192 => {
    const $phi$93 = (($lt($instance_448))(i_192))(length(xs_190));
    if(!$phi$93){
      return Nothing_2
    } else if($phi$93){
      const $phi$95 = predicate_189((getIx(i_192))(xs_190));
      if($phi$95){
        return Just_1((getIx(i_192))(xs_190))
      } else if(!$phi$95){
        return f_191(i_192+1)
      } else error("pattern match fail in //compiler/prelude.jg at line 158, column 13",$phi$95)
    } else error("pattern match fail in //compiler/prelude.jg at line 156, column 9",$phi$93)
  };
  return f_191(0)
};
const lookup_66 = local$instance$Eq$1 => local$instance$Hashable$0 => k_283 => t_284 => {
  const hash_285 = (hashCode(local$instance$Hashable$0))(k_283);
  const f_286 = depth_287 => t_288 => {
    if(t_288.$tag==0){
      return Nothing_2
    } else if(t_288.$tag==1){
      const $phi$100 = (($eq$eq(local$instance$Eq$1))(k_283))(t_288.$0);
      if(!$phi$100){
        return Nothing_2
      } else if($phi$100){
        return Just_1(t_288.$1)
      } else error("pattern match fail in //compiler/prelude.jg at line 304, column 18",$phi$100)
    } else if(t_288.$tag==2){
      return ($_16((fmap($instance_457))(snd_28)))((find_34(e_292 => (($eq$eq(local$instance$Eq$1))(fst_27(e_292)))(k_283)))(t_288.$0))
    } else if(t_288.$tag==3){
      const m_295 = (hamtMask_64(depth_287))(hash_285);
      const $phi$98 = m_295&t_288.$0;
      if(0==$phi$98){
        return Nothing_2
      } else return (f_286(depth_287+1))((getIx((hamtIndex_65(t_288.$0))(m_295)))(t_288.$1))
    } else error("pattern match fail in //compiler/prelude.jg at line 302, column 15",t_288)
  };
  return (f_286(0))(t_284)
};
const updateOrSet_68 = local$instance$Eq$1 => local$instance$Hashable$0 => k_318 => f_319 => d_320 => m_321 => {
  const $phi$102 = (((lookup_66(local$instance$Eq$1))(local$instance$Hashable$0))(k_318))(m_321);
  if($phi$102.$tag==1){
    return ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(k_318))(d_320))(m_321)
  } else if($phi$102.$tag==0){
    return ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(k_318))(f_319($phi$102.$0)))(m_321)
  } else error("pattern match fail in //compiler/prelude.jg at line 336, column 23",$phi$102)
};
const insertAll_77 = local$instance$Eq$1 => local$instance$Hashable$0 => es_394 => m_395 => ((foldl(m_396 => $pat_397 => ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))($pat_397.$0))($pat_397.$1))(m_396)))(m_395))(es_394);
const debugMaybe_89 = m_427 => x_428 => {
  if(m_427.$tag==1){
    return x_428
  } else if(m_427.$tag==0){
    return (debug2_87(m_427.$0))(x_428)
  } else error("pattern match fail in //compiler/prelude.jg at line 420, column 18",m_427)
};
const mconcat_22 = local$instance$Monoid$1 => local$instance$Semigroup$0 => (foldl($lt$gt(local$instance$Semigroup$0)))(mzero(local$instance$Monoid$1));
const concatMap_44 = local$instance$Monoid$1 => local$instance$Semigroup$0 => f_220 => a_221 => ((mconcat_22(local$instance$Monoid$1))(local$instance$Semigroup$0))((map(f_220))(a_221));
const remove_69 = local$instance$Eq$1 => local$instance$Hashable$0 => k_323 => t_324 => {
  const hash_325 = (hashCode(local$instance$Hashable$0))(k_323);
  const f_326 = depth_327 => t_328 => {
    if(t_328.$tag==0){
      return Empty_11
    } else if(t_328.$tag==1){
      const $phi$119 = (($eq$eq(local$instance$Eq$1))(t_328.$0))(k_323);
      if($phi$119){
        return Empty_11
      } else if(!$phi$119){
        return t_328
      } else error("pattern match fail in //compiler/prelude.jg at line 344, column 18",$phi$119)
    } else if(t_328.$tag==2){
      const entries2_332 = (filter($pat_333 => (($div$eq_17(local$instance$Eq$1))($pat_333.$0))(k_323)))(t_328.$0);
      const $phi$115 = length(entries2_332);
      if(0==$phi$115){
        return Empty_11
      } else if(1==$phi$115){
        const $phi$117 = (getIx(0))(entries2_332);
        return (Leaf_12($phi$117.$0))($phi$117.$1)
      } else return Collision_13(entries2_332)
    } else if(t_328.$tag==3){
      const m_341 = (hamtMask_64(depth_327))(hash_325);
      const ix_342 = (hamtIndex_65(t_328.$0))(m_341);
      const $phi$107 = m_341&t_328.$0;
      if(0==$phi$107){
        return t_328
      } else {
        const $phi$109 = (f_326(depth_327+1))((getIx(ix_342))(t_328.$1));
        if($phi$109.$tag==0){
          const bitmap2_344 = (bitNot(m_341))&t_328.$0;
          const $phi$111 = length(t_328.$1);
          if(1==$phi$111){
            return Empty_11
          } else if(2==$phi$111){
            const e_345 = (getIx(1&(bitNot(ix_342))))(t_328.$1);
            if(e_345.$tag==1){
              return e_345
            } else return (BitmapIndexed_14(bitmap2_344))([e_345])
          } else return (BitmapIndexed_14(bitmap2_344))(((arrDel(ix_342))(1))(t_328.$1))
        } else return (BitmapIndexed_14(t_328.$0))(((setIx(ix_342))($phi$109))(t_328.$1))
      }
    } else error("pattern match fail in //compiler/prelude.jg at line 342, column 15",t_328)
  };
  return (f_326(0))(t_324)
};
const setDiff_85 = local$instance$Eq$1 => local$instance$Hashable$0 => a_411 => b_412 => ((foldTrie_70(r_413 => k_414 => __415 => (((remove_69(local$instance$Eq$1))(local$instance$Hashable$0))(k_414))(r_413)))(a_411))(b_412);
const $gt_18 = local$instance$Ord$0 => a_129 => b_130 => (($lt(local$instance$Ord$0))(b_130))(a_129);
const setAddAll_80 = local$instance$Eq$1 => local$instance$Hashable$0 => vs_402 => s_403 => ((foldl(s_404 => v_405 => (((setAdd_79(local$instance$Eq$1))(local$instance$Hashable$0))(v_405))(s_404)))(s_403))(vs_402);
const sets_60 = s_265 => State_10(__266 => (Pair_3(s_265))(Unit_0));
const assert_94 = s_444 => b_445 => {
  if(b_445){
    return true
  } else if(!b_445){
    return error(s_444)
  } else error("pattern match fail in //compiler/prelude.jg at line 447, column 14",b_445)
};
const trieEntries_76 = m_390 => ((foldTrie_70(es_391 => k_392 => v_393 => (push((Pair_3(k_392))(v_393)))(es_391)))([]))(m_390);
const init_49 = l_229 => ((slice2(0))((length(l_229))-1))(l_229);
const setContains_82 = local$instance$Eq$1 => local$instance$Hashable$0 => a_406 => s_407 => isJust_26((((lookup_66(local$instance$Eq$1))(local$instance$Hashable$0))(a_406))(s_407));
const setIntersection_86 = local$instance$Eq$1 => local$instance$Hashable$0 => a_416 => b_417 => {
  const f_418 = r_419 => k_420 => __421 => {
    const $phi$122 = (((setContains_82(local$instance$Eq$1))(local$instance$Hashable$0))(k_420))(a_416);
    if(!$phi$122){
      return r_419
    } else if($phi$122){
      return (((setAdd_79(local$instance$Eq$1))(local$instance$Hashable$0))(k_420))(r_419)
    } else error("pattern match fail in //compiler/prelude.jg at line 409, column 13",$phi$122)
  };
  return ((foldTrie_70(f_418))(emptySet_78))(b_417)
};
const exists_37 = f_200 => xs_201 => ((foldl(r_202 => x_203 => (f_200(x_203))||r_202))(false))(xs_201);
const $lt$eq_19 = local$instance$Ord$0 => a_131 => b_132 => not_31((($lt(local$instance$Ord$0))(b_132))(a_131));
const loop_32 = f_170 => start_171 => {
  const next_173 = $pat_178 => {
    const $phi$125 = f_170($pat_178.$0);
    if($phi$125.$tag==0){
      return (Pair_3($phi$125.$0))(Nothing_2)
    } else if($phi$125.$tag==1){
      return (Pair_3($pat_178.$0))(Just_1($phi$125.$0))
    } else error("pattern match fail in //compiler/prelude.jg at line 141, column 17",$phi$125)
  };
  const shouldStop_172 = x_175 => {
    if(x_175.$1.$tag==1){
      return false
    } else return true
  };
  const result_174 = ((iterate((Pair_3(start_171))(Nothing_2)))(shouldStop_172))(next_173);
  if(result_174.$1.$tag==0){
    return result_174.$1.$0
  } else error("pattern match fail in //compiler/prelude.jg at line 145, column 6",result_174)
};
const strToArray_55 = s_246 => {
  const f_247 = $pat_248 => {
    const $phi$130 = (($lt($instance_448))($pat_248.$0))(length(s_246));
    if(!$phi$130){
      return Right_9($pat_248.$1)
    } else if($phi$130){
      return Left_8((Pair_3($pat_248.$0+1))((push((getChar($pat_248.$0))(s_246)))($pat_248.$1)))
    } else error("pattern match fail in //compiler/prelude.jg at line 237, column 14",$phi$130)
  };
  return (loop_32(f_247))((Pair_3(0))([]))
};
const gets_59 = State_10(s_264 => (Pair_3(s_264))(s_264));
const runState_61 = s_267 => m_268 => m_268.$0(s_267);
const evalState_62 = s_270 => m_271 => snd_28((runState_61(s_270))(m_271));
const setRemove_81 = local$instance$Eq$1 => local$instance$Hashable$0 => (remove_69(local$instance$Eq$1))(local$instance$Hashable$0);
const zipWithIndex2_41 = n_215 => xs_216 => {
  const $phi$133 = length(xs_216);
  if(0==$phi$133){
    return []
  } else return (enqueue((Pair_3(n_215))(head_46(xs_216))))((zipWithIndex2_41(n_215+1))(tail_47(xs_216)))
};
const zipWithIndex_42 = zipWithIndex2_41(0);
const toRecord_54 = (foldl(r_242 => $pat_243 => ((set($pat_243.$0))($pat_243.$1))(r_242)))(empty);
const head_520 = head_46;
const $gt$gt_521 = $gt$gt_21;
const size_522 = size_72;
const setContains_523 = setContains_82;
const uniq_524 = uniq_51;
const all_525 = all_38;
const mconcat_526 = mconcat_22;
const zip_527 = zip_43;
const $lt$eq_528 = $lt$eq_19;
const setAddAll_529 = setAddAll_80;
const BitmapIndexed_530 = BitmapIndexed_14;
const reverse_531 = reverse_52;
const isEmpty_532 = isEmpty_73;
const $_533 = $_16;
const remove_534 = remove_69;
const forM_535 = forM_58;
const Unit_536 = Unit_0;
const loop_537 = loop_32;
const either_538 = either_29;
const runState_539 = runState_61;
const assert_540 = assert_94;
const setRemove_541 = setRemove_81;
const zipWithIndex2_542 = zipWithIndex2_41;
const Left_543 = Left_8;
const fst_544 = fst_27;
const setDiff_545 = setDiff_85;
const insertAll_546 = insertAll_77;
const mapJust_547 = mapJust_45;
const maybe_548 = maybe_23;
const concatMap_549 = concatMap_44;
const snd_550 = snd_28;
const mergeSet_551 = mergeSet_50;
const join_552 = join_39;
const setIntersection_553 = setIntersection_86;
const zipWithIndex_554 = zipWithIndex_42;
const Tuple3_555 = Tuple3_4;
const mapFst_556 = mapFst_92;
const mapIx_557 = mapIx_35;
const foldM_558 = foldM_56;
const Just_559 = Just_1;
const Tuple4_560 = Tuple4_5;
const toRecord_561 = toRecord_54;
const hamtMask_562 = hamtMask_64;
const Empty_563 = Empty_11;
const strToArray_564 = strToArray_55;
const Tuple5_565 = Tuple5_6;
const mapSnd_566 = mapSnd_93;
const setUnion_567 = setUnion_83;
const Nothing_568 = Nothing_2;
const trieKeys_569 = trieKeys_75;
const Tuple6_570 = Tuple6_7;
const $div$eq_571 = $div$eq_17;
const justOr_572 = justOr_24;
const tail_573 = tail_47;
const init_574 = init_49;
const debugIf_575 = debugIf_88;
const sets_576 = sets_60;
const State_577 = State_10;
const mapM_578 = mapM_57;
const hamtIndex_579 = hamtIndex_65;
const mergeTrie_580 = mergeTrie_74;
const Collision_581 = Collision_13;
const not_582 = not_31;
const evalState_583 = evalState_62;
const debugMaybe_584 = debugMaybe_89;
const containsChar_585 = containsChar_36;
const emptySet_586 = emptySet_78;
const updateOrSet_587 = updateOrSet_68;
const isJust_588 = isJust_26;
const last_589 = last_48;
const trieEntries_590 = trieEntries_76;
const mapTrie_591 = mapTrie_71;
const fromJust_592 = fromJust_25;
const find_593 = find_34;
const insert_594 = insert_67;
const lookup_595 = lookup_66;
const Pair_596 = Pair_3;
const repeat_597 = repeat_40;
const foldTrie_598 = foldTrie_70;
const exists_599 = exists_37;
const setToArray_600 = setToArray_84;
const Right_601 = Right_9;
const debugWrap_602 = debugWrap_90;
const gets_603 = gets_59;
const $gt_604 = $gt_18;
const Identity_605 = Identity_15;
const popCount_606 = popCount_63;
const dedup_607 = dedup_53;
const Leaf_608 = Leaf_12;
const debug2_609 = debug2_87;
const $gt$eq$gt_610 = $gt$eq$gt_91;
const splitEither_611 = splitEither_30;
const setAdd_612 = setAdd_79;
const contains_613 = contains_33;
const $gt$eq_614 = $gt$eq_20;
const Ok_615 = $_0_628 => ({$0:$_0_628,$tag:0});
const Err_616 = $_0_629 => ({$0:$_0_629,$tag:1});
const $instance_672 = $class$Functor(f_668 => r_669 => {
  if(r_669.$tag==1){
    return Err_616(r_669.$0)
  } else if(r_669.$tag==0){
    return Ok_615(f_668(r_669.$0))
  } else error("pattern match fail in //compiler/result.jg at line 6, column 14",r_669)
});
const $instance_677 = ($class$Monad(Ok_615))(r_673 => f_674 => {
  if(r_673.$tag==1){
    return Err_616(r_673.$0)
  } else if(r_673.$tag==0){
    return f_674(r_673.$0)
  } else error("pattern match fail in //compiler/result.jg at line 12, column 15",r_673)
});
const mapErr_620 = f_636 => r_637 => {
  if(r_637.$tag==0){
    return Ok_615(r_637.$0)
  } else if(r_637.$tag==1){
    return Err_616(f_636(r_637.$0))
  } else error("pattern match fail in //compiler/result.jg at line 26, column 14",r_637)
};
const maybeErr_618 = r_633 => {
  if(r_633.$tag==0){
    return Nothing_568
  } else if(r_633.$tag==1){
    return Just_559(r_633.$0)
  } else error("pattern match fail in //compiler/result.jg at line 20, column 14",r_633)
};
const $gt$gt$eq$gt$gt_623 = local$instance$Monad$0 => m_644 => f_645 => (($gt$gt$eq(local$instance$Monad$0))(m_644))(r_646 => {
  if(r_646.$tag==1){
    return (ret(local$instance$Monad$0))(Err_616(r_646.$0))
  } else if(r_646.$tag==0){
    return f_645(r_646.$0)
  } else error("pattern match fail in //compiler/result.jg at line 36, column 27",r_646)
});
const $gt$gt$gt$gt_624 = local$instance$Monad$0 => m_649 => n_650 => (($gt$gt$eq$gt$gt_623(local$instance$Monad$0))(m_649))(__651 => n_650);
const mapOk_619 = local$instance$Functor$0 => fmap(local$instance$Functor$0);
const mapResult_627 = okF_663 => errF_664 => r_665 => {
  if(r_665.$tag==0){
    return okF_663(r_665.$0)
  } else if(r_665.$tag==1){
    return errF_664(r_665.$0)
  } else error("pattern match fail in //compiler/result.jg at line 45, column 24",r_665)
};
const isOk_621 = r_640 => {
  if(r_640.$tag==0){
    return true
  } else return false
};
const isErr_622 = r_643 => not_582(isOk_621(r_643));
const foldOkM_625 = local$instance$Monad$0 => f_652 => r_653 => xs_654 => ((foldl(r_655 => x_656 => (($gt$gt$eq$gt$gt_623(local$instance$Monad$0))(r_655))(r_657 => (f_652(r_657))(x_656))))(($_533(ret(local$instance$Monad$0)))(Ok_615(r_653))))(xs_654);
const mapOkM_626 = local$instance$Monad$0 => f_658 => xs_659 => (((foldOkM_625(local$instance$Monad$0))(rs_660 => x_661 => (($gt$gt$eq$gt$gt_623(local$instance$Monad$0))(f_658(x_661)))(r_662 => (ret(local$instance$Monad$0))(($_533(Ok_615))((push(r_662))(rs_660))))))([]))(xs_659);
const maybeOk_617 = r_630 => {
  if(r_630.$tag==0){
    return Just_559(r_630.$0)
  } else return Nothing_568
};
const head_678 = head_46;
const $gt$gt_679 = $gt$gt_21;
const size_680 = size_72;
const setContains_681 = setContains_82;
const uniq_682 = uniq_51;
const all_683 = all_38;
const mconcat_684 = mconcat_22;
const zip_685 = zip_43;
const $lt$eq_686 = $lt$eq_19;
const setAddAll_687 = setAddAll_80;
const BitmapIndexed_688 = BitmapIndexed_14;
const reverse_689 = reverse_52;
const isEmpty_690 = isEmpty_73;
const $_691 = $_16;
const remove_692 = remove_69;
const forM_693 = forM_58;
const Unit_694 = Unit_0;
const loop_695 = loop_32;
const either_696 = either_29;
const runState_697 = runState_61;
const assert_698 = assert_94;
const setRemove_699 = setRemove_81;
const zipWithIndex2_700 = zipWithIndex2_41;
const Left_701 = Left_8;
const fst_702 = fst_27;
const setDiff_703 = setDiff_85;
const insertAll_704 = insertAll_77;
const mapJust_705 = mapJust_45;
const maybe_706 = maybe_23;
const concatMap_707 = concatMap_44;
const snd_708 = snd_28;
const mergeSet_709 = mergeSet_50;
const join_710 = join_39;
const setIntersection_711 = setIntersection_86;
const zipWithIndex_712 = zipWithIndex_42;
const Tuple3_713 = Tuple3_4;
const mapFst_714 = mapFst_92;
const mapIx_715 = mapIx_35;
const foldM_716 = foldM_56;
const Just_717 = Just_1;
const Tuple4_718 = Tuple4_5;
const toRecord_719 = toRecord_54;
const hamtMask_720 = hamtMask_64;
const Empty_721 = Empty_11;
const strToArray_722 = strToArray_55;
const Tuple5_723 = Tuple5_6;
const mapSnd_724 = mapSnd_93;
const setUnion_725 = setUnion_83;
const Nothing_726 = Nothing_2;
const trieKeys_727 = trieKeys_75;
const Tuple6_728 = Tuple6_7;
const $div$eq_729 = $div$eq_17;
const justOr_730 = justOr_24;
const tail_731 = tail_47;
const init_732 = init_49;
const debugIf_733 = debugIf_88;
const sets_734 = sets_60;
const State_735 = State_10;
const mapM_736 = mapM_57;
const hamtIndex_737 = hamtIndex_65;
const mergeTrie_738 = mergeTrie_74;
const Collision_739 = Collision_13;
const not_740 = not_31;
const evalState_741 = evalState_62;
const debugMaybe_742 = debugMaybe_89;
const containsChar_743 = containsChar_36;
const emptySet_744 = emptySet_78;
const updateOrSet_745 = updateOrSet_68;
const isJust_746 = isJust_26;
const last_747 = last_48;
const trieEntries_748 = trieEntries_76;
const mapTrie_749 = mapTrie_71;
const fromJust_750 = fromJust_25;
const find_751 = find_34;
const insert_752 = insert_67;
const lookup_753 = lookup_66;
const Pair_754 = Pair_3;
const repeat_755 = repeat_40;
const foldTrie_756 = foldTrie_70;
const exists_757 = exists_37;
const setToArray_758 = setToArray_84;
const Right_759 = Right_9;
const debugWrap_760 = debugWrap_90;
const gets_761 = gets_59;
const $gt_762 = $gt_18;
const Identity_763 = Identity_15;
const popCount_764 = popCount_63;
const dedup_765 = dedup_53;
const Leaf_766 = Leaf_12;
const debug2_767 = debug2_87;
const $gt$eq$gt_768 = $gt$eq$gt_91;
const splitEither_769 = splitEither_30;
const setAdd_770 = setAdd_79;
const contains_771 = contains_33;
const $gt$eq_772 = $gt$eq_20;
const AnnType_773 = $_0_847 => ({$0:$_0_847,$tag:0});
const AnnCodeLoc_774 = $_0_848 => $_1_849 => $_2_850 => ({$0:$_0_848,$1:$_1_849,$2:$_2_850,$tag:1});
const AnnUseCount_775 = $_0_851 => ({$0:$_0_851,$tag:2});
const AnnData_776 = $_0_852 => ({$0:$_0_852,$tag:3});
const AnnTag_777 = {$tag:4};
const AnnExport_778 = $_0_853 => ({$0:$_0_853,$tag:5});
const Var_779 = $_0_854 => $_1_855 => ({$0:$_0_854,$1:$_1_855,$tag:0});
const Const_780 = $_0_856 => $_1_857 => ({$0:$_0_856,$1:$_1_857,$tag:1});
const App_781 = $_0_858 => $_1_859 => $_2_860 => ({$0:$_0_858,$1:$_1_859,$2:$_2_860,$tag:2});
const Lam_782 = $_0_861 => $_1_862 => $_2_863 => ({$0:$_0_861,$1:$_1_862,$2:$_2_863,$tag:3});
const Case_783 = $_0_864 => $_1_865 => $_2_866 => ({$0:$_0_864,$1:$_1_865,$2:$_2_866,$tag:4});
const Let_784 = $_0_867 => $_1_868 => $_2_869 => ({$0:$_0_867,$1:$_1_868,$2:$_2_869,$tag:5});
const New_785 = $_0_870 => $_1_871 => $_2_872 => ({$0:$_0_870,$1:$_1_871,$2:$_2_872,$tag:6});
const CNum_786 = $_0_873 => ({$0:$_0_873,$tag:0});
const CStr_787 = $_0_874 => ({$0:$_0_874,$tag:1});
const PVar_788 = $_0_875 => $_1_876 => ({$0:$_0_875,$1:$_1_876,$tag:0});
const PConst_789 = $_0_877 => $_1_878 => ({$0:$_0_877,$1:$_1_878,$tag:1});
const PData_790 = $_0_879 => $_1_880 => $_2_881 => ({$0:$_0_879,$1:$_1_880,$2:$_2_881,$tag:2});
const Module_791 = $_0_882 => $_1_883 => $_2_884 => $_3_885 => $_4_886 => $_5_887 => $_6_888 => ({$0:$_0_882,$1:$_1_883,$2:$_2_884,$3:$_3_885,$4:$_4_886,$5:$_5_887,$6:$_6_888});
const ModuleInterface_792 = $_0_889 => $_1_890 => $_2_891 => ({$0:$_0_889,$1:$_1_890,$2:$_2_891});
const Data_793 = $_0_892 => $_1_893 => $_2_894 => $_3_895 => ({$0:$_0_892,$1:$_1_893,$2:$_2_894,$3:$_3_895});
const DataCon_794 = $_0_896 => $_1_897 => $_2_898 => ({$0:$_0_896,$1:$_1_897,$2:$_2_898});
const Class_795 = $_0_899 => $_1_900 => $_2_901 => $_3_902 => ({$0:$_0_899,$1:$_1_900,$2:$_2_901,$3:$_3_902});
const Instance_796 = $_0_903 => $_1_904 => $_2_905 => $_3_906 => ({$0:$_0_903,$1:$_1_904,$2:$_2_905,$3:$_3_906});
const Inst_797 = $_0_907 => $_1_908 => ({$0:$_0_907,$1:$_1_908});
const TCBound_798 = $_0_909 => $_1_910 => $_2_911 => ({$0:$_0_909,$1:$_1_910,$2:$_2_911});
const TConst_799 = $_0_912 => $_1_913 => ({$0:$_0_912,$1:$_1_913,$tag:0});
const TVar_800 = $_0_914 => $_1_915 => ({$0:$_0_914,$1:$_1_915,$tag:1});
const TSkolem_801 = $_0_916 => $_1_917 => ({$0:$_0_916,$1:$_1_917,$tag:2});
const TApp_802 = $_0_918 => $_1_919 => $_2_920 => ({$0:$_0_918,$1:$_1_919,$2:$_2_920,$tag:3});
const TRow_803 = $_0_921 => $_1_922 => $_2_923 => ({$0:$_0_921,$1:$_1_922,$2:$_2_923,$tag:4});
const TBot_804 = {$tag:5};
const TForall_805 = $_0_924 => $_1_925 => $_2_926 => $_3_927 => ({$0:$_0_924,$1:$_1_925,$2:$_2_926,$3:$_3_927,$tag:6});
const TUnknown_806 = {$tag:7};
const ImportClosed_807 = $_0_928 => $_1_929 => $_2_930 => ({$0:$_0_928,$1:$_1_929,$2:$_2_930,$tag:0});
const ImportOpen_808 = $_0_931 => $_1_932 => $_2_933 => ({$0:$_0_931,$1:$_1_932,$2:$_2_933,$tag:1});
const ImportAll_809 = $_0_934 => $_1_935 => ({$0:$_0_934,$1:$_1_935,$tag:2});
const $instance_1303 = $class$Eq(a_1301 => b_1302 => (equivBound_823(a_1301))(b_1302));
const $instance_1306 = $class$Eq(a_1304 => b_1305 => (equivType_828(a_1304))(b_1305));
const compareOrd_824 = local$instance$Eq$1 => local$instance$Ord$0 => a_982 => b_983 => {
  const $phi$144 = (($eq$eq(local$instance$Eq$1))(a_982))(b_983);
  if($phi$144){
    return 0
  } else if(!$phi$144){
    const $phi$146 = (($lt(local$instance$Ord$0))(a_982))(b_983);
    if($phi$146){
      return 0-1
    } else if(!$phi$146){
      return 1
    } else error("pattern match fail in //compiler/ast.jg at line 114, column 12",$phi$146)
  } else error("pattern match fail in //compiler/ast.jg at line 112, column 18",$phi$144)
};
const compareBound_827 = compareT_1056 => $pat_1057 => $pat_1061 => {
  const $phi$150 = (((compareOrd_824($instance_447))($instance_449))($pat_1057.$1))($pat_1061.$1);
  if(0==$phi$150){
    return (compareT_1056($pat_1057.$2))($pat_1061.$2)
  } else return $phi$150
};
const compareArr_825 = f_984 => xs_985 => ys_986 => {
  const diffs_987 = ($_691(filter(($div$eq_729($instance_446))(0))))((map($pat_988 => (f_984($pat_988.$0))($pat_988.$1)))((zip_685(xs_985))(ys_986)));
  const $phi$153 = length(diffs_987);
  if(0==$phi$153){
    return (length(xs_985))-(length(ys_986))
  } else return head_678(diffs_987)
};
const compareType_826 = compareS_992 => a_993 => b_994 => {
  const cmp_995 = compareType_826(compareS_992);
  const $phi$155 = (Pair_754(a_993))(b_994);
  if(($phi$155.$0.$tag==0)&&($phi$155.$1.$tag==0)){
    return (((compareOrd_824($instance_447))($instance_449))($phi$155.$0.$1))($phi$155.$1.$1)
  } else if($phi$155.$0.$tag==0){
    return 0-1
  } else if($phi$155.$1.$tag==0){
    return 1
  } else if(($phi$155.$0.$tag==1)&&($phi$155.$1.$tag==1)){
    return (((compareOrd_824($instance_447))($instance_449))($phi$155.$0.$1))($phi$155.$1.$1)
  } else if($phi$155.$0.$tag==1){
    return 0-1
  } else if($phi$155.$1.$tag==1){
    return 1
  } else if(($phi$155.$0.$tag==2)&&($phi$155.$1.$tag==2)){
    return (compareS_992($phi$155.$0.$1))($phi$155.$1.$1)
  } else if($phi$155.$0.$tag==2){
    return 0-1
  } else if($phi$155.$1.$tag==2){
    return 1
  } else if(($phi$155.$0.$tag==3)&&($phi$155.$1.$tag==3)){
    const $phi$161 = (cmp_995($phi$155.$0.$1))($phi$155.$1.$1);
    if(0==$phi$161){
      return (cmp_995($phi$155.$0.$2))($phi$155.$1.$2)
    } else return $phi$161
  } else if($phi$155.$0.$tag==3){
    return 0-1
  } else if($phi$155.$1.$tag==3){
    return 1
  } else if(($phi$155.$0.$tag==5)&&($phi$155.$1.$tag==5)){
    return 0
  } else if($phi$155.$0.$tag==5){
    return 0-1
  } else if($phi$155.$1.$tag==5){
    return 1
  } else if(($phi$155.$0.$tag==7)&&($phi$155.$1.$tag==7)){
    return 0
  } else if($phi$155.$0.$tag==7){
    return 0-1
  } else if($phi$155.$1.$tag==7){
    return 1
  } else if(($phi$155.$0.$tag==6)&&($phi$155.$1.$tag==6)){
    const $phi$157 = (cmp_995($phi$155.$0.$3))($phi$155.$1.$3);
    if(0==$phi$157){
      const $phi$159 = ((compareArr_825((compareOrd_824($instance_447))($instance_449)))($phi$155.$0.$1))($phi$155.$1.$1);
      if(0==$phi$159){
        return ((compareArr_825(compareBound_827(cmp_995)))($phi$155.$0.$2))($phi$155.$1.$2)
      } else return $phi$159
    } else return $phi$157
  } else return error("unsupported type in compareType")
};
const getAnn_811 = local$instance$Eq$1 => local$instance$Hashable$0 => name_936 => ann_937 => (((lookup_753(local$instance$Eq$1))(local$instance$Hashable$0))(name_936))(ann_937);
const getAnnType_816 = ann_951 => {
  const $phi$163 = (((getAnn_811($instance_447))($instance_506))("type"))(ann_951);
  if(($phi$163.$tag==0)&&($phi$163.$0.$tag==0)){
    return $phi$163.$0.$0
  } else if($phi$163.$tag==1){
    return TUnknown_806
  } else error("pattern match fail in //compiler/ast.jg at line 23, column 18",$phi$163)
};
const getPatType_835 = p_1180 => {
  if(p_1180.$tag==0){
    return getAnnType_816(p_1180.$0)
  } else if(p_1180.$tag==1){
    return getAnnType_816(p_1180.$0)
  } else if(p_1180.$tag==2){
    return getAnnType_816(p_1180.$0)
  } else error("pattern match fail in //compiler/ast.jg at line 228, column 16",p_1180)
};
const annOf_832 = e_1138 => {
  if(e_1138.$tag==0){
    return e_1138.$0
  } else if(e_1138.$tag==1){
    return e_1138.$0
  } else if(e_1138.$tag==2){
    return e_1138.$0
  } else if(e_1138.$tag==3){
    return e_1138.$0
  } else if(e_1138.$tag==4){
    return e_1138.$0
  } else if(e_1138.$tag==5){
    return e_1138.$0
  } else if(e_1138.$tag==6){
    return e_1138.$0
  } else error("pattern match fail in //compiler/ast.jg at line 208, column 11",e_1138)
};
const getAnnE_814 = name_947 => e_948 => (((getAnn_811($instance_447))($instance_506))(name_947))(annOf_832(e_948));
const hasAnnE_815 = name_949 => e_950 => isJust_746((getAnnE_814(name_949))(e_950));
const breakableDownAndUp_837 = down_1197 => up_1198 => a_1199 => e_1200 => {
  const go_1201 = (breakableDownAndUp_837(down_1197))(up_1198);
  const gos_1202 = a_1203 => (foldl(ar_1204 => p_1205 => {
    const $phi$167 = (go_1201(fst_702(ar_1204)))(snd_708(p_1205));
    return (Pair_754($phi$167.$0))((push((Pair_754(fst_702(p_1205)))($phi$167.$1)))(snd_708(ar_1204)))
  }))((Pair_754(a_1203))([]));
  const $phi$169 = (down_1197(a_1199))(e_1200);
  if($phi$169.$tag==1){
    return $phi$169.$0
  } else if($phi$169.$tag==0){
    let $phi$170;
    if($phi$169.$0.$1.$tag==3){
      let $phi$188;
      const $phi$189 = (go_1201($phi$169.$0.$0))($phi$169.$0.$1.$2);
      $phi$188 = ((Pair_754($phi$189.$0))(((Lam_782($phi$169.$0.$1.$0))($phi$169.$0.$1.$1))($phi$189.$1)));
      $phi$170 = $phi$188
    } else if($phi$169.$0.$1.$tag==2){
      let $phi$184;
      const $phi$185 = (go_1201($phi$169.$0.$0))($phi$169.$0.$1.$1);
      let $phi$186;
      const $phi$187 = (go_1201($phi$185.$0))($phi$169.$0.$1.$2);
      $phi$186 = ((Pair_754($phi$187.$0))(((App_781($phi$169.$0.$1.$0))($phi$185.$1))($phi$187.$1)));
      $phi$184 = $phi$186;
      $phi$170 = $phi$184
    } else if($phi$169.$0.$1.$tag==4){
      let $phi$180;
      const $phi$181 = (go_1201($phi$169.$0.$0))($phi$169.$0.$1.$1);
      let $phi$182;
      const $phi$183 = (gos_1202($phi$181.$0))($phi$169.$0.$1.$2);
      $phi$182 = ((Pair_754($phi$183.$0))(((Case_783($phi$169.$0.$1.$0))($phi$181.$1))($phi$183.$1)));
      $phi$180 = $phi$182;
      $phi$170 = $phi$180
    } else if($phi$169.$0.$1.$tag==5){
      let $phi$176;
      const $phi$177 = (gos_1202($phi$169.$0.$0))($phi$169.$0.$1.$1);
      let $phi$178;
      const $phi$179 = (go_1201($phi$177.$0))($phi$169.$0.$1.$2);
      $phi$178 = ((Pair_754($phi$179.$0))(((Let_784($phi$169.$0.$1.$0))($phi$177.$1))($phi$179.$1)));
      $phi$176 = $phi$178;
      $phi$170 = $phi$176
    } else if($phi$169.$0.$1.$tag==6){
      const f_1241 = aes_1242 => e_1243 => {
        const $phi$173 = (go_1201(aes_1242.$0))(e_1243);
        return (Pair_754($phi$173.$0))((push($phi$173.$1))(aes_1242.$1))
      };
      let $phi$174;
      const $phi$175 = ((foldl(f_1241))((Pair_754(a_1199))([])))($phi$169.$0.$1.$2);
      $phi$174 = ((Pair_754($phi$175.$0))(((New_785($phi$169.$0.$1.$0))($phi$169.$0.$1.$1))($phi$175.$1)));
      $phi$170 = $phi$174
    } else $phi$170 = ((Pair_754($phi$169.$0.$0))($phi$169.$0.$1));
    const ae_1211 = $phi$170;
    return (up_1198(ae_1211.$0))(ae_1211.$1)
  } else error("pattern match fail in //compiler/ast.jg at line 241, column 6",$phi$169)
};
const downAndUp_838 = down_1253 => up_1254 => (breakableDownAndUp_837(a_1255 => e_1256 => Left_701((down_1253(a_1255))(e_1256))))(up_1254);
const up_839 = downAndUp_838(Pair_754);
const equivBound_823 = a_974 => b_975 => ((($eq$eq($instance_447))(a_974.$1))(b_975.$1))&&((equivType_828(a_974.$2))(b_975.$2));
const equivType_828 = a_1066 => b_1067 => {
  if(a_1066.$tag==0){
    if(b_1067.$tag==0){
      return (($eq$eq($instance_447))(a_1066.$1))(b_1067.$1)
    } else return false
  } else if(a_1066.$tag==1){
    if(b_1067.$tag==1){
      return (($eq$eq($instance_447))(a_1066.$1))(b_1067.$1)
    } else return false
  } else if(a_1066.$tag==2){
    if(b_1067.$tag==2){
      return (($eq$eq($instance_447))(a_1066.$1))(b_1067.$1)
    } else return false
  } else if(a_1066.$tag==3){
    if(b_1067.$tag==3){
      return ((equivType_828(a_1066.$1))(b_1067.$1))&&((equivType_828(a_1066.$2))(b_1067.$2))
    } else return false
  } else if(a_1066.$tag==5){
    if(b_1067.$tag==5){
      return true
    } else return false
  } else if(a_1066.$tag==7){
    if(b_1067.$tag==7){
      return true
    } else return false
  } else if(a_1066.$tag==4){
    return error("no support for TRow in equivType yet")
  } else if(a_1066.$tag==6){
    if(b_1067.$tag==6){
      const rvs_1103 = (all_683(p_1105 => (($eq$eq($instance_447))(fst_702(p_1105)))(snd_708(p_1105))))((zip_685(a_1066.$1))(b_1067.$1));
      const rbs_1104 = (all_683(p_1106 => (equivBound_823(fst_702(p_1106)))(snd_708(p_1106))))((zip_685(a_1066.$2))(b_1067.$2));
      return (rvs_1103&&rbs_1104)&&((equivType_828(a_1066.$3))(b_1067.$3))
    } else return false
  } else error("pattern match fail in //compiler/ast.jg at line 158, column 17",a_1066)
};
const down_840 = f_1257 => (downAndUp_838(f_1257))(Pair_754);
const setAnn_812 = local$instance$Eq$1 => local$instance$Hashable$0 => name_938 => val_939 => ann_940 => ((((insert_752(local$instance$Eq$1))(local$instance$Hashable$0))(name_938))(val_939))(ann_940);
const setAnnType_817 = t_953 => ann_954 => ((((setAnn_812($instance_447))($instance_506))("type"))(AnnType_773(t_953)))(ann_954);
const setPatType_836 = t_1188 => p_1189 => {
  if(p_1189.$tag==0){
    return (PVar_788((setAnnType_817(t_1188))(p_1189.$0)))(p_1189.$1)
  } else if(p_1189.$tag==1){
    return (PConst_789((setAnnType_817(t_1188))(p_1189.$0)))(p_1189.$1)
  } else if(p_1189.$tag==2){
    return ((PData_790((setAnnType_817(t_1188))(p_1189.$0)))(p_1189.$1))(p_1189.$2)
  } else error("pattern match fail in //compiler/ast.jg at line 233, column 18",p_1189)
};
const setAnnCodeLoc_819 = file_956 => line_957 => col_958 => ann_959 => ((((setAnn_812($instance_447))($instance_506))("codeLoc"))(((AnnCodeLoc_774(file_956))(line_957))(col_958)))(ann_959);
const withAnn_833 = ann_1158 => e_1159 => {
  if(e_1159.$tag==0){
    return (Var_779(ann_1158))(e_1159.$1)
  } else if(e_1159.$tag==1){
    return (Const_780(ann_1158))(e_1159.$1)
  } else if(e_1159.$tag==2){
    return ((App_781(ann_1158))(e_1159.$1))(e_1159.$2)
  } else if(e_1159.$tag==3){
    return ((Lam_782(ann_1158))(e_1159.$1))(e_1159.$2)
  } else if(e_1159.$tag==4){
    return ((Case_783(ann_1158))(e_1159.$1))(e_1159.$2)
  } else if(e_1159.$tag==5){
    return ((Let_784(ann_1158))(e_1159.$1))(e_1159.$2)
  } else if(e_1159.$tag==6){
    return ((New_785(ann_1158))(e_1159.$1))(e_1159.$2)
  } else error("pattern match fail in //compiler/ast.jg at line 217, column 17",e_1159)
};
const setType_831 = t_1117 => e_1118 => {
  if(e_1118.$tag==0){
    return (Var_779((setAnnType_817(t_1117))(e_1118.$0)))(e_1118.$1)
  } else if(e_1118.$tag==1){
    return (Const_780((setAnnType_817(t_1117))(e_1118.$0)))(e_1118.$1)
  } else if(e_1118.$tag==2){
    return ((App_781((setAnnType_817(t_1117))(e_1118.$0)))(e_1118.$1))(e_1118.$2)
  } else if(e_1118.$tag==3){
    return ((Lam_782((setAnnType_817(t_1117))(e_1118.$0)))(e_1118.$1))(e_1118.$2)
  } else if(e_1118.$tag==4){
    return ((Case_783((setAnnType_817(t_1117))(e_1118.$0)))(e_1118.$1))(e_1118.$2)
  } else if(e_1118.$tag==5){
    return ((Let_784((setAnnType_817(t_1117))(e_1118.$0)))(e_1118.$1))(e_1118.$2)
  } else if(e_1118.$tag==6){
    return ((New_785((setAnnType_817(t_1117))(e_1118.$0)))(e_1118.$1))(e_1118.$2)
  } else error("pattern match fail in //compiler/ast.jg at line 199, column 15",e_1118)
};
const breakableDown_841 = f_1258 => (breakableDownAndUp_837(f_1258))(Pair_754);
const namesInPat_822 = p_966 => {
  if(p_966.$tag==0){
    return [p_966.$1]
  } else if(p_966.$tag==1){
    return []
  } else if(p_966.$tag==2){
    return ((foldl((mergeSet_709($instance_447))($instance_449)))([]))((map(namesInPat_822))(p_966.$2))
  } else error("pattern match fail in //compiler/ast.jg at line 56, column 16",p_966)
};
const breakableDownAndUpM_842 = local$instance$Monad$0 => down_1259 => up_1260 => e_1261 => {
  const go_1262 = ((breakableDownAndUpM_842(local$instance$Monad$0))(down_1259))(up_1260);
  const gos_1263 = (mapM_736(local$instance$Monad$0))(d_1264 => (($gt$gt$eq(local$instance$Monad$0))(go_1262(d_1264.$1)))(e_1267 => (ret(local$instance$Monad$0))((Pair_754(d_1264.$0))(e_1267))));
  return (($gt$gt$eq(local$instance$Monad$0))(down_1259(e_1261)))(e_1268 => {
    if(e_1268.$tag==1){
      return (ret(local$instance$Monad$0))(e_1268.$0)
    } else if(e_1268.$tag==0){
      if(e_1268.$0.$tag==3){
        return (($gt$gt$eq(local$instance$Monad$0))(go_1262(e_1268.$0.$2)))(e_1274 => up_1260(((Lam_782(e_1268.$0.$0))(e_1268.$0.$1))(e_1274)))
      } else if(e_1268.$0.$tag==2){
        return (($gt$gt$eq(local$instance$Monad$0))(go_1262(e_1268.$0.$1)))(f_1278 => (($gt$gt$eq(local$instance$Monad$0))(go_1262(e_1268.$0.$2)))(x_1279 => up_1260(((App_781(e_1268.$0.$0))(f_1278))(x_1279))))
      } else if(e_1268.$0.$tag==4){
        return (($gt$gt$eq(local$instance$Monad$0))(go_1262(e_1268.$0.$1)))(e_1283 => (($gt$gt$eq(local$instance$Monad$0))(gos_1263(e_1268.$0.$2)))(ps_1284 => up_1260(((Case_783(e_1268.$0.$0))(e_1283))(ps_1284))))
      } else if(e_1268.$0.$tag==5){
        return (($gt$gt$eq(local$instance$Monad$0))(gos_1263(e_1268.$0.$1)))(bs_1288 => (($gt$gt$eq(local$instance$Monad$0))(go_1262(e_1268.$0.$2)))(e_1289 => up_1260(((Let_784(e_1268.$0.$0))(bs_1288))(e_1289))))
      } else if(e_1268.$0.$tag==6){
        return (($gt$gt$eq(local$instance$Monad$0))(((mapM_736(local$instance$Monad$0))(go_1262))(e_1268.$0.$2)))(es_1293 => up_1260(((New_785(e_1268.$0.$0))(e_1268.$0.$1))(es_1293)))
      } else return up_1260(e_1268.$0)
    } else error("pattern match fail in //compiler/ast.jg at line 275, column 23",e_1268)
  })
};
const breakableDownM_846 = local$instance$Monad$0 => f_1300 => ((breakableDownAndUpM_842(local$instance$Monad$0))(f_1300))(ret(local$instance$Monad$0));
const emptyAnn_810 = Empty_721;
const downAndUpM_843 = local$instance$Monad$0 => down_1295 => up_1296 => ((breakableDownAndUpM_842(local$instance$Monad$0))(e_1297 => (($gt$gt$eq(local$instance$Monad$0))(down_1295(e_1297)))(e_1298 => (ret(local$instance$Monad$0))(Left_701(e_1298)))))(up_1296);
const upM_844 = local$instance$Monad$0 => (downAndUpM_843(local$instance$Monad$0))(ret(local$instance$Monad$0));
const getType_834 = e_1179 => ($_691(getAnnType_816))(annOf_832(e_1179));
const copyAnn_813 = local$instance$Eq$1 => local$instance$Hashable$0 => names_941 => ann_942 => {
  const f_943 = r_944 => n_945 => {
    const $phi$209 = (((getAnn_811(local$instance$Eq$1))(local$instance$Hashable$0))(n_945))(ann_942);
    if($phi$209.$tag==1){
      return r_944
    } else if($phi$209.$tag==0){
      return ((((setAnn_812(local$instance$Eq$1))(local$instance$Hashable$0))(n_945))($phi$209.$0))(r_944)
    } else error("pattern match fail in //compiler/ast.jg at line 15, column 11",$phi$209)
  };
  return ((foldl(f_943))(Empty_721))(names_941)
};
const dataConName_829 = dc_1108 => dc_1108.$1;
const dataConNames_830 = d_1112 => (map(dataConName_829))(d_1112.$3);
const downM_845 = local$instance$Monad$0 => f_1299 => ((downAndUpM_843(local$instance$Monad$0))(f_1299))(ret(local$instance$Monad$0));
const printCodeLoc_820 = l_960 => {
  if(l_960.$tag==1){
    return (((("in "+l_960.$0)+" at line ")+(intToString(l_960.$1+1)))+", column ")+(intToString(l_960.$2+1))
  } else error("pattern match fail in //compiler/ast.jg at line 30, column 18",l_960)
};
const getAnnCodeLoc_818 = ann_955 => (((getAnn_811($instance_447))($instance_506))("codeLoc"))(ann_955);
const exprLoc_821 = e_964 => {
  const $phi$214 = ($_691(getAnnCodeLoc_818))(annOf_832(e_964));
  if($phi$214.$tag==1){
    return "in unknown location"
  } else if($phi$214.$tag==0){
    return printCodeLoc_820($phi$214.$0)
  } else error("pattern match fail in //compiler/ast.jg at line 34, column 13",$phi$214)
};
const head_1307 = head_46;
const $gt$gt_1308 = $gt$gt_21;
const size_1309 = size_72;
const setContains_1310 = setContains_82;
const uniq_1311 = uniq_51;
const all_1312 = all_38;
const mconcat_1313 = mconcat_22;
const zip_1314 = zip_43;
const $lt$eq_1315 = $lt$eq_19;
const setAddAll_1316 = setAddAll_80;
const BitmapIndexed_1317 = BitmapIndexed_14;
const reverse_1318 = reverse_52;
const isEmpty_1319 = isEmpty_73;
const $_1320 = $_16;
const remove_1321 = remove_69;
const forM_1322 = forM_58;
const Unit_1323 = Unit_0;
const loop_1324 = loop_32;
const either_1325 = either_29;
const runState_1326 = runState_61;
const assert_1327 = assert_94;
const setRemove_1328 = setRemove_81;
const zipWithIndex2_1329 = zipWithIndex2_41;
const Left_1330 = Left_8;
const fst_1331 = fst_27;
const setDiff_1332 = setDiff_85;
const insertAll_1333 = insertAll_77;
const mapJust_1334 = mapJust_45;
const maybe_1335 = maybe_23;
const concatMap_1336 = concatMap_44;
const snd_1337 = snd_28;
const mergeSet_1338 = mergeSet_50;
const join_1339 = join_39;
const setIntersection_1340 = setIntersection_86;
const zipWithIndex_1341 = zipWithIndex_42;
const Tuple3_1342 = Tuple3_4;
const mapFst_1343 = mapFst_92;
const mapIx_1344 = mapIx_35;
const foldM_1345 = foldM_56;
const Just_1346 = Just_1;
const Tuple4_1347 = Tuple4_5;
const toRecord_1348 = toRecord_54;
const hamtMask_1349 = hamtMask_64;
const Empty_1350 = Empty_11;
const strToArray_1351 = strToArray_55;
const Tuple5_1352 = Tuple5_6;
const mapSnd_1353 = mapSnd_93;
const setUnion_1354 = setUnion_83;
const Nothing_1355 = Nothing_2;
const trieKeys_1356 = trieKeys_75;
const Tuple6_1357 = Tuple6_7;
const $div$eq_1358 = $div$eq_17;
const justOr_1359 = justOr_24;
const tail_1360 = tail_47;
const init_1361 = init_49;
const debugIf_1362 = debugIf_88;
const sets_1363 = sets_60;
const State_1364 = State_10;
const mapM_1365 = mapM_57;
const hamtIndex_1366 = hamtIndex_65;
const mergeTrie_1367 = mergeTrie_74;
const Collision_1368 = Collision_13;
const not_1369 = not_31;
const evalState_1370 = evalState_62;
const debugMaybe_1371 = debugMaybe_89;
const containsChar_1372 = containsChar_36;
const emptySet_1373 = emptySet_78;
const updateOrSet_1374 = updateOrSet_68;
const isJust_1375 = isJust_26;
const last_1376 = last_48;
const trieEntries_1377 = trieEntries_76;
const mapTrie_1378 = mapTrie_71;
const fromJust_1379 = fromJust_25;
const find_1380 = find_34;
const insert_1381 = insert_67;
const lookup_1382 = lookup_66;
const Pair_1383 = Pair_3;
const repeat_1384 = repeat_40;
const foldTrie_1385 = foldTrie_70;
const exists_1386 = exists_37;
const setToArray_1387 = setToArray_84;
const Right_1388 = Right_9;
const debugWrap_1389 = debugWrap_90;
const gets_1390 = gets_59;
const $gt_1391 = $gt_18;
const Identity_1392 = Identity_15;
const popCount_1393 = popCount_63;
const dedup_1394 = dedup_53;
const Leaf_1395 = Leaf_12;
const debug2_1396 = debug2_87;
const $gt$eq$gt_1397 = $gt$eq$gt_91;
const splitEither_1398 = splitEither_30;
const setAdd_1399 = setAdd_79;
const contains_1400 = contains_33;
const $gt$eq_1401 = $gt$eq_20;
const New_1402 = New_785;
const App_1403 = App_781;
const down_1404 = down_840;
const dataConName_1405 = dataConName_829;
const CNum_1406 = CNum_786;
const Const_1407 = Const_780;
const getAnnType_1408 = getAnnType_816;
const TRow_1409 = TRow_803;
const Inst_1410 = Inst_797;
const printCodeLoc_1411 = printCodeLoc_820;
const getPatType_1412 = getPatType_835;
const Var_1413 = Var_779;
const getAnnCodeLoc_1414 = getAnnCodeLoc_818;
const equivBound_1415 = equivBound_823;
const AnnUseCount_1416 = AnnUseCount_775;
const Data_1417 = Data_793;
const AnnData_1418 = AnnData_776;
const exprLoc_1419 = exprLoc_821;
const getAnn_1420 = getAnn_811;
const downM_1421 = downM_845;
const TForall_1422 = TForall_805;
const copyAnn_1423 = copyAnn_813;
const Module_1424 = Module_791;
const ModuleInterface_1425 = ModuleInterface_792;
const TApp_1426 = TApp_802;
const CStr_1427 = CStr_787;
const TCBound_1428 = TCBound_798;
const TConst_1429 = TConst_799;
const ImportOpen_1430 = ImportOpen_808;
const equivType_1431 = equivType_828;
const dataConNames_1432 = dataConNames_830;
const downAndUp_1433 = downAndUp_838;
const Case_1434 = Case_783;
const getType_1435 = getType_834;
const ImportClosed_1436 = ImportClosed_807;
const TSkolem_1437 = TSkolem_801;
const breakableDownM_1438 = breakableDownM_846;
const upM_1439 = upM_844;
const AnnCodeLoc_1440 = AnnCodeLoc_774;
const TBot_1441 = TBot_804;
const PConst_1442 = PConst_789;
const TVar_1443 = TVar_800;
const emptyAnn_1444 = emptyAnn_810;
const setAnnCodeLoc_1445 = setAnnCodeLoc_819;
const Instance_1446 = Instance_796;
const AnnExport_1447 = AnnExport_778;
const TUnknown_1448 = TUnknown_806;
const breakableDownAndUpM_1449 = breakableDownAndUpM_842;
const namesInPat_1450 = namesInPat_822;
const breakableDownAndUp_1451 = breakableDownAndUp_837;
const PVar_1452 = PVar_788;
const DataCon_1453 = DataCon_794;
const Class_1454 = Class_795;
const Lam_1455 = Lam_782;
const annOf_1456 = annOf_832;
const setAnnType_1457 = setAnnType_817;
const AnnTag_1458 = AnnTag_777;
const compareBound_1459 = compareBound_827;
const PData_1460 = PData_790;
const getAnnE_1461 = getAnnE_814;
const AnnType_1462 = AnnType_773;
const Let_1463 = Let_784;
const up_1464 = up_839;
const breakableDown_1465 = breakableDown_841;
const withAnn_1466 = withAnn_833;
const setPatType_1467 = setPatType_836;
const setType_1468 = setType_831;
const compareArr_1469 = compareArr_825;
const ImportAll_1470 = ImportAll_809;
const compareOrd_1471 = compareOrd_824;
const downAndUpM_1472 = downAndUpM_843;
const hasAnnE_1473 = hasAnnE_815;
const compareType_1474 = compareType_826;
const setAnn_1475 = setAnn_812;
const printType_1476 = t_1483 => {
  const printParen_1484 = t_1488 => ("("+(printType_1476(t_1488)))+")";
  const printTypeInFun_1485 = t_1489 => {
    if((t_1489.$tag==3)&&((t_1489.$1.$tag==3)&&((t_1489.$1.$1.$tag==0)&&("->"==t_1489.$1.$1.$1)))){
      return printParen_1484(t_1489)
    } else if(t_1489.$tag==6){
      return printParen_1484(t_1489)
    } else return printType_1476(t_1489)
  };
  const printFirstTypeInApp_1486 = t_1500 => {
    if((t_1500.$tag==3)&&((t_1500.$1.$tag==3)&&((t_1500.$1.$1.$tag==0)&&("->"==t_1500.$1.$1.$1)))){
      return printParen_1484(t_1500)
    } else if(t_1500.$tag==6){
      return printParen_1484(t_1500)
    } else return printType_1476(t_1500)
  };
  const printSecondTypeInApp_1487 = t_1511 => {
    if(t_1511.$tag==3){
      return printParen_1484(t_1511)
    } else if(t_1511.$tag==6){
      return printParen_1484(t_1511)
    } else return printType_1476(t_1511)
  };
  if(t_1483.$tag==0){
    return t_1483.$1
  } else if(t_1483.$tag==1){
    return t_1483.$1
  } else if(t_1483.$tag==2){
    return "~"+t_1483.$1
  } else if(t_1483.$tag==5){
    return "~bottom~"
  } else if(t_1483.$tag==7){
    return "?"
  } else if((t_1483.$tag==3)&&((t_1483.$1.$tag==3)&&((t_1483.$1.$1.$tag==0)&&("->"==t_1483.$1.$1.$1)))){
    return ((printTypeInFun_1485(t_1483.$1.$2))+" -> ")+(printType_1476(t_1483.$2))
  } else if(t_1483.$tag==3){
    return ((printFirstTypeInApp_1486(t_1483.$1))+" ")+(printSecondTypeInApp_1487(t_1483.$2))
  } else if(t_1483.$tag==6){
    let $phi$220;
    const $phi$221 = length(t_1483.$2);
    if(0==$phi$221){
      $phi$220 = ""
    } else $phi$220 = (" with "+((intercalate(", "))((map(printTypeBound_1477))(t_1483.$2))));
    const bounds_1538 = $phi$220;
    return ((("forall "+((intercalate(", "))(t_1483.$1)))+bounds_1538)+". ")+(printType_1476(t_1483.$3))
  } else if((t_1483.$tag==4)&&(t_1483.$2.$tag==1)){
    const f_1542 = $pat_1544 => ((printType_1476($pat_1544.$0))+" : ")+(printType_1476($pat_1544.$1));
    const pkvs_1543 = (map(f_1542))(t_1483.$1);
    return ("{"+((intercalate(", "))(pkvs_1543)))+"}"
  } else return error("cannot print "+(jsonStringify(t_1483)))
};
const printTypeBound_1477 = b_1548 => (((b_1548.$1+" ")+"(")+(printType_1476(b_1548.$2)))+")";
const printInst_1482 = $pat_1614 => (("forall "+((join_1339($pat_1614.$0))(" ")))+". ")+(printTypeBound_1477($pat_1614.$1));
const indent_1480 = map(l_1611 => "  "+l_1611);
const printExprTyped_1478 = typed_1552 => e_1553 => {
  const printT_1560 = e_1604 => {
    const t_1605 = getType_1435(e_1604);
    return printType_1476(t_1605)
  };
  const printPat_1558 = p_1572 => {
    if(p_1572.$tag==0){
      return p_1572.$1
    } else if((p_1572.$tag==1)&&(p_1572.$1.$tag==0)){
      return jsonStringify(p_1572.$1.$0)
    } else if((p_1572.$tag==1)&&(p_1572.$1.$tag==1)){
      return jsonStringify(p_1572.$1.$0)
    } else if(p_1572.$tag==2){
      return ((p_1572.$1+" (")+((join_1339((map(printPat_1558))(p_1572.$2)))(") (")))+")"
    } else error("pattern match fail in //compiler/printer.jg at line 54, column 18",p_1572)
  };
  const sameLine_1555 = xs_1564 => ys_1565 => (concat(init_1361(xs_1564)))((enqueue((last_1376(xs_1564))+(head_1307(ys_1565))))(tail_1360(ys_1565)));
  const sameLine3_1556 = a_1566 => b_1567 => c_1568 => (sameLine_1555(a_1566))((sameLine_1555(b_1567))(c_1568));
  const printParen_1554 = e_1563 => ((sameLine3_1556(["("]))(printExpr_1561(e_1563)))([")"]);
  const printCasePat_1557 = cp_1569 => (enqueue((printPat_1558(cp_1569.$0))+" ->"))(indent_1480(printExpr_1561(cp_1569.$1)));
  const printE_1559 = e_1582 => {
    if(e_1582.$tag==0){
      return [e_1582.$1]
    } else if((e_1582.$tag==1)&&(e_1582.$1.$tag==0)){
      return [jsonStringify(e_1582.$1.$0)]
    } else if((e_1582.$tag==1)&&(e_1582.$1.$tag==1)){
      return [jsonStringify(e_1582.$1.$0)]
    } else if(e_1582.$tag==2){
      return ((sameLine3_1556(printParen_1554(e_1582.$1)))([" "]))(printParen_1554(e_1582.$2))
    } else if(e_1582.$tag==3){
      return (enqueue(("\\"+e_1582.$1)+" ->"))(indent_1480(printExpr_1561(e_1582.$2)))
    } else if(e_1582.$tag==4){
      return (concat(((sameLine3_1556(["case "]))(printParen_1554(e_1582.$1)))([" of"])))(indent_1480((((concatMap_1336($instance_452))($instance_450))(printCasePat_1557))(e_1582.$2)))
    } else if(e_1582.$tag==5){
      return (concat((push("in"))((enqueue("let"))(indent_1480((((concatMap_1336($instance_452))($instance_450))(printDef_1479(typed_1552)))(e_1582.$1))))))(indent_1480(printExpr_1561(e_1582.$2)))
    } else if(e_1582.$tag==6){
      return (push(e_1582.$1))(indent_1480((((concatMap_1336($instance_452))($instance_450))(printExprTyped_1478(typed_1552)))(e_1582.$2)))
    } else error("pattern match fail in //compiler/printer.jg at line 59, column 16",e_1582)
  };
  const printExpr_1561 = e_1606 => {
    if(!typed_1552){
      return printE_1559(e_1606)
    } else if(typed_1552){
      return ((sameLine3_1556(["("]))(printE_1559(e_1606)))([(" :: "+(printT_1560(e_1606)))+" )"])
    } else error("pattern match fail in //compiler/printer.jg at line 84, column 19",typed_1552)
  };
  const pe_1562 = printE_1559(e_1553);
  return printExpr_1561(e_1553)
};
const printDef_1479 = typed_1607 => d_1608 => (enqueue(d_1608.$0+" ="))(indent_1480((printExprTyped_1478(typed_1607))(d_1608.$1)));
const reallyPrintExpr_1481 = typed_1612 => e_1613 => (join_1339((printExprTyped_1478(typed_1612))(e_1613)))("\n");
const head_1617 = head_46;
const $gt$gt_1618 = $gt$gt_21;
const size_1619 = size_72;
const setContains_1620 = setContains_82;
const uniq_1621 = uniq_51;
const all_1622 = all_38;
const mconcat_1623 = mconcat_22;
const zip_1624 = zip_43;
const $lt$eq_1625 = $lt$eq_19;
const setAddAll_1626 = setAddAll_80;
const BitmapIndexed_1627 = BitmapIndexed_14;
const reverse_1628 = reverse_52;
const isEmpty_1629 = isEmpty_73;
const $_1630 = $_16;
const remove_1631 = remove_69;
const forM_1632 = forM_58;
const Unit_1633 = Unit_0;
const loop_1634 = loop_32;
const either_1635 = either_29;
const runState_1636 = runState_61;
const assert_1637 = assert_94;
const setRemove_1638 = setRemove_81;
const zipWithIndex2_1639 = zipWithIndex2_41;
const Left_1640 = Left_8;
const fst_1641 = fst_27;
const setDiff_1642 = setDiff_85;
const insertAll_1643 = insertAll_77;
const mapJust_1644 = mapJust_45;
const maybe_1645 = maybe_23;
const concatMap_1646 = concatMap_44;
const snd_1647 = snd_28;
const mergeSet_1648 = mergeSet_50;
const join_1649 = join_39;
const setIntersection_1650 = setIntersection_86;
const zipWithIndex_1651 = zipWithIndex_42;
const Tuple3_1652 = Tuple3_4;
const mapFst_1653 = mapFst_92;
const mapIx_1654 = mapIx_35;
const foldM_1655 = foldM_56;
const Just_1656 = Just_1;
const Tuple4_1657 = Tuple4_5;
const toRecord_1658 = toRecord_54;
const hamtMask_1659 = hamtMask_64;
const Empty_1660 = Empty_11;
const strToArray_1661 = strToArray_55;
const Tuple5_1662 = Tuple5_6;
const mapSnd_1663 = mapSnd_93;
const setUnion_1664 = setUnion_83;
const Nothing_1665 = Nothing_2;
const trieKeys_1666 = trieKeys_75;
const Tuple6_1667 = Tuple6_7;
const $div$eq_1668 = $div$eq_17;
const justOr_1669 = justOr_24;
const tail_1670 = tail_47;
const init_1671 = init_49;
const debugIf_1672 = debugIf_88;
const sets_1673 = sets_60;
const State_1674 = State_10;
const mapM_1675 = mapM_57;
const hamtIndex_1676 = hamtIndex_65;
const mergeTrie_1677 = mergeTrie_74;
const Collision_1678 = Collision_13;
const not_1679 = not_31;
const evalState_1680 = evalState_62;
const debugMaybe_1681 = debugMaybe_89;
const containsChar_1682 = containsChar_36;
const emptySet_1683 = emptySet_78;
const updateOrSet_1684 = updateOrSet_68;
const isJust_1685 = isJust_26;
const last_1686 = last_48;
const trieEntries_1687 = trieEntries_76;
const mapTrie_1688 = mapTrie_71;
const fromJust_1689 = fromJust_25;
const find_1690 = find_34;
const insert_1691 = insert_67;
const lookup_1692 = lookup_66;
const Pair_1693 = Pair_3;
const repeat_1694 = repeat_40;
const foldTrie_1695 = foldTrie_70;
const exists_1696 = exists_37;
const setToArray_1697 = setToArray_84;
const Right_1698 = Right_9;
const debugWrap_1699 = debugWrap_90;
const gets_1700 = gets_59;
const $gt_1701 = $gt_18;
const Identity_1702 = Identity_15;
const popCount_1703 = popCount_63;
const dedup_1704 = dedup_53;
const Leaf_1705 = Leaf_12;
const debug2_1706 = debug2_87;
const $gt$eq$gt_1707 = $gt$eq$gt_91;
const splitEither_1708 = splitEither_30;
const setAdd_1709 = setAdd_79;
const contains_1710 = contains_33;
const $gt$eq_1711 = $gt$eq_20;
const New_1712 = New_785;
const App_1713 = App_781;
const down_1714 = down_840;
const dataConName_1715 = dataConName_829;
const CNum_1716 = CNum_786;
const Const_1717 = Const_780;
const getAnnType_1718 = getAnnType_816;
const TRow_1719 = TRow_803;
const Inst_1720 = Inst_797;
const printCodeLoc_1721 = printCodeLoc_820;
const getPatType_1722 = getPatType_835;
const Var_1723 = Var_779;
const getAnnCodeLoc_1724 = getAnnCodeLoc_818;
const equivBound_1725 = equivBound_823;
const AnnUseCount_1726 = AnnUseCount_775;
const Data_1727 = Data_793;
const AnnData_1728 = AnnData_776;
const exprLoc_1729 = exprLoc_821;
const getAnn_1730 = getAnn_811;
const downM_1731 = downM_845;
const TForall_1732 = TForall_805;
const copyAnn_1733 = copyAnn_813;
const Module_1734 = Module_791;
const ModuleInterface_1735 = ModuleInterface_792;
const TApp_1736 = TApp_802;
const CStr_1737 = CStr_787;
const TCBound_1738 = TCBound_798;
const TConst_1739 = TConst_799;
const ImportOpen_1740 = ImportOpen_808;
const equivType_1741 = equivType_828;
const dataConNames_1742 = dataConNames_830;
const downAndUp_1743 = downAndUp_838;
const Case_1744 = Case_783;
const getType_1745 = getType_834;
const ImportClosed_1746 = ImportClosed_807;
const TSkolem_1747 = TSkolem_801;
const breakableDownM_1748 = breakableDownM_846;
const upM_1749 = upM_844;
const AnnCodeLoc_1750 = AnnCodeLoc_774;
const TBot_1751 = TBot_804;
const PConst_1752 = PConst_789;
const TVar_1753 = TVar_800;
const emptyAnn_1754 = emptyAnn_810;
const setAnnCodeLoc_1755 = setAnnCodeLoc_819;
const Instance_1756 = Instance_796;
const AnnExport_1757 = AnnExport_778;
const TUnknown_1758 = TUnknown_806;
const breakableDownAndUpM_1759 = breakableDownAndUpM_842;
const namesInPat_1760 = namesInPat_822;
const breakableDownAndUp_1761 = breakableDownAndUp_837;
const PVar_1762 = PVar_788;
const DataCon_1763 = DataCon_794;
const Class_1764 = Class_795;
const Lam_1765 = Lam_782;
const annOf_1766 = annOf_832;
const setAnnType_1767 = setAnnType_817;
const AnnTag_1768 = AnnTag_777;
const compareBound_1769 = compareBound_827;
const PData_1770 = PData_790;
const getAnnE_1771 = getAnnE_814;
const AnnType_1772 = AnnType_773;
const Let_1773 = Let_784;
const up_1774 = up_839;
const breakableDown_1775 = breakableDown_841;
const withAnn_1776 = withAnn_833;
const setPatType_1777 = setPatType_836;
const setType_1778 = setType_831;
const compareArr_1779 = compareArr_825;
const ImportAll_1780 = ImportAll_809;
const compareOrd_1781 = compareOrd_824;
const downAndUpM_1782 = downAndUpM_843;
const hasAnnE_1783 = hasAnnE_815;
const compareType_1784 = compareType_826;
const setAnn_1785 = setAnn_812;
const printType_1786 = printType_1476;
const printTypeBound_1787 = printTypeBound_1477;
const ModuleCtx_1788 = $_0_1804 => ({$0:$_0_1804,$tag:0});
const BindingCtx_1789 = $_0_1805 => ({$0:$_0_1805,$tag:1});
const ExprCtx_1790 = $_0_1806 => ({$0:$_0_1806,$tag:2});
const UnifyCtx_1791 = $_0_1807 => $_1_1808 => ({$0:$_0_1807,$1:$_1_1808,$tag:3});
const UpdateCtx_1792 = $_0_1809 => $_1_1810 => ({$0:$_0_1809,$1:$_1_1810,$tag:4});
const PatCtx_1793 = $_0_1811 => ({$0:$_0_1811,$tag:5});
const MRGCtx_1794 = $_0_1812 => ({$0:$_0_1812,$tag:6});
const FinTypeCtx_1795 = $_0_1813 => ({$0:$_0_1813,$tag:7});
const TypeEquivCtx_1796 = $_0_1814 => $_1_1815 => ({$0:$_0_1814,$1:$_1_1815,$tag:8});
const TypeInstCtx_1797 = $_0_1816 => ({$0:$_0_1816,$tag:9});
const TypeBoundCtx_1798 = $_0_1817 => ({$0:$_0_1817,$tag:10});
const FinMRGCtx_1799 = $_0_1818 => ({$0:$_0_1818,$tag:11});
const resolveCtx_1803 = ctxsF_1837 => ctxsF_1837(Unit_1633);
const emptyCtx_1802 = $pat_1836 => [];
const printCtx_1800 = ctx_1819 => {
  if(ctx_1819.$tag==0){
    return [("in module <"+ctx_1819.$0)+">"]
  } else if(ctx_1819.$tag==1){
    return [("in binding of <"+ctx_1819.$0)+">"]
  } else if(ctx_1819.$tag==3){
    return [((("in unify <"+(printType_1786(ctx_1819.$0)))+"> and <")+(printType_1786(ctx_1819.$1)))+">"]
  } else if((ctx_1819.$tag==2)&&(ctx_1819.$0.$tag==0)){
    return [("in var <"+ctx_1819.$0.$1)+">"]
  } else if(ctx_1819.$tag==10){
    return [("for type bound <"+(printTypeBound_1787(ctx_1819.$0)))+">"]
  } else if(ctx_1819.$tag==11){
    return (enqueue("finalizing bindings:"))((map($pat_1828 => ($pat_1828.$0+" :: ")+(printType_1786($pat_1828.$1))))(ctx_1819.$0))
  } else if(ctx_1819.$tag==7){
    return [("finilizing type <"+(printType_1786(ctx_1819.$0)))+">"]
  } else return []
};
const $lt$lt_1801 = ctxsF_1833 => ctxF_1834 => $pat_1835 => (push(ctxF_1834(Unit_1633)))(ctxsF_1833(Unit_1633));
const head_1838 = head_46;
const $gt$gt_1839 = $gt$gt_21;
const size_1840 = size_72;
const setContains_1841 = setContains_82;
const uniq_1842 = uniq_51;
const all_1843 = all_38;
const mconcat_1844 = mconcat_22;
const zip_1845 = zip_43;
const $lt$eq_1846 = $lt$eq_19;
const setAddAll_1847 = setAddAll_80;
const BitmapIndexed_1848 = BitmapIndexed_14;
const reverse_1849 = reverse_52;
const isEmpty_1850 = isEmpty_73;
const $_1851 = $_16;
const remove_1852 = remove_69;
const forM_1853 = forM_58;
const Unit_1854 = Unit_0;
const loop_1855 = loop_32;
const either_1856 = either_29;
const runState_1857 = runState_61;
const assert_1858 = assert_94;
const setRemove_1859 = setRemove_81;
const zipWithIndex2_1860 = zipWithIndex2_41;
const Left_1861 = Left_8;
const fst_1862 = fst_27;
const setDiff_1863 = setDiff_85;
const insertAll_1864 = insertAll_77;
const mapJust_1865 = mapJust_45;
const maybe_1866 = maybe_23;
const concatMap_1867 = concatMap_44;
const snd_1868 = snd_28;
const mergeSet_1869 = mergeSet_50;
const join_1870 = join_39;
const setIntersection_1871 = setIntersection_86;
const zipWithIndex_1872 = zipWithIndex_42;
const Tuple3_1873 = Tuple3_4;
const mapFst_1874 = mapFst_92;
const mapIx_1875 = mapIx_35;
const foldM_1876 = foldM_56;
const Just_1877 = Just_1;
const Tuple4_1878 = Tuple4_5;
const toRecord_1879 = toRecord_54;
const hamtMask_1880 = hamtMask_64;
const Empty_1881 = Empty_11;
const strToArray_1882 = strToArray_55;
const Tuple5_1883 = Tuple5_6;
const mapSnd_1884 = mapSnd_93;
const setUnion_1885 = setUnion_83;
const Nothing_1886 = Nothing_2;
const trieKeys_1887 = trieKeys_75;
const Tuple6_1888 = Tuple6_7;
const $div$eq_1889 = $div$eq_17;
const justOr_1890 = justOr_24;
const tail_1891 = tail_47;
const init_1892 = init_49;
const debugIf_1893 = debugIf_88;
const sets_1894 = sets_60;
const State_1895 = State_10;
const mapM_1896 = mapM_57;
const hamtIndex_1897 = hamtIndex_65;
const mergeTrie_1898 = mergeTrie_74;
const Collision_1899 = Collision_13;
const not_1900 = not_31;
const evalState_1901 = evalState_62;
const debugMaybe_1902 = debugMaybe_89;
const containsChar_1903 = containsChar_36;
const emptySet_1904 = emptySet_78;
const updateOrSet_1905 = updateOrSet_68;
const isJust_1906 = isJust_26;
const last_1907 = last_48;
const trieEntries_1908 = trieEntries_76;
const mapTrie_1909 = mapTrie_71;
const fromJust_1910 = fromJust_25;
const find_1911 = find_34;
const insert_1912 = insert_67;
const lookup_1913 = lookup_66;
const Pair_1914 = Pair_3;
const repeat_1915 = repeat_40;
const foldTrie_1916 = foldTrie_70;
const exists_1917 = exists_37;
const setToArray_1918 = setToArray_84;
const Right_1919 = Right_9;
const debugWrap_1920 = debugWrap_90;
const gets_1921 = gets_59;
const $gt_1922 = $gt_18;
const Identity_1923 = Identity_15;
const popCount_1924 = popCount_63;
const dedup_1925 = dedup_53;
const Leaf_1926 = Leaf_12;
const debug2_1927 = debug2_87;
const $gt$eq$gt_1928 = $gt$eq$gt_91;
const splitEither_1929 = splitEither_30;
const setAdd_1930 = setAdd_79;
const contains_1931 = contains_33;
const $gt$eq_1932 = $gt$eq_20;
const New_1933 = New_785;
const App_1934 = App_781;
const down_1935 = down_840;
const dataConName_1936 = dataConName_829;
const CNum_1937 = CNum_786;
const Const_1938 = Const_780;
const getAnnType_1939 = getAnnType_816;
const TRow_1940 = TRow_803;
const Inst_1941 = Inst_797;
const printCodeLoc_1942 = printCodeLoc_820;
const getPatType_1943 = getPatType_835;
const Var_1944 = Var_779;
const getAnnCodeLoc_1945 = getAnnCodeLoc_818;
const equivBound_1946 = equivBound_823;
const AnnUseCount_1947 = AnnUseCount_775;
const Data_1948 = Data_793;
const AnnData_1949 = AnnData_776;
const exprLoc_1950 = exprLoc_821;
const getAnn_1951 = getAnn_811;
const downM_1952 = downM_845;
const TForall_1953 = TForall_805;
const copyAnn_1954 = copyAnn_813;
const Module_1955 = Module_791;
const ModuleInterface_1956 = ModuleInterface_792;
const TApp_1957 = TApp_802;
const CStr_1958 = CStr_787;
const TCBound_1959 = TCBound_798;
const TConst_1960 = TConst_799;
const ImportOpen_1961 = ImportOpen_808;
const equivType_1962 = equivType_828;
const dataConNames_1963 = dataConNames_830;
const downAndUp_1964 = downAndUp_838;
const Case_1965 = Case_783;
const getType_1966 = getType_834;
const ImportClosed_1967 = ImportClosed_807;
const TSkolem_1968 = TSkolem_801;
const breakableDownM_1969 = breakableDownM_846;
const upM_1970 = upM_844;
const AnnCodeLoc_1971 = AnnCodeLoc_774;
const TBot_1972 = TBot_804;
const PConst_1973 = PConst_789;
const TVar_1974 = TVar_800;
const emptyAnn_1975 = emptyAnn_810;
const setAnnCodeLoc_1976 = setAnnCodeLoc_819;
const Instance_1977 = Instance_796;
const AnnExport_1978 = AnnExport_778;
const TUnknown_1979 = TUnknown_806;
const breakableDownAndUpM_1980 = breakableDownAndUpM_842;
const namesInPat_1981 = namesInPat_822;
const breakableDownAndUp_1982 = breakableDownAndUp_837;
const PVar_1983 = PVar_788;
const DataCon_1984 = DataCon_794;
const Class_1985 = Class_795;
const Lam_1986 = Lam_782;
const annOf_1987 = annOf_832;
const setAnnType_1988 = setAnnType_817;
const AnnTag_1989 = AnnTag_777;
const compareBound_1990 = compareBound_827;
const PData_1991 = PData_790;
const getAnnE_1992 = getAnnE_814;
const AnnType_1993 = AnnType_773;
const Let_1994 = Let_784;
const up_1995 = up_839;
const breakableDown_1996 = breakableDown_841;
const withAnn_1997 = withAnn_833;
const setPatType_1998 = setPatType_836;
const setType_1999 = setType_831;
const compareArr_2000 = compareArr_825;
const ImportAll_2001 = ImportAll_809;
const compareOrd_2002 = compareOrd_824;
const downAndUpM_2003 = downAndUpM_843;
const hasAnnE_2004 = hasAnnE_815;
const compareType_2005 = compareType_826;
const setAnn_2006 = setAnn_812;
const $gt$gt$gt$gt_2007 = $gt$gt$gt$gt_624;
const maybeOk_2008 = maybeOk_617;
const Err_2009 = Err_616;
const isOk_2010 = isOk_621;
const mapErr_2011 = mapErr_620;
const foldOkM_2012 = foldOkM_625;
const mapOkM_2013 = mapOkM_626;
const mapOk_2014 = mapOk_619;
const mapResult_2015 = mapResult_627;
const isErr_2016 = isErr_622;
const Ok_2017 = Ok_615;
const $gt$gt$eq$gt$gt_2018 = $gt$gt$eq$gt$gt_623;
const maybeErr_2019 = maybeErr_618;
const $lt$lt_2020 = $lt$lt_1801;
const BindingCtx_2021 = BindingCtx_1789;
const FinTypeCtx_2022 = FinTypeCtx_1795;
const TypeBoundCtx_2023 = TypeBoundCtx_1798;
const UnifyCtx_2024 = UnifyCtx_1791;
const PatCtx_2025 = PatCtx_1793;
const MRGCtx_2026 = MRGCtx_1794;
const TypeInstCtx_2027 = TypeInstCtx_1797;
const TypeEquivCtx_2028 = TypeEquivCtx_1796;
const FinMRGCtx_2029 = FinMRGCtx_1799;
const ExprCtx_2030 = ExprCtx_1790;
const printCtx_2031 = printCtx_1800;
const emptyCtx_2032 = emptyCtx_1802;
const resolveCtx_2033 = resolveCtx_1803;
const ModuleCtx_2034 = ModuleCtx_1788;
const UpdateCtx_2035 = UpdateCtx_1792;
const OrderedSet_2036 = $_0_2051 => $_1_2052 => ({$0:$_0_2051,$1:$_1_2052});
const osetToArray_2041 = $pat_2071 => (map(fst_1862))((sortBy(a_2074 => b_2075 => (((compareOrd_2002($instance_446))($instance_448))(snd_1868(a_2074)))(snd_1868(b_2075))))(trieEntries_1908($pat_2071.$0)));
const osetAdd_2039 = local$instance$Eq$1 => local$instance$Hashable$0 => x_2062 => $pat_2063 => {
  const $phi$236 = (((lookup_1913(local$instance$Eq$1))(local$instance$Hashable$0))(x_2062))($pat_2063.$0);
  if($phi$236.$tag==1){
    return (OrderedSet_2036(((((insert_1912(local$instance$Eq$1))(local$instance$Hashable$0))(x_2062))($pat_2063.$1))($pat_2063.$0)))($pat_2063.$1+1)
  } else return (OrderedSet_2036($pat_2063.$0))($pat_2063.$1)
};
const osetEmpty_2038 = (OrderedSet_2036(Empty_1881))(0);
const skolemsInOrderAsSet_2044 = t_2081 => {
  const gather_2082 = sks_2083 => t_2084 => {
    if(t_2084.$tag==2){
      return (((osetAdd_2039($instance_447))($instance_506))(t_2084.$1))(sks_2083)
    } else if(t_2084.$tag==3){
      return (gather_2082((gather_2082(sks_2083))(t_2084.$1)))(t_2084.$2)
    } else if(t_2084.$tag==6){
      return error("unexpected TForall in skolemsInOrder")
    } else return sks_2083
  };
  return (gather_2082(osetEmpty_2038))(t_2081)
};
const skolemsInOrder_2043 = t_2080 => osetToArray_2041(skolemsInOrderAsSet_2044(t_2080));
const wrapForall_2045 = t_2095 => {
  if(t_2095.$tag==6){
    return t_2095
  } else {
    const sks_2101 = skolemsInOrder_2043(t_2095);
    const $phi$240 = length(sks_2101);
    if(0==$phi$240){
      return t_2095
    } else return (((TForall_1953(emptyAnn_1975))(sks_2101))([]))(t_2095)
  }
};
const osetIndexOf_2042 = local$instance$Eq$1 => local$instance$Hashable$0 => x_2076 => $pat_2077 => (((lookup_1913(local$instance$Eq$1))(local$instance$Hashable$0))(x_2076))($pat_2077.$0);
const normalizeForall_2046 = t_2103 => {
  const compareSkolems_2104 = local$instance$Eq$2 => local$instance$Hashable$1 => local$instance$Ord$0 => m_2105 => a_2106 => b_2107 => {
    const $phi$243 = (Pair_1914((((osetIndexOf_2042(local$instance$Eq$2))(local$instance$Hashable$1))(a_2106))(m_2105)))((((osetIndexOf_2042(local$instance$Eq$2))(local$instance$Hashable$1))(b_2107))(m_2105));
    if(($phi$243.$0.$tag==0)&&($phi$243.$1.$tag==0)){
      return $phi$243.$0.$0-$phi$243.$1.$0
    } else if($phi$243.$0.$tag==0){
      return 0-1
    } else if($phi$243.$1.$tag==0){
      return 1
    } else return (((compareOrd_2002(local$instance$Eq$2))(local$instance$Ord$0))(a_2106))(b_2107)
  };
  if(t_2103.$tag==6){
    const skolemsInType_2119 = skolemsInOrderAsSet_2044(t_2103.$3);
    const vs2_2120 = (filter(s_2121 => ((contains_1931($instance_447))(s_2121))(t_2103.$1)))(osetToArray_2041(skolemsInType_2119));
    return (((TForall_1953(t_2103.$0))(vs2_2120))(($_1851(dedup_1925($instance_1303)))((sortBy(compareBound_1990(compareType_2005((((compareSkolems_2104($instance_447))($instance_506))($instance_449))(skolemsInType_2119)))))(t_2103.$2))))(t_2103.$3)
  } else return t_2103
};
const replaceSkolems_2037 = t_2053 => reps_2054 => {
  if(t_2053.$tag==2){
    const $phi$247 = (((lookup_1913($instance_447))($instance_506))(t_2053.$1))(reps_2054);
    if($phi$247.$tag==1){
      return t_2053
    } else if($phi$247.$tag==0){
      return $phi$247.$0
    } else error("pattern match fail in //compiler/typeutil.jg at line 8, column 20",$phi$247)
  } else if(t_2053.$tag==3){
    return ((TApp_1957(t_2053.$0))((replaceSkolems_2037(t_2053.$1))(reps_2054)))((replaceSkolems_2037(t_2053.$2))(reps_2054))
  } else return t_2053
};
const instantiateBound_2048 = reps_2135 => $pat_2136 => ((TCBound_1959($pat_2136.$0))($pat_2136.$1))((replaceSkolems_2037($pat_2136.$2))(reps_2135));
const osetContains_2040 = local$instance$Eq$1 => local$instance$Hashable$0 => x_2067 => $pat_2068 => isJust_1906((((lookup_1913(local$instance$Eq$1))(local$instance$Hashable$0))(x_2067))($pat_2068.$0));
const checkEquiv_2049 = ctx_2140 => a_2141 => b_2142 => (evalState_1901(Empty_1881))(((checkEquivM_2050(ctx_2140))(a_2141))(b_2142));
const checkEquivM_2050 = ctx_2143 => toType_2144 => fromType_2145 => {
  const ctx2_2146 = ($lt$lt_2020(ctx_2143))(__2150 => (TypeEquivCtx_2028(toType_2144))(fromType_2145));
  const checkM_2149 = checkEquivM_2050(ctx2_2146);
  const err_2147 = local$instance$Monad$0 => m_2151 => ($_1851(ret(local$instance$Monad$0)))(Err_2009((Pair_1914(ctx2_2146))(m_2151)));
  const ok_2148 = local$instance$Monad$1 => ($_1851(ret(local$instance$Monad$1)))(Ok_2017(Unit_1854));
  if(fromType_2145.$tag==0){
    if(toType_2144.$tag==0){
      const $phi$259 = (($eq$eq($instance_447))(fromType_2145.$1))(toType_2144.$1);
      if($phi$259){
        return ok_2148($instance_502)
      } else if(!$phi$259){
        return (err_2147($instance_502))("type name mismatch")
      } else error("pattern match fail in //compiler/typeutil.jg at line 70, column 23",$phi$259)
    } else return (err_2147($instance_502))("type mismatch")
  } else if(fromType_2145.$tag==2){
    return (($gt$gt$eq($instance_502))(gets_1921))(bs_2159 => {
      const $phi$253 = (((lookup_1913($instance_447))($instance_506))(fromType_2145.$1))(bs_2159);
      if($phi$253.$tag==1){
        if(toType_2144.$tag==2){
          const $phi$256 = (($eq$eq($instance_447))(fromType_2145.$1))(toType_2144.$1);
          if($phi$256){
            return ok_2148($instance_502)
          } else if(!$phi$256){
            return (err_2147($instance_502))("type name mismatch")
          } else error("pattern match fail in //compiler/typeutil.jg at line 78, column 26",$phi$256)
        } else return (err_2147($instance_502))("type mismatch")
      } else if(($phi$253.$tag==0)&&($phi$253.$0.$tag==7)){
        return (($gt$gt_1839($instance_502))(sets_1894(((((insert_1912($instance_447))($instance_506))(fromType_2145.$1))(toType_2144))(bs_2159))))(ok_2148($instance_502))
      } else if($phi$253.$tag==0){
        return ($_1851(ret($instance_502)))(((checkEquiv_2049(ctx2_2146))($phi$253.$0))(toType_2144))
      } else error("pattern match fail in //compiler/typeutil.jg at line 75, column 38",$phi$253)
    })
  } else if(fromType_2145.$tag==3){
    if(toType_2144.$tag==3){
      return (($gt$gt$gt$gt_2007($instance_502))((checkM_2149(toType_2144.$1))(fromType_2145.$1)))((checkM_2149(toType_2144.$2))(fromType_2145.$2))
    } else return (err_2147($instance_502))("type mismatch")
  } else return (err_2147($instance_502))("type cannot be equivalent")
};
const instanceMatches_2047 = ctx_2123 => $pat_2124 => $pat_2128 => ((($eq$eq($instance_447))($pat_2128.$1.$1))($pat_2124.$1))&&(isOk_2010((evalState_1901(((foldl(m_2133 => v_2134 => ((((insert_1912($instance_447))($instance_506))(v_2134))(TUnknown_1979))(m_2133)))(Empty_1881))($pat_2128.$0)))(((checkEquivM_2050(ctx_2123))($pat_2124.$2))($pat_2128.$1.$2))));
const head_2172 = head_46;
const $gt$gt_2173 = $gt$gt_21;
const size_2174 = size_72;
const setContains_2175 = setContains_82;
const uniq_2176 = uniq_51;
const all_2177 = all_38;
const mconcat_2178 = mconcat_22;
const zip_2179 = zip_43;
const $lt$eq_2180 = $lt$eq_19;
const setAddAll_2181 = setAddAll_80;
const BitmapIndexed_2182 = BitmapIndexed_14;
const reverse_2183 = reverse_52;
const isEmpty_2184 = isEmpty_73;
const $_2185 = $_16;
const remove_2186 = remove_69;
const forM_2187 = forM_58;
const Unit_2188 = Unit_0;
const loop_2189 = loop_32;
const either_2190 = either_29;
const runState_2191 = runState_61;
const assert_2192 = assert_94;
const setRemove_2193 = setRemove_81;
const zipWithIndex2_2194 = zipWithIndex2_41;
const Left_2195 = Left_8;
const fst_2196 = fst_27;
const setDiff_2197 = setDiff_85;
const insertAll_2198 = insertAll_77;
const mapJust_2199 = mapJust_45;
const maybe_2200 = maybe_23;
const concatMap_2201 = concatMap_44;
const snd_2202 = snd_28;
const mergeSet_2203 = mergeSet_50;
const join_2204 = join_39;
const setIntersection_2205 = setIntersection_86;
const zipWithIndex_2206 = zipWithIndex_42;
const Tuple3_2207 = Tuple3_4;
const mapFst_2208 = mapFst_92;
const mapIx_2209 = mapIx_35;
const foldM_2210 = foldM_56;
const Just_2211 = Just_1;
const Tuple4_2212 = Tuple4_5;
const toRecord_2213 = toRecord_54;
const hamtMask_2214 = hamtMask_64;
const Empty_2215 = Empty_11;
const strToArray_2216 = strToArray_55;
const Tuple5_2217 = Tuple5_6;
const mapSnd_2218 = mapSnd_93;
const setUnion_2219 = setUnion_83;
const Nothing_2220 = Nothing_2;
const trieKeys_2221 = trieKeys_75;
const Tuple6_2222 = Tuple6_7;
const $div$eq_2223 = $div$eq_17;
const justOr_2224 = justOr_24;
const tail_2225 = tail_47;
const init_2226 = init_49;
const debugIf_2227 = debugIf_88;
const sets_2228 = sets_60;
const State_2229 = State_10;
const mapM_2230 = mapM_57;
const hamtIndex_2231 = hamtIndex_65;
const mergeTrie_2232 = mergeTrie_74;
const Collision_2233 = Collision_13;
const not_2234 = not_31;
const evalState_2235 = evalState_62;
const debugMaybe_2236 = debugMaybe_89;
const containsChar_2237 = containsChar_36;
const emptySet_2238 = emptySet_78;
const updateOrSet_2239 = updateOrSet_68;
const isJust_2240 = isJust_26;
const last_2241 = last_48;
const trieEntries_2242 = trieEntries_76;
const mapTrie_2243 = mapTrie_71;
const fromJust_2244 = fromJust_25;
const find_2245 = find_34;
const insert_2246 = insert_67;
const lookup_2247 = lookup_66;
const Pair_2248 = Pair_3;
const repeat_2249 = repeat_40;
const foldTrie_2250 = foldTrie_70;
const exists_2251 = exists_37;
const setToArray_2252 = setToArray_84;
const Right_2253 = Right_9;
const debugWrap_2254 = debugWrap_90;
const gets_2255 = gets_59;
const $gt_2256 = $gt_18;
const Identity_2257 = Identity_15;
const popCount_2258 = popCount_63;
const dedup_2259 = dedup_53;
const Leaf_2260 = Leaf_12;
const debug2_2261 = debug2_87;
const $gt$eq$gt_2262 = $gt$eq$gt_91;
const splitEither_2263 = splitEither_30;
const setAdd_2264 = setAdd_79;
const contains_2265 = contains_33;
const $gt$eq_2266 = $gt$eq_20;
const dfs_2267 = local$instance$Eq$1 => local$instance$Hashable$0 => g_2271 => visited_2272 => v_2273 => {
  const visit_2274 = r_2275 => e_2276 => {
    const $phi$263 = (((contains_2265(local$instance$Eq$1))(e_2276))(r_2275))||(((contains_2265(local$instance$Eq$1))(e_2276))(visited_2272));
    if($phi$263){
      return r_2275
    } else if(!$phi$263){
      return (concat(((((dfs_2267(local$instance$Eq$1))(local$instance$Hashable$0))(g_2271))((push(v_2273))((concat(r_2275))(visited_2272))))(e_2276)))(r_2275)
    } else error("pattern match fail in //compiler/graph.jg at line 4, column 15",$phi$263)
  };
  const $phi$265 = (((lookup_2247(local$instance$Eq$1))(local$instance$Hashable$0))(v_2273))(g_2271);
  if($phi$265.$tag==0){
    return ($_2185(enqueue(v_2273)))(((foldr(visit_2274))([]))($phi$265.$0))
  } else if($phi$265.$tag==1){
    return []
  } else error("pattern match fail in //compiler/graph.jg at line 7, column 6",$phi$265)
};
const fullDfs_2268 = local$instance$Eq$1 => local$instance$Hashable$0 => g_2278 => {
  const visit_2279 = result_2280 => v_2281 => __2282 => {
    const $phi$267 = ((contains_2265(local$instance$Eq$1))(v_2281))(result_2280);
    if($phi$267){
      return result_2280
    } else if(!$phi$267){
      return (concat(((((dfs_2267(local$instance$Eq$1))(local$instance$Hashable$0))(g_2278))(result_2280))(v_2281)))(result_2280)
    } else error("pattern match fail in //compiler/graph.jg at line 12, column 22",$phi$267)
  };
  return ((foldTrie_2250(visit_2279))([]))(g_2278)
};
const scc_2269 = local$instance$Eq$1 => local$instance$Hashable$0 => g_2283 => {
  const invertEdge_2288 = local$instance$Eq$3 => local$instance$Hashable$2 => v_2290 => ig_2291 => e_2292 => {
    const $phi$269 = (((lookup_2247(local$instance$Eq$3))(local$instance$Hashable$2))(e_2292))(ig_2291);
    if($phi$269.$tag==0){
      return ((((insert_2246(local$instance$Eq$3))(local$instance$Hashable$2))(e_2292))((push(v_2290))($phi$269.$0)))(ig_2291)
    } else if($phi$269.$tag==1){
      return ((((insert_2246(local$instance$Eq$3))(local$instance$Hashable$2))(e_2292))([v_2290]))(ig_2291)
    } else error("pattern match fail in //compiler/graph.jg at line 19, column 25",$phi$269)
  };
  const invert_2289 = local$instance$Eq$5 => local$instance$Hashable$4 => ig_2294 => v_2295 => es_2296 => {
    let $phi$270;
    const $phi$271 = (((lookup_2247(local$instance$Eq$5))(local$instance$Hashable$4))(v_2295))(ig_2294);
    if($phi$271.$tag==0){
      $phi$270 = ig_2294
    } else if($phi$271.$tag==1){
      $phi$270 = (((((insert_2246(local$instance$Eq$5))(local$instance$Hashable$4))(v_2295))([]))(ig_2294))
    } else error("pattern match fail in //compiler/graph.jg at line 23, column 13",$phi$271);
    const ig2_2297 = $phi$270;
    return ((foldl(((invertEdge_2288(local$instance$Eq$5))(local$instance$Hashable$4))(v_2295)))(ig2_2297))(es_2296)
  };
  const invertedG_2284 = ((foldTrie_2250((invert_2289(local$instance$Eq$1))(local$instance$Hashable$0)))(Empty_2215))(g_2283);
  const assembleCc_2285 = local$instance$Eq$7 => local$instance$Hashable$6 => $pat_2299 => v_2302 => {
    const $phi$274 = (exists_2251((contains_2265(local$instance$Eq$7))(v_2302)))($pat_2299.$1);
    if($phi$274){
      return (Pair_2248($pat_2299.$0))($pat_2299.$1)
    } else if(!$phi$274){
      const cc_2303 = ((((dfs_2267(local$instance$Eq$7))(local$instance$Hashable$6))($pat_2299.$0))([]))(v_2302);
      const ig2_2304 = ((foldl(g_2305 => v_2306 => (((remove_2186(local$instance$Eq$7))(local$instance$Hashable$6))(v_2306))(g_2305)))($pat_2299.$0))(cc_2303);
      return (Pair_2248(ig2_2304))((push(cc_2303))($pat_2299.$1))
    } else error("pattern match fail in //compiler/graph.jg at line 28, column 28",$phi$274)
  };
  const firstDfs_2286 = ((fullDfs_2268(local$instance$Eq$1))(local$instance$Hashable$0))(g_2283);
  const ccs_2287 = snd_2202(((foldl((assembleCc_2285(local$instance$Eq$1))(local$instance$Hashable$0)))((Pair_2248(invertedG_2284))([])))(firstDfs_2286));
  return ccs_2287
};
const sccSorted_2270 = local$instance$Eq$1 => local$instance$Hashable$0 => g_2307 => {
  const topSort_2309 = ccs_2311 => {
    const f_2316 = local$instance$Eq$3 => local$instance$Hashable$2 => r_2317 => $pat_2318 => ((foldl(r_2321 => c_2322 => ((((insert_2246(local$instance$Eq$3))(local$instance$Hashable$2))(c_2322))($pat_2318.$0))(r_2321)))(r_2317))($pat_2318.$1);
    const g2g_2312 = ((foldl((f_2316(local$instance$Eq$1))(local$instance$Hashable$0)))(Empty_2215))(zipWithIndex_2206(ccs_2311));
    const addGraph_2313 = r_2323 => v_2324 => es_2325 => {
      const rv_2326 = ($_2185(fromJust_2244))((((lookup_2247(local$instance$Eq$1))(local$instance$Hashable$0))(v_2324))(g2g_2312));
      const res_2327 = (uniq_2176($instance_446))(sort((filter(re_2328 => (($div$eq_2223($instance_446))(re_2328))(rv_2326)))((map(e_2329 => ($_2185(fromJust_2244))((((lookup_2247(local$instance$Eq$1))(local$instance$Hashable$0))(e_2329))(g2g_2312))))(es_2325))));
      const $phi$277 = (((lookup_2247($instance_446))($instance_504))(rv_2326))(r_2323);
      if($phi$277.$tag==1){
        return ((((insert_2246($instance_446))($instance_504))(rv_2326))(res_2327))(r_2323)
      } else if($phi$277.$tag==0){
        return ((((insert_2246($instance_446))($instance_504))(rv_2326))((((mergeSet_2203($instance_446))($instance_448))(res_2327))($phi$277.$0)))(r_2323)
      } else error("pattern match fail in //compiler/graph.jg at line 48, column 10",$phi$277)
    };
    const cg_2314 = ((foldTrie_2250(addGraph_2313))(Empty_2215))(g_2307);
    const ord_2315 = ((fullDfs_2268($instance_446))($instance_504))(cg_2314);
    return reverse_2183((map(i_2331 => (getIx(i_2331))(ccs_2311)))(ord_2315))
  };
  const ccs_2308 = ((scc_2269(local$instance$Eq$1))(local$instance$Hashable$0))(g_2307);
  const result_2310 = topSort_2309(ccs_2308);
  return result_2310
};
const head_2332 = head_46;
const $gt$gt_2333 = $gt$gt_21;
const size_2334 = size_72;
const setContains_2335 = setContains_82;
const uniq_2336 = uniq_51;
const all_2337 = all_38;
const mconcat_2338 = mconcat_22;
const zip_2339 = zip_43;
const $lt$eq_2340 = $lt$eq_19;
const setAddAll_2341 = setAddAll_80;
const BitmapIndexed_2342 = BitmapIndexed_14;
const reverse_2343 = reverse_52;
const isEmpty_2344 = isEmpty_73;
const $_2345 = $_16;
const remove_2346 = remove_69;
const forM_2347 = forM_58;
const Unit_2348 = Unit_0;
const loop_2349 = loop_32;
const either_2350 = either_29;
const runState_2351 = runState_61;
const assert_2352 = assert_94;
const setRemove_2353 = setRemove_81;
const zipWithIndex2_2354 = zipWithIndex2_41;
const Left_2355 = Left_8;
const fst_2356 = fst_27;
const setDiff_2357 = setDiff_85;
const insertAll_2358 = insertAll_77;
const mapJust_2359 = mapJust_45;
const maybe_2360 = maybe_23;
const concatMap_2361 = concatMap_44;
const snd_2362 = snd_28;
const mergeSet_2363 = mergeSet_50;
const join_2364 = join_39;
const setIntersection_2365 = setIntersection_86;
const zipWithIndex_2366 = zipWithIndex_42;
const Tuple3_2367 = Tuple3_4;
const mapFst_2368 = mapFst_92;
const mapIx_2369 = mapIx_35;
const foldM_2370 = foldM_56;
const Just_2371 = Just_1;
const Tuple4_2372 = Tuple4_5;
const toRecord_2373 = toRecord_54;
const hamtMask_2374 = hamtMask_64;
const Empty_2375 = Empty_11;
const strToArray_2376 = strToArray_55;
const Tuple5_2377 = Tuple5_6;
const mapSnd_2378 = mapSnd_93;
const setUnion_2379 = setUnion_83;
const Nothing_2380 = Nothing_2;
const trieKeys_2381 = trieKeys_75;
const Tuple6_2382 = Tuple6_7;
const $div$eq_2383 = $div$eq_17;
const justOr_2384 = justOr_24;
const tail_2385 = tail_47;
const init_2386 = init_49;
const debugIf_2387 = debugIf_88;
const sets_2388 = sets_60;
const State_2389 = State_10;
const mapM_2390 = mapM_57;
const hamtIndex_2391 = hamtIndex_65;
const mergeTrie_2392 = mergeTrie_74;
const Collision_2393 = Collision_13;
const not_2394 = not_31;
const evalState_2395 = evalState_62;
const debugMaybe_2396 = debugMaybe_89;
const containsChar_2397 = containsChar_36;
const emptySet_2398 = emptySet_78;
const updateOrSet_2399 = updateOrSet_68;
const isJust_2400 = isJust_26;
const last_2401 = last_48;
const trieEntries_2402 = trieEntries_76;
const mapTrie_2403 = mapTrie_71;
const fromJust_2404 = fromJust_25;
const find_2405 = find_34;
const insert_2406 = insert_67;
const lookup_2407 = lookup_66;
const Pair_2408 = Pair_3;
const repeat_2409 = repeat_40;
const foldTrie_2410 = foldTrie_70;
const exists_2411 = exists_37;
const setToArray_2412 = setToArray_84;
const Right_2413 = Right_9;
const debugWrap_2414 = debugWrap_90;
const gets_2415 = gets_59;
const $gt_2416 = $gt_18;
const Identity_2417 = Identity_15;
const popCount_2418 = popCount_63;
const dedup_2419 = dedup_53;
const Leaf_2420 = Leaf_12;
const debug2_2421 = debug2_87;
const $gt$eq$gt_2422 = $gt$eq$gt_91;
const splitEither_2423 = splitEither_30;
const setAdd_2424 = setAdd_79;
const contains_2425 = contains_33;
const $gt$eq_2426 = $gt$eq_20;
const New_2427 = New_785;
const App_2428 = App_781;
const down_2429 = down_840;
const dataConName_2430 = dataConName_829;
const CNum_2431 = CNum_786;
const Const_2432 = Const_780;
const getAnnType_2433 = getAnnType_816;
const TRow_2434 = TRow_803;
const Inst_2435 = Inst_797;
const printCodeLoc_2436 = printCodeLoc_820;
const getPatType_2437 = getPatType_835;
const Var_2438 = Var_779;
const getAnnCodeLoc_2439 = getAnnCodeLoc_818;
const equivBound_2440 = equivBound_823;
const AnnUseCount_2441 = AnnUseCount_775;
const Data_2442 = Data_793;
const AnnData_2443 = AnnData_776;
const exprLoc_2444 = exprLoc_821;
const getAnn_2445 = getAnn_811;
const downM_2446 = downM_845;
const TForall_2447 = TForall_805;
const copyAnn_2448 = copyAnn_813;
const Module_2449 = Module_791;
const ModuleInterface_2450 = ModuleInterface_792;
const TApp_2451 = TApp_802;
const CStr_2452 = CStr_787;
const TCBound_2453 = TCBound_798;
const TConst_2454 = TConst_799;
const ImportOpen_2455 = ImportOpen_808;
const equivType_2456 = equivType_828;
const dataConNames_2457 = dataConNames_830;
const downAndUp_2458 = downAndUp_838;
const Case_2459 = Case_783;
const getType_2460 = getType_834;
const ImportClosed_2461 = ImportClosed_807;
const TSkolem_2462 = TSkolem_801;
const breakableDownM_2463 = breakableDownM_846;
const upM_2464 = upM_844;
const AnnCodeLoc_2465 = AnnCodeLoc_774;
const TBot_2466 = TBot_804;
const PConst_2467 = PConst_789;
const TVar_2468 = TVar_800;
const emptyAnn_2469 = emptyAnn_810;
const setAnnCodeLoc_2470 = setAnnCodeLoc_819;
const Instance_2471 = Instance_796;
const AnnExport_2472 = AnnExport_778;
const TUnknown_2473 = TUnknown_806;
const breakableDownAndUpM_2474 = breakableDownAndUpM_842;
const namesInPat_2475 = namesInPat_822;
const breakableDownAndUp_2476 = breakableDownAndUp_837;
const PVar_2477 = PVar_788;
const DataCon_2478 = DataCon_794;
const Class_2479 = Class_795;
const Lam_2480 = Lam_782;
const annOf_2481 = annOf_832;
const setAnnType_2482 = setAnnType_817;
const AnnTag_2483 = AnnTag_777;
const compareBound_2484 = compareBound_827;
const PData_2485 = PData_790;
const getAnnE_2486 = getAnnE_814;
const AnnType_2487 = AnnType_773;
const Let_2488 = Let_784;
const up_2489 = up_839;
const breakableDown_2490 = breakableDown_841;
const withAnn_2491 = withAnn_833;
const setPatType_2492 = setPatType_836;
const setType_2493 = setType_831;
const compareArr_2494 = compareArr_825;
const ImportAll_2495 = ImportAll_809;
const compareOrd_2496 = compareOrd_824;
const downAndUpM_2497 = downAndUpM_843;
const hasAnnE_2498 = hasAnnE_815;
const compareType_2499 = compareType_826;
const setAnn_2500 = setAnn_812;
const printType_2501 = printType_1476;
const printTypeBound_2502 = printTypeBound_1477;
const reallyPrintExpr_2503 = reallyPrintExpr_1481;
const printDef_2504 = printDef_1479;
const printInst_2505 = printInst_1482;
const sccSorted_2506 = sccSorted_2270;
const replaceSkolems_2507 = replaceSkolems_2037;
const normalizeForall_2508 = normalizeForall_2046;
const instanceMatches_2509 = instanceMatches_2047;
const wrapForall_2510 = wrapForall_2045;
const $lt$lt_2511 = $lt$lt_1801;
const BindingCtx_2512 = BindingCtx_1789;
const FinTypeCtx_2513 = FinTypeCtx_1795;
const TypeBoundCtx_2514 = TypeBoundCtx_1798;
const UnifyCtx_2515 = UnifyCtx_1791;
const PatCtx_2516 = PatCtx_1793;
const MRGCtx_2517 = MRGCtx_1794;
const TypeInstCtx_2518 = TypeInstCtx_1797;
const TypeEquivCtx_2519 = TypeEquivCtx_1796;
const FinMRGCtx_2520 = FinMRGCtx_1799;
const ExprCtx_2521 = ExprCtx_1790;
const printCtx_2522 = printCtx_1800;
const emptyCtx_2523 = emptyCtx_1802;
const resolveCtx_2524 = resolveCtx_1803;
const ModuleCtx_2525 = ModuleCtx_1788;
const UpdateCtx_2526 = UpdateCtx_1792;
const $gt$gt$gt$gt_2527 = $gt$gt$gt$gt_624;
const maybeOk_2528 = maybeOk_617;
const Err_2529 = Err_616;
const isOk_2530 = isOk_621;
const mapErr_2531 = mapErr_620;
const foldOkM_2532 = foldOkM_625;
const mapOkM_2533 = mapOkM_626;
const mapOk_2534 = mapOk_619;
const mapResult_2535 = mapResult_627;
const isErr_2536 = isErr_622;
const Ok_2537 = Ok_615;
const $gt$gt$eq$gt$gt_2538 = $gt$gt$eq$gt$gt_623;
const maybeErr_2539 = maybeErr_618;
const US_2540 = $_0_2598 => $_1_2599 => $_2_2600 => $_3_2601 => ({$0:$_0_2598,$1:$_1_2599,$2:$_2_2600,$3:$_3_2601});
const skolemsInType_2546 = t_2619 => {
  if(t_2619.$tag==0){
    return Empty_2375
  } else if(t_2619.$tag==2){
    return (((setAdd_2424($instance_447))($instance_506))(t_2619.$1))(Empty_2375)
  } else if(t_2619.$tag==1){
    return Empty_2375
  } else if(t_2619.$tag==3){
    return (((setUnion_2379($instance_447))($instance_506))(skolemsInType_2546(t_2619.$1)))(skolemsInType_2546(t_2619.$2))
  } else if(t_2619.$tag==6){
    return skolemsInType_2546(t_2619.$3)
  } else return error("unsupported type in varsInType "+(jsonStringify(t_2619)))
};
const skolemsInTypeBound_2547 = $pat_2634 => skolemsInType_2546($pat_2634.$2);
const freeVarsAcc_2564 = fvs_2878 => scope_2879 => e_2880 => {
  const addFree_2881 = local$instance$Eq$1 => local$instance$Hashable$0 => scope_2882 => n_2883 => fvs_2884 => {
    const $phi$281 = (((setContains_2335(local$instance$Eq$1))(local$instance$Hashable$0))(n_2883))(scope_2882);
    if(!$phi$281){
      return (((setAdd_2424(local$instance$Eq$1))(local$instance$Hashable$0))(n_2883))(fvs_2884)
    } else if($phi$281){
      return fvs_2884
    } else error("pattern match fail in //compiler/newtyper.jg at line 232, column 25",$phi$281)
  };
  if(e_2880.$tag==1){
    return fvs_2878
  } else if(e_2880.$tag==0){
    return ((((addFree_2881($instance_447))($instance_506))(scope_2879))(e_2880.$1))(fvs_2878)
  } else if(e_2880.$tag==2){
    return ((freeVarsAcc_2564(((freeVarsAcc_2564(fvs_2878))(scope_2879))(e_2880.$1)))(scope_2879))(e_2880.$2)
  } else if(e_2880.$tag==3){
    return ((freeVarsAcc_2564(fvs_2878))((((setAdd_2424($instance_447))($instance_506))(e_2880.$1))(scope_2879)))(e_2880.$2)
  } else if((e_2880.$tag==6)&&("Array"==e_2880.$1)){
    return ((foldl(fvs_2897 => e_2898 => ((freeVarsAcc_2564(fvs_2897))(scope_2879))(e_2898)))(fvs_2878))(e_2880.$2)
  } else if(e_2880.$tag==6){
    return ((foldl(fvs_2902 => e_2903 => ((freeVarsAcc_2564(fvs_2902))(scope_2879))(e_2903)))(((((addFree_2881($instance_447))($instance_506))(scope_2879))(e_2880.$1))(fvs_2878)))(e_2880.$2)
  } else if(e_2880.$tag==5){
    const scope2_2907 = (((setAddAll_2341($instance_447))($instance_506))((map(fst_2356))(e_2880.$1)))(scope_2879);
    return ((foldl(fvs_2908 => $pat_2909 => ((freeVarsAcc_2564(fvs_2908))(scope2_2907))($pat_2909.$1)))(((freeVarsAcc_2564(fvs_2878))(scope2_2907))(e_2880.$2)))(e_2880.$1)
  } else if(e_2880.$tag==4){
    const fromPat_2915 = $pat_2917 => p_2920 => {
      if(p_2920.$tag==1){
        return (Pair_2408($pat_2917.$0))($pat_2917.$1)
      } else if(p_2920.$tag==0){
        return (Pair_2408((((setAdd_2424($instance_447))($instance_506))(p_2920.$1))($pat_2917.$0)))($pat_2917.$1)
      } else if(p_2920.$tag==2){
        const $pat_251_12_2928 = ((foldl(fromPat_2915))((Pair_2408($pat_2917.$0))($pat_2917.$1)))(p_2920.$2);
        let $phi$285;
        $phi$285 = $pat_251_12_2928.$1;
        const fvs2_2929 = $phi$285;
        let $phi$286;
        $phi$286 = $pat_251_12_2928.$0;
        const scope2_2930 = $phi$286;
        return (Pair_2408(scope2_2930))(((((addFree_2881($instance_447))($instance_506))($pat_2917.$0))(p_2920.$1))(fvs2_2929))
      } else error("pattern match fail in //compiler/newtyper.jg at line 248, column 9",p_2920)
    };
    const processPat_2916 = fvs_2935 => $pat_2936 => {
      const $pat_254_8_2939 = (fromPat_2915((Pair_2408(scope_2879))(fvs_2935)))($pat_2936.$0);
      let $phi$288;
      $phi$288 = $pat_254_8_2939.$1;
      const fvs2_2940 = $phi$288;
      let $phi$289;
      $phi$289 = $pat_254_8_2939.$0;
      const scope2_2941 = $phi$289;
      return ((freeVarsAcc_2564(fvs2_2940))(scope2_2941))($pat_2936.$1)
    };
    return ((foldl(processPat_2916))(((freeVarsAcc_2564(fvs_2878))(scope_2879))(e_2880.$1)))(e_2880.$2)
  } else error("pattern match fail in //compiler/newtyper.jg at line 236, column 6",e_2880)
};
const freeVars_2565 = freeVarsAcc_2564(Empty_2375);
const computeSCC_2567 = bs_2950 => {
  const bsm_2951 = (((insertAll_2358($instance_447))($instance_506))(bs_2950))(Empty_2375);
  const g_2953 = ((foldl(g_2960 => $pat_2961 => ((((insert_2406($instance_447))($instance_506))($pat_2961.$0))((filter(v_2964 => (($_2345(isJust_2400))((((lookup_2407($instance_447))($instance_506))(v_2964))(bsm_2951)))&&((($div$eq_2383($instance_447))(v_2964))($pat_2961.$0))))(($_2345(setToArray_2412))((freeVars_2565(Empty_2375))($pat_2961.$1)))))(g_2960)))(Empty_2375))(bs_2950);
  const ccs_2954 = ((sccSorted_2506($instance_447))($instance_506))(g_2953);
  const ixs_2952 = ((foldl(m_2956 => $pat_2957 => ((((insert_2406($instance_447))($instance_506))($pat_2957.$1))($pat_2957.$0))(m_2956)))(Empty_2375))(zipWithIndex_2366((map(fst_2356))(bs_2950)));
  const cmp_2955 = n_2965 => m_2966 => (($_2345(fromJust_2404))((((lookup_2407($instance_447))($instance_506))(n_2965))(ixs_2952)))-(($_2345(fromJust_2404))((((lookup_2407($instance_447))($instance_506))(m_2966))(ixs_2952)));
  return (map(cc_2967 => (map(v_2968 => (Pair_2408(v_2968))(($_2345(fromJust_2404))((((lookup_2407($instance_447))($instance_506))(v_2968))(bsm_2951)))))((sortBy(cmp_2955))(cc_2967))))(ccs_2954)
};
const getVars_2551 = (($gt$gt$eq($instance_502))(gets_2415))($pat_2678 => (ret($instance_502))($pat_2678.$1));
const setVar_2550 = v_2671 => t_2672 => (($gt$gt$eq($instance_502))(gets_2415))($pat_2673 => ($_2345(sets_2388))((((US_2540($pat_2673.$0))(((((insert_2406($instance_447))($instance_506))(v_2671))(t_2672))($pat_2673.$1)))($pat_2673.$2))($pat_2673.$3)));
const resolveType3_2576 = t_3133 => {
  const resolve_3134 = t_3135 => {
    if(t_3135.$tag==1){
      return (($gt$gt$eq($instance_502))(getVars_2551))(vars_3138 => {
        const $phi$297 = (((lookup_2407($instance_447))($instance_506))(t_3135.$1))(vars_3138);
        if($phi$297.$tag==1){
          return (ret($instance_502))(t_3135)
        } else if($phi$297.$tag==0){
          return (($gt$gt$eq($instance_502))(resolve_3134($phi$297.$0)))(t2_3140 => (($gt$gt_2333($instance_502))((setVar_2550(t_3135.$1))(t2_3140)))((ret($instance_502))(t2_3140)))
        } else error("pattern match fail in //compiler/newtyper.jg at line 371, column 9",$phi$297)
      })
    } else if(t_3135.$tag==3){
      return (($gt$gt$eq($instance_502))(resolve_3134(t_3135.$1)))(fr_3144 => (($gt$gt$eq($instance_502))(resolve_3134(t_3135.$2)))(ar_3145 => ($_2345(ret($instance_502)))(((TApp_2451(t_3135.$0))(fr_3144))(ar_3145))))
    } else return (ret($instance_502))(t_3135)
  };
  return resolve_3134(t_3133)
};
const instFromDef_2590 = $pat_3392 => {
  const $phi$300 = wrapForall_2510($pat_3392.$2);
  if($phi$300.$tag==6){
    return (Inst_2435($phi$300.$1))(((TCBound_2453(emptyAnn_2469))($pat_3392.$1))($phi$300.$3))
  } else return (Inst_2435([]))(((TCBound_2453(emptyAnn_2469))($pat_3392.$1))($phi$300))
};
const moduleExports_2597 = $pat_3521 => {
  const collectExports_3529 = es_3531 => $pat_3532 => {
    const $phi$304 = (((getAnn_2445($instance_447))($instance_506))("export"))(annOf_2481($pat_3532.$1));
    if($phi$304.$tag==1){
      return es_3531
    } else if(($phi$304.$tag==0)&&($phi$304.$0.$tag==5)){
      return ((((insert_2406($instance_447))($instance_506))($phi$304.$0.$0))(getType_2460($pat_3532.$1)))(es_3531)
    } else error("pattern match fail in //compiler/newtyper.jg at line 587, column 30",$phi$304)
  };
  const bs_3530 = ((foldl(collectExports_3529))(Empty_2375))($pat_3521.$6);
  return ((ModuleInterface_2450(bs_3530))($pat_3521.$4))(((foldl(m_3536 => $pat_3537 => ((((insert_2406($instance_447))($instance_506))($pat_3537.$0))(instFromDef_2590($pat_3537.$1)))(m_3536)))(Empty_2375))($pat_3521.$5))
};
const replaceSkolem_2548 = v_2638 => vt_2639 => t_2640 => {
  if(t_2640.$tag==0){
    return t_2640
  } else if(t_2640.$tag==1){
    return t_2640
  } else if(t_2640.$tag==2){
    const $phi$308 = (($eq$eq($instance_447))(v_2638))(t_2640.$1);
    if($phi$308){
      return vt_2639
    } else if(!$phi$308){
      return t_2640
    } else error("pattern match fail in //compiler/newtyper.jg at line 38, column 20",$phi$308)
  } else if(t_2640.$tag==3){
    return ((TApp_2451(t_2640.$0))(((replaceSkolem_2548(v_2638))(vt_2639))(t_2640.$1)))(((replaceSkolem_2548(v_2638))(vt_2639))(t_2640.$2))
  } else if(t_2640.$tag==6){
    return (((TForall_2447(t_2640.$0))(t_2640.$1))(t_2640.$2))(((replaceSkolem_2548(v_2638))(vt_2639))(t_2640.$3))
  } else return error("unsupported type in replaceSkolem "+(jsonStringify(t_2640)))
};
const hasMatchingInstance_2572 = ctx_3050 => ins_3051 => b_3052 => {
  const $phi$310 = ($_2345(length))((filter((instanceMatches_2509(ctx_3050))(b_3052)))(ins_3051));
  if(0==$phi$310){
    return Ok_2537(false)
  } else if(1==$phi$310){
    return Ok_2537(true)
  } else return Err_2529((Pair_2408(ctx_3050))(("too many matching instances ("+(intToString($phi$310)))+")"))
};
const finalizeType_2584 = ctx_3262 => vars_3263 => ins_3264 => t_3265 => {
  const ctx2_3266 = ($lt$lt_2511(ctx_3262))(__3271 => FinTypeCtx_2513(t_3265));
  const err_3268 = m_3273 => Err_2529((Pair_2408(ctx2_3266))(m_3273));
  const fin_3269 = ((finalizeType_2584(ctx2_3266))(vars_3263))(ins_3264);
  const filterBound_3270 = bs_3274 => b_3275 => (($gt$gt$eq($instance_677))(((hasMatchingInstance_2572(ctx2_3266))(ins_3264))(b_3275)))(m_3276 => {
    if(!m_3276){
      return (ret($instance_677))((push(b_3275))(bs_3274))
    } else if(m_3276){
      return (ret($instance_677))(bs_3274)
    } else error("pattern match fail in //compiler/newtyper.jg at line 462, column 5",m_3276)
  });
  const ok_3267 = e_3272 => Ok_2537(e_3272);
  if(t_3265.$tag==0){
    return ok_3267(t_3265)
  } else if(t_3265.$tag==2){
    return ok_3267(t_3265)
  } else if(t_3265.$tag==3){
    return (($gt$gt$eq($instance_677))(fin_3269(t_3265.$1)))(ff_3284 => (($gt$gt$eq($instance_677))(fin_3269(t_3265.$2)))(af_3285 => ok_3267(((TApp_2451(t_3265.$0))(ff_3284))(af_3285))))
  } else if(t_3265.$tag==6){
    return (($gt$gt$eq($instance_677))(fin_3269(t_3265.$3)))(tf_3290 => (($gt$gt$eq($instance_677))(((mapM_2390($instance_677))(((finalizeTypeBound_2585(ctx2_3266))(vars_3263))(ins_3264)))(t_3265.$2)))(bsf_3291 => (($gt$gt$eq($instance_677))((((foldM_2370($instance_677))(filterBound_3270))([]))(bsf_3291)))(bsfFiltered_3292 => ok_3267(($_2345(normalizeForall_2508))((((TForall_2447(t_3265.$0))(t_3265.$1))(bsfFiltered_3292))(tf_3290))))))
  } else if(t_3265.$tag==1){
    const $phi$314 = (((lookup_2407($instance_447))($instance_506))(t_3265.$1))(vars_3263);
    if($phi$314.$tag==0){
      return fin_3269($phi$314.$0)
    } else if($phi$314.$tag==1){
      return err_3268("unknown type var found during finalization")
    } else error("pattern match fail in //compiler/newtyper.jg at line 476, column 7",$phi$314)
  } else error("pattern match fail in //compiler/newtyper.jg at line 465, column 6",t_3265)
};
const finalizeTypeBound_2585 = ctx_3296 => vars_3297 => ins_3298 => $pat_3299 => (($gt$gt$eq($instance_677))((((finalizeType_2584(ctx_3296))(vars_3297))(ins_3298))($pat_3299.$2)))(t_3303 => Ok_2537(((TCBound_2453($pat_3299.$0))($pat_3299.$1))(t_3303)));
const finalizePat_2587 = ctx_3346 => vars_3347 => ins_3348 => p_3349 => {
  const ctx2_3350 = ($lt$lt_2511(ctx_3346))(__3351 => PatCtx_2516(p_3349));
  return (($gt$gt$eq($instance_677))((((finalizeType_2584(ctx2_3350))(vars_3347))(ins_3348))(getPatType_2437(p_3349))))(tf_3352 => {
    if(p_3349.$tag==2){
      return (($gt$gt$eq($instance_677))(((mapM_2390($instance_677))(((finalizePat_2587(ctx2_3350))(vars_3347))(ins_3348)))(p_3349.$2)))(psf_3356 => Ok_2537(((PData_2485((setAnnType_2482(tf_3352))(p_3349.$0)))(p_3349.$1))(psf_3356)))
    } else return Ok_2537((setPatType_2492(tf_3352))(p_3349))
  })
};
const finalizeExpr_2586 = ctx_3304 => vars_3305 => ins_3306 => e_3307 => {
  const ctx2_3308 = ($lt$lt_2511(ctx_3304))(__3312 => ExprCtx_2521(e_3307));
  const err_3310 = m_3314 => Err_2529((Pair_2408(ctx2_3308))(m_3314));
  const fin_3311 = ((finalizeExpr_2586(ctx2_3308))(vars_3305))(ins_3306);
  const ok_3309 = e_3313 => Ok_2537(e_3313);
  return (($gt$gt$eq($instance_677))((((finalizeType_2584(ctx2_3308))(vars_3305))(ins_3306))(getType_2460(e_3307))))(tf_3315 => {
    if(e_3307.$tag==2){
      return (($gt$gt$eq($instance_677))(fin_3311(e_3307.$1)))(ff_3319 => (($gt$gt$eq($instance_677))(fin_3311(e_3307.$2)))(fa_3320 => ok_3309(((App_2428((setAnnType_2482(tf_3315))(e_3307.$0)))(ff_3319))(fa_3320))))
    } else if(e_3307.$tag==3){
      return (($gt$gt$eq($instance_677))(fin_3311(e_3307.$2)))(ef_3324 => ok_3309(((Lam_2480((setAnnType_2482(tf_3315))(e_3307.$0)))(e_3307.$1))(ef_3324)))
    } else if(e_3307.$tag==5){
      return (($gt$gt$eq($instance_677))((((finalizeBindings_2588(ctx2_3308))(vars_3305))(ins_3306))(e_3307.$1)))(bsf_3328 => (($gt$gt$eq($instance_677))(fin_3311(e_3307.$2)))(ef_3329 => ok_3309(((Let_2488((setAnnType_2482(tf_3315))(e_3307.$0)))(bsf_3328))(ef_3329))))
    } else if(e_3307.$tag==6){
      return (($gt$gt$eq($instance_677))(((mapM_2390($instance_677))(fin_3311))(e_3307.$2)))(esf_3333 => ok_3309(((New_2427((setAnnType_2482(tf_3315))(e_3307.$0)))(e_3307.$1))(esf_3333)))
    } else if(e_3307.$tag==4){
      const finCase_3337 = $pat_3338 => (($gt$gt$eq($instance_677))((((finalizePat_2587(ctx2_3308))(vars_3305))(ins_3306))($pat_3338.$0)))(pf_3341 => (($gt$gt$eq($instance_677))(fin_3311($pat_3338.$1)))(ef_3342 => ok_3309((Pair_2408(pf_3341))(ef_3342))));
      return (($gt$gt$eq($instance_677))(fin_3311(e_3307.$1)))(ef_3343 => (($gt$gt$eq($instance_677))(((mapM_2390($instance_677))(finCase_3337))(e_3307.$2)))(psf_3344 => ok_3309(((Case_2459((setAnnType_2482(tf_3315))(e_3307.$0)))(ef_3343))(psf_3344))))
    } else return ok_3309((setType_2493(tf_3315))(e_3307))
  })
};
const finalizeBindings_2588 = ctx_3358 => vars_3359 => ins_3360 => bs_3361 => {
  const fin_3362 = $pat_3363 => (($gt$gt$eq($instance_677))((((finalizeExpr_2586(($lt$lt_2511(ctx_3358))(__3366 => BindingCtx_2512($pat_3363.$0))))(vars_3359))(ins_3360))($pat_3363.$1)))(ef_3367 => Ok_2537((Pair_2408($pat_3363.$0))(ef_3367)));
  return ((mapM_2390($instance_677))(fin_3362))(bs_3361)
};
const preferredVar_2555 = local$instance$Ord$0 => v_2730 => w_2731 => {
  const $phi$321 = (($eq$eq($instance_446))(length(v_2730)))(length(w_2731));
  if($phi$321){
    return (($lt(local$instance$Ord$0))(v_2730))(w_2731)
  } else if(!$phi$321){
    return (($lt($instance_448))(length(v_2730)))(length(w_2731))
  } else error("pattern match fail in //compiler/newtyper.jg at line 100, column 20",$phi$321)
};
const resolveType_2575 = t_3115 => {
  const resolve_3116 = t_3117 => {
    if(t_3117.$tag==1){
      return (($gt$gt$eq($instance_502))(getVars_2551))(vars_3120 => {
        const $phi$327 = (((lookup_2407($instance_447))($instance_506))(t_3117.$1))(vars_3120);
        if($phi$327.$tag==1){
          return (ret($instance_502))(Nothing_2380)
        } else if($phi$327.$tag==0){
          return (($gt$gt$eq($instance_502))(resolve_3116($phi$327.$0)))(t2_3122 => {
            if(t2_3122.$tag==0){
              return (($gt$gt_2333($instance_502))((setVar_2550(t_3117.$1))(t2_3122.$0)))((ret($instance_502))(Just_2371(t2_3122.$0)))
            } else if(t2_3122.$tag==1){
              return (ret($instance_502))(Just_2371($phi$327.$0))
            } else error("pattern match fail in //compiler/newtyper.jg at line 353, column 13",t2_3122)
          })
        } else error("pattern match fail in //compiler/newtyper.jg at line 350, column 9",$phi$327)
      })
    } else if(t_3117.$tag==3){
      return (($gt$gt$eq($instance_502))(resolve_3116(t_3117.$1)))(fr_3127 => (($gt$gt$eq($instance_502))(resolve_3116(t_3117.$2)))(ar_3128 => {
        if(fr_3127.$tag==1){
          if(ar_3128.$tag==1){
            return (ret($instance_502))(Nothing_2380)
          } else if(ar_3128.$tag==0){
            return ($_2345(ret($instance_502)))(Just_2371(((TApp_2451(t_3117.$0))(t_3117.$1))(ar_3128.$0)))
          } else error("pattern match fail in //compiler/newtyper.jg at line 358, column 22",ar_3128)
        } else if(fr_3127.$tag==0){
          if(ar_3128.$tag==1){
            return ($_2345(ret($instance_502)))(Just_2371(((TApp_2451(t_3117.$0))(fr_3127.$0))(t_3117.$2)))
          } else if(ar_3128.$tag==0){
            return ($_2345(ret($instance_502)))(Just_2371(((TApp_2451(t_3117.$0))(fr_3127.$0))(ar_3128.$0)))
          } else error("pattern match fail in //compiler/newtyper.jg at line 361, column 22",ar_3128)
        } else error("pattern match fail in //compiler/newtyper.jg at line 357, column 9",fr_3127)
      }))
    } else return (ret($instance_502))(Nothing_2380)
  };
  return ((fmap($instance_482))(justOr_2384(t_3115)))(resolve_3116(t_3115))
};
const tapp_2543 = TApp_2451(emptyAnn_2469);
const unifyType_2552 = ctx_2683 => a_2684 => b_2685 => {
  const ctx2_2686 = ($lt$lt_2511(ctx_2683))(__2689 => (UnifyCtx_2515(a_2684))(b_2685));
  const err_2688 = local$instance$Monad$0 => m_2691 => ($_2345(ret(local$instance$Monad$0)))(Err_2529((Pair_2408(ctx2_2686))(m_2691)));
  const ok_2687 = local$instance$Monad$1 => a_2690 => ($_2345(ret(local$instance$Monad$1)))(Ok_2537(a_2690));
  return (($gt$gt$eq($instance_502))(resolveType_2575(a_2684)))(a_2692 => (($gt$gt$eq($instance_502))(resolveType_2575(b_2685)))(b_2693 => {
    const $phi$330 = (Pair_2408(a_2692))(b_2693);
    if($phi$330.$0.$tag==7){
      return (err_2688($instance_502))("unify with TUnknown")
    } else if($phi$330.$1.$tag==7){
      return (err_2688($instance_502))("unify with TUnknown")
    } else if(($phi$330.$0.$tag==1)&&($phi$330.$1.$tag==1)){
      const $phi$336 = (($eq$eq($instance_447))($phi$330.$0.$1))($phi$330.$1.$1);
      if($phi$336){
        return (ok_2687($instance_502))(a_2692)
      } else if(!$phi$336){
        const $phi$338 = ((preferredVar_2555($instance_449))($phi$330.$0.$1))($phi$330.$1.$1);
        if($phi$338){
          return (($gt$gt_2333($instance_502))((setVar_2550($phi$330.$1.$1))(a_2692)))((ok_2687($instance_502))(a_2692))
        } else if(!$phi$338){
          return (($gt$gt_2333($instance_502))((setVar_2550($phi$330.$0.$1))(b_2693)))((ok_2687($instance_502))(b_2693))
        } else error("pattern match fail in //compiler/newtyper.jg at line 74, column 16",$phi$338)
      } else error("pattern match fail in //compiler/newtyper.jg at line 72, column 29",$phi$336)
    } else if($phi$330.$0.$tag==1){
      return (($gt$gt_2333($instance_502))((setVar_2550($phi$330.$0.$1))(b_2693)))((ok_2687($instance_502))(b_2693))
    } else if($phi$330.$1.$tag==1){
      return (($gt$gt_2333($instance_502))((setVar_2550($phi$330.$1.$1))(a_2692)))((ok_2687($instance_502))(a_2692))
    } else if(($phi$330.$0.$tag==0)&&($phi$330.$1.$tag==0)){
      const $phi$334 = (($eq$eq($instance_447))($phi$330.$0.$1))($phi$330.$1.$1);
      if($phi$334){
        return (ok_2687($instance_502))(a_2692)
      } else if(!$phi$334){
        return (err_2688($instance_502))("type name mismatch")
      } else error("pattern match fail in //compiler/newtyper.jg at line 79, column 33",$phi$334)
    } else if(($phi$330.$0.$tag==2)&&($phi$330.$1.$tag==2)){
      const $phi$332 = (($eq$eq($instance_447))($phi$330.$0.$1))($phi$330.$1.$1);
      if($phi$332){
        return (ok_2687($instance_502))(a_2692)
      } else if(!$phi$332){
        return (err_2688($instance_502))("skolem mismatch")
      } else error("pattern match fail in //compiler/newtyper.jg at line 82, column 35",$phi$332)
    } else if(($phi$330.$0.$tag==3)&&($phi$330.$1.$tag==3)){
      return (($gt$gt$eq$gt$gt_2538($instance_502))(((unifyType_2552(ctx2_2686))($phi$330.$0.$1))($phi$330.$1.$1)))(fu_2720 => (($gt$gt$eq$gt$gt_2538($instance_502))(((unifyType_2552(ctx2_2686))($phi$330.$0.$2))($phi$330.$1.$2)))(xu_2721 => (ok_2687($instance_502))((tapp_2543(fu_2720))(xu_2721))))
    } else return (err_2688($instance_502))((("cannot unify "+(printType_2501(a_2692)))+" and ")+(printType_2501(b_2693)))
  }))
};
const tstr_2542 = (TConst_2454(emptyAnn_2469))("String");
const scopeTypesForGen_2559 = (foldTrie_2410(ts_2761 => __2762 => t_2763 => (push(t_2763))(ts_2761)))([]);
const scopeInsert_2557 = local$instance$Eq$1 => local$instance$Hashable$0 => (insert_2406(local$instance$Eq$1))(local$instance$Hashable$0);
const bindingsToScope_2566 = local$instance$Eq$1 => local$instance$Hashable$0 => foldl(s_2946 => $pat_2947 => ((((scopeInsert_2557(local$instance$Eq$1))(local$instance$Hashable$0))($pat_2947.$0))(getType_2460($pat_2947.$1)))(s_2946));
const splitBindings_2568 = bs_2969 => {
  const split_2970 = $pat_2971 => $pat_2974 => {
    const $phi$343 = getType_2460($pat_2974.$1);
    if($phi$343.$tag==7){
      return (Pair_2408((push((Pair_2408($pat_2974.$0))($pat_2974.$1)))($pat_2971.$0)))($pat_2971.$1)
    } else return (Pair_2408($pat_2971.$0))((push((Pair_2408($pat_2974.$0))($pat_2974.$1)))($pat_2971.$1))
  };
  return ((foldl(split_2970))((Pair_2408([]))([])))(bs_2969)
};
const prepareBindings_2569 = scope_2978 => bs_2979 => {
  const $pat_283_2_2980 = splitBindings_2568(bs_2979);
  let $phi$344;
  $phi$344 = $pat_283_2_2980.$1;
  const tbs_2981 = $phi$344;
  let $phi$345;
  $phi$345 = $pat_283_2_2980.$0;
  const ubs_2982 = $phi$345;
  const sortedBs_2984 = (concat(computeSCC_2567(ubs_2982)))((map(b_2989 => [b_2989]))(tbs_2981));
  const scope2_2983 = (((bindingsToScope_2566($instance_447))($instance_506))(scope_2978))(tbs_2981);
  return (Pair_2408(scope2_2983))(sortedBs_2984)
};
const tfun_2544 = a_2602 => b_2603 => (tapp_2543((tapp_2543((TConst_2454(emptyAnn_2469))("->")))(a_2602)))(b_2603);
const consType_2562 = dataType_2849 => argTypes_2850 => ((foldr(d_2851 => t_2852 => (tfun_2544(t_2852))(d_2851)))(dataType_2849))(argTypes_2850);
const freshName_2553 = (($gt$gt$eq($instance_502))(gets_2415))($pat_2723 => {
  const v_2728 = "$"+(intToString($pat_2723.$2));
  const n2_2729 = $pat_2723.$2+1;
  return (($gt$gt_2333($instance_502))(sets_2388((((US_2540($pat_2723.$0))($pat_2723.$1))(n2_2729))($pat_2723.$3))))((ret($instance_502))(v_2728))
});
const freshVar_2554 = ((fmap($instance_482))(TVar_2468(emptyAnn_2469)))(freshName_2553);
const resolveBound_2578 = $pat_3170 => (($gt$gt$eq($instance_502))(resolveType_2575($pat_3170.$2)))(t_3174 => (ret($instance_502))(((TCBound_2453($pat_3170.$0))($pat_3170.$1))(t_3174)));
const resolveBounds_2579 = (mapM_2390($instance_502))(resolveBound_2578);
const addRequiredBounds_2560 = bs_2764 => (($gt$gt$eq($instance_502))(gets_2415))($pat_2765 => sets_2388((((US_2540($pat_2765.$0))($pat_2765.$1))($pat_2765.$2))((concat($pat_2765.$3))(bs_2764))));
const instantiate_2556 = t_2732 => {
  const replaceSkolemsTB_2734 = reps_2738 => $pat_2739 => ((TCBound_2453($pat_2739.$0))($pat_2739.$1))((replaceSkolems_2507($pat_2739.$2))(reps_2738));
  const addRep_2733 = local$instance$Eq$1 => local$instance$Hashable$0 => reps_2735 => v_2736 => (($gt$gt$eq($instance_502))(freshVar_2554))(t_2737 => ($_2345(ret($instance_502)))(((((insert_2406(local$instance$Eq$1))(local$instance$Hashable$0))(v_2736))(t_2737))(reps_2735)));
  if(t_2732.$tag==6){
    return (($gt$gt$eq($instance_502))((((foldM_2370($instance_502))((addRep_2733($instance_447))($instance_506)))(Empty_2375))(t_2732.$1)))(reps_2747 => (($gt$gt$eq($instance_502))(resolveBounds_2579(t_2732.$2)))(bs_2748 => {
      const t2_2749 = (replaceSkolems_2507(t_2732.$3))(reps_2747);
      return (($gt$gt_2333($instance_502))(addRequiredBounds_2560((map(replaceSkolemsTB_2734(reps_2747)))(bs_2748))))((ret($instance_502))(t2_2749))
    }))
  } else return (ret($instance_502))(t_2732)
};
const resolveName_2558 = ctx_2751 => n_2752 => scope_2753 => {
  const $phi$352 = (((lookup_2407($instance_447))($instance_506))(n_2752))(scope_2753);
  if($phi$352.$tag==1){
    return (($gt$gt$eq($instance_502))(gets_2415))($pat_2754 => {
      const $phi$355 = (((lookup_2407($instance_447))($instance_506))(n_2752))($pat_2754.$0);
      if($phi$355.$tag==1){
        return ($_2345(ret($instance_502)))(Err_2529((Pair_2408(ctx_2751))("name not in scope: "+n_2752)))
      } else if($phi$355.$tag==0){
        return ($_2345((fmap($instance_482))(Ok_2537)))(instantiate_2556($phi$355.$0))
      } else error("pattern match fail in //compiler/newtyper.jg at line 131, column 7",$phi$355)
    })
  } else if($phi$352.$tag==0){
    return ($_2345((fmap($instance_482))(Ok_2537)))(instantiate_2556($phi$352.$0))
  } else error("pattern match fail in //compiler/newtyper.jg at line 129, column 3",$phi$352)
};
const tnum_2541 = (TConst_2454(emptyAnn_2469))("Number");
const inferPat_2563 = ctx_2853 => scope_2854 => p_2855 => {
  const ctx2_2856 = ($lt$lt_2511(ctx_2853))(__2860 => PatCtx_2516(p_2855));
  const ok_2857 = local$instance$Monad$0 => p_2861 => ($_2345(ret(local$instance$Monad$0)))(Ok_2537(p_2861));
  const finalize_2859 = p_2863 => t_2864 => {
    const $phi$357 = getPatType_2437(p_2863);
    if($phi$357.$tag==7){
      return (ok_2857($instance_502))((setPatType_2492(t_2864))(p_2863))
    } else return (($gt$gt$gt$gt_2527($instance_502))(((unifyType_2552(ctx2_2856))(t_2864))($phi$357)))((ok_2857($instance_502))(p_2863))
  };
  const err_2858 = local$instance$Monad$1 => m_2862 => ($_2345(ret(local$instance$Monad$1)))(Err_2529((Pair_2408(ctx2_2856))(m_2862)));
  if(p_2855.$tag==0){
    return (($gt$gt$eq($instance_502))(freshVar_2554))(finalize_2859(p_2855))
  } else if((p_2855.$tag==1)&&(p_2855.$1.$tag==0)){
    return (finalize_2859(p_2855))(tnum_2541)
  } else if((p_2855.$tag==1)&&(p_2855.$1.$tag==1)){
    return (finalize_2859(p_2855))(tstr_2542)
  } else if(p_2855.$tag==2){
    return (($gt$gt$eq$gt$gt_2538($instance_502))(((mapOkM_2533($instance_502))((inferPat_2563(ctx2_2856))(scope_2854)))(p_2855.$2)))(psi_2875 => (($gt$gt$eq($instance_502))(freshVar_2554))(dt_2876 => (($gt$gt$eq$gt$gt_2538($instance_502))(((resolveName_2558(ctx2_2856))(p_2855.$1))(scope_2854)))(ct_2877 => (($gt$gt$gt$gt_2527($instance_502))(((unifyType_2552(ctx2_2856))(ct_2877))((consType_2562(dt_2876))((map(getPatType_2437))(psi_2875)))))((finalize_2859(((PData_2485(p_2855.$0))(p_2855.$1))(psi_2875)))(dt_2876)))))
  } else error("pattern match fail in //compiler/newtyper.jg at line 220, column 6",p_2855)
};
const resolveRins_2580 = (($gt$gt$eq($instance_502))(gets_2415))($pat_3175 => (($gt$gt$eq($instance_502))(resolveBounds_2579($pat_3175.$3)))(rins2_3180 => sets_2388((((US_2540($pat_3175.$0))($pat_3175.$1))($pat_3175.$2))(rins2_3180))));
const varsInType_2545 = t_2604 => {
  if(t_2604.$tag==0){
    return Empty_2375
  } else if(t_2604.$tag==1){
    return (((setAdd_2424($instance_447))($instance_506))(t_2604.$1))(Empty_2375)
  } else if(t_2604.$tag==2){
    return Empty_2375
  } else if(t_2604.$tag==3){
    return (((setUnion_2379($instance_447))($instance_506))(varsInType_2545(t_2604.$1)))(varsInType_2545(t_2604.$2))
  } else if(t_2604.$tag==6){
    return varsInType_2545(t_2604.$3)
  } else return error("unsupported type in varsInType "+(jsonStringify(t_2604)))
};
const boundsWithVars_2582 = vs_3201 => {
  const inType_3203 = t_3208 => {
    if(t_3208.$tag==1){
      return (((setContains_2335($instance_447))($instance_506))(t_3208.$1))(vs_3201)
    } else if(t_3208.$tag==3){
      return (inType_3203(t_3208.$1))||(inType_3203(t_3208.$2))
    } else return false
  };
  const match_3202 = $pat_3204 => inType_3203($pat_3204.$2);
  return (($gt$gt$eq($instance_502))(gets_2415))($pat_3215 => (ret($instance_502))((filter(match_3202))($pat_3215.$3)))
};
const generalize_2583 = envTypes_3220 => t_3221 => {
  const gen_3223 = evs_3227 => t_3228 => {
    if(t_3228.$tag==0){
      return (ret($instance_502))((Pair_2408(t_3228))([]))
    } else if(t_3228.$tag==2){
      return (ret($instance_502))((Pair_2408(t_3228))([]))
    } else if(t_3228.$tag==3){
      return (($gt$gt$eq($instance_502))((gen_3223(evs_3227))(t_3228.$1)))($pat_3236 => (($gt$gt$eq($instance_502))((gen_3223(evs_3227))(t_3228.$2)))($pat_3239 => (ret($instance_502))((Pair_2408(((TApp_2451(t_3228.$0))($pat_3236.$0))($pat_3239.$0)))((concat($pat_3236.$1))($pat_3239.$1)))))
    } else if(t_3228.$tag==1){
      return (($gt$gt$eq($instance_502))(getVars_2551))(vars_3244 => {
        const $phi$366 = (Pair_2408((((lookup_2407($instance_447))($instance_506))(t_3228.$1))(vars_3244)))((((setContains_2335($instance_447))($instance_506))(t_3228.$1))(evs_3227));
        if($phi$366.$0.$tag==0){
          return (gen_3223(evs_3227))($phi$366.$0.$0)
        } else if($phi$366.$1){
          return (ret($instance_502))((Pair_2408(t_3228))([]))
        } else if(($phi$366.$0.$tag==1)&&(!$phi$366.$1)){
          const sk_3248 = (TSkolem_2462(emptyAnn_2469))(t_3228.$1);
          return (ret($instance_502))((Pair_2408(sk_3248))([t_3228.$1]))
        } else error("pattern match fail in //compiler/newtyper.jg at line 438, column 9",$phi$366)
      })
    } else error("pattern match fail in //compiler/newtyper.jg at line 430, column 5",t_3228)
  };
  const envVars_3222 = (((foldM_2370($instance_502))(vs_3224 => t_3225 => (($gt$gt$eq($instance_502))(resolveType_2575(t_3225)))(t_3226 => ($_2345(ret($instance_502)))((((setUnion_2379($instance_447))($instance_506))(vs_3224))(varsInType_2545(t_3226))))))(Empty_2375))(envTypes_3220);
  if(t_3221.$tag==6){
    return (ret($instance_502))((Pair_2408(t_3221.$1))(t_3221))
  } else return (($gt$gt$eq($instance_502))(envVars_3222))(evs_3254 => (($gt$gt$eq($instance_502))((gen_3223(evs_3254))(t_3221)))($pat_3255 => {
    const $phi$372 = length($pat_3255.$1);
    if(0==$phi$372){
      return (ret($instance_502))((Pair_2408([]))($pat_3255.$0))
    } else {
      const vsSet_3259 = (((setAddAll_2341($instance_447))($instance_506))($pat_3255.$1))(Empty_2375);
      return (($gt$gt$eq($instance_502))(boundsWithVars_2582(vsSet_3259)))(bs_3260 => {
        const tr_3261 = (((TForall_2447(emptyAnn_2469))($pat_3255.$1))(bs_3260))($pat_3255.$0);
        return (ret($instance_502))((Pair_2408($pat_3255.$1))(tr_3261))
      })
    }
  }))
};
const dropRins_2581 = vs_3181 => {
  const inType_3183 = t_3188 => {
    if(t_3188.$tag==1){
      return (((setContains_2335($instance_447))($instance_506))(t_3188.$1))(vs_3181)
    } else if(t_3188.$tag==3){
      return (inType_3183(t_3188.$1))||(inType_3183(t_3188.$2))
    } else return false
  };
  const match_3182 = $pat_3184 => inType_3183($pat_3184.$2);
  return (($gt$gt$eq($instance_502))(gets_2415))($pat_3195 => sets_2388((((US_2540($pat_3195.$0))($pat_3195.$1))($pat_3195.$2))((filter(i_3200 => not_2394(match_3182(i_3200))))($pat_3195.$3))))
};
const inferExpr_2561 = ctx_2770 => scope_2771 => e_2772 => {
  const ctx2_2773 = ($lt$lt_2511(ctx_2770))(__2777 => ExprCtx_2521(e_2772));
  const err_2775 = local$instance$Monad$0 => m_2779 => ($_2345(ret(local$instance$Monad$0)))(Err_2529((Pair_2408(ctx2_2773))(m_2779)));
  const ok_2774 = local$instance$Monad$1 => e_2778 => ($_2345(ret(local$instance$Monad$1)))(Ok_2537(e_2778));
  const finalize_2776 = e_2780 => t_2781 => {
    const $phi$377 = getType_2460(e_2780);
    if($phi$377.$tag==7){
      return (ok_2774($instance_502))((setType_2493(t_2781))(e_2780))
    } else if($phi$377.$tag==6){
      return (($gt$gt$gt$gt_2527($instance_502))(((unifyType_2552(ctx2_2773))(t_2781))($phi$377.$3)))((ok_2774($instance_502))(e_2780))
    } else return (($gt$gt$gt$gt_2527($instance_502))(((unifyType_2552(ctx2_2773))(t_2781))($phi$377)))((ok_2774($instance_502))(e_2780))
  };
  if((e_2772.$tag==1)&&(e_2772.$1.$tag==0)){
    return (finalize_2776(e_2772))(tnum_2541)
  } else if((e_2772.$tag==1)&&(e_2772.$1.$tag==1)){
    return (finalize_2776(e_2772))(tstr_2542)
  } else if(e_2772.$tag==0){
    return (($gt$gt$eq$gt$gt_2538($instance_502))(((resolveName_2558(ctx2_2773))(e_2772.$1))(scope_2771)))(finalize_2776(e_2772))
  } else if(e_2772.$tag==2){
    return (($gt$gt$eq$gt$gt_2538($instance_502))(((inferExpr_2561(ctx2_2773))(scope_2771))(e_2772.$1)))(fi_2796 => (($gt$gt$eq$gt$gt_2538($instance_502))(((inferExpr_2561(ctx2_2773))(scope_2771))(e_2772.$2)))(ai_2797 => (($gt$gt$eq($instance_502))(freshVar_2554))(v_2798 => (($gt$gt$gt$gt_2527($instance_502))(((unifyType_2552(ctx2_2773))(getType_2460(fi_2796)))((tfun_2544(getType_2460(ai_2797)))(v_2798))))((finalize_2776(((App_2428(e_2772.$0))(fi_2796))(ai_2797)))(v_2798)))))
  } else if(e_2772.$tag==3){
    return (($gt$gt$eq($instance_502))(freshVar_2554))(v_2802 => {
      let $phi$382;
      if("_"==e_2772.$1){
        $phi$382 = scope_2771
      } else $phi$382 = (((((scopeInsert_2557($instance_447))($instance_506))(e_2772.$1))(v_2802))(scope_2771));
      const scope2_2803 = $phi$382;
      return (($gt$gt$eq$gt$gt_2538($instance_502))(((inferExpr_2561(ctx2_2773))(scope2_2803))(e_2772.$2)))(ei_2805 => (finalize_2776(((Lam_2480(e_2772.$0))(e_2772.$1))(ei_2805)))((tfun_2544(v_2802))(getType_2460(ei_2805))))
    })
  } else if((e_2772.$tag==6)&&("Array"==e_2772.$1)){
    return (($gt$gt$eq$gt$gt_2538($instance_502))(((mapOkM_2533($instance_502))((inferExpr_2561(ctx2_2773))(scope_2771)))(e_2772.$2)))(esi_2808 => (($gt$gt$eq($instance_502))(freshVar_2554))(elemType_2809 => (($gt$gt$gt$gt_2527($instance_502))(((mapOkM_2533($instance_502))((unifyType_2552(ctx2_2773))(elemType_2809)))((map(getType_2460))(esi_2808))))((finalize_2776(((New_2427(e_2772.$0))("Array"))(esi_2808)))(((TApp_2451(emptyAnn_2469))((TConst_2454(emptyAnn_2469))("Array")))(elemType_2809)))))
  } else if(e_2772.$tag==6){
    return (($gt$gt$eq$gt$gt_2538($instance_502))(((mapOkM_2533($instance_502))((inferExpr_2561(ctx2_2773))(scope_2771)))(e_2772.$2)))(esi_2813 => (($gt$gt$eq($instance_502))(freshVar_2554))(dt_2814 => (($gt$gt$eq$gt$gt_2538($instance_502))(((resolveName_2558(ctx2_2773))(e_2772.$1))(scope_2771)))(ct_2815 => (($gt$gt$gt$gt_2527($instance_502))(((unifyType_2552(ctx2_2773))(ct_2815))((consType_2562(dt_2814))((map(getType_2460))(esi_2813)))))((finalize_2776(((New_2427(e_2772.$0))(e_2772.$1))(esi_2813)))(dt_2814)))))
  } else if(e_2772.$tag==4){
    const collectBindings_2819 = scope_2821 => p_2822 => {
      if(p_2822.$tag==1){
        return scope_2821
      } else if((p_2822.$tag==0)&&("_"==p_2822.$1)){
        return scope_2821
      } else if(p_2822.$tag==0){
        return ((((scopeInsert_2557($instance_447))($instance_506))(p_2822.$1))(getPatType_2437(p_2822)))(scope_2821)
      } else if(p_2822.$tag==2){
        return ((foldl(collectBindings_2819))(scope_2821))(p_2822.$2)
      } else error("pattern match fail in //compiler/newtyper.jg at line 191, column 9",p_2822)
    };
    const inferCase_2820 = pt_2831 => rt_2832 => $pat_2833 => (($gt$gt$eq$gt$gt_2538($instance_502))(((inferPat_2563(ctx2_2773))(scope_2771))($pat_2833.$0)))(pi_2836 => (($gt$gt$eq$gt$gt_2538($instance_502))(((unifyType_2552(ctx2_2773))(pt_2831))(getPatType_2437(pi_2836))))(__2837 => (($gt$gt$eq$gt$gt_2538($instance_502))(((inferExpr_2561(ctx2_2773))((collectBindings_2819(scope_2771))(pi_2836)))($pat_2833.$1)))(ei_2838 => (($gt$gt$gt$gt_2527($instance_502))(((unifyType_2552(ctx2_2773))(rt_2832))(getType_2460(ei_2838))))((ok_2774($instance_502))((Pair_2408(pi_2836))(ei_2838))))));
    return (($gt$gt$eq$gt$gt_2538($instance_502))(((inferExpr_2561(ctx2_2773))(scope_2771))(e_2772.$1)))(ei_2839 => (($gt$gt$eq($instance_502))(freshVar_2554))(rt_2840 => (($gt$gt$eq$gt$gt_2538($instance_502))(((mapOkM_2533($instance_502))((inferCase_2820(getType_2460(ei_2839)))(rt_2840)))(e_2772.$2)))(psi_2841 => (finalize_2776(((Case_2459(e_2772.$0))(ei_2839))(psi_2841)))(rt_2840))))
  } else if(e_2772.$tag==5){
    return (($gt$gt$eq$gt$gt_2538($instance_502))(((inferBindings_2570(ctx2_2773))(scope_2771))(e_2772.$1)))($pat_2845 => (($gt$gt$eq$gt$gt_2538($instance_502))(((inferExpr_2561(ctx2_2773))($pat_2845.$0))(e_2772.$2)))(ei_2848 => (finalize_2776(((Let_2488(e_2772.$0))($pat_2845.$1))(ei_2848)))(getType_2460(ei_2848))))
  } else error("pattern match fail in //compiler/newtyper.jg at line 162, column 6",e_2772)
};
const inferBindings_2570 = ctx_2990 => scope_2991 => bs_2992 => {
  const infer_2996 = $pat_3001 => bs_3004 => (($gt$gt$eq$gt$gt_2538($instance_502))(((inferMRG_2571(ctx_2990))($pat_3001.$0))(bs_3004)))(bsi_3005 => (ret($instance_502))(Ok_2537((Pair_2408((((bindingsToScope_2566($instance_447))($instance_506))($pat_3001.$0))(bsi_3005)))((concat($pat_3001.$1))(bsi_3005)))));
  const $pat_292_2_2993 = (prepareBindings_2569(scope_2991))(bs_2992);
  let $phi$384;
  $phi$384 = $pat_292_2_2993.$0;
  const scope2_2995 = $phi$384;
  let $phi$385;
  $phi$385 = $pat_292_2_2993.$1;
  const bs2_2994 = $phi$385;
  return (($gt$gt$eq$gt$gt_2538($instance_502))((((foldOkM_2532($instance_502))(infer_2996))((Pair_2408(scope2_2995))([])))(bs2_2994)))($pat_3006 => (ret($instance_502))(Ok_2537((Pair_2408($pat_3006.$0))($pat_3006.$1))))
};
const inferMRG_2571 = ctx_3009 => scope_3010 => bs_3011 => {
  const add_3013 = local$instance$Eq$1 => local$instance$Hashable$0 => $pat_3018 => $pat_3021 => {
    const $phi$390 = getType_2460($pat_3021.$1);
    if($phi$390.$tag==7){
      return (($gt$gt$eq($instance_502))(freshVar_2554))(t_3024 => (ret($instance_502))((Pair_2408(((((scopeInsert_2557(local$instance$Eq$1))(local$instance$Hashable$0))($pat_3021.$0))(t_3024))($pat_3018.$0)))((push((Pair_2408($pat_3021.$0))((setType_2493(t_3024))($pat_3021.$1))))($pat_3018.$1))))
    } else return (ret($instance_502))((Pair_2408(((((scopeInsert_2557(local$instance$Eq$1))(local$instance$Hashable$0))($pat_3021.$0))($phi$390))($pat_3018.$0)))((push((Pair_2408($pat_3021.$0))($pat_3021.$1)))($pat_3018.$1)))
  };
  const genB_3015 = $pat_3032 => $pat_3035 => (($gt$gt$eq($instance_502))((generalize_2583(scopeTypesForGen_2559(scope_3010)))(getType_2460($pat_3035.$1))))($pat_3038 => (ret($instance_502))((Pair_2408((concat($pat_3032.$0))($pat_3038.$0)))((push((Pair_2408($pat_3035.$0))((setType_2493($pat_3038.$1))($pat_3035.$1))))($pat_3032.$1))));
  const ctx2_3012 = ($lt$lt_2511(ctx_3009))(__3017 => MRGCtx_2517((map(fst_2356))(bs_3011)));
  const inferB_3014 = scope_3026 => $pat_3027 => (($gt$gt$eq$gt$gt_2538($instance_502))(((inferExpr_2561(($lt$lt_2511(ctx2_3012))(__3030 => BindingCtx_2512($pat_3027.$0))))(scope_3026))($pat_3027.$1)))(ei_3031 => (ret($instance_502))(Ok_2537((Pair_2408($pat_3027.$0))(ei_3031))));
  const setGenVar_3016 = v_3041 => (setVar_2550(v_3041))((TSkolem_2462(emptyAnn_2469))(v_3041));
  return (($gt$gt$eq($instance_502))((((foldM_2370($instance_502))((add_3013($instance_447))($instance_506)))((Pair_2408(scope_3010))([])))(bs_3011)))($pat_3042 => (($gt$gt$eq$gt$gt_2538($instance_502))(((mapOkM_2533($instance_502))(inferB_3014($pat_3042.$0)))($pat_3042.$1)))(bsi_3045 => (($gt$gt$eq($instance_502))(resolveRins_2580))(__3046 => (($gt$gt$eq($instance_502))((((foldM_2370($instance_502))(genB_3015))((Pair_2408([]))([])))(bsi_3045)))($pat_3047 => (($gt$gt_2333($instance_502))((($gt$gt_2333($instance_502))(dropRins_2581((((setAddAll_2341($instance_447))($instance_506))($pat_3047.$0))(Empty_2375))))(((mapM_2390($instance_502))(setGenVar_3016))($pat_3047.$0))))((ret($instance_502))(Ok_2537($pat_3047.$1)))))))
};
const inferInstances_2594 = ctx_3423 => scope_3424 => ins_3425 => cs_3426 => defs_3427 => {
  const findClass_3428 = c_3430 => {
    const $phi$399 = (find_2405($pat_3431 => (($eq$eq($instance_447))(c_3430))($pat_3431.$1)))(cs_3426);
    if($phi$399.$tag==0){
      return Ok_2537($phi$399.$0)
    } else if($phi$399.$tag==1){
      return Err_2529((Pair_2408(ctx_3423))("no class found"))
    } else error("pattern match fail in //compiler/newtyper.jg at line 553, column 17",$phi$399)
  };
  const inferInstance_3429 = $pat_3437 => (($gt$gt$eq($instance_677))(findClass_3428($pat_3437.$1.$1)))($pat_3443 => {
    const bsts_3448 = ((foldl(m_3455 => $pat_3456 => ((((insert_2406($instance_447))($instance_506))($pat_3456.$0))(((replaceSkolem_2548($pat_3443.$2))($pat_3437.$1.$2))($pat_3456.$1)))(m_3455)))(Empty_2375))($pat_3443.$3);
    const bs2_3449 = (map($pat_3459 => (Pair_2408($pat_3459.$0))((setType_2493(($_2345(fromJust_2404))((((lookup_2407($instance_447))($instance_506))($pat_3459.$0))(bsts_3448))))($pat_3459.$1))))($pat_3437.$1.$3);
    const $pat_559_6_3450 = (runState_2351((((US_2540(Empty_2375))(Empty_2375))(1))([])))(((inferMRG_2571(ctx_3423))(scope_3424))(bs2_3449));
    let $phi$404;
    $phi$404 = $pat_559_6_3450.$0.$2;
    const __3451 = $phi$404;
    let $phi$405;
    $phi$405 = $pat_559_6_3450.$0.$1;
    const vars_3454 = $phi$405;
    let $phi$406;
    $phi$406 = $pat_559_6_3450.$1;
    const bsi_3452 = $phi$406;
    let $phi$407;
    $phi$407 = $pat_559_6_3450.$0.$3;
    const rins_3453 = $phi$407;
    return (($gt$gt$eq($instance_677))(bsi_3452))(bsi_3482 => (($gt$gt$eq($instance_677))((((finalizeBindings_2588(ctx_3423))(vars_3454))(ins_3425))(bsi_3482)))(bsf_3483 => (ret($instance_677))((Pair_2408($pat_3437.$0))((((Instance_2471($pat_3437.$1.$0))($pat_3437.$1.$1))($pat_3437.$1.$2))(bsf_3483)))))
  });
  return ((mapM_2390($instance_677))(inferInstance_3429))(defs_3427)
};
const processInstances_2591 = defs_3402 => (map($pat_3403 => instFromDef_2590($pat_3403.$1)))(defs_3402);
const inferTopMRG_2573 = ctx_3054 => scope_3055 => ins_3056 => bs_3057 => {
  const $pat_328_2_3058 = (runState_2351((((US_2540(scope_3055))(Empty_2375))(1))([])))(((inferMRG_2571(ctx_3054))(Empty_2375))(bs_3057));
  let $phi$409;
  $phi$409 = $pat_328_2_3058.$1;
  const bsi_3060 = $phi$409;
  let $phi$410;
  $phi$410 = $pat_328_2_3058.$0.$3;
  const rins_3061 = $phi$410;
  const checkSatisfied_3063 = ctx_3084 => b_3085 => {
    const ctx2_3086 = ($lt$lt_2511(ctx_3084))(__3087 => TypeBoundCtx_2514(b_3085));
    return (($gt$gt$eq($instance_677))(((hasMatchingInstance_2572(ctx2_3086))(ins_3056))(b_3085)))(m_3088 => {
      if(m_3088){
        return Ok_2537(Unit_2348)
      } else if(!m_3088){
        return Err_2529((Pair_2408(ctx2_3086))("no matching instances among "+(jsonStringify((map(printInst_2505))(ins_3056)))))
      } else error("pattern match fail in //compiler/newtyper.jg at line 332, column 49",m_3088)
    })
  };
  let $phi$412;
  $phi$412 = $pat_328_2_3058.$0.$1;
  const vars_3062 = $phi$412;
  let $phi$413;
  $phi$413 = $pat_328_2_3058.$0.$2;
  const __3059 = $phi$413;
  return (($gt$gt$eq($instance_677))((($gt$gt$eq($instance_677))(bsi_3060))(((finalizeBindings_2588(ctx_3054))(vars_3062))(ins_3056))))(bsf_3089 => {
    const ctx2_3090 = ($lt$lt_2511(ctx_3054))(__3091 => FinMRGCtx_2520((map($pat_3092 => (Pair_2408($pat_3092.$0))(getType_2460($pat_3092.$1))))(bsf_3089)));
    return (($gt$gt_2333($instance_677))((($gt$gt$eq($instance_677))(((mapM_2390($instance_677))(((finalizeTypeBound_2585(ctx2_3090))(vars_3062))(ins_3056)))(rins_3061)))((mapM_2390($instance_677))(checkSatisfied_3063(ctx2_3090)))))(Ok_2537(bsf_3089))
  })
};
const inferTopBindings_2574 = ctx_3095 => scope_3096 => ins_3097 => bs_3098 => {
  const $pat_339_2_3099 = (prepareBindings_2569(scope_3096))(bs_3098);
  let $phi$415;
  $phi$415 = $pat_339_2_3099.$1;
  const bs2_3100 = $phi$415;
  const infer_3102 = $pat_3107 => bs_3110 => (($gt$gt$eq($instance_677))((((inferTopMRG_2573(ctx_3095))($pat_3107.$0))(ins_3097))(bs_3110)))(bsi_3111 => Ok_2537((Pair_2408((((bindingsToScope_2566($instance_447))($instance_506))($pat_3107.$0))(bsi_3111)))((concat($pat_3107.$1))(bsi_3111))));
  let $phi$417;
  $phi$417 = $pat_339_2_3099.$0;
  const scope2_3101 = $phi$417;
  return ($_2345((fmap($instance_672))($pat_3112 => $pat_3112.$1)))((((foldM_2370($instance_677))(infer_3102))((Pair_2408(scope2_3101))([])))(bs2_3100))
};
const printErr_2595 = $pat_3484 => {
  if($pat_3484.$tag==1){
    return (join_2364((push($pat_3484.$0.$1))((((concatMap_2361($instance_452))($instance_450))(printCtx_2522))(resolveCtx_2524($pat_3484.$0.$0)))))("\n")
  } else error("pattern match fail in //compiler/newtyper.jg at line 564, column 1",$pat_3484)
};
const processImports_2589 = ms_3368 => imports_3369 => {
  const processImport_3370 = $pat_3371 => {
    if($pat_3371.$tag==1){
      const $phi$422 = (get($pat_3371.$1))(ms_3368);
      const ins_3379 = (map(snd_2362))(trieEntries_2402($phi$422.$2));
      const bs_3378 = ((foldl(m_3380 => $pat_3381 => ((((insert_2406($instance_447))($instance_506))($pat_3381.$1))(($_2345(fromJust_2404))((((lookup_2407($instance_447))($instance_506))($pat_3381.$0))($phi$422.$0))))(m_3380)))(Empty_2375))($pat_3371.$2);
      return ((Tuple3_2367(bs_3378))(ins_3379))($phi$422.$1)
    } else error("pattern match fail in //compiler/newtyper.jg at line 530, column 3",$pat_3371)
  };
  return ((foldl($pat_3384 => i_3388 => {
    const $phi$426 = processImport_3370(i_3388);
    return ((Tuple3_2367((((mergeTrie_2392($instance_447))($instance_506))($pat_3384.$0))($phi$426.$0)))((concat($pat_3384.$1))($phi$426.$1)))((concat($pat_3384.$2))($phi$426.$2))
  }))(((Tuple3_2367(Empty_2375))([]))([])))(imports_3369)
};
const processClass_2592 = scope_3406 => $pat_3407 => {
  const tbs_3412 = [((TCBound_2453(emptyAnn_2469))($pat_3407.$1))((TSkolem_2462(emptyAnn_2469))($pat_3407.$2))];
  const process_3413 = local$instance$Eq$1 => local$instance$Hashable$0 => scope_3414 => $pat_3415 => {
    const $phi$430 = wrapForall_2510($pat_3415.$1);
    if($phi$430.$tag==6){
      return ((((insert_2406(local$instance$Eq$1))(local$instance$Hashable$0))($pat_3415.$0))((((TForall_2447($phi$430.$0))($phi$430.$1))(tbs_3412))($phi$430.$3)))(scope_3414)
    } else error("pattern match fail in //compiler/newtyper.jg at line 546, column 26",$phi$430)
  };
  return ((foldl((process_3413($instance_447))($instance_506)))(scope_3406))($pat_3407.$3)
};
const processClasses_2593 = cs_3422 => ((foldl(processClass_2592))(Empty_2375))(cs_3422);
const inferModule_2596 = ms_3487 => $pat_3488 => {
  const $pat_567_2_3497 = (processImports_2589(ms_3487))($pat_3488.$2);
  let $phi$432;
  $phi$432 = $pat_567_2_3497.$1;
  const importedInstances_3499 = $phi$432;
  const localInstances_3502 = processInstances_2591($pat_3488.$5);
  const instances_3504 = (concat(importedInstances_3499))(localInstances_3502);
  let $phi$433;
  $phi$433 = $pat_567_2_3497.$2;
  const importedClasses_3498 = $phi$433;
  const classes_3501 = (concat(importedClasses_3498))($pat_3488.$4);
  const ctx_3496 = __3507 => [ModuleCtx_2525($pat_3488.$1)];
  const classScope_3503 = processClasses_2593(classes_3501);
  let $phi$434;
  $phi$434 = $pat_567_2_3497.$0;
  const importedScope_3500 = $phi$434;
  const scope_3505 = (((mergeTrie_2392($instance_447))($instance_506))(importedScope_3500))(classScope_3503);
  const result_3506 = (($gt$gt$eq($instance_677))((((inferTopBindings_2574(ctx_3496))(scope_3505))(instances_3504))($pat_3488.$6)))(typedBindings_3517 => (($gt$gt$eq($instance_677))(((((inferInstances_2594(ctx_3496))((((bindingsToScope_2566($instance_447))($instance_506))(scope_3505))(typedBindings_3517)))(instances_3504))(classes_3501))($pat_3488.$5)))(typedInstanceDefs_3518 => ($_2345(ret($instance_677)))(((((((Module_2449($pat_3488.$0))($pat_3488.$1))($pat_3488.$2))($pat_3488.$3))($pat_3488.$4))(typedInstanceDefs_3518))(typedBindings_3517))));
  if(result_3506.$tag==0){
    return (Pair_2408(result_3506.$0))(moduleExports_2597(result_3506.$0))
  } else if(result_3506.$tag==1){
    return error(printErr_2595(result_3506))
  } else error("pattern match fail in //compiler/newtyper.jg at line 582, column 6",result_3506)
};
const esolveType2_2577 = t_3147 => {
  const changed_3148 = a_3150 => b_3151 => {
    if(a_3150.$tag==1){
      if(b_3151.$tag==1){
        return (($div$eq_2383($instance_447))(a_3150.$1))(b_3151.$1)
      } else return true
    } else return true
  };
  const resolve_3149 = t_3158 => {
    if(t_3158.$tag==1){
      return (($gt$gt$eq($instance_502))(getVars_2551))(vars_3161 => {
        const $phi$440 = (((lookup_2407($instance_447))($instance_506))(t_3158.$1))(vars_3161);
        if($phi$440.$tag==1){
          return (ret($instance_502))(t_3158)
        } else if($phi$440.$tag==0){
          return (($gt$gt$eq($instance_502))(resolve_3149($phi$440.$0)))(t2_3163 => {
            const $phi$442 = (changed_3148($phi$440.$0))(t2_3163);
            if(!$phi$442){
              return (ret($instance_502))($phi$440.$0)
            } else if($phi$442){
              return (($gt$gt_2333($instance_502))((setVar_2550(t_3158.$1))(t2_3163)))((ret($instance_502))(t2_3163))
            } else error("pattern match fail in //compiler/newtyper.jg at line 391, column 13",$phi$442)
          })
        } else error("pattern match fail in //compiler/newtyper.jg at line 388, column 9",$phi$440)
      })
    } else if(t_3158.$tag==3){
      return (($gt$gt$eq($instance_502))(resolve_3149(t_3158.$1)))(fr_3167 => (($gt$gt$eq($instance_502))(resolve_3149(t_3158.$2)))(ar_3168 => ($_2345(ret($instance_502)))(((TApp_2451(t_3158.$0))(fr_3167))(ar_3168))))
    } else return (ret($instance_502))(t_3158)
  };
  return resolve_3149(t_3147)
};
const forceType_2549 = t_2655 => {
  const changed_2656 = a_2657 => b_2658 => {
    if(a_2657.$tag==1){
      if(b_2658.$tag==1){
        return (($div$eq_2383($instance_447))(a_2657.$1))(b_2658.$1)
      } else return true
    } else return false
  };
  if(t_2655.$tag==1){
    return (($gt$gt$eq($instance_502))(getVars_2551))(vars_2667 => {
      const $phi$447 = (((lookup_2407($instance_447))($instance_506))(t_2655.$1))(vars_2667);
      if($phi$447.$tag==1){
        return (ret($instance_502))(t_2655)
      } else if($phi$447.$tag==0){
        return (($gt$gt$eq($instance_502))(forceType_2549($phi$447.$0)))(t2_2669 => {
          const $phi$449 = (changed_2656($phi$447.$0))(t2_2669);
          if($phi$449){
            return (($gt$gt_2333($instance_502))((setVar_2550(t_2655.$1))(t2_2669)))((ret($instance_502))(t2_2669))
          } else if(!$phi$449){
            return (ret($instance_502))(t2_2669)
          } else error("pattern match fail in //compiler/newtyper.jg at line 57, column 11",$phi$449)
        })
      } else error("pattern match fail in //compiler/newtyper.jg at line 54, column 7",$phi$447)
    })
  } else return (ret($instance_502))(t_2655)
};
const head_3540 = head_46;
const $gt$gt_3541 = $gt$gt_21;
const size_3542 = size_72;
const setContains_3543 = setContains_82;
const uniq_3544 = uniq_51;
const all_3545 = all_38;
const mconcat_3546 = mconcat_22;
const zip_3547 = zip_43;
const $lt$eq_3548 = $lt$eq_19;
const setAddAll_3549 = setAddAll_80;
const BitmapIndexed_3550 = BitmapIndexed_14;
const reverse_3551 = reverse_52;
const isEmpty_3552 = isEmpty_73;
const $_3553 = $_16;
const remove_3554 = remove_69;
const forM_3555 = forM_58;
const Unit_3556 = Unit_0;
const loop_3557 = loop_32;
const either_3558 = either_29;
const runState_3559 = runState_61;
const assert_3560 = assert_94;
const setRemove_3561 = setRemove_81;
const zipWithIndex2_3562 = zipWithIndex2_41;
const Left_3563 = Left_8;
const fst_3564 = fst_27;
const setDiff_3565 = setDiff_85;
const insertAll_3566 = insertAll_77;
const mapJust_3567 = mapJust_45;
const maybe_3568 = maybe_23;
const concatMap_3569 = concatMap_44;
const snd_3570 = snd_28;
const mergeSet_3571 = mergeSet_50;
const join_3572 = join_39;
const setIntersection_3573 = setIntersection_86;
const zipWithIndex_3574 = zipWithIndex_42;
const Tuple3_3575 = Tuple3_4;
const mapFst_3576 = mapFst_92;
const mapIx_3577 = mapIx_35;
const foldM_3578 = foldM_56;
const Just_3579 = Just_1;
const Tuple4_3580 = Tuple4_5;
const toRecord_3581 = toRecord_54;
const hamtMask_3582 = hamtMask_64;
const Empty_3583 = Empty_11;
const strToArray_3584 = strToArray_55;
const Tuple5_3585 = Tuple5_6;
const mapSnd_3586 = mapSnd_93;
const setUnion_3587 = setUnion_83;
const Nothing_3588 = Nothing_2;
const trieKeys_3589 = trieKeys_75;
const Tuple6_3590 = Tuple6_7;
const $div$eq_3591 = $div$eq_17;
const justOr_3592 = justOr_24;
const tail_3593 = tail_47;
const init_3594 = init_49;
const debugIf_3595 = debugIf_88;
const sets_3596 = sets_60;
const State_3597 = State_10;
const mapM_3598 = mapM_57;
const hamtIndex_3599 = hamtIndex_65;
const mergeTrie_3600 = mergeTrie_74;
const Collision_3601 = Collision_13;
const not_3602 = not_31;
const evalState_3603 = evalState_62;
const debugMaybe_3604 = debugMaybe_89;
const containsChar_3605 = containsChar_36;
const emptySet_3606 = emptySet_78;
const updateOrSet_3607 = updateOrSet_68;
const isJust_3608 = isJust_26;
const last_3609 = last_48;
const trieEntries_3610 = trieEntries_76;
const mapTrie_3611 = mapTrie_71;
const fromJust_3612 = fromJust_25;
const find_3613 = find_34;
const insert_3614 = insert_67;
const lookup_3615 = lookup_66;
const Pair_3616 = Pair_3;
const repeat_3617 = repeat_40;
const foldTrie_3618 = foldTrie_70;
const exists_3619 = exists_37;
const setToArray_3620 = setToArray_84;
const Right_3621 = Right_9;
const debugWrap_3622 = debugWrap_90;
const gets_3623 = gets_59;
const $gt_3624 = $gt_18;
const Identity_3625 = Identity_15;
const popCount_3626 = popCount_63;
const dedup_3627 = dedup_53;
const Leaf_3628 = Leaf_12;
const debug2_3629 = debug2_87;
const $gt$eq$gt_3630 = $gt$eq$gt_91;
const splitEither_3631 = splitEither_30;
const setAdd_3632 = setAdd_79;
const contains_3633 = contains_33;
const $gt$eq_3634 = $gt$eq_20;
const New_3635 = New_785;
const App_3636 = App_781;
const down_3637 = down_840;
const dataConName_3638 = dataConName_829;
const CNum_3639 = CNum_786;
const Const_3640 = Const_780;
const getAnnType_3641 = getAnnType_816;
const TRow_3642 = TRow_803;
const Inst_3643 = Inst_797;
const printCodeLoc_3644 = printCodeLoc_820;
const getPatType_3645 = getPatType_835;
const Var_3646 = Var_779;
const getAnnCodeLoc_3647 = getAnnCodeLoc_818;
const equivBound_3648 = equivBound_823;
const AnnUseCount_3649 = AnnUseCount_775;
const Data_3650 = Data_793;
const AnnData_3651 = AnnData_776;
const exprLoc_3652 = exprLoc_821;
const getAnn_3653 = getAnn_811;
const downM_3654 = downM_845;
const TForall_3655 = TForall_805;
const copyAnn_3656 = copyAnn_813;
const Module_3657 = Module_791;
const ModuleInterface_3658 = ModuleInterface_792;
const TApp_3659 = TApp_802;
const CStr_3660 = CStr_787;
const TCBound_3661 = TCBound_798;
const TConst_3662 = TConst_799;
const ImportOpen_3663 = ImportOpen_808;
const equivType_3664 = equivType_828;
const dataConNames_3665 = dataConNames_830;
const downAndUp_3666 = downAndUp_838;
const Case_3667 = Case_783;
const getType_3668 = getType_834;
const ImportClosed_3669 = ImportClosed_807;
const TSkolem_3670 = TSkolem_801;
const breakableDownM_3671 = breakableDownM_846;
const upM_3672 = upM_844;
const AnnCodeLoc_3673 = AnnCodeLoc_774;
const TBot_3674 = TBot_804;
const PConst_3675 = PConst_789;
const TVar_3676 = TVar_800;
const emptyAnn_3677 = emptyAnn_810;
const setAnnCodeLoc_3678 = setAnnCodeLoc_819;
const Instance_3679 = Instance_796;
const AnnExport_3680 = AnnExport_778;
const TUnknown_3681 = TUnknown_806;
const breakableDownAndUpM_3682 = breakableDownAndUpM_842;
const namesInPat_3683 = namesInPat_822;
const breakableDownAndUp_3684 = breakableDownAndUp_837;
const PVar_3685 = PVar_788;
const DataCon_3686 = DataCon_794;
const Class_3687 = Class_795;
const Lam_3688 = Lam_782;
const annOf_3689 = annOf_832;
const setAnnType_3690 = setAnnType_817;
const AnnTag_3691 = AnnTag_777;
const compareBound_3692 = compareBound_827;
const PData_3693 = PData_790;
const getAnnE_3694 = getAnnE_814;
const AnnType_3695 = AnnType_773;
const Let_3696 = Let_784;
const up_3697 = up_839;
const breakableDown_3698 = breakableDown_841;
const withAnn_3699 = withAnn_833;
const setPatType_3700 = setPatType_836;
const setType_3701 = setType_831;
const compareArr_3702 = compareArr_825;
const ImportAll_3703 = ImportAll_809;
const compareOrd_3704 = compareOrd_824;
const downAndUpM_3705 = downAndUpM_843;
const hasAnnE_3706 = hasAnnE_815;
const compareType_3707 = compareType_826;
const setAnn_3708 = setAnn_812;
const CompilerState_3709 = $_0_3719 => $_1_3720 => $_2_3721 => ({$0:$_0_3719,$1:$_1_3720,$2:$_2_3721});
const perModule_3714 = local$instance$Monad$0 => mapM_3598(local$instance$Monad$0);
const getExports_3710 = (($gt$gt$eq($instance_502))(gets_3623))(s_3722 => (ret($instance_502))(s_3722.$0));
const reportTimes_3718 = i_3757 => (($gt$gt$eq($instance_502))(gets_3623))(s_3758 => {
  const report_3762 = i_3763 => n_3764 => ts_3765 => {
    const total_3767 = ((foldl($add))(0))(ts_3765);
    const count_3766 = length(ts_3765);
    const msg_3768 = ((((("# pass <"+n_3764)+"> executed ")+(intToString(count_3766)))+" times, total runtime ")+(intToString(total_3767)))+"ms";
    return (debug2_3629(msg_3768))(i_3763)
  };
  return (ret($instance_502))(((foldTrie_3618(report_3762))(i_3757))(s_3758.$2))
});
const setUid_3713 = uid_3735 => (($gt$gt$eq($instance_502))(gets_3623))(s_3736 => sets_3596(((CompilerState_3709(s_3736.$0))(uid_3735))(s_3736.$2)));
const timingStart_3715 = n_3740 => (($gt$gt$eq($instance_502))(gets_3623))(s_3741 => {
  const nts_3745 = (justOr_3592([]))((((lookup_3615($instance_447))($instance_506))(n_3740))(s_3741.$2));
  return sets_3596(((CompilerState_3709(s_3741.$0))(s_3741.$1))(((((insert_3614($instance_447))($instance_506))(n_3740))((push(currentTimeMs(Unit_3556)))(nts_3745)))(s_3741.$2)))
});
const timingEnd_3716 = n_3746 => (($gt$gt$eq($instance_502))(gets_3623))(s_3747 => {
  const nts_3751 = (justOr_3592([]))((((lookup_3615($instance_447))($instance_506))(n_3746))(s_3747.$2));
  const start_3752 = last_3609(nts_3751);
  return sets_3596(((CompilerState_3709(s_3747.$0))(s_3747.$1))(((((insert_3614($instance_447))($instance_506))(n_3746))((push((currentTimeMs(Unit_3556))-start_3752))(init_3594(nts_3751))))(s_3747.$2)))
});
const timed_3717 = n_3753 => p_3754 => i_3755 => (($gt$gt$eq($instance_502))((($gt$gt_3541($instance_502))(timingStart_3715(n_3753)))(p_3754(i_3755))))(o_3756 => (($gt$gt_3541($instance_502))(timingEnd_3716(n_3753)))((ret($instance_502))(o_3756)));
const getUid_3712 = (($gt$gt$eq($instance_502))(gets_3623))(s_3731 => (ret($instance_502))(s_3731.$1));
const setExports_3711 = ex_3726 => (($gt$gt$eq($instance_502))(gets_3623))(s_3727 => sets_3596(((CompilerState_3709(ex_3726))(s_3727.$1))(s_3727.$2)));
const head_3769 = head_46;
const $gt$gt_3770 = $gt$gt_21;
const size_3771 = size_72;
const setContains_3772 = setContains_82;
const uniq_3773 = uniq_51;
const all_3774 = all_38;
const mconcat_3775 = mconcat_22;
const zip_3776 = zip_43;
const $lt$eq_3777 = $lt$eq_19;
const setAddAll_3778 = setAddAll_80;
const BitmapIndexed_3779 = BitmapIndexed_14;
const reverse_3780 = reverse_52;
const isEmpty_3781 = isEmpty_73;
const $_3782 = $_16;
const remove_3783 = remove_69;
const forM_3784 = forM_58;
const Unit_3785 = Unit_0;
const loop_3786 = loop_32;
const either_3787 = either_29;
const runState_3788 = runState_61;
const assert_3789 = assert_94;
const setRemove_3790 = setRemove_81;
const zipWithIndex2_3791 = zipWithIndex2_41;
const Left_3792 = Left_8;
const fst_3793 = fst_27;
const setDiff_3794 = setDiff_85;
const insertAll_3795 = insertAll_77;
const mapJust_3796 = mapJust_45;
const maybe_3797 = maybe_23;
const concatMap_3798 = concatMap_44;
const snd_3799 = snd_28;
const mergeSet_3800 = mergeSet_50;
const join_3801 = join_39;
const setIntersection_3802 = setIntersection_86;
const zipWithIndex_3803 = zipWithIndex_42;
const Tuple3_3804 = Tuple3_4;
const mapFst_3805 = mapFst_92;
const mapIx_3806 = mapIx_35;
const foldM_3807 = foldM_56;
const Just_3808 = Just_1;
const Tuple4_3809 = Tuple4_5;
const toRecord_3810 = toRecord_54;
const hamtMask_3811 = hamtMask_64;
const Empty_3812 = Empty_11;
const strToArray_3813 = strToArray_55;
const Tuple5_3814 = Tuple5_6;
const mapSnd_3815 = mapSnd_93;
const setUnion_3816 = setUnion_83;
const Nothing_3817 = Nothing_2;
const trieKeys_3818 = trieKeys_75;
const Tuple6_3819 = Tuple6_7;
const $div$eq_3820 = $div$eq_17;
const justOr_3821 = justOr_24;
const tail_3822 = tail_47;
const init_3823 = init_49;
const debugIf_3824 = debugIf_88;
const sets_3825 = sets_60;
const State_3826 = State_10;
const mapM_3827 = mapM_57;
const hamtIndex_3828 = hamtIndex_65;
const mergeTrie_3829 = mergeTrie_74;
const Collision_3830 = Collision_13;
const not_3831 = not_31;
const evalState_3832 = evalState_62;
const debugMaybe_3833 = debugMaybe_89;
const containsChar_3834 = containsChar_36;
const emptySet_3835 = emptySet_78;
const updateOrSet_3836 = updateOrSet_68;
const isJust_3837 = isJust_26;
const last_3838 = last_48;
const trieEntries_3839 = trieEntries_76;
const mapTrie_3840 = mapTrie_71;
const fromJust_3841 = fromJust_25;
const find_3842 = find_34;
const insert_3843 = insert_67;
const lookup_3844 = lookup_66;
const Pair_3845 = Pair_3;
const repeat_3846 = repeat_40;
const foldTrie_3847 = foldTrie_70;
const exists_3848 = exists_37;
const setToArray_3849 = setToArray_84;
const Right_3850 = Right_9;
const debugWrap_3851 = debugWrap_90;
const gets_3852 = gets_59;
const $gt_3853 = $gt_18;
const Identity_3854 = Identity_15;
const popCount_3855 = popCount_63;
const dedup_3856 = dedup_53;
const Leaf_3857 = Leaf_12;
const debug2_3858 = debug2_87;
const $gt$eq$gt_3859 = $gt$eq$gt_91;
const splitEither_3860 = splitEither_30;
const setAdd_3861 = setAdd_79;
const contains_3862 = contains_33;
const $gt$eq_3863 = $gt$eq_20;
const New_3864 = New_785;
const App_3865 = App_781;
const down_3866 = down_840;
const dataConName_3867 = dataConName_829;
const CNum_3868 = CNum_786;
const Const_3869 = Const_780;
const getAnnType_3870 = getAnnType_816;
const TRow_3871 = TRow_803;
const Inst_3872 = Inst_797;
const printCodeLoc_3873 = printCodeLoc_820;
const getPatType_3874 = getPatType_835;
const Var_3875 = Var_779;
const getAnnCodeLoc_3876 = getAnnCodeLoc_818;
const equivBound_3877 = equivBound_823;
const AnnUseCount_3878 = AnnUseCount_775;
const Data_3879 = Data_793;
const AnnData_3880 = AnnData_776;
const exprLoc_3881 = exprLoc_821;
const getAnn_3882 = getAnn_811;
const downM_3883 = downM_845;
const TForall_3884 = TForall_805;
const copyAnn_3885 = copyAnn_813;
const Module_3886 = Module_791;
const ModuleInterface_3887 = ModuleInterface_792;
const TApp_3888 = TApp_802;
const CStr_3889 = CStr_787;
const TCBound_3890 = TCBound_798;
const TConst_3891 = TConst_799;
const ImportOpen_3892 = ImportOpen_808;
const equivType_3893 = equivType_828;
const dataConNames_3894 = dataConNames_830;
const downAndUp_3895 = downAndUp_838;
const Case_3896 = Case_783;
const getType_3897 = getType_834;
const ImportClosed_3898 = ImportClosed_807;
const TSkolem_3899 = TSkolem_801;
const breakableDownM_3900 = breakableDownM_846;
const upM_3901 = upM_844;
const AnnCodeLoc_3902 = AnnCodeLoc_774;
const TBot_3903 = TBot_804;
const PConst_3904 = PConst_789;
const TVar_3905 = TVar_800;
const emptyAnn_3906 = emptyAnn_810;
const setAnnCodeLoc_3907 = setAnnCodeLoc_819;
const Instance_3908 = Instance_796;
const AnnExport_3909 = AnnExport_778;
const TUnknown_3910 = TUnknown_806;
const breakableDownAndUpM_3911 = breakableDownAndUpM_842;
const namesInPat_3912 = namesInPat_822;
const breakableDownAndUp_3913 = breakableDownAndUp_837;
const PVar_3914 = PVar_788;
const DataCon_3915 = DataCon_794;
const Class_3916 = Class_795;
const Lam_3917 = Lam_782;
const annOf_3918 = annOf_832;
const setAnnType_3919 = setAnnType_817;
const AnnTag_3920 = AnnTag_777;
const compareBound_3921 = compareBound_827;
const PData_3922 = PData_790;
const getAnnE_3923 = getAnnE_814;
const AnnType_3924 = AnnType_773;
const Let_3925 = Let_784;
const up_3926 = up_839;
const breakableDown_3927 = breakableDown_841;
const withAnn_3928 = withAnn_833;
const setPatType_3929 = setPatType_836;
const setType_3930 = setType_831;
const compareArr_3931 = compareArr_825;
const ImportAll_3932 = ImportAll_809;
const compareOrd_3933 = compareOrd_824;
const downAndUpM_3934 = downAndUpM_843;
const hasAnnE_3935 = hasAnnE_815;
const compareType_3936 = compareType_826;
const setAnn_3937 = setAnn_812;
const getUid_3938 = getUid_3712;
const setUid_3939 = setUid_3713;
const freeVars_3940 = freeVars_2565;
const S_3941 = $_0_3949 => $_1_3950 => ({$0:$_0_3949,$1:$_1_3950});
const mkClosure_3942 = captured_3951 => lam_3952 => {
  const $phi$458 = length(captured_3951);
  if(0==$phi$458){
    return lam_3952
  } else return ((New_3864(emptyAnn_3906))("@closure"))([(Const_3869(emptyAnn_3906))(CNum_3868($phi$458)),((foldr(b_3954 => p_3955 => ((Lam_3917(emptyAnn_3906))(p_3955))(b_3954)))(lam_3952))(captured_3951)])
};
const mkBind_3943 = ann_3956 => id_3957 => captured_3958 => {
  const $phi$460 = length(captured_3958);
  if(0==$phi$460){
    return (Var_3875(ann_3956))(id_3957)
  } else return ((New_3864(ann_3956))("@bind"))((map(Var_3875(emptyAnn_3906)))((push(id_3957))(captured_3958)))
};
const addTop_3944 = e_3960 => (($gt$gt$eq($instance_502))(gets_3852))(s_3961 => {
  const id_3964 = "$lift"+(intToString(s_3961.$0));
  return (($gt$gt_3770($instance_502))(sets_3825((S_3941(s_3961.$0+1))((push((Pair_3845(id_3964))(e_3960)))(s_3961.$1)))))((ret($instance_502))(id_3964))
});
const lift_3945 = top_3965 => e_3966 => {
  if(e_3966.$tag==3){
    const captured_3970 = (filter(v_3972 => not_3831(($_3782(isJust_3837))((((lookup_3844($instance_447))($instance_506))(v_3972))(top_3965)))))(($_3782(setToArray_3849))((freeVars_3940(Empty_3812))(e_3966)));
    const closure_3971 = (mkClosure_3942(captured_3970))(e_3966);
    return (($gt$gt$eq($instance_502))(addTop_3944(closure_3971)))(id_3973 => (ret($instance_502))(((mkBind_3943(e_3966.$0))(id_3973))(captured_3970)))
  } else return (ret($instance_502))(e_3966)
};
const liftBinding_3946 = top_3975 => b_3976 => (($gt$gt$eq($instance_502))(((upM_3901($instance_502))(lift_3945(top_3975)))(b_3976.$1)))(e_3979 => (ret($instance_502))((Pair_3845(b_3976.$0))(e_3979)));
const liftTop_3947 = uid_3980 => top_3981 => bs_3982 => {
  const $phi$465 = (runState_3788((S_3941(uid_3980))([])))(((mapM_3827($instance_502))(liftBinding_3946(top_3981)))(bs_3982));
  return (Pair_3845($phi$465.$0.$0))((concat($phi$465.$0.$1))($phi$465.$1))
};
const liftModule_3948 = m_3986 => (($gt$gt$eq($instance_502))(getUid_3938))(uid_3987 => {
  const fromImp_3995 = s_3997 => i_3998 => {
    if(i_3998.$tag==1){
      return (((setAddAll_3778($instance_447))($instance_506))((map(snd_3799))(i_3998.$2)))(s_3997)
    } else error("pattern match fail in //compiler/lambdaLifter.jg at line 37, column 19",i_3998)
  };
  const top_3996 = ((foldl(fromImp_3995))((((setAddAll_3778($instance_447))($instance_506))((map(fst_3793))(m_3986.$6)))(emptySet_3835)))(m_3986.$2);
  const $phi$469 = ((liftTop_3947(uid_3987))(top_3996))(m_3986.$6);
  return (($gt$gt_3770($instance_502))(setUid_3939($phi$469.$0)))((ret($instance_502))(((((((Module_3886(m_3986.$0))(m_3986.$1))(m_3986.$2))(m_3986.$3))(m_3986.$4))(m_3986.$5))($phi$469.$1)))
});
const head_4004 = head_46;
const $gt$gt_4005 = $gt$gt_21;
const size_4006 = size_72;
const setContains_4007 = setContains_82;
const uniq_4008 = uniq_51;
const all_4009 = all_38;
const mconcat_4010 = mconcat_22;
const zip_4011 = zip_43;
const $lt$eq_4012 = $lt$eq_19;
const setAddAll_4013 = setAddAll_80;
const BitmapIndexed_4014 = BitmapIndexed_14;
const reverse_4015 = reverse_52;
const isEmpty_4016 = isEmpty_73;
const $_4017 = $_16;
const remove_4018 = remove_69;
const forM_4019 = forM_58;
const Unit_4020 = Unit_0;
const loop_4021 = loop_32;
const either_4022 = either_29;
const runState_4023 = runState_61;
const assert_4024 = assert_94;
const setRemove_4025 = setRemove_81;
const zipWithIndex2_4026 = zipWithIndex2_41;
const Left_4027 = Left_8;
const fst_4028 = fst_27;
const setDiff_4029 = setDiff_85;
const insertAll_4030 = insertAll_77;
const mapJust_4031 = mapJust_45;
const maybe_4032 = maybe_23;
const concatMap_4033 = concatMap_44;
const snd_4034 = snd_28;
const mergeSet_4035 = mergeSet_50;
const join_4036 = join_39;
const setIntersection_4037 = setIntersection_86;
const zipWithIndex_4038 = zipWithIndex_42;
const Tuple3_4039 = Tuple3_4;
const mapFst_4040 = mapFst_92;
const mapIx_4041 = mapIx_35;
const foldM_4042 = foldM_56;
const Just_4043 = Just_1;
const Tuple4_4044 = Tuple4_5;
const toRecord_4045 = toRecord_54;
const hamtMask_4046 = hamtMask_64;
const Empty_4047 = Empty_11;
const strToArray_4048 = strToArray_55;
const Tuple5_4049 = Tuple5_6;
const mapSnd_4050 = mapSnd_93;
const setUnion_4051 = setUnion_83;
const Nothing_4052 = Nothing_2;
const trieKeys_4053 = trieKeys_75;
const Tuple6_4054 = Tuple6_7;
const $div$eq_4055 = $div$eq_17;
const justOr_4056 = justOr_24;
const tail_4057 = tail_47;
const init_4058 = init_49;
const debugIf_4059 = debugIf_88;
const sets_4060 = sets_60;
const State_4061 = State_10;
const mapM_4062 = mapM_57;
const hamtIndex_4063 = hamtIndex_65;
const mergeTrie_4064 = mergeTrie_74;
const Collision_4065 = Collision_13;
const not_4066 = not_31;
const evalState_4067 = evalState_62;
const debugMaybe_4068 = debugMaybe_89;
const containsChar_4069 = containsChar_36;
const emptySet_4070 = emptySet_78;
const updateOrSet_4071 = updateOrSet_68;
const isJust_4072 = isJust_26;
const last_4073 = last_48;
const trieEntries_4074 = trieEntries_76;
const mapTrie_4075 = mapTrie_71;
const fromJust_4076 = fromJust_25;
const find_4077 = find_34;
const insert_4078 = insert_67;
const lookup_4079 = lookup_66;
const Pair_4080 = Pair_3;
const repeat_4081 = repeat_40;
const foldTrie_4082 = foldTrie_70;
const exists_4083 = exists_37;
const setToArray_4084 = setToArray_84;
const Right_4085 = Right_9;
const debugWrap_4086 = debugWrap_90;
const gets_4087 = gets_59;
const $gt_4088 = $gt_18;
const Identity_4089 = Identity_15;
const popCount_4090 = popCount_63;
const dedup_4091 = dedup_53;
const Leaf_4092 = Leaf_12;
const debug2_4093 = debug2_87;
const $gt$eq$gt_4094 = $gt$eq$gt_91;
const splitEither_4095 = splitEither_30;
const setAdd_4096 = setAdd_79;
const contains_4097 = contains_33;
const $gt$eq_4098 = $gt$eq_20;
const New_4099 = New_785;
const App_4100 = App_781;
const down_4101 = down_840;
const dataConName_4102 = dataConName_829;
const CNum_4103 = CNum_786;
const Const_4104 = Const_780;
const getAnnType_4105 = getAnnType_816;
const TRow_4106 = TRow_803;
const Inst_4107 = Inst_797;
const printCodeLoc_4108 = printCodeLoc_820;
const getPatType_4109 = getPatType_835;
const Var_4110 = Var_779;
const getAnnCodeLoc_4111 = getAnnCodeLoc_818;
const equivBound_4112 = equivBound_823;
const AnnUseCount_4113 = AnnUseCount_775;
const Data_4114 = Data_793;
const AnnData_4115 = AnnData_776;
const exprLoc_4116 = exprLoc_821;
const getAnn_4117 = getAnn_811;
const downM_4118 = downM_845;
const TForall_4119 = TForall_805;
const copyAnn_4120 = copyAnn_813;
const Module_4121 = Module_791;
const ModuleInterface_4122 = ModuleInterface_792;
const TApp_4123 = TApp_802;
const CStr_4124 = CStr_787;
const TCBound_4125 = TCBound_798;
const TConst_4126 = TConst_799;
const ImportOpen_4127 = ImportOpen_808;
const equivType_4128 = equivType_828;
const dataConNames_4129 = dataConNames_830;
const downAndUp_4130 = downAndUp_838;
const Case_4131 = Case_783;
const getType_4132 = getType_834;
const ImportClosed_4133 = ImportClosed_807;
const TSkolem_4134 = TSkolem_801;
const breakableDownM_4135 = breakableDownM_846;
const upM_4136 = upM_844;
const AnnCodeLoc_4137 = AnnCodeLoc_774;
const TBot_4138 = TBot_804;
const PConst_4139 = PConst_789;
const TVar_4140 = TVar_800;
const emptyAnn_4141 = emptyAnn_810;
const setAnnCodeLoc_4142 = setAnnCodeLoc_819;
const Instance_4143 = Instance_796;
const AnnExport_4144 = AnnExport_778;
const TUnknown_4145 = TUnknown_806;
const breakableDownAndUpM_4146 = breakableDownAndUpM_842;
const namesInPat_4147 = namesInPat_822;
const breakableDownAndUp_4148 = breakableDownAndUp_837;
const PVar_4149 = PVar_788;
const DataCon_4150 = DataCon_794;
const Class_4151 = Class_795;
const Lam_4152 = Lam_782;
const annOf_4153 = annOf_832;
const setAnnType_4154 = setAnnType_817;
const AnnTag_4155 = AnnTag_777;
const compareBound_4156 = compareBound_827;
const PData_4157 = PData_790;
const getAnnE_4158 = getAnnE_814;
const AnnType_4159 = AnnType_773;
const Let_4160 = Let_784;
const up_4161 = up_839;
const breakableDown_4162 = breakableDown_841;
const withAnn_4163 = withAnn_833;
const setPatType_4164 = setPatType_836;
const setType_4165 = setType_831;
const compareArr_4166 = compareArr_825;
const ImportAll_4167 = ImportAll_809;
const compareOrd_4168 = compareOrd_824;
const downAndUpM_4169 = downAndUpM_843;
const hasAnnE_4170 = hasAnnE_815;
const compareType_4171 = compareType_826;
const setAnn_4172 = setAnn_812;
const sccSorted_4173 = sccSorted_2270;
const splitLetsPass_4179 = local$instance$Monad$0 => m_4218 => (ret(local$instance$Monad$0))(m_4218);
const addRef_4174 = local$instance$Eq$1 => local$instance$Hashable$0 => n_4180 => (($gt$gt$eq($instance_502))(gets_4087))(ns_4181 => sets_4060((((setAdd_4096(local$instance$Eq$1))(local$instance$Hashable$0))(n_4180))(ns_4181)));
const splitBindings_4178 = bs_4217 => error("");
const delRef_4175 = local$instance$Eq$1 => local$instance$Hashable$0 => n_4182 => (($gt$gt$eq($instance_502))(gets_4087))(ns_4183 => sets_4060((((setRemove_4025(local$instance$Eq$1))(local$instance$Hashable$0))(n_4182))(ns_4183)));
const splitExpr_4177 = e_4184 => {
  const splitPat_4186 = p_4199 => {
    if(p_4199.$tag==1){
      return (ret($instance_502))(Unit_4020)
    } else if(p_4199.$tag==0){
      return ((delRef_4175($instance_447))($instance_506))(p_4199.$1)
    } else if(p_4199.$tag==2){
      return (($gt$gt_4005($instance_502))(((mapM_4062($instance_502))(splitPat_4186))(p_4199.$2)))(((addRef_4174($instance_447))($instance_506))(p_4199.$1))
    } else error("pattern match fail in //compiler/let_splitter.jg at line 15, column 16",p_4199)
  };
  const split_4185 = e_4188 => {
    if(e_4188.$tag==0){
      return (($gt$gt_4005($instance_502))(((addRef_4174($instance_447))($instance_506))(e_4188.$1)))((ret($instance_502))(e_4188))
    } else if(e_4188.$tag==4){
      return (($gt$gt_4005($instance_502))(((mapM_4062($instance_502))(p_4194 => splitPat_4186(fst_4028(p_4194))))(e_4188.$2)))((ret($instance_502))(e_4188))
    } else if(e_4188.$tag==3){
      return (($gt$gt_4005($instance_502))(((delRef_4175($instance_447))($instance_506))(e_4188.$1)))((ret($instance_502))(e_4188))
    } else return (ret($instance_502))(e_4188)
  };
  const handleLet_4187 = e_4207 => {
    if(e_4207.$tag==5){
      return (($gt$gt$eq($instance_502))(splitExpr_4177(e_4207.$2)))(e_4211 => (($gt$gt$eq($instance_502))(splitBindings_4178(e_4207.$1)))(gbs_4212 => {
        const l_4213 = ((foldr(e_4214 => bs_4215 => ((Let_4160(emptyAnn_4141))(bs_4215))(e_4214)))(e_4211))(gbs_4212);
        return (ret($instance_502))(Right_4085((withAnn_4163(e_4207.$0))(l_4213)))
      }))
    } else return (ret($instance_502))(Left_4027(e_4207))
  };
  return (((breakableDownAndUpM_4146($instance_502))(handleLet_4187))(split_4185))(e_4184)
};
const getRefs_4176 = gets_4087;
const head_4219 = head_46;
const $gt$gt_4220 = $gt$gt_21;
const size_4221 = size_72;
const setContains_4222 = setContains_82;
const uniq_4223 = uniq_51;
const all_4224 = all_38;
const mconcat_4225 = mconcat_22;
const zip_4226 = zip_43;
const $lt$eq_4227 = $lt$eq_19;
const setAddAll_4228 = setAddAll_80;
const BitmapIndexed_4229 = BitmapIndexed_14;
const reverse_4230 = reverse_52;
const isEmpty_4231 = isEmpty_73;
const $_4232 = $_16;
const remove_4233 = remove_69;
const forM_4234 = forM_58;
const Unit_4235 = Unit_0;
const loop_4236 = loop_32;
const either_4237 = either_29;
const runState_4238 = runState_61;
const assert_4239 = assert_94;
const setRemove_4240 = setRemove_81;
const zipWithIndex2_4241 = zipWithIndex2_41;
const Left_4242 = Left_8;
const fst_4243 = fst_27;
const setDiff_4244 = setDiff_85;
const insertAll_4245 = insertAll_77;
const mapJust_4246 = mapJust_45;
const maybe_4247 = maybe_23;
const concatMap_4248 = concatMap_44;
const snd_4249 = snd_28;
const mergeSet_4250 = mergeSet_50;
const join_4251 = join_39;
const setIntersection_4252 = setIntersection_86;
const zipWithIndex_4253 = zipWithIndex_42;
const Tuple3_4254 = Tuple3_4;
const mapFst_4255 = mapFst_92;
const mapIx_4256 = mapIx_35;
const foldM_4257 = foldM_56;
const Just_4258 = Just_1;
const Tuple4_4259 = Tuple4_5;
const toRecord_4260 = toRecord_54;
const hamtMask_4261 = hamtMask_64;
const Empty_4262 = Empty_11;
const strToArray_4263 = strToArray_55;
const Tuple5_4264 = Tuple5_6;
const mapSnd_4265 = mapSnd_93;
const setUnion_4266 = setUnion_83;
const Nothing_4267 = Nothing_2;
const trieKeys_4268 = trieKeys_75;
const Tuple6_4269 = Tuple6_7;
const $div$eq_4270 = $div$eq_17;
const justOr_4271 = justOr_24;
const tail_4272 = tail_47;
const init_4273 = init_49;
const debugIf_4274 = debugIf_88;
const sets_4275 = sets_60;
const State_4276 = State_10;
const mapM_4277 = mapM_57;
const hamtIndex_4278 = hamtIndex_65;
const mergeTrie_4279 = mergeTrie_74;
const Collision_4280 = Collision_13;
const not_4281 = not_31;
const evalState_4282 = evalState_62;
const debugMaybe_4283 = debugMaybe_89;
const containsChar_4284 = containsChar_36;
const emptySet_4285 = emptySet_78;
const updateOrSet_4286 = updateOrSet_68;
const isJust_4287 = isJust_26;
const last_4288 = last_48;
const trieEntries_4289 = trieEntries_76;
const mapTrie_4290 = mapTrie_71;
const fromJust_4291 = fromJust_25;
const find_4292 = find_34;
const insert_4293 = insert_67;
const lookup_4294 = lookup_66;
const Pair_4295 = Pair_3;
const repeat_4296 = repeat_40;
const foldTrie_4297 = foldTrie_70;
const exists_4298 = exists_37;
const setToArray_4299 = setToArray_84;
const Right_4300 = Right_9;
const debugWrap_4301 = debugWrap_90;
const gets_4302 = gets_59;
const $gt_4303 = $gt_18;
const Identity_4304 = Identity_15;
const popCount_4305 = popCount_63;
const dedup_4306 = dedup_53;
const Leaf_4307 = Leaf_12;
const debug2_4308 = debug2_87;
const $gt$eq$gt_4309 = $gt$eq$gt_91;
const splitEither_4310 = splitEither_30;
const setAdd_4311 = setAdd_79;
const contains_4312 = contains_33;
const $gt$eq_4313 = $gt$eq_20;
const New_4314 = New_785;
const App_4315 = App_781;
const down_4316 = down_840;
const dataConName_4317 = dataConName_829;
const CNum_4318 = CNum_786;
const Const_4319 = Const_780;
const getAnnType_4320 = getAnnType_816;
const TRow_4321 = TRow_803;
const Inst_4322 = Inst_797;
const printCodeLoc_4323 = printCodeLoc_820;
const getPatType_4324 = getPatType_835;
const Var_4325 = Var_779;
const getAnnCodeLoc_4326 = getAnnCodeLoc_818;
const equivBound_4327 = equivBound_823;
const AnnUseCount_4328 = AnnUseCount_775;
const Data_4329 = Data_793;
const AnnData_4330 = AnnData_776;
const exprLoc_4331 = exprLoc_821;
const getAnn_4332 = getAnn_811;
const downM_4333 = downM_845;
const TForall_4334 = TForall_805;
const copyAnn_4335 = copyAnn_813;
const Module_4336 = Module_791;
const ModuleInterface_4337 = ModuleInterface_792;
const TApp_4338 = TApp_802;
const CStr_4339 = CStr_787;
const TCBound_4340 = TCBound_798;
const TConst_4341 = TConst_799;
const ImportOpen_4342 = ImportOpen_808;
const equivType_4343 = equivType_828;
const dataConNames_4344 = dataConNames_830;
const downAndUp_4345 = downAndUp_838;
const Case_4346 = Case_783;
const getType_4347 = getType_834;
const ImportClosed_4348 = ImportClosed_807;
const TSkolem_4349 = TSkolem_801;
const breakableDownM_4350 = breakableDownM_846;
const upM_4351 = upM_844;
const AnnCodeLoc_4352 = AnnCodeLoc_774;
const TBot_4353 = TBot_804;
const PConst_4354 = PConst_789;
const TVar_4355 = TVar_800;
const emptyAnn_4356 = emptyAnn_810;
const setAnnCodeLoc_4357 = setAnnCodeLoc_819;
const Instance_4358 = Instance_796;
const AnnExport_4359 = AnnExport_778;
const TUnknown_4360 = TUnknown_806;
const breakableDownAndUpM_4361 = breakableDownAndUpM_842;
const namesInPat_4362 = namesInPat_822;
const breakableDownAndUp_4363 = breakableDownAndUp_837;
const PVar_4364 = PVar_788;
const DataCon_4365 = DataCon_794;
const Class_4366 = Class_795;
const Lam_4367 = Lam_782;
const annOf_4368 = annOf_832;
const setAnnType_4369 = setAnnType_817;
const AnnTag_4370 = AnnTag_777;
const compareBound_4371 = compareBound_827;
const PData_4372 = PData_790;
const getAnnE_4373 = getAnnE_814;
const AnnType_4374 = AnnType_773;
const Let_4375 = Let_784;
const up_4376 = up_839;
const breakableDown_4377 = breakableDown_841;
const withAnn_4378 = withAnn_833;
const setPatType_4379 = setPatType_836;
const setType_4380 = setType_831;
const compareArr_4381 = compareArr_825;
const ImportAll_4382 = ImportAll_809;
const compareOrd_4383 = compareOrd_824;
const downAndUpM_4384 = downAndUpM_843;
const hasAnnE_4385 = hasAnnE_815;
const compareType_4386 = compareType_826;
const setAnn_4387 = setAnn_812;
const printType_4388 = printType_1476;
const mkConFun_4391 = tag_4415 => dt_4416 => vs_4417 => n_4418 => ts_4419 => {
  const nts_4420 = (map(it_4427 => (Pair_4295("$_"+(intToString(fst_4243(it_4427)))))(snd_4249(it_4427))))(zipWithIndex_4253(ts_4419));
  const new_4421 = (setType_4380(dt_4416))(((New_4314(emptyAnn_4356))(n_4418))((map(nt_4428 => (Var_4325(emptyAnn_4356))(fst_4243(nt_4428))))(nts_4420)));
  const mkCon_4422 = r_4429 => nt_4430 => (setType_4380(((TApp_4338(emptyAnn_4356))(((TApp_4338(emptyAnn_4356))((TConst_4341(emptyAnn_4356))("->")))(nt_4430.$1)))(getType_4347(r_4429))))(((Lam_4367(emptyAnn_4356))(nt_4430.$0))(r_4429));
  const con_4423 = ((foldr(mkCon_4422))(new_4421))(nts_4420);
  const conT_4424 = (((TForall_4334(emptyAnn_4356))(vs_4417))([]))(getType_4347(con_4423));
  const ann_4425 = ((((setAnn_4387($instance_447))($instance_506))("export"))(AnnExport_4359(n_4418)))(((((setAnn_4387($instance_447))($instance_506))("type"))(AnnType_4374(conT_4424)))(((((setAnn_4387($instance_447))($instance_506))("data"))(AnnData_4330(tag_4415)))(emptyAnn_4356)));
  const typedCon_4426 = (withAnn_4378(ann_4425))(con_4423);
  return (Pair_4295(n_4418))(typedCon_4426)
};
const rewriteData_4390 = d_4400 => {
  const dt_4405 = ((foldl(r_4407 => v_4408 => ((TApp_4338(emptyAnn_4356))(r_4407))((TSkolem_4349(emptyAnn_4356))(v_4408))))((TConst_4341(emptyAnn_4356))(d_4400.$1)))(d_4400.$2);
  const rewriteCon_4406 = c_4409 => {
    let $phi$475;
    const $phi$476 = length(d_4400.$3);
    if(1==$phi$476){
      $phi$475 = Nothing_4267
    } else $phi$475 = (Just_4258(fst_4243(c_4409)));
    const tag_4410 = $phi$475;
    const $phi$478 = snd_4249(c_4409);
    return ((((mkConFun_4391(tag_4410))(dt_4405))(d_4400.$2))($phi$478.$1))($phi$478.$2)
  };
  return (map(rewriteCon_4406))(zipWithIndex_4253(d_4400.$3))
};
const translateAdts_4389 = m_4392 => ((((((Module_4336(m_4392.$0))(m_4392.$1))(m_4392.$2))([]))(m_4392.$4))(m_4392.$5))((concat((((concatMap_4248($instance_452))($instance_450))(rewriteData_4390))(m_4392.$3)))(m_4392.$6));
const head_4433 = head_46;
const $gt$gt_4434 = $gt$gt_21;
const size_4435 = size_72;
const setContains_4436 = setContains_82;
const uniq_4437 = uniq_51;
const all_4438 = all_38;
const mconcat_4439 = mconcat_22;
const zip_4440 = zip_43;
const $lt$eq_4441 = $lt$eq_19;
const setAddAll_4442 = setAddAll_80;
const BitmapIndexed_4443 = BitmapIndexed_14;
const reverse_4444 = reverse_52;
const isEmpty_4445 = isEmpty_73;
const $_4446 = $_16;
const remove_4447 = remove_69;
const forM_4448 = forM_58;
const Unit_4449 = Unit_0;
const loop_4450 = loop_32;
const either_4451 = either_29;
const runState_4452 = runState_61;
const assert_4453 = assert_94;
const setRemove_4454 = setRemove_81;
const zipWithIndex2_4455 = zipWithIndex2_41;
const Left_4456 = Left_8;
const fst_4457 = fst_27;
const setDiff_4458 = setDiff_85;
const insertAll_4459 = insertAll_77;
const mapJust_4460 = mapJust_45;
const maybe_4461 = maybe_23;
const concatMap_4462 = concatMap_44;
const snd_4463 = snd_28;
const mergeSet_4464 = mergeSet_50;
const join_4465 = join_39;
const setIntersection_4466 = setIntersection_86;
const zipWithIndex_4467 = zipWithIndex_42;
const Tuple3_4468 = Tuple3_4;
const mapFst_4469 = mapFst_92;
const mapIx_4470 = mapIx_35;
const foldM_4471 = foldM_56;
const Just_4472 = Just_1;
const Tuple4_4473 = Tuple4_5;
const toRecord_4474 = toRecord_54;
const hamtMask_4475 = hamtMask_64;
const Empty_4476 = Empty_11;
const strToArray_4477 = strToArray_55;
const Tuple5_4478 = Tuple5_6;
const mapSnd_4479 = mapSnd_93;
const setUnion_4480 = setUnion_83;
const Nothing_4481 = Nothing_2;
const trieKeys_4482 = trieKeys_75;
const Tuple6_4483 = Tuple6_7;
const $div$eq_4484 = $div$eq_17;
const justOr_4485 = justOr_24;
const tail_4486 = tail_47;
const init_4487 = init_49;
const debugIf_4488 = debugIf_88;
const sets_4489 = sets_60;
const State_4490 = State_10;
const mapM_4491 = mapM_57;
const hamtIndex_4492 = hamtIndex_65;
const mergeTrie_4493 = mergeTrie_74;
const Collision_4494 = Collision_13;
const not_4495 = not_31;
const evalState_4496 = evalState_62;
const debugMaybe_4497 = debugMaybe_89;
const containsChar_4498 = containsChar_36;
const emptySet_4499 = emptySet_78;
const updateOrSet_4500 = updateOrSet_68;
const isJust_4501 = isJust_26;
const last_4502 = last_48;
const trieEntries_4503 = trieEntries_76;
const mapTrie_4504 = mapTrie_71;
const fromJust_4505 = fromJust_25;
const find_4506 = find_34;
const insert_4507 = insert_67;
const lookup_4508 = lookup_66;
const Pair_4509 = Pair_3;
const repeat_4510 = repeat_40;
const foldTrie_4511 = foldTrie_70;
const exists_4512 = exists_37;
const setToArray_4513 = setToArray_84;
const Right_4514 = Right_9;
const debugWrap_4515 = debugWrap_90;
const gets_4516 = gets_59;
const $gt_4517 = $gt_18;
const Identity_4518 = Identity_15;
const popCount_4519 = popCount_63;
const dedup_4520 = dedup_53;
const Leaf_4521 = Leaf_12;
const debug2_4522 = debug2_87;
const $gt$eq$gt_4523 = $gt$eq$gt_91;
const splitEither_4524 = splitEither_30;
const setAdd_4525 = setAdd_79;
const contains_4526 = contains_33;
const $gt$eq_4527 = $gt$eq_20;
const New_4528 = New_785;
const App_4529 = App_781;
const down_4530 = down_840;
const dataConName_4531 = dataConName_829;
const CNum_4532 = CNum_786;
const Const_4533 = Const_780;
const getAnnType_4534 = getAnnType_816;
const TRow_4535 = TRow_803;
const Inst_4536 = Inst_797;
const printCodeLoc_4537 = printCodeLoc_820;
const getPatType_4538 = getPatType_835;
const Var_4539 = Var_779;
const getAnnCodeLoc_4540 = getAnnCodeLoc_818;
const equivBound_4541 = equivBound_823;
const AnnUseCount_4542 = AnnUseCount_775;
const Data_4543 = Data_793;
const AnnData_4544 = AnnData_776;
const exprLoc_4545 = exprLoc_821;
const getAnn_4546 = getAnn_811;
const downM_4547 = downM_845;
const TForall_4548 = TForall_805;
const copyAnn_4549 = copyAnn_813;
const Module_4550 = Module_791;
const ModuleInterface_4551 = ModuleInterface_792;
const TApp_4552 = TApp_802;
const CStr_4553 = CStr_787;
const TCBound_4554 = TCBound_798;
const TConst_4555 = TConst_799;
const ImportOpen_4556 = ImportOpen_808;
const equivType_4557 = equivType_828;
const dataConNames_4558 = dataConNames_830;
const downAndUp_4559 = downAndUp_838;
const Case_4560 = Case_783;
const getType_4561 = getType_834;
const ImportClosed_4562 = ImportClosed_807;
const TSkolem_4563 = TSkolem_801;
const breakableDownM_4564 = breakableDownM_846;
const upM_4565 = upM_844;
const AnnCodeLoc_4566 = AnnCodeLoc_774;
const TBot_4567 = TBot_804;
const PConst_4568 = PConst_789;
const TVar_4569 = TVar_800;
const emptyAnn_4570 = emptyAnn_810;
const setAnnCodeLoc_4571 = setAnnCodeLoc_819;
const Instance_4572 = Instance_796;
const AnnExport_4573 = AnnExport_778;
const TUnknown_4574 = TUnknown_806;
const breakableDownAndUpM_4575 = breakableDownAndUpM_842;
const namesInPat_4576 = namesInPat_822;
const breakableDownAndUp_4577 = breakableDownAndUp_837;
const PVar_4578 = PVar_788;
const DataCon_4579 = DataCon_794;
const Class_4580 = Class_795;
const Lam_4581 = Lam_782;
const annOf_4582 = annOf_832;
const setAnnType_4583 = setAnnType_817;
const AnnTag_4584 = AnnTag_777;
const compareBound_4585 = compareBound_827;
const PData_4586 = PData_790;
const getAnnE_4587 = getAnnE_814;
const AnnType_4588 = AnnType_773;
const Let_4589 = Let_784;
const up_4590 = up_839;
const breakableDown_4591 = breakableDown_841;
const withAnn_4592 = withAnn_833;
const setPatType_4593 = setPatType_836;
const setType_4594 = setType_831;
const compareArr_4595 = compareArr_825;
const ImportAll_4596 = ImportAll_809;
const compareOrd_4597 = compareOrd_824;
const downAndUpM_4598 = downAndUpM_843;
const hasAnnE_4599 = hasAnnE_815;
const compareType_4600 = compareType_826;
const setAnn_4601 = setAnn_812;
const getUid_4602 = getUid_3712;
const setUid_4603 = setUid_3713;
const getExports_4604 = getExports_3710;
const newIdent_4605 = n_4612 => (($gt$gt$eq($instance_502))(gets_4516))(i_4613 => (($gt$gt_4434($instance_502))(sets_4489(i_4613+1)))((ret($instance_502))((n_4612+"_")+(intToString(i_4613)))));
const rewriteExpr_4606 = env_4614 => e_4615 => {
  const rename_4616 = n_4620 => newIdent_4605(n_4620);
  const renamePat_4617 = p_4621 => {
    if(p_4621.$tag==1){
      return (ret($instance_502))((Pair_4509(p_4621))(Empty_4476))
    } else if(p_4621.$tag==0){
      return (($gt$gt$eq($instance_502))(rename_4616(p_4621.$1)))(n_4626 => (ret($instance_502))((Pair_4509((PVar_4578(p_4621.$0))(n_4626)))(((((insert_4507($instance_447))($instance_506))(p_4621.$1))(n_4626))(Empty_4476))))
    } else if(p_4621.$tag==2){
      return (($gt$gt$eq($instance_502))(((mapM_4491($instance_502))(renamePat_4617))(p_4621.$2)))(ps_4630 => {
        const $phi$482 = (((lookup_4508($instance_447))($instance_506))(p_4621.$1))(env_4614);
        if($phi$482.$tag==1){
          return (ret($instance_502))((Pair_4509(((PData_4586(p_4621.$0))(p_4621.$1))((map(fst_4457))(ps_4630))))(((foldl((mergeTrie_4493($instance_447))($instance_506)))(Empty_4476))((map(snd_4463))(ps_4630))))
        } else if($phi$482.$tag==0){
          return (ret($instance_502))((Pair_4509(((PData_4586(p_4621.$0))($phi$482.$0))((map(fst_4457))(ps_4630))))(((foldl((mergeTrie_4493($instance_447))($instance_506)))(Empty_4476))((map(snd_4463))(ps_4630))))
        } else error("pattern match fail in //compiler/uniquifier.jg at line 13, column 7",$phi$482)
      })
    } else error("pattern match fail in //compiler/uniquifier.jg at line 9, column 17",p_4621)
  };
  const rewritePat_4618 = p_4632 => (($gt$gt$eq($instance_502))(renamePat_4617(p_4632.$0)))(pe_4635 => (($gt$gt$eq($instance_502))((rewriteExpr_4606((((mergeTrie_4493($instance_447))($instance_506))(env_4614))(pe_4635.$1)))(p_4632.$1)))(e_4638 => (ret($instance_502))((Pair_4509(pe_4635.$0))(e_4638))));
  const f_4619 = e_4639 => {
    if(e_4639.$tag==3){
      return (($gt$gt$eq($instance_502))(rename_4616(e_4639.$1)))(n_4643 => (($gt$gt$eq($instance_502))((rewriteExpr_4606(((((insert_4507($instance_447))($instance_506))(e_4639.$1))(n_4643))(env_4614)))(e_4639.$2)))(e_4644 => (ret($instance_502))(Right_4514(((Lam_4581(e_4639.$0))(n_4643))(e_4644)))))
    } else if(e_4639.$tag==5){
      return (($gt$gt$eq($instance_502))((rewriteBindings_4608(env_4614))(e_4639.$1)))(ebs_4648 => (($gt$gt$eq($instance_502))((rewriteExpr_4606(ebs_4648.$0))(e_4639.$2)))(e_4651 => (ret($instance_502))(Right_4514(((Let_4589(e_4639.$0))(ebs_4648.$1))(e_4651)))))
    } else if(e_4639.$tag==4){
      return (($gt$gt$eq($instance_502))((rewriteExpr_4606(env_4614))(e_4639.$1)))(e_4655 => (($gt$gt$eq($instance_502))(((mapM_4491($instance_502))(rewritePat_4618))(e_4639.$2)))(ps_4656 => (ret($instance_502))(Right_4514(((Case_4560(e_4639.$0))(e_4655))(ps_4656)))))
    } else if(e_4639.$tag==0){
      const $phi$489 = (((lookup_4508($instance_447))($instance_506))(e_4639.$1))(env_4614);
      if($phi$489.$tag==0){
        return (ret($instance_502))(Left_4456((Var_4539(e_4639.$0))($phi$489.$0)))
      } else if($phi$489.$tag==1){
        return (ret($instance_502))(Left_4456(e_4639))
      } else error("pattern match fail in //compiler/uniquifier.jg at line 22, column 18",$phi$489)
    } else if(e_4639.$tag==6){
      const $phi$487 = (((lookup_4508($instance_447))($instance_506))(e_4639.$1))(env_4614);
      if($phi$487.$tag==0){
        return (ret($instance_502))(Left_4456(((New_4528(e_4639.$0))($phi$487.$0))(e_4639.$2)))
      } else if($phi$487.$tag==1){
        return (ret($instance_502))(Left_4456(e_4639))
      } else error("pattern match fail in //compiler/uniquifier.jg at line 25, column 23",$phi$487)
    } else return (ret($instance_502))(Left_4456(e_4639))
  };
  return ((breakableDownM_4564($instance_502))(f_4619))(e_4615)
};
const rewriteBindings_4608 = env_4678 => bs_4679 => {
  const ns_4680 = (map(fst_4457))(bs_4679);
  const ns2_4681 = ((mapM_4491($instance_502))(newIdent_4605))(ns_4680);
  return (($gt$gt$eq($instance_502))(ns2_4681))(ns_4682 => {
    const env2_4683 = (((insertAll_4459($instance_447))($instance_506))((zip_4440((map(fst_4457))(bs_4679)))(ns_4682)))(env_4678);
    const bs2_4684 = ((mapM_4491($instance_502))(rewriteExpr_4606(env2_4683)))((map(snd_4463))(bs_4679));
    return (($gt$gt$eq($instance_502))(bs2_4684))(bs_4685 => (ret($instance_502))((Pair_4509(env2_4683))((zip_4440(ns_4682))(bs_4685))))
  })
};
const renameImport_4609 = er_4686 => i_4687 => {
  if((i_4687.$tag==1)&&("./builtins.js"==i_4687.$1)){
    return (ret($instance_502))((Pair_4509(er_4686.$0))((push(i_4687))(er_4686.$1)))
  } else if(i_4687.$tag==1){
    const rename_4695 = er_4696 => p_4697 => (($gt$gt$eq($instance_502))(newIdent_4605(p_4697.$1)))(n_4702 => (ret($instance_502))((Pair_4509(((((insert_4507($instance_447))($instance_506))(p_4697.$1))(n_4702))(er_4696.$0)))((push((Pair_4509(p_4697.$0))(n_4702)))(er_4696.$1))));
    return (($gt$gt$eq($instance_502))((((foldM_4471($instance_502))(rename_4695))((Pair_4509(er_4686.$0))([])))(i_4687.$2)))(ens_4703 => (ret($instance_502))((Pair_4509(ens_4703.$0))((push(((ImportOpen_4556(i_4687.$0))(i_4687.$1))(ens_4703.$1)))(er_4686.$1))))
  } else error("pattern match fail in //compiler/uniquifier.jg at line 45, column 17",i_4687)
};
const rewriteInstance_4607 = env_4665 => i_4666 => (($gt$gt$eq($instance_502))(((mapM_4491($instance_502))(d_4672 => (($gt$gt$eq($instance_502))((rewriteExpr_4606(env_4665))(d_4672.$1)))(e_4675 => (ret($instance_502))((Pair_4509(d_4672.$0))(e_4675)))))(i_4666.$1.$3)))(bs_4676 => (($gt$gt$eq($instance_502))(newIdent_4605("$instance")))(insName_4677 => (ret($instance_502))((Pair_4509(insName_4677))((((Instance_4572(i_4666.$1.$0))(i_4666.$1.$1))(i_4666.$1.$2))(bs_4676)))));
const rewriteModule_4610 = ms_4706 => m_4707 => (($gt$gt$eq($instance_502))((((foldM_4471($instance_502))(renameImport_4609))((Pair_4509(Empty_4476))([])))(m_4707.$2)))(eis_4715 => (($gt$gt$eq($instance_502))((rewriteBindings_4608(eis_4715.$0))(m_4707.$6)))(ebs_4718 => (($gt$gt$eq($instance_502))(((mapM_4491($instance_502))(rewriteInstance_4607(ebs_4718.$0)))(m_4707.$5)))(ins_4721 => (ret($instance_502))(((((((Module_4550(m_4707.$0))(m_4707.$1))(eis_4715.$1))(m_4707.$3))(m_4707.$4))(ins_4721))(ebs_4718.$1)))));
const uniquify_4611 = m_4722 => (($gt$gt$eq($instance_502))(getUid_4602))(uid_4723 => (($gt$gt$eq($instance_502))(getExports_4604))(ex_4724 => {
  const r_4725 = (runState_4452(uid_4723))((rewriteModule_4610(ex_4724))(m_4722));
  return (($gt$gt_4434($instance_502))(setUid_4603(fst_4457(r_4725))))((ret($instance_502))(snd_4463(r_4725)))
}));
const head_4726 = head_46;
const $gt$gt_4727 = $gt$gt_21;
const size_4728 = size_72;
const setContains_4729 = setContains_82;
const uniq_4730 = uniq_51;
const all_4731 = all_38;
const mconcat_4732 = mconcat_22;
const zip_4733 = zip_43;
const $lt$eq_4734 = $lt$eq_19;
const setAddAll_4735 = setAddAll_80;
const BitmapIndexed_4736 = BitmapIndexed_14;
const reverse_4737 = reverse_52;
const isEmpty_4738 = isEmpty_73;
const $_4739 = $_16;
const remove_4740 = remove_69;
const forM_4741 = forM_58;
const Unit_4742 = Unit_0;
const loop_4743 = loop_32;
const either_4744 = either_29;
const runState_4745 = runState_61;
const assert_4746 = assert_94;
const setRemove_4747 = setRemove_81;
const zipWithIndex2_4748 = zipWithIndex2_41;
const Left_4749 = Left_8;
const fst_4750 = fst_27;
const setDiff_4751 = setDiff_85;
const insertAll_4752 = insertAll_77;
const mapJust_4753 = mapJust_45;
const maybe_4754 = maybe_23;
const concatMap_4755 = concatMap_44;
const snd_4756 = snd_28;
const mergeSet_4757 = mergeSet_50;
const join_4758 = join_39;
const setIntersection_4759 = setIntersection_86;
const zipWithIndex_4760 = zipWithIndex_42;
const Tuple3_4761 = Tuple3_4;
const mapFst_4762 = mapFst_92;
const mapIx_4763 = mapIx_35;
const foldM_4764 = foldM_56;
const Just_4765 = Just_1;
const Tuple4_4766 = Tuple4_5;
const toRecord_4767 = toRecord_54;
const hamtMask_4768 = hamtMask_64;
const Empty_4769 = Empty_11;
const strToArray_4770 = strToArray_55;
const Tuple5_4771 = Tuple5_6;
const mapSnd_4772 = mapSnd_93;
const setUnion_4773 = setUnion_83;
const Nothing_4774 = Nothing_2;
const trieKeys_4775 = trieKeys_75;
const Tuple6_4776 = Tuple6_7;
const $div$eq_4777 = $div$eq_17;
const justOr_4778 = justOr_24;
const tail_4779 = tail_47;
const init_4780 = init_49;
const debugIf_4781 = debugIf_88;
const sets_4782 = sets_60;
const State_4783 = State_10;
const mapM_4784 = mapM_57;
const hamtIndex_4785 = hamtIndex_65;
const mergeTrie_4786 = mergeTrie_74;
const Collision_4787 = Collision_13;
const not_4788 = not_31;
const evalState_4789 = evalState_62;
const debugMaybe_4790 = debugMaybe_89;
const containsChar_4791 = containsChar_36;
const emptySet_4792 = emptySet_78;
const updateOrSet_4793 = updateOrSet_68;
const isJust_4794 = isJust_26;
const last_4795 = last_48;
const trieEntries_4796 = trieEntries_76;
const mapTrie_4797 = mapTrie_71;
const fromJust_4798 = fromJust_25;
const find_4799 = find_34;
const insert_4800 = insert_67;
const lookup_4801 = lookup_66;
const Pair_4802 = Pair_3;
const repeat_4803 = repeat_40;
const foldTrie_4804 = foldTrie_70;
const exists_4805 = exists_37;
const setToArray_4806 = setToArray_84;
const Right_4807 = Right_9;
const debugWrap_4808 = debugWrap_90;
const gets_4809 = gets_59;
const $gt_4810 = $gt_18;
const Identity_4811 = Identity_15;
const popCount_4812 = popCount_63;
const dedup_4813 = dedup_53;
const Leaf_4814 = Leaf_12;
const debug2_4815 = debug2_87;
const $gt$eq$gt_4816 = $gt$eq$gt_91;
const splitEither_4817 = splitEither_30;
const setAdd_4818 = setAdd_79;
const contains_4819 = contains_33;
const $gt$eq_4820 = $gt$eq_20;
const New_4821 = New_785;
const App_4822 = App_781;
const down_4823 = down_840;
const dataConName_4824 = dataConName_829;
const CNum_4825 = CNum_786;
const Const_4826 = Const_780;
const getAnnType_4827 = getAnnType_816;
const TRow_4828 = TRow_803;
const Inst_4829 = Inst_797;
const printCodeLoc_4830 = printCodeLoc_820;
const getPatType_4831 = getPatType_835;
const Var_4832 = Var_779;
const getAnnCodeLoc_4833 = getAnnCodeLoc_818;
const equivBound_4834 = equivBound_823;
const AnnUseCount_4835 = AnnUseCount_775;
const Data_4836 = Data_793;
const AnnData_4837 = AnnData_776;
const exprLoc_4838 = exprLoc_821;
const getAnn_4839 = getAnn_811;
const downM_4840 = downM_845;
const TForall_4841 = TForall_805;
const copyAnn_4842 = copyAnn_813;
const Module_4843 = Module_791;
const ModuleInterface_4844 = ModuleInterface_792;
const TApp_4845 = TApp_802;
const CStr_4846 = CStr_787;
const TCBound_4847 = TCBound_798;
const TConst_4848 = TConst_799;
const ImportOpen_4849 = ImportOpen_808;
const equivType_4850 = equivType_828;
const dataConNames_4851 = dataConNames_830;
const downAndUp_4852 = downAndUp_838;
const Case_4853 = Case_783;
const getType_4854 = getType_834;
const ImportClosed_4855 = ImportClosed_807;
const TSkolem_4856 = TSkolem_801;
const breakableDownM_4857 = breakableDownM_846;
const upM_4858 = upM_844;
const AnnCodeLoc_4859 = AnnCodeLoc_774;
const TBot_4860 = TBot_804;
const PConst_4861 = PConst_789;
const TVar_4862 = TVar_800;
const emptyAnn_4863 = emptyAnn_810;
const setAnnCodeLoc_4864 = setAnnCodeLoc_819;
const Instance_4865 = Instance_796;
const AnnExport_4866 = AnnExport_778;
const TUnknown_4867 = TUnknown_806;
const breakableDownAndUpM_4868 = breakableDownAndUpM_842;
const namesInPat_4869 = namesInPat_822;
const breakableDownAndUp_4870 = breakableDownAndUp_837;
const PVar_4871 = PVar_788;
const DataCon_4872 = DataCon_794;
const Class_4873 = Class_795;
const Lam_4874 = Lam_782;
const annOf_4875 = annOf_832;
const setAnnType_4876 = setAnnType_817;
const AnnTag_4877 = AnnTag_777;
const compareBound_4878 = compareBound_827;
const PData_4879 = PData_790;
const getAnnE_4880 = getAnnE_814;
const AnnType_4881 = AnnType_773;
const Let_4882 = Let_784;
const up_4883 = up_839;
const breakableDown_4884 = breakableDown_841;
const withAnn_4885 = withAnn_833;
const setPatType_4886 = setPatType_836;
const setType_4887 = setType_831;
const compareArr_4888 = compareArr_825;
const ImportAll_4889 = ImportAll_809;
const compareOrd_4890 = compareOrd_824;
const downAndUpM_4891 = downAndUpM_843;
const hasAnnE_4892 = hasAnnE_815;
const compareType_4893 = compareType_826;
const setAnn_4894 = setAnn_812;
const reallyPrintExpr_4895 = reallyPrintExpr_1481;
const renameExpr_4896 = rewriteExpr_4606;
const getUid_4897 = getUid_3712;
const setUid_4898 = setUid_3713;
const computeSCC_4899 = computeSCC_2567;
const getCount_4904 = e_5006 => {
  const $phi$502 = (((getAnn_4839($instance_447))($instance_506))("useCount"))(annOf_4875(e_5006));
  if(($phi$502.$tag==0)&&($phi$502.$0.$tag==2)){
    return $phi$502.$0.$0
  } else error("pattern match fail in //compiler/inliner.jg at line 55, column 14",$phi$502)
};
const mergeCount_4905 = local$instance$Eq$1 => local$instance$Hashable$0 => a_5008 => b_5009 => ((foldTrie_4804(a_5010 => k_5011 => v_5012 => ((((insert_4800(local$instance$Eq$1))(local$instance$Hashable$0))(k_5011))(v_5012+((justOr_4778(0))((((lookup_4801(local$instance$Eq$1))(local$instance$Hashable$0))(k_5011))(a_5010)))))(a_5010)))(a_5008))(b_5009);
const patSize_4914 = p_5124 => {
  if(p_5124.$tag==0){
    return 1
  } else if(p_5124.$tag==1){
    return 1
  } else if(p_5124.$tag==2){
    return ((foldl(c_5132 => p_5133 => c_5132+(patSize_4914(p_5133))))(1))(p_5124.$2)
  } else error("pattern match fail in //compiler/inliner.jg at line 112, column 13",p_5124)
};
const exprSize_4913 = e_5096 => {
  if(e_5096.$tag==0){
    return 1
  } else if(e_5096.$tag==1){
    return 1
  } else if(e_5096.$tag==2){
    return (1+(exprSize_4913(e_5096.$1)))+(exprSize_4913(e_5096.$2))
  } else if(e_5096.$tag==3){
    return 1+(exprSize_4913(e_5096.$2))
  } else if(e_5096.$tag==4){
    return 1+(((foldl(c_5110 => p_5111 => (c_5110+(patSize_4914(p_5111.$0)))+(exprSize_4913(p_5111.$1))))(exprSize_4913(e_5096.$1)))(e_5096.$2))
  } else if(e_5096.$tag==5){
    return 1+(((foldl(c_5117 => b_5118 => c_5117+(exprSize_4913(snd_4756(b_5118)))))(exprSize_4913(e_5096.$2)))(e_5096.$1))
  } else if(e_5096.$tag==6){
    return ((foldl(c_5122 => e_5123 => c_5122+(exprSize_4913(e_5123))))(1))(e_5096.$2)
  } else error("pattern match fail in //compiler/inliner.jg at line 103, column 14",e_5096)
};
const chooseForInlining_4915 = baseCount_5134 => bs_5135 => {
  const useCount_5136 = ((foldl((mergeCount_4905($instance_447))($instance_506)))(baseCount_5134))((map(b_5138 => getCount_4904(snd_4756(b_5138))))(bs_5135));
  const f_5137 = r_5139 => b_5140 => {
    if(b_5140.$1.$tag==0){
      return ((((insert_4800($instance_447))($instance_506))(b_5140.$0))(b_5140.$1))(r_5139)
    } else if(b_5140.$1.$tag==1){
      return ((((insert_4800($instance_447))($instance_506))(b_5140.$0))(b_5140.$1))(r_5139)
    } else if(b_5140.$1.$tag==3){
      const $phi$511 = ((($lt($instance_448))(exprSize_4913(b_5140.$1)))(10))||((($eq$eq($instance_446))(1))((justOr_4778(0))((((lookup_4801($instance_447))($instance_506))(b_5140.$0))(useCount_5136))));
      if(!$phi$511){
        return r_5139
      } else if($phi$511){
        return ((((insert_4800($instance_447))($instance_506))(b_5140.$0))(b_5140.$1))(r_5139)
      } else error("pattern match fail in //compiler/inliner.jg at line 123, column 20",$phi$511)
    } else if(b_5140.$1.$tag==6){
      const $phi$509 = (($eq$eq($instance_446))(1))((justOr_4778(0))((((lookup_4801($instance_447))($instance_506))(b_5140.$0))(useCount_5136)));
      if(!$phi$509){
        return r_5139
      } else if($phi$509){
        return ((((insert_4800($instance_447))($instance_506))(b_5140.$0))(b_5140.$1))(r_5139)
      } else error("pattern match fail in //compiler/inliner.jg at line 126, column 20",$phi$509)
    } else return r_5139
  };
  return ((foldl(f_5137))(Empty_4769))(bs_5135)
};
const mapBindingsM_4908 = local$instance$Monad$0 => f_5062 => bs_5063 => ((mapM_4784(local$instance$Monad$0))(b_5064 => (($gt$gt$eq(local$instance$Monad$0))((f_5062(b_5064.$0))(b_5064.$1)))(e_5067 => (ret(local$instance$Monad$0))((Pair_4802(b_5064.$0))(e_5067)))))(bs_5063);
const inlineCode_4917 = always_5168 => e_5169 => {
  const withAnnCopy_5170 = ann_5173 => e_5174 => (withAnn_4885((((mergeTrie_4786($instance_447))($instance_506))((((remove_4740($instance_447))($instance_506))("export"))(annOf_4875(e_5174))))((((copyAnn_4842($instance_447))($instance_506))(["export"]))(ann_5173))))(e_5174);
  const inlinePat_5172 = p_5196 => {
    if(p_5196.$tag==2){
      const $phi$515 = (((lookup_4801($instance_447))($instance_506))(p_5196.$1))(always_5168);
      if(($phi$515.$tag==0)&&($phi$515.$0.$tag==0)){
        return ((PData_4879(p_5196.$0))($phi$515.$0.$1))((map(inlinePat_5172))(p_5196.$2))
      } else return ((PData_4879(p_5196.$0))(p_5196.$1))((map(inlinePat_5172))(p_5196.$2))
    } else return p_5196
  };
  const inlineExpr_5171 = e_5175 => {
    if(e_5175.$tag==0){
      const $phi$521 = (((lookup_4801($instance_447))($instance_506))(e_5175.$1))(always_5168);
      if($phi$521.$tag==1){
        return (ret($instance_502))(Left_4749(e_5175))
      } else if($phi$521.$tag==0){
        return ((fmap($instance_482))(e_5179 => Left_4749((withAnnCopy_5170(e_5175.$0))(e_5179))))((renameExpr_4896(Empty_4769))($phi$521.$0))
      } else error("pattern match fail in //compiler/inliner.jg at line 145, column 18",$phi$521)
    } else if(e_5175.$tag==5){
      const always2_5183 = (((mergeTrie_4786($instance_447))($instance_506))(always_5168))((chooseForInlining_4915(getCount_4904(e_5175.$2)))(e_5175.$1));
      return (($gt$gt$eq($instance_502))(((mapBindingsM_4908($instance_502))(n_5184 => e_5185 => (inlineCode_4917((((remove_4740($instance_447))($instance_506))(n_5184))(always2_5183)))(e_5185)))(e_5175.$1)))(bs_5186 => (($gt$gt$eq($instance_502))((inlineCode_4917(always2_5183))(e_5175.$2)))(e_5187 => {
        const $phi$519 = length(bs_5186);
        if(0==$phi$519){
          return (ret($instance_502))(Right_4807((withAnnCopy_5170(e_5175.$0))(e_5187)))
        } else return (ret($instance_502))(Right_4807(((Let_4882(e_5175.$0))(bs_5186))(e_5187)))
      }))
    } else if(e_5175.$tag==4){
      return (ret($instance_502))(Left_4749(((Case_4853(e_5175.$0))(e_5175.$1))((map(p_5192 => (Pair_4802(inlinePat_5172(p_5192.$0)))(p_5192.$1)))(e_5175.$2))))
    } else return (ret($instance_502))(Left_4749(e_5175))
  };
  return ((breakableDownM_4857($instance_502))(inlineExpr_5171))(e_5169)
};
const betaReduction_4916 = e_5154 => {
  const f_5155 = e_5156 => {
    if((e_5156.$tag==2)&&(e_5156.$1.$tag==3)){
      if(e_5156.$2.$tag==0){
        const $phi$525 = (($eq$eq($instance_447))(e_5156.$1.$1))(e_5156.$2.$1);
        if($phi$525){
          return e_5156.$1.$2
        } else if(!$phi$525){
          return ((Let_4882(e_5156.$0))([(Pair_4802(e_5156.$1.$1))((Var_4832(e_5156.$2.$0))(e_5156.$2.$1))]))(e_5156.$1.$2)
        } else error("pattern match fail in //compiler/inliner.jg at line 135, column 21",$phi$525)
      } else return ((Let_4882(e_5156.$0))([(Pair_4802(e_5156.$1.$1))(e_5156.$2)]))(e_5156.$1.$2)
    } else return e_5156
  };
  return snd_4756(((down_4823(a_5166 => e_5167 => (Pair_4802(a_5166))(f_5155(e_5167))))(Unit_4742))(e_5154))
};
const isExport_4918 = e_5204 => isJust_4794((((getAnn_4839($instance_447))($instance_506))("export"))(annOf_4875(e_5204)));
const dropDeadBindings_4919 = useCount_5205 => bs_5206 => {
  const f_5207 = b_5208 => {
    const recursiveCount_5212 = (justOr_4778(0))((((lookup_4801($instance_447))($instance_506))(b_5208.$0))(getCount_4904(b_5208.$1)));
    const totalCount_5211 = (justOr_4778(0))((((lookup_4801($instance_447))($instance_506))(b_5208.$0))(useCount_5205));
    const keep_5213 = (isExport_4918(b_5208.$1))||((($gt_4810($instance_448))(totalCount_5211-recursiveCount_5212))(0));
    if(keep_5213){
      return Just_4765((Pair_4802(b_5208.$0))(b_5208.$1))
    } else if(!keep_5213){
      const ann_5214 = annOf_4875(b_5208.$1);
      const $phi$529 = (((getAnn_4839($instance_447))($instance_506))("data"))(ann_5214);
      if($phi$529.$tag==1){
        return (debug2_4815("** dropping "+b_5208.$0))(Nothing_4774)
      } else if($phi$529.$tag==0){
        return Just_4765((Pair_4802(b_5208.$0))((withAnn_4885(((((setAnn_4894($instance_447))($instance_506))("dead"))(AnnTag_4877))(ann_5214)))(b_5208.$1)))
      } else error("pattern match fail in //compiler/inliner.jg at line 177, column 39",$phi$529)
    } else error("pattern match fail in //compiler/inliner.jg at line 175, column 10",keep_5213)
  };
  return (mapJust_4753(f_5207))(bs_5206)
};
const annWithUseCount_4906 = e_5013 => {
  const dropCount_5014 = local$instance$Eq$1 => local$instance$Hashable$0 => n_5018 => c_5019 => (((remove_4740(local$instance$Eq$1))(local$instance$Hashable$0))(n_5018))(c_5019);
  const countPat_5016 = c_5023 => p_5024 => {
    if(p_5024.$tag==0){
      return (((dropCount_5014($instance_447))($instance_506))(p_5024.$1))(c_5023)
    } else if(p_5024.$tag==2){
      return ((foldl(countPat_5016))(c_5023))(p_5024.$2)
    } else return c_5023
  };
  const countCase_5015 = pe_5020 => (countPat_5016(getCount_4904(pe_5020.$1)))(pe_5020.$0);
  const countExpr_5017 = e_5031 => {
    if(e_5031.$tag==0){
      return ((((insert_4800($instance_447))($instance_506))(e_5031.$1))(1))(Empty_4769)
    } else if(e_5031.$tag==2){
      return (((mergeCount_4905($instance_447))($instance_506))(getCount_4904(e_5031.$1)))(getCount_4904(e_5031.$2))
    } else if(e_5031.$tag==3){
      return (((dropCount_5014($instance_447))($instance_506))(e_5031.$1))(getCount_4904(e_5031.$2))
    } else if(e_5031.$tag==5){
      return ((foldl(c_5043 => n_5044 => (((dropCount_5014($instance_447))($instance_506))(n_5044))(c_5043)))(((foldl(c_5045 => e_5046 => (((mergeCount_4905($instance_447))($instance_506))(c_5045))(getCount_4904(e_5046))))(getCount_4904(e_5031.$2)))((map(snd_4756))(e_5031.$1))))((map(fst_4750))(e_5031.$1))
    } else if(e_5031.$tag==4){
      return ((foldl((mergeCount_4905($instance_447))($instance_506)))(getCount_4904(e_5031.$1)))((map(countCase_5015))(e_5031.$2))
    } else if(e_5031.$tag==1){
      return Empty_4769
    } else if(e_5031.$tag==6){
      return ((foldl((mergeCount_4905($instance_447))($instance_506)))(Empty_4769))((map(getCount_4904))(e_5031.$2))
    } else error("pattern match fail in //compiler/inliner.jg at line 67, column 17",e_5031)
  };
  return ((up_4883(a_5055 => e_5056 => ($_4739(Pair_4802(a_5055)))((withAnn_4885(((((setAnn_4894($instance_447))($instance_506))("useCount"))(($_4739(AnnUseCount_4835))(countExpr_5017(e_5056))))(annOf_4875(e_5056))))(e_5056))))(Unit_4742))(e_5013)
};
const mapBindings_4907 = f_5057 => bs_5058 => (map(b_5059 => (Pair_4802(b_5059.$0))(f_5057(b_5059.$1))))(bs_5058);
const deadCode_4912 = e_5084 => {
  const f_5085 = e_5086 => {
    if(e_5086.$tag==5){
      const useCount_5090 = ((foldl((mergeCount_4905($instance_447))($instance_506)))(getCount_4904(e_5086.$2)))((map(b_5092 => getCount_4904(snd_4756(b_5092))))(e_5086.$1));
      const bs2_5091 = (dropDeadBindings_4919(useCount_5090))(e_5086.$1);
      return ((Let_4882(e_5086.$0))(bs2_5091))(e_5086.$2)
    } else return e_5086
  };
  return snd_4756(((down_4823(a_5094 => e_5095 => (Pair_4802(a_5094))(f_5085(e_5095))))(Unit_4742))(e_5084))
};
const pass_4910 = bs_5072 => {
  const bs2_5073 = (mapBindings_4907(e_5077 => ($_4739(snd_4756))(annWithUseCount_4906(e_5077))))(bs_5072);
  const useCount_5074 = ((foldl((mergeCount_4905($instance_447))($instance_506)))(Empty_4769))((map(b_5078 => getCount_4904(snd_4756(b_5078))))(bs2_5073));
  const bs3_5075 = (mapBindings_4907(deadCode_4912))((dropDeadBindings_4919(useCount_5074))(bs2_5073));
  const always_5076 = (chooseForInlining_4915(Empty_4769))(bs3_5075);
  return (($gt$gt$eq($instance_502))(((mapBindingsM_4908($instance_502))(n_5079 => e_5080 => (inlineCode_4917((((remove_4740($instance_447))($instance_506))(n_5079))(always_5076)))(e_5080)))(bs3_5075)))(bs_5081 => (ret($instance_502))((mapBindings_4907(betaReduction_4916))(bs_5081)))
};
const optBindings_4901 = env_4931 => bs_4932 => {
  const scc_4933 = computeSCC_4899(bs_4932);
  const optCc_4934 = env_4936 => bs_4937 => {
    const optB_4938 = $pat_4939 => $pat_4942 => {
      const e2_4945 = (optExpr_4902($pat_4939.$1))($pat_4942.$1);
      if(e2_4945.$tag==0){
        return (Pair_4802($pat_4939.$0))(((((insert_4800($instance_447))($instance_506))($pat_4942.$0))(e2_4945))($pat_4939.$1))
      } else if(e2_4945.$tag==1){
        return (Pair_4802($pat_4939.$0))(((((insert_4800($instance_447))($instance_506))($pat_4942.$0))(e2_4945))($pat_4939.$1))
      } else return (Pair_4802((push((Pair_4802($pat_4942.$0))(e2_4945)))($pat_4939.$0)))(((((insert_4800($instance_447))($instance_506))($pat_4942.$0))(e2_4945))($pat_4939.$1))
    };
    return ((foldl(optB_4938))((Pair_4802([]))(env_4936)))(bs_4937)
  };
  const f_4935 = $pat_4951 => bs_4954 => {
    const $pat_27_4_4955 = (optCc_4934($pat_4951.$1))(bs_4954);
    let $phi$539;
    $phi$539 = $pat_27_4_4955.$0;
    const bs2_4956 = $phi$539;
    let $phi$540;
    $phi$540 = $pat_27_4_4955.$1;
    const env2_4957 = $phi$540;
    return (Pair_4802((concat($pat_4951.$0))(bs2_4956)))(env2_4957)
  };
  return ((foldl(f_4935))((Pair_4802([]))(env_4931)))(scc_4933)
};
const optExpr_4902 = env_4962 => e_4963 => {
  if(e_4963.$tag==0){
    const $phi$547 = (((lookup_4801($instance_447))($instance_506))(e_4963.$1))(env_4962);
    if(($phi$547.$tag==0)&&($phi$547.$0.$tag==0)){
      return (Var_4832(e_4963.$0))($phi$547.$0.$1)
    } else if(($phi$547.$tag==0)&&($phi$547.$0.$tag==1)){
      return (Const_4826(e_4963.$0))($phi$547.$0.$1)
    } else return e_4963
  } else if(e_4963.$tag==2){
    return ((App_4822(e_4963.$0))((optExpr_4902(env_4962))(e_4963.$1)))((optExpr_4902(env_4962))(e_4963.$2))
  } else if(e_4963.$tag==3){
    return ((Lam_4874(e_4963.$0))(e_4963.$1))((optExpr_4902(env_4962))(e_4963.$2))
  } else if(e_4963.$tag==5){
    const $phi$545 = (optBindings_4901(env_4962))(e_4963.$1);
    return ((Let_4882(e_4963.$0))($phi$545.$0))((optExpr_4902($phi$545.$1))(e_4963.$2))
  } else if(e_4963.$tag==4){
    return ((Case_4853(e_4963.$0))((optExpr_4902(env_4962))(e_4963.$1)))((map(optPat_4903(env_4962)))(e_4963.$2))
  } else if(e_4963.$tag==1){
    return e_4963
  } else if(e_4963.$tag==6){
    const $phi$543 = (((lookup_4801($instance_447))($instance_506))(e_4963.$1))(env_4962);
    if(($phi$543.$tag==0)&&($phi$543.$0.$tag==0)){
      return ((New_4821(e_4963.$0))($phi$543.$0.$1))((map(optExpr_4902(env_4962)))(e_4963.$2))
    } else return ((New_4821(e_4963.$0))(e_4963.$1))((map(optExpr_4902(env_4962)))(e_4963.$2))
  } else error("pattern match fail in //compiler/inliner.jg at line 32, column 17",e_4963)
};
const optPat_4903 = env_4993 => pe_4994 => {
  const f_4997 = p_4998 => {
    if(p_4998.$tag==2){
      const $phi$551 = (((lookup_4801($instance_447))($instance_506))(p_4998.$1))(env_4993);
      if(($phi$551.$tag==0)&&($phi$551.$0.$tag==0)){
        return ((PData_4879(p_4998.$0))($phi$551.$0.$1))((map(f_4997))(p_4998.$2))
      } else return ((PData_4879(p_4998.$0))(p_4998.$1))((map(f_4997))(p_4998.$2))
    } else return p_4998
  };
  return (Pair_4802(f_4997(pe_4994.$0)))((optExpr_4902(env_4993))(pe_4994.$1))
};
const inline_4900 = enable_4920 => m_4921 => (($gt$gt$eq($instance_502))(getUid_4897))(uid_4922 => {
  let $phi$553;
  if(enable_4920){
    $phi$553 = (fst_4750((optBindings_4901(Empty_4769))(m_4921.$6)))
  } else if(!enable_4920){
    $phi$553 = m_4921.$6
  } else error("pattern match fail in //compiler/inliner.jg at line 10, column 11",enable_4920);
  const obs_4930 = $phi$553;
  return (ret($instance_502))(((((((Module_4843(m_4921.$0))(m_4921.$1))(m_4921.$2))(m_4921.$3))(m_4921.$4))(m_4921.$5))(obs_4930))
});
const loopPasses_4909 = local$instance$Monad$0 => n_5068 => p_5069 => bs_5070 => {
  if(0==n_5068){
    return (ret(local$instance$Monad$0))(bs_5070)
  } else return (($gt$gt$eq(local$instance$Monad$0))(p_5069(bs_5070)))(((loopPasses_4909(local$instance$Monad$0))(n_5068-1))(p_5069))
};
const processImports_4911 = useCount_5082 => is_5083 => is_5083;
const head_5216 = head_46;
const $gt$gt_5217 = $gt$gt_21;
const size_5218 = size_72;
const setContains_5219 = setContains_82;
const uniq_5220 = uniq_51;
const all_5221 = all_38;
const mconcat_5222 = mconcat_22;
const zip_5223 = zip_43;
const $lt$eq_5224 = $lt$eq_19;
const setAddAll_5225 = setAddAll_80;
const BitmapIndexed_5226 = BitmapIndexed_14;
const reverse_5227 = reverse_52;
const isEmpty_5228 = isEmpty_73;
const $_5229 = $_16;
const remove_5230 = remove_69;
const forM_5231 = forM_58;
const Unit_5232 = Unit_0;
const loop_5233 = loop_32;
const either_5234 = either_29;
const runState_5235 = runState_61;
const assert_5236 = assert_94;
const setRemove_5237 = setRemove_81;
const zipWithIndex2_5238 = zipWithIndex2_41;
const Left_5239 = Left_8;
const fst_5240 = fst_27;
const setDiff_5241 = setDiff_85;
const insertAll_5242 = insertAll_77;
const mapJust_5243 = mapJust_45;
const maybe_5244 = maybe_23;
const concatMap_5245 = concatMap_44;
const snd_5246 = snd_28;
const mergeSet_5247 = mergeSet_50;
const join_5248 = join_39;
const setIntersection_5249 = setIntersection_86;
const zipWithIndex_5250 = zipWithIndex_42;
const Tuple3_5251 = Tuple3_4;
const mapFst_5252 = mapFst_92;
const mapIx_5253 = mapIx_35;
const foldM_5254 = foldM_56;
const Just_5255 = Just_1;
const Tuple4_5256 = Tuple4_5;
const toRecord_5257 = toRecord_54;
const hamtMask_5258 = hamtMask_64;
const Empty_5259 = Empty_11;
const strToArray_5260 = strToArray_55;
const Tuple5_5261 = Tuple5_6;
const mapSnd_5262 = mapSnd_93;
const setUnion_5263 = setUnion_83;
const Nothing_5264 = Nothing_2;
const trieKeys_5265 = trieKeys_75;
const Tuple6_5266 = Tuple6_7;
const $div$eq_5267 = $div$eq_17;
const justOr_5268 = justOr_24;
const tail_5269 = tail_47;
const init_5270 = init_49;
const debugIf_5271 = debugIf_88;
const sets_5272 = sets_60;
const State_5273 = State_10;
const mapM_5274 = mapM_57;
const hamtIndex_5275 = hamtIndex_65;
const mergeTrie_5276 = mergeTrie_74;
const Collision_5277 = Collision_13;
const not_5278 = not_31;
const evalState_5279 = evalState_62;
const debugMaybe_5280 = debugMaybe_89;
const containsChar_5281 = containsChar_36;
const emptySet_5282 = emptySet_78;
const updateOrSet_5283 = updateOrSet_68;
const isJust_5284 = isJust_26;
const last_5285 = last_48;
const trieEntries_5286 = trieEntries_76;
const mapTrie_5287 = mapTrie_71;
const fromJust_5288 = fromJust_25;
const find_5289 = find_34;
const insert_5290 = insert_67;
const lookup_5291 = lookup_66;
const Pair_5292 = Pair_3;
const repeat_5293 = repeat_40;
const foldTrie_5294 = foldTrie_70;
const exists_5295 = exists_37;
const setToArray_5296 = setToArray_84;
const Right_5297 = Right_9;
const debugWrap_5298 = debugWrap_90;
const gets_5299 = gets_59;
const $gt_5300 = $gt_18;
const Identity_5301 = Identity_15;
const popCount_5302 = popCount_63;
const dedup_5303 = dedup_53;
const Leaf_5304 = Leaf_12;
const debug2_5305 = debug2_87;
const $gt$eq$gt_5306 = $gt$eq$gt_91;
const splitEither_5307 = splitEither_30;
const setAdd_5308 = setAdd_79;
const contains_5309 = contains_33;
const $gt$eq_5310 = $gt$eq_20;
const New_5311 = New_785;
const App_5312 = App_781;
const down_5313 = down_840;
const dataConName_5314 = dataConName_829;
const CNum_5315 = CNum_786;
const Const_5316 = Const_780;
const getAnnType_5317 = getAnnType_816;
const TRow_5318 = TRow_803;
const Inst_5319 = Inst_797;
const printCodeLoc_5320 = printCodeLoc_820;
const getPatType_5321 = getPatType_835;
const Var_5322 = Var_779;
const getAnnCodeLoc_5323 = getAnnCodeLoc_818;
const equivBound_5324 = equivBound_823;
const AnnUseCount_5325 = AnnUseCount_775;
const Data_5326 = Data_793;
const AnnData_5327 = AnnData_776;
const exprLoc_5328 = exprLoc_821;
const getAnn_5329 = getAnn_811;
const downM_5330 = downM_845;
const TForall_5331 = TForall_805;
const copyAnn_5332 = copyAnn_813;
const Module_5333 = Module_791;
const ModuleInterface_5334 = ModuleInterface_792;
const TApp_5335 = TApp_802;
const CStr_5336 = CStr_787;
const TCBound_5337 = TCBound_798;
const TConst_5338 = TConst_799;
const ImportOpen_5339 = ImportOpen_808;
const equivType_5340 = equivType_828;
const dataConNames_5341 = dataConNames_830;
const downAndUp_5342 = downAndUp_838;
const Case_5343 = Case_783;
const getType_5344 = getType_834;
const ImportClosed_5345 = ImportClosed_807;
const TSkolem_5346 = TSkolem_801;
const breakableDownM_5347 = breakableDownM_846;
const upM_5348 = upM_844;
const AnnCodeLoc_5349 = AnnCodeLoc_774;
const TBot_5350 = TBot_804;
const PConst_5351 = PConst_789;
const TVar_5352 = TVar_800;
const emptyAnn_5353 = emptyAnn_810;
const setAnnCodeLoc_5354 = setAnnCodeLoc_819;
const Instance_5355 = Instance_796;
const AnnExport_5356 = AnnExport_778;
const TUnknown_5357 = TUnknown_806;
const breakableDownAndUpM_5358 = breakableDownAndUpM_842;
const namesInPat_5359 = namesInPat_822;
const breakableDownAndUp_5360 = breakableDownAndUp_837;
const PVar_5361 = PVar_788;
const DataCon_5362 = DataCon_794;
const Class_5363 = Class_795;
const Lam_5364 = Lam_782;
const annOf_5365 = annOf_832;
const setAnnType_5366 = setAnnType_817;
const AnnTag_5367 = AnnTag_777;
const compareBound_5368 = compareBound_827;
const PData_5369 = PData_790;
const getAnnE_5370 = getAnnE_814;
const AnnType_5371 = AnnType_773;
const Let_5372 = Let_784;
const up_5373 = up_839;
const breakableDown_5374 = breakableDown_841;
const withAnn_5375 = withAnn_833;
const setPatType_5376 = setPatType_836;
const setType_5377 = setType_831;
const compareArr_5378 = compareArr_825;
const ImportAll_5379 = ImportAll_809;
const compareOrd_5380 = compareOrd_824;
const downAndUpM_5381 = downAndUpM_843;
const hasAnnE_5382 = hasAnnE_815;
const compareType_5383 = compareType_826;
const setAnn_5384 = setAnn_812;
const newIdent_5385 = newIdent_4605;
const rewriteExpr_5386 = rewriteExpr_4606;
const dropExport_5388 = f_5392 => b_5393 => {
  const $phi$557 = (((getAnn_5329($instance_447))($instance_506))("export"))(annOf_5365(b_5393.$1));
  if($phi$557.$tag==1){
    return (ret($instance_502))(b_5393)
  } else if(($phi$557.$tag==0)&&($phi$557.$0.$tag==5)){
    return (($gt$gt$eq($instance_502))(gets_5299))(ns_5397 => (($gt$gt_5217($instance_502))(sets_5272(((((insert_5290($instance_447))($instance_506))((f_5392+"#")+$phi$557.$0.$0))(b_5393.$0))(ns_5397))))((ret($instance_502))((Pair_5292(b_5393.$0))((withAnn_5375((((remove_5230($instance_447))($instance_506))("export"))(annOf_5365(b_5393.$1))))(b_5393.$1)))))
  } else error("pattern match fail in //compiler/moduleMerger.jg at line 8, column 15",$phi$557)
};
const importAsBindings_5390 = ens_5423 => dataAnns_5424 => i_5425 => {
  if((i_5425.$tag==1)&&("./builtins.js"==i_5425.$1)){
    return []
  } else if(i_5425.$tag==1){
    const f_5431 = p_5432 => {
      const $phi$561 = (((lookup_5291($instance_447))($instance_506))((i_5425.$1+"#")+p_5432.$0))(ens_5423);
      if($phi$561.$tag==0){
        return (Pair_5292(p_5432.$1))((Var_5322(($_5229(justOr_5268(emptyAnn_5353)))((((lookup_5291($instance_447))($instance_506))($phi$561.$0))(dataAnns_5424))))($phi$561.$0))
      } else if($phi$561.$tag==1){
        return error((("mod merger encountered unknown import "+i_5425.$1)+"#")+p_5432.$0)
      } else error("pattern match fail in //compiler/moduleMerger.jg at line 30, column 21",$phi$561)
    };
    return (map(f_5431))((filter(p_5436 => (($div$eq_5267($instance_447))(fst_5240(p_5436)))(snd_5246(p_5436))))(i_5425.$2))
  } else error("pattern match fail in //compiler/moduleMerger.jg at line 26, column 35",i_5425)
};
const mergeInto_5389 = a_5398 => b_5399 => (($gt$gt$eq($instance_502))(((mapM_5274($instance_502))(dropExport_5388(a_5398.$1)))(a_5398.$6)))(bs_5407 => (($gt$gt$eq($instance_502))(gets_5299))(ns_5408 => {
  const f_5410 = local$instance$Eq$1 => local$instance$Hashable$0 => r_5411 => b_5412 => {
    const $phi$565 = (((getAnn_5329($instance_447))($instance_506))("data"))(annOf_5365(b_5412.$1));
    if($phi$565.$tag==1){
      return r_5411
    } else if($phi$565.$tag==0){
      return ((((insert_5290(local$instance$Eq$1))(local$instance$Hashable$0))(b_5412.$0))(((((setAnn_5384($instance_447))($instance_506))("data"))($phi$565.$0))(emptyAnn_5353)))(r_5411)
    } else error("pattern match fail in //compiler/moduleMerger.jg at line 18, column 21",$phi$565)
  };
  const dataAnns_5409 = ((foldl((f_5410($instance_447))($instance_506)))(Empty_5259))(bs_5407);
  return (ret($instance_502))(((((((Module_5333(a_5398.$0))(b_5399.$1))(a_5398.$2))([]))([]))([]))((concat(bs_5407))((concat((((concatMap_5245($instance_452))($instance_450))((importAsBindings_5390(ns_5408))(dataAnns_5409)))(b_5399.$2)))(b_5399.$6))))
}));
const mergeModules_5387 = ms_5391 => (evalState_5279(Empty_5259))((((foldM_5254($instance_502))(mergeInto_5389))(head_5216(ms_5391)))(tail_5269(ms_5391)));
const head_5437 = head_46;
const $gt$gt_5438 = $gt$gt_21;
const size_5439 = size_72;
const setContains_5440 = setContains_82;
const uniq_5441 = uniq_51;
const all_5442 = all_38;
const mconcat_5443 = mconcat_22;
const zip_5444 = zip_43;
const $lt$eq_5445 = $lt$eq_19;
const setAddAll_5446 = setAddAll_80;
const BitmapIndexed_5447 = BitmapIndexed_14;
const reverse_5448 = reverse_52;
const isEmpty_5449 = isEmpty_73;
const $_5450 = $_16;
const remove_5451 = remove_69;
const forM_5452 = forM_58;
const Unit_5453 = Unit_0;
const loop_5454 = loop_32;
const either_5455 = either_29;
const runState_5456 = runState_61;
const assert_5457 = assert_94;
const setRemove_5458 = setRemove_81;
const zipWithIndex2_5459 = zipWithIndex2_41;
const Left_5460 = Left_8;
const fst_5461 = fst_27;
const setDiff_5462 = setDiff_85;
const insertAll_5463 = insertAll_77;
const mapJust_5464 = mapJust_45;
const maybe_5465 = maybe_23;
const concatMap_5466 = concatMap_44;
const snd_5467 = snd_28;
const mergeSet_5468 = mergeSet_50;
const join_5469 = join_39;
const setIntersection_5470 = setIntersection_86;
const zipWithIndex_5471 = zipWithIndex_42;
const Tuple3_5472 = Tuple3_4;
const mapFst_5473 = mapFst_92;
const mapIx_5474 = mapIx_35;
const foldM_5475 = foldM_56;
const Just_5476 = Just_1;
const Tuple4_5477 = Tuple4_5;
const toRecord_5478 = toRecord_54;
const hamtMask_5479 = hamtMask_64;
const Empty_5480 = Empty_11;
const strToArray_5481 = strToArray_55;
const Tuple5_5482 = Tuple5_6;
const mapSnd_5483 = mapSnd_93;
const setUnion_5484 = setUnion_83;
const Nothing_5485 = Nothing_2;
const trieKeys_5486 = trieKeys_75;
const Tuple6_5487 = Tuple6_7;
const $div$eq_5488 = $div$eq_17;
const justOr_5489 = justOr_24;
const tail_5490 = tail_47;
const init_5491 = init_49;
const debugIf_5492 = debugIf_88;
const sets_5493 = sets_60;
const State_5494 = State_10;
const mapM_5495 = mapM_57;
const hamtIndex_5496 = hamtIndex_65;
const mergeTrie_5497 = mergeTrie_74;
const Collision_5498 = Collision_13;
const not_5499 = not_31;
const evalState_5500 = evalState_62;
const debugMaybe_5501 = debugMaybe_89;
const containsChar_5502 = containsChar_36;
const emptySet_5503 = emptySet_78;
const updateOrSet_5504 = updateOrSet_68;
const isJust_5505 = isJust_26;
const last_5506 = last_48;
const trieEntries_5507 = trieEntries_76;
const mapTrie_5508 = mapTrie_71;
const fromJust_5509 = fromJust_25;
const find_5510 = find_34;
const insert_5511 = insert_67;
const lookup_5512 = lookup_66;
const Pair_5513 = Pair_3;
const repeat_5514 = repeat_40;
const foldTrie_5515 = foldTrie_70;
const exists_5516 = exists_37;
const setToArray_5517 = setToArray_84;
const Right_5518 = Right_9;
const debugWrap_5519 = debugWrap_90;
const gets_5520 = gets_59;
const $gt_5521 = $gt_18;
const Identity_5522 = Identity_15;
const popCount_5523 = popCount_63;
const dedup_5524 = dedup_53;
const Leaf_5525 = Leaf_12;
const debug2_5526 = debug2_87;
const $gt$eq$gt_5527 = $gt$eq$gt_91;
const splitEither_5528 = splitEither_30;
const setAdd_5529 = setAdd_79;
const contains_5530 = contains_33;
const $gt$eq_5531 = $gt$eq_20;
const New_5532 = New_785;
const App_5533 = App_781;
const down_5534 = down_840;
const dataConName_5535 = dataConName_829;
const CNum_5536 = CNum_786;
const Const_5537 = Const_780;
const getAnnType_5538 = getAnnType_816;
const TRow_5539 = TRow_803;
const Inst_5540 = Inst_797;
const printCodeLoc_5541 = printCodeLoc_820;
const getPatType_5542 = getPatType_835;
const Var_5543 = Var_779;
const getAnnCodeLoc_5544 = getAnnCodeLoc_818;
const equivBound_5545 = equivBound_823;
const AnnUseCount_5546 = AnnUseCount_775;
const Data_5547 = Data_793;
const AnnData_5548 = AnnData_776;
const exprLoc_5549 = exprLoc_821;
const getAnn_5550 = getAnn_811;
const downM_5551 = downM_845;
const TForall_5552 = TForall_805;
const copyAnn_5553 = copyAnn_813;
const Module_5554 = Module_791;
const ModuleInterface_5555 = ModuleInterface_792;
const TApp_5556 = TApp_802;
const CStr_5557 = CStr_787;
const TCBound_5558 = TCBound_798;
const TConst_5559 = TConst_799;
const ImportOpen_5560 = ImportOpen_808;
const equivType_5561 = equivType_828;
const dataConNames_5562 = dataConNames_830;
const downAndUp_5563 = downAndUp_838;
const Case_5564 = Case_783;
const getType_5565 = getType_834;
const ImportClosed_5566 = ImportClosed_807;
const TSkolem_5567 = TSkolem_801;
const breakableDownM_5568 = breakableDownM_846;
const upM_5569 = upM_844;
const AnnCodeLoc_5570 = AnnCodeLoc_774;
const TBot_5571 = TBot_804;
const PConst_5572 = PConst_789;
const TVar_5573 = TVar_800;
const emptyAnn_5574 = emptyAnn_810;
const setAnnCodeLoc_5575 = setAnnCodeLoc_819;
const Instance_5576 = Instance_796;
const AnnExport_5577 = AnnExport_778;
const TUnknown_5578 = TUnknown_806;
const breakableDownAndUpM_5579 = breakableDownAndUpM_842;
const namesInPat_5580 = namesInPat_822;
const breakableDownAndUp_5581 = breakableDownAndUp_837;
const PVar_5582 = PVar_788;
const DataCon_5583 = DataCon_794;
const Class_5584 = Class_795;
const Lam_5585 = Lam_782;
const annOf_5586 = annOf_832;
const setAnnType_5587 = setAnnType_817;
const AnnTag_5588 = AnnTag_777;
const compareBound_5589 = compareBound_827;
const PData_5590 = PData_790;
const getAnnE_5591 = getAnnE_814;
const AnnType_5592 = AnnType_773;
const Let_5593 = Let_784;
const up_5594 = up_839;
const breakableDown_5595 = breakableDown_841;
const withAnn_5596 = withAnn_833;
const setPatType_5597 = setPatType_836;
const setType_5598 = setType_831;
const compareArr_5599 = compareArr_825;
const ImportAll_5600 = ImportAll_809;
const compareOrd_5601 = compareOrd_824;
const downAndUpM_5602 = downAndUpM_843;
const hasAnnE_5603 = hasAnnE_815;
const compareType_5604 = compareType_826;
const setAnn_5605 = setAnn_812;
const freeVars_5606 = freeVars_2565;
const normalize_5608 = ms_5639 => freeVars_5640 => i_5641 => {
  if(i_5641.$tag==0){
    return error("closed imports not supported")
  } else if(i_5641.$tag==1){
    return i_5641
  } else if((i_5641.$tag==2)&&("./builtins.js"==i_5641.$1)){
    const $phi$573 = (get("./builtins.js"))(ms_5639);
    return ((ImportOpen_5560(i_5641.$0))("./builtins.js"))((map(n_5652 => (Pair_5513(n_5652))(n_5652)))(trieKeys_5486($phi$573.$0)))
  } else if(i_5641.$tag==2){
    const $phi$569 = (has(i_5641.$1))(ms_5639);
    if($phi$569){
      const $phi$571 = (get(i_5641.$1))(ms_5639);
      return ((ImportOpen_5560(i_5641.$0))(i_5641.$1))((map(n_5658 => (Pair_5513(n_5658))(n_5658)))(trieKeys_5486($phi$571.$0)))
    } else if(!$phi$569){
      return error((("no mod "+i_5641.$1)+" in ")+(jsonStringify(keys(ms_5639))))
    } else error("pattern match fail in //compiler/importNormalizer.jg at line 20, column 22",$phi$569)
  } else error("pattern match fail in //compiler/importNormalizer.jg at line 15, column 27",i_5641)
};
const normalizeImports_5607 = ms_5609 => m_5610 => {
  const topLevelNames_5621 = (concat((map(fst_5461))(m_5610.$6)))((((concatMap_5466($instance_452))($instance_450))(ni_5632 => (map(fst_5461))(ni_5632.$1.$3)))(m_5610.$5));
  const getFromDefs_5618 = ds_5624 => ((foldl((setUnion_5484($instance_447))($instance_506)))(Empty_5480))((map(v_5625 => (freeVars_5606(Empty_5480))(snd_5467(v_5625))))(ds_5624));
  const freeVarsInIns_5620 = ((foldl((setUnion_5484($instance_447))($instance_506)))(Empty_5480))((map(ni_5626 => getFromDefs_5618(ni_5626.$1.$3)))(m_5610.$5));
  const freeVarsInDefs_5619 = getFromDefs_5618(m_5610.$6);
  const fvs_5622 = (filter(v_5638 => not_5499(((contains_5530($instance_447))(v_5638))(topLevelNames_5621))))(($_5450(setToArray_5517))((((setUnion_5484($instance_447))($instance_506))(freeVarsInDefs_5619))(freeVarsInIns_5620)));
  const is2_5623 = (map((normalize_5608(ms_5609))(fvs_5622)))((enqueue((ImportAll_5600(emptyAnn_5574))("./builtins.js")))(m_5610.$2));
  return ((((((Module_5554(m_5610.$0))(m_5610.$1))(is2_5623))(m_5610.$3))(m_5610.$4))(m_5610.$5))(m_5610.$6)
};
const head_5659 = head_46;
const $gt$gt_5660 = $gt$gt_21;
const size_5661 = size_72;
const setContains_5662 = setContains_82;
const uniq_5663 = uniq_51;
const all_5664 = all_38;
const mconcat_5665 = mconcat_22;
const zip_5666 = zip_43;
const $lt$eq_5667 = $lt$eq_19;
const setAddAll_5668 = setAddAll_80;
const BitmapIndexed_5669 = BitmapIndexed_14;
const reverse_5670 = reverse_52;
const isEmpty_5671 = isEmpty_73;
const $_5672 = $_16;
const remove_5673 = remove_69;
const forM_5674 = forM_58;
const Unit_5675 = Unit_0;
const loop_5676 = loop_32;
const either_5677 = either_29;
const runState_5678 = runState_61;
const assert_5679 = assert_94;
const setRemove_5680 = setRemove_81;
const zipWithIndex2_5681 = zipWithIndex2_41;
const Left_5682 = Left_8;
const fst_5683 = fst_27;
const setDiff_5684 = setDiff_85;
const insertAll_5685 = insertAll_77;
const mapJust_5686 = mapJust_45;
const maybe_5687 = maybe_23;
const concatMap_5688 = concatMap_44;
const snd_5689 = snd_28;
const mergeSet_5690 = mergeSet_50;
const join_5691 = join_39;
const setIntersection_5692 = setIntersection_86;
const zipWithIndex_5693 = zipWithIndex_42;
const Tuple3_5694 = Tuple3_4;
const mapFst_5695 = mapFst_92;
const mapIx_5696 = mapIx_35;
const foldM_5697 = foldM_56;
const Just_5698 = Just_1;
const Tuple4_5699 = Tuple4_5;
const toRecord_5700 = toRecord_54;
const hamtMask_5701 = hamtMask_64;
const Empty_5702 = Empty_11;
const strToArray_5703 = strToArray_55;
const Tuple5_5704 = Tuple5_6;
const mapSnd_5705 = mapSnd_93;
const setUnion_5706 = setUnion_83;
const Nothing_5707 = Nothing_2;
const trieKeys_5708 = trieKeys_75;
const Tuple6_5709 = Tuple6_7;
const $div$eq_5710 = $div$eq_17;
const justOr_5711 = justOr_24;
const tail_5712 = tail_47;
const init_5713 = init_49;
const debugIf_5714 = debugIf_88;
const sets_5715 = sets_60;
const State_5716 = State_10;
const mapM_5717 = mapM_57;
const hamtIndex_5718 = hamtIndex_65;
const mergeTrie_5719 = mergeTrie_74;
const Collision_5720 = Collision_13;
const not_5721 = not_31;
const evalState_5722 = evalState_62;
const debugMaybe_5723 = debugMaybe_89;
const containsChar_5724 = containsChar_36;
const emptySet_5725 = emptySet_78;
const updateOrSet_5726 = updateOrSet_68;
const isJust_5727 = isJust_26;
const last_5728 = last_48;
const trieEntries_5729 = trieEntries_76;
const mapTrie_5730 = mapTrie_71;
const fromJust_5731 = fromJust_25;
const find_5732 = find_34;
const insert_5733 = insert_67;
const lookup_5734 = lookup_66;
const Pair_5735 = Pair_3;
const repeat_5736 = repeat_40;
const foldTrie_5737 = foldTrie_70;
const exists_5738 = exists_37;
const setToArray_5739 = setToArray_84;
const Right_5740 = Right_9;
const debugWrap_5741 = debugWrap_90;
const gets_5742 = gets_59;
const $gt_5743 = $gt_18;
const Identity_5744 = Identity_15;
const popCount_5745 = popCount_63;
const dedup_5746 = dedup_53;
const Leaf_5747 = Leaf_12;
const debug2_5748 = debug2_87;
const $gt$eq$gt_5749 = $gt$eq$gt_91;
const splitEither_5750 = splitEither_30;
const setAdd_5751 = setAdd_79;
const contains_5752 = contains_33;
const $gt$eq_5753 = $gt$eq_20;
const New_5754 = New_785;
const App_5755 = App_781;
const down_5756 = down_840;
const dataConName_5757 = dataConName_829;
const CNum_5758 = CNum_786;
const Const_5759 = Const_780;
const getAnnType_5760 = getAnnType_816;
const TRow_5761 = TRow_803;
const Inst_5762 = Inst_797;
const printCodeLoc_5763 = printCodeLoc_820;
const getPatType_5764 = getPatType_835;
const Var_5765 = Var_779;
const getAnnCodeLoc_5766 = getAnnCodeLoc_818;
const equivBound_5767 = equivBound_823;
const AnnUseCount_5768 = AnnUseCount_775;
const Data_5769 = Data_793;
const AnnData_5770 = AnnData_776;
const exprLoc_5771 = exprLoc_821;
const getAnn_5772 = getAnn_811;
const downM_5773 = downM_845;
const TForall_5774 = TForall_805;
const copyAnn_5775 = copyAnn_813;
const Module_5776 = Module_791;
const ModuleInterface_5777 = ModuleInterface_792;
const TApp_5778 = TApp_802;
const CStr_5779 = CStr_787;
const TCBound_5780 = TCBound_798;
const TConst_5781 = TConst_799;
const ImportOpen_5782 = ImportOpen_808;
const equivType_5783 = equivType_828;
const dataConNames_5784 = dataConNames_830;
const downAndUp_5785 = downAndUp_838;
const Case_5786 = Case_783;
const getType_5787 = getType_834;
const ImportClosed_5788 = ImportClosed_807;
const TSkolem_5789 = TSkolem_801;
const breakableDownM_5790 = breakableDownM_846;
const upM_5791 = upM_844;
const AnnCodeLoc_5792 = AnnCodeLoc_774;
const TBot_5793 = TBot_804;
const PConst_5794 = PConst_789;
const TVar_5795 = TVar_800;
const emptyAnn_5796 = emptyAnn_810;
const setAnnCodeLoc_5797 = setAnnCodeLoc_819;
const Instance_5798 = Instance_796;
const AnnExport_5799 = AnnExport_778;
const TUnknown_5800 = TUnknown_806;
const breakableDownAndUpM_5801 = breakableDownAndUpM_842;
const namesInPat_5802 = namesInPat_822;
const breakableDownAndUp_5803 = breakableDownAndUp_837;
const PVar_5804 = PVar_788;
const DataCon_5805 = DataCon_794;
const Class_5806 = Class_795;
const Lam_5807 = Lam_782;
const annOf_5808 = annOf_832;
const setAnnType_5809 = setAnnType_817;
const AnnTag_5810 = AnnTag_777;
const compareBound_5811 = compareBound_827;
const PData_5812 = PData_790;
const getAnnE_5813 = getAnnE_814;
const AnnType_5814 = AnnType_773;
const Let_5815 = Let_784;
const up_5816 = up_839;
const breakableDown_5817 = breakableDown_841;
const withAnn_5818 = withAnn_833;
const setPatType_5819 = setPatType_836;
const setType_5820 = setType_831;
const compareArr_5821 = compareArr_825;
const ImportAll_5822 = ImportAll_809;
const compareOrd_5823 = compareOrd_824;
const downAndUpM_5824 = downAndUpM_843;
const hasAnnE_5825 = hasAnnE_815;
const compareType_5826 = compareType_826;
const setAnn_5827 = setAnn_812;
const printType_5828 = printType_1476;
const printTypeBound_5829 = printTypeBound_1477;
const reallyPrintExpr_5830 = reallyPrintExpr_1481;
const printInst_5831 = printInst_1482;
const mkConFun_5832 = mkConFun_4391;
const instanceMatches_5833 = instanceMatches_2047;
const instantiateBound_5834 = instantiateBound_2048;
const checkEquivM_5835 = checkEquivM_2050;
const instFromDef_5836 = instFromDef_2590;
const processClass_5837 = processClass_2592;
const emptyCtx_5838 = emptyCtx_1802;
const S_5839 = $_0_5854 => $_1_5855 => $_2_5856 => ({$0:$_0_5854,$1:$_1_5855,$2:$_2_5856});
const getEnv_5845 = s_5944 => s_5944.$0;
const requiredInstances_5848 = toType_6035 => fromType_6036 => {
  if(fromType_6036.$tag==6){
    const bs_6041 = ((foldl(bs_6045 => v_6046 => ((((insert_5733($instance_447))($instance_506))(v_6046))(TUnknown_5800))(bs_6045)))(Empty_5702))(fromType_6036.$1);
    const $pat_200_6_6042 = (runState_5678(bs_6041))(((checkEquivM_5835(emptyCtx_5838))(toType_6035))(fromType_6036.$3));
    let $phi$579;
    $phi$579 = $pat_200_6_6042.$1;
    const __6043 = $phi$579;
    let $phi$580;
    $phi$580 = $pat_200_6_6042.$0;
    const reps_6044 = $phi$580;
    return (map(instantiateBound_5834(reps_6044)))(fromType_6036.$2)
  } else return []
};
const setEnv_5846 = env_5948 => s_5949 => ((S_5839(env_5948))(s_5949.$1))(s_5949.$2);
const breakableDownAndUpWithEnv_5849 = getEnv_6052 => setEnv_6053 => down_6054 => up_6055 => a_6056 => e_6057 => {
  const exitScope_6060 = a_6071 => (setEnv_6053(tail_5712(getEnv_6052(a_6071))))(a_6071);
  const processUp_6063 = a_6120 => e_6121 => {
    let $phi$582;
    if(e_6121.$tag==3){
      $phi$582 = (exitScope_6060(a_6120))
    } else if(e_6121.$tag==5){
      $phi$582 = (exitScope_6060(a_6120))
    } else $phi$582 = a_6120;
    const a2_6122 = $phi$582;
    return (up_6055(a2_6122))(e_6121)
  };
  const enterScope_6059 = bs_6067 => a_6068 => {
    const es_6069 = getEnv_6052(a_6068);
    const e_6070 = (((mergeTrie_5719($instance_447))($instance_506))(head_5659(es_6069)))(bs_6067);
    return (setEnv_6053((enqueue(e_6070))(es_6069)))(a_6068)
  };
  const patBindings_6064 = p_6130 => {
    if(p_6130.$tag==1){
      return Empty_5702
    } else if(p_6130.$tag==0){
      return ((((insert_5733($instance_447))($instance_506))(p_6130.$1))(getAnnType_5760(p_6130.$0)))(Empty_5702)
    } else if(p_6130.$tag==2){
      return ((foldl(env_6138 => p_6139 => (((mergeTrie_5719($instance_447))($instance_506))(patBindings_6064(p_6139)))(env_6138)))(Empty_5702))(p_6130.$2)
    } else error("pattern match fail in //compiler/declasser.jg at line 240, column 19",p_6130)
  };
  const go_6058 = a_6065 => e_6066 => (((breakableDownAndUp_5803(processDown_6061))(processUp_6063))(a_6065))(e_6066);
  const processDown_6061 = a_6072 => e_6073 => {
    const $phi$585 = (down_6054(a_6072))(e_6073);
    if($phi$585.$tag==1){
      return Right_5740($phi$585.$0)
    } else if($phi$585.$tag==0){
      if($phi$585.$0.$1.$tag==3){
        let $phi$592;
        const $phi$593 = getType_5787($phi$585.$0.$1);
        if(($phi$593.$tag==3)&&(($phi$593.$1.$tag==3)&&(($phi$593.$1.$1.$tag==0)&&("->"==$phi$593.$1.$1.$1)))){
          $phi$592 = $phi$593.$1.$2
        } else if(($phi$593.$tag==6)&&(($phi$593.$3.$tag==3)&&(($phi$593.$3.$1.$tag==3)&&(($phi$593.$3.$1.$1.$tag==0)&&("->"==$phi$593.$3.$1.$1.$1))))){
          $phi$592 = $phi$593.$3.$1.$2
        } else $phi$592 = TUnknown_5800;
        const t_6080 = $phi$592;
        return Left_5682((Pair_5735((enterScope_6059(((((insert_5733($instance_447))($instance_506))($phi$585.$0.$1.$1))(t_6080))(Empty_5702)))($phi$585.$0.$0)))($phi$585.$0.$1))
      } else if($phi$585.$0.$1.$tag==5){
        const ts_6098 = ((foldl(ts_6099 => $pat_6100 => ((((insert_5733($instance_447))($instance_506))($pat_6100.$0))(getType_5787($pat_6100.$1)))(ts_6099)))(Empty_5702))($phi$585.$0.$1.$1);
        return Left_5682((Pair_5735((enterScope_6059(ts_6098))($phi$585.$0.$0)))($phi$585.$0.$1))
      } else if($phi$585.$0.$1.$tag==4){
        const $phi$588 = (go_6058($phi$585.$0.$0))($phi$585.$0.$1.$1);
        const $phi$590 = ((foldl(processPat_6062))((Pair_5735($phi$588.$0))([])))($phi$585.$0.$1.$2);
        return Right_5740((Pair_5735($phi$590.$0))(((Case_5786($phi$585.$0.$1.$0))($phi$588.$1))($phi$590.$1)))
      } else return Left_5682((Pair_5735($phi$585.$0.$0))($phi$585.$0.$1))
    } else error("pattern match fail in //compiler/declasser.jg at line 212, column 21",$phi$585)
  };
  const processPat_6062 = ar_6111 => pat_6112 => {
    const bs_6117 = patBindings_6064(pat_6112.$0);
    const $phi$597 = (go_6058((enterScope_6059(bs_6117))(ar_6111.$0)))(pat_6112.$1);
    return (Pair_5735(exitScope_6060($phi$597.$0)))((push((Pair_5735(pat_6112.$0))($phi$597.$1)))(ar_6111.$1))
  };
  return (go_6058(a_6056))(e_6057)
};
const instanceNameFromBound_5853 = ix_6176 => b_6177 => (("local$instance$"+b_6177.$1)+"$")+(intToString(ix_6176));
const rewriteExpr_5847 = is_5953 => env_5954 => e_5955 => {
  const boundsToLam_5956 = a_5958 => e_5959 => {
    const addInstance_5960 = vs_5962 => b_5963 => a_5964 => {
      const name_5968 = (instanceNameFromBound_5853(a_5964.$2))(b_5963);
      return (Pair_5735(((S_5839(a_5964.$0))((push((Pair_5735(name_5968))((Inst_5762([]))(b_5963))))(a_5964.$1)))(a_5964.$2+1)))(name_5968)
    };
    const rewriteBound_5961 = vs_5969 => ae_5970 => ib_5971 => {
      const $phi$603 = ((addInstance_5960(vs_5969))(ib_5971.$1))(ae_5970.$0);
      return (Pair_5735($phi$603.$0))(((Lam_5807(emptyAnn_5796))($phi$603.$1))(ae_5970.$1))
    };
    const $phi$605 = getType_5787(e_5959);
    if($phi$605.$tag==6){
      const $phi$607 = (($gt_5743($instance_448))(length($phi$605.$2)))(0);
      if(!$phi$607){
        return (Pair_5735(a_5958))(e_5959)
      } else if($phi$607){
        const rewritten_5982 = ((foldr(rewriteBound_5961($phi$605.$1)))((Pair_5735(a_5958))((setType_5820($phi$605.$3))(e_5959))))(zipWithIndex_5693($phi$605.$2));
        return (mapSnd_5705(re_5983 => (withAnn_5818((((copyAnn_5775($instance_447))($instance_506))(["export"]))(annOf_5808(e_5959))))(re_5983)))(rewritten_5982)
      } else error("pattern match fail in //compiler/declasser.jg at line 142, column 28",$phi$607)
    } else return (Pair_5735(a_5958))(e_5959)
  };
  const rewriteVar_5957 = a_5985 => e_5986 => {
    if(e_5986.$tag==0){
      const findMatching_5991 = b_6005 => a_6006 => {
        const matching_6010 = (filter(p_6011 => ((instanceMatches_5833(emptyCtx_5838))(b_6005))(p_6011.$1)))(a_6006.$1);
        const $phi$613 = length(matching_6010);
        if(0==$phi$613){
          return error((((("declasser failed to find satisfying instance for "+(printTypeBound_5829(b_6005)))+" ")+(exprLoc_5771(e_5986)))+"\nKnown type class instances:")+((((concatMap_5688($instance_453))($instance_451))($pat_6014 => "\n  # "+(printInst_5831($pat_6014.$1))))(a_6006.$1)))
        } else if(1==$phi$613){
          return fst_5683((getIx(0))(matching_6010))
        } else return error((((("declasser found more than 1 satisfying instance for "+(printTypeBound_5829(b_6005)))+" ")+(exprLoc_5771(e_5986)))+"\n")+((join_5691((map(m_6018 => printInst_5831(snd_5689(m_6018))))(matching_6010)))(",")))
      };
      let $phi$615;
      const $phi$616 = getType_5787(e_5986);
      if($phi$616.$tag==6){
        $phi$615 = $phi$616.$3
      } else $phi$615 = $phi$616;
      const tv_5989 = $phi$615;
      const fromEnv_5990 = n_6001 => envs_6002 => {
        const env_6003 = head_5659(envs_6002);
        const $phi$618 = (((lookup_5734($instance_447))($instance_506))(n_6001))(env_6003);
        if($phi$618.$tag==1){
          return error((("no "+n_6001)+" in env ")+(jsonStringify(trieKeys_5708(env_6003))))
        } else if($phi$618.$tag==0){
          return $phi$618.$0
        } else error("pattern match fail in //compiler/declasser.jg at line 164, column 14",$phi$618)
      };
      const t_5992 = (fromEnv_5990(e_5986.$1))(getEnv_5845(a_5985));
      const is_5993 = (requiredInstances_5848(tv_5989))(t_5992);
      const mis_5994 = (map(b_6019 => (findMatching_5991(b_6019))(a_5985)))(is_5993);
      const e2_5995 = ((foldl(e_6020 => v_6021 => ((App_5755(emptyAnn_5796))(e_6020))((Var_5765(emptyAnn_5796))(v_6021))))(e_5986))(mis_5994);
      return (Pair_5735(a_5985))(e2_5995)
    } else if(e_5986.$tag==3){
      const dropInstance_6025 = v_6026 => a_6027 => ((S_5839(a_6027.$0))((filter(p_6031 => (($div$eq_5710($instance_447))(fst_5683(p_6031)))(v_6026)))(a_6027.$1)))(a_6027.$2);
      return (Pair_5735((dropInstance_6025(e_5986.$1))(a_5985)))(e_5986)
    } else return (Pair_5735(a_5985))(e_5986)
  };
  return snd_5689((((((breakableDownAndUpWithEnv_5849(getEnv_5845))(setEnv_5846))(a_6033 => e_6034 => Left_5682((boundsToLam_5956(a_6033))(e_6034))))(rewriteVar_5957))(((S_5839([env_5954]))(is_5953))(0)))(e_5955))
};
const className_5851 = n_6170 => "$class$"+n_6170;
const rewriteInstance_5844 = is_5934 => env_5935 => n_5936 => i_5937 => {
  const args_5942 = (map((rewriteExpr_5847(is_5934))(env_5935)))((map(snd_5689))(sort(i_5937.$3)));
  const e_5943 = ((foldl(App_5755(emptyAnn_5796)))((Var_5765(emptyAnn_5796))(className_5851(i_5937.$1))))(args_5942);
  return (Pair_5735(n_5936))((withAnn_5818(((((setAnn_5827($instance_447))($instance_506))("export"))(AnnExport_5799(n_5936)))(emptyAnn_5796)))(e_5943))
};
const className2_5852 = c_6171 => className_5851(c_6171.$1);
const mkClassDictAccessors_5843 = c_5920 => {
  const name_5925 = className2_5852(c_5920);
  const v_5927 = "x_"+name_5925;
  const f_5929 = b_5930 => (PVar_5804(emptyAnn_5796))((fst_5683(b_5930))+"_");
  const bsForPat_5926 = (map(f_5929))(sort(c_5920.$3));
  const rewrite_5928 = b_5931 => (Pair_5735(b_5931.$0))((setType_5820(b_5931.$1))(((Lam_5807(((((setAnn_5827($instance_447))($instance_506))("export"))(AnnExport_5799(b_5931.$0)))(emptyAnn_5796)))(v_5927))(((Case_5786(emptyAnn_5796))((Var_5765(emptyAnn_5796))(v_5927)))([(Pair_5735(((PData_5812(emptyAnn_5796))(name_5925))(bsForPat_5926)))((Var_5765(emptyAnn_5796))(b_5931.$0+"_"))]))));
  return (map(rewrite_5928))(($_5672(trieEntries_5729))((processClass_5837(Empty_5702))(c_5920)))
};
const rewriteImportedInstances_5841 = ms_5891 => _isi_5892 => imp_5893 => {
  if(imp_5893.$tag==1){
    const $phi$626 = (get(imp_5893.$1))(ms_5891);
    const importedClassNames_5902 = (map(n_5905 => (Pair_5735(n_5905))(n_5905)))((((concatMap_5688($instance_452))($instance_450))(c_5906 => (enqueue(className_5851(c_5906.$1)))((map(fst_5683))(c_5906.$3))))($phi$626.$1));
    const importedBounds_5903 = trieEntries_5729($phi$626.$2);
    const importedInsNames_5904 = (map(ni_5911 => (Pair_5735(fst_5683(ni_5911)))(fst_5683(ni_5911))))(importedBounds_5903);
    return (Pair_5735((push(((ImportOpen_5782(imp_5893.$0))(imp_5893.$1))((concat(imp_5893.$2))((concat(importedInsNames_5904))(importedClassNames_5902)))))(_isi_5892.$0)))((concat(_isi_5892.$1))(importedBounds_5903))
  } else error("pattern match fail in //compiler/declasser.jg at line 64, column 26",imp_5893)
};
const importsToTypeEnv_5850 = ms_6140 => is_6141 => {
  const getFile_6142 = i_6144 => {
    if(i_6144.$tag==2){
      return i_6144.$1
    } else if(i_6144.$tag==1){
      return i_6144.$1
    } else if(i_6144.$tag==0){
      return i_6144.$1
    } else error("pattern match fail in //compiler/declasser.jg at line 247, column 15",i_6144)
  };
  const addImports_6143 = env_6153 => i_6154 => {
    const $phi$630 = (get(getFile_6142(i_6154)))(ms_6140);
    let $phi$631;
    if(i_6154.$tag==2){
      $phi$631 = ((((mergeTrie_5719($instance_447))($instance_506))(env_6153))($phi$630.$0))
    } else if(i_6154.$tag==1){
      $phi$631 = (((foldl(env_6165 => n_6166 => ((((insert_5733($instance_447))($instance_506))(n_6166.$1))(($_5672(fromJust_5731))((((lookup_5734($instance_447))($instance_506))(n_6166.$0))($phi$630.$0))))(env_6165)))(env_6153))(i_6154.$2))
    } else $phi$631 = (error("import type not supported in type inference"));
    const env2_6158 = $phi$631;
    const env3_6159 = ((foldl(processClass_5837))(env2_6158))($phi$630.$1);
    return env3_6159
  };
  return ((foldl(addImports_6143))(Empty_5702))((enqueue((ImportAll_5822(emptyAnn_5796))("./builtins.js")))(is_6141))
};
const mkClassDictConstructor_5842 = c_5912 => {
  const name_5917 = className_5851(c_5912.$1);
  const type_5919 = ((TApp_5778(emptyAnn_5796))((TConst_5781(emptyAnn_5796))(c_5912.$1)))((TSkolem_5789(emptyAnn_5796))(c_5912.$2));
  const params_5918 = (map(snd_5689))(sort(($_5672(trieEntries_5729))((processClass_5837(Empty_5702))(c_5912))));
  return ((((mkConFun_5832(Nothing_5707))(type_5919))([c_5912.$2]))(name_5917))(params_5918)
};
const declassModule_5840 = ms_5857 => m_5858 => {
  const classFuns_5869 = (concat((map(mkClassDictConstructor_5842))(m_5858.$4)))((((concatMap_5688($instance_452))($instance_450))(mkClassDictAccessors_5843))(m_5858.$4));
  const _isi_5866 = ((foldl(rewriteImportedInstances_5841(ms_5857)))((Pair_5735([]))([])))(m_5858.$2);
  const importedInstances_5868 = snd_5689(_isi_5866);
  const availableInstances_5870 = (concat(importedInstances_5868))((map(mapSnd_5705(instFromDef_5836)))(m_5858.$5));
  const importedSymbols_5878 = (importsToTypeEnv_5850(ms_5857))(m_5858.$2);
  const localBindings_5879 = (concat(classFuns_5869))(m_5858.$6);
  const env_5871 = ((foldl(env_5880 => $pat_5881 => ((((insert_5733($instance_447))($instance_506))($pat_5881.$0))(getType_5787($pat_5881.$1)))(env_5880)))(importedSymbols_5878))(localBindings_5879);
  const instancesAsDicts_5876 = (map(p_5888 => (((rewriteInstance_5844(availableInstances_5870))(env_5871))(p_5888.$0))(p_5888.$1)))(m_5858.$5);
  const splitData_5884 = d_5885 => {
    const $phi$638 = (((lookup_5734($instance_447))($instance_506))("data"))(annOf_5808(snd_5689(d_5885)));
    if($phi$638.$tag==1){
      return Right_5740(d_5885)
    } else if($phi$638.$tag==0){
      return Left_5682(d_5885)
    } else error("pattern match fail in //compiler/declasser.jg at line 40, column 21",$phi$638)
  };
  const _sds_5872 = splitEither_5750((map(splitData_5884))(m_5858.$6));
  const nonAdtDs_5874 = snd_5689(_sds_5872);
  const declassedDs_5875 = (map(d_5887 => (Pair_5735(fst_5683(d_5887)))(((rewriteExpr_5847(availableInstances_5870))(env_5871))(snd_5689(d_5887)))))(nonAdtDs_5874);
  const adtDs_5873 = fst_5683(_sds_5872);
  const finalDs_5877 = (concat(adtDs_5873))((concat(classFuns_5869))((concat(instancesAsDicts_5876))(declassedDs_5875)));
  const impsWithImportedInstances_5867 = fst_5683(_isi_5866);
  return ((((((Module_5776(m_5858.$0))(m_5858.$1))(impsWithImportedInstances_5867))(m_5858.$3))([]))([]))(finalDs_5877)
};
const head_6181 = head_46;
const $gt$gt_6182 = $gt$gt_21;
const size_6183 = size_72;
const setContains_6184 = setContains_82;
const uniq_6185 = uniq_51;
const all_6186 = all_38;
const mconcat_6187 = mconcat_22;
const zip_6188 = zip_43;
const $lt$eq_6189 = $lt$eq_19;
const setAddAll_6190 = setAddAll_80;
const BitmapIndexed_6191 = BitmapIndexed_14;
const reverse_6192 = reverse_52;
const isEmpty_6193 = isEmpty_73;
const $_6194 = $_16;
const remove_6195 = remove_69;
const forM_6196 = forM_58;
const Unit_6197 = Unit_0;
const loop_6198 = loop_32;
const either_6199 = either_29;
const runState_6200 = runState_61;
const assert_6201 = assert_94;
const setRemove_6202 = setRemove_81;
const zipWithIndex2_6203 = zipWithIndex2_41;
const Left_6204 = Left_8;
const fst_6205 = fst_27;
const setDiff_6206 = setDiff_85;
const insertAll_6207 = insertAll_77;
const mapJust_6208 = mapJust_45;
const maybe_6209 = maybe_23;
const concatMap_6210 = concatMap_44;
const snd_6211 = snd_28;
const mergeSet_6212 = mergeSet_50;
const join_6213 = join_39;
const setIntersection_6214 = setIntersection_86;
const zipWithIndex_6215 = zipWithIndex_42;
const Tuple3_6216 = Tuple3_4;
const mapFst_6217 = mapFst_92;
const mapIx_6218 = mapIx_35;
const foldM_6219 = foldM_56;
const Just_6220 = Just_1;
const Tuple4_6221 = Tuple4_5;
const toRecord_6222 = toRecord_54;
const hamtMask_6223 = hamtMask_64;
const Empty_6224 = Empty_11;
const strToArray_6225 = strToArray_55;
const Tuple5_6226 = Tuple5_6;
const mapSnd_6227 = mapSnd_93;
const setUnion_6228 = setUnion_83;
const Nothing_6229 = Nothing_2;
const trieKeys_6230 = trieKeys_75;
const Tuple6_6231 = Tuple6_7;
const $div$eq_6232 = $div$eq_17;
const justOr_6233 = justOr_24;
const tail_6234 = tail_47;
const init_6235 = init_49;
const debugIf_6236 = debugIf_88;
const sets_6237 = sets_60;
const State_6238 = State_10;
const mapM_6239 = mapM_57;
const hamtIndex_6240 = hamtIndex_65;
const mergeTrie_6241 = mergeTrie_74;
const Collision_6242 = Collision_13;
const not_6243 = not_31;
const evalState_6244 = evalState_62;
const debugMaybe_6245 = debugMaybe_89;
const containsChar_6246 = containsChar_36;
const emptySet_6247 = emptySet_78;
const updateOrSet_6248 = updateOrSet_68;
const isJust_6249 = isJust_26;
const last_6250 = last_48;
const trieEntries_6251 = trieEntries_76;
const mapTrie_6252 = mapTrie_71;
const fromJust_6253 = fromJust_25;
const find_6254 = find_34;
const insert_6255 = insert_67;
const lookup_6256 = lookup_66;
const Pair_6257 = Pair_3;
const repeat_6258 = repeat_40;
const foldTrie_6259 = foldTrie_70;
const exists_6260 = exists_37;
const setToArray_6261 = setToArray_84;
const Right_6262 = Right_9;
const debugWrap_6263 = debugWrap_90;
const gets_6264 = gets_59;
const $gt_6265 = $gt_18;
const Identity_6266 = Identity_15;
const popCount_6267 = popCount_63;
const dedup_6268 = dedup_53;
const Leaf_6269 = Leaf_12;
const debug2_6270 = debug2_87;
const $gt$eq$gt_6271 = $gt$eq$gt_91;
const splitEither_6272 = splitEither_30;
const setAdd_6273 = setAdd_79;
const contains_6274 = contains_33;
const $gt$eq_6275 = $gt$eq_20;
const ArgBool_6276 = $_0_6284 => $_1_6285 => ({$0:$_0_6284,$1:$_1_6285,$tag:0});
const ArgString_6277 = $_0_6286 => $_1_6287 => ({$0:$_0_6286,$1:$_1_6287,$tag:1});
const ParsedArgs_6278 = $_0_6288 => $_1_6289 => $_2_6290 => ({$0:$_0_6288,$1:$_1_6289,$2:$_2_6290});
const $instance_6332 = $class$Eq(a_6330 => b_6331 => a_6330===b_6331);
const getBool_6283 = p_6320 => def_6321 => {
  const $phi$641 = ((contains_6274($instance_6332))(def_6321))(p_6320.$2);
  if(!$phi$641){
    return error("unrecognized arg that was not present for parsing")
  } else if($phi$641){
    if(def_6321.$tag==0){
      const $phi$644 = (has(def_6321.$0))(p_6320.$1);
      if(!$phi$644){
        if(def_6321.$1.$tag==0){
          return def_6321.$1.$0
        } else if(def_6321.$1.$tag==1){
          return error("no value for required arg "+def_6321.$0)
        } else error("pattern match fail in //compiler/args.jg at line 48, column 18",def_6321.$1)
      } else if($phi$644){
        const $phi$646 = (get(def_6321.$0))(p_6320.$1);
        if(""==$phi$646){
          return true
        } else if("True"==$phi$646){
          return true
        } else if("true"==$phi$646){
          return true
        } else if("1"==$phi$646){
          return true
        } else if("False"==$phi$646){
          return false
        } else if("false"==$phi$646){
          return false
        } else if("0"==$phi$646){
          return false
        } else return error("invalid value for a bool argument: "+$phi$646)
      } else error("pattern match fail in //compiler/args.jg at line 47, column 31",$phi$644)
    } else return error("arg is not a bool")
  } else error("pattern match fail in //compiler/args.jg at line 44, column 25",$phi$641)
};
const getString_6282 = p_6311 => def_6312 => {
  const $phi$650 = ((contains_6274($instance_6332))(def_6312))(p_6311.$2);
  if(!$phi$650){
    return error("unrecognized arg that was not present for parsing")
  } else if($phi$650){
    if(def_6312.$tag==1){
      const $phi$653 = (has(def_6312.$0))(p_6311.$1);
      if(!$phi$653){
        if(def_6312.$1.$tag==0){
          return def_6312.$1.$0
        } else if(def_6312.$1.$tag==1){
          return error("no value for required arg "+def_6312.$0)
        } else error("pattern match fail in //compiler/args.jg at line 37, column 18",def_6312.$1)
      } else if($phi$653){
        return (get(def_6312.$0))(p_6311.$1)
      } else error("pattern match fail in //compiler/args.jg at line 36, column 33",$phi$653)
    } else return error("arg is not a string")
  } else error("pattern match fail in //compiler/args.jg at line 33, column 25",$phi$650)
};
const getPositional_6281 = p_6307 => p_6307.$0;
const argName_6279 = a_6291 => {
  if(a_6291.$tag==0){
    return a_6291.$0
  } else if(a_6291.$tag==1){
    return a_6291.$0
  } else error("pattern match fail in //compiler/args.jg at line 12, column 13",a_6291)
};
const parseArgs_6280 = defs_6296 => argv_6297 => {
  const parse_6298 = r_6299 => arg_6300 => {
    const $phi$659 = ((($eq$eq($instance_447))((getChar(0))(arg_6300)))("-"))&&((($eq$eq($instance_447))((getChar(1))(arg_6300)))("-"));
    if(!$phi$659){
      return (Pair_6257((push(arg_6300))(r_6299.$0)))(r_6299.$1)
    } else if($phi$659){
      const name_6303 = (match("[^=]+"))((drop(2))(arg_6300));
      const value_6304 = (drop(1))((match("=.*"))(arg_6300));
      const $phi$661 = ((contains_6274($instance_447))(name_6303))((map(argName_6279))(defs_6296));
      if(!$phi$661){
        return error("unrecognized argument "+arg_6300)
      } else if($phi$661){
        return (Pair_6257(r_6299.$0))(((set(name_6303))(value_6304))(r_6299.$1))
      } else error("pattern match fail in //compiler/args.jg at line 23, column 12",$phi$661)
    } else error("pattern match fail in //compiler/args.jg at line 18, column 29",$phi$659)
  };
  const $phi$663 = ((foldl(parse_6298))((Pair_6257([]))(empty)))(argv_6297);
  return ((ParsedArgs_6278($phi$663.$0))($phi$663.$1))(defs_6296)
};
const JSRef_6333 = $_0_6360 => ({$0:$_0_6360,$tag:0});
const JSIndex_6334 = $_0_6361 => $_1_6362 => ({$0:$_0_6361,$1:$_1_6362,$tag:1});
const JSUnOp_6335 = $_0_6363 => $_1_6364 => ({$0:$_0_6363,$1:$_1_6364,$tag:2});
const JSBinOp_6336 = $_0_6365 => $_1_6366 => $_2_6367 => ({$0:$_0_6365,$1:$_1_6366,$2:$_2_6367,$tag:3});
const JSCall_6337 = $_0_6368 => $_1_6369 => ({$0:$_0_6368,$1:$_1_6369,$tag:4});
const JSFun_6338 = $_0_6370 => $_1_6371 => ({$0:$_0_6370,$1:$_1_6371,$tag:5});
const JSTernary_6339 = $_0_6372 => $_1_6373 => $_2_6374 => ({$0:$_0_6372,$1:$_1_6373,$2:$_2_6374,$tag:6});
const JSNum_6340 = $_0_6375 => ({$0:$_0_6375,$tag:7});
const JSString_6341 = $_0_6376 => ({$0:$_0_6376,$tag:8});
const JSBool_6342 = $_0_6377 => ({$0:$_0_6377,$tag:9});
const JSObject_6343 = $_0_6378 => ({$0:$_0_6378,$tag:10});
const JSArray_6344 = $_0_6379 => ({$0:$_0_6379,$tag:11});
const JSNull_6345 = {$tag:12};
const JSUndefined_6346 = {$tag:13};
const JSInstanceOf_6347 = $_0_6380 => $_1_6381 => ({$0:$_0_6380,$1:$_1_6381,$tag:14});
const JSNew_6348 = $_0_6382 => $_1_6383 => ({$0:$_0_6382,$1:$_1_6383,$tag:15});
const JSSeq_6349 = $_0_6384 => ({$0:$_0_6384,$tag:16});
const JSExpr_6350 = $_0_6385 => ({$0:$_0_6385,$tag:0});
const JSReturn_6351 = $_0_6386 => ({$0:$_0_6386,$tag:1});
const JSVar_6352 = $_0_6387 => $_1_6388 => ({$0:$_0_6387,$1:$_1_6388,$tag:2});
const JSConst_6353 = $_0_6389 => $_1_6390 => ({$0:$_0_6389,$1:$_1_6390,$tag:3});
const JSLet_6354 = $_0_6391 => $_1_6392 => ({$0:$_0_6391,$1:$_1_6392,$tag:4});
const JSSwitch_6355 = $_0_6393 => $_1_6394 => ({$0:$_0_6393,$1:$_1_6394,$tag:5});
const JSBreak_6356 = {$tag:6};
const JSAssign_6357 = $_0_6395 => $_1_6396 => ({$0:$_0_6395,$1:$_1_6396,$tag:7});
const JSIf_6358 = $_0_6397 => $_1_6398 => $_2_6399 => ({$0:$_0_6397,$1:$_1_6398,$2:$_2_6399,$tag:8});
const JSComment_6359 = $_0_6400 => ({$0:$_0_6400,$tag:9});
const head_6401 = head_46;
const $gt$gt_6402 = $gt$gt_21;
const size_6403 = size_72;
const setContains_6404 = setContains_82;
const uniq_6405 = uniq_51;
const all_6406 = all_38;
const mconcat_6407 = mconcat_22;
const zip_6408 = zip_43;
const $lt$eq_6409 = $lt$eq_19;
const setAddAll_6410 = setAddAll_80;
const BitmapIndexed_6411 = BitmapIndexed_14;
const reverse_6412 = reverse_52;
const isEmpty_6413 = isEmpty_73;
const $_6414 = $_16;
const remove_6415 = remove_69;
const forM_6416 = forM_58;
const Unit_6417 = Unit_0;
const loop_6418 = loop_32;
const either_6419 = either_29;
const runState_6420 = runState_61;
const assert_6421 = assert_94;
const setRemove_6422 = setRemove_81;
const zipWithIndex2_6423 = zipWithIndex2_41;
const Left_6424 = Left_8;
const fst_6425 = fst_27;
const setDiff_6426 = setDiff_85;
const insertAll_6427 = insertAll_77;
const mapJust_6428 = mapJust_45;
const maybe_6429 = maybe_23;
const concatMap_6430 = concatMap_44;
const snd_6431 = snd_28;
const mergeSet_6432 = mergeSet_50;
const join_6433 = join_39;
const setIntersection_6434 = setIntersection_86;
const zipWithIndex_6435 = zipWithIndex_42;
const Tuple3_6436 = Tuple3_4;
const mapFst_6437 = mapFst_92;
const mapIx_6438 = mapIx_35;
const foldM_6439 = foldM_56;
const Just_6440 = Just_1;
const Tuple4_6441 = Tuple4_5;
const toRecord_6442 = toRecord_54;
const hamtMask_6443 = hamtMask_64;
const Empty_6444 = Empty_11;
const strToArray_6445 = strToArray_55;
const Tuple5_6446 = Tuple5_6;
const mapSnd_6447 = mapSnd_93;
const setUnion_6448 = setUnion_83;
const Nothing_6449 = Nothing_2;
const trieKeys_6450 = trieKeys_75;
const Tuple6_6451 = Tuple6_7;
const $div$eq_6452 = $div$eq_17;
const justOr_6453 = justOr_24;
const tail_6454 = tail_47;
const init_6455 = init_49;
const debugIf_6456 = debugIf_88;
const sets_6457 = sets_60;
const State_6458 = State_10;
const mapM_6459 = mapM_57;
const hamtIndex_6460 = hamtIndex_65;
const mergeTrie_6461 = mergeTrie_74;
const Collision_6462 = Collision_13;
const not_6463 = not_31;
const evalState_6464 = evalState_62;
const debugMaybe_6465 = debugMaybe_89;
const containsChar_6466 = containsChar_36;
const emptySet_6467 = emptySet_78;
const updateOrSet_6468 = updateOrSet_68;
const isJust_6469 = isJust_26;
const last_6470 = last_48;
const trieEntries_6471 = trieEntries_76;
const mapTrie_6472 = mapTrie_71;
const fromJust_6473 = fromJust_25;
const find_6474 = find_34;
const insert_6475 = insert_67;
const lookup_6476 = lookup_66;
const Pair_6477 = Pair_3;
const repeat_6478 = repeat_40;
const foldTrie_6479 = foldTrie_70;
const exists_6480 = exists_37;
const setToArray_6481 = setToArray_84;
const Right_6482 = Right_9;
const debugWrap_6483 = debugWrap_90;
const gets_6484 = gets_59;
const $gt_6485 = $gt_18;
const Identity_6486 = Identity_15;
const popCount_6487 = popCount_63;
const dedup_6488 = dedup_53;
const Leaf_6489 = Leaf_12;
const debug2_6490 = debug2_87;
const $gt$eq$gt_6491 = $gt$eq$gt_91;
const splitEither_6492 = splitEither_30;
const setAdd_6493 = setAdd_79;
const contains_6494 = contains_33;
const $gt$eq_6495 = $gt$eq_20;
const JSUnOp_6496 = JSUnOp_6335;
const JSIf_6497 = JSIf_6358;
const JSUndefined_6498 = JSUndefined_6346;
const JSCall_6499 = JSCall_6337;
const JSObject_6500 = JSObject_6343;
const JSIndex_6501 = JSIndex_6334;
const JSRef_6502 = JSRef_6333;
const JSNull_6503 = JSNull_6345;
const JSArray_6504 = JSArray_6344;
const JSLet_6505 = JSLet_6354;
const JSTernary_6506 = JSTernary_6339;
const JSBool_6507 = JSBool_6342;
const JSInstanceOf_6508 = JSInstanceOf_6347;
const JSComment_6509 = JSComment_6359;
const JSBreak_6510 = JSBreak_6356;
const JSSeq_6511 = JSSeq_6349;
const JSFun_6512 = JSFun_6338;
const JSNew_6513 = JSNew_6348;
const JSAssign_6514 = JSAssign_6357;
const JSReturn_6515 = JSReturn_6351;
const JSString_6516 = JSString_6341;
const JSConst_6517 = JSConst_6353;
const JSNum_6518 = JSNum_6340;
const JSSwitch_6519 = JSSwitch_6355;
const JSVar_6520 = JSVar_6352;
const JSExpr_6521 = JSExpr_6350;
const JSBinOp_6522 = JSBinOp_6336;
const tryDCE_6523 = e_6526 => {
  if(((e_6526.$tag==3)&&("&&"==e_6526.$0))&&((e_6526.$1.$tag==9)&&e_6526.$1.$0)){
    return e_6526.$2
  } else if(((e_6526.$tag==3)&&("&&"==e_6526.$0))&&((e_6526.$2.$tag==9)&&e_6526.$2.$0)){
    return e_6526.$1
  } else if((e_6526.$tag==6)&&((e_6526.$0.$tag==9)&&e_6526.$0.$0)){
    return e_6526.$1
  } else if((e_6526.$tag==6)&&((e_6526.$0.$tag==9)&&(!e_6526.$0.$0))){
    return e_6526.$2
  } else return e_6526
};
const rewriteDCE_6524 = e_6534 => {
  if(e_6534.$tag==1){
    return (JSIndex_6501(rewriteDCE_6524(e_6534.$0)))(rewriteDCE_6524(e_6534.$1))
  } else if(e_6534.$tag==3){
    return tryDCE_6523(((JSBinOp_6522(e_6534.$0))(rewriteDCE_6524(e_6534.$1)))(rewriteDCE_6524(e_6534.$2)))
  } else if(e_6534.$tag==4){
    return (JSCall_6499(rewriteDCE_6524(e_6534.$0)))((map(rewriteDCE_6524))(e_6534.$1))
  } else if(e_6534.$tag==5){
    return (JSFun_6512(e_6534.$0))((((concatMap_6430($instance_452))($instance_450))(rewriteStmt_6525))(e_6534.$1))
  } else if(e_6534.$tag==6){
    return tryDCE_6523(((JSTernary_6506(rewriteDCE_6524(e_6534.$0)))(rewriteDCE_6524(e_6534.$1)))(rewriteDCE_6524(e_6534.$2)))
  } else if(e_6534.$tag==10){
    return JSObject_6500((map(kv_6548 => (Pair_6477(kv_6548.$0))(rewriteDCE_6524(kv_6548.$1))))(e_6534.$0))
  } else if(e_6534.$tag==14){
    return (JSInstanceOf_6508(rewriteDCE_6524(e_6534.$0)))(rewriteDCE_6524(e_6534.$1))
  } else if(e_6534.$tag==15){
    return (JSNew_6513(rewriteDCE_6524(e_6534.$0)))((map(rewriteDCE_6524))(e_6534.$1))
  } else if(e_6534.$tag==11){
    return JSArray_6504((map(rewriteDCE_6524))(e_6534.$0))
  } else return e_6534
};
const rewriteStmt_6525 = s_6557 => {
  if(s_6557.$tag==0){
    return [JSExpr_6521(rewriteDCE_6524(s_6557.$0))]
  } else if(s_6557.$tag==1){
    return [JSReturn_6515(rewriteDCE_6524(s_6557.$0))]
  } else if(s_6557.$tag==2){
    return [(JSVar_6520(s_6557.$0))(rewriteDCE_6524(s_6557.$1))]
  } else if(s_6557.$tag==7){
    return [(JSAssign_6514(rewriteDCE_6524(s_6557.$0)))(rewriteDCE_6524(s_6557.$1))]
  } else if((s_6557.$tag==8)&&((s_6557.$0.$tag==9)&&s_6557.$0.$0)){
    return (((concatMap_6430($instance_452))($instance_450))(rewriteStmt_6525))(s_6557.$1)
  } else if((s_6557.$tag==8)&&((s_6557.$0.$tag==9)&&(!s_6557.$0.$0))){
    return (((concatMap_6430($instance_452))($instance_450))(rewriteStmt_6525))(s_6557.$2)
  } else if(s_6557.$tag==8){
    const $phi$669 = rewriteDCE_6524(s_6557.$0);
    if(($phi$669.$tag==9)&&$phi$669.$0){
      return (((concatMap_6430($instance_452))($instance_450))(rewriteStmt_6525))(s_6557.$1)
    } else if(($phi$669.$tag==9)&&(!$phi$669.$0)){
      return (((concatMap_6430($instance_452))($instance_450))(rewriteStmt_6525))(s_6557.$2)
    } else return [((JSIf_6497($phi$669))((((concatMap_6430($instance_452))($instance_450))(rewriteStmt_6525))(s_6557.$1)))((((concatMap_6430($instance_452))($instance_450))(rewriteStmt_6525))(s_6557.$2))]
  } else return [s_6557]
};
const head_6573 = head_46;
const $gt$gt_6574 = $gt$gt_21;
const size_6575 = size_72;
const setContains_6576 = setContains_82;
const uniq_6577 = uniq_51;
const all_6578 = all_38;
const mconcat_6579 = mconcat_22;
const zip_6580 = zip_43;
const $lt$eq_6581 = $lt$eq_19;
const setAddAll_6582 = setAddAll_80;
const BitmapIndexed_6583 = BitmapIndexed_14;
const reverse_6584 = reverse_52;
const isEmpty_6585 = isEmpty_73;
const $_6586 = $_16;
const remove_6587 = remove_69;
const forM_6588 = forM_58;
const Unit_6589 = Unit_0;
const loop_6590 = loop_32;
const either_6591 = either_29;
const runState_6592 = runState_61;
const assert_6593 = assert_94;
const setRemove_6594 = setRemove_81;
const zipWithIndex2_6595 = zipWithIndex2_41;
const Left_6596 = Left_8;
const fst_6597 = fst_27;
const setDiff_6598 = setDiff_85;
const insertAll_6599 = insertAll_77;
const mapJust_6600 = mapJust_45;
const maybe_6601 = maybe_23;
const concatMap_6602 = concatMap_44;
const snd_6603 = snd_28;
const mergeSet_6604 = mergeSet_50;
const join_6605 = join_39;
const setIntersection_6606 = setIntersection_86;
const zipWithIndex_6607 = zipWithIndex_42;
const Tuple3_6608 = Tuple3_4;
const mapFst_6609 = mapFst_92;
const mapIx_6610 = mapIx_35;
const foldM_6611 = foldM_56;
const Just_6612 = Just_1;
const Tuple4_6613 = Tuple4_5;
const toRecord_6614 = toRecord_54;
const hamtMask_6615 = hamtMask_64;
const Empty_6616 = Empty_11;
const strToArray_6617 = strToArray_55;
const Tuple5_6618 = Tuple5_6;
const mapSnd_6619 = mapSnd_93;
const setUnion_6620 = setUnion_83;
const Nothing_6621 = Nothing_2;
const trieKeys_6622 = trieKeys_75;
const Tuple6_6623 = Tuple6_7;
const $div$eq_6624 = $div$eq_17;
const justOr_6625 = justOr_24;
const tail_6626 = tail_47;
const init_6627 = init_49;
const debugIf_6628 = debugIf_88;
const sets_6629 = sets_60;
const State_6630 = State_10;
const mapM_6631 = mapM_57;
const hamtIndex_6632 = hamtIndex_65;
const mergeTrie_6633 = mergeTrie_74;
const Collision_6634 = Collision_13;
const not_6635 = not_31;
const evalState_6636 = evalState_62;
const debugMaybe_6637 = debugMaybe_89;
const containsChar_6638 = containsChar_36;
const emptySet_6639 = emptySet_78;
const updateOrSet_6640 = updateOrSet_68;
const isJust_6641 = isJust_26;
const last_6642 = last_48;
const trieEntries_6643 = trieEntries_76;
const mapTrie_6644 = mapTrie_71;
const fromJust_6645 = fromJust_25;
const find_6646 = find_34;
const insert_6647 = insert_67;
const lookup_6648 = lookup_66;
const Pair_6649 = Pair_3;
const repeat_6650 = repeat_40;
const foldTrie_6651 = foldTrie_70;
const exists_6652 = exists_37;
const setToArray_6653 = setToArray_84;
const Right_6654 = Right_9;
const debugWrap_6655 = debugWrap_90;
const gets_6656 = gets_59;
const $gt_6657 = $gt_18;
const Identity_6658 = Identity_15;
const popCount_6659 = popCount_63;
const dedup_6660 = dedup_53;
const Leaf_6661 = Leaf_12;
const debug2_6662 = debug2_87;
const $gt$eq$gt_6663 = $gt$eq$gt_91;
const splitEither_6664 = splitEither_30;
const setAdd_6665 = setAdd_79;
const contains_6666 = contains_33;
const $gt$eq_6667 = $gt$eq_20;
const JSUnOp_6668 = JSUnOp_6335;
const JSIf_6669 = JSIf_6358;
const JSUndefined_6670 = JSUndefined_6346;
const JSCall_6671 = JSCall_6337;
const JSObject_6672 = JSObject_6343;
const JSIndex_6673 = JSIndex_6334;
const JSRef_6674 = JSRef_6333;
const JSNull_6675 = JSNull_6345;
const JSArray_6676 = JSArray_6344;
const JSLet_6677 = JSLet_6354;
const JSTernary_6678 = JSTernary_6339;
const JSBool_6679 = JSBool_6342;
const JSInstanceOf_6680 = JSInstanceOf_6347;
const JSComment_6681 = JSComment_6359;
const JSBreak_6682 = JSBreak_6356;
const JSSeq_6683 = JSSeq_6349;
const JSFun_6684 = JSFun_6338;
const JSNew_6685 = JSNew_6348;
const JSAssign_6686 = JSAssign_6357;
const JSReturn_6687 = JSReturn_6351;
const JSString_6688 = JSString_6341;
const JSConst_6689 = JSConst_6353;
const JSNum_6690 = JSNum_6340;
const JSSwitch_6691 = JSSwitch_6355;
const JSVar_6692 = JSVar_6352;
const JSExpr_6693 = JSExpr_6350;
const JSBinOp_6694 = JSBinOp_6336;
const paren_6701 = s_6788 => ("("+s_6788)+")";
const printIndent_6700 = indent_6786 => {
  if(0==indent_6786){
    return ""
  } else return "  "+(printIndent_6700(indent_6786-1))
};
const jsExprToString_6695 = indent_6702 => e_6703 => {
  const print_6704 = e_6706 => (jsExprToString_6695(indent_6702))(e_6706);
  const printParen_6705 = e_6707 => (jsExprToParenString_6696(indent_6702))(e_6707);
  if(e_6703.$tag==12){
    return "null"
  } else if(e_6703.$tag==13){
    return "undefined"
  } else if((e_6703.$tag==9)&&e_6703.$0){
    return "true"
  } else if((e_6703.$tag==9)&&(!e_6703.$0)){
    return "false"
  } else if(e_6703.$tag==7){
    return jsonStringify(e_6703.$0)
  } else if(e_6703.$tag==8){
    return jsonStringify(e_6703.$0)
  } else if(e_6703.$tag==0){
    return e_6703.$0
  } else if((e_6703.$tag==1)&&(e_6703.$1.$tag==8)){
    const $phi$680 = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))(e_6703.$1.$0);
    if(""==$phi$680){
      return (((printParen_6705(e_6703.$0))+"[")+e_6703.$1.$0)+"]"
    } else return ((printParen_6705(e_6703.$0))+".")+$phi$680
  } else if(e_6703.$tag==1){
    return (((printParen_6705(e_6703.$0))+"[")+(print_6704(e_6703.$1)))+"]"
  } else if(e_6703.$tag==2){
    return e_6703.$0+(printParen_6705(e_6703.$1))
  } else if(e_6703.$tag==3){
    return ((printParen_6705(e_6703.$1))+e_6703.$0)+(printParen_6705(e_6703.$2))
  } else if(e_6703.$tag==4){
    return (printParen_6705(e_6703.$0))+(paren_6701((intercalate(","))((map(print_6704))(e_6703.$1))))
  } else if(e_6703.$tag==15){
    return ("new "+(printParen_6705(e_6703.$0)))+(paren_6701((intercalate(","))((map(print_6704))(e_6703.$1))))
  } else if(e_6703.$tag==5){
    let $phi$672;
    const $phi$673 = length(e_6703.$0);
    if(1==$phi$673){
      $phi$672 = (((getIx(0))(e_6703.$0))+" => ")
    } else $phi$672 = (("("+((intercalate(","))(e_6703.$0)))+") => ");
    const params_6727 = $phi$672;
    const full_6729 = bs_6730 => (((((params_6727+"{\n")+(printIndent_6700(indent_6702+1)))+((intercalate(";\n"+(printIndent_6700(indent_6702+1))))((map(jsStmtToString_6698(indent_6702+1)))(bs_6730))))+"\n")+(printIndent_6700(indent_6702)))+"}";
    const $phi$675 = length(e_6703.$1);
    if(1==$phi$675){
      const $phi$677 = head_6573(e_6703.$1);
      if($phi$677.$tag==1){
        if($phi$677.$0.$tag==10){
          return params_6727+(paren_6701(print_6704($phi$677.$0)))
        } else return params_6727+(print_6704($phi$677.$0))
      } else return full_6729(e_6703.$1)
    } else return full_6729(e_6703.$1)
  } else if(e_6703.$tag==6){
    return ((((printParen_6705(e_6703.$0))+"?")+(printParen_6705(e_6703.$1)))+":")+(printParen_6705(e_6703.$2))
  } else if(e_6703.$tag==10){
    return ("{"+((intercalate(","))((map(keyValueToString_6697(indent_6702)))(e_6703.$0))))+"}"
  } else if(e_6703.$tag==11){
    return ("["+((intercalate(","))((map(print_6704))(e_6703.$0))))+"]"
  } else if(e_6703.$tag==14){
    return ((printParen_6705(e_6703.$0))+" instanceof ")+(printParen_6705(e_6703.$1))
  } else if(e_6703.$tag==16){
    return (intercalate(","))((map(print_6704))(e_6703.$0))
  } else return error(e_6703)
};
const jsExprToParenString_6696 = indent_6745 => e_6746 => {
  if(e_6746.$tag==0){
    return (jsExprToString_6695(indent_6745))(e_6746)
  } else if(e_6746.$tag==7){
    return (jsExprToString_6695(indent_6745))(e_6746)
  } else if(e_6746.$tag==8){
    return (jsExprToString_6695(indent_6745))(e_6746)
  } else if(e_6746.$tag==9){
    return (jsExprToString_6695(indent_6745))(e_6746)
  } else if(e_6746.$tag==1){
    return (jsExprToString_6695(indent_6745))(e_6746)
  } else if(e_6746.$tag==15){
    return (jsExprToString_6695(indent_6745))(e_6746)
  } else if(e_6746.$tag==10){
    return (jsExprToString_6695(indent_6745))(e_6746)
  } else return paren_6701((jsExprToString_6695(indent_6745))(e_6746))
};
const keyValueToString_6697 = indent_6757 => kv_6758 => (kv_6758.$0+":")+((jsExprToString_6695(indent_6757))(kv_6758.$1));
const jsStmtToString_6698 = indent_6761 => s_6762 => {
  if(s_6762.$tag==9){
    return ("/* "+s_6762.$0)+"*/"
  } else if(s_6762.$tag==0){
    return (jsExprToString_6695(indent_6761))(s_6762.$0)
  } else if(s_6762.$tag==1){
    return "return "+((jsExprToString_6695(indent_6761))(s_6762.$0))
  } else if(s_6762.$tag==2){
    return (("var "+s_6762.$0)+" = ")+((jsExprToString_6695(indent_6761))(s_6762.$1))
  } else if(s_6762.$tag==3){
    return (("const "+s_6762.$0)+" = ")+((jsExprToString_6695(indent_6761))(s_6762.$1))
  } else if(s_6762.$tag==4){
    if(s_6762.$1.$tag==1){
      return "let "+s_6762.$0
    } else if(s_6762.$1.$tag==0){
      return (("let "+s_6762.$0)+" = ")+((jsExprToString_6695(indent_6761))(s_6762.$1.$0))
    } else error("pattern match fail in //compiler/js/printer.jg at line 66, column 16",s_6762.$1)
  } else if(s_6762.$tag==6){
    return "break"
  } else if(s_6762.$tag==5){
    return (((((("switch"+(paren_6701((jsExprToString_6695(indent_6761))(s_6762.$0))))+"{\n")+(printIndent_6700(indent_6761+1)))+((intercalate(";\n"+(printIndent_6700(indent_6761+1))))((map(caseToString_6699(indent_6761+1)))(s_6762.$1))))+"\n")+(printIndent_6700(indent_6761)))+"}"
  } else if(s_6762.$tag==7){
    return (((jsExprToParenString_6696(indent_6761))(s_6762.$0))+" = ")+((jsExprToParenString_6696(indent_6761))(s_6762.$1))
  } else if(s_6762.$tag==8){
    let $phi$684;
    const $phi$685 = length(s_6762.$2);
    if(1==$phi$685){
      $phi$684 = ((jsStmtToString_6698(indent_6761))((getIx(0))(s_6762.$2)))
    } else $phi$684 = ((((("{\n"+(printIndent_6700(indent_6761+1)))+((intercalate(";\n"+(printIndent_6700(indent_6761+1))))((map(jsStmtToString_6698(indent_6761+1)))(s_6762.$2))))+"\n")+(printIndent_6700(indent_6761)))+"}");
    const els_6780 = $phi$684;
    return ((((((("if("+((jsExprToString_6695(indent_6761))(s_6762.$0)))+"){\n")+(printIndent_6700(indent_6761+1)))+((intercalate(";\n"+(printIndent_6700(indent_6761+1))))((map(jsStmtToString_6698(indent_6761+1)))(s_6762.$1))))+"\n")+(printIndent_6700(indent_6761)))+"} else ")+els_6780
  } else error("pattern match fail in //compiler/js/printer.jg at line 60, column 27",s_6762)
};
const caseToString_6699 = indent_6782 => c_6783 => ((("case "+(paren_6701((jsExprToString_6695(indent_6782))(c_6783.$0))))+":\n")+(printIndent_6700(indent_6782+1)))+((intercalate(";\n"+(printIndent_6700(indent_6782+1))))((map(jsStmtToString_6698(indent_6782)))(c_6783.$1)));
const head_6789 = head_46;
const $gt$gt_6790 = $gt$gt_21;
const size_6791 = size_72;
const setContains_6792 = setContains_82;
const uniq_6793 = uniq_51;
const all_6794 = all_38;
const mconcat_6795 = mconcat_22;
const zip_6796 = zip_43;
const $lt$eq_6797 = $lt$eq_19;
const setAddAll_6798 = setAddAll_80;
const BitmapIndexed_6799 = BitmapIndexed_14;
const reverse_6800 = reverse_52;
const isEmpty_6801 = isEmpty_73;
const $_6802 = $_16;
const remove_6803 = remove_69;
const forM_6804 = forM_58;
const Unit_6805 = Unit_0;
const loop_6806 = loop_32;
const either_6807 = either_29;
const runState_6808 = runState_61;
const assert_6809 = assert_94;
const setRemove_6810 = setRemove_81;
const zipWithIndex2_6811 = zipWithIndex2_41;
const Left_6812 = Left_8;
const fst_6813 = fst_27;
const setDiff_6814 = setDiff_85;
const insertAll_6815 = insertAll_77;
const mapJust_6816 = mapJust_45;
const maybe_6817 = maybe_23;
const concatMap_6818 = concatMap_44;
const snd_6819 = snd_28;
const mergeSet_6820 = mergeSet_50;
const join_6821 = join_39;
const setIntersection_6822 = setIntersection_86;
const zipWithIndex_6823 = zipWithIndex_42;
const Tuple3_6824 = Tuple3_4;
const mapFst_6825 = mapFst_92;
const mapIx_6826 = mapIx_35;
const foldM_6827 = foldM_56;
const Just_6828 = Just_1;
const Tuple4_6829 = Tuple4_5;
const toRecord_6830 = toRecord_54;
const hamtMask_6831 = hamtMask_64;
const Empty_6832 = Empty_11;
const strToArray_6833 = strToArray_55;
const Tuple5_6834 = Tuple5_6;
const mapSnd_6835 = mapSnd_93;
const setUnion_6836 = setUnion_83;
const Nothing_6837 = Nothing_2;
const trieKeys_6838 = trieKeys_75;
const Tuple6_6839 = Tuple6_7;
const $div$eq_6840 = $div$eq_17;
const justOr_6841 = justOr_24;
const tail_6842 = tail_47;
const init_6843 = init_49;
const debugIf_6844 = debugIf_88;
const sets_6845 = sets_60;
const State_6846 = State_10;
const mapM_6847 = mapM_57;
const hamtIndex_6848 = hamtIndex_65;
const mergeTrie_6849 = mergeTrie_74;
const Collision_6850 = Collision_13;
const not_6851 = not_31;
const evalState_6852 = evalState_62;
const debugMaybe_6853 = debugMaybe_89;
const containsChar_6854 = containsChar_36;
const emptySet_6855 = emptySet_78;
const updateOrSet_6856 = updateOrSet_68;
const isJust_6857 = isJust_26;
const last_6858 = last_48;
const trieEntries_6859 = trieEntries_76;
const mapTrie_6860 = mapTrie_71;
const fromJust_6861 = fromJust_25;
const find_6862 = find_34;
const insert_6863 = insert_67;
const lookup_6864 = lookup_66;
const Pair_6865 = Pair_3;
const repeat_6866 = repeat_40;
const foldTrie_6867 = foldTrie_70;
const exists_6868 = exists_37;
const setToArray_6869 = setToArray_84;
const Right_6870 = Right_9;
const debugWrap_6871 = debugWrap_90;
const gets_6872 = gets_59;
const $gt_6873 = $gt_18;
const Identity_6874 = Identity_15;
const popCount_6875 = popCount_63;
const dedup_6876 = dedup_53;
const Leaf_6877 = Leaf_12;
const debug2_6878 = debug2_87;
const $gt$eq$gt_6879 = $gt$eq$gt_91;
const splitEither_6880 = splitEither_30;
const setAdd_6881 = setAdd_79;
const contains_6882 = contains_33;
const $gt$eq_6883 = $gt$eq_20;
const New_6884 = New_785;
const App_6885 = App_781;
const down_6886 = down_840;
const dataConName_6887 = dataConName_829;
const CNum_6888 = CNum_786;
const Const_6889 = Const_780;
const getAnnType_6890 = getAnnType_816;
const TRow_6891 = TRow_803;
const Inst_6892 = Inst_797;
const printCodeLoc_6893 = printCodeLoc_820;
const getPatType_6894 = getPatType_835;
const Var_6895 = Var_779;
const getAnnCodeLoc_6896 = getAnnCodeLoc_818;
const equivBound_6897 = equivBound_823;
const AnnUseCount_6898 = AnnUseCount_775;
const Data_6899 = Data_793;
const AnnData_6900 = AnnData_776;
const exprLoc_6901 = exprLoc_821;
const getAnn_6902 = getAnn_811;
const downM_6903 = downM_845;
const TForall_6904 = TForall_805;
const copyAnn_6905 = copyAnn_813;
const Module_6906 = Module_791;
const ModuleInterface_6907 = ModuleInterface_792;
const TApp_6908 = TApp_802;
const CStr_6909 = CStr_787;
const TCBound_6910 = TCBound_798;
const TConst_6911 = TConst_799;
const ImportOpen_6912 = ImportOpen_808;
const equivType_6913 = equivType_828;
const dataConNames_6914 = dataConNames_830;
const downAndUp_6915 = downAndUp_838;
const Case_6916 = Case_783;
const getType_6917 = getType_834;
const ImportClosed_6918 = ImportClosed_807;
const TSkolem_6919 = TSkolem_801;
const breakableDownM_6920 = breakableDownM_846;
const upM_6921 = upM_844;
const AnnCodeLoc_6922 = AnnCodeLoc_774;
const TBot_6923 = TBot_804;
const PConst_6924 = PConst_789;
const TVar_6925 = TVar_800;
const emptyAnn_6926 = emptyAnn_810;
const setAnnCodeLoc_6927 = setAnnCodeLoc_819;
const Instance_6928 = Instance_796;
const AnnExport_6929 = AnnExport_778;
const TUnknown_6930 = TUnknown_806;
const breakableDownAndUpM_6931 = breakableDownAndUpM_842;
const namesInPat_6932 = namesInPat_822;
const breakableDownAndUp_6933 = breakableDownAndUp_837;
const PVar_6934 = PVar_788;
const DataCon_6935 = DataCon_794;
const Class_6936 = Class_795;
const Lam_6937 = Lam_782;
const annOf_6938 = annOf_832;
const setAnnType_6939 = setAnnType_817;
const AnnTag_6940 = AnnTag_777;
const compareBound_6941 = compareBound_827;
const PData_6942 = PData_790;
const getAnnE_6943 = getAnnE_814;
const AnnType_6944 = AnnType_773;
const Let_6945 = Let_784;
const up_6946 = up_839;
const breakableDown_6947 = breakableDown_841;
const withAnn_6948 = withAnn_833;
const setPatType_6949 = setPatType_836;
const setType_6950 = setType_831;
const compareArr_6951 = compareArr_825;
const ImportAll_6952 = ImportAll_809;
const compareOrd_6953 = compareOrd_824;
const downAndUpM_6954 = downAndUpM_843;
const hasAnnE_6955 = hasAnnE_815;
const compareType_6956 = compareType_826;
const setAnn_6957 = setAnn_812;
const JSUnOp_6958 = JSUnOp_6335;
const JSIf_6959 = JSIf_6358;
const JSUndefined_6960 = JSUndefined_6346;
const JSCall_6961 = JSCall_6337;
const JSObject_6962 = JSObject_6343;
const JSIndex_6963 = JSIndex_6334;
const JSRef_6964 = JSRef_6333;
const JSNull_6965 = JSNull_6345;
const JSArray_6966 = JSArray_6344;
const JSLet_6967 = JSLet_6354;
const JSTernary_6968 = JSTernary_6339;
const JSBool_6969 = JSBool_6342;
const JSInstanceOf_6970 = JSInstanceOf_6347;
const JSComment_6971 = JSComment_6359;
const JSBreak_6972 = JSBreak_6356;
const JSSeq_6973 = JSSeq_6349;
const JSFun_6974 = JSFun_6338;
const JSNew_6975 = JSNew_6348;
const JSAssign_6976 = JSAssign_6357;
const JSReturn_6977 = JSReturn_6351;
const JSString_6978 = JSString_6341;
const JSConst_6979 = JSConst_6353;
const JSNum_6980 = JSNum_6340;
const JSSwitch_6981 = JSSwitch_6355;
const JSVar_6982 = JSVar_6352;
const JSExpr_6983 = JSExpr_6350;
const JSBinOp_6984 = JSBinOp_6336;
const printType_6985 = printType_1476;
const RewriteState_6986 = $_0_7014 => $_1_7015 => $_2_7016 => $_3_7017 => ({$0:$_0_7014,$1:$_1_7015,$2:$_2_7016,$3:$_3_7017});
const checkUndefined_6999 = label_7239 => expr_7240 => ((JSTernary_6968(((JSBinOp_6984("==="))(expr_7240))(JSUndefined_6960)))((JSCall_6961(JSRef_6964("error")))([JSString_6978(label_7239)])))(expr_7240);
const getRep_6993 = n_7062 => (($gt$gt$eq($instance_502))(gets_6872))(s_7063 => (ret($instance_502))((((lookup_6864($instance_447))($instance_506))(n_7062))(s_7063.$1)));
const newPhi_6990 = (($gt$gt$eq($instance_502))(gets_6872))(s_7031 => (($gt$gt_6790($instance_502))(sets_6845((((RewriteState_6986(s_7031.$0))(s_7031.$1))(s_7031.$2))(s_7031.$3+1))))((ret($instance_502))("$phi$"+(intToString(s_7031.$3)))));
const dataConFieldIds_7005 = ts_7287 => (map(p_7288 => "$"+(intToString(fst_6813(p_7288)))))(zipWithIndex_6823(ts_7287));
const addStmt_6988 = stmt_7023 => (($gt$gt$eq($instance_502))(gets_6872))(s_7024 => sets_6845((((RewriteState_6986(s_7024.$0))(s_7024.$1))((push(stmt_7023))(s_7024.$2)))(s_7024.$3)));
const opChar_7009 = c_7326 => {
  if("-"==c_7326){
    return "$mns"
  } else if("+"==c_7326){
    return "$pls"
  } else if("*"==c_7326){
    return "$mul"
  } else if("/"==c_7326){
    return "$div"
  } else if("="==c_7326){
    return "$eq"
  } else if(":"==c_7326){
    return "$col"
  } else if("&"==c_7326){
    return "$amp"
  } else if("|"==c_7326){
    return "$pip"
  } else if("<"==c_7326){
    return "$lt"
  } else if(">"==c_7326){
    return "$gt"
  } else if("^"==c_7326){
    return "$rof"
  } else return c_7326
};
const opName_7008 = op_7322 => {
  if("+"==op_7322){
    return "$add"
  } else if("-"==op_7322){
    return "$del"
  } else if("*"==op_7322){
    return "$mul"
  } else if("&&"==op_7322){
    return "$and"
  } else if("||"==op_7322){
    return "$or"
  } else if("++"==op_7322){
    return "$concat"
  } else if("new"==op_7322){
    return "$new"
  } else return ((foldl(s_7324 => c_7325 => s_7324+(opChar_7009(c_7325))))(""))(strToArray_6833(op_7322))
};
const addConst_6989 = n_7029 => e_7030 => addStmt_6988((JSConst_6979(opName_7008(n_7029)))(e_7030));
const withRep_6992 = rep_7049 => m_7050 => (($gt$gt$eq($instance_502))(gets_6872))(s_7051 => (($gt$gt$eq($instance_502))((($gt$gt_6790($instance_502))(sets_6845((((RewriteState_6986(s_7051.$0))((((mergeTrie_6849($instance_447))($instance_506))(s_7051.$1))(rep_7049)))(s_7051.$2))(s_7051.$3))))(m_7050)))(r_7056 => (($gt$gt$eq($instance_502))(gets_6872))(s_7057 => (($gt$gt_6790($instance_502))(sets_6845((((RewriteState_6986(s_7057.$0))(s_7051.$1))(s_7057.$2))(s_7057.$3))))((ret($instance_502))(r_7056)))));
const combineChecks_7000 = a_7241 => b_7242 => {
  if((a_7241.$tag==9)&&a_7241.$0){
    return b_7242
  } else if((b_7242.$tag==9)&&b_7242.$0){
    return a_7241
  } else return ((JSBinOp_6984("&&"))(a_7241))(b_7242)
};
const processPattern_7001 = cons_7245 => pm_7246 => p_7247 => {
  if((p_7247.$tag==0)&&("_"==p_7247.$1)){
    return (Pair_6865(JSBool_6969(true)))((Pair_6865([]))([]))
  } else if(p_7247.$tag==0){
    return (Pair_6865(JSBool_6969(true)))((Pair_6865([opName_7008(p_7247.$1)]))([pm_7246]))
  } else if((p_7247.$tag==1)&&(p_7247.$1.$tag==0)){
    return (Pair_6865(((JSBinOp_6984("=="))(JSNum_6980(p_7247.$1.$0)))(pm_7246)))((Pair_6865([]))([]))
  } else if((p_7247.$tag==1)&&(p_7247.$1.$tag==1)){
    return (Pair_6865(((JSBinOp_6984("=="))(JSString_6978(p_7247.$1.$0)))(pm_7246)))((Pair_6865([]))([]))
  } else if((p_7247.$tag==2)&&("True"==p_7247.$1)){
    return (Pair_6865(pm_7246))((Pair_6865([]))([]))
  } else if((p_7247.$tag==2)&&("False"==p_7247.$1)){
    return (Pair_6865((JSUnOp_6958("!"))(pm_7246)))((Pair_6865([]))([]))
  } else if(p_7247.$tag==2){
    let $phi$698;
    const $phi$699 = (((lookup_6864($instance_447))($instance_506))(p_7247.$1))(cons_7245);
    if(($phi$699.$tag==0)&&($phi$699.$0.$tag==1)){
      $phi$698 = (JSBool_6969(true))
    } else if(($phi$699.$tag==0)&&($phi$699.$0.$tag==0)){
      $phi$698 = (((JSBinOp_6984("=="))((JSIndex_6963(pm_7246))(JSString_6978("$tag"))))(JSNum_6980($phi$699.$0.$0)))
    } else $phi$698 = (error((("unknown data type in code gen: "+p_7247.$1)+" ")+((justOr_6841("?"))(((fmap($instance_457))(printCodeLoc_6893))(getAnnCodeLoc_6896(p_7247.$0))))));
    const tagCheck_7262 = $phi$698;
    return ((foldl(a_7265 => b_7266 => (Pair_6865((combineChecks_7000(a_7265.$0))(b_7266.$0)))((Pair_6865((concat(a_7265.$1.$0))(b_7266.$1.$0)))((concat(a_7265.$1.$1))(b_7266.$1.$1)))))((Pair_6865(tagCheck_7262))((Pair_6865([]))([]))))((map(p_7273 => ((processPattern_7001(cons_7245))((JSIndex_6963(pm_7246))(JSString_6978("$"+(intToString(p_7273.$0))))))(p_7273.$1)))(zipWithIndex_6823(p_7247.$2)))
  } else return error("failure to match pattern during processing")
};
const getCons_6994 = (($gt$gt$eq($instance_502))(gets_6872))(s_7068 => (ret($instance_502))(s_7068.$0));
const binOp2_6987 = op_7018 => a_7019 => b_7020 => (($gt$gt$eq($instance_502))(rewriteExpr_6995(a_7019)))(a_7021 => (($gt$gt$eq($instance_502))(rewriteExpr_6995(b_7020)))(b_7022 => (ret($instance_502))(((JSBinOp_6984(op_7018))(a_7021))(b_7022))));
const rewriteExprToStmts_6991 = w_7036 => e_7037 => (($gt$gt$eq($instance_502))(gets_6872))(s_7038 => (($gt$gt$eq($instance_502))((($gt$gt_6790($instance_502))(sets_6845((((RewriteState_6986(s_7038.$0))(s_7038.$1))([]))(s_7038.$3))))(rewriteExpr_6995(e_7037))))(e_7043 => (($gt$gt$eq($instance_502))(gets_6872))(s_7044 => (($gt$gt_6790($instance_502))(sets_6845((((RewriteState_6986(s_7044.$0))(s_7044.$1))(s_7038.$2))(s_7044.$3))))((ret($instance_502))((push(w_7036(e_7043)))(s_7044.$2))))));
const rewriteExpr_6995 = e_7073 => {
  if((e_7073.$tag==0)&&("True"==e_7073.$1)){
    return (ret($instance_502))(JSBool_6969(true))
  } else if((e_7073.$tag==0)&&("False"==e_7073.$1)){
    return (ret($instance_502))(JSBool_6969(false))
  } else if(e_7073.$tag==0){
    return (($gt$gt$eq($instance_502))(getRep_6993(opName_7008(e_7073.$1))))(r_7078 => {
      if(r_7078.$tag==1){
        return (ret($instance_502))(JSRef_6964(opName_7008(e_7073.$1)))
      } else if(r_7078.$tag==0){
        return (ret($instance_502))(r_7078.$0)
      } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 41, column 42",r_7078)
    })
  } else if((e_7073.$tag==1)&&(e_7073.$1.$tag==0)){
    return (ret($instance_502))(JSNum_6980(e_7073.$1.$0))
  } else if((e_7073.$tag==1)&&(e_7073.$1.$tag==1)){
    return (ret($instance_502))(JSString_6978(e_7073.$1.$0))
  } else if((e_7073.$tag==2)&&((e_7073.$1.$tag==2)&&((e_7073.$1.$1.$tag==0)&&("+"==e_7073.$1.$1.$1)))){
    return ((binOp2_6987("+"))(e_7073.$1.$2))(e_7073.$2)
  } else if((e_7073.$tag==2)&&((e_7073.$1.$tag==2)&&((e_7073.$1.$1.$tag==0)&&("-"==e_7073.$1.$1.$1)))){
    return ((binOp2_6987("-"))(e_7073.$1.$2))(e_7073.$2)
  } else if((e_7073.$tag==2)&&((e_7073.$1.$tag==2)&&((e_7073.$1.$1.$tag==0)&&("*"==e_7073.$1.$1.$1)))){
    return ((binOp2_6987("*"))(e_7073.$1.$2))(e_7073.$2)
  } else if((e_7073.$tag==2)&&((e_7073.$1.$tag==2)&&((e_7073.$1.$1.$tag==0)&&("++"==e_7073.$1.$1.$1)))){
    return ((binOp2_6987("+"))(e_7073.$1.$2))(e_7073.$2)
  } else if((e_7073.$tag==2)&&((e_7073.$1.$tag==2)&&((e_7073.$1.$1.$tag==0)&&("&&"==e_7073.$1.$1.$1)))){
    return ((binOp2_6987("&&"))(e_7073.$1.$2))(e_7073.$2)
  } else if((e_7073.$tag==2)&&((e_7073.$1.$tag==2)&&((e_7073.$1.$1.$tag==0)&&("||"==e_7073.$1.$1.$1)))){
    return ((binOp2_6987("||"))(e_7073.$1.$2))(e_7073.$2)
  } else if((e_7073.$tag==2)&&((e_7073.$1.$tag==2)&&((e_7073.$1.$1.$tag==0)&&("jsLt"==e_7073.$1.$1.$1)))){
    return ((binOp2_6987("<"))(e_7073.$1.$2))(e_7073.$2)
  } else if((e_7073.$tag==2)&&((e_7073.$1.$tag==2)&&((e_7073.$1.$1.$tag==0)&&("jsEq"==e_7073.$1.$1.$1)))){
    return ((binOp2_6987("==="))(e_7073.$1.$2))(e_7073.$2)
  } else if((e_7073.$tag==2)&&((e_7073.$1.$tag==2)&&((e_7073.$1.$1.$tag==0)&&("bitAnd"==e_7073.$1.$1.$1)))){
    return ((binOp2_6987("&"))(e_7073.$1.$2))(e_7073.$2)
  } else if((e_7073.$tag==2)&&((e_7073.$1.$tag==2)&&((e_7073.$1.$1.$tag==0)&&("bitOr"==e_7073.$1.$1.$1)))){
    return ((binOp2_6987("|"))(e_7073.$1.$2))(e_7073.$2)
  } else if((e_7073.$tag==2)&&((e_7073.$1.$tag==2)&&((e_7073.$1.$1.$tag==0)&&("bitShiftLeft"==e_7073.$1.$1.$1)))){
    return ((binOp2_6987("<<"))(e_7073.$1.$2))(e_7073.$2)
  } else if((e_7073.$tag==2)&&((e_7073.$1.$tag==2)&&((e_7073.$1.$1.$tag==0)&&("bitShiftRight"==e_7073.$1.$1.$1)))){
    return ((binOp2_6987(">>>"))(e_7073.$1.$2))(e_7073.$2)
  } else if(e_7073.$tag==2){
    return (($gt$gt$eq($instance_502))(rewriteExpr_6995(e_7073.$1)))(f_7147 => (($gt$gt$eq($instance_502))(rewriteExpr_6995(e_7073.$2)))(a_7148 => (ret($instance_502))((JSCall_6961(f_7147))([a_7148]))))
  } else if(e_7073.$tag==3){
    return (($gt$gt$eq($instance_502))((rewriteExprToStmts_6991(JSReturn_6977))(e_7073.$2)))(stmts_7152 => (ret($instance_502))((JSFun_6974([e_7073.$1]))(stmts_7152)))
  } else if(e_7073.$tag==4){
    const matchFailMsg_7156 = "pattern match fail "+(exprLoc_6901(e_7073));
    return (($gt$gt$eq($instance_502))(newPhi_6990))(phiOut_7157 => (($gt$gt$eq($instance_502))((($gt$gt_6790($instance_502))(addStmt_6988((JSLet_6967(phiOut_7157))(Nothing_6837))))(rewriteExpr_6995(e_7073.$1))))(ie_7158 => {
      let $phi$720;
      if(ie_7158.$tag==0){
        $phi$720 = ((ret($instance_502))(ie_7158))
      } else if(ie_7158.$tag==1){
        $phi$720 = ((ret($instance_502))(ie_7158))
      } else $phi$720 = ((($gt$gt$eq($instance_502))(newPhi_6990))(p_7163 => (($gt$gt_6790($instance_502))((addConst_6989(p_7163))(ie_7158)))((ret($instance_502))(JSRef_6964(p_7163)))));
      return (($gt$gt$eq($instance_502))($phi$720))(phiIn_7164 => (($gt$gt_6790($instance_502))((($gt$gt$eq($instance_502))((((foldM_6827($instance_502))((assemblePatternMatch2_6998(phiIn_7164))(phiOut_7157)))([JSExpr_6983((JSCall_6961(JSRef_6964("error")))([JSString_6978(matchFailMsg_7156),phiIn_7164]))]))(reverse_6800(e_7073.$2))))((mapM_6847($instance_502))(addStmt_6988))))((ret($instance_502))(JSRef_6964(phiOut_7157))))
    }))
  } else if(e_7073.$tag==5){
    return (($gt$gt_6790($instance_502))(((mapM_6847($instance_502))(d_7168 => (($gt$gt$eq($instance_502))(rewriteExpr_6995(d_7168.$1)))(addConst_6989(d_7168.$0))))(e_7073.$1)))(rewriteExpr_6995(e_7073.$2))
  } else if((e_7073.$tag==6)&&("@closure"==e_7073.$1)){
    const $phi$716 = length(e_7073.$2);
    if(2==$phi$716){
      const $phi$718 = (getIx(0))(e_7073.$2);
      if(($phi$718.$tag==1)&&($phi$718.$1.$tag==0)){
        return (mkClosure_6996($phi$718.$1.$0))((getIx(1))(e_7073.$2))
      } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 73, column 10",$phi$718)
    } else return error("invalid @closure")
  } else if((e_7073.$tag==6)&&("@bind"==e_7073.$1)){
    const $phi$714 = last_6858(e_7073.$2);
    if($phi$714.$tag==0){
      return (mkBind_6997(init_6843(e_7073.$2)))($phi$714.$1)
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 76, column 23",$phi$714)
  } else if((e_7073.$tag==6)&&("Array"==e_7073.$1)){
    return (($gt$gt$eq($instance_502))(((mapM_6847($instance_502))(rewriteExpr_6995))(e_7073.$2)))(es_7182 => (ret($instance_502))(JSArray_6966(es_7182)))
  } else if((e_7073.$tag==6)&&("@Rec"==e_7073.$1)){
    const unpack_7185 = es_7186 => {
      const f_7187 = $pat_7188 => e_7191 => {
        if($pat_7188.$1.$tag==0){
          return (Pair_6865((push((Pair_6865($pat_7188.$1.$0))(e_7191)))($pat_7188.$0)))(Nothing_6837)
        } else if($pat_7188.$1.$tag==1){
          if((e_7191.$tag==1)&&(e_7191.$1.$tag==1)){
            return (Pair_6865($pat_7188.$0))(Just_6828(e_7191.$1.$0))
          } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 83, column 20",e_7191)
        } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 81, column 22",$pat_7188.$1)
      };
      return fst_6813(((foldl(f_7187))((Pair_6865([]))(Nothing_6837)))(es_7186))
    };
    return (($gt$gt$eq($instance_502))(((mapM_6847($instance_502))($pat_7195 => (($gt$gt$eq($instance_502))(rewriteExpr_6995($pat_7195.$1)))(e_7198 => (ret($instance_502))((Pair_6865($pat_7195.$0))(e_7198)))))(unpack_7185(e_7073.$2))))(kvs_7199 => (ret($instance_502))(JSObject_6962(kvs_7199)))
  } else if(e_7073.$tag==6){
    return (($gt$gt$eq($instance_502))(((mapM_6847($instance_502))(rewriteExpr_6995))(e_7073.$2)))(es_7203 => (($gt$gt$eq($instance_502))(getCons_6994))(cons_7204 => {
      const $phi$708 = (((lookup_6864($instance_447))($instance_506))(e_7073.$1))(cons_7204);
      if($phi$708.$tag==1){
        return error("unrecognized tag in New: "+e_7073.$1)
      } else if(($phi$708.$tag==0)&&($phi$708.$0.$tag==1)){
        return (ret($instance_502))(JSObject_6962((zip_6796(dataConFieldIds_7005(es_7203)))(es_7203)))
      } else if(($phi$708.$tag==0)&&($phi$708.$0.$tag==0)){
        return (ret($instance_502))(JSObject_6962((push((Pair_6865("$tag"))(JSNum_6980($phi$708.$0.$0))))((zip_6796(dataConFieldIds_7005(es_7203)))(es_7203))))
      } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 86, column 71",$phi$708)
    }))
  } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 38, column 17",e_7073)
};
const mkClosure_6996 = n_7206 => e_7207 => {
  const gather_7208 = n_7209 => e_7210 => {
    if(e_7210.$tag==3){
      if(0==n_7209){
        return (Pair_6865([e_7210.$1]))(e_7210.$2)
      } else {
        const $phi$725 = (gather_7208(n_7209-1))(e_7210.$2);
        return (Pair_6865((enqueue(e_7210.$1))($phi$725.$0)))($phi$725.$1)
      }
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 92, column 16",e_7210)
  };
  const $phi$727 = (gather_7208(n_7206))(e_7207);
  return (($gt$gt$eq($instance_502))((rewriteExprToStmts_6991(JSReturn_6977))($phi$727.$1)))(stmts_7219 => (ret($instance_502))((JSFun_6974($phi$727.$0))(stmts_7219)))
};
const mkBind_6997 = args_7220 => f_7221 => (($gt$gt$eq($instance_502))(((mapM_6847($instance_502))(rewriteExpr_6995))(args_7220)))(args_7222 => (ret($instance_502))((JSCall_6961((JSIndex_6963(JSRef_6964(f_7221)))(JSString_6978("bind"))))((enqueue(JSNull_6965))(args_7222))));
const assemblePatternMatch2_6998 = phiIn_7223 => phiOut_7224 => alts_7225 => p_7226 => (($gt$gt$eq($instance_502))(getCons_6994))(cons_7227 => {
  const $phi$730 = ((processPattern_7001(cons_7227))(phiIn_7223))(p_7226.$0);
  const rep_7233 = ((foldl(r_7235 => p_7236 => ((((insert_6863($instance_447))($instance_506))(fst_6813(p_7236)))(snd_6819(p_7236)))(r_7235)))(Empty_6832))((zip_6796($phi$730.$1.$0))($phi$730.$1.$1));
  const out_7234 = local$instance$Monad$0 => stmts_7237 => {
    if(($phi$730.$0.$tag==9)&&$phi$730.$0.$0){
      return (ret(local$instance$Monad$0))(stmts_7237)
    } else return (ret(local$instance$Monad$0))([((JSIf_6959($phi$730.$0))(stmts_7237))(alts_7225)])
  };
  return (($gt$gt$eq($instance_502))((withRep_6992(rep_7233))((rewriteExprToStmts_6991(JSAssign_6976(JSRef_6964(phiOut_7224))))(p_7226.$1))))(out_7234($instance_502))
});
const exportObject_7006 = bs_7289 => {
  const f_7290 = b_7291 => {
    const $phi$734 = (((getAnn_6902($instance_447))($instance_506))("export"))(annOf_6938(b_7291.$1));
    if($phi$734.$tag==1){
      return Nothing_6837
    } else if(($phi$734.$tag==0)&&($phi$734.$0.$tag==5)){
      return Just_6828((Pair_6865(opName_7008($phi$734.$0.$0)))(JSRef_6964(opName_7008(b_7291.$0))))
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 163, column 17",$phi$734)
  };
  return JSObject_6962((mapJust_6816(f_7290))(bs_7289))
};
const requireExpr_7002 = f_7277 => (JSCall_6961(JSRef_6964("_require")))([JSString_6978(f_7277)]);
const buildImports_7003 = f_7278 => ns_7279 => (map(n_7280 => (JSConst_6979(opName_7008(n_7280.$1)))((JSIndex_6963(requireExpr_7002(f_7278)))(JSString_6978(opName_7008(n_7280.$0))))))(ns_7279);
const importToJs_7004 = i_7283 => {
  if(i_7283.$tag==1){
    return (buildImports_7003(i_7283.$1))(i_7283.$2)
  } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 155, column 16",i_7283)
};
const directReturn_7013 = v_7384 => s_7385 => {
  if(s_7385.$tag==4){
    const $phi$743 = (($eq$eq($instance_447))(v_7384))(s_7385.$0);
    if(!$phi$743){
      return [s_7385]
    } else if($phi$743){
      if(s_7385.$1.$tag==1){
        return []
      } else if(s_7385.$1.$tag==0){
        return error("unexpected let assignment")
      } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 258, column 13",s_7385.$1)
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 256, column 16",$phi$743)
  } else if(s_7385.$tag==3){
    const $phi$741 = (($eq$eq($instance_447))(v_7384))(s_7385.$0);
    if(!$phi$741){
      return [s_7385]
    } else if($phi$741){
      return [JSReturn_6977(s_7385.$1)]
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 261, column 18",$phi$741)
  } else if((s_7385.$tag==7)&&(s_7385.$0.$tag==0)){
    const $phi$739 = (($eq$eq($instance_447))(v_7384))(s_7385.$0.$0);
    if(!$phi$739){
      return [s_7385]
    } else if($phi$739){
      return [JSReturn_6977(s_7385.$1)]
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 264, column 27",$phi$739)
  } else if(s_7385.$tag==8){
    return [((JSIf_6959(s_7385.$0))((((concatMap_6818($instance_452))($instance_450))(directReturn_7013(v_7384)))(s_7385.$1)))((((concatMap_6818($instance_452))($instance_450))(directReturn_7013(v_7384)))(s_7385.$2))]
  } else return [s_7385]
};
const safeLast_7011 = xs_7356 => {
  const $phi$746 = length(xs_7356);
  if(0==$phi$746){
    return Nothing_6837
  } else return Just_6828(last_6858(xs_7356))
};
const optExpr_7010 = e_7328 => {
  if(e_7328.$tag==0){
    return e_7328
  } else if(e_7328.$tag==1){
    return (JSIndex_6963(optExpr_7010(e_7328.$0)))(optExpr_7010(e_7328.$1))
  } else if(e_7328.$tag==2){
    return (JSUnOp_6958(e_7328.$0))(optExpr_7010(e_7328.$1))
  } else if(e_7328.$tag==3){
    return ((JSBinOp_6984(e_7328.$0))(optExpr_7010(e_7328.$1)))(optExpr_7010(e_7328.$2))
  } else if(e_7328.$tag==4){
    return (JSCall_6961(optExpr_7010(e_7328.$0)))((map(optExpr_7010))(e_7328.$1))
  } else if(e_7328.$tag==5){
    return (JSFun_6974(e_7328.$0))(optStmts_7012(e_7328.$1))
  } else if(e_7328.$tag==6){
    return ((JSTernary_6968(optExpr_7010(e_7328.$0)))(optExpr_7010(e_7328.$1)))(optExpr_7010(e_7328.$2))
  } else if(e_7328.$tag==7){
    return e_7328
  } else if(e_7328.$tag==8){
    return e_7328
  } else if(e_7328.$tag==9){
    return e_7328
  } else if(e_7328.$tag==12){
    return e_7328
  } else if(e_7328.$tag==13){
    return e_7328
  } else if(e_7328.$tag==10){
    return JSObject_6962((map(kv_7348 => (Pair_6865(kv_7348.$0))(optExpr_7010(kv_7348.$1))))(e_7328.$0))
  } else if(e_7328.$tag==11){
    return JSArray_6966((map(optExpr_7010))(e_7328.$0))
  } else if(e_7328.$tag==14){
    return (JSInstanceOf_6970(optExpr_7010(e_7328.$0)))(optExpr_7010(e_7328.$1))
  } else if(e_7328.$tag==15){
    return (JSNew_6975(optExpr_7010(e_7328.$0)))((map(optExpr_7010))(e_7328.$1))
  } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 210, column 13",e_7328)
};
const optStmts_7012 = ss_7358 => {
  const f_7359 = s_7361 => {
    if(s_7361.$tag==0){
      return JSExpr_6983(optExpr_7010(s_7361.$0))
    } else if(s_7361.$tag==2){
      return (JSVar_6982(s_7361.$0))(optExpr_7010(s_7361.$1))
    } else if(s_7361.$tag==3){
      return (JSConst_6979(s_7361.$0))(optExpr_7010(s_7361.$1))
    } else if(s_7361.$tag==4){
      return (JSLet_6967(s_7361.$0))(((fmap($instance_457))(optExpr_7010))(s_7361.$1))
    } else if(s_7361.$tag==7){
      return (JSAssign_6976(optExpr_7010(s_7361.$0)))(optExpr_7010(s_7361.$1))
    } else if(s_7361.$tag==8){
      return ((JSIf_6959(optExpr_7010(s_7361.$0)))(optStmts_7012(s_7361.$1)))(optStmts_7012(s_7361.$2))
    } else if(s_7361.$tag==1){
      return JSReturn_6977(optExpr_7010(s_7361.$0))
    } else if(s_7361.$tag==9){
      return s_7361
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 233, column 9",s_7361)
  };
  const hasLet_7360 = v_7376 => {
    const f_7377 = s_7378 => {
      if(s_7378.$tag==4){
        return (($eq$eq($instance_447))(v_7376))(s_7378.$0)
      } else return false
    };
    return (exists_6868(f_7377))(ss_7358)
  };
  const $phi$752 = safeLast_7011(ss_7358);
  if(($phi$752.$tag==0)&&(($phi$752.$0.$tag==1)&&($phi$752.$0.$0.$tag==0))){
    const $phi$754 = hasLet_7360($phi$752.$0.$0.$0);
    if($phi$754){
      return optStmts_7012((((concatMap_6818($instance_452))($instance_450))(directReturn_7013($phi$752.$0.$0.$0)))(init_6843(ss_7358)))
    } else if(!$phi$754){
      return (map(f_7359))(ss_7358)
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 250, column 34",$phi$754)
  } else return (map(f_7359))(ss_7358)
};
const moduleToJs_7007 = m_7295 => {
  const f_7315 = p_7316 => not_6851(isJust_6857((((getAnn_6902($instance_447))($instance_506))("dead"))(annOf_6938(p_7316.$1))));
  const vs2_7306 = (filter(f_7315))(m_7295.$6);
  const gatherCons_7304 = local$instance$Eq$1 => local$instance$Hashable$0 => m_7310 => d_7311 => {
    const $phi$759 = (((getAnn_6902($instance_447))($instance_506))("data"))(annOf_6938(d_7311.$1));
    if($phi$759.$tag==1){
      return m_7310
    } else if(($phi$759.$tag==0)&&($phi$759.$0.$tag==3)){
      return ((((insert_6863(local$instance$Eq$1))(local$instance$Hashable$0))(d_7311.$0))($phi$759.$0.$0))(m_7310)
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 172, column 19",$phi$759)
  };
  const cons_7305 = ((foldl((gatherCons_7304($instance_447))($instance_506)))(Empty_6832))(m_7295.$6);
  const bindingToStmts_7307 = $pat_7319 => (rewriteExprToStmts_6991(JSConst_6979(opName_7008($pat_7319.$0))))($pat_7319.$1);
  const defs_7308 = ($_6802(foldl1(concat)))((evalState_6852((((RewriteState_6986(cons_7305))(Empty_6832))([]))(0)))(((mapM_6847($instance_502))(bindingToStmts_7307))(vs2_7306)));
  const exportDef_7309 = (JSConst_6979("exports"))(exportObject_7006(vs2_7306));
  const imports_7303 = (((concatMap_6818($instance_452))($instance_450))(importToJs_7004))(m_7295.$2);
  return optStmts_7012((push(exportDef_7309))((concat(imports_7303))(defs_7308)))
};
const head_7397 = head_46;
const $gt$gt_7398 = $gt$gt_21;
const size_7399 = size_72;
const setContains_7400 = setContains_82;
const uniq_7401 = uniq_51;
const all_7402 = all_38;
const mconcat_7403 = mconcat_22;
const zip_7404 = zip_43;
const $lt$eq_7405 = $lt$eq_19;
const setAddAll_7406 = setAddAll_80;
const BitmapIndexed_7407 = BitmapIndexed_14;
const reverse_7408 = reverse_52;
const isEmpty_7409 = isEmpty_73;
const $_7410 = $_16;
const remove_7411 = remove_69;
const forM_7412 = forM_58;
const Unit_7413 = Unit_0;
const loop_7414 = loop_32;
const either_7415 = either_29;
const runState_7416 = runState_61;
const assert_7417 = assert_94;
const setRemove_7418 = setRemove_81;
const zipWithIndex2_7419 = zipWithIndex2_41;
const Left_7420 = Left_8;
const fst_7421 = fst_27;
const setDiff_7422 = setDiff_85;
const insertAll_7423 = insertAll_77;
const mapJust_7424 = mapJust_45;
const maybe_7425 = maybe_23;
const concatMap_7426 = concatMap_44;
const snd_7427 = snd_28;
const mergeSet_7428 = mergeSet_50;
const join_7429 = join_39;
const setIntersection_7430 = setIntersection_86;
const zipWithIndex_7431 = zipWithIndex_42;
const Tuple3_7432 = Tuple3_4;
const mapFst_7433 = mapFst_92;
const mapIx_7434 = mapIx_35;
const foldM_7435 = foldM_56;
const Just_7436 = Just_1;
const Tuple4_7437 = Tuple4_5;
const toRecord_7438 = toRecord_54;
const hamtMask_7439 = hamtMask_64;
const Empty_7440 = Empty_11;
const strToArray_7441 = strToArray_55;
const Tuple5_7442 = Tuple5_6;
const mapSnd_7443 = mapSnd_93;
const setUnion_7444 = setUnion_83;
const Nothing_7445 = Nothing_2;
const trieKeys_7446 = trieKeys_75;
const Tuple6_7447 = Tuple6_7;
const $div$eq_7448 = $div$eq_17;
const justOr_7449 = justOr_24;
const tail_7450 = tail_47;
const init_7451 = init_49;
const debugIf_7452 = debugIf_88;
const sets_7453 = sets_60;
const State_7454 = State_10;
const mapM_7455 = mapM_57;
const hamtIndex_7456 = hamtIndex_65;
const mergeTrie_7457 = mergeTrie_74;
const Collision_7458 = Collision_13;
const not_7459 = not_31;
const evalState_7460 = evalState_62;
const debugMaybe_7461 = debugMaybe_89;
const containsChar_7462 = containsChar_36;
const emptySet_7463 = emptySet_78;
const updateOrSet_7464 = updateOrSet_68;
const isJust_7465 = isJust_26;
const last_7466 = last_48;
const trieEntries_7467 = trieEntries_76;
const mapTrie_7468 = mapTrie_71;
const fromJust_7469 = fromJust_25;
const find_7470 = find_34;
const insert_7471 = insert_67;
const lookup_7472 = lookup_66;
const Pair_7473 = Pair_3;
const repeat_7474 = repeat_40;
const foldTrie_7475 = foldTrie_70;
const exists_7476 = exists_37;
const setToArray_7477 = setToArray_84;
const Right_7478 = Right_9;
const debugWrap_7479 = debugWrap_90;
const gets_7480 = gets_59;
const $gt_7481 = $gt_18;
const Identity_7482 = Identity_15;
const popCount_7483 = popCount_63;
const dedup_7484 = dedup_53;
const Leaf_7485 = Leaf_12;
const debug2_7486 = debug2_87;
const $gt$eq$gt_7487 = $gt$eq$gt_91;
const splitEither_7488 = splitEither_30;
const setAdd_7489 = setAdd_79;
const contains_7490 = contains_33;
const $gt$eq_7491 = $gt$eq_20;
const moduleToJs_7492 = moduleToJs_7007;
const jsExprToString_7493 = jsExprToString_6695;
const jsStmtToString_7494 = jsStmtToString_6698;
const rewriteStmt_7495 = rewriteStmt_6525;
const compileModule_7496 = builtinsPath_7497 => m_7498 => {
  const runStmt_7504 = "if (module.exports.main)module.exports.main(process.argv)";
  const js_7501 = (join_7429((map(jsStmtToString_7494(0)))((((concatMap_7426($instance_452))($instance_450))(rewriteStmt_7495))(moduleToJs_7492(m_7498)))))(";\n");
  const wrapModule_7502 = m_7505 => ("(function() {"+js_7501)+"\nmodule.exports = exports;})();";
  const fullBuiltins_7499 = readFile(builtinsPath_7497);
  const wrappedBuiltins_7500 = ("const $$builtins = (function() {\n const module = {};\n"+fullBuiltins_7499)+";\n return builtins})();\n";
  const requireFun_7503 = ("function _require(f) {\n"+"  return f == \"./builtins.js\" ? $$builtins : require(f);\n")+"}\n";
  return ((wrappedBuiltins_7500+requireFun_7503)+(wrapModule_7502(m_7498)))+runStmt_7504
};
const head_7506 = head_46;
const $gt$gt_7507 = $gt$gt_21;
const size_7508 = size_72;
const setContains_7509 = setContains_82;
const uniq_7510 = uniq_51;
const all_7511 = all_38;
const mconcat_7512 = mconcat_22;
const zip_7513 = zip_43;
const $lt$eq_7514 = $lt$eq_19;
const setAddAll_7515 = setAddAll_80;
const BitmapIndexed_7516 = BitmapIndexed_14;
const reverse_7517 = reverse_52;
const isEmpty_7518 = isEmpty_73;
const $_7519 = $_16;
const remove_7520 = remove_69;
const forM_7521 = forM_58;
const Unit_7522 = Unit_0;
const loop_7523 = loop_32;
const either_7524 = either_29;
const runState_7525 = runState_61;
const assert_7526 = assert_94;
const setRemove_7527 = setRemove_81;
const zipWithIndex2_7528 = zipWithIndex2_41;
const Left_7529 = Left_8;
const fst_7530 = fst_27;
const setDiff_7531 = setDiff_85;
const insertAll_7532 = insertAll_77;
const mapJust_7533 = mapJust_45;
const maybe_7534 = maybe_23;
const concatMap_7535 = concatMap_44;
const snd_7536 = snd_28;
const mergeSet_7537 = mergeSet_50;
const join_7538 = join_39;
const setIntersection_7539 = setIntersection_86;
const zipWithIndex_7540 = zipWithIndex_42;
const Tuple3_7541 = Tuple3_4;
const mapFst_7542 = mapFst_92;
const mapIx_7543 = mapIx_35;
const foldM_7544 = foldM_56;
const Just_7545 = Just_1;
const Tuple4_7546 = Tuple4_5;
const toRecord_7547 = toRecord_54;
const hamtMask_7548 = hamtMask_64;
const Empty_7549 = Empty_11;
const strToArray_7550 = strToArray_55;
const Tuple5_7551 = Tuple5_6;
const mapSnd_7552 = mapSnd_93;
const setUnion_7553 = setUnion_83;
const Nothing_7554 = Nothing_2;
const trieKeys_7555 = trieKeys_75;
const Tuple6_7556 = Tuple6_7;
const $div$eq_7557 = $div$eq_17;
const justOr_7558 = justOr_24;
const tail_7559 = tail_47;
const init_7560 = init_49;
const debugIf_7561 = debugIf_88;
const sets_7562 = sets_60;
const State_7563 = State_10;
const mapM_7564 = mapM_57;
const hamtIndex_7565 = hamtIndex_65;
const mergeTrie_7566 = mergeTrie_74;
const Collision_7567 = Collision_13;
const not_7568 = not_31;
const evalState_7569 = evalState_62;
const debugMaybe_7570 = debugMaybe_89;
const containsChar_7571 = containsChar_36;
const emptySet_7572 = emptySet_78;
const updateOrSet_7573 = updateOrSet_68;
const isJust_7574 = isJust_26;
const last_7575 = last_48;
const trieEntries_7576 = trieEntries_76;
const mapTrie_7577 = mapTrie_71;
const fromJust_7578 = fromJust_25;
const find_7579 = find_34;
const insert_7580 = insert_67;
const lookup_7581 = lookup_66;
const Pair_7582 = Pair_3;
const repeat_7583 = repeat_40;
const foldTrie_7584 = foldTrie_70;
const exists_7585 = exists_37;
const setToArray_7586 = setToArray_84;
const Right_7587 = Right_9;
const debugWrap_7588 = debugWrap_90;
const gets_7589 = gets_59;
const $gt_7590 = $gt_18;
const Identity_7591 = Identity_15;
const popCount_7592 = popCount_63;
const dedup_7593 = dedup_53;
const Leaf_7594 = Leaf_12;
const debug2_7595 = debug2_87;
const $gt$eq$gt_7596 = $gt$eq$gt_91;
const splitEither_7597 = splitEither_30;
const setAdd_7598 = setAdd_79;
const contains_7599 = contains_33;
const $gt$eq_7600 = $gt$eq_20;
const Success_7601 = $_0_7616 => $_1_7617 => ({$0:$_0_7616,$1:$_1_7617,$tag:0});
const Error_7602 = $_0_7618 => ({$0:$_0_7618,$tag:1});
const Parser_7603 = $_0_7619 => ({$0:$_0_7619});
const $instance_7660 = $class$Functor(f_7653 => pa_7654 => Parser_7603(i_7656 => {
  const $phi$763 = pa_7654.$0(i_7656);
  if($phi$763.$tag==1){
    return Error_7602($phi$763.$0)
  } else if($phi$763.$tag==0){
    return (Success_7601(f_7653($phi$763.$0)))($phi$763.$1)
  } else error("pattern match fail in //compiler/parsers.jg at line 16, column 32",$phi$763)
}));
const $instance_7673 = ($class$Applicative(x_7661 => Parser_7603(Success_7601(x_7661))))(pf_7662 => pa_7663 => Parser_7603(i_7666 => {
  const $phi$767 = pf_7662.$0(i_7666);
  if($phi$767.$tag==1){
    return Error_7602($phi$767.$0)
  } else if($phi$767.$tag==0){
    const $phi$769 = pa_7663.$0($phi$767.$1);
    if($phi$769.$tag==1){
      return Error_7602($phi$769.$0)
    } else if($phi$769.$tag==0){
      return (Success_7601($phi$767.$0($phi$769.$0)))($phi$769.$1)
    } else error("pattern match fail in //compiler/parsers.jg at line 26, column 24",$phi$769)
  } else error("pattern match fail in //compiler/parsers.jg at line 24, column 34",$phi$767)
}));
const $instance_7683 = ($class$Alternative(Parser_7603(__7674 => Error_7602("parser failure"))))(pa_7675 => pb_7676 => Parser_7603(i_7679 => {
  const $phi$773 = pa_7675.$0(i_7679);
  if($phi$773.$tag==1){
    return pb_7676.$0(i_7679)
  } else if($phi$773.$tag==0){
    return (Success_7601($phi$773.$0))($phi$773.$1)
  } else error("pattern match fail in //compiler/parsers.jg at line 34, column 34",$phi$773)
}));
const digits_7613 = "0123456789";
const upperCaseLetters_7614 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letters_7615 = "abcdefghijklmnopqrstuvwxyz"+upperCaseLetters_7614;
const applyParser_7604 = p_7620 => i_7621 => p_7620.$0(i_7621);
const many_7607 = p_7631 => {
  const manyIterate_7632 = s_7633 => {
    const r_7634 = ((iterate(Left_7529((Success_7601([]))(s_7633))))(r_7635 => {
      if(r_7635.$tag==0){
        return false
      } else if(r_7635.$tag==1){
        return true
      } else error("pattern match fail in //compiler/parsers.jg at line 45, column 14",r_7635)
    }))(rs_7638 => {
      if((rs_7638.$tag==0)&&(rs_7638.$0.$tag==0)){
        const $phi$778 = (applyParser_7604(p_7631))(rs_7638.$0.$1);
        if($phi$778.$tag==0){
          return Left_7529((Success_7601((push($phi$778.$0))(rs_7638.$0.$0)))($phi$778.$1))
        } else if($phi$778.$tag==1){
          return Right_7587((Success_7601(rs_7638.$0.$0))(rs_7638.$0.$1))
        } else error("pattern match fail in //compiler/parsers.jg at line 48, column 49",$phi$778)
      } else error("pattern match fail in //compiler/parsers.jg at line 48, column 15",rs_7638)
    });
    if(r_7634.$tag==1){
      return r_7634.$0
    } else if(r_7634.$tag==0){
      return error("manyIterate should never return a Left")
    } else error("pattern match fail in //compiler/parsers.jg at line 51, column 8",r_7634)
  };
  return Parser_7603(manyIterate_7632)
};
const some_7608 = p_7646 => (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(enqueue)))(p_7646)))(many_7607(p_7646));
const $pip$gt_7605 = local$instance$Applicative$0 => a_7623 => b_7624 => (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(__7625 => b_7626 => b_7626)))(a_7623)))(b_7624);
const sepBy1_7610 = p_7648 => sp_7649 => (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(enqueue)))(p_7648)))(many_7607((($pip$gt_7605($instance_7673))(sp_7649))(p_7648)));
const success_7609 = a_7647 => Parser_7603(Success_7601(a_7647));
const opt_7612 = a_7652 => (($lt$pip$gt($instance_7683))((($lt$mul$gt($instance_7673))((pure($instance_7673))(Just_7545)))(a_7652)))(success_7609(Nothing_7554));
const sepBy_7611 = p_7650 => sp_7651 => (($lt$mul$gt($instance_7673))((pure($instance_7673))(justOr_7558([]))))(opt_7612((sepBy1_7610(p_7650))(sp_7651)));
const $lt$pip_7606 = local$instance$Applicative$0 => a_7627 => b_7628 => (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(a_7629 => __7630 => a_7629)))(a_7627)))(b_7628);
const head_7684 = head_46;
const $gt$gt_7685 = $gt$gt_21;
const size_7686 = size_72;
const setContains_7687 = setContains_82;
const uniq_7688 = uniq_51;
const all_7689 = all_38;
const mconcat_7690 = mconcat_22;
const zip_7691 = zip_43;
const $lt$eq_7692 = $lt$eq_19;
const setAddAll_7693 = setAddAll_80;
const BitmapIndexed_7694 = BitmapIndexed_14;
const reverse_7695 = reverse_52;
const isEmpty_7696 = isEmpty_73;
const $_7697 = $_16;
const remove_7698 = remove_69;
const forM_7699 = forM_58;
const Unit_7700 = Unit_0;
const loop_7701 = loop_32;
const either_7702 = either_29;
const runState_7703 = runState_61;
const assert_7704 = assert_94;
const setRemove_7705 = setRemove_81;
const zipWithIndex2_7706 = zipWithIndex2_41;
const Left_7707 = Left_8;
const fst_7708 = fst_27;
const setDiff_7709 = setDiff_85;
const insertAll_7710 = insertAll_77;
const mapJust_7711 = mapJust_45;
const maybe_7712 = maybe_23;
const concatMap_7713 = concatMap_44;
const snd_7714 = snd_28;
const mergeSet_7715 = mergeSet_50;
const join_7716 = join_39;
const setIntersection_7717 = setIntersection_86;
const zipWithIndex_7718 = zipWithIndex_42;
const Tuple3_7719 = Tuple3_4;
const mapFst_7720 = mapFst_92;
const mapIx_7721 = mapIx_35;
const foldM_7722 = foldM_56;
const Just_7723 = Just_1;
const Tuple4_7724 = Tuple4_5;
const toRecord_7725 = toRecord_54;
const hamtMask_7726 = hamtMask_64;
const Empty_7727 = Empty_11;
const strToArray_7728 = strToArray_55;
const Tuple5_7729 = Tuple5_6;
const mapSnd_7730 = mapSnd_93;
const setUnion_7731 = setUnion_83;
const Nothing_7732 = Nothing_2;
const trieKeys_7733 = trieKeys_75;
const Tuple6_7734 = Tuple6_7;
const $div$eq_7735 = $div$eq_17;
const justOr_7736 = justOr_24;
const tail_7737 = tail_47;
const init_7738 = init_49;
const debugIf_7739 = debugIf_88;
const sets_7740 = sets_60;
const State_7741 = State_10;
const mapM_7742 = mapM_57;
const hamtIndex_7743 = hamtIndex_65;
const mergeTrie_7744 = mergeTrie_74;
const Collision_7745 = Collision_13;
const not_7746 = not_31;
const evalState_7747 = evalState_62;
const debugMaybe_7748 = debugMaybe_89;
const containsChar_7749 = containsChar_36;
const emptySet_7750 = emptySet_78;
const updateOrSet_7751 = updateOrSet_68;
const isJust_7752 = isJust_26;
const last_7753 = last_48;
const trieEntries_7754 = trieEntries_76;
const mapTrie_7755 = mapTrie_71;
const fromJust_7756 = fromJust_25;
const find_7757 = find_34;
const insert_7758 = insert_67;
const lookup_7759 = lookup_66;
const Pair_7760 = Pair_3;
const repeat_7761 = repeat_40;
const foldTrie_7762 = foldTrie_70;
const exists_7763 = exists_37;
const setToArray_7764 = setToArray_84;
const Right_7765 = Right_9;
const debugWrap_7766 = debugWrap_90;
const gets_7767 = gets_59;
const $gt_7768 = $gt_18;
const Identity_7769 = Identity_15;
const popCount_7770 = popCount_63;
const dedup_7771 = dedup_53;
const Leaf_7772 = Leaf_12;
const debug2_7773 = debug2_87;
const $gt$eq$gt_7774 = $gt$eq$gt_91;
const splitEither_7775 = splitEither_30;
const setAdd_7776 = setAdd_79;
const contains_7777 = contains_33;
const $gt$eq_7778 = $gt$eq_20;
const $lt$pip_7779 = $lt$pip_7606;
const $pip$gt_7780 = $pip$gt_7605;
const success_7781 = success_7609;
const Success_7782 = Success_7601;
const digits_7783 = digits_7613;
const Error_7784 = Error_7602;
const letters_7785 = letters_7615;
const applyParser_7786 = applyParser_7604;
const opt_7787 = opt_7612;
const some_7788 = some_7608;
const sepBy_7789 = sepBy_7611;
const upperCaseLetters_7790 = upperCaseLetters_7614;
const sepBy1_7791 = sepBy1_7610;
const Parser_7792 = Parser_7603;
const many_7793 = many_7607;
const LexerState_7794 = $_0_7824 => $_1_7825 => $_2_7826 => $_3_7827 => ({$0:$_0_7824,$1:$_1_7825,$2:$_2_7826,$3:$_3_7827});
const WsTok_7795 = {$tag:0};
const SymTok_7796 = {$tag:1};
const NumTok_7797 = {$tag:2};
const StrTok_7798 = {$tag:3};
const OpTok_7799 = {$tag:4};
const IdTok_7800 = {$tag:5};
const ComTok_7801 = {$tag:6};
const Token_7802 = $_0_7828 => $_1_7829 => $_2_7830 => $_3_7831 => ({$0:$_0_7828,$1:$_1_7829,$2:$_2_7830,$3:$_3_7831});
const runLexer_7805 = p_7842 => s_7843 => p_7842.$0((((LexerState_7794(s_7843))(0))(0))(0));
const mkTok_7803 = t_7832 => {
  const parse_7833 = i_7834 => (Success_7782(r_7839 => (((Token_7802(t_7832))(r_7839))(i_7834.$2))(i_7834.$3)))(i_7834);
  return Parser_7792(parse_7833)
};
const parseChar_7806 = p_7845 => {
  const parse_7846 = s_7847 => {
    const $phi$784 = (($lt($instance_448))(s_7847.$1))(length(s_7847.$0));
    if(!$phi$784){
      return Error_7784("no more input available")
    } else if($phi$784){
      const $phi$786 = p_7845((getChar(s_7847.$1))(s_7847.$0));
      if(!$phi$786){
        return Error_7784("parser failed")
      } else if($phi$786){
        const $phi$788 = (getChar(s_7847.$1))(s_7847.$0);
        if("\n"==$phi$788){
          return (Success_7782((getChar(s_7847.$1))(s_7847.$0)))((((LexerState_7794(s_7847.$0))(s_7847.$1+1))(s_7847.$2+1))(0))
        } else return (Success_7782((getChar(s_7847.$1))(s_7847.$0)))((((LexerState_7794(s_7847.$0))(s_7847.$1+1))(s_7847.$2))(s_7847.$3+1))
      } else error("pattern match fail in //compiler/jaguarLexer.jg at line 27, column 15",$phi$786)
    } else error("pattern match fail in //compiler/jaguarLexer.jg at line 25, column 27",$phi$784)
  };
  return Parser_7792(parse_7846)
};
const charP_7808 = cs_7854 => parseChar_7806(c_7855 => (containsChar_7749(c_7855))(cs_7854));
const concatStr_7804 = (foldl(cs_7840 => c_7841 => cs_7840+c_7841))("");
const manyStr_7810 = p_7858 => (($lt$mul$gt($instance_7673))((pure($instance_7673))(concatStr_7804)))(many_7793(p_7858));
const notCharP_7809 = cs_7856 => parseChar_7806(c_7857 => not_7746((containsChar_7749(c_7857))(cs_7856)));
const anyCharP_7807 = parseChar_7806(__7853 => true);
const stringCharP_7812 = delim_7860 => {
  const newLineP_7861 = (($pip$gt_7780($instance_7673))((($pip$gt_7780($instance_7673))(charP_7808("\\")))(charP_7808("n"))))((pure($instance_7673))("\n"));
  const notEndOfStringP_7863 = notCharP_7809(delim_7860);
  const escapeP_7862 = (($pip$gt_7780($instance_7673))(charP_7808("\\")))(anyCharP_7807);
  return (($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))(newLineP_7861))(escapeP_7862)))(notEndOfStringP_7863)
};
const stringP_7813 = delim_7864 => (($lt$mul$gt($instance_7673))(mkTok_7803(StrTok_7798)))((($lt$pip_7779($instance_7673))((($pip$gt_7780($instance_7673))(charP_7808(delim_7864)))(manyStr_7810(stringCharP_7812(delim_7864)))))(charP_7808(delim_7864)));
const someStr_7811 = p_7859 => (($lt$mul$gt($instance_7673))((pure($instance_7673))(concatStr_7804)))(some_7788(p_7859));
const opIdentP_7820 = (($lt$mul$gt($instance_7673))(mkTok_7803(IdTok_7800)))((($lt$pip_7779($instance_7673))((($pip$gt_7780($instance_7673))(charP_7808("(")))(someStr_7811(charP_7808("-+*/=:&|<>^$")))))(charP_7808(")")));
const intP_7815 = someStr_7811(charP_7808(digits_7783));
const numP_7816 = (($lt$mul$gt($instance_7673))(mkTok_7803(NumTok_7797)))((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))($concat)))(intP_7815)))((($lt$pip$gt($instance_7683))((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))($concat)))(charP_7808("."))))(intP_7815)))((pure($instance_7673))(""))));
const opP_7821 = (($lt$mul$gt($instance_7673))(mkTok_7803(OpTok_7799)))(someStr_7811(charP_7808("-+*/=:&|<>^$~")));
const whitespaceP_7814 = (($lt$mul$gt($instance_7673))(mkTok_7803(WsTok_7795)))(someStr_7811(charP_7808(" \n")));
const symbolP_7818 = (($lt$mul$gt($instance_7673))(mkTok_7803(SymTok_7796)))(charP_7808("()[]{},\\"));
const identP_7819 = (($lt$mul$gt($instance_7673))(mkTok_7803(IdTok_7800)))((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))($concat)))(charP_7808(letters_7785+"_"))))(manyStr_7810(charP_7808((letters_7785+digits_7783)+"_"))));
const lineCommentP_7817 = (($lt$mul$gt($instance_7673))(mkTok_7803(ComTok_7801)))((($pip$gt_7780($instance_7673))((($pip$gt_7780($instance_7673))(charP_7808("/")))(charP_7808("/"))))(manyStr_7810(notCharP_7809("\n"))));
const jaguarTokenP_7822 = many_7793((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))(stringP_7813("'")))(stringP_7813("\""))))(whitespaceP_7814)))(numP_7816)))(lineCommentP_7817)))(identP_7819)))(opIdentP_7820)))(opP_7821)))(symbolP_7818));
const tokenize_7823 = runLexer_7805(jaguarTokenP_7822);
const head_7865 = head_46;
const $gt$gt_7866 = $gt$gt_21;
const size_7867 = size_72;
const setContains_7868 = setContains_82;
const uniq_7869 = uniq_51;
const all_7870 = all_38;
const mconcat_7871 = mconcat_22;
const zip_7872 = zip_43;
const $lt$eq_7873 = $lt$eq_19;
const setAddAll_7874 = setAddAll_80;
const BitmapIndexed_7875 = BitmapIndexed_14;
const reverse_7876 = reverse_52;
const isEmpty_7877 = isEmpty_73;
const $_7878 = $_16;
const remove_7879 = remove_69;
const forM_7880 = forM_58;
const Unit_7881 = Unit_0;
const loop_7882 = loop_32;
const either_7883 = either_29;
const runState_7884 = runState_61;
const assert_7885 = assert_94;
const setRemove_7886 = setRemove_81;
const zipWithIndex2_7887 = zipWithIndex2_41;
const Left_7888 = Left_8;
const fst_7889 = fst_27;
const setDiff_7890 = setDiff_85;
const insertAll_7891 = insertAll_77;
const mapJust_7892 = mapJust_45;
const maybe_7893 = maybe_23;
const concatMap_7894 = concatMap_44;
const snd_7895 = snd_28;
const mergeSet_7896 = mergeSet_50;
const join_7897 = join_39;
const setIntersection_7898 = setIntersection_86;
const zipWithIndex_7899 = zipWithIndex_42;
const Tuple3_7900 = Tuple3_4;
const mapFst_7901 = mapFst_92;
const mapIx_7902 = mapIx_35;
const foldM_7903 = foldM_56;
const Just_7904 = Just_1;
const Tuple4_7905 = Tuple4_5;
const toRecord_7906 = toRecord_54;
const hamtMask_7907 = hamtMask_64;
const Empty_7908 = Empty_11;
const strToArray_7909 = strToArray_55;
const Tuple5_7910 = Tuple5_6;
const mapSnd_7911 = mapSnd_93;
const setUnion_7912 = setUnion_83;
const Nothing_7913 = Nothing_2;
const trieKeys_7914 = trieKeys_75;
const Tuple6_7915 = Tuple6_7;
const $div$eq_7916 = $div$eq_17;
const justOr_7917 = justOr_24;
const tail_7918 = tail_47;
const init_7919 = init_49;
const debugIf_7920 = debugIf_88;
const sets_7921 = sets_60;
const State_7922 = State_10;
const mapM_7923 = mapM_57;
const hamtIndex_7924 = hamtIndex_65;
const mergeTrie_7925 = mergeTrie_74;
const Collision_7926 = Collision_13;
const not_7927 = not_31;
const evalState_7928 = evalState_62;
const debugMaybe_7929 = debugMaybe_89;
const containsChar_7930 = containsChar_36;
const emptySet_7931 = emptySet_78;
const updateOrSet_7932 = updateOrSet_68;
const isJust_7933 = isJust_26;
const last_7934 = last_48;
const trieEntries_7935 = trieEntries_76;
const mapTrie_7936 = mapTrie_71;
const fromJust_7937 = fromJust_25;
const find_7938 = find_34;
const insert_7939 = insert_67;
const lookup_7940 = lookup_66;
const Pair_7941 = Pair_3;
const repeat_7942 = repeat_40;
const foldTrie_7943 = foldTrie_70;
const exists_7944 = exists_37;
const setToArray_7945 = setToArray_84;
const Right_7946 = Right_9;
const debugWrap_7947 = debugWrap_90;
const gets_7948 = gets_59;
const $gt_7949 = $gt_18;
const Identity_7950 = Identity_15;
const popCount_7951 = popCount_63;
const dedup_7952 = dedup_53;
const Leaf_7953 = Leaf_12;
const debug2_7954 = debug2_87;
const $gt$eq$gt_7955 = $gt$eq$gt_91;
const splitEither_7956 = splitEither_30;
const setAdd_7957 = setAdd_79;
const contains_7958 = contains_33;
const $gt$eq_7959 = $gt$eq_20;
const New_7960 = New_785;
const App_7961 = App_781;
const down_7962 = down_840;
const dataConName_7963 = dataConName_829;
const CNum_7964 = CNum_786;
const Const_7965 = Const_780;
const getAnnType_7966 = getAnnType_816;
const TRow_7967 = TRow_803;
const Inst_7968 = Inst_797;
const printCodeLoc_7969 = printCodeLoc_820;
const getPatType_7970 = getPatType_835;
const Var_7971 = Var_779;
const getAnnCodeLoc_7972 = getAnnCodeLoc_818;
const equivBound_7973 = equivBound_823;
const AnnUseCount_7974 = AnnUseCount_775;
const Data_7975 = Data_793;
const AnnData_7976 = AnnData_776;
const exprLoc_7977 = exprLoc_821;
const getAnn_7978 = getAnn_811;
const downM_7979 = downM_845;
const TForall_7980 = TForall_805;
const copyAnn_7981 = copyAnn_813;
const Module_7982 = Module_791;
const ModuleInterface_7983 = ModuleInterface_792;
const TApp_7984 = TApp_802;
const CStr_7985 = CStr_787;
const TCBound_7986 = TCBound_798;
const TConst_7987 = TConst_799;
const ImportOpen_7988 = ImportOpen_808;
const equivType_7989 = equivType_828;
const dataConNames_7990 = dataConNames_830;
const downAndUp_7991 = downAndUp_838;
const Case_7992 = Case_783;
const getType_7993 = getType_834;
const ImportClosed_7994 = ImportClosed_807;
const TSkolem_7995 = TSkolem_801;
const breakableDownM_7996 = breakableDownM_846;
const upM_7997 = upM_844;
const AnnCodeLoc_7998 = AnnCodeLoc_774;
const TBot_7999 = TBot_804;
const PConst_8000 = PConst_789;
const TVar_8001 = TVar_800;
const emptyAnn_8002 = emptyAnn_810;
const setAnnCodeLoc_8003 = setAnnCodeLoc_819;
const Instance_8004 = Instance_796;
const AnnExport_8005 = AnnExport_778;
const TUnknown_8006 = TUnknown_806;
const breakableDownAndUpM_8007 = breakableDownAndUpM_842;
const namesInPat_8008 = namesInPat_822;
const breakableDownAndUp_8009 = breakableDownAndUp_837;
const PVar_8010 = PVar_788;
const DataCon_8011 = DataCon_794;
const Class_8012 = Class_795;
const Lam_8013 = Lam_782;
const annOf_8014 = annOf_832;
const setAnnType_8015 = setAnnType_817;
const AnnTag_8016 = AnnTag_777;
const compareBound_8017 = compareBound_827;
const PData_8018 = PData_790;
const getAnnE_8019 = getAnnE_814;
const AnnType_8020 = AnnType_773;
const Let_8021 = Let_784;
const up_8022 = up_839;
const breakableDown_8023 = breakableDown_841;
const withAnn_8024 = withAnn_833;
const setPatType_8025 = setPatType_836;
const setType_8026 = setType_831;
const compareArr_8027 = compareArr_825;
const ImportAll_8028 = ImportAll_809;
const compareOrd_8029 = compareOrd_824;
const downAndUpM_8030 = downAndUpM_843;
const hasAnnE_8031 = hasAnnE_815;
const compareType_8032 = compareType_826;
const setAnn_8033 = setAnn_812;
const $lt$pip_8034 = $lt$pip_7606;
const $pip$gt_8035 = $pip$gt_7605;
const success_8036 = success_7609;
const Success_8037 = Success_7601;
const digits_8038 = digits_7613;
const Error_8039 = Error_7602;
const letters_8040 = letters_7615;
const applyParser_8041 = applyParser_7604;
const opt_8042 = opt_7612;
const some_8043 = some_7608;
const sepBy_8044 = sepBy_7611;
const upperCaseLetters_8045 = upperCaseLetters_7614;
const sepBy1_8046 = sepBy1_7610;
const Parser_8047 = Parser_7603;
const many_8048 = many_7607;
const tokenize_8049 = tokenize_7823;
const Token_8050 = Token_7802;
const WsTok_8051 = WsTok_7795;
const SymTok_8052 = SymTok_7796;
const NumTok_8053 = NumTok_7797;
const StrTok_8054 = StrTok_7798;
const OpTok_8055 = OpTok_7799;
const IdTok_8056 = IdTok_7800;
const ComTok_8057 = ComTok_7801;
const wrapForall_8058 = wrapForall_2045;
const skolemsInOrder_8059 = skolemsInOrder_2043;
const ParserState_8060 = $_0_8140 => $_1_8141 => $_2_8142 => $_3_8143 => $_4_8144 => ({$0:$_0_8140,$1:$_1_8141,$2:$_2_8142,$3:$_3_8143,$4:$_4_8144});
const mkParserState_8061 = ts_8145 => f_8146 => {
  let $phi$789;
  const $phi$790 = (getIx(0))(ts_8145);
  $phi$789 = $phi$790.$3;
  return ((((ParserState_8060(ts_8145))(0))($phi$789))(0))(f_8146)
};
const filterWhitespaceAndComments_8062 = filter(t_8151 => {
  if(t_8151.$0.$tag==0){
    return false
  } else if(t_8151.$0.$tag==6){
    return false
  } else return true
});
const runParser_8063 = p_8159 => s_8160 => f_8161 => {
  const $phi$793 = tokenize_8049(s_8160);
  if($phi$793.$tag==0){
    return (applyParser_8041(p_8159))((mkParserState_8061(filterWhitespaceAndComments_8062($phi$793.$0)))(f_8161))
  } else if($phi$793.$tag==1){
    return Error_8039($phi$793.$0)
  } else error("pattern match fail in //compiler/jaguarParser.jg at line 21, column 19",$phi$793)
};
const parseToken_8064 = f_8165 => {
  const parse_8166 = s_8167 => {
    const $phi$796 = (($lt($instance_448))(s_8167.$1))(length(s_8167.$0));
    if(!$phi$796){
      return Error_8039("run out of tokens")
    } else if($phi$796){
      const $phi$798 = (getIx(s_8167.$1))(s_8167.$0);
      const $phi$800 = (($lt($instance_448))($phi$798.$3))(s_8167.$3);
      if($phi$800){
        return Error_8039("token not indented sufficiently")
      } else if(!$phi$800){
        const $phi$802 = f_8165((getIx(s_8167.$1))(s_8167.$0));
        if($phi$802.$tag==1){
          return Error_8039("parser fun failed")
        } else if($phi$802.$tag==0){
          const $phi$804 = (($lt($instance_448))(s_8167.$1+1))(length(s_8167.$0));
          if(!$phi$804){
            return (Success_8037($phi$802.$0))(((((ParserState_8060(s_8167.$0))(s_8167.$1+1))(s_8167.$2))(s_8167.$3))(s_8167.$4))
          } else if($phi$804){
            const $phi$806 = (getIx(s_8167.$1+1))(s_8167.$0);
            const $phi$808 = (($gt_7949($instance_448))($phi$806.$2))($phi$798.$2);
            if(!$phi$808){
              return (Success_8037($phi$802.$0))(((((ParserState_8060(s_8167.$0))(s_8167.$1+1))(s_8167.$2))(s_8167.$3))(s_8167.$4))
            } else if($phi$808){
              return (Success_8037($phi$802.$0))(((((ParserState_8060(s_8167.$0))(s_8167.$1+1))($phi$806.$3))(s_8167.$3))(s_8167.$4))
            } else error("pattern match fail in //compiler/jaguarParser.jg at line 41, column 35",$phi$808)
          } else error("pattern match fail in //compiler/jaguarParser.jg at line 38, column 23",$phi$804)
        } else error("pattern match fail in //compiler/jaguarParser.jg at line 35, column 20",$phi$802)
      } else error("pattern match fail in //compiler/jaguarParser.jg at line 32, column 26",$phi$800)
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 28, column 34",$phi$796)
  };
  return Parser_8047(parse_8166)
};
const reservedP_8072 = s_8239 => parseToken_8064(t_8240 => {
  if(t_8240.$0.$tag==5){
    const $phi$811 = (($eq$eq($instance_447))(t_8240.$1))(s_8239);
    if($phi$811){
      return Just_7904(s_8239)
    } else if(!$phi$811){
      return Nothing_7913
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 87, column 26",$phi$811)
  } else return Nothing_7913
});
const operatorP_8070 = s_8228 => parseToken_8064(t_8229 => {
  if(t_8229.$0.$tag==4){
    const $phi$814 = (($eq$eq($instance_447))(t_8229.$1))(s_8228);
    if($phi$814){
      return Just_7904(s_8228)
    } else if(!$phi$814){
      return Nothing_7913
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 77, column 26",$phi$814)
  } else return Nothing_7913
});
const strP_8095 = parseToken_8064(t_8309 => {
  if(t_8309.$0.$tag==3){
    return Just_7904(t_8309.$1)
  } else return Nothing_7913
});
const importAllP_8126 = (($lt$mul$gt($instance_7673))((pure($instance_7673))(ImportAll_8028(emptyAnn_8002))))((($pip$gt_8035($instance_7673))((($pip$gt_8035($instance_7673))(operatorP_8070("*")))(reservedP_8072("from"))))(strP_8095));
const symP_8069 = s_8222 => parseToken_8064(t_8223 => {
  if(t_8223.$0.$tag==1){
    const $phi$818 = (($eq$eq($instance_447))(t_8223.$1))(s_8222);
    if($phi$818){
      return Just_7904(s_8222)
    } else if(!$phi$818){
      return Nothing_7913
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 71, column 27",$phi$818)
  } else return Nothing_7913
});
const reserved_8068 = ["as","class","where","instance","let","in","from","import","case","of","data","module"];
const nonReservedP_8073 = parseToken_8064(t_8245 => {
  if(t_8245.$0.$tag==5){
    const $phi$821 = ((contains_7958($instance_447))(t_8245.$1))(reserved_8068);
    if($phi$821){
      return Nothing_7913
    } else if(!$phi$821){
      return Just_7904(t_8245.$1)
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 93, column 26",$phi$821)
  } else return Nothing_7913
});
const importAliasP_8124 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(Pair_7941)))(nonReservedP_8073)))((($pip$gt_8035($instance_7673))(reservedP_8072("as")))(nonReservedP_8073));
const importNoAliasP_8123 = (($lt$mul$gt($instance_7673))((pure($instance_7673))(n_8365 => (Pair_7941(n_8365))(n_8365))))(nonReservedP_8073);
const importOpenP_8125 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(ns_8366 => f_8367 => ((ImportOpen_7988(emptyAnn_8002))(f_8367))(ns_8366))))((($lt$pip_8034($instance_7673))((($pip$gt_8035($instance_7673))(symP_8069("{")))((sepBy1_8046((($lt$pip$gt($instance_7683))(importAliasP_8124))(importNoAliasP_8123)))(symP_8069(",")))))(symP_8069("}")))))((($pip$gt_8035($instance_7673))(reservedP_8072("from")))(strP_8095));
const importP_8127 = (($pip$gt_8035($instance_7673))(reservedP_8072("import")))((($lt$pip$gt($instance_7683))(importOpenP_8125))(importAllP_8126));
const parseImports_8135 = runParser_8063(many_8048(importP_8127));
const notUpperCaseId_8075 = parseToken_8064(t_8255 => {
  if(t_8255.$0.$tag==5){
    const $phi$824 = (containsChar_7930((getChar(0))(t_8255.$1)))(upperCaseLetters_8045);
    if(!$phi$824){
      const $phi$826 = ((contains_7958($instance_447))(t_8255.$1))(reserved_8068);
      if(!$phi$826){
        return Just_7904(t_8255.$1)
      } else if($phi$826){
        return Nothing_7913
      } else error("pattern match fail in //compiler/jaguarParser.jg at line 106, column 14",$phi$826)
    } else if($phi$824){
      return Nothing_7913
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 105, column 26",$phi$824)
  } else return Nothing_7913
});
const tvarP_8113 = (($lt$mul$gt($instance_7673))((pure($instance_7673))(TSkolem_7995(emptyAnn_8002))))(notUpperCaseId_8075);
const $lt$mul$mns$gt_8066 = pf_8193 => pa_8194 => {
  const parse_8197 = s_8198 => {
    const $phi$831 = pf_8193.$0(s_8198);
    if($phi$831.$tag==0){
      const $phi$833 = pa_8194.$0(((((ParserState_8060($phi$831.$1.$0))($phi$831.$1.$1))($phi$831.$1.$2))(s_8198.$2+1))($phi$831.$1.$4));
      if($phi$833.$tag==0){
        return (Success_8037($phi$831.$0($phi$833.$0)))(((((ParserState_8060($phi$833.$1.$0))($phi$833.$1.$1))($phi$833.$1.$2))(s_8198.$3))($phi$833.$1.$4))
      } else if($phi$833.$tag==1){
        return Error_8039($phi$833.$0)
      } else error("pattern match fail in //compiler/jaguarParser.jg at line 60, column 55",$phi$833)
    } else if($phi$831.$tag==1){
      return Error_8039($phi$831.$0)
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 59, column 38",$phi$831)
  };
  return Parser_8047(parse_8197)
};
const parenP_8076 = p_8260 => (($lt$pip_8034($instance_7673))((($pip$gt_8035($instance_7673))(symP_8069("(")))(p_8260)))(symP_8069(")"));
const upperCaseId_8074 = parseToken_8064(t_8250 => {
  if(t_8250.$0.$tag==5){
    const $phi$836 = (containsChar_7930((getChar(0))(t_8250.$1)))(upperCaseLetters_8045);
    if($phi$836){
      return Just_7904(t_8250.$1)
    } else if(!$phi$836){
      return Nothing_7913
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 99, column 26",$phi$836)
  } else return Nothing_7913
});
const tconstP_8112 = (($lt$mul$gt($instance_7673))((pure($instance_7673))(TConst_7987(emptyAnn_8002))))(upperCaseId_8074);
const typeP_8110 = Parser_8047(s_8350 => (applyParser_8041(boundTFunP_8117))(s_8350));
const typeBoundP_8111 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(TCBound_7986(emptyAnn_8002))))(upperCaseId_8074)))(typeP_8110);
const simpleTypeP_8114 = (($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))(tconstP_8112))(tvarP_8113)))(parenP_8076(typeP_8110));
const tappP_8115 = ($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((pure($instance_7673))(foldl(TApp_7984(emptyAnn_8002)))))(simpleTypeP_8114)))(many_8048(simpleTypeP_8114));
const tfunP_8116 = ($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((pure($instance_7673))(t_8351 => ts_8352 => (foldr1(b_8353 => a_8354 => ((TApp_7984(emptyAnn_8002))(((TApp_7984(emptyAnn_8002))((TConst_7987(emptyAnn_8002))("->")))(a_8354)))(b_8353)))((enqueue(t_8351))(ts_8352)))))(tappP_8115)))(many_8048((($pip$gt_8035($instance_7673))(operatorP_8070("->")))(tappP_8115)));
const f_8355 = mbs_8356 => t_8357 => {
  if(mbs_8356.$tag==1){
    return t_8357
  } else if(mbs_8356.$tag==0){
    return (((TForall_7980(emptyAnn_8002))(skolemsInOrder_8059(t_8357)))(mbs_8356.$0))(t_8357)
  } else error("pattern match fail in //compiler/jaguarParser.jg at line 248, column 13",mbs_8356)
};
const boundTFunP_8117 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(f_8355)))(opt_8042((($lt$pip_8034($instance_7673))((($lt$pip_8034($instance_7673))((($pip$gt_8035($instance_7673))(symP_8069("(")))((sepBy1_8046(typeBoundP_8111))(symP_8069(",")))))(symP_8069(")"))))(operatorP_8070("=>"))))))(tfunP_8116);
const bindingP_8394 = ($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((pure($instance_7673))(Pair_7941)))(nonReservedP_8073)))((($pip$gt_8035($instance_7673))(operatorP_8070("::")))(typeP_8110));
const scopeP_8138 = many_8048(bindingP_8394);
const parseScope_8139 = runParser_8063(scopeP_8138);
const withLocAnn_8077 = a_8261 => ((((setAnn_8033($instance_447))($instance_506))("codeLoc"))(a_8261))(emptyAnn_8002);
const parse_8182 = s_8183 => {
  const $phi$840 = (($lt($instance_448))(s_8183.$1))(length(s_8183.$0));
  if(!$phi$840){
    return Error_8039("run out of tokens")
  } else if($phi$840){
    const $phi$842 = (getIx(s_8183.$1))(s_8183.$0);
    return (Success_8037(($_7878(withLocAnn_8077))(((AnnCodeLoc_7998(s_8183.$4))($phi$842.$2))($phi$842.$3))))(s_8183)
  } else error("pattern match fail in //compiler/jaguarParser.jg at line 48, column 32",$phi$840)
};
const locP_8065 = Parser_8047(parse_8182);
const pvarP_8092 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(PVar_8010)))(locP_8065)))(notUpperCaseId_8075);
const pcnumP_8093 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(PConst_8000)))(locP_8065)))(parseToken_8064(t_8299 => {
  if(t_8299.$0.$tag==2){
    return Just_7904(CNum_7964(unsafeStringToInt(t_8299.$1)))
  } else return Nothing_7913
}));
const pcstrP_8094 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(PConst_8000)))(locP_8065)))(parseToken_8064(t_8304 => {
  if(t_8304.$0.$tag==3){
    return Just_7904(CStr_7985(t_8304.$1))
  } else return Nothing_7913
}));
const pconstP_8096 = (($lt$pip$gt($instance_7683))(pcnumP_8093))(pcstrP_8094);
const patP_8089 = Parser_8047(s_8287 => (applyParser_8041(allPatP_8100))(s_8287));
const pdataP_8097 = ($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(PData_8018)))(locP_8065)))(upperCaseId_8074)))(many_8048(patP_8089));
const nakedPatP_8098 = (($lt$pip$gt($instance_7683))(patP_8089))(pdataP_8097);
const f_8314 = ann_8315 => p_8316 => ps_8317 => {
  let $phi$845;
  const $phi$846 = length(ps_8317);
  if(1==$phi$846){
    $phi$845 = "Pair"
  } else if(2==$phi$846){
    $phi$845 = "Tuple3"
  } else if(3==$phi$846){
    $phi$845 = "Tuple4"
  } else if(4==$phi$846){
    $phi$845 = "Tuple5"
  } else if(5==$phi$846){
    $phi$845 = "Tuple6"
  } else error("pattern match fail in //compiler/jaguarParser.jg at line 185, column 12",$phi$846);
  const cons_8318 = $phi$845;
  return ((PData_8018(ann_8315))(cons_8318))((enqueue(p_8316))(ps_8317))
};
const ptupleP_8099 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(f_8314)))(locP_8065)))((($pip$gt_8035($instance_7673))(symP_8069("(")))((($lt$pip_8034($instance_7673))(nakedPatP_8098))(symP_8069(","))))))((($lt$pip_8034($instance_7673))((sepBy1_8046(nakedPatP_8098))(symP_8069(","))))(symP_8069(")")));
const allPatP_8100 = (($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))(pvarP_8092))(pconstP_8096)))(parenP_8076(pdataP_8097))))(ptupleP_8099);
const headerP_8128 = (($lt$pip_8034($instance_7673))((($pip$gt_8035($instance_7673))(reservedP_8072("module")))(nonReservedP_8073)))(reservedP_8072("where"));
const dataConP_8121 = ($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((pure($instance_7673))(DataCon_8011(emptyAnn_8002))))(upperCaseId_8074)))(many_8048(simpleTypeP_8114));
const $pip$mns$gt_8067 = pa_8218 => pb_8219 => ($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((pure($instance_7673))(__8220 => b_8221 => b_8221)))(pa_8218)))(pb_8219);
const dataP_8122 = ($lt$mul$mns$gt_8066(($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((pure($instance_7673))(Data_7975(emptyAnn_8002))))(($pip$mns$gt_8067(reservedP_8072("data")))(upperCaseId_8074))))(many_8048(notUpperCaseId_8075))))((($pip$gt_8035($instance_7673))(operatorP_8070("=")))((sepBy1_8046(dataConP_8121))(operatorP_8070("|"))));
const anyOpP_8071 = parseToken_8064(t_8234 => {
  if(t_8234.$0.$tag==4){
    return Just_7904(t_8234.$1)
  } else return Nothing_7913
});
const varP_8079 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(Var_7971)))(locP_8065)))(nonReservedP_8073);
const cstrP_8081 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(Const_7965)))(locP_8065)))(parseToken_8064(t_8268 => {
  if(t_8268.$0.$tag==3){
    return Just_7904(CStr_7985(t_8268.$1))
  } else return Nothing_7913
}));
const cnumP_8080 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(Const_7965)))(locP_8065)))(parseToken_8064(t_8263 => {
  if(t_8263.$0.$tag==2){
    return Just_7904(CNum_7964(unsafeStringToInt(t_8263.$1)))
  } else return Nothing_7913
}));
const constP_8082 = (($lt$pip$gt($instance_7683))(cstrP_8081))(cnumP_8080);
const mkPatLam_8090 = l_8288 => p_8289 => a_8290 => {
  if(p_8289.$tag==0){
    return ((Lam_8013(l_8288))(p_8289.$1))(a_8290)
  } else return ((Lam_8013(l_8288))("$pat"))(((Case_7992(l_8288))((Var_7971(l_8288))("$pat")))([(Pair_7941(p_8289))(a_8290)]))
};
const typeAnnP_8104 = Parser_8047(s_8332 => (applyParser_8041((($pip$gt_8035($instance_7673))(operatorP_8070("::")))(typeP_8110)))(s_8332));
const mkDefs_8103 = mt_8319 => l_8320 => p_8321 => e_8322 => {
  if(p_8321.$tag==0){
    if(mt_8319.$tag==0){
      return [(Pair_7941(p_8321.$1))((setType_8026(wrapForall_8058(mt_8319.$0)))(e_8322))]
    } else if(mt_8319.$tag==1){
      return [(Pair_7941(p_8321.$1))(e_8322)]
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 206, column 15",mt_8319)
  } else {
    let $phi$852;
    const $phi$853 = getAnnCodeLoc_7972(l_8320);
    if(($phi$853.$tag==0)&&($phi$853.$0.$tag==1)){
      $phi$852 = ((("$pat_"+(intToString($phi$853.$0.$1)))+"_")+(intToString($phi$853.$0.$2)))
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 210, column 10",$phi$853);
    const id_8327 = $phi$852;
    return (enqueue((Pair_7941(id_8327))(e_8322)))((map(n_8331 => (Pair_7941(n_8331))(((Case_7992(l_8320))((Var_7971(emptyAnn_8002))(id_8327)))([(Pair_7941(p_8321))((Var_7971(emptyAnn_8002))(n_8331))]))))(namesInPat_8008(p_8321)))
  }
};
const withLocOf_8078 = e_8262 => withLocAnn_8077(($_7878(fromJust_7937))((((getAnn_7978($instance_447))($instance_506))("codeLoc"))(annOf_8014(e_8262))));
const exprP_8083 = Parser_8047(s_8273 => (applyParser_8041(opP_8109))(s_8273));
const arrayLitP_8084 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(ann_8274 => xs_8275 => ((New_7960(ann_8274))("Array"))(xs_8275))))(locP_8065)))((($lt$pip_8034($instance_7673))((($pip$gt_8035($instance_7673))(symP_8069("[")))((sepBy_8044(exprP_8083))(symP_8069(",")))))(symP_8069("]")));
const recLitP_8085 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(ann_8276 => xs_8277 => ((New_7960(ann_8276))("@Rec"))(((foldl(concat))([]))(xs_8277)))))(locP_8065)))((($lt$pip_8034($instance_7673))((($pip$gt_8035($instance_7673))(symP_8069("{")))((sepBy_8044((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(a_8278 => b_8279 => [(Const_7965(emptyAnn_8002))(CStr_7985(a_8278)),b_8279])))((($lt$pip_8034($instance_7673))(nonReservedP_8073))(operatorP_8070("=")))))(exprP_8083)))(symP_8069(",")))))(symP_8069("}")));
const f_8280 = ann_8281 => e_8282 => es_8283 => {
  let $phi$855;
  const $phi$856 = length(es_8283);
  if(1==$phi$856){
    $phi$855 = "Pair"
  } else if(2==$phi$856){
    $phi$855 = "Tuple3"
  } else if(3==$phi$856){
    $phi$855 = "Tuple4"
  } else if(4==$phi$856){
    $phi$855 = "Tuple5"
  } else if(5==$phi$856){
    $phi$855 = "Tuple6"
  } else error("pattern match fail in //compiler/jaguarParser.jg at line 139, column 12",$phi$856);
  const cons_8284 = $phi$855;
  return ((foldl(App_7961(ann_8281)))(((App_7961(ann_8281))((Var_7971(ann_8281))(cons_8284)))(e_8282)))(es_8283)
};
const tupleLitP_8086 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(f_8280)))(locP_8065)))((($pip$gt_8035($instance_7673))(symP_8069("(")))((($lt$pip_8034($instance_7673))(exprP_8083))(symP_8069(","))))))((($lt$pip_8034($instance_7673))((sepBy1_8046(exprP_8083))(symP_8069(","))))(symP_8069(")")));
const simpleExprP_8087 = (($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))(varP_8079))(constP_8082)))(arrayLitP_8084)))(tupleLitP_8086)))(recLitP_8085)))(parenP_8076(exprP_8083));
const appP_8088 = ($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((pure($instance_7673))(foldl(f_8285 => a_8286 => ((App_7961(withLocOf_8078(f_8285)))(f_8285))(a_8286)))))((($lt$pip$gt($instance_7683))(varP_8079))(parenP_8076(exprP_8083)))))(many_8048(simpleExprP_8087));
const lamP_8091 = ($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(l_8294 => ps_8295 => a_8296 => ((foldr(a_8297 => p_8298 => ((mkPatLam_8090(l_8294))(p_8298))(a_8297)))(a_8296))(ps_8295))))(locP_8065)))(($pip$mns$gt_8067(symP_8069("\\")))(some_8043(patP_8089)))))((($pip$gt_8035($instance_7673))(operatorP_8070("->")))(exprP_8083));
const ofP_8101 = ($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((pure($instance_7673))(Pair_7941)))(nakedPatP_8098)))((($pip$gt_8035($instance_7673))(operatorP_8070("->")))(exprP_8083));
const caseP_8102 = ($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(Case_7992)))(locP_8065)))(($pip$mns$gt_8067(reservedP_8072("case")))(simpleExprP_8087))))((($pip$gt_8035($instance_7673))(reservedP_8072("of")))(some_8043(ofP_8101)));
const defP_8105 = ($lt$mul$mns$gt_8066(($lt$mul$mns$gt_8066(($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(l_8333 => lhs_8334 => ps_8335 => mt_8336 => e_8337 => (((mkDefs_8103(mt_8336))(l_8333))(lhs_8334))(((foldr(e_8338 => p_8339 => ((mkPatLam_8090(l_8333))(p_8339))(e_8338)))(e_8337))(ps_8335)))))(locP_8065)))(nakedPatP_8098)))(many_8048(patP_8089))))(opt_8042(typeAnnP_8104))))((($pip$gt_8035($instance_7673))(operatorP_8070("=")))(exprP_8083));
const defsP_8106 = (($lt$mul$gt($instance_7673))((pure($instance_7673))((foldl(concat))([]))))(some_8043(defP_8105));
const letP_8107 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(Let_8021)))(locP_8065)))(($pip$mns$gt_8067(reservedP_8072("let")))(defsP_8106))))(($pip$mns$gt_8067(reservedP_8072("in")))(exprP_8083));
const primaryExprP_8108 = (($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))((($lt$pip$gt($instance_7683))(appP_8088))(constP_8082)))(lamP_8091)))(caseP_8102)))(letP_8107)))(arrayLitP_8084)))(recLitP_8085)))(tupleLitP_8086);
const opP_8109 = ($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((pure($instance_7673))(e_8340 => oes_8341 => ((foldl(a_8342 => lob_8343 => ((App_7961(lob_8343.$0))(((App_7961(lob_8343.$0))((Var_7971(lob_8343.$0))(lob_8343.$1.$0)))(a_8342)))(lob_8343.$1.$1)))(e_8340))(oes_8341))))(primaryExprP_8108)))(many_8048((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(l_8347 => op_8348 => e_8349 => (Pair_7941(l_8347))((Pair_7941(op_8348))(e_8349)))))(locP_8065)))(anyOpP_8071)))(primaryExprP_8108)));
const instanceP_8120 = ($lt$mul$mns$gt_8066(($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((pure($instance_7673))(name_8362 => t_8363 => maybeDefs_8364 => (((Instance_8004(emptyAnn_8002))(name_8362))(t_8363))((justOr_7917([]))(maybeDefs_8364)))))(($pip$mns$gt_8067(reservedP_8072("instance")))(upperCaseId_8074))))(simpleTypeP_8114)))(opt_8042((($pip$gt_8035($instance_7673))(reservedP_8072("where")))(defsP_8106)));
const addExportAnn_8374 = d_8375 => (Pair_7941(d_8375.$0))((withAnn_8024(((((setAnn_8033($instance_447))($instance_506))("export"))(AnnExport_8005(d_8375.$0)))(annOf_8014(d_8375.$1))))(d_8375.$1));
const topLevelDefsP_8131 = (($lt$mul$gt($instance_7673))((pure($instance_7673))(map(addExportAnn_8374))))(defsP_8106);
const classMemberP_8118 = ($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((pure($instance_7673))(Pair_7941)))(notUpperCaseId_8075)))((($pip$gt_8035($instance_7673))(operatorP_8070("::")))(typeP_8110));
const classP_8119 = ($lt$mul$mns$gt_8066(($lt$mul$mns$gt_8066((($lt$mul$gt($instance_7673))((pure($instance_7673))(name_8359 => tv_8360 => maybeDefs_8361 => (((Class_8012(emptyAnn_8002))(name_8359))(tv_8360))((justOr_7917([]))(maybeDefs_8361)))))(($pip$mns$gt_8067(reservedP_8072("class")))(upperCaseId_8074))))(notUpperCaseId_8075)))(opt_8042((($pip$gt_8035($instance_7673))(reservedP_8072("where")))(some_8043(classMemberP_8118))));
const eitherP_8130 = a_8371 => b_8372 => ($_7878(Parser_8047))(s_8373 => (applyParser_8041((($lt$pip$gt($instance_7683))((($lt$mul$gt($instance_7673))((pure($instance_7673))(Left_7888)))(a_8371)))((($lt$mul$gt($instance_7673))((pure($instance_7673))(Right_7946)))(b_8372))))(s_8373));
const topLevelP_8132 = (eitherP_8130((eitherP_8130(dataP_8122))(topLevelDefsP_8131)))((eitherP_8130(classP_8119))(instanceP_8120));
const splitFourWay_8129 = e_8368 => {
  const $phi$860 = splitEither_7956(e_8368);
  return (Pair_7941(splitEither_7956($phi$860.$0)))(splitEither_7956($phi$860.$1))
};
const name_8378 = h_8380 => loc_8381 => {
  if(h_8380.$tag==1){
    const $phi$863 = getAnnCodeLoc_7972(loc_8381);
    if(($phi$863.$tag==0)&&($phi$863.$0.$tag==1)){
      return $phi$863.$0.$0
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 299, column 16",$phi$863)
  } else if(h_8380.$tag==0){
    return h_8380.$0
  } else error("pattern match fail in //compiler/jaguarParser.jg at line 298, column 16",h_8380)
};
const f_8379 = loc_8386 => h_8387 => is_8388 => es_8389 => {
  const $phi$865 = splitFourWay_8129(es_8389);
  return ((((((Module_7982(loc_8386))((name_8378(h_8387))(loc_8386)))(is_8388))($phi$865.$0.$0))($phi$865.$1.$0))((map(Pair_7941("")))($phi$865.$1.$1)))(((foldl(concat))([]))($phi$865.$0.$1))
};
const moduleP_8133 = (($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((($lt$mul$gt($instance_7673))((pure($instance_7673))(f_8379)))(locP_8065)))(opt_8042(headerP_8128))))(many_8048(importP_8127))))(some_8043(topLevelP_8132));
const parseModule_8134 = runParser_8063(moduleP_8133);
const parseExpr_8136 = runParser_8063(exprP_8083);
const parseType_8137 = runParser_8063(typeP_8110);
const head_8395 = head_46;
const $gt$gt_8396 = $gt$gt_21;
const size_8397 = size_72;
const setContains_8398 = setContains_82;
const uniq_8399 = uniq_51;
const all_8400 = all_38;
const mconcat_8401 = mconcat_22;
const zip_8402 = zip_43;
const $lt$eq_8403 = $lt$eq_19;
const setAddAll_8404 = setAddAll_80;
const BitmapIndexed_8405 = BitmapIndexed_14;
const reverse_8406 = reverse_52;
const isEmpty_8407 = isEmpty_73;
const $_8408 = $_16;
const remove_8409 = remove_69;
const forM_8410 = forM_58;
const Unit_8411 = Unit_0;
const loop_8412 = loop_32;
const either_8413 = either_29;
const runState_8414 = runState_61;
const assert_8415 = assert_94;
const setRemove_8416 = setRemove_81;
const zipWithIndex2_8417 = zipWithIndex2_41;
const Left_8418 = Left_8;
const fst_8419 = fst_27;
const setDiff_8420 = setDiff_85;
const insertAll_8421 = insertAll_77;
const mapJust_8422 = mapJust_45;
const maybe_8423 = maybe_23;
const concatMap_8424 = concatMap_44;
const snd_8425 = snd_28;
const mergeSet_8426 = mergeSet_50;
const join_8427 = join_39;
const setIntersection_8428 = setIntersection_86;
const zipWithIndex_8429 = zipWithIndex_42;
const Tuple3_8430 = Tuple3_4;
const mapFst_8431 = mapFst_92;
const mapIx_8432 = mapIx_35;
const foldM_8433 = foldM_56;
const Just_8434 = Just_1;
const Tuple4_8435 = Tuple4_5;
const toRecord_8436 = toRecord_54;
const hamtMask_8437 = hamtMask_64;
const Empty_8438 = Empty_11;
const strToArray_8439 = strToArray_55;
const Tuple5_8440 = Tuple5_6;
const mapSnd_8441 = mapSnd_93;
const setUnion_8442 = setUnion_83;
const Nothing_8443 = Nothing_2;
const trieKeys_8444 = trieKeys_75;
const Tuple6_8445 = Tuple6_7;
const $div$eq_8446 = $div$eq_17;
const justOr_8447 = justOr_24;
const tail_8448 = tail_47;
const init_8449 = init_49;
const debugIf_8450 = debugIf_88;
const sets_8451 = sets_60;
const State_8452 = State_10;
const mapM_8453 = mapM_57;
const hamtIndex_8454 = hamtIndex_65;
const mergeTrie_8455 = mergeTrie_74;
const Collision_8456 = Collision_13;
const not_8457 = not_31;
const evalState_8458 = evalState_62;
const debugMaybe_8459 = debugMaybe_89;
const containsChar_8460 = containsChar_36;
const emptySet_8461 = emptySet_78;
const updateOrSet_8462 = updateOrSet_68;
const isJust_8463 = isJust_26;
const last_8464 = last_48;
const trieEntries_8465 = trieEntries_76;
const mapTrie_8466 = mapTrie_71;
const fromJust_8467 = fromJust_25;
const find_8468 = find_34;
const insert_8469 = insert_67;
const lookup_8470 = lookup_66;
const Pair_8471 = Pair_3;
const repeat_8472 = repeat_40;
const foldTrie_8473 = foldTrie_70;
const exists_8474 = exists_37;
const setToArray_8475 = setToArray_84;
const Right_8476 = Right_9;
const debugWrap_8477 = debugWrap_90;
const gets_8478 = gets_59;
const $gt_8479 = $gt_18;
const Identity_8480 = Identity_15;
const popCount_8481 = popCount_63;
const dedup_8482 = dedup_53;
const Leaf_8483 = Leaf_12;
const debug2_8484 = debug2_87;
const $gt$eq$gt_8485 = $gt$eq$gt_91;
const splitEither_8486 = splitEither_30;
const setAdd_8487 = setAdd_79;
const contains_8488 = contains_33;
const $gt$eq_8489 = $gt$eq_20;
const New_8490 = New_785;
const App_8491 = App_781;
const down_8492 = down_840;
const dataConName_8493 = dataConName_829;
const CNum_8494 = CNum_786;
const Const_8495 = Const_780;
const getAnnType_8496 = getAnnType_816;
const TRow_8497 = TRow_803;
const Inst_8498 = Inst_797;
const printCodeLoc_8499 = printCodeLoc_820;
const getPatType_8500 = getPatType_835;
const Var_8501 = Var_779;
const getAnnCodeLoc_8502 = getAnnCodeLoc_818;
const equivBound_8503 = equivBound_823;
const AnnUseCount_8504 = AnnUseCount_775;
const Data_8505 = Data_793;
const AnnData_8506 = AnnData_776;
const exprLoc_8507 = exprLoc_821;
const getAnn_8508 = getAnn_811;
const downM_8509 = downM_845;
const TForall_8510 = TForall_805;
const copyAnn_8511 = copyAnn_813;
const Module_8512 = Module_791;
const ModuleInterface_8513 = ModuleInterface_792;
const TApp_8514 = TApp_802;
const CStr_8515 = CStr_787;
const TCBound_8516 = TCBound_798;
const TConst_8517 = TConst_799;
const ImportOpen_8518 = ImportOpen_808;
const equivType_8519 = equivType_828;
const dataConNames_8520 = dataConNames_830;
const downAndUp_8521 = downAndUp_838;
const Case_8522 = Case_783;
const getType_8523 = getType_834;
const ImportClosed_8524 = ImportClosed_807;
const TSkolem_8525 = TSkolem_801;
const breakableDownM_8526 = breakableDownM_846;
const upM_8527 = upM_844;
const AnnCodeLoc_8528 = AnnCodeLoc_774;
const TBot_8529 = TBot_804;
const PConst_8530 = PConst_789;
const TVar_8531 = TVar_800;
const emptyAnn_8532 = emptyAnn_810;
const setAnnCodeLoc_8533 = setAnnCodeLoc_819;
const Instance_8534 = Instance_796;
const AnnExport_8535 = AnnExport_778;
const TUnknown_8536 = TUnknown_806;
const breakableDownAndUpM_8537 = breakableDownAndUpM_842;
const namesInPat_8538 = namesInPat_822;
const breakableDownAndUp_8539 = breakableDownAndUp_837;
const PVar_8540 = PVar_788;
const DataCon_8541 = DataCon_794;
const Class_8542 = Class_795;
const Lam_8543 = Lam_782;
const annOf_8544 = annOf_832;
const setAnnType_8545 = setAnnType_817;
const AnnTag_8546 = AnnTag_777;
const compareBound_8547 = compareBound_827;
const PData_8548 = PData_790;
const getAnnE_8549 = getAnnE_814;
const AnnType_8550 = AnnType_773;
const Let_8551 = Let_784;
const up_8552 = up_839;
const breakableDown_8553 = breakableDown_841;
const withAnn_8554 = withAnn_833;
const setPatType_8555 = setPatType_836;
const setType_8556 = setType_831;
const compareArr_8557 = compareArr_825;
const ImportAll_8558 = ImportAll_809;
const compareOrd_8559 = compareOrd_824;
const downAndUpM_8560 = downAndUpM_843;
const hasAnnE_8561 = hasAnnE_815;
const compareType_8562 = compareType_826;
const setAnn_8563 = setAnn_812;
const Success_8564 = Success_7601;
const Error_8565 = Error_7602;
const parseExpr_8566 = parseExpr_8136;
const parseModule_8567 = parseModule_8134;
const parseType_8568 = parseType_8137;
const ParserState_8569 = ParserState_8060;
const generateJs_8570 = compileModule_7496;
const printType_8571 = printType_1476;
const reallyPrintExpr_8572 = reallyPrintExpr_1481;
const dfs_8573 = dfs_2267;
const ArgBool_8574 = ArgBool_6276;
const ArgString_8575 = ArgString_6277;
const parseArgs_8576 = parseArgs_6280;
const getPositional_8577 = getPositional_6281;
const getString_8578 = getString_6282;
const getBool_8579 = getBool_6283;
const declassModule_8580 = declassModule_5840;
const normalizeImports_8581 = normalizeImports_5607;
const uniquify_8582 = uniquify_4611;
const mergeModules_8583 = mergeModules_5387;
const inline_8584 = inline_4900;
const translateAdts_8585 = translateAdts_4389;
const perModule_8586 = perModule_3714;
const getExports_8587 = getExports_3710;
const setUid_8588 = setUid_3713;
const timingEnd_8589 = timingEnd_3716;
const reportTimes_8590 = reportTimes_3718;
const CompilerState_8591 = CompilerState_3709;
const timed_8592 = timed_3717;
const timingStart_8593 = timingStart_3715;
const getUid_8594 = getUid_3712;
const setExports_8595 = setExports_3711;
const splitLetsPass_8596 = splitLetsPass_4179;
const liftModule_8597 = liftModule_3948;
const wrapForall_8598 = wrapForall_2045;
const inferModule_8599 = inferModule_2596;
const outPathArg_8607 = (ArgString_8575("out"))(Nothing_8443);
const builtinsPathArg_8606 = (ArgString_8575("builtins"))(Nothing_8443);
const optArg_8609 = (ArgBool_8574("opt"))(Just_8434(false));
const mainArg_8608 = (ArgString_8575("main"))(Nothing_8443);
const argDefs_8610 = [builtinsPathArg_8606,outPathArg_8607,mainArg_8608,optArg_8609];
const moduleFile_8600 = m_8616 => m_8616.$1;
const typerPass_8613 = m_8672 => (($gt$gt$eq($instance_502))(getExports_8587))(es_8673 => {
  const $pat_66_2_8674 = (inferModule_8599(es_8673))(m_8672);
  let $phi$867;
  $phi$867 = $pat_66_2_8674.$1;
  const e_8675 = $phi$867;
  let $phi$868;
  $phi$868 = $pat_66_2_8674.$0;
  const typed_8676 = $phi$868;
  return (($gt$gt_8396($instance_502))(setExports_8595(((set(moduleFile_8600(m_8672)))(e_8675))(es_8673))))((ret($instance_502))(typed_8676))
});
const parseT_8604 = s_8659 => {
  const $phi$870 = (parseType_8568(s_8659))("");
  if($phi$870.$tag==0){
    return wrapForall_8598($phi$870.$0)
  } else return error($phi$870)
};
const parseExports_8605 = e_8663 => {
  const bs_8664 = ((foldRecord(m_8665 => n_8666 => s_8667 => ((((insert_8469($instance_447))($instance_506))(n_8666))(parseT_8604(s_8667)))(m_8665)))(Empty_8438))(e_8663);
  return ((ModuleInterface_8513(bs_8664))([]))(Empty_8438)
};
const findImports_8603 = m_8641 => {
  const importFileName_8642 = i_8643 => {
    if(i_8643.$tag==2){
      return i_8643.$1
    } else if(i_8643.$tag==1){
      return i_8643.$1
    } else if(i_8643.$tag==0){
      return i_8643.$1
    } else error("pattern match fail in //compiler/compiler.jg at line 39, column 22",i_8643)
  };
  return (map(importFileName_8642))(m_8641.$2)
};
const depSort_8602 = mainName_8632 => ms_8633 => {
  const modules_8634 = ((foldl(r_8637 => m_8638 => ((((insert_8469($instance_447))($instance_506))(moduleFile_8600(m_8638)))(m_8638))(r_8637)))(Empty_8438))(ms_8633);
  const imports_8635 = (mapTrie_8466(__8639 => findImports_8603))(modules_8634);
  const ordered_8636 = ((((dfs_8573($instance_447))($instance_506))(imports_8635))([]))(mainName_8632);
  return ($_8408(reverse_8406))((map(n_8640 => ($_8408(fromJust_8467))((((lookup_8470($instance_447))($instance_506))(n_8640))(modules_8634))))(ordered_8636))
};
const normalizeImportsPass_8612 = m_8670 => (($gt$gt$eq($instance_502))(getExports_8587))(es_8671 => (ret($instance_502))((normalizeImports_8581(es_8671))(m_8670)));
const parse_8601 = fn_8624 => {
  const $phi$874 = (parseModule_8567(readFile(fn_8624)))("//"+fn_8624);
  if($phi$874.$tag==0){
    const $phi$876 = (($eq$eq($instance_446))($phi$874.$1.$1))(length($phi$874.$1.$0));
    if($phi$876){
      return $phi$874.$0
    } else if(!$phi$876){
      return error((fn_8624+": failed to parse all tokens, stopped at ")+(jsonStringify((getIx($phi$874.$1.$1))($phi$874.$1.$0))))
    } else error("pattern match fail in //compiler/compiler.jg at line 25, column 43",$phi$876)
  } else if($phi$874.$tag==1){
    return error((fn_8624+": ")+$phi$874.$0)
  } else error("pattern match fail in //compiler/compiler.jg at line 24, column 12",$phi$874)
};
const liftPass_8611 = local$instance$Monad$0 => p_8668 => a_8669 => (ret(local$instance$Monad$0))(p_8668(a_8669));
const declasserPass_8614 = m_8681 => (($gt$gt$eq($instance_502))(getExports_8587))(es_8682 => (ret($instance_502))((declassModule_8580(es_8682))(m_8681)));
const main_8615 = argv_8683 => {
  const args_8684 = (parseArgs_8576(argDefs_8610))((slice(2))(argv_8683));
  const builtinsPath_8685 = (getString_8578(args_8684))(builtinsPathArg_8606);
  const baseExports_8690 = ((set("./builtins.js"))(parseExports_8605(loadJSExports(builtinsPath_8685))))(empty);
  const srcFiles_8688 = getPositional_8577(args_8684);
  const opt_8689 = (getBool_8579(args_8684))(optArg_8609);
  const mainName_8687 = (getString_8578(args_8684))(mainArg_8608);
  const passes_8691 = (($gt$eq$gt_8485($instance_502))((($gt$eq$gt_8485($instance_502))((($gt$eq$gt_8485($instance_502))((($gt$eq$gt_8485($instance_502))((($gt$eq$gt_8485($instance_502))((($gt$eq$gt_8485($instance_502))((perModule_8586($instance_502))(($_8408(timed_8592("parse")))((liftPass_8611($instance_502))(parse_8601)))))((timed_8592("dep-sort"))((liftPass_8611($instance_502))(depSort_8602(mainName_8687))))))((perModule_8586($instance_502))((($gt$eq$gt_8485($instance_502))((($gt$eq$gt_8485($instance_502))((($gt$eq$gt_8485($instance_502))((($gt$eq$gt_8485($instance_502))((timed_8592("translate-adts"))((liftPass_8611($instance_502))(translateAdts_8585))))((timed_8592("normalize-imports"))(normalizeImportsPass_8612))))((timed_8592("uniquify"))(uniquify_8582))))((timed_8592("typer"))(typerPass_8613))))((timed_8592("declasser"))(declasserPass_8614))))))((timed_8592("merge-modules"))((liftPass_8611($instance_502))(mergeModules_8583)))))((timed_8592("opt"))(inline_8584(opt_8689)))))((timed_8592("generate-js"))((liftPass_8611($instance_502))(generateJs_8570(builtinsPath_8685))))))(reportTimes_8590);
  const js_8692 = (evalState_8458(((CompilerState_8591(baseExports_8690))(0))(Empty_8438)))(passes_8691(srcFiles_8688));
  const outPath_8686 = (getString_8578(args_8684))(outPathArg_8607);
  return (writeFile(js_8692))(outPath_8686)
};
const exports = {outPathArg:outPathArg_8607,builtinsPathArg:builtinsPathArg_8606,optArg:optArg_8609,mainArg:mainArg_8608,argDefs:argDefs_8610,moduleFile:moduleFile_8600,typerPass:typerPass_8613,parseT:parseT_8604,parseExports:parseExports_8605,findImports:findImports_8603,depSort:depSort_8602,normalizeImportsPass:normalizeImportsPass_8612,parse:parse_8601,liftPass:liftPass_8611,declasserPass:declasserPass_8614,main:main_8615}
module.exports = exports;})();if (module.exports.main)module.exports.main(process.argv)