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
var Pair_3 = function($_0_87){
  return function($_1_88){
    return {$0:$_0_87,$1:$_1_88}
  }
};
var Just_1 = function($_0_86){
  return {$0:$_0_86,$tag:0}
};
var Nothing_2 = {$tag:1};
var Empty_7 = {$tag:0};
var Leaf_8 = function($_0_92){
  return function($_1_93){
    return function($_2_94){
      return {$0:$_0_92,$1:$_1_93,$2:$_2_94,$tag:1}
    }
  }
};
var Collision_9 = function($_0_95){
  return function($_1_96){
    return {$0:$_0_95,$1:$_1_96,$tag:2}
  }
};
var BitmapIndexed_10 = function($_0_97){
  return function($_1_98){
    return function($_2_99){
      return {$0:$_0_97,$1:$_1_98,$2:$_2_99,$tag:3}
    }
  }
};
var Left_4 = function($_0_89){
  return {$0:$_0_89,$tag:0}
};
var Right_5 = function($_0_90){
  return {$0:$_0_90,$tag:1}
};
var Unit_0 = {};
var State_6 = function($_0_91){
  return {$0:$_0_91}
};
var Identity_11 = function($_0_100){
  return {$0:$_0_100}
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
var $instance$Functor$4 = $class$Functor(function(f_432){
  return function(m_433){
    if(m_433.$tag==0){
      var $phi$10 = Just_1(f_432(m_433.$0))
    } else if(m_433.$tag==1){
      var $phi$10 = Nothing_2
    } else error("pattern match fail",m_433);
    return $phi$10
  }
});
var $instance$Applicative$5 = ($class$Applicative(function(x_435){
  return Just_1(x_435)
}))(function(f_436){
  return function(x_437){
    if(f_436.$tag==1){
      var $phi$11 = Nothing_2
    } else if(f_436.$tag==0){
      var $phi$11 = ((fmap($instance$Functor$4))(f_436.$0))(x_437)
    } else error("pattern match fail",f_436);
    return $phi$11
  }
});
var $instance$Alternative$6 = ($class$Alternative(Nothing_2))(function(a_439){
  return function(b_440){
    if(a_439.$tag==1){
      var $phi$12 = b_440
    } else var $phi$12 = a_439;
    return $phi$12
  }
});
var $instance$Monad$7 = ($class$Monad(pure($instance$Applicative$5)))(function(a_442){
  return function(f_443){
    if(a_442.$tag==1){
      var $phi$13 = Nothing_2
    } else if(a_442.$tag==0){
      var $phi$13 = f_443(a_442.$0)
    } else error("pattern match fail",a_442);
    return $phi$13
  }
});
var $instance$Functor$8 = $class$Functor(function(f_445){
  return function(e_446){
    if(e_446.$tag==0){
      var $phi$14 = Left_4(e_446.$0)
    } else if(e_446.$tag==1){
      var $phi$14 = Right_5(f_445(e_446.$0))
    } else error("pattern match fail",e_446);
    return $phi$14
  }
});
var $instance$Functor$9 = $class$Functor(function(f_449){
  return function(s_450){
    var $phi$15 = State_6(function(s_452){
      var $phi$17 = s_450.$0(s_452);
      var $phi$16 = (Pair_3($phi$17.$0))(f_449($phi$17.$1));
      return $phi$16
    });
    return $phi$15
  }
});
var $instance$Applicative$10 = ($class$Applicative(function(a_455){
  return State_6(function(s_456){
    return (Pair_3(s_456))(a_455)
  })
}))(function(f_457){
  return function(a_458){
    var $phi$19 = State_6(function(s_461){
      var $phi$21 = f_457.$0(s_461);
      var $phi$23 = a_458.$0($phi$21.$0);
      var $phi$22 = (Pair_3($phi$23.$0))($phi$21.$1($phi$23.$1));
      var $phi$20 = $phi$22;
      return $phi$20
    });
    var $phi$18 = $phi$19;
    return $phi$18
  }
});
var $instance$Monad$11 = ($class$Monad(pure($instance$Applicative$10)))(function(a_466){
  return function(f_467){
    var $phi$24 = State_6(function(s_469){
      var $phi$26 = a_466.$0(s_469);
      var $phi$28 = f_467($phi$26.$1);
      var $phi$27 = $phi$28.$0($phi$26.$0);
      var $phi$25 = $phi$27;
      return $phi$25
    });
    return $phi$24
  }
});
var $instance$Hashable$12 = $class$Hashable(function(n_473){
  return n_473
});
var $instance$Hashable$13 = $class$Hashable(function(s_474){
  return strHashCode(s_474)
});
var $instance$Functor$14 = $class$Functor(function(f_475){
  return function(i_476){
    var $phi$29 = Identity_11(f_475(i_476.$0));
    return $phi$29
  }
});
var $instance$Applicative$15 = ($class$Applicative(function(x_478){
  return Identity_11(x_478)
}))(function(f_479){
  return function(x_480){
    var $phi$30 = ((fmap($instance$Functor$14))(f_479.$0))(x_480);
    return $phi$30
  }
});
var $instance$Monad$16 = ($class$Monad(pure($instance$Applicative$15)))(function(a_482){
  return function(f_483){
    var $phi$31 = f_483(a_482.$0);
    return $phi$31
  }
});
var assert_85 = function(s_430){
  return function(b_431){
    if(b_431){
      var $phi$32 = true
    } else if(!b_431){
      var $phi$32 = error(s_430)
    } else error("pattern match fail",b_431);
    return $phi$32
  }
};
var mapSnd_84 = function(f_426){
  return function(p_427){
    var $phi$33 = (Pair_3(p_427.$0))(f_426(p_427.$1));
    return $phi$33
  }
};
var mapFst_83 = function(f_422){
  return function(p_423){
    var $phi$34 = (Pair_3(f_422(p_423.$0)))(p_423.$1);
    return $phi$34
  }
};
var $gt$eq$gt_82 = function(local$instance$Monad$0){
  return function(a_419){
    return function(b_420){
      return function(x_421){
        return (($gt$gt$eq(local$instance$Monad$0))(a_419(x_421)))(b_420)
      }
    }
  }
};
var snd_23 = function(p_128){
  var $phi$35 = p_128.$1;
  return $phi$35
};
var debug2_81 = function(p_417){
  return function(x_418){
    return snd_23((Pair_3(debug(p_417)))(x_418))
  }
};
var isJust_21 = function(m_123){
  if(m_123.$tag==0){
    var $phi$36 = true
  } else if(m_123.$tag==1){
    var $phi$36 = false
  } else error("pattern match fail",m_123);
  return $phi$36
};
var $_12 = function(f_101){
  return function(a_102){
    return f_101(a_102)
  }
};
var fst_22 = function(p_125){
  var $phi$37 = p_125.$0;
  return $phi$37
};
var loop_27 = function(f_146){
  return function(start_147){
    var shouldStop_148 = function(x_152){
      if(x_152.$1.$tag==1){
        var $phi$38 = false
      } else var $phi$38 = true;
      return $phi$38
    };
    var next_149 = function(xr_155){
      var $phi$41 = f_146(xr_155.$0);
      if($phi$41.$tag==0){
        var $phi$40 = (Pair_3($phi$41.$0))(Nothing_2)
      } else if($phi$41.$tag==1){
        var $phi$40 = (Pair_3(xr_155.$0))(Just_1($phi$41.$0))
      } else error("pattern match fail",$phi$41);
      var $phi$39 = $phi$40;
      return $phi$39
    };
    var sp_150 = (Pair_3(start_147))(Nothing_2);
    var result_151 = ((iterate(sp_150))(shouldStop_148))(next_149);
    var $phi$43 = snd_23(result_151);
    if($phi$43.$tag==0){
      var $phi$42 = $phi$43.$0
    } else error("pattern match fail",$phi$43);
    return $phi$42
  }
};
var find_29 = function(predicate_165){
  return function(xs_166){
    var f_167 = function(i_168){
      var $phi$45 = (($lt($instance$Ord$2))(i_168))(length(xs_166));
      if(!$phi$45){
        var $phi$44 = Right_5(Nothing_2)
      } else if($phi$45){
        var $phi$47 = predicate_165((getIx(i_168))(xs_166));
        if($phi$47){
          var $phi$46 = Right_5(Just_1((getIx(i_168))(xs_166)))
        } else if(!$phi$47){
          var $phi$46 = Left_4(i_168+1)
        } else error("pattern match fail",$phi$47);
        var $phi$44 = $phi$46
      } else error("pattern match fail",$phi$45);
      return $phi$44
    };
    return (loop_27(f_167))(0)
  }
};
var hamtMask_58 = function(depth_256){
  return function(hash_257){
    var h_258 = (hash_257>>>(depth_256*5))&31;
    return 1<<h_258
  }
};
var popCount_57 = function(n_250){
  var n2_251 = n_250-((n_250>>>1)&1431655765);
  var n3_252 = (n2_251&858993459)+((n2_251>>>2)&858993459);
  var n4_253 = (n3_252+(n3_252>>>4))&252645135;
  var n5_254 = n4_253+(n4_253>>>8);
  var n6_255 = n5_254+(n5_254>>>16);
  return n6_255&127
};
var hamtIndex_59 = function(bitmap_259){
  return function(mask_260){
    return popCount_57(bitmap_259&(mask_260-1))
  }
};
var lookup_60 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_261){
      return function(t_262){
        var hash_263 = (hashCode(local$instance$Hashable$1))(k_261);
        var f_264 = function(depth_265){
          return function(t_266){
            if(t_266.$tag==0){
              var $phi$48 = Nothing_2
            } else if(t_266.$tag==1){
              var $phi$52 = (($eq$eq(local$instance$Eq$0))(k_261))(t_266.$1);
              if(!$phi$52){
                var $phi$51 = Nothing_2
              } else if($phi$52){
                var $phi$51 = Just_1(t_266.$2)
              } else error("pattern match fail",$phi$52);
              var $phi$48 = $phi$51
            } else if(t_266.$tag==2){
              var $phi$48 = ($_12((fmap($instance$Functor$4))(snd_23)))((find_29(function(e_272){
                return (($eq$eq(local$instance$Eq$0))(fst_22(e_272)))(k_261)
              }))(t_266.$1))
            } else if(t_266.$tag==3){
              var m_276 = (hamtMask_58(depth_265))(hash_263);
              var $phi$50 = m_276&t_266.$1;
              if(0==$phi$50){
                var $phi$49 = Nothing_2
              } else var $phi$49 = (f_264(depth_265+1))((getIx((hamtIndex_59(t_266.$1))(m_276)))(t_266.$2));
              var $phi$48 = $phi$49
            } else error("pattern match fail",t_266);
            return $phi$48
          }
        };
        return (f_264(0))(t_262)
      }
    }
  }
};
var setContains_76 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_401){
      return function(s_402){
        return isJust_21((((lookup_60(local$instance$Hashable$1))(local$instance$Eq$0))(a_401))(s_402))
      }
    }
  }
};
var foldTrie_66 = function(f_351){
  return function(a_352){
    return function(t_353){
      if(t_353.$tag==0){
        var $phi$53 = a_352
      } else if(t_353.$tag==1){
        var $phi$53 = ((f_351(a_352))(t_353.$1))(t_353.$2)
      } else if(t_353.$tag==2){
        var $phi$53 = ((foldl(function(a_359){
          return function(e_360){
            return ((f_351(a_359))(fst_22(e_360)))(snd_23(e_360))
          }
        }))(a_352))(t_353.$1)
      } else if(t_353.$tag==3){
        var $phi$53 = ((foldl(foldTrie_66(f_351)))(a_352))(t_353.$2)
      } else error("pattern match fail",t_353);
      return $phi$53
    }
  }
};
var emptySet_72 = Empty_7;
var not_26 = function(b_145){
  if(b_145){
    var $phi$54 = false
  } else if(!b_145){
    var $phi$54 = true
  } else error("pattern match fail",b_145);
  return $phi$54
};
var $div$eq_13 = function(local$instance$Eq$0){
  return function(a_103){
    return function(b_104){
      return not_26((($eq$eq(local$instance$Eq$0))(a_103))(b_104))
    }
  }
};
var mapIx_30 = function(f_169){
  return function(ix_170){
    return function(xs_171){
      return ((setIx(ix_170))(f_169((getIx(ix_170))(xs_171))))(xs_171)
    }
  }
};
var insert_61 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_278){
      return function(v_279){
        return function(t_280){
          var hash_281 = (hashCode(local$instance$Hashable$1))(k_278);
          var f_282 = function(depth_283){
            return function(t_284){
              if(t_284.$tag==0){
                var $phi$55 = ((Leaf_8(0))(k_278))(v_279)
              } else if(t_284.$tag==2){
                var $phi$55 = (Collision_9(t_284.$0))((push((Pair_3(k_278))(v_279)))((filter(function(e_287){
                  return (($div$eq_13(local$instance$Eq$0))(fst_22(e_287)))(k_278)
                }))(t_284.$1)))
              } else if(t_284.$tag==1){
                var $phi$59 = (($eq$eq(local$instance$Eq$0))(k_278))(t_284.$1);
                if($phi$59){
                  var $phi$58 = ((Leaf_8(t_284.$0))(k_278))(v_279)
                } else if(!$phi$59){
                  if(7==depth_283){
                    var $phi$60 = (Collision_9(t_284.$0))([(Pair_3(t_284.$1))(t_284.$2),(Pair_3(k_278))(v_279)])
                  } else {
                    var m_292 = (hamtMask_58(depth_283))((hashCode(local$instance$Hashable$1))(t_284.$1));
                    var $phi$60 = (f_282(depth_283))(((BitmapIndexed_10(t_284.$0))(m_292))([((Leaf_8(m_292))(t_284.$1))(t_284.$2)]))
                  };
                  var $phi$58 = $phi$60
                } else error("pattern match fail",$phi$59);
                var $phi$55 = $phi$58
              } else if(t_284.$tag==3){
                var m_296 = (hamtMask_58(depth_283))(hash_281);
                var bitmap2_297 = m_296|t_284.$1;
                var ix_298 = (hamtIndex_59(bitmap2_297))(m_296);
                var $phi$57 = m_296&t_284.$1;
                if(0==$phi$57){
                  var $phi$56 = ((BitmapIndexed_10(t_284.$0))(bitmap2_297))(((arrIns(ix_298))(((Leaf_8(m_296))(k_278))(v_279)))(t_284.$2))
                } else var $phi$56 = ((BitmapIndexed_10(t_284.$0))(bitmap2_297))(((mapIx_30(f_282(depth_283+1)))(ix_298))(t_284.$2));
                var $phi$55 = $phi$56
              } else error("pattern match fail",t_284);
              return $phi$55
            }
          };
          return (f_282(0))(t_280)
        }
      }
    }
  }
};
var setAdd_73 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_395){
      return function(s_396){
        return ((((insert_61(local$instance$Hashable$1))(local$instance$Eq$0))(a_395))(Unit_0))(s_396)
      }
    }
  }
};
var setIntersection_80 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_411){
      return function(b_412){
        var f_413 = function(r_414){
          return function(k_415){
            return function(__416){
              var $phi$62 = (((setContains_76(local$instance$Hashable$1))(local$instance$Eq$0))(k_415))(a_411);
              if(!$phi$62){
                var $phi$61 = r_414
              } else if($phi$62){
                var $phi$61 = (((setAdd_73(local$instance$Hashable$1))(local$instance$Eq$0))(k_415))(r_414)
              } else error("pattern match fail",$phi$62);
              return $phi$61
            }
          }
        };
        return ((foldTrie_66(f_413))(emptySet_72))(b_412)
      }
    }
  }
};
var remove_63 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_305){
      return function(t_306){
        var hash_307 = (hashCode(local$instance$Hashable$1))(k_305);
        var f_308 = function(depth_309){
          return function(t_310){
            if(t_310.$tag==0){
              var $phi$63 = Empty_7
            } else if(t_310.$tag==1){
              var $phi$73 = (($eq$eq(local$instance$Eq$0))(t_310.$1))(k_305);
              if($phi$73){
                var $phi$72 = Empty_7
              } else if(!$phi$73){
                var $phi$72 = t_310
              } else error("pattern match fail",$phi$73);
              var $phi$63 = $phi$72
            } else if(t_310.$tag==2){
              var entries2_316 = (filter(function(e_317){
                return (($div$eq_13(local$instance$Eq$0))(fst_22(e_317)))(k_305)
              }))(t_310.$1);
              var $phi$71 = length(entries2_316);
              if(0==$phi$71){
                var $phi$70 = Empty_7
              } else if(1==$phi$71){
                var $phi$70 = ((Leaf_8(t_310.$0))(fst_22((getIx(0))(entries2_316))))(snd_23((getIx(0))(entries2_316)))
              } else var $phi$70 = (Collision_9(t_310.$0))(entries2_316);
              var $phi$63 = $phi$70
            } else if(t_310.$tag==3){
              var m_322 = (hamtMask_58(depth_309))(hash_307);
              var ix_323 = (hamtIndex_59(t_310.$1))(m_322);
              var $phi$65 = m_322&t_310.$1;
              if(0==$phi$65){
                var $phi$64 = t_310
              } else {
                var $phi$67 = (f_308(depth_309+1))((getIx(ix_323))(t_310.$2));
                if($phi$67.$tag==0){
                  var bitmap2_325 = (bitNot(m_322))&t_310.$1;
                  var $phi$69 = length(t_310.$2);
                  if(1==$phi$69){
                    var $phi$68 = Empty_7
                  } else if(2==$phi$69){
                    var $phi$68 = (getIx(1&(bitNot(ix_323))))(t_310.$2)
                  } else var $phi$68 = ((BitmapIndexed_10(t_310.$0))(bitmap2_325))(((arrDel(ix_323))(1))(t_310.$2));
                  var $phi$66 = $phi$68
                } else var $phi$66 = ((BitmapIndexed_10(t_310.$0))(t_310.$1))(((setIx(ix_323))($phi$67))(t_310.$2));
                var $phi$64 = $phi$66
              };
              var $phi$63 = $phi$64
            } else error("pattern match fail",t_310);
            return $phi$63
          }
        };
        return (f_308(0))(t_306)
      }
    }
  }
};
var setDiff_79 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_406){
      return function(b_407){
        return ((foldTrie_66(function(r_408){
          return function(k_409){
            return function(__410){
              return (((remove_63(local$instance$Hashable$1))(local$instance$Eq$0))(k_409))(r_408)
            }
          }
        }))(a_406))(b_407)
      }
    }
  }
};
var setToArray_78 = (foldTrie_66(function(vs_403){
  return function(v_404){
    return function(__405){
      return (push(v_404))(vs_403)
    }
  }
}))([]);
var mergeTrie_70 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_386){
      return function(b_387){
        return ((foldTrie_66(function(a_388){
          return function(k_389){
            return function(v_390){
              return ((((insert_61(local$instance$Hashable$1))(local$instance$Eq$0))(k_389))(v_390))(a_388)
            }
          }
        }))(a_386))(b_387)
      }
    }
  }
};
var setUnion_77 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return (mergeTrie_70(local$instance$Hashable$1))(local$instance$Eq$0)
  }
};
var setRemove_75 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return (remove_63(local$instance$Hashable$1))(local$instance$Eq$0)
  }
};
var setAddAll_74 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(vs_397){
      return function(s_398){
        return ((foldl(function(s_399){
          return function(v_400){
            return (((setAdd_73(local$instance$Hashable$1))(local$instance$Eq$0))(v_400))(s_399)
          }
        }))(s_398))(vs_397)
      }
    }
  }
};
var trieKeys_71 = function(m_391){
  return ((foldTrie_66(function(ks_392){
    return function(k_393){
      return function(__394){
        return (push(k_393))(ks_392)
      }
    }
  }))([]))(m_391)
};
var size_68 = function(t_375){
  if(t_375.$tag==0){
    var $phi$74 = 0
  } else if(t_375.$tag==1){
    var $phi$74 = 1
  } else if(t_375.$tag==2){
    var $phi$74 = length(t_375.$1)
  } else if(t_375.$tag==3){
    var $phi$74 = ((foldl($add))(0))((map(size_68))(t_375.$2))
  } else error("pattern match fail",t_375);
  return $phi$74
};
var mapTrie_67 = function(f_364){
  return function(t_365){
    if(t_365.$tag==0){
      var $phi$75 = Empty_7
    } else if(t_365.$tag==1){
      var $phi$75 = ((Leaf_8(t_365.$0))(t_365.$1))((f_364(t_365.$1))(t_365.$2))
    } else if(t_365.$tag==2){
      var $phi$75 = ($_12(Collision_9(t_365.$0)))((map(function(e_371){
        return ($_12(Pair_3(fst_22(e_371))))((f_364(fst_22(e_371)))(snd_23(e_371)))
      }))(t_365.$1))
    } else if(t_365.$tag==3){
      var $phi$75 = ($_12((BitmapIndexed_10(t_365.$0))(t_365.$1)))((map(mapTrie_67(f_364)))(t_365.$2))
    } else error("pattern match fail",t_365);
    return $phi$75
  }
};
var nodeMask_56 = function(t_241){
  if(t_241.$tag==0){
    var $phi$76 = 0
  } else if(t_241.$tag==1){
    var $phi$76 = t_241.$0
  } else if(t_241.$tag==2){
    var $phi$76 = t_241.$0
  } else if(t_241.$tag==3){
    var $phi$76 = t_241.$0
  } else error("pattern match fail",t_241);
  return $phi$76
};
var isEmpty_69 = function(t_384){
  if(t_384.$tag==0){
    var $phi$77 = true
  } else var $phi$77 = false;
  return $phi$77
};
var filterTrie_65 = function(f_331){
  return function(t_332){
    if(t_332.$tag==0){
      var $phi$78 = Empty_7
    } else if(t_332.$tag==1){
      var $phi$83 = (f_331(t_332.$1))(t_332.$2);
      if(!$phi$83){
        var $phi$82 = Empty_7
      } else if($phi$83){
        var $phi$82 = t_332
      } else error("pattern match fail",$phi$83);
      var $phi$78 = $phi$82
    } else if(t_332.$tag==2){
      var entries2_338 = (filter(function(e_339){
        return (f_331(fst_22(e_339)))(snd_23(e_339))
      }))(t_332.$1);
      var $phi$81 = length(entries2_338);
      if(0==$phi$81){
        var $phi$80 = Empty_7
      } else if(1==$phi$81){
        var $phi$80 = ((Leaf_8(t_332.$0))(fst_22((getIx(0))(entries2_338))))(snd_23((getIx(0))(entries2_338)))
      } else var $phi$80 = (Collision_9(t_332.$0))(entries2_338);
      var $phi$78 = $phi$80
    } else if(t_332.$tag==3){
      var pred_344 = function(e_347){
        return not_26(isEmpty_69(e_347))
      };
      var entries2_345 = (filter(pred_344))((map(filterTrie_65(f_331)))(t_332.$2));
      var bitmap2_346 = ((foldl(function(r_348){
        return function(e_349){
          return r_348|(nodeMask_56(e_349))
        }
      }))(0))(entries2_345);
      if(0==bitmap2_346){
        var $phi$79 = Empty_7
      } else var $phi$79 = ((BitmapIndexed_10(t_332.$0))(bitmap2_346))(entries2_345);
      var $phi$78 = $phi$79
    } else error("pattern match fail",t_332);
    return $phi$78
  }
};
var nextSetBitMask_64 = function(m_328){
  return function(n_329){
    var $phi$85 = m_328&n_329;
    if(0==$phi$85){
      var $phi$84 = (nextSetBitMask_64(m_328<<1))(n_329)
    } else var $phi$84 = m_328;
    return $phi$84
  }
};
var updateOrSet_62 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_300){
      return function(f_301){
        return function(d_302){
          return function(m_303){
            var $phi$87 = (((lookup_60(local$instance$Hashable$1))(local$instance$Eq$0))(k_300))(m_303);
            if($phi$87.$tag==1){
              var $phi$86 = ((((insert_61(local$instance$Hashable$1))(local$instance$Eq$0))(k_300))(d_302))(m_303)
            } else if($phi$87.$tag==0){
              var $phi$86 = ((((insert_61(local$instance$Hashable$1))(local$instance$Eq$0))(k_300))(f_301($phi$87.$0)))(m_303)
            } else error("pattern match fail",$phi$87);
            return $phi$86
          }
        }
      }
    }
  }
};
var runState_54 = function(s_236){
  return function(m_237){
    var $phi$88 = m_237.$0(s_236);
    return $phi$88
  }
};
var evalState_55 = function(s_239){
  return function(m_240){
    return snd_23((runState_54(s_239))(m_240))
  }
};
var sets_53 = function(s_234){
  return State_6(function(__235){
    return (Pair_3(s_234))(Unit_0)
  })
};
var gets_52 = State_6(function(s_233){
  return (Pair_3(s_233))(s_233)
});
var foldM_49 = function(local$instance$Monad$0){
  return function(f_220){
    return function(r_221){
      return function(xs_222){
        return ((foldl(function(r_223){
          return function(x_224){
            return (($gt$gt$eq(local$instance$Monad$0))(r_223))(function(r_225){
              return (f_220(r_225))(x_224)
            })
          }
        }))((ret(local$instance$Monad$0))(r_221)))(xs_222)
      }
    }
  }
};
var mapM_50 = function(local$instance$Monad$0){
  return function(f_226){
    return function(xs_227){
      return (((foldM_49(local$instance$Monad$0))(function(xs_228){
        return function(x_229){
          return (($gt$gt$eq(local$instance$Monad$0))(f_226(x_229)))(function(x_230){
            return (ret(local$instance$Monad$0))((push(x_230))(xs_228))
          })
        }
      }))([]))(xs_227)
    }
  }
};
var forM_51 = function(local$instance$Monad$0){
  return function(xs_231){
    return function(f_232){
      return ((mapM_50(local$instance$Monad$0))(f_232))(xs_231)
    }
  }
};
var strToArray_48 = function(s_215){
  var f_216 = function(p_217){
    var $phi$91 = (($lt($instance$Ord$2))(p_217.$0))(length(s_215));
    if(!$phi$91){
      var $phi$90 = Right_5(p_217.$1)
    } else if($phi$91){
      var $phi$90 = Left_4((Pair_3(p_217.$0+1))((push((getChar(p_217.$0))(s_215)))(p_217.$1)))
    } else error("pattern match fail",$phi$91);
    var $phi$89 = $phi$90;
    return $phi$89
  };
  return (loop_27(f_216))((Pair_3(0))([]))
};
var toRecord_47 = (foldl(function(r_211){
  return function(p_212){
    var $phi$92 = ((set(p_212.$0))(p_212.$1))(r_211);
    return $phi$92
  }
}))(empty);
var reverse_46 = (foldl(function(xs_209){
  return function(x_210){
    return (enqueue(x_210))(xs_209)
  }
}))([]);
var tail_41 = slice(1);
var head_40 = getIx(0);
var uniq_45 = function(local$instance$Eq$0){
  return function(xs_208){
    var $phi$94 = (($lt($instance$Ord$2))(length(xs_208)))(2);
    if($phi$94){
      var $phi$93 = xs_208
    } else if(!$phi$94){
      var $phi$96 = (($eq$eq(local$instance$Eq$0))((getIx(0))(xs_208)))((getIx(1))(xs_208));
      if(!$phi$96){
        var $phi$95 = (enqueue(head_40(xs_208)))((uniq_45(local$instance$Eq$0))(tail_41(xs_208)))
      } else if($phi$96){
        var $phi$95 = (uniq_45(local$instance$Eq$0))(tail_41(xs_208))
      } else error("pattern match fail",$phi$96);
      var $phi$93 = $phi$95
    } else error("pattern match fail",$phi$94);
    return $phi$93
  }
};
var mergeSet_44 = function(local$instance$Ord$1){
  return function(local$instance$Eq$0){
    return function(xs_204){
      return function(ys_205){
        var $phi$98 = length(xs_204);
        if(0==$phi$98){
          var $phi$97 = ys_205
        } else {
          var $phi$100 = length(ys_205);
          if(0==$phi$100){
            var $phi$99 = xs_204
          } else {
            var $phi$102 = (($lt(local$instance$Ord$1))(head_40(xs_204)))(head_40(ys_205));
            if($phi$102){
              var $phi$101 = (enqueue(head_40(xs_204)))((((mergeSet_44(local$instance$Ord$1))(local$instance$Eq$0))(tail_41(xs_204)))(ys_205))
            } else if(!$phi$102){
              var $phi$104 = (($eq$eq(local$instance$Eq$0))(head_40(xs_204)))(head_40(ys_205));
              if($phi$104){
                var $phi$103 = (enqueue(head_40(xs_204)))((((mergeSet_44(local$instance$Ord$1))(local$instance$Eq$0))(tail_41(xs_204)))(tail_41(ys_205)))
              } else if(!$phi$104){
                var $phi$103 = (enqueue(head_40(ys_205)))((((mergeSet_44(local$instance$Ord$1))(local$instance$Eq$0))(xs_204))(tail_41(ys_205)))
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
var init_43 = function(l_203){
  return ((slice2(0))((length(l_203))-1))(l_203)
};
var last_42 = function(l_202){
  return (getIx((length(l_202))-1))(l_202)
};
var mapJust_39 = function(f_196){
  return function(xs_197){
    var g_198 = function(r_199){
      return function(x_200){
        var $phi$106 = f_196(x_200);
        if($phi$106.$tag==1){
          var $phi$105 = r_199
        } else if($phi$106.$tag==0){
          var $phi$105 = (push($phi$106.$0))(r_199)
        } else error("pattern match fail",$phi$106);
        return $phi$105
      }
    };
    return ((foldl(g_198))([]))(xs_197)
  }
};
var concatMap_38 = function(f_194){
  return function(a_195){
    return ((foldl(concat))([]))((map(f_194))(a_195))
  }
};
var zip_37 = function(xs_192){
  return function(ys_193){
    var $phi$108 = ($or((($eq$eq($instance$Eq$0))(length(xs_192)))(0)))((($eq$eq($instance$Eq$0))(length(ys_193)))(0));
    if($phi$108){
      var $phi$107 = []
    } else if(!$phi$108){
      var $phi$107 = (enqueue((Pair_3(head_40(xs_192)))(head_40(ys_193))))((zip_37(tail_41(xs_192)))(tail_41(ys_193)))
    } else error("pattern match fail",$phi$108);
    return $phi$107
  }
};
var zipWithIndex2_35 = function(n_189){
  return function(xs_190){
    var $phi$110 = length(xs_190);
    if(0==$phi$110){
      var $phi$109 = []
    } else var $phi$109 = (enqueue((Pair_3(n_189))(head_40(xs_190))))((zipWithIndex2_35(n_189+1))(tail_41(xs_190)));
    return $phi$109
  }
};
var zipWithIndex_36 = zipWithIndex2_35(0);
var join_34 = function(xs_184){
  return function(s_185){
    var $phi$112 = length(xs_184);
    if(0==$phi$112){
      var $phi$111 = ""
    } else var $phi$111 = (foldl1(function(a_187){
      return function(b_188){
        return ($concat(($concat(a_187))(s_185)))(b_188)
      }
    }))(xs_184);
    return $phi$111
  }
};
var all_33 = function(f_180){
  return function(xs_181){
    return ((foldl(function(r_182){
      return function(x_183){
        return ($and(f_180(x_183)))(r_182)
      }
    }))(true))(xs_181)
  }
};
var exists_32 = function(f_176){
  return function(xs_177){
    return ((foldl(function(r_178){
      return function(x_179){
        return ($or(f_176(x_179)))(r_178)
      }
    }))(false))(xs_177)
  }
};
var containsChar_31 = function(x_172){
  return function(xs_173){
    var f_174 = function(i_175){
      var $phi$114 = (($lt($instance$Ord$2))(i_175))(length(xs_173));
      if(!$phi$114){
        var $phi$113 = false
      } else if($phi$114){
        var $phi$116 = (($eq$eq($instance$Eq$1))((getChar(i_175))(xs_173)))(x_172);
        if($phi$116){
          var $phi$115 = true
        } else if(!$phi$116){
          var $phi$115 = f_174(i_175+1)
        } else error("pattern match fail",$phi$116);
        var $phi$113 = $phi$115
      } else error("pattern match fail",$phi$114);
      return $phi$113
    };
    return f_174(0)
  }
};
var contains_28 = function(local$instance$Eq$0){
  return function(x_161){
    return function(xs_162){
      var f_163 = function(i_164){
        var $phi$118 = (($lt($instance$Ord$2))(i_164))(length(xs_162));
        if(!$phi$118){
          var $phi$117 = Right_5(false)
        } else if($phi$118){
          var $phi$120 = (($eq$eq(local$instance$Eq$0))(x_161))((getIx(i_164))(xs_162));
          if($phi$120){
            var $phi$119 = Right_5(true)
          } else if(!$phi$120){
            var $phi$119 = Left_4(i_164+1)
          } else error("pattern match fail",$phi$120);
          var $phi$117 = $phi$119
        } else error("pattern match fail",$phi$118);
        return $phi$117
      };
      return (loop_27(f_163))(0)
    }
  }
};
var either_24 = function(f_131){
  return function(g_132){
    return function(e_133){
      if(e_133.$tag==0){
        var $phi$121 = f_131(e_133.$0)
      } else if(e_133.$tag==1){
        var $phi$121 = g_132(e_133.$0)
      } else error("pattern match fail",e_133);
      return $phi$121
    }
  }
};
var splitEither_25 = function(a_136){
  return (Pair_3((map(function(e_137){
    if(e_137.$tag==0){
      var $phi$122 = e_137.$0
    } else error("pattern match fail",e_137);
    return $phi$122
  }))((filter((either_24(function(__139){
    return true
  }))(function(__140){
    return false
  })))(a_136))))((map(function(e_141){
    if(e_141.$tag==1){
      var $phi$123 = e_141.$0
    } else error("pattern match fail",e_141);
    return $phi$123
  }))((filter((either_24(function(__143){
    return false
  }))(function(__144){
    return true
  })))(a_136)))
};
var fromJust_20 = function(m_121){
  if(m_121.$tag==0){
    var $phi$124 = m_121.$0
  } else if(m_121.$tag==1){
    var $phi$124 = error("expected Just but got Nothing")
  } else error("pattern match fail",m_121);
  return $phi$124
};
var justOr_19 = function(d_118){
  return function(m_119){
    if(m_119.$tag==0){
      var $phi$125 = m_119.$0
    } else if(m_119.$tag==1){
      var $phi$125 = d_118
    } else error("pattern match fail",m_119);
    return $phi$125
  }
};
var maybe_18 = function(a_114){
  return function(b_115){
    return function(m_116){
      if(m_116.$tag==0){
        var $phi$126 = a_114(m_116.$0)
      } else if(m_116.$tag==1){
        var $phi$126 = b_115
      } else error("pattern match fail",m_116);
      return $phi$126
    }
  }
};
var $gt$gt_17 = function(local$instance$Monad$0){
  return function(a_111){
    return function(b_112){
      return (($gt$gt$eq(local$instance$Monad$0))(a_111))(function(__113){
        return b_112
      })
    }
  }
};
var $gt$eq_16 = function(local$instance$Ord$0){
  return function(a_109){
    return function(b_110){
      return not_26((($lt(local$instance$Ord$0))(a_109))(b_110))
    }
  }
};
var $lt$eq_15 = function(local$instance$Ord$0){
  return function(a_107){
    return function(b_108){
      return not_26((($lt(local$instance$Ord$0))(b_108))(a_107))
    }
  }
};
var $gt_14 = function(local$instance$Ord$0){
  return function(a_105){
    return function(b_106){
      return (($lt(local$instance$Ord$0))(b_106))(a_105)
    }
  }
};
var assert_485 = assert_85;
var Pair_486 = Pair_3;
var mapSnd_487 = mapSnd_84;
var mapFst_488 = mapFst_83;
var $gt$eq$gt_489 = $gt$eq$gt_82;
var snd_490 = snd_23;
var debug2_491 = debug2_81;
var Just_492 = Just_1;
var Nothing_493 = Nothing_2;
var isJust_494 = isJust_21;
var Empty_495 = Empty_7;
var Leaf_496 = Leaf_8;
var Collision_497 = Collision_9;
var BitmapIndexed_498 = BitmapIndexed_10;
var $_499 = $_12;
var fst_500 = fst_22;
var Left_501 = Left_4;
var Right_502 = Right_5;
var loop_503 = loop_27;
var find_504 = find_29;
var hamtMask_505 = hamtMask_58;
var popCount_506 = popCount_57;
var hamtIndex_507 = hamtIndex_59;
var lookup_508 = lookup_60;
var setContains_509 = setContains_76;
var foldTrie_510 = foldTrie_66;
var emptySet_511 = emptySet_72;
var Unit_512 = Unit_0;
var not_513 = not_26;
var $div$eq_514 = $div$eq_13;
var mapIx_515 = mapIx_30;
var insert_516 = insert_61;
var setAdd_517 = setAdd_73;
var setIntersection_518 = setIntersection_80;
var remove_519 = remove_63;
var setDiff_520 = setDiff_79;
var setToArray_521 = setToArray_78;
var mergeTrie_522 = mergeTrie_70;
var setUnion_523 = setUnion_77;
var setRemove_524 = setRemove_75;
var setAddAll_525 = setAddAll_74;
var trieKeys_526 = trieKeys_71;
var size_527 = size_68;
var mapTrie_528 = mapTrie_67;
var nodeMask_529 = nodeMask_56;
var isEmpty_530 = isEmpty_69;
var filterTrie_531 = filterTrie_65;
var nextSetBitMask_532 = nextSetBitMask_64;
var updateOrSet_533 = updateOrSet_62;
var State_534 = State_6;
var runState_535 = runState_54;
var evalState_536 = evalState_55;
var sets_537 = sets_53;
var gets_538 = gets_52;
var foldM_539 = foldM_49;
var mapM_540 = mapM_50;
var forM_541 = forM_51;
var strToArray_542 = strToArray_48;
var toRecord_543 = toRecord_47;
var reverse_544 = reverse_46;
var tail_545 = tail_41;
var head_546 = head_40;
var uniq_547 = uniq_45;
var mergeSet_548 = mergeSet_44;
var init_549 = init_43;
var last_550 = last_42;
var mapJust_551 = mapJust_39;
var concatMap_552 = concatMap_38;
var zip_553 = zip_37;
var zipWithIndex2_554 = zipWithIndex2_35;
var zipWithIndex_555 = zipWithIndex_36;
var join_556 = join_34;
var all_557 = all_33;
var exists_558 = exists_32;
var containsChar_559 = containsChar_31;
var contains_560 = contains_28;
var either_561 = either_24;
var splitEither_562 = splitEither_25;
var fromJust_563 = fromJust_20;
var justOr_564 = justOr_19;
var maybe_565 = maybe_18;
var $gt$gt_566 = $gt$gt_17;
var $gt$eq_567 = $gt$eq_16;
var $lt$eq_568 = $lt$eq_15;
var $gt_569 = $gt_14;
var Identity_570 = Identity_11;
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
var dfs_571 = function(g_575){
  return function(visited_576){
    return function(v_577){
      var visit_578 = function(r_581){
        return function(e_582){
          var $phi$128 = ((contains_560($import1$instance$Eq$1))(e_582))(r_581);
          if($phi$128){
            var $phi$127 = r_581
          } else if(!$phi$128){
            var $phi$127 = (concat(((dfs_571(g_575))((push(v_577))((concat(r_581))(visited_576))))(e_582)))(r_581)
          } else error("pattern match fail",$phi$128);
          return $phi$127
        }
      };
      var es_579 = (filter(function(v_583){
        return not_513(((contains_560($import1$instance$Eq$1))(v_583))(visited_576))
      }))((get(v_577))(g_575));
      var r_580 = ((foldr(visit_578))([]))(es_579);
      return (enqueue(v_577))(r_580)
    }
  }
};
var fullDfs_572 = function(g_584){
  var visit_585 = function(result_587){
    return function(v_588){
      return function(__589){
        var $phi$130 = ((contains_560($import1$instance$Eq$1))(v_588))(result_587);
        if($phi$130){
          var $phi$129 = result_587
        } else if(!$phi$130){
          var $phi$129 = (concat(((dfs_571(g_584))(result_587))(v_588)))(result_587)
        } else error("pattern match fail",$phi$130);
        return $phi$129
      }
    }
  };
  var result_586 = ((foldRecord(visit_585))([]))(g_584);
  return result_586
};
var scc_573 = function(g_590){
  var invertEdge_595 = function(v_597){
    return function(ig_598){
      return function(e_599){
        var $phi$132 = (has(e_599))(ig_598);
        if($phi$132){
          var $phi$131 = ((set(e_599))((push(v_597))((get(e_599))(ig_598))))(ig_598)
        } else if(!$phi$132){
          var $phi$131 = ((set(e_599))([v_597]))(ig_598)
        } else error("pattern match fail",$phi$132);
        return $phi$131
      }
    }
  };
  var invert_596 = function(ig_600){
    return function(v_601){
      return function(es_602){
        var $phi$134 = (has(v_601))(ig_600);
        if($phi$134){
          var $phi$133 = ig_600
        } else if(!$phi$134){
          var $phi$133 = ((set(v_601))([]))(ig_600)
        } else error("pattern match fail",$phi$134);
        var ig2_603 = $phi$133;
        return ((foldl(invertEdge_595(v_601)))(ig2_603))(es_602)
      }
    }
  };
  var invertedG_591 = ((foldRecord(invert_596))(empty))(g_590);
  var assembleCc_592 = function(gs_604){
    return function(v_605){
      var $phi$137 = (exists_558((contains_560($import1$instance$Eq$1))(v_605)))(gs_604.$1);
      if($phi$137){
        var $phi$136 = (Pair_486(gs_604.$0))(gs_604.$1)
      } else if(!$phi$137){
        var cc_608 = ((dfs_571(gs_604.$0))([]))(v_605);
        var ig2_609 = ((foldl(function(g_610){
          return function(v_611){
            return (del(v_611))((mapRecord(filter(function(w_612){
              return (($div$eq_514($import1$instance$Eq$1))(w_612))(v_611)
            })))(g_610))
          }
        }))(gs_604.$0))(cc_608);
        var $phi$136 = (Pair_486(ig2_609))((push(cc_608))(gs_604.$1))
      } else error("pattern match fail",$phi$137);
      var $phi$135 = $phi$136;
      return $phi$135
    }
  };
  var firstDfs_593 = fullDfs_572(g_590);
  var ccs_594 = snd_490(((foldl(assembleCc_592))((Pair_486(invertedG_591))([])))(firstDfs_593));
  return ccs_594
};
var sccSorted_574 = function(g_613){
  var ccs_614 = scc_573(g_613);
  var topSort_615 = function(ccs_617){
    var f_622 = function(r_623){
      return function(icc_624){
        var $phi$138 = ((foldl(function(r_627){
          return function(c_628){
            return ((set(c_628))(intToString(icc_624.$0)))(r_627)
          }
        }))(r_623))(icc_624.$1);
        return $phi$138
      }
    };
    var g2g_618 = ((foldl(f_622))(empty))(zipWithIndex_555(ccs_617));
    var addGraph_619 = function(r_629){
      return function(v_630){
        return function(es_631){
          var rv_632 = (get(v_630))(g2g_618);
          var res_633 = (uniq_547($import1$instance$Eq$1))(sort((filter(function(re_634){
            return (($div$eq_514($import1$instance$Eq$1))(re_634))(rv_632)
          }))((map(function(e_635){
            return (get(e_635))(g2g_618)
          }))(es_631))));
          var $phi$140 = (has(rv_632))(r_629);
          if(!$phi$140){
            var $phi$139 = ((set(rv_632))(res_633))(r_629)
          } else if($phi$140){
            var $phi$139 = ((set(rv_632))((((mergeSet_548($import1$instance$Ord$3))($import1$instance$Eq$1))(res_633))((get(rv_632))(r_629))))(r_629)
          } else error("pattern match fail",$phi$140);
          return $phi$139
        }
      }
    };
    var cg_620 = ((foldRecord(addGraph_619))(empty))(g_613);
    var ord_621 = fullDfs_572(cg_620);
    return reverse_544((map(function(i_636){
      return (getIx(unsafeStringToInt(i_636)))(ccs_617)
    }))(ord_621))
  };
  var result_616 = topSort_615(ccs_614);
  return result_616
};
var assert_637 = assert_85;
var Pair_638 = Pair_3;
var mapSnd_639 = mapSnd_84;
var mapFst_640 = mapFst_83;
var $gt$eq$gt_641 = $gt$eq$gt_82;
var snd_642 = snd_23;
var debug2_643 = debug2_81;
var Just_644 = Just_1;
var Nothing_645 = Nothing_2;
var isJust_646 = isJust_21;
var Empty_647 = Empty_7;
var Leaf_648 = Leaf_8;
var Collision_649 = Collision_9;
var BitmapIndexed_650 = BitmapIndexed_10;
var $_651 = $_12;
var fst_652 = fst_22;
var Left_653 = Left_4;
var Right_654 = Right_5;
var loop_655 = loop_27;
var find_656 = find_29;
var hamtMask_657 = hamtMask_58;
var popCount_658 = popCount_57;
var hamtIndex_659 = hamtIndex_59;
var lookup_660 = lookup_60;
var setContains_661 = setContains_76;
var foldTrie_662 = foldTrie_66;
var emptySet_663 = emptySet_72;
var Unit_664 = Unit_0;
var not_665 = not_26;
var $div$eq_666 = $div$eq_13;
var mapIx_667 = mapIx_30;
var insert_668 = insert_61;
var setAdd_669 = setAdd_73;
var setIntersection_670 = setIntersection_80;
var remove_671 = remove_63;
var setDiff_672 = setDiff_79;
var setToArray_673 = setToArray_78;
var mergeTrie_674 = mergeTrie_70;
var setUnion_675 = setUnion_77;
var setRemove_676 = setRemove_75;
var setAddAll_677 = setAddAll_74;
var trieKeys_678 = trieKeys_71;
var size_679 = size_68;
var mapTrie_680 = mapTrie_67;
var nodeMask_681 = nodeMask_56;
var isEmpty_682 = isEmpty_69;
var filterTrie_683 = filterTrie_65;
var nextSetBitMask_684 = nextSetBitMask_64;
var updateOrSet_685 = updateOrSet_62;
var State_686 = State_6;
var runState_687 = runState_54;
var evalState_688 = evalState_55;
var sets_689 = sets_53;
var gets_690 = gets_52;
var foldM_691 = foldM_49;
var mapM_692 = mapM_50;
var forM_693 = forM_51;
var strToArray_694 = strToArray_48;
var toRecord_695 = toRecord_47;
var reverse_696 = reverse_46;
var tail_697 = tail_41;
var head_698 = head_40;
var uniq_699 = uniq_45;
var mergeSet_700 = mergeSet_44;
var init_701 = init_43;
var last_702 = last_42;
var mapJust_703 = mapJust_39;
var concatMap_704 = concatMap_38;
var zip_705 = zip_37;
var zipWithIndex2_706 = zipWithIndex2_35;
var zipWithIndex_707 = zipWithIndex_36;
var join_708 = join_34;
var all_709 = all_33;
var exists_710 = exists_32;
var containsChar_711 = containsChar_31;
var contains_712 = contains_28;
var either_713 = either_24;
var splitEither_714 = splitEither_25;
var fromJust_715 = fromJust_20;
var justOr_716 = justOr_19;
var maybe_717 = maybe_18;
var $gt$gt_718 = $gt$gt_17;
var $gt$eq_719 = $gt$eq_16;
var $lt$eq_720 = $lt$eq_15;
var $gt_721 = $gt_14;
var Identity_722 = Identity_11;
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
var App_731 = function($_0_796){
  return function($_1_797){
    return function($_2_798){
      return {$0:$_0_796,$1:$_1_797,$2:$_2_798,$tag:2}
    }
  }
};
var Lam_732 = function($_0_799){
  return function($_1_800){
    return function($_2_801){
      return {$0:$_0_799,$1:$_1_800,$2:$_2_801,$tag:3}
    }
  }
};
var Case_733 = function($_0_802){
  return function($_1_803){
    return function($_2_804){
      return {$0:$_0_802,$1:$_1_803,$2:$_2_804,$tag:4}
    }
  }
};
var Let_734 = function($_0_805){
  return function($_1_806){
    return function($_2_807){
      return {$0:$_0_805,$1:$_1_806,$2:$_2_807,$tag:5}
    }
  }
};
var New_735 = function($_0_808){
  return function($_1_809){
    return function($_2_810){
      return {$0:$_0_808,$1:$_1_809,$2:$_2_810,$tag:6}
    }
  }
};
var AnnType_723 = function($_0_785){
  return {$0:$_0_785,$tag:0}
};
var TUnknown_754 = {$tag:6};
var Var_729 = function($_0_792){
  return function($_1_793){
    return {$0:$_0_792,$1:$_1_793,$tag:0}
  }
};
var Const_730 = function($_0_794){
  return function($_1_795){
    return {$0:$_0_794,$1:$_1_795,$tag:1}
  }
};
var Data_743 = function($_0_830){
  return function($_1_831){
    return function($_2_832){
      return function($_3_833){
        return {$0:$_0_830,$1:$_1_831,$2:$_2_832,$3:$_3_833}
      }
    }
  }
};
var DataCon_744 = function($_0_834){
  return function($_1_835){
    return function($_2_836){
      return {$0:$_0_834,$1:$_1_835,$2:$_2_836}
    }
  }
};
var TCBound_747 = function($_0_845){
  return function($_1_846){
    return function($_2_847){
      return {$0:$_0_845,$1:$_1_846,$2:$_2_847}
    }
  }
};
var TConst_748 = function($_0_848){
  return function($_1_849){
    return {$0:$_0_848,$1:$_1_849,$tag:0}
  }
};
var TVar_749 = function($_0_850){
  return function($_1_851){
    return {$0:$_0_850,$1:$_1_851,$tag:1}
  }
};
var TApp_750 = function($_0_852){
  return function($_1_853){
    return function($_2_854){
      return {$0:$_0_852,$1:$_1_853,$2:$_2_854,$tag:2}
    }
  }
};
var TRow_751 = function($_0_855){
  return function($_1_856){
    return function($_2_857){
      return {$0:$_0_855,$1:$_1_856,$2:$_2_857,$tag:3}
    }
  }
};
var TBot_752 = {$tag:4};
var TForall_753 = function($_0_858){
  return function($_1_859){
    return function($_2_860){
      return function($_3_861){
        return {$0:$_0_858,$1:$_1_859,$2:$_2_860,$3:$_3_861,$tag:5}
      }
    }
  }
};
var AnnCodeLoc_724 = function($_0_786){
  return function($_1_787){
    return function($_2_788){
      return {$0:$_0_786,$1:$_1_787,$2:$_2_788,$tag:1}
    }
  }
};
var ImportAll_757 = function($_0_868){
  return function($_1_869){
    return {$0:$_0_868,$1:$_1_869,$tag:2}
  }
};
var ImportOpen_756 = function($_0_865){
  return function($_1_866){
    return function($_2_867){
      return {$0:$_0_865,$1:$_1_866,$2:$_2_867,$tag:1}
    }
  }
};
var ImportClosed_755 = function($_0_862){
  return function($_1_863){
    return function($_2_864){
      return {$0:$_0_862,$1:$_1_863,$2:$_2_864,$tag:0}
    }
  }
};
var Instance_746 = function($_0_841){
  return function($_1_842){
    return function($_2_843){
      return function($_3_844){
        return {$0:$_0_841,$1:$_1_842,$2:$_2_843,$3:$_3_844}
      }
    }
  }
};
var Class_745 = function($_0_837){
  return function($_1_838){
    return function($_2_839){
      return function($_3_840){
        return {$0:$_0_837,$1:$_1_838,$2:$_2_839,$3:$_3_840}
      }
    }
  }
};
var ModuleInterface_742 = function($_0_827){
  return function($_1_828){
    return function($_2_829){
      return {$0:$_0_827,$1:$_1_828,$2:$_2_829}
    }
  }
};
var Module_741 = function($_0_820){
  return function($_1_821){
    return function($_2_822){
      return function($_3_823){
        return function($_4_824){
          return function($_5_825){
            return function($_6_826){
              return {$0:$_0_820,$1:$_1_821,$2:$_2_822,$3:$_3_823,$4:$_4_824,$5:$_5_825,$6:$_6_826}
            }
          }
        }
      }
    }
  }
};
var PData_740 = function($_0_817){
  return function($_1_818){
    return function($_2_819){
      return {$0:$_0_817,$1:$_1_818,$2:$_2_819,$tag:2}
    }
  }
};
var PConst_739 = function($_0_815){
  return function($_1_816){
    return {$0:$_0_815,$1:$_1_816,$tag:1}
  }
};
var PVar_738 = function($_0_813){
  return function($_1_814){
    return {$0:$_0_813,$1:$_1_814,$tag:0}
  }
};
var CStr_737 = function($_0_812){
  return {$0:$_0_812,$tag:1}
};
var CNum_736 = function($_0_811){
  return {$0:$_0_811,$tag:0}
};
var AnnExport_728 = function($_0_791){
  return {$0:$_0_791,$tag:5}
};
var AnnTag_727 = {$tag:4};
var AnnData_726 = function($_0_790){
  return {$0:$_0_790,$tag:3}
};
var AnnUseCount_725 = function($_0_789){
  return {$0:$_0_789,$tag:2}
};
var breakableDownAndUpM_780 = function(local$instance$Monad$0){
  return function(down_1073){
    return function(up_1074){
      return function(e_1075){
        var go_1076 = ((breakableDownAndUpM_780(local$instance$Monad$0))(down_1073))(up_1074);
        var gos_1077 = (mapM_692(local$instance$Monad$0))(function(d_1078){
          var $phi$141 = (($gt$gt$eq(local$instance$Monad$0))(go_1076(d_1078.$1)))(function(e_1081){
            return (ret(local$instance$Monad$0))((Pair_638(d_1078.$0))(e_1081))
          });
          return $phi$141
        });
        return (($gt$gt$eq(local$instance$Monad$0))(down_1073(e_1075)))(function(e_1082){
          if(e_1082.$tag==1){
            var $phi$142 = (ret(local$instance$Monad$0))(e_1082.$0)
          } else if(e_1082.$tag==0){
            if(e_1082.$0.$tag==3){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(go_1076(e_1082.$0.$2)))(function(e_1088){
                return up_1074(((Lam_732(e_1082.$0.$0))(e_1082.$0.$1))(e_1088))
              })
            } else if(e_1082.$0.$tag==2){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(go_1076(e_1082.$0.$1)))(function(f_1092){
                return (($gt$gt$eq(local$instance$Monad$0))(go_1076(e_1082.$0.$2)))(function(x_1093){
                  return up_1074(((App_731(e_1082.$0.$0))(f_1092))(x_1093))
                })
              })
            } else if(e_1082.$0.$tag==4){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(go_1076(e_1082.$0.$1)))(function(e_1097){
                return (($gt$gt$eq(local$instance$Monad$0))(gos_1077(e_1082.$0.$2)))(function(ps_1098){
                  return up_1074(((Case_733(e_1082.$0.$0))(e_1097))(ps_1098))
                })
              })
            } else if(e_1082.$0.$tag==5){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(gos_1077(e_1082.$0.$1)))(function(bs_1102){
                return (($gt$gt$eq(local$instance$Monad$0))(go_1076(e_1082.$0.$2)))(function(e_1103){
                  return up_1074(((Let_734(e_1082.$0.$0))(bs_1102))(e_1103))
                })
              })
            } else if(e_1082.$0.$tag==6){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(((mapM_692(local$instance$Monad$0))(go_1076))(e_1082.$0.$2)))(function(es_1107){
                return up_1074(((New_735(e_1082.$0.$0))(e_1082.$0.$1))(es_1107))
              })
            } else var $phi$143 = up_1074(e_1082.$0);
            var $phi$142 = $phi$143
          } else error("pattern match fail",e_1082);
          return $phi$142
        })
      }
    }
  }
};
var breakableDownM_784 = function(local$instance$Monad$0){
  return function(f_1114){
    return ((breakableDownAndUpM_780(local$instance$Monad$0))(f_1114))(ret(local$instance$Monad$0))
  }
};
var downAndUpM_781 = function(local$instance$Monad$0){
  return function(down_1109){
    return function(up_1110){
      return ((breakableDownAndUpM_780(local$instance$Monad$0))(function(e_1111){
        return (($gt$gt$eq(local$instance$Monad$0))(down_1109(e_1111)))(function(e_1112){
          return (ret(local$instance$Monad$0))(Left_653(e_1112))
        })
      }))(up_1110)
    }
  }
};
var downM_783 = function(local$instance$Monad$0){
  return function(f_1113){
    return ((downAndUpM_781(local$instance$Monad$0))(f_1113))(ret(local$instance$Monad$0))
  }
};
var upM_782 = function(local$instance$Monad$0){
  return (downAndUpM_781(local$instance$Monad$0))(ret(local$instance$Monad$0))
};
var breakableDownAndUp_775 = function(down_1011){
  return function(up_1012){
    return function(a_1013){
      return function(e_1014){
        var go_1015 = (breakableDownAndUp_775(down_1011))(up_1012);
        var gos_1016 = function(a_1017){
          return (foldl(function(ar_1018){
            return function(p_1019){
              var $phi$145 = (go_1015(fst_652(ar_1018)))(snd_642(p_1019));
              var $phi$144 = (Pair_638($phi$145.$0))((push((Pair_638(fst_652(p_1019)))($phi$145.$1)))(snd_642(ar_1018)));
              return $phi$144
            }
          }))((Pair_638(a_1017))([]))
        };
        var $phi$147 = (down_1011(a_1013))(e_1014);
        if($phi$147.$tag==1){
          var $phi$146 = $phi$147.$0
        } else if($phi$147.$tag==0){
          if($phi$147.$0.$1.$tag==3){
            var $phi$167 = (go_1015($phi$147.$0.$0))($phi$147.$0.$1.$2);
            var $phi$166 = (Pair_638($phi$167.$0))(((Lam_732($phi$147.$0.$1.$0))($phi$147.$0.$1.$1))($phi$167.$1));
            var $phi$148 = $phi$166
          } else if($phi$147.$0.$1.$tag==2){
            var $phi$163 = (go_1015($phi$147.$0.$0))($phi$147.$0.$1.$1);
            var $phi$165 = (go_1015($phi$163.$0))($phi$147.$0.$1.$2);
            var $phi$164 = (Pair_638($phi$165.$0))(((App_731($phi$147.$0.$1.$0))($phi$163.$1))($phi$165.$1));
            var $phi$162 = $phi$164;
            var $phi$148 = $phi$162
          } else if($phi$147.$0.$1.$tag==4){
            var $phi$159 = (go_1015($phi$147.$0.$0))($phi$147.$0.$1.$1);
            var $phi$161 = (gos_1016($phi$159.$0))($phi$147.$0.$1.$2);
            var $phi$160 = (Pair_638($phi$161.$0))(((Case_733($phi$147.$0.$1.$0))($phi$159.$1))($phi$161.$1));
            var $phi$158 = $phi$160;
            var $phi$148 = $phi$158
          } else if($phi$147.$0.$1.$tag==5){
            var $phi$155 = (gos_1016($phi$147.$0.$0))($phi$147.$0.$1.$1);
            var $phi$157 = (go_1015($phi$155.$0))($phi$147.$0.$1.$2);
            var $phi$156 = (Pair_638($phi$157.$0))(((Let_734($phi$147.$0.$1.$0))($phi$155.$1))($phi$157.$1));
            var $phi$154 = $phi$156;
            var $phi$148 = $phi$154
          } else if($phi$147.$0.$1.$tag==6){
            var f_1055 = function(aes_1056){
              return function(e_1057){
                var $phi$151 = (go_1015(aes_1056.$0))(e_1057);
                var $phi$150 = (Pair_638($phi$151.$0))((push($phi$151.$1))(aes_1056.$1));
                var $phi$149 = $phi$150;
                return $phi$149
              }
            };
            var $phi$153 = ((foldl(f_1055))((Pair_638(a_1013))([])))($phi$147.$0.$1.$2);
            var $phi$152 = (Pair_638($phi$153.$0))(((New_735($phi$147.$0.$1.$0))($phi$147.$0.$1.$1))($phi$153.$1));
            var $phi$148 = $phi$152
          } else var $phi$148 = (Pair_638($phi$147.$0.$0))($phi$147.$0.$1);
          var ae_1025 = $phi$148;
          var $phi$168 = (up_1012(ae_1025.$0))(ae_1025.$1);
          var $phi$146 = $phi$168
        } else error("pattern match fail",$phi$147);
        return $phi$146
      }
    }
  }
};
var breakableDown_779 = function(f_1072){
  return (breakableDownAndUp_775(f_1072))(Pair_638)
};
var downAndUp_776 = function(down_1067){
  return function(up_1068){
    return (breakableDownAndUp_775(function(a_1069){
      return function(e_1070){
        return Left_653((down_1067(a_1069))(e_1070))
      }
    }))(up_1068)
  }
};
var down_778 = function(f_1071){
  return (downAndUp_776(f_1071))(Pair_638)
};
var up_777 = downAndUp_776(Pair_638);
var getAnn_759 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(name_870){
      return function(ann_871){
        return (((lookup_660(local$instance$Hashable$1))(local$instance$Eq$0))(name_870))(ann_871)
      }
    }
  }
};
var getAnnType_762 = function(ann_881){
  var $phi$170 = (((getAnn_759($import1$instance$Hashable$13))($import1$instance$Eq$1))("type"))(ann_881);
  if(($phi$170.$tag==0)&&($phi$170.$0.$tag==0)){
    var $phi$169 = $phi$170.$0.$0
  } else if($phi$170.$tag==1){
    var $phi$169 = TUnknown_754
  } else error("pattern match fail",$phi$170);
  return $phi$169
};
var annOf_772 = function(e_969){
  if(e_969.$tag==0){
    var $phi$171 = e_969.$0
  } else if(e_969.$tag==1){
    var $phi$171 = e_969.$0
  } else if(e_969.$tag==2){
    var $phi$171 = e_969.$0
  } else if(e_969.$tag==3){
    var $phi$171 = e_969.$0
  } else if(e_969.$tag==4){
    var $phi$171 = e_969.$0
  } else if(e_969.$tag==5){
    var $phi$171 = e_969.$0
  } else if(e_969.$tag==6){
    var $phi$171 = e_969.$0
  } else error("pattern match fail",e_969);
  return $phi$171
};
var getType_774 = function(e_1010){
  return ($_651(getAnnType_762))(annOf_772(e_1010))
};
var withAnn_773 = function(ann_989){
  return function(e_990){
    if(e_990.$tag==0){
      var $phi$172 = (Var_729(ann_989))(e_990.$1)
    } else if(e_990.$tag==1){
      var $phi$172 = (Const_730(ann_989))(e_990.$1)
    } else if(e_990.$tag==2){
      var $phi$172 = ((App_731(ann_989))(e_990.$1))(e_990.$2)
    } else if(e_990.$tag==3){
      var $phi$172 = ((Lam_732(ann_989))(e_990.$1))(e_990.$2)
    } else if(e_990.$tag==4){
      var $phi$172 = ((Case_733(ann_989))(e_990.$1))(e_990.$2)
    } else if(e_990.$tag==5){
      var $phi$172 = ((Let_734(ann_989))(e_990.$1))(e_990.$2)
    } else if(e_990.$tag==6){
      var $phi$172 = ((New_735(ann_989))(e_990.$1))(e_990.$2)
    } else error("pattern match fail",e_990);
    return $phi$172
  }
};
var setAnn_760 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(name_872){
      return function(val_873){
        return function(ann_874){
          return ((((insert_668(local$instance$Hashable$1))(local$instance$Eq$0))(name_872))(val_873))(ann_874)
        }
      }
    }
  }
};
var setAnnType_763 = function(t_883){
  return function(ann_884){
    return ((((setAnn_760($import1$instance$Hashable$13))($import1$instance$Eq$1))("type"))(AnnType_723(t_883)))(ann_884)
  }
};
var setType_771 = function(t_948){
  return function(e_949){
    if(e_949.$tag==0){
      var $phi$173 = (Var_729((setAnnType_763(t_948))(e_949.$0)))(e_949.$1)
    } else if(e_949.$tag==1){
      var $phi$173 = (Const_730((setAnnType_763(t_948))(e_949.$0)))(e_949.$1)
    } else if(e_949.$tag==2){
      var $phi$173 = ((App_731((setAnnType_763(t_948))(e_949.$0)))(e_949.$1))(e_949.$2)
    } else if(e_949.$tag==3){
      var $phi$173 = ((Lam_732((setAnnType_763(t_948))(e_949.$0)))(e_949.$1))(e_949.$2)
    } else if(e_949.$tag==4){
      var $phi$173 = ((Case_733((setAnnType_763(t_948))(e_949.$0)))(e_949.$1))(e_949.$2)
    } else if(e_949.$tag==5){
      var $phi$173 = ((Let_734((setAnnType_763(t_948))(e_949.$0)))(e_949.$1))(e_949.$2)
    } else if(e_949.$tag==6){
      var $phi$173 = ((New_735((setAnnType_763(t_948))(e_949.$0)))(e_949.$1))(e_949.$2)
    } else error("pattern match fail",e_949);
    return $phi$173
  }
};
var dataConName_769 = function(dc_939){
  var $phi$174 = dc_939.$1;
  return $phi$174
};
var dataConNames_770 = function(d_943){
  var $phi$175 = (map(dataConName_769))(d_943.$3);
  return $phi$175
};
var equivBound_767 = function(a_894){
  return function(b_895){
    var $phi$177 = ($and((($eq$eq($import1$instance$Eq$1))(a_894.$1))(b_895.$1)))((equivType_768(a_894.$2))(b_895.$2));
    var $phi$176 = $phi$177;
    return $phi$176
  }
};
var equivType_768 = function(a_902){
  return function(b_903){
    if(a_902.$tag==0){
      if(b_903.$tag==0){
        var $phi$184 = (($eq$eq($import1$instance$Eq$1))(a_902.$1))(b_903.$1)
      } else var $phi$184 = false;
      var $phi$178 = $phi$184
    } else if(a_902.$tag==1){
      if(b_903.$tag==1){
        var $phi$183 = (($eq$eq($import1$instance$Eq$1))(a_902.$1))(b_903.$1)
      } else var $phi$183 = false;
      var $phi$178 = $phi$183
    } else if(a_902.$tag==2){
      if(b_903.$tag==2){
        var $phi$182 = ($and((equivType_768(a_902.$1))(b_903.$1)))((equivType_768(a_902.$2))(b_903.$2))
      } else var $phi$182 = false;
      var $phi$178 = $phi$182
    } else if(a_902.$tag==4){
      if(b_903.$tag==4){
        var $phi$181 = true
      } else var $phi$181 = false;
      var $phi$178 = $phi$181
    } else if(a_902.$tag==6){
      if(b_903.$tag==6){
        var $phi$180 = true
      } else var $phi$180 = false;
      var $phi$178 = $phi$180
    } else if(a_902.$tag==3){
      var $phi$178 = error("no support for TRow in equivType yet")
    } else if(a_902.$tag==5){
      if(b_903.$tag==5){
        var rbs_935 = (all_709(function(p_937){
          return (equivBound_767(fst_652(p_937)))(snd_642(p_937))
        }))((zip_705(a_902.$2))(b_903.$2));
        var rvs_934 = (all_709(function(p_936){
          return (($eq$eq($import1$instance$Eq$1))(fst_652(p_936)))(snd_642(p_936))
        }))((zip_705(a_902.$1))(b_903.$1));
        var $phi$179 = ($and(($and(rvs_934))(rbs_935)))((equivType_768(a_902.$3))(b_903.$3))
      } else var $phi$179 = false;
      var $phi$178 = $phi$179
    } else error("pattern match fail",a_902);
    return $phi$178
  }
};
var printCodeLoc_766 = function(l_890){
  if(l_890.$tag==1){
    var $phi$185 = ($concat(($concat(($concat(($concat(($concat("in "))(l_890.$0)))(" at line ")))(intToString(l_890.$1+1))))(", column ")))(intToString(l_890.$2+1))
  } else error("pattern match fail",l_890);
  return $phi$185
};
var setAnnCodeLoc_765 = function(file_886){
  return function(line_887){
    return function(col_888){
      return function(ann_889){
        return ((((setAnn_760($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(((AnnCodeLoc_724(file_886))(line_887))(col_888)))(ann_889)
      }
    }
  }
};
var getAnnCodeLoc_764 = function(ann_885){
  return (((getAnn_759($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(ann_885)
};
var copyAnn_761 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(names_875){
      return function(ann_876){
        var f_877 = function(r_878){
          return function(n_879){
            var $phi$187 = (((getAnn_759(local$instance$Hashable$1))(local$instance$Eq$0))(n_879))(ann_876);
            if($phi$187.$tag==1){
              var $phi$186 = r_878
            } else if($phi$187.$tag==0){
              var $phi$186 = ((((setAnn_760(local$instance$Hashable$1))(local$instance$Eq$0))(n_879))($phi$187.$0))(r_878)
            } else error("pattern match fail",$phi$187);
            return $phi$186
          }
        };
        return ((foldl(f_877))(Empty_647))(names_875)
      }
    }
  }
};
var emptyAnn_758 = Empty_647;
var assert_1115 = assert_85;
var Pair_1116 = Pair_3;
var mapSnd_1117 = mapSnd_84;
var mapFst_1118 = mapFst_83;
var $gt$eq$gt_1119 = $gt$eq$gt_82;
var snd_1120 = snd_23;
var debug2_1121 = debug2_81;
var Just_1122 = Just_1;
var Nothing_1123 = Nothing_2;
var isJust_1124 = isJust_21;
var Empty_1125 = Empty_7;
var Leaf_1126 = Leaf_8;
var Collision_1127 = Collision_9;
var BitmapIndexed_1128 = BitmapIndexed_10;
var $_1129 = $_12;
var fst_1130 = fst_22;
var Left_1131 = Left_4;
var Right_1132 = Right_5;
var loop_1133 = loop_27;
var find_1134 = find_29;
var hamtMask_1135 = hamtMask_58;
var popCount_1136 = popCount_57;
var hamtIndex_1137 = hamtIndex_59;
var lookup_1138 = lookup_60;
var setContains_1139 = setContains_76;
var foldTrie_1140 = foldTrie_66;
var emptySet_1141 = emptySet_72;
var Unit_1142 = Unit_0;
var not_1143 = not_26;
var $div$eq_1144 = $div$eq_13;
var mapIx_1145 = mapIx_30;
var insert_1146 = insert_61;
var setAdd_1147 = setAdd_73;
var setIntersection_1148 = setIntersection_80;
var remove_1149 = remove_63;
var setDiff_1150 = setDiff_79;
var setToArray_1151 = setToArray_78;
var mergeTrie_1152 = mergeTrie_70;
var setUnion_1153 = setUnion_77;
var setRemove_1154 = setRemove_75;
var setAddAll_1155 = setAddAll_74;
var trieKeys_1156 = trieKeys_71;
var size_1157 = size_68;
var mapTrie_1158 = mapTrie_67;
var nodeMask_1159 = nodeMask_56;
var isEmpty_1160 = isEmpty_69;
var filterTrie_1161 = filterTrie_65;
var nextSetBitMask_1162 = nextSetBitMask_64;
var updateOrSet_1163 = updateOrSet_62;
var State_1164 = State_6;
var runState_1165 = runState_54;
var evalState_1166 = evalState_55;
var sets_1167 = sets_53;
var gets_1168 = gets_52;
var foldM_1169 = foldM_49;
var mapM_1170 = mapM_50;
var forM_1171 = forM_51;
var strToArray_1172 = strToArray_48;
var toRecord_1173 = toRecord_47;
var reverse_1174 = reverse_46;
var tail_1175 = tail_41;
var head_1176 = head_40;
var uniq_1177 = uniq_45;
var mergeSet_1178 = mergeSet_44;
var init_1179 = init_43;
var last_1180 = last_42;
var mapJust_1181 = mapJust_39;
var concatMap_1182 = concatMap_38;
var zip_1183 = zip_37;
var zipWithIndex2_1184 = zipWithIndex2_35;
var zipWithIndex_1185 = zipWithIndex_36;
var join_1186 = join_34;
var all_1187 = all_33;
var exists_1188 = exists_32;
var containsChar_1189 = containsChar_31;
var contains_1190 = contains_28;
var either_1191 = either_24;
var splitEither_1192 = splitEither_25;
var fromJust_1193 = fromJust_20;
var justOr_1194 = justOr_19;
var maybe_1195 = maybe_18;
var $gt$gt_1196 = $gt$gt_17;
var $gt$eq_1197 = $gt$eq_16;
var $lt$eq_1198 = $lt$eq_15;
var $gt_1199 = $gt_14;
var Identity_1200 = Identity_11;
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
var App_1201 = App_731;
var Lam_1202 = Lam_732;
var Case_1203 = Case_733;
var Let_1204 = Let_734;
var New_1205 = New_735;
var breakableDownAndUpM_1206 = breakableDownAndUpM_780;
var breakableDownM_1207 = breakableDownM_784;
var downAndUpM_1208 = downAndUpM_781;
var downM_1209 = downM_783;
var upM_1210 = upM_782;
var breakableDownAndUp_1211 = breakableDownAndUp_775;
var breakableDown_1212 = breakableDown_779;
var downAndUp_1213 = downAndUp_776;
var down_1214 = down_778;
var up_1215 = up_777;
var AnnType_1216 = AnnType_723;
var TUnknown_1217 = TUnknown_754;
var getAnn_1218 = getAnn_759;
var getAnnType_1219 = getAnnType_762;
var Var_1220 = Var_729;
var Const_1221 = Const_730;
var annOf_1222 = annOf_772;
var getType_1223 = getType_774;
var withAnn_1224 = withAnn_773;
var setAnn_1225 = setAnn_760;
var setAnnType_1226 = setAnnType_763;
var setType_1227 = setType_771;
var Data_1228 = Data_743;
var DataCon_1229 = DataCon_744;
var dataConName_1230 = dataConName_769;
var dataConNames_1231 = dataConNames_770;
var TCBound_1232 = TCBound_747;
var TConst_1233 = TConst_748;
var TVar_1234 = TVar_749;
var TApp_1235 = TApp_750;
var TRow_1236 = TRow_751;
var TBot_1237 = TBot_752;
var TForall_1238 = TForall_753;
var equivBound_1239 = equivBound_767;
var equivType_1240 = equivType_768;
var AnnCodeLoc_1241 = AnnCodeLoc_724;
var printCodeLoc_1242 = printCodeLoc_766;
var setAnnCodeLoc_1243 = setAnnCodeLoc_765;
var getAnnCodeLoc_1244 = getAnnCodeLoc_764;
var copyAnn_1245 = copyAnn_761;
var emptyAnn_1246 = emptyAnn_758;
var ImportAll_1247 = ImportAll_757;
var ImportOpen_1248 = ImportOpen_756;
var ImportClosed_1249 = ImportClosed_755;
var Instance_1250 = Instance_746;
var Class_1251 = Class_745;
var ModuleInterface_1252 = ModuleInterface_742;
var Module_1253 = Module_741;
var PData_1254 = PData_740;
var PConst_1255 = PConst_739;
var PVar_1256 = PVar_738;
var CStr_1257 = CStr_737;
var CNum_1258 = CNum_736;
var AnnExport_1259 = AnnExport_728;
var AnnTag_1260 = AnnTag_727;
var AnnData_1261 = AnnData_726;
var AnnUseCount_1262 = AnnUseCount_725;
var sccSorted_1263 = sccSorted_574;
var splitLetsPass_1269 = function(local$instance$Monad$0){
  return function(m_1326){
    return (ret(local$instance$Monad$0))(m_1326)
  }
};
var addRef_1264 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(n_1270){
      return (($gt$gt$eq($import1$instance$Monad$11))(gets_1168))(function(ns_1271){
        return sets_1167((((setAdd_1147(local$instance$Hashable$1))(local$instance$Eq$0))(n_1270))(ns_1271))
      })
    }
  }
};
var delRef_1265 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(n_1272){
      return (($gt$gt$eq($import1$instance$Monad$11))(gets_1168))(function(ns_1273){
        return sets_1167((((setRemove_1154(local$instance$Hashable$1))(local$instance$Eq$0))(n_1272))(ns_1273))
      })
    }
  }
};
var getRefs_1266 = gets_1168;
var splitExpr_1267 = function(e_1274){
  var handleLet_1277 = function(e_1297){
    if(e_1297.$tag==5){
      var $phi$188 = (($gt$gt$eq($import1$instance$Monad$11))(splitExpr_1267(e_1297.$2)))(function(e_1301){
        return (($gt$gt$eq($import1$instance$Monad$11))(splitBindings_1268(e_1297.$1)))(function(gbs_1302){
          var l_1303 = ((foldr(function(e_1304){
            return function(bs_1305){
              return ((Let_1204(emptyAnn_1246))(bs_1305))(e_1304)
            }
          }))(e_1301))(gbs_1302);
          return (ret($import1$instance$Monad$11))(Right_1132((withAnn_1224(e_1297.$0))(l_1303)))
        })
      })
    } else var $phi$188 = (ret($import1$instance$Monad$11))(Left_1131(e_1297));
    return $phi$188
  };
  var splitPat_1276 = function(p_1289){
    if(p_1289.$tag==1){
      var $phi$189 = (ret($import1$instance$Monad$11))(Unit_1142)
    } else if(p_1289.$tag==0){
      var $phi$189 = ((delRef_1265($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_1289.$1)
    } else if(p_1289.$tag==2){
      var $phi$189 = (($gt$gt_1196($import1$instance$Monad$11))(((mapM_1170($import1$instance$Monad$11))(splitPat_1276))(p_1289.$2)))(((addRef_1264($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_1289.$1))
    } else error("pattern match fail",p_1289);
    return $phi$189
  };
  var split_1275 = function(e_1278){
    if(e_1278.$tag==0){
      var $phi$190 = (($gt$gt_1196($import1$instance$Monad$11))(((addRef_1264($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_1278.$1)))((ret($import1$instance$Monad$11))(e_1278))
    } else if(e_1278.$tag==4){
      var $phi$190 = (($gt$gt_1196($import1$instance$Monad$11))(((mapM_1170($import1$instance$Monad$11))(function(p_1284){
        return splitPat_1276(fst_1130(p_1284))
      }))(e_1278.$2)))((ret($import1$instance$Monad$11))(e_1278))
    } else if(e_1278.$tag==3){
      var $phi$190 = (($gt$gt_1196($import1$instance$Monad$11))(((delRef_1265($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_1278.$1)))((ret($import1$instance$Monad$11))(e_1278))
    } else var $phi$190 = (ret($import1$instance$Monad$11))(e_1278);
    return $phi$190
  };
  return (((breakableDownAndUpM_1206($import1$instance$Monad$11))(handleLet_1277))(split_1275))(e_1274)
};
var splitBindings_1268 = function(bs_1307){
  var ns_1308 = (map(fst_1130))(bs_1307);
  var processBinding_1309 = function(gbs_1310){
    return function(b_1311){
      var $phi$192 = (($gt$gt$eq($import1$instance$Monad$11))(splitExpr_1267(b_1311.$1)))(function(e_1316){
        return (($gt$gt$eq($import1$instance$Monad$11))(getRefs_1266))(function(refs_1317){
          var uses_1318 = (filter(function(n_1319){
            return (((setContains_1139($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1319))(refs_1317)
          }))(ns_1308);
          return (($gt$gt_1196($import1$instance$Monad$11))(((mapM_1170($import1$instance$Monad$11))((delRef_1265($import1$instance$Hashable$13))($import1$instance$Eq$1)))(uses_1318)))((ret($import1$instance$Monad$11))((Pair_1116(((set(b_1311.$0))((filter(($div$eq_1144($import1$instance$Eq$1))(b_1311.$0)))(uses_1318)))(gbs_1310.$0)))((push((Pair_1116(b_1311.$0))(e_1316)))(gbs_1310.$1))))
        })
      });
      var $phi$191 = $phi$192;
      return $phi$191
    }
  };
  return (($gt$gt$eq($import1$instance$Monad$11))((((foldM_1169($import1$instance$Monad$11))(processBinding_1309))((Pair_1116(empty))([])))(bs_1307)))(function(gbs_1320){
    var ccs_1324 = sccSorted_1263(gbs_1320.$0);
    var bsm_1323 = toRecord_1173(gbs_1320.$1);
    var $phi$193 = (ret($import1$instance$Monad$11))((map(map(function(n_1325){
      return (Pair_1116(n_1325))((get(n_1325))(bsm_1323))
    })))(ccs_1324));
    return $phi$193
  })
};
var assert_1327 = assert_85;
var Pair_1328 = Pair_3;
var mapSnd_1329 = mapSnd_84;
var mapFst_1330 = mapFst_83;
var $gt$eq$gt_1331 = $gt$eq$gt_82;
var snd_1332 = snd_23;
var debug2_1333 = debug2_81;
var Just_1334 = Just_1;
var Nothing_1335 = Nothing_2;
var isJust_1336 = isJust_21;
var Empty_1337 = Empty_7;
var Leaf_1338 = Leaf_8;
var Collision_1339 = Collision_9;
var BitmapIndexed_1340 = BitmapIndexed_10;
var $_1341 = $_12;
var fst_1342 = fst_22;
var Left_1343 = Left_4;
var Right_1344 = Right_5;
var loop_1345 = loop_27;
var find_1346 = find_29;
var hamtMask_1347 = hamtMask_58;
var popCount_1348 = popCount_57;
var hamtIndex_1349 = hamtIndex_59;
var lookup_1350 = lookup_60;
var setContains_1351 = setContains_76;
var foldTrie_1352 = foldTrie_66;
var emptySet_1353 = emptySet_72;
var Unit_1354 = Unit_0;
var not_1355 = not_26;
var $div$eq_1356 = $div$eq_13;
var mapIx_1357 = mapIx_30;
var insert_1358 = insert_61;
var setAdd_1359 = setAdd_73;
var setIntersection_1360 = setIntersection_80;
var remove_1361 = remove_63;
var setDiff_1362 = setDiff_79;
var setToArray_1363 = setToArray_78;
var mergeTrie_1364 = mergeTrie_70;
var setUnion_1365 = setUnion_77;
var setRemove_1366 = setRemove_75;
var setAddAll_1367 = setAddAll_74;
var trieKeys_1368 = trieKeys_71;
var size_1369 = size_68;
var mapTrie_1370 = mapTrie_67;
var nodeMask_1371 = nodeMask_56;
var isEmpty_1372 = isEmpty_69;
var filterTrie_1373 = filterTrie_65;
var nextSetBitMask_1374 = nextSetBitMask_64;
var updateOrSet_1375 = updateOrSet_62;
var State_1376 = State_6;
var runState_1377 = runState_54;
var evalState_1378 = evalState_55;
var sets_1379 = sets_53;
var gets_1380 = gets_52;
var foldM_1381 = foldM_49;
var mapM_1382 = mapM_50;
var forM_1383 = forM_51;
var strToArray_1384 = strToArray_48;
var toRecord_1385 = toRecord_47;
var reverse_1386 = reverse_46;
var tail_1387 = tail_41;
var head_1388 = head_40;
var uniq_1389 = uniq_45;
var mergeSet_1390 = mergeSet_44;
var init_1391 = init_43;
var last_1392 = last_42;
var mapJust_1393 = mapJust_39;
var concatMap_1394 = concatMap_38;
var zip_1395 = zip_37;
var zipWithIndex2_1396 = zipWithIndex2_35;
var zipWithIndex_1397 = zipWithIndex_36;
var join_1398 = join_34;
var all_1399 = all_33;
var exists_1400 = exists_32;
var containsChar_1401 = containsChar_31;
var contains_1402 = contains_28;
var either_1403 = either_24;
var splitEither_1404 = splitEither_25;
var fromJust_1405 = fromJust_20;
var justOr_1406 = justOr_19;
var maybe_1407 = maybe_18;
var $gt$gt_1408 = $gt$gt_17;
var $gt$eq_1409 = $gt$eq_16;
var $lt$eq_1410 = $lt$eq_15;
var $gt_1411 = $gt_14;
var Identity_1412 = Identity_11;
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
var App_1413 = App_731;
var Lam_1414 = Lam_732;
var Case_1415 = Case_733;
var Let_1416 = Let_734;
var New_1417 = New_735;
var breakableDownAndUpM_1418 = breakableDownAndUpM_780;
var breakableDownM_1419 = breakableDownM_784;
var downAndUpM_1420 = downAndUpM_781;
var downM_1421 = downM_783;
var upM_1422 = upM_782;
var breakableDownAndUp_1423 = breakableDownAndUp_775;
var breakableDown_1424 = breakableDown_779;
var downAndUp_1425 = downAndUp_776;
var down_1426 = down_778;
var up_1427 = up_777;
var AnnType_1428 = AnnType_723;
var TUnknown_1429 = TUnknown_754;
var getAnn_1430 = getAnn_759;
var getAnnType_1431 = getAnnType_762;
var Var_1432 = Var_729;
var Const_1433 = Const_730;
var annOf_1434 = annOf_772;
var getType_1435 = getType_774;
var withAnn_1436 = withAnn_773;
var setAnn_1437 = setAnn_760;
var setAnnType_1438 = setAnnType_763;
var setType_1439 = setType_771;
var Data_1440 = Data_743;
var DataCon_1441 = DataCon_744;
var dataConName_1442 = dataConName_769;
var dataConNames_1443 = dataConNames_770;
var TCBound_1444 = TCBound_747;
var TConst_1445 = TConst_748;
var TVar_1446 = TVar_749;
var TApp_1447 = TApp_750;
var TRow_1448 = TRow_751;
var TBot_1449 = TBot_752;
var TForall_1450 = TForall_753;
var equivBound_1451 = equivBound_767;
var equivType_1452 = equivType_768;
var AnnCodeLoc_1453 = AnnCodeLoc_724;
var printCodeLoc_1454 = printCodeLoc_766;
var setAnnCodeLoc_1455 = setAnnCodeLoc_765;
var getAnnCodeLoc_1456 = getAnnCodeLoc_764;
var copyAnn_1457 = copyAnn_761;
var emptyAnn_1458 = emptyAnn_758;
var ImportAll_1459 = ImportAll_757;
var ImportOpen_1460 = ImportOpen_756;
var ImportClosed_1461 = ImportClosed_755;
var Instance_1462 = Instance_746;
var Class_1463 = Class_745;
var ModuleInterface_1464 = ModuleInterface_742;
var Module_1465 = Module_741;
var PData_1466 = PData_740;
var PConst_1467 = PConst_739;
var PVar_1468 = PVar_738;
var CStr_1469 = CStr_737;
var CNum_1470 = CNum_736;
var AnnExport_1471 = AnnExport_728;
var AnnTag_1472 = AnnTag_727;
var AnnData_1473 = AnnData_726;
var AnnUseCount_1474 = AnnUseCount_725;
var CompilerState_1475 = function($_0_1485){
  return function($_1_1486){
    return function($_2_1487){
      return {$0:$_0_1485,$1:$_1_1486,$2:$_2_1487}
    }
  }
};
var reportTimes_1484 = function(i_1523){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1380))(function(s_1524){
    var report_1528 = function(i_1529){
      return function(n_1530){
        return function(ts_1531){
          var count_1532 = length(ts_1531);
          var total_1533 = ((foldl($add))(0))(ts_1531);
          var msg_1534 = ($concat(($concat(($concat(($concat(($concat(($concat("# pass <"))(n_1530)))("> executed ")))(intToString(count_1532))))(" times, total runtime ")))(intToString(total_1533))))("ms");
          return (debug2_1333(msg_1534))(i_1529)
        }
      }
    };
    var $phi$194 = (ret($import1$instance$Monad$11))(((foldTrie_1352(report_1528))(i_1523))(s_1524.$2));
    return $phi$194
  })
};
var timingStart_1481 = function(n_1506){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1380))(function(s_1507){
    var nts_1511 = (justOr_1406([]))((((lookup_1350($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1506))(s_1507.$2));
    var $phi$195 = sets_1379(((CompilerState_1475(s_1507.$0))(s_1507.$1))(((((insert_1358($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1506))((push(currentTimeMs(Unit_1354)))(nts_1511)))(s_1507.$2)));
    return $phi$195
  })
};
var timingEnd_1482 = function(n_1512){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1380))(function(s_1513){
    var nts_1517 = (justOr_1406([]))((((lookup_1350($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1512))(s_1513.$2));
    var start_1518 = last_1392(nts_1517);
    var $phi$196 = sets_1379(((CompilerState_1475(s_1513.$0))(s_1513.$1))(((((insert_1358($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1512))((push((currentTimeMs(Unit_1354))-start_1518))(init_1391(nts_1517))))(s_1513.$2)));
    return $phi$196
  })
};
var timed_1483 = function(n_1519){
  return function(p_1520){
    return function(i_1521){
      return (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_1408($import1$instance$Monad$11))(timingStart_1481(n_1519)))(p_1520(i_1521))))(function(o_1522){
        return (($gt$gt_1408($import1$instance$Monad$11))(timingEnd_1482(n_1519)))((ret($import1$instance$Monad$11))(o_1522))
      })
    }
  }
};
var perModule_1480 = function(local$instance$Monad$0){
  return mapM_1382(local$instance$Monad$0)
};
var setUid_1479 = function(uid_1501){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1380))(function(s_1502){
    var $phi$197 = sets_1379(((CompilerState_1475(s_1502.$0))(uid_1501))(s_1502.$2));
    return $phi$197
  })
};
var getUid_1478 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1380))(function(s_1497){
  var $phi$198 = (ret($import1$instance$Monad$11))(s_1497.$1);
  return $phi$198
});
var setExports_1477 = function(ex_1492){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1380))(function(s_1493){
    var $phi$199 = sets_1379(((CompilerState_1475(ex_1492))(s_1493.$1))(s_1493.$2));
    return $phi$199
  })
};
var getExports_1476 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1380))(function(s_1488){
  var $phi$200 = (ret($import1$instance$Monad$11))(s_1488.$0);
  return $phi$200
});
var assert_1535 = assert_85;
var Pair_1536 = Pair_3;
var mapSnd_1537 = mapSnd_84;
var mapFst_1538 = mapFst_83;
var $gt$eq$gt_1539 = $gt$eq$gt_82;
var snd_1540 = snd_23;
var debug2_1541 = debug2_81;
var Just_1542 = Just_1;
var Nothing_1543 = Nothing_2;
var isJust_1544 = isJust_21;
var Empty_1545 = Empty_7;
var Leaf_1546 = Leaf_8;
var Collision_1547 = Collision_9;
var BitmapIndexed_1548 = BitmapIndexed_10;
var $_1549 = $_12;
var fst_1550 = fst_22;
var Left_1551 = Left_4;
var Right_1552 = Right_5;
var loop_1553 = loop_27;
var find_1554 = find_29;
var hamtMask_1555 = hamtMask_58;
var popCount_1556 = popCount_57;
var hamtIndex_1557 = hamtIndex_59;
var lookup_1558 = lookup_60;
var setContains_1559 = setContains_76;
var foldTrie_1560 = foldTrie_66;
var emptySet_1561 = emptySet_72;
var Unit_1562 = Unit_0;
var not_1563 = not_26;
var $div$eq_1564 = $div$eq_13;
var mapIx_1565 = mapIx_30;
var insert_1566 = insert_61;
var setAdd_1567 = setAdd_73;
var setIntersection_1568 = setIntersection_80;
var remove_1569 = remove_63;
var setDiff_1570 = setDiff_79;
var setToArray_1571 = setToArray_78;
var mergeTrie_1572 = mergeTrie_70;
var setUnion_1573 = setUnion_77;
var setRemove_1574 = setRemove_75;
var setAddAll_1575 = setAddAll_74;
var trieKeys_1576 = trieKeys_71;
var size_1577 = size_68;
var mapTrie_1578 = mapTrie_67;
var nodeMask_1579 = nodeMask_56;
var isEmpty_1580 = isEmpty_69;
var filterTrie_1581 = filterTrie_65;
var nextSetBitMask_1582 = nextSetBitMask_64;
var updateOrSet_1583 = updateOrSet_62;
var State_1584 = State_6;
var runState_1585 = runState_54;
var evalState_1586 = evalState_55;
var sets_1587 = sets_53;
var gets_1588 = gets_52;
var foldM_1589 = foldM_49;
var mapM_1590 = mapM_50;
var forM_1591 = forM_51;
var strToArray_1592 = strToArray_48;
var toRecord_1593 = toRecord_47;
var reverse_1594 = reverse_46;
var tail_1595 = tail_41;
var head_1596 = head_40;
var uniq_1597 = uniq_45;
var mergeSet_1598 = mergeSet_44;
var init_1599 = init_43;
var last_1600 = last_42;
var mapJust_1601 = mapJust_39;
var concatMap_1602 = concatMap_38;
var zip_1603 = zip_37;
var zipWithIndex2_1604 = zipWithIndex2_35;
var zipWithIndex_1605 = zipWithIndex_36;
var join_1606 = join_34;
var all_1607 = all_33;
var exists_1608 = exists_32;
var containsChar_1609 = containsChar_31;
var contains_1610 = contains_28;
var either_1611 = either_24;
var splitEither_1612 = splitEither_25;
var fromJust_1613 = fromJust_20;
var justOr_1614 = justOr_19;
var maybe_1615 = maybe_18;
var $gt$gt_1616 = $gt$gt_17;
var $gt$eq_1617 = $gt$eq_16;
var $lt$eq_1618 = $lt$eq_15;
var $gt_1619 = $gt_14;
var Identity_1620 = Identity_11;
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
var App_1621 = App_731;
var Lam_1622 = Lam_732;
var Case_1623 = Case_733;
var Let_1624 = Let_734;
var New_1625 = New_735;
var breakableDownAndUpM_1626 = breakableDownAndUpM_780;
var breakableDownM_1627 = breakableDownM_784;
var downAndUpM_1628 = downAndUpM_781;
var downM_1629 = downM_783;
var upM_1630 = upM_782;
var breakableDownAndUp_1631 = breakableDownAndUp_775;
var breakableDown_1632 = breakableDown_779;
var downAndUp_1633 = downAndUp_776;
var down_1634 = down_778;
var up_1635 = up_777;
var AnnType_1636 = AnnType_723;
var TUnknown_1637 = TUnknown_754;
var getAnn_1638 = getAnn_759;
var getAnnType_1639 = getAnnType_762;
var Var_1640 = Var_729;
var Const_1641 = Const_730;
var annOf_1642 = annOf_772;
var getType_1643 = getType_774;
var withAnn_1644 = withAnn_773;
var setAnn_1645 = setAnn_760;
var setAnnType_1646 = setAnnType_763;
var setType_1647 = setType_771;
var Data_1648 = Data_743;
var DataCon_1649 = DataCon_744;
var dataConName_1650 = dataConName_769;
var dataConNames_1651 = dataConNames_770;
var TCBound_1652 = TCBound_747;
var TConst_1653 = TConst_748;
var TVar_1654 = TVar_749;
var TApp_1655 = TApp_750;
var TRow_1656 = TRow_751;
var TBot_1657 = TBot_752;
var TForall_1658 = TForall_753;
var equivBound_1659 = equivBound_767;
var equivType_1660 = equivType_768;
var AnnCodeLoc_1661 = AnnCodeLoc_724;
var printCodeLoc_1662 = printCodeLoc_766;
var setAnnCodeLoc_1663 = setAnnCodeLoc_765;
var getAnnCodeLoc_1664 = getAnnCodeLoc_764;
var copyAnn_1665 = copyAnn_761;
var emptyAnn_1666 = emptyAnn_758;
var ImportAll_1667 = ImportAll_757;
var ImportOpen_1668 = ImportOpen_756;
var ImportClosed_1669 = ImportClosed_755;
var Instance_1670 = Instance_746;
var Class_1671 = Class_745;
var ModuleInterface_1672 = ModuleInterface_742;
var Module_1673 = Module_741;
var PData_1674 = PData_740;
var PConst_1675 = PConst_739;
var PVar_1676 = PVar_738;
var CStr_1677 = CStr_737;
var CNum_1678 = CNum_736;
var AnnExport_1679 = AnnExport_728;
var AnnTag_1680 = AnnTag_727;
var AnnData_1681 = AnnData_726;
var AnnUseCount_1682 = AnnUseCount_725;
var mkConFun_1685 = function(tag_1709){
  return function(dt_1710){
    return function(vs_1711){
      return function(n_1712){
        return function(ts_1713){
          var nts_1714 = (map(function(it_1720){
            return (Pair_1536(($concat("$_"))(intToString(fst_1550(it_1720)))))(snd_1540(it_1720))
          }))(zipWithIndex_1605(ts_1713));
          var new_1715 = (setType_1647(dt_1710))(((New_1625(emptyAnn_1666))(n_1712))((map(function(nt_1721){
            return (Var_1640(emptyAnn_1666))(fst_1550(nt_1721))
          }))(nts_1714)));
          var mkCon_1716 = function(r_1722){
            return function(nt_1723){
              var $phi$201 = (setType_1647(((TApp_1655(emptyAnn_1666))(((TApp_1655(emptyAnn_1666))((TConst_1653(emptyAnn_1666))("->")))(nt_1723.$1)))(getType_1643(r_1722))))(((Lam_1622(emptyAnn_1666))(nt_1723.$0))(r_1722));
              return $phi$201
            }
          };
          var con_1717 = ((foldr(mkCon_1716))(new_1715))(nts_1714);
          var conT_1718 = (((TForall_1658(emptyAnn_1666))(vs_1711))([]))(getType_1643(con_1717));
          var ann_1719 = ((((setAnn_1645($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_1679(n_1712)))(((((setAnn_1645($import1$instance$Hashable$13))($import1$instance$Eq$1))("type"))(AnnType_1636(conT_1718)))(((((setAnn_1645($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(AnnData_1681(tag_1709)))(emptyAnn_1666)));
          return (Pair_1536(n_1712))((withAnn_1644(ann_1719))(con_1717))
        }
      }
    }
  }
};
var rewriteData_1684 = function(d_1694){
  var dt_1699 = ((foldl(function(r_1701){
    return function(v_1702){
      return ((TApp_1655(emptyAnn_1666))(r_1701))((TVar_1654(emptyAnn_1666))(v_1702))
    }
  }))((TConst_1653(emptyAnn_1666))(d_1694.$1)))(d_1694.$2);
  var rewriteCon_1700 = function(c_1703){
    var $phi$204 = length(d_1694.$3);
    if(1==$phi$204){
      var $phi$203 = Nothing_1543
    } else var $phi$203 = Just_1542(fst_1550(c_1703));
    var tag_1704 = $phi$203;
    var $phi$206 = snd_1540(c_1703);
    var $phi$205 = ((((mkConFun_1685(tag_1704))(dt_1699))(d_1694.$2))($phi$206.$1))($phi$206.$2);
    return $phi$205
  };
  var $phi$202 = (map(rewriteCon_1700))(zipWithIndex_1605(d_1694.$3));
  return $phi$202
};
var translateAdts_1683 = function(m_1686){
  var $phi$207 = ((((((Module_1673(m_1686.$0))(m_1686.$1))(m_1686.$2))([]))(m_1686.$4))(m_1686.$5))((concat((concatMap_1602(rewriteData_1684))(m_1686.$3)))(m_1686.$6));
  return $phi$207
};
var assert_1726 = assert_85;
var Pair_1727 = Pair_3;
var mapSnd_1728 = mapSnd_84;
var mapFst_1729 = mapFst_83;
var $gt$eq$gt_1730 = $gt$eq$gt_82;
var snd_1731 = snd_23;
var debug2_1732 = debug2_81;
var Just_1733 = Just_1;
var Nothing_1734 = Nothing_2;
var isJust_1735 = isJust_21;
var Empty_1736 = Empty_7;
var Leaf_1737 = Leaf_8;
var Collision_1738 = Collision_9;
var BitmapIndexed_1739 = BitmapIndexed_10;
var $_1740 = $_12;
var fst_1741 = fst_22;
var Left_1742 = Left_4;
var Right_1743 = Right_5;
var loop_1744 = loop_27;
var find_1745 = find_29;
var hamtMask_1746 = hamtMask_58;
var popCount_1747 = popCount_57;
var hamtIndex_1748 = hamtIndex_59;
var lookup_1749 = lookup_60;
var setContains_1750 = setContains_76;
var foldTrie_1751 = foldTrie_66;
var emptySet_1752 = emptySet_72;
var Unit_1753 = Unit_0;
var not_1754 = not_26;
var $div$eq_1755 = $div$eq_13;
var mapIx_1756 = mapIx_30;
var insert_1757 = insert_61;
var setAdd_1758 = setAdd_73;
var setIntersection_1759 = setIntersection_80;
var remove_1760 = remove_63;
var setDiff_1761 = setDiff_79;
var setToArray_1762 = setToArray_78;
var mergeTrie_1763 = mergeTrie_70;
var setUnion_1764 = setUnion_77;
var setRemove_1765 = setRemove_75;
var setAddAll_1766 = setAddAll_74;
var trieKeys_1767 = trieKeys_71;
var size_1768 = size_68;
var mapTrie_1769 = mapTrie_67;
var nodeMask_1770 = nodeMask_56;
var isEmpty_1771 = isEmpty_69;
var filterTrie_1772 = filterTrie_65;
var nextSetBitMask_1773 = nextSetBitMask_64;
var updateOrSet_1774 = updateOrSet_62;
var State_1775 = State_6;
var runState_1776 = runState_54;
var evalState_1777 = evalState_55;
var sets_1778 = sets_53;
var gets_1779 = gets_52;
var foldM_1780 = foldM_49;
var mapM_1781 = mapM_50;
var forM_1782 = forM_51;
var strToArray_1783 = strToArray_48;
var toRecord_1784 = toRecord_47;
var reverse_1785 = reverse_46;
var tail_1786 = tail_41;
var head_1787 = head_40;
var uniq_1788 = uniq_45;
var mergeSet_1789 = mergeSet_44;
var init_1790 = init_43;
var last_1791 = last_42;
var mapJust_1792 = mapJust_39;
var concatMap_1793 = concatMap_38;
var zip_1794 = zip_37;
var zipWithIndex2_1795 = zipWithIndex2_35;
var zipWithIndex_1796 = zipWithIndex_36;
var join_1797 = join_34;
var all_1798 = all_33;
var exists_1799 = exists_32;
var containsChar_1800 = containsChar_31;
var contains_1801 = contains_28;
var either_1802 = either_24;
var splitEither_1803 = splitEither_25;
var fromJust_1804 = fromJust_20;
var justOr_1805 = justOr_19;
var maybe_1806 = maybe_18;
var $gt$gt_1807 = $gt$gt_17;
var $gt$eq_1808 = $gt$eq_16;
var $lt$eq_1809 = $lt$eq_15;
var $gt_1810 = $gt_14;
var Identity_1811 = Identity_11;
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
var App_1812 = App_731;
var Lam_1813 = Lam_732;
var Case_1814 = Case_733;
var Let_1815 = Let_734;
var New_1816 = New_735;
var breakableDownAndUpM_1817 = breakableDownAndUpM_780;
var breakableDownM_1818 = breakableDownM_784;
var downAndUpM_1819 = downAndUpM_781;
var downM_1820 = downM_783;
var upM_1821 = upM_782;
var breakableDownAndUp_1822 = breakableDownAndUp_775;
var breakableDown_1823 = breakableDown_779;
var downAndUp_1824 = downAndUp_776;
var down_1825 = down_778;
var up_1826 = up_777;
var AnnType_1827 = AnnType_723;
var TUnknown_1828 = TUnknown_754;
var getAnn_1829 = getAnn_759;
var getAnnType_1830 = getAnnType_762;
var Var_1831 = Var_729;
var Const_1832 = Const_730;
var annOf_1833 = annOf_772;
var getType_1834 = getType_774;
var withAnn_1835 = withAnn_773;
var setAnn_1836 = setAnn_760;
var setAnnType_1837 = setAnnType_763;
var setType_1838 = setType_771;
var Data_1839 = Data_743;
var DataCon_1840 = DataCon_744;
var dataConName_1841 = dataConName_769;
var dataConNames_1842 = dataConNames_770;
var TCBound_1843 = TCBound_747;
var TConst_1844 = TConst_748;
var TVar_1845 = TVar_749;
var TApp_1846 = TApp_750;
var TRow_1847 = TRow_751;
var TBot_1848 = TBot_752;
var TForall_1849 = TForall_753;
var equivBound_1850 = equivBound_767;
var equivType_1851 = equivType_768;
var AnnCodeLoc_1852 = AnnCodeLoc_724;
var printCodeLoc_1853 = printCodeLoc_766;
var setAnnCodeLoc_1854 = setAnnCodeLoc_765;
var getAnnCodeLoc_1855 = getAnnCodeLoc_764;
var copyAnn_1856 = copyAnn_761;
var emptyAnn_1857 = emptyAnn_758;
var ImportAll_1858 = ImportAll_757;
var ImportOpen_1859 = ImportOpen_756;
var ImportClosed_1860 = ImportClosed_755;
var Instance_1861 = Instance_746;
var Class_1862 = Class_745;
var ModuleInterface_1863 = ModuleInterface_742;
var Module_1864 = Module_741;
var PData_1865 = PData_740;
var PConst_1866 = PConst_739;
var PVar_1867 = PVar_738;
var CStr_1868 = CStr_737;
var CNum_1869 = CNum_736;
var AnnExport_1870 = AnnExport_728;
var AnnTag_1871 = AnnTag_727;
var AnnData_1872 = AnnData_726;
var AnnUseCount_1873 = AnnUseCount_725;
var getUid_1874 = getUid_1478;
var setUid_1875 = setUid_1479;
var getExports_1876 = getExports_1476;
var newIdent_1877 = function(n_1884){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1779))(function(i_1885){
    return (($gt$gt_1807($import1$instance$Monad$11))(sets_1778(i_1885+1)))((ret($import1$instance$Monad$11))(($concat(($concat(n_1884))("_")))(intToString(i_1885))))
  })
};
var rewriteExpr_1878 = function(env_1886){
  return function(e_1887){
    var rename_1888 = function(n_1892){
      return newIdent_1877(n_1892)
    };
    var renamePat_1889 = function(p_1893){
      if(p_1893.$tag==1){
        var $phi$208 = (ret($import1$instance$Monad$11))((Pair_1727(p_1893))(empty))
      } else if(p_1893.$tag==0){
        var $phi$208 = (($gt$gt$eq($import1$instance$Monad$11))(rename_1888(p_1893.$1)))(function(n_1898){
          return (ret($import1$instance$Monad$11))((Pair_1727((PVar_1867(p_1893.$0))(n_1898)))(((set(p_1893.$1))(n_1898))(empty)))
        })
      } else if(p_1893.$tag==2){
        var $phi$208 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1781($import1$instance$Monad$11))(renamePat_1889))(p_1893.$2)))(function(ps_1902){
          var $phi$210 = (has(p_1893.$1))(env_1886);
          if(!$phi$210){
            var $phi$209 = (ret($import1$instance$Monad$11))((Pair_1727(((PData_1865(p_1893.$0))(p_1893.$1))((map(fst_1741))(ps_1902))))(((foldl(merge))(empty))((map(snd_1731))(ps_1902))))
          } else if($phi$210){
            var $phi$209 = (ret($import1$instance$Monad$11))((Pair_1727(((PData_1865(p_1893.$0))((get(p_1893.$1))(env_1886)))((map(fst_1741))(ps_1902))))(((foldl(merge))(empty))((map(snd_1731))(ps_1902))))
          } else error("pattern match fail",$phi$210);
          return $phi$209
        })
      } else error("pattern match fail",p_1893);
      return $phi$208
    };
    var rewritePat_1890 = function(p_1903){
      var $phi$211 = (($gt$gt$eq($import1$instance$Monad$11))(renamePat_1889(p_1903.$0)))(function(pe_1906){
        var $phi$212 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_1878((merge(env_1886))(pe_1906.$1)))(p_1903.$1)))(function(e_1909){
          return (ret($import1$instance$Monad$11))((Pair_1727(pe_1906.$0))(e_1909))
        });
        return $phi$212
      });
      return $phi$211
    };
    var f_1891 = function(e_1910){
      if(e_1910.$tag==3){
        var $phi$213 = (($gt$gt$eq($import1$instance$Monad$11))(rename_1888(e_1910.$1)))(function(n_1914){
          return (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_1878(((set(e_1910.$1))(n_1914))(env_1886)))(e_1910.$2)))(function(e_1915){
            return (ret($import1$instance$Monad$11))(Right_1743(((Lam_1813(e_1910.$0))(n_1914))(e_1915)))
          })
        })
      } else if(e_1910.$tag==5){
        var $phi$213 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteBindings_1880(env_1886))(e_1910.$1)))(function(ebs_1919){
          var $phi$218 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_1878(ebs_1919.$0))(e_1910.$2)))(function(e_1922){
            return (ret($import1$instance$Monad$11))(Right_1743(((Let_1815(e_1910.$0))(ebs_1919.$1))(e_1922)))
          });
          return $phi$218
        })
      } else if(e_1910.$tag==4){
        var $phi$213 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_1878(env_1886))(e_1910.$1)))(function(e_1926){
          return (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1781($import1$instance$Monad$11))(rewritePat_1890))(e_1910.$2)))(function(ps_1927){
            return (ret($import1$instance$Monad$11))(Right_1743(((Case_1814(e_1910.$0))(e_1926))(ps_1927)))
          })
        })
      } else if(e_1910.$tag==0){
        var $phi$217 = (has(e_1910.$1))(env_1886);
        if($phi$217){
          var $phi$216 = (ret($import1$instance$Monad$11))(Left_1742((Var_1831(e_1910.$0))((get(e_1910.$1))(env_1886))))
        } else if(!$phi$217){
          var $phi$216 = (ret($import1$instance$Monad$11))(Left_1742(e_1910))
        } else error("pattern match fail",$phi$217);
        var $phi$213 = $phi$216
      } else if(e_1910.$tag==6){
        var $phi$215 = (has(e_1910.$1))(env_1886);
        if($phi$215){
          var $phi$214 = (ret($import1$instance$Monad$11))(Left_1742(((New_1816(e_1910.$0))((get(e_1910.$1))(env_1886)))(e_1910.$2)))
        } else if(!$phi$215){
          var $phi$214 = (ret($import1$instance$Monad$11))(Left_1742(e_1910))
        } else error("pattern match fail",$phi$215);
        var $phi$213 = $phi$214
      } else var $phi$213 = (ret($import1$instance$Monad$11))(Left_1742(e_1910));
      return $phi$213
    };
    return ((breakableDownM_1818($import1$instance$Monad$11))(f_1891))(e_1887)
  }
};
var rewriteBindings_1880 = function(env_1945){
  return function(bs_1946){
    var ns_1947 = (map(fst_1741))(bs_1946);
    var ns2_1948 = ((mapM_1781($import1$instance$Monad$11))(newIdent_1877))(ns_1947);
    return (($gt$gt$eq($import1$instance$Monad$11))(ns2_1948))(function(ns_1949){
      var env2_1950 = (merge(env_1945))(toRecord_1784((zip_1794((map(fst_1741))(bs_1946)))(ns_1949)));
      var bs2_1951 = ((mapM_1781($import1$instance$Monad$11))(rewriteExpr_1878(env2_1950)))((map(snd_1731))(bs_1946));
      return (($gt$gt$eq($import1$instance$Monad$11))(bs2_1951))(function(bs_1952){
        return (ret($import1$instance$Monad$11))((Pair_1727(env2_1950))((zip_1794(ns_1949))(bs_1952)))
      })
    })
  }
};
var rewriteInstance_1879 = function(env_1934){
  return function(i_1935){
    var $phi$219 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1781($import1$instance$Monad$11))(function(d_1940){
      var $phi$220 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_1878(env_1934))(d_1940.$1)))(function(e_1943){
        return (ret($import1$instance$Monad$11))((Pair_1727(d_1940.$0))(e_1943))
      });
      return $phi$220
    }))(i_1935.$3)))(function(bs_1944){
      return (ret($import1$instance$Monad$11))((((Instance_1861(i_1935.$0))(i_1935.$1))(i_1935.$2))(bs_1944))
    });
    return $phi$219
  }
};
var renameImport_1881 = function(er_1953){
  return function(i_1954){
    if((i_1954.$tag==1)&&("./builtins.js"==i_1954.$1)){
      var $phi$222 = (ret($import1$instance$Monad$11))((Pair_1727(er_1953.$0))((push(i_1954))(er_1953.$1)))
    } else if(i_1954.$tag==1){
      var rename_1962 = function(er_1963){
        return function(p_1964){
          var $phi$224 = (($gt$gt$eq($import1$instance$Monad$11))(newIdent_1877(p_1964.$1)))(function(n_1969){
            return (ret($import1$instance$Monad$11))((Pair_1727(((set(p_1964.$1))(n_1969))(er_1963.$0)))((push((Pair_1727(p_1964.$0))(n_1969)))(er_1963.$1)))
          });
          var $phi$223 = $phi$224;
          return $phi$223
        }
      };
      var $phi$222 = (($gt$gt$eq($import1$instance$Monad$11))((((foldM_1780($import1$instance$Monad$11))(rename_1962))((Pair_1727(er_1953.$0))([])))(i_1954.$2)))(function(ens_1970){
        var $phi$225 = (ret($import1$instance$Monad$11))((Pair_1727(ens_1970.$0))((push(((ImportOpen_1859(i_1954.$0))(i_1954.$1))(ens_1970.$1)))(er_1953.$1)));
        return $phi$225
      })
    } else error("pattern match fail",i_1954);
    var $phi$221 = $phi$222;
    return $phi$221
  }
};
var rewriteModule_1882 = function(ms_1973){
  return function(m_1974){
    var $phi$226 = (($gt$gt$eq($import1$instance$Monad$11))((((foldM_1780($import1$instance$Monad$11))(renameImport_1881))((Pair_1727(empty))([])))(m_1974.$2)))(function(eis_1982){
      var $phi$227 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteBindings_1880(eis_1982.$0))(m_1974.$6)))(function(ebs_1985){
        var $phi$228 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1781($import1$instance$Monad$11))(rewriteInstance_1879(ebs_1985.$0)))(m_1974.$5)))(function(ins_1988){
          return (ret($import1$instance$Monad$11))(((((((Module_1864(m_1974.$0))(m_1974.$1))(eis_1982.$1))(m_1974.$3))(m_1974.$4))(ins_1988))(ebs_1985.$1))
        });
        return $phi$228
      });
      return $phi$227
    });
    return $phi$226
  }
};
var uniquify_1883 = function(m_1989){
  return (($gt$gt$eq($import1$instance$Monad$11))(getUid_1874))(function(uid_1990){
    return (($gt$gt$eq($import1$instance$Monad$11))(getExports_1876))(function(ex_1991){
      var r_1992 = (runState_1776(uid_1990))((rewriteModule_1882(ex_1991))(m_1989));
      return (($gt$gt_1807($import1$instance$Monad$11))(setUid_1875(fst_1741(r_1992))))((ret($import1$instance$Monad$11))(snd_1731(r_1992)))
    })
  })
};
var assert_1993 = assert_85;
var Pair_1994 = Pair_3;
var mapSnd_1995 = mapSnd_84;
var mapFst_1996 = mapFst_83;
var $gt$eq$gt_1997 = $gt$eq$gt_82;
var snd_1998 = snd_23;
var debug2_1999 = debug2_81;
var Just_2000 = Just_1;
var Nothing_2001 = Nothing_2;
var isJust_2002 = isJust_21;
var Empty_2003 = Empty_7;
var Leaf_2004 = Leaf_8;
var Collision_2005 = Collision_9;
var BitmapIndexed_2006 = BitmapIndexed_10;
var $_2007 = $_12;
var fst_2008 = fst_22;
var Left_2009 = Left_4;
var Right_2010 = Right_5;
var loop_2011 = loop_27;
var find_2012 = find_29;
var hamtMask_2013 = hamtMask_58;
var popCount_2014 = popCount_57;
var hamtIndex_2015 = hamtIndex_59;
var lookup_2016 = lookup_60;
var setContains_2017 = setContains_76;
var foldTrie_2018 = foldTrie_66;
var emptySet_2019 = emptySet_72;
var Unit_2020 = Unit_0;
var not_2021 = not_26;
var $div$eq_2022 = $div$eq_13;
var mapIx_2023 = mapIx_30;
var insert_2024 = insert_61;
var setAdd_2025 = setAdd_73;
var setIntersection_2026 = setIntersection_80;
var remove_2027 = remove_63;
var setDiff_2028 = setDiff_79;
var setToArray_2029 = setToArray_78;
var mergeTrie_2030 = mergeTrie_70;
var setUnion_2031 = setUnion_77;
var setRemove_2032 = setRemove_75;
var setAddAll_2033 = setAddAll_74;
var trieKeys_2034 = trieKeys_71;
var size_2035 = size_68;
var mapTrie_2036 = mapTrie_67;
var nodeMask_2037 = nodeMask_56;
var isEmpty_2038 = isEmpty_69;
var filterTrie_2039 = filterTrie_65;
var nextSetBitMask_2040 = nextSetBitMask_64;
var updateOrSet_2041 = updateOrSet_62;
var State_2042 = State_6;
var runState_2043 = runState_54;
var evalState_2044 = evalState_55;
var sets_2045 = sets_53;
var gets_2046 = gets_52;
var foldM_2047 = foldM_49;
var mapM_2048 = mapM_50;
var forM_2049 = forM_51;
var strToArray_2050 = strToArray_48;
var toRecord_2051 = toRecord_47;
var reverse_2052 = reverse_46;
var tail_2053 = tail_41;
var head_2054 = head_40;
var uniq_2055 = uniq_45;
var mergeSet_2056 = mergeSet_44;
var init_2057 = init_43;
var last_2058 = last_42;
var mapJust_2059 = mapJust_39;
var concatMap_2060 = concatMap_38;
var zip_2061 = zip_37;
var zipWithIndex2_2062 = zipWithIndex2_35;
var zipWithIndex_2063 = zipWithIndex_36;
var join_2064 = join_34;
var all_2065 = all_33;
var exists_2066 = exists_32;
var containsChar_2067 = containsChar_31;
var contains_2068 = contains_28;
var either_2069 = either_24;
var splitEither_2070 = splitEither_25;
var fromJust_2071 = fromJust_20;
var justOr_2072 = justOr_19;
var maybe_2073 = maybe_18;
var $gt$gt_2074 = $gt$gt_17;
var $gt$eq_2075 = $gt$eq_16;
var $lt$eq_2076 = $lt$eq_15;
var $gt_2077 = $gt_14;
var Identity_2078 = Identity_11;
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
var App_2079 = App_731;
var Lam_2080 = Lam_732;
var Case_2081 = Case_733;
var Let_2082 = Let_734;
var New_2083 = New_735;
var breakableDownAndUpM_2084 = breakableDownAndUpM_780;
var breakableDownM_2085 = breakableDownM_784;
var downAndUpM_2086 = downAndUpM_781;
var downM_2087 = downM_783;
var upM_2088 = upM_782;
var breakableDownAndUp_2089 = breakableDownAndUp_775;
var breakableDown_2090 = breakableDown_779;
var downAndUp_2091 = downAndUp_776;
var down_2092 = down_778;
var up_2093 = up_777;
var AnnType_2094 = AnnType_723;
var TUnknown_2095 = TUnknown_754;
var getAnn_2096 = getAnn_759;
var getAnnType_2097 = getAnnType_762;
var Var_2098 = Var_729;
var Const_2099 = Const_730;
var annOf_2100 = annOf_772;
var getType_2101 = getType_774;
var withAnn_2102 = withAnn_773;
var setAnn_2103 = setAnn_760;
var setAnnType_2104 = setAnnType_763;
var setType_2105 = setType_771;
var Data_2106 = Data_743;
var DataCon_2107 = DataCon_744;
var dataConName_2108 = dataConName_769;
var dataConNames_2109 = dataConNames_770;
var TCBound_2110 = TCBound_747;
var TConst_2111 = TConst_748;
var TVar_2112 = TVar_749;
var TApp_2113 = TApp_750;
var TRow_2114 = TRow_751;
var TBot_2115 = TBot_752;
var TForall_2116 = TForall_753;
var equivBound_2117 = equivBound_767;
var equivType_2118 = equivType_768;
var AnnCodeLoc_2119 = AnnCodeLoc_724;
var printCodeLoc_2120 = printCodeLoc_766;
var setAnnCodeLoc_2121 = setAnnCodeLoc_765;
var getAnnCodeLoc_2122 = getAnnCodeLoc_764;
var copyAnn_2123 = copyAnn_761;
var emptyAnn_2124 = emptyAnn_758;
var ImportAll_2125 = ImportAll_757;
var ImportOpen_2126 = ImportOpen_756;
var ImportClosed_2127 = ImportClosed_755;
var Instance_2128 = Instance_746;
var Class_2129 = Class_745;
var ModuleInterface_2130 = ModuleInterface_742;
var Module_2131 = Module_741;
var PData_2132 = PData_740;
var PConst_2133 = PConst_739;
var PVar_2134 = PVar_738;
var CStr_2135 = CStr_737;
var CNum_2136 = CNum_736;
var AnnExport_2137 = AnnExport_728;
var AnnTag_2138 = AnnTag_727;
var AnnData_2139 = AnnData_726;
var AnnUseCount_2140 = AnnUseCount_725;
var printType_2141 = function(t_2147){
  var printParen_2148 = function(t_2152){
    return ($concat(($concat("("))(printType_2141(t_2152))))(")")
  };
  var printSecondTypeInApp_2151 = function(t_2175){
    if(t_2175.$tag==2){
      var $phi$229 = printParen_2148(t_2175)
    } else if(t_2175.$tag==5){
      var $phi$229 = printParen_2148(t_2175)
    } else var $phi$229 = printType_2141(t_2175);
    return $phi$229
  };
  var printFirstTypeInApp_2150 = function(t_2164){
    if((t_2164.$tag==2)&&((t_2164.$1.$tag==2)&&((t_2164.$1.$1.$tag==0)&&("->"==t_2164.$1.$1.$1)))){
      var $phi$230 = printParen_2148(t_2164)
    } else if(t_2164.$tag==5){
      var $phi$230 = printParen_2148(t_2164)
    } else var $phi$230 = printType_2141(t_2164);
    return $phi$230
  };
  var printTypeInFun_2149 = function(t_2153){
    if((t_2153.$tag==2)&&((t_2153.$1.$tag==2)&&((t_2153.$1.$1.$tag==0)&&("->"==t_2153.$1.$1.$1)))){
      var $phi$231 = printParen_2148(t_2153)
    } else if(t_2153.$tag==5){
      var $phi$231 = printParen_2148(t_2153)
    } else var $phi$231 = printType_2141(t_2153);
    return $phi$231
  };
  if(t_2147.$tag==0){
    var $phi$232 = t_2147.$1
  } else if(t_2147.$tag==1){
    var $phi$232 = t_2147.$1
  } else if(t_2147.$tag==4){
    var $phi$232 = "~bottom~"
  } else if(t_2147.$tag==6){
    var $phi$232 = "?"
  } else if((t_2147.$tag==2)&&((t_2147.$1.$tag==2)&&((t_2147.$1.$1.$tag==0)&&("->"==t_2147.$1.$1.$1)))){
    var $phi$232 = ($concat(($concat(printTypeInFun_2149(t_2147.$1.$2)))(" -> ")))(printType_2141(t_2147.$2))
  } else if(t_2147.$tag==2){
    var $phi$232 = ($concat(($concat(printFirstTypeInApp_2150(t_2147.$1)))(" ")))(printSecondTypeInApp_2151(t_2147.$2))
  } else if(t_2147.$tag==5){
    var $phi$234 = length(t_2147.$2);
    if(0==$phi$234){
      var $phi$233 = ""
    } else var $phi$233 = ($concat(" with "))((intercalate(", "))((map(printTypeBound_2142))(t_2147.$2)));
    var bounds_2200 = $phi$233;
    var $phi$232 = ($concat(($concat(($concat(($concat("forall "))((intercalate(", "))(t_2147.$1))))(bounds_2200)))(". ")))(printType_2141(t_2147.$3))
  } else var $phi$232 = error(($concat("cannot print "))(jsonStringify(t_2147)));
  return $phi$232
};
var printTypeBound_2142 = function(b_2203){
  var $phi$235 = ($concat(($concat(($concat(($concat(b_2203.$1))(" ")))("(")))(printType_2141(b_2203.$2))))(")");
  return $phi$235
};
var indent_2145 = map(function(l_2263){
  return ($concat("  "))(l_2263)
});
var printExprTyped_2143 = function(typed_2207){
  return function(e_2208){
    var sameLine_2210 = function(xs_2219){
      return function(ys_2220){
        return (concat(init_2057(xs_2219)))((enqueue(($concat(last_2058(xs_2219)))(head_2054(ys_2220))))(tail_2053(ys_2220)))
      }
    };
    var sameLine3_2211 = function(a_2221){
      return function(b_2222){
        return function(c_2223){
          return (sameLine_2210(a_2221))((sameLine_2210(b_2222))(c_2223))
        }
      }
    };
    var printT_2215 = function(e_2256){
      var t_2257 = getType_2101(e_2256);
      return printType_2141(t_2257)
    };
    var printPat_2213 = function(p_2227){
      if(p_2227.$tag==0){
        var $phi$236 = p_2227.$1
      } else if((p_2227.$tag==1)&&(p_2227.$1.$tag==0)){
        var $phi$236 = jsonStringify(p_2227.$1.$0)
      } else if((p_2227.$tag==1)&&(p_2227.$1.$tag==1)){
        var $phi$236 = jsonStringify(p_2227.$1.$0)
      } else if(p_2227.$tag==2){
        var $phi$236 = ($concat(($concat(($concat(p_2227.$1))(" (")))((join_2064((map(printPat_2213))(p_2227.$2)))(") ("))))(")")
      } else error("pattern match fail",p_2227);
      return $phi$236
    };
    var printParen_2209 = function(e_2218){
      return ((sameLine3_2211(["("]))(printExpr_2216(e_2218)))([")"])
    };
    var printCasePat_2212 = function(cp_2224){
      var $phi$237 = (enqueue(($concat(printPat_2213(cp_2224.$0)))(" ->")))(indent_2145(printExpr_2216(cp_2224.$1)));
      return $phi$237
    };
    var printE_2214 = function(e_2237){
      if(e_2237.$tag==0){
        var $phi$238 = [e_2237.$1]
      } else if((e_2237.$tag==1)&&(e_2237.$1.$tag==0)){
        var $phi$238 = [jsonStringify(e_2237.$1.$0)]
      } else if((e_2237.$tag==1)&&(e_2237.$1.$tag==1)){
        var $phi$238 = [jsonStringify(e_2237.$1.$0)]
      } else if(e_2237.$tag==2){
        var $phi$238 = ((sameLine3_2211(printParen_2209(e_2237.$1)))([" "]))(printParen_2209(e_2237.$2))
      } else if(e_2237.$tag==3){
        var $phi$238 = (enqueue(($concat(($concat("\\"))(e_2237.$1)))(" ->")))(indent_2145(printExpr_2216(e_2237.$2)))
      } else if(e_2237.$tag==4){
        var $phi$238 = (concat(((sameLine3_2211(["case "]))(printParen_2209(e_2237.$1)))([" of"])))(indent_2145((concatMap_2060(printCasePat_2212))(e_2237.$2)))
      } else if(e_2237.$tag==5){
        var $phi$238 = (concat((push("in"))((enqueue("let"))(indent_2145((concatMap_2060(printDef_2144(typed_2207)))(e_2237.$1))))))(indent_2145(printExpr_2216(e_2237.$2)))
      } else error("pattern match fail",e_2237);
      return $phi$238
    };
    var printExpr_2216 = function(e_2258){
      if(!typed_2207){
        var $phi$239 = printE_2214(e_2258)
      } else if(typed_2207){
        var $phi$239 = ((sameLine3_2211(["("]))(printE_2214(e_2258)))([($concat(($concat(" :: "))(printT_2215(e_2258))))(" )")])
      } else error("pattern match fail",typed_2207);
      return $phi$239
    };
    var pe_2217 = printE_2214(e_2208);
    return printExpr_2216(e_2208)
  }
};
var printDef_2144 = function(typed_2259){
  return function(d_2260){
    var $phi$240 = (enqueue(($concat(d_2260.$0))(" =")))(indent_2145((printExprTyped_2143(typed_2259))(d_2260.$1)));
    return $phi$240
  }
};
var reallyPrintExpr_2146 = function(typed_2264){
  return function(e_2265){
    return (join_2064((printExprTyped_2143(typed_2264))(e_2265)))("\n")
  }
};
var assert_2266 = assert_85;
var Pair_2267 = Pair_3;
var mapSnd_2268 = mapSnd_84;
var mapFst_2269 = mapFst_83;
var $gt$eq$gt_2270 = $gt$eq$gt_82;
var snd_2271 = snd_23;
var debug2_2272 = debug2_81;
var Just_2273 = Just_1;
var Nothing_2274 = Nothing_2;
var isJust_2275 = isJust_21;
var Empty_2276 = Empty_7;
var Leaf_2277 = Leaf_8;
var Collision_2278 = Collision_9;
var BitmapIndexed_2279 = BitmapIndexed_10;
var $_2280 = $_12;
var fst_2281 = fst_22;
var Left_2282 = Left_4;
var Right_2283 = Right_5;
var loop_2284 = loop_27;
var find_2285 = find_29;
var hamtMask_2286 = hamtMask_58;
var popCount_2287 = popCount_57;
var hamtIndex_2288 = hamtIndex_59;
var lookup_2289 = lookup_60;
var setContains_2290 = setContains_76;
var foldTrie_2291 = foldTrie_66;
var emptySet_2292 = emptySet_72;
var Unit_2293 = Unit_0;
var not_2294 = not_26;
var $div$eq_2295 = $div$eq_13;
var mapIx_2296 = mapIx_30;
var insert_2297 = insert_61;
var setAdd_2298 = setAdd_73;
var setIntersection_2299 = setIntersection_80;
var remove_2300 = remove_63;
var setDiff_2301 = setDiff_79;
var setToArray_2302 = setToArray_78;
var mergeTrie_2303 = mergeTrie_70;
var setUnion_2304 = setUnion_77;
var setRemove_2305 = setRemove_75;
var setAddAll_2306 = setAddAll_74;
var trieKeys_2307 = trieKeys_71;
var size_2308 = size_68;
var mapTrie_2309 = mapTrie_67;
var nodeMask_2310 = nodeMask_56;
var isEmpty_2311 = isEmpty_69;
var filterTrie_2312 = filterTrie_65;
var nextSetBitMask_2313 = nextSetBitMask_64;
var updateOrSet_2314 = updateOrSet_62;
var State_2315 = State_6;
var runState_2316 = runState_54;
var evalState_2317 = evalState_55;
var sets_2318 = sets_53;
var gets_2319 = gets_52;
var foldM_2320 = foldM_49;
var mapM_2321 = mapM_50;
var forM_2322 = forM_51;
var strToArray_2323 = strToArray_48;
var toRecord_2324 = toRecord_47;
var reverse_2325 = reverse_46;
var tail_2326 = tail_41;
var head_2327 = head_40;
var uniq_2328 = uniq_45;
var mergeSet_2329 = mergeSet_44;
var init_2330 = init_43;
var last_2331 = last_42;
var mapJust_2332 = mapJust_39;
var concatMap_2333 = concatMap_38;
var zip_2334 = zip_37;
var zipWithIndex2_2335 = zipWithIndex2_35;
var zipWithIndex_2336 = zipWithIndex_36;
var join_2337 = join_34;
var all_2338 = all_33;
var exists_2339 = exists_32;
var containsChar_2340 = containsChar_31;
var contains_2341 = contains_28;
var either_2342 = either_24;
var splitEither_2343 = splitEither_25;
var fromJust_2344 = fromJust_20;
var justOr_2345 = justOr_19;
var maybe_2346 = maybe_18;
var $gt$gt_2347 = $gt$gt_17;
var $gt$eq_2348 = $gt$eq_16;
var $lt$eq_2349 = $lt$eq_15;
var $gt_2350 = $gt_14;
var Identity_2351 = Identity_11;
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
var App_2352 = App_731;
var Lam_2353 = Lam_732;
var Case_2354 = Case_733;
var Let_2355 = Let_734;
var New_2356 = New_735;
var breakableDownAndUpM_2357 = breakableDownAndUpM_780;
var breakableDownM_2358 = breakableDownM_784;
var downAndUpM_2359 = downAndUpM_781;
var downM_2360 = downM_783;
var upM_2361 = upM_782;
var breakableDownAndUp_2362 = breakableDownAndUp_775;
var breakableDown_2363 = breakableDown_779;
var downAndUp_2364 = downAndUp_776;
var down_2365 = down_778;
var up_2366 = up_777;
var AnnType_2367 = AnnType_723;
var TUnknown_2368 = TUnknown_754;
var getAnn_2369 = getAnn_759;
var getAnnType_2370 = getAnnType_762;
var Var_2371 = Var_729;
var Const_2372 = Const_730;
var annOf_2373 = annOf_772;
var getType_2374 = getType_774;
var withAnn_2375 = withAnn_773;
var setAnn_2376 = setAnn_760;
var setAnnType_2377 = setAnnType_763;
var setType_2378 = setType_771;
var Data_2379 = Data_743;
var DataCon_2380 = DataCon_744;
var dataConName_2381 = dataConName_769;
var dataConNames_2382 = dataConNames_770;
var TCBound_2383 = TCBound_747;
var TConst_2384 = TConst_748;
var TVar_2385 = TVar_749;
var TApp_2386 = TApp_750;
var TRow_2387 = TRow_751;
var TBot_2388 = TBot_752;
var TForall_2389 = TForall_753;
var equivBound_2390 = equivBound_767;
var equivType_2391 = equivType_768;
var AnnCodeLoc_2392 = AnnCodeLoc_724;
var printCodeLoc_2393 = printCodeLoc_766;
var setAnnCodeLoc_2394 = setAnnCodeLoc_765;
var getAnnCodeLoc_2395 = getAnnCodeLoc_764;
var copyAnn_2396 = copyAnn_761;
var emptyAnn_2397 = emptyAnn_758;
var ImportAll_2398 = ImportAll_757;
var ImportOpen_2399 = ImportOpen_756;
var ImportClosed_2400 = ImportClosed_755;
var Instance_2401 = Instance_746;
var Class_2402 = Class_745;
var ModuleInterface_2403 = ModuleInterface_742;
var Module_2404 = Module_741;
var PData_2405 = PData_740;
var PConst_2406 = PConst_739;
var PVar_2407 = PVar_738;
var CStr_2408 = CStr_737;
var CNum_2409 = CNum_736;
var AnnExport_2410 = AnnExport_728;
var AnnTag_2411 = AnnTag_727;
var AnnData_2412 = AnnData_726;
var AnnUseCount_2413 = AnnUseCount_725;
var reallyPrintExpr_2414 = reallyPrintExpr_2146;
var renameExpr_2415 = rewriteExpr_1878;
var getUid_2416 = getUid_1478;
var setUid_2417 = setUid_1479;
var mergeCount_2420 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_2455){
      return function(b_2456){
        return ((foldTrie_2291(function(a_2457){
          return function(k_2458){
            return function(v_2459){
              return ((((insert_2297(local$instance$Hashable$1))(local$instance$Eq$0))(k_2458))(v_2459+((justOr_2345(0))((((lookup_2289(local$instance$Hashable$1))(local$instance$Eq$0))(k_2458))(a_2457)))))(a_2457)
            }
          }
        }))(a_2455))(b_2456)
      }
    }
  }
};
var getCount_2419 = function(e_2453){
  var $phi$242 = (((getAnn_2369($import1$instance$Hashable$13))($import1$instance$Eq$1))("useCount"))(annOf_2373(e_2453));
  if(($phi$242.$tag==0)&&($phi$242.$0.$tag==2)){
    var $phi$241 = $phi$242.$0.$0
  } else error("pattern match fail",$phi$242);
  return $phi$241
};
var annWithUseCount_2421 = function(e_2460){
  var dropCount_2461 = function(local$instance$Hashable$1){
    return function(local$instance$Eq$0){
      return function(n_2465){
        return function(c_2466){
          return (((remove_2300(local$instance$Hashable$1))(local$instance$Eq$0))(n_2465))(c_2466)
        }
      }
    }
  };
  var countPat_2463 = function(c_2470){
    return function(p_2471){
      if(p_2471.$tag==0){
        var $phi$243 = (((dropCount_2461($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_2471.$1))(c_2470)
      } else if(p_2471.$tag==2){
        var $phi$243 = ((foldl(countPat_2463))(c_2470))(p_2471.$2)
      } else var $phi$243 = c_2470;
      return $phi$243
    }
  };
  var countCase_2462 = function(pe_2467){
    var $phi$244 = (countPat_2463(getCount_2419(pe_2467.$1)))(pe_2467.$0);
    return $phi$244
  };
  var countExpr_2464 = function(e_2478){
    if(e_2478.$tag==0){
      var $phi$245 = ((((insert_2297($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_2478.$1))(1))(Empty_2276)
    } else if(e_2478.$tag==2){
      var $phi$245 = (((mergeCount_2420($import1$instance$Hashable$13))($import1$instance$Eq$1))(getCount_2419(e_2478.$1)))(getCount_2419(e_2478.$2))
    } else if(e_2478.$tag==3){
      var $phi$245 = (((dropCount_2461($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_2478.$1))(getCount_2419(e_2478.$2))
    } else if(e_2478.$tag==5){
      var $phi$245 = ((foldl(function(c_2490){
        return function(n_2491){
          return (((dropCount_2461($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_2491))(c_2490)
        }
      }))(((foldl(function(c_2492){
        return function(e_2493){
          return (((mergeCount_2420($import1$instance$Hashable$13))($import1$instance$Eq$1))(c_2492))(getCount_2419(e_2493))
        }
      }))(getCount_2419(e_2478.$2)))((map(snd_2271))(e_2478.$1))))((map(fst_2281))(e_2478.$1))
    } else if(e_2478.$tag==4){
      var $phi$245 = ((foldl((mergeCount_2420($import1$instance$Hashable$13))($import1$instance$Eq$1)))(getCount_2419(e_2478.$1)))((map(countCase_2462))(e_2478.$2))
    } else if(e_2478.$tag==1){
      var $phi$245 = Empty_2276
    } else if(e_2478.$tag==6){
      var $phi$245 = ((foldl((mergeCount_2420($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_2276))((map(getCount_2419))(e_2478.$2))
    } else error("pattern match fail",e_2478);
    return $phi$245
  };
  return ((up_2366(function(a_2502){
    return function(e_2503){
      return ($_2280(Pair_2267(a_2502)))((withAnn_2375(((((setAnn_2376($import1$instance$Hashable$13))($import1$instance$Eq$1))("useCount"))(($_2280(AnnUseCount_2413))(countExpr_2464(e_2503))))(annOf_2373(e_2503))))(e_2503))
    }
  }))(Unit_2293))(e_2460)
};
var patSize_2429 = function(p_2571){
  if(p_2571.$tag==0){
    var $phi$246 = 1
  } else if(p_2571.$tag==1){
    var $phi$246 = 1
  } else if(p_2571.$tag==2){
    var $phi$246 = ((foldl(function(c_2579){
      return function(p_2580){
        return c_2579+(patSize_2429(p_2580))
      }
    }))(1))(p_2571.$2)
  } else error("pattern match fail",p_2571);
  return $phi$246
};
var exprSize_2428 = function(e_2543){
  if(e_2543.$tag==0){
    var $phi$247 = 1
  } else if(e_2543.$tag==1){
    var $phi$247 = 1
  } else if(e_2543.$tag==2){
    var $phi$247 = (1+(exprSize_2428(e_2543.$1)))+(exprSize_2428(e_2543.$2))
  } else if(e_2543.$tag==3){
    var $phi$247 = 1+(exprSize_2428(e_2543.$2))
  } else if(e_2543.$tag==4){
    var $phi$247 = 1+(((foldl(function(c_2557){
      return function(p_2558){
        var $phi$248 = (c_2557+(patSize_2429(p_2558.$0)))+(exprSize_2428(p_2558.$1));
        return $phi$248
      }
    }))(exprSize_2428(e_2543.$1)))(e_2543.$2))
  } else if(e_2543.$tag==5){
    var $phi$247 = 1+(((foldl(function(c_2564){
      return function(b_2565){
        return c_2564+(exprSize_2428(snd_2271(b_2565)))
      }
    }))(exprSize_2428(e_2543.$2)))(e_2543.$1))
  } else if(e_2543.$tag==6){
    var $phi$247 = ((foldl(function(c_2569){
      return function(e_2570){
        return c_2569+(exprSize_2428(e_2570))
      }
    }))(1))(e_2543.$2)
  } else error("pattern match fail",e_2543);
  return $phi$247
};
var chooseForInlining_2430 = function(baseCount_2581){
  return function(bs_2582){
    var useCount_2583 = ((foldl((mergeCount_2420($import1$instance$Hashable$13))($import1$instance$Eq$1)))(baseCount_2581))((map(function(b_2585){
      return getCount_2419(snd_2271(b_2585))
    }))(bs_2582));
    var f_2584 = function(r_2586){
      return function(b_2587){
        if(b_2587.$1.$tag==0){
          var $phi$250 = ((((insert_2297($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2587.$0))(b_2587.$1))(r_2586)
        } else if(b_2587.$1.$tag==1){
          var $phi$250 = ((((insert_2297($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2587.$0))(b_2587.$1))(r_2586)
        } else if(b_2587.$1.$tag==3){
          var $phi$254 = ($or((($lt($import1$instance$Ord$2))(exprSize_2428(b_2587.$1)))(10)))((($eq$eq($import1$instance$Eq$0))(1))((justOr_2345(0))((((lookup_2289($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2587.$0))(useCount_2583))));
          if(!$phi$254){
            var $phi$253 = r_2586
          } else if($phi$254){
            var $phi$253 = ((((insert_2297($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2587.$0))(b_2587.$1))(r_2586)
          } else error("pattern match fail",$phi$254);
          var $phi$250 = $phi$253
        } else if(b_2587.$1.$tag==6){
          var $phi$252 = (($eq$eq($import1$instance$Eq$0))(1))((justOr_2345(0))((((lookup_2289($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2587.$0))(useCount_2583)));
          if(!$phi$252){
            var $phi$251 = r_2586
          } else if($phi$252){
            var $phi$251 = ((((insert_2297($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2587.$0))(b_2587.$1))(r_2586)
          } else error("pattern match fail",$phi$252);
          var $phi$250 = $phi$251
        } else var $phi$250 = r_2586;
        var $phi$249 = $phi$250;
        return $phi$249
      }
    };
    return ((foldl(f_2584))(Empty_2276))(bs_2582)
  }
};
var mapBindingsM_2423 = function(local$instance$Monad$0){
  return function(f_2509){
    return function(bs_2510){
      return ((mapM_2321(local$instance$Monad$0))(function(b_2511){
        var $phi$255 = (($gt$gt$eq(local$instance$Monad$0))((f_2509(b_2511.$0))(b_2511.$1)))(function(e_2514){
          return (ret(local$instance$Monad$0))((Pair_2267(b_2511.$0))(e_2514))
        });
        return $phi$255
      }))(bs_2510)
    }
  }
};
var inlineCode_2432 = function(always_2615){
  return function(e_2616){
    var withAnnCopy_2617 = function(ann_2620){
      return function(e_2621){
        return (withAnn_2375((((mergeTrie_2303($import1$instance$Hashable$13))($import1$instance$Eq$1))((((remove_2300($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_2373(e_2621))))((((copyAnn_2396($import1$instance$Hashable$13))($import1$instance$Eq$1))(["export"]))(ann_2620))))(e_2621)
      }
    };
    var inlinePat_2619 = function(p_2643){
      if(p_2643.$tag==2){
        var $phi$258 = (((lookup_2289($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_2643.$1))(always_2615);
        if(($phi$258.$tag==0)&&($phi$258.$0.$tag==0)){
          var $phi$257 = ((PData_2405(p_2643.$0))($phi$258.$0.$1))((map(inlinePat_2619))(p_2643.$2))
        } else var $phi$257 = ((PData_2405(p_2643.$0))(p_2643.$1))((map(inlinePat_2619))(p_2643.$2));
        var $phi$256 = $phi$257
      } else var $phi$256 = p_2643;
      return $phi$256
    };
    var inlineExpr_2618 = function(e_2622){
      if(e_2622.$tag==0){
        var $phi$264 = (((lookup_2289($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_2622.$1))(always_2615);
        if($phi$264.$tag==1){
          var $phi$263 = (ret($import1$instance$Monad$11))(Left_2282(e_2622))
        } else if($phi$264.$tag==0){
          var $phi$263 = ((fmap($import1$instance$Functor$9))(function(e_2626){
            return Left_2282((withAnnCopy_2617(e_2622.$0))(e_2626))
          }))((renameExpr_2415(empty))($phi$264.$0))
        } else error("pattern match fail",$phi$264);
        var $phi$259 = $phi$263
      } else if(e_2622.$tag==5){
        var always2_2630 = (((mergeTrie_2303($import1$instance$Hashable$13))($import1$instance$Eq$1))(always_2615))((chooseForInlining_2430(getCount_2419(e_2622.$2)))(e_2622.$1));
        var $phi$259 = (($gt$gt$eq($import1$instance$Monad$11))(((mapBindingsM_2423($import1$instance$Monad$11))(function(n_2631){
          return function(e_2632){
            return (inlineCode_2432((((remove_2300($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_2631))(always2_2630)))(e_2632)
          }
        }))(e_2622.$1)))(function(bs_2633){
          return (($gt$gt$eq($import1$instance$Monad$11))((inlineCode_2432(always2_2630))(e_2622.$2)))(function(e_2634){
            var $phi$262 = length(bs_2633);
            if(0==$phi$262){
              var $phi$261 = (ret($import1$instance$Monad$11))(Right_2283((withAnnCopy_2617(e_2622.$0))(e_2634)))
            } else var $phi$261 = (ret($import1$instance$Monad$11))(Right_2283(((Let_2355(e_2622.$0))(bs_2633))(e_2634)));
            return $phi$261
          })
        })
      } else if(e_2622.$tag==4){
        var $phi$259 = (ret($import1$instance$Monad$11))(Left_2282(((Case_2354(e_2622.$0))(e_2622.$1))((map(function(p_2639){
          var $phi$260 = (Pair_2267(inlinePat_2619(p_2639.$0)))(p_2639.$1);
          return $phi$260
        }))(e_2622.$2))))
      } else var $phi$259 = (ret($import1$instance$Monad$11))(Left_2282(e_2622));
      return $phi$259
    };
    return ((breakableDownM_2358($import1$instance$Monad$11))(inlineExpr_2618))(e_2616)
  }
};
var dropDeadBindings_2433 = function(useCount_2651){
  return function(bs_2652){
    var isExport_2653 = function(e_2655){
      return isJust_2275((((getAnn_2369($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_2373(e_2655)))
    };
    var f_2654 = function(b_2656){
      var totalCount_2659 = (justOr_2345(0))((((lookup_2289($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2656.$0))(useCount_2651));
      var recursiveCount_2660 = (justOr_2345(0))((((lookup_2289($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2656.$0))(getCount_2419(b_2656.$1)));
      var keep_2661 = ($or(isExport_2653(b_2656.$1)))((($gt_2350($import1$instance$Ord$2))(totalCount_2659-recursiveCount_2660))(0));
      if(keep_2661){
        var $phi$266 = Just_2273((Pair_2267(b_2656.$0))(b_2656.$1))
      } else if(!keep_2661){
        var ann_2662 = annOf_2373(b_2656.$1);
        var $phi$268 = (((getAnn_2369($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(ann_2662);
        if($phi$268.$tag==1){
          var $phi$267 = Nothing_2274
        } else if($phi$268.$tag==0){
          var $phi$267 = Just_2273((Pair_2267(b_2656.$0))((withAnn_2375(((((setAnn_2376($import1$instance$Hashable$13))($import1$instance$Eq$1))("dead"))(AnnTag_2411))(ann_2662)))(b_2656.$1)))
        } else error("pattern match fail",$phi$268);
        var $phi$266 = $phi$267
      } else error("pattern match fail",keep_2661);
      var $phi$265 = $phi$266;
      return $phi$265
    };
    return (mapJust_2332(f_2654))(bs_2652)
  }
};
var deadCode_2427 = function(e_2531){
  var f_2532 = function(e_2533){
    if(e_2533.$tag==5){
      var useCount_2537 = ((foldl((mergeCount_2420($import1$instance$Hashable$13))($import1$instance$Eq$1)))(getCount_2419(e_2533.$2)))((map(function(b_2539){
        return getCount_2419(snd_2271(b_2539))
      }))(e_2533.$1));
      var bs2_2538 = (dropDeadBindings_2433(useCount_2537))(e_2533.$1);
      var $phi$269 = ((Let_2355(e_2533.$0))(bs2_2538))(e_2533.$2)
    } else var $phi$269 = e_2533;
    return $phi$269
  };
  return snd_2271(((down_2365(function(a_2541){
    return function(e_2542){
      return (Pair_2267(a_2541))(f_2532(e_2542))
    }
  }))(Unit_2293))(e_2531))
};
var betaReduction_2431 = function(e_2601){
  var f_2602 = function(e_2603){
    if((e_2603.$tag==2)&&(e_2603.$1.$tag==3)){
      if(e_2603.$2.$tag==0){
        var $phi$273 = (($eq$eq($import1$instance$Eq$1))(e_2603.$1.$1))(e_2603.$2.$1);
        if($phi$273){
          var $phi$272 = e_2603.$1.$2
        } else if(!$phi$273){
          var $phi$272 = ((Let_2355(e_2603.$0))([(Pair_2267(e_2603.$1.$1))((Var_2371(e_2603.$2.$0))(e_2603.$2.$1))]))(e_2603.$1.$2)
        } else error("pattern match fail",$phi$273);
        var $phi$271 = $phi$272
      } else var $phi$271 = ((Let_2355(e_2603.$0))([(Pair_2267(e_2603.$1.$1))(e_2603.$2)]))(e_2603.$1.$2);
      var $phi$270 = $phi$271
    } else var $phi$270 = e_2603;
    return $phi$270
  };
  return snd_2271(((down_2365(function(a_2613){
    return function(e_2614){
      return (Pair_2267(a_2613))(f_2602(e_2614))
    }
  }))(Unit_2293))(e_2601))
};
var mapBindings_2422 = function(f_2504){
  return function(bs_2505){
    return (map(function(b_2506){
      var $phi$274 = (Pair_2267(b_2506.$0))(f_2504(b_2506.$1));
      return $phi$274
    }))(bs_2505)
  }
};
var pass_2425 = function(bs_2519){
  var bs2_2520 = (mapBindings_2422(function(e_2524){
    return ($_2280(snd_2271))(annWithUseCount_2421(e_2524))
  }))(bs_2519);
  var useCount_2521 = ((foldl((mergeCount_2420($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_2276))((map(function(b_2525){
    return getCount_2419(snd_2271(b_2525))
  }))(bs2_2520));
  var bs3_2522 = (mapBindings_2422(deadCode_2427))((dropDeadBindings_2433(useCount_2521))(bs2_2520));
  var always_2523 = (chooseForInlining_2430(Empty_2276))(bs3_2522);
  return (($gt$gt$eq($import1$instance$Monad$11))(((mapBindingsM_2423($import1$instance$Monad$11))(function(n_2526){
    return function(e_2527){
      return (inlineCode_2432((((remove_2300($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_2526))(always_2523)))(e_2527)
    }
  }))(bs3_2522)))(function(bs_2528){
    return (ret($import1$instance$Monad$11))((mapBindings_2422(betaReduction_2431))(bs_2528))
  })
};
var processImports_2426 = function(useCount_2529){
  return function(is_2530){
    return is_2530
  }
};
var loopPasses_2424 = function(local$instance$Monad$0){
  return function(n_2515){
    return function(p_2516){
      return function(bs_2517){
        if(0==n_2515){
          var $phi$275 = (ret(local$instance$Monad$0))(bs_2517)
        } else var $phi$275 = (($gt$gt$eq(local$instance$Monad$0))(p_2516(bs_2517)))(((loopPasses_2424(local$instance$Monad$0))(n_2515-1))(p_2516));
        return $phi$275
      }
    }
  }
};
var inline_2418 = function(enable_2434){
  return function(m_2435){
    return (($gt$gt$eq($import1$instance$Monad$11))(getUid_2416))(function(uid_2436){
      if(enable_2434){
        var $phi$277 = 10
      } else if(!enable_2434){
        var $phi$277 = 0
      } else error("pattern match fail",enable_2434);
      var iterCount_2444 = $phi$277;
      var r_2445 = (runState_2316(uid_2436))((((loopPasses_2424($import1$instance$Monad$11))(iterCount_2444))(pass_2425))(m_2435.$6));
      var bs2_2446 = snd_2271(r_2445);
      var bs3_2448 = (mapBindings_2422(function(e_2451){
        return ($_2280(snd_2271))(annWithUseCount_2421(e_2451))
      }))(bs2_2446);
      var useCount_2449 = ((foldl((mergeCount_2420($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_2276))((map(function(b_2452){
        return getCount_2419(snd_2271(b_2452))
      }))(bs3_2448));
      var is2_2450 = (processImports_2426(useCount_2449))(m_2435.$2);
      var uid2_2447 = fst_2281(r_2445);
      var $phi$276 = (($gt$gt_2347($import1$instance$Monad$11))(setUid_2417(uid2_2447)))((ret($import1$instance$Monad$11))(((((((Module_2404(m_2435.$0))(m_2435.$1))(is2_2450))(m_2435.$3))(m_2435.$4))(m_2435.$5))(bs3_2448)));
      return $phi$276
    })
  }
};
var assert_2664 = assert_85;
var Pair_2665 = Pair_3;
var mapSnd_2666 = mapSnd_84;
var mapFst_2667 = mapFst_83;
var $gt$eq$gt_2668 = $gt$eq$gt_82;
var snd_2669 = snd_23;
var debug2_2670 = debug2_81;
var Just_2671 = Just_1;
var Nothing_2672 = Nothing_2;
var isJust_2673 = isJust_21;
var Empty_2674 = Empty_7;
var Leaf_2675 = Leaf_8;
var Collision_2676 = Collision_9;
var BitmapIndexed_2677 = BitmapIndexed_10;
var $_2678 = $_12;
var fst_2679 = fst_22;
var Left_2680 = Left_4;
var Right_2681 = Right_5;
var loop_2682 = loop_27;
var find_2683 = find_29;
var hamtMask_2684 = hamtMask_58;
var popCount_2685 = popCount_57;
var hamtIndex_2686 = hamtIndex_59;
var lookup_2687 = lookup_60;
var setContains_2688 = setContains_76;
var foldTrie_2689 = foldTrie_66;
var emptySet_2690 = emptySet_72;
var Unit_2691 = Unit_0;
var not_2692 = not_26;
var $div$eq_2693 = $div$eq_13;
var mapIx_2694 = mapIx_30;
var insert_2695 = insert_61;
var setAdd_2696 = setAdd_73;
var setIntersection_2697 = setIntersection_80;
var remove_2698 = remove_63;
var setDiff_2699 = setDiff_79;
var setToArray_2700 = setToArray_78;
var mergeTrie_2701 = mergeTrie_70;
var setUnion_2702 = setUnion_77;
var setRemove_2703 = setRemove_75;
var setAddAll_2704 = setAddAll_74;
var trieKeys_2705 = trieKeys_71;
var size_2706 = size_68;
var mapTrie_2707 = mapTrie_67;
var nodeMask_2708 = nodeMask_56;
var isEmpty_2709 = isEmpty_69;
var filterTrie_2710 = filterTrie_65;
var nextSetBitMask_2711 = nextSetBitMask_64;
var updateOrSet_2712 = updateOrSet_62;
var State_2713 = State_6;
var runState_2714 = runState_54;
var evalState_2715 = evalState_55;
var sets_2716 = sets_53;
var gets_2717 = gets_52;
var foldM_2718 = foldM_49;
var mapM_2719 = mapM_50;
var forM_2720 = forM_51;
var strToArray_2721 = strToArray_48;
var toRecord_2722 = toRecord_47;
var reverse_2723 = reverse_46;
var tail_2724 = tail_41;
var head_2725 = head_40;
var uniq_2726 = uniq_45;
var mergeSet_2727 = mergeSet_44;
var init_2728 = init_43;
var last_2729 = last_42;
var mapJust_2730 = mapJust_39;
var concatMap_2731 = concatMap_38;
var zip_2732 = zip_37;
var zipWithIndex2_2733 = zipWithIndex2_35;
var zipWithIndex_2734 = zipWithIndex_36;
var join_2735 = join_34;
var all_2736 = all_33;
var exists_2737 = exists_32;
var containsChar_2738 = containsChar_31;
var contains_2739 = contains_28;
var either_2740 = either_24;
var splitEither_2741 = splitEither_25;
var fromJust_2742 = fromJust_20;
var justOr_2743 = justOr_19;
var maybe_2744 = maybe_18;
var $gt$gt_2745 = $gt$gt_17;
var $gt$eq_2746 = $gt$eq_16;
var $lt$eq_2747 = $lt$eq_15;
var $gt_2748 = $gt_14;
var Identity_2749 = Identity_11;
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
var App_2750 = App_731;
var Lam_2751 = Lam_732;
var Case_2752 = Case_733;
var Let_2753 = Let_734;
var New_2754 = New_735;
var breakableDownAndUpM_2755 = breakableDownAndUpM_780;
var breakableDownM_2756 = breakableDownM_784;
var downAndUpM_2757 = downAndUpM_781;
var downM_2758 = downM_783;
var upM_2759 = upM_782;
var breakableDownAndUp_2760 = breakableDownAndUp_775;
var breakableDown_2761 = breakableDown_779;
var downAndUp_2762 = downAndUp_776;
var down_2763 = down_778;
var up_2764 = up_777;
var AnnType_2765 = AnnType_723;
var TUnknown_2766 = TUnknown_754;
var getAnn_2767 = getAnn_759;
var getAnnType_2768 = getAnnType_762;
var Var_2769 = Var_729;
var Const_2770 = Const_730;
var annOf_2771 = annOf_772;
var getType_2772 = getType_774;
var withAnn_2773 = withAnn_773;
var setAnn_2774 = setAnn_760;
var setAnnType_2775 = setAnnType_763;
var setType_2776 = setType_771;
var Data_2777 = Data_743;
var DataCon_2778 = DataCon_744;
var dataConName_2779 = dataConName_769;
var dataConNames_2780 = dataConNames_770;
var TCBound_2781 = TCBound_747;
var TConst_2782 = TConst_748;
var TVar_2783 = TVar_749;
var TApp_2784 = TApp_750;
var TRow_2785 = TRow_751;
var TBot_2786 = TBot_752;
var TForall_2787 = TForall_753;
var equivBound_2788 = equivBound_767;
var equivType_2789 = equivType_768;
var AnnCodeLoc_2790 = AnnCodeLoc_724;
var printCodeLoc_2791 = printCodeLoc_766;
var setAnnCodeLoc_2792 = setAnnCodeLoc_765;
var getAnnCodeLoc_2793 = getAnnCodeLoc_764;
var copyAnn_2794 = copyAnn_761;
var emptyAnn_2795 = emptyAnn_758;
var ImportAll_2796 = ImportAll_757;
var ImportOpen_2797 = ImportOpen_756;
var ImportClosed_2798 = ImportClosed_755;
var Instance_2799 = Instance_746;
var Class_2800 = Class_745;
var ModuleInterface_2801 = ModuleInterface_742;
var Module_2802 = Module_741;
var PData_2803 = PData_740;
var PConst_2804 = PConst_739;
var PVar_2805 = PVar_738;
var CStr_2806 = CStr_737;
var CNum_2807 = CNum_736;
var AnnExport_2808 = AnnExport_728;
var AnnTag_2809 = AnnTag_727;
var AnnData_2810 = AnnData_726;
var AnnUseCount_2811 = AnnUseCount_725;
var newIdent_2812 = newIdent_1877;
var rewriteExpr_2813 = rewriteExpr_1878;
var importAsBindings_2817 = function(ens_2850){
  return function(dataAnns_2851){
    return function(i_2852){
      if((i_2852.$tag==1)&&("./builtins.js"==i_2852.$1)){
        var $phi$278 = []
      } else if(i_2852.$tag==1){
        var f_2858 = function(p_2859){
          var $phi$281 = (((lookup_2687($import1$instance$Hashable$13))($import1$instance$Eq$1))(($concat(($concat(i_2852.$1))("#")))(p_2859.$0)))(ens_2850);
          if($phi$281.$tag==0){
            var $phi$280 = (Pair_2665(p_2859.$1))((Var_2769(($_2678(justOr_2743(emptyAnn_2795)))((((lookup_2687($import1$instance$Hashable$13))($import1$instance$Eq$1))($phi$281.$0))(dataAnns_2851))))($phi$281.$0))
          } else if($phi$281.$tag==1){
            var $phi$280 = error(($concat(($concat(($concat("mod merger encountered unknown import "))(i_2852.$1)))("#")))(p_2859.$0))
          } else error("pattern match fail",$phi$281);
          var $phi$279 = $phi$280;
          return $phi$279
        };
        var $phi$278 = (map(f_2858))((filter(function(p_2863){
          return (($div$eq_2693($import1$instance$Eq$1))(fst_2679(p_2863)))(snd_2669(p_2863))
        }))(i_2852.$2))
      } else error("pattern match fail",i_2852);
      return $phi$278
    }
  }
};
var dropExport_2815 = function(f_2819){
  return function(b_2820){
    var $phi$284 = (((getAnn_2767($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_2771(b_2820.$1));
    if($phi$284.$tag==1){
      var $phi$283 = (ret($import1$instance$Monad$11))(b_2820)
    } else if(($phi$284.$tag==0)&&($phi$284.$0.$tag==5)){
      var $phi$283 = (($gt$gt$eq($import1$instance$Monad$11))(gets_2717))(function(ns_2824){
        return (($gt$gt_2745($import1$instance$Monad$11))(sets_2716(((((insert_2695($import1$instance$Hashable$13))($import1$instance$Eq$1))(($concat(($concat(f_2819))("#")))($phi$284.$0.$0)))(b_2820.$0))(ns_2824))))((ret($import1$instance$Monad$11))((Pair_2665(b_2820.$0))((withAnn_2773((((remove_2698($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_2771(b_2820.$1))))(b_2820.$1))))
      })
    } else error("pattern match fail",$phi$284);
    var $phi$282 = $phi$283;
    return $phi$282
  }
};
var mergeInto_2816 = function(a_2825){
  return function(b_2826){
    var $phi$285 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_2719($import1$instance$Monad$11))(dropExport_2815(a_2825.$1)))(a_2825.$6)))(function(bs_2834){
      return (($gt$gt$eq($import1$instance$Monad$11))(gets_2717))(function(ns_2835){
        var f_2837 = function(local$instance$Hashable$1){
          return function(local$instance$Eq$0){
            return function(r_2838){
              return function(b_2839){
                var $phi$288 = (((getAnn_2767($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(annOf_2771(b_2839.$1));
                if($phi$288.$tag==1){
                  var $phi$287 = r_2838
                } else if($phi$288.$tag==0){
                  var $phi$287 = ((((insert_2695(local$instance$Hashable$1))(local$instance$Eq$0))(b_2839.$0))(((((setAnn_2774($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))($phi$288.$0))(emptyAnn_2795)))(r_2838)
                } else error("pattern match fail",$phi$288);
                var $phi$286 = $phi$287;
                return $phi$286
              }
            }
          }
        };
        var dataAnns_2836 = ((foldl((f_2837($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_2674))(bs_2834);
        var $phi$289 = (ret($import1$instance$Monad$11))(((((((Module_2802(a_2825.$0))(b_2826.$1))(a_2825.$2))([]))([]))([]))((concat(bs_2834))((concat((concatMap_2731((importAsBindings_2817(ns_2835))(dataAnns_2836)))(b_2826.$2)))(b_2826.$6))));
        return $phi$289
      })
    });
    return $phi$285
  }
};
var mergeModules_2814 = function(ms_2818){
  return (evalState_2715(Empty_2674))((((foldM_2718($import1$instance$Monad$11))(mergeInto_2816))(head_2725(ms_2818)))(tail_2724(ms_2818)))
};
var assert_2864 = assert_85;
var Pair_2865 = Pair_3;
var mapSnd_2866 = mapSnd_84;
var mapFst_2867 = mapFst_83;
var $gt$eq$gt_2868 = $gt$eq$gt_82;
var snd_2869 = snd_23;
var debug2_2870 = debug2_81;
var Just_2871 = Just_1;
var Nothing_2872 = Nothing_2;
var isJust_2873 = isJust_21;
var Empty_2874 = Empty_7;
var Leaf_2875 = Leaf_8;
var Collision_2876 = Collision_9;
var BitmapIndexed_2877 = BitmapIndexed_10;
var $_2878 = $_12;
var fst_2879 = fst_22;
var Left_2880 = Left_4;
var Right_2881 = Right_5;
var loop_2882 = loop_27;
var find_2883 = find_29;
var hamtMask_2884 = hamtMask_58;
var popCount_2885 = popCount_57;
var hamtIndex_2886 = hamtIndex_59;
var lookup_2887 = lookup_60;
var setContains_2888 = setContains_76;
var foldTrie_2889 = foldTrie_66;
var emptySet_2890 = emptySet_72;
var Unit_2891 = Unit_0;
var not_2892 = not_26;
var $div$eq_2893 = $div$eq_13;
var mapIx_2894 = mapIx_30;
var insert_2895 = insert_61;
var setAdd_2896 = setAdd_73;
var setIntersection_2897 = setIntersection_80;
var remove_2898 = remove_63;
var setDiff_2899 = setDiff_79;
var setToArray_2900 = setToArray_78;
var mergeTrie_2901 = mergeTrie_70;
var setUnion_2902 = setUnion_77;
var setRemove_2903 = setRemove_75;
var setAddAll_2904 = setAddAll_74;
var trieKeys_2905 = trieKeys_71;
var size_2906 = size_68;
var mapTrie_2907 = mapTrie_67;
var nodeMask_2908 = nodeMask_56;
var isEmpty_2909 = isEmpty_69;
var filterTrie_2910 = filterTrie_65;
var nextSetBitMask_2911 = nextSetBitMask_64;
var updateOrSet_2912 = updateOrSet_62;
var State_2913 = State_6;
var runState_2914 = runState_54;
var evalState_2915 = evalState_55;
var sets_2916 = sets_53;
var gets_2917 = gets_52;
var foldM_2918 = foldM_49;
var mapM_2919 = mapM_50;
var forM_2920 = forM_51;
var strToArray_2921 = strToArray_48;
var toRecord_2922 = toRecord_47;
var reverse_2923 = reverse_46;
var tail_2924 = tail_41;
var head_2925 = head_40;
var uniq_2926 = uniq_45;
var mergeSet_2927 = mergeSet_44;
var init_2928 = init_43;
var last_2929 = last_42;
var mapJust_2930 = mapJust_39;
var concatMap_2931 = concatMap_38;
var zip_2932 = zip_37;
var zipWithIndex2_2933 = zipWithIndex2_35;
var zipWithIndex_2934 = zipWithIndex_36;
var join_2935 = join_34;
var all_2936 = all_33;
var exists_2937 = exists_32;
var containsChar_2938 = containsChar_31;
var contains_2939 = contains_28;
var either_2940 = either_24;
var splitEither_2941 = splitEither_25;
var fromJust_2942 = fromJust_20;
var justOr_2943 = justOr_19;
var maybe_2944 = maybe_18;
var $gt$gt_2945 = $gt$gt_17;
var $gt$eq_2946 = $gt$eq_16;
var $lt$eq_2947 = $lt$eq_15;
var $gt_2948 = $gt_14;
var Identity_2949 = Identity_11;
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
var App_2950 = App_731;
var Lam_2951 = Lam_732;
var Case_2952 = Case_733;
var Let_2953 = Let_734;
var New_2954 = New_735;
var breakableDownAndUpM_2955 = breakableDownAndUpM_780;
var breakableDownM_2956 = breakableDownM_784;
var downAndUpM_2957 = downAndUpM_781;
var downM_2958 = downM_783;
var upM_2959 = upM_782;
var breakableDownAndUp_2960 = breakableDownAndUp_775;
var breakableDown_2961 = breakableDown_779;
var downAndUp_2962 = downAndUp_776;
var down_2963 = down_778;
var up_2964 = up_777;
var AnnType_2965 = AnnType_723;
var TUnknown_2966 = TUnknown_754;
var getAnn_2967 = getAnn_759;
var getAnnType_2968 = getAnnType_762;
var Var_2969 = Var_729;
var Const_2970 = Const_730;
var annOf_2971 = annOf_772;
var getType_2972 = getType_774;
var withAnn_2973 = withAnn_773;
var setAnn_2974 = setAnn_760;
var setAnnType_2975 = setAnnType_763;
var setType_2976 = setType_771;
var Data_2977 = Data_743;
var DataCon_2978 = DataCon_744;
var dataConName_2979 = dataConName_769;
var dataConNames_2980 = dataConNames_770;
var TCBound_2981 = TCBound_747;
var TConst_2982 = TConst_748;
var TVar_2983 = TVar_749;
var TApp_2984 = TApp_750;
var TRow_2985 = TRow_751;
var TBot_2986 = TBot_752;
var TForall_2987 = TForall_753;
var equivBound_2988 = equivBound_767;
var equivType_2989 = equivType_768;
var AnnCodeLoc_2990 = AnnCodeLoc_724;
var printCodeLoc_2991 = printCodeLoc_766;
var setAnnCodeLoc_2992 = setAnnCodeLoc_765;
var getAnnCodeLoc_2993 = getAnnCodeLoc_764;
var copyAnn_2994 = copyAnn_761;
var emptyAnn_2995 = emptyAnn_758;
var ImportAll_2996 = ImportAll_757;
var ImportOpen_2997 = ImportOpen_756;
var ImportClosed_2998 = ImportClosed_755;
var Instance_2999 = Instance_746;
var Class_3000 = Class_745;
var ModuleInterface_3001 = ModuleInterface_742;
var Module_3002 = Module_741;
var PData_3003 = PData_740;
var PConst_3004 = PConst_739;
var PVar_3005 = PVar_738;
var CStr_3006 = CStr_737;
var CNum_3007 = CNum_736;
var AnnExport_3008 = AnnExport_728;
var AnnTag_3009 = AnnTag_727;
var AnnData_3010 = AnnData_726;
var AnnUseCount_3011 = AnnUseCount_725;
var printType_3012 = printType_2141;
var printTypeBound_3013 = printTypeBound_2142;
var reallyPrintExpr_3014 = reallyPrintExpr_2146;
var sccSorted_3015 = sccSorted_574;
var ICtx_3017 = function($_0_3075){
  return function($_1_3076){
    return function($_2_3077){
      return function($_3_3078){
        return {$0:$_0_3075,$1:$_1_3076,$2:$_2_3077,$3:$_3_3078}
      }
    }
  }
};
var IEnv_3018 = function($_0_3079){
  return function($_1_3080){
    return function($_2_3081){
      return {$0:$_0_3079,$1:$_1_3080,$2:$_2_3081}
    }
  }
};
var Subs_3016 = function($_0_3073){
  return function($_1_3074){
    return {$0:$_0_3073,$1:$_1_3074}
  }
};
var instanceToTypeBound_3067 = function(i_3669){
  var $phi$290 = ((TCBound_2981(emptyAnn_2995))(i_3669.$1))(i_3669.$2);
  return $phi$290
};
var getTypedExports_3070 = function(m_3754){
  var collectExports_3762 = function(es_3764){
    return function(b_3765){
      var e_3766 = snd_2869(b_3765);
      var $phi$293 = (((getAnn_2967($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_2971(e_3766));
      if($phi$293.$tag==1){
        var $phi$292 = es_3764
      } else if(($phi$293.$tag==0)&&($phi$293.$0.$tag==5)){
        var $phi$292 = ((set($phi$293.$0.$0))(getType_2972(e_3766)))(es_3764)
      } else error("pattern match fail",$phi$293);
      return $phi$292
    }
  };
  var bs_3763 = ((foldl(collectExports_3762))(empty))(m_3754.$6);
  var $phi$291 = ((ModuleInterface_3001(bs_3763))(m_3754.$4))((map(instanceToTypeBound_3067))(m_3754.$5));
  return $phi$291
};
var getBounds_3031 = function(ctx_3170){
  var $phi$294 = ctx_3170.$1;
  return $phi$294
};
var setBounds_3032 = function(bs_3175){
  return function(ctx_3176){
    var $phi$295 = (((ICtx_3017(ctx_3176.$0))(bs_3175))(ctx_3176.$2))(ctx_3176.$3);
    return $phi$295
  }
};
var getInstances_3045 = function(env_3238){
  var $phi$296 = env_3238.$1;
  return $phi$296
};
var satisfies_3071 = function(a_3768){
  return function(b_3769){
    if(a_3768.$tag==1){
      var $phi$297 = true
    } else if(a_3768.$tag==0){
      if(b_3769.$tag==0){
        var $phi$299 = (($eq$eq($import1$instance$Eq$1))(a_3768.$1))(b_3769.$1)
      } else var $phi$299 = false;
      var $phi$297 = $phi$299
    } else if(a_3768.$tag==2){
      if(b_3769.$tag==2){
        var $phi$298 = ($and((satisfies_3071(a_3768.$1))(b_3769.$1)))((satisfies_3071(a_3768.$2))(b_3769.$2))
      } else var $phi$298 = false;
      var $phi$297 = $phi$298
    } else var $phi$297 = error(($concat("unexpected type in satisfies "))(printType_3012(a_3768)));
    return $phi$297
  }
};
var satisfiesBound_3072 = function(a_3785){
  return function(b_3786){
    var $phi$301 = ($and((($eq$eq($import1$instance$Eq$1))(a_3785.$1))(b_3786.$1)))((satisfies_3071(a_3785.$2))(b_3786.$2));
    var $phi$300 = $phi$301;
    return $phi$300
  }
};
var dropSatisfiedBounds_3059 = function(env_3523){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_2917))(function(ctx_3524){
    var is_3525 = getInstances_3045(env_3523);
    var bs_3526 = getBounds_3031(ctx_3524);
    var bs2_3527 = (filter(function(b_3528){
      return not_2892((exists_2937(function(i_3529){
        return (satisfiesBound_3072(i_3529))(b_3528)
      }))(is_3525))
    }))(bs_3526);
    return sets_2916((setBounds_3032(bs2_3527))(ctx_3524))
  })
};
var getSub_3019 = function(v_3082){
  return function(subs_3083){
    var $phi$302 = (($lt$pip$gt($import1$instance$Alternative$6))((((lookup_2887($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3082))(subs_3083.$0)))((((lookup_2887($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3082))(subs_3083.$1));
    return $phi$302
  }
};
var mkTForall_3047 = function(ann_3244){
  return function(vs_3245){
    return function(bs_3246){
      return function(t_3247){
        var f_3248 = function(bs_3249){
          return function(b_3250){
            var $phi$304 = (exists_2937(equivBound_2988(b_3250)))(bs_3249);
            if($phi$304){
              var $phi$303 = bs_3249
            } else if(!$phi$304){
              var $phi$303 = (push(b_3250))(bs_3249)
            } else error("pattern match fail",$phi$304);
            return $phi$303
          }
        };
        return (((TForall_2987(ann_3244))(vs_3245))(((foldl(f_3248))([]))(bs_3246)))(t_3247)
      }
    }
  }
};
var dropSubs_3024 = function(vs_3132){
  return function(subs_3133){
    var $phi$305 = (Subs_3016(((foldl(function(r_3136){
      return function(v_3137){
        return (((remove_2898($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3137))(r_3136)
      }
    }))(subs_3133.$0))(vs_3132)))(((foldl(function(r_3138){
      return function(v_3139){
        return (((remove_2898($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3139))(r_3138)
      }
    }))(subs_3133.$1))(vs_3132));
    return $phi$305
  }
};
var applySubs_3050 = function(subs_3277){
  return function(t_3278){
    if(t_3278.$tag==5){
      var subs2_3283 = (dropSubs_3024(t_3278.$1))(subs_3277);
      var $phi$306 = (((mkTForall_3047(t_3278.$0))(t_3278.$1))((map(applySubsBound_3051(subs2_3283)))(t_3278.$2)))((applySubs_3050(subs2_3283))(t_3278.$3))
    } else if(t_3278.$tag==1){
      var $phi$309 = (getSub_3019(t_3278.$1))(subs_3277);
      if($phi$309.$tag==1){
        var $phi$308 = t_3278
      } else if($phi$309.$tag==0){
        var $phi$308 = $phi$309.$0
      } else error("pattern match fail",$phi$309);
      var $phi$306 = $phi$308
    } else if(t_3278.$tag==2){
      var $phi$306 = ((TApp_2984(t_3278.$0))((applySubs_3050(subs_3277))(t_3278.$1)))((applySubs_3050(subs_3277))(t_3278.$2))
    } else if(t_3278.$tag==3){
      var $phi$306 = ((TRow_2985(t_3278.$0))((map(function(m_3293){
        var $phi$307 = (Pair_2865((applySubs_3050(subs_3277))(m_3293.$0)))((applySubs_3050(subs_3277))(m_3293.$1));
        return $phi$307
      }))(t_3278.$1)))(((fmap($import1$instance$Functor$4))(applySubs_3050(subs_3277)))(t_3278.$2))
    } else var $phi$306 = t_3278;
    return $phi$306
  }
};
var applySubsBound_3051 = function(subs_3297){
  return function(b_3298){
    var $phi$310 = ((TCBound_2981(b_3298.$0))(b_3298.$1))((applySubs_3050(subs_3297))(b_3298.$2));
    return $phi$310
  }
};
var applySubsE_3064 = function(subs_3591){
  return function(e_3592){
    var f_3593 = function(a_3594){
      return function(e_3595){
        var t2_3596 = (applySubs_3050(subs_3591))(getType_2972(e_3595));
        return (Pair_2865(a_3594))((setType_2976(t2_3596))(e_3595))
      }
    };
    return snd_2869(((down_2963(f_3593))(true))(e_3592))
  }
};
var getSubs_3028 = function(ctx_3153){
  var $phi$311 = ctx_3153.$0;
  return $phi$311
};
var applySubsDef_3063 = function(d_3587){
  var $phi$312 = (($gt$gt$eq($import1$instance$Monad$11))(gets_2917))(function(ctx_3590){
    return ($_2878(ret($import1$instance$Monad$11)))((Pair_2865(d_3587.$0))((applySubsE_3064(getSubs_3028(ctx_3590)))(d_3587.$1)))
  });
  return $phi$312
};
var freeVars_3065 = function(e_3597){
  var namesInPat_3600 = function(p_3610){
    if(p_3610.$tag==0){
      var $phi$313 = [p_3610.$1]
    } else if(p_3610.$tag==1){
      var $phi$313 = []
    } else if(p_3610.$tag==2){
      var $phi$313 = ((foldl((mergeSet_2927($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(namesInPat_3600))(p_3610.$2))
    } else error("pattern match fail",p_3610);
    return $phi$313
  };
  var freeVarsInPData_3599 = function(p_3605){
    if(p_3605.$tag==2){
      var $phi$314 = ((foldl((mergeSet_2927($import1$instance$Ord$3))($import1$instance$Eq$1)))([p_3605.$1]))((map(freeVarsInPData_3599))(p_3605.$2))
    } else var $phi$314 = [];
    return $phi$314
  };
  var freeVarsInPat_3598 = function(p_3601){
    var $phi$315 = (((mergeSet_2927($import1$instance$Ord$3))($import1$instance$Eq$1))((filter(function(v_3604){
      return not_2892(((contains_2939($import1$instance$Eq$1))(v_3604))(namesInPat_3600(p_3601.$0)))
    }))(freeVars_3065(p_3601.$1))))(freeVarsInPData_3599(p_3601.$0));
    return $phi$315
  };
  if(e_3597.$tag==0){
    var $phi$316 = [e_3597.$1]
  } else if(e_3597.$tag==1){
    var $phi$316 = []
  } else if(e_3597.$tag==2){
    var $phi$316 = (((mergeSet_2927($import1$instance$Ord$3))($import1$instance$Eq$1))(freeVars_3065(e_3597.$1)))(freeVars_3065(e_3597.$2))
  } else if(e_3597.$tag==3){
    var $phi$316 = (filter(function(v_3628){
      return (($div$eq_2893($import1$instance$Eq$1))(v_3628))(e_3597.$1)
    }))(freeVars_3065(e_3597.$2))
  } else if(e_3597.$tag==4){
    var $phi$316 = ((foldl((mergeSet_2927($import1$instance$Ord$3))($import1$instance$Eq$1)))(freeVars_3065(e_3597.$1)))((map(freeVarsInPat_3598))(e_3597.$2))
  } else if(e_3597.$tag==5){
    var $phi$316 = (filter(function(v_3635){
      return not_2892(((contains_2939($import1$instance$Eq$1))(v_3635))((map(fst_2879))(e_3597.$1)))
    }))(((foldl((mergeSet_2927($import1$instance$Ord$3))($import1$instance$Eq$1)))(freeVars_3065(e_3597.$2)))((map(function(d_3636){
      return freeVars_3065(snd_2869(d_3636))
    }))(e_3597.$1)))
  } else if(e_3597.$tag==6){
    var $phi$316 = ((foldl((mergeSet_2927($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(freeVars_3065))(e_3597.$2))
  } else error("pattern match fail",e_3597);
  return $phi$316
};
var newTVarM_3026 = (($gt$gt$eq($import1$instance$Monad$11))(gets_2917))(function(ctx_3146){
  var n_3151 = ($concat("$"))(intToString(ctx_3146.$2));
  var $phi$317 = (($gt$gt_2945($import1$instance$Monad$11))(sets_2916((((ICtx_3017(ctx_3146.$0))(ctx_3146.$1))(ctx_3146.$2+1))(ctx_3146.$3))))((ret($import1$instance$Monad$11))((TVar_2983(emptyAnn_2995))(n_3151)));
  return $phi$317
});
var errorM_3033 = function(s_3181){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_2917))(function(ctx_3182){
    var $phi$318 = error(ctx_3182.$3(s_3181));
    return $phi$318
  })
};
var getBinding_3038 = function(n_3202){
  return function(env_3203){
    var $phi$319 = (((lookup_2887($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_3202))(env_3203.$0);
    return $phi$319
  }
};
var getBindingM_3039 = function(n_3207){
  return function(env_3208){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_2917))(function(ctx_3209){
      return ($_2878(ret($import1$instance$Monad$11)))(((fmap($import1$instance$Functor$4))(applySubs_3050(getSubs_3028(ctx_3209))))((getBinding_3038(n_3207))(env_3208)))
    })
  }
};
var getBindings_3040 = function(env_3210){
  var $phi$320 = env_3210.$0;
  return $phi$320
};
var freeTVars_3054 = function(t_3351){
  if(t_3351.$tag==1){
    var $phi$321 = (((setAdd_2896($import1$instance$Hashable$13))($import1$instance$Eq$1))(t_3351.$1))(emptySet_2890)
  } else if(t_3351.$tag==4){
    var $phi$321 = emptySet_2890
  } else if(t_3351.$tag==6){
    var $phi$321 = emptySet_2890
  } else if(t_3351.$tag==0){
    var $phi$321 = emptySet_2890
  } else if(t_3351.$tag==5){
    var $phi$321 = ((foldl(function(s_3360){
      return function(v_3361){
        return (((setRemove_2903($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3361))(s_3360)
      }
    }))(((foldl((setUnion_2902($import1$instance$Hashable$13))($import1$instance$Eq$1)))(freeTVars_3054(t_3351.$3)))((map(freeTVarsInBound_3055))(t_3351.$2))))(t_3351.$1)
  } else if(t_3351.$tag==2){
    var $phi$321 = (((setUnion_2902($import1$instance$Hashable$13))($import1$instance$Eq$1))(freeTVars_3054(t_3351.$1)))(freeTVars_3054(t_3351.$2))
  } else if(t_3351.$tag==3){
    var $phi$321 = ((foldl((setUnion_2902($import1$instance$Hashable$13))($import1$instance$Eq$1)))(($_2878(justOr_2943(emptySet_2890)))(((fmap($import1$instance$Functor$4))(freeTVars_3054))(t_3351.$2))))((map(function(m_3368){
      return (((setUnion_2902($import1$instance$Hashable$13))($import1$instance$Eq$1))(freeTVars_3054(fst_2879(m_3368))))(freeTVars_3054(snd_2869(m_3368)))
    }))(t_3351.$1))
  } else error("pattern match fail",t_3351);
  return $phi$321
};
var freeTVarsInBound_3055 = function(b_3369){
  var $phi$322 = freeTVars_3054(b_3369.$2);
  return $phi$322
};
var addBinding_3041 = function(n_3214){
  return function(t_3215){
    return function(env_3216){
      var u_3220 = (((setUnion_2902($import1$instance$Hashable$13))($import1$instance$Eq$1))(env_3216.$2))(freeTVars_3054(t_3215));
      var $phi$323 = ((IEnv_3018(((((insert_2895($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_3214))(t_3215))(env_3216.$0)))(env_3216.$1))(u_3220);
      return $phi$323
    }
  }
};
var addBindings_3042 = function(nbs_3221){
  return function(env_3222){
    var $phi$324 = ((IEnv_3018((((mergeTrie_2901($import1$instance$Hashable$13))($import1$instance$Eq$1))(env_3222.$0))(nbs_3221)))(env_3222.$1))(((foldTrie_2889(function(fvs_3226){
      return function(__3227){
        return function(t_3228){
          return (((setUnion_2902($import1$instance$Hashable$13))($import1$instance$Eq$1))(fvs_3226))(freeTVars_3054(t_3228))
        }
      }
    }))(env_3222.$2))(nbs_3221));
    return $phi$324
  }
};
var f1_3046 = function(a_3242){
  return function(b_3243){
    return ((TApp_2984(emptyAnn_2995))(((TApp_2984(emptyAnn_2995))((TConst_2982(emptyAnn_2995))("->")))(a_3242)))(b_3243)
  }
};
var emptySubs_3020 = (Subs_3016(Empty_2874))(Empty_2874);
var composeSubs_3021 = function(ef_3086){
  return function(sa_3087){
    return function(sb_3088){
      var $phi$325 = ((foldTrie_2889(function(r_3091){
        return function(v_3092){
          return function(t_3093){
            return (((addSub_3022(ef_3086))(v_3092))(t_3093))(r_3091)
          }
        }
      }))(((foldTrie_2889(function(r_3094){
        return function(v_3095){
          return function(t_3096){
            return (((addSatSub_3023(ef_3086))(v_3095))(t_3096))(r_3094)
          }
        }
      }))(sa_3087))(sb_3088.$0)))(sb_3088.$1);
      return $phi$325
    }
  }
};
var addSub_3022 = function(ef_3097){
  return function(v_3098){
    return function(t_3099){
      return function(subs_3100){
        var t2_3101 = (applySubs_3050(subs_3100))(t_3099);
        var $phi$327 = (getSub_3019(v_3098))(subs_3100);
        if($phi$327.$tag==1){
          var subUnsat_3104 = function(local$instance$Hashable$1){
            return function(local$instance$Eq$0){
              return function(su_3108){
                return function(uv_3109){
                  return function(ut_3110){
                    var ut2_3113 = ((substitute_3049(v_3098))(t2_3101))(ut_3110);
                    var $phi$331 = isEmpty_2909(freeTVars_3054(ut2_3113));
                    if($phi$331){
                      var $phi$330 = (Pair_2865(((((insert_2895(local$instance$Hashable$1))(local$instance$Eq$0))(uv_3109))(ut2_3113))(su_3108.$0)))(su_3108.$1)
                    } else if(!$phi$331){
                      var $phi$330 = (Pair_2865(su_3108.$0))(((((insert_2895(local$instance$Hashable$1))(local$instance$Eq$0))(uv_3109))(ut2_3113))(su_3108.$1))
                    } else error("pattern match fail",$phi$331);
                    var $phi$329 = $phi$330;
                    return $phi$329
                  }
                }
              }
            }
          };
          var su_3105 = ((foldTrie_2889((subUnsat_3104($import1$instance$Hashable$13))($import1$instance$Eq$1)))((Pair_2865(subs_3100.$0))(Empty_2874)))(subs_3100.$1);
          var unsat2_3107 = snd_2869(su_3105);
          var sat2_3106 = fst_2879(su_3105);
          var $phi$333 = isEmpty_2909(freeTVars_3054(t2_3101));
          if($phi$333){
            var $phi$332 = (Subs_3016(((((insert_2895($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3098))(t2_3101))(sat2_3106)))(unsat2_3107)
          } else if(!$phi$333){
            var $phi$332 = (Subs_3016(sat2_3106))(((((insert_2895($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3098))(t2_3101))(unsat2_3107))
          } else error("pattern match fail",$phi$333);
          var $phi$328 = $phi$332;
          var $phi$326 = $phi$328
        } else if($phi$327.$tag==0){
          var $phi$326 = ((composeSubs_3021(ef_3097))(subs_3100))(((unify_3053(ef_3097))($phi$327.$0))(t2_3101))
        } else error("pattern match fail",$phi$327);
        return $phi$326
      }
    }
  }
};
var addSatSub_3023 = function(ef_3115){
  return function(v_3116){
    return function(t_3117){
      return function(subs_3118){
        var $phi$335 = (getSub_3019(v_3116))(subs_3118);
        if($phi$335.$tag==1){
          var subUnsat_3121 = function(local$instance$Hashable$1){
            return function(local$instance$Eq$0){
              return function(su_3125){
                return function(uv_3126){
                  return function(ut_3127){
                    var ut2_3130 = ((substitute_3049(v_3116))(t_3117))(ut_3127);
                    var $phi$339 = isEmpty_2909(freeTVars_3054(ut2_3130));
                    if($phi$339){
                      var $phi$338 = (Pair_2865(((((insert_2895(local$instance$Hashable$1))(local$instance$Eq$0))(uv_3126))(ut2_3130))(su_3125.$0)))(su_3125.$1)
                    } else if(!$phi$339){
                      var $phi$338 = (Pair_2865(su_3125.$0))(((((insert_2895(local$instance$Hashable$1))(local$instance$Eq$0))(uv_3126))(ut2_3130))(su_3125.$1))
                    } else error("pattern match fail",$phi$339);
                    var $phi$337 = $phi$338;
                    return $phi$337
                  }
                }
              }
            }
          };
          var su_3122 = ((foldTrie_2889((subUnsat_3121($import1$instance$Hashable$13))($import1$instance$Eq$1)))((Pair_2865(subs_3118.$0))(Empty_2874)))(subs_3118.$1);
          var unsat2_3124 = snd_2869(su_3122);
          var sat2_3123 = fst_2879(su_3122);
          var $phi$336 = (Subs_3016(((((insert_2895($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3116))(t_3117))(sat2_3123)))(unsat2_3124);
          var $phi$334 = $phi$336
        } else if($phi$335.$tag==0){
          var $phi$334 = ((composeSubs_3021(ef_3115))(subs_3118))(((unify_3053(ef_3115))($phi$335.$0))(t_3117))
        } else error("pattern match fail",$phi$335);
        return $phi$334
      }
    }
  }
};
var substitute_3049 = function(n_3273){
  return function(s_3274){
    return function(t_3275){
      return (applySubs_3050((((addSub_3022(function(s_3276){
        return ($concat("substitute: "))(s_3276)
      }))(n_3273))(s_3274))(emptySubs_3020)))(t_3275)
    }
  }
};
var unify_3053 = function(ef_3308){
  return function(a_3309){
    return function(b_3310){
      var err_3312 = function(a_3318){
        return function(b_3319){
          return error(ef_3308(($concat(($concat(($concat("cannot unify "))(printType_3012(a_3318))))(" with ")))(printType_3012(b_3319))))
        }
      };
      var bind_3311 = function(n_3313){
        return function(t_3314){
          if(t_3314.$tag==1){
            var $phi$344 = (($eq$eq($import1$instance$Eq$1))(n_3313))(t_3314.$1);
            if($phi$344){
              var $phi$343 = emptySubs_3020
            } else if(!$phi$344){
              var $phi$343 = (((addSub_3022(ef_3308))(n_3313))(t_3314))(emptySubs_3020)
            } else error("pattern match fail",$phi$344);
            var $phi$340 = $phi$343
          } else {
            var $phi$342 = (((setContains_2888($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_3313))(freeTVars_3054(t_3314));
            if($phi$342){
              var $phi$341 = error(ef_3308("occurs check failed"))
            } else if(!$phi$342){
              var $phi$341 = (((addSub_3022(ef_3308))(n_3313))(t_3314))(emptySubs_3020)
            } else error("pattern match fail",$phi$342);
            var $phi$340 = $phi$341
          };
          return $phi$340
        }
      };
      if(a_3309.$tag==1){
        var $phi$345 = (bind_3311(a_3309.$1))(b_3310)
      } else if(a_3309.$tag==0){
        if(b_3310.$tag==0){
          var $phi$350 = (($eq$eq($import1$instance$Eq$1))(a_3309.$1))(b_3310.$1);
          if($phi$350){
            var $phi$349 = emptySubs_3020
          } else if(!$phi$350){
            var $phi$349 = (err_3312(a_3309))(b_3310)
          } else error("pattern match fail",$phi$350);
          var $phi$348 = $phi$349
        } else if(b_3310.$tag==1){
          var $phi$348 = (bind_3311(b_3310.$1))(a_3309)
        } else var $phi$348 = (err_3312(a_3309))(b_3310);
        var $phi$345 = $phi$348
      } else if(a_3309.$tag==6){
        var $phi$345 = (err_3312(a_3309))(b_3310)
      } else if(a_3309.$tag==4){
        var $phi$345 = (err_3312(a_3309))(b_3310)
      } else if(a_3309.$tag==2){
        if(b_3310.$tag==1){
          var $phi$347 = (bind_3311(b_3310.$1))(a_3309)
        } else if(b_3310.$tag==2){
          var fsubs_3337 = ((unify_3053(ef_3308))(a_3309.$1))(b_3310.$1);
          var xsubs_3338 = ((unify_3053(ef_3308))((applySubs_3050(fsubs_3337))(a_3309.$2)))((applySubs_3050(fsubs_3337))(b_3310.$2));
          var $phi$347 = ((composeSubs_3021(ef_3308))(fsubs_3337))(xsubs_3338)
        } else var $phi$347 = (err_3312(a_3309))(b_3310);
        var $phi$345 = $phi$347
      } else if((a_3309.$tag==3)&&(a_3309.$2.$tag==1)){
        var $phi$345 = (err_3312(a_3309))(b_3310)
      } else if(a_3309.$tag==3){
        if(b_3310.$tag==1){
          var $phi$346 = (bind_3311(b_3310.$1))(a_3309)
        } else if((b_3310.$tag==3)&&(b_3310.$2.$tag==1)){
          var $phi$346 = (err_3312(a_3309))(b_3310)
        } else var $phi$346 = (err_3312(a_3309))(b_3310);
        var $phi$345 = $phi$346
      } else var $phi$345 = (err_3312(a_3309))(b_3310);
      return $phi$345
    }
  }
};
var newTVar_3025 = function(ctx_3140){
  var n_3145 = ($concat("$"))(intToString(ctx_3140.$2));
  var $phi$351 = (Pair_2865((((ICtx_3017(ctx_3140.$0))(ctx_3140.$1))(ctx_3140.$2+1))(ctx_3140.$3)))((TVar_2983(emptyAnn_2995))(n_3145));
  return $phi$351
};
var addBound_3030 = function(b_3164){
  return function(ctx_3165){
    var $phi$352 = (((ICtx_3017(ctx_3165.$0))((push(b_3164))(ctx_3165.$1)))(ctx_3165.$2))(ctx_3165.$3);
    return $phi$352
  }
};
var instantiate_3048 = function(t_3251){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_2917))(function(ctx_3252){
    var mkvar_3253 = function(cs_3254){
      return function(v_3255){
        var $phi$355 = newTVar_3025(cs_3254.$0);
        var $phi$354 = (Pair_2865($phi$355.$0))((((addSub_3022(function(s_3260){
          return ($concat("instantiate: "))(s_3260)
        }))(v_3255))($phi$355.$1))(cs_3254.$1));
        var $phi$353 = $phi$354;
        return $phi$353
      }
    };
    if(t_3251.$tag==5){
      var $phi$358 = ((foldl(mkvar_3253))((Pair_2865(ctx_3252))(emptySubs_3020)))(t_3251.$1);
      var bs2_3268 = (map(applySubsBound_3051($phi$358.$1)))(t_3251.$2);
      var ctx3_3269 = ((foldl(function(ctx_3270){
        return function(b_3271){
          return (addBound_3030(b_3271))(ctx_3270)
        }
      }))($phi$358.$0))(bs2_3268);
      var t2_3267 = (applySubs_3050($phi$358.$1))(t_3251.$3);
      var $phi$357 = (($gt$gt_2945($import1$instance$Monad$11))(sets_2916(ctx3_3269)))((ret($import1$instance$Monad$11))(t2_3267));
      var $phi$356 = $phi$357
    } else var $phi$356 = (ret($import1$instance$Monad$11))(t_3251);
    return $phi$356
  })
};
var setSubs_3029 = function(subs_3158){
  return function(ctx_3159){
    var $phi$359 = (((ICtx_3017(subs_3158))((map(applySubsBound_3051(subs_3158)))(ctx_3159.$1)))(ctx_3159.$2))(ctx_3159.$3);
    return $phi$359
  }
};
var getErrorF_3036 = (($gt$gt$eq($import1$instance$Monad$11))(gets_2917))(function(ctx_3197){
  var $phi$360 = (ret($import1$instance$Monad$11))(ctx_3197.$3);
  return $phi$360
});
var unifyM_3052 = function(a_3302){
  return function(b_3303){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_2917))(function(ctx_3304){
      return (($gt$gt$eq($import1$instance$Monad$11))(getErrorF_3036))(function(ef_3305){
        var ef2_3306 = function(s_3307){
          return ef_3305(($concat(($concat(($concat(($concat(($concat("unifying "))(printType_3012(a_3302))))(" and ")))(printType_3012(b_3303))))(": ")))(s_3307))
        };
        return sets_2916((setSubs_3029(((composeSubs_3021(ef2_3306))(getSubs_3028(ctx_3304)))(((unify_3053(ef2_3306))(a_3302))(b_3303))))(ctx_3304))
      })
    })
  }
};
var onError_3034 = function(e_3187){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_2917))(function(ctx_3188){
    var $phi$361 = sets_2916((((ICtx_3017(ctx_3188.$0))(ctx_3188.$1))(ctx_3188.$2))(e_3187));
    return $phi$361
  })
};
var withError_3035 = function(e_3193){
  return function(f_3194){
    return (($gt$gt$eq($import1$instance$Monad$11))(getErrorF_3036))(function(old_3195){
      return (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_2945($import1$instance$Monad$11))(onError_3034(e_3193)))(f_3194)))(function(r_3196){
        return (($gt$gt_2945($import1$instance$Monad$11))(onError_3034(old_3195)))((ret($import1$instance$Monad$11))(r_3196))
      })
    })
  }
};
var withLocError_3056 = function(e_3373){
  return function(f_3374){
    var $phi$363 = getAnnCodeLoc_2993(annOf_2971(e_3373));
    if($phi$363.$tag==1){
      var $phi$362 = f_3374
    } else if($phi$363.$tag==0){
      var $phi$362 = (withError_3035(function(s_3376){
        return ($concat(($concat(s_3376))(" ")))(printCodeLoc_2991($phi$363.$0))
      }))(f_3374)
    } else error("pattern match fail",$phi$363);
    return $phi$362
  }
};
var unrollDataConType_3062 = function(t_3578){
  if((t_3578.$tag==2)&&((t_3578.$1.$tag==2)&&((t_3578.$1.$1.$tag==0)&&("->"==t_3578.$1.$1.$1)))){
    var $phi$366 = unrollDataConType_3062(t_3578.$2);
    var $phi$365 = (Pair_2865((enqueue(t_3578.$1.$2))($phi$366.$0)))($phi$366.$1);
    var $phi$364 = $phi$365
  } else var $phi$364 = (Pair_2865([]))(t_3578);
  return $phi$364
};
var freeTVarsInEnv_3043 = function(env_3229){
  var $phi$367 = env_3229.$2;
  return $phi$367
};
var generalize_3061 = function(env_3546){
  return function(t_3547){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_2917))(function(ctx_3548){
      var subs_3549 = getSubs_3028(ctx_3548);
      var envTVars_3550 = freeTVarsInEnv_3043(env_3546);
      var $phi$368 = ((foldTrie_2889(function(s_3557){
        return function(v_3558){
          return function(__3559){
            return (((setUnion_2902($import1$instance$Hashable$13))($import1$instance$Eq$1))(s_3557))((justOr_2943(Empty_2874))(((fmap($import1$instance$Functor$4))(freeTVars_3054))((((lookup_2887($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3558))(subs_3549.$1))))
          }
        }
      }))(envTVars_3550))(envTVars_3550);
      var nonFree_3551 = $phi$368;
      var vs_3552 = (((setDiff_2899($import1$instance$Hashable$13))($import1$instance$Eq$1))(freeTVars_3054(t_3547)))(nonFree_3551);
      var processBounds_3554 = function(vbb_3560){
        return function(b_3561){
          var boundVars_3565 = freeTVarsInBound_3055(b_3561);
          var sharedVars_3566 = (((setIntersection_2897($import1$instance$Hashable$13))($import1$instance$Eq$1))(boundVars_3565))(vs_3552);
          var $phi$371 = isEmpty_2909(sharedVars_3566);
          if($phi$371){
            var $phi$370 = (Pair_2865(vbb_3560.$0))((Pair_2865(vbb_3560.$1.$0))((push(b_3561))(vbb_3560.$1.$1)))
          } else if(!$phi$371){
            var $phi$373 = (($eq$eq($import1$instance$Eq$0))(size_2906(sharedVars_3566)))(size_2906(boundVars_3565));
            if($phi$373){
              var $phi$372 = (Pair_2865(vbb_3560.$0))((Pair_2865((push(b_3561))(vbb_3560.$1.$0)))(vbb_3560.$1.$1))
            } else if(!$phi$373){
              var $phi$372 = (Pair_2865((((setUnion_2902($import1$instance$Hashable$13))($import1$instance$Eq$1))(vbb_3560.$0))(sharedVars_3566)))((Pair_2865(vbb_3560.$1.$0))((push(b_3561))(vbb_3560.$1.$1)))
            } else error("pattern match fail",$phi$373);
            var $phi$370 = $phi$372
          } else error("pattern match fail",$phi$371);
          var $phi$369 = $phi$370;
          return $phi$369
        }
      };
      var vbb_3553 = ((foldl(processBounds_3554))((Pair_2865(emptySet_2890))((Pair_2865([]))([]))))(getBounds_3031(ctx_3548));
      var finalVars_3570 = (((setDiff_2899($import1$instance$Hashable$13))($import1$instance$Eq$1))(vs_3552))(vbb_3553.$0);
      var drop_3571 = function(local$instance$Hashable$1){
        return function(local$instance$Eq$0){
          return function(r_3573){
            return function(v_3574){
              return function(t_3575){
                var $phi$376 = ($_2878(isEmpty_2909))((((setIntersection_2897($import1$instance$Hashable$13))($import1$instance$Eq$1))(finalVars_3570))(freeTVars_3054(t_3575)));
                if($phi$376){
                  var $phi$375 = ((((insert_2895(local$instance$Hashable$1))(local$instance$Eq$0))(v_3574))(t_3575))(r_3573)
                } else if(!$phi$376){
                  var $phi$375 = r_3573
                } else error("pattern match fail",$phi$376);
                return $phi$375
              }
            }
          }
        }
      };
      var $phi$377 = (Subs_3016(subs_3549.$0))(((foldTrie_2889((drop_3571($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_2874))(subs_3549.$1));
      var subs2_3572 = $phi$377;
      var $phi$379 = ($or(($_2878(not_2892))(isEmpty_2909(finalVars_3570))))((($gt_2948($import1$instance$Ord$2))(length(vbb_3553.$1.$0)))(0));
      if($phi$379){
        var $phi$378 = (ret($import1$instance$Monad$11))((((mkTForall_3047(emptyAnn_2995))(setToArray_2900(finalVars_3570)))(vbb_3553.$1.$0))(t_3547))
      } else if(!$phi$379){
        var $phi$378 = (ret($import1$instance$Monad$11))(t_3547)
      } else error("pattern match fail",$phi$379);
      var $phi$374 = (($gt$gt_2945($import1$instance$Monad$11))(sets_2916((setBounds_3032(vbb_3553.$1.$1))((setSubs_3029(subs2_3572))(ctx_3548)))))($phi$378);
      return $phi$374
    })
  }
};
var infer_3057 = function(env_3377){
  return function(e_3378){
    var inferPat_3381 = function(env_3399){
      return function(te_3400){
        return function(pat_3401){
          if(pat_3401.$tag==0){
            var $phi$380 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_3026))(function(tv_3404){
              return (($gt$gt_2945($import1$instance$Monad$11))((unifyM_3052(te_3400))(tv_3404)))((ret($import1$instance$Monad$11))((Pair_2865(((((insert_2895($import1$instance$Hashable$13))($import1$instance$Eq$1))(pat_3401.$1))(tv_3404))(Empty_2874)))((PVar_3005((setAnnType_2975(tv_3404))(pat_3401.$0)))(pat_3401.$1))))
            })
          } else if((pat_3401.$tag==1)&&(pat_3401.$1.$tag==0)){
            var $phi$380 = (($gt$gt_2945($import1$instance$Monad$11))((unifyM_3052(te_3400))((TConst_2982(emptyAnn_2995))("Number"))))((ret($import1$instance$Monad$11))((Pair_2865(Empty_2874))(pat_3401)))
          } else if((pat_3401.$tag==1)&&(pat_3401.$1.$tag==1)){
            var $phi$380 = (($gt$gt_2945($import1$instance$Monad$11))((unifyM_3052(te_3400))((TConst_2982(emptyAnn_2995))("String"))))((ret($import1$instance$Monad$11))((Pair_2865(Empty_2874))(pat_3401)))
          } else if(pat_3401.$tag==2){
            var $phi$380 = (($gt$gt$eq($import1$instance$Monad$11))((getBindingM_3039(pat_3401.$1))(env_3399)))(function(bt_3412){
              if(bt_3412.$tag==1){
                var $phi$381 = error(($concat("unknown data type "))(pat_3401.$1))
              } else if(bt_3412.$tag==0){
                var $phi$381 = (($gt$gt$eq($import1$instance$Monad$11))(instantiate_3048(bt_3412.$0)))(function(t_3414){
                  var $phi$383 = unrollDataConType_3062(t_3414);
                  var $phi$385 = (($eq$eq($import1$instance$Eq$0))(length(pat_3401.$2)))(length($phi$383.$0));
                  if(!$phi$385){
                    var $phi$384 = errorM_3033("number of pattern params does not match the number of constructor params")
                  } else if($phi$385){
                    var $phi$384 = (($gt$gt$eq($import1$instance$Monad$11))((((foldM_2918($import1$instance$Monad$11))(inferSubPat_3382(env_3399)))((Pair_2865(Empty_2874))([])))((zip_2932(pat_3401.$2))($phi$383.$0))))(function(bps_3417){
                      var $phi$386 = (($gt$gt_2945($import1$instance$Monad$11))((unifyM_3052(te_3400))($phi$383.$1)))(($_2878(ret($import1$instance$Monad$11)))((Pair_2865(bps_3417.$0))(((PData_3003(pat_3401.$0))(pat_3401.$1))(bps_3417.$1))));
                      return $phi$386
                    })
                  } else error("pattern match fail",$phi$385);
                  var $phi$382 = $phi$384;
                  return $phi$382
                })
              } else error("pattern match fail",bt_3412);
              return $phi$381
            })
          } else error("pattern match fail",pat_3401);
          return $phi$380
        }
      }
    };
    var inferSubPat_3382 = function(env_3420){
      return function(bp_3421){
        return function(pt_3422){
          var $phi$388 = (($gt$gt$eq($import1$instance$Monad$11))(((inferPat_3381(env_3420))(pt_3422.$1))(pt_3422.$0)))(function(bp_3427){
            var $phi$389 = ($_2878(ret($import1$instance$Monad$11)))((Pair_2865((((mergeTrie_2901($import1$instance$Hashable$13))($import1$instance$Eq$1))(bp_3421.$0))(bp_3427.$0)))((push(bp_3427.$1))(bp_3421.$1)));
            return $phi$389
          });
          var $phi$387 = $phi$388;
          return $phi$387
        }
      }
    };
    var inferCase_3380 = function(env_3390){
      return function(te_3391){
        return function(p_3392){
          var $phi$390 = (($gt$gt$eq($import1$instance$Monad$11))(((inferPat_3381(env_3390))(te_3391))(p_3392.$0)))(function(cb_3395){
            var $phi$391 = (($gt$gt$eq($import1$instance$Monad$11))((infer_3057((addBindings_3042(cb_3395.$0))(env_3390)))(p_3392.$1)))(function(e_3398){
              return (ret($import1$instance$Monad$11))((Pair_2865(cb_3395.$1))(e_3398))
            });
            return $phi$391
          });
          return $phi$390
        }
      }
    };
    var setFinalType_3379 = function(t_3383){
      return function(e_3384){
        var $phi$393 = getType_2972(e_3384);
        if($phi$393.$tag==6){
          var $phi$392 = (ret($import1$instance$Monad$11))((setType_2976(t_3383))(e_3384))
        } else if($phi$393.$tag==5){
          var $phi$392 = (ret($import1$instance$Monad$11))(e_3384)
        } else var $phi$392 = (($gt$gt_2945($import1$instance$Monad$11))((unifyM_3052(t_3383))($phi$393)))((ret($import1$instance$Monad$11))(e_3384));
        return $phi$392
      }
    };
    if((e_3378.$tag==1)&&(e_3378.$1.$tag==0)){
      var $phi$394 = (setFinalType_3379((TConst_2982(emptyAnn_2995))("Number")))(e_3378)
    } else if((e_3378.$tag==1)&&(e_3378.$1.$tag==1)){
      var $phi$394 = (setFinalType_3379((TConst_2982(emptyAnn_2995))("String")))(e_3378)
    } else if(e_3378.$tag==0){
      var $phi$394 = (($gt$gt$eq($import1$instance$Monad$11))((getBindingM_3039(e_3378.$1))(env_3377)))(function(vt_3436){
        if(vt_3436.$tag==1){
          var $phi$402 = errorM_3033(($concat(($concat(($concat("unknown identifier "))(e_3378.$1)))(", env: ")))(jsonStringify(($_2878(trieKeys_2905))(getBindings_3040(env_3377)))))
        } else if(vt_3436.$tag==0){
          var $phi$402 = (($gt$gt$eq($import1$instance$Monad$11))(instantiate_3048(vt_3436.$0)))(function(t_3438){
            return (setFinalType_3379(t_3438))(e_3378)
          })
        } else error("pattern match fail",vt_3436);
        return $phi$402
      })
    } else if(e_3378.$tag==3){
      var $phi$394 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_3026))(function(tv_3442){
        return (($gt$gt$eq($import1$instance$Monad$11))((infer_3057(((addBinding_3041(e_3378.$1))(tv_3442))(env_3377)))(e_3378.$2)))(function(a_3443){
          return (setFinalType_3379(((TApp_2984(emptyAnn_2995))(((TApp_2984(emptyAnn_2995))((TConst_2982(emptyAnn_2995))("->")))(tv_3442)))(getType_2972(a_3443))))(((Lam_2951(e_3378.$0))(e_3378.$1))(a_3443))
        })
      })
    } else if(e_3378.$tag==2){
      var $phi$394 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_3026))(function(tv_3447){
        return (($gt$gt$eq($import1$instance$Monad$11))((infer_3057(env_3377))(e_3378.$1)))(function(f_3448){
          return (($gt$gt$eq($import1$instance$Monad$11))((infer_3057(env_3377))(e_3378.$2)))(function(a_3449){
            var synth_3450 = (f1_3046(getType_2972(a_3449)))(tv_3447);
            return (($gt$gt_2945($import1$instance$Monad$11))((unifyM_3052(getType_2972(f_3448)))(synth_3450)))((setFinalType_3379(tv_3447))(((App_2950(e_3378.$0))(f_3448))(a_3449)))
          })
        })
      })
    } else if(e_3378.$tag==4){
      var $phi$394 = (($gt$gt$eq($import1$instance$Monad$11))((infer_3057(env_3377))(e_3378.$1)))(function(e_3454){
        return (($gt$gt$eq($import1$instance$Monad$11))(((mapM_2919($import1$instance$Monad$11))((inferCase_3380(env_3377))(getType_2972(e_3454))))(e_3378.$2)))(function(ps_3455){
          var t_3456 = getType_2972(snd_2869(head_2925(ps_3455)));
          return (($gt$gt_2945($import1$instance$Monad$11))(((mapM_2919($import1$instance$Monad$11))(function(p_3457){
            return (unifyM_3052(t_3456))(($_2878(getType_2972))(snd_2869(p_3457)))
          }))(tail_2924(ps_3455))))((setFinalType_3379(t_3456))(((Case_2952(e_3378.$0))(e_3454))(ps_3455)))
        })
      })
    } else if(e_3378.$tag==5){
      var $phi$394 = (($gt$gt$eq($import1$instance$Monad$11))((inferDefs_3060(env_3377))(e_3378.$1)))(function(ds_3461){
        var env2_3462 = ((foldl(function(env_3463){
          return function(d_3464){
            var $phi$401 = ((addBinding_3041(d_3464.$0))(getType_2972(d_3464.$1)))(env_3463);
            return $phi$401
          }
        }))(env_3377))(ds_3461);
        return (($gt$gt$eq($import1$instance$Monad$11))((infer_3057(env2_3462))(e_3378.$2)))(function(e_3467){
          return (setFinalType_3379(getType_2972(e_3467)))(((Let_2953(e_3378.$0))(ds_3461))(e_3467))
        })
      })
    } else if((e_3378.$tag==6)&&("Array"==e_3378.$1)){
      var $phi$394 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_2919($import1$instance$Monad$11))(infer_3057(env_3377)))(e_3378.$2)))(function(es_3470){
        return (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_3026))(function(tv_3471){
          return (($gt$gt_2945($import1$instance$Monad$11))(((mapM_2919($import1$instance$Monad$11))(function(e_3472){
            return (unifyM_3052(tv_3471))(getType_2972(e_3472))
          }))(es_3470)))((setFinalType_3379(((TApp_2984(emptyAnn_2995))((TConst_2982(emptyAnn_2995))("Array")))(tv_3471)))(((New_2954(e_3378.$0))("Array"))(es_3470)))
        })
      })
    } else if(e_3378.$tag==6){
      var $phi$394 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_2919($import1$instance$Monad$11))(infer_3057(env_3377)))(e_3378.$2)))(function(es_3476){
        return (($gt$gt$eq($import1$instance$Monad$11))((getBindingM_3039(e_3378.$1))(env_3377)))(function(t_3477){
          if(t_3477.$tag==1){
            var $phi$395 = error(($concat("unknown data constructor "))(e_3378.$1))
          } else if(t_3477.$tag==0){
            var $phi$395 = (($gt$gt$eq($import1$instance$Monad$11))(instantiate_3048(t_3477.$0)))(function(t_3479){
              var $phi$397 = unrollDataConType_3062(t_3479);
              var $phi$399 = (($eq$eq($import1$instance$Eq$0))(length(es_3476)))(length($phi$397.$0));
              if(!$phi$399){
                var $phi$398 = errorM_3033(($concat(($concat(($concat("number of New args does not match the number of constructor params "))(jsonStringify(es_3476))))(" ")))(printType_3012(t_3479)))
              } else if($phi$399){
                var $phi$398 = (($gt$gt_2945($import1$instance$Monad$11))(((mapM_2919($import1$instance$Monad$11))(function(p_3482){
                  var $phi$400 = (unifyM_3052(p_3482.$0))(getType_2972(p_3482.$1));
                  return $phi$400
                }))((zip_2932($phi$397.$0))(es_3476))))((setFinalType_3379($phi$397.$1))(((New_2954(e_3378.$0))(e_3378.$1))(es_3476)))
              } else error("pattern match fail",$phi$399);
              var $phi$396 = $phi$398;
              return $phi$396
            })
          } else error("pattern match fail",t_3477);
          return $phi$395
        })
      })
    } else var $phi$394 = error("type inference not supported for this AST node");
    return ($_2878(withLocError_3056(e_3378)))($phi$394)
  }
};
var inferSccDefs_3058 = function(env_3486){
  return function(ds_3487){
    var generalizeDef_3491 = function(env_3510){
      return function(d_3511){
        var $phi$405 = getType_2972(d_3511.$1);
        if($phi$405.$tag==5){
          var $phi$404 = (ret($import1$instance$Monad$11))(d_3511)
        } else var $phi$404 = (($gt$gt$eq($import1$instance$Monad$11))((generalize_3061(env_3510))($phi$405)))(function(t_3519){
          return (ret($import1$instance$Monad$11))((Pair_2865(d_3511.$0))((setType_2976(t_3519))(d_3511.$1)))
        });
        var $phi$403 = $phi$404;
        return $phi$403
      }
    };
    var unifyDef_3490 = function(env_3501){
      return function(d_3502){
        var $phi$408 = getType_2972(d_3502.$1);
        if($phi$408.$tag==5){
          var $phi$407 = (ret($import1$instance$Monad$11))(Unit_2891)
        } else var $phi$407 = (unifyM_3052($phi$408))(($_2878(fromJust_2942))((getBinding_3038(d_3502.$0))(env_3501)));
        var $phi$406 = $phi$407;
        return $phi$406
      }
    };
    var inferDef_3489 = function(env_3496){
      return function(d_3497){
        var $phi$409 = (($gt$gt$eq($import1$instance$Monad$11))((infer_3057(env_3496))(d_3497.$1)))(function(e_3500){
          return (ret($import1$instance$Monad$11))((Pair_2865(d_3497.$0))(e_3500))
        });
        return $phi$409
      }
    };
    var generateTVar_3488 = function(env_3492){
      return function(d_3493){
        var $phi$411 = getType_2972(snd_2869(d_3493));
        if($phi$411.$tag==6){
          var $phi$410 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_3026))(function(tv_3494){
            return (ret($import1$instance$Monad$11))(((addBinding_3041(fst_2879(d_3493)))(tv_3494))(env_3492))
          })
        } else var $phi$410 = (ret($import1$instance$Monad$11))(((addBinding_3041(fst_2879(d_3493)))($phi$411))(env_3492));
        return $phi$410
      }
    };
    return (($gt$gt$eq($import1$instance$Monad$11))((((foldM_2918($import1$instance$Monad$11))(generateTVar_3488))(env_3486))(ds_3487)))(function(env2_3520){
      return (($gt$gt$eq($import1$instance$Monad$11))(((mapM_2919($import1$instance$Monad$11))(inferDef_3489(env2_3520)))(ds_3487)))(function(ds2_3521){
        return (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_2945($import1$instance$Monad$11))(((mapM_2919($import1$instance$Monad$11))(unifyDef_3490(env2_3520)))(ds2_3521)))(((mapM_2919($import1$instance$Monad$11))(applySubsDef_3063))(ds2_3521))))(function(ds3_3522){
          return (($gt$gt_2945($import1$instance$Monad$11))(dropSatisfiedBounds_3059(env_3486)))(((mapM_2919($import1$instance$Monad$11))(generalizeDef_3491(env_3486)))(ds3_3522))
        })
      })
    })
  }
};
var inferDefs_3060 = function(env_3530){
  return function(ds_3531){
    var infer_3535 = function(rs_3541){
      return function(cc_3542){
        return ((fmap($import1$instance$Functor$9))(concat(rs_3541)))((inferSccDefs_3058(((foldl(function(env_3543){
          return function(r_3544){
            return ((addBinding_3041(fst_2879(r_3544)))(getType_2972(snd_2869(r_3544))))(env_3543)
          }
        }))(env_3530))(rs_3541)))((filter(function(d_3545){
          return ((contains_2939($import1$instance$Eq$1))(fst_2879(d_3545)))(cc_3542)
        }))(ds_3531)))
      }
    };
    var ns_3532 = (map(fst_2879))(ds_3531);
    var g_3533 = ((foldl(function(g_3536){
      return function(d_3537){
        var $phi$412 = ((set(d_3537.$0))((filter(function(v_3540){
          return ($and(((contains_2939($import1$instance$Eq$1))(v_3540))(ns_3532)))((($div$eq_2893($import1$instance$Eq$1))(v_3540))(d_3537.$0))
        }))(freeVars_3065(d_3537.$1))))(g_3536);
        return $phi$412
      }
    }))(empty))(ds_3531);
    var ccs_3534 = sccSorted_3015(g_3533);
    return (((foldM_2918($import1$instance$Monad$11))(infer_3535))([]))(ccs_3534)
  }
};
var newCtx_3027 = (((ICtx_3017(emptySubs_3020))([]))(1))(function(s_3152){
  return ($concat("unknown error context: "))(s_3152)
});
var inferInstance_3066 = function(env_3640){
  return function(cs_3641){
    return function(i_3642){
      var inferE_3643 = function(e_3644){
        var $phi$414 = ($_2878(runState_2914(newCtx_3027)))((infer_3057(env_3640))(e_3644));
        var $phi$413 = (applySubsE_3064(getSubs_3028($phi$414.$0)))($phi$414.$1);
        return $phi$413
      };
      var $phi$418 = (find_2883(function(c_3651){
        var $phi$417 = (($eq$eq($import1$instance$Eq$1))(i_3642.$1))(c_3651.$1);
        return $phi$417
      }))(cs_3641);
      if($phi$418.$tag==1){
        var $phi$416 = error(($concat("Cannot find clas "))(i_3642.$1))
      } else if($phi$418.$tag==0){
        var bs2_3660 = ((foldl(function(bs_3662){
          return function(b_3663){
            var $phi$419 = ((((insert_2895($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3663.$0))(((substitute_3049($phi$418.$0.$2))(i_3642.$2))(b_3663.$1)))(bs_3662);
            return $phi$419
          }
        }))(Empty_2874))($phi$418.$0.$3);
        var ds2_3661 = (map(function(d_3666){
          var $phi$420 = (Pair_2865(d_3666.$0))(inferE_3643((setType_2976(($_2878(fromJust_2942))((((lookup_2887($import1$instance$Hashable$13))($import1$instance$Eq$1))(d_3666.$0))(bs2_3660))))(d_3666.$1)));
          return $phi$420
        }))(i_3642.$3);
        var $phi$416 = (((Instance_2999(i_3642.$0))(i_3642.$1))(i_3642.$2))(ds2_3661)
      } else error("pattern match fail",$phi$418);
      var $phi$415 = $phi$416;
      return $phi$415
    }
  }
};
var emptyEnv_3037 = ((IEnv_3018(Empty_2874))([]))(emptySet_2890);
var classToBindings_3068 = function(c_3674){
  var process_3679 = function(b_3680){
    var ftv_3683 = freeTVars_3054(b_3680.$1);
    var $phi$424 = (((setContains_2888($import1$instance$Hashable$13))($import1$instance$Eq$1))(c_3674.$2))(ftv_3683);
    if(!$phi$424){
      var $phi$423 = error(($concat(($concat(($concat("invalid clas definition "))(c_3674.$1)))(", binding ")))(b_3680.$0))
    } else if($phi$424){
      var $phi$423 = (Pair_2865(b_3680.$0))((((mkTForall_3047(emptyAnn_2995))(setToArray_2900(ftv_3683)))([((TCBound_2981(emptyAnn_2995))(c_3674.$1))((TVar_2983(emptyAnn_2995))(c_3674.$2))]))(b_3680.$1))
    } else error("pattern match fail",$phi$424);
    var $phi$422 = $phi$423;
    return $phi$422
  };
  var $phi$421 = (map(process_3679))(c_3674.$3);
  return $phi$421
};
var addInstance_3044 = function(b_3233){
  return function(env_3234){
    var $phi$425 = ((IEnv_3018(env_3234.$0))((push(b_3233))(env_3234.$1)))(env_3234.$2);
    return $phi$425
  }
};
var inferTypeModule_3069 = function(ms_3684){
  return function(m_3685){
    var checkForUnsatisfiedBounds_3690 = function(d_3718){
      var $phi$427 = getType_2972(snd_2869(d_3718));
      if($phi$427.$tag==5){
        if(($phi$427.$3.$tag==2)&&(($phi$427.$3.$1.$tag==2)&&(($phi$427.$3.$1.$1.$tag==0)&&("->"==$phi$427.$3.$1.$1.$1)))){
          var $phi$428 = d_3718
        } else {
          var $phi$430 = length($phi$427.$2);
          if(0==$phi$430){
            var $phi$429 = d_3718
          } else var $phi$429 = error(($concat(($concat(($concat("unsatisfied bounds in def of "))(fst_2879(d_3718))))(" :: ")))(printType_3012(getType_2972(snd_2869(d_3718)))));
          var $phi$428 = $phi$429
        };
        var $phi$426 = $phi$428
      } else var $phi$426 = d_3718;
      return $phi$426
    };
    var addIns_3689 = function(env_3716){
      return function(i_3717){
        return (addInstance_3044(instanceToTypeBound_3067(i_3717)))(env_3716)
      }
    };
    var getFile_3686 = function(i_3691){
      if(i_3691.$tag==1){
        var $phi$431 = i_3691.$1
      } else error("pattern match fail",i_3691);
      return $phi$431
    };
    var addClass_3688 = function(env_3712){
      return function(c_3713){
        return ((foldl(function(env_3714){
          return function(b_3715){
            return ((addBinding_3041(fst_2879(b_3715)))(snd_2869(b_3715)))(env_3714)
          }
        }))(env_3712))(classToBindings_3068(c_3713))
      }
    };
    var addImports_3687 = function(env_3695){
      return function(i_3696){
        var $phi$433 = (get(getFile_3686(i_3696)))(ms_3684);
        if(i_3696.$tag==1){
          var $phi$434 = ((foldl(function(env_3706){
            return function(n_3707){
              var $phi$435 = ((addBinding_3041(n_3707.$1))((get(n_3707.$0))($phi$433.$0)))(env_3706);
              return $phi$435
            }
          }))(env_3695))(i_3696.$2)
        } else error("pattern match fail",i_3696);
        var env2_3700 = $phi$434;
        var env3_3701 = ((foldl(addClass_3688))(env2_3700))($phi$433.$1);
        var env4_3702 = ((foldl(function(env_3710){
          return function(i_3711){
            return (addInstance_3044(i_3711))(env_3710)
          }
        }))(env3_3701))($phi$433.$2);
        var $phi$432 = env4_3702;
        return $phi$432
      }
    };
    var env_3738 = emptyEnv_3037;
    var env2_3739 = ((foldl(addImports_3687))(env_3738))(m_3685.$2);
    var env3_3740 = ((foldl(addClass_3688))(env2_3739))(m_3685.$4);
    var env4_3741 = ((foldl(addIns_3689))(env3_3740))(m_3685.$5);
    var ds2_3742 = (evalState_2915(newCtx_3027))((inferDefs_3060(env4_3741))(m_3685.$6));
    var ds3_3743 = (map(checkForUnsatisfiedBounds_3690))(ds2_3742);
    var env5_3744 = ((foldl(function(env_3746){
      return function(d_3747){
        var $phi$437 = ((addBinding_3041(d_3747.$0))(getType_2972(d_3747.$1)))(env_3746);
        return $phi$437
      }
    }))(env4_3741))(ds3_3743);
    var ins2_3745 = (map((inferInstance_3066(env5_3744))((concat(m_3685.$4))((concatMap_2931(function(i_3750){
      var $phi$439 = (get(getFile_3686(i_3750)))(ms_3684);
      var $phi$438 = $phi$439.$1;
      return $phi$438
    }))(m_3685.$2)))))(m_3685.$5);
    var $phi$436 = ((((((Module_3002(m_3685.$0))(m_3685.$1))(m_3685.$2))(m_3685.$3))(m_3685.$4))(ins2_3745))(ds3_3743);
    return $phi$436
  }
};
var assert_3793 = assert_85;
var Pair_3794 = Pair_3;
var mapSnd_3795 = mapSnd_84;
var mapFst_3796 = mapFst_83;
var $gt$eq$gt_3797 = $gt$eq$gt_82;
var snd_3798 = snd_23;
var debug2_3799 = debug2_81;
var Just_3800 = Just_1;
var Nothing_3801 = Nothing_2;
var isJust_3802 = isJust_21;
var Empty_3803 = Empty_7;
var Leaf_3804 = Leaf_8;
var Collision_3805 = Collision_9;
var BitmapIndexed_3806 = BitmapIndexed_10;
var $_3807 = $_12;
var fst_3808 = fst_22;
var Left_3809 = Left_4;
var Right_3810 = Right_5;
var loop_3811 = loop_27;
var find_3812 = find_29;
var hamtMask_3813 = hamtMask_58;
var popCount_3814 = popCount_57;
var hamtIndex_3815 = hamtIndex_59;
var lookup_3816 = lookup_60;
var setContains_3817 = setContains_76;
var foldTrie_3818 = foldTrie_66;
var emptySet_3819 = emptySet_72;
var Unit_3820 = Unit_0;
var not_3821 = not_26;
var $div$eq_3822 = $div$eq_13;
var mapIx_3823 = mapIx_30;
var insert_3824 = insert_61;
var setAdd_3825 = setAdd_73;
var setIntersection_3826 = setIntersection_80;
var remove_3827 = remove_63;
var setDiff_3828 = setDiff_79;
var setToArray_3829 = setToArray_78;
var mergeTrie_3830 = mergeTrie_70;
var setUnion_3831 = setUnion_77;
var setRemove_3832 = setRemove_75;
var setAddAll_3833 = setAddAll_74;
var trieKeys_3834 = trieKeys_71;
var size_3835 = size_68;
var mapTrie_3836 = mapTrie_67;
var nodeMask_3837 = nodeMask_56;
var isEmpty_3838 = isEmpty_69;
var filterTrie_3839 = filterTrie_65;
var nextSetBitMask_3840 = nextSetBitMask_64;
var updateOrSet_3841 = updateOrSet_62;
var State_3842 = State_6;
var runState_3843 = runState_54;
var evalState_3844 = evalState_55;
var sets_3845 = sets_53;
var gets_3846 = gets_52;
var foldM_3847 = foldM_49;
var mapM_3848 = mapM_50;
var forM_3849 = forM_51;
var strToArray_3850 = strToArray_48;
var toRecord_3851 = toRecord_47;
var reverse_3852 = reverse_46;
var tail_3853 = tail_41;
var head_3854 = head_40;
var uniq_3855 = uniq_45;
var mergeSet_3856 = mergeSet_44;
var init_3857 = init_43;
var last_3858 = last_42;
var mapJust_3859 = mapJust_39;
var concatMap_3860 = concatMap_38;
var zip_3861 = zip_37;
var zipWithIndex2_3862 = zipWithIndex2_35;
var zipWithIndex_3863 = zipWithIndex_36;
var join_3864 = join_34;
var all_3865 = all_33;
var exists_3866 = exists_32;
var containsChar_3867 = containsChar_31;
var contains_3868 = contains_28;
var either_3869 = either_24;
var splitEither_3870 = splitEither_25;
var fromJust_3871 = fromJust_20;
var justOr_3872 = justOr_19;
var maybe_3873 = maybe_18;
var $gt$gt_3874 = $gt$gt_17;
var $gt$eq_3875 = $gt$eq_16;
var $lt$eq_3876 = $lt$eq_15;
var $gt_3877 = $gt_14;
var Identity_3878 = Identity_11;
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
var App_3879 = App_731;
var Lam_3880 = Lam_732;
var Case_3881 = Case_733;
var Let_3882 = Let_734;
var New_3883 = New_735;
var breakableDownAndUpM_3884 = breakableDownAndUpM_780;
var breakableDownM_3885 = breakableDownM_784;
var downAndUpM_3886 = downAndUpM_781;
var downM_3887 = downM_783;
var upM_3888 = upM_782;
var breakableDownAndUp_3889 = breakableDownAndUp_775;
var breakableDown_3890 = breakableDown_779;
var downAndUp_3891 = downAndUp_776;
var down_3892 = down_778;
var up_3893 = up_777;
var AnnType_3894 = AnnType_723;
var TUnknown_3895 = TUnknown_754;
var getAnn_3896 = getAnn_759;
var getAnnType_3897 = getAnnType_762;
var Var_3898 = Var_729;
var Const_3899 = Const_730;
var annOf_3900 = annOf_772;
var getType_3901 = getType_774;
var withAnn_3902 = withAnn_773;
var setAnn_3903 = setAnn_760;
var setAnnType_3904 = setAnnType_763;
var setType_3905 = setType_771;
var Data_3906 = Data_743;
var DataCon_3907 = DataCon_744;
var dataConName_3908 = dataConName_769;
var dataConNames_3909 = dataConNames_770;
var TCBound_3910 = TCBound_747;
var TConst_3911 = TConst_748;
var TVar_3912 = TVar_749;
var TApp_3913 = TApp_750;
var TRow_3914 = TRow_751;
var TBot_3915 = TBot_752;
var TForall_3916 = TForall_753;
var equivBound_3917 = equivBound_767;
var equivType_3918 = equivType_768;
var AnnCodeLoc_3919 = AnnCodeLoc_724;
var printCodeLoc_3920 = printCodeLoc_766;
var setAnnCodeLoc_3921 = setAnnCodeLoc_765;
var getAnnCodeLoc_3922 = getAnnCodeLoc_764;
var copyAnn_3923 = copyAnn_761;
var emptyAnn_3924 = emptyAnn_758;
var ImportAll_3925 = ImportAll_757;
var ImportOpen_3926 = ImportOpen_756;
var ImportClosed_3927 = ImportClosed_755;
var Instance_3928 = Instance_746;
var Class_3929 = Class_745;
var ModuleInterface_3930 = ModuleInterface_742;
var Module_3931 = Module_741;
var PData_3932 = PData_740;
var PConst_3933 = PConst_739;
var PVar_3934 = PVar_738;
var CStr_3935 = CStr_737;
var CNum_3936 = CNum_736;
var AnnExport_3937 = AnnExport_728;
var AnnTag_3938 = AnnTag_727;
var AnnData_3939 = AnnData_726;
var AnnUseCount_3940 = AnnUseCount_725;
var freeVars_3941 = freeVars_3065;
var normalize_3943 = function(ms_3972){
  return function(freeVars_3973){
    return function(i_3974){
      if(i_3974.$tag==0){
        var $phi$440 = error("closed imports not supported")
      } else if(i_3974.$tag==1){
        var $phi$440 = i_3974
      } else if((i_3974.$tag==2)&&("./builtins.js"==i_3974.$1)){
        var $phi$446 = (get("./builtins.js"))(ms_3972);
        var $phi$445 = ((ImportOpen_3926(i_3974.$0))("./builtins.js"))((map(function(n_3985){
          return (Pair_3794(n_3985))(n_3985)
        }))(keys($phi$446.$0)));
        var $phi$440 = $phi$445
      } else if(i_3974.$tag==2){
        var $phi$442 = (has(i_3974.$1))(ms_3972);
        if($phi$442){
          var $phi$444 = (get(i_3974.$1))(ms_3972);
          var $phi$443 = ((ImportOpen_3926(i_3974.$0))(i_3974.$1))((map(function(n_3991){
            return (Pair_3794(n_3991))(n_3991)
          }))(keys($phi$444.$0)));
          var $phi$441 = $phi$443
        } else if(!$phi$442){
          var $phi$441 = error(($concat(($concat(($concat("no mod "))(i_3974.$1)))(" in ")))(jsonStringify(keys(ms_3972))))
        } else error("pattern match fail",$phi$442);
        var $phi$440 = $phi$441
      } else error("pattern match fail",i_3974);
      return $phi$440
    }
  }
};
var normalizeImports_3942 = function(ms_3944){
  return function(m_3945){
    var getFromDefs_3953 = function(ds_3959){
      return ((foldl((mergeSet_3856($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(function(v_3960){
        return freeVars_3941(snd_3798(v_3960))
      }))(ds_3959))
    };
    var freeVarsInDefs_3954 = getFromDefs_3953(m_3945.$6);
    var freeVarsInIns_3955 = ((foldl((mergeSet_3856($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(function(i_3961){
      var $phi$448 = getFromDefs_3953(i_3961.$3);
      return $phi$448
    }))(m_3945.$5));
    var topLevelNames_3956 = (concat((map(fst_3808))(m_3945.$6)))((concatMap_3860(function(i_3966){
      var $phi$449 = (map(fst_3808))(i_3966.$3);
      return $phi$449
    }))(m_3945.$5));
    var fvs_3957 = (filter(function(v_3971){
      return not_3821(((contains_3868($import1$instance$Eq$1))(v_3971))(topLevelNames_3956))
    }))((((mergeSet_3856($import1$instance$Ord$3))($import1$instance$Eq$1))(freeVarsInDefs_3954))(freeVarsInIns_3955));
    var is2_3958 = (map((normalize_3943(ms_3944))(fvs_3957)))((enqueue((ImportAll_3925(emptyAnn_3924))("./builtins.js")))(m_3945.$2));
    var $phi$447 = ((((((Module_3931(m_3945.$0))(m_3945.$1))(is2_3958))(m_3945.$3))(m_3945.$4))(m_3945.$5))(m_3945.$6);
    return $phi$447
  }
};
var assert_3992 = assert_85;
var Pair_3993 = Pair_3;
var mapSnd_3994 = mapSnd_84;
var mapFst_3995 = mapFst_83;
var $gt$eq$gt_3996 = $gt$eq$gt_82;
var snd_3997 = snd_23;
var debug2_3998 = debug2_81;
var Just_3999 = Just_1;
var Nothing_4000 = Nothing_2;
var isJust_4001 = isJust_21;
var Empty_4002 = Empty_7;
var Leaf_4003 = Leaf_8;
var Collision_4004 = Collision_9;
var BitmapIndexed_4005 = BitmapIndexed_10;
var $_4006 = $_12;
var fst_4007 = fst_22;
var Left_4008 = Left_4;
var Right_4009 = Right_5;
var loop_4010 = loop_27;
var find_4011 = find_29;
var hamtMask_4012 = hamtMask_58;
var popCount_4013 = popCount_57;
var hamtIndex_4014 = hamtIndex_59;
var lookup_4015 = lookup_60;
var setContains_4016 = setContains_76;
var foldTrie_4017 = foldTrie_66;
var emptySet_4018 = emptySet_72;
var Unit_4019 = Unit_0;
var not_4020 = not_26;
var $div$eq_4021 = $div$eq_13;
var mapIx_4022 = mapIx_30;
var insert_4023 = insert_61;
var setAdd_4024 = setAdd_73;
var setIntersection_4025 = setIntersection_80;
var remove_4026 = remove_63;
var setDiff_4027 = setDiff_79;
var setToArray_4028 = setToArray_78;
var mergeTrie_4029 = mergeTrie_70;
var setUnion_4030 = setUnion_77;
var setRemove_4031 = setRemove_75;
var setAddAll_4032 = setAddAll_74;
var trieKeys_4033 = trieKeys_71;
var size_4034 = size_68;
var mapTrie_4035 = mapTrie_67;
var nodeMask_4036 = nodeMask_56;
var isEmpty_4037 = isEmpty_69;
var filterTrie_4038 = filterTrie_65;
var nextSetBitMask_4039 = nextSetBitMask_64;
var updateOrSet_4040 = updateOrSet_62;
var State_4041 = State_6;
var runState_4042 = runState_54;
var evalState_4043 = evalState_55;
var sets_4044 = sets_53;
var gets_4045 = gets_52;
var foldM_4046 = foldM_49;
var mapM_4047 = mapM_50;
var forM_4048 = forM_51;
var strToArray_4049 = strToArray_48;
var toRecord_4050 = toRecord_47;
var reverse_4051 = reverse_46;
var tail_4052 = tail_41;
var head_4053 = head_40;
var uniq_4054 = uniq_45;
var mergeSet_4055 = mergeSet_44;
var init_4056 = init_43;
var last_4057 = last_42;
var mapJust_4058 = mapJust_39;
var concatMap_4059 = concatMap_38;
var zip_4060 = zip_37;
var zipWithIndex2_4061 = zipWithIndex2_35;
var zipWithIndex_4062 = zipWithIndex_36;
var join_4063 = join_34;
var all_4064 = all_33;
var exists_4065 = exists_32;
var containsChar_4066 = containsChar_31;
var contains_4067 = contains_28;
var either_4068 = either_24;
var splitEither_4069 = splitEither_25;
var fromJust_4070 = fromJust_20;
var justOr_4071 = justOr_19;
var maybe_4072 = maybe_18;
var $gt$gt_4073 = $gt$gt_17;
var $gt$eq_4074 = $gt$eq_16;
var $lt$eq_4075 = $lt$eq_15;
var $gt_4076 = $gt_14;
var Identity_4077 = Identity_11;
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
var App_4078 = App_731;
var Lam_4079 = Lam_732;
var Case_4080 = Case_733;
var Let_4081 = Let_734;
var New_4082 = New_735;
var breakableDownAndUpM_4083 = breakableDownAndUpM_780;
var breakableDownM_4084 = breakableDownM_784;
var downAndUpM_4085 = downAndUpM_781;
var downM_4086 = downM_783;
var upM_4087 = upM_782;
var breakableDownAndUp_4088 = breakableDownAndUp_775;
var breakableDown_4089 = breakableDown_779;
var downAndUp_4090 = downAndUp_776;
var down_4091 = down_778;
var up_4092 = up_777;
var AnnType_4093 = AnnType_723;
var TUnknown_4094 = TUnknown_754;
var getAnn_4095 = getAnn_759;
var getAnnType_4096 = getAnnType_762;
var Var_4097 = Var_729;
var Const_4098 = Const_730;
var annOf_4099 = annOf_772;
var getType_4100 = getType_774;
var withAnn_4101 = withAnn_773;
var setAnn_4102 = setAnn_760;
var setAnnType_4103 = setAnnType_763;
var setType_4104 = setType_771;
var Data_4105 = Data_743;
var DataCon_4106 = DataCon_744;
var dataConName_4107 = dataConName_769;
var dataConNames_4108 = dataConNames_770;
var TCBound_4109 = TCBound_747;
var TConst_4110 = TConst_748;
var TVar_4111 = TVar_749;
var TApp_4112 = TApp_750;
var TRow_4113 = TRow_751;
var TBot_4114 = TBot_752;
var TForall_4115 = TForall_753;
var equivBound_4116 = equivBound_767;
var equivType_4117 = equivType_768;
var AnnCodeLoc_4118 = AnnCodeLoc_724;
var printCodeLoc_4119 = printCodeLoc_766;
var setAnnCodeLoc_4120 = setAnnCodeLoc_765;
var getAnnCodeLoc_4121 = getAnnCodeLoc_764;
var copyAnn_4122 = copyAnn_761;
var emptyAnn_4123 = emptyAnn_758;
var ImportAll_4124 = ImportAll_757;
var ImportOpen_4125 = ImportOpen_756;
var ImportClosed_4126 = ImportClosed_755;
var Instance_4127 = Instance_746;
var Class_4128 = Class_745;
var ModuleInterface_4129 = ModuleInterface_742;
var Module_4130 = Module_741;
var PData_4131 = PData_740;
var PConst_4132 = PConst_739;
var PVar_4133 = PVar_738;
var CStr_4134 = CStr_737;
var CNum_4135 = CNum_736;
var AnnExport_4136 = AnnExport_728;
var AnnTag_4137 = AnnTag_727;
var AnnData_4138 = AnnData_726;
var AnnUseCount_4139 = AnnUseCount_725;
var f1_4140 = f1_3046;
var classToBindings_4141 = classToBindings_3068;
var unify_4142 = unify_3053;
var applySubs_4143 = applySubs_3050;
var applySubsBound_4144 = applySubsBound_3051;
var instanceToTypeBound_4145 = instanceToTypeBound_3067;
var satisfiesBound_4146 = satisfiesBound_3072;
var emptySubs_4147 = emptySubs_3020;
var addSub_4148 = addSub_3022;
var printType_4149 = printType_2141;
var printTypeBound_4150 = printTypeBound_2142;
var reallyPrintExpr_4151 = reallyPrintExpr_2146;
var mkConFun_4152 = mkConFun_1685;
var S_4153 = function($_0_4173){
  return function($_1_4174){
    return function($_2_4175){
      return {$0:$_0_4173,$1:$_1_4174,$2:$_2_4175}
    }
  }
};
var setEnv_4161 = function(env_4276){
  return function(s_4277){
    var $phi$450 = ((S_4153(env_4276))(s_4277.$1))(s_4277.$2);
    return $phi$450
  }
};
var instanceNameFromBound_4170 = function(ix_4517){
  return function(b_4518){
    var $phi$451 = ($concat(($concat(($concat("local$instance$"))(b_4518.$1)))("$")))(intToString(ix_4517));
    return $phi$451
  }
};
var getEnv_4160 = function(s_4272){
  var $phi$452 = s_4272.$0;
  return $phi$452
};
var breakableDownAndUpWithEnv_4165 = function(getEnv_4382){
  return function(setEnv_4383){
    return function(down_4384){
      return function(up_4385){
        return function(a_4386){
          return function(e_4387){
            var exitScope_4390 = function(a_4401){
              return (setEnv_4383(tail_4052(getEnv_4382(a_4401))))(a_4401)
            };
            var processUp_4393 = function(a_4450){
              return function(e_4451){
                if(e_4451.$tag==3){
                  var $phi$453 = exitScope_4390(a_4450)
                } else if(e_4451.$tag==5){
                  var $phi$453 = exitScope_4390(a_4450)
                } else var $phi$453 = a_4450;
                var a2_4452 = $phi$453;
                return (up_4385(a2_4452))(e_4451)
              }
            };
            var patBindings_4394 = function(p_4460){
              if(p_4460.$tag==1){
                var $phi$454 = empty
              } else if(p_4460.$tag==0){
                var $phi$454 = ((set(p_4460.$1))(getAnnType_4096(p_4460.$0)))(empty)
              } else if(p_4460.$tag==2){
                var $phi$454 = ((foldr(function(env_4468){
                  return function(p_4469){
                    return (merge(patBindings_4394(p_4469)))(env_4468)
                  }
                }))(empty))(p_4460.$2)
              } else error("pattern match fail",p_4460);
              return $phi$454
            };
            var enterScope_4389 = function(bs_4397){
              return function(a_4398){
                var es_4399 = getEnv_4382(a_4398);
                var e_4400 = (merge(head_4053(es_4399)))(bs_4397);
                return (setEnv_4383((enqueue(e_4400))(es_4399)))(a_4398)
              }
            };
            var go_4388 = function(a_4395){
              return function(e_4396){
                return (((breakableDownAndUp_4088(processDown_4391))(processUp_4393))(a_4395))(e_4396)
              }
            };
            var processDown_4391 = function(a_4402){
              return function(e_4403){
                var $phi$456 = (down_4384(a_4402))(e_4403);
                if($phi$456.$tag==1){
                  var $phi$455 = Right_4009($phi$456.$0)
                } else if($phi$456.$tag==0){
                  if($phi$456.$0.$1.$tag==3){
                    var $phi$464 = getType_4100($phi$456.$0.$1);
                    if(($phi$464.$tag==2)&&(($phi$464.$1.$tag==2)&&(($phi$464.$1.$1.$tag==0)&&("->"==$phi$464.$1.$1.$1)))){
                      var $phi$463 = $phi$464.$1.$2
                    } else if(($phi$464.$tag==5)&&(($phi$464.$3.$tag==2)&&(($phi$464.$3.$1.$tag==2)&&(($phi$464.$3.$1.$1.$tag==0)&&("->"==$phi$464.$3.$1.$1.$1))))){
                      var $phi$463 = $phi$464.$3.$1.$2
                    } else var $phi$463 = TUnknown_4094;
                    var t_4410 = $phi$463;
                    var $phi$457 = Left_4008((Pair_3993((enterScope_4389(((set($phi$456.$0.$1.$1))(t_4410))(empty)))($phi$456.$0.$0)))($phi$456.$0.$1))
                  } else if($phi$456.$0.$1.$tag==5){
                    var ts_4428 = ((foldl(function(ts_4429){
                      return function(b_4430){
                        var $phi$462 = ((set(b_4430.$0))(getType_4100(b_4430.$1)))(ts_4429);
                        return $phi$462
                      }
                    }))(empty))($phi$456.$0.$1.$1);
                    var $phi$457 = Left_4008((Pair_3993((enterScope_4389(ts_4428))($phi$456.$0.$0)))($phi$456.$0.$1))
                  } else if($phi$456.$0.$1.$tag==4){
                    var $phi$459 = (go_4388($phi$456.$0.$0))($phi$456.$0.$1.$1);
                    var $phi$461 = ((foldl(processPat_4392))((Pair_3993($phi$459.$0))([])))($phi$456.$0.$1.$2);
                    var $phi$460 = Right_4009((Pair_3993($phi$461.$0))(((Case_4080($phi$456.$0.$1.$0))($phi$459.$1))($phi$461.$1)));
                    var $phi$458 = $phi$460;
                    var $phi$457 = $phi$458
                  } else var $phi$457 = Left_4008((Pair_3993($phi$456.$0.$0))($phi$456.$0.$1));
                  var $phi$455 = $phi$457
                } else error("pattern match fail",$phi$456);
                return $phi$455
              }
            };
            var processPat_4392 = function(ar_4441){
              return function(pat_4442){
                var bs_4447 = patBindings_4394(pat_4442.$0);
                var $phi$468 = (go_4388((enterScope_4389(bs_4447))(ar_4441.$0)))(pat_4442.$1);
                var $phi$467 = (Pair_3993(exitScope_4390($phi$468.$0)))((push((Pair_3993(pat_4442.$0))($phi$468.$1)))(ar_4441.$1));
                var $phi$466 = $phi$467;
                var $phi$465 = $phi$466;
                return $phi$465
              }
            };
            return (go_4388(a_4386))(e_4387)
          }
        }
      }
    }
  }
};
var addPrefix_4164 = function(p_4370){
  return function(t_4371){
    if(t_4371.$tag==5){
      var subs_4376 = ((foldl(function(subs_4377){
        return function(v_4378){
          return (((addSub_4148(function(s_4379){
            return ($concat("declasser: "))(s_4379)
          }))(v_4378))((TVar_4111(emptyAnn_4123))(($concat(p_4370))(v_4378))))(subs_4377)
        }
      }))(emptySubs_4147))(t_4371.$1);
      var $phi$469 = (applySubs_4143(subs_4376))((((TForall_4115(t_4371.$0))((map(function(v_4380){
        return ($concat(p_4370))(v_4380)
      }))(t_4371.$1)))(t_4371.$2))(t_4371.$3))
    } else var $phi$469 = t_4371;
    return $phi$469
  }
};
var rewriteExpr_4163 = function(is_4285){
  return function(env_4286){
    return function(e_4287){
      var fromEnv_4288 = function(n_4296){
        return function(envs_4297){
          var env_4298 = head_4053(envs_4297);
          var $phi$471 = (has(n_4296))(env_4298);
          if(!$phi$471){
            var $phi$470 = error(($concat(($concat(($concat("no "))(n_4296)))(" in env ")))(jsonStringify(keys(env_4298))))
          } else if($phi$471){
            var $phi$470 = (get(n_4296))(env_4298)
          } else error("pattern match fail",$phi$471);
          return $phi$470
        }
      };
      var dropInstance_4289 = function(v_4299){
        return function(a_4300){
          var $phi$472 = ((S_4153(a_4300.$0))((filter(function(p_4304){
            return (($div$eq_4021($import1$instance$Eq$1))(fst_4007(p_4304)))(v_4299)
          }))(a_4300.$1)))(a_4300.$2);
          return $phi$472
        }
      };
      var findMatching_4291 = function(b_4311){
        return function(a_4312){
          var $phi$476 = (find_4011(function(p_4316){
            var $phi$475 = (satisfiesBound_4146(p_4316.$1))(b_4311);
            return $phi$475
          }))(a_4312.$1);
          if($phi$476.$tag==0){
            var $phi$474 = $phi$476.$0.$0
          } else var $phi$474 = error(($concat("declasser failed to find satisfying instance for "))(printTypeBound_4150(b_4311)));
          var $phi$473 = $phi$474;
          return $phi$473
        }
      };
      var requiredInstances_4292 = function(tv_4322){
        return function(td_4323){
          var $phi$478 = (addPrefix_4164("ins$"))(td_4323);
          if($phi$478.$tag==5){
            var subs_4328 = ((unify_4142(function(s_4329){
              return ($concat("declasser: "))(s_4329)
            }))(tv_4322))($phi$478.$3);
            var $phi$477 = (map(applySubsBound_4144(subs_4328)))($phi$478.$2)
          } else var $phi$477 = [];
          return $phi$477
        }
      };
      var rewriteVar_4295 = function(a_4348){
        return function(e_4349){
          if(e_4349.$tag==0){
            var $phi$481 = getType_4100(e_4349);
            if($phi$481.$tag==5){
              var $phi$480 = (Pair_3993(a_4348))(e_4349)
            } else {
              var t_4357 = (fromEnv_4288(e_4349.$1))(getEnv_4160(a_4348));
              var is_4358 = (requiredInstances_4292($phi$481))(t_4357);
              var mis_4359 = (map(function(b_4361){
                return (findMatching_4291(b_4361))(a_4348)
              }))(is_4358);
              var e2_4360 = ((foldl(function(e_4362){
                return function(v_4363){
                  return ((App_4078(emptyAnn_4123))(e_4362))((Var_4097(emptyAnn_4123))(v_4363))
                }
              }))(e_4349))(mis_4359);
              var $phi$480 = (Pair_3993(a_4348))(e2_4360)
            };
            var $phi$479 = $phi$480
          } else if(e_4349.$tag==3){
            var $phi$479 = (Pair_3993((dropInstance_4289(e_4349.$1))(a_4348)))(e_4349)
          } else var $phi$479 = (Pair_3993(a_4348))(e_4349);
          return $phi$479
        }
      };
      var addInstance_4290 = function(b_4305){
        return function(a_4306){
          var name_4310 = (instanceNameFromBound_4170(a_4306.$2))(b_4305);
          var $phi$482 = (Pair_3993(((S_4153(a_4306.$0))((push((Pair_3993(name_4310))(b_4305)))(a_4306.$1)))(a_4306.$2+1)))(name_4310);
          return $phi$482
        }
      };
      var rewriteBound_4294 = function(ae_4340){
        return function(ib_4341){
          var $phi$486 = (addInstance_4290(ib_4341.$1))(ae_4340.$0);
          var $phi$485 = (Pair_3993($phi$486.$0))(((Lam_4079(emptyAnn_4123))($phi$486.$1))(ae_4340.$1));
          var $phi$484 = $phi$485;
          var $phi$483 = $phi$484;
          return $phi$483
        }
      };
      var rewriteBounds_4293 = function(a_4331){
        return function(e_4332){
          var $phi$488 = getType_4100(e_4332);
          if($phi$488.$tag==5){
            var $phi$490 = (($gt_4076($import1$instance$Ord$2))(length($phi$488.$2)))(0);
            if(!$phi$490){
              var $phi$489 = (Pair_3993(a_4331))(e_4332)
            } else if($phi$490){
              var rewritten_4337 = ((foldr(rewriteBound_4294))((Pair_3993(a_4331))((setType_4104($phi$488.$3))(e_4332))))(zipWithIndex_4062($phi$488.$2));
              var $phi$489 = (mapSnd_3994(function(re_4338){
                return (withAnn_4101((((copyAnn_4122($import1$instance$Hashable$13))($import1$instance$Eq$1))(["export"]))(annOf_4099(e_4332))))(re_4338)
              }))(rewritten_4337)
            } else error("pattern match fail",$phi$490);
            var $phi$487 = $phi$489
          } else var $phi$487 = (Pair_3993(a_4331))(e_4332);
          return $phi$487
        }
      };
      return snd_3997((((((breakableDownAndUpWithEnv_4165(getEnv_4160))(setEnv_4161))(function(a_4368){
        return function(e_4369){
          return Left_4008((rewriteBounds_4293(a_4368))(e_4369))
        }
      }))(rewriteVar_4295))(((S_4153([env_4286]))(is_4285))(0)))(e_4287))
    }
  }
};
var rewriteTopExpr_4162 = function(is_4281){
  return function(env_4282){
    return function(e_4283){
      var __4284 = debug((reallyPrintExpr_4151(true))(e_4283));
      return ((rewriteExpr_4163(is_4281))(env_4282))(e_4283)
    }
  }
};
var instanceNameFromImport_4172 = function(imix_4527){
  return function(inix_4528){
    return function(b_4529){
      var $phi$491 = ($concat(($concat(($concat(($concat(($concat("$import"))(intToString(imix_4527))))("$instance$")))(b_4529.$1)))("$")))(intToString(inix_4528));
      return $phi$491
    }
  }
};
var instanceName2_4171 = function(ix_4522){
  return function(i_4523){
    var $phi$492 = ($concat(($concat(($concat("$instance$"))(i_4523.$1)))("$")))(intToString(ix_4522));
    return $phi$492
  }
};
var rewriteImportedBound_4156 = function(imix_4230){
  return function(nbs_4231){
    return function(ib_4232){
      var alias_4238 = ((instanceNameFromImport_4172(imix_4230))(ib_4232.$0))(ib_4232.$1);
      var symbol_4237 = (instanceName2_4171(ib_4232.$0))(ib_4232.$1);
      var $phi$494 = (Pair_3993((push((Pair_3993(symbol_4237))(alias_4238)))(nbs_4231.$0)))((push((Pair_3993(alias_4238))(ib_4232.$1)))(nbs_4231.$1));
      var $phi$493 = $phi$494;
      return $phi$493
    }
  }
};
var className_4167 = function(n_4505){
  return ($concat("$class$"))(n_4505)
};
var rewriteImportedInstances_4155 = function(ms_4209){
  return function(isi_4210){
    return function(ixi_4211){
      if(ixi_4211.$1.$tag==1){
        var $phi$498 = (get(ixi_4211.$1.$1))(ms_4209);
        var $phi$500 = ((foldl(rewriteImportedBound_4156(ixi_4211.$0)))((Pair_3993([]))([])))(zipWithIndex_4062($phi$498.$2));
        var cns_4223 = (map(function(n_4224){
          return (Pair_3993(n_4224))(n_4224)
        }))((concatMap_4059(function(c_4225){
          var $phi$501 = (enqueue(className_4167(c_4225.$1)))((map(fst_4007))(c_4225.$3));
          return $phi$501
        }))($phi$498.$1));
        var $phi$499 = (Pair_3993((push(((ImportOpen_4125(ixi_4211.$1.$0))(ixi_4211.$1.$1))((concat(ixi_4211.$1.$2))((concat($phi$500.$0))(cns_4223)))))(isi_4210.$0)))((concat(isi_4210.$1))($phi$500.$1));
        var $phi$497 = $phi$499;
        var $phi$496 = $phi$497
      } else error("pattern match fail",ixi_4211);
      var $phi$495 = $phi$496;
      return $phi$495
    }
  }
};
var className2_4168 = function(c_4506){
  var $phi$502 = className_4167(c_4506.$1);
  return $phi$502
};
var rewriteClassToFun_4158 = function(c_4247){
  var name_4252 = className2_4168(c_4247);
  var f_4256 = function(b_4257){
    return (PVar_4133(emptyAnn_4123))(($concat(fst_4007(b_4257)))("_"))
  };
  var bsForPat_4253 = (map(f_4256))(sort(c_4247.$3));
  var v_4254 = ($concat("x_"))(name_4252);
  var rewrite_4255 = function(b_4258){
    var $phi$504 = (Pair_3993(b_4258.$0))((setType_4104(b_4258.$1))(((Lam_4079(((((setAnn_4102($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_4136(b_4258.$0)))(emptyAnn_4123)))(v_4254))(((Case_4080(emptyAnn_4123))((Var_4097(emptyAnn_4123))(v_4254)))([(Pair_3993(((PData_4131(emptyAnn_4123))(name_4252))(bsForPat_4253)))((Var_4097(emptyAnn_4123))(($concat(b_4258.$0))("_")))]))));
    return $phi$504
  };
  var $phi$503 = (map(rewrite_4255))(classToBindings_4141(c_4247));
  return $phi$503
};
var rewriteClassToData_4157 = function(c_4239){
  var t_4246 = ((TApp_4112(emptyAnn_4123))((TConst_4110(emptyAnn_4123))(c_4239.$1)))((TVar_4111(emptyAnn_4123))(c_4239.$2));
  var ps_4245 = (map(snd_3997))(sort(classToBindings_4141(c_4239)));
  var name_4244 = className_4167(c_4239.$1);
  var $phi$505 = ((((mkConFun_4152(Nothing_4000))(t_4246))([c_4239.$2]))(name_4244))(ps_4245);
  return $phi$505
};
var importsToTypeEnv_4166 = function(ms_4470){
  return function(is_4471){
    var getFile_4472 = function(i_4475){
      if(i_4475.$tag==2){
        var $phi$506 = i_4475.$1
      } else if(i_4475.$tag==1){
        var $phi$506 = i_4475.$1
      } else if(i_4475.$tag==0){
        var $phi$506 = i_4475.$1
      } else error("pattern match fail",i_4475);
      return $phi$506
    };
    var addClass_4473 = function(env_4484){
      return function(c_4485){
        return ((foldl(function(env_4486){
          return function(b_4487){
            return ((set(fst_4007(b_4487)))(snd_3997(b_4487)))(env_4486)
          }
        }))(env_4484))(classToBindings_4141(c_4485))
      }
    };
    var addImports_4474 = function(env_4488){
      return function(i_4489){
        var $phi$508 = (get(getFile_4472(i_4489)))(ms_4470);
        if(i_4489.$tag==2){
          var $phi$509 = (merge(env_4488))($phi$508.$0)
        } else if(i_4489.$tag==1){
          var $phi$509 = ((foldl(function(env_4500){
            return function(n_4501){
              var $phi$510 = ((set(n_4501.$1))((get(n_4501.$0))($phi$508.$0)))(env_4500);
              return $phi$510
            }
          }))(env_4488))(i_4489.$2)
        } else var $phi$509 = error("import type not supported in type inference");
        var env2_4493 = $phi$509;
        var env3_4494 = ((foldl(addClass_4473))(env2_4493))($phi$508.$1);
        var $phi$507 = env3_4494;
        return $phi$507
      }
    };
    return ((foldl(addImports_4474))(empty))((enqueue((ImportAll_4124(emptyAnn_4123))("./builtins.js")))(is_4471))
  }
};
var instanceName_4169 = function(ix_4511){
  return function(i_4512){
    var $phi$511 = ($concat(($concat(($concat("$instance$"))(i_4512.$1)))("$")))(intToString(ix_4511));
    return $phi$511
  }
};
var rewriteInstance_4159 = function(is_4261){
  return function(env_4262){
    return function(ix_4263){
      return function(i_4264){
        var args_4270 = (map((rewriteExpr_4163(is_4261))(env_4262)))((map(snd_3997))(sort(i_4264.$3)));
        var e_4271 = ((foldl(App_4078(emptyAnn_4123)))((Var_4097(emptyAnn_4123))(className_4167(i_4264.$1))))(args_4270);
        var name_4269 = (instanceName_4169(ix_4263))(i_4264);
        var $phi$512 = (Pair_3993(name_4269))((withAnn_4101(((((setAnn_4102($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_4136(name_4269)))(emptyAnn_4123)))(e_4271));
        return $phi$512
      }
    }
  }
};
var declassModule_4154 = function(ms_4176){
  return function(m_4177){
    var isi_4185 = ((foldl(rewriteImportedInstances_4155(ms_4176)))((Pair_3993([]))([])))(zipWithIndex_4062(m_4177.$2));
    var importedInstances_4187 = snd_3997(isi_4185);
    var availableInstances_4190 = (concat(importedInstances_4187))((map(function(p_4196){
      var $phi$514 = (Pair_3993((instanceName_4169(p_4196.$0))(p_4196.$1)))(instanceToTypeBound_4145(p_4196.$1));
      return $phi$514
    }))(zipWithIndex_4062(m_4177.$5)));
    var classesAsData_4188 = (map(rewriteClassToData_4157))(m_4177.$4);
    var classFuns_4189 = (concat(classesAsData_4188))((concatMap_4059(rewriteClassToFun_4158))(m_4177.$4));
    var env_4191 = ((foldl(function(env_4199){
      return function(b_4200){
        var $phi$515 = ((set(b_4200.$0))(getType_4100(b_4200.$1)))(env_4199);
        return $phi$515
      }
    }))((importsToTypeEnv_4166(ms_4176))(m_4177.$2)))((concat(classFuns_4189))(m_4177.$6));
    var instancesAsDefs_4195 = (map(function(p_4206){
      var $phi$516 = (((rewriteInstance_4159(availableInstances_4190))(env_4191))(p_4206.$0))(p_4206.$1);
      return $phi$516
    }))(zipWithIndex_4062(m_4177.$5));
    var splitData_4192 = function(d_4203){
      var $phi$518 = (((lookup_4015($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(annOf_4099(snd_3997(d_4203)));
      if($phi$518.$tag==1){
        var $phi$517 = Right_4009(d_4203)
      } else if($phi$518.$tag==0){
        var $phi$517 = Left_4008(d_4203)
      } else error("pattern match fail",$phi$518);
      return $phi$517
    };
    var sds_4193 = splitEither_4069((map(splitData_4192))(m_4177.$6));
    var ds2_4194 = (map(function(d_4205){
      return (Pair_3993(fst_4007(d_4205)))(((rewriteExpr_4163(availableInstances_4190))(env_4191))(snd_3997(d_4205)))
    }))(snd_3997(sds_4193));
    var is2_4186 = fst_4007(isi_4185);
    var $phi$513 = ((((((Module_4130(m_4177.$0))(m_4177.$1))(is2_4186))(m_4177.$3))([]))([]))((concat(fst_4007(sds_4193)))((concat(classFuns_4189))((concat(instancesAsDefs_4195))(ds2_4194))));
    return $phi$513
  }
};
var assert_4533 = assert_85;
var Pair_4534 = Pair_3;
var mapSnd_4535 = mapSnd_84;
var mapFst_4536 = mapFst_83;
var $gt$eq$gt_4537 = $gt$eq$gt_82;
var snd_4538 = snd_23;
var debug2_4539 = debug2_81;
var Just_4540 = Just_1;
var Nothing_4541 = Nothing_2;
var isJust_4542 = isJust_21;
var Empty_4543 = Empty_7;
var Leaf_4544 = Leaf_8;
var Collision_4545 = Collision_9;
var BitmapIndexed_4546 = BitmapIndexed_10;
var $_4547 = $_12;
var fst_4548 = fst_22;
var Left_4549 = Left_4;
var Right_4550 = Right_5;
var loop_4551 = loop_27;
var find_4552 = find_29;
var hamtMask_4553 = hamtMask_58;
var popCount_4554 = popCount_57;
var hamtIndex_4555 = hamtIndex_59;
var lookup_4556 = lookup_60;
var setContains_4557 = setContains_76;
var foldTrie_4558 = foldTrie_66;
var emptySet_4559 = emptySet_72;
var Unit_4560 = Unit_0;
var not_4561 = not_26;
var $div$eq_4562 = $div$eq_13;
var mapIx_4563 = mapIx_30;
var insert_4564 = insert_61;
var setAdd_4565 = setAdd_73;
var setIntersection_4566 = setIntersection_80;
var remove_4567 = remove_63;
var setDiff_4568 = setDiff_79;
var setToArray_4569 = setToArray_78;
var mergeTrie_4570 = mergeTrie_70;
var setUnion_4571 = setUnion_77;
var setRemove_4572 = setRemove_75;
var setAddAll_4573 = setAddAll_74;
var trieKeys_4574 = trieKeys_71;
var size_4575 = size_68;
var mapTrie_4576 = mapTrie_67;
var nodeMask_4577 = nodeMask_56;
var isEmpty_4578 = isEmpty_69;
var filterTrie_4579 = filterTrie_65;
var nextSetBitMask_4580 = nextSetBitMask_64;
var updateOrSet_4581 = updateOrSet_62;
var State_4582 = State_6;
var runState_4583 = runState_54;
var evalState_4584 = evalState_55;
var sets_4585 = sets_53;
var gets_4586 = gets_52;
var foldM_4587 = foldM_49;
var mapM_4588 = mapM_50;
var forM_4589 = forM_51;
var strToArray_4590 = strToArray_48;
var toRecord_4591 = toRecord_47;
var reverse_4592 = reverse_46;
var tail_4593 = tail_41;
var head_4594 = head_40;
var uniq_4595 = uniq_45;
var mergeSet_4596 = mergeSet_44;
var init_4597 = init_43;
var last_4598 = last_42;
var mapJust_4599 = mapJust_39;
var concatMap_4600 = concatMap_38;
var zip_4601 = zip_37;
var zipWithIndex2_4602 = zipWithIndex2_35;
var zipWithIndex_4603 = zipWithIndex_36;
var join_4604 = join_34;
var all_4605 = all_33;
var exists_4606 = exists_32;
var containsChar_4607 = containsChar_31;
var contains_4608 = contains_28;
var either_4609 = either_24;
var splitEither_4610 = splitEither_25;
var fromJust_4611 = fromJust_20;
var justOr_4612 = justOr_19;
var maybe_4613 = maybe_18;
var $gt$gt_4614 = $gt$gt_17;
var $gt$eq_4615 = $gt$eq_16;
var $lt$eq_4616 = $lt$eq_15;
var $gt_4617 = $gt_14;
var Identity_4618 = Identity_11;
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
var ArgBool_4619 = function($_0_4627){
  return function($_1_4628){
    return {$0:$_0_4627,$1:$_1_4628,$tag:0}
  }
};
var ParsedArgs_4621 = function($_0_4631){
  return function($_1_4632){
    return function($_2_4633){
      return {$0:$_0_4631,$1:$_1_4632,$2:$_2_4633}
    }
  }
};
var ArgString_4620 = function($_0_4629){
  return function($_1_4630){
    return {$0:$_0_4629,$1:$_1_4630,$tag:1}
  }
};
var $instance$Eq$0 = $class$Eq(function(a_4673){
  return function(b_4674){
    return a_4673===b_4674
  }
});
var getBool_4626 = function(p_4663){
  return function(def_4664){
    var $phi$521 = ((contains_4608($instance$Eq$0))(def_4664))(p_4663.$2);
    if(!$phi$521){
      var $phi$520 = error("unrecognized arg that was not present for parsing")
    } else if($phi$521){
      if(def_4664.$tag==0){
        var $phi$524 = (has(def_4664.$0))(p_4663.$1);
        if(!$phi$524){
          if(def_4664.$1.$tag==0){
            var $phi$527 = def_4664.$1.$0
          } else if(def_4664.$1.$tag==1){
            var $phi$527 = error(($concat("no value for required arg "))(def_4664.$0))
          } else error("pattern match fail",def_4664.$1);
          var $phi$523 = $phi$527
        } else if($phi$524){
          var $phi$526 = (get(def_4664.$0))(p_4663.$1);
          if(""==$phi$526){
            var $phi$525 = true
          } else if("True"==$phi$526){
            var $phi$525 = true
          } else if("true"==$phi$526){
            var $phi$525 = true
          } else if("1"==$phi$526){
            var $phi$525 = true
          } else if("False"==$phi$526){
            var $phi$525 = false
          } else if("false"==$phi$526){
            var $phi$525 = false
          } else if("0"==$phi$526){
            var $phi$525 = false
          } else var $phi$525 = error(($concat("invalid value for a bool argument: "))($phi$526));
          var $phi$523 = $phi$525
        } else error("pattern match fail",$phi$524);
        var $phi$522 = $phi$523
      } else var $phi$522 = error("arg is not a bool");
      var $phi$520 = $phi$522
    } else error("pattern match fail",$phi$521);
    var $phi$519 = $phi$520;
    return $phi$519
  }
};
var getString_4625 = function(p_4654){
  return function(def_4655){
    var $phi$530 = ((contains_4608($instance$Eq$0))(def_4655))(p_4654.$2);
    if(!$phi$530){
      var $phi$529 = error("unrecognized arg that was not present for parsing")
    } else if($phi$530){
      if(def_4655.$tag==1){
        var $phi$533 = (has(def_4655.$0))(p_4654.$1);
        if(!$phi$533){
          if(def_4655.$1.$tag==0){
            var $phi$534 = def_4655.$1.$0
          } else if(def_4655.$1.$tag==1){
            var $phi$534 = error(($concat("no value for required arg "))(def_4655.$0))
          } else error("pattern match fail",def_4655.$1);
          var $phi$532 = $phi$534
        } else if($phi$533){
          var $phi$532 = (get(def_4655.$0))(p_4654.$1)
        } else error("pattern match fail",$phi$533);
        var $phi$531 = $phi$532
      } else var $phi$531 = error("arg is not a string");
      var $phi$529 = $phi$531
    } else error("pattern match fail",$phi$530);
    var $phi$528 = $phi$529;
    return $phi$528
  }
};
var getPositional_4624 = function(p_4650){
  var $phi$535 = p_4650.$0;
  return $phi$535
};
var argName_4622 = function(a_4634){
  if(a_4634.$tag==0){
    var $phi$536 = a_4634.$0
  } else if(a_4634.$tag==1){
    var $phi$536 = a_4634.$0
  } else error("pattern match fail",a_4634);
  return $phi$536
};
var parseArgs_4623 = function(defs_4639){
  return function(argv_4640){
    var parse_4641 = function(r_4642){
      return function(arg_4643){
        var $phi$539 = ($and((($eq$eq($import1$instance$Eq$1))((getChar(0))(arg_4643)))("-")))((($eq$eq($import1$instance$Eq$1))((getChar(1))(arg_4643)))("-"));
        if(!$phi$539){
          var $phi$538 = (Pair_4534((push(arg_4643))(r_4642.$0)))(r_4642.$1)
        } else if($phi$539){
          var value_4647 = (drop(1))((match("=.*"))(arg_4643));
          var name_4646 = (match("[^=]+"))((drop(2))(arg_4643));
          var $phi$541 = ((contains_4608($import1$instance$Eq$1))(name_4646))((map(argName_4622))(defs_4639));
          if(!$phi$541){
            var $phi$540 = error(($concat("unrecognized argument "))(arg_4643))
          } else if($phi$541){
            var $phi$540 = (Pair_4534(r_4642.$0))(((set(name_4646))(value_4647))(r_4642.$1))
          } else error("pattern match fail",$phi$541);
          var $phi$538 = $phi$540
        } else error("pattern match fail",$phi$539);
        var $phi$537 = $phi$538;
        return $phi$537
      }
    };
    var $phi$543 = ((foldl(parse_4641))((Pair_4534([]))(empty)))(argv_4640);
    var $phi$542 = ((ParsedArgs_4621($phi$543.$0))($phi$543.$1))(defs_4639);
    return $phi$542
  }
};
var JSIf_4698 = function($_0_4732){
  return function($_1_4733){
    return function($_2_4734){
      return {$0:$_0_4732,$1:$_1_4733,$2:$_2_4734,$tag:6}
    }
  }
};
var JSAssign_4697 = function($_0_4730){
  return function($_1_4731){
    return {$0:$_0_4730,$1:$_1_4731,$tag:5}
  }
};
var JSBreak_4696 = {$tag:4};
var JSSwitch_4695 = function($_0_4728){
  return function($_1_4729){
    return {$0:$_0_4728,$1:$_1_4729,$tag:3}
  }
};
var JSVar_4694 = function($_0_4726){
  return function($_1_4727){
    return {$0:$_0_4726,$1:$_1_4727,$tag:2}
  }
};
var JSReturn_4693 = function($_0_4725){
  return {$0:$_0_4725,$tag:1}
};
var JSExpr_4692 = function($_0_4724){
  return {$0:$_0_4724,$tag:0}
};
var JSSeq_4691 = function($_0_4723){
  return {$0:$_0_4723,$tag:16}
};
var JSNew_4690 = function($_0_4721){
  return function($_1_4722){
    return {$0:$_0_4721,$1:$_1_4722,$tag:15}
  }
};
var JSInstanceOf_4689 = function($_0_4719){
  return function($_1_4720){
    return {$0:$_0_4719,$1:$_1_4720,$tag:14}
  }
};
var JSUndefined_4688 = {$tag:13};
var JSNull_4687 = {$tag:12};
var JSArray_4686 = function($_0_4718){
  return {$0:$_0_4718,$tag:11}
};
var JSObject_4685 = function($_0_4717){
  return {$0:$_0_4717,$tag:10}
};
var JSBool_4684 = function($_0_4716){
  return {$0:$_0_4716,$tag:9}
};
var JSString_4683 = function($_0_4715){
  return {$0:$_0_4715,$tag:8}
};
var JSNum_4682 = function($_0_4714){
  return {$0:$_0_4714,$tag:7}
};
var JSTernary_4681 = function($_0_4711){
  return function($_1_4712){
    return function($_2_4713){
      return {$0:$_0_4711,$1:$_1_4712,$2:$_2_4713,$tag:6}
    }
  }
};
var JSFun_4680 = function($_0_4709){
  return function($_1_4710){
    return {$0:$_0_4709,$1:$_1_4710,$tag:5}
  }
};
var JSCall_4679 = function($_0_4707){
  return function($_1_4708){
    return {$0:$_0_4707,$1:$_1_4708,$tag:4}
  }
};
var JSBinOp_4678 = function($_0_4704){
  return function($_1_4705){
    return function($_2_4706){
      return {$0:$_0_4704,$1:$_1_4705,$2:$_2_4706,$tag:3}
    }
  }
};
var JSUnOp_4677 = function($_0_4702){
  return function($_1_4703){
    return {$0:$_0_4702,$1:$_1_4703,$tag:2}
  }
};
var JSIndex_4676 = function($_0_4700){
  return function($_1_4701){
    return {$0:$_0_4700,$1:$_1_4701,$tag:1}
  }
};
var JSRef_4675 = function($_0_4699){
  return {$0:$_0_4699,$tag:0}
};
var assert_4735 = assert_85;
var Pair_4736 = Pair_3;
var mapSnd_4737 = mapSnd_84;
var mapFst_4738 = mapFst_83;
var $gt$eq$gt_4739 = $gt$eq$gt_82;
var snd_4740 = snd_23;
var debug2_4741 = debug2_81;
var Just_4742 = Just_1;
var Nothing_4743 = Nothing_2;
var isJust_4744 = isJust_21;
var Empty_4745 = Empty_7;
var Leaf_4746 = Leaf_8;
var Collision_4747 = Collision_9;
var BitmapIndexed_4748 = BitmapIndexed_10;
var $_4749 = $_12;
var fst_4750 = fst_22;
var Left_4751 = Left_4;
var Right_4752 = Right_5;
var loop_4753 = loop_27;
var find_4754 = find_29;
var hamtMask_4755 = hamtMask_58;
var popCount_4756 = popCount_57;
var hamtIndex_4757 = hamtIndex_59;
var lookup_4758 = lookup_60;
var setContains_4759 = setContains_76;
var foldTrie_4760 = foldTrie_66;
var emptySet_4761 = emptySet_72;
var Unit_4762 = Unit_0;
var not_4763 = not_26;
var $div$eq_4764 = $div$eq_13;
var mapIx_4765 = mapIx_30;
var insert_4766 = insert_61;
var setAdd_4767 = setAdd_73;
var setIntersection_4768 = setIntersection_80;
var remove_4769 = remove_63;
var setDiff_4770 = setDiff_79;
var setToArray_4771 = setToArray_78;
var mergeTrie_4772 = mergeTrie_70;
var setUnion_4773 = setUnion_77;
var setRemove_4774 = setRemove_75;
var setAddAll_4775 = setAddAll_74;
var trieKeys_4776 = trieKeys_71;
var size_4777 = size_68;
var mapTrie_4778 = mapTrie_67;
var nodeMask_4779 = nodeMask_56;
var isEmpty_4780 = isEmpty_69;
var filterTrie_4781 = filterTrie_65;
var nextSetBitMask_4782 = nextSetBitMask_64;
var updateOrSet_4783 = updateOrSet_62;
var State_4784 = State_6;
var runState_4785 = runState_54;
var evalState_4786 = evalState_55;
var sets_4787 = sets_53;
var gets_4788 = gets_52;
var foldM_4789 = foldM_49;
var mapM_4790 = mapM_50;
var forM_4791 = forM_51;
var strToArray_4792 = strToArray_48;
var toRecord_4793 = toRecord_47;
var reverse_4794 = reverse_46;
var tail_4795 = tail_41;
var head_4796 = head_40;
var uniq_4797 = uniq_45;
var mergeSet_4798 = mergeSet_44;
var init_4799 = init_43;
var last_4800 = last_42;
var mapJust_4801 = mapJust_39;
var concatMap_4802 = concatMap_38;
var zip_4803 = zip_37;
var zipWithIndex2_4804 = zipWithIndex2_35;
var zipWithIndex_4805 = zipWithIndex_36;
var join_4806 = join_34;
var all_4807 = all_33;
var exists_4808 = exists_32;
var containsChar_4809 = containsChar_31;
var contains_4810 = contains_28;
var either_4811 = either_24;
var splitEither_4812 = splitEither_25;
var fromJust_4813 = fromJust_20;
var justOr_4814 = justOr_19;
var maybe_4815 = maybe_18;
var $gt$gt_4816 = $gt$gt_17;
var $gt$eq_4817 = $gt$eq_16;
var $lt$eq_4818 = $lt$eq_15;
var $gt_4819 = $gt_14;
var Identity_4820 = Identity_11;
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
var JSIf_4821 = JSIf_4698;
var JSAssign_4822 = JSAssign_4697;
var JSBreak_4823 = JSBreak_4696;
var JSSwitch_4824 = JSSwitch_4695;
var JSVar_4825 = JSVar_4694;
var JSReturn_4826 = JSReturn_4693;
var JSExpr_4827 = JSExpr_4692;
var JSSeq_4828 = JSSeq_4691;
var JSNew_4829 = JSNew_4690;
var JSInstanceOf_4830 = JSInstanceOf_4689;
var JSUndefined_4831 = JSUndefined_4688;
var JSNull_4832 = JSNull_4687;
var JSArray_4833 = JSArray_4686;
var JSObject_4834 = JSObject_4685;
var JSBool_4835 = JSBool_4684;
var JSString_4836 = JSString_4683;
var JSNum_4837 = JSNum_4682;
var JSTernary_4838 = JSTernary_4681;
var JSFun_4839 = JSFun_4680;
var JSCall_4840 = JSCall_4679;
var JSBinOp_4841 = JSBinOp_4678;
var JSUnOp_4842 = JSUnOp_4677;
var JSIndex_4843 = JSIndex_4676;
var JSRef_4844 = JSRef_4675;
var tryDCE_4845 = function(e_4848){
  if(((e_4848.$tag==3)&&("&&"==e_4848.$0))&&((e_4848.$1.$tag==9)&&e_4848.$1.$0)){
    var $phi$544 = e_4848.$2
  } else if(((e_4848.$tag==3)&&("&&"==e_4848.$0))&&((e_4848.$2.$tag==9)&&e_4848.$2.$0)){
    var $phi$544 = e_4848.$1
  } else if((e_4848.$tag==6)&&((e_4848.$0.$tag==9)&&e_4848.$0.$0)){
    var $phi$544 = e_4848.$1
  } else if((e_4848.$tag==6)&&((e_4848.$0.$tag==9)&&(!e_4848.$0.$0))){
    var $phi$544 = e_4848.$2
  } else var $phi$544 = e_4848;
  return $phi$544
};
var rewriteDCE_4846 = function(e_4856){
  if(e_4856.$tag==1){
    var $phi$545 = (JSIndex_4843(rewriteDCE_4846(e_4856.$0)))(rewriteDCE_4846(e_4856.$1))
  } else if(e_4856.$tag==3){
    var $phi$545 = tryDCE_4845(((JSBinOp_4841(e_4856.$0))(rewriteDCE_4846(e_4856.$1)))(rewriteDCE_4846(e_4856.$2)))
  } else if(e_4856.$tag==4){
    var $phi$545 = (JSCall_4840(rewriteDCE_4846(e_4856.$0)))((map(rewriteDCE_4846))(e_4856.$1))
  } else if(e_4856.$tag==5){
    var $phi$545 = (JSFun_4839(e_4856.$0))((concatMap_4802(rewriteStmt_4847))(e_4856.$1))
  } else if(e_4856.$tag==6){
    var $phi$545 = tryDCE_4845(((JSTernary_4838(rewriteDCE_4846(e_4856.$0)))(rewriteDCE_4846(e_4856.$1)))(rewriteDCE_4846(e_4856.$2)))
  } else if(e_4856.$tag==10){
    var $phi$545 = JSObject_4834((map(function(kv_4870){
      var $phi$546 = (Pair_4736(kv_4870.$0))(rewriteDCE_4846(kv_4870.$1));
      return $phi$546
    }))(e_4856.$0))
  } else if(e_4856.$tag==14){
    var $phi$545 = (JSInstanceOf_4830(rewriteDCE_4846(e_4856.$0)))(rewriteDCE_4846(e_4856.$1))
  } else if(e_4856.$tag==15){
    var $phi$545 = (JSNew_4829(rewriteDCE_4846(e_4856.$0)))((map(rewriteDCE_4846))(e_4856.$1))
  } else if(e_4856.$tag==11){
    var $phi$545 = JSArray_4833((map(rewriteDCE_4846))(e_4856.$0))
  } else var $phi$545 = e_4856;
  return $phi$545
};
var rewriteStmt_4847 = function(s_4879){
  if(s_4879.$tag==0){
    var $phi$547 = [JSExpr_4827(rewriteDCE_4846(s_4879.$0))]
  } else if(s_4879.$tag==1){
    var $phi$547 = [JSReturn_4826(rewriteDCE_4846(s_4879.$0))]
  } else if(s_4879.$tag==2){
    var $phi$547 = [(JSVar_4825(s_4879.$0))(rewriteDCE_4846(s_4879.$1))]
  } else if(s_4879.$tag==5){
    var $phi$547 = [(JSAssign_4822(rewriteDCE_4846(s_4879.$0)))(rewriteDCE_4846(s_4879.$1))]
  } else if((s_4879.$tag==6)&&((s_4879.$0.$tag==9)&&s_4879.$0.$0)){
    var $phi$547 = (concatMap_4802(rewriteStmt_4847))(s_4879.$1)
  } else if((s_4879.$tag==6)&&((s_4879.$0.$tag==9)&&(!s_4879.$0.$0))){
    var $phi$547 = (concatMap_4802(rewriteStmt_4847))(s_4879.$2)
  } else if(s_4879.$tag==6){
    var $phi$549 = rewriteDCE_4846(s_4879.$0);
    if(($phi$549.$tag==9)&&$phi$549.$0){
      var $phi$548 = (concatMap_4802(rewriteStmt_4847))(s_4879.$1)
    } else if(($phi$549.$tag==9)&&(!$phi$549.$0)){
      var $phi$548 = (concatMap_4802(rewriteStmt_4847))(s_4879.$2)
    } else var $phi$548 = [((JSIf_4821($phi$549))((concatMap_4802(rewriteStmt_4847))(s_4879.$1)))((concatMap_4802(rewriteStmt_4847))(s_4879.$2))];
    var $phi$547 = $phi$548
  } else var $phi$547 = [s_4879];
  return $phi$547
};
var assert_4895 = assert_85;
var Pair_4896 = Pair_3;
var mapSnd_4897 = mapSnd_84;
var mapFst_4898 = mapFst_83;
var $gt$eq$gt_4899 = $gt$eq$gt_82;
var snd_4900 = snd_23;
var debug2_4901 = debug2_81;
var Just_4902 = Just_1;
var Nothing_4903 = Nothing_2;
var isJust_4904 = isJust_21;
var Empty_4905 = Empty_7;
var Leaf_4906 = Leaf_8;
var Collision_4907 = Collision_9;
var BitmapIndexed_4908 = BitmapIndexed_10;
var $_4909 = $_12;
var fst_4910 = fst_22;
var Left_4911 = Left_4;
var Right_4912 = Right_5;
var loop_4913 = loop_27;
var find_4914 = find_29;
var hamtMask_4915 = hamtMask_58;
var popCount_4916 = popCount_57;
var hamtIndex_4917 = hamtIndex_59;
var lookup_4918 = lookup_60;
var setContains_4919 = setContains_76;
var foldTrie_4920 = foldTrie_66;
var emptySet_4921 = emptySet_72;
var Unit_4922 = Unit_0;
var not_4923 = not_26;
var $div$eq_4924 = $div$eq_13;
var mapIx_4925 = mapIx_30;
var insert_4926 = insert_61;
var setAdd_4927 = setAdd_73;
var setIntersection_4928 = setIntersection_80;
var remove_4929 = remove_63;
var setDiff_4930 = setDiff_79;
var setToArray_4931 = setToArray_78;
var mergeTrie_4932 = mergeTrie_70;
var setUnion_4933 = setUnion_77;
var setRemove_4934 = setRemove_75;
var setAddAll_4935 = setAddAll_74;
var trieKeys_4936 = trieKeys_71;
var size_4937 = size_68;
var mapTrie_4938 = mapTrie_67;
var nodeMask_4939 = nodeMask_56;
var isEmpty_4940 = isEmpty_69;
var filterTrie_4941 = filterTrie_65;
var nextSetBitMask_4942 = nextSetBitMask_64;
var updateOrSet_4943 = updateOrSet_62;
var State_4944 = State_6;
var runState_4945 = runState_54;
var evalState_4946 = evalState_55;
var sets_4947 = sets_53;
var gets_4948 = gets_52;
var foldM_4949 = foldM_49;
var mapM_4950 = mapM_50;
var forM_4951 = forM_51;
var strToArray_4952 = strToArray_48;
var toRecord_4953 = toRecord_47;
var reverse_4954 = reverse_46;
var tail_4955 = tail_41;
var head_4956 = head_40;
var uniq_4957 = uniq_45;
var mergeSet_4958 = mergeSet_44;
var init_4959 = init_43;
var last_4960 = last_42;
var mapJust_4961 = mapJust_39;
var concatMap_4962 = concatMap_38;
var zip_4963 = zip_37;
var zipWithIndex2_4964 = zipWithIndex2_35;
var zipWithIndex_4965 = zipWithIndex_36;
var join_4966 = join_34;
var all_4967 = all_33;
var exists_4968 = exists_32;
var containsChar_4969 = containsChar_31;
var contains_4970 = contains_28;
var either_4971 = either_24;
var splitEither_4972 = splitEither_25;
var fromJust_4973 = fromJust_20;
var justOr_4974 = justOr_19;
var maybe_4975 = maybe_18;
var $gt$gt_4976 = $gt$gt_17;
var $gt$eq_4977 = $gt$eq_16;
var $lt$eq_4978 = $lt$eq_15;
var $gt_4979 = $gt_14;
var Identity_4980 = Identity_11;
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
var JSIf_4981 = JSIf_4698;
var JSAssign_4982 = JSAssign_4697;
var JSBreak_4983 = JSBreak_4696;
var JSSwitch_4984 = JSSwitch_4695;
var JSVar_4985 = JSVar_4694;
var JSReturn_4986 = JSReturn_4693;
var JSExpr_4987 = JSExpr_4692;
var JSSeq_4988 = JSSeq_4691;
var JSNew_4989 = JSNew_4690;
var JSInstanceOf_4990 = JSInstanceOf_4689;
var JSUndefined_4991 = JSUndefined_4688;
var JSNull_4992 = JSNull_4687;
var JSArray_4993 = JSArray_4686;
var JSObject_4994 = JSObject_4685;
var JSBool_4995 = JSBool_4684;
var JSString_4996 = JSString_4683;
var JSNum_4997 = JSNum_4682;
var JSTernary_4998 = JSTernary_4681;
var JSFun_4999 = JSFun_4680;
var JSCall_5000 = JSCall_4679;
var JSBinOp_5001 = JSBinOp_4678;
var JSUnOp_5002 = JSUnOp_4677;
var JSIndex_5003 = JSIndex_4676;
var JSRef_5004 = JSRef_4675;
var printIndent_5010 = function(indent_5081){
  if(0==indent_5081){
    var $phi$550 = ""
  } else var $phi$550 = ($concat("  "))(printIndent_5010(indent_5081-1));
  return $phi$550
};
var paren_5011 = function(s_5083){
  return ($concat(($concat("("))(s_5083)))(")")
};
var jsExprToString_5005 = function(indent_5012){
  return function(e_5013){
    var printParen_5015 = function(e_5017){
      return (jsExprToParenString_5006(indent_5012))(e_5017)
    };
    var print_5014 = function(e_5016){
      return (jsExprToString_5005(indent_5012))(e_5016)
    };
    if(e_5013.$tag==12){
      var $phi$551 = "null"
    } else if(e_5013.$tag==13){
      var $phi$551 = "undefined"
    } else if((e_5013.$tag==9)&&e_5013.$0){
      var $phi$551 = "true"
    } else if((e_5013.$tag==9)&&(!e_5013.$0)){
      var $phi$551 = "false"
    } else if(e_5013.$tag==7){
      var $phi$551 = jsonStringify(e_5013.$0)
    } else if(e_5013.$tag==8){
      var $phi$551 = jsonStringify(e_5013.$0)
    } else if(e_5013.$tag==0){
      var $phi$551 = e_5013.$0
    } else if((e_5013.$tag==1)&&(e_5013.$1.$tag==8)){
      var $phi$553 = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))(e_5013.$1.$0);
      if(""==$phi$553){
        var $phi$552 = ($concat(($concat(($concat(printParen_5015(e_5013.$0)))("[")))(e_5013.$1.$0)))("]")
      } else var $phi$552 = ($concat(($concat(printParen_5015(e_5013.$0)))(".")))($phi$553);
      var $phi$551 = $phi$552
    } else if(e_5013.$tag==1){
      var $phi$551 = ($concat(($concat(($concat(printParen_5015(e_5013.$0)))("[")))(print_5014(e_5013.$1))))("]")
    } else if(e_5013.$tag==2){
      var $phi$551 = ($concat(e_5013.$0))(printParen_5015(e_5013.$1))
    } else if(e_5013.$tag==3){
      var $phi$551 = ($concat(($concat(printParen_5015(e_5013.$1)))(e_5013.$0)))(printParen_5015(e_5013.$2))
    } else if(e_5013.$tag==4){
      var $phi$551 = ($concat(printParen_5015(e_5013.$0)))(paren_5011((intercalate(","))((map(print_5014))(e_5013.$1))))
    } else if(e_5013.$tag==15){
      var $phi$551 = ($concat(($concat("new "))(printParen_5015(e_5013.$0))))(paren_5011((intercalate(","))((map(print_5014))(e_5013.$1))))
    } else if(e_5013.$tag==5){
      var $phi$551 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat("function("))((intercalate(","))(e_5013.$0))))("){\n")))(printIndent_5010(indent_5012+1))))((intercalate(($concat(";\n"))(printIndent_5010(indent_5012+1))))((map(jsStmtToString_5008(indent_5012+1)))(e_5013.$1)))))("\n")))(printIndent_5010(indent_5012))))("}")
    } else if(e_5013.$tag==6){
      var $phi$551 = ($concat(($concat(($concat(($concat(printParen_5015(e_5013.$0)))("?")))(printParen_5015(e_5013.$1))))(":")))(printParen_5015(e_5013.$2))
    } else if(e_5013.$tag==10){
      var $phi$551 = ($concat(($concat("{"))((intercalate(","))((map(keyValueToString_5007(indent_5012)))(e_5013.$0)))))("}")
    } else if(e_5013.$tag==11){
      var $phi$551 = ($concat(($concat("["))((intercalate(","))((map(print_5014))(e_5013.$0)))))("]")
    } else if(e_5013.$tag==14){
      var $phi$551 = ($concat(($concat(printParen_5015(e_5013.$0)))(" instanceof ")))(printParen_5015(e_5013.$1))
    } else if(e_5013.$tag==16){
      var $phi$551 = (intercalate(","))((map(print_5014))(e_5013.$0))
    } else var $phi$551 = error(e_5013);
    return $phi$551
  }
};
var jsExprToParenString_5006 = function(indent_5046){
  return function(e_5047){
    if(e_5047.$tag==0){
      var $phi$554 = (jsExprToString_5005(indent_5046))(e_5047)
    } else if(e_5047.$tag==7){
      var $phi$554 = (jsExprToString_5005(indent_5046))(e_5047)
    } else if(e_5047.$tag==8){
      var $phi$554 = (jsExprToString_5005(indent_5046))(e_5047)
    } else if(e_5047.$tag==9){
      var $phi$554 = (jsExprToString_5005(indent_5046))(e_5047)
    } else if(e_5047.$tag==1){
      var $phi$554 = (jsExprToString_5005(indent_5046))(e_5047)
    } else if(e_5047.$tag==15){
      var $phi$554 = (jsExprToString_5005(indent_5046))(e_5047)
    } else if(e_5047.$tag==10){
      var $phi$554 = (jsExprToString_5005(indent_5046))(e_5047)
    } else var $phi$554 = paren_5011((jsExprToString_5005(indent_5046))(e_5047));
    return $phi$554
  }
};
var keyValueToString_5007 = function(indent_5058){
  return function(kv_5059){
    var $phi$555 = ($concat(($concat(kv_5059.$0))(":")))((jsExprToString_5005(indent_5058))(kv_5059.$1));
    return $phi$555
  }
};
var jsStmtToString_5008 = function(indent_5062){
  return function(s_5063){
    if(s_5063.$tag==0){
      var $phi$556 = (jsExprToString_5005(indent_5062))(s_5063.$0)
    } else if(s_5063.$tag==1){
      var $phi$556 = ($concat("return "))((jsExprToString_5005(indent_5062))(s_5063.$0))
    } else if(s_5063.$tag==2){
      var $phi$556 = ($concat(($concat(($concat("var "))(s_5063.$0)))(" = ")))((jsExprToString_5005(indent_5062))(s_5063.$1))
    } else if(s_5063.$tag==4){
      var $phi$556 = "break"
    } else if(s_5063.$tag==3){
      var $phi$556 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat("switch"))(paren_5011((jsExprToString_5005(indent_5062))(s_5063.$0)))))("{\n")))(printIndent_5010(indent_5062+1))))((intercalate(($concat(";\n"))(printIndent_5010(indent_5062+1))))((map(caseToString_5009(indent_5062+1)))(s_5063.$1)))))("\n")))(printIndent_5010(indent_5062))))("}")
    } else if(s_5063.$tag==5){
      var $phi$556 = ($concat(($concat((jsExprToParenString_5006(indent_5062))(s_5063.$0)))(" = ")))((jsExprToParenString_5006(indent_5062))(s_5063.$1))
    } else if(s_5063.$tag==6){
      var $phi$558 = length(s_5063.$2);
      if(1==$phi$558){
        var $phi$557 = (jsStmtToString_5008(indent_5062))((getIx(0))(s_5063.$2))
      } else var $phi$557 = ($concat(($concat(($concat(($concat(($concat("{\n"))(printIndent_5010(indent_5062+1))))((intercalate(($concat(";\n"))(printIndent_5010(indent_5062+1))))((map(jsStmtToString_5008(indent_5062+1)))(s_5063.$2)))))("\n")))(printIndent_5010(indent_5062))))("}");
      var els_5075 = $phi$557;
      var $phi$556 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat(($concat("if("))((jsExprToString_5005(indent_5062))(s_5063.$0))))("){\n")))(printIndent_5010(indent_5062+1))))((intercalate(($concat(";\n"))(printIndent_5010(indent_5062+1))))((map(jsStmtToString_5008(indent_5062+1)))(s_5063.$1)))))("\n")))(printIndent_5010(indent_5062))))("} else ")))(els_5075)
    } else error("pattern match fail",s_5063);
    return $phi$556
  }
};
var caseToString_5009 = function(indent_5077){
  return function(c_5078){
    var $phi$559 = ($concat(($concat(($concat(($concat("case "))(paren_5011((jsExprToString_5005(indent_5077))(c_5078.$0)))))(":\n")))(printIndent_5010(indent_5077+1))))((intercalate(($concat(";\n"))(printIndent_5010(indent_5077+1))))((map(jsStmtToString_5008(indent_5077)))(c_5078.$1)));
    return $phi$559
  }
};
var assert_5084 = assert_85;
var Pair_5085 = Pair_3;
var mapSnd_5086 = mapSnd_84;
var mapFst_5087 = mapFst_83;
var $gt$eq$gt_5088 = $gt$eq$gt_82;
var snd_5089 = snd_23;
var debug2_5090 = debug2_81;
var Just_5091 = Just_1;
var Nothing_5092 = Nothing_2;
var isJust_5093 = isJust_21;
var Empty_5094 = Empty_7;
var Leaf_5095 = Leaf_8;
var Collision_5096 = Collision_9;
var BitmapIndexed_5097 = BitmapIndexed_10;
var $_5098 = $_12;
var fst_5099 = fst_22;
var Left_5100 = Left_4;
var Right_5101 = Right_5;
var loop_5102 = loop_27;
var find_5103 = find_29;
var hamtMask_5104 = hamtMask_58;
var popCount_5105 = popCount_57;
var hamtIndex_5106 = hamtIndex_59;
var lookup_5107 = lookup_60;
var setContains_5108 = setContains_76;
var foldTrie_5109 = foldTrie_66;
var emptySet_5110 = emptySet_72;
var Unit_5111 = Unit_0;
var not_5112 = not_26;
var $div$eq_5113 = $div$eq_13;
var mapIx_5114 = mapIx_30;
var insert_5115 = insert_61;
var setAdd_5116 = setAdd_73;
var setIntersection_5117 = setIntersection_80;
var remove_5118 = remove_63;
var setDiff_5119 = setDiff_79;
var setToArray_5120 = setToArray_78;
var mergeTrie_5121 = mergeTrie_70;
var setUnion_5122 = setUnion_77;
var setRemove_5123 = setRemove_75;
var setAddAll_5124 = setAddAll_74;
var trieKeys_5125 = trieKeys_71;
var size_5126 = size_68;
var mapTrie_5127 = mapTrie_67;
var nodeMask_5128 = nodeMask_56;
var isEmpty_5129 = isEmpty_69;
var filterTrie_5130 = filterTrie_65;
var nextSetBitMask_5131 = nextSetBitMask_64;
var updateOrSet_5132 = updateOrSet_62;
var State_5133 = State_6;
var runState_5134 = runState_54;
var evalState_5135 = evalState_55;
var sets_5136 = sets_53;
var gets_5137 = gets_52;
var foldM_5138 = foldM_49;
var mapM_5139 = mapM_50;
var forM_5140 = forM_51;
var strToArray_5141 = strToArray_48;
var toRecord_5142 = toRecord_47;
var reverse_5143 = reverse_46;
var tail_5144 = tail_41;
var head_5145 = head_40;
var uniq_5146 = uniq_45;
var mergeSet_5147 = mergeSet_44;
var init_5148 = init_43;
var last_5149 = last_42;
var mapJust_5150 = mapJust_39;
var concatMap_5151 = concatMap_38;
var zip_5152 = zip_37;
var zipWithIndex2_5153 = zipWithIndex2_35;
var zipWithIndex_5154 = zipWithIndex_36;
var join_5155 = join_34;
var all_5156 = all_33;
var exists_5157 = exists_32;
var containsChar_5158 = containsChar_31;
var contains_5159 = contains_28;
var either_5160 = either_24;
var splitEither_5161 = splitEither_25;
var fromJust_5162 = fromJust_20;
var justOr_5163 = justOr_19;
var maybe_5164 = maybe_18;
var $gt$gt_5165 = $gt$gt_17;
var $gt$eq_5166 = $gt$eq_16;
var $lt$eq_5167 = $lt$eq_15;
var $gt_5168 = $gt_14;
var Identity_5169 = Identity_11;
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
var App_5170 = App_731;
var Lam_5171 = Lam_732;
var Case_5172 = Case_733;
var Let_5173 = Let_734;
var New_5174 = New_735;
var breakableDownAndUpM_5175 = breakableDownAndUpM_780;
var breakableDownM_5176 = breakableDownM_784;
var downAndUpM_5177 = downAndUpM_781;
var downM_5178 = downM_783;
var upM_5179 = upM_782;
var breakableDownAndUp_5180 = breakableDownAndUp_775;
var breakableDown_5181 = breakableDown_779;
var downAndUp_5182 = downAndUp_776;
var down_5183 = down_778;
var up_5184 = up_777;
var AnnType_5185 = AnnType_723;
var TUnknown_5186 = TUnknown_754;
var getAnn_5187 = getAnn_759;
var getAnnType_5188 = getAnnType_762;
var Var_5189 = Var_729;
var Const_5190 = Const_730;
var annOf_5191 = annOf_772;
var getType_5192 = getType_774;
var withAnn_5193 = withAnn_773;
var setAnn_5194 = setAnn_760;
var setAnnType_5195 = setAnnType_763;
var setType_5196 = setType_771;
var Data_5197 = Data_743;
var DataCon_5198 = DataCon_744;
var dataConName_5199 = dataConName_769;
var dataConNames_5200 = dataConNames_770;
var TCBound_5201 = TCBound_747;
var TConst_5202 = TConst_748;
var TVar_5203 = TVar_749;
var TApp_5204 = TApp_750;
var TRow_5205 = TRow_751;
var TBot_5206 = TBot_752;
var TForall_5207 = TForall_753;
var equivBound_5208 = equivBound_767;
var equivType_5209 = equivType_768;
var AnnCodeLoc_5210 = AnnCodeLoc_724;
var printCodeLoc_5211 = printCodeLoc_766;
var setAnnCodeLoc_5212 = setAnnCodeLoc_765;
var getAnnCodeLoc_5213 = getAnnCodeLoc_764;
var copyAnn_5214 = copyAnn_761;
var emptyAnn_5215 = emptyAnn_758;
var ImportAll_5216 = ImportAll_757;
var ImportOpen_5217 = ImportOpen_756;
var ImportClosed_5218 = ImportClosed_755;
var Instance_5219 = Instance_746;
var Class_5220 = Class_745;
var ModuleInterface_5221 = ModuleInterface_742;
var Module_5222 = Module_741;
var PData_5223 = PData_740;
var PConst_5224 = PConst_739;
var PVar_5225 = PVar_738;
var CStr_5226 = CStr_737;
var CNum_5227 = CNum_736;
var AnnExport_5228 = AnnExport_728;
var AnnTag_5229 = AnnTag_727;
var AnnData_5230 = AnnData_726;
var AnnUseCount_5231 = AnnUseCount_725;
var JSIf_5232 = JSIf_4698;
var JSAssign_5233 = JSAssign_4697;
var JSBreak_5234 = JSBreak_4696;
var JSSwitch_5235 = JSSwitch_4695;
var JSVar_5236 = JSVar_4694;
var JSReturn_5237 = JSReturn_4693;
var JSExpr_5238 = JSExpr_4692;
var JSSeq_5239 = JSSeq_4691;
var JSNew_5240 = JSNew_4690;
var JSInstanceOf_5241 = JSInstanceOf_4689;
var JSUndefined_5242 = JSUndefined_4688;
var JSNull_5243 = JSNull_4687;
var JSArray_5244 = JSArray_4686;
var JSObject_5245 = JSObject_4685;
var JSBool_5246 = JSBool_4684;
var JSString_5247 = JSString_4683;
var JSNum_5248 = JSNum_4682;
var JSTernary_5249 = JSTernary_4681;
var JSFun_5250 = JSFun_4680;
var JSCall_5251 = JSCall_4679;
var JSBinOp_5252 = JSBinOp_4678;
var JSUnOp_5253 = JSUnOp_4677;
var JSIndex_5254 = JSIndex_4676;
var JSRef_5255 = JSRef_4675;
var RewriteState_5256 = function($_0_5277){
  return function($_1_5278){
    return function($_2_5279){
      return function($_3_5280){
        return {$0:$_0_5277,$1:$_1_5278,$2:$_2_5279,$3:$_3_5280}
      }
    }
  }
};
var opChar_5276 = function(c_5523){
  if("-"==c_5523){
    var $phi$560 = "$mns"
  } else if("+"==c_5523){
    var $phi$560 = "$pls"
  } else if("*"==c_5523){
    var $phi$560 = "$mul"
  } else if("/"==c_5523){
    var $phi$560 = "$div"
  } else if("="==c_5523){
    var $phi$560 = "$eq"
  } else if(":"==c_5523){
    var $phi$560 = "$col"
  } else if("&"==c_5523){
    var $phi$560 = "$amp"
  } else if("|"==c_5523){
    var $phi$560 = "$pip"
  } else if("<"==c_5523){
    var $phi$560 = "$lt"
  } else if(">"==c_5523){
    var $phi$560 = "$gt"
  } else if("^"==c_5523){
    var $phi$560 = "$rof"
  } else var $phi$560 = c_5523;
  return $phi$560
};
var opName_5275 = function(op_5519){
  if("+"==op_5519){
    var $phi$561 = "$add"
  } else if("-"==op_5519){
    var $phi$561 = "$del"
  } else if("*"==op_5519){
    var $phi$561 = "$mul"
  } else if("&&"==op_5519){
    var $phi$561 = "$and"
  } else if("||"==op_5519){
    var $phi$561 = "$or"
  } else if("++"==op_5519){
    var $phi$561 = "$concat"
  } else var $phi$561 = ((foldl(function(s_5521){
    return function(c_5522){
      return ($concat(s_5521))(opChar_5276(c_5522))
    }
  }))(""))(strToArray_5141(op_5519));
  return $phi$561
};
var processPattern_5268 = function(cons_5443){
  return function(pm_5444){
    return function(p_5445){
      if((p_5445.$tag==0)&&("_"==p_5445.$1)){
        var $phi$562 = (Pair_5085(JSBool_5246(true)))((Pair_5085([]))([]))
      } else if(p_5445.$tag==0){
        var $phi$562 = (Pair_5085(JSBool_5246(true)))((Pair_5085([opName_5275(p_5445.$1)]))([pm_5444]))
      } else if((p_5445.$tag==1)&&(p_5445.$1.$tag==0)){
        var $phi$562 = (Pair_5085(((JSBinOp_5252("=="))(JSNum_5248(p_5445.$1.$0)))(pm_5444)))((Pair_5085([]))([]))
      } else if((p_5445.$tag==1)&&(p_5445.$1.$tag==1)){
        var $phi$562 = (Pair_5085(((JSBinOp_5252("=="))(JSString_5247(p_5445.$1.$0)))(pm_5444)))((Pair_5085([]))([]))
      } else if((p_5445.$tag==2)&&("True"==p_5445.$1)){
        var $phi$562 = (Pair_5085(pm_5444))((Pair_5085([]))([]))
      } else if((p_5445.$tag==2)&&("False"==p_5445.$1)){
        var $phi$562 = (Pair_5085((JSUnOp_5253("!"))(pm_5444)))((Pair_5085([]))([]))
      } else if(p_5445.$tag==2){
        var $phi$564 = (((lookup_5107($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_5445.$1))(cons_5443);
        if(($phi$564.$tag==0)&&($phi$564.$0.$tag==1)){
          var $phi$563 = JSBool_5246(true)
        } else if(($phi$564.$tag==0)&&($phi$564.$0.$tag==0)){
          var $phi$563 = ((JSBinOp_5252("=="))((JSIndex_5254(pm_5444))(JSString_5247("$tag"))))(JSNum_5248($phi$564.$0.$0))
        } else var $phi$563 = error(($concat("unknown data type in code gen: "))(p_5445.$1));
        var tagCheck_5460 = $phi$563;
        var $phi$562 = ((foldl(function(a_5463){
          return function(b_5464){
            var $phi$566 = (Pair_5085(((JSBinOp_5252("&&"))(a_5463.$0))(b_5464.$0)))((Pair_5085((concat(a_5463.$1.$0))(b_5464.$1.$0)))((concat(a_5463.$1.$1))(b_5464.$1.$1)));
            var $phi$565 = $phi$566;
            return $phi$565
          }
        }))((Pair_5085(tagCheck_5460))((Pair_5085([]))([]))))((map(function(p_5471){
          var $phi$567 = ((processPattern_5268(cons_5443))((JSIndex_5254(pm_5444))(JSString_5247(($concat("$"))(intToString(p_5471.$0))))))(p_5471.$1);
          return $phi$567
        }))(zipWithIndex_5154(p_5445.$2)))
      } else var $phi$562 = error("failure to match pattern during processing");
      return $phi$562
    }
  }
};
var addStmt_5258 = function(stmt_5286){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_5137))(function(s_5287){
    var $phi$568 = sets_5136((((RewriteState_5256(s_5287.$0))(s_5287.$1))((push(stmt_5286))(s_5287.$2)))(s_5287.$3));
    return $phi$568
  })
};
var addVar_5259 = function(n_5292){
  return function(e_5293){
    return addStmt_5258((JSVar_5236(opName_5275(n_5292)))(e_5293))
  }
};
var newPhi_5260 = (($gt$gt$eq($import1$instance$Monad$11))(gets_5137))(function(s_5294){
  var $phi$569 = (($gt$gt_5165($import1$instance$Monad$11))(sets_5136((((RewriteState_5256(s_5294.$0))(s_5294.$1))(s_5294.$2))(s_5294.$3+1))))((ret($import1$instance$Monad$11))(($concat("$phi$"))(intToString(s_5294.$3))));
  return $phi$569
});
var getRep_5263 = function(n_5325){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_5137))(function(s_5326){
    var $phi$570 = (ret($import1$instance$Monad$11))((((lookup_5107($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_5325))(s_5326.$1));
    return $phi$570
  })
};
var getCons_5264 = (($gt$gt$eq($import1$instance$Monad$11))(gets_5137))(function(s_5331){
  var $phi$571 = (ret($import1$instance$Monad$11))(s_5331.$0);
  return $phi$571
});
var dataConFieldIds_5272 = function(ts_5485){
  return (map(function(p_5486){
    return ($concat("$"))(intToString(fst_5099(p_5486)))
  }))(zipWithIndex_5154(ts_5485))
};
var withRep_5262 = function(rep_5312){
  return function(m_5313){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_5137))(function(s_5314){
      var $phi$572 = (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_5165($import1$instance$Monad$11))(sets_5136((((RewriteState_5256(s_5314.$0))((((mergeTrie_5121($import1$instance$Hashable$13))($import1$instance$Eq$1))(s_5314.$1))(rep_5312)))(s_5314.$2))(s_5314.$3))))(m_5313)))(function(r_5319){
        return (($gt$gt$eq($import1$instance$Monad$11))(gets_5137))(function(s_5320){
          var $phi$573 = (($gt$gt_5165($import1$instance$Monad$11))(sets_5136((((RewriteState_5256(s_5320.$0))(s_5314.$1))(s_5320.$2))(s_5320.$3))))((ret($import1$instance$Monad$11))(r_5319));
          return $phi$573
        })
      });
      return $phi$572
    })
  }
};
var binOp2_5257 = function(op_5281){
  return function(a_5282){
    return function(b_5283){
      return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5265(a_5282)))(function(a_5284){
        return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5265(b_5283)))(function(b_5285){
          return (ret($import1$instance$Monad$11))(((JSBinOp_5252(op_5281))(a_5284))(b_5285))
        })
      })
    }
  }
};
var rewriteExprToStmts_5261 = function(w_5299){
  return function(e_5300){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_5137))(function(s_5301){
      var $phi$574 = (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_5165($import1$instance$Monad$11))(sets_5136((((RewriteState_5256(s_5301.$0))(s_5301.$1))([]))(s_5301.$3))))(rewriteExpr_5265(e_5300))))(function(e_5306){
        return (($gt$gt$eq($import1$instance$Monad$11))(gets_5137))(function(s_5307){
          var $phi$575 = (($gt$gt_5165($import1$instance$Monad$11))(sets_5136((((RewriteState_5256(s_5307.$0))(s_5307.$1))(s_5301.$2))(s_5307.$3))))((ret($import1$instance$Monad$11))((push(w_5299(e_5306)))(s_5307.$2)));
          return $phi$575
        })
      });
      return $phi$574
    })
  }
};
var rewriteExpr_5265 = function(e_5336){
  if((e_5336.$tag==0)&&("True"==e_5336.$1)){
    var $phi$576 = (ret($import1$instance$Monad$11))(JSBool_5246(true))
  } else if((e_5336.$tag==0)&&("False"==e_5336.$1)){
    var $phi$576 = (ret($import1$instance$Monad$11))(JSBool_5246(false))
  } else if(e_5336.$tag==0){
    var $phi$576 = (($gt$gt$eq($import1$instance$Monad$11))(getRep_5263(opName_5275(e_5336.$1))))(function(r_5341){
      if(r_5341.$tag==1){
        var $phi$581 = (ret($import1$instance$Monad$11))(JSRef_5255(opName_5275(e_5336.$1)))
      } else if(r_5341.$tag==0){
        var $phi$581 = (ret($import1$instance$Monad$11))(r_5341.$0)
      } else error("pattern match fail",r_5341);
      return $phi$581
    })
  } else if((e_5336.$tag==1)&&(e_5336.$1.$tag==0)){
    var $phi$576 = (ret($import1$instance$Monad$11))(JSNum_5248(e_5336.$1.$0))
  } else if((e_5336.$tag==1)&&(e_5336.$1.$tag==1)){
    var $phi$576 = (ret($import1$instance$Monad$11))(JSString_5247(e_5336.$1.$0))
  } else if((e_5336.$tag==2)&&((e_5336.$1.$tag==2)&&((e_5336.$1.$1.$tag==0)&&("+"==e_5336.$1.$1.$1)))){
    var $phi$576 = ((binOp2_5257("+"))(e_5336.$1.$2))(e_5336.$2)
  } else if((e_5336.$tag==2)&&((e_5336.$1.$tag==2)&&((e_5336.$1.$1.$tag==0)&&("-"==e_5336.$1.$1.$1)))){
    var $phi$576 = ((binOp2_5257("-"))(e_5336.$1.$2))(e_5336.$2)
  } else if((e_5336.$tag==2)&&((e_5336.$1.$tag==2)&&((e_5336.$1.$1.$tag==0)&&("*"==e_5336.$1.$1.$1)))){
    var $phi$576 = ((binOp2_5257("*"))(e_5336.$1.$2))(e_5336.$2)
  } else if((e_5336.$tag==2)&&((e_5336.$1.$tag==2)&&((e_5336.$1.$1.$tag==0)&&("jsLt"==e_5336.$1.$1.$1)))){
    var $phi$576 = ((binOp2_5257("<"))(e_5336.$1.$2))(e_5336.$2)
  } else if((e_5336.$tag==2)&&((e_5336.$1.$tag==2)&&((e_5336.$1.$1.$tag==0)&&("jsEq"==e_5336.$1.$1.$1)))){
    var $phi$576 = ((binOp2_5257("==="))(e_5336.$1.$2))(e_5336.$2)
  } else if((e_5336.$tag==2)&&((e_5336.$1.$tag==2)&&((e_5336.$1.$1.$tag==0)&&("bitAnd"==e_5336.$1.$1.$1)))){
    var $phi$576 = ((binOp2_5257("&"))(e_5336.$1.$2))(e_5336.$2)
  } else if((e_5336.$tag==2)&&((e_5336.$1.$tag==2)&&((e_5336.$1.$1.$tag==0)&&("bitOr"==e_5336.$1.$1.$1)))){
    var $phi$576 = ((binOp2_5257("|"))(e_5336.$1.$2))(e_5336.$2)
  } else if((e_5336.$tag==2)&&((e_5336.$1.$tag==2)&&((e_5336.$1.$1.$tag==0)&&("bitShiftLeft"==e_5336.$1.$1.$1)))){
    var $phi$576 = ((binOp2_5257("<<"))(e_5336.$1.$2))(e_5336.$2)
  } else if((e_5336.$tag==2)&&((e_5336.$1.$tag==2)&&((e_5336.$1.$1.$tag==0)&&("bitShiftRight"==e_5336.$1.$1.$1)))){
    var $phi$576 = ((binOp2_5257(">>>"))(e_5336.$1.$2))(e_5336.$2)
  } else if(e_5336.$tag==2){
    var $phi$576 = (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5265(e_5336.$1)))(function(f_5395){
      return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5265(e_5336.$2)))(function(a_5396){
        return (ret($import1$instance$Monad$11))((JSCall_5251(f_5395))([a_5396]))
      })
    })
  } else if(e_5336.$tag==3){
    var $phi$576 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExprToStmts_5261(JSReturn_5237))(e_5336.$2)))(function(stmts_5400){
      return (ret($import1$instance$Monad$11))((JSFun_5250([e_5336.$1]))(stmts_5400))
    })
  } else if(e_5336.$tag==4){
    var $phi$576 = (($gt$gt$eq($import1$instance$Monad$11))(newPhi_5260))(function(phiOut_5404){
      return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5265(e_5336.$1)))(function(e_5405){
        if(e_5405.$tag==0){
          var $phi$580 = (ret($import1$instance$Monad$11))(e_5405)
        } else if(e_5405.$tag==1){
          var $phi$580 = (ret($import1$instance$Monad$11))(e_5405)
        } else var $phi$580 = (($gt$gt$eq($import1$instance$Monad$11))(newPhi_5260))(function(p_5410){
          return (($gt$gt_5165($import1$instance$Monad$11))((addVar_5259(p_5410))(e_5405)))((ret($import1$instance$Monad$11))(JSRef_5255(p_5410)))
        });
        return (($gt$gt$eq($import1$instance$Monad$11))($phi$580))(function(phiIn_5411){
          return (($gt$gt_5165($import1$instance$Monad$11))((($gt$gt$eq($import1$instance$Monad$11))((((foldM_5138($import1$instance$Monad$11))((assemblePatternMatch2_5266(phiIn_5411))(phiOut_5404)))(JSExpr_5238((JSCall_5251(JSRef_5255("error")))([JSString_5247("pattern match fail"),phiIn_5411]))))(reverse_5143(e_5336.$2))))(addStmt_5258)))((ret($import1$instance$Monad$11))(JSRef_5255(phiOut_5404)))
        })
      })
    })
  } else if(e_5336.$tag==5){
    var $phi$576 = (($gt$gt_5165($import1$instance$Monad$11))(((mapM_5139($import1$instance$Monad$11))(function(d_5415){
      var $phi$579 = (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5265(d_5415.$1)))(addVar_5259(d_5415.$0));
      return $phi$579
    }))(e_5336.$1)))(rewriteExpr_5265(e_5336.$2))
  } else if((e_5336.$tag==6)&&("Array"==e_5336.$1)){
    var $phi$576 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_5139($import1$instance$Monad$11))(rewriteExpr_5265))(e_5336.$2)))(function(es_5420){
      return (ret($import1$instance$Monad$11))(JSArray_5244(es_5420))
    })
  } else if(e_5336.$tag==6){
    var $phi$576 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_5139($import1$instance$Monad$11))(rewriteExpr_5265))(e_5336.$2)))(function(es_5424){
      return (($gt$gt$eq($import1$instance$Monad$11))(getCons_5264))(function(cons_5425){
        var $phi$578 = (((lookup_5107($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_5336.$1))(cons_5425);
        if($phi$578.$tag==1){
          var $phi$577 = error(($concat("unrecognized tag in New: "))(e_5336.$1))
        } else if(($phi$578.$tag==0)&&($phi$578.$0.$tag==1)){
          var $phi$577 = (ret($import1$instance$Monad$11))(JSObject_5245((zip_5152(dataConFieldIds_5272(es_5424)))(es_5424)))
        } else if(($phi$578.$tag==0)&&($phi$578.$0.$tag==0)){
          var $phi$577 = (ret($import1$instance$Monad$11))(JSObject_5245((push((Pair_5085("$tag"))(JSNum_5248($phi$578.$0.$0))))((zip_5152(dataConFieldIds_5272(es_5424)))(es_5424))))
        } else error("pattern match fail",$phi$578);
        return $phi$577
      })
    })
  } else error("pattern match fail",e_5336);
  return $phi$576
};
var assemblePatternMatch2_5266 = function(phiIn_5427){
  return function(phiOut_5428){
    return function(alt_5429){
      return function(p_5430){
        return (($gt$gt$eq($import1$instance$Monad$11))(getCons_5264))(function(cons_5431){
          var $phi$584 = ((processPattern_5268(cons_5431))(phiIn_5427))(p_5430.$0);
          var rep_5437 = ((foldl(function(r_5438){
            return function(p_5439){
              return ((((insert_5115($import1$instance$Hashable$13))($import1$instance$Eq$1))(fst_5099(p_5439)))(snd_5089(p_5439)))(r_5438)
            }
          }))(Empty_5094))((zip_5152($phi$584.$1.$0))($phi$584.$1.$1));
          var $phi$583 = (($gt$gt$eq($import1$instance$Monad$11))((withRep_5262(rep_5437))((rewriteExprToStmts_5261(JSVar_5236(phiOut_5428)))(p_5430.$1))))(function(stmts_5440){
            return (ret($import1$instance$Monad$11))(((JSIf_5232($phi$584.$0))(stmts_5440))([alt_5429]))
          });
          var $phi$582 = $phi$583;
          return $phi$582
        })
      }
    }
  }
};
var requireExpr_5269 = function(f_5475){
  return (JSCall_5251(JSRef_5255("_require")))([JSString_5247(f_5475)])
};
var buildImports_5270 = function(f_5476){
  return function(ns_5477){
    return (map(function(n_5478){
      var $phi$585 = (JSVar_5236(opName_5275(n_5478.$1)))((JSIndex_5254(requireExpr_5269(f_5476)))(JSString_5247(opName_5275(n_5478.$0))));
      return $phi$585
    }))(ns_5477)
  }
};
var importToJs_5271 = function(i_5481){
  if(i_5481.$tag==1){
    var $phi$586 = (buildImports_5270(i_5481.$1))(i_5481.$2)
  } else error("pattern match fail",i_5481);
  return $phi$586
};
var exportObject_5273 = function(bs_5487){
  var f_5488 = function(b_5489){
    var $phi$589 = (((getAnn_5187($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_5191(b_5489.$1));
    if($phi$589.$tag==1){
      var $phi$588 = Nothing_5092
    } else if(($phi$589.$tag==0)&&($phi$589.$0.$tag==5)){
      var $phi$588 = Just_5091((Pair_5085(opName_5275($phi$589.$0.$0)))(JSRef_5255(opName_5275(b_5489.$0))))
    } else error("pattern match fail",$phi$589);
    var $phi$587 = $phi$588;
    return $phi$587
  };
  return JSObject_5245((mapJust_5150(f_5488))(bs_5487))
};
var moduleToJs_5274 = function(m_5493){
  var f_5512 = function(p_5513){
    var $phi$591 = not_5112(isJust_5093((((getAnn_5187($import1$instance$Hashable$13))($import1$instance$Eq$1))("dead"))(annOf_5191(p_5513.$1))));
    return $phi$591
  };
  var vs2_5504 = (filter(f_5512))(m_5493.$6);
  var exportDef_5506 = (JSVar_5236("exports"))(exportObject_5273(vs2_5504));
  var gatherCons_5502 = function(local$instance$Hashable$1){
    return function(local$instance$Eq$0){
      return function(m_5507){
        return function(d_5508){
          var $phi$594 = (((getAnn_5187($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(annOf_5191(d_5508.$1));
          if($phi$594.$tag==1){
            var $phi$593 = m_5507
          } else if(($phi$594.$tag==0)&&($phi$594.$0.$tag==3)){
            var $phi$593 = ((((insert_5115(local$instance$Hashable$1))(local$instance$Eq$0))(d_5508.$0))($phi$594.$0.$0))(m_5507)
          } else error("pattern match fail",$phi$594);
          var $phi$592 = $phi$593;
          return $phi$592
        }
      }
    }
  };
  var cons_5503 = ((foldl((gatherCons_5502($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_5094))(m_5493.$6);
  var defs_5505 = ($_5098(foldl1(concat)))((evalState_5135((((RewriteState_5256(cons_5503))(Empty_5094))([]))(0)))(((mapM_5139($import1$instance$Monad$11))(function(v_5516){
    var $phi$595 = (rewriteExprToStmts_5261(JSVar_5236(opName_5275(v_5516.$0))))(v_5516.$1);
    return $phi$595
  }))(vs2_5504)));
  var imports_5501 = (concatMap_5151(importToJs_5271))(m_5493.$2);
  var $phi$590 = (push(exportDef_5506))((concat(imports_5501))(defs_5505));
  return $phi$590
};
var checkUndefined_5267 = function(label_5441){
  return function(expr_5442){
    return ((JSTernary_5249(((JSBinOp_5252("==="))(expr_5442))(JSUndefined_5242)))((JSCall_5251(JSRef_5255("error")))([JSString_5247(label_5441)])))(expr_5442)
  }
};
var assert_5525 = assert_85;
var Pair_5526 = Pair_3;
var mapSnd_5527 = mapSnd_84;
var mapFst_5528 = mapFst_83;
var $gt$eq$gt_5529 = $gt$eq$gt_82;
var snd_5530 = snd_23;
var debug2_5531 = debug2_81;
var Just_5532 = Just_1;
var Nothing_5533 = Nothing_2;
var isJust_5534 = isJust_21;
var Empty_5535 = Empty_7;
var Leaf_5536 = Leaf_8;
var Collision_5537 = Collision_9;
var BitmapIndexed_5538 = BitmapIndexed_10;
var $_5539 = $_12;
var fst_5540 = fst_22;
var Left_5541 = Left_4;
var Right_5542 = Right_5;
var loop_5543 = loop_27;
var find_5544 = find_29;
var hamtMask_5545 = hamtMask_58;
var popCount_5546 = popCount_57;
var hamtIndex_5547 = hamtIndex_59;
var lookup_5548 = lookup_60;
var setContains_5549 = setContains_76;
var foldTrie_5550 = foldTrie_66;
var emptySet_5551 = emptySet_72;
var Unit_5552 = Unit_0;
var not_5553 = not_26;
var $div$eq_5554 = $div$eq_13;
var mapIx_5555 = mapIx_30;
var insert_5556 = insert_61;
var setAdd_5557 = setAdd_73;
var setIntersection_5558 = setIntersection_80;
var remove_5559 = remove_63;
var setDiff_5560 = setDiff_79;
var setToArray_5561 = setToArray_78;
var mergeTrie_5562 = mergeTrie_70;
var setUnion_5563 = setUnion_77;
var setRemove_5564 = setRemove_75;
var setAddAll_5565 = setAddAll_74;
var trieKeys_5566 = trieKeys_71;
var size_5567 = size_68;
var mapTrie_5568 = mapTrie_67;
var nodeMask_5569 = nodeMask_56;
var isEmpty_5570 = isEmpty_69;
var filterTrie_5571 = filterTrie_65;
var nextSetBitMask_5572 = nextSetBitMask_64;
var updateOrSet_5573 = updateOrSet_62;
var State_5574 = State_6;
var runState_5575 = runState_54;
var evalState_5576 = evalState_55;
var sets_5577 = sets_53;
var gets_5578 = gets_52;
var foldM_5579 = foldM_49;
var mapM_5580 = mapM_50;
var forM_5581 = forM_51;
var strToArray_5582 = strToArray_48;
var toRecord_5583 = toRecord_47;
var reverse_5584 = reverse_46;
var tail_5585 = tail_41;
var head_5586 = head_40;
var uniq_5587 = uniq_45;
var mergeSet_5588 = mergeSet_44;
var init_5589 = init_43;
var last_5590 = last_42;
var mapJust_5591 = mapJust_39;
var concatMap_5592 = concatMap_38;
var zip_5593 = zip_37;
var zipWithIndex2_5594 = zipWithIndex2_35;
var zipWithIndex_5595 = zipWithIndex_36;
var join_5596 = join_34;
var all_5597 = all_33;
var exists_5598 = exists_32;
var containsChar_5599 = containsChar_31;
var contains_5600 = contains_28;
var either_5601 = either_24;
var splitEither_5602 = splitEither_25;
var fromJust_5603 = fromJust_20;
var justOr_5604 = justOr_19;
var maybe_5605 = maybe_18;
var $gt$gt_5606 = $gt$gt_17;
var $gt$eq_5607 = $gt$eq_16;
var $lt$eq_5608 = $lt$eq_15;
var $gt_5609 = $gt_14;
var Identity_5610 = Identity_11;
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
var moduleToJs_5611 = moduleToJs_5274;
var jsExprToString_5612 = jsExprToString_5005;
var jsStmtToString_5613 = jsStmtToString_5008;
var rewriteStmt_5614 = rewriteStmt_4847;
var compileModule_5615 = function(builtinsPath_5616){
  return function(m_5617){
    var runStmt_5623 = "if (module.exports.main)module.exports.main(process.argv)";
    var requireFun_5622 = ($concat(($concat("function _require(f) {\n"))("  return f == \"./builtins.js\" ? $$builtins : require(f);\n")))("}\n");
    var js_5620 = (join_5596((map(jsStmtToString_5613(0)))((concatMap_5592(rewriteStmt_5614))(moduleToJs_5611(m_5617)))))(";\n");
    var wrapModule_5621 = function(m_5624){
      return ($concat(($concat("(function() {"))(js_5620)))("\nmodule.exports = exports;})();")
    };
    var fullBuiltins_5618 = readFile(builtinsPath_5616);
    var wrappedBuiltins_5619 = ($concat(($concat("const $$builtins = (function() {\n const module = {};\n"))(fullBuiltins_5618)))(";\n return builtins})();\n");
    return ($concat(($concat(($concat(wrappedBuiltins_5619))(requireFun_5622)))(wrapModule_5621(m_5617))))(runStmt_5623)
  }
};
var assert_5625 = assert_85;
var Pair_5626 = Pair_3;
var mapSnd_5627 = mapSnd_84;
var mapFst_5628 = mapFst_83;
var $gt$eq$gt_5629 = $gt$eq$gt_82;
var snd_5630 = snd_23;
var debug2_5631 = debug2_81;
var Just_5632 = Just_1;
var Nothing_5633 = Nothing_2;
var isJust_5634 = isJust_21;
var Empty_5635 = Empty_7;
var Leaf_5636 = Leaf_8;
var Collision_5637 = Collision_9;
var BitmapIndexed_5638 = BitmapIndexed_10;
var $_5639 = $_12;
var fst_5640 = fst_22;
var Left_5641 = Left_4;
var Right_5642 = Right_5;
var loop_5643 = loop_27;
var find_5644 = find_29;
var hamtMask_5645 = hamtMask_58;
var popCount_5646 = popCount_57;
var hamtIndex_5647 = hamtIndex_59;
var lookup_5648 = lookup_60;
var setContains_5649 = setContains_76;
var foldTrie_5650 = foldTrie_66;
var emptySet_5651 = emptySet_72;
var Unit_5652 = Unit_0;
var not_5653 = not_26;
var $div$eq_5654 = $div$eq_13;
var mapIx_5655 = mapIx_30;
var insert_5656 = insert_61;
var setAdd_5657 = setAdd_73;
var setIntersection_5658 = setIntersection_80;
var remove_5659 = remove_63;
var setDiff_5660 = setDiff_79;
var setToArray_5661 = setToArray_78;
var mergeTrie_5662 = mergeTrie_70;
var setUnion_5663 = setUnion_77;
var setRemove_5664 = setRemove_75;
var setAddAll_5665 = setAddAll_74;
var trieKeys_5666 = trieKeys_71;
var size_5667 = size_68;
var mapTrie_5668 = mapTrie_67;
var nodeMask_5669 = nodeMask_56;
var isEmpty_5670 = isEmpty_69;
var filterTrie_5671 = filterTrie_65;
var nextSetBitMask_5672 = nextSetBitMask_64;
var updateOrSet_5673 = updateOrSet_62;
var State_5674 = State_6;
var runState_5675 = runState_54;
var evalState_5676 = evalState_55;
var sets_5677 = sets_53;
var gets_5678 = gets_52;
var foldM_5679 = foldM_49;
var mapM_5680 = mapM_50;
var forM_5681 = forM_51;
var strToArray_5682 = strToArray_48;
var toRecord_5683 = toRecord_47;
var reverse_5684 = reverse_46;
var tail_5685 = tail_41;
var head_5686 = head_40;
var uniq_5687 = uniq_45;
var mergeSet_5688 = mergeSet_44;
var init_5689 = init_43;
var last_5690 = last_42;
var mapJust_5691 = mapJust_39;
var concatMap_5692 = concatMap_38;
var zip_5693 = zip_37;
var zipWithIndex2_5694 = zipWithIndex2_35;
var zipWithIndex_5695 = zipWithIndex_36;
var join_5696 = join_34;
var all_5697 = all_33;
var exists_5698 = exists_32;
var containsChar_5699 = containsChar_31;
var contains_5700 = contains_28;
var either_5701 = either_24;
var splitEither_5702 = splitEither_25;
var fromJust_5703 = fromJust_20;
var justOr_5704 = justOr_19;
var maybe_5705 = maybe_18;
var $gt$gt_5706 = $gt$gt_17;
var $gt$eq_5707 = $gt$eq_16;
var $lt$eq_5708 = $lt$eq_15;
var $gt_5709 = $gt_14;
var Identity_5710 = Identity_11;
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
var Success_5711 = function($_0_5726){
  return function($_1_5727){
    return {$0:$_0_5726,$1:$_1_5727,$tag:0}
  }
};
var Error_5712 = function($_0_5728){
  return {$0:$_0_5728,$tag:1}
};
var Parser_5713 = function($_0_5729){
  return {$0:$_0_5729}
};
var $instance$Functor$0 = $class$Functor(function(f_5763){
  return function(pa_5764){
    var $phi$596 = Parser_5713(function(i_5766){
      var $phi$598 = pa_5764.$0(i_5766);
      if($phi$598.$tag==1){
        var $phi$597 = Error_5712($phi$598.$0)
      } else if($phi$598.$tag==0){
        var $phi$597 = (Success_5711(f_5763($phi$598.$0)))($phi$598.$1)
      } else error("pattern match fail",$phi$598);
      return $phi$597
    });
    return $phi$596
  }
});
var $instance$Applicative$1 = ($class$Applicative(function(x_5770){
  return Parser_5713(Success_5711(x_5770))
}))(function(pf_5771){
  return function(pa_5772){
    var $phi$600 = Parser_5713(function(i_5775){
      var $phi$602 = pf_5771.$0(i_5775);
      if($phi$602.$tag==1){
        var $phi$601 = Error_5712($phi$602.$0)
      } else if($phi$602.$tag==0){
        var $phi$604 = pa_5772.$0($phi$602.$1);
        if($phi$604.$tag==1){
          var $phi$603 = Error_5712($phi$604.$0)
        } else if($phi$604.$tag==0){
          var $phi$603 = (Success_5711($phi$602.$0($phi$604.$0)))($phi$604.$1)
        } else error("pattern match fail",$phi$604);
        var $phi$601 = $phi$603
      } else error("pattern match fail",$phi$602);
      return $phi$601
    });
    var $phi$599 = $phi$600;
    return $phi$599
  }
});
var $instance$Alternative$2 = ($class$Alternative(Parser_5713(function(__5782){
  return Error_5712("parser failure")
})))(function(pa_5783){
  return function(pb_5784){
    var $phi$606 = Parser_5713(function(i_5787){
      var $phi$608 = pa_5783.$0(i_5787);
      if($phi$608.$tag==1){
        var $phi$607 = pb_5784.$0(i_5787)
      } else if($phi$608.$tag==0){
        var $phi$607 = (Success_5711($phi$608.$0))($phi$608.$1)
      } else error("pattern match fail",$phi$608);
      return $phi$607
    });
    var $phi$605 = $phi$606;
    return $phi$605
  }
});
var upperCaseLetters_5724 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var letters_5725 = ($concat("abcdefghijklmnopqrstuvwxyz"))(upperCaseLetters_5724);
var digits_5723 = "0123456789";
var applyParser_5714 = function(p_5730){
  return function(i_5731){
    var $phi$609 = p_5730.$0(i_5731);
    return $phi$609
  }
};
var many_5717 = function(p_5741){
  var manyIterate_5742 = function(s_5743){
    var r_5744 = ((iterate(Left_5641((Success_5711([]))(s_5743))))(function(r_5745){
      if(r_5745.$tag==0){
        var $phi$610 = false
      } else if(r_5745.$tag==1){
        var $phi$610 = true
      } else error("pattern match fail",r_5745);
      return $phi$610
    }))(function(rs_5748){
      if((rs_5748.$tag==0)&&(rs_5748.$0.$tag==0)){
        var $phi$613 = (applyParser_5714(p_5741))(rs_5748.$0.$1);
        if($phi$613.$tag==0){
          var $phi$612 = Left_5641((Success_5711((push($phi$613.$0))(rs_5748.$0.$0)))($phi$613.$1))
        } else if($phi$613.$tag==1){
          var $phi$612 = Right_5642((Success_5711(rs_5748.$0.$0))(rs_5748.$0.$1))
        } else error("pattern match fail",$phi$613);
        var $phi$611 = $phi$612
      } else error("pattern match fail",rs_5748);
      return $phi$611
    });
    if(r_5744.$tag==1){
      var $phi$614 = r_5744.$0
    } else if(r_5744.$tag==0){
      var $phi$614 = error("manyIterate should never return a Left")
    } else error("pattern match fail",r_5744);
    return $phi$614
  };
  return Parser_5713(manyIterate_5742)
};
var $pip$gt_5715 = function(local$instance$Applicative$0){
  return function(a_5733){
    return function(b_5734){
      return (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(function(__5735){
        return function(b_5736){
          return b_5736
        }
      })))(a_5733)))(b_5734)
    }
  }
};
var sepBy1_5720 = function(p_5758){
  return function(sp_5759){
    return (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(enqueue)))(p_5758)))(many_5717((($pip$gt_5715($instance$Applicative$1))(sp_5759))(p_5758)))
  }
};
var success_5719 = function(a_5757){
  return Parser_5713(Success_5711(a_5757))
};
var opt_5722 = function(a_5762){
  return (($lt$pip$gt($instance$Alternative$2))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(Just_5632)))(a_5762)))(success_5719(Nothing_5633))
};
var sepBy_5721 = function(p_5760){
  return function(sp_5761){
    return (($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(justOr_5704([]))))(opt_5722((sepBy1_5720(p_5760))(sp_5761)))
  }
};
var some_5718 = function(p_5756){
  return (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(enqueue)))(p_5756)))(many_5717(p_5756))
};
var $lt$pip_5716 = function(local$instance$Applicative$0){
  return function(a_5737){
    return function(b_5738){
      return (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(function(a_5739){
        return function(__5740){
          return a_5739
        }
      })))(a_5737)))(b_5738)
    }
  }
};
var assert_5791 = assert_85;
var Pair_5792 = Pair_3;
var mapSnd_5793 = mapSnd_84;
var mapFst_5794 = mapFst_83;
var $gt$eq$gt_5795 = $gt$eq$gt_82;
var snd_5796 = snd_23;
var debug2_5797 = debug2_81;
var Just_5798 = Just_1;
var Nothing_5799 = Nothing_2;
var isJust_5800 = isJust_21;
var Empty_5801 = Empty_7;
var Leaf_5802 = Leaf_8;
var Collision_5803 = Collision_9;
var BitmapIndexed_5804 = BitmapIndexed_10;
var $_5805 = $_12;
var fst_5806 = fst_22;
var Left_5807 = Left_4;
var Right_5808 = Right_5;
var loop_5809 = loop_27;
var find_5810 = find_29;
var hamtMask_5811 = hamtMask_58;
var popCount_5812 = popCount_57;
var hamtIndex_5813 = hamtIndex_59;
var lookup_5814 = lookup_60;
var setContains_5815 = setContains_76;
var foldTrie_5816 = foldTrie_66;
var emptySet_5817 = emptySet_72;
var Unit_5818 = Unit_0;
var not_5819 = not_26;
var $div$eq_5820 = $div$eq_13;
var mapIx_5821 = mapIx_30;
var insert_5822 = insert_61;
var setAdd_5823 = setAdd_73;
var setIntersection_5824 = setIntersection_80;
var remove_5825 = remove_63;
var setDiff_5826 = setDiff_79;
var setToArray_5827 = setToArray_78;
var mergeTrie_5828 = mergeTrie_70;
var setUnion_5829 = setUnion_77;
var setRemove_5830 = setRemove_75;
var setAddAll_5831 = setAddAll_74;
var trieKeys_5832 = trieKeys_71;
var size_5833 = size_68;
var mapTrie_5834 = mapTrie_67;
var nodeMask_5835 = nodeMask_56;
var isEmpty_5836 = isEmpty_69;
var filterTrie_5837 = filterTrie_65;
var nextSetBitMask_5838 = nextSetBitMask_64;
var updateOrSet_5839 = updateOrSet_62;
var State_5840 = State_6;
var runState_5841 = runState_54;
var evalState_5842 = evalState_55;
var sets_5843 = sets_53;
var gets_5844 = gets_52;
var foldM_5845 = foldM_49;
var mapM_5846 = mapM_50;
var forM_5847 = forM_51;
var strToArray_5848 = strToArray_48;
var toRecord_5849 = toRecord_47;
var reverse_5850 = reverse_46;
var tail_5851 = tail_41;
var head_5852 = head_40;
var uniq_5853 = uniq_45;
var mergeSet_5854 = mergeSet_44;
var init_5855 = init_43;
var last_5856 = last_42;
var mapJust_5857 = mapJust_39;
var concatMap_5858 = concatMap_38;
var zip_5859 = zip_37;
var zipWithIndex2_5860 = zipWithIndex2_35;
var zipWithIndex_5861 = zipWithIndex_36;
var join_5862 = join_34;
var all_5863 = all_33;
var exists_5864 = exists_32;
var containsChar_5865 = containsChar_31;
var contains_5866 = contains_28;
var either_5867 = either_24;
var splitEither_5868 = splitEither_25;
var fromJust_5869 = fromJust_20;
var justOr_5870 = justOr_19;
var maybe_5871 = maybe_18;
var $gt$gt_5872 = $gt$gt_17;
var $gt$eq_5873 = $gt$eq_16;
var $lt$eq_5874 = $lt$eq_15;
var $gt_5875 = $gt_14;
var Identity_5876 = Identity_11;
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
var upperCaseLetters_5877 = upperCaseLetters_5724;
var letters_5878 = letters_5725;
var digits_5879 = digits_5723;
var Success_5880 = Success_5711;
var Error_5881 = Error_5712;
var Parser_5882 = Parser_5713;
var applyParser_5883 = applyParser_5714;
var many_5884 = many_5717;
var $pip$gt_5885 = $pip$gt_5715;
var sepBy1_5886 = sepBy1_5720;
var success_5887 = success_5719;
var opt_5888 = opt_5722;
var sepBy_5889 = sepBy_5721;
var some_5890 = some_5718;
var $lt$pip_5891 = $lt$pip_5716;
var $import2$instance$Functor$0 = $instance$Functor$0;
var $import2$instance$Applicative$1 = $instance$Applicative$1;
var $import2$instance$Alternative$2 = $instance$Alternative$2;
var LexerState_5892 = function($_0_5922){
  return function($_1_5923){
    return function($_2_5924){
      return function($_3_5925){
        return {$0:$_0_5922,$1:$_1_5923,$2:$_2_5924,$3:$_3_5925}
      }
    }
  }
};
var WsTok_5893 = {$tag:0};
var Token_5900 = function($_0_5926){
  return function($_1_5927){
    return function($_2_5928){
      return function($_3_5929){
        return {$0:$_0_5926,$1:$_1_5927,$2:$_2_5928,$3:$_3_5929}
      }
    }
  }
};
var NumTok_5895 = {$tag:2};
var ComTok_5899 = {$tag:6};
var SymTok_5894 = {$tag:1};
var IdTok_5898 = {$tag:5};
var OpTok_5897 = {$tag:4};
var StrTok_5896 = {$tag:3};
var runLexer_5903 = function(p_5940){
  return function(s_5941){
    var $phi$615 = p_5940.$0((((LexerState_5892(s_5941))(0))(0))(0));
    return $phi$615
  }
};
var mkTok_5901 = function(t_5930){
  var parse_5931 = function(i_5932){
    var $phi$616 = (Success_5880(function(r_5937){
      return (((Token_5900(t_5930))(r_5937))(i_5932.$2))(i_5932.$3)
    }))(i_5932);
    return $phi$616
  };
  return Parser_5882(parse_5931)
};
var parseChar_5904 = function(p_5943){
  var parse_5944 = function(s_5945){
    var $phi$619 = (($lt($import1$instance$Ord$2))(s_5945.$1))(length(s_5945.$0));
    if(!$phi$619){
      var $phi$618 = Error_5881("no more input available")
    } else if($phi$619){
      var $phi$621 = p_5943((getChar(s_5945.$1))(s_5945.$0));
      if(!$phi$621){
        var $phi$620 = Error_5881("parser failed")
      } else if($phi$621){
        var $phi$623 = (getChar(s_5945.$1))(s_5945.$0);
        if("\n"==$phi$623){
          var $phi$622 = (Success_5880((getChar(s_5945.$1))(s_5945.$0)))((((LexerState_5892(s_5945.$0))(s_5945.$1+1))(s_5945.$2+1))(0))
        } else var $phi$622 = (Success_5880((getChar(s_5945.$1))(s_5945.$0)))((((LexerState_5892(s_5945.$0))(s_5945.$1+1))(s_5945.$2))(s_5945.$3+1));
        var $phi$620 = $phi$622
      } else error("pattern match fail",$phi$621);
      var $phi$618 = $phi$620
    } else error("pattern match fail",$phi$619);
    var $phi$617 = $phi$618;
    return $phi$617
  };
  return Parser_5882(parse_5944)
};
var charP_5906 = function(cs_5952){
  return parseChar_5904(function(c_5953){
    return (containsChar_5865(c_5953))(cs_5952)
  })
};
var concatStr_5902 = (foldl(function(cs_5938){
  return function(c_5939){
    return ($concat(cs_5938))(c_5939)
  }
}))("");
var someStr_5909 = function(p_5957){
  return (($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))(concatStr_5902)))(some_5890(p_5957))
};
var whitespaceP_5912 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5901(WsTok_5893)))(someStr_5909(charP_5906(" \n")));
var intP_5913 = someStr_5909(charP_5906(digits_5879));
var numP_5914 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5901(NumTok_5895)))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(intP_5913)))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(charP_5906("."))))(intP_5913)))((pure($import2$instance$Applicative$1))(""))));
var notCharP_5907 = function(cs_5954){
  return parseChar_5904(function(c_5955){
    return not_5819((containsChar_5865(c_5955))(cs_5954))
  })
};
var manyStr_5908 = function(p_5956){
  return (($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))(concatStr_5902)))(many_5884(p_5956))
};
var lineCommentP_5915 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5901(ComTok_5899)))((($pip$gt_5885($import2$instance$Applicative$1))((($pip$gt_5885($import2$instance$Applicative$1))(charP_5906("/")))(charP_5906("/"))))(manyStr_5908(notCharP_5907("\n"))));
var symbolP_5916 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5901(SymTok_5894)))(charP_5906("()[]{},\\"));
var identP_5917 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5901(IdTok_5898)))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(charP_5906(($concat(letters_5878))("_")))))(manyStr_5908(charP_5906(($concat(($concat(letters_5878))(digits_5879)))("_")))));
var opIdentP_5918 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5901(IdTok_5898)))((($lt$pip_5891($import2$instance$Applicative$1))((($pip$gt_5885($import2$instance$Applicative$1))(charP_5906("(")))(someStr_5909(charP_5906("-+*/=:&|<>^$")))))(charP_5906(")")));
var opP_5919 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5901(OpTok_5897)))(someStr_5909(charP_5906("-+*/=:&|<>^$~")));
var anyCharP_5905 = parseChar_5904(function(__5951){
  return true
});
var notEndOfStringP_5960 = notCharP_5907("'");
var escapeP_5959 = (($pip$gt_5885($import2$instance$Applicative$1))(charP_5906("\\")))(anyCharP_5905);
var newLineP_5958 = (($pip$gt_5885($import2$instance$Applicative$1))((($pip$gt_5885($import2$instance$Applicative$1))(charP_5906("\\")))(charP_5906("n"))))((pure($import2$instance$Applicative$1))("\n"));
var stringCharP_5910 = (($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))(newLineP_5958))(escapeP_5959)))(notEndOfStringP_5960);
var stringP_5911 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5901(StrTok_5896)))((($lt$pip_5891($import2$instance$Applicative$1))((($pip$gt_5885($import2$instance$Applicative$1))(charP_5906("'")))(manyStr_5908(stringCharP_5910))))(charP_5906("'")));
var jaguarTokenP_5920 = many_5884((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))(stringP_5911))(whitespaceP_5912)))(numP_5914)))(lineCommentP_5915)))(identP_5917)))(opIdentP_5918)))(opP_5919)))(symbolP_5916));
var tokenize_5921 = runLexer_5903(jaguarTokenP_5920);
var assert_5961 = assert_85;
var Pair_5962 = Pair_3;
var mapSnd_5963 = mapSnd_84;
var mapFst_5964 = mapFst_83;
var $gt$eq$gt_5965 = $gt$eq$gt_82;
var snd_5966 = snd_23;
var debug2_5967 = debug2_81;
var Just_5968 = Just_1;
var Nothing_5969 = Nothing_2;
var isJust_5970 = isJust_21;
var Empty_5971 = Empty_7;
var Leaf_5972 = Leaf_8;
var Collision_5973 = Collision_9;
var BitmapIndexed_5974 = BitmapIndexed_10;
var $_5975 = $_12;
var fst_5976 = fst_22;
var Left_5977 = Left_4;
var Right_5978 = Right_5;
var loop_5979 = loop_27;
var find_5980 = find_29;
var hamtMask_5981 = hamtMask_58;
var popCount_5982 = popCount_57;
var hamtIndex_5983 = hamtIndex_59;
var lookup_5984 = lookup_60;
var setContains_5985 = setContains_76;
var foldTrie_5986 = foldTrie_66;
var emptySet_5987 = emptySet_72;
var Unit_5988 = Unit_0;
var not_5989 = not_26;
var $div$eq_5990 = $div$eq_13;
var mapIx_5991 = mapIx_30;
var insert_5992 = insert_61;
var setAdd_5993 = setAdd_73;
var setIntersection_5994 = setIntersection_80;
var remove_5995 = remove_63;
var setDiff_5996 = setDiff_79;
var setToArray_5997 = setToArray_78;
var mergeTrie_5998 = mergeTrie_70;
var setUnion_5999 = setUnion_77;
var setRemove_6000 = setRemove_75;
var setAddAll_6001 = setAddAll_74;
var trieKeys_6002 = trieKeys_71;
var size_6003 = size_68;
var mapTrie_6004 = mapTrie_67;
var nodeMask_6005 = nodeMask_56;
var isEmpty_6006 = isEmpty_69;
var filterTrie_6007 = filterTrie_65;
var nextSetBitMask_6008 = nextSetBitMask_64;
var updateOrSet_6009 = updateOrSet_62;
var State_6010 = State_6;
var runState_6011 = runState_54;
var evalState_6012 = evalState_55;
var sets_6013 = sets_53;
var gets_6014 = gets_52;
var foldM_6015 = foldM_49;
var mapM_6016 = mapM_50;
var forM_6017 = forM_51;
var strToArray_6018 = strToArray_48;
var toRecord_6019 = toRecord_47;
var reverse_6020 = reverse_46;
var tail_6021 = tail_41;
var head_6022 = head_40;
var uniq_6023 = uniq_45;
var mergeSet_6024 = mergeSet_44;
var init_6025 = init_43;
var last_6026 = last_42;
var mapJust_6027 = mapJust_39;
var concatMap_6028 = concatMap_38;
var zip_6029 = zip_37;
var zipWithIndex2_6030 = zipWithIndex2_35;
var zipWithIndex_6031 = zipWithIndex_36;
var join_6032 = join_34;
var all_6033 = all_33;
var exists_6034 = exists_32;
var containsChar_6035 = containsChar_31;
var contains_6036 = contains_28;
var either_6037 = either_24;
var splitEither_6038 = splitEither_25;
var fromJust_6039 = fromJust_20;
var justOr_6040 = justOr_19;
var maybe_6041 = maybe_18;
var $gt$gt_6042 = $gt$gt_17;
var $gt$eq_6043 = $gt$eq_16;
var $lt$eq_6044 = $lt$eq_15;
var $gt_6045 = $gt_14;
var Identity_6046 = Identity_11;
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
var App_6047 = App_731;
var Lam_6048 = Lam_732;
var Case_6049 = Case_733;
var Let_6050 = Let_734;
var New_6051 = New_735;
var breakableDownAndUpM_6052 = breakableDownAndUpM_780;
var breakableDownM_6053 = breakableDownM_784;
var downAndUpM_6054 = downAndUpM_781;
var downM_6055 = downM_783;
var upM_6056 = upM_782;
var breakableDownAndUp_6057 = breakableDownAndUp_775;
var breakableDown_6058 = breakableDown_779;
var downAndUp_6059 = downAndUp_776;
var down_6060 = down_778;
var up_6061 = up_777;
var AnnType_6062 = AnnType_723;
var TUnknown_6063 = TUnknown_754;
var getAnn_6064 = getAnn_759;
var getAnnType_6065 = getAnnType_762;
var Var_6066 = Var_729;
var Const_6067 = Const_730;
var annOf_6068 = annOf_772;
var getType_6069 = getType_774;
var withAnn_6070 = withAnn_773;
var setAnn_6071 = setAnn_760;
var setAnnType_6072 = setAnnType_763;
var setType_6073 = setType_771;
var Data_6074 = Data_743;
var DataCon_6075 = DataCon_744;
var dataConName_6076 = dataConName_769;
var dataConNames_6077 = dataConNames_770;
var TCBound_6078 = TCBound_747;
var TConst_6079 = TConst_748;
var TVar_6080 = TVar_749;
var TApp_6081 = TApp_750;
var TRow_6082 = TRow_751;
var TBot_6083 = TBot_752;
var TForall_6084 = TForall_753;
var equivBound_6085 = equivBound_767;
var equivType_6086 = equivType_768;
var AnnCodeLoc_6087 = AnnCodeLoc_724;
var printCodeLoc_6088 = printCodeLoc_766;
var setAnnCodeLoc_6089 = setAnnCodeLoc_765;
var getAnnCodeLoc_6090 = getAnnCodeLoc_764;
var copyAnn_6091 = copyAnn_761;
var emptyAnn_6092 = emptyAnn_758;
var ImportAll_6093 = ImportAll_757;
var ImportOpen_6094 = ImportOpen_756;
var ImportClosed_6095 = ImportClosed_755;
var Instance_6096 = Instance_746;
var Class_6097 = Class_745;
var ModuleInterface_6098 = ModuleInterface_742;
var Module_6099 = Module_741;
var PData_6100 = PData_740;
var PConst_6101 = PConst_739;
var PVar_6102 = PVar_738;
var CStr_6103 = CStr_737;
var CNum_6104 = CNum_736;
var AnnExport_6105 = AnnExport_728;
var AnnTag_6106 = AnnTag_727;
var AnnData_6107 = AnnData_726;
var AnnUseCount_6108 = AnnUseCount_725;
var upperCaseLetters_6109 = upperCaseLetters_5724;
var letters_6110 = letters_5725;
var digits_6111 = digits_5723;
var Success_6112 = Success_5711;
var Error_6113 = Error_5712;
var Parser_6114 = Parser_5713;
var applyParser_6115 = applyParser_5714;
var many_6116 = many_5717;
var $pip$gt_6117 = $pip$gt_5715;
var sepBy1_6118 = sepBy1_5720;
var success_6119 = success_5719;
var opt_6120 = opt_5722;
var sepBy_6121 = sepBy_5721;
var some_6122 = some_5718;
var $lt$pip_6123 = $lt$pip_5716;
var $import3$instance$Functor$0 = $instance$Functor$0;
var $import3$instance$Applicative$1 = $instance$Applicative$1;
var $import3$instance$Alternative$2 = $instance$Alternative$2;
var tokenize_6124 = tokenize_5921;
var Token_6125 = Token_5900;
var WsTok_6126 = WsTok_5893;
var SymTok_6127 = SymTok_5894;
var NumTok_6128 = NumTok_5895;
var StrTok_6129 = StrTok_5896;
var OpTok_6130 = OpTok_5897;
var IdTok_6131 = IdTok_5898;
var ComTok_6132 = ComTok_5899;
var ParserState_6133 = function($_0_6200){
  return function($_1_6201){
    return function($_2_6202){
      return function($_3_6203){
        return function($_4_6204){
          return {$0:$_0_6200,$1:$_1_6201,$2:$_2_6202,$3:$_3_6203,$4:$_4_6204}
        }
      }
    }
  }
};
var mkParserState_6134 = function(ts_6205){
  return function(f_6206){
    var $phi$625 = (getIx(0))(ts_6205);
    var $phi$624 = $phi$625.$3;
    return ((((ParserState_6133(ts_6205))(0))($phi$624))(0))(f_6206)
  }
};
var filterWhitespaceAndComments_6135 = filter(function(t_6211){
  if(t_6211.$0.$tag==0){
    var $phi$626 = false
  } else if(t_6211.$0.$tag==6){
    var $phi$626 = false
  } else var $phi$626 = true;
  return $phi$626
});
var runParser_6136 = function(p_6219){
  return function(s_6220){
    return function(f_6221){
      var $phi$628 = tokenize_6124(s_6220);
      if($phi$628.$tag==0){
        var $phi$627 = (applyParser_6115(p_6219))((mkParserState_6134(filterWhitespaceAndComments_6135($phi$628.$0)))(f_6221))
      } else if($phi$628.$tag==1){
        var $phi$627 = Error_6113($phi$628.$0)
      } else error("pattern match fail",$phi$628);
      return $phi$627
    }
  }
};
var $lt$mul$mns$gt_6139 = function(pf_6253){
  return function(pa_6254){
    var parse_6257 = function(s_6258){
      var $phi$633 = pf_6253.$0(s_6258);
      if($phi$633.$tag==0){
        var $phi$635 = pa_6254.$0(((((ParserState_6133($phi$633.$1.$0))($phi$633.$1.$1))($phi$633.$1.$2))(s_6258.$2+1))($phi$633.$1.$4));
        if($phi$635.$tag==0){
          var $phi$634 = (Success_6112($phi$633.$0($phi$635.$0)))(((((ParserState_6133($phi$635.$1.$0))($phi$635.$1.$1))($phi$635.$1.$2))(s_6258.$3))($phi$635.$1.$4))
        } else if($phi$635.$tag==1){
          var $phi$634 = Error_6113($phi$635.$0)
        } else error("pattern match fail",$phi$635);
        var $phi$632 = $phi$634
      } else if($phi$633.$tag==1){
        var $phi$632 = Error_6113($phi$633.$0)
      } else error("pattern match fail",$phi$633);
      var $phi$631 = $phi$632;
      return $phi$631
    };
    var $phi$630 = Parser_6114(parse_6257);
    var $phi$629 = $phi$630;
    return $phi$629
  }
};
var parseToken_6137 = function(f_6225){
  var parse_6226 = function(s_6227){
    var $phi$638 = (($lt($import1$instance$Ord$2))(s_6227.$1))(length(s_6227.$0));
    if(!$phi$638){
      var $phi$637 = Error_6113("run out of tokens")
    } else if($phi$638){
      var $phi$640 = (getIx(s_6227.$1))(s_6227.$0);
      var $phi$642 = (($lt($import1$instance$Ord$2))($phi$640.$3))(s_6227.$3);
      if($phi$642){
        var $phi$641 = Error_6113("token not indented sufficiently")
      } else if(!$phi$642){
        var $phi$644 = f_6225((getIx(s_6227.$1))(s_6227.$0));
        if($phi$644.$tag==1){
          var $phi$643 = Error_6113("parser fun failed")
        } else if($phi$644.$tag==0){
          var $phi$646 = (($lt($import1$instance$Ord$2))(s_6227.$1+1))(length(s_6227.$0));
          if(!$phi$646){
            var $phi$645 = (Success_6112($phi$644.$0))(((((ParserState_6133(s_6227.$0))(s_6227.$1+1))(s_6227.$2))(s_6227.$3))(s_6227.$4))
          } else if($phi$646){
            var $phi$648 = (getIx(s_6227.$1+1))(s_6227.$0);
            var $phi$650 = (($gt_6045($import1$instance$Ord$2))($phi$648.$2))($phi$640.$2);
            if(!$phi$650){
              var $phi$649 = (Success_6112($phi$644.$0))(((((ParserState_6133(s_6227.$0))(s_6227.$1+1))(s_6227.$2))(s_6227.$3))(s_6227.$4))
            } else if($phi$650){
              var $phi$649 = (Success_6112($phi$644.$0))(((((ParserState_6133(s_6227.$0))(s_6227.$1+1))($phi$648.$3))(s_6227.$3))(s_6227.$4))
            } else error("pattern match fail",$phi$650);
            var $phi$647 = $phi$649;
            var $phi$645 = $phi$647
          } else error("pattern match fail",$phi$646);
          var $phi$643 = $phi$645
        } else error("pattern match fail",$phi$644);
        var $phi$641 = $phi$643
      } else error("pattern match fail",$phi$642);
      var $phi$639 = $phi$641;
      var $phi$637 = $phi$639
    } else error("pattern match fail",$phi$638);
    var $phi$636 = $phi$637;
    return $phi$636
  };
  return Parser_6114(parse_6226)
};
var operatorP_6143 = function(s_6288){
  return parseToken_6137(function(t_6289){
    if(t_6289.$0.$tag==4){
      var $phi$653 = (($eq$eq($import1$instance$Eq$1))(t_6289.$1))(s_6288);
      if($phi$653){
        var $phi$652 = Just_5968(s_6288)
      } else if(!$phi$653){
        var $phi$652 = Nothing_5969
      } else error("pattern match fail",$phi$653);
      var $phi$651 = $phi$652
    } else var $phi$651 = Nothing_5969;
    return $phi$651
  })
};
var symP_6142 = function(s_6282){
  return parseToken_6137(function(t_6283){
    if(t_6283.$0.$tag==1){
      var $phi$656 = (($eq$eq($import1$instance$Eq$1))(t_6283.$1))(s_6282);
      if($phi$656){
        var $phi$655 = Just_5968(s_6282)
      } else if(!$phi$656){
        var $phi$655 = Nothing_5969
      } else error("pattern match fail",$phi$656);
      var $phi$654 = $phi$655
    } else var $phi$654 = Nothing_5969;
    return $phi$654
  })
};
var parenP_6149 = function(p_6320){
  return (($lt$pip_6123($import3$instance$Applicative$1))((($pip$gt_6117($import3$instance$Applicative$1))(symP_6142("(")))(p_6320)))(symP_6142(")"))
};
var reserved_6141 = ["as","class","where","instance","let","in","from","import","case","of","data"];
var notUpperCaseId_6148 = parseToken_6137(function(t_6315){
  if(t_6315.$0.$tag==5){
    var $phi$659 = (containsChar_6035((getChar(0))(t_6315.$1)))(upperCaseLetters_6109);
    if(!$phi$659){
      var $phi$661 = ((contains_6036($import1$instance$Eq$1))(t_6315.$1))(reserved_6141);
      if(!$phi$661){
        var $phi$660 = Just_5968(t_6315.$1)
      } else if($phi$661){
        var $phi$660 = Nothing_5969
      } else error("pattern match fail",$phi$661);
      var $phi$658 = $phi$660
    } else if($phi$659){
      var $phi$658 = Nothing_5969
    } else error("pattern match fail",$phi$659);
    var $phi$657 = $phi$658
  } else var $phi$657 = Nothing_5969;
  return $phi$657
});
var tvarP_6177 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(TVar_6080(emptyAnn_6092))))(notUpperCaseId_6148);
var upperCaseId_6147 = parseToken_6137(function(t_6310){
  if(t_6310.$0.$tag==5){
    var $phi$664 = (containsChar_6035((getChar(0))(t_6310.$1)))(upperCaseLetters_6109);
    if($phi$664){
      var $phi$663 = Just_5968(t_6310.$1)
    } else if(!$phi$664){
      var $phi$663 = Nothing_5969
    } else error("pattern match fail",$phi$664);
    var $phi$662 = $phi$663
  } else var $phi$662 = Nothing_5969;
  return $phi$662
});
var tconstP_6176 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(TConst_6079(emptyAnn_6092))))(upperCaseId_6147);
var typeP_6175 = Parser_6114(function(s_6380){
  return (applyParser_6115(tfunP_6180))(s_6380)
});
var simpleTypeP_6178 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(tconstP_6176))(tvarP_6177)))(parenP_6149(typeP_6175));
var tappP_6179 = ($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(foldl(TApp_6081(emptyAnn_6092)))))(simpleTypeP_6178)))(many_6116(simpleTypeP_6178));
var tfunP_6180 = ($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(t_6381){
  return function(ts_6382){
    return (foldr1(function(b_6383){
      return function(a_6384){
        return ((TApp_6081(emptyAnn_6092))(((TApp_6081(emptyAnn_6092))((TConst_6079(emptyAnn_6092))("->")))(a_6384)))(b_6383)
      }
    }))((enqueue(t_6381))(ts_6382))
  }
})))(tappP_6179)))(many_6116((($pip$gt_6117($import3$instance$Applicative$1))(operatorP_6143("->")))(tappP_6179)));
var parseType_6199 = runParser_6136(typeP_6175);
var withLocAnn_6150 = function(a_6321){
  return ((((setAnn_6071($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(a_6321))(emptyAnn_6092)
};
var parse_6242 = function(s_6243){
  var $phi$667 = (($lt($import1$instance$Ord$2))(s_6243.$1))(length(s_6243.$0));
  if(!$phi$667){
    var $phi$666 = Error_6113("run out of tokens")
  } else if($phi$667){
    var $phi$669 = (getIx(s_6243.$1))(s_6243.$0);
    var $phi$668 = (Success_6112(($_5975(withLocAnn_6150))(((AnnCodeLoc_6087(s_6243.$4))($phi$669.$2))($phi$669.$3))))(s_6243);
    var $phi$666 = $phi$668
  } else error("pattern match fail",$phi$667);
  var $phi$665 = $phi$666;
  return $phi$665
};
var locP_6138 = Parser_6114(parse_6242);
var $pip$mns$gt_6140 = function(pa_6278){
  return function(pb_6279){
    return ($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(__6280){
      return function(b_6281){
        return b_6281
      }
    })))(pa_6278)))(pb_6279)
  }
};
var anyOpP_6144 = parseToken_6137(function(t_6294){
  if(t_6294.$0.$tag==4){
    var $phi$670 = Just_5968(t_6294.$1)
  } else var $phi$670 = Nothing_5969;
  return $phi$670
});
var reservedP_6145 = function(s_6299){
  return parseToken_6137(function(t_6300){
    if(t_6300.$0.$tag==5){
      var $phi$673 = (($eq$eq($import1$instance$Eq$1))(t_6300.$1))(s_6299);
      if($phi$673){
        var $phi$672 = Just_5968(s_6299)
      } else if(!$phi$673){
        var $phi$672 = Nothing_5969
      } else error("pattern match fail",$phi$673);
      var $phi$671 = $phi$672
    } else var $phi$671 = Nothing_5969;
    return $phi$671
  })
};
var withLocOf_6151 = function(e_6322){
  return withLocAnn_6150(($_5975(fromJust_6039))((((getAnn_6064($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(annOf_6068(e_6322))))
};
var varP_6152 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Var_6066)))(locP_6138)))(parseToken_6137(function(t_6323){
  if(t_6323.$0.$tag==5){
    var $phi$676 = ((contains_6036($import1$instance$Eq$1))(t_6323.$1))(reserved_6141);
    if($phi$676){
      var $phi$675 = Nothing_5969
    } else if(!$phi$676){
      var $phi$675 = Just_5968(t_6323.$1)
    } else error("pattern match fail",$phi$676);
    var $phi$674 = $phi$675
  } else var $phi$674 = Nothing_5969;
  return $phi$674
}));
var cnumP_6153 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Const_6067)))(locP_6138)))(parseToken_6137(function(t_6328){
  if(t_6328.$0.$tag==2){
    var $phi$677 = Just_5968(CNum_6104(unsafeStringToInt(t_6328.$1)))
  } else var $phi$677 = Nothing_5969;
  return $phi$677
}));
var cstrP_6154 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Const_6067)))(locP_6138)))(parseToken_6137(function(t_6333){
  if(t_6333.$0.$tag==3){
    var $phi$678 = Just_5968(CStr_6103(t_6333.$1))
  } else var $phi$678 = Nothing_5969;
  return $phi$678
}));
var constP_6155 = (($lt$pip$gt($import3$instance$Alternative$2))(cstrP_6154))(cnumP_6153);
var pvarP_6162 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PVar_6102)))(locP_6138)))(notUpperCaseId_6148);
var pcstrP_6164 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PConst_6101)))(locP_6138)))(parseToken_6137(function(t_6354){
  if(t_6354.$0.$tag==3){
    var $phi$679 = Just_5968(CStr_6103(t_6354.$1))
  } else var $phi$679 = Nothing_5969;
  return $phi$679
}));
var pcnumP_6163 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PConst_6101)))(locP_6138)))(parseToken_6137(function(t_6349){
  if(t_6349.$0.$tag==2){
    var $phi$680 = Just_5968(CNum_6104(unsafeStringToInt(t_6349.$1)))
  } else var $phi$680 = Nothing_5969;
  return $phi$680
}));
var pconstP_6166 = (($lt$pip$gt($import3$instance$Alternative$2))(pcnumP_6163))(pcstrP_6164);
var patP_6161 = Parser_6114(function(s_6348){
  return (applyParser_6115(allPatP_6168))(s_6348)
});
var pdataP_6167 = ($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PData_6100)))(locP_6138)))(upperCaseId_6147)))(many_6116((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(pvarP_6162))(pconstP_6166)))(parenP_6149(patP_6161))));
var allPatP_6168 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(pvarP_6162))(pconstP_6166)))(pdataP_6167);
var exprP_6156 = Parser_6114(function(s_6338){
  return (applyParser_6115(opP_6174))(s_6338)
});
var arrayLitP_6157 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(ann_6339){
  return function(xs_6340){
    return ((New_6051(ann_6339))("Array"))(xs_6340)
  }
})))(locP_6138)))((($lt$pip_6123($import3$instance$Applicative$1))((($pip$gt_6117($import3$instance$Applicative$1))(symP_6142("[")))((sepBy_6121(exprP_6156))(symP_6142(",")))))(symP_6142("]")));
var simpleExprP_6158 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(varP_6152))(constP_6155)))(arrayLitP_6157)))(parenP_6149(exprP_6156));
var appP_6159 = ($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(foldl(function(f_6341){
  return function(a_6342){
    return ((App_6047(withLocOf_6151(f_6341)))(f_6341))(a_6342)
  }
}))))((($lt$pip$gt($import3$instance$Alternative$2))(varP_6152))(parenP_6149(exprP_6156)))))(many_6116(simpleExprP_6158));
var lamP_6160 = ($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(l_6343){
  return function(ps_6344){
    return function(a_6345){
      return ((foldr(function(a_6346){
        return function(p_6347){
          return ((Lam_6048(l_6343))(p_6347))(a_6346)
        }
      }))(a_6345))(ps_6344)
    }
  }
})))(locP_6138)))(($pip$mns$gt_6140(symP_6142("\\")))(some_6122(notUpperCaseId_6148)))))((($pip$gt_6117($import3$instance$Applicative$1))(operatorP_6143("->")))(exprP_6156));
var ofP_6169 = ($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Pair_5962)))(patP_6161)))((($pip$gt_6117($import3$instance$Applicative$1))(operatorP_6143("->")))(exprP_6156));
var caseP_6170 = ($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Case_6049)))(locP_6138)))(($pip$mns$gt_6140(reservedP_6145("case")))(simpleExprP_6158))))((($pip$gt_6117($import3$instance$Applicative$1))(reservedP_6145("of")))(some_6122(ofP_6169)));
var defP_6171 = ($lt$mul$mns$gt_6139(($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(l_6364){
  return function(n_6365){
    return function(ps_6366){
      return function(e_6367){
        return (Pair_5962(n_6365))(((foldr(function(e_6368){
          return function(p_6369){
            return ((Lam_6048(l_6364))(p_6369))(e_6368)
          }
        }))(e_6367))(ps_6366))
      }
    }
  }
})))(locP_6138)))(notUpperCaseId_6148)))(many_6116(notUpperCaseId_6148))))((($pip$gt_6117($import3$instance$Applicative$1))(operatorP_6143("=")))(exprP_6156));
var letP_6172 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Let_6050)))(locP_6138)))(($pip$mns$gt_6140(reservedP_6145("let")))(some_6122(defP_6171)))))(($pip$mns$gt_6140(reservedP_6145("in")))(exprP_6156));
var primaryExprP_6173 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(appP_6159))(constP_6155)))(lamP_6160)))(caseP_6170)))(letP_6172)))(arrayLitP_6157);
var opP_6174 = ($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(e_6370){
  return function(oes_6371){
    return ((foldl(function(a_6372){
      return function(lob_6373){
        var $phi$681 = ((App_6047(lob_6373.$0))(((App_6047(lob_6373.$0))((Var_6066(lob_6373.$0))(lob_6373.$1.$0)))(a_6372)))(lob_6373.$1.$1);
        return $phi$681
      }
    }))(e_6370))(oes_6371)
  }
})))(primaryExprP_6173)))(many_6116((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(l_6377){
  return function(op_6378){
    return function(e_6379){
      return (Pair_5962(l_6377))((Pair_5962(op_6378))(e_6379))
    }
  }
})))(locP_6138)))(anyOpP_6144)))(primaryExprP_6173)));
var parseExpr_6198 = runParser_6136(exprP_6156);
var strP_6165 = parseToken_6137(function(t_6359){
  if(t_6359.$0.$tag==3){
    var $phi$682 = Just_5968(t_6359.$1)
  } else var $phi$682 = Nothing_5969;
  return $phi$682
});
var nonReservedP_6146 = parseToken_6137(function(t_6305){
  if(t_6305.$0.$tag==5){
    var $phi$685 = ((contains_6036($import1$instance$Eq$1))(t_6305.$1))(reserved_6141);
    if($phi$685){
      var $phi$684 = Nothing_5969
    } else if(!$phi$685){
      var $phi$684 = Just_5968(t_6305.$1)
    } else error("pattern match fail",$phi$685);
    var $phi$683 = $phi$684
  } else var $phi$683 = Nothing_5969;
  return $phi$683
});
var importNoAliasP_6186 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(n_6391){
  return (Pair_5962(n_6391))(n_6391)
})))(nonReservedP_6146);
var importAliasP_6187 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Pair_5962)))(nonReservedP_6146)))((($pip$gt_6117($import3$instance$Applicative$1))(reservedP_6145("as")))(nonReservedP_6146));
var importOpenP_6188 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(ns_6392){
  return function(f_6393){
    return ((ImportOpen_6094(emptyAnn_6092))(f_6393))(ns_6392)
  }
})))((($lt$pip_6123($import3$instance$Applicative$1))((($pip$gt_6117($import3$instance$Applicative$1))(symP_6142("{")))((sepBy1_6118((($lt$pip$gt($import3$instance$Alternative$2))(importAliasP_6187))(importNoAliasP_6186)))(symP_6142(",")))))(symP_6142("}")))))((($pip$gt_6117($import3$instance$Applicative$1))(reservedP_6145("from")))(strP_6165));
var importAllP_6189 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(ImportAll_6093(emptyAnn_6092))))((($pip$gt_6117($import3$instance$Applicative$1))((($pip$gt_6117($import3$instance$Applicative$1))(operatorP_6143("*")))(reservedP_6145("from"))))(strP_6165));
var importP_6190 = (($pip$gt_6117($import3$instance$Applicative$1))(reservedP_6145("import")))((($lt$pip$gt($import3$instance$Alternative$2))(importOpenP_6188))(importAllP_6189));
var parseImports_6197 = runParser_6136(many_6116(importP_6190));
var addExportAnn_6410 = function(d_6411){
  var $phi$686 = (Pair_5962(d_6411.$0))((withAnn_6070(((((setAnn_6071($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_6105(d_6411.$0)))(annOf_6068(d_6411.$1))))(d_6411.$1));
  return $phi$686
};
var topLevelDef_6194 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(addExportAnn_6410)))(defP_6171);
var eitherP_6193 = function(a_6407){
  return function(b_6408){
    return ($_5975(Parser_6114))(function(s_6409){
      return (applyParser_6115((($lt$pip$gt($import3$instance$Alternative$2))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Left_5977)))(a_6407)))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Right_5978)))(b_6408))))(s_6409)
    })
  }
};
var classMemberP_6182 = ($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Pair_5962)))(notUpperCaseId_6148)))((($pip$gt_6117($import3$instance$Applicative$1))(operatorP_6143("::")))(typeP_6175));
var classP_6181 = ($lt$mul$mns$gt_6139(($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(name_6385){
  return function(tv_6386){
    return function(maybeDefs_6387){
      return (((Class_6097(emptyAnn_6092))(name_6385))(tv_6386))((justOr_6040([]))(maybeDefs_6387))
    }
  }
})))(($pip$mns$gt_6140(reservedP_6145("class")))(upperCaseId_6147))))(notUpperCaseId_6148)))(opt_6120((($pip$gt_6117($import3$instance$Applicative$1))(reservedP_6145("where")))(some_6122(classMemberP_6182))));
var instanceP_6183 = ($lt$mul$mns$gt_6139(($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(name_6388){
  return function(t_6389){
    return function(maybeDefs_6390){
      return (((Instance_6096(emptyAnn_6092))(name_6388))(t_6389))((justOr_6040([]))(maybeDefs_6390))
    }
  }
})))(($pip$mns$gt_6140(reservedP_6145("instance")))(upperCaseId_6147))))(simpleTypeP_6178)))(opt_6120((($pip$gt_6117($import3$instance$Applicative$1))(reservedP_6145("where")))(some_6122(defP_6171))));
var dataConP_6184 = ($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(DataCon_6075(emptyAnn_6092))))(upperCaseId_6147)))(many_6116(simpleTypeP_6178));
var dataP_6185 = ($lt$mul$mns$gt_6139(($lt$mul$mns$gt_6139((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Data_6074(emptyAnn_6092))))(($pip$mns$gt_6140(reservedP_6145("data")))(upperCaseId_6147))))(many_6116(notUpperCaseId_6148))))((($pip$gt_6117($import3$instance$Applicative$1))(operatorP_6143("=")))((sepBy1_6118(dataConP_6184))(operatorP_6143("|"))));
var topLevelP_6195 = (eitherP_6193((eitherP_6193(dataP_6185))(topLevelDef_6194)))((eitherP_6193(classP_6181))(instanceP_6183));
var splitFourWay_6192 = function(e_6404){
  var $phi$688 = splitEither_6038(e_6404);
  var $phi$687 = (Pair_5962(splitEither_6038($phi$688.$0)))(splitEither_6038($phi$688.$1));
  return $phi$687
};
var moduleP_6191 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(loc_6394){
  return function(is_6395){
    return function(es_6396){
      var $phi$690 = splitFourWay_6192(es_6396);
      var $phi$692 = getAnnCodeLoc_6090(loc_6394);
      if(($phi$692.$tag==0)&&($phi$692.$0.$tag==1)){
        var $phi$691 = $phi$692.$0.$0
      } else error("pattern match fail",$phi$692);
      var $phi$689 = ((((((Module_6099(loc_6394))($phi$691))(is_6395))($phi$690.$0.$0))($phi$690.$1.$0))($phi$690.$1.$1))($phi$690.$0.$1);
      return $phi$689
    }
  }
})))(locP_6138)))(many_6116(importP_6190))))(some_6122(topLevelP_6195));
var parseModule_6196 = runParser_6136(moduleP_6191);
var assert_6414 = assert_85;
var Pair_6415 = Pair_3;
var mapSnd_6416 = mapSnd_84;
var mapFst_6417 = mapFst_83;
var $gt$eq$gt_6418 = $gt$eq$gt_82;
var snd_6419 = snd_23;
var debug2_6420 = debug2_81;
var Just_6421 = Just_1;
var Nothing_6422 = Nothing_2;
var isJust_6423 = isJust_21;
var Empty_6424 = Empty_7;
var Leaf_6425 = Leaf_8;
var Collision_6426 = Collision_9;
var BitmapIndexed_6427 = BitmapIndexed_10;
var $_6428 = $_12;
var fst_6429 = fst_22;
var Left_6430 = Left_4;
var Right_6431 = Right_5;
var loop_6432 = loop_27;
var find_6433 = find_29;
var hamtMask_6434 = hamtMask_58;
var popCount_6435 = popCount_57;
var hamtIndex_6436 = hamtIndex_59;
var lookup_6437 = lookup_60;
var setContains_6438 = setContains_76;
var foldTrie_6439 = foldTrie_66;
var emptySet_6440 = emptySet_72;
var Unit_6441 = Unit_0;
var not_6442 = not_26;
var $div$eq_6443 = $div$eq_13;
var mapIx_6444 = mapIx_30;
var insert_6445 = insert_61;
var setAdd_6446 = setAdd_73;
var setIntersection_6447 = setIntersection_80;
var remove_6448 = remove_63;
var setDiff_6449 = setDiff_79;
var setToArray_6450 = setToArray_78;
var mergeTrie_6451 = mergeTrie_70;
var setUnion_6452 = setUnion_77;
var setRemove_6453 = setRemove_75;
var setAddAll_6454 = setAddAll_74;
var trieKeys_6455 = trieKeys_71;
var size_6456 = size_68;
var mapTrie_6457 = mapTrie_67;
var nodeMask_6458 = nodeMask_56;
var isEmpty_6459 = isEmpty_69;
var filterTrie_6460 = filterTrie_65;
var nextSetBitMask_6461 = nextSetBitMask_64;
var updateOrSet_6462 = updateOrSet_62;
var State_6463 = State_6;
var runState_6464 = runState_54;
var evalState_6465 = evalState_55;
var sets_6466 = sets_53;
var gets_6467 = gets_52;
var foldM_6468 = foldM_49;
var mapM_6469 = mapM_50;
var forM_6470 = forM_51;
var strToArray_6471 = strToArray_48;
var toRecord_6472 = toRecord_47;
var reverse_6473 = reverse_46;
var tail_6474 = tail_41;
var head_6475 = head_40;
var uniq_6476 = uniq_45;
var mergeSet_6477 = mergeSet_44;
var init_6478 = init_43;
var last_6479 = last_42;
var mapJust_6480 = mapJust_39;
var concatMap_6481 = concatMap_38;
var zip_6482 = zip_37;
var zipWithIndex2_6483 = zipWithIndex2_35;
var zipWithIndex_6484 = zipWithIndex_36;
var join_6485 = join_34;
var all_6486 = all_33;
var exists_6487 = exists_32;
var containsChar_6488 = containsChar_31;
var contains_6489 = contains_28;
var either_6490 = either_24;
var splitEither_6491 = splitEither_25;
var fromJust_6492 = fromJust_20;
var justOr_6493 = justOr_19;
var maybe_6494 = maybe_18;
var $gt$gt_6495 = $gt$gt_17;
var $gt$eq_6496 = $gt$eq_16;
var $lt$eq_6497 = $lt$eq_15;
var $gt_6498 = $gt_14;
var Identity_6499 = Identity_11;
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
var App_6500 = App_731;
var Lam_6501 = Lam_732;
var Case_6502 = Case_733;
var Let_6503 = Let_734;
var New_6504 = New_735;
var breakableDownAndUpM_6505 = breakableDownAndUpM_780;
var breakableDownM_6506 = breakableDownM_784;
var downAndUpM_6507 = downAndUpM_781;
var downM_6508 = downM_783;
var upM_6509 = upM_782;
var breakableDownAndUp_6510 = breakableDownAndUp_775;
var breakableDown_6511 = breakableDown_779;
var downAndUp_6512 = downAndUp_776;
var down_6513 = down_778;
var up_6514 = up_777;
var AnnType_6515 = AnnType_723;
var TUnknown_6516 = TUnknown_754;
var getAnn_6517 = getAnn_759;
var getAnnType_6518 = getAnnType_762;
var Var_6519 = Var_729;
var Const_6520 = Const_730;
var annOf_6521 = annOf_772;
var getType_6522 = getType_774;
var withAnn_6523 = withAnn_773;
var setAnn_6524 = setAnn_760;
var setAnnType_6525 = setAnnType_763;
var setType_6526 = setType_771;
var Data_6527 = Data_743;
var DataCon_6528 = DataCon_744;
var dataConName_6529 = dataConName_769;
var dataConNames_6530 = dataConNames_770;
var TCBound_6531 = TCBound_747;
var TConst_6532 = TConst_748;
var TVar_6533 = TVar_749;
var TApp_6534 = TApp_750;
var TRow_6535 = TRow_751;
var TBot_6536 = TBot_752;
var TForall_6537 = TForall_753;
var equivBound_6538 = equivBound_767;
var equivType_6539 = equivType_768;
var AnnCodeLoc_6540 = AnnCodeLoc_724;
var printCodeLoc_6541 = printCodeLoc_766;
var setAnnCodeLoc_6542 = setAnnCodeLoc_765;
var getAnnCodeLoc_6543 = getAnnCodeLoc_764;
var copyAnn_6544 = copyAnn_761;
var emptyAnn_6545 = emptyAnn_758;
var ImportAll_6546 = ImportAll_757;
var ImportOpen_6547 = ImportOpen_756;
var ImportClosed_6548 = ImportClosed_755;
var Instance_6549 = Instance_746;
var Class_6550 = Class_745;
var ModuleInterface_6551 = ModuleInterface_742;
var Module_6552 = Module_741;
var PData_6553 = PData_740;
var PConst_6554 = PConst_739;
var PVar_6555 = PVar_738;
var CStr_6556 = CStr_737;
var CNum_6557 = CNum_736;
var AnnExport_6558 = AnnExport_728;
var AnnTag_6559 = AnnTag_727;
var AnnData_6560 = AnnData_726;
var AnnUseCount_6561 = AnnUseCount_725;
var Success_6562 = Success_5711;
var Error_6563 = Error_5712;
var $import3$instance$Functor$0 = $instance$Functor$0;
var $import3$instance$Applicative$1 = $instance$Applicative$1;
var $import3$instance$Alternative$2 = $instance$Alternative$2;
var parseExpr_6564 = parseExpr_6198;
var parseModule_6565 = parseModule_6196;
var parseType_6566 = parseType_6199;
var ParserState_6567 = ParserState_6133;
var generateJs_6568 = compileModule_5615;
var printType_6569 = printType_2141;
var reallyPrintExpr_6570 = reallyPrintExpr_2146;
var newCtx_6571 = newCtx_3027;
var inferTypeModule_6572 = inferTypeModule_3069;
var getTypedExports_6573 = getTypedExports_3070;
var generalize_6574 = generalize_3061;
var emptyEnv_6575 = emptyEnv_3037;
var dfs_6576 = dfs_571;
var ArgBool_6577 = ArgBool_4619;
var ArgString_6578 = ArgString_4620;
var parseArgs_6579 = parseArgs_4623;
var getPositional_6580 = getPositional_4624;
var getString_6581 = getString_4625;
var getBool_6582 = getBool_4626;
var $import9$instance$Eq$0 = $instance$Eq$0;
var declassModule_6583 = declassModule_4154;
var normalizeImports_6584 = normalizeImports_3942;
var uniquify_6585 = uniquify_1883;
var mergeModules_6586 = mergeModules_2814;
var inline_6587 = inline_2418;
var translateAdts_6588 = translateAdts_1683;
var CompilerState_6589 = CompilerState_1475;
var reportTimes_6590 = reportTimes_1484;
var timingStart_6591 = timingStart_1481;
var timingEnd_6592 = timingEnd_1482;
var timed_6593 = timed_1483;
var perModule_6594 = perModule_1480;
var setUid_6595 = setUid_1479;
var getUid_6596 = getUid_1478;
var setExports_6597 = setExports_1477;
var getExports_6598 = getExports_1476;
var splitLetsPass_6599 = splitLetsPass_1269;
var mainArg_6609 = (ArgString_6578("main"))(Nothing_6422);
var profileArg_6610 = (ArgBool_6577("profile"))(Just_6421(false));
var optArg_6611 = (ArgBool_6577("opt"))(Just_6421(false));
var builtinsPathArg_6607 = (ArgString_6578("builtins"))(Nothing_6422);
var outPathArg_6608 = (ArgString_6578("out"))(Nothing_6422);
var argDefs_6612 = [builtinsPathArg_6607,outPathArg_6608,mainArg_6609,profileArg_6610,optArg_6611];
var liftPass_6613 = function(local$instance$Monad$0){
  return function(p_6696){
    return function(a_6697){
      return (ret(local$instance$Monad$0))(p_6696(a_6697))
    }
  }
};
var normalizeImportsPass_6614 = function(m_6698){
  return (($gt$gt$eq($import1$instance$Monad$11))(getExports_6598))(function(es_6699){
    return (ret($import1$instance$Monad$11))((normalizeImports_6584(es_6699))(m_6698))
  })
};
var moduleFile_6600 = function(m_6619){
  var $phi$693 = m_6619.$1;
  return $phi$693
};
var typerPass_6615 = function(m_6700){
  return (($gt$gt$eq($import1$instance$Monad$11))(getExports_6598))(function(es_6701){
    var typed_6702 = (inferTypeModule_6572(es_6701))(m_6700);
    var e_6703 = getTypedExports_6573(typed_6702);
    return (($gt$gt_6495($import1$instance$Monad$11))(setExports_6597(((set(moduleFile_6600(m_6700)))(e_6703))(es_6701))))((ret($import1$instance$Monad$11))(typed_6702))
  })
};
var declasserPass_6616 = function(m_6704){
  return (($gt$gt$eq($import1$instance$Monad$11))(getExports_6598))(function(es_6705){
    return (ret($import1$instance$Monad$11))((declassModule_6583(es_6705))(m_6704))
  })
};
var parse_6601 = function(fn_6627){
  var $phi$695 = (parseModule_6565(readFile(fn_6627)))(($concat("//"))(fn_6627));
  if($phi$695.$tag==0){
    var $phi$697 = (($eq$eq($import1$instance$Eq$0))($phi$695.$1.$1))(length($phi$695.$1.$0));
    if($phi$697){
      var $phi$696 = $phi$695.$0
    } else if(!$phi$697){
      var $phi$696 = error(($concat(($concat(fn_6627))(": failed to parse all tokens, stopped at ")))(jsonStringify((getIx($phi$695.$1.$1))($phi$695.$1.$0))))
    } else error("pattern match fail",$phi$697);
    var $phi$694 = $phi$696
  } else if($phi$695.$tag==1){
    var $phi$694 = error(($concat(($concat(fn_6627))(": ")))($phi$695.$0))
  } else error("pattern match fail",$phi$695);
  return $phi$694
};
var findImports_6603 = function(m_6643){
  var importFileName_6644 = function(i_6645){
    if(i_6645.$tag==2){
      var $phi$698 = i_6645.$1
    } else if(i_6645.$tag==1){
      var $phi$698 = i_6645.$1
    } else if(i_6645.$tag==0){
      var $phi$698 = i_6645.$1
    } else error("pattern match fail",i_6645);
    return $phi$698
  };
  var $phi$699 = (map(importFileName_6644))(m_6643.$2);
  return $phi$699
};
var depSort_6602 = function(mainName_6635){
  return function(ms_6636){
    var modules_6637 = ((foldl(function(r_6640){
      return function(m_6641){
        return ((set(moduleFile_6600(m_6641)))(m_6641))(r_6640)
      }
    }))(empty))(ms_6636);
    var imports_6638 = (mapRecord(findImports_6603))(modules_6637);
    var ordered_6639 = ((dfs_6576(imports_6638))([]))(mainName_6635);
    return ($_6428(reverse_6473))((map(function(n_6642){
      return (get(n_6642))(modules_6637)
    }))(ordered_6639))
  }
};
var parseT_6604 = function(s_6661){
  var $phi$701 = (parseType_6566(s_6661))("");
  if($phi$701.$tag==0){
    var $phi$700 = $phi$701.$0
  } else var $phi$700 = error($phi$701);
  return $phi$700
};
var parseExports_6605 = function(e_6665){
  var bs_6666 = (mapRecord(function(s_6667){
    return (evalState_6465(newCtx_6571))((generalize_6574(emptyEnv_6575))(parseT_6604(s_6667)))
  }))(e_6665);
  return ((ModuleInterface_6551(bs_6666))([]))([])
};
var instrument_6606 = function(m_6668){
  var addImport_6671 = function(i_6685){
    if((i_6685.$tag==1)&&("./builtins.js"==i_6685.$1)){
      var $phi$702 = ((ImportOpen_6547(i_6685.$0))("./builtins.js"))((push((Pair_6415("perfTime"))("perfTime")))(i_6685.$2))
    } else var $phi$702 = i_6685;
    return $phi$702
  };
  var instrumentExpr_6670 = function(n_6678){
    return function(e_6679){
      if(e_6679.$tag==3){
        var $phi$703 = ((Lam_6501(e_6679.$0))(e_6679.$1))((instrumentExpr_6670(n_6678))(e_6679.$2))
      } else {
        var we_6684 = ((Lam_6501(emptyAnn_6545))("$unused$"))(e_6679);
        var $phi$703 = ((App_6500(emptyAnn_6545))(((App_6500(emptyAnn_6545))((Var_6519(emptyAnn_6545))("perfTime")))((Const_6520(emptyAnn_6545))(CStr_6556(n_6678)))))(we_6684)
      };
      return $phi$703
    }
  };
  var instrumentDef_6669 = function(d_6672){
    if(d_6672.$1.$tag==3){
      var $phi$704 = (Pair_6415(d_6672.$0))((instrumentExpr_6670(d_6672.$0))(((Lam_6501(d_6672.$1.$0))(d_6672.$1.$1))(d_6672.$1.$2)))
    } else var $phi$704 = d_6672;
    return $phi$704
  };
  var $phi$705 = ((((((Module_6552(m_6668.$0))(m_6668.$1))((map(addImport_6671))(m_6668.$2)))(m_6668.$3))(m_6668.$4))(m_6668.$5))((map(instrumentDef_6669))(m_6668.$6));
  return $phi$705
};
var instrumentPass_6617 = function(local$instance$Monad$0){
  return function(profile_6706){
    return function(m_6707){
      if(!profile_6706){
        var $phi$706 = (ret(local$instance$Monad$0))(m_6707)
      } else if(profile_6706){
        var $phi$706 = (ret(local$instance$Monad$0))(instrument_6606(m_6707))
      } else error("pattern match fail",profile_6706);
      return $phi$706
    }
  }
};
var main_6618 = function(argv_6708){
  var args_6709 = (parseArgs_6579(argDefs_6612))((slice(2))(argv_6708));
  var srcFiles_6713 = getPositional_6580(args_6709);
  var builtinsPath_6710 = (getString_6581(args_6709))(builtinsPathArg_6607);
  var baseExports_6716 = ((set("./builtins.js"))(parseExports_6605(loadJSExports(builtinsPath_6710))))(empty);
  var mainName_6712 = ($concat("//"))((getString_6581(args_6709))(mainArg_6609));
  var profile_6714 = (getBool_6582(args_6709))(profileArg_6610);
  var opt_6715 = (getBool_6582(args_6709))(optArg_6611);
  var passes_6717 = (($gt$eq$gt_6418($import1$instance$Monad$11))((($gt$eq$gt_6418($import1$instance$Monad$11))((($gt$eq$gt_6418($import1$instance$Monad$11))((($gt$eq$gt_6418($import1$instance$Monad$11))((($gt$eq$gt_6418($import1$instance$Monad$11))((($gt$eq$gt_6418($import1$instance$Monad$11))((($gt$eq$gt_6418($import1$instance$Monad$11))((perModule_6594($import1$instance$Monad$11))(($_6428(timed_6593("parse")))((liftPass_6613($import1$instance$Monad$11))(parse_6601)))))((timed_6593("dep-sort"))((liftPass_6613($import1$instance$Monad$11))(depSort_6602(mainName_6712))))))((perModule_6594($import1$instance$Monad$11))((($gt$eq$gt_6418($import1$instance$Monad$11))((($gt$eq$gt_6418($import1$instance$Monad$11))((($gt$eq$gt_6418($import1$instance$Monad$11))((($gt$eq$gt_6418($import1$instance$Monad$11))((($gt$eq$gt_6418($import1$instance$Monad$11))((timed_6593("translate-adts"))((liftPass_6613($import1$instance$Monad$11))(translateAdts_6588))))((timed_6593("normalize-imports"))(normalizeImportsPass_6614))))((timed_6593("uniquify"))(uniquify_6585))))((timed_6593("split-lets"))(splitLetsPass_6599($import1$instance$Monad$11)))))((timed_6593("typer"))(typerPass_6615))))((timed_6593("declasser"))(declasserPass_6616))))))((timed_6593("merge-modules"))((liftPass_6613($import1$instance$Monad$11))(mergeModules_6586)))))((timed_6593("opt"))(inline_6587(opt_6715)))))((timed_6593("instrument"))((instrumentPass_6617($import1$instance$Monad$11))(profile_6714)))))((timed_6593("generate-js"))((liftPass_6613($import1$instance$Monad$11))(generateJs_6568(builtinsPath_6710))))))(reportTimes_6590);
  var js_6718 = (evalState_6465(((CompilerState_6589(baseExports_6716))(0))(Empty_6424)))(passes_6717(srcFiles_6713));
  var outPath_6711 = (getString_6581(args_6709))(outPathArg_6608);
  return (writeFile(js_6718))(outPath_6711)
};
var exports = {mainArg:mainArg_6609,profileArg:profileArg_6610,optArg:optArg_6611,builtinsPathArg:builtinsPathArg_6607,outPathArg:outPathArg_6608,argDefs:argDefs_6612,liftPass:liftPass_6613,normalizeImportsPass:normalizeImportsPass_6614,moduleFile:moduleFile_6600,typerPass:typerPass_6615,declasserPass:declasserPass_6616,parse:parse_6601,findImports:findImports_6603,depSort:depSort_6602,parseT:parseT_6604,parseExports:parseExports_6605,instrument:instrument_6606,instrumentPass:instrumentPass_6617,main:main_6618}
module.exports = exports;})();if (module.exports.main)module.exports.main(process.argv)