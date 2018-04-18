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

builtins.jsLt = function(a) {
    return function(b) {
        return a < b
    }
}

builtins.jsEq = function(a) {
    return function(b) {
        return a === b
    }
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

builtins.get = function(f) {
    return function(r) {
        const v = r[f];
        if (v !== undefined) {
          return v
        } else {
          //throw Error(`no key ${f} in ${r}`)
        }
    }
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

builtins.setIx = i => a => as => {
  const r = as.slice(0);
  r[i] = a;
  return r;
};

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

builtins.push = function(x) {
	return function(xs) {
  	var xs2 = xs.slice(0);
    xs2.push(x);
    return xs2;
  }
}

builtins.enqueue = function(x) {
	return function(xs) {
  	var xs2 = xs.slice(0);
    xs2.unshift(x);
    return xs2;
  }
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

builtins.arrDel = ix => len => arr => {
  const r = arr.slice(0);
  r.splice(ix, len);
  return r;
};

builtins.arrIns = ix => x => arr => {
  const r = arr.slice(0);
  r.splice(ix, 0, x);
  return r;
};

builtins.concat = function(a) {
    return function(b) {
        return a.concat(b)
    }
}

builtins.map = function(f) {
	return function(arr) {
	    //console.log(arr);
      	return arr.map(f)
    }
}

builtins.filter = function(f) {
	return function(arr) {
  	return arr.filter(f)
  }
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
const Pair_3 = $_0_92 => $_1_93 => ({$0:$_0_92,$1:$_1_93});
const Just_1 = $_0_91 => ({$0:$_0_91,$tag:0});
const Nothing_2 = {$tag:1};
const Empty_11 = {$tag:0};
const Leaf_12 = $_0_115 => $_1_116 => $_2_117 => ({$0:$_0_115,$1:$_1_116,$2:$_2_117,$tag:1});
const Collision_13 = $_0_118 => $_1_119 => ({$0:$_0_118,$1:$_1_119,$tag:2});
const BitmapIndexed_14 = $_0_120 => $_1_121 => $_2_122 => ({$0:$_0_120,$1:$_1_121,$2:$_2_122,$tag:3});
const Left_8 = $_0_112 => ({$0:$_0_112,$tag:0});
const Right_9 = $_0_113 => ({$0:$_0_113,$tag:1});
const Unit_0 = {};
const State_10 = $_0_114 => ({$0:$_0_114});
const Identity_15 = $_0_123 => ({$0:$_0_123});
const Tuple6_7 = $_0_106 => $_1_107 => $_2_108 => $_3_109 => $_4_110 => $_5_111 => ({$0:$_0_106,$1:$_1_107,$2:$_2_108,$3:$_3_109,$4:$_4_110,$5:$_5_111});
const Tuple5_6 = $_0_101 => $_1_102 => $_2_103 => $_3_104 => $_4_105 => ({$0:$_0_101,$1:$_1_102,$2:$_2_103,$3:$_3_104,$4:$_4_105});
const Tuple4_5 = $_0_97 => $_1_98 => $_2_99 => $_3_100 => ({$0:$_0_97,$1:$_1_98,$2:$_2_99,$3:$_3_100});
const Tuple3_4 = $_0_94 => $_1_95 => $_2_96 => ({$0:$_0_94,$1:$_1_95,$2:$_2_96});
const $class$Eq = $_0 => ({$0:$_0});
const $class$Ord = $_0 => ({$0:$_0});
const $class$Functor = $_0 => ({$0:$_0});
const $class$Applicative = $_0 => $_1 => ({$0:$_0,$1:$_1});
const $class$Alternative = $_0 => $_1 => ({$0:$_0,$1:$_1});
const $class$Monad = $_0 => $_1 => ({$0:$_0,$1:$_1});
const $class$Hashable = $_0 => ({$0:$_0});
const $eq$eq = x_$class$Eq => {
  let $phi$0;
  if(true&&true){
    $phi$0 = x_$class$Eq.$0
  } else error("pattern match fail",x_$class$Eq);
  return $phi$0
};
const $lt = x_$class$Ord => {
  let $phi$1;
  if(true&&true){
    $phi$1 = x_$class$Ord.$0
  } else error("pattern match fail",x_$class$Ord);
  return $phi$1
};
const fmap = x_$class$Functor => {
  let $phi$2;
  if(true&&true){
    $phi$2 = x_$class$Functor.$0
  } else error("pattern match fail",x_$class$Functor);
  return $phi$2
};
const pure = x_$class$Applicative => {
  let $phi$3;
  if((true&&true)&&true){
    $phi$3 = x_$class$Applicative.$0
  } else error("pattern match fail",x_$class$Applicative);
  return $phi$3
};
const $lt$mul$gt = x_$class$Applicative => {
  let $phi$4;
  if((true&&true)&&true){
    $phi$4 = x_$class$Applicative.$1
  } else error("pattern match fail",x_$class$Applicative);
  return $phi$4
};
const zero = x_$class$Alternative => {
  let $phi$5;
  if((true&&true)&&true){
    $phi$5 = x_$class$Alternative.$0
  } else error("pattern match fail",x_$class$Alternative);
  return $phi$5
};
const $lt$pip$gt = x_$class$Alternative => {
  let $phi$6;
  if((true&&true)&&true){
    $phi$6 = x_$class$Alternative.$1
  } else error("pattern match fail",x_$class$Alternative);
  return $phi$6
};
const ret = x_$class$Monad => {
  let $phi$7;
  if((true&&true)&&true){
    $phi$7 = x_$class$Monad.$0
  } else error("pattern match fail",x_$class$Monad);
  return $phi$7
};
const $gt$gt$eq = x_$class$Monad => {
  let $phi$8;
  if((true&&true)&&true){
    $phi$8 = x_$class$Monad.$1
  } else error("pattern match fail",x_$class$Monad);
  return $phi$8
};
const hashCode = x_$class$Hashable => {
  let $phi$9;
  if(true&&true){
    $phi$9 = x_$class$Hashable.$0
  } else error("pattern match fail",x_$class$Hashable);
  return $phi$9
};
const $instance_459 = $class$Eq(jsEq);
const $instance_460 = $class$Eq(jsEq);
const $instance_461 = $class$Ord(jsLt);
const $instance_462 = $class$Ord(jsLt);
const $instance_466 = $class$Functor(f_463 => m_464 => {
  let $phi$10;
  if((m_464.$tag==0)&&true){
    $phi$10 = (Just_1(f_463(m_464.$0)))
  } else if(m_464.$tag==1){
    $phi$10 = Nothing_2
  } else error("pattern match fail",m_464);
  return $phi$10
});
const $instance_471 = ($class$Applicative(x_467 => Just_1(x_467)))(f_468 => x_469 => {
  let $phi$11;
  if(f_468.$tag==1){
    $phi$11 = Nothing_2
  } else if((f_468.$tag==0)&&true){
    $phi$11 = (((fmap($instance_466))(f_468.$0))(x_469))
  } else error("pattern match fail",f_468);
  return $phi$11
});
const $instance_475 = ($class$Alternative(Nothing_2))(a_472 => b_473 => {
  let $phi$12;
  if(a_472.$tag==1){
    $phi$12 = b_473
  } else if(true){
    $phi$12 = a_472
  } else error("pattern match fail",a_472);
  return $phi$12
});
const $instance_479 = ($class$Monad(pure($instance_471)))(a_476 => f_477 => {
  let $phi$13;
  if(a_476.$tag==1){
    $phi$13 = Nothing_2
  } else if((a_476.$tag==0)&&true){
    $phi$13 = (f_477(a_476.$0))
  } else error("pattern match fail",a_476);
  return $phi$13
});
const $instance_484 = $class$Functor(f_480 => e_481 => {
  let $phi$14;
  if((e_481.$tag==0)&&true){
    $phi$14 = (Left_8(e_481.$0))
  } else if((e_481.$tag==1)&&true){
    $phi$14 = (Right_9(f_480(e_481.$0)))
  } else error("pattern match fail",e_481);
  return $phi$14
});
const $instance_491 = $class$Functor(f_485 => s_486 => {
  let $phi$15;
  if(true&&true){
    $phi$15 = (State_10(s_488 => {
      let $phi$16;
      const $phi$17 = s_486.$0(s_488);
      if((true&&true)&&true){
        $phi$16 = ((Pair_3($phi$17.$0))(f_485($phi$17.$1)))
      } else error("pattern match fail",$phi$17);
      return $phi$16
    }))
  } else error("pattern match fail",s_486);
  return $phi$15
});
const $instance_503 = ($class$Applicative(a_492 => State_10(s_493 => (Pair_3(s_493))(a_492))))(f_494 => a_495 => {
  let $phi$18;
  if(true&&true){
    let $phi$19;
    if(true&&true){
      $phi$19 = (State_10(s_498 => {
        let $phi$20;
        const $phi$21 = f_494.$0(s_498);
        if((true&&true)&&true){
          let $phi$22;
          const $phi$23 = a_495.$0($phi$21.$0);
          if((true&&true)&&true){
            $phi$22 = ((Pair_3($phi$23.$0))($phi$21.$1($phi$23.$1)))
          } else error("pattern match fail",$phi$23);
          $phi$20 = $phi$22
        } else error("pattern match fail",$phi$21);
        return $phi$20
      }))
    } else error("pattern match fail",a_495);
    $phi$18 = $phi$19
  } else error("pattern match fail",f_494);
  return $phi$18
});
const $instance_511 = ($class$Monad(pure($instance_503)))(a_504 => f_505 => {
  let $phi$24;
  if(true&&true){
    $phi$24 = (State_10(s_507 => {
      let $phi$25;
      const $phi$26 = a_504.$0(s_507);
      if((true&&true)&&true){
        let $phi$27;
        const $phi$28 = f_505($phi$26.$1);
        if(true&&true){
          $phi$27 = ($phi$28.$0($phi$26.$0))
        } else error("pattern match fail",$phi$28);
        $phi$25 = $phi$27
      } else error("pattern match fail",$phi$26);
      return $phi$25
    }))
  } else error("pattern match fail",a_504);
  return $phi$24
});
const $instance_513 = $class$Hashable(n_512 => n_512);
const $instance_515 = $class$Hashable(s_514 => strHashCode(s_514));
const $instance_519 = $class$Functor(f_516 => i_517 => {
  let $phi$29;
  if(true&&true){
    $phi$29 = (Identity_15(f_516(i_517.$0)))
  } else error("pattern match fail",i_517);
  return $phi$29
});
const $instance_524 = ($class$Applicative(x_520 => Identity_15(x_520)))(f_521 => x_522 => {
  let $phi$30;
  if(true&&true){
    $phi$30 = (((fmap($instance_519))(f_521.$0))(x_522))
  } else error("pattern match fail",f_521);
  return $phi$30
});
const $instance_528 = ($class$Monad(pure($instance_524)))(a_525 => f_526 => {
  let $phi$31;
  if(true&&true){
    $phi$31 = (f_526(a_525.$0))
  } else error("pattern match fail",a_525);
  return $phi$31
});
const assert_90 = s_457 => b_458 => {
  let $phi$32;
  if(b_458){
    $phi$32 = true
  } else if(!b_458){
    $phi$32 = (error(s_457))
  } else error("pattern match fail",b_458);
  return $phi$32
};
const mapSnd_89 = f_453 => p_454 => {
  let $phi$33;
  if((true&&true)&&true){
    $phi$33 = ((Pair_3(p_454.$0))(f_453(p_454.$1)))
  } else error("pattern match fail",p_454);
  return $phi$33
};
const mapFst_88 = f_449 => p_450 => {
  let $phi$34;
  if((true&&true)&&true){
    $phi$34 = ((Pair_3(f_449(p_450.$0)))(p_450.$1))
  } else error("pattern match fail",p_450);
  return $phi$34
};
const $gt$eq$gt_87 = local$instance$Monad$0 => a_446 => b_447 => x_448 => (($gt$gt$eq(local$instance$Monad$0))(a_446(x_448)))(b_447);
const snd_27 = p_151 => {
  let $phi$35;
  if((true&&true)&&true){
    $phi$35 = p_151.$1
  } else error("pattern match fail",p_151);
  return $phi$35
};
const debug2_86 = p_444 => x_445 => snd_27((Pair_3(debug(p_444)))(x_445));
const isJust_25 = m_146 => {
  let $phi$36;
  if((m_146.$tag==0)&&true){
    $phi$36 = true
  } else if(m_146.$tag==1){
    $phi$36 = false
  } else error("pattern match fail",m_146);
  return $phi$36
};
const $_16 = f_124 => a_125 => f_124(a_125);
const fst_26 = p_148 => {
  let $phi$37;
  if((true&&true)&&true){
    $phi$37 = p_148.$0
  } else error("pattern match fail",p_148);
  return $phi$37
};
const loop_31 = f_169 => start_170 => {
  const shouldStop_171 = x_175 => {
    let $phi$38;
    if((true&&true)&&(x_175.$1.$tag==1)){
      $phi$38 = false
    } else if(true){
      $phi$38 = true
    } else error("pattern match fail",x_175);
    return $phi$38
  };
  const next_172 = xr_178 => {
    let $phi$39;
    if((true&&true)&&true){
      let $phi$40;
      const $phi$41 = f_169(xr_178.$0);
      if(($phi$41.$tag==0)&&true){
        $phi$40 = ((Pair_3($phi$41.$0))(Nothing_2))
      } else if(($phi$41.$tag==1)&&true){
        $phi$40 = ((Pair_3(xr_178.$0))(Just_1($phi$41.$0)))
      } else error("pattern match fail",$phi$41);
      $phi$39 = $phi$40
    } else error("pattern match fail",xr_178);
    return $phi$39
  };
  const sp_173 = (Pair_3(start_170))(Nothing_2);
  const result_174 = ((iterate(sp_173))(shouldStop_171))(next_172);
  let $phi$42;
  const $phi$43 = snd_27(result_174);
  if(($phi$43.$tag==0)&&true){
    $phi$42 = $phi$43.$0
  } else error("pattern match fail",$phi$43);
  return $phi$42
};
const find_33 = predicate_188 => xs_189 => {
  const f_190 = i_191 => {
    let $phi$44;
    const $phi$45 = (($lt($instance_461))(i_191))(length(xs_189));
    if(!$phi$45){
      $phi$44 = (Right_9(Nothing_2))
    } else if($phi$45){
      let $phi$46;
      const $phi$47 = predicate_188((getIx(i_191))(xs_189));
      if($phi$47){
        $phi$46 = (Right_9(Just_1((getIx(i_191))(xs_189))))
      } else if(!$phi$47){
        $phi$46 = (Left_8(i_191+1))
      } else error("pattern match fail",$phi$47);
      $phi$44 = $phi$46
    } else error("pattern match fail",$phi$45);
    return $phi$44
  };
  return (loop_31(f_190))(0)
};
const hamtMask_62 = depth_279 => hash_280 => {
  const h_281 = (hash_280>>>(depth_279*5))&31;
  return 1<<h_281
};
const popCount_61 = n_273 => {
  const n2_274 = n_273-((n_273>>>1)&1431655765);
  const n3_275 = (n2_274&858993459)+((n2_274>>>2)&858993459);
  const n4_276 = (n3_275+(n3_275>>>4))&252645135;
  const n5_277 = n4_276+(n4_276>>>8);
  const n6_278 = n5_277+(n5_277>>>16);
  return n6_278&127
};
const hamtIndex_63 = bitmap_282 => mask_283 => popCount_61(bitmap_282&(mask_283-1));
const lookup_64 = local$instance$Hashable$1 => local$instance$Eq$0 => k_284 => t_285 => {
  const hash_286 = (hashCode(local$instance$Hashable$1))(k_284);
  const f_287 = depth_288 => t_289 => {
    let $phi$48;
    if(t_289.$tag==0){
      $phi$48 = Nothing_2
    } else if((((t_289.$tag==1)&&true)&&true)&&true){
      let $phi$51;
      const $phi$52 = (($eq$eq(local$instance$Eq$0))(k_284))(t_289.$1);
      if(!$phi$52){
        $phi$51 = Nothing_2
      } else if($phi$52){
        $phi$51 = (Just_1(t_289.$2))
      } else error("pattern match fail",$phi$52);
      $phi$48 = $phi$51
    } else if(((t_289.$tag==2)&&true)&&true){
      $phi$48 = (($_16((fmap($instance_466))(snd_27)))((find_33(e_295 => (($eq$eq(local$instance$Eq$0))(fst_26(e_295)))(k_284)))(t_289.$1)))
    } else if((((t_289.$tag==3)&&true)&&true)&&true){
      const m_299 = (hamtMask_62(depth_288))(hash_286);
      let $phi$49;
      const $phi$50 = m_299&t_289.$1;
      if(0==$phi$50){
        $phi$49 = Nothing_2
      } else if(true){
        $phi$49 = ((f_287(depth_288+1))((getIx((hamtIndex_63(t_289.$1))(m_299)))(t_289.$2)))
      } else error("pattern match fail",$phi$50);
      $phi$48 = $phi$49
    } else error("pattern match fail",t_289);
    return $phi$48
  };
  return (f_287(0))(t_285)
};
const setContains_81 = local$instance$Hashable$1 => local$instance$Eq$0 => a_428 => s_429 => isJust_25((((lookup_64(local$instance$Hashable$1))(local$instance$Eq$0))(a_428))(s_429));
const foldTrie_70 = f_374 => a_375 => t_376 => {
  let $phi$53;
  if(t_376.$tag==0){
    $phi$53 = a_375
  } else if((((t_376.$tag==1)&&true)&&true)&&true){
    $phi$53 = (((f_374(a_375))(t_376.$1))(t_376.$2))
  } else if(((t_376.$tag==2)&&true)&&true){
    $phi$53 = (((foldl(a_382 => e_383 => ((f_374(a_382))(fst_26(e_383)))(snd_27(e_383))))(a_375))(t_376.$1))
  } else if((((t_376.$tag==3)&&true)&&true)&&true){
    $phi$53 = (((foldl(foldTrie_70(f_374)))(a_375))(t_376.$2))
  } else error("pattern match fail",t_376);
  return $phi$53
};
const emptySet_77 = Empty_11;
const not_30 = b_168 => {
  let $phi$54;
  if(b_168){
    $phi$54 = false
  } else if(!b_168){
    $phi$54 = true
  } else error("pattern match fail",b_168);
  return $phi$54
};
const $div$eq_17 = local$instance$Eq$0 => a_126 => b_127 => not_30((($eq$eq(local$instance$Eq$0))(a_126))(b_127));
const mapIx_34 = f_192 => ix_193 => xs_194 => ((setIx(ix_193))(f_192((getIx(ix_193))(xs_194))))(xs_194);
const insert_65 = local$instance$Hashable$1 => local$instance$Eq$0 => k_301 => v_302 => t_303 => {
  const hash_304 = (hashCode(local$instance$Hashable$1))(k_301);
  const f_305 = depth_306 => t_307 => {
    let $phi$55;
    if(t_307.$tag==0){
      $phi$55 = (((Leaf_12(0))(k_301))(v_302))
    } else if(((t_307.$tag==2)&&true)&&true){
      $phi$55 = ((Collision_13(t_307.$0))((push((Pair_3(k_301))(v_302)))((filter(e_310 => (($div$eq_17(local$instance$Eq$0))(fst_26(e_310)))(k_301)))(t_307.$1))))
    } else if((((t_307.$tag==1)&&true)&&true)&&true){
      let $phi$58;
      const $phi$59 = (($eq$eq(local$instance$Eq$0))(k_301))(t_307.$1);
      if($phi$59){
        $phi$58 = (((Leaf_12(t_307.$0))(k_301))(v_302))
      } else if(!$phi$59){
        let $phi$60;
        if(7==depth_306){
          $phi$60 = ((Collision_13(t_307.$0))([(Pair_3(t_307.$1))(t_307.$2),(Pair_3(k_301))(v_302)]))
        } else if(true){
          const m_315 = (hamtMask_62(depth_306))((hashCode(local$instance$Hashable$1))(t_307.$1));
          $phi$60 = ((f_305(depth_306))(((BitmapIndexed_14(t_307.$0))(m_315))([((Leaf_12(m_315))(t_307.$1))(t_307.$2)])))
        } else error("pattern match fail",depth_306);
        $phi$58 = $phi$60
      } else error("pattern match fail",$phi$59);
      $phi$55 = $phi$58
    } else if((((t_307.$tag==3)&&true)&&true)&&true){
      const m_319 = (hamtMask_62(depth_306))(hash_304);
      const bitmap2_320 = m_319|t_307.$1;
      const ix_321 = (hamtIndex_63(bitmap2_320))(m_319);
      let $phi$56;
      const $phi$57 = m_319&t_307.$1;
      if(0==$phi$57){
        $phi$56 = (((BitmapIndexed_14(t_307.$0))(bitmap2_320))(((arrIns(ix_321))(((Leaf_12(m_319))(k_301))(v_302)))(t_307.$2)))
      } else if(true){
        $phi$56 = (((BitmapIndexed_14(t_307.$0))(bitmap2_320))(((mapIx_34(f_305(depth_306+1)))(ix_321))(t_307.$2)))
      } else error("pattern match fail",$phi$57);
      $phi$55 = $phi$56
    } else error("pattern match fail",t_307);
    return $phi$55
  };
  return (f_305(0))(t_303)
};
const setAdd_78 = local$instance$Hashable$1 => local$instance$Eq$0 => a_422 => s_423 => ((((insert_65(local$instance$Hashable$1))(local$instance$Eq$0))(a_422))(Unit_0))(s_423);
const setIntersection_85 = local$instance$Hashable$1 => local$instance$Eq$0 => a_438 => b_439 => {
  const f_440 = r_441 => k_442 => __443 => {
    let $phi$61;
    const $phi$62 = (((setContains_81(local$instance$Hashable$1))(local$instance$Eq$0))(k_442))(a_438);
    if(!$phi$62){
      $phi$61 = r_441
    } else if($phi$62){
      $phi$61 = ((((setAdd_78(local$instance$Hashable$1))(local$instance$Eq$0))(k_442))(r_441))
    } else error("pattern match fail",$phi$62);
    return $phi$61
  };
  return ((foldTrie_70(f_440))(emptySet_77))(b_439)
};
const remove_67 = local$instance$Hashable$1 => local$instance$Eq$0 => k_328 => t_329 => {
  const hash_330 = (hashCode(local$instance$Hashable$1))(k_328);
  const f_331 = depth_332 => t_333 => {
    let $phi$63;
    if(t_333.$tag==0){
      $phi$63 = Empty_11
    } else if((((t_333.$tag==1)&&true)&&true)&&true){
      let $phi$72;
      const $phi$73 = (($eq$eq(local$instance$Eq$0))(t_333.$1))(k_328);
      if($phi$73){
        $phi$72 = Empty_11
      } else if(!$phi$73){
        $phi$72 = t_333
      } else error("pattern match fail",$phi$73);
      $phi$63 = $phi$72
    } else if(((t_333.$tag==2)&&true)&&true){
      const entries2_339 = (filter(e_340 => (($div$eq_17(local$instance$Eq$0))(fst_26(e_340)))(k_328)))(t_333.$1);
      let $phi$70;
      const $phi$71 = length(entries2_339);
      if(0==$phi$71){
        $phi$70 = Empty_11
      } else if(1==$phi$71){
        $phi$70 = (((Leaf_12(t_333.$0))(fst_26((getIx(0))(entries2_339))))(snd_27((getIx(0))(entries2_339))))
      } else if(true){
        $phi$70 = ((Collision_13(t_333.$0))(entries2_339))
      } else error("pattern match fail",$phi$71);
      $phi$63 = $phi$70
    } else if((((t_333.$tag==3)&&true)&&true)&&true){
      const m_345 = (hamtMask_62(depth_332))(hash_330);
      const ix_346 = (hamtIndex_63(t_333.$1))(m_345);
      let $phi$64;
      const $phi$65 = m_345&t_333.$1;
      if(0==$phi$65){
        $phi$64 = t_333
      } else if(true){
        let $phi$66;
        const $phi$67 = (f_331(depth_332+1))((getIx(ix_346))(t_333.$2));
        if($phi$67.$tag==0){
          const bitmap2_348 = (bitNot(m_345))&t_333.$1;
          let $phi$68;
          const $phi$69 = length(t_333.$2);
          if(1==$phi$69){
            $phi$68 = Empty_11
          } else if(2==$phi$69){
            $phi$68 = ((getIx(1&(bitNot(ix_346))))(t_333.$2))
          } else if(true){
            $phi$68 = (((BitmapIndexed_14(t_333.$0))(bitmap2_348))(((arrDel(ix_346))(1))(t_333.$2)))
          } else error("pattern match fail",$phi$69);
          $phi$66 = $phi$68
        } else if(true){
          $phi$66 = (((BitmapIndexed_14(t_333.$0))(t_333.$1))(((setIx(ix_346))($phi$67))(t_333.$2)))
        } else error("pattern match fail",$phi$67);
        $phi$64 = $phi$66
      } else error("pattern match fail",$phi$65);
      $phi$63 = $phi$64
    } else error("pattern match fail",t_333);
    return $phi$63
  };
  return (f_331(0))(t_329)
};
const setDiff_84 = local$instance$Hashable$1 => local$instance$Eq$0 => a_433 => b_434 => ((foldTrie_70(r_435 => k_436 => __437 => (((remove_67(local$instance$Hashable$1))(local$instance$Eq$0))(k_436))(r_435)))(a_433))(b_434);
const setToArray_83 = (foldTrie_70(vs_430 => v_431 => __432 => (push(v_431))(vs_430)))([]);
const mergeTrie_74 = local$instance$Hashable$1 => local$instance$Eq$0 => a_409 => b_410 => ((foldTrie_70(a_411 => k_412 => v_413 => ((((insert_65(local$instance$Hashable$1))(local$instance$Eq$0))(k_412))(v_413))(a_411)))(a_409))(b_410);
const setUnion_82 = local$instance$Hashable$1 => local$instance$Eq$0 => (mergeTrie_74(local$instance$Hashable$1))(local$instance$Eq$0);
const setRemove_80 = local$instance$Hashable$1 => local$instance$Eq$0 => (remove_67(local$instance$Hashable$1))(local$instance$Eq$0);
const setAddAll_79 = local$instance$Hashable$1 => local$instance$Eq$0 => vs_424 => s_425 => ((foldl(s_426 => v_427 => (((setAdd_78(local$instance$Hashable$1))(local$instance$Eq$0))(v_427))(s_426)))(s_425))(vs_424);
const trieEntries_76 = m_418 => ((foldTrie_70(es_419 => k_420 => v_421 => (push((Pair_3(k_420))(v_421)))(es_419)))([]))(m_418);
const trieKeys_75 = m_414 => ((foldTrie_70(ks_415 => k_416 => __417 => (push(k_416))(ks_415)))([]))(m_414);
const size_72 = t_398 => {
  let $phi$74;
  if(t_398.$tag==0){
    $phi$74 = 0
  } else if((((t_398.$tag==1)&&true)&&true)&&true){
    $phi$74 = 1
  } else if(((t_398.$tag==2)&&true)&&true){
    $phi$74 = (length(t_398.$1))
  } else if((((t_398.$tag==3)&&true)&&true)&&true){
    $phi$74 = (((foldl($add))(0))((map(size_72))(t_398.$2)))
  } else error("pattern match fail",t_398);
  return $phi$74
};
const mapTrie_71 = f_387 => t_388 => {
  let $phi$75;
  if(t_388.$tag==0){
    $phi$75 = Empty_11
  } else if((((t_388.$tag==1)&&true)&&true)&&true){
    $phi$75 = (((Leaf_12(t_388.$0))(t_388.$1))((f_387(t_388.$1))(t_388.$2)))
  } else if(((t_388.$tag==2)&&true)&&true){
    $phi$75 = (($_16(Collision_13(t_388.$0)))((map(e_394 => ($_16(Pair_3(fst_26(e_394))))((f_387(fst_26(e_394)))(snd_27(e_394)))))(t_388.$1)))
  } else if((((t_388.$tag==3)&&true)&&true)&&true){
    $phi$75 = (($_16((BitmapIndexed_14(t_388.$0))(t_388.$1)))((map(mapTrie_71(f_387)))(t_388.$2)))
  } else error("pattern match fail",t_388);
  return $phi$75
};
const nodeMask_60 = t_264 => {
  let $phi$76;
  if(t_264.$tag==0){
    $phi$76 = 0
  } else if((((t_264.$tag==1)&&true)&&true)&&true){
    $phi$76 = t_264.$0
  } else if(((t_264.$tag==2)&&true)&&true){
    $phi$76 = t_264.$0
  } else if((((t_264.$tag==3)&&true)&&true)&&true){
    $phi$76 = t_264.$0
  } else error("pattern match fail",t_264);
  return $phi$76
};
const isEmpty_73 = t_407 => {
  let $phi$77;
  if(t_407.$tag==0){
    $phi$77 = true
  } else if(true){
    $phi$77 = false
  } else error("pattern match fail",t_407);
  return $phi$77
};
const filterTrie_69 = f_354 => t_355 => {
  let $phi$78;
  if(t_355.$tag==0){
    $phi$78 = Empty_11
  } else if((((t_355.$tag==1)&&true)&&true)&&true){
    let $phi$82;
    const $phi$83 = (f_354(t_355.$1))(t_355.$2);
    if(!$phi$83){
      $phi$82 = Empty_11
    } else if($phi$83){
      $phi$82 = t_355
    } else error("pattern match fail",$phi$83);
    $phi$78 = $phi$82
  } else if(((t_355.$tag==2)&&true)&&true){
    const entries2_361 = (filter(e_362 => (f_354(fst_26(e_362)))(snd_27(e_362))))(t_355.$1);
    let $phi$80;
    const $phi$81 = length(entries2_361);
    if(0==$phi$81){
      $phi$80 = Empty_11
    } else if(1==$phi$81){
      $phi$80 = (((Leaf_12(t_355.$0))(fst_26((getIx(0))(entries2_361))))(snd_27((getIx(0))(entries2_361))))
    } else if(true){
      $phi$80 = ((Collision_13(t_355.$0))(entries2_361))
    } else error("pattern match fail",$phi$81);
    $phi$78 = $phi$80
  } else if((((t_355.$tag==3)&&true)&&true)&&true){
    const pred_367 = e_370 => not_30(isEmpty_73(e_370));
    const entries2_368 = (filter(pred_367))((map(filterTrie_69(f_354)))(t_355.$2));
    const bitmap2_369 = ((foldl(r_371 => e_372 => r_371|(nodeMask_60(e_372))))(0))(entries2_368);
    let $phi$79;
    if(0==bitmap2_369){
      $phi$79 = Empty_11
    } else if(true){
      $phi$79 = (((BitmapIndexed_14(t_355.$0))(bitmap2_369))(entries2_368))
    } else error("pattern match fail",bitmap2_369);
    $phi$78 = $phi$79
  } else error("pattern match fail",t_355);
  return $phi$78
};
const nextSetBitMask_68 = m_351 => n_352 => {
  let $phi$84;
  const $phi$85 = m_351&n_352;
  if(0==$phi$85){
    $phi$84 = ((nextSetBitMask_68(m_351<<1))(n_352))
  } else if(true){
    $phi$84 = m_351
  } else error("pattern match fail",$phi$85);
  return $phi$84
};
const updateOrSet_66 = local$instance$Hashable$1 => local$instance$Eq$0 => k_323 => f_324 => d_325 => m_326 => {
  let $phi$86;
  const $phi$87 = (((lookup_64(local$instance$Hashable$1))(local$instance$Eq$0))(k_323))(m_326);
  if($phi$87.$tag==1){
    $phi$86 = (((((insert_65(local$instance$Hashable$1))(local$instance$Eq$0))(k_323))(d_325))(m_326))
  } else if(($phi$87.$tag==0)&&true){
    $phi$86 = (((((insert_65(local$instance$Hashable$1))(local$instance$Eq$0))(k_323))(f_324($phi$87.$0)))(m_326))
  } else error("pattern match fail",$phi$87);
  return $phi$86
};
const runState_58 = s_259 => m_260 => {
  let $phi$88;
  if(true&&true){
    $phi$88 = (m_260.$0(s_259))
  } else error("pattern match fail",m_260);
  return $phi$88
};
const evalState_59 = s_262 => m_263 => snd_27((runState_58(s_262))(m_263));
const sets_57 = s_257 => State_10(__258 => (Pair_3(s_257))(Unit_0));
const gets_56 = State_10(s_256 => (Pair_3(s_256))(s_256));
const foldM_53 = local$instance$Monad$0 => f_243 => r_244 => xs_245 => ((foldl(r_246 => x_247 => (($gt$gt$eq(local$instance$Monad$0))(r_246))(r_248 => (f_243(r_248))(x_247))))((ret(local$instance$Monad$0))(r_244)))(xs_245);
const mapM_54 = local$instance$Monad$0 => f_249 => xs_250 => (((foldM_53(local$instance$Monad$0))(xs_251 => x_252 => (($gt$gt$eq(local$instance$Monad$0))(f_249(x_252)))(x_253 => (ret(local$instance$Monad$0))((push(x_253))(xs_251)))))([]))(xs_250);
const forM_55 = local$instance$Monad$0 => xs_254 => f_255 => ((mapM_54(local$instance$Monad$0))(f_255))(xs_254);
const strToArray_52 = s_238 => {
  const f_239 = p_240 => {
    let $phi$89;
    if((true&&true)&&true){
      let $phi$90;
      const $phi$91 = (($lt($instance_461))(p_240.$0))(length(s_238));
      if(!$phi$91){
        $phi$90 = (Right_9(p_240.$1))
      } else if($phi$91){
        $phi$90 = (Left_8((Pair_3(p_240.$0+1))((push((getChar(p_240.$0))(s_238)))(p_240.$1))))
      } else error("pattern match fail",$phi$91);
      $phi$89 = $phi$90
    } else error("pattern match fail",p_240);
    return $phi$89
  };
  return (loop_31(f_239))((Pair_3(0))([]))
};
const toRecord_51 = (foldl(r_234 => p_235 => {
  let $phi$92;
  if((true&&true)&&true){
    $phi$92 = (((set(p_235.$0))(p_235.$1))(r_234))
  } else error("pattern match fail",p_235);
  return $phi$92
}))(empty);
const reverse_50 = (foldl(xs_232 => x_233 => (enqueue(x_233))(xs_232)))([]);
const tail_45 = slice(1);
const head_44 = getIx(0);
const uniq_49 = local$instance$Eq$0 => xs_231 => {
  let $phi$93;
  const $phi$94 = (($lt($instance_461))(length(xs_231)))(2);
  if($phi$94){
    $phi$93 = xs_231
  } else if(!$phi$94){
    let $phi$95;
    const $phi$96 = (($eq$eq(local$instance$Eq$0))((getIx(0))(xs_231)))((getIx(1))(xs_231));
    if(!$phi$96){
      $phi$95 = ((enqueue(head_44(xs_231)))((uniq_49(local$instance$Eq$0))(tail_45(xs_231))))
    } else if($phi$96){
      $phi$95 = ((uniq_49(local$instance$Eq$0))(tail_45(xs_231)))
    } else error("pattern match fail",$phi$96);
    $phi$93 = $phi$95
  } else error("pattern match fail",$phi$94);
  return $phi$93
};
const mergeSet_48 = local$instance$Ord$1 => local$instance$Eq$0 => xs_227 => ys_228 => {
  let $phi$97;
  const $phi$98 = length(xs_227);
  if(0==$phi$98){
    $phi$97 = ys_228
  } else if(true){
    let $phi$99;
    const $phi$100 = length(ys_228);
    if(0==$phi$100){
      $phi$99 = xs_227
    } else if(true){
      let $phi$101;
      const $phi$102 = (($lt(local$instance$Ord$1))(head_44(xs_227)))(head_44(ys_228));
      if($phi$102){
        $phi$101 = ((enqueue(head_44(xs_227)))((((mergeSet_48(local$instance$Ord$1))(local$instance$Eq$0))(tail_45(xs_227)))(ys_228)))
      } else if(!$phi$102){
        let $phi$103;
        const $phi$104 = (($eq$eq(local$instance$Eq$0))(head_44(xs_227)))(head_44(ys_228));
        if($phi$104){
          $phi$103 = ((enqueue(head_44(xs_227)))((((mergeSet_48(local$instance$Ord$1))(local$instance$Eq$0))(tail_45(xs_227)))(tail_45(ys_228))))
        } else if(!$phi$104){
          $phi$103 = ((enqueue(head_44(ys_228)))((((mergeSet_48(local$instance$Ord$1))(local$instance$Eq$0))(xs_227))(tail_45(ys_228))))
        } else error("pattern match fail",$phi$104);
        $phi$101 = $phi$103
      } else error("pattern match fail",$phi$102);
      $phi$99 = $phi$101
    } else error("pattern match fail",$phi$100);
    $phi$97 = $phi$99
  } else error("pattern match fail",$phi$98);
  return $phi$97
};
const init_47 = l_226 => ((slice2(0))((length(l_226))-1))(l_226);
const last_46 = l_225 => (getIx((length(l_225))-1))(l_225);
const mapJust_43 = f_219 => xs_220 => {
  const g_221 = r_222 => x_223 => {
    let $phi$105;
    const $phi$106 = f_219(x_223);
    if($phi$106.$tag==1){
      $phi$105 = r_222
    } else if(($phi$106.$tag==0)&&true){
      $phi$105 = ((push($phi$106.$0))(r_222))
    } else error("pattern match fail",$phi$106);
    return $phi$105
  };
  return ((foldl(g_221))([]))(xs_220)
};
const concatMap_42 = f_217 => a_218 => ((foldl(concat))([]))((map(f_217))(a_218));
const zip_41 = xs_215 => ys_216 => {
  let $phi$107;
  const $phi$108 = ((($eq$eq($instance_459))(length(xs_215)))(0))||((($eq$eq($instance_459))(length(ys_216)))(0));
  if($phi$108){
    $phi$107 = ([])
  } else if(!$phi$108){
    $phi$107 = ((enqueue((Pair_3(head_44(xs_215)))(head_44(ys_216))))((zip_41(tail_45(xs_215)))(tail_45(ys_216))))
  } else error("pattern match fail",$phi$108);
  return $phi$107
};
const zipWithIndex2_39 = n_212 => xs_213 => {
  let $phi$109;
  const $phi$110 = length(xs_213);
  if(0==$phi$110){
    $phi$109 = ([])
  } else if(true){
    $phi$109 = ((enqueue((Pair_3(n_212))(head_44(xs_213))))((zipWithIndex2_39(n_212+1))(tail_45(xs_213))))
  } else error("pattern match fail",$phi$110);
  return $phi$109
};
const zipWithIndex_40 = zipWithIndex2_39(0);
const join_38 = xs_207 => s_208 => {
  let $phi$111;
  const $phi$112 = length(xs_207);
  if(0==$phi$112){
    $phi$111 = ""
  } else if(true){
    $phi$111 = ((foldl1(a_210 => b_211 => (a_210+s_208)+b_211))(xs_207))
  } else error("pattern match fail",$phi$112);
  return $phi$111
};
const all_37 = f_203 => xs_204 => ((foldl(r_205 => x_206 => (f_203(x_206))&&r_205))(true))(xs_204);
const exists_36 = f_199 => xs_200 => ((foldl(r_201 => x_202 => (f_199(x_202))||r_201))(false))(xs_200);
const containsChar_35 = x_195 => xs_196 => {
  const f_197 = i_198 => {
    let $phi$113;
    const $phi$114 = (($lt($instance_461))(i_198))(length(xs_196));
    if(!$phi$114){
      $phi$113 = false
    } else if($phi$114){
      let $phi$115;
      const $phi$116 = (($eq$eq($instance_460))((getChar(i_198))(xs_196)))(x_195);
      if($phi$116){
        $phi$115 = true
      } else if(!$phi$116){
        $phi$115 = (f_197(i_198+1))
      } else error("pattern match fail",$phi$116);
      $phi$113 = $phi$115
    } else error("pattern match fail",$phi$114);
    return $phi$113
  };
  return f_197(0)
};
const contains_32 = local$instance$Eq$0 => x_184 => xs_185 => {
  const f_186 = i_187 => {
    let $phi$117;
    const $phi$118 = (($lt($instance_461))(i_187))(length(xs_185));
    if(!$phi$118){
      $phi$117 = (Right_9(false))
    } else if($phi$118){
      let $phi$119;
      const $phi$120 = (($eq$eq(local$instance$Eq$0))(x_184))((getIx(i_187))(xs_185));
      if($phi$120){
        $phi$119 = (Right_9(true))
      } else if(!$phi$120){
        $phi$119 = (Left_8(i_187+1))
      } else error("pattern match fail",$phi$120);
      $phi$117 = $phi$119
    } else error("pattern match fail",$phi$118);
    return $phi$117
  };
  return (loop_31(f_186))(0)
};
const either_28 = f_154 => g_155 => e_156 => {
  let $phi$121;
  if((e_156.$tag==0)&&true){
    $phi$121 = (f_154(e_156.$0))
  } else if((e_156.$tag==1)&&true){
    $phi$121 = (g_155(e_156.$0))
  } else error("pattern match fail",e_156);
  return $phi$121
};
const splitEither_29 = a_159 => (Pair_3((map(e_160 => {
  let $phi$122;
  if((e_160.$tag==0)&&true){
    $phi$122 = e_160.$0
  } else error("pattern match fail",e_160);
  return $phi$122
}))((filter((either_28(__162 => true))(__163 => false)))(a_159))))((map(e_164 => {
  let $phi$123;
  if((e_164.$tag==1)&&true){
    $phi$123 = e_164.$0
  } else error("pattern match fail",e_164);
  return $phi$123
}))((filter((either_28(__166 => false))(__167 => true)))(a_159)));
const fromJust_24 = m_144 => {
  let $phi$124;
  if((m_144.$tag==0)&&true){
    $phi$124 = m_144.$0
  } else if(m_144.$tag==1){
    $phi$124 = (error("expected Just but got Nothing"))
  } else error("pattern match fail",m_144);
  return $phi$124
};
const justOr_23 = d_141 => m_142 => {
  let $phi$125;
  if((m_142.$tag==0)&&true){
    $phi$125 = m_142.$0
  } else if(m_142.$tag==1){
    $phi$125 = d_141
  } else error("pattern match fail",m_142);
  return $phi$125
};
const maybe_22 = a_137 => b_138 => m_139 => {
  let $phi$126;
  if((m_139.$tag==0)&&true){
    $phi$126 = (a_137(m_139.$0))
  } else if(m_139.$tag==1){
    $phi$126 = b_138
  } else error("pattern match fail",m_139);
  return $phi$126
};
const $gt$gt_21 = local$instance$Monad$0 => a_134 => b_135 => (($gt$gt$eq(local$instance$Monad$0))(a_134))(__136 => b_135);
const $gt$eq_20 = local$instance$Ord$0 => a_132 => b_133 => not_30((($lt(local$instance$Ord$0))(a_132))(b_133));
const $lt$eq_19 = local$instance$Ord$0 => a_130 => b_131 => not_30((($lt(local$instance$Ord$0))(b_131))(a_130));
const $gt_18 = local$instance$Ord$0 => a_128 => b_129 => (($lt(local$instance$Ord$0))(b_129))(a_128);
const assert_529 = assert_90;
const Pair_530 = Pair_3;
const mapSnd_531 = mapSnd_89;
const mapFst_532 = mapFst_88;
const $gt$eq$gt_533 = $gt$eq$gt_87;
const snd_534 = snd_27;
const debug2_535 = debug2_86;
const Just_536 = Just_1;
const Nothing_537 = Nothing_2;
const isJust_538 = isJust_25;
const Empty_539 = Empty_11;
const Leaf_540 = Leaf_12;
const Collision_541 = Collision_13;
const BitmapIndexed_542 = BitmapIndexed_14;
const $_543 = $_16;
const fst_544 = fst_26;
const Left_545 = Left_8;
const Right_546 = Right_9;
const loop_547 = loop_31;
const find_548 = find_33;
const hamtMask_549 = hamtMask_62;
const popCount_550 = popCount_61;
const hamtIndex_551 = hamtIndex_63;
const lookup_552 = lookup_64;
const setContains_553 = setContains_81;
const foldTrie_554 = foldTrie_70;
const emptySet_555 = emptySet_77;
const Unit_556 = Unit_0;
const not_557 = not_30;
const $div$eq_558 = $div$eq_17;
const mapIx_559 = mapIx_34;
const insert_560 = insert_65;
const setAdd_561 = setAdd_78;
const setIntersection_562 = setIntersection_85;
const remove_563 = remove_67;
const setDiff_564 = setDiff_84;
const setToArray_565 = setToArray_83;
const mergeTrie_566 = mergeTrie_74;
const setUnion_567 = setUnion_82;
const setRemove_568 = setRemove_80;
const setAddAll_569 = setAddAll_79;
const trieEntries_570 = trieEntries_76;
const trieKeys_571 = trieKeys_75;
const size_572 = size_72;
const mapTrie_573 = mapTrie_71;
const nodeMask_574 = nodeMask_60;
const isEmpty_575 = isEmpty_73;
const filterTrie_576 = filterTrie_69;
const nextSetBitMask_577 = nextSetBitMask_68;
const updateOrSet_578 = updateOrSet_66;
const State_579 = State_10;
const runState_580 = runState_58;
const evalState_581 = evalState_59;
const sets_582 = sets_57;
const gets_583 = gets_56;
const foldM_584 = foldM_53;
const mapM_585 = mapM_54;
const forM_586 = forM_55;
const strToArray_587 = strToArray_52;
const toRecord_588 = toRecord_51;
const reverse_589 = reverse_50;
const tail_590 = tail_45;
const head_591 = head_44;
const uniq_592 = uniq_49;
const mergeSet_593 = mergeSet_48;
const init_594 = init_47;
const last_595 = last_46;
const mapJust_596 = mapJust_43;
const concatMap_597 = concatMap_42;
const zip_598 = zip_41;
const zipWithIndex2_599 = zipWithIndex2_39;
const zipWithIndex_600 = zipWithIndex_40;
const join_601 = join_38;
const all_602 = all_37;
const exists_603 = exists_36;
const containsChar_604 = containsChar_35;
const contains_605 = contains_32;
const either_606 = either_28;
const splitEither_607 = splitEither_29;
const fromJust_608 = fromJust_24;
const justOr_609 = justOr_23;
const maybe_610 = maybe_22;
const $gt$gt_611 = $gt$gt_21;
const $gt$eq_612 = $gt$eq_20;
const $lt$eq_613 = $lt$eq_19;
const $gt_614 = $gt_18;
const Identity_615 = Identity_15;
const Tuple6_616 = Tuple6_7;
const Tuple5_617 = Tuple5_6;
const Tuple4_618 = Tuple4_5;
const Tuple3_619 = Tuple3_4;
const dfs_620 = g_624 => visited_625 => v_626 => {
  const visit_627 = r_630 => e_631 => {
    let $phi$127;
    const $phi$128 = ((contains_605($instance_460))(e_631))(r_630);
    if($phi$128){
      $phi$127 = r_630
    } else if(!$phi$128){
      $phi$127 = ((concat(((dfs_620(g_624))((push(v_626))((concat(r_630))(visited_625))))(e_631)))(r_630))
    } else error("pattern match fail",$phi$128);
    return $phi$127
  };
  const es_628 = (filter(v_632 => not_557(((contains_605($instance_460))(v_632))(visited_625))))((get(v_626))(g_624));
  const r_629 = ((foldr(visit_627))([]))(es_628);
  return (enqueue(v_626))(r_629)
};
const fullDfs_621 = g_633 => {
  const visit_634 = result_636 => v_637 => __638 => {
    let $phi$129;
    const $phi$130 = ((contains_605($instance_460))(v_637))(result_636);
    if($phi$130){
      $phi$129 = result_636
    } else if(!$phi$130){
      $phi$129 = ((concat(((dfs_620(g_633))(result_636))(v_637)))(result_636))
    } else error("pattern match fail",$phi$130);
    return $phi$129
  };
  const result_635 = ((foldRecord(visit_634))([]))(g_633);
  return result_635
};
const scc_622 = g_639 => {
  const invertEdge_644 = v_646 => ig_647 => e_648 => {
    let $phi$131;
    const $phi$132 = (has(e_648))(ig_647);
    if($phi$132){
      $phi$131 = (((set(e_648))((push(v_646))((get(e_648))(ig_647))))(ig_647))
    } else if(!$phi$132){
      $phi$131 = (((set(e_648))([v_646]))(ig_647))
    } else error("pattern match fail",$phi$132);
    return $phi$131
  };
  const invert_645 = ig_649 => v_650 => es_651 => {
    let $phi$133;
    const $phi$134 = (has(v_650))(ig_649);
    if($phi$134){
      $phi$133 = ig_649
    } else if(!$phi$134){
      $phi$133 = (((set(v_650))([]))(ig_649))
    } else error("pattern match fail",$phi$134);
    const ig2_652 = $phi$133;
    return ((foldl(invertEdge_644(v_650)))(ig2_652))(es_651)
  };
  const invertedG_640 = ((foldRecord(invert_645))(empty))(g_639);
  const assembleCc_641 = gs_653 => v_654 => {
    let $phi$135;
    if((true&&true)&&true){
      let $phi$136;
      const $phi$137 = (exists_603((contains_605($instance_460))(v_654)))(gs_653.$1);
      if($phi$137){
        $phi$136 = ((Pair_530(gs_653.$0))(gs_653.$1))
      } else if(!$phi$137){
        const cc_657 = ((dfs_620(gs_653.$0))([]))(v_654);
        const ig2_658 = ((foldl(g_659 => v_660 => (del(v_660))((mapRecord(filter(w_661 => (($div$eq_558($instance_460))(w_661))(v_660))))(g_659))))(gs_653.$0))(cc_657);
        $phi$136 = ((Pair_530(ig2_658))((push(cc_657))(gs_653.$1)))
      } else error("pattern match fail",$phi$137);
      $phi$135 = $phi$136
    } else error("pattern match fail",gs_653);
    return $phi$135
  };
  const firstDfs_642 = fullDfs_621(g_639);
  const ccs_643 = snd_534(((foldl(assembleCc_641))((Pair_530(invertedG_640))([])))(firstDfs_642));
  return ccs_643
};
const sccSorted_623 = g_662 => {
  const ccs_663 = scc_622(g_662);
  const topSort_664 = ccs_666 => {
    const f_671 = r_672 => icc_673 => {
      let $phi$138;
      if((true&&true)&&true){
        $phi$138 = (((foldl(r_676 => c_677 => ((set(c_677))(intToString(icc_673.$0)))(r_676)))(r_672))(icc_673.$1))
      } else error("pattern match fail",icc_673);
      return $phi$138
    };
    const g2g_667 = ((foldl(f_671))(empty))(zipWithIndex_600(ccs_666));
    const addGraph_668 = r_678 => v_679 => es_680 => {
      const rv_681 = (get(v_679))(g2g_667);
      const res_682 = (uniq_592($instance_460))(sort((filter(re_683 => (($div$eq_558($instance_460))(re_683))(rv_681)))((map(e_684 => (get(e_684))(g2g_667)))(es_680))));
      let $phi$139;
      const $phi$140 = (has(rv_681))(r_678);
      if(!$phi$140){
        $phi$139 = (((set(rv_681))(res_682))(r_678))
      } else if($phi$140){
        $phi$139 = (((set(rv_681))((((mergeSet_593($instance_462))($instance_460))(res_682))((get(rv_681))(r_678))))(r_678))
      } else error("pattern match fail",$phi$140);
      return $phi$139
    };
    const cg_669 = ((foldRecord(addGraph_668))(empty))(g_662);
    const ord_670 = fullDfs_621(cg_669);
    return reverse_589((map(i_685 => (getIx(unsafeStringToInt(i_685)))(ccs_666)))(ord_670))
  };
  const result_665 = topSort_664(ccs_663);
  return result_665
};
const assert_686 = assert_90;
const Pair_687 = Pair_3;
const mapSnd_688 = mapSnd_89;
const mapFst_689 = mapFst_88;
const $gt$eq$gt_690 = $gt$eq$gt_87;
const snd_691 = snd_27;
const debug2_692 = debug2_86;
const Just_693 = Just_1;
const Nothing_694 = Nothing_2;
const isJust_695 = isJust_25;
const Empty_696 = Empty_11;
const Leaf_697 = Leaf_12;
const Collision_698 = Collision_13;
const BitmapIndexed_699 = BitmapIndexed_14;
const $_700 = $_16;
const fst_701 = fst_26;
const Left_702 = Left_8;
const Right_703 = Right_9;
const loop_704 = loop_31;
const find_705 = find_33;
const hamtMask_706 = hamtMask_62;
const popCount_707 = popCount_61;
const hamtIndex_708 = hamtIndex_63;
const lookup_709 = lookup_64;
const setContains_710 = setContains_81;
const foldTrie_711 = foldTrie_70;
const emptySet_712 = emptySet_77;
const Unit_713 = Unit_0;
const not_714 = not_30;
const $div$eq_715 = $div$eq_17;
const mapIx_716 = mapIx_34;
const insert_717 = insert_65;
const setAdd_718 = setAdd_78;
const setIntersection_719 = setIntersection_85;
const remove_720 = remove_67;
const setDiff_721 = setDiff_84;
const setToArray_722 = setToArray_83;
const mergeTrie_723 = mergeTrie_74;
const setUnion_724 = setUnion_82;
const setRemove_725 = setRemove_80;
const setAddAll_726 = setAddAll_79;
const trieEntries_727 = trieEntries_76;
const trieKeys_728 = trieKeys_75;
const size_729 = size_72;
const mapTrie_730 = mapTrie_71;
const nodeMask_731 = nodeMask_60;
const isEmpty_732 = isEmpty_73;
const filterTrie_733 = filterTrie_69;
const nextSetBitMask_734 = nextSetBitMask_68;
const updateOrSet_735 = updateOrSet_66;
const State_736 = State_10;
const runState_737 = runState_58;
const evalState_738 = evalState_59;
const sets_739 = sets_57;
const gets_740 = gets_56;
const foldM_741 = foldM_53;
const mapM_742 = mapM_54;
const forM_743 = forM_55;
const strToArray_744 = strToArray_52;
const toRecord_745 = toRecord_51;
const reverse_746 = reverse_50;
const tail_747 = tail_45;
const head_748 = head_44;
const uniq_749 = uniq_49;
const mergeSet_750 = mergeSet_48;
const init_751 = init_47;
const last_752 = last_46;
const mapJust_753 = mapJust_43;
const concatMap_754 = concatMap_42;
const zip_755 = zip_41;
const zipWithIndex2_756 = zipWithIndex2_39;
const zipWithIndex_757 = zipWithIndex_40;
const join_758 = join_38;
const all_759 = all_37;
const exists_760 = exists_36;
const containsChar_761 = containsChar_35;
const contains_762 = contains_32;
const either_763 = either_28;
const splitEither_764 = splitEither_29;
const fromJust_765 = fromJust_24;
const justOr_766 = justOr_23;
const maybe_767 = maybe_22;
const $gt$gt_768 = $gt$gt_21;
const $gt$eq_769 = $gt$eq_20;
const $lt$eq_770 = $lt$eq_19;
const $gt_771 = $gt_18;
const Identity_772 = Identity_15;
const Tuple6_773 = Tuple6_7;
const Tuple5_774 = Tuple5_6;
const Tuple4_775 = Tuple4_5;
const Tuple3_776 = Tuple3_4;
const App_785 = $_0_852 => $_1_853 => $_2_854 => ({$0:$_0_852,$1:$_1_853,$2:$_2_854,$tag:2});
const Lam_786 = $_0_855 => $_1_856 => $_2_857 => ({$0:$_0_855,$1:$_1_856,$2:$_2_857,$tag:3});
const Case_787 = $_0_858 => $_1_859 => $_2_860 => ({$0:$_0_858,$1:$_1_859,$2:$_2_860,$tag:4});
const Let_788 = $_0_861 => $_1_862 => $_2_863 => ({$0:$_0_861,$1:$_1_862,$2:$_2_863,$tag:5});
const New_789 = $_0_864 => $_1_865 => $_2_866 => ({$0:$_0_864,$1:$_1_865,$2:$_2_866,$tag:6});
const AnnType_777 = $_0_841 => ({$0:$_0_841,$tag:0});
const TUnknown_809 = {$tag:7};
const Var_783 = $_0_848 => $_1_849 => ({$0:$_0_848,$1:$_1_849,$tag:0});
const Const_784 = $_0_850 => $_1_851 => ({$0:$_0_850,$1:$_1_851,$tag:1});
const Data_797 = $_0_886 => $_1_887 => $_2_888 => $_3_889 => ({$0:$_0_886,$1:$_1_887,$2:$_2_888,$3:$_3_889});
const DataCon_798 = $_0_890 => $_1_891 => $_2_892 => ({$0:$_0_890,$1:$_1_891,$2:$_2_892});
const TCBound_801 = $_0_901 => $_1_902 => $_2_903 => ({$0:$_0_901,$1:$_1_902,$2:$_2_903});
const TConst_802 = $_0_904 => $_1_905 => ({$0:$_0_904,$1:$_1_905,$tag:0});
const TVar_803 = $_0_906 => $_1_907 => ({$0:$_0_906,$1:$_1_907,$tag:1});
const TSkolem_804 = $_0_908 => $_1_909 => ({$0:$_0_908,$1:$_1_909,$tag:2});
const TApp_805 = $_0_910 => $_1_911 => $_2_912 => ({$0:$_0_910,$1:$_1_911,$2:$_2_912,$tag:3});
const TRow_806 = $_0_913 => $_1_914 => $_2_915 => ({$0:$_0_913,$1:$_1_914,$2:$_2_915,$tag:4});
const TBot_807 = {$tag:5};
const TForall_808 = $_0_916 => $_1_917 => $_2_918 => $_3_919 => ({$0:$_0_916,$1:$_1_917,$2:$_2_918,$3:$_3_919,$tag:6});
const AnnCodeLoc_778 = $_0_842 => $_1_843 => $_2_844 => ({$0:$_0_842,$1:$_1_843,$2:$_2_844,$tag:1});
const ImportAll_812 = $_0_926 => $_1_927 => ({$0:$_0_926,$1:$_1_927,$tag:2});
const ImportOpen_811 = $_0_923 => $_1_924 => $_2_925 => ({$0:$_0_923,$1:$_1_924,$2:$_2_925,$tag:1});
const ImportClosed_810 = $_0_920 => $_1_921 => $_2_922 => ({$0:$_0_920,$1:$_1_921,$2:$_2_922,$tag:0});
const Instance_800 = $_0_897 => $_1_898 => $_2_899 => $_3_900 => ({$0:$_0_897,$1:$_1_898,$2:$_2_899,$3:$_3_900});
const Class_799 = $_0_893 => $_1_894 => $_2_895 => $_3_896 => ({$0:$_0_893,$1:$_1_894,$2:$_2_895,$3:$_3_896});
const ModuleInterface_796 = $_0_883 => $_1_884 => $_2_885 => ({$0:$_0_883,$1:$_1_884,$2:$_2_885});
const Module_795 = $_0_876 => $_1_877 => $_2_878 => $_3_879 => $_4_880 => $_5_881 => $_6_882 => ({$0:$_0_876,$1:$_1_877,$2:$_2_878,$3:$_3_879,$4:$_4_880,$5:$_5_881,$6:$_6_882});
const PData_794 = $_0_873 => $_1_874 => $_2_875 => ({$0:$_0_873,$1:$_1_874,$2:$_2_875,$tag:2});
const PConst_793 = $_0_871 => $_1_872 => ({$0:$_0_871,$1:$_1_872,$tag:1});
const PVar_792 = $_0_869 => $_1_870 => ({$0:$_0_869,$1:$_1_870,$tag:0});
const CStr_791 = $_0_868 => ({$0:$_0_868,$tag:1});
const CNum_790 = $_0_867 => ({$0:$_0_867,$tag:0});
const AnnExport_782 = $_0_847 => ({$0:$_0_847,$tag:5});
const AnnTag_781 = {$tag:4};
const AnnData_780 = $_0_846 => ({$0:$_0_846,$tag:3});
const AnnUseCount_779 = $_0_845 => ({$0:$_0_845,$tag:2});
const breakableDownAndUpM_836 = local$instance$Monad$0 => down_1138 => up_1139 => e_1140 => {
  const go_1141 = ((breakableDownAndUpM_836(local$instance$Monad$0))(down_1138))(up_1139);
  const gos_1142 = (mapM_742(local$instance$Monad$0))(d_1143 => {
    let $phi$141;
    if((true&&true)&&true){
      $phi$141 = ((($gt$gt$eq(local$instance$Monad$0))(go_1141(d_1143.$1)))(e_1146 => (ret(local$instance$Monad$0))((Pair_687(d_1143.$0))(e_1146))))
    } else error("pattern match fail",d_1143);
    return $phi$141
  });
  return (($gt$gt$eq(local$instance$Monad$0))(down_1138(e_1140)))(e_1147 => {
    let $phi$142;
    if((e_1147.$tag==1)&&true){
      $phi$142 = ((ret(local$instance$Monad$0))(e_1147.$0))
    } else if((e_1147.$tag==0)&&true){
      let $phi$143;
      if((((e_1147.$0.$tag==3)&&true)&&true)&&true){
        $phi$143 = ((($gt$gt$eq(local$instance$Monad$0))(go_1141(e_1147.$0.$2)))(e_1153 => up_1139(((Lam_786(e_1147.$0.$0))(e_1147.$0.$1))(e_1153))))
      } else if((((e_1147.$0.$tag==2)&&true)&&true)&&true){
        $phi$143 = ((($gt$gt$eq(local$instance$Monad$0))(go_1141(e_1147.$0.$1)))(f_1157 => (($gt$gt$eq(local$instance$Monad$0))(go_1141(e_1147.$0.$2)))(x_1158 => up_1139(((App_785(e_1147.$0.$0))(f_1157))(x_1158)))))
      } else if((((e_1147.$0.$tag==4)&&true)&&true)&&true){
        $phi$143 = ((($gt$gt$eq(local$instance$Monad$0))(go_1141(e_1147.$0.$1)))(e_1162 => (($gt$gt$eq(local$instance$Monad$0))(gos_1142(e_1147.$0.$2)))(ps_1163 => up_1139(((Case_787(e_1147.$0.$0))(e_1162))(ps_1163)))))
      } else if((((e_1147.$0.$tag==5)&&true)&&true)&&true){
        $phi$143 = ((($gt$gt$eq(local$instance$Monad$0))(gos_1142(e_1147.$0.$1)))(bs_1167 => (($gt$gt$eq(local$instance$Monad$0))(go_1141(e_1147.$0.$2)))(e_1168 => up_1139(((Let_788(e_1147.$0.$0))(bs_1167))(e_1168)))))
      } else if((((e_1147.$0.$tag==6)&&true)&&true)&&true){
        $phi$143 = ((($gt$gt$eq(local$instance$Monad$0))(((mapM_742(local$instance$Monad$0))(go_1141))(e_1147.$0.$2)))(es_1172 => up_1139(((New_789(e_1147.$0.$0))(e_1147.$0.$1))(es_1172))))
      } else if(true){
        $phi$143 = (up_1139(e_1147.$0))
      } else error("pattern match fail",e_1147.$0);
      $phi$142 = $phi$143
    } else error("pattern match fail",e_1147);
    return $phi$142
  })
};
const breakableDownM_840 = local$instance$Monad$0 => f_1179 => ((breakableDownAndUpM_836(local$instance$Monad$0))(f_1179))(ret(local$instance$Monad$0));
const downAndUpM_837 = local$instance$Monad$0 => down_1174 => up_1175 => ((breakableDownAndUpM_836(local$instance$Monad$0))(e_1176 => (($gt$gt$eq(local$instance$Monad$0))(down_1174(e_1176)))(e_1177 => (ret(local$instance$Monad$0))(Left_702(e_1177)))))(up_1175);
const downM_839 = local$instance$Monad$0 => f_1178 => ((downAndUpM_837(local$instance$Monad$0))(f_1178))(ret(local$instance$Monad$0));
const upM_838 = local$instance$Monad$0 => (downAndUpM_837(local$instance$Monad$0))(ret(local$instance$Monad$0));
const breakableDownAndUp_831 = down_1076 => up_1077 => a_1078 => e_1079 => {
  const go_1080 = (breakableDownAndUp_831(down_1076))(up_1077);
  const gos_1081 = a_1082 => (foldl(ar_1083 => p_1084 => {
    let $phi$144;
    const $phi$145 = (go_1080(fst_701(ar_1083)))(snd_691(p_1084));
    if((true&&true)&&true){
      $phi$144 = ((Pair_687($phi$145.$0))((push((Pair_687(fst_701(p_1084)))($phi$145.$1)))(snd_691(ar_1083))))
    } else error("pattern match fail",$phi$145);
    return $phi$144
  }))((Pair_687(a_1082))([]));
  let $phi$146;
  const $phi$147 = (down_1076(a_1078))(e_1079);
  if(($phi$147.$tag==1)&&true){
    $phi$146 = $phi$147.$0
  } else if(($phi$147.$tag==0)&&((true&&true)&&true)){
    let $phi$148;
    if(((($phi$147.$0.$1.$tag==3)&&true)&&true)&&true){
      let $phi$166;
      const $phi$167 = (go_1080($phi$147.$0.$0))($phi$147.$0.$1.$2);
      if((true&&true)&&true){
        $phi$166 = ((Pair_687($phi$167.$0))(((Lam_786($phi$147.$0.$1.$0))($phi$147.$0.$1.$1))($phi$167.$1)))
      } else error("pattern match fail",$phi$167);
      $phi$148 = $phi$166
    } else if(((($phi$147.$0.$1.$tag==2)&&true)&&true)&&true){
      let $phi$162;
      const $phi$163 = (go_1080($phi$147.$0.$0))($phi$147.$0.$1.$1);
      if((true&&true)&&true){
        let $phi$164;
        const $phi$165 = (go_1080($phi$163.$0))($phi$147.$0.$1.$2);
        if((true&&true)&&true){
          $phi$164 = ((Pair_687($phi$165.$0))(((App_785($phi$147.$0.$1.$0))($phi$163.$1))($phi$165.$1)))
        } else error("pattern match fail",$phi$165);
        $phi$162 = $phi$164
      } else error("pattern match fail",$phi$163);
      $phi$148 = $phi$162
    } else if(((($phi$147.$0.$1.$tag==4)&&true)&&true)&&true){
      let $phi$158;
      const $phi$159 = (go_1080($phi$147.$0.$0))($phi$147.$0.$1.$1);
      if((true&&true)&&true){
        let $phi$160;
        const $phi$161 = (gos_1081($phi$159.$0))($phi$147.$0.$1.$2);
        if((true&&true)&&true){
          $phi$160 = ((Pair_687($phi$161.$0))(((Case_787($phi$147.$0.$1.$0))($phi$159.$1))($phi$161.$1)))
        } else error("pattern match fail",$phi$161);
        $phi$158 = $phi$160
      } else error("pattern match fail",$phi$159);
      $phi$148 = $phi$158
    } else if(((($phi$147.$0.$1.$tag==5)&&true)&&true)&&true){
      let $phi$154;
      const $phi$155 = (gos_1081($phi$147.$0.$0))($phi$147.$0.$1.$1);
      if((true&&true)&&true){
        let $phi$156;
        const $phi$157 = (go_1080($phi$155.$0))($phi$147.$0.$1.$2);
        if((true&&true)&&true){
          $phi$156 = ((Pair_687($phi$157.$0))(((Let_788($phi$147.$0.$1.$0))($phi$155.$1))($phi$157.$1)))
        } else error("pattern match fail",$phi$157);
        $phi$154 = $phi$156
      } else error("pattern match fail",$phi$155);
      $phi$148 = $phi$154
    } else if(((($phi$147.$0.$1.$tag==6)&&true)&&true)&&true){
      const f_1120 = aes_1121 => e_1122 => {
        let $phi$149;
        if((true&&true)&&true){
          let $phi$150;
          const $phi$151 = (go_1080(aes_1121.$0))(e_1122);
          if((true&&true)&&true){
            $phi$150 = ((Pair_687($phi$151.$0))((push($phi$151.$1))(aes_1121.$1)))
          } else error("pattern match fail",$phi$151);
          $phi$149 = $phi$150
        } else error("pattern match fail",aes_1121);
        return $phi$149
      };
      let $phi$152;
      const $phi$153 = ((foldl(f_1120))((Pair_687(a_1078))([])))($phi$147.$0.$1.$2);
      if((true&&true)&&true){
        $phi$152 = ((Pair_687($phi$153.$0))(((New_789($phi$147.$0.$1.$0))($phi$147.$0.$1.$1))($phi$153.$1)))
      } else error("pattern match fail",$phi$153);
      $phi$148 = $phi$152
    } else if(true){
      $phi$148 = ((Pair_687($phi$147.$0.$0))($phi$147.$0.$1))
    } else error("pattern match fail",$phi$147.$0.$1);
    const ae_1090 = $phi$148;
    let $phi$168;
    if((true&&true)&&true){
      $phi$168 = ((up_1077(ae_1090.$0))(ae_1090.$1))
    } else error("pattern match fail",ae_1090);
    $phi$146 = $phi$168
  } else error("pattern match fail",$phi$147);
  return $phi$146
};
const breakableDown_835 = f_1137 => (breakableDownAndUp_831(f_1137))(Pair_687);
const downAndUp_832 = down_1132 => up_1133 => (breakableDownAndUp_831(a_1134 => e_1135 => Left_702((down_1132(a_1134))(e_1135))))(up_1133);
const down_834 = f_1136 => (downAndUp_832(f_1136))(Pair_687);
const up_833 = downAndUp_832(Pair_687);
const getAnn_814 = local$instance$Hashable$1 => local$instance$Eq$0 => name_928 => ann_929 => (((lookup_709(local$instance$Hashable$1))(local$instance$Eq$0))(name_928))(ann_929);
const getAnnType_817 = ann_939 => {
  let $phi$169;
  const $phi$170 = (((getAnn_814($instance_515))($instance_460))("type"))(ann_939);
  if(($phi$170.$tag==0)&&(($phi$170.$0.$tag==0)&&true)){
    $phi$169 = $phi$170.$0.$0
  } else if($phi$170.$tag==1){
    $phi$169 = TUnknown_809
  } else error("pattern match fail",$phi$170);
  return $phi$169
};
const annOf_828 = e_1034 => {
  let $phi$171;
  if(((e_1034.$tag==0)&&true)&&true){
    $phi$171 = e_1034.$0
  } else if(((e_1034.$tag==1)&&true)&&true){
    $phi$171 = e_1034.$0
  } else if((((e_1034.$tag==2)&&true)&&true)&&true){
    $phi$171 = e_1034.$0
  } else if((((e_1034.$tag==3)&&true)&&true)&&true){
    $phi$171 = e_1034.$0
  } else if((((e_1034.$tag==4)&&true)&&true)&&true){
    $phi$171 = e_1034.$0
  } else if((((e_1034.$tag==5)&&true)&&true)&&true){
    $phi$171 = e_1034.$0
  } else if((((e_1034.$tag==6)&&true)&&true)&&true){
    $phi$171 = e_1034.$0
  } else error("pattern match fail",e_1034);
  return $phi$171
};
const getType_830 = e_1075 => ($_700(getAnnType_817))(annOf_828(e_1075));
const withAnn_829 = ann_1054 => e_1055 => {
  let $phi$172;
  if(((e_1055.$tag==0)&&true)&&true){
    $phi$172 = ((Var_783(ann_1054))(e_1055.$1))
  } else if(((e_1055.$tag==1)&&true)&&true){
    $phi$172 = ((Const_784(ann_1054))(e_1055.$1))
  } else if((((e_1055.$tag==2)&&true)&&true)&&true){
    $phi$172 = (((App_785(ann_1054))(e_1055.$1))(e_1055.$2))
  } else if((((e_1055.$tag==3)&&true)&&true)&&true){
    $phi$172 = (((Lam_786(ann_1054))(e_1055.$1))(e_1055.$2))
  } else if((((e_1055.$tag==4)&&true)&&true)&&true){
    $phi$172 = (((Case_787(ann_1054))(e_1055.$1))(e_1055.$2))
  } else if((((e_1055.$tag==5)&&true)&&true)&&true){
    $phi$172 = (((Let_788(ann_1054))(e_1055.$1))(e_1055.$2))
  } else if((((e_1055.$tag==6)&&true)&&true)&&true){
    $phi$172 = (((New_789(ann_1054))(e_1055.$1))(e_1055.$2))
  } else error("pattern match fail",e_1055);
  return $phi$172
};
const setAnn_815 = local$instance$Hashable$1 => local$instance$Eq$0 => name_930 => val_931 => ann_932 => ((((insert_717(local$instance$Hashable$1))(local$instance$Eq$0))(name_930))(val_931))(ann_932);
const setAnnType_818 = t_941 => ann_942 => ((((setAnn_815($instance_515))($instance_460))("type"))(AnnType_777(t_941)))(ann_942);
const setType_827 = t_1013 => e_1014 => {
  let $phi$173;
  if(((e_1014.$tag==0)&&true)&&true){
    $phi$173 = ((Var_783((setAnnType_818(t_1013))(e_1014.$0)))(e_1014.$1))
  } else if(((e_1014.$tag==1)&&true)&&true){
    $phi$173 = ((Const_784((setAnnType_818(t_1013))(e_1014.$0)))(e_1014.$1))
  } else if((((e_1014.$tag==2)&&true)&&true)&&true){
    $phi$173 = (((App_785((setAnnType_818(t_1013))(e_1014.$0)))(e_1014.$1))(e_1014.$2))
  } else if((((e_1014.$tag==3)&&true)&&true)&&true){
    $phi$173 = (((Lam_786((setAnnType_818(t_1013))(e_1014.$0)))(e_1014.$1))(e_1014.$2))
  } else if((((e_1014.$tag==4)&&true)&&true)&&true){
    $phi$173 = (((Case_787((setAnnType_818(t_1013))(e_1014.$0)))(e_1014.$1))(e_1014.$2))
  } else if((((e_1014.$tag==5)&&true)&&true)&&true){
    $phi$173 = (((Let_788((setAnnType_818(t_1013))(e_1014.$0)))(e_1014.$1))(e_1014.$2))
  } else if((((e_1014.$tag==6)&&true)&&true)&&true){
    $phi$173 = (((New_789((setAnnType_818(t_1013))(e_1014.$0)))(e_1014.$1))(e_1014.$2))
  } else error("pattern match fail",e_1014);
  return $phi$173
};
const dataConName_825 = dc_1004 => {
  let $phi$174;
  if(((true&&true)&&true)&&true){
    $phi$174 = dc_1004.$1
  } else error("pattern match fail",dc_1004);
  return $phi$174
};
const dataConNames_826 = d_1008 => {
  let $phi$175;
  if((((true&&true)&&true)&&true)&&true){
    $phi$175 = ((map(dataConName_825))(d_1008.$3))
  } else error("pattern match fail",d_1008);
  return $phi$175
};
const equivBound_823 = a_954 => b_955 => {
  let $phi$176;
  if(((true&&true)&&true)&&true){
    let $phi$177;
    if(((true&&true)&&true)&&true){
      $phi$177 = (((($eq$eq($instance_460))(a_954.$1))(b_955.$1))&&((equivType_824(a_954.$2))(b_955.$2)))
    } else error("pattern match fail",b_955);
    $phi$176 = $phi$177
  } else error("pattern match fail",a_954);
  return $phi$176
};
const equivType_824 = a_962 => b_963 => {
  let $phi$178;
  if(((a_962.$tag==0)&&true)&&true){
    let $phi$185;
    if(((b_963.$tag==0)&&true)&&true){
      $phi$185 = ((($eq$eq($instance_460))(a_962.$1))(b_963.$1))
    } else if(true){
      $phi$185 = false
    } else error("pattern match fail",b_963);
    $phi$178 = $phi$185
  } else if(((a_962.$tag==1)&&true)&&true){
    let $phi$184;
    if(((b_963.$tag==1)&&true)&&true){
      $phi$184 = ((($eq$eq($instance_460))(a_962.$1))(b_963.$1))
    } else if(true){
      $phi$184 = false
    } else error("pattern match fail",b_963);
    $phi$178 = $phi$184
  } else if(((a_962.$tag==2)&&true)&&true){
    let $phi$183;
    if(((b_963.$tag==2)&&true)&&true){
      $phi$183 = ((($eq$eq($instance_460))(a_962.$1))(b_963.$1))
    } else if(true){
      $phi$183 = false
    } else error("pattern match fail",b_963);
    $phi$178 = $phi$183
  } else if((((a_962.$tag==3)&&true)&&true)&&true){
    let $phi$182;
    if((((b_963.$tag==3)&&true)&&true)&&true){
      $phi$182 = (((equivType_824(a_962.$1))(b_963.$1))&&((equivType_824(a_962.$2))(b_963.$2)))
    } else if(true){
      $phi$182 = false
    } else error("pattern match fail",b_963);
    $phi$178 = $phi$182
  } else if(a_962.$tag==5){
    let $phi$181;
    if(b_963.$tag==5){
      $phi$181 = true
    } else if(true){
      $phi$181 = false
    } else error("pattern match fail",b_963);
    $phi$178 = $phi$181
  } else if(a_962.$tag==7){
    let $phi$180;
    if(b_963.$tag==7){
      $phi$180 = true
    } else if(true){
      $phi$180 = false
    } else error("pattern match fail",b_963);
    $phi$178 = $phi$180
  } else if((((a_962.$tag==4)&&true)&&true)&&true){
    $phi$178 = (error("no support for TRow in equivType yet"))
  } else if(((((a_962.$tag==6)&&true)&&true)&&true)&&true){
    let $phi$179;
    if(((((b_963.$tag==6)&&true)&&true)&&true)&&true){
      const rbs_1000 = (all_759(p_1002 => (equivBound_823(fst_701(p_1002)))(snd_691(p_1002))))((zip_755(a_962.$2))(b_963.$2));
      const rvs_999 = (all_759(p_1001 => (($eq$eq($instance_460))(fst_701(p_1001)))(snd_691(p_1001))))((zip_755(a_962.$1))(b_963.$1));
      $phi$179 = ((rvs_999&&rbs_1000)&&((equivType_824(a_962.$3))(b_963.$3)))
    } else if(true){
      $phi$179 = false
    } else error("pattern match fail",b_963);
    $phi$178 = $phi$179
  } else error("pattern match fail",a_962);
  return $phi$178
};
const getAnnCodeLoc_819 = ann_943 => (((getAnn_814($instance_515))($instance_460))("codeLoc"))(ann_943);
const printCodeLoc_821 = l_948 => {
  let $phi$186;
  if((((l_948.$tag==1)&&true)&&true)&&true){
    $phi$186 = ((((("in "+l_948.$0)+" at line ")+(intToString(l_948.$1+1)))+", column ")+(intToString(l_948.$2+1)))
  } else error("pattern match fail",l_948);
  return $phi$186
};
const exprLoc_822 = e_952 => {
  let $phi$187;
  const $phi$188 = ($_700(getAnnCodeLoc_819))(annOf_828(e_952));
  if($phi$188.$tag==1){
    $phi$187 = "in unknown location"
  } else if(($phi$188.$tag==0)&&true){
    $phi$187 = (printCodeLoc_821($phi$188.$0))
  } else error("pattern match fail",$phi$188);
  return $phi$187
};
const setAnnCodeLoc_820 = file_944 => line_945 => col_946 => ann_947 => ((((setAnn_815($instance_515))($instance_460))("codeLoc"))(((AnnCodeLoc_778(file_944))(line_945))(col_946)))(ann_947);
const copyAnn_816 = local$instance$Hashable$1 => local$instance$Eq$0 => names_933 => ann_934 => {
  const f_935 = r_936 => n_937 => {
    let $phi$189;
    const $phi$190 = (((getAnn_814(local$instance$Hashable$1))(local$instance$Eq$0))(n_937))(ann_934);
    if($phi$190.$tag==1){
      $phi$189 = r_936
    } else if(($phi$190.$tag==0)&&true){
      $phi$189 = (((((setAnn_815(local$instance$Hashable$1))(local$instance$Eq$0))(n_937))($phi$190.$0))(r_936))
    } else error("pattern match fail",$phi$190);
    return $phi$189
  };
  return ((foldl(f_935))(Empty_696))(names_933)
};
const emptyAnn_813 = Empty_696;
const assert_1180 = assert_90;
const Pair_1181 = Pair_3;
const mapSnd_1182 = mapSnd_89;
const mapFst_1183 = mapFst_88;
const $gt$eq$gt_1184 = $gt$eq$gt_87;
const snd_1185 = snd_27;
const debug2_1186 = debug2_86;
const Just_1187 = Just_1;
const Nothing_1188 = Nothing_2;
const isJust_1189 = isJust_25;
const Empty_1190 = Empty_11;
const Leaf_1191 = Leaf_12;
const Collision_1192 = Collision_13;
const BitmapIndexed_1193 = BitmapIndexed_14;
const $_1194 = $_16;
const fst_1195 = fst_26;
const Left_1196 = Left_8;
const Right_1197 = Right_9;
const loop_1198 = loop_31;
const find_1199 = find_33;
const hamtMask_1200 = hamtMask_62;
const popCount_1201 = popCount_61;
const hamtIndex_1202 = hamtIndex_63;
const lookup_1203 = lookup_64;
const setContains_1204 = setContains_81;
const foldTrie_1205 = foldTrie_70;
const emptySet_1206 = emptySet_77;
const Unit_1207 = Unit_0;
const not_1208 = not_30;
const $div$eq_1209 = $div$eq_17;
const mapIx_1210 = mapIx_34;
const insert_1211 = insert_65;
const setAdd_1212 = setAdd_78;
const setIntersection_1213 = setIntersection_85;
const remove_1214 = remove_67;
const setDiff_1215 = setDiff_84;
const setToArray_1216 = setToArray_83;
const mergeTrie_1217 = mergeTrie_74;
const setUnion_1218 = setUnion_82;
const setRemove_1219 = setRemove_80;
const setAddAll_1220 = setAddAll_79;
const trieEntries_1221 = trieEntries_76;
const trieKeys_1222 = trieKeys_75;
const size_1223 = size_72;
const mapTrie_1224 = mapTrie_71;
const nodeMask_1225 = nodeMask_60;
const isEmpty_1226 = isEmpty_73;
const filterTrie_1227 = filterTrie_69;
const nextSetBitMask_1228 = nextSetBitMask_68;
const updateOrSet_1229 = updateOrSet_66;
const State_1230 = State_10;
const runState_1231 = runState_58;
const evalState_1232 = evalState_59;
const sets_1233 = sets_57;
const gets_1234 = gets_56;
const foldM_1235 = foldM_53;
const mapM_1236 = mapM_54;
const forM_1237 = forM_55;
const strToArray_1238 = strToArray_52;
const toRecord_1239 = toRecord_51;
const reverse_1240 = reverse_50;
const tail_1241 = tail_45;
const head_1242 = head_44;
const uniq_1243 = uniq_49;
const mergeSet_1244 = mergeSet_48;
const init_1245 = init_47;
const last_1246 = last_46;
const mapJust_1247 = mapJust_43;
const concatMap_1248 = concatMap_42;
const zip_1249 = zip_41;
const zipWithIndex2_1250 = zipWithIndex2_39;
const zipWithIndex_1251 = zipWithIndex_40;
const join_1252 = join_38;
const all_1253 = all_37;
const exists_1254 = exists_36;
const containsChar_1255 = containsChar_35;
const contains_1256 = contains_32;
const either_1257 = either_28;
const splitEither_1258 = splitEither_29;
const fromJust_1259 = fromJust_24;
const justOr_1260 = justOr_23;
const maybe_1261 = maybe_22;
const $gt$gt_1262 = $gt$gt_21;
const $gt$eq_1263 = $gt$eq_20;
const $lt$eq_1264 = $lt$eq_19;
const $gt_1265 = $gt_18;
const Identity_1266 = Identity_15;
const Tuple6_1267 = Tuple6_7;
const Tuple5_1268 = Tuple5_6;
const Tuple4_1269 = Tuple4_5;
const Tuple3_1270 = Tuple3_4;
const App_1271 = App_785;
const Lam_1272 = Lam_786;
const Case_1273 = Case_787;
const Let_1274 = Let_788;
const New_1275 = New_789;
const breakableDownAndUpM_1276 = breakableDownAndUpM_836;
const breakableDownM_1277 = breakableDownM_840;
const downAndUpM_1278 = downAndUpM_837;
const downM_1279 = downM_839;
const upM_1280 = upM_838;
const breakableDownAndUp_1281 = breakableDownAndUp_831;
const breakableDown_1282 = breakableDown_835;
const downAndUp_1283 = downAndUp_832;
const down_1284 = down_834;
const up_1285 = up_833;
const AnnType_1286 = AnnType_777;
const TUnknown_1287 = TUnknown_809;
const getAnn_1288 = getAnn_814;
const getAnnType_1289 = getAnnType_817;
const Var_1290 = Var_783;
const Const_1291 = Const_784;
const annOf_1292 = annOf_828;
const getType_1293 = getType_830;
const withAnn_1294 = withAnn_829;
const setAnn_1295 = setAnn_815;
const setAnnType_1296 = setAnnType_818;
const setType_1297 = setType_827;
const Data_1298 = Data_797;
const DataCon_1299 = DataCon_798;
const dataConName_1300 = dataConName_825;
const dataConNames_1301 = dataConNames_826;
const TCBound_1302 = TCBound_801;
const TConst_1303 = TConst_802;
const TVar_1304 = TVar_803;
const TSkolem_1305 = TSkolem_804;
const TApp_1306 = TApp_805;
const TRow_1307 = TRow_806;
const TBot_1308 = TBot_807;
const TForall_1309 = TForall_808;
const equivBound_1310 = equivBound_823;
const equivType_1311 = equivType_824;
const getAnnCodeLoc_1312 = getAnnCodeLoc_819;
const AnnCodeLoc_1313 = AnnCodeLoc_778;
const printCodeLoc_1314 = printCodeLoc_821;
const exprLoc_1315 = exprLoc_822;
const setAnnCodeLoc_1316 = setAnnCodeLoc_820;
const copyAnn_1317 = copyAnn_816;
const emptyAnn_1318 = emptyAnn_813;
const ImportAll_1319 = ImportAll_812;
const ImportOpen_1320 = ImportOpen_811;
const ImportClosed_1321 = ImportClosed_810;
const Instance_1322 = Instance_800;
const Class_1323 = Class_799;
const ModuleInterface_1324 = ModuleInterface_796;
const Module_1325 = Module_795;
const PData_1326 = PData_794;
const PConst_1327 = PConst_793;
const PVar_1328 = PVar_792;
const CStr_1329 = CStr_791;
const CNum_1330 = CNum_790;
const AnnExport_1331 = AnnExport_782;
const AnnTag_1332 = AnnTag_781;
const AnnData_1333 = AnnData_780;
const AnnUseCount_1334 = AnnUseCount_779;
const sccSorted_1335 = sccSorted_623;
const splitLetsPass_1341 = local$instance$Monad$0 => m_1398 => (ret(local$instance$Monad$0))(m_1398);
const addRef_1336 = local$instance$Hashable$1 => local$instance$Eq$0 => n_1342 => (($gt$gt$eq($instance_511))(gets_1234))(ns_1343 => sets_1233((((setAdd_1212(local$instance$Hashable$1))(local$instance$Eq$0))(n_1342))(ns_1343)));
const delRef_1337 = local$instance$Hashable$1 => local$instance$Eq$0 => n_1344 => (($gt$gt$eq($instance_511))(gets_1234))(ns_1345 => sets_1233((((setRemove_1219(local$instance$Hashable$1))(local$instance$Eq$0))(n_1344))(ns_1345)));
const getRefs_1338 = gets_1234;
const splitExpr_1339 = e_1346 => {
  const handleLet_1349 = e_1369 => {
    let $phi$191;
    if((((e_1369.$tag==5)&&true)&&true)&&true){
      $phi$191 = ((($gt$gt$eq($instance_511))(splitExpr_1339(e_1369.$2)))(e_1373 => (($gt$gt$eq($instance_511))(splitBindings_1340(e_1369.$1)))(gbs_1374 => {
        const l_1375 = ((foldr(e_1376 => bs_1377 => ((Let_1274(emptyAnn_1318))(bs_1377))(e_1376)))(e_1373))(gbs_1374);
        return (ret($instance_511))(Right_1197((withAnn_1294(e_1369.$0))(l_1375)))
      })))
    } else if(true){
      $phi$191 = ((ret($instance_511))(Left_1196(e_1369)))
    } else error("pattern match fail",e_1369);
    return $phi$191
  };
  const splitPat_1348 = p_1361 => {
    let $phi$192;
    if(((p_1361.$tag==1)&&true)&&true){
      $phi$192 = ((ret($instance_511))(Unit_1207))
    } else if(((p_1361.$tag==0)&&true)&&true){
      $phi$192 = (((delRef_1337($instance_515))($instance_460))(p_1361.$1))
    } else if((((p_1361.$tag==2)&&true)&&true)&&true){
      $phi$192 = ((($gt$gt_1262($instance_511))(((mapM_1236($instance_511))(splitPat_1348))(p_1361.$2)))(((addRef_1336($instance_515))($instance_460))(p_1361.$1)))
    } else error("pattern match fail",p_1361);
    return $phi$192
  };
  const split_1347 = e_1350 => {
    let $phi$193;
    if(((e_1350.$tag==0)&&true)&&true){
      $phi$193 = ((($gt$gt_1262($instance_511))(((addRef_1336($instance_515))($instance_460))(e_1350.$1)))((ret($instance_511))(e_1350)))
    } else if((((e_1350.$tag==4)&&true)&&true)&&true){
      $phi$193 = ((($gt$gt_1262($instance_511))(((mapM_1236($instance_511))(p_1356 => splitPat_1348(fst_1195(p_1356))))(e_1350.$2)))((ret($instance_511))(e_1350)))
    } else if((((e_1350.$tag==3)&&true)&&true)&&true){
      $phi$193 = ((($gt$gt_1262($instance_511))(((delRef_1337($instance_515))($instance_460))(e_1350.$1)))((ret($instance_511))(e_1350)))
    } else if(true){
      $phi$193 = ((ret($instance_511))(e_1350))
    } else error("pattern match fail",e_1350);
    return $phi$193
  };
  return (((breakableDownAndUpM_1276($instance_511))(handleLet_1349))(split_1347))(e_1346)
};
const splitBindings_1340 = bs_1379 => {
  const ns_1380 = (map(fst_1195))(bs_1379);
  const processBinding_1381 = gbs_1382 => b_1383 => {
    let $phi$194;
    if((true&&true)&&true){
      let $phi$195;
      if((true&&true)&&true){
        $phi$195 = ((($gt$gt$eq($instance_511))(splitExpr_1339(b_1383.$1)))(e_1388 => (($gt$gt$eq($instance_511))(getRefs_1338))(refs_1389 => {
          const uses_1390 = (filter(n_1391 => (((setContains_1204($instance_515))($instance_460))(n_1391))(refs_1389)))(ns_1380);
          return (($gt$gt_1262($instance_511))(((mapM_1236($instance_511))((delRef_1337($instance_515))($instance_460)))(uses_1390)))((ret($instance_511))((Pair_1181(((set(b_1383.$0))((filter(($div$eq_1209($instance_460))(b_1383.$0)))(uses_1390)))(gbs_1382.$0)))((push((Pair_1181(b_1383.$0))(e_1388)))(gbs_1382.$1))))
        })))
      } else error("pattern match fail",b_1383);
      $phi$194 = $phi$195
    } else error("pattern match fail",gbs_1382);
    return $phi$194
  };
  return (($gt$gt$eq($instance_511))((((foldM_1235($instance_511))(processBinding_1381))((Pair_1181(empty))([])))(bs_1379)))(gbs_1392 => {
    let $phi$196;
    if((true&&true)&&true){
      const ccs_1396 = sccSorted_1335(gbs_1392.$0);
      const bsm_1395 = toRecord_1239(gbs_1392.$1);
      $phi$196 = ((ret($instance_511))((map(map(n_1397 => (Pair_1181(n_1397))((get(n_1397))(bsm_1395)))))(ccs_1396)))
    } else error("pattern match fail",gbs_1392);
    return $phi$196
  })
};
const assert_1399 = assert_90;
const Pair_1400 = Pair_3;
const mapSnd_1401 = mapSnd_89;
const mapFst_1402 = mapFst_88;
const $gt$eq$gt_1403 = $gt$eq$gt_87;
const snd_1404 = snd_27;
const debug2_1405 = debug2_86;
const Just_1406 = Just_1;
const Nothing_1407 = Nothing_2;
const isJust_1408 = isJust_25;
const Empty_1409 = Empty_11;
const Leaf_1410 = Leaf_12;
const Collision_1411 = Collision_13;
const BitmapIndexed_1412 = BitmapIndexed_14;
const $_1413 = $_16;
const fst_1414 = fst_26;
const Left_1415 = Left_8;
const Right_1416 = Right_9;
const loop_1417 = loop_31;
const find_1418 = find_33;
const hamtMask_1419 = hamtMask_62;
const popCount_1420 = popCount_61;
const hamtIndex_1421 = hamtIndex_63;
const lookup_1422 = lookup_64;
const setContains_1423 = setContains_81;
const foldTrie_1424 = foldTrie_70;
const emptySet_1425 = emptySet_77;
const Unit_1426 = Unit_0;
const not_1427 = not_30;
const $div$eq_1428 = $div$eq_17;
const mapIx_1429 = mapIx_34;
const insert_1430 = insert_65;
const setAdd_1431 = setAdd_78;
const setIntersection_1432 = setIntersection_85;
const remove_1433 = remove_67;
const setDiff_1434 = setDiff_84;
const setToArray_1435 = setToArray_83;
const mergeTrie_1436 = mergeTrie_74;
const setUnion_1437 = setUnion_82;
const setRemove_1438 = setRemove_80;
const setAddAll_1439 = setAddAll_79;
const trieEntries_1440 = trieEntries_76;
const trieKeys_1441 = trieKeys_75;
const size_1442 = size_72;
const mapTrie_1443 = mapTrie_71;
const nodeMask_1444 = nodeMask_60;
const isEmpty_1445 = isEmpty_73;
const filterTrie_1446 = filterTrie_69;
const nextSetBitMask_1447 = nextSetBitMask_68;
const updateOrSet_1448 = updateOrSet_66;
const State_1449 = State_10;
const runState_1450 = runState_58;
const evalState_1451 = evalState_59;
const sets_1452 = sets_57;
const gets_1453 = gets_56;
const foldM_1454 = foldM_53;
const mapM_1455 = mapM_54;
const forM_1456 = forM_55;
const strToArray_1457 = strToArray_52;
const toRecord_1458 = toRecord_51;
const reverse_1459 = reverse_50;
const tail_1460 = tail_45;
const head_1461 = head_44;
const uniq_1462 = uniq_49;
const mergeSet_1463 = mergeSet_48;
const init_1464 = init_47;
const last_1465 = last_46;
const mapJust_1466 = mapJust_43;
const concatMap_1467 = concatMap_42;
const zip_1468 = zip_41;
const zipWithIndex2_1469 = zipWithIndex2_39;
const zipWithIndex_1470 = zipWithIndex_40;
const join_1471 = join_38;
const all_1472 = all_37;
const exists_1473 = exists_36;
const containsChar_1474 = containsChar_35;
const contains_1475 = contains_32;
const either_1476 = either_28;
const splitEither_1477 = splitEither_29;
const fromJust_1478 = fromJust_24;
const justOr_1479 = justOr_23;
const maybe_1480 = maybe_22;
const $gt$gt_1481 = $gt$gt_21;
const $gt$eq_1482 = $gt$eq_20;
const $lt$eq_1483 = $lt$eq_19;
const $gt_1484 = $gt_18;
const Identity_1485 = Identity_15;
const Tuple6_1486 = Tuple6_7;
const Tuple5_1487 = Tuple5_6;
const Tuple4_1488 = Tuple4_5;
const Tuple3_1489 = Tuple3_4;
const App_1490 = App_785;
const Lam_1491 = Lam_786;
const Case_1492 = Case_787;
const Let_1493 = Let_788;
const New_1494 = New_789;
const breakableDownAndUpM_1495 = breakableDownAndUpM_836;
const breakableDownM_1496 = breakableDownM_840;
const downAndUpM_1497 = downAndUpM_837;
const downM_1498 = downM_839;
const upM_1499 = upM_838;
const breakableDownAndUp_1500 = breakableDownAndUp_831;
const breakableDown_1501 = breakableDown_835;
const downAndUp_1502 = downAndUp_832;
const down_1503 = down_834;
const up_1504 = up_833;
const AnnType_1505 = AnnType_777;
const TUnknown_1506 = TUnknown_809;
const getAnn_1507 = getAnn_814;
const getAnnType_1508 = getAnnType_817;
const Var_1509 = Var_783;
const Const_1510 = Const_784;
const annOf_1511 = annOf_828;
const getType_1512 = getType_830;
const withAnn_1513 = withAnn_829;
const setAnn_1514 = setAnn_815;
const setAnnType_1515 = setAnnType_818;
const setType_1516 = setType_827;
const Data_1517 = Data_797;
const DataCon_1518 = DataCon_798;
const dataConName_1519 = dataConName_825;
const dataConNames_1520 = dataConNames_826;
const TCBound_1521 = TCBound_801;
const TConst_1522 = TConst_802;
const TVar_1523 = TVar_803;
const TSkolem_1524 = TSkolem_804;
const TApp_1525 = TApp_805;
const TRow_1526 = TRow_806;
const TBot_1527 = TBot_807;
const TForall_1528 = TForall_808;
const equivBound_1529 = equivBound_823;
const equivType_1530 = equivType_824;
const getAnnCodeLoc_1531 = getAnnCodeLoc_819;
const AnnCodeLoc_1532 = AnnCodeLoc_778;
const printCodeLoc_1533 = printCodeLoc_821;
const exprLoc_1534 = exprLoc_822;
const setAnnCodeLoc_1535 = setAnnCodeLoc_820;
const copyAnn_1536 = copyAnn_816;
const emptyAnn_1537 = emptyAnn_813;
const ImportAll_1538 = ImportAll_812;
const ImportOpen_1539 = ImportOpen_811;
const ImportClosed_1540 = ImportClosed_810;
const Instance_1541 = Instance_800;
const Class_1542 = Class_799;
const ModuleInterface_1543 = ModuleInterface_796;
const Module_1544 = Module_795;
const PData_1545 = PData_794;
const PConst_1546 = PConst_793;
const PVar_1547 = PVar_792;
const CStr_1548 = CStr_791;
const CNum_1549 = CNum_790;
const AnnExport_1550 = AnnExport_782;
const AnnTag_1551 = AnnTag_781;
const AnnData_1552 = AnnData_780;
const AnnUseCount_1553 = AnnUseCount_779;
const CompilerState_1554 = $_0_1564 => $_1_1565 => $_2_1566 => ({$0:$_0_1564,$1:$_1_1565,$2:$_2_1566});
const reportTimes_1563 = i_1602 => (($gt$gt$eq($instance_511))(gets_1453))(s_1603 => {
  let $phi$197;
  if(((true&&true)&&true)&&true){
    const report_1607 = i_1608 => n_1609 => ts_1610 => {
      const count_1611 = length(ts_1610);
      const total_1612 = ((foldl($add))(0))(ts_1610);
      const msg_1613 = ((((("# pass <"+n_1609)+"> executed ")+(intToString(count_1611)))+" times, total runtime ")+(intToString(total_1612)))+"ms";
      return (debug2_1405(msg_1613))(i_1608)
    };
    $phi$197 = ((ret($instance_511))(((foldTrie_1424(report_1607))(i_1602))(s_1603.$2)))
  } else error("pattern match fail",s_1603);
  return $phi$197
});
const timingStart_1560 = n_1585 => (($gt$gt$eq($instance_511))(gets_1453))(s_1586 => {
  let $phi$198;
  if(((true&&true)&&true)&&true){
    const nts_1590 = (justOr_1479([]))((((lookup_1422($instance_515))($instance_460))(n_1585))(s_1586.$2));
    $phi$198 = (sets_1452(((CompilerState_1554(s_1586.$0))(s_1586.$1))(((((insert_1430($instance_515))($instance_460))(n_1585))((push(currentTimeMs(Unit_1426)))(nts_1590)))(s_1586.$2))))
  } else error("pattern match fail",s_1586);
  return $phi$198
});
const timingEnd_1561 = n_1591 => (($gt$gt$eq($instance_511))(gets_1453))(s_1592 => {
  let $phi$199;
  if(((true&&true)&&true)&&true){
    const nts_1596 = (justOr_1479([]))((((lookup_1422($instance_515))($instance_460))(n_1591))(s_1592.$2));
    const start_1597 = last_1465(nts_1596);
    $phi$199 = (sets_1452(((CompilerState_1554(s_1592.$0))(s_1592.$1))(((((insert_1430($instance_515))($instance_460))(n_1591))((push((currentTimeMs(Unit_1426))-start_1597))(init_1464(nts_1596))))(s_1592.$2))))
  } else error("pattern match fail",s_1592);
  return $phi$199
});
const timed_1562 = n_1598 => p_1599 => i_1600 => (($gt$gt$eq($instance_511))((($gt$gt_1481($instance_511))(timingStart_1560(n_1598)))(p_1599(i_1600))))(o_1601 => (($gt$gt_1481($instance_511))(timingEnd_1561(n_1598)))((ret($instance_511))(o_1601)));
const perModule_1559 = local$instance$Monad$0 => mapM_1455(local$instance$Monad$0);
const setUid_1558 = uid_1580 => (($gt$gt$eq($instance_511))(gets_1453))(s_1581 => {
  let $phi$200;
  if(((true&&true)&&true)&&true){
    $phi$200 = (sets_1452(((CompilerState_1554(s_1581.$0))(uid_1580))(s_1581.$2)))
  } else error("pattern match fail",s_1581);
  return $phi$200
});
const getUid_1557 = (($gt$gt$eq($instance_511))(gets_1453))(s_1576 => {
  let $phi$201;
  if(((true&&true)&&true)&&true){
    $phi$201 = ((ret($instance_511))(s_1576.$1))
  } else error("pattern match fail",s_1576);
  return $phi$201
});
const setExports_1556 = ex_1571 => (($gt$gt$eq($instance_511))(gets_1453))(s_1572 => {
  let $phi$202;
  if(((true&&true)&&true)&&true){
    $phi$202 = (sets_1452(((CompilerState_1554(ex_1571))(s_1572.$1))(s_1572.$2)))
  } else error("pattern match fail",s_1572);
  return $phi$202
});
const getExports_1555 = (($gt$gt$eq($instance_511))(gets_1453))(s_1567 => {
  let $phi$203;
  if(((true&&true)&&true)&&true){
    $phi$203 = ((ret($instance_511))(s_1567.$0))
  } else error("pattern match fail",s_1567);
  return $phi$203
});
const assert_1614 = assert_90;
const Pair_1615 = Pair_3;
const mapSnd_1616 = mapSnd_89;
const mapFst_1617 = mapFst_88;
const $gt$eq$gt_1618 = $gt$eq$gt_87;
const snd_1619 = snd_27;
const debug2_1620 = debug2_86;
const Just_1621 = Just_1;
const Nothing_1622 = Nothing_2;
const isJust_1623 = isJust_25;
const Empty_1624 = Empty_11;
const Leaf_1625 = Leaf_12;
const Collision_1626 = Collision_13;
const BitmapIndexed_1627 = BitmapIndexed_14;
const $_1628 = $_16;
const fst_1629 = fst_26;
const Left_1630 = Left_8;
const Right_1631 = Right_9;
const loop_1632 = loop_31;
const find_1633 = find_33;
const hamtMask_1634 = hamtMask_62;
const popCount_1635 = popCount_61;
const hamtIndex_1636 = hamtIndex_63;
const lookup_1637 = lookup_64;
const setContains_1638 = setContains_81;
const foldTrie_1639 = foldTrie_70;
const emptySet_1640 = emptySet_77;
const Unit_1641 = Unit_0;
const not_1642 = not_30;
const $div$eq_1643 = $div$eq_17;
const mapIx_1644 = mapIx_34;
const insert_1645 = insert_65;
const setAdd_1646 = setAdd_78;
const setIntersection_1647 = setIntersection_85;
const remove_1648 = remove_67;
const setDiff_1649 = setDiff_84;
const setToArray_1650 = setToArray_83;
const mergeTrie_1651 = mergeTrie_74;
const setUnion_1652 = setUnion_82;
const setRemove_1653 = setRemove_80;
const setAddAll_1654 = setAddAll_79;
const trieEntries_1655 = trieEntries_76;
const trieKeys_1656 = trieKeys_75;
const size_1657 = size_72;
const mapTrie_1658 = mapTrie_71;
const nodeMask_1659 = nodeMask_60;
const isEmpty_1660 = isEmpty_73;
const filterTrie_1661 = filterTrie_69;
const nextSetBitMask_1662 = nextSetBitMask_68;
const updateOrSet_1663 = updateOrSet_66;
const State_1664 = State_10;
const runState_1665 = runState_58;
const evalState_1666 = evalState_59;
const sets_1667 = sets_57;
const gets_1668 = gets_56;
const foldM_1669 = foldM_53;
const mapM_1670 = mapM_54;
const forM_1671 = forM_55;
const strToArray_1672 = strToArray_52;
const toRecord_1673 = toRecord_51;
const reverse_1674 = reverse_50;
const tail_1675 = tail_45;
const head_1676 = head_44;
const uniq_1677 = uniq_49;
const mergeSet_1678 = mergeSet_48;
const init_1679 = init_47;
const last_1680 = last_46;
const mapJust_1681 = mapJust_43;
const concatMap_1682 = concatMap_42;
const zip_1683 = zip_41;
const zipWithIndex2_1684 = zipWithIndex2_39;
const zipWithIndex_1685 = zipWithIndex_40;
const join_1686 = join_38;
const all_1687 = all_37;
const exists_1688 = exists_36;
const containsChar_1689 = containsChar_35;
const contains_1690 = contains_32;
const either_1691 = either_28;
const splitEither_1692 = splitEither_29;
const fromJust_1693 = fromJust_24;
const justOr_1694 = justOr_23;
const maybe_1695 = maybe_22;
const $gt$gt_1696 = $gt$gt_21;
const $gt$eq_1697 = $gt$eq_20;
const $lt$eq_1698 = $lt$eq_19;
const $gt_1699 = $gt_18;
const Identity_1700 = Identity_15;
const Tuple6_1701 = Tuple6_7;
const Tuple5_1702 = Tuple5_6;
const Tuple4_1703 = Tuple4_5;
const Tuple3_1704 = Tuple3_4;
const App_1705 = App_785;
const Lam_1706 = Lam_786;
const Case_1707 = Case_787;
const Let_1708 = Let_788;
const New_1709 = New_789;
const breakableDownAndUpM_1710 = breakableDownAndUpM_836;
const breakableDownM_1711 = breakableDownM_840;
const downAndUpM_1712 = downAndUpM_837;
const downM_1713 = downM_839;
const upM_1714 = upM_838;
const breakableDownAndUp_1715 = breakableDownAndUp_831;
const breakableDown_1716 = breakableDown_835;
const downAndUp_1717 = downAndUp_832;
const down_1718 = down_834;
const up_1719 = up_833;
const AnnType_1720 = AnnType_777;
const TUnknown_1721 = TUnknown_809;
const getAnn_1722 = getAnn_814;
const getAnnType_1723 = getAnnType_817;
const Var_1724 = Var_783;
const Const_1725 = Const_784;
const annOf_1726 = annOf_828;
const getType_1727 = getType_830;
const withAnn_1728 = withAnn_829;
const setAnn_1729 = setAnn_815;
const setAnnType_1730 = setAnnType_818;
const setType_1731 = setType_827;
const Data_1732 = Data_797;
const DataCon_1733 = DataCon_798;
const dataConName_1734 = dataConName_825;
const dataConNames_1735 = dataConNames_826;
const TCBound_1736 = TCBound_801;
const TConst_1737 = TConst_802;
const TVar_1738 = TVar_803;
const TSkolem_1739 = TSkolem_804;
const TApp_1740 = TApp_805;
const TRow_1741 = TRow_806;
const TBot_1742 = TBot_807;
const TForall_1743 = TForall_808;
const equivBound_1744 = equivBound_823;
const equivType_1745 = equivType_824;
const getAnnCodeLoc_1746 = getAnnCodeLoc_819;
const AnnCodeLoc_1747 = AnnCodeLoc_778;
const printCodeLoc_1748 = printCodeLoc_821;
const exprLoc_1749 = exprLoc_822;
const setAnnCodeLoc_1750 = setAnnCodeLoc_820;
const copyAnn_1751 = copyAnn_816;
const emptyAnn_1752 = emptyAnn_813;
const ImportAll_1753 = ImportAll_812;
const ImportOpen_1754 = ImportOpen_811;
const ImportClosed_1755 = ImportClosed_810;
const Instance_1756 = Instance_800;
const Class_1757 = Class_799;
const ModuleInterface_1758 = ModuleInterface_796;
const Module_1759 = Module_795;
const PData_1760 = PData_794;
const PConst_1761 = PConst_793;
const PVar_1762 = PVar_792;
const CStr_1763 = CStr_791;
const CNum_1764 = CNum_790;
const AnnExport_1765 = AnnExport_782;
const AnnTag_1766 = AnnTag_781;
const AnnData_1767 = AnnData_780;
const AnnUseCount_1768 = AnnUseCount_779;
const printType_1769 = t_1775 => {
  const printParen_1776 = t_1780 => ("("+(printType_1769(t_1780)))+")";
  const printSecondTypeInApp_1779 = t_1803 => {
    let $phi$204;
    if((((t_1803.$tag==3)&&true)&&true)&&true){
      $phi$204 = (printParen_1776(t_1803))
    } else if(((((t_1803.$tag==6)&&true)&&true)&&true)&&true){
      $phi$204 = (printParen_1776(t_1803))
    } else if(true){
      $phi$204 = (printType_1769(t_1803))
    } else error("pattern match fail",t_1803);
    return $phi$204
  };
  const printFirstTypeInApp_1778 = t_1792 => {
    let $phi$205;
    if((((t_1792.$tag==3)&&true)&&((((t_1792.$1.$tag==3)&&true)&&(((t_1792.$1.$1.$tag==0)&&true)&&("->"==t_1792.$1.$1.$1)))&&true))&&true){
      $phi$205 = (printParen_1776(t_1792))
    } else if(((((t_1792.$tag==6)&&true)&&true)&&true)&&true){
      $phi$205 = (printParen_1776(t_1792))
    } else if(true){
      $phi$205 = (printType_1769(t_1792))
    } else error("pattern match fail",t_1792);
    return $phi$205
  };
  const printTypeInFun_1777 = t_1781 => {
    let $phi$206;
    if((((t_1781.$tag==3)&&true)&&((((t_1781.$1.$tag==3)&&true)&&(((t_1781.$1.$1.$tag==0)&&true)&&("->"==t_1781.$1.$1.$1)))&&true))&&true){
      $phi$206 = (printParen_1776(t_1781))
    } else if(((((t_1781.$tag==6)&&true)&&true)&&true)&&true){
      $phi$206 = (printParen_1776(t_1781))
    } else if(true){
      $phi$206 = (printType_1769(t_1781))
    } else error("pattern match fail",t_1781);
    return $phi$206
  };
  let $phi$207;
  if(((t_1775.$tag==0)&&true)&&true){
    $phi$207 = t_1775.$1
  } else if(((t_1775.$tag==1)&&true)&&true){
    $phi$207 = t_1775.$1
  } else if(((t_1775.$tag==2)&&true)&&true){
    $phi$207 = ("~"+t_1775.$1)
  } else if(t_1775.$tag==5){
    $phi$207 = "~bottom~"
  } else if(t_1775.$tag==7){
    $phi$207 = "?"
  } else if((((t_1775.$tag==3)&&true)&&((((t_1775.$1.$tag==3)&&true)&&(((t_1775.$1.$1.$tag==0)&&true)&&("->"==t_1775.$1.$1.$1)))&&true))&&true){
    $phi$207 = (((printTypeInFun_1777(t_1775.$1.$2))+" -> ")+(printType_1769(t_1775.$2)))
  } else if((((t_1775.$tag==3)&&true)&&true)&&true){
    $phi$207 = (((printFirstTypeInApp_1778(t_1775.$1))+" ")+(printSecondTypeInApp_1779(t_1775.$2)))
  } else if(((((t_1775.$tag==6)&&true)&&true)&&true)&&true){
    let $phi$208;
    const $phi$209 = length(t_1775.$2);
    if(0==$phi$209){
      $phi$208 = ""
    } else if(true){
      $phi$208 = (" with "+((intercalate(", "))((map(printTypeBound_1770))(t_1775.$2))))
    } else error("pattern match fail",$phi$209);
    const bounds_1830 = $phi$208;
    $phi$207 = (((("forall "+((intercalate(", "))(t_1775.$1)))+bounds_1830)+". ")+(printType_1769(t_1775.$3)))
  } else if(true){
    $phi$207 = (error("cannot print "+(jsonStringify(t_1775))))
  } else error("pattern match fail",t_1775);
  return $phi$207
};
const printTypeBound_1770 = b_1833 => {
  let $phi$210;
  if(((true&&true)&&true)&&true){
    $phi$210 = ((((b_1833.$1+" ")+"(")+(printType_1769(b_1833.$2)))+")")
  } else error("pattern match fail",b_1833);
  return $phi$210
};
const indent_1773 = map(l_1896 => "  "+l_1896);
const printExprTyped_1771 = typed_1837 => e_1838 => {
  const sameLine_1840 = xs_1849 => ys_1850 => (concat(init_1679(xs_1849)))((enqueue((last_1680(xs_1849))+(head_1676(ys_1850))))(tail_1675(ys_1850)));
  const sameLine3_1841 = a_1851 => b_1852 => c_1853 => (sameLine_1840(a_1851))((sameLine_1840(b_1852))(c_1853));
  const printT_1845 = e_1889 => {
    const t_1890 = getType_1727(e_1889);
    return printType_1769(t_1890)
  };
  const printPat_1843 = p_1857 => {
    let $phi$211;
    if(((p_1857.$tag==0)&&true)&&true){
      $phi$211 = p_1857.$1
    } else if(((p_1857.$tag==1)&&true)&&((p_1857.$1.$tag==0)&&true)){
      $phi$211 = (jsonStringify(p_1857.$1.$0))
    } else if(((p_1857.$tag==1)&&true)&&((p_1857.$1.$tag==1)&&true)){
      $phi$211 = (jsonStringify(p_1857.$1.$0))
    } else if((((p_1857.$tag==2)&&true)&&true)&&true){
      $phi$211 = (((p_1857.$1+" (")+((join_1686((map(printPat_1843))(p_1857.$2)))(") (")))+")")
    } else error("pattern match fail",p_1857);
    return $phi$211
  };
  const printParen_1839 = e_1848 => ((sameLine3_1841(["("]))(printExpr_1846(e_1848)))([")"]);
  const printCasePat_1842 = cp_1854 => {
    let $phi$212;
    if((true&&true)&&true){
      $phi$212 = ((enqueue((printPat_1843(cp_1854.$0))+" ->"))(indent_1773(printExpr_1846(cp_1854.$1))))
    } else error("pattern match fail",cp_1854);
    return $phi$212
  };
  const printE_1844 = e_1867 => {
    let $phi$213;
    if(((e_1867.$tag==0)&&true)&&true){
      $phi$213 = ([e_1867.$1])
    } else if(((e_1867.$tag==1)&&true)&&((e_1867.$1.$tag==0)&&true)){
      $phi$213 = ([jsonStringify(e_1867.$1.$0)])
    } else if(((e_1867.$tag==1)&&true)&&((e_1867.$1.$tag==1)&&true)){
      $phi$213 = ([jsonStringify(e_1867.$1.$0)])
    } else if((((e_1867.$tag==2)&&true)&&true)&&true){
      $phi$213 = (((sameLine3_1841(printParen_1839(e_1867.$1)))([" "]))(printParen_1839(e_1867.$2)))
    } else if((((e_1867.$tag==3)&&true)&&true)&&true){
      $phi$213 = ((enqueue(("\\"+e_1867.$1)+" ->"))(indent_1773(printExpr_1846(e_1867.$2))))
    } else if((((e_1867.$tag==4)&&true)&&true)&&true){
      $phi$213 = ((concat(((sameLine3_1841(["case "]))(printParen_1839(e_1867.$1)))([" of"])))(indent_1773((concatMap_1682(printCasePat_1842))(e_1867.$2))))
    } else if((((e_1867.$tag==5)&&true)&&true)&&true){
      $phi$213 = ((concat((push("in"))((enqueue("let"))(indent_1773((concatMap_1682(printDef_1772(typed_1837)))(e_1867.$1))))))(indent_1773(printExpr_1846(e_1867.$2))))
    } else if((((e_1867.$tag==6)&&true)&&true)&&true){
      $phi$213 = ((push(e_1867.$1))(indent_1773((concatMap_1682(printExprTyped_1771(typed_1837)))(e_1867.$2))))
    } else error("pattern match fail",e_1867);
    return $phi$213
  };
  const printExpr_1846 = e_1891 => {
    let $phi$214;
    if(!typed_1837){
      $phi$214 = (printE_1844(e_1891))
    } else if(typed_1837){
      $phi$214 = (((sameLine3_1841(["("]))(printE_1844(e_1891)))([(" :: "+(printT_1845(e_1891)))+" )"]))
    } else error("pattern match fail",typed_1837);
    return $phi$214
  };
  const pe_1847 = printE_1844(e_1838);
  return printExpr_1846(e_1838)
};
const printDef_1772 = typed_1892 => d_1893 => {
  let $phi$215;
  if((true&&true)&&true){
    $phi$215 = ((enqueue(d_1893.$0+" ="))(indent_1773((printExprTyped_1771(typed_1892))(d_1893.$1))))
  } else error("pattern match fail",d_1893);
  return $phi$215
};
const reallyPrintExpr_1774 = typed_1897 => e_1898 => (join_1686((printExprTyped_1771(typed_1897))(e_1898)))("\n");
const assert_1899 = assert_90;
const Pair_1900 = Pair_3;
const mapSnd_1901 = mapSnd_89;
const mapFst_1902 = mapFst_88;
const $gt$eq$gt_1903 = $gt$eq$gt_87;
const snd_1904 = snd_27;
const debug2_1905 = debug2_86;
const Just_1906 = Just_1;
const Nothing_1907 = Nothing_2;
const isJust_1908 = isJust_25;
const Empty_1909 = Empty_11;
const Leaf_1910 = Leaf_12;
const Collision_1911 = Collision_13;
const BitmapIndexed_1912 = BitmapIndexed_14;
const $_1913 = $_16;
const fst_1914 = fst_26;
const Left_1915 = Left_8;
const Right_1916 = Right_9;
const loop_1917 = loop_31;
const find_1918 = find_33;
const hamtMask_1919 = hamtMask_62;
const popCount_1920 = popCount_61;
const hamtIndex_1921 = hamtIndex_63;
const lookup_1922 = lookup_64;
const setContains_1923 = setContains_81;
const foldTrie_1924 = foldTrie_70;
const emptySet_1925 = emptySet_77;
const Unit_1926 = Unit_0;
const not_1927 = not_30;
const $div$eq_1928 = $div$eq_17;
const mapIx_1929 = mapIx_34;
const insert_1930 = insert_65;
const setAdd_1931 = setAdd_78;
const setIntersection_1932 = setIntersection_85;
const remove_1933 = remove_67;
const setDiff_1934 = setDiff_84;
const setToArray_1935 = setToArray_83;
const mergeTrie_1936 = mergeTrie_74;
const setUnion_1937 = setUnion_82;
const setRemove_1938 = setRemove_80;
const setAddAll_1939 = setAddAll_79;
const trieEntries_1940 = trieEntries_76;
const trieKeys_1941 = trieKeys_75;
const size_1942 = size_72;
const mapTrie_1943 = mapTrie_71;
const nodeMask_1944 = nodeMask_60;
const isEmpty_1945 = isEmpty_73;
const filterTrie_1946 = filterTrie_69;
const nextSetBitMask_1947 = nextSetBitMask_68;
const updateOrSet_1948 = updateOrSet_66;
const State_1949 = State_10;
const runState_1950 = runState_58;
const evalState_1951 = evalState_59;
const sets_1952 = sets_57;
const gets_1953 = gets_56;
const foldM_1954 = foldM_53;
const mapM_1955 = mapM_54;
const forM_1956 = forM_55;
const strToArray_1957 = strToArray_52;
const toRecord_1958 = toRecord_51;
const reverse_1959 = reverse_50;
const tail_1960 = tail_45;
const head_1961 = head_44;
const uniq_1962 = uniq_49;
const mergeSet_1963 = mergeSet_48;
const init_1964 = init_47;
const last_1965 = last_46;
const mapJust_1966 = mapJust_43;
const concatMap_1967 = concatMap_42;
const zip_1968 = zip_41;
const zipWithIndex2_1969 = zipWithIndex2_39;
const zipWithIndex_1970 = zipWithIndex_40;
const join_1971 = join_38;
const all_1972 = all_37;
const exists_1973 = exists_36;
const containsChar_1974 = containsChar_35;
const contains_1975 = contains_32;
const either_1976 = either_28;
const splitEither_1977 = splitEither_29;
const fromJust_1978 = fromJust_24;
const justOr_1979 = justOr_23;
const maybe_1980 = maybe_22;
const $gt$gt_1981 = $gt$gt_21;
const $gt$eq_1982 = $gt$eq_20;
const $lt$eq_1983 = $lt$eq_19;
const $gt_1984 = $gt_18;
const Identity_1985 = Identity_15;
const Tuple6_1986 = Tuple6_7;
const Tuple5_1987 = Tuple5_6;
const Tuple4_1988 = Tuple4_5;
const Tuple3_1989 = Tuple3_4;
const App_1990 = App_785;
const Lam_1991 = Lam_786;
const Case_1992 = Case_787;
const Let_1993 = Let_788;
const New_1994 = New_789;
const breakableDownAndUpM_1995 = breakableDownAndUpM_836;
const breakableDownM_1996 = breakableDownM_840;
const downAndUpM_1997 = downAndUpM_837;
const downM_1998 = downM_839;
const upM_1999 = upM_838;
const breakableDownAndUp_2000 = breakableDownAndUp_831;
const breakableDown_2001 = breakableDown_835;
const downAndUp_2002 = downAndUp_832;
const down_2003 = down_834;
const up_2004 = up_833;
const AnnType_2005 = AnnType_777;
const TUnknown_2006 = TUnknown_809;
const getAnn_2007 = getAnn_814;
const getAnnType_2008 = getAnnType_817;
const Var_2009 = Var_783;
const Const_2010 = Const_784;
const annOf_2011 = annOf_828;
const getType_2012 = getType_830;
const withAnn_2013 = withAnn_829;
const setAnn_2014 = setAnn_815;
const setAnnType_2015 = setAnnType_818;
const setType_2016 = setType_827;
const Data_2017 = Data_797;
const DataCon_2018 = DataCon_798;
const dataConName_2019 = dataConName_825;
const dataConNames_2020 = dataConNames_826;
const TCBound_2021 = TCBound_801;
const TConst_2022 = TConst_802;
const TVar_2023 = TVar_803;
const TSkolem_2024 = TSkolem_804;
const TApp_2025 = TApp_805;
const TRow_2026 = TRow_806;
const TBot_2027 = TBot_807;
const TForall_2028 = TForall_808;
const equivBound_2029 = equivBound_823;
const equivType_2030 = equivType_824;
const getAnnCodeLoc_2031 = getAnnCodeLoc_819;
const AnnCodeLoc_2032 = AnnCodeLoc_778;
const printCodeLoc_2033 = printCodeLoc_821;
const exprLoc_2034 = exprLoc_822;
const setAnnCodeLoc_2035 = setAnnCodeLoc_820;
const copyAnn_2036 = copyAnn_816;
const emptyAnn_2037 = emptyAnn_813;
const ImportAll_2038 = ImportAll_812;
const ImportOpen_2039 = ImportOpen_811;
const ImportClosed_2040 = ImportClosed_810;
const Instance_2041 = Instance_800;
const Class_2042 = Class_799;
const ModuleInterface_2043 = ModuleInterface_796;
const Module_2044 = Module_795;
const PData_2045 = PData_794;
const PConst_2046 = PConst_793;
const PVar_2047 = PVar_792;
const CStr_2048 = CStr_791;
const CNum_2049 = CNum_790;
const AnnExport_2050 = AnnExport_782;
const AnnTag_2051 = AnnTag_781;
const AnnData_2052 = AnnData_780;
const AnnUseCount_2053 = AnnUseCount_779;
const printType_2054 = printType_1769;
const printTypeBound_2055 = printTypeBound_1770;
const reallyPrintExpr_2056 = reallyPrintExpr_1774;
const printDef_2057 = printDef_1772;
const sccSorted_2058 = sccSorted_623;
const ICtx_2060 = $_0_2122 => $_1_2123 => $_2_2124 => $_3_2125 => ({$0:$_0_2122,$1:$_1_2123,$2:$_2_2124,$3:$_3_2125});
const IEnv_2061 = $_0_2126 => $_1_2127 => $_2_2128 => ({$0:$_0_2126,$1:$_1_2127,$2:$_2_2128});
const Subs_2059 = $_0_2120 => $_1_2121 => ({$0:$_0_2120,$1:$_1_2121});
const instanceToTypeBound_2114 = i_2776 => {
  let $phi$216;
  if((((true&&true)&&true)&&true)&&true){
    $phi$216 = (((TCBound_2021(emptyAnn_2037))(i_2776.$1))(i_2776.$2))
  } else error("pattern match fail",i_2776);
  return $phi$216
};
const getTypedExports_2117 = m_2863 => {
  let $phi$217;
  if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
    const collectExports_2871 = es_2873 => b_2874 => {
      const e_2875 = snd_1904(b_2874);
      let $phi$218;
      const $phi$219 = (((getAnn_2007($instance_515))($instance_460))("export"))(annOf_2011(e_2875));
      if($phi$219.$tag==1){
        $phi$218 = es_2873
      } else if(($phi$219.$tag==0)&&(($phi$219.$0.$tag==5)&&true)){
        $phi$218 = (((set($phi$219.$0.$0))(getType_2012(e_2875)))(es_2873))
      } else error("pattern match fail",$phi$219);
      return $phi$218
    };
    const bs_2872 = ((foldl(collectExports_2871))(empty))(m_2863.$6);
    $phi$217 = (((ModuleInterface_2043(bs_2872))(m_2863.$4))(((foldl(m_2877 => p_2878 => {
      let $phi$220;
      if((true&&true)&&true){
        $phi$220 = (((((insert_1930($instance_515))($instance_460))(p_2878.$0))(instanceToTypeBound_2114(p_2878.$1)))(m_2877))
      } else error("pattern match fail",p_2878);
      return $phi$220
    }))(Empty_1909))(m_2863.$5)))
  } else error("pattern match fail",m_2863);
  return $phi$217
};
const getBounds_2074 = ctx_2217 => {
  let $phi$221;
  if((((true&&true)&&true)&&true)&&true){
    $phi$221 = ctx_2217.$1
  } else error("pattern match fail",ctx_2217);
  return $phi$221
};
const setBounds_2075 = bs_2222 => ctx_2223 => {
  let $phi$222;
  if((((true&&true)&&true)&&true)&&true){
    $phi$222 = ((((ICtx_2060(ctx_2223.$0))(bs_2222))(ctx_2223.$2))(ctx_2223.$3))
  } else error("pattern match fail",ctx_2223);
  return $phi$222
};
const getInstances_2088 = env_2284 => {
  let $phi$223;
  if(((true&&true)&&true)&&true){
    $phi$223 = env_2284.$1
  } else error("pattern match fail",env_2284);
  return $phi$223
};
const satisfies_2118 = a_2881 => b_2882 => {
  let $phi$224;
  if(((a_2881.$tag==1)&&true)&&true){
    $phi$224 = true
  } else if(((a_2881.$tag==2)&&true)&&true){
    let $phi$227;
    if(((b_2882.$tag==2)&&true)&&true){
      $phi$227 = ((($eq$eq($instance_460))(a_2881.$1))(b_2882.$1))
    } else if(true){
      $phi$227 = false
    } else error("pattern match fail",b_2882);
    $phi$224 = $phi$227
  } else if(((a_2881.$tag==0)&&true)&&true){
    let $phi$226;
    if(((b_2882.$tag==0)&&true)&&true){
      $phi$226 = ((($eq$eq($instance_460))(a_2881.$1))(b_2882.$1))
    } else if(true){
      $phi$226 = false
    } else error("pattern match fail",b_2882);
    $phi$224 = $phi$226
  } else if((((a_2881.$tag==3)&&true)&&true)&&true){
    let $phi$225;
    if((((b_2882.$tag==3)&&true)&&true)&&true){
      $phi$225 = (((satisfies_2118(a_2881.$1))(b_2882.$1))&&((satisfies_2118(a_2881.$2))(b_2882.$2)))
    } else if(true){
      $phi$225 = false
    } else error("pattern match fail",b_2882);
    $phi$224 = $phi$225
  } else if(true){
    $phi$224 = (error("unexpected type in satisfies "+(printType_2054(a_2881))))
  } else error("pattern match fail",a_2881);
  return $phi$224
};
const satisfiesBound_2119 = a_2903 => b_2904 => {
  let $phi$228;
  if(((true&&true)&&true)&&true){
    let $phi$229;
    if(((true&&true)&&true)&&true){
      $phi$229 = (((($eq$eq($instance_460))(a_2903.$1))(b_2904.$1))&&((satisfies_2118(a_2903.$2))(b_2904.$2)))
    } else error("pattern match fail",b_2904);
    $phi$228 = $phi$229
  } else error("pattern match fail",a_2903);
  return $phi$228
};
const dropSatisfiedBounds_2106 = env_2630 => (($gt$gt$eq($instance_511))(gets_1953))(ctx_2631 => {
  const is_2632 = getInstances_2088(env_2630);
  const bs_2633 = getBounds_2074(ctx_2631);
  const bs2_2634 = (filter(b_2635 => not_1927((exists_1973(i_2636 => (satisfiesBound_2119(i_2636))(b_2635)))(is_2632))))(bs_2633);
  return sets_1952((setBounds_2075(bs2_2634))(ctx_2631))
});
const getSubs_2071 = ctx_2200 => {
  let $phi$230;
  if((((true&&true)&&true)&&true)&&true){
    $phi$230 = ctx_2200.$0
  } else error("pattern match fail",ctx_2200);
  return $phi$230
};
const getSub_2062 = v_2129 => subs_2130 => {
  let $phi$231;
  if((true&&true)&&true){
    $phi$231 = ((($lt$pip$gt($instance_475))((((lookup_1922($instance_515))($instance_460))(v_2129))(subs_2130.$0)))((((lookup_1922($instance_515))($instance_460))(v_2129))(subs_2130.$1)))
  } else error("pattern match fail",subs_2130);
  return $phi$231
};
const mkTForall_2091 = ann_2310 => vs_2311 => bs_2312 => t_2313 => {
  const f_2314 = bs_2315 => b_2316 => {
    let $phi$232;
    const $phi$233 = (exists_1973(equivBound_2029(b_2316)))(bs_2315);
    if($phi$233){
      $phi$232 = bs_2315
    } else if(!$phi$233){
      $phi$232 = ((push(b_2316))(bs_2315))
    } else error("pattern match fail",$phi$233);
    return $phi$232
  };
  return (((TForall_2028(ann_2310))(vs_2311))(((foldl(f_2314))([]))(bs_2312)))(t_2313)
};
const dropSubs_2067 = vs_2179 => subs_2180 => {
  let $phi$234;
  if((true&&true)&&true){
    $phi$234 = ((Subs_2059(((foldl(r_2183 => v_2184 => (((remove_1933($instance_515))($instance_460))(v_2184))(r_2183)))(subs_2180.$0))(vs_2179)))(((foldl(r_2185 => v_2186 => (((remove_1933($instance_515))($instance_460))(v_2186))(r_2185)))(subs_2180.$1))(vs_2179)))
  } else error("pattern match fail",subs_2180);
  return $phi$234
};
const applySubs_2095 = subs_2375 => t_2376 => {
  let $phi$235;
  if(((((t_2376.$tag==6)&&true)&&true)&&true)&&true){
    const subs2_2381 = (dropSubs_2067(t_2376.$1))(subs_2375);
    $phi$235 = ((((mkTForall_2091(t_2376.$0))(t_2376.$1))((map(applySubsBound_2096(subs2_2381)))(t_2376.$2)))((applySubs_2095(subs2_2381))(t_2376.$3)))
  } else if(((t_2376.$tag==1)&&true)&&true){
    let $phi$237;
    const $phi$238 = (getSub_2062(t_2376.$1))(subs_2375);
    if($phi$238.$tag==1){
      $phi$237 = t_2376
    } else if(($phi$238.$tag==0)&&true){
      $phi$237 = $phi$238.$0
    } else error("pattern match fail",$phi$238);
    $phi$235 = $phi$237
  } else if((((t_2376.$tag==3)&&true)&&true)&&true){
    $phi$235 = (((TApp_2025(t_2376.$0))((applySubs_2095(subs_2375))(t_2376.$1)))((applySubs_2095(subs_2375))(t_2376.$2)))
  } else if((((t_2376.$tag==4)&&true)&&true)&&true){
    $phi$235 = (((TRow_2026(t_2376.$0))((map(m_2391 => {
      let $phi$236;
      if((true&&true)&&true){
        $phi$236 = ((Pair_1900((applySubs_2095(subs_2375))(m_2391.$0)))((applySubs_2095(subs_2375))(m_2391.$1)))
      } else error("pattern match fail",m_2391);
      return $phi$236
    }))(t_2376.$1)))(((fmap($instance_466))(applySubs_2095(subs_2375)))(t_2376.$2)))
  } else if(true){
    $phi$235 = t_2376
  } else error("pattern match fail",t_2376);
  return $phi$235
};
const applySubsBound_2096 = subs_2395 => b_2396 => {
  let $phi$239;
  if(((true&&true)&&true)&&true){
    $phi$239 = (((TCBound_2021(b_2396.$0))(b_2396.$1))((applySubs_2095(subs_2395))(b_2396.$2)))
  } else error("pattern match fail",b_2396);
  return $phi$239
};
const applySubsE_2111 = subs_2698 => e_2699 => {
  const f_2700 = a_2701 => e_2702 => {
    const t2_2703 = (applySubs_2095(subs_2698))(getType_2012(e_2702));
    return (Pair_1900(a_2701))((setType_2016(t2_2703))(e_2702))
  };
  return snd_1904(((down_2003(f_2700))(true))(e_2699))
};
const applySubsDef_2110 = d_2694 => {
  let $phi$240;
  if((true&&true)&&true){
    $phi$240 = ((($gt$gt$eq($instance_511))(gets_1953))(ctx_2697 => ($_1913(ret($instance_511)))((Pair_1900(d_2694.$0))((applySubsE_2111(getSubs_2071(ctx_2697)))(d_2694.$1)))))
  } else error("pattern match fail",d_2694);
  return $phi$240
};
const freeVars_2112 = e_2704 => {
  const namesInPat_2707 = p_2717 => {
    let $phi$241;
    if(((p_2717.$tag==0)&&true)&&true){
      $phi$241 = ([p_2717.$1])
    } else if(((p_2717.$tag==1)&&true)&&true){
      $phi$241 = ([])
    } else if((((p_2717.$tag==2)&&true)&&true)&&true){
      $phi$241 = (((foldl((mergeSet_1963($instance_462))($instance_460)))([]))((map(namesInPat_2707))(p_2717.$2)))
    } else error("pattern match fail",p_2717);
    return $phi$241
  };
  const freeVarsInPData_2706 = p_2712 => {
    let $phi$242;
    if((((p_2712.$tag==2)&&true)&&true)&&true){
      $phi$242 = (((foldl((mergeSet_1963($instance_462))($instance_460)))([p_2712.$1]))((map(freeVarsInPData_2706))(p_2712.$2)))
    } else if(true){
      $phi$242 = ([])
    } else error("pattern match fail",p_2712);
    return $phi$242
  };
  const freeVarsInPat_2705 = p_2708 => {
    let $phi$243;
    if((true&&true)&&true){
      $phi$243 = ((((mergeSet_1963($instance_462))($instance_460))((filter(v_2711 => not_1927(((contains_1975($instance_460))(v_2711))(namesInPat_2707(p_2708.$0)))))(freeVars_2112(p_2708.$1))))(freeVarsInPData_2706(p_2708.$0)))
    } else error("pattern match fail",p_2708);
    return $phi$243
  };
  let $phi$244;
  if(((e_2704.$tag==0)&&true)&&true){
    $phi$244 = ([e_2704.$1])
  } else if(((e_2704.$tag==1)&&true)&&true){
    $phi$244 = ([])
  } else if((((e_2704.$tag==2)&&true)&&true)&&true){
    $phi$244 = ((((mergeSet_1963($instance_462))($instance_460))(freeVars_2112(e_2704.$1)))(freeVars_2112(e_2704.$2)))
  } else if((((e_2704.$tag==3)&&true)&&true)&&true){
    $phi$244 = ((filter(v_2735 => (($div$eq_1928($instance_460))(v_2735))(e_2704.$1)))(freeVars_2112(e_2704.$2)))
  } else if((((e_2704.$tag==4)&&true)&&true)&&true){
    $phi$244 = (((foldl((mergeSet_1963($instance_462))($instance_460)))(freeVars_2112(e_2704.$1)))((map(freeVarsInPat_2705))(e_2704.$2)))
  } else if((((e_2704.$tag==5)&&true)&&true)&&true){
    $phi$244 = ((filter(v_2742 => not_1927(((contains_1975($instance_460))(v_2742))((map(fst_1914))(e_2704.$1)))))(((foldl((mergeSet_1963($instance_462))($instance_460)))(freeVars_2112(e_2704.$2)))((map(d_2743 => freeVars_2112(snd_1904(d_2743))))(e_2704.$1))))
  } else if((((e_2704.$tag==6)&&true)&&true)&&true){
    $phi$244 = (((foldl((mergeSet_1963($instance_462))($instance_460)))([]))((map(freeVars_2112))(e_2704.$2)))
  } else error("pattern match fail",e_2704);
  return $phi$244
};
const newTVarM_2069 = (($gt$gt$eq($instance_511))(gets_1953))(ctx_2193 => {
  let $phi$245;
  if((((true&&true)&&true)&&true)&&true){
    const n_2198 = "$"+(intToString(ctx_2193.$2));
    $phi$245 = ((($gt$gt_1981($instance_511))(sets_1952((((ICtx_2060(ctx_2193.$0))(ctx_2193.$1))(ctx_2193.$2+1))(ctx_2193.$3))))((ret($instance_511))((TVar_2023(emptyAnn_2037))(n_2198))))
  } else error("pattern match fail",ctx_2193);
  return $phi$245
});
const errorM_2076 = s_2228 => (($gt$gt$eq($instance_511))(gets_1953))(ctx_2229 => {
  let $phi$246;
  if((((true&&true)&&true)&&true)&&true){
    $phi$246 = (error(ctx_2229.$3(s_2228)))
  } else error("pattern match fail",ctx_2229);
  return $phi$246
});
const getBinding_2081 = n_2249 => env_2250 => {
  let $phi$247;
  if(((true&&true)&&true)&&true){
    $phi$247 = ((((lookup_1922($instance_515))($instance_460))(n_2249))(env_2250.$0))
  } else error("pattern match fail",env_2250);
  return $phi$247
};
const getBindingM_2082 = n_2254 => env_2255 => (($gt$gt$eq($instance_511))(gets_1953))(ctx_2256 => ($_1913(ret($instance_511)))(((fmap($instance_466))(applySubs_2095(getSubs_2071(ctx_2256))))((getBinding_2081(n_2254))(env_2255))));
const getBindings_2083 = env_2257 => {
  let $phi$248;
  if(((true&&true)&&true)&&true){
    $phi$248 = env_2257.$0
  } else error("pattern match fail",env_2257);
  return $phi$248
};
const freeTVars_2089 = t_2288 => {
  let $phi$249;
  if(((t_2288.$tag==1)&&true)&&true){
    $phi$249 = ((((setAdd_1931($instance_515))($instance_460))(t_2288.$1))(emptySet_1925))
  } else if(t_2288.$tag==5){
    $phi$249 = emptySet_1925
  } else if(t_2288.$tag==7){
    $phi$249 = emptySet_1925
  } else if(((t_2288.$tag==0)&&true)&&true){
    $phi$249 = emptySet_1925
  } else if(((t_2288.$tag==2)&&true)&&true){
    $phi$249 = emptySet_1925
  } else if(((((t_2288.$tag==6)&&true)&&true)&&true)&&true){
    $phi$249 = (((foldl(s_2299 => v_2300 => (((setRemove_1938($instance_515))($instance_460))(v_2300))(s_2299)))(((foldl((setUnion_1937($instance_515))($instance_460)))(freeTVars_2089(t_2288.$3)))((map(freeTVarsInBound_2099))(t_2288.$2))))(t_2288.$1))
  } else if((((t_2288.$tag==3)&&true)&&true)&&true){
    $phi$249 = ((((setUnion_1937($instance_515))($instance_460))(freeTVars_2089(t_2288.$1)))(freeTVars_2089(t_2288.$2)))
  } else if((((t_2288.$tag==4)&&true)&&true)&&true){
    $phi$249 = (((foldl((setUnion_1937($instance_515))($instance_460)))(($_1913(justOr_1979(emptySet_1925)))(((fmap($instance_466))(freeTVars_2089))(t_2288.$2))))((map(m_2307 => (((setUnion_1937($instance_515))($instance_460))(freeTVars_2089(fst_1914(m_2307))))(freeTVars_2089(snd_1904(m_2307)))))(t_2288.$1)))
  } else error("pattern match fail",t_2288);
  return $phi$249
};
const freeTVarsInBound_2099 = b_2457 => {
  let $phi$250;
  if(((true&&true)&&true)&&true){
    $phi$250 = (freeTVars_2089(b_2457.$2))
  } else error("pattern match fail",b_2457);
  return $phi$250
};
const addBinding_2084 = n_2261 => t_2262 => env_2263 => {
  let $phi$251;
  if(((true&&true)&&true)&&true){
    $phi$251 = (((IEnv_2061(((((insert_1930($instance_515))($instance_460))(n_2261))(t_2262))(env_2263.$0)))(env_2263.$1))((((setUnion_1937($instance_515))($instance_460))(env_2263.$2))(freeTVars_2089(t_2262))))
  } else error("pattern match fail",env_2263);
  return $phi$251
};
const addBindings_2085 = nbs_2267 => env_2268 => {
  let $phi$252;
  if(((true&&true)&&true)&&true){
    $phi$252 = (((IEnv_2061((((mergeTrie_1936($instance_515))($instance_460))(env_2268.$0))(nbs_2267)))(env_2268.$1))(((foldTrie_1924(fvs_2272 => __2273 => t_2274 => (((setUnion_1937($instance_515))($instance_460))(fvs_2272))(freeTVars_2089(t_2274))))(env_2268.$2))(nbs_2267)))
  } else error("pattern match fail",env_2268);
  return $phi$252
};
const f1_2090 = a_2308 => b_2309 => ((TApp_2025(emptyAnn_2037))(((TApp_2025(emptyAnn_2037))((TConst_2022(emptyAnn_2037))("->")))(a_2308)))(b_2309);
const newTVar_2068 = ctx_2187 => {
  let $phi$253;
  if((((true&&true)&&true)&&true)&&true){
    const n_2192 = "$"+(intToString(ctx_2187.$2));
    $phi$253 = ((Pair_1900((((ICtx_2060(ctx_2187.$0))(ctx_2187.$1))(ctx_2187.$2+1))(ctx_2187.$3)))((TVar_2023(emptyAnn_2037))(n_2192)))
  } else error("pattern match fail",ctx_2187);
  return $phi$253
};
const addBound_2073 = b_2211 => ctx_2212 => {
  let $phi$254;
  if((((true&&true)&&true)&&true)&&true){
    $phi$254 = ((((ICtx_2060(ctx_2212.$0))((push(b_2211))(ctx_2212.$1)))(ctx_2212.$2))(ctx_2212.$3))
  } else error("pattern match fail",ctx_2212);
  return $phi$254
};
const instantiate_2093 = ctx_2326 => mkvar_2327 => t_2328 => {
  let $phi$255;
  if(((((t_2328.$tag==6)&&true)&&true)&&true)&&true){
    const f_2338 = sc_2339 => v_2340 => {
      let $phi$256;
      if((true&&true)&&true){
        let $phi$257;
        const $phi$258 = (mkvar_2327(sc_2339.$1))(v_2340);
        if((true&&true)&&true){
          $phi$257 = ((Pair_1900(((((insert_1930($instance_515))($instance_460))(v_2340))($phi$258.$1))(sc_2339.$0)))($phi$258.$0))
        } else error("pattern match fail",$phi$258);
        $phi$256 = $phi$257
      } else error("pattern match fail",sc_2339);
      return $phi$256
    };
    const _sc_2333 = ((foldl(f_2338))((Pair_1900(Empty_1909))(ctx_2326)))(t_2328.$1);
    const subs_2334 = fst_1914(_sc_2333);
    const replace_2336 = t_2345 => {
      let $phi$259;
      if(((t_2345.$tag==0)&&true)&&true){
        $phi$259 = t_2345
      } else if(((t_2345.$tag==1)&&true)&&true){
        $phi$259 = t_2345
      } else if(t_2345.$tag==5){
        $phi$259 = t_2345
      } else if(((t_2345.$tag==2)&&true)&&true){
        let $phi$261;
        const $phi$262 = (((lookup_1922($instance_515))($instance_460))(t_2345.$1))(subs_2334);
        if($phi$262.$tag==1){
          $phi$261 = t_2345
        } else if(($phi$262.$tag==0)&&true){
          $phi$261 = $phi$262.$0
        } else error("pattern match fail",$phi$262);
        $phi$259 = $phi$261
      } else if((((t_2345.$tag==3)&&true)&&true)&&true){
        $phi$259 = (((TApp_2025(t_2345.$0))(replace_2336(t_2345.$1)))(replace_2336(t_2345.$2)))
      } else if((((t_2345.$tag==4)&&true)&&true)&&true){
        $phi$259 = (((TRow_2026(t_2345.$0))((map(m_2359 => {
          let $phi$260;
          if((true&&true)&&true){
            $phi$260 = ((Pair_1900(replace_2336(m_2359.$0)))(replace_2336(m_2359.$1)))
          } else error("pattern match fail",m_2359);
          return $phi$260
        }))(t_2345.$1)))(((fmap($instance_466))(replace_2336))(t_2345.$2)))
      } else if(((((t_2345.$tag==6)&&true)&&true)&&true)&&true){
        $phi$259 = (error("nested universal quantification"))
      } else error("pattern match fail",t_2345);
      return $phi$259
    };
    const replaceBound_2337 = b_2366 => {
      let $phi$263;
      if(((true&&true)&&true)&&true){
        $phi$263 = (((TCBound_2021(b_2366.$0))(b_2366.$1))(replace_2336(b_2366.$2)))
      } else error("pattern match fail",b_2366);
      return $phi$263
    };
    const ctx2_2335 = snd_1904(_sc_2333);
    $phi$255 = ((Pair_1900((Pair_1900(replace_2336(t_2328.$3)))((map(replaceBound_2337))(t_2328.$2))))(ctx2_2335))
  } else if(true){
    $phi$255 = ((Pair_1900((Pair_1900(t_2328))([])))(ctx_2326))
  } else error("pattern match fail",t_2328);
  return $phi$255
};
const instantiateM_2092 = t_2317 => (($gt$gt$eq($instance_511))(gets_1953))(ctx_2318 => {
  let $phi$264;
  const $phi$265 = ((instantiate_2093(ctx_2318))(ctx_2319 => __2320 => newTVar_2068(ctx_2319)))(t_2317);
  if((true&&((true&&true)&&true))&&true){
    $phi$264 = ((($gt$gt_1981($instance_511))(sets_1952(((foldl(ctx_2324 => b_2325 => (addBound_2073(b_2325))(ctx_2324)))($phi$265.$1))($phi$265.$0.$1))))((ret($instance_511))($phi$265.$0.$0)))
  } else error("pattern match fail",$phi$265);
  return $phi$264
});
const emptySubs_2063 = (Subs_2059(Empty_1909))(Empty_1909);
const composeSubs_2064 = ef_2133 => sa_2134 => sb_2135 => {
  let $phi$266;
  if((true&&true)&&true){
    $phi$266 = (((foldTrie_1924(r_2138 => v_2139 => t_2140 => (((addSub_2065(ef_2133))(v_2139))(t_2140))(r_2138)))(((foldTrie_1924(r_2141 => v_2142 => t_2143 => (((addSatSub_2066(ef_2133))(v_2142))(t_2143))(r_2141)))(sa_2134))(sb_2135.$0)))(sb_2135.$1))
  } else error("pattern match fail",sb_2135);
  return $phi$266
};
const addSub_2065 = ef_2144 => v_2145 => t_2146 => subs_2147 => {
  const t2_2148 = (applySubs_2095(subs_2147))(t_2146);
  let $phi$267;
  const $phi$268 = (getSub_2062(v_2145))(subs_2147);
  if($phi$268.$tag==1){
    let $phi$269;
    if((true&&true)&&true){
      const subUnsat_2151 = local$instance$Hashable$1 => local$instance$Eq$0 => su_2155 => uv_2156 => ut_2157 => {
        let $phi$270;
        if((true&&true)&&true){
          const ut2_2160 = ((substitute_2094(v_2145))(t2_2148))(ut_2157);
          let $phi$271;
          const $phi$272 = isEmpty_1945(freeTVars_2089(ut2_2160));
          if($phi$272){
            $phi$271 = ((Pair_1900(((((insert_1930(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2156))(ut2_2160))(su_2155.$0)))(su_2155.$1))
          } else if(!$phi$272){
            $phi$271 = ((Pair_1900(su_2155.$0))(((((insert_1930(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2156))(ut2_2160))(su_2155.$1)))
          } else error("pattern match fail",$phi$272);
          $phi$270 = $phi$271
        } else error("pattern match fail",su_2155);
        return $phi$270
      };
      const su_2152 = ((foldTrie_1924((subUnsat_2151($instance_515))($instance_460)))((Pair_1900(subs_2147.$0))(Empty_1909)))(subs_2147.$1);
      const unsat2_2154 = snd_1904(su_2152);
      const sat2_2153 = fst_1914(su_2152);
      let $phi$273;
      const $phi$274 = isEmpty_1945(freeTVars_2089(t2_2148));
      if($phi$274){
        $phi$273 = ((Subs_2059(((((insert_1930($instance_515))($instance_460))(v_2145))(t2_2148))(sat2_2153)))(unsat2_2154))
      } else if(!$phi$274){
        $phi$273 = ((Subs_2059(sat2_2153))(((((insert_1930($instance_515))($instance_460))(v_2145))(t2_2148))(unsat2_2154)))
      } else error("pattern match fail",$phi$274);
      $phi$269 = $phi$273
    } else error("pattern match fail",subs_2147);
    $phi$267 = $phi$269
  } else if(($phi$268.$tag==0)&&true){
    $phi$267 = (((composeSubs_2064(ef_2144))(subs_2147))(((unify_2098(ef_2144))($phi$268.$0))(t2_2148)))
  } else error("pattern match fail",$phi$268);
  return $phi$267
};
const addSatSub_2066 = ef_2162 => v_2163 => t_2164 => subs_2165 => {
  let $phi$275;
  const $phi$276 = (getSub_2062(v_2163))(subs_2165);
  if($phi$276.$tag==1){
    let $phi$277;
    if((true&&true)&&true){
      const subUnsat_2168 = local$instance$Hashable$1 => local$instance$Eq$0 => su_2172 => uv_2173 => ut_2174 => {
        let $phi$278;
        if((true&&true)&&true){
          const ut2_2177 = ((substitute_2094(v_2163))(t_2164))(ut_2174);
          let $phi$279;
          const $phi$280 = isEmpty_1945(freeTVars_2089(ut2_2177));
          if($phi$280){
            $phi$279 = ((Pair_1900(((((insert_1930(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2173))(ut2_2177))(su_2172.$0)))(su_2172.$1))
          } else if(!$phi$280){
            $phi$279 = ((Pair_1900(su_2172.$0))(((((insert_1930(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2173))(ut2_2177))(su_2172.$1)))
          } else error("pattern match fail",$phi$280);
          $phi$278 = $phi$279
        } else error("pattern match fail",su_2172);
        return $phi$278
      };
      const su_2169 = ((foldTrie_1924((subUnsat_2168($instance_515))($instance_460)))((Pair_1900(subs_2165.$0))(Empty_1909)))(subs_2165.$1);
      const unsat2_2171 = snd_1904(su_2169);
      const sat2_2170 = fst_1914(su_2169);
      $phi$277 = ((Subs_2059(((((insert_1930($instance_515))($instance_460))(v_2163))(t_2164))(sat2_2170)))(unsat2_2171))
    } else error("pattern match fail",subs_2165);
    $phi$275 = $phi$277
  } else if(($phi$276.$tag==0)&&true){
    $phi$275 = (((composeSubs_2064(ef_2162))(subs_2165))(((unify_2098(ef_2162))($phi$276.$0))(t_2164)))
  } else error("pattern match fail",$phi$276);
  return $phi$275
};
const substitute_2094 = n_2371 => s_2372 => t_2373 => (applySubs_2095((((addSub_2065(s_2374 => "substitute: "+s_2374))(n_2371))(s_2372))(emptySubs_2063)))(t_2373);
const unify_2098 = ef_2406 => a_2407 => b_2408 => {
  const err_2410 = a_2416 => b_2417 => error(ef_2406((("cannot unify "+(printType_2054(a_2416)))+" with ")+(printType_2054(b_2417))));
  const bind_2409 = n_2411 => t_2412 => {
    let $phi$281;
    if(((t_2412.$tag==1)&&true)&&true){
      let $phi$284;
      const $phi$285 = (($eq$eq($instance_460))(n_2411))(t_2412.$1);
      if($phi$285){
        $phi$284 = emptySubs_2063
      } else if(!$phi$285){
        $phi$284 = ((((addSub_2065(ef_2406))(n_2411))(t_2412))(emptySubs_2063))
      } else error("pattern match fail",$phi$285);
      $phi$281 = $phi$284
    } else if(true){
      let $phi$282;
      const $phi$283 = (((setContains_1923($instance_515))($instance_460))(n_2411))(freeTVars_2089(t_2412));
      if($phi$283){
        $phi$282 = (error(ef_2406("occurs check failed")))
      } else if(!$phi$283){
        $phi$282 = ((((addSub_2065(ef_2406))(n_2411))(t_2412))(emptySubs_2063))
      } else error("pattern match fail",$phi$283);
      $phi$281 = $phi$282
    } else error("pattern match fail",t_2412);
    return $phi$281
  };
  let $phi$286;
  if(((a_2407.$tag==1)&&true)&&true){
    let $phi$295;
    if(true){
      $phi$295 = ((bind_2409(a_2407.$1))(b_2408))
    } else error("pattern match fail",b_2408);
    $phi$286 = $phi$295
  } else if(((a_2407.$tag==2)&&true)&&true){
    let $phi$292;
    if(((b_2408.$tag==2)&&true)&&true){
      let $phi$293;
      const $phi$294 = (($eq$eq($instance_460))(a_2407.$1))(b_2408.$1);
      if($phi$294){
        $phi$293 = emptySubs_2063
      } else if(!$phi$294){
        $phi$293 = ((err_2410(a_2407))(b_2408))
      } else error("pattern match fail",$phi$294);
      $phi$292 = $phi$293
    } else if(((b_2408.$tag==1)&&true)&&true){
      $phi$292 = ((bind_2409(b_2408.$1))(a_2407))
    } else if(true){
      $phi$292 = ((err_2410(a_2407))(b_2408))
    } else error("pattern match fail",b_2408);
    $phi$286 = $phi$292
  } else if(((a_2407.$tag==0)&&true)&&true){
    let $phi$289;
    if(((b_2408.$tag==0)&&true)&&true){
      let $phi$290;
      const $phi$291 = (($eq$eq($instance_460))(a_2407.$1))(b_2408.$1);
      if($phi$291){
        $phi$290 = emptySubs_2063
      } else if(!$phi$291){
        $phi$290 = ((err_2410(a_2407))(b_2408))
      } else error("pattern match fail",$phi$291);
      $phi$289 = $phi$290
    } else if(((b_2408.$tag==1)&&true)&&true){
      $phi$289 = ((bind_2409(b_2408.$1))(a_2407))
    } else if(true){
      $phi$289 = ((err_2410(a_2407))(b_2408))
    } else error("pattern match fail",b_2408);
    $phi$286 = $phi$289
  } else if(a_2407.$tag==7){
    $phi$286 = ((err_2410(a_2407))(b_2408))
  } else if(a_2407.$tag==5){
    $phi$286 = ((err_2410(a_2407))(b_2408))
  } else if((((a_2407.$tag==3)&&true)&&true)&&true){
    let $phi$288;
    if(((b_2408.$tag==1)&&true)&&true){
      $phi$288 = ((bind_2409(b_2408.$1))(a_2407))
    } else if((((b_2408.$tag==3)&&true)&&true)&&true){
      const fsubs_2443 = ((unify_2098(ef_2406))(a_2407.$1))(b_2408.$1);
      const xsubs_2444 = ((unify_2098(ef_2406))((applySubs_2095(fsubs_2443))(a_2407.$2)))((applySubs_2095(fsubs_2443))(b_2408.$2));
      $phi$288 = (((composeSubs_2064(ef_2406))(fsubs_2443))(xsubs_2444))
    } else if(true){
      $phi$288 = ((err_2410(a_2407))(b_2408))
    } else error("pattern match fail",b_2408);
    $phi$286 = $phi$288
  } else if((((a_2407.$tag==4)&&true)&&true)&&(a_2407.$2.$tag==1)){
    $phi$286 = ((err_2410(a_2407))(b_2408))
  } else if((((a_2407.$tag==4)&&true)&&true)&&true){
    let $phi$287;
    if(((b_2408.$tag==1)&&true)&&true){
      $phi$287 = ((bind_2409(b_2408.$1))(a_2407))
    } else if((((b_2408.$tag==4)&&true)&&true)&&(b_2408.$2.$tag==1)){
      $phi$287 = ((err_2410(a_2407))(b_2408))
    } else if(true){
      $phi$287 = ((err_2410(a_2407))(b_2408))
    } else error("pattern match fail",b_2408);
    $phi$286 = $phi$287
  } else if(true){
    $phi$286 = ((err_2410(a_2407))(b_2408))
  } else error("pattern match fail",a_2407);
  return $phi$286
};
const setSubs_2072 = subs_2205 => ctx_2206 => {
  let $phi$296;
  if((((true&&true)&&true)&&true)&&true){
    $phi$296 = ((((ICtx_2060(subs_2205))((map(applySubsBound_2096(subs_2205)))(ctx_2206.$1)))(ctx_2206.$2))(ctx_2206.$3))
  } else error("pattern match fail",ctx_2206);
  return $phi$296
};
const getErrorF_2079 = (($gt$gt$eq($instance_511))(gets_1953))(ctx_2244 => {
  let $phi$297;
  if((((true&&true)&&true)&&true)&&true){
    $phi$297 = ((ret($instance_511))(ctx_2244.$3))
  } else error("pattern match fail",ctx_2244);
  return $phi$297
});
const unifyM_2097 = a_2400 => b_2401 => (($gt$gt$eq($instance_511))(gets_1953))(ctx_2402 => (($gt$gt$eq($instance_511))(getErrorF_2079))(ef_2403 => {
  const ef2_2404 = s_2405 => ef_2403((((("unifying "+(printType_2054(a_2400)))+" and ")+(printType_2054(b_2401)))+": ")+s_2405);
  return sets_1952((setSubs_2072(((composeSubs_2064(ef2_2404))(getSubs_2071(ctx_2402)))(((unify_2098(ef2_2404))(a_2400))(b_2401))))(ctx_2402))
}));
const onError_2077 = e_2234 => (($gt$gt$eq($instance_511))(gets_1953))(ctx_2235 => {
  let $phi$298;
  if((((true&&true)&&true)&&true)&&true){
    $phi$298 = (sets_1952((((ICtx_2060(ctx_2235.$0))(ctx_2235.$1))(ctx_2235.$2))(e_2234)))
  } else error("pattern match fail",ctx_2235);
  return $phi$298
});
const withError_2078 = e_2240 => f_2241 => (($gt$gt$eq($instance_511))(getErrorF_2079))(old_2242 => (($gt$gt$eq($instance_511))((($gt$gt_1981($instance_511))(onError_2077(e_2240)))(f_2241)))(r_2243 => (($gt$gt_1981($instance_511))(onError_2077(old_2242)))((ret($instance_511))(r_2243))));
const withLocError_2100 = e_2461 => f_2462 => {
  let $phi$299;
  const $phi$300 = getAnnCodeLoc_2031(annOf_2011(e_2461));
  if($phi$300.$tag==1){
    $phi$299 = f_2462
  } else if(($phi$300.$tag==0)&&true){
    $phi$299 = ((withError_2078(s_2464 => (s_2464+" ")+(printCodeLoc_2033($phi$300.$0))))(f_2462))
  } else error("pattern match fail",$phi$300);
  return $phi$299
};
const unrollDataConType_2109 = t_2685 => {
  let $phi$301;
  if((((t_2685.$tag==3)&&true)&&((((t_2685.$1.$tag==3)&&true)&&(((t_2685.$1.$1.$tag==0)&&true)&&("->"==t_2685.$1.$1.$1)))&&true))&&true){
    let $phi$302;
    const $phi$303 = unrollDataConType_2109(t_2685.$2);
    if((true&&true)&&true){
      $phi$302 = ((Pair_1900((enqueue(t_2685.$1.$2))($phi$303.$0)))($phi$303.$1))
    } else error("pattern match fail",$phi$303);
    $phi$301 = $phi$302
  } else if(true){
    $phi$301 = ((Pair_1900([]))(t_2685))
  } else error("pattern match fail",t_2685);
  return $phi$301
};
const skolemizeSubs_2103 = (foldl(subs_2612 => v_2613 => (((addSub_2065(s_2614 => "skolemize: "+s_2614))(v_2613))((TSkolem_2024(emptyAnn_2037))(v_2613)))(subs_2612)))(emptySubs_2063);
const skolemize_2105 = e_2622 => {
  let $phi$304;
  const $phi$305 = getType_2012(e_2622);
  if((((($phi$305.$tag==6)&&true)&&true)&&true)&&true){
    const subs_2627 = skolemizeSubs_2103($phi$305.$1);
    const t2_2628 = (((TForall_2028($phi$305.$0))($phi$305.$1))((map(applySubsBound_2096(subs_2627)))($phi$305.$2)))((applySubs_2095(subs_2627))($phi$305.$3));
    $phi$304 = ((applySubsE_2111(subs_2627))((setType_2016(t2_2628))(e_2622)))
  } else if(true){
    $phi$304 = e_2622
  } else error("pattern match fail",$phi$305);
  return $phi$304
};
const freeTVarsInEnv_2086 = env_2275 => {
  let $phi$306;
  if(((true&&true)&&true)&&true){
    $phi$306 = env_2275.$2
  } else error("pattern match fail",env_2275);
  return $phi$306
};
const generalize_2108 = env_2653 => t_2654 => (($gt$gt$eq($instance_511))(gets_1953))(ctx_2655 => {
  const subs_2656 = getSubs_2071(ctx_2655);
  const envTVars_2657 = freeTVarsInEnv_2086(env_2653);
  let $phi$307;
  if((true&&true)&&true){
    $phi$307 = (((foldTrie_1924(s_2664 => v_2665 => __2666 => (((setUnion_1937($instance_515))($instance_460))(s_2664))((justOr_1979(Empty_1909))(((fmap($instance_466))(freeTVars_2089))((((lookup_1922($instance_515))($instance_460))(v_2665))(subs_2656.$1))))))(envTVars_2657))(envTVars_2657))
  } else error("pattern match fail",subs_2656);
  const nonFree_2658 = $phi$307;
  const vs_2659 = (((setDiff_1934($instance_515))($instance_460))(freeTVars_2089(t_2654)))(nonFree_2658);
  const processBounds_2661 = vbb_2667 => b_2668 => {
    let $phi$308;
    if((true&&true)&&((true&&true)&&true)){
      const boundVars_2672 = freeTVarsInBound_2099(b_2668);
      const sharedVars_2673 = (((setIntersection_1932($instance_515))($instance_460))(boundVars_2672))(vs_2659);
      let $phi$309;
      const $phi$310 = isEmpty_1945(sharedVars_2673);
      if($phi$310){
        $phi$309 = ((Pair_1900(vbb_2667.$0))((Pair_1900(vbb_2667.$1.$0))((push(b_2668))(vbb_2667.$1.$1))))
      } else if(!$phi$310){
        let $phi$311;
        const $phi$312 = (($eq$eq($instance_459))(size_1942(sharedVars_2673)))(size_1942(boundVars_2672));
        if($phi$312){
          $phi$311 = ((Pair_1900(vbb_2667.$0))((Pair_1900((push(b_2668))(vbb_2667.$1.$0)))(vbb_2667.$1.$1)))
        } else if(!$phi$312){
          $phi$311 = ((Pair_1900((((setUnion_1937($instance_515))($instance_460))(vbb_2667.$0))(sharedVars_2673)))((Pair_1900(vbb_2667.$1.$0))((push(b_2668))(vbb_2667.$1.$1))))
        } else error("pattern match fail",$phi$312);
        $phi$309 = $phi$311
      } else error("pattern match fail",$phi$310);
      $phi$308 = $phi$309
    } else error("pattern match fail",vbb_2667);
    return $phi$308
  };
  const vbb_2660 = ((foldl(processBounds_2661))((Pair_1900(emptySet_1925))((Pair_1900([]))([]))))(getBounds_2074(ctx_2655));
  let $phi$313;
  if((true&&true)&&((true&&true)&&true)){
    const finalVars_2677 = (((setDiff_1934($instance_515))($instance_460))(vs_2659))(vbb_2660.$0);
    const drop_2678 = local$instance$Hashable$1 => local$instance$Eq$0 => r_2680 => v_2681 => t_2682 => {
      let $phi$314;
      const $phi$315 = ($_1913(isEmpty_1945))((((setIntersection_1932($instance_515))($instance_460))(finalVars_2677))(freeTVars_2089(t_2682)));
      if($phi$315){
        $phi$314 = (((((insert_1930(local$instance$Hashable$1))(local$instance$Eq$0))(v_2681))(t_2682))(r_2680))
      } else if(!$phi$315){
        $phi$314 = r_2680
      } else error("pattern match fail",$phi$315);
      return $phi$314
    };
    let $phi$316;
    if((true&&true)&&true){
      $phi$316 = ((Subs_2059(subs_2656.$0))(((foldTrie_1924((drop_2678($instance_515))($instance_460)))(Empty_1909))(subs_2656.$1)))
    } else error("pattern match fail",subs_2656);
    const subs2_2679 = $phi$316;
    let $phi$317;
    const $phi$318 = (($_1913(not_1927))(isEmpty_1945(finalVars_2677)))||((($gt_1984($instance_461))(length(vbb_2660.$1.$0)))(0));
    if($phi$318){
      $phi$317 = ((ret($instance_511))((((mkTForall_2091(emptyAnn_2037))(setToArray_1935(finalVars_2677)))(vbb_2660.$1.$0))(t_2654)))
    } else if(!$phi$318){
      $phi$317 = ((ret($instance_511))(t_2654))
    } else error("pattern match fail",$phi$318);
    $phi$313 = ((($gt$gt_1981($instance_511))(sets_1952((setBounds_2075(vbb_2660.$1.$1))((setSubs_2072(subs2_2679))(ctx_2655)))))($phi$317))
  } else error("pattern match fail",vbb_2660);
  return $phi$313
});
const infer_2101 = env_2465 => e_2466 => {
  const inferPat_2469 = env_2487 => te_2488 => pat_2489 => {
    let $phi$319;
    if(((pat_2489.$tag==0)&&true)&&true){
      $phi$319 = ((($gt$gt$eq($instance_511))(newTVarM_2069))(tv_2492 => (($gt$gt_1981($instance_511))((unifyM_2097(te_2488))(tv_2492)))((ret($instance_511))((Pair_1900(((((insert_1930($instance_515))($instance_460))(pat_2489.$1))(tv_2492))(Empty_1909)))((PVar_2047((setAnnType_2015(tv_2492))(pat_2489.$0)))(pat_2489.$1))))))
    } else if(((pat_2489.$tag==1)&&true)&&((pat_2489.$1.$tag==0)&&true)){
      $phi$319 = ((($gt$gt_1981($instance_511))((unifyM_2097(te_2488))((TConst_2022(emptyAnn_2037))("Number"))))((ret($instance_511))((Pair_1900(Empty_1909))(pat_2489))))
    } else if(((pat_2489.$tag==1)&&true)&&((pat_2489.$1.$tag==1)&&true)){
      $phi$319 = ((($gt$gt_1981($instance_511))((unifyM_2097(te_2488))((TConst_2022(emptyAnn_2037))("String"))))((ret($instance_511))((Pair_1900(Empty_1909))(pat_2489))))
    } else if((((pat_2489.$tag==2)&&true)&&true)&&true){
      $phi$319 = ((($gt$gt$eq($instance_511))((getBindingM_2082(pat_2489.$1))(env_2487)))(bt_2500 => {
        let $phi$320;
        if(bt_2500.$tag==1){
          $phi$320 = (error("unknown data type "+pat_2489.$1))
        } else if((bt_2500.$tag==0)&&true){
          $phi$320 = ((($gt$gt$eq($instance_511))(instantiateM_2092(bt_2500.$0)))(t_2502 => {
            let $phi$321;
            const $phi$322 = unrollDataConType_2109(t_2502);
            if((true&&true)&&true){
              let $phi$323;
              const $phi$324 = (($eq$eq($instance_459))(length(pat_2489.$2)))(length($phi$322.$0));
              if(!$phi$324){
                $phi$323 = (errorM_2076("number of pattern params does not match the number of constructor params"))
              } else if($phi$324){
                $phi$323 = ((($gt$gt$eq($instance_511))((((foldM_1954($instance_511))(inferSubPat_2470(env_2487)))((Pair_1900(Empty_1909))([])))((zip_1968(pat_2489.$2))($phi$322.$0))))(bps_2505 => {
                  let $phi$325;
                  if((true&&true)&&true){
                    $phi$325 = ((($gt$gt_1981($instance_511))((unifyM_2097(te_2488))($phi$322.$1)))(($_1913(ret($instance_511)))((Pair_1900(bps_2505.$0))(((PData_2045(pat_2489.$0))(pat_2489.$1))(bps_2505.$1)))))
                  } else error("pattern match fail",bps_2505);
                  return $phi$325
                }))
              } else error("pattern match fail",$phi$324);
              $phi$321 = $phi$323
            } else error("pattern match fail",$phi$322);
            return $phi$321
          }))
        } else error("pattern match fail",bt_2500);
        return $phi$320
      }))
    } else error("pattern match fail",pat_2489);
    return $phi$319
  };
  const inferSubPat_2470 = env_2508 => bp_2509 => pt_2510 => {
    let $phi$326;
    if((true&&true)&&true){
      let $phi$327;
      if((true&&true)&&true){
        $phi$327 = ((($gt$gt$eq($instance_511))(((inferPat_2469(env_2508))(pt_2510.$1))(pt_2510.$0)))(bp_2515 => {
          let $phi$328;
          if((true&&true)&&true){
            $phi$328 = (($_1913(ret($instance_511)))((Pair_1900((((mergeTrie_1936($instance_515))($instance_460))(bp_2509.$0))(bp_2515.$0)))((push(bp_2515.$1))(bp_2509.$1))))
          } else error("pattern match fail",bp_2515);
          return $phi$328
        }))
      } else error("pattern match fail",pt_2510);
      $phi$326 = $phi$327
    } else error("pattern match fail",bp_2509);
    return $phi$326
  };
  const inferCase_2468 = env_2478 => te_2479 => p_2480 => {
    let $phi$329;
    if((true&&true)&&true){
      $phi$329 = ((($gt$gt$eq($instance_511))(((inferPat_2469(env_2478))(te_2479))(p_2480.$0)))(cb_2483 => {
        let $phi$330;
        if((true&&true)&&true){
          $phi$330 = ((($gt$gt$eq($instance_511))((infer_2101((addBindings_2085(cb_2483.$0))(env_2478)))(p_2480.$1)))(e_2486 => (ret($instance_511))((Pair_1900(cb_2483.$1))(e_2486))))
        } else error("pattern match fail",cb_2483);
        return $phi$330
      }))
    } else error("pattern match fail",p_2480);
    return $phi$329
  };
  const setFinalType_2467 = t_2471 => e_2472 => {
    let $phi$331;
    const $phi$332 = getType_2012(e_2472);
    if($phi$332.$tag==7){
      $phi$331 = ((ret($instance_511))((setType_2016(t_2471))(e_2472)))
    } else if((((($phi$332.$tag==6)&&true)&&true)&&true)&&true){
      $phi$331 = ((ret($instance_511))(e_2472))
    } else if(true){
      $phi$331 = ((($gt$gt_1981($instance_511))((unifyM_2097(t_2471))($phi$332)))((ret($instance_511))(e_2472)))
    } else error("pattern match fail",$phi$332);
    return $phi$331
  };
  let $phi$333;
  if(((e_2466.$tag==1)&&true)&&((e_2466.$1.$tag==0)&&true)){
    $phi$333 = ((setFinalType_2467((TConst_2022(emptyAnn_2037))("Number")))(e_2466))
  } else if(((e_2466.$tag==1)&&true)&&((e_2466.$1.$tag==1)&&true)){
    $phi$333 = ((setFinalType_2467((TConst_2022(emptyAnn_2037))("String")))(e_2466))
  } else if(((e_2466.$tag==0)&&true)&&true){
    $phi$333 = ((($gt$gt$eq($instance_511))((getBindingM_2082(e_2466.$1))(env_2465)))(vt_2524 => {
      let $phi$341;
      if(vt_2524.$tag==1){
        $phi$341 = (errorM_2076((("unknown identifier "+e_2466.$1)+", env: ")+(jsonStringify(($_1913(trieKeys_1941))(getBindings_2083(env_2465))))))
      } else if((vt_2524.$tag==0)&&true){
        $phi$341 = ((($gt$gt$eq($instance_511))(instantiateM_2092(vt_2524.$0)))(t_2526 => (setFinalType_2467(t_2526))(e_2466)))
      } else error("pattern match fail",vt_2524);
      return $phi$341
    }))
  } else if((((e_2466.$tag==3)&&true)&&true)&&true){
    $phi$333 = ((($gt$gt$eq($instance_511))(newTVarM_2069))(tv_2530 => (($gt$gt$eq($instance_511))((infer_2101(((addBinding_2084(e_2466.$1))(tv_2530))(env_2465)))(e_2466.$2)))(a_2531 => (setFinalType_2467(((TApp_2025(emptyAnn_2037))(((TApp_2025(emptyAnn_2037))((TConst_2022(emptyAnn_2037))("->")))(tv_2530)))(getType_2012(a_2531))))(((Lam_1991(e_2466.$0))(e_2466.$1))(a_2531)))))
  } else if((((e_2466.$tag==2)&&true)&&true)&&true){
    $phi$333 = ((($gt$gt$eq($instance_511))(newTVarM_2069))(tv_2535 => (($gt$gt$eq($instance_511))((infer_2101(env_2465))(e_2466.$1)))(f_2536 => (($gt$gt$eq($instance_511))((infer_2101(env_2465))(e_2466.$2)))(a_2537 => {
      const synth_2538 = (f1_2090(getType_2012(a_2537)))(tv_2535);
      return (($gt$gt_1981($instance_511))((unifyM_2097(getType_2012(f_2536)))(synth_2538)))((setFinalType_2467(tv_2535))(((App_1990(e_2466.$0))(f_2536))(a_2537)))
    }))))
  } else if((((e_2466.$tag==4)&&true)&&true)&&true){
    $phi$333 = ((($gt$gt$eq($instance_511))((infer_2101(env_2465))(e_2466.$1)))(e_2542 => (($gt$gt$eq($instance_511))(((mapM_1955($instance_511))((inferCase_2468(env_2465))(getType_2012(e_2542))))(e_2466.$2)))(ps_2543 => {
      const t_2544 = getType_2012(snd_1904(head_1961(ps_2543)));
      return (($gt$gt_1981($instance_511))(((mapM_1955($instance_511))(p_2545 => (unifyM_2097(t_2544))(($_1913(getType_2012))(snd_1904(p_2545)))))(tail_1960(ps_2543))))((setFinalType_2467(t_2544))(((Case_1992(e_2466.$0))(e_2542))(ps_2543)))
    })))
  } else if((((e_2466.$tag==5)&&true)&&true)&&true){
    $phi$333 = ((($gt$gt$eq($instance_511))((inferDefs_2107(env_2465))(e_2466.$1)))(ds_2549 => {
      const env2_2550 = ((foldl(env_2551 => d_2552 => {
        let $phi$340;
        if((true&&true)&&true){
          $phi$340 = (((addBinding_2084(d_2552.$0))(getType_2012(d_2552.$1)))(env_2551))
        } else error("pattern match fail",d_2552);
        return $phi$340
      }))(env_2465))(ds_2549);
      return (($gt$gt$eq($instance_511))((infer_2101(env2_2550))(e_2466.$2)))(e_2555 => (setFinalType_2467(getType_2012(e_2555)))(((Let_1993(e_2466.$0))(ds_2549))(e_2555)))
    }))
  } else if((((e_2466.$tag==6)&&true)&&("Array"==e_2466.$1))&&true){
    $phi$333 = ((($gt$gt$eq($instance_511))(((mapM_1955($instance_511))(infer_2101(env_2465)))(e_2466.$2)))(es_2558 => (($gt$gt$eq($instance_511))(newTVarM_2069))(tv_2559 => (($gt$gt_1981($instance_511))(((mapM_1955($instance_511))(e_2560 => (unifyM_2097(tv_2559))(getType_2012(e_2560))))(es_2558)))((setFinalType_2467(((TApp_2025(emptyAnn_2037))((TConst_2022(emptyAnn_2037))("Array")))(tv_2559)))(((New_1994(e_2466.$0))("Array"))(es_2558))))))
  } else if((((e_2466.$tag==6)&&true)&&true)&&true){
    $phi$333 = ((($gt$gt$eq($instance_511))(((mapM_1955($instance_511))(infer_2101(env_2465)))(e_2466.$2)))(es_2564 => (($gt$gt$eq($instance_511))((getBindingM_2082(e_2466.$1))(env_2465)))(t_2565 => {
      let $phi$334;
      if(t_2565.$tag==1){
        $phi$334 = (error("unknown data constructor "+e_2466.$1))
      } else if((t_2565.$tag==0)&&true){
        $phi$334 = ((($gt$gt$eq($instance_511))(instantiateM_2092(t_2565.$0)))(t_2567 => {
          let $phi$335;
          const $phi$336 = unrollDataConType_2109(t_2567);
          if((true&&true)&&true){
            let $phi$337;
            const $phi$338 = (($eq$eq($instance_459))(length(es_2564)))(length($phi$336.$0));
            if(!$phi$338){
              $phi$337 = (errorM_2076((("number of New args does not match the number of constructor params "+(jsonStringify(es_2564)))+" ")+(printType_2054(t_2567))))
            } else if($phi$338){
              $phi$337 = ((($gt$gt_1981($instance_511))(((mapM_1955($instance_511))(p_2570 => {
                let $phi$339;
                if((true&&true)&&true){
                  $phi$339 = ((unifyM_2097(p_2570.$0))(getType_2012(p_2570.$1)))
                } else error("pattern match fail",p_2570);
                return $phi$339
              }))((zip_1968($phi$336.$0))(es_2564))))((setFinalType_2467($phi$336.$1))(((New_1994(e_2466.$0))(e_2466.$1))(es_2564))))
            } else error("pattern match fail",$phi$338);
            $phi$335 = $phi$337
          } else error("pattern match fail",$phi$336);
          return $phi$335
        }))
      } else error("pattern match fail",t_2565);
      return $phi$334
    })))
  } else if(true){
    $phi$333 = (error("type inference not supported for this AST node"))
  } else error("pattern match fail",e_2466);
  return ($_1913(withLocError_2100(e_2466)))($phi$333)
};
const inferSccDefs_2102 = env_2574 => ds_2575 => {
  const generalizeDef_2579 = env_2598 => d_2599 => {
    let $phi$342;
    if((true&&true)&&true){
      let $phi$343;
      const $phi$344 = getType_2012(d_2599.$1);
      if((((($phi$344.$tag==6)&&true)&&true)&&true)&&true){
        $phi$343 = ((ret($instance_511))(d_2599))
      } else if(true){
        $phi$343 = ((($gt$gt$eq($instance_511))((generalize_2108(env_2598))($phi$344)))(t_2607 => {
          const e2_2608 = skolemize_2105((setType_2016(t_2607))(d_2599.$1));
          return (ret($instance_511))((Pair_1900(d_2599.$0))(e2_2608))
        }))
      } else error("pattern match fail",$phi$344);
      $phi$342 = $phi$343
    } else error("pattern match fail",d_2599);
    return $phi$342
  };
  const unifyDef_2578 = env_2589 => d_2590 => {
    let $phi$345;
    if((true&&true)&&true){
      let $phi$346;
      const $phi$347 = getType_2012(d_2590.$1);
      if((((($phi$347.$tag==6)&&true)&&true)&&true)&&true){
        $phi$346 = ((ret($instance_511))(Unit_1926))
      } else if(true){
        $phi$346 = ((unifyM_2097($phi$347))(($_1913(fromJust_1978))((getBinding_2081(d_2590.$0))(env_2589))))
      } else error("pattern match fail",$phi$347);
      $phi$345 = $phi$346
    } else error("pattern match fail",d_2590);
    return $phi$345
  };
  const inferDef_2577 = env_2584 => d_2585 => {
    let $phi$348;
    if((true&&true)&&true){
      $phi$348 = ((($gt$gt$eq($instance_511))((infer_2101(env_2584))(d_2585.$1)))(e_2588 => (ret($instance_511))((Pair_1900(d_2585.$0))(e_2588))))
    } else error("pattern match fail",d_2585);
    return $phi$348
  };
  const generateTVar_2576 = env_2580 => d_2581 => {
    let $phi$349;
    const $phi$350 = getType_2012(snd_1904(d_2581));
    if($phi$350.$tag==7){
      $phi$349 = ((($gt$gt$eq($instance_511))(newTVarM_2069))(tv_2582 => (ret($instance_511))(((addBinding_2084(fst_1914(d_2581)))(tv_2582))(env_2580))))
    } else if(true){
      $phi$349 = ((ret($instance_511))(((addBinding_2084(fst_1914(d_2581)))($phi$350))(env_2580)))
    } else error("pattern match fail",$phi$350);
    return $phi$349
  };
  return (($gt$gt$eq($instance_511))((((foldM_1954($instance_511))(generateTVar_2576))(env_2574))(ds_2575)))(env2_2609 => (($gt$gt$eq($instance_511))(((mapM_1955($instance_511))(inferDef_2577(env2_2609)))(ds_2575)))(ds2_2610 => (($gt$gt$eq($instance_511))((($gt$gt_1981($instance_511))(((mapM_1955($instance_511))(unifyDef_2578(env2_2609)))(ds2_2610)))(((mapM_1955($instance_511))(applySubsDef_2110))(ds2_2610))))(ds3_2611 => (($gt$gt_1981($instance_511))(dropSatisfiedBounds_2106(env_2574)))(((mapM_1955($instance_511))(generalizeDef_2579(env_2574)))(ds3_2611)))))
};
const inferDefs_2107 = env_2637 => ds_2638 => {
  const infer_2642 = rs_2648 => cc_2649 => ((fmap($instance_491))(concat(rs_2648)))((inferSccDefs_2102(((foldl(env_2650 => r_2651 => ((addBinding_2084(fst_1914(r_2651)))(getType_2012(snd_1904(r_2651))))(env_2650)))(env_2637))(rs_2648)))((filter(d_2652 => ((contains_1975($instance_460))(fst_1914(d_2652)))(cc_2649)))(ds_2638)));
  const ns_2639 = (map(fst_1914))(ds_2638);
  const g_2640 = ((foldl(g_2643 => d_2644 => {
    let $phi$351;
    if((true&&true)&&true){
      $phi$351 = (((set(d_2644.$0))((filter(v_2647 => (((contains_1975($instance_460))(v_2647))(ns_2639))&&((($div$eq_1928($instance_460))(v_2647))(d_2644.$0))))(freeVars_2112(d_2644.$1))))(g_2643))
    } else error("pattern match fail",d_2644);
    return $phi$351
  }))(empty))(ds_2638);
  const ccs_2641 = sccSorted_2058(g_2640);
  return (((foldM_1954($instance_511))(infer_2642))([]))(ccs_2641)
};
const newCtx_2070 = (((ICtx_2060(emptySubs_2063))([]))(1))(s_2199 => "unknown error context: "+s_2199);
const inferInstance_2113 = env_2747 => cs_2748 => i_2749 => {
  const inferE_2750 = e_2751 => {
    let $phi$352;
    const $phi$353 = ($_1913(runState_1950(newCtx_2070)))((infer_2101(env_2747))(e_2751));
    if((true&&true)&&true){
      $phi$352 = ((applySubsE_2111(getSubs_2071($phi$353.$0)))($phi$353.$1))
    } else error("pattern match fail",$phi$353);
    return $phi$352
  };
  let $phi$354;
  if((((true&&true)&&true)&&true)&&true){
    let $phi$355;
    const $phi$357 = (find_1918(c_2758 => {
      let $phi$356;
      if((((true&&true)&&true)&&true)&&true){
        $phi$356 = ((($eq$eq($instance_460))(i_2749.$1))(c_2758.$1))
      } else error("pattern match fail",c_2758);
      return $phi$356
    }))(cs_2748);
    if($phi$357.$tag==1){
      $phi$355 = (error("Cannot find clas "+i_2749.$1))
    } else if(($phi$357.$tag==0)&&((((true&&true)&&true)&&true)&&true)){
      const bs2_2767 = ((foldl(bs_2769 => b_2770 => {
        let $phi$358;
        if((true&&true)&&true){
          $phi$358 = (((((insert_1930($instance_515))($instance_460))(b_2770.$0))(((substitute_2094($phi$357.$0.$2))(i_2749.$2))(b_2770.$1)))(bs_2769))
        } else error("pattern match fail",b_2770);
        return $phi$358
      }))(Empty_1909))($phi$357.$0.$3);
      const ds2_2768 = (map(d_2773 => {
        let $phi$359;
        if((true&&true)&&true){
          $phi$359 = ((Pair_1900(d_2773.$0))(inferE_2750((setType_2016(($_1913(fromJust_1978))((((lookup_1922($instance_515))($instance_460))(d_2773.$0))(bs2_2767))))(d_2773.$1))))
        } else error("pattern match fail",d_2773);
        return $phi$359
      }))(i_2749.$3);
      $phi$355 = ((((Instance_2041(i_2749.$0))(i_2749.$1))(i_2749.$2))(ds2_2768))
    } else error("pattern match fail",$phi$357);
    $phi$354 = $phi$355
  } else error("pattern match fail",i_2749);
  return $phi$354
};
const emptyEnv_2080 = ((IEnv_2061(Empty_1909))([]))(emptySet_1925);
const addInstance_2087 = b_2279 => env_2280 => {
  let $phi$360;
  if(((true&&true)&&true)&&true){
    $phi$360 = (((IEnv_2061(env_2280.$0))((push(b_2279))(env_2280.$1)))(env_2280.$2))
  } else error("pattern match fail",env_2280);
  return $phi$360
};
const skolemizeType_2104 = t_2615 => {
  let $phi$361;
  if(((((t_2615.$tag==6)&&true)&&true)&&true)&&true){
    const subs_2620 = skolemizeSubs_2103(t_2615.$1);
    $phi$361 = ((((TForall_2028(t_2615.$0))(t_2615.$1))((map(applySubsBound_2096(subs_2620)))(t_2615.$2)))((applySubs_2095(subs_2620))(t_2615.$3)))
  } else if(true){
    $phi$361 = t_2615
  } else error("pattern match fail",t_2615);
  return $phi$361
};
const classToBindings_2115 = c_2781 => {
  let $phi$362;
  if((((true&&true)&&true)&&true)&&true){
    const process_2786 = b_2787 => {
      let $phi$363;
      if((true&&true)&&true){
        const ftv_2790 = freeTVars_2089(b_2787.$1);
        let $phi$364;
        const $phi$365 = (((setContains_1923($instance_515))($instance_460))(c_2781.$2))(ftv_2790);
        if(!$phi$365){
          $phi$364 = (error((("invalid clas definition "+c_2781.$1)+", binding ")+b_2787.$0))
        } else if($phi$365){
          $phi$364 = ((Pair_1900(b_2787.$0))(skolemizeType_2104((((mkTForall_2091(emptyAnn_2037))(setToArray_1935(ftv_2790)))([((TCBound_2021(emptyAnn_2037))(c_2781.$1))((TVar_2023(emptyAnn_2037))(c_2781.$2))]))(b_2787.$1))))
        } else error("pattern match fail",$phi$365);
        $phi$363 = $phi$364
      } else error("pattern match fail",b_2787);
      return $phi$363
    };
    $phi$362 = ((map(process_2786))(c_2781.$3))
  } else error("pattern match fail",c_2781);
  return $phi$362
};
const inferTypeModule_2116 = ms_2791 => m_2792 => {
  const checkForUnsatisfiedBounds_2797 = d_2826 => {
    let $phi$366;
    const $phi$367 = getType_2012(snd_1904(d_2826));
    if((((($phi$367.$tag==6)&&true)&&true)&&true)&&true){
      let $phi$368;
      if(((($phi$367.$3.$tag==3)&&true)&&(((($phi$367.$3.$1.$tag==3)&&true)&&((($phi$367.$3.$1.$1.$tag==0)&&true)&&("->"==$phi$367.$3.$1.$1.$1)))&&true))&&true){
        $phi$368 = d_2826
      } else if(true){
        let $phi$369;
        const $phi$370 = length($phi$367.$2);
        if(0==$phi$370){
          $phi$369 = d_2826
        } else if(true){
          $phi$369 = (error((("unsatisfied bounds in def of "+(fst_1914(d_2826)))+" :: ")+(printType_2054(getType_2012(snd_1904(d_2826))))))
        } else error("pattern match fail",$phi$370);
        $phi$368 = $phi$369
      } else error("pattern match fail",$phi$367.$3);
      $phi$366 = $phi$368
    } else if(true){
      $phi$366 = d_2826
    } else error("pattern match fail",$phi$367);
    return $phi$366
  };
  const addIns_2796 = env_2824 => i_2825 => (addInstance_2087(instanceToTypeBound_2114(snd_1904(i_2825))))(env_2824);
  const getFile_2793 = i_2798 => {
    let $phi$371;
    if((((i_2798.$tag==1)&&true)&&true)&&true){
      $phi$371 = i_2798.$1
    } else error("pattern match fail",i_2798);
    return $phi$371
  };
  const addClass_2795 = env_2820 => c_2821 => ((foldl(env_2822 => b_2823 => ((addBinding_2084(fst_1914(b_2823)))(snd_1904(b_2823)))(env_2822)))(env_2820))(classToBindings_2115(c_2821));
  const addImports_2794 = env_2802 => i_2803 => {
    let $phi$372;
    const $phi$373 = (get(getFile_2793(i_2803)))(ms_2791);
    if(((true&&true)&&true)&&true){
      let $phi$374;
      if((((i_2803.$tag==1)&&true)&&true)&&true){
        $phi$374 = (((foldl(env_2813 => n_2814 => {
          let $phi$375;
          if((true&&true)&&true){
            $phi$375 = (((addBinding_2084(n_2814.$1))((get(n_2814.$0))($phi$373.$0)))(env_2813))
          } else error("pattern match fail",n_2814);
          return $phi$375
        }))(env_2802))(i_2803.$2))
      } else error("pattern match fail",i_2803);
      const env2_2807 = $phi$374;
      const env3_2808 = ((foldl(addClass_2795))(env2_2807))($phi$373.$1);
      const env4_2809 = ((foldTrie_1924(env_2817 => __2818 => i_2819 => (addInstance_2087(i_2819))(env_2817)))(env3_2808))($phi$373.$2);
      $phi$372 = env4_2809
    } else error("pattern match fail",$phi$373);
    return $phi$372
  };
  let $phi$376;
  if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
    const env_2846 = emptyEnv_2080;
    const env2_2847 = ((foldl(addImports_2794))(env_2846))(m_2792.$2);
    const env3_2848 = ((foldl(addClass_2795))(env2_2847))(m_2792.$4);
    const env4_2849 = ((foldl(addIns_2796))(env3_2848))(m_2792.$5);
    const ds2_2850 = (evalState_1951(newCtx_2070))((inferDefs_2107(env4_2849))(m_2792.$6));
    const ds3_2851 = (map(checkForUnsatisfiedBounds_2797))(ds2_2850);
    const env5_2852 = ((foldl(env_2854 => d_2855 => {
      let $phi$377;
      if((true&&true)&&true){
        $phi$377 = (((addBinding_2084(d_2855.$0))(getType_2012(d_2855.$1)))(env_2854))
      } else error("pattern match fail",d_2855);
      return $phi$377
    }))(env4_2849))(ds3_2851);
    const allCls_2858 = (concat(m_2792.$4))((concatMap_1967(i_2859 => {
      let $phi$378;
      const $phi$379 = (get(getFile_2793(i_2859)))(ms_2791);
      if(((true&&true)&&true)&&true){
        $phi$378 = $phi$379.$1
      } else error("pattern match fail",$phi$379);
      return $phi$378
    }))(m_2792.$2));
    const ins2_2853 = (map(mapSnd_1901((inferInstance_2113(env5_2852))(allCls_2858))))(m_2792.$5);
    $phi$376 = (((((((Module_2044(m_2792.$0))(m_2792.$1))(m_2792.$2))(m_2792.$3))(m_2792.$4))(ins2_2853))(ds3_2851))
  } else error("pattern match fail",m_2792);
  return $phi$376
};
const assert_2911 = assert_90;
const Pair_2912 = Pair_3;
const mapSnd_2913 = mapSnd_89;
const mapFst_2914 = mapFst_88;
const $gt$eq$gt_2915 = $gt$eq$gt_87;
const snd_2916 = snd_27;
const debug2_2917 = debug2_86;
const Just_2918 = Just_1;
const Nothing_2919 = Nothing_2;
const isJust_2920 = isJust_25;
const Empty_2921 = Empty_11;
const Leaf_2922 = Leaf_12;
const Collision_2923 = Collision_13;
const BitmapIndexed_2924 = BitmapIndexed_14;
const $_2925 = $_16;
const fst_2926 = fst_26;
const Left_2927 = Left_8;
const Right_2928 = Right_9;
const loop_2929 = loop_31;
const find_2930 = find_33;
const hamtMask_2931 = hamtMask_62;
const popCount_2932 = popCount_61;
const hamtIndex_2933 = hamtIndex_63;
const lookup_2934 = lookup_64;
const setContains_2935 = setContains_81;
const foldTrie_2936 = foldTrie_70;
const emptySet_2937 = emptySet_77;
const Unit_2938 = Unit_0;
const not_2939 = not_30;
const $div$eq_2940 = $div$eq_17;
const mapIx_2941 = mapIx_34;
const insert_2942 = insert_65;
const setAdd_2943 = setAdd_78;
const setIntersection_2944 = setIntersection_85;
const remove_2945 = remove_67;
const setDiff_2946 = setDiff_84;
const setToArray_2947 = setToArray_83;
const mergeTrie_2948 = mergeTrie_74;
const setUnion_2949 = setUnion_82;
const setRemove_2950 = setRemove_80;
const setAddAll_2951 = setAddAll_79;
const trieEntries_2952 = trieEntries_76;
const trieKeys_2953 = trieKeys_75;
const size_2954 = size_72;
const mapTrie_2955 = mapTrie_71;
const nodeMask_2956 = nodeMask_60;
const isEmpty_2957 = isEmpty_73;
const filterTrie_2958 = filterTrie_69;
const nextSetBitMask_2959 = nextSetBitMask_68;
const updateOrSet_2960 = updateOrSet_66;
const State_2961 = State_10;
const runState_2962 = runState_58;
const evalState_2963 = evalState_59;
const sets_2964 = sets_57;
const gets_2965 = gets_56;
const foldM_2966 = foldM_53;
const mapM_2967 = mapM_54;
const forM_2968 = forM_55;
const strToArray_2969 = strToArray_52;
const toRecord_2970 = toRecord_51;
const reverse_2971 = reverse_50;
const tail_2972 = tail_45;
const head_2973 = head_44;
const uniq_2974 = uniq_49;
const mergeSet_2975 = mergeSet_48;
const init_2976 = init_47;
const last_2977 = last_46;
const mapJust_2978 = mapJust_43;
const concatMap_2979 = concatMap_42;
const zip_2980 = zip_41;
const zipWithIndex2_2981 = zipWithIndex2_39;
const zipWithIndex_2982 = zipWithIndex_40;
const join_2983 = join_38;
const all_2984 = all_37;
const exists_2985 = exists_36;
const containsChar_2986 = containsChar_35;
const contains_2987 = contains_32;
const either_2988 = either_28;
const splitEither_2989 = splitEither_29;
const fromJust_2990 = fromJust_24;
const justOr_2991 = justOr_23;
const maybe_2992 = maybe_22;
const $gt$gt_2993 = $gt$gt_21;
const $gt$eq_2994 = $gt$eq_20;
const $lt$eq_2995 = $lt$eq_19;
const $gt_2996 = $gt_18;
const Identity_2997 = Identity_15;
const Tuple6_2998 = Tuple6_7;
const Tuple5_2999 = Tuple5_6;
const Tuple4_3000 = Tuple4_5;
const Tuple3_3001 = Tuple3_4;
const App_3002 = App_785;
const Lam_3003 = Lam_786;
const Case_3004 = Case_787;
const Let_3005 = Let_788;
const New_3006 = New_789;
const breakableDownAndUpM_3007 = breakableDownAndUpM_836;
const breakableDownM_3008 = breakableDownM_840;
const downAndUpM_3009 = downAndUpM_837;
const downM_3010 = downM_839;
const upM_3011 = upM_838;
const breakableDownAndUp_3012 = breakableDownAndUp_831;
const breakableDown_3013 = breakableDown_835;
const downAndUp_3014 = downAndUp_832;
const down_3015 = down_834;
const up_3016 = up_833;
const AnnType_3017 = AnnType_777;
const TUnknown_3018 = TUnknown_809;
const getAnn_3019 = getAnn_814;
const getAnnType_3020 = getAnnType_817;
const Var_3021 = Var_783;
const Const_3022 = Const_784;
const annOf_3023 = annOf_828;
const getType_3024 = getType_830;
const withAnn_3025 = withAnn_829;
const setAnn_3026 = setAnn_815;
const setAnnType_3027 = setAnnType_818;
const setType_3028 = setType_827;
const Data_3029 = Data_797;
const DataCon_3030 = DataCon_798;
const dataConName_3031 = dataConName_825;
const dataConNames_3032 = dataConNames_826;
const TCBound_3033 = TCBound_801;
const TConst_3034 = TConst_802;
const TVar_3035 = TVar_803;
const TSkolem_3036 = TSkolem_804;
const TApp_3037 = TApp_805;
const TRow_3038 = TRow_806;
const TBot_3039 = TBot_807;
const TForall_3040 = TForall_808;
const equivBound_3041 = equivBound_823;
const equivType_3042 = equivType_824;
const getAnnCodeLoc_3043 = getAnnCodeLoc_819;
const AnnCodeLoc_3044 = AnnCodeLoc_778;
const printCodeLoc_3045 = printCodeLoc_821;
const exprLoc_3046 = exprLoc_822;
const setAnnCodeLoc_3047 = setAnnCodeLoc_820;
const copyAnn_3048 = copyAnn_816;
const emptyAnn_3049 = emptyAnn_813;
const ImportAll_3050 = ImportAll_812;
const ImportOpen_3051 = ImportOpen_811;
const ImportClosed_3052 = ImportClosed_810;
const Instance_3053 = Instance_800;
const Class_3054 = Class_799;
const ModuleInterface_3055 = ModuleInterface_796;
const Module_3056 = Module_795;
const PData_3057 = PData_794;
const PConst_3058 = PConst_793;
const PVar_3059 = PVar_792;
const CStr_3060 = CStr_791;
const CNum_3061 = CNum_790;
const AnnExport_3062 = AnnExport_782;
const AnnTag_3063 = AnnTag_781;
const AnnData_3064 = AnnData_780;
const AnnUseCount_3065 = AnnUseCount_779;
const skolemize_3066 = skolemize_2105;
const mkConFun_3069 = tag_3093 => dt_3094 => vs_3095 => n_3096 => ts_3097 => {
  const nts_3098 = (map(it_3104 => (Pair_2912("$_"+(intToString(fst_2926(it_3104)))))(snd_2916(it_3104))))(zipWithIndex_2982(ts_3097));
  const new_3099 = (setType_3028(dt_3094))(((New_3006(emptyAnn_3049))(n_3096))((map(nt_3105 => (Var_3021(emptyAnn_3049))(fst_2926(nt_3105))))(nts_3098)));
  const mkCon_3100 = r_3106 => nt_3107 => {
    let $phi$380;
    if((true&&true)&&true){
      $phi$380 = ((setType_3028(((TApp_3037(emptyAnn_3049))(((TApp_3037(emptyAnn_3049))((TConst_3034(emptyAnn_3049))("->")))(nt_3107.$1)))(getType_3024(r_3106))))(((Lam_3003(emptyAnn_3049))(nt_3107.$0))(r_3106)))
    } else error("pattern match fail",nt_3107);
    return $phi$380
  };
  const con_3101 = ((foldr(mkCon_3100))(new_3099))(nts_3098);
  const conT_3102 = (((TForall_3040(emptyAnn_3049))(vs_3095))([]))(getType_3024(con_3101));
  const ann_3103 = ((((setAnn_3026($instance_515))($instance_460))("export"))(AnnExport_3062(n_3096)))(((((setAnn_3026($instance_515))($instance_460))("type"))(AnnType_3017(conT_3102)))(((((setAnn_3026($instance_515))($instance_460))("data"))(AnnData_3064(tag_3093)))(emptyAnn_3049)));
  return (Pair_2912(n_3096))(skolemize_3066((withAnn_3025(ann_3103))(con_3101)))
};
const rewriteData_3068 = d_3078 => {
  let $phi$381;
  if((((true&&true)&&true)&&true)&&true){
    const dt_3083 = ((foldl(r_3085 => v_3086 => ((TApp_3037(emptyAnn_3049))(r_3085))((TVar_3035(emptyAnn_3049))(v_3086))))((TConst_3034(emptyAnn_3049))(d_3078.$1)))(d_3078.$2);
    const rewriteCon_3084 = c_3087 => {
      let $phi$382;
      const $phi$383 = length(d_3078.$3);
      if(1==$phi$383){
        $phi$382 = Nothing_2919
      } else if(true){
        $phi$382 = (Just_2918(fst_2926(c_3087)))
      } else error("pattern match fail",$phi$383);
      const tag_3088 = $phi$382;
      let $phi$384;
      const $phi$385 = snd_2916(c_3087);
      if(((true&&true)&&true)&&true){
        $phi$384 = (((((mkConFun_3069(tag_3088))(dt_3083))(d_3078.$2))($phi$385.$1))($phi$385.$2))
      } else error("pattern match fail",$phi$385);
      return $phi$384
    };
    $phi$381 = ((map(rewriteCon_3084))(zipWithIndex_2982(d_3078.$3)))
  } else error("pattern match fail",d_3078);
  return $phi$381
};
const translateAdts_3067 = m_3070 => {
  let $phi$386;
  if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
    $phi$386 = (((((((Module_3056(m_3070.$0))(m_3070.$1))(m_3070.$2))([]))(m_3070.$4))(m_3070.$5))((concat((concatMap_2979(rewriteData_3068))(m_3070.$3)))(m_3070.$6)))
  } else error("pattern match fail",m_3070);
  return $phi$386
};
const assert_3110 = assert_90;
const Pair_3111 = Pair_3;
const mapSnd_3112 = mapSnd_89;
const mapFst_3113 = mapFst_88;
const $gt$eq$gt_3114 = $gt$eq$gt_87;
const snd_3115 = snd_27;
const debug2_3116 = debug2_86;
const Just_3117 = Just_1;
const Nothing_3118 = Nothing_2;
const isJust_3119 = isJust_25;
const Empty_3120 = Empty_11;
const Leaf_3121 = Leaf_12;
const Collision_3122 = Collision_13;
const BitmapIndexed_3123 = BitmapIndexed_14;
const $_3124 = $_16;
const fst_3125 = fst_26;
const Left_3126 = Left_8;
const Right_3127 = Right_9;
const loop_3128 = loop_31;
const find_3129 = find_33;
const hamtMask_3130 = hamtMask_62;
const popCount_3131 = popCount_61;
const hamtIndex_3132 = hamtIndex_63;
const lookup_3133 = lookup_64;
const setContains_3134 = setContains_81;
const foldTrie_3135 = foldTrie_70;
const emptySet_3136 = emptySet_77;
const Unit_3137 = Unit_0;
const not_3138 = not_30;
const $div$eq_3139 = $div$eq_17;
const mapIx_3140 = mapIx_34;
const insert_3141 = insert_65;
const setAdd_3142 = setAdd_78;
const setIntersection_3143 = setIntersection_85;
const remove_3144 = remove_67;
const setDiff_3145 = setDiff_84;
const setToArray_3146 = setToArray_83;
const mergeTrie_3147 = mergeTrie_74;
const setUnion_3148 = setUnion_82;
const setRemove_3149 = setRemove_80;
const setAddAll_3150 = setAddAll_79;
const trieEntries_3151 = trieEntries_76;
const trieKeys_3152 = trieKeys_75;
const size_3153 = size_72;
const mapTrie_3154 = mapTrie_71;
const nodeMask_3155 = nodeMask_60;
const isEmpty_3156 = isEmpty_73;
const filterTrie_3157 = filterTrie_69;
const nextSetBitMask_3158 = nextSetBitMask_68;
const updateOrSet_3159 = updateOrSet_66;
const State_3160 = State_10;
const runState_3161 = runState_58;
const evalState_3162 = evalState_59;
const sets_3163 = sets_57;
const gets_3164 = gets_56;
const foldM_3165 = foldM_53;
const mapM_3166 = mapM_54;
const forM_3167 = forM_55;
const strToArray_3168 = strToArray_52;
const toRecord_3169 = toRecord_51;
const reverse_3170 = reverse_50;
const tail_3171 = tail_45;
const head_3172 = head_44;
const uniq_3173 = uniq_49;
const mergeSet_3174 = mergeSet_48;
const init_3175 = init_47;
const last_3176 = last_46;
const mapJust_3177 = mapJust_43;
const concatMap_3178 = concatMap_42;
const zip_3179 = zip_41;
const zipWithIndex2_3180 = zipWithIndex2_39;
const zipWithIndex_3181 = zipWithIndex_40;
const join_3182 = join_38;
const all_3183 = all_37;
const exists_3184 = exists_36;
const containsChar_3185 = containsChar_35;
const contains_3186 = contains_32;
const either_3187 = either_28;
const splitEither_3188 = splitEither_29;
const fromJust_3189 = fromJust_24;
const justOr_3190 = justOr_23;
const maybe_3191 = maybe_22;
const $gt$gt_3192 = $gt$gt_21;
const $gt$eq_3193 = $gt$eq_20;
const $lt$eq_3194 = $lt$eq_19;
const $gt_3195 = $gt_18;
const Identity_3196 = Identity_15;
const Tuple6_3197 = Tuple6_7;
const Tuple5_3198 = Tuple5_6;
const Tuple4_3199 = Tuple4_5;
const Tuple3_3200 = Tuple3_4;
const App_3201 = App_785;
const Lam_3202 = Lam_786;
const Case_3203 = Case_787;
const Let_3204 = Let_788;
const New_3205 = New_789;
const breakableDownAndUpM_3206 = breakableDownAndUpM_836;
const breakableDownM_3207 = breakableDownM_840;
const downAndUpM_3208 = downAndUpM_837;
const downM_3209 = downM_839;
const upM_3210 = upM_838;
const breakableDownAndUp_3211 = breakableDownAndUp_831;
const breakableDown_3212 = breakableDown_835;
const downAndUp_3213 = downAndUp_832;
const down_3214 = down_834;
const up_3215 = up_833;
const AnnType_3216 = AnnType_777;
const TUnknown_3217 = TUnknown_809;
const getAnn_3218 = getAnn_814;
const getAnnType_3219 = getAnnType_817;
const Var_3220 = Var_783;
const Const_3221 = Const_784;
const annOf_3222 = annOf_828;
const getType_3223 = getType_830;
const withAnn_3224 = withAnn_829;
const setAnn_3225 = setAnn_815;
const setAnnType_3226 = setAnnType_818;
const setType_3227 = setType_827;
const Data_3228 = Data_797;
const DataCon_3229 = DataCon_798;
const dataConName_3230 = dataConName_825;
const dataConNames_3231 = dataConNames_826;
const TCBound_3232 = TCBound_801;
const TConst_3233 = TConst_802;
const TVar_3234 = TVar_803;
const TSkolem_3235 = TSkolem_804;
const TApp_3236 = TApp_805;
const TRow_3237 = TRow_806;
const TBot_3238 = TBot_807;
const TForall_3239 = TForall_808;
const equivBound_3240 = equivBound_823;
const equivType_3241 = equivType_824;
const getAnnCodeLoc_3242 = getAnnCodeLoc_819;
const AnnCodeLoc_3243 = AnnCodeLoc_778;
const printCodeLoc_3244 = printCodeLoc_821;
const exprLoc_3245 = exprLoc_822;
const setAnnCodeLoc_3246 = setAnnCodeLoc_820;
const copyAnn_3247 = copyAnn_816;
const emptyAnn_3248 = emptyAnn_813;
const ImportAll_3249 = ImportAll_812;
const ImportOpen_3250 = ImportOpen_811;
const ImportClosed_3251 = ImportClosed_810;
const Instance_3252 = Instance_800;
const Class_3253 = Class_799;
const ModuleInterface_3254 = ModuleInterface_796;
const Module_3255 = Module_795;
const PData_3256 = PData_794;
const PConst_3257 = PConst_793;
const PVar_3258 = PVar_792;
const CStr_3259 = CStr_791;
const CNum_3260 = CNum_790;
const AnnExport_3261 = AnnExport_782;
const AnnTag_3262 = AnnTag_781;
const AnnData_3263 = AnnData_780;
const AnnUseCount_3264 = AnnUseCount_779;
const getUid_3265 = getUid_1557;
const setUid_3266 = setUid_1558;
const getExports_3267 = getExports_1555;
const newIdent_3268 = n_3275 => (($gt$gt$eq($instance_511))(gets_3164))(i_3276 => (($gt$gt_3192($instance_511))(sets_3163(i_3276+1)))((ret($instance_511))((n_3275+"_")+(intToString(i_3276)))));
const rewriteExpr_3269 = env_3277 => e_3278 => {
  const rename_3279 = n_3283 => newIdent_3268(n_3283);
  const renamePat_3280 = p_3284 => {
    let $phi$387;
    if(((p_3284.$tag==1)&&true)&&true){
      $phi$387 = ((ret($instance_511))((Pair_3111(p_3284))(empty)))
    } else if(((p_3284.$tag==0)&&true)&&true){
      $phi$387 = ((($gt$gt$eq($instance_511))(rename_3279(p_3284.$1)))(n_3289 => (ret($instance_511))((Pair_3111((PVar_3258(p_3284.$0))(n_3289)))(((set(p_3284.$1))(n_3289))(empty)))))
    } else if((((p_3284.$tag==2)&&true)&&true)&&true){
      $phi$387 = ((($gt$gt$eq($instance_511))(((mapM_3166($instance_511))(renamePat_3280))(p_3284.$2)))(ps_3293 => {
        let $phi$388;
        const $phi$389 = (has(p_3284.$1))(env_3277);
        if(!$phi$389){
          $phi$388 = ((ret($instance_511))((Pair_3111(((PData_3256(p_3284.$0))(p_3284.$1))((map(fst_3125))(ps_3293))))(((foldl(merge))(empty))((map(snd_3115))(ps_3293)))))
        } else if($phi$389){
          $phi$388 = ((ret($instance_511))((Pair_3111(((PData_3256(p_3284.$0))((get(p_3284.$1))(env_3277)))((map(fst_3125))(ps_3293))))(((foldl(merge))(empty))((map(snd_3115))(ps_3293)))))
        } else error("pattern match fail",$phi$389);
        return $phi$388
      }))
    } else error("pattern match fail",p_3284);
    return $phi$387
  };
  const rewritePat_3281 = p_3294 => {
    let $phi$390;
    if((true&&true)&&true){
      $phi$390 = ((($gt$gt$eq($instance_511))(renamePat_3280(p_3294.$0)))(pe_3297 => {
        let $phi$391;
        if((true&&true)&&true){
          $phi$391 = ((($gt$gt$eq($instance_511))((rewriteExpr_3269((merge(env_3277))(pe_3297.$1)))(p_3294.$1)))(e_3300 => (ret($instance_511))((Pair_3111(pe_3297.$0))(e_3300))))
        } else error("pattern match fail",pe_3297);
        return $phi$391
      }))
    } else error("pattern match fail",p_3294);
    return $phi$390
  };
  const f_3282 = e_3301 => {
    let $phi$392;
    if((((e_3301.$tag==3)&&true)&&true)&&true){
      $phi$392 = ((($gt$gt$eq($instance_511))(rename_3279(e_3301.$1)))(n_3305 => (($gt$gt$eq($instance_511))((rewriteExpr_3269(((set(e_3301.$1))(n_3305))(env_3277)))(e_3301.$2)))(e_3306 => (ret($instance_511))(Right_3127(((Lam_3202(e_3301.$0))(n_3305))(e_3306))))))
    } else if((((e_3301.$tag==5)&&true)&&true)&&true){
      $phi$392 = ((($gt$gt$eq($instance_511))((rewriteBindings_3271(env_3277))(e_3301.$1)))(ebs_3310 => {
        let $phi$397;
        if((true&&true)&&true){
          $phi$397 = ((($gt$gt$eq($instance_511))((rewriteExpr_3269(ebs_3310.$0))(e_3301.$2)))(e_3313 => (ret($instance_511))(Right_3127(((Let_3204(e_3301.$0))(ebs_3310.$1))(e_3313)))))
        } else error("pattern match fail",ebs_3310);
        return $phi$397
      }))
    } else if((((e_3301.$tag==4)&&true)&&true)&&true){
      $phi$392 = ((($gt$gt$eq($instance_511))((rewriteExpr_3269(env_3277))(e_3301.$1)))(e_3317 => (($gt$gt$eq($instance_511))(((mapM_3166($instance_511))(rewritePat_3281))(e_3301.$2)))(ps_3318 => (ret($instance_511))(Right_3127(((Case_3203(e_3301.$0))(e_3317))(ps_3318))))))
    } else if(((e_3301.$tag==0)&&true)&&true){
      let $phi$395;
      const $phi$396 = (has(e_3301.$1))(env_3277);
      if($phi$396){
        $phi$395 = ((ret($instance_511))(Left_3126((Var_3220(e_3301.$0))((get(e_3301.$1))(env_3277)))))
      } else if(!$phi$396){
        $phi$395 = ((ret($instance_511))(Left_3126(e_3301)))
      } else error("pattern match fail",$phi$396);
      $phi$392 = $phi$395
    } else if((((e_3301.$tag==6)&&true)&&true)&&true){
      let $phi$393;
      const $phi$394 = (has(e_3301.$1))(env_3277);
      if($phi$394){
        $phi$393 = ((ret($instance_511))(Left_3126(((New_3205(e_3301.$0))((get(e_3301.$1))(env_3277)))(e_3301.$2))))
      } else if(!$phi$394){
        $phi$393 = ((ret($instance_511))(Left_3126(e_3301)))
      } else error("pattern match fail",$phi$394);
      $phi$392 = $phi$393
    } else if(true){
      $phi$392 = ((ret($instance_511))(Left_3126(e_3301)))
    } else error("pattern match fail",e_3301);
    return $phi$392
  };
  return ((breakableDownM_3207($instance_511))(f_3282))(e_3278)
};
const rewriteBindings_3271 = env_3338 => bs_3339 => {
  const ns_3340 = (map(fst_3125))(bs_3339);
  const ns2_3341 = ((mapM_3166($instance_511))(newIdent_3268))(ns_3340);
  return (($gt$gt$eq($instance_511))(ns2_3341))(ns_3342 => {
    const env2_3343 = (merge(env_3338))(toRecord_3169((zip_3179((map(fst_3125))(bs_3339)))(ns_3342)));
    const bs2_3344 = ((mapM_3166($instance_511))(rewriteExpr_3269(env2_3343)))((map(snd_3115))(bs_3339));
    return (($gt$gt$eq($instance_511))(bs2_3344))(bs_3345 => (ret($instance_511))((Pair_3111(env2_3343))((zip_3179(ns_3342))(bs_3345))))
  })
};
const rewriteInstance_3270 = env_3325 => i_3326 => {
  let $phi$398;
  if((true&&true)&&((((true&&true)&&true)&&true)&&true)){
    $phi$398 = ((($gt$gt$eq($instance_511))(((mapM_3166($instance_511))(d_3332 => {
      let $phi$399;
      if((true&&true)&&true){
        $phi$399 = ((($gt$gt$eq($instance_511))((rewriteExpr_3269(env_3325))(d_3332.$1)))(e_3335 => (ret($instance_511))((Pair_3111(d_3332.$0))(e_3335))))
      } else error("pattern match fail",d_3332);
      return $phi$399
    }))(i_3326.$1.$3)))(bs_3336 => (($gt$gt$eq($instance_511))(newIdent_3268("$instance")))(insName_3337 => (ret($instance_511))((Pair_3111(insName_3337))((((Instance_3252(i_3326.$1.$0))(i_3326.$1.$1))(i_3326.$1.$2))(bs_3336))))))
  } else error("pattern match fail",i_3326);
  return $phi$398
};
const renameImport_3272 = er_3346 => i_3347 => {
  let $phi$400;
  if((true&&true)&&true){
    let $phi$401;
    if((((i_3347.$tag==1)&&true)&&("./builtins.js"==i_3347.$1))&&true){
      $phi$401 = ((ret($instance_511))((Pair_3111(er_3346.$0))((push(i_3347))(er_3346.$1))))
    } else if((((i_3347.$tag==1)&&true)&&true)&&true){
      const rename_3355 = er_3356 => p_3357 => {
        let $phi$402;
        if((true&&true)&&true){
          let $phi$403;
          if((true&&true)&&true){
            $phi$403 = ((($gt$gt$eq($instance_511))(newIdent_3268(p_3357.$1)))(n_3362 => (ret($instance_511))((Pair_3111(((set(p_3357.$1))(n_3362))(er_3356.$0)))((push((Pair_3111(p_3357.$0))(n_3362)))(er_3356.$1)))))
          } else error("pattern match fail",p_3357);
          $phi$402 = $phi$403
        } else error("pattern match fail",er_3356);
        return $phi$402
      };
      $phi$401 = ((($gt$gt$eq($instance_511))((((foldM_3165($instance_511))(rename_3355))((Pair_3111(er_3346.$0))([])))(i_3347.$2)))(ens_3363 => {
        let $phi$404;
        if((true&&true)&&true){
          $phi$404 = ((ret($instance_511))((Pair_3111(ens_3363.$0))((push(((ImportOpen_3250(i_3347.$0))(i_3347.$1))(ens_3363.$1)))(er_3346.$1))))
        } else error("pattern match fail",ens_3363);
        return $phi$404
      }))
    } else error("pattern match fail",i_3347);
    $phi$400 = $phi$401
  } else error("pattern match fail",er_3346);
  return $phi$400
};
const rewriteModule_3273 = ms_3366 => m_3367 => {
  let $phi$405;
  if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
    $phi$405 = ((($gt$gt$eq($instance_511))((((foldM_3165($instance_511))(renameImport_3272))((Pair_3111(empty))([])))(m_3367.$2)))(eis_3375 => {
      let $phi$406;
      if((true&&true)&&true){
        $phi$406 = ((($gt$gt$eq($instance_511))((rewriteBindings_3271(eis_3375.$0))(m_3367.$6)))(ebs_3378 => {
          let $phi$407;
          if((true&&true)&&true){
            $phi$407 = ((($gt$gt$eq($instance_511))(((mapM_3166($instance_511))(rewriteInstance_3270(ebs_3378.$0)))(m_3367.$5)))(ins_3381 => (ret($instance_511))(((((((Module_3255(m_3367.$0))(m_3367.$1))(eis_3375.$1))(m_3367.$3))(m_3367.$4))(ins_3381))(ebs_3378.$1))))
          } else error("pattern match fail",ebs_3378);
          return $phi$407
        }))
      } else error("pattern match fail",eis_3375);
      return $phi$406
    }))
  } else error("pattern match fail",m_3367);
  return $phi$405
};
const uniquify_3274 = m_3382 => (($gt$gt$eq($instance_511))(getUid_3265))(uid_3383 => (($gt$gt$eq($instance_511))(getExports_3267))(ex_3384 => {
  const r_3385 = (runState_3161(uid_3383))((rewriteModule_3273(ex_3384))(m_3382));
  return (($gt$gt_3192($instance_511))(setUid_3266(fst_3125(r_3385))))((ret($instance_511))(snd_3115(r_3385)))
}));
const assert_3386 = assert_90;
const Pair_3387 = Pair_3;
const mapSnd_3388 = mapSnd_89;
const mapFst_3389 = mapFst_88;
const $gt$eq$gt_3390 = $gt$eq$gt_87;
const snd_3391 = snd_27;
const debug2_3392 = debug2_86;
const Just_3393 = Just_1;
const Nothing_3394 = Nothing_2;
const isJust_3395 = isJust_25;
const Empty_3396 = Empty_11;
const Leaf_3397 = Leaf_12;
const Collision_3398 = Collision_13;
const BitmapIndexed_3399 = BitmapIndexed_14;
const $_3400 = $_16;
const fst_3401 = fst_26;
const Left_3402 = Left_8;
const Right_3403 = Right_9;
const loop_3404 = loop_31;
const find_3405 = find_33;
const hamtMask_3406 = hamtMask_62;
const popCount_3407 = popCount_61;
const hamtIndex_3408 = hamtIndex_63;
const lookup_3409 = lookup_64;
const setContains_3410 = setContains_81;
const foldTrie_3411 = foldTrie_70;
const emptySet_3412 = emptySet_77;
const Unit_3413 = Unit_0;
const not_3414 = not_30;
const $div$eq_3415 = $div$eq_17;
const mapIx_3416 = mapIx_34;
const insert_3417 = insert_65;
const setAdd_3418 = setAdd_78;
const setIntersection_3419 = setIntersection_85;
const remove_3420 = remove_67;
const setDiff_3421 = setDiff_84;
const setToArray_3422 = setToArray_83;
const mergeTrie_3423 = mergeTrie_74;
const setUnion_3424 = setUnion_82;
const setRemove_3425 = setRemove_80;
const setAddAll_3426 = setAddAll_79;
const trieEntries_3427 = trieEntries_76;
const trieKeys_3428 = trieKeys_75;
const size_3429 = size_72;
const mapTrie_3430 = mapTrie_71;
const nodeMask_3431 = nodeMask_60;
const isEmpty_3432 = isEmpty_73;
const filterTrie_3433 = filterTrie_69;
const nextSetBitMask_3434 = nextSetBitMask_68;
const updateOrSet_3435 = updateOrSet_66;
const State_3436 = State_10;
const runState_3437 = runState_58;
const evalState_3438 = evalState_59;
const sets_3439 = sets_57;
const gets_3440 = gets_56;
const foldM_3441 = foldM_53;
const mapM_3442 = mapM_54;
const forM_3443 = forM_55;
const strToArray_3444 = strToArray_52;
const toRecord_3445 = toRecord_51;
const reverse_3446 = reverse_50;
const tail_3447 = tail_45;
const head_3448 = head_44;
const uniq_3449 = uniq_49;
const mergeSet_3450 = mergeSet_48;
const init_3451 = init_47;
const last_3452 = last_46;
const mapJust_3453 = mapJust_43;
const concatMap_3454 = concatMap_42;
const zip_3455 = zip_41;
const zipWithIndex2_3456 = zipWithIndex2_39;
const zipWithIndex_3457 = zipWithIndex_40;
const join_3458 = join_38;
const all_3459 = all_37;
const exists_3460 = exists_36;
const containsChar_3461 = containsChar_35;
const contains_3462 = contains_32;
const either_3463 = either_28;
const splitEither_3464 = splitEither_29;
const fromJust_3465 = fromJust_24;
const justOr_3466 = justOr_23;
const maybe_3467 = maybe_22;
const $gt$gt_3468 = $gt$gt_21;
const $gt$eq_3469 = $gt$eq_20;
const $lt$eq_3470 = $lt$eq_19;
const $gt_3471 = $gt_18;
const Identity_3472 = Identity_15;
const Tuple6_3473 = Tuple6_7;
const Tuple5_3474 = Tuple5_6;
const Tuple4_3475 = Tuple4_5;
const Tuple3_3476 = Tuple3_4;
const App_3477 = App_785;
const Lam_3478 = Lam_786;
const Case_3479 = Case_787;
const Let_3480 = Let_788;
const New_3481 = New_789;
const breakableDownAndUpM_3482 = breakableDownAndUpM_836;
const breakableDownM_3483 = breakableDownM_840;
const downAndUpM_3484 = downAndUpM_837;
const downM_3485 = downM_839;
const upM_3486 = upM_838;
const breakableDownAndUp_3487 = breakableDownAndUp_831;
const breakableDown_3488 = breakableDown_835;
const downAndUp_3489 = downAndUp_832;
const down_3490 = down_834;
const up_3491 = up_833;
const AnnType_3492 = AnnType_777;
const TUnknown_3493 = TUnknown_809;
const getAnn_3494 = getAnn_814;
const getAnnType_3495 = getAnnType_817;
const Var_3496 = Var_783;
const Const_3497 = Const_784;
const annOf_3498 = annOf_828;
const getType_3499 = getType_830;
const withAnn_3500 = withAnn_829;
const setAnn_3501 = setAnn_815;
const setAnnType_3502 = setAnnType_818;
const setType_3503 = setType_827;
const Data_3504 = Data_797;
const DataCon_3505 = DataCon_798;
const dataConName_3506 = dataConName_825;
const dataConNames_3507 = dataConNames_826;
const TCBound_3508 = TCBound_801;
const TConst_3509 = TConst_802;
const TVar_3510 = TVar_803;
const TSkolem_3511 = TSkolem_804;
const TApp_3512 = TApp_805;
const TRow_3513 = TRow_806;
const TBot_3514 = TBot_807;
const TForall_3515 = TForall_808;
const equivBound_3516 = equivBound_823;
const equivType_3517 = equivType_824;
const getAnnCodeLoc_3518 = getAnnCodeLoc_819;
const AnnCodeLoc_3519 = AnnCodeLoc_778;
const printCodeLoc_3520 = printCodeLoc_821;
const exprLoc_3521 = exprLoc_822;
const setAnnCodeLoc_3522 = setAnnCodeLoc_820;
const copyAnn_3523 = copyAnn_816;
const emptyAnn_3524 = emptyAnn_813;
const ImportAll_3525 = ImportAll_812;
const ImportOpen_3526 = ImportOpen_811;
const ImportClosed_3527 = ImportClosed_810;
const Instance_3528 = Instance_800;
const Class_3529 = Class_799;
const ModuleInterface_3530 = ModuleInterface_796;
const Module_3531 = Module_795;
const PData_3532 = PData_794;
const PConst_3533 = PConst_793;
const PVar_3534 = PVar_792;
const CStr_3535 = CStr_791;
const CNum_3536 = CNum_790;
const AnnExport_3537 = AnnExport_782;
const AnnTag_3538 = AnnTag_781;
const AnnData_3539 = AnnData_780;
const AnnUseCount_3540 = AnnUseCount_779;
const reallyPrintExpr_3541 = reallyPrintExpr_1774;
const renameExpr_3542 = rewriteExpr_3269;
const getUid_3543 = getUid_1557;
const setUid_3544 = setUid_1558;
const mergeCount_3547 = local$instance$Hashable$1 => local$instance$Eq$0 => a_3582 => b_3583 => ((foldTrie_3411(a_3584 => k_3585 => v_3586 => ((((insert_3417(local$instance$Hashable$1))(local$instance$Eq$0))(k_3585))(v_3586+((justOr_3466(0))((((lookup_3409(local$instance$Hashable$1))(local$instance$Eq$0))(k_3585))(a_3584)))))(a_3584)))(a_3582))(b_3583);
const getCount_3546 = e_3580 => {
  let $phi$408;
  const $phi$409 = (((getAnn_3494($instance_515))($instance_460))("useCount"))(annOf_3498(e_3580));
  if(($phi$409.$tag==0)&&(($phi$409.$0.$tag==2)&&true)){
    $phi$408 = $phi$409.$0.$0
  } else error("pattern match fail",$phi$409);
  return $phi$408
};
const annWithUseCount_3548 = e_3587 => {
  const dropCount_3588 = local$instance$Hashable$1 => local$instance$Eq$0 => n_3592 => c_3593 => (((remove_3420(local$instance$Hashable$1))(local$instance$Eq$0))(n_3592))(c_3593);
  const countPat_3590 = c_3597 => p_3598 => {
    let $phi$410;
    if(((p_3598.$tag==0)&&true)&&true){
      $phi$410 = ((((dropCount_3588($instance_515))($instance_460))(p_3598.$1))(c_3597))
    } else if((((p_3598.$tag==2)&&true)&&true)&&true){
      $phi$410 = (((foldl(countPat_3590))(c_3597))(p_3598.$2))
    } else if(true){
      $phi$410 = c_3597
    } else error("pattern match fail",p_3598);
    return $phi$410
  };
  const countCase_3589 = pe_3594 => {
    let $phi$411;
    if((true&&true)&&true){
      $phi$411 = ((countPat_3590(getCount_3546(pe_3594.$1)))(pe_3594.$0))
    } else error("pattern match fail",pe_3594);
    return $phi$411
  };
  const countExpr_3591 = e_3605 => {
    let $phi$412;
    if(((e_3605.$tag==0)&&true)&&true){
      $phi$412 = (((((insert_3417($instance_515))($instance_460))(e_3605.$1))(1))(Empty_3396))
    } else if((((e_3605.$tag==2)&&true)&&true)&&true){
      $phi$412 = ((((mergeCount_3547($instance_515))($instance_460))(getCount_3546(e_3605.$1)))(getCount_3546(e_3605.$2)))
    } else if((((e_3605.$tag==3)&&true)&&true)&&true){
      $phi$412 = ((((dropCount_3588($instance_515))($instance_460))(e_3605.$1))(getCount_3546(e_3605.$2)))
    } else if((((e_3605.$tag==5)&&true)&&true)&&true){
      $phi$412 = (((foldl(c_3617 => n_3618 => (((dropCount_3588($instance_515))($instance_460))(n_3618))(c_3617)))(((foldl(c_3619 => e_3620 => (((mergeCount_3547($instance_515))($instance_460))(c_3619))(getCount_3546(e_3620))))(getCount_3546(e_3605.$2)))((map(snd_3391))(e_3605.$1))))((map(fst_3401))(e_3605.$1)))
    } else if((((e_3605.$tag==4)&&true)&&true)&&true){
      $phi$412 = (((foldl((mergeCount_3547($instance_515))($instance_460)))(getCount_3546(e_3605.$1)))((map(countCase_3589))(e_3605.$2)))
    } else if(((e_3605.$tag==1)&&true)&&true){
      $phi$412 = Empty_3396
    } else if((((e_3605.$tag==6)&&true)&&true)&&true){
      $phi$412 = (((foldl((mergeCount_3547($instance_515))($instance_460)))(Empty_3396))((map(getCount_3546))(e_3605.$2)))
    } else error("pattern match fail",e_3605);
    return $phi$412
  };
  return ((up_3491(a_3629 => e_3630 => ($_3400(Pair_3387(a_3629)))((withAnn_3500(((((setAnn_3501($instance_515))($instance_460))("useCount"))(($_3400(AnnUseCount_3540))(countExpr_3591(e_3630))))(annOf_3498(e_3630))))(e_3630))))(Unit_3413))(e_3587)
};
const patSize_3556 = p_3698 => {
  let $phi$413;
  if(((p_3698.$tag==0)&&true)&&true){
    $phi$413 = 1
  } else if(((p_3698.$tag==1)&&true)&&true){
    $phi$413 = 1
  } else if((((p_3698.$tag==2)&&true)&&true)&&true){
    $phi$413 = (((foldl(c_3706 => p_3707 => c_3706+(patSize_3556(p_3707))))(1))(p_3698.$2))
  } else error("pattern match fail",p_3698);
  return $phi$413
};
const exprSize_3555 = e_3670 => {
  let $phi$414;
  if(((e_3670.$tag==0)&&true)&&true){
    $phi$414 = 1
  } else if(((e_3670.$tag==1)&&true)&&true){
    $phi$414 = 1
  } else if((((e_3670.$tag==2)&&true)&&true)&&true){
    $phi$414 = ((1+(exprSize_3555(e_3670.$1)))+(exprSize_3555(e_3670.$2)))
  } else if((((e_3670.$tag==3)&&true)&&true)&&true){
    $phi$414 = (1+(exprSize_3555(e_3670.$2)))
  } else if((((e_3670.$tag==4)&&true)&&true)&&true){
    $phi$414 = (1+(((foldl(c_3684 => p_3685 => {
      let $phi$415;
      if((true&&true)&&true){
        $phi$415 = ((c_3684+(patSize_3556(p_3685.$0)))+(exprSize_3555(p_3685.$1)))
      } else error("pattern match fail",p_3685);
      return $phi$415
    }))(exprSize_3555(e_3670.$1)))(e_3670.$2)))
  } else if((((e_3670.$tag==5)&&true)&&true)&&true){
    $phi$414 = (1+(((foldl(c_3691 => b_3692 => c_3691+(exprSize_3555(snd_3391(b_3692)))))(exprSize_3555(e_3670.$2)))(e_3670.$1)))
  } else if((((e_3670.$tag==6)&&true)&&true)&&true){
    $phi$414 = (((foldl(c_3696 => e_3697 => c_3696+(exprSize_3555(e_3697))))(1))(e_3670.$2))
  } else error("pattern match fail",e_3670);
  return $phi$414
};
const chooseForInlining_3557 = baseCount_3708 => bs_3709 => {
  const useCount_3710 = ((foldl((mergeCount_3547($instance_515))($instance_460)))(baseCount_3708))((map(b_3712 => getCount_3546(snd_3391(b_3712))))(bs_3709));
  const f_3711 = r_3713 => b_3714 => {
    let $phi$416;
    if((true&&true)&&true){
      let $phi$417;
      if(((b_3714.$1.$tag==0)&&true)&&true){
        $phi$417 = (((((insert_3417($instance_515))($instance_460))(b_3714.$0))(b_3714.$1))(r_3713))
      } else if(((b_3714.$1.$tag==1)&&true)&&true){
        $phi$417 = (((((insert_3417($instance_515))($instance_460))(b_3714.$0))(b_3714.$1))(r_3713))
      } else if((((b_3714.$1.$tag==3)&&true)&&true)&&true){
        let $phi$420;
        const $phi$421 = ((($lt($instance_461))(exprSize_3555(b_3714.$1)))(10))||((($eq$eq($instance_459))(1))((justOr_3466(0))((((lookup_3409($instance_515))($instance_460))(b_3714.$0))(useCount_3710))));
        if(!$phi$421){
          $phi$420 = r_3713
        } else if($phi$421){
          $phi$420 = (((((insert_3417($instance_515))($instance_460))(b_3714.$0))(b_3714.$1))(r_3713))
        } else error("pattern match fail",$phi$421);
        $phi$417 = $phi$420
      } else if((((b_3714.$1.$tag==6)&&true)&&true)&&true){
        let $phi$418;
        const $phi$419 = (($eq$eq($instance_459))(1))((justOr_3466(0))((((lookup_3409($instance_515))($instance_460))(b_3714.$0))(useCount_3710)));
        if(!$phi$419){
          $phi$418 = r_3713
        } else if($phi$419){
          $phi$418 = (((((insert_3417($instance_515))($instance_460))(b_3714.$0))(b_3714.$1))(r_3713))
        } else error("pattern match fail",$phi$419);
        $phi$417 = $phi$418
      } else if(true){
        $phi$417 = r_3713
      } else error("pattern match fail",b_3714.$1);
      $phi$416 = $phi$417
    } else error("pattern match fail",b_3714);
    return $phi$416
  };
  return ((foldl(f_3711))(Empty_3396))(bs_3709)
};
const mapBindingsM_3550 = local$instance$Monad$0 => f_3636 => bs_3637 => ((mapM_3442(local$instance$Monad$0))(b_3638 => {
  let $phi$422;
  if((true&&true)&&true){
    $phi$422 = ((($gt$gt$eq(local$instance$Monad$0))((f_3636(b_3638.$0))(b_3638.$1)))(e_3641 => (ret(local$instance$Monad$0))((Pair_3387(b_3638.$0))(e_3641))))
  } else error("pattern match fail",b_3638);
  return $phi$422
}))(bs_3637);
const inlineCode_3559 = always_3742 => e_3743 => {
  const withAnnCopy_3744 = ann_3747 => e_3748 => (withAnn_3500((((mergeTrie_3423($instance_515))($instance_460))((((remove_3420($instance_515))($instance_460))("export"))(annOf_3498(e_3748))))((((copyAnn_3523($instance_515))($instance_460))(["export"]))(ann_3747))))(e_3748);
  const inlinePat_3746 = p_3770 => {
    let $phi$423;
    if((((p_3770.$tag==2)&&true)&&true)&&true){
      let $phi$424;
      const $phi$425 = (((lookup_3409($instance_515))($instance_460))(p_3770.$1))(always_3742);
      if(($phi$425.$tag==0)&&((($phi$425.$0.$tag==0)&&true)&&true)){
        $phi$424 = (((PData_3532(p_3770.$0))($phi$425.$0.$1))((map(inlinePat_3746))(p_3770.$2)))
      } else if(true){
        $phi$424 = (((PData_3532(p_3770.$0))(p_3770.$1))((map(inlinePat_3746))(p_3770.$2)))
      } else error("pattern match fail",$phi$425);
      $phi$423 = $phi$424
    } else if(true){
      $phi$423 = p_3770
    } else error("pattern match fail",p_3770);
    return $phi$423
  };
  const inlineExpr_3745 = e_3749 => {
    let $phi$426;
    if(((e_3749.$tag==0)&&true)&&true){
      let $phi$430;
      const $phi$431 = (((lookup_3409($instance_515))($instance_460))(e_3749.$1))(always_3742);
      if($phi$431.$tag==1){
        $phi$430 = ((ret($instance_511))(Left_3402(e_3749)))
      } else if(($phi$431.$tag==0)&&true){
        $phi$430 = (((fmap($instance_491))(e_3753 => Left_3402((withAnnCopy_3744(e_3749.$0))(e_3753))))((renameExpr_3542(empty))($phi$431.$0)))
      } else error("pattern match fail",$phi$431);
      $phi$426 = $phi$430
    } else if((((e_3749.$tag==5)&&true)&&true)&&true){
      const always2_3757 = (((mergeTrie_3423($instance_515))($instance_460))(always_3742))((chooseForInlining_3557(getCount_3546(e_3749.$2)))(e_3749.$1));
      $phi$426 = ((($gt$gt$eq($instance_511))(((mapBindingsM_3550($instance_511))(n_3758 => e_3759 => (inlineCode_3559((((remove_3420($instance_515))($instance_460))(n_3758))(always2_3757)))(e_3759)))(e_3749.$1)))(bs_3760 => (($gt$gt$eq($instance_511))((inlineCode_3559(always2_3757))(e_3749.$2)))(e_3761 => {
        let $phi$428;
        const $phi$429 = length(bs_3760);
        if(0==$phi$429){
          $phi$428 = ((ret($instance_511))(Right_3403((withAnnCopy_3744(e_3749.$0))(e_3761))))
        } else if(true){
          $phi$428 = ((ret($instance_511))(Right_3403(((Let_3480(e_3749.$0))(bs_3760))(e_3761))))
        } else error("pattern match fail",$phi$429);
        return $phi$428
      })))
    } else if((((e_3749.$tag==4)&&true)&&true)&&true){
      $phi$426 = ((ret($instance_511))(Left_3402(((Case_3479(e_3749.$0))(e_3749.$1))((map(p_3766 => {
        let $phi$427;
        if((true&&true)&&true){
          $phi$427 = ((Pair_3387(inlinePat_3746(p_3766.$0)))(p_3766.$1))
        } else error("pattern match fail",p_3766);
        return $phi$427
      }))(e_3749.$2)))))
    } else if(true){
      $phi$426 = ((ret($instance_511))(Left_3402(e_3749)))
    } else error("pattern match fail",e_3749);
    return $phi$426
  };
  return ((breakableDownM_3483($instance_511))(inlineExpr_3745))(e_3743)
};
const dropDeadBindings_3560 = useCount_3778 => bs_3779 => {
  const isExport_3780 = e_3782 => isJust_3395((((getAnn_3494($instance_515))($instance_460))("export"))(annOf_3498(e_3782)));
  const f_3781 = b_3783 => {
    let $phi$432;
    if((true&&true)&&true){
      const totalCount_3786 = (justOr_3466(0))((((lookup_3409($instance_515))($instance_460))(b_3783.$0))(useCount_3778));
      const recursiveCount_3787 = (justOr_3466(0))((((lookup_3409($instance_515))($instance_460))(b_3783.$0))(getCount_3546(b_3783.$1)));
      const keep_3788 = (isExport_3780(b_3783.$1))||((($gt_3471($instance_461))(totalCount_3786-recursiveCount_3787))(0));
      let $phi$433;
      if(keep_3788){
        $phi$433 = (Just_3393((Pair_3387(b_3783.$0))(b_3783.$1)))
      } else if(!keep_3788){
        const ann_3789 = annOf_3498(b_3783.$1);
        let $phi$434;
        const $phi$435 = (((getAnn_3494($instance_515))($instance_460))("data"))(ann_3789);
        if($phi$435.$tag==1){
          $phi$434 = Nothing_3394
        } else if(($phi$435.$tag==0)&&true){
          $phi$434 = (Just_3393((Pair_3387(b_3783.$0))((withAnn_3500(((((setAnn_3501($instance_515))($instance_460))("dead"))(AnnTag_3538))(ann_3789)))(b_3783.$1))))
        } else error("pattern match fail",$phi$435);
        $phi$433 = $phi$434
      } else error("pattern match fail",keep_3788);
      $phi$432 = $phi$433
    } else error("pattern match fail",b_3783);
    return $phi$432
  };
  return (mapJust_3453(f_3781))(bs_3779)
};
const deadCode_3554 = e_3658 => {
  const f_3659 = e_3660 => {
    let $phi$436;
    if((((e_3660.$tag==5)&&true)&&true)&&true){
      const useCount_3664 = ((foldl((mergeCount_3547($instance_515))($instance_460)))(getCount_3546(e_3660.$2)))((map(b_3666 => getCount_3546(snd_3391(b_3666))))(e_3660.$1));
      const bs2_3665 = (dropDeadBindings_3560(useCount_3664))(e_3660.$1);
      $phi$436 = (((Let_3480(e_3660.$0))(bs2_3665))(e_3660.$2))
    } else if(true){
      $phi$436 = e_3660
    } else error("pattern match fail",e_3660);
    return $phi$436
  };
  return snd_3391(((down_3490(a_3668 => e_3669 => (Pair_3387(a_3668))(f_3659(e_3669))))(Unit_3413))(e_3658))
};
const betaReduction_3558 = e_3728 => {
  const f_3729 = e_3730 => {
    let $phi$437;
    if((((e_3730.$tag==2)&&true)&&((((e_3730.$1.$tag==3)&&true)&&true)&&true))&&true){
      let $phi$438;
      if(((e_3730.$2.$tag==0)&&true)&&true){
        let $phi$439;
        const $phi$440 = (($eq$eq($instance_460))(e_3730.$1.$1))(e_3730.$2.$1);
        if($phi$440){
          $phi$439 = e_3730.$1.$2
        } else if(!$phi$440){
          $phi$439 = (((Let_3480(e_3730.$0))([(Pair_3387(e_3730.$1.$1))((Var_3496(e_3730.$2.$0))(e_3730.$2.$1))]))(e_3730.$1.$2))
        } else error("pattern match fail",$phi$440);
        $phi$438 = $phi$439
      } else if(true){
        $phi$438 = (((Let_3480(e_3730.$0))([(Pair_3387(e_3730.$1.$1))(e_3730.$2)]))(e_3730.$1.$2))
      } else error("pattern match fail",e_3730.$2);
      $phi$437 = $phi$438
    } else if(true){
      $phi$437 = e_3730
    } else error("pattern match fail",e_3730);
    return $phi$437
  };
  return snd_3391(((down_3490(a_3740 => e_3741 => (Pair_3387(a_3740))(f_3729(e_3741))))(Unit_3413))(e_3728))
};
const mapBindings_3549 = f_3631 => bs_3632 => (map(b_3633 => {
  let $phi$441;
  if((true&&true)&&true){
    $phi$441 = ((Pair_3387(b_3633.$0))(f_3631(b_3633.$1)))
  } else error("pattern match fail",b_3633);
  return $phi$441
}))(bs_3632);
const pass_3552 = bs_3646 => {
  const bs2_3647 = (mapBindings_3549(e_3651 => ($_3400(snd_3391))(annWithUseCount_3548(e_3651))))(bs_3646);
  const useCount_3648 = ((foldl((mergeCount_3547($instance_515))($instance_460)))(Empty_3396))((map(b_3652 => getCount_3546(snd_3391(b_3652))))(bs2_3647));
  const bs3_3649 = (mapBindings_3549(deadCode_3554))((dropDeadBindings_3560(useCount_3648))(bs2_3647));
  const always_3650 = (chooseForInlining_3557(Empty_3396))(bs3_3649);
  return (($gt$gt$eq($instance_511))(((mapBindingsM_3550($instance_511))(n_3653 => e_3654 => (inlineCode_3559((((remove_3420($instance_515))($instance_460))(n_3653))(always_3650)))(e_3654)))(bs3_3649)))(bs_3655 => (ret($instance_511))((mapBindings_3549(betaReduction_3558))(bs_3655)))
};
const processImports_3553 = useCount_3656 => is_3657 => is_3657;
const loopPasses_3551 = local$instance$Monad$0 => n_3642 => p_3643 => bs_3644 => {
  let $phi$442;
  if(0==n_3642){
    $phi$442 = ((ret(local$instance$Monad$0))(bs_3644))
  } else if(true){
    $phi$442 = ((($gt$gt$eq(local$instance$Monad$0))(p_3643(bs_3644)))(((loopPasses_3551(local$instance$Monad$0))(n_3642-1))(p_3643)))
  } else error("pattern match fail",n_3642);
  return $phi$442
};
const inline_3545 = enable_3561 => m_3562 => (($gt$gt$eq($instance_511))(getUid_3543))(uid_3563 => {
  let $phi$443;
  if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
    let $phi$444;
    if(enable_3561){
      $phi$444 = 10
    } else if(!enable_3561){
      $phi$444 = 0
    } else error("pattern match fail",enable_3561);
    const iterCount_3571 = $phi$444;
    const r_3572 = (runState_3437(uid_3563))((((loopPasses_3551($instance_511))(iterCount_3571))(pass_3552))(m_3562.$6));
    const bs2_3573 = snd_3391(r_3572);
    const bs3_3575 = (mapBindings_3549(e_3578 => ($_3400(snd_3391))(annWithUseCount_3548(e_3578))))(bs2_3573);
    const useCount_3576 = ((foldl((mergeCount_3547($instance_515))($instance_460)))(Empty_3396))((map(b_3579 => getCount_3546(snd_3391(b_3579))))(bs3_3575));
    const is2_3577 = (processImports_3553(useCount_3576))(m_3562.$2);
    const uid2_3574 = fst_3401(r_3572);
    $phi$443 = ((($gt$gt_3468($instance_511))(setUid_3544(uid2_3574)))((ret($instance_511))(((((((Module_3531(m_3562.$0))(m_3562.$1))(is2_3577))(m_3562.$3))(m_3562.$4))(m_3562.$5))(bs3_3575))))
  } else error("pattern match fail",m_3562);
  return $phi$443
});
const assert_3791 = assert_90;
const Pair_3792 = Pair_3;
const mapSnd_3793 = mapSnd_89;
const mapFst_3794 = mapFst_88;
const $gt$eq$gt_3795 = $gt$eq$gt_87;
const snd_3796 = snd_27;
const debug2_3797 = debug2_86;
const Just_3798 = Just_1;
const Nothing_3799 = Nothing_2;
const isJust_3800 = isJust_25;
const Empty_3801 = Empty_11;
const Leaf_3802 = Leaf_12;
const Collision_3803 = Collision_13;
const BitmapIndexed_3804 = BitmapIndexed_14;
const $_3805 = $_16;
const fst_3806 = fst_26;
const Left_3807 = Left_8;
const Right_3808 = Right_9;
const loop_3809 = loop_31;
const find_3810 = find_33;
const hamtMask_3811 = hamtMask_62;
const popCount_3812 = popCount_61;
const hamtIndex_3813 = hamtIndex_63;
const lookup_3814 = lookup_64;
const setContains_3815 = setContains_81;
const foldTrie_3816 = foldTrie_70;
const emptySet_3817 = emptySet_77;
const Unit_3818 = Unit_0;
const not_3819 = not_30;
const $div$eq_3820 = $div$eq_17;
const mapIx_3821 = mapIx_34;
const insert_3822 = insert_65;
const setAdd_3823 = setAdd_78;
const setIntersection_3824 = setIntersection_85;
const remove_3825 = remove_67;
const setDiff_3826 = setDiff_84;
const setToArray_3827 = setToArray_83;
const mergeTrie_3828 = mergeTrie_74;
const setUnion_3829 = setUnion_82;
const setRemove_3830 = setRemove_80;
const setAddAll_3831 = setAddAll_79;
const trieEntries_3832 = trieEntries_76;
const trieKeys_3833 = trieKeys_75;
const size_3834 = size_72;
const mapTrie_3835 = mapTrie_71;
const nodeMask_3836 = nodeMask_60;
const isEmpty_3837 = isEmpty_73;
const filterTrie_3838 = filterTrie_69;
const nextSetBitMask_3839 = nextSetBitMask_68;
const updateOrSet_3840 = updateOrSet_66;
const State_3841 = State_10;
const runState_3842 = runState_58;
const evalState_3843 = evalState_59;
const sets_3844 = sets_57;
const gets_3845 = gets_56;
const foldM_3846 = foldM_53;
const mapM_3847 = mapM_54;
const forM_3848 = forM_55;
const strToArray_3849 = strToArray_52;
const toRecord_3850 = toRecord_51;
const reverse_3851 = reverse_50;
const tail_3852 = tail_45;
const head_3853 = head_44;
const uniq_3854 = uniq_49;
const mergeSet_3855 = mergeSet_48;
const init_3856 = init_47;
const last_3857 = last_46;
const mapJust_3858 = mapJust_43;
const concatMap_3859 = concatMap_42;
const zip_3860 = zip_41;
const zipWithIndex2_3861 = zipWithIndex2_39;
const zipWithIndex_3862 = zipWithIndex_40;
const join_3863 = join_38;
const all_3864 = all_37;
const exists_3865 = exists_36;
const containsChar_3866 = containsChar_35;
const contains_3867 = contains_32;
const either_3868 = either_28;
const splitEither_3869 = splitEither_29;
const fromJust_3870 = fromJust_24;
const justOr_3871 = justOr_23;
const maybe_3872 = maybe_22;
const $gt$gt_3873 = $gt$gt_21;
const $gt$eq_3874 = $gt$eq_20;
const $lt$eq_3875 = $lt$eq_19;
const $gt_3876 = $gt_18;
const Identity_3877 = Identity_15;
const Tuple6_3878 = Tuple6_7;
const Tuple5_3879 = Tuple5_6;
const Tuple4_3880 = Tuple4_5;
const Tuple3_3881 = Tuple3_4;
const App_3882 = App_785;
const Lam_3883 = Lam_786;
const Case_3884 = Case_787;
const Let_3885 = Let_788;
const New_3886 = New_789;
const breakableDownAndUpM_3887 = breakableDownAndUpM_836;
const breakableDownM_3888 = breakableDownM_840;
const downAndUpM_3889 = downAndUpM_837;
const downM_3890 = downM_839;
const upM_3891 = upM_838;
const breakableDownAndUp_3892 = breakableDownAndUp_831;
const breakableDown_3893 = breakableDown_835;
const downAndUp_3894 = downAndUp_832;
const down_3895 = down_834;
const up_3896 = up_833;
const AnnType_3897 = AnnType_777;
const TUnknown_3898 = TUnknown_809;
const getAnn_3899 = getAnn_814;
const getAnnType_3900 = getAnnType_817;
const Var_3901 = Var_783;
const Const_3902 = Const_784;
const annOf_3903 = annOf_828;
const getType_3904 = getType_830;
const withAnn_3905 = withAnn_829;
const setAnn_3906 = setAnn_815;
const setAnnType_3907 = setAnnType_818;
const setType_3908 = setType_827;
const Data_3909 = Data_797;
const DataCon_3910 = DataCon_798;
const dataConName_3911 = dataConName_825;
const dataConNames_3912 = dataConNames_826;
const TCBound_3913 = TCBound_801;
const TConst_3914 = TConst_802;
const TVar_3915 = TVar_803;
const TSkolem_3916 = TSkolem_804;
const TApp_3917 = TApp_805;
const TRow_3918 = TRow_806;
const TBot_3919 = TBot_807;
const TForall_3920 = TForall_808;
const equivBound_3921 = equivBound_823;
const equivType_3922 = equivType_824;
const getAnnCodeLoc_3923 = getAnnCodeLoc_819;
const AnnCodeLoc_3924 = AnnCodeLoc_778;
const printCodeLoc_3925 = printCodeLoc_821;
const exprLoc_3926 = exprLoc_822;
const setAnnCodeLoc_3927 = setAnnCodeLoc_820;
const copyAnn_3928 = copyAnn_816;
const emptyAnn_3929 = emptyAnn_813;
const ImportAll_3930 = ImportAll_812;
const ImportOpen_3931 = ImportOpen_811;
const ImportClosed_3932 = ImportClosed_810;
const Instance_3933 = Instance_800;
const Class_3934 = Class_799;
const ModuleInterface_3935 = ModuleInterface_796;
const Module_3936 = Module_795;
const PData_3937 = PData_794;
const PConst_3938 = PConst_793;
const PVar_3939 = PVar_792;
const CStr_3940 = CStr_791;
const CNum_3941 = CNum_790;
const AnnExport_3942 = AnnExport_782;
const AnnTag_3943 = AnnTag_781;
const AnnData_3944 = AnnData_780;
const AnnUseCount_3945 = AnnUseCount_779;
const newIdent_3946 = newIdent_3268;
const rewriteExpr_3947 = rewriteExpr_3269;
const importAsBindings_3951 = ens_3984 => dataAnns_3985 => i_3986 => {
  let $phi$445;
  if((((i_3986.$tag==1)&&true)&&("./builtins.js"==i_3986.$1))&&true){
    $phi$445 = ([])
  } else if((((i_3986.$tag==1)&&true)&&true)&&true){
    const f_3992 = p_3993 => {
      let $phi$446;
      if((true&&true)&&true){
        let $phi$447;
        const $phi$448 = (((lookup_3814($instance_515))($instance_460))((i_3986.$1+"#")+p_3993.$0))(ens_3984);
        if(($phi$448.$tag==0)&&true){
          $phi$447 = ((Pair_3792(p_3993.$1))((Var_3901(($_3805(justOr_3871(emptyAnn_3929)))((((lookup_3814($instance_515))($instance_460))($phi$448.$0))(dataAnns_3985))))($phi$448.$0)))
        } else if($phi$448.$tag==1){
          $phi$447 = (error((("mod merger encountered unknown import "+i_3986.$1)+"#")+p_3993.$0))
        } else error("pattern match fail",$phi$448);
        $phi$446 = $phi$447
      } else error("pattern match fail",p_3993);
      return $phi$446
    };
    $phi$445 = ((map(f_3992))((filter(p_3997 => (($div$eq_3820($instance_460))(fst_3806(p_3997)))(snd_3796(p_3997))))(i_3986.$2)))
  } else error("pattern match fail",i_3986);
  return $phi$445
};
const dropExport_3949 = f_3953 => b_3954 => {
  let $phi$449;
  if((true&&true)&&true){
    let $phi$450;
    const $phi$451 = (((getAnn_3899($instance_515))($instance_460))("export"))(annOf_3903(b_3954.$1));
    if($phi$451.$tag==1){
      $phi$450 = ((ret($instance_511))(b_3954))
    } else if(($phi$451.$tag==0)&&(($phi$451.$0.$tag==5)&&true)){
      $phi$450 = ((($gt$gt$eq($instance_511))(gets_3845))(ns_3958 => (($gt$gt_3873($instance_511))(sets_3844(((((insert_3822($instance_515))($instance_460))((f_3953+"#")+$phi$451.$0.$0))(b_3954.$0))(ns_3958))))((ret($instance_511))((Pair_3792(b_3954.$0))((withAnn_3905((((remove_3825($instance_515))($instance_460))("export"))(annOf_3903(b_3954.$1))))(b_3954.$1))))))
    } else error("pattern match fail",$phi$451);
    $phi$449 = $phi$450
  } else error("pattern match fail",b_3954);
  return $phi$449
};
const mergeInto_3950 = a_3959 => b_3960 => {
  let $phi$452;
  if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
    $phi$452 = ((($gt$gt$eq($instance_511))(((mapM_3847($instance_511))(dropExport_3949(a_3959.$1)))(a_3959.$6)))(bs_3968 => (($gt$gt$eq($instance_511))(gets_3845))(ns_3969 => {
      const f_3971 = local$instance$Hashable$1 => local$instance$Eq$0 => r_3972 => b_3973 => {
        let $phi$453;
        if((true&&true)&&true){
          let $phi$454;
          const $phi$455 = (((getAnn_3899($instance_515))($instance_460))("data"))(annOf_3903(b_3973.$1));
          if($phi$455.$tag==1){
            $phi$454 = r_3972
          } else if(($phi$455.$tag==0)&&true){
            $phi$454 = (((((insert_3822(local$instance$Hashable$1))(local$instance$Eq$0))(b_3973.$0))(((((setAnn_3906($instance_515))($instance_460))("data"))($phi$455.$0))(emptyAnn_3929)))(r_3972))
          } else error("pattern match fail",$phi$455);
          $phi$453 = $phi$454
        } else error("pattern match fail",b_3973);
        return $phi$453
      };
      const dataAnns_3970 = ((foldl((f_3971($instance_515))($instance_460)))(Empty_3801))(bs_3968);
      let $phi$456;
      if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
        $phi$456 = ((ret($instance_511))(((((((Module_3936(a_3959.$0))(b_3960.$1))(a_3959.$2))([]))([]))([]))((concat(bs_3968))((concat((concatMap_3859((importAsBindings_3951(ns_3969))(dataAnns_3970)))(b_3960.$2)))(b_3960.$6)))))
      } else error("pattern match fail",b_3960);
      return $phi$456
    })))
  } else error("pattern match fail",a_3959);
  return $phi$452
};
const mergeModules_3948 = ms_3952 => (evalState_3843(Empty_3801))((((foldM_3846($instance_511))(mergeInto_3950))(head_3853(ms_3952)))(tail_3852(ms_3952)));
const assert_3998 = assert_90;
const Pair_3999 = Pair_3;
const mapSnd_4000 = mapSnd_89;
const mapFst_4001 = mapFst_88;
const $gt$eq$gt_4002 = $gt$eq$gt_87;
const snd_4003 = snd_27;
const debug2_4004 = debug2_86;
const Just_4005 = Just_1;
const Nothing_4006 = Nothing_2;
const isJust_4007 = isJust_25;
const Empty_4008 = Empty_11;
const Leaf_4009 = Leaf_12;
const Collision_4010 = Collision_13;
const BitmapIndexed_4011 = BitmapIndexed_14;
const $_4012 = $_16;
const fst_4013 = fst_26;
const Left_4014 = Left_8;
const Right_4015 = Right_9;
const loop_4016 = loop_31;
const find_4017 = find_33;
const hamtMask_4018 = hamtMask_62;
const popCount_4019 = popCount_61;
const hamtIndex_4020 = hamtIndex_63;
const lookup_4021 = lookup_64;
const setContains_4022 = setContains_81;
const foldTrie_4023 = foldTrie_70;
const emptySet_4024 = emptySet_77;
const Unit_4025 = Unit_0;
const not_4026 = not_30;
const $div$eq_4027 = $div$eq_17;
const mapIx_4028 = mapIx_34;
const insert_4029 = insert_65;
const setAdd_4030 = setAdd_78;
const setIntersection_4031 = setIntersection_85;
const remove_4032 = remove_67;
const setDiff_4033 = setDiff_84;
const setToArray_4034 = setToArray_83;
const mergeTrie_4035 = mergeTrie_74;
const setUnion_4036 = setUnion_82;
const setRemove_4037 = setRemove_80;
const setAddAll_4038 = setAddAll_79;
const trieEntries_4039 = trieEntries_76;
const trieKeys_4040 = trieKeys_75;
const size_4041 = size_72;
const mapTrie_4042 = mapTrie_71;
const nodeMask_4043 = nodeMask_60;
const isEmpty_4044 = isEmpty_73;
const filterTrie_4045 = filterTrie_69;
const nextSetBitMask_4046 = nextSetBitMask_68;
const updateOrSet_4047 = updateOrSet_66;
const State_4048 = State_10;
const runState_4049 = runState_58;
const evalState_4050 = evalState_59;
const sets_4051 = sets_57;
const gets_4052 = gets_56;
const foldM_4053 = foldM_53;
const mapM_4054 = mapM_54;
const forM_4055 = forM_55;
const strToArray_4056 = strToArray_52;
const toRecord_4057 = toRecord_51;
const reverse_4058 = reverse_50;
const tail_4059 = tail_45;
const head_4060 = head_44;
const uniq_4061 = uniq_49;
const mergeSet_4062 = mergeSet_48;
const init_4063 = init_47;
const last_4064 = last_46;
const mapJust_4065 = mapJust_43;
const concatMap_4066 = concatMap_42;
const zip_4067 = zip_41;
const zipWithIndex2_4068 = zipWithIndex2_39;
const zipWithIndex_4069 = zipWithIndex_40;
const join_4070 = join_38;
const all_4071 = all_37;
const exists_4072 = exists_36;
const containsChar_4073 = containsChar_35;
const contains_4074 = contains_32;
const either_4075 = either_28;
const splitEither_4076 = splitEither_29;
const fromJust_4077 = fromJust_24;
const justOr_4078 = justOr_23;
const maybe_4079 = maybe_22;
const $gt$gt_4080 = $gt$gt_21;
const $gt$eq_4081 = $gt$eq_20;
const $lt$eq_4082 = $lt$eq_19;
const $gt_4083 = $gt_18;
const Identity_4084 = Identity_15;
const Tuple6_4085 = Tuple6_7;
const Tuple5_4086 = Tuple5_6;
const Tuple4_4087 = Tuple4_5;
const Tuple3_4088 = Tuple3_4;
const App_4089 = App_785;
const Lam_4090 = Lam_786;
const Case_4091 = Case_787;
const Let_4092 = Let_788;
const New_4093 = New_789;
const breakableDownAndUpM_4094 = breakableDownAndUpM_836;
const breakableDownM_4095 = breakableDownM_840;
const downAndUpM_4096 = downAndUpM_837;
const downM_4097 = downM_839;
const upM_4098 = upM_838;
const breakableDownAndUp_4099 = breakableDownAndUp_831;
const breakableDown_4100 = breakableDown_835;
const downAndUp_4101 = downAndUp_832;
const down_4102 = down_834;
const up_4103 = up_833;
const AnnType_4104 = AnnType_777;
const TUnknown_4105 = TUnknown_809;
const getAnn_4106 = getAnn_814;
const getAnnType_4107 = getAnnType_817;
const Var_4108 = Var_783;
const Const_4109 = Const_784;
const annOf_4110 = annOf_828;
const getType_4111 = getType_830;
const withAnn_4112 = withAnn_829;
const setAnn_4113 = setAnn_815;
const setAnnType_4114 = setAnnType_818;
const setType_4115 = setType_827;
const Data_4116 = Data_797;
const DataCon_4117 = DataCon_798;
const dataConName_4118 = dataConName_825;
const dataConNames_4119 = dataConNames_826;
const TCBound_4120 = TCBound_801;
const TConst_4121 = TConst_802;
const TVar_4122 = TVar_803;
const TSkolem_4123 = TSkolem_804;
const TApp_4124 = TApp_805;
const TRow_4125 = TRow_806;
const TBot_4126 = TBot_807;
const TForall_4127 = TForall_808;
const equivBound_4128 = equivBound_823;
const equivType_4129 = equivType_824;
const getAnnCodeLoc_4130 = getAnnCodeLoc_819;
const AnnCodeLoc_4131 = AnnCodeLoc_778;
const printCodeLoc_4132 = printCodeLoc_821;
const exprLoc_4133 = exprLoc_822;
const setAnnCodeLoc_4134 = setAnnCodeLoc_820;
const copyAnn_4135 = copyAnn_816;
const emptyAnn_4136 = emptyAnn_813;
const ImportAll_4137 = ImportAll_812;
const ImportOpen_4138 = ImportOpen_811;
const ImportClosed_4139 = ImportClosed_810;
const Instance_4140 = Instance_800;
const Class_4141 = Class_799;
const ModuleInterface_4142 = ModuleInterface_796;
const Module_4143 = Module_795;
const PData_4144 = PData_794;
const PConst_4145 = PConst_793;
const PVar_4146 = PVar_792;
const CStr_4147 = CStr_791;
const CNum_4148 = CNum_790;
const AnnExport_4149 = AnnExport_782;
const AnnTag_4150 = AnnTag_781;
const AnnData_4151 = AnnData_780;
const AnnUseCount_4152 = AnnUseCount_779;
const freeVars_4153 = freeVars_2112;
const normalize_4155 = ms_4186 => freeVars_4187 => i_4188 => {
  let $phi$457;
  if((((i_4188.$tag==0)&&true)&&true)&&true){
    $phi$457 = (error("closed imports not supported"))
  } else if((((i_4188.$tag==1)&&true)&&true)&&true){
    $phi$457 = i_4188
  } else if(((i_4188.$tag==2)&&true)&&("./builtins.js"==i_4188.$1)){
    let $phi$462;
    const $phi$463 = (get("./builtins.js"))(ms_4186);
    if(((true&&true)&&true)&&true){
      $phi$462 = (((ImportOpen_4138(i_4188.$0))("./builtins.js"))((map(n_4199 => (Pair_3999(n_4199))(n_4199)))(keys($phi$463.$0))))
    } else error("pattern match fail",$phi$463);
    $phi$457 = $phi$462
  } else if(((i_4188.$tag==2)&&true)&&true){
    let $phi$458;
    const $phi$459 = (has(i_4188.$1))(ms_4186);
    if($phi$459){
      let $phi$460;
      const $phi$461 = (get(i_4188.$1))(ms_4186);
      if(((true&&true)&&true)&&true){
        $phi$460 = (((ImportOpen_4138(i_4188.$0))(i_4188.$1))((map(n_4205 => (Pair_3999(n_4205))(n_4205)))(keys($phi$461.$0))))
      } else error("pattern match fail",$phi$461);
      $phi$458 = $phi$460
    } else if(!$phi$459){
      $phi$458 = (error((("no mod "+i_4188.$1)+" in ")+(jsonStringify(keys(ms_4186)))))
    } else error("pattern match fail",$phi$459);
    $phi$457 = $phi$458
  } else error("pattern match fail",i_4188);
  return $phi$457
};
const normalizeImports_4154 = ms_4156 => m_4157 => {
  let $phi$464;
  if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
    const getFromDefs_4165 = ds_4171 => ((foldl((mergeSet_4062($instance_462))($instance_460)))([]))((map(v_4172 => freeVars_4153(snd_4003(v_4172))))(ds_4171));
    const freeVarsInDefs_4166 = getFromDefs_4165(m_4157.$6);
    const freeVarsInIns_4167 = ((foldl((mergeSet_4062($instance_462))($instance_460)))([]))((map(ni_4173 => {
      let $phi$465;
      if((true&&true)&&((((true&&true)&&true)&&true)&&true)){
        $phi$465 = (getFromDefs_4165(ni_4173.$1.$3))
      } else error("pattern match fail",ni_4173);
      return $phi$465
    }))(m_4157.$5));
    const topLevelNames_4168 = (concat((map(fst_4013))(m_4157.$6)))((concatMap_4066(ni_4179 => {
      let $phi$466;
      if((true&&true)&&((((true&&true)&&true)&&true)&&true)){
        $phi$466 = ((map(fst_4013))(ni_4179.$1.$3))
      } else error("pattern match fail",ni_4179);
      return $phi$466
    }))(m_4157.$5));
    const fvs_4169 = (filter(v_4185 => not_4026(((contains_4074($instance_460))(v_4185))(topLevelNames_4168))))((((mergeSet_4062($instance_462))($instance_460))(freeVarsInDefs_4166))(freeVarsInIns_4167));
    const is2_4170 = (map((normalize_4155(ms_4156))(fvs_4169)))((enqueue((ImportAll_4137(emptyAnn_4136))("./builtins.js")))(m_4157.$2));
    $phi$464 = (((((((Module_4143(m_4157.$0))(m_4157.$1))(is2_4170))(m_4157.$3))(m_4157.$4))(m_4157.$5))(m_4157.$6))
  } else error("pattern match fail",m_4157);
  return $phi$464
};
const assert_4206 = assert_90;
const Pair_4207 = Pair_3;
const mapSnd_4208 = mapSnd_89;
const mapFst_4209 = mapFst_88;
const $gt$eq$gt_4210 = $gt$eq$gt_87;
const snd_4211 = snd_27;
const debug2_4212 = debug2_86;
const Just_4213 = Just_1;
const Nothing_4214 = Nothing_2;
const isJust_4215 = isJust_25;
const Empty_4216 = Empty_11;
const Leaf_4217 = Leaf_12;
const Collision_4218 = Collision_13;
const BitmapIndexed_4219 = BitmapIndexed_14;
const $_4220 = $_16;
const fst_4221 = fst_26;
const Left_4222 = Left_8;
const Right_4223 = Right_9;
const loop_4224 = loop_31;
const find_4225 = find_33;
const hamtMask_4226 = hamtMask_62;
const popCount_4227 = popCount_61;
const hamtIndex_4228 = hamtIndex_63;
const lookup_4229 = lookup_64;
const setContains_4230 = setContains_81;
const foldTrie_4231 = foldTrie_70;
const emptySet_4232 = emptySet_77;
const Unit_4233 = Unit_0;
const not_4234 = not_30;
const $div$eq_4235 = $div$eq_17;
const mapIx_4236 = mapIx_34;
const insert_4237 = insert_65;
const setAdd_4238 = setAdd_78;
const setIntersection_4239 = setIntersection_85;
const remove_4240 = remove_67;
const setDiff_4241 = setDiff_84;
const setToArray_4242 = setToArray_83;
const mergeTrie_4243 = mergeTrie_74;
const setUnion_4244 = setUnion_82;
const setRemove_4245 = setRemove_80;
const setAddAll_4246 = setAddAll_79;
const trieEntries_4247 = trieEntries_76;
const trieKeys_4248 = trieKeys_75;
const size_4249 = size_72;
const mapTrie_4250 = mapTrie_71;
const nodeMask_4251 = nodeMask_60;
const isEmpty_4252 = isEmpty_73;
const filterTrie_4253 = filterTrie_69;
const nextSetBitMask_4254 = nextSetBitMask_68;
const updateOrSet_4255 = updateOrSet_66;
const State_4256 = State_10;
const runState_4257 = runState_58;
const evalState_4258 = evalState_59;
const sets_4259 = sets_57;
const gets_4260 = gets_56;
const foldM_4261 = foldM_53;
const mapM_4262 = mapM_54;
const forM_4263 = forM_55;
const strToArray_4264 = strToArray_52;
const toRecord_4265 = toRecord_51;
const reverse_4266 = reverse_50;
const tail_4267 = tail_45;
const head_4268 = head_44;
const uniq_4269 = uniq_49;
const mergeSet_4270 = mergeSet_48;
const init_4271 = init_47;
const last_4272 = last_46;
const mapJust_4273 = mapJust_43;
const concatMap_4274 = concatMap_42;
const zip_4275 = zip_41;
const zipWithIndex2_4276 = zipWithIndex2_39;
const zipWithIndex_4277 = zipWithIndex_40;
const join_4278 = join_38;
const all_4279 = all_37;
const exists_4280 = exists_36;
const containsChar_4281 = containsChar_35;
const contains_4282 = contains_32;
const either_4283 = either_28;
const splitEither_4284 = splitEither_29;
const fromJust_4285 = fromJust_24;
const justOr_4286 = justOr_23;
const maybe_4287 = maybe_22;
const $gt$gt_4288 = $gt$gt_21;
const $gt$eq_4289 = $gt$eq_20;
const $lt$eq_4290 = $lt$eq_19;
const $gt_4291 = $gt_18;
const Identity_4292 = Identity_15;
const Tuple6_4293 = Tuple6_7;
const Tuple5_4294 = Tuple5_6;
const Tuple4_4295 = Tuple4_5;
const Tuple3_4296 = Tuple3_4;
const App_4297 = App_785;
const Lam_4298 = Lam_786;
const Case_4299 = Case_787;
const Let_4300 = Let_788;
const New_4301 = New_789;
const breakableDownAndUpM_4302 = breakableDownAndUpM_836;
const breakableDownM_4303 = breakableDownM_840;
const downAndUpM_4304 = downAndUpM_837;
const downM_4305 = downM_839;
const upM_4306 = upM_838;
const breakableDownAndUp_4307 = breakableDownAndUp_831;
const breakableDown_4308 = breakableDown_835;
const downAndUp_4309 = downAndUp_832;
const down_4310 = down_834;
const up_4311 = up_833;
const AnnType_4312 = AnnType_777;
const TUnknown_4313 = TUnknown_809;
const getAnn_4314 = getAnn_814;
const getAnnType_4315 = getAnnType_817;
const Var_4316 = Var_783;
const Const_4317 = Const_784;
const annOf_4318 = annOf_828;
const getType_4319 = getType_830;
const withAnn_4320 = withAnn_829;
const setAnn_4321 = setAnn_815;
const setAnnType_4322 = setAnnType_818;
const setType_4323 = setType_827;
const Data_4324 = Data_797;
const DataCon_4325 = DataCon_798;
const dataConName_4326 = dataConName_825;
const dataConNames_4327 = dataConNames_826;
const TCBound_4328 = TCBound_801;
const TConst_4329 = TConst_802;
const TVar_4330 = TVar_803;
const TSkolem_4331 = TSkolem_804;
const TApp_4332 = TApp_805;
const TRow_4333 = TRow_806;
const TBot_4334 = TBot_807;
const TForall_4335 = TForall_808;
const equivBound_4336 = equivBound_823;
const equivType_4337 = equivType_824;
const getAnnCodeLoc_4338 = getAnnCodeLoc_819;
const AnnCodeLoc_4339 = AnnCodeLoc_778;
const printCodeLoc_4340 = printCodeLoc_821;
const exprLoc_4341 = exprLoc_822;
const setAnnCodeLoc_4342 = setAnnCodeLoc_820;
const copyAnn_4343 = copyAnn_816;
const emptyAnn_4344 = emptyAnn_813;
const ImportAll_4345 = ImportAll_812;
const ImportOpen_4346 = ImportOpen_811;
const ImportClosed_4347 = ImportClosed_810;
const Instance_4348 = Instance_800;
const Class_4349 = Class_799;
const ModuleInterface_4350 = ModuleInterface_796;
const Module_4351 = Module_795;
const PData_4352 = PData_794;
const PConst_4353 = PConst_793;
const PVar_4354 = PVar_792;
const CStr_4355 = CStr_791;
const CNum_4356 = CNum_790;
const AnnExport_4357 = AnnExport_782;
const AnnTag_4358 = AnnTag_781;
const AnnData_4359 = AnnData_780;
const AnnUseCount_4360 = AnnUseCount_779;
const classToBindings_4361 = classToBindings_2115;
const unify_4362 = unify_2098;
const applySubsBound_4363 = applySubsBound_2096;
const instanceToTypeBound_4364 = instanceToTypeBound_2114;
const satisfiesBound_4365 = satisfiesBound_2119;
const skolemizeSubs_4366 = skolemizeSubs_2103;
const instantiate_4367 = instantiate_2093;
const printType_4368 = printType_1769;
const printTypeBound_4369 = printTypeBound_1770;
const reallyPrintExpr_4370 = reallyPrintExpr_1774;
const mkConFun_4371 = mkConFun_3069;
const S_4372 = $_0_4386 => $_1_4387 => $_2_4388 => ({$0:$_0_4386,$1:$_1_4387,$2:$_2_4388});
const breakableDownAndUpWithEnv_4381 = getEnv_4570 => setEnv_4571 => down_4572 => up_4573 => a_4574 => e_4575 => {
  const exitScope_4578 = a_4589 => (setEnv_4571(tail_4267(getEnv_4570(a_4589))))(a_4589);
  const processUp_4581 = a_4638 => e_4639 => {
    let $phi$467;
    if((((e_4639.$tag==3)&&true)&&true)&&true){
      $phi$467 = (exitScope_4578(a_4638))
    } else if((((e_4639.$tag==5)&&true)&&true)&&true){
      $phi$467 = (exitScope_4578(a_4638))
    } else if(true){
      $phi$467 = a_4638
    } else error("pattern match fail",e_4639);
    const a2_4640 = $phi$467;
    return (up_4573(a2_4640))(e_4639)
  };
  const patBindings_4582 = p_4648 => {
    let $phi$468;
    if(((p_4648.$tag==1)&&true)&&true){
      $phi$468 = empty
    } else if(((p_4648.$tag==0)&&true)&&true){
      $phi$468 = (((set(p_4648.$1))(getAnnType_4315(p_4648.$0)))(empty))
    } else if((((p_4648.$tag==2)&&true)&&true)&&true){
      $phi$468 = (((foldr(env_4656 => p_4657 => (merge(patBindings_4582(p_4657)))(env_4656)))(empty))(p_4648.$2))
    } else error("pattern match fail",p_4648);
    return $phi$468
  };
  const enterScope_4577 = bs_4585 => a_4586 => {
    const es_4587 = getEnv_4570(a_4586);
    const e_4588 = (merge(head_4268(es_4587)))(bs_4585);
    return (setEnv_4571((enqueue(e_4588))(es_4587)))(a_4586)
  };
  const go_4576 = a_4583 => e_4584 => (((breakableDownAndUp_4307(processDown_4579))(processUp_4581))(a_4583))(e_4584);
  const processDown_4579 = a_4590 => e_4591 => {
    let $phi$469;
    const $phi$470 = (down_4572(a_4590))(e_4591);
    if(($phi$470.$tag==1)&&true){
      $phi$469 = (Right_4223($phi$470.$0))
    } else if(($phi$470.$tag==0)&&((true&&true)&&true)){
      let $phi$471;
      if(((($phi$470.$0.$1.$tag==3)&&true)&&true)&&true){
        let $phi$477;
        const $phi$478 = getType_4319($phi$470.$0.$1);
        if(((($phi$478.$tag==3)&&true)&&(((($phi$478.$1.$tag==3)&&true)&&((($phi$478.$1.$1.$tag==0)&&true)&&("->"==$phi$478.$1.$1.$1)))&&true))&&true){
          $phi$477 = $phi$478.$1.$2
        } else if((((($phi$478.$tag==6)&&true)&&true)&&true)&&(((($phi$478.$3.$tag==3)&&true)&&(((($phi$478.$3.$1.$tag==3)&&true)&&((($phi$478.$3.$1.$1.$tag==0)&&true)&&("->"==$phi$478.$3.$1.$1.$1)))&&true))&&true)){
          $phi$477 = $phi$478.$3.$1.$2
        } else if(true){
          $phi$477 = TUnknown_4313
        } else error("pattern match fail",$phi$478);
        const t_4598 = $phi$477;
        $phi$471 = (Left_4222((Pair_4207((enterScope_4577(((set($phi$470.$0.$1.$1))(t_4598))(empty)))($phi$470.$0.$0)))($phi$470.$0.$1)))
      } else if(((($phi$470.$0.$1.$tag==5)&&true)&&true)&&true){
        const ts_4616 = ((foldl(ts_4617 => b_4618 => {
          let $phi$476;
          if((true&&true)&&true){
            $phi$476 = (((set(b_4618.$0))(getType_4319(b_4618.$1)))(ts_4617))
          } else error("pattern match fail",b_4618);
          return $phi$476
        }))(empty))($phi$470.$0.$1.$1);
        $phi$471 = (Left_4222((Pair_4207((enterScope_4577(ts_4616))($phi$470.$0.$0)))($phi$470.$0.$1)))
      } else if(((($phi$470.$0.$1.$tag==4)&&true)&&true)&&true){
        let $phi$472;
        const $phi$473 = (go_4576($phi$470.$0.$0))($phi$470.$0.$1.$1);
        if((true&&true)&&true){
          let $phi$474;
          const $phi$475 = ((foldl(processPat_4580))((Pair_4207($phi$473.$0))([])))($phi$470.$0.$1.$2);
          if((true&&true)&&true){
            $phi$474 = (Right_4223((Pair_4207($phi$475.$0))(((Case_4299($phi$470.$0.$1.$0))($phi$473.$1))($phi$475.$1))))
          } else error("pattern match fail",$phi$475);
          $phi$472 = $phi$474
        } else error("pattern match fail",$phi$473);
        $phi$471 = $phi$472
      } else if(true){
        $phi$471 = (Left_4222((Pair_4207($phi$470.$0.$0))($phi$470.$0.$1)))
      } else error("pattern match fail",$phi$470.$0.$1);
      $phi$469 = $phi$471
    } else error("pattern match fail",$phi$470);
    return $phi$469
  };
  const processPat_4580 = ar_4629 => pat_4630 => {
    let $phi$479;
    if((true&&true)&&true){
      let $phi$480;
      if((true&&true)&&true){
        const bs_4635 = patBindings_4582(pat_4630.$0);
        let $phi$481;
        const $phi$482 = (go_4576((enterScope_4577(bs_4635))(ar_4629.$0)))(pat_4630.$1);
        if((true&&true)&&true){
          $phi$481 = ((Pair_4207(exitScope_4578($phi$482.$0)))((push((Pair_4207(pat_4630.$0))($phi$482.$1)))(ar_4629.$1)))
        } else error("pattern match fail",$phi$482);
        $phi$480 = $phi$481
      } else error("pattern match fail",pat_4630);
      $phi$479 = $phi$480
    } else error("pattern match fail",ar_4629);
    return $phi$479
  };
  return (go_4576(a_4574))(e_4575)
};
const setEnv_4379 = env_4480 => s_4481 => {
  let $phi$483;
  if(((true&&true)&&true)&&true){
    $phi$483 = (((S_4372(env_4480))(s_4481.$1))(s_4481.$2))
  } else error("pattern match fail",s_4481);
  return $phi$483
};
const instanceNameFromBound_4385 = ix_4699 => b_4700 => {
  let $phi$484;
  if(((true&&true)&&true)&&true){
    $phi$484 = ((("local$instance$"+b_4700.$1)+"$")+(intToString(ix_4699)))
  } else error("pattern match fail",b_4700);
  return $phi$484
};
const getEnv_4378 = s_4476 => {
  let $phi$485;
  if(((true&&true)&&true)&&true){
    $phi$485 = s_4476.$0
  } else error("pattern match fail",s_4476);
  return $phi$485
};
const rewriteExpr_4380 = is_4485 => env_4486 => e_4487 => {
  const rewriteVar_4489 = a_4515 => e_4516 => {
    let $phi$486;
    if(((e_4516.$tag==0)&&true)&&true){
      let $phi$488;
      const $phi$489 = getType_4319(e_4516);
      if((((($phi$489.$tag==6)&&true)&&true)&&true)&&true){
        $phi$488 = ((Pair_4207(a_4515))(e_4516))
      } else if(true){
        const findMatching_4525 = b_4534 => a_4535 => {
          let $phi$490;
          if(((true&&true)&&true)&&true){
            const matching_4539 = (filter(p_4540 => {
              let $phi$491;
              if((true&&true)&&true){
                $phi$491 = ((satisfiesBound_4365(p_4540.$1))(b_4534))
              } else error("pattern match fail",p_4540);
              return $phi$491
            }))(a_4535.$1);
            let $phi$492;
            const $phi$493 = length(matching_4539);
            if(0==$phi$493){
              $phi$492 = (error((("declasser failed to find satisfying instance for "+(printTypeBound_4369(b_4534)))+" ")+(exprLoc_4341(e_4516))))
            } else if(1==$phi$493){
              $phi$492 = (fst_4221((getIx(0))(matching_4539)))
            } else if(true){
              $phi$492 = (error((("declasser found more than 1 satisfying instance for "+(printTypeBound_4369(b_4534)))+" ")+(exprLoc_4341(e_4516))))
            } else error("pattern match fail",$phi$493);
            $phi$490 = $phi$492
          } else error("pattern match fail",a_4535);
          return $phi$490
        };
        const requiredInstances_4526 = tv_4544 => td_4545 => {
          let $phi$494;
          const $phi$495 = ((instantiate_4367(Unit_4233))(__4546 => v_4547 => ($_4220(Pair_4207(Unit_4233)))((TVar_4330(emptyAnn_4344))("$ins$"+v_4547))))(td_4545);
          if((true&&((true&&true)&&true))&&true){
            const subs_4551 = ((unify_4362(s_4552 => "declasser: "+s_4552))(tv_4544))($phi$495.$0.$0);
            $phi$494 = ((map(applySubsBound_4363(subs_4551)))($phi$495.$0.$1))
          } else if(true){
            $phi$494 = ([])
          } else error("pattern match fail",$phi$495);
          return $phi$494
        };
        const fromEnv_4524 = n_4531 => envs_4532 => {
          const env_4533 = head_4268(envs_4532);
          let $phi$496;
          const $phi$497 = (has(n_4531))(env_4533);
          if(!$phi$497){
            $phi$496 = (error((("no "+n_4531)+" in env ")+(jsonStringify(keys(env_4533)))))
          } else if($phi$497){
            $phi$496 = ((get(n_4531))(env_4533))
          } else error("pattern match fail",$phi$497);
          return $phi$496
        };
        const t_4527 = (fromEnv_4524(e_4516.$1))(getEnv_4378(a_4515));
        const is_4528 = (requiredInstances_4526($phi$489))(t_4527);
        const mis_4529 = (map(b_4554 => (findMatching_4525(b_4554))(a_4515)))(is_4528);
        const e2_4530 = ((foldl(e_4555 => v_4556 => ((App_4297(emptyAnn_4344))(e_4555))((Var_4316(emptyAnn_4344))(v_4556))))(e_4516))(mis_4529);
        $phi$488 = ((Pair_4207(a_4515))(e2_4530))
      } else error("pattern match fail",$phi$489);
      $phi$486 = $phi$488
    } else if((((e_4516.$tag==3)&&true)&&true)&&true){
      const dropInstance_4560 = v_4561 => a_4562 => {
        let $phi$487;
        if(((true&&true)&&true)&&true){
          $phi$487 = (((S_4372(a_4562.$0))((filter(p_4566 => (($div$eq_4235($instance_460))(fst_4221(p_4566)))(v_4561)))(a_4562.$1)))(a_4562.$2))
        } else error("pattern match fail",a_4562);
        return $phi$487
      };
      $phi$486 = ((Pair_4207((dropInstance_4560(e_4516.$1))(a_4515)))(e_4516))
    } else if(true){
      $phi$486 = ((Pair_4207(a_4515))(e_4516))
    } else error("pattern match fail",e_4516);
    return $phi$486
  };
  const boundsToLam_4488 = a_4490 => e_4491 => {
    const addInstance_4492 = b_4494 => a_4495 => {
      let $phi$498;
      if(((true&&true)&&true)&&true){
        const name_4499 = (instanceNameFromBound_4385(a_4495.$2))(b_4494);
        $phi$498 = ((Pair_4207(((S_4372(a_4495.$0))((push((Pair_4207(name_4499))(b_4494)))(a_4495.$1)))(a_4495.$2+1)))(name_4499))
      } else error("pattern match fail",a_4495);
      return $phi$498
    };
    const rewriteBound_4493 = ae_4500 => ib_4501 => {
      let $phi$499;
      if((true&&true)&&true){
        let $phi$500;
        if((true&&true)&&true){
          let $phi$501;
          const $phi$502 = (addInstance_4492(ib_4501.$1))(ae_4500.$0);
          if((true&&true)&&true){
            $phi$501 = ((Pair_4207($phi$502.$0))(((Lam_4298(emptyAnn_4344))($phi$502.$1))(ae_4500.$1)))
          } else error("pattern match fail",$phi$502);
          $phi$500 = $phi$501
        } else error("pattern match fail",ae_4500);
        $phi$499 = $phi$500
      } else error("pattern match fail",ib_4501);
      return $phi$499
    };
    let $phi$503;
    const $phi$504 = getType_4319(e_4491);
    if((((($phi$504.$tag==6)&&true)&&true)&&true)&&true){
      let $phi$505;
      const $phi$506 = (($gt_4291($instance_461))(length($phi$504.$2)))(0);
      if(!$phi$506){
        $phi$505 = ((Pair_4207(a_4490))(e_4491))
      } else if($phi$506){
        const rewritten_4512 = ((foldr(rewriteBound_4493))((Pair_4207(a_4490))((setType_4323($phi$504.$3))(e_4491))))(zipWithIndex_4277($phi$504.$2));
        $phi$505 = ((mapSnd_4208(re_4513 => (withAnn_4320((((copyAnn_4343($instance_515))($instance_460))(["export"]))(annOf_4318(e_4491))))(re_4513)))(rewritten_4512))
      } else error("pattern match fail",$phi$506);
      $phi$503 = $phi$505
    } else if(true){
      $phi$503 = ((Pair_4207(a_4490))(e_4491))
    } else error("pattern match fail",$phi$504);
    return $phi$503
  };
  return snd_4211((((((breakableDownAndUpWithEnv_4381(getEnv_4378))(setEnv_4379))(a_4568 => e_4569 => Left_4222((boundsToLam_4488(a_4568))(e_4569))))(rewriteVar_4489))(((S_4372([env_4486]))(is_4485))(0)))(e_4487))
};
const className_4383 = n_4693 => "$class$"+n_4693;
const rewriteInstance_4377 = is_4466 => env_4467 => n_4468 => i_4469 => {
  let $phi$507;
  if((((true&&true)&&true)&&true)&&true){
    const args_4474 = (map((rewriteExpr_4380(is_4466))(env_4467)))((map(snd_4211))(sort(i_4469.$3)));
    const e_4475 = ((foldl(App_4297(emptyAnn_4344)))((Var_4316(emptyAnn_4344))(className_4383(i_4469.$1))))(args_4474);
    $phi$507 = ((Pair_4207(n_4468))((withAnn_4320(((((setAnn_4321($instance_515))($instance_460))("export"))(AnnExport_4357(n_4468)))(emptyAnn_4344)))(e_4475)))
  } else error("pattern match fail",i_4469);
  return $phi$507
};
const rewriteImportedInstances_4374 = ms_4423 => _isi_4424 => imp_4425 => {
  let $phi$508;
  if((true&&true)&&true){
    let $phi$509;
    if((((imp_4425.$tag==1)&&true)&&true)&&true){
      let $phi$510;
      const $phi$511 = (get(imp_4425.$1))(ms_4423);
      if(((true&&true)&&true)&&true){
        const importedBounds_4435 = trieEntries_4247($phi$511.$2);
        const importedInsNames_4436 = (map(ni_4443 => (Pair_4207(fst_4221(ni_4443)))(fst_4221(ni_4443))))(importedBounds_4435);
        const importedClassNames_4434 = (map(n_4437 => (Pair_4207(n_4437))(n_4437)))((concatMap_4274(c_4438 => {
          let $phi$512;
          if((((true&&true)&&true)&&true)&&true){
            $phi$512 = ((enqueue(className_4383(c_4438.$1)))((map(fst_4221))(c_4438.$3)))
          } else error("pattern match fail",c_4438);
          return $phi$512
        }))($phi$511.$1));
        $phi$510 = ((Pair_4207((push(((ImportOpen_4346(imp_4425.$0))(imp_4425.$1))((concat(imp_4425.$2))((concat(importedInsNames_4436))(importedClassNames_4434)))))(_isi_4424.$0)))((concat(_isi_4424.$1))(importedBounds_4435)))
      } else error("pattern match fail",$phi$511);
      $phi$509 = $phi$510
    } else error("pattern match fail",imp_4425);
    $phi$508 = $phi$509
  } else error("pattern match fail",_isi_4424);
  return $phi$508
};
const mkClassDictConstructor_4375 = c_4444 => {
  let $phi$513;
  if((((true&&true)&&true)&&true)&&true){
    const type_4451 = ((TApp_4332(emptyAnn_4344))((TConst_4329(emptyAnn_4344))(c_4444.$1)))((TVar_4330(emptyAnn_4344))(c_4444.$2));
    const params_4450 = (map(snd_4211))(sort(classToBindings_4361(c_4444)));
    const name_4449 = className_4383(c_4444.$1);
    $phi$513 = (((((mkConFun_4371(Nothing_4214))(type_4451))([c_4444.$2]))(name_4449))(params_4450))
  } else error("pattern match fail",c_4444);
  return $phi$513
};
const className2_4384 = c_4694 => {
  let $phi$514;
  if((((true&&true)&&true)&&true)&&true){
    $phi$514 = (className_4383(c_4694.$1))
  } else error("pattern match fail",c_4694);
  return $phi$514
};
const mkClassDictAccessors_4376 = c_4452 => {
  let $phi$515;
  if((((true&&true)&&true)&&true)&&true){
    const name_4457 = className2_4384(c_4452);
    const f_4461 = b_4462 => (PVar_4354(emptyAnn_4344))((fst_4221(b_4462))+"_");
    const bsForPat_4458 = (map(f_4461))(sort(c_4452.$3));
    const v_4459 = "x_"+name_4457;
    const rewrite_4460 = b_4463 => {
      let $phi$516;
      if((true&&true)&&true){
        $phi$516 = ((Pair_4207(b_4463.$0))((setType_4323(b_4463.$1))(((Lam_4298(((((setAnn_4321($instance_515))($instance_460))("export"))(AnnExport_4357(b_4463.$0)))(emptyAnn_4344)))(v_4459))(((Case_4299(emptyAnn_4344))((Var_4316(emptyAnn_4344))(v_4459)))([(Pair_4207(((PData_4352(emptyAnn_4344))(name_4457))(bsForPat_4458)))((Var_4316(emptyAnn_4344))(b_4463.$0+"_"))])))))
      } else error("pattern match fail",b_4463);
      return $phi$516
    };
    $phi$515 = ((map(rewrite_4460))(classToBindings_4361(c_4452)))
  } else error("pattern match fail",c_4452);
  return $phi$515
};
const importsToTypeEnv_4382 = ms_4658 => is_4659 => {
  const getFile_4660 = i_4663 => {
    let $phi$517;
    if(((i_4663.$tag==2)&&true)&&true){
      $phi$517 = i_4663.$1
    } else if((((i_4663.$tag==1)&&true)&&true)&&true){
      $phi$517 = i_4663.$1
    } else if((((i_4663.$tag==0)&&true)&&true)&&true){
      $phi$517 = i_4663.$1
    } else error("pattern match fail",i_4663);
    return $phi$517
  };
  const addClass_4661 = env_4672 => c_4673 => ((foldl(env_4674 => b_4675 => ((set(fst_4221(b_4675)))(snd_4211(b_4675)))(env_4674)))(env_4672))(classToBindings_4361(c_4673));
  const addImports_4662 = env_4676 => i_4677 => {
    let $phi$518;
    const $phi$519 = (get(getFile_4660(i_4677)))(ms_4658);
    if(((true&&true)&&true)&&true){
      let $phi$520;
      if(((i_4677.$tag==2)&&true)&&true){
        $phi$520 = ((merge(env_4676))($phi$519.$0))
      } else if((((i_4677.$tag==1)&&true)&&true)&&true){
        $phi$520 = (((foldl(env_4688 => n_4689 => {
          let $phi$521;
          if((true&&true)&&true){
            $phi$521 = (((set(n_4689.$1))((get(n_4689.$0))($phi$519.$0)))(env_4688))
          } else error("pattern match fail",n_4689);
          return $phi$521
        }))(env_4676))(i_4677.$2))
      } else if(true){
        $phi$520 = (error("import type not supported in type inference"))
      } else error("pattern match fail",i_4677);
      const env2_4681 = $phi$520;
      const env3_4682 = ((foldl(addClass_4661))(env2_4681))($phi$519.$1);
      $phi$518 = env3_4682
    } else error("pattern match fail",$phi$519);
    return $phi$518
  };
  return ((foldl(addImports_4662))(empty))((enqueue((ImportAll_4345(emptyAnn_4344))("./builtins.js")))(is_4659))
};
const declassModule_4373 = ms_4389 => m_4390 => {
  let $phi$522;
  if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
    const classFuns_4401 = (concat((map(mkClassDictConstructor_4375))(m_4390.$4)))((concatMap_4274(mkClassDictAccessors_4376))(m_4390.$4));
    const splitData_4416 = d_4417 => {
      let $phi$523;
      const $phi$524 = (((lookup_4229($instance_515))($instance_460))("data"))(annOf_4318(snd_4211(d_4417)));
      if($phi$524.$tag==1){
        $phi$523 = (Right_4223(d_4417))
      } else if(($phi$524.$tag==0)&&true){
        $phi$523 = (Left_4222(d_4417))
      } else error("pattern match fail",$phi$524);
      return $phi$523
    };
    const _sds_4404 = splitEither_4284((map(splitData_4416))(m_4390.$6));
    const adtDs_4405 = fst_4221(_sds_4404);
    const _isi_4398 = ((foldl(rewriteImportedInstances_4374(ms_4389)))((Pair_4207([]))([])))(m_4390.$2);
    const importedInstances_4400 = snd_4211(_isi_4398);
    const availableInstances_4402 = (concat(importedInstances_4400))((map(mapSnd_4208(instanceToTypeBound_4364)))(m_4390.$5));
    const localBindings_4411 = (concat(classFuns_4401))(m_4390.$6);
    const importedSymbols_4410 = (importsToTypeEnv_4382(ms_4389))(m_4390.$2);
    const env_4403 = ((foldl(env_4412 => b_4413 => {
      let $phi$525;
      if((true&&true)&&true){
        $phi$525 = (((set(b_4413.$0))(getType_4319(b_4413.$1)))(env_4412))
      } else error("pattern match fail",b_4413);
      return $phi$525
    }))(importedSymbols_4410))(localBindings_4411);
    const nonAdtDs_4406 = snd_4211(_sds_4404);
    const declassedDs_4407 = (map(d_4419 => (Pair_4207(fst_4221(d_4419)))(((rewriteExpr_4380(availableInstances_4402))(env_4403))(snd_4211(d_4419)))))(nonAdtDs_4406);
    const instancesAsDicts_4408 = (map(p_4420 => {
      let $phi$526;
      if((true&&true)&&true){
        $phi$526 = ((((rewriteInstance_4377(availableInstances_4402))(env_4403))(p_4420.$0))(p_4420.$1))
      } else error("pattern match fail",p_4420);
      return $phi$526
    }))(m_4390.$5);
    const finalDs_4409 = (concat(adtDs_4405))((concat(classFuns_4401))((concat(instancesAsDicts_4408))(declassedDs_4407)));
    const impsWithImportedInstances_4399 = fst_4221(_isi_4398);
    $phi$522 = (((((((Module_4351(m_4390.$0))(m_4390.$1))(impsWithImportedInstances_4399))(m_4390.$3))([]))([]))(finalDs_4409))
  } else error("pattern match fail",m_4390);
  return $phi$522
};
const assert_4704 = assert_90;
const Pair_4705 = Pair_3;
const mapSnd_4706 = mapSnd_89;
const mapFst_4707 = mapFst_88;
const $gt$eq$gt_4708 = $gt$eq$gt_87;
const snd_4709 = snd_27;
const debug2_4710 = debug2_86;
const Just_4711 = Just_1;
const Nothing_4712 = Nothing_2;
const isJust_4713 = isJust_25;
const Empty_4714 = Empty_11;
const Leaf_4715 = Leaf_12;
const Collision_4716 = Collision_13;
const BitmapIndexed_4717 = BitmapIndexed_14;
const $_4718 = $_16;
const fst_4719 = fst_26;
const Left_4720 = Left_8;
const Right_4721 = Right_9;
const loop_4722 = loop_31;
const find_4723 = find_33;
const hamtMask_4724 = hamtMask_62;
const popCount_4725 = popCount_61;
const hamtIndex_4726 = hamtIndex_63;
const lookup_4727 = lookup_64;
const setContains_4728 = setContains_81;
const foldTrie_4729 = foldTrie_70;
const emptySet_4730 = emptySet_77;
const Unit_4731 = Unit_0;
const not_4732 = not_30;
const $div$eq_4733 = $div$eq_17;
const mapIx_4734 = mapIx_34;
const insert_4735 = insert_65;
const setAdd_4736 = setAdd_78;
const setIntersection_4737 = setIntersection_85;
const remove_4738 = remove_67;
const setDiff_4739 = setDiff_84;
const setToArray_4740 = setToArray_83;
const mergeTrie_4741 = mergeTrie_74;
const setUnion_4742 = setUnion_82;
const setRemove_4743 = setRemove_80;
const setAddAll_4744 = setAddAll_79;
const trieEntries_4745 = trieEntries_76;
const trieKeys_4746 = trieKeys_75;
const size_4747 = size_72;
const mapTrie_4748 = mapTrie_71;
const nodeMask_4749 = nodeMask_60;
const isEmpty_4750 = isEmpty_73;
const filterTrie_4751 = filterTrie_69;
const nextSetBitMask_4752 = nextSetBitMask_68;
const updateOrSet_4753 = updateOrSet_66;
const State_4754 = State_10;
const runState_4755 = runState_58;
const evalState_4756 = evalState_59;
const sets_4757 = sets_57;
const gets_4758 = gets_56;
const foldM_4759 = foldM_53;
const mapM_4760 = mapM_54;
const forM_4761 = forM_55;
const strToArray_4762 = strToArray_52;
const toRecord_4763 = toRecord_51;
const reverse_4764 = reverse_50;
const tail_4765 = tail_45;
const head_4766 = head_44;
const uniq_4767 = uniq_49;
const mergeSet_4768 = mergeSet_48;
const init_4769 = init_47;
const last_4770 = last_46;
const mapJust_4771 = mapJust_43;
const concatMap_4772 = concatMap_42;
const zip_4773 = zip_41;
const zipWithIndex2_4774 = zipWithIndex2_39;
const zipWithIndex_4775 = zipWithIndex_40;
const join_4776 = join_38;
const all_4777 = all_37;
const exists_4778 = exists_36;
const containsChar_4779 = containsChar_35;
const contains_4780 = contains_32;
const either_4781 = either_28;
const splitEither_4782 = splitEither_29;
const fromJust_4783 = fromJust_24;
const justOr_4784 = justOr_23;
const maybe_4785 = maybe_22;
const $gt$gt_4786 = $gt$gt_21;
const $gt$eq_4787 = $gt$eq_20;
const $lt$eq_4788 = $lt$eq_19;
const $gt_4789 = $gt_18;
const Identity_4790 = Identity_15;
const Tuple6_4791 = Tuple6_7;
const Tuple5_4792 = Tuple5_6;
const Tuple4_4793 = Tuple4_5;
const Tuple3_4794 = Tuple3_4;
const ArgBool_4795 = $_0_4803 => $_1_4804 => ({$0:$_0_4803,$1:$_1_4804,$tag:0});
const ParsedArgs_4797 = $_0_4807 => $_1_4808 => $_2_4809 => ({$0:$_0_4807,$1:$_1_4808,$2:$_2_4809});
const ArgString_4796 = $_0_4805 => $_1_4806 => ({$0:$_0_4805,$1:$_1_4806,$tag:1});
const $instance_4851 = $class$Eq(a_4849 => b_4850 => a_4849===b_4850);
const getBool_4802 = p_4839 => def_4840 => {
  let $phi$527;
  if(((true&&true)&&true)&&true){
    let $phi$528;
    const $phi$529 = ((contains_4780($instance_4851))(def_4840))(p_4839.$2);
    if(!$phi$529){
      $phi$528 = (error("unrecognized arg that was not present for parsing"))
    } else if($phi$529){
      let $phi$530;
      if(((def_4840.$tag==0)&&true)&&true){
        let $phi$531;
        const $phi$532 = (has(def_4840.$0))(p_4839.$1);
        if(!$phi$532){
          let $phi$535;
          if((def_4840.$1.$tag==0)&&true){
            $phi$535 = def_4840.$1.$0
          } else if(def_4840.$1.$tag==1){
            $phi$535 = (error("no value for required arg "+def_4840.$0))
          } else error("pattern match fail",def_4840.$1);
          $phi$531 = $phi$535
        } else if($phi$532){
          let $phi$533;
          const $phi$534 = (get(def_4840.$0))(p_4839.$1);
          if(""==$phi$534){
            $phi$533 = true
          } else if("True"==$phi$534){
            $phi$533 = true
          } else if("true"==$phi$534){
            $phi$533 = true
          } else if("1"==$phi$534){
            $phi$533 = true
          } else if("False"==$phi$534){
            $phi$533 = false
          } else if("false"==$phi$534){
            $phi$533 = false
          } else if("0"==$phi$534){
            $phi$533 = false
          } else if(true){
            $phi$533 = (error("invalid value for a bool argument: "+$phi$534))
          } else error("pattern match fail",$phi$534);
          $phi$531 = $phi$533
        } else error("pattern match fail",$phi$532);
        $phi$530 = $phi$531
      } else if(true){
        $phi$530 = (error("arg is not a bool"))
      } else error("pattern match fail",def_4840);
      $phi$528 = $phi$530
    } else error("pattern match fail",$phi$529);
    $phi$527 = $phi$528
  } else error("pattern match fail",p_4839);
  return $phi$527
};
const getString_4801 = p_4830 => def_4831 => {
  let $phi$536;
  if(((true&&true)&&true)&&true){
    let $phi$537;
    const $phi$538 = ((contains_4780($instance_4851))(def_4831))(p_4830.$2);
    if(!$phi$538){
      $phi$537 = (error("unrecognized arg that was not present for parsing"))
    } else if($phi$538){
      let $phi$539;
      if(((def_4831.$tag==1)&&true)&&true){
        let $phi$540;
        const $phi$541 = (has(def_4831.$0))(p_4830.$1);
        if(!$phi$541){
          let $phi$542;
          if((def_4831.$1.$tag==0)&&true){
            $phi$542 = def_4831.$1.$0
          } else if(def_4831.$1.$tag==1){
            $phi$542 = (error("no value for required arg "+def_4831.$0))
          } else error("pattern match fail",def_4831.$1);
          $phi$540 = $phi$542
        } else if($phi$541){
          $phi$540 = ((get(def_4831.$0))(p_4830.$1))
        } else error("pattern match fail",$phi$541);
        $phi$539 = $phi$540
      } else if(true){
        $phi$539 = (error("arg is not a string"))
      } else error("pattern match fail",def_4831);
      $phi$537 = $phi$539
    } else error("pattern match fail",$phi$538);
    $phi$536 = $phi$537
  } else error("pattern match fail",p_4830);
  return $phi$536
};
const getPositional_4800 = p_4826 => {
  let $phi$543;
  if(((true&&true)&&true)&&true){
    $phi$543 = p_4826.$0
  } else error("pattern match fail",p_4826);
  return $phi$543
};
const argName_4798 = a_4810 => {
  let $phi$544;
  if(((a_4810.$tag==0)&&true)&&true){
    $phi$544 = a_4810.$0
  } else if(((a_4810.$tag==1)&&true)&&true){
    $phi$544 = a_4810.$0
  } else error("pattern match fail",a_4810);
  return $phi$544
};
const parseArgs_4799 = defs_4815 => argv_4816 => {
  const parse_4817 = r_4818 => arg_4819 => {
    let $phi$545;
    if((true&&true)&&true){
      let $phi$546;
      const $phi$547 = ((($eq$eq($instance_460))((getChar(0))(arg_4819)))("-"))&&((($eq$eq($instance_460))((getChar(1))(arg_4819)))("-"));
      if(!$phi$547){
        $phi$546 = ((Pair_4705((push(arg_4819))(r_4818.$0)))(r_4818.$1))
      } else if($phi$547){
        const value_4823 = (drop(1))((match("=.*"))(arg_4819));
        const name_4822 = (match("[^=]+"))((drop(2))(arg_4819));
        let $phi$548;
        const $phi$549 = ((contains_4780($instance_460))(name_4822))((map(argName_4798))(defs_4815));
        if(!$phi$549){
          $phi$548 = (error("unrecognized argument "+arg_4819))
        } else if($phi$549){
          $phi$548 = ((Pair_4705(r_4818.$0))(((set(name_4822))(value_4823))(r_4818.$1)))
        } else error("pattern match fail",$phi$549);
        $phi$546 = $phi$548
      } else error("pattern match fail",$phi$547);
      $phi$545 = $phi$546
    } else error("pattern match fail",r_4818);
    return $phi$545
  };
  let $phi$550;
  const $phi$551 = ((foldl(parse_4817))((Pair_4705([]))(empty)))(argv_4816);
  if((true&&true)&&true){
    $phi$550 = (((ParsedArgs_4797($phi$551.$0))($phi$551.$1))(defs_4815))
  } else error("pattern match fail",$phi$551);
  return $phi$550
};
const JSIf_4877 = $_0_4915 => $_1_4916 => $_2_4917 => ({$0:$_0_4915,$1:$_1_4916,$2:$_2_4917,$tag:8});
const JSAssign_4876 = $_0_4913 => $_1_4914 => ({$0:$_0_4913,$1:$_1_4914,$tag:7});
const JSBreak_4875 = {$tag:6};
const JSSwitch_4874 = $_0_4911 => $_1_4912 => ({$0:$_0_4911,$1:$_1_4912,$tag:5});
const JSLet_4873 = $_0_4909 => $_1_4910 => ({$0:$_0_4909,$1:$_1_4910,$tag:4});
const JSConst_4872 = $_0_4907 => $_1_4908 => ({$0:$_0_4907,$1:$_1_4908,$tag:3});
const JSVar_4871 = $_0_4905 => $_1_4906 => ({$0:$_0_4905,$1:$_1_4906,$tag:2});
const JSReturn_4870 = $_0_4904 => ({$0:$_0_4904,$tag:1});
const JSExpr_4869 = $_0_4903 => ({$0:$_0_4903,$tag:0});
const JSSeq_4868 = $_0_4902 => ({$0:$_0_4902,$tag:16});
const JSNew_4867 = $_0_4900 => $_1_4901 => ({$0:$_0_4900,$1:$_1_4901,$tag:15});
const JSInstanceOf_4866 = $_0_4898 => $_1_4899 => ({$0:$_0_4898,$1:$_1_4899,$tag:14});
const JSUndefined_4865 = {$tag:13};
const JSNull_4864 = {$tag:12};
const JSArray_4863 = $_0_4897 => ({$0:$_0_4897,$tag:11});
const JSObject_4862 = $_0_4896 => ({$0:$_0_4896,$tag:10});
const JSBool_4861 = $_0_4895 => ({$0:$_0_4895,$tag:9});
const JSString_4860 = $_0_4894 => ({$0:$_0_4894,$tag:8});
const JSNum_4859 = $_0_4893 => ({$0:$_0_4893,$tag:7});
const JSTernary_4858 = $_0_4890 => $_1_4891 => $_2_4892 => ({$0:$_0_4890,$1:$_1_4891,$2:$_2_4892,$tag:6});
const JSFun_4857 = $_0_4888 => $_1_4889 => ({$0:$_0_4888,$1:$_1_4889,$tag:5});
const JSCall_4856 = $_0_4886 => $_1_4887 => ({$0:$_0_4886,$1:$_1_4887,$tag:4});
const JSBinOp_4855 = $_0_4883 => $_1_4884 => $_2_4885 => ({$0:$_0_4883,$1:$_1_4884,$2:$_2_4885,$tag:3});
const JSUnOp_4854 = $_0_4881 => $_1_4882 => ({$0:$_0_4881,$1:$_1_4882,$tag:2});
const JSIndex_4853 = $_0_4879 => $_1_4880 => ({$0:$_0_4879,$1:$_1_4880,$tag:1});
const JSRef_4852 = $_0_4878 => ({$0:$_0_4878,$tag:0});
const assert_4918 = assert_90;
const Pair_4919 = Pair_3;
const mapSnd_4920 = mapSnd_89;
const mapFst_4921 = mapFst_88;
const $gt$eq$gt_4922 = $gt$eq$gt_87;
const snd_4923 = snd_27;
const debug2_4924 = debug2_86;
const Just_4925 = Just_1;
const Nothing_4926 = Nothing_2;
const isJust_4927 = isJust_25;
const Empty_4928 = Empty_11;
const Leaf_4929 = Leaf_12;
const Collision_4930 = Collision_13;
const BitmapIndexed_4931 = BitmapIndexed_14;
const $_4932 = $_16;
const fst_4933 = fst_26;
const Left_4934 = Left_8;
const Right_4935 = Right_9;
const loop_4936 = loop_31;
const find_4937 = find_33;
const hamtMask_4938 = hamtMask_62;
const popCount_4939 = popCount_61;
const hamtIndex_4940 = hamtIndex_63;
const lookup_4941 = lookup_64;
const setContains_4942 = setContains_81;
const foldTrie_4943 = foldTrie_70;
const emptySet_4944 = emptySet_77;
const Unit_4945 = Unit_0;
const not_4946 = not_30;
const $div$eq_4947 = $div$eq_17;
const mapIx_4948 = mapIx_34;
const insert_4949 = insert_65;
const setAdd_4950 = setAdd_78;
const setIntersection_4951 = setIntersection_85;
const remove_4952 = remove_67;
const setDiff_4953 = setDiff_84;
const setToArray_4954 = setToArray_83;
const mergeTrie_4955 = mergeTrie_74;
const setUnion_4956 = setUnion_82;
const setRemove_4957 = setRemove_80;
const setAddAll_4958 = setAddAll_79;
const trieEntries_4959 = trieEntries_76;
const trieKeys_4960 = trieKeys_75;
const size_4961 = size_72;
const mapTrie_4962 = mapTrie_71;
const nodeMask_4963 = nodeMask_60;
const isEmpty_4964 = isEmpty_73;
const filterTrie_4965 = filterTrie_69;
const nextSetBitMask_4966 = nextSetBitMask_68;
const updateOrSet_4967 = updateOrSet_66;
const State_4968 = State_10;
const runState_4969 = runState_58;
const evalState_4970 = evalState_59;
const sets_4971 = sets_57;
const gets_4972 = gets_56;
const foldM_4973 = foldM_53;
const mapM_4974 = mapM_54;
const forM_4975 = forM_55;
const strToArray_4976 = strToArray_52;
const toRecord_4977 = toRecord_51;
const reverse_4978 = reverse_50;
const tail_4979 = tail_45;
const head_4980 = head_44;
const uniq_4981 = uniq_49;
const mergeSet_4982 = mergeSet_48;
const init_4983 = init_47;
const last_4984 = last_46;
const mapJust_4985 = mapJust_43;
const concatMap_4986 = concatMap_42;
const zip_4987 = zip_41;
const zipWithIndex2_4988 = zipWithIndex2_39;
const zipWithIndex_4989 = zipWithIndex_40;
const join_4990 = join_38;
const all_4991 = all_37;
const exists_4992 = exists_36;
const containsChar_4993 = containsChar_35;
const contains_4994 = contains_32;
const either_4995 = either_28;
const splitEither_4996 = splitEither_29;
const fromJust_4997 = fromJust_24;
const justOr_4998 = justOr_23;
const maybe_4999 = maybe_22;
const $gt$gt_5000 = $gt$gt_21;
const $gt$eq_5001 = $gt$eq_20;
const $lt$eq_5002 = $lt$eq_19;
const $gt_5003 = $gt_18;
const Identity_5004 = Identity_15;
const Tuple6_5005 = Tuple6_7;
const Tuple5_5006 = Tuple5_6;
const Tuple4_5007 = Tuple4_5;
const Tuple3_5008 = Tuple3_4;
const JSIf_5009 = JSIf_4877;
const JSAssign_5010 = JSAssign_4876;
const JSBreak_5011 = JSBreak_4875;
const JSSwitch_5012 = JSSwitch_4874;
const JSLet_5013 = JSLet_4873;
const JSConst_5014 = JSConst_4872;
const JSVar_5015 = JSVar_4871;
const JSReturn_5016 = JSReturn_4870;
const JSExpr_5017 = JSExpr_4869;
const JSSeq_5018 = JSSeq_4868;
const JSNew_5019 = JSNew_4867;
const JSInstanceOf_5020 = JSInstanceOf_4866;
const JSUndefined_5021 = JSUndefined_4865;
const JSNull_5022 = JSNull_4864;
const JSArray_5023 = JSArray_4863;
const JSObject_5024 = JSObject_4862;
const JSBool_5025 = JSBool_4861;
const JSString_5026 = JSString_4860;
const JSNum_5027 = JSNum_4859;
const JSTernary_5028 = JSTernary_4858;
const JSFun_5029 = JSFun_4857;
const JSCall_5030 = JSCall_4856;
const JSBinOp_5031 = JSBinOp_4855;
const JSUnOp_5032 = JSUnOp_4854;
const JSIndex_5033 = JSIndex_4853;
const JSRef_5034 = JSRef_4852;
const tryDCE_5035 = e_5038 => {
  let $phi$552;
  if((((e_5038.$tag==3)&&("&&"==e_5038.$0))&&((e_5038.$1.$tag==9)&&e_5038.$1.$0))&&true){
    $phi$552 = e_5038.$2
  } else if((((e_5038.$tag==3)&&("&&"==e_5038.$0))&&true)&&((e_5038.$2.$tag==9)&&e_5038.$2.$0)){
    $phi$552 = e_5038.$1
  } else if((((e_5038.$tag==6)&&((e_5038.$0.$tag==9)&&e_5038.$0.$0))&&true)&&true){
    $phi$552 = e_5038.$1
  } else if((((e_5038.$tag==6)&&((e_5038.$0.$tag==9)&&(!e_5038.$0.$0)))&&true)&&true){
    $phi$552 = e_5038.$2
  } else if(true){
    $phi$552 = e_5038
  } else error("pattern match fail",e_5038);
  return $phi$552
};
const rewriteDCE_5036 = e_5046 => {
  let $phi$553;
  if(((e_5046.$tag==1)&&true)&&true){
    $phi$553 = ((JSIndex_5033(rewriteDCE_5036(e_5046.$0)))(rewriteDCE_5036(e_5046.$1)))
  } else if((((e_5046.$tag==3)&&true)&&true)&&true){
    $phi$553 = (tryDCE_5035(((JSBinOp_5031(e_5046.$0))(rewriteDCE_5036(e_5046.$1)))(rewriteDCE_5036(e_5046.$2))))
  } else if(((e_5046.$tag==4)&&true)&&true){
    $phi$553 = ((JSCall_5030(rewriteDCE_5036(e_5046.$0)))((map(rewriteDCE_5036))(e_5046.$1)))
  } else if(((e_5046.$tag==5)&&true)&&true){
    $phi$553 = ((JSFun_5029(e_5046.$0))((concatMap_4986(rewriteStmt_5037))(e_5046.$1)))
  } else if((((e_5046.$tag==6)&&true)&&true)&&true){
    $phi$553 = (tryDCE_5035(((JSTernary_5028(rewriteDCE_5036(e_5046.$0)))(rewriteDCE_5036(e_5046.$1)))(rewriteDCE_5036(e_5046.$2))))
  } else if((e_5046.$tag==10)&&true){
    $phi$553 = (JSObject_5024((map(kv_5060 => {
      let $phi$554;
      if((true&&true)&&true){
        $phi$554 = ((Pair_4919(kv_5060.$0))(rewriteDCE_5036(kv_5060.$1)))
      } else error("pattern match fail",kv_5060);
      return $phi$554
    }))(e_5046.$0)))
  } else if(((e_5046.$tag==14)&&true)&&true){
    $phi$553 = ((JSInstanceOf_5020(rewriteDCE_5036(e_5046.$0)))(rewriteDCE_5036(e_5046.$1)))
  } else if(((e_5046.$tag==15)&&true)&&true){
    $phi$553 = ((JSNew_5019(rewriteDCE_5036(e_5046.$0)))((map(rewriteDCE_5036))(e_5046.$1)))
  } else if((e_5046.$tag==11)&&true){
    $phi$553 = (JSArray_5023((map(rewriteDCE_5036))(e_5046.$0)))
  } else if(true){
    $phi$553 = e_5046
  } else error("pattern match fail",e_5046);
  return $phi$553
};
const rewriteStmt_5037 = s_5069 => {
  let $phi$555;
  if((s_5069.$tag==0)&&true){
    $phi$555 = ([JSExpr_5017(rewriteDCE_5036(s_5069.$0))])
  } else if((s_5069.$tag==1)&&true){
    $phi$555 = ([JSReturn_5016(rewriteDCE_5036(s_5069.$0))])
  } else if(((s_5069.$tag==2)&&true)&&true){
    $phi$555 = ([(JSVar_5015(s_5069.$0))(rewriteDCE_5036(s_5069.$1))])
  } else if(((s_5069.$tag==7)&&true)&&true){
    $phi$555 = ([(JSAssign_5010(rewriteDCE_5036(s_5069.$0)))(rewriteDCE_5036(s_5069.$1))])
  } else if((((s_5069.$tag==8)&&((s_5069.$0.$tag==9)&&s_5069.$0.$0))&&true)&&true){
    $phi$555 = ((concatMap_4986(rewriteStmt_5037))(s_5069.$1))
  } else if((((s_5069.$tag==8)&&((s_5069.$0.$tag==9)&&(!s_5069.$0.$0)))&&true)&&true){
    $phi$555 = ((concatMap_4986(rewriteStmt_5037))(s_5069.$2))
  } else if((((s_5069.$tag==8)&&true)&&true)&&true){
    let $phi$556;
    const $phi$557 = rewriteDCE_5036(s_5069.$0);
    if(($phi$557.$tag==9)&&$phi$557.$0){
      $phi$556 = ((concatMap_4986(rewriteStmt_5037))(s_5069.$1))
    } else if(($phi$557.$tag==9)&&(!$phi$557.$0)){
      $phi$556 = ((concatMap_4986(rewriteStmt_5037))(s_5069.$2))
    } else if(true){
      $phi$556 = ([((JSIf_5009($phi$557))((concatMap_4986(rewriteStmt_5037))(s_5069.$1)))((concatMap_4986(rewriteStmt_5037))(s_5069.$2))])
    } else error("pattern match fail",$phi$557);
    $phi$555 = $phi$556
  } else if(true){
    $phi$555 = ([s_5069])
  } else error("pattern match fail",s_5069);
  return $phi$555
};
const assert_5085 = assert_90;
const Pair_5086 = Pair_3;
const mapSnd_5087 = mapSnd_89;
const mapFst_5088 = mapFst_88;
const $gt$eq$gt_5089 = $gt$eq$gt_87;
const snd_5090 = snd_27;
const debug2_5091 = debug2_86;
const Just_5092 = Just_1;
const Nothing_5093 = Nothing_2;
const isJust_5094 = isJust_25;
const Empty_5095 = Empty_11;
const Leaf_5096 = Leaf_12;
const Collision_5097 = Collision_13;
const BitmapIndexed_5098 = BitmapIndexed_14;
const $_5099 = $_16;
const fst_5100 = fst_26;
const Left_5101 = Left_8;
const Right_5102 = Right_9;
const loop_5103 = loop_31;
const find_5104 = find_33;
const hamtMask_5105 = hamtMask_62;
const popCount_5106 = popCount_61;
const hamtIndex_5107 = hamtIndex_63;
const lookup_5108 = lookup_64;
const setContains_5109 = setContains_81;
const foldTrie_5110 = foldTrie_70;
const emptySet_5111 = emptySet_77;
const Unit_5112 = Unit_0;
const not_5113 = not_30;
const $div$eq_5114 = $div$eq_17;
const mapIx_5115 = mapIx_34;
const insert_5116 = insert_65;
const setAdd_5117 = setAdd_78;
const setIntersection_5118 = setIntersection_85;
const remove_5119 = remove_67;
const setDiff_5120 = setDiff_84;
const setToArray_5121 = setToArray_83;
const mergeTrie_5122 = mergeTrie_74;
const setUnion_5123 = setUnion_82;
const setRemove_5124 = setRemove_80;
const setAddAll_5125 = setAddAll_79;
const trieEntries_5126 = trieEntries_76;
const trieKeys_5127 = trieKeys_75;
const size_5128 = size_72;
const mapTrie_5129 = mapTrie_71;
const nodeMask_5130 = nodeMask_60;
const isEmpty_5131 = isEmpty_73;
const filterTrie_5132 = filterTrie_69;
const nextSetBitMask_5133 = nextSetBitMask_68;
const updateOrSet_5134 = updateOrSet_66;
const State_5135 = State_10;
const runState_5136 = runState_58;
const evalState_5137 = evalState_59;
const sets_5138 = sets_57;
const gets_5139 = gets_56;
const foldM_5140 = foldM_53;
const mapM_5141 = mapM_54;
const forM_5142 = forM_55;
const strToArray_5143 = strToArray_52;
const toRecord_5144 = toRecord_51;
const reverse_5145 = reverse_50;
const tail_5146 = tail_45;
const head_5147 = head_44;
const uniq_5148 = uniq_49;
const mergeSet_5149 = mergeSet_48;
const init_5150 = init_47;
const last_5151 = last_46;
const mapJust_5152 = mapJust_43;
const concatMap_5153 = concatMap_42;
const zip_5154 = zip_41;
const zipWithIndex2_5155 = zipWithIndex2_39;
const zipWithIndex_5156 = zipWithIndex_40;
const join_5157 = join_38;
const all_5158 = all_37;
const exists_5159 = exists_36;
const containsChar_5160 = containsChar_35;
const contains_5161 = contains_32;
const either_5162 = either_28;
const splitEither_5163 = splitEither_29;
const fromJust_5164 = fromJust_24;
const justOr_5165 = justOr_23;
const maybe_5166 = maybe_22;
const $gt$gt_5167 = $gt$gt_21;
const $gt$eq_5168 = $gt$eq_20;
const $lt$eq_5169 = $lt$eq_19;
const $gt_5170 = $gt_18;
const Identity_5171 = Identity_15;
const Tuple6_5172 = Tuple6_7;
const Tuple5_5173 = Tuple5_6;
const Tuple4_5174 = Tuple4_5;
const Tuple3_5175 = Tuple3_4;
const JSIf_5176 = JSIf_4877;
const JSAssign_5177 = JSAssign_4876;
const JSBreak_5178 = JSBreak_4875;
const JSSwitch_5179 = JSSwitch_4874;
const JSLet_5180 = JSLet_4873;
const JSConst_5181 = JSConst_4872;
const JSVar_5182 = JSVar_4871;
const JSReturn_5183 = JSReturn_4870;
const JSExpr_5184 = JSExpr_4869;
const JSSeq_5185 = JSSeq_4868;
const JSNew_5186 = JSNew_4867;
const JSInstanceOf_5187 = JSInstanceOf_4866;
const JSUndefined_5188 = JSUndefined_4865;
const JSNull_5189 = JSNull_4864;
const JSArray_5190 = JSArray_4863;
const JSObject_5191 = JSObject_4862;
const JSBool_5192 = JSBool_4861;
const JSString_5193 = JSString_4860;
const JSNum_5194 = JSNum_4859;
const JSTernary_5195 = JSTernary_4858;
const JSFun_5196 = JSFun_4857;
const JSCall_5197 = JSCall_4856;
const JSBinOp_5198 = JSBinOp_4855;
const JSUnOp_5199 = JSUnOp_4854;
const JSIndex_5200 = JSIndex_4853;
const JSRef_5201 = JSRef_4852;
const printIndent_5207 = indent_5289 => {
  let $phi$558;
  if(0==indent_5289){
    $phi$558 = ""
  } else if(true){
    $phi$558 = ("  "+(printIndent_5207(indent_5289-1)))
  } else error("pattern match fail",indent_5289);
  return $phi$558
};
const paren_5208 = s_5291 => ("("+s_5291)+")";
const jsExprToString_5202 = indent_5209 => e_5210 => {
  const printParen_5212 = e_5214 => (jsExprToParenString_5203(indent_5209))(e_5214);
  const print_5211 = e_5213 => (jsExprToString_5202(indent_5209))(e_5213);
  let $phi$559;
  if(e_5210.$tag==12){
    $phi$559 = "null"
  } else if(e_5210.$tag==13){
    $phi$559 = "undefined"
  } else if((e_5210.$tag==9)&&e_5210.$0){
    $phi$559 = "true"
  } else if((e_5210.$tag==9)&&(!e_5210.$0)){
    $phi$559 = "false"
  } else if((e_5210.$tag==7)&&true){
    $phi$559 = (jsonStringify(e_5210.$0))
  } else if((e_5210.$tag==8)&&true){
    $phi$559 = (jsonStringify(e_5210.$0))
  } else if((e_5210.$tag==0)&&true){
    $phi$559 = e_5210.$0
  } else if(((e_5210.$tag==1)&&true)&&((e_5210.$1.$tag==8)&&true)){
    let $phi$567;
    const $phi$568 = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))(e_5210.$1.$0);
    if(""==$phi$568){
      $phi$567 = ((((printParen_5212(e_5210.$0))+"[")+e_5210.$1.$0)+"]")
    } else if(true){
      $phi$567 = (((printParen_5212(e_5210.$0))+".")+$phi$568)
    } else error("pattern match fail",$phi$568);
    $phi$559 = $phi$567
  } else if(((e_5210.$tag==1)&&true)&&true){
    $phi$559 = ((((printParen_5212(e_5210.$0))+"[")+(print_5211(e_5210.$1)))+"]")
  } else if(((e_5210.$tag==2)&&true)&&true){
    $phi$559 = (e_5210.$0+(printParen_5212(e_5210.$1)))
  } else if((((e_5210.$tag==3)&&true)&&true)&&true){
    $phi$559 = (((printParen_5212(e_5210.$1))+e_5210.$0)+(printParen_5212(e_5210.$2)))
  } else if(((e_5210.$tag==4)&&true)&&true){
    $phi$559 = ((printParen_5212(e_5210.$0))+(paren_5208((intercalate(","))((map(print_5211))(e_5210.$1)))))
  } else if(((e_5210.$tag==15)&&true)&&true){
    $phi$559 = (("new "+(printParen_5212(e_5210.$0)))+(paren_5208((intercalate(","))((map(print_5211))(e_5210.$1)))))
  } else if(((e_5210.$tag==5)&&true)&&true){
    let $phi$560;
    const $phi$561 = length(e_5210.$0);
    if(1==$phi$561){
      $phi$560 = (((getIx(0))(e_5210.$0))+" => ")
    } else if(true){
      $phi$560 = (("("+((intercalate(","))(e_5210.$0)))+") => ")
    } else error("pattern match fail",$phi$561);
    const params_5234 = $phi$560;
    let $phi$562;
    const $phi$563 = length(e_5210.$1);
    if(1==$phi$563){
      let $phi$564;
      const $phi$565 = head_5147(e_5210.$1);
      if(($phi$565.$tag==1)&&true){
        let $phi$566;
        if(($phi$565.$0.$tag==10)&&true){
          $phi$566 = (params_5234+(paren_5208(print_5211($phi$565.$0))))
        } else if(true){
          $phi$566 = (params_5234+(print_5211($phi$565.$0)))
        } else error("pattern match fail",$phi$565.$0);
        $phi$564 = $phi$566
      } else error("pattern match fail",$phi$565);
      $phi$562 = $phi$564
    } else if(true){
      $phi$562 = ((((((params_5234+"{\n")+(printIndent_5207(indent_5209+1)))+((intercalate(";\n"+(printIndent_5207(indent_5209+1))))((map(jsStmtToString_5205(indent_5209+1)))(e_5210.$1))))+"\n")+(printIndent_5207(indent_5209)))+"}")
    } else error("pattern match fail",$phi$563);
    $phi$559 = $phi$562
  } else if((((e_5210.$tag==6)&&true)&&true)&&true){
    $phi$559 = (((((printParen_5212(e_5210.$0))+"?")+(printParen_5212(e_5210.$1)))+":")+(printParen_5212(e_5210.$2)))
  } else if((e_5210.$tag==10)&&true){
    $phi$559 = (("{"+((intercalate(","))((map(keyValueToString_5204(indent_5209)))(e_5210.$0))))+"}")
  } else if((e_5210.$tag==11)&&true){
    $phi$559 = (("["+((intercalate(","))((map(print_5211))(e_5210.$0))))+"]")
  } else if(((e_5210.$tag==14)&&true)&&true){
    $phi$559 = (((printParen_5212(e_5210.$0))+" instanceof ")+(printParen_5212(e_5210.$1)))
  } else if((e_5210.$tag==16)&&true){
    $phi$559 = ((intercalate(","))((map(print_5211))(e_5210.$0)))
  } else if(true){
    $phi$559 = (error(e_5210))
  } else error("pattern match fail",e_5210);
  return $phi$559
};
const jsExprToParenString_5203 = indent_5249 => e_5250 => {
  let $phi$569;
  if((e_5250.$tag==0)&&true){
    $phi$569 = ((jsExprToString_5202(indent_5249))(e_5250))
  } else if((e_5250.$tag==7)&&true){
    $phi$569 = ((jsExprToString_5202(indent_5249))(e_5250))
  } else if((e_5250.$tag==8)&&true){
    $phi$569 = ((jsExprToString_5202(indent_5249))(e_5250))
  } else if((e_5250.$tag==9)&&true){
    $phi$569 = ((jsExprToString_5202(indent_5249))(e_5250))
  } else if(((e_5250.$tag==1)&&true)&&true){
    $phi$569 = ((jsExprToString_5202(indent_5249))(e_5250))
  } else if(((e_5250.$tag==15)&&true)&&true){
    $phi$569 = ((jsExprToString_5202(indent_5249))(e_5250))
  } else if((e_5250.$tag==10)&&true){
    $phi$569 = ((jsExprToString_5202(indent_5249))(e_5250))
  } else if(true){
    $phi$569 = (paren_5208((jsExprToString_5202(indent_5249))(e_5250)))
  } else error("pattern match fail",e_5250);
  return $phi$569
};
const keyValueToString_5204 = indent_5261 => kv_5262 => {
  let $phi$570;
  if((true&&true)&&true){
    $phi$570 = ((kv_5262.$0+":")+((jsExprToString_5202(indent_5261))(kv_5262.$1)))
  } else error("pattern match fail",kv_5262);
  return $phi$570
};
const jsStmtToString_5205 = indent_5265 => s_5266 => {
  let $phi$571;
  if((s_5266.$tag==0)&&true){
    $phi$571 = ((jsExprToString_5202(indent_5265))(s_5266.$0))
  } else if((s_5266.$tag==1)&&true){
    $phi$571 = ("return "+((jsExprToString_5202(indent_5265))(s_5266.$0)))
  } else if(((s_5266.$tag==2)&&true)&&true){
    $phi$571 = ((("var "+s_5266.$0)+" = ")+((jsExprToString_5202(indent_5265))(s_5266.$1)))
  } else if(((s_5266.$tag==3)&&true)&&true){
    $phi$571 = ((("const "+s_5266.$0)+" = ")+((jsExprToString_5202(indent_5265))(s_5266.$1)))
  } else if(((s_5266.$tag==4)&&true)&&true){
    let $phi$574;
    if(s_5266.$1.$tag==1){
      $phi$574 = ("let "+s_5266.$0)
    } else if((s_5266.$1.$tag==0)&&true){
      $phi$574 = ((("let "+s_5266.$0)+" = ")+((jsExprToString_5202(indent_5265))(s_5266.$1.$0)))
    } else error("pattern match fail",s_5266.$1);
    $phi$571 = $phi$574
  } else if(s_5266.$tag==6){
    $phi$571 = "break"
  } else if(((s_5266.$tag==5)&&true)&&true){
    $phi$571 = ((((((("switch"+(paren_5208((jsExprToString_5202(indent_5265))(s_5266.$0))))+"{\n")+(printIndent_5207(indent_5265+1)))+((intercalate(";\n"+(printIndent_5207(indent_5265+1))))((map(caseToString_5206(indent_5265+1)))(s_5266.$1))))+"\n")+(printIndent_5207(indent_5265)))+"}")
  } else if(((s_5266.$tag==7)&&true)&&true){
    $phi$571 = ((((jsExprToParenString_5203(indent_5265))(s_5266.$0))+" = ")+((jsExprToParenString_5203(indent_5265))(s_5266.$1)))
  } else if((((s_5266.$tag==8)&&true)&&true)&&true){
    let $phi$572;
    const $phi$573 = length(s_5266.$2);
    if(1==$phi$573){
      $phi$572 = ((jsStmtToString_5205(indent_5265))((getIx(0))(s_5266.$2)))
    } else if(true){
      $phi$572 = ((((("{\n"+(printIndent_5207(indent_5265+1)))+((intercalate(";\n"+(printIndent_5207(indent_5265+1))))((map(jsStmtToString_5205(indent_5265+1)))(s_5266.$2))))+"\n")+(printIndent_5207(indent_5265)))+"}")
    } else error("pattern match fail",$phi$573);
    const els_5283 = $phi$572;
    $phi$571 = (((((((("if("+((jsExprToString_5202(indent_5265))(s_5266.$0)))+"){\n")+(printIndent_5207(indent_5265+1)))+((intercalate(";\n"+(printIndent_5207(indent_5265+1))))((map(jsStmtToString_5205(indent_5265+1)))(s_5266.$1))))+"\n")+(printIndent_5207(indent_5265)))+"} else ")+els_5283)
  } else error("pattern match fail",s_5266);
  return $phi$571
};
const caseToString_5206 = indent_5285 => c_5286 => {
  let $phi$575;
  if((true&&true)&&true){
    $phi$575 = (((("case "+(paren_5208((jsExprToString_5202(indent_5285))(c_5286.$0))))+":\n")+(printIndent_5207(indent_5285+1)))+((intercalate(";\n"+(printIndent_5207(indent_5285+1))))((map(jsStmtToString_5205(indent_5285)))(c_5286.$1))))
  } else error("pattern match fail",c_5286);
  return $phi$575
};
const assert_5292 = assert_90;
const Pair_5293 = Pair_3;
const mapSnd_5294 = mapSnd_89;
const mapFst_5295 = mapFst_88;
const $gt$eq$gt_5296 = $gt$eq$gt_87;
const snd_5297 = snd_27;
const debug2_5298 = debug2_86;
const Just_5299 = Just_1;
const Nothing_5300 = Nothing_2;
const isJust_5301 = isJust_25;
const Empty_5302 = Empty_11;
const Leaf_5303 = Leaf_12;
const Collision_5304 = Collision_13;
const BitmapIndexed_5305 = BitmapIndexed_14;
const $_5306 = $_16;
const fst_5307 = fst_26;
const Left_5308 = Left_8;
const Right_5309 = Right_9;
const loop_5310 = loop_31;
const find_5311 = find_33;
const hamtMask_5312 = hamtMask_62;
const popCount_5313 = popCount_61;
const hamtIndex_5314 = hamtIndex_63;
const lookup_5315 = lookup_64;
const setContains_5316 = setContains_81;
const foldTrie_5317 = foldTrie_70;
const emptySet_5318 = emptySet_77;
const Unit_5319 = Unit_0;
const not_5320 = not_30;
const $div$eq_5321 = $div$eq_17;
const mapIx_5322 = mapIx_34;
const insert_5323 = insert_65;
const setAdd_5324 = setAdd_78;
const setIntersection_5325 = setIntersection_85;
const remove_5326 = remove_67;
const setDiff_5327 = setDiff_84;
const setToArray_5328 = setToArray_83;
const mergeTrie_5329 = mergeTrie_74;
const setUnion_5330 = setUnion_82;
const setRemove_5331 = setRemove_80;
const setAddAll_5332 = setAddAll_79;
const trieEntries_5333 = trieEntries_76;
const trieKeys_5334 = trieKeys_75;
const size_5335 = size_72;
const mapTrie_5336 = mapTrie_71;
const nodeMask_5337 = nodeMask_60;
const isEmpty_5338 = isEmpty_73;
const filterTrie_5339 = filterTrie_69;
const nextSetBitMask_5340 = nextSetBitMask_68;
const updateOrSet_5341 = updateOrSet_66;
const State_5342 = State_10;
const runState_5343 = runState_58;
const evalState_5344 = evalState_59;
const sets_5345 = sets_57;
const gets_5346 = gets_56;
const foldM_5347 = foldM_53;
const mapM_5348 = mapM_54;
const forM_5349 = forM_55;
const strToArray_5350 = strToArray_52;
const toRecord_5351 = toRecord_51;
const reverse_5352 = reverse_50;
const tail_5353 = tail_45;
const head_5354 = head_44;
const uniq_5355 = uniq_49;
const mergeSet_5356 = mergeSet_48;
const init_5357 = init_47;
const last_5358 = last_46;
const mapJust_5359 = mapJust_43;
const concatMap_5360 = concatMap_42;
const zip_5361 = zip_41;
const zipWithIndex2_5362 = zipWithIndex2_39;
const zipWithIndex_5363 = zipWithIndex_40;
const join_5364 = join_38;
const all_5365 = all_37;
const exists_5366 = exists_36;
const containsChar_5367 = containsChar_35;
const contains_5368 = contains_32;
const either_5369 = either_28;
const splitEither_5370 = splitEither_29;
const fromJust_5371 = fromJust_24;
const justOr_5372 = justOr_23;
const maybe_5373 = maybe_22;
const $gt$gt_5374 = $gt$gt_21;
const $gt$eq_5375 = $gt$eq_20;
const $lt$eq_5376 = $lt$eq_19;
const $gt_5377 = $gt_18;
const Identity_5378 = Identity_15;
const Tuple6_5379 = Tuple6_7;
const Tuple5_5380 = Tuple5_6;
const Tuple4_5381 = Tuple4_5;
const Tuple3_5382 = Tuple3_4;
const App_5383 = App_785;
const Lam_5384 = Lam_786;
const Case_5385 = Case_787;
const Let_5386 = Let_788;
const New_5387 = New_789;
const breakableDownAndUpM_5388 = breakableDownAndUpM_836;
const breakableDownM_5389 = breakableDownM_840;
const downAndUpM_5390 = downAndUpM_837;
const downM_5391 = downM_839;
const upM_5392 = upM_838;
const breakableDownAndUp_5393 = breakableDownAndUp_831;
const breakableDown_5394 = breakableDown_835;
const downAndUp_5395 = downAndUp_832;
const down_5396 = down_834;
const up_5397 = up_833;
const AnnType_5398 = AnnType_777;
const TUnknown_5399 = TUnknown_809;
const getAnn_5400 = getAnn_814;
const getAnnType_5401 = getAnnType_817;
const Var_5402 = Var_783;
const Const_5403 = Const_784;
const annOf_5404 = annOf_828;
const getType_5405 = getType_830;
const withAnn_5406 = withAnn_829;
const setAnn_5407 = setAnn_815;
const setAnnType_5408 = setAnnType_818;
const setType_5409 = setType_827;
const Data_5410 = Data_797;
const DataCon_5411 = DataCon_798;
const dataConName_5412 = dataConName_825;
const dataConNames_5413 = dataConNames_826;
const TCBound_5414 = TCBound_801;
const TConst_5415 = TConst_802;
const TVar_5416 = TVar_803;
const TSkolem_5417 = TSkolem_804;
const TApp_5418 = TApp_805;
const TRow_5419 = TRow_806;
const TBot_5420 = TBot_807;
const TForall_5421 = TForall_808;
const equivBound_5422 = equivBound_823;
const equivType_5423 = equivType_824;
const getAnnCodeLoc_5424 = getAnnCodeLoc_819;
const AnnCodeLoc_5425 = AnnCodeLoc_778;
const printCodeLoc_5426 = printCodeLoc_821;
const exprLoc_5427 = exprLoc_822;
const setAnnCodeLoc_5428 = setAnnCodeLoc_820;
const copyAnn_5429 = copyAnn_816;
const emptyAnn_5430 = emptyAnn_813;
const ImportAll_5431 = ImportAll_812;
const ImportOpen_5432 = ImportOpen_811;
const ImportClosed_5433 = ImportClosed_810;
const Instance_5434 = Instance_800;
const Class_5435 = Class_799;
const ModuleInterface_5436 = ModuleInterface_796;
const Module_5437 = Module_795;
const PData_5438 = PData_794;
const PConst_5439 = PConst_793;
const PVar_5440 = PVar_792;
const CStr_5441 = CStr_791;
const CNum_5442 = CNum_790;
const AnnExport_5443 = AnnExport_782;
const AnnTag_5444 = AnnTag_781;
const AnnData_5445 = AnnData_780;
const AnnUseCount_5446 = AnnUseCount_779;
const JSIf_5447 = JSIf_4877;
const JSAssign_5448 = JSAssign_4876;
const JSBreak_5449 = JSBreak_4875;
const JSSwitch_5450 = JSSwitch_4874;
const JSLet_5451 = JSLet_4873;
const JSConst_5452 = JSConst_4872;
const JSVar_5453 = JSVar_4871;
const JSReturn_5454 = JSReturn_4870;
const JSExpr_5455 = JSExpr_4869;
const JSSeq_5456 = JSSeq_4868;
const JSNew_5457 = JSNew_4867;
const JSInstanceOf_5458 = JSInstanceOf_4866;
const JSUndefined_5459 = JSUndefined_4865;
const JSNull_5460 = JSNull_4864;
const JSArray_5461 = JSArray_4863;
const JSObject_5462 = JSObject_4862;
const JSBool_5463 = JSBool_4861;
const JSString_5464 = JSString_4860;
const JSNum_5465 = JSNum_4859;
const JSTernary_5466 = JSTernary_4858;
const JSFun_5467 = JSFun_4857;
const JSCall_5468 = JSCall_4856;
const JSBinOp_5469 = JSBinOp_4855;
const JSUnOp_5470 = JSUnOp_4854;
const JSIndex_5471 = JSIndex_4853;
const JSRef_5472 = JSRef_4852;
const RewriteState_5473 = $_0_5494 => $_1_5495 => $_2_5496 => $_3_5497 => ({$0:$_0_5494,$1:$_1_5495,$2:$_2_5496,$3:$_3_5497});
const opChar_5493 = c_5755 => {
  let $phi$576;
  if("-"==c_5755){
    $phi$576 = "$mns"
  } else if("+"==c_5755){
    $phi$576 = "$pls"
  } else if("*"==c_5755){
    $phi$576 = "$mul"
  } else if("/"==c_5755){
    $phi$576 = "$div"
  } else if("="==c_5755){
    $phi$576 = "$eq"
  } else if(":"==c_5755){
    $phi$576 = "$col"
  } else if("&"==c_5755){
    $phi$576 = "$amp"
  } else if("|"==c_5755){
    $phi$576 = "$pip"
  } else if("<"==c_5755){
    $phi$576 = "$lt"
  } else if(">"==c_5755){
    $phi$576 = "$gt"
  } else if("^"==c_5755){
    $phi$576 = "$rof"
  } else if(true){
    $phi$576 = c_5755
  } else error("pattern match fail",c_5755);
  return $phi$576
};
const opName_5492 = op_5751 => {
  let $phi$577;
  if("+"==op_5751){
    $phi$577 = "$add"
  } else if("-"==op_5751){
    $phi$577 = "$del"
  } else if("*"==op_5751){
    $phi$577 = "$mul"
  } else if("&&"==op_5751){
    $phi$577 = "$and"
  } else if("||"==op_5751){
    $phi$577 = "$or"
  } else if("++"==op_5751){
    $phi$577 = "$concat"
  } else if("new"==op_5751){
    $phi$577 = "$new"
  } else if(true){
    $phi$577 = (((foldl(s_5753 => c_5754 => s_5753+(opChar_5493(c_5754))))(""))(strToArray_5350(op_5751)))
  } else error("pattern match fail",op_5751);
  return $phi$577
};
const processPattern_5485 = cons_5675 => pm_5676 => p_5677 => {
  let $phi$578;
  if(((p_5677.$tag==0)&&true)&&("_"==p_5677.$1)){
    $phi$578 = ((Pair_5293(JSBool_5463(true)))((Pair_5293([]))([])))
  } else if(((p_5677.$tag==0)&&true)&&true){
    $phi$578 = ((Pair_5293(JSBool_5463(true)))((Pair_5293([opName_5492(p_5677.$1)]))([pm_5676])))
  } else if(((p_5677.$tag==1)&&true)&&((p_5677.$1.$tag==0)&&true)){
    $phi$578 = ((Pair_5293(((JSBinOp_5469("=="))(JSNum_5465(p_5677.$1.$0)))(pm_5676)))((Pair_5293([]))([])))
  } else if(((p_5677.$tag==1)&&true)&&((p_5677.$1.$tag==1)&&true)){
    $phi$578 = ((Pair_5293(((JSBinOp_5469("=="))(JSString_5464(p_5677.$1.$0)))(pm_5676)))((Pair_5293([]))([])))
  } else if((((p_5677.$tag==2)&&true)&&("True"==p_5677.$1))&&true){
    $phi$578 = ((Pair_5293(pm_5676))((Pair_5293([]))([])))
  } else if((((p_5677.$tag==2)&&true)&&("False"==p_5677.$1))&&true){
    $phi$578 = ((Pair_5293((JSUnOp_5470("!"))(pm_5676)))((Pair_5293([]))([])))
  } else if((((p_5677.$tag==2)&&true)&&true)&&true){
    let $phi$579;
    const $phi$580 = (((lookup_5315($instance_515))($instance_460))(p_5677.$1))(cons_5675);
    if(($phi$580.$tag==0)&&($phi$580.$0.$tag==1)){
      $phi$579 = (JSBool_5463(true))
    } else if(($phi$580.$tag==0)&&(($phi$580.$0.$tag==0)&&true)){
      $phi$579 = (((JSBinOp_5469("=="))((JSIndex_5471(pm_5676))(JSString_5464("$tag"))))(JSNum_5465($phi$580.$0.$0)))
    } else if(true){
      $phi$579 = (error("unknown data type in code gen: "+p_5677.$1))
    } else error("pattern match fail",$phi$580);
    const tagCheck_5692 = $phi$579;
    $phi$578 = (((foldl(a_5695 => b_5696 => {
      let $phi$581;
      if((true&&true)&&((true&&true)&&true)){
        let $phi$582;
        if((true&&true)&&((true&&true)&&true)){
          $phi$582 = ((Pair_5293(((JSBinOp_5469("&&"))(a_5695.$0))(b_5696.$0)))((Pair_5293((concat(a_5695.$1.$0))(b_5696.$1.$0)))((concat(a_5695.$1.$1))(b_5696.$1.$1))))
        } else error("pattern match fail",b_5696);
        $phi$581 = $phi$582
      } else error("pattern match fail",a_5695);
      return $phi$581
    }))((Pair_5293(tagCheck_5692))((Pair_5293([]))([]))))((map(p_5703 => {
      let $phi$583;
      if((true&&true)&&true){
        $phi$583 = (((processPattern_5485(cons_5675))((JSIndex_5471(pm_5676))(JSString_5464("$"+(intToString(p_5703.$0))))))(p_5703.$1))
      } else error("pattern match fail",p_5703);
      return $phi$583
    }))(zipWithIndex_5363(p_5677.$2))))
  } else if(true){
    $phi$578 = (error("failure to match pattern during processing"))
  } else error("pattern match fail",p_5677);
  return $phi$578
};
const addStmt_5475 = stmt_5503 => (($gt$gt$eq($instance_511))(gets_5346))(s_5504 => {
  let $phi$584;
  if((((true&&true)&&true)&&true)&&true){
    $phi$584 = (sets_5345((((RewriteState_5473(s_5504.$0))(s_5504.$1))((push(stmt_5503))(s_5504.$2)))(s_5504.$3)))
  } else error("pattern match fail",s_5504);
  return $phi$584
});
const addConst_5476 = n_5509 => e_5510 => addStmt_5475((JSConst_5452(opName_5492(n_5509)))(e_5510));
const newPhi_5477 = (($gt$gt$eq($instance_511))(gets_5346))(s_5511 => {
  let $phi$585;
  if((((true&&true)&&true)&&true)&&true){
    $phi$585 = ((($gt$gt_5374($instance_511))(sets_5345((((RewriteState_5473(s_5511.$0))(s_5511.$1))(s_5511.$2))(s_5511.$3+1))))((ret($instance_511))("$phi$"+(intToString(s_5511.$3)))))
  } else error("pattern match fail",s_5511);
  return $phi$585
});
const getRep_5480 = n_5542 => (($gt$gt$eq($instance_511))(gets_5346))(s_5543 => {
  let $phi$586;
  if((((true&&true)&&true)&&true)&&true){
    $phi$586 = ((ret($instance_511))((((lookup_5315($instance_515))($instance_460))(n_5542))(s_5543.$1)))
  } else error("pattern match fail",s_5543);
  return $phi$586
});
const getCons_5481 = (($gt$gt$eq($instance_511))(gets_5346))(s_5548 => {
  let $phi$587;
  if((((true&&true)&&true)&&true)&&true){
    $phi$587 = ((ret($instance_511))(s_5548.$0))
  } else error("pattern match fail",s_5548);
  return $phi$587
});
const dataConFieldIds_5489 = ts_5717 => (map(p_5718 => "$"+(intToString(fst_5307(p_5718)))))(zipWithIndex_5363(ts_5717));
const withRep_5479 = rep_5529 => m_5530 => (($gt$gt$eq($instance_511))(gets_5346))(s_5531 => {
  let $phi$588;
  if((((true&&true)&&true)&&true)&&true){
    $phi$588 = ((($gt$gt$eq($instance_511))((($gt$gt_5374($instance_511))(sets_5345((((RewriteState_5473(s_5531.$0))((((mergeTrie_5329($instance_515))($instance_460))(s_5531.$1))(rep_5529)))(s_5531.$2))(s_5531.$3))))(m_5530)))(r_5536 => (($gt$gt$eq($instance_511))(gets_5346))(s_5537 => {
      let $phi$589;
      if((((true&&true)&&true)&&true)&&true){
        $phi$589 = ((($gt$gt_5374($instance_511))(sets_5345((((RewriteState_5473(s_5537.$0))(s_5531.$1))(s_5537.$2))(s_5537.$3))))((ret($instance_511))(r_5536)))
      } else error("pattern match fail",s_5537);
      return $phi$589
    })))
  } else error("pattern match fail",s_5531);
  return $phi$588
});
const binOp2_5474 = op_5498 => a_5499 => b_5500 => (($gt$gt$eq($instance_511))(rewriteExpr_5482(a_5499)))(a_5501 => (($gt$gt$eq($instance_511))(rewriteExpr_5482(b_5500)))(b_5502 => (ret($instance_511))(((JSBinOp_5469(op_5498))(a_5501))(b_5502))));
const rewriteExprToStmts_5478 = w_5516 => e_5517 => (($gt$gt$eq($instance_511))(gets_5346))(s_5518 => {
  let $phi$590;
  if((((true&&true)&&true)&&true)&&true){
    $phi$590 = ((($gt$gt$eq($instance_511))((($gt$gt_5374($instance_511))(sets_5345((((RewriteState_5473(s_5518.$0))(s_5518.$1))([]))(s_5518.$3))))(rewriteExpr_5482(e_5517))))(e_5523 => (($gt$gt$eq($instance_511))(gets_5346))(s_5524 => {
      let $phi$591;
      if((((true&&true)&&true)&&true)&&true){
        $phi$591 = ((($gt$gt_5374($instance_511))(sets_5345((((RewriteState_5473(s_5524.$0))(s_5524.$1))(s_5518.$2))(s_5524.$3))))((ret($instance_511))((push(w_5516(e_5523)))(s_5524.$2))))
      } else error("pattern match fail",s_5524);
      return $phi$591
    })))
  } else error("pattern match fail",s_5518);
  return $phi$590
});
const rewriteExpr_5482 = e_5553 => {
  let $phi$592;
  if(((e_5553.$tag==0)&&true)&&("True"==e_5553.$1)){
    $phi$592 = ((ret($instance_511))(JSBool_5463(true)))
  } else if(((e_5553.$tag==0)&&true)&&("False"==e_5553.$1)){
    $phi$592 = ((ret($instance_511))(JSBool_5463(false)))
  } else if(((e_5553.$tag==0)&&true)&&true){
    $phi$592 = ((($gt$gt$eq($instance_511))(getRep_5480(opName_5492(e_5553.$1))))(r_5558 => {
      let $phi$597;
      if(r_5558.$tag==1){
        $phi$597 = ((ret($instance_511))(JSRef_5472(opName_5492(e_5553.$1))))
      } else if((r_5558.$tag==0)&&true){
        $phi$597 = ((ret($instance_511))(r_5558.$0))
      } else error("pattern match fail",r_5558);
      return $phi$597
    }))
  } else if(((e_5553.$tag==1)&&true)&&((e_5553.$1.$tag==0)&&true)){
    $phi$592 = ((ret($instance_511))(JSNum_5465(e_5553.$1.$0)))
  } else if(((e_5553.$tag==1)&&true)&&((e_5553.$1.$tag==1)&&true)){
    $phi$592 = ((ret($instance_511))(JSString_5464(e_5553.$1.$0)))
  } else if((((e_5553.$tag==2)&&true)&&((((e_5553.$1.$tag==2)&&true)&&(((e_5553.$1.$1.$tag==0)&&true)&&("+"==e_5553.$1.$1.$1)))&&true))&&true){
    $phi$592 = (((binOp2_5474("+"))(e_5553.$1.$2))(e_5553.$2))
  } else if((((e_5553.$tag==2)&&true)&&((((e_5553.$1.$tag==2)&&true)&&(((e_5553.$1.$1.$tag==0)&&true)&&("-"==e_5553.$1.$1.$1)))&&true))&&true){
    $phi$592 = (((binOp2_5474("-"))(e_5553.$1.$2))(e_5553.$2))
  } else if((((e_5553.$tag==2)&&true)&&((((e_5553.$1.$tag==2)&&true)&&(((e_5553.$1.$1.$tag==0)&&true)&&("*"==e_5553.$1.$1.$1)))&&true))&&true){
    $phi$592 = (((binOp2_5474("*"))(e_5553.$1.$2))(e_5553.$2))
  } else if((((e_5553.$tag==2)&&true)&&((((e_5553.$1.$tag==2)&&true)&&(((e_5553.$1.$1.$tag==0)&&true)&&("++"==e_5553.$1.$1.$1)))&&true))&&true){
    $phi$592 = (((binOp2_5474("+"))(e_5553.$1.$2))(e_5553.$2))
  } else if((((e_5553.$tag==2)&&true)&&((((e_5553.$1.$tag==2)&&true)&&(((e_5553.$1.$1.$tag==0)&&true)&&("&&"==e_5553.$1.$1.$1)))&&true))&&true){
    $phi$592 = (((binOp2_5474("&&"))(e_5553.$1.$2))(e_5553.$2))
  } else if((((e_5553.$tag==2)&&true)&&((((e_5553.$1.$tag==2)&&true)&&(((e_5553.$1.$1.$tag==0)&&true)&&("||"==e_5553.$1.$1.$1)))&&true))&&true){
    $phi$592 = (((binOp2_5474("||"))(e_5553.$1.$2))(e_5553.$2))
  } else if((((e_5553.$tag==2)&&true)&&((((e_5553.$1.$tag==2)&&true)&&(((e_5553.$1.$1.$tag==0)&&true)&&("jsLt"==e_5553.$1.$1.$1)))&&true))&&true){
    $phi$592 = (((binOp2_5474("<"))(e_5553.$1.$2))(e_5553.$2))
  } else if((((e_5553.$tag==2)&&true)&&((((e_5553.$1.$tag==2)&&true)&&(((e_5553.$1.$1.$tag==0)&&true)&&("jsEq"==e_5553.$1.$1.$1)))&&true))&&true){
    $phi$592 = (((binOp2_5474("==="))(e_5553.$1.$2))(e_5553.$2))
  } else if((((e_5553.$tag==2)&&true)&&((((e_5553.$1.$tag==2)&&true)&&(((e_5553.$1.$1.$tag==0)&&true)&&("bitAnd"==e_5553.$1.$1.$1)))&&true))&&true){
    $phi$592 = (((binOp2_5474("&"))(e_5553.$1.$2))(e_5553.$2))
  } else if((((e_5553.$tag==2)&&true)&&((((e_5553.$1.$tag==2)&&true)&&(((e_5553.$1.$1.$tag==0)&&true)&&("bitOr"==e_5553.$1.$1.$1)))&&true))&&true){
    $phi$592 = (((binOp2_5474("|"))(e_5553.$1.$2))(e_5553.$2))
  } else if((((e_5553.$tag==2)&&true)&&((((e_5553.$1.$tag==2)&&true)&&(((e_5553.$1.$1.$tag==0)&&true)&&("bitShiftLeft"==e_5553.$1.$1.$1)))&&true))&&true){
    $phi$592 = (((binOp2_5474("<<"))(e_5553.$1.$2))(e_5553.$2))
  } else if((((e_5553.$tag==2)&&true)&&((((e_5553.$1.$tag==2)&&true)&&(((e_5553.$1.$1.$tag==0)&&true)&&("bitShiftRight"==e_5553.$1.$1.$1)))&&true))&&true){
    $phi$592 = (((binOp2_5474(">>>"))(e_5553.$1.$2))(e_5553.$2))
  } else if((((e_5553.$tag==2)&&true)&&true)&&true){
    $phi$592 = ((($gt$gt$eq($instance_511))(rewriteExpr_5482(e_5553.$1)))(f_5627 => (($gt$gt$eq($instance_511))(rewriteExpr_5482(e_5553.$2)))(a_5628 => (ret($instance_511))((JSCall_5468(f_5627))([a_5628])))))
  } else if((((e_5553.$tag==3)&&true)&&true)&&true){
    $phi$592 = ((($gt$gt$eq($instance_511))((rewriteExprToStmts_5478(JSReturn_5454))(e_5553.$2)))(stmts_5632 => (ret($instance_511))((JSFun_5467([e_5553.$1]))(stmts_5632))))
  } else if((((e_5553.$tag==4)&&true)&&true)&&true){
    $phi$592 = ((($gt$gt$eq($instance_511))(newPhi_5477))(phiOut_5636 => (($gt$gt$eq($instance_511))((($gt$gt_5374($instance_511))(addStmt_5475((JSLet_5451(phiOut_5636))(Nothing_5300))))(rewriteExpr_5482(e_5553.$1))))(e_5637 => {
      let $phi$596;
      if((e_5637.$tag==0)&&true){
        $phi$596 = ((ret($instance_511))(e_5637))
      } else if(((e_5637.$tag==1)&&true)&&true){
        $phi$596 = ((ret($instance_511))(e_5637))
      } else if(true){
        $phi$596 = ((($gt$gt$eq($instance_511))(newPhi_5477))(p_5642 => (($gt$gt_5374($instance_511))((addConst_5476(p_5642))(e_5637)))((ret($instance_511))(JSRef_5472(p_5642)))))
      } else error("pattern match fail",e_5637);
      return (($gt$gt$eq($instance_511))($phi$596))(phiIn_5643 => (($gt$gt_5374($instance_511))((($gt$gt$eq($instance_511))((((foldM_5347($instance_511))((assemblePatternMatch2_5483(phiIn_5643))(phiOut_5636)))(JSExpr_5455((JSCall_5468(JSRef_5472("error")))([JSString_5464("pattern match fail"),phiIn_5643]))))(reverse_5352(e_5553.$2))))(addStmt_5475)))((ret($instance_511))(JSRef_5472(phiOut_5636))))
    })))
  } else if((((e_5553.$tag==5)&&true)&&true)&&true){
    $phi$592 = ((($gt$gt_5374($instance_511))(((mapM_5348($instance_511))(d_5647 => {
      let $phi$595;
      if((true&&true)&&true){
        $phi$595 = ((($gt$gt$eq($instance_511))(rewriteExpr_5482(d_5647.$1)))(addConst_5476(d_5647.$0)))
      } else error("pattern match fail",d_5647);
      return $phi$595
    }))(e_5553.$1)))(rewriteExpr_5482(e_5553.$2)))
  } else if((((e_5553.$tag==6)&&true)&&("Array"==e_5553.$1))&&true){
    $phi$592 = ((($gt$gt$eq($instance_511))(((mapM_5348($instance_511))(rewriteExpr_5482))(e_5553.$2)))(es_5652 => (ret($instance_511))(JSArray_5461(es_5652))))
  } else if((((e_5553.$tag==6)&&true)&&true)&&true){
    $phi$592 = ((($gt$gt$eq($instance_511))(((mapM_5348($instance_511))(rewriteExpr_5482))(e_5553.$2)))(es_5656 => (($gt$gt$eq($instance_511))(getCons_5481))(cons_5657 => {
      let $phi$593;
      const $phi$594 = (((lookup_5315($instance_515))($instance_460))(e_5553.$1))(cons_5657);
      if($phi$594.$tag==1){
        $phi$593 = (error("unrecognized tag in New: "+e_5553.$1))
      } else if(($phi$594.$tag==0)&&($phi$594.$0.$tag==1)){
        $phi$593 = ((ret($instance_511))(JSObject_5462((zip_5361(dataConFieldIds_5489(es_5656)))(es_5656))))
      } else if(($phi$594.$tag==0)&&(($phi$594.$0.$tag==0)&&true)){
        $phi$593 = ((ret($instance_511))(JSObject_5462((push((Pair_5293("$tag"))(JSNum_5465($phi$594.$0.$0))))((zip_5361(dataConFieldIds_5489(es_5656)))(es_5656)))))
      } else error("pattern match fail",$phi$594);
      return $phi$593
    })))
  } else error("pattern match fail",e_5553);
  return $phi$592
};
const assemblePatternMatch2_5483 = phiIn_5659 => phiOut_5660 => alt_5661 => p_5662 => (($gt$gt$eq($instance_511))(getCons_5481))(cons_5663 => {
  let $phi$598;
  if((true&&true)&&true){
    let $phi$599;
    const $phi$600 = ((processPattern_5485(cons_5663))(phiIn_5659))(p_5662.$0);
    if((true&&true)&&((true&&true)&&true)){
      const rep_5669 = ((foldl(r_5670 => p_5671 => ((((insert_5323($instance_515))($instance_460))(fst_5307(p_5671)))(snd_5297(p_5671)))(r_5670)))(Empty_5302))((zip_5361($phi$600.$1.$0))($phi$600.$1.$1));
      $phi$599 = ((($gt$gt$eq($instance_511))((withRep_5479(rep_5669))((rewriteExprToStmts_5478(JSAssign_5448(JSRef_5472(phiOut_5660))))(p_5662.$1))))(stmts_5672 => (ret($instance_511))(((JSIf_5447($phi$600.$0))(stmts_5672))([alt_5661]))))
    } else error("pattern match fail",$phi$600);
    $phi$598 = $phi$599
  } else error("pattern match fail",p_5662);
  return $phi$598
});
const requireExpr_5486 = f_5707 => (JSCall_5468(JSRef_5472("_require")))([JSString_5464(f_5707)]);
const buildImports_5487 = f_5708 => ns_5709 => (map(n_5710 => {
  let $phi$601;
  if((true&&true)&&true){
    $phi$601 = ((JSConst_5452(opName_5492(n_5710.$1)))((JSIndex_5471(requireExpr_5486(f_5708)))(JSString_5464(opName_5492(n_5710.$0)))))
  } else error("pattern match fail",n_5710);
  return $phi$601
}))(ns_5709);
const importToJs_5488 = i_5713 => {
  let $phi$602;
  if((((i_5713.$tag==1)&&true)&&true)&&true){
    $phi$602 = ((buildImports_5487(i_5713.$1))(i_5713.$2))
  } else error("pattern match fail",i_5713);
  return $phi$602
};
const exportObject_5490 = bs_5719 => {
  const f_5720 = b_5721 => {
    let $phi$603;
    if((true&&true)&&true){
      let $phi$604;
      const $phi$605 = (((getAnn_5400($instance_515))($instance_460))("export"))(annOf_5404(b_5721.$1));
      if($phi$605.$tag==1){
        $phi$604 = Nothing_5300
      } else if(($phi$605.$tag==0)&&(($phi$605.$0.$tag==5)&&true)){
        $phi$604 = (Just_5299((Pair_5293(opName_5492($phi$605.$0.$0)))(JSRef_5472(opName_5492(b_5721.$0)))))
      } else error("pattern match fail",$phi$605);
      $phi$603 = $phi$604
    } else error("pattern match fail",b_5721);
    return $phi$603
  };
  return JSObject_5462((mapJust_5359(f_5720))(bs_5719))
};
const moduleToJs_5491 = m_5725 => {
  let $phi$606;
  if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
    const f_5744 = p_5745 => {
      let $phi$607;
      if((true&&true)&&true){
        $phi$607 = (not_5320(isJust_5301((((getAnn_5400($instance_515))($instance_460))("dead"))(annOf_5404(p_5745.$1)))))
      } else error("pattern match fail",p_5745);
      return $phi$607
    };
    const vs2_5736 = (filter(f_5744))(m_5725.$6);
    const exportDef_5738 = (JSConst_5452("exports"))(exportObject_5490(vs2_5736));
    const gatherCons_5734 = local$instance$Hashable$1 => local$instance$Eq$0 => m_5739 => d_5740 => {
      let $phi$608;
      if((true&&true)&&true){
        let $phi$609;
        const $phi$610 = (((getAnn_5400($instance_515))($instance_460))("data"))(annOf_5404(d_5740.$1));
        if($phi$610.$tag==1){
          $phi$609 = m_5739
        } else if(($phi$610.$tag==0)&&(($phi$610.$0.$tag==3)&&true)){
          $phi$609 = (((((insert_5323(local$instance$Hashable$1))(local$instance$Eq$0))(d_5740.$0))($phi$610.$0.$0))(m_5739))
        } else error("pattern match fail",$phi$610);
        $phi$608 = $phi$609
      } else error("pattern match fail",d_5740);
      return $phi$608
    };
    const cons_5735 = ((foldl((gatherCons_5734($instance_515))($instance_460)))(Empty_5302))(m_5725.$6);
    const defs_5737 = ($_5306(foldl1(concat)))((evalState_5344((((RewriteState_5473(cons_5735))(Empty_5302))([]))(0)))(((mapM_5348($instance_511))(v_5748 => {
      let $phi$611;
      if((true&&true)&&true){
        $phi$611 = ((rewriteExprToStmts_5478(JSConst_5452(opName_5492(v_5748.$0))))(v_5748.$1))
      } else error("pattern match fail",v_5748);
      return $phi$611
    }))(vs2_5736)));
    const imports_5733 = (concatMap_5360(importToJs_5488))(m_5725.$2);
    $phi$606 = ((push(exportDef_5738))((concat(imports_5733))(defs_5737)))
  } else error("pattern match fail",m_5725);
  return $phi$606
};
const checkUndefined_5484 = label_5673 => expr_5674 => ((JSTernary_5466(((JSBinOp_5469("==="))(expr_5674))(JSUndefined_5459)))((JSCall_5468(JSRef_5472("error")))([JSString_5464(label_5673)])))(expr_5674);
const assert_5757 = assert_90;
const Pair_5758 = Pair_3;
const mapSnd_5759 = mapSnd_89;
const mapFst_5760 = mapFst_88;
const $gt$eq$gt_5761 = $gt$eq$gt_87;
const snd_5762 = snd_27;
const debug2_5763 = debug2_86;
const Just_5764 = Just_1;
const Nothing_5765 = Nothing_2;
const isJust_5766 = isJust_25;
const Empty_5767 = Empty_11;
const Leaf_5768 = Leaf_12;
const Collision_5769 = Collision_13;
const BitmapIndexed_5770 = BitmapIndexed_14;
const $_5771 = $_16;
const fst_5772 = fst_26;
const Left_5773 = Left_8;
const Right_5774 = Right_9;
const loop_5775 = loop_31;
const find_5776 = find_33;
const hamtMask_5777 = hamtMask_62;
const popCount_5778 = popCount_61;
const hamtIndex_5779 = hamtIndex_63;
const lookup_5780 = lookup_64;
const setContains_5781 = setContains_81;
const foldTrie_5782 = foldTrie_70;
const emptySet_5783 = emptySet_77;
const Unit_5784 = Unit_0;
const not_5785 = not_30;
const $div$eq_5786 = $div$eq_17;
const mapIx_5787 = mapIx_34;
const insert_5788 = insert_65;
const setAdd_5789 = setAdd_78;
const setIntersection_5790 = setIntersection_85;
const remove_5791 = remove_67;
const setDiff_5792 = setDiff_84;
const setToArray_5793 = setToArray_83;
const mergeTrie_5794 = mergeTrie_74;
const setUnion_5795 = setUnion_82;
const setRemove_5796 = setRemove_80;
const setAddAll_5797 = setAddAll_79;
const trieEntries_5798 = trieEntries_76;
const trieKeys_5799 = trieKeys_75;
const size_5800 = size_72;
const mapTrie_5801 = mapTrie_71;
const nodeMask_5802 = nodeMask_60;
const isEmpty_5803 = isEmpty_73;
const filterTrie_5804 = filterTrie_69;
const nextSetBitMask_5805 = nextSetBitMask_68;
const updateOrSet_5806 = updateOrSet_66;
const State_5807 = State_10;
const runState_5808 = runState_58;
const evalState_5809 = evalState_59;
const sets_5810 = sets_57;
const gets_5811 = gets_56;
const foldM_5812 = foldM_53;
const mapM_5813 = mapM_54;
const forM_5814 = forM_55;
const strToArray_5815 = strToArray_52;
const toRecord_5816 = toRecord_51;
const reverse_5817 = reverse_50;
const tail_5818 = tail_45;
const head_5819 = head_44;
const uniq_5820 = uniq_49;
const mergeSet_5821 = mergeSet_48;
const init_5822 = init_47;
const last_5823 = last_46;
const mapJust_5824 = mapJust_43;
const concatMap_5825 = concatMap_42;
const zip_5826 = zip_41;
const zipWithIndex2_5827 = zipWithIndex2_39;
const zipWithIndex_5828 = zipWithIndex_40;
const join_5829 = join_38;
const all_5830 = all_37;
const exists_5831 = exists_36;
const containsChar_5832 = containsChar_35;
const contains_5833 = contains_32;
const either_5834 = either_28;
const splitEither_5835 = splitEither_29;
const fromJust_5836 = fromJust_24;
const justOr_5837 = justOr_23;
const maybe_5838 = maybe_22;
const $gt$gt_5839 = $gt$gt_21;
const $gt$eq_5840 = $gt$eq_20;
const $lt$eq_5841 = $lt$eq_19;
const $gt_5842 = $gt_18;
const Identity_5843 = Identity_15;
const Tuple6_5844 = Tuple6_7;
const Tuple5_5845 = Tuple5_6;
const Tuple4_5846 = Tuple4_5;
const Tuple3_5847 = Tuple3_4;
const moduleToJs_5848 = moduleToJs_5491;
const jsExprToString_5849 = jsExprToString_5202;
const jsStmtToString_5850 = jsStmtToString_5205;
const rewriteStmt_5851 = rewriteStmt_5037;
const compileModule_5852 = builtinsPath_5853 => m_5854 => {
  const runStmt_5860 = "if (module.exports.main)module.exports.main(process.argv)";
  const requireFun_5859 = ("function _require(f) {\n"+"  return f == \"./builtins.js\" ? $$builtins : require(f);\n")+"}\n";
  const js_5857 = (join_5829((map(jsStmtToString_5850(0)))((concatMap_5825(rewriteStmt_5851))(moduleToJs_5848(m_5854)))))(";\n");
  const wrapModule_5858 = m_5861 => ("(function() {"+js_5857)+"\nmodule.exports = exports;})();";
  const fullBuiltins_5855 = readFile(builtinsPath_5853);
  const wrappedBuiltins_5856 = ("const $$builtins = (function() {\n const module = {};\n"+fullBuiltins_5855)+";\n return builtins})();\n";
  return ((wrappedBuiltins_5856+requireFun_5859)+(wrapModule_5858(m_5854)))+runStmt_5860
};
const assert_5862 = assert_90;
const Pair_5863 = Pair_3;
const mapSnd_5864 = mapSnd_89;
const mapFst_5865 = mapFst_88;
const $gt$eq$gt_5866 = $gt$eq$gt_87;
const snd_5867 = snd_27;
const debug2_5868 = debug2_86;
const Just_5869 = Just_1;
const Nothing_5870 = Nothing_2;
const isJust_5871 = isJust_25;
const Empty_5872 = Empty_11;
const Leaf_5873 = Leaf_12;
const Collision_5874 = Collision_13;
const BitmapIndexed_5875 = BitmapIndexed_14;
const $_5876 = $_16;
const fst_5877 = fst_26;
const Left_5878 = Left_8;
const Right_5879 = Right_9;
const loop_5880 = loop_31;
const find_5881 = find_33;
const hamtMask_5882 = hamtMask_62;
const popCount_5883 = popCount_61;
const hamtIndex_5884 = hamtIndex_63;
const lookup_5885 = lookup_64;
const setContains_5886 = setContains_81;
const foldTrie_5887 = foldTrie_70;
const emptySet_5888 = emptySet_77;
const Unit_5889 = Unit_0;
const not_5890 = not_30;
const $div$eq_5891 = $div$eq_17;
const mapIx_5892 = mapIx_34;
const insert_5893 = insert_65;
const setAdd_5894 = setAdd_78;
const setIntersection_5895 = setIntersection_85;
const remove_5896 = remove_67;
const setDiff_5897 = setDiff_84;
const setToArray_5898 = setToArray_83;
const mergeTrie_5899 = mergeTrie_74;
const setUnion_5900 = setUnion_82;
const setRemove_5901 = setRemove_80;
const setAddAll_5902 = setAddAll_79;
const trieEntries_5903 = trieEntries_76;
const trieKeys_5904 = trieKeys_75;
const size_5905 = size_72;
const mapTrie_5906 = mapTrie_71;
const nodeMask_5907 = nodeMask_60;
const isEmpty_5908 = isEmpty_73;
const filterTrie_5909 = filterTrie_69;
const nextSetBitMask_5910 = nextSetBitMask_68;
const updateOrSet_5911 = updateOrSet_66;
const State_5912 = State_10;
const runState_5913 = runState_58;
const evalState_5914 = evalState_59;
const sets_5915 = sets_57;
const gets_5916 = gets_56;
const foldM_5917 = foldM_53;
const mapM_5918 = mapM_54;
const forM_5919 = forM_55;
const strToArray_5920 = strToArray_52;
const toRecord_5921 = toRecord_51;
const reverse_5922 = reverse_50;
const tail_5923 = tail_45;
const head_5924 = head_44;
const uniq_5925 = uniq_49;
const mergeSet_5926 = mergeSet_48;
const init_5927 = init_47;
const last_5928 = last_46;
const mapJust_5929 = mapJust_43;
const concatMap_5930 = concatMap_42;
const zip_5931 = zip_41;
const zipWithIndex2_5932 = zipWithIndex2_39;
const zipWithIndex_5933 = zipWithIndex_40;
const join_5934 = join_38;
const all_5935 = all_37;
const exists_5936 = exists_36;
const containsChar_5937 = containsChar_35;
const contains_5938 = contains_32;
const either_5939 = either_28;
const splitEither_5940 = splitEither_29;
const fromJust_5941 = fromJust_24;
const justOr_5942 = justOr_23;
const maybe_5943 = maybe_22;
const $gt$gt_5944 = $gt$gt_21;
const $gt$eq_5945 = $gt$eq_20;
const $lt$eq_5946 = $lt$eq_19;
const $gt_5947 = $gt_18;
const Identity_5948 = Identity_15;
const Tuple6_5949 = Tuple6_7;
const Tuple5_5950 = Tuple5_6;
const Tuple4_5951 = Tuple4_5;
const Tuple3_5952 = Tuple3_4;
const Success_5953 = $_0_5968 => $_1_5969 => ({$0:$_0_5968,$1:$_1_5969,$tag:0});
const Error_5954 = $_0_5970 => ({$0:$_0_5970,$tag:1});
const Parser_5955 = $_0_5971 => ({$0:$_0_5971});
const $instance_6012 = $class$Functor(f_6005 => pa_6006 => {
  let $phi$612;
  if(true&&true){
    $phi$612 = (Parser_5955(i_6008 => {
      let $phi$613;
      const $phi$614 = pa_6006.$0(i_6008);
      if(($phi$614.$tag==1)&&true){
        $phi$613 = (Error_5954($phi$614.$0))
      } else if((($phi$614.$tag==0)&&true)&&true){
        $phi$613 = ((Success_5953(f_6005($phi$614.$0)))($phi$614.$1))
      } else error("pattern match fail",$phi$614);
      return $phi$613
    }))
  } else error("pattern match fail",pa_6006);
  return $phi$612
});
const $instance_6025 = ($class$Applicative(x_6013 => Parser_5955(Success_5953(x_6013))))(pf_6014 => pa_6015 => {
  let $phi$615;
  if(true&&true){
    let $phi$616;
    if(true&&true){
      $phi$616 = (Parser_5955(i_6018 => {
        let $phi$617;
        const $phi$618 = pf_6014.$0(i_6018);
        if(($phi$618.$tag==1)&&true){
          $phi$617 = (Error_5954($phi$618.$0))
        } else if((($phi$618.$tag==0)&&true)&&true){
          let $phi$619;
          const $phi$620 = pa_6015.$0($phi$618.$1);
          if(($phi$620.$tag==1)&&true){
            $phi$619 = (Error_5954($phi$620.$0))
          } else if((($phi$620.$tag==0)&&true)&&true){
            $phi$619 = ((Success_5953($phi$618.$0($phi$620.$0)))($phi$620.$1))
          } else error("pattern match fail",$phi$620);
          $phi$617 = $phi$619
        } else error("pattern match fail",$phi$618);
        return $phi$617
      }))
    } else error("pattern match fail",pa_6015);
    $phi$615 = $phi$616
  } else error("pattern match fail",pf_6014);
  return $phi$615
});
const $instance_6035 = ($class$Alternative(Parser_5955(__6026 => Error_5954("parser failure"))))(pa_6027 => pb_6028 => {
  let $phi$621;
  if(true&&true){
    let $phi$622;
    if(true&&true){
      $phi$622 = (Parser_5955(i_6031 => {
        let $phi$623;
        const $phi$624 = pa_6027.$0(i_6031);
        if(($phi$624.$tag==1)&&true){
          $phi$623 = (pb_6028.$0(i_6031))
        } else if((($phi$624.$tag==0)&&true)&&true){
          $phi$623 = ((Success_5953($phi$624.$0))($phi$624.$1))
        } else error("pattern match fail",$phi$624);
        return $phi$623
      }))
    } else error("pattern match fail",pb_6028);
    $phi$621 = $phi$622
  } else error("pattern match fail",pa_6027);
  return $phi$621
});
const upperCaseLetters_5966 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letters_5967 = "abcdefghijklmnopqrstuvwxyz"+upperCaseLetters_5966;
const digits_5965 = "0123456789";
const applyParser_5956 = p_5972 => i_5973 => {
  let $phi$625;
  if(true&&true){
    $phi$625 = (p_5972.$0(i_5973))
  } else error("pattern match fail",p_5972);
  return $phi$625
};
const many_5959 = p_5983 => {
  const manyIterate_5984 = s_5985 => {
    const r_5986 = ((iterate(Left_5878((Success_5953([]))(s_5985))))(r_5987 => {
      let $phi$626;
      if((r_5987.$tag==0)&&true){
        $phi$626 = false
      } else if((r_5987.$tag==1)&&true){
        $phi$626 = true
      } else error("pattern match fail",r_5987);
      return $phi$626
    }))(rs_5990 => {
      let $phi$627;
      if((rs_5990.$tag==0)&&(((rs_5990.$0.$tag==0)&&true)&&true)){
        let $phi$628;
        const $phi$629 = (applyParser_5956(p_5983))(rs_5990.$0.$1);
        if((($phi$629.$tag==0)&&true)&&true){
          $phi$628 = (Left_5878((Success_5953((push($phi$629.$0))(rs_5990.$0.$0)))($phi$629.$1)))
        } else if(($phi$629.$tag==1)&&true){
          $phi$628 = (Right_5879((Success_5953(rs_5990.$0.$0))(rs_5990.$0.$1)))
        } else error("pattern match fail",$phi$629);
        $phi$627 = $phi$628
      } else error("pattern match fail",rs_5990);
      return $phi$627
    });
    let $phi$630;
    if((r_5986.$tag==1)&&true){
      $phi$630 = r_5986.$0
    } else if((r_5986.$tag==0)&&true){
      $phi$630 = (error("manyIterate should never return a Left"))
    } else error("pattern match fail",r_5986);
    return $phi$630
  };
  return Parser_5955(manyIterate_5984)
};
const $pip$gt_5957 = local$instance$Applicative$0 => a_5975 => b_5976 => (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(__5977 => b_5978 => b_5978)))(a_5975)))(b_5976);
const sepBy1_5962 = p_6000 => sp_6001 => (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(enqueue)))(p_6000)))(many_5959((($pip$gt_5957($instance_6025))(sp_6001))(p_6000)));
const success_5961 = a_5999 => Parser_5955(Success_5953(a_5999));
const opt_5964 = a_6004 => (($lt$pip$gt($instance_6035))((($lt$mul$gt($instance_6025))((pure($instance_6025))(Just_5869)))(a_6004)))(success_5961(Nothing_5870));
const sepBy_5963 = p_6002 => sp_6003 => (($lt$mul$gt($instance_6025))((pure($instance_6025))(justOr_5942([]))))(opt_5964((sepBy1_5962(p_6002))(sp_6003)));
const some_5960 = p_5998 => (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(enqueue)))(p_5998)))(many_5959(p_5998));
const $lt$pip_5958 = local$instance$Applicative$0 => a_5979 => b_5980 => (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(a_5981 => __5982 => a_5981)))(a_5979)))(b_5980);
const assert_6036 = assert_90;
const Pair_6037 = Pair_3;
const mapSnd_6038 = mapSnd_89;
const mapFst_6039 = mapFst_88;
const $gt$eq$gt_6040 = $gt$eq$gt_87;
const snd_6041 = snd_27;
const debug2_6042 = debug2_86;
const Just_6043 = Just_1;
const Nothing_6044 = Nothing_2;
const isJust_6045 = isJust_25;
const Empty_6046 = Empty_11;
const Leaf_6047 = Leaf_12;
const Collision_6048 = Collision_13;
const BitmapIndexed_6049 = BitmapIndexed_14;
const $_6050 = $_16;
const fst_6051 = fst_26;
const Left_6052 = Left_8;
const Right_6053 = Right_9;
const loop_6054 = loop_31;
const find_6055 = find_33;
const hamtMask_6056 = hamtMask_62;
const popCount_6057 = popCount_61;
const hamtIndex_6058 = hamtIndex_63;
const lookup_6059 = lookup_64;
const setContains_6060 = setContains_81;
const foldTrie_6061 = foldTrie_70;
const emptySet_6062 = emptySet_77;
const Unit_6063 = Unit_0;
const not_6064 = not_30;
const $div$eq_6065 = $div$eq_17;
const mapIx_6066 = mapIx_34;
const insert_6067 = insert_65;
const setAdd_6068 = setAdd_78;
const setIntersection_6069 = setIntersection_85;
const remove_6070 = remove_67;
const setDiff_6071 = setDiff_84;
const setToArray_6072 = setToArray_83;
const mergeTrie_6073 = mergeTrie_74;
const setUnion_6074 = setUnion_82;
const setRemove_6075 = setRemove_80;
const setAddAll_6076 = setAddAll_79;
const trieEntries_6077 = trieEntries_76;
const trieKeys_6078 = trieKeys_75;
const size_6079 = size_72;
const mapTrie_6080 = mapTrie_71;
const nodeMask_6081 = nodeMask_60;
const isEmpty_6082 = isEmpty_73;
const filterTrie_6083 = filterTrie_69;
const nextSetBitMask_6084 = nextSetBitMask_68;
const updateOrSet_6085 = updateOrSet_66;
const State_6086 = State_10;
const runState_6087 = runState_58;
const evalState_6088 = evalState_59;
const sets_6089 = sets_57;
const gets_6090 = gets_56;
const foldM_6091 = foldM_53;
const mapM_6092 = mapM_54;
const forM_6093 = forM_55;
const strToArray_6094 = strToArray_52;
const toRecord_6095 = toRecord_51;
const reverse_6096 = reverse_50;
const tail_6097 = tail_45;
const head_6098 = head_44;
const uniq_6099 = uniq_49;
const mergeSet_6100 = mergeSet_48;
const init_6101 = init_47;
const last_6102 = last_46;
const mapJust_6103 = mapJust_43;
const concatMap_6104 = concatMap_42;
const zip_6105 = zip_41;
const zipWithIndex2_6106 = zipWithIndex2_39;
const zipWithIndex_6107 = zipWithIndex_40;
const join_6108 = join_38;
const all_6109 = all_37;
const exists_6110 = exists_36;
const containsChar_6111 = containsChar_35;
const contains_6112 = contains_32;
const either_6113 = either_28;
const splitEither_6114 = splitEither_29;
const fromJust_6115 = fromJust_24;
const justOr_6116 = justOr_23;
const maybe_6117 = maybe_22;
const $gt$gt_6118 = $gt$gt_21;
const $gt$eq_6119 = $gt$eq_20;
const $lt$eq_6120 = $lt$eq_19;
const $gt_6121 = $gt_18;
const Identity_6122 = Identity_15;
const Tuple6_6123 = Tuple6_7;
const Tuple5_6124 = Tuple5_6;
const Tuple4_6125 = Tuple4_5;
const Tuple3_6126 = Tuple3_4;
const upperCaseLetters_6127 = upperCaseLetters_5966;
const letters_6128 = letters_5967;
const digits_6129 = digits_5965;
const Success_6130 = Success_5953;
const Error_6131 = Error_5954;
const Parser_6132 = Parser_5955;
const applyParser_6133 = applyParser_5956;
const many_6134 = many_5959;
const $pip$gt_6135 = $pip$gt_5957;
const sepBy1_6136 = sepBy1_5962;
const success_6137 = success_5961;
const opt_6138 = opt_5964;
const sepBy_6139 = sepBy_5963;
const some_6140 = some_5960;
const $lt$pip_6141 = $lt$pip_5958;
const LexerState_6142 = $_0_6172 => $_1_6173 => $_2_6174 => $_3_6175 => ({$0:$_0_6172,$1:$_1_6173,$2:$_2_6174,$3:$_3_6175});
const WsTok_6143 = {$tag:0};
const Token_6150 = $_0_6176 => $_1_6177 => $_2_6178 => $_3_6179 => ({$0:$_0_6176,$1:$_1_6177,$2:$_2_6178,$3:$_3_6179});
const NumTok_6145 = {$tag:2};
const ComTok_6149 = {$tag:6};
const SymTok_6144 = {$tag:1};
const IdTok_6148 = {$tag:5};
const OpTok_6147 = {$tag:4};
const StrTok_6146 = {$tag:3};
const runLexer_6153 = p_6190 => s_6191 => {
  let $phi$631;
  if(true&&true){
    $phi$631 = (p_6190.$0((((LexerState_6142(s_6191))(0))(0))(0)))
  } else error("pattern match fail",p_6190);
  return $phi$631
};
const mkTok_6151 = t_6180 => {
  const parse_6181 = i_6182 => {
    let $phi$632;
    if((((true&&true)&&true)&&true)&&true){
      $phi$632 = ((Success_6130(r_6187 => (((Token_6150(t_6180))(r_6187))(i_6182.$2))(i_6182.$3)))(i_6182))
    } else error("pattern match fail",i_6182);
    return $phi$632
  };
  return Parser_6132(parse_6181)
};
const parseChar_6154 = p_6193 => {
  const parse_6194 = s_6195 => {
    let $phi$633;
    if((((true&&true)&&true)&&true)&&true){
      let $phi$634;
      const $phi$635 = (($lt($instance_461))(s_6195.$1))(length(s_6195.$0));
      if(!$phi$635){
        $phi$634 = (Error_6131("no more input available"))
      } else if($phi$635){
        let $phi$636;
        const $phi$637 = p_6193((getChar(s_6195.$1))(s_6195.$0));
        if(!$phi$637){
          $phi$636 = (Error_6131("parser failed"))
        } else if($phi$637){
          let $phi$638;
          const $phi$639 = (getChar(s_6195.$1))(s_6195.$0);
          if("\n"==$phi$639){
            $phi$638 = ((Success_6130((getChar(s_6195.$1))(s_6195.$0)))((((LexerState_6142(s_6195.$0))(s_6195.$1+1))(s_6195.$2+1))(0)))
          } else if(true){
            $phi$638 = ((Success_6130((getChar(s_6195.$1))(s_6195.$0)))((((LexerState_6142(s_6195.$0))(s_6195.$1+1))(s_6195.$2))(s_6195.$3+1)))
          } else error("pattern match fail",$phi$639);
          $phi$636 = $phi$638
        } else error("pattern match fail",$phi$637);
        $phi$634 = $phi$636
      } else error("pattern match fail",$phi$635);
      $phi$633 = $phi$634
    } else error("pattern match fail",s_6195);
    return $phi$633
  };
  return Parser_6132(parse_6194)
};
const charP_6156 = cs_6202 => parseChar_6154(c_6203 => (containsChar_6111(c_6203))(cs_6202));
const concatStr_6152 = (foldl(cs_6188 => c_6189 => cs_6188+c_6189))("");
const someStr_6159 = p_6207 => (($lt$mul$gt($instance_6025))((pure($instance_6025))(concatStr_6152)))(some_6140(p_6207));
const whitespaceP_6162 = (($lt$mul$gt($instance_6025))(mkTok_6151(WsTok_6143)))(someStr_6159(charP_6156(" \n")));
const intP_6163 = someStr_6159(charP_6156(digits_6129));
const numP_6164 = (($lt$mul$gt($instance_6025))(mkTok_6151(NumTok_6145)))((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))($concat)))(intP_6163)))((($lt$pip$gt($instance_6035))((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))($concat)))(charP_6156("."))))(intP_6163)))((pure($instance_6025))(""))));
const notCharP_6157 = cs_6204 => parseChar_6154(c_6205 => not_6064((containsChar_6111(c_6205))(cs_6204)));
const manyStr_6158 = p_6206 => (($lt$mul$gt($instance_6025))((pure($instance_6025))(concatStr_6152)))(many_6134(p_6206));
const lineCommentP_6165 = (($lt$mul$gt($instance_6025))(mkTok_6151(ComTok_6149)))((($pip$gt_6135($instance_6025))((($pip$gt_6135($instance_6025))(charP_6156("/")))(charP_6156("/"))))(manyStr_6158(notCharP_6157("\n"))));
const symbolP_6166 = (($lt$mul$gt($instance_6025))(mkTok_6151(SymTok_6144)))(charP_6156("()[]{},\\"));
const identP_6167 = (($lt$mul$gt($instance_6025))(mkTok_6151(IdTok_6148)))((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))($concat)))(charP_6156(letters_6128+"_"))))(manyStr_6158(charP_6156((letters_6128+digits_6129)+"_"))));
const opIdentP_6168 = (($lt$mul$gt($instance_6025))(mkTok_6151(IdTok_6148)))((($lt$pip_6141($instance_6025))((($pip$gt_6135($instance_6025))(charP_6156("(")))(someStr_6159(charP_6156("-+*/=:&|<>^$")))))(charP_6156(")")));
const opP_6169 = (($lt$mul$gt($instance_6025))(mkTok_6151(OpTok_6147)))(someStr_6159(charP_6156("-+*/=:&|<>^$~")));
const anyCharP_6155 = parseChar_6154(__6201 => true);
const notEndOfStringP_6210 = notCharP_6157("'");
const escapeP_6209 = (($pip$gt_6135($instance_6025))(charP_6156("\\")))(anyCharP_6155);
const newLineP_6208 = (($pip$gt_6135($instance_6025))((($pip$gt_6135($instance_6025))(charP_6156("\\")))(charP_6156("n"))))((pure($instance_6025))("\n"));
const stringCharP_6160 = (($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))(newLineP_6208))(escapeP_6209)))(notEndOfStringP_6210);
const stringP_6161 = (($lt$mul$gt($instance_6025))(mkTok_6151(StrTok_6146)))((($lt$pip_6141($instance_6025))((($pip$gt_6135($instance_6025))(charP_6156("'")))(manyStr_6158(stringCharP_6160))))(charP_6156("'")));
const jaguarTokenP_6170 = many_6134((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))(stringP_6161))(whitespaceP_6162)))(numP_6164)))(lineCommentP_6165)))(identP_6167)))(opIdentP_6168)))(opP_6169)))(symbolP_6166));
const tokenize_6171 = runLexer_6153(jaguarTokenP_6170);
const assert_6211 = assert_90;
const Pair_6212 = Pair_3;
const mapSnd_6213 = mapSnd_89;
const mapFst_6214 = mapFst_88;
const $gt$eq$gt_6215 = $gt$eq$gt_87;
const snd_6216 = snd_27;
const debug2_6217 = debug2_86;
const Just_6218 = Just_1;
const Nothing_6219 = Nothing_2;
const isJust_6220 = isJust_25;
const Empty_6221 = Empty_11;
const Leaf_6222 = Leaf_12;
const Collision_6223 = Collision_13;
const BitmapIndexed_6224 = BitmapIndexed_14;
const $_6225 = $_16;
const fst_6226 = fst_26;
const Left_6227 = Left_8;
const Right_6228 = Right_9;
const loop_6229 = loop_31;
const find_6230 = find_33;
const hamtMask_6231 = hamtMask_62;
const popCount_6232 = popCount_61;
const hamtIndex_6233 = hamtIndex_63;
const lookup_6234 = lookup_64;
const setContains_6235 = setContains_81;
const foldTrie_6236 = foldTrie_70;
const emptySet_6237 = emptySet_77;
const Unit_6238 = Unit_0;
const not_6239 = not_30;
const $div$eq_6240 = $div$eq_17;
const mapIx_6241 = mapIx_34;
const insert_6242 = insert_65;
const setAdd_6243 = setAdd_78;
const setIntersection_6244 = setIntersection_85;
const remove_6245 = remove_67;
const setDiff_6246 = setDiff_84;
const setToArray_6247 = setToArray_83;
const mergeTrie_6248 = mergeTrie_74;
const setUnion_6249 = setUnion_82;
const setRemove_6250 = setRemove_80;
const setAddAll_6251 = setAddAll_79;
const trieEntries_6252 = trieEntries_76;
const trieKeys_6253 = trieKeys_75;
const size_6254 = size_72;
const mapTrie_6255 = mapTrie_71;
const nodeMask_6256 = nodeMask_60;
const isEmpty_6257 = isEmpty_73;
const filterTrie_6258 = filterTrie_69;
const nextSetBitMask_6259 = nextSetBitMask_68;
const updateOrSet_6260 = updateOrSet_66;
const State_6261 = State_10;
const runState_6262 = runState_58;
const evalState_6263 = evalState_59;
const sets_6264 = sets_57;
const gets_6265 = gets_56;
const foldM_6266 = foldM_53;
const mapM_6267 = mapM_54;
const forM_6268 = forM_55;
const strToArray_6269 = strToArray_52;
const toRecord_6270 = toRecord_51;
const reverse_6271 = reverse_50;
const tail_6272 = tail_45;
const head_6273 = head_44;
const uniq_6274 = uniq_49;
const mergeSet_6275 = mergeSet_48;
const init_6276 = init_47;
const last_6277 = last_46;
const mapJust_6278 = mapJust_43;
const concatMap_6279 = concatMap_42;
const zip_6280 = zip_41;
const zipWithIndex2_6281 = zipWithIndex2_39;
const zipWithIndex_6282 = zipWithIndex_40;
const join_6283 = join_38;
const all_6284 = all_37;
const exists_6285 = exists_36;
const containsChar_6286 = containsChar_35;
const contains_6287 = contains_32;
const either_6288 = either_28;
const splitEither_6289 = splitEither_29;
const fromJust_6290 = fromJust_24;
const justOr_6291 = justOr_23;
const maybe_6292 = maybe_22;
const $gt$gt_6293 = $gt$gt_21;
const $gt$eq_6294 = $gt$eq_20;
const $lt$eq_6295 = $lt$eq_19;
const $gt_6296 = $gt_18;
const Identity_6297 = Identity_15;
const Tuple6_6298 = Tuple6_7;
const Tuple5_6299 = Tuple5_6;
const Tuple4_6300 = Tuple4_5;
const Tuple3_6301 = Tuple3_4;
const App_6302 = App_785;
const Lam_6303 = Lam_786;
const Case_6304 = Case_787;
const Let_6305 = Let_788;
const New_6306 = New_789;
const breakableDownAndUpM_6307 = breakableDownAndUpM_836;
const breakableDownM_6308 = breakableDownM_840;
const downAndUpM_6309 = downAndUpM_837;
const downM_6310 = downM_839;
const upM_6311 = upM_838;
const breakableDownAndUp_6312 = breakableDownAndUp_831;
const breakableDown_6313 = breakableDown_835;
const downAndUp_6314 = downAndUp_832;
const down_6315 = down_834;
const up_6316 = up_833;
const AnnType_6317 = AnnType_777;
const TUnknown_6318 = TUnknown_809;
const getAnn_6319 = getAnn_814;
const getAnnType_6320 = getAnnType_817;
const Var_6321 = Var_783;
const Const_6322 = Const_784;
const annOf_6323 = annOf_828;
const getType_6324 = getType_830;
const withAnn_6325 = withAnn_829;
const setAnn_6326 = setAnn_815;
const setAnnType_6327 = setAnnType_818;
const setType_6328 = setType_827;
const Data_6329 = Data_797;
const DataCon_6330 = DataCon_798;
const dataConName_6331 = dataConName_825;
const dataConNames_6332 = dataConNames_826;
const TCBound_6333 = TCBound_801;
const TConst_6334 = TConst_802;
const TVar_6335 = TVar_803;
const TSkolem_6336 = TSkolem_804;
const TApp_6337 = TApp_805;
const TRow_6338 = TRow_806;
const TBot_6339 = TBot_807;
const TForall_6340 = TForall_808;
const equivBound_6341 = equivBound_823;
const equivType_6342 = equivType_824;
const getAnnCodeLoc_6343 = getAnnCodeLoc_819;
const AnnCodeLoc_6344 = AnnCodeLoc_778;
const printCodeLoc_6345 = printCodeLoc_821;
const exprLoc_6346 = exprLoc_822;
const setAnnCodeLoc_6347 = setAnnCodeLoc_820;
const copyAnn_6348 = copyAnn_816;
const emptyAnn_6349 = emptyAnn_813;
const ImportAll_6350 = ImportAll_812;
const ImportOpen_6351 = ImportOpen_811;
const ImportClosed_6352 = ImportClosed_810;
const Instance_6353 = Instance_800;
const Class_6354 = Class_799;
const ModuleInterface_6355 = ModuleInterface_796;
const Module_6356 = Module_795;
const PData_6357 = PData_794;
const PConst_6358 = PConst_793;
const PVar_6359 = PVar_792;
const CStr_6360 = CStr_791;
const CNum_6361 = CNum_790;
const AnnExport_6362 = AnnExport_782;
const AnnTag_6363 = AnnTag_781;
const AnnData_6364 = AnnData_780;
const AnnUseCount_6365 = AnnUseCount_779;
const upperCaseLetters_6366 = upperCaseLetters_5966;
const letters_6367 = letters_5967;
const digits_6368 = digits_5965;
const Success_6369 = Success_5953;
const Error_6370 = Error_5954;
const Parser_6371 = Parser_5955;
const applyParser_6372 = applyParser_5956;
const many_6373 = many_5959;
const $pip$gt_6374 = $pip$gt_5957;
const sepBy1_6375 = sepBy1_5962;
const success_6376 = success_5961;
const opt_6377 = opt_5964;
const sepBy_6378 = sepBy_5963;
const some_6379 = some_5960;
const $lt$pip_6380 = $lt$pip_5958;
const tokenize_6381 = tokenize_6171;
const Token_6382 = Token_6150;
const WsTok_6383 = WsTok_6143;
const SymTok_6384 = SymTok_6144;
const NumTok_6385 = NumTok_6145;
const StrTok_6386 = StrTok_6146;
const OpTok_6387 = OpTok_6147;
const IdTok_6388 = IdTok_6148;
const ComTok_6389 = ComTok_6149;
const ParserState_6390 = $_0_6459 => $_1_6460 => $_2_6461 => $_3_6462 => $_4_6463 => ({$0:$_0_6459,$1:$_1_6460,$2:$_2_6461,$3:$_3_6462,$4:$_4_6463});
const mkParserState_6391 = ts_6464 => f_6465 => {
  let $phi$640;
  const $phi$641 = (getIx(0))(ts_6464);
  if((((true&&true)&&true)&&true)&&true){
    $phi$640 = $phi$641.$3
  } else error("pattern match fail",$phi$641);
  return ((((ParserState_6390(ts_6464))(0))($phi$640))(0))(f_6465)
};
const filterWhitespaceAndComments_6392 = filter(t_6470 => {
  let $phi$642;
  if((((true&&(t_6470.$0.$tag==0))&&true)&&true)&&true){
    $phi$642 = false
  } else if((((true&&(t_6470.$0.$tag==6))&&true)&&true)&&true){
    $phi$642 = false
  } else if(true){
    $phi$642 = true
  } else error("pattern match fail",t_6470);
  return $phi$642
});
const runParser_6393 = p_6478 => s_6479 => f_6480 => {
  let $phi$643;
  const $phi$644 = tokenize_6381(s_6479);
  if((($phi$644.$tag==0)&&true)&&true){
    $phi$643 = ((applyParser_6372(p_6478))((mkParserState_6391(filterWhitespaceAndComments_6392($phi$644.$0)))(f_6480)))
  } else if(($phi$644.$tag==1)&&true){
    $phi$643 = (Error_6370($phi$644.$0))
  } else error("pattern match fail",$phi$644);
  return $phi$643
};
const $lt$mul$mns$gt_6396 = pf_6512 => pa_6513 => {
  let $phi$645;
  if(true&&true){
    let $phi$646;
    if(true&&true){
      const parse_6516 = s_6517 => {
        let $phi$647;
        if(((((true&&true)&&true)&&true)&&true)&&true){
          let $phi$648;
          const $phi$649 = pf_6512.$0(s_6517);
          if((($phi$649.$tag==0)&&true)&&(((((true&&true)&&true)&&true)&&true)&&true)){
            let $phi$650;
            const $phi$651 = pa_6513.$0(((((ParserState_6390($phi$649.$1.$0))($phi$649.$1.$1))($phi$649.$1.$2))(s_6517.$2+1))($phi$649.$1.$4));
            if((($phi$651.$tag==0)&&true)&&(((((true&&true)&&true)&&true)&&true)&&true)){
              $phi$650 = ((Success_6369($phi$649.$0($phi$651.$0)))(((((ParserState_6390($phi$651.$1.$0))($phi$651.$1.$1))($phi$651.$1.$2))(s_6517.$3))($phi$651.$1.$4)))
            } else if(($phi$651.$tag==1)&&true){
              $phi$650 = (Error_6370($phi$651.$0))
            } else error("pattern match fail",$phi$651);
            $phi$648 = $phi$650
          } else if(($phi$649.$tag==1)&&true){
            $phi$648 = (Error_6370($phi$649.$0))
          } else error("pattern match fail",$phi$649);
          $phi$647 = $phi$648
        } else error("pattern match fail",s_6517);
        return $phi$647
      };
      $phi$646 = (Parser_6371(parse_6516))
    } else error("pattern match fail",pa_6513);
    $phi$645 = $phi$646
  } else error("pattern match fail",pf_6512);
  return $phi$645
};
const parseToken_6394 = f_6484 => {
  const parse_6485 = s_6486 => {
    let $phi$652;
    if(((((true&&true)&&true)&&true)&&true)&&true){
      let $phi$653;
      const $phi$654 = (($lt($instance_461))(s_6486.$1))(length(s_6486.$0));
      if(!$phi$654){
        $phi$653 = (Error_6370("run out of tokens"))
      } else if($phi$654){
        let $phi$655;
        const $phi$656 = (getIx(s_6486.$1))(s_6486.$0);
        if((((true&&true)&&true)&&true)&&true){
          let $phi$657;
          const $phi$658 = (($lt($instance_461))($phi$656.$3))(s_6486.$3);
          if($phi$658){
            $phi$657 = (Error_6370("token not indented sufficiently"))
          } else if(!$phi$658){
            let $phi$659;
            const $phi$660 = f_6484((getIx(s_6486.$1))(s_6486.$0));
            if($phi$660.$tag==1){
              $phi$659 = (Error_6370("parser fun failed"))
            } else if(($phi$660.$tag==0)&&true){
              let $phi$661;
              const $phi$662 = (($lt($instance_461))(s_6486.$1+1))(length(s_6486.$0));
              if(!$phi$662){
                $phi$661 = ((Success_6369($phi$660.$0))(((((ParserState_6390(s_6486.$0))(s_6486.$1+1))(s_6486.$2))(s_6486.$3))(s_6486.$4)))
              } else if($phi$662){
                let $phi$663;
                const $phi$664 = (getIx(s_6486.$1+1))(s_6486.$0);
                if((((true&&true)&&true)&&true)&&true){
                  let $phi$665;
                  const $phi$666 = (($gt_6296($instance_461))($phi$664.$2))($phi$656.$2);
                  if(!$phi$666){
                    $phi$665 = ((Success_6369($phi$660.$0))(((((ParserState_6390(s_6486.$0))(s_6486.$1+1))(s_6486.$2))(s_6486.$3))(s_6486.$4)))
                  } else if($phi$666){
                    $phi$665 = ((Success_6369($phi$660.$0))(((((ParserState_6390(s_6486.$0))(s_6486.$1+1))($phi$664.$3))(s_6486.$3))(s_6486.$4)))
                  } else error("pattern match fail",$phi$666);
                  $phi$663 = $phi$665
                } else error("pattern match fail",$phi$664);
                $phi$661 = $phi$663
              } else error("pattern match fail",$phi$662);
              $phi$659 = $phi$661
            } else error("pattern match fail",$phi$660);
            $phi$657 = $phi$659
          } else error("pattern match fail",$phi$658);
          $phi$655 = $phi$657
        } else error("pattern match fail",$phi$656);
        $phi$653 = $phi$655
      } else error("pattern match fail",$phi$654);
      $phi$652 = $phi$653
    } else error("pattern match fail",s_6486);
    return $phi$652
  };
  return Parser_6371(parse_6485)
};
const operatorP_6400 = s_6547 => parseToken_6394(t_6548 => {
  let $phi$667;
  if((((true&&(t_6548.$0.$tag==4))&&true)&&true)&&true){
    let $phi$668;
    const $phi$669 = (($eq$eq($instance_460))(t_6548.$1))(s_6547);
    if($phi$669){
      $phi$668 = (Just_6218(s_6547))
    } else if(!$phi$669){
      $phi$668 = Nothing_6219
    } else error("pattern match fail",$phi$669);
    $phi$667 = $phi$668
  } else if(true){
    $phi$667 = Nothing_6219
  } else error("pattern match fail",t_6548);
  return $phi$667
});
const symP_6399 = s_6541 => parseToken_6394(t_6542 => {
  let $phi$670;
  if((((true&&(t_6542.$0.$tag==1))&&true)&&true)&&true){
    let $phi$671;
    const $phi$672 = (($eq$eq($instance_460))(t_6542.$1))(s_6541);
    if($phi$672){
      $phi$671 = (Just_6218(s_6541))
    } else if(!$phi$672){
      $phi$671 = Nothing_6219
    } else error("pattern match fail",$phi$672);
    $phi$670 = $phi$671
  } else if(true){
    $phi$670 = Nothing_6219
  } else error("pattern match fail",t_6542);
  return $phi$670
});
const parenP_6406 = p_6579 => (($lt$pip_6380($instance_6025))((($pip$gt_6374($instance_6025))(symP_6399("(")))(p_6579)))(symP_6399(")"));
const reserved_6398 = ["as","class","where","instance","let","in","from","import","case","of","data"];
const notUpperCaseId_6405 = parseToken_6394(t_6574 => {
  let $phi$673;
  if((((true&&(t_6574.$0.$tag==5))&&true)&&true)&&true){
    let $phi$674;
    const $phi$675 = (containsChar_6286((getChar(0))(t_6574.$1)))(upperCaseLetters_6366);
    if(!$phi$675){
      let $phi$676;
      const $phi$677 = ((contains_6287($instance_460))(t_6574.$1))(reserved_6398);
      if(!$phi$677){
        $phi$676 = (Just_6218(t_6574.$1))
      } else if($phi$677){
        $phi$676 = Nothing_6219
      } else error("pattern match fail",$phi$677);
      $phi$674 = $phi$676
    } else if($phi$675){
      $phi$674 = Nothing_6219
    } else error("pattern match fail",$phi$675);
    $phi$673 = $phi$674
  } else if(true){
    $phi$673 = Nothing_6219
  } else error("pattern match fail",t_6574);
  return $phi$673
});
const tvarP_6436 = (($lt$mul$gt($instance_6025))((pure($instance_6025))(TVar_6335(emptyAnn_6349))))(notUpperCaseId_6405);
const upperCaseId_6404 = parseToken_6394(t_6569 => {
  let $phi$678;
  if((((true&&(t_6569.$0.$tag==5))&&true)&&true)&&true){
    let $phi$679;
    const $phi$680 = (containsChar_6286((getChar(0))(t_6569.$1)))(upperCaseLetters_6366);
    if($phi$680){
      $phi$679 = (Just_6218(t_6569.$1))
    } else if(!$phi$680){
      $phi$679 = Nothing_6219
    } else error("pattern match fail",$phi$680);
    $phi$678 = $phi$679
  } else if(true){
    $phi$678 = Nothing_6219
  } else error("pattern match fail",t_6569);
  return $phi$678
});
const tconstP_6435 = (($lt$mul$gt($instance_6025))((pure($instance_6025))(TConst_6334(emptyAnn_6349))))(upperCaseId_6404);
const typeP_6434 = Parser_6371(s_6649 => (applyParser_6372(tfunP_6439))(s_6649));
const simpleTypeP_6437 = (($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))(tconstP_6435))(tvarP_6436)))(parenP_6406(typeP_6434));
const tappP_6438 = ($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((pure($instance_6025))(foldl(TApp_6337(emptyAnn_6349)))))(simpleTypeP_6437)))(many_6373(simpleTypeP_6437));
const tfunP_6439 = ($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((pure($instance_6025))(t_6650 => ts_6651 => (foldr1(b_6652 => a_6653 => ((TApp_6337(emptyAnn_6349))(((TApp_6337(emptyAnn_6349))((TConst_6334(emptyAnn_6349))("->")))(a_6653)))(b_6652)))((enqueue(t_6650))(ts_6651)))))(tappP_6438)))(many_6373((($pip$gt_6374($instance_6025))(operatorP_6400("->")))(tappP_6438)));
const parseType_6458 = runParser_6393(typeP_6434);
const withLocAnn_6407 = a_6580 => ((((setAnn_6326($instance_515))($instance_460))("codeLoc"))(a_6580))(emptyAnn_6349);
const parse_6501 = s_6502 => {
  let $phi$681;
  if(((((true&&true)&&true)&&true)&&true)&&true){
    let $phi$682;
    const $phi$683 = (($lt($instance_461))(s_6502.$1))(length(s_6502.$0));
    if(!$phi$683){
      $phi$682 = (Error_6370("run out of tokens"))
    } else if($phi$683){
      let $phi$684;
      const $phi$685 = (getIx(s_6502.$1))(s_6502.$0);
      if((((true&&true)&&true)&&true)&&true){
        $phi$684 = ((Success_6369(($_6225(withLocAnn_6407))(((AnnCodeLoc_6344(s_6502.$4))($phi$685.$2))($phi$685.$3))))(s_6502))
      } else error("pattern match fail",$phi$685);
      $phi$682 = $phi$684
    } else error("pattern match fail",$phi$683);
    $phi$681 = $phi$682
  } else error("pattern match fail",s_6502);
  return $phi$681
};
const locP_6395 = Parser_6371(parse_6501);
const $pip$mns$gt_6397 = pa_6537 => pb_6538 => ($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((pure($instance_6025))(__6539 => b_6540 => b_6540)))(pa_6537)))(pb_6538);
const anyOpP_6401 = parseToken_6394(t_6553 => {
  let $phi$686;
  if((((true&&(t_6553.$0.$tag==4))&&true)&&true)&&true){
    $phi$686 = (Just_6218(t_6553.$1))
  } else if(true){
    $phi$686 = Nothing_6219
  } else error("pattern match fail",t_6553);
  return $phi$686
});
const reservedP_6402 = s_6558 => parseToken_6394(t_6559 => {
  let $phi$687;
  if((((true&&(t_6559.$0.$tag==5))&&true)&&true)&&true){
    let $phi$688;
    const $phi$689 = (($eq$eq($instance_460))(t_6559.$1))(s_6558);
    if($phi$689){
      $phi$688 = (Just_6218(s_6558))
    } else if(!$phi$689){
      $phi$688 = Nothing_6219
    } else error("pattern match fail",$phi$689);
    $phi$687 = $phi$688
  } else if(true){
    $phi$687 = Nothing_6219
  } else error("pattern match fail",t_6559);
  return $phi$687
});
const withLocOf_6408 = e_6581 => withLocAnn_6407(($_6225(fromJust_6290))((((getAnn_6319($instance_515))($instance_460))("codeLoc"))(annOf_6323(e_6581))));
const varP_6409 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(Var_6321)))(locP_6395)))(parseToken_6394(t_6582 => {
  let $phi$690;
  if((((true&&(t_6582.$0.$tag==5))&&true)&&true)&&true){
    let $phi$691;
    const $phi$692 = ((contains_6287($instance_460))(t_6582.$1))(reserved_6398);
    if($phi$692){
      $phi$691 = Nothing_6219
    } else if(!$phi$692){
      $phi$691 = (Just_6218(t_6582.$1))
    } else error("pattern match fail",$phi$692);
    $phi$690 = $phi$691
  } else if(true){
    $phi$690 = Nothing_6219
  } else error("pattern match fail",t_6582);
  return $phi$690
}));
const cnumP_6410 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(Const_6322)))(locP_6395)))(parseToken_6394(t_6587 => {
  let $phi$693;
  if((((true&&(t_6587.$0.$tag==2))&&true)&&true)&&true){
    $phi$693 = (Just_6218(CNum_6361(unsafeStringToInt(t_6587.$1))))
  } else if(true){
    $phi$693 = Nothing_6219
  } else error("pattern match fail",t_6587);
  return $phi$693
}));
const cstrP_6411 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(Const_6322)))(locP_6395)))(parseToken_6394(t_6592 => {
  let $phi$694;
  if((((true&&(t_6592.$0.$tag==3))&&true)&&true)&&true){
    $phi$694 = (Just_6218(CStr_6360(t_6592.$1)))
  } else if(true){
    $phi$694 = Nothing_6219
  } else error("pattern match fail",t_6592);
  return $phi$694
}));
const constP_6412 = (($lt$pip$gt($instance_6035))(cstrP_6411))(cnumP_6410);
const pvarP_6420 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(PVar_6359)))(locP_6395)))(notUpperCaseId_6405);
const pcstrP_6422 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(PConst_6358)))(locP_6395)))(parseToken_6394(t_6618 => {
  let $phi$695;
  if((((true&&(t_6618.$0.$tag==3))&&true)&&true)&&true){
    $phi$695 = (Just_6218(CStr_6360(t_6618.$1)))
  } else if(true){
    $phi$695 = Nothing_6219
  } else error("pattern match fail",t_6618);
  return $phi$695
}));
const pcnumP_6421 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(PConst_6358)))(locP_6395)))(parseToken_6394(t_6613 => {
  let $phi$696;
  if((((true&&(t_6613.$0.$tag==2))&&true)&&true)&&true){
    $phi$696 = (Just_6218(CNum_6361(unsafeStringToInt(t_6613.$1))))
  } else if(true){
    $phi$696 = Nothing_6219
  } else error("pattern match fail",t_6613);
  return $phi$696
}));
const pconstP_6424 = (($lt$pip$gt($instance_6035))(pcnumP_6421))(pcstrP_6422);
const patP_6419 = Parser_6371(s_6612 => (applyParser_6372(allPatP_6427))(s_6612));
const f_6628 = ann_6629 => p_6630 => ps_6631 => {
  let $phi$697;
  const $phi$698 = length(ps_6631);
  if(1==$phi$698){
    $phi$697 = "Pair"
  } else if(2==$phi$698){
    $phi$697 = "Tuple3"
  } else if(3==$phi$698){
    $phi$697 = "Tuple4"
  } else if(4==$phi$698){
    $phi$697 = "Tuple5"
  } else if(5==$phi$698){
    $phi$697 = "Tuple6"
  } else error("pattern match fail",$phi$698);
  const cons_6632 = $phi$697;
  return ((PData_6357(ann_6629))(cons_6632))((enqueue(p_6630))(ps_6631))
};
const ptupleP_6425 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(f_6628)))(locP_6395)))((($pip$gt_6374($instance_6025))(symP_6399("(")))((($lt$pip_6380($instance_6025))(patP_6419))(symP_6399(","))))))((($lt$pip_6380($instance_6025))((sepBy1_6375(patP_6419))(symP_6399(","))))(symP_6399(")")));
const pdataP_6426 = ($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(PData_6357)))(locP_6395)))(upperCaseId_6404)))(many_6373((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))(pvarP_6420))(pconstP_6424)))(ptupleP_6425)))(parenP_6406(patP_6419))));
const allPatP_6427 = (($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))(pvarP_6420))(pconstP_6424)))(pdataP_6426)))(ptupleP_6425);
const exprP_6413 = Parser_6371(s_6597 => (applyParser_6372(opP_6433))(s_6597));
const arrayLitP_6414 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(ann_6598 => xs_6599 => ((New_6306(ann_6598))("Array"))(xs_6599))))(locP_6395)))((($lt$pip_6380($instance_6025))((($pip$gt_6374($instance_6025))(symP_6399("[")))((sepBy_6378(exprP_6413))(symP_6399(",")))))(symP_6399("]")));
const f_6600 = ann_6601 => e_6602 => es_6603 => {
  let $phi$699;
  const $phi$700 = length(es_6603);
  if(1==$phi$700){
    $phi$699 = "Pair"
  } else if(2==$phi$700){
    $phi$699 = "Tuple3"
  } else if(3==$phi$700){
    $phi$699 = "Tuple4"
  } else if(4==$phi$700){
    $phi$699 = "Tuple5"
  } else if(5==$phi$700){
    $phi$699 = "Tuple6"
  } else error("pattern match fail",$phi$700);
  const cons_6604 = $phi$699;
  return ((foldl(App_6302(ann_6601)))(((App_6302(ann_6601))((Var_6321(ann_6601))(cons_6604)))(e_6602)))(es_6603)
};
const tupleLitP_6415 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(f_6600)))(locP_6395)))((($pip$gt_6374($instance_6025))(symP_6399("(")))((($lt$pip_6380($instance_6025))(exprP_6413))(symP_6399(","))))))((($lt$pip_6380($instance_6025))((sepBy1_6375(exprP_6413))(symP_6399(","))))(symP_6399(")")));
const simpleExprP_6416 = (($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))(varP_6409))(constP_6412)))(arrayLitP_6414)))(tupleLitP_6415)))(parenP_6406(exprP_6413));
const appP_6417 = ($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((pure($instance_6025))(foldl(f_6605 => a_6606 => ((App_6302(withLocOf_6408(f_6605)))(f_6605))(a_6606)))))((($lt$pip$gt($instance_6035))(varP_6409))(parenP_6406(exprP_6413)))))(many_6373(simpleExprP_6416));
const lamP_6418 = ($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(l_6607 => ps_6608 => a_6609 => ((foldr(a_6610 => p_6611 => ((Lam_6303(l_6607))(p_6611))(a_6610)))(a_6609))(ps_6608))))(locP_6395)))(($pip$mns$gt_6397(symP_6399("\\")))(some_6379(notUpperCaseId_6405)))))((($pip$gt_6374($instance_6025))(operatorP_6400("->")))(exprP_6413));
const ofP_6428 = ($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((pure($instance_6025))(Pair_6212)))(patP_6419)))((($pip$gt_6374($instance_6025))(operatorP_6400("->")))(exprP_6413));
const caseP_6429 = ($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(Case_6304)))(locP_6395)))(($pip$mns$gt_6397(reservedP_6402("case")))(simpleExprP_6416))))((($pip$gt_6374($instance_6025))(reservedP_6402("of")))(some_6379(ofP_6428)));
const defP_6430 = ($lt$mul$mns$gt_6396(($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(l_6633 => n_6634 => ps_6635 => e_6636 => (Pair_6212(n_6634))(((foldr(e_6637 => p_6638 => ((Lam_6303(l_6633))(p_6638))(e_6637)))(e_6636))(ps_6635)))))(locP_6395)))(notUpperCaseId_6405)))(many_6373(notUpperCaseId_6405))))((($pip$gt_6374($instance_6025))(operatorP_6400("=")))(exprP_6413));
const letP_6431 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(Let_6305)))(locP_6395)))(($pip$mns$gt_6397(reservedP_6402("let")))(some_6379(defP_6430)))))(($pip$mns$gt_6397(reservedP_6402("in")))(exprP_6413));
const primaryExprP_6432 = (($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))((($lt$pip$gt($instance_6035))(appP_6417))(constP_6412)))(lamP_6418)))(caseP_6429)))(letP_6431)))(arrayLitP_6414)))(tupleLitP_6415);
const opP_6433 = ($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((pure($instance_6025))(e_6639 => oes_6640 => ((foldl(a_6641 => lob_6642 => {
  let $phi$701;
  if((true&&true)&&((true&&true)&&true)){
    $phi$701 = (((App_6302(lob_6642.$0))(((App_6302(lob_6642.$0))((Var_6321(lob_6642.$0))(lob_6642.$1.$0)))(a_6641)))(lob_6642.$1.$1))
  } else error("pattern match fail",lob_6642);
  return $phi$701
}))(e_6639))(oes_6640))))(primaryExprP_6432)))(many_6373((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(l_6646 => op_6647 => e_6648 => (Pair_6212(l_6646))((Pair_6212(op_6647))(e_6648)))))(locP_6395)))(anyOpP_6401)))(primaryExprP_6432)));
const parseExpr_6457 = runParser_6393(exprP_6413);
const strP_6423 = parseToken_6394(t_6623 => {
  let $phi$702;
  if((((true&&(t_6623.$0.$tag==3))&&true)&&true)&&true){
    $phi$702 = (Just_6218(t_6623.$1))
  } else if(true){
    $phi$702 = Nothing_6219
  } else error("pattern match fail",t_6623);
  return $phi$702
});
const nonReservedP_6403 = parseToken_6394(t_6564 => {
  let $phi$703;
  if((((true&&(t_6564.$0.$tag==5))&&true)&&true)&&true){
    let $phi$704;
    const $phi$705 = ((contains_6287($instance_460))(t_6564.$1))(reserved_6398);
    if($phi$705){
      $phi$704 = Nothing_6219
    } else if(!$phi$705){
      $phi$704 = (Just_6218(t_6564.$1))
    } else error("pattern match fail",$phi$705);
    $phi$703 = $phi$704
  } else if(true){
    $phi$703 = Nothing_6219
  } else error("pattern match fail",t_6564);
  return $phi$703
});
const importNoAliasP_6445 = (($lt$mul$gt($instance_6025))((pure($instance_6025))(n_6660 => (Pair_6212(n_6660))(n_6660))))(nonReservedP_6403);
const importAliasP_6446 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(Pair_6212)))(nonReservedP_6403)))((($pip$gt_6374($instance_6025))(reservedP_6402("as")))(nonReservedP_6403));
const importOpenP_6447 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(ns_6661 => f_6662 => ((ImportOpen_6351(emptyAnn_6349))(f_6662))(ns_6661))))((($lt$pip_6380($instance_6025))((($pip$gt_6374($instance_6025))(symP_6399("{")))((sepBy1_6375((($lt$pip$gt($instance_6035))(importAliasP_6446))(importNoAliasP_6445)))(symP_6399(",")))))(symP_6399("}")))))((($pip$gt_6374($instance_6025))(reservedP_6402("from")))(strP_6423));
const importAllP_6448 = (($lt$mul$gt($instance_6025))((pure($instance_6025))(ImportAll_6350(emptyAnn_6349))))((($pip$gt_6374($instance_6025))((($pip$gt_6374($instance_6025))(operatorP_6400("*")))(reservedP_6402("from"))))(strP_6423));
const importP_6449 = (($pip$gt_6374($instance_6025))(reservedP_6402("import")))((($lt$pip$gt($instance_6035))(importOpenP_6447))(importAllP_6448));
const parseImports_6456 = runParser_6393(many_6373(importP_6449));
const addExportAnn_6679 = d_6680 => {
  let $phi$706;
  if((true&&true)&&true){
    $phi$706 = ((Pair_6212(d_6680.$0))((withAnn_6325(((((setAnn_6326($instance_515))($instance_460))("export"))(AnnExport_6362(d_6680.$0)))(annOf_6323(d_6680.$1))))(d_6680.$1)))
  } else error("pattern match fail",d_6680);
  return $phi$706
};
const topLevelDef_6453 = (($lt$mul$gt($instance_6025))((pure($instance_6025))(addExportAnn_6679)))(defP_6430);
const eitherP_6452 = a_6676 => b_6677 => ($_6225(Parser_6371))(s_6678 => (applyParser_6372((($lt$pip$gt($instance_6035))((($lt$mul$gt($instance_6025))((pure($instance_6025))(Left_6227)))(a_6676)))((($lt$mul$gt($instance_6025))((pure($instance_6025))(Right_6228)))(b_6677))))(s_6678));
const classMemberP_6441 = ($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((pure($instance_6025))(Pair_6212)))(notUpperCaseId_6405)))((($pip$gt_6374($instance_6025))(operatorP_6400("::")))(typeP_6434));
const classP_6440 = ($lt$mul$mns$gt_6396(($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((pure($instance_6025))(name_6654 => tv_6655 => maybeDefs_6656 => (((Class_6354(emptyAnn_6349))(name_6654))(tv_6655))((justOr_6291([]))(maybeDefs_6656)))))(($pip$mns$gt_6397(reservedP_6402("class")))(upperCaseId_6404))))(notUpperCaseId_6405)))(opt_6377((($pip$gt_6374($instance_6025))(reservedP_6402("where")))(some_6379(classMemberP_6441))));
const instanceP_6442 = ($lt$mul$mns$gt_6396(($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((pure($instance_6025))(name_6657 => t_6658 => maybeDefs_6659 => (((Instance_6353(emptyAnn_6349))(name_6657))(t_6658))((justOr_6291([]))(maybeDefs_6659)))))(($pip$mns$gt_6397(reservedP_6402("instance")))(upperCaseId_6404))))(simpleTypeP_6437)))(opt_6377((($pip$gt_6374($instance_6025))(reservedP_6402("where")))(some_6379(defP_6430))));
const dataConP_6443 = ($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((pure($instance_6025))(DataCon_6330(emptyAnn_6349))))(upperCaseId_6404)))(many_6373(simpleTypeP_6437));
const dataP_6444 = ($lt$mul$mns$gt_6396(($lt$mul$mns$gt_6396((($lt$mul$gt($instance_6025))((pure($instance_6025))(Data_6329(emptyAnn_6349))))(($pip$mns$gt_6397(reservedP_6402("data")))(upperCaseId_6404))))(many_6373(notUpperCaseId_6405))))((($pip$gt_6374($instance_6025))(operatorP_6400("=")))((sepBy1_6375(dataConP_6443))(operatorP_6400("|"))));
const topLevelP_6454 = (eitherP_6452((eitherP_6452(dataP_6444))(topLevelDef_6453)))((eitherP_6452(classP_6440))(instanceP_6442));
const splitFourWay_6451 = e_6673 => {
  let $phi$707;
  const $phi$708 = splitEither_6289(e_6673);
  if((true&&true)&&true){
    $phi$707 = ((Pair_6212(splitEither_6289($phi$708.$0)))(splitEither_6289($phi$708.$1)))
  } else error("pattern match fail",$phi$708);
  return $phi$707
};
const moduleP_6450 = (($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((($lt$mul$gt($instance_6025))((pure($instance_6025))(loc_6663 => is_6664 => es_6665 => {
  let $phi$709;
  const $phi$710 = splitFourWay_6451(es_6665);
  if((true&&((true&&true)&&true))&&((true&&true)&&true)){
    let $phi$711;
    const $phi$712 = getAnnCodeLoc_6343(loc_6663);
    if(($phi$712.$tag==0)&&(((($phi$712.$0.$tag==1)&&true)&&true)&&true)){
      $phi$711 = $phi$712.$0.$0
    } else error("pattern match fail",$phi$712);
    $phi$709 = (((((((Module_6356(loc_6663))($phi$711))(is_6664))($phi$710.$0.$0))($phi$710.$1.$0))((map(Pair_6212("")))($phi$710.$1.$1)))($phi$710.$0.$1))
  } else error("pattern match fail",$phi$710);
  return $phi$709
})))(locP_6395)))(many_6373(importP_6449))))(some_6379(topLevelP_6454));
const parseModule_6455 = runParser_6393(moduleP_6450);
const assert_6683 = assert_90;
const Pair_6684 = Pair_3;
const mapSnd_6685 = mapSnd_89;
const mapFst_6686 = mapFst_88;
const $gt$eq$gt_6687 = $gt$eq$gt_87;
const snd_6688 = snd_27;
const debug2_6689 = debug2_86;
const Just_6690 = Just_1;
const Nothing_6691 = Nothing_2;
const isJust_6692 = isJust_25;
const Empty_6693 = Empty_11;
const Leaf_6694 = Leaf_12;
const Collision_6695 = Collision_13;
const BitmapIndexed_6696 = BitmapIndexed_14;
const $_6697 = $_16;
const fst_6698 = fst_26;
const Left_6699 = Left_8;
const Right_6700 = Right_9;
const loop_6701 = loop_31;
const find_6702 = find_33;
const hamtMask_6703 = hamtMask_62;
const popCount_6704 = popCount_61;
const hamtIndex_6705 = hamtIndex_63;
const lookup_6706 = lookup_64;
const setContains_6707 = setContains_81;
const foldTrie_6708 = foldTrie_70;
const emptySet_6709 = emptySet_77;
const Unit_6710 = Unit_0;
const not_6711 = not_30;
const $div$eq_6712 = $div$eq_17;
const mapIx_6713 = mapIx_34;
const insert_6714 = insert_65;
const setAdd_6715 = setAdd_78;
const setIntersection_6716 = setIntersection_85;
const remove_6717 = remove_67;
const setDiff_6718 = setDiff_84;
const setToArray_6719 = setToArray_83;
const mergeTrie_6720 = mergeTrie_74;
const setUnion_6721 = setUnion_82;
const setRemove_6722 = setRemove_80;
const setAddAll_6723 = setAddAll_79;
const trieEntries_6724 = trieEntries_76;
const trieKeys_6725 = trieKeys_75;
const size_6726 = size_72;
const mapTrie_6727 = mapTrie_71;
const nodeMask_6728 = nodeMask_60;
const isEmpty_6729 = isEmpty_73;
const filterTrie_6730 = filterTrie_69;
const nextSetBitMask_6731 = nextSetBitMask_68;
const updateOrSet_6732 = updateOrSet_66;
const State_6733 = State_10;
const runState_6734 = runState_58;
const evalState_6735 = evalState_59;
const sets_6736 = sets_57;
const gets_6737 = gets_56;
const foldM_6738 = foldM_53;
const mapM_6739 = mapM_54;
const forM_6740 = forM_55;
const strToArray_6741 = strToArray_52;
const toRecord_6742 = toRecord_51;
const reverse_6743 = reverse_50;
const tail_6744 = tail_45;
const head_6745 = head_44;
const uniq_6746 = uniq_49;
const mergeSet_6747 = mergeSet_48;
const init_6748 = init_47;
const last_6749 = last_46;
const mapJust_6750 = mapJust_43;
const concatMap_6751 = concatMap_42;
const zip_6752 = zip_41;
const zipWithIndex2_6753 = zipWithIndex2_39;
const zipWithIndex_6754 = zipWithIndex_40;
const join_6755 = join_38;
const all_6756 = all_37;
const exists_6757 = exists_36;
const containsChar_6758 = containsChar_35;
const contains_6759 = contains_32;
const either_6760 = either_28;
const splitEither_6761 = splitEither_29;
const fromJust_6762 = fromJust_24;
const justOr_6763 = justOr_23;
const maybe_6764 = maybe_22;
const $gt$gt_6765 = $gt$gt_21;
const $gt$eq_6766 = $gt$eq_20;
const $lt$eq_6767 = $lt$eq_19;
const $gt_6768 = $gt_18;
const Identity_6769 = Identity_15;
const Tuple6_6770 = Tuple6_7;
const Tuple5_6771 = Tuple5_6;
const Tuple4_6772 = Tuple4_5;
const Tuple3_6773 = Tuple3_4;
const App_6774 = App_785;
const Lam_6775 = Lam_786;
const Case_6776 = Case_787;
const Let_6777 = Let_788;
const New_6778 = New_789;
const breakableDownAndUpM_6779 = breakableDownAndUpM_836;
const breakableDownM_6780 = breakableDownM_840;
const downAndUpM_6781 = downAndUpM_837;
const downM_6782 = downM_839;
const upM_6783 = upM_838;
const breakableDownAndUp_6784 = breakableDownAndUp_831;
const breakableDown_6785 = breakableDown_835;
const downAndUp_6786 = downAndUp_832;
const down_6787 = down_834;
const up_6788 = up_833;
const AnnType_6789 = AnnType_777;
const TUnknown_6790 = TUnknown_809;
const getAnn_6791 = getAnn_814;
const getAnnType_6792 = getAnnType_817;
const Var_6793 = Var_783;
const Const_6794 = Const_784;
const annOf_6795 = annOf_828;
const getType_6796 = getType_830;
const withAnn_6797 = withAnn_829;
const setAnn_6798 = setAnn_815;
const setAnnType_6799 = setAnnType_818;
const setType_6800 = setType_827;
const Data_6801 = Data_797;
const DataCon_6802 = DataCon_798;
const dataConName_6803 = dataConName_825;
const dataConNames_6804 = dataConNames_826;
const TCBound_6805 = TCBound_801;
const TConst_6806 = TConst_802;
const TVar_6807 = TVar_803;
const TSkolem_6808 = TSkolem_804;
const TApp_6809 = TApp_805;
const TRow_6810 = TRow_806;
const TBot_6811 = TBot_807;
const TForall_6812 = TForall_808;
const equivBound_6813 = equivBound_823;
const equivType_6814 = equivType_824;
const getAnnCodeLoc_6815 = getAnnCodeLoc_819;
const AnnCodeLoc_6816 = AnnCodeLoc_778;
const printCodeLoc_6817 = printCodeLoc_821;
const exprLoc_6818 = exprLoc_822;
const setAnnCodeLoc_6819 = setAnnCodeLoc_820;
const copyAnn_6820 = copyAnn_816;
const emptyAnn_6821 = emptyAnn_813;
const ImportAll_6822 = ImportAll_812;
const ImportOpen_6823 = ImportOpen_811;
const ImportClosed_6824 = ImportClosed_810;
const Instance_6825 = Instance_800;
const Class_6826 = Class_799;
const ModuleInterface_6827 = ModuleInterface_796;
const Module_6828 = Module_795;
const PData_6829 = PData_794;
const PConst_6830 = PConst_793;
const PVar_6831 = PVar_792;
const CStr_6832 = CStr_791;
const CNum_6833 = CNum_790;
const AnnExport_6834 = AnnExport_782;
const AnnTag_6835 = AnnTag_781;
const AnnData_6836 = AnnData_780;
const AnnUseCount_6837 = AnnUseCount_779;
const Success_6838 = Success_5953;
const Error_6839 = Error_5954;
const parseExpr_6840 = parseExpr_6457;
const parseModule_6841 = parseModule_6455;
const parseType_6842 = parseType_6458;
const ParserState_6843 = ParserState_6390;
const generateJs_6844 = compileModule_5852;
const printType_6845 = printType_1769;
const reallyPrintExpr_6846 = reallyPrintExpr_1774;
const newCtx_6847 = newCtx_2070;
const inferTypeModule_6848 = inferTypeModule_2116;
const getTypedExports_6849 = getTypedExports_2117;
const generalize_6850 = generalize_2108;
const skolemizeType_6851 = skolemizeType_2104;
const emptyEnv_6852 = emptyEnv_2080;
const dfs_6853 = dfs_620;
const ArgBool_6854 = ArgBool_4795;
const ArgString_6855 = ArgString_4796;
const parseArgs_6856 = parseArgs_4799;
const getPositional_6857 = getPositional_4800;
const getString_6858 = getString_4801;
const getBool_6859 = getBool_4802;
const declassModule_6860 = declassModule_4373;
const normalizeImports_6861 = normalizeImports_4154;
const uniquify_6862 = uniquify_3274;
const mergeModules_6863 = mergeModules_3948;
const inline_6864 = inline_3545;
const translateAdts_6865 = translateAdts_3067;
const CompilerState_6866 = CompilerState_1554;
const reportTimes_6867 = reportTimes_1563;
const timingStart_6868 = timingStart_1560;
const timingEnd_6869 = timingEnd_1561;
const timed_6870 = timed_1562;
const perModule_6871 = perModule_1559;
const setUid_6872 = setUid_1558;
const getUid_6873 = getUid_1557;
const setExports_6874 = setExports_1556;
const getExports_6875 = getExports_1555;
const splitLetsPass_6876 = splitLetsPass_1341;
const mainArg_6886 = (ArgString_6855("main"))(Nothing_6691);
const profileArg_6887 = (ArgBool_6854("profile"))(Just_6690(false));
const optArg_6888 = (ArgBool_6854("opt"))(Just_6690(false));
const builtinsPathArg_6884 = (ArgString_6855("builtins"))(Nothing_6691);
const outPathArg_6885 = (ArgString_6855("out"))(Nothing_6691);
const argDefs_6889 = [builtinsPathArg_6884,outPathArg_6885,mainArg_6886,profileArg_6887,optArg_6888];
const liftPass_6890 = local$instance$Monad$0 => p_6973 => a_6974 => (ret(local$instance$Monad$0))(p_6973(a_6974));
const normalizeImportsPass_6891 = m_6975 => (($gt$gt$eq($instance_511))(getExports_6875))(es_6976 => (ret($instance_511))((normalizeImports_6861(es_6976))(m_6975)));
const moduleFile_6877 = m_6896 => {
  let $phi$713;
  if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
    $phi$713 = m_6896.$1
  } else error("pattern match fail",m_6896);
  return $phi$713
};
const typerPass_6892 = m_6977 => (($gt$gt$eq($instance_511))(getExports_6875))(es_6978 => {
  const typed_6979 = (inferTypeModule_6848(es_6978))(m_6977);
  const e_6980 = getTypedExports_6849(typed_6979);
  return (($gt$gt_6765($instance_511))(setExports_6874(((set(moduleFile_6877(m_6977)))(e_6980))(es_6978))))((ret($instance_511))(typed_6979))
});
const declasserPass_6893 = m_6981 => (($gt$gt$eq($instance_511))(getExports_6875))(es_6982 => (ret($instance_511))((declassModule_6860(es_6982))(m_6981)));
const parse_6878 = fn_6904 => {
  let $phi$714;
  const $phi$715 = (parseModule_6841(readFile(fn_6904)))("//"+fn_6904);
  if((($phi$715.$tag==0)&&true)&&(((((true&&true)&&true)&&true)&&true)&&true)){
    let $phi$716;
    const $phi$717 = (($eq$eq($instance_459))($phi$715.$1.$1))(length($phi$715.$1.$0));
    if($phi$717){
      $phi$716 = $phi$715.$0
    } else if(!$phi$717){
      $phi$716 = (error((fn_6904+": failed to parse all tokens, stopped at ")+(jsonStringify((getIx($phi$715.$1.$1))($phi$715.$1.$0)))))
    } else error("pattern match fail",$phi$717);
    $phi$714 = $phi$716
  } else if(($phi$715.$tag==1)&&true){
    $phi$714 = (error((fn_6904+": ")+$phi$715.$0))
  } else error("pattern match fail",$phi$715);
  return $phi$714
};
const findImports_6880 = m_6920 => {
  const importFileName_6921 = i_6922 => {
    let $phi$718;
    if(((i_6922.$tag==2)&&true)&&true){
      $phi$718 = i_6922.$1
    } else if((((i_6922.$tag==1)&&true)&&true)&&true){
      $phi$718 = i_6922.$1
    } else if((((i_6922.$tag==0)&&true)&&true)&&true){
      $phi$718 = i_6922.$1
    } else error("pattern match fail",i_6922);
    return $phi$718
  };
  let $phi$719;
  if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
    $phi$719 = ((map(importFileName_6921))(m_6920.$2))
  } else error("pattern match fail",m_6920);
  return $phi$719
};
const depSort_6879 = mainName_6912 => ms_6913 => {
  const modules_6914 = ((foldl(r_6917 => m_6918 => ((set(moduleFile_6877(m_6918)))(m_6918))(r_6917)))(empty))(ms_6913);
  const imports_6915 = (mapRecord(findImports_6880))(modules_6914);
  const ordered_6916 = ((dfs_6853(imports_6915))([]))(mainName_6912);
  return ($_6697(reverse_6743))((map(n_6919 => (get(n_6919))(modules_6914)))(ordered_6916))
};
const parseT_6881 = s_6938 => {
  let $phi$720;
  const $phi$721 = (parseType_6842(s_6938))("");
  if((($phi$721.$tag==0)&&true)&&true){
    $phi$720 = $phi$721.$0
  } else if(true){
    $phi$720 = (error($phi$721))
  } else error("pattern match fail",$phi$721);
  return $phi$720
};
const parseExports_6882 = e_6942 => {
  const bs_6943 = (mapRecord(s_6944 => ($_6697(skolemizeType_6851))((evalState_6735(newCtx_6847))((generalize_6850(emptyEnv_6852))(parseT_6881(s_6944))))))(e_6942);
  return ((ModuleInterface_6827(bs_6943))([]))(Empty_6693)
};
const instrument_6883 = m_6945 => {
  const addImport_6948 = i_6962 => {
    let $phi$722;
    if((((i_6962.$tag==1)&&true)&&("./builtins.js"==i_6962.$1))&&true){
      $phi$722 = (((ImportOpen_6823(i_6962.$0))("./builtins.js"))((push((Pair_6684("perfTime"))("perfTime")))(i_6962.$2)))
    } else if(true){
      $phi$722 = i_6962
    } else error("pattern match fail",i_6962);
    return $phi$722
  };
  const instrumentExpr_6947 = n_6955 => e_6956 => {
    let $phi$723;
    if((((e_6956.$tag==3)&&true)&&true)&&true){
      $phi$723 = (((Lam_6775(e_6956.$0))(e_6956.$1))((instrumentExpr_6947(n_6955))(e_6956.$2)))
    } else if(true){
      const we_6961 = ((Lam_6775(emptyAnn_6821))("$unused$"))(e_6956);
      $phi$723 = (((App_6774(emptyAnn_6821))(((App_6774(emptyAnn_6821))((Var_6793(emptyAnn_6821))("perfTime")))((Const_6794(emptyAnn_6821))(CStr_6832(n_6955)))))(we_6961))
    } else error("pattern match fail",e_6956);
    return $phi$723
  };
  const instrumentDef_6946 = d_6949 => {
    let $phi$724;
    if((true&&true)&&((((d_6949.$1.$tag==3)&&true)&&true)&&true)){
      $phi$724 = ((Pair_6684(d_6949.$0))((instrumentExpr_6947(d_6949.$0))(((Lam_6775(d_6949.$1.$0))(d_6949.$1.$1))(d_6949.$1.$2))))
    } else if(true){
      $phi$724 = d_6949
    } else error("pattern match fail",d_6949);
    return $phi$724
  };
  let $phi$725;
  if(((((((true&&true)&&true)&&true)&&true)&&true)&&true)&&true){
    $phi$725 = (((((((Module_6828(m_6945.$0))(m_6945.$1))((map(addImport_6948))(m_6945.$2)))(m_6945.$3))(m_6945.$4))(m_6945.$5))((map(instrumentDef_6946))(m_6945.$6)))
  } else error("pattern match fail",m_6945);
  return $phi$725
};
const instrumentPass_6894 = local$instance$Monad$0 => profile_6983 => m_6984 => {
  let $phi$726;
  if(!profile_6983){
    $phi$726 = ((ret(local$instance$Monad$0))(m_6984))
  } else if(profile_6983){
    $phi$726 = ((ret(local$instance$Monad$0))(instrument_6883(m_6984)))
  } else error("pattern match fail",profile_6983);
  return $phi$726
};
const main_6895 = argv_6985 => {
  const args_6986 = (parseArgs_6856(argDefs_6889))((slice(2))(argv_6985));
  const srcFiles_6990 = getPositional_6857(args_6986);
  const builtinsPath_6987 = (getString_6858(args_6986))(builtinsPathArg_6884);
  const baseExports_6993 = ((set("./builtins.js"))(parseExports_6882(loadJSExports(builtinsPath_6987))))(empty);
  const mainName_6989 = "//"+((getString_6858(args_6986))(mainArg_6886));
  const profile_6991 = (getBool_6859(args_6986))(profileArg_6887);
  const opt_6992 = (getBool_6859(args_6986))(optArg_6888);
  const passes_6994 = (($gt$eq$gt_6687($instance_511))((($gt$eq$gt_6687($instance_511))((($gt$eq$gt_6687($instance_511))((($gt$eq$gt_6687($instance_511))((($gt$eq$gt_6687($instance_511))((($gt$eq$gt_6687($instance_511))((($gt$eq$gt_6687($instance_511))((perModule_6871($instance_511))(($_6697(timed_6870("parse")))((liftPass_6890($instance_511))(parse_6878)))))((timed_6870("dep-sort"))((liftPass_6890($instance_511))(depSort_6879(mainName_6989))))))((perModule_6871($instance_511))((($gt$eq$gt_6687($instance_511))((($gt$eq$gt_6687($instance_511))((($gt$eq$gt_6687($instance_511))((($gt$eq$gt_6687($instance_511))((timed_6870("translate-adts"))((liftPass_6890($instance_511))(translateAdts_6865))))((timed_6870("normalize-imports"))(normalizeImportsPass_6891))))((timed_6870("uniquify"))(uniquify_6862))))((timed_6870("typer"))(typerPass_6892))))((timed_6870("declasser"))(declasserPass_6893))))))((timed_6870("merge-modules"))((liftPass_6890($instance_511))(mergeModules_6863)))))((timed_6870("opt"))(inline_6864(opt_6992)))))((timed_6870("instrument"))((instrumentPass_6894($instance_511))(profile_6991)))))((timed_6870("generate-js"))((liftPass_6890($instance_511))(generateJs_6844(builtinsPath_6987))))))(reportTimes_6867);
  const js_6995 = (evalState_6735(((CompilerState_6866(baseExports_6993))(0))(Empty_6693)))(passes_6994(srcFiles_6990));
  const outPath_6988 = (getString_6858(args_6986))(outPathArg_6885);
  return (writeFile(js_6995))(outPath_6988)
};
const exports = {mainArg:mainArg_6886,profileArg:profileArg_6887,optArg:optArg_6888,builtinsPathArg:builtinsPathArg_6884,outPathArg:outPathArg_6885,argDefs:argDefs_6889,liftPass:liftPass_6890,normalizeImportsPass:normalizeImportsPass_6891,moduleFile:moduleFile_6877,typerPass:typerPass_6892,declasserPass:declasserPass_6893,parse:parse_6878,findImports:findImports_6880,depSort:depSort_6879,parseT:parseT_6881,parseExports:parseExports_6882,instrument:instrument_6883,instrumentPass:instrumentPass_6894,main:main_6895}
module.exports = exports;})();if (module.exports.main)module.exports.main(process.argv)