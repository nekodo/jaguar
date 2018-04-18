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

builtins.$lt = function(a) {
    return function(b) {
        return a < b
    }
}

builtins.$gt = function(a) {
    return function(b) {
        return a > b
    }
}

builtins.$eq = function(a) {
    return function(b) {
        return a === b
    }
}

builtins.$neq = function(a) {
    return function(b) {
        return a !== b
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
    '<': 'a -> a -> Bool',
    '>': 'a -> a -> Bool',
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
(function() {var writeFile = (_require("./builtins.js")).writeFile;
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
var arrDel = (_require("./builtins.js")).arrDel;
var arrIns = (_require("./builtins.js")).arrIns;
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
var stringSplit = (_require("./builtins.js")).stringSplit;
var currentTimeMs = (_require("./builtins.js")).currentTimeMs;
var Pair_3 = function($_0_91){
  return function($_1_92){
    return {$0:$_0_91,$1:$_1_92}
  }
};
var Just_1 = function($_0_90){
  return {$0:$_0_90,$tag:0}
};
var Nothing_2 = {$tag:1};
var Empty_11 = {$tag:0};
var Leaf_12 = function($_0_114){
  return function($_1_115){
    return function($_2_116){
      return {$0:$_0_114,$1:$_1_115,$2:$_2_116,$tag:1}
    }
  }
};
var Collision_13 = function($_0_117){
  return function($_1_118){
    return {$0:$_0_117,$1:$_1_118,$tag:2}
  }
};
var BitmapIndexed_14 = function($_0_119){
  return function($_1_120){
    return function($_2_121){
      return {$0:$_0_119,$1:$_1_120,$2:$_2_121,$tag:3}
    }
  }
};
var Left_8 = function($_0_111){
  return {$0:$_0_111,$tag:0}
};
var Right_9 = function($_0_112){
  return {$0:$_0_112,$tag:1}
};
var Unit_0 = {};
var State_10 = function($_0_113){
  return {$0:$_0_113}
};
var Identity_15 = function($_0_122){
  return {$0:$_0_122}
};
var Tuple6_7 = function($_0_105){
  return function($_1_106){
    return function($_2_107){
      return function($_3_108){
        return function($_4_109){
          return function($_5_110){
            return {$0:$_0_105,$1:$_1_106,$2:$_2_107,$3:$_3_108,$4:$_4_109,$5:$_5_110}
          }
        }
      }
    }
  }
};
var Tuple5_6 = function($_0_100){
  return function($_1_101){
    return function($_2_102){
      return function($_3_103){
        return function($_4_104){
          return {$0:$_0_100,$1:$_1_101,$2:$_2_102,$3:$_3_103,$4:$_4_104}
        }
      }
    }
  }
};
var Tuple4_5 = function($_0_96){
  return function($_1_97){
    return function($_2_98){
      return function($_3_99){
        return {$0:$_0_96,$1:$_1_97,$2:$_2_98,$3:$_3_99}
      }
    }
  }
};
var Tuple3_4 = function($_0_93){
  return function($_1_94){
    return function($_2_95){
      return {$0:$_0_93,$1:$_1_94,$2:$_2_95}
    }
  }
};
var $class$Eq = function($_0){
  return {$0:$_0}
};
var $class$Ord = function($_0){
  return {$0:$_0}
};
var $class$Functor = function($_0){
  return {$0:$_0}
};
var $class$Applicative = function($_0){
  return function($_1){
    return {$0:$_0,$1:$_1}
  }
};
var $class$Alternative = function($_0){
  return function($_1){
    return {$0:$_0,$1:$_1}
  }
};
var $class$Monad = function($_0){
  return function($_1){
    return {$0:$_0,$1:$_1}
  }
};
var $class$Hashable = function($_0){
  return {$0:$_0}
};
var $eq$eq = function(x_$class$Eq){
  var $phi$0 = x_$class$Eq.$0;
  return $phi$0
};
var $lt = function(x_$class$Ord){
  var $phi$1 = x_$class$Ord.$0;
  return $phi$1
};
var fmap = function(x_$class$Functor){
  var $phi$2 = x_$class$Functor.$0;
  return $phi$2
};
var pure = function(x_$class$Applicative){
  var $phi$3 = x_$class$Applicative.$0;
  return $phi$3
};
var $lt$mul$gt = function(x_$class$Applicative){
  var $phi$4 = x_$class$Applicative.$1;
  return $phi$4
};
var zero = function(x_$class$Alternative){
  var $phi$5 = x_$class$Alternative.$0;
  return $phi$5
};
var $lt$pip$gt = function(x_$class$Alternative){
  var $phi$6 = x_$class$Alternative.$1;
  return $phi$6
};
var ret = function(x_$class$Monad){
  var $phi$7 = x_$class$Monad.$0;
  return $phi$7
};
var $gt$gt$eq = function(x_$class$Monad){
  var $phi$8 = x_$class$Monad.$1;
  return $phi$8
};
var hashCode = function(x_$class$Hashable){
  var $phi$9 = x_$class$Hashable.$0;
  return $phi$9
};
var $instance$Eq$0 = $class$Eq(jsEq);
var $instance$Eq$1 = $class$Eq(jsEq);
var $instance$Ord$2 = $class$Ord(jsLt);
var $instance$Ord$3 = $class$Ord(jsLt);
var $instance$Functor$4 = $class$Functor(function(f_454){
  return function(m_455){
    if(m_455.$tag==0){
      var $phi$10 = Just_1(f_454(m_455.$0))
    } else if(m_455.$tag==1){
      var $phi$10 = Nothing_2
    } else error("pattern match fail",m_455);
    return $phi$10
  }
});
var $instance$Applicative$5 = ($class$Applicative(function(x_457){
  return Just_1(x_457)
}))(function(f_458){
  return function(x_459){
    if(f_458.$tag==1){
      var $phi$11 = Nothing_2
    } else if(f_458.$tag==0){
      var $phi$11 = ((fmap($instance$Functor$4))(f_458.$0))(x_459)
    } else error("pattern match fail",f_458);
    return $phi$11
  }
});
var $instance$Alternative$6 = ($class$Alternative(Nothing_2))(function(a_461){
  return function(b_462){
    if(a_461.$tag==1){
      var $phi$12 = b_462
    } else var $phi$12 = a_461;
    return $phi$12
  }
});
var $instance$Monad$7 = ($class$Monad(pure($instance$Applicative$5)))(function(a_464){
  return function(f_465){
    if(a_464.$tag==1){
      var $phi$13 = Nothing_2
    } else if(a_464.$tag==0){
      var $phi$13 = f_465(a_464.$0)
    } else error("pattern match fail",a_464);
    return $phi$13
  }
});
var $instance$Functor$8 = $class$Functor(function(f_467){
  return function(e_468){
    if(e_468.$tag==0){
      var $phi$14 = Left_8(e_468.$0)
    } else if(e_468.$tag==1){
      var $phi$14 = Right_9(f_467(e_468.$0))
    } else error("pattern match fail",e_468);
    return $phi$14
  }
});
var $instance$Functor$9 = $class$Functor(function(f_471){
  return function(s_472){
    var $phi$15 = State_10(function(s_474){
      var $phi$17 = s_472.$0(s_474);
      var $phi$16 = (Pair_3($phi$17.$0))(f_471($phi$17.$1));
      return $phi$16
    });
    return $phi$15
  }
});
var $instance$Applicative$10 = ($class$Applicative(function(a_477){
  return State_10(function(s_478){
    return (Pair_3(s_478))(a_477)
  })
}))(function(f_479){
  return function(a_480){
    var $phi$19 = State_10(function(s_483){
      var $phi$21 = f_479.$0(s_483);
      var $phi$23 = a_480.$0($phi$21.$0);
      var $phi$22 = (Pair_3($phi$23.$0))($phi$21.$1($phi$23.$1));
      var $phi$20 = $phi$22;
      return $phi$20
    });
    var $phi$18 = $phi$19;
    return $phi$18
  }
});
var $instance$Monad$11 = ($class$Monad(pure($instance$Applicative$10)))(function(a_488){
  return function(f_489){
    var $phi$24 = State_10(function(s_491){
      var $phi$26 = a_488.$0(s_491);
      var $phi$28 = f_489($phi$26.$1);
      var $phi$27 = $phi$28.$0($phi$26.$0);
      var $phi$25 = $phi$27;
      return $phi$25
    });
    return $phi$24
  }
});
var $instance$Hashable$12 = $class$Hashable(function(n_495){
  return n_495
});
var $instance$Hashable$13 = $class$Hashable(function(s_496){
  return strHashCode(s_496)
});
var $instance$Functor$14 = $class$Functor(function(f_497){
  return function(i_498){
    var $phi$29 = Identity_15(f_497(i_498.$0));
    return $phi$29
  }
});
var $instance$Applicative$15 = ($class$Applicative(function(x_500){
  return Identity_15(x_500)
}))(function(f_501){
  return function(x_502){
    var $phi$30 = ((fmap($instance$Functor$14))(f_501.$0))(x_502);
    return $phi$30
  }
});
var $instance$Monad$16 = ($class$Monad(pure($instance$Applicative$15)))(function(a_504){
  return function(f_505){
    var $phi$31 = f_505(a_504.$0);
    return $phi$31
  }
});
var assert_89 = function(s_452){
  return function(b_453){
    if(b_453){
      var $phi$32 = true
    } else if(!b_453){
      var $phi$32 = error(s_452)
    } else error("pattern match fail",b_453);
    return $phi$32
  }
};
var mapSnd_88 = function(f_448){
  return function(p_449){
    var $phi$33 = (Pair_3(p_449.$0))(f_448(p_449.$1));
    return $phi$33
  }
};
var mapFst_87 = function(f_444){
  return function(p_445){
    var $phi$34 = (Pair_3(f_444(p_445.$0)))(p_445.$1);
    return $phi$34
  }
};
var $gt$eq$gt_86 = function(local$instance$Monad$0){
  return function(a_441){
    return function(b_442){
      return function(x_443){
        return (($gt$gt$eq(local$instance$Monad$0))(a_441(x_443)))(b_442)
      }
    }
  }
};
var snd_27 = function(p_150){
  var $phi$35 = p_150.$1;
  return $phi$35
};
var debug2_85 = function(p_439){
  return function(x_440){
    return snd_27((Pair_3(debug(p_439)))(x_440))
  }
};
var isJust_25 = function(m_145){
  if(m_145.$tag==0){
    var $phi$36 = true
  } else if(m_145.$tag==1){
    var $phi$36 = false
  } else error("pattern match fail",m_145);
  return $phi$36
};
var $_16 = function(f_123){
  return function(a_124){
    return f_123(a_124)
  }
};
var fst_26 = function(p_147){
  var $phi$37 = p_147.$0;
  return $phi$37
};
var loop_31 = function(f_168){
  return function(start_169){
    var shouldStop_170 = function(x_174){
      if(x_174.$1.$tag==1){
        var $phi$38 = false
      } else var $phi$38 = true;
      return $phi$38
    };
    var next_171 = function(xr_177){
      var $phi$41 = f_168(xr_177.$0);
      if($phi$41.$tag==0){
        var $phi$40 = (Pair_3($phi$41.$0))(Nothing_2)
      } else if($phi$41.$tag==1){
        var $phi$40 = (Pair_3(xr_177.$0))(Just_1($phi$41.$0))
      } else error("pattern match fail",$phi$41);
      var $phi$39 = $phi$40;
      return $phi$39
    };
    var sp_172 = (Pair_3(start_169))(Nothing_2);
    var result_173 = ((iterate(sp_172))(shouldStop_170))(next_171);
    var $phi$43 = snd_27(result_173);
    if($phi$43.$tag==0){
      var $phi$42 = $phi$43.$0
    } else error("pattern match fail",$phi$43);
    return $phi$42
  }
};
var find_33 = function(predicate_187){
  return function(xs_188){
    var f_189 = function(i_190){
      var $phi$45 = (($lt($instance$Ord$2))(i_190))(length(xs_188));
      if(!$phi$45){
        var $phi$44 = Right_9(Nothing_2)
      } else if($phi$45){
        var $phi$47 = predicate_187((getIx(i_190))(xs_188));
        if($phi$47){
          var $phi$46 = Right_9(Just_1((getIx(i_190))(xs_188)))
        } else if(!$phi$47){
          var $phi$46 = Left_8(i_190+1)
        } else error("pattern match fail",$phi$47);
        var $phi$44 = $phi$46
      } else error("pattern match fail",$phi$45);
      return $phi$44
    };
    return (loop_31(f_189))(0)
  }
};
var hamtMask_62 = function(depth_278){
  return function(hash_279){
    var h_280 = (hash_279>>>(depth_278*5))&31;
    return 1<<h_280
  }
};
var popCount_61 = function(n_272){
  var n2_273 = n_272-((n_272>>>1)&1431655765);
  var n3_274 = (n2_273&858993459)+((n2_273>>>2)&858993459);
  var n4_275 = (n3_274+(n3_274>>>4))&252645135;
  var n5_276 = n4_275+(n4_275>>>8);
  var n6_277 = n5_276+(n5_276>>>16);
  return n6_277&127
};
var hamtIndex_63 = function(bitmap_281){
  return function(mask_282){
    return popCount_61(bitmap_281&(mask_282-1))
  }
};
var lookup_64 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_283){
      return function(t_284){
        var hash_285 = (hashCode(local$instance$Hashable$1))(k_283);
        var f_286 = function(depth_287){
          return function(t_288){
            if(t_288.$tag==0){
              var $phi$48 = Nothing_2
            } else if(t_288.$tag==1){
              var $phi$52 = (($eq$eq(local$instance$Eq$0))(k_283))(t_288.$1);
              if(!$phi$52){
                var $phi$51 = Nothing_2
              } else if($phi$52){
                var $phi$51 = Just_1(t_288.$2)
              } else error("pattern match fail",$phi$52);
              var $phi$48 = $phi$51
            } else if(t_288.$tag==2){
              var $phi$48 = ($_16((fmap($instance$Functor$4))(snd_27)))((find_33(function(e_294){
                return (($eq$eq(local$instance$Eq$0))(fst_26(e_294)))(k_283)
              }))(t_288.$1))
            } else if(t_288.$tag==3){
              var m_298 = (hamtMask_62(depth_287))(hash_285);
              var $phi$50 = m_298&t_288.$1;
              if(0==$phi$50){
                var $phi$49 = Nothing_2
              } else var $phi$49 = (f_286(depth_287+1))((getIx((hamtIndex_63(t_288.$1))(m_298)))(t_288.$2));
              var $phi$48 = $phi$49
            } else error("pattern match fail",t_288);
            return $phi$48
          }
        };
        return (f_286(0))(t_284)
      }
    }
  }
};
var setContains_80 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_423){
      return function(s_424){
        return isJust_25((((lookup_64(local$instance$Hashable$1))(local$instance$Eq$0))(a_423))(s_424))
      }
    }
  }
};
var foldTrie_70 = function(f_373){
  return function(a_374){
    return function(t_375){
      if(t_375.$tag==0){
        var $phi$53 = a_374
      } else if(t_375.$tag==1){
        var $phi$53 = ((f_373(a_374))(t_375.$1))(t_375.$2)
      } else if(t_375.$tag==2){
        var $phi$53 = ((foldl(function(a_381){
          return function(e_382){
            return ((f_373(a_381))(fst_26(e_382)))(snd_27(e_382))
          }
        }))(a_374))(t_375.$1)
      } else if(t_375.$tag==3){
        var $phi$53 = ((foldl(foldTrie_70(f_373)))(a_374))(t_375.$2)
      } else error("pattern match fail",t_375);
      return $phi$53
    }
  }
};
var emptySet_76 = Empty_11;
var not_30 = function(b_167){
  if(b_167){
    var $phi$54 = false
  } else if(!b_167){
    var $phi$54 = true
  } else error("pattern match fail",b_167);
  return $phi$54
};
var $div$eq_17 = function(local$instance$Eq$0){
  return function(a_125){
    return function(b_126){
      return not_30((($eq$eq(local$instance$Eq$0))(a_125))(b_126))
    }
  }
};
var mapIx_34 = function(f_191){
  return function(ix_192){
    return function(xs_193){
      return ((setIx(ix_192))(f_191((getIx(ix_192))(xs_193))))(xs_193)
    }
  }
};
var insert_65 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_300){
      return function(v_301){
        return function(t_302){
          var hash_303 = (hashCode(local$instance$Hashable$1))(k_300);
          var f_304 = function(depth_305){
            return function(t_306){
              if(t_306.$tag==0){
                var $phi$55 = ((Leaf_12(0))(k_300))(v_301)
              } else if(t_306.$tag==2){
                var $phi$55 = (Collision_13(t_306.$0))((push((Pair_3(k_300))(v_301)))((filter(function(e_309){
                  return (($div$eq_17(local$instance$Eq$0))(fst_26(e_309)))(k_300)
                }))(t_306.$1)))
              } else if(t_306.$tag==1){
                var $phi$59 = (($eq$eq(local$instance$Eq$0))(k_300))(t_306.$1);
                if($phi$59){
                  var $phi$58 = ((Leaf_12(t_306.$0))(k_300))(v_301)
                } else if(!$phi$59){
                  if(7==depth_305){
                    var $phi$60 = (Collision_13(t_306.$0))([(Pair_3(t_306.$1))(t_306.$2),(Pair_3(k_300))(v_301)])
                  } else {
                    var m_314 = (hamtMask_62(depth_305))((hashCode(local$instance$Hashable$1))(t_306.$1));
                    var $phi$60 = (f_304(depth_305))(((BitmapIndexed_14(t_306.$0))(m_314))([((Leaf_12(m_314))(t_306.$1))(t_306.$2)]))
                  };
                  var $phi$58 = $phi$60
                } else error("pattern match fail",$phi$59);
                var $phi$55 = $phi$58
              } else if(t_306.$tag==3){
                var m_318 = (hamtMask_62(depth_305))(hash_303);
                var bitmap2_319 = m_318|t_306.$1;
                var ix_320 = (hamtIndex_63(bitmap2_319))(m_318);
                var $phi$57 = m_318&t_306.$1;
                if(0==$phi$57){
                  var $phi$56 = ((BitmapIndexed_14(t_306.$0))(bitmap2_319))(((arrIns(ix_320))(((Leaf_12(m_318))(k_300))(v_301)))(t_306.$2))
                } else var $phi$56 = ((BitmapIndexed_14(t_306.$0))(bitmap2_319))(((mapIx_34(f_304(depth_305+1)))(ix_320))(t_306.$2));
                var $phi$55 = $phi$56
              } else error("pattern match fail",t_306);
              return $phi$55
            }
          };
          return (f_304(0))(t_302)
        }
      }
    }
  }
};
var setAdd_77 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_417){
      return function(s_418){
        return ((((insert_65(local$instance$Hashable$1))(local$instance$Eq$0))(a_417))(Unit_0))(s_418)
      }
    }
  }
};
var setIntersection_84 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_433){
      return function(b_434){
        var f_435 = function(r_436){
          return function(k_437){
            return function(__438){
              var $phi$62 = (((setContains_80(local$instance$Hashable$1))(local$instance$Eq$0))(k_437))(a_433);
              if(!$phi$62){
                var $phi$61 = r_436
              } else if($phi$62){
                var $phi$61 = (((setAdd_77(local$instance$Hashable$1))(local$instance$Eq$0))(k_437))(r_436)
              } else error("pattern match fail",$phi$62);
              return $phi$61
            }
          }
        };
        return ((foldTrie_70(f_435))(emptySet_76))(b_434)
      }
    }
  }
};
var remove_67 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_327){
      return function(t_328){
        var hash_329 = (hashCode(local$instance$Hashable$1))(k_327);
        var f_330 = function(depth_331){
          return function(t_332){
            if(t_332.$tag==0){
              var $phi$63 = Empty_11
            } else if(t_332.$tag==1){
              var $phi$73 = (($eq$eq(local$instance$Eq$0))(t_332.$1))(k_327);
              if($phi$73){
                var $phi$72 = Empty_11
              } else if(!$phi$73){
                var $phi$72 = t_332
              } else error("pattern match fail",$phi$73);
              var $phi$63 = $phi$72
            } else if(t_332.$tag==2){
              var entries2_338 = (filter(function(e_339){
                return (($div$eq_17(local$instance$Eq$0))(fst_26(e_339)))(k_327)
              }))(t_332.$1);
              var $phi$71 = length(entries2_338);
              if(0==$phi$71){
                var $phi$70 = Empty_11
              } else if(1==$phi$71){
                var $phi$70 = ((Leaf_12(t_332.$0))(fst_26((getIx(0))(entries2_338))))(snd_27((getIx(0))(entries2_338)))
              } else var $phi$70 = (Collision_13(t_332.$0))(entries2_338);
              var $phi$63 = $phi$70
            } else if(t_332.$tag==3){
              var m_344 = (hamtMask_62(depth_331))(hash_329);
              var ix_345 = (hamtIndex_63(t_332.$1))(m_344);
              var $phi$65 = m_344&t_332.$1;
              if(0==$phi$65){
                var $phi$64 = t_332
              } else {
                var $phi$67 = (f_330(depth_331+1))((getIx(ix_345))(t_332.$2));
                if($phi$67.$tag==0){
                  var bitmap2_347 = (bitNot(m_344))&t_332.$1;
                  var $phi$69 = length(t_332.$2);
                  if(1==$phi$69){
                    var $phi$68 = Empty_11
                  } else if(2==$phi$69){
                    var $phi$68 = (getIx(1&(bitNot(ix_345))))(t_332.$2)
                  } else var $phi$68 = ((BitmapIndexed_14(t_332.$0))(bitmap2_347))(((arrDel(ix_345))(1))(t_332.$2));
                  var $phi$66 = $phi$68
                } else var $phi$66 = ((BitmapIndexed_14(t_332.$0))(t_332.$1))(((setIx(ix_345))($phi$67))(t_332.$2));
                var $phi$64 = $phi$66
              };
              var $phi$63 = $phi$64
            } else error("pattern match fail",t_332);
            return $phi$63
          }
        };
        return (f_330(0))(t_328)
      }
    }
  }
};
var setDiff_83 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_428){
      return function(b_429){
        return ((foldTrie_70(function(r_430){
          return function(k_431){
            return function(__432){
              return (((remove_67(local$instance$Hashable$1))(local$instance$Eq$0))(k_431))(r_430)
            }
          }
        }))(a_428))(b_429)
      }
    }
  }
};
var setToArray_82 = (foldTrie_70(function(vs_425){
  return function(v_426){
    return function(__427){
      return (push(v_426))(vs_425)
    }
  }
}))([]);
var mergeTrie_74 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_408){
      return function(b_409){
        return ((foldTrie_70(function(a_410){
          return function(k_411){
            return function(v_412){
              return ((((insert_65(local$instance$Hashable$1))(local$instance$Eq$0))(k_411))(v_412))(a_410)
            }
          }
        }))(a_408))(b_409)
      }
    }
  }
};
var setUnion_81 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return (mergeTrie_74(local$instance$Hashable$1))(local$instance$Eq$0)
  }
};
var setRemove_79 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return (remove_67(local$instance$Hashable$1))(local$instance$Eq$0)
  }
};
var setAddAll_78 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(vs_419){
      return function(s_420){
        return ((foldl(function(s_421){
          return function(v_422){
            return (((setAdd_77(local$instance$Hashable$1))(local$instance$Eq$0))(v_422))(s_421)
          }
        }))(s_420))(vs_419)
      }
    }
  }
};
var trieKeys_75 = function(m_413){
  return ((foldTrie_70(function(ks_414){
    return function(k_415){
      return function(__416){
        return (push(k_415))(ks_414)
      }
    }
  }))([]))(m_413)
};
var size_72 = function(t_397){
  if(t_397.$tag==0){
    var $phi$74 = 0
  } else if(t_397.$tag==1){
    var $phi$74 = 1
  } else if(t_397.$tag==2){
    var $phi$74 = length(t_397.$1)
  } else if(t_397.$tag==3){
    var $phi$74 = ((foldl($add))(0))((map(size_72))(t_397.$2))
  } else error("pattern match fail",t_397);
  return $phi$74
};
var mapTrie_71 = function(f_386){
  return function(t_387){
    if(t_387.$tag==0){
      var $phi$75 = Empty_11
    } else if(t_387.$tag==1){
      var $phi$75 = ((Leaf_12(t_387.$0))(t_387.$1))((f_386(t_387.$1))(t_387.$2))
    } else if(t_387.$tag==2){
      var $phi$75 = ($_16(Collision_13(t_387.$0)))((map(function(e_393){
        return ($_16(Pair_3(fst_26(e_393))))((f_386(fst_26(e_393)))(snd_27(e_393)))
      }))(t_387.$1))
    } else if(t_387.$tag==3){
      var $phi$75 = ($_16((BitmapIndexed_14(t_387.$0))(t_387.$1)))((map(mapTrie_71(f_386)))(t_387.$2))
    } else error("pattern match fail",t_387);
    return $phi$75
  }
};
var nodeMask_60 = function(t_263){
  if(t_263.$tag==0){
    var $phi$76 = 0
  } else if(t_263.$tag==1){
    var $phi$76 = t_263.$0
  } else if(t_263.$tag==2){
    var $phi$76 = t_263.$0
  } else if(t_263.$tag==3){
    var $phi$76 = t_263.$0
  } else error("pattern match fail",t_263);
  return $phi$76
};
var isEmpty_73 = function(t_406){
  if(t_406.$tag==0){
    var $phi$77 = true
  } else var $phi$77 = false;
  return $phi$77
};
var filterTrie_69 = function(f_353){
  return function(t_354){
    if(t_354.$tag==0){
      var $phi$78 = Empty_11
    } else if(t_354.$tag==1){
      var $phi$83 = (f_353(t_354.$1))(t_354.$2);
      if(!$phi$83){
        var $phi$82 = Empty_11
      } else if($phi$83){
        var $phi$82 = t_354
      } else error("pattern match fail",$phi$83);
      var $phi$78 = $phi$82
    } else if(t_354.$tag==2){
      var entries2_360 = (filter(function(e_361){
        return (f_353(fst_26(e_361)))(snd_27(e_361))
      }))(t_354.$1);
      var $phi$81 = length(entries2_360);
      if(0==$phi$81){
        var $phi$80 = Empty_11
      } else if(1==$phi$81){
        var $phi$80 = ((Leaf_12(t_354.$0))(fst_26((getIx(0))(entries2_360))))(snd_27((getIx(0))(entries2_360)))
      } else var $phi$80 = (Collision_13(t_354.$0))(entries2_360);
      var $phi$78 = $phi$80
    } else if(t_354.$tag==3){
      var pred_366 = function(e_369){
        return not_30(isEmpty_73(e_369))
      };
      var entries2_367 = (filter(pred_366))((map(filterTrie_69(f_353)))(t_354.$2));
      var bitmap2_368 = ((foldl(function(r_370){
        return function(e_371){
          return r_370|(nodeMask_60(e_371))
        }
      }))(0))(entries2_367);
      if(0==bitmap2_368){
        var $phi$79 = Empty_11
      } else var $phi$79 = ((BitmapIndexed_14(t_354.$0))(bitmap2_368))(entries2_367);
      var $phi$78 = $phi$79
    } else error("pattern match fail",t_354);
    return $phi$78
  }
};
var nextSetBitMask_68 = function(m_350){
  return function(n_351){
    var $phi$85 = m_350&n_351;
    if(0==$phi$85){
      var $phi$84 = (nextSetBitMask_68(m_350<<1))(n_351)
    } else var $phi$84 = m_350;
    return $phi$84
  }
};
var updateOrSet_66 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_322){
      return function(f_323){
        return function(d_324){
          return function(m_325){
            var $phi$87 = (((lookup_64(local$instance$Hashable$1))(local$instance$Eq$0))(k_322))(m_325);
            if($phi$87.$tag==1){
              var $phi$86 = ((((insert_65(local$instance$Hashable$1))(local$instance$Eq$0))(k_322))(d_324))(m_325)
            } else if($phi$87.$tag==0){
              var $phi$86 = ((((insert_65(local$instance$Hashable$1))(local$instance$Eq$0))(k_322))(f_323($phi$87.$0)))(m_325)
            } else error("pattern match fail",$phi$87);
            return $phi$86
          }
        }
      }
    }
  }
};
var runState_58 = function(s_258){
  return function(m_259){
    var $phi$88 = m_259.$0(s_258);
    return $phi$88
  }
};
var evalState_59 = function(s_261){
  return function(m_262){
    return snd_27((runState_58(s_261))(m_262))
  }
};
var sets_57 = function(s_256){
  return State_10(function(__257){
    return (Pair_3(s_256))(Unit_0)
  })
};
var gets_56 = State_10(function(s_255){
  return (Pair_3(s_255))(s_255)
});
var foldM_53 = function(local$instance$Monad$0){
  return function(f_242){
    return function(r_243){
      return function(xs_244){
        return ((foldl(function(r_245){
          return function(x_246){
            return (($gt$gt$eq(local$instance$Monad$0))(r_245))(function(r_247){
              return (f_242(r_247))(x_246)
            })
          }
        }))((ret(local$instance$Monad$0))(r_243)))(xs_244)
      }
    }
  }
};
var mapM_54 = function(local$instance$Monad$0){
  return function(f_248){
    return function(xs_249){
      return (((foldM_53(local$instance$Monad$0))(function(xs_250){
        return function(x_251){
          return (($gt$gt$eq(local$instance$Monad$0))(f_248(x_251)))(function(x_252){
            return (ret(local$instance$Monad$0))((push(x_252))(xs_250))
          })
        }
      }))([]))(xs_249)
    }
  }
};
var forM_55 = function(local$instance$Monad$0){
  return function(xs_253){
    return function(f_254){
      return ((mapM_54(local$instance$Monad$0))(f_254))(xs_253)
    }
  }
};
var strToArray_52 = function(s_237){
  var f_238 = function(p_239){
    var $phi$91 = (($lt($instance$Ord$2))(p_239.$0))(length(s_237));
    if(!$phi$91){
      var $phi$90 = Right_9(p_239.$1)
    } else if($phi$91){
      var $phi$90 = Left_8((Pair_3(p_239.$0+1))((push((getChar(p_239.$0))(s_237)))(p_239.$1)))
    } else error("pattern match fail",$phi$91);
    var $phi$89 = $phi$90;
    return $phi$89
  };
  return (loop_31(f_238))((Pair_3(0))([]))
};
var toRecord_51 = (foldl(function(r_233){
  return function(p_234){
    var $phi$92 = ((set(p_234.$0))(p_234.$1))(r_233);
    return $phi$92
  }
}))(empty);
var reverse_50 = (foldl(function(xs_231){
  return function(x_232){
    return (enqueue(x_232))(xs_231)
  }
}))([]);
var tail_45 = slice(1);
var head_44 = getIx(0);
var uniq_49 = function(local$instance$Eq$0){
  return function(xs_230){
    var $phi$94 = (($lt($instance$Ord$2))(length(xs_230)))(2);
    if($phi$94){
      var $phi$93 = xs_230
    } else if(!$phi$94){
      var $phi$96 = (($eq$eq(local$instance$Eq$0))((getIx(0))(xs_230)))((getIx(1))(xs_230));
      if(!$phi$96){
        var $phi$95 = (enqueue(head_44(xs_230)))((uniq_49(local$instance$Eq$0))(tail_45(xs_230)))
      } else if($phi$96){
        var $phi$95 = (uniq_49(local$instance$Eq$0))(tail_45(xs_230))
      } else error("pattern match fail",$phi$96);
      var $phi$93 = $phi$95
    } else error("pattern match fail",$phi$94);
    return $phi$93
  }
};
var mergeSet_48 = function(local$instance$Ord$1){
  return function(local$instance$Eq$0){
    return function(xs_226){
      return function(ys_227){
        var $phi$98 = length(xs_226);
        if(0==$phi$98){
          var $phi$97 = ys_227
        } else {
          var $phi$100 = length(ys_227);
          if(0==$phi$100){
            var $phi$99 = xs_226
          } else {
            var $phi$102 = (($lt(local$instance$Ord$1))(head_44(xs_226)))(head_44(ys_227));
            if($phi$102){
              var $phi$101 = (enqueue(head_44(xs_226)))((((mergeSet_48(local$instance$Ord$1))(local$instance$Eq$0))(tail_45(xs_226)))(ys_227))
            } else if(!$phi$102){
              var $phi$104 = (($eq$eq(local$instance$Eq$0))(head_44(xs_226)))(head_44(ys_227));
              if($phi$104){
                var $phi$103 = (enqueue(head_44(xs_226)))((((mergeSet_48(local$instance$Ord$1))(local$instance$Eq$0))(tail_45(xs_226)))(tail_45(ys_227)))
              } else if(!$phi$104){
                var $phi$103 = (enqueue(head_44(ys_227)))((((mergeSet_48(local$instance$Ord$1))(local$instance$Eq$0))(xs_226))(tail_45(ys_227)))
              } else error("pattern match fail",$phi$104);
              var $phi$101 = $phi$103
            } else error("pattern match fail",$phi$102);
            var $phi$99 = $phi$101
          };
          var $phi$97 = $phi$99
        };
        return $phi$97
      }
    }
  }
};
var init_47 = function(l_225){
  return ((slice2(0))((length(l_225))-1))(l_225)
};
var last_46 = function(l_224){
  return (getIx((length(l_224))-1))(l_224)
};
var mapJust_43 = function(f_218){
  return function(xs_219){
    var g_220 = function(r_221){
      return function(x_222){
        var $phi$106 = f_218(x_222);
        if($phi$106.$tag==1){
          var $phi$105 = r_221
        } else if($phi$106.$tag==0){
          var $phi$105 = (push($phi$106.$0))(r_221)
        } else error("pattern match fail",$phi$106);
        return $phi$105
      }
    };
    return ((foldl(g_220))([]))(xs_219)
  }
};
var concatMap_42 = function(f_216){
  return function(a_217){
    return ((foldl(concat))([]))((map(f_216))(a_217))
  }
};
var zip_41 = function(xs_214){
  return function(ys_215){
    var $phi$108 = ($or((($eq$eq($instance$Eq$0))(length(xs_214)))(0)))((($eq$eq($instance$Eq$0))(length(ys_215)))(0));
    if($phi$108){
      var $phi$107 = []
    } else if(!$phi$108){
      var $phi$107 = (enqueue((Pair_3(head_44(xs_214)))(head_44(ys_215))))((zip_41(tail_45(xs_214)))(tail_45(ys_215)))
    } else error("pattern match fail",$phi$108);
    return $phi$107
  }
};
var zipWithIndex2_39 = function(n_211){
  return function(xs_212){
    var $phi$110 = length(xs_212);
    if(0==$phi$110){
      var $phi$109 = []
    } else var $phi$109 = (enqueue((Pair_3(n_211))(head_44(xs_212))))((zipWithIndex2_39(n_211+1))(tail_45(xs_212)));
    return $phi$109
  }
};
var zipWithIndex_40 = zipWithIndex2_39(0);
var join_38 = function(xs_206){
  return function(s_207){
    var $phi$112 = length(xs_206);
    if(0==$phi$112){
      var $phi$111 = ""
    } else var $phi$111 = (foldl1(function(a_209){
      return function(b_210){
        return ($concat(($concat(a_209))(s_207)))(b_210)
      }
    }))(xs_206);
    return $phi$111
  }
};
var all_37 = function(f_202){
  return function(xs_203){
    return ((foldl(function(r_204){
      return function(x_205){
        return ($and(f_202(x_205)))(r_204)
      }
    }))(true))(xs_203)
  }
};
var exists_36 = function(f_198){
  return function(xs_199){
    return ((foldl(function(r_200){
      return function(x_201){
        return ($or(f_198(x_201)))(r_200)
      }
    }))(false))(xs_199)
  }
};
var containsChar_35 = function(x_194){
  return function(xs_195){
    var f_196 = function(i_197){
      var $phi$114 = (($lt($instance$Ord$2))(i_197))(length(xs_195));
      if(!$phi$114){
        var $phi$113 = false
      } else if($phi$114){
        var $phi$116 = (($eq$eq($instance$Eq$1))((getChar(i_197))(xs_195)))(x_194);
        if($phi$116){
          var $phi$115 = true
        } else if(!$phi$116){
          var $phi$115 = f_196(i_197+1)
        } else error("pattern match fail",$phi$116);
        var $phi$113 = $phi$115
      } else error("pattern match fail",$phi$114);
      return $phi$113
    };
    return f_196(0)
  }
};
var contains_32 = function(local$instance$Eq$0){
  return function(x_183){
    return function(xs_184){
      var f_185 = function(i_186){
        var $phi$118 = (($lt($instance$Ord$2))(i_186))(length(xs_184));
        if(!$phi$118){
          var $phi$117 = Right_9(false)
        } else if($phi$118){
          var $phi$120 = (($eq$eq(local$instance$Eq$0))(x_183))((getIx(i_186))(xs_184));
          if($phi$120){
            var $phi$119 = Right_9(true)
          } else if(!$phi$120){
            var $phi$119 = Left_8(i_186+1)
          } else error("pattern match fail",$phi$120);
          var $phi$117 = $phi$119
        } else error("pattern match fail",$phi$118);
        return $phi$117
      };
      return (loop_31(f_185))(0)
    }
  }
};
var either_28 = function(f_153){
  return function(g_154){
    return function(e_155){
      if(e_155.$tag==0){
        var $phi$121 = f_153(e_155.$0)
      } else if(e_155.$tag==1){
        var $phi$121 = g_154(e_155.$0)
      } else error("pattern match fail",e_155);
      return $phi$121
    }
  }
};
var splitEither_29 = function(a_158){
  return (Pair_3((map(function(e_159){
    if(e_159.$tag==0){
      var $phi$122 = e_159.$0
    } else error("pattern match fail",e_159);
    return $phi$122
  }))((filter((either_28(function(__161){
    return true
  }))(function(__162){
    return false
  })))(a_158))))((map(function(e_163){
    if(e_163.$tag==1){
      var $phi$123 = e_163.$0
    } else error("pattern match fail",e_163);
    return $phi$123
  }))((filter((either_28(function(__165){
    return false
  }))(function(__166){
    return true
  })))(a_158)))
};
var fromJust_24 = function(m_143){
  if(m_143.$tag==0){
    var $phi$124 = m_143.$0
  } else if(m_143.$tag==1){
    var $phi$124 = error("expected Just but got Nothing")
  } else error("pattern match fail",m_143);
  return $phi$124
};
var justOr_23 = function(d_140){
  return function(m_141){
    if(m_141.$tag==0){
      var $phi$125 = m_141.$0
    } else if(m_141.$tag==1){
      var $phi$125 = d_140
    } else error("pattern match fail",m_141);
    return $phi$125
  }
};
var maybe_22 = function(a_136){
  return function(b_137){
    return function(m_138){
      if(m_138.$tag==0){
        var $phi$126 = a_136(m_138.$0)
      } else if(m_138.$tag==1){
        var $phi$126 = b_137
      } else error("pattern match fail",m_138);
      return $phi$126
    }
  }
};
var $gt$gt_21 = function(local$instance$Monad$0){
  return function(a_133){
    return function(b_134){
      return (($gt$gt$eq(local$instance$Monad$0))(a_133))(function(__135){
        return b_134
      })
    }
  }
};
var $gt$eq_20 = function(local$instance$Ord$0){
  return function(a_131){
    return function(b_132){
      return not_30((($lt(local$instance$Ord$0))(a_131))(b_132))
    }
  }
};
var $lt$eq_19 = function(local$instance$Ord$0){
  return function(a_129){
    return function(b_130){
      return not_30((($lt(local$instance$Ord$0))(b_130))(a_129))
    }
  }
};
var $gt_18 = function(local$instance$Ord$0){
  return function(a_127){
    return function(b_128){
      return (($lt(local$instance$Ord$0))(b_128))(a_127)
    }
  }
};
var assert_507 = assert_89;
var Pair_508 = Pair_3;
var mapSnd_509 = mapSnd_88;
var mapFst_510 = mapFst_87;
var $gt$eq$gt_511 = $gt$eq$gt_86;
var snd_512 = snd_27;
var debug2_513 = debug2_85;
var Just_514 = Just_1;
var Nothing_515 = Nothing_2;
var isJust_516 = isJust_25;
var Empty_517 = Empty_11;
var Leaf_518 = Leaf_12;
var Collision_519 = Collision_13;
var BitmapIndexed_520 = BitmapIndexed_14;
var $_521 = $_16;
var fst_522 = fst_26;
var Left_523 = Left_8;
var Right_524 = Right_9;
var loop_525 = loop_31;
var find_526 = find_33;
var hamtMask_527 = hamtMask_62;
var popCount_528 = popCount_61;
var hamtIndex_529 = hamtIndex_63;
var lookup_530 = lookup_64;
var setContains_531 = setContains_80;
var foldTrie_532 = foldTrie_70;
var emptySet_533 = emptySet_76;
var Unit_534 = Unit_0;
var not_535 = not_30;
var $div$eq_536 = $div$eq_17;
var mapIx_537 = mapIx_34;
var insert_538 = insert_65;
var setAdd_539 = setAdd_77;
var setIntersection_540 = setIntersection_84;
var remove_541 = remove_67;
var setDiff_542 = setDiff_83;
var setToArray_543 = setToArray_82;
var mergeTrie_544 = mergeTrie_74;
var setUnion_545 = setUnion_81;
var setRemove_546 = setRemove_79;
var setAddAll_547 = setAddAll_78;
var trieKeys_548 = trieKeys_75;
var size_549 = size_72;
var mapTrie_550 = mapTrie_71;
var nodeMask_551 = nodeMask_60;
var isEmpty_552 = isEmpty_73;
var filterTrie_553 = filterTrie_69;
var nextSetBitMask_554 = nextSetBitMask_68;
var updateOrSet_555 = updateOrSet_66;
var State_556 = State_10;
var runState_557 = runState_58;
var evalState_558 = evalState_59;
var sets_559 = sets_57;
var gets_560 = gets_56;
var foldM_561 = foldM_53;
var mapM_562 = mapM_54;
var forM_563 = forM_55;
var strToArray_564 = strToArray_52;
var toRecord_565 = toRecord_51;
var reverse_566 = reverse_50;
var tail_567 = tail_45;
var head_568 = head_44;
var uniq_569 = uniq_49;
var mergeSet_570 = mergeSet_48;
var init_571 = init_47;
var last_572 = last_46;
var mapJust_573 = mapJust_43;
var concatMap_574 = concatMap_42;
var zip_575 = zip_41;
var zipWithIndex2_576 = zipWithIndex2_39;
var zipWithIndex_577 = zipWithIndex_40;
var join_578 = join_38;
var all_579 = all_37;
var exists_580 = exists_36;
var containsChar_581 = containsChar_35;
var contains_582 = contains_32;
var either_583 = either_28;
var splitEither_584 = splitEither_29;
var fromJust_585 = fromJust_24;
var justOr_586 = justOr_23;
var maybe_587 = maybe_22;
var $gt$gt_588 = $gt$gt_21;
var $gt$eq_589 = $gt$eq_20;
var $lt$eq_590 = $lt$eq_19;
var $gt_591 = $gt_18;
var Identity_592 = Identity_15;
var Tuple6_593 = Tuple6_7;
var Tuple5_594 = Tuple5_6;
var Tuple4_595 = Tuple4_5;
var Tuple3_596 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var dfs_597 = function(g_601){
  return function(visited_602){
    return function(v_603){
      var visit_604 = function(r_607){
        return function(e_608){
          var $phi$128 = ((contains_582($import1$instance$Eq$1))(e_608))(r_607);
          if($phi$128){
            var $phi$127 = r_607
          } else if(!$phi$128){
            var $phi$127 = (concat(((dfs_597(g_601))((push(v_603))((concat(r_607))(visited_602))))(e_608)))(r_607)
          } else error("pattern match fail",$phi$128);
          return $phi$127
        }
      };
      var es_605 = (filter(function(v_609){
        return not_535(((contains_582($import1$instance$Eq$1))(v_609))(visited_602))
      }))((get(v_603))(g_601));
      var r_606 = ((foldr(visit_604))([]))(es_605);
      return (enqueue(v_603))(r_606)
    }
  }
};
var fullDfs_598 = function(g_610){
  var visit_611 = function(result_613){
    return function(v_614){
      return function(__615){
        var $phi$130 = ((contains_582($import1$instance$Eq$1))(v_614))(result_613);
        if($phi$130){
          var $phi$129 = result_613
        } else if(!$phi$130){
          var $phi$129 = (concat(((dfs_597(g_610))(result_613))(v_614)))(result_613)
        } else error("pattern match fail",$phi$130);
        return $phi$129
      }
    }
  };
  var result_612 = ((foldRecord(visit_611))([]))(g_610);
  return result_612
};
var scc_599 = function(g_616){
  var invertEdge_621 = function(v_623){
    return function(ig_624){
      return function(e_625){
        var $phi$132 = (has(e_625))(ig_624);
        if($phi$132){
          var $phi$131 = ((set(e_625))((push(v_623))((get(e_625))(ig_624))))(ig_624)
        } else if(!$phi$132){
          var $phi$131 = ((set(e_625))([v_623]))(ig_624)
        } else error("pattern match fail",$phi$132);
        return $phi$131
      }
    }
  };
  var invert_622 = function(ig_626){
    return function(v_627){
      return function(es_628){
        var $phi$134 = (has(v_627))(ig_626);
        if($phi$134){
          var $phi$133 = ig_626
        } else if(!$phi$134){
          var $phi$133 = ((set(v_627))([]))(ig_626)
        } else error("pattern match fail",$phi$134);
        var ig2_629 = $phi$133;
        return ((foldl(invertEdge_621(v_627)))(ig2_629))(es_628)
      }
    }
  };
  var invertedG_617 = ((foldRecord(invert_622))(empty))(g_616);
  var assembleCc_618 = function(gs_630){
    return function(v_631){
      var $phi$137 = (exists_580((contains_582($import1$instance$Eq$1))(v_631)))(gs_630.$1);
      if($phi$137){
        var $phi$136 = (Pair_508(gs_630.$0))(gs_630.$1)
      } else if(!$phi$137){
        var cc_634 = ((dfs_597(gs_630.$0))([]))(v_631);
        var ig2_635 = ((foldl(function(g_636){
          return function(v_637){
            return (del(v_637))((mapRecord(filter(function(w_638){
              return (($div$eq_536($import1$instance$Eq$1))(w_638))(v_637)
            })))(g_636))
          }
        }))(gs_630.$0))(cc_634);
        var $phi$136 = (Pair_508(ig2_635))((push(cc_634))(gs_630.$1))
      } else error("pattern match fail",$phi$137);
      var $phi$135 = $phi$136;
      return $phi$135
    }
  };
  var firstDfs_619 = fullDfs_598(g_616);
  var ccs_620 = snd_512(((foldl(assembleCc_618))((Pair_508(invertedG_617))([])))(firstDfs_619));
  return ccs_620
};
var sccSorted_600 = function(g_639){
  var ccs_640 = scc_599(g_639);
  var topSort_641 = function(ccs_643){
    var f_648 = function(r_649){
      return function(icc_650){
        var $phi$138 = ((foldl(function(r_653){
          return function(c_654){
            return ((set(c_654))(intToString(icc_650.$0)))(r_653)
          }
        }))(r_649))(icc_650.$1);
        return $phi$138
      }
    };
    var g2g_644 = ((foldl(f_648))(empty))(zipWithIndex_577(ccs_643));
    var addGraph_645 = function(r_655){
      return function(v_656){
        return function(es_657){
          var rv_658 = (get(v_656))(g2g_644);
          var res_659 = (uniq_569($import1$instance$Eq$1))(sort((filter(function(re_660){
            return (($div$eq_536($import1$instance$Eq$1))(re_660))(rv_658)
          }))((map(function(e_661){
            return (get(e_661))(g2g_644)
          }))(es_657))));
          var $phi$140 = (has(rv_658))(r_655);
          if(!$phi$140){
            var $phi$139 = ((set(rv_658))(res_659))(r_655)
          } else if($phi$140){
            var $phi$139 = ((set(rv_658))((((mergeSet_570($import1$instance$Ord$3))($import1$instance$Eq$1))(res_659))((get(rv_658))(r_655))))(r_655)
          } else error("pattern match fail",$phi$140);
          return $phi$139
        }
      }
    };
    var cg_646 = ((foldRecord(addGraph_645))(empty))(g_639);
    var ord_647 = fullDfs_598(cg_646);
    return reverse_566((map(function(i_662){
      return (getIx(unsafeStringToInt(i_662)))(ccs_643)
    }))(ord_647))
  };
  var result_642 = topSort_641(ccs_640);
  return result_642
};
var assert_663 = assert_89;
var Pair_664 = Pair_3;
var mapSnd_665 = mapSnd_88;
var mapFst_666 = mapFst_87;
var $gt$eq$gt_667 = $gt$eq$gt_86;
var snd_668 = snd_27;
var debug2_669 = debug2_85;
var Just_670 = Just_1;
var Nothing_671 = Nothing_2;
var isJust_672 = isJust_25;
var Empty_673 = Empty_11;
var Leaf_674 = Leaf_12;
var Collision_675 = Collision_13;
var BitmapIndexed_676 = BitmapIndexed_14;
var $_677 = $_16;
var fst_678 = fst_26;
var Left_679 = Left_8;
var Right_680 = Right_9;
var loop_681 = loop_31;
var find_682 = find_33;
var hamtMask_683 = hamtMask_62;
var popCount_684 = popCount_61;
var hamtIndex_685 = hamtIndex_63;
var lookup_686 = lookup_64;
var setContains_687 = setContains_80;
var foldTrie_688 = foldTrie_70;
var emptySet_689 = emptySet_76;
var Unit_690 = Unit_0;
var not_691 = not_30;
var $div$eq_692 = $div$eq_17;
var mapIx_693 = mapIx_34;
var insert_694 = insert_65;
var setAdd_695 = setAdd_77;
var setIntersection_696 = setIntersection_84;
var remove_697 = remove_67;
var setDiff_698 = setDiff_83;
var setToArray_699 = setToArray_82;
var mergeTrie_700 = mergeTrie_74;
var setUnion_701 = setUnion_81;
var setRemove_702 = setRemove_79;
var setAddAll_703 = setAddAll_78;
var trieKeys_704 = trieKeys_75;
var size_705 = size_72;
var mapTrie_706 = mapTrie_71;
var nodeMask_707 = nodeMask_60;
var isEmpty_708 = isEmpty_73;
var filterTrie_709 = filterTrie_69;
var nextSetBitMask_710 = nextSetBitMask_68;
var updateOrSet_711 = updateOrSet_66;
var State_712 = State_10;
var runState_713 = runState_58;
var evalState_714 = evalState_59;
var sets_715 = sets_57;
var gets_716 = gets_56;
var foldM_717 = foldM_53;
var mapM_718 = mapM_54;
var forM_719 = forM_55;
var strToArray_720 = strToArray_52;
var toRecord_721 = toRecord_51;
var reverse_722 = reverse_50;
var tail_723 = tail_45;
var head_724 = head_44;
var uniq_725 = uniq_49;
var mergeSet_726 = mergeSet_48;
var init_727 = init_47;
var last_728 = last_46;
var mapJust_729 = mapJust_43;
var concatMap_730 = concatMap_42;
var zip_731 = zip_41;
var zipWithIndex2_732 = zipWithIndex2_39;
var zipWithIndex_733 = zipWithIndex_40;
var join_734 = join_38;
var all_735 = all_37;
var exists_736 = exists_36;
var containsChar_737 = containsChar_35;
var contains_738 = contains_32;
var either_739 = either_28;
var splitEither_740 = splitEither_29;
var fromJust_741 = fromJust_24;
var justOr_742 = justOr_23;
var maybe_743 = maybe_22;
var $gt$gt_744 = $gt$gt_21;
var $gt$eq_745 = $gt$eq_20;
var $lt$eq_746 = $lt$eq_19;
var $gt_747 = $gt_18;
var Identity_748 = Identity_15;
var Tuple6_749 = Tuple6_7;
var Tuple5_750 = Tuple5_6;
var Tuple4_751 = Tuple4_5;
var Tuple3_752 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_761 = function($_0_828){
  return function($_1_829){
    return function($_2_830){
      return {$0:$_0_828,$1:$_1_829,$2:$_2_830,$tag:2}
    }
  }
};
var Lam_762 = function($_0_831){
  return function($_1_832){
    return function($_2_833){
      return {$0:$_0_831,$1:$_1_832,$2:$_2_833,$tag:3}
    }
  }
};
var Case_763 = function($_0_834){
  return function($_1_835){
    return function($_2_836){
      return {$0:$_0_834,$1:$_1_835,$2:$_2_836,$tag:4}
    }
  }
};
var Let_764 = function($_0_837){
  return function($_1_838){
    return function($_2_839){
      return {$0:$_0_837,$1:$_1_838,$2:$_2_839,$tag:5}
    }
  }
};
var New_765 = function($_0_840){
  return function($_1_841){
    return function($_2_842){
      return {$0:$_0_840,$1:$_1_841,$2:$_2_842,$tag:6}
    }
  }
};
var AnnType_753 = function($_0_817){
  return {$0:$_0_817,$tag:0}
};
var TUnknown_785 = {$tag:7};
var Var_759 = function($_0_824){
  return function($_1_825){
    return {$0:$_0_824,$1:$_1_825,$tag:0}
  }
};
var Const_760 = function($_0_826){
  return function($_1_827){
    return {$0:$_0_826,$1:$_1_827,$tag:1}
  }
};
var Data_773 = function($_0_862){
  return function($_1_863){
    return function($_2_864){
      return function($_3_865){
        return {$0:$_0_862,$1:$_1_863,$2:$_2_864,$3:$_3_865}
      }
    }
  }
};
var DataCon_774 = function($_0_866){
  return function($_1_867){
    return function($_2_868){
      return {$0:$_0_866,$1:$_1_867,$2:$_2_868}
    }
  }
};
var TCBound_777 = function($_0_877){
  return function($_1_878){
    return function($_2_879){
      return {$0:$_0_877,$1:$_1_878,$2:$_2_879}
    }
  }
};
var TConst_778 = function($_0_880){
  return function($_1_881){
    return {$0:$_0_880,$1:$_1_881,$tag:0}
  }
};
var TVar_779 = function($_0_882){
  return function($_1_883){
    return {$0:$_0_882,$1:$_1_883,$tag:1}
  }
};
var TSkolem_780 = function($_0_884){
  return function($_1_885){
    return {$0:$_0_884,$1:$_1_885,$tag:2}
  }
};
var TApp_781 = function($_0_886){
  return function($_1_887){
    return function($_2_888){
      return {$0:$_0_886,$1:$_1_887,$2:$_2_888,$tag:3}
    }
  }
};
var TRow_782 = function($_0_889){
  return function($_1_890){
    return function($_2_891){
      return {$0:$_0_889,$1:$_1_890,$2:$_2_891,$tag:4}
    }
  }
};
var TBot_783 = {$tag:5};
var TForall_784 = function($_0_892){
  return function($_1_893){
    return function($_2_894){
      return function($_3_895){
        return {$0:$_0_892,$1:$_1_893,$2:$_2_894,$3:$_3_895,$tag:6}
      }
    }
  }
};
var AnnCodeLoc_754 = function($_0_818){
  return function($_1_819){
    return function($_2_820){
      return {$0:$_0_818,$1:$_1_819,$2:$_2_820,$tag:1}
    }
  }
};
var ImportAll_788 = function($_0_902){
  return function($_1_903){
    return {$0:$_0_902,$1:$_1_903,$tag:2}
  }
};
var ImportOpen_787 = function($_0_899){
  return function($_1_900){
    return function($_2_901){
      return {$0:$_0_899,$1:$_1_900,$2:$_2_901,$tag:1}
    }
  }
};
var ImportClosed_786 = function($_0_896){
  return function($_1_897){
    return function($_2_898){
      return {$0:$_0_896,$1:$_1_897,$2:$_2_898,$tag:0}
    }
  }
};
var Instance_776 = function($_0_873){
  return function($_1_874){
    return function($_2_875){
      return function($_3_876){
        return {$0:$_0_873,$1:$_1_874,$2:$_2_875,$3:$_3_876}
      }
    }
  }
};
var Class_775 = function($_0_869){
  return function($_1_870){
    return function($_2_871){
      return function($_3_872){
        return {$0:$_0_869,$1:$_1_870,$2:$_2_871,$3:$_3_872}
      }
    }
  }
};
var ModuleInterface_772 = function($_0_859){
  return function($_1_860){
    return function($_2_861){
      return {$0:$_0_859,$1:$_1_860,$2:$_2_861}
    }
  }
};
var Module_771 = function($_0_852){
  return function($_1_853){
    return function($_2_854){
      return function($_3_855){
        return function($_4_856){
          return function($_5_857){
            return function($_6_858){
              return {$0:$_0_852,$1:$_1_853,$2:$_2_854,$3:$_3_855,$4:$_4_856,$5:$_5_857,$6:$_6_858}
            }
          }
        }
      }
    }
  }
};
var PData_770 = function($_0_849){
  return function($_1_850){
    return function($_2_851){
      return {$0:$_0_849,$1:$_1_850,$2:$_2_851,$tag:2}
    }
  }
};
var PConst_769 = function($_0_847){
  return function($_1_848){
    return {$0:$_0_847,$1:$_1_848,$tag:1}
  }
};
var PVar_768 = function($_0_845){
  return function($_1_846){
    return {$0:$_0_845,$1:$_1_846,$tag:0}
  }
};
var CStr_767 = function($_0_844){
  return {$0:$_0_844,$tag:1}
};
var CNum_766 = function($_0_843){
  return {$0:$_0_843,$tag:0}
};
var AnnExport_758 = function($_0_823){
  return {$0:$_0_823,$tag:5}
};
var AnnTag_757 = {$tag:4};
var AnnData_756 = function($_0_822){
  return {$0:$_0_822,$tag:3}
};
var AnnUseCount_755 = function($_0_821){
  return {$0:$_0_821,$tag:2}
};
var breakableDownAndUpM_812 = function(local$instance$Monad$0){
  return function(down_1114){
    return function(up_1115){
      return function(e_1116){
        var go_1117 = ((breakableDownAndUpM_812(local$instance$Monad$0))(down_1114))(up_1115);
        var gos_1118 = (mapM_718(local$instance$Monad$0))(function(d_1119){
          var $phi$141 = (($gt$gt$eq(local$instance$Monad$0))(go_1117(d_1119.$1)))(function(e_1122){
            return (ret(local$instance$Monad$0))((Pair_664(d_1119.$0))(e_1122))
          });
          return $phi$141
        });
        return (($gt$gt$eq(local$instance$Monad$0))(down_1114(e_1116)))(function(e_1123){
          if(e_1123.$tag==1){
            var $phi$142 = (ret(local$instance$Monad$0))(e_1123.$0)
          } else if(e_1123.$tag==0){
            if(e_1123.$0.$tag==3){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(go_1117(e_1123.$0.$2)))(function(e_1129){
                return up_1115(((Lam_762(e_1123.$0.$0))(e_1123.$0.$1))(e_1129))
              })
            } else if(e_1123.$0.$tag==2){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(go_1117(e_1123.$0.$1)))(function(f_1133){
                return (($gt$gt$eq(local$instance$Monad$0))(go_1117(e_1123.$0.$2)))(function(x_1134){
                  return up_1115(((App_761(e_1123.$0.$0))(f_1133))(x_1134))
                })
              })
            } else if(e_1123.$0.$tag==4){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(go_1117(e_1123.$0.$1)))(function(e_1138){
                return (($gt$gt$eq(local$instance$Monad$0))(gos_1118(e_1123.$0.$2)))(function(ps_1139){
                  return up_1115(((Case_763(e_1123.$0.$0))(e_1138))(ps_1139))
                })
              })
            } else if(e_1123.$0.$tag==5){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(gos_1118(e_1123.$0.$1)))(function(bs_1143){
                return (($gt$gt$eq(local$instance$Monad$0))(go_1117(e_1123.$0.$2)))(function(e_1144){
                  return up_1115(((Let_764(e_1123.$0.$0))(bs_1143))(e_1144))
                })
              })
            } else if(e_1123.$0.$tag==6){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(((mapM_718(local$instance$Monad$0))(go_1117))(e_1123.$0.$2)))(function(es_1148){
                return up_1115(((New_765(e_1123.$0.$0))(e_1123.$0.$1))(es_1148))
              })
            } else var $phi$143 = up_1115(e_1123.$0);
            var $phi$142 = $phi$143
          } else error("pattern match fail",e_1123);
          return $phi$142
        })
      }
    }
  }
};
var breakableDownM_816 = function(local$instance$Monad$0){
  return function(f_1155){
    return ((breakableDownAndUpM_812(local$instance$Monad$0))(f_1155))(ret(local$instance$Monad$0))
  }
};
var downAndUpM_813 = function(local$instance$Monad$0){
  return function(down_1150){
    return function(up_1151){
      return ((breakableDownAndUpM_812(local$instance$Monad$0))(function(e_1152){
        return (($gt$gt$eq(local$instance$Monad$0))(down_1150(e_1152)))(function(e_1153){
          return (ret(local$instance$Monad$0))(Left_679(e_1153))
        })
      }))(up_1151)
    }
  }
};
var downM_815 = function(local$instance$Monad$0){
  return function(f_1154){
    return ((downAndUpM_813(local$instance$Monad$0))(f_1154))(ret(local$instance$Monad$0))
  }
};
var upM_814 = function(local$instance$Monad$0){
  return (downAndUpM_813(local$instance$Monad$0))(ret(local$instance$Monad$0))
};
var breakableDownAndUp_807 = function(down_1052){
  return function(up_1053){
    return function(a_1054){
      return function(e_1055){
        var go_1056 = (breakableDownAndUp_807(down_1052))(up_1053);
        var gos_1057 = function(a_1058){
          return (foldl(function(ar_1059){
            return function(p_1060){
              var $phi$145 = (go_1056(fst_678(ar_1059)))(snd_668(p_1060));
              var $phi$144 = (Pair_664($phi$145.$0))((push((Pair_664(fst_678(p_1060)))($phi$145.$1)))(snd_668(ar_1059)));
              return $phi$144
            }
          }))((Pair_664(a_1058))([]))
        };
        var $phi$147 = (down_1052(a_1054))(e_1055);
        if($phi$147.$tag==1){
          var $phi$146 = $phi$147.$0
        } else if($phi$147.$tag==0){
          if($phi$147.$0.$1.$tag==3){
            var $phi$167 = (go_1056($phi$147.$0.$0))($phi$147.$0.$1.$2);
            var $phi$166 = (Pair_664($phi$167.$0))(((Lam_762($phi$147.$0.$1.$0))($phi$147.$0.$1.$1))($phi$167.$1));
            var $phi$148 = $phi$166
          } else if($phi$147.$0.$1.$tag==2){
            var $phi$163 = (go_1056($phi$147.$0.$0))($phi$147.$0.$1.$1);
            var $phi$165 = (go_1056($phi$163.$0))($phi$147.$0.$1.$2);
            var $phi$164 = (Pair_664($phi$165.$0))(((App_761($phi$147.$0.$1.$0))($phi$163.$1))($phi$165.$1));
            var $phi$162 = $phi$164;
            var $phi$148 = $phi$162
          } else if($phi$147.$0.$1.$tag==4){
            var $phi$159 = (go_1056($phi$147.$0.$0))($phi$147.$0.$1.$1);
            var $phi$161 = (gos_1057($phi$159.$0))($phi$147.$0.$1.$2);
            var $phi$160 = (Pair_664($phi$161.$0))(((Case_763($phi$147.$0.$1.$0))($phi$159.$1))($phi$161.$1));
            var $phi$158 = $phi$160;
            var $phi$148 = $phi$158
          } else if($phi$147.$0.$1.$tag==5){
            var $phi$155 = (gos_1057($phi$147.$0.$0))($phi$147.$0.$1.$1);
            var $phi$157 = (go_1056($phi$155.$0))($phi$147.$0.$1.$2);
            var $phi$156 = (Pair_664($phi$157.$0))(((Let_764($phi$147.$0.$1.$0))($phi$155.$1))($phi$157.$1));
            var $phi$154 = $phi$156;
            var $phi$148 = $phi$154
          } else if($phi$147.$0.$1.$tag==6){
            var f_1096 = function(aes_1097){
              return function(e_1098){
                var $phi$151 = (go_1056(aes_1097.$0))(e_1098);
                var $phi$150 = (Pair_664($phi$151.$0))((push($phi$151.$1))(aes_1097.$1));
                var $phi$149 = $phi$150;
                return $phi$149
              }
            };
            var $phi$153 = ((foldl(f_1096))((Pair_664(a_1054))([])))($phi$147.$0.$1.$2);
            var $phi$152 = (Pair_664($phi$153.$0))(((New_765($phi$147.$0.$1.$0))($phi$147.$0.$1.$1))($phi$153.$1));
            var $phi$148 = $phi$152
          } else var $phi$148 = (Pair_664($phi$147.$0.$0))($phi$147.$0.$1);
          var ae_1066 = $phi$148;
          var $phi$168 = (up_1053(ae_1066.$0))(ae_1066.$1);
          var $phi$146 = $phi$168
        } else error("pattern match fail",$phi$147);
        return $phi$146
      }
    }
  }
};
var breakableDown_811 = function(f_1113){
  return (breakableDownAndUp_807(f_1113))(Pair_664)
};
var downAndUp_808 = function(down_1108){
  return function(up_1109){
    return (breakableDownAndUp_807(function(a_1110){
      return function(e_1111){
        return Left_679((down_1108(a_1110))(e_1111))
      }
    }))(up_1109)
  }
};
var down_810 = function(f_1112){
  return (downAndUp_808(f_1112))(Pair_664)
};
var up_809 = downAndUp_808(Pair_664);
var getAnn_790 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(name_904){
      return function(ann_905){
        return (((lookup_686(local$instance$Hashable$1))(local$instance$Eq$0))(name_904))(ann_905)
      }
    }
  }
};
var getAnnType_793 = function(ann_915){
  var $phi$170 = (((getAnn_790($import1$instance$Hashable$13))($import1$instance$Eq$1))("type"))(ann_915);
  if(($phi$170.$tag==0)&&($phi$170.$0.$tag==0)){
    var $phi$169 = $phi$170.$0.$0
  } else if($phi$170.$tag==1){
    var $phi$169 = TUnknown_785
  } else error("pattern match fail",$phi$170);
  return $phi$169
};
var annOf_804 = function(e_1010){
  if(e_1010.$tag==0){
    var $phi$171 = e_1010.$0
  } else if(e_1010.$tag==1){
    var $phi$171 = e_1010.$0
  } else if(e_1010.$tag==2){
    var $phi$171 = e_1010.$0
  } else if(e_1010.$tag==3){
    var $phi$171 = e_1010.$0
  } else if(e_1010.$tag==4){
    var $phi$171 = e_1010.$0
  } else if(e_1010.$tag==5){
    var $phi$171 = e_1010.$0
  } else if(e_1010.$tag==6){
    var $phi$171 = e_1010.$0
  } else error("pattern match fail",e_1010);
  return $phi$171
};
var getType_806 = function(e_1051){
  return ($_677(getAnnType_793))(annOf_804(e_1051))
};
var withAnn_805 = function(ann_1030){
  return function(e_1031){
    if(e_1031.$tag==0){
      var $phi$172 = (Var_759(ann_1030))(e_1031.$1)
    } else if(e_1031.$tag==1){
      var $phi$172 = (Const_760(ann_1030))(e_1031.$1)
    } else if(e_1031.$tag==2){
      var $phi$172 = ((App_761(ann_1030))(e_1031.$1))(e_1031.$2)
    } else if(e_1031.$tag==3){
      var $phi$172 = ((Lam_762(ann_1030))(e_1031.$1))(e_1031.$2)
    } else if(e_1031.$tag==4){
      var $phi$172 = ((Case_763(ann_1030))(e_1031.$1))(e_1031.$2)
    } else if(e_1031.$tag==5){
      var $phi$172 = ((Let_764(ann_1030))(e_1031.$1))(e_1031.$2)
    } else if(e_1031.$tag==6){
      var $phi$172 = ((New_765(ann_1030))(e_1031.$1))(e_1031.$2)
    } else error("pattern match fail",e_1031);
    return $phi$172
  }
};
var setAnn_791 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(name_906){
      return function(val_907){
        return function(ann_908){
          return ((((insert_694(local$instance$Hashable$1))(local$instance$Eq$0))(name_906))(val_907))(ann_908)
        }
      }
    }
  }
};
var setAnnType_794 = function(t_917){
  return function(ann_918){
    return ((((setAnn_791($import1$instance$Hashable$13))($import1$instance$Eq$1))("type"))(AnnType_753(t_917)))(ann_918)
  }
};
var setType_803 = function(t_989){
  return function(e_990){
    if(e_990.$tag==0){
      var $phi$173 = (Var_759((setAnnType_794(t_989))(e_990.$0)))(e_990.$1)
    } else if(e_990.$tag==1){
      var $phi$173 = (Const_760((setAnnType_794(t_989))(e_990.$0)))(e_990.$1)
    } else if(e_990.$tag==2){
      var $phi$173 = ((App_761((setAnnType_794(t_989))(e_990.$0)))(e_990.$1))(e_990.$2)
    } else if(e_990.$tag==3){
      var $phi$173 = ((Lam_762((setAnnType_794(t_989))(e_990.$0)))(e_990.$1))(e_990.$2)
    } else if(e_990.$tag==4){
      var $phi$173 = ((Case_763((setAnnType_794(t_989))(e_990.$0)))(e_990.$1))(e_990.$2)
    } else if(e_990.$tag==5){
      var $phi$173 = ((Let_764((setAnnType_794(t_989))(e_990.$0)))(e_990.$1))(e_990.$2)
    } else if(e_990.$tag==6){
      var $phi$173 = ((New_765((setAnnType_794(t_989))(e_990.$0)))(e_990.$1))(e_990.$2)
    } else error("pattern match fail",e_990);
    return $phi$173
  }
};
var dataConName_801 = function(dc_980){
  var $phi$174 = dc_980.$1;
  return $phi$174
};
var dataConNames_802 = function(d_984){
  var $phi$175 = (map(dataConName_801))(d_984.$3);
  return $phi$175
};
var equivBound_799 = function(a_930){
  return function(b_931){
    var $phi$177 = ($and((($eq$eq($import1$instance$Eq$1))(a_930.$1))(b_931.$1)))((equivType_800(a_930.$2))(b_931.$2));
    var $phi$176 = $phi$177;
    return $phi$176
  }
};
var equivType_800 = function(a_938){
  return function(b_939){
    if(a_938.$tag==0){
      if(b_939.$tag==0){
        var $phi$185 = (($eq$eq($import1$instance$Eq$1))(a_938.$1))(b_939.$1)
      } else var $phi$185 = false;
      var $phi$178 = $phi$185
    } else if(a_938.$tag==1){
      if(b_939.$tag==1){
        var $phi$184 = (($eq$eq($import1$instance$Eq$1))(a_938.$1))(b_939.$1)
      } else var $phi$184 = false;
      var $phi$178 = $phi$184
    } else if(a_938.$tag==2){
      if(b_939.$tag==2){
        var $phi$183 = (($eq$eq($import1$instance$Eq$1))(a_938.$1))(b_939.$1)
      } else var $phi$183 = false;
      var $phi$178 = $phi$183
    } else if(a_938.$tag==3){
      if(b_939.$tag==3){
        var $phi$182 = ($and((equivType_800(a_938.$1))(b_939.$1)))((equivType_800(a_938.$2))(b_939.$2))
      } else var $phi$182 = false;
      var $phi$178 = $phi$182
    } else if(a_938.$tag==5){
      if(b_939.$tag==5){
        var $phi$181 = true
      } else var $phi$181 = false;
      var $phi$178 = $phi$181
    } else if(a_938.$tag==7){
      if(b_939.$tag==7){
        var $phi$180 = true
      } else var $phi$180 = false;
      var $phi$178 = $phi$180
    } else if(a_938.$tag==4){
      var $phi$178 = error("no support for TRow in equivType yet")
    } else if(a_938.$tag==6){
      if(b_939.$tag==6){
        var rbs_976 = (all_735(function(p_978){
          return (equivBound_799(fst_678(p_978)))(snd_668(p_978))
        }))((zip_731(a_938.$2))(b_939.$2));
        var rvs_975 = (all_735(function(p_977){
          return (($eq$eq($import1$instance$Eq$1))(fst_678(p_977)))(snd_668(p_977))
        }))((zip_731(a_938.$1))(b_939.$1));
        var $phi$179 = ($and(($and(rvs_975))(rbs_976)))((equivType_800(a_938.$3))(b_939.$3))
      } else var $phi$179 = false;
      var $phi$178 = $phi$179
    } else error("pattern match fail",a_938);
    return $phi$178
  }
};
var getAnnCodeLoc_795 = function(ann_919){
  return (((getAnn_790($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(ann_919)
};
var printCodeLoc_797 = function(l_924){
  if(l_924.$tag==1){
    var $phi$186 = ($concat(($concat(($concat(($concat(($concat("in "))(l_924.$0)))(" at line ")))(intToString(l_924.$1+1))))(", column ")))(intToString(l_924.$2+1))
  } else error("pattern match fail",l_924);
  return $phi$186
};
var exprLoc_798 = function(e_928){
  var $phi$188 = ($_677(getAnnCodeLoc_795))(annOf_804(e_928));
  if($phi$188.$tag==1){
    var $phi$187 = "in unknown location"
  } else if($phi$188.$tag==0){
    var $phi$187 = printCodeLoc_797($phi$188.$0)
  } else error("pattern match fail",$phi$188);
  return $phi$187
};
var setAnnCodeLoc_796 = function(file_920){
  return function(line_921){
    return function(col_922){
      return function(ann_923){
        return ((((setAnn_791($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(((AnnCodeLoc_754(file_920))(line_921))(col_922)))(ann_923)
      }
    }
  }
};
var copyAnn_792 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(names_909){
      return function(ann_910){
        var f_911 = function(r_912){
          return function(n_913){
            var $phi$190 = (((getAnn_790(local$instance$Hashable$1))(local$instance$Eq$0))(n_913))(ann_910);
            if($phi$190.$tag==1){
              var $phi$189 = r_912
            } else if($phi$190.$tag==0){
              var $phi$189 = ((((setAnn_791(local$instance$Hashable$1))(local$instance$Eq$0))(n_913))($phi$190.$0))(r_912)
            } else error("pattern match fail",$phi$190);
            return $phi$189
          }
        };
        return ((foldl(f_911))(Empty_673))(names_909)
      }
    }
  }
};
var emptyAnn_789 = Empty_673;
var assert_1156 = assert_89;
var Pair_1157 = Pair_3;
var mapSnd_1158 = mapSnd_88;
var mapFst_1159 = mapFst_87;
var $gt$eq$gt_1160 = $gt$eq$gt_86;
var snd_1161 = snd_27;
var debug2_1162 = debug2_85;
var Just_1163 = Just_1;
var Nothing_1164 = Nothing_2;
var isJust_1165 = isJust_25;
var Empty_1166 = Empty_11;
var Leaf_1167 = Leaf_12;
var Collision_1168 = Collision_13;
var BitmapIndexed_1169 = BitmapIndexed_14;
var $_1170 = $_16;
var fst_1171 = fst_26;
var Left_1172 = Left_8;
var Right_1173 = Right_9;
var loop_1174 = loop_31;
var find_1175 = find_33;
var hamtMask_1176 = hamtMask_62;
var popCount_1177 = popCount_61;
var hamtIndex_1178 = hamtIndex_63;
var lookup_1179 = lookup_64;
var setContains_1180 = setContains_80;
var foldTrie_1181 = foldTrie_70;
var emptySet_1182 = emptySet_76;
var Unit_1183 = Unit_0;
var not_1184 = not_30;
var $div$eq_1185 = $div$eq_17;
var mapIx_1186 = mapIx_34;
var insert_1187 = insert_65;
var setAdd_1188 = setAdd_77;
var setIntersection_1189 = setIntersection_84;
var remove_1190 = remove_67;
var setDiff_1191 = setDiff_83;
var setToArray_1192 = setToArray_82;
var mergeTrie_1193 = mergeTrie_74;
var setUnion_1194 = setUnion_81;
var setRemove_1195 = setRemove_79;
var setAddAll_1196 = setAddAll_78;
var trieKeys_1197 = trieKeys_75;
var size_1198 = size_72;
var mapTrie_1199 = mapTrie_71;
var nodeMask_1200 = nodeMask_60;
var isEmpty_1201 = isEmpty_73;
var filterTrie_1202 = filterTrie_69;
var nextSetBitMask_1203 = nextSetBitMask_68;
var updateOrSet_1204 = updateOrSet_66;
var State_1205 = State_10;
var runState_1206 = runState_58;
var evalState_1207 = evalState_59;
var sets_1208 = sets_57;
var gets_1209 = gets_56;
var foldM_1210 = foldM_53;
var mapM_1211 = mapM_54;
var forM_1212 = forM_55;
var strToArray_1213 = strToArray_52;
var toRecord_1214 = toRecord_51;
var reverse_1215 = reverse_50;
var tail_1216 = tail_45;
var head_1217 = head_44;
var uniq_1218 = uniq_49;
var mergeSet_1219 = mergeSet_48;
var init_1220 = init_47;
var last_1221 = last_46;
var mapJust_1222 = mapJust_43;
var concatMap_1223 = concatMap_42;
var zip_1224 = zip_41;
var zipWithIndex2_1225 = zipWithIndex2_39;
var zipWithIndex_1226 = zipWithIndex_40;
var join_1227 = join_38;
var all_1228 = all_37;
var exists_1229 = exists_36;
var containsChar_1230 = containsChar_35;
var contains_1231 = contains_32;
var either_1232 = either_28;
var splitEither_1233 = splitEither_29;
var fromJust_1234 = fromJust_24;
var justOr_1235 = justOr_23;
var maybe_1236 = maybe_22;
var $gt$gt_1237 = $gt$gt_21;
var $gt$eq_1238 = $gt$eq_20;
var $lt$eq_1239 = $lt$eq_19;
var $gt_1240 = $gt_18;
var Identity_1241 = Identity_15;
var Tuple6_1242 = Tuple6_7;
var Tuple5_1243 = Tuple5_6;
var Tuple4_1244 = Tuple4_5;
var Tuple3_1245 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_1246 = App_761;
var Lam_1247 = Lam_762;
var Case_1248 = Case_763;
var Let_1249 = Let_764;
var New_1250 = New_765;
var breakableDownAndUpM_1251 = breakableDownAndUpM_812;
var breakableDownM_1252 = breakableDownM_816;
var downAndUpM_1253 = downAndUpM_813;
var downM_1254 = downM_815;
var upM_1255 = upM_814;
var breakableDownAndUp_1256 = breakableDownAndUp_807;
var breakableDown_1257 = breakableDown_811;
var downAndUp_1258 = downAndUp_808;
var down_1259 = down_810;
var up_1260 = up_809;
var AnnType_1261 = AnnType_753;
var TUnknown_1262 = TUnknown_785;
var getAnn_1263 = getAnn_790;
var getAnnType_1264 = getAnnType_793;
var Var_1265 = Var_759;
var Const_1266 = Const_760;
var annOf_1267 = annOf_804;
var getType_1268 = getType_806;
var withAnn_1269 = withAnn_805;
var setAnn_1270 = setAnn_791;
var setAnnType_1271 = setAnnType_794;
var setType_1272 = setType_803;
var Data_1273 = Data_773;
var DataCon_1274 = DataCon_774;
var dataConName_1275 = dataConName_801;
var dataConNames_1276 = dataConNames_802;
var TCBound_1277 = TCBound_777;
var TConst_1278 = TConst_778;
var TVar_1279 = TVar_779;
var TSkolem_1280 = TSkolem_780;
var TApp_1281 = TApp_781;
var TRow_1282 = TRow_782;
var TBot_1283 = TBot_783;
var TForall_1284 = TForall_784;
var equivBound_1285 = equivBound_799;
var equivType_1286 = equivType_800;
var getAnnCodeLoc_1287 = getAnnCodeLoc_795;
var AnnCodeLoc_1288 = AnnCodeLoc_754;
var printCodeLoc_1289 = printCodeLoc_797;
var exprLoc_1290 = exprLoc_798;
var setAnnCodeLoc_1291 = setAnnCodeLoc_796;
var copyAnn_1292 = copyAnn_792;
var emptyAnn_1293 = emptyAnn_789;
var ImportAll_1294 = ImportAll_788;
var ImportOpen_1295 = ImportOpen_787;
var ImportClosed_1296 = ImportClosed_786;
var Instance_1297 = Instance_776;
var Class_1298 = Class_775;
var ModuleInterface_1299 = ModuleInterface_772;
var Module_1300 = Module_771;
var PData_1301 = PData_770;
var PConst_1302 = PConst_769;
var PVar_1303 = PVar_768;
var CStr_1304 = CStr_767;
var CNum_1305 = CNum_766;
var AnnExport_1306 = AnnExport_758;
var AnnTag_1307 = AnnTag_757;
var AnnData_1308 = AnnData_756;
var AnnUseCount_1309 = AnnUseCount_755;
var sccSorted_1310 = sccSorted_600;
var splitLetsPass_1316 = function(local$instance$Monad$0){
  return function(m_1373){
    return (ret(local$instance$Monad$0))(m_1373)
  }
};
var addRef_1311 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(n_1317){
      return (($gt$gt$eq($import1$instance$Monad$11))(gets_1209))(function(ns_1318){
        return sets_1208((((setAdd_1188(local$instance$Hashable$1))(local$instance$Eq$0))(n_1317))(ns_1318))
      })
    }
  }
};
var delRef_1312 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(n_1319){
      return (($gt$gt$eq($import1$instance$Monad$11))(gets_1209))(function(ns_1320){
        return sets_1208((((setRemove_1195(local$instance$Hashable$1))(local$instance$Eq$0))(n_1319))(ns_1320))
      })
    }
  }
};
var getRefs_1313 = gets_1209;
var splitExpr_1314 = function(e_1321){
  var handleLet_1324 = function(e_1344){
    if(e_1344.$tag==5){
      var $phi$191 = (($gt$gt$eq($import1$instance$Monad$11))(splitExpr_1314(e_1344.$2)))(function(e_1348){
        return (($gt$gt$eq($import1$instance$Monad$11))(splitBindings_1315(e_1344.$1)))(function(gbs_1349){
          var l_1350 = ((foldr(function(e_1351){
            return function(bs_1352){
              return ((Let_1249(emptyAnn_1293))(bs_1352))(e_1351)
            }
          }))(e_1348))(gbs_1349);
          return (ret($import1$instance$Monad$11))(Right_1173((withAnn_1269(e_1344.$0))(l_1350)))
        })
      })
    } else var $phi$191 = (ret($import1$instance$Monad$11))(Left_1172(e_1344));
    return $phi$191
  };
  var splitPat_1323 = function(p_1336){
    if(p_1336.$tag==1){
      var $phi$192 = (ret($import1$instance$Monad$11))(Unit_1183)
    } else if(p_1336.$tag==0){
      var $phi$192 = ((delRef_1312($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_1336.$1)
    } else if(p_1336.$tag==2){
      var $phi$192 = (($gt$gt_1237($import1$instance$Monad$11))(((mapM_1211($import1$instance$Monad$11))(splitPat_1323))(p_1336.$2)))(((addRef_1311($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_1336.$1))
    } else error("pattern match fail",p_1336);
    return $phi$192
  };
  var split_1322 = function(e_1325){
    if(e_1325.$tag==0){
      var $phi$193 = (($gt$gt_1237($import1$instance$Monad$11))(((addRef_1311($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_1325.$1)))((ret($import1$instance$Monad$11))(e_1325))
    } else if(e_1325.$tag==4){
      var $phi$193 = (($gt$gt_1237($import1$instance$Monad$11))(((mapM_1211($import1$instance$Monad$11))(function(p_1331){
        return splitPat_1323(fst_1171(p_1331))
      }))(e_1325.$2)))((ret($import1$instance$Monad$11))(e_1325))
    } else if(e_1325.$tag==3){
      var $phi$193 = (($gt$gt_1237($import1$instance$Monad$11))(((delRef_1312($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_1325.$1)))((ret($import1$instance$Monad$11))(e_1325))
    } else var $phi$193 = (ret($import1$instance$Monad$11))(e_1325);
    return $phi$193
  };
  return (((breakableDownAndUpM_1251($import1$instance$Monad$11))(handleLet_1324))(split_1322))(e_1321)
};
var splitBindings_1315 = function(bs_1354){
  var ns_1355 = (map(fst_1171))(bs_1354);
  var processBinding_1356 = function(gbs_1357){
    return function(b_1358){
      var $phi$195 = (($gt$gt$eq($import1$instance$Monad$11))(splitExpr_1314(b_1358.$1)))(function(e_1363){
        return (($gt$gt$eq($import1$instance$Monad$11))(getRefs_1313))(function(refs_1364){
          var uses_1365 = (filter(function(n_1366){
            return (((setContains_1180($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1366))(refs_1364)
          }))(ns_1355);
          return (($gt$gt_1237($import1$instance$Monad$11))(((mapM_1211($import1$instance$Monad$11))((delRef_1312($import1$instance$Hashable$13))($import1$instance$Eq$1)))(uses_1365)))((ret($import1$instance$Monad$11))((Pair_1157(((set(b_1358.$0))((filter(($div$eq_1185($import1$instance$Eq$1))(b_1358.$0)))(uses_1365)))(gbs_1357.$0)))((push((Pair_1157(b_1358.$0))(e_1363)))(gbs_1357.$1))))
        })
      });
      var $phi$194 = $phi$195;
      return $phi$194
    }
  };
  return (($gt$gt$eq($import1$instance$Monad$11))((((foldM_1210($import1$instance$Monad$11))(processBinding_1356))((Pair_1157(empty))([])))(bs_1354)))(function(gbs_1367){
    var ccs_1371 = sccSorted_1310(gbs_1367.$0);
    var bsm_1370 = toRecord_1214(gbs_1367.$1);
    var $phi$196 = (ret($import1$instance$Monad$11))((map(map(function(n_1372){
      return (Pair_1157(n_1372))((get(n_1372))(bsm_1370))
    })))(ccs_1371));
    return $phi$196
  })
};
var assert_1374 = assert_89;
var Pair_1375 = Pair_3;
var mapSnd_1376 = mapSnd_88;
var mapFst_1377 = mapFst_87;
var $gt$eq$gt_1378 = $gt$eq$gt_86;
var snd_1379 = snd_27;
var debug2_1380 = debug2_85;
var Just_1381 = Just_1;
var Nothing_1382 = Nothing_2;
var isJust_1383 = isJust_25;
var Empty_1384 = Empty_11;
var Leaf_1385 = Leaf_12;
var Collision_1386 = Collision_13;
var BitmapIndexed_1387 = BitmapIndexed_14;
var $_1388 = $_16;
var fst_1389 = fst_26;
var Left_1390 = Left_8;
var Right_1391 = Right_9;
var loop_1392 = loop_31;
var find_1393 = find_33;
var hamtMask_1394 = hamtMask_62;
var popCount_1395 = popCount_61;
var hamtIndex_1396 = hamtIndex_63;
var lookup_1397 = lookup_64;
var setContains_1398 = setContains_80;
var foldTrie_1399 = foldTrie_70;
var emptySet_1400 = emptySet_76;
var Unit_1401 = Unit_0;
var not_1402 = not_30;
var $div$eq_1403 = $div$eq_17;
var mapIx_1404 = mapIx_34;
var insert_1405 = insert_65;
var setAdd_1406 = setAdd_77;
var setIntersection_1407 = setIntersection_84;
var remove_1408 = remove_67;
var setDiff_1409 = setDiff_83;
var setToArray_1410 = setToArray_82;
var mergeTrie_1411 = mergeTrie_74;
var setUnion_1412 = setUnion_81;
var setRemove_1413 = setRemove_79;
var setAddAll_1414 = setAddAll_78;
var trieKeys_1415 = trieKeys_75;
var size_1416 = size_72;
var mapTrie_1417 = mapTrie_71;
var nodeMask_1418 = nodeMask_60;
var isEmpty_1419 = isEmpty_73;
var filterTrie_1420 = filterTrie_69;
var nextSetBitMask_1421 = nextSetBitMask_68;
var updateOrSet_1422 = updateOrSet_66;
var State_1423 = State_10;
var runState_1424 = runState_58;
var evalState_1425 = evalState_59;
var sets_1426 = sets_57;
var gets_1427 = gets_56;
var foldM_1428 = foldM_53;
var mapM_1429 = mapM_54;
var forM_1430 = forM_55;
var strToArray_1431 = strToArray_52;
var toRecord_1432 = toRecord_51;
var reverse_1433 = reverse_50;
var tail_1434 = tail_45;
var head_1435 = head_44;
var uniq_1436 = uniq_49;
var mergeSet_1437 = mergeSet_48;
var init_1438 = init_47;
var last_1439 = last_46;
var mapJust_1440 = mapJust_43;
var concatMap_1441 = concatMap_42;
var zip_1442 = zip_41;
var zipWithIndex2_1443 = zipWithIndex2_39;
var zipWithIndex_1444 = zipWithIndex_40;
var join_1445 = join_38;
var all_1446 = all_37;
var exists_1447 = exists_36;
var containsChar_1448 = containsChar_35;
var contains_1449 = contains_32;
var either_1450 = either_28;
var splitEither_1451 = splitEither_29;
var fromJust_1452 = fromJust_24;
var justOr_1453 = justOr_23;
var maybe_1454 = maybe_22;
var $gt$gt_1455 = $gt$gt_21;
var $gt$eq_1456 = $gt$eq_20;
var $lt$eq_1457 = $lt$eq_19;
var $gt_1458 = $gt_18;
var Identity_1459 = Identity_15;
var Tuple6_1460 = Tuple6_7;
var Tuple5_1461 = Tuple5_6;
var Tuple4_1462 = Tuple4_5;
var Tuple3_1463 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_1464 = App_761;
var Lam_1465 = Lam_762;
var Case_1466 = Case_763;
var Let_1467 = Let_764;
var New_1468 = New_765;
var breakableDownAndUpM_1469 = breakableDownAndUpM_812;
var breakableDownM_1470 = breakableDownM_816;
var downAndUpM_1471 = downAndUpM_813;
var downM_1472 = downM_815;
var upM_1473 = upM_814;
var breakableDownAndUp_1474 = breakableDownAndUp_807;
var breakableDown_1475 = breakableDown_811;
var downAndUp_1476 = downAndUp_808;
var down_1477 = down_810;
var up_1478 = up_809;
var AnnType_1479 = AnnType_753;
var TUnknown_1480 = TUnknown_785;
var getAnn_1481 = getAnn_790;
var getAnnType_1482 = getAnnType_793;
var Var_1483 = Var_759;
var Const_1484 = Const_760;
var annOf_1485 = annOf_804;
var getType_1486 = getType_806;
var withAnn_1487 = withAnn_805;
var setAnn_1488 = setAnn_791;
var setAnnType_1489 = setAnnType_794;
var setType_1490 = setType_803;
var Data_1491 = Data_773;
var DataCon_1492 = DataCon_774;
var dataConName_1493 = dataConName_801;
var dataConNames_1494 = dataConNames_802;
var TCBound_1495 = TCBound_777;
var TConst_1496 = TConst_778;
var TVar_1497 = TVar_779;
var TSkolem_1498 = TSkolem_780;
var TApp_1499 = TApp_781;
var TRow_1500 = TRow_782;
var TBot_1501 = TBot_783;
var TForall_1502 = TForall_784;
var equivBound_1503 = equivBound_799;
var equivType_1504 = equivType_800;
var getAnnCodeLoc_1505 = getAnnCodeLoc_795;
var AnnCodeLoc_1506 = AnnCodeLoc_754;
var printCodeLoc_1507 = printCodeLoc_797;
var exprLoc_1508 = exprLoc_798;
var setAnnCodeLoc_1509 = setAnnCodeLoc_796;
var copyAnn_1510 = copyAnn_792;
var emptyAnn_1511 = emptyAnn_789;
var ImportAll_1512 = ImportAll_788;
var ImportOpen_1513 = ImportOpen_787;
var ImportClosed_1514 = ImportClosed_786;
var Instance_1515 = Instance_776;
var Class_1516 = Class_775;
var ModuleInterface_1517 = ModuleInterface_772;
var Module_1518 = Module_771;
var PData_1519 = PData_770;
var PConst_1520 = PConst_769;
var PVar_1521 = PVar_768;
var CStr_1522 = CStr_767;
var CNum_1523 = CNum_766;
var AnnExport_1524 = AnnExport_758;
var AnnTag_1525 = AnnTag_757;
var AnnData_1526 = AnnData_756;
var AnnUseCount_1527 = AnnUseCount_755;
var CompilerState_1528 = function($_0_1538){
  return function($_1_1539){
    return function($_2_1540){
      return {$0:$_0_1538,$1:$_1_1539,$2:$_2_1540}
    }
  }
};
var reportTimes_1537 = function(i_1576){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1427))(function(s_1577){
    var report_1581 = function(i_1582){
      return function(n_1583){
        return function(ts_1584){
          var count_1585 = length(ts_1584);
          var total_1586 = ((foldl($add))(0))(ts_1584);
          var msg_1587 = ($concat(($concat(($concat(($concat(($concat(($concat("# pass <"))(n_1583)))("> executed ")))(intToString(count_1585))))(" times, total runtime ")))(intToString(total_1586))))("ms");
          return (debug2_1380(msg_1587))(i_1582)
        }
      }
    };
    var $phi$197 = (ret($import1$instance$Monad$11))(((foldTrie_1399(report_1581))(i_1576))(s_1577.$2));
    return $phi$197
  })
};
var timingStart_1534 = function(n_1559){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1427))(function(s_1560){
    var nts_1564 = (justOr_1453([]))((((lookup_1397($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1559))(s_1560.$2));
    var $phi$198 = sets_1426(((CompilerState_1528(s_1560.$0))(s_1560.$1))(((((insert_1405($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1559))((push(currentTimeMs(Unit_1401)))(nts_1564)))(s_1560.$2)));
    return $phi$198
  })
};
var timingEnd_1535 = function(n_1565){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1427))(function(s_1566){
    var nts_1570 = (justOr_1453([]))((((lookup_1397($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1565))(s_1566.$2));
    var start_1571 = last_1439(nts_1570);
    var $phi$199 = sets_1426(((CompilerState_1528(s_1566.$0))(s_1566.$1))(((((insert_1405($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1565))((push((currentTimeMs(Unit_1401))-start_1571))(init_1438(nts_1570))))(s_1566.$2)));
    return $phi$199
  })
};
var timed_1536 = function(n_1572){
  return function(p_1573){
    return function(i_1574){
      return (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_1455($import1$instance$Monad$11))(timingStart_1534(n_1572)))(p_1573(i_1574))))(function(o_1575){
        return (($gt$gt_1455($import1$instance$Monad$11))(timingEnd_1535(n_1572)))((ret($import1$instance$Monad$11))(o_1575))
      })
    }
  }
};
var perModule_1533 = function(local$instance$Monad$0){
  return mapM_1429(local$instance$Monad$0)
};
var setUid_1532 = function(uid_1554){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1427))(function(s_1555){
    var $phi$200 = sets_1426(((CompilerState_1528(s_1555.$0))(uid_1554))(s_1555.$2));
    return $phi$200
  })
};
var getUid_1531 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1427))(function(s_1550){
  var $phi$201 = (ret($import1$instance$Monad$11))(s_1550.$1);
  return $phi$201
});
var setExports_1530 = function(ex_1545){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1427))(function(s_1546){
    var $phi$202 = sets_1426(((CompilerState_1528(ex_1545))(s_1546.$1))(s_1546.$2));
    return $phi$202
  })
};
var getExports_1529 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1427))(function(s_1541){
  var $phi$203 = (ret($import1$instance$Monad$11))(s_1541.$0);
  return $phi$203
});
var assert_1588 = assert_89;
var Pair_1589 = Pair_3;
var mapSnd_1590 = mapSnd_88;
var mapFst_1591 = mapFst_87;
var $gt$eq$gt_1592 = $gt$eq$gt_86;
var snd_1593 = snd_27;
var debug2_1594 = debug2_85;
var Just_1595 = Just_1;
var Nothing_1596 = Nothing_2;
var isJust_1597 = isJust_25;
var Empty_1598 = Empty_11;
var Leaf_1599 = Leaf_12;
var Collision_1600 = Collision_13;
var BitmapIndexed_1601 = BitmapIndexed_14;
var $_1602 = $_16;
var fst_1603 = fst_26;
var Left_1604 = Left_8;
var Right_1605 = Right_9;
var loop_1606 = loop_31;
var find_1607 = find_33;
var hamtMask_1608 = hamtMask_62;
var popCount_1609 = popCount_61;
var hamtIndex_1610 = hamtIndex_63;
var lookup_1611 = lookup_64;
var setContains_1612 = setContains_80;
var foldTrie_1613 = foldTrie_70;
var emptySet_1614 = emptySet_76;
var Unit_1615 = Unit_0;
var not_1616 = not_30;
var $div$eq_1617 = $div$eq_17;
var mapIx_1618 = mapIx_34;
var insert_1619 = insert_65;
var setAdd_1620 = setAdd_77;
var setIntersection_1621 = setIntersection_84;
var remove_1622 = remove_67;
var setDiff_1623 = setDiff_83;
var setToArray_1624 = setToArray_82;
var mergeTrie_1625 = mergeTrie_74;
var setUnion_1626 = setUnion_81;
var setRemove_1627 = setRemove_79;
var setAddAll_1628 = setAddAll_78;
var trieKeys_1629 = trieKeys_75;
var size_1630 = size_72;
var mapTrie_1631 = mapTrie_71;
var nodeMask_1632 = nodeMask_60;
var isEmpty_1633 = isEmpty_73;
var filterTrie_1634 = filterTrie_69;
var nextSetBitMask_1635 = nextSetBitMask_68;
var updateOrSet_1636 = updateOrSet_66;
var State_1637 = State_10;
var runState_1638 = runState_58;
var evalState_1639 = evalState_59;
var sets_1640 = sets_57;
var gets_1641 = gets_56;
var foldM_1642 = foldM_53;
var mapM_1643 = mapM_54;
var forM_1644 = forM_55;
var strToArray_1645 = strToArray_52;
var toRecord_1646 = toRecord_51;
var reverse_1647 = reverse_50;
var tail_1648 = tail_45;
var head_1649 = head_44;
var uniq_1650 = uniq_49;
var mergeSet_1651 = mergeSet_48;
var init_1652 = init_47;
var last_1653 = last_46;
var mapJust_1654 = mapJust_43;
var concatMap_1655 = concatMap_42;
var zip_1656 = zip_41;
var zipWithIndex2_1657 = zipWithIndex2_39;
var zipWithIndex_1658 = zipWithIndex_40;
var join_1659 = join_38;
var all_1660 = all_37;
var exists_1661 = exists_36;
var containsChar_1662 = containsChar_35;
var contains_1663 = contains_32;
var either_1664 = either_28;
var splitEither_1665 = splitEither_29;
var fromJust_1666 = fromJust_24;
var justOr_1667 = justOr_23;
var maybe_1668 = maybe_22;
var $gt$gt_1669 = $gt$gt_21;
var $gt$eq_1670 = $gt$eq_20;
var $lt$eq_1671 = $lt$eq_19;
var $gt_1672 = $gt_18;
var Identity_1673 = Identity_15;
var Tuple6_1674 = Tuple6_7;
var Tuple5_1675 = Tuple5_6;
var Tuple4_1676 = Tuple4_5;
var Tuple3_1677 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_1678 = App_761;
var Lam_1679 = Lam_762;
var Case_1680 = Case_763;
var Let_1681 = Let_764;
var New_1682 = New_765;
var breakableDownAndUpM_1683 = breakableDownAndUpM_812;
var breakableDownM_1684 = breakableDownM_816;
var downAndUpM_1685 = downAndUpM_813;
var downM_1686 = downM_815;
var upM_1687 = upM_814;
var breakableDownAndUp_1688 = breakableDownAndUp_807;
var breakableDown_1689 = breakableDown_811;
var downAndUp_1690 = downAndUp_808;
var down_1691 = down_810;
var up_1692 = up_809;
var AnnType_1693 = AnnType_753;
var TUnknown_1694 = TUnknown_785;
var getAnn_1695 = getAnn_790;
var getAnnType_1696 = getAnnType_793;
var Var_1697 = Var_759;
var Const_1698 = Const_760;
var annOf_1699 = annOf_804;
var getType_1700 = getType_806;
var withAnn_1701 = withAnn_805;
var setAnn_1702 = setAnn_791;
var setAnnType_1703 = setAnnType_794;
var setType_1704 = setType_803;
var Data_1705 = Data_773;
var DataCon_1706 = DataCon_774;
var dataConName_1707 = dataConName_801;
var dataConNames_1708 = dataConNames_802;
var TCBound_1709 = TCBound_777;
var TConst_1710 = TConst_778;
var TVar_1711 = TVar_779;
var TSkolem_1712 = TSkolem_780;
var TApp_1713 = TApp_781;
var TRow_1714 = TRow_782;
var TBot_1715 = TBot_783;
var TForall_1716 = TForall_784;
var equivBound_1717 = equivBound_799;
var equivType_1718 = equivType_800;
var getAnnCodeLoc_1719 = getAnnCodeLoc_795;
var AnnCodeLoc_1720 = AnnCodeLoc_754;
var printCodeLoc_1721 = printCodeLoc_797;
var exprLoc_1722 = exprLoc_798;
var setAnnCodeLoc_1723 = setAnnCodeLoc_796;
var copyAnn_1724 = copyAnn_792;
var emptyAnn_1725 = emptyAnn_789;
var ImportAll_1726 = ImportAll_788;
var ImportOpen_1727 = ImportOpen_787;
var ImportClosed_1728 = ImportClosed_786;
var Instance_1729 = Instance_776;
var Class_1730 = Class_775;
var ModuleInterface_1731 = ModuleInterface_772;
var Module_1732 = Module_771;
var PData_1733 = PData_770;
var PConst_1734 = PConst_769;
var PVar_1735 = PVar_768;
var CStr_1736 = CStr_767;
var CNum_1737 = CNum_766;
var AnnExport_1738 = AnnExport_758;
var AnnTag_1739 = AnnTag_757;
var AnnData_1740 = AnnData_756;
var AnnUseCount_1741 = AnnUseCount_755;
var printType_1742 = function(t_1748){
  var printParen_1749 = function(t_1753){
    return ($concat(($concat("("))(printType_1742(t_1753))))(")")
  };
  var printSecondTypeInApp_1752 = function(t_1776){
    if(t_1776.$tag==3){
      var $phi$204 = printParen_1749(t_1776)
    } else if(t_1776.$tag==6){
      var $phi$204 = printParen_1749(t_1776)
    } else var $phi$204 = printType_1742(t_1776);
    return $phi$204
  };
  var printFirstTypeInApp_1751 = function(t_1765){
    if((t_1765.$tag==3)&&((t_1765.$1.$tag==3)&&((t_1765.$1.$1.$tag==0)&&("->"==t_1765.$1.$1.$1)))){
      var $phi$205 = printParen_1749(t_1765)
    } else if(t_1765.$tag==6){
      var $phi$205 = printParen_1749(t_1765)
    } else var $phi$205 = printType_1742(t_1765);
    return $phi$205
  };
  var printTypeInFun_1750 = function(t_1754){
    if((t_1754.$tag==3)&&((t_1754.$1.$tag==3)&&((t_1754.$1.$1.$tag==0)&&("->"==t_1754.$1.$1.$1)))){
      var $phi$206 = printParen_1749(t_1754)
    } else if(t_1754.$tag==6){
      var $phi$206 = printParen_1749(t_1754)
    } else var $phi$206 = printType_1742(t_1754);
    return $phi$206
  };
  if(t_1748.$tag==0){
    var $phi$207 = t_1748.$1
  } else if(t_1748.$tag==1){
    var $phi$207 = t_1748.$1
  } else if(t_1748.$tag==2){
    var $phi$207 = ($concat("~"))(t_1748.$1)
  } else if(t_1748.$tag==5){
    var $phi$207 = "~bottom~"
  } else if(t_1748.$tag==7){
    var $phi$207 = "?"
  } else if((t_1748.$tag==3)&&((t_1748.$1.$tag==3)&&((t_1748.$1.$1.$tag==0)&&("->"==t_1748.$1.$1.$1)))){
    var $phi$207 = ($concat(($concat(printTypeInFun_1750(t_1748.$1.$2)))(" -> ")))(printType_1742(t_1748.$2))
  } else if(t_1748.$tag==3){
    var $phi$207 = ($concat(($concat(printFirstTypeInApp_1751(t_1748.$1)))(" ")))(printSecondTypeInApp_1752(t_1748.$2))
  } else if(t_1748.$tag==6){
    var $phi$209 = length(t_1748.$2);
    if(0==$phi$209){
      var $phi$208 = ""
    } else var $phi$208 = ($concat(" with "))((intercalate(", "))((map(printTypeBound_1743))(t_1748.$2)));
    var bounds_1803 = $phi$208;
    var $phi$207 = ($concat(($concat(($concat(($concat("forall "))((intercalate(", "))(t_1748.$1))))(bounds_1803)))(". ")))(printType_1742(t_1748.$3))
  } else var $phi$207 = error(($concat("cannot print "))(jsonStringify(t_1748)));
  return $phi$207
};
var printTypeBound_1743 = function(b_1806){
  var $phi$210 = ($concat(($concat(($concat(($concat(b_1806.$1))(" ")))("(")))(printType_1742(b_1806.$2))))(")");
  return $phi$210
};
var indent_1746 = map(function(l_1869){
  return ($concat("  "))(l_1869)
});
var printExprTyped_1744 = function(typed_1810){
  return function(e_1811){
    var sameLine_1813 = function(xs_1822){
      return function(ys_1823){
        return (concat(init_1652(xs_1822)))((enqueue(($concat(last_1653(xs_1822)))(head_1649(ys_1823))))(tail_1648(ys_1823)))
      }
    };
    var sameLine3_1814 = function(a_1824){
      return function(b_1825){
        return function(c_1826){
          return (sameLine_1813(a_1824))((sameLine_1813(b_1825))(c_1826))
        }
      }
    };
    var printT_1818 = function(e_1862){
      var t_1863 = getType_1700(e_1862);
      return printType_1742(t_1863)
    };
    var printPat_1816 = function(p_1830){
      if(p_1830.$tag==0){
        var $phi$211 = p_1830.$1
      } else if((p_1830.$tag==1)&&(p_1830.$1.$tag==0)){
        var $phi$211 = jsonStringify(p_1830.$1.$0)
      } else if((p_1830.$tag==1)&&(p_1830.$1.$tag==1)){
        var $phi$211 = jsonStringify(p_1830.$1.$0)
      } else if(p_1830.$tag==2){
        var $phi$211 = ($concat(($concat(($concat(p_1830.$1))(" (")))((join_1659((map(printPat_1816))(p_1830.$2)))(") ("))))(")")
      } else error("pattern match fail",p_1830);
      return $phi$211
    };
    var printParen_1812 = function(e_1821){
      return ((sameLine3_1814(["("]))(printExpr_1819(e_1821)))([")"])
    };
    var printCasePat_1815 = function(cp_1827){
      var $phi$212 = (enqueue(($concat(printPat_1816(cp_1827.$0)))(" ->")))(indent_1746(printExpr_1819(cp_1827.$1)));
      return $phi$212
    };
    var printE_1817 = function(e_1840){
      if(e_1840.$tag==0){
        var $phi$213 = [e_1840.$1]
      } else if((e_1840.$tag==1)&&(e_1840.$1.$tag==0)){
        var $phi$213 = [jsonStringify(e_1840.$1.$0)]
      } else if((e_1840.$tag==1)&&(e_1840.$1.$tag==1)){
        var $phi$213 = [jsonStringify(e_1840.$1.$0)]
      } else if(e_1840.$tag==2){
        var $phi$213 = ((sameLine3_1814(printParen_1812(e_1840.$1)))([" "]))(printParen_1812(e_1840.$2))
      } else if(e_1840.$tag==3){
        var $phi$213 = (enqueue(($concat(($concat("\\"))(e_1840.$1)))(" ->")))(indent_1746(printExpr_1819(e_1840.$2)))
      } else if(e_1840.$tag==4){
        var $phi$213 = (concat(((sameLine3_1814(["case "]))(printParen_1812(e_1840.$1)))([" of"])))(indent_1746((concatMap_1655(printCasePat_1815))(e_1840.$2)))
      } else if(e_1840.$tag==5){
        var $phi$213 = (concat((push("in"))((enqueue("let"))(indent_1746((concatMap_1655(printDef_1745(typed_1810)))(e_1840.$1))))))(indent_1746(printExpr_1819(e_1840.$2)))
      } else if(e_1840.$tag==6){
        var $phi$213 = (push(e_1840.$1))(indent_1746((concatMap_1655(printExprTyped_1744(typed_1810)))(e_1840.$2)))
      } else error("pattern match fail",e_1840);
      return $phi$213
    };
    var printExpr_1819 = function(e_1864){
      if(!typed_1810){
        var $phi$214 = printE_1817(e_1864)
      } else if(typed_1810){
        var $phi$214 = ((sameLine3_1814(["("]))(printE_1817(e_1864)))([($concat(($concat(" :: "))(printT_1818(e_1864))))(" )")])
      } else error("pattern match fail",typed_1810);
      return $phi$214
    };
    var pe_1820 = printE_1817(e_1811);
    return printExpr_1819(e_1811)
  }
};
var printDef_1745 = function(typed_1865){
  return function(d_1866){
    var $phi$215 = (enqueue(($concat(d_1866.$0))(" =")))(indent_1746((printExprTyped_1744(typed_1865))(d_1866.$1)));
    return $phi$215
  }
};
var reallyPrintExpr_1747 = function(typed_1870){
  return function(e_1871){
    return (join_1659((printExprTyped_1744(typed_1870))(e_1871)))("\n")
  }
};
var assert_1872 = assert_89;
var Pair_1873 = Pair_3;
var mapSnd_1874 = mapSnd_88;
var mapFst_1875 = mapFst_87;
var $gt$eq$gt_1876 = $gt$eq$gt_86;
var snd_1877 = snd_27;
var debug2_1878 = debug2_85;
var Just_1879 = Just_1;
var Nothing_1880 = Nothing_2;
var isJust_1881 = isJust_25;
var Empty_1882 = Empty_11;
var Leaf_1883 = Leaf_12;
var Collision_1884 = Collision_13;
var BitmapIndexed_1885 = BitmapIndexed_14;
var $_1886 = $_16;
var fst_1887 = fst_26;
var Left_1888 = Left_8;
var Right_1889 = Right_9;
var loop_1890 = loop_31;
var find_1891 = find_33;
var hamtMask_1892 = hamtMask_62;
var popCount_1893 = popCount_61;
var hamtIndex_1894 = hamtIndex_63;
var lookup_1895 = lookup_64;
var setContains_1896 = setContains_80;
var foldTrie_1897 = foldTrie_70;
var emptySet_1898 = emptySet_76;
var Unit_1899 = Unit_0;
var not_1900 = not_30;
var $div$eq_1901 = $div$eq_17;
var mapIx_1902 = mapIx_34;
var insert_1903 = insert_65;
var setAdd_1904 = setAdd_77;
var setIntersection_1905 = setIntersection_84;
var remove_1906 = remove_67;
var setDiff_1907 = setDiff_83;
var setToArray_1908 = setToArray_82;
var mergeTrie_1909 = mergeTrie_74;
var setUnion_1910 = setUnion_81;
var setRemove_1911 = setRemove_79;
var setAddAll_1912 = setAddAll_78;
var trieKeys_1913 = trieKeys_75;
var size_1914 = size_72;
var mapTrie_1915 = mapTrie_71;
var nodeMask_1916 = nodeMask_60;
var isEmpty_1917 = isEmpty_73;
var filterTrie_1918 = filterTrie_69;
var nextSetBitMask_1919 = nextSetBitMask_68;
var updateOrSet_1920 = updateOrSet_66;
var State_1921 = State_10;
var runState_1922 = runState_58;
var evalState_1923 = evalState_59;
var sets_1924 = sets_57;
var gets_1925 = gets_56;
var foldM_1926 = foldM_53;
var mapM_1927 = mapM_54;
var forM_1928 = forM_55;
var strToArray_1929 = strToArray_52;
var toRecord_1930 = toRecord_51;
var reverse_1931 = reverse_50;
var tail_1932 = tail_45;
var head_1933 = head_44;
var uniq_1934 = uniq_49;
var mergeSet_1935 = mergeSet_48;
var init_1936 = init_47;
var last_1937 = last_46;
var mapJust_1938 = mapJust_43;
var concatMap_1939 = concatMap_42;
var zip_1940 = zip_41;
var zipWithIndex2_1941 = zipWithIndex2_39;
var zipWithIndex_1942 = zipWithIndex_40;
var join_1943 = join_38;
var all_1944 = all_37;
var exists_1945 = exists_36;
var containsChar_1946 = containsChar_35;
var contains_1947 = contains_32;
var either_1948 = either_28;
var splitEither_1949 = splitEither_29;
var fromJust_1950 = fromJust_24;
var justOr_1951 = justOr_23;
var maybe_1952 = maybe_22;
var $gt$gt_1953 = $gt$gt_21;
var $gt$eq_1954 = $gt$eq_20;
var $lt$eq_1955 = $lt$eq_19;
var $gt_1956 = $gt_18;
var Identity_1957 = Identity_15;
var Tuple6_1958 = Tuple6_7;
var Tuple5_1959 = Tuple5_6;
var Tuple4_1960 = Tuple4_5;
var Tuple3_1961 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_1962 = App_761;
var Lam_1963 = Lam_762;
var Case_1964 = Case_763;
var Let_1965 = Let_764;
var New_1966 = New_765;
var breakableDownAndUpM_1967 = breakableDownAndUpM_812;
var breakableDownM_1968 = breakableDownM_816;
var downAndUpM_1969 = downAndUpM_813;
var downM_1970 = downM_815;
var upM_1971 = upM_814;
var breakableDownAndUp_1972 = breakableDownAndUp_807;
var breakableDown_1973 = breakableDown_811;
var downAndUp_1974 = downAndUp_808;
var down_1975 = down_810;
var up_1976 = up_809;
var AnnType_1977 = AnnType_753;
var TUnknown_1978 = TUnknown_785;
var getAnn_1979 = getAnn_790;
var getAnnType_1980 = getAnnType_793;
var Var_1981 = Var_759;
var Const_1982 = Const_760;
var annOf_1983 = annOf_804;
var getType_1984 = getType_806;
var withAnn_1985 = withAnn_805;
var setAnn_1986 = setAnn_791;
var setAnnType_1987 = setAnnType_794;
var setType_1988 = setType_803;
var Data_1989 = Data_773;
var DataCon_1990 = DataCon_774;
var dataConName_1991 = dataConName_801;
var dataConNames_1992 = dataConNames_802;
var TCBound_1993 = TCBound_777;
var TConst_1994 = TConst_778;
var TVar_1995 = TVar_779;
var TSkolem_1996 = TSkolem_780;
var TApp_1997 = TApp_781;
var TRow_1998 = TRow_782;
var TBot_1999 = TBot_783;
var TForall_2000 = TForall_784;
var equivBound_2001 = equivBound_799;
var equivType_2002 = equivType_800;
var getAnnCodeLoc_2003 = getAnnCodeLoc_795;
var AnnCodeLoc_2004 = AnnCodeLoc_754;
var printCodeLoc_2005 = printCodeLoc_797;
var exprLoc_2006 = exprLoc_798;
var setAnnCodeLoc_2007 = setAnnCodeLoc_796;
var copyAnn_2008 = copyAnn_792;
var emptyAnn_2009 = emptyAnn_789;
var ImportAll_2010 = ImportAll_788;
var ImportOpen_2011 = ImportOpen_787;
var ImportClosed_2012 = ImportClosed_786;
var Instance_2013 = Instance_776;
var Class_2014 = Class_775;
var ModuleInterface_2015 = ModuleInterface_772;
var Module_2016 = Module_771;
var PData_2017 = PData_770;
var PConst_2018 = PConst_769;
var PVar_2019 = PVar_768;
var CStr_2020 = CStr_767;
var CNum_2021 = CNum_766;
var AnnExport_2022 = AnnExport_758;
var AnnTag_2023 = AnnTag_757;
var AnnData_2024 = AnnData_756;
var AnnUseCount_2025 = AnnUseCount_755;
var printType_2026 = printType_1742;
var printTypeBound_2027 = printTypeBound_1743;
var reallyPrintExpr_2028 = reallyPrintExpr_1747;
var printDef_2029 = printDef_1745;
var sccSorted_2030 = sccSorted_600;
var ICtx_2032 = function($_0_2094){
  return function($_1_2095){
    return function($_2_2096){
      return function($_3_2097){
        return {$0:$_0_2094,$1:$_1_2095,$2:$_2_2096,$3:$_3_2097}
      }
    }
  }
};
var IEnv_2033 = function($_0_2098){
  return function($_1_2099){
    return function($_2_2100){
      return {$0:$_0_2098,$1:$_1_2099,$2:$_2_2100}
    }
  }
};
var Subs_2031 = function($_0_2092){
  return function($_1_2093){
    return {$0:$_0_2092,$1:$_1_2093}
  }
};
var instanceToTypeBound_2086 = function(i_2748){
  var $phi$216 = ((TCBound_1993(emptyAnn_2009))(i_2748.$1))(i_2748.$2);
  return $phi$216
};
var getTypedExports_2089 = function(m_2833){
  var collectExports_2841 = function(es_2843){
    return function(b_2844){
      var e_2845 = snd_1877(b_2844);
      var $phi$219 = (((getAnn_1979($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_1983(e_2845));
      if($phi$219.$tag==1){
        var $phi$218 = es_2843
      } else if(($phi$219.$tag==0)&&($phi$219.$0.$tag==5)){
        var $phi$218 = ((set($phi$219.$0.$0))(getType_1984(e_2845)))(es_2843)
      } else error("pattern match fail",$phi$219);
      return $phi$218
    }
  };
  var bs_2842 = ((foldl(collectExports_2841))(empty))(m_2833.$6);
  var $phi$217 = ((ModuleInterface_2015(bs_2842))(m_2833.$4))((map(instanceToTypeBound_2086))(m_2833.$5));
  return $phi$217
};
var getBounds_2046 = function(ctx_2189){
  var $phi$220 = ctx_2189.$1;
  return $phi$220
};
var setBounds_2047 = function(bs_2194){
  return function(ctx_2195){
    var $phi$221 = (((ICtx_2032(ctx_2195.$0))(bs_2194))(ctx_2195.$2))(ctx_2195.$3);
    return $phi$221
  }
};
var getInstances_2060 = function(env_2256){
  var $phi$222 = env_2256.$1;
  return $phi$222
};
var satisfies_2090 = function(a_2847){
  return function(b_2848){
    if(a_2847.$tag==1){
      var $phi$223 = true
    } else if(a_2847.$tag==2){
      if(b_2848.$tag==2){
        var $phi$226 = (($eq$eq($import1$instance$Eq$1))(a_2847.$1))(b_2848.$1)
      } else var $phi$226 = false;
      var $phi$223 = $phi$226
    } else if(a_2847.$tag==0){
      if(b_2848.$tag==0){
        var $phi$225 = (($eq$eq($import1$instance$Eq$1))(a_2847.$1))(b_2848.$1)
      } else var $phi$225 = false;
      var $phi$223 = $phi$225
    } else if(a_2847.$tag==3){
      if(b_2848.$tag==3){
        var $phi$224 = ($and((satisfies_2090(a_2847.$1))(b_2848.$1)))((satisfies_2090(a_2847.$2))(b_2848.$2))
      } else var $phi$224 = false;
      var $phi$223 = $phi$224
    } else var $phi$223 = error(($concat("unexpected type in satisfies "))(printType_2026(a_2847)));
    return $phi$223
  }
};
var satisfiesBound_2091 = function(a_2869){
  return function(b_2870){
    var $phi$228 = ($and((($eq$eq($import1$instance$Eq$1))(a_2869.$1))(b_2870.$1)))((satisfies_2090(a_2869.$2))(b_2870.$2));
    var $phi$227 = $phi$228;
    return $phi$227
  }
};
var dropSatisfiedBounds_2078 = function(env_2602){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1925))(function(ctx_2603){
    var is_2604 = getInstances_2060(env_2602);
    var bs_2605 = getBounds_2046(ctx_2603);
    var bs2_2606 = (filter(function(b_2607){
      return not_1900((exists_1945(function(i_2608){
        return (satisfiesBound_2091(i_2608))(b_2607)
      }))(is_2604))
    }))(bs_2605);
    return sets_1924((setBounds_2047(bs2_2606))(ctx_2603))
  })
};
var getSubs_2043 = function(ctx_2172){
  var $phi$229 = ctx_2172.$0;
  return $phi$229
};
var getSub_2034 = function(v_2101){
  return function(subs_2102){
    var $phi$230 = (($lt$pip$gt($import1$instance$Alternative$6))((((lookup_1895($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2101))(subs_2102.$0)))((((lookup_1895($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2101))(subs_2102.$1));
    return $phi$230
  }
};
var mkTForall_2063 = function(ann_2282){
  return function(vs_2283){
    return function(bs_2284){
      return function(t_2285){
        var f_2286 = function(bs_2287){
          return function(b_2288){
            var $phi$232 = (exists_1945(equivBound_2001(b_2288)))(bs_2287);
            if($phi$232){
              var $phi$231 = bs_2287
            } else if(!$phi$232){
              var $phi$231 = (push(b_2288))(bs_2287)
            } else error("pattern match fail",$phi$232);
            return $phi$231
          }
        };
        return (((TForall_2000(ann_2282))(vs_2283))(((foldl(f_2286))([]))(bs_2284)))(t_2285)
      }
    }
  }
};
var dropSubs_2039 = function(vs_2151){
  return function(subs_2152){
    var $phi$233 = (Subs_2031(((foldl(function(r_2155){
      return function(v_2156){
        return (((remove_1906($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2156))(r_2155)
      }
    }))(subs_2152.$0))(vs_2151)))(((foldl(function(r_2157){
      return function(v_2158){
        return (((remove_1906($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2158))(r_2157)
      }
    }))(subs_2152.$1))(vs_2151));
    return $phi$233
  }
};
var applySubs_2067 = function(subs_2347){
  return function(t_2348){
    if(t_2348.$tag==6){
      var subs2_2353 = (dropSubs_2039(t_2348.$1))(subs_2347);
      var $phi$234 = (((mkTForall_2063(t_2348.$0))(t_2348.$1))((map(applySubsBound_2068(subs2_2353)))(t_2348.$2)))((applySubs_2067(subs2_2353))(t_2348.$3))
    } else if(t_2348.$tag==1){
      var $phi$237 = (getSub_2034(t_2348.$1))(subs_2347);
      if($phi$237.$tag==1){
        var $phi$236 = t_2348
      } else if($phi$237.$tag==0){
        var $phi$236 = $phi$237.$0
      } else error("pattern match fail",$phi$237);
      var $phi$234 = $phi$236
    } else if(t_2348.$tag==3){
      var $phi$234 = ((TApp_1997(t_2348.$0))((applySubs_2067(subs_2347))(t_2348.$1)))((applySubs_2067(subs_2347))(t_2348.$2))
    } else if(t_2348.$tag==4){
      var $phi$234 = ((TRow_1998(t_2348.$0))((map(function(m_2363){
        var $phi$235 = (Pair_1873((applySubs_2067(subs_2347))(m_2363.$0)))((applySubs_2067(subs_2347))(m_2363.$1));
        return $phi$235
      }))(t_2348.$1)))(((fmap($import1$instance$Functor$4))(applySubs_2067(subs_2347)))(t_2348.$2))
    } else var $phi$234 = t_2348;
    return $phi$234
  }
};
var applySubsBound_2068 = function(subs_2367){
  return function(b_2368){
    var $phi$238 = ((TCBound_1993(b_2368.$0))(b_2368.$1))((applySubs_2067(subs_2367))(b_2368.$2));
    return $phi$238
  }
};
var applySubsE_2083 = function(subs_2670){
  return function(e_2671){
    var f_2672 = function(a_2673){
      return function(e_2674){
        var t2_2675 = (applySubs_2067(subs_2670))(getType_1984(e_2674));
        return (Pair_1873(a_2673))((setType_1988(t2_2675))(e_2674))
      }
    };
    return snd_1877(((down_1975(f_2672))(true))(e_2671))
  }
};
var applySubsDef_2082 = function(d_2666){
  var $phi$239 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1925))(function(ctx_2669){
    return ($_1886(ret($import1$instance$Monad$11)))((Pair_1873(d_2666.$0))((applySubsE_2083(getSubs_2043(ctx_2669)))(d_2666.$1)))
  });
  return $phi$239
};
var freeVars_2084 = function(e_2676){
  var namesInPat_2679 = function(p_2689){
    if(p_2689.$tag==0){
      var $phi$240 = [p_2689.$1]
    } else if(p_2689.$tag==1){
      var $phi$240 = []
    } else if(p_2689.$tag==2){
      var $phi$240 = ((foldl((mergeSet_1935($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(namesInPat_2679))(p_2689.$2))
    } else error("pattern match fail",p_2689);
    return $phi$240
  };
  var freeVarsInPData_2678 = function(p_2684){
    if(p_2684.$tag==2){
      var $phi$241 = ((foldl((mergeSet_1935($import1$instance$Ord$3))($import1$instance$Eq$1)))([p_2684.$1]))((map(freeVarsInPData_2678))(p_2684.$2))
    } else var $phi$241 = [];
    return $phi$241
  };
  var freeVarsInPat_2677 = function(p_2680){
    var $phi$242 = (((mergeSet_1935($import1$instance$Ord$3))($import1$instance$Eq$1))((filter(function(v_2683){
      return not_1900(((contains_1947($import1$instance$Eq$1))(v_2683))(namesInPat_2679(p_2680.$0)))
    }))(freeVars_2084(p_2680.$1))))(freeVarsInPData_2678(p_2680.$0));
    return $phi$242
  };
  if(e_2676.$tag==0){
    var $phi$243 = [e_2676.$1]
  } else if(e_2676.$tag==1){
    var $phi$243 = []
  } else if(e_2676.$tag==2){
    var $phi$243 = (((mergeSet_1935($import1$instance$Ord$3))($import1$instance$Eq$1))(freeVars_2084(e_2676.$1)))(freeVars_2084(e_2676.$2))
  } else if(e_2676.$tag==3){
    var $phi$243 = (filter(function(v_2707){
      return (($div$eq_1901($import1$instance$Eq$1))(v_2707))(e_2676.$1)
    }))(freeVars_2084(e_2676.$2))
  } else if(e_2676.$tag==4){
    var $phi$243 = ((foldl((mergeSet_1935($import1$instance$Ord$3))($import1$instance$Eq$1)))(freeVars_2084(e_2676.$1)))((map(freeVarsInPat_2677))(e_2676.$2))
  } else if(e_2676.$tag==5){
    var $phi$243 = (filter(function(v_2714){
      return not_1900(((contains_1947($import1$instance$Eq$1))(v_2714))((map(fst_1887))(e_2676.$1)))
    }))(((foldl((mergeSet_1935($import1$instance$Ord$3))($import1$instance$Eq$1)))(freeVars_2084(e_2676.$2)))((map(function(d_2715){
      return freeVars_2084(snd_1877(d_2715))
    }))(e_2676.$1)))
  } else if(e_2676.$tag==6){
    var $phi$243 = ((foldl((mergeSet_1935($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(freeVars_2084))(e_2676.$2))
  } else error("pattern match fail",e_2676);
  return $phi$243
};
var newTVarM_2041 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1925))(function(ctx_2165){
  var n_2170 = ($concat("$"))(intToString(ctx_2165.$2));
  var $phi$244 = (($gt$gt_1953($import1$instance$Monad$11))(sets_1924((((ICtx_2032(ctx_2165.$0))(ctx_2165.$1))(ctx_2165.$2+1))(ctx_2165.$3))))((ret($import1$instance$Monad$11))((TVar_1995(emptyAnn_2009))(n_2170)));
  return $phi$244
});
var errorM_2048 = function(s_2200){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1925))(function(ctx_2201){
    var $phi$245 = error(ctx_2201.$3(s_2200));
    return $phi$245
  })
};
var getBinding_2053 = function(n_2221){
  return function(env_2222){
    var $phi$246 = (((lookup_1895($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_2221))(env_2222.$0);
    return $phi$246
  }
};
var getBindingM_2054 = function(n_2226){
  return function(env_2227){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_1925))(function(ctx_2228){
      return ($_1886(ret($import1$instance$Monad$11)))(((fmap($import1$instance$Functor$4))(applySubs_2067(getSubs_2043(ctx_2228))))((getBinding_2053(n_2226))(env_2227)))
    })
  }
};
var getBindings_2055 = function(env_2229){
  var $phi$247 = env_2229.$0;
  return $phi$247
};
var freeTVars_2061 = function(t_2260){
  if(t_2260.$tag==1){
    var $phi$248 = (((setAdd_1904($import1$instance$Hashable$13))($import1$instance$Eq$1))(t_2260.$1))(emptySet_1898)
  } else if(t_2260.$tag==5){
    var $phi$248 = emptySet_1898
  } else if(t_2260.$tag==7){
    var $phi$248 = emptySet_1898
  } else if(t_2260.$tag==0){
    var $phi$248 = emptySet_1898
  } else if(t_2260.$tag==2){
    var $phi$248 = emptySet_1898
  } else if(t_2260.$tag==6){
    var $phi$248 = ((foldl(function(s_2271){
      return function(v_2272){
        return (((setRemove_1911($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2272))(s_2271)
      }
    }))(((foldl((setUnion_1910($import1$instance$Hashable$13))($import1$instance$Eq$1)))(freeTVars_2061(t_2260.$3)))((map(freeTVarsInBound_2071))(t_2260.$2))))(t_2260.$1)
  } else if(t_2260.$tag==3){
    var $phi$248 = (((setUnion_1910($import1$instance$Hashable$13))($import1$instance$Eq$1))(freeTVars_2061(t_2260.$1)))(freeTVars_2061(t_2260.$2))
  } else if(t_2260.$tag==4){
    var $phi$248 = ((foldl((setUnion_1910($import1$instance$Hashable$13))($import1$instance$Eq$1)))(($_1886(justOr_1951(emptySet_1898)))(((fmap($import1$instance$Functor$4))(freeTVars_2061))(t_2260.$2))))((map(function(m_2279){
      return (((setUnion_1910($import1$instance$Hashable$13))($import1$instance$Eq$1))(freeTVars_2061(fst_1887(m_2279))))(freeTVars_2061(snd_1877(m_2279)))
    }))(t_2260.$1))
  } else error("pattern match fail",t_2260);
  return $phi$248
};
var freeTVarsInBound_2071 = function(b_2429){
  var $phi$249 = freeTVars_2061(b_2429.$2);
  return $phi$249
};
var addBinding_2056 = function(n_2233){
  return function(t_2234){
    return function(env_2235){
      var $phi$250 = ((IEnv_2033(((((insert_1903($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_2233))(t_2234))(env_2235.$0)))(env_2235.$1))((((setUnion_1910($import1$instance$Hashable$13))($import1$instance$Eq$1))(env_2235.$2))(freeTVars_2061(t_2234)));
      return $phi$250
    }
  }
};
var addBindings_2057 = function(nbs_2239){
  return function(env_2240){
    var $phi$251 = ((IEnv_2033((((mergeTrie_1909($import1$instance$Hashable$13))($import1$instance$Eq$1))(env_2240.$0))(nbs_2239)))(env_2240.$1))(((foldTrie_1897(function(fvs_2244){
      return function(__2245){
        return function(t_2246){
          return (((setUnion_1910($import1$instance$Hashable$13))($import1$instance$Eq$1))(fvs_2244))(freeTVars_2061(t_2246))
        }
      }
    }))(env_2240.$2))(nbs_2239));
    return $phi$251
  }
};
var f1_2062 = function(a_2280){
  return function(b_2281){
    return ((TApp_1997(emptyAnn_2009))(((TApp_1997(emptyAnn_2009))((TConst_1994(emptyAnn_2009))("->")))(a_2280)))(b_2281)
  }
};
var newTVar_2040 = function(ctx_2159){
  var n_2164 = ($concat("$"))(intToString(ctx_2159.$2));
  var $phi$252 = (Pair_1873((((ICtx_2032(ctx_2159.$0))(ctx_2159.$1))(ctx_2159.$2+1))(ctx_2159.$3)))((TVar_1995(emptyAnn_2009))(n_2164));
  return $phi$252
};
var addBound_2045 = function(b_2183){
  return function(ctx_2184){
    var $phi$253 = (((ICtx_2032(ctx_2184.$0))((push(b_2183))(ctx_2184.$1)))(ctx_2184.$2))(ctx_2184.$3);
    return $phi$253
  }
};
var instantiate_2065 = function(ctx_2298){
  return function(mkvar_2299){
    return function(t_2300){
      if(t_2300.$tag==6){
        var f_2310 = function(sc_2311){
          return function(v_2312){
            var $phi$257 = (mkvar_2299(sc_2311.$1))(v_2312);
            var $phi$256 = (Pair_1873(((((insert_1903($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2312))($phi$257.$1))(sc_2311.$0)))($phi$257.$0);
            var $phi$255 = $phi$256;
            return $phi$255
          }
        };
        var _sc_2305 = ((foldl(f_2310))((Pair_1873(Empty_1882))(ctx_2298)))(t_2300.$1);
        var subs_2306 = fst_1887(_sc_2305);
        var replace_2308 = function(t_2317){
          if(t_2317.$tag==0){
            var $phi$258 = t_2317
          } else if(t_2317.$tag==1){
            var $phi$258 = t_2317
          } else if(t_2317.$tag==5){
            var $phi$258 = t_2317
          } else if(t_2317.$tag==2){
            var $phi$261 = (((lookup_1895($import1$instance$Hashable$13))($import1$instance$Eq$1))(t_2317.$1))(subs_2306);
            if($phi$261.$tag==1){
              var $phi$260 = t_2317
            } else if($phi$261.$tag==0){
              var $phi$260 = $phi$261.$0
            } else error("pattern match fail",$phi$261);
            var $phi$258 = $phi$260
          } else if(t_2317.$tag==3){
            var $phi$258 = ((TApp_1997(t_2317.$0))(replace_2308(t_2317.$1)))(replace_2308(t_2317.$2))
          } else if(t_2317.$tag==4){
            var $phi$258 = ((TRow_1998(t_2317.$0))((map(function(m_2331){
              var $phi$259 = (Pair_1873(replace_2308(m_2331.$0)))(replace_2308(m_2331.$1));
              return $phi$259
            }))(t_2317.$1)))(((fmap($import1$instance$Functor$4))(replace_2308))(t_2317.$2))
          } else if(t_2317.$tag==6){
            var $phi$258 = error("nested universal quantification")
          } else error("pattern match fail",t_2317);
          return $phi$258
        };
        var replaceBound_2309 = function(b_2338){
          var $phi$262 = ((TCBound_1993(b_2338.$0))(b_2338.$1))(replace_2308(b_2338.$2));
          return $phi$262
        };
        var ctx2_2307 = snd_1877(_sc_2305);
        var $phi$254 = (Pair_1873((Pair_1873(replace_2308(t_2300.$3)))((map(replaceBound_2309))(t_2300.$2))))(ctx2_2307)
      } else var $phi$254 = (Pair_1873((Pair_1873(t_2300))([])))(ctx_2298);
      return $phi$254
    }
  }
};
var instantiateM_2064 = function(t_2289){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1925))(function(ctx_2290){
    var $phi$264 = ((instantiate_2065(ctx_2290))(function(ctx_2291){
      return function(__2292){
        return newTVar_2040(ctx_2291)
      }
    }))(t_2289);
    var $phi$263 = (($gt$gt_1953($import1$instance$Monad$11))(sets_1924(((foldl(function(ctx_2296){
      return function(b_2297){
        return (addBound_2045(b_2297))(ctx_2296)
      }
    }))($phi$264.$1))($phi$264.$0.$1))))((ret($import1$instance$Monad$11))($phi$264.$0.$0));
    return $phi$263
  })
};
var emptySubs_2035 = (Subs_2031(Empty_1882))(Empty_1882);
var composeSubs_2036 = function(ef_2105){
  return function(sa_2106){
    return function(sb_2107){
      var $phi$265 = ((foldTrie_1897(function(r_2110){
        return function(v_2111){
          return function(t_2112){
            return (((addSub_2037(ef_2105))(v_2111))(t_2112))(r_2110)
          }
        }
      }))(((foldTrie_1897(function(r_2113){
        return function(v_2114){
          return function(t_2115){
            return (((addSatSub_2038(ef_2105))(v_2114))(t_2115))(r_2113)
          }
        }
      }))(sa_2106))(sb_2107.$0)))(sb_2107.$1);
      return $phi$265
    }
  }
};
var addSub_2037 = function(ef_2116){
  return function(v_2117){
    return function(t_2118){
      return function(subs_2119){
        var t2_2120 = (applySubs_2067(subs_2119))(t_2118);
        var $phi$267 = (getSub_2034(v_2117))(subs_2119);
        if($phi$267.$tag==1){
          var subUnsat_2123 = function(local$instance$Hashable$1){
            return function(local$instance$Eq$0){
              return function(su_2127){
                return function(uv_2128){
                  return function(ut_2129){
                    var ut2_2132 = ((substitute_2066(v_2117))(t2_2120))(ut_2129);
                    var $phi$271 = isEmpty_1917(freeTVars_2061(ut2_2132));
                    if($phi$271){
                      var $phi$270 = (Pair_1873(((((insert_1903(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2128))(ut2_2132))(su_2127.$0)))(su_2127.$1)
                    } else if(!$phi$271){
                      var $phi$270 = (Pair_1873(su_2127.$0))(((((insert_1903(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2128))(ut2_2132))(su_2127.$1))
                    } else error("pattern match fail",$phi$271);
                    var $phi$269 = $phi$270;
                    return $phi$269
                  }
                }
              }
            }
          };
          var su_2124 = ((foldTrie_1897((subUnsat_2123($import1$instance$Hashable$13))($import1$instance$Eq$1)))((Pair_1873(subs_2119.$0))(Empty_1882)))(subs_2119.$1);
          var unsat2_2126 = snd_1877(su_2124);
          var sat2_2125 = fst_1887(su_2124);
          var $phi$273 = isEmpty_1917(freeTVars_2061(t2_2120));
          if($phi$273){
            var $phi$272 = (Subs_2031(((((insert_1903($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2117))(t2_2120))(sat2_2125)))(unsat2_2126)
          } else if(!$phi$273){
            var $phi$272 = (Subs_2031(sat2_2125))(((((insert_1903($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2117))(t2_2120))(unsat2_2126))
          } else error("pattern match fail",$phi$273);
          var $phi$268 = $phi$272;
          var $phi$266 = $phi$268
        } else if($phi$267.$tag==0){
          var $phi$266 = ((composeSubs_2036(ef_2116))(subs_2119))(((unify_2070(ef_2116))($phi$267.$0))(t2_2120))
        } else error("pattern match fail",$phi$267);
        return $phi$266
      }
    }
  }
};
var addSatSub_2038 = function(ef_2134){
  return function(v_2135){
    return function(t_2136){
      return function(subs_2137){
        var $phi$275 = (getSub_2034(v_2135))(subs_2137);
        if($phi$275.$tag==1){
          var subUnsat_2140 = function(local$instance$Hashable$1){
            return function(local$instance$Eq$0){
              return function(su_2144){
                return function(uv_2145){
                  return function(ut_2146){
                    var ut2_2149 = ((substitute_2066(v_2135))(t_2136))(ut_2146);
                    var $phi$279 = isEmpty_1917(freeTVars_2061(ut2_2149));
                    if($phi$279){
                      var $phi$278 = (Pair_1873(((((insert_1903(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2145))(ut2_2149))(su_2144.$0)))(su_2144.$1)
                    } else if(!$phi$279){
                      var $phi$278 = (Pair_1873(su_2144.$0))(((((insert_1903(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2145))(ut2_2149))(su_2144.$1))
                    } else error("pattern match fail",$phi$279);
                    var $phi$277 = $phi$278;
                    return $phi$277
                  }
                }
              }
            }
          };
          var su_2141 = ((foldTrie_1897((subUnsat_2140($import1$instance$Hashable$13))($import1$instance$Eq$1)))((Pair_1873(subs_2137.$0))(Empty_1882)))(subs_2137.$1);
          var unsat2_2143 = snd_1877(su_2141);
          var sat2_2142 = fst_1887(su_2141);
          var $phi$276 = (Subs_2031(((((insert_1903($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2135))(t_2136))(sat2_2142)))(unsat2_2143);
          var $phi$274 = $phi$276
        } else if($phi$275.$tag==0){
          var $phi$274 = ((composeSubs_2036(ef_2134))(subs_2137))(((unify_2070(ef_2134))($phi$275.$0))(t_2136))
        } else error("pattern match fail",$phi$275);
        return $phi$274
      }
    }
  }
};
var substitute_2066 = function(n_2343){
  return function(s_2344){
    return function(t_2345){
      return (applySubs_2067((((addSub_2037(function(s_2346){
        return ($concat("substitute: "))(s_2346)
      }))(n_2343))(s_2344))(emptySubs_2035)))(t_2345)
    }
  }
};
var unify_2070 = function(ef_2378){
  return function(a_2379){
    return function(b_2380){
      var err_2382 = function(a_2388){
        return function(b_2389){
          return error(ef_2378(($concat(($concat(($concat("cannot unify "))(printType_2026(a_2388))))(" with ")))(printType_2026(b_2389))))
        }
      };
      var bind_2381 = function(n_2383){
        return function(t_2384){
          if(t_2384.$tag==1){
            var $phi$284 = (($eq$eq($import1$instance$Eq$1))(n_2383))(t_2384.$1);
            if($phi$284){
              var $phi$283 = emptySubs_2035
            } else if(!$phi$284){
              var $phi$283 = (((addSub_2037(ef_2378))(n_2383))(t_2384))(emptySubs_2035)
            } else error("pattern match fail",$phi$284);
            var $phi$280 = $phi$283
          } else {
            var $phi$282 = (((setContains_1896($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_2383))(freeTVars_2061(t_2384));
            if($phi$282){
              var $phi$281 = error(ef_2378("occurs check failed"))
            } else if(!$phi$282){
              var $phi$281 = (((addSub_2037(ef_2378))(n_2383))(t_2384))(emptySubs_2035)
            } else error("pattern match fail",$phi$282);
            var $phi$280 = $phi$281
          };
          return $phi$280
        }
      };
      if(a_2379.$tag==1){
        var $phi$294 = (bind_2381(a_2379.$1))(b_2380);
        var $phi$285 = $phi$294
      } else if(a_2379.$tag==2){
        if(b_2380.$tag==2){
          var $phi$293 = (($eq$eq($import1$instance$Eq$1))(a_2379.$1))(b_2380.$1);
          if($phi$293){
            var $phi$292 = emptySubs_2035
          } else if(!$phi$293){
            var $phi$292 = (err_2382(a_2379))(b_2380)
          } else error("pattern match fail",$phi$293);
          var $phi$291 = $phi$292
        } else if(b_2380.$tag==1){
          var $phi$291 = (bind_2381(b_2380.$1))(a_2379)
        } else var $phi$291 = (err_2382(a_2379))(b_2380);
        var $phi$285 = $phi$291
      } else if(a_2379.$tag==0){
        if(b_2380.$tag==0){
          var $phi$290 = (($eq$eq($import1$instance$Eq$1))(a_2379.$1))(b_2380.$1);
          if($phi$290){
            var $phi$289 = emptySubs_2035
          } else if(!$phi$290){
            var $phi$289 = (err_2382(a_2379))(b_2380)
          } else error("pattern match fail",$phi$290);
          var $phi$288 = $phi$289
        } else if(b_2380.$tag==1){
          var $phi$288 = (bind_2381(b_2380.$1))(a_2379)
        } else var $phi$288 = (err_2382(a_2379))(b_2380);
        var $phi$285 = $phi$288
      } else if(a_2379.$tag==7){
        var $phi$285 = (err_2382(a_2379))(b_2380)
      } else if(a_2379.$tag==5){
        var $phi$285 = (err_2382(a_2379))(b_2380)
      } else if(a_2379.$tag==3){
        if(b_2380.$tag==1){
          var $phi$287 = (bind_2381(b_2380.$1))(a_2379)
        } else if(b_2380.$tag==3){
          var fsubs_2415 = ((unify_2070(ef_2378))(a_2379.$1))(b_2380.$1);
          var xsubs_2416 = ((unify_2070(ef_2378))((applySubs_2067(fsubs_2415))(a_2379.$2)))((applySubs_2067(fsubs_2415))(b_2380.$2));
          var $phi$287 = ((composeSubs_2036(ef_2378))(fsubs_2415))(xsubs_2416)
        } else var $phi$287 = (err_2382(a_2379))(b_2380);
        var $phi$285 = $phi$287
      } else if((a_2379.$tag==4)&&(a_2379.$2.$tag==1)){
        var $phi$285 = (err_2382(a_2379))(b_2380)
      } else if(a_2379.$tag==4){
        if(b_2380.$tag==1){
          var $phi$286 = (bind_2381(b_2380.$1))(a_2379)
        } else if((b_2380.$tag==4)&&(b_2380.$2.$tag==1)){
          var $phi$286 = (err_2382(a_2379))(b_2380)
        } else var $phi$286 = (err_2382(a_2379))(b_2380);
        var $phi$285 = $phi$286
      } else var $phi$285 = (err_2382(a_2379))(b_2380);
      return $phi$285
    }
  }
};
var setSubs_2044 = function(subs_2177){
  return function(ctx_2178){
    var $phi$295 = (((ICtx_2032(subs_2177))((map(applySubsBound_2068(subs_2177)))(ctx_2178.$1)))(ctx_2178.$2))(ctx_2178.$3);
    return $phi$295
  }
};
var getErrorF_2051 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1925))(function(ctx_2216){
  var $phi$296 = (ret($import1$instance$Monad$11))(ctx_2216.$3);
  return $phi$296
});
var unifyM_2069 = function(a_2372){
  return function(b_2373){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_1925))(function(ctx_2374){
      return (($gt$gt$eq($import1$instance$Monad$11))(getErrorF_2051))(function(ef_2375){
        var ef2_2376 = function(s_2377){
          return ef_2375(($concat(($concat(($concat(($concat(($concat("unifying "))(printType_2026(a_2372))))(" and ")))(printType_2026(b_2373))))(": ")))(s_2377))
        };
        return sets_1924((setSubs_2044(((composeSubs_2036(ef2_2376))(getSubs_2043(ctx_2374)))(((unify_2070(ef2_2376))(a_2372))(b_2373))))(ctx_2374))
      })
    })
  }
};
var onError_2049 = function(e_2206){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1925))(function(ctx_2207){
    var $phi$297 = sets_1924((((ICtx_2032(ctx_2207.$0))(ctx_2207.$1))(ctx_2207.$2))(e_2206));
    return $phi$297
  })
};
var withError_2050 = function(e_2212){
  return function(f_2213){
    return (($gt$gt$eq($import1$instance$Monad$11))(getErrorF_2051))(function(old_2214){
      return (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_1953($import1$instance$Monad$11))(onError_2049(e_2212)))(f_2213)))(function(r_2215){
        return (($gt$gt_1953($import1$instance$Monad$11))(onError_2049(old_2214)))((ret($import1$instance$Monad$11))(r_2215))
      })
    })
  }
};
var withLocError_2072 = function(e_2433){
  return function(f_2434){
    var $phi$299 = getAnnCodeLoc_2003(annOf_1983(e_2433));
    if($phi$299.$tag==1){
      var $phi$298 = f_2434
    } else if($phi$299.$tag==0){
      var $phi$298 = (withError_2050(function(s_2436){
        return ($concat(($concat(s_2436))(" ")))(printCodeLoc_2005($phi$299.$0))
      }))(f_2434)
    } else error("pattern match fail",$phi$299);
    return $phi$298
  }
};
var unrollDataConType_2081 = function(t_2657){
  if((t_2657.$tag==3)&&((t_2657.$1.$tag==3)&&((t_2657.$1.$1.$tag==0)&&("->"==t_2657.$1.$1.$1)))){
    var $phi$302 = unrollDataConType_2081(t_2657.$2);
    var $phi$301 = (Pair_1873((enqueue(t_2657.$1.$2))($phi$302.$0)))($phi$302.$1);
    var $phi$300 = $phi$301
  } else var $phi$300 = (Pair_1873([]))(t_2657);
  return $phi$300
};
var skolemizeSubs_2075 = (foldl(function(subs_2584){
  return function(v_2585){
    return (((addSub_2037(function(s_2586){
      return ($concat("skolemize: "))(s_2586)
    }))(v_2585))((TSkolem_1996(emptyAnn_2009))(v_2585)))(subs_2584)
  }
}))(emptySubs_2035);
var skolemize_2077 = function(e_2594){
  var $phi$304 = getType_1984(e_2594);
  if($phi$304.$tag==6){
    var subs_2599 = skolemizeSubs_2075($phi$304.$1);
    var t2_2600 = (((TForall_2000($phi$304.$0))($phi$304.$1))((map(applySubsBound_2068(subs_2599)))($phi$304.$2)))((applySubs_2067(subs_2599))($phi$304.$3));
    var $phi$303 = (applySubsE_2083(subs_2599))((setType_1988(t2_2600))(e_2594))
  } else var $phi$303 = e_2594;
  return $phi$303
};
var freeTVarsInEnv_2058 = function(env_2247){
  var $phi$305 = env_2247.$2;
  return $phi$305
};
var generalize_2080 = function(env_2625){
  return function(t_2626){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_1925))(function(ctx_2627){
      var subs_2628 = getSubs_2043(ctx_2627);
      var envTVars_2629 = freeTVarsInEnv_2058(env_2625);
      var $phi$306 = ((foldTrie_1897(function(s_2636){
        return function(v_2637){
          return function(__2638){
            return (((setUnion_1910($import1$instance$Hashable$13))($import1$instance$Eq$1))(s_2636))((justOr_1951(Empty_1882))(((fmap($import1$instance$Functor$4))(freeTVars_2061))((((lookup_1895($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2637))(subs_2628.$1))))
          }
        }
      }))(envTVars_2629))(envTVars_2629);
      var nonFree_2630 = $phi$306;
      var vs_2631 = (((setDiff_1907($import1$instance$Hashable$13))($import1$instance$Eq$1))(freeTVars_2061(t_2626)))(nonFree_2630);
      var processBounds_2633 = function(vbb_2639){
        return function(b_2640){
          var boundVars_2644 = freeTVarsInBound_2071(b_2640);
          var sharedVars_2645 = (((setIntersection_1905($import1$instance$Hashable$13))($import1$instance$Eq$1))(boundVars_2644))(vs_2631);
          var $phi$309 = isEmpty_1917(sharedVars_2645);
          if($phi$309){
            var $phi$308 = (Pair_1873(vbb_2639.$0))((Pair_1873(vbb_2639.$1.$0))((push(b_2640))(vbb_2639.$1.$1)))
          } else if(!$phi$309){
            var $phi$311 = (($eq$eq($import1$instance$Eq$0))(size_1914(sharedVars_2645)))(size_1914(boundVars_2644));
            if($phi$311){
              var $phi$310 = (Pair_1873(vbb_2639.$0))((Pair_1873((push(b_2640))(vbb_2639.$1.$0)))(vbb_2639.$1.$1))
            } else if(!$phi$311){
              var $phi$310 = (Pair_1873((((setUnion_1910($import1$instance$Hashable$13))($import1$instance$Eq$1))(vbb_2639.$0))(sharedVars_2645)))((Pair_1873(vbb_2639.$1.$0))((push(b_2640))(vbb_2639.$1.$1)))
            } else error("pattern match fail",$phi$311);
            var $phi$308 = $phi$310
          } else error("pattern match fail",$phi$309);
          var $phi$307 = $phi$308;
          return $phi$307
        }
      };
      var vbb_2632 = ((foldl(processBounds_2633))((Pair_1873(emptySet_1898))((Pair_1873([]))([]))))(getBounds_2046(ctx_2627));
      var finalVars_2649 = (((setDiff_1907($import1$instance$Hashable$13))($import1$instance$Eq$1))(vs_2631))(vbb_2632.$0);
      var drop_2650 = function(local$instance$Hashable$1){
        return function(local$instance$Eq$0){
          return function(r_2652){
            return function(v_2653){
              return function(t_2654){
                var $phi$314 = ($_1886(isEmpty_1917))((((setIntersection_1905($import1$instance$Hashable$13))($import1$instance$Eq$1))(finalVars_2649))(freeTVars_2061(t_2654)));
                if($phi$314){
                  var $phi$313 = ((((insert_1903(local$instance$Hashable$1))(local$instance$Eq$0))(v_2653))(t_2654))(r_2652)
                } else if(!$phi$314){
                  var $phi$313 = r_2652
                } else error("pattern match fail",$phi$314);
                return $phi$313
              }
            }
          }
        }
      };
      var $phi$315 = (Subs_2031(subs_2628.$0))(((foldTrie_1897((drop_2650($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_1882))(subs_2628.$1));
      var subs2_2651 = $phi$315;
      var $phi$317 = ($or(($_1886(not_1900))(isEmpty_1917(finalVars_2649))))((($gt_1956($import1$instance$Ord$2))(length(vbb_2632.$1.$0)))(0));
      if($phi$317){
        var $phi$316 = (ret($import1$instance$Monad$11))((((mkTForall_2063(emptyAnn_2009))(setToArray_1908(finalVars_2649)))(vbb_2632.$1.$0))(t_2626))
      } else if(!$phi$317){
        var $phi$316 = (ret($import1$instance$Monad$11))(t_2626)
      } else error("pattern match fail",$phi$317);
      var $phi$312 = (($gt$gt_1953($import1$instance$Monad$11))(sets_1924((setBounds_2047(vbb_2632.$1.$1))((setSubs_2044(subs2_2651))(ctx_2627)))))($phi$316);
      return $phi$312
    })
  }
};
var infer_2073 = function(env_2437){
  return function(e_2438){
    var inferPat_2441 = function(env_2459){
      return function(te_2460){
        return function(pat_2461){
          if(pat_2461.$tag==0){
            var $phi$318 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_2041))(function(tv_2464){
              return (($gt$gt_1953($import1$instance$Monad$11))((unifyM_2069(te_2460))(tv_2464)))((ret($import1$instance$Monad$11))((Pair_1873(((((insert_1903($import1$instance$Hashable$13))($import1$instance$Eq$1))(pat_2461.$1))(tv_2464))(Empty_1882)))((PVar_2019((setAnnType_1987(tv_2464))(pat_2461.$0)))(pat_2461.$1))))
            })
          } else if((pat_2461.$tag==1)&&(pat_2461.$1.$tag==0)){
            var $phi$318 = (($gt$gt_1953($import1$instance$Monad$11))((unifyM_2069(te_2460))((TConst_1994(emptyAnn_2009))("Number"))))((ret($import1$instance$Monad$11))((Pair_1873(Empty_1882))(pat_2461)))
          } else if((pat_2461.$tag==1)&&(pat_2461.$1.$tag==1)){
            var $phi$318 = (($gt$gt_1953($import1$instance$Monad$11))((unifyM_2069(te_2460))((TConst_1994(emptyAnn_2009))("String"))))((ret($import1$instance$Monad$11))((Pair_1873(Empty_1882))(pat_2461)))
          } else if(pat_2461.$tag==2){
            var $phi$318 = (($gt$gt$eq($import1$instance$Monad$11))((getBindingM_2054(pat_2461.$1))(env_2459)))(function(bt_2472){
              if(bt_2472.$tag==1){
                var $phi$319 = error(($concat("unknown data type "))(pat_2461.$1))
              } else if(bt_2472.$tag==0){
                var $phi$319 = (($gt$gt$eq($import1$instance$Monad$11))(instantiateM_2064(bt_2472.$0)))(function(t_2474){
                  var $phi$321 = unrollDataConType_2081(t_2474);
                  var $phi$323 = (($eq$eq($import1$instance$Eq$0))(length(pat_2461.$2)))(length($phi$321.$0));
                  if(!$phi$323){
                    var $phi$322 = errorM_2048("number of pattern params does not match the number of constructor params")
                  } else if($phi$323){
                    var $phi$322 = (($gt$gt$eq($import1$instance$Monad$11))((((foldM_1926($import1$instance$Monad$11))(inferSubPat_2442(env_2459)))((Pair_1873(Empty_1882))([])))((zip_1940(pat_2461.$2))($phi$321.$0))))(function(bps_2477){
                      var $phi$324 = (($gt$gt_1953($import1$instance$Monad$11))((unifyM_2069(te_2460))($phi$321.$1)))(($_1886(ret($import1$instance$Monad$11)))((Pair_1873(bps_2477.$0))(((PData_2017(pat_2461.$0))(pat_2461.$1))(bps_2477.$1))));
                      return $phi$324
                    })
                  } else error("pattern match fail",$phi$323);
                  var $phi$320 = $phi$322;
                  return $phi$320
                })
              } else error("pattern match fail",bt_2472);
              return $phi$319
            })
          } else error("pattern match fail",pat_2461);
          return $phi$318
        }
      }
    };
    var inferSubPat_2442 = function(env_2480){
      return function(bp_2481){
        return function(pt_2482){
          var $phi$326 = (($gt$gt$eq($import1$instance$Monad$11))(((inferPat_2441(env_2480))(pt_2482.$1))(pt_2482.$0)))(function(bp_2487){
            var $phi$327 = ($_1886(ret($import1$instance$Monad$11)))((Pair_1873((((mergeTrie_1909($import1$instance$Hashable$13))($import1$instance$Eq$1))(bp_2481.$0))(bp_2487.$0)))((push(bp_2487.$1))(bp_2481.$1)));
            return $phi$327
          });
          var $phi$325 = $phi$326;
          return $phi$325
        }
      }
    };
    var inferCase_2440 = function(env_2450){
      return function(te_2451){
        return function(p_2452){
          var $phi$328 = (($gt$gt$eq($import1$instance$Monad$11))(((inferPat_2441(env_2450))(te_2451))(p_2452.$0)))(function(cb_2455){
            var $phi$329 = (($gt$gt$eq($import1$instance$Monad$11))((infer_2073((addBindings_2057(cb_2455.$0))(env_2450)))(p_2452.$1)))(function(e_2458){
              return (ret($import1$instance$Monad$11))((Pair_1873(cb_2455.$1))(e_2458))
            });
            return $phi$329
          });
          return $phi$328
        }
      }
    };
    var setFinalType_2439 = function(t_2443){
      return function(e_2444){
        var $phi$331 = getType_1984(e_2444);
        if($phi$331.$tag==7){
          var $phi$330 = (ret($import1$instance$Monad$11))((setType_1988(t_2443))(e_2444))
        } else if($phi$331.$tag==6){
          var $phi$330 = (ret($import1$instance$Monad$11))(e_2444)
        } else var $phi$330 = (($gt$gt_1953($import1$instance$Monad$11))((unifyM_2069(t_2443))($phi$331)))((ret($import1$instance$Monad$11))(e_2444));
        return $phi$330
      }
    };
    if((e_2438.$tag==1)&&(e_2438.$1.$tag==0)){
      var $phi$332 = (setFinalType_2439((TConst_1994(emptyAnn_2009))("Number")))(e_2438)
    } else if((e_2438.$tag==1)&&(e_2438.$1.$tag==1)){
      var $phi$332 = (setFinalType_2439((TConst_1994(emptyAnn_2009))("String")))(e_2438)
    } else if(e_2438.$tag==0){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))((getBindingM_2054(e_2438.$1))(env_2437)))(function(vt_2496){
        if(vt_2496.$tag==1){
          var $phi$340 = errorM_2048(($concat(($concat(($concat("unknown identifier "))(e_2438.$1)))(", env: ")))(jsonStringify(($_1886(trieKeys_1913))(getBindings_2055(env_2437)))))
        } else if(vt_2496.$tag==0){
          var $phi$340 = (($gt$gt$eq($import1$instance$Monad$11))(instantiateM_2064(vt_2496.$0)))(function(t_2498){
            return (setFinalType_2439(t_2498))(e_2438)
          })
        } else error("pattern match fail",vt_2496);
        return $phi$340
      })
    } else if(e_2438.$tag==3){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_2041))(function(tv_2502){
        return (($gt$gt$eq($import1$instance$Monad$11))((infer_2073(((addBinding_2056(e_2438.$1))(tv_2502))(env_2437)))(e_2438.$2)))(function(a_2503){
          return (setFinalType_2439(((TApp_1997(emptyAnn_2009))(((TApp_1997(emptyAnn_2009))((TConst_1994(emptyAnn_2009))("->")))(tv_2502)))(getType_1984(a_2503))))(((Lam_1963(e_2438.$0))(e_2438.$1))(a_2503))
        })
      })
    } else if(e_2438.$tag==2){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_2041))(function(tv_2507){
        return (($gt$gt$eq($import1$instance$Monad$11))((infer_2073(env_2437))(e_2438.$1)))(function(f_2508){
          return (($gt$gt$eq($import1$instance$Monad$11))((infer_2073(env_2437))(e_2438.$2)))(function(a_2509){
            var synth_2510 = (f1_2062(getType_1984(a_2509)))(tv_2507);
            return (($gt$gt_1953($import1$instance$Monad$11))((unifyM_2069(getType_1984(f_2508)))(synth_2510)))((setFinalType_2439(tv_2507))(((App_1962(e_2438.$0))(f_2508))(a_2509)))
          })
        })
      })
    } else if(e_2438.$tag==4){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))((infer_2073(env_2437))(e_2438.$1)))(function(e_2514){
        return (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1927($import1$instance$Monad$11))((inferCase_2440(env_2437))(getType_1984(e_2514))))(e_2438.$2)))(function(ps_2515){
          var t_2516 = getType_1984(snd_1877(head_1933(ps_2515)));
          return (($gt$gt_1953($import1$instance$Monad$11))(((mapM_1927($import1$instance$Monad$11))(function(p_2517){
            return (unifyM_2069(t_2516))(($_1886(getType_1984))(snd_1877(p_2517)))
          }))(tail_1932(ps_2515))))((setFinalType_2439(t_2516))(((Case_1964(e_2438.$0))(e_2514))(ps_2515)))
        })
      })
    } else if(e_2438.$tag==5){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))((inferDefs_2079(env_2437))(e_2438.$1)))(function(ds_2521){
        var env2_2522 = ((foldl(function(env_2523){
          return function(d_2524){
            var $phi$339 = ((addBinding_2056(d_2524.$0))(getType_1984(d_2524.$1)))(env_2523);
            return $phi$339
          }
        }))(env_2437))(ds_2521);
        return (($gt$gt$eq($import1$instance$Monad$11))((infer_2073(env2_2522))(e_2438.$2)))(function(e_2527){
          return (setFinalType_2439(getType_1984(e_2527)))(((Let_1965(e_2438.$0))(ds_2521))(e_2527))
        })
      })
    } else if((e_2438.$tag==6)&&("Array"==e_2438.$1)){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1927($import1$instance$Monad$11))(infer_2073(env_2437)))(e_2438.$2)))(function(es_2530){
        return (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_2041))(function(tv_2531){
          return (($gt$gt_1953($import1$instance$Monad$11))(((mapM_1927($import1$instance$Monad$11))(function(e_2532){
            return (unifyM_2069(tv_2531))(getType_1984(e_2532))
          }))(es_2530)))((setFinalType_2439(((TApp_1997(emptyAnn_2009))((TConst_1994(emptyAnn_2009))("Array")))(tv_2531)))(((New_1966(e_2438.$0))("Array"))(es_2530)))
        })
      })
    } else if(e_2438.$tag==6){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1927($import1$instance$Monad$11))(infer_2073(env_2437)))(e_2438.$2)))(function(es_2536){
        return (($gt$gt$eq($import1$instance$Monad$11))((getBindingM_2054(e_2438.$1))(env_2437)))(function(t_2537){
          if(t_2537.$tag==1){
            var $phi$333 = error(($concat("unknown data constructor "))(e_2438.$1))
          } else if(t_2537.$tag==0){
            var $phi$333 = (($gt$gt$eq($import1$instance$Monad$11))(instantiateM_2064(t_2537.$0)))(function(t_2539){
              var $phi$335 = unrollDataConType_2081(t_2539);
              var $phi$337 = (($eq$eq($import1$instance$Eq$0))(length(es_2536)))(length($phi$335.$0));
              if(!$phi$337){
                var $phi$336 = errorM_2048(($concat(($concat(($concat("number of New args does not match the number of constructor params "))(jsonStringify(es_2536))))(" ")))(printType_2026(t_2539)))
              } else if($phi$337){
                var $phi$336 = (($gt$gt_1953($import1$instance$Monad$11))(((mapM_1927($import1$instance$Monad$11))(function(p_2542){
                  var $phi$338 = (unifyM_2069(p_2542.$0))(getType_1984(p_2542.$1));
                  return $phi$338
                }))((zip_1940($phi$335.$0))(es_2536))))((setFinalType_2439($phi$335.$1))(((New_1966(e_2438.$0))(e_2438.$1))(es_2536)))
              } else error("pattern match fail",$phi$337);
              var $phi$334 = $phi$336;
              return $phi$334
            })
          } else error("pattern match fail",t_2537);
          return $phi$333
        })
      })
    } else var $phi$332 = error("type inference not supported for this AST node");
    return ($_1886(withLocError_2072(e_2438)))($phi$332)
  }
};
var inferSccDefs_2074 = function(env_2546){
  return function(ds_2547){
    var generalizeDef_2551 = function(env_2570){
      return function(d_2571){
        var $phi$343 = getType_1984(d_2571.$1);
        if($phi$343.$tag==6){
          var $phi$342 = (ret($import1$instance$Monad$11))(d_2571)
        } else var $phi$342 = (($gt$gt$eq($import1$instance$Monad$11))((generalize_2080(env_2570))($phi$343)))(function(t_2579){
          var e2_2580 = skolemize_2077((setType_1988(t_2579))(d_2571.$1));
          return (ret($import1$instance$Monad$11))((Pair_1873(d_2571.$0))(e2_2580))
        });
        var $phi$341 = $phi$342;
        return $phi$341
      }
    };
    var unifyDef_2550 = function(env_2561){
      return function(d_2562){
        var $phi$346 = getType_1984(d_2562.$1);
        if($phi$346.$tag==6){
          var $phi$345 = (ret($import1$instance$Monad$11))(Unit_1899)
        } else var $phi$345 = (unifyM_2069($phi$346))(($_1886(fromJust_1950))((getBinding_2053(d_2562.$0))(env_2561)));
        var $phi$344 = $phi$345;
        return $phi$344
      }
    };
    var inferDef_2549 = function(env_2556){
      return function(d_2557){
        var $phi$347 = (($gt$gt$eq($import1$instance$Monad$11))((infer_2073(env_2556))(d_2557.$1)))(function(e_2560){
          return (ret($import1$instance$Monad$11))((Pair_1873(d_2557.$0))(e_2560))
        });
        return $phi$347
      }
    };
    var generateTVar_2548 = function(env_2552){
      return function(d_2553){
        var $phi$349 = getType_1984(snd_1877(d_2553));
        if($phi$349.$tag==7){
          var $phi$348 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_2041))(function(tv_2554){
            return (ret($import1$instance$Monad$11))(((addBinding_2056(fst_1887(d_2553)))(tv_2554))(env_2552))
          })
        } else var $phi$348 = (ret($import1$instance$Monad$11))(((addBinding_2056(fst_1887(d_2553)))($phi$349))(env_2552));
        return $phi$348
      }
    };
    return (($gt$gt$eq($import1$instance$Monad$11))((((foldM_1926($import1$instance$Monad$11))(generateTVar_2548))(env_2546))(ds_2547)))(function(env2_2581){
      return (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1927($import1$instance$Monad$11))(inferDef_2549(env2_2581)))(ds_2547)))(function(ds2_2582){
        return (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_1953($import1$instance$Monad$11))(((mapM_1927($import1$instance$Monad$11))(unifyDef_2550(env2_2581)))(ds2_2582)))(((mapM_1927($import1$instance$Monad$11))(applySubsDef_2082))(ds2_2582))))(function(ds3_2583){
          return (($gt$gt_1953($import1$instance$Monad$11))(dropSatisfiedBounds_2078(env_2546)))(((mapM_1927($import1$instance$Monad$11))(generalizeDef_2551(env_2546)))(ds3_2583))
        })
      })
    })
  }
};
var inferDefs_2079 = function(env_2609){
  return function(ds_2610){
    var infer_2614 = function(rs_2620){
      return function(cc_2621){
        return ((fmap($import1$instance$Functor$9))(concat(rs_2620)))((inferSccDefs_2074(((foldl(function(env_2622){
          return function(r_2623){
            return ((addBinding_2056(fst_1887(r_2623)))(getType_1984(snd_1877(r_2623))))(env_2622)
          }
        }))(env_2609))(rs_2620)))((filter(function(d_2624){
          return ((contains_1947($import1$instance$Eq$1))(fst_1887(d_2624)))(cc_2621)
        }))(ds_2610)))
      }
    };
    var ns_2611 = (map(fst_1887))(ds_2610);
    var g_2612 = ((foldl(function(g_2615){
      return function(d_2616){
        var $phi$350 = ((set(d_2616.$0))((filter(function(v_2619){
          return ($and(((contains_1947($import1$instance$Eq$1))(v_2619))(ns_2611)))((($div$eq_1901($import1$instance$Eq$1))(v_2619))(d_2616.$0))
        }))(freeVars_2084(d_2616.$1))))(g_2615);
        return $phi$350
      }
    }))(empty))(ds_2610);
    var ccs_2613 = sccSorted_2030(g_2612);
    return (((foldM_1926($import1$instance$Monad$11))(infer_2614))([]))(ccs_2613)
  }
};
var newCtx_2042 = (((ICtx_2032(emptySubs_2035))([]))(1))(function(s_2171){
  return ($concat("unknown error context: "))(s_2171)
});
var inferInstance_2085 = function(env_2719){
  return function(cs_2720){
    return function(i_2721){
      var inferE_2722 = function(e_2723){
        var $phi$352 = ($_1886(runState_1922(newCtx_2042)))((infer_2073(env_2719))(e_2723));
        var $phi$351 = (applySubsE_2083(getSubs_2043($phi$352.$0)))($phi$352.$1);
        return $phi$351
      };
      var $phi$356 = (find_1891(function(c_2730){
        var $phi$355 = (($eq$eq($import1$instance$Eq$1))(i_2721.$1))(c_2730.$1);
        return $phi$355
      }))(cs_2720);
      if($phi$356.$tag==1){
        var $phi$354 = error(($concat("Cannot find clas "))(i_2721.$1))
      } else if($phi$356.$tag==0){
        var bs2_2739 = ((foldl(function(bs_2741){
          return function(b_2742){
            var $phi$357 = ((((insert_1903($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2742.$0))(((substitute_2066($phi$356.$0.$2))(i_2721.$2))(b_2742.$1)))(bs_2741);
            return $phi$357
          }
        }))(Empty_1882))($phi$356.$0.$3);
        var ds2_2740 = (map(function(d_2745){
          var $phi$358 = (Pair_1873(d_2745.$0))(inferE_2722((setType_1988(($_1886(fromJust_1950))((((lookup_1895($import1$instance$Hashable$13))($import1$instance$Eq$1))(d_2745.$0))(bs2_2739))))(d_2745.$1)));
          return $phi$358
        }))(i_2721.$3);
        var $phi$354 = (((Instance_2013(i_2721.$0))(i_2721.$1))(i_2721.$2))(ds2_2740)
      } else error("pattern match fail",$phi$356);
      var $phi$353 = $phi$354;
      return $phi$353
    }
  }
};
var emptyEnv_2052 = ((IEnv_2033(Empty_1882))([]))(emptySet_1898);
var addInstance_2059 = function(b_2251){
  return function(env_2252){
    var $phi$359 = ((IEnv_2033(env_2252.$0))((push(b_2251))(env_2252.$1)))(env_2252.$2);
    return $phi$359
  }
};
var skolemizeType_2076 = function(t_2587){
  if(t_2587.$tag==6){
    var subs_2592 = skolemizeSubs_2075(t_2587.$1);
    var $phi$360 = (((TForall_2000(t_2587.$0))(t_2587.$1))((map(applySubsBound_2068(subs_2592)))(t_2587.$2)))((applySubs_2067(subs_2592))(t_2587.$3))
  } else var $phi$360 = t_2587;
  return $phi$360
};
var classToBindings_2087 = function(c_2753){
  var process_2758 = function(b_2759){
    var ftv_2762 = freeTVars_2061(b_2759.$1);
    var $phi$364 = (((setContains_1896($import1$instance$Hashable$13))($import1$instance$Eq$1))(c_2753.$2))(ftv_2762);
    if(!$phi$364){
      var $phi$363 = error(($concat(($concat(($concat("invalid clas definition "))(c_2753.$1)))(", binding ")))(b_2759.$0))
    } else if($phi$364){
      var $phi$363 = (Pair_1873(b_2759.$0))(skolemizeType_2076((((mkTForall_2063(emptyAnn_2009))(setToArray_1908(ftv_2762)))([((TCBound_1993(emptyAnn_2009))(c_2753.$1))((TVar_1995(emptyAnn_2009))(c_2753.$2))]))(b_2759.$1)))
    } else error("pattern match fail",$phi$364);
    var $phi$362 = $phi$363;
    return $phi$362
  };
  var $phi$361 = (map(process_2758))(c_2753.$3);
  return $phi$361
};
var inferTypeModule_2088 = function(ms_2763){
  return function(m_2764){
    var checkForUnsatisfiedBounds_2769 = function(d_2797){
      var $phi$366 = getType_1984(snd_1877(d_2797));
      if($phi$366.$tag==6){
        if(($phi$366.$3.$tag==3)&&(($phi$366.$3.$1.$tag==3)&&(($phi$366.$3.$1.$1.$tag==0)&&("->"==$phi$366.$3.$1.$1.$1)))){
          var $phi$367 = d_2797
        } else {
          var $phi$369 = length($phi$366.$2);
          if(0==$phi$369){
            var $phi$368 = d_2797
          } else var $phi$368 = error(($concat(($concat(($concat("unsatisfied bounds in def of "))(fst_1887(d_2797))))(" :: ")))(printType_2026(getType_1984(snd_1877(d_2797)))));
          var $phi$367 = $phi$368
        };
        var $phi$365 = $phi$367
      } else var $phi$365 = d_2797;
      return $phi$365
    };
    var addIns_2768 = function(env_2795){
      return function(i_2796){
        return (addInstance_2059(instanceToTypeBound_2086(i_2796)))(env_2795)
      }
    };
    var getFile_2765 = function(i_2770){
      if(i_2770.$tag==1){
        var $phi$370 = i_2770.$1
      } else error("pattern match fail",i_2770);
      return $phi$370
    };
    var addClass_2767 = function(env_2791){
      return function(c_2792){
        return ((foldl(function(env_2793){
          return function(b_2794){
            return ((addBinding_2056(fst_1887(b_2794)))(snd_1877(b_2794)))(env_2793)
          }
        }))(env_2791))(classToBindings_2087(c_2792))
      }
    };
    var addImports_2766 = function(env_2774){
      return function(i_2775){
        var $phi$372 = (get(getFile_2765(i_2775)))(ms_2763);
        if(i_2775.$tag==1){
          var $phi$373 = ((foldl(function(env_2785){
            return function(n_2786){
              var $phi$374 = ((addBinding_2056(n_2786.$1))((get(n_2786.$0))($phi$372.$0)))(env_2785);
              return $phi$374
            }
          }))(env_2774))(i_2775.$2)
        } else error("pattern match fail",i_2775);
        var env2_2779 = $phi$373;
        var env3_2780 = ((foldl(addClass_2767))(env2_2779))($phi$372.$1);
        var env4_2781 = ((foldl(function(env_2789){
          return function(i_2790){
            return (addInstance_2059(i_2790))(env_2789)
          }
        }))(env3_2780))($phi$372.$2);
        var $phi$371 = env4_2781;
        return $phi$371
      }
    };
    var env_2817 = emptyEnv_2052;
    var env2_2818 = ((foldl(addImports_2766))(env_2817))(m_2764.$2);
    var env3_2819 = ((foldl(addClass_2767))(env2_2818))(m_2764.$4);
    var env4_2820 = ((foldl(addIns_2768))(env3_2819))(m_2764.$5);
    var ds2_2821 = (evalState_1923(newCtx_2042))((inferDefs_2079(env4_2820))(m_2764.$6));
    var ds3_2822 = (map(checkForUnsatisfiedBounds_2769))(ds2_2821);
    var env5_2823 = ((foldl(function(env_2825){
      return function(d_2826){
        var $phi$376 = ((addBinding_2056(d_2826.$0))(getType_1984(d_2826.$1)))(env_2825);
        return $phi$376
      }
    }))(env4_2820))(ds3_2822);
    var ins2_2824 = (map((inferInstance_2085(env5_2823))((concat(m_2764.$4))((concatMap_1939(function(i_2829){
      var $phi$378 = (get(getFile_2765(i_2829)))(ms_2763);
      var $phi$377 = $phi$378.$1;
      return $phi$377
    }))(m_2764.$2)))))(m_2764.$5);
    var $phi$375 = ((((((Module_2016(m_2764.$0))(m_2764.$1))(m_2764.$2))(m_2764.$3))(m_2764.$4))(ins2_2824))(ds3_2822);
    return $phi$375
  }
};
var assert_2877 = assert_89;
var Pair_2878 = Pair_3;
var mapSnd_2879 = mapSnd_88;
var mapFst_2880 = mapFst_87;
var $gt$eq$gt_2881 = $gt$eq$gt_86;
var snd_2882 = snd_27;
var debug2_2883 = debug2_85;
var Just_2884 = Just_1;
var Nothing_2885 = Nothing_2;
var isJust_2886 = isJust_25;
var Empty_2887 = Empty_11;
var Leaf_2888 = Leaf_12;
var Collision_2889 = Collision_13;
var BitmapIndexed_2890 = BitmapIndexed_14;
var $_2891 = $_16;
var fst_2892 = fst_26;
var Left_2893 = Left_8;
var Right_2894 = Right_9;
var loop_2895 = loop_31;
var find_2896 = find_33;
var hamtMask_2897 = hamtMask_62;
var popCount_2898 = popCount_61;
var hamtIndex_2899 = hamtIndex_63;
var lookup_2900 = lookup_64;
var setContains_2901 = setContains_80;
var foldTrie_2902 = foldTrie_70;
var emptySet_2903 = emptySet_76;
var Unit_2904 = Unit_0;
var not_2905 = not_30;
var $div$eq_2906 = $div$eq_17;
var mapIx_2907 = mapIx_34;
var insert_2908 = insert_65;
var setAdd_2909 = setAdd_77;
var setIntersection_2910 = setIntersection_84;
var remove_2911 = remove_67;
var setDiff_2912 = setDiff_83;
var setToArray_2913 = setToArray_82;
var mergeTrie_2914 = mergeTrie_74;
var setUnion_2915 = setUnion_81;
var setRemove_2916 = setRemove_79;
var setAddAll_2917 = setAddAll_78;
var trieKeys_2918 = trieKeys_75;
var size_2919 = size_72;
var mapTrie_2920 = mapTrie_71;
var nodeMask_2921 = nodeMask_60;
var isEmpty_2922 = isEmpty_73;
var filterTrie_2923 = filterTrie_69;
var nextSetBitMask_2924 = nextSetBitMask_68;
var updateOrSet_2925 = updateOrSet_66;
var State_2926 = State_10;
var runState_2927 = runState_58;
var evalState_2928 = evalState_59;
var sets_2929 = sets_57;
var gets_2930 = gets_56;
var foldM_2931 = foldM_53;
var mapM_2932 = mapM_54;
var forM_2933 = forM_55;
var strToArray_2934 = strToArray_52;
var toRecord_2935 = toRecord_51;
var reverse_2936 = reverse_50;
var tail_2937 = tail_45;
var head_2938 = head_44;
var uniq_2939 = uniq_49;
var mergeSet_2940 = mergeSet_48;
var init_2941 = init_47;
var last_2942 = last_46;
var mapJust_2943 = mapJust_43;
var concatMap_2944 = concatMap_42;
var zip_2945 = zip_41;
var zipWithIndex2_2946 = zipWithIndex2_39;
var zipWithIndex_2947 = zipWithIndex_40;
var join_2948 = join_38;
var all_2949 = all_37;
var exists_2950 = exists_36;
var containsChar_2951 = containsChar_35;
var contains_2952 = contains_32;
var either_2953 = either_28;
var splitEither_2954 = splitEither_29;
var fromJust_2955 = fromJust_24;
var justOr_2956 = justOr_23;
var maybe_2957 = maybe_22;
var $gt$gt_2958 = $gt$gt_21;
var $gt$eq_2959 = $gt$eq_20;
var $lt$eq_2960 = $lt$eq_19;
var $gt_2961 = $gt_18;
var Identity_2962 = Identity_15;
var Tuple6_2963 = Tuple6_7;
var Tuple5_2964 = Tuple5_6;
var Tuple4_2965 = Tuple4_5;
var Tuple3_2966 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_2967 = App_761;
var Lam_2968 = Lam_762;
var Case_2969 = Case_763;
var Let_2970 = Let_764;
var New_2971 = New_765;
var breakableDownAndUpM_2972 = breakableDownAndUpM_812;
var breakableDownM_2973 = breakableDownM_816;
var downAndUpM_2974 = downAndUpM_813;
var downM_2975 = downM_815;
var upM_2976 = upM_814;
var breakableDownAndUp_2977 = breakableDownAndUp_807;
var breakableDown_2978 = breakableDown_811;
var downAndUp_2979 = downAndUp_808;
var down_2980 = down_810;
var up_2981 = up_809;
var AnnType_2982 = AnnType_753;
var TUnknown_2983 = TUnknown_785;
var getAnn_2984 = getAnn_790;
var getAnnType_2985 = getAnnType_793;
var Var_2986 = Var_759;
var Const_2987 = Const_760;
var annOf_2988 = annOf_804;
var getType_2989 = getType_806;
var withAnn_2990 = withAnn_805;
var setAnn_2991 = setAnn_791;
var setAnnType_2992 = setAnnType_794;
var setType_2993 = setType_803;
var Data_2994 = Data_773;
var DataCon_2995 = DataCon_774;
var dataConName_2996 = dataConName_801;
var dataConNames_2997 = dataConNames_802;
var TCBound_2998 = TCBound_777;
var TConst_2999 = TConst_778;
var TVar_3000 = TVar_779;
var TSkolem_3001 = TSkolem_780;
var TApp_3002 = TApp_781;
var TRow_3003 = TRow_782;
var TBot_3004 = TBot_783;
var TForall_3005 = TForall_784;
var equivBound_3006 = equivBound_799;
var equivType_3007 = equivType_800;
var getAnnCodeLoc_3008 = getAnnCodeLoc_795;
var AnnCodeLoc_3009 = AnnCodeLoc_754;
var printCodeLoc_3010 = printCodeLoc_797;
var exprLoc_3011 = exprLoc_798;
var setAnnCodeLoc_3012 = setAnnCodeLoc_796;
var copyAnn_3013 = copyAnn_792;
var emptyAnn_3014 = emptyAnn_789;
var ImportAll_3015 = ImportAll_788;
var ImportOpen_3016 = ImportOpen_787;
var ImportClosed_3017 = ImportClosed_786;
var Instance_3018 = Instance_776;
var Class_3019 = Class_775;
var ModuleInterface_3020 = ModuleInterface_772;
var Module_3021 = Module_771;
var PData_3022 = PData_770;
var PConst_3023 = PConst_769;
var PVar_3024 = PVar_768;
var CStr_3025 = CStr_767;
var CNum_3026 = CNum_766;
var AnnExport_3027 = AnnExport_758;
var AnnTag_3028 = AnnTag_757;
var AnnData_3029 = AnnData_756;
var AnnUseCount_3030 = AnnUseCount_755;
var skolemize_3031 = skolemize_2077;
var mkConFun_3034 = function(tag_3058){
  return function(dt_3059){
    return function(vs_3060){
      return function(n_3061){
        return function(ts_3062){
          var nts_3063 = (map(function(it_3069){
            return (Pair_2878(($concat("$_"))(intToString(fst_2892(it_3069)))))(snd_2882(it_3069))
          }))(zipWithIndex_2947(ts_3062));
          var new_3064 = (setType_2993(dt_3059))(((New_2971(emptyAnn_3014))(n_3061))((map(function(nt_3070){
            return (Var_2986(emptyAnn_3014))(fst_2892(nt_3070))
          }))(nts_3063)));
          var mkCon_3065 = function(r_3071){
            return function(nt_3072){
              var $phi$379 = (setType_2993(((TApp_3002(emptyAnn_3014))(((TApp_3002(emptyAnn_3014))((TConst_2999(emptyAnn_3014))("->")))(nt_3072.$1)))(getType_2989(r_3071))))(((Lam_2968(emptyAnn_3014))(nt_3072.$0))(r_3071));
              return $phi$379
            }
          };
          var con_3066 = ((foldr(mkCon_3065))(new_3064))(nts_3063);
          var conT_3067 = (((TForall_3005(emptyAnn_3014))(vs_3060))([]))(getType_2989(con_3066));
          var ann_3068 = ((((setAnn_2991($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_3027(n_3061)))(((((setAnn_2991($import1$instance$Hashable$13))($import1$instance$Eq$1))("type"))(AnnType_2982(conT_3067)))(((((setAnn_2991($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(AnnData_3029(tag_3058)))(emptyAnn_3014)));
          return (Pair_2878(n_3061))(skolemize_3031((withAnn_2990(ann_3068))(con_3066)))
        }
      }
    }
  }
};
var rewriteData_3033 = function(d_3043){
  var dt_3048 = ((foldl(function(r_3050){
    return function(v_3051){
      return ((TApp_3002(emptyAnn_3014))(r_3050))((TVar_3000(emptyAnn_3014))(v_3051))
    }
  }))((TConst_2999(emptyAnn_3014))(d_3043.$1)))(d_3043.$2);
  var rewriteCon_3049 = function(c_3052){
    var $phi$382 = length(d_3043.$3);
    if(1==$phi$382){
      var $phi$381 = Nothing_2885
    } else var $phi$381 = Just_2884(fst_2892(c_3052));
    var tag_3053 = $phi$381;
    var $phi$384 = snd_2882(c_3052);
    var $phi$383 = ((((mkConFun_3034(tag_3053))(dt_3048))(d_3043.$2))($phi$384.$1))($phi$384.$2);
    return $phi$383
  };
  var $phi$380 = (map(rewriteCon_3049))(zipWithIndex_2947(d_3043.$3));
  return $phi$380
};
var translateAdts_3032 = function(m_3035){
  var $phi$385 = ((((((Module_3021(m_3035.$0))(m_3035.$1))(m_3035.$2))([]))(m_3035.$4))(m_3035.$5))((concat((concatMap_2944(rewriteData_3033))(m_3035.$3)))(m_3035.$6));
  return $phi$385
};
var assert_3075 = assert_89;
var Pair_3076 = Pair_3;
var mapSnd_3077 = mapSnd_88;
var mapFst_3078 = mapFst_87;
var $gt$eq$gt_3079 = $gt$eq$gt_86;
var snd_3080 = snd_27;
var debug2_3081 = debug2_85;
var Just_3082 = Just_1;
var Nothing_3083 = Nothing_2;
var isJust_3084 = isJust_25;
var Empty_3085 = Empty_11;
var Leaf_3086 = Leaf_12;
var Collision_3087 = Collision_13;
var BitmapIndexed_3088 = BitmapIndexed_14;
var $_3089 = $_16;
var fst_3090 = fst_26;
var Left_3091 = Left_8;
var Right_3092 = Right_9;
var loop_3093 = loop_31;
var find_3094 = find_33;
var hamtMask_3095 = hamtMask_62;
var popCount_3096 = popCount_61;
var hamtIndex_3097 = hamtIndex_63;
var lookup_3098 = lookup_64;
var setContains_3099 = setContains_80;
var foldTrie_3100 = foldTrie_70;
var emptySet_3101 = emptySet_76;
var Unit_3102 = Unit_0;
var not_3103 = not_30;
var $div$eq_3104 = $div$eq_17;
var mapIx_3105 = mapIx_34;
var insert_3106 = insert_65;
var setAdd_3107 = setAdd_77;
var setIntersection_3108 = setIntersection_84;
var remove_3109 = remove_67;
var setDiff_3110 = setDiff_83;
var setToArray_3111 = setToArray_82;
var mergeTrie_3112 = mergeTrie_74;
var setUnion_3113 = setUnion_81;
var setRemove_3114 = setRemove_79;
var setAddAll_3115 = setAddAll_78;
var trieKeys_3116 = trieKeys_75;
var size_3117 = size_72;
var mapTrie_3118 = mapTrie_71;
var nodeMask_3119 = nodeMask_60;
var isEmpty_3120 = isEmpty_73;
var filterTrie_3121 = filterTrie_69;
var nextSetBitMask_3122 = nextSetBitMask_68;
var updateOrSet_3123 = updateOrSet_66;
var State_3124 = State_10;
var runState_3125 = runState_58;
var evalState_3126 = evalState_59;
var sets_3127 = sets_57;
var gets_3128 = gets_56;
var foldM_3129 = foldM_53;
var mapM_3130 = mapM_54;
var forM_3131 = forM_55;
var strToArray_3132 = strToArray_52;
var toRecord_3133 = toRecord_51;
var reverse_3134 = reverse_50;
var tail_3135 = tail_45;
var head_3136 = head_44;
var uniq_3137 = uniq_49;
var mergeSet_3138 = mergeSet_48;
var init_3139 = init_47;
var last_3140 = last_46;
var mapJust_3141 = mapJust_43;
var concatMap_3142 = concatMap_42;
var zip_3143 = zip_41;
var zipWithIndex2_3144 = zipWithIndex2_39;
var zipWithIndex_3145 = zipWithIndex_40;
var join_3146 = join_38;
var all_3147 = all_37;
var exists_3148 = exists_36;
var containsChar_3149 = containsChar_35;
var contains_3150 = contains_32;
var either_3151 = either_28;
var splitEither_3152 = splitEither_29;
var fromJust_3153 = fromJust_24;
var justOr_3154 = justOr_23;
var maybe_3155 = maybe_22;
var $gt$gt_3156 = $gt$gt_21;
var $gt$eq_3157 = $gt$eq_20;
var $lt$eq_3158 = $lt$eq_19;
var $gt_3159 = $gt_18;
var Identity_3160 = Identity_15;
var Tuple6_3161 = Tuple6_7;
var Tuple5_3162 = Tuple5_6;
var Tuple4_3163 = Tuple4_5;
var Tuple3_3164 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_3165 = App_761;
var Lam_3166 = Lam_762;
var Case_3167 = Case_763;
var Let_3168 = Let_764;
var New_3169 = New_765;
var breakableDownAndUpM_3170 = breakableDownAndUpM_812;
var breakableDownM_3171 = breakableDownM_816;
var downAndUpM_3172 = downAndUpM_813;
var downM_3173 = downM_815;
var upM_3174 = upM_814;
var breakableDownAndUp_3175 = breakableDownAndUp_807;
var breakableDown_3176 = breakableDown_811;
var downAndUp_3177 = downAndUp_808;
var down_3178 = down_810;
var up_3179 = up_809;
var AnnType_3180 = AnnType_753;
var TUnknown_3181 = TUnknown_785;
var getAnn_3182 = getAnn_790;
var getAnnType_3183 = getAnnType_793;
var Var_3184 = Var_759;
var Const_3185 = Const_760;
var annOf_3186 = annOf_804;
var getType_3187 = getType_806;
var withAnn_3188 = withAnn_805;
var setAnn_3189 = setAnn_791;
var setAnnType_3190 = setAnnType_794;
var setType_3191 = setType_803;
var Data_3192 = Data_773;
var DataCon_3193 = DataCon_774;
var dataConName_3194 = dataConName_801;
var dataConNames_3195 = dataConNames_802;
var TCBound_3196 = TCBound_777;
var TConst_3197 = TConst_778;
var TVar_3198 = TVar_779;
var TSkolem_3199 = TSkolem_780;
var TApp_3200 = TApp_781;
var TRow_3201 = TRow_782;
var TBot_3202 = TBot_783;
var TForall_3203 = TForall_784;
var equivBound_3204 = equivBound_799;
var equivType_3205 = equivType_800;
var getAnnCodeLoc_3206 = getAnnCodeLoc_795;
var AnnCodeLoc_3207 = AnnCodeLoc_754;
var printCodeLoc_3208 = printCodeLoc_797;
var exprLoc_3209 = exprLoc_798;
var setAnnCodeLoc_3210 = setAnnCodeLoc_796;
var copyAnn_3211 = copyAnn_792;
var emptyAnn_3212 = emptyAnn_789;
var ImportAll_3213 = ImportAll_788;
var ImportOpen_3214 = ImportOpen_787;
var ImportClosed_3215 = ImportClosed_786;
var Instance_3216 = Instance_776;
var Class_3217 = Class_775;
var ModuleInterface_3218 = ModuleInterface_772;
var Module_3219 = Module_771;
var PData_3220 = PData_770;
var PConst_3221 = PConst_769;
var PVar_3222 = PVar_768;
var CStr_3223 = CStr_767;
var CNum_3224 = CNum_766;
var AnnExport_3225 = AnnExport_758;
var AnnTag_3226 = AnnTag_757;
var AnnData_3227 = AnnData_756;
var AnnUseCount_3228 = AnnUseCount_755;
var getUid_3229 = getUid_1531;
var setUid_3230 = setUid_1532;
var getExports_3231 = getExports_1529;
var newIdent_3232 = function(n_3239){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_3128))(function(i_3240){
    return (($gt$gt_3156($import1$instance$Monad$11))(sets_3127(i_3240+1)))((ret($import1$instance$Monad$11))(($concat(($concat(n_3239))("_")))(intToString(i_3240))))
  })
};
var rewriteExpr_3233 = function(env_3241){
  return function(e_3242){
    var rename_3243 = function(n_3247){
      return newIdent_3232(n_3247)
    };
    var renamePat_3244 = function(p_3248){
      if(p_3248.$tag==1){
        var $phi$386 = (ret($import1$instance$Monad$11))((Pair_3076(p_3248))(empty))
      } else if(p_3248.$tag==0){
        var $phi$386 = (($gt$gt$eq($import1$instance$Monad$11))(rename_3243(p_3248.$1)))(function(n_3253){
          return (ret($import1$instance$Monad$11))((Pair_3076((PVar_3222(p_3248.$0))(n_3253)))(((set(p_3248.$1))(n_3253))(empty)))
        })
      } else if(p_3248.$tag==2){
        var $phi$386 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_3130($import1$instance$Monad$11))(renamePat_3244))(p_3248.$2)))(function(ps_3257){
          var $phi$388 = (has(p_3248.$1))(env_3241);
          if(!$phi$388){
            var $phi$387 = (ret($import1$instance$Monad$11))((Pair_3076(((PData_3220(p_3248.$0))(p_3248.$1))((map(fst_3090))(ps_3257))))(((foldl(merge))(empty))((map(snd_3080))(ps_3257))))
          } else if($phi$388){
            var $phi$387 = (ret($import1$instance$Monad$11))((Pair_3076(((PData_3220(p_3248.$0))((get(p_3248.$1))(env_3241)))((map(fst_3090))(ps_3257))))(((foldl(merge))(empty))((map(snd_3080))(ps_3257))))
          } else error("pattern match fail",$phi$388);
          return $phi$387
        })
      } else error("pattern match fail",p_3248);
      return $phi$386
    };
    var rewritePat_3245 = function(p_3258){
      var $phi$389 = (($gt$gt$eq($import1$instance$Monad$11))(renamePat_3244(p_3258.$0)))(function(pe_3261){
        var $phi$390 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_3233((merge(env_3241))(pe_3261.$1)))(p_3258.$1)))(function(e_3264){
          return (ret($import1$instance$Monad$11))((Pair_3076(pe_3261.$0))(e_3264))
        });
        return $phi$390
      });
      return $phi$389
    };
    var f_3246 = function(e_3265){
      if(e_3265.$tag==3){
        var $phi$391 = (($gt$gt$eq($import1$instance$Monad$11))(rename_3243(e_3265.$1)))(function(n_3269){
          return (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_3233(((set(e_3265.$1))(n_3269))(env_3241)))(e_3265.$2)))(function(e_3270){
            return (ret($import1$instance$Monad$11))(Right_3092(((Lam_3166(e_3265.$0))(n_3269))(e_3270)))
          })
        })
      } else if(e_3265.$tag==5){
        var $phi$391 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteBindings_3235(env_3241))(e_3265.$1)))(function(ebs_3274){
          var $phi$396 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_3233(ebs_3274.$0))(e_3265.$2)))(function(e_3277){
            return (ret($import1$instance$Monad$11))(Right_3092(((Let_3168(e_3265.$0))(ebs_3274.$1))(e_3277)))
          });
          return $phi$396
        })
      } else if(e_3265.$tag==4){
        var $phi$391 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_3233(env_3241))(e_3265.$1)))(function(e_3281){
          return (($gt$gt$eq($import1$instance$Monad$11))(((mapM_3130($import1$instance$Monad$11))(rewritePat_3245))(e_3265.$2)))(function(ps_3282){
            return (ret($import1$instance$Monad$11))(Right_3092(((Case_3167(e_3265.$0))(e_3281))(ps_3282)))
          })
        })
      } else if(e_3265.$tag==0){
        var $phi$395 = (has(e_3265.$1))(env_3241);
        if($phi$395){
          var $phi$394 = (ret($import1$instance$Monad$11))(Left_3091((Var_3184(e_3265.$0))((get(e_3265.$1))(env_3241))))
        } else if(!$phi$395){
          var $phi$394 = (ret($import1$instance$Monad$11))(Left_3091(e_3265))
        } else error("pattern match fail",$phi$395);
        var $phi$391 = $phi$394
      } else if(e_3265.$tag==6){
        var $phi$393 = (has(e_3265.$1))(env_3241);
        if($phi$393){
          var $phi$392 = (ret($import1$instance$Monad$11))(Left_3091(((New_3169(e_3265.$0))((get(e_3265.$1))(env_3241)))(e_3265.$2)))
        } else if(!$phi$393){
          var $phi$392 = (ret($import1$instance$Monad$11))(Left_3091(e_3265))
        } else error("pattern match fail",$phi$393);
        var $phi$391 = $phi$392
      } else var $phi$391 = (ret($import1$instance$Monad$11))(Left_3091(e_3265));
      return $phi$391
    };
    return ((breakableDownM_3171($import1$instance$Monad$11))(f_3246))(e_3242)
  }
};
var rewriteBindings_3235 = function(env_3300){
  return function(bs_3301){
    var ns_3302 = (map(fst_3090))(bs_3301);
    var ns2_3303 = ((mapM_3130($import1$instance$Monad$11))(newIdent_3232))(ns_3302);
    return (($gt$gt$eq($import1$instance$Monad$11))(ns2_3303))(function(ns_3304){
      var env2_3305 = (merge(env_3300))(toRecord_3133((zip_3143((map(fst_3090))(bs_3301)))(ns_3304)));
      var bs2_3306 = ((mapM_3130($import1$instance$Monad$11))(rewriteExpr_3233(env2_3305)))((map(snd_3080))(bs_3301));
      return (($gt$gt$eq($import1$instance$Monad$11))(bs2_3306))(function(bs_3307){
        return (ret($import1$instance$Monad$11))((Pair_3076(env2_3305))((zip_3143(ns_3304))(bs_3307)))
      })
    })
  }
};
var rewriteInstance_3234 = function(env_3289){
  return function(i_3290){
    var $phi$397 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_3130($import1$instance$Monad$11))(function(d_3295){
      var $phi$398 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_3233(env_3289))(d_3295.$1)))(function(e_3298){
        return (ret($import1$instance$Monad$11))((Pair_3076(d_3295.$0))(e_3298))
      });
      return $phi$398
    }))(i_3290.$3)))(function(bs_3299){
      return (ret($import1$instance$Monad$11))((((Instance_3216(i_3290.$0))(i_3290.$1))(i_3290.$2))(bs_3299))
    });
    return $phi$397
  }
};
var renameImport_3236 = function(er_3308){
  return function(i_3309){
    if((i_3309.$tag==1)&&("./builtins.js"==i_3309.$1)){
      var $phi$400 = (ret($import1$instance$Monad$11))((Pair_3076(er_3308.$0))((push(i_3309))(er_3308.$1)))
    } else if(i_3309.$tag==1){
      var rename_3317 = function(er_3318){
        return function(p_3319){
          var $phi$402 = (($gt$gt$eq($import1$instance$Monad$11))(newIdent_3232(p_3319.$1)))(function(n_3324){
            return (ret($import1$instance$Monad$11))((Pair_3076(((set(p_3319.$1))(n_3324))(er_3318.$0)))((push((Pair_3076(p_3319.$0))(n_3324)))(er_3318.$1)))
          });
          var $phi$401 = $phi$402;
          return $phi$401
        }
      };
      var $phi$400 = (($gt$gt$eq($import1$instance$Monad$11))((((foldM_3129($import1$instance$Monad$11))(rename_3317))((Pair_3076(er_3308.$0))([])))(i_3309.$2)))(function(ens_3325){
        var $phi$403 = (ret($import1$instance$Monad$11))((Pair_3076(ens_3325.$0))((push(((ImportOpen_3214(i_3309.$0))(i_3309.$1))(ens_3325.$1)))(er_3308.$1)));
        return $phi$403
      })
    } else error("pattern match fail",i_3309);
    var $phi$399 = $phi$400;
    return $phi$399
  }
};
var rewriteModule_3237 = function(ms_3328){
  return function(m_3329){
    var $phi$404 = (($gt$gt$eq($import1$instance$Monad$11))((((foldM_3129($import1$instance$Monad$11))(renameImport_3236))((Pair_3076(empty))([])))(m_3329.$2)))(function(eis_3337){
      var $phi$405 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteBindings_3235(eis_3337.$0))(m_3329.$6)))(function(ebs_3340){
        var $phi$406 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_3130($import1$instance$Monad$11))(rewriteInstance_3234(ebs_3340.$0)))(m_3329.$5)))(function(ins_3343){
          return (ret($import1$instance$Monad$11))(((((((Module_3219(m_3329.$0))(m_3329.$1))(eis_3337.$1))(m_3329.$3))(m_3329.$4))(ins_3343))(ebs_3340.$1))
        });
        return $phi$406
      });
      return $phi$405
    });
    return $phi$404
  }
};
var uniquify_3238 = function(m_3344){
  return (($gt$gt$eq($import1$instance$Monad$11))(getUid_3229))(function(uid_3345){
    return (($gt$gt$eq($import1$instance$Monad$11))(getExports_3231))(function(ex_3346){
      var r_3347 = (runState_3125(uid_3345))((rewriteModule_3237(ex_3346))(m_3344));
      return (($gt$gt_3156($import1$instance$Monad$11))(setUid_3230(fst_3090(r_3347))))((ret($import1$instance$Monad$11))(snd_3080(r_3347)))
    })
  })
};
var assert_3348 = assert_89;
var Pair_3349 = Pair_3;
var mapSnd_3350 = mapSnd_88;
var mapFst_3351 = mapFst_87;
var $gt$eq$gt_3352 = $gt$eq$gt_86;
var snd_3353 = snd_27;
var debug2_3354 = debug2_85;
var Just_3355 = Just_1;
var Nothing_3356 = Nothing_2;
var isJust_3357 = isJust_25;
var Empty_3358 = Empty_11;
var Leaf_3359 = Leaf_12;
var Collision_3360 = Collision_13;
var BitmapIndexed_3361 = BitmapIndexed_14;
var $_3362 = $_16;
var fst_3363 = fst_26;
var Left_3364 = Left_8;
var Right_3365 = Right_9;
var loop_3366 = loop_31;
var find_3367 = find_33;
var hamtMask_3368 = hamtMask_62;
var popCount_3369 = popCount_61;
var hamtIndex_3370 = hamtIndex_63;
var lookup_3371 = lookup_64;
var setContains_3372 = setContains_80;
var foldTrie_3373 = foldTrie_70;
var emptySet_3374 = emptySet_76;
var Unit_3375 = Unit_0;
var not_3376 = not_30;
var $div$eq_3377 = $div$eq_17;
var mapIx_3378 = mapIx_34;
var insert_3379 = insert_65;
var setAdd_3380 = setAdd_77;
var setIntersection_3381 = setIntersection_84;
var remove_3382 = remove_67;
var setDiff_3383 = setDiff_83;
var setToArray_3384 = setToArray_82;
var mergeTrie_3385 = mergeTrie_74;
var setUnion_3386 = setUnion_81;
var setRemove_3387 = setRemove_79;
var setAddAll_3388 = setAddAll_78;
var trieKeys_3389 = trieKeys_75;
var size_3390 = size_72;
var mapTrie_3391 = mapTrie_71;
var nodeMask_3392 = nodeMask_60;
var isEmpty_3393 = isEmpty_73;
var filterTrie_3394 = filterTrie_69;
var nextSetBitMask_3395 = nextSetBitMask_68;
var updateOrSet_3396 = updateOrSet_66;
var State_3397 = State_10;
var runState_3398 = runState_58;
var evalState_3399 = evalState_59;
var sets_3400 = sets_57;
var gets_3401 = gets_56;
var foldM_3402 = foldM_53;
var mapM_3403 = mapM_54;
var forM_3404 = forM_55;
var strToArray_3405 = strToArray_52;
var toRecord_3406 = toRecord_51;
var reverse_3407 = reverse_50;
var tail_3408 = tail_45;
var head_3409 = head_44;
var uniq_3410 = uniq_49;
var mergeSet_3411 = mergeSet_48;
var init_3412 = init_47;
var last_3413 = last_46;
var mapJust_3414 = mapJust_43;
var concatMap_3415 = concatMap_42;
var zip_3416 = zip_41;
var zipWithIndex2_3417 = zipWithIndex2_39;
var zipWithIndex_3418 = zipWithIndex_40;
var join_3419 = join_38;
var all_3420 = all_37;
var exists_3421 = exists_36;
var containsChar_3422 = containsChar_35;
var contains_3423 = contains_32;
var either_3424 = either_28;
var splitEither_3425 = splitEither_29;
var fromJust_3426 = fromJust_24;
var justOr_3427 = justOr_23;
var maybe_3428 = maybe_22;
var $gt$gt_3429 = $gt$gt_21;
var $gt$eq_3430 = $gt$eq_20;
var $lt$eq_3431 = $lt$eq_19;
var $gt_3432 = $gt_18;
var Identity_3433 = Identity_15;
var Tuple6_3434 = Tuple6_7;
var Tuple5_3435 = Tuple5_6;
var Tuple4_3436 = Tuple4_5;
var Tuple3_3437 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_3438 = App_761;
var Lam_3439 = Lam_762;
var Case_3440 = Case_763;
var Let_3441 = Let_764;
var New_3442 = New_765;
var breakableDownAndUpM_3443 = breakableDownAndUpM_812;
var breakableDownM_3444 = breakableDownM_816;
var downAndUpM_3445 = downAndUpM_813;
var downM_3446 = downM_815;
var upM_3447 = upM_814;
var breakableDownAndUp_3448 = breakableDownAndUp_807;
var breakableDown_3449 = breakableDown_811;
var downAndUp_3450 = downAndUp_808;
var down_3451 = down_810;
var up_3452 = up_809;
var AnnType_3453 = AnnType_753;
var TUnknown_3454 = TUnknown_785;
var getAnn_3455 = getAnn_790;
var getAnnType_3456 = getAnnType_793;
var Var_3457 = Var_759;
var Const_3458 = Const_760;
var annOf_3459 = annOf_804;
var getType_3460 = getType_806;
var withAnn_3461 = withAnn_805;
var setAnn_3462 = setAnn_791;
var setAnnType_3463 = setAnnType_794;
var setType_3464 = setType_803;
var Data_3465 = Data_773;
var DataCon_3466 = DataCon_774;
var dataConName_3467 = dataConName_801;
var dataConNames_3468 = dataConNames_802;
var TCBound_3469 = TCBound_777;
var TConst_3470 = TConst_778;
var TVar_3471 = TVar_779;
var TSkolem_3472 = TSkolem_780;
var TApp_3473 = TApp_781;
var TRow_3474 = TRow_782;
var TBot_3475 = TBot_783;
var TForall_3476 = TForall_784;
var equivBound_3477 = equivBound_799;
var equivType_3478 = equivType_800;
var getAnnCodeLoc_3479 = getAnnCodeLoc_795;
var AnnCodeLoc_3480 = AnnCodeLoc_754;
var printCodeLoc_3481 = printCodeLoc_797;
var exprLoc_3482 = exprLoc_798;
var setAnnCodeLoc_3483 = setAnnCodeLoc_796;
var copyAnn_3484 = copyAnn_792;
var emptyAnn_3485 = emptyAnn_789;
var ImportAll_3486 = ImportAll_788;
var ImportOpen_3487 = ImportOpen_787;
var ImportClosed_3488 = ImportClosed_786;
var Instance_3489 = Instance_776;
var Class_3490 = Class_775;
var ModuleInterface_3491 = ModuleInterface_772;
var Module_3492 = Module_771;
var PData_3493 = PData_770;
var PConst_3494 = PConst_769;
var PVar_3495 = PVar_768;
var CStr_3496 = CStr_767;
var CNum_3497 = CNum_766;
var AnnExport_3498 = AnnExport_758;
var AnnTag_3499 = AnnTag_757;
var AnnData_3500 = AnnData_756;
var AnnUseCount_3501 = AnnUseCount_755;
var reallyPrintExpr_3502 = reallyPrintExpr_1747;
var renameExpr_3503 = rewriteExpr_3233;
var getUid_3504 = getUid_1531;
var setUid_3505 = setUid_1532;
var mergeCount_3508 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_3543){
      return function(b_3544){
        return ((foldTrie_3373(function(a_3545){
          return function(k_3546){
            return function(v_3547){
              return ((((insert_3379(local$instance$Hashable$1))(local$instance$Eq$0))(k_3546))(v_3547+((justOr_3427(0))((((lookup_3371(local$instance$Hashable$1))(local$instance$Eq$0))(k_3546))(a_3545)))))(a_3545)
            }
          }
        }))(a_3543))(b_3544)
      }
    }
  }
};
var getCount_3507 = function(e_3541){
  var $phi$408 = (((getAnn_3455($import1$instance$Hashable$13))($import1$instance$Eq$1))("useCount"))(annOf_3459(e_3541));
  if(($phi$408.$tag==0)&&($phi$408.$0.$tag==2)){
    var $phi$407 = $phi$408.$0.$0
  } else error("pattern match fail",$phi$408);
  return $phi$407
};
var annWithUseCount_3509 = function(e_3548){
  var dropCount_3549 = function(local$instance$Hashable$1){
    return function(local$instance$Eq$0){
      return function(n_3553){
        return function(c_3554){
          return (((remove_3382(local$instance$Hashable$1))(local$instance$Eq$0))(n_3553))(c_3554)
        }
      }
    }
  };
  var countPat_3551 = function(c_3558){
    return function(p_3559){
      if(p_3559.$tag==0){
        var $phi$409 = (((dropCount_3549($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_3559.$1))(c_3558)
      } else if(p_3559.$tag==2){
        var $phi$409 = ((foldl(countPat_3551))(c_3558))(p_3559.$2)
      } else var $phi$409 = c_3558;
      return $phi$409
    }
  };
  var countCase_3550 = function(pe_3555){
    var $phi$410 = (countPat_3551(getCount_3507(pe_3555.$1)))(pe_3555.$0);
    return $phi$410
  };
  var countExpr_3552 = function(e_3566){
    if(e_3566.$tag==0){
      var $phi$411 = ((((insert_3379($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_3566.$1))(1))(Empty_3358)
    } else if(e_3566.$tag==2){
      var $phi$411 = (((mergeCount_3508($import1$instance$Hashable$13))($import1$instance$Eq$1))(getCount_3507(e_3566.$1)))(getCount_3507(e_3566.$2))
    } else if(e_3566.$tag==3){
      var $phi$411 = (((dropCount_3549($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_3566.$1))(getCount_3507(e_3566.$2))
    } else if(e_3566.$tag==5){
      var $phi$411 = ((foldl(function(c_3578){
        return function(n_3579){
          return (((dropCount_3549($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_3579))(c_3578)
        }
      }))(((foldl(function(c_3580){
        return function(e_3581){
          return (((mergeCount_3508($import1$instance$Hashable$13))($import1$instance$Eq$1))(c_3580))(getCount_3507(e_3581))
        }
      }))(getCount_3507(e_3566.$2)))((map(snd_3353))(e_3566.$1))))((map(fst_3363))(e_3566.$1))
    } else if(e_3566.$tag==4){
      var $phi$411 = ((foldl((mergeCount_3508($import1$instance$Hashable$13))($import1$instance$Eq$1)))(getCount_3507(e_3566.$1)))((map(countCase_3550))(e_3566.$2))
    } else if(e_3566.$tag==1){
      var $phi$411 = Empty_3358
    } else if(e_3566.$tag==6){
      var $phi$411 = ((foldl((mergeCount_3508($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_3358))((map(getCount_3507))(e_3566.$2))
    } else error("pattern match fail",e_3566);
    return $phi$411
  };
  return ((up_3452(function(a_3590){
    return function(e_3591){
      return ($_3362(Pair_3349(a_3590)))((withAnn_3461(((((setAnn_3462($import1$instance$Hashable$13))($import1$instance$Eq$1))("useCount"))(($_3362(AnnUseCount_3501))(countExpr_3552(e_3591))))(annOf_3459(e_3591))))(e_3591))
    }
  }))(Unit_3375))(e_3548)
};
var patSize_3517 = function(p_3659){
  if(p_3659.$tag==0){
    var $phi$412 = 1
  } else if(p_3659.$tag==1){
    var $phi$412 = 1
  } else if(p_3659.$tag==2){
    var $phi$412 = ((foldl(function(c_3667){
      return function(p_3668){
        return c_3667+(patSize_3517(p_3668))
      }
    }))(1))(p_3659.$2)
  } else error("pattern match fail",p_3659);
  return $phi$412
};
var exprSize_3516 = function(e_3631){
  if(e_3631.$tag==0){
    var $phi$413 = 1
  } else if(e_3631.$tag==1){
    var $phi$413 = 1
  } else if(e_3631.$tag==2){
    var $phi$413 = (1+(exprSize_3516(e_3631.$1)))+(exprSize_3516(e_3631.$2))
  } else if(e_3631.$tag==3){
    var $phi$413 = 1+(exprSize_3516(e_3631.$2))
  } else if(e_3631.$tag==4){
    var $phi$413 = 1+(((foldl(function(c_3645){
      return function(p_3646){
        var $phi$414 = (c_3645+(patSize_3517(p_3646.$0)))+(exprSize_3516(p_3646.$1));
        return $phi$414
      }
    }))(exprSize_3516(e_3631.$1)))(e_3631.$2))
  } else if(e_3631.$tag==5){
    var $phi$413 = 1+(((foldl(function(c_3652){
      return function(b_3653){
        return c_3652+(exprSize_3516(snd_3353(b_3653)))
      }
    }))(exprSize_3516(e_3631.$2)))(e_3631.$1))
  } else if(e_3631.$tag==6){
    var $phi$413 = ((foldl(function(c_3657){
      return function(e_3658){
        return c_3657+(exprSize_3516(e_3658))
      }
    }))(1))(e_3631.$2)
  } else error("pattern match fail",e_3631);
  return $phi$413
};
var chooseForInlining_3518 = function(baseCount_3669){
  return function(bs_3670){
    var useCount_3671 = ((foldl((mergeCount_3508($import1$instance$Hashable$13))($import1$instance$Eq$1)))(baseCount_3669))((map(function(b_3673){
      return getCount_3507(snd_3353(b_3673))
    }))(bs_3670));
    var f_3672 = function(r_3674){
      return function(b_3675){
        if(b_3675.$1.$tag==0){
          var $phi$416 = ((((insert_3379($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3675.$0))(b_3675.$1))(r_3674)
        } else if(b_3675.$1.$tag==1){
          var $phi$416 = ((((insert_3379($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3675.$0))(b_3675.$1))(r_3674)
        } else if(b_3675.$1.$tag==3){
          var $phi$420 = ($or((($lt($import1$instance$Ord$2))(exprSize_3516(b_3675.$1)))(10)))((($eq$eq($import1$instance$Eq$0))(1))((justOr_3427(0))((((lookup_3371($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3675.$0))(useCount_3671))));
          if(!$phi$420){
            var $phi$419 = r_3674
          } else if($phi$420){
            var $phi$419 = ((((insert_3379($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3675.$0))(b_3675.$1))(r_3674)
          } else error("pattern match fail",$phi$420);
          var $phi$416 = $phi$419
        } else if(b_3675.$1.$tag==6){
          var $phi$418 = (($eq$eq($import1$instance$Eq$0))(1))((justOr_3427(0))((((lookup_3371($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3675.$0))(useCount_3671)));
          if(!$phi$418){
            var $phi$417 = r_3674
          } else if($phi$418){
            var $phi$417 = ((((insert_3379($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3675.$0))(b_3675.$1))(r_3674)
          } else error("pattern match fail",$phi$418);
          var $phi$416 = $phi$417
        } else var $phi$416 = r_3674;
        var $phi$415 = $phi$416;
        return $phi$415
      }
    };
    return ((foldl(f_3672))(Empty_3358))(bs_3670)
  }
};
var mapBindingsM_3511 = function(local$instance$Monad$0){
  return function(f_3597){
    return function(bs_3598){
      return ((mapM_3403(local$instance$Monad$0))(function(b_3599){
        var $phi$421 = (($gt$gt$eq(local$instance$Monad$0))((f_3597(b_3599.$0))(b_3599.$1)))(function(e_3602){
          return (ret(local$instance$Monad$0))((Pair_3349(b_3599.$0))(e_3602))
        });
        return $phi$421
      }))(bs_3598)
    }
  }
};
var inlineCode_3520 = function(always_3703){
  return function(e_3704){
    var withAnnCopy_3705 = function(ann_3708){
      return function(e_3709){
        return (withAnn_3461((((mergeTrie_3385($import1$instance$Hashable$13))($import1$instance$Eq$1))((((remove_3382($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_3459(e_3709))))((((copyAnn_3484($import1$instance$Hashable$13))($import1$instance$Eq$1))(["export"]))(ann_3708))))(e_3709)
      }
    };
    var inlinePat_3707 = function(p_3731){
      if(p_3731.$tag==2){
        var $phi$424 = (((lookup_3371($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_3731.$1))(always_3703);
        if(($phi$424.$tag==0)&&($phi$424.$0.$tag==0)){
          var $phi$423 = ((PData_3493(p_3731.$0))($phi$424.$0.$1))((map(inlinePat_3707))(p_3731.$2))
        } else var $phi$423 = ((PData_3493(p_3731.$0))(p_3731.$1))((map(inlinePat_3707))(p_3731.$2));
        var $phi$422 = $phi$423
      } else var $phi$422 = p_3731;
      return $phi$422
    };
    var inlineExpr_3706 = function(e_3710){
      if(e_3710.$tag==0){
        var $phi$430 = (((lookup_3371($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_3710.$1))(always_3703);
        if($phi$430.$tag==1){
          var $phi$429 = (ret($import1$instance$Monad$11))(Left_3364(e_3710))
        } else if($phi$430.$tag==0){
          var $phi$429 = ((fmap($import1$instance$Functor$9))(function(e_3714){
            return Left_3364((withAnnCopy_3705(e_3710.$0))(e_3714))
          }))((renameExpr_3503(empty))($phi$430.$0))
        } else error("pattern match fail",$phi$430);
        var $phi$425 = $phi$429
      } else if(e_3710.$tag==5){
        var always2_3718 = (((mergeTrie_3385($import1$instance$Hashable$13))($import1$instance$Eq$1))(always_3703))((chooseForInlining_3518(getCount_3507(e_3710.$2)))(e_3710.$1));
        var $phi$425 = (($gt$gt$eq($import1$instance$Monad$11))(((mapBindingsM_3511($import1$instance$Monad$11))(function(n_3719){
          return function(e_3720){
            return (inlineCode_3520((((remove_3382($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_3719))(always2_3718)))(e_3720)
          }
        }))(e_3710.$1)))(function(bs_3721){
          return (($gt$gt$eq($import1$instance$Monad$11))((inlineCode_3520(always2_3718))(e_3710.$2)))(function(e_3722){
            var $phi$428 = length(bs_3721);
            if(0==$phi$428){
              var $phi$427 = (ret($import1$instance$Monad$11))(Right_3365((withAnnCopy_3705(e_3710.$0))(e_3722)))
            } else var $phi$427 = (ret($import1$instance$Monad$11))(Right_3365(((Let_3441(e_3710.$0))(bs_3721))(e_3722)));
            return $phi$427
          })
        })
      } else if(e_3710.$tag==4){
        var $phi$425 = (ret($import1$instance$Monad$11))(Left_3364(((Case_3440(e_3710.$0))(e_3710.$1))((map(function(p_3727){
          var $phi$426 = (Pair_3349(inlinePat_3707(p_3727.$0)))(p_3727.$1);
          return $phi$426
        }))(e_3710.$2))))
      } else var $phi$425 = (ret($import1$instance$Monad$11))(Left_3364(e_3710));
      return $phi$425
    };
    return ((breakableDownM_3444($import1$instance$Monad$11))(inlineExpr_3706))(e_3704)
  }
};
var dropDeadBindings_3521 = function(useCount_3739){
  return function(bs_3740){
    var isExport_3741 = function(e_3743){
      return isJust_3357((((getAnn_3455($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_3459(e_3743)))
    };
    var f_3742 = function(b_3744){
      var totalCount_3747 = (justOr_3427(0))((((lookup_3371($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3744.$0))(useCount_3739));
      var recursiveCount_3748 = (justOr_3427(0))((((lookup_3371($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3744.$0))(getCount_3507(b_3744.$1)));
      var keep_3749 = ($or(isExport_3741(b_3744.$1)))((($gt_3432($import1$instance$Ord$2))(totalCount_3747-recursiveCount_3748))(0));
      if(keep_3749){
        var $phi$432 = Just_3355((Pair_3349(b_3744.$0))(b_3744.$1))
      } else if(!keep_3749){
        var ann_3750 = annOf_3459(b_3744.$1);
        var $phi$434 = (((getAnn_3455($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(ann_3750);
        if($phi$434.$tag==1){
          var $phi$433 = Nothing_3356
        } else if($phi$434.$tag==0){
          var $phi$433 = Just_3355((Pair_3349(b_3744.$0))((withAnn_3461(((((setAnn_3462($import1$instance$Hashable$13))($import1$instance$Eq$1))("dead"))(AnnTag_3499))(ann_3750)))(b_3744.$1)))
        } else error("pattern match fail",$phi$434);
        var $phi$432 = $phi$433
      } else error("pattern match fail",keep_3749);
      var $phi$431 = $phi$432;
      return $phi$431
    };
    return (mapJust_3414(f_3742))(bs_3740)
  }
};
var deadCode_3515 = function(e_3619){
  var f_3620 = function(e_3621){
    if(e_3621.$tag==5){
      var useCount_3625 = ((foldl((mergeCount_3508($import1$instance$Hashable$13))($import1$instance$Eq$1)))(getCount_3507(e_3621.$2)))((map(function(b_3627){
        return getCount_3507(snd_3353(b_3627))
      }))(e_3621.$1));
      var bs2_3626 = (dropDeadBindings_3521(useCount_3625))(e_3621.$1);
      var $phi$435 = ((Let_3441(e_3621.$0))(bs2_3626))(e_3621.$2)
    } else var $phi$435 = e_3621;
    return $phi$435
  };
  return snd_3353(((down_3451(function(a_3629){
    return function(e_3630){
      return (Pair_3349(a_3629))(f_3620(e_3630))
    }
  }))(Unit_3375))(e_3619))
};
var betaReduction_3519 = function(e_3689){
  var f_3690 = function(e_3691){
    if((e_3691.$tag==2)&&(e_3691.$1.$tag==3)){
      if(e_3691.$2.$tag==0){
        var $phi$439 = (($eq$eq($import1$instance$Eq$1))(e_3691.$1.$1))(e_3691.$2.$1);
        if($phi$439){
          var $phi$438 = e_3691.$1.$2
        } else if(!$phi$439){
          var $phi$438 = ((Let_3441(e_3691.$0))([(Pair_3349(e_3691.$1.$1))((Var_3457(e_3691.$2.$0))(e_3691.$2.$1))]))(e_3691.$1.$2)
        } else error("pattern match fail",$phi$439);
        var $phi$437 = $phi$438
      } else var $phi$437 = ((Let_3441(e_3691.$0))([(Pair_3349(e_3691.$1.$1))(e_3691.$2)]))(e_3691.$1.$2);
      var $phi$436 = $phi$437
    } else var $phi$436 = e_3691;
    return $phi$436
  };
  return snd_3353(((down_3451(function(a_3701){
    return function(e_3702){
      return (Pair_3349(a_3701))(f_3690(e_3702))
    }
  }))(Unit_3375))(e_3689))
};
var mapBindings_3510 = function(f_3592){
  return function(bs_3593){
    return (map(function(b_3594){
      var $phi$440 = (Pair_3349(b_3594.$0))(f_3592(b_3594.$1));
      return $phi$440
    }))(bs_3593)
  }
};
var pass_3513 = function(bs_3607){
  var bs2_3608 = (mapBindings_3510(function(e_3612){
    return ($_3362(snd_3353))(annWithUseCount_3509(e_3612))
  }))(bs_3607);
  var useCount_3609 = ((foldl((mergeCount_3508($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_3358))((map(function(b_3613){
    return getCount_3507(snd_3353(b_3613))
  }))(bs2_3608));
  var bs3_3610 = (mapBindings_3510(deadCode_3515))((dropDeadBindings_3521(useCount_3609))(bs2_3608));
  var always_3611 = (chooseForInlining_3518(Empty_3358))(bs3_3610);
  return (($gt$gt$eq($import1$instance$Monad$11))(((mapBindingsM_3511($import1$instance$Monad$11))(function(n_3614){
    return function(e_3615){
      return (inlineCode_3520((((remove_3382($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_3614))(always_3611)))(e_3615)
    }
  }))(bs3_3610)))(function(bs_3616){
    return (ret($import1$instance$Monad$11))((mapBindings_3510(betaReduction_3519))(bs_3616))
  })
};
var processImports_3514 = function(useCount_3617){
  return function(is_3618){
    return is_3618
  }
};
var loopPasses_3512 = function(local$instance$Monad$0){
  return function(n_3603){
    return function(p_3604){
      return function(bs_3605){
        if(0==n_3603){
          var $phi$441 = (ret(local$instance$Monad$0))(bs_3605)
        } else var $phi$441 = (($gt$gt$eq(local$instance$Monad$0))(p_3604(bs_3605)))(((loopPasses_3512(local$instance$Monad$0))(n_3603-1))(p_3604));
        return $phi$441
      }
    }
  }
};
var inline_3506 = function(enable_3522){
  return function(m_3523){
    return (($gt$gt$eq($import1$instance$Monad$11))(getUid_3504))(function(uid_3524){
      if(enable_3522){
        var $phi$443 = 10
      } else if(!enable_3522){
        var $phi$443 = 0
      } else error("pattern match fail",enable_3522);
      var iterCount_3532 = $phi$443;
      var r_3533 = (runState_3398(uid_3524))((((loopPasses_3512($import1$instance$Monad$11))(iterCount_3532))(pass_3513))(m_3523.$6));
      var bs2_3534 = snd_3353(r_3533);
      var bs3_3536 = (mapBindings_3510(function(e_3539){
        return ($_3362(snd_3353))(annWithUseCount_3509(e_3539))
      }))(bs2_3534);
      var useCount_3537 = ((foldl((mergeCount_3508($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_3358))((map(function(b_3540){
        return getCount_3507(snd_3353(b_3540))
      }))(bs3_3536));
      var is2_3538 = (processImports_3514(useCount_3537))(m_3523.$2);
      var uid2_3535 = fst_3363(r_3533);
      var $phi$442 = (($gt$gt_3429($import1$instance$Monad$11))(setUid_3505(uid2_3535)))((ret($import1$instance$Monad$11))(((((((Module_3492(m_3523.$0))(m_3523.$1))(is2_3538))(m_3523.$3))(m_3523.$4))(m_3523.$5))(bs3_3536)));
      return $phi$442
    })
  }
};
var assert_3752 = assert_89;
var Pair_3753 = Pair_3;
var mapSnd_3754 = mapSnd_88;
var mapFst_3755 = mapFst_87;
var $gt$eq$gt_3756 = $gt$eq$gt_86;
var snd_3757 = snd_27;
var debug2_3758 = debug2_85;
var Just_3759 = Just_1;
var Nothing_3760 = Nothing_2;
var isJust_3761 = isJust_25;
var Empty_3762 = Empty_11;
var Leaf_3763 = Leaf_12;
var Collision_3764 = Collision_13;
var BitmapIndexed_3765 = BitmapIndexed_14;
var $_3766 = $_16;
var fst_3767 = fst_26;
var Left_3768 = Left_8;
var Right_3769 = Right_9;
var loop_3770 = loop_31;
var find_3771 = find_33;
var hamtMask_3772 = hamtMask_62;
var popCount_3773 = popCount_61;
var hamtIndex_3774 = hamtIndex_63;
var lookup_3775 = lookup_64;
var setContains_3776 = setContains_80;
var foldTrie_3777 = foldTrie_70;
var emptySet_3778 = emptySet_76;
var Unit_3779 = Unit_0;
var not_3780 = not_30;
var $div$eq_3781 = $div$eq_17;
var mapIx_3782 = mapIx_34;
var insert_3783 = insert_65;
var setAdd_3784 = setAdd_77;
var setIntersection_3785 = setIntersection_84;
var remove_3786 = remove_67;
var setDiff_3787 = setDiff_83;
var setToArray_3788 = setToArray_82;
var mergeTrie_3789 = mergeTrie_74;
var setUnion_3790 = setUnion_81;
var setRemove_3791 = setRemove_79;
var setAddAll_3792 = setAddAll_78;
var trieKeys_3793 = trieKeys_75;
var size_3794 = size_72;
var mapTrie_3795 = mapTrie_71;
var nodeMask_3796 = nodeMask_60;
var isEmpty_3797 = isEmpty_73;
var filterTrie_3798 = filterTrie_69;
var nextSetBitMask_3799 = nextSetBitMask_68;
var updateOrSet_3800 = updateOrSet_66;
var State_3801 = State_10;
var runState_3802 = runState_58;
var evalState_3803 = evalState_59;
var sets_3804 = sets_57;
var gets_3805 = gets_56;
var foldM_3806 = foldM_53;
var mapM_3807 = mapM_54;
var forM_3808 = forM_55;
var strToArray_3809 = strToArray_52;
var toRecord_3810 = toRecord_51;
var reverse_3811 = reverse_50;
var tail_3812 = tail_45;
var head_3813 = head_44;
var uniq_3814 = uniq_49;
var mergeSet_3815 = mergeSet_48;
var init_3816 = init_47;
var last_3817 = last_46;
var mapJust_3818 = mapJust_43;
var concatMap_3819 = concatMap_42;
var zip_3820 = zip_41;
var zipWithIndex2_3821 = zipWithIndex2_39;
var zipWithIndex_3822 = zipWithIndex_40;
var join_3823 = join_38;
var all_3824 = all_37;
var exists_3825 = exists_36;
var containsChar_3826 = containsChar_35;
var contains_3827 = contains_32;
var either_3828 = either_28;
var splitEither_3829 = splitEither_29;
var fromJust_3830 = fromJust_24;
var justOr_3831 = justOr_23;
var maybe_3832 = maybe_22;
var $gt$gt_3833 = $gt$gt_21;
var $gt$eq_3834 = $gt$eq_20;
var $lt$eq_3835 = $lt$eq_19;
var $gt_3836 = $gt_18;
var Identity_3837 = Identity_15;
var Tuple6_3838 = Tuple6_7;
var Tuple5_3839 = Tuple5_6;
var Tuple4_3840 = Tuple4_5;
var Tuple3_3841 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_3842 = App_761;
var Lam_3843 = Lam_762;
var Case_3844 = Case_763;
var Let_3845 = Let_764;
var New_3846 = New_765;
var breakableDownAndUpM_3847 = breakableDownAndUpM_812;
var breakableDownM_3848 = breakableDownM_816;
var downAndUpM_3849 = downAndUpM_813;
var downM_3850 = downM_815;
var upM_3851 = upM_814;
var breakableDownAndUp_3852 = breakableDownAndUp_807;
var breakableDown_3853 = breakableDown_811;
var downAndUp_3854 = downAndUp_808;
var down_3855 = down_810;
var up_3856 = up_809;
var AnnType_3857 = AnnType_753;
var TUnknown_3858 = TUnknown_785;
var getAnn_3859 = getAnn_790;
var getAnnType_3860 = getAnnType_793;
var Var_3861 = Var_759;
var Const_3862 = Const_760;
var annOf_3863 = annOf_804;
var getType_3864 = getType_806;
var withAnn_3865 = withAnn_805;
var setAnn_3866 = setAnn_791;
var setAnnType_3867 = setAnnType_794;
var setType_3868 = setType_803;
var Data_3869 = Data_773;
var DataCon_3870 = DataCon_774;
var dataConName_3871 = dataConName_801;
var dataConNames_3872 = dataConNames_802;
var TCBound_3873 = TCBound_777;
var TConst_3874 = TConst_778;
var TVar_3875 = TVar_779;
var TSkolem_3876 = TSkolem_780;
var TApp_3877 = TApp_781;
var TRow_3878 = TRow_782;
var TBot_3879 = TBot_783;
var TForall_3880 = TForall_784;
var equivBound_3881 = equivBound_799;
var equivType_3882 = equivType_800;
var getAnnCodeLoc_3883 = getAnnCodeLoc_795;
var AnnCodeLoc_3884 = AnnCodeLoc_754;
var printCodeLoc_3885 = printCodeLoc_797;
var exprLoc_3886 = exprLoc_798;
var setAnnCodeLoc_3887 = setAnnCodeLoc_796;
var copyAnn_3888 = copyAnn_792;
var emptyAnn_3889 = emptyAnn_789;
var ImportAll_3890 = ImportAll_788;
var ImportOpen_3891 = ImportOpen_787;
var ImportClosed_3892 = ImportClosed_786;
var Instance_3893 = Instance_776;
var Class_3894 = Class_775;
var ModuleInterface_3895 = ModuleInterface_772;
var Module_3896 = Module_771;
var PData_3897 = PData_770;
var PConst_3898 = PConst_769;
var PVar_3899 = PVar_768;
var CStr_3900 = CStr_767;
var CNum_3901 = CNum_766;
var AnnExport_3902 = AnnExport_758;
var AnnTag_3903 = AnnTag_757;
var AnnData_3904 = AnnData_756;
var AnnUseCount_3905 = AnnUseCount_755;
var newIdent_3906 = newIdent_3232;
var rewriteExpr_3907 = rewriteExpr_3233;
var importAsBindings_3911 = function(ens_3944){
  return function(dataAnns_3945){
    return function(i_3946){
      if((i_3946.$tag==1)&&("./builtins.js"==i_3946.$1)){
        var $phi$444 = []
      } else if(i_3946.$tag==1){
        var f_3952 = function(p_3953){
          var $phi$447 = (((lookup_3775($import1$instance$Hashable$13))($import1$instance$Eq$1))(($concat(($concat(i_3946.$1))("#")))(p_3953.$0)))(ens_3944);
          if($phi$447.$tag==0){
            var $phi$446 = (Pair_3753(p_3953.$1))((Var_3861(($_3766(justOr_3831(emptyAnn_3889)))((((lookup_3775($import1$instance$Hashable$13))($import1$instance$Eq$1))($phi$447.$0))(dataAnns_3945))))($phi$447.$0))
          } else if($phi$447.$tag==1){
            var $phi$446 = error(($concat(($concat(($concat("mod merger encountered unknown import "))(i_3946.$1)))("#")))(p_3953.$0))
          } else error("pattern match fail",$phi$447);
          var $phi$445 = $phi$446;
          return $phi$445
        };
        var $phi$444 = (map(f_3952))((filter(function(p_3957){
          return (($div$eq_3781($import1$instance$Eq$1))(fst_3767(p_3957)))(snd_3757(p_3957))
        }))(i_3946.$2))
      } else error("pattern match fail",i_3946);
      return $phi$444
    }
  }
};
var dropExport_3909 = function(f_3913){
  return function(b_3914){
    var $phi$450 = (((getAnn_3859($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_3863(b_3914.$1));
    if($phi$450.$tag==1){
      var $phi$449 = (ret($import1$instance$Monad$11))(b_3914)
    } else if(($phi$450.$tag==0)&&($phi$450.$0.$tag==5)){
      var $phi$449 = (($gt$gt$eq($import1$instance$Monad$11))(gets_3805))(function(ns_3918){
        return (($gt$gt_3833($import1$instance$Monad$11))(sets_3804(((((insert_3783($import1$instance$Hashable$13))($import1$instance$Eq$1))(($concat(($concat(f_3913))("#")))($phi$450.$0.$0)))(b_3914.$0))(ns_3918))))((ret($import1$instance$Monad$11))((Pair_3753(b_3914.$0))((withAnn_3865((((remove_3786($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_3863(b_3914.$1))))(b_3914.$1))))
      })
    } else error("pattern match fail",$phi$450);
    var $phi$448 = $phi$449;
    return $phi$448
  }
};
var mergeInto_3910 = function(a_3919){
  return function(b_3920){
    var $phi$451 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_3807($import1$instance$Monad$11))(dropExport_3909(a_3919.$1)))(a_3919.$6)))(function(bs_3928){
      return (($gt$gt$eq($import1$instance$Monad$11))(gets_3805))(function(ns_3929){
        var f_3931 = function(local$instance$Hashable$1){
          return function(local$instance$Eq$0){
            return function(r_3932){
              return function(b_3933){
                var $phi$454 = (((getAnn_3859($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(annOf_3863(b_3933.$1));
                if($phi$454.$tag==1){
                  var $phi$453 = r_3932
                } else if($phi$454.$tag==0){
                  var $phi$453 = ((((insert_3783(local$instance$Hashable$1))(local$instance$Eq$0))(b_3933.$0))(((((setAnn_3866($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))($phi$454.$0))(emptyAnn_3889)))(r_3932)
                } else error("pattern match fail",$phi$454);
                var $phi$452 = $phi$453;
                return $phi$452
              }
            }
          }
        };
        var dataAnns_3930 = ((foldl((f_3931($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_3762))(bs_3928);
        var $phi$455 = (ret($import1$instance$Monad$11))(((((((Module_3896(a_3919.$0))(b_3920.$1))(a_3919.$2))([]))([]))([]))((concat(bs_3928))((concat((concatMap_3819((importAsBindings_3911(ns_3929))(dataAnns_3930)))(b_3920.$2)))(b_3920.$6))));
        return $phi$455
      })
    });
    return $phi$451
  }
};
var mergeModules_3908 = function(ms_3912){
  return (evalState_3803(Empty_3762))((((foldM_3806($import1$instance$Monad$11))(mergeInto_3910))(head_3813(ms_3912)))(tail_3812(ms_3912)))
};
var assert_3958 = assert_89;
var Pair_3959 = Pair_3;
var mapSnd_3960 = mapSnd_88;
var mapFst_3961 = mapFst_87;
var $gt$eq$gt_3962 = $gt$eq$gt_86;
var snd_3963 = snd_27;
var debug2_3964 = debug2_85;
var Just_3965 = Just_1;
var Nothing_3966 = Nothing_2;
var isJust_3967 = isJust_25;
var Empty_3968 = Empty_11;
var Leaf_3969 = Leaf_12;
var Collision_3970 = Collision_13;
var BitmapIndexed_3971 = BitmapIndexed_14;
var $_3972 = $_16;
var fst_3973 = fst_26;
var Left_3974 = Left_8;
var Right_3975 = Right_9;
var loop_3976 = loop_31;
var find_3977 = find_33;
var hamtMask_3978 = hamtMask_62;
var popCount_3979 = popCount_61;
var hamtIndex_3980 = hamtIndex_63;
var lookup_3981 = lookup_64;
var setContains_3982 = setContains_80;
var foldTrie_3983 = foldTrie_70;
var emptySet_3984 = emptySet_76;
var Unit_3985 = Unit_0;
var not_3986 = not_30;
var $div$eq_3987 = $div$eq_17;
var mapIx_3988 = mapIx_34;
var insert_3989 = insert_65;
var setAdd_3990 = setAdd_77;
var setIntersection_3991 = setIntersection_84;
var remove_3992 = remove_67;
var setDiff_3993 = setDiff_83;
var setToArray_3994 = setToArray_82;
var mergeTrie_3995 = mergeTrie_74;
var setUnion_3996 = setUnion_81;
var setRemove_3997 = setRemove_79;
var setAddAll_3998 = setAddAll_78;
var trieKeys_3999 = trieKeys_75;
var size_4000 = size_72;
var mapTrie_4001 = mapTrie_71;
var nodeMask_4002 = nodeMask_60;
var isEmpty_4003 = isEmpty_73;
var filterTrie_4004 = filterTrie_69;
var nextSetBitMask_4005 = nextSetBitMask_68;
var updateOrSet_4006 = updateOrSet_66;
var State_4007 = State_10;
var runState_4008 = runState_58;
var evalState_4009 = evalState_59;
var sets_4010 = sets_57;
var gets_4011 = gets_56;
var foldM_4012 = foldM_53;
var mapM_4013 = mapM_54;
var forM_4014 = forM_55;
var strToArray_4015 = strToArray_52;
var toRecord_4016 = toRecord_51;
var reverse_4017 = reverse_50;
var tail_4018 = tail_45;
var head_4019 = head_44;
var uniq_4020 = uniq_49;
var mergeSet_4021 = mergeSet_48;
var init_4022 = init_47;
var last_4023 = last_46;
var mapJust_4024 = mapJust_43;
var concatMap_4025 = concatMap_42;
var zip_4026 = zip_41;
var zipWithIndex2_4027 = zipWithIndex2_39;
var zipWithIndex_4028 = zipWithIndex_40;
var join_4029 = join_38;
var all_4030 = all_37;
var exists_4031 = exists_36;
var containsChar_4032 = containsChar_35;
var contains_4033 = contains_32;
var either_4034 = either_28;
var splitEither_4035 = splitEither_29;
var fromJust_4036 = fromJust_24;
var justOr_4037 = justOr_23;
var maybe_4038 = maybe_22;
var $gt$gt_4039 = $gt$gt_21;
var $gt$eq_4040 = $gt$eq_20;
var $lt$eq_4041 = $lt$eq_19;
var $gt_4042 = $gt_18;
var Identity_4043 = Identity_15;
var Tuple6_4044 = Tuple6_7;
var Tuple5_4045 = Tuple5_6;
var Tuple4_4046 = Tuple4_5;
var Tuple3_4047 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_4048 = App_761;
var Lam_4049 = Lam_762;
var Case_4050 = Case_763;
var Let_4051 = Let_764;
var New_4052 = New_765;
var breakableDownAndUpM_4053 = breakableDownAndUpM_812;
var breakableDownM_4054 = breakableDownM_816;
var downAndUpM_4055 = downAndUpM_813;
var downM_4056 = downM_815;
var upM_4057 = upM_814;
var breakableDownAndUp_4058 = breakableDownAndUp_807;
var breakableDown_4059 = breakableDown_811;
var downAndUp_4060 = downAndUp_808;
var down_4061 = down_810;
var up_4062 = up_809;
var AnnType_4063 = AnnType_753;
var TUnknown_4064 = TUnknown_785;
var getAnn_4065 = getAnn_790;
var getAnnType_4066 = getAnnType_793;
var Var_4067 = Var_759;
var Const_4068 = Const_760;
var annOf_4069 = annOf_804;
var getType_4070 = getType_806;
var withAnn_4071 = withAnn_805;
var setAnn_4072 = setAnn_791;
var setAnnType_4073 = setAnnType_794;
var setType_4074 = setType_803;
var Data_4075 = Data_773;
var DataCon_4076 = DataCon_774;
var dataConName_4077 = dataConName_801;
var dataConNames_4078 = dataConNames_802;
var TCBound_4079 = TCBound_777;
var TConst_4080 = TConst_778;
var TVar_4081 = TVar_779;
var TSkolem_4082 = TSkolem_780;
var TApp_4083 = TApp_781;
var TRow_4084 = TRow_782;
var TBot_4085 = TBot_783;
var TForall_4086 = TForall_784;
var equivBound_4087 = equivBound_799;
var equivType_4088 = equivType_800;
var getAnnCodeLoc_4089 = getAnnCodeLoc_795;
var AnnCodeLoc_4090 = AnnCodeLoc_754;
var printCodeLoc_4091 = printCodeLoc_797;
var exprLoc_4092 = exprLoc_798;
var setAnnCodeLoc_4093 = setAnnCodeLoc_796;
var copyAnn_4094 = copyAnn_792;
var emptyAnn_4095 = emptyAnn_789;
var ImportAll_4096 = ImportAll_788;
var ImportOpen_4097 = ImportOpen_787;
var ImportClosed_4098 = ImportClosed_786;
var Instance_4099 = Instance_776;
var Class_4100 = Class_775;
var ModuleInterface_4101 = ModuleInterface_772;
var Module_4102 = Module_771;
var PData_4103 = PData_770;
var PConst_4104 = PConst_769;
var PVar_4105 = PVar_768;
var CStr_4106 = CStr_767;
var CNum_4107 = CNum_766;
var AnnExport_4108 = AnnExport_758;
var AnnTag_4109 = AnnTag_757;
var AnnData_4110 = AnnData_756;
var AnnUseCount_4111 = AnnUseCount_755;
var freeVars_4112 = freeVars_2084;
var normalize_4114 = function(ms_4143){
  return function(freeVars_4144){
    return function(i_4145){
      if(i_4145.$tag==0){
        var $phi$456 = error("closed imports not supported")
      } else if(i_4145.$tag==1){
        var $phi$456 = i_4145
      } else if((i_4145.$tag==2)&&("./builtins.js"==i_4145.$1)){
        var $phi$462 = (get("./builtins.js"))(ms_4143);
        var $phi$461 = ((ImportOpen_4097(i_4145.$0))("./builtins.js"))((map(function(n_4156){
          return (Pair_3959(n_4156))(n_4156)
        }))(keys($phi$462.$0)));
        var $phi$456 = $phi$461
      } else if(i_4145.$tag==2){
        var $phi$458 = (has(i_4145.$1))(ms_4143);
        if($phi$458){
          var $phi$460 = (get(i_4145.$1))(ms_4143);
          var $phi$459 = ((ImportOpen_4097(i_4145.$0))(i_4145.$1))((map(function(n_4162){
            return (Pair_3959(n_4162))(n_4162)
          }))(keys($phi$460.$0)));
          var $phi$457 = $phi$459
        } else if(!$phi$458){
          var $phi$457 = error(($concat(($concat(($concat("no mod "))(i_4145.$1)))(" in ")))(jsonStringify(keys(ms_4143))))
        } else error("pattern match fail",$phi$458);
        var $phi$456 = $phi$457
      } else error("pattern match fail",i_4145);
      return $phi$456
    }
  }
};
var normalizeImports_4113 = function(ms_4115){
  return function(m_4116){
    var getFromDefs_4124 = function(ds_4130){
      return ((foldl((mergeSet_4021($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(function(v_4131){
        return freeVars_4112(snd_3963(v_4131))
      }))(ds_4130))
    };
    var freeVarsInDefs_4125 = getFromDefs_4124(m_4116.$6);
    var freeVarsInIns_4126 = ((foldl((mergeSet_4021($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(function(i_4132){
      var $phi$464 = getFromDefs_4124(i_4132.$3);
      return $phi$464
    }))(m_4116.$5));
    var topLevelNames_4127 = (concat((map(fst_3973))(m_4116.$6)))((concatMap_4025(function(i_4137){
      var $phi$465 = (map(fst_3973))(i_4137.$3);
      return $phi$465
    }))(m_4116.$5));
    var fvs_4128 = (filter(function(v_4142){
      return not_3986(((contains_4033($import1$instance$Eq$1))(v_4142))(topLevelNames_4127))
    }))((((mergeSet_4021($import1$instance$Ord$3))($import1$instance$Eq$1))(freeVarsInDefs_4125))(freeVarsInIns_4126));
    var is2_4129 = (map((normalize_4114(ms_4115))(fvs_4128)))((enqueue((ImportAll_4096(emptyAnn_4095))("./builtins.js")))(m_4116.$2));
    var $phi$463 = ((((((Module_4102(m_4116.$0))(m_4116.$1))(is2_4129))(m_4116.$3))(m_4116.$4))(m_4116.$5))(m_4116.$6);
    return $phi$463
  }
};
var assert_4163 = assert_89;
var Pair_4164 = Pair_3;
var mapSnd_4165 = mapSnd_88;
var mapFst_4166 = mapFst_87;
var $gt$eq$gt_4167 = $gt$eq$gt_86;
var snd_4168 = snd_27;
var debug2_4169 = debug2_85;
var Just_4170 = Just_1;
var Nothing_4171 = Nothing_2;
var isJust_4172 = isJust_25;
var Empty_4173 = Empty_11;
var Leaf_4174 = Leaf_12;
var Collision_4175 = Collision_13;
var BitmapIndexed_4176 = BitmapIndexed_14;
var $_4177 = $_16;
var fst_4178 = fst_26;
var Left_4179 = Left_8;
var Right_4180 = Right_9;
var loop_4181 = loop_31;
var find_4182 = find_33;
var hamtMask_4183 = hamtMask_62;
var popCount_4184 = popCount_61;
var hamtIndex_4185 = hamtIndex_63;
var lookup_4186 = lookup_64;
var setContains_4187 = setContains_80;
var foldTrie_4188 = foldTrie_70;
var emptySet_4189 = emptySet_76;
var Unit_4190 = Unit_0;
var not_4191 = not_30;
var $div$eq_4192 = $div$eq_17;
var mapIx_4193 = mapIx_34;
var insert_4194 = insert_65;
var setAdd_4195 = setAdd_77;
var setIntersection_4196 = setIntersection_84;
var remove_4197 = remove_67;
var setDiff_4198 = setDiff_83;
var setToArray_4199 = setToArray_82;
var mergeTrie_4200 = mergeTrie_74;
var setUnion_4201 = setUnion_81;
var setRemove_4202 = setRemove_79;
var setAddAll_4203 = setAddAll_78;
var trieKeys_4204 = trieKeys_75;
var size_4205 = size_72;
var mapTrie_4206 = mapTrie_71;
var nodeMask_4207 = nodeMask_60;
var isEmpty_4208 = isEmpty_73;
var filterTrie_4209 = filterTrie_69;
var nextSetBitMask_4210 = nextSetBitMask_68;
var updateOrSet_4211 = updateOrSet_66;
var State_4212 = State_10;
var runState_4213 = runState_58;
var evalState_4214 = evalState_59;
var sets_4215 = sets_57;
var gets_4216 = gets_56;
var foldM_4217 = foldM_53;
var mapM_4218 = mapM_54;
var forM_4219 = forM_55;
var strToArray_4220 = strToArray_52;
var toRecord_4221 = toRecord_51;
var reverse_4222 = reverse_50;
var tail_4223 = tail_45;
var head_4224 = head_44;
var uniq_4225 = uniq_49;
var mergeSet_4226 = mergeSet_48;
var init_4227 = init_47;
var last_4228 = last_46;
var mapJust_4229 = mapJust_43;
var concatMap_4230 = concatMap_42;
var zip_4231 = zip_41;
var zipWithIndex2_4232 = zipWithIndex2_39;
var zipWithIndex_4233 = zipWithIndex_40;
var join_4234 = join_38;
var all_4235 = all_37;
var exists_4236 = exists_36;
var containsChar_4237 = containsChar_35;
var contains_4238 = contains_32;
var either_4239 = either_28;
var splitEither_4240 = splitEither_29;
var fromJust_4241 = fromJust_24;
var justOr_4242 = justOr_23;
var maybe_4243 = maybe_22;
var $gt$gt_4244 = $gt$gt_21;
var $gt$eq_4245 = $gt$eq_20;
var $lt$eq_4246 = $lt$eq_19;
var $gt_4247 = $gt_18;
var Identity_4248 = Identity_15;
var Tuple6_4249 = Tuple6_7;
var Tuple5_4250 = Tuple5_6;
var Tuple4_4251 = Tuple4_5;
var Tuple3_4252 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_4253 = App_761;
var Lam_4254 = Lam_762;
var Case_4255 = Case_763;
var Let_4256 = Let_764;
var New_4257 = New_765;
var breakableDownAndUpM_4258 = breakableDownAndUpM_812;
var breakableDownM_4259 = breakableDownM_816;
var downAndUpM_4260 = downAndUpM_813;
var downM_4261 = downM_815;
var upM_4262 = upM_814;
var breakableDownAndUp_4263 = breakableDownAndUp_807;
var breakableDown_4264 = breakableDown_811;
var downAndUp_4265 = downAndUp_808;
var down_4266 = down_810;
var up_4267 = up_809;
var AnnType_4268 = AnnType_753;
var TUnknown_4269 = TUnknown_785;
var getAnn_4270 = getAnn_790;
var getAnnType_4271 = getAnnType_793;
var Var_4272 = Var_759;
var Const_4273 = Const_760;
var annOf_4274 = annOf_804;
var getType_4275 = getType_806;
var withAnn_4276 = withAnn_805;
var setAnn_4277 = setAnn_791;
var setAnnType_4278 = setAnnType_794;
var setType_4279 = setType_803;
var Data_4280 = Data_773;
var DataCon_4281 = DataCon_774;
var dataConName_4282 = dataConName_801;
var dataConNames_4283 = dataConNames_802;
var TCBound_4284 = TCBound_777;
var TConst_4285 = TConst_778;
var TVar_4286 = TVar_779;
var TSkolem_4287 = TSkolem_780;
var TApp_4288 = TApp_781;
var TRow_4289 = TRow_782;
var TBot_4290 = TBot_783;
var TForall_4291 = TForall_784;
var equivBound_4292 = equivBound_799;
var equivType_4293 = equivType_800;
var getAnnCodeLoc_4294 = getAnnCodeLoc_795;
var AnnCodeLoc_4295 = AnnCodeLoc_754;
var printCodeLoc_4296 = printCodeLoc_797;
var exprLoc_4297 = exprLoc_798;
var setAnnCodeLoc_4298 = setAnnCodeLoc_796;
var copyAnn_4299 = copyAnn_792;
var emptyAnn_4300 = emptyAnn_789;
var ImportAll_4301 = ImportAll_788;
var ImportOpen_4302 = ImportOpen_787;
var ImportClosed_4303 = ImportClosed_786;
var Instance_4304 = Instance_776;
var Class_4305 = Class_775;
var ModuleInterface_4306 = ModuleInterface_772;
var Module_4307 = Module_771;
var PData_4308 = PData_770;
var PConst_4309 = PConst_769;
var PVar_4310 = PVar_768;
var CStr_4311 = CStr_767;
var CNum_4312 = CNum_766;
var AnnExport_4313 = AnnExport_758;
var AnnTag_4314 = AnnTag_757;
var AnnData_4315 = AnnData_756;
var AnnUseCount_4316 = AnnUseCount_755;
var classToBindings_4317 = classToBindings_2087;
var unify_4318 = unify_2070;
var applySubsBound_4319 = applySubsBound_2068;
var instanceToTypeBound_4320 = instanceToTypeBound_2086;
var satisfiesBound_4321 = satisfiesBound_2091;
var skolemizeSubs_4322 = skolemizeSubs_2075;
var instantiate_4323 = instantiate_2065;
var printType_4324 = printType_1742;
var printTypeBound_4325 = printTypeBound_1743;
var reallyPrintExpr_4326 = reallyPrintExpr_1747;
var mkConFun_4327 = mkConFun_3034;
var S_4328 = function($_0_4346){
  return function($_1_4347){
    return function($_2_4348){
      return {$0:$_0_4346,$1:$_1_4347,$2:$_2_4348}
    }
  }
};
var setEnv_4336 = function(env_4454){
  return function(s_4455){
    var $phi$466 = ((S_4328(env_4454))(s_4455.$1))(s_4455.$2);
    return $phi$466
  }
};
var instanceNameFromBound_4343 = function(ix_4679){
  return function(b_4680){
    var $phi$467 = ($concat(($concat(($concat("local$instance$"))(b_4680.$1)))("$")))(intToString(ix_4679));
    return $phi$467
  }
};
var getEnv_4335 = function(s_4450){
  var $phi$468 = s_4450.$0;
  return $phi$468
};
var breakableDownAndUpWithEnv_4338 = function(getEnv_4544){
  return function(setEnv_4545){
    return function(down_4546){
      return function(up_4547){
        return function(a_4548){
          return function(e_4549){
            var exitScope_4552 = function(a_4563){
              return (setEnv_4545(tail_4223(getEnv_4544(a_4563))))(a_4563)
            };
            var processUp_4555 = function(a_4612){
              return function(e_4613){
                if(e_4613.$tag==3){
                  var $phi$469 = exitScope_4552(a_4612)
                } else if(e_4613.$tag==5){
                  var $phi$469 = exitScope_4552(a_4612)
                } else var $phi$469 = a_4612;
                var a2_4614 = $phi$469;
                return (up_4547(a2_4614))(e_4613)
              }
            };
            var patBindings_4556 = function(p_4622){
              if(p_4622.$tag==1){
                var $phi$470 = empty
              } else if(p_4622.$tag==0){
                var $phi$470 = ((set(p_4622.$1))(getAnnType_4271(p_4622.$0)))(empty)
              } else if(p_4622.$tag==2){
                var $phi$470 = ((foldr(function(env_4630){
                  return function(p_4631){
                    return (merge(patBindings_4556(p_4631)))(env_4630)
                  }
                }))(empty))(p_4622.$2)
              } else error("pattern match fail",p_4622);
              return $phi$470
            };
            var enterScope_4551 = function(bs_4559){
              return function(a_4560){
                var es_4561 = getEnv_4544(a_4560);
                var e_4562 = (merge(head_4224(es_4561)))(bs_4559);
                return (setEnv_4545((enqueue(e_4562))(es_4561)))(a_4560)
              }
            };
            var go_4550 = function(a_4557){
              return function(e_4558){
                return (((breakableDownAndUp_4263(processDown_4553))(processUp_4555))(a_4557))(e_4558)
              }
            };
            var processDown_4553 = function(a_4564){
              return function(e_4565){
                var $phi$472 = (down_4546(a_4564))(e_4565);
                if($phi$472.$tag==1){
                  var $phi$471 = Right_4180($phi$472.$0)
                } else if($phi$472.$tag==0){
                  if($phi$472.$0.$1.$tag==3){
                    var $phi$480 = getType_4275($phi$472.$0.$1);
                    if(($phi$480.$tag==3)&&(($phi$480.$1.$tag==3)&&(($phi$480.$1.$1.$tag==0)&&("->"==$phi$480.$1.$1.$1)))){
                      var $phi$479 = $phi$480.$1.$2
                    } else if(($phi$480.$tag==6)&&(($phi$480.$3.$tag==3)&&(($phi$480.$3.$1.$tag==3)&&(($phi$480.$3.$1.$1.$tag==0)&&("->"==$phi$480.$3.$1.$1.$1))))){
                      var $phi$479 = $phi$480.$3.$1.$2
                    } else var $phi$479 = TUnknown_4269;
                    var t_4572 = $phi$479;
                    var $phi$473 = Left_4179((Pair_4164((enterScope_4551(((set($phi$472.$0.$1.$1))(t_4572))(empty)))($phi$472.$0.$0)))($phi$472.$0.$1))
                  } else if($phi$472.$0.$1.$tag==5){
                    var ts_4590 = ((foldl(function(ts_4591){
                      return function(b_4592){
                        var $phi$478 = ((set(b_4592.$0))(getType_4275(b_4592.$1)))(ts_4591);
                        return $phi$478
                      }
                    }))(empty))($phi$472.$0.$1.$1);
                    var $phi$473 = Left_4179((Pair_4164((enterScope_4551(ts_4590))($phi$472.$0.$0)))($phi$472.$0.$1))
                  } else if($phi$472.$0.$1.$tag==4){
                    var $phi$475 = (go_4550($phi$472.$0.$0))($phi$472.$0.$1.$1);
                    var $phi$477 = ((foldl(processPat_4554))((Pair_4164($phi$475.$0))([])))($phi$472.$0.$1.$2);
                    var $phi$476 = Right_4180((Pair_4164($phi$477.$0))(((Case_4255($phi$472.$0.$1.$0))($phi$475.$1))($phi$477.$1)));
                    var $phi$474 = $phi$476;
                    var $phi$473 = $phi$474
                  } else var $phi$473 = Left_4179((Pair_4164($phi$472.$0.$0))($phi$472.$0.$1));
                  var $phi$471 = $phi$473
                } else error("pattern match fail",$phi$472);
                return $phi$471
              }
            };
            var processPat_4554 = function(ar_4603){
              return function(pat_4604){
                var bs_4609 = patBindings_4556(pat_4604.$0);
                var $phi$484 = (go_4550((enterScope_4551(bs_4609))(ar_4603.$0)))(pat_4604.$1);
                var $phi$483 = (Pair_4164(exitScope_4552($phi$484.$0)))((push((Pair_4164(pat_4604.$0))($phi$484.$1)))(ar_4603.$1));
                var $phi$482 = $phi$483;
                var $phi$481 = $phi$482;
                return $phi$481
              }
            };
            return (go_4550(a_4548))(e_4549)
          }
        }
      }
    }
  }
};
var rewriteExpr_4337 = function(is_4459){
  return function(env_4460){
    return function(e_4461){
      var rewriteVar_4463 = function(a_4489){
        return function(e_4490){
          if(e_4490.$tag==0){
            var $phi$488 = getType_4275(e_4490);
            if($phi$488.$tag==6){
              var $phi$487 = (Pair_4164(a_4489))(e_4490)
            } else {
              var findMatching_4499 = function(b_4508){
                return function(a_4509){
                  var matching_4513 = (filter(function(p_4514){
                    var $phi$490 = (satisfiesBound_4321(p_4514.$1))(b_4508);
                    return $phi$490
                  }))(a_4509.$1);
                  var $phi$492 = length(matching_4513);
                  if(0==$phi$492){
                    var $phi$491 = error(($concat(($concat(($concat("declasser failed to find satisfying instance for "))(printTypeBound_4325(b_4508))))(" ")))(exprLoc_4297(e_4490)))
                  } else if(1==$phi$492){
                    var $phi$491 = fst_4178((getIx(0))(matching_4513))
                  } else var $phi$491 = error(($concat(($concat(($concat("declasser found more than 1 satisfying instance for "))(printTypeBound_4325(b_4508))))(" ")))(exprLoc_4297(e_4490)));
                  var $phi$489 = $phi$491;
                  return $phi$489
                }
              };
              var requiredInstances_4500 = function(tv_4518){
                return function(td_4519){
                  var $phi$494 = ((instantiate_4323(Unit_4190))(function(__4520){
                    return function(v_4521){
                      return ($_4177(Pair_4164(Unit_4190)))((TVar_4286(emptyAnn_4300))(($concat("$ins$"))(v_4521)))
                    }
                  }))(td_4519);
                  var subs_4525 = ((unify_4318(function(s_4526){
                    return ($concat("declasser: "))(s_4526)
                  }))(tv_4518))($phi$494.$0.$0);
                  var $phi$493 = (map(applySubsBound_4319(subs_4525)))($phi$494.$0.$1);
                  return $phi$493
                }
              };
              var fromEnv_4498 = function(n_4505){
                return function(envs_4506){
                  var env_4507 = head_4224(envs_4506);
                  var $phi$496 = (has(n_4505))(env_4507);
                  if(!$phi$496){
                    var $phi$495 = error(($concat(($concat(($concat("no "))(n_4505)))(" in env ")))(jsonStringify(keys(env_4507))))
                  } else if($phi$496){
                    var $phi$495 = (get(n_4505))(env_4507)
                  } else error("pattern match fail",$phi$496);
                  return $phi$495
                }
              };
              var t_4501 = (fromEnv_4498(e_4490.$1))(getEnv_4335(a_4489));
              var is_4502 = (requiredInstances_4500($phi$488))(t_4501);
              var mis_4503 = (map(function(b_4528){
                return (findMatching_4499(b_4528))(a_4489)
              }))(is_4502);
              var e2_4504 = ((foldl(function(e_4529){
                return function(v_4530){
                  return ((App_4253(emptyAnn_4300))(e_4529))((Var_4272(emptyAnn_4300))(v_4530))
                }
              }))(e_4490))(mis_4503);
              var $phi$487 = (Pair_4164(a_4489))(e2_4504)
            };
            var $phi$485 = $phi$487
          } else if(e_4490.$tag==3){
            var dropInstance_4534 = function(v_4535){
              return function(a_4536){
                var $phi$486 = ((S_4328(a_4536.$0))((filter(function(p_4540){
                  return (($div$eq_4192($import1$instance$Eq$1))(fst_4178(p_4540)))(v_4535)
                }))(a_4536.$1)))(a_4536.$2);
                return $phi$486
              }
            };
            var $phi$485 = (Pair_4164((dropInstance_4534(e_4490.$1))(a_4489)))(e_4490)
          } else var $phi$485 = (Pair_4164(a_4489))(e_4490);
          return $phi$485
        }
      };
      var boundsToLam_4462 = function(a_4464){
        return function(e_4465){
          var addInstance_4466 = function(b_4468){
            return function(a_4469){
              var name_4473 = (instanceNameFromBound_4343(a_4469.$2))(b_4468);
              var $phi$497 = (Pair_4164(((S_4328(a_4469.$0))((push((Pair_4164(name_4473))(b_4468)))(a_4469.$1)))(a_4469.$2+1)))(name_4473);
              return $phi$497
            }
          };
          var rewriteBound_4467 = function(ae_4474){
            return function(ib_4475){
              var $phi$501 = (addInstance_4466(ib_4475.$1))(ae_4474.$0);
              var $phi$500 = (Pair_4164($phi$501.$0))(((Lam_4254(emptyAnn_4300))($phi$501.$1))(ae_4474.$1));
              var $phi$499 = $phi$500;
              var $phi$498 = $phi$499;
              return $phi$498
            }
          };
          var $phi$503 = getType_4275(e_4465);
          if($phi$503.$tag==6){
            var $phi$505 = (($gt_4247($import1$instance$Ord$2))(length($phi$503.$2)))(0);
            if(!$phi$505){
              var $phi$504 = (Pair_4164(a_4464))(e_4465)
            } else if($phi$505){
              var rewritten_4486 = ((foldr(rewriteBound_4467))((Pair_4164(a_4464))((setType_4279($phi$503.$3))(e_4465))))(zipWithIndex_4233($phi$503.$2));
              var $phi$504 = (mapSnd_4165(function(re_4487){
                return (withAnn_4276((((copyAnn_4299($import1$instance$Hashable$13))($import1$instance$Eq$1))(["export"]))(annOf_4274(e_4465))))(re_4487)
              }))(rewritten_4486)
            } else error("pattern match fail",$phi$505);
            var $phi$502 = $phi$504
          } else var $phi$502 = (Pair_4164(a_4464))(e_4465);
          return $phi$502
        }
      };
      return snd_4168((((((breakableDownAndUpWithEnv_4338(getEnv_4335))(setEnv_4336))(function(a_4542){
        return function(e_4543){
          return Left_4179((boundsToLam_4462(a_4542))(e_4543))
        }
      }))(rewriteVar_4463))(((S_4328([env_4460]))(is_4459))(0)))(e_4461))
    }
  }
};
var instanceName_4342 = function(ix_4673){
  return function(i_4674){
    var $phi$506 = ($concat(($concat(($concat("$instance$"))(i_4674.$1)))("$")))(intToString(ix_4673));
    return $phi$506
  }
};
var className_4340 = function(n_4667){
  return ($concat("$class$"))(n_4667)
};
var rewriteInstance_4334 = function(is_4439){
  return function(env_4440){
    return function(ix_4441){
      return function(i_4442){
        var args_4448 = (map((rewriteExpr_4337(is_4439))(env_4440)))((map(snd_4168))(sort(i_4442.$3)));
        var e_4449 = ((foldl(App_4253(emptyAnn_4300)))((Var_4272(emptyAnn_4300))(className_4340(i_4442.$1))))(args_4448);
        var name_4447 = (instanceName_4342(ix_4441))(i_4442);
        var $phi$507 = (Pair_4164(name_4447))((withAnn_4276(((((setAnn_4277($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_4313(name_4447)))(emptyAnn_4300)))(e_4449));
        return $phi$507
      }
    }
  }
};
var instanceNameFromImport_4345 = function(imix_4689){
  return function(inix_4690){
    return function(b_4691){
      var $phi$508 = ($concat(($concat(($concat(($concat(($concat("$import"))(intToString(imix_4689))))("$instance$")))(b_4691.$1)))("$")))(intToString(inix_4690));
      return $phi$508
    }
  }
};
var instanceName2_4344 = function(ix_4684){
  return function(i_4685){
    var $phi$509 = ($concat(($concat(($concat("$instance$"))(i_4685.$1)))("$")))(intToString(ix_4684));
    return $phi$509
  }
};
var rewriteImportedBound_4331 = function(impIx_4408){
  return function(_nbs_4409){
    return function(_ib_4410){
      var alias_4416 = ((instanceNameFromImport_4345(impIx_4408))(_ib_4410.$0))(_ib_4410.$1);
      var symbol_4415 = (instanceName2_4344(_ib_4410.$0))(_ib_4410.$1);
      var $phi$511 = (Pair_4164((push((Pair_4164(symbol_4415))(alias_4416)))(_nbs_4409.$0)))((push((Pair_4164(alias_4416))(_ib_4410.$1)))(_nbs_4409.$1));
      var $phi$510 = $phi$511;
      return $phi$510
    }
  }
};
var rewriteImportedInstances_4330 = function(ms_4386){
  return function(_isi_4387){
    return function(_ixi_4388){
      if(_ixi_4388.$1.$tag==1){
        var $phi$515 = (get(_ixi_4388.$1.$1))(ms_4386);
        var _impIns_4398 = ((foldl(rewriteImportedBound_4331(_ixi_4388.$0)))((Pair_4164([]))([])))(zipWithIndex_4233($phi$515.$2));
        var importedClassNames_4401 = (map(function(n_4402){
          return (Pair_4164(n_4402))(n_4402)
        }))((concatMap_4230(function(c_4403){
          var $phi$517 = (enqueue(className_4340(c_4403.$1)))((map(fst_4178))(c_4403.$3));
          return $phi$517
        }))($phi$515.$1));
        var $phi$516 = (Pair_4164((push(((ImportOpen_4302(_ixi_4388.$1.$0))(_ixi_4388.$1.$1))((concat(_ixi_4388.$1.$2))((concat(_impIns_4398.$0))(importedClassNames_4401)))))(_isi_4387.$0)))((concat(_isi_4387.$1))(_impIns_4398.$1));
        var $phi$514 = $phi$516;
        var $phi$513 = $phi$514
      } else error("pattern match fail",_ixi_4388);
      var $phi$512 = $phi$513;
      return $phi$512
    }
  }
};
var mkClassDictConstructor_4332 = function(c_4417){
  var type_4424 = ((TApp_4288(emptyAnn_4300))((TConst_4285(emptyAnn_4300))(c_4417.$1)))((TVar_4286(emptyAnn_4300))(c_4417.$2));
  var params_4423 = (map(snd_4168))(sort(classToBindings_4317(c_4417)));
  var name_4422 = className_4340(c_4417.$1);
  var $phi$518 = ((((mkConFun_4327(Nothing_4171))(type_4424))([c_4417.$2]))(name_4422))(params_4423);
  return $phi$518
};
var className2_4341 = function(c_4668){
  var $phi$519 = className_4340(c_4668.$1);
  return $phi$519
};
var mkClassDictAccessors_4333 = function(c_4425){
  var name_4430 = className2_4341(c_4425);
  var f_4434 = function(b_4435){
    return (PVar_4310(emptyAnn_4300))(($concat(fst_4178(b_4435)))("_"))
  };
  var bsForPat_4431 = (map(f_4434))(sort(c_4425.$3));
  var v_4432 = ($concat("x_"))(name_4430);
  var rewrite_4433 = function(b_4436){
    var $phi$521 = (Pair_4164(b_4436.$0))((setType_4279(b_4436.$1))(((Lam_4254(((((setAnn_4277($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_4313(b_4436.$0)))(emptyAnn_4300)))(v_4432))(((Case_4255(emptyAnn_4300))((Var_4272(emptyAnn_4300))(v_4432)))([(Pair_4164(((PData_4308(emptyAnn_4300))(name_4430))(bsForPat_4431)))((Var_4272(emptyAnn_4300))(($concat(b_4436.$0))("_")))]))));
    return $phi$521
  };
  var $phi$520 = (map(rewrite_4433))(classToBindings_4317(c_4425));
  return $phi$520
};
var importsToTypeEnv_4339 = function(ms_4632){
  return function(is_4633){
    var getFile_4634 = function(i_4637){
      if(i_4637.$tag==2){
        var $phi$522 = i_4637.$1
      } else if(i_4637.$tag==1){
        var $phi$522 = i_4637.$1
      } else if(i_4637.$tag==0){
        var $phi$522 = i_4637.$1
      } else error("pattern match fail",i_4637);
      return $phi$522
    };
    var addClass_4635 = function(env_4646){
      return function(c_4647){
        return ((foldl(function(env_4648){
          return function(b_4649){
            return ((set(fst_4178(b_4649)))(snd_4168(b_4649)))(env_4648)
          }
        }))(env_4646))(classToBindings_4317(c_4647))
      }
    };
    var addImports_4636 = function(env_4650){
      return function(i_4651){
        var $phi$524 = (get(getFile_4634(i_4651)))(ms_4632);
        if(i_4651.$tag==2){
          var $phi$525 = (merge(env_4650))($phi$524.$0)
        } else if(i_4651.$tag==1){
          var $phi$525 = ((foldl(function(env_4662){
            return function(n_4663){
              var $phi$526 = ((set(n_4663.$1))((get(n_4663.$0))($phi$524.$0)))(env_4662);
              return $phi$526
            }
          }))(env_4650))(i_4651.$2)
        } else var $phi$525 = error("import type not supported in type inference");
        var env2_4655 = $phi$525;
        var env3_4656 = ((foldl(addClass_4635))(env2_4655))($phi$524.$1);
        var $phi$523 = env3_4656;
        return $phi$523
      }
    };
    return ((foldl(addImports_4636))(empty))((enqueue((ImportAll_4301(emptyAnn_4300))("./builtins.js")))(is_4633))
  }
};
var declassModule_4329 = function(ms_4349){
  return function(m_4350){
    var classFuns_4361 = (concat((map(mkClassDictConstructor_4332))(m_4350.$4)))((concatMap_4230(mkClassDictAccessors_4333))(m_4350.$4));
    var splitData_4379 = function(d_4380){
      var $phi$529 = (((lookup_4186($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(annOf_4274(snd_4168(d_4380)));
      if($phi$529.$tag==1){
        var $phi$528 = Right_4180(d_4380)
      } else if($phi$529.$tag==0){
        var $phi$528 = Left_4179(d_4380)
      } else error("pattern match fail",$phi$529);
      return $phi$528
    };
    var _sds_4364 = splitEither_4240((map(splitData_4379))(m_4350.$6));
    var adtDs_4365 = fst_4178(_sds_4364);
    var _isi_4358 = ((foldl(rewriteImportedInstances_4330(ms_4349)))((Pair_4164([]))([])))(zipWithIndex_4233(m_4350.$2));
    var importedInstances_4360 = snd_4168(_isi_4358);
    var availableInstances_4362 = (concat(importedInstances_4360))((map(function(p_4370){
      var $phi$530 = (Pair_4164((instanceName_4342(p_4370.$0))(p_4370.$1)))(instanceToTypeBound_4320(p_4370.$1));
      return $phi$530
    }))(zipWithIndex_4233(m_4350.$5)));
    var localBindings_4374 = (concat(classFuns_4361))(m_4350.$6);
    var importedSymbols_4373 = (importsToTypeEnv_4339(ms_4349))(m_4350.$2);
    var env_4363 = ((foldl(function(env_4375){
      return function(b_4376){
        var $phi$531 = ((set(b_4376.$0))(getType_4275(b_4376.$1)))(env_4375);
        return $phi$531
      }
    }))(importedSymbols_4373))(localBindings_4374);
    var nonAdtDs_4366 = snd_4168(_sds_4364);
    var declassedDs_4367 = (map(function(d_4382){
      return (Pair_4164(fst_4178(d_4382)))(((rewriteExpr_4337(availableInstances_4362))(env_4363))(snd_4168(d_4382)))
    }))(nonAdtDs_4366);
    var instancesAsDicts_4368 = (map(function(p_4383){
      var $phi$532 = (((rewriteInstance_4334(availableInstances_4362))(env_4363))(p_4383.$0))(p_4383.$1);
      return $phi$532
    }))(zipWithIndex_4233(m_4350.$5));
    var finalDs_4369 = (concat(adtDs_4365))((concat(classFuns_4361))((concat(instancesAsDicts_4368))(declassedDs_4367)));
    var impsWithImportedInstances_4359 = fst_4178(_isi_4358);
    var $phi$527 = ((((((Module_4307(m_4350.$0))(m_4350.$1))(impsWithImportedInstances_4359))(m_4350.$3))([]))([]))(finalDs_4369);
    return $phi$527
  }
};
var assert_4695 = assert_89;
var Pair_4696 = Pair_3;
var mapSnd_4697 = mapSnd_88;
var mapFst_4698 = mapFst_87;
var $gt$eq$gt_4699 = $gt$eq$gt_86;
var snd_4700 = snd_27;
var debug2_4701 = debug2_85;
var Just_4702 = Just_1;
var Nothing_4703 = Nothing_2;
var isJust_4704 = isJust_25;
var Empty_4705 = Empty_11;
var Leaf_4706 = Leaf_12;
var Collision_4707 = Collision_13;
var BitmapIndexed_4708 = BitmapIndexed_14;
var $_4709 = $_16;
var fst_4710 = fst_26;
var Left_4711 = Left_8;
var Right_4712 = Right_9;
var loop_4713 = loop_31;
var find_4714 = find_33;
var hamtMask_4715 = hamtMask_62;
var popCount_4716 = popCount_61;
var hamtIndex_4717 = hamtIndex_63;
var lookup_4718 = lookup_64;
var setContains_4719 = setContains_80;
var foldTrie_4720 = foldTrie_70;
var emptySet_4721 = emptySet_76;
var Unit_4722 = Unit_0;
var not_4723 = not_30;
var $div$eq_4724 = $div$eq_17;
var mapIx_4725 = mapIx_34;
var insert_4726 = insert_65;
var setAdd_4727 = setAdd_77;
var setIntersection_4728 = setIntersection_84;
var remove_4729 = remove_67;
var setDiff_4730 = setDiff_83;
var setToArray_4731 = setToArray_82;
var mergeTrie_4732 = mergeTrie_74;
var setUnion_4733 = setUnion_81;
var setRemove_4734 = setRemove_79;
var setAddAll_4735 = setAddAll_78;
var trieKeys_4736 = trieKeys_75;
var size_4737 = size_72;
var mapTrie_4738 = mapTrie_71;
var nodeMask_4739 = nodeMask_60;
var isEmpty_4740 = isEmpty_73;
var filterTrie_4741 = filterTrie_69;
var nextSetBitMask_4742 = nextSetBitMask_68;
var updateOrSet_4743 = updateOrSet_66;
var State_4744 = State_10;
var runState_4745 = runState_58;
var evalState_4746 = evalState_59;
var sets_4747 = sets_57;
var gets_4748 = gets_56;
var foldM_4749 = foldM_53;
var mapM_4750 = mapM_54;
var forM_4751 = forM_55;
var strToArray_4752 = strToArray_52;
var toRecord_4753 = toRecord_51;
var reverse_4754 = reverse_50;
var tail_4755 = tail_45;
var head_4756 = head_44;
var uniq_4757 = uniq_49;
var mergeSet_4758 = mergeSet_48;
var init_4759 = init_47;
var last_4760 = last_46;
var mapJust_4761 = mapJust_43;
var concatMap_4762 = concatMap_42;
var zip_4763 = zip_41;
var zipWithIndex2_4764 = zipWithIndex2_39;
var zipWithIndex_4765 = zipWithIndex_40;
var join_4766 = join_38;
var all_4767 = all_37;
var exists_4768 = exists_36;
var containsChar_4769 = containsChar_35;
var contains_4770 = contains_32;
var either_4771 = either_28;
var splitEither_4772 = splitEither_29;
var fromJust_4773 = fromJust_24;
var justOr_4774 = justOr_23;
var maybe_4775 = maybe_22;
var $gt$gt_4776 = $gt$gt_21;
var $gt$eq_4777 = $gt$eq_20;
var $lt$eq_4778 = $lt$eq_19;
var $gt_4779 = $gt_18;
var Identity_4780 = Identity_15;
var Tuple6_4781 = Tuple6_7;
var Tuple5_4782 = Tuple5_6;
var Tuple4_4783 = Tuple4_5;
var Tuple3_4784 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var ArgBool_4785 = function($_0_4793){
  return function($_1_4794){
    return {$0:$_0_4793,$1:$_1_4794,$tag:0}
  }
};
var ParsedArgs_4787 = function($_0_4797){
  return function($_1_4798){
    return function($_2_4799){
      return {$0:$_0_4797,$1:$_1_4798,$2:$_2_4799}
    }
  }
};
var ArgString_4786 = function($_0_4795){
  return function($_1_4796){
    return {$0:$_0_4795,$1:$_1_4796,$tag:1}
  }
};
var $instance$Eq$0 = $class$Eq(function(a_4839){
  return function(b_4840){
    return a_4839===b_4840
  }
});
var getBool_4792 = function(p_4829){
  return function(def_4830){
    var $phi$535 = ((contains_4770($instance$Eq$0))(def_4830))(p_4829.$2);
    if(!$phi$535){
      var $phi$534 = error("unrecognized arg that was not present for parsing")
    } else if($phi$535){
      if(def_4830.$tag==0){
        var $phi$538 = (has(def_4830.$0))(p_4829.$1);
        if(!$phi$538){
          if(def_4830.$1.$tag==0){
            var $phi$541 = def_4830.$1.$0
          } else if(def_4830.$1.$tag==1){
            var $phi$541 = error(($concat("no value for required arg "))(def_4830.$0))
          } else error("pattern match fail",def_4830.$1);
          var $phi$537 = $phi$541
        } else if($phi$538){
          var $phi$540 = (get(def_4830.$0))(p_4829.$1);
          if(""==$phi$540){
            var $phi$539 = true
          } else if("True"==$phi$540){
            var $phi$539 = true
          } else if("true"==$phi$540){
            var $phi$539 = true
          } else if("1"==$phi$540){
            var $phi$539 = true
          } else if("False"==$phi$540){
            var $phi$539 = false
          } else if("false"==$phi$540){
            var $phi$539 = false
          } else if("0"==$phi$540){
            var $phi$539 = false
          } else var $phi$539 = error(($concat("invalid value for a bool argument: "))($phi$540));
          var $phi$537 = $phi$539
        } else error("pattern match fail",$phi$538);
        var $phi$536 = $phi$537
      } else var $phi$536 = error("arg is not a bool");
      var $phi$534 = $phi$536
    } else error("pattern match fail",$phi$535);
    var $phi$533 = $phi$534;
    return $phi$533
  }
};
var getString_4791 = function(p_4820){
  return function(def_4821){
    var $phi$544 = ((contains_4770($instance$Eq$0))(def_4821))(p_4820.$2);
    if(!$phi$544){
      var $phi$543 = error("unrecognized arg that was not present for parsing")
    } else if($phi$544){
      if(def_4821.$tag==1){
        var $phi$547 = (has(def_4821.$0))(p_4820.$1);
        if(!$phi$547){
          if(def_4821.$1.$tag==0){
            var $phi$548 = def_4821.$1.$0
          } else if(def_4821.$1.$tag==1){
            var $phi$548 = error(($concat("no value for required arg "))(def_4821.$0))
          } else error("pattern match fail",def_4821.$1);
          var $phi$546 = $phi$548
        } else if($phi$547){
          var $phi$546 = (get(def_4821.$0))(p_4820.$1)
        } else error("pattern match fail",$phi$547);
        var $phi$545 = $phi$546
      } else var $phi$545 = error("arg is not a string");
      var $phi$543 = $phi$545
    } else error("pattern match fail",$phi$544);
    var $phi$542 = $phi$543;
    return $phi$542
  }
};
var getPositional_4790 = function(p_4816){
  var $phi$549 = p_4816.$0;
  return $phi$549
};
var argName_4788 = function(a_4800){
  if(a_4800.$tag==0){
    var $phi$550 = a_4800.$0
  } else if(a_4800.$tag==1){
    var $phi$550 = a_4800.$0
  } else error("pattern match fail",a_4800);
  return $phi$550
};
var parseArgs_4789 = function(defs_4805){
  return function(argv_4806){
    var parse_4807 = function(r_4808){
      return function(arg_4809){
        var $phi$553 = ($and((($eq$eq($import1$instance$Eq$1))((getChar(0))(arg_4809)))("-")))((($eq$eq($import1$instance$Eq$1))((getChar(1))(arg_4809)))("-"));
        if(!$phi$553){
          var $phi$552 = (Pair_4696((push(arg_4809))(r_4808.$0)))(r_4808.$1)
        } else if($phi$553){
          var value_4813 = (drop(1))((match("=.*"))(arg_4809));
          var name_4812 = (match("[^=]+"))((drop(2))(arg_4809));
          var $phi$555 = ((contains_4770($import1$instance$Eq$1))(name_4812))((map(argName_4788))(defs_4805));
          if(!$phi$555){
            var $phi$554 = error(($concat("unrecognized argument "))(arg_4809))
          } else if($phi$555){
            var $phi$554 = (Pair_4696(r_4808.$0))(((set(name_4812))(value_4813))(r_4808.$1))
          } else error("pattern match fail",$phi$555);
          var $phi$552 = $phi$554
        } else error("pattern match fail",$phi$553);
        var $phi$551 = $phi$552;
        return $phi$551
      }
    };
    var $phi$557 = ((foldl(parse_4807))((Pair_4696([]))(empty)))(argv_4806);
    var $phi$556 = ((ParsedArgs_4787($phi$557.$0))($phi$557.$1))(defs_4805);
    return $phi$556
  }
};
var JSIf_4864 = function($_0_4898){
  return function($_1_4899){
    return function($_2_4900){
      return {$0:$_0_4898,$1:$_1_4899,$2:$_2_4900,$tag:6}
    }
  }
};
var JSAssign_4863 = function($_0_4896){
  return function($_1_4897){
    return {$0:$_0_4896,$1:$_1_4897,$tag:5}
  }
};
var JSBreak_4862 = {$tag:4};
var JSSwitch_4861 = function($_0_4894){
  return function($_1_4895){
    return {$0:$_0_4894,$1:$_1_4895,$tag:3}
  }
};
var JSVar_4860 = function($_0_4892){
  return function($_1_4893){
    return {$0:$_0_4892,$1:$_1_4893,$tag:2}
  }
};
var JSReturn_4859 = function($_0_4891){
  return {$0:$_0_4891,$tag:1}
};
var JSExpr_4858 = function($_0_4890){
  return {$0:$_0_4890,$tag:0}
};
var JSSeq_4857 = function($_0_4889){
  return {$0:$_0_4889,$tag:16}
};
var JSNew_4856 = function($_0_4887){
  return function($_1_4888){
    return {$0:$_0_4887,$1:$_1_4888,$tag:15}
  }
};
var JSInstanceOf_4855 = function($_0_4885){
  return function($_1_4886){
    return {$0:$_0_4885,$1:$_1_4886,$tag:14}
  }
};
var JSUndefined_4854 = {$tag:13};
var JSNull_4853 = {$tag:12};
var JSArray_4852 = function($_0_4884){
  return {$0:$_0_4884,$tag:11}
};
var JSObject_4851 = function($_0_4883){
  return {$0:$_0_4883,$tag:10}
};
var JSBool_4850 = function($_0_4882){
  return {$0:$_0_4882,$tag:9}
};
var JSString_4849 = function($_0_4881){
  return {$0:$_0_4881,$tag:8}
};
var JSNum_4848 = function($_0_4880){
  return {$0:$_0_4880,$tag:7}
};
var JSTernary_4847 = function($_0_4877){
  return function($_1_4878){
    return function($_2_4879){
      return {$0:$_0_4877,$1:$_1_4878,$2:$_2_4879,$tag:6}
    }
  }
};
var JSFun_4846 = function($_0_4875){
  return function($_1_4876){
    return {$0:$_0_4875,$1:$_1_4876,$tag:5}
  }
};
var JSCall_4845 = function($_0_4873){
  return function($_1_4874){
    return {$0:$_0_4873,$1:$_1_4874,$tag:4}
  }
};
var JSBinOp_4844 = function($_0_4870){
  return function($_1_4871){
    return function($_2_4872){
      return {$0:$_0_4870,$1:$_1_4871,$2:$_2_4872,$tag:3}
    }
  }
};
var JSUnOp_4843 = function($_0_4868){
  return function($_1_4869){
    return {$0:$_0_4868,$1:$_1_4869,$tag:2}
  }
};
var JSIndex_4842 = function($_0_4866){
  return function($_1_4867){
    return {$0:$_0_4866,$1:$_1_4867,$tag:1}
  }
};
var JSRef_4841 = function($_0_4865){
  return {$0:$_0_4865,$tag:0}
};
var assert_4901 = assert_89;
var Pair_4902 = Pair_3;
var mapSnd_4903 = mapSnd_88;
var mapFst_4904 = mapFst_87;
var $gt$eq$gt_4905 = $gt$eq$gt_86;
var snd_4906 = snd_27;
var debug2_4907 = debug2_85;
var Just_4908 = Just_1;
var Nothing_4909 = Nothing_2;
var isJust_4910 = isJust_25;
var Empty_4911 = Empty_11;
var Leaf_4912 = Leaf_12;
var Collision_4913 = Collision_13;
var BitmapIndexed_4914 = BitmapIndexed_14;
var $_4915 = $_16;
var fst_4916 = fst_26;
var Left_4917 = Left_8;
var Right_4918 = Right_9;
var loop_4919 = loop_31;
var find_4920 = find_33;
var hamtMask_4921 = hamtMask_62;
var popCount_4922 = popCount_61;
var hamtIndex_4923 = hamtIndex_63;
var lookup_4924 = lookup_64;
var setContains_4925 = setContains_80;
var foldTrie_4926 = foldTrie_70;
var emptySet_4927 = emptySet_76;
var Unit_4928 = Unit_0;
var not_4929 = not_30;
var $div$eq_4930 = $div$eq_17;
var mapIx_4931 = mapIx_34;
var insert_4932 = insert_65;
var setAdd_4933 = setAdd_77;
var setIntersection_4934 = setIntersection_84;
var remove_4935 = remove_67;
var setDiff_4936 = setDiff_83;
var setToArray_4937 = setToArray_82;
var mergeTrie_4938 = mergeTrie_74;
var setUnion_4939 = setUnion_81;
var setRemove_4940 = setRemove_79;
var setAddAll_4941 = setAddAll_78;
var trieKeys_4942 = trieKeys_75;
var size_4943 = size_72;
var mapTrie_4944 = mapTrie_71;
var nodeMask_4945 = nodeMask_60;
var isEmpty_4946 = isEmpty_73;
var filterTrie_4947 = filterTrie_69;
var nextSetBitMask_4948 = nextSetBitMask_68;
var updateOrSet_4949 = updateOrSet_66;
var State_4950 = State_10;
var runState_4951 = runState_58;
var evalState_4952 = evalState_59;
var sets_4953 = sets_57;
var gets_4954 = gets_56;
var foldM_4955 = foldM_53;
var mapM_4956 = mapM_54;
var forM_4957 = forM_55;
var strToArray_4958 = strToArray_52;
var toRecord_4959 = toRecord_51;
var reverse_4960 = reverse_50;
var tail_4961 = tail_45;
var head_4962 = head_44;
var uniq_4963 = uniq_49;
var mergeSet_4964 = mergeSet_48;
var init_4965 = init_47;
var last_4966 = last_46;
var mapJust_4967 = mapJust_43;
var concatMap_4968 = concatMap_42;
var zip_4969 = zip_41;
var zipWithIndex2_4970 = zipWithIndex2_39;
var zipWithIndex_4971 = zipWithIndex_40;
var join_4972 = join_38;
var all_4973 = all_37;
var exists_4974 = exists_36;
var containsChar_4975 = containsChar_35;
var contains_4976 = contains_32;
var either_4977 = either_28;
var splitEither_4978 = splitEither_29;
var fromJust_4979 = fromJust_24;
var justOr_4980 = justOr_23;
var maybe_4981 = maybe_22;
var $gt$gt_4982 = $gt$gt_21;
var $gt$eq_4983 = $gt$eq_20;
var $lt$eq_4984 = $lt$eq_19;
var $gt_4985 = $gt_18;
var Identity_4986 = Identity_15;
var Tuple6_4987 = Tuple6_7;
var Tuple5_4988 = Tuple5_6;
var Tuple4_4989 = Tuple4_5;
var Tuple3_4990 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var JSIf_4991 = JSIf_4864;
var JSAssign_4992 = JSAssign_4863;
var JSBreak_4993 = JSBreak_4862;
var JSSwitch_4994 = JSSwitch_4861;
var JSVar_4995 = JSVar_4860;
var JSReturn_4996 = JSReturn_4859;
var JSExpr_4997 = JSExpr_4858;
var JSSeq_4998 = JSSeq_4857;
var JSNew_4999 = JSNew_4856;
var JSInstanceOf_5000 = JSInstanceOf_4855;
var JSUndefined_5001 = JSUndefined_4854;
var JSNull_5002 = JSNull_4853;
var JSArray_5003 = JSArray_4852;
var JSObject_5004 = JSObject_4851;
var JSBool_5005 = JSBool_4850;
var JSString_5006 = JSString_4849;
var JSNum_5007 = JSNum_4848;
var JSTernary_5008 = JSTernary_4847;
var JSFun_5009 = JSFun_4846;
var JSCall_5010 = JSCall_4845;
var JSBinOp_5011 = JSBinOp_4844;
var JSUnOp_5012 = JSUnOp_4843;
var JSIndex_5013 = JSIndex_4842;
var JSRef_5014 = JSRef_4841;
var tryDCE_5015 = function(e_5018){
  if(((e_5018.$tag==3)&&("&&"==e_5018.$0))&&((e_5018.$1.$tag==9)&&e_5018.$1.$0)){
    var $phi$558 = e_5018.$2
  } else if(((e_5018.$tag==3)&&("&&"==e_5018.$0))&&((e_5018.$2.$tag==9)&&e_5018.$2.$0)){
    var $phi$558 = e_5018.$1
  } else if((e_5018.$tag==6)&&((e_5018.$0.$tag==9)&&e_5018.$0.$0)){
    var $phi$558 = e_5018.$1
  } else if((e_5018.$tag==6)&&((e_5018.$0.$tag==9)&&(!e_5018.$0.$0))){
    var $phi$558 = e_5018.$2
  } else var $phi$558 = e_5018;
  return $phi$558
};
var rewriteDCE_5016 = function(e_5026){
  if(e_5026.$tag==1){
    var $phi$559 = (JSIndex_5013(rewriteDCE_5016(e_5026.$0)))(rewriteDCE_5016(e_5026.$1))
  } else if(e_5026.$tag==3){
    var $phi$559 = tryDCE_5015(((JSBinOp_5011(e_5026.$0))(rewriteDCE_5016(e_5026.$1)))(rewriteDCE_5016(e_5026.$2)))
  } else if(e_5026.$tag==4){
    var $phi$559 = (JSCall_5010(rewriteDCE_5016(e_5026.$0)))((map(rewriteDCE_5016))(e_5026.$1))
  } else if(e_5026.$tag==5){
    var $phi$559 = (JSFun_5009(e_5026.$0))((concatMap_4968(rewriteStmt_5017))(e_5026.$1))
  } else if(e_5026.$tag==6){
    var $phi$559 = tryDCE_5015(((JSTernary_5008(rewriteDCE_5016(e_5026.$0)))(rewriteDCE_5016(e_5026.$1)))(rewriteDCE_5016(e_5026.$2)))
  } else if(e_5026.$tag==10){
    var $phi$559 = JSObject_5004((map(function(kv_5040){
      var $phi$560 = (Pair_4902(kv_5040.$0))(rewriteDCE_5016(kv_5040.$1));
      return $phi$560
    }))(e_5026.$0))
  } else if(e_5026.$tag==14){
    var $phi$559 = (JSInstanceOf_5000(rewriteDCE_5016(e_5026.$0)))(rewriteDCE_5016(e_5026.$1))
  } else if(e_5026.$tag==15){
    var $phi$559 = (JSNew_4999(rewriteDCE_5016(e_5026.$0)))((map(rewriteDCE_5016))(e_5026.$1))
  } else if(e_5026.$tag==11){
    var $phi$559 = JSArray_5003((map(rewriteDCE_5016))(e_5026.$0))
  } else var $phi$559 = e_5026;
  return $phi$559
};
var rewriteStmt_5017 = function(s_5049){
  if(s_5049.$tag==0){
    var $phi$561 = [JSExpr_4997(rewriteDCE_5016(s_5049.$0))]
  } else if(s_5049.$tag==1){
    var $phi$561 = [JSReturn_4996(rewriteDCE_5016(s_5049.$0))]
  } else if(s_5049.$tag==2){
    var $phi$561 = [(JSVar_4995(s_5049.$0))(rewriteDCE_5016(s_5049.$1))]
  } else if(s_5049.$tag==5){
    var $phi$561 = [(JSAssign_4992(rewriteDCE_5016(s_5049.$0)))(rewriteDCE_5016(s_5049.$1))]
  } else if((s_5049.$tag==6)&&((s_5049.$0.$tag==9)&&s_5049.$0.$0)){
    var $phi$561 = (concatMap_4968(rewriteStmt_5017))(s_5049.$1)
  } else if((s_5049.$tag==6)&&((s_5049.$0.$tag==9)&&(!s_5049.$0.$0))){
    var $phi$561 = (concatMap_4968(rewriteStmt_5017))(s_5049.$2)
  } else if(s_5049.$tag==6){
    var $phi$563 = rewriteDCE_5016(s_5049.$0);
    if(($phi$563.$tag==9)&&$phi$563.$0){
      var $phi$562 = (concatMap_4968(rewriteStmt_5017))(s_5049.$1)
    } else if(($phi$563.$tag==9)&&(!$phi$563.$0)){
      var $phi$562 = (concatMap_4968(rewriteStmt_5017))(s_5049.$2)
    } else var $phi$562 = [((JSIf_4991($phi$563))((concatMap_4968(rewriteStmt_5017))(s_5049.$1)))((concatMap_4968(rewriteStmt_5017))(s_5049.$2))];
    var $phi$561 = $phi$562
  } else var $phi$561 = [s_5049];
  return $phi$561
};
var assert_5065 = assert_89;
var Pair_5066 = Pair_3;
var mapSnd_5067 = mapSnd_88;
var mapFst_5068 = mapFst_87;
var $gt$eq$gt_5069 = $gt$eq$gt_86;
var snd_5070 = snd_27;
var debug2_5071 = debug2_85;
var Just_5072 = Just_1;
var Nothing_5073 = Nothing_2;
var isJust_5074 = isJust_25;
var Empty_5075 = Empty_11;
var Leaf_5076 = Leaf_12;
var Collision_5077 = Collision_13;
var BitmapIndexed_5078 = BitmapIndexed_14;
var $_5079 = $_16;
var fst_5080 = fst_26;
var Left_5081 = Left_8;
var Right_5082 = Right_9;
var loop_5083 = loop_31;
var find_5084 = find_33;
var hamtMask_5085 = hamtMask_62;
var popCount_5086 = popCount_61;
var hamtIndex_5087 = hamtIndex_63;
var lookup_5088 = lookup_64;
var setContains_5089 = setContains_80;
var foldTrie_5090 = foldTrie_70;
var emptySet_5091 = emptySet_76;
var Unit_5092 = Unit_0;
var not_5093 = not_30;
var $div$eq_5094 = $div$eq_17;
var mapIx_5095 = mapIx_34;
var insert_5096 = insert_65;
var setAdd_5097 = setAdd_77;
var setIntersection_5098 = setIntersection_84;
var remove_5099 = remove_67;
var setDiff_5100 = setDiff_83;
var setToArray_5101 = setToArray_82;
var mergeTrie_5102 = mergeTrie_74;
var setUnion_5103 = setUnion_81;
var setRemove_5104 = setRemove_79;
var setAddAll_5105 = setAddAll_78;
var trieKeys_5106 = trieKeys_75;
var size_5107 = size_72;
var mapTrie_5108 = mapTrie_71;
var nodeMask_5109 = nodeMask_60;
var isEmpty_5110 = isEmpty_73;
var filterTrie_5111 = filterTrie_69;
var nextSetBitMask_5112 = nextSetBitMask_68;
var updateOrSet_5113 = updateOrSet_66;
var State_5114 = State_10;
var runState_5115 = runState_58;
var evalState_5116 = evalState_59;
var sets_5117 = sets_57;
var gets_5118 = gets_56;
var foldM_5119 = foldM_53;
var mapM_5120 = mapM_54;
var forM_5121 = forM_55;
var strToArray_5122 = strToArray_52;
var toRecord_5123 = toRecord_51;
var reverse_5124 = reverse_50;
var tail_5125 = tail_45;
var head_5126 = head_44;
var uniq_5127 = uniq_49;
var mergeSet_5128 = mergeSet_48;
var init_5129 = init_47;
var last_5130 = last_46;
var mapJust_5131 = mapJust_43;
var concatMap_5132 = concatMap_42;
var zip_5133 = zip_41;
var zipWithIndex2_5134 = zipWithIndex2_39;
var zipWithIndex_5135 = zipWithIndex_40;
var join_5136 = join_38;
var all_5137 = all_37;
var exists_5138 = exists_36;
var containsChar_5139 = containsChar_35;
var contains_5140 = contains_32;
var either_5141 = either_28;
var splitEither_5142 = splitEither_29;
var fromJust_5143 = fromJust_24;
var justOr_5144 = justOr_23;
var maybe_5145 = maybe_22;
var $gt$gt_5146 = $gt$gt_21;
var $gt$eq_5147 = $gt$eq_20;
var $lt$eq_5148 = $lt$eq_19;
var $gt_5149 = $gt_18;
var Identity_5150 = Identity_15;
var Tuple6_5151 = Tuple6_7;
var Tuple5_5152 = Tuple5_6;
var Tuple4_5153 = Tuple4_5;
var Tuple3_5154 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var JSIf_5155 = JSIf_4864;
var JSAssign_5156 = JSAssign_4863;
var JSBreak_5157 = JSBreak_4862;
var JSSwitch_5158 = JSSwitch_4861;
var JSVar_5159 = JSVar_4860;
var JSReturn_5160 = JSReturn_4859;
var JSExpr_5161 = JSExpr_4858;
var JSSeq_5162 = JSSeq_4857;
var JSNew_5163 = JSNew_4856;
var JSInstanceOf_5164 = JSInstanceOf_4855;
var JSUndefined_5165 = JSUndefined_4854;
var JSNull_5166 = JSNull_4853;
var JSArray_5167 = JSArray_4852;
var JSObject_5168 = JSObject_4851;
var JSBool_5169 = JSBool_4850;
var JSString_5170 = JSString_4849;
var JSNum_5171 = JSNum_4848;
var JSTernary_5172 = JSTernary_4847;
var JSFun_5173 = JSFun_4846;
var JSCall_5174 = JSCall_4845;
var JSBinOp_5175 = JSBinOp_4844;
var JSUnOp_5176 = JSUnOp_4843;
var JSIndex_5177 = JSIndex_4842;
var JSRef_5178 = JSRef_4841;
var printIndent_5184 = function(indent_5255){
  if(0==indent_5255){
    var $phi$564 = ""
  } else var $phi$564 = ($concat("  "))(printIndent_5184(indent_5255-1));
  return $phi$564
};
var paren_5185 = function(s_5257){
  return ($concat(($concat("("))(s_5257)))(")")
};
var jsExprToString_5179 = function(indent_5186){
  return function(e_5187){
    var printParen_5189 = function(e_5191){
      return (jsExprToParenString_5180(indent_5186))(e_5191)
    };
    var print_5188 = function(e_5190){
      return (jsExprToString_5179(indent_5186))(e_5190)
    };
    if(e_5187.$tag==12){
      var $phi$565 = "null"
    } else if(e_5187.$tag==13){
      var $phi$565 = "undefined"
    } else if((e_5187.$tag==9)&&e_5187.$0){
      var $phi$565 = "true"
    } else if((e_5187.$tag==9)&&(!e_5187.$0)){
      var $phi$565 = "false"
    } else if(e_5187.$tag==7){
      var $phi$565 = jsonStringify(e_5187.$0)
    } else if(e_5187.$tag==8){
      var $phi$565 = jsonStringify(e_5187.$0)
    } else if(e_5187.$tag==0){
      var $phi$565 = e_5187.$0
    } else if((e_5187.$tag==1)&&(e_5187.$1.$tag==8)){
      var $phi$567 = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))(e_5187.$1.$0);
      if(""==$phi$567){
        var $phi$566 = ($concat(($concat(($concat(printParen_5189(e_5187.$0)))("[")))(e_5187.$1.$0)))("]")
      } else var $phi$566 = ($concat(($concat(printParen_5189(e_5187.$0)))(".")))($phi$567);
      var $phi$565 = $phi$566
    } else if(e_5187.$tag==1){
      var $phi$565 = ($concat(($concat(($concat(printParen_5189(e_5187.$0)))("[")))(print_5188(e_5187.$1))))("]")
    } else if(e_5187.$tag==2){
      var $phi$565 = ($concat(e_5187.$0))(printParen_5189(e_5187.$1))
    } else if(e_5187.$tag==3){
      var $phi$565 = ($concat(($concat(printParen_5189(e_5187.$1)))(e_5187.$0)))(printParen_5189(e_5187.$2))
    } else if(e_5187.$tag==4){
      var $phi$565 = ($concat(printParen_5189(e_5187.$0)))(paren_5185((intercalate(","))((map(print_5188))(e_5187.$1))))
    } else if(e_5187.$tag==15){
      var $phi$565 = ($concat(($concat("new "))(printParen_5189(e_5187.$0))))(paren_5185((intercalate(","))((map(print_5188))(e_5187.$1))))
    } else if(e_5187.$tag==5){
      var $phi$565 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat("function("))((intercalate(","))(e_5187.$0))))("){\n")))(printIndent_5184(indent_5186+1))))((intercalate(($concat(";\n"))(printIndent_5184(indent_5186+1))))((map(jsStmtToString_5182(indent_5186+1)))(e_5187.$1)))))("\n")))(printIndent_5184(indent_5186))))("}")
    } else if(e_5187.$tag==6){
      var $phi$565 = ($concat(($concat(($concat(($concat(printParen_5189(e_5187.$0)))("?")))(printParen_5189(e_5187.$1))))(":")))(printParen_5189(e_5187.$2))
    } else if(e_5187.$tag==10){
      var $phi$565 = ($concat(($concat("{"))((intercalate(","))((map(keyValueToString_5181(indent_5186)))(e_5187.$0)))))("}")
    } else if(e_5187.$tag==11){
      var $phi$565 = ($concat(($concat("["))((intercalate(","))((map(print_5188))(e_5187.$0)))))("]")
    } else if(e_5187.$tag==14){
      var $phi$565 = ($concat(($concat(printParen_5189(e_5187.$0)))(" instanceof ")))(printParen_5189(e_5187.$1))
    } else if(e_5187.$tag==16){
      var $phi$565 = (intercalate(","))((map(print_5188))(e_5187.$0))
    } else var $phi$565 = error(e_5187);
    return $phi$565
  }
};
var jsExprToParenString_5180 = function(indent_5220){
  return function(e_5221){
    if(e_5221.$tag==0){
      var $phi$568 = (jsExprToString_5179(indent_5220))(e_5221)
    } else if(e_5221.$tag==7){
      var $phi$568 = (jsExprToString_5179(indent_5220))(e_5221)
    } else if(e_5221.$tag==8){
      var $phi$568 = (jsExprToString_5179(indent_5220))(e_5221)
    } else if(e_5221.$tag==9){
      var $phi$568 = (jsExprToString_5179(indent_5220))(e_5221)
    } else if(e_5221.$tag==1){
      var $phi$568 = (jsExprToString_5179(indent_5220))(e_5221)
    } else if(e_5221.$tag==15){
      var $phi$568 = (jsExprToString_5179(indent_5220))(e_5221)
    } else if(e_5221.$tag==10){
      var $phi$568 = (jsExprToString_5179(indent_5220))(e_5221)
    } else var $phi$568 = paren_5185((jsExprToString_5179(indent_5220))(e_5221));
    return $phi$568
  }
};
var keyValueToString_5181 = function(indent_5232){
  return function(kv_5233){
    var $phi$569 = ($concat(($concat(kv_5233.$0))(":")))((jsExprToString_5179(indent_5232))(kv_5233.$1));
    return $phi$569
  }
};
var jsStmtToString_5182 = function(indent_5236){
  return function(s_5237){
    if(s_5237.$tag==0){
      var $phi$570 = (jsExprToString_5179(indent_5236))(s_5237.$0)
    } else if(s_5237.$tag==1){
      var $phi$570 = ($concat("return "))((jsExprToString_5179(indent_5236))(s_5237.$0))
    } else if(s_5237.$tag==2){
      var $phi$570 = ($concat(($concat(($concat("var "))(s_5237.$0)))(" = ")))((jsExprToString_5179(indent_5236))(s_5237.$1))
    } else if(s_5237.$tag==4){
      var $phi$570 = "break"
    } else if(s_5237.$tag==3){
      var $phi$570 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat("switch"))(paren_5185((jsExprToString_5179(indent_5236))(s_5237.$0)))))("{\n")))(printIndent_5184(indent_5236+1))))((intercalate(($concat(";\n"))(printIndent_5184(indent_5236+1))))((map(caseToString_5183(indent_5236+1)))(s_5237.$1)))))("\n")))(printIndent_5184(indent_5236))))("}")
    } else if(s_5237.$tag==5){
      var $phi$570 = ($concat(($concat((jsExprToParenString_5180(indent_5236))(s_5237.$0)))(" = ")))((jsExprToParenString_5180(indent_5236))(s_5237.$1))
    } else if(s_5237.$tag==6){
      var $phi$572 = length(s_5237.$2);
      if(1==$phi$572){
        var $phi$571 = (jsStmtToString_5182(indent_5236))((getIx(0))(s_5237.$2))
      } else var $phi$571 = ($concat(($concat(($concat(($concat(($concat("{\n"))(printIndent_5184(indent_5236+1))))((intercalate(($concat(";\n"))(printIndent_5184(indent_5236+1))))((map(jsStmtToString_5182(indent_5236+1)))(s_5237.$2)))))("\n")))(printIndent_5184(indent_5236))))("}");
      var els_5249 = $phi$571;
      var $phi$570 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat(($concat("if("))((jsExprToString_5179(indent_5236))(s_5237.$0))))("){\n")))(printIndent_5184(indent_5236+1))))((intercalate(($concat(";\n"))(printIndent_5184(indent_5236+1))))((map(jsStmtToString_5182(indent_5236+1)))(s_5237.$1)))))("\n")))(printIndent_5184(indent_5236))))("} else ")))(els_5249)
    } else error("pattern match fail",s_5237);
    return $phi$570
  }
};
var caseToString_5183 = function(indent_5251){
  return function(c_5252){
    var $phi$573 = ($concat(($concat(($concat(($concat("case "))(paren_5185((jsExprToString_5179(indent_5251))(c_5252.$0)))))(":\n")))(printIndent_5184(indent_5251+1))))((intercalate(($concat(";\n"))(printIndent_5184(indent_5251+1))))((map(jsStmtToString_5182(indent_5251)))(c_5252.$1)));
    return $phi$573
  }
};
var assert_5258 = assert_89;
var Pair_5259 = Pair_3;
var mapSnd_5260 = mapSnd_88;
var mapFst_5261 = mapFst_87;
var $gt$eq$gt_5262 = $gt$eq$gt_86;
var snd_5263 = snd_27;
var debug2_5264 = debug2_85;
var Just_5265 = Just_1;
var Nothing_5266 = Nothing_2;
var isJust_5267 = isJust_25;
var Empty_5268 = Empty_11;
var Leaf_5269 = Leaf_12;
var Collision_5270 = Collision_13;
var BitmapIndexed_5271 = BitmapIndexed_14;
var $_5272 = $_16;
var fst_5273 = fst_26;
var Left_5274 = Left_8;
var Right_5275 = Right_9;
var loop_5276 = loop_31;
var find_5277 = find_33;
var hamtMask_5278 = hamtMask_62;
var popCount_5279 = popCount_61;
var hamtIndex_5280 = hamtIndex_63;
var lookup_5281 = lookup_64;
var setContains_5282 = setContains_80;
var foldTrie_5283 = foldTrie_70;
var emptySet_5284 = emptySet_76;
var Unit_5285 = Unit_0;
var not_5286 = not_30;
var $div$eq_5287 = $div$eq_17;
var mapIx_5288 = mapIx_34;
var insert_5289 = insert_65;
var setAdd_5290 = setAdd_77;
var setIntersection_5291 = setIntersection_84;
var remove_5292 = remove_67;
var setDiff_5293 = setDiff_83;
var setToArray_5294 = setToArray_82;
var mergeTrie_5295 = mergeTrie_74;
var setUnion_5296 = setUnion_81;
var setRemove_5297 = setRemove_79;
var setAddAll_5298 = setAddAll_78;
var trieKeys_5299 = trieKeys_75;
var size_5300 = size_72;
var mapTrie_5301 = mapTrie_71;
var nodeMask_5302 = nodeMask_60;
var isEmpty_5303 = isEmpty_73;
var filterTrie_5304 = filterTrie_69;
var nextSetBitMask_5305 = nextSetBitMask_68;
var updateOrSet_5306 = updateOrSet_66;
var State_5307 = State_10;
var runState_5308 = runState_58;
var evalState_5309 = evalState_59;
var sets_5310 = sets_57;
var gets_5311 = gets_56;
var foldM_5312 = foldM_53;
var mapM_5313 = mapM_54;
var forM_5314 = forM_55;
var strToArray_5315 = strToArray_52;
var toRecord_5316 = toRecord_51;
var reverse_5317 = reverse_50;
var tail_5318 = tail_45;
var head_5319 = head_44;
var uniq_5320 = uniq_49;
var mergeSet_5321 = mergeSet_48;
var init_5322 = init_47;
var last_5323 = last_46;
var mapJust_5324 = mapJust_43;
var concatMap_5325 = concatMap_42;
var zip_5326 = zip_41;
var zipWithIndex2_5327 = zipWithIndex2_39;
var zipWithIndex_5328 = zipWithIndex_40;
var join_5329 = join_38;
var all_5330 = all_37;
var exists_5331 = exists_36;
var containsChar_5332 = containsChar_35;
var contains_5333 = contains_32;
var either_5334 = either_28;
var splitEither_5335 = splitEither_29;
var fromJust_5336 = fromJust_24;
var justOr_5337 = justOr_23;
var maybe_5338 = maybe_22;
var $gt$gt_5339 = $gt$gt_21;
var $gt$eq_5340 = $gt$eq_20;
var $lt$eq_5341 = $lt$eq_19;
var $gt_5342 = $gt_18;
var Identity_5343 = Identity_15;
var Tuple6_5344 = Tuple6_7;
var Tuple5_5345 = Tuple5_6;
var Tuple4_5346 = Tuple4_5;
var Tuple3_5347 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_5348 = App_761;
var Lam_5349 = Lam_762;
var Case_5350 = Case_763;
var Let_5351 = Let_764;
var New_5352 = New_765;
var breakableDownAndUpM_5353 = breakableDownAndUpM_812;
var breakableDownM_5354 = breakableDownM_816;
var downAndUpM_5355 = downAndUpM_813;
var downM_5356 = downM_815;
var upM_5357 = upM_814;
var breakableDownAndUp_5358 = breakableDownAndUp_807;
var breakableDown_5359 = breakableDown_811;
var downAndUp_5360 = downAndUp_808;
var down_5361 = down_810;
var up_5362 = up_809;
var AnnType_5363 = AnnType_753;
var TUnknown_5364 = TUnknown_785;
var getAnn_5365 = getAnn_790;
var getAnnType_5366 = getAnnType_793;
var Var_5367 = Var_759;
var Const_5368 = Const_760;
var annOf_5369 = annOf_804;
var getType_5370 = getType_806;
var withAnn_5371 = withAnn_805;
var setAnn_5372 = setAnn_791;
var setAnnType_5373 = setAnnType_794;
var setType_5374 = setType_803;
var Data_5375 = Data_773;
var DataCon_5376 = DataCon_774;
var dataConName_5377 = dataConName_801;
var dataConNames_5378 = dataConNames_802;
var TCBound_5379 = TCBound_777;
var TConst_5380 = TConst_778;
var TVar_5381 = TVar_779;
var TSkolem_5382 = TSkolem_780;
var TApp_5383 = TApp_781;
var TRow_5384 = TRow_782;
var TBot_5385 = TBot_783;
var TForall_5386 = TForall_784;
var equivBound_5387 = equivBound_799;
var equivType_5388 = equivType_800;
var getAnnCodeLoc_5389 = getAnnCodeLoc_795;
var AnnCodeLoc_5390 = AnnCodeLoc_754;
var printCodeLoc_5391 = printCodeLoc_797;
var exprLoc_5392 = exprLoc_798;
var setAnnCodeLoc_5393 = setAnnCodeLoc_796;
var copyAnn_5394 = copyAnn_792;
var emptyAnn_5395 = emptyAnn_789;
var ImportAll_5396 = ImportAll_788;
var ImportOpen_5397 = ImportOpen_787;
var ImportClosed_5398 = ImportClosed_786;
var Instance_5399 = Instance_776;
var Class_5400 = Class_775;
var ModuleInterface_5401 = ModuleInterface_772;
var Module_5402 = Module_771;
var PData_5403 = PData_770;
var PConst_5404 = PConst_769;
var PVar_5405 = PVar_768;
var CStr_5406 = CStr_767;
var CNum_5407 = CNum_766;
var AnnExport_5408 = AnnExport_758;
var AnnTag_5409 = AnnTag_757;
var AnnData_5410 = AnnData_756;
var AnnUseCount_5411 = AnnUseCount_755;
var JSIf_5412 = JSIf_4864;
var JSAssign_5413 = JSAssign_4863;
var JSBreak_5414 = JSBreak_4862;
var JSSwitch_5415 = JSSwitch_4861;
var JSVar_5416 = JSVar_4860;
var JSReturn_5417 = JSReturn_4859;
var JSExpr_5418 = JSExpr_4858;
var JSSeq_5419 = JSSeq_4857;
var JSNew_5420 = JSNew_4856;
var JSInstanceOf_5421 = JSInstanceOf_4855;
var JSUndefined_5422 = JSUndefined_4854;
var JSNull_5423 = JSNull_4853;
var JSArray_5424 = JSArray_4852;
var JSObject_5425 = JSObject_4851;
var JSBool_5426 = JSBool_4850;
var JSString_5427 = JSString_4849;
var JSNum_5428 = JSNum_4848;
var JSTernary_5429 = JSTernary_4847;
var JSFun_5430 = JSFun_4846;
var JSCall_5431 = JSCall_4845;
var JSBinOp_5432 = JSBinOp_4844;
var JSUnOp_5433 = JSUnOp_4843;
var JSIndex_5434 = JSIndex_4842;
var JSRef_5435 = JSRef_4841;
var RewriteState_5436 = function($_0_5457){
  return function($_1_5458){
    return function($_2_5459){
      return function($_3_5460){
        return {$0:$_0_5457,$1:$_1_5458,$2:$_2_5459,$3:$_3_5460}
      }
    }
  }
};
var opChar_5456 = function(c_5703){
  if("-"==c_5703){
    var $phi$574 = "$mns"
  } else if("+"==c_5703){
    var $phi$574 = "$pls"
  } else if("*"==c_5703){
    var $phi$574 = "$mul"
  } else if("/"==c_5703){
    var $phi$574 = "$div"
  } else if("="==c_5703){
    var $phi$574 = "$eq"
  } else if(":"==c_5703){
    var $phi$574 = "$col"
  } else if("&"==c_5703){
    var $phi$574 = "$amp"
  } else if("|"==c_5703){
    var $phi$574 = "$pip"
  } else if("<"==c_5703){
    var $phi$574 = "$lt"
  } else if(">"==c_5703){
    var $phi$574 = "$gt"
  } else if("^"==c_5703){
    var $phi$574 = "$rof"
  } else var $phi$574 = c_5703;
  return $phi$574
};
var opName_5455 = function(op_5699){
  if("+"==op_5699){
    var $phi$575 = "$add"
  } else if("-"==op_5699){
    var $phi$575 = "$del"
  } else if("*"==op_5699){
    var $phi$575 = "$mul"
  } else if("&&"==op_5699){
    var $phi$575 = "$and"
  } else if("||"==op_5699){
    var $phi$575 = "$or"
  } else if("++"==op_5699){
    var $phi$575 = "$concat"
  } else var $phi$575 = ((foldl(function(s_5701){
    return function(c_5702){
      return ($concat(s_5701))(opChar_5456(c_5702))
    }
  }))(""))(strToArray_5315(op_5699));
  return $phi$575
};
var processPattern_5448 = function(cons_5623){
  return function(pm_5624){
    return function(p_5625){
      if((p_5625.$tag==0)&&("_"==p_5625.$1)){
        var $phi$576 = (Pair_5259(JSBool_5426(true)))((Pair_5259([]))([]))
      } else if(p_5625.$tag==0){
        var $phi$576 = (Pair_5259(JSBool_5426(true)))((Pair_5259([opName_5455(p_5625.$1)]))([pm_5624]))
      } else if((p_5625.$tag==1)&&(p_5625.$1.$tag==0)){
        var $phi$576 = (Pair_5259(((JSBinOp_5432("=="))(JSNum_5428(p_5625.$1.$0)))(pm_5624)))((Pair_5259([]))([]))
      } else if((p_5625.$tag==1)&&(p_5625.$1.$tag==1)){
        var $phi$576 = (Pair_5259(((JSBinOp_5432("=="))(JSString_5427(p_5625.$1.$0)))(pm_5624)))((Pair_5259([]))([]))
      } else if((p_5625.$tag==2)&&("True"==p_5625.$1)){
        var $phi$576 = (Pair_5259(pm_5624))((Pair_5259([]))([]))
      } else if((p_5625.$tag==2)&&("False"==p_5625.$1)){
        var $phi$576 = (Pair_5259((JSUnOp_5433("!"))(pm_5624)))((Pair_5259([]))([]))
      } else if(p_5625.$tag==2){
        var $phi$578 = (((lookup_5281($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_5625.$1))(cons_5623);
        if(($phi$578.$tag==0)&&($phi$578.$0.$tag==1)){
          var $phi$577 = JSBool_5426(true)
        } else if(($phi$578.$tag==0)&&($phi$578.$0.$tag==0)){
          var $phi$577 = ((JSBinOp_5432("=="))((JSIndex_5434(pm_5624))(JSString_5427("$tag"))))(JSNum_5428($phi$578.$0.$0))
        } else var $phi$577 = error(($concat("unknown data type in code gen: "))(p_5625.$1));
        var tagCheck_5640 = $phi$577;
        var $phi$576 = ((foldl(function(a_5643){
          return function(b_5644){
            var $phi$580 = (Pair_5259(((JSBinOp_5432("&&"))(a_5643.$0))(b_5644.$0)))((Pair_5259((concat(a_5643.$1.$0))(b_5644.$1.$0)))((concat(a_5643.$1.$1))(b_5644.$1.$1)));
            var $phi$579 = $phi$580;
            return $phi$579
          }
        }))((Pair_5259(tagCheck_5640))((Pair_5259([]))([]))))((map(function(p_5651){
          var $phi$581 = ((processPattern_5448(cons_5623))((JSIndex_5434(pm_5624))(JSString_5427(($concat("$"))(intToString(p_5651.$0))))))(p_5651.$1);
          return $phi$581
        }))(zipWithIndex_5328(p_5625.$2)))
      } else var $phi$576 = error("failure to match pattern during processing");
      return $phi$576
    }
  }
};
var addStmt_5438 = function(stmt_5466){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_5311))(function(s_5467){
    var $phi$582 = sets_5310((((RewriteState_5436(s_5467.$0))(s_5467.$1))((push(stmt_5466))(s_5467.$2)))(s_5467.$3));
    return $phi$582
  })
};
var addVar_5439 = function(n_5472){
  return function(e_5473){
    return addStmt_5438((JSVar_5416(opName_5455(n_5472)))(e_5473))
  }
};
var newPhi_5440 = (($gt$gt$eq($import1$instance$Monad$11))(gets_5311))(function(s_5474){
  var $phi$583 = (($gt$gt_5339($import1$instance$Monad$11))(sets_5310((((RewriteState_5436(s_5474.$0))(s_5474.$1))(s_5474.$2))(s_5474.$3+1))))((ret($import1$instance$Monad$11))(($concat("$phi$"))(intToString(s_5474.$3))));
  return $phi$583
});
var getRep_5443 = function(n_5505){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_5311))(function(s_5506){
    var $phi$584 = (ret($import1$instance$Monad$11))((((lookup_5281($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_5505))(s_5506.$1));
    return $phi$584
  })
};
var getCons_5444 = (($gt$gt$eq($import1$instance$Monad$11))(gets_5311))(function(s_5511){
  var $phi$585 = (ret($import1$instance$Monad$11))(s_5511.$0);
  return $phi$585
});
var dataConFieldIds_5452 = function(ts_5665){
  return (map(function(p_5666){
    return ($concat("$"))(intToString(fst_5273(p_5666)))
  }))(zipWithIndex_5328(ts_5665))
};
var withRep_5442 = function(rep_5492){
  return function(m_5493){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_5311))(function(s_5494){
      var $phi$586 = (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_5339($import1$instance$Monad$11))(sets_5310((((RewriteState_5436(s_5494.$0))((((mergeTrie_5295($import1$instance$Hashable$13))($import1$instance$Eq$1))(s_5494.$1))(rep_5492)))(s_5494.$2))(s_5494.$3))))(m_5493)))(function(r_5499){
        return (($gt$gt$eq($import1$instance$Monad$11))(gets_5311))(function(s_5500){
          var $phi$587 = (($gt$gt_5339($import1$instance$Monad$11))(sets_5310((((RewriteState_5436(s_5500.$0))(s_5494.$1))(s_5500.$2))(s_5500.$3))))((ret($import1$instance$Monad$11))(r_5499));
          return $phi$587
        })
      });
      return $phi$586
    })
  }
};
var binOp2_5437 = function(op_5461){
  return function(a_5462){
    return function(b_5463){
      return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5445(a_5462)))(function(a_5464){
        return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5445(b_5463)))(function(b_5465){
          return (ret($import1$instance$Monad$11))(((JSBinOp_5432(op_5461))(a_5464))(b_5465))
        })
      })
    }
  }
};
var rewriteExprToStmts_5441 = function(w_5479){
  return function(e_5480){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_5311))(function(s_5481){
      var $phi$588 = (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_5339($import1$instance$Monad$11))(sets_5310((((RewriteState_5436(s_5481.$0))(s_5481.$1))([]))(s_5481.$3))))(rewriteExpr_5445(e_5480))))(function(e_5486){
        return (($gt$gt$eq($import1$instance$Monad$11))(gets_5311))(function(s_5487){
          var $phi$589 = (($gt$gt_5339($import1$instance$Monad$11))(sets_5310((((RewriteState_5436(s_5487.$0))(s_5487.$1))(s_5481.$2))(s_5487.$3))))((ret($import1$instance$Monad$11))((push(w_5479(e_5486)))(s_5487.$2)));
          return $phi$589
        })
      });
      return $phi$588
    })
  }
};
var rewriteExpr_5445 = function(e_5516){
  if((e_5516.$tag==0)&&("True"==e_5516.$1)){
    var $phi$590 = (ret($import1$instance$Monad$11))(JSBool_5426(true))
  } else if((e_5516.$tag==0)&&("False"==e_5516.$1)){
    var $phi$590 = (ret($import1$instance$Monad$11))(JSBool_5426(false))
  } else if(e_5516.$tag==0){
    var $phi$590 = (($gt$gt$eq($import1$instance$Monad$11))(getRep_5443(opName_5455(e_5516.$1))))(function(r_5521){
      if(r_5521.$tag==1){
        var $phi$595 = (ret($import1$instance$Monad$11))(JSRef_5435(opName_5455(e_5516.$1)))
      } else if(r_5521.$tag==0){
        var $phi$595 = (ret($import1$instance$Monad$11))(r_5521.$0)
      } else error("pattern match fail",r_5521);
      return $phi$595
    })
  } else if((e_5516.$tag==1)&&(e_5516.$1.$tag==0)){
    var $phi$590 = (ret($import1$instance$Monad$11))(JSNum_5428(e_5516.$1.$0))
  } else if((e_5516.$tag==1)&&(e_5516.$1.$tag==1)){
    var $phi$590 = (ret($import1$instance$Monad$11))(JSString_5427(e_5516.$1.$0))
  } else if((e_5516.$tag==2)&&((e_5516.$1.$tag==2)&&((e_5516.$1.$1.$tag==0)&&("+"==e_5516.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5437("+"))(e_5516.$1.$2))(e_5516.$2)
  } else if((e_5516.$tag==2)&&((e_5516.$1.$tag==2)&&((e_5516.$1.$1.$tag==0)&&("-"==e_5516.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5437("-"))(e_5516.$1.$2))(e_5516.$2)
  } else if((e_5516.$tag==2)&&((e_5516.$1.$tag==2)&&((e_5516.$1.$1.$tag==0)&&("*"==e_5516.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5437("*"))(e_5516.$1.$2))(e_5516.$2)
  } else if((e_5516.$tag==2)&&((e_5516.$1.$tag==2)&&((e_5516.$1.$1.$tag==0)&&("jsLt"==e_5516.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5437("<"))(e_5516.$1.$2))(e_5516.$2)
  } else if((e_5516.$tag==2)&&((e_5516.$1.$tag==2)&&((e_5516.$1.$1.$tag==0)&&("jsEq"==e_5516.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5437("==="))(e_5516.$1.$2))(e_5516.$2)
  } else if((e_5516.$tag==2)&&((e_5516.$1.$tag==2)&&((e_5516.$1.$1.$tag==0)&&("bitAnd"==e_5516.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5437("&"))(e_5516.$1.$2))(e_5516.$2)
  } else if((e_5516.$tag==2)&&((e_5516.$1.$tag==2)&&((e_5516.$1.$1.$tag==0)&&("bitOr"==e_5516.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5437("|"))(e_5516.$1.$2))(e_5516.$2)
  } else if((e_5516.$tag==2)&&((e_5516.$1.$tag==2)&&((e_5516.$1.$1.$tag==0)&&("bitShiftLeft"==e_5516.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5437("<<"))(e_5516.$1.$2))(e_5516.$2)
  } else if((e_5516.$tag==2)&&((e_5516.$1.$tag==2)&&((e_5516.$1.$1.$tag==0)&&("bitShiftRight"==e_5516.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5437(">>>"))(e_5516.$1.$2))(e_5516.$2)
  } else if(e_5516.$tag==2){
    var $phi$590 = (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5445(e_5516.$1)))(function(f_5575){
      return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5445(e_5516.$2)))(function(a_5576){
        return (ret($import1$instance$Monad$11))((JSCall_5431(f_5575))([a_5576]))
      })
    })
  } else if(e_5516.$tag==3){
    var $phi$590 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExprToStmts_5441(JSReturn_5417))(e_5516.$2)))(function(stmts_5580){
      return (ret($import1$instance$Monad$11))((JSFun_5430([e_5516.$1]))(stmts_5580))
    })
  } else if(e_5516.$tag==4){
    var $phi$590 = (($gt$gt$eq($import1$instance$Monad$11))(newPhi_5440))(function(phiOut_5584){
      return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5445(e_5516.$1)))(function(e_5585){
        if(e_5585.$tag==0){
          var $phi$594 = (ret($import1$instance$Monad$11))(e_5585)
        } else if(e_5585.$tag==1){
          var $phi$594 = (ret($import1$instance$Monad$11))(e_5585)
        } else var $phi$594 = (($gt$gt$eq($import1$instance$Monad$11))(newPhi_5440))(function(p_5590){
          return (($gt$gt_5339($import1$instance$Monad$11))((addVar_5439(p_5590))(e_5585)))((ret($import1$instance$Monad$11))(JSRef_5435(p_5590)))
        });
        return (($gt$gt$eq($import1$instance$Monad$11))($phi$594))(function(phiIn_5591){
          return (($gt$gt_5339($import1$instance$Monad$11))((($gt$gt$eq($import1$instance$Monad$11))((((foldM_5312($import1$instance$Monad$11))((assemblePatternMatch2_5446(phiIn_5591))(phiOut_5584)))(JSExpr_5418((JSCall_5431(JSRef_5435("error")))([JSString_5427("pattern match fail"),phiIn_5591]))))(reverse_5317(e_5516.$2))))(addStmt_5438)))((ret($import1$instance$Monad$11))(JSRef_5435(phiOut_5584)))
        })
      })
    })
  } else if(e_5516.$tag==5){
    var $phi$590 = (($gt$gt_5339($import1$instance$Monad$11))(((mapM_5313($import1$instance$Monad$11))(function(d_5595){
      var $phi$593 = (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5445(d_5595.$1)))(addVar_5439(d_5595.$0));
      return $phi$593
    }))(e_5516.$1)))(rewriteExpr_5445(e_5516.$2))
  } else if((e_5516.$tag==6)&&("Array"==e_5516.$1)){
    var $phi$590 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_5313($import1$instance$Monad$11))(rewriteExpr_5445))(e_5516.$2)))(function(es_5600){
      return (ret($import1$instance$Monad$11))(JSArray_5424(es_5600))
    })
  } else if(e_5516.$tag==6){
    var $phi$590 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_5313($import1$instance$Monad$11))(rewriteExpr_5445))(e_5516.$2)))(function(es_5604){
      return (($gt$gt$eq($import1$instance$Monad$11))(getCons_5444))(function(cons_5605){
        var $phi$592 = (((lookup_5281($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_5516.$1))(cons_5605);
        if($phi$592.$tag==1){
          var $phi$591 = error(($concat("unrecognized tag in New: "))(e_5516.$1))
        } else if(($phi$592.$tag==0)&&($phi$592.$0.$tag==1)){
          var $phi$591 = (ret($import1$instance$Monad$11))(JSObject_5425((zip_5326(dataConFieldIds_5452(es_5604)))(es_5604)))
        } else if(($phi$592.$tag==0)&&($phi$592.$0.$tag==0)){
          var $phi$591 = (ret($import1$instance$Monad$11))(JSObject_5425((push((Pair_5259("$tag"))(JSNum_5428($phi$592.$0.$0))))((zip_5326(dataConFieldIds_5452(es_5604)))(es_5604))))
        } else error("pattern match fail",$phi$592);
        return $phi$591
      })
    })
  } else error("pattern match fail",e_5516);
  return $phi$590
};
var assemblePatternMatch2_5446 = function(phiIn_5607){
  return function(phiOut_5608){
    return function(alt_5609){
      return function(p_5610){
        return (($gt$gt$eq($import1$instance$Monad$11))(getCons_5444))(function(cons_5611){
          var $phi$598 = ((processPattern_5448(cons_5611))(phiIn_5607))(p_5610.$0);
          var rep_5617 = ((foldl(function(r_5618){
            return function(p_5619){
              return ((((insert_5289($import1$instance$Hashable$13))($import1$instance$Eq$1))(fst_5273(p_5619)))(snd_5263(p_5619)))(r_5618)
            }
          }))(Empty_5268))((zip_5326($phi$598.$1.$0))($phi$598.$1.$1));
          var $phi$597 = (($gt$gt$eq($import1$instance$Monad$11))((withRep_5442(rep_5617))((rewriteExprToStmts_5441(JSVar_5416(phiOut_5608)))(p_5610.$1))))(function(stmts_5620){
            return (ret($import1$instance$Monad$11))(((JSIf_5412($phi$598.$0))(stmts_5620))([alt_5609]))
          });
          var $phi$596 = $phi$597;
          return $phi$596
        })
      }
    }
  }
};
var requireExpr_5449 = function(f_5655){
  return (JSCall_5431(JSRef_5435("_require")))([JSString_5427(f_5655)])
};
var buildImports_5450 = function(f_5656){
  return function(ns_5657){
    return (map(function(n_5658){
      var $phi$599 = (JSVar_5416(opName_5455(n_5658.$1)))((JSIndex_5434(requireExpr_5449(f_5656)))(JSString_5427(opName_5455(n_5658.$0))));
      return $phi$599
    }))(ns_5657)
  }
};
var importToJs_5451 = function(i_5661){
  if(i_5661.$tag==1){
    var $phi$600 = (buildImports_5450(i_5661.$1))(i_5661.$2)
  } else error("pattern match fail",i_5661);
  return $phi$600
};
var exportObject_5453 = function(bs_5667){
  var f_5668 = function(b_5669){
    var $phi$603 = (((getAnn_5365($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_5369(b_5669.$1));
    if($phi$603.$tag==1){
      var $phi$602 = Nothing_5266
    } else if(($phi$603.$tag==0)&&($phi$603.$0.$tag==5)){
      var $phi$602 = Just_5265((Pair_5259(opName_5455($phi$603.$0.$0)))(JSRef_5435(opName_5455(b_5669.$0))))
    } else error("pattern match fail",$phi$603);
    var $phi$601 = $phi$602;
    return $phi$601
  };
  return JSObject_5425((mapJust_5324(f_5668))(bs_5667))
};
var moduleToJs_5454 = function(m_5673){
  var f_5692 = function(p_5693){
    var $phi$605 = not_5286(isJust_5267((((getAnn_5365($import1$instance$Hashable$13))($import1$instance$Eq$1))("dead"))(annOf_5369(p_5693.$1))));
    return $phi$605
  };
  var vs2_5684 = (filter(f_5692))(m_5673.$6);
  var exportDef_5686 = (JSVar_5416("exports"))(exportObject_5453(vs2_5684));
  var gatherCons_5682 = function(local$instance$Hashable$1){
    return function(local$instance$Eq$0){
      return function(m_5687){
        return function(d_5688){
          var $phi$608 = (((getAnn_5365($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(annOf_5369(d_5688.$1));
          if($phi$608.$tag==1){
            var $phi$607 = m_5687
          } else if(($phi$608.$tag==0)&&($phi$608.$0.$tag==3)){
            var $phi$607 = ((((insert_5289(local$instance$Hashable$1))(local$instance$Eq$0))(d_5688.$0))($phi$608.$0.$0))(m_5687)
          } else error("pattern match fail",$phi$608);
          var $phi$606 = $phi$607;
          return $phi$606
        }
      }
    }
  };
  var cons_5683 = ((foldl((gatherCons_5682($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_5268))(m_5673.$6);
  var defs_5685 = ($_5272(foldl1(concat)))((evalState_5309((((RewriteState_5436(cons_5683))(Empty_5268))([]))(0)))(((mapM_5313($import1$instance$Monad$11))(function(v_5696){
    var $phi$609 = (rewriteExprToStmts_5441(JSVar_5416(opName_5455(v_5696.$0))))(v_5696.$1);
    return $phi$609
  }))(vs2_5684)));
  var imports_5681 = (concatMap_5325(importToJs_5451))(m_5673.$2);
  var $phi$604 = (push(exportDef_5686))((concat(imports_5681))(defs_5685));
  return $phi$604
};
var checkUndefined_5447 = function(label_5621){
  return function(expr_5622){
    return ((JSTernary_5429(((JSBinOp_5432("==="))(expr_5622))(JSUndefined_5422)))((JSCall_5431(JSRef_5435("error")))([JSString_5427(label_5621)])))(expr_5622)
  }
};
var assert_5705 = assert_89;
var Pair_5706 = Pair_3;
var mapSnd_5707 = mapSnd_88;
var mapFst_5708 = mapFst_87;
var $gt$eq$gt_5709 = $gt$eq$gt_86;
var snd_5710 = snd_27;
var debug2_5711 = debug2_85;
var Just_5712 = Just_1;
var Nothing_5713 = Nothing_2;
var isJust_5714 = isJust_25;
var Empty_5715 = Empty_11;
var Leaf_5716 = Leaf_12;
var Collision_5717 = Collision_13;
var BitmapIndexed_5718 = BitmapIndexed_14;
var $_5719 = $_16;
var fst_5720 = fst_26;
var Left_5721 = Left_8;
var Right_5722 = Right_9;
var loop_5723 = loop_31;
var find_5724 = find_33;
var hamtMask_5725 = hamtMask_62;
var popCount_5726 = popCount_61;
var hamtIndex_5727 = hamtIndex_63;
var lookup_5728 = lookup_64;
var setContains_5729 = setContains_80;
var foldTrie_5730 = foldTrie_70;
var emptySet_5731 = emptySet_76;
var Unit_5732 = Unit_0;
var not_5733 = not_30;
var $div$eq_5734 = $div$eq_17;
var mapIx_5735 = mapIx_34;
var insert_5736 = insert_65;
var setAdd_5737 = setAdd_77;
var setIntersection_5738 = setIntersection_84;
var remove_5739 = remove_67;
var setDiff_5740 = setDiff_83;
var setToArray_5741 = setToArray_82;
var mergeTrie_5742 = mergeTrie_74;
var setUnion_5743 = setUnion_81;
var setRemove_5744 = setRemove_79;
var setAddAll_5745 = setAddAll_78;
var trieKeys_5746 = trieKeys_75;
var size_5747 = size_72;
var mapTrie_5748 = mapTrie_71;
var nodeMask_5749 = nodeMask_60;
var isEmpty_5750 = isEmpty_73;
var filterTrie_5751 = filterTrie_69;
var nextSetBitMask_5752 = nextSetBitMask_68;
var updateOrSet_5753 = updateOrSet_66;
var State_5754 = State_10;
var runState_5755 = runState_58;
var evalState_5756 = evalState_59;
var sets_5757 = sets_57;
var gets_5758 = gets_56;
var foldM_5759 = foldM_53;
var mapM_5760 = mapM_54;
var forM_5761 = forM_55;
var strToArray_5762 = strToArray_52;
var toRecord_5763 = toRecord_51;
var reverse_5764 = reverse_50;
var tail_5765 = tail_45;
var head_5766 = head_44;
var uniq_5767 = uniq_49;
var mergeSet_5768 = mergeSet_48;
var init_5769 = init_47;
var last_5770 = last_46;
var mapJust_5771 = mapJust_43;
var concatMap_5772 = concatMap_42;
var zip_5773 = zip_41;
var zipWithIndex2_5774 = zipWithIndex2_39;
var zipWithIndex_5775 = zipWithIndex_40;
var join_5776 = join_38;
var all_5777 = all_37;
var exists_5778 = exists_36;
var containsChar_5779 = containsChar_35;
var contains_5780 = contains_32;
var either_5781 = either_28;
var splitEither_5782 = splitEither_29;
var fromJust_5783 = fromJust_24;
var justOr_5784 = justOr_23;
var maybe_5785 = maybe_22;
var $gt$gt_5786 = $gt$gt_21;
var $gt$eq_5787 = $gt$eq_20;
var $lt$eq_5788 = $lt$eq_19;
var $gt_5789 = $gt_18;
var Identity_5790 = Identity_15;
var Tuple6_5791 = Tuple6_7;
var Tuple5_5792 = Tuple5_6;
var Tuple4_5793 = Tuple4_5;
var Tuple3_5794 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var moduleToJs_5795 = moduleToJs_5454;
var jsExprToString_5796 = jsExprToString_5179;
var jsStmtToString_5797 = jsStmtToString_5182;
var rewriteStmt_5798 = rewriteStmt_5017;
var compileModule_5799 = function(builtinsPath_5800){
  return function(m_5801){
    var runStmt_5807 = "if (module.exports.main)module.exports.main(process.argv)";
    var requireFun_5806 = ($concat(($concat("function _require(f) {\n"))("  return f == \"./builtins.js\" ? $$builtins : require(f);\n")))("}\n");
    var js_5804 = (join_5776((map(jsStmtToString_5797(0)))((concatMap_5772(rewriteStmt_5798))(moduleToJs_5795(m_5801)))))(";\n");
    var wrapModule_5805 = function(m_5808){
      return ($concat(($concat("(function() {"))(js_5804)))("\nmodule.exports = exports;})();")
    };
    var fullBuiltins_5802 = readFile(builtinsPath_5800);
    var wrappedBuiltins_5803 = ($concat(($concat("const $$builtins = (function() {\n const module = {};\n"))(fullBuiltins_5802)))(";\n return builtins})();\n");
    return ($concat(($concat(($concat(wrappedBuiltins_5803))(requireFun_5806)))(wrapModule_5805(m_5801))))(runStmt_5807)
  }
};
var assert_5809 = assert_89;
var Pair_5810 = Pair_3;
var mapSnd_5811 = mapSnd_88;
var mapFst_5812 = mapFst_87;
var $gt$eq$gt_5813 = $gt$eq$gt_86;
var snd_5814 = snd_27;
var debug2_5815 = debug2_85;
var Just_5816 = Just_1;
var Nothing_5817 = Nothing_2;
var isJust_5818 = isJust_25;
var Empty_5819 = Empty_11;
var Leaf_5820 = Leaf_12;
var Collision_5821 = Collision_13;
var BitmapIndexed_5822 = BitmapIndexed_14;
var $_5823 = $_16;
var fst_5824 = fst_26;
var Left_5825 = Left_8;
var Right_5826 = Right_9;
var loop_5827 = loop_31;
var find_5828 = find_33;
var hamtMask_5829 = hamtMask_62;
var popCount_5830 = popCount_61;
var hamtIndex_5831 = hamtIndex_63;
var lookup_5832 = lookup_64;
var setContains_5833 = setContains_80;
var foldTrie_5834 = foldTrie_70;
var emptySet_5835 = emptySet_76;
var Unit_5836 = Unit_0;
var not_5837 = not_30;
var $div$eq_5838 = $div$eq_17;
var mapIx_5839 = mapIx_34;
var insert_5840 = insert_65;
var setAdd_5841 = setAdd_77;
var setIntersection_5842 = setIntersection_84;
var remove_5843 = remove_67;
var setDiff_5844 = setDiff_83;
var setToArray_5845 = setToArray_82;
var mergeTrie_5846 = mergeTrie_74;
var setUnion_5847 = setUnion_81;
var setRemove_5848 = setRemove_79;
var setAddAll_5849 = setAddAll_78;
var trieKeys_5850 = trieKeys_75;
var size_5851 = size_72;
var mapTrie_5852 = mapTrie_71;
var nodeMask_5853 = nodeMask_60;
var isEmpty_5854 = isEmpty_73;
var filterTrie_5855 = filterTrie_69;
var nextSetBitMask_5856 = nextSetBitMask_68;
var updateOrSet_5857 = updateOrSet_66;
var State_5858 = State_10;
var runState_5859 = runState_58;
var evalState_5860 = evalState_59;
var sets_5861 = sets_57;
var gets_5862 = gets_56;
var foldM_5863 = foldM_53;
var mapM_5864 = mapM_54;
var forM_5865 = forM_55;
var strToArray_5866 = strToArray_52;
var toRecord_5867 = toRecord_51;
var reverse_5868 = reverse_50;
var tail_5869 = tail_45;
var head_5870 = head_44;
var uniq_5871 = uniq_49;
var mergeSet_5872 = mergeSet_48;
var init_5873 = init_47;
var last_5874 = last_46;
var mapJust_5875 = mapJust_43;
var concatMap_5876 = concatMap_42;
var zip_5877 = zip_41;
var zipWithIndex2_5878 = zipWithIndex2_39;
var zipWithIndex_5879 = zipWithIndex_40;
var join_5880 = join_38;
var all_5881 = all_37;
var exists_5882 = exists_36;
var containsChar_5883 = containsChar_35;
var contains_5884 = contains_32;
var either_5885 = either_28;
var splitEither_5886 = splitEither_29;
var fromJust_5887 = fromJust_24;
var justOr_5888 = justOr_23;
var maybe_5889 = maybe_22;
var $gt$gt_5890 = $gt$gt_21;
var $gt$eq_5891 = $gt$eq_20;
var $lt$eq_5892 = $lt$eq_19;
var $gt_5893 = $gt_18;
var Identity_5894 = Identity_15;
var Tuple6_5895 = Tuple6_7;
var Tuple5_5896 = Tuple5_6;
var Tuple4_5897 = Tuple4_5;
var Tuple3_5898 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var Success_5899 = function($_0_5914){
  return function($_1_5915){
    return {$0:$_0_5914,$1:$_1_5915,$tag:0}
  }
};
var Error_5900 = function($_0_5916){
  return {$0:$_0_5916,$tag:1}
};
var Parser_5901 = function($_0_5917){
  return {$0:$_0_5917}
};
var $instance$Functor$0 = $class$Functor(function(f_5951){
  return function(pa_5952){
    var $phi$610 = Parser_5901(function(i_5954){
      var $phi$612 = pa_5952.$0(i_5954);
      if($phi$612.$tag==1){
        var $phi$611 = Error_5900($phi$612.$0)
      } else if($phi$612.$tag==0){
        var $phi$611 = (Success_5899(f_5951($phi$612.$0)))($phi$612.$1)
      } else error("pattern match fail",$phi$612);
      return $phi$611
    });
    return $phi$610
  }
});
var $instance$Applicative$1 = ($class$Applicative(function(x_5958){
  return Parser_5901(Success_5899(x_5958))
}))(function(pf_5959){
  return function(pa_5960){
    var $phi$614 = Parser_5901(function(i_5963){
      var $phi$616 = pf_5959.$0(i_5963);
      if($phi$616.$tag==1){
        var $phi$615 = Error_5900($phi$616.$0)
      } else if($phi$616.$tag==0){
        var $phi$618 = pa_5960.$0($phi$616.$1);
        if($phi$618.$tag==1){
          var $phi$617 = Error_5900($phi$618.$0)
        } else if($phi$618.$tag==0){
          var $phi$617 = (Success_5899($phi$616.$0($phi$618.$0)))($phi$618.$1)
        } else error("pattern match fail",$phi$618);
        var $phi$615 = $phi$617
      } else error("pattern match fail",$phi$616);
      return $phi$615
    });
    var $phi$613 = $phi$614;
    return $phi$613
  }
});
var $instance$Alternative$2 = ($class$Alternative(Parser_5901(function(__5970){
  return Error_5900("parser failure")
})))(function(pa_5971){
  return function(pb_5972){
    var $phi$620 = Parser_5901(function(i_5975){
      var $phi$622 = pa_5971.$0(i_5975);
      if($phi$622.$tag==1){
        var $phi$621 = pb_5972.$0(i_5975)
      } else if($phi$622.$tag==0){
        var $phi$621 = (Success_5899($phi$622.$0))($phi$622.$1)
      } else error("pattern match fail",$phi$622);
      return $phi$621
    });
    var $phi$619 = $phi$620;
    return $phi$619
  }
});
var upperCaseLetters_5912 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var letters_5913 = ($concat("abcdefghijklmnopqrstuvwxyz"))(upperCaseLetters_5912);
var digits_5911 = "0123456789";
var applyParser_5902 = function(p_5918){
  return function(i_5919){
    var $phi$623 = p_5918.$0(i_5919);
    return $phi$623
  }
};
var many_5905 = function(p_5929){
  var manyIterate_5930 = function(s_5931){
    var r_5932 = ((iterate(Left_5825((Success_5899([]))(s_5931))))(function(r_5933){
      if(r_5933.$tag==0){
        var $phi$624 = false
      } else if(r_5933.$tag==1){
        var $phi$624 = true
      } else error("pattern match fail",r_5933);
      return $phi$624
    }))(function(rs_5936){
      if((rs_5936.$tag==0)&&(rs_5936.$0.$tag==0)){
        var $phi$627 = (applyParser_5902(p_5929))(rs_5936.$0.$1);
        if($phi$627.$tag==0){
          var $phi$626 = Left_5825((Success_5899((push($phi$627.$0))(rs_5936.$0.$0)))($phi$627.$1))
        } else if($phi$627.$tag==1){
          var $phi$626 = Right_5826((Success_5899(rs_5936.$0.$0))(rs_5936.$0.$1))
        } else error("pattern match fail",$phi$627);
        var $phi$625 = $phi$626
      } else error("pattern match fail",rs_5936);
      return $phi$625
    });
    if(r_5932.$tag==1){
      var $phi$628 = r_5932.$0
    } else if(r_5932.$tag==0){
      var $phi$628 = error("manyIterate should never return a Left")
    } else error("pattern match fail",r_5932);
    return $phi$628
  };
  return Parser_5901(manyIterate_5930)
};
var $pip$gt_5903 = function(local$instance$Applicative$0){
  return function(a_5921){
    return function(b_5922){
      return (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(function(__5923){
        return function(b_5924){
          return b_5924
        }
      })))(a_5921)))(b_5922)
    }
  }
};
var sepBy1_5908 = function(p_5946){
  return function(sp_5947){
    return (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(enqueue)))(p_5946)))(many_5905((($pip$gt_5903($instance$Applicative$1))(sp_5947))(p_5946)))
  }
};
var success_5907 = function(a_5945){
  return Parser_5901(Success_5899(a_5945))
};
var opt_5910 = function(a_5950){
  return (($lt$pip$gt($instance$Alternative$2))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(Just_5816)))(a_5950)))(success_5907(Nothing_5817))
};
var sepBy_5909 = function(p_5948){
  return function(sp_5949){
    return (($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(justOr_5888([]))))(opt_5910((sepBy1_5908(p_5948))(sp_5949)))
  }
};
var some_5906 = function(p_5944){
  return (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(enqueue)))(p_5944)))(many_5905(p_5944))
};
var $lt$pip_5904 = function(local$instance$Applicative$0){
  return function(a_5925){
    return function(b_5926){
      return (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(function(a_5927){
        return function(__5928){
          return a_5927
        }
      })))(a_5925)))(b_5926)
    }
  }
};
var assert_5979 = assert_89;
var Pair_5980 = Pair_3;
var mapSnd_5981 = mapSnd_88;
var mapFst_5982 = mapFst_87;
var $gt$eq$gt_5983 = $gt$eq$gt_86;
var snd_5984 = snd_27;
var debug2_5985 = debug2_85;
var Just_5986 = Just_1;
var Nothing_5987 = Nothing_2;
var isJust_5988 = isJust_25;
var Empty_5989 = Empty_11;
var Leaf_5990 = Leaf_12;
var Collision_5991 = Collision_13;
var BitmapIndexed_5992 = BitmapIndexed_14;
var $_5993 = $_16;
var fst_5994 = fst_26;
var Left_5995 = Left_8;
var Right_5996 = Right_9;
var loop_5997 = loop_31;
var find_5998 = find_33;
var hamtMask_5999 = hamtMask_62;
var popCount_6000 = popCount_61;
var hamtIndex_6001 = hamtIndex_63;
var lookup_6002 = lookup_64;
var setContains_6003 = setContains_80;
var foldTrie_6004 = foldTrie_70;
var emptySet_6005 = emptySet_76;
var Unit_6006 = Unit_0;
var not_6007 = not_30;
var $div$eq_6008 = $div$eq_17;
var mapIx_6009 = mapIx_34;
var insert_6010 = insert_65;
var setAdd_6011 = setAdd_77;
var setIntersection_6012 = setIntersection_84;
var remove_6013 = remove_67;
var setDiff_6014 = setDiff_83;
var setToArray_6015 = setToArray_82;
var mergeTrie_6016 = mergeTrie_74;
var setUnion_6017 = setUnion_81;
var setRemove_6018 = setRemove_79;
var setAddAll_6019 = setAddAll_78;
var trieKeys_6020 = trieKeys_75;
var size_6021 = size_72;
var mapTrie_6022 = mapTrie_71;
var nodeMask_6023 = nodeMask_60;
var isEmpty_6024 = isEmpty_73;
var filterTrie_6025 = filterTrie_69;
var nextSetBitMask_6026 = nextSetBitMask_68;
var updateOrSet_6027 = updateOrSet_66;
var State_6028 = State_10;
var runState_6029 = runState_58;
var evalState_6030 = evalState_59;
var sets_6031 = sets_57;
var gets_6032 = gets_56;
var foldM_6033 = foldM_53;
var mapM_6034 = mapM_54;
var forM_6035 = forM_55;
var strToArray_6036 = strToArray_52;
var toRecord_6037 = toRecord_51;
var reverse_6038 = reverse_50;
var tail_6039 = tail_45;
var head_6040 = head_44;
var uniq_6041 = uniq_49;
var mergeSet_6042 = mergeSet_48;
var init_6043 = init_47;
var last_6044 = last_46;
var mapJust_6045 = mapJust_43;
var concatMap_6046 = concatMap_42;
var zip_6047 = zip_41;
var zipWithIndex2_6048 = zipWithIndex2_39;
var zipWithIndex_6049 = zipWithIndex_40;
var join_6050 = join_38;
var all_6051 = all_37;
var exists_6052 = exists_36;
var containsChar_6053 = containsChar_35;
var contains_6054 = contains_32;
var either_6055 = either_28;
var splitEither_6056 = splitEither_29;
var fromJust_6057 = fromJust_24;
var justOr_6058 = justOr_23;
var maybe_6059 = maybe_22;
var $gt$gt_6060 = $gt$gt_21;
var $gt$eq_6061 = $gt$eq_20;
var $lt$eq_6062 = $lt$eq_19;
var $gt_6063 = $gt_18;
var Identity_6064 = Identity_15;
var Tuple6_6065 = Tuple6_7;
var Tuple5_6066 = Tuple5_6;
var Tuple4_6067 = Tuple4_5;
var Tuple3_6068 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var upperCaseLetters_6069 = upperCaseLetters_5912;
var letters_6070 = letters_5913;
var digits_6071 = digits_5911;
var Success_6072 = Success_5899;
var Error_6073 = Error_5900;
var Parser_6074 = Parser_5901;
var applyParser_6075 = applyParser_5902;
var many_6076 = many_5905;
var $pip$gt_6077 = $pip$gt_5903;
var sepBy1_6078 = sepBy1_5908;
var success_6079 = success_5907;
var opt_6080 = opt_5910;
var sepBy_6081 = sepBy_5909;
var some_6082 = some_5906;
var $lt$pip_6083 = $lt$pip_5904;
var $import2$instance$Functor$0 = $instance$Functor$0;
var $import2$instance$Applicative$1 = $instance$Applicative$1;
var $import2$instance$Alternative$2 = $instance$Alternative$2;
var LexerState_6084 = function($_0_6114){
  return function($_1_6115){
    return function($_2_6116){
      return function($_3_6117){
        return {$0:$_0_6114,$1:$_1_6115,$2:$_2_6116,$3:$_3_6117}
      }
    }
  }
};
var WsTok_6085 = {$tag:0};
var Token_6092 = function($_0_6118){
  return function($_1_6119){
    return function($_2_6120){
      return function($_3_6121){
        return {$0:$_0_6118,$1:$_1_6119,$2:$_2_6120,$3:$_3_6121}
      }
    }
  }
};
var NumTok_6087 = {$tag:2};
var ComTok_6091 = {$tag:6};
var SymTok_6086 = {$tag:1};
var IdTok_6090 = {$tag:5};
var OpTok_6089 = {$tag:4};
var StrTok_6088 = {$tag:3};
var runLexer_6095 = function(p_6132){
  return function(s_6133){
    var $phi$629 = p_6132.$0((((LexerState_6084(s_6133))(0))(0))(0));
    return $phi$629
  }
};
var mkTok_6093 = function(t_6122){
  var parse_6123 = function(i_6124){
    var $phi$630 = (Success_6072(function(r_6129){
      return (((Token_6092(t_6122))(r_6129))(i_6124.$2))(i_6124.$3)
    }))(i_6124);
    return $phi$630
  };
  return Parser_6074(parse_6123)
};
var parseChar_6096 = function(p_6135){
  var parse_6136 = function(s_6137){
    var $phi$633 = (($lt($import1$instance$Ord$2))(s_6137.$1))(length(s_6137.$0));
    if(!$phi$633){
      var $phi$632 = Error_6073("no more input available")
    } else if($phi$633){
      var $phi$635 = p_6135((getChar(s_6137.$1))(s_6137.$0));
      if(!$phi$635){
        var $phi$634 = Error_6073("parser failed")
      } else if($phi$635){
        var $phi$637 = (getChar(s_6137.$1))(s_6137.$0);
        if("\n"==$phi$637){
          var $phi$636 = (Success_6072((getChar(s_6137.$1))(s_6137.$0)))((((LexerState_6084(s_6137.$0))(s_6137.$1+1))(s_6137.$2+1))(0))
        } else var $phi$636 = (Success_6072((getChar(s_6137.$1))(s_6137.$0)))((((LexerState_6084(s_6137.$0))(s_6137.$1+1))(s_6137.$2))(s_6137.$3+1));
        var $phi$634 = $phi$636
      } else error("pattern match fail",$phi$635);
      var $phi$632 = $phi$634
    } else error("pattern match fail",$phi$633);
    var $phi$631 = $phi$632;
    return $phi$631
  };
  return Parser_6074(parse_6136)
};
var charP_6098 = function(cs_6144){
  return parseChar_6096(function(c_6145){
    return (containsChar_6053(c_6145))(cs_6144)
  })
};
var concatStr_6094 = (foldl(function(cs_6130){
  return function(c_6131){
    return ($concat(cs_6130))(c_6131)
  }
}))("");
var someStr_6101 = function(p_6149){
  return (($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))(concatStr_6094)))(some_6082(p_6149))
};
var whitespaceP_6104 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_6093(WsTok_6085)))(someStr_6101(charP_6098(" \n")));
var intP_6105 = someStr_6101(charP_6098(digits_6071));
var numP_6106 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_6093(NumTok_6087)))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(intP_6105)))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(charP_6098("."))))(intP_6105)))((pure($import2$instance$Applicative$1))(""))));
var notCharP_6099 = function(cs_6146){
  return parseChar_6096(function(c_6147){
    return not_6007((containsChar_6053(c_6147))(cs_6146))
  })
};
var manyStr_6100 = function(p_6148){
  return (($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))(concatStr_6094)))(many_6076(p_6148))
};
var lineCommentP_6107 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_6093(ComTok_6091)))((($pip$gt_6077($import2$instance$Applicative$1))((($pip$gt_6077($import2$instance$Applicative$1))(charP_6098("/")))(charP_6098("/"))))(manyStr_6100(notCharP_6099("\n"))));
var symbolP_6108 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_6093(SymTok_6086)))(charP_6098("()[]{},\\"));
var identP_6109 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_6093(IdTok_6090)))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(charP_6098(($concat(letters_6070))("_")))))(manyStr_6100(charP_6098(($concat(($concat(letters_6070))(digits_6071)))("_")))));
var opIdentP_6110 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_6093(IdTok_6090)))((($lt$pip_6083($import2$instance$Applicative$1))((($pip$gt_6077($import2$instance$Applicative$1))(charP_6098("(")))(someStr_6101(charP_6098("-+*/=:&|<>^$")))))(charP_6098(")")));
var opP_6111 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_6093(OpTok_6089)))(someStr_6101(charP_6098("-+*/=:&|<>^$~")));
var anyCharP_6097 = parseChar_6096(function(__6143){
  return true
});
var notEndOfStringP_6152 = notCharP_6099("'");
var escapeP_6151 = (($pip$gt_6077($import2$instance$Applicative$1))(charP_6098("\\")))(anyCharP_6097);
var newLineP_6150 = (($pip$gt_6077($import2$instance$Applicative$1))((($pip$gt_6077($import2$instance$Applicative$1))(charP_6098("\\")))(charP_6098("n"))))((pure($import2$instance$Applicative$1))("\n"));
var stringCharP_6102 = (($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))(newLineP_6150))(escapeP_6151)))(notEndOfStringP_6152);
var stringP_6103 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_6093(StrTok_6088)))((($lt$pip_6083($import2$instance$Applicative$1))((($pip$gt_6077($import2$instance$Applicative$1))(charP_6098("'")))(manyStr_6100(stringCharP_6102))))(charP_6098("'")));
var jaguarTokenP_6112 = many_6076((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))(stringP_6103))(whitespaceP_6104)))(numP_6106)))(lineCommentP_6107)))(identP_6109)))(opIdentP_6110)))(opP_6111)))(symbolP_6108));
var tokenize_6113 = runLexer_6095(jaguarTokenP_6112);
var assert_6153 = assert_89;
var Pair_6154 = Pair_3;
var mapSnd_6155 = mapSnd_88;
var mapFst_6156 = mapFst_87;
var $gt$eq$gt_6157 = $gt$eq$gt_86;
var snd_6158 = snd_27;
var debug2_6159 = debug2_85;
var Just_6160 = Just_1;
var Nothing_6161 = Nothing_2;
var isJust_6162 = isJust_25;
var Empty_6163 = Empty_11;
var Leaf_6164 = Leaf_12;
var Collision_6165 = Collision_13;
var BitmapIndexed_6166 = BitmapIndexed_14;
var $_6167 = $_16;
var fst_6168 = fst_26;
var Left_6169 = Left_8;
var Right_6170 = Right_9;
var loop_6171 = loop_31;
var find_6172 = find_33;
var hamtMask_6173 = hamtMask_62;
var popCount_6174 = popCount_61;
var hamtIndex_6175 = hamtIndex_63;
var lookup_6176 = lookup_64;
var setContains_6177 = setContains_80;
var foldTrie_6178 = foldTrie_70;
var emptySet_6179 = emptySet_76;
var Unit_6180 = Unit_0;
var not_6181 = not_30;
var $div$eq_6182 = $div$eq_17;
var mapIx_6183 = mapIx_34;
var insert_6184 = insert_65;
var setAdd_6185 = setAdd_77;
var setIntersection_6186 = setIntersection_84;
var remove_6187 = remove_67;
var setDiff_6188 = setDiff_83;
var setToArray_6189 = setToArray_82;
var mergeTrie_6190 = mergeTrie_74;
var setUnion_6191 = setUnion_81;
var setRemove_6192 = setRemove_79;
var setAddAll_6193 = setAddAll_78;
var trieKeys_6194 = trieKeys_75;
var size_6195 = size_72;
var mapTrie_6196 = mapTrie_71;
var nodeMask_6197 = nodeMask_60;
var isEmpty_6198 = isEmpty_73;
var filterTrie_6199 = filterTrie_69;
var nextSetBitMask_6200 = nextSetBitMask_68;
var updateOrSet_6201 = updateOrSet_66;
var State_6202 = State_10;
var runState_6203 = runState_58;
var evalState_6204 = evalState_59;
var sets_6205 = sets_57;
var gets_6206 = gets_56;
var foldM_6207 = foldM_53;
var mapM_6208 = mapM_54;
var forM_6209 = forM_55;
var strToArray_6210 = strToArray_52;
var toRecord_6211 = toRecord_51;
var reverse_6212 = reverse_50;
var tail_6213 = tail_45;
var head_6214 = head_44;
var uniq_6215 = uniq_49;
var mergeSet_6216 = mergeSet_48;
var init_6217 = init_47;
var last_6218 = last_46;
var mapJust_6219 = mapJust_43;
var concatMap_6220 = concatMap_42;
var zip_6221 = zip_41;
var zipWithIndex2_6222 = zipWithIndex2_39;
var zipWithIndex_6223 = zipWithIndex_40;
var join_6224 = join_38;
var all_6225 = all_37;
var exists_6226 = exists_36;
var containsChar_6227 = containsChar_35;
var contains_6228 = contains_32;
var either_6229 = either_28;
var splitEither_6230 = splitEither_29;
var fromJust_6231 = fromJust_24;
var justOr_6232 = justOr_23;
var maybe_6233 = maybe_22;
var $gt$gt_6234 = $gt$gt_21;
var $gt$eq_6235 = $gt$eq_20;
var $lt$eq_6236 = $lt$eq_19;
var $gt_6237 = $gt_18;
var Identity_6238 = Identity_15;
var Tuple6_6239 = Tuple6_7;
var Tuple5_6240 = Tuple5_6;
var Tuple4_6241 = Tuple4_5;
var Tuple3_6242 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_6243 = App_761;
var Lam_6244 = Lam_762;
var Case_6245 = Case_763;
var Let_6246 = Let_764;
var New_6247 = New_765;
var breakableDownAndUpM_6248 = breakableDownAndUpM_812;
var breakableDownM_6249 = breakableDownM_816;
var downAndUpM_6250 = downAndUpM_813;
var downM_6251 = downM_815;
var upM_6252 = upM_814;
var breakableDownAndUp_6253 = breakableDownAndUp_807;
var breakableDown_6254 = breakableDown_811;
var downAndUp_6255 = downAndUp_808;
var down_6256 = down_810;
var up_6257 = up_809;
var AnnType_6258 = AnnType_753;
var TUnknown_6259 = TUnknown_785;
var getAnn_6260 = getAnn_790;
var getAnnType_6261 = getAnnType_793;
var Var_6262 = Var_759;
var Const_6263 = Const_760;
var annOf_6264 = annOf_804;
var getType_6265 = getType_806;
var withAnn_6266 = withAnn_805;
var setAnn_6267 = setAnn_791;
var setAnnType_6268 = setAnnType_794;
var setType_6269 = setType_803;
var Data_6270 = Data_773;
var DataCon_6271 = DataCon_774;
var dataConName_6272 = dataConName_801;
var dataConNames_6273 = dataConNames_802;
var TCBound_6274 = TCBound_777;
var TConst_6275 = TConst_778;
var TVar_6276 = TVar_779;
var TSkolem_6277 = TSkolem_780;
var TApp_6278 = TApp_781;
var TRow_6279 = TRow_782;
var TBot_6280 = TBot_783;
var TForall_6281 = TForall_784;
var equivBound_6282 = equivBound_799;
var equivType_6283 = equivType_800;
var getAnnCodeLoc_6284 = getAnnCodeLoc_795;
var AnnCodeLoc_6285 = AnnCodeLoc_754;
var printCodeLoc_6286 = printCodeLoc_797;
var exprLoc_6287 = exprLoc_798;
var setAnnCodeLoc_6288 = setAnnCodeLoc_796;
var copyAnn_6289 = copyAnn_792;
var emptyAnn_6290 = emptyAnn_789;
var ImportAll_6291 = ImportAll_788;
var ImportOpen_6292 = ImportOpen_787;
var ImportClosed_6293 = ImportClosed_786;
var Instance_6294 = Instance_776;
var Class_6295 = Class_775;
var ModuleInterface_6296 = ModuleInterface_772;
var Module_6297 = Module_771;
var PData_6298 = PData_770;
var PConst_6299 = PConst_769;
var PVar_6300 = PVar_768;
var CStr_6301 = CStr_767;
var CNum_6302 = CNum_766;
var AnnExport_6303 = AnnExport_758;
var AnnTag_6304 = AnnTag_757;
var AnnData_6305 = AnnData_756;
var AnnUseCount_6306 = AnnUseCount_755;
var upperCaseLetters_6307 = upperCaseLetters_5912;
var letters_6308 = letters_5913;
var digits_6309 = digits_5911;
var Success_6310 = Success_5899;
var Error_6311 = Error_5900;
var Parser_6312 = Parser_5901;
var applyParser_6313 = applyParser_5902;
var many_6314 = many_5905;
var $pip$gt_6315 = $pip$gt_5903;
var sepBy1_6316 = sepBy1_5908;
var success_6317 = success_5907;
var opt_6318 = opt_5910;
var sepBy_6319 = sepBy_5909;
var some_6320 = some_5906;
var $lt$pip_6321 = $lt$pip_5904;
var $import3$instance$Functor$0 = $instance$Functor$0;
var $import3$instance$Applicative$1 = $instance$Applicative$1;
var $import3$instance$Alternative$2 = $instance$Alternative$2;
var tokenize_6322 = tokenize_6113;
var Token_6323 = Token_6092;
var WsTok_6324 = WsTok_6085;
var SymTok_6325 = SymTok_6086;
var NumTok_6326 = NumTok_6087;
var StrTok_6327 = StrTok_6088;
var OpTok_6328 = OpTok_6089;
var IdTok_6329 = IdTok_6090;
var ComTok_6330 = ComTok_6091;
var ParserState_6331 = function($_0_6400){
  return function($_1_6401){
    return function($_2_6402){
      return function($_3_6403){
        return function($_4_6404){
          return {$0:$_0_6400,$1:$_1_6401,$2:$_2_6402,$3:$_3_6403,$4:$_4_6404}
        }
      }
    }
  }
};
var mkParserState_6332 = function(ts_6405){
  return function(f_6406){
    var $phi$639 = (getIx(0))(ts_6405);
    var $phi$638 = $phi$639.$3;
    return ((((ParserState_6331(ts_6405))(0))($phi$638))(0))(f_6406)
  }
};
var filterWhitespaceAndComments_6333 = filter(function(t_6411){
  if(t_6411.$0.$tag==0){
    var $phi$640 = false
  } else if(t_6411.$0.$tag==6){
    var $phi$640 = false
  } else var $phi$640 = true;
  return $phi$640
});
var runParser_6334 = function(p_6419){
  return function(s_6420){
    return function(f_6421){
      var $phi$642 = tokenize_6322(s_6420);
      if($phi$642.$tag==0){
        var $phi$641 = (applyParser_6313(p_6419))((mkParserState_6332(filterWhitespaceAndComments_6333($phi$642.$0)))(f_6421))
      } else if($phi$642.$tag==1){
        var $phi$641 = Error_6311($phi$642.$0)
      } else error("pattern match fail",$phi$642);
      return $phi$641
    }
  }
};
var $lt$mul$mns$gt_6337 = function(pf_6453){
  return function(pa_6454){
    var parse_6457 = function(s_6458){
      var $phi$647 = pf_6453.$0(s_6458);
      if($phi$647.$tag==0){
        var $phi$649 = pa_6454.$0(((((ParserState_6331($phi$647.$1.$0))($phi$647.$1.$1))($phi$647.$1.$2))(s_6458.$2+1))($phi$647.$1.$4));
        if($phi$649.$tag==0){
          var $phi$648 = (Success_6310($phi$647.$0($phi$649.$0)))(((((ParserState_6331($phi$649.$1.$0))($phi$649.$1.$1))($phi$649.$1.$2))(s_6458.$3))($phi$649.$1.$4))
        } else if($phi$649.$tag==1){
          var $phi$648 = Error_6311($phi$649.$0)
        } else error("pattern match fail",$phi$649);
        var $phi$646 = $phi$648
      } else if($phi$647.$tag==1){
        var $phi$646 = Error_6311($phi$647.$0)
      } else error("pattern match fail",$phi$647);
      var $phi$645 = $phi$646;
      return $phi$645
    };
    var $phi$644 = Parser_6312(parse_6457);
    var $phi$643 = $phi$644;
    return $phi$643
  }
};
var parseToken_6335 = function(f_6425){
  var parse_6426 = function(s_6427){
    var $phi$652 = (($lt($import1$instance$Ord$2))(s_6427.$1))(length(s_6427.$0));
    if(!$phi$652){
      var $phi$651 = Error_6311("run out of tokens")
    } else if($phi$652){
      var $phi$654 = (getIx(s_6427.$1))(s_6427.$0);
      var $phi$656 = (($lt($import1$instance$Ord$2))($phi$654.$3))(s_6427.$3);
      if($phi$656){
        var $phi$655 = Error_6311("token not indented sufficiently")
      } else if(!$phi$656){
        var $phi$658 = f_6425((getIx(s_6427.$1))(s_6427.$0));
        if($phi$658.$tag==1){
          var $phi$657 = Error_6311("parser fun failed")
        } else if($phi$658.$tag==0){
          var $phi$660 = (($lt($import1$instance$Ord$2))(s_6427.$1+1))(length(s_6427.$0));
          if(!$phi$660){
            var $phi$659 = (Success_6310($phi$658.$0))(((((ParserState_6331(s_6427.$0))(s_6427.$1+1))(s_6427.$2))(s_6427.$3))(s_6427.$4))
          } else if($phi$660){
            var $phi$662 = (getIx(s_6427.$1+1))(s_6427.$0);
            var $phi$664 = (($gt_6237($import1$instance$Ord$2))($phi$662.$2))($phi$654.$2);
            if(!$phi$664){
              var $phi$663 = (Success_6310($phi$658.$0))(((((ParserState_6331(s_6427.$0))(s_6427.$1+1))(s_6427.$2))(s_6427.$3))(s_6427.$4))
            } else if($phi$664){
              var $phi$663 = (Success_6310($phi$658.$0))(((((ParserState_6331(s_6427.$0))(s_6427.$1+1))($phi$662.$3))(s_6427.$3))(s_6427.$4))
            } else error("pattern match fail",$phi$664);
            var $phi$661 = $phi$663;
            var $phi$659 = $phi$661
          } else error("pattern match fail",$phi$660);
          var $phi$657 = $phi$659
        } else error("pattern match fail",$phi$658);
        var $phi$655 = $phi$657
      } else error("pattern match fail",$phi$656);
      var $phi$653 = $phi$655;
      var $phi$651 = $phi$653
    } else error("pattern match fail",$phi$652);
    var $phi$650 = $phi$651;
    return $phi$650
  };
  return Parser_6312(parse_6426)
};
var operatorP_6341 = function(s_6488){
  return parseToken_6335(function(t_6489){
    if(t_6489.$0.$tag==4){
      var $phi$667 = (($eq$eq($import1$instance$Eq$1))(t_6489.$1))(s_6488);
      if($phi$667){
        var $phi$666 = Just_6160(s_6488)
      } else if(!$phi$667){
        var $phi$666 = Nothing_6161
      } else error("pattern match fail",$phi$667);
      var $phi$665 = $phi$666
    } else var $phi$665 = Nothing_6161;
    return $phi$665
  })
};
var symP_6340 = function(s_6482){
  return parseToken_6335(function(t_6483){
    if(t_6483.$0.$tag==1){
      var $phi$670 = (($eq$eq($import1$instance$Eq$1))(t_6483.$1))(s_6482);
      if($phi$670){
        var $phi$669 = Just_6160(s_6482)
      } else if(!$phi$670){
        var $phi$669 = Nothing_6161
      } else error("pattern match fail",$phi$670);
      var $phi$668 = $phi$669
    } else var $phi$668 = Nothing_6161;
    return $phi$668
  })
};
var parenP_6347 = function(p_6520){
  return (($lt$pip_6321($import3$instance$Applicative$1))((($pip$gt_6315($import3$instance$Applicative$1))(symP_6340("(")))(p_6520)))(symP_6340(")"))
};
var reserved_6339 = ["as","class","where","instance","let","in","from","import","case","of","data"];
var notUpperCaseId_6346 = parseToken_6335(function(t_6515){
  if(t_6515.$0.$tag==5){
    var $phi$673 = (containsChar_6227((getChar(0))(t_6515.$1)))(upperCaseLetters_6307);
    if(!$phi$673){
      var $phi$675 = ((contains_6228($import1$instance$Eq$1))(t_6515.$1))(reserved_6339);
      if(!$phi$675){
        var $phi$674 = Just_6160(t_6515.$1)
      } else if($phi$675){
        var $phi$674 = Nothing_6161
      } else error("pattern match fail",$phi$675);
      var $phi$672 = $phi$674
    } else if($phi$673){
      var $phi$672 = Nothing_6161
    } else error("pattern match fail",$phi$673);
    var $phi$671 = $phi$672
  } else var $phi$671 = Nothing_6161;
  return $phi$671
});
var tvarP_6377 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(TVar_6276(emptyAnn_6290))))(notUpperCaseId_6346);
var upperCaseId_6345 = parseToken_6335(function(t_6510){
  if(t_6510.$0.$tag==5){
    var $phi$678 = (containsChar_6227((getChar(0))(t_6510.$1)))(upperCaseLetters_6307);
    if($phi$678){
      var $phi$677 = Just_6160(t_6510.$1)
    } else if(!$phi$678){
      var $phi$677 = Nothing_6161
    } else error("pattern match fail",$phi$678);
    var $phi$676 = $phi$677
  } else var $phi$676 = Nothing_6161;
  return $phi$676
});
var tconstP_6376 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(TConst_6275(emptyAnn_6290))))(upperCaseId_6345);
var typeP_6375 = Parser_6312(function(s_6590){
  return (applyParser_6313(tfunP_6380))(s_6590)
});
var simpleTypeP_6378 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(tconstP_6376))(tvarP_6377)))(parenP_6347(typeP_6375));
var tappP_6379 = ($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(foldl(TApp_6278(emptyAnn_6290)))))(simpleTypeP_6378)))(many_6314(simpleTypeP_6378));
var tfunP_6380 = ($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(t_6591){
  return function(ts_6592){
    return (foldr1(function(b_6593){
      return function(a_6594){
        return ((TApp_6278(emptyAnn_6290))(((TApp_6278(emptyAnn_6290))((TConst_6275(emptyAnn_6290))("->")))(a_6594)))(b_6593)
      }
    }))((enqueue(t_6591))(ts_6592))
  }
})))(tappP_6379)))(many_6314((($pip$gt_6315($import3$instance$Applicative$1))(operatorP_6341("->")))(tappP_6379)));
var parseType_6399 = runParser_6334(typeP_6375);
var withLocAnn_6348 = function(a_6521){
  return ((((setAnn_6267($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(a_6521))(emptyAnn_6290)
};
var parse_6442 = function(s_6443){
  var $phi$681 = (($lt($import1$instance$Ord$2))(s_6443.$1))(length(s_6443.$0));
  if(!$phi$681){
    var $phi$680 = Error_6311("run out of tokens")
  } else if($phi$681){
    var $phi$683 = (getIx(s_6443.$1))(s_6443.$0);
    var $phi$682 = (Success_6310(($_6167(withLocAnn_6348))(((AnnCodeLoc_6285(s_6443.$4))($phi$683.$2))($phi$683.$3))))(s_6443);
    var $phi$680 = $phi$682
  } else error("pattern match fail",$phi$681);
  var $phi$679 = $phi$680;
  return $phi$679
};
var locP_6336 = Parser_6312(parse_6442);
var $pip$mns$gt_6338 = function(pa_6478){
  return function(pb_6479){
    return ($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(__6480){
      return function(b_6481){
        return b_6481
      }
    })))(pa_6478)))(pb_6479)
  }
};
var anyOpP_6342 = parseToken_6335(function(t_6494){
  if(t_6494.$0.$tag==4){
    var $phi$684 = Just_6160(t_6494.$1)
  } else var $phi$684 = Nothing_6161;
  return $phi$684
});
var reservedP_6343 = function(s_6499){
  return parseToken_6335(function(t_6500){
    if(t_6500.$0.$tag==5){
      var $phi$687 = (($eq$eq($import1$instance$Eq$1))(t_6500.$1))(s_6499);
      if($phi$687){
        var $phi$686 = Just_6160(s_6499)
      } else if(!$phi$687){
        var $phi$686 = Nothing_6161
      } else error("pattern match fail",$phi$687);
      var $phi$685 = $phi$686
    } else var $phi$685 = Nothing_6161;
    return $phi$685
  })
};
var withLocOf_6349 = function(e_6522){
  return withLocAnn_6348(($_6167(fromJust_6231))((((getAnn_6260($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(annOf_6264(e_6522))))
};
var varP_6350 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Var_6262)))(locP_6336)))(parseToken_6335(function(t_6523){
  if(t_6523.$0.$tag==5){
    var $phi$690 = ((contains_6228($import1$instance$Eq$1))(t_6523.$1))(reserved_6339);
    if($phi$690){
      var $phi$689 = Nothing_6161
    } else if(!$phi$690){
      var $phi$689 = Just_6160(t_6523.$1)
    } else error("pattern match fail",$phi$690);
    var $phi$688 = $phi$689
  } else var $phi$688 = Nothing_6161;
  return $phi$688
}));
var cnumP_6351 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Const_6263)))(locP_6336)))(parseToken_6335(function(t_6528){
  if(t_6528.$0.$tag==2){
    var $phi$691 = Just_6160(CNum_6302(unsafeStringToInt(t_6528.$1)))
  } else var $phi$691 = Nothing_6161;
  return $phi$691
}));
var cstrP_6352 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Const_6263)))(locP_6336)))(parseToken_6335(function(t_6533){
  if(t_6533.$0.$tag==3){
    var $phi$692 = Just_6160(CStr_6301(t_6533.$1))
  } else var $phi$692 = Nothing_6161;
  return $phi$692
}));
var constP_6353 = (($lt$pip$gt($import3$instance$Alternative$2))(cstrP_6352))(cnumP_6351);
var pvarP_6361 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PVar_6300)))(locP_6336)))(notUpperCaseId_6346);
var pcstrP_6363 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PConst_6299)))(locP_6336)))(parseToken_6335(function(t_6559){
  if(t_6559.$0.$tag==3){
    var $phi$693 = Just_6160(CStr_6301(t_6559.$1))
  } else var $phi$693 = Nothing_6161;
  return $phi$693
}));
var pcnumP_6362 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PConst_6299)))(locP_6336)))(parseToken_6335(function(t_6554){
  if(t_6554.$0.$tag==2){
    var $phi$694 = Just_6160(CNum_6302(unsafeStringToInt(t_6554.$1)))
  } else var $phi$694 = Nothing_6161;
  return $phi$694
}));
var pconstP_6365 = (($lt$pip$gt($import3$instance$Alternative$2))(pcnumP_6362))(pcstrP_6363);
var patP_6360 = Parser_6312(function(s_6553){
  return (applyParser_6313(allPatP_6368))(s_6553)
});
var f_6569 = function(ann_6570){
  return function(p_6571){
    return function(ps_6572){
      var $phi$696 = length(ps_6572);
      if(1==$phi$696){
        var $phi$695 = "Pair"
      } else if(2==$phi$696){
        var $phi$695 = "Tuple3"
      } else if(3==$phi$696){
        var $phi$695 = "Tuple4"
      } else if(4==$phi$696){
        var $phi$695 = "Tuple5"
      } else if(5==$phi$696){
        var $phi$695 = "Tuple6"
      } else error("pattern match fail",$phi$696);
      var cons_6573 = $phi$695;
      return ((PData_6298(ann_6570))(cons_6573))((enqueue(p_6571))(ps_6572))
    }
  }
};
var ptupleP_6366 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(f_6569)))(locP_6336)))((($pip$gt_6315($import3$instance$Applicative$1))(symP_6340("(")))((($lt$pip_6321($import3$instance$Applicative$1))(patP_6360))(symP_6340(","))))))((($lt$pip_6321($import3$instance$Applicative$1))((sepBy1_6316(patP_6360))(symP_6340(","))))(symP_6340(")")));
var pdataP_6367 = ($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PData_6298)))(locP_6336)))(upperCaseId_6345)))(many_6314((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(pvarP_6361))(pconstP_6365)))(ptupleP_6366)))(parenP_6347(patP_6360))));
var allPatP_6368 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(pvarP_6361))(pconstP_6365)))(pdataP_6367)))(ptupleP_6366);
var exprP_6354 = Parser_6312(function(s_6538){
  return (applyParser_6313(opP_6374))(s_6538)
});
var arrayLitP_6355 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(ann_6539){
  return function(xs_6540){
    return ((New_6247(ann_6539))("Array"))(xs_6540)
  }
})))(locP_6336)))((($lt$pip_6321($import3$instance$Applicative$1))((($pip$gt_6315($import3$instance$Applicative$1))(symP_6340("[")))((sepBy_6319(exprP_6354))(symP_6340(",")))))(symP_6340("]")));
var f_6541 = function(ann_6542){
  return function(e_6543){
    return function(es_6544){
      var $phi$698 = length(es_6544);
      if(1==$phi$698){
        var $phi$697 = "Pair"
      } else if(2==$phi$698){
        var $phi$697 = "Tuple3"
      } else if(3==$phi$698){
        var $phi$697 = "Tuple4"
      } else if(4==$phi$698){
        var $phi$697 = "Tuple5"
      } else if(5==$phi$698){
        var $phi$697 = "Tuple6"
      } else error("pattern match fail",$phi$698);
      var cons_6545 = $phi$697;
      return ((foldl(App_6243(ann_6542)))(((App_6243(ann_6542))((Var_6262(ann_6542))(cons_6545)))(e_6543)))(es_6544)
    }
  }
};
var tupleLitP_6356 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(f_6541)))(locP_6336)))((($pip$gt_6315($import3$instance$Applicative$1))(symP_6340("(")))((($lt$pip_6321($import3$instance$Applicative$1))(exprP_6354))(symP_6340(","))))))((($lt$pip_6321($import3$instance$Applicative$1))((sepBy1_6316(exprP_6354))(symP_6340(","))))(symP_6340(")")));
var simpleExprP_6357 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(varP_6350))(constP_6353)))(arrayLitP_6355)))(tupleLitP_6356)))(parenP_6347(exprP_6354));
var appP_6358 = ($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(foldl(function(f_6546){
  return function(a_6547){
    return ((App_6243(withLocOf_6349(f_6546)))(f_6546))(a_6547)
  }
}))))((($lt$pip$gt($import3$instance$Alternative$2))(varP_6350))(parenP_6347(exprP_6354)))))(many_6314(simpleExprP_6357));
var lamP_6359 = ($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(l_6548){
  return function(ps_6549){
    return function(a_6550){
      return ((foldr(function(a_6551){
        return function(p_6552){
          return ((Lam_6244(l_6548))(p_6552))(a_6551)
        }
      }))(a_6550))(ps_6549)
    }
  }
})))(locP_6336)))(($pip$mns$gt_6338(symP_6340("\\")))(some_6320(notUpperCaseId_6346)))))((($pip$gt_6315($import3$instance$Applicative$1))(operatorP_6341("->")))(exprP_6354));
var ofP_6369 = ($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Pair_6154)))(patP_6360)))((($pip$gt_6315($import3$instance$Applicative$1))(operatorP_6341("->")))(exprP_6354));
var caseP_6370 = ($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Case_6245)))(locP_6336)))(($pip$mns$gt_6338(reservedP_6343("case")))(simpleExprP_6357))))((($pip$gt_6315($import3$instance$Applicative$1))(reservedP_6343("of")))(some_6320(ofP_6369)));
var defP_6371 = ($lt$mul$mns$gt_6337(($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(l_6574){
  return function(n_6575){
    return function(ps_6576){
      return function(e_6577){
        return (Pair_6154(n_6575))(((foldr(function(e_6578){
          return function(p_6579){
            return ((Lam_6244(l_6574))(p_6579))(e_6578)
          }
        }))(e_6577))(ps_6576))
      }
    }
  }
})))(locP_6336)))(notUpperCaseId_6346)))(many_6314(notUpperCaseId_6346))))((($pip$gt_6315($import3$instance$Applicative$1))(operatorP_6341("=")))(exprP_6354));
var letP_6372 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Let_6246)))(locP_6336)))(($pip$mns$gt_6338(reservedP_6343("let")))(some_6320(defP_6371)))))(($pip$mns$gt_6338(reservedP_6343("in")))(exprP_6354));
var primaryExprP_6373 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(appP_6358))(constP_6353)))(lamP_6359)))(caseP_6370)))(letP_6372)))(arrayLitP_6355)))(tupleLitP_6356);
var opP_6374 = ($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(e_6580){
  return function(oes_6581){
    return ((foldl(function(a_6582){
      return function(lob_6583){
        var $phi$699 = ((App_6243(lob_6583.$0))(((App_6243(lob_6583.$0))((Var_6262(lob_6583.$0))(lob_6583.$1.$0)))(a_6582)))(lob_6583.$1.$1);
        return $phi$699
      }
    }))(e_6580))(oes_6581)
  }
})))(primaryExprP_6373)))(many_6314((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(l_6587){
  return function(op_6588){
    return function(e_6589){
      return (Pair_6154(l_6587))((Pair_6154(op_6588))(e_6589))
    }
  }
})))(locP_6336)))(anyOpP_6342)))(primaryExprP_6373)));
var parseExpr_6398 = runParser_6334(exprP_6354);
var strP_6364 = parseToken_6335(function(t_6564){
  if(t_6564.$0.$tag==3){
    var $phi$700 = Just_6160(t_6564.$1)
  } else var $phi$700 = Nothing_6161;
  return $phi$700
});
var nonReservedP_6344 = parseToken_6335(function(t_6505){
  if(t_6505.$0.$tag==5){
    var $phi$703 = ((contains_6228($import1$instance$Eq$1))(t_6505.$1))(reserved_6339);
    if($phi$703){
      var $phi$702 = Nothing_6161
    } else if(!$phi$703){
      var $phi$702 = Just_6160(t_6505.$1)
    } else error("pattern match fail",$phi$703);
    var $phi$701 = $phi$702
  } else var $phi$701 = Nothing_6161;
  return $phi$701
});
var importNoAliasP_6386 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(n_6601){
  return (Pair_6154(n_6601))(n_6601)
})))(nonReservedP_6344);
var importAliasP_6387 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Pair_6154)))(nonReservedP_6344)))((($pip$gt_6315($import3$instance$Applicative$1))(reservedP_6343("as")))(nonReservedP_6344));
var importOpenP_6388 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(ns_6602){
  return function(f_6603){
    return ((ImportOpen_6292(emptyAnn_6290))(f_6603))(ns_6602)
  }
})))((($lt$pip_6321($import3$instance$Applicative$1))((($pip$gt_6315($import3$instance$Applicative$1))(symP_6340("{")))((sepBy1_6316((($lt$pip$gt($import3$instance$Alternative$2))(importAliasP_6387))(importNoAliasP_6386)))(symP_6340(",")))))(symP_6340("}")))))((($pip$gt_6315($import3$instance$Applicative$1))(reservedP_6343("from")))(strP_6364));
var importAllP_6389 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(ImportAll_6291(emptyAnn_6290))))((($pip$gt_6315($import3$instance$Applicative$1))((($pip$gt_6315($import3$instance$Applicative$1))(operatorP_6341("*")))(reservedP_6343("from"))))(strP_6364));
var importP_6390 = (($pip$gt_6315($import3$instance$Applicative$1))(reservedP_6343("import")))((($lt$pip$gt($import3$instance$Alternative$2))(importOpenP_6388))(importAllP_6389));
var parseImports_6397 = runParser_6334(many_6314(importP_6390));
var addExportAnn_6620 = function(d_6621){
  var $phi$704 = (Pair_6154(d_6621.$0))((withAnn_6266(((((setAnn_6267($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_6303(d_6621.$0)))(annOf_6264(d_6621.$1))))(d_6621.$1));
  return $phi$704
};
var topLevelDef_6394 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(addExportAnn_6620)))(defP_6371);
var eitherP_6393 = function(a_6617){
  return function(b_6618){
    return ($_6167(Parser_6312))(function(s_6619){
      return (applyParser_6313((($lt$pip$gt($import3$instance$Alternative$2))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Left_6169)))(a_6617)))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Right_6170)))(b_6618))))(s_6619)
    })
  }
};
var classMemberP_6382 = ($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Pair_6154)))(notUpperCaseId_6346)))((($pip$gt_6315($import3$instance$Applicative$1))(operatorP_6341("::")))(typeP_6375));
var classP_6381 = ($lt$mul$mns$gt_6337(($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(name_6595){
  return function(tv_6596){
    return function(maybeDefs_6597){
      return (((Class_6295(emptyAnn_6290))(name_6595))(tv_6596))((justOr_6232([]))(maybeDefs_6597))
    }
  }
})))(($pip$mns$gt_6338(reservedP_6343("class")))(upperCaseId_6345))))(notUpperCaseId_6346)))(opt_6318((($pip$gt_6315($import3$instance$Applicative$1))(reservedP_6343("where")))(some_6320(classMemberP_6382))));
var instanceP_6383 = ($lt$mul$mns$gt_6337(($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(name_6598){
  return function(t_6599){
    return function(maybeDefs_6600){
      return (((Instance_6294(emptyAnn_6290))(name_6598))(t_6599))((justOr_6232([]))(maybeDefs_6600))
    }
  }
})))(($pip$mns$gt_6338(reservedP_6343("instance")))(upperCaseId_6345))))(simpleTypeP_6378)))(opt_6318((($pip$gt_6315($import3$instance$Applicative$1))(reservedP_6343("where")))(some_6320(defP_6371))));
var dataConP_6384 = ($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(DataCon_6271(emptyAnn_6290))))(upperCaseId_6345)))(many_6314(simpleTypeP_6378));
var dataP_6385 = ($lt$mul$mns$gt_6337(($lt$mul$mns$gt_6337((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Data_6270(emptyAnn_6290))))(($pip$mns$gt_6338(reservedP_6343("data")))(upperCaseId_6345))))(many_6314(notUpperCaseId_6346))))((($pip$gt_6315($import3$instance$Applicative$1))(operatorP_6341("=")))((sepBy1_6316(dataConP_6384))(operatorP_6341("|"))));
var topLevelP_6395 = (eitherP_6393((eitherP_6393(dataP_6385))(topLevelDef_6394)))((eitherP_6393(classP_6381))(instanceP_6383));
var splitFourWay_6392 = function(e_6614){
  var $phi$706 = splitEither_6230(e_6614);
  var $phi$705 = (Pair_6154(splitEither_6230($phi$706.$0)))(splitEither_6230($phi$706.$1));
  return $phi$705
};
var moduleP_6391 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(loc_6604){
  return function(is_6605){
    return function(es_6606){
      var $phi$708 = splitFourWay_6392(es_6606);
      var $phi$710 = getAnnCodeLoc_6284(loc_6604);
      if(($phi$710.$tag==0)&&($phi$710.$0.$tag==1)){
        var $phi$709 = $phi$710.$0.$0
      } else error("pattern match fail",$phi$710);
      var $phi$707 = ((((((Module_6297(loc_6604))($phi$709))(is_6605))($phi$708.$0.$0))($phi$708.$1.$0))($phi$708.$1.$1))($phi$708.$0.$1);
      return $phi$707
    }
  }
})))(locP_6336)))(many_6314(importP_6390))))(some_6320(topLevelP_6395));
var parseModule_6396 = runParser_6334(moduleP_6391);
var assert_6624 = assert_89;
var Pair_6625 = Pair_3;
var mapSnd_6626 = mapSnd_88;
var mapFst_6627 = mapFst_87;
var $gt$eq$gt_6628 = $gt$eq$gt_86;
var snd_6629 = snd_27;
var debug2_6630 = debug2_85;
var Just_6631 = Just_1;
var Nothing_6632 = Nothing_2;
var isJust_6633 = isJust_25;
var Empty_6634 = Empty_11;
var Leaf_6635 = Leaf_12;
var Collision_6636 = Collision_13;
var BitmapIndexed_6637 = BitmapIndexed_14;
var $_6638 = $_16;
var fst_6639 = fst_26;
var Left_6640 = Left_8;
var Right_6641 = Right_9;
var loop_6642 = loop_31;
var find_6643 = find_33;
var hamtMask_6644 = hamtMask_62;
var popCount_6645 = popCount_61;
var hamtIndex_6646 = hamtIndex_63;
var lookup_6647 = lookup_64;
var setContains_6648 = setContains_80;
var foldTrie_6649 = foldTrie_70;
var emptySet_6650 = emptySet_76;
var Unit_6651 = Unit_0;
var not_6652 = not_30;
var $div$eq_6653 = $div$eq_17;
var mapIx_6654 = mapIx_34;
var insert_6655 = insert_65;
var setAdd_6656 = setAdd_77;
var setIntersection_6657 = setIntersection_84;
var remove_6658 = remove_67;
var setDiff_6659 = setDiff_83;
var setToArray_6660 = setToArray_82;
var mergeTrie_6661 = mergeTrie_74;
var setUnion_6662 = setUnion_81;
var setRemove_6663 = setRemove_79;
var setAddAll_6664 = setAddAll_78;
var trieKeys_6665 = trieKeys_75;
var size_6666 = size_72;
var mapTrie_6667 = mapTrie_71;
var nodeMask_6668 = nodeMask_60;
var isEmpty_6669 = isEmpty_73;
var filterTrie_6670 = filterTrie_69;
var nextSetBitMask_6671 = nextSetBitMask_68;
var updateOrSet_6672 = updateOrSet_66;
var State_6673 = State_10;
var runState_6674 = runState_58;
var evalState_6675 = evalState_59;
var sets_6676 = sets_57;
var gets_6677 = gets_56;
var foldM_6678 = foldM_53;
var mapM_6679 = mapM_54;
var forM_6680 = forM_55;
var strToArray_6681 = strToArray_52;
var toRecord_6682 = toRecord_51;
var reverse_6683 = reverse_50;
var tail_6684 = tail_45;
var head_6685 = head_44;
var uniq_6686 = uniq_49;
var mergeSet_6687 = mergeSet_48;
var init_6688 = init_47;
var last_6689 = last_46;
var mapJust_6690 = mapJust_43;
var concatMap_6691 = concatMap_42;
var zip_6692 = zip_41;
var zipWithIndex2_6693 = zipWithIndex2_39;
var zipWithIndex_6694 = zipWithIndex_40;
var join_6695 = join_38;
var all_6696 = all_37;
var exists_6697 = exists_36;
var containsChar_6698 = containsChar_35;
var contains_6699 = contains_32;
var either_6700 = either_28;
var splitEither_6701 = splitEither_29;
var fromJust_6702 = fromJust_24;
var justOr_6703 = justOr_23;
var maybe_6704 = maybe_22;
var $gt$gt_6705 = $gt$gt_21;
var $gt$eq_6706 = $gt$eq_20;
var $lt$eq_6707 = $lt$eq_19;
var $gt_6708 = $gt_18;
var Identity_6709 = Identity_15;
var Tuple6_6710 = Tuple6_7;
var Tuple5_6711 = Tuple5_6;
var Tuple4_6712 = Tuple4_5;
var Tuple3_6713 = Tuple3_4;
var $import1$instance$Eq$0 = $instance$Eq$0;
var $import1$instance$Eq$1 = $instance$Eq$1;
var $import1$instance$Ord$2 = $instance$Ord$2;
var $import1$instance$Ord$3 = $instance$Ord$3;
var $import1$instance$Functor$4 = $instance$Functor$4;
var $import1$instance$Applicative$5 = $instance$Applicative$5;
var $import1$instance$Alternative$6 = $instance$Alternative$6;
var $import1$instance$Monad$7 = $instance$Monad$7;
var $import1$instance$Functor$8 = $instance$Functor$8;
var $import1$instance$Functor$9 = $instance$Functor$9;
var $import1$instance$Applicative$10 = $instance$Applicative$10;
var $import1$instance$Monad$11 = $instance$Monad$11;
var $import1$instance$Hashable$12 = $instance$Hashable$12;
var $import1$instance$Hashable$13 = $instance$Hashable$13;
var $import1$instance$Functor$14 = $instance$Functor$14;
var $import1$instance$Applicative$15 = $instance$Applicative$15;
var $import1$instance$Monad$16 = $instance$Monad$16;
var App_6714 = App_761;
var Lam_6715 = Lam_762;
var Case_6716 = Case_763;
var Let_6717 = Let_764;
var New_6718 = New_765;
var breakableDownAndUpM_6719 = breakableDownAndUpM_812;
var breakableDownM_6720 = breakableDownM_816;
var downAndUpM_6721 = downAndUpM_813;
var downM_6722 = downM_815;
var upM_6723 = upM_814;
var breakableDownAndUp_6724 = breakableDownAndUp_807;
var breakableDown_6725 = breakableDown_811;
var downAndUp_6726 = downAndUp_808;
var down_6727 = down_810;
var up_6728 = up_809;
var AnnType_6729 = AnnType_753;
var TUnknown_6730 = TUnknown_785;
var getAnn_6731 = getAnn_790;
var getAnnType_6732 = getAnnType_793;
var Var_6733 = Var_759;
var Const_6734 = Const_760;
var annOf_6735 = annOf_804;
var getType_6736 = getType_806;
var withAnn_6737 = withAnn_805;
var setAnn_6738 = setAnn_791;
var setAnnType_6739 = setAnnType_794;
var setType_6740 = setType_803;
var Data_6741 = Data_773;
var DataCon_6742 = DataCon_774;
var dataConName_6743 = dataConName_801;
var dataConNames_6744 = dataConNames_802;
var TCBound_6745 = TCBound_777;
var TConst_6746 = TConst_778;
var TVar_6747 = TVar_779;
var TSkolem_6748 = TSkolem_780;
var TApp_6749 = TApp_781;
var TRow_6750 = TRow_782;
var TBot_6751 = TBot_783;
var TForall_6752 = TForall_784;
var equivBound_6753 = equivBound_799;
var equivType_6754 = equivType_800;
var getAnnCodeLoc_6755 = getAnnCodeLoc_795;
var AnnCodeLoc_6756 = AnnCodeLoc_754;
var printCodeLoc_6757 = printCodeLoc_797;
var exprLoc_6758 = exprLoc_798;
var setAnnCodeLoc_6759 = setAnnCodeLoc_796;
var copyAnn_6760 = copyAnn_792;
var emptyAnn_6761 = emptyAnn_789;
var ImportAll_6762 = ImportAll_788;
var ImportOpen_6763 = ImportOpen_787;
var ImportClosed_6764 = ImportClosed_786;
var Instance_6765 = Instance_776;
var Class_6766 = Class_775;
var ModuleInterface_6767 = ModuleInterface_772;
var Module_6768 = Module_771;
var PData_6769 = PData_770;
var PConst_6770 = PConst_769;
var PVar_6771 = PVar_768;
var CStr_6772 = CStr_767;
var CNum_6773 = CNum_766;
var AnnExport_6774 = AnnExport_758;
var AnnTag_6775 = AnnTag_757;
var AnnData_6776 = AnnData_756;
var AnnUseCount_6777 = AnnUseCount_755;
var Success_6778 = Success_5899;
var Error_6779 = Error_5900;
var $import3$instance$Functor$0 = $instance$Functor$0;
var $import3$instance$Applicative$1 = $instance$Applicative$1;
var $import3$instance$Alternative$2 = $instance$Alternative$2;
var parseExpr_6780 = parseExpr_6398;
var parseModule_6781 = parseModule_6396;
var parseType_6782 = parseType_6399;
var ParserState_6783 = ParserState_6331;
var generateJs_6784 = compileModule_5799;
var printType_6785 = printType_1742;
var reallyPrintExpr_6786 = reallyPrintExpr_1747;
var newCtx_6787 = newCtx_2042;
var inferTypeModule_6788 = inferTypeModule_2088;
var getTypedExports_6789 = getTypedExports_2089;
var generalize_6790 = generalize_2080;
var skolemizeType_6791 = skolemizeType_2076;
var emptyEnv_6792 = emptyEnv_2052;
var dfs_6793 = dfs_597;
var ArgBool_6794 = ArgBool_4785;
var ArgString_6795 = ArgString_4786;
var parseArgs_6796 = parseArgs_4789;
var getPositional_6797 = getPositional_4790;
var getString_6798 = getString_4791;
var getBool_6799 = getBool_4792;
var $import9$instance$Eq$0 = $instance$Eq$0;
var declassModule_6800 = declassModule_4329;
var normalizeImports_6801 = normalizeImports_4113;
var uniquify_6802 = uniquify_3238;
var mergeModules_6803 = mergeModules_3908;
var inline_6804 = inline_3506;
var translateAdts_6805 = translateAdts_3032;
var CompilerState_6806 = CompilerState_1528;
var reportTimes_6807 = reportTimes_1537;
var timingStart_6808 = timingStart_1534;
var timingEnd_6809 = timingEnd_1535;
var timed_6810 = timed_1536;
var perModule_6811 = perModule_1533;
var setUid_6812 = setUid_1532;
var getUid_6813 = getUid_1531;
var setExports_6814 = setExports_1530;
var getExports_6815 = getExports_1529;
var splitLetsPass_6816 = splitLetsPass_1316;
var mainArg_6826 = (ArgString_6795("main"))(Nothing_6632);
var profileArg_6827 = (ArgBool_6794("profile"))(Just_6631(false));
var optArg_6828 = (ArgBool_6794("opt"))(Just_6631(false));
var builtinsPathArg_6824 = (ArgString_6795("builtins"))(Nothing_6632);
var outPathArg_6825 = (ArgString_6795("out"))(Nothing_6632);
var argDefs_6829 = [builtinsPathArg_6824,outPathArg_6825,mainArg_6826,profileArg_6827,optArg_6828];
var liftPass_6830 = function(local$instance$Monad$0){
  return function(p_6913){
    return function(a_6914){
      return (ret(local$instance$Monad$0))(p_6913(a_6914))
    }
  }
};
var normalizeImportsPass_6831 = function(m_6915){
  return (($gt$gt$eq($import1$instance$Monad$11))(getExports_6815))(function(es_6916){
    return (ret($import1$instance$Monad$11))((normalizeImports_6801(es_6916))(m_6915))
  })
};
var moduleFile_6817 = function(m_6836){
  var $phi$711 = m_6836.$1;
  return $phi$711
};
var typerPass_6832 = function(m_6917){
  return (($gt$gt$eq($import1$instance$Monad$11))(getExports_6815))(function(es_6918){
    var typed_6919 = (inferTypeModule_6788(es_6918))(m_6917);
    var e_6920 = getTypedExports_6789(typed_6919);
    return (($gt$gt_6705($import1$instance$Monad$11))(setExports_6814(((set(moduleFile_6817(m_6917)))(e_6920))(es_6918))))((ret($import1$instance$Monad$11))(typed_6919))
  })
};
var declasserPass_6833 = function(m_6921){
  return (($gt$gt$eq($import1$instance$Monad$11))(getExports_6815))(function(es_6922){
    return (ret($import1$instance$Monad$11))((declassModule_6800(es_6922))(m_6921))
  })
};
var parse_6818 = function(fn_6844){
  var $phi$713 = (parseModule_6781(readFile(fn_6844)))(($concat("//"))(fn_6844));
  if($phi$713.$tag==0){
    var $phi$715 = (($eq$eq($import1$instance$Eq$0))($phi$713.$1.$1))(length($phi$713.$1.$0));
    if($phi$715){
      var $phi$714 = $phi$713.$0
    } else if(!$phi$715){
      var $phi$714 = error(($concat(($concat(fn_6844))(": failed to parse all tokens, stopped at ")))(jsonStringify((getIx($phi$713.$1.$1))($phi$713.$1.$0))))
    } else error("pattern match fail",$phi$715);
    var $phi$712 = $phi$714
  } else if($phi$713.$tag==1){
    var $phi$712 = error(($concat(($concat(fn_6844))(": ")))($phi$713.$0))
  } else error("pattern match fail",$phi$713);
  return $phi$712
};
var findImports_6820 = function(m_6860){
  var importFileName_6861 = function(i_6862){
    if(i_6862.$tag==2){
      var $phi$716 = i_6862.$1
    } else if(i_6862.$tag==1){
      var $phi$716 = i_6862.$1
    } else if(i_6862.$tag==0){
      var $phi$716 = i_6862.$1
    } else error("pattern match fail",i_6862);
    return $phi$716
  };
  var $phi$717 = (map(importFileName_6861))(m_6860.$2);
  return $phi$717
};
var depSort_6819 = function(mainName_6852){
  return function(ms_6853){
    var modules_6854 = ((foldl(function(r_6857){
      return function(m_6858){
        return ((set(moduleFile_6817(m_6858)))(m_6858))(r_6857)
      }
    }))(empty))(ms_6853);
    var imports_6855 = (mapRecord(findImports_6820))(modules_6854);
    var ordered_6856 = ((dfs_6793(imports_6855))([]))(mainName_6852);
    return ($_6638(reverse_6683))((map(function(n_6859){
      return (get(n_6859))(modules_6854)
    }))(ordered_6856))
  }
};
var parseT_6821 = function(s_6878){
  var $phi$719 = (parseType_6782(s_6878))("");
  if($phi$719.$tag==0){
    var $phi$718 = $phi$719.$0
  } else var $phi$718 = error($phi$719);
  return $phi$718
};
var parseExports_6822 = function(e_6882){
  var bs_6883 = (mapRecord(function(s_6884){
    return ($_6638(skolemizeType_6791))((evalState_6675(newCtx_6787))((generalize_6790(emptyEnv_6792))(parseT_6821(s_6884))))
  }))(e_6882);
  return ((ModuleInterface_6767(bs_6883))([]))([])
};
var instrument_6823 = function(m_6885){
  var addImport_6888 = function(i_6902){
    if((i_6902.$tag==1)&&("./builtins.js"==i_6902.$1)){
      var $phi$720 = ((ImportOpen_6763(i_6902.$0))("./builtins.js"))((push((Pair_6625("perfTime"))("perfTime")))(i_6902.$2))
    } else var $phi$720 = i_6902;
    return $phi$720
  };
  var instrumentExpr_6887 = function(n_6895){
    return function(e_6896){
      if(e_6896.$tag==3){
        var $phi$721 = ((Lam_6715(e_6896.$0))(e_6896.$1))((instrumentExpr_6887(n_6895))(e_6896.$2))
      } else {
        var we_6901 = ((Lam_6715(emptyAnn_6761))("$unused$"))(e_6896);
        var $phi$721 = ((App_6714(emptyAnn_6761))(((App_6714(emptyAnn_6761))((Var_6733(emptyAnn_6761))("perfTime")))((Const_6734(emptyAnn_6761))(CStr_6772(n_6895)))))(we_6901)
      };
      return $phi$721
    }
  };
  var instrumentDef_6886 = function(d_6889){
    if(d_6889.$1.$tag==3){
      var $phi$722 = (Pair_6625(d_6889.$0))((instrumentExpr_6887(d_6889.$0))(((Lam_6715(d_6889.$1.$0))(d_6889.$1.$1))(d_6889.$1.$2)))
    } else var $phi$722 = d_6889;
    return $phi$722
  };
  var $phi$723 = ((((((Module_6768(m_6885.$0))(m_6885.$1))((map(addImport_6888))(m_6885.$2)))(m_6885.$3))(m_6885.$4))(m_6885.$5))((map(instrumentDef_6886))(m_6885.$6));
  return $phi$723
};
var instrumentPass_6834 = function(local$instance$Monad$0){
  return function(profile_6923){
    return function(m_6924){
      if(!profile_6923){
        var $phi$724 = (ret(local$instance$Monad$0))(m_6924)
      } else if(profile_6923){
        var $phi$724 = (ret(local$instance$Monad$0))(instrument_6823(m_6924))
      } else error("pattern match fail",profile_6923);
      return $phi$724
    }
  }
};
var main_6835 = function(argv_6925){
  var args_6926 = (parseArgs_6796(argDefs_6829))((slice(2))(argv_6925));
  var srcFiles_6930 = getPositional_6797(args_6926);
  var builtinsPath_6927 = (getString_6798(args_6926))(builtinsPathArg_6824);
  var baseExports_6933 = ((set("./builtins.js"))(parseExports_6822(loadJSExports(builtinsPath_6927))))(empty);
  var mainName_6929 = ($concat("//"))((getString_6798(args_6926))(mainArg_6826));
  var profile_6931 = (getBool_6799(args_6926))(profileArg_6827);
  var opt_6932 = (getBool_6799(args_6926))(optArg_6828);
  var passes_6934 = (($gt$eq$gt_6628($import1$instance$Monad$11))((($gt$eq$gt_6628($import1$instance$Monad$11))((($gt$eq$gt_6628($import1$instance$Monad$11))((($gt$eq$gt_6628($import1$instance$Monad$11))((($gt$eq$gt_6628($import1$instance$Monad$11))((($gt$eq$gt_6628($import1$instance$Monad$11))((($gt$eq$gt_6628($import1$instance$Monad$11))((perModule_6811($import1$instance$Monad$11))(($_6638(timed_6810("parse")))((liftPass_6830($import1$instance$Monad$11))(parse_6818)))))((timed_6810("dep-sort"))((liftPass_6830($import1$instance$Monad$11))(depSort_6819(mainName_6929))))))((perModule_6811($import1$instance$Monad$11))((($gt$eq$gt_6628($import1$instance$Monad$11))((($gt$eq$gt_6628($import1$instance$Monad$11))((($gt$eq$gt_6628($import1$instance$Monad$11))((($gt$eq$gt_6628($import1$instance$Monad$11))((($gt$eq$gt_6628($import1$instance$Monad$11))((timed_6810("translate-adts"))((liftPass_6830($import1$instance$Monad$11))(translateAdts_6805))))((timed_6810("normalize-imports"))(normalizeImportsPass_6831))))((timed_6810("uniquify"))(uniquify_6802))))((timed_6810("split-lets"))(splitLetsPass_6816($import1$instance$Monad$11)))))((timed_6810("typer"))(typerPass_6832))))((timed_6810("declasser"))(declasserPass_6833))))))((timed_6810("merge-modules"))((liftPass_6830($import1$instance$Monad$11))(mergeModules_6803)))))((timed_6810("opt"))(inline_6804(opt_6932)))))((timed_6810("instrument"))((instrumentPass_6834($import1$instance$Monad$11))(profile_6931)))))((timed_6810("generate-js"))((liftPass_6830($import1$instance$Monad$11))(generateJs_6784(builtinsPath_6927))))))(reportTimes_6807);
  var js_6935 = (evalState_6675(((CompilerState_6806(baseExports_6933))(0))(Empty_6634)))(passes_6934(srcFiles_6930));
  var outPath_6928 = (getString_6798(args_6926))(outPathArg_6825);
  return (writeFile(js_6935))(outPath_6928)
};
var exports = {mainArg:mainArg_6826,profileArg:profileArg_6827,optArg:optArg_6828,builtinsPathArg:builtinsPathArg_6824,outPathArg:outPathArg_6825,argDefs:argDefs_6829,liftPass:liftPass_6830,normalizeImportsPass:normalizeImportsPass_6831,moduleFile:moduleFile_6817,typerPass:typerPass_6832,declasserPass:declasserPass_6833,parse:parse_6818,findImports:findImports_6820,depSort:depSort_6819,parseT:parseT_6821,parseExports:parseExports_6822,instrument:instrument_6823,instrumentPass:instrumentPass_6834,main:main_6835}
module.exports = exports;})();if (module.exports.main)module.exports.main(process.argv)