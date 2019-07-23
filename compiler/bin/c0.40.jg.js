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
const $class$Ord = $_0 => ({$0:$_0});
const $lt = x_$class$Ord => x_$class$Ord.$0;
const not_31 = b_169 => {
  if(b_169){
    return false
  } else if(!b_169){
    return true
  } else error("pattern match fail in //compiler/prelude.jg at line 132, column 9",b_169)
};
const $lt$eq_19 = local$instance$Ord$0 => a_131 => b_132 => not_31((($lt(local$instance$Ord$0))(b_132))(a_131));
const Unit_0 = {};
const $class$Monad = $_0 => $_1 => ({$0:$_0,$1:$_1});
const $gt$gt$eq = x_$class$Monad => x_$class$Monad.$1;
const ret = x_$class$Monad => x_$class$Monad.$0;
const foldM_56 = local$instance$Monad$0 => f_251 => r_252 => xs_253 => ((foldl(r_254 => x_255 => (($gt$gt$eq(local$instance$Monad$0))(r_254))(r_256 => (f_251(r_256))(x_255))))((ret(local$instance$Monad$0))(r_252)))(xs_253);
const mapM_57 = local$instance$Monad$0 => f_257 => xs_258 => (((foldM_56(local$instance$Monad$0))(xs_259 => x_260 => (($gt$gt$eq(local$instance$Monad$0))(f_257(x_260)))(x_261 => (ret(local$instance$Monad$0))((push(x_261))(xs_259)))))([]))(xs_258);


class DataPair {
  constructor(a, b) {
    this.$0 = a;
    this.$1 = b;
  }
}
const Pair_3 = $_0_96 => $_1_97 => new DataPair($_0_96, $_1_97);
//const Pair_3 = $_0_96 => $_1_97 => ({$0:$_0_96,$1:$_1_97});



const Empty_11 = {$tag:0};
const exists_37 = f_200 => xs_201 => ((foldl(r_202 => x_203 => (f_200(x_203))||r_202))(false))(xs_201);
const State_10 = $_0_118 => ({$0:$_0_118});
const $class$Functor = $_0 => ({$0:$_0});
const fmap = x_$class$Functor => x_$class$Functor.$0;
const mapOk_619 = local$instance$Functor$0 => fmap(local$instance$Functor$0);
const Just_1 = $_0_95 => ({$0:$_0_95,$tag:0});
const fst_27 = p_149 => p_149.$0;
const snd_28 = p_152 => p_152.$1;
const $class$Hashable = $_0 => ({$0:$_0});
const hashCode = x_$class$Hashable => x_$class$Hashable.$0;
const hamtMask_64 = depth_278 => hash_279 => {
  const h_280 = (hash_279>>>(depth_278*5))&31;
  return 1<<h_280
};
const Nothing_2 = {$tag:1};
const $instance_457 = $class$Functor(f_454 => m_455 => {
  if(m_455.$tag==0){
    return Just_1(f_454(m_455.$0))
  } else if(m_455.$tag==1){
    return Nothing_2
  } else error("pattern match fail in //compiler/prelude.jg at line 68, column 14",m_455)
});
const Collision_13 = $_0_121 => ({$0:$_0_121,$tag:2});
const popCount_63 = n_272 => {
  const n2_273 = n_272-((n_272>>>1)&1431655765);
  const n3_274 = (n2_273&858993459)+((n2_273>>>2)&858993459);
  const n4_275 = (n3_274+(n3_274>>>4))&252645135;
  const n5_276 = n4_275+(n4_275>>>8);
  const n6_277 = n5_276+(n5_276>>>16);
  return n6_277&127
};
const hamtIndex_65 = bitmap_281 => mask_282 => popCount_63(bitmap_281&(mask_282-1));
const $instance_448 = $class$Ord(jsLt);
const find_34 = predicate_189 => xs_190 => {
  const f_191 = i_192 => {
    const $phi$10 = (($lt($instance_448))(i_192))(length(xs_190));
    if(!$phi$10){
      return Nothing_2
    } else if($phi$10){
      const $phi$12 = predicate_189((getIx(i_192))(xs_190));
      if($phi$12){
        return Just_1((getIx(i_192))(xs_190))
      } else if(!$phi$12){
        return f_191(i_192+1)
      } else error("pattern match fail in //compiler/prelude.jg at line 158, column 13",$phi$12)
    } else error("pattern match fail in //compiler/prelude.jg at line 156, column 9",$phi$10)
  };
  return f_191(0)
};
const Leaf_12 = $_0_119 => $_1_120 => ({$0:$_0_119,$1:$_1_120,$tag:1});
const $class$Eq = $_0 => ({$0:$_0});
const $eq$eq = x_$class$Eq => x_$class$Eq.$0;
const BitmapIndexed_14 = $_0_122 => $_1_123 => ({$0:$_0_122,$1:$_1_123,$tag:3});
const $_16 = f_125 => a_126 => f_125(a_126);
const lookup_66 = local$instance$Eq$1 => local$instance$Hashable$0 => k_283 => t_284 => {
  const hash_285 = (hashCode(local$instance$Hashable$0))(k_283);
  const f_286 = depth_287 => t_288 => {
    if(t_288.$tag==0){
      return Nothing_2
    } else if(t_288.$tag==1){
      const $phi$18 = (($eq$eq(local$instance$Eq$1))(k_283))(t_288.$0);
      if(!$phi$18){
        return Nothing_2
      } else if($phi$18){
        return Just_1(t_288.$1)
      } else error("pattern match fail in //compiler/prelude.jg at line 304, column 18",$phi$18)
    } else if(t_288.$tag==2){
      return ($_16((fmap($instance_457))(snd_28)))((find_34(e_292 => (($eq$eq(local$instance$Eq$1))(fst_27(e_292)))(k_283)))(t_288.$0))
    } else if(t_288.$tag==3){
      const m_295 = (hamtMask_64(depth_287))(hash_285);
      const $phi$16 = m_295&t_288.$0;
      if(0==$phi$16){
        return Nothing_2
      } else return (f_286(depth_287+1))((getIx((hamtIndex_65(t_288.$0))(m_295)))(t_288.$1))
    } else error("pattern match fail in //compiler/prelude.jg at line 302, column 15",t_288)
  };
  return (f_286(0))(t_284)
};
const Lam_782 = $_0_857 => $_1_858 => $_2_859 => ({$0:$_0_857,$1:$_1_858,$2:$_2_859,$tag:3});
const $div$eq_17 = local$instance$Eq$0 => a_127 => b_128 => not_31((($eq$eq(local$instance$Eq$0))(a_127))(b_128));
const mapIx_35 = f_193 => ix_194 => xs_195 => ((setIx(ix_194))(f_193((getIx(ix_194))(xs_195))))(xs_195);
const insert_67 = local$instance$Eq$1 => local$instance$Hashable$0 => k_297 => v_298 => t_299 => {
  const hash_300 = (hashCode(local$instance$Hashable$0))(k_297);
  const f_301 = depth_302 => t_303 => {
    if(t_303.$tag==0){
      return (Leaf_12(k_297))(v_298)
    } else if(t_303.$tag==2){
      return Collision_13((push((Pair_3(k_297))(v_298)))((filter($pat_305 => (($div$eq_17(local$instance$Eq$1))($pat_305.$0))(k_297)))(t_303.$0)))
    } else if(t_303.$tag==1){
      const $phi$23 = (($eq$eq(local$instance$Eq$1))(k_297))(t_303.$0);
      if($phi$23){
        return (Leaf_12(k_297))(v_298)
      } else if(!$phi$23){
        if(7==depth_302){
          return Collision_13([(Pair_3(t_303.$0))(t_303.$1),(Pair_3(k_297))(v_298)])
        } else {
          const m_311 = (hamtMask_64(depth_302))((hashCode(local$instance$Hashable$0))(t_303.$0));
          return (f_301(depth_302))((BitmapIndexed_14(m_311))([(Leaf_12(t_303.$0))(t_303.$1)]))
        }
      } else error("pattern match fail in //compiler/prelude.jg at line 320, column 19",$phi$23)
    } else if(t_303.$tag==3){
      const m_314 = (hamtMask_64(depth_302))(hash_300);
      const bitmap2_315 = m_314|t_303.$0;
      const ix_316 = (hamtIndex_65(bitmap2_315))(m_314);
      const $phi$21 = m_314&t_303.$0;
      if(0==$phi$21){
        return (BitmapIndexed_14(bitmap2_315))(((arrIns(ix_316))((Leaf_12(k_297))(v_298)))(t_303.$1))
      } else return (BitmapIndexed_14(bitmap2_315))(((mapIx_35(f_301(depth_302+1)))(ix_316))(t_303.$1))
    } else error("pattern match fail in //compiler/prelude.jg at line 317, column 15",t_303)
  };
  return (f_301(0))(t_299)
};
const setAnn_810 = local$instance$Eq$1 => local$instance$Hashable$0 => name_929 => val_930 => ann_931 => ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(name_929))(val_930))(ann_931);
const Ok_615 = $_0_628 => ({$0:$_0_628,$tag:0});
const isOk_621 = r_640 => {
  if(r_640.$tag==0){
    return true
  } else return false
};
const $gt_18 = local$instance$Ord$0 => a_129 => b_130 => (($lt(local$instance$Ord$0))(b_130))(a_129);
const Left_8 = $_0_116 => ({$0:$_0_116,$tag:0});
const App_781 = $_0_854 => $_1_855 => $_2_856 => ({$0:$_0_854,$1:$_1_855,$2:$_2_856,$tag:2});
const New_785 = $_0_866 => $_1_867 => $_2_868 => ({$0:$_0_866,$1:$_1_867,$2:$_2_868,$tag:6});
const Let_784 = $_0_863 => $_1_864 => $_2_865 => ({$0:$_0_863,$1:$_1_864,$2:$_2_865,$tag:5});
const Case_783 = $_0_860 => $_1_861 => $_2_862 => ({$0:$_0_860,$1:$_1_861,$2:$_2_862,$tag:4});
const Right_9 = $_0_117 => ({$0:$_0_117,$tag:1});
const breakableDownAndUpM_838 = local$instance$Monad$0 => down_1232 => up_1233 => e_1234 => {
  const go_1235 = ((breakableDownAndUpM_838(local$instance$Monad$0))(down_1232))(up_1233);
  const gos_1236 = (mapM_57(local$instance$Monad$0))(d_1237 => (($gt$gt$eq(local$instance$Monad$0))(go_1235(d_1237.$1)))(e_1240 => (ret(local$instance$Monad$0))((Pair_3(d_1237.$0))(e_1240))));
  return (($gt$gt$eq(local$instance$Monad$0))(down_1232(e_1234)))(e_1241 => {
    if(e_1241.$tag==1){
      return (ret(local$instance$Monad$0))(e_1241.$0)
    } else if(e_1241.$tag==0){
      if(e_1241.$0.$tag==3){
        return (($gt$gt$eq(local$instance$Monad$0))(go_1235(e_1241.$0.$2)))(e_1247 => up_1233(((Lam_782(e_1241.$0.$0))(e_1241.$0.$1))(e_1247)))
      } else if(e_1241.$0.$tag==2){
        return (($gt$gt$eq(local$instance$Monad$0))(go_1235(e_1241.$0.$1)))(f_1251 => (($gt$gt$eq(local$instance$Monad$0))(go_1235(e_1241.$0.$2)))(x_1252 => up_1233(((App_781(e_1241.$0.$0))(f_1251))(x_1252))))
      } else if(e_1241.$0.$tag==4){
        return (($gt$gt$eq(local$instance$Monad$0))(go_1235(e_1241.$0.$1)))(e_1256 => (($gt$gt$eq(local$instance$Monad$0))(gos_1236(e_1241.$0.$2)))(ps_1257 => up_1233(((Case_783(e_1241.$0.$0))(e_1256))(ps_1257))))
      } else if(e_1241.$0.$tag==5){
        return (($gt$gt$eq(local$instance$Monad$0))(gos_1236(e_1241.$0.$1)))(bs_1261 => (($gt$gt$eq(local$instance$Monad$0))(go_1235(e_1241.$0.$2)))(e_1262 => up_1233(((Let_784(e_1241.$0.$0))(bs_1261))(e_1262))))
      } else if(e_1241.$0.$tag==6){
        return (($gt$gt$eq(local$instance$Monad$0))(((mapM_57(local$instance$Monad$0))(go_1235))(e_1241.$0.$2)))(es_1266 => up_1233(((New_785(e_1241.$0.$0))(e_1241.$0.$1))(es_1266)))
      } else return up_1233(e_1241.$0)
    } else error("pattern match fail in //compiler/ast.jg at line 256, column 23",e_1241)
  })
};
const downAndUpM_839 = local$instance$Monad$0 => down_1268 => up_1269 => ((breakableDownAndUpM_838(local$instance$Monad$0))(e_1270 => (($gt$gt$eq(local$instance$Monad$0))(down_1268(e_1270)))(e_1271 => (ret(local$instance$Monad$0))(Left_8(e_1271)))))(up_1269);
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
const trieKeys_75 = m_386 => ((foldTrie_70(ks_387 => k_388 => __389 => (push(k_388))(ks_387)))([]))(m_386);
const Err_616 = $_0_629 => ({$0:$_0_629,$tag:1});
const remove_69 = local$instance$Eq$1 => local$instance$Hashable$0 => k_323 => t_324 => {
  const hash_325 = (hashCode(local$instance$Hashable$0))(k_323);
  const f_326 = depth_327 => t_328 => {
    if(t_328.$tag==0){
      return Empty_11
    } else if(t_328.$tag==1){
      const $phi$46 = (($eq$eq(local$instance$Eq$1))(t_328.$0))(k_323);
      if($phi$46){
        return Empty_11
      } else if(!$phi$46){
        return t_328
      } else error("pattern match fail in //compiler/prelude.jg at line 344, column 18",$phi$46)
    } else if(t_328.$tag==2){
      const entries2_332 = (filter($pat_333 => (($div$eq_17(local$instance$Eq$1))($pat_333.$0))(k_323)))(t_328.$0);
      const $phi$42 = length(entries2_332);
      if(0==$phi$42){
        return Empty_11
      } else if(1==$phi$42){
        const $phi$44 = (getIx(0))(entries2_332);
        return (Leaf_12($phi$44.$0))($phi$44.$1)
      } else return Collision_13(entries2_332)
    } else if(t_328.$tag==3){
      const m_341 = (hamtMask_64(depth_327))(hash_325);
      const ix_342 = (hamtIndex_65(t_328.$0))(m_341);
      const $phi$34 = m_341&t_328.$0;
      if(0==$phi$34){
        return t_328
      } else {
        const $phi$36 = (f_326(depth_327+1))((getIx(ix_342))(t_328.$1));
        if($phi$36.$tag==0){
          const bitmap2_344 = (bitNot(m_341))&t_328.$0;
          const $phi$38 = length(t_328.$1);
          if(1==$phi$38){
            return Empty_11
          } else if(2==$phi$38){
            const e_345 = (getIx(1&(bitNot(ix_342))))(t_328.$1);
            if(e_345.$tag==1){
              return e_345
            } else return (BitmapIndexed_14(bitmap2_344))([e_345])
          } else return (BitmapIndexed_14(bitmap2_344))(((arrDel(ix_342))(1))(t_328.$1))
        } else return (BitmapIndexed_14(t_328.$0))(((setIx(ix_342))($phi$36))(t_328.$1))
      }
    } else error("pattern match fail in //compiler/prelude.jg at line 342, column 15",t_328)
  };
  return (f_326(0))(t_324)
};
const setDiff_85 = local$instance$Eq$1 => local$instance$Hashable$0 => a_411 => b_412 => ((foldTrie_70(r_413 => k_414 => __415 => (((remove_69(local$instance$Eq$1))(local$instance$Hashable$0))(k_414))(r_413)))(a_411))(b_412);
const $instance_506 = $class$Hashable(s_505 => strHashCode(s_505));
const $instance_447 = $class$Eq(jsEq);
const $class$Applicative = $_0 => $_1 => ({$0:$_0,$1:$_1});
const pure = x_$class$Applicative => x_$class$Applicative.$0;
const $instance_494 = ($class$Applicative(a_483 => State_10(s_484 => (Pair_3(s_484))(a_483))))($pat_485 => $pat_487 => State_10(s_489 => {
  const $phi$51 = $pat_485.$0(s_489);
  const $phi$53 = $pat_487.$0($phi$51.$0);
  return (Pair_3($phi$53.$0))($phi$51.$1($phi$53.$1))
}));
const $instance_502 = ($class$Monad(pure($instance_494)))($pat_495 => f_497 => State_10(s_498 => {
  const $phi$56 = $pat_495.$0(s_498);
  const $phi$58 = f_497($phi$56.$1);
  return $phi$58.$0($phi$56.$0)
}));
const $gt$gt_21 = local$instance$Monad$0 => a_135 => b_136 => (($gt$gt$eq(local$instance$Monad$0))(a_135))(__137 => b_136);
const gets_59 = State_10(s_264 => (Pair_3(s_264))(s_264));
const sets_60 = s_265 => State_10(__266 => (Pair_3(s_265))(Unit_0));
const newIdent_4427 = n_4434 => (($gt$gt$eq($instance_502))(gets_59))(i_4435 => (($gt$gt_21($instance_502))(sets_60(i_4435+1)))((ret($instance_502))((n_4434+"_")+(intToString(i_4435)))));
const ImportOpen_806 = $_0_922 => $_1_923 => $_2_924 => ({$0:$_0_922,$1:$_1_923,$2:$_2_924,$tag:1});
const renameImport_4431 = er_4508 => i_4509 => {
  if((i_4509.$tag==1)&&("./builtins.js"==i_4509.$1)){
    return (ret($instance_502))((Pair_3(er_4508.$0))((push(i_4509))(er_4508.$1)))
  } else if(i_4509.$tag==1){
    const rename_4517 = er_4518 => p_4519 => (($gt$gt$eq($instance_502))(newIdent_4427(p_4519.$1)))(n_4524 => (ret($instance_502))((Pair_3(((((insert_67($instance_447))($instance_506))(p_4519.$1))(n_4524))(er_4518.$0)))((push((Pair_3(p_4519.$0))(n_4524)))(er_4518.$1))));
    return (($gt$gt$eq($instance_502))((((foldM_56($instance_502))(rename_4517))((Pair_3(er_4508.$0))([])))(i_4509.$2)))(ens_4525 => (ret($instance_502))((Pair_3(ens_4525.$0))((push(((ImportOpen_806(i_4509.$0))(i_4509.$1))(ens_4525.$1)))(er_4508.$1))))
  } else error("pattern match fail in //compiler/uniquifier.jg at line 45, column 17",i_4509)
};
const Class_795 = $_0_895 => $_1_896 => $_2_897 => $_3_898 => ({$0:$_0_895,$1:$_1_896,$2:$_2_897,$3:$_3_898});
const upM_840 = local$instance$Monad$0 => (downAndUpM_839(local$instance$Monad$0))(ret(local$instance$Monad$0));
const PData_790 = $_0_875 => $_1_876 => $_2_877 => ({$0:$_0_875,$1:$_1_876,$2:$_2_877,$tag:2});
const setAdd_79 = local$instance$Eq$1 => local$instance$Hashable$0 => a_400 => s_401 => ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(a_400))(Unit_0))(s_401);
const setAddAll_80 = local$instance$Eq$1 => local$instance$Hashable$0 => vs_402 => s_403 => ((foldl(s_404 => v_405 => (((setAdd_79(local$instance$Eq$1))(local$instance$Hashable$0))(v_405))(s_404)))(s_403))(vs_402);
const AnnType_773 = $_0_843 => ({$0:$_0_843,$tag:0});
const $class$Monoid = $_0 => ({$0:$_0});
const mzero = x_$class$Monoid => x_$class$Monoid.$0;
const $class$Semigroup = $_0 => ({$0:$_0});
const $lt$gt = x_$class$Semigroup => x_$class$Semigroup.$0;
const mconcat_22 = local$instance$Monoid$1 => local$instance$Semigroup$0 => (foldl($lt$gt(local$instance$Semigroup$0)))(mzero(local$instance$Monoid$1));
const concatMap_44 = local$instance$Monoid$1 => local$instance$Semigroup$0 => f_220 => a_221 => ((mconcat_22(local$instance$Monoid$1))(local$instance$Semigroup$0))((map(f_220))(a_221));
const assert_94 = s_444 => b_445 => {
  if(b_445){
    return true
  } else if(!b_445){
    return error(s_444)
  } else error("pattern match fail in //compiler/prelude.jg at line 447, column 14",b_445)
};
const Const_780 = $_0_852 => $_1_853 => ({$0:$_0_852,$1:$_1_853,$tag:1});
const Var_779 = $_0_850 => $_1_851 => ({$0:$_0_850,$1:$_1_851,$tag:0});
const annOf_828 = e_1111 => {
  if(e_1111.$tag==0){
    return e_1111.$0
  } else if(e_1111.$tag==1){
    return e_1111.$0
  } else if(e_1111.$tag==2){
    return e_1111.$0
  } else if(e_1111.$tag==3){
    return e_1111.$0
  } else if(e_1111.$tag==4){
    return e_1111.$0
  } else if(e_1111.$tag==5){
    return e_1111.$0
  } else if(e_1111.$tag==6){
    return e_1111.$0
  } else error("pattern match fail in //compiler/ast.jg at line 189, column 11",e_1111)
};
const getAnn_809 = local$instance$Eq$1 => local$instance$Hashable$0 => name_927 => ann_928 => (((lookup_66(local$instance$Eq$1))(local$instance$Hashable$0))(name_927))(ann_928);
const getAnnCodeLoc_816 = ann_946 => (((getAnn_809($instance_447))($instance_506))("codeLoc"))(ann_946);
const AnnCodeLoc_774 = $_0_844 => $_1_845 => $_2_846 => ({$0:$_0_844,$1:$_1_845,$2:$_2_846,$tag:1});
const printCodeLoc_818 = l_951 => {
  if(l_951.$tag==1){
    return (((("in "+l_951.$0)+" at line ")+(intToString(l_951.$1+1)))+", column ")+(intToString(l_951.$2+1))
  } else error("pattern match fail in //compiler/ast.jg at line 30, column 18",l_951)
};
const exprLoc_819 = e_955 => {
  const $phi$70 = ($_16(getAnnCodeLoc_816))(annOf_828(e_955));
  if($phi$70.$tag==1){
    return "in unknown location"
  } else if($phi$70.$tag==0){
    return printCodeLoc_818($phi$70.$0)
  } else error("pattern match fail in //compiler/ast.jg at line 34, column 13",$phi$70)
};
const CStr_787 = $_0_870 => ({$0:$_0_870,$tag:1});
const CompilerState_3547 = $_0_3557 => $_1_3558 => $_2_3559 => ({$0:$_0_3557,$1:$_1_3558,$2:$_2_3559});
const getUid_3550 = (($gt$gt$eq($instance_502))(gets_59))(s_3569 => (ret($instance_502))(s_3569.$1));
const Module_791 = $_0_878 => $_1_879 => $_2_880 => $_3_881 => $_4_882 => $_5_883 => $_6_884 => ({$0:$_0_878,$1:$_1_879,$2:$_2_880,$3:$_3_881,$4:$_4_882,$5:$_5_883,$6:$_6_884});
const runState_61 = s_267 => m_268 => m_268.$0(s_267);
const S_3775 = $_0_3783 => $_1_3784 => ({$0:$_0_3783,$1:$_1_3784});
const addTop_3778 = e_3794 => (($gt$gt$eq($instance_502))(gets_59))(s_3795 => {
  const id_3798 = "$lift"+(intToString(s_3795.$0));
  return (($gt$gt_21($instance_502))(sets_60((S_3775(s_3795.$0+1))((push((Pair_3(id_3798))(e_3794)))(s_3795.$1)))))((ret($instance_502))(id_3798))
});
const isJust_26 = m_147 => {
  if(m_147.$tag==0){
    return true
  } else if(m_147.$tag==1){
    return false
  } else error("pattern match fail in //compiler/prelude.jg at line 102, column 12",m_147)
};
const mkBind_3777 = ann_3790 => id_3791 => captured_3792 => {
  const $phi$76 = length(captured_3792);
  if(0==$phi$76){
    return (Var_779(ann_3790))(id_3791)
  } else return ((New_785(ann_3790))("@bind"))((map(Var_779(Empty_11)))((push(id_3791))(captured_3792)))
};
const setContains_82 = local$instance$Eq$1 => local$instance$Hashable$0 => a_406 => s_407 => isJust_26((((lookup_66(local$instance$Eq$1))(local$instance$Hashable$0))(a_406))(s_407));
const PConst_789 = $_0_873 => $_1_874 => ({$0:$_0_873,$1:$_1_874,$tag:1});
const PVar_788 = $_0_871 => $_1_872 => ({$0:$_0_871,$1:$_1_872,$tag:0});
const freeVarsAcc_2496 = fvs_2780 => scope_2781 => e_2782 => {
  const addFree_2783 = local$instance$Eq$1 => local$instance$Hashable$0 => scope_2784 => n_2785 => fvs_2786 => {
    const $phi$78 = (((setContains_82(local$instance$Eq$1))(local$instance$Hashable$0))(n_2785))(scope_2784);
    if(!$phi$78){
      return (((setAdd_79(local$instance$Eq$1))(local$instance$Hashable$0))(n_2785))(fvs_2786)
    } else if($phi$78){
      return fvs_2786
    } else error("pattern match fail in //compiler/newtyper.jg at line 222, column 25",$phi$78)
  };
  if(e_2782.$tag==1){
    return fvs_2780
  } else if(e_2782.$tag==0){
    return ((((addFree_2783($instance_447))($instance_506))(scope_2781))(e_2782.$1))(fvs_2780)
  } else if(e_2782.$tag==2){
    return ((freeVarsAcc_2496(((freeVarsAcc_2496(fvs_2780))(scope_2781))(e_2782.$1)))(scope_2781))(e_2782.$2)
  } else if(e_2782.$tag==3){
    return ((freeVarsAcc_2496(fvs_2780))((((setAdd_79($instance_447))($instance_506))(e_2782.$1))(scope_2781)))(e_2782.$2)
  } else if((e_2782.$tag==6)&&("Array"==e_2782.$1)){
    return ((foldl(fvs_2799 => e_2800 => ((freeVarsAcc_2496(fvs_2799))(scope_2781))(e_2800)))(fvs_2780))(e_2782.$2)
  } else if(e_2782.$tag==6){
    return ((foldl(fvs_2804 => e_2805 => ((freeVarsAcc_2496(fvs_2804))(scope_2781))(e_2805)))(((((addFree_2783($instance_447))($instance_506))(scope_2781))(e_2782.$1))(fvs_2780)))(e_2782.$2)
  } else if(e_2782.$tag==5){
    const scope2_2809 = (((setAddAll_80($instance_447))($instance_506))((map(fst_27))(e_2782.$1)))(scope_2781);
    return ((foldl(fvs_2810 => $pat_2811 => ((freeVarsAcc_2496(fvs_2810))(scope2_2809))($pat_2811.$1)))(((freeVarsAcc_2496(fvs_2780))(scope2_2809))(e_2782.$2)))(e_2782.$1)
  } else if(e_2782.$tag==4){
    const fromPat_2817 = $pat_2819 => p_2822 => {
      if(p_2822.$tag==1){
        return (Pair_3($pat_2819.$0))($pat_2819.$1)
      } else if(p_2822.$tag==0){
        return (Pair_3((((setAdd_79($instance_447))($instance_506))(p_2822.$1))($pat_2819.$0)))($pat_2819.$1)
      } else if(p_2822.$tag==2){
        const $pat_241_12_2830 = ((foldl(fromPat_2817))((Pair_3($pat_2819.$0))($pat_2819.$1)))(p_2822.$2);
        let $phi$82;
        $phi$82 = $pat_241_12_2830.$1;
        const fvs2_2831 = $phi$82;
        let $phi$83;
        $phi$83 = $pat_241_12_2830.$0;
        const scope2_2832 = $phi$83;
        return (Pair_3(scope2_2832))(((((addFree_2783($instance_447))($instance_506))($pat_2819.$0))(p_2822.$1))(fvs2_2831))
      } else error("pattern match fail in //compiler/newtyper.jg at line 238, column 9",p_2822)
    };
    const processPat_2818 = fvs_2837 => $pat_2838 => {
      const $pat_244_8_2841 = (fromPat_2817((Pair_3(scope_2781))(fvs_2837)))($pat_2838.$0);
      let $phi$85;
      $phi$85 = $pat_244_8_2841.$1;
      const fvs2_2842 = $phi$85;
      let $phi$86;
      $phi$86 = $pat_244_8_2841.$0;
      const scope2_2843 = $phi$86;
      return ((freeVarsAcc_2496(fvs2_2842))(scope2_2843))($pat_2838.$1)
    };
    return ((foldl(processPat_2818))(((freeVarsAcc_2496(fvs_2780))(scope_2781))(e_2782.$1)))(e_2782.$2)
  } else error("pattern match fail in //compiler/newtyper.jg at line 226, column 6",e_2782)
};
const freeVars_2497 = freeVarsAcc_2496(Empty_11);
const setToArray_84 = (foldTrie_70(vs_408 => v_409 => __410 => (push(v_409))(vs_408)))([]);
const CNum_786 = $_0_869 => ({$0:$_0_869,$tag:0});
const mkClosure_3776 = captured_3785 => lam_3786 => {
  const $phi$89 = length(captured_3785);
  if(0==$phi$89){
    return lam_3786
  } else return ((New_785(Empty_11))("@closure"))([(Const_780(Empty_11))(CNum_786($phi$89)),((foldr(b_3788 => p_3789 => ((Lam_782(Empty_11))(p_3789))(b_3788)))(lam_3786))(captured_3785)])
};
const lift_3779 = top_3799 => e_3800 => {
  if(e_3800.$tag==3){
    const captured_3804 = (filter(v_3806 => not_31(($_16(isJust_26))((((lookup_66($instance_447))($instance_506))(v_3806))(top_3799)))))(($_16(setToArray_84))((freeVars_2497(Empty_11))(e_3800)));
    const closure_3805 = (mkClosure_3776(captured_3804))(e_3800);
    return (($gt$gt$eq($instance_502))(addTop_3778(closure_3805)))(id_3807 => (ret($instance_502))(((mkBind_3777(e_3800.$0))(id_3807))(captured_3804)))
  } else return (ret($instance_502))(e_3800)
};
const liftBinding_3780 = top_3809 => b_3810 => (($gt$gt$eq($instance_502))(((upM_840($instance_502))(lift_3779(top_3809)))(b_3810.$1)))(e_3813 => (ret($instance_502))((Pair_3(b_3810.$0))(e_3813)));
const liftTop_3781 = uid_3814 => top_3815 => bs_3816 => {
  const $phi$93 = (runState_61((S_3775(uid_3814))([])))(((mapM_57($instance_502))(liftBinding_3780(top_3815)))(bs_3816));
  return (Pair_3($phi$93.$0.$0))((concat($phi$93.$0.$1))($phi$93.$1))
};
const setUid_3551 = uid_3573 => (($gt$gt$eq($instance_502))(gets_59))(s_3574 => sets_60(((CompilerState_3547(s_3574.$0))(uid_3573))(s_3574.$2)));
const liftModule_3782 = m_3820 => (($gt$gt$eq($instance_502))(getUid_3550))(uid_3821 => {
  const fromImp_3829 = s_3831 => i_3832 => {
    if(i_3832.$tag==1){
      return (((setAddAll_80($instance_447))($instance_506))((map(snd_28))(i_3832.$2)))(s_3831)
    } else error("pattern match fail in //compiler/lambdaLifter.jg at line 37, column 19",i_3832)
  };
  const top_3830 = ((foldl(fromImp_3829))((((setAddAll_80($instance_447))($instance_506))((map(fst_27))(m_3820.$6)))(Empty_11)))(m_3820.$2);
  const $phi$98 = ((liftTop_3781(uid_3821))(top_3830))(m_3820.$6);
  return (($gt$gt_21($instance_502))(setUid_3551($phi$98.$0)))((ret($instance_502))(((((((Module_791(m_3820.$0))(m_3820.$1))(m_3820.$2))(m_3820.$3))(m_3820.$4))(m_3820.$5))($phi$98.$1)))
});
const $instance_446 = $class$Eq(jsEq);
const head_46 = getIx(0);
const tail_47 = slice(1);
const zip_43 = xs_218 => ys_219 => {
  const $phi$100 = ((($eq$eq($instance_446))(length(xs_218)))(0))||((($eq$eq($instance_446))(length(ys_219)))(0));
  if($phi$100){
    return []
  } else if(!$phi$100){
    return (enqueue((Pair_3(head_46(xs_218)))(head_46(ys_219))))((zip_43(tail_47(xs_218)))(tail_47(ys_219)))
  } else error("pattern match fail in //compiler/prelude.jg at line 190, column 13",$phi$100)
};
const compareArr_822 = f_967 => xs_968 => ys_969 => {
  const diffs_970 = ($_16(filter(($div$eq_17($instance_446))(0))))((map($pat_971 => (f_967($pat_971.$0))($pat_971.$1)))((zip_43(xs_968))(ys_969)));
  const $phi$103 = length(diffs_970);
  if(0==$phi$103){
    return (length(xs_968))-(length(ys_969))
  } else return head_46(diffs_970)
};
const JSIf_6164 = $_0_6203 => $_1_6204 => $_2_6205 => ({$0:$_0_6203,$1:$_1_6204,$2:$_2_6205,$tag:8});
const last_48 = l_228 => (getIx((length(l_228))-1))(l_228);
const dedup_53 = local$instance$Eq$0 => xs_237 => {
  const f_238 = local$instance$Eq$1 => xs_239 => x_240 => {
    const $phi$105 = (($eq$eq(local$instance$Eq$1))(last_48(xs_239)))(x_240);
    if($phi$105){
      return xs_239
    } else if(!$phi$105){
      return (push(x_240))(xs_239)
    } else error("pattern match fail in //compiler/prelude.jg at line 226, column 12",$phi$105)
  };
  const $phi$107 = length(xs_237);
  if(0==$phi$107){
    return xs_237
  } else if(1==$phi$107){
    return xs_237
  } else return ((foldl(f_238(local$instance$Eq$0)))([head_46(xs_237)]))(tail_47(xs_237))
};
const debug2_87 = p_422 => x_423 => snd_28((Pair_3(debug(p_422)))(x_423));
const debugIf_88 = p_424 => m_425 => x_426 => {
  if(!p_424){
    return x_426
  } else if(p_424){
    return (debug2_87(m_425))(x_426)
  } else error("pattern match fail in //compiler/prelude.jg at line 416, column 17",p_424)
};
const debugMaybe_89 = m_427 => x_428 => {
  if(m_427.$tag==1){
    return x_428
  } else if(m_427.$tag==0){
    return (debug2_87(m_427.$0))(x_428)
  } else error("pattern match fail in //compiler/prelude.jg at line 420, column 18",m_427)
};
const AnnUseCount_775 = $_0_847 => ({$0:$_0_847,$tag:2});
const mapFst_92 = f_436 => $pat_437 => (Pair_3(f_436($pat_437.$0)))($pat_437.$1);
const trieEntries_76 = m_390 => ((foldTrie_70(es_391 => k_392 => v_393 => (push((Pair_3(k_392))(v_393)))(es_391)))([]))(m_390);
const JSCall_6143 = $_0_6174 => $_1_6175 => ({$0:$_0_6174,$1:$_1_6175,$tag:4});
const either_29 = f_155 => g_156 => e_157 => {
  if(e_157.$tag==0){
    return f_155(e_157.$0)
  } else if(e_157.$tag==1){
    return g_156(e_157.$0)
  } else error("pattern match fail in //compiler/prelude.jg at line 123, column 20",e_157)
};
const JSTernary_6145 = $_0_6178 => $_1_6179 => $_2_6180 => ({$0:$_0_6178,$1:$_1_6179,$2:$_2_6180,$tag:6});
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
const TUnknown_804 = {$tag:7};
const getAnnType_814 = ann_942 => {
  const $phi$114 = (((getAnn_809($instance_447))($instance_506))("type"))(ann_942);
  if(($phi$114.$tag==0)&&($phi$114.$0.$tag==0)){
    return $phi$114.$0.$0
  } else if($phi$114.$tag==1){
    return TUnknown_804
  } else error("pattern match fail in //compiler/ast.jg at line 23, column 18",$phi$114)
};
const getPatType_831 = p_1153 => {
  if(p_1153.$tag==0){
    return getAnnType_814(p_1153.$0)
  } else if(p_1153.$tag==1){
    return getAnnType_814(p_1153.$0)
  } else if(p_1153.$tag==2){
    return getAnnType_814(p_1153.$0)
  } else error("pattern match fail in //compiler/ast.jg at line 209, column 16",p_1153)
};
const getAnnE_812 = name_938 => e_939 => (((getAnn_809($instance_447))($instance_506))(name_938))(annOf_828(e_939));
const JSReturn_6157 = $_0_6192 => ({$0:$_0_6192,$tag:1});
const mapJust_45 = f_222 => xs_223 => {
  const g_224 = r_225 => x_226 => {
    const $phi$117 = f_222(x_226);
    if($phi$117.$tag==1){
      return r_225
    } else if($phi$117.$tag==0){
      return (push($phi$117.$0))(r_225)
    } else error("pattern match fail in //compiler/prelude.jg at line 197, column 11",$phi$117)
  };
  return ((foldl(g_224))([]))(xs_223)
};
const forM_58 = local$instance$Monad$0 => xs_262 => f_263 => ((mapM_57(local$instance$Monad$0))(f_263))(xs_262);
const loop_32 = f_170 => start_171 => {
  const next_173 = $pat_178 => {
    const $phi$120 = f_170($pat_178.$0);
    if($phi$120.$tag==0){
      return (Pair_3($phi$120.$0))(Nothing_2)
    } else if($phi$120.$tag==1){
      return (Pair_3($pat_178.$0))(Just_1($phi$120.$0))
    } else error("pattern match fail in //compiler/prelude.jg at line 141, column 17",$phi$120)
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
    const $phi$125 = (($lt($instance_448))($pat_248.$0))(length(s_246));
    if(!$phi$125){
      return Right_9($pat_248.$1)
    } else if($phi$125){
      return Left_8((Pair_3($pat_248.$0+1))((push((getChar($pat_248.$0))(s_246)))($pat_248.$1)))
    } else error("pattern match fail in //compiler/prelude.jg at line 237, column 14",$phi$125)
  };
  return (loop_32(f_247))((Pair_3(0))([]))
};
const insertAll_77 = local$instance$Eq$1 => local$instance$Hashable$0 => es_394 => m_395 => ((foldl(m_396 => $pat_397 => ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))($pat_397.$0))($pat_397.$1))(m_396)))(m_395))(es_394);
const setAnnType_815 = t_944 => ann_945 => ((((setAnn_810($instance_447))($instance_506))("type"))(AnnType_773(t_944)))(ann_945);
const setType_827 = t_1090 => e_1091 => {
  if(e_1091.$tag==0){
    return (Var_779((setAnnType_815(t_1090))(e_1091.$0)))(e_1091.$1)
  } else if(e_1091.$tag==1){
    return (Const_780((setAnnType_815(t_1090))(e_1091.$0)))(e_1091.$1)
  } else if(e_1091.$tag==2){
    return ((App_781((setAnnType_815(t_1090))(e_1091.$0)))(e_1091.$1))(e_1091.$2)
  } else if(e_1091.$tag==3){
    return ((Lam_782((setAnnType_815(t_1090))(e_1091.$0)))(e_1091.$1))(e_1091.$2)
  } else if(e_1091.$tag==4){
    return ((Case_783((setAnnType_815(t_1090))(e_1091.$0)))(e_1091.$1))(e_1091.$2)
  } else if(e_1091.$tag==5){
    return ((Let_784((setAnnType_815(t_1090))(e_1091.$0)))(e_1091.$1))(e_1091.$2)
  } else if(e_1091.$tag==6){
    return ((New_785((setAnnType_815(t_1090))(e_1091.$0)))(e_1091.$1))(e_1091.$2)
  } else error("pattern match fail in //compiler/ast.jg at line 180, column 15",e_1091)
};
const breakableDownAndUp_833 = down_1170 => up_1171 => a_1172 => e_1173 => {
  const go_1174 = (breakableDownAndUp_833(down_1170))(up_1171);
  const gos_1175 = a_1176 => (foldl(ar_1177 => p_1178 => {
    const $phi$129 = (go_1174(fst_27(ar_1177)))(snd_28(p_1178));
    return (Pair_3($phi$129.$0))((push((Pair_3(fst_27(p_1178)))($phi$129.$1)))(snd_28(ar_1177)))
  }))((Pair_3(a_1176))([]));
  const $phi$131 = (down_1170(a_1172))(e_1173);
  if($phi$131.$tag==1){
    return $phi$131.$0
  } else if($phi$131.$tag==0){
    let $phi$132;
    if($phi$131.$0.$1.$tag==3){
      let $phi$150;
      const $phi$151 = (go_1174($phi$131.$0.$0))($phi$131.$0.$1.$2);
      $phi$150 = ((Pair_3($phi$151.$0))(((Lam_782($phi$131.$0.$1.$0))($phi$131.$0.$1.$1))($phi$151.$1)));
      $phi$132 = $phi$150
    } else if($phi$131.$0.$1.$tag==2){
      let $phi$146;
      const $phi$147 = (go_1174($phi$131.$0.$0))($phi$131.$0.$1.$1);
      let $phi$148;
      const $phi$149 = (go_1174($phi$147.$0))($phi$131.$0.$1.$2);
      $phi$148 = ((Pair_3($phi$149.$0))(((App_781($phi$131.$0.$1.$0))($phi$147.$1))($phi$149.$1)));
      $phi$146 = $phi$148;
      $phi$132 = $phi$146
    } else if($phi$131.$0.$1.$tag==4){
      let $phi$142;
      const $phi$143 = (go_1174($phi$131.$0.$0))($phi$131.$0.$1.$1);
      let $phi$144;
      const $phi$145 = (gos_1175($phi$143.$0))($phi$131.$0.$1.$2);
      $phi$144 = ((Pair_3($phi$145.$0))(((Case_783($phi$131.$0.$1.$0))($phi$143.$1))($phi$145.$1)));
      $phi$142 = $phi$144;
      $phi$132 = $phi$142
    } else if($phi$131.$0.$1.$tag==5){
      let $phi$138;
      const $phi$139 = (gos_1175($phi$131.$0.$0))($phi$131.$0.$1.$1);
      let $phi$140;
      const $phi$141 = (go_1174($phi$139.$0))($phi$131.$0.$1.$2);
      $phi$140 = ((Pair_3($phi$141.$0))(((Let_784($phi$131.$0.$1.$0))($phi$139.$1))($phi$141.$1)));
      $phi$138 = $phi$140;
      $phi$132 = $phi$138
    } else if($phi$131.$0.$1.$tag==6){
      const f_1214 = aes_1215 => e_1216 => {
        const $phi$135 = (go_1174(aes_1215.$0))(e_1216);
        return (Pair_3($phi$135.$0))((push($phi$135.$1))(aes_1215.$1))
      };
      let $phi$136;
      const $phi$137 = ((foldl(f_1214))((Pair_3(a_1172))([])))($phi$131.$0.$1.$2);
      $phi$136 = ((Pair_3($phi$137.$0))(((New_785($phi$131.$0.$1.$0))($phi$131.$0.$1.$1))($phi$137.$1)));
      $phi$132 = $phi$136
    } else $phi$132 = ((Pair_3($phi$131.$0.$0))($phi$131.$0.$1));
    const ae_1184 = $phi$132;
    return (up_1171(ae_1184.$0))(ae_1184.$1)
  } else error("pattern match fail in //compiler/ast.jg at line 222, column 6",$phi$131)
};
const downAndUp_834 = down_1226 => up_1227 => (breakableDownAndUp_833(a_1228 => e_1229 => Left_8((down_1226(a_1228))(e_1229))))(up_1227);
const down_836 = f_1230 => (downAndUp_834(f_1230))(Pair_3);
const updateOrSet_68 = local$instance$Eq$1 => local$instance$Hashable$0 => k_318 => f_319 => d_320 => m_321 => {
  const $phi$154 = (((lookup_66(local$instance$Eq$1))(local$instance$Hashable$0))(k_318))(m_321);
  if($phi$154.$tag==1){
    return ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(k_318))(d_320))(m_321)
  } else if($phi$154.$tag==0){
    return ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(k_318))(f_319($phi$154.$0)))(m_321)
  } else error("pattern match fail in //compiler/prelude.jg at line 336, column 23",$phi$154)
};
const $lt$mul$gt = x_$class$Applicative => x_$class$Applicative.$1;
const $lt$pip_7408 = local$instance$Applicative$0 => a_7429 => b_7430 => (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(a_7431 => __7432 => a_7431)))(a_7429)))(b_7430);
const TApp_800 = $_0_909 => $_1_910 => $_2_911 => ({$0:$_0_909,$1:$_1_910,$2:$_2_911,$tag:3});
const StrTok_7600 = {$tag:3};
const Token_7604 = $_0_7630 => $_1_7631 => $_2_7632 => $_3_7633 => ({$0:$_0_7630,$1:$_1_7631,$2:$_2_7632,$3:$_3_7633});
const Success_7403 = $_0_7418 => $_1_7419 => ({$0:$_0_7418,$1:$_1_7419,$tag:0});
const Error_7404 = $_0_7420 => ({$0:$_0_7420,$tag:1});
const ParserState_7858 = $_0_7938 => $_1_7939 => $_2_7940 => $_3_7941 => $_4_7942 => ({$0:$_0_7938,$1:$_1_7939,$2:$_2_7940,$3:$_3_7941,$4:$_4_7942});
const Parser_7405 = $_0_7421 => ({$0:$_0_7421});
const parseToken_7862 = f_7963 => {
  const parse_7964 = s_7965 => {
    const $phi$158 = (($lt($instance_448))(s_7965.$1))(length(s_7965.$0));
    if(!$phi$158){
      return Error_7404("run out of tokens")
    } else if($phi$158){
      const $phi$160 = (getIx(s_7965.$1))(s_7965.$0);
      const $phi$162 = (($lt($instance_448))($phi$160.$3))(s_7965.$3);
      if($phi$162){
        return Error_7404("token not indented sufficiently")
      } else if(!$phi$162){
        const $phi$164 = f_7963((getIx(s_7965.$1))(s_7965.$0));
        if($phi$164.$tag==1){
          return Error_7404("parser fun failed")
        } else if($phi$164.$tag==0){
          const $phi$166 = (($lt($instance_448))(s_7965.$1+1))(length(s_7965.$0));
          if(!$phi$166){
            return (Success_7403($phi$164.$0))(((((ParserState_7858(s_7965.$0))(s_7965.$1+1))(s_7965.$2))(s_7965.$3))(s_7965.$4))
          } else if($phi$166){
            const $phi$168 = (getIx(s_7965.$1+1))(s_7965.$0);
            const $phi$170 = (($gt_18($instance_448))($phi$168.$2))($phi$160.$2);
            if(!$phi$170){
              return (Success_7403($phi$164.$0))(((((ParserState_7858(s_7965.$0))(s_7965.$1+1))(s_7965.$2))(s_7965.$3))(s_7965.$4))
            } else if($phi$170){
              return (Success_7403($phi$164.$0))(((((ParserState_7858(s_7965.$0))(s_7965.$1+1))($phi$168.$3))(s_7965.$3))(s_7965.$4))
            } else error("pattern match fail in //compiler/jaguarParser.jg at line 41, column 35",$phi$170)
          } else error("pattern match fail in //compiler/jaguarParser.jg at line 38, column 23",$phi$166)
        } else error("pattern match fail in //compiler/jaguarParser.jg at line 35, column 20",$phi$164)
      } else error("pattern match fail in //compiler/jaguarParser.jg at line 32, column 26",$phi$162)
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 28, column 34",$phi$158)
  };
  return Parser_7405(parse_7964)
};
const strP_7893 = parseToken_7862(t_8107 => {
  if(t_8107.$0.$tag==3){
    return Just_1(t_8107.$1)
  } else return Nothing_2
});
const repeat_40 = s_213 => n_214 => {
  const $phi$173 = (($lt($instance_448))(n_214))(1);
  if($phi$173){
    return ""
  } else if(!$phi$173){
    return s_213+((repeat_40(s_213))(n_214-1))
  } else error("pattern match fail in //compiler/prelude.jg at line 180, column 14",$phi$173)
};
const zipWithIndex2_41 = n_215 => xs_216 => {
  const $phi$175 = length(xs_216);
  if(0==$phi$175){
    return []
  } else return (enqueue((Pair_3(n_215))(head_46(xs_216))))((zipWithIndex2_41(n_215+1))(tail_47(xs_216)))
};
const debugWrap_90 = tag_430 => f_431 => {
  const x_432 = f_431(Unit_0);
  return ($_16(debug2_87("** start: "+tag_430)))((debug2_87("** stop: "+tag_430))(x_432))
};
const Instance_796 = $_0_899 => $_1_900 => $_2_901 => $_3_902 => ({$0:$_0_899,$1:$_1_900,$2:$_2_901,$3:$_3_902});
const TRow_801 = $_0_912 => $_1_913 => $_2_914 => ({$0:$_0_912,$1:$_1_913,$2:$_2_914,$tag:4});
const TBot_802 = {$tag:5};
const TSkolem_799 = $_0_907 => $_1_908 => ({$0:$_0_907,$1:$_1_908,$tag:2});
const TConst_797 = $_0_903 => $_1_904 => ({$0:$_0_903,$1:$_1_904,$tag:0});
const TVar_798 = $_0_905 => $_1_906 => ({$0:$_0_905,$1:$_1_906,$tag:1});
const TForall_803 = $_0_915 => $_1_916 => $_2_917 => $_3_918 => ({$0:$_0_915,$1:$_1_916,$2:$_2_917,$3:$_3_918,$tag:6});
const printType_1442 = t_1447 => {
  const printParen_1448 = t_1452 => ("("+(printType_1442(t_1452)))+")";
  const printFirstTypeInApp_1450 = t_1464 => {
    if((t_1464.$tag==3)&&((t_1464.$1.$tag==3)&&((t_1464.$1.$1.$tag==0)&&("->"==t_1464.$1.$1.$1)))){
      return printParen_1448(t_1464)
    } else if(t_1464.$tag==6){
      return printParen_1448(t_1464)
    } else return printType_1442(t_1464)
  };
  const printSecondTypeInApp_1451 = t_1475 => {
    if(t_1475.$tag==3){
      return printParen_1448(t_1475)
    } else if(t_1475.$tag==6){
      return printParen_1448(t_1475)
    } else return printType_1442(t_1475)
  };
  const printTypeInFun_1449 = t_1453 => {
    if((t_1453.$tag==3)&&((t_1453.$1.$tag==3)&&((t_1453.$1.$1.$tag==0)&&("->"==t_1453.$1.$1.$1)))){
      return printParen_1448(t_1453)
    } else if(t_1453.$tag==6){
      return printParen_1448(t_1453)
    } else return printType_1442(t_1453)
  };
  if(t_1447.$tag==0){
    return t_1447.$1
  } else if(t_1447.$tag==1){
    return t_1447.$1
  } else if(t_1447.$tag==2){
    return "~"+t_1447.$1
  } else if(t_1447.$tag==5){
    return "~bottom~"
  } else if(t_1447.$tag==7){
    return "?"
  } else if((t_1447.$tag==3)&&((t_1447.$1.$tag==3)&&((t_1447.$1.$1.$tag==0)&&("->"==t_1447.$1.$1.$1)))){
    return ((printTypeInFun_1449(t_1447.$1.$2))+" -> ")+(printType_1442(t_1447.$2))
  } else if(t_1447.$tag==3){
    return ((printFirstTypeInApp_1450(t_1447.$1))+" ")+(printSecondTypeInApp_1451(t_1447.$2))
  } else if(t_1447.$tag==6){
    let $phi$181;
    const $phi$182 = length(t_1447.$2);
    if(0==$phi$182){
      $phi$181 = ""
    } else $phi$181 = (" with "+((intercalate(", "))((map(printType_1442))(t_1447.$2))));
    const bounds_1502 = $phi$181;
    return ((("forall "+((intercalate(", "))(t_1447.$1)))+bounds_1502)+". ")+(printType_1442(t_1447.$3))
  } else if((t_1447.$tag==4)&&(t_1447.$2.$tag==1)){
    const f_1506 = $pat_1508 => ($pat_1508.$0+" :: ")+(printType_1442($pat_1508.$1));
    const pkvs_1507 = (map(f_1506))(trieEntries_76(t_1447.$1));
    return ("{"+((intercalate(", "))(pkvs_1507)))+"}"
  } else return error("cannot print "+(jsonStringify(t_1447)))
};
const join_39 = xs_208 => s_209 => {
  const $phi$184 = length(xs_208);
  if(0==$phi$184){
    return ""
  } else return (foldl1(a_211 => b_212 => (a_211+s_209)+b_212))(xs_208)
};
const $instance_452 = $class$Monoid([]);
const $instance_450 = $class$Semigroup(concat);
const indent_1445 = map(l_1571 => "  "+l_1571);
const getType_830 = e_1152 => ($_16(getAnnType_814))(annOf_828(e_1152));
const init_49 = l_229 => ((slice2(0))((length(l_229))-1))(l_229);
const printExprTyped_1443 = typed_1512 => e_1513 => {
  const printT_1520 = e_1564 => {
    const t_1565 = getType_830(e_1564);
    return printType_1442(t_1565)
  };
  const sameLine_1515 = xs_1524 => ys_1525 => (concat(init_49(xs_1524)))((enqueue((last_48(xs_1524))+(head_46(ys_1525))))(tail_47(ys_1525)));
  const sameLine3_1516 = a_1526 => b_1527 => c_1528 => (sameLine_1515(a_1526))((sameLine_1515(b_1527))(c_1528));
  const printPat_1518 = p_1532 => {
    if(p_1532.$tag==0){
      return p_1532.$1
    } else if((p_1532.$tag==1)&&(p_1532.$1.$tag==0)){
      return jsonStringify(p_1532.$1.$0)
    } else if((p_1532.$tag==1)&&(p_1532.$1.$tag==1)){
      return jsonStringify(p_1532.$1.$0)
    } else if(p_1532.$tag==2){
      return ((p_1532.$1+" (")+((join_39((map(printPat_1518))(p_1532.$2)))(") (")))+")"
    } else error("pattern match fail in //compiler/printer.jg at line 51, column 18",p_1532)
  };
  const printParen_1514 = e_1523 => ((sameLine3_1516(["("]))(printExpr_1521(e_1523)))([")"]);
  const printCasePat_1517 = cp_1529 => (enqueue((printPat_1518(cp_1529.$0))+" ->"))(indent_1445(printExpr_1521(cp_1529.$1)));
  const printE_1519 = e_1542 => {
    if(e_1542.$tag==0){
      return [e_1542.$1]
    } else if((e_1542.$tag==1)&&(e_1542.$1.$tag==0)){
      return [jsonStringify(e_1542.$1.$0)]
    } else if((e_1542.$tag==1)&&(e_1542.$1.$tag==1)){
      return [jsonStringify(e_1542.$1.$0)]
    } else if(e_1542.$tag==2){
      return ((sameLine3_1516(printParen_1514(e_1542.$1)))([" "]))(printParen_1514(e_1542.$2))
    } else if(e_1542.$tag==3){
      return (enqueue(("\\"+e_1542.$1)+" ->"))(indent_1445(printExpr_1521(e_1542.$2)))
    } else if(e_1542.$tag==4){
      return (concat(((sameLine3_1516(["case "]))(printParen_1514(e_1542.$1)))([" of"])))(indent_1445((((concatMap_44($instance_452))($instance_450))(printCasePat_1517))(e_1542.$2)))
    } else if(e_1542.$tag==5){
      return (concat((push("in"))((enqueue("let"))(indent_1445((((concatMap_44($instance_452))($instance_450))(printDef_1444(typed_1512)))(e_1542.$1))))))(indent_1445(printExpr_1521(e_1542.$2)))
    } else if(e_1542.$tag==6){
      return (push(e_1542.$1))(indent_1445((((concatMap_44($instance_452))($instance_450))(printExprTyped_1443(typed_1512)))(e_1542.$2)))
    } else error("pattern match fail in //compiler/printer.jg at line 56, column 16",e_1542)
  };
  const printExpr_1521 = e_1566 => {
    if(!typed_1512){
      return printE_1519(e_1566)
    } else if(typed_1512){
      return ((sameLine3_1516(["("]))(printE_1519(e_1566)))([(" :: "+(printT_1520(e_1566)))+" )"])
    } else error("pattern match fail in //compiler/printer.jg at line 81, column 19",typed_1512)
  };
  const pe_1522 = printE_1519(e_1513);
  return printExpr_1521(e_1513)
};
const printDef_1444 = typed_1567 => d_1568 => (enqueue(d_1568.$0+" ="))(indent_1445((printExprTyped_1443(typed_1567))(d_1568.$1)));
const contains_33 = local$instance$Eq$0 => x_185 => xs_186 => {
  const f_187 = i_188 => {
    const $phi$191 = (($lt($instance_448))(i_188))(length(xs_186));
    if(!$phi$191){
      return false
    } else if($phi$191){
      const $phi$193 = (($eq$eq(local$instance$Eq$0))(x_185))((getIx(i_188))(xs_186));
      if($phi$193){
        return true
      } else if(!$phi$193){
        return f_187(i_188+1)
      } else error("pattern match fail in //compiler/prelude.jg at line 150, column 13",$phi$193)
    } else error("pattern match fail in //compiler/prelude.jg at line 148, column 9",$phi$191)
  };
  return f_187(0)
};
const containsChar_36 = x_196 => xs_197 => {
  const f_198 = i_199 => {
    const $phi$195 = (($lt($instance_448))(i_199))(length(xs_197));
    if(!$phi$195){
      return false
    } else if($phi$195){
      const $phi$197 = (($eq$eq($instance_447))((getChar(i_199))(xs_197)))(x_196);
      if($phi$197){
        return true
      } else if(!$phi$197){
        return f_198(i_199+1)
      } else error("pattern match fail in //compiler/prelude.jg at line 168, column 13",$phi$197)
    } else error("pattern match fail in //compiler/prelude.jg at line 166, column 9",$phi$195)
  };
  return f_198(0)
};
const setAnnCodeLoc_817 = file_947 => line_948 => col_949 => ann_950 => ((((setAnn_810($instance_447))($instance_506))("codeLoc"))(((AnnCodeLoc_774(file_947))(line_948))(col_949)))(ann_950);
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
const up_835 = downAndUp_834(Pair_3);
const $instance_7475 = ($class$Applicative(x_7463 => Parser_7405(Success_7403(x_7463))))(pf_7464 => pa_7465 => Parser_7405(i_7468 => {
  const $phi$203 = pf_7464.$0(i_7468);
  if($phi$203.$tag==1){
    return Error_7404($phi$203.$0)
  } else if($phi$203.$tag==0){
    const $phi$205 = pa_7465.$0($phi$203.$1);
    if($phi$205.$tag==1){
      return Error_7404($phi$205.$0)
    } else if($phi$205.$tag==0){
      return (Success_7403($phi$203.$0($phi$205.$0)))($phi$205.$1)
    } else error("pattern match fail in //compiler/parsers.jg at line 26, column 24",$phi$205)
  } else error("pattern match fail in //compiler/parsers.jg at line 24, column 34",$phi$203)
}));
const applyParser_7406 = p_7422 => i_7423 => p_7422.$0(i_7423);
const many_7409 = p_7433 => {
  const manyIterate_7434 = s_7435 => {
    const r_7436 = ((iterate(Left_8((Success_7403([]))(s_7435))))(r_7437 => {
      if(r_7437.$tag==0){
        return false
      } else if(r_7437.$tag==1){
        return true
      } else error("pattern match fail in //compiler/parsers.jg at line 45, column 14",r_7437)
    }))(rs_7440 => {
      if((rs_7440.$tag==0)&&(rs_7440.$0.$tag==0)){
        const $phi$210 = (applyParser_7406(p_7433))(rs_7440.$0.$1);
        if($phi$210.$tag==0){
          return Left_8((Success_7403((push($phi$210.$0))(rs_7440.$0.$0)))($phi$210.$1))
        } else if($phi$210.$tag==1){
          return Right_9((Success_7403(rs_7440.$0.$0))(rs_7440.$0.$1))
        } else error("pattern match fail in //compiler/parsers.jg at line 48, column 49",$phi$210)
      } else error("pattern match fail in //compiler/parsers.jg at line 48, column 15",rs_7440)
    });
    if(r_7436.$tag==1){
      return r_7436.$0
    } else if(r_7436.$tag==0){
      return error("manyIterate should never return a Left")
    } else error("pattern match fail in //compiler/parsers.jg at line 51, column 8",r_7436)
  };
  return Parser_7405(manyIterate_7434)
};
const some_7410 = p_7448 => (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(enqueue)))(p_7448)))(many_7409(p_7448));
const mergeTrie_74 = local$instance$Eq$1 => local$instance$Hashable$0 => a_381 => b_382 => ((foldTrie_70(a_383 => k_384 => v_385 => ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(k_384))(v_385))(a_383)))(a_381))(b_382);
const setUnion_83 = local$instance$Eq$1 => local$instance$Hashable$0 => (mergeTrie_74(local$instance$Eq$1))(local$instance$Hashable$0);
const withAnn_829 = ann_1131 => e_1132 => {
  if(e_1132.$tag==0){
    return (Var_779(ann_1131))(e_1132.$1)
  } else if(e_1132.$tag==1){
    return (Const_780(ann_1131))(e_1132.$1)
  } else if(e_1132.$tag==2){
    return ((App_781(ann_1131))(e_1132.$1))(e_1132.$2)
  } else if(e_1132.$tag==3){
    return ((Lam_782(ann_1131))(e_1132.$1))(e_1132.$2)
  } else if(e_1132.$tag==4){
    return ((Case_783(ann_1131))(e_1132.$1))(e_1132.$2)
  } else if(e_1132.$tag==5){
    return ((Let_784(ann_1131))(e_1132.$1))(e_1132.$2)
  } else if(e_1132.$tag==6){
    return ((New_785(ann_1131))(e_1132.$1))(e_1132.$2)
  } else error("pattern match fail in //compiler/ast.jg at line 198, column 17",e_1132)
};
const $class$Alternative = $_0 => $_1 => ({$0:$_0,$1:$_1});
const $instance_7485 = ($class$Alternative(Parser_7405(__7476 => Error_7404("parser failure"))))(pa_7477 => pb_7478 => Parser_7405(i_7481 => {
  const $phi$216 = pa_7477.$0(i_7481);
  if($phi$216.$tag==1){
    return pb_7478.$0(i_7481)
  } else if($phi$216.$tag==0){
    return (Success_7403($phi$216.$0))($phi$216.$1)
  } else error("pattern match fail in //compiler/parsers.jg at line 34, column 34",$phi$216)
}));
const AnnTag_777 = {$tag:4};
const betaReduction_4734 = e_4972 => {
  const f_4973 = e_4974 => {
    if((e_4974.$tag==2)&&(e_4974.$1.$tag==3)){
      if(e_4974.$2.$tag==0){
        const $phi$220 = (($eq$eq($instance_447))(e_4974.$1.$1))(e_4974.$2.$1);
        if($phi$220){
          return e_4974.$1.$2
        } else if(!$phi$220){
          return ((Let_784(e_4974.$0))([(Pair_3(e_4974.$1.$1))((Var_779(e_4974.$2.$0))(e_4974.$2.$1))]))(e_4974.$1.$2)
        } else error("pattern match fail in //compiler/inliner.jg at line 135, column 21",$phi$220)
      } else return ((Let_784(e_4974.$0))([(Pair_3(e_4974.$1.$1))(e_4974.$2)]))(e_4974.$1.$2)
    } else return e_4974
  };
  return snd_28(((down_836(a_4984 => e_4985 => (Pair_3(a_4984))(f_4973(e_4985))))(Unit_0))(e_4972))
};
const downM_841 = local$instance$Monad$0 => f_1272 => ((downAndUpM_839(local$instance$Monad$0))(f_1272))(ret(local$instance$Monad$0));
const evalState_62 = s_270 => m_271 => snd_28((runState_61(s_270))(m_271));
const TypeEquivCtx_1748 = $_0_1766 => $_1_1767 => ({$0:$_0_1766,$1:$_1_1767,$tag:8});
const $lt$lt_1753 = ctxsF_1785 => ctxF_1786 => $pat_1787 => (push(ctxF_1786(Unit_0)))(ctxsF_1785(Unit_0));
const $gt$gt$eq$gt$gt_623 = local$instance$Monad$0 => m_644 => f_645 => (($gt$gt$eq(local$instance$Monad$0))(m_644))(r_646 => {
  if(r_646.$tag==1){
    return (ret(local$instance$Monad$0))(Err_616(r_646.$0))
  } else if(r_646.$tag==0){
    return f_645(r_646.$0)
  } else error("pattern match fail in //compiler/result.jg at line 36, column 27",r_646)
});
const $gt$gt$gt$gt_624 = local$instance$Monad$0 => m_649 => n_650 => (($gt$gt$eq$gt$gt_623(local$instance$Monad$0))(m_649))(__651 => n_650);
const checkEquiv_1996 = ctx_2080 => a_2081 => b_2082 => (evalState_62(Empty_11))(((checkEquivM_1997(ctx_2080))(a_2081))(b_2082));
const checkEquivM_1997 = ctx_2083 => toType_2084 => fromType_2085 => {
  const ctx2_2086 = ($lt$lt_1753(ctx_2083))(__2090 => (TypeEquivCtx_1748(toType_2084))(fromType_2085));
  const checkM_2089 = checkEquivM_1997(ctx2_2086);
  const err_2087 = local$instance$Monad$0 => m_2091 => ($_16(ret(local$instance$Monad$0)))(Err_616((Pair_3(ctx2_2086))(m_2091)));
  const ok_2088 = local$instance$Monad$1 => ($_16(ret(local$instance$Monad$1)))(Ok_615(Unit_0));
  if(fromType_2085.$tag==0){
    if(toType_2084.$tag==0){
      const $phi$232 = (($eq$eq($instance_447))(fromType_2085.$1))(toType_2084.$1);
      if($phi$232){
        return ok_2088($instance_502)
      } else if(!$phi$232){
        return (err_2087($instance_502))("type name mismatch")
      } else error("pattern match fail in //compiler/typeutil.jg at line 70, column 23",$phi$232)
    } else return (err_2087($instance_502))("type mismatch")
  } else if(fromType_2085.$tag==2){
    return (($gt$gt$eq($instance_502))(gets_59))(bs_2099 => {
      const $phi$226 = (((lookup_66($instance_447))($instance_506))(fromType_2085.$1))(bs_2099);
      if($phi$226.$tag==1){
        if(toType_2084.$tag==2){
          const $phi$229 = (($eq$eq($instance_447))(fromType_2085.$1))(toType_2084.$1);
          if($phi$229){
            return ok_2088($instance_502)
          } else if(!$phi$229){
            return (err_2087($instance_502))("type name mismatch")
          } else error("pattern match fail in //compiler/typeutil.jg at line 78, column 26",$phi$229)
        } else return (err_2087($instance_502))("type mismatch")
      } else if(($phi$226.$tag==0)&&($phi$226.$0.$tag==7)){
        return (($gt$gt_21($instance_502))(sets_60(((((insert_67($instance_447))($instance_506))(fromType_2085.$1))(toType_2084))(bs_2099))))(ok_2088($instance_502))
      } else if($phi$226.$tag==0){
        return ($_16(ret($instance_502)))(((checkEquiv_1996(ctx2_2086))($phi$226.$0))(toType_2084))
      } else error("pattern match fail in //compiler/typeutil.jg at line 75, column 38",$phi$226)
    })
  } else if(fromType_2085.$tag==3){
    if(toType_2084.$tag==3){
      return (($gt$gt$gt$gt_624($instance_502))((checkM_2089(toType_2084.$1))(fromType_2085.$1)))((checkM_2089(toType_2084.$2))(fromType_2085.$2))
    } else return (err_2087($instance_502))("type mismatch")
  } else return (err_2087($instance_502))("type cannot be equivalent")
};
const reverse_52 = (foldl(xs_235 => x_236 => (enqueue(x_236))(xs_235)))([]);
const reallyPrintExpr_1446 = typed_1572 => e_1573 => (join_39((printExprTyped_1443(typed_1572))(e_1573)))("\n");
const compareOrd_821 = local$instance$Eq$1 => local$instance$Ord$0 => a_965 => b_966 => {
  const $phi$234 = (($eq$eq(local$instance$Eq$1))(a_965))(b_966);
  if($phi$234){
    return 0
  } else if(!$phi$234){
    const $phi$236 = (($lt(local$instance$Ord$0))(a_965))(b_966);
    if($phi$236){
      return 0-1
    } else if(!$phi$236){
      return 1
    } else error("pattern match fail in //compiler/ast.jg at line 102, column 12",$phi$236)
  } else error("pattern match fail in //compiler/ast.jg at line 100, column 18",$phi$234)
};
const ModuleInterface_792 = $_0_885 => $_1_886 => $_2_887 => ({$0:$_0_885,$1:$_1_886,$2:$_2_887});
const OrderedSet_1984 = $_0_1998 => $_1_1999 => ({$0:$_0_1998,$1:$_1_1999});
const osetToArray_1989 = $pat_2018 => (map(fst_27))((sortBy(a_2021 => b_2022 => (((compareOrd_821($instance_446))($instance_448))(snd_28(a_2021)))(snd_28(b_2022))))(trieEntries_76($pat_2018.$0)));
const $instance_449 = $class$Ord(jsLt);
const osetIndexOf_1990 = local$instance$Eq$1 => local$instance$Hashable$0 => x_2023 => $pat_2024 => (((lookup_66(local$instance$Eq$1))(local$instance$Hashable$0))(x_2023))($pat_2024.$0);
const compareType_823 = compareS_975 => a_976 => b_977 => {
  const cmp_978 = compareType_823(compareS_975);
  const $phi$240 = (Pair_3(a_976))(b_977);
  if(($phi$240.$0.$tag==0)&&($phi$240.$1.$tag==0)){
    return (((compareOrd_821($instance_447))($instance_449))($phi$240.$0.$1))($phi$240.$1.$1)
  } else if($phi$240.$0.$tag==0){
    return 0-1
  } else if($phi$240.$1.$tag==0){
    return 1
  } else if(($phi$240.$0.$tag==1)&&($phi$240.$1.$tag==1)){
    return (((compareOrd_821($instance_447))($instance_449))($phi$240.$0.$1))($phi$240.$1.$1)
  } else if($phi$240.$0.$tag==1){
    return 0-1
  } else if($phi$240.$1.$tag==1){
    return 1
  } else if(($phi$240.$0.$tag==2)&&($phi$240.$1.$tag==2)){
    return (compareS_975($phi$240.$0.$1))($phi$240.$1.$1)
  } else if($phi$240.$0.$tag==2){
    return 0-1
  } else if($phi$240.$1.$tag==2){
    return 1
  } else if(($phi$240.$0.$tag==3)&&($phi$240.$1.$tag==3)){
    const $phi$246 = (cmp_978($phi$240.$0.$1))($phi$240.$1.$1);
    if(0==$phi$246){
      return (cmp_978($phi$240.$0.$2))($phi$240.$1.$2)
    } else return $phi$246
  } else if($phi$240.$0.$tag==3){
    return 0-1
  } else if($phi$240.$1.$tag==3){
    return 1
  } else if(($phi$240.$0.$tag==5)&&($phi$240.$1.$tag==5)){
    return 0
  } else if($phi$240.$0.$tag==5){
    return 0-1
  } else if($phi$240.$1.$tag==5){
    return 1
  } else if(($phi$240.$0.$tag==7)&&($phi$240.$1.$tag==7)){
    return 0
  } else if($phi$240.$0.$tag==7){
    return 0-1
  } else if($phi$240.$1.$tag==7){
    return 1
  } else if(($phi$240.$0.$tag==6)&&($phi$240.$1.$tag==6)){
    const $phi$242 = (cmp_978($phi$240.$0.$3))($phi$240.$1.$3);
    if(0==$phi$242){
      const $phi$244 = ((compareArr_822((compareOrd_821($instance_447))($instance_449)))($phi$240.$0.$1))($phi$240.$1.$1);
      if(0==$phi$244){
        return ((compareArr_822(cmp_978))($phi$240.$0.$2))($phi$240.$1.$2)
      } else return $phi$244
    } else return $phi$242
  } else return error("unsupported type in compareType")
};
const all_38 = f_204 => xs_205 => ((foldl(r_206 => x_207 => (f_204(x_207))&&r_206))(true))(xs_205);
const equivType_824 = a_1039 => b_1040 => {
  if(a_1039.$tag==0){
    if(b_1040.$tag==0){
      return (($eq$eq($instance_447))(a_1039.$1))(b_1040.$1)
    } else return false
  } else if(a_1039.$tag==1){
    if(b_1040.$tag==1){
      return (($eq$eq($instance_447))(a_1039.$1))(b_1040.$1)
    } else return false
  } else if(a_1039.$tag==2){
    if(b_1040.$tag==2){
      return (($eq$eq($instance_447))(a_1039.$1))(b_1040.$1)
    } else return false
  } else if(a_1039.$tag==3){
    if(b_1040.$tag==3){
      return ((equivType_824(a_1039.$1))(b_1040.$1))&&((equivType_824(a_1039.$2))(b_1040.$2))
    } else return false
  } else if(a_1039.$tag==5){
    if(b_1040.$tag==5){
      return true
    } else return false
  } else if(a_1039.$tag==7){
    if(b_1040.$tag==7){
      return true
    } else return false
  } else if(a_1039.$tag==4){
    return error("no support for TRow in equivType yet")
  } else if(a_1039.$tag==6){
    if(b_1040.$tag==6){
      const rbs_1077 = (all_38(p_1079 => (equivType_824(fst_27(p_1079)))(snd_28(p_1079))))((zip_43(a_1039.$2))(b_1040.$2));
      const rvs_1076 = (all_38(p_1078 => (($eq$eq($instance_447))(fst_27(p_1078)))(snd_28(p_1078))))((zip_43(a_1039.$1))(b_1040.$1));
      return (rvs_1076&&rbs_1077)&&((equivType_824(a_1039.$3))(b_1040.$3))
    } else return false
  } else error("pattern match fail in //compiler/ast.jg at line 142, column 17",a_1039)
};
const $instance_1276 = $class$Eq(a_1274 => b_1275 => (equivType_824(a_1274))(b_1275));
const osetAdd_1987 = local$instance$Eq$1 => local$instance$Hashable$0 => x_2009 => $pat_2010 => {
  const $phi$257 = (((lookup_66(local$instance$Eq$1))(local$instance$Hashable$0))(x_2009))($pat_2010.$0);
  if($phi$257.$tag==1){
    return (OrderedSet_1984(((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(x_2009))($pat_2010.$1))($pat_2010.$0)))($pat_2010.$1+1)
  } else return (OrderedSet_1984($pat_2010.$0))($pat_2010.$1)
};
const osetEmpty_1986 = (OrderedSet_1984(Empty_11))(0);
const skolemsInOrderAsSet_1992 = t_2028 => {
  const gather_2029 = sks_2030 => t_2031 => {
    if(t_2031.$tag==2){
      return (((osetAdd_1987($instance_447))($instance_506))(t_2031.$1))(sks_2030)
    } else if(t_2031.$tag==3){
      return (gather_2029((gather_2029(sks_2030))(t_2031.$1)))(t_2031.$2)
    } else if(t_2031.$tag==6){
      return error("unexpected TForall in skolemsInOrder")
    } else return sks_2030
  };
  return (gather_2029(osetEmpty_1986))(t_2028)
};
const normalizeForall_1994 = t_2050 => {
  const compareSkolems_2051 = local$instance$Eq$2 => local$instance$Hashable$1 => local$instance$Ord$0 => m_2052 => a_2053 => b_2054 => {
    const $phi$260 = (Pair_3((((osetIndexOf_1990(local$instance$Eq$2))(local$instance$Hashable$1))(a_2053))(m_2052)))((((osetIndexOf_1990(local$instance$Eq$2))(local$instance$Hashable$1))(b_2054))(m_2052));
    if(($phi$260.$0.$tag==0)&&($phi$260.$1.$tag==0)){
      return $phi$260.$0.$0-$phi$260.$1.$0
    } else if($phi$260.$0.$tag==0){
      return 0-1
    } else if($phi$260.$1.$tag==0){
      return 1
    } else return (((compareOrd_821(local$instance$Eq$2))(local$instance$Ord$0))(a_2053))(b_2054)
  };
  if(t_2050.$tag==6){
    const skolemsInType_2066 = skolemsInOrderAsSet_1992(t_2050.$3);
    const vs2_2067 = (filter(s_2068 => ((contains_33($instance_447))(s_2068))(t_2050.$1)))(osetToArray_1989(skolemsInType_2066));
    return (((TForall_803(t_2050.$0))(vs2_2067))(($_16(dedup_53($instance_1276)))((sortBy(compareType_823((((compareSkolems_2051($instance_447))($instance_506))($instance_449))(skolemsInType_2066))))(t_2050.$2))))(t_2050.$3)
  } else return t_2050
};
const Tuple6_7 = $_0_110 => $_1_111 => $_2_112 => $_3_113 => $_4_114 => $_5_115 => ({$0:$_0_110,$1:$_1_111,$2:$_2_112,$3:$_3_113,$4:$_4_114,$5:$_5_115});
const ImportAll_807 = $_0_925 => $_1_926 => ({$0:$_0_925,$1:$_1_926,$tag:2});
const AnnData_776 = $_0_848 => ({$0:$_0_848,$tag:3});
const tnum_2475 = (TConst_797(Empty_11))("Number");
const splitBindings_4008 = bs_4047 => error("");
const JSInstanceOf_6153 = $_0_6186 => $_1_6187 => ({$0:$_0_6186,$1:$_1_6187,$tag:14});
const $gt$eq$gt_91 = local$instance$Monad$0 => a_433 => b_434 => x_435 => (($gt$gt$eq(local$instance$Monad$0))(a_433(x_435)))(b_434);
const opChar_6811 = c_7128 => {
  if("-"==c_7128){
    return "$mns"
  } else if("+"==c_7128){
    return "$pls"
  } else if("*"==c_7128){
    return "$mul"
  } else if("/"==c_7128){
    return "$div"
  } else if("="==c_7128){
    return "$eq"
  } else if(":"==c_7128){
    return "$col"
  } else if("&"==c_7128){
    return "$amp"
  } else if("|"==c_7128){
    return "$pip"
  } else if("<"==c_7128){
    return "$lt"
  } else if(">"==c_7128){
    return "$gt"
  } else if("^"==c_7128){
    return "$rof"
  } else return c_7128
};
const opName_6810 = op_7124 => {
  if("+"==op_7124){
    return "$add"
  } else if("-"==op_7124){
    return "$del"
  } else if("*"==op_7124){
    return "$mul"
  } else if("&&"==op_7124){
    return "$and"
  } else if("||"==op_7124){
    return "$or"
  } else if("++"==op_7124){
    return "$concat"
  } else if("new"==op_7124){
    return "$new"
  } else return ((foldl(s_7126 => c_7127 => s_7126+(opChar_6811(c_7127))))(""))(strToArray_55(op_7124))
};
const JSArray_6150 = $_0_6185 => ({$0:$_0_6185,$tag:11});
const $lt$pip$gt = x_$class$Alternative => x_$class$Alternative.$1;
const $pip$gt_7407 = local$instance$Applicative$0 => a_7425 => b_7426 => (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(__7427 => b_7428 => b_7428)))(a_7425)))(b_7426);
const IdTok_7602 = {$tag:5};
const reservedP_7870 = s_8037 => parseToken_7862(t_8038 => {
  if(t_8038.$0.$tag==5){
    const $phi$267 = (($eq$eq($instance_447))(t_8038.$1))(s_8037);
    if($phi$267){
      return Just_1(s_8037)
    } else if(!$phi$267){
      return Nothing_2
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 87, column 26",$phi$267)
  } else return Nothing_2
});
const OpTok_7601 = {$tag:4};
const operatorP_7868 = s_8026 => parseToken_7862(t_8027 => {
  if(t_8027.$0.$tag==4){
    const $phi$270 = (($eq$eq($instance_447))(t_8027.$1))(s_8026);
    if($phi$270){
      return Just_1(s_8026)
    } else if(!$phi$270){
      return Nothing_2
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 77, column 26",$phi$270)
  } else return Nothing_2
});
const importAllP_7924 = (($lt$mul$gt($instance_7475))((pure($instance_7475))(ImportAll_807(Empty_11))))((($pip$gt_7407($instance_7475))((($pip$gt_7407($instance_7475))(operatorP_7868("*")))(reservedP_7870("from"))))(strP_7893));
const SymTok_7598 = {$tag:1};
const symP_7867 = s_8020 => parseToken_7862(t_8021 => {
  if(t_8021.$0.$tag==1){
    const $phi$273 = (($eq$eq($instance_447))(t_8021.$1))(s_8020);
    if($phi$273){
      return Just_1(s_8020)
    } else if(!$phi$273){
      return Nothing_2
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 71, column 27",$phi$273)
  } else return Nothing_2
});
const sepBy1_7412 = p_7450 => sp_7451 => (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(enqueue)))(p_7450)))(many_7409((($pip$gt_7407($instance_7475))(sp_7451))(p_7450)));
const reserved_7866 = ["as","class","where","instance","let","in","from","import","case","of","data","module"];
const nonReservedP_7871 = parseToken_7862(t_8043 => {
  if(t_8043.$0.$tag==5){
    const $phi$276 = ((contains_33($instance_447))(t_8043.$1))(reserved_7866);
    if($phi$276){
      return Nothing_2
    } else if(!$phi$276){
      return Just_1(t_8043.$1)
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 93, column 26",$phi$276)
  } else return Nothing_2
});
const importAliasP_7922 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(Pair_3)))(nonReservedP_7871)))((($pip$gt_7407($instance_7475))(reservedP_7870("as")))(nonReservedP_7871));
const importNoAliasP_7921 = (($lt$mul$gt($instance_7475))((pure($instance_7475))(n_8165 => (Pair_3(n_8165))(n_8165))))(nonReservedP_7871);
const importOpenP_7923 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(ns_8166 => f_8167 => ((ImportOpen_806(Empty_11))(f_8167))(ns_8166))))((($lt$pip_7408($instance_7475))((($pip$gt_7407($instance_7475))(symP_7867("{")))((sepBy1_7412((($lt$pip$gt($instance_7485))(importAliasP_7922))(importNoAliasP_7921)))(symP_7867(",")))))(symP_7867("}")))))((($pip$gt_7407($instance_7475))(reservedP_7870("from")))(strP_7893));
const importP_7925 = (($pip$gt_7407($instance_7475))(reservedP_7870("import")))((($lt$pip$gt($instance_7485))(importOpenP_7923))(importAllP_7924));
const mkParserState_7859 = ts_7943 => f_7944 => {
  let $phi$277;
  const $phi$278 = (getIx(0))(ts_7943);
  $phi$277 = $phi$278.$3;
  return ((((ParserState_7858(ts_7943))(0))($phi$277))(0))(f_7944)
};
const LexerState_7596 = $_0_7626 => $_1_7627 => $_2_7628 => $_3_7629 => ({$0:$_0_7626,$1:$_1_7627,$2:$_2_7628,$3:$_3_7629});
const mkTok_7605 = t_7634 => {
  const parse_7635 = i_7636 => (Success_7403(r_7641 => (((Token_7604(t_7634))(r_7641))(i_7636.$2))(i_7636.$3)))(i_7636);
  return Parser_7405(parse_7635)
};
const letters_7417 = "abcdefghijklmnopqrstuvwxyz"+"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const concatStr_7606 = (foldl(cs_7642 => c_7643 => cs_7642+c_7643))("");
const manyStr_7612 = p_7660 => (($lt$mul$gt($instance_7475))((pure($instance_7475))(concatStr_7606)))(many_7409(p_7660));
const parseChar_7608 = p_7647 => {
  const parse_7648 = s_7649 => {
    const $phi$282 = (($lt($instance_448))(s_7649.$1))(length(s_7649.$0));
    if(!$phi$282){
      return Error_7404("no more input available")
    } else if($phi$282){
      const $phi$284 = p_7647((getChar(s_7649.$1))(s_7649.$0));
      if(!$phi$284){
        return Error_7404("parser failed")
      } else if($phi$284){
        const $phi$286 = (getChar(s_7649.$1))(s_7649.$0);
        if("\n"==$phi$286){
          return (Success_7403((getChar(s_7649.$1))(s_7649.$0)))((((LexerState_7596(s_7649.$0))(s_7649.$1+1))(s_7649.$2+1))(0))
        } else return (Success_7403((getChar(s_7649.$1))(s_7649.$0)))((((LexerState_7596(s_7649.$0))(s_7649.$1+1))(s_7649.$2))(s_7649.$3+1))
      } else error("pattern match fail in //compiler/jaguarLexer.jg at line 27, column 15",$phi$284)
    } else error("pattern match fail in //compiler/jaguarLexer.jg at line 25, column 27",$phi$282)
  };
  return Parser_7405(parse_7648)
};
const charP_7610 = cs_7656 => parseChar_7608(c_7657 => (containsChar_36(c_7657))(cs_7656));
const identP_7621 = (($lt$mul$gt($instance_7475))(mkTok_7605(IdTok_7602)))((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))($concat)))(charP_7610(letters_7417+"_"))))(manyStr_7612(charP_7610((letters_7417+"0123456789")+"_"))));
const someStr_7613 = p_7661 => (($lt$mul$gt($instance_7475))((pure($instance_7475))(concatStr_7606)))(some_7410(p_7661));
const opIdentP_7622 = (($lt$mul$gt($instance_7475))(mkTok_7605(IdTok_7602)))((($lt$pip_7408($instance_7475))((($pip$gt_7407($instance_7475))(charP_7610("(")))(someStr_7613(charP_7610("-+*/=:&|<>^$")))))(charP_7610(")")));
const NumTok_7599 = {$tag:2};
const intP_7617 = someStr_7613(charP_7610("0123456789"));
const numP_7618 = (($lt$mul$gt($instance_7475))(mkTok_7605(NumTok_7599)))((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))($concat)))(intP_7617)))((($lt$pip$gt($instance_7485))((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))($concat)))(charP_7610("."))))(intP_7617)))((pure($instance_7475))(""))));
const opP_7623 = (($lt$mul$gt($instance_7475))(mkTok_7605(OpTok_7601)))(someStr_7613(charP_7610("-+*/=:&|<>^$~")));
const WsTok_7597 = {$tag:0};
const whitespaceP_7616 = (($lt$mul$gt($instance_7475))(mkTok_7605(WsTok_7597)))(someStr_7613(charP_7610(" \n")));
const symbolP_7620 = (($lt$mul$gt($instance_7475))(mkTok_7605(SymTok_7598)))(charP_7610("()[]{},\\"));
const anyCharP_7609 = parseChar_7608(__7655 => true);
const notCharP_7611 = cs_7658 => parseChar_7608(c_7659 => not_31((containsChar_36(c_7659))(cs_7658)));
const stringCharP_7614 = delim_7662 => {
  const newLineP_7663 = (($pip$gt_7407($instance_7475))((($pip$gt_7407($instance_7475))(charP_7610("\\")))(charP_7610("n"))))((pure($instance_7475))("\n"));
  const notEndOfStringP_7665 = notCharP_7611(delim_7662);
  const escapeP_7664 = (($pip$gt_7407($instance_7475))(charP_7610("\\")))(anyCharP_7609);
  return (($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))(newLineP_7663))(escapeP_7664)))(notEndOfStringP_7665)
};
const stringP_7615 = delim_7666 => (($lt$mul$gt($instance_7475))(mkTok_7605(StrTok_7600)))((($lt$pip_7408($instance_7475))((($pip$gt_7407($instance_7475))(charP_7610(delim_7666)))(manyStr_7612(stringCharP_7614(delim_7666)))))(charP_7610(delim_7666)));
const ComTok_7603 = {$tag:6};
const lineCommentP_7619 = (($lt$mul$gt($instance_7475))(mkTok_7605(ComTok_7603)))((($pip$gt_7407($instance_7475))((($pip$gt_7407($instance_7475))(charP_7610("/")))(charP_7610("/"))))(manyStr_7612(notCharP_7611("\n"))));
const jaguarTokenP_7624 = many_7409((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))(stringP_7615("'")))(stringP_7615("\""))))(whitespaceP_7616)))(numP_7618)))(lineCommentP_7619)))(identP_7621)))(opIdentP_7622)))(opP_7623)))(symbolP_7620));
const runLexer_7607 = p_7644 => s_7645 => p_7644.$0((((LexerState_7596(s_7645))(0))(0))(0));
const tokenize_7625 = runLexer_7607(jaguarTokenP_7624);
const filterWhitespaceAndComments_7860 = filter(t_7949 => {
  if(t_7949.$0.$tag==0){
    return false
  } else if(t_7949.$0.$tag==6){
    return false
  } else return true
});
const runParser_7861 = p_7957 => s_7958 => f_7959 => {
  const $phi$290 = tokenize_7625(s_7958);
  if($phi$290.$tag==0){
    return (applyParser_7406(p_7957))((mkParserState_7859(filterWhitespaceAndComments_7860($phi$290.$0)))(f_7959))
  } else if($phi$290.$tag==1){
    return Error_7404($phi$290.$0)
  } else error("pattern match fail in //compiler/jaguarParser.jg at line 21, column 19",$phi$290)
};
const parseImports_7933 = runParser_7861(many_7409(importP_7925));
const breakableDownM_842 = local$instance$Monad$0 => f_1273 => ((breakableDownAndUpM_838(local$instance$Monad$0))(f_1273))(ret(local$instance$Monad$0));
const rewriteExpr_4428 = env_4436 => e_4437 => {
  const rename_4438 = n_4442 => newIdent_4427(n_4442);
  const renamePat_4439 = p_4443 => {
    if(p_4443.$tag==1){
      return (ret($instance_502))((Pair_3(p_4443))(Empty_11))
    } else if(p_4443.$tag==0){
      return (($gt$gt$eq($instance_502))(rename_4438(p_4443.$1)))(n_4448 => (ret($instance_502))((Pair_3((PVar_788(p_4443.$0))(n_4448)))(((((insert_67($instance_447))($instance_506))(p_4443.$1))(n_4448))(Empty_11))))
    } else if(p_4443.$tag==2){
      return (($gt$gt$eq($instance_502))(((mapM_57($instance_502))(renamePat_4439))(p_4443.$2)))(ps_4452 => {
        const $phi$293 = (((lookup_66($instance_447))($instance_506))(p_4443.$1))(env_4436);
        if($phi$293.$tag==1){
          return (ret($instance_502))((Pair_3(((PData_790(p_4443.$0))(p_4443.$1))((map(fst_27))(ps_4452))))(((foldl((mergeTrie_74($instance_447))($instance_506)))(Empty_11))((map(snd_28))(ps_4452))))
        } else if($phi$293.$tag==0){
          return (ret($instance_502))((Pair_3(((PData_790(p_4443.$0))($phi$293.$0))((map(fst_27))(ps_4452))))(((foldl((mergeTrie_74($instance_447))($instance_506)))(Empty_11))((map(snd_28))(ps_4452))))
        } else error("pattern match fail in //compiler/uniquifier.jg at line 13, column 7",$phi$293)
      })
    } else error("pattern match fail in //compiler/uniquifier.jg at line 9, column 17",p_4443)
  };
  const rewritePat_4440 = p_4454 => (($gt$gt$eq($instance_502))(renamePat_4439(p_4454.$0)))(pe_4457 => (($gt$gt$eq($instance_502))((rewriteExpr_4428((((mergeTrie_74($instance_447))($instance_506))(env_4436))(pe_4457.$1)))(p_4454.$1)))(e_4460 => (ret($instance_502))((Pair_3(pe_4457.$0))(e_4460))));
  const f_4441 = e_4461 => {
    if(e_4461.$tag==3){
      return (($gt$gt$eq($instance_502))(rename_4438(e_4461.$1)))(n_4465 => (($gt$gt$eq($instance_502))((rewriteExpr_4428(((((insert_67($instance_447))($instance_506))(e_4461.$1))(n_4465))(env_4436)))(e_4461.$2)))(e_4466 => (ret($instance_502))(Right_9(((Lam_782(e_4461.$0))(n_4465))(e_4466)))))
    } else if(e_4461.$tag==5){
      return (($gt$gt$eq($instance_502))((rewriteBindings_4430(env_4436))(e_4461.$1)))(ebs_4470 => (($gt$gt$eq($instance_502))((rewriteExpr_4428(ebs_4470.$0))(e_4461.$2)))(e_4473 => (ret($instance_502))(Right_9(((Let_784(e_4461.$0))(ebs_4470.$1))(e_4473)))))
    } else if(e_4461.$tag==4){
      return (($gt$gt$eq($instance_502))((rewriteExpr_4428(env_4436))(e_4461.$1)))(e_4477 => (($gt$gt$eq($instance_502))(((mapM_57($instance_502))(rewritePat_4440))(e_4461.$2)))(ps_4478 => (ret($instance_502))(Right_9(((Case_783(e_4461.$0))(e_4477))(ps_4478)))))
    } else if(e_4461.$tag==0){
      const $phi$300 = (((lookup_66($instance_447))($instance_506))(e_4461.$1))(env_4436);
      if($phi$300.$tag==0){
        return (ret($instance_502))(Left_8((Var_779(e_4461.$0))($phi$300.$0)))
      } else if($phi$300.$tag==1){
        return (ret($instance_502))(Left_8(e_4461))
      } else error("pattern match fail in //compiler/uniquifier.jg at line 22, column 18",$phi$300)
    } else if(e_4461.$tag==6){
      const $phi$298 = (((lookup_66($instance_447))($instance_506))(e_4461.$1))(env_4436);
      if($phi$298.$tag==0){
        return (ret($instance_502))(Left_8(((New_785(e_4461.$0))($phi$298.$0))(e_4461.$2)))
      } else if($phi$298.$tag==1){
        return (ret($instance_502))(Left_8(e_4461))
      } else error("pattern match fail in //compiler/uniquifier.jg at line 25, column 23",$phi$298)
    } else return (ret($instance_502))(Left_8(e_4461))
  };
  return ((breakableDownM_842($instance_502))(f_4441))(e_4437)
};
const rewriteBindings_4430 = env_4500 => bs_4501 => {
  const ns_4502 = (map(fst_27))(bs_4501);
  const ns2_4503 = ((mapM_57($instance_502))(newIdent_4427))(ns_4502);
  return (($gt$gt$eq($instance_502))(ns2_4503))(ns_4504 => {
    const env2_4505 = (((insertAll_77($instance_447))($instance_506))((zip_43((map(fst_27))(bs_4501)))(ns_4504)))(env_4500);
    const bs2_4506 = ((mapM_57($instance_502))(rewriteExpr_4428(env2_4505)))((map(snd_28))(bs_4501));
    return (($gt$gt$eq($instance_502))(bs2_4506))(bs_4507 => (ret($instance_502))((Pair_3(env2_4505))((zip_43(ns_4504))(bs_4507))))
  })
};
const uniq_51 = local$instance$Eq$0 => xs_234 => {
  const $phi$303 = (($lt($instance_448))(length(xs_234)))(2);
  if($phi$303){
    return xs_234
  } else if(!$phi$303){
    const $phi$305 = (($eq$eq(local$instance$Eq$0))((getIx(0))(xs_234)))((getIx(1))(xs_234));
    if(!$phi$305){
      return (enqueue(head_46(xs_234)))((uniq_51(local$instance$Eq$0))(tail_47(xs_234)))
    } else if($phi$305){
      return (uniq_51(local$instance$Eq$0))(tail_47(xs_234))
    } else error("pattern match fail in //compiler/prelude.jg at line 219, column 12",$phi$305)
  } else error("pattern match fail in //compiler/prelude.jg at line 217, column 11",$phi$303)
};
const $gt$eq_20 = local$instance$Ord$0 => a_133 => b_134 => not_31((($lt(local$instance$Ord$0))(a_133))(b_134));
const toRecord_54 = (foldl(r_242 => $pat_243 => ((set($pat_243.$0))($pat_243.$1))(r_242)))(empty);
const Tuple5_6 = $_0_105 => $_1_106 => $_2_107 => $_3_108 => $_4_109 => ({$0:$_0_105,$1:$_1_106,$2:$_2_107,$3:$_3_108,$4:$_4_109});
const Tuple4_5 = $_0_101 => $_1_102 => $_2_103 => $_3_104 => ({$0:$_0_101,$1:$_1_102,$2:$_2_103,$3:$_3_104});
const getCount_4722 = e_4824 => {
  const $phi$308 = (((getAnn_809($instance_447))($instance_506))("useCount"))(annOf_828(e_4824));
  if(($phi$308.$tag==0)&&($phi$308.$0.$tag==2)){
    return $phi$308.$0.$0
  } else error("pattern match fail in //compiler/inliner.jg at line 55, column 14",$phi$308)
};
const eitherP_7928 = a_8171 => b_8172 => ($_16(Parser_7405))(s_8173 => (applyParser_7406((($lt$pip$gt($instance_7485))((($lt$mul$gt($instance_7475))((pure($instance_7475))(Left_8)))(a_8171)))((($lt$mul$gt($instance_7475))((pure($instance_7475))(Right_9)))(b_8172))))(s_8173));
const $lt$mul$mns$gt_7864 = pf_7991 => pa_7992 => {
  const parse_7995 = s_7996 => {
    const $phi$313 = pf_7991.$0(s_7996);
    if($phi$313.$tag==0){
      const $phi$315 = pa_7992.$0(((((ParserState_7858($phi$313.$1.$0))($phi$313.$1.$1))($phi$313.$1.$2))(s_7996.$2+1))($phi$313.$1.$4));
      if($phi$315.$tag==0){
        return (Success_7403($phi$313.$0($phi$315.$0)))(((((ParserState_7858($phi$315.$1.$0))($phi$315.$1.$1))($phi$315.$1.$2))(s_7996.$3))($phi$315.$1.$4))
      } else if($phi$315.$tag==1){
        return Error_7404($phi$315.$0)
      } else error("pattern match fail in //compiler/jaguarParser.jg at line 60, column 55",$phi$315)
    } else if($phi$313.$tag==1){
      return Error_7404($phi$313.$0)
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 59, column 38",$phi$313)
  };
  return Parser_7405(parse_7995)
};
const upperCaseId_7872 = parseToken_7862(t_8048 => {
  if(t_8048.$0.$tag==5){
    const $phi$318 = (containsChar_36((getChar(0))(t_8048.$1)))("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if($phi$318){
      return Just_1(t_8048.$1)
    } else if(!$phi$318){
      return Nothing_2
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 99, column 26",$phi$318)
  } else return Nothing_2
});
const notUpperCaseId_7873 = parseToken_7862(t_8053 => {
  if(t_8053.$0.$tag==5){
    const $phi$321 = (containsChar_36((getChar(0))(t_8053.$1)))("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if(!$phi$321){
      const $phi$323 = ((contains_33($instance_447))(t_8053.$1))(reserved_7866);
      if(!$phi$323){
        return Just_1(t_8053.$1)
      } else if($phi$323){
        return Nothing_2
      } else error("pattern match fail in //compiler/jaguarParser.jg at line 106, column 14",$phi$323)
    } else if($phi$321){
      return Nothing_2
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 105, column 26",$phi$321)
  } else return Nothing_2
});
const Data_793 = $_0_888 => $_1_889 => $_2_890 => $_3_891 => ({$0:$_0_888,$1:$_1_889,$2:$_2_890,$3:$_3_891});
const $pip$mns$gt_7865 = pa_8016 => pb_8017 => ($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((pure($instance_7475))(__8018 => b_8019 => b_8019)))(pa_8016)))(pb_8017);
const tconstP_7910 = (($lt$mul$gt($instance_7475))((pure($instance_7475))(TConst_797(Empty_11))))(upperCaseId_7872);
const parenP_7874 = p_8058 => (($lt$pip_7408($instance_7475))((($pip$gt_7407($instance_7475))(symP_7867("(")))(p_8058)))(symP_7867(")"));
const skolemsInOrder_1991 = t_2027 => osetToArray_1989(skolemsInOrderAsSet_1992(t_2027));
const success_7411 = a_7449 => Parser_7405(Success_7403(a_7449));
const opt_7414 = a_7454 => (($lt$pip$gt($instance_7485))((($lt$mul$gt($instance_7475))((pure($instance_7475))(Just_1)))(a_7454)))(success_7411(Nothing_2));
const tvarP_7911 = (($lt$mul$gt($instance_7475))((pure($instance_7475))(TSkolem_799(Empty_11))))(notUpperCaseId_7873);
const typeP_7908 = Parser_7405(s_8148 => (applyParser_7406(boundTFunP_7915))(s_8148));
const typeBoundP_7909 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(n_8149 => t_8150 => ((TApp_800(Empty_11))((TConst_797(Empty_11))(n_8149)))(t_8150))))(upperCaseId_7872)))(typeP_7908);
const simpleTypeP_7912 = (($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))(tconstP_7910))(tvarP_7911)))(parenP_7874(typeP_7908));
const tappP_7913 = ($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((pure($instance_7475))(foldl(TApp_800(Empty_11)))))(simpleTypeP_7912)))(many_7409(simpleTypeP_7912));
const tfunP_7914 = ($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((pure($instance_7475))(t_8151 => ts_8152 => (foldr1(b_8153 => a_8154 => ((TApp_800(Empty_11))(((TApp_800(Empty_11))((TConst_797(Empty_11))("->")))(a_8154)))(b_8153)))((enqueue(t_8151))(ts_8152)))))(tappP_7913)))(many_7409((($pip$gt_7407($instance_7475))(operatorP_7868("->")))(tappP_7913)));
const f_8155 = mbs_8156 => t_8157 => {
  if(mbs_8156.$tag==1){
    return t_8157
  } else if(mbs_8156.$tag==0){
    return (((TForall_803(Empty_11))(skolemsInOrder_1991(t_8157)))(mbs_8156.$0))(t_8157)
  } else error("pattern match fail in //compiler/jaguarParser.jg at line 248, column 13",mbs_8156)
};
const boundTFunP_7915 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(f_8155)))(opt_7414((($lt$pip_7408($instance_7475))((($lt$pip_7408($instance_7475))((($pip$gt_7407($instance_7475))(symP_7867("(")))((sepBy1_7412(typeBoundP_7909))(symP_7867(",")))))(symP_7867(")"))))(operatorP_7868("=>"))))))(tfunP_7914);
const DataCon_794 = $_0_892 => $_1_893 => $_2_894 => ({$0:$_0_892,$1:$_1_893,$2:$_2_894});
const dataConP_7919 = ($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((pure($instance_7475))(DataCon_794(Empty_11))))(upperCaseId_7872)))(many_7409(simpleTypeP_7912));
const dataP_7920 = ($lt$mul$mns$gt_7864(($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((pure($instance_7475))(Data_793(Empty_11))))(($pip$mns$gt_7865(reservedP_7870("data")))(upperCaseId_7872))))(many_7409(notUpperCaseId_7873))))((($pip$gt_7407($instance_7475))(operatorP_7868("=")))((sepBy1_7412(dataConP_7919))(operatorP_7868("|"))));
const AnnExport_778 = $_0_849 => ({$0:$_0_849,$tag:5});
const withLocAnn_7875 = a_8059 => ((((setAnn_810($instance_447))($instance_506))("codeLoc"))(a_8059))(Empty_11);
const parse_7980 = s_7981 => {
  const $phi$327 = (($lt($instance_448))(s_7981.$1))(length(s_7981.$0));
  if(!$phi$327){
    return Error_7404("run out of tokens")
  } else if($phi$327){
    const $phi$329 = (getIx(s_7981.$1))(s_7981.$0);
    return (Success_7403(($_16(withLocAnn_7875))(((AnnCodeLoc_774(s_7981.$4))($phi$329.$2))($phi$329.$3))))(s_7981)
  } else error("pattern match fail in //compiler/jaguarParser.jg at line 48, column 32",$phi$327)
};
const locP_7863 = Parser_7405(parse_7980);
const anyOpP_7869 = parseToken_7862(t_8032 => {
  if(t_8032.$0.$tag==4){
    return Just_1(t_8032.$1)
  } else return Nothing_2
});
const justOr_24 = d_142 => m_143 => {
  if(m_143.$tag==0){
    return m_143.$0
  } else if(m_143.$tag==1){
    return d_142
  } else error("pattern match fail in //compiler/prelude.jg at line 94, column 14",m_143)
};
const sepBy_7413 = p_7452 => sp_7453 => (($lt$mul$gt($instance_7475))((pure($instance_7475))(justOr_24([]))))(opt_7414((sepBy1_7412(p_7452))(sp_7453)));
const varP_7877 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(Var_779)))(locP_7863)))(nonReservedP_7871);
const cstrP_7879 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(Const_780)))(locP_7863)))(parseToken_7862(t_8066 => {
  if(t_8066.$0.$tag==3){
    return Just_1(CStr_787(t_8066.$1))
  } else return Nothing_2
}));
const cnumP_7878 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(Const_780)))(locP_7863)))(parseToken_7862(t_8061 => {
  if(t_8061.$0.$tag==2){
    return Just_1(CNum_786(unsafeStringToInt(t_8061.$1)))
  } else return Nothing_2
}));
const constP_7880 = (($lt$pip$gt($instance_7485))(cstrP_7879))(cnumP_7878);
const fromJust_25 = m_145 => {
  if(m_145.$tag==0){
    return m_145.$0
  } else if(m_145.$tag==1){
    return error("expected Just but got Nothing")
  } else error("pattern match fail in //compiler/prelude.jg at line 98, column 14",m_145)
};
const withLocOf_7876 = e_8060 => withLocAnn_7875(($_16(fromJust_25))((((getAnn_809($instance_447))($instance_506))("codeLoc"))(annOf_828(e_8060))));
const pvarP_7890 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(PVar_788)))(locP_7863)))(notUpperCaseId_7873);
const pcnumP_7891 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(PConst_789)))(locP_7863)))(parseToken_7862(t_8097 => {
  if(t_8097.$0.$tag==2){
    return Just_1(CNum_786(unsafeStringToInt(t_8097.$1)))
  } else return Nothing_2
}));
const pcstrP_7892 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(PConst_789)))(locP_7863)))(parseToken_7862(t_8102 => {
  if(t_8102.$0.$tag==3){
    return Just_1(CStr_787(t_8102.$1))
  } else return Nothing_2
}));
const pconstP_7894 = (($lt$pip$gt($instance_7485))(pcnumP_7891))(pcstrP_7892);
const patP_7887 = Parser_7405(s_8085 => (applyParser_7406(allPatP_7898))(s_8085));
const pdataP_7895 = ($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(PData_790)))(locP_7863)))(upperCaseId_7872)))(many_7409(patP_7887));
const nakedPatP_7896 = (($lt$pip$gt($instance_7485))(patP_7887))(pdataP_7895);
const f_8112 = ann_8113 => p_8114 => ps_8115 => {
  let $phi$337;
  const $phi$338 = length(ps_8115);
  if(1==$phi$338){
    $phi$337 = "Pair"
  } else if(2==$phi$338){
    $phi$337 = "Tuple3"
  } else if(3==$phi$338){
    $phi$337 = "Tuple4"
  } else if(4==$phi$338){
    $phi$337 = "Tuple5"
  } else if(5==$phi$338){
    $phi$337 = "Tuple6"
  } else error("pattern match fail in //compiler/jaguarParser.jg at line 185, column 12",$phi$338);
  const cons_8116 = $phi$337;
  return ((PData_790(ann_8113))(cons_8116))((enqueue(p_8114))(ps_8115))
};
const ptupleP_7897 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(f_8112)))(locP_7863)))((($pip$gt_7407($instance_7475))(symP_7867("(")))((($lt$pip_7408($instance_7475))(nakedPatP_7896))(symP_7867(","))))))((($lt$pip_7408($instance_7475))((sepBy1_7412(nakedPatP_7896))(symP_7867(","))))(symP_7867(")")));
const allPatP_7898 = (($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))(pvarP_7890))(pconstP_7894)))(parenP_7874(pdataP_7895))))(ptupleP_7897);
const mkPatLam_7888 = l_8086 => p_8087 => a_8088 => {
  if(p_8087.$tag==0){
    return ((Lam_782(l_8086))(p_8087.$1))(a_8088)
  } else return ((Lam_782(l_8086))("$pat"))(((Case_783(l_8086))((Var_779(l_8086))("$pat")))([(Pair_3(p_8087))(a_8088)]))
};
const typeAnnP_7902 = Parser_7405(s_8130 => (applyParser_7406((($pip$gt_7407($instance_7475))(operatorP_7868("::")))(typeP_7908)))(s_8130));
const wrapForall_1993 = t_2042 => {
  if(t_2042.$tag==6){
    return t_2042
  } else {
    const sks_2048 = skolemsInOrder_1991(t_2042);
    const $phi$342 = length(sks_2048);
    if(0==$phi$342){
      return t_2042
    } else return (((TForall_803(Empty_11))(sks_2048))([]))(t_2042)
  }
};
const mergeSet_50 = local$instance$Eq$1 => local$instance$Ord$0 => xs_230 => ys_231 => {
  const $phi$344 = length(xs_230);
  if(0==$phi$344){
    return ys_231
  } else {
    const $phi$346 = length(ys_231);
    if(0==$phi$346){
      return xs_230
    } else {
      const $phi$348 = (($lt(local$instance$Ord$0))(head_46(xs_230)))(head_46(ys_231));
      if($phi$348){
        return (enqueue(head_46(xs_230)))((((mergeSet_50(local$instance$Eq$1))(local$instance$Ord$0))(tail_47(xs_230)))(ys_231))
      } else if(!$phi$348){
        const $phi$350 = (($eq$eq(local$instance$Eq$1))(head_46(xs_230)))(head_46(ys_231));
        if($phi$350){
          return (enqueue(head_46(xs_230)))((((mergeSet_50(local$instance$Eq$1))(local$instance$Ord$0))(tail_47(xs_230)))(tail_47(ys_231)))
        } else if(!$phi$350){
          return (enqueue(head_46(ys_231)))((((mergeSet_50(local$instance$Eq$1))(local$instance$Ord$0))(xs_230))(tail_47(ys_231)))
        } else error("pattern match fail in //compiler/prelude.jg at line 213, column 16",$phi$350)
      } else error("pattern match fail in //compiler/prelude.jg at line 211, column 11",$phi$348)
    }
  }
};
const namesInPat_820 = p_957 => {
  if(p_957.$tag==0){
    return [p_957.$1]
  } else if(p_957.$tag==1){
    return []
  } else if(p_957.$tag==2){
    return ((foldl((mergeSet_50($instance_447))($instance_449)))([]))((map(namesInPat_820))(p_957.$2))
  } else error("pattern match fail in //compiler/ast.jg at line 56, column 16",p_957)
};
const mkDefs_7901 = mt_8117 => l_8118 => p_8119 => e_8120 => {
  if(p_8119.$tag==0){
    if(mt_8117.$tag==0){
      return [(Pair_3(p_8119.$1))((setType_827(wrapForall_1993(mt_8117.$0)))(e_8120))]
    } else if(mt_8117.$tag==1){
      return [(Pair_3(p_8119.$1))(e_8120)]
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 206, column 15",mt_8117)
  } else {
    let $phi$353;
    const $phi$354 = getAnnCodeLoc_816(l_8118);
    if(($phi$354.$tag==0)&&($phi$354.$0.$tag==1)){
      $phi$353 = ((("$pat_"+(intToString($phi$354.$0.$1)))+"_")+(intToString($phi$354.$0.$2)))
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 210, column 10",$phi$354);
    const id_8125 = $phi$353;
    return (enqueue((Pair_3(id_8125))(e_8120)))((map(n_8129 => (Pair_3(n_8129))(((Case_783(l_8118))((Var_779(Empty_11))(id_8125)))([(Pair_3(p_8119))((Var_779(Empty_11))(n_8129))]))))(namesInPat_820(p_8119)))
  }
};
const exprP_7881 = Parser_7405(s_8071 => (applyParser_7406(opP_7907))(s_8071));
const arrayLitP_7882 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(ann_8072 => xs_8073 => ((New_785(ann_8072))("Array"))(xs_8073))))(locP_7863)))((($lt$pip_7408($instance_7475))((($pip$gt_7407($instance_7475))(symP_7867("[")))((sepBy_7413(exprP_7881))(symP_7867(",")))))(symP_7867("]")));
const recLitP_7883 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(ann_8074 => xs_8075 => ((New_785(ann_8074))("@Rec"))(((foldl(concat))([]))(xs_8075)))))(locP_7863)))((($lt$pip_7408($instance_7475))((($pip$gt_7407($instance_7475))(symP_7867("{")))((sepBy_7413((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(a_8076 => b_8077 => [(Const_780(Empty_11))(CStr_787(a_8076)),b_8077])))((($lt$pip_7408($instance_7475))(nonReservedP_7871))(operatorP_7868("=")))))(exprP_7881)))(symP_7867(",")))))(symP_7867("}")));
const f_8078 = ann_8079 => e_8080 => es_8081 => {
  let $phi$356;
  const $phi$357 = length(es_8081);
  if(1==$phi$357){
    $phi$356 = "Pair"
  } else if(2==$phi$357){
    $phi$356 = "Tuple3"
  } else if(3==$phi$357){
    $phi$356 = "Tuple4"
  } else if(4==$phi$357){
    $phi$356 = "Tuple5"
  } else if(5==$phi$357){
    $phi$356 = "Tuple6"
  } else error("pattern match fail in //compiler/jaguarParser.jg at line 139, column 12",$phi$357);
  const cons_8082 = $phi$356;
  return ((foldl(App_781(ann_8079)))(((App_781(ann_8079))((Var_779(ann_8079))(cons_8082)))(e_8080)))(es_8081)
};
const tupleLitP_7884 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(f_8078)))(locP_7863)))((($pip$gt_7407($instance_7475))(symP_7867("(")))((($lt$pip_7408($instance_7475))(exprP_7881))(symP_7867(","))))))((($lt$pip_7408($instance_7475))((sepBy1_7412(exprP_7881))(symP_7867(","))))(symP_7867(")")));
const simpleExprP_7885 = (($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))(varP_7877))(constP_7880)))(arrayLitP_7882)))(tupleLitP_7884)))(recLitP_7883)))(parenP_7874(exprP_7881));
const appP_7886 = ($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((pure($instance_7475))(foldl(f_8083 => a_8084 => ((App_781(withLocOf_7876(f_8083)))(f_8083))(a_8084)))))((($lt$pip$gt($instance_7485))(varP_7877))(parenP_7874(exprP_7881)))))(many_7409(simpleExprP_7885));
const lamP_7889 = ($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(l_8092 => ps_8093 => a_8094 => ((foldr(a_8095 => p_8096 => ((mkPatLam_7888(l_8092))(p_8096))(a_8095)))(a_8094))(ps_8093))))(locP_7863)))(($pip$mns$gt_7865(symP_7867("\\")))(some_7410(patP_7887)))))((($pip$gt_7407($instance_7475))(operatorP_7868("->")))(exprP_7881));
const ofP_7899 = ($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((pure($instance_7475))(Pair_3)))(nakedPatP_7896)))((($pip$gt_7407($instance_7475))(operatorP_7868("->")))(exprP_7881));
const caseP_7900 = ($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(Case_783)))(locP_7863)))(($pip$mns$gt_7865(reservedP_7870("case")))(simpleExprP_7885))))((($pip$gt_7407($instance_7475))(reservedP_7870("of")))(some_7410(ofP_7899)));
const defP_7903 = ($lt$mul$mns$gt_7864(($lt$mul$mns$gt_7864(($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(l_8131 => lhs_8132 => ps_8133 => mt_8134 => e_8135 => (((mkDefs_7901(mt_8134))(l_8131))(lhs_8132))(((foldr(e_8136 => p_8137 => ((mkPatLam_7888(l_8131))(p_8137))(e_8136)))(e_8135))(ps_8133)))))(locP_7863)))(nakedPatP_7896)))(many_7409(patP_7887))))(opt_7414(typeAnnP_7902))))((($pip$gt_7407($instance_7475))(operatorP_7868("=")))(exprP_7881));
const defsP_7904 = (($lt$mul$gt($instance_7475))((pure($instance_7475))((foldl(concat))([]))))(some_7410(defP_7903));
const letP_7905 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(Let_784)))(locP_7863)))(($pip$mns$gt_7865(reservedP_7870("let")))(defsP_7904))))(($pip$mns$gt_7865(reservedP_7870("in")))(exprP_7881));
const primaryExprP_7906 = (($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))((($lt$pip$gt($instance_7485))(appP_7886))(constP_7880)))(lamP_7889)))(caseP_7900)))(letP_7905)))(arrayLitP_7882)))(recLitP_7883)))(tupleLitP_7884);
const opP_7907 = ($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((pure($instance_7475))(e_8138 => oes_8139 => ((foldl(a_8140 => lob_8141 => ((App_781(lob_8141.$0))(((App_781(lob_8141.$0))((Var_779(lob_8141.$0))(lob_8141.$1.$0)))(a_8140)))(lob_8141.$1.$1)))(e_8138))(oes_8139))))(primaryExprP_7906)))(many_7409((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(l_8145 => op_8146 => e_8147 => (Pair_3(l_8145))((Pair_3(op_8146))(e_8147)))))(locP_7863)))(anyOpP_7869)))(primaryExprP_7906)));
const addExportAnn_8174 = d_8175 => (Pair_3(d_8175.$0))((withAnn_829(((((setAnn_810($instance_447))($instance_506))("export"))(AnnExport_778(d_8175.$0)))(annOf_828(d_8175.$1))))(d_8175.$1));
const topLevelDefsP_7929 = (($lt$mul$gt($instance_7475))((pure($instance_7475))(map(addExportAnn_8174))))(defsP_7904);
const classMemberP_7916 = ($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((pure($instance_7475))(Pair_3)))(notUpperCaseId_7873)))((($pip$gt_7407($instance_7475))(operatorP_7868("::")))(typeP_7908));
const classP_7917 = ($lt$mul$mns$gt_7864(($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((pure($instance_7475))(name_8159 => tv_8160 => maybeDefs_8161 => (((Class_795(Empty_11))(name_8159))(tv_8160))((justOr_24([]))(maybeDefs_8161)))))(($pip$mns$gt_7865(reservedP_7870("class")))(upperCaseId_7872))))(notUpperCaseId_7873)))(opt_7414((($pip$gt_7407($instance_7475))(reservedP_7870("where")))(some_7410(classMemberP_7916))));
const instanceP_7918 = ($lt$mul$mns$gt_7864(($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((pure($instance_7475))(name_8162 => t_8163 => maybeDefs_8164 => (((Instance_796(Empty_11))(name_8162))(t_8163))((justOr_24([]))(maybeDefs_8164)))))(($pip$mns$gt_7865(reservedP_7870("instance")))(upperCaseId_7872))))(simpleTypeP_7912)))(opt_7414((($pip$gt_7407($instance_7475))(reservedP_7870("where")))(defsP_7904)));
const topLevelP_7930 = (eitherP_7928((eitherP_7928(dataP_7920))(topLevelDefsP_7929)))((eitherP_7928(classP_7917))(instanceP_7918));
const hasAnnE_813 = name_940 => e_941 => isJust_26((getAnnE_812(name_940))(e_941));
const $instance_466 = ($class$Alternative(Nothing_2))(a_463 => b_464 => {
  if(a_463.$tag==1){
    return b_464
  } else return a_463
});
const mapBindingsM_4726 = local$instance$Monad$0 => f_4880 => bs_4881 => ((mapM_57(local$instance$Monad$0))(b_4882 => (($gt$gt$eq(local$instance$Monad$0))((f_4880(b_4882.$0))(b_4882.$1)))(e_4885 => (ret(local$instance$Monad$0))((Pair_3(b_4882.$0))(e_4885)))))(bs_4881);
const US_2474 = $_0_2525 => $_1_2526 => $_2_2527 => $_3_2528 => ({$0:$_0_2525,$1:$_1_2526,$2:$_2_2527,$3:$_3_2528});
const setVar_2482 = v_2578 => t_2579 => (($gt$gt$eq($instance_502))(gets_59))($pat_2580 => ($_16(sets_60))((((US_2474($pat_2580.$0))(((((insert_67($instance_447))($instance_506))(v_2578))(t_2579))($pat_2580.$1)))($pat_2580.$2))($pat_2580.$3)));
const isErr_622 = r_643 => not_31(isOk_621(r_643));
const Tuple3_4 = $_0_98 => $_1_99 => $_2_100 => ({$0:$_0_98,$1:$_1_99,$2:$_2_100});
const ParsedArgs_6084 = $_0_6094 => $_1_6095 => $_2_6096 => ({$0:$_0_6094,$1:$_1_6095,$2:$_2_6096});
const getPositional_6087 = p_6113 => p_6113.$0;
const ArgString_6083 = $_0_6092 => $_1_6093 => ({$0:$_0_6092,$1:$_1_6093,$tag:1});
const $instance_6138 = $class$Eq(a_6136 => b_6137 => a_6136===b_6137);
const getString_6088 = p_6117 => def_6118 => {
  const $phi$366 = ((contains_33($instance_6138))(def_6118))(p_6117.$2);
  if(!$phi$366){
    return error("unrecognized arg that was not present for parsing")
  } else if($phi$366){
    if(def_6118.$tag==1){
      const $phi$369 = (has(def_6118.$0))(p_6117.$1);
      if(!$phi$369){
        if(def_6118.$1.$tag==0){
          return def_6118.$1.$0
        } else if(def_6118.$1.$tag==1){
          return error("no value for required arg "+def_6118.$0)
        } else error("pattern match fail in //compiler/args.jg at line 37, column 18",def_6118.$1)
      } else if($phi$369){
        return (get(def_6118.$0))(p_6117.$1)
      } else error("pattern match fail in //compiler/args.jg at line 36, column 33",$phi$369)
    } else return error("arg is not a string")
  } else error("pattern match fail in //compiler/args.jg at line 33, column 25",$phi$366)
};
const breakableDown_837 = f_1231 => (breakableDownAndUp_833(f_1231))(Pair_3);
const ModuleCtx_1740 = $_0_1756 => ({$0:$_0_1756,$tag:0});
const foldOkM_625 = local$instance$Monad$0 => f_652 => r_653 => xs_654 => ((foldl(r_655 => x_656 => (($gt$gt$eq$gt$gt_623(local$instance$Monad$0))(r_655))(r_657 => (f_652(r_657))(x_656))))(($_16(ret(local$instance$Monad$0)))(Ok_615(r_653))))(xs_654);
const mapOkM_626 = local$instance$Monad$0 => f_658 => xs_659 => (((foldOkM_625(local$instance$Monad$0))(rs_660 => x_661 => (($gt$gt$eq$gt$gt_623(local$instance$Monad$0))(f_658(x_661)))(r_662 => (ret(local$instance$Monad$0))(($_16(Ok_615))((push(r_662))(rs_660))))))([]))(xs_659);
const dfs_2207 = local$instance$Eq$1 => local$instance$Hashable$0 => g_2211 => visited_2212 => v_2213 => {
  const visit_2214 = r_2215 => e_2216 => {
    const $phi$372 = (((contains_33(local$instance$Eq$1))(e_2216))(r_2215))||(((contains_33(local$instance$Eq$1))(e_2216))(visited_2212));
    if($phi$372){
      return r_2215
    } else if(!$phi$372){
      return (concat(((((dfs_2207(local$instance$Eq$1))(local$instance$Hashable$0))(g_2211))((push(v_2213))((concat(r_2215))(visited_2212))))(e_2216)))(r_2215)
    } else error("pattern match fail in //compiler/graph.jg at line 4, column 15",$phi$372)
  };
  const $phi$374 = (((lookup_66(local$instance$Eq$1))(local$instance$Hashable$0))(v_2213))(g_2211);
  if($phi$374.$tag==0){
    return ($_16(enqueue(v_2213)))(((foldr(visit_2214))([]))($phi$374.$0))
  } else if($phi$374.$tag==1){
    return []
  } else error("pattern match fail in //compiler/graph.jg at line 7, column 6",$phi$374)
};
const setRemove_81 = local$instance$Eq$1 => local$instance$Hashable$0 => (remove_69(local$instance$Eq$1))(local$instance$Hashable$0);
const setIntersection_86 = local$instance$Eq$1 => local$instance$Hashable$0 => a_416 => b_417 => {
  const f_418 = r_419 => k_420 => __421 => {
    const $phi$376 = (((setContains_82(local$instance$Eq$1))(local$instance$Hashable$0))(k_420))(a_416);
    if(!$phi$376){
      return r_419
    } else if($phi$376){
      return (((setAdd_79(local$instance$Eq$1))(local$instance$Hashable$0))(k_420))(r_419)
    } else error("pattern match fail in //compiler/prelude.jg at line 409, column 13",$phi$376)
  };
  return ((foldTrie_70(f_418))(Empty_11))(b_417)
};
const JSSwitch_6161 = $_0_6199 => $_1_6200 => ({$0:$_0_6199,$1:$_1_6200,$tag:5});
const JSVar_6158 = $_0_6193 => $_1_6194 => ({$0:$_0_6193,$1:$_1_6194,$tag:2});
const Identity_15 = $_0_124 => ({$0:$_0_124});
const dataConName_825 = dc_1081 => dc_1081.$1;
const dataConNames_826 = d_1085 => (map(dataConName_825))(d_1085.$3);
const BindingCtx_1741 = $_0_1757 => ({$0:$_0_1757,$tag:1});
const mapSnd_93 = f_440 => $pat_441 => (Pair_3($pat_441.$0))(f_440($pat_441.$1));
const ImportClosed_805 = $_0_919 => $_1_920 => $_2_921 => ({$0:$_0_919,$1:$_1_920,$2:$_2_921,$tag:0});
const isEmpty_73 = t_379 => {
  if(t_379.$tag==0){
    return true
  } else return false
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
const splitFourWay_7927 = e_8168 => {
  const $phi$384 = splitEither_30(e_8168);
  return (Pair_3(splitEither_30($phi$384.$0)))(splitEither_30($phi$384.$1))
};
const headerP_7926 = (($lt$pip_7408($instance_7475))((($pip$gt_7407($instance_7475))(reservedP_7870("module")))(nonReservedP_7871)))(reservedP_7870("where"));
const name_8178 = h_8180 => loc_8181 => {
  if(h_8180.$tag==1){
    const $phi$387 = getAnnCodeLoc_816(loc_8181);
    if(($phi$387.$tag==0)&&($phi$387.$0.$tag==1)){
      return $phi$387.$0.$0
    } else error("pattern match fail in //compiler/jaguarParser.jg at line 299, column 16",$phi$387)
  } else if(h_8180.$tag==0){
    return h_8180.$0
  } else error("pattern match fail in //compiler/jaguarParser.jg at line 298, column 16",h_8180)
};
const f_8179 = loc_8186 => h_8187 => is_8188 => es_8189 => {
  const $phi$389 = splitFourWay_7927(es_8189);
  return ((((((Module_791(loc_8186))((name_8178(h_8187))(loc_8186)))(is_8188))($phi$389.$0.$0))($phi$389.$1.$0))((map(Pair_3("")))($phi$389.$1.$1)))(((foldl(concat))([]))($phi$389.$0.$1))
};
const moduleP_7931 = (($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((($lt$mul$gt($instance_7475))((pure($instance_7475))(f_8179)))(locP_7863)))(opt_7414(headerP_7926))))(many_7409(importP_7925))))(some_7410(topLevelP_7930));
const parseModule_7932 = runParser_7861(moduleP_7931);
const zipWithIndex_42 = zipWithIndex2_41(0);
const UpdateCtx_1744 = $_0_1761 => $_1_1762 => ({$0:$_0_1761,$1:$_1_1762,$tag:4});
const zero = x_$class$Alternative => x_$class$Alternative.$0;
const JSFun_6144 = $_0_6176 => $_1_6177 => ({$0:$_0_6176,$1:$_1_6177,$tag:5});
const JSBool_6148 = $_0_6183 => ({$0:$_0_6183,$tag:9});
const copyAnn_811 = local$instance$Eq$1 => local$instance$Hashable$0 => names_932 => ann_933 => {
  const f_934 = r_935 => n_936 => {
    const $phi$392 = (((getAnn_809(local$instance$Eq$1))(local$instance$Hashable$0))(n_936))(ann_933);
    if($phi$392.$tag==1){
      return r_935
    } else if($phi$392.$tag==0){
      return ((((setAnn_810(local$instance$Eq$1))(local$instance$Hashable$0))(n_936))($phi$392.$0))(r_935)
    } else error("pattern match fail in //compiler/ast.jg at line 15, column 11",$phi$392)
  };
  return ((foldl(f_934))(Empty_11))(names_932)
};
const getExports_3548 = (($gt$gt$eq($instance_502))(gets_59))(s_3560 => (ret($instance_502))(s_3560.$0));
const emptyCtx_1754 = $pat_1788 => [];
const replaceSkolems_1985 = t_2000 => reps_2001 => {
  if(t_2000.$tag==2){
    const $phi$397 = (((lookup_66($instance_447))($instance_506))(t_2000.$1))(reps_2001);
    if($phi$397.$tag==1){
      return t_2000
    } else if($phi$397.$tag==0){
      return $phi$397.$0
    } else error("pattern match fail in //compiler/typeutil.jg at line 8, column 20",$phi$397)
  } else if(t_2000.$tag==3){
    return ((TApp_800(t_2000.$0))((replaceSkolems_1985(t_2000.$1))(reps_2001)))((replaceSkolems_1985(t_2000.$2))(reps_2001))
  } else return t_2000
};
const requiredInstances_5652 = toType_5839 => fromType_5840 => {
  if(fromType_5840.$tag==6){
    const bs_5845 = ((foldl(bs_5849 => v_5850 => ((((insert_67($instance_447))($instance_506))(v_5850))(TUnknown_804))(bs_5849)))(Empty_11))(fromType_5840.$1);
    const $pat_200_6_5846 = (runState_61(bs_5845))(((checkEquivM_1997(emptyCtx_1754))(toType_5839))(fromType_5840.$3));
    let $phi$399;
    $phi$399 = $pat_200_6_5846.$0;
    const reps_5848 = $phi$399;
    let $phi$400;
    $phi$400 = $pat_200_6_5846.$1;
    const __5847 = $phi$400;
    return (map(b_5855 => (replaceSkolems_1985(b_5855))(reps_5848)))(fromType_5840.$2)
  } else return []
};
const S_5643 = $_0_5658 => $_1_5659 => $_2_5660 => ({$0:$_0_5658,$1:$_1_5659,$2:$_2_5660});
const setEnv_5650 = env_5752 => s_5753 => ((S_5643(env_5752))(s_5753.$1))(s_5753.$2);
const instanceNameFromBound_5657 = ix_5981 => b_5982 => {
  if((b_5982.$tag==3)&&(b_5982.$1.$tag==0)){
    return (("local$instance$"+b_5982.$1.$1)+"$")+(intToString(ix_5981))
  } else error("pattern match fail in //compiler/declasser.jg at line 266, column 30",b_5982)
};
const getEnv_5649 = s_5748 => s_5748.$0;
const breakableDownAndUpWithEnv_5653 = getEnv_5857 => setEnv_5858 => down_5859 => up_5860 => a_5861 => e_5862 => {
  const enterScope_5864 = bs_5872 => a_5873 => {
    const es_5874 = getEnv_5857(a_5873);
    const e_5875 = (((mergeTrie_74($instance_447))($instance_506))(head_46(es_5874)))(bs_5872);
    return (setEnv_5858((enqueue(e_5875))(es_5874)))(a_5873)
  };
  const exitScope_5865 = a_5876 => (setEnv_5858(tail_47(getEnv_5857(a_5876))))(a_5876);
  const processUp_5868 = a_5925 => e_5926 => {
    let $phi$404;
    if(e_5926.$tag==3){
      $phi$404 = (exitScope_5865(a_5925))
    } else if(e_5926.$tag==5){
      $phi$404 = (exitScope_5865(a_5925))
    } else $phi$404 = a_5925;
    const a2_5927 = $phi$404;
    return (up_5860(a2_5927))(e_5926)
  };
  const patBindings_5869 = p_5935 => {
    if(p_5935.$tag==1){
      return Empty_11
    } else if(p_5935.$tag==0){
      return ((((insert_67($instance_447))($instance_506))(p_5935.$1))(getAnnType_814(p_5935.$0)))(Empty_11)
    } else if(p_5935.$tag==2){
      return ((foldl(env_5943 => p_5944 => (((mergeTrie_74($instance_447))($instance_506))(patBindings_5869(p_5944)))(env_5943)))(Empty_11))(p_5935.$2)
    } else error("pattern match fail in //compiler/declasser.jg at line 240, column 19",p_5935)
  };
  const go_5863 = a_5870 => e_5871 => (((breakableDownAndUp_833(processDown_5866))(processUp_5868))(a_5870))(e_5871);
  const processDown_5866 = a_5877 => e_5878 => {
    const $phi$407 = (down_5859(a_5877))(e_5878);
    if($phi$407.$tag==1){
      return Right_9($phi$407.$0)
    } else if($phi$407.$tag==0){
      if($phi$407.$0.$1.$tag==3){
        let $phi$414;
        const $phi$415 = getType_830($phi$407.$0.$1);
        if(($phi$415.$tag==3)&&(($phi$415.$1.$tag==3)&&(($phi$415.$1.$1.$tag==0)&&("->"==$phi$415.$1.$1.$1)))){
          $phi$414 = $phi$415.$1.$2
        } else if(($phi$415.$tag==6)&&(($phi$415.$3.$tag==3)&&(($phi$415.$3.$1.$tag==3)&&(($phi$415.$3.$1.$1.$tag==0)&&("->"==$phi$415.$3.$1.$1.$1))))){
          $phi$414 = $phi$415.$3.$1.$2
        } else $phi$414 = TUnknown_804;
        const t_5885 = $phi$414;
        return Left_8((Pair_3((enterScope_5864(((((insert_67($instance_447))($instance_506))($phi$407.$0.$1.$1))(t_5885))(Empty_11)))($phi$407.$0.$0)))($phi$407.$0.$1))
      } else if($phi$407.$0.$1.$tag==5){
        const ts_5903 = ((foldl(ts_5904 => $pat_5905 => ((((insert_67($instance_447))($instance_506))($pat_5905.$0))(getType_830($pat_5905.$1)))(ts_5904)))(Empty_11))($phi$407.$0.$1.$1);
        return Left_8((Pair_3((enterScope_5864(ts_5903))($phi$407.$0.$0)))($phi$407.$0.$1))
      } else if($phi$407.$0.$1.$tag==4){
        const $phi$410 = (go_5863($phi$407.$0.$0))($phi$407.$0.$1.$1);
        const $phi$412 = ((foldl(processPat_5867))((Pair_3($phi$410.$0))([])))($phi$407.$0.$1.$2);
        return Right_9((Pair_3($phi$412.$0))(((Case_783($phi$407.$0.$1.$0))($phi$410.$1))($phi$412.$1)))
      } else return Left_8((Pair_3($phi$407.$0.$0))($phi$407.$0.$1))
    } else error("pattern match fail in //compiler/declasser.jg at line 212, column 21",$phi$407)
  };
  const processPat_5867 = ar_5916 => pat_5917 => {
    const bs_5922 = patBindings_5869(pat_5917.$0);
    const $phi$419 = (go_5863((enterScope_5864(bs_5922))(ar_5916.$0)))(pat_5917.$1);
    return (Pair_3(exitScope_5865($phi$419.$0)))((push((Pair_3(pat_5917.$0))($phi$419.$1)))(ar_5916.$1))
  };
  return (go_5863(a_5861))(e_5862)
};
const $instance_453 = $class$Monoid("");
const $instance_451 = $class$Semigroup($concat);
const instanceMatches_1995 = ctx_2070 => b_2071 => i_2072 => {
  if(i_2072.$tag==6){
    return isOk_621((evalState_62(((foldl(m_2077 => v_2078 => ((((insert_67($instance_447))($instance_506))(v_2078))(TUnknown_804))(m_2077)))(Empty_11))(i_2072.$1)))(((checkEquivM_1997(ctx_2070))(b_2071))(i_2072.$3)))
  } else return isOk_621(((checkEquiv_1996(ctx_2070))(b_2071))(i_2072))
};
const rewriteExpr_5651 = is_5757 => env_5758 => e_5759 => {
  const boundsToLam_5760 = a_5762 => e_5763 => {
    const addInstance_5764 = vs_5766 => b_5767 => a_5768 => {
      const name_5772 = (instanceNameFromBound_5657(a_5768.$2))(b_5767);
      return (Pair_3(((S_5643(a_5768.$0))((push((Pair_3(name_5772))(b_5767)))(a_5768.$1)))(a_5768.$2+1)))(name_5772)
    };
    const rewriteBound_5765 = vs_5773 => ae_5774 => ib_5775 => {
      const $phi$425 = ((addInstance_5764(vs_5773))(ib_5775.$1))(ae_5774.$0);
      return (Pair_3($phi$425.$0))(((Lam_782(Empty_11))($phi$425.$1))(ae_5774.$1))
    };
    const $phi$427 = getType_830(e_5763);
    if($phi$427.$tag==6){
      const $phi$429 = (($gt_18($instance_448))(length($phi$427.$2)))(0);
      if(!$phi$429){
        return (Pair_3(a_5762))(e_5763)
      } else if($phi$429){
        const rewritten_5786 = ((foldr(rewriteBound_5765($phi$427.$1)))((Pair_3(a_5762))((setType_827($phi$427.$3))(e_5763))))(zipWithIndex_42($phi$427.$2));
        return (mapSnd_93(re_5787 => (withAnn_829((((copyAnn_811($instance_447))($instance_506))(["export"]))(annOf_828(e_5763))))(re_5787)))(rewritten_5786)
      } else error("pattern match fail in //compiler/declasser.jg at line 142, column 28",$phi$429)
    } else return (Pair_3(a_5762))(e_5763)
  };
  const rewriteVar_5761 = a_5789 => e_5790 => {
    if(e_5790.$tag==0){
      const findMatching_5795 = b_5809 => a_5810 => {
        const matching_5814 = (filter(p_5815 => ((instanceMatches_1995(emptyCtx_1754))(b_5809))(p_5815.$1)))(a_5810.$1);
        const $phi$435 = length(matching_5814);
        if(0==$phi$435){
          return error((((("declasser failed to find satisfying instance for "+(printType_1442(b_5809)))+" ")+(exprLoc_819(e_5790)))+"\nKnown type class instances:")+((((concatMap_44($instance_453))($instance_451))($pat_5818 => "\n  # "+(printType_1442($pat_5818.$1))))(a_5810.$1)))
        } else if(1==$phi$435){
          return fst_27((getIx(0))(matching_5814))
        } else return error((((("declasser found more than 1 satisfying instance for "+(printType_1442(b_5809)))+" ")+(exprLoc_819(e_5790)))+"\n")+((join_39((map(m_5822 => printType_1442(snd_28(m_5822))))(matching_5814)))(",")))
      };
      let $phi$437;
      const $phi$438 = getType_830(e_5790);
      if($phi$438.$tag==6){
        $phi$437 = $phi$438.$3
      } else $phi$437 = $phi$438;
      const tv_5793 = $phi$437;
      const fromEnv_5794 = n_5805 => envs_5806 => {
        const env_5807 = head_46(envs_5806);
        const $phi$440 = (((lookup_66($instance_447))($instance_506))(n_5805))(env_5807);
        if($phi$440.$tag==1){
          return error((("no "+n_5805)+" in env ")+(jsonStringify(trieKeys_75(env_5807))))
        } else if($phi$440.$tag==0){
          return $phi$440.$0
        } else error("pattern match fail in //compiler/declasser.jg at line 164, column 14",$phi$440)
      };
      const t_5796 = (fromEnv_5794(e_5790.$1))(getEnv_5649(a_5789));
      const is_5797 = (requiredInstances_5652(tv_5793))(t_5796);
      const mis_5798 = (map(b_5823 => (findMatching_5795(b_5823))(a_5789)))(is_5797);
      const e2_5799 = ((foldl(e_5824 => v_5825 => ((App_781(Empty_11))(e_5824))((Var_779(Empty_11))(v_5825))))(e_5790))(mis_5798);
      return (Pair_3(a_5789))(e2_5799)
    } else if(e_5790.$tag==3){
      const dropInstance_5829 = v_5830 => a_5831 => ((S_5643(a_5831.$0))((filter(p_5835 => (($div$eq_17($instance_447))(fst_27(p_5835)))(v_5830)))(a_5831.$1)))(a_5831.$2);
      return (Pair_3((dropInstance_5829(e_5790.$1))(a_5789)))(e_5790)
    } else return (Pair_3(a_5789))(e_5790)
  };
  return snd_28((((((breakableDownAndUpWithEnv_5653(getEnv_5649))(setEnv_5650))(a_5837 => e_5838 => Left_8((boundsToLam_5760(a_5837))(e_5838))))(rewriteVar_5761))(((S_5643([env_5758]))(is_5757))(0)))(e_5759))
};
const className_5655 = n_5975 => "$class$"+n_5975;
const processClass_2519 = scope_3248 => $pat_3249 => {
  const tbs_3254 = [((TApp_800(Empty_11))((TConst_797(Empty_11))($pat_3249.$1)))((TSkolem_799(Empty_11))($pat_3249.$2))];
  const process_3255 = local$instance$Eq$1 => local$instance$Hashable$0 => scope_3256 => $pat_3257 => {
    const $phi$444 = wrapForall_1993($pat_3257.$1);
    if($phi$444.$tag==6){
      return ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))($pat_3257.$0))((((TForall_803($phi$444.$0))($phi$444.$1))(tbs_3254))($phi$444.$3)))(scope_3256)
    } else error("pattern match fail in //compiler/newtyper.jg at line 498, column 26",$phi$444)
  };
  return ((foldl((process_3255($instance_447))($instance_506)))(scope_3248))($pat_3249.$3)
};
const mkConFun_4217 = tag_4241 => dt_4242 => vs_4243 => n_4244 => ts_4245 => {
  const nts_4246 = (map(it_4253 => (Pair_3("$_"+(intToString(fst_27(it_4253)))))(snd_28(it_4253))))(zipWithIndex_42(ts_4245));
  const new_4247 = (setType_827(dt_4242))(((New_785(Empty_11))(n_4244))((map(nt_4254 => (Var_779(Empty_11))(fst_27(nt_4254))))(nts_4246)));
  const mkCon_4248 = r_4255 => nt_4256 => (setType_827(((TApp_800(Empty_11))(((TApp_800(Empty_11))((TConst_797(Empty_11))("->")))(nt_4256.$1)))(getType_830(r_4255))))(((Lam_782(Empty_11))(nt_4256.$0))(r_4255));
  const con_4249 = ((foldr(mkCon_4248))(new_4247))(nts_4246);
  const conT_4250 = (((TForall_803(Empty_11))(vs_4243))([]))(getType_830(con_4249));
  const ann_4251 = ((((setAnn_810($instance_447))($instance_506))("export"))(AnnExport_778(n_4244)))(((((setAnn_810($instance_447))($instance_506))("type"))(AnnType_773(conT_4250)))(((((setAnn_810($instance_447))($instance_506))("data"))(AnnData_776(tag_4241)))(Empty_11)));
  const typedCon_4252 = (withAnn_829(ann_4251))(con_4249);
  return (Pair_3(n_4244))(typedCon_4252)
};
const mkClassDictConstructor_5646 = c_5716 => {
  const params_5722 = (map(snd_28))(sort(($_16(trieEntries_76))((processClass_2519(Empty_11))(c_5716))));
  const name_5721 = className_5655(c_5716.$1);
  const type_5723 = ((TApp_800(Empty_11))((TConst_797(Empty_11))(c_5716.$1)))((TSkolem_799(Empty_11))(c_5716.$2));
  return ((((mkConFun_4217(Nothing_2))(type_5723))([c_5716.$2]))(name_5721))(params_5722)
};
const importsToTypeEnv_5654 = ms_5945 => is_5946 => {
  const getFile_5947 = i_5949 => {
    if(i_5949.$tag==2){
      return i_5949.$1
    } else if(i_5949.$tag==1){
      return i_5949.$1
    } else if(i_5949.$tag==0){
      return i_5949.$1
    } else error("pattern match fail in //compiler/declasser.jg at line 247, column 15",i_5949)
  };
  const addImports_5948 = env_5958 => i_5959 => {
    const $phi$449 = (get(getFile_5947(i_5959)))(ms_5945);
    let $phi$450;
    if(i_5959.$tag==2){
      $phi$450 = ((((mergeTrie_74($instance_447))($instance_506))(env_5958))($phi$449.$0))
    } else if(i_5959.$tag==1){
      $phi$450 = (((foldl(env_5970 => n_5971 => ((((insert_67($instance_447))($instance_506))(n_5971.$1))(($_16(fromJust_25))((((lookup_66($instance_447))($instance_506))(n_5971.$0))($phi$449.$0))))(env_5970)))(env_5958))(i_5959.$2))
    } else $phi$450 = (error("import type not supported in type inference"));
    const env2_5963 = $phi$450;
    const env3_5964 = ((foldl(processClass_2519))(env2_5963))($phi$449.$1);
    return env3_5964
  };
  return ((foldl(addImports_5948))(Empty_11))((enqueue((ImportAll_807(Empty_11))("./builtins.js")))(is_5946))
};
const rewriteImportedInstances_5645 = ms_5695 => _isi_5696 => imp_5697 => {
  if(imp_5697.$tag==1){
    const $phi$455 = (get(imp_5697.$1))(ms_5695);
    const importedClassNames_5706 = (map(n_5709 => (Pair_3(n_5709))(n_5709)))((((concatMap_44($instance_452))($instance_450))(c_5710 => (enqueue(className_5655(c_5710.$1)))((map(fst_27))(c_5710.$3))))($phi$455.$1));
    const importedBounds_5707 = trieEntries_76($phi$455.$2);
    const importedInsNames_5708 = (map(ni_5715 => (Pair_3(fst_27(ni_5715)))(fst_27(ni_5715))))(importedBounds_5707);
    return (Pair_3((push(((ImportOpen_806(imp_5697.$0))(imp_5697.$1))((concat(imp_5697.$2))((concat(importedInsNames_5708))(importedClassNames_5706)))))(_isi_5696.$0)))((concat(_isi_5696.$1))(importedBounds_5707))
  } else error("pattern match fail in //compiler/declasser.jg at line 64, column 26",imp_5697)
};
const className2_5656 = c_5976 => className_5655(c_5976.$1);
const mkClassDictAccessors_5647 = c_5724 => {
  const name_5729 = className2_5656(c_5724);
  const v_5731 = "x_"+name_5729;
  const f_5733 = b_5734 => (PVar_788(Empty_11))((fst_27(b_5734))+"_");
  const bsForPat_5730 = (map(f_5733))(sort(c_5724.$3));
  const rewrite_5732 = b_5735 => (Pair_3(b_5735.$0))((setType_827(b_5735.$1))(((Lam_782(((((setAnn_810($instance_447))($instance_506))("export"))(AnnExport_778(b_5735.$0)))(Empty_11)))(v_5731))(((Case_783(Empty_11))((Var_779(Empty_11))(v_5731)))([(Pair_3(((PData_790(Empty_11))(name_5729))(bsForPat_5730)))((Var_779(Empty_11))(b_5735.$0+"_"))]))));
  return (map(rewrite_5732))(($_16(trieEntries_76))((processClass_2519(Empty_11))(c_5724)))
};
const instFromDef_2517 = $pat_3234 => {
  const $phi$462 = wrapForall_1993($pat_3234.$2);
  if($phi$462.$tag==6){
    return (((TForall_803(Empty_11))($phi$462.$1))([]))(((TApp_800(Empty_11))((TConst_797(Empty_11))($pat_3234.$1)))($phi$462.$3))
  } else return ((TApp_800(Empty_11))((TConst_797(Empty_11))($pat_3234.$1)))($phi$462)
};
const rewriteInstance_5648 = is_5738 => env_5739 => n_5740 => i_5741 => {
  const args_5746 = (map((rewriteExpr_5651(is_5738))(env_5739)))((map(snd_28))(sort(i_5741.$3)));
  const e_5747 = ((foldl(App_781(Empty_11)))((Var_779(Empty_11))(className_5655(i_5741.$1))))(args_5746);
  return (Pair_3(n_5740))((withAnn_829(((((setAnn_810($instance_447))($instance_506))("export"))(AnnExport_778(n_5740)))(Empty_11)))(e_5747))
};
const declassModule_5644 = ms_5661 => m_5662 => {
  const classFuns_5673 = (concat((map(mkClassDictConstructor_5646))(m_5662.$4)))((((concatMap_44($instance_452))($instance_450))(mkClassDictAccessors_5647))(m_5662.$4));
  const _isi_5670 = ((foldl(rewriteImportedInstances_5645(ms_5661)))((Pair_3([]))([])))(m_5662.$2);
  const importedInstances_5672 = snd_28(_isi_5670);
  const availableInstances_5674 = (concat(importedInstances_5672))((map(mapSnd_93(instFromDef_2517)))(m_5662.$5));
  const importedSymbols_5682 = (importsToTypeEnv_5654(ms_5661))(m_5662.$2);
  const localBindings_5683 = (concat(classFuns_5673))(m_5662.$6);
  const env_5675 = ((foldl(env_5684 => $pat_5685 => ((((insert_67($instance_447))($instance_506))($pat_5685.$0))(getType_830($pat_5685.$1)))(env_5684)))(importedSymbols_5682))(localBindings_5683);
  const instancesAsDicts_5680 = (map(p_5692 => (((rewriteInstance_5648(availableInstances_5674))(env_5675))(p_5692.$0))(p_5692.$1)))(m_5662.$5);
  const splitData_5688 = d_5689 => {
    const $phi$468 = (((lookup_66($instance_447))($instance_506))("data"))(annOf_828(snd_28(d_5689)));
    if($phi$468.$tag==1){
      return Right_9(d_5689)
    } else if($phi$468.$tag==0){
      return Left_8(d_5689)
    } else error("pattern match fail in //compiler/declasser.jg at line 40, column 21",$phi$468)
  };
  const _sds_5676 = splitEither_30((map(splitData_5688))(m_5662.$6));
  const adtDs_5677 = fst_27(_sds_5676);
  const nonAdtDs_5678 = snd_28(_sds_5676);
  const declassedDs_5679 = (map(d_5691 => (Pair_3(fst_27(d_5691)))(((rewriteExpr_5651(availableInstances_5674))(env_5675))(snd_28(d_5691)))))(nonAdtDs_5678);
  const finalDs_5681 = (concat(adtDs_5677))((concat(classFuns_5673))((concat(instancesAsDicts_5680))(declassedDs_5679)));
  const impsWithImportedInstances_5671 = fst_27(_isi_5670);
  return ((((((Module_791(m_5662.$0))(m_5662.$1))(impsWithImportedInstances_5671))(m_5662.$3))([]))([]))(finalDs_5681)
};
const declasserPass_8410 = m_8477 => (($gt$gt$eq($instance_502))(getExports_3548))(es_8478 => (ret($instance_502))((declassModule_5644(es_8478))(m_8477)));
const importAsBindings_5204 = ens_5237 => dataAnns_5238 => i_5239 => {
  if((i_5239.$tag==1)&&("./builtins.js"==i_5239.$1)){
    return []
  } else if(i_5239.$tag==1){
    const f_5245 = p_5246 => {
      const $phi$472 = (((lookup_66($instance_447))($instance_506))((i_5239.$1+"#")+p_5246.$0))(ens_5237);
      if($phi$472.$tag==0){
        return (Pair_3(p_5246.$1))((Var_779(($_16(justOr_24(Empty_11)))((((lookup_66($instance_447))($instance_506))($phi$472.$0))(dataAnns_5238))))($phi$472.$0))
      } else if($phi$472.$tag==1){
        return error((("mod merger encountered unknown import "+i_5239.$1)+"#")+p_5246.$0)
      } else error("pattern match fail in //compiler/moduleMerger.jg at line 30, column 21",$phi$472)
    };
    return (map(f_5245))((filter(p_5250 => (($div$eq_17($instance_447))(fst_27(p_5250)))(snd_28(p_5250))))(i_5239.$2))
  } else error("pattern match fail in //compiler/moduleMerger.jg at line 26, column 35",i_5239)
};
const dropExport_5202 = f_5206 => b_5207 => {
  const $phi$475 = (((getAnn_809($instance_447))($instance_506))("export"))(annOf_828(b_5207.$1));
  if($phi$475.$tag==1){
    return (ret($instance_502))(b_5207)
  } else if(($phi$475.$tag==0)&&($phi$475.$0.$tag==5)){
    return (($gt$gt$eq($instance_502))(gets_59))(ns_5211 => (($gt$gt_21($instance_502))(sets_60(((((insert_67($instance_447))($instance_506))((f_5206+"#")+$phi$475.$0.$0))(b_5207.$0))(ns_5211))))((ret($instance_502))((Pair_3(b_5207.$0))((withAnn_829((((remove_69($instance_447))($instance_506))("export"))(annOf_828(b_5207.$1))))(b_5207.$1)))))
  } else error("pattern match fail in //compiler/moduleMerger.jg at line 8, column 15",$phi$475)
};
const mergeInto_5203 = a_5212 => b_5213 => (($gt$gt$eq($instance_502))(((mapM_57($instance_502))(dropExport_5202(a_5212.$1)))(a_5212.$6)))(bs_5221 => (($gt$gt$eq($instance_502))(gets_59))(ns_5222 => {
  const f_5224 = local$instance$Eq$1 => local$instance$Hashable$0 => r_5225 => b_5226 => {
    const $phi$479 = (((getAnn_809($instance_447))($instance_506))("data"))(annOf_828(b_5226.$1));
    if($phi$479.$tag==1){
      return r_5225
    } else if($phi$479.$tag==0){
      return ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(b_5226.$0))(((((setAnn_810($instance_447))($instance_506))("data"))($phi$479.$0))(Empty_11)))(r_5225)
    } else error("pattern match fail in //compiler/moduleMerger.jg at line 18, column 21",$phi$479)
  };
  const dataAnns_5223 = ((foldl((f_5224($instance_447))($instance_506)))(Empty_11))(bs_5221);
  return (ret($instance_502))(((((((Module_791(a_5212.$0))(b_5213.$1))(a_5212.$2))([]))([]))([]))((concat(bs_5221))((concat((((concatMap_44($instance_452))($instance_450))((importAsBindings_5204(ns_5222))(dataAnns_5223)))(b_5213.$2)))(b_5213.$6))))
}));
const mergeModules_5201 = ms_5205 => (evalState_62(Empty_11))((((foldM_56($instance_502))(mergeInto_5203))(head_46(ms_5205)))(tail_47(ms_5205)));
const parseType_7935 = runParser_7861(typeP_7908);
const parseT_8400 = s_8455 => {
  const $phi$482 = (parseType_7935(s_8455))("");
  if($phi$482.$tag==0){
    return wrapForall_1993($phi$482.$0)
  } else return error($phi$482)
};
const parseExports_8401 = e_8459 => {
  const bs_8460 = ((foldRecord(m_8461 => n_8462 => s_8463 => ((((insert_67($instance_447))($instance_506))(n_8462))(parseT_8400(s_8463)))(m_8461)))(Empty_11))(e_8459);
  return ((ModuleInterface_792(bs_8460))([]))(Empty_11)
};
const UnifyCtx_1743 = $_0_1759 => $_1_1760 => ({$0:$_0_1759,$1:$_1_1760,$tag:3});
const JSNew_6154 = $_0_6188 => $_1_6189 => ({$0:$_0_6188,$1:$_1_6189,$tag:15});
const JSIndex_6140 = $_0_6167 => $_1_6168 => ({$0:$_0_6167,$1:$_1_6168,$tag:1});
const JSExpr_6156 = $_0_6191 => ({$0:$_0_6191,$tag:0});
const JSString_6147 = $_0_6182 => ({$0:$_0_6182,$tag:8});
const JSRef_6139 = $_0_6166 => ({$0:$_0_6166,$tag:0});
const JSBinOp_6142 = $_0_6171 => $_1_6172 => $_2_6173 => ({$0:$_0_6171,$1:$_1_6172,$2:$_2_6173,$tag:3});
const JSUndefined_6152 = {$tag:13};
const checkUndefined_6801 = label_7041 => expr_7042 => ((JSTernary_6145(((JSBinOp_6142("==="))(expr_7042))(JSUndefined_6152)))((JSCall_6143(JSRef_6139("error")))([JSString_6147(label_7041)])))(expr_7042);
const maybe_23 = a_138 => b_139 => m_140 => {
  if(m_140.$tag==0){
    return a_138(m_140.$0)
  } else if(m_140.$tag==1){
    return b_139
  } else error("pattern match fail in //compiler/prelude.jg at line 90, column 19",m_140)
};
const JSBreak_6162 = {$tag:6};
const osetContains_1988 = local$instance$Eq$1 => local$instance$Hashable$0 => x_2014 => $pat_2015 => isJust_26((((lookup_66(local$instance$Eq$1))(local$instance$Hashable$0))(x_2014))($pat_2015.$0));
const rewriteInstance_4429 = env_4487 => i_4488 => (($gt$gt$eq($instance_502))(((mapM_57($instance_502))(d_4494 => (($gt$gt$eq($instance_502))((rewriteExpr_4428(env_4487))(d_4494.$1)))(e_4497 => (ret($instance_502))((Pair_3(d_4494.$0))(e_4497)))))(i_4488.$1.$3)))(bs_4498 => (($gt$gt$eq($instance_502))(newIdent_4427("$instance")))(insName_4499 => (ret($instance_502))((Pair_3(insName_4499))((((Instance_796(i_4488.$1.$0))(i_4488.$1.$1))(i_4488.$1.$2))(bs_4498)))));
const rewriteModule_4432 = ms_4528 => m_4529 => (($gt$gt$eq($instance_502))((((foldM_56($instance_502))(renameImport_4431))((Pair_3(Empty_11))([])))(m_4529.$2)))(eis_4537 => (($gt$gt$eq($instance_502))((rewriteBindings_4430(eis_4537.$0))(m_4529.$6)))(ebs_4540 => (($gt$gt$eq($instance_502))(((mapM_57($instance_502))(rewriteInstance_4429(ebs_4540.$0)))(m_4529.$5)))(ins_4543 => (ret($instance_502))(((((((Module_791(m_4529.$0))(m_4529.$1))(eis_4537.$1))(m_4529.$3))(m_4529.$4))(ins_4543))(ebs_4540.$1)))));
const uniquify_4433 = m_4544 => (($gt$gt$eq($instance_502))(getUid_3550))(uid_4545 => (($gt$gt$eq($instance_502))(getExports_3548))(ex_4546 => {
  const r_4547 = (runState_61(uid_4545))((rewriteModule_4432(ex_4546))(m_4544));
  return (($gt$gt_21($instance_502))(setUid_3551(fst_27(r_4547))))((ret($instance_502))(snd_28(r_4547)))
}));
const $instance_677 = ($class$Monad(Ok_615))(r_673 => f_674 => {
  if(r_673.$tag==1){
    return Err_616(r_673.$0)
  } else if(r_673.$tag==0){
    return f_674(r_673.$0)
  } else error("pattern match fail in //compiler/result.jg at line 12, column 15",r_673)
});
const hasMatchingInstance_2504 = ctx_2952 => ins_2953 => b_2954 => {
  const $phi$492 = ($_16(length))((filter((instanceMatches_1995(ctx_2952))(b_2954)))(ins_2953));
  if(0==$phi$492){
    return Ok_615(false)
  } else if(1==$phi$492){
    return Ok_615(true)
  } else return Err_616((Pair_3(ctx_2952))(("too many matching instances ("+(intToString($phi$492)))+")"))
};
const FinTypeCtx_1747 = $_0_1765 => ({$0:$_0_1765,$tag:7});
const finalizeType_2512 = ctx_3112 => vars_3113 => ins_3114 => t_3115 => {
  const ctx2_3116 = ($lt$lt_1753(ctx_3112))(__3121 => FinTypeCtx_1747(t_3115));
  const err_3118 = m_3123 => Err_616((Pair_3(ctx2_3116))(m_3123));
  const fin_3119 = ((finalizeType_2512(ctx2_3116))(vars_3113))(ins_3114);
  const filterBound_3120 = bs_3124 => b_3125 => (($gt$gt$eq($instance_677))(((hasMatchingInstance_2504(ctx2_3116))(ins_3114))(b_3125)))(m_3126 => {
    if(!m_3126){
      return (ret($instance_677))((push(b_3125))(bs_3124))
    } else if(m_3126){
      return (ret($instance_677))(bs_3124)
    } else error("pattern match fail in //compiler/newtyper.jg at line 417, column 5",m_3126)
  });
  const ok_3117 = e_3122 => Ok_615(e_3122);
  if(t_3115.$tag==0){
    return ok_3117(t_3115)
  } else if(t_3115.$tag==2){
    return ok_3117(t_3115)
  } else if(t_3115.$tag==3){
    return (($gt$gt$eq($instance_677))(fin_3119(t_3115.$1)))(ff_3134 => (($gt$gt$eq($instance_677))(fin_3119(t_3115.$2)))(af_3135 => ok_3117(((TApp_800(t_3115.$0))(ff_3134))(af_3135))))
  } else if(t_3115.$tag==6){
    return (($gt$gt$eq($instance_677))(fin_3119(t_3115.$3)))(tf_3140 => (($gt$gt$eq($instance_677))(((mapM_57($instance_677))(((finalizeType_2512(ctx2_3116))(vars_3113))(ins_3114)))(t_3115.$2)))(bsf_3141 => (($gt$gt$eq($instance_677))((((foldM_56($instance_677))(filterBound_3120))([]))(bsf_3141)))(bsfFiltered_3142 => ok_3117(($_16(normalizeForall_1994))((((TForall_803(t_3115.$0))(t_3115.$1))(bsfFiltered_3142))(tf_3140))))))
  } else if(t_3115.$tag==1){
    const $phi$496 = (((lookup_66($instance_447))($instance_506))(t_3115.$1))(vars_3113);
    if($phi$496.$tag==0){
      return fin_3119($phi$496.$0)
    } else if($phi$496.$tag==1){
      return err_3118("unknown type var found during finalization")
    } else error("pattern match fail in //compiler/newtyper.jg at line 431, column 7",$phi$496)
  } else error("pattern match fail in //compiler/newtyper.jg at line 420, column 6",t_3115)
};
const PatCtx_1745 = $_0_1763 => ({$0:$_0_1763,$tag:5});
const setPatType_832 = t_1161 => p_1162 => {
  if(p_1162.$tag==0){
    return (PVar_788((setAnnType_815(t_1161))(p_1162.$0)))(p_1162.$1)
  } else if(p_1162.$tag==1){
    return (PConst_789((setAnnType_815(t_1161))(p_1162.$0)))(p_1162.$1)
  } else if(p_1162.$tag==2){
    return ((PData_790((setAnnType_815(t_1161))(p_1162.$0)))(p_1162.$1))(p_1162.$2)
  } else error("pattern match fail in //compiler/ast.jg at line 214, column 18",p_1162)
};
const finalizePat_2514 = ctx_3188 => vars_3189 => ins_3190 => p_3191 => {
  const ctx2_3192 = ($lt$lt_1753(ctx_3188))(__3193 => PatCtx_1745(p_3191));
  return (($gt$gt$eq($instance_677))((((finalizeType_2512(ctx2_3192))(vars_3189))(ins_3190))(getPatType_831(p_3191))))(tf_3194 => {
    if(p_3191.$tag==2){
      return (($gt$gt$eq($instance_677))(((mapM_57($instance_677))(((finalizePat_2514(ctx2_3192))(vars_3189))(ins_3190)))(p_3191.$2)))(psf_3198 => Ok_615(((PData_790((setAnnType_815(tf_3194))(p_3191.$0)))(p_3191.$1))(psf_3198)))
    } else return Ok_615((setPatType_832(tf_3194))(p_3191))
  })
};
const ExprCtx_1742 = $_0_1758 => ({$0:$_0_1758,$tag:2});
const finalizeExpr_2513 = ctx_3146 => vars_3147 => ins_3148 => e_3149 => {
  const ok_3151 = e_3155 => Ok_615(e_3155);
  const ctx2_3150 = ($lt$lt_1753(ctx_3146))(__3154 => ExprCtx_1742(e_3149));
  const err_3152 = m_3156 => Err_616((Pair_3(ctx2_3150))(m_3156));
  const fin_3153 = ((finalizeExpr_2513(ctx2_3150))(vars_3147))(ins_3148);
  return (($gt$gt$eq($instance_677))((((finalizeType_2512(ctx2_3150))(vars_3147))(ins_3148))(getType_830(e_3149))))(tf_3157 => {
    if(e_3149.$tag==2){
      return (($gt$gt$eq($instance_677))(fin_3153(e_3149.$1)))(ff_3161 => (($gt$gt$eq($instance_677))(fin_3153(e_3149.$2)))(fa_3162 => ok_3151(((App_781((setAnnType_815(tf_3157))(e_3149.$0)))(ff_3161))(fa_3162))))
    } else if(e_3149.$tag==3){
      return (($gt$gt$eq($instance_677))(fin_3153(e_3149.$2)))(ef_3166 => ok_3151(((Lam_782((setAnnType_815(tf_3157))(e_3149.$0)))(e_3149.$1))(ef_3166)))
    } else if(e_3149.$tag==5){
      return (($gt$gt$eq($instance_677))((((finalizeBindings_2515(ctx2_3150))(vars_3147))(ins_3148))(e_3149.$1)))(bsf_3170 => (($gt$gt$eq($instance_677))(fin_3153(e_3149.$2)))(ef_3171 => ok_3151(((Let_784((setAnnType_815(tf_3157))(e_3149.$0)))(bsf_3170))(ef_3171))))
    } else if(e_3149.$tag==6){
      return (($gt$gt$eq($instance_677))(((mapM_57($instance_677))(fin_3153))(e_3149.$2)))(esf_3175 => ok_3151(((New_785((setAnnType_815(tf_3157))(e_3149.$0)))(e_3149.$1))(esf_3175)))
    } else if(e_3149.$tag==4){
      const finCase_3179 = $pat_3180 => (($gt$gt$eq($instance_677))((((finalizePat_2514(ctx2_3150))(vars_3147))(ins_3148))($pat_3180.$0)))(pf_3183 => (($gt$gt$eq($instance_677))(fin_3153($pat_3180.$1)))(ef_3184 => ok_3151((Pair_3(pf_3183))(ef_3184))));
      return (($gt$gt$eq($instance_677))(fin_3153(e_3149.$1)))(ef_3185 => (($gt$gt$eq($instance_677))(((mapM_57($instance_677))(finCase_3179))(e_3149.$2)))(psf_3186 => ok_3151(((Case_783((setAnnType_815(tf_3157))(e_3149.$0)))(ef_3185))(psf_3186))))
    } else return ok_3151((setType_827(tf_3157))(e_3149))
  })
};
const finalizeBindings_2515 = ctx_3200 => vars_3201 => ins_3202 => bs_3203 => {
  const fin_3204 = $pat_3205 => (($gt$gt$eq($instance_677))((((finalizeExpr_2513(($lt$lt_1753(ctx_3200))(__3208 => BindingCtx_1741($pat_3205.$0))))(vars_3201))(ins_3202))($pat_3205.$1)))(ef_3209 => Ok_615((Pair_3($pat_3205.$0))(ef_3209)));
  return ((mapM_57($instance_677))(fin_3204))(bs_3203)
};
const preferredVar_2487 = local$instance$Ord$0 => v_2637 => w_2638 => {
  const $phi$503 = (($eq$eq($instance_446))(length(v_2637)))(length(w_2638));
  if($phi$503){
    return (($lt(local$instance$Ord$0))(v_2637))(w_2638)
  } else if(!$phi$503){
    return (($lt($instance_448))(length(v_2637)))(length(w_2638))
  } else error("pattern match fail in //compiler/newtyper.jg at line 91, column 20",$phi$503)
};
const tapp_2477 = TApp_800(Empty_11);
const getVars_2483 = (($gt$gt$eq($instance_502))(gets_59))($pat_2585 => (ret($instance_502))($pat_2585.$1));
const $instance_482 = $class$Functor(f_476 => $pat_477 => State_10(s_479 => {
  const $phi$507 = $pat_477.$0(s_479);
  return (Pair_3($phi$507.$0))(f_476($phi$507.$1))
}));
const resolveType_2507 = t_3017 => {
  const resolve_3018 = t_3019 => {
    if(t_3019.$tag==1){
      return (($gt$gt$eq($instance_502))(getVars_2483))(vars_3022 => {
        const $phi$513 = (((lookup_66($instance_447))($instance_506))(t_3019.$1))(vars_3022);
        if($phi$513.$tag==1){
          return (ret($instance_502))(Nothing_2)
        } else if($phi$513.$tag==0){
          return (($gt$gt$eq($instance_502))(resolve_3018($phi$513.$0)))(t2_3024 => {
            if(t2_3024.$tag==0){
              return (($gt$gt_21($instance_502))((setVar_2482(t_3019.$1))(t2_3024.$0)))((ret($instance_502))(Just_1(t2_3024.$0)))
            } else if(t2_3024.$tag==1){
              return (ret($instance_502))(Just_1($phi$513.$0))
            } else error("pattern match fail in //compiler/newtyper.jg at line 344, column 13",t2_3024)
          })
        } else error("pattern match fail in //compiler/newtyper.jg at line 341, column 9",$phi$513)
      })
    } else if(t_3019.$tag==3){
      return (($gt$gt$eq($instance_502))(resolve_3018(t_3019.$1)))(fr_3029 => (($gt$gt$eq($instance_502))(resolve_3018(t_3019.$2)))(ar_3030 => {
        if(fr_3029.$tag==1){
          if(ar_3030.$tag==1){
            return (ret($instance_502))(Nothing_2)
          } else if(ar_3030.$tag==0){
            return ($_16(ret($instance_502)))(Just_1(((TApp_800(t_3019.$0))(t_3019.$1))(ar_3030.$0)))
          } else error("pattern match fail in //compiler/newtyper.jg at line 349, column 22",ar_3030)
        } else if(fr_3029.$tag==0){
          if(ar_3030.$tag==1){
            return ($_16(ret($instance_502)))(Just_1(((TApp_800(t_3019.$0))(fr_3029.$0))(t_3019.$2)))
          } else if(ar_3030.$tag==0){
            return ($_16(ret($instance_502)))(Just_1(((TApp_800(t_3019.$0))(fr_3029.$0))(ar_3030.$0)))
          } else error("pattern match fail in //compiler/newtyper.jg at line 352, column 22",ar_3030)
        } else error("pattern match fail in //compiler/newtyper.jg at line 348, column 9",fr_3029)
      }))
    } else return (ret($instance_502))(Nothing_2)
  };
  return ((fmap($instance_482))(justOr_24(t_3017)))(resolve_3018(t_3017))
};
const unifyType_2484 = ctx_2590 => a_2591 => b_2592 => {
  const ctx2_2593 = ($lt$lt_1753(ctx_2590))(__2596 => (UnifyCtx_1743(a_2591))(b_2592));
  const err_2595 = local$instance$Monad$0 => m_2598 => ($_16(ret(local$instance$Monad$0)))(Err_616((Pair_3(ctx2_2593))(m_2598)));
  const ok_2594 = local$instance$Monad$1 => a_2597 => ($_16(ret(local$instance$Monad$1)))(Ok_615(a_2597));
  return (($gt$gt$eq($instance_502))(resolveType_2507(a_2591)))(a_2599 => (($gt$gt$eq($instance_502))(resolveType_2507(b_2592)))(b_2600 => {
    const $phi$516 = (Pair_3(a_2599))(b_2600);
    if($phi$516.$0.$tag==7){
      return (err_2595($instance_502))("unify with TUnknown")
    } else if($phi$516.$1.$tag==7){
      return (err_2595($instance_502))("unify with TUnknown")
    } else if(($phi$516.$0.$tag==1)&&($phi$516.$1.$tag==1)){
      const $phi$522 = (($eq$eq($instance_447))($phi$516.$0.$1))($phi$516.$1.$1);
      if($phi$522){
        return (ok_2594($instance_502))(a_2599)
      } else if(!$phi$522){
        const $phi$524 = ((preferredVar_2487($instance_449))($phi$516.$0.$1))($phi$516.$1.$1);
        if($phi$524){
          return (($gt$gt_21($instance_502))((setVar_2482($phi$516.$1.$1))(a_2599)))((ok_2594($instance_502))(a_2599))
        } else if(!$phi$524){
          return (($gt$gt_21($instance_502))((setVar_2482($phi$516.$0.$1))(b_2600)))((ok_2594($instance_502))(b_2600))
        } else error("pattern match fail in //compiler/newtyper.jg at line 55, column 16",$phi$524)
      } else error("pattern match fail in //compiler/newtyper.jg at line 53, column 29",$phi$522)
    } else if($phi$516.$0.$tag==1){
      return (($gt$gt_21($instance_502))((setVar_2482($phi$516.$0.$1))(b_2600)))((ok_2594($instance_502))(b_2600))
    } else if($phi$516.$1.$tag==1){
      return (($gt$gt_21($instance_502))((setVar_2482($phi$516.$1.$1))(a_2599)))((ok_2594($instance_502))(a_2599))
    } else if(($phi$516.$0.$tag==0)&&($phi$516.$1.$tag==0)){
      const $phi$520 = (($eq$eq($instance_447))($phi$516.$0.$1))($phi$516.$1.$1);
      if($phi$520){
        return (ok_2594($instance_502))(a_2599)
      } else if(!$phi$520){
        return (err_2595($instance_502))("type name mismatch")
      } else error("pattern match fail in //compiler/newtyper.jg at line 60, column 33",$phi$520)
    } else if(($phi$516.$0.$tag==2)&&($phi$516.$1.$tag==2)){
      const $phi$518 = (($eq$eq($instance_447))($phi$516.$0.$1))($phi$516.$1.$1);
      if($phi$518){
        return (ok_2594($instance_502))(a_2599)
      } else if(!$phi$518){
        return (err_2595($instance_502))("skolem mismatch")
      } else error("pattern match fail in //compiler/newtyper.jg at line 63, column 35",$phi$518)
    } else if(($phi$516.$0.$tag==3)&&($phi$516.$1.$tag==3)){
      return (($gt$gt$eq$gt$gt_623($instance_502))(((unifyType_2484(ctx2_2593))($phi$516.$0.$1))($phi$516.$1.$1)))(fu_2627 => (($gt$gt$eq$gt$gt_623($instance_502))(((unifyType_2484(ctx2_2593))($phi$516.$0.$2))($phi$516.$1.$2)))(xu_2628 => (ok_2594($instance_502))((tapp_2477(fu_2627))(xu_2628))))
    } else return (err_2595($instance_502))((("cannot unify "+(printType_1442(a_2599)))+" and ")+(printType_1442(b_2600)))
  }))
};
const dropRins_2509 = vs_3041 => {
  const inType_3042 = t_3043 => {
    if(t_3043.$tag==2){
      return (((setContains_82($instance_447))($instance_506))(t_3043.$1))(vs_3041)
    } else if(t_3043.$tag==3){
      return (inType_3042(t_3043.$1))||(inType_3042(t_3043.$2))
    } else return false
  };
  return (($gt$gt$eq($instance_502))(gets_59))($pat_3050 => sets_60((((US_2474($pat_3050.$0))($pat_3050.$1))($pat_3050.$2))((filter(i_3055 => not_31(inType_3042(i_3055))))($pat_3050.$3))))
};
const freshName_2485 = (($gt$gt$eq($instance_502))(gets_59))($pat_2630 => {
  const v_2635 = "$"+(intToString($pat_2630.$2));
  const n2_2636 = $pat_2630.$2+1;
  return (($gt$gt_21($instance_502))(sets_60((((US_2474($pat_2630.$0))($pat_2630.$1))(n2_2636))($pat_2630.$3))))((ret($instance_502))(v_2635))
});
const freshVar_2486 = ((fmap($instance_482))(TVar_798(Empty_11)))(freshName_2485);
const addRequiredBounds_2492 = bs_2666 => (($gt$gt$eq($instance_502))(gets_59))($pat_2667 => sets_60((((US_2474($pat_2667.$0))($pat_2667.$1))($pat_2667.$2))((concat($pat_2667.$3))(bs_2666))));
const instantiate_2488 = t_2639 => {
  const addRep_2640 = local$instance$Eq$1 => local$instance$Hashable$0 => reps_2641 => v_2642 => (($gt$gt$eq($instance_502))(freshVar_2486))(t_2643 => ($_16(ret($instance_502)))(((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(v_2642))(t_2643))(reps_2641)));
  if(t_2639.$tag==6){
    return (($gt$gt$eq($instance_502))((((foldM_56($instance_502))((addRep_2640($instance_447))($instance_506)))(Empty_11))(t_2639.$1)))(reps_2648 => (($gt$gt$eq($instance_502))(((mapM_57($instance_502))(resolveType_2507))(t_2639.$2)))(bs_2649 => {
      const t2_2651 = (replaceSkolems_1985(t_2639.$3))(reps_2648);
      return (($gt$gt_21($instance_502))(addRequiredBounds_2492((map(b_2650 => (replaceSkolems_1985(b_2650))(reps_2648)))(bs_2649))))((ret($instance_502))(t2_2651))
    }))
  } else return (ret($instance_502))(t_2639)
};
const resolveName_2490 = ctx_2653 => n_2654 => scope_2655 => {
  const $phi$531 = (((lookup_66($instance_447))($instance_506))(n_2654))(scope_2655);
  if($phi$531.$tag==1){
    return (($gt$gt$eq($instance_502))(gets_59))($pat_2656 => {
      const $phi$534 = (((lookup_66($instance_447))($instance_506))(n_2654))($pat_2656.$0);
      if($phi$534.$tag==1){
        return ($_16(ret($instance_502)))(Err_616((Pair_3(ctx_2653))("name not in scope: "+n_2654)))
      } else if($phi$534.$tag==0){
        return ($_16((fmap($instance_482))(Ok_615)))(instantiate_2488($phi$534.$0))
      } else error("pattern match fail in //compiler/newtyper.jg at line 121, column 7",$phi$534)
    })
  } else if($phi$531.$tag==0){
    return ($_16((fmap($instance_482))(Ok_615)))(instantiate_2488($phi$531.$0))
  } else error("pattern match fail in //compiler/newtyper.jg at line 119, column 3",$phi$531)
};
const scopeInsert_2489 = local$instance$Eq$1 => local$instance$Hashable$0 => (insert_67(local$instance$Eq$1))(local$instance$Hashable$0);
const bindingsToScope_2498 = local$instance$Eq$1 => local$instance$Hashable$0 => foldl(s_2848 => $pat_2849 => ((((scopeInsert_2489(local$instance$Eq$1))(local$instance$Hashable$0))($pat_2849.$0))(getType_830($pat_2849.$1)))(s_2848));
const splitBindings_2500 = bs_2871 => {
  const split_2872 = $pat_2873 => $pat_2876 => {
    const $phi$539 = getType_830($pat_2876.$1);
    if($phi$539.$tag==7){
      return (Pair_3((push((Pair_3($pat_2876.$0))($pat_2876.$1)))($pat_2873.$0)))($pat_2873.$1)
    } else return (Pair_3($pat_2873.$0))((push((Pair_3($pat_2876.$0))($pat_2876.$1)))($pat_2873.$1))
  };
  return ((foldl(split_2872))((Pair_3([]))([])))(bs_2871)
};
const fullDfs_2208 = local$instance$Eq$1 => local$instance$Hashable$0 => g_2218 => {
  const visit_2219 = result_2220 => v_2221 => __2222 => {
    const $phi$541 = ((contains_33(local$instance$Eq$1))(v_2221))(result_2220);
    if($phi$541){
      return result_2220
    } else if(!$phi$541){
      return (concat(((((dfs_2207(local$instance$Eq$1))(local$instance$Hashable$0))(g_2218))(result_2220))(v_2221)))(result_2220)
    } else error("pattern match fail in //compiler/graph.jg at line 12, column 22",$phi$541)
  };
  return ((foldTrie_70(visit_2219))([]))(g_2218)
};
const scc_2209 = local$instance$Eq$1 => local$instance$Hashable$0 => g_2223 => {
  const firstDfs_2226 = ((fullDfs_2208(local$instance$Eq$1))(local$instance$Hashable$0))(g_2223);
  const invertEdge_2228 = local$instance$Eq$3 => local$instance$Hashable$2 => v_2230 => ig_2231 => e_2232 => {
    const $phi$543 = (((lookup_66(local$instance$Eq$3))(local$instance$Hashable$2))(e_2232))(ig_2231);
    if($phi$543.$tag==0){
      return ((((insert_67(local$instance$Eq$3))(local$instance$Hashable$2))(e_2232))((push(v_2230))($phi$543.$0)))(ig_2231)
    } else if($phi$543.$tag==1){
      return ((((insert_67(local$instance$Eq$3))(local$instance$Hashable$2))(e_2232))([v_2230]))(ig_2231)
    } else error("pattern match fail in //compiler/graph.jg at line 19, column 25",$phi$543)
  };
  const invert_2229 = local$instance$Eq$5 => local$instance$Hashable$4 => ig_2234 => v_2235 => es_2236 => {
    let $phi$544;
    const $phi$545 = (((lookup_66(local$instance$Eq$5))(local$instance$Hashable$4))(v_2235))(ig_2234);
    if($phi$545.$tag==0){
      $phi$544 = ig_2234
    } else if($phi$545.$tag==1){
      $phi$544 = (((((insert_67(local$instance$Eq$5))(local$instance$Hashable$4))(v_2235))([]))(ig_2234))
    } else error("pattern match fail in //compiler/graph.jg at line 23, column 13",$phi$545);
    const ig2_2237 = $phi$544;
    return ((foldl(((invertEdge_2228(local$instance$Eq$5))(local$instance$Hashable$4))(v_2235)))(ig2_2237))(es_2236)
  };
  const invertedG_2224 = ((foldTrie_70((invert_2229(local$instance$Eq$1))(local$instance$Hashable$0)))(Empty_11))(g_2223);
  const assembleCc_2225 = local$instance$Eq$7 => local$instance$Hashable$6 => $pat_2239 => v_2242 => {
    const $phi$548 = (exists_37((contains_33(local$instance$Eq$7))(v_2242)))($pat_2239.$1);
    if($phi$548){
      return (Pair_3($pat_2239.$0))($pat_2239.$1)
    } else if(!$phi$548){
      const cc_2243 = ((((dfs_2207(local$instance$Eq$7))(local$instance$Hashable$6))($pat_2239.$0))([]))(v_2242);
      const ig2_2244 = ((foldl(g_2245 => v_2246 => (((remove_69(local$instance$Eq$7))(local$instance$Hashable$6))(v_2246))(g_2245)))($pat_2239.$0))(cc_2243);
      return (Pair_3(ig2_2244))((push(cc_2243))($pat_2239.$1))
    } else error("pattern match fail in //compiler/graph.jg at line 28, column 28",$phi$548)
  };
  const ccs_2227 = snd_28(((foldl((assembleCc_2225(local$instance$Eq$1))(local$instance$Hashable$0)))((Pair_3(invertedG_2224))([])))(firstDfs_2226));
  return ccs_2227
};
const $instance_504 = $class$Hashable(n_503 => n_503);
const sccSorted_2210 = local$instance$Eq$1 => local$instance$Hashable$0 => g_2247 => {
  const ccs_2248 = ((scc_2209(local$instance$Eq$1))(local$instance$Hashable$0))(g_2247);
  const topSort_2249 = ccs_2251 => {
    const f_2256 = local$instance$Eq$3 => local$instance$Hashable$2 => r_2257 => $pat_2258 => ((foldl(r_2261 => c_2262 => ((((insert_67(local$instance$Eq$3))(local$instance$Hashable$2))(c_2262))($pat_2258.$0))(r_2261)))(r_2257))($pat_2258.$1);
    const g2g_2252 = ((foldl((f_2256(local$instance$Eq$1))(local$instance$Hashable$0)))(Empty_11))(zipWithIndex_42(ccs_2251));
    const addGraph_2253 = r_2263 => v_2264 => es_2265 => {
      const rv_2266 = ($_16(fromJust_25))((((lookup_66(local$instance$Eq$1))(local$instance$Hashable$0))(v_2264))(g2g_2252));
      const res_2267 = (uniq_51($instance_446))(sort((filter(re_2268 => (($div$eq_17($instance_446))(re_2268))(rv_2266)))((map(e_2269 => ($_16(fromJust_25))((((lookup_66(local$instance$Eq$1))(local$instance$Hashable$0))(e_2269))(g2g_2252))))(es_2265))));
      const $phi$551 = (((lookup_66($instance_446))($instance_504))(rv_2266))(r_2263);
      if($phi$551.$tag==1){
        return ((((insert_67($instance_446))($instance_504))(rv_2266))(res_2267))(r_2263)
      } else if($phi$551.$tag==0){
        return ((((insert_67($instance_446))($instance_504))(rv_2266))((((mergeSet_50($instance_446))($instance_448))(res_2267))($phi$551.$0)))(r_2263)
      } else error("pattern match fail in //compiler/graph.jg at line 48, column 10",$phi$551)
    };
    const cg_2254 = ((foldTrie_70(addGraph_2253))(Empty_11))(g_2247);
    const ord_2255 = ((fullDfs_2208($instance_446))($instance_504))(cg_2254);
    return reverse_52((map(i_2271 => (getIx(i_2271))(ccs_2251)))(ord_2255))
  };
  const result_2250 = topSort_2249(ccs_2248);
  return result_2250
};
const computeSCC_2499 = bs_2852 => {
  const bsm_2853 = (((insertAll_77($instance_447))($instance_506))(bs_2852))(Empty_11);
  const g_2855 = ((foldl(g_2862 => $pat_2863 => ((((insert_67($instance_447))($instance_506))($pat_2863.$0))((filter(v_2866 => (($_16(isJust_26))((((lookup_66($instance_447))($instance_506))(v_2866))(bsm_2853)))&&((($div$eq_17($instance_447))(v_2866))($pat_2863.$0))))(($_16(setToArray_84))((freeVars_2497(Empty_11))($pat_2863.$1)))))(g_2862)))(Empty_11))(bs_2852);
  const ccs_2856 = ((sccSorted_2210($instance_447))($instance_506))(g_2855);
  const ixs_2854 = ((foldl(m_2858 => $pat_2859 => ((((insert_67($instance_447))($instance_506))($pat_2859.$1))($pat_2859.$0))(m_2858)))(Empty_11))(zipWithIndex_42((map(fst_27))(bs_2852)));
  const cmp_2857 = n_2867 => m_2868 => (($_16(fromJust_25))((((lookup_66($instance_447))($instance_506))(n_2867))(ixs_2854)))-(($_16(fromJust_25))((((lookup_66($instance_447))($instance_506))(m_2868))(ixs_2854)));
  return (map(cc_2869 => (map(v_2870 => (Pair_3(v_2870))(($_16(fromJust_25))((((lookup_66($instance_447))($instance_506))(v_2870))(bsm_2853)))))((sortBy(cmp_2857))(cc_2869))))(ccs_2856)
};
const prepareBindings_2501 = scope_2880 => bs_2881 => {
  const $pat_273_2_2882 = splitBindings_2500(bs_2881);
  let $phi$554;
  $phi$554 = $pat_273_2_2882.$1;
  const tbs_2883 = $phi$554;
  let $phi$555;
  $phi$555 = $pat_273_2_2882.$0;
  const ubs_2884 = $phi$555;
  const sortedBs_2886 = (concat(computeSCC_2499(ubs_2884)))((map(b_2891 => [b_2891]))(tbs_2883));
  const scope2_2885 = (((bindingsToScope_2498($instance_447))($instance_506))(scope_2880))(tbs_2883);
  return (Pair_3(scope2_2885))(sortedBs_2886)
};
const MRGCtx_1746 = $_0_1764 => ({$0:$_0_1764,$tag:6});
const tfun_2478 = a_2529 => b_2530 => (tapp_2477((tapp_2477((TConst_797(Empty_11))("->")))(a_2529)))(b_2530);
const consType_2494 = dataType_2751 => argTypes_2752 => ((foldr(d_2753 => t_2754 => (tfun_2478(t_2754))(d_2753)))(dataType_2751))(argTypes_2752);
const tstr_2476 = (TConst_797(Empty_11))("String");
const inferPat_2495 = ctx_2755 => scope_2756 => p_2757 => {
  const ctx2_2758 = ($lt$lt_1753(ctx_2755))(__2762 => PatCtx_1745(p_2757));
  const err_2760 = local$instance$Monad$0 => m_2764 => ($_16(ret(local$instance$Monad$0)))(Err_616((Pair_3(ctx2_2758))(m_2764)));
  const ok_2759 = local$instance$Monad$1 => p_2763 => ($_16(ret(local$instance$Monad$1)))(Ok_615(p_2763));
  const finalize_2761 = p_2765 => t_2766 => {
    const $phi$557 = getPatType_831(p_2765);
    if($phi$557.$tag==7){
      return (ok_2759($instance_502))((setPatType_832(t_2766))(p_2765))
    } else return (($gt$gt$gt$gt_624($instance_502))(((unifyType_2484(ctx2_2758))(t_2766))($phi$557)))((ok_2759($instance_502))(p_2765))
  };
  if(p_2757.$tag==0){
    return (($gt$gt$eq($instance_502))(freshVar_2486))(finalize_2761(p_2757))
  } else if((p_2757.$tag==1)&&(p_2757.$1.$tag==0)){
    return (finalize_2761(p_2757))(tnum_2475)
  } else if((p_2757.$tag==1)&&(p_2757.$1.$tag==1)){
    return (finalize_2761(p_2757))(tstr_2476)
  } else if(p_2757.$tag==2){
    return (($gt$gt$eq$gt$gt_623($instance_502))(((mapOkM_626($instance_502))((inferPat_2495(ctx2_2758))(scope_2756)))(p_2757.$2)))(psi_2777 => (($gt$gt$eq($instance_502))(freshVar_2486))(dt_2778 => (($gt$gt$eq$gt$gt_623($instance_502))(((resolveName_2490(ctx2_2758))(p_2757.$1))(scope_2756)))(ct_2779 => (($gt$gt$gt$gt_624($instance_502))(((unifyType_2484(ctx2_2758))(ct_2779))((consType_2494(dt_2778))((map(getPatType_831))(psi_2777)))))((finalize_2761(((PData_790(p_2757.$0))(p_2757.$1))(psi_2777)))(dt_2778)))))
  } else error("pattern match fail in //compiler/newtyper.jg at line 210, column 6",p_2757)
};
const boundsWithVars_2510 = vs_3056 => {
  const inType_3057 = t_3058 => {
    if(t_3058.$tag==1){
      return (((setContains_82($instance_447))($instance_506))(t_3058.$1))(vs_3056)
    } else if(t_3058.$tag==3){
      return (inType_3057(t_3058.$1))||(inType_3057(t_3058.$2))
    } else return false
  };
  return (($gt$gt$eq($instance_502))(gets_59))($pat_3065 => (ret($instance_502))((filter(inType_3057))($pat_3065.$3)))
};
const varsInType_2479 = t_2531 => {
  if(t_2531.$tag==0){
    return Empty_11
  } else if(t_2531.$tag==1){
    return (((setAdd_79($instance_447))($instance_506))(t_2531.$1))(Empty_11)
  } else if(t_2531.$tag==2){
    return Empty_11
  } else if(t_2531.$tag==3){
    return (((setUnion_83($instance_447))($instance_506))(varsInType_2479(t_2531.$1)))(varsInType_2479(t_2531.$2))
  } else if(t_2531.$tag==6){
    return varsInType_2479(t_2531.$3)
  } else return error("unsupported type in varsInType "+(jsonStringify(t_2531)))
};
const generalize_2511 = envTypes_3070 => t_3071 => {
  const envVars_3072 = (((foldM_56($instance_502))(vs_3074 => t_3075 => (($gt$gt$eq($instance_502))(resolveType_2507(t_3075)))(t_3076 => ($_16(ret($instance_502)))((((setUnion_83($instance_447))($instance_506))(vs_3074))(varsInType_2479(t_3076))))))(Empty_11))(envTypes_3070);
  const gen_3073 = evs_3077 => t_3078 => {
    if(t_3078.$tag==0){
      return (ret($instance_502))((Pair_3(t_3078))([]))
    } else if(t_3078.$tag==2){
      return (ret($instance_502))((Pair_3(t_3078))([]))
    } else if(t_3078.$tag==3){
      return (($gt$gt$eq($instance_502))((gen_3073(evs_3077))(t_3078.$1)))($pat_3086 => (($gt$gt$eq($instance_502))((gen_3073(evs_3077))(t_3078.$2)))($pat_3089 => (ret($instance_502))((Pair_3(((TApp_800(t_3078.$0))($pat_3086.$0))($pat_3089.$0)))((concat($pat_3086.$1))($pat_3089.$1)))))
    } else if(t_3078.$tag==1){
      return (($gt$gt$eq($instance_502))(getVars_2483))(vars_3094 => {
        const $phi$564 = (Pair_3((((lookup_66($instance_447))($instance_506))(t_3078.$1))(vars_3094)))((((setContains_82($instance_447))($instance_506))(t_3078.$1))(evs_3077));
        if($phi$564.$0.$tag==0){
          return (gen_3073(evs_3077))($phi$564.$0.$0)
        } else if($phi$564.$1){
          return (ret($instance_502))((Pair_3(t_3078))([]))
        } else if(($phi$564.$0.$tag==1)&&(!$phi$564.$1)){
          const sk_3098 = (TSkolem_799(Empty_11))(t_3078.$1);
          return (ret($instance_502))((Pair_3(sk_3098))([t_3078.$1]))
        } else error("pattern match fail in //compiler/newtyper.jg at line 393, column 9",$phi$564)
      })
    } else error("pattern match fail in //compiler/newtyper.jg at line 385, column 5",t_3078)
  };
  if(t_3071.$tag==6){
    return (ret($instance_502))((Pair_3(t_3071.$1))(t_3071))
  } else return (($gt$gt$eq($instance_502))(envVars_3072))(evs_3104 => (($gt$gt$eq($instance_502))((gen_3073(evs_3104))(t_3071)))($pat_3105 => {
    const $phi$570 = length($pat_3105.$1);
    if(0==$phi$570){
      return (ret($instance_502))((Pair_3([]))($pat_3105.$0))
    } else {
      const vsSet_3109 = (((setAddAll_80($instance_447))($instance_506))($pat_3105.$1))(Empty_11);
      return (($gt$gt$eq($instance_502))(boundsWithVars_2510(vsSet_3109)))(bs_3110 => {
        const tr_3111 = (((TForall_803(Empty_11))($pat_3105.$1))(bs_3110))($pat_3105.$0);
        return (ret($instance_502))((Pair_3($pat_3105.$1))(tr_3111))
      })
    }
  }))
};
const scopeTypesForGen_2491 = (foldTrie_70(ts_2663 => __2664 => t_2665 => (push(t_2665))(ts_2663)))([]);
const resolveRins_2508 = (($gt$gt$eq($instance_502))(gets_59))($pat_3035 => (($gt$gt$eq($instance_502))(((mapM_57($instance_502))(resolveType_2507))($pat_3035.$3)))(rins2_3040 => sets_60((((US_2474($pat_3035.$0))($pat_3035.$1))($pat_3035.$2))(rins2_3040))));
const inferExpr_2493 = ctx_2672 => scope_2673 => e_2674 => {
  const ctx2_2675 = ($lt$lt_1753(ctx_2672))(__2679 => ExprCtx_1742(e_2674));
  const err_2677 = local$instance$Monad$0 => m_2681 => ($_16(ret(local$instance$Monad$0)))(Err_616((Pair_3(ctx2_2675))(m_2681)));
  const ok_2676 = local$instance$Monad$1 => e_2680 => ($_16(ret(local$instance$Monad$1)))(Ok_615(e_2680));
  const finalize_2678 = e_2682 => t_2683 => {
    const $phi$573 = getType_830(e_2682);
    if($phi$573.$tag==7){
      return (ok_2676($instance_502))((setType_827(t_2683))(e_2682))
    } else if($phi$573.$tag==6){
      return (($gt$gt$gt$gt_624($instance_502))(((unifyType_2484(ctx2_2675))(t_2683))($phi$573.$3)))((ok_2676($instance_502))(e_2682))
    } else return (($gt$gt$gt$gt_624($instance_502))(((unifyType_2484(ctx2_2675))(t_2683))($phi$573)))((ok_2676($instance_502))(e_2682))
  };
  if((e_2674.$tag==1)&&(e_2674.$1.$tag==0)){
    return (finalize_2678(e_2674))(tnum_2475)
  } else if((e_2674.$tag==1)&&(e_2674.$1.$tag==1)){
    return (finalize_2678(e_2674))(tstr_2476)
  } else if(e_2674.$tag==0){
    return (($gt$gt$eq$gt$gt_623($instance_502))(((resolveName_2490(ctx2_2675))(e_2674.$1))(scope_2673)))(finalize_2678(e_2674))
  } else if(e_2674.$tag==2){
    return (($gt$gt$eq$gt$gt_623($instance_502))(((inferExpr_2493(ctx2_2675))(scope_2673))(e_2674.$1)))(fi_2698 => (($gt$gt$eq$gt$gt_623($instance_502))(((inferExpr_2493(ctx2_2675))(scope_2673))(e_2674.$2)))(ai_2699 => (($gt$gt$eq($instance_502))(freshVar_2486))(v_2700 => (($gt$gt$gt$gt_624($instance_502))(((unifyType_2484(ctx2_2675))(getType_830(fi_2698)))((tfun_2478(getType_830(ai_2699)))(v_2700))))((finalize_2678(((App_781(e_2674.$0))(fi_2698))(ai_2699)))(v_2700)))))
  } else if(e_2674.$tag==3){
    return (($gt$gt$eq($instance_502))(freshVar_2486))(v_2704 => {
      let $phi$578;
      if("_"==e_2674.$1){
        $phi$578 = scope_2673
      } else $phi$578 = (((((scopeInsert_2489($instance_447))($instance_506))(e_2674.$1))(v_2704))(scope_2673));
      const scope2_2705 = $phi$578;
      return (($gt$gt$eq$gt$gt_623($instance_502))(((inferExpr_2493(ctx2_2675))(scope2_2705))(e_2674.$2)))(ei_2707 => (finalize_2678(((Lam_782(e_2674.$0))(e_2674.$1))(ei_2707)))((tfun_2478(v_2704))(getType_830(ei_2707))))
    })
  } else if((e_2674.$tag==6)&&("Array"==e_2674.$1)){
    return (($gt$gt$eq$gt$gt_623($instance_502))(((mapOkM_626($instance_502))((inferExpr_2493(ctx2_2675))(scope_2673)))(e_2674.$2)))(esi_2710 => (($gt$gt$eq($instance_502))(freshVar_2486))(elemType_2711 => (($gt$gt$gt$gt_624($instance_502))(((mapOkM_626($instance_502))((unifyType_2484(ctx2_2675))(elemType_2711)))((map(getType_830))(esi_2710))))((finalize_2678(((New_785(e_2674.$0))("Array"))(esi_2710)))(((TApp_800(Empty_11))((TConst_797(Empty_11))("Array")))(elemType_2711)))))
  } else if(e_2674.$tag==6){
    return (($gt$gt$eq$gt$gt_623($instance_502))(((mapOkM_626($instance_502))((inferExpr_2493(ctx2_2675))(scope_2673)))(e_2674.$2)))(esi_2715 => (($gt$gt$eq($instance_502))(freshVar_2486))(dt_2716 => (($gt$gt$eq$gt$gt_623($instance_502))(((resolveName_2490(ctx2_2675))(e_2674.$1))(scope_2673)))(ct_2717 => (($gt$gt$gt$gt_624($instance_502))(((unifyType_2484(ctx2_2675))(ct_2717))((consType_2494(dt_2716))((map(getType_830))(esi_2715)))))((finalize_2678(((New_785(e_2674.$0))(e_2674.$1))(esi_2715)))(dt_2716)))))
  } else if(e_2674.$tag==4){
    const collectBindings_2721 = scope_2723 => p_2724 => {
      if(p_2724.$tag==1){
        return scope_2723
      } else if((p_2724.$tag==0)&&("_"==p_2724.$1)){
        return scope_2723
      } else if(p_2724.$tag==0){
        return ((((scopeInsert_2489($instance_447))($instance_506))(p_2724.$1))(getPatType_831(p_2724)))(scope_2723)
      } else if(p_2724.$tag==2){
        return ((foldl(collectBindings_2721))(scope_2723))(p_2724.$2)
      } else error("pattern match fail in //compiler/newtyper.jg at line 181, column 9",p_2724)
    };
    const inferCase_2722 = pt_2733 => rt_2734 => $pat_2735 => (($gt$gt$eq$gt$gt_623($instance_502))(((inferPat_2495(ctx2_2675))(scope_2673))($pat_2735.$0)))(pi_2738 => (($gt$gt$eq$gt$gt_623($instance_502))(((unifyType_2484(ctx2_2675))(pt_2733))(getPatType_831(pi_2738))))(__2739 => (($gt$gt$eq$gt$gt_623($instance_502))(((inferExpr_2493(ctx2_2675))((collectBindings_2721(scope_2673))(pi_2738)))($pat_2735.$1)))(ei_2740 => (($gt$gt$gt$gt_624($instance_502))(((unifyType_2484(ctx2_2675))(rt_2734))(getType_830(ei_2740))))((ok_2676($instance_502))((Pair_3(pi_2738))(ei_2740))))));
    return (($gt$gt$eq$gt$gt_623($instance_502))(((inferExpr_2493(ctx2_2675))(scope_2673))(e_2674.$1)))(ei_2741 => (($gt$gt$eq($instance_502))(freshVar_2486))(rt_2742 => (($gt$gt$eq$gt$gt_623($instance_502))(((mapOkM_626($instance_502))((inferCase_2722(getType_830(ei_2741)))(rt_2742)))(e_2674.$2)))(psi_2743 => (finalize_2678(((Case_783(e_2674.$0))(ei_2741))(psi_2743)))(rt_2742))))
  } else if(e_2674.$tag==5){
    return (($gt$gt$eq$gt$gt_623($instance_502))(((inferBindings_2502(ctx2_2675))(scope_2673))(e_2674.$1)))($pat_2747 => (($gt$gt$eq$gt$gt_623($instance_502))(((inferExpr_2493(ctx2_2675))($pat_2747.$0))(e_2674.$2)))(ei_2750 => (finalize_2678(((Let_784(e_2674.$0))($pat_2747.$1))(ei_2750)))(getType_830(ei_2750))))
  } else error("pattern match fail in //compiler/newtyper.jg at line 152, column 6",e_2674)
};
const inferBindings_2502 = ctx_2892 => scope_2893 => bs_2894 => {
  const infer_2898 = $pat_2903 => bs_2906 => (($gt$gt$eq$gt$gt_623($instance_502))(((inferMRG_2503(ctx_2892))($pat_2903.$0))(bs_2906)))(bsi_2907 => (ret($instance_502))(Ok_615((Pair_3((((bindingsToScope_2498($instance_447))($instance_506))($pat_2903.$0))(bsi_2907)))((concat($pat_2903.$1))(bsi_2907)))));
  const $pat_282_2_2895 = (prepareBindings_2501(scope_2893))(bs_2894);
  let $phi$580;
  $phi$580 = $pat_282_2_2895.$0;
  const scope2_2897 = $phi$580;
  let $phi$581;
  $phi$581 = $pat_282_2_2895.$1;
  const bs2_2896 = $phi$581;
  return (($gt$gt$eq$gt$gt_623($instance_502))((((foldOkM_625($instance_502))(infer_2898))((Pair_3(scope2_2897))([])))(bs2_2896)))($pat_2908 => (ret($instance_502))(Ok_615((Pair_3($pat_2908.$0))($pat_2908.$1))))
};
const inferMRG_2503 = ctx_2911 => scope_2912 => bs_2913 => {
  const genB_2917 = $pat_2934 => $pat_2937 => (($gt$gt$eq($instance_502))((generalize_2511(scopeTypesForGen_2491(scope_2912)))(getType_830($pat_2937.$1))))($pat_2940 => (ret($instance_502))((Pair_3((concat($pat_2934.$0))($pat_2940.$0)))((push((Pair_3($pat_2937.$0))((setType_827($pat_2940.$1))($pat_2937.$1))))($pat_2934.$1))));
  const ctx2_2914 = ($lt$lt_1753(ctx_2911))(__2919 => MRGCtx_1746((map(fst_27))(bs_2913)));
  const inferB_2916 = scope_2928 => $pat_2929 => (($gt$gt$eq$gt$gt_623($instance_502))(((inferExpr_2493(($lt$lt_1753(ctx2_2914))(__2932 => BindingCtx_1741($pat_2929.$0))))(scope_2928))($pat_2929.$1)))(ei_2933 => (ret($instance_502))(Ok_615((Pair_3($pat_2929.$0))(ei_2933))));
  const setGenVar_2918 = v_2943 => (setVar_2482(v_2943))((TSkolem_799(Empty_11))(v_2943));
  const add_2915 = local$instance$Eq$1 => local$instance$Hashable$0 => $pat_2920 => $pat_2923 => {
    const $phi$590 = getType_830($pat_2923.$1);
    if($phi$590.$tag==7){
      return (($gt$gt$eq($instance_502))(freshVar_2486))(t_2926 => (ret($instance_502))((Pair_3(((((scopeInsert_2489(local$instance$Eq$1))(local$instance$Hashable$0))($pat_2923.$0))(t_2926))($pat_2920.$0)))((push((Pair_3($pat_2923.$0))((setType_827(t_2926))($pat_2923.$1))))($pat_2920.$1))))
    } else return (ret($instance_502))((Pair_3(((((scopeInsert_2489(local$instance$Eq$1))(local$instance$Hashable$0))($pat_2923.$0))($phi$590))($pat_2920.$0)))((push((Pair_3($pat_2923.$0))($pat_2923.$1)))($pat_2920.$1)))
  };
  return (($gt$gt$eq($instance_502))((((foldM_56($instance_502))((add_2915($instance_447))($instance_506)))((Pair_3(scope_2912))([])))(bs_2913)))($pat_2944 => (($gt$gt$eq$gt$gt_623($instance_502))(((mapOkM_626($instance_502))(inferB_2916($pat_2944.$0)))($pat_2944.$1)))(bsi_2947 => (($gt$gt$eq($instance_502))(resolveRins_2508))(__2948 => (($gt$gt$eq($instance_502))((((foldM_56($instance_502))(genB_2917))((Pair_3([]))([])))(bsi_2947)))($pat_2949 => (($gt$gt_21($instance_502))((($gt$gt_21($instance_502))((($gt$gt_21($instance_502))(((mapM_57($instance_502))(setGenVar_2918))($pat_2949.$0)))(resolveRins_2508)))(dropRins_2509((((setAddAll_80($instance_447))($instance_506))($pat_2949.$0))(Empty_11)))))((ret($instance_502))(Ok_615($pat_2949.$1)))))))
};
const replaceSkolem_2481 = v_2561 => vt_2562 => t_2563 => {
  if(t_2563.$tag==0){
    return t_2563
  } else if(t_2563.$tag==1){
    return t_2563
  } else if(t_2563.$tag==2){
    const $phi$595 = (($eq$eq($instance_447))(v_2561))(t_2563.$1);
    if($phi$595){
      return vt_2562
    } else if(!$phi$595){
      return t_2563
    } else error("pattern match fail in //compiler/newtyper.jg at line 36, column 20",$phi$595)
  } else if(t_2563.$tag==3){
    return ((TApp_800(t_2563.$0))(((replaceSkolem_2481(v_2561))(vt_2562))(t_2563.$1)))(((replaceSkolem_2481(v_2561))(vt_2562))(t_2563.$2))
  } else if(t_2563.$tag==6){
    return (((TForall_803(t_2563.$0))(t_2563.$1))(t_2563.$2))(((replaceSkolem_2481(v_2561))(vt_2562))(t_2563.$3))
  } else return error("unsupported type in replaceSkolem "+(jsonStringify(t_2563)))
};
const inferInstances_2521 = ctx_3265 => scope_3266 => ins_3267 => cs_3268 => defs_3269 => {
  const findClass_3270 = c_3272 => {
    const $phi$598 = (find_34($pat_3273 => (($eq$eq($instance_447))(c_3272))($pat_3273.$1)))(cs_3268);
    if($phi$598.$tag==0){
      return Ok_615($phi$598.$0)
    } else if($phi$598.$tag==1){
      return Err_616((Pair_3(ctx_3265))("no class found"))
    } else error("pattern match fail in //compiler/newtyper.jg at line 505, column 17",$phi$598)
  };
  const inferInstance_3271 = $pat_3279 => (($gt$gt$eq($instance_677))(findClass_3270($pat_3279.$1.$1)))($pat_3285 => {
    const bsts_3290 = ((foldl(m_3297 => $pat_3298 => ((((insert_67($instance_447))($instance_506))($pat_3298.$0))(((replaceSkolem_2481($pat_3285.$2))($pat_3279.$1.$2))($pat_3298.$1)))(m_3297)))(Empty_11))($pat_3285.$3);
    const bs2_3291 = (map($pat_3301 => (Pair_3($pat_3301.$0))((setType_827(($_16(fromJust_25))((((lookup_66($instance_447))($instance_506))($pat_3301.$0))(bsts_3290))))($pat_3301.$1))))($pat_3279.$1.$3);
    const $pat_511_6_3292 = (runState_61((((US_2474(Empty_11))(Empty_11))(1))([])))(((inferMRG_2503(ctx_3265))(scope_3266))(bs2_3291));
    let $phi$603;
    $phi$603 = $pat_511_6_3292.$0.$3;
    const rins_3295 = $phi$603;
    let $phi$604;
    $phi$604 = $pat_511_6_3292.$0.$2;
    const __3293 = $phi$604;
    let $phi$605;
    $phi$605 = $pat_511_6_3292.$0.$1;
    const vars_3296 = $phi$605;
    let $phi$606;
    $phi$606 = $pat_511_6_3292.$1;
    const bsi_3294 = $phi$606;
    return (($gt$gt$eq($instance_677))(bsi_3294))(bsi_3324 => (($gt$gt$eq($instance_677))((((finalizeBindings_2515(ctx_3265))(vars_3296))(ins_3267))(bsi_3324)))(bsf_3325 => (ret($instance_677))((Pair_3($pat_3279.$0))((((Instance_796($pat_3279.$1.$0))($pat_3279.$1.$1))($pat_3279.$1.$2))(bsf_3325)))))
  });
  return ((mapM_57($instance_677))(inferInstance_3271))(defs_3269)
};
const combineChecks_6802 = a_7043 => b_7044 => {
  if((a_7043.$tag==9)&&a_7043.$0){
    return b_7044
  } else if((b_7044.$tag==9)&&b_7044.$0){
    return a_7043
  } else return ((JSBinOp_6142("&&"))(a_7043))(b_7044)
};
const JSSeq_6155 = $_0_6190 => ({$0:$_0_6190,$tag:16});
const maybeOk_617 = r_630 => {
  if(r_630.$tag==0){
    return Just_1(r_630.$0)
  } else return Nothing_2
};
const resolveCtx_1755 = ctxsF_1789 => ctxsF_1789(Unit_0);
const tryDCE_6329 = e_6332 => {
  if(((e_6332.$tag==3)&&("&&"==e_6332.$0))&&((e_6332.$1.$tag==9)&&e_6332.$1.$0)){
    return e_6332.$2
  } else if(((e_6332.$tag==3)&&("&&"==e_6332.$0))&&((e_6332.$2.$tag==9)&&e_6332.$2.$0)){
    return e_6332.$1
  } else if((e_6332.$tag==6)&&((e_6332.$0.$tag==9)&&e_6332.$0.$0)){
    return e_6332.$1
  } else if((e_6332.$tag==6)&&((e_6332.$0.$tag==9)&&(!e_6332.$0.$0))){
    return e_6332.$2
  } else return e_6332
};
const JSNull_6151 = {$tag:12};
const JSConst_6159 = $_0_6195 => $_1_6196 => ({$0:$_0_6195,$1:$_1_6196,$tag:3});
const processInstances_2518 = defs_3244 => (map($pat_3245 => instFromDef_2517($pat_3245.$1)))(defs_3244);
const FinMRGCtx_1751 = $_0_1770 => ({$0:$_0_1770,$tag:11});
const TypeBoundCtx_1750 = $_0_1769 => ({$0:$_0_1769,$tag:10});
const inferTopMRG_2505 = ctx_2956 => scope_2957 => ins_2958 => bs_2959 => {
  const checkSatisfied_2965 = ctx_2986 => b_2987 => {
    const ctx2_2988 = ($lt$lt_1753(ctx_2986))(__2989 => TypeBoundCtx_1750(b_2987));
    return (($gt$gt$eq($instance_677))(((hasMatchingInstance_2504(ctx2_2988))(ins_2958))(b_2987)))(m_2990 => {
      if(m_2990){
        return Ok_615(Unit_0)
      } else if(!m_2990){
        return Err_616((Pair_3(ctx2_2988))("no matching instances among "+(jsonStringify((map(printType_1442))(ins_2958)))))
      } else error("pattern match fail in //compiler/newtyper.jg at line 323, column 49",m_2990)
    })
  };
  const $pat_319_2_2960 = (runState_61((((US_2474(scope_2957))(Empty_11))(1))([])))(((inferMRG_2503(ctx_2956))(Empty_11))(bs_2959));
  let $phi$613;
  $phi$613 = $pat_319_2_2960.$0.$1;
  const vars_2964 = $phi$613;
  let $phi$614;
  $phi$614 = $pat_319_2_2960.$1;
  const bsi_2962 = $phi$614;
  let $phi$615;
  $phi$615 = $pat_319_2_2960.$0.$3;
  const rins_2963 = $phi$615;
  let $phi$616;
  $phi$616 = $pat_319_2_2960.$0.$2;
  const __2961 = $phi$616;
  return (($gt$gt$eq($instance_677))((($gt$gt$eq($instance_677))(bsi_2962))(((finalizeBindings_2515(ctx_2956))(vars_2964))(ins_2958))))(bsf_2991 => {
    const ctx2_2992 = ($lt$lt_1753(ctx_2956))(__2993 => FinMRGCtx_1751((map($pat_2994 => (Pair_3($pat_2994.$0))(getType_830($pat_2994.$1))))(bsf_2991)));
    return (($gt$gt_21($instance_677))((($gt$gt$eq($instance_677))(((mapM_57($instance_677))(((finalizeType_2512(ctx2_2992))(vars_2964))(ins_2958)))(rins_2963)))((mapM_57($instance_677))(checkSatisfied_2965(ctx2_2992)))))(Ok_615(bsf_2991))
  })
};
const $instance_672 = $class$Functor(f_668 => r_669 => {
  if(r_669.$tag==1){
    return Err_616(r_669.$0)
  } else if(r_669.$tag==0){
    return Ok_615(f_668(r_669.$0))
  } else error("pattern match fail in //compiler/result.jg at line 6, column 14",r_669)
});
const inferTopBindings_2506 = ctx_2997 => scope_2998 => ins_2999 => bs_3000 => {
  const $pat_330_2_3001 = (prepareBindings_2501(scope_2998))(bs_3000);
  let $phi$619;
  $phi$619 = $pat_330_2_3001.$1;
  const bs2_3002 = $phi$619;
  const infer_3004 = $pat_3009 => bs_3012 => (($gt$gt$eq($instance_677))((((inferTopMRG_2505(ctx_2997))($pat_3009.$0))(ins_2999))(bs_3012)))(bsi_3013 => Ok_615((Pair_3((((bindingsToScope_2498($instance_447))($instance_506))($pat_3009.$0))(bsi_3013)))((concat($pat_3009.$1))(bsi_3013))));
  let $phi$621;
  $phi$621 = $pat_330_2_3001.$0;
  const scope2_3003 = $phi$621;
  return ($_16((fmap($instance_672))($pat_3014 => $pat_3014.$1)))((((foldM_56($instance_677))(infer_3004))((Pair_3(scope2_3003))([])))(bs2_3002))
};
const moduleExports_2524 = $pat_3363 => {
  const collectExports_3371 = es_3373 => $pat_3374 => {
    const $phi$626 = (((getAnn_809($instance_447))($instance_506))("export"))(annOf_828($pat_3374.$1));
    if($phi$626.$tag==1){
      return es_3373
    } else if(($phi$626.$tag==0)&&($phi$626.$0.$tag==5)){
      return ((((insert_67($instance_447))($instance_506))($phi$626.$0.$0))(getType_830($pat_3374.$1)))(es_3373)
    } else error("pattern match fail in //compiler/newtyper.jg at line 539, column 30",$phi$626)
  };
  const bs_3372 = ((foldl(collectExports_3371))(Empty_11))($pat_3363.$6);
  return ((ModuleInterface_792(bs_3372))($pat_3363.$4))(((foldl(m_3378 => $pat_3379 => ((((insert_67($instance_447))($instance_506))($pat_3379.$0))(instFromDef_2517($pat_3379.$1)))(m_3378)))(Empty_11))($pat_3363.$5))
};
const printCtx_1752 = ctx_1771 => {
  if(ctx_1771.$tag==0){
    return [("in module <"+ctx_1771.$0)+">"]
  } else if(ctx_1771.$tag==1){
    return [("in binding of <"+ctx_1771.$0)+">"]
  } else if(ctx_1771.$tag==3){
    return [((("in unify <"+(printType_1442(ctx_1771.$0)))+"> and <")+(printType_1442(ctx_1771.$1)))+">"]
  } else if((ctx_1771.$tag==2)&&(ctx_1771.$0.$tag==0)){
    return [("in var <"+ctx_1771.$0.$1)+">"]
  } else if(ctx_1771.$tag==10){
    return [("for type bound <"+(printType_1442(ctx_1771.$0)))+">"]
  } else if(ctx_1771.$tag==11){
    return (enqueue("finalizing bindings:"))((map($pat_1780 => ($pat_1780.$0+" :: ")+(printType_1442($pat_1780.$1))))(ctx_1771.$0))
  } else if(ctx_1771.$tag==7){
    return [("finilizing type <"+(printType_1442(ctx_1771.$0)))+">"]
  } else return []
};
const printErr_2522 = $pat_3326 => {
  if($pat_3326.$tag==1){
    return (join_39((push($pat_3326.$0.$1))((((concatMap_44($instance_452))($instance_450))(printCtx_1752))(resolveCtx_1755($pat_3326.$0.$0)))))("\n")
  } else error("pattern match fail in //compiler/newtyper.jg at line 516, column 1",$pat_3326)
};
const processClasses_2520 = cs_3264 => ((foldl(processClass_2519))(Empty_11))(cs_3264);
const processImports_2516 = ms_3210 => imports_3211 => {
  const processImport_3212 = $pat_3213 => {
    if($pat_3213.$tag==1){
      const $phi$633 = (get($pat_3213.$1))(ms_3210);
      const ins_3221 = (map(snd_28))(trieEntries_76($phi$633.$2));
      const bs_3220 = ((foldl(m_3222 => $pat_3223 => ((((insert_67($instance_447))($instance_506))($pat_3223.$1))(($_16(fromJust_25))((((lookup_66($instance_447))($instance_506))($pat_3223.$0))($phi$633.$0))))(m_3222)))(Empty_11))($pat_3213.$2);
      return ((Tuple3_4(bs_3220))(ins_3221))($phi$633.$1)
    } else error("pattern match fail in //compiler/newtyper.jg at line 482, column 3",$pat_3213)
  };
  return ((foldl($pat_3226 => i_3230 => {
    const $phi$637 = processImport_3212(i_3230);
    return ((Tuple3_4((((mergeTrie_74($instance_447))($instance_506))($pat_3226.$0))($phi$637.$0)))((concat($pat_3226.$1))($phi$637.$1)))((concat($pat_3226.$2))($phi$637.$2))
  }))(((Tuple3_4(Empty_11))([]))([])))(imports_3211)
};
const inferModule_2523 = ms_3329 => $pat_3330 => {
  const $pat_519_2_3339 = (processImports_2516(ms_3329))($pat_3330.$2);
  let $phi$639;
  $phi$639 = $pat_519_2_3339.$1;
  const importedInstances_3341 = $phi$639;
  const localInstances_3344 = processInstances_2518($pat_3330.$5);
  const instances_3346 = (concat(importedInstances_3341))(localInstances_3344);
  let $phi$640;
  $phi$640 = $pat_519_2_3339.$2;
  const importedClasses_3340 = $phi$640;
  const classes_3343 = (concat(importedClasses_3340))($pat_3330.$4);
  const ctx_3338 = __3349 => [ModuleCtx_1740($pat_3330.$1)];
  const classScope_3345 = processClasses_2520(classes_3343);
  let $phi$641;
  $phi$641 = $pat_519_2_3339.$0;
  const importedScope_3342 = $phi$641;
  const scope_3347 = (((mergeTrie_74($instance_447))($instance_506))(importedScope_3342))(classScope_3345);
  const result_3348 = (($gt$gt$eq($instance_677))((((inferTopBindings_2506(ctx_3338))(scope_3347))(instances_3346))($pat_3330.$6)))(typedBindings_3359 => (($gt$gt$eq($instance_677))(((((inferInstances_2521(ctx_3338))((((bindingsToScope_2498($instance_447))($instance_506))(scope_3347))(typedBindings_3359)))(instances_3346))(classes_3343))($pat_3330.$5)))(typedInstanceDefs_3360 => ($_16(ret($instance_677)))(((((((Module_791($pat_3330.$0))($pat_3330.$1))($pat_3330.$2))($pat_3330.$3))($pat_3330.$4))(typedInstanceDefs_3360))(typedBindings_3359))));
  if(result_3348.$tag==0){
    return (Pair_3(result_3348.$0))(moduleExports_2524(result_3348.$0))
  } else if(result_3348.$tag==1){
    return error(printErr_2522(result_3348))
  } else error("pattern match fail in //compiler/newtyper.jg at line 534, column 6",result_3348)
};
const setExports_3549 = ex_3564 => (($gt$gt$eq($instance_502))(gets_59))(s_3565 => sets_60(((CompilerState_3547(ex_3564))(s_3565.$1))(s_3565.$2)));
const moduleFile_8396 = m_8412 => m_8412.$1;
const typerPass_8409 = m_8468 => (($gt$gt$eq($instance_502))(getExports_3548))(es_8469 => {
  const $pat_66_2_8470 = (inferModule_2523(es_8469))(m_8468);
  let $phi$645;
  $phi$645 = $pat_66_2_8470.$1;
  const e_8471 = $phi$645;
  let $phi$646;
  $phi$646 = $pat_66_2_8470.$0;
  const typed_8472 = $phi$646;
  return (($gt$gt_21($instance_502))(setExports_3549(((set(moduleFile_8396(m_8468)))(e_8471))(es_8469))))((ret($instance_502))(typed_8472))
});
const JSUnOp_6141 = $_0_6169 => $_1_6170 => ({$0:$_0_6169,$1:$_1_6170,$tag:2});
const JSComment_6165 = $_0_6206 => ({$0:$_0_6206,$tag:9});
const RewriteState_6788 = $_0_6816 => $_1_6817 => $_2_6818 => $_3_6819 => ({$0:$_0_6816,$1:$_1_6817,$2:$_2_6818,$3:$_3_6819});
const withRep_6794 = rep_6851 => m_6852 => (($gt$gt$eq($instance_502))(gets_59))(s_6853 => (($gt$gt$eq($instance_502))((($gt$gt_21($instance_502))(sets_60((((RewriteState_6788(s_6853.$0))((((mergeTrie_74($instance_447))($instance_506))(s_6853.$1))(rep_6851)))(s_6853.$2))(s_6853.$3))))(m_6852)))(r_6858 => (($gt$gt$eq($instance_502))(gets_59))(s_6859 => (($gt$gt_21($instance_502))(sets_60((((RewriteState_6788(s_6859.$0))(s_6853.$1))(s_6859.$2))(s_6859.$3))))((ret($instance_502))(r_6858)))));
const ArgBool_6082 = $_0_6090 => $_1_6091 => ({$0:$_0_6090,$1:$_1_6091,$tag:0});
const optArg_8405 = (ArgBool_6082("opt"))(Just_1(false));
const builtinsPathArg_8402 = (ArgString_6083("builtins"))(Nothing_2);
const outPathArg_8403 = (ArgString_6083("out"))(Nothing_2);
const mainArg_8404 = (ArgString_6083("main"))(Nothing_2);
const argDefs_8406 = [builtinsPathArg_8402,outPathArg_8403,mainArg_8404,optArg_8405];
const maybeErr_618 = r_633 => {
  if(r_633.$tag==0){
    return Nothing_2
  } else if(r_633.$tag==1){
    return Just_1(r_633.$0)
  } else error("pattern match fail in //compiler/result.jg at line 20, column 14",r_633)
};
const argName_6085 = a_6097 => {
  if(a_6097.$tag==0){
    return a_6097.$0
  } else if(a_6097.$tag==1){
    return a_6097.$0
  } else error("pattern match fail in //compiler/args.jg at line 12, column 13",a_6097)
};
const parseArgs_6086 = defs_6102 => argv_6103 => {
  const parse_6104 = r_6105 => arg_6106 => {
    const $phi$653 = ((($eq$eq($instance_447))((getChar(0))(arg_6106)))("-"))&&((($eq$eq($instance_447))((getChar(1))(arg_6106)))("-"));
    if(!$phi$653){
      return (Pair_3((push(arg_6106))(r_6105.$0)))(r_6105.$1)
    } else if($phi$653){
      const name_6109 = (match("[^=]+"))((drop(2))(arg_6106));
      const value_6110 = (drop(1))((match("=.*"))(arg_6106));
      const $phi$655 = ((contains_33($instance_447))(name_6109))((map(argName_6085))(defs_6102));
      if(!$phi$655){
        return error("unrecognized argument "+arg_6106)
      } else if($phi$655){
        return (Pair_3(r_6105.$0))(((set(name_6109))(value_6110))(r_6105.$1))
      } else error("pattern match fail in //compiler/args.jg at line 23, column 12",$phi$655)
    } else error("pattern match fail in //compiler/args.jg at line 18, column 29",$phi$653)
  };
  const $phi$657 = ((foldl(parse_6104))((Pair_3([]))(empty)))(argv_6103);
  return ((ParsedArgs_6084($phi$657.$0))($phi$657.$1))(defs_6102)
};
const printIndent_6506 = indent_6592 => {
  if(0==indent_6592){
    return ""
  } else return "  "+(printIndent_6506(indent_6592-1))
};
const JSAssign_6163 = $_0_6201 => $_1_6202 => ({$0:$_0_6201,$1:$_1_6202,$tag:7});
const JSNum_6146 = $_0_6181 => ({$0:$_0_6181,$tag:7});
const paren_6507 = s_6594 => ("("+s_6594)+")";
const JSObject_6149 = $_0_6184 => ({$0:$_0_6184,$tag:10});
const JSLet_6160 = $_0_6197 => $_1_6198 => ({$0:$_0_6197,$1:$_1_6198,$tag:4});
const jsExprToString_6501 = indent_6508 => e_6509 => {
  const print_6510 = e_6512 => (jsExprToString_6501(indent_6508))(e_6512);
  const printParen_6511 = e_6513 => (jsExprToParenString_6502(indent_6508))(e_6513);
  if(e_6509.$tag==12){
    return "null"
  } else if(e_6509.$tag==13){
    return "undefined"
  } else if((e_6509.$tag==9)&&e_6509.$0){
    return "true"
  } else if((e_6509.$tag==9)&&(!e_6509.$0)){
    return "false"
  } else if(e_6509.$tag==7){
    return jsonStringify(e_6509.$0)
  } else if(e_6509.$tag==8){
    return jsonStringify(e_6509.$0)
  } else if(e_6509.$tag==0){
    return e_6509.$0
  } else if((e_6509.$tag==1)&&(e_6509.$1.$tag==8)){
    const $phi$668 = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))(e_6509.$1.$0);
    if(""==$phi$668){
      return (((printParen_6511(e_6509.$0))+"[")+e_6509.$1.$0)+"]"
    } else return ((printParen_6511(e_6509.$0))+".")+$phi$668
  } else if(e_6509.$tag==1){
    return (((printParen_6511(e_6509.$0))+"[")+(print_6510(e_6509.$1)))+"]"
  } else if(e_6509.$tag==2){
    return e_6509.$0+(printParen_6511(e_6509.$1))
  } else if(e_6509.$tag==3){
    return ((printParen_6511(e_6509.$1))+e_6509.$0)+(printParen_6511(e_6509.$2))
  } else if(e_6509.$tag==4){
    return (printParen_6511(e_6509.$0))+(paren_6507((intercalate(","))((map(print_6510))(e_6509.$1))))
  } else if(e_6509.$tag==15){
    return ("new "+(printParen_6511(e_6509.$0)))+(paren_6507((intercalate(","))((map(print_6510))(e_6509.$1))))
  } else if(e_6509.$tag==5){
    let $phi$660;
    const $phi$661 = length(e_6509.$0);
    if(1==$phi$661){
      $phi$660 = (((getIx(0))(e_6509.$0))+" => ")
    } else $phi$660 = (("("+((intercalate(","))(e_6509.$0)))+") => ");
    const params_6533 = $phi$660;
    const full_6535 = bs_6536 => (((((params_6533+"{\n")+(printIndent_6506(indent_6508+1)))+((intercalate(";\n"+(printIndent_6506(indent_6508+1))))((map(jsStmtToString_6504(indent_6508+1)))(bs_6536))))+"\n")+(printIndent_6506(indent_6508)))+"}";
    const $phi$663 = length(e_6509.$1);
    if(1==$phi$663){
      const $phi$665 = head_46(e_6509.$1);
      if($phi$665.$tag==1){
        if($phi$665.$0.$tag==10){
          return params_6533+(paren_6507(print_6510($phi$665.$0)))
        } else return params_6533+(print_6510($phi$665.$0))
      } else return full_6535(e_6509.$1)
    } else return full_6535(e_6509.$1)
  } else if(e_6509.$tag==6){
    return ((((printParen_6511(e_6509.$0))+"?")+(printParen_6511(e_6509.$1)))+":")+(printParen_6511(e_6509.$2))
  } else if(e_6509.$tag==10){
    return ("{"+((intercalate(","))((map(keyValueToString_6503(indent_6508)))(e_6509.$0))))+"}"
  } else if(e_6509.$tag==11){
    return ("["+((intercalate(","))((map(print_6510))(e_6509.$0))))+"]"
  } else if(e_6509.$tag==14){
    return ((printParen_6511(e_6509.$0))+" instanceof ")+(printParen_6511(e_6509.$1))
  } else if(e_6509.$tag==16){
    return (intercalate(","))((map(print_6510))(e_6509.$0))
  } else return error(e_6509)
};
const jsExprToParenString_6502 = indent_6551 => e_6552 => {
  if(e_6552.$tag==0){
    return (jsExprToString_6501(indent_6551))(e_6552)
  } else if(e_6552.$tag==7){
    return (jsExprToString_6501(indent_6551))(e_6552)
  } else if(e_6552.$tag==8){
    return (jsExprToString_6501(indent_6551))(e_6552)
  } else if(e_6552.$tag==9){
    return (jsExprToString_6501(indent_6551))(e_6552)
  } else if(e_6552.$tag==1){
    return (jsExprToString_6501(indent_6551))(e_6552)
  } else if(e_6552.$tag==15){
    return (jsExprToString_6501(indent_6551))(e_6552)
  } else if(e_6552.$tag==10){
    return (jsExprToString_6501(indent_6551))(e_6552)
  } else return paren_6507((jsExprToString_6501(indent_6551))(e_6552))
};
const keyValueToString_6503 = indent_6563 => kv_6564 => (kv_6564.$0+":")+((jsExprToString_6501(indent_6563))(kv_6564.$1));
const jsStmtToString_6504 = indent_6567 => s_6568 => {
  if(s_6568.$tag==9){
    return ("/* "+s_6568.$0)+"*/"
  } else if(s_6568.$tag==0){
    return (jsExprToString_6501(indent_6567))(s_6568.$0)
  } else if(s_6568.$tag==1){
    return "return "+((jsExprToString_6501(indent_6567))(s_6568.$0))
  } else if(s_6568.$tag==2){
    return (("var "+s_6568.$0)+" = ")+((jsExprToString_6501(indent_6567))(s_6568.$1))
  } else if(s_6568.$tag==3){
    return (("const "+s_6568.$0)+" = ")+((jsExprToString_6501(indent_6567))(s_6568.$1))
  } else if(s_6568.$tag==4){
    if(s_6568.$1.$tag==1){
      return "let "+s_6568.$0
    } else if(s_6568.$1.$tag==0){
      return (("let "+s_6568.$0)+" = ")+((jsExprToString_6501(indent_6567))(s_6568.$1.$0))
    } else error("pattern match fail in //compiler/js/printer.jg at line 66, column 16",s_6568.$1)
  } else if(s_6568.$tag==6){
    return "break"
  } else if(s_6568.$tag==5){
    return (((((("switch"+(paren_6507((jsExprToString_6501(indent_6567))(s_6568.$0))))+"{\n")+(printIndent_6506(indent_6567+1)))+((intercalate(";\n"+(printIndent_6506(indent_6567+1))))((map(caseToString_6505(indent_6567+1)))(s_6568.$1))))+"\n")+(printIndent_6506(indent_6567)))+"}"
  } else if(s_6568.$tag==7){
    return (((jsExprToParenString_6502(indent_6567))(s_6568.$0))+" = ")+((jsExprToParenString_6502(indent_6567))(s_6568.$1))
  } else if(s_6568.$tag==8){
    let $phi$672;
    const $phi$673 = length(s_6568.$2);
    if(1==$phi$673){
      $phi$672 = ((jsStmtToString_6504(indent_6567))((getIx(0))(s_6568.$2)))
    } else $phi$672 = ((((("{\n"+(printIndent_6506(indent_6567+1)))+((intercalate(";\n"+(printIndent_6506(indent_6567+1))))((map(jsStmtToString_6504(indent_6567+1)))(s_6568.$2))))+"\n")+(printIndent_6506(indent_6567)))+"}");
    const els_6586 = $phi$672;
    return ((((((("if("+((jsExprToString_6501(indent_6567))(s_6568.$0)))+"){\n")+(printIndent_6506(indent_6567+1)))+((intercalate(";\n"+(printIndent_6506(indent_6567+1))))((map(jsStmtToString_6504(indent_6567+1)))(s_6568.$1))))+"\n")+(printIndent_6506(indent_6567)))+"} else ")+els_6586
  } else error("pattern match fail in //compiler/js/printer.jg at line 60, column 27",s_6568)
};
const caseToString_6505 = indent_6588 => c_6589 => ((("case "+(paren_6507((jsExprToString_6501(indent_6588))(c_6589.$0))))+":\n")+(printIndent_6506(indent_6588+1)))+((intercalate(";\n"+(printIndent_6506(indent_6588+1))))((map(jsStmtToString_6504(indent_6588)))(c_6589.$1)));
const requireExpr_6804 = f_7079 => (JSCall_6143(JSRef_6139("_require")))([JSString_6147(f_7079)]);
const buildImports_6805 = f_7080 => ns_7081 => (map(n_7082 => (JSConst_6159(opName_6810(n_7082.$1)))((JSIndex_6140(requireExpr_6804(f_7080)))(JSString_6147(opName_6810(n_7082.$0))))))(ns_7081);
const importToJs_6806 = i_7085 => {
  if(i_7085.$tag==1){
    return (buildImports_6805(i_7085.$1))(i_7085.$2)
  } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 155, column 16",i_7085)
};
const exportObject_6808 = bs_7091 => {
  const f_7092 = b_7093 => {
    const $phi$680 = (((getAnn_809($instance_447))($instance_506))("export"))(annOf_828(b_7093.$1));
    if($phi$680.$tag==1){
      return Nothing_2
    } else if(($phi$680.$tag==0)&&($phi$680.$0.$tag==5)){
      return Just_1((Pair_3(opName_6810($phi$680.$0.$0)))(JSRef_6139(opName_6810(b_7093.$0))))
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 163, column 17",$phi$680)
  };
  return JSObject_6149((mapJust_45(f_7092))(bs_7091))
};
const safeLast_6813 = xs_7158 => {
  const $phi$682 = length(xs_7158);
  if(0==$phi$682){
    return Nothing_2
  } else return Just_1(last_48(xs_7158))
};
const directReturn_6815 = v_7186 => s_7187 => {
  if(s_7187.$tag==4){
    const $phi$689 = (($eq$eq($instance_447))(v_7186))(s_7187.$0);
    if(!$phi$689){
      return [s_7187]
    } else if($phi$689){
      if(s_7187.$1.$tag==1){
        return []
      } else if(s_7187.$1.$tag==0){
        return error("unexpected let assignment")
      } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 258, column 13",s_7187.$1)
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 256, column 16",$phi$689)
  } else if(s_7187.$tag==3){
    const $phi$687 = (($eq$eq($instance_447))(v_7186))(s_7187.$0);
    if(!$phi$687){
      return [s_7187]
    } else if($phi$687){
      return [JSReturn_6157(s_7187.$1)]
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 261, column 18",$phi$687)
  } else if((s_7187.$tag==7)&&(s_7187.$0.$tag==0)){
    const $phi$685 = (($eq$eq($instance_447))(v_7186))(s_7187.$0.$0);
    if(!$phi$685){
      return [s_7187]
    } else if($phi$685){
      return [JSReturn_6157(s_7187.$1)]
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 264, column 27",$phi$685)
  } else if(s_7187.$tag==8){
    return [((JSIf_6164(s_7187.$0))((((concatMap_44($instance_452))($instance_450))(directReturn_6815(v_7186)))(s_7187.$1)))((((concatMap_44($instance_452))($instance_450))(directReturn_6815(v_7186)))(s_7187.$2))]
  } else return [s_7187]
};
const optExpr_6812 = e_7130 => {
  if(e_7130.$tag==0){
    return e_7130
  } else if(e_7130.$tag==1){
    return (JSIndex_6140(optExpr_6812(e_7130.$0)))(optExpr_6812(e_7130.$1))
  } else if(e_7130.$tag==2){
    return (JSUnOp_6141(e_7130.$0))(optExpr_6812(e_7130.$1))
  } else if(e_7130.$tag==3){
    return ((JSBinOp_6142(e_7130.$0))(optExpr_6812(e_7130.$1)))(optExpr_6812(e_7130.$2))
  } else if(e_7130.$tag==4){
    return (JSCall_6143(optExpr_6812(e_7130.$0)))((map(optExpr_6812))(e_7130.$1))
  } else if(e_7130.$tag==5){
    return (JSFun_6144(e_7130.$0))(optStmts_6814(e_7130.$1))
  } else if(e_7130.$tag==6){
    return ((JSTernary_6145(optExpr_6812(e_7130.$0)))(optExpr_6812(e_7130.$1)))(optExpr_6812(e_7130.$2))
  } else if(e_7130.$tag==7){
    return e_7130
  } else if(e_7130.$tag==8){
    return e_7130
  } else if(e_7130.$tag==9){
    return e_7130
  } else if(e_7130.$tag==12){
    return e_7130
  } else if(e_7130.$tag==13){
    return e_7130
  } else if(e_7130.$tag==10){
    return JSObject_6149((map(kv_7150 => (Pair_3(kv_7150.$0))(optExpr_6812(kv_7150.$1))))(e_7130.$0))
  } else if(e_7130.$tag==11){
    return JSArray_6150((map(optExpr_6812))(e_7130.$0))
  } else if(e_7130.$tag==14){
    return (JSInstanceOf_6153(optExpr_6812(e_7130.$0)))(optExpr_6812(e_7130.$1))
  } else if(e_7130.$tag==15){
    return (JSNew_6154(optExpr_6812(e_7130.$0)))((map(optExpr_6812))(e_7130.$1))
  } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 210, column 13",e_7130)
};
const optStmts_6814 = ss_7160 => {
  const hasLet_7162 = v_7178 => {
    const f_7179 = s_7180 => {
      if(s_7180.$tag==4){
        return (($eq$eq($instance_447))(v_7178))(s_7180.$0)
      } else return false
    };
    return (exists_37(f_7179))(ss_7160)
  };
  const f_7161 = s_7163 => {
    if(s_7163.$tag==0){
      return JSExpr_6156(optExpr_6812(s_7163.$0))
    } else if(s_7163.$tag==2){
      return (JSVar_6158(s_7163.$0))(optExpr_6812(s_7163.$1))
    } else if(s_7163.$tag==3){
      return (JSConst_6159(s_7163.$0))(optExpr_6812(s_7163.$1))
    } else if(s_7163.$tag==4){
      return (JSLet_6160(s_7163.$0))(((fmap($instance_457))(optExpr_6812))(s_7163.$1))
    } else if(s_7163.$tag==7){
      return (JSAssign_6163(optExpr_6812(s_7163.$0)))(optExpr_6812(s_7163.$1))
    } else if(s_7163.$tag==8){
      return ((JSIf_6164(optExpr_6812(s_7163.$0)))(optStmts_6814(s_7163.$1)))(optStmts_6814(s_7163.$2))
    } else if(s_7163.$tag==1){
      return JSReturn_6157(optExpr_6812(s_7163.$0))
    } else if(s_7163.$tag==9){
      return s_7163
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 233, column 9",s_7163)
  };
  const $phi$696 = safeLast_6813(ss_7160);
  if(($phi$696.$tag==0)&&(($phi$696.$0.$tag==1)&&($phi$696.$0.$0.$tag==0))){
    const $phi$698 = hasLet_7162($phi$696.$0.$0.$0);
    if($phi$698){
      return optStmts_6814((((concatMap_44($instance_452))($instance_450))(directReturn_6815($phi$696.$0.$0.$0)))(init_49(ss_7160)))
    } else if(!$phi$698){
      return (map(f_7161))(ss_7160)
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 250, column 34",$phi$698)
  } else return (map(f_7161))(ss_7160)
};
const getCons_6796 = (($gt$gt$eq($instance_502))(gets_59))(s_6870 => (ret($instance_502))(s_6870.$0));
const processPattern_6803 = cons_7047 => pm_7048 => p_7049 => {
  if((p_7049.$tag==0)&&("_"==p_7049.$1)){
    return (Pair_3(JSBool_6148(true)))((Pair_3([]))([]))
  } else if(p_7049.$tag==0){
    return (Pair_3(JSBool_6148(true)))((Pair_3([opName_6810(p_7049.$1)]))([pm_7048]))
  } else if((p_7049.$tag==1)&&(p_7049.$1.$tag==0)){
    return (Pair_3(((JSBinOp_6142("=="))(JSNum_6146(p_7049.$1.$0)))(pm_7048)))((Pair_3([]))([]))
  } else if((p_7049.$tag==1)&&(p_7049.$1.$tag==1)){
    return (Pair_3(((JSBinOp_6142("=="))(JSString_6147(p_7049.$1.$0)))(pm_7048)))((Pair_3([]))([]))
  } else if((p_7049.$tag==2)&&("True"==p_7049.$1)){
    return (Pair_3(pm_7048))((Pair_3([]))([]))
  } else if((p_7049.$tag==2)&&("False"==p_7049.$1)){
    return (Pair_3((JSUnOp_6141("!"))(pm_7048)))((Pair_3([]))([]))
  } else if(p_7049.$tag==2){
    let $phi$701;
    const $phi$702 = (((lookup_66($instance_447))($instance_506))(p_7049.$1))(cons_7047);
    if(($phi$702.$tag==0)&&($phi$702.$0.$tag==1)){
      $phi$701 = (JSBool_6148(true))
    } else if(($phi$702.$tag==0)&&($phi$702.$0.$tag==0)){
      $phi$701 = (((JSBinOp_6142("=="))((JSIndex_6140(pm_7048))(JSString_6147("$tag"))))(JSNum_6146($phi$702.$0.$0)))
    } else $phi$701 = (error((("unknown data type in code gen: "+p_7049.$1)+" ")+((justOr_24("?"))(((fmap($instance_457))(printCodeLoc_818))(getAnnCodeLoc_816(p_7049.$0))))));
    const tagCheck_7064 = $phi$701;
    return ((foldl(a_7067 => b_7068 => (Pair_3((combineChecks_6802(a_7067.$0))(b_7068.$0)))((Pair_3((concat(a_7067.$1.$0))(b_7068.$1.$0)))((concat(a_7067.$1.$1))(b_7068.$1.$1)))))((Pair_3(tagCheck_7064))((Pair_3([]))([]))))((map(p_7075 => ((processPattern_6803(cons_7047))((JSIndex_6140(pm_7048))(JSString_6147("$"+(intToString(p_7075.$0))))))(p_7075.$1)))(zipWithIndex_42(p_7049.$2)))
  } else return error("failure to match pattern during processing")
};
const addStmt_6790 = stmt_6825 => (($gt$gt$eq($instance_502))(gets_59))(s_6826 => sets_60((((RewriteState_6788(s_6826.$0))(s_6826.$1))((push(stmt_6825))(s_6826.$2)))(s_6826.$3)));
const addConst_6791 = n_6831 => e_6832 => addStmt_6790((JSConst_6159(opName_6810(n_6831)))(e_6832));
const getRep_6795 = n_6864 => (($gt$gt$eq($instance_502))(gets_59))(s_6865 => (ret($instance_502))((((lookup_66($instance_447))($instance_506))(n_6864))(s_6865.$1)));
const dataConFieldIds_6807 = ts_7089 => (map(p_7090 => "$"+(intToString(fst_27(p_7090)))))(zipWithIndex_42(ts_7089));
const newPhi_6792 = (($gt$gt$eq($instance_502))(gets_59))(s_6833 => (($gt$gt_21($instance_502))(sets_60((((RewriteState_6788(s_6833.$0))(s_6833.$1))(s_6833.$2))(s_6833.$3+1))))((ret($instance_502))("$phi$"+(intToString(s_6833.$3)))));
const binOp2_6789 = op_6820 => a_6821 => b_6822 => (($gt$gt$eq($instance_502))(rewriteExpr_6797(a_6821)))(a_6823 => (($gt$gt$eq($instance_502))(rewriteExpr_6797(b_6822)))(b_6824 => (ret($instance_502))(((JSBinOp_6142(op_6820))(a_6823))(b_6824))));
const rewriteExprToStmts_6793 = w_6838 => e_6839 => (($gt$gt$eq($instance_502))(gets_59))(s_6840 => (($gt$gt$eq($instance_502))((($gt$gt_21($instance_502))(sets_60((((RewriteState_6788(s_6840.$0))(s_6840.$1))([]))(s_6840.$3))))(rewriteExpr_6797(e_6839))))(e_6845 => (($gt$gt$eq($instance_502))(gets_59))(s_6846 => (($gt$gt_21($instance_502))(sets_60((((RewriteState_6788(s_6846.$0))(s_6846.$1))(s_6840.$2))(s_6846.$3))))((ret($instance_502))((push(w_6838(e_6845)))(s_6846.$2))))));
const rewriteExpr_6797 = e_6875 => {
  if((e_6875.$tag==0)&&("True"==e_6875.$1)){
    return (ret($instance_502))(JSBool_6148(true))
  } else if((e_6875.$tag==0)&&("False"==e_6875.$1)){
    return (ret($instance_502))(JSBool_6148(false))
  } else if(e_6875.$tag==0){
    return (($gt$gt$eq($instance_502))(getRep_6795(opName_6810(e_6875.$1))))(r_6880 => {
      if(r_6880.$tag==1){
        return (ret($instance_502))(JSRef_6139(opName_6810(e_6875.$1)))
      } else if(r_6880.$tag==0){
        return (ret($instance_502))(r_6880.$0)
      } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 41, column 42",r_6880)
    })
  } else if((e_6875.$tag==1)&&(e_6875.$1.$tag==0)){
    return (ret($instance_502))(JSNum_6146(e_6875.$1.$0))
  } else if((e_6875.$tag==1)&&(e_6875.$1.$tag==1)){
    return (ret($instance_502))(JSString_6147(e_6875.$1.$0))
  } else if((e_6875.$tag==2)&&((e_6875.$1.$tag==2)&&((e_6875.$1.$1.$tag==0)&&("+"==e_6875.$1.$1.$1)))){
    return ((binOp2_6789("+"))(e_6875.$1.$2))(e_6875.$2)
  } else if((e_6875.$tag==2)&&((e_6875.$1.$tag==2)&&((e_6875.$1.$1.$tag==0)&&("-"==e_6875.$1.$1.$1)))){
    return ((binOp2_6789("-"))(e_6875.$1.$2))(e_6875.$2)
  } else if((e_6875.$tag==2)&&((e_6875.$1.$tag==2)&&((e_6875.$1.$1.$tag==0)&&("*"==e_6875.$1.$1.$1)))){
    return ((binOp2_6789("*"))(e_6875.$1.$2))(e_6875.$2)
  } else if((e_6875.$tag==2)&&((e_6875.$1.$tag==2)&&((e_6875.$1.$1.$tag==0)&&("++"==e_6875.$1.$1.$1)))){
    return ((binOp2_6789("+"))(e_6875.$1.$2))(e_6875.$2)
  } else if((e_6875.$tag==2)&&((e_6875.$1.$tag==2)&&((e_6875.$1.$1.$tag==0)&&("&&"==e_6875.$1.$1.$1)))){
    return ((binOp2_6789("&&"))(e_6875.$1.$2))(e_6875.$2)
  } else if((e_6875.$tag==2)&&((e_6875.$1.$tag==2)&&((e_6875.$1.$1.$tag==0)&&("||"==e_6875.$1.$1.$1)))){
    return ((binOp2_6789("||"))(e_6875.$1.$2))(e_6875.$2)
  } else if((e_6875.$tag==2)&&((e_6875.$1.$tag==2)&&((e_6875.$1.$1.$tag==0)&&("jsLt"==e_6875.$1.$1.$1)))){
    return ((binOp2_6789("<"))(e_6875.$1.$2))(e_6875.$2)
  } else if((e_6875.$tag==2)&&((e_6875.$1.$tag==2)&&((e_6875.$1.$1.$tag==0)&&("jsEq"==e_6875.$1.$1.$1)))){
    return ((binOp2_6789("==="))(e_6875.$1.$2))(e_6875.$2)
  } else if((e_6875.$tag==2)&&((e_6875.$1.$tag==2)&&((e_6875.$1.$1.$tag==0)&&("bitAnd"==e_6875.$1.$1.$1)))){
    return ((binOp2_6789("&"))(e_6875.$1.$2))(e_6875.$2)
  } else if((e_6875.$tag==2)&&((e_6875.$1.$tag==2)&&((e_6875.$1.$1.$tag==0)&&("bitOr"==e_6875.$1.$1.$1)))){
    return ((binOp2_6789("|"))(e_6875.$1.$2))(e_6875.$2)
  } else if((e_6875.$tag==2)&&((e_6875.$1.$tag==2)&&((e_6875.$1.$1.$tag==0)&&("bitShiftLeft"==e_6875.$1.$1.$1)))){
    return ((binOp2_6789("<<"))(e_6875.$1.$2))(e_6875.$2)
  } else if((e_6875.$tag==2)&&((e_6875.$1.$tag==2)&&((e_6875.$1.$1.$tag==0)&&("bitShiftRight"==e_6875.$1.$1.$1)))){
    return ((binOp2_6789(">>>"))(e_6875.$1.$2))(e_6875.$2)
  } else if(e_6875.$tag==2){
    return (($gt$gt$eq($instance_502))(rewriteExpr_6797(e_6875.$1)))(f_6949 => (($gt$gt$eq($instance_502))(rewriteExpr_6797(e_6875.$2)))(a_6950 => (ret($instance_502))((JSCall_6143(f_6949))([a_6950]))))
  } else if(e_6875.$tag==3){
    return (($gt$gt$eq($instance_502))((rewriteExprToStmts_6793(JSReturn_6157))(e_6875.$2)))(stmts_6954 => (ret($instance_502))((JSFun_6144([e_6875.$1]))(stmts_6954)))
  } else if(e_6875.$tag==4){
    const matchFailMsg_6958 = "pattern match fail "+(exprLoc_819(e_6875));
    return (($gt$gt$eq($instance_502))(newPhi_6792))(phiOut_6959 => (($gt$gt$eq($instance_502))((($gt$gt_21($instance_502))(addStmt_6790((JSLet_6160(phiOut_6959))(Nothing_2))))(rewriteExpr_6797(e_6875.$1))))(ie_6960 => {
      let $phi$725;
      if(ie_6960.$tag==0){
        $phi$725 = ((ret($instance_502))(ie_6960))
      } else if(ie_6960.$tag==1){
        $phi$725 = ((ret($instance_502))(ie_6960))
      } else $phi$725 = ((($gt$gt$eq($instance_502))(newPhi_6792))(p_6965 => (($gt$gt_21($instance_502))((addConst_6791(p_6965))(ie_6960)))((ret($instance_502))(JSRef_6139(p_6965)))));
      return (($gt$gt$eq($instance_502))($phi$725))(phiIn_6966 => (($gt$gt_21($instance_502))((($gt$gt$eq($instance_502))((((foldM_56($instance_502))((assemblePatternMatch2_6800(phiIn_6966))(phiOut_6959)))([JSExpr_6156((JSCall_6143(JSRef_6139("error")))([JSString_6147(matchFailMsg_6958),phiIn_6966]))]))(reverse_52(e_6875.$2))))((mapM_57($instance_502))(addStmt_6790))))((ret($instance_502))(JSRef_6139(phiOut_6959))))
    }))
  } else if(e_6875.$tag==5){
    return (($gt$gt_21($instance_502))(((mapM_57($instance_502))(d_6970 => (($gt$gt$eq($instance_502))(rewriteExpr_6797(d_6970.$1)))(addConst_6791(d_6970.$0))))(e_6875.$1)))(rewriteExpr_6797(e_6875.$2))
  } else if((e_6875.$tag==6)&&("@closure"==e_6875.$1)){
    const $phi$721 = length(e_6875.$2);
    if(2==$phi$721){
      const $phi$723 = (getIx(0))(e_6875.$2);
      if(($phi$723.$tag==1)&&($phi$723.$1.$tag==0)){
        return (mkClosure_6798($phi$723.$1.$0))((getIx(1))(e_6875.$2))
      } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 73, column 10",$phi$723)
    } else return error("invalid @closure")
  } else if((e_6875.$tag==6)&&("@bind"==e_6875.$1)){
    const $phi$719 = last_48(e_6875.$2);
    if($phi$719.$tag==0){
      return (mkBind_6799(init_49(e_6875.$2)))($phi$719.$1)
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 76, column 23",$phi$719)
  } else if((e_6875.$tag==6)&&("Array"==e_6875.$1)){
    return (($gt$gt$eq($instance_502))(((mapM_57($instance_502))(rewriteExpr_6797))(e_6875.$2)))(es_6984 => (ret($instance_502))(JSArray_6150(es_6984)))
  } else if((e_6875.$tag==6)&&("@Rec"==e_6875.$1)){
    const unpack_6987 = es_6988 => {
      const f_6989 = $pat_6990 => e_6993 => {
        if($pat_6990.$1.$tag==0){
          return (Pair_3((push((Pair_3($pat_6990.$1.$0))(e_6993)))($pat_6990.$0)))(Nothing_2)
        } else if($pat_6990.$1.$tag==1){
          if((e_6993.$tag==1)&&(e_6993.$1.$tag==1)){
            return (Pair_3($pat_6990.$0))(Just_1(e_6993.$1.$0))
          } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 83, column 20",e_6993)
        } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 81, column 22",$pat_6990.$1)
      };
      return fst_27(((foldl(f_6989))((Pair_3([]))(Nothing_2)))(es_6988))
    };
    return (($gt$gt$eq($instance_502))(((mapM_57($instance_502))($pat_6997 => (($gt$gt$eq($instance_502))(rewriteExpr_6797($pat_6997.$1)))(e_7000 => (ret($instance_502))((Pair_3($pat_6997.$0))(e_7000)))))(unpack_6987(e_6875.$2))))(kvs_7001 => (ret($instance_502))(JSObject_6149(kvs_7001)))
  } else if(e_6875.$tag==6){
    return (($gt$gt$eq($instance_502))(((mapM_57($instance_502))(rewriteExpr_6797))(e_6875.$2)))(es_7005 => (($gt$gt$eq($instance_502))(getCons_6796))(cons_7006 => {
      const $phi$713 = (((lookup_66($instance_447))($instance_506))(e_6875.$1))(cons_7006);
      if($phi$713.$tag==1){
        return error("unrecognized tag in New: "+e_6875.$1)
      } else if(($phi$713.$tag==0)&&($phi$713.$0.$tag==1)){
        return (ret($instance_502))(JSObject_6149((zip_43(dataConFieldIds_6807(es_7005)))(es_7005)))
      } else if(($phi$713.$tag==0)&&($phi$713.$0.$tag==0)){
        return (ret($instance_502))(JSObject_6149((push((Pair_3("$tag"))(JSNum_6146($phi$713.$0.$0))))((zip_43(dataConFieldIds_6807(es_7005)))(es_7005))))
      } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 86, column 71",$phi$713)
    }))
  } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 38, column 17",e_6875)
};
const mkClosure_6798 = n_7008 => e_7009 => {
  const gather_7010 = n_7011 => e_7012 => {
    if(e_7012.$tag==3){
      if(0==n_7011){
        return (Pair_3([e_7012.$1]))(e_7012.$2)
      } else {
        const $phi$730 = (gather_7010(n_7011-1))(e_7012.$2);
        return (Pair_3((enqueue(e_7012.$1))($phi$730.$0)))($phi$730.$1)
      }
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 92, column 16",e_7012)
  };
  const $phi$732 = (gather_7010(n_7008))(e_7009);
  return (($gt$gt$eq($instance_502))((rewriteExprToStmts_6793(JSReturn_6157))($phi$732.$1)))(stmts_7021 => (ret($instance_502))((JSFun_6144($phi$732.$0))(stmts_7021)))
};
const mkBind_6799 = args_7022 => f_7023 => (($gt$gt$eq($instance_502))(((mapM_57($instance_502))(rewriteExpr_6797))(args_7022)))(args_7024 => (ret($instance_502))((JSCall_6143((JSIndex_6140(JSRef_6139(f_7023)))(JSString_6147("bind"))))((enqueue(JSNull_6151))(args_7024))));
const assemblePatternMatch2_6800 = phiIn_7025 => phiOut_7026 => alts_7027 => p_7028 => (($gt$gt$eq($instance_502))(getCons_6796))(cons_7029 => {
  const $phi$735 = ((processPattern_6803(cons_7029))(phiIn_7025))(p_7028.$0);
  const rep_7035 = ((foldl(r_7037 => p_7038 => ((((insert_67($instance_447))($instance_506))(fst_27(p_7038)))(snd_28(p_7038)))(r_7037)))(Empty_11))((zip_43($phi$735.$1.$0))($phi$735.$1.$1));
  const out_7036 = local$instance$Monad$0 => stmts_7039 => {
    if(($phi$735.$0.$tag==9)&&$phi$735.$0.$0){
      return (ret(local$instance$Monad$0))(stmts_7039)
    } else return (ret(local$instance$Monad$0))([((JSIf_6164($phi$735.$0))(stmts_7039))(alts_7027)])
  };
  return (($gt$gt$eq($instance_502))((withRep_6794(rep_7035))((rewriteExprToStmts_6793(JSAssign_6163(JSRef_6139(phiOut_7026))))(p_7028.$1))))(out_7036($instance_502))
});
const moduleToJs_6809 = m_7097 => {
  const imports_7105 = (((concatMap_44($instance_452))($instance_450))(importToJs_6806))(m_7097.$2);
  const f_7117 = p_7118 => not_31(isJust_26((((getAnn_809($instance_447))($instance_506))("dead"))(annOf_828(p_7118.$1))));
  const vs2_7108 = (filter(f_7117))(m_7097.$6);
  const bindingToStmts_7109 = $pat_7121 => (rewriteExprToStmts_6793(JSConst_6159(opName_6810($pat_7121.$0))))($pat_7121.$1);
  const gatherCons_7106 = local$instance$Eq$1 => local$instance$Hashable$0 => m_7112 => d_7113 => {
    const $phi$742 = (((getAnn_809($instance_447))($instance_506))("data"))(annOf_828(d_7113.$1));
    if($phi$742.$tag==1){
      return m_7112
    } else if(($phi$742.$tag==0)&&($phi$742.$0.$tag==3)){
      return ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(d_7113.$0))($phi$742.$0.$0))(m_7112)
    } else error("pattern match fail in //compiler/js/jaguarToJs.jg at line 172, column 19",$phi$742)
  };
  const cons_7107 = ((foldl((gatherCons_7106($instance_447))($instance_506)))(Empty_11))(m_7097.$6);
  const defs_7110 = ($_16(foldl1(concat)))((evalState_62((((RewriteState_6788(cons_7107))(Empty_11))([]))(0)))(((mapM_57($instance_502))(bindingToStmts_7109))(vs2_7108)));
  const exportDef_7111 = (JSConst_6159("exports"))(exportObject_6808(vs2_7108));
  return optStmts_6814((push(exportDef_7111))((concat(imports_7105))(defs_7110)))
};
const rewriteDCE_6330 = e_6340 => {
  if(e_6340.$tag==1){
    return (JSIndex_6140(rewriteDCE_6330(e_6340.$0)))(rewriteDCE_6330(e_6340.$1))
  } else if(e_6340.$tag==3){
    return tryDCE_6329(((JSBinOp_6142(e_6340.$0))(rewriteDCE_6330(e_6340.$1)))(rewriteDCE_6330(e_6340.$2)))
  } else if(e_6340.$tag==4){
    return (JSCall_6143(rewriteDCE_6330(e_6340.$0)))((map(rewriteDCE_6330))(e_6340.$1))
  } else if(e_6340.$tag==5){
    return (JSFun_6144(e_6340.$0))((((concatMap_44($instance_452))($instance_450))(rewriteStmt_6331))(e_6340.$1))
  } else if(e_6340.$tag==6){
    return tryDCE_6329(((JSTernary_6145(rewriteDCE_6330(e_6340.$0)))(rewriteDCE_6330(e_6340.$1)))(rewriteDCE_6330(e_6340.$2)))
  } else if(e_6340.$tag==10){
    return JSObject_6149((map(kv_6354 => (Pair_3(kv_6354.$0))(rewriteDCE_6330(kv_6354.$1))))(e_6340.$0))
  } else if(e_6340.$tag==14){
    return (JSInstanceOf_6153(rewriteDCE_6330(e_6340.$0)))(rewriteDCE_6330(e_6340.$1))
  } else if(e_6340.$tag==15){
    return (JSNew_6154(rewriteDCE_6330(e_6340.$0)))((map(rewriteDCE_6330))(e_6340.$1))
  } else if(e_6340.$tag==11){
    return JSArray_6150((map(rewriteDCE_6330))(e_6340.$0))
  } else return e_6340
};
const rewriteStmt_6331 = s_6363 => {
  if(s_6363.$tag==0){
    return [JSExpr_6156(rewriteDCE_6330(s_6363.$0))]
  } else if(s_6363.$tag==1){
    return [JSReturn_6157(rewriteDCE_6330(s_6363.$0))]
  } else if(s_6363.$tag==2){
    return [(JSVar_6158(s_6363.$0))(rewriteDCE_6330(s_6363.$1))]
  } else if(s_6363.$tag==7){
    return [(JSAssign_6163(rewriteDCE_6330(s_6363.$0)))(rewriteDCE_6330(s_6363.$1))]
  } else if((s_6363.$tag==8)&&((s_6363.$0.$tag==9)&&s_6363.$0.$0)){
    return (((concatMap_44($instance_452))($instance_450))(rewriteStmt_6331))(s_6363.$1)
  } else if((s_6363.$tag==8)&&((s_6363.$0.$tag==9)&&(!s_6363.$0.$0))){
    return (((concatMap_44($instance_452))($instance_450))(rewriteStmt_6331))(s_6363.$2)
  } else if(s_6363.$tag==8){
    const $phi$747 = rewriteDCE_6330(s_6363.$0);
    if(($phi$747.$tag==9)&&$phi$747.$0){
      return (((concatMap_44($instance_452))($instance_450))(rewriteStmt_6331))(s_6363.$1)
    } else if(($phi$747.$tag==9)&&(!$phi$747.$0)){
      return (((concatMap_44($instance_452))($instance_450))(rewriteStmt_6331))(s_6363.$2)
    } else return [((JSIf_6164($phi$747))((((concatMap_44($instance_452))($instance_450))(rewriteStmt_6331))(s_6363.$1)))((((concatMap_44($instance_452))($instance_450))(rewriteStmt_6331))(s_6363.$2))]
  } else return [s_6363]
};
const compileModule_7298 = builtinsPath_7299 => m_7300 => {
  const js_7303 = (join_39((map(jsStmtToString_6504(0)))((((concatMap_44($instance_452))($instance_450))(rewriteStmt_6331))(moduleToJs_6809(m_7300)))))(";\n");
  const wrapModule_7304 = m_7307 => ("(function() {"+js_7303)+"\nmodule.exports = exports;})();";
  const fullBuiltins_7301 = readFile(builtinsPath_7299);
  const wrappedBuiltins_7302 = ("const $$builtins = (function() {\n const module = {};\n"+fullBuiltins_7301)+";\n return builtins})();\n";
  const requireFun_7305 = ("function _require(f) {\n"+"  return f == \"./builtins.js\" ? $$builtins : require(f);\n")+"}\n";
  return ((wrappedBuiltins_7302+requireFun_7305)+(wrapModule_7304(m_7300)))+"if (module.exports.main)module.exports.main(process.argv)"
};
const optBindings_4719 = env_4749 => bs_4750 => {
  const optCc_4752 = env_4754 => bs_4755 => {
    const optB_4756 = $pat_4757 => $pat_4760 => {
      const e2_4763 = (optExpr_4720($pat_4757.$1))($pat_4760.$1);
      if(e2_4763.$tag==0){
        return ($_16(debug2_87("** dropping "+$pat_4760.$0)))((Pair_3($pat_4757.$0))(((((insert_67($instance_447))($instance_506))($pat_4760.$0))(e2_4763))($pat_4757.$1)))
      } else if(e2_4763.$tag==1){
        return (Pair_3($pat_4757.$0))(((((insert_67($instance_447))($instance_506))($pat_4760.$0))(e2_4763))($pat_4757.$1))
      } else return (Pair_3((push((Pair_3($pat_4760.$0))(e2_4763)))($pat_4757.$0)))(((((insert_67($instance_447))($instance_506))($pat_4760.$0))(e2_4763))($pat_4757.$1))
    };
    return ((foldl(optB_4756))((Pair_3([]))(env_4754)))(bs_4755)
  };
  const f_4753 = $pat_4769 => bs_4772 => {
    const $pat_27_4_4773 = (optCc_4752($pat_4769.$1))(bs_4772);
    let $phi$752;
    $phi$752 = $pat_27_4_4773.$0;
    const bs2_4774 = $phi$752;
    let $phi$753;
    $phi$753 = $pat_27_4_4773.$1;
    const env2_4775 = $phi$753;
    return (Pair_3((concat($pat_4769.$0))(bs2_4774)))(env2_4775)
  };
  const scc_4751 = computeSCC_2499(bs_4750);
  return ((foldl(f_4753))((Pair_3([]))(env_4749)))(scc_4751)
};
const optExpr_4720 = env_4780 => e_4781 => {
  if(e_4781.$tag==0){
    const $phi$760 = (((lookup_66($instance_447))($instance_506))(e_4781.$1))(env_4780);
    if(($phi$760.$tag==0)&&($phi$760.$0.$tag==0)){
      return (Var_779(e_4781.$0))($phi$760.$0.$1)
    } else if(($phi$760.$tag==0)&&($phi$760.$0.$tag==1)){
      return (Const_780(e_4781.$0))($phi$760.$0.$1)
    } else return e_4781
  } else if(e_4781.$tag==2){
    return ((App_781(e_4781.$0))((optExpr_4720(env_4780))(e_4781.$1)))((optExpr_4720(env_4780))(e_4781.$2))
  } else if(e_4781.$tag==3){
    return ((Lam_782(e_4781.$0))(e_4781.$1))((optExpr_4720(env_4780))(e_4781.$2))
  } else if(e_4781.$tag==5){
    const $phi$758 = (optBindings_4719(env_4780))(e_4781.$1);
    return ((Let_784(e_4781.$0))($phi$758.$0))((optExpr_4720($phi$758.$1))(e_4781.$2))
  } else if(e_4781.$tag==4){
    return ((Case_783(e_4781.$0))((optExpr_4720(env_4780))(e_4781.$1)))((map(optPat_4721(env_4780)))(e_4781.$2))
  } else if(e_4781.$tag==1){
    return e_4781
  } else if(e_4781.$tag==6){
    const $phi$756 = (((lookup_66($instance_447))($instance_506))(e_4781.$1))(env_4780);
    if(($phi$756.$tag==0)&&($phi$756.$0.$tag==0)){
      return ((New_785(e_4781.$0))($phi$756.$0.$1))((map(optExpr_4720(env_4780)))(e_4781.$2))
    } else return ((New_785(e_4781.$0))(e_4781.$1))((map(optExpr_4720(env_4780)))(e_4781.$2))
  } else error("pattern match fail in //compiler/inliner.jg at line 32, column 17",e_4781)
};
const optPat_4721 = env_4811 => pe_4812 => {
  const f_4815 = p_4816 => {
    if(p_4816.$tag==2){
      const $phi$764 = (((lookup_66($instance_447))($instance_506))(p_4816.$1))(env_4811);
      if(($phi$764.$tag==0)&&($phi$764.$0.$tag==0)){
        return ((PData_790(p_4816.$0))($phi$764.$0.$1))((map(f_4815))(p_4816.$2))
      } else return ((PData_790(p_4816.$0))(p_4816.$1))((map(f_4815))(p_4816.$2))
    } else return p_4816
  };
  return (Pair_3(f_4815(pe_4812.$0)))((optExpr_4720(env_4811))(pe_4812.$1))
};
const inline_4718 = enable_4738 => m_4739 => (($gt$gt$eq($instance_502))(getUid_3550))(uid_4740 => {
  let $phi$766;
  if(enable_4738){
    $phi$766 = (fst_27((optBindings_4719(Empty_11))(m_4739.$6)))
  } else if(!enable_4738){
    $phi$766 = m_4739.$6
  } else error("pattern match fail in //compiler/inliner.jg at line 10, column 11",enable_4738);
  const obs_4748 = $phi$766;
  return (ret($instance_502))(((((((Module_791(m_4739.$0))(m_4739.$1))(m_4739.$2))(m_4739.$3))(m_4739.$4))(m_4739.$5))(obs_4748))
});
const getBool_6089 = p_6126 => def_6127 => {
  const $phi$769 = ((contains_33($instance_6138))(def_6127))(p_6126.$2);
  if(!$phi$769){
    return error("unrecognized arg that was not present for parsing")
  } else if($phi$769){
    if(def_6127.$tag==0){
      const $phi$772 = (has(def_6127.$0))(p_6126.$1);
      if(!$phi$772){
        if(def_6127.$1.$tag==0){
          return def_6127.$1.$0
        } else if(def_6127.$1.$tag==1){
          return error("no value for required arg "+def_6127.$0)
        } else error("pattern match fail in //compiler/args.jg at line 48, column 18",def_6127.$1)
      } else if($phi$772){
        const $phi$774 = (get(def_6127.$0))(p_6126.$1);
        if(""==$phi$774){
          return true
        } else if("True"==$phi$774){
          return true
        } else if("true"==$phi$774){
          return true
        } else if("1"==$phi$774){
          return true
        } else if("False"==$phi$774){
          return false
        } else if("false"==$phi$774){
          return false
        } else if("0"==$phi$774){
          return false
        } else return error("invalid value for a bool argument: "+$phi$774)
      } else error("pattern match fail in //compiler/args.jg at line 47, column 31",$phi$772)
    } else return error("arg is not a bool")
  } else error("pattern match fail in //compiler/args.jg at line 44, column 25",$phi$769)
};
const normalize_5418 = ms_5449 => freeVars_5450 => i_5451 => {
  if(i_5451.$tag==0){
    return error("closed imports not supported")
  } else if(i_5451.$tag==1){
    return i_5451
  } else if((i_5451.$tag==2)&&("./builtins.js"==i_5451.$1)){
    const $phi$782 = (get("./builtins.js"))(ms_5449);
    return ((ImportOpen_806(i_5451.$0))("./builtins.js"))((map(n_5462 => (Pair_3(n_5462))(n_5462)))(trieKeys_75($phi$782.$0)))
  } else if(i_5451.$tag==2){
    const $phi$778 = (has(i_5451.$1))(ms_5449);
    if($phi$778){
      const $phi$780 = (get(i_5451.$1))(ms_5449);
      return ((ImportOpen_806(i_5451.$0))(i_5451.$1))((map(n_5468 => (Pair_3(n_5468))(n_5468)))(trieKeys_75($phi$780.$0)))
    } else if(!$phi$778){
      return error((("no mod "+i_5451.$1)+" in ")+(jsonStringify(keys(ms_5449))))
    } else error("pattern match fail in //compiler/importNormalizer.jg at line 20, column 22",$phi$778)
  } else error("pattern match fail in //compiler/importNormalizer.jg at line 15, column 27",i_5451)
};
const normalizeImports_5417 = ms_5419 => m_5420 => {
  const topLevelNames_5431 = (concat((map(fst_27))(m_5420.$6)))((((concatMap_44($instance_452))($instance_450))(ni_5442 => (map(fst_27))(ni_5442.$1.$3)))(m_5420.$5));
  const getFromDefs_5428 = ds_5434 => ((foldl((setUnion_83($instance_447))($instance_506)))(Empty_11))((map(v_5435 => (freeVars_2497(Empty_11))(snd_28(v_5435))))(ds_5434));
  const freeVarsInIns_5430 = ((foldl((setUnion_83($instance_447))($instance_506)))(Empty_11))((map(ni_5436 => getFromDefs_5428(ni_5436.$1.$3)))(m_5420.$5));
  const freeVarsInDefs_5429 = getFromDefs_5428(m_5420.$6);
  const fvs_5432 = (filter(v_5448 => not_31(((contains_33($instance_447))(v_5448))(topLevelNames_5431))))(($_16(setToArray_84))((((setUnion_83($instance_447))($instance_506))(freeVarsInDefs_5429))(freeVarsInIns_5430)));
  const is2_5433 = (map((normalize_5418(ms_5419))(fvs_5432)))((enqueue((ImportAll_807(Empty_11))("./builtins.js")))(m_5420.$2));
  return ((((((Module_791(m_5420.$0))(m_5420.$1))(is2_5433))(m_5420.$3))(m_5420.$4))(m_5420.$5))(m_5420.$6)
};
const normalizeImportsPass_8408 = m_8466 => (($gt$gt$eq($instance_502))(getExports_3548))(es_8467 => (ret($instance_502))((normalizeImports_5417(es_8467))(m_8466)));
const findImports_8399 = m_8437 => {
  const importFileName_8438 = i_8439 => {
    if(i_8439.$tag==2){
      return i_8439.$1
    } else if(i_8439.$tag==1){
      return i_8439.$1
    } else if(i_8439.$tag==0){
      return i_8439.$1
    } else error("pattern match fail in //compiler/compiler.jg at line 39, column 22",i_8439)
  };
  return (map(importFileName_8438))(m_8437.$2)
};
const depSort_8398 = mainName_8428 => ms_8429 => {
  const modules_8430 = ((foldl(r_8433 => m_8434 => ((((insert_67($instance_447))($instance_506))(moduleFile_8396(m_8434)))(m_8434))(r_8433)))(Empty_11))(ms_8429);
  const imports_8431 = (mapTrie_71(__8435 => findImports_8399))(modules_8430);
  const ordered_8432 = ((((dfs_2207($instance_447))($instance_506))(imports_8431))([]))(mainName_8428);
  return ($_16(reverse_52))((map(n_8436 => ($_16(fromJust_25))((((lookup_66($instance_447))($instance_506))(n_8436))(modules_8430))))(ordered_8432))
};
const perModule_3552 = local$instance$Monad$0 => mapM_57(local$instance$Monad$0);
const liftPass_8407 = local$instance$Monad$0 => p_8464 => a_8465 => (ret(local$instance$Monad$0))(p_8464(a_8465));
const reportTimes_3556 = i_3595 => (($gt$gt$eq($instance_502))(gets_59))(s_3596 => {
  const report_3600 = i_3601 => n_3602 => ts_3603 => {
    const total_3605 = ((foldl($add))(0))(ts_3603);
    const count_3604 = length(ts_3603);
    const msg_3606 = ((((("# pass <"+n_3602)+"> executed ")+(intToString(count_3604)))+" times, total runtime ")+(intToString(total_3605)))+"ms";
    return (debug2_87(msg_3606))(i_3601)
  };
  return (ret($instance_502))(((foldTrie_70(report_3600))(i_3595))(s_3596.$2))
});
const parse_8397 = fn_8420 => {
  const $phi$790 = (parseModule_7932(readFile(fn_8420)))("//"+fn_8420);
  if($phi$790.$tag==0){
    const $phi$792 = (($eq$eq($instance_446))($phi$790.$1.$1))(length($phi$790.$1.$0));
    if($phi$792){
      return $phi$790.$0
    } else if(!$phi$792){
      return error((fn_8420+": failed to parse all tokens, stopped at ")+(jsonStringify((getIx($phi$790.$1.$1))($phi$790.$1.$0))))
    } else error("pattern match fail in //compiler/compiler.jg at line 25, column 43",$phi$792)
  } else if($phi$790.$tag==1){
    return error((fn_8420+": ")+$phi$790.$0)
  } else error("pattern match fail in //compiler/compiler.jg at line 24, column 12",$phi$790)
};
const timingEnd_3554 = n_3584 => (($gt$gt$eq($instance_502))(gets_59))(s_3585 => {
  const nts_3589 = (justOr_24([]))((((lookup_66($instance_447))($instance_506))(n_3584))(s_3585.$2));
  const start_3590 = last_48(nts_3589);
  return sets_60(((CompilerState_3547(s_3585.$0))(s_3585.$1))(((((insert_67($instance_447))($instance_506))(n_3584))((push((currentTimeMs(Unit_0))-start_3590))(init_49(nts_3589))))(s_3585.$2)))
});
const timingStart_3553 = n_3578 => (($gt$gt$eq($instance_502))(gets_59))(s_3579 => {
  const nts_3583 = (justOr_24([]))((((lookup_66($instance_447))($instance_506))(n_3578))(s_3579.$2));
  return sets_60(((CompilerState_3547(s_3579.$0))(s_3579.$1))(((((insert_67($instance_447))($instance_506))(n_3578))((push(currentTimeMs(Unit_0)))(nts_3583)))(s_3579.$2)))
});
const timed_3555 = n_3591 => p_3592 => i_3593 => (($gt$gt$eq($instance_502))((($gt$gt_21($instance_502))(timingStart_3553(n_3591)))(p_3592(i_3593))))(o_3594 => (($gt$gt_21($instance_502))(timingEnd_3554(n_3591)))((ret($instance_502))(o_3594)));
const rewriteData_4216 = d_4226 => {
  const dt_4231 = ((foldl(r_4233 => v_4234 => ((TApp_800(Empty_11))(r_4233))((TSkolem_799(Empty_11))(v_4234))))((TConst_797(Empty_11))(d_4226.$1)))(d_4226.$2);
  const rewriteCon_4232 = c_4235 => {
    let $phi$796;
    const $phi$797 = length(d_4226.$3);
    if(1==$phi$797){
      $phi$796 = Nothing_2
    } else $phi$796 = (Just_1(fst_27(c_4235)));
    const tag_4236 = $phi$796;
    const $phi$799 = snd_28(c_4235);
    return ((((mkConFun_4217(tag_4236))(dt_4231))(d_4226.$2))($phi$799.$1))($phi$799.$2)
  };
  return (map(rewriteCon_4232))(zipWithIndex_42(d_4226.$3))
};
const translateAdts_4215 = m_4218 => ((((((Module_791(m_4218.$0))(m_4218.$1))(m_4218.$2))([]))(m_4218.$4))(m_4218.$5))((concat((((concatMap_44($instance_452))($instance_450))(rewriteData_4216))(m_4218.$3)))(m_4218.$6));
const main_8411 = argv_8479 => {
  const args_8480 = (parseArgs_6086(argDefs_8406))((slice(2))(argv_8479));
  const srcFiles_8484 = getPositional_6087(args_8480);
  const builtinsPath_8481 = (getString_6088(args_8480))(builtinsPathArg_8402);
  const baseExports_8486 = ((set("./builtins.js"))(parseExports_8401(loadJSExports(builtinsPath_8481))))(empty);
  const opt_8485 = (getBool_6089(args_8480))(optArg_8405);
  const mainName_8483 = (getString_6088(args_8480))(mainArg_8404);
  const passes_8487 = (($gt$eq$gt_91($instance_502))((($gt$eq$gt_91($instance_502))((($gt$eq$gt_91($instance_502))((($gt$eq$gt_91($instance_502))((($gt$eq$gt_91($instance_502))((($gt$eq$gt_91($instance_502))((perModule_3552($instance_502))(($_16(timed_3555("parse")))((liftPass_8407($instance_502))(parse_8397)))))((timed_3555("dep-sort"))((liftPass_8407($instance_502))(depSort_8398(mainName_8483))))))((perModule_3552($instance_502))((($gt$eq$gt_91($instance_502))((($gt$eq$gt_91($instance_502))((($gt$eq$gt_91($instance_502))((($gt$eq$gt_91($instance_502))((timed_3555("translate-adts"))((liftPass_8407($instance_502))(translateAdts_4215))))((timed_3555("normalize-imports"))(normalizeImportsPass_8408))))((timed_3555("uniquify"))(uniquify_4433))))((timed_3555("typer"))(typerPass_8409))))((timed_3555("declasser"))(declasserPass_8410))))))((timed_3555("merge-modules"))((liftPass_8407($instance_502))(mergeModules_5201)))))((timed_3555("opt"))(inline_4718(opt_8485)))))((timed_3555("generate-js"))((liftPass_8407($instance_502))(compileModule_7298(builtinsPath_8481))))))(reportTimes_3556);
  const js_8488 = (evalState_62(((CompilerState_3547(baseExports_8486))(0))(Empty_11)))(passes_8487(srcFiles_8484));
  const outPath_8482 = (getString_6088(args_8480))(outPathArg_8403);
  return (writeFile(js_8488))(outPath_8482)
};
const $instance_7462 = $class$Functor(f_7455 => pa_7456 => Parser_7405(i_7458 => {
  const $phi$803 = pa_7456.$0(i_7458);
  if($phi$803.$tag==1){
    return Error_7404($phi$803.$0)
  } else if($phi$803.$tag==0){
    return (Success_7403(f_7455($phi$803.$0)))($phi$803.$1)
  } else error("pattern match fail in //compiler/parsers.jg at line 16, column 32",$phi$803)
}));
const mergeCount_4723 = local$instance$Eq$1 => local$instance$Hashable$0 => a_4826 => b_4827 => ((foldTrie_70(a_4828 => k_4829 => v_4830 => ((((insert_67(local$instance$Eq$1))(local$instance$Hashable$0))(k_4829))(v_4830+((justOr_24(0))((((lookup_66(local$instance$Eq$1))(local$instance$Hashable$0))(k_4829))(a_4828)))))(a_4828)))(a_4826))(b_4827);
const bindingP_8194 = ($lt$mul$mns$gt_7864((($lt$mul$gt($instance_7475))((pure($instance_7475))(Pair_3)))(nonReservedP_7871)))((($pip$gt_7407($instance_7475))(operatorP_7868("::")))(typeP_7908));
const scopeP_7936 = many_7409(bindingP_8194);
const parseScope_7937 = runParser_7861(scopeP_7936);
const patSize_4732 = p_4942 => {
  if(p_4942.$tag==0){
    return 1
  } else if(p_4942.$tag==1){
    return 1
  } else if(p_4942.$tag==2){
    return ((foldl(c_4950 => p_4951 => c_4950+(patSize_4732(p_4951))))(1))(p_4942.$2)
  } else error("pattern match fail in //compiler/inliner.jg at line 112, column 13",p_4942)
};
const exprSize_4731 = e_4914 => {
  if(e_4914.$tag==0){
    return 1
  } else if(e_4914.$tag==1){
    return 1
  } else if(e_4914.$tag==2){
    return (1+(exprSize_4731(e_4914.$1)))+(exprSize_4731(e_4914.$2))
  } else if(e_4914.$tag==3){
    return 1+(exprSize_4731(e_4914.$2))
  } else if(e_4914.$tag==4){
    return 1+(((foldl(c_4928 => p_4929 => (c_4928+(patSize_4732(p_4929.$0)))+(exprSize_4731(p_4929.$1))))(exprSize_4731(e_4914.$1)))(e_4914.$2))
  } else if(e_4914.$tag==5){
    return 1+(((foldl(c_4935 => b_4936 => c_4935+(exprSize_4731(snd_28(b_4936)))))(exprSize_4731(e_4914.$2)))(e_4914.$1))
  } else if(e_4914.$tag==6){
    return ((foldl(c_4940 => e_4941 => c_4940+(exprSize_4731(e_4941))))(1))(e_4914.$2)
  } else error("pattern match fail in //compiler/inliner.jg at line 103, column 14",e_4914)
};
const $instance_510 = $class$Functor(f_507 => $pat_508 => Identity_15(f_507($pat_508.$0)));
const $instance_515 = ($class$Applicative(x_511 => Identity_15(x_511)))($pat_512 => x_514 => ((fmap($instance_510))($pat_512.$0))(x_514));
const skolemsInType_2480 = t_2546 => {
  if(t_2546.$tag==0){
    return Empty_11
  } else if(t_2546.$tag==2){
    return (((setAdd_79($instance_447))($instance_506))(t_2546.$1))(Empty_11)
  } else if(t_2546.$tag==1){
    return Empty_11
  } else if(t_2546.$tag==3){
    return (((setUnion_83($instance_447))($instance_506))(skolemsInType_2480(t_2546.$1)))(skolemsInType_2480(t_2546.$2))
  } else if(t_2546.$tag==6){
    return skolemsInType_2480(t_2546.$3)
  } else return error("unsupported type in varsInType "+(jsonStringify(t_2546)))
};
const mapErr_620 = f_636 => r_637 => {
  if(r_637.$tag==0){
    return Ok_615(r_637.$0)
  } else if(r_637.$tag==1){
    return Err_616(f_636(r_637.$0))
  } else error("pattern match fail in //compiler/result.jg at line 26, column 14",r_637)
};
const $instance_519 = ($class$Monad(pure($instance_515)))($pat_516 => f_518 => f_518($pat_516.$0));
const TypeInstCtx_1749 = $_0_1768 => ({$0:$_0_1768,$tag:9});
const mapResult_627 = okF_663 => errF_664 => r_665 => {
  if(r_665.$tag==0){
    return okF_663(r_665.$0)
  } else if(r_665.$tag==1){
    return errF_664(r_665.$0)
  } else error("pattern match fail in //compiler/result.jg at line 45, column 24",r_665)
};
const annWithUseCount_4724 = e_4831 => {
  const dropCount_4832 = local$instance$Eq$1 => local$instance$Hashable$0 => n_4836 => c_4837 => (((remove_69(local$instance$Eq$1))(local$instance$Hashable$0))(n_4836))(c_4837);
  const countPat_4834 = c_4841 => p_4842 => {
    if(p_4842.$tag==0){
      return (((dropCount_4832($instance_447))($instance_506))(p_4842.$1))(c_4841)
    } else if(p_4842.$tag==2){
      return ((foldl(countPat_4834))(c_4841))(p_4842.$2)
    } else return c_4841
  };
  const countCase_4833 = pe_4838 => (countPat_4834(getCount_4722(pe_4838.$1)))(pe_4838.$0);
  const countExpr_4835 = e_4849 => {
    if(e_4849.$tag==0){
      return ((((insert_67($instance_447))($instance_506))(e_4849.$1))(1))(Empty_11)
    } else if(e_4849.$tag==2){
      return (((mergeCount_4723($instance_447))($instance_506))(getCount_4722(e_4849.$1)))(getCount_4722(e_4849.$2))
    } else if(e_4849.$tag==3){
      return (((dropCount_4832($instance_447))($instance_506))(e_4849.$1))(getCount_4722(e_4849.$2))
    } else if(e_4849.$tag==5){
      return ((foldl(c_4861 => n_4862 => (((dropCount_4832($instance_447))($instance_506))(n_4862))(c_4861)))(((foldl(c_4863 => e_4864 => (((mergeCount_4723($instance_447))($instance_506))(c_4863))(getCount_4722(e_4864))))(getCount_4722(e_4849.$2)))((map(snd_28))(e_4849.$1))))((map(fst_27))(e_4849.$1))
    } else if(e_4849.$tag==4){
      return ((foldl((mergeCount_4723($instance_447))($instance_506)))(getCount_4722(e_4849.$1)))((map(countCase_4833))(e_4849.$2))
    } else if(e_4849.$tag==1){
      return Empty_11
    } else if(e_4849.$tag==6){
      return ((foldl((mergeCount_4723($instance_447))($instance_506)))(Empty_11))((map(getCount_4722))(e_4849.$2))
    } else error("pattern match fail in //compiler/inliner.jg at line 67, column 17",e_4849)
  };
  return ((up_835(a_4873 => e_4874 => ($_16(Pair_3(a_4873)))((withAnn_829(((((setAnn_810($instance_447))($instance_506))("useCount"))(($_16(AnnUseCount_775))(countExpr_4835(e_4874))))(annOf_828(e_4874))))(e_4874))))(Unit_0))(e_4831)
};
const processImports_4729 = useCount_4900 => is_4901 => is_4901;
const $instance_462 = ($class$Applicative(x_458 => Just_1(x_458)))(f_459 => x_460 => {
  if(f_459.$tag==1){
    return Nothing_2
  } else if(f_459.$tag==0){
    return ((fmap($instance_457))(f_459.$0))(x_460)
  } else error("pattern match fail in //compiler/prelude.jg at line 74, column 15",f_459)
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
const loopPasses_4727 = local$instance$Monad$0 => n_4886 => p_4887 => bs_4888 => {
  if(0==n_4886){
    return (ret(local$instance$Monad$0))(bs_4888)
  } else return (($gt$gt$eq(local$instance$Monad$0))(p_4887(bs_4888)))(((loopPasses_4727(local$instance$Monad$0))(n_4886-1))(p_4887))
};
const splitLetsPass_4009 = local$instance$Monad$0 => m_4048 => (ret(local$instance$Monad$0))(m_4048);
const addRef_4004 = local$instance$Eq$1 => local$instance$Hashable$0 => n_4010 => (($gt$gt$eq($instance_502))(gets_59))(ns_4011 => sets_60((((setAdd_79(local$instance$Eq$1))(local$instance$Hashable$0))(n_4010))(ns_4011)));
const chooseForInlining_4733 = baseCount_4952 => bs_4953 => {
  const useCount_4954 = ((foldl((mergeCount_4723($instance_447))($instance_506)))(baseCount_4952))((map(b_4956 => getCount_4722(snd_28(b_4956))))(bs_4953));
  const f_4955 = r_4957 => b_4958 => {
    if(b_4958.$1.$tag==0){
      return ((((insert_67($instance_447))($instance_506))(b_4958.$0))(b_4958.$1))(r_4957)
    } else if(b_4958.$1.$tag==1){
      return ((((insert_67($instance_447))($instance_506))(b_4958.$0))(b_4958.$1))(r_4957)
    } else if(b_4958.$1.$tag==3){
      const $phi$825 = ((($lt($instance_448))(exprSize_4731(b_4958.$1)))(10))||((($eq$eq($instance_446))(1))((justOr_24(0))((((lookup_66($instance_447))($instance_506))(b_4958.$0))(useCount_4954))));
      if(!$phi$825){
        return r_4957
      } else if($phi$825){
        return ((((insert_67($instance_447))($instance_506))(b_4958.$0))(b_4958.$1))(r_4957)
      } else error("pattern match fail in //compiler/inliner.jg at line 123, column 20",$phi$825)
    } else if(b_4958.$1.$tag==6){
      const $phi$823 = (($eq$eq($instance_446))(1))((justOr_24(0))((((lookup_66($instance_447))($instance_506))(b_4958.$0))(useCount_4954)));
      if(!$phi$823){
        return r_4957
      } else if($phi$823){
        return ((((insert_67($instance_447))($instance_506))(b_4958.$0))(b_4958.$1))(r_4957)
      } else error("pattern match fail in //compiler/inliner.jg at line 126, column 20",$phi$823)
    } else return r_4957
  };
  return ((foldl(f_4955))(Empty_11))(bs_4953)
};
const inlineCode_4735 = always_4986 => e_4987 => {
  const inlinePat_4990 = p_5014 => {
    if(p_5014.$tag==2){
      const $phi$828 = (((lookup_66($instance_447))($instance_506))(p_5014.$1))(always_4986);
      if(($phi$828.$tag==0)&&($phi$828.$0.$tag==0)){
        return ((PData_790(p_5014.$0))($phi$828.$0.$1))((map(inlinePat_4990))(p_5014.$2))
      } else return ((PData_790(p_5014.$0))(p_5014.$1))((map(inlinePat_4990))(p_5014.$2))
    } else return p_5014
  };
  const withAnnCopy_4988 = ann_4991 => e_4992 => (withAnn_829((((mergeTrie_74($instance_447))($instance_506))((((remove_69($instance_447))($instance_506))("export"))(annOf_828(e_4992))))((((copyAnn_811($instance_447))($instance_506))(["export"]))(ann_4991))))(e_4992);
  const inlineExpr_4989 = e_4993 => {
    if(e_4993.$tag==0){
      const $phi$834 = (((lookup_66($instance_447))($instance_506))(e_4993.$1))(always_4986);
      if($phi$834.$tag==1){
        return (ret($instance_502))(Left_8(e_4993))
      } else if($phi$834.$tag==0){
        return ((fmap($instance_482))(e_4997 => Left_8((withAnnCopy_4988(e_4993.$0))(e_4997))))((rewriteExpr_4428(Empty_11))($phi$834.$0))
      } else error("pattern match fail in //compiler/inliner.jg at line 145, column 18",$phi$834)
    } else if(e_4993.$tag==5){
      const always2_5001 = (((mergeTrie_74($instance_447))($instance_506))(always_4986))((chooseForInlining_4733(getCount_4722(e_4993.$2)))(e_4993.$1));
      return (($gt$gt$eq($instance_502))(((mapBindingsM_4726($instance_502))(n_5002 => e_5003 => (inlineCode_4735((((remove_69($instance_447))($instance_506))(n_5002))(always2_5001)))(e_5003)))(e_4993.$1)))(bs_5004 => (($gt$gt$eq($instance_502))((inlineCode_4735(always2_5001))(e_4993.$2)))(e_5005 => {
        const $phi$832 = length(bs_5004);
        if(0==$phi$832){
          return (ret($instance_502))(Right_9((withAnnCopy_4988(e_4993.$0))(e_5005)))
        } else return (ret($instance_502))(Right_9(((Let_784(e_4993.$0))(bs_5004))(e_5005)))
      }))
    } else if(e_4993.$tag==4){
      return (ret($instance_502))(Left_8(((Case_783(e_4993.$0))(e_4993.$1))((map(p_5010 => (Pair_3(inlinePat_4990(p_5010.$0)))(p_5010.$1)))(e_4993.$2))))
    } else return (ret($instance_502))(Left_8(e_4993))
  };
  return ((breakableDownM_842($instance_502))(inlineExpr_4989))(e_4987)
};
const mapBindings_4725 = f_4875 => bs_4876 => (map(b_4877 => (Pair_3(b_4877.$0))(f_4875(b_4877.$1))))(bs_4876);
const isExport_4736 = e_5022 => isJust_26((((getAnn_809($instance_447))($instance_506))("export"))(annOf_828(e_5022)));
const dropDeadBindings_4737 = useCount_5023 => bs_5024 => {
  const f_5025 = b_5026 => {
    const recursiveCount_5030 = (justOr_24(0))((((lookup_66($instance_447))($instance_506))(b_5026.$0))(getCount_4722(b_5026.$1)));
    const totalCount_5029 = (justOr_24(0))((((lookup_66($instance_447))($instance_506))(b_5026.$0))(useCount_5023));
    const keep_5031 = (isExport_4736(b_5026.$1))||((($gt_18($instance_448))(totalCount_5029-recursiveCount_5030))(0));
    if(keep_5031){
      return Just_1((Pair_3(b_5026.$0))(b_5026.$1))
    } else if(!keep_5031){
      const ann_5032 = annOf_828(b_5026.$1);
      const $phi$839 = (((getAnn_809($instance_447))($instance_506))("data"))(ann_5032);
      if($phi$839.$tag==1){
        return (debug2_87("** dropping "+b_5026.$0))(Nothing_2)
      } else if($phi$839.$tag==0){
        return Just_1((Pair_3(b_5026.$0))((withAnn_829(((((setAnn_810($instance_447))($instance_506))("dead"))(AnnTag_777))(ann_5032)))(b_5026.$1)))
      } else error("pattern match fail in //compiler/inliner.jg at line 177, column 39",$phi$839)
    } else error("pattern match fail in //compiler/inliner.jg at line 175, column 10",keep_5031)
  };
  return (mapJust_45(f_5025))(bs_5024)
};
const deadCode_4730 = e_4902 => {
  const f_4903 = e_4904 => {
    if(e_4904.$tag==5){
      const useCount_4908 = ((foldl((mergeCount_4723($instance_447))($instance_506)))(getCount_4722(e_4904.$2)))((map(b_4910 => getCount_4722(snd_28(b_4910))))(e_4904.$1));
      const bs2_4909 = (dropDeadBindings_4737(useCount_4908))(e_4904.$1);
      return ((Let_784(e_4904.$0))(bs2_4909))(e_4904.$2)
    } else return e_4904
  };
  return snd_28(((down_836(a_4912 => e_4913 => (Pair_3(a_4912))(f_4903(e_4913))))(Unit_0))(e_4902))
};
const pass_4728 = bs_4890 => {
  const bs2_4891 = (mapBindings_4725(e_4895 => ($_16(snd_28))(annWithUseCount_4724(e_4895))))(bs_4890);
  const useCount_4892 = ((foldl((mergeCount_4723($instance_447))($instance_506)))(Empty_11))((map(b_4896 => getCount_4722(snd_28(b_4896))))(bs2_4891));
  const bs3_4893 = (mapBindings_4725(deadCode_4730))((dropDeadBindings_4737(useCount_4892))(bs2_4891));
  const always_4894 = (chooseForInlining_4733(Empty_11))(bs3_4893);
  return (($gt$gt$eq($instance_502))(((mapBindingsM_4726($instance_502))(n_4897 => e_4898 => (inlineCode_4735((((remove_69($instance_447))($instance_506))(n_4897))(always_4894)))(e_4898)))(bs3_4893)))(bs_4899 => (ret($instance_502))((mapBindings_4725(betaReduction_4734))(bs_4899)))
};
const delRef_4005 = local$instance$Eq$1 => local$instance$Hashable$0 => n_4012 => (($gt$gt$eq($instance_502))(gets_59))(ns_4013 => sets_60((((setRemove_81(local$instance$Eq$1))(local$instance$Hashable$0))(n_4012))(ns_4013)));
const splitExpr_4007 = e_4014 => {
  const handleLet_4017 = e_4037 => {
    if(e_4037.$tag==5){
      return (($gt$gt$eq($instance_502))(splitExpr_4007(e_4037.$2)))(e_4041 => (($gt$gt$eq($instance_502))(splitBindings_4008(e_4037.$1)))(gbs_4042 => {
        const l_4043 = ((foldr(e_4044 => bs_4045 => ((Let_784(Empty_11))(bs_4045))(e_4044)))(e_4041))(gbs_4042);
        return (ret($instance_502))(Right_9((withAnn_829(e_4037.$0))(l_4043)))
      }))
    } else return (ret($instance_502))(Left_8(e_4037))
  };
  const splitPat_4016 = p_4029 => {
    if(p_4029.$tag==1){
      return (ret($instance_502))(Unit_0)
    } else if(p_4029.$tag==0){
      return ((delRef_4005($instance_447))($instance_506))(p_4029.$1)
    } else if(p_4029.$tag==2){
      return (($gt$gt_21($instance_502))(((mapM_57($instance_502))(splitPat_4016))(p_4029.$2)))(((addRef_4004($instance_447))($instance_506))(p_4029.$1))
    } else error("pattern match fail in //compiler/let_splitter.jg at line 15, column 16",p_4029)
  };
  const split_4015 = e_4018 => {
    if(e_4018.$tag==0){
      return (($gt$gt_21($instance_502))(((addRef_4004($instance_447))($instance_506))(e_4018.$1)))((ret($instance_502))(e_4018))
    } else if(e_4018.$tag==4){
      return (($gt$gt_21($instance_502))(((mapM_57($instance_502))(p_4024 => splitPat_4016(fst_27(p_4024))))(e_4018.$2)))((ret($instance_502))(e_4018))
    } else if(e_4018.$tag==3){
      return (($gt$gt_21($instance_502))(((delRef_4005($instance_447))($instance_506))(e_4018.$1)))((ret($instance_502))(e_4018))
    } else return (ret($instance_502))(e_4018)
  };
  return (((breakableDownAndUpM_838($instance_502))(handleLet_4017))(split_4015))(e_4014)
};
const parseExpr_7934 = runParser_7861(exprP_7881);
const exports = {declasserPass:declasserPass_8410,parseT:parseT_8400,parseExports:parseExports_8401,moduleFile:moduleFile_8396,typerPass:typerPass_8409,optArg:optArg_8405,builtinsPathArg:builtinsPathArg_8402,outPathArg:outPathArg_8403,mainArg:mainArg_8404,argDefs:argDefs_8406,normalizeImportsPass:normalizeImportsPass_8408,findImports:findImports_8399,depSort:depSort_8398,liftPass:liftPass_8407,parse:parse_8397,main:main_8411}
module.exports = exports;})();if (module.exports.main)module.exports.main(process.argv)