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
        return a == b
    }
}

builtins.$neq = function(a) {
    return function(b) {
        return a != b
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
        return r[f]
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

builtins.error = function(s) {
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
  var i = 0;
	var x = start;
  while (!isFinished(x)) {
  	x = fun(x);
    if (i++ > 1000000) {
    	throw 'infinite loop protection' + i;
    }
  }
  return x;
}

builtins.True = true;

builtins.False = false;

builtins.$TYPE = {
    $add: 'Number -> Number -> Number',
    $del: 'Number -> Number -> Number',
    $mul: 'Number -> Number -> Number',
    $lt: 'a -> a -> Bool',
    $gt: 'a -> a -> Bool',
    $eq: 'a -> a -> Bool',
    $neq: 'a -> a -> Bool',
    $and: 'Bool -> Bool -> Bool',
    $or: 'Bool -> Bool -> Bool',
    $concat: 'String -> String -> String',
    empty: 'Record a',
    get: 'String -> Record a -> a',
    getIx: 'Number -> Array a -> a',
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
};

module.exports = builtins;
