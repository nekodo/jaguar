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
    fs.write(out, contents);
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
(function() {const writeFile = (_require("./builtins.js")).writeFile;
const readFile = (_require("./builtins.js")).readFile;
const processCwd = (_require("./builtins.js")).processCwd;
const processArgv = (_require("./builtins.js")).processArgv;
const loadJSExports = (_require("./builtins.js")).loadJSExports;
const $add = (_require("./builtins.js")).$add;
const $del = (_require("./builtins.js")).$del;
const $mul = (_require("./builtins.js")).$mul;
const jsLt = (_require("./builtins.js")).jsLt;
const jsEq = (_require("./builtins.js")).jsEq;
const $and = (_require("./builtins.js")).$and;
const $or = (_require("./builtins.js")).$or;
const $concat = (_require("./builtins.js")).$concat;
const empty = (_require("./builtins.js")).empty;
const get = (_require("./builtins.js")).get;
const getIx = (_require("./builtins.js")).getIx;
const setIx = (_require("./builtins.js")).setIx;
const getChar = (_require("./builtins.js")).getChar;
const keys = (_require("./builtins.js")).keys;
const has = (_require("./builtins.js")).has;
const del = (_require("./builtins.js")).del;
const set = (_require("./builtins.js")).set;
const mapRecord = (_require("./builtins.js")).mapRecord;
const foldRecord = (_require("./builtins.js")).foldRecord;
const merge = (_require("./builtins.js")).merge;
const unsafeStringToInt = (_require("./builtins.js")).unsafeStringToInt;
const match = (_require("./builtins.js")).match;
const drop = (_require("./builtins.js")).drop;
const length = (_require("./builtins.js")).length;
const emptyArray = (_require("./builtins.js")).emptyArray;
const push = (_require("./builtins.js")).push;
const enqueue = (_require("./builtins.js")).enqueue;
const intToString = (_require("./builtins.js")).intToString;
const intercalate = (_require("./builtins.js")).intercalate;
const slice = (_require("./builtins.js")).slice;
const slice2 = (_require("./builtins.js")).slice2;
const splice = (_require("./builtins.js")).splice;
const arrDel = (_require("./builtins.js")).arrDel;
const arrIns = (_require("./builtins.js")).arrIns;
const concat = (_require("./builtins.js")).concat;
const map = (_require("./builtins.js")).map;
const filter = (_require("./builtins.js")).filter;
const foldr = (_require("./builtins.js")).foldr;
const foldr1 = (_require("./builtins.js")).foldr1;
const foldl = (_require("./builtins.js")).foldl;
const foldl1 = (_require("./builtins.js")).foldl1;
const sort = (_require("./builtins.js")).sort;
const error = (_require("./builtins.js")).error;
const debug = (_require("./builtins.js")).debug;
const jsonStringify = (_require("./builtins.js")).jsonStringify;
const iterate = (_require("./builtins.js")).iterate;
const True = (_require("./builtins.js")).True;
const False = (_require("./builtins.js")).False;
const perfTime = (_require("./builtins.js")).perfTime;
const bitAnd = (_require("./builtins.js")).bitAnd;
const bitOr = (_require("./builtins.js")).bitOr;
const bitShiftRight = (_require("./builtins.js")).bitShiftRight;
const bitShiftLeft = (_require("./builtins.js")).bitShiftLeft;
const strHashCode = (_require("./builtins.js")).strHashCode;
const bitNot = (_require("./builtins.js")).bitNot;
const stringReplaceChar = (_require("./builtins.js")).stringReplaceChar;
const stringSplit = (_require("./builtins.js")).stringSplit;
const currentTimeMs = (_require("./builtins.js")).currentTimeMs;
const $class$Monad = $_0 => $_1 => ({$0:$_0,$1:$_1});
const ret = x_$class$Monad => x_$class$Monad.$0;
const $gt$gt$eq = x_$class$Monad => x_$class$Monad.$1;
const Left_8 = $_0_109 => ({$0:$_0_109,$tag:0});
const New_732 = $_0_807 => $_1_808 => $_2_809 => ({$0:$_0_807,$1:$_1_808,$2:$_2_809,$tag:6});
const Let_731 = $_0_804 => $_1_805 => $_2_806 => ({$0:$_0_804,$1:$_1_805,$2:$_2_806,$tag:5});
const Lam_729 = $_0_798 => $_1_799 => $_2_800 => ({$0:$_0_798,$1:$_1_799,$2:$_2_800,$tag:3});
const Case_730 = $_0_801 => $_1_802 => $_2_803 => ({$0:$_0_801,$1:$_1_802,$2:$_2_803,$tag:4});
const App_728 = $_0_795 => $_1_796 => $_2_797 => ({$0:$_0_795,$1:$_1_796,$2:$_2_797,$tag:2});
const Right_9 = $_0_110 => ({$0:$_0_110,$tag:1});
const Pair_3 = $_0_89 => $_1_90 => ({$0:$_0_89,$1:$_1_90});
const foldM_53 = local$instance$Monad$0 => f_237 => r_238 => xs_239 => ((foldl(r_240 => x_241 => (($gt$gt$eq(local$instance$Monad$0))(r_240))(r_242 => (f_237(r_242))(x_241))))((ret(local$instance$Monad$0))(r_238)))(xs_239);
const mapM_54 = local$instance$Monad$0 => f_243 => xs_244 => (((foldM_53(local$instance$Monad$0))(xs_245 => x_246 => (($gt$gt$eq(local$instance$Monad$0))(f_243(x_246)))(x_247 => (ret(local$instance$Monad$0))((push(x_247))(xs_245)))))([]))(xs_244);
const breakableDownAndUpM_779 = local$instance$Monad$0 => down_1081 => up_1082 => e_1083 => {
  const go_1084 = ((breakableDownAndUpM_779(local$instance$Monad$0))(down_1081))(up_1082);
  const gos_1085 = (mapM_54(local$instance$Monad$0))(d_1086 => (($gt$gt$eq(local$instance$Monad$0))(go_1084(d_1086.$1)))(e_1089 => (ret(local$instance$Monad$0))((Pair_3(d_1086.$0))(e_1089))));
  return (($gt$gt$eq(local$instance$Monad$0))(down_1081(e_1083)))(e_1090 => {
    if(e_1090.$tag==1){
      return (ret(local$instance$Monad$0))(e_1090.$0)
    } else if(e_1090.$tag==0){
      if(e_1090.$0.$tag==3){
        return (($gt$gt$eq(local$instance$Monad$0))(go_1084(e_1090.$0.$2)))(e_1096 => up_1082(((Lam_729(e_1090.$0.$0))(e_1090.$0.$1))(e_1096)))
      } else if(e_1090.$0.$tag==2){
        return (($gt$gt$eq(local$instance$Monad$0))(go_1084(e_1090.$0.$1)))(f_1100 => (($gt$gt$eq(local$instance$Monad$0))(go_1084(e_1090.$0.$2)))(x_1101 => up_1082(((App_728(e_1090.$0.$0))(f_1100))(x_1101))))
      } else if(e_1090.$0.$tag==4){
        return (($gt$gt$eq(local$instance$Monad$0))(go_1084(e_1090.$0.$1)))(e_1105 => (($gt$gt$eq(local$instance$Monad$0))(gos_1085(e_1090.$0.$2)))(ps_1106 => up_1082(((Case_730(e_1090.$0.$0))(e_1105))(ps_1106))))
      } else if(e_1090.$0.$tag==5){
        return (($gt$gt$eq(local$instance$Monad$0))(gos_1085(e_1090.$0.$1)))(bs_1110 => (($gt$gt$eq(local$instance$Monad$0))(go_1084(e_1090.$0.$2)))(e_1111 => up_1082(((Let_731(e_1090.$0.$0))(bs_1110))(e_1111))))
      } else if(e_1090.$0.$tag==6){
        return (($gt$gt$eq(local$instance$Monad$0))(((mapM_54(local$instance$Monad$0))(go_1084))(e_1090.$0.$2)))(es_1115 => up_1082(((New_732(e_1090.$0.$0))(e_1090.$0.$1))(es_1115)))
      } else return up_1082(e_1090.$0)
    } else error("pattern match fail",e_1090)
  })
};
const downAndUpM_780 = local$instance$Monad$0 => down_1117 => up_1118 => ((breakableDownAndUpM_779(local$instance$Monad$0))(e_1119 => (($gt$gt$eq(local$instance$Monad$0))(down_1117(e_1119)))(e_1120 => (ret(local$instance$Monad$0))(Left_8(e_1120)))))(up_1118);
const popCount_60 = n_258 => {
  const n2_259 = n_258-((n_258>>>1)&1431655765);
  const n3_260 = (n2_259&858993459)+((n2_259>>>2)&858993459);
  const n4_261 = (n3_260+(n3_260>>>4))&252645135;
  const n5_262 = n4_261+(n4_261>>>8);
  const n6_263 = n5_262+(n5_262>>>16);
  return n6_263&127
};
const hamtIndex_62 = bitmap_267 => mask_268 => popCount_60(bitmap_267&(mask_268-1));
const ImportClosed_753 = $_0_863 => $_1_864 => $_2_865 => ({$0:$_0_863,$1:$_1_864,$2:$_2_865,$tag:0});
const $class$Ord = $_0 => ({$0:$_0});
const $lt = x_$class$Ord => x_$class$Ord.$0;
const $gt_18 = local$instance$Ord$0 => a_122 => b_123 => (($lt(local$instance$Ord$0))(b_123))(a_122);
const all_37 = f_197 => xs_198 => ((foldl(r_199 => x_200 => (f_197(x_200))&&r_199))(true))(xs_198);
const Nothing_2 = {$tag:1};
const Just_1 = $_0_88 => ({$0:$_0_88,$tag:0});
const Var_726 = $_0_791 => $_1_792 => ({$0:$_0_791,$1:$_1_792,$tag:0});
const Const_727 = $_0_793 => $_1_794 => ({$0:$_0_793,$1:$_1_794,$tag:1});
const annOf_771 = e_977 => {
  if(e_977.$tag==0){
    return e_977.$0
  } else if(e_977.$tag==1){
    return e_977.$0
  } else if(e_977.$tag==2){
    return e_977.$0
  } else if(e_977.$tag==3){
    return e_977.$0
  } else if(e_977.$tag==4){
    return e_977.$0
  } else if(e_977.$tag==5){
    return e_977.$0
  } else if(e_977.$tag==6){
    return e_977.$0
  } else error("pattern match fail",e_977)
};
const $_16 = f_118 => a_119 => f_118(a_119);
const AnnCodeLoc_721 = $_0_785 => $_1_786 => $_2_787 => ({$0:$_0_785,$1:$_1_786,$2:$_2_787,$tag:1});
const printCodeLoc_764 = l_891 => {
  if(l_891.$tag==1){
    return (((("in "+l_891.$0)+" at line ")+(intToString(l_891.$1+1)))+", column ")+(intToString(l_891.$2+1))
  } else error("pattern match fail",l_891)
};
const $class$Eq = $_0 => ({$0:$_0});
const $instance_410 = $class$Eq(jsEq);
const $class$Hashable = $_0 => ({$0:$_0});
const $instance_465 = $class$Hashable(s_464 => strHashCode(s_464));
const $eq$eq = x_$class$Eq => x_$class$Eq.$0;
const Empty_11 = {$tag:0};
const fst_26 = p_142 => p_142.$0;
const snd_27 = p_145 => p_145.$1;
const Leaf_12 = $_0_112 => $_1_113 => ({$0:$_0_112,$1:$_1_113,$tag:1});
const Collision_13 = $_0_114 => ({$0:$_0_114,$tag:2});
const BitmapIndexed_14 = $_0_115 => $_1_116 => ({$0:$_0_115,$1:$_1_116,$tag:3});
const hashCode = x_$class$Hashable => x_$class$Hashable.$0;
const hamtMask_61 = depth_264 => hash_265 => {
  const h_266 = (hash_265>>>(depth_264*5))&31;
  return 1<<h_266
};
const $class$Functor = $_0 => ({$0:$_0});
const fmap = x_$class$Functor => x_$class$Functor.$0;
const $instance_411 = $class$Ord(jsLt);
const find_33 = predicate_182 => xs_183 => {
  const f_184 = i_185 => {
    const $phi$14 = (($lt($instance_411))(i_185))(length(xs_183));
    if(!$phi$14){
      return Nothing_2
    } else if($phi$14){
      const $phi$16 = predicate_182((getIx(i_185))(xs_183));
      if($phi$16){
        return Just_1((getIx(i_185))(xs_183))
      } else if(!$phi$16){
        return f_184(i_185+1)
      } else error("pattern match fail",$phi$16)
    } else error("pattern match fail",$phi$14)
  };
  return f_184(0)
};
const $instance_416 = $class$Functor(f_413 => m_414 => {
  if(m_414.$tag==0){
    return Just_1(f_413(m_414.$0))
  } else if(m_414.$tag==1){
    return Nothing_2
  } else error("pattern match fail",m_414)
});
const lookup_63 = local$instance$Hashable$1 => local$instance$Eq$0 => k_269 => t_270 => {
  const hash_271 = (hashCode(local$instance$Hashable$1))(k_269);
  const f_272 = depth_273 => t_274 => {
    if(t_274.$tag==0){
      return Nothing_2
    } else if(t_274.$tag==1){
      const $phi$22 = (($eq$eq(local$instance$Eq$0))(k_269))(t_274.$0);
      if(!$phi$22){
        return Nothing_2
      } else if($phi$22){
        return Just_1(t_274.$1)
      } else error("pattern match fail",$phi$22)
    } else if(t_274.$tag==2){
      return ($_16((fmap($instance_416))(snd_27)))((find_33(e_278 => (($eq$eq(local$instance$Eq$0))(fst_26(e_278)))(k_269)))(t_274.$0))
    } else if(t_274.$tag==3){
      const m_281 = (hamtMask_61(depth_273))(hash_271);
      const $phi$20 = m_281&t_274.$0;
      if(0==$phi$20){
        return Nothing_2
      } else return (f_272(depth_273+1))((getIx((hamtIndex_62(t_274.$0))(m_281)))(t_274.$1))
    } else error("pattern match fail",t_274)
  };
  return (f_272(0))(t_270)
};
const getAnn_757 = local$instance$Hashable$1 => local$instance$Eq$0 => name_871 => ann_872 => (((lookup_63(local$instance$Hashable$1))(local$instance$Eq$0))(name_871))(ann_872);
const getAnnCodeLoc_762 = ann_886 => (((getAnn_757($instance_465))($instance_410))("codeLoc"))(ann_886);
const exprLoc_765 = e_895 => {
  const $phi$24 = ($_16(getAnnCodeLoc_762))(annOf_771(e_895));
  if($phi$24.$tag==1){
    return "in unknown location"
  } else if($phi$24.$tag==0){
    return printCodeLoc_764($phi$24.$0)
  } else error("pattern match fail",$phi$24)
};
const ComTok_6173 = {$tag:6};
const Module_738 = $_0_819 => $_1_820 => $_2_821 => $_3_822 => $_4_823 => $_5_824 => $_6_825 => ({$0:$_0_819,$1:$_1_820,$2:$_2_821,$3:$_3_822,$4:$_4_823,$5:$_5_824,$6:$_6_825});
const ImportOpen_754 = $_0_866 => $_1_867 => $_2_868 => ({$0:$_0_866,$1:$_1_867,$2:$_2_868,$tag:1});
const CStr_734 = $_0_811 => ({$0:$_0_811,$tag:1});
const instrument_6901 = m_6964 => {
  const addImport_6967 = i_6981 => {
    if((i_6981.$tag==1)&&("./builtins.js"==i_6981.$1)){
      return ((ImportOpen_754(i_6981.$0))("./builtins.js"))((push((Pair_3("perfTime"))("perfTime")))(i_6981.$2))
    } else return i_6981
  };
  const instrumentExpr_6966 = n_6974 => e_6975 => {
    if(e_6975.$tag==3){
      return ((Lam_729(e_6975.$0))(e_6975.$1))((instrumentExpr_6966(n_6974))(e_6975.$2))
    } else {
      const we_6980 = ((Lam_729(Empty_11))("$unused$"))(e_6975);
      return ((App_728(Empty_11))(((App_728(Empty_11))((Var_726(Empty_11))("perfTime")))((Const_727(Empty_11))(CStr_734(n_6974)))))(we_6980)
    }
  };
  const instrumentDef_6965 = d_6968 => {
    if(d_6968.$1.$tag==3){
      return (Pair_3(d_6968.$0))((instrumentExpr_6966(d_6968.$0))(((Lam_729(d_6968.$1.$0))(d_6968.$1.$1))(d_6968.$1.$2)))
    } else return d_6968
  };
  return ((((((Module_738(m_6964.$0))(m_6964.$1))((map(addImport_6967))(m_6964.$2)))(m_6964.$3))(m_6964.$4))(m_6964.$5))((map(instrumentDef_6965))(m_6964.$6))
};
const instrumentPass_6912 = local$instance$Monad$0 => profile_7002 => m_7003 => {
  if(!profile_7002){
    return (ret(local$instance$Monad$0))(m_7003)
  } else if(profile_7002){
    return (ret(local$instance$Monad$0))(instrument_6901(m_7003))
  } else error("pattern match fail",profile_7002)
};
const foldTrie_67 = f_333 => a_334 => t_335 => {
  if(t_335.$tag==0){
    return a_334
  } else if(t_335.$tag==1){
    return ((f_333(a_334))(t_335.$0))(t_335.$1)
  } else if(t_335.$tag==2){
    return ((foldl(a_339 => e_340 => ((f_333(a_339))(fst_26(e_340)))(snd_27(e_340))))(a_334))(t_335.$0)
  } else if(t_335.$tag==3){
    return ((foldl(foldTrie_67(f_333)))(a_334))(t_335.$1)
  } else error("pattern match fail",t_335)
};
const mapIx_34 = f_186 => ix_187 => xs_188 => ((setIx(ix_187))(f_186((getIx(ix_187))(xs_188))))(xs_188);
const not_30 = b_162 => {
  if(b_162){
    return false
  } else if(!b_162){
    return true
  } else error("pattern match fail",b_162)
};
const $div$eq_17 = local$instance$Eq$0 => a_120 => b_121 => not_30((($eq$eq(local$instance$Eq$0))(a_120))(b_121));
const insert_64 = local$instance$Hashable$1 => local$instance$Eq$0 => k_283 => v_284 => t_285 => {
  const hash_286 = (hashCode(local$instance$Hashable$1))(k_283);
  const f_287 = depth_288 => t_289 => {
    if(t_289.$tag==0){
      return (Leaf_12(k_283))(v_284)
    } else if(t_289.$tag==2){
      return Collision_13((push((Pair_3(k_283))(v_284)))((filter(e_291 => (($div$eq_17(local$instance$Eq$0))(fst_26(e_291)))(k_283)))(t_289.$0)))
    } else if(t_289.$tag==1){
      const $phi$36 = (($eq$eq(local$instance$Eq$0))(k_283))(t_289.$0);
      if($phi$36){
        return (Leaf_12(k_283))(v_284)
      } else if(!$phi$36){
        if(7==depth_288){
          return Collision_13([(Pair_3(t_289.$0))(t_289.$1),(Pair_3(k_283))(v_284)])
        } else {
          const m_295 = (hamtMask_61(depth_288))((hashCode(local$instance$Hashable$1))(t_289.$0));
          return (f_287(depth_288))((BitmapIndexed_14(m_295))([(Leaf_12(t_289.$0))(t_289.$1)]))
        }
      } else error("pattern match fail",$phi$36)
    } else if(t_289.$tag==3){
      const m_298 = (hamtMask_61(depth_288))(hash_286);
      const bitmap2_299 = m_298|t_289.$0;
      const ix_300 = (hamtIndex_62(bitmap2_299))(m_298);
      const $phi$34 = m_298&t_289.$0;
      if(0==$phi$34){
        return (BitmapIndexed_14(bitmap2_299))(((arrIns(ix_300))((Leaf_12(k_283))(v_284)))(t_289.$1))
      } else return (BitmapIndexed_14(bitmap2_299))(((mapIx_34(f_287(depth_288+1)))(ix_300))(t_289.$1))
    } else error("pattern match fail",t_289)
  };
  return (f_287(0))(t_285)
};
const mergeTrie_71 = local$instance$Hashable$1 => local$instance$Eq$0 => a_359 => b_360 => ((foldTrie_67(a_361 => k_362 => v_363 => ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(k_362))(v_363))(a_361)))(a_359))(b_360);
const Tuple3_4 = $_0_91 => $_1_92 => $_2_93 => ({$0:$_0_91,$1:$_1_92,$2:$_2_93});
const State_10 = $_0_111 => ({$0:$_0_111});
const Unit_0 = {};
const sets_57 = s_251 => State_10(__252 => (Pair_3(s_251))(Unit_0));
const tail_45 = slice(1);
const head_44 = getIx(0);
const mergeSet_48 = local$instance$Ord$1 => local$instance$Eq$0 => xs_221 => ys_222 => {
  const $phi$39 = length(xs_221);
  if(0==$phi$39){
    return ys_222
  } else {
    const $phi$41 = length(ys_222);
    if(0==$phi$41){
      return xs_221
    } else {
      const $phi$43 = (($lt(local$instance$Ord$1))(head_44(xs_221)))(head_44(ys_222));
      if($phi$43){
        return (enqueue(head_44(xs_221)))((((mergeSet_48(local$instance$Ord$1))(local$instance$Eq$0))(tail_45(xs_221)))(ys_222))
      } else if(!$phi$43){
        const $phi$45 = (($eq$eq(local$instance$Eq$0))(head_44(xs_221)))(head_44(ys_222));
        if($phi$45){
          return (enqueue(head_44(xs_221)))((((mergeSet_48(local$instance$Ord$1))(local$instance$Eq$0))(tail_45(xs_221)))(tail_45(ys_222)))
        } else if(!$phi$45){
          return (enqueue(head_44(ys_222)))((((mergeSet_48(local$instance$Ord$1))(local$instance$Eq$0))(xs_221))(tail_45(ys_222)))
        } else error("pattern match fail",$phi$45)
      } else error("pattern match fail",$phi$43)
    }
  }
};
const breakableDownAndUp_774 = down_1019 => up_1020 => a_1021 => e_1022 => {
  const go_1023 = (breakableDownAndUp_774(down_1019))(up_1020);
  const gos_1024 = a_1025 => (foldl(ar_1026 => p_1027 => {
    const $phi$47 = (go_1023(fst_26(ar_1026)))(snd_27(p_1027));
    return (Pair_3($phi$47.$0))((push((Pair_3(fst_26(p_1027)))($phi$47.$1)))(snd_27(ar_1026)))
  }))((Pair_3(a_1025))([]));
  const $phi$49 = (down_1019(a_1021))(e_1022);
  if($phi$49.$tag==1){
    return $phi$49.$0
  } else if($phi$49.$tag==0){
    let $phi$50;
    if($phi$49.$0.$1.$tag==3){
      let $phi$68;
      const $phi$69 = (go_1023($phi$49.$0.$0))($phi$49.$0.$1.$2);
      $phi$68 = ((Pair_3($phi$69.$0))(((Lam_729($phi$49.$0.$1.$0))($phi$49.$0.$1.$1))($phi$69.$1)));
      $phi$50 = $phi$68
    } else if($phi$49.$0.$1.$tag==2){
      let $phi$64;
      const $phi$65 = (go_1023($phi$49.$0.$0))($phi$49.$0.$1.$1);
      let $phi$66;
      const $phi$67 = (go_1023($phi$65.$0))($phi$49.$0.$1.$2);
      $phi$66 = ((Pair_3($phi$67.$0))(((App_728($phi$49.$0.$1.$0))($phi$65.$1))($phi$67.$1)));
      $phi$64 = $phi$66;
      $phi$50 = $phi$64
    } else if($phi$49.$0.$1.$tag==4){
      let $phi$60;
      const $phi$61 = (go_1023($phi$49.$0.$0))($phi$49.$0.$1.$1);
      let $phi$62;
      const $phi$63 = (gos_1024($phi$61.$0))($phi$49.$0.$1.$2);
      $phi$62 = ((Pair_3($phi$63.$0))(((Case_730($phi$49.$0.$1.$0))($phi$61.$1))($phi$63.$1)));
      $phi$60 = $phi$62;
      $phi$50 = $phi$60
    } else if($phi$49.$0.$1.$tag==5){
      let $phi$56;
      const $phi$57 = (gos_1024($phi$49.$0.$0))($phi$49.$0.$1.$1);
      let $phi$58;
      const $phi$59 = (go_1023($phi$57.$0))($phi$49.$0.$1.$2);
      $phi$58 = ((Pair_3($phi$59.$0))(((Let_731($phi$49.$0.$1.$0))($phi$57.$1))($phi$59.$1)));
      $phi$56 = $phi$58;
      $phi$50 = $phi$56
    } else if($phi$49.$0.$1.$tag==6){
      const f_1063 = aes_1064 => e_1065 => {
        const $phi$53 = (go_1023(aes_1064.$0))(e_1065);
        return (Pair_3($phi$53.$0))((push($phi$53.$1))(aes_1064.$1))
      };
      let $phi$54;
      const $phi$55 = ((foldl(f_1063))((Pair_3(a_1021))([])))($phi$49.$0.$1.$2);
      $phi$54 = ((Pair_3($phi$55.$0))(((New_732($phi$49.$0.$1.$0))($phi$49.$0.$1.$1))($phi$55.$1)));
      $phi$50 = $phi$54
    } else $phi$50 = ((Pair_3($phi$49.$0.$0))($phi$49.$0.$1));
    const ae_1033 = $phi$50;
    return (up_1020(ae_1033.$0))(ae_1033.$1)
  } else error("pattern match fail",$phi$49)
};
const exists_36 = f_193 => xs_194 => ((foldl(r_195 => x_196 => (f_193(x_196))||r_195))(false))(xs_194);
const debug2_83 = p_394 => x_395 => snd_27((Pair_3(debug(p_394)))(x_395));
const isJust_25 = m_140 => {
  if(m_140.$tag==0){
    return true
  } else if(m_140.$tag==1){
    return false
  } else error("pattern match fail",m_140)
};
const $class$Applicative = $_0 => $_1 => ({$0:$_0,$1:$_1});
const pure = x_$class$Applicative => x_$class$Applicative.$0;
const $lt$mul$gt = x_$class$Applicative => x_$class$Applicative.$1;
const Success_5980 = $_0_5995 => $_1_5996 => ({$0:$_0_5995,$1:$_1_5996,$tag:0});
const Parser_5982 = $_0_5998 => ({$0:$_0_5998});
const Error_5981 = $_0_5997 => ({$0:$_0_5997,$tag:1});
const $instance_6052 = ($class$Applicative(x_6040 => Parser_5982(Success_5980(x_6040))))(pf_6041 => pa_6042 => Parser_5982(i_6045 => {
  const $phi$77 = pf_6041.$0(i_6045);
  if($phi$77.$tag==1){
    return Error_5981($phi$77.$0)
  } else if($phi$77.$tag==0){
    const $phi$79 = pa_6042.$0($phi$77.$1);
    if($phi$79.$tag==1){
      return Error_5981($phi$79.$0)
    } else if($phi$79.$tag==0){
      return (Success_5980($phi$77.$0($phi$79.$0)))($phi$79.$1)
    } else error("pattern match fail",$phi$79)
  } else error("pattern match fail",$phi$77)
}));
const $class$Alternative = $_0 => $_1 => ({$0:$_0,$1:$_1});
const $lt$pip$gt = x_$class$Alternative => x_$class$Alternative.$1;
const $instance_6062 = ($class$Alternative(Parser_5982(__6053 => Error_5981("parser failure"))))(pa_6054 => pb_6055 => Parser_5982(i_6058 => {
  const $phi$84 = pa_6054.$0(i_6058);
  if($phi$84.$tag==1){
    return pb_6055.$0(i_6058)
  } else if($phi$84.$tag==0){
    return (Success_5980($phi$84.$0))($phi$84.$1)
  } else error("pattern match fail",$phi$84)
}));
const Token_6174 = $_0_6200 => $_1_6201 => $_2_6202 => $_3_6203 => ({$0:$_0_6200,$1:$_1_6201,$2:$_2_6202,$3:$_3_6203});
const LexerState_6166 = $_0_6196 => $_1_6197 => $_2_6198 => $_3_6199 => ({$0:$_0_6196,$1:$_1_6197,$2:$_2_6198,$3:$_3_6199});
const mkTok_6175 = t_6204 => {
  const parse_6205 = i_6206 => (Success_5980(r_6211 => (((Token_6174(t_6204))(r_6211))(i_6206.$2))(i_6206.$3)))(i_6206);
  return Parser_5982(parse_6205)
};
const parseChar_6178 = p_6217 => {
  const parse_6218 = s_6219 => {
    const $phi$88 = (($lt($instance_411))(s_6219.$1))(length(s_6219.$0));
    if(!$phi$88){
      return Error_5981("no more input available")
    } else if($phi$88){
      const $phi$90 = p_6217((getChar(s_6219.$1))(s_6219.$0));
      if(!$phi$90){
        return Error_5981("parser failed")
      } else if($phi$90){
        const $phi$92 = (getChar(s_6219.$1))(s_6219.$0);
        if("\n"==$phi$92){
          return (Success_5980((getChar(s_6219.$1))(s_6219.$0)))((((LexerState_6166(s_6219.$0))(s_6219.$1+1))(s_6219.$2+1))(0))
        } else return (Success_5980((getChar(s_6219.$1))(s_6219.$0)))((((LexerState_6166(s_6219.$0))(s_6219.$1+1))(s_6219.$2))(s_6219.$3+1))
      } else error("pattern match fail",$phi$90)
    } else error("pattern match fail",$phi$88)
  };
  return Parser_5982(parse_6218)
};
const containsChar_35 = x_189 => xs_190 => {
  const f_191 = i_192 => {
    const $phi$94 = (($lt($instance_411))(i_192))(length(xs_190));
    if(!$phi$94){
      return false
    } else if($phi$94){
      const $phi$96 = (($eq$eq($instance_410))((getChar(i_192))(xs_190)))(x_189);
      if($phi$96){
        return true
      } else if(!$phi$96){
        return f_191(i_192+1)
      } else error("pattern match fail",$phi$96)
    } else error("pattern match fail",$phi$94)
  };
  return f_191(0)
};
const charP_6180 = cs_6226 => parseChar_6178(c_6227 => (containsChar_35(c_6227))(cs_6226));
const applyParser_5983 = p_5999 => i_6000 => p_5999.$0(i_6000);
const many_5986 = p_6010 => {
  const manyIterate_6011 = s_6012 => {
    const r_6013 = ((iterate(Left_8((Success_5980([]))(s_6012))))(r_6014 => {
      if(r_6014.$tag==0){
        return false
      } else if(r_6014.$tag==1){
        return true
      } else error("pattern match fail",r_6014)
    }))(rs_6017 => {
      if((rs_6017.$tag==0)&&(rs_6017.$0.$tag==0)){
        const $phi$101 = (applyParser_5983(p_6010))(rs_6017.$0.$1);
        if($phi$101.$tag==0){
          return Left_8((Success_5980((push($phi$101.$0))(rs_6017.$0.$0)))($phi$101.$1))
        } else if($phi$101.$tag==1){
          return Right_9((Success_5980(rs_6017.$0.$0))(rs_6017.$0.$1))
        } else error("pattern match fail",$phi$101)
      } else error("pattern match fail",rs_6017)
    });
    if(r_6013.$tag==1){
      return r_6013.$0
    } else if(r_6013.$tag==0){
      return error("manyIterate should never return a Left")
    } else error("pattern match fail",r_6013)
  };
  return Parser_5982(manyIterate_6011)
};
const some_5987 = p_6025 => (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(enqueue)))(p_6025)))(many_5986(p_6025));
const concatStr_6176 = (foldl(cs_6212 => c_6213 => cs_6212+c_6213))("");
const someStr_6183 = p_6231 => (($lt$mul$gt($instance_6052))((pure($instance_6052))(concatStr_6176)))(some_5987(p_6231));
const intP_6187 = someStr_6183(charP_6180("0123456789"));
const NumTok_6169 = {$tag:2};
const numP_6188 = (($lt$mul$gt($instance_6052))(mkTok_6175(NumTok_6169)))((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))($concat)))(intP_6187)))((($lt$pip$gt($instance_6062))((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))($concat)))(charP_6180("."))))(intP_6187)))((pure($instance_6052))(""))));
const runState_58 = s_253 => m_254 => m_254.$0(s_253);
const evalState_59 = s_256 => m_257 => snd_27((runState_58(s_256))(m_257));
const remove_66 = local$instance$Hashable$1 => local$instance$Eq$0 => k_307 => t_308 => {
  const hash_309 = (hashCode(local$instance$Hashable$1))(k_307);
  const f_310 = depth_311 => t_312 => {
    if(t_312.$tag==0){
      return Empty_11
    } else if(t_312.$tag==1){
      const $phi$117 = (($eq$eq(local$instance$Eq$0))(t_312.$0))(k_307);
      if($phi$117){
        return Empty_11
      } else if(!$phi$117){
        return t_312
      } else error("pattern match fail",$phi$117)
    } else if(t_312.$tag==2){
      const entries2_316 = (filter(e_317 => (($div$eq_17(local$instance$Eq$0))(fst_26(e_317)))(k_307)))(t_312.$0);
      const $phi$113 = length(entries2_316);
      if(0==$phi$113){
        return Empty_11
      } else if(1==$phi$113){
        const $phi$115 = (getIx(0))(entries2_316);
        return (Leaf_12($phi$115.$0))($phi$115.$1)
      } else return Collision_13(entries2_316)
    } else if(t_312.$tag==3){
      const m_323 = (hamtMask_61(depth_311))(hash_309);
      const ix_324 = (hamtIndex_62(t_312.$0))(m_323);
      const $phi$106 = m_323&t_312.$0;
      if(0==$phi$106){
        return t_312
      } else {
        const $phi$108 = (f_310(depth_311+1))((getIx(ix_324))(t_312.$1));
        if($phi$108.$tag==0){
          const bitmap2_326 = (bitNot(m_323))&t_312.$0;
          const $phi$110 = length(t_312.$1);
          if(1==$phi$110){
            return Empty_11
          } else if(2==$phi$110){
            const e_327 = (getIx(1&(bitNot(ix_324))))(t_312.$1);
            if(e_327.$tag==1){
              return e_327
            } else return (BitmapIndexed_14(bitmap2_326))([e_327])
          } else return (BitmapIndexed_14(bitmap2_326))(((arrDel(ix_324))(1))(t_312.$1))
        } else return (BitmapIndexed_14(t_312.$0))(((setIx(ix_324))($phi$108))(t_312.$1))
      }
    } else error("pattern match fail",t_312)
  };
  return (f_310(0))(t_308)
};
const setDiff_81 = local$instance$Hashable$1 => local$instance$Eq$0 => a_383 => b_384 => ((foldTrie_67(r_385 => k_386 => __387 => (((remove_66(local$instance$Hashable$1))(local$instance$Eq$0))(k_386))(r_385)))(a_383))(b_384);
const PVar_735 = $_0_812 => $_1_813 => ({$0:$_0_812,$1:$_1_813,$tag:0});
const either_28 = f_148 => g_149 => e_150 => {
  if(e_150.$tag==0){
    return f_148(e_150.$0)
  } else if(e_150.$tag==1){
    return g_149(e_150.$0)
  } else error("pattern match fail",e_150)
};
const $instance_453 = ($class$Applicative(a_442 => State_10(s_443 => (Pair_3(s_443))(a_442))))(f_444 => a_445 => State_10(s_448 => {
  const $phi$122 = f_444.$0(s_448);
  const $phi$124 = a_445.$0($phi$122.$0);
  return (Pair_3($phi$124.$0))($phi$122.$1($phi$124.$1))
}));
const $instance_461 = ($class$Monad(pure($instance_453)))(a_454 => f_455 => State_10(s_457 => {
  const $phi$127 = a_454.$0(s_457);
  const $phi$129 = f_455($phi$127.$1);
  return $phi$129.$0($phi$127.$0)
}));
const gets_56 = State_10(s_250 => (Pair_3(s_250))(s_250));
const CompilerState_1473 = $_0_1483 => $_1_1484 => $_2_1485 => ({$0:$_0_1483,$1:$_1_1484,$2:$_2_1485});
const getUid_1476 = (($gt$gt$eq($instance_461))(gets_56))(s_1495 => (ret($instance_461))(s_1495.$1));
const PData_737 = $_0_816 => $_1_817 => $_2_818 => ({$0:$_0_816,$1:$_1_817,$2:$_2_818,$tag:2});
const zipWithIndex2_39 = n_206 => xs_207 => {
  const $phi$132 = length(xs_207);
  if(0==$phi$132){
    return []
  } else return (enqueue((Pair_3(n_206))(head_44(xs_207))))((zipWithIndex2_39(n_206+1))(tail_45(xs_207)))
};
const zipWithIndex_40 = zipWithIndex2_39(0);
const uniq_49 = local$instance$Eq$0 => xs_225 => {
  const $phi$134 = (($lt($instance_411))(length(xs_225)))(2);
  if($phi$134){
    return xs_225
  } else if(!$phi$134){
    const $phi$136 = (($eq$eq(local$instance$Eq$0))((getIx(0))(xs_225)))((getIx(1))(xs_225));
    if(!$phi$136){
      return (enqueue(head_44(xs_225)))((uniq_49(local$instance$Eq$0))(tail_45(xs_225)))
    } else if($phi$136){
      return (uniq_49(local$instance$Eq$0))(tail_45(xs_225))
    } else error("pattern match fail",$phi$136)
  } else error("pattern match fail",$phi$134)
};
const contains_32 = local$instance$Eq$0 => x_178 => xs_179 => {
  const f_180 = i_181 => {
    const $phi$138 = (($lt($instance_411))(i_181))(length(xs_179));
    if(!$phi$138){
      return false
    } else if($phi$138){
      const $phi$140 = (($eq$eq(local$instance$Eq$0))(x_178))((getIx(i_181))(xs_179));
      if($phi$140){
        return true
      } else if(!$phi$140){
        return f_180(i_181+1)
      } else error("pattern match fail",$phi$140)
    } else error("pattern match fail",$phi$138)
  };
  return f_180(0)
};
const dfs_567 = local$instance$Eq$1 => local$instance$Hashable$0 => g_571 => visited_572 => v_573 => {
  const visit_574 = r_575 => e_576 => {
    const $phi$142 = (((contains_32(local$instance$Eq$1))(e_576))(r_575))||(((contains_32(local$instance$Eq$1))(e_576))(visited_572));
    if($phi$142){
      return r_575
    } else if(!$phi$142){
      return (concat(((((dfs_567(local$instance$Eq$1))(local$instance$Hashable$0))(g_571))((push(v_573))((concat(r_575))(visited_572))))(e_576)))(r_575)
    } else error("pattern match fail",$phi$142)
  };
  const $phi$144 = (((lookup_63(local$instance$Hashable$0))(local$instance$Eq$1))(v_573))(g_571);
  if($phi$144.$tag==0){
    return ($_16(enqueue(v_573)))(((foldr(visit_574))([]))($phi$144.$0))
  } else if($phi$144.$tag==1){
    return []
  } else error("pattern match fail",$phi$144)
};
const fullDfs_568 = local$instance$Eq$1 => local$instance$Hashable$0 => g_578 => {
  const visit_579 = result_580 => v_581 => __582 => {
    const $phi$146 = ((contains_32(local$instance$Eq$1))(v_581))(result_580);
    if($phi$146){
      return result_580
    } else if(!$phi$146){
      return (concat(((((dfs_567(local$instance$Eq$1))(local$instance$Hashable$0))(g_578))(result_580))(v_581)))(result_580)
    } else error("pattern match fail",$phi$146)
  };
  return ((foldTrie_67(visit_579))([]))(g_578)
};
const scc_569 = local$instance$Hashable$1 => local$instance$Eq$0 => g_583 => {
  const invertEdge_588 = local$instance$Hashable$3 => local$instance$Eq$2 => v_590 => ig_591 => e_592 => {
    const $phi$148 = (((lookup_63(local$instance$Hashable$3))(local$instance$Eq$2))(e_592))(ig_591);
    if($phi$148.$tag==0){
      return ((((insert_64(local$instance$Hashable$3))(local$instance$Eq$2))(e_592))((push(v_590))($phi$148.$0)))(ig_591)
    } else if($phi$148.$tag==1){
      return ((((insert_64(local$instance$Hashable$3))(local$instance$Eq$2))(e_592))([v_590]))(ig_591)
    } else error("pattern match fail",$phi$148)
  };
  const invert_589 = local$instance$Hashable$5 => local$instance$Eq$4 => ig_594 => v_595 => es_596 => {
    let $phi$149;
    const $phi$150 = (((lookup_63(local$instance$Hashable$5))(local$instance$Eq$4))(v_595))(ig_594);
    if($phi$150.$tag==0){
      $phi$149 = ig_594
    } else if($phi$150.$tag==1){
      $phi$149 = (((((insert_64(local$instance$Hashable$5))(local$instance$Eq$4))(v_595))([]))(ig_594))
    } else error("pattern match fail",$phi$150);
    const ig2_597 = $phi$149;
    return ((foldl(((invertEdge_588(local$instance$Hashable$5))(local$instance$Eq$4))(v_595)))(ig2_597))(es_596)
  };
  const invertedG_584 = ((foldTrie_67((invert_589(local$instance$Hashable$1))(local$instance$Eq$0)))(Empty_11))(g_583);
  const assembleCc_585 = local$instance$Eq$7 => local$instance$Hashable$6 => gs_599 => v_600 => {
    const $phi$153 = (exists_36((contains_32(local$instance$Eq$7))(v_600)))(gs_599.$1);
    if($phi$153){
      return (Pair_3(gs_599.$0))(gs_599.$1)
    } else if(!$phi$153){
      const cc_603 = ((((dfs_567(local$instance$Eq$7))(local$instance$Hashable$6))(gs_599.$0))([]))(v_600);
      const ig2_604 = ((foldl(g_605 => v_606 => (((remove_66(local$instance$Hashable$6))(local$instance$Eq$7))(v_606))(g_605)))(gs_599.$0))(cc_603);
      return (Pair_3(ig2_604))((push(cc_603))(gs_599.$1))
    } else error("pattern match fail",$phi$153)
  };
  const firstDfs_586 = ((fullDfs_568(local$instance$Eq$0))(local$instance$Hashable$1))(g_583);
  const ccs_587 = snd_27(((foldl((assembleCc_585(local$instance$Eq$0))(local$instance$Hashable$1)))((Pair_3(invertedG_584))([])))(firstDfs_586));
  return ccs_587
};
const reverse_50 = (foldl(xs_226 => x_227 => (enqueue(x_227))(xs_226)))([]);
const fromJust_24 = m_138 => {
  if(m_138.$tag==0){
    return m_138.$0
  } else if(m_138.$tag==1){
    return error("expected Just but got Nothing")
  } else error("pattern match fail",m_138)
};
const $instance_412 = $class$Ord(jsLt);
const sccSorted_570 = local$instance$Hashable$1 => local$instance$Eq$0 => g_607 => {
  const ccs_608 = ((scc_569(local$instance$Hashable$1))(local$instance$Eq$0))(g_607);
  const topSort_609 = ccs_611 => {
    const f_616 = local$instance$Hashable$3 => local$instance$Eq$2 => r_617 => icc_618 => ((foldl(r_621 => c_622 => ((((insert_64(local$instance$Hashable$3))(local$instance$Eq$2))(c_622))(intToString(icc_618.$0)))(r_621)))(r_617))(icc_618.$1);
    const g2g_612 = ((foldl((f_616(local$instance$Hashable$1))(local$instance$Eq$0)))(Empty_11))(zipWithIndex_40(ccs_611));
    const addGraph_613 = r_623 => v_624 => es_625 => {
      const rv_626 = ($_16(fromJust_24))((((lookup_63(local$instance$Hashable$1))(local$instance$Eq$0))(v_624))(g2g_612));
      const res_627 = (uniq_49($instance_410))(sort((filter(re_628 => (($div$eq_17($instance_410))(re_628))(rv_626)))((map(e_629 => ($_16(fromJust_24))((((lookup_63(local$instance$Hashable$1))(local$instance$Eq$0))(e_629))(g2g_612))))(es_625))));
      const $phi$157 = (((lookup_63($instance_465))($instance_410))(rv_626))(r_623);
      if($phi$157.$tag==1){
        return ((((insert_64($instance_465))($instance_410))(rv_626))(res_627))(r_623)
      } else if($phi$157.$tag==0){
        return ((((insert_64($instance_465))($instance_410))(rv_626))((((mergeSet_48($instance_412))($instance_410))(res_627))($phi$157.$0)))(r_623)
      } else error("pattern match fail",$phi$157)
    };
    const cg_614 = ((foldTrie_67(addGraph_613))(Empty_11))(g_607);
    const ord_615 = ((fullDfs_568($instance_410))($instance_465))(cg_614);
    return reverse_50((map(i_631 => (getIx(unsafeStringToInt(i_631)))(ccs_611)))(ord_615))
  };
  const result_610 = topSort_609(ccs_608);
  return result_610
};
const PConst_736 = $_0_814 => $_1_815 => ({$0:$_0_814,$1:$_1_815,$tag:1});
const freeVars_2026 = e_2620 => {
  const freeVarsInPData_2622 = p_2628 => {
    if(p_2628.$tag==2){
      return ((foldl((mergeSet_48($instance_412))($instance_410)))([p_2628.$1]))((map(freeVarsInPData_2622))(p_2628.$2))
    } else return []
  };
  const namesInPat_2623 = p_2633 => {
    if(p_2633.$tag==0){
      return [p_2633.$1]
    } else if(p_2633.$tag==1){
      return []
    } else if(p_2633.$tag==2){
      return ((foldl((mergeSet_48($instance_412))($instance_410)))([]))((map(namesInPat_2623))(p_2633.$2))
    } else error("pattern match fail",p_2633)
  };
  const freeVarsInPat_2621 = p_2624 => (((mergeSet_48($instance_412))($instance_410))((filter(v_2627 => not_30(((contains_32($instance_410))(v_2627))(namesInPat_2623(p_2624.$0)))))(freeVars_2026(p_2624.$1))))(freeVarsInPData_2622(p_2624.$0));
  if(e_2620.$tag==0){
    return [e_2620.$1]
  } else if(e_2620.$tag==1){
    return []
  } else if(e_2620.$tag==2){
    return (((mergeSet_48($instance_412))($instance_410))(freeVars_2026(e_2620.$1)))(freeVars_2026(e_2620.$2))
  } else if(e_2620.$tag==3){
    return (filter(v_2651 => (($div$eq_17($instance_410))(v_2651))(e_2620.$1)))(freeVars_2026(e_2620.$2))
  } else if(e_2620.$tag==4){
    return ((foldl((mergeSet_48($instance_412))($instance_410)))(freeVars_2026(e_2620.$1)))((map(freeVarsInPat_2621))(e_2620.$2))
  } else if(e_2620.$tag==5){
    return (filter(v_2658 => not_30(((contains_32($instance_410))(v_2658))((map(fst_26))(e_2620.$1)))))(((foldl((mergeSet_48($instance_412))($instance_410)))(freeVars_2026(e_2620.$2)))((map(d_2659 => freeVars_2026(snd_27(d_2659))))(e_2620.$1)))
  } else if(e_2620.$tag==6){
    return ((foldl((mergeSet_48($instance_412))($instance_410)))([]))((map(freeVars_2026))(e_2620.$2))
  } else error("pattern match fail",e_2620)
};
const bindingsScc_2020 = bs_2551 => {
  const ns_2552 = (map(fst_26))(bs_2551);
  const g_2553 = ((foldl(g_2555 => d_2556 => ((((insert_64($instance_465))($instance_410))(d_2556.$0))((filter(v_2559 => (((contains_32($instance_410))(v_2559))(ns_2552))&&((($div$eq_17($instance_410))(v_2559))(d_2556.$0))))(freeVars_2026(d_2556.$1))))(g_2555)))(Empty_11))(bs_2551);
  const ccs_2554 = ((sccSorted_570($instance_465))($instance_410))(g_2553);
  return (map(cc_2560 => (filter(b_2561 => ((contains_32($instance_410))(fst_26(b_2561)))(cc_2560)))(bs_2551)))(ccs_2554)
};
const optBindings_3454 = env_3484 => bs_3485 => {
  const optCc_3487 = env_3489 => bs_3490 => {
    const f_3491 = local$instance$Hashable$1 => local$instance$Eq$0 => oe_3492 => b_3493 => {
      const e2_3498 = (optExpr_3455(env_3489))(b_3493.$1);
      if(e2_3498.$tag==0){
        return (Pair_3(oe_3492.$0))(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(b_3493.$0))(e2_3498))(oe_3492.$1))
      } else if(e2_3498.$tag==1){
        return (Pair_3(oe_3492.$0))(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(b_3493.$0))(e2_3498))(oe_3492.$1))
      } else return (Pair_3((push((Pair_3(b_3493.$0))(e2_3498)))(oe_3492.$0)))(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(b_3493.$0))(e2_3498))(oe_3492.$1))
    };
    return ((foldl((f_3491($instance_465))($instance_410)))((Pair_3([]))(env_3489)))(bs_3490)
  };
  const f_3488 = oe_3504 => bs_3505 => {
    const be_3508 = (optCc_3487(oe_3504.$1))(bs_3505);
    return (Pair_3((concat(oe_3504.$0))(fst_26(be_3508))))(snd_27(be_3508))
  };
  const scc_3486 = bindingsScc_2020(bs_3485);
  return ((foldl(f_3488))((Pair_3([]))(env_3484)))(scc_3486)
};
const optExpr_3455 = env_3509 => e_3510 => {
  if(e_3510.$tag==0){
    const $phi$173 = (((lookup_63($instance_465))($instance_410))(e_3510.$1))(env_3509);
    if(($phi$173.$tag==0)&&($phi$173.$0.$tag==0)){
      return (Var_726(e_3510.$0))($phi$173.$0.$1)
    } else if(($phi$173.$tag==0)&&($phi$173.$0.$tag==1)){
      return (Const_727(e_3510.$0))($phi$173.$0.$1)
    } else return e_3510
  } else if(e_3510.$tag==2){
    return ((App_728(e_3510.$0))((optExpr_3455(env_3509))(e_3510.$1)))((optExpr_3455(env_3509))(e_3510.$2))
  } else if(e_3510.$tag==3){
    return ((Lam_729(e_3510.$0))(e_3510.$1))((optExpr_3455(env_3509))(e_3510.$2))
  } else if(e_3510.$tag==5){
    const $phi$171 = (optBindings_3454(env_3509))(e_3510.$1);
    return ((Let_731(e_3510.$0))($phi$171.$0))((optExpr_3455($phi$171.$1))(e_3510.$2))
  } else if(e_3510.$tag==4){
    return ((Case_730(e_3510.$0))((optExpr_3455(env_3509))(e_3510.$1)))((map(optPat_3456(env_3509)))(e_3510.$2))
  } else if(e_3510.$tag==1){
    return e_3510
  } else if(e_3510.$tag==6){
    const $phi$169 = (((lookup_63($instance_465))($instance_410))(e_3510.$1))(env_3509);
    if(($phi$169.$tag==0)&&($phi$169.$0.$tag==0)){
      return ((New_732(e_3510.$0))($phi$169.$0.$1))((map(optExpr_3455(env_3509)))(e_3510.$2))
    } else return ((New_732(e_3510.$0))(e_3510.$1))((map(optExpr_3455(env_3509)))(e_3510.$2))
  } else error("pattern match fail",e_3510)
};
const optPat_3456 = env_3540 => pe_3541 => {
  const f_3544 = p_3545 => {
    if(p_3545.$tag==2){
      const $phi$177 = (((lookup_63($instance_465))($instance_410))(p_3545.$1))(env_3540);
      if(($phi$177.$tag==0)&&($phi$177.$0.$tag==0)){
        return ((PData_737(p_3545.$0))($phi$177.$0.$1))((map(f_3544))(p_3545.$2))
      } else return ((PData_737(p_3545.$0))(p_3545.$1))((map(f_3544))(p_3545.$2))
    } else return p_3545
  };
  return (Pair_3(f_3544(pe_3541.$0)))((optExpr_3455(env_3540))(pe_3541.$1))
};
const inline_3453 = enable_3473 => m_3474 => (($gt$gt$eq($instance_461))(getUid_1476))(uid_3475 => {
  let $phi$179;
  if(enable_3473){
    $phi$179 = (fst_26((optBindings_3454(Empty_11))(m_3474.$6)))
  } else if(!enable_3473){
    $phi$179 = m_3474.$6
  } else error("pattern match fail",enable_3473);
  const obs_3483 = $phi$179;
  return (ret($instance_461))(((((((Module_738(m_3474.$0))(m_3474.$1))(m_3474.$2))(m_3474.$3))(m_3474.$4))(m_3474.$5))(obs_3483))
});
const $pip$gt_5984 = local$instance$Applicative$0 => a_6002 => b_6003 => (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(__6004 => b_6005 => b_6005)))(a_6002)))(b_6003);
const ParserState_6411 = $_0_6480 => $_1_6481 => $_2_6482 => $_3_6483 => $_4_6484 => ({$0:$_0_6480,$1:$_1_6481,$2:$_2_6482,$3:$_3_6483,$4:$_4_6484});
const parseToken_6415 = f_6505 => {
  const parse_6506 = s_6507 => {
    const $phi$182 = (($lt($instance_411))(s_6507.$1))(length(s_6507.$0));
    if(!$phi$182){
      return Error_5981("run out of tokens")
    } else if($phi$182){
      const $phi$184 = (getIx(s_6507.$1))(s_6507.$0);
      const $phi$186 = (($lt($instance_411))($phi$184.$3))(s_6507.$3);
      if($phi$186){
        return Error_5981("token not indented sufficiently")
      } else if(!$phi$186){
        const $phi$188 = f_6505((getIx(s_6507.$1))(s_6507.$0));
        if($phi$188.$tag==1){
          return Error_5981("parser fun failed")
        } else if($phi$188.$tag==0){
          const $phi$190 = (($lt($instance_411))(s_6507.$1+1))(length(s_6507.$0));
          if(!$phi$190){
            return (Success_5980($phi$188.$0))(((((ParserState_6411(s_6507.$0))(s_6507.$1+1))(s_6507.$2))(s_6507.$3))(s_6507.$4))
          } else if($phi$190){
            const $phi$192 = (getIx(s_6507.$1+1))(s_6507.$0);
            const $phi$194 = (($gt_18($instance_411))($phi$192.$2))($phi$184.$2);
            if(!$phi$194){
              return (Success_5980($phi$188.$0))(((((ParserState_6411(s_6507.$0))(s_6507.$1+1))(s_6507.$2))(s_6507.$3))(s_6507.$4))
            } else if($phi$194){
              return (Success_5980($phi$188.$0))(((((ParserState_6411(s_6507.$0))(s_6507.$1+1))($phi$192.$3))(s_6507.$3))(s_6507.$4))
            } else error("pattern match fail",$phi$194)
          } else error("pattern match fail",$phi$190)
        } else error("pattern match fail",$phi$188)
      } else error("pattern match fail",$phi$186)
    } else error("pattern match fail",$phi$182)
  };
  return Parser_5982(parse_6506)
};
const IdTok_6172 = {$tag:5};
const reservedP_6423 = s_6579 => parseToken_6415(t_6580 => {
  if(t_6580.$0.$tag==5){
    const $phi$197 = (($eq$eq($instance_410))(t_6580.$1))(s_6579);
    if($phi$197){
      return Just_1(s_6579)
    } else if(!$phi$197){
      return Nothing_2
    } else error("pattern match fail",$phi$197)
  } else return Nothing_2
});
const reserved_6419 = ["as","class","where","instance","let","in","from","import","case","of","data"];
const nonReservedP_6424 = parseToken_6415(t_6585 => {
  if(t_6585.$0.$tag==5){
    const $phi$200 = ((contains_32($instance_410))(t_6585.$1))(reserved_6419);
    if($phi$200){
      return Nothing_2
    } else if(!$phi$200){
      return Just_1(t_6585.$1)
    } else error("pattern match fail",$phi$200)
  } else return Nothing_2
});
const importAliasP_6467 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(Pair_3)))(nonReservedP_6424)))((($pip$gt_5984($instance_6052))(reservedP_6423("as")))(nonReservedP_6424));
const TUnknown_752 = {$tag:7};
const TConst_745 = $_0_847 => $_1_848 => ({$0:$_0_847,$1:$_1_848,$tag:0});
const assert_87 = s_407 => b_408 => {
  if(b_408){
    return true
  } else if(!b_408){
    return error(s_407)
  } else error("pattern match fail",b_408)
};
const Identity_15 = $_0_117 => ({$0:$_0_117});
const setContains_78 = local$instance$Hashable$1 => local$instance$Eq$0 => a_378 => s_379 => isJust_25((((lookup_63(local$instance$Hashable$1))(local$instance$Eq$0))(a_378))(s_379));
const mapJust_43 = f_213 => xs_214 => {
  const g_215 = r_216 => x_217 => {
    const $phi$203 = f_213(x_217);
    if($phi$203.$tag==1){
      return r_216
    } else if($phi$203.$tag==0){
      return (push($phi$203.$0))(r_216)
    } else error("pattern match fail",$phi$203)
  };
  return ((foldl(g_215))([]))(xs_214)
};
const JSBinOp_4815 = $_0_4843 => $_1_4844 => $_2_4845 => ({$0:$_0_4843,$1:$_1_4844,$2:$_2_4845,$tag:3});
const JSBool_4821 = $_0_4855 => ({$0:$_0_4855,$tag:9});
const JSUnOp_4814 = $_0_4841 => $_1_4842 => ({$0:$_0_4841,$1:$_1_4842,$tag:2});
const JSString_4820 = $_0_4854 => ({$0:$_0_4854,$tag:8});
const JSNum_4819 = $_0_4853 => ({$0:$_0_4853,$tag:7});
const JSIndex_4813 = $_0_4839 => $_1_4840 => ({$0:$_0_4839,$1:$_1_4840,$tag:1});
const JSRef_4812 = $_0_4838 => ({$0:$_0_4838,$tag:0});
const JSIf_4837 = $_0_4875 => $_1_4876 => $_2_4877 => ({$0:$_0_4875,$1:$_1_4876,$2:$_2_4877,$tag:8});
const JSAssign_4836 = $_0_4873 => $_1_4874 => ({$0:$_0_4873,$1:$_1_4874,$tag:7});
const JSConst_4832 = $_0_4867 => $_1_4868 => ({$0:$_0_4867,$1:$_1_4868,$tag:3});
const JSReturn_4830 = $_0_4864 => ({$0:$_0_4864,$tag:1});
const JSObject_4822 = $_0_4856 => ({$0:$_0_4856,$tag:10});
const JSLet_4833 = $_0_4869 => $_1_4870 => ({$0:$_0_4869,$1:$_1_4870,$tag:4});
const JSFun_4817 = $_0_4848 => $_1_4849 => ({$0:$_0_4848,$1:$_1_4849,$tag:5});
const JSExpr_4829 = $_0_4863 => ({$0:$_0_4863,$tag:0});
const JSCall_4816 = $_0_4846 => $_1_4847 => ({$0:$_0_4846,$1:$_1_4847,$tag:4});
const JSArray_4823 = $_0_4857 => ({$0:$_0_4857,$tag:11});
const last_46 = l_219 => (getIx((length(l_219))-1))(l_219);
const safeLast_5450 = xs_5750 => {
  const $phi$205 = length(xs_5750);
  if(0==$phi$205){
    return Nothing_2
  } else return Just_1(last_46(xs_5750))
};
const JSUndefined_4825 = {$tag:13};
const JSTernary_4818 = $_0_4850 => $_1_4851 => $_2_4852 => ({$0:$_0_4850,$1:$_1_4851,$2:$_2_4852,$tag:6});
const JSNull_4824 = {$tag:12};
const JSNew_4827 = $_0_4860 => $_1_4861 => ({$0:$_0_4860,$1:$_1_4861,$tag:15});
const JSInstanceOf_4826 = $_0_4858 => $_1_4859 => ({$0:$_0_4858,$1:$_1_4859,$tag:14});
const init_47 = l_220 => ((slice2(0))((length(l_220))-1))(l_220);
const concatMap_42 = f_211 => a_212 => ((foldl(concat))([]))((map(f_211))(a_212));
const directReturn_5452 = v_5777 => s_5778 => {
  if(s_5778.$tag==4){
    const $phi$212 = (($eq$eq($instance_410))(v_5777))(s_5778.$0);
    if(!$phi$212){
      return [s_5778]
    } else if($phi$212){
      if(s_5778.$1.$tag==1){
        return []
      } else if(s_5778.$1.$tag==0){
        return error("unexpected let assignment")
      } else error("pattern match fail",s_5778.$1)
    } else error("pattern match fail",$phi$212)
  } else if(s_5778.$tag==3){
    const $phi$210 = (($eq$eq($instance_410))(v_5777))(s_5778.$0);
    if(!$phi$210){
      return [s_5778]
    } else if($phi$210){
      return [JSReturn_4830(s_5778.$1)]
    } else error("pattern match fail",$phi$210)
  } else if((s_5778.$tag==7)&&(s_5778.$0.$tag==0)){
    const $phi$208 = (($eq$eq($instance_410))(v_5777))(s_5778.$0.$0);
    if(!$phi$208){
      return [s_5778]
    } else if($phi$208){
      return [JSReturn_4830(s_5778.$1)]
    } else error("pattern match fail",$phi$208)
  } else if(s_5778.$tag==8){
    return [((JSIf_4837(s_5778.$0))((concatMap_42(directReturn_5452(v_5777)))(s_5778.$1)))((concatMap_42(directReturn_5452(v_5777)))(s_5778.$2))]
  } else return [s_5778]
};
const JSVar_4831 = $_0_4865 => $_1_4866 => ({$0:$_0_4865,$1:$_1_4866,$tag:2});
const optExpr_5449 = e_5722 => {
  if(e_5722.$tag==0){
    return e_5722
  } else if(e_5722.$tag==1){
    return (JSIndex_4813(optExpr_5449(e_5722.$0)))(optExpr_5449(e_5722.$1))
  } else if(e_5722.$tag==2){
    return (JSUnOp_4814(e_5722.$0))(optExpr_5449(e_5722.$1))
  } else if(e_5722.$tag==3){
    return ((JSBinOp_4815(e_5722.$0))(optExpr_5449(e_5722.$1)))(optExpr_5449(e_5722.$2))
  } else if(e_5722.$tag==4){
    return (JSCall_4816(optExpr_5449(e_5722.$0)))((map(optExpr_5449))(e_5722.$1))
  } else if(e_5722.$tag==5){
    return (JSFun_4817(e_5722.$0))(optStmts_5451(e_5722.$1))
  } else if(e_5722.$tag==6){
    return ((JSTernary_4818(optExpr_5449(e_5722.$0)))(optExpr_5449(e_5722.$1)))(optExpr_5449(e_5722.$2))
  } else if(e_5722.$tag==7){
    return e_5722
  } else if(e_5722.$tag==8){
    return e_5722
  } else if(e_5722.$tag==9){
    return e_5722
  } else if(e_5722.$tag==12){
    return e_5722
  } else if(e_5722.$tag==13){
    return e_5722
  } else if(e_5722.$tag==10){
    return JSObject_4822((map(kv_5742 => (Pair_3(kv_5742.$0))(optExpr_5449(kv_5742.$1))))(e_5722.$0))
  } else if(e_5722.$tag==11){
    return JSArray_4823((map(optExpr_5449))(e_5722.$0))
  } else if(e_5722.$tag==14){
    return (JSInstanceOf_4826(optExpr_5449(e_5722.$0)))(optExpr_5449(e_5722.$1))
  } else if(e_5722.$tag==15){
    return (JSNew_4827(optExpr_5449(e_5722.$0)))((map(optExpr_5449))(e_5722.$1))
  } else error("pattern match fail",e_5722)
};
const optStmts_5451 = ss_5752 => {
  const hasLet_5754 = v_5769 => {
    const f_5770 = s_5771 => {
      if(s_5771.$tag==4){
        return (($eq$eq($instance_410))(v_5769))(s_5771.$0)
      } else return false
    };
    return (exists_36(f_5770))(ss_5752)
  };
  const f_5753 = s_5755 => {
    if(s_5755.$tag==0){
      return JSExpr_4829(optExpr_5449(s_5755.$0))
    } else if(s_5755.$tag==2){
      return (JSVar_4831(s_5755.$0))(optExpr_5449(s_5755.$1))
    } else if(s_5755.$tag==3){
      return (JSConst_4832(s_5755.$0))(optExpr_5449(s_5755.$1))
    } else if(s_5755.$tag==4){
      return (JSLet_4833(s_5755.$0))(((fmap($instance_416))(optExpr_5449))(s_5755.$1))
    } else if(s_5755.$tag==7){
      return (JSAssign_4836(optExpr_5449(s_5755.$0)))(optExpr_5449(s_5755.$1))
    } else if(s_5755.$tag==8){
      return ((JSIf_4837(optExpr_5449(s_5755.$0)))(optStmts_5451(s_5755.$1)))(optStmts_5451(s_5755.$2))
    } else if(s_5755.$tag==1){
      return JSReturn_4830(optExpr_5449(s_5755.$0))
    } else error("pattern match fail",s_5755)
  };
  const $phi$219 = safeLast_5450(ss_5752);
  if(($phi$219.$tag==0)&&(($phi$219.$0.$tag==1)&&($phi$219.$0.$0.$tag==0))){
    const $phi$221 = hasLet_5754($phi$219.$0.$0.$0);
    if($phi$221){
      return optStmts_5451((concatMap_42(directReturn_5452($phi$219.$0.$0.$0)))(init_47(ss_5752)))
    } else if(!$phi$221){
      return (map(f_5753))(ss_5752)
    } else error("pattern match fail",$phi$221)
  } else return (map(f_5753))(ss_5752)
};
const AnnType_720 = $_0_784 => ({$0:$_0_784,$tag:0});
const getAnnType_760 = ann_882 => {
  const $phi$223 = (((getAnn_757($instance_465))($instance_410))("type"))(ann_882);
  if(($phi$223.$tag==0)&&($phi$223.$0.$tag==0)){
    return $phi$223.$0.$0
  } else if($phi$223.$tag==1){
    return TUnknown_752
  } else error("pattern match fail",$phi$223)
};
const setAnn_758 = local$instance$Hashable$1 => local$instance$Eq$0 => name_873 => val_874 => ann_875 => ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(name_873))(val_874))(ann_875);
const setAnnType_761 = t_884 => ann_885 => ((((setAnn_758($instance_465))($instance_410))("type"))(AnnType_720(t_884)))(ann_885);
const AnnData_723 = $_0_789 => ({$0:$_0_789,$tag:3});
const breakableDown_778 = f_1080 => (breakableDownAndUp_774(f_1080))(Pair_3);
const copyAnn_759 = local$instance$Hashable$1 => local$instance$Eq$0 => names_876 => ann_877 => {
  const f_878 = r_879 => n_880 => {
    const $phi$225 = (((getAnn_757(local$instance$Hashable$1))(local$instance$Eq$0))(n_880))(ann_877);
    if($phi$225.$tag==1){
      return r_879
    } else if($phi$225.$tag==0){
      return ((((setAnn_758(local$instance$Hashable$1))(local$instance$Eq$0))(n_880))($phi$225.$0))(r_879)
    } else error("pattern match fail",$phi$225)
  };
  return ((foldl(f_878))(Empty_11))(names_876)
};
const $instance_434 = $class$Functor(f_430 => e_431 => {
  if(e_431.$tag==0){
    return Left_8(e_431.$0)
  } else if(e_431.$tag==1){
    return Right_9(f_430(e_431.$0))
  } else error("pattern match fail",e_431)
});
const $instance_409 = $class$Eq(jsEq);
const zip_41 = xs_209 => ys_210 => {
  const $phi$228 = ((($eq$eq($instance_409))(length(xs_209)))(0))||((($eq$eq($instance_409))(length(ys_210)))(0));
  if($phi$228){
    return []
  } else if(!$phi$228){
    return (enqueue((Pair_3(head_44(xs_209)))(head_44(ys_210))))((zip_41(tail_45(xs_209)))(tail_45(ys_210)))
  } else error("pattern match fail",$phi$228)
};
const join_38 = xs_201 => s_202 => {
  const $phi$230 = length(xs_201);
  if(0==$phi$230){
    return ""
  } else return (foldl1(a_204 => b_205 => (a_204+s_202)+b_205))(xs_201)
};
const setAdd_75 = local$instance$Hashable$1 => local$instance$Eq$0 => a_372 => s_373 => ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(a_372))(Unit_0))(s_373);
const addRef_1276 = local$instance$Hashable$1 => local$instance$Eq$0 => n_1282 => (($gt$gt$eq($instance_461))(gets_56))(ns_1283 => sets_57((((setAdd_75(local$instance$Hashable$1))(local$instance$Eq$0))(n_1282))(ns_1283)));
const getType_773 = e_1018 => ($_16(getAnnType_760))(annOf_771(e_1018));
const justOr_23 = d_135 => m_136 => {
  if(m_136.$tag==0){
    return m_136.$0
  } else if(m_136.$tag==1){
    return d_135
  } else error("pattern match fail",m_136)
};
const DataCon_741 = $_0_833 => $_1_834 => $_2_835 => ({$0:$_0_833,$1:$_1_834,$2:$_2_835});
const dataConName_768 = dc_947 => dc_947.$1;
const Data_740 = $_0_829 => $_1_830 => $_2_831 => $_3_832 => ({$0:$_0_829,$1:$_1_830,$2:$_2_831,$3:$_3_832});
const dataConNames_769 = d_951 => (map(dataConName_768))(d_951.$3);
const TForall_751 = $_0_859 => $_1_860 => $_2_861 => $_3_862 => ({$0:$_0_859,$1:$_1_860,$2:$_2_861,$3:$_3_862,$tag:6});
const $lt$eq_19 = local$instance$Ord$0 => a_124 => b_125 => not_30((($lt(local$instance$Ord$0))(b_125))(a_124));
const mapFst_85 = f_399 => p_400 => (Pair_3(f_399(p_400.$0)))(p_400.$1);
const AnnTag_724 = {$tag:4};
const S_4335 = $_0_4349 => $_1_4350 => $_2_4351 => ({$0:$_0_4349,$1:$_1_4350,$2:$_2_4351});
const getEnv_4341 = s_4439 => s_4439.$0;
const Tuple5_6 = $_0_98 => $_1_99 => $_2_100 => $_3_101 => $_4_102 => ({$0:$_0_98,$1:$_1_99,$2:$_2_100,$3:$_3_101,$4:$_4_102});
const TSkolem_747 = $_0_851 => $_1_852 => ({$0:$_0_851,$1:$_1_852,$tag:2});
const Subs_1972 = $_0_2034 => $_1_2035 => ({$0:$_0_2034,$1:$_1_2035});
const emptySubs_1976 = (Subs_1972(Empty_11))(Empty_11);
const TCBound_744 = $_0_844 => $_1_845 => $_2_846 => ({$0:$_0_844,$1:$_1_845,$2:$_2_846});
const TVar_746 = $_0_849 => $_1_850 => ({$0:$_0_849,$1:$_1_850,$tag:1});
const TBot_750 = {$tag:5};
const TApp_748 = $_0_853 => $_1_854 => $_2_855 => ({$0:$_0_853,$1:$_1_854,$2:$_2_855,$tag:3});
const printType_1685 = t_1691 => {
  const printParen_1692 = t_1696 => ("("+(printType_1685(t_1696)))+")";
  const printSecondTypeInApp_1695 = t_1719 => {
    if(t_1719.$tag==3){
      return printParen_1692(t_1719)
    } else if(t_1719.$tag==6){
      return printParen_1692(t_1719)
    } else return printType_1685(t_1719)
  };
  const printTypeInFun_1693 = t_1697 => {
    if((t_1697.$tag==3)&&((t_1697.$1.$tag==3)&&((t_1697.$1.$1.$tag==0)&&("->"==t_1697.$1.$1.$1)))){
      return printParen_1692(t_1697)
    } else if(t_1697.$tag==6){
      return printParen_1692(t_1697)
    } else return printType_1685(t_1697)
  };
  const printFirstTypeInApp_1694 = t_1708 => {
    if((t_1708.$tag==3)&&((t_1708.$1.$tag==3)&&((t_1708.$1.$1.$tag==0)&&("->"==t_1708.$1.$1.$1)))){
      return printParen_1692(t_1708)
    } else if(t_1708.$tag==6){
      return printParen_1692(t_1708)
    } else return printType_1685(t_1708)
  };
  if(t_1691.$tag==0){
    return t_1691.$1
  } else if(t_1691.$tag==1){
    return t_1691.$1
  } else if(t_1691.$tag==2){
    return "~"+t_1691.$1
  } else if(t_1691.$tag==5){
    return "~bottom~"
  } else if(t_1691.$tag==7){
    return "?"
  } else if((t_1691.$tag==3)&&((t_1691.$1.$tag==3)&&((t_1691.$1.$1.$tag==0)&&("->"==t_1691.$1.$1.$1)))){
    return ((printTypeInFun_1693(t_1691.$1.$2))+" -> ")+(printType_1685(t_1691.$2))
  } else if(t_1691.$tag==3){
    return ((printFirstTypeInApp_1694(t_1691.$1))+" ")+(printSecondTypeInApp_1695(t_1691.$2))
  } else if(t_1691.$tag==6){
    let $phi$240;
    const $phi$241 = length(t_1691.$2);
    if(0==$phi$241){
      $phi$240 = ""
    } else $phi$240 = (" with "+((intercalate(", "))((map(printTypeBound_1686))(t_1691.$2))));
    const bounds_1746 = $phi$240;
    return ((("forall "+((intercalate(", "))(t_1691.$1)))+bounds_1746)+". ")+(printType_1685(t_1691.$3))
  } else return error("cannot print "+(jsonStringify(t_1691)))
};
const printTypeBound_1686 = b_1749 => (((b_1749.$1+" ")+"(")+(printType_1685(b_1749.$2)))+")";
const TRow_749 = $_0_856 => $_1_857 => $_2_858 => ({$0:$_0_856,$1:$_1_857,$2:$_2_858,$tag:4});
const setRemove_77 = local$instance$Hashable$1 => local$instance$Eq$0 => (remove_66(local$instance$Hashable$1))(local$instance$Eq$0);
const setUnion_79 = local$instance$Hashable$1 => local$instance$Eq$0 => (mergeTrie_71(local$instance$Hashable$1))(local$instance$Eq$0);
const freeTVars_2002 = t_2202 => {
  if(t_2202.$tag==1){
    return (((setAdd_75($instance_465))($instance_410))(t_2202.$1))(Empty_11)
  } else if(t_2202.$tag==5){
    return Empty_11
  } else if(t_2202.$tag==7){
    return Empty_11
  } else if(t_2202.$tag==0){
    return Empty_11
  } else if(t_2202.$tag==2){
    return Empty_11
  } else if(t_2202.$tag==6){
    return ((foldl(s_2213 => v_2214 => (((setRemove_77($instance_465))($instance_410))(v_2214))(s_2213)))(((foldl((setUnion_79($instance_465))($instance_410)))(freeTVars_2002(t_2202.$3)))((map(freeTVarsInBound_2012))(t_2202.$2))))(t_2202.$1)
  } else if(t_2202.$tag==3){
    return (((setUnion_79($instance_465))($instance_410))(freeTVars_2002(t_2202.$1)))(freeTVars_2002(t_2202.$2))
  } else if(t_2202.$tag==4){
    return ((foldl((setUnion_79($instance_465))($instance_410)))(($_16(justOr_23(Empty_11)))(((fmap($instance_416))(freeTVars_2002))(t_2202.$2))))((map(m_2221 => (((setUnion_79($instance_465))($instance_410))(freeTVars_2002(fst_26(m_2221))))(freeTVars_2002(snd_27(m_2221)))))(t_2202.$1))
  } else error("pattern match fail",t_2202)
};
const freeTVarsInBound_2012 = b_2371 => freeTVars_2002(b_2371.$2);
const $instance_425 = ($class$Alternative(Nothing_2))(a_422 => b_423 => {
  if(a_422.$tag==1){
    return b_423
  } else return a_422
});
const getSub_1975 = v_2043 => subs_2044 => (($lt$pip$gt($instance_425))((((lookup_63($instance_465))($instance_410))(v_2043))(subs_2044.$0)))((((lookup_63($instance_465))($instance_410))(v_2043))(subs_2044.$1));
const equivBound_766 = a_897 => b_898 => ((($eq$eq($instance_410))(a_897.$1))(b_898.$1))&&((equivType_767(a_897.$2))(b_898.$2));
const equivType_767 = a_905 => b_906 => {
  if(a_905.$tag==0){
    if(b_906.$tag==0){
      return (($eq$eq($instance_410))(a_905.$1))(b_906.$1)
    } else return false
  } else if(a_905.$tag==1){
    if(b_906.$tag==1){
      return (($eq$eq($instance_410))(a_905.$1))(b_906.$1)
    } else return false
  } else if(a_905.$tag==2){
    if(b_906.$tag==2){
      return (($eq$eq($instance_410))(a_905.$1))(b_906.$1)
    } else return false
  } else if(a_905.$tag==3){
    if(b_906.$tag==3){
      return ((equivType_767(a_905.$1))(b_906.$1))&&((equivType_767(a_905.$2))(b_906.$2))
    } else return false
  } else if(a_905.$tag==5){
    if(b_906.$tag==5){
      return true
    } else return false
  } else if(a_905.$tag==7){
    if(b_906.$tag==7){
      return true
    } else return false
  } else if(a_905.$tag==4){
    return error("no support for TRow in equivType yet")
  } else if(a_905.$tag==6){
    if(b_906.$tag==6){
      const rbs_943 = (all_37(p_945 => (equivBound_766(fst_26(p_945)))(snd_27(p_945))))((zip_41(a_905.$2))(b_906.$2));
      const rvs_942 = (all_37(p_944 => (($eq$eq($instance_410))(fst_26(p_944)))(snd_27(p_944))))((zip_41(a_905.$1))(b_906.$1));
      return (rvs_942&&rbs_943)&&((equivType_767(a_905.$3))(b_906.$3))
    } else return false
  } else error("pattern match fail",a_905)
};
const mkTForall_2004 = ann_2224 => vs_2225 => bs_2226 => t_2227 => {
  const f_2228 = bs_2229 => b_2230 => {
    const $phi$258 = (exists_36(equivBound_766(b_2230)))(bs_2229);
    if($phi$258){
      return bs_2229
    } else if(!$phi$258){
      return (push(b_2230))(bs_2229)
    } else error("pattern match fail",$phi$258)
  };
  return (((TForall_751(ann_2224))(vs_2225))(((foldl(f_2228))([]))(bs_2226)))(t_2227)
};
const dropSubs_1980 = vs_2093 => subs_2094 => (Subs_1972(((foldl(r_2097 => v_2098 => (((remove_66($instance_465))($instance_410))(v_2098))(r_2097)))(subs_2094.$0))(vs_2093)))(((foldl(r_2099 => v_2100 => (((remove_66($instance_465))($instance_410))(v_2100))(r_2099)))(subs_2094.$1))(vs_2093));
const applySubs_2008 = subs_2289 => t_2290 => {
  if(t_2290.$tag==6){
    const subs2_2295 = (dropSubs_1980(t_2290.$1))(subs_2289);
    return (((mkTForall_2004(t_2290.$0))(t_2290.$1))((map(applySubsBound_2009(subs2_2295)))(t_2290.$2)))((applySubs_2008(subs2_2295))(t_2290.$3))
  } else if(t_2290.$tag==1){
    const $phi$263 = (getSub_1975(t_2290.$1))(subs_2289);
    if($phi$263.$tag==1){
      return t_2290
    } else if($phi$263.$tag==0){
      return $phi$263.$0
    } else error("pattern match fail",$phi$263)
  } else if(t_2290.$tag==3){
    return ((TApp_748(t_2290.$0))((applySubs_2008(subs_2289))(t_2290.$1)))((applySubs_2008(subs_2289))(t_2290.$2))
  } else if(t_2290.$tag==4){
    return ((TRow_749(t_2290.$0))((map(m_2305 => (Pair_3((applySubs_2008(subs_2289))(m_2305.$0)))((applySubs_2008(subs_2289))(m_2305.$1))))(t_2290.$1)))(((fmap($instance_416))(applySubs_2008(subs_2289)))(t_2290.$2))
  } else return t_2290
};
const applySubsBound_2009 = subs_2309 => b_2310 => ((TCBound_744(b_2310.$0))(b_2310.$1))((applySubs_2008(subs_2309))(b_2310.$2));
const isEmpty_70 = t_357 => {
  if(t_357.$tag==0){
    return true
  } else return false
};
const composeSubs_1977 = ef_2047 => sa_2048 => sb_2049 => ((foldTrie_67(r_2052 => v_2053 => t_2054 => (((addSub_1978(ef_2047))(v_2053))(t_2054))(r_2052)))(((foldTrie_67(r_2055 => v_2056 => t_2057 => (((addSatSub_1979(ef_2047))(v_2056))(t_2057))(r_2055)))(sa_2048))(sb_2049.$0)))(sb_2049.$1);
const addSub_1978 = ef_2058 => v_2059 => t_2060 => subs_2061 => {
  const t2_2062 = (applySubs_2008(subs_2061))(t_2060);
  const $phi$268 = (getSub_1975(v_2059))(subs_2061);
  if($phi$268.$tag==1){
    const subUnsat_2065 = local$instance$Hashable$1 => local$instance$Eq$0 => su_2069 => uv_2070 => ut_2071 => {
      const ut2_2074 = ((substitute_2007(v_2059))(t2_2062))(ut_2071);
      const $phi$272 = isEmpty_70(freeTVars_2002(ut2_2074));
      if($phi$272){
        return (Pair_3(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2070))(ut2_2074))(su_2069.$0)))(su_2069.$1)
      } else if(!$phi$272){
        return (Pair_3(su_2069.$0))(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2070))(ut2_2074))(su_2069.$1))
      } else error("pattern match fail",$phi$272)
    };
    const su_2066 = ((foldTrie_67((subUnsat_2065($instance_465))($instance_410)))((Pair_3(subs_2061.$0))(Empty_11)))(subs_2061.$1);
    const unsat2_2068 = snd_27(su_2066);
    const sat2_2067 = fst_26(su_2066);
    const $phi$274 = isEmpty_70(freeTVars_2002(t2_2062));
    if($phi$274){
      return (Subs_1972(((((insert_64($instance_465))($instance_410))(v_2059))(t2_2062))(sat2_2067)))(unsat2_2068)
    } else if(!$phi$274){
      return (Subs_1972(sat2_2067))(((((insert_64($instance_465))($instance_410))(v_2059))(t2_2062))(unsat2_2068))
    } else error("pattern match fail",$phi$274)
  } else if($phi$268.$tag==0){
    return ((composeSubs_1977(ef_2058))(subs_2061))(((unify_2011(ef_2058))($phi$268.$0))(t2_2062))
  } else error("pattern match fail",$phi$268)
};
const addSatSub_1979 = ef_2076 => v_2077 => t_2078 => subs_2079 => {
  const $phi$276 = (getSub_1975(v_2077))(subs_2079);
  if($phi$276.$tag==1){
    const subUnsat_2082 = local$instance$Hashable$1 => local$instance$Eq$0 => su_2086 => uv_2087 => ut_2088 => {
      const ut2_2091 = ((substitute_2007(v_2077))(t_2078))(ut_2088);
      const $phi$280 = isEmpty_70(freeTVars_2002(ut2_2091));
      if($phi$280){
        return (Pair_3(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2087))(ut2_2091))(su_2086.$0)))(su_2086.$1)
      } else if(!$phi$280){
        return (Pair_3(su_2086.$0))(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2087))(ut2_2091))(su_2086.$1))
      } else error("pattern match fail",$phi$280)
    };
    const su_2083 = ((foldTrie_67((subUnsat_2082($instance_465))($instance_410)))((Pair_3(subs_2079.$0))(Empty_11)))(subs_2079.$1);
    const unsat2_2085 = snd_27(su_2083);
    const sat2_2084 = fst_26(su_2083);
    return (Subs_1972(((((insert_64($instance_465))($instance_410))(v_2077))(t_2078))(sat2_2084)))(unsat2_2085)
  } else if($phi$276.$tag==0){
    return ((composeSubs_1977(ef_2076))(subs_2079))(((unify_2011(ef_2076))($phi$276.$0))(t_2078))
  } else error("pattern match fail",$phi$276)
};
const substitute_2007 = n_2285 => s_2286 => t_2287 => (applySubs_2008((((addSub_1978(s_2288 => "substitute: "+s_2288))(n_2285))(s_2286))(emptySubs_1976)))(t_2287);
const unify_2011 = ef_2320 => a_2321 => b_2322 => {
  const err_2324 = a_2330 => b_2331 => error(ef_2320((("cannot unify "+(printType_1685(a_2330)))+" with ")+(printType_1685(b_2331))));
  const bind_2323 = n_2325 => t_2326 => {
    if(t_2326.$tag==1){
      const $phi$285 = (($eq$eq($instance_410))(n_2325))(t_2326.$1);
      if($phi$285){
        return emptySubs_1976
      } else if(!$phi$285){
        return (((addSub_1978(ef_2320))(n_2325))(t_2326))(emptySubs_1976)
      } else error("pattern match fail",$phi$285)
    } else {
      const $phi$283 = (((setContains_78($instance_465))($instance_410))(n_2325))(freeTVars_2002(t_2326));
      if($phi$283){
        return error(ef_2320("occurs check failed"))
      } else if(!$phi$283){
        return (((addSub_1978(ef_2320))(n_2325))(t_2326))(emptySubs_1976)
      } else error("pattern match fail",$phi$283)
    }
  };
  if(a_2321.$tag==1){
    return (bind_2323(a_2321.$1))(b_2322)
  } else if(a_2321.$tag==2){
    if(b_2322.$tag==2){
      const $phi$294 = (($eq$eq($instance_410))(a_2321.$1))(b_2322.$1);
      if($phi$294){
        return emptySubs_1976
      } else if(!$phi$294){
        return (err_2324(a_2321))(b_2322)
      } else error("pattern match fail",$phi$294)
    } else if(b_2322.$tag==1){
      return (bind_2323(b_2322.$1))(a_2321)
    } else return (err_2324(a_2321))(b_2322)
  } else if(a_2321.$tag==0){
    if(b_2322.$tag==0){
      const $phi$291 = (($eq$eq($instance_410))(a_2321.$1))(b_2322.$1);
      if($phi$291){
        return emptySubs_1976
      } else if(!$phi$291){
        return (err_2324(a_2321))(b_2322)
      } else error("pattern match fail",$phi$291)
    } else if(b_2322.$tag==1){
      return (bind_2323(b_2322.$1))(a_2321)
    } else return (err_2324(a_2321))(b_2322)
  } else if(a_2321.$tag==7){
    return (err_2324(a_2321))(b_2322)
  } else if(a_2321.$tag==5){
    return (err_2324(a_2321))(b_2322)
  } else if(a_2321.$tag==3){
    if(b_2322.$tag==1){
      return (bind_2323(b_2322.$1))(a_2321)
    } else if(b_2322.$tag==3){
      const fsubs_2357 = ((unify_2011(ef_2320))(a_2321.$1))(b_2322.$1);
      const xsubs_2358 = ((unify_2011(ef_2320))((applySubs_2008(fsubs_2357))(a_2321.$2)))((applySubs_2008(fsubs_2357))(b_2322.$2));
      return ((composeSubs_1977(ef_2320))(fsubs_2357))(xsubs_2358)
    } else return (err_2324(a_2321))(b_2322)
  } else if((a_2321.$tag==4)&&(a_2321.$2.$tag==1)){
    return (err_2324(a_2321))(b_2322)
  } else if(a_2321.$tag==4){
    if(b_2322.$tag==1){
      return (bind_2323(b_2322.$1))(a_2321)
    } else if((b_2322.$tag==4)&&(b_2322.$2.$tag==1)){
      return (err_2324(a_2321))(b_2322)
    } else return (err_2324(a_2321))(b_2322)
  } else return (err_2324(a_2321))(b_2322)
};
const skolemizeSubs_2016 = (foldl(subs_2526 => v_2527 => (((addSub_1978(s_2528 => "skolemize: "+s_2528))(v_2527))((TSkolem_747(Empty_11))(v_2527)))(subs_2526)))(emptySubs_1976);
const ICtx_1973 = $_0_2036 => $_1_2037 => $_2_2038 => $_3_2039 => ({$0:$_0_2036,$1:$_1_2037,$2:$_2_2038,$3:$_3_2039});
const setSubs_1985 = subs_2119 => ctx_2120 => (((ICtx_1973(subs_2119))((map(applySubsBound_2009(subs_2119)))(ctx_2120.$1)))(ctx_2120.$2))(ctx_2120.$3);
const IEnv_1974 = $_0_2040 => $_1_2041 => $_2_2042 => ({$0:$_0_2040,$1:$_1_2041,$2:$_2_2042});
const getInstances_2001 = env_2198 => env_2198.$1;
const Class_742 = $_0_836 => $_1_837 => $_2_838 => $_3_839 => ({$0:$_0_836,$1:$_1_837,$2:$_2_838,$3:$_3_839});
const setAddAll_76 = local$instance$Hashable$1 => local$instance$Eq$0 => vs_374 => s_375 => ((foldl(s_376 => v_377 => (((setAdd_75(local$instance$Hashable$1))(local$instance$Eq$0))(v_377))(s_376)))(s_375))(vs_374);
const setType_770 = t_956 => e_957 => {
  if(e_957.$tag==0){
    return (Var_726((setAnnType_761(t_956))(e_957.$0)))(e_957.$1)
  } else if(e_957.$tag==1){
    return (Const_727((setAnnType_761(t_956))(e_957.$0)))(e_957.$1)
  } else if(e_957.$tag==2){
    return ((App_728((setAnnType_761(t_956))(e_957.$0)))(e_957.$1))(e_957.$2)
  } else if(e_957.$tag==3){
    return ((Lam_729((setAnnType_761(t_956))(e_957.$0)))(e_957.$1))(e_957.$2)
  } else if(e_957.$tag==4){
    return ((Case_730((setAnnType_761(t_956))(e_957.$0)))(e_957.$1))(e_957.$2)
  } else if(e_957.$tag==5){
    return ((Let_731((setAnnType_761(t_956))(e_957.$0)))(e_957.$1))(e_957.$2)
  } else if(e_957.$tag==6){
    return ((New_732((setAnnType_761(t_956))(e_957.$0)))(e_957.$1))(e_957.$2)
  } else error("pattern match fail",e_957)
};
const splitEither_29 = a_153 => (Pair_3((map(e_154 => {
  if(e_154.$tag==0){
    return e_154.$0
  } else error("pattern match fail",e_154)
}))((filter((either_28(__156 => true))(__157 => false)))(a_153))))((map(e_158 => {
  if(e_158.$tag==1){
    return e_158.$0
  } else error("pattern match fail",e_158)
}))((filter((either_28(__160 => false))(__161 => true)))(a_153)));
const splitFourWay_6472 = e_6694 => {
  const $phi$302 = splitEither_29(e_6694);
  return (Pair_3(splitEither_29($phi$302.$0)))(splitEither_29($phi$302.$1))
};
const breakableDownM_783 = local$instance$Monad$0 => f_1122 => ((breakableDownAndUpM_779(local$instance$Monad$0))(f_1122))(ret(local$instance$Monad$0));
const size_69 = t_351 => {
  if(t_351.$tag==0){
    return 0
  } else if(t_351.$tag==1){
    return 1
  } else if(t_351.$tag==2){
    return length(t_351.$0)
  } else if(t_351.$tag==3){
    return ((foldl($add))(0))((map(size_69))(t_351.$1))
  } else error("pattern match fail",t_351)
};
const $gt$eq_20 = local$instance$Ord$0 => a_126 => b_127 => not_30((($lt(local$instance$Ord$0))(a_126))(b_127));
const trieKeys_72 = m_364 => ((foldTrie_67(ks_365 => k_366 => __367 => (push(k_366))(ks_365)))([]))(m_364);
const setToArray_80 = (foldTrie_67(vs_380 => v_381 => __382 => (push(v_381))(vs_380)))([]);
const mapTrie_68 = f_343 => t_344 => {
  if(t_344.$tag==0){
    return Empty_11
  } else if(t_344.$tag==1){
    return (Leaf_12(t_344.$0))((f_343(t_344.$0))(t_344.$1))
  } else if(t_344.$tag==2){
    return ($_16(Collision_13))((map(e_348 => ($_16(Pair_3(fst_26(e_348))))((f_343(fst_26(e_348)))(snd_27(e_348)))))(t_344.$0))
  } else if(t_344.$tag==3){
    return ($_16(BitmapIndexed_14(t_344.$0)))((map(mapTrie_68(f_343)))(t_344.$1))
  } else error("pattern match fail",t_344)
};
const RewriteState_5427 = $_0_5453 => $_1_5454 => $_2_5455 => $_3_5456 => ({$0:$_0_5453,$1:$_1_5454,$2:$_2_5455,$3:$_3_5456});
const $gt$gt_21 = local$instance$Monad$0 => a_128 => b_129 => (($gt$gt$eq(local$instance$Monad$0))(a_128))(__130 => b_129);
const newPhi_5431 = (($gt$gt$eq($instance_461))(gets_56))(s_5470 => (($gt$gt_21($instance_461))(sets_57((((RewriteState_5427(s_5470.$0))(s_5470.$1))(s_5470.$2))(s_5470.$3+1))))((ret($instance_461))("$phi$"+(intToString(s_5470.$3)))));
const downAndUp_775 = down_1075 => up_1076 => (breakableDownAndUp_774(a_1077 => e_1078 => Left_8((down_1075(a_1077))(e_1078))))(up_1076);
const ParsedArgs_4757 = $_0_4767 => $_1_4768 => $_2_4769 => ({$0:$_0_4767,$1:$_1_4768,$2:$_2_4769});
const ArgBool_4755 = $_0_4763 => $_1_4764 => ({$0:$_0_4763,$1:$_1_4764,$tag:0});
const $instance_4811 = $class$Eq(a_4809 => b_4810 => a_4809===b_4810);
const getBool_4762 = p_4799 => def_4800 => {
  const $phi$308 = ((contains_32($instance_4811))(def_4800))(p_4799.$2);
  if(!$phi$308){
    return error("unrecognized arg that was not present for parsing")
  } else if($phi$308){
    if(def_4800.$tag==0){
      const $phi$311 = (has(def_4800.$0))(p_4799.$1);
      if(!$phi$311){
        if(def_4800.$1.$tag==0){
          return def_4800.$1.$0
        } else if(def_4800.$1.$tag==1){
          return error("no value for required arg "+def_4800.$0)
        } else error("pattern match fail",def_4800.$1)
      } else if($phi$311){
        const $phi$313 = (get(def_4800.$0))(p_4799.$1);
        if(""==$phi$313){
          return true
        } else if("True"==$phi$313){
          return true
        } else if("true"==$phi$313){
          return true
        } else if("1"==$phi$313){
          return true
        } else if("False"==$phi$313){
          return false
        } else if("false"==$phi$313){
          return false
        } else if("0"==$phi$313){
          return false
        } else return error("invalid value for a bool argument: "+$phi$313)
      } else error("pattern match fail",$phi$311)
    } else return error("arg is not a bool")
  } else error("pattern match fail",$phi$308)
};
const withAnn_772 = ann_997 => e_998 => {
  if(e_998.$tag==0){
    return (Var_726(ann_997))(e_998.$1)
  } else if(e_998.$tag==1){
    return (Const_727(ann_997))(e_998.$1)
  } else if(e_998.$tag==2){
    return ((App_728(ann_997))(e_998.$1))(e_998.$2)
  } else if(e_998.$tag==3){
    return ((Lam_729(ann_997))(e_998.$1))(e_998.$2)
  } else if(e_998.$tag==4){
    return ((Case_730(ann_997))(e_998.$1))(e_998.$2)
  } else if(e_998.$tag==5){
    return ((Let_731(ann_997))(e_998.$1))(e_998.$2)
  } else if(e_998.$tag==6){
    return ((New_732(ann_997))(e_998.$1))(e_998.$2)
  } else error("pattern match fail",e_998)
};
const toRecord_51 = (foldl(r_228 => p_229 => ((set(p_229.$0))(p_229.$1))(r_228)))(empty);
const updateOrSet_65 = local$instance$Hashable$1 => local$instance$Eq$0 => k_302 => f_303 => d_304 => m_305 => {
  const $phi$318 = (((lookup_63(local$instance$Hashable$1))(local$instance$Eq$0))(k_302))(m_305);
  if($phi$318.$tag==1){
    return ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(k_302))(d_304))(m_305)
  } else if($phi$318.$tag==0){
    return ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(k_302))(f_303($phi$318.$0)))(m_305)
  } else error("pattern match fail",$phi$318)
};
const $gt$eq$gt_84 = local$instance$Monad$0 => a_396 => b_397 => x_398 => (($gt$gt$eq(local$instance$Monad$0))(a_396(x_398)))(b_397);
const trieEntries_73 = m_368 => ((foldTrie_67(es_369 => k_370 => v_371 => (push((Pair_3(k_370))(v_371)))(es_369)))([]))(m_368);
const Tuple4_5 = $_0_94 => $_1_95 => $_2_96 => $_3_97 => ({$0:$_0_94,$1:$_1_95,$2:$_2_96,$3:$_3_97});
const WsTok_6167 = {$tag:0};
const ModuleInterface_739 = $_0_826 => $_1_827 => $_2_828 => ({$0:$_0_826,$1:$_1_827,$2:$_2_828});
const CNum_733 = $_0_810 => ({$0:$_0_810,$tag:0});
const indent_1689 = map(l_1812 => "  "+l_1812);
const printExprTyped_1687 = typed_1753 => e_1754 => {
  const printPat_1759 = p_1773 => {
    if(p_1773.$tag==0){
      return p_1773.$1
    } else if((p_1773.$tag==1)&&(p_1773.$1.$tag==0)){
      return jsonStringify(p_1773.$1.$0)
    } else if((p_1773.$tag==1)&&(p_1773.$1.$tag==1)){
      return jsonStringify(p_1773.$1.$0)
    } else if(p_1773.$tag==2){
      return ((p_1773.$1+" (")+((join_38((map(printPat_1759))(p_1773.$2)))(") (")))+")"
    } else error("pattern match fail",p_1773)
  };
  const sameLine_1756 = xs_1765 => ys_1766 => (concat(init_47(xs_1765)))((enqueue((last_46(xs_1765))+(head_44(ys_1766))))(tail_45(ys_1766)));
  const sameLine3_1757 = a_1767 => b_1768 => c_1769 => (sameLine_1756(a_1767))((sameLine_1756(b_1768))(c_1769));
  const printT_1761 = e_1805 => {
    const t_1806 = getType_773(e_1805);
    return printType_1685(t_1806)
  };
  const printParen_1755 = e_1764 => ((sameLine3_1757(["("]))(printExpr_1762(e_1764)))([")"]);
  const printCasePat_1758 = cp_1770 => (enqueue((printPat_1759(cp_1770.$0))+" ->"))(indent_1689(printExpr_1762(cp_1770.$1)));
  const printE_1760 = e_1783 => {
    if(e_1783.$tag==0){
      return [e_1783.$1]
    } else if((e_1783.$tag==1)&&(e_1783.$1.$tag==0)){
      return [jsonStringify(e_1783.$1.$0)]
    } else if((e_1783.$tag==1)&&(e_1783.$1.$tag==1)){
      return [jsonStringify(e_1783.$1.$0)]
    } else if(e_1783.$tag==2){
      return ((sameLine3_1757(printParen_1755(e_1783.$1)))([" "]))(printParen_1755(e_1783.$2))
    } else if(e_1783.$tag==3){
      return (enqueue(("\\"+e_1783.$1)+" ->"))(indent_1689(printExpr_1762(e_1783.$2)))
    } else if(e_1783.$tag==4){
      return (concat(((sameLine3_1757(["case "]))(printParen_1755(e_1783.$1)))([" of"])))(indent_1689((concatMap_42(printCasePat_1758))(e_1783.$2)))
    } else if(e_1783.$tag==5){
      return (concat((push("in"))((enqueue("let"))(indent_1689((concatMap_42(printDef_1688(typed_1753)))(e_1783.$1))))))(indent_1689(printExpr_1762(e_1783.$2)))
    } else if(e_1783.$tag==6){
      return (push(e_1783.$1))(indent_1689((concatMap_42(printExprTyped_1687(typed_1753)))(e_1783.$2)))
    } else error("pattern match fail",e_1783)
  };
  const printExpr_1762 = e_1807 => {
    if(!typed_1753){
      return printE_1760(e_1807)
    } else if(typed_1753){
      return ((sameLine3_1757(["("]))(printE_1760(e_1807)))([(" :: "+(printT_1761(e_1807)))+" )"])
    } else error("pattern match fail",typed_1753)
  };
  const pe_1763 = printE_1760(e_1754);
  return printExpr_1762(e_1754)
};
const printDef_1688 = typed_1808 => d_1809 => (enqueue(d_1809.$0+" ="))(indent_1689((printExprTyped_1687(typed_1808))(d_1809.$1)));
const reallyPrintExpr_1690 = typed_1813 => e_1814 => (join_38((printExprTyped_1687(typed_1813))(e_1814)))("\n");
const mapSnd_86 = f_403 => p_404 => (Pair_3(p_404.$0))(f_403(p_404.$1));
const down_777 = f_1079 => (downAndUp_775(f_1079))(Pair_3);
const betaReduction_3469 = e_3701 => {
  const f_3702 = e_3703 => {
    if((e_3703.$tag==2)&&(e_3703.$1.$tag==3)){
      if(e_3703.$2.$tag==0){
        const $phi$328 = (($eq$eq($instance_410))(e_3703.$1.$1))(e_3703.$2.$1);
        if($phi$328){
          return e_3703.$1.$2
        } else if(!$phi$328){
          return ((Let_731(e_3703.$0))([(Pair_3(e_3703.$1.$1))((Var_726(e_3703.$2.$0))(e_3703.$2.$1))]))(e_3703.$1.$2)
        } else error("pattern match fail",$phi$328)
      } else return ((Let_731(e_3703.$0))([(Pair_3(e_3703.$1.$1))(e_3703.$2)]))(e_3703.$1.$2)
    } else return e_3703
  };
  return snd_27(((down_777(a_3713 => e_3714 => (Pair_3(a_3713))(f_3702(e_3714))))(Unit_0))(e_3701))
};
const AnnUseCount_722 = $_0_788 => ({$0:$_0_788,$tag:2});
const getCount_3457 = e_3553 => {
  const $phi$330 = (((getAnn_757($instance_465))($instance_410))("useCount"))(annOf_771(e_3553));
  if(($phi$330.$tag==0)&&($phi$330.$0.$tag==2)){
    return $phi$330.$0.$0
  } else error("pattern match fail",$phi$330)
};
const mergeCount_3458 = local$instance$Hashable$1 => local$instance$Eq$0 => a_3555 => b_3556 => ((foldTrie_67(a_3557 => k_3558 => v_3559 => ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(k_3558))(v_3559+((justOr_23(0))((((lookup_63(local$instance$Hashable$1))(local$instance$Eq$0))(k_3558))(a_3557)))))(a_3557)))(a_3555))(b_3556);
const mapBindings_3460 = f_3604 => bs_3605 => (map(b_3606 => (Pair_3(b_3606.$0))(f_3604(b_3606.$1))))(bs_3605);
const mapBindingsM_3461 = local$instance$Monad$0 => f_3609 => bs_3610 => ((mapM_54(local$instance$Monad$0))(b_3611 => (($gt$gt$eq(local$instance$Monad$0))((f_3609(b_3611.$0))(b_3611.$1)))(e_3614 => (ret(local$instance$Monad$0))((Pair_3(b_3611.$0))(e_3614)))))(bs_3610);
const patSize_3467 = p_3671 => {
  if(p_3671.$tag==0){
    return 1
  } else if(p_3671.$tag==1){
    return 1
  } else if(p_3671.$tag==2){
    return ((foldl(c_3679 => p_3680 => c_3679+(patSize_3467(p_3680))))(1))(p_3671.$2)
  } else error("pattern match fail",p_3671)
};
const exprSize_3466 = e_3643 => {
  if(e_3643.$tag==0){
    return 1
  } else if(e_3643.$tag==1){
    return 1
  } else if(e_3643.$tag==2){
    return (1+(exprSize_3466(e_3643.$1)))+(exprSize_3466(e_3643.$2))
  } else if(e_3643.$tag==3){
    return 1+(exprSize_3466(e_3643.$2))
  } else if(e_3643.$tag==4){
    return 1+(((foldl(c_3657 => p_3658 => (c_3657+(patSize_3467(p_3658.$0)))+(exprSize_3466(p_3658.$1))))(exprSize_3466(e_3643.$1)))(e_3643.$2))
  } else if(e_3643.$tag==5){
    return 1+(((foldl(c_3664 => b_3665 => c_3664+(exprSize_3466(snd_27(b_3665)))))(exprSize_3466(e_3643.$2)))(e_3643.$1))
  } else if(e_3643.$tag==6){
    return ((foldl(c_3669 => e_3670 => c_3669+(exprSize_3466(e_3670))))(1))(e_3643.$2)
  } else error("pattern match fail",e_3643)
};
const chooseForInlining_3468 = baseCount_3681 => bs_3682 => {
  const useCount_3683 = ((foldl((mergeCount_3458($instance_465))($instance_410)))(baseCount_3681))((map(b_3685 => getCount_3457(snd_27(b_3685))))(bs_3682));
  const f_3684 = r_3686 => b_3687 => {
    if(b_3687.$1.$tag==0){
      return ((((insert_64($instance_465))($instance_410))(b_3687.$0))(b_3687.$1))(r_3686)
    } else if(b_3687.$1.$tag==1){
      return ((((insert_64($instance_465))($instance_410))(b_3687.$0))(b_3687.$1))(r_3686)
    } else if(b_3687.$1.$tag==3){
      const $phi$341 = ((($lt($instance_411))(exprSize_3466(b_3687.$1)))(10))||((($eq$eq($instance_409))(1))((justOr_23(0))((((lookup_63($instance_465))($instance_410))(b_3687.$0))(useCount_3683))));
      if(!$phi$341){
        return r_3686
      } else if($phi$341){
        return ((((insert_64($instance_465))($instance_410))(b_3687.$0))(b_3687.$1))(r_3686)
      } else error("pattern match fail",$phi$341)
    } else if(b_3687.$1.$tag==6){
      const $phi$339 = (($eq$eq($instance_409))(1))((justOr_23(0))((((lookup_63($instance_465))($instance_410))(b_3687.$0))(useCount_3683)));
      if(!$phi$339){
        return r_3686
      } else if($phi$339){
        return ((((insert_64($instance_465))($instance_410))(b_3687.$0))(b_3687.$1))(r_3686)
      } else error("pattern match fail",$phi$339)
    } else return r_3686
  };
  return ((foldl(f_3684))(Empty_11))(bs_3682)
};
const $instance_441 = $class$Functor(f_435 => s_436 => State_10(s_438 => {
  const $phi$344 = s_436.$0(s_438);
  return (Pair_3($phi$344.$0))(f_435($phi$344.$1))
}));
const newIdent_3178 = n_3185 => (($gt$gt$eq($instance_461))(gets_56))(i_3186 => (($gt$gt_21($instance_461))(sets_57(i_3186+1)))((ret($instance_461))((n_3185+"_")+(intToString(i_3186)))));
const rewriteExpr_3179 = env_3187 => e_3188 => {
  const rename_3189 = n_3193 => newIdent_3178(n_3193);
  const renamePat_3190 = p_3194 => {
    if(p_3194.$tag==1){
      return (ret($instance_461))((Pair_3(p_3194))(empty))
    } else if(p_3194.$tag==0){
      return (($gt$gt$eq($instance_461))(rename_3189(p_3194.$1)))(n_3199 => (ret($instance_461))((Pair_3((PVar_735(p_3194.$0))(n_3199)))(((set(p_3194.$1))(n_3199))(empty))))
    } else if(p_3194.$tag==2){
      return (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(renamePat_3190))(p_3194.$2)))(ps_3203 => {
        const $phi$347 = (has(p_3194.$1))(env_3187);
        if(!$phi$347){
          return (ret($instance_461))((Pair_3(((PData_737(p_3194.$0))(p_3194.$1))((map(fst_26))(ps_3203))))(((foldl(merge))(empty))((map(snd_27))(ps_3203))))
        } else if($phi$347){
          return (ret($instance_461))((Pair_3(((PData_737(p_3194.$0))((get(p_3194.$1))(env_3187)))((map(fst_26))(ps_3203))))(((foldl(merge))(empty))((map(snd_27))(ps_3203))))
        } else error("pattern match fail",$phi$347)
      })
    } else error("pattern match fail",p_3194)
  };
  const rewritePat_3191 = p_3204 => (($gt$gt$eq($instance_461))(renamePat_3190(p_3204.$0)))(pe_3207 => (($gt$gt$eq($instance_461))((rewriteExpr_3179((merge(env_3187))(pe_3207.$1)))(p_3204.$1)))(e_3210 => (ret($instance_461))((Pair_3(pe_3207.$0))(e_3210))));
  const f_3192 = e_3211 => {
    if(e_3211.$tag==3){
      return (($gt$gt$eq($instance_461))(rename_3189(e_3211.$1)))(n_3215 => (($gt$gt$eq($instance_461))((rewriteExpr_3179(((set(e_3211.$1))(n_3215))(env_3187)))(e_3211.$2)))(e_3216 => (ret($instance_461))(Right_9(((Lam_729(e_3211.$0))(n_3215))(e_3216)))))
    } else if(e_3211.$tag==5){
      return (($gt$gt$eq($instance_461))((rewriteBindings_3181(env_3187))(e_3211.$1)))(ebs_3220 => (($gt$gt$eq($instance_461))((rewriteExpr_3179(ebs_3220.$0))(e_3211.$2)))(e_3223 => (ret($instance_461))(Right_9(((Let_731(e_3211.$0))(ebs_3220.$1))(e_3223)))))
    } else if(e_3211.$tag==4){
      return (($gt$gt$eq($instance_461))((rewriteExpr_3179(env_3187))(e_3211.$1)))(e_3227 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(rewritePat_3191))(e_3211.$2)))(ps_3228 => (ret($instance_461))(Right_9(((Case_730(e_3211.$0))(e_3227))(ps_3228)))))
    } else if(e_3211.$tag==0){
      const $phi$354 = (has(e_3211.$1))(env_3187);
      if($phi$354){
        return (ret($instance_461))(Left_8((Var_726(e_3211.$0))((get(e_3211.$1))(env_3187))))
      } else if(!$phi$354){
        return (ret($instance_461))(Left_8(e_3211))
      } else error("pattern match fail",$phi$354)
    } else if(e_3211.$tag==6){
      const $phi$352 = (has(e_3211.$1))(env_3187);
      if($phi$352){
        return (ret($instance_461))(Left_8(((New_732(e_3211.$0))((get(e_3211.$1))(env_3187)))(e_3211.$2)))
      } else if(!$phi$352){
        return (ret($instance_461))(Left_8(e_3211))
      } else error("pattern match fail",$phi$352)
    } else return (ret($instance_461))(Left_8(e_3211))
  };
  return ((breakableDownM_783($instance_461))(f_3192))(e_3188)
};
const rewriteBindings_3181 = env_3248 => bs_3249 => {
  const ns_3250 = (map(fst_26))(bs_3249);
  const ns2_3251 = ((mapM_54($instance_461))(newIdent_3178))(ns_3250);
  return (($gt$gt$eq($instance_461))(ns2_3251))(ns_3252 => {
    const env2_3253 = (merge(env_3248))(toRecord_51((zip_41((map(fst_26))(bs_3249)))(ns_3252)));
    const bs2_3254 = ((mapM_54($instance_461))(rewriteExpr_3179(env2_3253)))((map(snd_27))(bs_3249));
    return (($gt$gt$eq($instance_461))(bs2_3254))(bs_3255 => (ret($instance_461))((Pair_3(env2_3253))((zip_41(ns_3252))(bs_3255))))
  })
};
const inlineCode_3470 = always_3715 => e_3716 => {
  const inlinePat_3719 = p_3743 => {
    if(p_3743.$tag==2){
      const $phi$358 = (((lookup_63($instance_465))($instance_410))(p_3743.$1))(always_3715);
      if(($phi$358.$tag==0)&&($phi$358.$0.$tag==0)){
        return ((PData_737(p_3743.$0))($phi$358.$0.$1))((map(inlinePat_3719))(p_3743.$2))
      } else return ((PData_737(p_3743.$0))(p_3743.$1))((map(inlinePat_3719))(p_3743.$2))
    } else return p_3743
  };
  const withAnnCopy_3717 = ann_3720 => e_3721 => (withAnn_772((((mergeTrie_71($instance_465))($instance_410))((((remove_66($instance_465))($instance_410))("export"))(annOf_771(e_3721))))((((copyAnn_759($instance_465))($instance_410))(["export"]))(ann_3720))))(e_3721);
  const inlineExpr_3718 = e_3722 => {
    if(e_3722.$tag==0){
      const $phi$364 = (((lookup_63($instance_465))($instance_410))(e_3722.$1))(always_3715);
      if($phi$364.$tag==1){
        return (ret($instance_461))(Left_8(e_3722))
      } else if($phi$364.$tag==0){
        return ((fmap($instance_441))(e_3726 => Left_8((withAnnCopy_3717(e_3722.$0))(e_3726))))((rewriteExpr_3179(empty))($phi$364.$0))
      } else error("pattern match fail",$phi$364)
    } else if(e_3722.$tag==5){
      const always2_3730 = (((mergeTrie_71($instance_465))($instance_410))(always_3715))((chooseForInlining_3468(getCount_3457(e_3722.$2)))(e_3722.$1));
      return (($gt$gt$eq($instance_461))(((mapBindingsM_3461($instance_461))(n_3731 => e_3732 => (inlineCode_3470((((remove_66($instance_465))($instance_410))(n_3731))(always2_3730)))(e_3732)))(e_3722.$1)))(bs_3733 => (($gt$gt$eq($instance_461))((inlineCode_3470(always2_3730))(e_3722.$2)))(e_3734 => {
        const $phi$362 = length(bs_3733);
        if(0==$phi$362){
          return (ret($instance_461))(Right_9((withAnnCopy_3717(e_3722.$0))(e_3734)))
        } else return (ret($instance_461))(Right_9(((Let_731(e_3722.$0))(bs_3733))(e_3734)))
      }))
    } else if(e_3722.$tag==4){
      return (ret($instance_461))(Left_8(((Case_730(e_3722.$0))(e_3722.$1))((map(p_3739 => (Pair_3(inlinePat_3719(p_3739.$0)))(p_3739.$1)))(e_3722.$2))))
    } else return (ret($instance_461))(Left_8(e_3722))
  };
  return ((breakableDownM_783($instance_461))(inlineExpr_3718))(e_3716)
};
const isExport_3471 = e_3751 => isJust_25((((getAnn_757($instance_465))($instance_410))("export"))(annOf_771(e_3751)));
const dropDeadBindings_3472 = useCount_3752 => bs_3753 => {
  const f_3754 = b_3755 => {
    const recursiveCount_3759 = (justOr_23(0))((((lookup_63($instance_465))($instance_410))(b_3755.$0))(getCount_3457(b_3755.$1)));
    const totalCount_3758 = (justOr_23(0))((((lookup_63($instance_465))($instance_410))(b_3755.$0))(useCount_3752));
    const keep_3760 = (isExport_3471(b_3755.$1))||((($gt_18($instance_411))(totalCount_3758-recursiveCount_3759))(0));
    if(keep_3760){
      return Just_1((Pair_3(b_3755.$0))(b_3755.$1))
    } else if(!keep_3760){
      const ann_3761 = annOf_771(b_3755.$1);
      const $phi$368 = (((getAnn_757($instance_465))($instance_410))("data"))(ann_3761);
      if($phi$368.$tag==1){
        return Nothing_2
      } else if($phi$368.$tag==0){
        return Just_1((Pair_3(b_3755.$0))((withAnn_772(((((setAnn_758($instance_465))($instance_410))("dead"))(AnnTag_724))(ann_3761)))(b_3755.$1)))
      } else error("pattern match fail",$phi$368)
    } else error("pattern match fail",keep_3760)
  };
  return (mapJust_43(f_3754))(bs_3753)
};
const deadCode_3465 = e_3631 => {
  const f_3632 = e_3633 => {
    if(e_3633.$tag==5){
      const useCount_3637 = ((foldl((mergeCount_3458($instance_465))($instance_410)))(getCount_3457(e_3633.$2)))((map(b_3639 => getCount_3457(snd_27(b_3639))))(e_3633.$1));
      const bs2_3638 = (dropDeadBindings_3472(useCount_3637))(e_3633.$1);
      return ((Let_731(e_3633.$0))(bs2_3638))(e_3633.$2)
    } else return e_3633
  };
  return snd_27(((down_777(a_3641 => e_3642 => (Pair_3(a_3641))(f_3632(e_3642))))(Unit_0))(e_3631))
};
const up_776 = downAndUp_775(Pair_3);
const annWithUseCount_3459 = e_3560 => {
  const dropCount_3561 = local$instance$Hashable$1 => local$instance$Eq$0 => n_3565 => c_3566 => (((remove_66(local$instance$Hashable$1))(local$instance$Eq$0))(n_3565))(c_3566);
  const countPat_3563 = c_3570 => p_3571 => {
    if(p_3571.$tag==0){
      return (((dropCount_3561($instance_465))($instance_410))(p_3571.$1))(c_3570)
    } else if(p_3571.$tag==2){
      return ((foldl(countPat_3563))(c_3570))(p_3571.$2)
    } else return c_3570
  };
  const countCase_3562 = pe_3567 => (countPat_3563(getCount_3457(pe_3567.$1)))(pe_3567.$0);
  const countExpr_3564 = e_3578 => {
    if(e_3578.$tag==0){
      return ((((insert_64($instance_465))($instance_410))(e_3578.$1))(1))(Empty_11)
    } else if(e_3578.$tag==2){
      return (((mergeCount_3458($instance_465))($instance_410))(getCount_3457(e_3578.$1)))(getCount_3457(e_3578.$2))
    } else if(e_3578.$tag==3){
      return (((dropCount_3561($instance_465))($instance_410))(e_3578.$1))(getCount_3457(e_3578.$2))
    } else if(e_3578.$tag==5){
      return ((foldl(c_3590 => n_3591 => (((dropCount_3561($instance_465))($instance_410))(n_3591))(c_3590)))(((foldl(c_3592 => e_3593 => (((mergeCount_3458($instance_465))($instance_410))(c_3592))(getCount_3457(e_3593))))(getCount_3457(e_3578.$2)))((map(snd_27))(e_3578.$1))))((map(fst_26))(e_3578.$1))
    } else if(e_3578.$tag==4){
      return ((foldl((mergeCount_3458($instance_465))($instance_410)))(getCount_3457(e_3578.$1)))((map(countCase_3562))(e_3578.$2))
    } else if(e_3578.$tag==1){
      return Empty_11
    } else if(e_3578.$tag==6){
      return ((foldl((mergeCount_3458($instance_465))($instance_410)))(Empty_11))((map(getCount_3457))(e_3578.$2))
    } else error("pattern match fail",e_3578)
  };
  return ((up_776(a_3602 => e_3603 => ($_16(Pair_3(a_3602)))((withAnn_772(((((setAnn_758($instance_465))($instance_410))("useCount"))(($_16(AnnUseCount_722))(countExpr_3564(e_3603))))(annOf_771(e_3603))))(e_3603))))(Unit_0))(e_3560)
};
const pass_3463 = bs_3619 => {
  const bs2_3620 = (mapBindings_3460(e_3624 => ($_16(snd_27))(annWithUseCount_3459(e_3624))))(bs_3619);
  const useCount_3621 = ((foldl((mergeCount_3458($instance_465))($instance_410)))(Empty_11))((map(b_3625 => getCount_3457(snd_27(b_3625))))(bs2_3620));
  const bs3_3622 = (mapBindings_3460(deadCode_3465))((dropDeadBindings_3472(useCount_3621))(bs2_3620));
  const always_3623 = (chooseForInlining_3468(Empty_11))(bs3_3622);
  return (($gt$gt$eq($instance_461))(((mapBindingsM_3461($instance_461))(n_3626 => e_3627 => (inlineCode_3470((((remove_66($instance_465))($instance_410))(n_3626))(always_3623)))(e_3627)))(bs3_3622)))(bs_3628 => (ret($instance_461))((mapBindings_3460(betaReduction_3469))(bs_3628)))
};
const importNoAliasP_6466 = (($lt$mul$gt($instance_6052))((pure($instance_6052))(n_6681 => (Pair_3(n_6681))(n_6681))))(nonReservedP_6424);
const loop_31 = f_163 => start_164 => {
  const next_166 = xr_172 => {
    const $phi$375 = f_163(xr_172.$0);
    if($phi$375.$tag==0){
      return (Pair_3($phi$375.$0))(Nothing_2)
    } else if($phi$375.$tag==1){
      return (Pair_3(xr_172.$0))(Just_1($phi$375.$0))
    } else error("pattern match fail",$phi$375)
  };
  const shouldStop_165 = x_169 => {
    if(x_169.$1.$tag==1){
      return false
    } else return true
  };
  const sp_167 = (Pair_3(start_164))(Nothing_2);
  const result_168 = ((iterate(sp_167))(shouldStop_165))(next_166);
  const $phi$378 = snd_27(result_168);
  if($phi$378.$tag==0){
    return $phi$378.$0
  } else error("pattern match fail",$phi$378)
};
const strToArray_52 = s_232 => {
  const f_233 = p_234 => {
    const $phi$381 = (($lt($instance_411))(p_234.$0))(length(s_232));
    if(!$phi$381){
      return Right_9(p_234.$1)
    } else if($phi$381){
      return Left_8((Pair_3(p_234.$0+1))((push((getChar(p_234.$0))(s_232)))(p_234.$1)))
    } else error("pattern match fail",$phi$381)
  };
  return (loop_31(f_233))((Pair_3(0))([]))
};
const setAnnCodeLoc_763 = file_887 => line_888 => col_889 => ann_890 => ((((setAnn_758($instance_465))($instance_410))("codeLoc"))(((AnnCodeLoc_721(file_887))(line_888))(col_889)))(ann_890);
const success_5988 = a_6026 => Parser_5982(Success_5980(a_6026));
const opt_5991 = a_6031 => (($lt$pip$gt($instance_6062))((($lt$mul$gt($instance_6052))((pure($instance_6052))(Just_1)))(a_6031)))(success_5988(Nothing_2));
const ImportAll_755 = $_0_869 => $_1_870 => ({$0:$_0_869,$1:$_1_870,$tag:2});
const AnnExport_725 = $_0_790 => ({$0:$_0_790,$tag:5});
const $lt$mul$mns$gt_6417 = pf_6533 => pa_6534 => {
  const parse_6537 = s_6538 => {
    const $phi$386 = pf_6533.$0(s_6538);
    if($phi$386.$tag==0){
      const $phi$388 = pa_6534.$0(((((ParserState_6411($phi$386.$1.$0))($phi$386.$1.$1))($phi$386.$1.$2))(s_6538.$2+1))($phi$386.$1.$4));
      if($phi$388.$tag==0){
        return (Success_5980($phi$386.$0($phi$388.$0)))(((((ParserState_6411($phi$388.$1.$0))($phi$388.$1.$1))($phi$388.$1.$2))(s_6538.$3))($phi$388.$1.$4))
      } else if($phi$388.$tag==1){
        return Error_5981($phi$388.$0)
      } else error("pattern match fail",$phi$388)
    } else if($phi$386.$tag==1){
      return Error_5981($phi$386.$0)
    } else error("pattern match fail",$phi$386)
  };
  return Parser_5982(parse_6537)
};
const upperCaseId_6425 = parseToken_6415(t_6590 => {
  if(t_6590.$0.$tag==5){
    const $phi$391 = (containsChar_35((getChar(0))(t_6590.$1)))("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if($phi$391){
      return Just_1(t_6590.$1)
    } else if(!$phi$391){
      return Nothing_2
    } else error("pattern match fail",$phi$391)
  } else return Nothing_2
});
const SymTok_6168 = {$tag:1};
const symP_6420 = s_6562 => parseToken_6415(t_6563 => {
  if(t_6563.$0.$tag==1){
    const $phi$394 = (($eq$eq($instance_410))(t_6563.$1))(s_6562);
    if($phi$394){
      return Just_1(s_6562)
    } else if(!$phi$394){
      return Nothing_2
    } else error("pattern match fail",$phi$394)
  } else return Nothing_2
});
const $lt$pip_5985 = local$instance$Applicative$0 => a_6006 => b_6007 => (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(a_6008 => __6009 => a_6008)))(a_6006)))(b_6007);
const parenP_6427 = p_6600 => (($lt$pip_5985($instance_6052))((($pip$gt_5984($instance_6052))(symP_6420("(")))(p_6600)))(symP_6420(")"));
const sepBy1_5989 = p_6027 => sp_6028 => (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(enqueue)))(p_6027)))(many_5986((($pip$gt_5984($instance_6052))(sp_6028))(p_6027)));
const withLocAnn_6428 = a_6601 => ((((setAnn_758($instance_465))($instance_410))("codeLoc"))(a_6601))(Empty_11);
const parse_6522 = s_6523 => {
  const $phi$397 = (($lt($instance_411))(s_6523.$1))(length(s_6523.$0));
  if(!$phi$397){
    return Error_5981("run out of tokens")
  } else if($phi$397){
    const $phi$399 = (getIx(s_6523.$1))(s_6523.$0);
    return (Success_5980(($_16(withLocAnn_6428))(((AnnCodeLoc_721(s_6523.$4))($phi$399.$2))($phi$399.$3))))(s_6523)
  } else error("pattern match fail",$phi$397)
};
const locP_6416 = Parser_5982(parse_6522);
const StrTok_6170 = {$tag:3};
const pcstrP_6443 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(PConst_736)))(locP_6416)))(parseToken_6415(t_6639 => {
  if(t_6639.$0.$tag==3){
    return Just_1(CStr_734(t_6639.$1))
  } else return Nothing_2
}));
const pcnumP_6442 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(PConst_736)))(locP_6416)))(parseToken_6415(t_6634 => {
  if(t_6634.$0.$tag==2){
    return Just_1(CNum_733(unsafeStringToInt(t_6634.$1)))
  } else return Nothing_2
}));
const pconstP_6445 = (($lt$pip$gt($instance_6062))(pcnumP_6442))(pcstrP_6443);
const notUpperCaseId_6426 = parseToken_6415(t_6595 => {
  if(t_6595.$0.$tag==5){
    const $phi$404 = (containsChar_35((getChar(0))(t_6595.$1)))("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if(!$phi$404){
      const $phi$406 = ((contains_32($instance_410))(t_6595.$1))(reserved_6419);
      if(!$phi$406){
        return Just_1(t_6595.$1)
      } else if($phi$406){
        return Nothing_2
      } else error("pattern match fail",$phi$406)
    } else if($phi$404){
      return Nothing_2
    } else error("pattern match fail",$phi$404)
  } else return Nothing_2
});
const pvarP_6441 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(PVar_735)))(locP_6416)))(notUpperCaseId_6426);
const patP_6440 = Parser_5982(s_6633 => (applyParser_5983(allPatP_6448))(s_6633));
const f_6649 = ann_6650 => p_6651 => ps_6652 => {
  let $phi$407;
  const $phi$408 = length(ps_6652);
  if(1==$phi$408){
    $phi$407 = "Pair"
  } else if(2==$phi$408){
    $phi$407 = "Tuple3"
  } else if(3==$phi$408){
    $phi$407 = "Tuple4"
  } else if(4==$phi$408){
    $phi$407 = "Tuple5"
  } else if(5==$phi$408){
    $phi$407 = "Tuple6"
  } else error("pattern match fail",$phi$408);
  const cons_6653 = $phi$407;
  return ((PData_737(ann_6650))(cons_6653))((enqueue(p_6651))(ps_6652))
};
const ptupleP_6446 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(f_6649)))(locP_6416)))((($pip$gt_5984($instance_6052))(symP_6420("(")))((($lt$pip_5985($instance_6052))(patP_6440))(symP_6420(","))))))((($lt$pip_5985($instance_6052))((sepBy1_5989(patP_6440))(symP_6420(","))))(symP_6420(")")));
const pdataP_6447 = ($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(PData_737)))(locP_6416)))(upperCaseId_6425)))(many_5986((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))(pvarP_6441))(pconstP_6445)))(ptupleP_6446)))(parenP_6427(patP_6440))));
const allPatP_6448 = (($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))(pvarP_6441))(pconstP_6445)))(pdataP_6447)))(ptupleP_6446);
const satisfies_2032 = a_2797 => b_2798 => {
  if(a_2797.$tag==1){
    return true
  } else if(a_2797.$tag==2){
    if(b_2798.$tag==2){
      return (($eq$eq($instance_410))(a_2797.$1))(b_2798.$1)
    } else return false
  } else if(a_2797.$tag==0){
    if(b_2798.$tag==0){
      return (($eq$eq($instance_410))(a_2797.$1))(b_2798.$1)
    } else return false
  } else if(a_2797.$tag==3){
    if(b_2798.$tag==3){
      return ((satisfies_2032(a_2797.$1))(b_2798.$1))&&((satisfies_2032(a_2797.$2))(b_2798.$2))
    } else return false
  } else return error("unexpected type in satisfies "+(printType_1685(a_2797)))
};
const satisfiesBound_2033 = a_2819 => b_2820 => ((($eq$eq($instance_410))(a_2819.$1))(b_2820.$1))&&((satisfies_2032(a_2819.$2))(b_2820.$2));
const splitBindings_1280 = bs_1319 => error("");
const timingStart_1479 = n_1504 => (($gt$gt$eq($instance_461))(gets_56))(s_1505 => {
  const nts_1509 = (justOr_23([]))((((lookup_63($instance_465))($instance_410))(n_1504))(s_1505.$2));
  return sets_57(((CompilerState_1473(s_1505.$0))(s_1505.$1))(((((insert_64($instance_465))($instance_410))(n_1504))((push(currentTimeMs(Unit_0)))(nts_1509)))(s_1505.$2)))
});
const timingEnd_1480 = n_1510 => (($gt$gt$eq($instance_461))(gets_56))(s_1511 => {
  const nts_1515 = (justOr_23([]))((((lookup_63($instance_465))($instance_410))(n_1510))(s_1511.$2));
  const start_1516 = last_46(nts_1515);
  return sets_57(((CompilerState_1473(s_1511.$0))(s_1511.$1))(((((insert_64($instance_465))($instance_410))(n_1510))((push((currentTimeMs(Unit_0))-start_1516))(init_47(nts_1515))))(s_1511.$2)))
});
const timed_1481 = n_1517 => p_1518 => i_1519 => (($gt$gt$eq($instance_461))((($gt$gt_21($instance_461))(timingStart_1479(n_1517)))(p_1518(i_1519))))(o_1520 => (($gt$gt_21($instance_461))(timingEnd_1480(n_1517)))((ret($instance_461))(o_1520)));
const upM_781 = local$instance$Monad$0 => (downAndUpM_780(local$instance$Monad$0))(ret(local$instance$Monad$0));
const OpTok_6171 = {$tag:4};
const operatorP_6421 = s_6568 => parseToken_6415(t_6569 => {
  if(t_6569.$0.$tag==4){
    const $phi$419 = (($eq$eq($instance_410))(t_6569.$1))(s_6568);
    if($phi$419){
      return Just_1(s_6568)
    } else if(!$phi$419){
      return Nothing_2
    } else error("pattern match fail",$phi$419)
  } else return Nothing_2
});
const tvarP_6457 = (($lt$mul$gt($instance_6052))((pure($instance_6052))(TVar_746(Empty_11))))(notUpperCaseId_6426);
const tconstP_6456 = (($lt$mul$gt($instance_6052))((pure($instance_6052))(TConst_745(Empty_11))))(upperCaseId_6425);
const typeP_6455 = Parser_5982(s_6670 => (applyParser_5983(tfunP_6460))(s_6670));
const simpleTypeP_6458 = (($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))(tconstP_6456))(tvarP_6457)))(parenP_6427(typeP_6455));
const tappP_6459 = ($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((pure($instance_6052))(foldl(TApp_748(Empty_11)))))(simpleTypeP_6458)))(many_5986(simpleTypeP_6458));
const tfunP_6460 = ($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((pure($instance_6052))(t_6671 => ts_6672 => (foldr1(b_6673 => a_6674 => ((TApp_748(Empty_11))(((TApp_748(Empty_11))((TConst_745(Empty_11))("->")))(a_6674)))(b_6673)))((enqueue(t_6671))(ts_6672)))))(tappP_6459)))(many_5986((($pip$gt_5984($instance_6052))(operatorP_6421("->")))(tappP_6459)));
const classMemberP_6462 = ($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((pure($instance_6052))(Pair_3)))(notUpperCaseId_6426)))((($pip$gt_5984($instance_6052))(operatorP_6421("::")))(typeP_6455));
const tryDCE_4992 = e_4995 => {
  if(((e_4995.$tag==3)&&("&&"==e_4995.$0))&&((e_4995.$1.$tag==9)&&e_4995.$1.$0)){
    return e_4995.$2
  } else if(((e_4995.$tag==3)&&("&&"==e_4995.$0))&&((e_4995.$2.$tag==9)&&e_4995.$2.$0)){
    return e_4995.$1
  } else if((e_4995.$tag==6)&&((e_4995.$0.$tag==9)&&e_4995.$0.$0)){
    return e_4995.$1
  } else if((e_4995.$tag==6)&&((e_4995.$0.$tag==9)&&(!e_4995.$0.$0))){
    return e_4995.$2
  } else return e_4995
};
const rewriteDCE_4993 = e_5003 => {
  if(e_5003.$tag==1){
    return (JSIndex_4813(rewriteDCE_4993(e_5003.$0)))(rewriteDCE_4993(e_5003.$1))
  } else if(e_5003.$tag==3){
    return tryDCE_4992(((JSBinOp_4815(e_5003.$0))(rewriteDCE_4993(e_5003.$1)))(rewriteDCE_4993(e_5003.$2)))
  } else if(e_5003.$tag==4){
    return (JSCall_4816(rewriteDCE_4993(e_5003.$0)))((map(rewriteDCE_4993))(e_5003.$1))
  } else if(e_5003.$tag==5){
    return (JSFun_4817(e_5003.$0))((concatMap_42(rewriteStmt_4994))(e_5003.$1))
  } else if(e_5003.$tag==6){
    return tryDCE_4992(((JSTernary_4818(rewriteDCE_4993(e_5003.$0)))(rewriteDCE_4993(e_5003.$1)))(rewriteDCE_4993(e_5003.$2)))
  } else if(e_5003.$tag==10){
    return JSObject_4822((map(kv_5017 => (Pair_3(kv_5017.$0))(rewriteDCE_4993(kv_5017.$1))))(e_5003.$0))
  } else if(e_5003.$tag==14){
    return (JSInstanceOf_4826(rewriteDCE_4993(e_5003.$0)))(rewriteDCE_4993(e_5003.$1))
  } else if(e_5003.$tag==15){
    return (JSNew_4827(rewriteDCE_4993(e_5003.$0)))((map(rewriteDCE_4993))(e_5003.$1))
  } else if(e_5003.$tag==11){
    return JSArray_4823((map(rewriteDCE_4993))(e_5003.$0))
  } else return e_5003
};
const rewriteStmt_4994 = s_5026 => {
  if(s_5026.$tag==0){
    return [JSExpr_4829(rewriteDCE_4993(s_5026.$0))]
  } else if(s_5026.$tag==1){
    return [JSReturn_4830(rewriteDCE_4993(s_5026.$0))]
  } else if(s_5026.$tag==2){
    return [(JSVar_4831(s_5026.$0))(rewriteDCE_4993(s_5026.$1))]
  } else if(s_5026.$tag==7){
    return [(JSAssign_4836(rewriteDCE_4993(s_5026.$0)))(rewriteDCE_4993(s_5026.$1))]
  } else if((s_5026.$tag==8)&&((s_5026.$0.$tag==9)&&s_5026.$0.$0)){
    return (concatMap_42(rewriteStmt_4994))(s_5026.$1)
  } else if((s_5026.$tag==8)&&((s_5026.$0.$tag==9)&&(!s_5026.$0.$0))){
    return (concatMap_42(rewriteStmt_4994))(s_5026.$2)
  } else if(s_5026.$tag==8){
    const $phi$425 = rewriteDCE_4993(s_5026.$0);
    if(($phi$425.$tag==9)&&$phi$425.$0){
      return (concatMap_42(rewriteStmt_4994))(s_5026.$1)
    } else if(($phi$425.$tag==9)&&(!$phi$425.$0)){
      return (concatMap_42(rewriteStmt_4994))(s_5026.$2)
    } else return [((JSIf_4837($phi$425))((concatMap_42(rewriteStmt_4994))(s_5026.$1)))((concatMap_42(rewriteStmt_4994))(s_5026.$2))]
  } else return [s_5026]
};
const opChar_5448 = c_5720 => {
  if("-"==c_5720){
    return "$mns"
  } else if("+"==c_5720){
    return "$pls"
  } else if("*"==c_5720){
    return "$mul"
  } else if("/"==c_5720){
    return "$div"
  } else if("="==c_5720){
    return "$eq"
  } else if(":"==c_5720){
    return "$col"
  } else if("&"==c_5720){
    return "$amp"
  } else if("|"==c_5720){
    return "$pip"
  } else if("<"==c_5720){
    return "$lt"
  } else if(">"==c_5720){
    return "$gt"
  } else if("^"==c_5720){
    return "$rof"
  } else return c_5720
};
const opName_5447 = op_5716 => {
  if("+"==op_5716){
    return "$add"
  } else if("-"==op_5716){
    return "$del"
  } else if("*"==op_5716){
    return "$mul"
  } else if("&&"==op_5716){
    return "$and"
  } else if("||"==op_5716){
    return "$or"
  } else if("++"==op_5716){
    return "$concat"
  } else if("new"==op_5716){
    return "$new"
  } else return ((foldl(s_5718 => c_5719 => s_5718+(opChar_5448(c_5719))))(""))(strToArray_52(op_5716))
};
const JSSeq_4828 = $_0_4862 => ({$0:$_0_4862,$tag:16});
const JSBreak_4835 = {$tag:6};
const findImports_6898 = m_6939 => {
  const importFileName_6940 = i_6941 => {
    if(i_6941.$tag==2){
      return i_6941.$1
    } else if(i_6941.$tag==1){
      return i_6941.$1
    } else if(i_6941.$tag==0){
      return i_6941.$1
    } else error("pattern match fail",i_6941)
  };
  return (map(importFileName_6940))(m_6939.$2)
};
const moduleFile_6895 = m_6914 => m_6914.$1;
const depSort_6897 = mainName_6930 => ms_6931 => {
  const modules_6932 = ((foldl(r_6935 => m_6936 => ((((insert_64($instance_465))($instance_410))(moduleFile_6895(m_6936)))(m_6936))(r_6935)))(Empty_11))(ms_6931);
  const imports_6933 = (mapTrie_68(__6937 => findImports_6898))(modules_6932);
  const ordered_6934 = ((((dfs_567($instance_410))($instance_465))(imports_6933))([]))(mainName_6930);
  return ($_16(reverse_50))((map(n_6938 => ($_16(fromJust_24))((((lookup_63($instance_465))($instance_410))(n_6938))(modules_6932))))(ordered_6934))
};
const $instance_469 = $class$Functor(f_466 => i_467 => Identity_15(f_466(i_467.$0)));
const $instance_474 = ($class$Applicative(x_470 => Identity_15(x_470)))(f_471 => x_472 => ((fmap($instance_469))(f_471.$0))(x_472));
const normalize_4121 = ms_4152 => freeVars_4153 => i_4154 => {
  if(i_4154.$tag==0){
    return error("closed imports not supported")
  } else if(i_4154.$tag==1){
    return i_4154
  } else if((i_4154.$tag==2)&&("./builtins.js"==i_4154.$1)){
    const $phi$439 = (get("./builtins.js"))(ms_4152);
    return ((ImportOpen_754(i_4154.$0))("./builtins.js"))((map(n_4165 => (Pair_3(n_4165))(n_4165)))(keys($phi$439.$0)))
  } else if(i_4154.$tag==2){
    const $phi$435 = (has(i_4154.$1))(ms_4152);
    if($phi$435){
      const $phi$437 = (get(i_4154.$1))(ms_4152);
      return ((ImportOpen_754(i_4154.$0))(i_4154.$1))((map(n_4171 => (Pair_3(n_4171))(n_4171)))(keys($phi$437.$0)))
    } else if(!$phi$435){
      return error((("no mod "+i_4154.$1)+" in ")+(jsonStringify(keys(ms_4152))))
    } else error("pattern match fail",$phi$435)
  } else error("pattern match fail",i_4154)
};
const Instance_743 = $_0_840 => $_1_841 => $_2_842 => $_3_843 => ({$0:$_0_840,$1:$_1_841,$2:$_2_842,$3:$_3_843});
const normalizeImports_4120 = ms_4122 => m_4123 => {
  const topLevelNames_4134 = (concat((map(fst_26))(m_4123.$6)))((concatMap_42(ni_4145 => (map(fst_26))(ni_4145.$1.$3)))(m_4123.$5));
  const getFromDefs_4131 = ds_4137 => ((foldl((mergeSet_48($instance_412))($instance_410)))([]))((map(v_4138 => freeVars_2026(snd_27(v_4138))))(ds_4137));
  const freeVarsInIns_4133 = ((foldl((mergeSet_48($instance_412))($instance_410)))([]))((map(ni_4139 => getFromDefs_4131(ni_4139.$1.$3)))(m_4123.$5));
  const freeVarsInDefs_4132 = getFromDefs_4131(m_4123.$6);
  const fvs_4135 = (filter(v_4151 => not_30(((contains_32($instance_410))(v_4151))(topLevelNames_4134))))((((mergeSet_48($instance_412))($instance_410))(freeVarsInDefs_4132))(freeVarsInIns_4133));
  const is2_4136 = (map((normalize_4121(ms_4122))(fvs_4135)))((enqueue((ImportAll_755(Empty_11))("./builtins.js")))(m_4123.$2));
  return ((((((Module_738(m_4123.$0))(m_4123.$1))(is2_4136))(m_4123.$3))(m_4123.$4))(m_4123.$5))(m_4123.$6)
};
const Tuple6_7 = $_0_103 => $_1_104 => $_2_105 => $_3_106 => $_4_107 => $_5_108 => ({$0:$_0_103,$1:$_1_104,$2:$_2_105,$3:$_3_106,$4:$_4_107,$5:$_5_108});
const maybe_22 = a_131 => b_132 => m_133 => {
  if(m_133.$tag==0){
    return a_131(m_133.$0)
  } else if(m_133.$tag==1){
    return b_132
  } else error("pattern match fail",m_133)
};
const mkParserState_6412 = ts_6485 => f_6486 => {
  let $phi$444;
  const $phi$445 = (getIx(0))(ts_6485);
  $phi$444 = $phi$445.$3;
  return ((((ParserState_6411(ts_6485))(0))($phi$444))(0))(f_6486)
};
const downM_782 = local$instance$Monad$0 => f_1121 => ((downAndUpM_780(local$instance$Monad$0))(f_1121))(ret(local$instance$Monad$0));
const dropExport_3918 = f_3922 => b_3923 => {
  const $phi$448 = (((getAnn_757($instance_465))($instance_410))("export"))(annOf_771(b_3923.$1));
  if($phi$448.$tag==1){
    return (ret($instance_461))(b_3923)
  } else if(($phi$448.$tag==0)&&($phi$448.$0.$tag==5)){
    return (($gt$gt$eq($instance_461))(gets_56))(ns_3927 => (($gt$gt_21($instance_461))(sets_57(((((insert_64($instance_465))($instance_410))((f_3922+"#")+$phi$448.$0.$0))(b_3923.$0))(ns_3927))))((ret($instance_461))((Pair_3(b_3923.$0))((withAnn_772((((remove_66($instance_465))($instance_410))("export"))(annOf_771(b_3923.$1))))(b_3923.$1)))))
  } else error("pattern match fail",$phi$448)
};
const importAsBindings_3920 = ens_3953 => dataAnns_3954 => i_3955 => {
  if((i_3955.$tag==1)&&("./builtins.js"==i_3955.$1)){
    return []
  } else if(i_3955.$tag==1){
    const f_3961 = p_3962 => {
      const $phi$452 = (((lookup_63($instance_465))($instance_410))((i_3955.$1+"#")+p_3962.$0))(ens_3953);
      if($phi$452.$tag==0){
        return (Pair_3(p_3962.$1))((Var_726(($_16(justOr_23(Empty_11)))((((lookup_63($instance_465))($instance_410))($phi$452.$0))(dataAnns_3954))))($phi$452.$0))
      } else if($phi$452.$tag==1){
        return error((("mod merger encountered unknown import "+i_3955.$1)+"#")+p_3962.$0)
      } else error("pattern match fail",$phi$452)
    };
    return (map(f_3961))((filter(p_3966 => (($div$eq_17($instance_410))(fst_26(p_3966)))(snd_27(p_3966))))(i_3955.$2))
  } else error("pattern match fail",i_3955)
};
const mergeInto_3919 = a_3928 => b_3929 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(dropExport_3918(a_3928.$1)))(a_3928.$6)))(bs_3937 => (($gt$gt$eq($instance_461))(gets_56))(ns_3938 => {
  const f_3940 = local$instance$Hashable$1 => local$instance$Eq$0 => r_3941 => b_3942 => {
    const $phi$456 = (((getAnn_757($instance_465))($instance_410))("data"))(annOf_771(b_3942.$1));
    if($phi$456.$tag==1){
      return r_3941
    } else if($phi$456.$tag==0){
      return ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(b_3942.$0))(((((setAnn_758($instance_465))($instance_410))("data"))($phi$456.$0))(Empty_11)))(r_3941)
    } else error("pattern match fail",$phi$456)
  };
  const dataAnns_3939 = ((foldl((f_3940($instance_465))($instance_410)))(Empty_11))(bs_3937);
  return (ret($instance_461))(((((((Module_738(a_3928.$0))(b_3929.$1))(a_3928.$2))([]))([]))([]))((concat(bs_3937))((concat((concatMap_42((importAsBindings_3920(ns_3938))(dataAnns_3939)))(b_3929.$2)))(b_3929.$6))))
}));
const optArg_6906 = (ArgBool_4755("opt"))(Just_1(false));
const sepBy_5990 = p_6029 => sp_6030 => (($lt$mul$gt($instance_6052))((pure($instance_6052))(justOr_23([]))))(opt_5991((sepBy1_5989(p_6029))(sp_6030)));
const setUid_1477 = uid_1499 => (($gt$gt$eq($instance_461))(gets_56))(s_1500 => sets_57(((CompilerState_1473(s_1500.$0))(uid_1499))(s_1500.$2)));
const getSubs_1984 = ctx_2114 => ctx_2114.$0;
const getErrorF_1992 = (($gt$gt$eq($instance_461))(gets_56))(ctx_2158 => (ret($instance_461))(ctx_2158.$3));
const unifyM_2010 = a_2314 => b_2315 => (($gt$gt$eq($instance_461))(gets_56))(ctx_2316 => (($gt$gt$eq($instance_461))(getErrorF_1992))(ef_2317 => {
  const ef2_2318 = s_2319 => ef_2317((((("unifying "+(printType_1685(a_2314)))+" and ")+(printType_1685(b_2315)))+": ")+s_2319);
  return sets_57((setSubs_1985(((composeSubs_1977(ef2_2318))(getSubs_1984(ctx_2316)))(((unify_2011(ef2_2318))(a_2314))(b_2315))))(ctx_2316))
}));
const setIntersection_82 = local$instance$Hashable$1 => local$instance$Eq$0 => a_388 => b_389 => {
  const f_390 = r_391 => k_392 => __393 => {
    const $phi$462 = (((setContains_78(local$instance$Hashable$1))(local$instance$Eq$0))(k_392))(a_388);
    if(!$phi$462){
      return r_391
    } else if($phi$462){
      return (((setAdd_75(local$instance$Hashable$1))(local$instance$Eq$0))(k_392))(r_391)
    } else error("pattern match fail",$phi$462)
  };
  return ((foldTrie_67(f_390))(Empty_11))(b_389)
};
const rewriteInstance_3180 = env_3235 => i_3236 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(d_3242 => (($gt$gt$eq($instance_461))((rewriteExpr_3179(env_3235))(d_3242.$1)))(e_3245 => (ret($instance_461))((Pair_3(d_3242.$0))(e_3245)))))(i_3236.$1.$3)))(bs_3246 => (($gt$gt$eq($instance_461))(newIdent_3178("$instance")))(insName_3247 => (ret($instance_461))((Pair_3(insName_3247))((((Instance_743(i_3236.$1.$0))(i_3236.$1.$1))(i_3236.$1.$2))(bs_3246)))));
const renameImport_3182 = er_3256 => i_3257 => {
  if((i_3257.$tag==1)&&("./builtins.js"==i_3257.$1)){
    return (ret($instance_461))((Pair_3(er_3256.$0))((push(i_3257))(er_3256.$1)))
  } else if(i_3257.$tag==1){
    const rename_3265 = er_3266 => p_3267 => (($gt$gt$eq($instance_461))(newIdent_3178(p_3267.$1)))(n_3272 => (ret($instance_461))((Pair_3(((set(p_3267.$1))(n_3272))(er_3266.$0)))((push((Pair_3(p_3267.$0))(n_3272)))(er_3266.$1))));
    return (($gt$gt$eq($instance_461))((((foldM_53($instance_461))(rename_3265))((Pair_3(er_3256.$0))([])))(i_3257.$2)))(ens_3273 => (ret($instance_461))((Pair_3(ens_3273.$0))((push(((ImportOpen_754(i_3257.$0))(i_3257.$1))(ens_3273.$1)))(er_3256.$1))))
  } else error("pattern match fail",i_3257)
};
const rewriteModule_3183 = ms_3276 => m_3277 => (($gt$gt$eq($instance_461))((((foldM_53($instance_461))(renameImport_3182))((Pair_3(empty))([])))(m_3277.$2)))(eis_3285 => (($gt$gt$eq($instance_461))((rewriteBindings_3181(eis_3285.$0))(m_3277.$6)))(ebs_3288 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(rewriteInstance_3180(ebs_3288.$0)))(m_3277.$5)))(ins_3291 => (ret($instance_461))(((((((Module_738(m_3277.$0))(m_3277.$1))(eis_3285.$1))(m_3277.$3))(m_3277.$4))(ins_3291))(ebs_3288.$1)))));
const getExports_1474 = (($gt$gt$eq($instance_461))(gets_56))(s_1486 => (ret($instance_461))(s_1486.$0));
const uniquify_3184 = m_3292 => (($gt$gt$eq($instance_461))(getUid_1476))(uid_3293 => (($gt$gt$eq($instance_461))(getExports_1474))(ex_3294 => {
  const r_3295 = (runState_58(uid_3293))((rewriteModule_3183(ex_3294))(m_3292));
  return (($gt$gt_21($instance_461))(setUid_1477(fst_26(r_3295))))((ret($instance_461))(snd_27(r_3295)))
}));
const forM_55 = local$instance$Monad$0 => xs_248 => f_249 => ((mapM_54(local$instance$Monad$0))(f_249))(xs_248);
const exportObject_5445 = bs_5684 => {
  const f_5685 = b_5686 => {
    const $phi$476 = (((getAnn_757($instance_465))($instance_410))("export"))(annOf_771(b_5686.$1));
    if($phi$476.$tag==1){
      return Nothing_2
    } else if(($phi$476.$tag==0)&&($phi$476.$0.$tag==5)){
      return Just_1((Pair_3(opName_5447($phi$476.$0.$0)))(JSRef_4812(opName_5447(b_5686.$0))))
    } else error("pattern match fail",$phi$476)
  };
  return JSObject_4822((mapJust_43(f_5685))(bs_5684))
};
const runLexer_6177 = p_6214 => s_6215 => p_6214.$0((((LexerState_6166(s_6215))(0))(0))(0));
const whitespaceP_6186 = (($lt$mul$gt($instance_6052))(mkTok_6175(WsTok_6167)))(someStr_6183(charP_6180(" \n")));
const symbolP_6190 = (($lt$mul$gt($instance_6052))(mkTok_6175(SymTok_6168)))(charP_6180("()[]{},\\"));
const notCharP_6181 = cs_6228 => parseChar_6178(c_6229 => not_30((containsChar_35(c_6229))(cs_6228)));
const anyCharP_6179 = parseChar_6178(__6225 => true);
const newLineP_6232 = (($pip$gt_5984($instance_6052))((($pip$gt_5984($instance_6052))(charP_6180("\\")))(charP_6180("n"))))((pure($instance_6052))("\n"));
const notEndOfStringP_6234 = notCharP_6181("'");
const escapeP_6233 = (($pip$gt_5984($instance_6052))(charP_6180("\\")))(anyCharP_6179);
const stringCharP_6184 = (($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))(newLineP_6232))(escapeP_6233)))(notEndOfStringP_6234);
const manyStr_6182 = p_6230 => (($lt$mul$gt($instance_6052))((pure($instance_6052))(concatStr_6176)))(many_5986(p_6230));
const stringP_6185 = (($lt$mul$gt($instance_6052))(mkTok_6175(StrTok_6170)))((($lt$pip_5985($instance_6052))((($pip$gt_5984($instance_6052))(charP_6180("'")))(manyStr_6182(stringCharP_6184))))(charP_6180("'")));
const opP_6193 = (($lt$mul$gt($instance_6052))(mkTok_6175(OpTok_6171)))(someStr_6183(charP_6180("-+*/=:&|<>^$~")));
const opIdentP_6192 = (($lt$mul$gt($instance_6052))(mkTok_6175(IdTok_6172)))((($lt$pip_5985($instance_6052))((($pip$gt_5984($instance_6052))(charP_6180("(")))(someStr_6183(charP_6180("-+*/=:&|<>^$")))))(charP_6180(")")));
const lineCommentP_6189 = (($lt$mul$gt($instance_6052))(mkTok_6175(ComTok_6173)))((($pip$gt_5984($instance_6052))((($pip$gt_5984($instance_6052))(charP_6180("/")))(charP_6180("/"))))(manyStr_6182(notCharP_6181("\n"))));
const letters_5994 = "abcdefghijklmnopqrstuvwxyz"+"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const identP_6191 = (($lt$mul$gt($instance_6052))(mkTok_6175(IdTok_6172)))((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))($concat)))(charP_6180(letters_5994+"_"))))(manyStr_6182(charP_6180((letters_5994+"0123456789")+"_"))));
const jaguarTokenP_6194 = many_5986((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))(stringP_6185))(whitespaceP_6186)))(numP_6188)))(lineCommentP_6189)))(identP_6191)))(opIdentP_6192)))(opP_6193)))(symbolP_6190));
const tokenize_6195 = runLexer_6177(jaguarTokenP_6194);
const strP_6444 = parseToken_6415(t_6644 => {
  if(t_6644.$0.$tag==3){
    return Just_1(t_6644.$1)
  } else return Nothing_2
});
const $instance_478 = ($class$Monad(pure($instance_474)))(a_475 => f_476 => f_476(a_475.$0));
const applySubsE_2025 = subs_2614 => e_2615 => {
  const f_2616 = a_2617 => e_2618 => {
    const t2_2619 = (applySubs_2008(subs_2614))(getType_773(e_2618));
    return (Pair_3(a_2617))((setType_770(t2_2619))(e_2618))
  };
  return snd_27(((down_777(f_2616))(true))(e_2615))
};
const skolemize_2018 = e_2536 => {
  const $phi$481 = getType_773(e_2536);
  if($phi$481.$tag==6){
    const subs_2541 = skolemizeSubs_2016($phi$481.$1);
    const t2_2542 = (((TForall_751($phi$481.$0))($phi$481.$1))((map(applySubsBound_2009(subs_2541)))($phi$481.$2)))((applySubs_2008(subs_2541))($phi$481.$3));
    return (applySubsE_2025(subs_2541))((setType_770(t2_2542))(e_2536))
  } else return e_2536
};
const setExports_1475 = ex_1490 => (($gt$gt$eq($instance_461))(gets_56))(s_1491 => sets_57(((CompilerState_1473(ex_1490))(s_1491.$1))(s_1491.$2)));
const addBinding_1997 = n_2175 => t_2176 => env_2177 => ((IEnv_1974(((((insert_64($instance_465))($instance_410))(n_2175))(t_2176))(env_2177.$0)))(env_2177.$1))((((setUnion_79($instance_465))($instance_410))(env_2177.$2))(freeTVars_2002(t_2176)));
const newTVarM_1982 = (($gt$gt$eq($instance_461))(gets_56))(ctx_2107 => {
  const n_2112 = "$"+(intToString(ctx_2107.$2));
  return (($gt$gt_21($instance_461))(sets_57((((ICtx_1973(ctx_2107.$0))(ctx_2107.$1))(ctx_2107.$2+1))(ctx_2107.$3))))((ret($instance_461))((TVar_746(Empty_11))(n_2112)))
});
const onError_1990 = e_2148 => (($gt$gt$eq($instance_461))(gets_56))(ctx_2149 => sets_57((((ICtx_1973(ctx_2149.$0))(ctx_2149.$1))(ctx_2149.$2))(e_2148)));
const withError_1991 = e_2154 => f_2155 => (($gt$gt$eq($instance_461))(getErrorF_1992))(old_2156 => (($gt$gt$eq($instance_461))((($gt$gt_21($instance_461))(onError_1990(e_2154)))(f_2155)))(r_2157 => (($gt$gt_21($instance_461))(onError_1990(old_2156)))((ret($instance_461))(r_2157))));
const withLocError_2013 = e_2375 => f_2376 => {
  const $phi$487 = getAnnCodeLoc_762(annOf_771(e_2375));
  if($phi$487.$tag==1){
    return f_2376
  } else if($phi$487.$tag==0){
    return (withError_1991(s_2378 => (s_2378+" ")+(printCodeLoc_764($phi$487.$0))))(f_2376)
  } else error("pattern match fail",$phi$487)
};
const unrollDataConType_2023 = t_2601 => {
  if((t_2601.$tag==3)&&((t_2601.$1.$tag==3)&&((t_2601.$1.$1.$tag==0)&&("->"==t_2601.$1.$1.$1)))){
    const $phi$490 = unrollDataConType_2023(t_2601.$2);
    return (Pair_3((enqueue(t_2601.$1.$2))($phi$490.$0)))($phi$490.$1)
  } else return (Pair_3([]))(t_2601)
};
const newTVar_1981 = ctx_2101 => {
  const n_2106 = "$"+(intToString(ctx_2101.$2));
  return (Pair_3((((ICtx_1973(ctx_2101.$0))(ctx_2101.$1))(ctx_2101.$2+1))(ctx_2101.$3)))((TVar_746(Empty_11))(n_2106))
};
const instantiate_2006 = ctx_2240 => mkvar_2241 => t_2242 => {
  if(t_2242.$tag==6){
    const f_2252 = sc_2253 => v_2254 => {
      const $phi$495 = (mkvar_2241(sc_2253.$1))(v_2254);
      return (Pair_3(((((insert_64($instance_465))($instance_410))(v_2254))($phi$495.$1))(sc_2253.$0)))($phi$495.$0)
    };
    const _sc_2247 = ((foldl(f_2252))((Pair_3(Empty_11))(ctx_2240)))(t_2242.$1);
    const ctx2_2249 = snd_27(_sc_2247);
    const subs_2248 = fst_26(_sc_2247);
    const replace_2250 = t_2259 => {
      if(t_2259.$tag==0){
        return t_2259
      } else if(t_2259.$tag==1){
        return t_2259
      } else if(t_2259.$tag==5){
        return t_2259
      } else if(t_2259.$tag==2){
        const $phi$499 = (((lookup_63($instance_465))($instance_410))(t_2259.$1))(subs_2248);
        if($phi$499.$tag==1){
          return t_2259
        } else if($phi$499.$tag==0){
          return $phi$499.$0
        } else error("pattern match fail",$phi$499)
      } else if(t_2259.$tag==3){
        return ((TApp_748(t_2259.$0))(replace_2250(t_2259.$1)))(replace_2250(t_2259.$2))
      } else if(t_2259.$tag==4){
        return ((TRow_749(t_2259.$0))((map(m_2273 => (Pair_3(replace_2250(m_2273.$0)))(replace_2250(m_2273.$1))))(t_2259.$1)))(((fmap($instance_416))(replace_2250))(t_2259.$2))
      } else if(t_2259.$tag==6){
        return error("nested universal quantification")
      } else error("pattern match fail",t_2259)
    };
    const replaceBound_2251 = b_2280 => ((TCBound_744(b_2280.$0))(b_2280.$1))(replace_2250(b_2280.$2));
    return (Pair_3((Pair_3(replace_2250(t_2242.$3)))((map(replaceBound_2251))(t_2242.$2))))(ctx2_2249)
  } else return (Pair_3((Pair_3(t_2242))([])))(ctx_2240)
};
const addBound_1986 = b_2125 => ctx_2126 => (((ICtx_1973(ctx_2126.$0))((push(b_2125))(ctx_2126.$1)))(ctx_2126.$2))(ctx_2126.$3);
const instantiateM_2005 = t_2231 => (($gt$gt$eq($instance_461))(gets_56))(ctx_2232 => {
  const $phi$503 = ((instantiate_2006(ctx_2232))(ctx_2233 => __2234 => newTVar_1981(ctx_2233)))(t_2231);
  return (($gt$gt_21($instance_461))(sets_57(((foldl(ctx_2238 => b_2239 => (addBound_1986(b_2239))(ctx_2238)))($phi$503.$1))($phi$503.$0.$1))))((ret($instance_461))($phi$503.$0.$0))
});
const getBindings_1996 = env_2171 => env_2171.$0;
const getBinding_1994 = n_2163 => env_2164 => (((lookup_63($instance_465))($instance_410))(n_2163))(env_2164.$0);
const getBindingM_1995 = n_2168 => env_2169 => (($gt$gt$eq($instance_461))(gets_56))(ctx_2170 => ($_16(ret($instance_461)))(((fmap($instance_416))(applySubs_2008(getSubs_1984(ctx_2170))))((getBinding_1994(n_2168))(env_2169))));
const f1_2003 = a_2222 => b_2223 => ((TApp_748(Empty_11))(((TApp_748(Empty_11))((TConst_745(Empty_11))("->")))(a_2222)))(b_2223);
const errorM_1989 = s_2142 => (($gt$gt$eq($instance_461))(gets_56))(ctx_2143 => error(ctx_2143.$3(s_2142)));
const addBindings_1998 = nbs_2181 => env_2182 => ((IEnv_1974((((mergeTrie_71($instance_465))($instance_410))(env_2182.$0))(nbs_2181)))(env_2182.$1))(((foldTrie_67(fvs_2186 => __2187 => t_2188 => (((setUnion_79($instance_465))($instance_410))(fvs_2186))(freeTVars_2002(t_2188))))(env_2182.$2))(nbs_2181));
const setBounds_1988 = bs_2136 => ctx_2137 => (((ICtx_1973(ctx_2137.$0))(bs_2136))(ctx_2137.$2))(ctx_2137.$3);
const getBounds_1987 = ctx_2131 => ctx_2131.$1;
const freeTVarsInEnv_1999 = env_2189 => env_2189.$2;
const generalize_2022 = env_2569 => t_2570 => (($gt$gt$eq($instance_461))(gets_56))(ctx_2571 => {
  const subs_2572 = getSubs_1984(ctx_2571);
  const envTVars_2573 = freeTVarsInEnv_1999(env_2569);
  let $phi$511;
  $phi$511 = (((foldTrie_67(s_2580 => v_2581 => __2582 => (((setUnion_79($instance_465))($instance_410))(s_2580))((justOr_23(Empty_11))(((fmap($instance_416))(freeTVars_2002))((((lookup_63($instance_465))($instance_410))(v_2581))(subs_2572.$1))))))(envTVars_2573))(envTVars_2573));
  const nonFree_2574 = $phi$511;
  const vs_2575 = (((setDiff_81($instance_465))($instance_410))(freeTVars_2002(t_2570)))(nonFree_2574);
  const processBounds_2577 = vbb_2583 => b_2584 => {
    const boundVars_2588 = freeTVarsInBound_2012(b_2584);
    const sharedVars_2589 = (((setIntersection_82($instance_465))($instance_410))(boundVars_2588))(vs_2575);
    const $phi$514 = isEmpty_70(sharedVars_2589);
    if($phi$514){
      return (Pair_3(vbb_2583.$0))((Pair_3(vbb_2583.$1.$0))((push(b_2584))(vbb_2583.$1.$1)))
    } else if(!$phi$514){
      const $phi$516 = (($eq$eq($instance_409))(size_69(sharedVars_2589)))(size_69(boundVars_2588));
      if($phi$516){
        return (Pair_3(vbb_2583.$0))((Pair_3((push(b_2584))(vbb_2583.$1.$0)))(vbb_2583.$1.$1))
      } else if(!$phi$516){
        return (Pair_3((((setUnion_79($instance_465))($instance_410))(vbb_2583.$0))(sharedVars_2589)))((Pair_3(vbb_2583.$1.$0))((push(b_2584))(vbb_2583.$1.$1)))
      } else error("pattern match fail",$phi$516)
    } else error("pattern match fail",$phi$514)
  };
  const vbb_2576 = ((foldl(processBounds_2577))((Pair_3(Empty_11))((Pair_3([]))([]))))(getBounds_1987(ctx_2571));
  const finalVars_2593 = (((setDiff_81($instance_465))($instance_410))(vs_2575))(vbb_2576.$0);
  const drop_2594 = local$instance$Hashable$1 => local$instance$Eq$0 => r_2596 => v_2597 => t_2598 => {
    const $phi$519 = ($_16(isEmpty_70))((((setIntersection_82($instance_465))($instance_410))(finalVars_2593))(freeTVars_2002(t_2598)));
    if($phi$519){
      return ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(v_2597))(t_2598))(r_2596)
    } else if(!$phi$519){
      return r_2596
    } else error("pattern match fail",$phi$519)
  };
  let $phi$520;
  $phi$520 = ((Subs_1972(subs_2572.$0))(((foldTrie_67((drop_2594($instance_465))($instance_410)))(Empty_11))(subs_2572.$1)));
  const subs2_2595 = $phi$520;
  let $phi$521;
  const $phi$522 = (($_16(not_30))(isEmpty_70(finalVars_2593)))||((($gt_18($instance_411))(length(vbb_2576.$1.$0)))(0));
  if($phi$522){
    $phi$521 = ((ret($instance_461))((((mkTForall_2004(Empty_11))(setToArray_80(finalVars_2593)))(vbb_2576.$1.$0))(t_2570)))
  } else if(!$phi$522){
    $phi$521 = ((ret($instance_461))(t_2570))
  } else error("pattern match fail",$phi$522);
  return (($gt$gt_21($instance_461))(sets_57((setBounds_1988(vbb_2576.$1.$1))((setSubs_1985(subs2_2595))(ctx_2571)))))($phi$521)
});
const dropSatisfiedBounds_2019 = env_2544 => (($gt$gt$eq($instance_461))(gets_56))(ctx_2545 => {
  const is_2546 = getInstances_2001(env_2544);
  const bs_2547 = getBounds_1987(ctx_2545);
  const bs2_2548 = (filter(b_2549 => not_30((exists_36(i_2550 => (satisfiesBound_2033(i_2550))(b_2549)))(is_2546))))(bs_2547);
  return sets_57((setBounds_1988(bs2_2548))(ctx_2545))
});
const applySubsDef_2024 = d_2610 => (($gt$gt$eq($instance_461))(gets_56))(ctx_2613 => ($_16(ret($instance_461)))((Pair_3(d_2610.$0))((applySubsE_2025(getSubs_1984(ctx_2613)))(d_2610.$1))));
const infer_2014 = env_2379 => e_2380 => {
  const inferPat_2383 = env_2401 => te_2402 => pat_2403 => {
    if(pat_2403.$tag==0){
      return (($gt$gt$eq($instance_461))(newTVarM_1982))(tv_2406 => (($gt$gt_21($instance_461))((unifyM_2010(te_2402))(tv_2406)))((ret($instance_461))((Pair_3(((((insert_64($instance_465))($instance_410))(pat_2403.$1))(tv_2406))(Empty_11)))((PVar_735((setAnnType_761(tv_2406))(pat_2403.$0)))(pat_2403.$1)))))
    } else if((pat_2403.$tag==1)&&(pat_2403.$1.$tag==0)){
      return (($gt$gt_21($instance_461))((unifyM_2010(te_2402))((TConst_745(Empty_11))("Number"))))((ret($instance_461))((Pair_3(Empty_11))(pat_2403)))
    } else if((pat_2403.$tag==1)&&(pat_2403.$1.$tag==1)){
      return (($gt$gt_21($instance_461))((unifyM_2010(te_2402))((TConst_745(Empty_11))("String"))))((ret($instance_461))((Pair_3(Empty_11))(pat_2403)))
    } else if(pat_2403.$tag==2){
      return (($gt$gt$eq($instance_461))((getBindingM_1995(pat_2403.$1))(env_2401)))(bt_2414 => {
        if(bt_2414.$tag==1){
          return error("unknown data type "+pat_2403.$1)
        } else if(bt_2414.$tag==0){
          return (($gt$gt$eq($instance_461))(instantiateM_2005(bt_2414.$0)))(t_2416 => {
            const $phi$527 = unrollDataConType_2023(t_2416);
            const $phi$529 = (($eq$eq($instance_409))(length(pat_2403.$2)))(length($phi$527.$0));
            if(!$phi$529){
              return errorM_1989("number of pattern params does not match the number of constructor params")
            } else if($phi$529){
              return (($gt$gt$eq($instance_461))((((foldM_53($instance_461))(inferSubPat_2384(env_2401)))((Pair_3(Empty_11))([])))((zip_41(pat_2403.$2))($phi$527.$0))))(bps_2419 => (($gt$gt_21($instance_461))((unifyM_2010(te_2402))($phi$527.$1)))(($_16(ret($instance_461)))((Pair_3(bps_2419.$0))(((PData_737(pat_2403.$0))(pat_2403.$1))(bps_2419.$1)))))
            } else error("pattern match fail",$phi$529)
          })
        } else error("pattern match fail",bt_2414)
      })
    } else error("pattern match fail",pat_2403)
  };
  const inferSubPat_2384 = env_2422 => bp_2423 => pt_2424 => (($gt$gt$eq($instance_461))(((inferPat_2383(env_2422))(pt_2424.$1))(pt_2424.$0)))(bp_2429 => ($_16(ret($instance_461)))((Pair_3((((mergeTrie_71($instance_465))($instance_410))(bp_2423.$0))(bp_2429.$0)))((push(bp_2429.$1))(bp_2423.$1))));
  const inferCase_2382 = env_2392 => te_2393 => p_2394 => (($gt$gt$eq($instance_461))(((inferPat_2383(env_2392))(te_2393))(p_2394.$0)))(cb_2397 => (($gt$gt$eq($instance_461))((infer_2014((addBindings_1998(cb_2397.$0))(env_2392)))(p_2394.$1)))(e_2400 => (ret($instance_461))((Pair_3(cb_2397.$1))(e_2400))));
  const setFinalType_2381 = t_2385 => e_2386 => {
    const $phi$537 = getType_773(e_2386);
    if($phi$537.$tag==7){
      return (ret($instance_461))((setType_770(t_2385))(e_2386))
    } else if($phi$537.$tag==6){
      return (ret($instance_461))(e_2386)
    } else return (($gt$gt_21($instance_461))((unifyM_2010(t_2385))($phi$537)))((ret($instance_461))(e_2386))
  };
  let $phi$538;
  if((e_2380.$tag==1)&&(e_2380.$1.$tag==0)){
    $phi$538 = ((setFinalType_2381((TConst_745(Empty_11))("Number")))(e_2380))
  } else if((e_2380.$tag==1)&&(e_2380.$1.$tag==1)){
    $phi$538 = ((setFinalType_2381((TConst_745(Empty_11))("String")))(e_2380))
  } else if(e_2380.$tag==0){
    $phi$538 = ((($gt$gt$eq($instance_461))((getBindingM_1995(e_2380.$1))(env_2379)))(vt_2438 => {
      if(vt_2438.$tag==1){
        return errorM_1989((("unknown identifier "+e_2380.$1)+", env: ")+(jsonStringify(($_16(trieKeys_72))(getBindings_1996(env_2379)))))
      } else if(vt_2438.$tag==0){
        return (($gt$gt$eq($instance_461))(instantiateM_2005(vt_2438.$0)))(t_2440 => (setFinalType_2381(t_2440))(e_2380))
      } else error("pattern match fail",vt_2438)
    }))
  } else if(e_2380.$tag==3){
    $phi$538 = ((($gt$gt$eq($instance_461))(newTVarM_1982))(tv_2444 => (($gt$gt$eq($instance_461))((infer_2014(((addBinding_1997(e_2380.$1))(tv_2444))(env_2379)))(e_2380.$2)))(a_2445 => (setFinalType_2381(((TApp_748(Empty_11))(((TApp_748(Empty_11))((TConst_745(Empty_11))("->")))(tv_2444)))(getType_773(a_2445))))(((Lam_729(e_2380.$0))(e_2380.$1))(a_2445)))))
  } else if(e_2380.$tag==2){
    $phi$538 = ((($gt$gt$eq($instance_461))(newTVarM_1982))(tv_2449 => (($gt$gt$eq($instance_461))((infer_2014(env_2379))(e_2380.$1)))(f_2450 => (($gt$gt$eq($instance_461))((infer_2014(env_2379))(e_2380.$2)))(a_2451 => {
      const synth_2452 = (f1_2003(getType_773(a_2451)))(tv_2449);
      return (($gt$gt_21($instance_461))((unifyM_2010(getType_773(f_2450)))(synth_2452)))((setFinalType_2381(tv_2449))(((App_728(e_2380.$0))(f_2450))(a_2451)))
    }))))
  } else if(e_2380.$tag==4){
    $phi$538 = ((($gt$gt$eq($instance_461))((infer_2014(env_2379))(e_2380.$1)))(e_2456 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))((inferCase_2382(env_2379))(getType_773(e_2456))))(e_2380.$2)))(ps_2457 => {
      const t_2458 = getType_773(snd_27(head_44(ps_2457)));
      return (($gt$gt_21($instance_461))(((mapM_54($instance_461))(p_2459 => (unifyM_2010(t_2458))(($_16(getType_773))(snd_27(p_2459)))))(tail_45(ps_2457))))((setFinalType_2381(t_2458))(((Case_730(e_2380.$0))(e_2456))(ps_2457)))
    })))
  } else if(e_2380.$tag==5){
    $phi$538 = ((($gt$gt$eq($instance_461))((inferDefs_2021(env_2379))(e_2380.$1)))(ds_2463 => {
      const env2_2464 = ((foldl(env_2465 => d_2466 => ((addBinding_1997(d_2466.$0))(getType_773(d_2466.$1)))(env_2465)))(env_2379))(ds_2463);
      return (($gt$gt$eq($instance_461))((infer_2014(env2_2464))(e_2380.$2)))(e_2469 => (setFinalType_2381(getType_773(e_2469)))(((Let_731(e_2380.$0))(ds_2463))(e_2469)))
    }))
  } else if((e_2380.$tag==6)&&("Array"==e_2380.$1)){
    $phi$538 = ((($gt$gt$eq($instance_461))(((mapM_54($instance_461))(infer_2014(env_2379)))(e_2380.$2)))(es_2472 => (($gt$gt$eq($instance_461))(newTVarM_1982))(tv_2473 => (($gt$gt_21($instance_461))(((mapM_54($instance_461))(e_2474 => (unifyM_2010(tv_2473))(getType_773(e_2474))))(es_2472)))((setFinalType_2381(((TApp_748(Empty_11))((TConst_745(Empty_11))("Array")))(tv_2473)))(((New_732(e_2380.$0))("Array"))(es_2472))))))
  } else if(e_2380.$tag==6){
    $phi$538 = ((($gt$gt$eq($instance_461))(((mapM_54($instance_461))(infer_2014(env_2379)))(e_2380.$2)))(es_2478 => (($gt$gt$eq($instance_461))((getBindingM_1995(e_2380.$1))(env_2379)))(t_2479 => {
      if(t_2479.$tag==1){
        return error("unknown data constructor "+e_2380.$1)
      } else if(t_2479.$tag==0){
        return (($gt$gt$eq($instance_461))(instantiateM_2005(t_2479.$0)))(t_2481 => {
          const $phi$541 = unrollDataConType_2023(t_2481);
          const $phi$543 = (($eq$eq($instance_409))(length(es_2478)))(length($phi$541.$0));
          if(!$phi$543){
            return errorM_1989((("number of New args does not match the number of constructor params "+(jsonStringify(es_2478)))+" ")+(printType_1685(t_2481)))
          } else if($phi$543){
            return (($gt$gt_21($instance_461))(((mapM_54($instance_461))(p_2484 => (unifyM_2010(p_2484.$0))(getType_773(p_2484.$1))))((zip_41($phi$541.$0))(es_2478))))((setFinalType_2381($phi$541.$1))(((New_732(e_2380.$0))(e_2380.$1))(es_2478)))
          } else error("pattern match fail",$phi$543)
        })
      } else error("pattern match fail",t_2479)
    })))
  } else $phi$538 = (error("type inference not supported for this AST node"));
  return ($_16(withLocError_2013(e_2380)))($phi$538)
};
const inferSccDefs_2015 = env_2488 => ds_2489 => {
  const unifyDef_2492 = env_2503 => d_2504 => {
    const $phi$549 = getType_773(d_2504.$1);
    if($phi$549.$tag==6){
      return (ret($instance_461))(Unit_0)
    } else return (unifyM_2010($phi$549))(($_16(fromJust_24))((getBinding_1994(d_2504.$0))(env_2503)))
  };
  const generateTVar_2490 = env_2494 => d_2495 => {
    const $phi$551 = getType_773(snd_27(d_2495));
    if($phi$551.$tag==7){
      return (($gt$gt$eq($instance_461))(newTVarM_1982))(tv_2496 => (ret($instance_461))(((addBinding_1997(fst_26(d_2495)))(tv_2496))(env_2494)))
    } else return (ret($instance_461))(((addBinding_1997(fst_26(d_2495)))($phi$551))(env_2494))
  };
  const inferDef_2491 = env_2498 => d_2499 => (($gt$gt$eq($instance_461))((infer_2014(env_2498))(d_2499.$1)))(e_2502 => (ret($instance_461))((Pair_3(d_2499.$0))(e_2502)));
  const generalizeDef_2493 = env_2512 => d_2513 => {
    const $phi$555 = getType_773(d_2513.$1);
    if($phi$555.$tag==6){
      return (ret($instance_461))(d_2513)
    } else return (($gt$gt$eq($instance_461))((generalize_2022(env_2512))($phi$555)))(t_2521 => {
      const e2_2522 = skolemize_2018((setType_770(t_2521))(d_2513.$1));
      return (ret($instance_461))((Pair_3(d_2513.$0))(e2_2522))
    })
  };
  return (($gt$gt$eq($instance_461))((((foldM_53($instance_461))(generateTVar_2490))(env_2488))(ds_2489)))(env2_2523 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(inferDef_2491(env2_2523)))(ds_2489)))(ds2_2524 => (($gt$gt$eq($instance_461))((($gt$gt_21($instance_461))(((mapM_54($instance_461))(unifyDef_2492(env2_2523)))(ds2_2524)))(((mapM_54($instance_461))(applySubsDef_2024))(ds2_2524))))(ds3_2525 => (($gt$gt_21($instance_461))(dropSatisfiedBounds_2019(env_2488)))(((mapM_54($instance_461))(generalizeDef_2493(env_2488)))(ds3_2525)))))
};
const inferDefs_2021 = env_2562 => ds_2563 => {
  const infer_2564 = rs_2565 => ds_2566 => ((fmap($instance_441))(concat(rs_2565)))((inferSccDefs_2015(((foldl(env_2567 => r_2568 => ((addBinding_1997(fst_26(r_2568)))(getType_773(snd_27(r_2568))))(env_2567)))(env_2562))(rs_2565)))(ds_2566));
  return (((foldM_53($instance_461))(infer_2564))([]))(bindingsScc_2020(ds_2563))
};
const emptyEnv_1993 = ((IEnv_1974(Empty_11))([]))(Empty_11);
const skolemizeType_2017 = t_2529 => {
  if(t_2529.$tag==6){
    const subs_2534 = skolemizeSubs_2016(t_2529.$1);
    return (((TForall_751(t_2529.$0))(t_2529.$1))((map(applySubsBound_2009(subs_2534)))(t_2529.$2)))((applySubs_2008(subs_2534))(t_2529.$3))
  } else return t_2529
};
const classToBindings_2029 = c_2697 => {
  const process_2702 = b_2703 => {
    const ftv_2706 = freeTVars_2002(b_2703.$1);
    const $phi$560 = (((setContains_78($instance_465))($instance_410))(c_2697.$2))(ftv_2706);
    if(!$phi$560){
      return error((("invalid clas definition "+c_2697.$1)+", binding ")+b_2703.$0)
    } else if($phi$560){
      return (Pair_3(b_2703.$0))(skolemizeType_2017((((mkTForall_2004(Empty_11))(setToArray_80(ftv_2706)))([((TCBound_744(Empty_11))(c_2697.$1))((TVar_746(Empty_11))(c_2697.$2))]))(b_2703.$1)))
    } else error("pattern match fail",$phi$560)
  };
  return (map(process_2702))(c_2697.$3)
};
const newCtx_1983 = (((ICtx_1973(emptySubs_1976))([]))(1))(s_2113 => "unknown error context: "+s_2113);
const instanceToTypeBound_2028 = i_2692 => ((TCBound_744(Empty_11))(i_2692.$1))(i_2692.$2);
const inferInstance_2027 = env_2663 => cs_2664 => i_2665 => {
  const inferE_2666 = e_2667 => {
    const $phi$563 = ($_16(runState_58(newCtx_1983)))((infer_2014(env_2663))(e_2667));
    return (applySubsE_2025(getSubs_1984($phi$563.$0)))($phi$563.$1)
  };
  const $phi$567 = (find_33(c_2674 => (($eq$eq($instance_410))(i_2665.$1))(c_2674.$1)))(cs_2664);
  if($phi$567.$tag==1){
    return error("Cannot find clas "+i_2665.$1)
  } else if($phi$567.$tag==0){
    const bs2_2683 = ((foldl(bs_2685 => b_2686 => ((((insert_64($instance_465))($instance_410))(b_2686.$0))(((substitute_2007($phi$567.$0.$2))(i_2665.$2))(b_2686.$1)))(bs_2685)))(Empty_11))($phi$567.$0.$3);
    const ds2_2684 = (map(d_2689 => (Pair_3(d_2689.$0))(inferE_2666((setType_770(($_16(fromJust_24))((((lookup_63($instance_465))($instance_410))(d_2689.$0))(bs2_2683))))(d_2689.$1)))))(i_2665.$3);
    return (((Instance_743(i_2665.$0))(i_2665.$1))(i_2665.$2))(ds2_2684)
  } else error("pattern match fail",$phi$567)
};
const addInstance_2000 = b_2193 => env_2194 => ((IEnv_1974(env_2194.$0))((push(b_2193))(env_2194.$1)))(env_2194.$2);
const inferTypeModule_2030 = ms_2707 => m_2708 => {
  const checkForUnsatisfiedBounds_2713 = d_2742 => {
    const $phi$572 = getType_773(snd_27(d_2742));
    if($phi$572.$tag==6){
      if(($phi$572.$3.$tag==3)&&(($phi$572.$3.$1.$tag==3)&&(($phi$572.$3.$1.$1.$tag==0)&&("->"==$phi$572.$3.$1.$1.$1)))){
        return d_2742
      } else {
        const $phi$575 = length($phi$572.$2);
        if(0==$phi$575){
          return d_2742
        } else return error((("unsatisfied bounds in def of "+(fst_26(d_2742)))+" :: ")+(printType_1685(getType_773(snd_27(d_2742)))))
      }
    } else return d_2742
  };
  const addIns_2712 = env_2740 => i_2741 => (addInstance_2000(instanceToTypeBound_2028(snd_27(i_2741))))(env_2740);
  const addClass_2711 = env_2736 => c_2737 => ((foldl(env_2738 => b_2739 => ((addBinding_1997(fst_26(b_2739)))(snd_27(b_2739)))(env_2738)))(env_2736))(classToBindings_2029(c_2737));
  const getFile_2709 = i_2714 => {
    if(i_2714.$tag==1){
      return i_2714.$1
    } else error("pattern match fail",i_2714)
  };
  const addImports_2710 = env_2718 => i_2719 => {
    const $phi$578 = (get(getFile_2709(i_2719)))(ms_2707);
    let $phi$579;
    if(i_2719.$tag==1){
      $phi$579 = (((foldl(env_2729 => n_2730 => ((addBinding_1997(n_2730.$1))((get(n_2730.$0))($phi$578.$0)))(env_2729)))(env_2718))(i_2719.$2))
    } else error("pattern match fail",i_2719);
    const env2_2723 = $phi$579;
    const env3_2724 = ((foldl(addClass_2711))(env2_2723))($phi$578.$1);
    const env4_2725 = ((foldTrie_67(env_2733 => __2734 => i_2735 => (addInstance_2000(i_2735))(env_2733)))(env3_2724))($phi$578.$2);
    return env4_2725
  };
  const env2_2763 = ((foldl(addImports_2710))(emptyEnv_1993))(m_2708.$2);
  const env3_2764 = ((foldl(addClass_2711))(env2_2763))(m_2708.$4);
  const env4_2765 = ((foldl(addIns_2712))(env3_2764))(m_2708.$5);
  const ds2_2766 = (evalState_59(newCtx_1983))((inferDefs_2021(env4_2765))(m_2708.$6));
  const ds3_2767 = (map(checkForUnsatisfiedBounds_2713))(ds2_2766);
  const env5_2768 = ((foldl(env_2770 => d_2771 => ((addBinding_1997(d_2771.$0))(getType_773(d_2771.$1)))(env_2770)))(env4_2765))(ds3_2767);
  const allCls_2774 = (concat(m_2708.$4))((concatMap_42(i_2775 => {
    const $phi$584 = (get(getFile_2709(i_2775)))(ms_2707);
    return $phi$584.$1
  }))(m_2708.$2));
  const ins2_2769 = (map(mapSnd_86((inferInstance_2027(env5_2768))(allCls_2774))))(m_2708.$5);
  return ((((((Module_738(m_2708.$0))(m_2708.$1))(m_2708.$2))(m_2708.$3))(m_2708.$4))(ins2_2769))(ds3_2767)
};
const getTypedExports_2031 = m_2779 => {
  const collectExports_2787 = es_2789 => b_2790 => {
    const e_2791 = snd_27(b_2790);
    const $phi$587 = (((getAnn_757($instance_465))($instance_410))("export"))(annOf_771(e_2791));
    if($phi$587.$tag==1){
      return es_2789
    } else if(($phi$587.$tag==0)&&($phi$587.$0.$tag==5)){
      return ((set($phi$587.$0.$0))(getType_773(e_2791)))(es_2789)
    } else error("pattern match fail",$phi$587)
  };
  const bs_2788 = ((foldl(collectExports_2787))(empty))(m_2779.$6);
  return ((ModuleInterface_739(bs_2788))(m_2779.$4))(((foldl(m_2793 => p_2794 => ((((insert_64($instance_465))($instance_410))(p_2794.$0))(instanceToTypeBound_2028(p_2794.$1)))(m_2793)))(Empty_11))(m_2779.$5))
};
const typerPass_6910 = m_6996 => (($gt$gt$eq($instance_461))(getExports_1474))(es_6997 => {
  const typed_6998 = (inferTypeModule_2030(es_6997))(m_6996);
  const e_6999 = getTypedExports_2031(typed_6998);
  return (($gt$gt_21($instance_461))(setExports_1475(((set(moduleFile_6895(m_6996)))(e_6999))(es_6997))))((ret($instance_461))(typed_6998))
});
const ArgString_4756 = $_0_4765 => $_1_4766 => ({$0:$_0_4765,$1:$_1_4766,$tag:1});
const outPathArg_6903 = (ArgString_4756("out"))(Nothing_2);
const builtinsPathArg_6902 = (ArgString_4756("builtins"))(Nothing_2);
const profileArg_6905 = (ArgBool_4755("profile"))(Just_1(false));
const mainArg_6904 = (ArgString_4756("main"))(Nothing_2);
const argDefs_6907 = [builtinsPathArg_6902,outPathArg_6903,mainArg_6904,profileArg_6905,optArg_6906];
const mkConFun_2982 = tag_3006 => dt_3007 => vs_3008 => n_3009 => ts_3010 => {
  const nts_3011 = (map(it_3017 => (Pair_3("$_"+(intToString(fst_26(it_3017)))))(snd_27(it_3017))))(zipWithIndex_40(ts_3010));
  const new_3012 = (setType_770(dt_3007))(((New_732(Empty_11))(n_3009))((map(nt_3018 => (Var_726(Empty_11))(fst_26(nt_3018))))(nts_3011)));
  const mkCon_3013 = r_3019 => nt_3020 => (setType_770(((TApp_748(Empty_11))(((TApp_748(Empty_11))((TConst_745(Empty_11))("->")))(nt_3020.$1)))(getType_773(r_3019))))(((Lam_729(Empty_11))(nt_3020.$0))(r_3019));
  const con_3014 = ((foldr(mkCon_3013))(new_3012))(nts_3011);
  const conT_3015 = (((TForall_751(Empty_11))(vs_3008))([]))(getType_773(con_3014));
  const ann_3016 = ((((setAnn_758($instance_465))($instance_410))("export"))(AnnExport_725(n_3009)))(((((setAnn_758($instance_465))($instance_410))("type"))(AnnType_720(conT_3015)))(((((setAnn_758($instance_465))($instance_410))("data"))(AnnData_723(tag_3006)))(Empty_11)));
  return (Pair_3(n_3009))(skolemize_2018((withAnn_772(ann_3016))(con_3014)))
};
const rewriteData_2981 = d_2991 => {
  const dt_2996 = ((foldl(r_2998 => v_2999 => ((TApp_748(Empty_11))(r_2998))((TVar_746(Empty_11))(v_2999))))((TConst_745(Empty_11))(d_2991.$1)))(d_2991.$2);
  const rewriteCon_2997 = c_3000 => {
    let $phi$591;
    const $phi$592 = length(d_2991.$3);
    if(1==$phi$592){
      $phi$591 = Nothing_2
    } else $phi$591 = (Just_1(fst_26(c_3000)));
    const tag_3001 = $phi$591;
    const $phi$594 = snd_27(c_3000);
    return ((((mkConFun_2982(tag_3001))(dt_2996))(d_2991.$2))($phi$594.$1))($phi$594.$2)
  };
  return (map(rewriteCon_2997))(zipWithIndex_40(d_2991.$3))
};
const translateAdts_2980 = m_2983 => ((((((Module_738(m_2983.$0))(m_2983.$1))(m_2983.$2))([]))(m_2983.$4))(m_2983.$5))((concat((concatMap_42(rewriteData_2981))(m_2983.$3)))(m_2983.$6));
const reportTimes_1482 = i_1521 => (($gt$gt$eq($instance_461))(gets_56))(s_1522 => {
  const report_1526 = i_1527 => n_1528 => ts_1529 => {
    const total_1531 = ((foldl($add))(0))(ts_1529);
    const count_1530 = length(ts_1529);
    const msg_1532 = ((((("# pass <"+n_1528)+"> executed ")+(intToString(count_1530)))+" times, total runtime ")+(intToString(total_1531)))+"ms";
    return (debug2_83(msg_1532))(i_1527)
  };
  return (ret($instance_461))(((foldTrie_67(report_1526))(i_1521))(s_1522.$2))
});
const perModule_1478 = local$instance$Monad$0 => mapM_54(local$instance$Monad$0);
const filterWhitespaceAndComments_6413 = filter(t_6491 => {
  if(t_6491.$0.$tag==0){
    return false
  } else if(t_6491.$0.$tag==6){
    return false
  } else return true
});
const runParser_6414 = p_6499 => s_6500 => f_6501 => {
  const $phi$599 = tokenize_6195(s_6500);
  if($phi$599.$tag==0){
    return (applyParser_5983(p_6499))((mkParserState_6412(filterWhitespaceAndComments_6413($phi$599.$0)))(f_6501))
  } else if($phi$599.$tag==1){
    return Error_5981($phi$599.$0)
  } else error("pattern match fail",$phi$599)
};
const importOpenP_6468 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(ns_6682 => f_6683 => ((ImportOpen_754(Empty_11))(f_6683))(ns_6682))))((($lt$pip_5985($instance_6052))((($pip$gt_5984($instance_6052))(symP_6420("{")))((sepBy1_5989((($lt$pip$gt($instance_6062))(importAliasP_6467))(importNoAliasP_6466)))(symP_6420(",")))))(symP_6420("}")))))((($pip$gt_5984($instance_6052))(reservedP_6423("from")))(strP_6444));
const importAllP_6469 = (($lt$mul$gt($instance_6052))((pure($instance_6052))(ImportAll_755(Empty_11))))((($pip$gt_5984($instance_6052))((($pip$gt_5984($instance_6052))(operatorP_6421("*")))(reservedP_6423("from"))))(strP_6444));
const importP_6470 = (($pip$gt_5984($instance_6052))(reservedP_6423("import")))((($lt$pip$gt($instance_6062))(importOpenP_6468))(importAllP_6469));
const $pip$mns$gt_6418 = pa_6558 => pb_6559 => ($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((pure($instance_6052))(__6560 => b_6561 => b_6561)))(pa_6558)))(pb_6559);
const classP_6461 = ($lt$mul$mns$gt_6417(($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((pure($instance_6052))(name_6675 => tv_6676 => maybeDefs_6677 => (((Class_742(Empty_11))(name_6675))(tv_6676))((justOr_23([]))(maybeDefs_6677)))))(($pip$mns$gt_6418(reservedP_6423("class")))(upperCaseId_6425))))(notUpperCaseId_6426)))(opt_5991((($pip$gt_5984($instance_6052))(reservedP_6423("where")))(some_5987(classMemberP_6462))));
const anyOpP_6422 = parseToken_6415(t_6574 => {
  if(t_6574.$0.$tag==4){
    return Just_1(t_6574.$1)
  } else return Nothing_2
});
const cstrP_6432 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(Const_727)))(locP_6416)))(parseToken_6415(t_6613 => {
  if(t_6613.$0.$tag==3){
    return Just_1(CStr_734(t_6613.$1))
  } else return Nothing_2
}));
const cnumP_6431 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(Const_727)))(locP_6416)))(parseToken_6415(t_6608 => {
  if(t_6608.$0.$tag==2){
    return Just_1(CNum_733(unsafeStringToInt(t_6608.$1)))
  } else return Nothing_2
}));
const constP_6433 = (($lt$pip$gt($instance_6062))(cstrP_6432))(cnumP_6431);
const varP_6430 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(Var_726)))(locP_6416)))(parseToken_6415(t_6603 => {
  if(t_6603.$0.$tag==5){
    const $phi$605 = ((contains_32($instance_410))(t_6603.$1))(reserved_6419);
    if($phi$605){
      return Nothing_2
    } else if(!$phi$605){
      return Just_1(t_6603.$1)
    } else error("pattern match fail",$phi$605)
  } else return Nothing_2
}));
const withLocOf_6429 = e_6602 => withLocAnn_6428(($_16(fromJust_24))((((getAnn_757($instance_465))($instance_410))("codeLoc"))(annOf_771(e_6602))));
const exprP_6434 = Parser_5982(s_6618 => (applyParser_5983(opP_6454))(s_6618));
const arrayLitP_6435 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(ann_6619 => xs_6620 => ((New_732(ann_6619))("Array"))(xs_6620))))(locP_6416)))((($lt$pip_5985($instance_6052))((($pip$gt_5984($instance_6052))(symP_6420("[")))((sepBy_5990(exprP_6434))(symP_6420(",")))))(symP_6420("]")));
const f_6621 = ann_6622 => e_6623 => es_6624 => {
  let $phi$606;
  const $phi$607 = length(es_6624);
  if(1==$phi$607){
    $phi$606 = "Pair"
  } else if(2==$phi$607){
    $phi$606 = "Tuple3"
  } else if(3==$phi$607){
    $phi$606 = "Tuple4"
  } else if(4==$phi$607){
    $phi$606 = "Tuple5"
  } else if(5==$phi$607){
    $phi$606 = "Tuple6"
  } else error("pattern match fail",$phi$607);
  const cons_6625 = $phi$606;
  return ((foldl(App_728(ann_6622)))(((App_728(ann_6622))((Var_726(ann_6622))(cons_6625)))(e_6623)))(es_6624)
};
const tupleLitP_6436 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(f_6621)))(locP_6416)))((($pip$gt_5984($instance_6052))(symP_6420("(")))((($lt$pip_5985($instance_6052))(exprP_6434))(symP_6420(","))))))((($lt$pip_5985($instance_6052))((sepBy1_5989(exprP_6434))(symP_6420(","))))(symP_6420(")")));
const simpleExprP_6437 = (($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))(varP_6430))(constP_6433)))(arrayLitP_6435)))(tupleLitP_6436)))(parenP_6427(exprP_6434));
const appP_6438 = ($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((pure($instance_6052))(foldl(f_6626 => a_6627 => ((App_728(withLocOf_6429(f_6626)))(f_6626))(a_6627)))))((($lt$pip$gt($instance_6062))(varP_6430))(parenP_6427(exprP_6434)))))(many_5986(simpleExprP_6437));
const lamP_6439 = ($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(l_6628 => ps_6629 => a_6630 => ((foldr(a_6631 => p_6632 => ((Lam_729(l_6628))(p_6632))(a_6631)))(a_6630))(ps_6629))))(locP_6416)))(($pip$mns$gt_6418(symP_6420("\\")))(some_5987(notUpperCaseId_6426)))))((($pip$gt_5984($instance_6052))(operatorP_6421("->")))(exprP_6434));
const ofP_6449 = ($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((pure($instance_6052))(Pair_3)))(patP_6440)))((($pip$gt_5984($instance_6052))(operatorP_6421("->")))(exprP_6434));
const caseP_6450 = ($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(Case_730)))(locP_6416)))(($pip$mns$gt_6418(reservedP_6423("case")))(simpleExprP_6437))))((($pip$gt_5984($instance_6052))(reservedP_6423("of")))(some_5987(ofP_6449)));
const defP_6451 = ($lt$mul$mns$gt_6417(($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(l_6654 => n_6655 => ps_6656 => e_6657 => (Pair_3(n_6655))(((foldr(e_6658 => p_6659 => ((Lam_729(l_6654))(p_6659))(e_6658)))(e_6657))(ps_6656)))))(locP_6416)))(notUpperCaseId_6426)))(many_5986(notUpperCaseId_6426))))((($pip$gt_5984($instance_6052))(operatorP_6421("=")))(exprP_6434));
const letP_6452 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(Let_731)))(locP_6416)))(($pip$mns$gt_6418(reservedP_6423("let")))(some_5987(defP_6451)))))(($pip$mns$gt_6418(reservedP_6423("in")))(exprP_6434));
const primaryExprP_6453 = (($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))((($lt$pip$gt($instance_6062))(appP_6438))(constP_6433)))(lamP_6439)))(caseP_6450)))(letP_6452)))(arrayLitP_6435)))(tupleLitP_6436);
const opP_6454 = ($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((pure($instance_6052))(e_6660 => oes_6661 => ((foldl(a_6662 => lob_6663 => ((App_728(lob_6663.$0))(((App_728(lob_6663.$0))((Var_726(lob_6663.$0))(lob_6663.$1.$0)))(a_6662)))(lob_6663.$1.$1)))(e_6660))(oes_6661))))(primaryExprP_6453)))(many_5986((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(l_6667 => op_6668 => e_6669 => (Pair_3(l_6667))((Pair_3(op_6668))(e_6669)))))(locP_6416)))(anyOpP_6422)))(primaryExprP_6453)));
const addExportAnn_6700 = d_6701 => (Pair_3(d_6701.$0))((withAnn_772(((((setAnn_758($instance_465))($instance_410))("export"))(AnnExport_725(d_6701.$0)))(annOf_771(d_6701.$1))))(d_6701.$1));
const topLevelDef_6474 = (($lt$mul$gt($instance_6052))((pure($instance_6052))(addExportAnn_6700)))(defP_6451);
const instanceP_6463 = ($lt$mul$mns$gt_6417(($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((pure($instance_6052))(name_6678 => t_6679 => maybeDefs_6680 => (((Instance_743(Empty_11))(name_6678))(t_6679))((justOr_23([]))(maybeDefs_6680)))))(($pip$mns$gt_6418(reservedP_6423("instance")))(upperCaseId_6425))))(simpleTypeP_6458)))(opt_5991((($pip$gt_5984($instance_6052))(reservedP_6423("where")))(some_5987(defP_6451))));
const eitherP_6473 = a_6697 => b_6698 => ($_16(Parser_5982))(s_6699 => (applyParser_5983((($lt$pip$gt($instance_6062))((($lt$mul$gt($instance_6052))((pure($instance_6052))(Left_8)))(a_6697)))((($lt$mul$gt($instance_6052))((pure($instance_6052))(Right_9)))(b_6698))))(s_6699));
const dataConP_6464 = ($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((pure($instance_6052))(DataCon_741(Empty_11))))(upperCaseId_6425)))(many_5986(simpleTypeP_6458));
const dataP_6465 = ($lt$mul$mns$gt_6417(($lt$mul$mns$gt_6417((($lt$mul$gt($instance_6052))((pure($instance_6052))(Data_740(Empty_11))))(($pip$mns$gt_6418(reservedP_6423("data")))(upperCaseId_6425))))(many_5986(notUpperCaseId_6426))))((($pip$gt_5984($instance_6052))(operatorP_6421("=")))((sepBy1_5989(dataConP_6464))(operatorP_6421("|"))));
const topLevelP_6475 = (eitherP_6473((eitherP_6473(dataP_6465))(topLevelDef_6474)))((eitherP_6473(classP_6461))(instanceP_6463));
const moduleP_6471 = (($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((($lt$mul$gt($instance_6052))((pure($instance_6052))(loc_6684 => is_6685 => es_6686 => {
  const $phi$611 = splitFourWay_6472(es_6686);
  let $phi$612;
  const $phi$613 = getAnnCodeLoc_762(loc_6684);
  if(($phi$613.$tag==0)&&($phi$613.$0.$tag==1)){
    $phi$612 = $phi$613.$0.$0
  } else error("pattern match fail",$phi$613);
  return ((((((Module_738(loc_6684))($phi$612))(is_6685))($phi$611.$0.$0))($phi$611.$1.$0))((map(Pair_3("")))($phi$611.$1.$1)))($phi$611.$0.$1)
})))(locP_6416)))(many_5986(importP_6470))))(some_5987(topLevelP_6475));
const parseModule_6476 = runParser_6414(moduleP_6471);
const parse_6896 = fn_6922 => {
  const $phi$615 = (parseModule_6476(readFile(fn_6922)))("//"+fn_6922);
  if($phi$615.$tag==0){
    const $phi$617 = (($eq$eq($instance_409))($phi$615.$1.$1))(length($phi$615.$1.$0));
    if($phi$617){
      return $phi$615.$0
    } else if(!$phi$617){
      return error((fn_6922+": failed to parse all tokens, stopped at ")+(jsonStringify((getIx($phi$615.$1.$1))($phi$615.$1.$0))))
    } else error("pattern match fail",$phi$617)
  } else if($phi$615.$tag==1){
    return error((fn_6922+": ")+$phi$615.$0)
  } else error("pattern match fail",$phi$615)
};
const parseType_6479 = runParser_6414(typeP_6455);
const parseT_6899 = s_6957 => {
  const $phi$619 = (parseType_6479(s_6957))("");
  if($phi$619.$tag==0){
    return $phi$619.$0
  } else return error($phi$619)
};
const parseExports_6900 = e_6961 => {
  const bs_6962 = (mapRecord(s_6963 => ($_16(skolemizeType_2017))((evalState_59(newCtx_1983))((generalize_2022(emptyEnv_1993))(parseT_6899(s_6963))))))(e_6961);
  return ((ModuleInterface_739(bs_6962))([]))(Empty_11)
};
const argName_4758 = a_4770 => {
  if(a_4770.$tag==0){
    return a_4770.$0
  } else if(a_4770.$tag==1){
    return a_4770.$0
  } else error("pattern match fail",a_4770)
};
const parseArgs_4759 = defs_4775 => argv_4776 => {
  const parse_4777 = r_4778 => arg_4779 => {
    const $phi$623 = ((($eq$eq($instance_410))((getChar(0))(arg_4779)))("-"))&&((($eq$eq($instance_410))((getChar(1))(arg_4779)))("-"));
    if(!$phi$623){
      return (Pair_3((push(arg_4779))(r_4778.$0)))(r_4778.$1)
    } else if($phi$623){
      const name_4782 = (match("[^=]+"))((drop(2))(arg_4779));
      const value_4783 = (drop(1))((match("=.*"))(arg_4779));
      const $phi$625 = ((contains_32($instance_410))(name_4782))((map(argName_4758))(defs_4775));
      if(!$phi$625){
        return error("unrecognized argument "+arg_4779)
      } else if($phi$625){
        return (Pair_3(r_4778.$0))(((set(name_4782))(value_4783))(r_4778.$1))
      } else error("pattern match fail",$phi$625)
    } else error("pattern match fail",$phi$623)
  };
  const $phi$627 = ((foldl(parse_4777))((Pair_3([]))(empty)))(argv_4776);
  return ((ParsedArgs_4757($phi$627.$0))($phi$627.$1))(defs_4775)
};
const normalizeImportsPass_6909 = m_6994 => (($gt$gt$eq($instance_461))(getExports_1474))(es_6995 => (ret($instance_461))((normalizeImports_4120(es_6995))(m_6994)));
const mergeModules_3917 = ms_3921 => (evalState_59(Empty_11))((((foldM_53($instance_461))(mergeInto_3919))(head_44(ms_3921)))(tail_45(ms_3921)));
const liftPass_6908 = local$instance$Monad$0 => p_6992 => a_6993 => (ret(local$instance$Monad$0))(p_6992(a_6993));
const getString_4761 = p_4790 => def_4791 => {
  const $phi$630 = ((contains_32($instance_4811))(def_4791))(p_4790.$2);
  if(!$phi$630){
    return error("unrecognized arg that was not present for parsing")
  } else if($phi$630){
    if(def_4791.$tag==1){
      const $phi$633 = (has(def_4791.$0))(p_4790.$1);
      if(!$phi$633){
        if(def_4791.$1.$tag==0){
          return def_4791.$1.$0
        } else if(def_4791.$1.$tag==1){
          return error("no value for required arg "+def_4791.$0)
        } else error("pattern match fail",def_4791.$1)
      } else if($phi$633){
        return (get(def_4791.$0))(p_4790.$1)
      } else error("pattern match fail",$phi$633)
    } else return error("arg is not a string")
  } else error("pattern match fail",$phi$630)
};
const getPositional_4760 = p_4786 => p_4786.$0;
const getRep_5434 = n_5501 => (($gt$gt$eq($instance_461))(gets_56))(s_5502 => (ret($instance_461))((((lookup_63($instance_465))($instance_410))(n_5501))(s_5502.$1)));
const getCons_5435 = (($gt$gt$eq($instance_461))(gets_56))(s_5507 => (ret($instance_461))(s_5507.$0));
const dataConFieldIds_5444 = ts_5682 => (map(p_5683 => "$"+(intToString(fst_26(p_5683)))))(zipWithIndex_40(ts_5682));
const withRep_5433 = rep_5488 => m_5489 => (($gt$gt$eq($instance_461))(gets_56))(s_5490 => (($gt$gt$eq($instance_461))((($gt$gt_21($instance_461))(sets_57((((RewriteState_5427(s_5490.$0))((((mergeTrie_71($instance_465))($instance_410))(s_5490.$1))(rep_5488)))(s_5490.$2))(s_5490.$3))))(m_5489)))(r_5495 => (($gt$gt$eq($instance_461))(gets_56))(s_5496 => (($gt$gt_21($instance_461))(sets_57((((RewriteState_5427(s_5496.$0))(s_5490.$1))(s_5496.$2))(s_5496.$3))))((ret($instance_461))(r_5495)))));
const combineChecks_5439 = a_5636 => b_5637 => {
  if((a_5636.$tag==9)&&a_5636.$0){
    return b_5637
  } else if((b_5637.$tag==9)&&b_5637.$0){
    return a_5636
  } else return ((JSBinOp_4815("&&"))(a_5636))(b_5637)
};
const processPattern_5440 = cons_5640 => pm_5641 => p_5642 => {
  if((p_5642.$tag==0)&&("_"==p_5642.$1)){
    return (Pair_3(JSBool_4821(true)))((Pair_3([]))([]))
  } else if(p_5642.$tag==0){
    return (Pair_3(JSBool_4821(true)))((Pair_3([opName_5447(p_5642.$1)]))([pm_5641]))
  } else if((p_5642.$tag==1)&&(p_5642.$1.$tag==0)){
    return (Pair_3(((JSBinOp_4815("=="))(JSNum_4819(p_5642.$1.$0)))(pm_5641)))((Pair_3([]))([]))
  } else if((p_5642.$tag==1)&&(p_5642.$1.$tag==1)){
    return (Pair_3(((JSBinOp_4815("=="))(JSString_4820(p_5642.$1.$0)))(pm_5641)))((Pair_3([]))([]))
  } else if((p_5642.$tag==2)&&("True"==p_5642.$1)){
    return (Pair_3(pm_5641))((Pair_3([]))([]))
  } else if((p_5642.$tag==2)&&("False"==p_5642.$1)){
    return (Pair_3((JSUnOp_4814("!"))(pm_5641)))((Pair_3([]))([]))
  } else if(p_5642.$tag==2){
    let $phi$643;
    const $phi$644 = (((lookup_63($instance_465))($instance_410))(p_5642.$1))(cons_5640);
    if(($phi$644.$tag==0)&&($phi$644.$0.$tag==1)){
      $phi$643 = (JSBool_4821(true))
    } else if(($phi$644.$tag==0)&&($phi$644.$0.$tag==0)){
      $phi$643 = (((JSBinOp_4815("=="))((JSIndex_4813(pm_5641))(JSString_4820("$tag"))))(JSNum_4819($phi$644.$0.$0)))
    } else $phi$643 = (error("unknown data type in code gen: "+p_5642.$1));
    const tagCheck_5657 = $phi$643;
    return ((foldl(a_5660 => b_5661 => (Pair_3((combineChecks_5439(a_5660.$0))(b_5661.$0)))((Pair_3((concat(a_5660.$1.$0))(b_5661.$1.$0)))((concat(a_5660.$1.$1))(b_5661.$1.$1)))))((Pair_3(tagCheck_5657))((Pair_3([]))([]))))((map(p_5668 => ((processPattern_5440(cons_5640))((JSIndex_4813(pm_5641))(JSString_4820("$"+(intToString(p_5668.$0))))))(p_5668.$1)))(zipWithIndex_40(p_5642.$2)))
  } else return error("failure to match pattern during processing")
};
const addStmt_5429 = stmt_5462 => (($gt$gt$eq($instance_461))(gets_56))(s_5463 => sets_57((((RewriteState_5427(s_5463.$0))(s_5463.$1))((push(stmt_5462))(s_5463.$2)))(s_5463.$3)));
const addConst_5430 = n_5468 => e_5469 => addStmt_5429((JSConst_4832(opName_5447(n_5468)))(e_5469));
const binOp2_5428 = op_5457 => a_5458 => b_5459 => (($gt$gt$eq($instance_461))(rewriteExpr_5436(a_5458)))(a_5460 => (($gt$gt$eq($instance_461))(rewriteExpr_5436(b_5459)))(b_5461 => (ret($instance_461))(((JSBinOp_4815(op_5457))(a_5460))(b_5461))));
const rewriteExprToStmts_5432 = w_5475 => e_5476 => (($gt$gt$eq($instance_461))(gets_56))(s_5477 => (($gt$gt$eq($instance_461))((($gt$gt_21($instance_461))(sets_57((((RewriteState_5427(s_5477.$0))(s_5477.$1))([]))(s_5477.$3))))(rewriteExpr_5436(e_5476))))(e_5482 => (($gt$gt$eq($instance_461))(gets_56))(s_5483 => (($gt$gt_21($instance_461))(sets_57((((RewriteState_5427(s_5483.$0))(s_5483.$1))(s_5477.$2))(s_5483.$3))))((ret($instance_461))((push(w_5475(e_5482)))(s_5483.$2))))));
const rewriteExpr_5436 = e_5512 => {
  if((e_5512.$tag==0)&&("True"==e_5512.$1)){
    return (ret($instance_461))(JSBool_4821(true))
  } else if((e_5512.$tag==0)&&("False"==e_5512.$1)){
    return (ret($instance_461))(JSBool_4821(false))
  } else if(e_5512.$tag==0){
    return (($gt$gt$eq($instance_461))(getRep_5434(opName_5447(e_5512.$1))))(r_5517 => {
      if(r_5517.$tag==1){
        return (ret($instance_461))(JSRef_4812(opName_5447(e_5512.$1)))
      } else if(r_5517.$tag==0){
        return (ret($instance_461))(r_5517.$0)
      } else error("pattern match fail",r_5517)
    })
  } else if((e_5512.$tag==1)&&(e_5512.$1.$tag==0)){
    return (ret($instance_461))(JSNum_4819(e_5512.$1.$0))
  } else if((e_5512.$tag==1)&&(e_5512.$1.$tag==1)){
    return (ret($instance_461))(JSString_4820(e_5512.$1.$0))
  } else if((e_5512.$tag==2)&&((e_5512.$1.$tag==2)&&((e_5512.$1.$1.$tag==0)&&("+"==e_5512.$1.$1.$1)))){
    return ((binOp2_5428("+"))(e_5512.$1.$2))(e_5512.$2)
  } else if((e_5512.$tag==2)&&((e_5512.$1.$tag==2)&&((e_5512.$1.$1.$tag==0)&&("-"==e_5512.$1.$1.$1)))){
    return ((binOp2_5428("-"))(e_5512.$1.$2))(e_5512.$2)
  } else if((e_5512.$tag==2)&&((e_5512.$1.$tag==2)&&((e_5512.$1.$1.$tag==0)&&("*"==e_5512.$1.$1.$1)))){
    return ((binOp2_5428("*"))(e_5512.$1.$2))(e_5512.$2)
  } else if((e_5512.$tag==2)&&((e_5512.$1.$tag==2)&&((e_5512.$1.$1.$tag==0)&&("++"==e_5512.$1.$1.$1)))){
    return ((binOp2_5428("+"))(e_5512.$1.$2))(e_5512.$2)
  } else if((e_5512.$tag==2)&&((e_5512.$1.$tag==2)&&((e_5512.$1.$1.$tag==0)&&("&&"==e_5512.$1.$1.$1)))){
    return ((binOp2_5428("&&"))(e_5512.$1.$2))(e_5512.$2)
  } else if((e_5512.$tag==2)&&((e_5512.$1.$tag==2)&&((e_5512.$1.$1.$tag==0)&&("||"==e_5512.$1.$1.$1)))){
    return ((binOp2_5428("||"))(e_5512.$1.$2))(e_5512.$2)
  } else if((e_5512.$tag==2)&&((e_5512.$1.$tag==2)&&((e_5512.$1.$1.$tag==0)&&("jsLt"==e_5512.$1.$1.$1)))){
    return ((binOp2_5428("<"))(e_5512.$1.$2))(e_5512.$2)
  } else if((e_5512.$tag==2)&&((e_5512.$1.$tag==2)&&((e_5512.$1.$1.$tag==0)&&("jsEq"==e_5512.$1.$1.$1)))){
    return ((binOp2_5428("==="))(e_5512.$1.$2))(e_5512.$2)
  } else if((e_5512.$tag==2)&&((e_5512.$1.$tag==2)&&((e_5512.$1.$1.$tag==0)&&("bitAnd"==e_5512.$1.$1.$1)))){
    return ((binOp2_5428("&"))(e_5512.$1.$2))(e_5512.$2)
  } else if((e_5512.$tag==2)&&((e_5512.$1.$tag==2)&&((e_5512.$1.$1.$tag==0)&&("bitOr"==e_5512.$1.$1.$1)))){
    return ((binOp2_5428("|"))(e_5512.$1.$2))(e_5512.$2)
  } else if((e_5512.$tag==2)&&((e_5512.$1.$tag==2)&&((e_5512.$1.$1.$tag==0)&&("bitShiftLeft"==e_5512.$1.$1.$1)))){
    return ((binOp2_5428("<<"))(e_5512.$1.$2))(e_5512.$2)
  } else if((e_5512.$tag==2)&&((e_5512.$1.$tag==2)&&((e_5512.$1.$1.$tag==0)&&("bitShiftRight"==e_5512.$1.$1.$1)))){
    return ((binOp2_5428(">>>"))(e_5512.$1.$2))(e_5512.$2)
  } else if(e_5512.$tag==2){
    return (($gt$gt$eq($instance_461))(rewriteExpr_5436(e_5512.$1)))(f_5586 => (($gt$gt$eq($instance_461))(rewriteExpr_5436(e_5512.$2)))(a_5587 => (ret($instance_461))((JSCall_4816(f_5586))([a_5587]))))
  } else if(e_5512.$tag==3){
    return (($gt$gt$eq($instance_461))((rewriteExprToStmts_5432(JSReturn_4830))(e_5512.$2)))(stmts_5591 => (ret($instance_461))((JSFun_4817([e_5512.$1]))(stmts_5591)))
  } else if(e_5512.$tag==4){
    return (($gt$gt$eq($instance_461))(newPhi_5431))(phiOut_5595 => (($gt$gt$eq($instance_461))((($gt$gt_21($instance_461))(addStmt_5429((JSLet_4833(phiOut_5595))(Nothing_2))))(rewriteExpr_5436(e_5512.$1))))(e_5596 => {
      let $phi$655;
      if(e_5596.$tag==0){
        $phi$655 = ((ret($instance_461))(e_5596))
      } else if(e_5596.$tag==1){
        $phi$655 = ((ret($instance_461))(e_5596))
      } else $phi$655 = ((($gt$gt$eq($instance_461))(newPhi_5431))(p_5601 => (($gt$gt_21($instance_461))((addConst_5430(p_5601))(e_5596)))((ret($instance_461))(JSRef_4812(p_5601)))));
      return (($gt$gt$eq($instance_461))($phi$655))(phiIn_5602 => (($gt$gt_21($instance_461))((($gt$gt$eq($instance_461))((((foldM_53($instance_461))((assemblePatternMatch2_5437(phiIn_5602))(phiOut_5595)))([JSExpr_4829((JSCall_4816(JSRef_4812("error")))([JSString_4820("pattern match fail"),phiIn_5602]))]))(reverse_50(e_5512.$2))))((mapM_54($instance_461))(addStmt_5429))))((ret($instance_461))(JSRef_4812(phiOut_5595))))
    }))
  } else if(e_5512.$tag==5){
    return (($gt$gt_21($instance_461))(((mapM_54($instance_461))(d_5606 => (($gt$gt$eq($instance_461))(rewriteExpr_5436(d_5606.$1)))(addConst_5430(d_5606.$0))))(e_5512.$1)))(rewriteExpr_5436(e_5512.$2))
  } else if((e_5512.$tag==6)&&("Array"==e_5512.$1)){
    return (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(rewriteExpr_5436))(e_5512.$2)))(es_5611 => (ret($instance_461))(JSArray_4823(es_5611)))
  } else if(e_5512.$tag==6){
    return (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(rewriteExpr_5436))(e_5512.$2)))(es_5615 => (($gt$gt$eq($instance_461))(getCons_5435))(cons_5616 => {
      const $phi$653 = (((lookup_63($instance_465))($instance_410))(e_5512.$1))(cons_5616);
      if($phi$653.$tag==1){
        return error("unrecognized tag in New: "+e_5512.$1)
      } else if(($phi$653.$tag==0)&&($phi$653.$0.$tag==1)){
        return (ret($instance_461))(JSObject_4822((zip_41(dataConFieldIds_5444(es_5615)))(es_5615)))
      } else if(($phi$653.$tag==0)&&($phi$653.$0.$tag==0)){
        return (ret($instance_461))(JSObject_4822((push((Pair_3("$tag"))(JSNum_4819($phi$653.$0.$0))))((zip_41(dataConFieldIds_5444(es_5615)))(es_5615))))
      } else error("pattern match fail",$phi$653)
    }))
  } else error("pattern match fail",e_5512)
};
const assemblePatternMatch2_5437 = phiIn_5618 => phiOut_5619 => alts_5620 => p_5621 => (($gt$gt$eq($instance_461))(getCons_5435))(cons_5622 => {
  const $phi$659 = ((processPattern_5440(cons_5622))(phiIn_5618))(p_5621.$0);
  const out_5629 = local$instance$Monad$0 => stmts_5632 => {
    if(($phi$659.$0.$tag==9)&&$phi$659.$0.$0){
      return (ret(local$instance$Monad$0))(stmts_5632)
    } else return (ret(local$instance$Monad$0))([((JSIf_4837($phi$659.$0))(stmts_5632))(alts_5620)])
  };
  const rep_5628 = ((foldl(r_5630 => p_5631 => ((((insert_64($instance_465))($instance_410))(fst_26(p_5631)))(snd_27(p_5631)))(r_5630)))(Empty_11))((zip_41($phi$659.$1.$0))($phi$659.$1.$1));
  return (($gt$gt$eq($instance_461))((withRep_5433(rep_5628))((rewriteExprToStmts_5432(JSAssign_4836(JSRef_4812(phiOut_5619))))(p_5621.$1))))(out_5629($instance_461))
});
const requireExpr_5441 = f_5672 => (JSCall_4816(JSRef_4812("_require")))([JSString_4820(f_5672)]);
const buildImports_5442 = f_5673 => ns_5674 => (map(n_5675 => (JSConst_4832(opName_5447(n_5675.$1)))((JSIndex_4813(requireExpr_5441(f_5673)))(JSString_4820(opName_5447(n_5675.$0))))))(ns_5674);
const importToJs_5443 = i_5678 => {
  if(i_5678.$tag==1){
    return (buildImports_5442(i_5678.$1))(i_5678.$2)
  } else error("pattern match fail",i_5678)
};
const moduleToJs_5446 = m_5690 => {
  const f_5709 = p_5710 => not_30(isJust_25((((getAnn_757($instance_465))($instance_410))("dead"))(annOf_771(p_5710.$1))));
  const vs2_5701 = (filter(f_5709))(m_5690.$6);
  const gatherCons_5699 = local$instance$Hashable$1 => local$instance$Eq$0 => m_5704 => d_5705 => {
    const $phi$667 = (((getAnn_757($instance_465))($instance_410))("data"))(annOf_771(d_5705.$1));
    if($phi$667.$tag==1){
      return m_5704
    } else if(($phi$667.$tag==0)&&($phi$667.$0.$tag==3)){
      return ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(d_5705.$0))($phi$667.$0.$0))(m_5704)
    } else error("pattern match fail",$phi$667)
  };
  const cons_5700 = ((foldl((gatherCons_5699($instance_465))($instance_410)))(Empty_11))(m_5690.$6);
  const defs_5702 = ($_16(foldl1(concat)))((evalState_59((((RewriteState_5427(cons_5700))(Empty_11))([]))(0)))(((mapM_54($instance_461))(v_5713 => (rewriteExprToStmts_5432(JSConst_4832(opName_5447(v_5713.$0))))(v_5713.$1)))(vs2_5701)));
  const exportDef_5703 = (JSConst_4832("exports"))(exportObject_5445(vs2_5701));
  const imports_5698 = (concatMap_42(importToJs_5443))(m_5690.$2);
  return optStmts_5451((push(exportDef_5703))((concat(imports_5698))(defs_5702)))
};
const printIndent_5161 = indent_5246 => {
  if(0==indent_5246){
    return ""
  } else return "  "+(printIndent_5161(indent_5246-1))
};
const paren_5162 = s_5248 => ("("+s_5248)+")";
const JSSwitch_4834 = $_0_4871 => $_1_4872 => ({$0:$_0_4871,$1:$_1_4872,$tag:5});
const jsExprToString_5156 = indent_5163 => e_5164 => {
  const printParen_5166 = e_5168 => (jsExprToParenString_5157(indent_5163))(e_5168);
  const print_5165 = e_5167 => (jsExprToString_5156(indent_5163))(e_5167);
  if(e_5164.$tag==12){
    return "null"
  } else if(e_5164.$tag==13){
    return "undefined"
  } else if((e_5164.$tag==9)&&e_5164.$0){
    return "true"
  } else if((e_5164.$tag==9)&&(!e_5164.$0)){
    return "false"
  } else if(e_5164.$tag==7){
    return jsonStringify(e_5164.$0)
  } else if(e_5164.$tag==8){
    return jsonStringify(e_5164.$0)
  } else if(e_5164.$tag==0){
    return e_5164.$0
  } else if((e_5164.$tag==1)&&(e_5164.$1.$tag==8)){
    const $phi$679 = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))(e_5164.$1.$0);
    if(""==$phi$679){
      return (((printParen_5166(e_5164.$0))+"[")+e_5164.$1.$0)+"]"
    } else return ((printParen_5166(e_5164.$0))+".")+$phi$679
  } else if(e_5164.$tag==1){
    return (((printParen_5166(e_5164.$0))+"[")+(print_5165(e_5164.$1)))+"]"
  } else if(e_5164.$tag==2){
    return e_5164.$0+(printParen_5166(e_5164.$1))
  } else if(e_5164.$tag==3){
    return ((printParen_5166(e_5164.$1))+e_5164.$0)+(printParen_5166(e_5164.$2))
  } else if(e_5164.$tag==4){
    return (printParen_5166(e_5164.$0))+(paren_5162((intercalate(","))((map(print_5165))(e_5164.$1))))
  } else if(e_5164.$tag==15){
    return ("new "+(printParen_5166(e_5164.$0)))+(paren_5162((intercalate(","))((map(print_5165))(e_5164.$1))))
  } else if(e_5164.$tag==5){
    let $phi$671;
    const $phi$672 = length(e_5164.$0);
    if(1==$phi$672){
      $phi$671 = (((getIx(0))(e_5164.$0))+" => ")
    } else $phi$671 = (("("+((intercalate(","))(e_5164.$0)))+") => ");
    const params_5188 = $phi$671;
    const full_5190 = bs_5191 => (((((params_5188+"{\n")+(printIndent_5161(indent_5163+1)))+((intercalate(";\n"+(printIndent_5161(indent_5163+1))))((map(jsStmtToString_5159(indent_5163+1)))(bs_5191))))+"\n")+(printIndent_5161(indent_5163)))+"}";
    const $phi$674 = length(e_5164.$1);
    if(1==$phi$674){
      const $phi$676 = head_44(e_5164.$1);
      if($phi$676.$tag==1){
        if($phi$676.$0.$tag==10){
          return params_5188+(paren_5162(print_5165($phi$676.$0)))
        } else return params_5188+(print_5165($phi$676.$0))
      } else return full_5190(e_5164.$1)
    } else return full_5190(e_5164.$1)
  } else if(e_5164.$tag==6){
    return ((((printParen_5166(e_5164.$0))+"?")+(printParen_5166(e_5164.$1)))+":")+(printParen_5166(e_5164.$2))
  } else if(e_5164.$tag==10){
    return ("{"+((intercalate(","))((map(keyValueToString_5158(indent_5163)))(e_5164.$0))))+"}"
  } else if(e_5164.$tag==11){
    return ("["+((intercalate(","))((map(print_5165))(e_5164.$0))))+"]"
  } else if(e_5164.$tag==14){
    return ((printParen_5166(e_5164.$0))+" instanceof ")+(printParen_5166(e_5164.$1))
  } else if(e_5164.$tag==16){
    return (intercalate(","))((map(print_5165))(e_5164.$0))
  } else return error(e_5164)
};
const jsExprToParenString_5157 = indent_5206 => e_5207 => {
  if(e_5207.$tag==0){
    return (jsExprToString_5156(indent_5206))(e_5207)
  } else if(e_5207.$tag==7){
    return (jsExprToString_5156(indent_5206))(e_5207)
  } else if(e_5207.$tag==8){
    return (jsExprToString_5156(indent_5206))(e_5207)
  } else if(e_5207.$tag==9){
    return (jsExprToString_5156(indent_5206))(e_5207)
  } else if(e_5207.$tag==1){
    return (jsExprToString_5156(indent_5206))(e_5207)
  } else if(e_5207.$tag==15){
    return (jsExprToString_5156(indent_5206))(e_5207)
  } else if(e_5207.$tag==10){
    return (jsExprToString_5156(indent_5206))(e_5207)
  } else return paren_5162((jsExprToString_5156(indent_5206))(e_5207))
};
const keyValueToString_5158 = indent_5218 => kv_5219 => (kv_5219.$0+":")+((jsExprToString_5156(indent_5218))(kv_5219.$1));
const jsStmtToString_5159 = indent_5222 => s_5223 => {
  if(s_5223.$tag==0){
    return (jsExprToString_5156(indent_5222))(s_5223.$0)
  } else if(s_5223.$tag==1){
    return "return "+((jsExprToString_5156(indent_5222))(s_5223.$0))
  } else if(s_5223.$tag==2){
    return (("var "+s_5223.$0)+" = ")+((jsExprToString_5156(indent_5222))(s_5223.$1))
  } else if(s_5223.$tag==3){
    return (("const "+s_5223.$0)+" = ")+((jsExprToString_5156(indent_5222))(s_5223.$1))
  } else if(s_5223.$tag==4){
    if(s_5223.$1.$tag==1){
      return "let "+s_5223.$0
    } else if(s_5223.$1.$tag==0){
      return (("let "+s_5223.$0)+" = ")+((jsExprToString_5156(indent_5222))(s_5223.$1.$0))
    } else error("pattern match fail",s_5223.$1)
  } else if(s_5223.$tag==6){
    return "break"
  } else if(s_5223.$tag==5){
    return (((((("switch"+(paren_5162((jsExprToString_5156(indent_5222))(s_5223.$0))))+"{\n")+(printIndent_5161(indent_5222+1)))+((intercalate(";\n"+(printIndent_5161(indent_5222+1))))((map(caseToString_5160(indent_5222+1)))(s_5223.$1))))+"\n")+(printIndent_5161(indent_5222)))+"}"
  } else if(s_5223.$tag==7){
    return (((jsExprToParenString_5157(indent_5222))(s_5223.$0))+" = ")+((jsExprToParenString_5157(indent_5222))(s_5223.$1))
  } else if(s_5223.$tag==8){
    let $phi$683;
    const $phi$684 = length(s_5223.$2);
    if(1==$phi$684){
      $phi$683 = ((jsStmtToString_5159(indent_5222))((getIx(0))(s_5223.$2)))
    } else $phi$683 = ((((("{\n"+(printIndent_5161(indent_5222+1)))+((intercalate(";\n"+(printIndent_5161(indent_5222+1))))((map(jsStmtToString_5159(indent_5222+1)))(s_5223.$2))))+"\n")+(printIndent_5161(indent_5222)))+"}");
    const els_5240 = $phi$683;
    return ((((((("if("+((jsExprToString_5156(indent_5222))(s_5223.$0)))+"){\n")+(printIndent_5161(indent_5222+1)))+((intercalate(";\n"+(printIndent_5161(indent_5222+1))))((map(jsStmtToString_5159(indent_5222+1)))(s_5223.$1))))+"\n")+(printIndent_5161(indent_5222)))+"} else ")+els_5240
  } else error("pattern match fail",s_5223)
};
const caseToString_5160 = indent_5242 => c_5243 => ((("case "+(paren_5162((jsExprToString_5156(indent_5242))(c_5243.$0))))+":\n")+(printIndent_5161(indent_5242+1)))+((intercalate(";\n"+(printIndent_5161(indent_5242+1))))((map(jsStmtToString_5159(indent_5242)))(c_5243.$1)));
const compileModule_5882 = builtinsPath_5883 => m_5884 => {
  const js_5887 = (join_38((map(jsStmtToString_5159(0)))((concatMap_42(rewriteStmt_4994))(moduleToJs_5446(m_5884)))))(";\n");
  const wrapModule_5888 = m_5891 => ("(function() {"+js_5887)+"\nmodule.exports = exports;})();";
  const fullBuiltins_5885 = readFile(builtinsPath_5883);
  const wrappedBuiltins_5886 = ("const $$builtins = (function() {\n const module = {};\n"+fullBuiltins_5885)+";\n return builtins})();\n";
  const requireFun_5889 = ("function _require(f) {\n"+"  return f == \"./builtins.js\" ? $$builtins : require(f);\n")+"}\n";
  return ((wrappedBuiltins_5886+requireFun_5889)+(wrapModule_5888(m_5884)))+"if (module.exports.main)module.exports.main(process.argv)"
};
const className_4346 = n_4656 => "$class$"+n_4656;
const className2_4347 = c_4657 => className_4346(c_4657.$1);
const mkClassDictAccessors_4339 = c_4415 => {
  const name_4420 = className2_4347(c_4415);
  const v_4422 = "x_"+name_4420;
  const f_4424 = b_4425 => (PVar_735(Empty_11))((fst_26(b_4425))+"_");
  const bsForPat_4421 = (map(f_4424))(sort(c_4415.$3));
  const rewrite_4423 = b_4426 => (Pair_3(b_4426.$0))((setType_770(b_4426.$1))(((Lam_729(((((setAnn_758($instance_465))($instance_410))("export"))(AnnExport_725(b_4426.$0)))(Empty_11)))(v_4422))(((Case_730(Empty_11))((Var_726(Empty_11))(v_4422)))([(Pair_3(((PData_737(Empty_11))(name_4420))(bsForPat_4421)))((Var_726(Empty_11))(b_4426.$0+"_"))]))));
  return (map(rewrite_4423))(classToBindings_2029(c_4415))
};
const setEnv_4342 = env_4443 => s_4444 => ((S_4335(env_4443))(s_4444.$1))(s_4444.$2);
const instanceNameFromBound_4348 = ix_4662 => b_4663 => (("local$instance$"+b_4663.$1)+"$")+(intToString(ix_4662));
const breakableDownAndUpWithEnv_4344 = getEnv_4533 => setEnv_4534 => down_4535 => up_4536 => a_4537 => e_4538 => {
  const enterScope_4540 = bs_4548 => a_4549 => {
    const es_4550 = getEnv_4533(a_4549);
    const e_4551 = (merge(head_44(es_4550)))(bs_4548);
    return (setEnv_4534((enqueue(e_4551))(es_4550)))(a_4549)
  };
  const exitScope_4541 = a_4552 => (setEnv_4534(tail_45(getEnv_4533(a_4552))))(a_4552);
  const patBindings_4545 = p_4611 => {
    if(p_4611.$tag==1){
      return empty
    } else if(p_4611.$tag==0){
      return ((set(p_4611.$1))(getAnnType_760(p_4611.$0)))(empty)
    } else if(p_4611.$tag==2){
      return ((foldr(env_4619 => p_4620 => (merge(patBindings_4545(p_4620)))(env_4619)))(empty))(p_4611.$2)
    } else error("pattern match fail",p_4611)
  };
  const processUp_4544 = a_4601 => e_4602 => {
    let $phi$693;
    if(e_4602.$tag==3){
      $phi$693 = (exitScope_4541(a_4601))
    } else if(e_4602.$tag==5){
      $phi$693 = (exitScope_4541(a_4601))
    } else $phi$693 = a_4601;
    const a2_4603 = $phi$693;
    return (up_4536(a2_4603))(e_4602)
  };
  const go_4539 = a_4546 => e_4547 => (((breakableDownAndUp_774(processDown_4542))(processUp_4544))(a_4546))(e_4547);
  const processDown_4542 = a_4553 => e_4554 => {
    const $phi$695 = (down_4535(a_4553))(e_4554);
    if($phi$695.$tag==1){
      return Right_9($phi$695.$0)
    } else if($phi$695.$tag==0){
      if($phi$695.$0.$1.$tag==3){
        let $phi$702;
        const $phi$703 = getType_773($phi$695.$0.$1);
        if(($phi$703.$tag==3)&&(($phi$703.$1.$tag==3)&&(($phi$703.$1.$1.$tag==0)&&("->"==$phi$703.$1.$1.$1)))){
          $phi$702 = $phi$703.$1.$2
        } else if(($phi$703.$tag==6)&&(($phi$703.$3.$tag==3)&&(($phi$703.$3.$1.$tag==3)&&(($phi$703.$3.$1.$1.$tag==0)&&("->"==$phi$703.$3.$1.$1.$1))))){
          $phi$702 = $phi$703.$3.$1.$2
        } else $phi$702 = TUnknown_752;
        const t_4561 = $phi$702;
        return Left_8((Pair_3((enterScope_4540(((set($phi$695.$0.$1.$1))(t_4561))(empty)))($phi$695.$0.$0)))($phi$695.$0.$1))
      } else if($phi$695.$0.$1.$tag==5){
        const ts_4579 = ((foldl(ts_4580 => b_4581 => ((set(b_4581.$0))(getType_773(b_4581.$1)))(ts_4580)))(empty))($phi$695.$0.$1.$1);
        return Left_8((Pair_3((enterScope_4540(ts_4579))($phi$695.$0.$0)))($phi$695.$0.$1))
      } else if($phi$695.$0.$1.$tag==4){
        const $phi$698 = (go_4539($phi$695.$0.$0))($phi$695.$0.$1.$1);
        const $phi$700 = ((foldl(processPat_4543))((Pair_3($phi$698.$0))([])))($phi$695.$0.$1.$2);
        return Right_9((Pair_3($phi$700.$0))(((Case_730($phi$695.$0.$1.$0))($phi$698.$1))($phi$700.$1)))
      } else return Left_8((Pair_3($phi$695.$0.$0))($phi$695.$0.$1))
    } else error("pattern match fail",$phi$695)
  };
  const processPat_4543 = ar_4592 => pat_4593 => {
    const bs_4598 = patBindings_4545(pat_4593.$0);
    const $phi$707 = (go_4539((enterScope_4540(bs_4598))(ar_4592.$0)))(pat_4593.$1);
    return (Pair_3(exitScope_4541($phi$707.$0)))((push((Pair_3(pat_4593.$0))($phi$707.$1)))(ar_4592.$1))
  };
  return (go_4539(a_4537))(e_4538)
};
const rewriteExpr_4343 = is_4448 => env_4449 => e_4450 => {
  const boundsToLam_4451 = a_4453 => e_4454 => {
    const addInstance_4455 = b_4457 => a_4458 => {
      const name_4462 = (instanceNameFromBound_4348(a_4458.$2))(b_4457);
      return (Pair_3(((S_4335(a_4458.$0))((push((Pair_3(name_4462))(b_4457)))(a_4458.$1)))(a_4458.$2+1)))(name_4462)
    };
    const rewriteBound_4456 = ae_4463 => ib_4464 => {
      const $phi$712 = (addInstance_4455(ib_4464.$1))(ae_4463.$0);
      return (Pair_3($phi$712.$0))(((Lam_729(Empty_11))($phi$712.$1))(ae_4463.$1))
    };
    const $phi$714 = getType_773(e_4454);
    if($phi$714.$tag==6){
      const $phi$716 = (($gt_18($instance_411))(length($phi$714.$2)))(0);
      if(!$phi$716){
        return (Pair_3(a_4453))(e_4454)
      } else if($phi$716){
        const rewritten_4475 = ((foldr(rewriteBound_4456))((Pair_3(a_4453))((setType_770($phi$714.$3))(e_4454))))(zipWithIndex_40($phi$714.$2));
        return (mapSnd_86(re_4476 => (withAnn_772((((copyAnn_759($instance_465))($instance_410))(["export"]))(annOf_771(e_4454))))(re_4476)))(rewritten_4475)
      } else error("pattern match fail",$phi$716)
    } else return (Pair_3(a_4453))(e_4454)
  };
  const rewriteVar_4452 = a_4478 => e_4479 => {
    if(e_4479.$tag==0){
      const $phi$720 = getType_773(e_4479);
      if($phi$720.$tag==6){
        return (Pair_3(a_4478))(e_4479)
      } else {
        const requiredInstances_4489 = tv_4507 => td_4508 => {
          const $phi$722 = ((instantiate_2006(Unit_0))(__4509 => v_4510 => ($_16(Pair_3(Unit_0)))((TVar_746(Empty_11))("$ins$"+v_4510))))(td_4508);
          const subs_4514 = ((unify_2011(s_4515 => "declasser: "+s_4515))(tv_4507))($phi$722.$0.$0);
          return (map(applySubsBound_2009(subs_4514)))($phi$722.$0.$1)
        };
        const fromEnv_4487 = n_4494 => envs_4495 => {
          const env_4496 = head_44(envs_4495);
          const $phi$724 = (has(n_4494))(env_4496);
          if(!$phi$724){
            return error((("no "+n_4494)+" in env ")+(jsonStringify(keys(env_4496))))
          } else if($phi$724){
            return (get(n_4494))(env_4496)
          } else error("pattern match fail",$phi$724)
        };
        const t_4490 = (fromEnv_4487(e_4479.$1))(getEnv_4341(a_4478));
        const is_4491 = (requiredInstances_4489($phi$720))(t_4490);
        const findMatching_4488 = b_4497 => a_4498 => {
          const matching_4502 = (filter(p_4503 => (satisfiesBound_2033(p_4503.$1))(b_4497)))(a_4498.$1);
          const $phi$728 = length(matching_4502);
          if(0==$phi$728){
            return error((("declasser failed to find satisfying instance for "+(printTypeBound_1686(b_4497)))+" ")+(exprLoc_765(e_4479)))
          } else if(1==$phi$728){
            return fst_26((getIx(0))(matching_4502))
          } else return error((("declasser found more than 1 satisfying instance for "+(printTypeBound_1686(b_4497)))+" ")+(exprLoc_765(e_4479)))
        };
        const mis_4492 = (map(b_4517 => (findMatching_4488(b_4517))(a_4478)))(is_4491);
        const e2_4493 = ((foldl(e_4518 => v_4519 => ((App_728(Empty_11))(e_4518))((Var_726(Empty_11))(v_4519))))(e_4479))(mis_4492);
        return (Pair_3(a_4478))(e2_4493)
      }
    } else if(e_4479.$tag==3){
      const dropInstance_4523 = v_4524 => a_4525 => ((S_4335(a_4525.$0))((filter(p_4529 => (($div$eq_17($instance_410))(fst_26(p_4529)))(v_4524)))(a_4525.$1)))(a_4525.$2);
      return (Pair_3((dropInstance_4523(e_4479.$1))(a_4478)))(e_4479)
    } else return (Pair_3(a_4478))(e_4479)
  };
  return snd_27((((((breakableDownAndUpWithEnv_4344(getEnv_4341))(setEnv_4342))(a_4531 => e_4532 => Left_8((boundsToLam_4451(a_4531))(e_4532))))(rewriteVar_4452))(((S_4335([env_4449]))(is_4448))(0)))(e_4450))
};
const rewriteInstance_4340 = is_4429 => env_4430 => n_4431 => i_4432 => {
  const args_4437 = (map((rewriteExpr_4343(is_4429))(env_4430)))((map(snd_27))(sort(i_4432.$3)));
  const e_4438 = ((foldl(App_728(Empty_11)))((Var_726(Empty_11))(className_4346(i_4432.$1))))(args_4437);
  return (Pair_3(n_4431))((withAnn_772(((((setAnn_758($instance_465))($instance_410))("export"))(AnnExport_725(n_4431)))(Empty_11)))(e_4438))
};
const rewriteImportedInstances_4337 = ms_4386 => _isi_4387 => imp_4388 => {
  if(imp_4388.$tag==1){
    const $phi$733 = (get(imp_4388.$1))(ms_4386);
    const importedClassNames_4397 = (map(n_4400 => (Pair_3(n_4400))(n_4400)))((concatMap_42(c_4401 => (enqueue(className_4346(c_4401.$1)))((map(fst_26))(c_4401.$3))))($phi$733.$1));
    const importedBounds_4398 = trieEntries_73($phi$733.$2);
    const importedInsNames_4399 = (map(ni_4406 => (Pair_3(fst_26(ni_4406)))(fst_26(ni_4406))))(importedBounds_4398);
    return (Pair_3((push(((ImportOpen_754(imp_4388.$0))(imp_4388.$1))((concat(imp_4388.$2))((concat(importedInsNames_4399))(importedClassNames_4397)))))(_isi_4387.$0)))((concat(_isi_4387.$1))(importedBounds_4398))
  } else error("pattern match fail",imp_4388)
};
const mkClassDictConstructor_4338 = c_4407 => {
  const params_4413 = (map(snd_27))(sort(classToBindings_2029(c_4407)));
  const name_4412 = className_4346(c_4407.$1);
  const type_4414 = ((TApp_748(Empty_11))((TConst_745(Empty_11))(c_4407.$1)))((TVar_746(Empty_11))(c_4407.$2));
  return ((((mkConFun_2982(Nothing_2))(type_4414))([c_4407.$2]))(name_4412))(params_4413)
};
const importsToTypeEnv_4345 = ms_4621 => is_4622 => {
  const addClass_4624 = env_4635 => c_4636 => ((foldl(env_4637 => b_4638 => ((set(fst_26(b_4638)))(snd_27(b_4638)))(env_4637)))(env_4635))(classToBindings_2029(c_4636));
  const getFile_4623 = i_4626 => {
    if(i_4626.$tag==2){
      return i_4626.$1
    } else if(i_4626.$tag==1){
      return i_4626.$1
    } else if(i_4626.$tag==0){
      return i_4626.$1
    } else error("pattern match fail",i_4626)
  };
  const addImports_4625 = env_4639 => i_4640 => {
    const $phi$738 = (get(getFile_4623(i_4640)))(ms_4621);
    let $phi$739;
    if(i_4640.$tag==2){
      $phi$739 = ((merge(env_4639))($phi$738.$0))
    } else if(i_4640.$tag==1){
      $phi$739 = (((foldl(env_4651 => n_4652 => ((set(n_4652.$1))((get(n_4652.$0))($phi$738.$0)))(env_4651)))(env_4639))(i_4640.$2))
    } else $phi$739 = (error("import type not supported in type inference"));
    const env2_4644 = $phi$739;
    const env3_4645 = ((foldl(addClass_4624))(env2_4644))($phi$738.$1);
    return env3_4645
  };
  return ((foldl(addImports_4625))(empty))((enqueue((ImportAll_755(Empty_11))("./builtins.js")))(is_4622))
};
const declassModule_4336 = ms_4352 => m_4353 => {
  const splitData_4379 = d_4380 => {
    const $phi$743 = (((lookup_63($instance_465))($instance_410))("data"))(annOf_771(snd_27(d_4380)));
    if($phi$743.$tag==1){
      return Right_9(d_4380)
    } else if($phi$743.$tag==0){
      return Left_8(d_4380)
    } else error("pattern match fail",$phi$743)
  };
  const _sds_4367 = splitEither_29((map(splitData_4379))(m_4353.$6));
  const classFuns_4364 = (concat((map(mkClassDictConstructor_4338))(m_4353.$4)))((concatMap_42(mkClassDictAccessors_4339))(m_4353.$4));
  const _isi_4361 = ((foldl(rewriteImportedInstances_4337(ms_4352)))((Pair_3([]))([])))(m_4353.$2);
  const importedInstances_4363 = snd_27(_isi_4361);
  const availableInstances_4365 = (concat(importedInstances_4363))((map(mapSnd_86(instanceToTypeBound_2028)))(m_4353.$5));
  const importedSymbols_4373 = (importsToTypeEnv_4345(ms_4352))(m_4353.$2);
  const localBindings_4374 = (concat(classFuns_4364))(m_4353.$6);
  const env_4366 = ((foldl(env_4375 => b_4376 => ((set(b_4376.$0))(getType_773(b_4376.$1)))(env_4375)))(importedSymbols_4373))(localBindings_4374);
  const instancesAsDicts_4371 = (map(p_4383 => (((rewriteInstance_4340(availableInstances_4365))(env_4366))(p_4383.$0))(p_4383.$1)))(m_4353.$5);
  const adtDs_4368 = fst_26(_sds_4367);
  const nonAdtDs_4369 = snd_27(_sds_4367);
  const declassedDs_4370 = (map(d_4382 => (Pair_3(fst_26(d_4382)))(((rewriteExpr_4343(availableInstances_4365))(env_4366))(snd_27(d_4382)))))(nonAdtDs_4369);
  const finalDs_4372 = (concat(adtDs_4368))((concat(classFuns_4364))((concat(instancesAsDicts_4371))(declassedDs_4370)));
  const impsWithImportedInstances_4362 = fst_26(_isi_4361);
  return ((((((Module_738(m_4353.$0))(m_4353.$1))(impsWithImportedInstances_4362))(m_4353.$3))([]))([]))(finalDs_4372)
};
const declasserPass_6911 = m_7000 => (($gt$gt$eq($instance_461))(getExports_1474))(es_7001 => (ret($instance_461))((declassModule_4336(es_7001))(m_7000)));
const main_6913 = argv_7004 => {
  const args_7005 = (parseArgs_4759(argDefs_6907))((slice(2))(argv_7004));
  const builtinsPath_7006 = (getString_4761(args_7005))(builtinsPathArg_6902);
  const baseExports_7012 = ((set("./builtins.js"))(parseExports_6900(loadJSExports(builtinsPath_7006))))(empty);
  const srcFiles_7009 = getPositional_4760(args_7005);
  const opt_7011 = (getBool_4762(args_7005))(optArg_6906);
  const profile_7010 = (getBool_4762(args_7005))(profileArg_6905);
  const mainName_7008 = "//"+((getString_4761(args_7005))(mainArg_6904));
  const passes_7013 = (($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((perModule_1478($instance_461))(($_16(timed_1481("parse")))((liftPass_6908($instance_461))(parse_6896)))))((timed_1481("dep-sort"))((liftPass_6908($instance_461))(depSort_6897(mainName_7008))))))((perModule_1478($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((timed_1481("translate-adts"))((liftPass_6908($instance_461))(translateAdts_2980))))((timed_1481("normalize-imports"))(normalizeImportsPass_6909))))((timed_1481("uniquify"))(uniquify_3184))))((timed_1481("typer"))(typerPass_6910))))((timed_1481("declasser"))(declasserPass_6911))))))((timed_1481("merge-modules"))((liftPass_6908($instance_461))(mergeModules_3917)))))((timed_1481("opt"))(inline_3453(opt_7011)))))((timed_1481("instrument"))((instrumentPass_6912($instance_461))(profile_7010)))))((timed_1481("generate-js"))((liftPass_6908($instance_461))(compileModule_5882(builtinsPath_7006))))))(reportTimes_1482);
  const js_7014 = (evalState_59(((CompilerState_1473(baseExports_7012))(0))(Empty_11)))(passes_7013(srcFiles_7009));
  const outPath_7007 = (getString_4761(args_7005))(outPathArg_6903);
  return (writeFile(js_7014))(outPath_7007)
};
const parseImports_6477 = runParser_6414(many_5986(importP_6470));
const $instance_463 = $class$Hashable(n_462 => n_462);
const $instance_421 = ($class$Applicative(x_417 => Just_1(x_417)))(f_418 => x_419 => {
  if(f_418.$tag==1){
    return Nothing_2
  } else if(f_418.$tag==0){
    return ((fmap($instance_416))(f_418.$0))(x_419)
  } else error("pattern match fail",f_418)
});
const $instance_429 = ($class$Monad(pure($instance_421)))(a_426 => f_427 => {
  if(a_426.$tag==1){
    return Nothing_2
  } else if(a_426.$tag==0){
    return f_427(a_426.$0)
  } else error("pattern match fail",a_426)
});
const loopPasses_3462 = local$instance$Monad$0 => n_3615 => p_3616 => bs_3617 => {
  if(0==n_3615){
    return (ret(local$instance$Monad$0))(bs_3617)
  } else return (($gt$gt$eq(local$instance$Monad$0))(p_3616(bs_3617)))(((loopPasses_3462(local$instance$Monad$0))(n_3615-1))(p_3616))
};
const zero = x_$class$Alternative => x_$class$Alternative.$0;
const parseExpr_6478 = runParser_6414(exprP_6434);
const splitLetsPass_1281 = local$instance$Monad$0 => m_1320 => (ret(local$instance$Monad$0))(m_1320);
const delRef_1277 = local$instance$Hashable$1 => local$instance$Eq$0 => n_1284 => (($gt$gt$eq($instance_461))(gets_56))(ns_1285 => sets_57((((setRemove_77(local$instance$Hashable$1))(local$instance$Eq$0))(n_1284))(ns_1285)));
const checkUndefined_5438 = label_5634 => expr_5635 => ((JSTernary_4818(((JSBinOp_4815("==="))(expr_5635))(JSUndefined_4825)))((JSCall_4816(JSRef_4812("error")))([JSString_4820(label_5634)])))(expr_5635);
const processImports_3464 = useCount_3629 => is_3630 => is_3630;
const splitExpr_1279 = e_1286 => {
  const handleLet_1289 = e_1309 => {
    if(e_1309.$tag==5){
      return (($gt$gt$eq($instance_461))(splitExpr_1279(e_1309.$2)))(e_1313 => (($gt$gt$eq($instance_461))(splitBindings_1280(e_1309.$1)))(gbs_1314 => {
        const l_1315 = ((foldr(e_1316 => bs_1317 => ((Let_731(Empty_11))(bs_1317))(e_1316)))(e_1313))(gbs_1314);
        return (ret($instance_461))(Right_9((withAnn_772(e_1309.$0))(l_1315)))
      }))
    } else return (ret($instance_461))(Left_8(e_1309))
  };
  const splitPat_1288 = p_1301 => {
    if(p_1301.$tag==1){
      return (ret($instance_461))(Unit_0)
    } else if(p_1301.$tag==0){
      return ((delRef_1277($instance_465))($instance_410))(p_1301.$1)
    } else if(p_1301.$tag==2){
      return (($gt$gt_21($instance_461))(((mapM_54($instance_461))(splitPat_1288))(p_1301.$2)))(((addRef_1276($instance_465))($instance_410))(p_1301.$1))
    } else error("pattern match fail",p_1301)
  };
  const split_1287 = e_1290 => {
    if(e_1290.$tag==0){
      return (($gt$gt_21($instance_461))(((addRef_1276($instance_465))($instance_410))(e_1290.$1)))((ret($instance_461))(e_1290))
    } else if(e_1290.$tag==4){
      return (($gt$gt_21($instance_461))(((mapM_54($instance_461))(p_1296 => splitPat_1288(fst_26(p_1296))))(e_1290.$2)))((ret($instance_461))(e_1290))
    } else if(e_1290.$tag==3){
      return (($gt$gt_21($instance_461))(((delRef_1277($instance_465))($instance_410))(e_1290.$1)))((ret($instance_461))(e_1290))
    } else return (ret($instance_461))(e_1290)
  };
  return (((breakableDownAndUpM_779($instance_461))(handleLet_1289))(split_1287))(e_1286)
};
const $instance_6039 = $class$Functor(f_6032 => pa_6033 => Parser_5982(i_6035 => {
  const $phi$755 = pa_6033.$0(i_6035);
  if($phi$755.$tag==1){
    return Error_5981($phi$755.$0)
  } else if($phi$755.$tag==0){
    return (Success_5980(f_6032($phi$755.$0)))($phi$755.$1)
  } else error("pattern match fail",$phi$755)
}));
const exports = {instrument:instrument_6901,instrumentPass:instrumentPass_6912,findImports:findImports_6898,moduleFile:moduleFile_6895,depSort:depSort_6897,optArg:optArg_6906,typerPass:typerPass_6910,outPathArg:outPathArg_6903,builtinsPathArg:builtinsPathArg_6902,profileArg:profileArg_6905,mainArg:mainArg_6904,argDefs:argDefs_6907,parse:parse_6896,parseT:parseT_6899,parseExports:parseExports_6900,normalizeImportsPass:normalizeImportsPass_6909,liftPass:liftPass_6908,declasserPass:declasserPass_6911,main:main_6913}
module.exports = exports;})();if (module.exports.main)module.exports.main(process.argv)