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
var App_731 = function($_0_798){
  return function($_1_799){
    return function($_2_800){
      return {$0:$_0_798,$1:$_1_799,$2:$_2_800,$tag:2}
    }
  }
};
var Lam_732 = function($_0_801){
  return function($_1_802){
    return function($_2_803){
      return {$0:$_0_801,$1:$_1_802,$2:$_2_803,$tag:3}
    }
  }
};
var Case_733 = function($_0_804){
  return function($_1_805){
    return function($_2_806){
      return {$0:$_0_804,$1:$_1_805,$2:$_2_806,$tag:4}
    }
  }
};
var Let_734 = function($_0_807){
  return function($_1_808){
    return function($_2_809){
      return {$0:$_0_807,$1:$_1_808,$2:$_2_809,$tag:5}
    }
  }
};
var New_735 = function($_0_810){
  return function($_1_811){
    return function($_2_812){
      return {$0:$_0_810,$1:$_1_811,$2:$_2_812,$tag:6}
    }
  }
};
var AnnType_723 = function($_0_787){
  return {$0:$_0_787,$tag:0}
};
var TUnknown_755 = {$tag:7};
var Var_729 = function($_0_794){
  return function($_1_795){
    return {$0:$_0_794,$1:$_1_795,$tag:0}
  }
};
var Const_730 = function($_0_796){
  return function($_1_797){
    return {$0:$_0_796,$1:$_1_797,$tag:1}
  }
};
var Data_743 = function($_0_832){
  return function($_1_833){
    return function($_2_834){
      return function($_3_835){
        return {$0:$_0_832,$1:$_1_833,$2:$_2_834,$3:$_3_835}
      }
    }
  }
};
var DataCon_744 = function($_0_836){
  return function($_1_837){
    return function($_2_838){
      return {$0:$_0_836,$1:$_1_837,$2:$_2_838}
    }
  }
};
var TCBound_747 = function($_0_847){
  return function($_1_848){
    return function($_2_849){
      return {$0:$_0_847,$1:$_1_848,$2:$_2_849}
    }
  }
};
var TConst_748 = function($_0_850){
  return function($_1_851){
    return {$0:$_0_850,$1:$_1_851,$tag:0}
  }
};
var TVar_749 = function($_0_852){
  return function($_1_853){
    return {$0:$_0_852,$1:$_1_853,$tag:1}
  }
};
var TSkolem_750 = function($_0_854){
  return function($_1_855){
    return {$0:$_0_854,$1:$_1_855,$tag:2}
  }
};
var TApp_751 = function($_0_856){
  return function($_1_857){
    return function($_2_858){
      return {$0:$_0_856,$1:$_1_857,$2:$_2_858,$tag:3}
    }
  }
};
var TRow_752 = function($_0_859){
  return function($_1_860){
    return function($_2_861){
      return {$0:$_0_859,$1:$_1_860,$2:$_2_861,$tag:4}
    }
  }
};
var TBot_753 = {$tag:5};
var TForall_754 = function($_0_862){
  return function($_1_863){
    return function($_2_864){
      return function($_3_865){
        return {$0:$_0_862,$1:$_1_863,$2:$_2_864,$3:$_3_865,$tag:6}
      }
    }
  }
};
var AnnCodeLoc_724 = function($_0_788){
  return function($_1_789){
    return function($_2_790){
      return {$0:$_0_788,$1:$_1_789,$2:$_2_790,$tag:1}
    }
  }
};
var ImportAll_758 = function($_0_872){
  return function($_1_873){
    return {$0:$_0_872,$1:$_1_873,$tag:2}
  }
};
var ImportOpen_757 = function($_0_869){
  return function($_1_870){
    return function($_2_871){
      return {$0:$_0_869,$1:$_1_870,$2:$_2_871,$tag:1}
    }
  }
};
var ImportClosed_756 = function($_0_866){
  return function($_1_867){
    return function($_2_868){
      return {$0:$_0_866,$1:$_1_867,$2:$_2_868,$tag:0}
    }
  }
};
var Instance_746 = function($_0_843){
  return function($_1_844){
    return function($_2_845){
      return function($_3_846){
        return {$0:$_0_843,$1:$_1_844,$2:$_2_845,$3:$_3_846}
      }
    }
  }
};
var Class_745 = function($_0_839){
  return function($_1_840){
    return function($_2_841){
      return function($_3_842){
        return {$0:$_0_839,$1:$_1_840,$2:$_2_841,$3:$_3_842}
      }
    }
  }
};
var ModuleInterface_742 = function($_0_829){
  return function($_1_830){
    return function($_2_831){
      return {$0:$_0_829,$1:$_1_830,$2:$_2_831}
    }
  }
};
var Module_741 = function($_0_822){
  return function($_1_823){
    return function($_2_824){
      return function($_3_825){
        return function($_4_826){
          return function($_5_827){
            return function($_6_828){
              return {$0:$_0_822,$1:$_1_823,$2:$_2_824,$3:$_3_825,$4:$_4_826,$5:$_5_827,$6:$_6_828}
            }
          }
        }
      }
    }
  }
};
var PData_740 = function($_0_819){
  return function($_1_820){
    return function($_2_821){
      return {$0:$_0_819,$1:$_1_820,$2:$_2_821,$tag:2}
    }
  }
};
var PConst_739 = function($_0_817){
  return function($_1_818){
    return {$0:$_0_817,$1:$_1_818,$tag:1}
  }
};
var PVar_738 = function($_0_815){
  return function($_1_816){
    return {$0:$_0_815,$1:$_1_816,$tag:0}
  }
};
var CStr_737 = function($_0_814){
  return {$0:$_0_814,$tag:1}
};
var CNum_736 = function($_0_813){
  return {$0:$_0_813,$tag:0}
};
var AnnExport_728 = function($_0_793){
  return {$0:$_0_793,$tag:5}
};
var AnnTag_727 = {$tag:4};
var AnnData_726 = function($_0_792){
  return {$0:$_0_792,$tag:3}
};
var AnnUseCount_725 = function($_0_791){
  return {$0:$_0_791,$tag:2}
};
var breakableDownAndUpM_782 = function(local$instance$Monad$0){
  return function(down_1084){
    return function(up_1085){
      return function(e_1086){
        var go_1087 = ((breakableDownAndUpM_782(local$instance$Monad$0))(down_1084))(up_1085);
        var gos_1088 = (mapM_692(local$instance$Monad$0))(function(d_1089){
          var $phi$141 = (($gt$gt$eq(local$instance$Monad$0))(go_1087(d_1089.$1)))(function(e_1092){
            return (ret(local$instance$Monad$0))((Pair_638(d_1089.$0))(e_1092))
          });
          return $phi$141
        });
        return (($gt$gt$eq(local$instance$Monad$0))(down_1084(e_1086)))(function(e_1093){
          if(e_1093.$tag==1){
            var $phi$142 = (ret(local$instance$Monad$0))(e_1093.$0)
          } else if(e_1093.$tag==0){
            if(e_1093.$0.$tag==3){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(go_1087(e_1093.$0.$2)))(function(e_1099){
                return up_1085(((Lam_732(e_1093.$0.$0))(e_1093.$0.$1))(e_1099))
              })
            } else if(e_1093.$0.$tag==2){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(go_1087(e_1093.$0.$1)))(function(f_1103){
                return (($gt$gt$eq(local$instance$Monad$0))(go_1087(e_1093.$0.$2)))(function(x_1104){
                  return up_1085(((App_731(e_1093.$0.$0))(f_1103))(x_1104))
                })
              })
            } else if(e_1093.$0.$tag==4){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(go_1087(e_1093.$0.$1)))(function(e_1108){
                return (($gt$gt$eq(local$instance$Monad$0))(gos_1088(e_1093.$0.$2)))(function(ps_1109){
                  return up_1085(((Case_733(e_1093.$0.$0))(e_1108))(ps_1109))
                })
              })
            } else if(e_1093.$0.$tag==5){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(gos_1088(e_1093.$0.$1)))(function(bs_1113){
                return (($gt$gt$eq(local$instance$Monad$0))(go_1087(e_1093.$0.$2)))(function(e_1114){
                  return up_1085(((Let_734(e_1093.$0.$0))(bs_1113))(e_1114))
                })
              })
            } else if(e_1093.$0.$tag==6){
              var $phi$143 = (($gt$gt$eq(local$instance$Monad$0))(((mapM_692(local$instance$Monad$0))(go_1087))(e_1093.$0.$2)))(function(es_1118){
                return up_1085(((New_735(e_1093.$0.$0))(e_1093.$0.$1))(es_1118))
              })
            } else var $phi$143 = up_1085(e_1093.$0);
            var $phi$142 = $phi$143
          } else error("pattern match fail",e_1093);
          return $phi$142
        })
      }
    }
  }
};
var breakableDownM_786 = function(local$instance$Monad$0){
  return function(f_1125){
    return ((breakableDownAndUpM_782(local$instance$Monad$0))(f_1125))(ret(local$instance$Monad$0))
  }
};
var downAndUpM_783 = function(local$instance$Monad$0){
  return function(down_1120){
    return function(up_1121){
      return ((breakableDownAndUpM_782(local$instance$Monad$0))(function(e_1122){
        return (($gt$gt$eq(local$instance$Monad$0))(down_1120(e_1122)))(function(e_1123){
          return (ret(local$instance$Monad$0))(Left_653(e_1123))
        })
      }))(up_1121)
    }
  }
};
var downM_785 = function(local$instance$Monad$0){
  return function(f_1124){
    return ((downAndUpM_783(local$instance$Monad$0))(f_1124))(ret(local$instance$Monad$0))
  }
};
var upM_784 = function(local$instance$Monad$0){
  return (downAndUpM_783(local$instance$Monad$0))(ret(local$instance$Monad$0))
};
var breakableDownAndUp_777 = function(down_1022){
  return function(up_1023){
    return function(a_1024){
      return function(e_1025){
        var go_1026 = (breakableDownAndUp_777(down_1022))(up_1023);
        var gos_1027 = function(a_1028){
          return (foldl(function(ar_1029){
            return function(p_1030){
              var $phi$145 = (go_1026(fst_652(ar_1029)))(snd_642(p_1030));
              var $phi$144 = (Pair_638($phi$145.$0))((push((Pair_638(fst_652(p_1030)))($phi$145.$1)))(snd_642(ar_1029)));
              return $phi$144
            }
          }))((Pair_638(a_1028))([]))
        };
        var $phi$147 = (down_1022(a_1024))(e_1025);
        if($phi$147.$tag==1){
          var $phi$146 = $phi$147.$0
        } else if($phi$147.$tag==0){
          if($phi$147.$0.$1.$tag==3){
            var $phi$167 = (go_1026($phi$147.$0.$0))($phi$147.$0.$1.$2);
            var $phi$166 = (Pair_638($phi$167.$0))(((Lam_732($phi$147.$0.$1.$0))($phi$147.$0.$1.$1))($phi$167.$1));
            var $phi$148 = $phi$166
          } else if($phi$147.$0.$1.$tag==2){
            var $phi$163 = (go_1026($phi$147.$0.$0))($phi$147.$0.$1.$1);
            var $phi$165 = (go_1026($phi$163.$0))($phi$147.$0.$1.$2);
            var $phi$164 = (Pair_638($phi$165.$0))(((App_731($phi$147.$0.$1.$0))($phi$163.$1))($phi$165.$1));
            var $phi$162 = $phi$164;
            var $phi$148 = $phi$162
          } else if($phi$147.$0.$1.$tag==4){
            var $phi$159 = (go_1026($phi$147.$0.$0))($phi$147.$0.$1.$1);
            var $phi$161 = (gos_1027($phi$159.$0))($phi$147.$0.$1.$2);
            var $phi$160 = (Pair_638($phi$161.$0))(((Case_733($phi$147.$0.$1.$0))($phi$159.$1))($phi$161.$1));
            var $phi$158 = $phi$160;
            var $phi$148 = $phi$158
          } else if($phi$147.$0.$1.$tag==5){
            var $phi$155 = (gos_1027($phi$147.$0.$0))($phi$147.$0.$1.$1);
            var $phi$157 = (go_1026($phi$155.$0))($phi$147.$0.$1.$2);
            var $phi$156 = (Pair_638($phi$157.$0))(((Let_734($phi$147.$0.$1.$0))($phi$155.$1))($phi$157.$1));
            var $phi$154 = $phi$156;
            var $phi$148 = $phi$154
          } else if($phi$147.$0.$1.$tag==6){
            var f_1066 = function(aes_1067){
              return function(e_1068){
                var $phi$151 = (go_1026(aes_1067.$0))(e_1068);
                var $phi$150 = (Pair_638($phi$151.$0))((push($phi$151.$1))(aes_1067.$1));
                var $phi$149 = $phi$150;
                return $phi$149
              }
            };
            var $phi$153 = ((foldl(f_1066))((Pair_638(a_1024))([])))($phi$147.$0.$1.$2);
            var $phi$152 = (Pair_638($phi$153.$0))(((New_735($phi$147.$0.$1.$0))($phi$147.$0.$1.$1))($phi$153.$1));
            var $phi$148 = $phi$152
          } else var $phi$148 = (Pair_638($phi$147.$0.$0))($phi$147.$0.$1);
          var ae_1036 = $phi$148;
          var $phi$168 = (up_1023(ae_1036.$0))(ae_1036.$1);
          var $phi$146 = $phi$168
        } else error("pattern match fail",$phi$147);
        return $phi$146
      }
    }
  }
};
var breakableDown_781 = function(f_1083){
  return (breakableDownAndUp_777(f_1083))(Pair_638)
};
var downAndUp_778 = function(down_1078){
  return function(up_1079){
    return (breakableDownAndUp_777(function(a_1080){
      return function(e_1081){
        return Left_653((down_1078(a_1080))(e_1081))
      }
    }))(up_1079)
  }
};
var down_780 = function(f_1082){
  return (downAndUp_778(f_1082))(Pair_638)
};
var up_779 = downAndUp_778(Pair_638);
var getAnn_760 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(name_874){
      return function(ann_875){
        return (((lookup_660(local$instance$Hashable$1))(local$instance$Eq$0))(name_874))(ann_875)
      }
    }
  }
};
var getAnnType_763 = function(ann_885){
  var $phi$170 = (((getAnn_760($import1$instance$Hashable$13))($import1$instance$Eq$1))("type"))(ann_885);
  if(($phi$170.$tag==0)&&($phi$170.$0.$tag==0)){
    var $phi$169 = $phi$170.$0.$0
  } else if($phi$170.$tag==1){
    var $phi$169 = TUnknown_755
  } else error("pattern match fail",$phi$170);
  return $phi$169
};
var annOf_774 = function(e_980){
  if(e_980.$tag==0){
    var $phi$171 = e_980.$0
  } else if(e_980.$tag==1){
    var $phi$171 = e_980.$0
  } else if(e_980.$tag==2){
    var $phi$171 = e_980.$0
  } else if(e_980.$tag==3){
    var $phi$171 = e_980.$0
  } else if(e_980.$tag==4){
    var $phi$171 = e_980.$0
  } else if(e_980.$tag==5){
    var $phi$171 = e_980.$0
  } else if(e_980.$tag==6){
    var $phi$171 = e_980.$0
  } else error("pattern match fail",e_980);
  return $phi$171
};
var getType_776 = function(e_1021){
  return ($_651(getAnnType_763))(annOf_774(e_1021))
};
var withAnn_775 = function(ann_1000){
  return function(e_1001){
    if(e_1001.$tag==0){
      var $phi$172 = (Var_729(ann_1000))(e_1001.$1)
    } else if(e_1001.$tag==1){
      var $phi$172 = (Const_730(ann_1000))(e_1001.$1)
    } else if(e_1001.$tag==2){
      var $phi$172 = ((App_731(ann_1000))(e_1001.$1))(e_1001.$2)
    } else if(e_1001.$tag==3){
      var $phi$172 = ((Lam_732(ann_1000))(e_1001.$1))(e_1001.$2)
    } else if(e_1001.$tag==4){
      var $phi$172 = ((Case_733(ann_1000))(e_1001.$1))(e_1001.$2)
    } else if(e_1001.$tag==5){
      var $phi$172 = ((Let_734(ann_1000))(e_1001.$1))(e_1001.$2)
    } else if(e_1001.$tag==6){
      var $phi$172 = ((New_735(ann_1000))(e_1001.$1))(e_1001.$2)
    } else error("pattern match fail",e_1001);
    return $phi$172
  }
};
var setAnn_761 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(name_876){
      return function(val_877){
        return function(ann_878){
          return ((((insert_668(local$instance$Hashable$1))(local$instance$Eq$0))(name_876))(val_877))(ann_878)
        }
      }
    }
  }
};
var setAnnType_764 = function(t_887){
  return function(ann_888){
    return ((((setAnn_761($import1$instance$Hashable$13))($import1$instance$Eq$1))("type"))(AnnType_723(t_887)))(ann_888)
  }
};
var setType_773 = function(t_959){
  return function(e_960){
    if(e_960.$tag==0){
      var $phi$173 = (Var_729((setAnnType_764(t_959))(e_960.$0)))(e_960.$1)
    } else if(e_960.$tag==1){
      var $phi$173 = (Const_730((setAnnType_764(t_959))(e_960.$0)))(e_960.$1)
    } else if(e_960.$tag==2){
      var $phi$173 = ((App_731((setAnnType_764(t_959))(e_960.$0)))(e_960.$1))(e_960.$2)
    } else if(e_960.$tag==3){
      var $phi$173 = ((Lam_732((setAnnType_764(t_959))(e_960.$0)))(e_960.$1))(e_960.$2)
    } else if(e_960.$tag==4){
      var $phi$173 = ((Case_733((setAnnType_764(t_959))(e_960.$0)))(e_960.$1))(e_960.$2)
    } else if(e_960.$tag==5){
      var $phi$173 = ((Let_734((setAnnType_764(t_959))(e_960.$0)))(e_960.$1))(e_960.$2)
    } else if(e_960.$tag==6){
      var $phi$173 = ((New_735((setAnnType_764(t_959))(e_960.$0)))(e_960.$1))(e_960.$2)
    } else error("pattern match fail",e_960);
    return $phi$173
  }
};
var dataConName_771 = function(dc_950){
  var $phi$174 = dc_950.$1;
  return $phi$174
};
var dataConNames_772 = function(d_954){
  var $phi$175 = (map(dataConName_771))(d_954.$3);
  return $phi$175
};
var equivBound_769 = function(a_900){
  return function(b_901){
    var $phi$177 = ($and((($eq$eq($import1$instance$Eq$1))(a_900.$1))(b_901.$1)))((equivType_770(a_900.$2))(b_901.$2));
    var $phi$176 = $phi$177;
    return $phi$176
  }
};
var equivType_770 = function(a_908){
  return function(b_909){
    if(a_908.$tag==0){
      if(b_909.$tag==0){
        var $phi$185 = (($eq$eq($import1$instance$Eq$1))(a_908.$1))(b_909.$1)
      } else var $phi$185 = false;
      var $phi$178 = $phi$185
    } else if(a_908.$tag==1){
      if(b_909.$tag==1){
        var $phi$184 = (($eq$eq($import1$instance$Eq$1))(a_908.$1))(b_909.$1)
      } else var $phi$184 = false;
      var $phi$178 = $phi$184
    } else if(a_908.$tag==2){
      if(b_909.$tag==2){
        var $phi$183 = (($eq$eq($import1$instance$Eq$1))(a_908.$1))(b_909.$1)
      } else var $phi$183 = false;
      var $phi$178 = $phi$183
    } else if(a_908.$tag==3){
      if(b_909.$tag==3){
        var $phi$182 = ($and((equivType_770(a_908.$1))(b_909.$1)))((equivType_770(a_908.$2))(b_909.$2))
      } else var $phi$182 = false;
      var $phi$178 = $phi$182
    } else if(a_908.$tag==5){
      if(b_909.$tag==5){
        var $phi$181 = true
      } else var $phi$181 = false;
      var $phi$178 = $phi$181
    } else if(a_908.$tag==7){
      if(b_909.$tag==7){
        var $phi$180 = true
      } else var $phi$180 = false;
      var $phi$178 = $phi$180
    } else if(a_908.$tag==4){
      var $phi$178 = error("no support for TRow in equivType yet")
    } else if(a_908.$tag==6){
      if(b_909.$tag==6){
        var rbs_946 = (all_709(function(p_948){
          return (equivBound_769(fst_652(p_948)))(snd_642(p_948))
        }))((zip_705(a_908.$2))(b_909.$2));
        var rvs_945 = (all_709(function(p_947){
          return (($eq$eq($import1$instance$Eq$1))(fst_652(p_947)))(snd_642(p_947))
        }))((zip_705(a_908.$1))(b_909.$1));
        var $phi$179 = ($and(($and(rvs_945))(rbs_946)))((equivType_770(a_908.$3))(b_909.$3))
      } else var $phi$179 = false;
      var $phi$178 = $phi$179
    } else error("pattern match fail",a_908);
    return $phi$178
  }
};
var getAnnCodeLoc_765 = function(ann_889){
  return (((getAnn_760($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(ann_889)
};
var printCodeLoc_767 = function(l_894){
  if(l_894.$tag==1){
    var $phi$186 = ($concat(($concat(($concat(($concat(($concat("in "))(l_894.$0)))(" at line ")))(intToString(l_894.$1+1))))(", column ")))(intToString(l_894.$2+1))
  } else error("pattern match fail",l_894);
  return $phi$186
};
var exprLoc_768 = function(e_898){
  var $phi$188 = ($_651(getAnnCodeLoc_765))(annOf_774(e_898));
  if($phi$188.$tag==1){
    var $phi$187 = "in unknown location"
  } else if($phi$188.$tag==0){
    var $phi$187 = printCodeLoc_767($phi$188.$0)
  } else error("pattern match fail",$phi$188);
  return $phi$187
};
var setAnnCodeLoc_766 = function(file_890){
  return function(line_891){
    return function(col_892){
      return function(ann_893){
        return ((((setAnn_761($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(((AnnCodeLoc_724(file_890))(line_891))(col_892)))(ann_893)
      }
    }
  }
};
var copyAnn_762 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(names_879){
      return function(ann_880){
        var f_881 = function(r_882){
          return function(n_883){
            var $phi$190 = (((getAnn_760(local$instance$Hashable$1))(local$instance$Eq$0))(n_883))(ann_880);
            if($phi$190.$tag==1){
              var $phi$189 = r_882
            } else if($phi$190.$tag==0){
              var $phi$189 = ((((setAnn_761(local$instance$Hashable$1))(local$instance$Eq$0))(n_883))($phi$190.$0))(r_882)
            } else error("pattern match fail",$phi$190);
            return $phi$189
          }
        };
        return ((foldl(f_881))(Empty_647))(names_879)
      }
    }
  }
};
var emptyAnn_759 = Empty_647;
var assert_1126 = assert_85;
var Pair_1127 = Pair_3;
var mapSnd_1128 = mapSnd_84;
var mapFst_1129 = mapFst_83;
var $gt$eq$gt_1130 = $gt$eq$gt_82;
var snd_1131 = snd_23;
var debug2_1132 = debug2_81;
var Just_1133 = Just_1;
var Nothing_1134 = Nothing_2;
var isJust_1135 = isJust_21;
var Empty_1136 = Empty_7;
var Leaf_1137 = Leaf_8;
var Collision_1138 = Collision_9;
var BitmapIndexed_1139 = BitmapIndexed_10;
var $_1140 = $_12;
var fst_1141 = fst_22;
var Left_1142 = Left_4;
var Right_1143 = Right_5;
var loop_1144 = loop_27;
var find_1145 = find_29;
var hamtMask_1146 = hamtMask_58;
var popCount_1147 = popCount_57;
var hamtIndex_1148 = hamtIndex_59;
var lookup_1149 = lookup_60;
var setContains_1150 = setContains_76;
var foldTrie_1151 = foldTrie_66;
var emptySet_1152 = emptySet_72;
var Unit_1153 = Unit_0;
var not_1154 = not_26;
var $div$eq_1155 = $div$eq_13;
var mapIx_1156 = mapIx_30;
var insert_1157 = insert_61;
var setAdd_1158 = setAdd_73;
var setIntersection_1159 = setIntersection_80;
var remove_1160 = remove_63;
var setDiff_1161 = setDiff_79;
var setToArray_1162 = setToArray_78;
var mergeTrie_1163 = mergeTrie_70;
var setUnion_1164 = setUnion_77;
var setRemove_1165 = setRemove_75;
var setAddAll_1166 = setAddAll_74;
var trieKeys_1167 = trieKeys_71;
var size_1168 = size_68;
var mapTrie_1169 = mapTrie_67;
var nodeMask_1170 = nodeMask_56;
var isEmpty_1171 = isEmpty_69;
var filterTrie_1172 = filterTrie_65;
var nextSetBitMask_1173 = nextSetBitMask_64;
var updateOrSet_1174 = updateOrSet_62;
var State_1175 = State_6;
var runState_1176 = runState_54;
var evalState_1177 = evalState_55;
var sets_1178 = sets_53;
var gets_1179 = gets_52;
var foldM_1180 = foldM_49;
var mapM_1181 = mapM_50;
var forM_1182 = forM_51;
var strToArray_1183 = strToArray_48;
var toRecord_1184 = toRecord_47;
var reverse_1185 = reverse_46;
var tail_1186 = tail_41;
var head_1187 = head_40;
var uniq_1188 = uniq_45;
var mergeSet_1189 = mergeSet_44;
var init_1190 = init_43;
var last_1191 = last_42;
var mapJust_1192 = mapJust_39;
var concatMap_1193 = concatMap_38;
var zip_1194 = zip_37;
var zipWithIndex2_1195 = zipWithIndex2_35;
var zipWithIndex_1196 = zipWithIndex_36;
var join_1197 = join_34;
var all_1198 = all_33;
var exists_1199 = exists_32;
var containsChar_1200 = containsChar_31;
var contains_1201 = contains_28;
var either_1202 = either_24;
var splitEither_1203 = splitEither_25;
var fromJust_1204 = fromJust_20;
var justOr_1205 = justOr_19;
var maybe_1206 = maybe_18;
var $gt$gt_1207 = $gt$gt_17;
var $gt$eq_1208 = $gt$eq_16;
var $lt$eq_1209 = $lt$eq_15;
var $gt_1210 = $gt_14;
var Identity_1211 = Identity_11;
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
var App_1212 = App_731;
var Lam_1213 = Lam_732;
var Case_1214 = Case_733;
var Let_1215 = Let_734;
var New_1216 = New_735;
var breakableDownAndUpM_1217 = breakableDownAndUpM_782;
var breakableDownM_1218 = breakableDownM_786;
var downAndUpM_1219 = downAndUpM_783;
var downM_1220 = downM_785;
var upM_1221 = upM_784;
var breakableDownAndUp_1222 = breakableDownAndUp_777;
var breakableDown_1223 = breakableDown_781;
var downAndUp_1224 = downAndUp_778;
var down_1225 = down_780;
var up_1226 = up_779;
var AnnType_1227 = AnnType_723;
var TUnknown_1228 = TUnknown_755;
var getAnn_1229 = getAnn_760;
var getAnnType_1230 = getAnnType_763;
var Var_1231 = Var_729;
var Const_1232 = Const_730;
var annOf_1233 = annOf_774;
var getType_1234 = getType_776;
var withAnn_1235 = withAnn_775;
var setAnn_1236 = setAnn_761;
var setAnnType_1237 = setAnnType_764;
var setType_1238 = setType_773;
var Data_1239 = Data_743;
var DataCon_1240 = DataCon_744;
var dataConName_1241 = dataConName_771;
var dataConNames_1242 = dataConNames_772;
var TCBound_1243 = TCBound_747;
var TConst_1244 = TConst_748;
var TVar_1245 = TVar_749;
var TSkolem_1246 = TSkolem_750;
var TApp_1247 = TApp_751;
var TRow_1248 = TRow_752;
var TBot_1249 = TBot_753;
var TForall_1250 = TForall_754;
var equivBound_1251 = equivBound_769;
var equivType_1252 = equivType_770;
var getAnnCodeLoc_1253 = getAnnCodeLoc_765;
var AnnCodeLoc_1254 = AnnCodeLoc_724;
var printCodeLoc_1255 = printCodeLoc_767;
var exprLoc_1256 = exprLoc_768;
var setAnnCodeLoc_1257 = setAnnCodeLoc_766;
var copyAnn_1258 = copyAnn_762;
var emptyAnn_1259 = emptyAnn_759;
var ImportAll_1260 = ImportAll_758;
var ImportOpen_1261 = ImportOpen_757;
var ImportClosed_1262 = ImportClosed_756;
var Instance_1263 = Instance_746;
var Class_1264 = Class_745;
var ModuleInterface_1265 = ModuleInterface_742;
var Module_1266 = Module_741;
var PData_1267 = PData_740;
var PConst_1268 = PConst_739;
var PVar_1269 = PVar_738;
var CStr_1270 = CStr_737;
var CNum_1271 = CNum_736;
var AnnExport_1272 = AnnExport_728;
var AnnTag_1273 = AnnTag_727;
var AnnData_1274 = AnnData_726;
var AnnUseCount_1275 = AnnUseCount_725;
var sccSorted_1276 = sccSorted_574;
var splitLetsPass_1282 = function(local$instance$Monad$0){
  return function(m_1339){
    return (ret(local$instance$Monad$0))(m_1339)
  }
};
var addRef_1277 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(n_1283){
      return (($gt$gt$eq($import1$instance$Monad$11))(gets_1179))(function(ns_1284){
        return sets_1178((((setAdd_1158(local$instance$Hashable$1))(local$instance$Eq$0))(n_1283))(ns_1284))
      })
    }
  }
};
var delRef_1278 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(n_1285){
      return (($gt$gt$eq($import1$instance$Monad$11))(gets_1179))(function(ns_1286){
        return sets_1178((((setRemove_1165(local$instance$Hashable$1))(local$instance$Eq$0))(n_1285))(ns_1286))
      })
    }
  }
};
var getRefs_1279 = gets_1179;
var splitExpr_1280 = function(e_1287){
  var handleLet_1290 = function(e_1310){
    if(e_1310.$tag==5){
      var $phi$191 = (($gt$gt$eq($import1$instance$Monad$11))(splitExpr_1280(e_1310.$2)))(function(e_1314){
        return (($gt$gt$eq($import1$instance$Monad$11))(splitBindings_1281(e_1310.$1)))(function(gbs_1315){
          var l_1316 = ((foldr(function(e_1317){
            return function(bs_1318){
              return ((Let_1215(emptyAnn_1259))(bs_1318))(e_1317)
            }
          }))(e_1314))(gbs_1315);
          return (ret($import1$instance$Monad$11))(Right_1143((withAnn_1235(e_1310.$0))(l_1316)))
        })
      })
    } else var $phi$191 = (ret($import1$instance$Monad$11))(Left_1142(e_1310));
    return $phi$191
  };
  var splitPat_1289 = function(p_1302){
    if(p_1302.$tag==1){
      var $phi$192 = (ret($import1$instance$Monad$11))(Unit_1153)
    } else if(p_1302.$tag==0){
      var $phi$192 = ((delRef_1278($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_1302.$1)
    } else if(p_1302.$tag==2){
      var $phi$192 = (($gt$gt_1207($import1$instance$Monad$11))(((mapM_1181($import1$instance$Monad$11))(splitPat_1289))(p_1302.$2)))(((addRef_1277($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_1302.$1))
    } else error("pattern match fail",p_1302);
    return $phi$192
  };
  var split_1288 = function(e_1291){
    if(e_1291.$tag==0){
      var $phi$193 = (($gt$gt_1207($import1$instance$Monad$11))(((addRef_1277($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_1291.$1)))((ret($import1$instance$Monad$11))(e_1291))
    } else if(e_1291.$tag==4){
      var $phi$193 = (($gt$gt_1207($import1$instance$Monad$11))(((mapM_1181($import1$instance$Monad$11))(function(p_1297){
        return splitPat_1289(fst_1141(p_1297))
      }))(e_1291.$2)))((ret($import1$instance$Monad$11))(e_1291))
    } else if(e_1291.$tag==3){
      var $phi$193 = (($gt$gt_1207($import1$instance$Monad$11))(((delRef_1278($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_1291.$1)))((ret($import1$instance$Monad$11))(e_1291))
    } else var $phi$193 = (ret($import1$instance$Monad$11))(e_1291);
    return $phi$193
  };
  return (((breakableDownAndUpM_1217($import1$instance$Monad$11))(handleLet_1290))(split_1288))(e_1287)
};
var splitBindings_1281 = function(bs_1320){
  var ns_1321 = (map(fst_1141))(bs_1320);
  var processBinding_1322 = function(gbs_1323){
    return function(b_1324){
      var $phi$195 = (($gt$gt$eq($import1$instance$Monad$11))(splitExpr_1280(b_1324.$1)))(function(e_1329){
        return (($gt$gt$eq($import1$instance$Monad$11))(getRefs_1279))(function(refs_1330){
          var uses_1331 = (filter(function(n_1332){
            return (((setContains_1150($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1332))(refs_1330)
          }))(ns_1321);
          return (($gt$gt_1207($import1$instance$Monad$11))(((mapM_1181($import1$instance$Monad$11))((delRef_1278($import1$instance$Hashable$13))($import1$instance$Eq$1)))(uses_1331)))((ret($import1$instance$Monad$11))((Pair_1127(((set(b_1324.$0))((filter(($div$eq_1155($import1$instance$Eq$1))(b_1324.$0)))(uses_1331)))(gbs_1323.$0)))((push((Pair_1127(b_1324.$0))(e_1329)))(gbs_1323.$1))))
        })
      });
      var $phi$194 = $phi$195;
      return $phi$194
    }
  };
  return (($gt$gt$eq($import1$instance$Monad$11))((((foldM_1180($import1$instance$Monad$11))(processBinding_1322))((Pair_1127(empty))([])))(bs_1320)))(function(gbs_1333){
    var ccs_1337 = sccSorted_1276(gbs_1333.$0);
    var bsm_1336 = toRecord_1184(gbs_1333.$1);
    var $phi$196 = (ret($import1$instance$Monad$11))((map(map(function(n_1338){
      return (Pair_1127(n_1338))((get(n_1338))(bsm_1336))
    })))(ccs_1337));
    return $phi$196
  })
};
var assert_1340 = assert_85;
var Pair_1341 = Pair_3;
var mapSnd_1342 = mapSnd_84;
var mapFst_1343 = mapFst_83;
var $gt$eq$gt_1344 = $gt$eq$gt_82;
var snd_1345 = snd_23;
var debug2_1346 = debug2_81;
var Just_1347 = Just_1;
var Nothing_1348 = Nothing_2;
var isJust_1349 = isJust_21;
var Empty_1350 = Empty_7;
var Leaf_1351 = Leaf_8;
var Collision_1352 = Collision_9;
var BitmapIndexed_1353 = BitmapIndexed_10;
var $_1354 = $_12;
var fst_1355 = fst_22;
var Left_1356 = Left_4;
var Right_1357 = Right_5;
var loop_1358 = loop_27;
var find_1359 = find_29;
var hamtMask_1360 = hamtMask_58;
var popCount_1361 = popCount_57;
var hamtIndex_1362 = hamtIndex_59;
var lookup_1363 = lookup_60;
var setContains_1364 = setContains_76;
var foldTrie_1365 = foldTrie_66;
var emptySet_1366 = emptySet_72;
var Unit_1367 = Unit_0;
var not_1368 = not_26;
var $div$eq_1369 = $div$eq_13;
var mapIx_1370 = mapIx_30;
var insert_1371 = insert_61;
var setAdd_1372 = setAdd_73;
var setIntersection_1373 = setIntersection_80;
var remove_1374 = remove_63;
var setDiff_1375 = setDiff_79;
var setToArray_1376 = setToArray_78;
var mergeTrie_1377 = mergeTrie_70;
var setUnion_1378 = setUnion_77;
var setRemove_1379 = setRemove_75;
var setAddAll_1380 = setAddAll_74;
var trieKeys_1381 = trieKeys_71;
var size_1382 = size_68;
var mapTrie_1383 = mapTrie_67;
var nodeMask_1384 = nodeMask_56;
var isEmpty_1385 = isEmpty_69;
var filterTrie_1386 = filterTrie_65;
var nextSetBitMask_1387 = nextSetBitMask_64;
var updateOrSet_1388 = updateOrSet_62;
var State_1389 = State_6;
var runState_1390 = runState_54;
var evalState_1391 = evalState_55;
var sets_1392 = sets_53;
var gets_1393 = gets_52;
var foldM_1394 = foldM_49;
var mapM_1395 = mapM_50;
var forM_1396 = forM_51;
var strToArray_1397 = strToArray_48;
var toRecord_1398 = toRecord_47;
var reverse_1399 = reverse_46;
var tail_1400 = tail_41;
var head_1401 = head_40;
var uniq_1402 = uniq_45;
var mergeSet_1403 = mergeSet_44;
var init_1404 = init_43;
var last_1405 = last_42;
var mapJust_1406 = mapJust_39;
var concatMap_1407 = concatMap_38;
var zip_1408 = zip_37;
var zipWithIndex2_1409 = zipWithIndex2_35;
var zipWithIndex_1410 = zipWithIndex_36;
var join_1411 = join_34;
var all_1412 = all_33;
var exists_1413 = exists_32;
var containsChar_1414 = containsChar_31;
var contains_1415 = contains_28;
var either_1416 = either_24;
var splitEither_1417 = splitEither_25;
var fromJust_1418 = fromJust_20;
var justOr_1419 = justOr_19;
var maybe_1420 = maybe_18;
var $gt$gt_1421 = $gt$gt_17;
var $gt$eq_1422 = $gt$eq_16;
var $lt$eq_1423 = $lt$eq_15;
var $gt_1424 = $gt_14;
var Identity_1425 = Identity_11;
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
var App_1426 = App_731;
var Lam_1427 = Lam_732;
var Case_1428 = Case_733;
var Let_1429 = Let_734;
var New_1430 = New_735;
var breakableDownAndUpM_1431 = breakableDownAndUpM_782;
var breakableDownM_1432 = breakableDownM_786;
var downAndUpM_1433 = downAndUpM_783;
var downM_1434 = downM_785;
var upM_1435 = upM_784;
var breakableDownAndUp_1436 = breakableDownAndUp_777;
var breakableDown_1437 = breakableDown_781;
var downAndUp_1438 = downAndUp_778;
var down_1439 = down_780;
var up_1440 = up_779;
var AnnType_1441 = AnnType_723;
var TUnknown_1442 = TUnknown_755;
var getAnn_1443 = getAnn_760;
var getAnnType_1444 = getAnnType_763;
var Var_1445 = Var_729;
var Const_1446 = Const_730;
var annOf_1447 = annOf_774;
var getType_1448 = getType_776;
var withAnn_1449 = withAnn_775;
var setAnn_1450 = setAnn_761;
var setAnnType_1451 = setAnnType_764;
var setType_1452 = setType_773;
var Data_1453 = Data_743;
var DataCon_1454 = DataCon_744;
var dataConName_1455 = dataConName_771;
var dataConNames_1456 = dataConNames_772;
var TCBound_1457 = TCBound_747;
var TConst_1458 = TConst_748;
var TVar_1459 = TVar_749;
var TSkolem_1460 = TSkolem_750;
var TApp_1461 = TApp_751;
var TRow_1462 = TRow_752;
var TBot_1463 = TBot_753;
var TForall_1464 = TForall_754;
var equivBound_1465 = equivBound_769;
var equivType_1466 = equivType_770;
var getAnnCodeLoc_1467 = getAnnCodeLoc_765;
var AnnCodeLoc_1468 = AnnCodeLoc_724;
var printCodeLoc_1469 = printCodeLoc_767;
var exprLoc_1470 = exprLoc_768;
var setAnnCodeLoc_1471 = setAnnCodeLoc_766;
var copyAnn_1472 = copyAnn_762;
var emptyAnn_1473 = emptyAnn_759;
var ImportAll_1474 = ImportAll_758;
var ImportOpen_1475 = ImportOpen_757;
var ImportClosed_1476 = ImportClosed_756;
var Instance_1477 = Instance_746;
var Class_1478 = Class_745;
var ModuleInterface_1479 = ModuleInterface_742;
var Module_1480 = Module_741;
var PData_1481 = PData_740;
var PConst_1482 = PConst_739;
var PVar_1483 = PVar_738;
var CStr_1484 = CStr_737;
var CNum_1485 = CNum_736;
var AnnExport_1486 = AnnExport_728;
var AnnTag_1487 = AnnTag_727;
var AnnData_1488 = AnnData_726;
var AnnUseCount_1489 = AnnUseCount_725;
var CompilerState_1490 = function($_0_1500){
  return function($_1_1501){
    return function($_2_1502){
      return {$0:$_0_1500,$1:$_1_1501,$2:$_2_1502}
    }
  }
};
var reportTimes_1499 = function(i_1538){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1393))(function(s_1539){
    var report_1543 = function(i_1544){
      return function(n_1545){
        return function(ts_1546){
          var count_1547 = length(ts_1546);
          var total_1548 = ((foldl($add))(0))(ts_1546);
          var msg_1549 = ($concat(($concat(($concat(($concat(($concat(($concat("# pass <"))(n_1545)))("> executed ")))(intToString(count_1547))))(" times, total runtime ")))(intToString(total_1548))))("ms");
          return (debug2_1346(msg_1549))(i_1544)
        }
      }
    };
    var $phi$197 = (ret($import1$instance$Monad$11))(((foldTrie_1365(report_1543))(i_1538))(s_1539.$2));
    return $phi$197
  })
};
var timingStart_1496 = function(n_1521){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1393))(function(s_1522){
    var nts_1526 = (justOr_1419([]))((((lookup_1363($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1521))(s_1522.$2));
    var $phi$198 = sets_1392(((CompilerState_1490(s_1522.$0))(s_1522.$1))(((((insert_1371($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1521))((push(currentTimeMs(Unit_1367)))(nts_1526)))(s_1522.$2)));
    return $phi$198
  })
};
var timingEnd_1497 = function(n_1527){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1393))(function(s_1528){
    var nts_1532 = (justOr_1419([]))((((lookup_1363($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1527))(s_1528.$2));
    var start_1533 = last_1405(nts_1532);
    var $phi$199 = sets_1392(((CompilerState_1490(s_1528.$0))(s_1528.$1))(((((insert_1371($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1527))((push((currentTimeMs(Unit_1367))-start_1533))(init_1404(nts_1532))))(s_1528.$2)));
    return $phi$199
  })
};
var timed_1498 = function(n_1534){
  return function(p_1535){
    return function(i_1536){
      return (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_1421($import1$instance$Monad$11))(timingStart_1496(n_1534)))(p_1535(i_1536))))(function(o_1537){
        return (($gt$gt_1421($import1$instance$Monad$11))(timingEnd_1497(n_1534)))((ret($import1$instance$Monad$11))(o_1537))
      })
    }
  }
};
var perModule_1495 = function(local$instance$Monad$0){
  return mapM_1395(local$instance$Monad$0)
};
var setUid_1494 = function(uid_1516){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1393))(function(s_1517){
    var $phi$200 = sets_1392(((CompilerState_1490(s_1517.$0))(uid_1516))(s_1517.$2));
    return $phi$200
  })
};
var getUid_1493 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1393))(function(s_1512){
  var $phi$201 = (ret($import1$instance$Monad$11))(s_1512.$1);
  return $phi$201
});
var setExports_1492 = function(ex_1507){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1393))(function(s_1508){
    var $phi$202 = sets_1392(((CompilerState_1490(ex_1507))(s_1508.$1))(s_1508.$2));
    return $phi$202
  })
};
var getExports_1491 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1393))(function(s_1503){
  var $phi$203 = (ret($import1$instance$Monad$11))(s_1503.$0);
  return $phi$203
});
var assert_1550 = assert_85;
var Pair_1551 = Pair_3;
var mapSnd_1552 = mapSnd_84;
var mapFst_1553 = mapFst_83;
var $gt$eq$gt_1554 = $gt$eq$gt_82;
var snd_1555 = snd_23;
var debug2_1556 = debug2_81;
var Just_1557 = Just_1;
var Nothing_1558 = Nothing_2;
var isJust_1559 = isJust_21;
var Empty_1560 = Empty_7;
var Leaf_1561 = Leaf_8;
var Collision_1562 = Collision_9;
var BitmapIndexed_1563 = BitmapIndexed_10;
var $_1564 = $_12;
var fst_1565 = fst_22;
var Left_1566 = Left_4;
var Right_1567 = Right_5;
var loop_1568 = loop_27;
var find_1569 = find_29;
var hamtMask_1570 = hamtMask_58;
var popCount_1571 = popCount_57;
var hamtIndex_1572 = hamtIndex_59;
var lookup_1573 = lookup_60;
var setContains_1574 = setContains_76;
var foldTrie_1575 = foldTrie_66;
var emptySet_1576 = emptySet_72;
var Unit_1577 = Unit_0;
var not_1578 = not_26;
var $div$eq_1579 = $div$eq_13;
var mapIx_1580 = mapIx_30;
var insert_1581 = insert_61;
var setAdd_1582 = setAdd_73;
var setIntersection_1583 = setIntersection_80;
var remove_1584 = remove_63;
var setDiff_1585 = setDiff_79;
var setToArray_1586 = setToArray_78;
var mergeTrie_1587 = mergeTrie_70;
var setUnion_1588 = setUnion_77;
var setRemove_1589 = setRemove_75;
var setAddAll_1590 = setAddAll_74;
var trieKeys_1591 = trieKeys_71;
var size_1592 = size_68;
var mapTrie_1593 = mapTrie_67;
var nodeMask_1594 = nodeMask_56;
var isEmpty_1595 = isEmpty_69;
var filterTrie_1596 = filterTrie_65;
var nextSetBitMask_1597 = nextSetBitMask_64;
var updateOrSet_1598 = updateOrSet_62;
var State_1599 = State_6;
var runState_1600 = runState_54;
var evalState_1601 = evalState_55;
var sets_1602 = sets_53;
var gets_1603 = gets_52;
var foldM_1604 = foldM_49;
var mapM_1605 = mapM_50;
var forM_1606 = forM_51;
var strToArray_1607 = strToArray_48;
var toRecord_1608 = toRecord_47;
var reverse_1609 = reverse_46;
var tail_1610 = tail_41;
var head_1611 = head_40;
var uniq_1612 = uniq_45;
var mergeSet_1613 = mergeSet_44;
var init_1614 = init_43;
var last_1615 = last_42;
var mapJust_1616 = mapJust_39;
var concatMap_1617 = concatMap_38;
var zip_1618 = zip_37;
var zipWithIndex2_1619 = zipWithIndex2_35;
var zipWithIndex_1620 = zipWithIndex_36;
var join_1621 = join_34;
var all_1622 = all_33;
var exists_1623 = exists_32;
var containsChar_1624 = containsChar_31;
var contains_1625 = contains_28;
var either_1626 = either_24;
var splitEither_1627 = splitEither_25;
var fromJust_1628 = fromJust_20;
var justOr_1629 = justOr_19;
var maybe_1630 = maybe_18;
var $gt$gt_1631 = $gt$gt_17;
var $gt$eq_1632 = $gt$eq_16;
var $lt$eq_1633 = $lt$eq_15;
var $gt_1634 = $gt_14;
var Identity_1635 = Identity_11;
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
var App_1636 = App_731;
var Lam_1637 = Lam_732;
var Case_1638 = Case_733;
var Let_1639 = Let_734;
var New_1640 = New_735;
var breakableDownAndUpM_1641 = breakableDownAndUpM_782;
var breakableDownM_1642 = breakableDownM_786;
var downAndUpM_1643 = downAndUpM_783;
var downM_1644 = downM_785;
var upM_1645 = upM_784;
var breakableDownAndUp_1646 = breakableDownAndUp_777;
var breakableDown_1647 = breakableDown_781;
var downAndUp_1648 = downAndUp_778;
var down_1649 = down_780;
var up_1650 = up_779;
var AnnType_1651 = AnnType_723;
var TUnknown_1652 = TUnknown_755;
var getAnn_1653 = getAnn_760;
var getAnnType_1654 = getAnnType_763;
var Var_1655 = Var_729;
var Const_1656 = Const_730;
var annOf_1657 = annOf_774;
var getType_1658 = getType_776;
var withAnn_1659 = withAnn_775;
var setAnn_1660 = setAnn_761;
var setAnnType_1661 = setAnnType_764;
var setType_1662 = setType_773;
var Data_1663 = Data_743;
var DataCon_1664 = DataCon_744;
var dataConName_1665 = dataConName_771;
var dataConNames_1666 = dataConNames_772;
var TCBound_1667 = TCBound_747;
var TConst_1668 = TConst_748;
var TVar_1669 = TVar_749;
var TSkolem_1670 = TSkolem_750;
var TApp_1671 = TApp_751;
var TRow_1672 = TRow_752;
var TBot_1673 = TBot_753;
var TForall_1674 = TForall_754;
var equivBound_1675 = equivBound_769;
var equivType_1676 = equivType_770;
var getAnnCodeLoc_1677 = getAnnCodeLoc_765;
var AnnCodeLoc_1678 = AnnCodeLoc_724;
var printCodeLoc_1679 = printCodeLoc_767;
var exprLoc_1680 = exprLoc_768;
var setAnnCodeLoc_1681 = setAnnCodeLoc_766;
var copyAnn_1682 = copyAnn_762;
var emptyAnn_1683 = emptyAnn_759;
var ImportAll_1684 = ImportAll_758;
var ImportOpen_1685 = ImportOpen_757;
var ImportClosed_1686 = ImportClosed_756;
var Instance_1687 = Instance_746;
var Class_1688 = Class_745;
var ModuleInterface_1689 = ModuleInterface_742;
var Module_1690 = Module_741;
var PData_1691 = PData_740;
var PConst_1692 = PConst_739;
var PVar_1693 = PVar_738;
var CStr_1694 = CStr_737;
var CNum_1695 = CNum_736;
var AnnExport_1696 = AnnExport_728;
var AnnTag_1697 = AnnTag_727;
var AnnData_1698 = AnnData_726;
var AnnUseCount_1699 = AnnUseCount_725;
var printType_1700 = function(t_1706){
  var printParen_1707 = function(t_1711){
    return ($concat(($concat("("))(printType_1700(t_1711))))(")")
  };
  var printSecondTypeInApp_1710 = function(t_1734){
    if(t_1734.$tag==3){
      var $phi$204 = printParen_1707(t_1734)
    } else if(t_1734.$tag==6){
      var $phi$204 = printParen_1707(t_1734)
    } else var $phi$204 = printType_1700(t_1734);
    return $phi$204
  };
  var printFirstTypeInApp_1709 = function(t_1723){
    if((t_1723.$tag==3)&&((t_1723.$1.$tag==3)&&((t_1723.$1.$1.$tag==0)&&("->"==t_1723.$1.$1.$1)))){
      var $phi$205 = printParen_1707(t_1723)
    } else if(t_1723.$tag==6){
      var $phi$205 = printParen_1707(t_1723)
    } else var $phi$205 = printType_1700(t_1723);
    return $phi$205
  };
  var printTypeInFun_1708 = function(t_1712){
    if((t_1712.$tag==3)&&((t_1712.$1.$tag==3)&&((t_1712.$1.$1.$tag==0)&&("->"==t_1712.$1.$1.$1)))){
      var $phi$206 = printParen_1707(t_1712)
    } else if(t_1712.$tag==6){
      var $phi$206 = printParen_1707(t_1712)
    } else var $phi$206 = printType_1700(t_1712);
    return $phi$206
  };
  if(t_1706.$tag==0){
    var $phi$207 = t_1706.$1
  } else if(t_1706.$tag==1){
    var $phi$207 = t_1706.$1
  } else if(t_1706.$tag==2){
    var $phi$207 = ($concat("~"))(t_1706.$1)
  } else if(t_1706.$tag==5){
    var $phi$207 = "~bottom~"
  } else if(t_1706.$tag==7){
    var $phi$207 = "?"
  } else if((t_1706.$tag==3)&&((t_1706.$1.$tag==3)&&((t_1706.$1.$1.$tag==0)&&("->"==t_1706.$1.$1.$1)))){
    var $phi$207 = ($concat(($concat(printTypeInFun_1708(t_1706.$1.$2)))(" -> ")))(printType_1700(t_1706.$2))
  } else if(t_1706.$tag==3){
    var $phi$207 = ($concat(($concat(printFirstTypeInApp_1709(t_1706.$1)))(" ")))(printSecondTypeInApp_1710(t_1706.$2))
  } else if(t_1706.$tag==6){
    var $phi$209 = length(t_1706.$2);
    if(0==$phi$209){
      var $phi$208 = ""
    } else var $phi$208 = ($concat(" with "))((intercalate(", "))((map(printTypeBound_1701))(t_1706.$2)));
    var bounds_1761 = $phi$208;
    var $phi$207 = ($concat(($concat(($concat(($concat("forall "))((intercalate(", "))(t_1706.$1))))(bounds_1761)))(". ")))(printType_1700(t_1706.$3))
  } else var $phi$207 = error(($concat("cannot print "))(jsonStringify(t_1706)));
  return $phi$207
};
var printTypeBound_1701 = function(b_1764){
  var $phi$210 = ($concat(($concat(($concat(($concat(b_1764.$1))(" ")))("(")))(printType_1700(b_1764.$2))))(")");
  return $phi$210
};
var indent_1704 = map(function(l_1827){
  return ($concat("  "))(l_1827)
});
var printExprTyped_1702 = function(typed_1768){
  return function(e_1769){
    var sameLine_1771 = function(xs_1780){
      return function(ys_1781){
        return (concat(init_1614(xs_1780)))((enqueue(($concat(last_1615(xs_1780)))(head_1611(ys_1781))))(tail_1610(ys_1781)))
      }
    };
    var sameLine3_1772 = function(a_1782){
      return function(b_1783){
        return function(c_1784){
          return (sameLine_1771(a_1782))((sameLine_1771(b_1783))(c_1784))
        }
      }
    };
    var printT_1776 = function(e_1820){
      var t_1821 = getType_1658(e_1820);
      return printType_1700(t_1821)
    };
    var printPat_1774 = function(p_1788){
      if(p_1788.$tag==0){
        var $phi$211 = p_1788.$1
      } else if((p_1788.$tag==1)&&(p_1788.$1.$tag==0)){
        var $phi$211 = jsonStringify(p_1788.$1.$0)
      } else if((p_1788.$tag==1)&&(p_1788.$1.$tag==1)){
        var $phi$211 = jsonStringify(p_1788.$1.$0)
      } else if(p_1788.$tag==2){
        var $phi$211 = ($concat(($concat(($concat(p_1788.$1))(" (")))((join_1621((map(printPat_1774))(p_1788.$2)))(") ("))))(")")
      } else error("pattern match fail",p_1788);
      return $phi$211
    };
    var printParen_1770 = function(e_1779){
      return ((sameLine3_1772(["("]))(printExpr_1777(e_1779)))([")"])
    };
    var printCasePat_1773 = function(cp_1785){
      var $phi$212 = (enqueue(($concat(printPat_1774(cp_1785.$0)))(" ->")))(indent_1704(printExpr_1777(cp_1785.$1)));
      return $phi$212
    };
    var printE_1775 = function(e_1798){
      if(e_1798.$tag==0){
        var $phi$213 = [e_1798.$1]
      } else if((e_1798.$tag==1)&&(e_1798.$1.$tag==0)){
        var $phi$213 = [jsonStringify(e_1798.$1.$0)]
      } else if((e_1798.$tag==1)&&(e_1798.$1.$tag==1)){
        var $phi$213 = [jsonStringify(e_1798.$1.$0)]
      } else if(e_1798.$tag==2){
        var $phi$213 = ((sameLine3_1772(printParen_1770(e_1798.$1)))([" "]))(printParen_1770(e_1798.$2))
      } else if(e_1798.$tag==3){
        var $phi$213 = (enqueue(($concat(($concat("\\"))(e_1798.$1)))(" ->")))(indent_1704(printExpr_1777(e_1798.$2)))
      } else if(e_1798.$tag==4){
        var $phi$213 = (concat(((sameLine3_1772(["case "]))(printParen_1770(e_1798.$1)))([" of"])))(indent_1704((concatMap_1617(printCasePat_1773))(e_1798.$2)))
      } else if(e_1798.$tag==5){
        var $phi$213 = (concat((push("in"))((enqueue("let"))(indent_1704((concatMap_1617(printDef_1703(typed_1768)))(e_1798.$1))))))(indent_1704(printExpr_1777(e_1798.$2)))
      } else if(e_1798.$tag==6){
        var $phi$213 = (push(e_1798.$1))(indent_1704((concatMap_1617(printExprTyped_1702(typed_1768)))(e_1798.$2)))
      } else error("pattern match fail",e_1798);
      return $phi$213
    };
    var printExpr_1777 = function(e_1822){
      if(!typed_1768){
        var $phi$214 = printE_1775(e_1822)
      } else if(typed_1768){
        var $phi$214 = ((sameLine3_1772(["("]))(printE_1775(e_1822)))([($concat(($concat(" :: "))(printT_1776(e_1822))))(" )")])
      } else error("pattern match fail",typed_1768);
      return $phi$214
    };
    var pe_1778 = printE_1775(e_1769);
    return printExpr_1777(e_1769)
  }
};
var printDef_1703 = function(typed_1823){
  return function(d_1824){
    var $phi$215 = (enqueue(($concat(d_1824.$0))(" =")))(indent_1704((printExprTyped_1702(typed_1823))(d_1824.$1)));
    return $phi$215
  }
};
var reallyPrintExpr_1705 = function(typed_1828){
  return function(e_1829){
    return (join_1621((printExprTyped_1702(typed_1828))(e_1829)))("\n")
  }
};
var assert_1830 = assert_85;
var Pair_1831 = Pair_3;
var mapSnd_1832 = mapSnd_84;
var mapFst_1833 = mapFst_83;
var $gt$eq$gt_1834 = $gt$eq$gt_82;
var snd_1835 = snd_23;
var debug2_1836 = debug2_81;
var Just_1837 = Just_1;
var Nothing_1838 = Nothing_2;
var isJust_1839 = isJust_21;
var Empty_1840 = Empty_7;
var Leaf_1841 = Leaf_8;
var Collision_1842 = Collision_9;
var BitmapIndexed_1843 = BitmapIndexed_10;
var $_1844 = $_12;
var fst_1845 = fst_22;
var Left_1846 = Left_4;
var Right_1847 = Right_5;
var loop_1848 = loop_27;
var find_1849 = find_29;
var hamtMask_1850 = hamtMask_58;
var popCount_1851 = popCount_57;
var hamtIndex_1852 = hamtIndex_59;
var lookup_1853 = lookup_60;
var setContains_1854 = setContains_76;
var foldTrie_1855 = foldTrie_66;
var emptySet_1856 = emptySet_72;
var Unit_1857 = Unit_0;
var not_1858 = not_26;
var $div$eq_1859 = $div$eq_13;
var mapIx_1860 = mapIx_30;
var insert_1861 = insert_61;
var setAdd_1862 = setAdd_73;
var setIntersection_1863 = setIntersection_80;
var remove_1864 = remove_63;
var setDiff_1865 = setDiff_79;
var setToArray_1866 = setToArray_78;
var mergeTrie_1867 = mergeTrie_70;
var setUnion_1868 = setUnion_77;
var setRemove_1869 = setRemove_75;
var setAddAll_1870 = setAddAll_74;
var trieKeys_1871 = trieKeys_71;
var size_1872 = size_68;
var mapTrie_1873 = mapTrie_67;
var nodeMask_1874 = nodeMask_56;
var isEmpty_1875 = isEmpty_69;
var filterTrie_1876 = filterTrie_65;
var nextSetBitMask_1877 = nextSetBitMask_64;
var updateOrSet_1878 = updateOrSet_62;
var State_1879 = State_6;
var runState_1880 = runState_54;
var evalState_1881 = evalState_55;
var sets_1882 = sets_53;
var gets_1883 = gets_52;
var foldM_1884 = foldM_49;
var mapM_1885 = mapM_50;
var forM_1886 = forM_51;
var strToArray_1887 = strToArray_48;
var toRecord_1888 = toRecord_47;
var reverse_1889 = reverse_46;
var tail_1890 = tail_41;
var head_1891 = head_40;
var uniq_1892 = uniq_45;
var mergeSet_1893 = mergeSet_44;
var init_1894 = init_43;
var last_1895 = last_42;
var mapJust_1896 = mapJust_39;
var concatMap_1897 = concatMap_38;
var zip_1898 = zip_37;
var zipWithIndex2_1899 = zipWithIndex2_35;
var zipWithIndex_1900 = zipWithIndex_36;
var join_1901 = join_34;
var all_1902 = all_33;
var exists_1903 = exists_32;
var containsChar_1904 = containsChar_31;
var contains_1905 = contains_28;
var either_1906 = either_24;
var splitEither_1907 = splitEither_25;
var fromJust_1908 = fromJust_20;
var justOr_1909 = justOr_19;
var maybe_1910 = maybe_18;
var $gt$gt_1911 = $gt$gt_17;
var $gt$eq_1912 = $gt$eq_16;
var $lt$eq_1913 = $lt$eq_15;
var $gt_1914 = $gt_14;
var Identity_1915 = Identity_11;
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
var App_1916 = App_731;
var Lam_1917 = Lam_732;
var Case_1918 = Case_733;
var Let_1919 = Let_734;
var New_1920 = New_735;
var breakableDownAndUpM_1921 = breakableDownAndUpM_782;
var breakableDownM_1922 = breakableDownM_786;
var downAndUpM_1923 = downAndUpM_783;
var downM_1924 = downM_785;
var upM_1925 = upM_784;
var breakableDownAndUp_1926 = breakableDownAndUp_777;
var breakableDown_1927 = breakableDown_781;
var downAndUp_1928 = downAndUp_778;
var down_1929 = down_780;
var up_1930 = up_779;
var AnnType_1931 = AnnType_723;
var TUnknown_1932 = TUnknown_755;
var getAnn_1933 = getAnn_760;
var getAnnType_1934 = getAnnType_763;
var Var_1935 = Var_729;
var Const_1936 = Const_730;
var annOf_1937 = annOf_774;
var getType_1938 = getType_776;
var withAnn_1939 = withAnn_775;
var setAnn_1940 = setAnn_761;
var setAnnType_1941 = setAnnType_764;
var setType_1942 = setType_773;
var Data_1943 = Data_743;
var DataCon_1944 = DataCon_744;
var dataConName_1945 = dataConName_771;
var dataConNames_1946 = dataConNames_772;
var TCBound_1947 = TCBound_747;
var TConst_1948 = TConst_748;
var TVar_1949 = TVar_749;
var TSkolem_1950 = TSkolem_750;
var TApp_1951 = TApp_751;
var TRow_1952 = TRow_752;
var TBot_1953 = TBot_753;
var TForall_1954 = TForall_754;
var equivBound_1955 = equivBound_769;
var equivType_1956 = equivType_770;
var getAnnCodeLoc_1957 = getAnnCodeLoc_765;
var AnnCodeLoc_1958 = AnnCodeLoc_724;
var printCodeLoc_1959 = printCodeLoc_767;
var exprLoc_1960 = exprLoc_768;
var setAnnCodeLoc_1961 = setAnnCodeLoc_766;
var copyAnn_1962 = copyAnn_762;
var emptyAnn_1963 = emptyAnn_759;
var ImportAll_1964 = ImportAll_758;
var ImportOpen_1965 = ImportOpen_757;
var ImportClosed_1966 = ImportClosed_756;
var Instance_1967 = Instance_746;
var Class_1968 = Class_745;
var ModuleInterface_1969 = ModuleInterface_742;
var Module_1970 = Module_741;
var PData_1971 = PData_740;
var PConst_1972 = PConst_739;
var PVar_1973 = PVar_738;
var CStr_1974 = CStr_737;
var CNum_1975 = CNum_736;
var AnnExport_1976 = AnnExport_728;
var AnnTag_1977 = AnnTag_727;
var AnnData_1978 = AnnData_726;
var AnnUseCount_1979 = AnnUseCount_725;
var printType_1980 = printType_1700;
var printTypeBound_1981 = printTypeBound_1701;
var reallyPrintExpr_1982 = reallyPrintExpr_1705;
var printDef_1983 = printDef_1703;
var sccSorted_1984 = sccSorted_574;
var ICtx_1986 = function($_0_2048){
  return function($_1_2049){
    return function($_2_2050){
      return function($_3_2051){
        return {$0:$_0_2048,$1:$_1_2049,$2:$_2_2050,$3:$_3_2051}
      }
    }
  }
};
var IEnv_1987 = function($_0_2052){
  return function($_1_2053){
    return function($_2_2054){
      return {$0:$_0_2052,$1:$_1_2053,$2:$_2_2054}
    }
  }
};
var Subs_1985 = function($_0_2046){
  return function($_1_2047){
    return {$0:$_0_2046,$1:$_1_2047}
  }
};
var instanceToTypeBound_2040 = function(i_2702){
  var $phi$216 = ((TCBound_1947(emptyAnn_1963))(i_2702.$1))(i_2702.$2);
  return $phi$216
};
var getTypedExports_2043 = function(m_2787){
  var collectExports_2795 = function(es_2797){
    return function(b_2798){
      var e_2799 = snd_1835(b_2798);
      var $phi$219 = (((getAnn_1933($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_1937(e_2799));
      if($phi$219.$tag==1){
        var $phi$218 = es_2797
      } else if(($phi$219.$tag==0)&&($phi$219.$0.$tag==5)){
        var $phi$218 = ((set($phi$219.$0.$0))(getType_1938(e_2799)))(es_2797)
      } else error("pattern match fail",$phi$219);
      return $phi$218
    }
  };
  var bs_2796 = ((foldl(collectExports_2795))(empty))(m_2787.$6);
  var $phi$217 = ((ModuleInterface_1969(bs_2796))(m_2787.$4))((map(instanceToTypeBound_2040))(m_2787.$5));
  return $phi$217
};
var getBounds_2000 = function(ctx_2143){
  var $phi$220 = ctx_2143.$1;
  return $phi$220
};
var setBounds_2001 = function(bs_2148){
  return function(ctx_2149){
    var $phi$221 = (((ICtx_1986(ctx_2149.$0))(bs_2148))(ctx_2149.$2))(ctx_2149.$3);
    return $phi$221
  }
};
var getInstances_2014 = function(env_2210){
  var $phi$222 = env_2210.$1;
  return $phi$222
};
var satisfies_2044 = function(a_2801){
  return function(b_2802){
    if(a_2801.$tag==1){
      var $phi$223 = true
    } else if(a_2801.$tag==2){
      if(b_2802.$tag==2){
        var $phi$226 = (($eq$eq($import1$instance$Eq$1))(a_2801.$1))(b_2802.$1)
      } else var $phi$226 = false;
      var $phi$223 = $phi$226
    } else if(a_2801.$tag==0){
      if(b_2802.$tag==0){
        var $phi$225 = (($eq$eq($import1$instance$Eq$1))(a_2801.$1))(b_2802.$1)
      } else var $phi$225 = false;
      var $phi$223 = $phi$225
    } else if(a_2801.$tag==3){
      if(b_2802.$tag==3){
        var $phi$224 = ($and((satisfies_2044(a_2801.$1))(b_2802.$1)))((satisfies_2044(a_2801.$2))(b_2802.$2))
      } else var $phi$224 = false;
      var $phi$223 = $phi$224
    } else var $phi$223 = error(($concat("unexpected type in satisfies "))(printType_1980(a_2801)));
    return $phi$223
  }
};
var satisfiesBound_2045 = function(a_2823){
  return function(b_2824){
    var $phi$228 = ($and((($eq$eq($import1$instance$Eq$1))(a_2823.$1))(b_2824.$1)))((satisfies_2044(a_2823.$2))(b_2824.$2));
    var $phi$227 = $phi$228;
    return $phi$227
  }
};
var dropSatisfiedBounds_2032 = function(env_2556){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1883))(function(ctx_2557){
    var is_2558 = getInstances_2014(env_2556);
    var bs_2559 = getBounds_2000(ctx_2557);
    var bs2_2560 = (filter(function(b_2561){
      return not_1858((exists_1903(function(i_2562){
        return (satisfiesBound_2045(i_2562))(b_2561)
      }))(is_2558))
    }))(bs_2559);
    return sets_1882((setBounds_2001(bs2_2560))(ctx_2557))
  })
};
var getSubs_1997 = function(ctx_2126){
  var $phi$229 = ctx_2126.$0;
  return $phi$229
};
var getSub_1988 = function(v_2055){
  return function(subs_2056){
    var $phi$230 = (($lt$pip$gt($import1$instance$Alternative$6))((((lookup_1853($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2055))(subs_2056.$0)))((((lookup_1853($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2055))(subs_2056.$1));
    return $phi$230
  }
};
var mkTForall_2017 = function(ann_2236){
  return function(vs_2237){
    return function(bs_2238){
      return function(t_2239){
        var f_2240 = function(bs_2241){
          return function(b_2242){
            var $phi$232 = (exists_1903(equivBound_1955(b_2242)))(bs_2241);
            if($phi$232){
              var $phi$231 = bs_2241
            } else if(!$phi$232){
              var $phi$231 = (push(b_2242))(bs_2241)
            } else error("pattern match fail",$phi$232);
            return $phi$231
          }
        };
        return (((TForall_1954(ann_2236))(vs_2237))(((foldl(f_2240))([]))(bs_2238)))(t_2239)
      }
    }
  }
};
var dropSubs_1993 = function(vs_2105){
  return function(subs_2106){
    var $phi$233 = (Subs_1985(((foldl(function(r_2109){
      return function(v_2110){
        return (((remove_1864($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2110))(r_2109)
      }
    }))(subs_2106.$0))(vs_2105)))(((foldl(function(r_2111){
      return function(v_2112){
        return (((remove_1864($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2112))(r_2111)
      }
    }))(subs_2106.$1))(vs_2105));
    return $phi$233
  }
};
var applySubs_2021 = function(subs_2301){
  return function(t_2302){
    if(t_2302.$tag==6){
      var subs2_2307 = (dropSubs_1993(t_2302.$1))(subs_2301);
      var $phi$234 = (((mkTForall_2017(t_2302.$0))(t_2302.$1))((map(applySubsBound_2022(subs2_2307)))(t_2302.$2)))((applySubs_2021(subs2_2307))(t_2302.$3))
    } else if(t_2302.$tag==1){
      var $phi$237 = (getSub_1988(t_2302.$1))(subs_2301);
      if($phi$237.$tag==1){
        var $phi$236 = t_2302
      } else if($phi$237.$tag==0){
        var $phi$236 = $phi$237.$0
      } else error("pattern match fail",$phi$237);
      var $phi$234 = $phi$236
    } else if(t_2302.$tag==3){
      var $phi$234 = ((TApp_1951(t_2302.$0))((applySubs_2021(subs_2301))(t_2302.$1)))((applySubs_2021(subs_2301))(t_2302.$2))
    } else if(t_2302.$tag==4){
      var $phi$234 = ((TRow_1952(t_2302.$0))((map(function(m_2317){
        var $phi$235 = (Pair_1831((applySubs_2021(subs_2301))(m_2317.$0)))((applySubs_2021(subs_2301))(m_2317.$1));
        return $phi$235
      }))(t_2302.$1)))(((fmap($import1$instance$Functor$4))(applySubs_2021(subs_2301)))(t_2302.$2))
    } else var $phi$234 = t_2302;
    return $phi$234
  }
};
var applySubsBound_2022 = function(subs_2321){
  return function(b_2322){
    var $phi$238 = ((TCBound_1947(b_2322.$0))(b_2322.$1))((applySubs_2021(subs_2321))(b_2322.$2));
    return $phi$238
  }
};
var applySubsE_2037 = function(subs_2624){
  return function(e_2625){
    var f_2626 = function(a_2627){
      return function(e_2628){
        var t2_2629 = (applySubs_2021(subs_2624))(getType_1938(e_2628));
        return (Pair_1831(a_2627))((setType_1942(t2_2629))(e_2628))
      }
    };
    return snd_1835(((down_1929(f_2626))(true))(e_2625))
  }
};
var applySubsDef_2036 = function(d_2620){
  var $phi$239 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1883))(function(ctx_2623){
    return ($_1844(ret($import1$instance$Monad$11)))((Pair_1831(d_2620.$0))((applySubsE_2037(getSubs_1997(ctx_2623)))(d_2620.$1)))
  });
  return $phi$239
};
var freeVars_2038 = function(e_2630){
  var namesInPat_2633 = function(p_2643){
    if(p_2643.$tag==0){
      var $phi$240 = [p_2643.$1]
    } else if(p_2643.$tag==1){
      var $phi$240 = []
    } else if(p_2643.$tag==2){
      var $phi$240 = ((foldl((mergeSet_1893($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(namesInPat_2633))(p_2643.$2))
    } else error("pattern match fail",p_2643);
    return $phi$240
  };
  var freeVarsInPData_2632 = function(p_2638){
    if(p_2638.$tag==2){
      var $phi$241 = ((foldl((mergeSet_1893($import1$instance$Ord$3))($import1$instance$Eq$1)))([p_2638.$1]))((map(freeVarsInPData_2632))(p_2638.$2))
    } else var $phi$241 = [];
    return $phi$241
  };
  var freeVarsInPat_2631 = function(p_2634){
    var $phi$242 = (((mergeSet_1893($import1$instance$Ord$3))($import1$instance$Eq$1))((filter(function(v_2637){
      return not_1858(((contains_1905($import1$instance$Eq$1))(v_2637))(namesInPat_2633(p_2634.$0)))
    }))(freeVars_2038(p_2634.$1))))(freeVarsInPData_2632(p_2634.$0));
    return $phi$242
  };
  if(e_2630.$tag==0){
    var $phi$243 = [e_2630.$1]
  } else if(e_2630.$tag==1){
    var $phi$243 = []
  } else if(e_2630.$tag==2){
    var $phi$243 = (((mergeSet_1893($import1$instance$Ord$3))($import1$instance$Eq$1))(freeVars_2038(e_2630.$1)))(freeVars_2038(e_2630.$2))
  } else if(e_2630.$tag==3){
    var $phi$243 = (filter(function(v_2661){
      return (($div$eq_1859($import1$instance$Eq$1))(v_2661))(e_2630.$1)
    }))(freeVars_2038(e_2630.$2))
  } else if(e_2630.$tag==4){
    var $phi$243 = ((foldl((mergeSet_1893($import1$instance$Ord$3))($import1$instance$Eq$1)))(freeVars_2038(e_2630.$1)))((map(freeVarsInPat_2631))(e_2630.$2))
  } else if(e_2630.$tag==5){
    var $phi$243 = (filter(function(v_2668){
      return not_1858(((contains_1905($import1$instance$Eq$1))(v_2668))((map(fst_1845))(e_2630.$1)))
    }))(((foldl((mergeSet_1893($import1$instance$Ord$3))($import1$instance$Eq$1)))(freeVars_2038(e_2630.$2)))((map(function(d_2669){
      return freeVars_2038(snd_1835(d_2669))
    }))(e_2630.$1)))
  } else if(e_2630.$tag==6){
    var $phi$243 = ((foldl((mergeSet_1893($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(freeVars_2038))(e_2630.$2))
  } else error("pattern match fail",e_2630);
  return $phi$243
};
var newTVarM_1995 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1883))(function(ctx_2119){
  var n_2124 = ($concat("$"))(intToString(ctx_2119.$2));
  var $phi$244 = (($gt$gt_1911($import1$instance$Monad$11))(sets_1882((((ICtx_1986(ctx_2119.$0))(ctx_2119.$1))(ctx_2119.$2+1))(ctx_2119.$3))))((ret($import1$instance$Monad$11))((TVar_1949(emptyAnn_1963))(n_2124)));
  return $phi$244
});
var errorM_2002 = function(s_2154){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1883))(function(ctx_2155){
    var $phi$245 = error(ctx_2155.$3(s_2154));
    return $phi$245
  })
};
var getBinding_2007 = function(n_2175){
  return function(env_2176){
    var $phi$246 = (((lookup_1853($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_2175))(env_2176.$0);
    return $phi$246
  }
};
var getBindingM_2008 = function(n_2180){
  return function(env_2181){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_1883))(function(ctx_2182){
      return ($_1844(ret($import1$instance$Monad$11)))(((fmap($import1$instance$Functor$4))(applySubs_2021(getSubs_1997(ctx_2182))))((getBinding_2007(n_2180))(env_2181)))
    })
  }
};
var getBindings_2009 = function(env_2183){
  var $phi$247 = env_2183.$0;
  return $phi$247
};
var freeTVars_2015 = function(t_2214){
  if(t_2214.$tag==1){
    var $phi$248 = (((setAdd_1862($import1$instance$Hashable$13))($import1$instance$Eq$1))(t_2214.$1))(emptySet_1856)
  } else if(t_2214.$tag==5){
    var $phi$248 = emptySet_1856
  } else if(t_2214.$tag==7){
    var $phi$248 = emptySet_1856
  } else if(t_2214.$tag==0){
    var $phi$248 = emptySet_1856
  } else if(t_2214.$tag==2){
    var $phi$248 = emptySet_1856
  } else if(t_2214.$tag==6){
    var $phi$248 = ((foldl(function(s_2225){
      return function(v_2226){
        return (((setRemove_1869($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2226))(s_2225)
      }
    }))(((foldl((setUnion_1868($import1$instance$Hashable$13))($import1$instance$Eq$1)))(freeTVars_2015(t_2214.$3)))((map(freeTVarsInBound_2025))(t_2214.$2))))(t_2214.$1)
  } else if(t_2214.$tag==3){
    var $phi$248 = (((setUnion_1868($import1$instance$Hashable$13))($import1$instance$Eq$1))(freeTVars_2015(t_2214.$1)))(freeTVars_2015(t_2214.$2))
  } else if(t_2214.$tag==4){
    var $phi$248 = ((foldl((setUnion_1868($import1$instance$Hashable$13))($import1$instance$Eq$1)))(($_1844(justOr_1909(emptySet_1856)))(((fmap($import1$instance$Functor$4))(freeTVars_2015))(t_2214.$2))))((map(function(m_2233){
      return (((setUnion_1868($import1$instance$Hashable$13))($import1$instance$Eq$1))(freeTVars_2015(fst_1845(m_2233))))(freeTVars_2015(snd_1835(m_2233)))
    }))(t_2214.$1))
  } else error("pattern match fail",t_2214);
  return $phi$248
};
var freeTVarsInBound_2025 = function(b_2383){
  var $phi$249 = freeTVars_2015(b_2383.$2);
  return $phi$249
};
var addBinding_2010 = function(n_2187){
  return function(t_2188){
    return function(env_2189){
      var $phi$250 = ((IEnv_1987(((((insert_1861($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_2187))(t_2188))(env_2189.$0)))(env_2189.$1))((((setUnion_1868($import1$instance$Hashable$13))($import1$instance$Eq$1))(env_2189.$2))(freeTVars_2015(t_2188)));
      return $phi$250
    }
  }
};
var addBindings_2011 = function(nbs_2193){
  return function(env_2194){
    var $phi$251 = ((IEnv_1987((((mergeTrie_1867($import1$instance$Hashable$13))($import1$instance$Eq$1))(env_2194.$0))(nbs_2193)))(env_2194.$1))(((foldTrie_1855(function(fvs_2198){
      return function(__2199){
        return function(t_2200){
          return (((setUnion_1868($import1$instance$Hashable$13))($import1$instance$Eq$1))(fvs_2198))(freeTVars_2015(t_2200))
        }
      }
    }))(env_2194.$2))(nbs_2193));
    return $phi$251
  }
};
var f1_2016 = function(a_2234){
  return function(b_2235){
    return ((TApp_1951(emptyAnn_1963))(((TApp_1951(emptyAnn_1963))((TConst_1948(emptyAnn_1963))("->")))(a_2234)))(b_2235)
  }
};
var newTVar_1994 = function(ctx_2113){
  var n_2118 = ($concat("$"))(intToString(ctx_2113.$2));
  var $phi$252 = (Pair_1831((((ICtx_1986(ctx_2113.$0))(ctx_2113.$1))(ctx_2113.$2+1))(ctx_2113.$3)))((TVar_1949(emptyAnn_1963))(n_2118));
  return $phi$252
};
var addBound_1999 = function(b_2137){
  return function(ctx_2138){
    var $phi$253 = (((ICtx_1986(ctx_2138.$0))((push(b_2137))(ctx_2138.$1)))(ctx_2138.$2))(ctx_2138.$3);
    return $phi$253
  }
};
var instantiate_2019 = function(ctx_2252){
  return function(mkvar_2253){
    return function(t_2254){
      if(t_2254.$tag==6){
        var f_2264 = function(sc_2265){
          return function(v_2266){
            var $phi$257 = (mkvar_2253(sc_2265.$1))(v_2266);
            var $phi$256 = (Pair_1831(((((insert_1861($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2266))($phi$257.$1))(sc_2265.$0)))($phi$257.$0);
            var $phi$255 = $phi$256;
            return $phi$255
          }
        };
        var _sc_2259 = ((foldl(f_2264))((Pair_1831(Empty_1840))(ctx_2252)))(t_2254.$1);
        var subs_2260 = fst_1845(_sc_2259);
        var replace_2262 = function(t_2271){
          if(t_2271.$tag==0){
            var $phi$258 = t_2271
          } else if(t_2271.$tag==1){
            var $phi$258 = t_2271
          } else if(t_2271.$tag==5){
            var $phi$258 = t_2271
          } else if(t_2271.$tag==2){
            var $phi$261 = (((lookup_1853($import1$instance$Hashable$13))($import1$instance$Eq$1))(t_2271.$1))(subs_2260);
            if($phi$261.$tag==1){
              var $phi$260 = t_2271
            } else if($phi$261.$tag==0){
              var $phi$260 = $phi$261.$0
            } else error("pattern match fail",$phi$261);
            var $phi$258 = $phi$260
          } else if(t_2271.$tag==3){
            var $phi$258 = ((TApp_1951(t_2271.$0))(replace_2262(t_2271.$1)))(replace_2262(t_2271.$2))
          } else if(t_2271.$tag==4){
            var $phi$258 = ((TRow_1952(t_2271.$0))((map(function(m_2285){
              var $phi$259 = (Pair_1831(replace_2262(m_2285.$0)))(replace_2262(m_2285.$1));
              return $phi$259
            }))(t_2271.$1)))(((fmap($import1$instance$Functor$4))(replace_2262))(t_2271.$2))
          } else if(t_2271.$tag==6){
            var $phi$258 = error("nested universal quantification")
          } else error("pattern match fail",t_2271);
          return $phi$258
        };
        var replaceBound_2263 = function(b_2292){
          var $phi$262 = ((TCBound_1947(b_2292.$0))(b_2292.$1))(replace_2262(b_2292.$2));
          return $phi$262
        };
        var ctx2_2261 = snd_1835(_sc_2259);
        var $phi$254 = (Pair_1831((Pair_1831(replace_2262(t_2254.$3)))((map(replaceBound_2263))(t_2254.$2))))(ctx2_2261)
      } else var $phi$254 = (Pair_1831((Pair_1831(t_2254))([])))(ctx_2252);
      return $phi$254
    }
  }
};
var instantiateM_2018 = function(t_2243){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1883))(function(ctx_2244){
    var $phi$264 = ((instantiate_2019(ctx_2244))(function(ctx_2245){
      return function(__2246){
        return newTVar_1994(ctx_2245)
      }
    }))(t_2243);
    var $phi$263 = (($gt$gt_1911($import1$instance$Monad$11))(sets_1882(((foldl(function(ctx_2250){
      return function(b_2251){
        return (addBound_1999(b_2251))(ctx_2250)
      }
    }))($phi$264.$1))($phi$264.$0.$1))))((ret($import1$instance$Monad$11))($phi$264.$0.$0));
    return $phi$263
  })
};
var emptySubs_1989 = (Subs_1985(Empty_1840))(Empty_1840);
var composeSubs_1990 = function(ef_2059){
  return function(sa_2060){
    return function(sb_2061){
      var $phi$265 = ((foldTrie_1855(function(r_2064){
        return function(v_2065){
          return function(t_2066){
            return (((addSub_1991(ef_2059))(v_2065))(t_2066))(r_2064)
          }
        }
      }))(((foldTrie_1855(function(r_2067){
        return function(v_2068){
          return function(t_2069){
            return (((addSatSub_1992(ef_2059))(v_2068))(t_2069))(r_2067)
          }
        }
      }))(sa_2060))(sb_2061.$0)))(sb_2061.$1);
      return $phi$265
    }
  }
};
var addSub_1991 = function(ef_2070){
  return function(v_2071){
    return function(t_2072){
      return function(subs_2073){
        var t2_2074 = (applySubs_2021(subs_2073))(t_2072);
        var $phi$267 = (getSub_1988(v_2071))(subs_2073);
        if($phi$267.$tag==1){
          var subUnsat_2077 = function(local$instance$Hashable$1){
            return function(local$instance$Eq$0){
              return function(su_2081){
                return function(uv_2082){
                  return function(ut_2083){
                    var ut2_2086 = ((substitute_2020(v_2071))(t2_2074))(ut_2083);
                    var $phi$271 = isEmpty_1875(freeTVars_2015(ut2_2086));
                    if($phi$271){
                      var $phi$270 = (Pair_1831(((((insert_1861(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2082))(ut2_2086))(su_2081.$0)))(su_2081.$1)
                    } else if(!$phi$271){
                      var $phi$270 = (Pair_1831(su_2081.$0))(((((insert_1861(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2082))(ut2_2086))(su_2081.$1))
                    } else error("pattern match fail",$phi$271);
                    var $phi$269 = $phi$270;
                    return $phi$269
                  }
                }
              }
            }
          };
          var su_2078 = ((foldTrie_1855((subUnsat_2077($import1$instance$Hashable$13))($import1$instance$Eq$1)))((Pair_1831(subs_2073.$0))(Empty_1840)))(subs_2073.$1);
          var unsat2_2080 = snd_1835(su_2078);
          var sat2_2079 = fst_1845(su_2078);
          var $phi$273 = isEmpty_1875(freeTVars_2015(t2_2074));
          if($phi$273){
            var $phi$272 = (Subs_1985(((((insert_1861($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2071))(t2_2074))(sat2_2079)))(unsat2_2080)
          } else if(!$phi$273){
            var $phi$272 = (Subs_1985(sat2_2079))(((((insert_1861($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2071))(t2_2074))(unsat2_2080))
          } else error("pattern match fail",$phi$273);
          var $phi$268 = $phi$272;
          var $phi$266 = $phi$268
        } else if($phi$267.$tag==0){
          var $phi$266 = ((composeSubs_1990(ef_2070))(subs_2073))(((unify_2024(ef_2070))($phi$267.$0))(t2_2074))
        } else error("pattern match fail",$phi$267);
        return $phi$266
      }
    }
  }
};
var addSatSub_1992 = function(ef_2088){
  return function(v_2089){
    return function(t_2090){
      return function(subs_2091){
        var $phi$275 = (getSub_1988(v_2089))(subs_2091);
        if($phi$275.$tag==1){
          var subUnsat_2094 = function(local$instance$Hashable$1){
            return function(local$instance$Eq$0){
              return function(su_2098){
                return function(uv_2099){
                  return function(ut_2100){
                    var ut2_2103 = ((substitute_2020(v_2089))(t_2090))(ut_2100);
                    var $phi$279 = isEmpty_1875(freeTVars_2015(ut2_2103));
                    if($phi$279){
                      var $phi$278 = (Pair_1831(((((insert_1861(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2099))(ut2_2103))(su_2098.$0)))(su_2098.$1)
                    } else if(!$phi$279){
                      var $phi$278 = (Pair_1831(su_2098.$0))(((((insert_1861(local$instance$Hashable$1))(local$instance$Eq$0))(uv_2099))(ut2_2103))(su_2098.$1))
                    } else error("pattern match fail",$phi$279);
                    var $phi$277 = $phi$278;
                    return $phi$277
                  }
                }
              }
            }
          };
          var su_2095 = ((foldTrie_1855((subUnsat_2094($import1$instance$Hashable$13))($import1$instance$Eq$1)))((Pair_1831(subs_2091.$0))(Empty_1840)))(subs_2091.$1);
          var unsat2_2097 = snd_1835(su_2095);
          var sat2_2096 = fst_1845(su_2095);
          var $phi$276 = (Subs_1985(((((insert_1861($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2089))(t_2090))(sat2_2096)))(unsat2_2097);
          var $phi$274 = $phi$276
        } else if($phi$275.$tag==0){
          var $phi$274 = ((composeSubs_1990(ef_2088))(subs_2091))(((unify_2024(ef_2088))($phi$275.$0))(t_2090))
        } else error("pattern match fail",$phi$275);
        return $phi$274
      }
    }
  }
};
var substitute_2020 = function(n_2297){
  return function(s_2298){
    return function(t_2299){
      return (applySubs_2021((((addSub_1991(function(s_2300){
        return ($concat("substitute: "))(s_2300)
      }))(n_2297))(s_2298))(emptySubs_1989)))(t_2299)
    }
  }
};
var unify_2024 = function(ef_2332){
  return function(a_2333){
    return function(b_2334){
      var err_2336 = function(a_2342){
        return function(b_2343){
          return error(ef_2332(($concat(($concat(($concat("cannot unify "))(printType_1980(a_2342))))(" with ")))(printType_1980(b_2343))))
        }
      };
      var bind_2335 = function(n_2337){
        return function(t_2338){
          if(t_2338.$tag==1){
            var $phi$284 = (($eq$eq($import1$instance$Eq$1))(n_2337))(t_2338.$1);
            if($phi$284){
              var $phi$283 = emptySubs_1989
            } else if(!$phi$284){
              var $phi$283 = (((addSub_1991(ef_2332))(n_2337))(t_2338))(emptySubs_1989)
            } else error("pattern match fail",$phi$284);
            var $phi$280 = $phi$283
          } else {
            var $phi$282 = (((setContains_1854($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_2337))(freeTVars_2015(t_2338));
            if($phi$282){
              var $phi$281 = error(ef_2332("occurs check failed"))
            } else if(!$phi$282){
              var $phi$281 = (((addSub_1991(ef_2332))(n_2337))(t_2338))(emptySubs_1989)
            } else error("pattern match fail",$phi$282);
            var $phi$280 = $phi$281
          };
          return $phi$280
        }
      };
      if(a_2333.$tag==1){
        var $phi$294 = (bind_2335(a_2333.$1))(b_2334);
        var $phi$285 = $phi$294
      } else if(a_2333.$tag==2){
        if(b_2334.$tag==2){
          var $phi$293 = (($eq$eq($import1$instance$Eq$1))(a_2333.$1))(b_2334.$1);
          if($phi$293){
            var $phi$292 = emptySubs_1989
          } else if(!$phi$293){
            var $phi$292 = (err_2336(a_2333))(b_2334)
          } else error("pattern match fail",$phi$293);
          var $phi$291 = $phi$292
        } else if(b_2334.$tag==1){
          var $phi$291 = (bind_2335(b_2334.$1))(a_2333)
        } else var $phi$291 = (err_2336(a_2333))(b_2334);
        var $phi$285 = $phi$291
      } else if(a_2333.$tag==0){
        if(b_2334.$tag==0){
          var $phi$290 = (($eq$eq($import1$instance$Eq$1))(a_2333.$1))(b_2334.$1);
          if($phi$290){
            var $phi$289 = emptySubs_1989
          } else if(!$phi$290){
            var $phi$289 = (err_2336(a_2333))(b_2334)
          } else error("pattern match fail",$phi$290);
          var $phi$288 = $phi$289
        } else if(b_2334.$tag==1){
          var $phi$288 = (bind_2335(b_2334.$1))(a_2333)
        } else var $phi$288 = (err_2336(a_2333))(b_2334);
        var $phi$285 = $phi$288
      } else if(a_2333.$tag==7){
        var $phi$285 = (err_2336(a_2333))(b_2334)
      } else if(a_2333.$tag==5){
        var $phi$285 = (err_2336(a_2333))(b_2334)
      } else if(a_2333.$tag==3){
        if(b_2334.$tag==1){
          var $phi$287 = (bind_2335(b_2334.$1))(a_2333)
        } else if(b_2334.$tag==3){
          var fsubs_2369 = ((unify_2024(ef_2332))(a_2333.$1))(b_2334.$1);
          var xsubs_2370 = ((unify_2024(ef_2332))((applySubs_2021(fsubs_2369))(a_2333.$2)))((applySubs_2021(fsubs_2369))(b_2334.$2));
          var $phi$287 = ((composeSubs_1990(ef_2332))(fsubs_2369))(xsubs_2370)
        } else var $phi$287 = (err_2336(a_2333))(b_2334);
        var $phi$285 = $phi$287
      } else if((a_2333.$tag==4)&&(a_2333.$2.$tag==1)){
        var $phi$285 = (err_2336(a_2333))(b_2334)
      } else if(a_2333.$tag==4){
        if(b_2334.$tag==1){
          var $phi$286 = (bind_2335(b_2334.$1))(a_2333)
        } else if((b_2334.$tag==4)&&(b_2334.$2.$tag==1)){
          var $phi$286 = (err_2336(a_2333))(b_2334)
        } else var $phi$286 = (err_2336(a_2333))(b_2334);
        var $phi$285 = $phi$286
      } else var $phi$285 = (err_2336(a_2333))(b_2334);
      return $phi$285
    }
  }
};
var setSubs_1998 = function(subs_2131){
  return function(ctx_2132){
    var $phi$295 = (((ICtx_1986(subs_2131))((map(applySubsBound_2022(subs_2131)))(ctx_2132.$1)))(ctx_2132.$2))(ctx_2132.$3);
    return $phi$295
  }
};
var getErrorF_2005 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1883))(function(ctx_2170){
  var $phi$296 = (ret($import1$instance$Monad$11))(ctx_2170.$3);
  return $phi$296
});
var unifyM_2023 = function(a_2326){
  return function(b_2327){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_1883))(function(ctx_2328){
      return (($gt$gt$eq($import1$instance$Monad$11))(getErrorF_2005))(function(ef_2329){
        var ef2_2330 = function(s_2331){
          return ef_2329(($concat(($concat(($concat(($concat(($concat("unifying "))(printType_1980(a_2326))))(" and ")))(printType_1980(b_2327))))(": ")))(s_2331))
        };
        return sets_1882((setSubs_1998(((composeSubs_1990(ef2_2330))(getSubs_1997(ctx_2328)))(((unify_2024(ef2_2330))(a_2326))(b_2327))))(ctx_2328))
      })
    })
  }
};
var onError_2003 = function(e_2160){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1883))(function(ctx_2161){
    var $phi$297 = sets_1882((((ICtx_1986(ctx_2161.$0))(ctx_2161.$1))(ctx_2161.$2))(e_2160));
    return $phi$297
  })
};
var withError_2004 = function(e_2166){
  return function(f_2167){
    return (($gt$gt$eq($import1$instance$Monad$11))(getErrorF_2005))(function(old_2168){
      return (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_1911($import1$instance$Monad$11))(onError_2003(e_2166)))(f_2167)))(function(r_2169){
        return (($gt$gt_1911($import1$instance$Monad$11))(onError_2003(old_2168)))((ret($import1$instance$Monad$11))(r_2169))
      })
    })
  }
};
var withLocError_2026 = function(e_2387){
  return function(f_2388){
    var $phi$299 = getAnnCodeLoc_1957(annOf_1937(e_2387));
    if($phi$299.$tag==1){
      var $phi$298 = f_2388
    } else if($phi$299.$tag==0){
      var $phi$298 = (withError_2004(function(s_2390){
        return ($concat(($concat(s_2390))(" ")))(printCodeLoc_1959($phi$299.$0))
      }))(f_2388)
    } else error("pattern match fail",$phi$299);
    return $phi$298
  }
};
var unrollDataConType_2035 = function(t_2611){
  if((t_2611.$tag==3)&&((t_2611.$1.$tag==3)&&((t_2611.$1.$1.$tag==0)&&("->"==t_2611.$1.$1.$1)))){
    var $phi$302 = unrollDataConType_2035(t_2611.$2);
    var $phi$301 = (Pair_1831((enqueue(t_2611.$1.$2))($phi$302.$0)))($phi$302.$1);
    var $phi$300 = $phi$301
  } else var $phi$300 = (Pair_1831([]))(t_2611);
  return $phi$300
};
var skolemizeSubs_2029 = (foldl(function(subs_2538){
  return function(v_2539){
    return (((addSub_1991(function(s_2540){
      return ($concat("skolemize: "))(s_2540)
    }))(v_2539))((TSkolem_1950(emptyAnn_1963))(v_2539)))(subs_2538)
  }
}))(emptySubs_1989);
var skolemize_2031 = function(e_2548){
  var $phi$304 = getType_1938(e_2548);
  if($phi$304.$tag==6){
    var subs_2553 = skolemizeSubs_2029($phi$304.$1);
    var t2_2554 = (((TForall_1954($phi$304.$0))($phi$304.$1))((map(applySubsBound_2022(subs_2553)))($phi$304.$2)))((applySubs_2021(subs_2553))($phi$304.$3));
    var $phi$303 = (applySubsE_2037(subs_2553))((setType_1942(t2_2554))(e_2548))
  } else var $phi$303 = e_2548;
  return $phi$303
};
var freeTVarsInEnv_2012 = function(env_2201){
  var $phi$305 = env_2201.$2;
  return $phi$305
};
var generalize_2034 = function(env_2579){
  return function(t_2580){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_1883))(function(ctx_2581){
      var subs_2582 = getSubs_1997(ctx_2581);
      var envTVars_2583 = freeTVarsInEnv_2012(env_2579);
      var $phi$306 = ((foldTrie_1855(function(s_2590){
        return function(v_2591){
          return function(__2592){
            return (((setUnion_1868($import1$instance$Hashable$13))($import1$instance$Eq$1))(s_2590))((justOr_1909(Empty_1840))(((fmap($import1$instance$Functor$4))(freeTVars_2015))((((lookup_1853($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_2591))(subs_2582.$1))))
          }
        }
      }))(envTVars_2583))(envTVars_2583);
      var nonFree_2584 = $phi$306;
      var vs_2585 = (((setDiff_1865($import1$instance$Hashable$13))($import1$instance$Eq$1))(freeTVars_2015(t_2580)))(nonFree_2584);
      var processBounds_2587 = function(vbb_2593){
        return function(b_2594){
          var boundVars_2598 = freeTVarsInBound_2025(b_2594);
          var sharedVars_2599 = (((setIntersection_1863($import1$instance$Hashable$13))($import1$instance$Eq$1))(boundVars_2598))(vs_2585);
          var $phi$309 = isEmpty_1875(sharedVars_2599);
          if($phi$309){
            var $phi$308 = (Pair_1831(vbb_2593.$0))((Pair_1831(vbb_2593.$1.$0))((push(b_2594))(vbb_2593.$1.$1)))
          } else if(!$phi$309){
            var $phi$311 = (($eq$eq($import1$instance$Eq$0))(size_1872(sharedVars_2599)))(size_1872(boundVars_2598));
            if($phi$311){
              var $phi$310 = (Pair_1831(vbb_2593.$0))((Pair_1831((push(b_2594))(vbb_2593.$1.$0)))(vbb_2593.$1.$1))
            } else if(!$phi$311){
              var $phi$310 = (Pair_1831((((setUnion_1868($import1$instance$Hashable$13))($import1$instance$Eq$1))(vbb_2593.$0))(sharedVars_2599)))((Pair_1831(vbb_2593.$1.$0))((push(b_2594))(vbb_2593.$1.$1)))
            } else error("pattern match fail",$phi$311);
            var $phi$308 = $phi$310
          } else error("pattern match fail",$phi$309);
          var $phi$307 = $phi$308;
          return $phi$307
        }
      };
      var vbb_2586 = ((foldl(processBounds_2587))((Pair_1831(emptySet_1856))((Pair_1831([]))([]))))(getBounds_2000(ctx_2581));
      var finalVars_2603 = (((setDiff_1865($import1$instance$Hashable$13))($import1$instance$Eq$1))(vs_2585))(vbb_2586.$0);
      var drop_2604 = function(local$instance$Hashable$1){
        return function(local$instance$Eq$0){
          return function(r_2606){
            return function(v_2607){
              return function(t_2608){
                var $phi$314 = ($_1844(isEmpty_1875))((((setIntersection_1863($import1$instance$Hashable$13))($import1$instance$Eq$1))(finalVars_2603))(freeTVars_2015(t_2608)));
                if($phi$314){
                  var $phi$313 = ((((insert_1861(local$instance$Hashable$1))(local$instance$Eq$0))(v_2607))(t_2608))(r_2606)
                } else if(!$phi$314){
                  var $phi$313 = r_2606
                } else error("pattern match fail",$phi$314);
                return $phi$313
              }
            }
          }
        }
      };
      var $phi$315 = (Subs_1985(subs_2582.$0))(((foldTrie_1855((drop_2604($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_1840))(subs_2582.$1));
      var subs2_2605 = $phi$315;
      var $phi$317 = ($or(($_1844(not_1858))(isEmpty_1875(finalVars_2603))))((($gt_1914($import1$instance$Ord$2))(length(vbb_2586.$1.$0)))(0));
      if($phi$317){
        var $phi$316 = (ret($import1$instance$Monad$11))((((mkTForall_2017(emptyAnn_1963))(setToArray_1866(finalVars_2603)))(vbb_2586.$1.$0))(t_2580))
      } else if(!$phi$317){
        var $phi$316 = (ret($import1$instance$Monad$11))(t_2580)
      } else error("pattern match fail",$phi$317);
      var $phi$312 = (($gt$gt_1911($import1$instance$Monad$11))(sets_1882((setBounds_2001(vbb_2586.$1.$1))((setSubs_1998(subs2_2605))(ctx_2581)))))($phi$316);
      return $phi$312
    })
  }
};
var infer_2027 = function(env_2391){
  return function(e_2392){
    var inferPat_2395 = function(env_2413){
      return function(te_2414){
        return function(pat_2415){
          if(pat_2415.$tag==0){
            var $phi$318 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_1995))(function(tv_2418){
              return (($gt$gt_1911($import1$instance$Monad$11))((unifyM_2023(te_2414))(tv_2418)))((ret($import1$instance$Monad$11))((Pair_1831(((((insert_1861($import1$instance$Hashable$13))($import1$instance$Eq$1))(pat_2415.$1))(tv_2418))(Empty_1840)))((PVar_1973((setAnnType_1941(tv_2418))(pat_2415.$0)))(pat_2415.$1))))
            })
          } else if((pat_2415.$tag==1)&&(pat_2415.$1.$tag==0)){
            var $phi$318 = (($gt$gt_1911($import1$instance$Monad$11))((unifyM_2023(te_2414))((TConst_1948(emptyAnn_1963))("Number"))))((ret($import1$instance$Monad$11))((Pair_1831(Empty_1840))(pat_2415)))
          } else if((pat_2415.$tag==1)&&(pat_2415.$1.$tag==1)){
            var $phi$318 = (($gt$gt_1911($import1$instance$Monad$11))((unifyM_2023(te_2414))((TConst_1948(emptyAnn_1963))("String"))))((ret($import1$instance$Monad$11))((Pair_1831(Empty_1840))(pat_2415)))
          } else if(pat_2415.$tag==2){
            var $phi$318 = (($gt$gt$eq($import1$instance$Monad$11))((getBindingM_2008(pat_2415.$1))(env_2413)))(function(bt_2426){
              if(bt_2426.$tag==1){
                var $phi$319 = error(($concat("unknown data type "))(pat_2415.$1))
              } else if(bt_2426.$tag==0){
                var $phi$319 = (($gt$gt$eq($import1$instance$Monad$11))(instantiateM_2018(bt_2426.$0)))(function(t_2428){
                  var $phi$321 = unrollDataConType_2035(t_2428);
                  var $phi$323 = (($eq$eq($import1$instance$Eq$0))(length(pat_2415.$2)))(length($phi$321.$0));
                  if(!$phi$323){
                    var $phi$322 = errorM_2002("number of pattern params does not match the number of constructor params")
                  } else if($phi$323){
                    var $phi$322 = (($gt$gt$eq($import1$instance$Monad$11))((((foldM_1884($import1$instance$Monad$11))(inferSubPat_2396(env_2413)))((Pair_1831(Empty_1840))([])))((zip_1898(pat_2415.$2))($phi$321.$0))))(function(bps_2431){
                      var $phi$324 = (($gt$gt_1911($import1$instance$Monad$11))((unifyM_2023(te_2414))($phi$321.$1)))(($_1844(ret($import1$instance$Monad$11)))((Pair_1831(bps_2431.$0))(((PData_1971(pat_2415.$0))(pat_2415.$1))(bps_2431.$1))));
                      return $phi$324
                    })
                  } else error("pattern match fail",$phi$323);
                  var $phi$320 = $phi$322;
                  return $phi$320
                })
              } else error("pattern match fail",bt_2426);
              return $phi$319
            })
          } else error("pattern match fail",pat_2415);
          return $phi$318
        }
      }
    };
    var inferSubPat_2396 = function(env_2434){
      return function(bp_2435){
        return function(pt_2436){
          var $phi$326 = (($gt$gt$eq($import1$instance$Monad$11))(((inferPat_2395(env_2434))(pt_2436.$1))(pt_2436.$0)))(function(bp_2441){
            var $phi$327 = ($_1844(ret($import1$instance$Monad$11)))((Pair_1831((((mergeTrie_1867($import1$instance$Hashable$13))($import1$instance$Eq$1))(bp_2435.$0))(bp_2441.$0)))((push(bp_2441.$1))(bp_2435.$1)));
            return $phi$327
          });
          var $phi$325 = $phi$326;
          return $phi$325
        }
      }
    };
    var inferCase_2394 = function(env_2404){
      return function(te_2405){
        return function(p_2406){
          var $phi$328 = (($gt$gt$eq($import1$instance$Monad$11))(((inferPat_2395(env_2404))(te_2405))(p_2406.$0)))(function(cb_2409){
            var $phi$329 = (($gt$gt$eq($import1$instance$Monad$11))((infer_2027((addBindings_2011(cb_2409.$0))(env_2404)))(p_2406.$1)))(function(e_2412){
              return (ret($import1$instance$Monad$11))((Pair_1831(cb_2409.$1))(e_2412))
            });
            return $phi$329
          });
          return $phi$328
        }
      }
    };
    var setFinalType_2393 = function(t_2397){
      return function(e_2398){
        var $phi$331 = getType_1938(e_2398);
        if($phi$331.$tag==7){
          var $phi$330 = (ret($import1$instance$Monad$11))((setType_1942(t_2397))(e_2398))
        } else if($phi$331.$tag==6){
          var $phi$330 = (ret($import1$instance$Monad$11))(e_2398)
        } else var $phi$330 = (($gt$gt_1911($import1$instance$Monad$11))((unifyM_2023(t_2397))($phi$331)))((ret($import1$instance$Monad$11))(e_2398));
        return $phi$330
      }
    };
    if((e_2392.$tag==1)&&(e_2392.$1.$tag==0)){
      var $phi$332 = (setFinalType_2393((TConst_1948(emptyAnn_1963))("Number")))(e_2392)
    } else if((e_2392.$tag==1)&&(e_2392.$1.$tag==1)){
      var $phi$332 = (setFinalType_2393((TConst_1948(emptyAnn_1963))("String")))(e_2392)
    } else if(e_2392.$tag==0){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))((getBindingM_2008(e_2392.$1))(env_2391)))(function(vt_2450){
        if(vt_2450.$tag==1){
          var $phi$340 = errorM_2002(($concat(($concat(($concat("unknown identifier "))(e_2392.$1)))(", env: ")))(jsonStringify(($_1844(trieKeys_1871))(getBindings_2009(env_2391)))))
        } else if(vt_2450.$tag==0){
          var $phi$340 = (($gt$gt$eq($import1$instance$Monad$11))(instantiateM_2018(vt_2450.$0)))(function(t_2452){
            return (setFinalType_2393(t_2452))(e_2392)
          })
        } else error("pattern match fail",vt_2450);
        return $phi$340
      })
    } else if(e_2392.$tag==3){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_1995))(function(tv_2456){
        return (($gt$gt$eq($import1$instance$Monad$11))((infer_2027(((addBinding_2010(e_2392.$1))(tv_2456))(env_2391)))(e_2392.$2)))(function(a_2457){
          return (setFinalType_2393(((TApp_1951(emptyAnn_1963))(((TApp_1951(emptyAnn_1963))((TConst_1948(emptyAnn_1963))("->")))(tv_2456)))(getType_1938(a_2457))))(((Lam_1917(e_2392.$0))(e_2392.$1))(a_2457))
        })
      })
    } else if(e_2392.$tag==2){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_1995))(function(tv_2461){
        return (($gt$gt$eq($import1$instance$Monad$11))((infer_2027(env_2391))(e_2392.$1)))(function(f_2462){
          return (($gt$gt$eq($import1$instance$Monad$11))((infer_2027(env_2391))(e_2392.$2)))(function(a_2463){
            var synth_2464 = (f1_2016(getType_1938(a_2463)))(tv_2461);
            return (($gt$gt_1911($import1$instance$Monad$11))((unifyM_2023(getType_1938(f_2462)))(synth_2464)))((setFinalType_2393(tv_2461))(((App_1916(e_2392.$0))(f_2462))(a_2463)))
          })
        })
      })
    } else if(e_2392.$tag==4){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))((infer_2027(env_2391))(e_2392.$1)))(function(e_2468){
        return (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1885($import1$instance$Monad$11))((inferCase_2394(env_2391))(getType_1938(e_2468))))(e_2392.$2)))(function(ps_2469){
          var t_2470 = getType_1938(snd_1835(head_1891(ps_2469)));
          return (($gt$gt_1911($import1$instance$Monad$11))(((mapM_1885($import1$instance$Monad$11))(function(p_2471){
            return (unifyM_2023(t_2470))(($_1844(getType_1938))(snd_1835(p_2471)))
          }))(tail_1890(ps_2469))))((setFinalType_2393(t_2470))(((Case_1918(e_2392.$0))(e_2468))(ps_2469)))
        })
      })
    } else if(e_2392.$tag==5){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))((inferDefs_2033(env_2391))(e_2392.$1)))(function(ds_2475){
        var env2_2476 = ((foldl(function(env_2477){
          return function(d_2478){
            var $phi$339 = ((addBinding_2010(d_2478.$0))(getType_1938(d_2478.$1)))(env_2477);
            return $phi$339
          }
        }))(env_2391))(ds_2475);
        return (($gt$gt$eq($import1$instance$Monad$11))((infer_2027(env2_2476))(e_2392.$2)))(function(e_2481){
          return (setFinalType_2393(getType_1938(e_2481)))(((Let_1919(e_2392.$0))(ds_2475))(e_2481))
        })
      })
    } else if((e_2392.$tag==6)&&("Array"==e_2392.$1)){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1885($import1$instance$Monad$11))(infer_2027(env_2391)))(e_2392.$2)))(function(es_2484){
        return (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_1995))(function(tv_2485){
          return (($gt$gt_1911($import1$instance$Monad$11))(((mapM_1885($import1$instance$Monad$11))(function(e_2486){
            return (unifyM_2023(tv_2485))(getType_1938(e_2486))
          }))(es_2484)))((setFinalType_2393(((TApp_1951(emptyAnn_1963))((TConst_1948(emptyAnn_1963))("Array")))(tv_2485)))(((New_1920(e_2392.$0))("Array"))(es_2484)))
        })
      })
    } else if(e_2392.$tag==6){
      var $phi$332 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1885($import1$instance$Monad$11))(infer_2027(env_2391)))(e_2392.$2)))(function(es_2490){
        return (($gt$gt$eq($import1$instance$Monad$11))((getBindingM_2008(e_2392.$1))(env_2391)))(function(t_2491){
          if(t_2491.$tag==1){
            var $phi$333 = error(($concat("unknown data constructor "))(e_2392.$1))
          } else if(t_2491.$tag==0){
            var $phi$333 = (($gt$gt$eq($import1$instance$Monad$11))(instantiateM_2018(t_2491.$0)))(function(t_2493){
              var $phi$335 = unrollDataConType_2035(t_2493);
              var $phi$337 = (($eq$eq($import1$instance$Eq$0))(length(es_2490)))(length($phi$335.$0));
              if(!$phi$337){
                var $phi$336 = errorM_2002(($concat(($concat(($concat("number of New args does not match the number of constructor params "))(jsonStringify(es_2490))))(" ")))(printType_1980(t_2493)))
              } else if($phi$337){
                var $phi$336 = (($gt$gt_1911($import1$instance$Monad$11))(((mapM_1885($import1$instance$Monad$11))(function(p_2496){
                  var $phi$338 = (unifyM_2023(p_2496.$0))(getType_1938(p_2496.$1));
                  return $phi$338
                }))((zip_1898($phi$335.$0))(es_2490))))((setFinalType_2393($phi$335.$1))(((New_1920(e_2392.$0))(e_2392.$1))(es_2490)))
              } else error("pattern match fail",$phi$337);
              var $phi$334 = $phi$336;
              return $phi$334
            })
          } else error("pattern match fail",t_2491);
          return $phi$333
        })
      })
    } else var $phi$332 = error("type inference not supported for this AST node");
    return ($_1844(withLocError_2026(e_2392)))($phi$332)
  }
};
var inferSccDefs_2028 = function(env_2500){
  return function(ds_2501){
    var generalizeDef_2505 = function(env_2524){
      return function(d_2525){
        var $phi$343 = getType_1938(d_2525.$1);
        if($phi$343.$tag==6){
          var $phi$342 = (ret($import1$instance$Monad$11))(d_2525)
        } else var $phi$342 = (($gt$gt$eq($import1$instance$Monad$11))((generalize_2034(env_2524))($phi$343)))(function(t_2533){
          var e2_2534 = skolemize_2031((setType_1942(t_2533))(d_2525.$1));
          return (ret($import1$instance$Monad$11))((Pair_1831(d_2525.$0))(e2_2534))
        });
        var $phi$341 = $phi$342;
        return $phi$341
      }
    };
    var unifyDef_2504 = function(env_2515){
      return function(d_2516){
        var $phi$346 = getType_1938(d_2516.$1);
        if($phi$346.$tag==6){
          var $phi$345 = (ret($import1$instance$Monad$11))(Unit_1857)
        } else var $phi$345 = (unifyM_2023($phi$346))(($_1844(fromJust_1908))((getBinding_2007(d_2516.$0))(env_2515)));
        var $phi$344 = $phi$345;
        return $phi$344
      }
    };
    var inferDef_2503 = function(env_2510){
      return function(d_2511){
        var $phi$347 = (($gt$gt$eq($import1$instance$Monad$11))((infer_2027(env_2510))(d_2511.$1)))(function(e_2514){
          return (ret($import1$instance$Monad$11))((Pair_1831(d_2511.$0))(e_2514))
        });
        return $phi$347
      }
    };
    var generateTVar_2502 = function(env_2506){
      return function(d_2507){
        var $phi$349 = getType_1938(snd_1835(d_2507));
        if($phi$349.$tag==7){
          var $phi$348 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_1995))(function(tv_2508){
            return (ret($import1$instance$Monad$11))(((addBinding_2010(fst_1845(d_2507)))(tv_2508))(env_2506))
          })
        } else var $phi$348 = (ret($import1$instance$Monad$11))(((addBinding_2010(fst_1845(d_2507)))($phi$349))(env_2506));
        return $phi$348
      }
    };
    return (($gt$gt$eq($import1$instance$Monad$11))((((foldM_1884($import1$instance$Monad$11))(generateTVar_2502))(env_2500))(ds_2501)))(function(env2_2535){
      return (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1885($import1$instance$Monad$11))(inferDef_2503(env2_2535)))(ds_2501)))(function(ds2_2536){
        return (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_1911($import1$instance$Monad$11))(((mapM_1885($import1$instance$Monad$11))(unifyDef_2504(env2_2535)))(ds2_2536)))(((mapM_1885($import1$instance$Monad$11))(applySubsDef_2036))(ds2_2536))))(function(ds3_2537){
          return (($gt$gt_1911($import1$instance$Monad$11))(dropSatisfiedBounds_2032(env_2500)))(((mapM_1885($import1$instance$Monad$11))(generalizeDef_2505(env_2500)))(ds3_2537))
        })
      })
    })
  }
};
var inferDefs_2033 = function(env_2563){
  return function(ds_2564){
    var infer_2568 = function(rs_2574){
      return function(cc_2575){
        return ((fmap($import1$instance$Functor$9))(concat(rs_2574)))((inferSccDefs_2028(((foldl(function(env_2576){
          return function(r_2577){
            return ((addBinding_2010(fst_1845(r_2577)))(getType_1938(snd_1835(r_2577))))(env_2576)
          }
        }))(env_2563))(rs_2574)))((filter(function(d_2578){
          return ((contains_1905($import1$instance$Eq$1))(fst_1845(d_2578)))(cc_2575)
        }))(ds_2564)))
      }
    };
    var ns_2565 = (map(fst_1845))(ds_2564);
    var g_2566 = ((foldl(function(g_2569){
      return function(d_2570){
        var $phi$350 = ((set(d_2570.$0))((filter(function(v_2573){
          return ($and(((contains_1905($import1$instance$Eq$1))(v_2573))(ns_2565)))((($div$eq_1859($import1$instance$Eq$1))(v_2573))(d_2570.$0))
        }))(freeVars_2038(d_2570.$1))))(g_2569);
        return $phi$350
      }
    }))(empty))(ds_2564);
    var ccs_2567 = sccSorted_1984(g_2566);
    return (((foldM_1884($import1$instance$Monad$11))(infer_2568))([]))(ccs_2567)
  }
};
var newCtx_1996 = (((ICtx_1986(emptySubs_1989))([]))(1))(function(s_2125){
  return ($concat("unknown error context: "))(s_2125)
});
var inferInstance_2039 = function(env_2673){
  return function(cs_2674){
    return function(i_2675){
      var inferE_2676 = function(e_2677){
        var $phi$352 = ($_1844(runState_1880(newCtx_1996)))((infer_2027(env_2673))(e_2677));
        var $phi$351 = (applySubsE_2037(getSubs_1997($phi$352.$0)))($phi$352.$1);
        return $phi$351
      };
      var $phi$356 = (find_1849(function(c_2684){
        var $phi$355 = (($eq$eq($import1$instance$Eq$1))(i_2675.$1))(c_2684.$1);
        return $phi$355
      }))(cs_2674);
      if($phi$356.$tag==1){
        var $phi$354 = error(($concat("Cannot find clas "))(i_2675.$1))
      } else if($phi$356.$tag==0){
        var bs2_2693 = ((foldl(function(bs_2695){
          return function(b_2696){
            var $phi$357 = ((((insert_1861($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2696.$0))(((substitute_2020($phi$356.$0.$2))(i_2675.$2))(b_2696.$1)))(bs_2695);
            return $phi$357
          }
        }))(Empty_1840))($phi$356.$0.$3);
        var ds2_2694 = (map(function(d_2699){
          var $phi$358 = (Pair_1831(d_2699.$0))(inferE_2676((setType_1942(($_1844(fromJust_1908))((((lookup_1853($import1$instance$Hashable$13))($import1$instance$Eq$1))(d_2699.$0))(bs2_2693))))(d_2699.$1)));
          return $phi$358
        }))(i_2675.$3);
        var $phi$354 = (((Instance_1967(i_2675.$0))(i_2675.$1))(i_2675.$2))(ds2_2694)
      } else error("pattern match fail",$phi$356);
      var $phi$353 = $phi$354;
      return $phi$353
    }
  }
};
var emptyEnv_2006 = ((IEnv_1987(Empty_1840))([]))(emptySet_1856);
var addInstance_2013 = function(b_2205){
  return function(env_2206){
    var $phi$359 = ((IEnv_1987(env_2206.$0))((push(b_2205))(env_2206.$1)))(env_2206.$2);
    return $phi$359
  }
};
var skolemizeType_2030 = function(t_2541){
  if(t_2541.$tag==6){
    var subs_2546 = skolemizeSubs_2029(t_2541.$1);
    var $phi$360 = (((TForall_1954(t_2541.$0))(t_2541.$1))((map(applySubsBound_2022(subs_2546)))(t_2541.$2)))((applySubs_2021(subs_2546))(t_2541.$3))
  } else var $phi$360 = t_2541;
  return $phi$360
};
var classToBindings_2041 = function(c_2707){
  var process_2712 = function(b_2713){
    var ftv_2716 = freeTVars_2015(b_2713.$1);
    var $phi$364 = (((setContains_1854($import1$instance$Hashable$13))($import1$instance$Eq$1))(c_2707.$2))(ftv_2716);
    if(!$phi$364){
      var $phi$363 = error(($concat(($concat(($concat("invalid clas definition "))(c_2707.$1)))(", binding ")))(b_2713.$0))
    } else if($phi$364){
      var $phi$363 = (Pair_1831(b_2713.$0))(skolemizeType_2030((((mkTForall_2017(emptyAnn_1963))(setToArray_1866(ftv_2716)))([((TCBound_1947(emptyAnn_1963))(c_2707.$1))((TVar_1949(emptyAnn_1963))(c_2707.$2))]))(b_2713.$1)))
    } else error("pattern match fail",$phi$364);
    var $phi$362 = $phi$363;
    return $phi$362
  };
  var $phi$361 = (map(process_2712))(c_2707.$3);
  return $phi$361
};
var inferTypeModule_2042 = function(ms_2717){
  return function(m_2718){
    var checkForUnsatisfiedBounds_2723 = function(d_2751){
      var $phi$366 = getType_1938(snd_1835(d_2751));
      if($phi$366.$tag==6){
        if(($phi$366.$3.$tag==3)&&(($phi$366.$3.$1.$tag==3)&&(($phi$366.$3.$1.$1.$tag==0)&&("->"==$phi$366.$3.$1.$1.$1)))){
          var $phi$367 = d_2751
        } else {
          var $phi$369 = length($phi$366.$2);
          if(0==$phi$369){
            var $phi$368 = d_2751
          } else var $phi$368 = error(($concat(($concat(($concat("unsatisfied bounds in def of "))(fst_1845(d_2751))))(" :: ")))(printType_1980(getType_1938(snd_1835(d_2751)))));
          var $phi$367 = $phi$368
        };
        var $phi$365 = $phi$367
      } else var $phi$365 = d_2751;
      return $phi$365
    };
    var addIns_2722 = function(env_2749){
      return function(i_2750){
        return (addInstance_2013(instanceToTypeBound_2040(i_2750)))(env_2749)
      }
    };
    var getFile_2719 = function(i_2724){
      if(i_2724.$tag==1){
        var $phi$370 = i_2724.$1
      } else error("pattern match fail",i_2724);
      return $phi$370
    };
    var addClass_2721 = function(env_2745){
      return function(c_2746){
        return ((foldl(function(env_2747){
          return function(b_2748){
            return ((addBinding_2010(fst_1845(b_2748)))(snd_1835(b_2748)))(env_2747)
          }
        }))(env_2745))(classToBindings_2041(c_2746))
      }
    };
    var addImports_2720 = function(env_2728){
      return function(i_2729){
        var $phi$372 = (get(getFile_2719(i_2729)))(ms_2717);
        if(i_2729.$tag==1){
          var $phi$373 = ((foldl(function(env_2739){
            return function(n_2740){
              var $phi$374 = ((addBinding_2010(n_2740.$1))((get(n_2740.$0))($phi$372.$0)))(env_2739);
              return $phi$374
            }
          }))(env_2728))(i_2729.$2)
        } else error("pattern match fail",i_2729);
        var env2_2733 = $phi$373;
        var env3_2734 = ((foldl(addClass_2721))(env2_2733))($phi$372.$1);
        var env4_2735 = ((foldl(function(env_2743){
          return function(i_2744){
            return (addInstance_2013(i_2744))(env_2743)
          }
        }))(env3_2734))($phi$372.$2);
        var $phi$371 = env4_2735;
        return $phi$371
      }
    };
    var env_2771 = emptyEnv_2006;
    var env2_2772 = ((foldl(addImports_2720))(env_2771))(m_2718.$2);
    var env3_2773 = ((foldl(addClass_2721))(env2_2772))(m_2718.$4);
    var env4_2774 = ((foldl(addIns_2722))(env3_2773))(m_2718.$5);
    var ds2_2775 = (evalState_1881(newCtx_1996))((inferDefs_2033(env4_2774))(m_2718.$6));
    var ds3_2776 = (map(checkForUnsatisfiedBounds_2723))(ds2_2775);
    var env5_2777 = ((foldl(function(env_2779){
      return function(d_2780){
        var $phi$376 = ((addBinding_2010(d_2780.$0))(getType_1938(d_2780.$1)))(env_2779);
        return $phi$376
      }
    }))(env4_2774))(ds3_2776);
    var ins2_2778 = (map((inferInstance_2039(env5_2777))((concat(m_2718.$4))((concatMap_1897(function(i_2783){
      var $phi$378 = (get(getFile_2719(i_2783)))(ms_2717);
      var $phi$377 = $phi$378.$1;
      return $phi$377
    }))(m_2718.$2)))))(m_2718.$5);
    var $phi$375 = ((((((Module_1970(m_2718.$0))(m_2718.$1))(m_2718.$2))(m_2718.$3))(m_2718.$4))(ins2_2778))(ds3_2776);
    return $phi$375
  }
};
var assert_2831 = assert_85;
var Pair_2832 = Pair_3;
var mapSnd_2833 = mapSnd_84;
var mapFst_2834 = mapFst_83;
var $gt$eq$gt_2835 = $gt$eq$gt_82;
var snd_2836 = snd_23;
var debug2_2837 = debug2_81;
var Just_2838 = Just_1;
var Nothing_2839 = Nothing_2;
var isJust_2840 = isJust_21;
var Empty_2841 = Empty_7;
var Leaf_2842 = Leaf_8;
var Collision_2843 = Collision_9;
var BitmapIndexed_2844 = BitmapIndexed_10;
var $_2845 = $_12;
var fst_2846 = fst_22;
var Left_2847 = Left_4;
var Right_2848 = Right_5;
var loop_2849 = loop_27;
var find_2850 = find_29;
var hamtMask_2851 = hamtMask_58;
var popCount_2852 = popCount_57;
var hamtIndex_2853 = hamtIndex_59;
var lookup_2854 = lookup_60;
var setContains_2855 = setContains_76;
var foldTrie_2856 = foldTrie_66;
var emptySet_2857 = emptySet_72;
var Unit_2858 = Unit_0;
var not_2859 = not_26;
var $div$eq_2860 = $div$eq_13;
var mapIx_2861 = mapIx_30;
var insert_2862 = insert_61;
var setAdd_2863 = setAdd_73;
var setIntersection_2864 = setIntersection_80;
var remove_2865 = remove_63;
var setDiff_2866 = setDiff_79;
var setToArray_2867 = setToArray_78;
var mergeTrie_2868 = mergeTrie_70;
var setUnion_2869 = setUnion_77;
var setRemove_2870 = setRemove_75;
var setAddAll_2871 = setAddAll_74;
var trieKeys_2872 = trieKeys_71;
var size_2873 = size_68;
var mapTrie_2874 = mapTrie_67;
var nodeMask_2875 = nodeMask_56;
var isEmpty_2876 = isEmpty_69;
var filterTrie_2877 = filterTrie_65;
var nextSetBitMask_2878 = nextSetBitMask_64;
var updateOrSet_2879 = updateOrSet_62;
var State_2880 = State_6;
var runState_2881 = runState_54;
var evalState_2882 = evalState_55;
var sets_2883 = sets_53;
var gets_2884 = gets_52;
var foldM_2885 = foldM_49;
var mapM_2886 = mapM_50;
var forM_2887 = forM_51;
var strToArray_2888 = strToArray_48;
var toRecord_2889 = toRecord_47;
var reverse_2890 = reverse_46;
var tail_2891 = tail_41;
var head_2892 = head_40;
var uniq_2893 = uniq_45;
var mergeSet_2894 = mergeSet_44;
var init_2895 = init_43;
var last_2896 = last_42;
var mapJust_2897 = mapJust_39;
var concatMap_2898 = concatMap_38;
var zip_2899 = zip_37;
var zipWithIndex2_2900 = zipWithIndex2_35;
var zipWithIndex_2901 = zipWithIndex_36;
var join_2902 = join_34;
var all_2903 = all_33;
var exists_2904 = exists_32;
var containsChar_2905 = containsChar_31;
var contains_2906 = contains_28;
var either_2907 = either_24;
var splitEither_2908 = splitEither_25;
var fromJust_2909 = fromJust_20;
var justOr_2910 = justOr_19;
var maybe_2911 = maybe_18;
var $gt$gt_2912 = $gt$gt_17;
var $gt$eq_2913 = $gt$eq_16;
var $lt$eq_2914 = $lt$eq_15;
var $gt_2915 = $gt_14;
var Identity_2916 = Identity_11;
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
var App_2917 = App_731;
var Lam_2918 = Lam_732;
var Case_2919 = Case_733;
var Let_2920 = Let_734;
var New_2921 = New_735;
var breakableDownAndUpM_2922 = breakableDownAndUpM_782;
var breakableDownM_2923 = breakableDownM_786;
var downAndUpM_2924 = downAndUpM_783;
var downM_2925 = downM_785;
var upM_2926 = upM_784;
var breakableDownAndUp_2927 = breakableDownAndUp_777;
var breakableDown_2928 = breakableDown_781;
var downAndUp_2929 = downAndUp_778;
var down_2930 = down_780;
var up_2931 = up_779;
var AnnType_2932 = AnnType_723;
var TUnknown_2933 = TUnknown_755;
var getAnn_2934 = getAnn_760;
var getAnnType_2935 = getAnnType_763;
var Var_2936 = Var_729;
var Const_2937 = Const_730;
var annOf_2938 = annOf_774;
var getType_2939 = getType_776;
var withAnn_2940 = withAnn_775;
var setAnn_2941 = setAnn_761;
var setAnnType_2942 = setAnnType_764;
var setType_2943 = setType_773;
var Data_2944 = Data_743;
var DataCon_2945 = DataCon_744;
var dataConName_2946 = dataConName_771;
var dataConNames_2947 = dataConNames_772;
var TCBound_2948 = TCBound_747;
var TConst_2949 = TConst_748;
var TVar_2950 = TVar_749;
var TSkolem_2951 = TSkolem_750;
var TApp_2952 = TApp_751;
var TRow_2953 = TRow_752;
var TBot_2954 = TBot_753;
var TForall_2955 = TForall_754;
var equivBound_2956 = equivBound_769;
var equivType_2957 = equivType_770;
var getAnnCodeLoc_2958 = getAnnCodeLoc_765;
var AnnCodeLoc_2959 = AnnCodeLoc_724;
var printCodeLoc_2960 = printCodeLoc_767;
var exprLoc_2961 = exprLoc_768;
var setAnnCodeLoc_2962 = setAnnCodeLoc_766;
var copyAnn_2963 = copyAnn_762;
var emptyAnn_2964 = emptyAnn_759;
var ImportAll_2965 = ImportAll_758;
var ImportOpen_2966 = ImportOpen_757;
var ImportClosed_2967 = ImportClosed_756;
var Instance_2968 = Instance_746;
var Class_2969 = Class_745;
var ModuleInterface_2970 = ModuleInterface_742;
var Module_2971 = Module_741;
var PData_2972 = PData_740;
var PConst_2973 = PConst_739;
var PVar_2974 = PVar_738;
var CStr_2975 = CStr_737;
var CNum_2976 = CNum_736;
var AnnExport_2977 = AnnExport_728;
var AnnTag_2978 = AnnTag_727;
var AnnData_2979 = AnnData_726;
var AnnUseCount_2980 = AnnUseCount_725;
var skolemize_2981 = skolemize_2031;
var mkConFun_2984 = function(tag_3008){
  return function(dt_3009){
    return function(vs_3010){
      return function(n_3011){
        return function(ts_3012){
          var nts_3013 = (map(function(it_3019){
            return (Pair_2832(($concat("$_"))(intToString(fst_2846(it_3019)))))(snd_2836(it_3019))
          }))(zipWithIndex_2901(ts_3012));
          var new_3014 = (setType_2943(dt_3009))(((New_2921(emptyAnn_2964))(n_3011))((map(function(nt_3020){
            return (Var_2936(emptyAnn_2964))(fst_2846(nt_3020))
          }))(nts_3013)));
          var mkCon_3015 = function(r_3021){
            return function(nt_3022){
              var $phi$379 = (setType_2943(((TApp_2952(emptyAnn_2964))(((TApp_2952(emptyAnn_2964))((TConst_2949(emptyAnn_2964))("->")))(nt_3022.$1)))(getType_2939(r_3021))))(((Lam_2918(emptyAnn_2964))(nt_3022.$0))(r_3021));
              return $phi$379
            }
          };
          var con_3016 = ((foldr(mkCon_3015))(new_3014))(nts_3013);
          var conT_3017 = (((TForall_2955(emptyAnn_2964))(vs_3010))([]))(getType_2939(con_3016));
          var ann_3018 = ((((setAnn_2941($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_2977(n_3011)))(((((setAnn_2941($import1$instance$Hashable$13))($import1$instance$Eq$1))("type"))(AnnType_2932(conT_3017)))(((((setAnn_2941($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(AnnData_2979(tag_3008)))(emptyAnn_2964)));
          return (Pair_2832(n_3011))(skolemize_2981((withAnn_2940(ann_3018))(con_3016)))
        }
      }
    }
  }
};
var rewriteData_2983 = function(d_2993){
  var dt_2998 = ((foldl(function(r_3000){
    return function(v_3001){
      return ((TApp_2952(emptyAnn_2964))(r_3000))((TVar_2950(emptyAnn_2964))(v_3001))
    }
  }))((TConst_2949(emptyAnn_2964))(d_2993.$1)))(d_2993.$2);
  var rewriteCon_2999 = function(c_3002){
    var $phi$382 = length(d_2993.$3);
    if(1==$phi$382){
      var $phi$381 = Nothing_2839
    } else var $phi$381 = Just_2838(fst_2846(c_3002));
    var tag_3003 = $phi$381;
    var $phi$384 = snd_2836(c_3002);
    var $phi$383 = ((((mkConFun_2984(tag_3003))(dt_2998))(d_2993.$2))($phi$384.$1))($phi$384.$2);
    return $phi$383
  };
  var $phi$380 = (map(rewriteCon_2999))(zipWithIndex_2901(d_2993.$3));
  return $phi$380
};
var translateAdts_2982 = function(m_2985){
  var $phi$385 = ((((((Module_2971(m_2985.$0))(m_2985.$1))(m_2985.$2))([]))(m_2985.$4))(m_2985.$5))((concat((concatMap_2898(rewriteData_2983))(m_2985.$3)))(m_2985.$6));
  return $phi$385
};
var assert_3025 = assert_85;
var Pair_3026 = Pair_3;
var mapSnd_3027 = mapSnd_84;
var mapFst_3028 = mapFst_83;
var $gt$eq$gt_3029 = $gt$eq$gt_82;
var snd_3030 = snd_23;
var debug2_3031 = debug2_81;
var Just_3032 = Just_1;
var Nothing_3033 = Nothing_2;
var isJust_3034 = isJust_21;
var Empty_3035 = Empty_7;
var Leaf_3036 = Leaf_8;
var Collision_3037 = Collision_9;
var BitmapIndexed_3038 = BitmapIndexed_10;
var $_3039 = $_12;
var fst_3040 = fst_22;
var Left_3041 = Left_4;
var Right_3042 = Right_5;
var loop_3043 = loop_27;
var find_3044 = find_29;
var hamtMask_3045 = hamtMask_58;
var popCount_3046 = popCount_57;
var hamtIndex_3047 = hamtIndex_59;
var lookup_3048 = lookup_60;
var setContains_3049 = setContains_76;
var foldTrie_3050 = foldTrie_66;
var emptySet_3051 = emptySet_72;
var Unit_3052 = Unit_0;
var not_3053 = not_26;
var $div$eq_3054 = $div$eq_13;
var mapIx_3055 = mapIx_30;
var insert_3056 = insert_61;
var setAdd_3057 = setAdd_73;
var setIntersection_3058 = setIntersection_80;
var remove_3059 = remove_63;
var setDiff_3060 = setDiff_79;
var setToArray_3061 = setToArray_78;
var mergeTrie_3062 = mergeTrie_70;
var setUnion_3063 = setUnion_77;
var setRemove_3064 = setRemove_75;
var setAddAll_3065 = setAddAll_74;
var trieKeys_3066 = trieKeys_71;
var size_3067 = size_68;
var mapTrie_3068 = mapTrie_67;
var nodeMask_3069 = nodeMask_56;
var isEmpty_3070 = isEmpty_69;
var filterTrie_3071 = filterTrie_65;
var nextSetBitMask_3072 = nextSetBitMask_64;
var updateOrSet_3073 = updateOrSet_62;
var State_3074 = State_6;
var runState_3075 = runState_54;
var evalState_3076 = evalState_55;
var sets_3077 = sets_53;
var gets_3078 = gets_52;
var foldM_3079 = foldM_49;
var mapM_3080 = mapM_50;
var forM_3081 = forM_51;
var strToArray_3082 = strToArray_48;
var toRecord_3083 = toRecord_47;
var reverse_3084 = reverse_46;
var tail_3085 = tail_41;
var head_3086 = head_40;
var uniq_3087 = uniq_45;
var mergeSet_3088 = mergeSet_44;
var init_3089 = init_43;
var last_3090 = last_42;
var mapJust_3091 = mapJust_39;
var concatMap_3092 = concatMap_38;
var zip_3093 = zip_37;
var zipWithIndex2_3094 = zipWithIndex2_35;
var zipWithIndex_3095 = zipWithIndex_36;
var join_3096 = join_34;
var all_3097 = all_33;
var exists_3098 = exists_32;
var containsChar_3099 = containsChar_31;
var contains_3100 = contains_28;
var either_3101 = either_24;
var splitEither_3102 = splitEither_25;
var fromJust_3103 = fromJust_20;
var justOr_3104 = justOr_19;
var maybe_3105 = maybe_18;
var $gt$gt_3106 = $gt$gt_17;
var $gt$eq_3107 = $gt$eq_16;
var $lt$eq_3108 = $lt$eq_15;
var $gt_3109 = $gt_14;
var Identity_3110 = Identity_11;
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
var App_3111 = App_731;
var Lam_3112 = Lam_732;
var Case_3113 = Case_733;
var Let_3114 = Let_734;
var New_3115 = New_735;
var breakableDownAndUpM_3116 = breakableDownAndUpM_782;
var breakableDownM_3117 = breakableDownM_786;
var downAndUpM_3118 = downAndUpM_783;
var downM_3119 = downM_785;
var upM_3120 = upM_784;
var breakableDownAndUp_3121 = breakableDownAndUp_777;
var breakableDown_3122 = breakableDown_781;
var downAndUp_3123 = downAndUp_778;
var down_3124 = down_780;
var up_3125 = up_779;
var AnnType_3126 = AnnType_723;
var TUnknown_3127 = TUnknown_755;
var getAnn_3128 = getAnn_760;
var getAnnType_3129 = getAnnType_763;
var Var_3130 = Var_729;
var Const_3131 = Const_730;
var annOf_3132 = annOf_774;
var getType_3133 = getType_776;
var withAnn_3134 = withAnn_775;
var setAnn_3135 = setAnn_761;
var setAnnType_3136 = setAnnType_764;
var setType_3137 = setType_773;
var Data_3138 = Data_743;
var DataCon_3139 = DataCon_744;
var dataConName_3140 = dataConName_771;
var dataConNames_3141 = dataConNames_772;
var TCBound_3142 = TCBound_747;
var TConst_3143 = TConst_748;
var TVar_3144 = TVar_749;
var TSkolem_3145 = TSkolem_750;
var TApp_3146 = TApp_751;
var TRow_3147 = TRow_752;
var TBot_3148 = TBot_753;
var TForall_3149 = TForall_754;
var equivBound_3150 = equivBound_769;
var equivType_3151 = equivType_770;
var getAnnCodeLoc_3152 = getAnnCodeLoc_765;
var AnnCodeLoc_3153 = AnnCodeLoc_724;
var printCodeLoc_3154 = printCodeLoc_767;
var exprLoc_3155 = exprLoc_768;
var setAnnCodeLoc_3156 = setAnnCodeLoc_766;
var copyAnn_3157 = copyAnn_762;
var emptyAnn_3158 = emptyAnn_759;
var ImportAll_3159 = ImportAll_758;
var ImportOpen_3160 = ImportOpen_757;
var ImportClosed_3161 = ImportClosed_756;
var Instance_3162 = Instance_746;
var Class_3163 = Class_745;
var ModuleInterface_3164 = ModuleInterface_742;
var Module_3165 = Module_741;
var PData_3166 = PData_740;
var PConst_3167 = PConst_739;
var PVar_3168 = PVar_738;
var CStr_3169 = CStr_737;
var CNum_3170 = CNum_736;
var AnnExport_3171 = AnnExport_728;
var AnnTag_3172 = AnnTag_727;
var AnnData_3173 = AnnData_726;
var AnnUseCount_3174 = AnnUseCount_725;
var getUid_3175 = getUid_1493;
var setUid_3176 = setUid_1494;
var getExports_3177 = getExports_1491;
var newIdent_3178 = function(n_3185){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_3078))(function(i_3186){
    return (($gt$gt_3106($import1$instance$Monad$11))(sets_3077(i_3186+1)))((ret($import1$instance$Monad$11))(($concat(($concat(n_3185))("_")))(intToString(i_3186))))
  })
};
var rewriteExpr_3179 = function(env_3187){
  return function(e_3188){
    var rename_3189 = function(n_3193){
      return newIdent_3178(n_3193)
    };
    var renamePat_3190 = function(p_3194){
      if(p_3194.$tag==1){
        var $phi$386 = (ret($import1$instance$Monad$11))((Pair_3026(p_3194))(empty))
      } else if(p_3194.$tag==0){
        var $phi$386 = (($gt$gt$eq($import1$instance$Monad$11))(rename_3189(p_3194.$1)))(function(n_3199){
          return (ret($import1$instance$Monad$11))((Pair_3026((PVar_3168(p_3194.$0))(n_3199)))(((set(p_3194.$1))(n_3199))(empty)))
        })
      } else if(p_3194.$tag==2){
        var $phi$386 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_3080($import1$instance$Monad$11))(renamePat_3190))(p_3194.$2)))(function(ps_3203){
          var $phi$388 = (has(p_3194.$1))(env_3187);
          if(!$phi$388){
            var $phi$387 = (ret($import1$instance$Monad$11))((Pair_3026(((PData_3166(p_3194.$0))(p_3194.$1))((map(fst_3040))(ps_3203))))(((foldl(merge))(empty))((map(snd_3030))(ps_3203))))
          } else if($phi$388){
            var $phi$387 = (ret($import1$instance$Monad$11))((Pair_3026(((PData_3166(p_3194.$0))((get(p_3194.$1))(env_3187)))((map(fst_3040))(ps_3203))))(((foldl(merge))(empty))((map(snd_3030))(ps_3203))))
          } else error("pattern match fail",$phi$388);
          return $phi$387
        })
      } else error("pattern match fail",p_3194);
      return $phi$386
    };
    var rewritePat_3191 = function(p_3204){
      var $phi$389 = (($gt$gt$eq($import1$instance$Monad$11))(renamePat_3190(p_3204.$0)))(function(pe_3207){
        var $phi$390 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_3179((merge(env_3187))(pe_3207.$1)))(p_3204.$1)))(function(e_3210){
          return (ret($import1$instance$Monad$11))((Pair_3026(pe_3207.$0))(e_3210))
        });
        return $phi$390
      });
      return $phi$389
    };
    var f_3192 = function(e_3211){
      if(e_3211.$tag==3){
        var $phi$391 = (($gt$gt$eq($import1$instance$Monad$11))(rename_3189(e_3211.$1)))(function(n_3215){
          return (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_3179(((set(e_3211.$1))(n_3215))(env_3187)))(e_3211.$2)))(function(e_3216){
            return (ret($import1$instance$Monad$11))(Right_3042(((Lam_3112(e_3211.$0))(n_3215))(e_3216)))
          })
        })
      } else if(e_3211.$tag==5){
        var $phi$391 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteBindings_3181(env_3187))(e_3211.$1)))(function(ebs_3220){
          var $phi$396 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_3179(ebs_3220.$0))(e_3211.$2)))(function(e_3223){
            return (ret($import1$instance$Monad$11))(Right_3042(((Let_3114(e_3211.$0))(ebs_3220.$1))(e_3223)))
          });
          return $phi$396
        })
      } else if(e_3211.$tag==4){
        var $phi$391 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_3179(env_3187))(e_3211.$1)))(function(e_3227){
          return (($gt$gt$eq($import1$instance$Monad$11))(((mapM_3080($import1$instance$Monad$11))(rewritePat_3191))(e_3211.$2)))(function(ps_3228){
            return (ret($import1$instance$Monad$11))(Right_3042(((Case_3113(e_3211.$0))(e_3227))(ps_3228)))
          })
        })
      } else if(e_3211.$tag==0){
        var $phi$395 = (has(e_3211.$1))(env_3187);
        if($phi$395){
          var $phi$394 = (ret($import1$instance$Monad$11))(Left_3041((Var_3130(e_3211.$0))((get(e_3211.$1))(env_3187))))
        } else if(!$phi$395){
          var $phi$394 = (ret($import1$instance$Monad$11))(Left_3041(e_3211))
        } else error("pattern match fail",$phi$395);
        var $phi$391 = $phi$394
      } else if(e_3211.$tag==6){
        var $phi$393 = (has(e_3211.$1))(env_3187);
        if($phi$393){
          var $phi$392 = (ret($import1$instance$Monad$11))(Left_3041(((New_3115(e_3211.$0))((get(e_3211.$1))(env_3187)))(e_3211.$2)))
        } else if(!$phi$393){
          var $phi$392 = (ret($import1$instance$Monad$11))(Left_3041(e_3211))
        } else error("pattern match fail",$phi$393);
        var $phi$391 = $phi$392
      } else var $phi$391 = (ret($import1$instance$Monad$11))(Left_3041(e_3211));
      return $phi$391
    };
    return ((breakableDownM_3117($import1$instance$Monad$11))(f_3192))(e_3188)
  }
};
var rewriteBindings_3181 = function(env_3246){
  return function(bs_3247){
    var ns_3248 = (map(fst_3040))(bs_3247);
    var ns2_3249 = ((mapM_3080($import1$instance$Monad$11))(newIdent_3178))(ns_3248);
    return (($gt$gt$eq($import1$instance$Monad$11))(ns2_3249))(function(ns_3250){
      var env2_3251 = (merge(env_3246))(toRecord_3083((zip_3093((map(fst_3040))(bs_3247)))(ns_3250)));
      var bs2_3252 = ((mapM_3080($import1$instance$Monad$11))(rewriteExpr_3179(env2_3251)))((map(snd_3030))(bs_3247));
      return (($gt$gt$eq($import1$instance$Monad$11))(bs2_3252))(function(bs_3253){
        return (ret($import1$instance$Monad$11))((Pair_3026(env2_3251))((zip_3093(ns_3250))(bs_3253)))
      })
    })
  }
};
var rewriteInstance_3180 = function(env_3235){
  return function(i_3236){
    var $phi$397 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_3080($import1$instance$Monad$11))(function(d_3241){
      var $phi$398 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_3179(env_3235))(d_3241.$1)))(function(e_3244){
        return (ret($import1$instance$Monad$11))((Pair_3026(d_3241.$0))(e_3244))
      });
      return $phi$398
    }))(i_3236.$3)))(function(bs_3245){
      return (ret($import1$instance$Monad$11))((((Instance_3162(i_3236.$0))(i_3236.$1))(i_3236.$2))(bs_3245))
    });
    return $phi$397
  }
};
var renameImport_3182 = function(er_3254){
  return function(i_3255){
    if((i_3255.$tag==1)&&("./builtins.js"==i_3255.$1)){
      var $phi$400 = (ret($import1$instance$Monad$11))((Pair_3026(er_3254.$0))((push(i_3255))(er_3254.$1)))
    } else if(i_3255.$tag==1){
      var rename_3263 = function(er_3264){
        return function(p_3265){
          var $phi$402 = (($gt$gt$eq($import1$instance$Monad$11))(newIdent_3178(p_3265.$1)))(function(n_3270){
            return (ret($import1$instance$Monad$11))((Pair_3026(((set(p_3265.$1))(n_3270))(er_3264.$0)))((push((Pair_3026(p_3265.$0))(n_3270)))(er_3264.$1)))
          });
          var $phi$401 = $phi$402;
          return $phi$401
        }
      };
      var $phi$400 = (($gt$gt$eq($import1$instance$Monad$11))((((foldM_3079($import1$instance$Monad$11))(rename_3263))((Pair_3026(er_3254.$0))([])))(i_3255.$2)))(function(ens_3271){
        var $phi$403 = (ret($import1$instance$Monad$11))((Pair_3026(ens_3271.$0))((push(((ImportOpen_3160(i_3255.$0))(i_3255.$1))(ens_3271.$1)))(er_3254.$1)));
        return $phi$403
      })
    } else error("pattern match fail",i_3255);
    var $phi$399 = $phi$400;
    return $phi$399
  }
};
var rewriteModule_3183 = function(ms_3274){
  return function(m_3275){
    var $phi$404 = (($gt$gt$eq($import1$instance$Monad$11))((((foldM_3079($import1$instance$Monad$11))(renameImport_3182))((Pair_3026(empty))([])))(m_3275.$2)))(function(eis_3283){
      var $phi$405 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteBindings_3181(eis_3283.$0))(m_3275.$6)))(function(ebs_3286){
        var $phi$406 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_3080($import1$instance$Monad$11))(rewriteInstance_3180(ebs_3286.$0)))(m_3275.$5)))(function(ins_3289){
          return (ret($import1$instance$Monad$11))(((((((Module_3165(m_3275.$0))(m_3275.$1))(eis_3283.$1))(m_3275.$3))(m_3275.$4))(ins_3289))(ebs_3286.$1))
        });
        return $phi$406
      });
      return $phi$405
    });
    return $phi$404
  }
};
var uniquify_3184 = function(m_3290){
  return (($gt$gt$eq($import1$instance$Monad$11))(getUid_3175))(function(uid_3291){
    return (($gt$gt$eq($import1$instance$Monad$11))(getExports_3177))(function(ex_3292){
      var r_3293 = (runState_3075(uid_3291))((rewriteModule_3183(ex_3292))(m_3290));
      return (($gt$gt_3106($import1$instance$Monad$11))(setUid_3176(fst_3040(r_3293))))((ret($import1$instance$Monad$11))(snd_3030(r_3293)))
    })
  })
};
var assert_3294 = assert_85;
var Pair_3295 = Pair_3;
var mapSnd_3296 = mapSnd_84;
var mapFst_3297 = mapFst_83;
var $gt$eq$gt_3298 = $gt$eq$gt_82;
var snd_3299 = snd_23;
var debug2_3300 = debug2_81;
var Just_3301 = Just_1;
var Nothing_3302 = Nothing_2;
var isJust_3303 = isJust_21;
var Empty_3304 = Empty_7;
var Leaf_3305 = Leaf_8;
var Collision_3306 = Collision_9;
var BitmapIndexed_3307 = BitmapIndexed_10;
var $_3308 = $_12;
var fst_3309 = fst_22;
var Left_3310 = Left_4;
var Right_3311 = Right_5;
var loop_3312 = loop_27;
var find_3313 = find_29;
var hamtMask_3314 = hamtMask_58;
var popCount_3315 = popCount_57;
var hamtIndex_3316 = hamtIndex_59;
var lookup_3317 = lookup_60;
var setContains_3318 = setContains_76;
var foldTrie_3319 = foldTrie_66;
var emptySet_3320 = emptySet_72;
var Unit_3321 = Unit_0;
var not_3322 = not_26;
var $div$eq_3323 = $div$eq_13;
var mapIx_3324 = mapIx_30;
var insert_3325 = insert_61;
var setAdd_3326 = setAdd_73;
var setIntersection_3327 = setIntersection_80;
var remove_3328 = remove_63;
var setDiff_3329 = setDiff_79;
var setToArray_3330 = setToArray_78;
var mergeTrie_3331 = mergeTrie_70;
var setUnion_3332 = setUnion_77;
var setRemove_3333 = setRemove_75;
var setAddAll_3334 = setAddAll_74;
var trieKeys_3335 = trieKeys_71;
var size_3336 = size_68;
var mapTrie_3337 = mapTrie_67;
var nodeMask_3338 = nodeMask_56;
var isEmpty_3339 = isEmpty_69;
var filterTrie_3340 = filterTrie_65;
var nextSetBitMask_3341 = nextSetBitMask_64;
var updateOrSet_3342 = updateOrSet_62;
var State_3343 = State_6;
var runState_3344 = runState_54;
var evalState_3345 = evalState_55;
var sets_3346 = sets_53;
var gets_3347 = gets_52;
var foldM_3348 = foldM_49;
var mapM_3349 = mapM_50;
var forM_3350 = forM_51;
var strToArray_3351 = strToArray_48;
var toRecord_3352 = toRecord_47;
var reverse_3353 = reverse_46;
var tail_3354 = tail_41;
var head_3355 = head_40;
var uniq_3356 = uniq_45;
var mergeSet_3357 = mergeSet_44;
var init_3358 = init_43;
var last_3359 = last_42;
var mapJust_3360 = mapJust_39;
var concatMap_3361 = concatMap_38;
var zip_3362 = zip_37;
var zipWithIndex2_3363 = zipWithIndex2_35;
var zipWithIndex_3364 = zipWithIndex_36;
var join_3365 = join_34;
var all_3366 = all_33;
var exists_3367 = exists_32;
var containsChar_3368 = containsChar_31;
var contains_3369 = contains_28;
var either_3370 = either_24;
var splitEither_3371 = splitEither_25;
var fromJust_3372 = fromJust_20;
var justOr_3373 = justOr_19;
var maybe_3374 = maybe_18;
var $gt$gt_3375 = $gt$gt_17;
var $gt$eq_3376 = $gt$eq_16;
var $lt$eq_3377 = $lt$eq_15;
var $gt_3378 = $gt_14;
var Identity_3379 = Identity_11;
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
var App_3380 = App_731;
var Lam_3381 = Lam_732;
var Case_3382 = Case_733;
var Let_3383 = Let_734;
var New_3384 = New_735;
var breakableDownAndUpM_3385 = breakableDownAndUpM_782;
var breakableDownM_3386 = breakableDownM_786;
var downAndUpM_3387 = downAndUpM_783;
var downM_3388 = downM_785;
var upM_3389 = upM_784;
var breakableDownAndUp_3390 = breakableDownAndUp_777;
var breakableDown_3391 = breakableDown_781;
var downAndUp_3392 = downAndUp_778;
var down_3393 = down_780;
var up_3394 = up_779;
var AnnType_3395 = AnnType_723;
var TUnknown_3396 = TUnknown_755;
var getAnn_3397 = getAnn_760;
var getAnnType_3398 = getAnnType_763;
var Var_3399 = Var_729;
var Const_3400 = Const_730;
var annOf_3401 = annOf_774;
var getType_3402 = getType_776;
var withAnn_3403 = withAnn_775;
var setAnn_3404 = setAnn_761;
var setAnnType_3405 = setAnnType_764;
var setType_3406 = setType_773;
var Data_3407 = Data_743;
var DataCon_3408 = DataCon_744;
var dataConName_3409 = dataConName_771;
var dataConNames_3410 = dataConNames_772;
var TCBound_3411 = TCBound_747;
var TConst_3412 = TConst_748;
var TVar_3413 = TVar_749;
var TSkolem_3414 = TSkolem_750;
var TApp_3415 = TApp_751;
var TRow_3416 = TRow_752;
var TBot_3417 = TBot_753;
var TForall_3418 = TForall_754;
var equivBound_3419 = equivBound_769;
var equivType_3420 = equivType_770;
var getAnnCodeLoc_3421 = getAnnCodeLoc_765;
var AnnCodeLoc_3422 = AnnCodeLoc_724;
var printCodeLoc_3423 = printCodeLoc_767;
var exprLoc_3424 = exprLoc_768;
var setAnnCodeLoc_3425 = setAnnCodeLoc_766;
var copyAnn_3426 = copyAnn_762;
var emptyAnn_3427 = emptyAnn_759;
var ImportAll_3428 = ImportAll_758;
var ImportOpen_3429 = ImportOpen_757;
var ImportClosed_3430 = ImportClosed_756;
var Instance_3431 = Instance_746;
var Class_3432 = Class_745;
var ModuleInterface_3433 = ModuleInterface_742;
var Module_3434 = Module_741;
var PData_3435 = PData_740;
var PConst_3436 = PConst_739;
var PVar_3437 = PVar_738;
var CStr_3438 = CStr_737;
var CNum_3439 = CNum_736;
var AnnExport_3440 = AnnExport_728;
var AnnTag_3441 = AnnTag_727;
var AnnData_3442 = AnnData_726;
var AnnUseCount_3443 = AnnUseCount_725;
var reallyPrintExpr_3444 = reallyPrintExpr_1705;
var renameExpr_3445 = rewriteExpr_3179;
var getUid_3446 = getUid_1493;
var setUid_3447 = setUid_1494;
var mergeCount_3450 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_3485){
      return function(b_3486){
        return ((foldTrie_3319(function(a_3487){
          return function(k_3488){
            return function(v_3489){
              return ((((insert_3325(local$instance$Hashable$1))(local$instance$Eq$0))(k_3488))(v_3489+((justOr_3373(0))((((lookup_3317(local$instance$Hashable$1))(local$instance$Eq$0))(k_3488))(a_3487)))))(a_3487)
            }
          }
        }))(a_3485))(b_3486)
      }
    }
  }
};
var getCount_3449 = function(e_3483){
  var $phi$408 = (((getAnn_3397($import1$instance$Hashable$13))($import1$instance$Eq$1))("useCount"))(annOf_3401(e_3483));
  if(($phi$408.$tag==0)&&($phi$408.$0.$tag==2)){
    var $phi$407 = $phi$408.$0.$0
  } else error("pattern match fail",$phi$408);
  return $phi$407
};
var annWithUseCount_3451 = function(e_3490){
  var dropCount_3491 = function(local$instance$Hashable$1){
    return function(local$instance$Eq$0){
      return function(n_3495){
        return function(c_3496){
          return (((remove_3328(local$instance$Hashable$1))(local$instance$Eq$0))(n_3495))(c_3496)
        }
      }
    }
  };
  var countPat_3493 = function(c_3500){
    return function(p_3501){
      if(p_3501.$tag==0){
        var $phi$409 = (((dropCount_3491($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_3501.$1))(c_3500)
      } else if(p_3501.$tag==2){
        var $phi$409 = ((foldl(countPat_3493))(c_3500))(p_3501.$2)
      } else var $phi$409 = c_3500;
      return $phi$409
    }
  };
  var countCase_3492 = function(pe_3497){
    var $phi$410 = (countPat_3493(getCount_3449(pe_3497.$1)))(pe_3497.$0);
    return $phi$410
  };
  var countExpr_3494 = function(e_3508){
    if(e_3508.$tag==0){
      var $phi$411 = ((((insert_3325($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_3508.$1))(1))(Empty_3304)
    } else if(e_3508.$tag==2){
      var $phi$411 = (((mergeCount_3450($import1$instance$Hashable$13))($import1$instance$Eq$1))(getCount_3449(e_3508.$1)))(getCount_3449(e_3508.$2))
    } else if(e_3508.$tag==3){
      var $phi$411 = (((dropCount_3491($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_3508.$1))(getCount_3449(e_3508.$2))
    } else if(e_3508.$tag==5){
      var $phi$411 = ((foldl(function(c_3520){
        return function(n_3521){
          return (((dropCount_3491($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_3521))(c_3520)
        }
      }))(((foldl(function(c_3522){
        return function(e_3523){
          return (((mergeCount_3450($import1$instance$Hashable$13))($import1$instance$Eq$1))(c_3522))(getCount_3449(e_3523))
        }
      }))(getCount_3449(e_3508.$2)))((map(snd_3299))(e_3508.$1))))((map(fst_3309))(e_3508.$1))
    } else if(e_3508.$tag==4){
      var $phi$411 = ((foldl((mergeCount_3450($import1$instance$Hashable$13))($import1$instance$Eq$1)))(getCount_3449(e_3508.$1)))((map(countCase_3492))(e_3508.$2))
    } else if(e_3508.$tag==1){
      var $phi$411 = Empty_3304
    } else if(e_3508.$tag==6){
      var $phi$411 = ((foldl((mergeCount_3450($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_3304))((map(getCount_3449))(e_3508.$2))
    } else error("pattern match fail",e_3508);
    return $phi$411
  };
  return ((up_3394(function(a_3532){
    return function(e_3533){
      return ($_3308(Pair_3295(a_3532)))((withAnn_3403(((((setAnn_3404($import1$instance$Hashable$13))($import1$instance$Eq$1))("useCount"))(($_3308(AnnUseCount_3443))(countExpr_3494(e_3533))))(annOf_3401(e_3533))))(e_3533))
    }
  }))(Unit_3321))(e_3490)
};
var patSize_3459 = function(p_3601){
  if(p_3601.$tag==0){
    var $phi$412 = 1
  } else if(p_3601.$tag==1){
    var $phi$412 = 1
  } else if(p_3601.$tag==2){
    var $phi$412 = ((foldl(function(c_3609){
      return function(p_3610){
        return c_3609+(patSize_3459(p_3610))
      }
    }))(1))(p_3601.$2)
  } else error("pattern match fail",p_3601);
  return $phi$412
};
var exprSize_3458 = function(e_3573){
  if(e_3573.$tag==0){
    var $phi$413 = 1
  } else if(e_3573.$tag==1){
    var $phi$413 = 1
  } else if(e_3573.$tag==2){
    var $phi$413 = (1+(exprSize_3458(e_3573.$1)))+(exprSize_3458(e_3573.$2))
  } else if(e_3573.$tag==3){
    var $phi$413 = 1+(exprSize_3458(e_3573.$2))
  } else if(e_3573.$tag==4){
    var $phi$413 = 1+(((foldl(function(c_3587){
      return function(p_3588){
        var $phi$414 = (c_3587+(patSize_3459(p_3588.$0)))+(exprSize_3458(p_3588.$1));
        return $phi$414
      }
    }))(exprSize_3458(e_3573.$1)))(e_3573.$2))
  } else if(e_3573.$tag==5){
    var $phi$413 = 1+(((foldl(function(c_3594){
      return function(b_3595){
        return c_3594+(exprSize_3458(snd_3299(b_3595)))
      }
    }))(exprSize_3458(e_3573.$2)))(e_3573.$1))
  } else if(e_3573.$tag==6){
    var $phi$413 = ((foldl(function(c_3599){
      return function(e_3600){
        return c_3599+(exprSize_3458(e_3600))
      }
    }))(1))(e_3573.$2)
  } else error("pattern match fail",e_3573);
  return $phi$413
};
var chooseForInlining_3460 = function(baseCount_3611){
  return function(bs_3612){
    var useCount_3613 = ((foldl((mergeCount_3450($import1$instance$Hashable$13))($import1$instance$Eq$1)))(baseCount_3611))((map(function(b_3615){
      return getCount_3449(snd_3299(b_3615))
    }))(bs_3612));
    var f_3614 = function(r_3616){
      return function(b_3617){
        if(b_3617.$1.$tag==0){
          var $phi$416 = ((((insert_3325($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3617.$0))(b_3617.$1))(r_3616)
        } else if(b_3617.$1.$tag==1){
          var $phi$416 = ((((insert_3325($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3617.$0))(b_3617.$1))(r_3616)
        } else if(b_3617.$1.$tag==3){
          var $phi$420 = ($or((($lt($import1$instance$Ord$2))(exprSize_3458(b_3617.$1)))(10)))((($eq$eq($import1$instance$Eq$0))(1))((justOr_3373(0))((((lookup_3317($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3617.$0))(useCount_3613))));
          if(!$phi$420){
            var $phi$419 = r_3616
          } else if($phi$420){
            var $phi$419 = ((((insert_3325($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3617.$0))(b_3617.$1))(r_3616)
          } else error("pattern match fail",$phi$420);
          var $phi$416 = $phi$419
        } else if(b_3617.$1.$tag==6){
          var $phi$418 = (($eq$eq($import1$instance$Eq$0))(1))((justOr_3373(0))((((lookup_3317($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3617.$0))(useCount_3613)));
          if(!$phi$418){
            var $phi$417 = r_3616
          } else if($phi$418){
            var $phi$417 = ((((insert_3325($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3617.$0))(b_3617.$1))(r_3616)
          } else error("pattern match fail",$phi$418);
          var $phi$416 = $phi$417
        } else var $phi$416 = r_3616;
        var $phi$415 = $phi$416;
        return $phi$415
      }
    };
    return ((foldl(f_3614))(Empty_3304))(bs_3612)
  }
};
var mapBindingsM_3453 = function(local$instance$Monad$0){
  return function(f_3539){
    return function(bs_3540){
      return ((mapM_3349(local$instance$Monad$0))(function(b_3541){
        var $phi$421 = (($gt$gt$eq(local$instance$Monad$0))((f_3539(b_3541.$0))(b_3541.$1)))(function(e_3544){
          return (ret(local$instance$Monad$0))((Pair_3295(b_3541.$0))(e_3544))
        });
        return $phi$421
      }))(bs_3540)
    }
  }
};
var inlineCode_3462 = function(always_3645){
  return function(e_3646){
    var withAnnCopy_3647 = function(ann_3650){
      return function(e_3651){
        return (withAnn_3403((((mergeTrie_3331($import1$instance$Hashable$13))($import1$instance$Eq$1))((((remove_3328($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_3401(e_3651))))((((copyAnn_3426($import1$instance$Hashable$13))($import1$instance$Eq$1))(["export"]))(ann_3650))))(e_3651)
      }
    };
    var inlinePat_3649 = function(p_3673){
      if(p_3673.$tag==2){
        var $phi$424 = (((lookup_3317($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_3673.$1))(always_3645);
        if(($phi$424.$tag==0)&&($phi$424.$0.$tag==0)){
          var $phi$423 = ((PData_3435(p_3673.$0))($phi$424.$0.$1))((map(inlinePat_3649))(p_3673.$2))
        } else var $phi$423 = ((PData_3435(p_3673.$0))(p_3673.$1))((map(inlinePat_3649))(p_3673.$2));
        var $phi$422 = $phi$423
      } else var $phi$422 = p_3673;
      return $phi$422
    };
    var inlineExpr_3648 = function(e_3652){
      if(e_3652.$tag==0){
        var $phi$430 = (((lookup_3317($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_3652.$1))(always_3645);
        if($phi$430.$tag==1){
          var $phi$429 = (ret($import1$instance$Monad$11))(Left_3310(e_3652))
        } else if($phi$430.$tag==0){
          var $phi$429 = ((fmap($import1$instance$Functor$9))(function(e_3656){
            return Left_3310((withAnnCopy_3647(e_3652.$0))(e_3656))
          }))((renameExpr_3445(empty))($phi$430.$0))
        } else error("pattern match fail",$phi$430);
        var $phi$425 = $phi$429
      } else if(e_3652.$tag==5){
        var always2_3660 = (((mergeTrie_3331($import1$instance$Hashable$13))($import1$instance$Eq$1))(always_3645))((chooseForInlining_3460(getCount_3449(e_3652.$2)))(e_3652.$1));
        var $phi$425 = (($gt$gt$eq($import1$instance$Monad$11))(((mapBindingsM_3453($import1$instance$Monad$11))(function(n_3661){
          return function(e_3662){
            return (inlineCode_3462((((remove_3328($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_3661))(always2_3660)))(e_3662)
          }
        }))(e_3652.$1)))(function(bs_3663){
          return (($gt$gt$eq($import1$instance$Monad$11))((inlineCode_3462(always2_3660))(e_3652.$2)))(function(e_3664){
            var $phi$428 = length(bs_3663);
            if(0==$phi$428){
              var $phi$427 = (ret($import1$instance$Monad$11))(Right_3311((withAnnCopy_3647(e_3652.$0))(e_3664)))
            } else var $phi$427 = (ret($import1$instance$Monad$11))(Right_3311(((Let_3383(e_3652.$0))(bs_3663))(e_3664)));
            return $phi$427
          })
        })
      } else if(e_3652.$tag==4){
        var $phi$425 = (ret($import1$instance$Monad$11))(Left_3310(((Case_3382(e_3652.$0))(e_3652.$1))((map(function(p_3669){
          var $phi$426 = (Pair_3295(inlinePat_3649(p_3669.$0)))(p_3669.$1);
          return $phi$426
        }))(e_3652.$2))))
      } else var $phi$425 = (ret($import1$instance$Monad$11))(Left_3310(e_3652));
      return $phi$425
    };
    return ((breakableDownM_3386($import1$instance$Monad$11))(inlineExpr_3648))(e_3646)
  }
};
var dropDeadBindings_3463 = function(useCount_3681){
  return function(bs_3682){
    var isExport_3683 = function(e_3685){
      return isJust_3303((((getAnn_3397($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_3401(e_3685)))
    };
    var f_3684 = function(b_3686){
      var totalCount_3689 = (justOr_3373(0))((((lookup_3317($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3686.$0))(useCount_3681));
      var recursiveCount_3690 = (justOr_3373(0))((((lookup_3317($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3686.$0))(getCount_3449(b_3686.$1)));
      var keep_3691 = ($or(isExport_3683(b_3686.$1)))((($gt_3378($import1$instance$Ord$2))(totalCount_3689-recursiveCount_3690))(0));
      if(keep_3691){
        var $phi$432 = Just_3301((Pair_3295(b_3686.$0))(b_3686.$1))
      } else if(!keep_3691){
        var ann_3692 = annOf_3401(b_3686.$1);
        var $phi$434 = (((getAnn_3397($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(ann_3692);
        if($phi$434.$tag==1){
          var $phi$433 = Nothing_3302
        } else if($phi$434.$tag==0){
          var $phi$433 = Just_3301((Pair_3295(b_3686.$0))((withAnn_3403(((((setAnn_3404($import1$instance$Hashable$13))($import1$instance$Eq$1))("dead"))(AnnTag_3441))(ann_3692)))(b_3686.$1)))
        } else error("pattern match fail",$phi$434);
        var $phi$432 = $phi$433
      } else error("pattern match fail",keep_3691);
      var $phi$431 = $phi$432;
      return $phi$431
    };
    return (mapJust_3360(f_3684))(bs_3682)
  }
};
var deadCode_3457 = function(e_3561){
  var f_3562 = function(e_3563){
    if(e_3563.$tag==5){
      var useCount_3567 = ((foldl((mergeCount_3450($import1$instance$Hashable$13))($import1$instance$Eq$1)))(getCount_3449(e_3563.$2)))((map(function(b_3569){
        return getCount_3449(snd_3299(b_3569))
      }))(e_3563.$1));
      var bs2_3568 = (dropDeadBindings_3463(useCount_3567))(e_3563.$1);
      var $phi$435 = ((Let_3383(e_3563.$0))(bs2_3568))(e_3563.$2)
    } else var $phi$435 = e_3563;
    return $phi$435
  };
  return snd_3299(((down_3393(function(a_3571){
    return function(e_3572){
      return (Pair_3295(a_3571))(f_3562(e_3572))
    }
  }))(Unit_3321))(e_3561))
};
var betaReduction_3461 = function(e_3631){
  var f_3632 = function(e_3633){
    if((e_3633.$tag==2)&&(e_3633.$1.$tag==3)){
      if(e_3633.$2.$tag==0){
        var $phi$439 = (($eq$eq($import1$instance$Eq$1))(e_3633.$1.$1))(e_3633.$2.$1);
        if($phi$439){
          var $phi$438 = e_3633.$1.$2
        } else if(!$phi$439){
          var $phi$438 = ((Let_3383(e_3633.$0))([(Pair_3295(e_3633.$1.$1))((Var_3399(e_3633.$2.$0))(e_3633.$2.$1))]))(e_3633.$1.$2)
        } else error("pattern match fail",$phi$439);
        var $phi$437 = $phi$438
      } else var $phi$437 = ((Let_3383(e_3633.$0))([(Pair_3295(e_3633.$1.$1))(e_3633.$2)]))(e_3633.$1.$2);
      var $phi$436 = $phi$437
    } else var $phi$436 = e_3633;
    return $phi$436
  };
  return snd_3299(((down_3393(function(a_3643){
    return function(e_3644){
      return (Pair_3295(a_3643))(f_3632(e_3644))
    }
  }))(Unit_3321))(e_3631))
};
var mapBindings_3452 = function(f_3534){
  return function(bs_3535){
    return (map(function(b_3536){
      var $phi$440 = (Pair_3295(b_3536.$0))(f_3534(b_3536.$1));
      return $phi$440
    }))(bs_3535)
  }
};
var pass_3455 = function(bs_3549){
  var bs2_3550 = (mapBindings_3452(function(e_3554){
    return ($_3308(snd_3299))(annWithUseCount_3451(e_3554))
  }))(bs_3549);
  var useCount_3551 = ((foldl((mergeCount_3450($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_3304))((map(function(b_3555){
    return getCount_3449(snd_3299(b_3555))
  }))(bs2_3550));
  var bs3_3552 = (mapBindings_3452(deadCode_3457))((dropDeadBindings_3463(useCount_3551))(bs2_3550));
  var always_3553 = (chooseForInlining_3460(Empty_3304))(bs3_3552);
  return (($gt$gt$eq($import1$instance$Monad$11))(((mapBindingsM_3453($import1$instance$Monad$11))(function(n_3556){
    return function(e_3557){
      return (inlineCode_3462((((remove_3328($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_3556))(always_3553)))(e_3557)
    }
  }))(bs3_3552)))(function(bs_3558){
    return (ret($import1$instance$Monad$11))((mapBindings_3452(betaReduction_3461))(bs_3558))
  })
};
var processImports_3456 = function(useCount_3559){
  return function(is_3560){
    return is_3560
  }
};
var loopPasses_3454 = function(local$instance$Monad$0){
  return function(n_3545){
    return function(p_3546){
      return function(bs_3547){
        if(0==n_3545){
          var $phi$441 = (ret(local$instance$Monad$0))(bs_3547)
        } else var $phi$441 = (($gt$gt$eq(local$instance$Monad$0))(p_3546(bs_3547)))(((loopPasses_3454(local$instance$Monad$0))(n_3545-1))(p_3546));
        return $phi$441
      }
    }
  }
};
var inline_3448 = function(enable_3464){
  return function(m_3465){
    return (($gt$gt$eq($import1$instance$Monad$11))(getUid_3446))(function(uid_3466){
      if(enable_3464){
        var $phi$443 = 10
      } else if(!enable_3464){
        var $phi$443 = 0
      } else error("pattern match fail",enable_3464);
      var iterCount_3474 = $phi$443;
      var r_3475 = (runState_3344(uid_3466))((((loopPasses_3454($import1$instance$Monad$11))(iterCount_3474))(pass_3455))(m_3465.$6));
      var bs2_3476 = snd_3299(r_3475);
      var bs3_3478 = (mapBindings_3452(function(e_3481){
        return ($_3308(snd_3299))(annWithUseCount_3451(e_3481))
      }))(bs2_3476);
      var useCount_3479 = ((foldl((mergeCount_3450($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_3304))((map(function(b_3482){
        return getCount_3449(snd_3299(b_3482))
      }))(bs3_3478));
      var is2_3480 = (processImports_3456(useCount_3479))(m_3465.$2);
      var uid2_3477 = fst_3309(r_3475);
      var $phi$442 = (($gt$gt_3375($import1$instance$Monad$11))(setUid_3447(uid2_3477)))((ret($import1$instance$Monad$11))(((((((Module_3434(m_3465.$0))(m_3465.$1))(is2_3480))(m_3465.$3))(m_3465.$4))(m_3465.$5))(bs3_3478)));
      return $phi$442
    })
  }
};
var assert_3694 = assert_85;
var Pair_3695 = Pair_3;
var mapSnd_3696 = mapSnd_84;
var mapFst_3697 = mapFst_83;
var $gt$eq$gt_3698 = $gt$eq$gt_82;
var snd_3699 = snd_23;
var debug2_3700 = debug2_81;
var Just_3701 = Just_1;
var Nothing_3702 = Nothing_2;
var isJust_3703 = isJust_21;
var Empty_3704 = Empty_7;
var Leaf_3705 = Leaf_8;
var Collision_3706 = Collision_9;
var BitmapIndexed_3707 = BitmapIndexed_10;
var $_3708 = $_12;
var fst_3709 = fst_22;
var Left_3710 = Left_4;
var Right_3711 = Right_5;
var loop_3712 = loop_27;
var find_3713 = find_29;
var hamtMask_3714 = hamtMask_58;
var popCount_3715 = popCount_57;
var hamtIndex_3716 = hamtIndex_59;
var lookup_3717 = lookup_60;
var setContains_3718 = setContains_76;
var foldTrie_3719 = foldTrie_66;
var emptySet_3720 = emptySet_72;
var Unit_3721 = Unit_0;
var not_3722 = not_26;
var $div$eq_3723 = $div$eq_13;
var mapIx_3724 = mapIx_30;
var insert_3725 = insert_61;
var setAdd_3726 = setAdd_73;
var setIntersection_3727 = setIntersection_80;
var remove_3728 = remove_63;
var setDiff_3729 = setDiff_79;
var setToArray_3730 = setToArray_78;
var mergeTrie_3731 = mergeTrie_70;
var setUnion_3732 = setUnion_77;
var setRemove_3733 = setRemove_75;
var setAddAll_3734 = setAddAll_74;
var trieKeys_3735 = trieKeys_71;
var size_3736 = size_68;
var mapTrie_3737 = mapTrie_67;
var nodeMask_3738 = nodeMask_56;
var isEmpty_3739 = isEmpty_69;
var filterTrie_3740 = filterTrie_65;
var nextSetBitMask_3741 = nextSetBitMask_64;
var updateOrSet_3742 = updateOrSet_62;
var State_3743 = State_6;
var runState_3744 = runState_54;
var evalState_3745 = evalState_55;
var sets_3746 = sets_53;
var gets_3747 = gets_52;
var foldM_3748 = foldM_49;
var mapM_3749 = mapM_50;
var forM_3750 = forM_51;
var strToArray_3751 = strToArray_48;
var toRecord_3752 = toRecord_47;
var reverse_3753 = reverse_46;
var tail_3754 = tail_41;
var head_3755 = head_40;
var uniq_3756 = uniq_45;
var mergeSet_3757 = mergeSet_44;
var init_3758 = init_43;
var last_3759 = last_42;
var mapJust_3760 = mapJust_39;
var concatMap_3761 = concatMap_38;
var zip_3762 = zip_37;
var zipWithIndex2_3763 = zipWithIndex2_35;
var zipWithIndex_3764 = zipWithIndex_36;
var join_3765 = join_34;
var all_3766 = all_33;
var exists_3767 = exists_32;
var containsChar_3768 = containsChar_31;
var contains_3769 = contains_28;
var either_3770 = either_24;
var splitEither_3771 = splitEither_25;
var fromJust_3772 = fromJust_20;
var justOr_3773 = justOr_19;
var maybe_3774 = maybe_18;
var $gt$gt_3775 = $gt$gt_17;
var $gt$eq_3776 = $gt$eq_16;
var $lt$eq_3777 = $lt$eq_15;
var $gt_3778 = $gt_14;
var Identity_3779 = Identity_11;
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
var App_3780 = App_731;
var Lam_3781 = Lam_732;
var Case_3782 = Case_733;
var Let_3783 = Let_734;
var New_3784 = New_735;
var breakableDownAndUpM_3785 = breakableDownAndUpM_782;
var breakableDownM_3786 = breakableDownM_786;
var downAndUpM_3787 = downAndUpM_783;
var downM_3788 = downM_785;
var upM_3789 = upM_784;
var breakableDownAndUp_3790 = breakableDownAndUp_777;
var breakableDown_3791 = breakableDown_781;
var downAndUp_3792 = downAndUp_778;
var down_3793 = down_780;
var up_3794 = up_779;
var AnnType_3795 = AnnType_723;
var TUnknown_3796 = TUnknown_755;
var getAnn_3797 = getAnn_760;
var getAnnType_3798 = getAnnType_763;
var Var_3799 = Var_729;
var Const_3800 = Const_730;
var annOf_3801 = annOf_774;
var getType_3802 = getType_776;
var withAnn_3803 = withAnn_775;
var setAnn_3804 = setAnn_761;
var setAnnType_3805 = setAnnType_764;
var setType_3806 = setType_773;
var Data_3807 = Data_743;
var DataCon_3808 = DataCon_744;
var dataConName_3809 = dataConName_771;
var dataConNames_3810 = dataConNames_772;
var TCBound_3811 = TCBound_747;
var TConst_3812 = TConst_748;
var TVar_3813 = TVar_749;
var TSkolem_3814 = TSkolem_750;
var TApp_3815 = TApp_751;
var TRow_3816 = TRow_752;
var TBot_3817 = TBot_753;
var TForall_3818 = TForall_754;
var equivBound_3819 = equivBound_769;
var equivType_3820 = equivType_770;
var getAnnCodeLoc_3821 = getAnnCodeLoc_765;
var AnnCodeLoc_3822 = AnnCodeLoc_724;
var printCodeLoc_3823 = printCodeLoc_767;
var exprLoc_3824 = exprLoc_768;
var setAnnCodeLoc_3825 = setAnnCodeLoc_766;
var copyAnn_3826 = copyAnn_762;
var emptyAnn_3827 = emptyAnn_759;
var ImportAll_3828 = ImportAll_758;
var ImportOpen_3829 = ImportOpen_757;
var ImportClosed_3830 = ImportClosed_756;
var Instance_3831 = Instance_746;
var Class_3832 = Class_745;
var ModuleInterface_3833 = ModuleInterface_742;
var Module_3834 = Module_741;
var PData_3835 = PData_740;
var PConst_3836 = PConst_739;
var PVar_3837 = PVar_738;
var CStr_3838 = CStr_737;
var CNum_3839 = CNum_736;
var AnnExport_3840 = AnnExport_728;
var AnnTag_3841 = AnnTag_727;
var AnnData_3842 = AnnData_726;
var AnnUseCount_3843 = AnnUseCount_725;
var newIdent_3844 = newIdent_3178;
var rewriteExpr_3845 = rewriteExpr_3179;
var importAsBindings_3849 = function(ens_3882){
  return function(dataAnns_3883){
    return function(i_3884){
      if((i_3884.$tag==1)&&("./builtins.js"==i_3884.$1)){
        var $phi$444 = []
      } else if(i_3884.$tag==1){
        var f_3890 = function(p_3891){
          var $phi$447 = (((lookup_3717($import1$instance$Hashable$13))($import1$instance$Eq$1))(($concat(($concat(i_3884.$1))("#")))(p_3891.$0)))(ens_3882);
          if($phi$447.$tag==0){
            var $phi$446 = (Pair_3695(p_3891.$1))((Var_3799(($_3708(justOr_3773(emptyAnn_3827)))((((lookup_3717($import1$instance$Hashable$13))($import1$instance$Eq$1))($phi$447.$0))(dataAnns_3883))))($phi$447.$0))
          } else if($phi$447.$tag==1){
            var $phi$446 = error(($concat(($concat(($concat("mod merger encountered unknown import "))(i_3884.$1)))("#")))(p_3891.$0))
          } else error("pattern match fail",$phi$447);
          var $phi$445 = $phi$446;
          return $phi$445
        };
        var $phi$444 = (map(f_3890))((filter(function(p_3895){
          return (($div$eq_3723($import1$instance$Eq$1))(fst_3709(p_3895)))(snd_3699(p_3895))
        }))(i_3884.$2))
      } else error("pattern match fail",i_3884);
      return $phi$444
    }
  }
};
var dropExport_3847 = function(f_3851){
  return function(b_3852){
    var $phi$450 = (((getAnn_3797($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_3801(b_3852.$1));
    if($phi$450.$tag==1){
      var $phi$449 = (ret($import1$instance$Monad$11))(b_3852)
    } else if(($phi$450.$tag==0)&&($phi$450.$0.$tag==5)){
      var $phi$449 = (($gt$gt$eq($import1$instance$Monad$11))(gets_3747))(function(ns_3856){
        return (($gt$gt_3775($import1$instance$Monad$11))(sets_3746(((((insert_3725($import1$instance$Hashable$13))($import1$instance$Eq$1))(($concat(($concat(f_3851))("#")))($phi$450.$0.$0)))(b_3852.$0))(ns_3856))))((ret($import1$instance$Monad$11))((Pair_3695(b_3852.$0))((withAnn_3803((((remove_3728($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_3801(b_3852.$1))))(b_3852.$1))))
      })
    } else error("pattern match fail",$phi$450);
    var $phi$448 = $phi$449;
    return $phi$448
  }
};
var mergeInto_3848 = function(a_3857){
  return function(b_3858){
    var $phi$451 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_3749($import1$instance$Monad$11))(dropExport_3847(a_3857.$1)))(a_3857.$6)))(function(bs_3866){
      return (($gt$gt$eq($import1$instance$Monad$11))(gets_3747))(function(ns_3867){
        var f_3869 = function(local$instance$Hashable$1){
          return function(local$instance$Eq$0){
            return function(r_3870){
              return function(b_3871){
                var $phi$454 = (((getAnn_3797($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(annOf_3801(b_3871.$1));
                if($phi$454.$tag==1){
                  var $phi$453 = r_3870
                } else if($phi$454.$tag==0){
                  var $phi$453 = ((((insert_3725(local$instance$Hashable$1))(local$instance$Eq$0))(b_3871.$0))(((((setAnn_3804($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))($phi$454.$0))(emptyAnn_3827)))(r_3870)
                } else error("pattern match fail",$phi$454);
                var $phi$452 = $phi$453;
                return $phi$452
              }
            }
          }
        };
        var dataAnns_3868 = ((foldl((f_3869($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_3704))(bs_3866);
        var $phi$455 = (ret($import1$instance$Monad$11))(((((((Module_3834(a_3857.$0))(b_3858.$1))(a_3857.$2))([]))([]))([]))((concat(bs_3866))((concat((concatMap_3761((importAsBindings_3849(ns_3867))(dataAnns_3868)))(b_3858.$2)))(b_3858.$6))));
        return $phi$455
      })
    });
    return $phi$451
  }
};
var mergeModules_3846 = function(ms_3850){
  return (evalState_3745(Empty_3704))((((foldM_3748($import1$instance$Monad$11))(mergeInto_3848))(head_3755(ms_3850)))(tail_3754(ms_3850)))
};
var assert_3896 = assert_85;
var Pair_3897 = Pair_3;
var mapSnd_3898 = mapSnd_84;
var mapFst_3899 = mapFst_83;
var $gt$eq$gt_3900 = $gt$eq$gt_82;
var snd_3901 = snd_23;
var debug2_3902 = debug2_81;
var Just_3903 = Just_1;
var Nothing_3904 = Nothing_2;
var isJust_3905 = isJust_21;
var Empty_3906 = Empty_7;
var Leaf_3907 = Leaf_8;
var Collision_3908 = Collision_9;
var BitmapIndexed_3909 = BitmapIndexed_10;
var $_3910 = $_12;
var fst_3911 = fst_22;
var Left_3912 = Left_4;
var Right_3913 = Right_5;
var loop_3914 = loop_27;
var find_3915 = find_29;
var hamtMask_3916 = hamtMask_58;
var popCount_3917 = popCount_57;
var hamtIndex_3918 = hamtIndex_59;
var lookup_3919 = lookup_60;
var setContains_3920 = setContains_76;
var foldTrie_3921 = foldTrie_66;
var emptySet_3922 = emptySet_72;
var Unit_3923 = Unit_0;
var not_3924 = not_26;
var $div$eq_3925 = $div$eq_13;
var mapIx_3926 = mapIx_30;
var insert_3927 = insert_61;
var setAdd_3928 = setAdd_73;
var setIntersection_3929 = setIntersection_80;
var remove_3930 = remove_63;
var setDiff_3931 = setDiff_79;
var setToArray_3932 = setToArray_78;
var mergeTrie_3933 = mergeTrie_70;
var setUnion_3934 = setUnion_77;
var setRemove_3935 = setRemove_75;
var setAddAll_3936 = setAddAll_74;
var trieKeys_3937 = trieKeys_71;
var size_3938 = size_68;
var mapTrie_3939 = mapTrie_67;
var nodeMask_3940 = nodeMask_56;
var isEmpty_3941 = isEmpty_69;
var filterTrie_3942 = filterTrie_65;
var nextSetBitMask_3943 = nextSetBitMask_64;
var updateOrSet_3944 = updateOrSet_62;
var State_3945 = State_6;
var runState_3946 = runState_54;
var evalState_3947 = evalState_55;
var sets_3948 = sets_53;
var gets_3949 = gets_52;
var foldM_3950 = foldM_49;
var mapM_3951 = mapM_50;
var forM_3952 = forM_51;
var strToArray_3953 = strToArray_48;
var toRecord_3954 = toRecord_47;
var reverse_3955 = reverse_46;
var tail_3956 = tail_41;
var head_3957 = head_40;
var uniq_3958 = uniq_45;
var mergeSet_3959 = mergeSet_44;
var init_3960 = init_43;
var last_3961 = last_42;
var mapJust_3962 = mapJust_39;
var concatMap_3963 = concatMap_38;
var zip_3964 = zip_37;
var zipWithIndex2_3965 = zipWithIndex2_35;
var zipWithIndex_3966 = zipWithIndex_36;
var join_3967 = join_34;
var all_3968 = all_33;
var exists_3969 = exists_32;
var containsChar_3970 = containsChar_31;
var contains_3971 = contains_28;
var either_3972 = either_24;
var splitEither_3973 = splitEither_25;
var fromJust_3974 = fromJust_20;
var justOr_3975 = justOr_19;
var maybe_3976 = maybe_18;
var $gt$gt_3977 = $gt$gt_17;
var $gt$eq_3978 = $gt$eq_16;
var $lt$eq_3979 = $lt$eq_15;
var $gt_3980 = $gt_14;
var Identity_3981 = Identity_11;
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
var App_3982 = App_731;
var Lam_3983 = Lam_732;
var Case_3984 = Case_733;
var Let_3985 = Let_734;
var New_3986 = New_735;
var breakableDownAndUpM_3987 = breakableDownAndUpM_782;
var breakableDownM_3988 = breakableDownM_786;
var downAndUpM_3989 = downAndUpM_783;
var downM_3990 = downM_785;
var upM_3991 = upM_784;
var breakableDownAndUp_3992 = breakableDownAndUp_777;
var breakableDown_3993 = breakableDown_781;
var downAndUp_3994 = downAndUp_778;
var down_3995 = down_780;
var up_3996 = up_779;
var AnnType_3997 = AnnType_723;
var TUnknown_3998 = TUnknown_755;
var getAnn_3999 = getAnn_760;
var getAnnType_4000 = getAnnType_763;
var Var_4001 = Var_729;
var Const_4002 = Const_730;
var annOf_4003 = annOf_774;
var getType_4004 = getType_776;
var withAnn_4005 = withAnn_775;
var setAnn_4006 = setAnn_761;
var setAnnType_4007 = setAnnType_764;
var setType_4008 = setType_773;
var Data_4009 = Data_743;
var DataCon_4010 = DataCon_744;
var dataConName_4011 = dataConName_771;
var dataConNames_4012 = dataConNames_772;
var TCBound_4013 = TCBound_747;
var TConst_4014 = TConst_748;
var TVar_4015 = TVar_749;
var TSkolem_4016 = TSkolem_750;
var TApp_4017 = TApp_751;
var TRow_4018 = TRow_752;
var TBot_4019 = TBot_753;
var TForall_4020 = TForall_754;
var equivBound_4021 = equivBound_769;
var equivType_4022 = equivType_770;
var getAnnCodeLoc_4023 = getAnnCodeLoc_765;
var AnnCodeLoc_4024 = AnnCodeLoc_724;
var printCodeLoc_4025 = printCodeLoc_767;
var exprLoc_4026 = exprLoc_768;
var setAnnCodeLoc_4027 = setAnnCodeLoc_766;
var copyAnn_4028 = copyAnn_762;
var emptyAnn_4029 = emptyAnn_759;
var ImportAll_4030 = ImportAll_758;
var ImportOpen_4031 = ImportOpen_757;
var ImportClosed_4032 = ImportClosed_756;
var Instance_4033 = Instance_746;
var Class_4034 = Class_745;
var ModuleInterface_4035 = ModuleInterface_742;
var Module_4036 = Module_741;
var PData_4037 = PData_740;
var PConst_4038 = PConst_739;
var PVar_4039 = PVar_738;
var CStr_4040 = CStr_737;
var CNum_4041 = CNum_736;
var AnnExport_4042 = AnnExport_728;
var AnnTag_4043 = AnnTag_727;
var AnnData_4044 = AnnData_726;
var AnnUseCount_4045 = AnnUseCount_725;
var freeVars_4046 = freeVars_2038;
var normalize_4048 = function(ms_4077){
  return function(freeVars_4078){
    return function(i_4079){
      if(i_4079.$tag==0){
        var $phi$456 = error("closed imports not supported")
      } else if(i_4079.$tag==1){
        var $phi$456 = i_4079
      } else if((i_4079.$tag==2)&&("./builtins.js"==i_4079.$1)){
        var $phi$462 = (get("./builtins.js"))(ms_4077);
        var $phi$461 = ((ImportOpen_4031(i_4079.$0))("./builtins.js"))((map(function(n_4090){
          return (Pair_3897(n_4090))(n_4090)
        }))(keys($phi$462.$0)));
        var $phi$456 = $phi$461
      } else if(i_4079.$tag==2){
        var $phi$458 = (has(i_4079.$1))(ms_4077);
        if($phi$458){
          var $phi$460 = (get(i_4079.$1))(ms_4077);
          var $phi$459 = ((ImportOpen_4031(i_4079.$0))(i_4079.$1))((map(function(n_4096){
            return (Pair_3897(n_4096))(n_4096)
          }))(keys($phi$460.$0)));
          var $phi$457 = $phi$459
        } else if(!$phi$458){
          var $phi$457 = error(($concat(($concat(($concat("no mod "))(i_4079.$1)))(" in ")))(jsonStringify(keys(ms_4077))))
        } else error("pattern match fail",$phi$458);
        var $phi$456 = $phi$457
      } else error("pattern match fail",i_4079);
      return $phi$456
    }
  }
};
var normalizeImports_4047 = function(ms_4049){
  return function(m_4050){
    var getFromDefs_4058 = function(ds_4064){
      return ((foldl((mergeSet_3959($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(function(v_4065){
        return freeVars_4046(snd_3901(v_4065))
      }))(ds_4064))
    };
    var freeVarsInDefs_4059 = getFromDefs_4058(m_4050.$6);
    var freeVarsInIns_4060 = ((foldl((mergeSet_3959($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(function(i_4066){
      var $phi$464 = getFromDefs_4058(i_4066.$3);
      return $phi$464
    }))(m_4050.$5));
    var topLevelNames_4061 = (concat((map(fst_3911))(m_4050.$6)))((concatMap_3963(function(i_4071){
      var $phi$465 = (map(fst_3911))(i_4071.$3);
      return $phi$465
    }))(m_4050.$5));
    var fvs_4062 = (filter(function(v_4076){
      return not_3924(((contains_3971($import1$instance$Eq$1))(v_4076))(topLevelNames_4061))
    }))((((mergeSet_3959($import1$instance$Ord$3))($import1$instance$Eq$1))(freeVarsInDefs_4059))(freeVarsInIns_4060));
    var is2_4063 = (map((normalize_4048(ms_4049))(fvs_4062)))((enqueue((ImportAll_4030(emptyAnn_4029))("./builtins.js")))(m_4050.$2));
    var $phi$463 = ((((((Module_4036(m_4050.$0))(m_4050.$1))(is2_4063))(m_4050.$3))(m_4050.$4))(m_4050.$5))(m_4050.$6);
    return $phi$463
  }
};
var assert_4097 = assert_85;
var Pair_4098 = Pair_3;
var mapSnd_4099 = mapSnd_84;
var mapFst_4100 = mapFst_83;
var $gt$eq$gt_4101 = $gt$eq$gt_82;
var snd_4102 = snd_23;
var debug2_4103 = debug2_81;
var Just_4104 = Just_1;
var Nothing_4105 = Nothing_2;
var isJust_4106 = isJust_21;
var Empty_4107 = Empty_7;
var Leaf_4108 = Leaf_8;
var Collision_4109 = Collision_9;
var BitmapIndexed_4110 = BitmapIndexed_10;
var $_4111 = $_12;
var fst_4112 = fst_22;
var Left_4113 = Left_4;
var Right_4114 = Right_5;
var loop_4115 = loop_27;
var find_4116 = find_29;
var hamtMask_4117 = hamtMask_58;
var popCount_4118 = popCount_57;
var hamtIndex_4119 = hamtIndex_59;
var lookup_4120 = lookup_60;
var setContains_4121 = setContains_76;
var foldTrie_4122 = foldTrie_66;
var emptySet_4123 = emptySet_72;
var Unit_4124 = Unit_0;
var not_4125 = not_26;
var $div$eq_4126 = $div$eq_13;
var mapIx_4127 = mapIx_30;
var insert_4128 = insert_61;
var setAdd_4129 = setAdd_73;
var setIntersection_4130 = setIntersection_80;
var remove_4131 = remove_63;
var setDiff_4132 = setDiff_79;
var setToArray_4133 = setToArray_78;
var mergeTrie_4134 = mergeTrie_70;
var setUnion_4135 = setUnion_77;
var setRemove_4136 = setRemove_75;
var setAddAll_4137 = setAddAll_74;
var trieKeys_4138 = trieKeys_71;
var size_4139 = size_68;
var mapTrie_4140 = mapTrie_67;
var nodeMask_4141 = nodeMask_56;
var isEmpty_4142 = isEmpty_69;
var filterTrie_4143 = filterTrie_65;
var nextSetBitMask_4144 = nextSetBitMask_64;
var updateOrSet_4145 = updateOrSet_62;
var State_4146 = State_6;
var runState_4147 = runState_54;
var evalState_4148 = evalState_55;
var sets_4149 = sets_53;
var gets_4150 = gets_52;
var foldM_4151 = foldM_49;
var mapM_4152 = mapM_50;
var forM_4153 = forM_51;
var strToArray_4154 = strToArray_48;
var toRecord_4155 = toRecord_47;
var reverse_4156 = reverse_46;
var tail_4157 = tail_41;
var head_4158 = head_40;
var uniq_4159 = uniq_45;
var mergeSet_4160 = mergeSet_44;
var init_4161 = init_43;
var last_4162 = last_42;
var mapJust_4163 = mapJust_39;
var concatMap_4164 = concatMap_38;
var zip_4165 = zip_37;
var zipWithIndex2_4166 = zipWithIndex2_35;
var zipWithIndex_4167 = zipWithIndex_36;
var join_4168 = join_34;
var all_4169 = all_33;
var exists_4170 = exists_32;
var containsChar_4171 = containsChar_31;
var contains_4172 = contains_28;
var either_4173 = either_24;
var splitEither_4174 = splitEither_25;
var fromJust_4175 = fromJust_20;
var justOr_4176 = justOr_19;
var maybe_4177 = maybe_18;
var $gt$gt_4178 = $gt$gt_17;
var $gt$eq_4179 = $gt$eq_16;
var $lt$eq_4180 = $lt$eq_15;
var $gt_4181 = $gt_14;
var Identity_4182 = Identity_11;
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
var App_4183 = App_731;
var Lam_4184 = Lam_732;
var Case_4185 = Case_733;
var Let_4186 = Let_734;
var New_4187 = New_735;
var breakableDownAndUpM_4188 = breakableDownAndUpM_782;
var breakableDownM_4189 = breakableDownM_786;
var downAndUpM_4190 = downAndUpM_783;
var downM_4191 = downM_785;
var upM_4192 = upM_784;
var breakableDownAndUp_4193 = breakableDownAndUp_777;
var breakableDown_4194 = breakableDown_781;
var downAndUp_4195 = downAndUp_778;
var down_4196 = down_780;
var up_4197 = up_779;
var AnnType_4198 = AnnType_723;
var TUnknown_4199 = TUnknown_755;
var getAnn_4200 = getAnn_760;
var getAnnType_4201 = getAnnType_763;
var Var_4202 = Var_729;
var Const_4203 = Const_730;
var annOf_4204 = annOf_774;
var getType_4205 = getType_776;
var withAnn_4206 = withAnn_775;
var setAnn_4207 = setAnn_761;
var setAnnType_4208 = setAnnType_764;
var setType_4209 = setType_773;
var Data_4210 = Data_743;
var DataCon_4211 = DataCon_744;
var dataConName_4212 = dataConName_771;
var dataConNames_4213 = dataConNames_772;
var TCBound_4214 = TCBound_747;
var TConst_4215 = TConst_748;
var TVar_4216 = TVar_749;
var TSkolem_4217 = TSkolem_750;
var TApp_4218 = TApp_751;
var TRow_4219 = TRow_752;
var TBot_4220 = TBot_753;
var TForall_4221 = TForall_754;
var equivBound_4222 = equivBound_769;
var equivType_4223 = equivType_770;
var getAnnCodeLoc_4224 = getAnnCodeLoc_765;
var AnnCodeLoc_4225 = AnnCodeLoc_724;
var printCodeLoc_4226 = printCodeLoc_767;
var exprLoc_4227 = exprLoc_768;
var setAnnCodeLoc_4228 = setAnnCodeLoc_766;
var copyAnn_4229 = copyAnn_762;
var emptyAnn_4230 = emptyAnn_759;
var ImportAll_4231 = ImportAll_758;
var ImportOpen_4232 = ImportOpen_757;
var ImportClosed_4233 = ImportClosed_756;
var Instance_4234 = Instance_746;
var Class_4235 = Class_745;
var ModuleInterface_4236 = ModuleInterface_742;
var Module_4237 = Module_741;
var PData_4238 = PData_740;
var PConst_4239 = PConst_739;
var PVar_4240 = PVar_738;
var CStr_4241 = CStr_737;
var CNum_4242 = CNum_736;
var AnnExport_4243 = AnnExport_728;
var AnnTag_4244 = AnnTag_727;
var AnnData_4245 = AnnData_726;
var AnnUseCount_4246 = AnnUseCount_725;
var classToBindings_4247 = classToBindings_2041;
var unify_4248 = unify_2024;
var applySubsBound_4249 = applySubsBound_2022;
var instanceToTypeBound_4250 = instanceToTypeBound_2040;
var satisfiesBound_4251 = satisfiesBound_2045;
var skolemizeSubs_4252 = skolemizeSubs_2029;
var instantiate_4253 = instantiate_2019;
var printType_4254 = printType_1700;
var printTypeBound_4255 = printTypeBound_1701;
var reallyPrintExpr_4256 = reallyPrintExpr_1705;
var mkConFun_4257 = mkConFun_2984;
var S_4258 = function($_0_4276){
  return function($_1_4277){
    return function($_2_4278){
      return {$0:$_0_4276,$1:$_1_4277,$2:$_2_4278}
    }
  }
};
var setEnv_4266 = function(env_4384){
  return function(s_4385){
    var $phi$466 = ((S_4258(env_4384))(s_4385.$1))(s_4385.$2);
    return $phi$466
  }
};
var instanceNameFromBound_4273 = function(ix_4609){
  return function(b_4610){
    var $phi$467 = ($concat(($concat(($concat("local$instance$"))(b_4610.$1)))("$")))(intToString(ix_4609));
    return $phi$467
  }
};
var getEnv_4265 = function(s_4380){
  var $phi$468 = s_4380.$0;
  return $phi$468
};
var breakableDownAndUpWithEnv_4268 = function(getEnv_4474){
  return function(setEnv_4475){
    return function(down_4476){
      return function(up_4477){
        return function(a_4478){
          return function(e_4479){
            var exitScope_4482 = function(a_4493){
              return (setEnv_4475(tail_4157(getEnv_4474(a_4493))))(a_4493)
            };
            var processUp_4485 = function(a_4542){
              return function(e_4543){
                if(e_4543.$tag==3){
                  var $phi$469 = exitScope_4482(a_4542)
                } else if(e_4543.$tag==5){
                  var $phi$469 = exitScope_4482(a_4542)
                } else var $phi$469 = a_4542;
                var a2_4544 = $phi$469;
                return (up_4477(a2_4544))(e_4543)
              }
            };
            var patBindings_4486 = function(p_4552){
              if(p_4552.$tag==1){
                var $phi$470 = empty
              } else if(p_4552.$tag==0){
                var $phi$470 = ((set(p_4552.$1))(getAnnType_4201(p_4552.$0)))(empty)
              } else if(p_4552.$tag==2){
                var $phi$470 = ((foldr(function(env_4560){
                  return function(p_4561){
                    return (merge(patBindings_4486(p_4561)))(env_4560)
                  }
                }))(empty))(p_4552.$2)
              } else error("pattern match fail",p_4552);
              return $phi$470
            };
            var enterScope_4481 = function(bs_4489){
              return function(a_4490){
                var es_4491 = getEnv_4474(a_4490);
                var e_4492 = (merge(head_4158(es_4491)))(bs_4489);
                return (setEnv_4475((enqueue(e_4492))(es_4491)))(a_4490)
              }
            };
            var go_4480 = function(a_4487){
              return function(e_4488){
                return (((breakableDownAndUp_4193(processDown_4483))(processUp_4485))(a_4487))(e_4488)
              }
            };
            var processDown_4483 = function(a_4494){
              return function(e_4495){
                var $phi$472 = (down_4476(a_4494))(e_4495);
                if($phi$472.$tag==1){
                  var $phi$471 = Right_4114($phi$472.$0)
                } else if($phi$472.$tag==0){
                  if($phi$472.$0.$1.$tag==3){
                    var $phi$480 = getType_4205($phi$472.$0.$1);
                    if(($phi$480.$tag==3)&&(($phi$480.$1.$tag==3)&&(($phi$480.$1.$1.$tag==0)&&("->"==$phi$480.$1.$1.$1)))){
                      var $phi$479 = $phi$480.$1.$2
                    } else if(($phi$480.$tag==6)&&(($phi$480.$3.$tag==3)&&(($phi$480.$3.$1.$tag==3)&&(($phi$480.$3.$1.$1.$tag==0)&&("->"==$phi$480.$3.$1.$1.$1))))){
                      var $phi$479 = $phi$480.$3.$1.$2
                    } else var $phi$479 = TUnknown_4199;
                    var t_4502 = $phi$479;
                    var $phi$473 = Left_4113((Pair_4098((enterScope_4481(((set($phi$472.$0.$1.$1))(t_4502))(empty)))($phi$472.$0.$0)))($phi$472.$0.$1))
                  } else if($phi$472.$0.$1.$tag==5){
                    var ts_4520 = ((foldl(function(ts_4521){
                      return function(b_4522){
                        var $phi$478 = ((set(b_4522.$0))(getType_4205(b_4522.$1)))(ts_4521);
                        return $phi$478
                      }
                    }))(empty))($phi$472.$0.$1.$1);
                    var $phi$473 = Left_4113((Pair_4098((enterScope_4481(ts_4520))($phi$472.$0.$0)))($phi$472.$0.$1))
                  } else if($phi$472.$0.$1.$tag==4){
                    var $phi$475 = (go_4480($phi$472.$0.$0))($phi$472.$0.$1.$1);
                    var $phi$477 = ((foldl(processPat_4484))((Pair_4098($phi$475.$0))([])))($phi$472.$0.$1.$2);
                    var $phi$476 = Right_4114((Pair_4098($phi$477.$0))(((Case_4185($phi$472.$0.$1.$0))($phi$475.$1))($phi$477.$1)));
                    var $phi$474 = $phi$476;
                    var $phi$473 = $phi$474
                  } else var $phi$473 = Left_4113((Pair_4098($phi$472.$0.$0))($phi$472.$0.$1));
                  var $phi$471 = $phi$473
                } else error("pattern match fail",$phi$472);
                return $phi$471
              }
            };
            var processPat_4484 = function(ar_4533){
              return function(pat_4534){
                var bs_4539 = patBindings_4486(pat_4534.$0);
                var $phi$484 = (go_4480((enterScope_4481(bs_4539))(ar_4533.$0)))(pat_4534.$1);
                var $phi$483 = (Pair_4098(exitScope_4482($phi$484.$0)))((push((Pair_4098(pat_4534.$0))($phi$484.$1)))(ar_4533.$1));
                var $phi$482 = $phi$483;
                var $phi$481 = $phi$482;
                return $phi$481
              }
            };
            return (go_4480(a_4478))(e_4479)
          }
        }
      }
    }
  }
};
var rewriteExpr_4267 = function(is_4389){
  return function(env_4390){
    return function(e_4391){
      var rewriteVar_4393 = function(a_4419){
        return function(e_4420){
          if(e_4420.$tag==0){
            var $phi$488 = getType_4205(e_4420);
            if($phi$488.$tag==6){
              var $phi$487 = (Pair_4098(a_4419))(e_4420)
            } else {
              var findMatching_4429 = function(b_4438){
                return function(a_4439){
                  var matching_4443 = (filter(function(p_4444){
                    var $phi$490 = (satisfiesBound_4251(p_4444.$1))(b_4438);
                    return $phi$490
                  }))(a_4439.$1);
                  var $phi$492 = length(matching_4443);
                  if(0==$phi$492){
                    var $phi$491 = error(($concat(($concat(($concat("declasser failed to find satisfying instance for "))(printTypeBound_4255(b_4438))))(" ")))(exprLoc_4227(e_4420)))
                  } else if(1==$phi$492){
                    var $phi$491 = fst_4112((getIx(0))(matching_4443))
                  } else var $phi$491 = error(($concat(($concat(($concat("declasser found more than 1 satisfying instance for "))(printTypeBound_4255(b_4438))))(" ")))(exprLoc_4227(e_4420)));
                  var $phi$489 = $phi$491;
                  return $phi$489
                }
              };
              var requiredInstances_4430 = function(tv_4448){
                return function(td_4449){
                  var $phi$494 = ((instantiate_4253(Unit_4124))(function(__4450){
                    return function(v_4451){
                      return ($_4111(Pair_4098(Unit_4124)))((TVar_4216(emptyAnn_4230))(($concat("$ins$"))(v_4451)))
                    }
                  }))(td_4449);
                  var subs_4455 = ((unify_4248(function(s_4456){
                    return ($concat("declasser: "))(s_4456)
                  }))(tv_4448))($phi$494.$0.$0);
                  var $phi$493 = (map(applySubsBound_4249(subs_4455)))($phi$494.$0.$1);
                  return $phi$493
                }
              };
              var fromEnv_4428 = function(n_4435){
                return function(envs_4436){
                  var env_4437 = head_4158(envs_4436);
                  var $phi$496 = (has(n_4435))(env_4437);
                  if(!$phi$496){
                    var $phi$495 = error(($concat(($concat(($concat("no "))(n_4435)))(" in env ")))(jsonStringify(keys(env_4437))))
                  } else if($phi$496){
                    var $phi$495 = (get(n_4435))(env_4437)
                  } else error("pattern match fail",$phi$496);
                  return $phi$495
                }
              };
              var t_4431 = (fromEnv_4428(e_4420.$1))(getEnv_4265(a_4419));
              var is_4432 = (requiredInstances_4430($phi$488))(t_4431);
              var mis_4433 = (map(function(b_4458){
                return (findMatching_4429(b_4458))(a_4419)
              }))(is_4432);
              var e2_4434 = ((foldl(function(e_4459){
                return function(v_4460){
                  return ((App_4183(emptyAnn_4230))(e_4459))((Var_4202(emptyAnn_4230))(v_4460))
                }
              }))(e_4420))(mis_4433);
              var $phi$487 = (Pair_4098(a_4419))(e2_4434)
            };
            var $phi$485 = $phi$487
          } else if(e_4420.$tag==3){
            var dropInstance_4464 = function(v_4465){
              return function(a_4466){
                var $phi$486 = ((S_4258(a_4466.$0))((filter(function(p_4470){
                  return (($div$eq_4126($import1$instance$Eq$1))(fst_4112(p_4470)))(v_4465)
                }))(a_4466.$1)))(a_4466.$2);
                return $phi$486
              }
            };
            var $phi$485 = (Pair_4098((dropInstance_4464(e_4420.$1))(a_4419)))(e_4420)
          } else var $phi$485 = (Pair_4098(a_4419))(e_4420);
          return $phi$485
        }
      };
      var boundsToLam_4392 = function(a_4394){
        return function(e_4395){
          var addInstance_4396 = function(b_4398){
            return function(a_4399){
              var name_4403 = (instanceNameFromBound_4273(a_4399.$2))(b_4398);
              var $phi$497 = (Pair_4098(((S_4258(a_4399.$0))((push((Pair_4098(name_4403))(b_4398)))(a_4399.$1)))(a_4399.$2+1)))(name_4403);
              return $phi$497
            }
          };
          var rewriteBound_4397 = function(ae_4404){
            return function(ib_4405){
              var $phi$501 = (addInstance_4396(ib_4405.$1))(ae_4404.$0);
              var $phi$500 = (Pair_4098($phi$501.$0))(((Lam_4184(emptyAnn_4230))($phi$501.$1))(ae_4404.$1));
              var $phi$499 = $phi$500;
              var $phi$498 = $phi$499;
              return $phi$498
            }
          };
          var $phi$503 = getType_4205(e_4395);
          if($phi$503.$tag==6){
            var $phi$505 = (($gt_4181($import1$instance$Ord$2))(length($phi$503.$2)))(0);
            if(!$phi$505){
              var $phi$504 = (Pair_4098(a_4394))(e_4395)
            } else if($phi$505){
              var rewritten_4416 = ((foldr(rewriteBound_4397))((Pair_4098(a_4394))((setType_4209($phi$503.$3))(e_4395))))(zipWithIndex_4167($phi$503.$2));
              var $phi$504 = (mapSnd_4099(function(re_4417){
                return (withAnn_4206((((copyAnn_4229($import1$instance$Hashable$13))($import1$instance$Eq$1))(["export"]))(annOf_4204(e_4395))))(re_4417)
              }))(rewritten_4416)
            } else error("pattern match fail",$phi$505);
            var $phi$502 = $phi$504
          } else var $phi$502 = (Pair_4098(a_4394))(e_4395);
          return $phi$502
        }
      };
      return snd_4102((((((breakableDownAndUpWithEnv_4268(getEnv_4265))(setEnv_4266))(function(a_4472){
        return function(e_4473){
          return Left_4113((boundsToLam_4392(a_4472))(e_4473))
        }
      }))(rewriteVar_4393))(((S_4258([env_4390]))(is_4389))(0)))(e_4391))
    }
  }
};
var instanceName_4272 = function(ix_4603){
  return function(i_4604){
    var $phi$506 = ($concat(($concat(($concat("$instance$"))(i_4604.$1)))("$")))(intToString(ix_4603));
    return $phi$506
  }
};
var className_4270 = function(n_4597){
  return ($concat("$class$"))(n_4597)
};
var rewriteInstance_4264 = function(is_4369){
  return function(env_4370){
    return function(ix_4371){
      return function(i_4372){
        var args_4378 = (map((rewriteExpr_4267(is_4369))(env_4370)))((map(snd_4102))(sort(i_4372.$3)));
        var e_4379 = ((foldl(App_4183(emptyAnn_4230)))((Var_4202(emptyAnn_4230))(className_4270(i_4372.$1))))(args_4378);
        var name_4377 = (instanceName_4272(ix_4371))(i_4372);
        var $phi$507 = (Pair_4098(name_4377))((withAnn_4206(((((setAnn_4207($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_4243(name_4377)))(emptyAnn_4230)))(e_4379));
        return $phi$507
      }
    }
  }
};
var instanceNameFromImport_4275 = function(imix_4619){
  return function(inix_4620){
    return function(b_4621){
      var $phi$508 = ($concat(($concat(($concat(($concat(($concat("$import"))(intToString(imix_4619))))("$instance$")))(b_4621.$1)))("$")))(intToString(inix_4620));
      return $phi$508
    }
  }
};
var instanceName2_4274 = function(ix_4614){
  return function(i_4615){
    var $phi$509 = ($concat(($concat(($concat("$instance$"))(i_4615.$1)))("$")))(intToString(ix_4614));
    return $phi$509
  }
};
var rewriteImportedBound_4261 = function(impIx_4338){
  return function(_nbs_4339){
    return function(_ib_4340){
      var alias_4346 = ((instanceNameFromImport_4275(impIx_4338))(_ib_4340.$0))(_ib_4340.$1);
      var symbol_4345 = (instanceName2_4274(_ib_4340.$0))(_ib_4340.$1);
      var $phi$511 = (Pair_4098((push((Pair_4098(symbol_4345))(alias_4346)))(_nbs_4339.$0)))((push((Pair_4098(alias_4346))(_ib_4340.$1)))(_nbs_4339.$1));
      var $phi$510 = $phi$511;
      return $phi$510
    }
  }
};
var rewriteImportedInstances_4260 = function(ms_4316){
  return function(_isi_4317){
    return function(_ixi_4318){
      if(_ixi_4318.$1.$tag==1){
        var $phi$515 = (get(_ixi_4318.$1.$1))(ms_4316);
        var _impIns_4328 = ((foldl(rewriteImportedBound_4261(_ixi_4318.$0)))((Pair_4098([]))([])))(zipWithIndex_4167($phi$515.$2));
        var importedClassNames_4331 = (map(function(n_4332){
          return (Pair_4098(n_4332))(n_4332)
        }))((concatMap_4164(function(c_4333){
          var $phi$517 = (enqueue(className_4270(c_4333.$1)))((map(fst_4112))(c_4333.$3));
          return $phi$517
        }))($phi$515.$1));
        var $phi$516 = (Pair_4098((push(((ImportOpen_4232(_ixi_4318.$1.$0))(_ixi_4318.$1.$1))((concat(_ixi_4318.$1.$2))((concat(_impIns_4328.$0))(importedClassNames_4331)))))(_isi_4317.$0)))((concat(_isi_4317.$1))(_impIns_4328.$1));
        var $phi$514 = $phi$516;
        var $phi$513 = $phi$514
      } else error("pattern match fail",_ixi_4318);
      var $phi$512 = $phi$513;
      return $phi$512
    }
  }
};
var mkClassDictConstructor_4262 = function(c_4347){
  var type_4354 = ((TApp_4218(emptyAnn_4230))((TConst_4215(emptyAnn_4230))(c_4347.$1)))((TVar_4216(emptyAnn_4230))(c_4347.$2));
  var params_4353 = (map(snd_4102))(sort(classToBindings_4247(c_4347)));
  var name_4352 = className_4270(c_4347.$1);
  var $phi$518 = ((((mkConFun_4257(Nothing_4105))(type_4354))([c_4347.$2]))(name_4352))(params_4353);
  return $phi$518
};
var className2_4271 = function(c_4598){
  var $phi$519 = className_4270(c_4598.$1);
  return $phi$519
};
var mkClassDictAccessors_4263 = function(c_4355){
  var name_4360 = className2_4271(c_4355);
  var f_4364 = function(b_4365){
    return (PVar_4240(emptyAnn_4230))(($concat(fst_4112(b_4365)))("_"))
  };
  var bsForPat_4361 = (map(f_4364))(sort(c_4355.$3));
  var v_4362 = ($concat("x_"))(name_4360);
  var rewrite_4363 = function(b_4366){
    var $phi$521 = (Pair_4098(b_4366.$0))((setType_4209(b_4366.$1))(((Lam_4184(((((setAnn_4207($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_4243(b_4366.$0)))(emptyAnn_4230)))(v_4362))(((Case_4185(emptyAnn_4230))((Var_4202(emptyAnn_4230))(v_4362)))([(Pair_4098(((PData_4238(emptyAnn_4230))(name_4360))(bsForPat_4361)))((Var_4202(emptyAnn_4230))(($concat(b_4366.$0))("_")))]))));
    return $phi$521
  };
  var $phi$520 = (map(rewrite_4363))(classToBindings_4247(c_4355));
  return $phi$520
};
var importsToTypeEnv_4269 = function(ms_4562){
  return function(is_4563){
    var getFile_4564 = function(i_4567){
      if(i_4567.$tag==2){
        var $phi$522 = i_4567.$1
      } else if(i_4567.$tag==1){
        var $phi$522 = i_4567.$1
      } else if(i_4567.$tag==0){
        var $phi$522 = i_4567.$1
      } else error("pattern match fail",i_4567);
      return $phi$522
    };
    var addClass_4565 = function(env_4576){
      return function(c_4577){
        return ((foldl(function(env_4578){
          return function(b_4579){
            return ((set(fst_4112(b_4579)))(snd_4102(b_4579)))(env_4578)
          }
        }))(env_4576))(classToBindings_4247(c_4577))
      }
    };
    var addImports_4566 = function(env_4580){
      return function(i_4581){
        var $phi$524 = (get(getFile_4564(i_4581)))(ms_4562);
        if(i_4581.$tag==2){
          var $phi$525 = (merge(env_4580))($phi$524.$0)
        } else if(i_4581.$tag==1){
          var $phi$525 = ((foldl(function(env_4592){
            return function(n_4593){
              var $phi$526 = ((set(n_4593.$1))((get(n_4593.$0))($phi$524.$0)))(env_4592);
              return $phi$526
            }
          }))(env_4580))(i_4581.$2)
        } else var $phi$525 = error("import type not supported in type inference");
        var env2_4585 = $phi$525;
        var env3_4586 = ((foldl(addClass_4565))(env2_4585))($phi$524.$1);
        var $phi$523 = env3_4586;
        return $phi$523
      }
    };
    return ((foldl(addImports_4566))(empty))((enqueue((ImportAll_4231(emptyAnn_4230))("./builtins.js")))(is_4563))
  }
};
var declassModule_4259 = function(ms_4279){
  return function(m_4280){
    var classFuns_4291 = (concat((map(mkClassDictConstructor_4262))(m_4280.$4)))((concatMap_4164(mkClassDictAccessors_4263))(m_4280.$4));
    var splitData_4309 = function(d_4310){
      var $phi$529 = (((lookup_4120($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(annOf_4204(snd_4102(d_4310)));
      if($phi$529.$tag==1){
        var $phi$528 = Right_4114(d_4310)
      } else if($phi$529.$tag==0){
        var $phi$528 = Left_4113(d_4310)
      } else error("pattern match fail",$phi$529);
      return $phi$528
    };
    var _sds_4294 = splitEither_4174((map(splitData_4309))(m_4280.$6));
    var adtDs_4295 = fst_4112(_sds_4294);
    var _isi_4288 = ((foldl(rewriteImportedInstances_4260(ms_4279)))((Pair_4098([]))([])))(zipWithIndex_4167(m_4280.$2));
    var importedInstances_4290 = snd_4102(_isi_4288);
    var availableInstances_4292 = (concat(importedInstances_4290))((map(function(p_4300){
      var $phi$530 = (Pair_4098((instanceName_4272(p_4300.$0))(p_4300.$1)))(instanceToTypeBound_4250(p_4300.$1));
      return $phi$530
    }))(zipWithIndex_4167(m_4280.$5)));
    var localBindings_4304 = (concat(classFuns_4291))(m_4280.$6);
    var importedSymbols_4303 = (importsToTypeEnv_4269(ms_4279))(m_4280.$2);
    var env_4293 = ((foldl(function(env_4305){
      return function(b_4306){
        var $phi$531 = ((set(b_4306.$0))(getType_4205(b_4306.$1)))(env_4305);
        return $phi$531
      }
    }))(importedSymbols_4303))(localBindings_4304);
    var nonAdtDs_4296 = snd_4102(_sds_4294);
    var declassedDs_4297 = (map(function(d_4312){
      return (Pair_4098(fst_4112(d_4312)))(((rewriteExpr_4267(availableInstances_4292))(env_4293))(snd_4102(d_4312)))
    }))(nonAdtDs_4296);
    var instancesAsDicts_4298 = (map(function(p_4313){
      var $phi$532 = (((rewriteInstance_4264(availableInstances_4292))(env_4293))(p_4313.$0))(p_4313.$1);
      return $phi$532
    }))(zipWithIndex_4167(m_4280.$5));
    var finalDs_4299 = (concat(adtDs_4295))((concat(classFuns_4291))((concat(instancesAsDicts_4298))(declassedDs_4297)));
    var impsWithImportedInstances_4289 = fst_4112(_isi_4288);
    var $phi$527 = ((((((Module_4237(m_4280.$0))(m_4280.$1))(impsWithImportedInstances_4289))(m_4280.$3))([]))([]))(finalDs_4299);
    return $phi$527
  }
};
var assert_4625 = assert_85;
var Pair_4626 = Pair_3;
var mapSnd_4627 = mapSnd_84;
var mapFst_4628 = mapFst_83;
var $gt$eq$gt_4629 = $gt$eq$gt_82;
var snd_4630 = snd_23;
var debug2_4631 = debug2_81;
var Just_4632 = Just_1;
var Nothing_4633 = Nothing_2;
var isJust_4634 = isJust_21;
var Empty_4635 = Empty_7;
var Leaf_4636 = Leaf_8;
var Collision_4637 = Collision_9;
var BitmapIndexed_4638 = BitmapIndexed_10;
var $_4639 = $_12;
var fst_4640 = fst_22;
var Left_4641 = Left_4;
var Right_4642 = Right_5;
var loop_4643 = loop_27;
var find_4644 = find_29;
var hamtMask_4645 = hamtMask_58;
var popCount_4646 = popCount_57;
var hamtIndex_4647 = hamtIndex_59;
var lookup_4648 = lookup_60;
var setContains_4649 = setContains_76;
var foldTrie_4650 = foldTrie_66;
var emptySet_4651 = emptySet_72;
var Unit_4652 = Unit_0;
var not_4653 = not_26;
var $div$eq_4654 = $div$eq_13;
var mapIx_4655 = mapIx_30;
var insert_4656 = insert_61;
var setAdd_4657 = setAdd_73;
var setIntersection_4658 = setIntersection_80;
var remove_4659 = remove_63;
var setDiff_4660 = setDiff_79;
var setToArray_4661 = setToArray_78;
var mergeTrie_4662 = mergeTrie_70;
var setUnion_4663 = setUnion_77;
var setRemove_4664 = setRemove_75;
var setAddAll_4665 = setAddAll_74;
var trieKeys_4666 = trieKeys_71;
var size_4667 = size_68;
var mapTrie_4668 = mapTrie_67;
var nodeMask_4669 = nodeMask_56;
var isEmpty_4670 = isEmpty_69;
var filterTrie_4671 = filterTrie_65;
var nextSetBitMask_4672 = nextSetBitMask_64;
var updateOrSet_4673 = updateOrSet_62;
var State_4674 = State_6;
var runState_4675 = runState_54;
var evalState_4676 = evalState_55;
var sets_4677 = sets_53;
var gets_4678 = gets_52;
var foldM_4679 = foldM_49;
var mapM_4680 = mapM_50;
var forM_4681 = forM_51;
var strToArray_4682 = strToArray_48;
var toRecord_4683 = toRecord_47;
var reverse_4684 = reverse_46;
var tail_4685 = tail_41;
var head_4686 = head_40;
var uniq_4687 = uniq_45;
var mergeSet_4688 = mergeSet_44;
var init_4689 = init_43;
var last_4690 = last_42;
var mapJust_4691 = mapJust_39;
var concatMap_4692 = concatMap_38;
var zip_4693 = zip_37;
var zipWithIndex2_4694 = zipWithIndex2_35;
var zipWithIndex_4695 = zipWithIndex_36;
var join_4696 = join_34;
var all_4697 = all_33;
var exists_4698 = exists_32;
var containsChar_4699 = containsChar_31;
var contains_4700 = contains_28;
var either_4701 = either_24;
var splitEither_4702 = splitEither_25;
var fromJust_4703 = fromJust_20;
var justOr_4704 = justOr_19;
var maybe_4705 = maybe_18;
var $gt$gt_4706 = $gt$gt_17;
var $gt$eq_4707 = $gt$eq_16;
var $lt$eq_4708 = $lt$eq_15;
var $gt_4709 = $gt_14;
var Identity_4710 = Identity_11;
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
var ArgBool_4711 = function($_0_4719){
  return function($_1_4720){
    return {$0:$_0_4719,$1:$_1_4720,$tag:0}
  }
};
var ParsedArgs_4713 = function($_0_4723){
  return function($_1_4724){
    return function($_2_4725){
      return {$0:$_0_4723,$1:$_1_4724,$2:$_2_4725}
    }
  }
};
var ArgString_4712 = function($_0_4721){
  return function($_1_4722){
    return {$0:$_0_4721,$1:$_1_4722,$tag:1}
  }
};
var $instance$Eq$0 = $class$Eq(function(a_4765){
  return function(b_4766){
    return a_4765===b_4766
  }
});
var getBool_4718 = function(p_4755){
  return function(def_4756){
    var $phi$535 = ((contains_4700($instance$Eq$0))(def_4756))(p_4755.$2);
    if(!$phi$535){
      var $phi$534 = error("unrecognized arg that was not present for parsing")
    } else if($phi$535){
      if(def_4756.$tag==0){
        var $phi$538 = (has(def_4756.$0))(p_4755.$1);
        if(!$phi$538){
          if(def_4756.$1.$tag==0){
            var $phi$541 = def_4756.$1.$0
          } else if(def_4756.$1.$tag==1){
            var $phi$541 = error(($concat("no value for required arg "))(def_4756.$0))
          } else error("pattern match fail",def_4756.$1);
          var $phi$537 = $phi$541
        } else if($phi$538){
          var $phi$540 = (get(def_4756.$0))(p_4755.$1);
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
var getString_4717 = function(p_4746){
  return function(def_4747){
    var $phi$544 = ((contains_4700($instance$Eq$0))(def_4747))(p_4746.$2);
    if(!$phi$544){
      var $phi$543 = error("unrecognized arg that was not present for parsing")
    } else if($phi$544){
      if(def_4747.$tag==1){
        var $phi$547 = (has(def_4747.$0))(p_4746.$1);
        if(!$phi$547){
          if(def_4747.$1.$tag==0){
            var $phi$548 = def_4747.$1.$0
          } else if(def_4747.$1.$tag==1){
            var $phi$548 = error(($concat("no value for required arg "))(def_4747.$0))
          } else error("pattern match fail",def_4747.$1);
          var $phi$546 = $phi$548
        } else if($phi$547){
          var $phi$546 = (get(def_4747.$0))(p_4746.$1)
        } else error("pattern match fail",$phi$547);
        var $phi$545 = $phi$546
      } else var $phi$545 = error("arg is not a string");
      var $phi$543 = $phi$545
    } else error("pattern match fail",$phi$544);
    var $phi$542 = $phi$543;
    return $phi$542
  }
};
var getPositional_4716 = function(p_4742){
  var $phi$549 = p_4742.$0;
  return $phi$549
};
var argName_4714 = function(a_4726){
  if(a_4726.$tag==0){
    var $phi$550 = a_4726.$0
  } else if(a_4726.$tag==1){
    var $phi$550 = a_4726.$0
  } else error("pattern match fail",a_4726);
  return $phi$550
};
var parseArgs_4715 = function(defs_4731){
  return function(argv_4732){
    var parse_4733 = function(r_4734){
      return function(arg_4735){
        var $phi$553 = ($and((($eq$eq($import1$instance$Eq$1))((getChar(0))(arg_4735)))("-")))((($eq$eq($import1$instance$Eq$1))((getChar(1))(arg_4735)))("-"));
        if(!$phi$553){
          var $phi$552 = (Pair_4626((push(arg_4735))(r_4734.$0)))(r_4734.$1)
        } else if($phi$553){
          var value_4739 = (drop(1))((match("=.*"))(arg_4735));
          var name_4738 = (match("[^=]+"))((drop(2))(arg_4735));
          var $phi$555 = ((contains_4700($import1$instance$Eq$1))(name_4738))((map(argName_4714))(defs_4731));
          if(!$phi$555){
            var $phi$554 = error(($concat("unrecognized argument "))(arg_4735))
          } else if($phi$555){
            var $phi$554 = (Pair_4626(r_4734.$0))(((set(name_4738))(value_4739))(r_4734.$1))
          } else error("pattern match fail",$phi$555);
          var $phi$552 = $phi$554
        } else error("pattern match fail",$phi$553);
        var $phi$551 = $phi$552;
        return $phi$551
      }
    };
    var $phi$557 = ((foldl(parse_4733))((Pair_4626([]))(empty)))(argv_4732);
    var $phi$556 = ((ParsedArgs_4713($phi$557.$0))($phi$557.$1))(defs_4731);
    return $phi$556
  }
};
var JSIf_4790 = function($_0_4824){
  return function($_1_4825){
    return function($_2_4826){
      return {$0:$_0_4824,$1:$_1_4825,$2:$_2_4826,$tag:6}
    }
  }
};
var JSAssign_4789 = function($_0_4822){
  return function($_1_4823){
    return {$0:$_0_4822,$1:$_1_4823,$tag:5}
  }
};
var JSBreak_4788 = {$tag:4};
var JSSwitch_4787 = function($_0_4820){
  return function($_1_4821){
    return {$0:$_0_4820,$1:$_1_4821,$tag:3}
  }
};
var JSVar_4786 = function($_0_4818){
  return function($_1_4819){
    return {$0:$_0_4818,$1:$_1_4819,$tag:2}
  }
};
var JSReturn_4785 = function($_0_4817){
  return {$0:$_0_4817,$tag:1}
};
var JSExpr_4784 = function($_0_4816){
  return {$0:$_0_4816,$tag:0}
};
var JSSeq_4783 = function($_0_4815){
  return {$0:$_0_4815,$tag:16}
};
var JSNew_4782 = function($_0_4813){
  return function($_1_4814){
    return {$0:$_0_4813,$1:$_1_4814,$tag:15}
  }
};
var JSInstanceOf_4781 = function($_0_4811){
  return function($_1_4812){
    return {$0:$_0_4811,$1:$_1_4812,$tag:14}
  }
};
var JSUndefined_4780 = {$tag:13};
var JSNull_4779 = {$tag:12};
var JSArray_4778 = function($_0_4810){
  return {$0:$_0_4810,$tag:11}
};
var JSObject_4777 = function($_0_4809){
  return {$0:$_0_4809,$tag:10}
};
var JSBool_4776 = function($_0_4808){
  return {$0:$_0_4808,$tag:9}
};
var JSString_4775 = function($_0_4807){
  return {$0:$_0_4807,$tag:8}
};
var JSNum_4774 = function($_0_4806){
  return {$0:$_0_4806,$tag:7}
};
var JSTernary_4773 = function($_0_4803){
  return function($_1_4804){
    return function($_2_4805){
      return {$0:$_0_4803,$1:$_1_4804,$2:$_2_4805,$tag:6}
    }
  }
};
var JSFun_4772 = function($_0_4801){
  return function($_1_4802){
    return {$0:$_0_4801,$1:$_1_4802,$tag:5}
  }
};
var JSCall_4771 = function($_0_4799){
  return function($_1_4800){
    return {$0:$_0_4799,$1:$_1_4800,$tag:4}
  }
};
var JSBinOp_4770 = function($_0_4796){
  return function($_1_4797){
    return function($_2_4798){
      return {$0:$_0_4796,$1:$_1_4797,$2:$_2_4798,$tag:3}
    }
  }
};
var JSUnOp_4769 = function($_0_4794){
  return function($_1_4795){
    return {$0:$_0_4794,$1:$_1_4795,$tag:2}
  }
};
var JSIndex_4768 = function($_0_4792){
  return function($_1_4793){
    return {$0:$_0_4792,$1:$_1_4793,$tag:1}
  }
};
var JSRef_4767 = function($_0_4791){
  return {$0:$_0_4791,$tag:0}
};
var assert_4827 = assert_85;
var Pair_4828 = Pair_3;
var mapSnd_4829 = mapSnd_84;
var mapFst_4830 = mapFst_83;
var $gt$eq$gt_4831 = $gt$eq$gt_82;
var snd_4832 = snd_23;
var debug2_4833 = debug2_81;
var Just_4834 = Just_1;
var Nothing_4835 = Nothing_2;
var isJust_4836 = isJust_21;
var Empty_4837 = Empty_7;
var Leaf_4838 = Leaf_8;
var Collision_4839 = Collision_9;
var BitmapIndexed_4840 = BitmapIndexed_10;
var $_4841 = $_12;
var fst_4842 = fst_22;
var Left_4843 = Left_4;
var Right_4844 = Right_5;
var loop_4845 = loop_27;
var find_4846 = find_29;
var hamtMask_4847 = hamtMask_58;
var popCount_4848 = popCount_57;
var hamtIndex_4849 = hamtIndex_59;
var lookup_4850 = lookup_60;
var setContains_4851 = setContains_76;
var foldTrie_4852 = foldTrie_66;
var emptySet_4853 = emptySet_72;
var Unit_4854 = Unit_0;
var not_4855 = not_26;
var $div$eq_4856 = $div$eq_13;
var mapIx_4857 = mapIx_30;
var insert_4858 = insert_61;
var setAdd_4859 = setAdd_73;
var setIntersection_4860 = setIntersection_80;
var remove_4861 = remove_63;
var setDiff_4862 = setDiff_79;
var setToArray_4863 = setToArray_78;
var mergeTrie_4864 = mergeTrie_70;
var setUnion_4865 = setUnion_77;
var setRemove_4866 = setRemove_75;
var setAddAll_4867 = setAddAll_74;
var trieKeys_4868 = trieKeys_71;
var size_4869 = size_68;
var mapTrie_4870 = mapTrie_67;
var nodeMask_4871 = nodeMask_56;
var isEmpty_4872 = isEmpty_69;
var filterTrie_4873 = filterTrie_65;
var nextSetBitMask_4874 = nextSetBitMask_64;
var updateOrSet_4875 = updateOrSet_62;
var State_4876 = State_6;
var runState_4877 = runState_54;
var evalState_4878 = evalState_55;
var sets_4879 = sets_53;
var gets_4880 = gets_52;
var foldM_4881 = foldM_49;
var mapM_4882 = mapM_50;
var forM_4883 = forM_51;
var strToArray_4884 = strToArray_48;
var toRecord_4885 = toRecord_47;
var reverse_4886 = reverse_46;
var tail_4887 = tail_41;
var head_4888 = head_40;
var uniq_4889 = uniq_45;
var mergeSet_4890 = mergeSet_44;
var init_4891 = init_43;
var last_4892 = last_42;
var mapJust_4893 = mapJust_39;
var concatMap_4894 = concatMap_38;
var zip_4895 = zip_37;
var zipWithIndex2_4896 = zipWithIndex2_35;
var zipWithIndex_4897 = zipWithIndex_36;
var join_4898 = join_34;
var all_4899 = all_33;
var exists_4900 = exists_32;
var containsChar_4901 = containsChar_31;
var contains_4902 = contains_28;
var either_4903 = either_24;
var splitEither_4904 = splitEither_25;
var fromJust_4905 = fromJust_20;
var justOr_4906 = justOr_19;
var maybe_4907 = maybe_18;
var $gt$gt_4908 = $gt$gt_17;
var $gt$eq_4909 = $gt$eq_16;
var $lt$eq_4910 = $lt$eq_15;
var $gt_4911 = $gt_14;
var Identity_4912 = Identity_11;
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
var JSIf_4913 = JSIf_4790;
var JSAssign_4914 = JSAssign_4789;
var JSBreak_4915 = JSBreak_4788;
var JSSwitch_4916 = JSSwitch_4787;
var JSVar_4917 = JSVar_4786;
var JSReturn_4918 = JSReturn_4785;
var JSExpr_4919 = JSExpr_4784;
var JSSeq_4920 = JSSeq_4783;
var JSNew_4921 = JSNew_4782;
var JSInstanceOf_4922 = JSInstanceOf_4781;
var JSUndefined_4923 = JSUndefined_4780;
var JSNull_4924 = JSNull_4779;
var JSArray_4925 = JSArray_4778;
var JSObject_4926 = JSObject_4777;
var JSBool_4927 = JSBool_4776;
var JSString_4928 = JSString_4775;
var JSNum_4929 = JSNum_4774;
var JSTernary_4930 = JSTernary_4773;
var JSFun_4931 = JSFun_4772;
var JSCall_4932 = JSCall_4771;
var JSBinOp_4933 = JSBinOp_4770;
var JSUnOp_4934 = JSUnOp_4769;
var JSIndex_4935 = JSIndex_4768;
var JSRef_4936 = JSRef_4767;
var tryDCE_4937 = function(e_4940){
  if(((e_4940.$tag==3)&&("&&"==e_4940.$0))&&((e_4940.$1.$tag==9)&&e_4940.$1.$0)){
    var $phi$558 = e_4940.$2
  } else if(((e_4940.$tag==3)&&("&&"==e_4940.$0))&&((e_4940.$2.$tag==9)&&e_4940.$2.$0)){
    var $phi$558 = e_4940.$1
  } else if((e_4940.$tag==6)&&((e_4940.$0.$tag==9)&&e_4940.$0.$0)){
    var $phi$558 = e_4940.$1
  } else if((e_4940.$tag==6)&&((e_4940.$0.$tag==9)&&(!e_4940.$0.$0))){
    var $phi$558 = e_4940.$2
  } else var $phi$558 = e_4940;
  return $phi$558
};
var rewriteDCE_4938 = function(e_4948){
  if(e_4948.$tag==1){
    var $phi$559 = (JSIndex_4935(rewriteDCE_4938(e_4948.$0)))(rewriteDCE_4938(e_4948.$1))
  } else if(e_4948.$tag==3){
    var $phi$559 = tryDCE_4937(((JSBinOp_4933(e_4948.$0))(rewriteDCE_4938(e_4948.$1)))(rewriteDCE_4938(e_4948.$2)))
  } else if(e_4948.$tag==4){
    var $phi$559 = (JSCall_4932(rewriteDCE_4938(e_4948.$0)))((map(rewriteDCE_4938))(e_4948.$1))
  } else if(e_4948.$tag==5){
    var $phi$559 = (JSFun_4931(e_4948.$0))((concatMap_4894(rewriteStmt_4939))(e_4948.$1))
  } else if(e_4948.$tag==6){
    var $phi$559 = tryDCE_4937(((JSTernary_4930(rewriteDCE_4938(e_4948.$0)))(rewriteDCE_4938(e_4948.$1)))(rewriteDCE_4938(e_4948.$2)))
  } else if(e_4948.$tag==10){
    var $phi$559 = JSObject_4926((map(function(kv_4962){
      var $phi$560 = (Pair_4828(kv_4962.$0))(rewriteDCE_4938(kv_4962.$1));
      return $phi$560
    }))(e_4948.$0))
  } else if(e_4948.$tag==14){
    var $phi$559 = (JSInstanceOf_4922(rewriteDCE_4938(e_4948.$0)))(rewriteDCE_4938(e_4948.$1))
  } else if(e_4948.$tag==15){
    var $phi$559 = (JSNew_4921(rewriteDCE_4938(e_4948.$0)))((map(rewriteDCE_4938))(e_4948.$1))
  } else if(e_4948.$tag==11){
    var $phi$559 = JSArray_4925((map(rewriteDCE_4938))(e_4948.$0))
  } else var $phi$559 = e_4948;
  return $phi$559
};
var rewriteStmt_4939 = function(s_4971){
  if(s_4971.$tag==0){
    var $phi$561 = [JSExpr_4919(rewriteDCE_4938(s_4971.$0))]
  } else if(s_4971.$tag==1){
    var $phi$561 = [JSReturn_4918(rewriteDCE_4938(s_4971.$0))]
  } else if(s_4971.$tag==2){
    var $phi$561 = [(JSVar_4917(s_4971.$0))(rewriteDCE_4938(s_4971.$1))]
  } else if(s_4971.$tag==5){
    var $phi$561 = [(JSAssign_4914(rewriteDCE_4938(s_4971.$0)))(rewriteDCE_4938(s_4971.$1))]
  } else if((s_4971.$tag==6)&&((s_4971.$0.$tag==9)&&s_4971.$0.$0)){
    var $phi$561 = (concatMap_4894(rewriteStmt_4939))(s_4971.$1)
  } else if((s_4971.$tag==6)&&((s_4971.$0.$tag==9)&&(!s_4971.$0.$0))){
    var $phi$561 = (concatMap_4894(rewriteStmt_4939))(s_4971.$2)
  } else if(s_4971.$tag==6){
    var $phi$563 = rewriteDCE_4938(s_4971.$0);
    if(($phi$563.$tag==9)&&$phi$563.$0){
      var $phi$562 = (concatMap_4894(rewriteStmt_4939))(s_4971.$1)
    } else if(($phi$563.$tag==9)&&(!$phi$563.$0)){
      var $phi$562 = (concatMap_4894(rewriteStmt_4939))(s_4971.$2)
    } else var $phi$562 = [((JSIf_4913($phi$563))((concatMap_4894(rewriteStmt_4939))(s_4971.$1)))((concatMap_4894(rewriteStmt_4939))(s_4971.$2))];
    var $phi$561 = $phi$562
  } else var $phi$561 = [s_4971];
  return $phi$561
};
var assert_4987 = assert_85;
var Pair_4988 = Pair_3;
var mapSnd_4989 = mapSnd_84;
var mapFst_4990 = mapFst_83;
var $gt$eq$gt_4991 = $gt$eq$gt_82;
var snd_4992 = snd_23;
var debug2_4993 = debug2_81;
var Just_4994 = Just_1;
var Nothing_4995 = Nothing_2;
var isJust_4996 = isJust_21;
var Empty_4997 = Empty_7;
var Leaf_4998 = Leaf_8;
var Collision_4999 = Collision_9;
var BitmapIndexed_5000 = BitmapIndexed_10;
var $_5001 = $_12;
var fst_5002 = fst_22;
var Left_5003 = Left_4;
var Right_5004 = Right_5;
var loop_5005 = loop_27;
var find_5006 = find_29;
var hamtMask_5007 = hamtMask_58;
var popCount_5008 = popCount_57;
var hamtIndex_5009 = hamtIndex_59;
var lookup_5010 = lookup_60;
var setContains_5011 = setContains_76;
var foldTrie_5012 = foldTrie_66;
var emptySet_5013 = emptySet_72;
var Unit_5014 = Unit_0;
var not_5015 = not_26;
var $div$eq_5016 = $div$eq_13;
var mapIx_5017 = mapIx_30;
var insert_5018 = insert_61;
var setAdd_5019 = setAdd_73;
var setIntersection_5020 = setIntersection_80;
var remove_5021 = remove_63;
var setDiff_5022 = setDiff_79;
var setToArray_5023 = setToArray_78;
var mergeTrie_5024 = mergeTrie_70;
var setUnion_5025 = setUnion_77;
var setRemove_5026 = setRemove_75;
var setAddAll_5027 = setAddAll_74;
var trieKeys_5028 = trieKeys_71;
var size_5029 = size_68;
var mapTrie_5030 = mapTrie_67;
var nodeMask_5031 = nodeMask_56;
var isEmpty_5032 = isEmpty_69;
var filterTrie_5033 = filterTrie_65;
var nextSetBitMask_5034 = nextSetBitMask_64;
var updateOrSet_5035 = updateOrSet_62;
var State_5036 = State_6;
var runState_5037 = runState_54;
var evalState_5038 = evalState_55;
var sets_5039 = sets_53;
var gets_5040 = gets_52;
var foldM_5041 = foldM_49;
var mapM_5042 = mapM_50;
var forM_5043 = forM_51;
var strToArray_5044 = strToArray_48;
var toRecord_5045 = toRecord_47;
var reverse_5046 = reverse_46;
var tail_5047 = tail_41;
var head_5048 = head_40;
var uniq_5049 = uniq_45;
var mergeSet_5050 = mergeSet_44;
var init_5051 = init_43;
var last_5052 = last_42;
var mapJust_5053 = mapJust_39;
var concatMap_5054 = concatMap_38;
var zip_5055 = zip_37;
var zipWithIndex2_5056 = zipWithIndex2_35;
var zipWithIndex_5057 = zipWithIndex_36;
var join_5058 = join_34;
var all_5059 = all_33;
var exists_5060 = exists_32;
var containsChar_5061 = containsChar_31;
var contains_5062 = contains_28;
var either_5063 = either_24;
var splitEither_5064 = splitEither_25;
var fromJust_5065 = fromJust_20;
var justOr_5066 = justOr_19;
var maybe_5067 = maybe_18;
var $gt$gt_5068 = $gt$gt_17;
var $gt$eq_5069 = $gt$eq_16;
var $lt$eq_5070 = $lt$eq_15;
var $gt_5071 = $gt_14;
var Identity_5072 = Identity_11;
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
var JSIf_5073 = JSIf_4790;
var JSAssign_5074 = JSAssign_4789;
var JSBreak_5075 = JSBreak_4788;
var JSSwitch_5076 = JSSwitch_4787;
var JSVar_5077 = JSVar_4786;
var JSReturn_5078 = JSReturn_4785;
var JSExpr_5079 = JSExpr_4784;
var JSSeq_5080 = JSSeq_4783;
var JSNew_5081 = JSNew_4782;
var JSInstanceOf_5082 = JSInstanceOf_4781;
var JSUndefined_5083 = JSUndefined_4780;
var JSNull_5084 = JSNull_4779;
var JSArray_5085 = JSArray_4778;
var JSObject_5086 = JSObject_4777;
var JSBool_5087 = JSBool_4776;
var JSString_5088 = JSString_4775;
var JSNum_5089 = JSNum_4774;
var JSTernary_5090 = JSTernary_4773;
var JSFun_5091 = JSFun_4772;
var JSCall_5092 = JSCall_4771;
var JSBinOp_5093 = JSBinOp_4770;
var JSUnOp_5094 = JSUnOp_4769;
var JSIndex_5095 = JSIndex_4768;
var JSRef_5096 = JSRef_4767;
var printIndent_5102 = function(indent_5173){
  if(0==indent_5173){
    var $phi$564 = ""
  } else var $phi$564 = ($concat("  "))(printIndent_5102(indent_5173-1));
  return $phi$564
};
var paren_5103 = function(s_5175){
  return ($concat(($concat("("))(s_5175)))(")")
};
var jsExprToString_5097 = function(indent_5104){
  return function(e_5105){
    var printParen_5107 = function(e_5109){
      return (jsExprToParenString_5098(indent_5104))(e_5109)
    };
    var print_5106 = function(e_5108){
      return (jsExprToString_5097(indent_5104))(e_5108)
    };
    if(e_5105.$tag==12){
      var $phi$565 = "null"
    } else if(e_5105.$tag==13){
      var $phi$565 = "undefined"
    } else if((e_5105.$tag==9)&&e_5105.$0){
      var $phi$565 = "true"
    } else if((e_5105.$tag==9)&&(!e_5105.$0)){
      var $phi$565 = "false"
    } else if(e_5105.$tag==7){
      var $phi$565 = jsonStringify(e_5105.$0)
    } else if(e_5105.$tag==8){
      var $phi$565 = jsonStringify(e_5105.$0)
    } else if(e_5105.$tag==0){
      var $phi$565 = e_5105.$0
    } else if((e_5105.$tag==1)&&(e_5105.$1.$tag==8)){
      var $phi$567 = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))(e_5105.$1.$0);
      if(""==$phi$567){
        var $phi$566 = ($concat(($concat(($concat(printParen_5107(e_5105.$0)))("[")))(e_5105.$1.$0)))("]")
      } else var $phi$566 = ($concat(($concat(printParen_5107(e_5105.$0)))(".")))($phi$567);
      var $phi$565 = $phi$566
    } else if(e_5105.$tag==1){
      var $phi$565 = ($concat(($concat(($concat(printParen_5107(e_5105.$0)))("[")))(print_5106(e_5105.$1))))("]")
    } else if(e_5105.$tag==2){
      var $phi$565 = ($concat(e_5105.$0))(printParen_5107(e_5105.$1))
    } else if(e_5105.$tag==3){
      var $phi$565 = ($concat(($concat(printParen_5107(e_5105.$1)))(e_5105.$0)))(printParen_5107(e_5105.$2))
    } else if(e_5105.$tag==4){
      var $phi$565 = ($concat(printParen_5107(e_5105.$0)))(paren_5103((intercalate(","))((map(print_5106))(e_5105.$1))))
    } else if(e_5105.$tag==15){
      var $phi$565 = ($concat(($concat("new "))(printParen_5107(e_5105.$0))))(paren_5103((intercalate(","))((map(print_5106))(e_5105.$1))))
    } else if(e_5105.$tag==5){
      var $phi$565 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat("function("))((intercalate(","))(e_5105.$0))))("){\n")))(printIndent_5102(indent_5104+1))))((intercalate(($concat(";\n"))(printIndent_5102(indent_5104+1))))((map(jsStmtToString_5100(indent_5104+1)))(e_5105.$1)))))("\n")))(printIndent_5102(indent_5104))))("}")
    } else if(e_5105.$tag==6){
      var $phi$565 = ($concat(($concat(($concat(($concat(printParen_5107(e_5105.$0)))("?")))(printParen_5107(e_5105.$1))))(":")))(printParen_5107(e_5105.$2))
    } else if(e_5105.$tag==10){
      var $phi$565 = ($concat(($concat("{"))((intercalate(","))((map(keyValueToString_5099(indent_5104)))(e_5105.$0)))))("}")
    } else if(e_5105.$tag==11){
      var $phi$565 = ($concat(($concat("["))((intercalate(","))((map(print_5106))(e_5105.$0)))))("]")
    } else if(e_5105.$tag==14){
      var $phi$565 = ($concat(($concat(printParen_5107(e_5105.$0)))(" instanceof ")))(printParen_5107(e_5105.$1))
    } else if(e_5105.$tag==16){
      var $phi$565 = (intercalate(","))((map(print_5106))(e_5105.$0))
    } else var $phi$565 = error(e_5105);
    return $phi$565
  }
};
var jsExprToParenString_5098 = function(indent_5138){
  return function(e_5139){
    if(e_5139.$tag==0){
      var $phi$568 = (jsExprToString_5097(indent_5138))(e_5139)
    } else if(e_5139.$tag==7){
      var $phi$568 = (jsExprToString_5097(indent_5138))(e_5139)
    } else if(e_5139.$tag==8){
      var $phi$568 = (jsExprToString_5097(indent_5138))(e_5139)
    } else if(e_5139.$tag==9){
      var $phi$568 = (jsExprToString_5097(indent_5138))(e_5139)
    } else if(e_5139.$tag==1){
      var $phi$568 = (jsExprToString_5097(indent_5138))(e_5139)
    } else if(e_5139.$tag==15){
      var $phi$568 = (jsExprToString_5097(indent_5138))(e_5139)
    } else if(e_5139.$tag==10){
      var $phi$568 = (jsExprToString_5097(indent_5138))(e_5139)
    } else var $phi$568 = paren_5103((jsExprToString_5097(indent_5138))(e_5139));
    return $phi$568
  }
};
var keyValueToString_5099 = function(indent_5150){
  return function(kv_5151){
    var $phi$569 = ($concat(($concat(kv_5151.$0))(":")))((jsExprToString_5097(indent_5150))(kv_5151.$1));
    return $phi$569
  }
};
var jsStmtToString_5100 = function(indent_5154){
  return function(s_5155){
    if(s_5155.$tag==0){
      var $phi$570 = (jsExprToString_5097(indent_5154))(s_5155.$0)
    } else if(s_5155.$tag==1){
      var $phi$570 = ($concat("return "))((jsExprToString_5097(indent_5154))(s_5155.$0))
    } else if(s_5155.$tag==2){
      var $phi$570 = ($concat(($concat(($concat("var "))(s_5155.$0)))(" = ")))((jsExprToString_5097(indent_5154))(s_5155.$1))
    } else if(s_5155.$tag==4){
      var $phi$570 = "break"
    } else if(s_5155.$tag==3){
      var $phi$570 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat("switch"))(paren_5103((jsExprToString_5097(indent_5154))(s_5155.$0)))))("{\n")))(printIndent_5102(indent_5154+1))))((intercalate(($concat(";\n"))(printIndent_5102(indent_5154+1))))((map(caseToString_5101(indent_5154+1)))(s_5155.$1)))))("\n")))(printIndent_5102(indent_5154))))("}")
    } else if(s_5155.$tag==5){
      var $phi$570 = ($concat(($concat((jsExprToParenString_5098(indent_5154))(s_5155.$0)))(" = ")))((jsExprToParenString_5098(indent_5154))(s_5155.$1))
    } else if(s_5155.$tag==6){
      var $phi$572 = length(s_5155.$2);
      if(1==$phi$572){
        var $phi$571 = (jsStmtToString_5100(indent_5154))((getIx(0))(s_5155.$2))
      } else var $phi$571 = ($concat(($concat(($concat(($concat(($concat("{\n"))(printIndent_5102(indent_5154+1))))((intercalate(($concat(";\n"))(printIndent_5102(indent_5154+1))))((map(jsStmtToString_5100(indent_5154+1)))(s_5155.$2)))))("\n")))(printIndent_5102(indent_5154))))("}");
      var els_5167 = $phi$571;
      var $phi$570 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat(($concat("if("))((jsExprToString_5097(indent_5154))(s_5155.$0))))("){\n")))(printIndent_5102(indent_5154+1))))((intercalate(($concat(";\n"))(printIndent_5102(indent_5154+1))))((map(jsStmtToString_5100(indent_5154+1)))(s_5155.$1)))))("\n")))(printIndent_5102(indent_5154))))("} else ")))(els_5167)
    } else error("pattern match fail",s_5155);
    return $phi$570
  }
};
var caseToString_5101 = function(indent_5169){
  return function(c_5170){
    var $phi$573 = ($concat(($concat(($concat(($concat("case "))(paren_5103((jsExprToString_5097(indent_5169))(c_5170.$0)))))(":\n")))(printIndent_5102(indent_5169+1))))((intercalate(($concat(";\n"))(printIndent_5102(indent_5169+1))))((map(jsStmtToString_5100(indent_5169)))(c_5170.$1)));
    return $phi$573
  }
};
var assert_5176 = assert_85;
var Pair_5177 = Pair_3;
var mapSnd_5178 = mapSnd_84;
var mapFst_5179 = mapFst_83;
var $gt$eq$gt_5180 = $gt$eq$gt_82;
var snd_5181 = snd_23;
var debug2_5182 = debug2_81;
var Just_5183 = Just_1;
var Nothing_5184 = Nothing_2;
var isJust_5185 = isJust_21;
var Empty_5186 = Empty_7;
var Leaf_5187 = Leaf_8;
var Collision_5188 = Collision_9;
var BitmapIndexed_5189 = BitmapIndexed_10;
var $_5190 = $_12;
var fst_5191 = fst_22;
var Left_5192 = Left_4;
var Right_5193 = Right_5;
var loop_5194 = loop_27;
var find_5195 = find_29;
var hamtMask_5196 = hamtMask_58;
var popCount_5197 = popCount_57;
var hamtIndex_5198 = hamtIndex_59;
var lookup_5199 = lookup_60;
var setContains_5200 = setContains_76;
var foldTrie_5201 = foldTrie_66;
var emptySet_5202 = emptySet_72;
var Unit_5203 = Unit_0;
var not_5204 = not_26;
var $div$eq_5205 = $div$eq_13;
var mapIx_5206 = mapIx_30;
var insert_5207 = insert_61;
var setAdd_5208 = setAdd_73;
var setIntersection_5209 = setIntersection_80;
var remove_5210 = remove_63;
var setDiff_5211 = setDiff_79;
var setToArray_5212 = setToArray_78;
var mergeTrie_5213 = mergeTrie_70;
var setUnion_5214 = setUnion_77;
var setRemove_5215 = setRemove_75;
var setAddAll_5216 = setAddAll_74;
var trieKeys_5217 = trieKeys_71;
var size_5218 = size_68;
var mapTrie_5219 = mapTrie_67;
var nodeMask_5220 = nodeMask_56;
var isEmpty_5221 = isEmpty_69;
var filterTrie_5222 = filterTrie_65;
var nextSetBitMask_5223 = nextSetBitMask_64;
var updateOrSet_5224 = updateOrSet_62;
var State_5225 = State_6;
var runState_5226 = runState_54;
var evalState_5227 = evalState_55;
var sets_5228 = sets_53;
var gets_5229 = gets_52;
var foldM_5230 = foldM_49;
var mapM_5231 = mapM_50;
var forM_5232 = forM_51;
var strToArray_5233 = strToArray_48;
var toRecord_5234 = toRecord_47;
var reverse_5235 = reverse_46;
var tail_5236 = tail_41;
var head_5237 = head_40;
var uniq_5238 = uniq_45;
var mergeSet_5239 = mergeSet_44;
var init_5240 = init_43;
var last_5241 = last_42;
var mapJust_5242 = mapJust_39;
var concatMap_5243 = concatMap_38;
var zip_5244 = zip_37;
var zipWithIndex2_5245 = zipWithIndex2_35;
var zipWithIndex_5246 = zipWithIndex_36;
var join_5247 = join_34;
var all_5248 = all_33;
var exists_5249 = exists_32;
var containsChar_5250 = containsChar_31;
var contains_5251 = contains_28;
var either_5252 = either_24;
var splitEither_5253 = splitEither_25;
var fromJust_5254 = fromJust_20;
var justOr_5255 = justOr_19;
var maybe_5256 = maybe_18;
var $gt$gt_5257 = $gt$gt_17;
var $gt$eq_5258 = $gt$eq_16;
var $lt$eq_5259 = $lt$eq_15;
var $gt_5260 = $gt_14;
var Identity_5261 = Identity_11;
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
var App_5262 = App_731;
var Lam_5263 = Lam_732;
var Case_5264 = Case_733;
var Let_5265 = Let_734;
var New_5266 = New_735;
var breakableDownAndUpM_5267 = breakableDownAndUpM_782;
var breakableDownM_5268 = breakableDownM_786;
var downAndUpM_5269 = downAndUpM_783;
var downM_5270 = downM_785;
var upM_5271 = upM_784;
var breakableDownAndUp_5272 = breakableDownAndUp_777;
var breakableDown_5273 = breakableDown_781;
var downAndUp_5274 = downAndUp_778;
var down_5275 = down_780;
var up_5276 = up_779;
var AnnType_5277 = AnnType_723;
var TUnknown_5278 = TUnknown_755;
var getAnn_5279 = getAnn_760;
var getAnnType_5280 = getAnnType_763;
var Var_5281 = Var_729;
var Const_5282 = Const_730;
var annOf_5283 = annOf_774;
var getType_5284 = getType_776;
var withAnn_5285 = withAnn_775;
var setAnn_5286 = setAnn_761;
var setAnnType_5287 = setAnnType_764;
var setType_5288 = setType_773;
var Data_5289 = Data_743;
var DataCon_5290 = DataCon_744;
var dataConName_5291 = dataConName_771;
var dataConNames_5292 = dataConNames_772;
var TCBound_5293 = TCBound_747;
var TConst_5294 = TConst_748;
var TVar_5295 = TVar_749;
var TSkolem_5296 = TSkolem_750;
var TApp_5297 = TApp_751;
var TRow_5298 = TRow_752;
var TBot_5299 = TBot_753;
var TForall_5300 = TForall_754;
var equivBound_5301 = equivBound_769;
var equivType_5302 = equivType_770;
var getAnnCodeLoc_5303 = getAnnCodeLoc_765;
var AnnCodeLoc_5304 = AnnCodeLoc_724;
var printCodeLoc_5305 = printCodeLoc_767;
var exprLoc_5306 = exprLoc_768;
var setAnnCodeLoc_5307 = setAnnCodeLoc_766;
var copyAnn_5308 = copyAnn_762;
var emptyAnn_5309 = emptyAnn_759;
var ImportAll_5310 = ImportAll_758;
var ImportOpen_5311 = ImportOpen_757;
var ImportClosed_5312 = ImportClosed_756;
var Instance_5313 = Instance_746;
var Class_5314 = Class_745;
var ModuleInterface_5315 = ModuleInterface_742;
var Module_5316 = Module_741;
var PData_5317 = PData_740;
var PConst_5318 = PConst_739;
var PVar_5319 = PVar_738;
var CStr_5320 = CStr_737;
var CNum_5321 = CNum_736;
var AnnExport_5322 = AnnExport_728;
var AnnTag_5323 = AnnTag_727;
var AnnData_5324 = AnnData_726;
var AnnUseCount_5325 = AnnUseCount_725;
var JSIf_5326 = JSIf_4790;
var JSAssign_5327 = JSAssign_4789;
var JSBreak_5328 = JSBreak_4788;
var JSSwitch_5329 = JSSwitch_4787;
var JSVar_5330 = JSVar_4786;
var JSReturn_5331 = JSReturn_4785;
var JSExpr_5332 = JSExpr_4784;
var JSSeq_5333 = JSSeq_4783;
var JSNew_5334 = JSNew_4782;
var JSInstanceOf_5335 = JSInstanceOf_4781;
var JSUndefined_5336 = JSUndefined_4780;
var JSNull_5337 = JSNull_4779;
var JSArray_5338 = JSArray_4778;
var JSObject_5339 = JSObject_4777;
var JSBool_5340 = JSBool_4776;
var JSString_5341 = JSString_4775;
var JSNum_5342 = JSNum_4774;
var JSTernary_5343 = JSTernary_4773;
var JSFun_5344 = JSFun_4772;
var JSCall_5345 = JSCall_4771;
var JSBinOp_5346 = JSBinOp_4770;
var JSUnOp_5347 = JSUnOp_4769;
var JSIndex_5348 = JSIndex_4768;
var JSRef_5349 = JSRef_4767;
var RewriteState_5350 = function($_0_5371){
  return function($_1_5372){
    return function($_2_5373){
      return function($_3_5374){
        return {$0:$_0_5371,$1:$_1_5372,$2:$_2_5373,$3:$_3_5374}
      }
    }
  }
};
var opChar_5370 = function(c_5617){
  if("-"==c_5617){
    var $phi$574 = "$mns"
  } else if("+"==c_5617){
    var $phi$574 = "$pls"
  } else if("*"==c_5617){
    var $phi$574 = "$mul"
  } else if("/"==c_5617){
    var $phi$574 = "$div"
  } else if("="==c_5617){
    var $phi$574 = "$eq"
  } else if(":"==c_5617){
    var $phi$574 = "$col"
  } else if("&"==c_5617){
    var $phi$574 = "$amp"
  } else if("|"==c_5617){
    var $phi$574 = "$pip"
  } else if("<"==c_5617){
    var $phi$574 = "$lt"
  } else if(">"==c_5617){
    var $phi$574 = "$gt"
  } else if("^"==c_5617){
    var $phi$574 = "$rof"
  } else var $phi$574 = c_5617;
  return $phi$574
};
var opName_5369 = function(op_5613){
  if("+"==op_5613){
    var $phi$575 = "$add"
  } else if("-"==op_5613){
    var $phi$575 = "$del"
  } else if("*"==op_5613){
    var $phi$575 = "$mul"
  } else if("&&"==op_5613){
    var $phi$575 = "$and"
  } else if("||"==op_5613){
    var $phi$575 = "$or"
  } else if("++"==op_5613){
    var $phi$575 = "$concat"
  } else var $phi$575 = ((foldl(function(s_5615){
    return function(c_5616){
      return ($concat(s_5615))(opChar_5370(c_5616))
    }
  }))(""))(strToArray_5233(op_5613));
  return $phi$575
};
var processPattern_5362 = function(cons_5537){
  return function(pm_5538){
    return function(p_5539){
      if((p_5539.$tag==0)&&("_"==p_5539.$1)){
        var $phi$576 = (Pair_5177(JSBool_5340(true)))((Pair_5177([]))([]))
      } else if(p_5539.$tag==0){
        var $phi$576 = (Pair_5177(JSBool_5340(true)))((Pair_5177([opName_5369(p_5539.$1)]))([pm_5538]))
      } else if((p_5539.$tag==1)&&(p_5539.$1.$tag==0)){
        var $phi$576 = (Pair_5177(((JSBinOp_5346("=="))(JSNum_5342(p_5539.$1.$0)))(pm_5538)))((Pair_5177([]))([]))
      } else if((p_5539.$tag==1)&&(p_5539.$1.$tag==1)){
        var $phi$576 = (Pair_5177(((JSBinOp_5346("=="))(JSString_5341(p_5539.$1.$0)))(pm_5538)))((Pair_5177([]))([]))
      } else if((p_5539.$tag==2)&&("True"==p_5539.$1)){
        var $phi$576 = (Pair_5177(pm_5538))((Pair_5177([]))([]))
      } else if((p_5539.$tag==2)&&("False"==p_5539.$1)){
        var $phi$576 = (Pair_5177((JSUnOp_5347("!"))(pm_5538)))((Pair_5177([]))([]))
      } else if(p_5539.$tag==2){
        var $phi$578 = (((lookup_5199($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_5539.$1))(cons_5537);
        if(($phi$578.$tag==0)&&($phi$578.$0.$tag==1)){
          var $phi$577 = JSBool_5340(true)
        } else if(($phi$578.$tag==0)&&($phi$578.$0.$tag==0)){
          var $phi$577 = ((JSBinOp_5346("=="))((JSIndex_5348(pm_5538))(JSString_5341("$tag"))))(JSNum_5342($phi$578.$0.$0))
        } else var $phi$577 = error(($concat("unknown data type in code gen: "))(p_5539.$1));
        var tagCheck_5554 = $phi$577;
        var $phi$576 = ((foldl(function(a_5557){
          return function(b_5558){
            var $phi$580 = (Pair_5177(((JSBinOp_5346("&&"))(a_5557.$0))(b_5558.$0)))((Pair_5177((concat(a_5557.$1.$0))(b_5558.$1.$0)))((concat(a_5557.$1.$1))(b_5558.$1.$1)));
            var $phi$579 = $phi$580;
            return $phi$579
          }
        }))((Pair_5177(tagCheck_5554))((Pair_5177([]))([]))))((map(function(p_5565){
          var $phi$581 = ((processPattern_5362(cons_5537))((JSIndex_5348(pm_5538))(JSString_5341(($concat("$"))(intToString(p_5565.$0))))))(p_5565.$1);
          return $phi$581
        }))(zipWithIndex_5246(p_5539.$2)))
      } else var $phi$576 = error("failure to match pattern during processing");
      return $phi$576
    }
  }
};
var addStmt_5352 = function(stmt_5380){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_5229))(function(s_5381){
    var $phi$582 = sets_5228((((RewriteState_5350(s_5381.$0))(s_5381.$1))((push(stmt_5380))(s_5381.$2)))(s_5381.$3));
    return $phi$582
  })
};
var addVar_5353 = function(n_5386){
  return function(e_5387){
    return addStmt_5352((JSVar_5330(opName_5369(n_5386)))(e_5387))
  }
};
var newPhi_5354 = (($gt$gt$eq($import1$instance$Monad$11))(gets_5229))(function(s_5388){
  var $phi$583 = (($gt$gt_5257($import1$instance$Monad$11))(sets_5228((((RewriteState_5350(s_5388.$0))(s_5388.$1))(s_5388.$2))(s_5388.$3+1))))((ret($import1$instance$Monad$11))(($concat("$phi$"))(intToString(s_5388.$3))));
  return $phi$583
});
var getRep_5357 = function(n_5419){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_5229))(function(s_5420){
    var $phi$584 = (ret($import1$instance$Monad$11))((((lookup_5199($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_5419))(s_5420.$1));
    return $phi$584
  })
};
var getCons_5358 = (($gt$gt$eq($import1$instance$Monad$11))(gets_5229))(function(s_5425){
  var $phi$585 = (ret($import1$instance$Monad$11))(s_5425.$0);
  return $phi$585
});
var dataConFieldIds_5366 = function(ts_5579){
  return (map(function(p_5580){
    return ($concat("$"))(intToString(fst_5191(p_5580)))
  }))(zipWithIndex_5246(ts_5579))
};
var withRep_5356 = function(rep_5406){
  return function(m_5407){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_5229))(function(s_5408){
      var $phi$586 = (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_5257($import1$instance$Monad$11))(sets_5228((((RewriteState_5350(s_5408.$0))((((mergeTrie_5213($import1$instance$Hashable$13))($import1$instance$Eq$1))(s_5408.$1))(rep_5406)))(s_5408.$2))(s_5408.$3))))(m_5407)))(function(r_5413){
        return (($gt$gt$eq($import1$instance$Monad$11))(gets_5229))(function(s_5414){
          var $phi$587 = (($gt$gt_5257($import1$instance$Monad$11))(sets_5228((((RewriteState_5350(s_5414.$0))(s_5408.$1))(s_5414.$2))(s_5414.$3))))((ret($import1$instance$Monad$11))(r_5413));
          return $phi$587
        })
      });
      return $phi$586
    })
  }
};
var binOp2_5351 = function(op_5375){
  return function(a_5376){
    return function(b_5377){
      return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5359(a_5376)))(function(a_5378){
        return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5359(b_5377)))(function(b_5379){
          return (ret($import1$instance$Monad$11))(((JSBinOp_5346(op_5375))(a_5378))(b_5379))
        })
      })
    }
  }
};
var rewriteExprToStmts_5355 = function(w_5393){
  return function(e_5394){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_5229))(function(s_5395){
      var $phi$588 = (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_5257($import1$instance$Monad$11))(sets_5228((((RewriteState_5350(s_5395.$0))(s_5395.$1))([]))(s_5395.$3))))(rewriteExpr_5359(e_5394))))(function(e_5400){
        return (($gt$gt$eq($import1$instance$Monad$11))(gets_5229))(function(s_5401){
          var $phi$589 = (($gt$gt_5257($import1$instance$Monad$11))(sets_5228((((RewriteState_5350(s_5401.$0))(s_5401.$1))(s_5395.$2))(s_5401.$3))))((ret($import1$instance$Monad$11))((push(w_5393(e_5400)))(s_5401.$2)));
          return $phi$589
        })
      });
      return $phi$588
    })
  }
};
var rewriteExpr_5359 = function(e_5430){
  if((e_5430.$tag==0)&&("True"==e_5430.$1)){
    var $phi$590 = (ret($import1$instance$Monad$11))(JSBool_5340(true))
  } else if((e_5430.$tag==0)&&("False"==e_5430.$1)){
    var $phi$590 = (ret($import1$instance$Monad$11))(JSBool_5340(false))
  } else if(e_5430.$tag==0){
    var $phi$590 = (($gt$gt$eq($import1$instance$Monad$11))(getRep_5357(opName_5369(e_5430.$1))))(function(r_5435){
      if(r_5435.$tag==1){
        var $phi$595 = (ret($import1$instance$Monad$11))(JSRef_5349(opName_5369(e_5430.$1)))
      } else if(r_5435.$tag==0){
        var $phi$595 = (ret($import1$instance$Monad$11))(r_5435.$0)
      } else error("pattern match fail",r_5435);
      return $phi$595
    })
  } else if((e_5430.$tag==1)&&(e_5430.$1.$tag==0)){
    var $phi$590 = (ret($import1$instance$Monad$11))(JSNum_5342(e_5430.$1.$0))
  } else if((e_5430.$tag==1)&&(e_5430.$1.$tag==1)){
    var $phi$590 = (ret($import1$instance$Monad$11))(JSString_5341(e_5430.$1.$0))
  } else if((e_5430.$tag==2)&&((e_5430.$1.$tag==2)&&((e_5430.$1.$1.$tag==0)&&("+"==e_5430.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5351("+"))(e_5430.$1.$2))(e_5430.$2)
  } else if((e_5430.$tag==2)&&((e_5430.$1.$tag==2)&&((e_5430.$1.$1.$tag==0)&&("-"==e_5430.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5351("-"))(e_5430.$1.$2))(e_5430.$2)
  } else if((e_5430.$tag==2)&&((e_5430.$1.$tag==2)&&((e_5430.$1.$1.$tag==0)&&("*"==e_5430.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5351("*"))(e_5430.$1.$2))(e_5430.$2)
  } else if((e_5430.$tag==2)&&((e_5430.$1.$tag==2)&&((e_5430.$1.$1.$tag==0)&&("jsLt"==e_5430.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5351("<"))(e_5430.$1.$2))(e_5430.$2)
  } else if((e_5430.$tag==2)&&((e_5430.$1.$tag==2)&&((e_5430.$1.$1.$tag==0)&&("jsEq"==e_5430.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5351("==="))(e_5430.$1.$2))(e_5430.$2)
  } else if((e_5430.$tag==2)&&((e_5430.$1.$tag==2)&&((e_5430.$1.$1.$tag==0)&&("bitAnd"==e_5430.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5351("&"))(e_5430.$1.$2))(e_5430.$2)
  } else if((e_5430.$tag==2)&&((e_5430.$1.$tag==2)&&((e_5430.$1.$1.$tag==0)&&("bitOr"==e_5430.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5351("|"))(e_5430.$1.$2))(e_5430.$2)
  } else if((e_5430.$tag==2)&&((e_5430.$1.$tag==2)&&((e_5430.$1.$1.$tag==0)&&("bitShiftLeft"==e_5430.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5351("<<"))(e_5430.$1.$2))(e_5430.$2)
  } else if((e_5430.$tag==2)&&((e_5430.$1.$tag==2)&&((e_5430.$1.$1.$tag==0)&&("bitShiftRight"==e_5430.$1.$1.$1)))){
    var $phi$590 = ((binOp2_5351(">>>"))(e_5430.$1.$2))(e_5430.$2)
  } else if(e_5430.$tag==2){
    var $phi$590 = (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5359(e_5430.$1)))(function(f_5489){
      return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5359(e_5430.$2)))(function(a_5490){
        return (ret($import1$instance$Monad$11))((JSCall_5345(f_5489))([a_5490]))
      })
    })
  } else if(e_5430.$tag==3){
    var $phi$590 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExprToStmts_5355(JSReturn_5331))(e_5430.$2)))(function(stmts_5494){
      return (ret($import1$instance$Monad$11))((JSFun_5344([e_5430.$1]))(stmts_5494))
    })
  } else if(e_5430.$tag==4){
    var $phi$590 = (($gt$gt$eq($import1$instance$Monad$11))(newPhi_5354))(function(phiOut_5498){
      return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5359(e_5430.$1)))(function(e_5499){
        if(e_5499.$tag==0){
          var $phi$594 = (ret($import1$instance$Monad$11))(e_5499)
        } else if(e_5499.$tag==1){
          var $phi$594 = (ret($import1$instance$Monad$11))(e_5499)
        } else var $phi$594 = (($gt$gt$eq($import1$instance$Monad$11))(newPhi_5354))(function(p_5504){
          return (($gt$gt_5257($import1$instance$Monad$11))((addVar_5353(p_5504))(e_5499)))((ret($import1$instance$Monad$11))(JSRef_5349(p_5504)))
        });
        return (($gt$gt$eq($import1$instance$Monad$11))($phi$594))(function(phiIn_5505){
          return (($gt$gt_5257($import1$instance$Monad$11))((($gt$gt$eq($import1$instance$Monad$11))((((foldM_5230($import1$instance$Monad$11))((assemblePatternMatch2_5360(phiIn_5505))(phiOut_5498)))(JSExpr_5332((JSCall_5345(JSRef_5349("error")))([JSString_5341("pattern match fail"),phiIn_5505]))))(reverse_5235(e_5430.$2))))(addStmt_5352)))((ret($import1$instance$Monad$11))(JSRef_5349(phiOut_5498)))
        })
      })
    })
  } else if(e_5430.$tag==5){
    var $phi$590 = (($gt$gt_5257($import1$instance$Monad$11))(((mapM_5231($import1$instance$Monad$11))(function(d_5509){
      var $phi$593 = (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5359(d_5509.$1)))(addVar_5353(d_5509.$0));
      return $phi$593
    }))(e_5430.$1)))(rewriteExpr_5359(e_5430.$2))
  } else if((e_5430.$tag==6)&&("Array"==e_5430.$1)){
    var $phi$590 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_5231($import1$instance$Monad$11))(rewriteExpr_5359))(e_5430.$2)))(function(es_5514){
      return (ret($import1$instance$Monad$11))(JSArray_5338(es_5514))
    })
  } else if(e_5430.$tag==6){
    var $phi$590 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_5231($import1$instance$Monad$11))(rewriteExpr_5359))(e_5430.$2)))(function(es_5518){
      return (($gt$gt$eq($import1$instance$Monad$11))(getCons_5358))(function(cons_5519){
        var $phi$592 = (((lookup_5199($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_5430.$1))(cons_5519);
        if($phi$592.$tag==1){
          var $phi$591 = error(($concat("unrecognized tag in New: "))(e_5430.$1))
        } else if(($phi$592.$tag==0)&&($phi$592.$0.$tag==1)){
          var $phi$591 = (ret($import1$instance$Monad$11))(JSObject_5339((zip_5244(dataConFieldIds_5366(es_5518)))(es_5518)))
        } else if(($phi$592.$tag==0)&&($phi$592.$0.$tag==0)){
          var $phi$591 = (ret($import1$instance$Monad$11))(JSObject_5339((push((Pair_5177("$tag"))(JSNum_5342($phi$592.$0.$0))))((zip_5244(dataConFieldIds_5366(es_5518)))(es_5518))))
        } else error("pattern match fail",$phi$592);
        return $phi$591
      })
    })
  } else error("pattern match fail",e_5430);
  return $phi$590
};
var assemblePatternMatch2_5360 = function(phiIn_5521){
  return function(phiOut_5522){
    return function(alt_5523){
      return function(p_5524){
        return (($gt$gt$eq($import1$instance$Monad$11))(getCons_5358))(function(cons_5525){
          var $phi$598 = ((processPattern_5362(cons_5525))(phiIn_5521))(p_5524.$0);
          var rep_5531 = ((foldl(function(r_5532){
            return function(p_5533){
              return ((((insert_5207($import1$instance$Hashable$13))($import1$instance$Eq$1))(fst_5191(p_5533)))(snd_5181(p_5533)))(r_5532)
            }
          }))(Empty_5186))((zip_5244($phi$598.$1.$0))($phi$598.$1.$1));
          var $phi$597 = (($gt$gt$eq($import1$instance$Monad$11))((withRep_5356(rep_5531))((rewriteExprToStmts_5355(JSVar_5330(phiOut_5522)))(p_5524.$1))))(function(stmts_5534){
            return (ret($import1$instance$Monad$11))(((JSIf_5326($phi$598.$0))(stmts_5534))([alt_5523]))
          });
          var $phi$596 = $phi$597;
          return $phi$596
        })
      }
    }
  }
};
var requireExpr_5363 = function(f_5569){
  return (JSCall_5345(JSRef_5349("_require")))([JSString_5341(f_5569)])
};
var buildImports_5364 = function(f_5570){
  return function(ns_5571){
    return (map(function(n_5572){
      var $phi$599 = (JSVar_5330(opName_5369(n_5572.$1)))((JSIndex_5348(requireExpr_5363(f_5570)))(JSString_5341(opName_5369(n_5572.$0))));
      return $phi$599
    }))(ns_5571)
  }
};
var importToJs_5365 = function(i_5575){
  if(i_5575.$tag==1){
    var $phi$600 = (buildImports_5364(i_5575.$1))(i_5575.$2)
  } else error("pattern match fail",i_5575);
  return $phi$600
};
var exportObject_5367 = function(bs_5581){
  var f_5582 = function(b_5583){
    var $phi$603 = (((getAnn_5279($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_5283(b_5583.$1));
    if($phi$603.$tag==1){
      var $phi$602 = Nothing_5184
    } else if(($phi$603.$tag==0)&&($phi$603.$0.$tag==5)){
      var $phi$602 = Just_5183((Pair_5177(opName_5369($phi$603.$0.$0)))(JSRef_5349(opName_5369(b_5583.$0))))
    } else error("pattern match fail",$phi$603);
    var $phi$601 = $phi$602;
    return $phi$601
  };
  return JSObject_5339((mapJust_5242(f_5582))(bs_5581))
};
var moduleToJs_5368 = function(m_5587){
  var f_5606 = function(p_5607){
    var $phi$605 = not_5204(isJust_5185((((getAnn_5279($import1$instance$Hashable$13))($import1$instance$Eq$1))("dead"))(annOf_5283(p_5607.$1))));
    return $phi$605
  };
  var vs2_5598 = (filter(f_5606))(m_5587.$6);
  var exportDef_5600 = (JSVar_5330("exports"))(exportObject_5367(vs2_5598));
  var gatherCons_5596 = function(local$instance$Hashable$1){
    return function(local$instance$Eq$0){
      return function(m_5601){
        return function(d_5602){
          var $phi$608 = (((getAnn_5279($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(annOf_5283(d_5602.$1));
          if($phi$608.$tag==1){
            var $phi$607 = m_5601
          } else if(($phi$608.$tag==0)&&($phi$608.$0.$tag==3)){
            var $phi$607 = ((((insert_5207(local$instance$Hashable$1))(local$instance$Eq$0))(d_5602.$0))($phi$608.$0.$0))(m_5601)
          } else error("pattern match fail",$phi$608);
          var $phi$606 = $phi$607;
          return $phi$606
        }
      }
    }
  };
  var cons_5597 = ((foldl((gatherCons_5596($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_5186))(m_5587.$6);
  var defs_5599 = ($_5190(foldl1(concat)))((evalState_5227((((RewriteState_5350(cons_5597))(Empty_5186))([]))(0)))(((mapM_5231($import1$instance$Monad$11))(function(v_5610){
    var $phi$609 = (rewriteExprToStmts_5355(JSVar_5330(opName_5369(v_5610.$0))))(v_5610.$1);
    return $phi$609
  }))(vs2_5598)));
  var imports_5595 = (concatMap_5243(importToJs_5365))(m_5587.$2);
  var $phi$604 = (push(exportDef_5600))((concat(imports_5595))(defs_5599));
  return $phi$604
};
var checkUndefined_5361 = function(label_5535){
  return function(expr_5536){
    return ((JSTernary_5343(((JSBinOp_5346("==="))(expr_5536))(JSUndefined_5336)))((JSCall_5345(JSRef_5349("error")))([JSString_5341(label_5535)])))(expr_5536)
  }
};
var assert_5619 = assert_85;
var Pair_5620 = Pair_3;
var mapSnd_5621 = mapSnd_84;
var mapFst_5622 = mapFst_83;
var $gt$eq$gt_5623 = $gt$eq$gt_82;
var snd_5624 = snd_23;
var debug2_5625 = debug2_81;
var Just_5626 = Just_1;
var Nothing_5627 = Nothing_2;
var isJust_5628 = isJust_21;
var Empty_5629 = Empty_7;
var Leaf_5630 = Leaf_8;
var Collision_5631 = Collision_9;
var BitmapIndexed_5632 = BitmapIndexed_10;
var $_5633 = $_12;
var fst_5634 = fst_22;
var Left_5635 = Left_4;
var Right_5636 = Right_5;
var loop_5637 = loop_27;
var find_5638 = find_29;
var hamtMask_5639 = hamtMask_58;
var popCount_5640 = popCount_57;
var hamtIndex_5641 = hamtIndex_59;
var lookup_5642 = lookup_60;
var setContains_5643 = setContains_76;
var foldTrie_5644 = foldTrie_66;
var emptySet_5645 = emptySet_72;
var Unit_5646 = Unit_0;
var not_5647 = not_26;
var $div$eq_5648 = $div$eq_13;
var mapIx_5649 = mapIx_30;
var insert_5650 = insert_61;
var setAdd_5651 = setAdd_73;
var setIntersection_5652 = setIntersection_80;
var remove_5653 = remove_63;
var setDiff_5654 = setDiff_79;
var setToArray_5655 = setToArray_78;
var mergeTrie_5656 = mergeTrie_70;
var setUnion_5657 = setUnion_77;
var setRemove_5658 = setRemove_75;
var setAddAll_5659 = setAddAll_74;
var trieKeys_5660 = trieKeys_71;
var size_5661 = size_68;
var mapTrie_5662 = mapTrie_67;
var nodeMask_5663 = nodeMask_56;
var isEmpty_5664 = isEmpty_69;
var filterTrie_5665 = filterTrie_65;
var nextSetBitMask_5666 = nextSetBitMask_64;
var updateOrSet_5667 = updateOrSet_62;
var State_5668 = State_6;
var runState_5669 = runState_54;
var evalState_5670 = evalState_55;
var sets_5671 = sets_53;
var gets_5672 = gets_52;
var foldM_5673 = foldM_49;
var mapM_5674 = mapM_50;
var forM_5675 = forM_51;
var strToArray_5676 = strToArray_48;
var toRecord_5677 = toRecord_47;
var reverse_5678 = reverse_46;
var tail_5679 = tail_41;
var head_5680 = head_40;
var uniq_5681 = uniq_45;
var mergeSet_5682 = mergeSet_44;
var init_5683 = init_43;
var last_5684 = last_42;
var mapJust_5685 = mapJust_39;
var concatMap_5686 = concatMap_38;
var zip_5687 = zip_37;
var zipWithIndex2_5688 = zipWithIndex2_35;
var zipWithIndex_5689 = zipWithIndex_36;
var join_5690 = join_34;
var all_5691 = all_33;
var exists_5692 = exists_32;
var containsChar_5693 = containsChar_31;
var contains_5694 = contains_28;
var either_5695 = either_24;
var splitEither_5696 = splitEither_25;
var fromJust_5697 = fromJust_20;
var justOr_5698 = justOr_19;
var maybe_5699 = maybe_18;
var $gt$gt_5700 = $gt$gt_17;
var $gt$eq_5701 = $gt$eq_16;
var $lt$eq_5702 = $lt$eq_15;
var $gt_5703 = $gt_14;
var Identity_5704 = Identity_11;
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
var moduleToJs_5705 = moduleToJs_5368;
var jsExprToString_5706 = jsExprToString_5097;
var jsStmtToString_5707 = jsStmtToString_5100;
var rewriteStmt_5708 = rewriteStmt_4939;
var compileModule_5709 = function(builtinsPath_5710){
  return function(m_5711){
    var runStmt_5717 = "if (module.exports.main)module.exports.main(process.argv)";
    var requireFun_5716 = ($concat(($concat("function _require(f) {\n"))("  return f == \"./builtins.js\" ? $$builtins : require(f);\n")))("}\n");
    var js_5714 = (join_5690((map(jsStmtToString_5707(0)))((concatMap_5686(rewriteStmt_5708))(moduleToJs_5705(m_5711)))))(";\n");
    var wrapModule_5715 = function(m_5718){
      return ($concat(($concat("(function() {"))(js_5714)))("\nmodule.exports = exports;})();")
    };
    var fullBuiltins_5712 = readFile(builtinsPath_5710);
    var wrappedBuiltins_5713 = ($concat(($concat("const $$builtins = (function() {\n const module = {};\n"))(fullBuiltins_5712)))(";\n return builtins})();\n");
    return ($concat(($concat(($concat(wrappedBuiltins_5713))(requireFun_5716)))(wrapModule_5715(m_5711))))(runStmt_5717)
  }
};
var assert_5719 = assert_85;
var Pair_5720 = Pair_3;
var mapSnd_5721 = mapSnd_84;
var mapFst_5722 = mapFst_83;
var $gt$eq$gt_5723 = $gt$eq$gt_82;
var snd_5724 = snd_23;
var debug2_5725 = debug2_81;
var Just_5726 = Just_1;
var Nothing_5727 = Nothing_2;
var isJust_5728 = isJust_21;
var Empty_5729 = Empty_7;
var Leaf_5730 = Leaf_8;
var Collision_5731 = Collision_9;
var BitmapIndexed_5732 = BitmapIndexed_10;
var $_5733 = $_12;
var fst_5734 = fst_22;
var Left_5735 = Left_4;
var Right_5736 = Right_5;
var loop_5737 = loop_27;
var find_5738 = find_29;
var hamtMask_5739 = hamtMask_58;
var popCount_5740 = popCount_57;
var hamtIndex_5741 = hamtIndex_59;
var lookup_5742 = lookup_60;
var setContains_5743 = setContains_76;
var foldTrie_5744 = foldTrie_66;
var emptySet_5745 = emptySet_72;
var Unit_5746 = Unit_0;
var not_5747 = not_26;
var $div$eq_5748 = $div$eq_13;
var mapIx_5749 = mapIx_30;
var insert_5750 = insert_61;
var setAdd_5751 = setAdd_73;
var setIntersection_5752 = setIntersection_80;
var remove_5753 = remove_63;
var setDiff_5754 = setDiff_79;
var setToArray_5755 = setToArray_78;
var mergeTrie_5756 = mergeTrie_70;
var setUnion_5757 = setUnion_77;
var setRemove_5758 = setRemove_75;
var setAddAll_5759 = setAddAll_74;
var trieKeys_5760 = trieKeys_71;
var size_5761 = size_68;
var mapTrie_5762 = mapTrie_67;
var nodeMask_5763 = nodeMask_56;
var isEmpty_5764 = isEmpty_69;
var filterTrie_5765 = filterTrie_65;
var nextSetBitMask_5766 = nextSetBitMask_64;
var updateOrSet_5767 = updateOrSet_62;
var State_5768 = State_6;
var runState_5769 = runState_54;
var evalState_5770 = evalState_55;
var sets_5771 = sets_53;
var gets_5772 = gets_52;
var foldM_5773 = foldM_49;
var mapM_5774 = mapM_50;
var forM_5775 = forM_51;
var strToArray_5776 = strToArray_48;
var toRecord_5777 = toRecord_47;
var reverse_5778 = reverse_46;
var tail_5779 = tail_41;
var head_5780 = head_40;
var uniq_5781 = uniq_45;
var mergeSet_5782 = mergeSet_44;
var init_5783 = init_43;
var last_5784 = last_42;
var mapJust_5785 = mapJust_39;
var concatMap_5786 = concatMap_38;
var zip_5787 = zip_37;
var zipWithIndex2_5788 = zipWithIndex2_35;
var zipWithIndex_5789 = zipWithIndex_36;
var join_5790 = join_34;
var all_5791 = all_33;
var exists_5792 = exists_32;
var containsChar_5793 = containsChar_31;
var contains_5794 = contains_28;
var either_5795 = either_24;
var splitEither_5796 = splitEither_25;
var fromJust_5797 = fromJust_20;
var justOr_5798 = justOr_19;
var maybe_5799 = maybe_18;
var $gt$gt_5800 = $gt$gt_17;
var $gt$eq_5801 = $gt$eq_16;
var $lt$eq_5802 = $lt$eq_15;
var $gt_5803 = $gt_14;
var Identity_5804 = Identity_11;
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
var Success_5805 = function($_0_5820){
  return function($_1_5821){
    return {$0:$_0_5820,$1:$_1_5821,$tag:0}
  }
};
var Error_5806 = function($_0_5822){
  return {$0:$_0_5822,$tag:1}
};
var Parser_5807 = function($_0_5823){
  return {$0:$_0_5823}
};
var $instance$Functor$0 = $class$Functor(function(f_5857){
  return function(pa_5858){
    var $phi$610 = Parser_5807(function(i_5860){
      var $phi$612 = pa_5858.$0(i_5860);
      if($phi$612.$tag==1){
        var $phi$611 = Error_5806($phi$612.$0)
      } else if($phi$612.$tag==0){
        var $phi$611 = (Success_5805(f_5857($phi$612.$0)))($phi$612.$1)
      } else error("pattern match fail",$phi$612);
      return $phi$611
    });
    return $phi$610
  }
});
var $instance$Applicative$1 = ($class$Applicative(function(x_5864){
  return Parser_5807(Success_5805(x_5864))
}))(function(pf_5865){
  return function(pa_5866){
    var $phi$614 = Parser_5807(function(i_5869){
      var $phi$616 = pf_5865.$0(i_5869);
      if($phi$616.$tag==1){
        var $phi$615 = Error_5806($phi$616.$0)
      } else if($phi$616.$tag==0){
        var $phi$618 = pa_5866.$0($phi$616.$1);
        if($phi$618.$tag==1){
          var $phi$617 = Error_5806($phi$618.$0)
        } else if($phi$618.$tag==0){
          var $phi$617 = (Success_5805($phi$616.$0($phi$618.$0)))($phi$618.$1)
        } else error("pattern match fail",$phi$618);
        var $phi$615 = $phi$617
      } else error("pattern match fail",$phi$616);
      return $phi$615
    });
    var $phi$613 = $phi$614;
    return $phi$613
  }
});
var $instance$Alternative$2 = ($class$Alternative(Parser_5807(function(__5876){
  return Error_5806("parser failure")
})))(function(pa_5877){
  return function(pb_5878){
    var $phi$620 = Parser_5807(function(i_5881){
      var $phi$622 = pa_5877.$0(i_5881);
      if($phi$622.$tag==1){
        var $phi$621 = pb_5878.$0(i_5881)
      } else if($phi$622.$tag==0){
        var $phi$621 = (Success_5805($phi$622.$0))($phi$622.$1)
      } else error("pattern match fail",$phi$622);
      return $phi$621
    });
    var $phi$619 = $phi$620;
    return $phi$619
  }
});
var upperCaseLetters_5818 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var letters_5819 = ($concat("abcdefghijklmnopqrstuvwxyz"))(upperCaseLetters_5818);
var digits_5817 = "0123456789";
var applyParser_5808 = function(p_5824){
  return function(i_5825){
    var $phi$623 = p_5824.$0(i_5825);
    return $phi$623
  }
};
var many_5811 = function(p_5835){
  var manyIterate_5836 = function(s_5837){
    var r_5838 = ((iterate(Left_5735((Success_5805([]))(s_5837))))(function(r_5839){
      if(r_5839.$tag==0){
        var $phi$624 = false
      } else if(r_5839.$tag==1){
        var $phi$624 = true
      } else error("pattern match fail",r_5839);
      return $phi$624
    }))(function(rs_5842){
      if((rs_5842.$tag==0)&&(rs_5842.$0.$tag==0)){
        var $phi$627 = (applyParser_5808(p_5835))(rs_5842.$0.$1);
        if($phi$627.$tag==0){
          var $phi$626 = Left_5735((Success_5805((push($phi$627.$0))(rs_5842.$0.$0)))($phi$627.$1))
        } else if($phi$627.$tag==1){
          var $phi$626 = Right_5736((Success_5805(rs_5842.$0.$0))(rs_5842.$0.$1))
        } else error("pattern match fail",$phi$627);
        var $phi$625 = $phi$626
      } else error("pattern match fail",rs_5842);
      return $phi$625
    });
    if(r_5838.$tag==1){
      var $phi$628 = r_5838.$0
    } else if(r_5838.$tag==0){
      var $phi$628 = error("manyIterate should never return a Left")
    } else error("pattern match fail",r_5838);
    return $phi$628
  };
  return Parser_5807(manyIterate_5836)
};
var $pip$gt_5809 = function(local$instance$Applicative$0){
  return function(a_5827){
    return function(b_5828){
      return (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(function(__5829){
        return function(b_5830){
          return b_5830
        }
      })))(a_5827)))(b_5828)
    }
  }
};
var sepBy1_5814 = function(p_5852){
  return function(sp_5853){
    return (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(enqueue)))(p_5852)))(many_5811((($pip$gt_5809($instance$Applicative$1))(sp_5853))(p_5852)))
  }
};
var success_5813 = function(a_5851){
  return Parser_5807(Success_5805(a_5851))
};
var opt_5816 = function(a_5856){
  return (($lt$pip$gt($instance$Alternative$2))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(Just_5726)))(a_5856)))(success_5813(Nothing_5727))
};
var sepBy_5815 = function(p_5854){
  return function(sp_5855){
    return (($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(justOr_5798([]))))(opt_5816((sepBy1_5814(p_5854))(sp_5855)))
  }
};
var some_5812 = function(p_5850){
  return (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(enqueue)))(p_5850)))(many_5811(p_5850))
};
var $lt$pip_5810 = function(local$instance$Applicative$0){
  return function(a_5831){
    return function(b_5832){
      return (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(function(a_5833){
        return function(__5834){
          return a_5833
        }
      })))(a_5831)))(b_5832)
    }
  }
};
var assert_5885 = assert_85;
var Pair_5886 = Pair_3;
var mapSnd_5887 = mapSnd_84;
var mapFst_5888 = mapFst_83;
var $gt$eq$gt_5889 = $gt$eq$gt_82;
var snd_5890 = snd_23;
var debug2_5891 = debug2_81;
var Just_5892 = Just_1;
var Nothing_5893 = Nothing_2;
var isJust_5894 = isJust_21;
var Empty_5895 = Empty_7;
var Leaf_5896 = Leaf_8;
var Collision_5897 = Collision_9;
var BitmapIndexed_5898 = BitmapIndexed_10;
var $_5899 = $_12;
var fst_5900 = fst_22;
var Left_5901 = Left_4;
var Right_5902 = Right_5;
var loop_5903 = loop_27;
var find_5904 = find_29;
var hamtMask_5905 = hamtMask_58;
var popCount_5906 = popCount_57;
var hamtIndex_5907 = hamtIndex_59;
var lookup_5908 = lookup_60;
var setContains_5909 = setContains_76;
var foldTrie_5910 = foldTrie_66;
var emptySet_5911 = emptySet_72;
var Unit_5912 = Unit_0;
var not_5913 = not_26;
var $div$eq_5914 = $div$eq_13;
var mapIx_5915 = mapIx_30;
var insert_5916 = insert_61;
var setAdd_5917 = setAdd_73;
var setIntersection_5918 = setIntersection_80;
var remove_5919 = remove_63;
var setDiff_5920 = setDiff_79;
var setToArray_5921 = setToArray_78;
var mergeTrie_5922 = mergeTrie_70;
var setUnion_5923 = setUnion_77;
var setRemove_5924 = setRemove_75;
var setAddAll_5925 = setAddAll_74;
var trieKeys_5926 = trieKeys_71;
var size_5927 = size_68;
var mapTrie_5928 = mapTrie_67;
var nodeMask_5929 = nodeMask_56;
var isEmpty_5930 = isEmpty_69;
var filterTrie_5931 = filterTrie_65;
var nextSetBitMask_5932 = nextSetBitMask_64;
var updateOrSet_5933 = updateOrSet_62;
var State_5934 = State_6;
var runState_5935 = runState_54;
var evalState_5936 = evalState_55;
var sets_5937 = sets_53;
var gets_5938 = gets_52;
var foldM_5939 = foldM_49;
var mapM_5940 = mapM_50;
var forM_5941 = forM_51;
var strToArray_5942 = strToArray_48;
var toRecord_5943 = toRecord_47;
var reverse_5944 = reverse_46;
var tail_5945 = tail_41;
var head_5946 = head_40;
var uniq_5947 = uniq_45;
var mergeSet_5948 = mergeSet_44;
var init_5949 = init_43;
var last_5950 = last_42;
var mapJust_5951 = mapJust_39;
var concatMap_5952 = concatMap_38;
var zip_5953 = zip_37;
var zipWithIndex2_5954 = zipWithIndex2_35;
var zipWithIndex_5955 = zipWithIndex_36;
var join_5956 = join_34;
var all_5957 = all_33;
var exists_5958 = exists_32;
var containsChar_5959 = containsChar_31;
var contains_5960 = contains_28;
var either_5961 = either_24;
var splitEither_5962 = splitEither_25;
var fromJust_5963 = fromJust_20;
var justOr_5964 = justOr_19;
var maybe_5965 = maybe_18;
var $gt$gt_5966 = $gt$gt_17;
var $gt$eq_5967 = $gt$eq_16;
var $lt$eq_5968 = $lt$eq_15;
var $gt_5969 = $gt_14;
var Identity_5970 = Identity_11;
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
var upperCaseLetters_5971 = upperCaseLetters_5818;
var letters_5972 = letters_5819;
var digits_5973 = digits_5817;
var Success_5974 = Success_5805;
var Error_5975 = Error_5806;
var Parser_5976 = Parser_5807;
var applyParser_5977 = applyParser_5808;
var many_5978 = many_5811;
var $pip$gt_5979 = $pip$gt_5809;
var sepBy1_5980 = sepBy1_5814;
var success_5981 = success_5813;
var opt_5982 = opt_5816;
var sepBy_5983 = sepBy_5815;
var some_5984 = some_5812;
var $lt$pip_5985 = $lt$pip_5810;
var $import2$instance$Functor$0 = $instance$Functor$0;
var $import2$instance$Applicative$1 = $instance$Applicative$1;
var $import2$instance$Alternative$2 = $instance$Alternative$2;
var LexerState_5986 = function($_0_6016){
  return function($_1_6017){
    return function($_2_6018){
      return function($_3_6019){
        return {$0:$_0_6016,$1:$_1_6017,$2:$_2_6018,$3:$_3_6019}
      }
    }
  }
};
var WsTok_5987 = {$tag:0};
var Token_5994 = function($_0_6020){
  return function($_1_6021){
    return function($_2_6022){
      return function($_3_6023){
        return {$0:$_0_6020,$1:$_1_6021,$2:$_2_6022,$3:$_3_6023}
      }
    }
  }
};
var NumTok_5989 = {$tag:2};
var ComTok_5993 = {$tag:6};
var SymTok_5988 = {$tag:1};
var IdTok_5992 = {$tag:5};
var OpTok_5991 = {$tag:4};
var StrTok_5990 = {$tag:3};
var runLexer_5997 = function(p_6034){
  return function(s_6035){
    var $phi$629 = p_6034.$0((((LexerState_5986(s_6035))(0))(0))(0));
    return $phi$629
  }
};
var mkTok_5995 = function(t_6024){
  var parse_6025 = function(i_6026){
    var $phi$630 = (Success_5974(function(r_6031){
      return (((Token_5994(t_6024))(r_6031))(i_6026.$2))(i_6026.$3)
    }))(i_6026);
    return $phi$630
  };
  return Parser_5976(parse_6025)
};
var parseChar_5998 = function(p_6037){
  var parse_6038 = function(s_6039){
    var $phi$633 = (($lt($import1$instance$Ord$2))(s_6039.$1))(length(s_6039.$0));
    if(!$phi$633){
      var $phi$632 = Error_5975("no more input available")
    } else if($phi$633){
      var $phi$635 = p_6037((getChar(s_6039.$1))(s_6039.$0));
      if(!$phi$635){
        var $phi$634 = Error_5975("parser failed")
      } else if($phi$635){
        var $phi$637 = (getChar(s_6039.$1))(s_6039.$0);
        if("\n"==$phi$637){
          var $phi$636 = (Success_5974((getChar(s_6039.$1))(s_6039.$0)))((((LexerState_5986(s_6039.$0))(s_6039.$1+1))(s_6039.$2+1))(0))
        } else var $phi$636 = (Success_5974((getChar(s_6039.$1))(s_6039.$0)))((((LexerState_5986(s_6039.$0))(s_6039.$1+1))(s_6039.$2))(s_6039.$3+1));
        var $phi$634 = $phi$636
      } else error("pattern match fail",$phi$635);
      var $phi$632 = $phi$634
    } else error("pattern match fail",$phi$633);
    var $phi$631 = $phi$632;
    return $phi$631
  };
  return Parser_5976(parse_6038)
};
var charP_6000 = function(cs_6046){
  return parseChar_5998(function(c_6047){
    return (containsChar_5959(c_6047))(cs_6046)
  })
};
var concatStr_5996 = (foldl(function(cs_6032){
  return function(c_6033){
    return ($concat(cs_6032))(c_6033)
  }
}))("");
var someStr_6003 = function(p_6051){
  return (($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))(concatStr_5996)))(some_5984(p_6051))
};
var whitespaceP_6006 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5995(WsTok_5987)))(someStr_6003(charP_6000(" \n")));
var intP_6007 = someStr_6003(charP_6000(digits_5973));
var numP_6008 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5995(NumTok_5989)))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(intP_6007)))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(charP_6000("."))))(intP_6007)))((pure($import2$instance$Applicative$1))(""))));
var notCharP_6001 = function(cs_6048){
  return parseChar_5998(function(c_6049){
    return not_5913((containsChar_5959(c_6049))(cs_6048))
  })
};
var manyStr_6002 = function(p_6050){
  return (($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))(concatStr_5996)))(many_5978(p_6050))
};
var lineCommentP_6009 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5995(ComTok_5993)))((($pip$gt_5979($import2$instance$Applicative$1))((($pip$gt_5979($import2$instance$Applicative$1))(charP_6000("/")))(charP_6000("/"))))(manyStr_6002(notCharP_6001("\n"))));
var symbolP_6010 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5995(SymTok_5988)))(charP_6000("()[]{},\\"));
var identP_6011 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5995(IdTok_5992)))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(charP_6000(($concat(letters_5972))("_")))))(manyStr_6002(charP_6000(($concat(($concat(letters_5972))(digits_5973)))("_")))));
var opIdentP_6012 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5995(IdTok_5992)))((($lt$pip_5985($import2$instance$Applicative$1))((($pip$gt_5979($import2$instance$Applicative$1))(charP_6000("(")))(someStr_6003(charP_6000("-+*/=:&|<>^$")))))(charP_6000(")")));
var opP_6013 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5995(OpTok_5991)))(someStr_6003(charP_6000("-+*/=:&|<>^$~")));
var anyCharP_5999 = parseChar_5998(function(__6045){
  return true
});
var notEndOfStringP_6054 = notCharP_6001("'");
var escapeP_6053 = (($pip$gt_5979($import2$instance$Applicative$1))(charP_6000("\\")))(anyCharP_5999);
var newLineP_6052 = (($pip$gt_5979($import2$instance$Applicative$1))((($pip$gt_5979($import2$instance$Applicative$1))(charP_6000("\\")))(charP_6000("n"))))((pure($import2$instance$Applicative$1))("\n"));
var stringCharP_6004 = (($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))(newLineP_6052))(escapeP_6053)))(notEndOfStringP_6054);
var stringP_6005 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5995(StrTok_5990)))((($lt$pip_5985($import2$instance$Applicative$1))((($pip$gt_5979($import2$instance$Applicative$1))(charP_6000("'")))(manyStr_6002(stringCharP_6004))))(charP_6000("'")));
var jaguarTokenP_6014 = many_5978((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))(stringP_6005))(whitespaceP_6006)))(numP_6008)))(lineCommentP_6009)))(identP_6011)))(opIdentP_6012)))(opP_6013)))(symbolP_6010));
var tokenize_6015 = runLexer_5997(jaguarTokenP_6014);
var assert_6055 = assert_85;
var Pair_6056 = Pair_3;
var mapSnd_6057 = mapSnd_84;
var mapFst_6058 = mapFst_83;
var $gt$eq$gt_6059 = $gt$eq$gt_82;
var snd_6060 = snd_23;
var debug2_6061 = debug2_81;
var Just_6062 = Just_1;
var Nothing_6063 = Nothing_2;
var isJust_6064 = isJust_21;
var Empty_6065 = Empty_7;
var Leaf_6066 = Leaf_8;
var Collision_6067 = Collision_9;
var BitmapIndexed_6068 = BitmapIndexed_10;
var $_6069 = $_12;
var fst_6070 = fst_22;
var Left_6071 = Left_4;
var Right_6072 = Right_5;
var loop_6073 = loop_27;
var find_6074 = find_29;
var hamtMask_6075 = hamtMask_58;
var popCount_6076 = popCount_57;
var hamtIndex_6077 = hamtIndex_59;
var lookup_6078 = lookup_60;
var setContains_6079 = setContains_76;
var foldTrie_6080 = foldTrie_66;
var emptySet_6081 = emptySet_72;
var Unit_6082 = Unit_0;
var not_6083 = not_26;
var $div$eq_6084 = $div$eq_13;
var mapIx_6085 = mapIx_30;
var insert_6086 = insert_61;
var setAdd_6087 = setAdd_73;
var setIntersection_6088 = setIntersection_80;
var remove_6089 = remove_63;
var setDiff_6090 = setDiff_79;
var setToArray_6091 = setToArray_78;
var mergeTrie_6092 = mergeTrie_70;
var setUnion_6093 = setUnion_77;
var setRemove_6094 = setRemove_75;
var setAddAll_6095 = setAddAll_74;
var trieKeys_6096 = trieKeys_71;
var size_6097 = size_68;
var mapTrie_6098 = mapTrie_67;
var nodeMask_6099 = nodeMask_56;
var isEmpty_6100 = isEmpty_69;
var filterTrie_6101 = filterTrie_65;
var nextSetBitMask_6102 = nextSetBitMask_64;
var updateOrSet_6103 = updateOrSet_62;
var State_6104 = State_6;
var runState_6105 = runState_54;
var evalState_6106 = evalState_55;
var sets_6107 = sets_53;
var gets_6108 = gets_52;
var foldM_6109 = foldM_49;
var mapM_6110 = mapM_50;
var forM_6111 = forM_51;
var strToArray_6112 = strToArray_48;
var toRecord_6113 = toRecord_47;
var reverse_6114 = reverse_46;
var tail_6115 = tail_41;
var head_6116 = head_40;
var uniq_6117 = uniq_45;
var mergeSet_6118 = mergeSet_44;
var init_6119 = init_43;
var last_6120 = last_42;
var mapJust_6121 = mapJust_39;
var concatMap_6122 = concatMap_38;
var zip_6123 = zip_37;
var zipWithIndex2_6124 = zipWithIndex2_35;
var zipWithIndex_6125 = zipWithIndex_36;
var join_6126 = join_34;
var all_6127 = all_33;
var exists_6128 = exists_32;
var containsChar_6129 = containsChar_31;
var contains_6130 = contains_28;
var either_6131 = either_24;
var splitEither_6132 = splitEither_25;
var fromJust_6133 = fromJust_20;
var justOr_6134 = justOr_19;
var maybe_6135 = maybe_18;
var $gt$gt_6136 = $gt$gt_17;
var $gt$eq_6137 = $gt$eq_16;
var $lt$eq_6138 = $lt$eq_15;
var $gt_6139 = $gt_14;
var Identity_6140 = Identity_11;
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
var App_6141 = App_731;
var Lam_6142 = Lam_732;
var Case_6143 = Case_733;
var Let_6144 = Let_734;
var New_6145 = New_735;
var breakableDownAndUpM_6146 = breakableDownAndUpM_782;
var breakableDownM_6147 = breakableDownM_786;
var downAndUpM_6148 = downAndUpM_783;
var downM_6149 = downM_785;
var upM_6150 = upM_784;
var breakableDownAndUp_6151 = breakableDownAndUp_777;
var breakableDown_6152 = breakableDown_781;
var downAndUp_6153 = downAndUp_778;
var down_6154 = down_780;
var up_6155 = up_779;
var AnnType_6156 = AnnType_723;
var TUnknown_6157 = TUnknown_755;
var getAnn_6158 = getAnn_760;
var getAnnType_6159 = getAnnType_763;
var Var_6160 = Var_729;
var Const_6161 = Const_730;
var annOf_6162 = annOf_774;
var getType_6163 = getType_776;
var withAnn_6164 = withAnn_775;
var setAnn_6165 = setAnn_761;
var setAnnType_6166 = setAnnType_764;
var setType_6167 = setType_773;
var Data_6168 = Data_743;
var DataCon_6169 = DataCon_744;
var dataConName_6170 = dataConName_771;
var dataConNames_6171 = dataConNames_772;
var TCBound_6172 = TCBound_747;
var TConst_6173 = TConst_748;
var TVar_6174 = TVar_749;
var TSkolem_6175 = TSkolem_750;
var TApp_6176 = TApp_751;
var TRow_6177 = TRow_752;
var TBot_6178 = TBot_753;
var TForall_6179 = TForall_754;
var equivBound_6180 = equivBound_769;
var equivType_6181 = equivType_770;
var getAnnCodeLoc_6182 = getAnnCodeLoc_765;
var AnnCodeLoc_6183 = AnnCodeLoc_724;
var printCodeLoc_6184 = printCodeLoc_767;
var exprLoc_6185 = exprLoc_768;
var setAnnCodeLoc_6186 = setAnnCodeLoc_766;
var copyAnn_6187 = copyAnn_762;
var emptyAnn_6188 = emptyAnn_759;
var ImportAll_6189 = ImportAll_758;
var ImportOpen_6190 = ImportOpen_757;
var ImportClosed_6191 = ImportClosed_756;
var Instance_6192 = Instance_746;
var Class_6193 = Class_745;
var ModuleInterface_6194 = ModuleInterface_742;
var Module_6195 = Module_741;
var PData_6196 = PData_740;
var PConst_6197 = PConst_739;
var PVar_6198 = PVar_738;
var CStr_6199 = CStr_737;
var CNum_6200 = CNum_736;
var AnnExport_6201 = AnnExport_728;
var AnnTag_6202 = AnnTag_727;
var AnnData_6203 = AnnData_726;
var AnnUseCount_6204 = AnnUseCount_725;
var upperCaseLetters_6205 = upperCaseLetters_5818;
var letters_6206 = letters_5819;
var digits_6207 = digits_5817;
var Success_6208 = Success_5805;
var Error_6209 = Error_5806;
var Parser_6210 = Parser_5807;
var applyParser_6211 = applyParser_5808;
var many_6212 = many_5811;
var $pip$gt_6213 = $pip$gt_5809;
var sepBy1_6214 = sepBy1_5814;
var success_6215 = success_5813;
var opt_6216 = opt_5816;
var sepBy_6217 = sepBy_5815;
var some_6218 = some_5812;
var $lt$pip_6219 = $lt$pip_5810;
var $import3$instance$Functor$0 = $instance$Functor$0;
var $import3$instance$Applicative$1 = $instance$Applicative$1;
var $import3$instance$Alternative$2 = $instance$Alternative$2;
var tokenize_6220 = tokenize_6015;
var Token_6221 = Token_5994;
var WsTok_6222 = WsTok_5987;
var SymTok_6223 = SymTok_5988;
var NumTok_6224 = NumTok_5989;
var StrTok_6225 = StrTok_5990;
var OpTok_6226 = OpTok_5991;
var IdTok_6227 = IdTok_5992;
var ComTok_6228 = ComTok_5993;
var ParserState_6229 = function($_0_6296){
  return function($_1_6297){
    return function($_2_6298){
      return function($_3_6299){
        return function($_4_6300){
          return {$0:$_0_6296,$1:$_1_6297,$2:$_2_6298,$3:$_3_6299,$4:$_4_6300}
        }
      }
    }
  }
};
var mkParserState_6230 = function(ts_6301){
  return function(f_6302){
    var $phi$639 = (getIx(0))(ts_6301);
    var $phi$638 = $phi$639.$3;
    return ((((ParserState_6229(ts_6301))(0))($phi$638))(0))(f_6302)
  }
};
var filterWhitespaceAndComments_6231 = filter(function(t_6307){
  if(t_6307.$0.$tag==0){
    var $phi$640 = false
  } else if(t_6307.$0.$tag==6){
    var $phi$640 = false
  } else var $phi$640 = true;
  return $phi$640
});
var runParser_6232 = function(p_6315){
  return function(s_6316){
    return function(f_6317){
      var $phi$642 = tokenize_6220(s_6316);
      if($phi$642.$tag==0){
        var $phi$641 = (applyParser_6211(p_6315))((mkParserState_6230(filterWhitespaceAndComments_6231($phi$642.$0)))(f_6317))
      } else if($phi$642.$tag==1){
        var $phi$641 = Error_6209($phi$642.$0)
      } else error("pattern match fail",$phi$642);
      return $phi$641
    }
  }
};
var $lt$mul$mns$gt_6235 = function(pf_6349){
  return function(pa_6350){
    var parse_6353 = function(s_6354){
      var $phi$647 = pf_6349.$0(s_6354);
      if($phi$647.$tag==0){
        var $phi$649 = pa_6350.$0(((((ParserState_6229($phi$647.$1.$0))($phi$647.$1.$1))($phi$647.$1.$2))(s_6354.$2+1))($phi$647.$1.$4));
        if($phi$649.$tag==0){
          var $phi$648 = (Success_6208($phi$647.$0($phi$649.$0)))(((((ParserState_6229($phi$649.$1.$0))($phi$649.$1.$1))($phi$649.$1.$2))(s_6354.$3))($phi$649.$1.$4))
        } else if($phi$649.$tag==1){
          var $phi$648 = Error_6209($phi$649.$0)
        } else error("pattern match fail",$phi$649);
        var $phi$646 = $phi$648
      } else if($phi$647.$tag==1){
        var $phi$646 = Error_6209($phi$647.$0)
      } else error("pattern match fail",$phi$647);
      var $phi$645 = $phi$646;
      return $phi$645
    };
    var $phi$644 = Parser_6210(parse_6353);
    var $phi$643 = $phi$644;
    return $phi$643
  }
};
var parseToken_6233 = function(f_6321){
  var parse_6322 = function(s_6323){
    var $phi$652 = (($lt($import1$instance$Ord$2))(s_6323.$1))(length(s_6323.$0));
    if(!$phi$652){
      var $phi$651 = Error_6209("run out of tokens")
    } else if($phi$652){
      var $phi$654 = (getIx(s_6323.$1))(s_6323.$0);
      var $phi$656 = (($lt($import1$instance$Ord$2))($phi$654.$3))(s_6323.$3);
      if($phi$656){
        var $phi$655 = Error_6209("token not indented sufficiently")
      } else if(!$phi$656){
        var $phi$658 = f_6321((getIx(s_6323.$1))(s_6323.$0));
        if($phi$658.$tag==1){
          var $phi$657 = Error_6209("parser fun failed")
        } else if($phi$658.$tag==0){
          var $phi$660 = (($lt($import1$instance$Ord$2))(s_6323.$1+1))(length(s_6323.$0));
          if(!$phi$660){
            var $phi$659 = (Success_6208($phi$658.$0))(((((ParserState_6229(s_6323.$0))(s_6323.$1+1))(s_6323.$2))(s_6323.$3))(s_6323.$4))
          } else if($phi$660){
            var $phi$662 = (getIx(s_6323.$1+1))(s_6323.$0);
            var $phi$664 = (($gt_6139($import1$instance$Ord$2))($phi$662.$2))($phi$654.$2);
            if(!$phi$664){
              var $phi$663 = (Success_6208($phi$658.$0))(((((ParserState_6229(s_6323.$0))(s_6323.$1+1))(s_6323.$2))(s_6323.$3))(s_6323.$4))
            } else if($phi$664){
              var $phi$663 = (Success_6208($phi$658.$0))(((((ParserState_6229(s_6323.$0))(s_6323.$1+1))($phi$662.$3))(s_6323.$3))(s_6323.$4))
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
  return Parser_6210(parse_6322)
};
var operatorP_6239 = function(s_6384){
  return parseToken_6233(function(t_6385){
    if(t_6385.$0.$tag==4){
      var $phi$667 = (($eq$eq($import1$instance$Eq$1))(t_6385.$1))(s_6384);
      if($phi$667){
        var $phi$666 = Just_6062(s_6384)
      } else if(!$phi$667){
        var $phi$666 = Nothing_6063
      } else error("pattern match fail",$phi$667);
      var $phi$665 = $phi$666
    } else var $phi$665 = Nothing_6063;
    return $phi$665
  })
};
var symP_6238 = function(s_6378){
  return parseToken_6233(function(t_6379){
    if(t_6379.$0.$tag==1){
      var $phi$670 = (($eq$eq($import1$instance$Eq$1))(t_6379.$1))(s_6378);
      if($phi$670){
        var $phi$669 = Just_6062(s_6378)
      } else if(!$phi$670){
        var $phi$669 = Nothing_6063
      } else error("pattern match fail",$phi$670);
      var $phi$668 = $phi$669
    } else var $phi$668 = Nothing_6063;
    return $phi$668
  })
};
var parenP_6245 = function(p_6416){
  return (($lt$pip_6219($import3$instance$Applicative$1))((($pip$gt_6213($import3$instance$Applicative$1))(symP_6238("(")))(p_6416)))(symP_6238(")"))
};
var reserved_6237 = ["as","class","where","instance","let","in","from","import","case","of","data"];
var notUpperCaseId_6244 = parseToken_6233(function(t_6411){
  if(t_6411.$0.$tag==5){
    var $phi$673 = (containsChar_6129((getChar(0))(t_6411.$1)))(upperCaseLetters_6205);
    if(!$phi$673){
      var $phi$675 = ((contains_6130($import1$instance$Eq$1))(t_6411.$1))(reserved_6237);
      if(!$phi$675){
        var $phi$674 = Just_6062(t_6411.$1)
      } else if($phi$675){
        var $phi$674 = Nothing_6063
      } else error("pattern match fail",$phi$675);
      var $phi$672 = $phi$674
    } else if($phi$673){
      var $phi$672 = Nothing_6063
    } else error("pattern match fail",$phi$673);
    var $phi$671 = $phi$672
  } else var $phi$671 = Nothing_6063;
  return $phi$671
});
var tvarP_6273 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(TVar_6174(emptyAnn_6188))))(notUpperCaseId_6244);
var upperCaseId_6243 = parseToken_6233(function(t_6406){
  if(t_6406.$0.$tag==5){
    var $phi$678 = (containsChar_6129((getChar(0))(t_6406.$1)))(upperCaseLetters_6205);
    if($phi$678){
      var $phi$677 = Just_6062(t_6406.$1)
    } else if(!$phi$678){
      var $phi$677 = Nothing_6063
    } else error("pattern match fail",$phi$678);
    var $phi$676 = $phi$677
  } else var $phi$676 = Nothing_6063;
  return $phi$676
});
var tconstP_6272 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(TConst_6173(emptyAnn_6188))))(upperCaseId_6243);
var typeP_6271 = Parser_6210(function(s_6476){
  return (applyParser_6211(tfunP_6276))(s_6476)
});
var simpleTypeP_6274 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(tconstP_6272))(tvarP_6273)))(parenP_6245(typeP_6271));
var tappP_6275 = ($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(foldl(TApp_6176(emptyAnn_6188)))))(simpleTypeP_6274)))(many_6212(simpleTypeP_6274));
var tfunP_6276 = ($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(t_6477){
  return function(ts_6478){
    return (foldr1(function(b_6479){
      return function(a_6480){
        return ((TApp_6176(emptyAnn_6188))(((TApp_6176(emptyAnn_6188))((TConst_6173(emptyAnn_6188))("->")))(a_6480)))(b_6479)
      }
    }))((enqueue(t_6477))(ts_6478))
  }
})))(tappP_6275)))(many_6212((($pip$gt_6213($import3$instance$Applicative$1))(operatorP_6239("->")))(tappP_6275)));
var parseType_6295 = runParser_6232(typeP_6271);
var withLocAnn_6246 = function(a_6417){
  return ((((setAnn_6165($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(a_6417))(emptyAnn_6188)
};
var parse_6338 = function(s_6339){
  var $phi$681 = (($lt($import1$instance$Ord$2))(s_6339.$1))(length(s_6339.$0));
  if(!$phi$681){
    var $phi$680 = Error_6209("run out of tokens")
  } else if($phi$681){
    var $phi$683 = (getIx(s_6339.$1))(s_6339.$0);
    var $phi$682 = (Success_6208(($_6069(withLocAnn_6246))(((AnnCodeLoc_6183(s_6339.$4))($phi$683.$2))($phi$683.$3))))(s_6339);
    var $phi$680 = $phi$682
  } else error("pattern match fail",$phi$681);
  var $phi$679 = $phi$680;
  return $phi$679
};
var locP_6234 = Parser_6210(parse_6338);
var $pip$mns$gt_6236 = function(pa_6374){
  return function(pb_6375){
    return ($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(__6376){
      return function(b_6377){
        return b_6377
      }
    })))(pa_6374)))(pb_6375)
  }
};
var anyOpP_6240 = parseToken_6233(function(t_6390){
  if(t_6390.$0.$tag==4){
    var $phi$684 = Just_6062(t_6390.$1)
  } else var $phi$684 = Nothing_6063;
  return $phi$684
});
var reservedP_6241 = function(s_6395){
  return parseToken_6233(function(t_6396){
    if(t_6396.$0.$tag==5){
      var $phi$687 = (($eq$eq($import1$instance$Eq$1))(t_6396.$1))(s_6395);
      if($phi$687){
        var $phi$686 = Just_6062(s_6395)
      } else if(!$phi$687){
        var $phi$686 = Nothing_6063
      } else error("pattern match fail",$phi$687);
      var $phi$685 = $phi$686
    } else var $phi$685 = Nothing_6063;
    return $phi$685
  })
};
var withLocOf_6247 = function(e_6418){
  return withLocAnn_6246(($_6069(fromJust_6133))((((getAnn_6158($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(annOf_6162(e_6418))))
};
var varP_6248 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Var_6160)))(locP_6234)))(parseToken_6233(function(t_6419){
  if(t_6419.$0.$tag==5){
    var $phi$690 = ((contains_6130($import1$instance$Eq$1))(t_6419.$1))(reserved_6237);
    if($phi$690){
      var $phi$689 = Nothing_6063
    } else if(!$phi$690){
      var $phi$689 = Just_6062(t_6419.$1)
    } else error("pattern match fail",$phi$690);
    var $phi$688 = $phi$689
  } else var $phi$688 = Nothing_6063;
  return $phi$688
}));
var cnumP_6249 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Const_6161)))(locP_6234)))(parseToken_6233(function(t_6424){
  if(t_6424.$0.$tag==2){
    var $phi$691 = Just_6062(CNum_6200(unsafeStringToInt(t_6424.$1)))
  } else var $phi$691 = Nothing_6063;
  return $phi$691
}));
var cstrP_6250 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Const_6161)))(locP_6234)))(parseToken_6233(function(t_6429){
  if(t_6429.$0.$tag==3){
    var $phi$692 = Just_6062(CStr_6199(t_6429.$1))
  } else var $phi$692 = Nothing_6063;
  return $phi$692
}));
var constP_6251 = (($lt$pip$gt($import3$instance$Alternative$2))(cstrP_6250))(cnumP_6249);
var pvarP_6258 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PVar_6198)))(locP_6234)))(notUpperCaseId_6244);
var pcstrP_6260 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PConst_6197)))(locP_6234)))(parseToken_6233(function(t_6450){
  if(t_6450.$0.$tag==3){
    var $phi$693 = Just_6062(CStr_6199(t_6450.$1))
  } else var $phi$693 = Nothing_6063;
  return $phi$693
}));
var pcnumP_6259 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PConst_6197)))(locP_6234)))(parseToken_6233(function(t_6445){
  if(t_6445.$0.$tag==2){
    var $phi$694 = Just_6062(CNum_6200(unsafeStringToInt(t_6445.$1)))
  } else var $phi$694 = Nothing_6063;
  return $phi$694
}));
var pconstP_6262 = (($lt$pip$gt($import3$instance$Alternative$2))(pcnumP_6259))(pcstrP_6260);
var patP_6257 = Parser_6210(function(s_6444){
  return (applyParser_6211(allPatP_6264))(s_6444)
});
var pdataP_6263 = ($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PData_6196)))(locP_6234)))(upperCaseId_6243)))(many_6212((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(pvarP_6258))(pconstP_6262)))(parenP_6245(patP_6257))));
var allPatP_6264 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(pvarP_6258))(pconstP_6262)))(pdataP_6263);
var exprP_6252 = Parser_6210(function(s_6434){
  return (applyParser_6211(opP_6270))(s_6434)
});
var arrayLitP_6253 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(ann_6435){
  return function(xs_6436){
    return ((New_6145(ann_6435))("Array"))(xs_6436)
  }
})))(locP_6234)))((($lt$pip_6219($import3$instance$Applicative$1))((($pip$gt_6213($import3$instance$Applicative$1))(symP_6238("[")))((sepBy_6217(exprP_6252))(symP_6238(",")))))(symP_6238("]")));
var simpleExprP_6254 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(varP_6248))(constP_6251)))(arrayLitP_6253)))(parenP_6245(exprP_6252));
var appP_6255 = ($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(foldl(function(f_6437){
  return function(a_6438){
    return ((App_6141(withLocOf_6247(f_6437)))(f_6437))(a_6438)
  }
}))))((($lt$pip$gt($import3$instance$Alternative$2))(varP_6248))(parenP_6245(exprP_6252)))))(many_6212(simpleExprP_6254));
var lamP_6256 = ($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(l_6439){
  return function(ps_6440){
    return function(a_6441){
      return ((foldr(function(a_6442){
        return function(p_6443){
          return ((Lam_6142(l_6439))(p_6443))(a_6442)
        }
      }))(a_6441))(ps_6440)
    }
  }
})))(locP_6234)))(($pip$mns$gt_6236(symP_6238("\\")))(some_6218(notUpperCaseId_6244)))))((($pip$gt_6213($import3$instance$Applicative$1))(operatorP_6239("->")))(exprP_6252));
var ofP_6265 = ($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Pair_6056)))(patP_6257)))((($pip$gt_6213($import3$instance$Applicative$1))(operatorP_6239("->")))(exprP_6252));
var caseP_6266 = ($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Case_6143)))(locP_6234)))(($pip$mns$gt_6236(reservedP_6241("case")))(simpleExprP_6254))))((($pip$gt_6213($import3$instance$Applicative$1))(reservedP_6241("of")))(some_6218(ofP_6265)));
var defP_6267 = ($lt$mul$mns$gt_6235(($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(l_6460){
  return function(n_6461){
    return function(ps_6462){
      return function(e_6463){
        return (Pair_6056(n_6461))(((foldr(function(e_6464){
          return function(p_6465){
            return ((Lam_6142(l_6460))(p_6465))(e_6464)
          }
        }))(e_6463))(ps_6462))
      }
    }
  }
})))(locP_6234)))(notUpperCaseId_6244)))(many_6212(notUpperCaseId_6244))))((($pip$gt_6213($import3$instance$Applicative$1))(operatorP_6239("=")))(exprP_6252));
var letP_6268 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Let_6144)))(locP_6234)))(($pip$mns$gt_6236(reservedP_6241("let")))(some_6218(defP_6267)))))(($pip$mns$gt_6236(reservedP_6241("in")))(exprP_6252));
var primaryExprP_6269 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(appP_6255))(constP_6251)))(lamP_6256)))(caseP_6266)))(letP_6268)))(arrayLitP_6253);
var opP_6270 = ($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(e_6466){
  return function(oes_6467){
    return ((foldl(function(a_6468){
      return function(lob_6469){
        var $phi$695 = ((App_6141(lob_6469.$0))(((App_6141(lob_6469.$0))((Var_6160(lob_6469.$0))(lob_6469.$1.$0)))(a_6468)))(lob_6469.$1.$1);
        return $phi$695
      }
    }))(e_6466))(oes_6467)
  }
})))(primaryExprP_6269)))(many_6212((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(l_6473){
  return function(op_6474){
    return function(e_6475){
      return (Pair_6056(l_6473))((Pair_6056(op_6474))(e_6475))
    }
  }
})))(locP_6234)))(anyOpP_6240)))(primaryExprP_6269)));
var parseExpr_6294 = runParser_6232(exprP_6252);
var strP_6261 = parseToken_6233(function(t_6455){
  if(t_6455.$0.$tag==3){
    var $phi$696 = Just_6062(t_6455.$1)
  } else var $phi$696 = Nothing_6063;
  return $phi$696
});
var nonReservedP_6242 = parseToken_6233(function(t_6401){
  if(t_6401.$0.$tag==5){
    var $phi$699 = ((contains_6130($import1$instance$Eq$1))(t_6401.$1))(reserved_6237);
    if($phi$699){
      var $phi$698 = Nothing_6063
    } else if(!$phi$699){
      var $phi$698 = Just_6062(t_6401.$1)
    } else error("pattern match fail",$phi$699);
    var $phi$697 = $phi$698
  } else var $phi$697 = Nothing_6063;
  return $phi$697
});
var importNoAliasP_6282 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(n_6487){
  return (Pair_6056(n_6487))(n_6487)
})))(nonReservedP_6242);
var importAliasP_6283 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Pair_6056)))(nonReservedP_6242)))((($pip$gt_6213($import3$instance$Applicative$1))(reservedP_6241("as")))(nonReservedP_6242));
var importOpenP_6284 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(ns_6488){
  return function(f_6489){
    return ((ImportOpen_6190(emptyAnn_6188))(f_6489))(ns_6488)
  }
})))((($lt$pip_6219($import3$instance$Applicative$1))((($pip$gt_6213($import3$instance$Applicative$1))(symP_6238("{")))((sepBy1_6214((($lt$pip$gt($import3$instance$Alternative$2))(importAliasP_6283))(importNoAliasP_6282)))(symP_6238(",")))))(symP_6238("}")))))((($pip$gt_6213($import3$instance$Applicative$1))(reservedP_6241("from")))(strP_6261));
var importAllP_6285 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(ImportAll_6189(emptyAnn_6188))))((($pip$gt_6213($import3$instance$Applicative$1))((($pip$gt_6213($import3$instance$Applicative$1))(operatorP_6239("*")))(reservedP_6241("from"))))(strP_6261));
var importP_6286 = (($pip$gt_6213($import3$instance$Applicative$1))(reservedP_6241("import")))((($lt$pip$gt($import3$instance$Alternative$2))(importOpenP_6284))(importAllP_6285));
var parseImports_6293 = runParser_6232(many_6212(importP_6286));
var addExportAnn_6506 = function(d_6507){
  var $phi$700 = (Pair_6056(d_6507.$0))((withAnn_6164(((((setAnn_6165($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_6201(d_6507.$0)))(annOf_6162(d_6507.$1))))(d_6507.$1));
  return $phi$700
};
var topLevelDef_6290 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(addExportAnn_6506)))(defP_6267);
var eitherP_6289 = function(a_6503){
  return function(b_6504){
    return ($_6069(Parser_6210))(function(s_6505){
      return (applyParser_6211((($lt$pip$gt($import3$instance$Alternative$2))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Left_6071)))(a_6503)))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Right_6072)))(b_6504))))(s_6505)
    })
  }
};
var classMemberP_6278 = ($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Pair_6056)))(notUpperCaseId_6244)))((($pip$gt_6213($import3$instance$Applicative$1))(operatorP_6239("::")))(typeP_6271));
var classP_6277 = ($lt$mul$mns$gt_6235(($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(name_6481){
  return function(tv_6482){
    return function(maybeDefs_6483){
      return (((Class_6193(emptyAnn_6188))(name_6481))(tv_6482))((justOr_6134([]))(maybeDefs_6483))
    }
  }
})))(($pip$mns$gt_6236(reservedP_6241("class")))(upperCaseId_6243))))(notUpperCaseId_6244)))(opt_6216((($pip$gt_6213($import3$instance$Applicative$1))(reservedP_6241("where")))(some_6218(classMemberP_6278))));
var instanceP_6279 = ($lt$mul$mns$gt_6235(($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(name_6484){
  return function(t_6485){
    return function(maybeDefs_6486){
      return (((Instance_6192(emptyAnn_6188))(name_6484))(t_6485))((justOr_6134([]))(maybeDefs_6486))
    }
  }
})))(($pip$mns$gt_6236(reservedP_6241("instance")))(upperCaseId_6243))))(simpleTypeP_6274)))(opt_6216((($pip$gt_6213($import3$instance$Applicative$1))(reservedP_6241("where")))(some_6218(defP_6267))));
var dataConP_6280 = ($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(DataCon_6169(emptyAnn_6188))))(upperCaseId_6243)))(many_6212(simpleTypeP_6274));
var dataP_6281 = ($lt$mul$mns$gt_6235(($lt$mul$mns$gt_6235((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Data_6168(emptyAnn_6188))))(($pip$mns$gt_6236(reservedP_6241("data")))(upperCaseId_6243))))(many_6212(notUpperCaseId_6244))))((($pip$gt_6213($import3$instance$Applicative$1))(operatorP_6239("=")))((sepBy1_6214(dataConP_6280))(operatorP_6239("|"))));
var topLevelP_6291 = (eitherP_6289((eitherP_6289(dataP_6281))(topLevelDef_6290)))((eitherP_6289(classP_6277))(instanceP_6279));
var splitFourWay_6288 = function(e_6500){
  var $phi$702 = splitEither_6132(e_6500);
  var $phi$701 = (Pair_6056(splitEither_6132($phi$702.$0)))(splitEither_6132($phi$702.$1));
  return $phi$701
};
var moduleP_6287 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(loc_6490){
  return function(is_6491){
    return function(es_6492){
      var $phi$704 = splitFourWay_6288(es_6492);
      var $phi$706 = getAnnCodeLoc_6182(loc_6490);
      if(($phi$706.$tag==0)&&($phi$706.$0.$tag==1)){
        var $phi$705 = $phi$706.$0.$0
      } else error("pattern match fail",$phi$706);
      var $phi$703 = ((((((Module_6195(loc_6490))($phi$705))(is_6491))($phi$704.$0.$0))($phi$704.$1.$0))($phi$704.$1.$1))($phi$704.$0.$1);
      return $phi$703
    }
  }
})))(locP_6234)))(many_6212(importP_6286))))(some_6218(topLevelP_6291));
var parseModule_6292 = runParser_6232(moduleP_6287);
var assert_6510 = assert_85;
var Pair_6511 = Pair_3;
var mapSnd_6512 = mapSnd_84;
var mapFst_6513 = mapFst_83;
var $gt$eq$gt_6514 = $gt$eq$gt_82;
var snd_6515 = snd_23;
var debug2_6516 = debug2_81;
var Just_6517 = Just_1;
var Nothing_6518 = Nothing_2;
var isJust_6519 = isJust_21;
var Empty_6520 = Empty_7;
var Leaf_6521 = Leaf_8;
var Collision_6522 = Collision_9;
var BitmapIndexed_6523 = BitmapIndexed_10;
var $_6524 = $_12;
var fst_6525 = fst_22;
var Left_6526 = Left_4;
var Right_6527 = Right_5;
var loop_6528 = loop_27;
var find_6529 = find_29;
var hamtMask_6530 = hamtMask_58;
var popCount_6531 = popCount_57;
var hamtIndex_6532 = hamtIndex_59;
var lookup_6533 = lookup_60;
var setContains_6534 = setContains_76;
var foldTrie_6535 = foldTrie_66;
var emptySet_6536 = emptySet_72;
var Unit_6537 = Unit_0;
var not_6538 = not_26;
var $div$eq_6539 = $div$eq_13;
var mapIx_6540 = mapIx_30;
var insert_6541 = insert_61;
var setAdd_6542 = setAdd_73;
var setIntersection_6543 = setIntersection_80;
var remove_6544 = remove_63;
var setDiff_6545 = setDiff_79;
var setToArray_6546 = setToArray_78;
var mergeTrie_6547 = mergeTrie_70;
var setUnion_6548 = setUnion_77;
var setRemove_6549 = setRemove_75;
var setAddAll_6550 = setAddAll_74;
var trieKeys_6551 = trieKeys_71;
var size_6552 = size_68;
var mapTrie_6553 = mapTrie_67;
var nodeMask_6554 = nodeMask_56;
var isEmpty_6555 = isEmpty_69;
var filterTrie_6556 = filterTrie_65;
var nextSetBitMask_6557 = nextSetBitMask_64;
var updateOrSet_6558 = updateOrSet_62;
var State_6559 = State_6;
var runState_6560 = runState_54;
var evalState_6561 = evalState_55;
var sets_6562 = sets_53;
var gets_6563 = gets_52;
var foldM_6564 = foldM_49;
var mapM_6565 = mapM_50;
var forM_6566 = forM_51;
var strToArray_6567 = strToArray_48;
var toRecord_6568 = toRecord_47;
var reverse_6569 = reverse_46;
var tail_6570 = tail_41;
var head_6571 = head_40;
var uniq_6572 = uniq_45;
var mergeSet_6573 = mergeSet_44;
var init_6574 = init_43;
var last_6575 = last_42;
var mapJust_6576 = mapJust_39;
var concatMap_6577 = concatMap_38;
var zip_6578 = zip_37;
var zipWithIndex2_6579 = zipWithIndex2_35;
var zipWithIndex_6580 = zipWithIndex_36;
var join_6581 = join_34;
var all_6582 = all_33;
var exists_6583 = exists_32;
var containsChar_6584 = containsChar_31;
var contains_6585 = contains_28;
var either_6586 = either_24;
var splitEither_6587 = splitEither_25;
var fromJust_6588 = fromJust_20;
var justOr_6589 = justOr_19;
var maybe_6590 = maybe_18;
var $gt$gt_6591 = $gt$gt_17;
var $gt$eq_6592 = $gt$eq_16;
var $lt$eq_6593 = $lt$eq_15;
var $gt_6594 = $gt_14;
var Identity_6595 = Identity_11;
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
var App_6596 = App_731;
var Lam_6597 = Lam_732;
var Case_6598 = Case_733;
var Let_6599 = Let_734;
var New_6600 = New_735;
var breakableDownAndUpM_6601 = breakableDownAndUpM_782;
var breakableDownM_6602 = breakableDownM_786;
var downAndUpM_6603 = downAndUpM_783;
var downM_6604 = downM_785;
var upM_6605 = upM_784;
var breakableDownAndUp_6606 = breakableDownAndUp_777;
var breakableDown_6607 = breakableDown_781;
var downAndUp_6608 = downAndUp_778;
var down_6609 = down_780;
var up_6610 = up_779;
var AnnType_6611 = AnnType_723;
var TUnknown_6612 = TUnknown_755;
var getAnn_6613 = getAnn_760;
var getAnnType_6614 = getAnnType_763;
var Var_6615 = Var_729;
var Const_6616 = Const_730;
var annOf_6617 = annOf_774;
var getType_6618 = getType_776;
var withAnn_6619 = withAnn_775;
var setAnn_6620 = setAnn_761;
var setAnnType_6621 = setAnnType_764;
var setType_6622 = setType_773;
var Data_6623 = Data_743;
var DataCon_6624 = DataCon_744;
var dataConName_6625 = dataConName_771;
var dataConNames_6626 = dataConNames_772;
var TCBound_6627 = TCBound_747;
var TConst_6628 = TConst_748;
var TVar_6629 = TVar_749;
var TSkolem_6630 = TSkolem_750;
var TApp_6631 = TApp_751;
var TRow_6632 = TRow_752;
var TBot_6633 = TBot_753;
var TForall_6634 = TForall_754;
var equivBound_6635 = equivBound_769;
var equivType_6636 = equivType_770;
var getAnnCodeLoc_6637 = getAnnCodeLoc_765;
var AnnCodeLoc_6638 = AnnCodeLoc_724;
var printCodeLoc_6639 = printCodeLoc_767;
var exprLoc_6640 = exprLoc_768;
var setAnnCodeLoc_6641 = setAnnCodeLoc_766;
var copyAnn_6642 = copyAnn_762;
var emptyAnn_6643 = emptyAnn_759;
var ImportAll_6644 = ImportAll_758;
var ImportOpen_6645 = ImportOpen_757;
var ImportClosed_6646 = ImportClosed_756;
var Instance_6647 = Instance_746;
var Class_6648 = Class_745;
var ModuleInterface_6649 = ModuleInterface_742;
var Module_6650 = Module_741;
var PData_6651 = PData_740;
var PConst_6652 = PConst_739;
var PVar_6653 = PVar_738;
var CStr_6654 = CStr_737;
var CNum_6655 = CNum_736;
var AnnExport_6656 = AnnExport_728;
var AnnTag_6657 = AnnTag_727;
var AnnData_6658 = AnnData_726;
var AnnUseCount_6659 = AnnUseCount_725;
var Success_6660 = Success_5805;
var Error_6661 = Error_5806;
var $import3$instance$Functor$0 = $instance$Functor$0;
var $import3$instance$Applicative$1 = $instance$Applicative$1;
var $import3$instance$Alternative$2 = $instance$Alternative$2;
var parseExpr_6662 = parseExpr_6294;
var parseModule_6663 = parseModule_6292;
var parseType_6664 = parseType_6295;
var ParserState_6665 = ParserState_6229;
var generateJs_6666 = compileModule_5709;
var printType_6667 = printType_1700;
var reallyPrintExpr_6668 = reallyPrintExpr_1705;
var newCtx_6669 = newCtx_1996;
var inferTypeModule_6670 = inferTypeModule_2042;
var getTypedExports_6671 = getTypedExports_2043;
var generalize_6672 = generalize_2034;
var skolemizeType_6673 = skolemizeType_2030;
var emptyEnv_6674 = emptyEnv_2006;
var dfs_6675 = dfs_571;
var ArgBool_6676 = ArgBool_4711;
var ArgString_6677 = ArgString_4712;
var parseArgs_6678 = parseArgs_4715;
var getPositional_6679 = getPositional_4716;
var getString_6680 = getString_4717;
var getBool_6681 = getBool_4718;
var $import9$instance$Eq$0 = $instance$Eq$0;
var declassModule_6682 = declassModule_4259;
var normalizeImports_6683 = normalizeImports_4047;
var uniquify_6684 = uniquify_3184;
var mergeModules_6685 = mergeModules_3846;
var inline_6686 = inline_3448;
var translateAdts_6687 = translateAdts_2982;
var CompilerState_6688 = CompilerState_1490;
var reportTimes_6689 = reportTimes_1499;
var timingStart_6690 = timingStart_1496;
var timingEnd_6691 = timingEnd_1497;
var timed_6692 = timed_1498;
var perModule_6693 = perModule_1495;
var setUid_6694 = setUid_1494;
var getUid_6695 = getUid_1493;
var setExports_6696 = setExports_1492;
var getExports_6697 = getExports_1491;
var splitLetsPass_6698 = splitLetsPass_1282;
var mainArg_6708 = (ArgString_6677("main"))(Nothing_6518);
var profileArg_6709 = (ArgBool_6676("profile"))(Just_6517(false));
var optArg_6710 = (ArgBool_6676("opt"))(Just_6517(false));
var builtinsPathArg_6706 = (ArgString_6677("builtins"))(Nothing_6518);
var outPathArg_6707 = (ArgString_6677("out"))(Nothing_6518);
var argDefs_6711 = [builtinsPathArg_6706,outPathArg_6707,mainArg_6708,profileArg_6709,optArg_6710];
var liftPass_6712 = function(local$instance$Monad$0){
  return function(p_6795){
    return function(a_6796){
      return (ret(local$instance$Monad$0))(p_6795(a_6796))
    }
  }
};
var normalizeImportsPass_6713 = function(m_6797){
  return (($gt$gt$eq($import1$instance$Monad$11))(getExports_6697))(function(es_6798){
    return (ret($import1$instance$Monad$11))((normalizeImports_6683(es_6798))(m_6797))
  })
};
var moduleFile_6699 = function(m_6718){
  var $phi$707 = m_6718.$1;
  return $phi$707
};
var typerPass_6714 = function(m_6799){
  return (($gt$gt$eq($import1$instance$Monad$11))(getExports_6697))(function(es_6800){
    var typed_6801 = (inferTypeModule_6670(es_6800))(m_6799);
    var e_6802 = getTypedExports_6671(typed_6801);
    return (($gt$gt_6591($import1$instance$Monad$11))(setExports_6696(((set(moduleFile_6699(m_6799)))(e_6802))(es_6800))))((ret($import1$instance$Monad$11))(typed_6801))
  })
};
var declasserPass_6715 = function(m_6803){
  return (($gt$gt$eq($import1$instance$Monad$11))(getExports_6697))(function(es_6804){
    return (ret($import1$instance$Monad$11))((declassModule_6682(es_6804))(m_6803))
  })
};
var parse_6700 = function(fn_6726){
  var $phi$709 = (parseModule_6663(readFile(fn_6726)))(($concat("//"))(fn_6726));
  if($phi$709.$tag==0){
    var $phi$711 = (($eq$eq($import1$instance$Eq$0))($phi$709.$1.$1))(length($phi$709.$1.$0));
    if($phi$711){
      var $phi$710 = $phi$709.$0
    } else if(!$phi$711){
      var $phi$710 = error(($concat(($concat(fn_6726))(": failed to parse all tokens, stopped at ")))(jsonStringify((getIx($phi$709.$1.$1))($phi$709.$1.$0))))
    } else error("pattern match fail",$phi$711);
    var $phi$708 = $phi$710
  } else if($phi$709.$tag==1){
    var $phi$708 = error(($concat(($concat(fn_6726))(": ")))($phi$709.$0))
  } else error("pattern match fail",$phi$709);
  return $phi$708
};
var findImports_6702 = function(m_6742){
  var importFileName_6743 = function(i_6744){
    if(i_6744.$tag==2){
      var $phi$712 = i_6744.$1
    } else if(i_6744.$tag==1){
      var $phi$712 = i_6744.$1
    } else if(i_6744.$tag==0){
      var $phi$712 = i_6744.$1
    } else error("pattern match fail",i_6744);
    return $phi$712
  };
  var $phi$713 = (map(importFileName_6743))(m_6742.$2);
  return $phi$713
};
var depSort_6701 = function(mainName_6734){
  return function(ms_6735){
    var modules_6736 = ((foldl(function(r_6739){
      return function(m_6740){
        return ((set(moduleFile_6699(m_6740)))(m_6740))(r_6739)
      }
    }))(empty))(ms_6735);
    var imports_6737 = (mapRecord(findImports_6702))(modules_6736);
    var ordered_6738 = ((dfs_6675(imports_6737))([]))(mainName_6734);
    return ($_6524(reverse_6569))((map(function(n_6741){
      return (get(n_6741))(modules_6736)
    }))(ordered_6738))
  }
};
var parseT_6703 = function(s_6760){
  var $phi$715 = (parseType_6664(s_6760))("");
  if($phi$715.$tag==0){
    var $phi$714 = $phi$715.$0
  } else var $phi$714 = error($phi$715);
  return $phi$714
};
var parseExports_6704 = function(e_6764){
  var bs_6765 = (mapRecord(function(s_6766){
    return ($_6524(skolemizeType_6673))((evalState_6561(newCtx_6669))((generalize_6672(emptyEnv_6674))(parseT_6703(s_6766))))
  }))(e_6764);
  return ((ModuleInterface_6649(bs_6765))([]))([])
};
var instrument_6705 = function(m_6767){
  var addImport_6770 = function(i_6784){
    if((i_6784.$tag==1)&&("./builtins.js"==i_6784.$1)){
      var $phi$716 = ((ImportOpen_6645(i_6784.$0))("./builtins.js"))((push((Pair_6511("perfTime"))("perfTime")))(i_6784.$2))
    } else var $phi$716 = i_6784;
    return $phi$716
  };
  var instrumentExpr_6769 = function(n_6777){
    return function(e_6778){
      if(e_6778.$tag==3){
        var $phi$717 = ((Lam_6597(e_6778.$0))(e_6778.$1))((instrumentExpr_6769(n_6777))(e_6778.$2))
      } else {
        var we_6783 = ((Lam_6597(emptyAnn_6643))("$unused$"))(e_6778);
        var $phi$717 = ((App_6596(emptyAnn_6643))(((App_6596(emptyAnn_6643))((Var_6615(emptyAnn_6643))("perfTime")))((Const_6616(emptyAnn_6643))(CStr_6654(n_6777)))))(we_6783)
      };
      return $phi$717
    }
  };
  var instrumentDef_6768 = function(d_6771){
    if(d_6771.$1.$tag==3){
      var $phi$718 = (Pair_6511(d_6771.$0))((instrumentExpr_6769(d_6771.$0))(((Lam_6597(d_6771.$1.$0))(d_6771.$1.$1))(d_6771.$1.$2)))
    } else var $phi$718 = d_6771;
    return $phi$718
  };
  var $phi$719 = ((((((Module_6650(m_6767.$0))(m_6767.$1))((map(addImport_6770))(m_6767.$2)))(m_6767.$3))(m_6767.$4))(m_6767.$5))((map(instrumentDef_6768))(m_6767.$6));
  return $phi$719
};
var instrumentPass_6716 = function(local$instance$Monad$0){
  return function(profile_6805){
    return function(m_6806){
      if(!profile_6805){
        var $phi$720 = (ret(local$instance$Monad$0))(m_6806)
      } else if(profile_6805){
        var $phi$720 = (ret(local$instance$Monad$0))(instrument_6705(m_6806))
      } else error("pattern match fail",profile_6805);
      return $phi$720
    }
  }
};
var main_6717 = function(argv_6807){
  var args_6808 = (parseArgs_6678(argDefs_6711))((slice(2))(argv_6807));
  var srcFiles_6812 = getPositional_6679(args_6808);
  var builtinsPath_6809 = (getString_6680(args_6808))(builtinsPathArg_6706);
  var baseExports_6815 = ((set("./builtins.js"))(parseExports_6704(loadJSExports(builtinsPath_6809))))(empty);
  var mainName_6811 = ($concat("//"))((getString_6680(args_6808))(mainArg_6708));
  var profile_6813 = (getBool_6681(args_6808))(profileArg_6709);
  var opt_6814 = (getBool_6681(args_6808))(optArg_6710);
  var passes_6816 = (($gt$eq$gt_6514($import1$instance$Monad$11))((($gt$eq$gt_6514($import1$instance$Monad$11))((($gt$eq$gt_6514($import1$instance$Monad$11))((($gt$eq$gt_6514($import1$instance$Monad$11))((($gt$eq$gt_6514($import1$instance$Monad$11))((($gt$eq$gt_6514($import1$instance$Monad$11))((($gt$eq$gt_6514($import1$instance$Monad$11))((perModule_6693($import1$instance$Monad$11))(($_6524(timed_6692("parse")))((liftPass_6712($import1$instance$Monad$11))(parse_6700)))))((timed_6692("dep-sort"))((liftPass_6712($import1$instance$Monad$11))(depSort_6701(mainName_6811))))))((perModule_6693($import1$instance$Monad$11))((($gt$eq$gt_6514($import1$instance$Monad$11))((($gt$eq$gt_6514($import1$instance$Monad$11))((($gt$eq$gt_6514($import1$instance$Monad$11))((($gt$eq$gt_6514($import1$instance$Monad$11))((($gt$eq$gt_6514($import1$instance$Monad$11))((timed_6692("translate-adts"))((liftPass_6712($import1$instance$Monad$11))(translateAdts_6687))))((timed_6692("normalize-imports"))(normalizeImportsPass_6713))))((timed_6692("uniquify"))(uniquify_6684))))((timed_6692("split-lets"))(splitLetsPass_6698($import1$instance$Monad$11)))))((timed_6692("typer"))(typerPass_6714))))((timed_6692("declasser"))(declasserPass_6715))))))((timed_6692("merge-modules"))((liftPass_6712($import1$instance$Monad$11))(mergeModules_6685)))))((timed_6692("opt"))(inline_6686(opt_6814)))))((timed_6692("instrument"))((instrumentPass_6716($import1$instance$Monad$11))(profile_6813)))))((timed_6692("generate-js"))((liftPass_6712($import1$instance$Monad$11))(generateJs_6666(builtinsPath_6809))))))(reportTimes_6689);
  var js_6817 = (evalState_6561(((CompilerState_6688(baseExports_6815))(0))(Empty_6520)))(passes_6816(srcFiles_6812));
  var outPath_6810 = (getString_6680(args_6808))(outPathArg_6707);
  return (writeFile(js_6817))(outPath_6810)
};
var exports = {mainArg:mainArg_6708,profileArg:profileArg_6709,optArg:optArg_6710,builtinsPathArg:builtinsPathArg_6706,outPathArg:outPathArg_6707,argDefs:argDefs_6711,liftPass:liftPass_6712,normalizeImportsPass:normalizeImportsPass_6713,moduleFile:moduleFile_6699,typerPass:typerPass_6714,declasserPass:declasserPass_6715,parse:parse_6700,findImports:findImports_6702,depSort:depSort_6701,parseT:parseT_6703,parseExports:parseExports_6704,instrument:instrument_6705,instrumentPass:instrumentPass_6716,main:main_6717}
module.exports = exports;})();if (module.exports.main)module.exports.main(process.argv)