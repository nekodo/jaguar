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
const reverse_50 = (foldl(xs_226 => x_227 => (enqueue(x_227))(xs_226)))([]);
const Pair_3 = $_0_89 => $_1_90 => ({$0:$_0_89,$1:$_1_90});
const snd_27 = p_145 => p_145.$1;
const fst_26 = p_142 => p_142.$0;
const Leaf_12 = $_0_112 => $_1_113 => ({$0:$_0_112,$1:$_1_113,$tag:1});
const Empty_11 = {$tag:0};
const Collision_13 = $_0_114 => ({$0:$_0_114,$tag:2});
const BitmapIndexed_14 = $_0_115 => $_1_116 => ({$0:$_0_115,$1:$_1_116,$tag:3});
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
const $class$Eq = $_0 => ({$0:$_0});
const $eq$eq = x_$class$Eq => x_$class$Eq.$0;
const $class$Hashable = $_0 => ({$0:$_0});
const hashCode = x_$class$Hashable => x_$class$Hashable.$0;
const hamtMask_61 = depth_264 => hash_265 => {
  const h_266 = (hash_265>>>(depth_264*5))&31;
  return 1<<h_266
};
const popCount_60 = n_258 => {
  const n2_259 = n_258-((n_258>>>1)&1431655765);
  const n3_260 = (n2_259&858993459)+((n2_259>>>2)&858993459);
  const n4_261 = (n3_260+(n3_260>>>4))&252645135;
  const n5_262 = n4_261+(n4_261>>>8);
  const n6_263 = n5_262+(n5_262>>>16);
  return n6_263&127
};
const hamtIndex_62 = bitmap_267 => mask_268 => popCount_60(bitmap_267&(mask_268-1));
const not_30 = b_162 => {
  if(b_162){
    return false
  } else if(!b_162){
    return true
  } else error("pattern match fail",b_162)
};
const $div$eq_17 = local$instance$Eq$0 => a_120 => b_121 => not_30((($eq$eq(local$instance$Eq$0))(a_120))(b_121));
const remove_66 = local$instance$Hashable$1 => local$instance$Eq$0 => k_307 => t_308 => {
  const hash_309 = (hashCode(local$instance$Hashable$1))(k_307);
  const f_310 = depth_311 => t_312 => {
    if(t_312.$tag==0){
      return Empty_11
    } else if(t_312.$tag==1){
      const $phi$19 = (($eq$eq(local$instance$Eq$0))(t_312.$0))(k_307);
      if($phi$19){
        return Empty_11
      } else if(!$phi$19){
        return t_312
      } else error("pattern match fail",$phi$19)
    } else if(t_312.$tag==2){
      const entries2_316 = (filter(e_317 => (($div$eq_17(local$instance$Eq$0))(fst_26(e_317)))(k_307)))(t_312.$0);
      const $phi$15 = length(entries2_316);
      if(0==$phi$15){
        return Empty_11
      } else if(1==$phi$15){
        const $phi$17 = (getIx(0))(entries2_316);
        return (Leaf_12($phi$17.$0))($phi$17.$1)
      } else return Collision_13(entries2_316)
    } else if(t_312.$tag==3){
      const m_323 = (hamtMask_61(depth_311))(hash_309);
      const ix_324 = (hamtIndex_62(t_312.$0))(m_323);
      const $phi$8 = m_323&t_312.$0;
      if(0==$phi$8){
        return t_312
      } else {
        const $phi$10 = (f_310(depth_311+1))((getIx(ix_324))(t_312.$1));
        if($phi$10.$tag==0){
          const bitmap2_326 = (bitNot(m_323))&t_312.$0;
          const $phi$12 = length(t_312.$1);
          if(1==$phi$12){
            return Empty_11
          } else if(2==$phi$12){
            const e_327 = (getIx(1&(bitNot(ix_324))))(t_312.$1);
            if(e_327.$tag==1){
              return e_327
            } else return (BitmapIndexed_14(bitmap2_326))([e_327])
          } else return (BitmapIndexed_14(bitmap2_326))(((arrDel(ix_324))(1))(t_312.$1))
        } else return (BitmapIndexed_14(t_312.$0))(((setIx(ix_324))($phi$10))(t_312.$1))
      }
    } else error("pattern match fail",t_312)
  };
  return (f_310(0))(t_308)
};
const setDiff_81 = local$instance$Hashable$1 => local$instance$Eq$0 => a_383 => b_384 => ((foldTrie_67(r_385 => k_386 => __387 => (((remove_66(local$instance$Hashable$1))(local$instance$Eq$0))(k_386))(r_385)))(a_383))(b_384);
const $_16 = f_118 => a_119 => f_118(a_119);
const DataCon_741 = $_0_834 => $_1_835 => $_2_836 => ({$0:$_0_834,$1:$_1_835,$2:$_2_836});
const TForall_751 = $_0_860 => $_1_861 => $_2_862 => $_3_863 => ({$0:$_0_860,$1:$_1_861,$2:$_2_862,$3:$_3_863,$tag:6});
const $class$Functor = $_0 => ({$0:$_0});
const fmap = x_$class$Functor => x_$class$Functor.$0;
const Nothing_2 = {$tag:1};
const Just_1 = $_0_88 => ({$0:$_0_88,$tag:0});
const $instance_416 = $class$Functor(f_413 => m_414 => {
  if(m_414.$tag==0){
    return Just_1(f_413(m_414.$0))
  } else if(m_414.$tag==1){
    return Nothing_2
  } else error("pattern match fail",m_414)
});
const TCBound_744 = $_0_845 => $_1_846 => $_2_847 => ({$0:$_0_845,$1:$_1_846,$2:$_2_847});
const TVar_746 = $_0_850 => $_1_851 => ({$0:$_0_850,$1:$_1_851,$tag:1});
const TRow_749 = $_0_857 => $_1_858 => $_2_859 => ({$0:$_0_857,$1:$_1_858,$2:$_2_859,$tag:4});
const TApp_748 = $_0_854 => $_1_855 => $_2_856 => ({$0:$_0_854,$1:$_1_855,$2:$_2_856,$tag:3});
const exists_36 = f_193 => xs_194 => ((foldl(r_195 => x_196 => (f_193(x_196))||r_195))(false))(xs_194);
const $instance_410 = $class$Eq(jsEq);
const TUnknown_752 = {$tag:7};
const TSkolem_747 = $_0_852 => $_1_853 => ({$0:$_0_852,$1:$_1_853,$tag:2});
const TConst_745 = $_0_848 => $_1_849 => ({$0:$_0_848,$1:$_1_849,$tag:0});
const TBot_750 = {$tag:5};
const tail_45 = slice(1);
const head_44 = getIx(0);
const $instance_409 = $class$Eq(jsEq);
const zip_41 = xs_209 => ys_210 => {
  const $phi$23 = ((($eq$eq($instance_409))(length(xs_209)))(0))||((($eq$eq($instance_409))(length(ys_210)))(0));
  if($phi$23){
    return []
  } else if(!$phi$23){
    return (enqueue((Pair_3(head_44(xs_209)))(head_44(ys_210))))((zip_41(tail_45(xs_209)))(tail_45(ys_210)))
  } else error("pattern match fail",$phi$23)
};
const all_37 = f_197 => xs_198 => ((foldl(r_199 => x_200 => (f_197(x_200))&&r_199))(true))(xs_198);
const equivBound_767 = a_906 => b_907 => ((($eq$eq($instance_410))(a_906.$1))(b_907.$1))&&((equivType_768(a_906.$2))(b_907.$2));
const equivType_768 = a_914 => b_915 => {
  if(a_914.$tag==0){
    if(b_915.$tag==0){
      return (($eq$eq($instance_410))(a_914.$1))(b_915.$1)
    } else return false
  } else if(a_914.$tag==1){
    if(b_915.$tag==1){
      return (($eq$eq($instance_410))(a_914.$1))(b_915.$1)
    } else return false
  } else if(a_914.$tag==2){
    if(b_915.$tag==2){
      return (($eq$eq($instance_410))(a_914.$1))(b_915.$1)
    } else return false
  } else if(a_914.$tag==3){
    if(b_915.$tag==3){
      return ((equivType_768(a_914.$1))(b_915.$1))&&((equivType_768(a_914.$2))(b_915.$2))
    } else return false
  } else if(a_914.$tag==5){
    if(b_915.$tag==5){
      return true
    } else return false
  } else if(a_914.$tag==7){
    if(b_915.$tag==7){
      return true
    } else return false
  } else if(a_914.$tag==4){
    return error("no support for TRow in equivType yet")
  } else if(a_914.$tag==6){
    if(b_915.$tag==6){
      const rbs_952 = (all_37(p_954 => (equivBound_767(fst_26(p_954)))(snd_27(p_954))))((zip_41(a_914.$2))(b_915.$2));
      const rvs_951 = (all_37(p_953 => (($eq$eq($instance_410))(fst_26(p_953)))(snd_27(p_953))))((zip_41(a_914.$1))(b_915.$1));
      return (rvs_951&&rbs_952)&&((equivType_768(a_914.$3))(b_915.$3))
    } else return false
  } else error("pattern match fail",a_914)
};
const mkTForall_1605 = ann_1825 => vs_1826 => bs_1827 => t_1828 => {
  const f_1829 = bs_1830 => b_1831 => {
    const $phi$35 = (exists_36(equivBound_767(b_1831)))(bs_1830);
    if($phi$35){
      return bs_1830
    } else if(!$phi$35){
      return (push(b_1831))(bs_1830)
    } else error("pattern match fail",$phi$35)
  };
  return (((TForall_751(ann_1825))(vs_1826))(((foldl(f_1829))([]))(bs_1827)))(t_1828)
};
const $instance_465 = $class$Hashable(s_464 => strHashCode(s_464));
const Subs_1573 = $_0_1635 => $_1_1636 => ({$0:$_0_1635,$1:$_1_1636});
const $class$Ord = $_0 => ({$0:$_0});
const $lt = x_$class$Ord => x_$class$Ord.$0;
const $instance_411 = $class$Ord(jsLt);
const find_33 = predicate_182 => xs_183 => {
  const f_184 = i_185 => {
    const $phi$38 = (($lt($instance_411))(i_185))(length(xs_183));
    if(!$phi$38){
      return Nothing_2
    } else if($phi$38){
      const $phi$40 = predicate_182((getIx(i_185))(xs_183));
      if($phi$40){
        return Just_1((getIx(i_185))(xs_183))
      } else if(!$phi$40){
        return f_184(i_185+1)
      } else error("pattern match fail",$phi$40)
    } else error("pattern match fail",$phi$38)
  };
  return f_184(0)
};
const lookup_63 = local$instance$Hashable$1 => local$instance$Eq$0 => k_269 => t_270 => {
  const hash_271 = (hashCode(local$instance$Hashable$1))(k_269);
  const f_272 = depth_273 => t_274 => {
    if(t_274.$tag==0){
      return Nothing_2
    } else if(t_274.$tag==1){
      const $phi$45 = (($eq$eq(local$instance$Eq$0))(k_269))(t_274.$0);
      if(!$phi$45){
        return Nothing_2
      } else if($phi$45){
        return Just_1(t_274.$1)
      } else error("pattern match fail",$phi$45)
    } else if(t_274.$tag==2){
      return ($_16((fmap($instance_416))(snd_27)))((find_33(e_278 => (($eq$eq(local$instance$Eq$0))(fst_26(e_278)))(k_269)))(t_274.$0))
    } else if(t_274.$tag==3){
      const m_281 = (hamtMask_61(depth_273))(hash_271);
      const $phi$43 = m_281&t_274.$0;
      if(0==$phi$43){
        return Nothing_2
      } else return (f_272(depth_273+1))((getIx((hamtIndex_62(t_274.$0))(m_281)))(t_274.$1))
    } else error("pattern match fail",t_274)
  };
  return (f_272(0))(t_270)
};
const $class$Alternative = $_0 => $_1 => ({$0:$_0,$1:$_1});
const $lt$pip$gt = x_$class$Alternative => x_$class$Alternative.$1;
const $instance_425 = ($class$Alternative(Nothing_2))(a_422 => b_423 => {
  if(a_422.$tag==1){
    return b_423
  } else return a_422
});
const getSub_1576 = v_1644 => subs_1645 => (($lt$pip$gt($instance_425))((((lookup_63($instance_465))($instance_410))(v_1644))(subs_1645.$0)))((((lookup_63($instance_465))($instance_410))(v_1644))(subs_1645.$1));
const dropSubs_1581 = vs_1694 => subs_1695 => (Subs_1573(((foldl(r_1698 => v_1699 => (((remove_66($instance_465))($instance_410))(v_1699))(r_1698)))(subs_1695.$0))(vs_1694)))(((foldl(r_1700 => v_1701 => (((remove_66($instance_465))($instance_410))(v_1701))(r_1700)))(subs_1695.$1))(vs_1694));
const applySubs_1609 = subs_1890 => t_1891 => {
  if(t_1891.$tag==6){
    const subs2_1896 = (dropSubs_1581(t_1891.$1))(subs_1890);
    return (((mkTForall_1605(t_1891.$0))(t_1891.$1))((map(applySubsBound_1610(subs2_1896)))(t_1891.$2)))((applySubs_1609(subs2_1896))(t_1891.$3))
  } else if(t_1891.$tag==1){
    const $phi$53 = (getSub_1576(t_1891.$1))(subs_1890);
    if($phi$53.$tag==1){
      return t_1891
    } else if($phi$53.$tag==0){
      return $phi$53.$0
    } else error("pattern match fail",$phi$53)
  } else if(t_1891.$tag==3){
    return ((TApp_748(t_1891.$0))((applySubs_1609(subs_1890))(t_1891.$1)))((applySubs_1609(subs_1890))(t_1891.$2))
  } else if(t_1891.$tag==4){
    return ((TRow_749(t_1891.$0))((map(m_1906 => (Pair_3((applySubs_1609(subs_1890))(m_1906.$0)))((applySubs_1609(subs_1890))(m_1906.$1))))(t_1891.$1)))(((fmap($instance_416))(applySubs_1609(subs_1890)))(t_1891.$2))
  } else return t_1891
};
const applySubsBound_1610 = subs_1910 => b_1911 => ((TCBound_744(b_1911.$0))(b_1911.$1))((applySubs_1609(subs_1910))(b_1911.$2));
const emptySubs_1577 = (Subs_1573(Empty_11))(Empty_11);
const isJust_25 = m_140 => {
  if(m_140.$tag==0){
    return true
  } else if(m_140.$tag==1){
    return false
  } else error("pattern match fail",m_140)
};
const setContains_78 = local$instance$Hashable$1 => local$instance$Eq$0 => a_378 => s_379 => isJust_25((((lookup_63(local$instance$Hashable$1))(local$instance$Eq$0))(a_378))(s_379));
const printType_1285 = t_1291 => {
  const printParen_1292 = t_1296 => ("("+(printType_1285(t_1296)))+")";
  const printFirstTypeInApp_1294 = t_1308 => {
    if((t_1308.$tag==3)&&((t_1308.$1.$tag==3)&&((t_1308.$1.$1.$tag==0)&&("->"==t_1308.$1.$1.$1)))){
      return printParen_1292(t_1308)
    } else if(t_1308.$tag==6){
      return printParen_1292(t_1308)
    } else return printType_1285(t_1308)
  };
  const printSecondTypeInApp_1295 = t_1319 => {
    if(t_1319.$tag==3){
      return printParen_1292(t_1319)
    } else if(t_1319.$tag==6){
      return printParen_1292(t_1319)
    } else return printType_1285(t_1319)
  };
  const printTypeInFun_1293 = t_1297 => {
    if((t_1297.$tag==3)&&((t_1297.$1.$tag==3)&&((t_1297.$1.$1.$tag==0)&&("->"==t_1297.$1.$1.$1)))){
      return printParen_1292(t_1297)
    } else if(t_1297.$tag==6){
      return printParen_1292(t_1297)
    } else return printType_1285(t_1297)
  };
  if(t_1291.$tag==0){
    return t_1291.$1
  } else if(t_1291.$tag==1){
    return t_1291.$1
  } else if(t_1291.$tag==2){
    return "~"+t_1291.$1
  } else if(t_1291.$tag==5){
    return "~bottom~"
  } else if(t_1291.$tag==7){
    return "?"
  } else if((t_1291.$tag==3)&&((t_1291.$1.$tag==3)&&((t_1291.$1.$1.$tag==0)&&("->"==t_1291.$1.$1.$1)))){
    return ((printTypeInFun_1293(t_1291.$1.$2))+" -> ")+(printType_1285(t_1291.$2))
  } else if(t_1291.$tag==3){
    return ((printFirstTypeInApp_1294(t_1291.$1))+" ")+(printSecondTypeInApp_1295(t_1291.$2))
  } else if(t_1291.$tag==6){
    let $phi$60;
    const $phi$61 = length(t_1291.$2);
    if(0==$phi$61){
      $phi$60 = ""
    } else $phi$60 = (" with "+((intercalate(", "))((map(printTypeBound_1286))(t_1291.$2))));
    const bounds_1346 = $phi$60;
    return ((("forall "+((intercalate(", "))(t_1291.$1)))+bounds_1346)+". ")+(printType_1285(t_1291.$3))
  } else return error("cannot print "+(jsonStringify(t_1291)))
};
const printTypeBound_1286 = b_1349 => (((b_1349.$1+" ")+"(")+(printType_1285(b_1349.$2)))+")";
const mapIx_34 = f_186 => ix_187 => xs_188 => ((setIx(ix_187))(f_186((getIx(ix_187))(xs_188))))(xs_188);
const insert_64 = local$instance$Hashable$1 => local$instance$Eq$0 => k_283 => v_284 => t_285 => {
  const hash_286 = (hashCode(local$instance$Hashable$1))(k_283);
  const f_287 = depth_288 => t_289 => {
    if(t_289.$tag==0){
      return (Leaf_12(k_283))(v_284)
    } else if(t_289.$tag==2){
      return Collision_13((push((Pair_3(k_283))(v_284)))((filter(e_291 => (($div$eq_17(local$instance$Eq$0))(fst_26(e_291)))(k_283)))(t_289.$0)))
    } else if(t_289.$tag==1){
      const $phi$67 = (($eq$eq(local$instance$Eq$0))(k_283))(t_289.$0);
      if($phi$67){
        return (Leaf_12(k_283))(v_284)
      } else if(!$phi$67){
        if(7==depth_288){
          return Collision_13([(Pair_3(t_289.$0))(t_289.$1),(Pair_3(k_283))(v_284)])
        } else {
          const m_295 = (hamtMask_61(depth_288))((hashCode(local$instance$Hashable$1))(t_289.$0));
          return (f_287(depth_288))((BitmapIndexed_14(m_295))([(Leaf_12(t_289.$0))(t_289.$1)]))
        }
      } else error("pattern match fail",$phi$67)
    } else if(t_289.$tag==3){
      const m_298 = (hamtMask_61(depth_288))(hash_286);
      const bitmap2_299 = m_298|t_289.$0;
      const ix_300 = (hamtIndex_62(bitmap2_299))(m_298);
      const $phi$65 = m_298&t_289.$0;
      if(0==$phi$65){
        return (BitmapIndexed_14(bitmap2_299))(((arrIns(ix_300))((Leaf_12(k_283))(v_284)))(t_289.$1))
      } else return (BitmapIndexed_14(bitmap2_299))(((mapIx_34(f_287(depth_288+1)))(ix_300))(t_289.$1))
    } else error("pattern match fail",t_289)
  };
  return (f_287(0))(t_285)
};
const mergeTrie_71 = local$instance$Hashable$1 => local$instance$Eq$0 => a_359 => b_360 => ((foldTrie_67(a_361 => k_362 => v_363 => ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(k_362))(v_363))(a_361)))(a_359))(b_360);
const setUnion_79 = local$instance$Hashable$1 => local$instance$Eq$0 => (mergeTrie_71(local$instance$Hashable$1))(local$instance$Eq$0);
const setRemove_77 = local$instance$Hashable$1 => local$instance$Eq$0 => (remove_66(local$instance$Hashable$1))(local$instance$Eq$0);
const Unit_0 = {};
const setAdd_75 = local$instance$Hashable$1 => local$instance$Eq$0 => a_372 => s_373 => ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(a_372))(Unit_0))(s_373);
const justOr_23 = d_135 => m_136 => {
  if(m_136.$tag==0){
    return m_136.$0
  } else if(m_136.$tag==1){
    return d_135
  } else error("pattern match fail",m_136)
};
const freeTVars_1603 = t_1803 => {
  if(t_1803.$tag==1){
    return (((setAdd_75($instance_465))($instance_410))(t_1803.$1))(Empty_11)
  } else if(t_1803.$tag==5){
    return Empty_11
  } else if(t_1803.$tag==7){
    return Empty_11
  } else if(t_1803.$tag==0){
    return Empty_11
  } else if(t_1803.$tag==2){
    return Empty_11
  } else if(t_1803.$tag==6){
    return ((foldl(s_1814 => v_1815 => (((setRemove_77($instance_465))($instance_410))(v_1815))(s_1814)))(((foldl((setUnion_79($instance_465))($instance_410)))(freeTVars_1603(t_1803.$3)))((map(freeTVarsInBound_1613))(t_1803.$2))))(t_1803.$1)
  } else if(t_1803.$tag==3){
    return (((setUnion_79($instance_465))($instance_410))(freeTVars_1603(t_1803.$1)))(freeTVars_1603(t_1803.$2))
  } else if(t_1803.$tag==4){
    return ((foldl((setUnion_79($instance_465))($instance_410)))(($_16(justOr_23(Empty_11)))(((fmap($instance_416))(freeTVars_1603))(t_1803.$2))))((map(m_1822 => (((setUnion_79($instance_465))($instance_410))(freeTVars_1603(fst_26(m_1822))))(freeTVars_1603(snd_27(m_1822)))))(t_1803.$1))
  } else error("pattern match fail",t_1803)
};
const freeTVarsInBound_1613 = b_1972 => freeTVars_1603(b_1972.$2);
const isEmpty_70 = t_357 => {
  if(t_357.$tag==0){
    return true
  } else return false
};
const composeSubs_1578 = ef_1648 => sa_1649 => sb_1650 => ((foldTrie_67(r_1653 => v_1654 => t_1655 => (((addSub_1579(ef_1648))(v_1654))(t_1655))(r_1653)))(((foldTrie_67(r_1656 => v_1657 => t_1658 => (((addSatSub_1580(ef_1648))(v_1657))(t_1658))(r_1656)))(sa_1649))(sb_1650.$0)))(sb_1650.$1);
const addSub_1579 = ef_1659 => v_1660 => t_1661 => subs_1662 => {
  const t2_1663 = (applySubs_1609(subs_1662))(t_1661);
  const $phi$75 = (getSub_1576(v_1660))(subs_1662);
  if($phi$75.$tag==1){
    const subUnsat_1666 = local$instance$Hashable$1 => local$instance$Eq$0 => su_1670 => uv_1671 => ut_1672 => {
      const ut2_1675 = ((substitute_1608(v_1660))(t2_1663))(ut_1672);
      const $phi$79 = isEmpty_70(freeTVars_1603(ut2_1675));
      if($phi$79){
        return (Pair_3(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(uv_1671))(ut2_1675))(su_1670.$0)))(su_1670.$1)
      } else if(!$phi$79){
        return (Pair_3(su_1670.$0))(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(uv_1671))(ut2_1675))(su_1670.$1))
      } else error("pattern match fail",$phi$79)
    };
    const su_1667 = ((foldTrie_67((subUnsat_1666($instance_465))($instance_410)))((Pair_3(subs_1662.$0))(Empty_11)))(subs_1662.$1);
    const sat2_1668 = fst_26(su_1667);
    const unsat2_1669 = snd_27(su_1667);
    const $phi$81 = isEmpty_70(freeTVars_1603(t2_1663));
    if($phi$81){
      return (Subs_1573(((((insert_64($instance_465))($instance_410))(v_1660))(t2_1663))(sat2_1668)))(unsat2_1669)
    } else if(!$phi$81){
      return (Subs_1573(sat2_1668))(((((insert_64($instance_465))($instance_410))(v_1660))(t2_1663))(unsat2_1669))
    } else error("pattern match fail",$phi$81)
  } else if($phi$75.$tag==0){
    return ((composeSubs_1578(ef_1659))(subs_1662))(((unify_1612(ef_1659))($phi$75.$0))(t2_1663))
  } else error("pattern match fail",$phi$75)
};
const addSatSub_1580 = ef_1677 => v_1678 => t_1679 => subs_1680 => {
  const $phi$83 = (getSub_1576(v_1678))(subs_1680);
  if($phi$83.$tag==1){
    const subUnsat_1683 = local$instance$Hashable$1 => local$instance$Eq$0 => su_1687 => uv_1688 => ut_1689 => {
      const ut2_1692 = ((substitute_1608(v_1678))(t_1679))(ut_1689);
      const $phi$87 = isEmpty_70(freeTVars_1603(ut2_1692));
      if($phi$87){
        return (Pair_3(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(uv_1688))(ut2_1692))(su_1687.$0)))(su_1687.$1)
      } else if(!$phi$87){
        return (Pair_3(su_1687.$0))(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(uv_1688))(ut2_1692))(su_1687.$1))
      } else error("pattern match fail",$phi$87)
    };
    const su_1684 = ((foldTrie_67((subUnsat_1683($instance_465))($instance_410)))((Pair_3(subs_1680.$0))(Empty_11)))(subs_1680.$1);
    const unsat2_1686 = snd_27(su_1684);
    const sat2_1685 = fst_26(su_1684);
    return (Subs_1573(((((insert_64($instance_465))($instance_410))(v_1678))(t_1679))(sat2_1685)))(unsat2_1686)
  } else if($phi$83.$tag==0){
    return ((composeSubs_1578(ef_1677))(subs_1680))(((unify_1612(ef_1677))($phi$83.$0))(t_1679))
  } else error("pattern match fail",$phi$83)
};
const substitute_1608 = n_1886 => s_1887 => t_1888 => (applySubs_1609((((addSub_1579(s_1889 => "substitute: "+s_1889))(n_1886))(s_1887))(emptySubs_1577)))(t_1888);
const unify_1612 = ef_1921 => a_1922 => b_1923 => {
  const bind_1924 = n_1926 => t_1927 => {
    if(t_1927.$tag==1){
      const $phi$92 = (($eq$eq($instance_410))(n_1926))(t_1927.$1);
      if($phi$92){
        return emptySubs_1577
      } else if(!$phi$92){
        return (((addSub_1579(ef_1921))(n_1926))(t_1927))(emptySubs_1577)
      } else error("pattern match fail",$phi$92)
    } else {
      const $phi$90 = (((setContains_78($instance_465))($instance_410))(n_1926))(freeTVars_1603(t_1927));
      if($phi$90){
        return error(ef_1921("occurs check failed"))
      } else if(!$phi$90){
        return (((addSub_1579(ef_1921))(n_1926))(t_1927))(emptySubs_1577)
      } else error("pattern match fail",$phi$90)
    }
  };
  const err_1925 = a_1931 => b_1932 => error(ef_1921((("cannot unify "+(printType_1285(a_1931)))+" with ")+(printType_1285(b_1932))));
  if(a_1922.$tag==1){
    return (bind_1924(a_1922.$1))(b_1923)
  } else if(a_1922.$tag==2){
    if(b_1923.$tag==2){
      const $phi$101 = (($eq$eq($instance_410))(a_1922.$1))(b_1923.$1);
      if($phi$101){
        return emptySubs_1577
      } else if(!$phi$101){
        return (err_1925(a_1922))(b_1923)
      } else error("pattern match fail",$phi$101)
    } else if(b_1923.$tag==1){
      return (bind_1924(b_1923.$1))(a_1922)
    } else return (err_1925(a_1922))(b_1923)
  } else if(a_1922.$tag==0){
    if(b_1923.$tag==0){
      const $phi$98 = (($eq$eq($instance_410))(a_1922.$1))(b_1923.$1);
      if($phi$98){
        return emptySubs_1577
      } else if(!$phi$98){
        return (err_1925(a_1922))(b_1923)
      } else error("pattern match fail",$phi$98)
    } else if(b_1923.$tag==1){
      return (bind_1924(b_1923.$1))(a_1922)
    } else return (err_1925(a_1922))(b_1923)
  } else if(a_1922.$tag==7){
    return (err_1925(a_1922))(b_1923)
  } else if(a_1922.$tag==5){
    return (err_1925(a_1922))(b_1923)
  } else if(a_1922.$tag==3){
    if(b_1923.$tag==1){
      return (bind_1924(b_1923.$1))(a_1922)
    } else if(b_1923.$tag==3){
      const fsubs_1958 = ((unify_1612(ef_1921))(a_1922.$1))(b_1923.$1);
      const xsubs_1959 = ((unify_1612(ef_1921))((applySubs_1609(fsubs_1958))(a_1922.$2)))((applySubs_1609(fsubs_1958))(b_1923.$2));
      return ((composeSubs_1578(ef_1921))(fsubs_1958))(xsubs_1959)
    } else return (err_1925(a_1922))(b_1923)
  } else if((a_1922.$tag==4)&&(a_1922.$2.$tag==1)){
    return (err_1925(a_1922))(b_1923)
  } else if(a_1922.$tag==4){
    if(b_1923.$tag==1){
      return (bind_1924(b_1923.$1))(a_1922)
    } else if((b_1923.$tag==4)&&(b_1923.$2.$tag==1)){
      return (err_1925(a_1922))(b_1923)
    } else return (err_1925(a_1922))(b_1923)
  } else return (err_1925(a_1922))(b_1923)
};
const skolemizeSubs_1617 = (foldl(subs_2127 => v_2128 => (((addSub_1579(s_2129 => "skolemize: "+s_2129))(v_2128))((TSkolem_747(Empty_11))(v_2128)))(subs_2127)))(emptySubs_1577);
const setAnn_758 = local$instance$Hashable$1 => local$instance$Eq$0 => name_874 => val_875 => ann_876 => ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(name_874))(val_875))(ann_876);
const AnnType_720 = $_0_785 => ({$0:$_0_785,$tag:0});
const setAnnType_761 = t_885 => ann_886 => ((((setAnn_758($instance_465))($instance_410))("type"))(AnnType_720(t_885)))(ann_886);
const Var_726 = $_0_792 => $_1_793 => ({$0:$_0_792,$1:$_1_793,$tag:0});
const New_732 = $_0_808 => $_1_809 => $_2_810 => ({$0:$_0_808,$1:$_1_809,$2:$_2_810,$tag:6});
const Let_731 = $_0_805 => $_1_806 => $_2_807 => ({$0:$_0_805,$1:$_1_806,$2:$_2_807,$tag:5});
const Lam_729 = $_0_799 => $_1_800 => $_2_801 => ({$0:$_0_799,$1:$_1_800,$2:$_2_801,$tag:3});
const Const_727 = $_0_794 => $_1_795 => ({$0:$_0_794,$1:$_1_795,$tag:1});
const Case_730 = $_0_802 => $_1_803 => $_2_804 => ({$0:$_0_802,$1:$_1_803,$2:$_2_804,$tag:4});
const App_728 = $_0_796 => $_1_797 => $_2_798 => ({$0:$_0_796,$1:$_1_797,$2:$_2_798,$tag:2});
const setType_771 = t_965 => e_966 => {
  if(e_966.$tag==0){
    return (Var_726((setAnnType_761(t_965))(e_966.$0)))(e_966.$1)
  } else if(e_966.$tag==1){
    return (Const_727((setAnnType_761(t_965))(e_966.$0)))(e_966.$1)
  } else if(e_966.$tag==2){
    return ((App_728((setAnnType_761(t_965))(e_966.$0)))(e_966.$1))(e_966.$2)
  } else if(e_966.$tag==3){
    return ((Lam_729((setAnnType_761(t_965))(e_966.$0)))(e_966.$1))(e_966.$2)
  } else if(e_966.$tag==4){
    return ((Case_730((setAnnType_761(t_965))(e_966.$0)))(e_966.$1))(e_966.$2)
  } else if(e_966.$tag==5){
    return ((Let_731((setAnnType_761(t_965))(e_966.$0)))(e_966.$1))(e_966.$2)
  } else if(e_966.$tag==6){
    return ((New_732((setAnnType_761(t_965))(e_966.$0)))(e_966.$1))(e_966.$2)
  } else error("pattern match fail",e_966)
};
const getAnn_757 = local$instance$Hashable$1 => local$instance$Eq$0 => name_872 => ann_873 => (((lookup_63(local$instance$Hashable$1))(local$instance$Eq$0))(name_872))(ann_873);
const getAnnType_760 = ann_883 => {
  const $phi$105 = (((getAnn_757($instance_465))($instance_410))("type"))(ann_883);
  if(($phi$105.$tag==0)&&($phi$105.$0.$tag==0)){
    return $phi$105.$0.$0
  } else if($phi$105.$tag==1){
    return TUnknown_752
  } else error("pattern match fail",$phi$105)
};
const annOf_772 = e_986 => {
  if(e_986.$tag==0){
    return e_986.$0
  } else if(e_986.$tag==1){
    return e_986.$0
  } else if(e_986.$tag==2){
    return e_986.$0
  } else if(e_986.$tag==3){
    return e_986.$0
  } else if(e_986.$tag==4){
    return e_986.$0
  } else if(e_986.$tag==5){
    return e_986.$0
  } else if(e_986.$tag==6){
    return e_986.$0
  } else error("pattern match fail",e_986)
};
const getType_774 = e_1027 => ($_16(getAnnType_760))(annOf_772(e_1027));
const Left_8 = $_0_109 => ({$0:$_0_109,$tag:0});
const Right_9 = $_0_110 => ({$0:$_0_110,$tag:1});
const breakableDownAndUp_775 = down_1028 => up_1029 => a_1030 => e_1031 => {
  const go_1032 = (breakableDownAndUp_775(down_1028))(up_1029);
  const gos_1033 = a_1034 => (foldl(ar_1035 => p_1036 => {
    const $phi$108 = (go_1032(fst_26(ar_1035)))(snd_27(p_1036));
    return (Pair_3($phi$108.$0))((push((Pair_3(fst_26(p_1036)))($phi$108.$1)))(snd_27(ar_1035)))
  }))((Pair_3(a_1034))([]));
  const $phi$110 = (down_1028(a_1030))(e_1031);
  if($phi$110.$tag==1){
    return $phi$110.$0
  } else if($phi$110.$tag==0){
    let $phi$111;
    if($phi$110.$0.$1.$tag==3){
      let $phi$129;
      const $phi$130 = (go_1032($phi$110.$0.$0))($phi$110.$0.$1.$2);
      $phi$129 = ((Pair_3($phi$130.$0))(((Lam_729($phi$110.$0.$1.$0))($phi$110.$0.$1.$1))($phi$130.$1)));
      $phi$111 = $phi$129
    } else if($phi$110.$0.$1.$tag==2){
      let $phi$125;
      const $phi$126 = (go_1032($phi$110.$0.$0))($phi$110.$0.$1.$1);
      let $phi$127;
      const $phi$128 = (go_1032($phi$126.$0))($phi$110.$0.$1.$2);
      $phi$127 = ((Pair_3($phi$128.$0))(((App_728($phi$110.$0.$1.$0))($phi$126.$1))($phi$128.$1)));
      $phi$125 = $phi$127;
      $phi$111 = $phi$125
    } else if($phi$110.$0.$1.$tag==4){
      let $phi$121;
      const $phi$122 = (go_1032($phi$110.$0.$0))($phi$110.$0.$1.$1);
      let $phi$123;
      const $phi$124 = (gos_1033($phi$122.$0))($phi$110.$0.$1.$2);
      $phi$123 = ((Pair_3($phi$124.$0))(((Case_730($phi$110.$0.$1.$0))($phi$122.$1))($phi$124.$1)));
      $phi$121 = $phi$123;
      $phi$111 = $phi$121
    } else if($phi$110.$0.$1.$tag==5){
      let $phi$117;
      const $phi$118 = (gos_1033($phi$110.$0.$0))($phi$110.$0.$1.$1);
      let $phi$119;
      const $phi$120 = (go_1032($phi$118.$0))($phi$110.$0.$1.$2);
      $phi$119 = ((Pair_3($phi$120.$0))(((Let_731($phi$110.$0.$1.$0))($phi$118.$1))($phi$120.$1)));
      $phi$117 = $phi$119;
      $phi$111 = $phi$117
    } else if($phi$110.$0.$1.$tag==6){
      const f_1072 = aes_1073 => e_1074 => {
        const $phi$114 = (go_1032(aes_1073.$0))(e_1074);
        return (Pair_3($phi$114.$0))((push($phi$114.$1))(aes_1073.$1))
      };
      let $phi$115;
      const $phi$116 = ((foldl(f_1072))((Pair_3(a_1030))([])))($phi$110.$0.$1.$2);
      $phi$115 = ((Pair_3($phi$116.$0))(((New_732($phi$110.$0.$1.$0))($phi$110.$0.$1.$1))($phi$116.$1)));
      $phi$111 = $phi$115
    } else $phi$111 = ((Pair_3($phi$110.$0.$0))($phi$110.$0.$1));
    const ae_1042 = $phi$111;
    return (up_1029(ae_1042.$0))(ae_1042.$1)
  } else error("pattern match fail",$phi$110)
};
const downAndUp_776 = down_1084 => up_1085 => (breakableDownAndUp_775(a_1086 => e_1087 => Left_8((down_1084(a_1086))(e_1087))))(up_1085);
const down_778 = f_1088 => (downAndUp_776(f_1088))(Pair_3);
const applySubsE_1626 = subs_2215 => e_2216 => {
  const f_2217 = a_2218 => e_2219 => {
    const t2_2220 = (applySubs_1609(subs_2215))(getType_774(e_2219));
    return (Pair_3(a_2218))((setType_771(t2_2220))(e_2219))
  };
  return snd_27(((down_778(f_2217))(true))(e_2216))
};
const skolemize_1619 = e_2137 => {
  const $phi$133 = getType_774(e_2137);
  if($phi$133.$tag==6){
    const subs_2142 = skolemizeSubs_1617($phi$133.$1);
    const t2_2143 = (((TForall_751($phi$133.$0))($phi$133.$1))((map(applySubsBound_1610(subs_2142)))($phi$133.$2)))((applySubs_1609(subs_2142))($phi$133.$3));
    return (applySubsE_1626(subs_2142))((setType_771(t2_2143))(e_2137))
  } else return e_2137
};
const Tuple6_7 = $_0_103 => $_1_104 => $_2_105 => $_3_106 => $_4_107 => $_5_108 => ({$0:$_0_103,$1:$_1_104,$2:$_2_105,$3:$_3_106,$4:$_4_107,$5:$_5_108});
const JSInstanceOf_5055 = $_0_5087 => $_1_5088 => ({$0:$_0_5087,$1:$_1_5088,$tag:14});
const $class$Monad = $_0 => $_1 => ({$0:$_0,$1:$_1});
const ret = x_$class$Monad => x_$class$Monad.$0;
const $gt$gt$eq = x_$class$Monad => x_$class$Monad.$1;
const foldM_53 = local$instance$Monad$0 => f_237 => r_238 => xs_239 => ((foldl(r_240 => x_241 => (($gt$gt$eq(local$instance$Monad$0))(r_240))(r_242 => (f_237(r_242))(x_241))))((ret(local$instance$Monad$0))(r_238)))(xs_239);
const mapM_54 = local$instance$Monad$0 => f_243 => xs_244 => (((foldM_53(local$instance$Monad$0))(xs_245 => x_246 => (($gt$gt$eq(local$instance$Monad$0))(f_243(x_246)))(x_247 => (ret(local$instance$Monad$0))((push(x_247))(xs_245)))))([]))(xs_244);
const breakableDownAndUpM_780 = local$instance$Monad$0 => down_1090 => up_1091 => e_1092 => {
  const go_1093 = ((breakableDownAndUpM_780(local$instance$Monad$0))(down_1090))(up_1091);
  const gos_1094 = (mapM_54(local$instance$Monad$0))(d_1095 => (($gt$gt$eq(local$instance$Monad$0))(go_1093(d_1095.$1)))(e_1098 => (ret(local$instance$Monad$0))((Pair_3(d_1095.$0))(e_1098))));
  return (($gt$gt$eq(local$instance$Monad$0))(down_1090(e_1092)))(e_1099 => {
    if(e_1099.$tag==1){
      return (ret(local$instance$Monad$0))(e_1099.$0)
    } else if(e_1099.$tag==0){
      if(e_1099.$0.$tag==3){
        return (($gt$gt$eq(local$instance$Monad$0))(go_1093(e_1099.$0.$2)))(e_1105 => up_1091(((Lam_729(e_1099.$0.$0))(e_1099.$0.$1))(e_1105)))
      } else if(e_1099.$0.$tag==2){
        return (($gt$gt$eq(local$instance$Monad$0))(go_1093(e_1099.$0.$1)))(f_1109 => (($gt$gt$eq(local$instance$Monad$0))(go_1093(e_1099.$0.$2)))(x_1110 => up_1091(((App_728(e_1099.$0.$0))(f_1109))(x_1110))))
      } else if(e_1099.$0.$tag==4){
        return (($gt$gt$eq(local$instance$Monad$0))(go_1093(e_1099.$0.$1)))(e_1114 => (($gt$gt$eq(local$instance$Monad$0))(gos_1094(e_1099.$0.$2)))(ps_1115 => up_1091(((Case_730(e_1099.$0.$0))(e_1114))(ps_1115))))
      } else if(e_1099.$0.$tag==5){
        return (($gt$gt$eq(local$instance$Monad$0))(gos_1094(e_1099.$0.$1)))(bs_1119 => (($gt$gt$eq(local$instance$Monad$0))(go_1093(e_1099.$0.$2)))(e_1120 => up_1091(((Let_731(e_1099.$0.$0))(bs_1119))(e_1120))))
      } else if(e_1099.$0.$tag==6){
        return (($gt$gt$eq(local$instance$Monad$0))(((mapM_54(local$instance$Monad$0))(go_1093))(e_1099.$0.$2)))(es_1124 => up_1091(((New_732(e_1099.$0.$0))(e_1099.$0.$1))(es_1124)))
      } else return up_1091(e_1099.$0)
    } else error("pattern match fail",e_1099)
  })
};
const downAndUpM_781 = local$instance$Monad$0 => down_1126 => up_1127 => ((breakableDownAndUpM_780(local$instance$Monad$0))(e_1128 => (($gt$gt$eq(local$instance$Monad$0))(down_1126(e_1128)))(e_1129 => (ret(local$instance$Monad$0))(Left_8(e_1129)))))(up_1127);
const upM_782 = local$instance$Monad$0 => (downAndUpM_781(local$instance$Monad$0))(ret(local$instance$Monad$0));
const toRecord_51 = (foldl(r_228 => p_229 => ((set(p_229.$0))(p_229.$1))(r_228)))(empty);
const contains_32 = local$instance$Eq$0 => x_178 => xs_179 => {
  const f_180 = i_181 => {
    const $phi$141 = (($lt($instance_411))(i_181))(length(xs_179));
    if(!$phi$141){
      return false
    } else if($phi$141){
      const $phi$143 = (($eq$eq(local$instance$Eq$0))(x_178))((getIx(i_181))(xs_179));
      if($phi$143){
        return true
      } else if(!$phi$143){
        return f_180(i_181+1)
      } else error("pattern match fail",$phi$143)
    } else error("pattern match fail",$phi$141)
  };
  return f_180(0)
};
const Tuple3_4 = $_0_91 => $_1_92 => $_2_93 => ({$0:$_0_91,$1:$_1_92,$2:$_2_93});
const State_10 = $_0_111 => ({$0:$_0_111});
const sets_57 = s_251 => State_10(__252 => (Pair_3(s_251))(Unit_0));
const JSReturn_5059 = $_0_5093 => ({$0:$_0_5093,$tag:1});
const Data_740 = $_0_830 => $_1_831 => $_2_832 => $_3_833 => ({$0:$_0_830,$1:$_1_831,$2:$_2_832,$3:$_3_833});
const dataConName_769 = dc_956 => dc_956.$1;
const dataConNames_770 = d_960 => (map(dataConName_769))(d_960.$3);
const CNum_733 = $_0_811 => ({$0:$_0_811,$tag:0});
const JSTernary_5047 = $_0_5079 => $_1_5080 => $_2_5081 => ({$0:$_0_5079,$1:$_1_5080,$2:$_2_5081,$tag:6});
const $class$Applicative = $_0 => $_1 => ({$0:$_0,$1:$_1});
const pure = x_$class$Applicative => x_$class$Applicative.$0;
const $instance_453 = ($class$Applicative(a_442 => State_10(s_443 => (Pair_3(s_443))(a_442))))(f_444 => a_445 => State_10(s_448 => {
  const $phi$150 = f_444.$0(s_448);
  const $phi$152 = a_445.$0($phi$150.$0);
  return (Pair_3($phi$152.$0))($phi$150.$1($phi$152.$1))
}));
const $instance_461 = ($class$Monad(pure($instance_453)))(a_454 => f_455 => State_10(s_457 => {
  const $phi$155 = a_454.$0(s_457);
  const $phi$157 = f_455($phi$155.$1);
  return $phi$157.$0($phi$155.$0)
}));
const gets_56 = State_10(s_250 => (Pair_3(s_250))(s_250));
const $gt$gt_21 = local$instance$Monad$0 => a_128 => b_129 => (($gt$gt$eq(local$instance$Monad$0))(a_128))(__130 => b_129);
const newIdent_3403 = n_3410 => (($gt$gt$eq($instance_461))(gets_56))(i_3411 => (($gt$gt_21($instance_461))(sets_57(i_3411+1)))((ret($instance_461))((n_3410+"_")+(intToString(i_3411)))));
const breakableDownM_784 = local$instance$Monad$0 => f_1131 => ((breakableDownAndUpM_780(local$instance$Monad$0))(f_1131))(ret(local$instance$Monad$0));
const PVar_735 = $_0_813 => $_1_814 => ({$0:$_0_813,$1:$_1_814,$tag:0});
const PData_737 = $_0_817 => $_1_818 => $_2_819 => ({$0:$_0_817,$1:$_1_818,$2:$_2_819,$tag:2});
const PConst_736 = $_0_815 => $_1_816 => ({$0:$_0_815,$1:$_1_816,$tag:1});
const rewriteExpr_3404 = env_3412 => e_3413 => {
  const rename_3414 = n_3418 => newIdent_3403(n_3418);
  const renamePat_3415 = p_3419 => {
    if(p_3419.$tag==1){
      return (ret($instance_461))((Pair_3(p_3419))(empty))
    } else if(p_3419.$tag==0){
      return (($gt$gt$eq($instance_461))(rename_3414(p_3419.$1)))(n_3424 => (ret($instance_461))((Pair_3((PVar_735(p_3419.$0))(n_3424)))(((set(p_3419.$1))(n_3424))(empty))))
    } else if(p_3419.$tag==2){
      return (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(renamePat_3415))(p_3419.$2)))(ps_3428 => {
        const $phi$160 = (has(p_3419.$1))(env_3412);
        if(!$phi$160){
          return (ret($instance_461))((Pair_3(((PData_737(p_3419.$0))(p_3419.$1))((map(fst_26))(ps_3428))))(((foldl(merge))(empty))((map(snd_27))(ps_3428))))
        } else if($phi$160){
          return (ret($instance_461))((Pair_3(((PData_737(p_3419.$0))((get(p_3419.$1))(env_3412)))((map(fst_26))(ps_3428))))(((foldl(merge))(empty))((map(snd_27))(ps_3428))))
        } else error("pattern match fail",$phi$160)
      })
    } else error("pattern match fail",p_3419)
  };
  const rewritePat_3416 = p_3429 => (($gt$gt$eq($instance_461))(renamePat_3415(p_3429.$0)))(pe_3432 => (($gt$gt$eq($instance_461))((rewriteExpr_3404((merge(env_3412))(pe_3432.$1)))(p_3429.$1)))(e_3435 => (ret($instance_461))((Pair_3(pe_3432.$0))(e_3435))));
  const f_3417 = e_3436 => {
    if(e_3436.$tag==3){
      return (($gt$gt$eq($instance_461))(rename_3414(e_3436.$1)))(n_3440 => (($gt$gt$eq($instance_461))((rewriteExpr_3404(((set(e_3436.$1))(n_3440))(env_3412)))(e_3436.$2)))(e_3441 => (ret($instance_461))(Right_9(((Lam_729(e_3436.$0))(n_3440))(e_3441)))))
    } else if(e_3436.$tag==5){
      return (($gt$gt$eq($instance_461))((rewriteBindings_3406(env_3412))(e_3436.$1)))(ebs_3445 => (($gt$gt$eq($instance_461))((rewriteExpr_3404(ebs_3445.$0))(e_3436.$2)))(e_3448 => (ret($instance_461))(Right_9(((Let_731(e_3436.$0))(ebs_3445.$1))(e_3448)))))
    } else if(e_3436.$tag==4){
      return (($gt$gt$eq($instance_461))((rewriteExpr_3404(env_3412))(e_3436.$1)))(e_3452 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(rewritePat_3416))(e_3436.$2)))(ps_3453 => (ret($instance_461))(Right_9(((Case_730(e_3436.$0))(e_3452))(ps_3453)))))
    } else if(e_3436.$tag==0){
      const $phi$167 = (has(e_3436.$1))(env_3412);
      if($phi$167){
        return (ret($instance_461))(Left_8((Var_726(e_3436.$0))((get(e_3436.$1))(env_3412))))
      } else if(!$phi$167){
        return (ret($instance_461))(Left_8(e_3436))
      } else error("pattern match fail",$phi$167)
    } else if(e_3436.$tag==6){
      const $phi$165 = (has(e_3436.$1))(env_3412);
      if($phi$165){
        return (ret($instance_461))(Left_8(((New_732(e_3436.$0))((get(e_3436.$1))(env_3412)))(e_3436.$2)))
      } else if(!$phi$165){
        return (ret($instance_461))(Left_8(e_3436))
      } else error("pattern match fail",$phi$165)
    } else return (ret($instance_461))(Left_8(e_3436))
  };
  return ((breakableDownM_784($instance_461))(f_3417))(e_3413)
};
const rewriteBindings_3406 = env_3473 => bs_3474 => {
  const ns_3475 = (map(fst_26))(bs_3474);
  const ns2_3476 = ((mapM_54($instance_461))(newIdent_3403))(ns_3475);
  return (($gt$gt$eq($instance_461))(ns2_3476))(ns_3477 => {
    const env2_3478 = (merge(env_3473))(toRecord_51((zip_41((map(fst_26))(bs_3474)))(ns_3477)));
    const bs2_3479 = ((mapM_54($instance_461))(rewriteExpr_3404(env2_3478)))((map(snd_27))(bs_3474));
    return (($gt$gt$eq($instance_461))(bs2_3479))(bs_3480 => (ret($instance_461))((Pair_3(env2_3478))((zip_41(ns_3477))(bs_3480))))
  })
};
const downM_783 = local$instance$Monad$0 => f_1130 => ((downAndUpM_781(local$instance$Monad$0))(f_1130))(ret(local$instance$Monad$0));
const JSObject_5051 = $_0_5085 => ({$0:$_0_5085,$tag:10});
const $lt$eq_19 = local$instance$Ord$0 => a_124 => b_125 => not_30((($lt(local$instance$Ord$0))(b_125))(a_124));
const AnnCodeLoc_721 = $_0_786 => $_1_787 => $_2_788 => ({$0:$_0_786,$1:$_1_787,$2:$_2_788,$tag:1});
const AnnTag_724 = {$tag:4};
const debug2_83 = p_394 => x_395 => snd_27((Pair_3(debug(p_394)))(x_395));
const Tuple5_6 = $_0_98 => $_1_99 => $_2_100 => $_3_101 => $_4_102 => ({$0:$_0_98,$1:$_1_99,$2:$_2_100,$3:$_3_101,$4:$_4_102});
const ImportAll_755 = $_0_870 => $_1_871 => ({$0:$_0_870,$1:$_1_871,$tag:2});
const CStr_734 = $_0_812 => ({$0:$_0_812,$tag:1});
const $gt_18 = local$instance$Ord$0 => a_122 => b_123 => (($lt(local$instance$Ord$0))(b_123))(a_122);
const join_38 = xs_201 => s_202 => {
  const $phi$170 = length(xs_201);
  if(0==$phi$170){
    return ""
  } else return (foldl1(a_204 => b_205 => (a_204+s_202)+b_205))(xs_201)
};
const Identity_15 = $_0_117 => ({$0:$_0_117});
const mapFst_85 = f_399 => p_400 => (Pair_3(f_399(p_400.$0)))(p_400.$1);
const ICtx_1574 = $_0_1637 => $_1_1638 => $_2_1639 => $_3_1640 => ({$0:$_0_1637,$1:$_1_1638,$2:$_2_1639,$3:$_3_1640});
const setBounds_1589 = bs_1737 => ctx_1738 => (((ICtx_1574(ctx_1738.$0))(bs_1737))(ctx_1738.$2))(ctx_1738.$3);
const setAddAll_76 = local$instance$Hashable$1 => local$instance$Eq$0 => vs_374 => s_375 => ((foldl(s_376 => v_377 => (((setAdd_75(local$instance$Hashable$1))(local$instance$Eq$0))(v_377))(s_376)))(s_375))(vs_374);
const mergeSet_48 = local$instance$Ord$1 => local$instance$Eq$0 => xs_221 => ys_222 => {
  const $phi$174 = length(xs_221);
  if(0==$phi$174){
    return ys_222
  } else {
    const $phi$176 = length(ys_222);
    if(0==$phi$176){
      return xs_221
    } else {
      const $phi$178 = (($lt(local$instance$Ord$1))(head_44(xs_221)))(head_44(ys_222));
      if($phi$178){
        return (enqueue(head_44(xs_221)))((((mergeSet_48(local$instance$Ord$1))(local$instance$Eq$0))(tail_45(xs_221)))(ys_222))
      } else if(!$phi$178){
        const $phi$180 = (($eq$eq(local$instance$Eq$0))(head_44(xs_221)))(head_44(ys_222));
        if($phi$180){
          return (enqueue(head_44(xs_221)))((((mergeSet_48(local$instance$Ord$1))(local$instance$Eq$0))(tail_45(xs_221)))(tail_45(ys_222)))
        } else if(!$phi$180){
          return (enqueue(head_44(ys_222)))((((mergeSet_48(local$instance$Ord$1))(local$instance$Eq$0))(xs_221))(tail_45(ys_222)))
        } else error("pattern match fail",$phi$180)
      } else error("pattern match fail",$phi$178)
    }
  }
};
const addBound_1587 = b_1726 => ctx_1727 => (((ICtx_1574(ctx_1727.$0))((push(b_1726))(ctx_1727.$1)))(ctx_1727.$2))(ctx_1727.$3);
const RewriteState_5657 = $_0_5685 => $_1_5686 => $_2_5687 => $_3_5688 => ({$0:$_0_5685,$1:$_1_5686,$2:$_2_5687,$3:$_3_5688});
const getCons_5665 = (($gt$gt$eq($instance_461))(gets_56))(s_5739 => (ret($instance_461))(s_5739.$0));
const perModule_2577 = local$instance$Monad$0 => mapM_54(local$instance$Monad$0);
const setSubs_1586 = subs_1720 => ctx_1721 => (((ICtx_1574(subs_1720))((map(applySubsBound_1610(subs_1720)))(ctx_1721.$1)))(ctx_1721.$2))(ctx_1721.$3);
const copyAnn_759 = local$instance$Hashable$1 => local$instance$Eq$0 => names_877 => ann_878 => {
  const f_879 = r_880 => n_881 => {
    const $phi$185 = (((getAnn_757(local$instance$Hashable$1))(local$instance$Eq$0))(n_881))(ann_878);
    if($phi$185.$tag==1){
      return r_880
    } else if($phi$185.$tag==0){
      return ((((setAnn_758(local$instance$Hashable$1))(local$instance$Eq$0))(n_881))($phi$185.$0))(r_880)
    } else error("pattern match fail",$phi$185)
  };
  return ((foldl(f_879))(Empty_11))(names_877)
};
const getAnnCodeLoc_762 = ann_887 => (((getAnn_757($instance_465))($instance_410))("codeLoc"))(ann_887);
const $instance_412 = $class$Ord(jsLt);
const namesInPat_766 = p_898 => {
  if(p_898.$tag==0){
    return [p_898.$1]
  } else if(p_898.$tag==1){
    return []
  } else if(p_898.$tag==2){
    return ((foldl((mergeSet_48($instance_412))($instance_410)))([]))((map(namesInPat_766))(p_898.$2))
  } else error("pattern match fail",p_898)
};
const init_47 = l_220 => ((slice2(0))((length(l_220))-1))(l_220);
const Instance_743 = $_0_841 => $_1_842 => $_2_843 => $_3_844 => ({$0:$_0_841,$1:$_1_842,$2:$_2_843,$3:$_3_844});
const concatMap_42 = f_211 => a_212 => ((foldl(concat))([]))((map(f_211))(a_212));
const AnnUseCount_722 = $_0_789 => ({$0:$_0_789,$tag:2});
const zipWithIndex2_39 = n_206 => xs_207 => {
  const $phi$188 = length(xs_207);
  if(0==$phi$188){
    return []
  } else return (enqueue((Pair_3(n_206))(head_44(xs_207))))((zipWithIndex2_39(n_206+1))(tail_45(xs_207)))
};
const ImportClosed_753 = $_0_864 => $_1_865 => $_2_866 => ({$0:$_0_864,$1:$_1_865,$2:$_2_866,$tag:0});
const JSIf_5066 = $_0_5104 => $_1_5105 => $_2_5106 => ({$0:$_0_5104,$1:$_1_5105,$2:$_2_5106,$tag:8});
const StrTok_6428 = {$tag:3};
const $lt$mul$gt = x_$class$Applicative => x_$class$Applicative.$1;
const Success_6238 = $_0_6253 => $_1_6254 => ({$0:$_0_6253,$1:$_1_6254,$tag:0});
const Parser_6240 = $_0_6256 => ({$0:$_0_6256});
const Error_6239 = $_0_6255 => ({$0:$_0_6255,$tag:1});
const $instance_6310 = ($class$Applicative(x_6298 => Parser_6240(Success_6238(x_6298))))(pf_6299 => pa_6300 => Parser_6240(i_6303 => {
  const $phi$193 = pf_6299.$0(i_6303);
  if($phi$193.$tag==1){
    return Error_6239($phi$193.$0)
  } else if($phi$193.$tag==0){
    const $phi$195 = pa_6300.$0($phi$193.$1);
    if($phi$195.$tag==1){
      return Error_6239($phi$195.$0)
    } else if($phi$195.$tag==0){
      return (Success_6238($phi$193.$0($phi$195.$0)))($phi$195.$1)
    } else error("pattern match fail",$phi$195)
  } else error("pattern match fail",$phi$193)
}));
const Token_6432 = $_0_6458 => $_1_6459 => $_2_6460 => $_3_6461 => ({$0:$_0_6458,$1:$_1_6459,$2:$_2_6460,$3:$_3_6461});
const ParserState_6670 = $_0_6743 => $_1_6744 => $_2_6745 => $_3_6746 => $_4_6747 => ({$0:$_0_6743,$1:$_1_6744,$2:$_2_6745,$3:$_3_6746,$4:$_4_6747});
const parseToken_6674 = f_6768 => {
  const parse_6769 = s_6770 => {
    const $phi$198 = (($lt($instance_411))(s_6770.$1))(length(s_6770.$0));
    if(!$phi$198){
      return Error_6239("run out of tokens")
    } else if($phi$198){
      const $phi$200 = (getIx(s_6770.$1))(s_6770.$0);
      const $phi$202 = (($lt($instance_411))($phi$200.$3))(s_6770.$3);
      if($phi$202){
        return Error_6239("token not indented sufficiently")
      } else if(!$phi$202){
        const $phi$204 = f_6768((getIx(s_6770.$1))(s_6770.$0));
        if($phi$204.$tag==1){
          return Error_6239("parser fun failed")
        } else if($phi$204.$tag==0){
          const $phi$206 = (($lt($instance_411))(s_6770.$1+1))(length(s_6770.$0));
          if(!$phi$206){
            return (Success_6238($phi$204.$0))(((((ParserState_6670(s_6770.$0))(s_6770.$1+1))(s_6770.$2))(s_6770.$3))(s_6770.$4))
          } else if($phi$206){
            const $phi$208 = (getIx(s_6770.$1+1))(s_6770.$0);
            const $phi$210 = (($gt_18($instance_411))($phi$208.$2))($phi$200.$2);
            if(!$phi$210){
              return (Success_6238($phi$204.$0))(((((ParserState_6670(s_6770.$0))(s_6770.$1+1))(s_6770.$2))(s_6770.$3))(s_6770.$4))
            } else if($phi$210){
              return (Success_6238($phi$204.$0))(((((ParserState_6670(s_6770.$0))(s_6770.$1+1))($phi$208.$3))(s_6770.$3))(s_6770.$4))
            } else error("pattern match fail",$phi$210)
          } else error("pattern match fail",$phi$206)
        } else error("pattern match fail",$phi$204)
      } else error("pattern match fail",$phi$202)
    } else error("pattern match fail",$phi$198)
  };
  return Parser_6240(parse_6769)
};
const withLocAnn_6687 = a_6864 => ((((setAnn_758($instance_465))($instance_410))("codeLoc"))(a_6864))(Empty_11);
const parse_6785 = s_6786 => {
  const $phi$213 = (($lt($instance_411))(s_6786.$1))(length(s_6786.$0));
  if(!$phi$213){
    return Error_6239("run out of tokens")
  } else if($phi$213){
    const $phi$215 = (getIx(s_6786.$1))(s_6786.$0);
    return (Success_6238(($_16(withLocAnn_6687))(((AnnCodeLoc_721(s_6786.$4))($phi$215.$2))($phi$215.$3))))(s_6786)
  } else error("pattern match fail",$phi$213)
};
const locP_6675 = Parser_6240(parse_6785);
const pcstrP_6703 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(PConst_736)))(locP_6675)))(parseToken_6674(t_6908 => {
  if(t_6908.$0.$tag==3){
    return Just_1(CStr_734(t_6908.$1))
  } else return Nothing_2
}));
const $pip$gt_6242 = local$instance$Applicative$0 => a_6260 => b_6261 => (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(__6262 => b_6263 => b_6263)))(a_6260)))(b_6261);
const $lt$mul$mns$gt_6676 = pf_6796 => pa_6797 => {
  const parse_6800 = s_6801 => {
    const $phi$221 = pf_6796.$0(s_6801);
    if($phi$221.$tag==0){
      const $phi$223 = pa_6797.$0(((((ParserState_6670($phi$221.$1.$0))($phi$221.$1.$1))($phi$221.$1.$2))(s_6801.$2+1))($phi$221.$1.$4));
      if($phi$223.$tag==0){
        return (Success_6238($phi$221.$0($phi$223.$0)))(((((ParserState_6670($phi$223.$1.$0))($phi$223.$1.$1))($phi$223.$1.$2))(s_6801.$3))($phi$223.$1.$4))
      } else if($phi$223.$tag==1){
        return Error_6239($phi$223.$0)
      } else error("pattern match fail",$phi$223)
    } else if($phi$221.$tag==1){
      return Error_6239($phi$221.$0)
    } else error("pattern match fail",$phi$221)
  };
  return Parser_6240(parse_6800)
};
const applyParser_6241 = p_6257 => i_6258 => p_6257.$0(i_6258);
const many_6244 = p_6268 => {
  const manyIterate_6269 = s_6270 => {
    const r_6271 = ((iterate(Left_8((Success_6238([]))(s_6270))))(r_6272 => {
      if(r_6272.$tag==0){
        return false
      } else if(r_6272.$tag==1){
        return true
      } else error("pattern match fail",r_6272)
    }))(rs_6275 => {
      if((rs_6275.$tag==0)&&(rs_6275.$0.$tag==0)){
        const $phi$228 = (applyParser_6241(p_6268))(rs_6275.$0.$1);
        if($phi$228.$tag==0){
          return Left_8((Success_6238((push($phi$228.$0))(rs_6275.$0.$0)))($phi$228.$1))
        } else if($phi$228.$tag==1){
          return Right_9((Success_6238(rs_6275.$0.$0))(rs_6275.$0.$1))
        } else error("pattern match fail",$phi$228)
      } else error("pattern match fail",rs_6275)
    });
    if(r_6271.$tag==1){
      return r_6271.$0
    } else if(r_6271.$tag==0){
      return error("manyIterate should never return a Left")
    } else error("pattern match fail",r_6271)
  };
  return Parser_6240(manyIterate_6269)
};
const $instance_6320 = ($class$Alternative(Parser_6240(__6311 => Error_6239("parser failure"))))(pa_6312 => pb_6313 => Parser_6240(i_6316 => {
  const $phi$233 = pa_6312.$0(i_6316);
  if($phi$233.$tag==1){
    return pb_6313.$0(i_6316)
  } else if($phi$233.$tag==0){
    return (Success_6238($phi$233.$0))($phi$233.$1)
  } else error("pattern match fail",$phi$233)
}));
const SymTok_6426 = {$tag:1};
const symP_6679 = s_6825 => parseToken_6674(t_6826 => {
  if(t_6826.$0.$tag==1){
    const $phi$236 = (($eq$eq($instance_410))(t_6826.$1))(s_6825);
    if($phi$236){
      return Just_1(s_6825)
    } else if(!$phi$236){
      return Nothing_2
    } else error("pattern match fail",$phi$236)
  } else return Nothing_2
});
const $lt$pip_6243 = local$instance$Applicative$0 => a_6264 => b_6265 => (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(a_6266 => __6267 => a_6266)))(a_6264)))(b_6265);
const parenP_6686 = p_6863 => (($lt$pip_6243($instance_6310))((($pip$gt_6242($instance_6310))(symP_6679("(")))(p_6863)))(symP_6679(")"));
const OpTok_6429 = {$tag:4};
const operatorP_6680 = s_6831 => parseToken_6674(t_6832 => {
  if(t_6832.$0.$tag==4){
    const $phi$239 = (($eq$eq($instance_410))(t_6832.$1))(s_6831);
    if($phi$239){
      return Just_1(s_6831)
    } else if(!$phi$239){
      return Nothing_2
    } else error("pattern match fail",$phi$239)
  } else return Nothing_2
});
const reserved_6678 = ["as","class","where","instance","let","in","from","import","case","of","data"];
const IdTok_6430 = {$tag:5};
const containsChar_35 = x_189 => xs_190 => {
  const f_191 = i_192 => {
    const $phi$241 = (($lt($instance_411))(i_192))(length(xs_190));
    if(!$phi$241){
      return false
    } else if($phi$241){
      const $phi$243 = (($eq$eq($instance_410))((getChar(i_192))(xs_190)))(x_189);
      if($phi$243){
        return true
      } else if(!$phi$243){
        return f_191(i_192+1)
      } else error("pattern match fail",$phi$243)
    } else error("pattern match fail",$phi$241)
  };
  return f_191(0)
};
const notUpperCaseId_6685 = parseToken_6674(t_6858 => {
  if(t_6858.$0.$tag==5){
    const $phi$246 = (containsChar_35((getChar(0))(t_6858.$1)))("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if(!$phi$246){
      const $phi$248 = ((contains_32($instance_410))(t_6858.$1))(reserved_6678);
      if(!$phi$248){
        return Just_1(t_6858.$1)
      } else if($phi$248){
        return Nothing_2
      } else error("pattern match fail",$phi$248)
    } else if($phi$246){
      return Nothing_2
    } else error("pattern match fail",$phi$246)
  } else return Nothing_2
});
const tvarP_6720 = (($lt$mul$gt($instance_6310))((pure($instance_6310))(TVar_746(Empty_11))))(notUpperCaseId_6685);
const upperCaseId_6684 = parseToken_6674(t_6853 => {
  if(t_6853.$0.$tag==5){
    const $phi$251 = (containsChar_35((getChar(0))(t_6853.$1)))("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if($phi$251){
      return Just_1(t_6853.$1)
    } else if(!$phi$251){
      return Nothing_2
    } else error("pattern match fail",$phi$251)
  } else return Nothing_2
});
const tconstP_6719 = (($lt$mul$gt($instance_6310))((pure($instance_6310))(TConst_745(Empty_11))))(upperCaseId_6684);
const typeP_6718 = Parser_6240(s_6950 => (applyParser_6241(tfunP_6723))(s_6950));
const simpleTypeP_6721 = (($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))(tconstP_6719))(tvarP_6720)))(parenP_6686(typeP_6718));
const tappP_6722 = ($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((pure($instance_6310))(foldl(TApp_748(Empty_11)))))(simpleTypeP_6721)))(many_6244(simpleTypeP_6721));
const tfunP_6723 = ($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((pure($instance_6310))(t_6951 => ts_6952 => (foldr1(b_6953 => a_6954 => ((TApp_748(Empty_11))(((TApp_748(Empty_11))((TConst_745(Empty_11))("->")))(a_6954)))(b_6953)))((enqueue(t_6951))(ts_6952)))))(tappP_6722)))(many_6244((($pip$gt_6242($instance_6310))(operatorP_6680("->")))(tappP_6722)));
const LexerState_6424 = $_0_6454 => $_1_6455 => $_2_6456 => $_3_6457 => ({$0:$_0_6454,$1:$_1_6455,$2:$_2_6456,$3:$_3_6457});
const runLexer_6435 = p_6472 => s_6473 => p_6472.$0((((LexerState_6424(s_6473))(0))(0))(0));
const some_6245 = p_6283 => (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(enqueue)))(p_6283)))(many_6244(p_6283));
const concatStr_6434 = (foldl(cs_6470 => c_6471 => cs_6470+c_6471))("");
const someStr_6441 = p_6489 => (($lt$mul$gt($instance_6310))((pure($instance_6310))(concatStr_6434)))(some_6245(p_6489));
const mkTok_6433 = t_6462 => {
  const parse_6463 = i_6464 => (Success_6238(r_6469 => (((Token_6432(t_6462))(r_6469))(i_6464.$2))(i_6464.$3)))(i_6464);
  return Parser_6240(parse_6463)
};
const parseChar_6436 = p_6475 => {
  const parse_6476 = s_6477 => {
    const $phi$256 = (($lt($instance_411))(s_6477.$1))(length(s_6477.$0));
    if(!$phi$256){
      return Error_6239("no more input available")
    } else if($phi$256){
      const $phi$258 = p_6475((getChar(s_6477.$1))(s_6477.$0));
      if(!$phi$258){
        return Error_6239("parser failed")
      } else if($phi$258){
        const $phi$260 = (getChar(s_6477.$1))(s_6477.$0);
        if("\n"==$phi$260){
          return (Success_6238((getChar(s_6477.$1))(s_6477.$0)))((((LexerState_6424(s_6477.$0))(s_6477.$1+1))(s_6477.$2+1))(0))
        } else return (Success_6238((getChar(s_6477.$1))(s_6477.$0)))((((LexerState_6424(s_6477.$0))(s_6477.$1+1))(s_6477.$2))(s_6477.$3+1))
      } else error("pattern match fail",$phi$258)
    } else error("pattern match fail",$phi$256)
  };
  return Parser_6240(parse_6476)
};
const charP_6438 = cs_6484 => parseChar_6436(c_6485 => (containsChar_35(c_6485))(cs_6484));
const WsTok_6425 = {$tag:0};
const whitespaceP_6444 = (($lt$mul$gt($instance_6310))(mkTok_6433(WsTok_6425)))(someStr_6441(charP_6438(" \n")));
const symbolP_6448 = (($lt$mul$gt($instance_6310))(mkTok_6433(SymTok_6426)))(charP_6438("()[]{},\\"));
const notCharP_6439 = cs_6486 => parseChar_6436(c_6487 => not_30((containsChar_35(c_6487))(cs_6486)));
const anyCharP_6437 = parseChar_6436(__6483 => true);
const newLineP_6490 = (($pip$gt_6242($instance_6310))((($pip$gt_6242($instance_6310))(charP_6438("\\")))(charP_6438("n"))))((pure($instance_6310))("\n"));
const notEndOfStringP_6492 = notCharP_6439("'");
const escapeP_6491 = (($pip$gt_6242($instance_6310))(charP_6438("\\")))(anyCharP_6437);
const stringCharP_6442 = (($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))(newLineP_6490))(escapeP_6491)))(notEndOfStringP_6492);
const manyStr_6440 = p_6488 => (($lt$mul$gt($instance_6310))((pure($instance_6310))(concatStr_6434)))(many_6244(p_6488));
const stringP_6443 = (($lt$mul$gt($instance_6310))(mkTok_6433(StrTok_6428)))((($lt$pip_6243($instance_6310))((($pip$gt_6242($instance_6310))(charP_6438("'")))(manyStr_6440(stringCharP_6442))))(charP_6438("'")));
const opP_6451 = (($lt$mul$gt($instance_6310))(mkTok_6433(OpTok_6429)))(someStr_6441(charP_6438("-+*/=:&|<>^$~")));
const opIdentP_6450 = (($lt$mul$gt($instance_6310))(mkTok_6433(IdTok_6430)))((($lt$pip_6243($instance_6310))((($pip$gt_6242($instance_6310))(charP_6438("(")))(someStr_6441(charP_6438("-+*/=:&|<>^$")))))(charP_6438(")")));
const NumTok_6427 = {$tag:2};
const intP_6445 = someStr_6441(charP_6438("0123456789"));
const numP_6446 = (($lt$mul$gt($instance_6310))(mkTok_6433(NumTok_6427)))((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))($concat)))(intP_6445)))((($lt$pip$gt($instance_6320))((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))($concat)))(charP_6438("."))))(intP_6445)))((pure($instance_6310))(""))));
const ComTok_6431 = {$tag:6};
const lineCommentP_6447 = (($lt$mul$gt($instance_6310))(mkTok_6433(ComTok_6431)))((($pip$gt_6242($instance_6310))((($pip$gt_6242($instance_6310))(charP_6438("/")))(charP_6438("/"))))(manyStr_6440(notCharP_6439("\n"))));
const letters_6252 = "abcdefghijklmnopqrstuvwxyz"+"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const identP_6449 = (($lt$mul$gt($instance_6310))(mkTok_6433(IdTok_6430)))((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))($concat)))(charP_6438(letters_6252+"_"))))(manyStr_6440(charP_6438((letters_6252+"0123456789")+"_"))));
const jaguarTokenP_6452 = many_6244((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))(stringP_6443))(whitespaceP_6444)))(numP_6446)))(lineCommentP_6447)))(identP_6449)))(opIdentP_6450)))(opP_6451)))(symbolP_6448));
const tokenize_6453 = runLexer_6435(jaguarTokenP_6452);
const mkParserState_6671 = ts_6748 => f_6749 => {
  let $phi$261;
  const $phi$262 = (getIx(0))(ts_6748);
  $phi$261 = $phi$262.$3;
  return ((((ParserState_6670(ts_6748))(0))($phi$261))(0))(f_6749)
};
const filterWhitespaceAndComments_6672 = filter(t_6754 => {
  if(t_6754.$0.$tag==0){
    return false
  } else if(t_6754.$0.$tag==6){
    return false
  } else return true
});
const runParser_6673 = p_6762 => s_6763 => f_6764 => {
  const $phi$265 = tokenize_6453(s_6763);
  if($phi$265.$tag==0){
    return (applyParser_6241(p_6762))((mkParserState_6671(filterWhitespaceAndComments_6672($phi$265.$0)))(f_6764))
  } else if($phi$265.$tag==1){
    return Error_6239($phi$265.$0)
  } else error("pattern match fail",$phi$265)
};
const parseType_6742 = runParser_6673(typeP_6718);
const parseT_7181 = s_7236 => {
  const $phi$267 = (parseType_6742(s_7236))("");
  if($phi$267.$tag==0){
    return $phi$267.$0
  } else return error($phi$267)
};
const reservedP_6682 = s_6842 => parseToken_6674(t_6843 => {
  if(t_6843.$0.$tag==5){
    const $phi$270 = (($eq$eq($instance_410))(t_6843.$1))(s_6842);
    if($phi$270){
      return Just_1(s_6842)
    } else if(!$phi$270){
      return Nothing_2
    } else error("pattern match fail",$phi$270)
  } else return Nothing_2
});
const sepBy1_6247 = p_6285 => sp_6286 => (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(enqueue)))(p_6285)))(many_6244((($pip$gt_6242($instance_6310))(sp_6286))(p_6285)));
const nonReservedP_6683 = parseToken_6674(t_6848 => {
  if(t_6848.$0.$tag==5){
    const $phi$273 = ((contains_32($instance_410))(t_6848.$1))(reserved_6678);
    if($phi$273){
      return Nothing_2
    } else if(!$phi$273){
      return Just_1(t_6848.$1)
    } else error("pattern match fail",$phi$273)
  } else return Nothing_2
});
const importNoAliasP_6729 = (($lt$mul$gt($instance_6310))((pure($instance_6310))(n_6961 => (Pair_3(n_6961))(n_6961))))(nonReservedP_6683);
const strP_6704 = parseToken_6674(t_6913 => {
  if(t_6913.$0.$tag==3){
    return Just_1(t_6913.$1)
  } else return Nothing_2
});
const importAliasP_6730 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(Pair_3)))(nonReservedP_6683)))((($pip$gt_6242($instance_6310))(reservedP_6682("as")))(nonReservedP_6683));
const ImportOpen_754 = $_0_867 => $_1_868 => $_2_869 => ({$0:$_0_867,$1:$_1_868,$2:$_2_869,$tag:1});
const importOpenP_6731 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(ns_6962 => f_6963 => ((ImportOpen_754(Empty_11))(f_6963))(ns_6962))))((($lt$pip_6243($instance_6310))((($pip$gt_6242($instance_6310))(symP_6679("{")))((sepBy1_6247((($lt$pip$gt($instance_6320))(importAliasP_6730))(importNoAliasP_6729)))(symP_6679(",")))))(symP_6679("}")))))((($pip$gt_6242($instance_6310))(reservedP_6682("from")))(strP_6704));
const importAllP_6732 = (($lt$mul$gt($instance_6310))((pure($instance_6310))(ImportAll_755(Empty_11))))((($pip$gt_6242($instance_6310))((($pip$gt_6242($instance_6310))(operatorP_6680("*")))(reservedP_6682("from"))))(strP_6704));
const importP_6733 = (($pip$gt_6242($instance_6310))(reservedP_6682("import")))((($lt$pip$gt($instance_6320))(importOpenP_6731))(importAllP_6732));
const $pip$mns$gt_6677 = pa_6821 => pb_6822 => ($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((pure($instance_6310))(__6823 => b_6824 => b_6824)))(pa_6821)))(pb_6822);
const dataConP_6727 = ($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((pure($instance_6310))(DataCon_741(Empty_11))))(upperCaseId_6684)))(many_6244(simpleTypeP_6721));
const dataP_6728 = ($lt$mul$mns$gt_6676(($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((pure($instance_6310))(Data_740(Empty_11))))(($pip$mns$gt_6677(reservedP_6682("data")))(upperCaseId_6684))))(many_6244(notUpperCaseId_6685))))((($pip$gt_6242($instance_6310))(operatorP_6680("=")))((sepBy1_6247(dataConP_6727))(operatorP_6680("|"))));
const varP_6689 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(Var_726)))(locP_6675)))(parseToken_6674(t_6866 => {
  if(t_6866.$0.$tag==5){
    const $phi$277 = ((contains_32($instance_410))(t_6866.$1))(reserved_6678);
    if($phi$277){
      return Nothing_2
    } else if(!$phi$277){
      return Just_1(t_6866.$1)
    } else error("pattern match fail",$phi$277)
  } else return Nothing_2
}));
const pvarP_6701 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(PVar_735)))(locP_6675)))(notUpperCaseId_6685);
const pcnumP_6702 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(PConst_736)))(locP_6675)))(parseToken_6674(t_6903 => {
  if(t_6903.$0.$tag==2){
    return Just_1(CNum_733(unsafeStringToInt(t_6903.$1)))
  } else return Nothing_2
}));
const pconstP_6705 = (($lt$pip$gt($instance_6320))(pcnumP_6702))(pcstrP_6703);
const patP_6698 = Parser_6240(s_6891 => (applyParser_6241(allPatP_6709))(s_6891));
const pdataP_6706 = ($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(PData_737)))(locP_6675)))(upperCaseId_6684)))(many_6244(patP_6698));
const nakedPatP_6707 = (($lt$pip$gt($instance_6320))(patP_6698))(pdataP_6706);
const f_6918 = ann_6919 => p_6920 => ps_6921 => {
  let $phi$279;
  const $phi$280 = length(ps_6921);
  if(1==$phi$280){
    $phi$279 = "Pair"
  } else if(2==$phi$280){
    $phi$279 = "Tuple3"
  } else if(3==$phi$280){
    $phi$279 = "Tuple4"
  } else if(4==$phi$280){
    $phi$279 = "Tuple5"
  } else if(5==$phi$280){
    $phi$279 = "Tuple6"
  } else error("pattern match fail",$phi$280);
  const cons_6922 = $phi$279;
  return ((PData_737(ann_6919))(cons_6922))((enqueue(p_6920))(ps_6921))
};
const ptupleP_6708 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(f_6918)))(locP_6675)))((($pip$gt_6242($instance_6310))(symP_6679("(")))((($lt$pip_6243($instance_6310))(nakedPatP_6707))(symP_6679(","))))))((($lt$pip_6243($instance_6310))((sepBy1_6247(nakedPatP_6707))(symP_6679(","))))(symP_6679(")")));
const allPatP_6709 = (($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))(pvarP_6701))(pconstP_6705)))(parenP_6686(pdataP_6706))))(ptupleP_6708);
const mkPatLam_6699 = l_6892 => p_6893 => a_6894 => {
  if(p_6893.$tag==0){
    return ((Lam_729(l_6892))(p_6893.$1))(a_6894)
  } else return ((Lam_729(l_6892))("$pat"))(((Case_730(l_6892))((Var_726(l_6892))("$pat")))([(Pair_3(p_6893))(a_6894)]))
};
const mkDefs_6712 = l_6923 => p_6924 => e_6925 => {
  if(p_6924.$tag==0){
    return [(Pair_3(p_6924.$1))(e_6925)]
  } else {
    let $phi$283;
    const $phi$284 = getAnnCodeLoc_762(l_6923);
    if(($phi$284.$tag==0)&&($phi$284.$0.$tag==1)){
      $phi$283 = ((("$pat_"+(intToString($phi$284.$0.$1)))+"_")+(intToString($phi$284.$0.$2)))
    } else error("pattern match fail",$phi$284);
    const id_6929 = $phi$283;
    return (enqueue((Pair_3(id_6929))(e_6925)))((map(n_6933 => (Pair_3(n_6933))(((Case_730(l_6923))((Var_726(Empty_11))(id_6929)))([(Pair_3(p_6924))((Var_726(Empty_11))(n_6933))]))))(namesInPat_766(p_6924)))
  }
};
const cstrP_6691 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(Const_727)))(locP_6675)))(parseToken_6674(t_6876 => {
  if(t_6876.$0.$tag==3){
    return Just_1(CStr_734(t_6876.$1))
  } else return Nothing_2
}));
const cnumP_6690 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(Const_727)))(locP_6675)))(parseToken_6674(t_6871 => {
  if(t_6871.$0.$tag==2){
    return Just_1(CNum_733(unsafeStringToInt(t_6871.$1)))
  } else return Nothing_2
}));
const constP_6692 = (($lt$pip$gt($instance_6320))(cstrP_6691))(cnumP_6690);
const success_6246 = a_6284 => Parser_6240(Success_6238(a_6284));
const opt_6249 = a_6289 => (($lt$pip$gt($instance_6320))((($lt$mul$gt($instance_6310))((pure($instance_6310))(Just_1)))(a_6289)))(success_6246(Nothing_2));
const sepBy_6248 = p_6287 => sp_6288 => (($lt$mul$gt($instance_6310))((pure($instance_6310))(justOr_23([]))))(opt_6249((sepBy1_6247(p_6287))(sp_6288)));
const fromJust_24 = m_138 => {
  if(m_138.$tag==0){
    return m_138.$0
  } else if(m_138.$tag==1){
    return error("expected Just but got Nothing")
  } else error("pattern match fail",m_138)
};
const withLocOf_6688 = e_6865 => withLocAnn_6687(($_16(fromJust_24))((((getAnn_757($instance_465))($instance_410))("codeLoc"))(annOf_772(e_6865))));
const anyOpP_6681 = parseToken_6674(t_6837 => {
  if(t_6837.$0.$tag==4){
    return Just_1(t_6837.$1)
  } else return Nothing_2
});
const exprP_6693 = Parser_6240(s_6881 => (applyParser_6241(opP_6717))(s_6881));
const arrayLitP_6694 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(ann_6882 => xs_6883 => ((New_732(ann_6882))("Array"))(xs_6883))))(locP_6675)))((($lt$pip_6243($instance_6310))((($pip$gt_6242($instance_6310))(symP_6679("[")))((sepBy_6248(exprP_6693))(symP_6679(",")))))(symP_6679("]")));
const f_6884 = ann_6885 => e_6886 => es_6887 => {
  let $phi$289;
  const $phi$290 = length(es_6887);
  if(1==$phi$290){
    $phi$289 = "Pair"
  } else if(2==$phi$290){
    $phi$289 = "Tuple3"
  } else if(3==$phi$290){
    $phi$289 = "Tuple4"
  } else if(4==$phi$290){
    $phi$289 = "Tuple5"
  } else if(5==$phi$290){
    $phi$289 = "Tuple6"
  } else error("pattern match fail",$phi$290);
  const cons_6888 = $phi$289;
  return ((foldl(App_728(ann_6885)))(((App_728(ann_6885))((Var_726(ann_6885))(cons_6888)))(e_6886)))(es_6887)
};
const tupleLitP_6695 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(f_6884)))(locP_6675)))((($pip$gt_6242($instance_6310))(symP_6679("(")))((($lt$pip_6243($instance_6310))(exprP_6693))(symP_6679(","))))))((($lt$pip_6243($instance_6310))((sepBy1_6247(exprP_6693))(symP_6679(","))))(symP_6679(")")));
const simpleExprP_6696 = (($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))(varP_6689))(constP_6692)))(arrayLitP_6694)))(tupleLitP_6695)))(parenP_6686(exprP_6693));
const appP_6697 = ($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((pure($instance_6310))(foldl(f_6889 => a_6890 => ((App_728(withLocOf_6688(f_6889)))(f_6889))(a_6890)))))((($lt$pip$gt($instance_6320))(varP_6689))(parenP_6686(exprP_6693)))))(many_6244(simpleExprP_6696));
const lamP_6700 = ($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(l_6898 => ps_6899 => a_6900 => ((foldr(a_6901 => p_6902 => ((mkPatLam_6699(l_6898))(p_6902))(a_6901)))(a_6900))(ps_6899))))(locP_6675)))(($pip$mns$gt_6677(symP_6679("\\")))(some_6245(patP_6698)))))((($pip$gt_6242($instance_6310))(operatorP_6680("->")))(exprP_6693));
const ofP_6710 = ($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((pure($instance_6310))(Pair_3)))(nakedPatP_6707)))((($pip$gt_6242($instance_6310))(operatorP_6680("->")))(exprP_6693));
const caseP_6711 = ($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(Case_730)))(locP_6675)))(($pip$mns$gt_6677(reservedP_6682("case")))(simpleExprP_6696))))((($pip$gt_6242($instance_6310))(reservedP_6682("of")))(some_6245(ofP_6710)));
const defP_6713 = ($lt$mul$mns$gt_6676(($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(l_6934 => lhs_6935 => ps_6936 => e_6937 => ((mkDefs_6712(l_6934))(lhs_6935))(((foldr(e_6938 => p_6939 => ((mkPatLam_6699(l_6934))(p_6939))(e_6938)))(e_6937))(ps_6936)))))(locP_6675)))(nakedPatP_6707)))(many_6244(patP_6698))))((($pip$gt_6242($instance_6310))(operatorP_6680("=")))(exprP_6693));
const defsP_6714 = (($lt$mul$gt($instance_6310))((pure($instance_6310))((foldl(concat))([]))))(some_6245(defP_6713));
const letP_6715 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(Let_731)))(locP_6675)))(($pip$mns$gt_6677(reservedP_6682("let")))(defsP_6714))))(($pip$mns$gt_6677(reservedP_6682("in")))(exprP_6693));
const primaryExprP_6716 = (($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))((($lt$pip$gt($instance_6320))(appP_6697))(constP_6692)))(lamP_6700)))(caseP_6711)))(letP_6715)))(arrayLitP_6694)))(tupleLitP_6695);
const opP_6717 = ($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((pure($instance_6310))(e_6940 => oes_6941 => ((foldl(a_6942 => lob_6943 => ((App_728(lob_6943.$0))(((App_728(lob_6943.$0))((Var_726(lob_6943.$0))(lob_6943.$1.$0)))(a_6942)))(lob_6943.$1.$1)))(e_6940))(oes_6941))))(primaryExprP_6716)))(many_6244((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(l_6947 => op_6948 => e_6949 => (Pair_3(l_6947))((Pair_3(op_6948))(e_6949)))))(locP_6675)))(anyOpP_6681)))(primaryExprP_6716)));
const withAnn_773 = ann_1006 => e_1007 => {
  if(e_1007.$tag==0){
    return (Var_726(ann_1006))(e_1007.$1)
  } else if(e_1007.$tag==1){
    return (Const_727(ann_1006))(e_1007.$1)
  } else if(e_1007.$tag==2){
    return ((App_728(ann_1006))(e_1007.$1))(e_1007.$2)
  } else if(e_1007.$tag==3){
    return ((Lam_729(ann_1006))(e_1007.$1))(e_1007.$2)
  } else if(e_1007.$tag==4){
    return ((Case_730(ann_1006))(e_1007.$1))(e_1007.$2)
  } else if(e_1007.$tag==5){
    return ((Let_731(ann_1006))(e_1007.$1))(e_1007.$2)
  } else if(e_1007.$tag==6){
    return ((New_732(ann_1006))(e_1007.$1))(e_1007.$2)
  } else error("pattern match fail",e_1007)
};
const AnnExport_725 = $_0_791 => ({$0:$_0_791,$tag:5});
const addExportAnn_6980 = d_6981 => (Pair_3(d_6981.$0))((withAnn_773(((((setAnn_758($instance_465))($instance_410))("export"))(AnnExport_725(d_6981.$0)))(annOf_772(d_6981.$1))))(d_6981.$1));
const topLevelDefsP_6737 = (($lt$mul$gt($instance_6310))((pure($instance_6310))(map(addExportAnn_6980))))(defsP_6714);
const instanceP_6726 = ($lt$mul$mns$gt_6676(($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((pure($instance_6310))(name_6958 => t_6959 => maybeDefs_6960 => (((Instance_743(Empty_11))(name_6958))(t_6959))((justOr_23([]))(maybeDefs_6960)))))(($pip$mns$gt_6677(reservedP_6682("instance")))(upperCaseId_6684))))(simpleTypeP_6721)))(opt_6249((($pip$gt_6242($instance_6310))(reservedP_6682("where")))(defsP_6714)));
const eitherP_6736 = a_6977 => b_6978 => ($_16(Parser_6240))(s_6979 => (applyParser_6241((($lt$pip$gt($instance_6320))((($lt$mul$gt($instance_6310))((pure($instance_6310))(Left_8)))(a_6977)))((($lt$mul$gt($instance_6310))((pure($instance_6310))(Right_9)))(b_6978))))(s_6979));
const Class_742 = $_0_837 => $_1_838 => $_2_839 => $_3_840 => ({$0:$_0_837,$1:$_1_838,$2:$_2_839,$3:$_3_840});
const classMemberP_6725 = ($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((pure($instance_6310))(Pair_3)))(notUpperCaseId_6685)))((($pip$gt_6242($instance_6310))(operatorP_6680("::")))(typeP_6718));
const classP_6724 = ($lt$mul$mns$gt_6676(($lt$mul$mns$gt_6676((($lt$mul$gt($instance_6310))((pure($instance_6310))(name_6955 => tv_6956 => maybeDefs_6957 => (((Class_742(Empty_11))(name_6955))(tv_6956))((justOr_23([]))(maybeDefs_6957)))))(($pip$mns$gt_6677(reservedP_6682("class")))(upperCaseId_6684))))(notUpperCaseId_6685)))(opt_6249((($pip$gt_6242($instance_6310))(reservedP_6682("where")))(some_6245(classMemberP_6725))));
const topLevelP_6738 = (eitherP_6736((eitherP_6736(dataP_6728))(topLevelDefsP_6737)))((eitherP_6736(classP_6724))(instanceP_6726));
const either_28 = f_148 => g_149 => e_150 => {
  if(e_150.$tag==0){
    return f_148(e_150.$0)
  } else if(e_150.$tag==1){
    return g_149(e_150.$0)
  } else error("pattern match fail",e_150)
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
const splitFourWay_6735 = e_6974 => {
  const $phi$298 = splitEither_29(e_6974);
  return (Pair_3(splitEither_29($phi$298.$0)))(splitEither_29($phi$298.$1))
};
const Module_738 = $_0_820 => $_1_821 => $_2_822 => $_3_823 => $_4_824 => $_5_825 => $_6_826 => ({$0:$_0_820,$1:$_1_821,$2:$_2_822,$3:$_3_823,$4:$_4_824,$5:$_5_825,$6:$_6_826});
const moduleP_6734 = (($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((($lt$mul$gt($instance_6310))((pure($instance_6310))(loc_6964 => is_6965 => es_6966 => {
  const $phi$300 = splitFourWay_6735(es_6966);
  let $phi$301;
  const $phi$302 = getAnnCodeLoc_762(loc_6964);
  if(($phi$302.$tag==0)&&($phi$302.$0.$tag==1)){
    $phi$301 = $phi$302.$0.$0
  } else error("pattern match fail",$phi$302);
  return ((((((Module_738(loc_6964))($phi$301))(is_6965))($phi$300.$0.$0))($phi$300.$1.$0))((map(Pair_3("")))($phi$300.$1.$1)))(((foldl(concat))([]))($phi$300.$0.$1))
})))(locP_6675)))(many_6244(importP_6733))))(some_6245(topLevelP_6738));
const Tuple4_5 = $_0_94 => $_1_95 => $_2_96 => $_3_97 => ({$0:$_0_94,$1:$_1_95,$2:$_2_96,$3:$_3_97});
const JSBinOp_5044 = $_0_5072 => $_1_5073 => $_2_5074 => ({$0:$_0_5072,$1:$_1_5073,$2:$_2_5074,$tag:3});
const setToArray_80 = (foldTrie_67(vs_380 => v_381 => __382 => (push(v_381))(vs_380)))([]);
const up_777 = downAndUp_776(Pair_3);
const JSSeq_5057 = $_0_5091 => ({$0:$_0_5091,$tag:16});
const zipWithIndex_40 = zipWithIndex2_39(0);
const AnnData_723 = $_0_790 => ({$0:$_0_790,$tag:3});
const mkConFun_3206 = tag_3230 => dt_3231 => vs_3232 => n_3233 => ts_3234 => {
  const nts_3235 = (map(it_3241 => (Pair_3("$_"+(intToString(fst_26(it_3241)))))(snd_27(it_3241))))(zipWithIndex_40(ts_3234));
  const new_3236 = (setType_771(dt_3231))(((New_732(Empty_11))(n_3233))((map(nt_3242 => (Var_726(Empty_11))(fst_26(nt_3242))))(nts_3235)));
  const mkCon_3237 = r_3243 => nt_3244 => (setType_771(((TApp_748(Empty_11))(((TApp_748(Empty_11))((TConst_745(Empty_11))("->")))(nt_3244.$1)))(getType_774(r_3243))))(((Lam_729(Empty_11))(nt_3244.$0))(r_3243));
  const con_3238 = ((foldr(mkCon_3237))(new_3236))(nts_3235);
  const conT_3239 = (((TForall_751(Empty_11))(vs_3232))([]))(getType_774(con_3238));
  const ann_3240 = ((((setAnn_758($instance_465))($instance_410))("export"))(AnnExport_725(n_3233)))(((((setAnn_758($instance_465))($instance_410))("type"))(AnnType_720(conT_3239)))(((((setAnn_758($instance_465))($instance_410))("data"))(AnnData_723(tag_3230)))(Empty_11)));
  return (Pair_3(n_3233))(skolemize_1619((withAnn_773(ann_3240))(con_3238)))
};
const rewriteData_3205 = d_3215 => {
  const dt_3220 = ((foldl(r_3222 => v_3223 => ((TApp_748(Empty_11))(r_3222))((TVar_746(Empty_11))(v_3223))))((TConst_745(Empty_11))(d_3215.$1)))(d_3215.$2);
  const rewriteCon_3221 = c_3224 => {
    let $phi$305;
    const $phi$306 = length(d_3215.$3);
    if(1==$phi$306){
      $phi$305 = Nothing_2
    } else $phi$305 = (Just_1(fst_26(c_3224)));
    const tag_3225 = $phi$305;
    const $phi$308 = snd_27(c_3224);
    return ((((mkConFun_3206(tag_3225))(dt_3220))(d_3215.$2))($phi$308.$1))($phi$308.$2)
  };
  return (map(rewriteCon_3221))(zipWithIndex_40(d_3215.$3))
};
const $gt$eq_20 = local$instance$Ord$0 => a_126 => b_127 => not_30((($lt(local$instance$Ord$0))(a_126))(b_127));
const JSIndex_5042 = $_0_5068 => $_1_5069 => ({$0:$_0_5068,$1:$_1_5069,$tag:1});
const JSString_5049 = $_0_5083 => ({$0:$_0_5083,$tag:8});
const ModuleInterface_739 = $_0_827 => $_1_828 => $_2_829 => ({$0:$_0_827,$1:$_1_828,$2:$_2_829});
const uniq_49 = local$instance$Eq$0 => xs_225 => {
  const $phi$310 = (($lt($instance_411))(length(xs_225)))(2);
  if($phi$310){
    return xs_225
  } else if(!$phi$310){
    const $phi$312 = (($eq$eq(local$instance$Eq$0))((getIx(0))(xs_225)))((getIx(1))(xs_225));
    if(!$phi$312){
      return (enqueue(head_44(xs_225)))((uniq_49(local$instance$Eq$0))(tail_45(xs_225)))
    } else if($phi$312){
      return (uniq_49(local$instance$Eq$0))(tail_45(xs_225))
    } else error("pattern match fail",$phi$312)
  } else error("pattern match fail",$phi$310)
};
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
const setIntersection_82 = local$instance$Hashable$1 => local$instance$Eq$0 => a_388 => b_389 => {
  const f_390 = r_391 => k_392 => __393 => {
    const $phi$315 = (((setContains_78(local$instance$Hashable$1))(local$instance$Eq$0))(k_392))(a_388);
    if(!$phi$315){
      return r_391
    } else if($phi$315){
      return (((setAdd_75(local$instance$Hashable$1))(local$instance$Eq$0))(k_392))(r_391)
    } else error("pattern match fail",$phi$315)
  };
  return ((foldTrie_67(f_390))(Empty_11))(b_389)
};
const instantiate_1607 = ctx_1841 => mkvar_1842 => t_1843 => {
  if(t_1843.$tag==6){
    const f_1853 = sc_1854 => v_1855 => {
      const $phi$319 = (mkvar_1842(sc_1854.$1))(v_1855);
      return (Pair_3(((((insert_64($instance_465))($instance_410))(v_1855))($phi$319.$1))(sc_1854.$0)))($phi$319.$0)
    };
    const _sc_1848 = ((foldl(f_1853))((Pair_3(Empty_11))(ctx_1841)))(t_1843.$1);
    const subs_1849 = fst_26(_sc_1848);
    const replace_1851 = t_1860 => {
      if(t_1860.$tag==0){
        return t_1860
      } else if(t_1860.$tag==1){
        return t_1860
      } else if(t_1860.$tag==5){
        return t_1860
      } else if(t_1860.$tag==2){
        const $phi$323 = (((lookup_63($instance_465))($instance_410))(t_1860.$1))(subs_1849);
        if($phi$323.$tag==1){
          return t_1860
        } else if($phi$323.$tag==0){
          return $phi$323.$0
        } else error("pattern match fail",$phi$323)
      } else if(t_1860.$tag==3){
        return ((TApp_748(t_1860.$0))(replace_1851(t_1860.$1)))(replace_1851(t_1860.$2))
      } else if(t_1860.$tag==4){
        return ((TRow_749(t_1860.$0))((map(m_1874 => (Pair_3(replace_1851(m_1874.$0)))(replace_1851(m_1874.$1))))(t_1860.$1)))(((fmap($instance_416))(replace_1851))(t_1860.$2))
      } else if(t_1860.$tag==6){
        return error("nested universal quantification")
      } else error("pattern match fail",t_1860)
    };
    const replaceBound_1852 = b_1881 => ((TCBound_744(b_1881.$0))(b_1881.$1))(replace_1851(b_1881.$2));
    const ctx2_1850 = snd_27(_sc_1848);
    return (Pair_3((Pair_3(replace_1851(t_1843.$3)))((map(replaceBound_1852))(t_1843.$2))))(ctx2_1850)
  } else return (Pair_3((Pair_3(t_1843))([])))(ctx_1841)
};
const loop_31 = f_163 => start_164 => {
  const next_166 = xr_172 => {
    const $phi$327 = f_163(xr_172.$0);
    if($phi$327.$tag==0){
      return (Pair_3($phi$327.$0))(Nothing_2)
    } else if($phi$327.$tag==1){
      return (Pair_3(xr_172.$0))(Just_1($phi$327.$0))
    } else error("pattern match fail",$phi$327)
  };
  const shouldStop_165 = x_169 => {
    if(x_169.$1.$tag==1){
      return false
    } else return true
  };
  const sp_167 = (Pair_3(start_164))(Nothing_2);
  const result_168 = ((iterate(sp_167))(shouldStop_165))(next_166);
  const $phi$330 = snd_27(result_168);
  if($phi$330.$tag==0){
    return $phi$330.$0
  } else error("pattern match fail",$phi$330)
};
const strToArray_52 = s_232 => {
  const f_233 = p_234 => {
    const $phi$333 = (($lt($instance_411))(p_234.$0))(length(s_232));
    if(!$phi$333){
      return Right_9(p_234.$1)
    } else if($phi$333){
      return Left_8((Pair_3(p_234.$0+1))((push((getChar(p_234.$0))(s_232)))(p_234.$1)))
    } else error("pattern match fail",$phi$333)
  };
  return (loop_31(f_233))((Pair_3(0))([]))
};
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
const updateOrSet_65 = local$instance$Hashable$1 => local$instance$Eq$0 => k_302 => f_303 => d_304 => m_305 => {
  const $phi$336 = (((lookup_63(local$instance$Hashable$1))(local$instance$Eq$0))(k_302))(m_305);
  if($phi$336.$tag==1){
    return ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(k_302))(d_304))(m_305)
  } else if($phi$336.$tag==0){
    return ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(k_302))(f_303($phi$336.$0)))(m_305)
  } else error("pattern match fail",$phi$336)
};
const JSNew_5056 = $_0_5089 => $_1_5090 => ({$0:$_0_5089,$1:$_1_5090,$tag:15});
const JSVar_5060 = $_0_5094 => $_1_5095 => ({$0:$_0_5094,$1:$_1_5095,$tag:2});
const JSBool_5050 = $_0_5084 => ({$0:$_0_5084,$tag:9});
const tryDCE_5221 = e_5224 => {
  if(((e_5224.$tag==3)&&("&&"==e_5224.$0))&&((e_5224.$1.$tag==9)&&e_5224.$1.$0)){
    return e_5224.$2
  } else if(((e_5224.$tag==3)&&("&&"==e_5224.$0))&&((e_5224.$2.$tag==9)&&e_5224.$2.$0)){
    return e_5224.$1
  } else if((e_5224.$tag==6)&&((e_5224.$0.$tag==9)&&e_5224.$0.$0)){
    return e_5224.$1
  } else if((e_5224.$tag==6)&&((e_5224.$0.$tag==9)&&(!e_5224.$0.$0))){
    return e_5224.$2
  } else return e_5224
};
const JSExpr_5058 = $_0_5092 => ({$0:$_0_5092,$tag:0});
const JSAssign_5065 = $_0_5102 => $_1_5103 => ({$0:$_0_5102,$1:$_1_5103,$tag:7});
const JSFun_5046 = $_0_5077 => $_1_5078 => ({$0:$_0_5077,$1:$_1_5078,$tag:5});
const JSCall_5045 = $_0_5075 => $_1_5076 => ({$0:$_0_5075,$1:$_1_5076,$tag:4});
const JSArray_5052 = $_0_5086 => ({$0:$_0_5086,$tag:11});
const rewriteDCE_5222 = e_5232 => {
  if(e_5232.$tag==1){
    return (JSIndex_5042(rewriteDCE_5222(e_5232.$0)))(rewriteDCE_5222(e_5232.$1))
  } else if(e_5232.$tag==3){
    return tryDCE_5221(((JSBinOp_5044(e_5232.$0))(rewriteDCE_5222(e_5232.$1)))(rewriteDCE_5222(e_5232.$2)))
  } else if(e_5232.$tag==4){
    return (JSCall_5045(rewriteDCE_5222(e_5232.$0)))((map(rewriteDCE_5222))(e_5232.$1))
  } else if(e_5232.$tag==5){
    return (JSFun_5046(e_5232.$0))((concatMap_42(rewriteStmt_5223))(e_5232.$1))
  } else if(e_5232.$tag==6){
    return tryDCE_5221(((JSTernary_5047(rewriteDCE_5222(e_5232.$0)))(rewriteDCE_5222(e_5232.$1)))(rewriteDCE_5222(e_5232.$2)))
  } else if(e_5232.$tag==10){
    return JSObject_5051((map(kv_5246 => (Pair_3(kv_5246.$0))(rewriteDCE_5222(kv_5246.$1))))(e_5232.$0))
  } else if(e_5232.$tag==14){
    return (JSInstanceOf_5055(rewriteDCE_5222(e_5232.$0)))(rewriteDCE_5222(e_5232.$1))
  } else if(e_5232.$tag==15){
    return (JSNew_5056(rewriteDCE_5222(e_5232.$0)))((map(rewriteDCE_5222))(e_5232.$1))
  } else if(e_5232.$tag==11){
    return JSArray_5052((map(rewriteDCE_5222))(e_5232.$0))
  } else return e_5232
};
const rewriteStmt_5223 = s_5255 => {
  if(s_5255.$tag==0){
    return [JSExpr_5058(rewriteDCE_5222(s_5255.$0))]
  } else if(s_5255.$tag==1){
    return [JSReturn_5059(rewriteDCE_5222(s_5255.$0))]
  } else if(s_5255.$tag==2){
    return [(JSVar_5060(s_5255.$0))(rewriteDCE_5222(s_5255.$1))]
  } else if(s_5255.$tag==7){
    return [(JSAssign_5065(rewriteDCE_5222(s_5255.$0)))(rewriteDCE_5222(s_5255.$1))]
  } else if((s_5255.$tag==8)&&((s_5255.$0.$tag==9)&&s_5255.$0.$0)){
    return (concatMap_42(rewriteStmt_5223))(s_5255.$1)
  } else if((s_5255.$tag==8)&&((s_5255.$0.$tag==9)&&(!s_5255.$0.$0))){
    return (concatMap_42(rewriteStmt_5223))(s_5255.$2)
  } else if(s_5255.$tag==8){
    const $phi$342 = rewriteDCE_5222(s_5255.$0);
    if(($phi$342.$tag==9)&&$phi$342.$0){
      return (concatMap_42(rewriteStmt_5223))(s_5255.$1)
    } else if(($phi$342.$tag==9)&&(!$phi$342.$0)){
      return (concatMap_42(rewriteStmt_5223))(s_5255.$2)
    } else return [((JSIf_5066($phi$342))((concatMap_42(rewriteStmt_5223))(s_5255.$1)))((concatMap_42(rewriteStmt_5223))(s_5255.$2))]
  } else return [s_5255]
};
const printCodeLoc_764 = l_892 => {
  if(l_892.$tag==1){
    return (((("in "+l_892.$0)+" at line ")+(intToString(l_892.$1+1)))+", column ")+(intToString(l_892.$2+1))
  } else error("pattern match fail",l_892)
};
const exprLoc_765 = e_896 => {
  const $phi$345 = ($_16(getAnnCodeLoc_762))(annOf_772(e_896));
  if($phi$345.$tag==1){
    return "in unknown location"
  } else if($phi$345.$tag==0){
    return printCodeLoc_764($phi$345.$0)
  } else error("pattern match fail",$phi$345)
};
const assert_87 = s_407 => b_408 => {
  if(b_408){
    return true
  } else if(!b_408){
    return error(s_407)
  } else error("pattern match fail",b_408)
};
const maybe_22 = a_131 => b_132 => m_133 => {
  if(m_133.$tag==0){
    return a_131(m_133.$0)
  } else if(m_133.$tag==1){
    return b_132
  } else error("pattern match fail",m_133)
};
const runState_58 = s_253 => m_254 => m_254.$0(s_253);
const evalState_59 = s_256 => m_257 => snd_27((runState_58(s_256))(m_257));
const ArgString_4985 = $_0_4994 => $_1_4995 => ({$0:$_0_4994,$1:$_1_4995,$tag:1});
const builtinsPathArg_7183 = (ArgString_4985("builtins"))(Nothing_2);
const getRep_5664 = n_5733 => (($gt$gt$eq($instance_461))(gets_56))(s_5734 => (ret($instance_461))((((lookup_63($instance_465))($instance_410))(n_5733))(s_5734.$1)));
const CompilerState_2572 = $_0_2582 => $_1_2583 => $_2_2584 => ({$0:$_0_2582,$1:$_1_2583,$2:$_2_2584});
const timingStart_2578 = n_2603 => (($gt$gt$eq($instance_461))(gets_56))(s_2604 => {
  const nts_2608 = (justOr_23([]))((((lookup_63($instance_465))($instance_410))(n_2603))(s_2604.$2));
  return sets_57(((CompilerState_2572(s_2604.$0))(s_2604.$1))(((((insert_64($instance_465))($instance_410))(n_2603))((push(currentTimeMs(Unit_0)))(nts_2608)))(s_2604.$2)))
});
const last_46 = l_219 => (getIx((length(l_219))-1))(l_219);
const timingEnd_2579 = n_2609 => (($gt$gt$eq($instance_461))(gets_56))(s_2610 => {
  const nts_2614 = (justOr_23([]))((((lookup_63($instance_465))($instance_410))(n_2609))(s_2610.$2));
  const start_2615 = last_46(nts_2614);
  return sets_57(((CompilerState_2572(s_2610.$0))(s_2610.$1))(((((insert_64($instance_465))($instance_410))(n_2609))((push((currentTimeMs(Unit_0))-start_2615))(init_47(nts_2614))))(s_2610.$2)))
});
const timed_2580 = n_2616 => p_2617 => i_2618 => (($gt$gt$eq($instance_461))((($gt$gt_21($instance_461))(timingStart_2578(n_2616)))(p_2617(i_2618))))(o_2619 => (($gt$gt_21($instance_461))(timingEnd_2579(n_2616)))((ret($instance_461))(o_2619)));
const unrollDataConType_1624 = t_2202 => {
  if((t_2202.$tag==3)&&((t_2202.$1.$tag==3)&&((t_2202.$1.$1.$tag==0)&&("->"==t_2202.$1.$1.$1)))){
    const $phi$354 = unrollDataConType_1624(t_2202.$2);
    return (Pair_3((enqueue(t_2202.$1.$2))($phi$354.$0)))($phi$354.$1)
  } else return (Pair_3([]))(t_2202)
};
const mapSnd_86 = f_403 => p_404 => (Pair_3(p_404.$0))(f_403(p_404.$1));
const dropExport_4145 = f_4149 => b_4150 => {
  const $phi$358 = (((getAnn_757($instance_465))($instance_410))("export"))(annOf_772(b_4150.$1));
  if($phi$358.$tag==1){
    return (ret($instance_461))(b_4150)
  } else if(($phi$358.$tag==0)&&($phi$358.$0.$tag==5)){
    return (($gt$gt$eq($instance_461))(gets_56))(ns_4154 => (($gt$gt_21($instance_461))(sets_57(((((insert_64($instance_465))($instance_410))((f_4149+"#")+$phi$358.$0.$0))(b_4150.$0))(ns_4154))))((ret($instance_461))((Pair_3(b_4150.$0))((withAnn_773((((remove_66($instance_465))($instance_410))("export"))(annOf_772(b_4150.$1))))(b_4150.$1)))))
  } else error("pattern match fail",$phi$358)
};
const JSLet_5062 = $_0_5098 => $_1_5099 => ({$0:$_0_5098,$1:$_1_5099,$tag:4});
const indent_1289 = map(l_1412 => "  "+l_1412);
const printExprTyped_1287 = typed_1353 => e_1354 => {
  const sameLine_1356 = xs_1365 => ys_1366 => (concat(init_47(xs_1365)))((enqueue((last_46(xs_1365))+(head_44(ys_1366))))(tail_45(ys_1366)));
  const sameLine3_1357 = a_1367 => b_1368 => c_1369 => (sameLine_1356(a_1367))((sameLine_1356(b_1368))(c_1369));
  const printT_1361 = e_1405 => {
    const t_1406 = getType_774(e_1405);
    return printType_1285(t_1406)
  };
  const printPat_1359 = p_1373 => {
    if(p_1373.$tag==0){
      return p_1373.$1
    } else if((p_1373.$tag==1)&&(p_1373.$1.$tag==0)){
      return jsonStringify(p_1373.$1.$0)
    } else if((p_1373.$tag==1)&&(p_1373.$1.$tag==1)){
      return jsonStringify(p_1373.$1.$0)
    } else if(p_1373.$tag==2){
      return ((p_1373.$1+" (")+((join_38((map(printPat_1359))(p_1373.$2)))(") (")))+")"
    } else error("pattern match fail",p_1373)
  };
  const printParen_1355 = e_1364 => ((sameLine3_1357(["("]))(printExpr_1362(e_1364)))([")"]);
  const printCasePat_1358 = cp_1370 => (enqueue((printPat_1359(cp_1370.$0))+" ->"))(indent_1289(printExpr_1362(cp_1370.$1)));
  const printE_1360 = e_1383 => {
    if(e_1383.$tag==0){
      return [e_1383.$1]
    } else if((e_1383.$tag==1)&&(e_1383.$1.$tag==0)){
      return [jsonStringify(e_1383.$1.$0)]
    } else if((e_1383.$tag==1)&&(e_1383.$1.$tag==1)){
      return [jsonStringify(e_1383.$1.$0)]
    } else if(e_1383.$tag==2){
      return ((sameLine3_1357(printParen_1355(e_1383.$1)))([" "]))(printParen_1355(e_1383.$2))
    } else if(e_1383.$tag==3){
      return (enqueue(("\\"+e_1383.$1)+" ->"))(indent_1289(printExpr_1362(e_1383.$2)))
    } else if(e_1383.$tag==4){
      return (concat(((sameLine3_1357(["case "]))(printParen_1355(e_1383.$1)))([" of"])))(indent_1289((concatMap_42(printCasePat_1358))(e_1383.$2)))
    } else if(e_1383.$tag==5){
      return (concat((push("in"))((enqueue("let"))(indent_1289((concatMap_42(printDef_1288(typed_1353)))(e_1383.$1))))))(indent_1289(printExpr_1362(e_1383.$2)))
    } else if(e_1383.$tag==6){
      return (push(e_1383.$1))(indent_1289((concatMap_42(printExprTyped_1287(typed_1353)))(e_1383.$2)))
    } else error("pattern match fail",e_1383)
  };
  const printExpr_1362 = e_1407 => {
    if(!typed_1353){
      return printE_1360(e_1407)
    } else if(typed_1353){
      return ((sameLine3_1357(["("]))(printE_1360(e_1407)))([(" :: "+(printT_1361(e_1407)))+" )"])
    } else error("pattern match fail",typed_1353)
  };
  const pe_1363 = printE_1360(e_1354);
  return printExpr_1362(e_1354)
};
const printDef_1288 = typed_1408 => d_1409 => (enqueue(d_1409.$0+" ="))(indent_1289((printExprTyped_1287(typed_1408))(d_1409.$1)));
const reallyPrintExpr_1290 = typed_1413 => e_1414 => (join_38((printExprTyped_1287(typed_1413))(e_1414)))("\n");
const setExports_2574 = ex_2589 => (($gt$gt$eq($instance_461))(gets_56))(s_2590 => sets_57(((CompilerState_2572(ex_2589))(s_2590.$1))(s_2590.$2)));
const moduleFile_7177 = m_7193 => m_7193.$1;
const skolemizeType_1618 = t_2130 => {
  if(t_2130.$tag==6){
    const subs_2135 = skolemizeSubs_1617(t_2130.$1);
    return (((TForall_751(t_2130.$0))(t_2130.$1))((map(applySubsBound_1610(subs_2135)))(t_2130.$2)))((applySubs_1609(subs_2135))(t_2130.$3))
  } else return t_2130
};
const classToBindings_1630 = c_2289 => {
  const process_2294 = b_2295 => {
    const ftv_2298 = freeTVars_1603(b_2295.$1);
    const $phi$370 = (((setContains_78($instance_465))($instance_410))(c_2289.$2))(ftv_2298);
    if(!$phi$370){
      return error((("invalid clas definition "+c_2289.$1)+", binding ")+b_2295.$0)
    } else if($phi$370){
      return (Pair_3(b_2295.$0))(skolemizeType_1618((((mkTForall_1605(Empty_11))(setToArray_80(ftv_2298)))([((TCBound_744(Empty_11))(c_2289.$1))((TVar_746(Empty_11))(c_2289.$2))]))(b_2295.$1)))
    } else error("pattern match fail",$phi$370)
  };
  return (map(process_2294))(c_2289.$3)
};
const newCtx_1584 = (((ICtx_1574(emptySubs_1577))([]))(1))(s_1714 => "unknown error context: "+s_1714);
const instanceToTypeBound_1629 = i_2284 => ((TCBound_744(Empty_11))(i_2284.$1))(i_2284.$2);
const IEnv_1575 = $_0_1641 => $_1_1642 => $_2_1643 => ({$0:$_0_1641,$1:$_1_1642,$2:$_2_1643});
const addBinding_1598 = n_1776 => t_1777 => env_1778 => ((IEnv_1575(((((insert_64($instance_465))($instance_410))(n_1776))(t_1777))(env_1778.$0)))(env_1778.$1))((((setUnion_79($instance_465))($instance_410))(env_1778.$2))(freeTVars_1603(t_1777)));
const getBinding_1595 = n_1764 => env_1765 => (((lookup_63($instance_465))($instance_410))(n_1764))(env_1765.$0);
const getSubs_1585 = ctx_1715 => ctx_1715.$0;
const getBindingM_1596 = n_1769 => env_1770 => (($gt$gt$eq($instance_461))(gets_56))(ctx_1771 => ($_16(ret($instance_461)))(((fmap($instance_416))(applySubs_1609(getSubs_1585(ctx_1771))))((getBinding_1595(n_1769))(env_1770))));
const applySubsDef_1625 = d_2211 => (($gt$gt$eq($instance_461))(gets_56))(ctx_2214 => ($_16(ret($instance_461)))((Pair_3(d_2211.$0))((applySubsE_1626(getSubs_1585(ctx_2214)))(d_2211.$1))));
const newTVarM_1583 = (($gt$gt$eq($instance_461))(gets_56))(ctx_1708 => {
  const n_1713 = "$"+(intToString(ctx_1708.$2));
  return (($gt$gt_21($instance_461))(sets_57((((ICtx_1574(ctx_1708.$0))(ctx_1708.$1))(ctx_1708.$2+1))(ctx_1708.$3))))((ret($instance_461))((TVar_746(Empty_11))(n_1713)))
});
const onError_1591 = e_1749 => (($gt$gt$eq($instance_461))(gets_56))(ctx_1750 => sets_57((((ICtx_1574(ctx_1750.$0))(ctx_1750.$1))(ctx_1750.$2))(e_1749)));
const getErrorF_1593 = (($gt$gt$eq($instance_461))(gets_56))(ctx_1759 => (ret($instance_461))(ctx_1759.$3));
const withError_1592 = e_1755 => f_1756 => (($gt$gt$eq($instance_461))(getErrorF_1593))(old_1757 => (($gt$gt$eq($instance_461))((($gt$gt_21($instance_461))(onError_1591(e_1755)))(f_1756)))(r_1758 => (($gt$gt_21($instance_461))(onError_1591(old_1757)))((ret($instance_461))(r_1758))));
const withLocError_1614 = e_1976 => f_1977 => {
  const $phi$380 = getAnnCodeLoc_762(annOf_772(e_1976));
  if($phi$380.$tag==1){
    return f_1977
  } else if($phi$380.$tag==0){
    return (withError_1592(s_1979 => (s_1979+" ")+(printCodeLoc_764($phi$380.$0))))(f_1977)
  } else error("pattern match fail",$phi$380)
};
const unifyM_1611 = a_1915 => b_1916 => (($gt$gt$eq($instance_461))(gets_56))(ctx_1917 => (($gt$gt$eq($instance_461))(getErrorF_1593))(ef_1918 => {
  const ef2_1919 = s_1920 => ef_1918((((("unifying "+(printType_1285(a_1915)))+" and ")+(printType_1285(b_1916)))+": ")+s_1920);
  return sets_57((setSubs_1586(((composeSubs_1578(ef2_1919))(getSubs_1585(ctx_1917)))(((unify_1612(ef2_1919))(a_1915))(b_1916))))(ctx_1917))
}));
const trieKeys_72 = m_364 => ((foldTrie_67(ks_365 => k_366 => __367 => (push(k_366))(ks_365)))([]))(m_364);
const newTVar_1582 = ctx_1702 => {
  const n_1707 = "$"+(intToString(ctx_1702.$2));
  return (Pair_3((((ICtx_1574(ctx_1702.$0))(ctx_1702.$1))(ctx_1702.$2+1))(ctx_1702.$3)))((TVar_746(Empty_11))(n_1707))
};
const instantiateM_1606 = t_1832 => (($gt$gt$eq($instance_461))(gets_56))(ctx_1833 => {
  const $phi$383 = ((instantiate_1607(ctx_1833))(ctx_1834 => __1835 => newTVar_1582(ctx_1834)))(t_1832);
  return (($gt$gt_21($instance_461))(sets_57(((foldl(ctx_1839 => b_1840 => (addBound_1587(b_1840))(ctx_1839)))($phi$383.$1))($phi$383.$0.$1))))((ret($instance_461))($phi$383.$0.$0))
});
const getBounds_1588 = ctx_1732 => ctx_1732.$1;
const freeTVarsInEnv_1600 = env_1790 => env_1790.$2;
const generalize_1623 = env_2170 => t_2171 => (($gt$gt$eq($instance_461))(gets_56))(ctx_2172 => {
  const subs_2173 = getSubs_1585(ctx_2172);
  const envTVars_2174 = freeTVarsInEnv_1600(env_2170);
  let $phi$386;
  $phi$386 = (((foldTrie_67(s_2181 => v_2182 => __2183 => (((setUnion_79($instance_465))($instance_410))(s_2181))((justOr_23(Empty_11))(((fmap($instance_416))(freeTVars_1603))((((lookup_63($instance_465))($instance_410))(v_2182))(subs_2173.$1))))))(envTVars_2174))(envTVars_2174));
  const nonFree_2175 = $phi$386;
  const vs_2176 = (((setDiff_81($instance_465))($instance_410))(freeTVars_1603(t_2171)))(nonFree_2175);
  const processBounds_2178 = vbb_2184 => b_2185 => {
    const boundVars_2189 = freeTVarsInBound_1613(b_2185);
    const sharedVars_2190 = (((setIntersection_82($instance_465))($instance_410))(boundVars_2189))(vs_2176);
    const $phi$389 = isEmpty_70(sharedVars_2190);
    if($phi$389){
      return (Pair_3(vbb_2184.$0))((Pair_3(vbb_2184.$1.$0))((push(b_2185))(vbb_2184.$1.$1)))
    } else if(!$phi$389){
      const $phi$391 = (($eq$eq($instance_409))(size_69(sharedVars_2190)))(size_69(boundVars_2189));
      if($phi$391){
        return (Pair_3(vbb_2184.$0))((Pair_3((push(b_2185))(vbb_2184.$1.$0)))(vbb_2184.$1.$1))
      } else if(!$phi$391){
        return (Pair_3((((setUnion_79($instance_465))($instance_410))(vbb_2184.$0))(sharedVars_2190)))((Pair_3(vbb_2184.$1.$0))((push(b_2185))(vbb_2184.$1.$1)))
      } else error("pattern match fail",$phi$391)
    } else error("pattern match fail",$phi$389)
  };
  const vbb_2177 = ((foldl(processBounds_2178))((Pair_3(Empty_11))((Pair_3([]))([]))))(getBounds_1588(ctx_2172));
  const finalVars_2194 = (((setDiff_81($instance_465))($instance_410))(vs_2176))(vbb_2177.$0);
  const drop_2195 = local$instance$Hashable$1 => local$instance$Eq$0 => r_2197 => v_2198 => t_2199 => {
    const $phi$394 = ($_16(isEmpty_70))((((setIntersection_82($instance_465))($instance_410))(finalVars_2194))(freeTVars_1603(t_2199)));
    if($phi$394){
      return ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(v_2198))(t_2199))(r_2197)
    } else if(!$phi$394){
      return r_2197
    } else error("pattern match fail",$phi$394)
  };
  let $phi$395;
  $phi$395 = ((Subs_1573(subs_2173.$0))(((foldTrie_67((drop_2195($instance_465))($instance_410)))(Empty_11))(subs_2173.$1)));
  const subs2_2196 = $phi$395;
  let $phi$396;
  const $phi$397 = (($_16(not_30))(isEmpty_70(finalVars_2194)))||((($gt_18($instance_411))(length(vbb_2177.$1.$0)))(0));
  if($phi$397){
    $phi$396 = ((ret($instance_461))((((mkTForall_1605(Empty_11))(setToArray_80(finalVars_2194)))(vbb_2177.$1.$0))(t_2171)))
  } else if(!$phi$397){
    $phi$396 = ((ret($instance_461))(t_2171))
  } else error("pattern match fail",$phi$397);
  return (($gt$gt_21($instance_461))(sets_57((setBounds_1589(vbb_2177.$1.$1))((setSubs_1586(subs2_2196))(ctx_2172)))))($phi$396)
});
const satisfies_1633 = a_2389 => b_2390 => {
  if(a_2389.$tag==1){
    return true
  } else if(a_2389.$tag==2){
    if(b_2390.$tag==2){
      return (($eq$eq($instance_410))(a_2389.$1))(b_2390.$1)
    } else return false
  } else if(a_2389.$tag==0){
    if(b_2390.$tag==0){
      return (($eq$eq($instance_410))(a_2389.$1))(b_2390.$1)
    } else return false
  } else if(a_2389.$tag==3){
    if(b_2390.$tag==3){
      return ((satisfies_1633(a_2389.$1))(b_2390.$1))&&((satisfies_1633(a_2389.$2))(b_2390.$2))
    } else return false
  } else return error("unexpected type in satisfies "+(printType_1285(a_2389)))
};
const satisfiesBound_1634 = a_2411 => b_2412 => ((($eq$eq($instance_410))(a_2411.$1))(b_2412.$1))&&((satisfies_1633(a_2411.$2))(b_2412.$2));
const getInstances_1602 = env_1799 => env_1799.$1;
const dropSatisfiedBounds_1620 = env_2145 => (($gt$gt$eq($instance_461))(gets_56))(ctx_2146 => {
  const is_2147 = getInstances_1602(env_2145);
  const bs_2148 = getBounds_1588(ctx_2146);
  const bs2_2149 = (filter(b_2150 => not_30((exists_36(i_2151 => (satisfiesBound_1634(i_2151))(b_2150)))(is_2147))))(bs_2148);
  return sets_57((setBounds_1589(bs2_2149))(ctx_2146))
});
const freeVars_1627 = e_2221 => {
  const freeVarsInPData_2223 = p_2228 => {
    if(p_2228.$tag==2){
      return ((foldl((mergeSet_48($instance_412))($instance_410)))([p_2228.$1]))((map(freeVarsInPData_2223))(p_2228.$2))
    } else return []
  };
  const freeVarsInPat_2222 = p_2224 => (((mergeSet_48($instance_412))($instance_410))((filter(v_2227 => not_30(((contains_32($instance_410))(v_2227))(namesInPat_766(p_2224.$0)))))(freeVars_1627(p_2224.$1))))(freeVarsInPData_2223(p_2224.$0));
  if(e_2221.$tag==0){
    return [e_2221.$1]
  } else if(e_2221.$tag==1){
    return []
  } else if(e_2221.$tag==2){
    return (((mergeSet_48($instance_412))($instance_410))(freeVars_1627(e_2221.$1)))(freeVars_1627(e_2221.$2))
  } else if(e_2221.$tag==3){
    return (filter(v_2243 => (($div$eq_17($instance_410))(v_2243))(e_2221.$1)))(freeVars_1627(e_2221.$2))
  } else if(e_2221.$tag==4){
    return ((foldl((mergeSet_48($instance_412))($instance_410)))(freeVars_1627(e_2221.$1)))((map(freeVarsInPat_2222))(e_2221.$2))
  } else if(e_2221.$tag==5){
    return (filter(v_2250 => not_30(((contains_32($instance_410))(v_2250))((map(fst_26))(e_2221.$1)))))(((foldl((mergeSet_48($instance_412))($instance_410)))(freeVars_1627(e_2221.$2)))((map(d_2251 => freeVars_1627(snd_27(d_2251))))(e_2221.$1)))
  } else if(e_2221.$tag==6){
    return ((foldl((mergeSet_48($instance_412))($instance_410)))([]))((map(freeVars_1627))(e_2221.$2))
  } else error("pattern match fail",e_2221)
};
const dfs_567 = local$instance$Eq$1 => local$instance$Hashable$0 => g_571 => visited_572 => v_573 => {
  const visit_574 = r_575 => e_576 => {
    const $phi$409 = (((contains_32(local$instance$Eq$1))(e_576))(r_575))||(((contains_32(local$instance$Eq$1))(e_576))(visited_572));
    if($phi$409){
      return r_575
    } else if(!$phi$409){
      return (concat(((((dfs_567(local$instance$Eq$1))(local$instance$Hashable$0))(g_571))((push(v_573))((concat(r_575))(visited_572))))(e_576)))(r_575)
    } else error("pattern match fail",$phi$409)
  };
  const $phi$411 = (((lookup_63(local$instance$Hashable$0))(local$instance$Eq$1))(v_573))(g_571);
  if($phi$411.$tag==0){
    return ($_16(enqueue(v_573)))(((foldr(visit_574))([]))($phi$411.$0))
  } else if($phi$411.$tag==1){
    return []
  } else error("pattern match fail",$phi$411)
};
const fullDfs_568 = local$instance$Eq$1 => local$instance$Hashable$0 => g_578 => {
  const visit_579 = result_580 => v_581 => __582 => {
    const $phi$413 = ((contains_32(local$instance$Eq$1))(v_581))(result_580);
    if($phi$413){
      return result_580
    } else if(!$phi$413){
      return (concat(((((dfs_567(local$instance$Eq$1))(local$instance$Hashable$0))(g_578))(result_580))(v_581)))(result_580)
    } else error("pattern match fail",$phi$413)
  };
  return ((foldTrie_67(visit_579))([]))(g_578)
};
const scc_569 = local$instance$Hashable$1 => local$instance$Eq$0 => g_583 => {
  const invertEdge_588 = local$instance$Hashable$3 => local$instance$Eq$2 => v_590 => ig_591 => e_592 => {
    const $phi$415 = (((lookup_63(local$instance$Hashable$3))(local$instance$Eq$2))(e_592))(ig_591);
    if($phi$415.$tag==0){
      return ((((insert_64(local$instance$Hashable$3))(local$instance$Eq$2))(e_592))((push(v_590))($phi$415.$0)))(ig_591)
    } else if($phi$415.$tag==1){
      return ((((insert_64(local$instance$Hashable$3))(local$instance$Eq$2))(e_592))([v_590]))(ig_591)
    } else error("pattern match fail",$phi$415)
  };
  const invert_589 = local$instance$Hashable$5 => local$instance$Eq$4 => ig_594 => v_595 => es_596 => {
    let $phi$416;
    const $phi$417 = (((lookup_63(local$instance$Hashable$5))(local$instance$Eq$4))(v_595))(ig_594);
    if($phi$417.$tag==0){
      $phi$416 = ig_594
    } else if($phi$417.$tag==1){
      $phi$416 = (((((insert_64(local$instance$Hashable$5))(local$instance$Eq$4))(v_595))([]))(ig_594))
    } else error("pattern match fail",$phi$417);
    const ig2_597 = $phi$416;
    return ((foldl(((invertEdge_588(local$instance$Hashable$5))(local$instance$Eq$4))(v_595)))(ig2_597))(es_596)
  };
  const invertedG_584 = ((foldTrie_67((invert_589(local$instance$Hashable$1))(local$instance$Eq$0)))(Empty_11))(g_583);
  const assembleCc_585 = local$instance$Eq$7 => local$instance$Hashable$6 => gs_599 => v_600 => {
    const $phi$420 = (exists_36((contains_32(local$instance$Eq$7))(v_600)))(gs_599.$1);
    if($phi$420){
      return (Pair_3(gs_599.$0))(gs_599.$1)
    } else if(!$phi$420){
      const cc_603 = ((((dfs_567(local$instance$Eq$7))(local$instance$Hashable$6))(gs_599.$0))([]))(v_600);
      const ig2_604 = ((foldl(g_605 => v_606 => (((remove_66(local$instance$Hashable$6))(local$instance$Eq$7))(v_606))(g_605)))(gs_599.$0))(cc_603);
      return (Pair_3(ig2_604))((push(cc_603))(gs_599.$1))
    } else error("pattern match fail",$phi$420)
  };
  const firstDfs_586 = ((fullDfs_568(local$instance$Eq$0))(local$instance$Hashable$1))(g_583);
  const ccs_587 = snd_27(((foldl((assembleCc_585(local$instance$Eq$0))(local$instance$Hashable$1)))((Pair_3(invertedG_584))([])))(firstDfs_586));
  return ccs_587
};
const sccSorted_570 = local$instance$Hashable$1 => local$instance$Eq$0 => g_607 => {
  const ccs_608 = ((scc_569(local$instance$Hashable$1))(local$instance$Eq$0))(g_607);
  const topSort_609 = ccs_611 => {
    const f_616 = local$instance$Hashable$3 => local$instance$Eq$2 => r_617 => icc_618 => ((foldl(r_621 => c_622 => ((((insert_64(local$instance$Hashable$3))(local$instance$Eq$2))(c_622))(intToString(icc_618.$0)))(r_621)))(r_617))(icc_618.$1);
    const g2g_612 = ((foldl((f_616(local$instance$Hashable$1))(local$instance$Eq$0)))(Empty_11))(zipWithIndex_40(ccs_611));
    const addGraph_613 = r_623 => v_624 => es_625 => {
      const rv_626 = ($_16(fromJust_24))((((lookup_63(local$instance$Hashable$1))(local$instance$Eq$0))(v_624))(g2g_612));
      const res_627 = (uniq_49($instance_410))(sort((filter(re_628 => (($div$eq_17($instance_410))(re_628))(rv_626)))((map(e_629 => ($_16(fromJust_24))((((lookup_63(local$instance$Hashable$1))(local$instance$Eq$0))(e_629))(g2g_612))))(es_625))));
      const $phi$423 = (((lookup_63($instance_465))($instance_410))(rv_626))(r_623);
      if($phi$423.$tag==1){
        return ((((insert_64($instance_465))($instance_410))(rv_626))(res_627))(r_623)
      } else if($phi$423.$tag==0){
        return ((((insert_64($instance_465))($instance_410))(rv_626))((((mergeSet_48($instance_412))($instance_410))(res_627))($phi$423.$0)))(r_623)
      } else error("pattern match fail",$phi$423)
    };
    const cg_614 = ((foldTrie_67(addGraph_613))(Empty_11))(g_607);
    const ord_615 = ((fullDfs_568($instance_410))($instance_465))(cg_614);
    return reverse_50((map(i_631 => (getIx(unsafeStringToInt(i_631)))(ccs_611)))(ord_615))
  };
  const result_610 = topSort_609(ccs_608);
  return result_610
};
const bindingsScc_1621 = bs_2152 => {
  const ns_2153 = (map(fst_26))(bs_2152);
  const g_2154 = ((foldl(g_2156 => d_2157 => ((((insert_64($instance_465))($instance_410))(d_2157.$0))((filter(v_2160 => (((contains_32($instance_410))(v_2160))(ns_2153))&&((($div$eq_17($instance_410))(v_2160))(d_2157.$0))))(freeVars_1627(d_2157.$1))))(g_2156)))(Empty_11))(bs_2152);
  const ccs_2155 = ((sccSorted_570($instance_465))($instance_410))(g_2154);
  return (map(cc_2161 => (filter(b_2162 => ((contains_32($instance_410))(fst_26(b_2162)))(cc_2161)))(bs_2152)))(ccs_2155)
};
const $instance_441 = $class$Functor(f_435 => s_436 => State_10(s_438 => {
  const $phi$427 = s_436.$0(s_438);
  return (Pair_3($phi$427.$0))(f_435($phi$427.$1))
}));
const getBindings_1597 = env_1772 => env_1772.$0;
const f1_1604 = a_1823 => b_1824 => ((TApp_748(Empty_11))(((TApp_748(Empty_11))((TConst_745(Empty_11))("->")))(a_1823)))(b_1824);
const errorM_1590 = s_1743 => (($gt$gt$eq($instance_461))(gets_56))(ctx_1744 => error(ctx_1744.$3(s_1743)));
const addBindings_1599 = nbs_1782 => env_1783 => ((IEnv_1575((((mergeTrie_71($instance_465))($instance_410))(env_1783.$0))(nbs_1782)))(env_1783.$1))(((foldTrie_67(fvs_1787 => __1788 => t_1789 => (((setUnion_79($instance_465))($instance_410))(fvs_1787))(freeTVars_1603(t_1789))))(env_1783.$2))(nbs_1782));
const infer_1615 = env_1980 => e_1981 => {
  const setFinalType_1982 = t_1986 => e_1987 => {
    const $phi$432 = getType_774(e_1987);
    if($phi$432.$tag==7){
      return (ret($instance_461))((setType_771(t_1986))(e_1987))
    } else if($phi$432.$tag==6){
      return (ret($instance_461))(e_1987)
    } else return (($gt$gt_21($instance_461))((unifyM_1611(t_1986))($phi$432)))((ret($instance_461))(e_1987))
  };
  const inferPat_1984 = env_2002 => te_2003 => pat_2004 => {
    if(pat_2004.$tag==0){
      return (($gt$gt$eq($instance_461))(newTVarM_1583))(tv_2007 => (($gt$gt_21($instance_461))((unifyM_1611(te_2003))(tv_2007)))((ret($instance_461))((Pair_3(((((insert_64($instance_465))($instance_410))(pat_2004.$1))(tv_2007))(Empty_11)))((PVar_735((setAnnType_761(tv_2007))(pat_2004.$0)))(pat_2004.$1)))))
    } else if((pat_2004.$tag==1)&&(pat_2004.$1.$tag==0)){
      return (($gt$gt_21($instance_461))((unifyM_1611(te_2003))((TConst_745(Empty_11))("Number"))))((ret($instance_461))((Pair_3(Empty_11))(pat_2004)))
    } else if((pat_2004.$tag==1)&&(pat_2004.$1.$tag==1)){
      return (($gt$gt_21($instance_461))((unifyM_1611(te_2003))((TConst_745(Empty_11))("String"))))((ret($instance_461))((Pair_3(Empty_11))(pat_2004)))
    } else if(pat_2004.$tag==2){
      return (($gt$gt$eq($instance_461))((getBindingM_1596(pat_2004.$1))(env_2002)))(bt_2015 => {
        if(bt_2015.$tag==1){
          return error("unknown data type "+pat_2004.$1)
        } else if(bt_2015.$tag==0){
          return (($gt$gt$eq($instance_461))(instantiateM_1606(bt_2015.$0)))(t_2017 => {
            const $phi$436 = unrollDataConType_1624(t_2017);
            const $phi$438 = (($eq$eq($instance_409))(length(pat_2004.$2)))(length($phi$436.$0));
            if(!$phi$438){
              return errorM_1590("number of pattern params does not match the number of constructor params")
            } else if($phi$438){
              return (($gt$gt$eq($instance_461))((((foldM_53($instance_461))(inferSubPat_1985(env_2002)))((Pair_3(Empty_11))([])))((zip_41(pat_2004.$2))($phi$436.$0))))(bps_2020 => (($gt$gt_21($instance_461))((unifyM_1611(te_2003))($phi$436.$1)))(($_16(ret($instance_461)))((Pair_3(bps_2020.$0))(((PData_737(pat_2004.$0))(pat_2004.$1))(bps_2020.$1)))))
            } else error("pattern match fail",$phi$438)
          })
        } else error("pattern match fail",bt_2015)
      })
    } else error("pattern match fail",pat_2004)
  };
  const inferSubPat_1985 = env_2023 => bp_2024 => pt_2025 => (($gt$gt$eq($instance_461))(((inferPat_1984(env_2023))(pt_2025.$1))(pt_2025.$0)))(bp_2030 => ($_16(ret($instance_461)))((Pair_3((((mergeTrie_71($instance_465))($instance_410))(bp_2024.$0))(bp_2030.$0)))((push(bp_2030.$1))(bp_2024.$1))));
  const inferCase_1983 = env_1993 => te_1994 => p_1995 => (($gt$gt$eq($instance_461))(((inferPat_1984(env_1993))(te_1994))(p_1995.$0)))(cb_1998 => (($gt$gt$eq($instance_461))((infer_1615((addBindings_1599(cb_1998.$0))(env_1993)))(p_1995.$1)))(e_2001 => (ret($instance_461))((Pair_3(cb_1998.$1))(e_2001))));
  let $phi$445;
  if((e_1981.$tag==1)&&(e_1981.$1.$tag==0)){
    $phi$445 = ((setFinalType_1982((TConst_745(Empty_11))("Number")))(e_1981))
  } else if((e_1981.$tag==1)&&(e_1981.$1.$tag==1)){
    $phi$445 = ((setFinalType_1982((TConst_745(Empty_11))("String")))(e_1981))
  } else if(e_1981.$tag==0){
    $phi$445 = ((($gt$gt$eq($instance_461))((getBindingM_1596(e_1981.$1))(env_1980)))(vt_2039 => {
      if(vt_2039.$tag==1){
        return errorM_1590((("unknown identifier "+e_1981.$1)+", env: ")+(jsonStringify(($_16(trieKeys_72))(getBindings_1597(env_1980)))))
      } else if(vt_2039.$tag==0){
        return (($gt$gt$eq($instance_461))(instantiateM_1606(vt_2039.$0)))(t_2041 => (setFinalType_1982(t_2041))(e_1981))
      } else error("pattern match fail",vt_2039)
    }))
  } else if(e_1981.$tag==3){
    $phi$445 = ((($gt$gt$eq($instance_461))(newTVarM_1583))(tv_2045 => (($gt$gt$eq($instance_461))((infer_1615(((addBinding_1598(e_1981.$1))(tv_2045))(env_1980)))(e_1981.$2)))(a_2046 => (setFinalType_1982(((TApp_748(Empty_11))(((TApp_748(Empty_11))((TConst_745(Empty_11))("->")))(tv_2045)))(getType_774(a_2046))))(((Lam_729(e_1981.$0))(e_1981.$1))(a_2046)))))
  } else if(e_1981.$tag==2){
    $phi$445 = ((($gt$gt$eq($instance_461))(newTVarM_1583))(tv_2050 => (($gt$gt$eq($instance_461))((infer_1615(env_1980))(e_1981.$1)))(f_2051 => (($gt$gt$eq($instance_461))((infer_1615(env_1980))(e_1981.$2)))(a_2052 => {
      const synth_2053 = (f1_1604(getType_774(a_2052)))(tv_2050);
      return (($gt$gt_21($instance_461))((unifyM_1611(getType_774(f_2051)))(synth_2053)))((setFinalType_1982(tv_2050))(((App_728(e_1981.$0))(f_2051))(a_2052)))
    }))))
  } else if(e_1981.$tag==4){
    $phi$445 = ((($gt$gt$eq($instance_461))((infer_1615(env_1980))(e_1981.$1)))(e_2057 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))((inferCase_1983(env_1980))(getType_774(e_2057))))(e_1981.$2)))(ps_2058 => {
      const t_2059 = getType_774(snd_27(head_44(ps_2058)));
      return (($gt$gt_21($instance_461))(((mapM_54($instance_461))(p_2060 => (unifyM_1611(t_2059))(($_16(getType_774))(snd_27(p_2060)))))(tail_45(ps_2058))))((setFinalType_1982(t_2059))(((Case_730(e_1981.$0))(e_2057))(ps_2058)))
    })))
  } else if(e_1981.$tag==5){
    $phi$445 = ((($gt$gt$eq($instance_461))((inferDefs_1622(env_1980))(e_1981.$1)))(ds_2064 => {
      const env2_2065 = ((foldl(env_2066 => d_2067 => ((addBinding_1598(d_2067.$0))(getType_774(d_2067.$1)))(env_2066)))(env_1980))(ds_2064);
      return (($gt$gt$eq($instance_461))((infer_1615(env2_2065))(e_1981.$2)))(e_2070 => (setFinalType_1982(getType_774(e_2070)))(((Let_731(e_1981.$0))(ds_2064))(e_2070)))
    }))
  } else if((e_1981.$tag==6)&&("Array"==e_1981.$1)){
    $phi$445 = ((($gt$gt$eq($instance_461))(((mapM_54($instance_461))(infer_1615(env_1980)))(e_1981.$2)))(es_2073 => (($gt$gt$eq($instance_461))(newTVarM_1583))(tv_2074 => (($gt$gt_21($instance_461))(((mapM_54($instance_461))(e_2075 => (unifyM_1611(tv_2074))(getType_774(e_2075))))(es_2073)))((setFinalType_1982(((TApp_748(Empty_11))((TConst_745(Empty_11))("Array")))(tv_2074)))(((New_732(e_1981.$0))("Array"))(es_2073))))))
  } else if(e_1981.$tag==6){
    $phi$445 = ((($gt$gt$eq($instance_461))(((mapM_54($instance_461))(infer_1615(env_1980)))(e_1981.$2)))(es_2079 => (($gt$gt$eq($instance_461))((getBindingM_1596(e_1981.$1))(env_1980)))(t_2080 => {
      if(t_2080.$tag==1){
        return error("unknown data constructor "+e_1981.$1)
      } else if(t_2080.$tag==0){
        return (($gt$gt$eq($instance_461))(instantiateM_1606(t_2080.$0)))(t_2082 => {
          const $phi$448 = unrollDataConType_1624(t_2082);
          const $phi$450 = (($eq$eq($instance_409))(length(es_2079)))(length($phi$448.$0));
          if(!$phi$450){
            return errorM_1590((("number of New args does not match the number of constructor params "+(jsonStringify(es_2079)))+" ")+(printType_1285(t_2082)))
          } else if($phi$450){
            return (($gt$gt_21($instance_461))(((mapM_54($instance_461))(p_2085 => (unifyM_1611(p_2085.$0))(getType_774(p_2085.$1))))((zip_41($phi$448.$0))(es_2079))))((setFinalType_1982($phi$448.$1))(((New_732(e_1981.$0))(e_1981.$1))(es_2079)))
          } else error("pattern match fail",$phi$450)
        })
      } else error("pattern match fail",t_2080)
    })))
  } else $phi$445 = (error("type inference not supported for this AST node"));
  return ($_16(withLocError_1614(e_1981)))($phi$445)
};
const inferSccDefs_1616 = env_2089 => ds_2090 => {
  const generalizeDef_2094 = env_2113 => d_2114 => {
    const $phi$456 = getType_774(d_2114.$1);
    if($phi$456.$tag==6){
      return (ret($instance_461))(d_2114)
    } else return (($gt$gt$eq($instance_461))((generalize_1623(env_2113))($phi$456)))(t_2122 => {
      const e2_2123 = skolemize_1619((setType_771(t_2122))(d_2114.$1));
      return (ret($instance_461))((Pair_3(d_2114.$0))(e2_2123))
    })
  };
  const inferDef_2092 = env_2099 => d_2100 => (($gt$gt$eq($instance_461))((infer_1615(env_2099))(d_2100.$1)))(e_2103 => (ret($instance_461))((Pair_3(d_2100.$0))(e_2103)));
  const unifyDef_2093 = env_2104 => d_2105 => {
    const $phi$460 = getType_774(d_2105.$1);
    if($phi$460.$tag==6){
      return (ret($instance_461))(Unit_0)
    } else return (unifyM_1611($phi$460))(($_16(fromJust_24))((getBinding_1595(d_2105.$0))(env_2104)))
  };
  const generateTVar_2091 = env_2095 => d_2096 => {
    const $phi$462 = getType_774(snd_27(d_2096));
    if($phi$462.$tag==7){
      return (($gt$gt$eq($instance_461))(newTVarM_1583))(tv_2097 => (ret($instance_461))(((addBinding_1598(fst_26(d_2096)))(tv_2097))(env_2095)))
    } else return (ret($instance_461))(((addBinding_1598(fst_26(d_2096)))($phi$462))(env_2095))
  };
  return (($gt$gt$eq($instance_461))((((foldM_53($instance_461))(generateTVar_2091))(env_2089))(ds_2090)))(env2_2124 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(inferDef_2092(env2_2124)))(ds_2090)))(ds2_2125 => (($gt$gt$eq($instance_461))((($gt$gt_21($instance_461))(((mapM_54($instance_461))(unifyDef_2093(env2_2124)))(ds2_2125)))(((mapM_54($instance_461))(applySubsDef_1625))(ds2_2125))))(ds3_2126 => (($gt$gt_21($instance_461))(dropSatisfiedBounds_1620(env_2089)))(((mapM_54($instance_461))(generalizeDef_2094(env_2089)))(ds3_2126)))))
};
const inferDefs_1622 = env_2163 => ds_2164 => {
  const infer_2165 = rs_2166 => ds_2167 => ((fmap($instance_441))(concat(rs_2166)))((inferSccDefs_1616(((foldl(env_2168 => r_2169 => ((addBinding_1598(fst_26(r_2169)))(getType_774(snd_27(r_2169))))(env_2168)))(env_2163))(rs_2166)))(ds_2167));
  return (((foldM_53($instance_461))(infer_2165))([]))(bindingsScc_1621(ds_2164))
};
const inferInstance_1628 = env_2255 => cs_2256 => i_2257 => {
  const inferE_2258 = e_2259 => {
    const $phi$464 = ($_16(runState_58(newCtx_1584)))((infer_1615(env_2255))(e_2259));
    return (applySubsE_1626(getSubs_1585($phi$464.$0)))($phi$464.$1)
  };
  const $phi$468 = (find_33(c_2266 => (($eq$eq($instance_410))(i_2257.$1))(c_2266.$1)))(cs_2256);
  if($phi$468.$tag==1){
    return error("Cannot find clas "+i_2257.$1)
  } else if($phi$468.$tag==0){
    const bs2_2275 = ((foldl(bs_2277 => b_2278 => ((((insert_64($instance_465))($instance_410))(b_2278.$0))(((substitute_1608($phi$468.$0.$2))(i_2257.$2))(b_2278.$1)))(bs_2277)))(Empty_11))($phi$468.$0.$3);
    const ds2_2276 = (map(d_2281 => (Pair_3(d_2281.$0))(inferE_2258((setType_771(($_16(fromJust_24))((((lookup_63($instance_465))($instance_410))(d_2281.$0))(bs2_2275))))(d_2281.$1)))))(i_2257.$3);
    return (((Instance_743(i_2257.$0))(i_2257.$1))(i_2257.$2))(ds2_2276)
  } else error("pattern match fail",$phi$468)
};
const emptyEnv_1594 = ((IEnv_1575(Empty_11))([]))(Empty_11);
const addInstance_1601 = b_1794 => env_1795 => ((IEnv_1575(env_1795.$0))((push(b_1794))(env_1795.$1)))(env_1795.$2);
const inferTypeModule_1631 = ms_2299 => m_2300 => {
  const checkForUnsatisfiedBounds_2305 = d_2334 => {
    const $phi$473 = getType_774(snd_27(d_2334));
    if($phi$473.$tag==6){
      if(($phi$473.$3.$tag==3)&&(($phi$473.$3.$1.$tag==3)&&(($phi$473.$3.$1.$1.$tag==0)&&("->"==$phi$473.$3.$1.$1.$1)))){
        return d_2334
      } else {
        const $phi$476 = length($phi$473.$2);
        if(0==$phi$476){
          return d_2334
        } else return error((("unsatisfied bounds in def of "+(fst_26(d_2334)))+" :: ")+(printType_1285(getType_774(snd_27(d_2334)))))
      }
    } else return d_2334
  };
  const addIns_2304 = env_2332 => i_2333 => (addInstance_1601(instanceToTypeBound_1629(snd_27(i_2333))))(env_2332);
  const addClass_2303 = env_2328 => c_2329 => ((foldl(env_2330 => b_2331 => ((addBinding_1598(fst_26(b_2331)))(snd_27(b_2331)))(env_2330)))(env_2328))(classToBindings_1630(c_2329));
  const getFile_2301 = i_2306 => {
    if(i_2306.$tag==1){
      return i_2306.$1
    } else error("pattern match fail",i_2306)
  };
  const addImports_2302 = env_2310 => i_2311 => {
    const $phi$479 = (get(getFile_2301(i_2311)))(ms_2299);
    let $phi$480;
    if(i_2311.$tag==1){
      $phi$480 = (((foldl(env_2321 => n_2322 => ((addBinding_1598(n_2322.$1))((get(n_2322.$0))($phi$479.$0)))(env_2321)))(env_2310))(i_2311.$2))
    } else error("pattern match fail",i_2311);
    const env2_2315 = $phi$480;
    const env3_2316 = ((foldl(addClass_2303))(env2_2315))($phi$479.$1);
    const env4_2317 = ((foldTrie_67(env_2325 => __2326 => i_2327 => (addInstance_1601(i_2327))(env_2325)))(env3_2316))($phi$479.$2);
    return env4_2317
  };
  const env2_2355 = ((foldl(addImports_2302))(emptyEnv_1594))(m_2300.$2);
  const env3_2356 = ((foldl(addClass_2303))(env2_2355))(m_2300.$4);
  const env4_2357 = ((foldl(addIns_2304))(env3_2356))(m_2300.$5);
  const ds2_2358 = (evalState_59(newCtx_1584))((inferDefs_1622(env4_2357))(m_2300.$6));
  const ds3_2359 = (map(checkForUnsatisfiedBounds_2305))(ds2_2358);
  const env5_2360 = ((foldl(env_2362 => d_2363 => ((addBinding_1598(d_2363.$0))(getType_774(d_2363.$1)))(env_2362)))(env4_2357))(ds3_2359);
  const allCls_2366 = (concat(m_2300.$4))((concatMap_42(i_2367 => {
    const $phi$485 = (get(getFile_2301(i_2367)))(ms_2299);
    return $phi$485.$1
  }))(m_2300.$2));
  const ins2_2361 = (map(mapSnd_86((inferInstance_1628(env5_2360))(allCls_2366))))(m_2300.$5);
  return ((((((Module_738(m_2300.$0))(m_2300.$1))(m_2300.$2))(m_2300.$3))(m_2300.$4))(ins2_2361))(ds3_2359)
};
const getTypedExports_1632 = m_2371 => {
  const collectExports_2379 = es_2381 => b_2382 => {
    const e_2383 = snd_27(b_2382);
    const $phi$488 = (((getAnn_757($instance_465))($instance_410))("export"))(annOf_772(e_2383));
    if($phi$488.$tag==1){
      return es_2381
    } else if(($phi$488.$tag==0)&&($phi$488.$0.$tag==5)){
      return ((set($phi$488.$0.$0))(getType_774(e_2383)))(es_2381)
    } else error("pattern match fail",$phi$488)
  };
  const bs_2380 = ((foldl(collectExports_2379))(empty))(m_2371.$6);
  return ((ModuleInterface_739(bs_2380))(m_2371.$4))(((foldl(m_2385 => p_2386 => ((((insert_64($instance_465))($instance_410))(p_2386.$0))(instanceToTypeBound_1629(p_2386.$1)))(m_2385)))(Empty_11))(m_2371.$5))
};
const getExports_2573 = (($gt$gt$eq($instance_461))(gets_56))(s_2585 => (ret($instance_461))(s_2585.$0));
const typerPass_7190 = m_7247 => (($gt$gt$eq($instance_461))(getExports_2573))(es_7248 => {
  const typed_7249 = (inferTypeModule_1631(es_7248))(m_7247);
  const e_7250 = getTypedExports_1632(typed_7249);
  return (($gt$gt_21($instance_461))(setExports_2574(((set(moduleFile_7177(m_7247)))(e_7250))(es_7248))))((ret($instance_461))(typed_7249))
});
const className_4575 = n_4885 => "$class$"+n_4885;
const className2_4576 = c_4886 => className_4575(c_4886.$1);
const mkClassDictAccessors_4568 = c_4644 => {
  const name_4649 = className2_4576(c_4644);
  const v_4651 = "x_"+name_4649;
  const f_4653 = b_4654 => (PVar_735(Empty_11))((fst_26(b_4654))+"_");
  const bsForPat_4650 = (map(f_4653))(sort(c_4644.$3));
  const rewrite_4652 = b_4655 => (Pair_3(b_4655.$0))((setType_771(b_4655.$1))(((Lam_729(((((setAnn_758($instance_465))($instance_410))("export"))(AnnExport_725(b_4655.$0)))(Empty_11)))(v_4651))(((Case_730(Empty_11))((Var_726(Empty_11))(v_4651)))([(Pair_3(((PData_737(Empty_11))(name_4649))(bsForPat_4650)))((Var_726(Empty_11))(b_4655.$0+"_"))]))));
  return (map(rewrite_4652))(classToBindings_1630(c_4644))
};
const getUid_2575 = (($gt$gt$eq($instance_461))(gets_56))(s_2594 => (ret($instance_461))(s_2594.$1));
const $instance_469 = $class$Functor(f_466 => i_467 => Identity_15(f_466(i_467.$0)));
const $instance_474 = ($class$Applicative(x_470 => Identity_15(x_470)))(f_471 => x_472 => ((fmap($instance_469))(f_471.$0))(x_472));
const $instance_478 = ($class$Monad(pure($instance_474)))(a_475 => f_476 => f_476(a_475.$0));
const getCount_3683 = e_3779 => {
  const $phi$499 = (((getAnn_757($instance_465))($instance_410))("useCount"))(annOf_772(e_3779));
  if(($phi$499.$tag==0)&&($phi$499.$0.$tag==2)){
    return $phi$499.$0.$0
  } else error("pattern match fail",$phi$499)
};
const patSize_3693 = p_3897 => {
  if(p_3897.$tag==0){
    return 1
  } else if(p_3897.$tag==1){
    return 1
  } else if(p_3897.$tag==2){
    return ((foldl(c_3905 => p_3906 => c_3905+(patSize_3693(p_3906))))(1))(p_3897.$2)
  } else error("pattern match fail",p_3897)
};
const exprSize_3692 = e_3869 => {
  if(e_3869.$tag==0){
    return 1
  } else if(e_3869.$tag==1){
    return 1
  } else if(e_3869.$tag==2){
    return (1+(exprSize_3692(e_3869.$1)))+(exprSize_3692(e_3869.$2))
  } else if(e_3869.$tag==3){
    return 1+(exprSize_3692(e_3869.$2))
  } else if(e_3869.$tag==4){
    return 1+(((foldl(c_3883 => p_3884 => (c_3883+(patSize_3693(p_3884.$0)))+(exprSize_3692(p_3884.$1))))(exprSize_3692(e_3869.$1)))(e_3869.$2))
  } else if(e_3869.$tag==5){
    return 1+(((foldl(c_3890 => b_3891 => c_3890+(exprSize_3692(snd_27(b_3891)))))(exprSize_3692(e_3869.$2)))(e_3869.$1))
  } else if(e_3869.$tag==6){
    return ((foldl(c_3895 => e_3896 => c_3895+(exprSize_3692(e_3896))))(1))(e_3869.$2)
  } else error("pattern match fail",e_3869)
};
const mergeCount_3684 = local$instance$Hashable$1 => local$instance$Eq$0 => a_3781 => b_3782 => ((foldTrie_67(a_3783 => k_3784 => v_3785 => ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(k_3784))(v_3785+((justOr_23(0))((((lookup_63(local$instance$Hashable$1))(local$instance$Eq$0))(k_3784))(a_3783)))))(a_3783)))(a_3781))(b_3782);
const chooseForInlining_3694 = baseCount_3907 => bs_3908 => {
  const useCount_3909 = ((foldl((mergeCount_3684($instance_465))($instance_410)))(baseCount_3907))((map(b_3911 => getCount_3683(snd_27(b_3911))))(bs_3908));
  const f_3910 = r_3912 => b_3913 => {
    if(b_3913.$1.$tag==0){
      return ((((insert_64($instance_465))($instance_410))(b_3913.$0))(b_3913.$1))(r_3912)
    } else if(b_3913.$1.$tag==1){
      return ((((insert_64($instance_465))($instance_410))(b_3913.$0))(b_3913.$1))(r_3912)
    } else if(b_3913.$1.$tag==3){
      const $phi$508 = ((($lt($instance_411))(exprSize_3692(b_3913.$1)))(10))||((($eq$eq($instance_409))(1))((justOr_23(0))((((lookup_63($instance_465))($instance_410))(b_3913.$0))(useCount_3909))));
      if(!$phi$508){
        return r_3912
      } else if($phi$508){
        return ((((insert_64($instance_465))($instance_410))(b_3913.$0))(b_3913.$1))(r_3912)
      } else error("pattern match fail",$phi$508)
    } else if(b_3913.$1.$tag==6){
      const $phi$506 = (($eq$eq($instance_409))(1))((justOr_23(0))((((lookup_63($instance_465))($instance_410))(b_3913.$0))(useCount_3909)));
      if(!$phi$506){
        return r_3912
      } else if($phi$506){
        return ((((insert_64($instance_465))($instance_410))(b_3913.$0))(b_3913.$1))(r_3912)
      } else error("pattern match fail",$phi$506)
    } else return r_3912
  };
  return ((foldl(f_3910))(Empty_11))(bs_3908)
};
const JSRef_5041 = $_0_5067 => ({$0:$_0_5067,$tag:0});
const forM_55 = local$instance$Monad$0 => xs_248 => f_249 => ((mapM_54(local$instance$Monad$0))(f_249))(xs_248);
const mapJust_43 = f_213 => xs_214 => {
  const g_215 = r_216 => x_217 => {
    const $phi$510 = f_213(x_217);
    if($phi$510.$tag==1){
      return r_216
    } else if($phi$510.$tag==0){
      return (push($phi$510.$0))(r_216)
    } else error("pattern match fail",$phi$510)
  };
  return ((foldl(g_215))([]))(xs_214)
};
const JSUndefined_5054 = {$tag:13};
const opChar_5680 = c_5978 => {
  if("-"==c_5978){
    return "$mns"
  } else if("+"==c_5978){
    return "$pls"
  } else if("*"==c_5978){
    return "$mul"
  } else if("/"==c_5978){
    return "$div"
  } else if("="==c_5978){
    return "$eq"
  } else if(":"==c_5978){
    return "$col"
  } else if("&"==c_5978){
    return "$amp"
  } else if("|"==c_5978){
    return "$pip"
  } else if("<"==c_5978){
    return "$lt"
  } else if(">"==c_5978){
    return "$gt"
  } else if("^"==c_5978){
    return "$rof"
  } else return c_5978
};
const opName_5679 = op_5974 => {
  if("+"==op_5974){
    return "$add"
  } else if("-"==op_5974){
    return "$del"
  } else if("*"==op_5974){
    return "$mul"
  } else if("&&"==op_5974){
    return "$and"
  } else if("||"==op_5974){
    return "$or"
  } else if("++"==op_5974){
    return "$concat"
  } else if("new"==op_5974){
    return "$new"
  } else return ((foldl(s_5976 => c_5977 => s_5976+(opChar_5680(c_5977))))(""))(strToArray_52(op_5974))
};
const exportObject_5677 = bs_5942 => {
  const f_5943 = b_5944 => {
    const $phi$515 = (((getAnn_757($instance_465))($instance_410))("export"))(annOf_772(b_5944.$1));
    if($phi$515.$tag==1){
      return Nothing_2
    } else if(($phi$515.$tag==0)&&($phi$515.$0.$tag==5)){
      return Just_1((Pair_3(opName_5679($phi$515.$0.$0)))(JSRef_5041(opName_5679(b_5944.$0))))
    } else error("pattern match fail",$phi$515)
  };
  return JSObject_5051((mapJust_43(f_5943))(bs_5942))
};
const breakableDown_779 = f_1089 => (breakableDownAndUp_775(f_1089))(Pair_3);
const checkUndefined_5670 = label_5892 => expr_5893 => ((JSTernary_5047(((JSBinOp_5044("==="))(expr_5893))(JSUndefined_5054)))((JSCall_5045(JSRef_5041("error")))([JSString_5049(label_5892)])))(expr_5893);
const JSSwitch_5063 = $_0_5100 => $_1_5101 => ({$0:$_0_5100,$1:$_1_5101,$tag:5});
const paren_5391 = s_5477 => ("("+s_5477)+")";
const trieEntries_73 = m_368 => ((foldTrie_67(es_369 => k_370 => v_371 => (push((Pair_3(k_370))(v_371)))(es_369)))([]))(m_368);
const isExport_3697 = e_3977 => isJust_25((((getAnn_757($instance_465))($instance_410))("export"))(annOf_772(e_3977)));
const dropDeadBindings_3698 = useCount_3978 => bs_3979 => {
  const f_3980 = b_3981 => {
    const recursiveCount_3985 = (justOr_23(0))((((lookup_63($instance_465))($instance_410))(b_3981.$0))(getCount_3683(b_3981.$1)));
    const totalCount_3984 = (justOr_23(0))((((lookup_63($instance_465))($instance_410))(b_3981.$0))(useCount_3978));
    const keep_3986 = (isExport_3697(b_3981.$1))||((($gt_18($instance_411))(totalCount_3984-recursiveCount_3985))(0));
    if(keep_3986){
      return Just_1((Pair_3(b_3981.$0))(b_3981.$1))
    } else if(!keep_3986){
      const ann_3987 = annOf_772(b_3981.$1);
      const $phi$519 = (((getAnn_757($instance_465))($instance_410))("data"))(ann_3987);
      if($phi$519.$tag==1){
        return Nothing_2
      } else if($phi$519.$tag==0){
        return Just_1((Pair_3(b_3981.$0))((withAnn_773(((((setAnn_758($instance_465))($instance_410))("dead"))(AnnTag_724))(ann_3987)))(b_3981.$1)))
      } else error("pattern match fail",$phi$519)
    } else error("pattern match fail",keep_3986)
  };
  return (mapJust_43(f_3980))(bs_3979)
};
const deadCode_3691 = e_3857 => {
  const f_3858 = e_3859 => {
    if(e_3859.$tag==5){
      const useCount_3863 = ((foldl((mergeCount_3684($instance_465))($instance_410)))(getCount_3683(e_3859.$2)))((map(b_3865 => getCount_3683(snd_27(b_3865))))(e_3859.$1));
      const bs2_3864 = (dropDeadBindings_3698(useCount_3863))(e_3859.$1);
      return ((Let_731(e_3859.$0))(bs2_3864))(e_3859.$2)
    } else return e_3859
  };
  return snd_27(((down_778(a_3867 => e_3868 => (Pair_3(a_3867))(f_3858(e_3868))))(Unit_0))(e_3857))
};
const S_2788 = $_0_2796 => $_1_2797 => ({$0:$_0_2796,$1:$_1_2797});
const addTop_2791 = e_2807 => (($gt$gt$eq($instance_461))(gets_56))(s_2808 => {
  const id_2811 = "$lift"+(intToString(s_2808.$0));
  return (($gt$gt_21($instance_461))(sets_57((S_2788(s_2808.$0+1))((push((Pair_3(id_2811))(e_2807)))(s_2808.$1)))))((ret($instance_461))(id_2811))
});
const rewriteInstance_3405 = env_3460 => i_3461 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(d_3467 => (($gt$gt$eq($instance_461))((rewriteExpr_3404(env_3460))(d_3467.$1)))(e_3470 => (ret($instance_461))((Pair_3(d_3467.$0))(e_3470)))))(i_3461.$1.$3)))(bs_3471 => (($gt$gt$eq($instance_461))(newIdent_3403("$instance")))(insName_3472 => (ret($instance_461))((Pair_3(insName_3472))((((Instance_743(i_3461.$1.$0))(i_3461.$1.$1))(i_3461.$1.$2))(bs_3471)))));
const renameImport_3407 = er_3481 => i_3482 => {
  if((i_3482.$tag==1)&&("./builtins.js"==i_3482.$1)){
    return (ret($instance_461))((Pair_3(er_3481.$0))((push(i_3482))(er_3481.$1)))
  } else if(i_3482.$tag==1){
    const rename_3490 = er_3491 => p_3492 => (($gt$gt$eq($instance_461))(newIdent_3403(p_3492.$1)))(n_3497 => (ret($instance_461))((Pair_3(((set(p_3492.$1))(n_3497))(er_3491.$0)))((push((Pair_3(p_3492.$0))(n_3497)))(er_3491.$1))));
    return (($gt$gt$eq($instance_461))((((foldM_53($instance_461))(rename_3490))((Pair_3(er_3481.$0))([])))(i_3482.$2)))(ens_3498 => (ret($instance_461))((Pair_3(ens_3498.$0))((push(((ImportOpen_754(i_3482.$0))(i_3482.$1))(ens_3498.$1)))(er_3481.$1))))
  } else error("pattern match fail",i_3482)
};
const rewriteModule_3408 = ms_3501 => m_3502 => (($gt$gt$eq($instance_461))((((foldM_53($instance_461))(renameImport_3407))((Pair_3(empty))([])))(m_3502.$2)))(eis_3510 => (($gt$gt$eq($instance_461))((rewriteBindings_3406(eis_3510.$0))(m_3502.$6)))(ebs_3513 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(rewriteInstance_3405(ebs_3513.$0)))(m_3502.$5)))(ins_3516 => (ret($instance_461))(((((((Module_738(m_3502.$0))(m_3502.$1))(eis_3510.$1))(m_3502.$3))(m_3502.$4))(ins_3516))(ebs_3513.$1)))));
const mkClosure_2789 = captured_2798 => lam_2799 => {
  const $phi$533 = length(captured_2798);
  if(0==$phi$533){
    return lam_2799
  } else return ((New_732(Empty_11))("@closure"))([(Const_727(Empty_11))(CNum_733($phi$533)),((foldr(b_2801 => p_2802 => ((Lam_729(Empty_11))(p_2802))(b_2801)))(lam_2799))(captured_2798)])
};
const setUid_2576 = uid_2598 => (($gt$gt$eq($instance_461))(gets_56))(s_2599 => sets_57(((CompilerState_2572(s_2599.$0))(uid_2598))(s_2599.$2)));
const JSBreak_5064 = {$tag:6};
const ParsedArgs_4986 = $_0_4996 => $_1_4997 => $_2_4998 => ({$0:$_0_4996,$1:$_1_4997,$2:$_2_4998});
const getPositional_4989 = p_5015 => p_5015.$0;
const uniquify_3409 = m_3517 => (($gt$gt$eq($instance_461))(getUid_2575))(uid_3518 => (($gt$gt$eq($instance_461))(getExports_2573))(ex_3519 => {
  const r_3520 = (runState_58(uid_3518))((rewriteModule_3408(ex_3519))(m_3517));
  return (($gt$gt_21($instance_461))(setUid_2576(fst_26(r_3520))))((ret($instance_461))(snd_27(r_3520)))
}));
const mapBindingsM_3687 = local$instance$Monad$0 => f_3835 => bs_3836 => ((mapM_54(local$instance$Monad$0))(b_3837 => (($gt$gt$eq(local$instance$Monad$0))((f_3835(b_3837.$0))(b_3837.$1)))(e_3840 => (ret(local$instance$Monad$0))((Pair_3(b_3837.$0))(e_3840)))))(bs_3836);
const requireExpr_5673 = f_5930 => (JSCall_5045(JSRef_5041("_require")))([JSString_5049(f_5930)]);
const combineChecks_5671 = a_5894 => b_5895 => {
  if((a_5894.$tag==9)&&a_5894.$0){
    return b_5895
  } else if((b_5895.$tag==9)&&b_5895.$0){
    return a_5894
  } else return ((JSBinOp_5044("&&"))(a_5894))(b_5895)
};
const importAsBindings_4147 = ens_4180 => dataAnns_4181 => i_4182 => {
  if((i_4182.$tag==1)&&("./builtins.js"==i_4182.$1)){
    return []
  } else if(i_4182.$tag==1){
    const f_4188 = p_4189 => {
      const $phi$542 = (((lookup_63($instance_465))($instance_410))((i_4182.$1+"#")+p_4189.$0))(ens_4180);
      if($phi$542.$tag==0){
        return (Pair_3(p_4189.$1))((Var_726(($_16(justOr_23(Empty_11)))((((lookup_63($instance_465))($instance_410))($phi$542.$0))(dataAnns_4181))))($phi$542.$0))
      } else if($phi$542.$tag==1){
        return error((("mod merger encountered unknown import "+i_4182.$1)+"#")+p_4189.$0)
      } else error("pattern match fail",$phi$542)
    };
    return (map(f_4188))((filter(p_4193 => (($div$eq_17($instance_410))(fst_26(p_4193)))(snd_27(p_4193))))(i_4182.$2))
  } else error("pattern match fail",i_4182)
};
const mergeInto_4146 = a_4155 => b_4156 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(dropExport_4145(a_4155.$1)))(a_4155.$6)))(bs_4164 => (($gt$gt$eq($instance_461))(gets_56))(ns_4165 => {
  const f_4167 = local$instance$Hashable$1 => local$instance$Eq$0 => r_4168 => b_4169 => {
    const $phi$546 = (((getAnn_757($instance_465))($instance_410))("data"))(annOf_772(b_4169.$1));
    if($phi$546.$tag==1){
      return r_4168
    } else if($phi$546.$tag==0){
      return ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(b_4169.$0))(((((setAnn_758($instance_465))($instance_410))("data"))($phi$546.$0))(Empty_11)))(r_4168)
    } else error("pattern match fail",$phi$546)
  };
  const dataAnns_4166 = ((foldl((f_4167($instance_465))($instance_410)))(Empty_11))(bs_4164);
  return (ret($instance_461))(((((((Module_738(a_4155.$0))(b_4156.$1))(a_4155.$2))([]))([]))([]))((concat(bs_4164))((concat((concatMap_42((importAsBindings_4147(ns_4165))(dataAnns_4166)))(b_4156.$2)))(b_4156.$6))))
}));
const mergeModules_4144 = ms_4148 => (evalState_59(Empty_11))((((foldM_53($instance_461))(mergeInto_4146))(head_44(ms_4148)))(tail_45(ms_4148)));
const setAnnCodeLoc_763 = file_888 => line_889 => col_890 => ann_891 => ((((setAnn_758($instance_465))($instance_410))("codeLoc"))(((AnnCodeLoc_721(file_888))(line_889))(col_890)))(ann_891);
const printIndent_5390 = indent_5475 => {
  if(0==indent_5475){
    return ""
  } else return "  "+(printIndent_5390(indent_5475-1))
};
const $gt$eq$gt_84 = local$instance$Monad$0 => a_396 => b_397 => x_398 => (($gt$gt$eq(local$instance$Monad$0))(a_396(x_398)))(b_397);
const JSConst_5061 = $_0_5096 => $_1_5097 => ({$0:$_0_5096,$1:$_1_5097,$tag:3});
const JSNum_5048 = $_0_5082 => ({$0:$_0_5082,$tag:7});
const JSUnOp_5043 = $_0_5070 => $_1_5071 => ({$0:$_0_5070,$1:$_1_5071,$tag:2});
const JSNull_5053 = {$tag:12};
const jsExprToString_5385 = indent_5392 => e_5393 => {
  const printParen_5395 = e_5397 => (jsExprToParenString_5386(indent_5392))(e_5397);
  const print_5394 = e_5396 => (jsExprToString_5385(indent_5392))(e_5396);
  if(e_5393.$tag==12){
    return "null"
  } else if(e_5393.$tag==13){
    return "undefined"
  } else if((e_5393.$tag==9)&&e_5393.$0){
    return "true"
  } else if((e_5393.$tag==9)&&(!e_5393.$0)){
    return "false"
  } else if(e_5393.$tag==7){
    return jsonStringify(e_5393.$0)
  } else if(e_5393.$tag==8){
    return jsonStringify(e_5393.$0)
  } else if(e_5393.$tag==0){
    return e_5393.$0
  } else if((e_5393.$tag==1)&&(e_5393.$1.$tag==8)){
    const $phi$558 = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))(e_5393.$1.$0);
    if(""==$phi$558){
      return (((printParen_5395(e_5393.$0))+"[")+e_5393.$1.$0)+"]"
    } else return ((printParen_5395(e_5393.$0))+".")+$phi$558
  } else if(e_5393.$tag==1){
    return (((printParen_5395(e_5393.$0))+"[")+(print_5394(e_5393.$1)))+"]"
  } else if(e_5393.$tag==2){
    return e_5393.$0+(printParen_5395(e_5393.$1))
  } else if(e_5393.$tag==3){
    return ((printParen_5395(e_5393.$1))+e_5393.$0)+(printParen_5395(e_5393.$2))
  } else if(e_5393.$tag==4){
    return (printParen_5395(e_5393.$0))+(paren_5391((intercalate(","))((map(print_5394))(e_5393.$1))))
  } else if(e_5393.$tag==15){
    return ("new "+(printParen_5395(e_5393.$0)))+(paren_5391((intercalate(","))((map(print_5394))(e_5393.$1))))
  } else if(e_5393.$tag==5){
    let $phi$550;
    const $phi$551 = length(e_5393.$0);
    if(1==$phi$551){
      $phi$550 = (((getIx(0))(e_5393.$0))+" => ")
    } else $phi$550 = (("("+((intercalate(","))(e_5393.$0)))+") => ");
    const params_5417 = $phi$550;
    const full_5419 = bs_5420 => (((((params_5417+"{\n")+(printIndent_5390(indent_5392+1)))+((intercalate(";\n"+(printIndent_5390(indent_5392+1))))((map(jsStmtToString_5388(indent_5392+1)))(bs_5420))))+"\n")+(printIndent_5390(indent_5392)))+"}";
    const $phi$553 = length(e_5393.$1);
    if(1==$phi$553){
      const $phi$555 = head_44(e_5393.$1);
      if($phi$555.$tag==1){
        if($phi$555.$0.$tag==10){
          return params_5417+(paren_5391(print_5394($phi$555.$0)))
        } else return params_5417+(print_5394($phi$555.$0))
      } else return full_5419(e_5393.$1)
    } else return full_5419(e_5393.$1)
  } else if(e_5393.$tag==6){
    return ((((printParen_5395(e_5393.$0))+"?")+(printParen_5395(e_5393.$1)))+":")+(printParen_5395(e_5393.$2))
  } else if(e_5393.$tag==10){
    return ("{"+((intercalate(","))((map(keyValueToString_5387(indent_5392)))(e_5393.$0))))+"}"
  } else if(e_5393.$tag==11){
    return ("["+((intercalate(","))((map(print_5394))(e_5393.$0))))+"]"
  } else if(e_5393.$tag==14){
    return ((printParen_5395(e_5393.$0))+" instanceof ")+(printParen_5395(e_5393.$1))
  } else if(e_5393.$tag==16){
    return (intercalate(","))((map(print_5394))(e_5393.$0))
  } else return error(e_5393)
};
const jsExprToParenString_5386 = indent_5435 => e_5436 => {
  if(e_5436.$tag==0){
    return (jsExprToString_5385(indent_5435))(e_5436)
  } else if(e_5436.$tag==7){
    return (jsExprToString_5385(indent_5435))(e_5436)
  } else if(e_5436.$tag==8){
    return (jsExprToString_5385(indent_5435))(e_5436)
  } else if(e_5436.$tag==9){
    return (jsExprToString_5385(indent_5435))(e_5436)
  } else if(e_5436.$tag==1){
    return (jsExprToString_5385(indent_5435))(e_5436)
  } else if(e_5436.$tag==15){
    return (jsExprToString_5385(indent_5435))(e_5436)
  } else if(e_5436.$tag==10){
    return (jsExprToString_5385(indent_5435))(e_5436)
  } else return paren_5391((jsExprToString_5385(indent_5435))(e_5436))
};
const keyValueToString_5387 = indent_5447 => kv_5448 => (kv_5448.$0+":")+((jsExprToString_5385(indent_5447))(kv_5448.$1));
const jsStmtToString_5388 = indent_5451 => s_5452 => {
  if(s_5452.$tag==0){
    return (jsExprToString_5385(indent_5451))(s_5452.$0)
  } else if(s_5452.$tag==1){
    return "return "+((jsExprToString_5385(indent_5451))(s_5452.$0))
  } else if(s_5452.$tag==2){
    return (("var "+s_5452.$0)+" = ")+((jsExprToString_5385(indent_5451))(s_5452.$1))
  } else if(s_5452.$tag==3){
    return (("const "+s_5452.$0)+" = ")+((jsExprToString_5385(indent_5451))(s_5452.$1))
  } else if(s_5452.$tag==4){
    if(s_5452.$1.$tag==1){
      return "let "+s_5452.$0
    } else if(s_5452.$1.$tag==0){
      return (("let "+s_5452.$0)+" = ")+((jsExprToString_5385(indent_5451))(s_5452.$1.$0))
    } else error("pattern match fail",s_5452.$1)
  } else if(s_5452.$tag==6){
    return "break"
  } else if(s_5452.$tag==5){
    return (((((("switch"+(paren_5391((jsExprToString_5385(indent_5451))(s_5452.$0))))+"{\n")+(printIndent_5390(indent_5451+1)))+((intercalate(";\n"+(printIndent_5390(indent_5451+1))))((map(caseToString_5389(indent_5451+1)))(s_5452.$1))))+"\n")+(printIndent_5390(indent_5451)))+"}"
  } else if(s_5452.$tag==7){
    return (((jsExprToParenString_5386(indent_5451))(s_5452.$0))+" = ")+((jsExprToParenString_5386(indent_5451))(s_5452.$1))
  } else if(s_5452.$tag==8){
    let $phi$562;
    const $phi$563 = length(s_5452.$2);
    if(1==$phi$563){
      $phi$562 = ((jsStmtToString_5388(indent_5451))((getIx(0))(s_5452.$2)))
    } else $phi$562 = ((((("{\n"+(printIndent_5390(indent_5451+1)))+((intercalate(";\n"+(printIndent_5390(indent_5451+1))))((map(jsStmtToString_5388(indent_5451+1)))(s_5452.$2))))+"\n")+(printIndent_5390(indent_5451)))+"}");
    const els_5469 = $phi$562;
    return ((((((("if("+((jsExprToString_5385(indent_5451))(s_5452.$0)))+"){\n")+(printIndent_5390(indent_5451+1)))+((intercalate(";\n"+(printIndent_5390(indent_5451+1))))((map(jsStmtToString_5388(indent_5451+1)))(s_5452.$1))))+"\n")+(printIndent_5390(indent_5451)))+"} else ")+els_5469
  } else error("pattern match fail",s_5452)
};
const caseToString_5389 = indent_5471 => c_5472 => ((("case "+(paren_5391((jsExprToString_5385(indent_5471))(c_5472.$0))))+":\n")+(printIndent_5390(indent_5471+1)))+((intercalate(";\n"+(printIndent_5390(indent_5471+1))))((map(jsStmtToString_5388(indent_5471)))(c_5472.$1)));
const mapBindings_3686 = f_3830 => bs_3831 => (map(b_3832 => (Pair_3(b_3832.$0))(f_3830(b_3832.$1))))(bs_3831);
const safeLast_5682 = xs_6008 => {
  const $phi$568 = length(xs_6008);
  if(0==$phi$568){
    return Nothing_2
  } else return Just_1(last_46(xs_6008))
};
const directReturn_5684 = v_6035 => s_6036 => {
  if(s_6036.$tag==4){
    const $phi$575 = (($eq$eq($instance_410))(v_6035))(s_6036.$0);
    if(!$phi$575){
      return [s_6036]
    } else if($phi$575){
      if(s_6036.$1.$tag==1){
        return []
      } else if(s_6036.$1.$tag==0){
        return error("unexpected let assignment")
      } else error("pattern match fail",s_6036.$1)
    } else error("pattern match fail",$phi$575)
  } else if(s_6036.$tag==3){
    const $phi$573 = (($eq$eq($instance_410))(v_6035))(s_6036.$0);
    if(!$phi$573){
      return [s_6036]
    } else if($phi$573){
      return [JSReturn_5059(s_6036.$1)]
    } else error("pattern match fail",$phi$573)
  } else if((s_6036.$tag==7)&&(s_6036.$0.$tag==0)){
    const $phi$571 = (($eq$eq($instance_410))(v_6035))(s_6036.$0.$0);
    if(!$phi$571){
      return [s_6036]
    } else if($phi$571){
      return [JSReturn_5059(s_6036.$1)]
    } else error("pattern match fail",$phi$571)
  } else if(s_6036.$tag==8){
    return [((JSIf_5066(s_6036.$0))((concatMap_42(directReturn_5684(v_6035)))(s_6036.$1)))((concatMap_42(directReturn_5684(v_6035)))(s_6036.$2))]
  } else return [s_6036]
};
const optExpr_5681 = e_5980 => {
  if(e_5980.$tag==0){
    return e_5980
  } else if(e_5980.$tag==1){
    return (JSIndex_5042(optExpr_5681(e_5980.$0)))(optExpr_5681(e_5980.$1))
  } else if(e_5980.$tag==2){
    return (JSUnOp_5043(e_5980.$0))(optExpr_5681(e_5980.$1))
  } else if(e_5980.$tag==3){
    return ((JSBinOp_5044(e_5980.$0))(optExpr_5681(e_5980.$1)))(optExpr_5681(e_5980.$2))
  } else if(e_5980.$tag==4){
    return (JSCall_5045(optExpr_5681(e_5980.$0)))((map(optExpr_5681))(e_5980.$1))
  } else if(e_5980.$tag==5){
    return (JSFun_5046(e_5980.$0))(optStmts_5683(e_5980.$1))
  } else if(e_5980.$tag==6){
    return ((JSTernary_5047(optExpr_5681(e_5980.$0)))(optExpr_5681(e_5980.$1)))(optExpr_5681(e_5980.$2))
  } else if(e_5980.$tag==7){
    return e_5980
  } else if(e_5980.$tag==8){
    return e_5980
  } else if(e_5980.$tag==9){
    return e_5980
  } else if(e_5980.$tag==12){
    return e_5980
  } else if(e_5980.$tag==13){
    return e_5980
  } else if(e_5980.$tag==10){
    return JSObject_5051((map(kv_6000 => (Pair_3(kv_6000.$0))(optExpr_5681(kv_6000.$1))))(e_5980.$0))
  } else if(e_5980.$tag==11){
    return JSArray_5052((map(optExpr_5681))(e_5980.$0))
  } else if(e_5980.$tag==14){
    return (JSInstanceOf_5055(optExpr_5681(e_5980.$0)))(optExpr_5681(e_5980.$1))
  } else if(e_5980.$tag==15){
    return (JSNew_5056(optExpr_5681(e_5980.$0)))((map(optExpr_5681))(e_5980.$1))
  } else error("pattern match fail",e_5980)
};
const optStmts_5683 = ss_6010 => {
  const hasLet_6012 = v_6027 => {
    const f_6028 = s_6029 => {
      if(s_6029.$tag==4){
        return (($eq$eq($instance_410))(v_6027))(s_6029.$0)
      } else return false
    };
    return (exists_36(f_6028))(ss_6010)
  };
  const f_6011 = s_6013 => {
    if(s_6013.$tag==0){
      return JSExpr_5058(optExpr_5681(s_6013.$0))
    } else if(s_6013.$tag==2){
      return (JSVar_5060(s_6013.$0))(optExpr_5681(s_6013.$1))
    } else if(s_6013.$tag==3){
      return (JSConst_5061(s_6013.$0))(optExpr_5681(s_6013.$1))
    } else if(s_6013.$tag==4){
      return (JSLet_5062(s_6013.$0))(((fmap($instance_416))(optExpr_5681))(s_6013.$1))
    } else if(s_6013.$tag==7){
      return (JSAssign_5065(optExpr_5681(s_6013.$0)))(optExpr_5681(s_6013.$1))
    } else if(s_6013.$tag==8){
      return ((JSIf_5066(optExpr_5681(s_6013.$0)))(optStmts_5683(s_6013.$1)))(optStmts_5683(s_6013.$2))
    } else if(s_6013.$tag==1){
      return JSReturn_5059(optExpr_5681(s_6013.$0))
    } else error("pattern match fail",s_6013)
  };
  const $phi$582 = safeLast_5682(ss_6010);
  if(($phi$582.$tag==0)&&(($phi$582.$0.$tag==1)&&($phi$582.$0.$0.$tag==0))){
    const $phi$584 = hasLet_6012($phi$582.$0.$0.$0);
    if($phi$584){
      return optStmts_5683((concatMap_42(directReturn_5684($phi$582.$0.$0.$0)))(init_47(ss_6010)))
    } else if(!$phi$584){
      return (map(f_6011))(ss_6010)
    } else error("pattern match fail",$phi$584)
  } else return (map(f_6011))(ss_6010)
};
const newPhi_5661 = (($gt$gt$eq($instance_461))(gets_56))(s_5702 => (($gt$gt_21($instance_461))(sets_57((((RewriteState_5657(s_5702.$0))(s_5702.$1))(s_5702.$2))(s_5702.$3+1))))((ret($instance_461))("$phi$"+(intToString(s_5702.$3)))));
const parseExports_7182 = e_7240 => {
  const bs_7241 = (mapRecord(s_7242 => ($_16(skolemizeType_1618))((evalState_59(newCtx_1584))((generalize_1623(emptyEnv_1594))(parseT_7181(s_7242))))))(e_7240);
  return ((ModuleInterface_739(bs_7241))([]))(Empty_11)
};
const optBindings_3680 = env_3710 => bs_3711 => {
  const scc_3712 = bindingsScc_1621(bs_3711);
  const optCc_3713 = env_3715 => bs_3716 => {
    const f_3717 = local$instance$Hashable$1 => local$instance$Eq$0 => oe_3718 => b_3719 => {
      const e2_3724 = (optExpr_3681(env_3715))(b_3719.$1);
      if(e2_3724.$tag==0){
        return (Pair_3(oe_3718.$0))(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(b_3719.$0))(e2_3724))(oe_3718.$1))
      } else if(e2_3724.$tag==1){
        return (Pair_3(oe_3718.$0))(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(b_3719.$0))(e2_3724))(oe_3718.$1))
      } else return (Pair_3((push((Pair_3(b_3719.$0))(e2_3724)))(oe_3718.$0)))(((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(b_3719.$0))(e2_3724))(oe_3718.$1))
    };
    return ((foldl((f_3717($instance_465))($instance_410)))((Pair_3([]))(env_3715)))(bs_3716)
  };
  const f_3714 = oe_3730 => bs_3731 => {
    const be_3734 = (optCc_3713(oe_3730.$1))(bs_3731);
    return (Pair_3((concat(oe_3730.$0))(fst_26(be_3734))))(snd_27(be_3734))
  };
  return ((foldl(f_3714))((Pair_3([]))(env_3710)))(scc_3712)
};
const optExpr_3681 = env_3735 => e_3736 => {
  if(e_3736.$tag==0){
    const $phi$596 = (((lookup_63($instance_465))($instance_410))(e_3736.$1))(env_3735);
    if(($phi$596.$tag==0)&&($phi$596.$0.$tag==0)){
      return (Var_726(e_3736.$0))($phi$596.$0.$1)
    } else if(($phi$596.$tag==0)&&($phi$596.$0.$tag==1)){
      return (Const_727(e_3736.$0))($phi$596.$0.$1)
    } else return e_3736
  } else if(e_3736.$tag==2){
    return ((App_728(e_3736.$0))((optExpr_3681(env_3735))(e_3736.$1)))((optExpr_3681(env_3735))(e_3736.$2))
  } else if(e_3736.$tag==3){
    return ((Lam_729(e_3736.$0))(e_3736.$1))((optExpr_3681(env_3735))(e_3736.$2))
  } else if(e_3736.$tag==5){
    const $phi$594 = (optBindings_3680(env_3735))(e_3736.$1);
    return ((Let_731(e_3736.$0))($phi$594.$0))((optExpr_3681($phi$594.$1))(e_3736.$2))
  } else if(e_3736.$tag==4){
    return ((Case_730(e_3736.$0))((optExpr_3681(env_3735))(e_3736.$1)))((map(optPat_3682(env_3735)))(e_3736.$2))
  } else if(e_3736.$tag==1){
    return e_3736
  } else if(e_3736.$tag==6){
    const $phi$592 = (((lookup_63($instance_465))($instance_410))(e_3736.$1))(env_3735);
    if(($phi$592.$tag==0)&&($phi$592.$0.$tag==0)){
      return ((New_732(e_3736.$0))($phi$592.$0.$1))((map(optExpr_3681(env_3735)))(e_3736.$2))
    } else return ((New_732(e_3736.$0))(e_3736.$1))((map(optExpr_3681(env_3735)))(e_3736.$2))
  } else error("pattern match fail",e_3736)
};
const optPat_3682 = env_3766 => pe_3767 => {
  const f_3770 = p_3771 => {
    if(p_3771.$tag==2){
      const $phi$600 = (((lookup_63($instance_465))($instance_410))(p_3771.$1))(env_3766);
      if(($phi$600.$tag==0)&&($phi$600.$0.$tag==0)){
        return ((PData_737(p_3771.$0))($phi$600.$0.$1))((map(f_3770))(p_3771.$2))
      } else return ((PData_737(p_3771.$0))(p_3771.$1))((map(f_3770))(p_3771.$2))
    } else return p_3771
  };
  return (Pair_3(f_3770(pe_3767.$0)))((optExpr_3681(env_3766))(pe_3767.$1))
};
const inline_3679 = enable_3699 => m_3700 => (($gt$gt$eq($instance_461))(getUid_2575))(uid_3701 => {
  let $phi$602;
  if(enable_3699){
    $phi$602 = (fst_26((optBindings_3680(Empty_11))(m_3700.$6)))
  } else if(!enable_3699){
    $phi$602 = m_3700.$6
  } else error("pattern match fail",enable_3699);
  const obs_3709 = $phi$602;
  return (ret($instance_461))(((((((Module_738(m_3700.$0))(m_3700.$1))(m_3700.$2))(m_3700.$3))(m_3700.$4))(m_3700.$5))(obs_3709))
});
const buildImports_5674 = f_5931 => ns_5932 => (map(n_5933 => (JSConst_5061(opName_5679(n_5933.$1)))((JSIndex_5042(requireExpr_5673(f_5931)))(JSString_5049(opName_5679(n_5933.$0))))))(ns_5932);
const importToJs_5675 = i_5936 => {
  if(i_5936.$tag==1){
    return (buildImports_5674(i_5936.$1))(i_5936.$2)
  } else error("pattern match fail",i_5936)
};
const addStmt_5659 = stmt_5694 => (($gt$gt$eq($instance_461))(gets_56))(s_5695 => sets_57((((RewriteState_5657(s_5695.$0))(s_5695.$1))((push(stmt_5694))(s_5695.$2)))(s_5695.$3)));
const addConst_5660 = n_5700 => e_5701 => addStmt_5659((JSConst_5061(opName_5679(n_5700)))(e_5701));
const withRep_5663 = rep_5720 => m_5721 => (($gt$gt$eq($instance_461))(gets_56))(s_5722 => (($gt$gt$eq($instance_461))((($gt$gt_21($instance_461))(sets_57((((RewriteState_5657(s_5722.$0))((((mergeTrie_71($instance_465))($instance_410))(s_5722.$1))(rep_5720)))(s_5722.$2))(s_5722.$3))))(m_5721)))(r_5727 => (($gt$gt$eq($instance_461))(gets_56))(s_5728 => (($gt$gt_21($instance_461))(sets_57((((RewriteState_5657(s_5728.$0))(s_5722.$1))(s_5728.$2))(s_5728.$3))))((ret($instance_461))(r_5727)))));
const ArgBool_4984 = $_0_4992 => $_1_4993 => ({$0:$_0_4992,$1:$_1_4993,$tag:0});
const argName_4987 = a_4999 => {
  if(a_4999.$tag==0){
    return a_4999.$0
  } else if(a_4999.$tag==1){
    return a_4999.$0
  } else error("pattern match fail",a_4999)
};
const parseArgs_4988 = defs_5004 => argv_5005 => {
  const parse_5006 = r_5007 => arg_5008 => {
    const $phi$611 = ((($eq$eq($instance_410))((getChar(0))(arg_5008)))("-"))&&((($eq$eq($instance_410))((getChar(1))(arg_5008)))("-"));
    if(!$phi$611){
      return (Pair_3((push(arg_5008))(r_5007.$0)))(r_5007.$1)
    } else if($phi$611){
      const name_5011 = (match("[^=]+"))((drop(2))(arg_5008));
      const value_5012 = (drop(1))((match("=.*"))(arg_5008));
      const $phi$613 = ((contains_32($instance_410))(name_5011))((map(argName_4987))(defs_5004));
      if(!$phi$613){
        return error("unrecognized argument "+arg_5008)
      } else if($phi$613){
        return (Pair_3(r_5007.$0))(((set(name_5011))(value_5012))(r_5007.$1))
      } else error("pattern match fail",$phi$613)
    } else error("pattern match fail",$phi$611)
  };
  const $phi$615 = ((foldl(parse_5006))((Pair_3([]))(empty)))(argv_5005);
  return ((ParsedArgs_4986($phi$615.$0))($phi$615.$1))(defs_5004)
};
const $instance_421 = ($class$Applicative(x_417 => Just_1(x_417)))(f_418 => x_419 => {
  if(f_418.$tag==1){
    return Nothing_2
  } else if(f_418.$tag==0){
    return ((fmap($instance_416))(f_418.$0))(x_419)
  } else error("pattern match fail",f_418)
});
const S_4564 = $_0_4578 => $_1_4579 => $_2_4580 => ({$0:$_0_4578,$1:$_1_4579,$2:$_2_4580});
const setEnv_4571 = env_4672 => s_4673 => ((S_4564(env_4672))(s_4673.$1))(s_4673.$2);
const instanceNameFromBound_4577 = ix_4891 => b_4892 => (("local$instance$"+b_4892.$1)+"$")+(intToString(ix_4891));
const getEnv_4570 = s_4668 => s_4668.$0;
const breakableDownAndUpWithEnv_4573 = getEnv_4762 => setEnv_4763 => down_4764 => up_4765 => a_4766 => e_4767 => {
  const exitScope_4770 = a_4781 => (setEnv_4763(tail_45(getEnv_4762(a_4781))))(a_4781);
  const enterScope_4769 = bs_4777 => a_4778 => {
    const es_4779 = getEnv_4762(a_4778);
    const e_4780 = (merge(head_44(es_4779)))(bs_4777);
    return (setEnv_4763((enqueue(e_4780))(es_4779)))(a_4778)
  };
  const patBindings_4774 = p_4840 => {
    if(p_4840.$tag==1){
      return empty
    } else if(p_4840.$tag==0){
      return ((set(p_4840.$1))(getAnnType_760(p_4840.$0)))(empty)
    } else if(p_4840.$tag==2){
      return ((foldr(env_4848 => p_4849 => (merge(patBindings_4774(p_4849)))(env_4848)))(empty))(p_4840.$2)
    } else error("pattern match fail",p_4840)
  };
  const processUp_4773 = a_4830 => e_4831 => {
    let $phi$621;
    if(e_4831.$tag==3){
      $phi$621 = (exitScope_4770(a_4830))
    } else if(e_4831.$tag==5){
      $phi$621 = (exitScope_4770(a_4830))
    } else $phi$621 = a_4830;
    const a2_4832 = $phi$621;
    return (up_4765(a2_4832))(e_4831)
  };
  const go_4768 = a_4775 => e_4776 => (((breakableDownAndUp_775(processDown_4771))(processUp_4773))(a_4775))(e_4776);
  const processDown_4771 = a_4782 => e_4783 => {
    const $phi$623 = (down_4764(a_4782))(e_4783);
    if($phi$623.$tag==1){
      return Right_9($phi$623.$0)
    } else if($phi$623.$tag==0){
      if($phi$623.$0.$1.$tag==3){
        let $phi$630;
        const $phi$631 = getType_774($phi$623.$0.$1);
        if(($phi$631.$tag==3)&&(($phi$631.$1.$tag==3)&&(($phi$631.$1.$1.$tag==0)&&("->"==$phi$631.$1.$1.$1)))){
          $phi$630 = $phi$631.$1.$2
        } else if(($phi$631.$tag==6)&&(($phi$631.$3.$tag==3)&&(($phi$631.$3.$1.$tag==3)&&(($phi$631.$3.$1.$1.$tag==0)&&("->"==$phi$631.$3.$1.$1.$1))))){
          $phi$630 = $phi$631.$3.$1.$2
        } else $phi$630 = TUnknown_752;
        const t_4790 = $phi$630;
        return Left_8((Pair_3((enterScope_4769(((set($phi$623.$0.$1.$1))(t_4790))(empty)))($phi$623.$0.$0)))($phi$623.$0.$1))
      } else if($phi$623.$0.$1.$tag==5){
        const ts_4808 = ((foldl(ts_4809 => b_4810 => ((set(b_4810.$0))(getType_774(b_4810.$1)))(ts_4809)))(empty))($phi$623.$0.$1.$1);
        return Left_8((Pair_3((enterScope_4769(ts_4808))($phi$623.$0.$0)))($phi$623.$0.$1))
      } else if($phi$623.$0.$1.$tag==4){
        const $phi$626 = (go_4768($phi$623.$0.$0))($phi$623.$0.$1.$1);
        const $phi$628 = ((foldl(processPat_4772))((Pair_3($phi$626.$0))([])))($phi$623.$0.$1.$2);
        return Right_9((Pair_3($phi$628.$0))(((Case_730($phi$623.$0.$1.$0))($phi$626.$1))($phi$628.$1)))
      } else return Left_8((Pair_3($phi$623.$0.$0))($phi$623.$0.$1))
    } else error("pattern match fail",$phi$623)
  };
  const processPat_4772 = ar_4821 => pat_4822 => {
    const bs_4827 = patBindings_4774(pat_4822.$0);
    const $phi$635 = (go_4768((enterScope_4769(bs_4827))(ar_4821.$0)))(pat_4822.$1);
    return (Pair_3(exitScope_4770($phi$635.$0)))((push((Pair_3(pat_4822.$0))($phi$635.$1)))(ar_4821.$1))
  };
  return (go_4768(a_4766))(e_4767)
};
const rewriteExpr_4572 = is_4677 => env_4678 => e_4679 => {
  const rewriteVar_4681 = a_4707 => e_4708 => {
    if(e_4708.$tag==0){
      const $phi$639 = getType_774(e_4708);
      if($phi$639.$tag==6){
        return (Pair_3(a_4707))(e_4708)
      } else {
        const fromEnv_4716 = n_4723 => envs_4724 => {
          const env_4725 = head_44(envs_4724);
          const $phi$641 = (has(n_4723))(env_4725);
          if(!$phi$641){
            return error((("no "+n_4723)+" in env ")+(jsonStringify(keys(env_4725))))
          } else if($phi$641){
            return (get(n_4723))(env_4725)
          } else error("pattern match fail",$phi$641)
        };
        const t_4719 = (fromEnv_4716(e_4708.$1))(getEnv_4570(a_4707));
        const requiredInstances_4718 = tv_4736 => td_4737 => {
          const $phi$643 = ((instantiate_1607(Unit_0))(__4738 => v_4739 => ($_16(Pair_3(Unit_0)))((TVar_746(Empty_11))("$ins$"+v_4739))))(td_4737);
          const subs_4743 = ((unify_1612(s_4744 => "declasser: "+s_4744))(tv_4736))($phi$643.$0.$0);
          return (map(applySubsBound_1610(subs_4743)))($phi$643.$0.$1)
        };
        const is_4720 = (requiredInstances_4718($phi$639))(t_4719);
        const findMatching_4717 = b_4726 => a_4727 => {
          const matching_4731 = (filter(p_4732 => (satisfiesBound_1634(p_4732.$1))(b_4726)))(a_4727.$1);
          const $phi$647 = length(matching_4731);
          if(0==$phi$647){
            return error((("declasser failed to find satisfying instance for "+(printTypeBound_1286(b_4726)))+" ")+(exprLoc_765(e_4708)))
          } else if(1==$phi$647){
            return fst_26((getIx(0))(matching_4731))
          } else return error((("declasser found more than 1 satisfying instance for "+(printTypeBound_1286(b_4726)))+" ")+(exprLoc_765(e_4708)))
        };
        const mis_4721 = (map(b_4746 => (findMatching_4717(b_4746))(a_4707)))(is_4720);
        const e2_4722 = ((foldl(e_4747 => v_4748 => ((App_728(Empty_11))(e_4747))((Var_726(Empty_11))(v_4748))))(e_4708))(mis_4721);
        return (Pair_3(a_4707))(e2_4722)
      }
    } else if(e_4708.$tag==3){
      const dropInstance_4752 = v_4753 => a_4754 => ((S_4564(a_4754.$0))((filter(p_4758 => (($div$eq_17($instance_410))(fst_26(p_4758)))(v_4753)))(a_4754.$1)))(a_4754.$2);
      return (Pair_3((dropInstance_4752(e_4708.$1))(a_4707)))(e_4708)
    } else return (Pair_3(a_4707))(e_4708)
  };
  const boundsToLam_4680 = a_4682 => e_4683 => {
    const addInstance_4684 = b_4686 => a_4687 => {
      const name_4691 = (instanceNameFromBound_4577(a_4687.$2))(b_4686);
      return (Pair_3(((S_4564(a_4687.$0))((push((Pair_3(name_4691))(b_4686)))(a_4687.$1)))(a_4687.$2+1)))(name_4691)
    };
    const rewriteBound_4685 = ae_4692 => ib_4693 => {
      const $phi$652 = (addInstance_4684(ib_4693.$1))(ae_4692.$0);
      return (Pair_3($phi$652.$0))(((Lam_729(Empty_11))($phi$652.$1))(ae_4692.$1))
    };
    const $phi$654 = getType_774(e_4683);
    if($phi$654.$tag==6){
      const $phi$656 = (($gt_18($instance_411))(length($phi$654.$2)))(0);
      if(!$phi$656){
        return (Pair_3(a_4682))(e_4683)
      } else if($phi$656){
        const rewritten_4704 = ((foldr(rewriteBound_4685))((Pair_3(a_4682))((setType_771($phi$654.$3))(e_4683))))(zipWithIndex_40($phi$654.$2));
        return (mapSnd_86(re_4705 => (withAnn_773((((copyAnn_759($instance_465))($instance_410))(["export"]))(annOf_772(e_4683))))(re_4705)))(rewritten_4704)
      } else error("pattern match fail",$phi$656)
    } else return (Pair_3(a_4682))(e_4683)
  };
  return snd_27((((((breakableDownAndUpWithEnv_4573(getEnv_4570))(setEnv_4571))(a_4760 => e_4761 => Left_8((boundsToLam_4680(a_4760))(e_4761))))(rewriteVar_4681))(((S_4564([env_4678]))(is_4677))(0)))(e_4679))
};
const rewriteInstance_4569 = is_4658 => env_4659 => n_4660 => i_4661 => {
  const args_4666 = (map((rewriteExpr_4572(is_4658))(env_4659)))((map(snd_27))(sort(i_4661.$3)));
  const e_4667 = ((foldl(App_728(Empty_11)))((Var_726(Empty_11))(className_4575(i_4661.$1))))(args_4666);
  return (Pair_3(n_4660))((withAnn_773(((((setAnn_758($instance_465))($instance_410))("export"))(AnnExport_725(n_4660)))(Empty_11)))(e_4667))
};
const findImports_7180 = m_7218 => {
  const importFileName_7219 = i_7220 => {
    if(i_7220.$tag==2){
      return i_7220.$1
    } else if(i_7220.$tag==1){
      return i_7220.$1
    } else if(i_7220.$tag==0){
      return i_7220.$1
    } else error("pattern match fail",i_7220)
  };
  return (map(importFileName_7219))(m_7218.$2)
};
const depSort_7179 = mainName_7209 => ms_7210 => {
  const modules_7211 = ((foldl(r_7214 => m_7215 => ((((insert_64($instance_465))($instance_410))(moduleFile_7177(m_7215)))(m_7215))(r_7214)))(Empty_11))(ms_7210);
  const imports_7212 = (mapTrie_68(__7216 => findImports_7180))(modules_7211);
  const ordered_7213 = ((((dfs_567($instance_410))($instance_465))(imports_7212))([]))(mainName_7209);
  return ($_16(reverse_50))((map(n_7217 => ($_16(fromJust_24))((((lookup_63($instance_465))($instance_410))(n_7217))(modules_7211))))(ordered_7213))
};
const reportTimes_2581 = i_2620 => (($gt$gt$eq($instance_461))(gets_56))(s_2621 => {
  const report_2625 = i_2626 => n_2627 => ts_2628 => {
    const total_2630 = ((foldl($add))(0))(ts_2628);
    const count_2629 = length(ts_2628);
    const msg_2631 = ((((("# pass <"+n_2627)+"> executed ")+(intToString(count_2629)))+" times, total runtime ")+(intToString(total_2630)))+"ms";
    return (debug2_83(msg_2631))(i_2626)
  };
  return (ret($instance_461))(((foldTrie_67(report_2625))(i_2620))(s_2621.$2))
});
const parseModule_6739 = runParser_6673(moduleP_6734);
const parse_7178 = fn_7201 => {
  const $phi$662 = (parseModule_6739(readFile(fn_7201)))("//"+fn_7201);
  if($phi$662.$tag==0){
    const $phi$664 = (($eq$eq($instance_409))($phi$662.$1.$1))(length($phi$662.$1.$0));
    if($phi$664){
      return $phi$662.$0
    } else if(!$phi$664){
      return error((fn_7201+": failed to parse all tokens, stopped at ")+(jsonStringify((getIx($phi$662.$1.$1))($phi$662.$1.$0))))
    } else error("pattern match fail",$phi$664)
  } else if($phi$662.$tag==1){
    return error((fn_7201+": ")+$phi$662.$0)
  } else error("pattern match fail",$phi$662)
};
const addRef_3005 = local$instance$Hashable$1 => local$instance$Eq$0 => n_3011 => (($gt$gt$eq($instance_461))(gets_56))(ns_3012 => sets_57((((setAdd_75(local$instance$Hashable$1))(local$instance$Eq$0))(n_3011))(ns_3012)));
const zero = x_$class$Alternative => x_$class$Alternative.$0;
const $instance_463 = $class$Hashable(n_462 => n_462);
const mkBind_2790 = ann_2803 => id_2804 => captured_2805 => {
  const $phi$667 = length(captured_2805);
  if(0==$phi$667){
    return (Var_726(ann_2803))(id_2804)
  } else return ((New_732(ann_2803))("@bind"))((map(Var_726(Empty_11)))((push(id_2804))(captured_2805)))
};
const lift_2792 = top_2812 => e_2813 => {
  if(e_2813.$tag==3){
    const captured_2817 = (filter(v_2819 => not_30(($_16(isJust_25))((((lookup_63($instance_465))($instance_410))(v_2819))(top_2812)))))(freeVars_1627(e_2813));
    const closure_2818 = (mkClosure_2789(captured_2817))(e_2813);
    return (($gt$gt$eq($instance_461))(addTop_2791(closure_2818)))(id_2820 => (ret($instance_461))(((mkBind_2790(e_2813.$0))(id_2820))(captured_2817)))
  } else return (ret($instance_461))(e_2813)
};
const liftBinding_2793 = top_2822 => b_2823 => (($gt$gt$eq($instance_461))(((upM_782($instance_461))(lift_2792(top_2822)))(b_2823.$1)))(e_2826 => (ret($instance_461))((Pair_3(b_2823.$0))(e_2826)));
const liftTop_2794 = uid_2827 => top_2828 => bs_2829 => {
  const $phi$671 = (runState_58((S_2788(uid_2827))([])))(((mapM_54($instance_461))(liftBinding_2793(top_2828)))(bs_2829));
  return (Pair_3($phi$671.$0.$0))((concat($phi$671.$0.$1))($phi$671.$1))
};
const $instance_434 = $class$Functor(f_430 => e_431 => {
  if(e_431.$tag==0){
    return Left_8(e_431.$0)
  } else if(e_431.$tag==1){
    return Right_9(f_430(e_431.$0))
  } else error("pattern match fail",e_431)
});
const normalize_4349 = ms_4380 => freeVars_4381 => i_4382 => {
  if(i_4382.$tag==0){
    return error("closed imports not supported")
  } else if(i_4382.$tag==1){
    return i_4382
  } else if((i_4382.$tag==2)&&("./builtins.js"==i_4382.$1)){
    const $phi$679 = (get("./builtins.js"))(ms_4380);
    return ((ImportOpen_754(i_4382.$0))("./builtins.js"))((map(n_4393 => (Pair_3(n_4393))(n_4393)))(keys($phi$679.$0)))
  } else if(i_4382.$tag==2){
    const $phi$675 = (has(i_4382.$1))(ms_4380);
    if($phi$675){
      const $phi$677 = (get(i_4382.$1))(ms_4380);
      return ((ImportOpen_754(i_4382.$0))(i_4382.$1))((map(n_4399 => (Pair_3(n_4399))(n_4399)))(keys($phi$677.$0)))
    } else if(!$phi$675){
      return error((("no mod "+i_4382.$1)+" in ")+(jsonStringify(keys(ms_4380))))
    } else error("pattern match fail",$phi$675)
  } else error("pattern match fail",i_4382)
};
const liftModule_2795 = m_2833 => (($gt$gt$eq($instance_461))(getUid_2575))(uid_2834 => {
  const fromImp_2842 = s_2844 => i_2845 => {
    if(i_2845.$tag==1){
      return (((setAddAll_76($instance_465))($instance_410))((map(snd_27))(i_2845.$2)))(s_2844)
    } else error("pattern match fail",i_2845)
  };
  const top_2843 = ((foldl(fromImp_2842))((((setAddAll_76($instance_465))($instance_410))((map(fst_26))(m_2833.$6)))(Empty_11)))(m_2833.$2);
  const $phi$683 = ((liftTop_2794(uid_2834))(top_2843))(m_2833.$6);
  return (($gt$gt_21($instance_461))(setUid_2576($phi$683.$0)))((ret($instance_461))(((((((Module_738(m_2833.$0))(m_2833.$1))(m_2833.$2))(m_2833.$3))(m_2833.$4))(m_2833.$5))($phi$683.$1)))
});
const normalizeImports_4348 = ms_4350 => m_4351 => {
  const topLevelNames_4362 = (concat((map(fst_26))(m_4351.$6)))((concatMap_42(ni_4373 => (map(fst_26))(ni_4373.$1.$3)))(m_4351.$5));
  const getFromDefs_4359 = ds_4365 => ((foldl((mergeSet_48($instance_412))($instance_410)))([]))((map(v_4366 => freeVars_1627(snd_27(v_4366))))(ds_4365));
  const freeVarsInIns_4361 = ((foldl((mergeSet_48($instance_412))($instance_410)))([]))((map(ni_4367 => getFromDefs_4359(ni_4367.$1.$3)))(m_4351.$5));
  const freeVarsInDefs_4360 = getFromDefs_4359(m_4351.$6);
  const fvs_4363 = (filter(v_4379 => not_30(((contains_32($instance_410))(v_4379))(topLevelNames_4362))))((((mergeSet_48($instance_412))($instance_410))(freeVarsInDefs_4360))(freeVarsInIns_4361));
  const is2_4364 = (map((normalize_4349(ms_4350))(fvs_4363)))((enqueue((ImportAll_755(Empty_11))("./builtins.js")))(m_4351.$2));
  return ((((((Module_738(m_4351.$0))(m_4351.$1))(is2_4364))(m_4351.$3))(m_4351.$4))(m_4351.$5))(m_4351.$6)
};
const normalizeImportsPass_7189 = m_7245 => (($gt$gt$eq($instance_461))(getExports_2573))(es_7246 => (ret($instance_461))((normalizeImports_4348(es_7246))(m_7245)));
const parseImports_6740 = runParser_6673(many_6244(importP_6733));
const $instance_5040 = $class$Eq(a_5038 => b_5039 => a_5038===b_5039);
const getString_4990 = p_5019 => def_5020 => {
  const $phi$689 = ((contains_32($instance_5040))(def_5020))(p_5019.$2);
  if(!$phi$689){
    return error("unrecognized arg that was not present for parsing")
  } else if($phi$689){
    if(def_5020.$tag==1){
      const $phi$692 = (has(def_5020.$0))(p_5019.$1);
      if(!$phi$692){
        if(def_5020.$1.$tag==0){
          return def_5020.$1.$0
        } else if(def_5020.$1.$tag==1){
          return error("no value for required arg "+def_5020.$0)
        } else error("pattern match fail",def_5020.$1)
      } else if($phi$692){
        return (get(def_5020.$0))(p_5019.$1)
      } else error("pattern match fail",$phi$692)
    } else return error("arg is not a string")
  } else error("pattern match fail",$phi$689)
};
const processImports_3690 = useCount_3855 => is_3856 => is_3856;
const mkClassDictConstructor_4567 = c_4636 => {
  const params_4642 = (map(snd_27))(sort(classToBindings_1630(c_4636)));
  const name_4641 = className_4575(c_4636.$1);
  const type_4643 = ((TApp_748(Empty_11))((TConst_745(Empty_11))(c_4636.$1)))((TVar_746(Empty_11))(c_4636.$2));
  return ((((mkConFun_3206(Nothing_2))(type_4643))([c_4636.$2]))(name_4641))(params_4642)
};
const rewriteImportedInstances_4566 = ms_4615 => _isi_4616 => imp_4617 => {
  if(imp_4617.$tag==1){
    const $phi$698 = (get(imp_4617.$1))(ms_4615);
    const importedClassNames_4626 = (map(n_4629 => (Pair_3(n_4629))(n_4629)))((concatMap_42(c_4630 => (enqueue(className_4575(c_4630.$1)))((map(fst_26))(c_4630.$3))))($phi$698.$1));
    const importedBounds_4627 = trieEntries_73($phi$698.$2);
    const importedInsNames_4628 = (map(ni_4635 => (Pair_3(fst_26(ni_4635)))(fst_26(ni_4635))))(importedBounds_4627);
    return (Pair_3((push(((ImportOpen_754(imp_4617.$0))(imp_4617.$1))((concat(imp_4617.$2))((concat(importedInsNames_4628))(importedClassNames_4626)))))(_isi_4616.$0)))((concat(_isi_4616.$1))(importedBounds_4627))
  } else error("pattern match fail",imp_4617)
};
const importsToTypeEnv_4574 = ms_4850 => is_4851 => {
  const addClass_4853 = env_4864 => c_4865 => ((foldl(env_4866 => b_4867 => ((set(fst_26(b_4867)))(snd_27(b_4867)))(env_4866)))(env_4864))(classToBindings_1630(c_4865));
  const getFile_4852 = i_4855 => {
    if(i_4855.$tag==2){
      return i_4855.$1
    } else if(i_4855.$tag==1){
      return i_4855.$1
    } else if(i_4855.$tag==0){
      return i_4855.$1
    } else error("pattern match fail",i_4855)
  };
  const addImports_4854 = env_4868 => i_4869 => {
    const $phi$702 = (get(getFile_4852(i_4869)))(ms_4850);
    let $phi$703;
    if(i_4869.$tag==2){
      $phi$703 = ((merge(env_4868))($phi$702.$0))
    } else if(i_4869.$tag==1){
      $phi$703 = (((foldl(env_4880 => n_4881 => ((set(n_4881.$1))((get(n_4881.$0))($phi$702.$0)))(env_4880)))(env_4868))(i_4869.$2))
    } else $phi$703 = (error("import type not supported in type inference"));
    const env2_4873 = $phi$703;
    const env3_4874 = ((foldl(addClass_4853))(env2_4873))($phi$702.$1);
    return env3_4874
  };
  return ((foldl(addImports_4854))(empty))((enqueue((ImportAll_755(Empty_11))("./builtins.js")))(is_4851))
};
const declassModule_4565 = ms_4581 => m_4582 => {
  const _isi_4590 = ((foldl(rewriteImportedInstances_4566(ms_4581)))((Pair_3([]))([])))(m_4582.$2);
  const classFuns_4593 = (concat((map(mkClassDictConstructor_4567))(m_4582.$4)))((concatMap_42(mkClassDictAccessors_4568))(m_4582.$4));
  const importedInstances_4592 = snd_27(_isi_4590);
  const availableInstances_4594 = (concat(importedInstances_4592))((map(mapSnd_86(instanceToTypeBound_1629)))(m_4582.$5));
  const importedSymbols_4602 = (importsToTypeEnv_4574(ms_4581))(m_4582.$2);
  const localBindings_4603 = (concat(classFuns_4593))(m_4582.$6);
  const env_4595 = ((foldl(env_4604 => b_4605 => ((set(b_4605.$0))(getType_774(b_4605.$1)))(env_4604)))(importedSymbols_4602))(localBindings_4603);
  const instancesAsDicts_4600 = (map(p_4612 => (((rewriteInstance_4569(availableInstances_4594))(env_4595))(p_4612.$0))(p_4612.$1)))(m_4582.$5);
  const splitData_4608 = d_4609 => {
    const $phi$709 = (((lookup_63($instance_465))($instance_410))("data"))(annOf_772(snd_27(d_4609)));
    if($phi$709.$tag==1){
      return Right_9(d_4609)
    } else if($phi$709.$tag==0){
      return Left_8(d_4609)
    } else error("pattern match fail",$phi$709)
  };
  const _sds_4596 = splitEither_29((map(splitData_4608))(m_4582.$6));
  const nonAdtDs_4598 = snd_27(_sds_4596);
  const declassedDs_4599 = (map(d_4611 => (Pair_3(fst_26(d_4611)))(((rewriteExpr_4572(availableInstances_4594))(env_4595))(snd_27(d_4611)))))(nonAdtDs_4598);
  const adtDs_4597 = fst_26(_sds_4596);
  const finalDs_4601 = (concat(adtDs_4597))((concat(classFuns_4593))((concat(instancesAsDicts_4600))(declassedDs_4599)));
  const impsWithImportedInstances_4591 = fst_26(_isi_4590);
  return ((((((Module_738(m_4582.$0))(m_4582.$1))(impsWithImportedInstances_4591))(m_4582.$3))([]))([]))(finalDs_4601)
};
const mainArg_7185 = (ArgString_4985("main"))(Nothing_2);
const optArg_7186 = (ArgBool_4984("opt"))(Just_1(false));
const parseExpr_6741 = runParser_6673(exprP_6693);
const delRef_3006 = local$instance$Hashable$1 => local$instance$Eq$0 => n_3013 => (($gt$gt$eq($instance_461))(gets_56))(ns_3014 => sets_57((((setRemove_77(local$instance$Hashable$1))(local$instance$Eq$0))(n_3013))(ns_3014)));
const dataConFieldIds_5676 = ts_5940 => (map(p_5941 => "$"+(intToString(fst_26(p_5941)))))(zipWithIndex_40(ts_5940));
const processPattern_5672 = cons_5898 => pm_5899 => p_5900 => {
  if((p_5900.$tag==0)&&("_"==p_5900.$1)){
    return (Pair_3(JSBool_5050(true)))((Pair_3([]))([]))
  } else if(p_5900.$tag==0){
    return (Pair_3(JSBool_5050(true)))((Pair_3([opName_5679(p_5900.$1)]))([pm_5899]))
  } else if((p_5900.$tag==1)&&(p_5900.$1.$tag==0)){
    return (Pair_3(((JSBinOp_5044("=="))(JSNum_5048(p_5900.$1.$0)))(pm_5899)))((Pair_3([]))([]))
  } else if((p_5900.$tag==1)&&(p_5900.$1.$tag==1)){
    return (Pair_3(((JSBinOp_5044("=="))(JSString_5049(p_5900.$1.$0)))(pm_5899)))((Pair_3([]))([]))
  } else if((p_5900.$tag==2)&&("True"==p_5900.$1)){
    return (Pair_3(pm_5899))((Pair_3([]))([]))
  } else if((p_5900.$tag==2)&&("False"==p_5900.$1)){
    return (Pair_3((JSUnOp_5043("!"))(pm_5899)))((Pair_3([]))([]))
  } else if(p_5900.$tag==2){
    let $phi$711;
    const $phi$712 = (((lookup_63($instance_465))($instance_410))(p_5900.$1))(cons_5898);
    if(($phi$712.$tag==0)&&($phi$712.$0.$tag==1)){
      $phi$711 = (JSBool_5050(true))
    } else if(($phi$712.$tag==0)&&($phi$712.$0.$tag==0)){
      $phi$711 = (((JSBinOp_5044("=="))((JSIndex_5042(pm_5899))(JSString_5049("$tag"))))(JSNum_5048($phi$712.$0.$0)))
    } else $phi$711 = (error("unknown data type in code gen: "+p_5900.$1));
    const tagCheck_5915 = $phi$711;
    return ((foldl(a_5918 => b_5919 => (Pair_3((combineChecks_5671(a_5918.$0))(b_5919.$0)))((Pair_3((concat(a_5918.$1.$0))(b_5919.$1.$0)))((concat(a_5918.$1.$1))(b_5919.$1.$1)))))((Pair_3(tagCheck_5915))((Pair_3([]))([]))))((map(p_5926 => ((processPattern_5672(cons_5898))((JSIndex_5042(pm_5899))(JSString_5049("$"+(intToString(p_5926.$0))))))(p_5926.$1)))(zipWithIndex_40(p_5900.$2)))
  } else return error("failure to match pattern during processing")
};
const binOp2_5658 = op_5689 => a_5690 => b_5691 => (($gt$gt$eq($instance_461))(rewriteExpr_5666(a_5690)))(a_5692 => (($gt$gt$eq($instance_461))(rewriteExpr_5666(b_5691)))(b_5693 => (ret($instance_461))(((JSBinOp_5044(op_5689))(a_5692))(b_5693))));
const rewriteExprToStmts_5662 = w_5707 => e_5708 => (($gt$gt$eq($instance_461))(gets_56))(s_5709 => (($gt$gt$eq($instance_461))((($gt$gt_21($instance_461))(sets_57((((RewriteState_5657(s_5709.$0))(s_5709.$1))([]))(s_5709.$3))))(rewriteExpr_5666(e_5708))))(e_5714 => (($gt$gt$eq($instance_461))(gets_56))(s_5715 => (($gt$gt_21($instance_461))(sets_57((((RewriteState_5657(s_5715.$0))(s_5715.$1))(s_5709.$2))(s_5715.$3))))((ret($instance_461))((push(w_5707(e_5714)))(s_5715.$2))))));
const rewriteExpr_5666 = e_5744 => {
  if((e_5744.$tag==0)&&("True"==e_5744.$1)){
    return (ret($instance_461))(JSBool_5050(true))
  } else if((e_5744.$tag==0)&&("False"==e_5744.$1)){
    return (ret($instance_461))(JSBool_5050(false))
  } else if(e_5744.$tag==0){
    return (($gt$gt$eq($instance_461))(getRep_5664(opName_5679(e_5744.$1))))(r_5749 => {
      if(r_5749.$tag==1){
        return (ret($instance_461))(JSRef_5041(opName_5679(e_5744.$1)))
      } else if(r_5749.$tag==0){
        return (ret($instance_461))(r_5749.$0)
      } else error("pattern match fail",r_5749)
    })
  } else if((e_5744.$tag==1)&&(e_5744.$1.$tag==0)){
    return (ret($instance_461))(JSNum_5048(e_5744.$1.$0))
  } else if((e_5744.$tag==1)&&(e_5744.$1.$tag==1)){
    return (ret($instance_461))(JSString_5049(e_5744.$1.$0))
  } else if((e_5744.$tag==2)&&((e_5744.$1.$tag==2)&&((e_5744.$1.$1.$tag==0)&&("+"==e_5744.$1.$1.$1)))){
    return ((binOp2_5658("+"))(e_5744.$1.$2))(e_5744.$2)
  } else if((e_5744.$tag==2)&&((e_5744.$1.$tag==2)&&((e_5744.$1.$1.$tag==0)&&("-"==e_5744.$1.$1.$1)))){
    return ((binOp2_5658("-"))(e_5744.$1.$2))(e_5744.$2)
  } else if((e_5744.$tag==2)&&((e_5744.$1.$tag==2)&&((e_5744.$1.$1.$tag==0)&&("*"==e_5744.$1.$1.$1)))){
    return ((binOp2_5658("*"))(e_5744.$1.$2))(e_5744.$2)
  } else if((e_5744.$tag==2)&&((e_5744.$1.$tag==2)&&((e_5744.$1.$1.$tag==0)&&("++"==e_5744.$1.$1.$1)))){
    return ((binOp2_5658("+"))(e_5744.$1.$2))(e_5744.$2)
  } else if((e_5744.$tag==2)&&((e_5744.$1.$tag==2)&&((e_5744.$1.$1.$tag==0)&&("&&"==e_5744.$1.$1.$1)))){
    return ((binOp2_5658("&&"))(e_5744.$1.$2))(e_5744.$2)
  } else if((e_5744.$tag==2)&&((e_5744.$1.$tag==2)&&((e_5744.$1.$1.$tag==0)&&("||"==e_5744.$1.$1.$1)))){
    return ((binOp2_5658("||"))(e_5744.$1.$2))(e_5744.$2)
  } else if((e_5744.$tag==2)&&((e_5744.$1.$tag==2)&&((e_5744.$1.$1.$tag==0)&&("jsLt"==e_5744.$1.$1.$1)))){
    return ((binOp2_5658("<"))(e_5744.$1.$2))(e_5744.$2)
  } else if((e_5744.$tag==2)&&((e_5744.$1.$tag==2)&&((e_5744.$1.$1.$tag==0)&&("jsEq"==e_5744.$1.$1.$1)))){
    return ((binOp2_5658("==="))(e_5744.$1.$2))(e_5744.$2)
  } else if((e_5744.$tag==2)&&((e_5744.$1.$tag==2)&&((e_5744.$1.$1.$tag==0)&&("bitAnd"==e_5744.$1.$1.$1)))){
    return ((binOp2_5658("&"))(e_5744.$1.$2))(e_5744.$2)
  } else if((e_5744.$tag==2)&&((e_5744.$1.$tag==2)&&((e_5744.$1.$1.$tag==0)&&("bitOr"==e_5744.$1.$1.$1)))){
    return ((binOp2_5658("|"))(e_5744.$1.$2))(e_5744.$2)
  } else if((e_5744.$tag==2)&&((e_5744.$1.$tag==2)&&((e_5744.$1.$1.$tag==0)&&("bitShiftLeft"==e_5744.$1.$1.$1)))){
    return ((binOp2_5658("<<"))(e_5744.$1.$2))(e_5744.$2)
  } else if((e_5744.$tag==2)&&((e_5744.$1.$tag==2)&&((e_5744.$1.$1.$tag==0)&&("bitShiftRight"==e_5744.$1.$1.$1)))){
    return ((binOp2_5658(">>>"))(e_5744.$1.$2))(e_5744.$2)
  } else if(e_5744.$tag==2){
    return (($gt$gt$eq($instance_461))(rewriteExpr_5666(e_5744.$1)))(f_5818 => (($gt$gt$eq($instance_461))(rewriteExpr_5666(e_5744.$2)))(a_5819 => (ret($instance_461))((JSCall_5045(f_5818))([a_5819]))))
  } else if(e_5744.$tag==3){
    return (($gt$gt$eq($instance_461))((rewriteExprToStmts_5662(JSReturn_5059))(e_5744.$2)))(stmts_5823 => (ret($instance_461))((JSFun_5046([e_5744.$1]))(stmts_5823)))
  } else if(e_5744.$tag==4){
    return (($gt$gt$eq($instance_461))(newPhi_5661))(phiOut_5827 => (($gt$gt$eq($instance_461))((($gt$gt_21($instance_461))(addStmt_5659((JSLet_5062(phiOut_5827))(Nothing_2))))(rewriteExpr_5666(e_5744.$1))))(e_5828 => {
      let $phi$728;
      if(e_5828.$tag==0){
        $phi$728 = ((ret($instance_461))(e_5828))
      } else if(e_5828.$tag==1){
        $phi$728 = ((ret($instance_461))(e_5828))
      } else $phi$728 = ((($gt$gt$eq($instance_461))(newPhi_5661))(p_5833 => (($gt$gt_21($instance_461))((addConst_5660(p_5833))(e_5828)))((ret($instance_461))(JSRef_5041(p_5833)))));
      return (($gt$gt$eq($instance_461))($phi$728))(phiIn_5834 => (($gt$gt_21($instance_461))((($gt$gt$eq($instance_461))((((foldM_53($instance_461))((assemblePatternMatch2_5669(phiIn_5834))(phiOut_5827)))([JSExpr_5058((JSCall_5045(JSRef_5041("error")))([JSString_5049("pattern match fail"),phiIn_5834]))]))(reverse_50(e_5744.$2))))((mapM_54($instance_461))(addStmt_5659))))((ret($instance_461))(JSRef_5041(phiOut_5827))))
    }))
  } else if(e_5744.$tag==5){
    return (($gt$gt_21($instance_461))(((mapM_54($instance_461))(d_5838 => (($gt$gt$eq($instance_461))(rewriteExpr_5666(d_5838.$1)))(addConst_5660(d_5838.$0))))(e_5744.$1)))(rewriteExpr_5666(e_5744.$2))
  } else if((e_5744.$tag==6)&&("@closure"==e_5744.$1)){
    const $phi$724 = length(e_5744.$2);
    if(2==$phi$724){
      const $phi$726 = (getIx(0))(e_5744.$2);
      if(($phi$726.$tag==1)&&($phi$726.$1.$tag==0)){
        return (mkClosure_5667($phi$726.$1.$0))((getIx(1))(e_5744.$2))
      } else error("pattern match fail",$phi$726)
    } else return error("invalid @closure")
  } else if((e_5744.$tag==6)&&("@bind"==e_5744.$1)){
    const $phi$722 = last_46(e_5744.$2);
    if($phi$722.$tag==0){
      return (mkBind_5668(init_47(e_5744.$2)))($phi$722.$1)
    } else error("pattern match fail",$phi$722)
  } else if((e_5744.$tag==6)&&("Array"==e_5744.$1)){
    return (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(rewriteExpr_5666))(e_5744.$2)))(es_5852 => (ret($instance_461))(JSArray_5052(es_5852)))
  } else if(e_5744.$tag==6){
    return (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(rewriteExpr_5666))(e_5744.$2)))(es_5856 => (($gt$gt$eq($instance_461))(getCons_5665))(cons_5857 => {
      const $phi$720 = (((lookup_63($instance_465))($instance_410))(e_5744.$1))(cons_5857);
      if($phi$720.$tag==1){
        return error("unrecognized tag in New: "+e_5744.$1)
      } else if(($phi$720.$tag==0)&&($phi$720.$0.$tag==1)){
        return (ret($instance_461))(JSObject_5051((zip_41(dataConFieldIds_5676(es_5856)))(es_5856)))
      } else if(($phi$720.$tag==0)&&($phi$720.$0.$tag==0)){
        return (ret($instance_461))(JSObject_5051((push((Pair_3("$tag"))(JSNum_5048($phi$720.$0.$0))))((zip_41(dataConFieldIds_5676(es_5856)))(es_5856))))
      } else error("pattern match fail",$phi$720)
    }))
  } else error("pattern match fail",e_5744)
};
const mkClosure_5667 = n_5859 => e_5860 => {
  const gather_5861 = n_5862 => e_5863 => {
    if(e_5863.$tag==3){
      if(0==n_5862){
        return (Pair_3([e_5863.$1]))(e_5863.$2)
      } else {
        const $phi$733 = (gather_5861(n_5862-1))(e_5863.$2);
        return (Pair_3((enqueue(e_5863.$1))($phi$733.$0)))($phi$733.$1)
      }
    } else error("pattern match fail",e_5863)
  };
  const $phi$735 = (gather_5861(n_5859))(e_5860);
  return (($gt$gt$eq($instance_461))((rewriteExprToStmts_5662(JSReturn_5059))($phi$735.$1)))(stmts_5872 => (ret($instance_461))((JSFun_5046($phi$735.$0))(stmts_5872)))
};
const mkBind_5668 = args_5873 => f_5874 => (($gt$gt$eq($instance_461))(((mapM_54($instance_461))(rewriteExpr_5666))(args_5873)))(args_5875 => (ret($instance_461))((JSCall_5045((JSIndex_5042(JSRef_5041(f_5874)))(JSString_5049("bind"))))((enqueue(JSNull_5053))(args_5875))));
const assemblePatternMatch2_5669 = phiIn_5876 => phiOut_5877 => alts_5878 => p_5879 => (($gt$gt$eq($instance_461))(getCons_5665))(cons_5880 => {
  const $phi$738 = ((processPattern_5672(cons_5880))(phiIn_5876))(p_5879.$0);
  const out_5887 = local$instance$Monad$0 => stmts_5890 => {
    if(($phi$738.$0.$tag==9)&&$phi$738.$0.$0){
      return (ret(local$instance$Monad$0))(stmts_5890)
    } else return (ret(local$instance$Monad$0))([((JSIf_5066($phi$738.$0))(stmts_5890))(alts_5878)])
  };
  const rep_5886 = ((foldl(r_5888 => p_5889 => ((((insert_64($instance_465))($instance_410))(fst_26(p_5889)))(snd_27(p_5889)))(r_5888)))(Empty_11))((zip_41($phi$738.$1.$0))($phi$738.$1.$1));
  return (($gt$gt$eq($instance_461))((withRep_5663(rep_5886))((rewriteExprToStmts_5662(JSAssign_5065(JSRef_5041(phiOut_5877))))(p_5879.$1))))(out_5887($instance_461))
});
const moduleToJs_5678 = m_5948 => {
  const imports_5956 = (concatMap_42(importToJs_5675))(m_5948.$2);
  const f_5967 = p_5968 => not_30(isJust_25((((getAnn_757($instance_465))($instance_410))("dead"))(annOf_772(p_5968.$1))));
  const vs2_5959 = (filter(f_5967))(m_5948.$6);
  const gatherCons_5957 = local$instance$Hashable$1 => local$instance$Eq$0 => m_5962 => d_5963 => {
    const $phi$744 = (((getAnn_757($instance_465))($instance_410))("data"))(annOf_772(d_5963.$1));
    if($phi$744.$tag==1){
      return m_5962
    } else if(($phi$744.$tag==0)&&($phi$744.$0.$tag==3)){
      return ((((insert_64(local$instance$Hashable$1))(local$instance$Eq$0))(d_5963.$0))($phi$744.$0.$0))(m_5962)
    } else error("pattern match fail",$phi$744)
  };
  const cons_5958 = ((foldl((gatherCons_5957($instance_465))($instance_410)))(Empty_11))(m_5948.$6);
  const defs_5960 = ($_16(foldl1(concat)))((evalState_59((((RewriteState_5657(cons_5958))(Empty_11))([]))(0)))(((mapM_54($instance_461))(v_5971 => (rewriteExprToStmts_5662(JSConst_5061(opName_5679(v_5971.$0))))(v_5971.$1)))(vs2_5959)));
  const exportDef_5961 = (JSConst_5061("exports"))(exportObject_5677(vs2_5959));
  return optStmts_5683((push(exportDef_5961))((concat(imports_5956))(defs_5960)))
};
const compileModule_6140 = builtinsPath_6141 => m_6142 => {
  const js_6145 = (join_38((map(jsStmtToString_5388(0)))((concatMap_42(rewriteStmt_5223))(moduleToJs_5678(m_6142)))))(";\n");
  const wrapModule_6146 = m_6149 => ("(function() {"+js_6145)+"\nmodule.exports = exports;})();";
  const fullBuiltins_6143 = readFile(builtinsPath_6141);
  const wrappedBuiltins_6144 = ("const $$builtins = (function() {\n const module = {};\n"+fullBuiltins_6143)+";\n return builtins})();\n";
  const requireFun_6147 = ("function _require(f) {\n"+"  return f == \"./builtins.js\" ? $$builtins : require(f);\n")+"}\n";
  return ((wrappedBuiltins_6144+requireFun_6147)+(wrapModule_6146(m_6142)))+"if (module.exports.main)module.exports.main(process.argv)"
};
const splitLetsPass_3010 = local$instance$Monad$0 => m_3049 => (ret(local$instance$Monad$0))(m_3049);
const getBool_4991 = p_5028 => def_5029 => {
  const $phi$748 = ((contains_32($instance_5040))(def_5029))(p_5028.$2);
  if(!$phi$748){
    return error("unrecognized arg that was not present for parsing")
  } else if($phi$748){
    if(def_5029.$tag==0){
      const $phi$751 = (has(def_5029.$0))(p_5028.$1);
      if(!$phi$751){
        if(def_5029.$1.$tag==0){
          return def_5029.$1.$0
        } else if(def_5029.$1.$tag==1){
          return error("no value for required arg "+def_5029.$0)
        } else error("pattern match fail",def_5029.$1)
      } else if($phi$751){
        const $phi$753 = (get(def_5029.$0))(p_5028.$1);
        if(""==$phi$753){
          return true
        } else if("True"==$phi$753){
          return true
        } else if("true"==$phi$753){
          return true
        } else if("1"==$phi$753){
          return true
        } else if("False"==$phi$753){
          return false
        } else if("false"==$phi$753){
          return false
        } else if("0"==$phi$753){
          return false
        } else return error("invalid value for a bool argument: "+$phi$753)
      } else error("pattern match fail",$phi$751)
    } else return error("arg is not a bool")
  } else error("pattern match fail",$phi$748)
};
const splitBindings_3009 = bs_3048 => error("");
const outPathArg_7184 = (ArgString_4985("out"))(Nothing_2);
const argDefs_7187 = [builtinsPathArg_7183,outPathArg_7184,mainArg_7185,optArg_7186];
const liftPass_7188 = local$instance$Monad$0 => p_7243 => a_7244 => (ret(local$instance$Monad$0))(p_7243(a_7244));
const declasserPass_7191 = m_7251 => (($gt$gt$eq($instance_461))(getExports_2573))(es_7252 => (ret($instance_461))((declassModule_4565(es_7252))(m_7251)));
const translateAdts_3204 = m_3207 => ((((((Module_738(m_3207.$0))(m_3207.$1))(m_3207.$2))([]))(m_3207.$4))(m_3207.$5))((concat((concatMap_42(rewriteData_3205))(m_3207.$3)))(m_3207.$6));
const main_7192 = argv_7253 => {
  const args_7254 = (parseArgs_4988(argDefs_7187))((slice(2))(argv_7253));
  const builtinsPath_7255 = (getString_4990(args_7254))(builtinsPathArg_7183);
  const baseExports_7260 = ((set("./builtins.js"))(parseExports_7182(loadJSExports(builtinsPath_7255))))(empty);
  const srcFiles_7258 = getPositional_4989(args_7254);
  const opt_7259 = (getBool_4991(args_7254))(optArg_7186);
  const mainName_7257 = "//"+((getString_4990(args_7254))(mainArg_7185));
  const passes_7261 = (($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((perModule_2577($instance_461))(($_16(timed_2580("parse")))((liftPass_7188($instance_461))(parse_7178)))))((timed_2580("dep-sort"))((liftPass_7188($instance_461))(depSort_7179(mainName_7257))))))((perModule_2577($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((($gt$eq$gt_84($instance_461))((timed_2580("translate-adts"))((liftPass_7188($instance_461))(translateAdts_3204))))((timed_2580("normalize-imports"))(normalizeImportsPass_7189))))((timed_2580("uniquify"))(uniquify_3409))))((timed_2580("typer"))(typerPass_7190))))((timed_2580("declasser"))(declasserPass_7191))))))((timed_2580("merge-modules"))((liftPass_7188($instance_461))(mergeModules_4144)))))((timed_2580("opt"))(inline_3679(opt_7259)))))((timed_2580("generate-js"))((liftPass_7188($instance_461))(compileModule_6140(builtinsPath_7255))))))(reportTimes_2581);
  const js_7262 = (evalState_59(((CompilerState_2572(baseExports_7260))(0))(Empty_11)))(passes_7261(srcFiles_7258));
  const outPath_7256 = (getString_4990(args_7254))(outPathArg_7184);
  return (writeFile(js_7262))(outPath_7256)
};
const annWithUseCount_3685 = e_3786 => {
  const dropCount_3787 = local$instance$Hashable$1 => local$instance$Eq$0 => n_3791 => c_3792 => (((remove_66(local$instance$Hashable$1))(local$instance$Eq$0))(n_3791))(c_3792);
  const countPat_3789 = c_3796 => p_3797 => {
    if(p_3797.$tag==0){
      return (((dropCount_3787($instance_465))($instance_410))(p_3797.$1))(c_3796)
    } else if(p_3797.$tag==2){
      return ((foldl(countPat_3789))(c_3796))(p_3797.$2)
    } else return c_3796
  };
  const countCase_3788 = pe_3793 => (countPat_3789(getCount_3683(pe_3793.$1)))(pe_3793.$0);
  const countExpr_3790 = e_3804 => {
    if(e_3804.$tag==0){
      return ((((insert_64($instance_465))($instance_410))(e_3804.$1))(1))(Empty_11)
    } else if(e_3804.$tag==2){
      return (((mergeCount_3684($instance_465))($instance_410))(getCount_3683(e_3804.$1)))(getCount_3683(e_3804.$2))
    } else if(e_3804.$tag==3){
      return (((dropCount_3787($instance_465))($instance_410))(e_3804.$1))(getCount_3683(e_3804.$2))
    } else if(e_3804.$tag==5){
      return ((foldl(c_3816 => n_3817 => (((dropCount_3787($instance_465))($instance_410))(n_3817))(c_3816)))(((foldl(c_3818 => e_3819 => (((mergeCount_3684($instance_465))($instance_410))(c_3818))(getCount_3683(e_3819))))(getCount_3683(e_3804.$2)))((map(snd_27))(e_3804.$1))))((map(fst_26))(e_3804.$1))
    } else if(e_3804.$tag==4){
      return ((foldl((mergeCount_3684($instance_465))($instance_410)))(getCount_3683(e_3804.$1)))((map(countCase_3788))(e_3804.$2))
    } else if(e_3804.$tag==1){
      return Empty_11
    } else if(e_3804.$tag==6){
      return ((foldl((mergeCount_3684($instance_465))($instance_410)))(Empty_11))((map(getCount_3683))(e_3804.$2))
    } else error("pattern match fail",e_3804)
  };
  return ((up_777(a_3828 => e_3829 => ($_16(Pair_3(a_3828)))((withAnn_773(((((setAnn_758($instance_465))($instance_410))("useCount"))(($_16(AnnUseCount_722))(countExpr_3790(e_3829))))(annOf_772(e_3829))))(e_3829))))(Unit_0))(e_3786)
};
const $instance_429 = ($class$Monad(pure($instance_421)))(a_426 => f_427 => {
  if(a_426.$tag==1){
    return Nothing_2
  } else if(a_426.$tag==0){
    return f_427(a_426.$0)
  } else error("pattern match fail",a_426)
});
const splitExpr_3008 = e_3015 => {
  const handleLet_3018 = e_3038 => {
    if(e_3038.$tag==5){
      return (($gt$gt$eq($instance_461))(splitExpr_3008(e_3038.$2)))(e_3042 => (($gt$gt$eq($instance_461))(splitBindings_3009(e_3038.$1)))(gbs_3043 => {
        const l_3044 = ((foldr(e_3045 => bs_3046 => ((Let_731(Empty_11))(bs_3046))(e_3045)))(e_3042))(gbs_3043);
        return (ret($instance_461))(Right_9((withAnn_773(e_3038.$0))(l_3044)))
      }))
    } else return (ret($instance_461))(Left_8(e_3038))
  };
  const splitPat_3017 = p_3030 => {
    if(p_3030.$tag==1){
      return (ret($instance_461))(Unit_0)
    } else if(p_3030.$tag==0){
      return ((delRef_3006($instance_465))($instance_410))(p_3030.$1)
    } else if(p_3030.$tag==2){
      return (($gt$gt_21($instance_461))(((mapM_54($instance_461))(splitPat_3017))(p_3030.$2)))(((addRef_3005($instance_465))($instance_410))(p_3030.$1))
    } else error("pattern match fail",p_3030)
  };
  const split_3016 = e_3019 => {
    if(e_3019.$tag==0){
      return (($gt$gt_21($instance_461))(((addRef_3005($instance_465))($instance_410))(e_3019.$1)))((ret($instance_461))(e_3019))
    } else if(e_3019.$tag==4){
      return (($gt$gt_21($instance_461))(((mapM_54($instance_461))(p_3025 => splitPat_3017(fst_26(p_3025))))(e_3019.$2)))((ret($instance_461))(e_3019))
    } else if(e_3019.$tag==3){
      return (($gt$gt_21($instance_461))(((delRef_3006($instance_465))($instance_410))(e_3019.$1)))((ret($instance_461))(e_3019))
    } else return (ret($instance_461))(e_3019)
  };
  return (((breakableDownAndUpM_780($instance_461))(handleLet_3018))(split_3016))(e_3015)
};
const $instance_6297 = $class$Functor(f_6290 => pa_6291 => Parser_6240(i_6293 => {
  const $phi$765 = pa_6291.$0(i_6293);
  if($phi$765.$tag==1){
    return Error_6239($phi$765.$0)
  } else if($phi$765.$tag==0){
    return (Success_6238(f_6290($phi$765.$0)))($phi$765.$1)
  } else error("pattern match fail",$phi$765)
}));
const inlineCode_3696 = always_3941 => e_3942 => {
  const withAnnCopy_3943 = ann_3946 => e_3947 => (withAnn_773((((mergeTrie_71($instance_465))($instance_410))((((remove_66($instance_465))($instance_410))("export"))(annOf_772(e_3947))))((((copyAnn_759($instance_465))($instance_410))(["export"]))(ann_3946))))(e_3947);
  const inlinePat_3945 = p_3969 => {
    if(p_3969.$tag==2){
      const $phi$768 = (((lookup_63($instance_465))($instance_410))(p_3969.$1))(always_3941);
      if(($phi$768.$tag==0)&&($phi$768.$0.$tag==0)){
        return ((PData_737(p_3969.$0))($phi$768.$0.$1))((map(inlinePat_3945))(p_3969.$2))
      } else return ((PData_737(p_3969.$0))(p_3969.$1))((map(inlinePat_3945))(p_3969.$2))
    } else return p_3969
  };
  const inlineExpr_3944 = e_3948 => {
    if(e_3948.$tag==0){
      const $phi$774 = (((lookup_63($instance_465))($instance_410))(e_3948.$1))(always_3941);
      if($phi$774.$tag==1){
        return (ret($instance_461))(Left_8(e_3948))
      } else if($phi$774.$tag==0){
        return ((fmap($instance_441))(e_3952 => Left_8((withAnnCopy_3943(e_3948.$0))(e_3952))))((rewriteExpr_3404(empty))($phi$774.$0))
      } else error("pattern match fail",$phi$774)
    } else if(e_3948.$tag==5){
      const always2_3956 = (((mergeTrie_71($instance_465))($instance_410))(always_3941))((chooseForInlining_3694(getCount_3683(e_3948.$2)))(e_3948.$1));
      return (($gt$gt$eq($instance_461))(((mapBindingsM_3687($instance_461))(n_3957 => e_3958 => (inlineCode_3696((((remove_66($instance_465))($instance_410))(n_3957))(always2_3956)))(e_3958)))(e_3948.$1)))(bs_3959 => (($gt$gt$eq($instance_461))((inlineCode_3696(always2_3956))(e_3948.$2)))(e_3960 => {
        const $phi$772 = length(bs_3959);
        if(0==$phi$772){
          return (ret($instance_461))(Right_9((withAnnCopy_3943(e_3948.$0))(e_3960)))
        } else return (ret($instance_461))(Right_9(((Let_731(e_3948.$0))(bs_3959))(e_3960)))
      }))
    } else if(e_3948.$tag==4){
      return (ret($instance_461))(Left_8(((Case_730(e_3948.$0))(e_3948.$1))((map(p_3965 => (Pair_3(inlinePat_3945(p_3965.$0)))(p_3965.$1)))(e_3948.$2))))
    } else return (ret($instance_461))(Left_8(e_3948))
  };
  return ((breakableDownM_784($instance_461))(inlineExpr_3944))(e_3942)
};
const betaReduction_3695 = e_3927 => {
  const f_3928 = e_3929 => {
    if((e_3929.$tag==2)&&(e_3929.$1.$tag==3)){
      if(e_3929.$2.$tag==0){
        const $phi$778 = (($eq$eq($instance_410))(e_3929.$1.$1))(e_3929.$2.$1);
        if($phi$778){
          return e_3929.$1.$2
        } else if(!$phi$778){
          return ((Let_731(e_3929.$0))([(Pair_3(e_3929.$1.$1))((Var_726(e_3929.$2.$0))(e_3929.$2.$1))]))(e_3929.$1.$2)
        } else error("pattern match fail",$phi$778)
      } else return ((Let_731(e_3929.$0))([(Pair_3(e_3929.$1.$1))(e_3929.$2)]))(e_3929.$1.$2)
    } else return e_3929
  };
  return snd_27(((down_778(a_3939 => e_3940 => (Pair_3(a_3939))(f_3928(e_3940))))(Unit_0))(e_3927))
};
const pass_3689 = bs_3845 => {
  const bs2_3846 = (mapBindings_3686(e_3850 => ($_16(snd_27))(annWithUseCount_3685(e_3850))))(bs_3845);
  const useCount_3847 = ((foldl((mergeCount_3684($instance_465))($instance_410)))(Empty_11))((map(b_3851 => getCount_3683(snd_27(b_3851))))(bs2_3846));
  const bs3_3848 = (mapBindings_3686(deadCode_3691))((dropDeadBindings_3698(useCount_3847))(bs2_3846));
  const always_3849 = (chooseForInlining_3694(Empty_11))(bs3_3848);
  return (($gt$gt$eq($instance_461))(((mapBindingsM_3687($instance_461))(n_3852 => e_3853 => (inlineCode_3696((((remove_66($instance_465))($instance_410))(n_3852))(always_3849)))(e_3853)))(bs3_3848)))(bs_3854 => (ret($instance_461))((mapBindings_3686(betaReduction_3695))(bs_3854)))
};
const loopPasses_3688 = local$instance$Monad$0 => n_3841 => p_3842 => bs_3843 => {
  if(0==n_3841){
    return (ret(local$instance$Monad$0))(bs_3843)
  } else return (($gt$gt$eq(local$instance$Monad$0))(p_3842(bs_3843)))(((loopPasses_3688(local$instance$Monad$0))(n_3841-1))(p_3842))
};
const exports = {parseT:parseT_7181,builtinsPathArg:builtinsPathArg_7183,moduleFile:moduleFile_7177,typerPass:typerPass_7190,parseExports:parseExports_7182,findImports:findImports_7180,depSort:depSort_7179,parse:parse_7178,normalizeImportsPass:normalizeImportsPass_7189,mainArg:mainArg_7185,optArg:optArg_7186,outPathArg:outPathArg_7184,argDefs:argDefs_7187,liftPass:liftPass_7188,declasserPass:declasserPass_7191,main:main_7192}
module.exports = exports;})();if (module.exports.main)module.exports.main(process.argv)
