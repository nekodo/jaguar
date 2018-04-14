console.log(process.cwd())
var cache = {}
function _require(f) {
    //return cache[f] || require(f == "./builtins.js" ? process.cwd() + "/" + "compiler/builtins.js" : f);
    return cache[f] || require(f == "./builtins.js" ? process.cwd() + "/" + process.argv[2].substring(11) : f);
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
var currentTimeMs = (_require("./builtins.js")).currentTimeMs;
var Pair_3 = function($_0_86){
  return function($_1_87){
    return {$0:$_0_86,$1:$_1_87}
  }
};
var Just_1 = function($_0_85){
  return {$0:$_0_85,$tag:0}
};
var Nothing_2 = {$tag:1};
var Empty_7 = {$tag:0};
var Leaf_8 = function($_0_91){
  return function($_1_92){
    return function($_2_93){
      return {$0:$_0_91,$1:$_1_92,$2:$_2_93,$tag:1}
    }
  }
};
var Collision_9 = function($_0_94){
  return function($_1_95){
    return {$0:$_0_94,$1:$_1_95,$tag:2}
  }
};
var BitmapIndexed_10 = function($_0_96){
  return function($_1_97){
    return function($_2_98){
      return {$0:$_0_96,$1:$_1_97,$2:$_2_98,$tag:3}
    }
  }
};
var Left_4 = function($_0_88){
  return {$0:$_0_88,$tag:0}
};
var Right_5 = function($_0_89){
  return {$0:$_0_89,$tag:1}
};
var Unit_0 = {};
var State_6 = function($_0_90){
  return {$0:$_0_90}
};
var Identity_11 = function($_0_99){
  return {$0:$_0_99}
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
var $instance$Functor$4 = $class$Functor(function(f_429){
  return function(m_430){
    if(m_430.$tag==0){
      var $phi$10 = Just_1(f_429(m_430.$0))
    } else if(m_430.$tag==1){
      var $phi$10 = Nothing_2
    } else error("pattern match fail",m_430);
    return $phi$10
  }
});
var $instance$Applicative$5 = ($class$Applicative(function(x_432){
  return Just_1(x_432)
}))(function(f_433){
  return function(x_434){
    if(f_433.$tag==1){
      var $phi$11 = Nothing_2
    } else if(f_433.$tag==0){
      var $phi$11 = ((fmap($instance$Functor$4))(f_433.$0))(x_434)
    } else error("pattern match fail",f_433);
    return $phi$11
  }
});
var $instance$Alternative$6 = ($class$Alternative(Nothing_2))(function(a_436){
  return function(b_437){
    if(a_436.$tag==1){
      var $phi$12 = b_437
    } else var $phi$12 = a_436;
    return $phi$12
  }
});
var $instance$Monad$7 = ($class$Monad(pure($instance$Applicative$5)))(function(a_439){
  return function(f_440){
    if(a_439.$tag==1){
      var $phi$13 = Nothing_2
    } else if(a_439.$tag==0){
      var $phi$13 = f_440(a_439.$0)
    } else error("pattern match fail",a_439);
    return $phi$13
  }
});
var $instance$Functor$8 = $class$Functor(function(f_442){
  return function(e_443){
    if(e_443.$tag==0){
      var $phi$14 = Left_4(e_443.$0)
    } else if(e_443.$tag==1){
      var $phi$14 = Right_5(f_442(e_443.$0))
    } else error("pattern match fail",e_443);
    return $phi$14
  }
});
var $instance$Functor$9 = $class$Functor(function(f_446){
  return function(s_447){
    var $phi$15 = State_6(function(s_449){
      var $phi$17 = s_447.$0(s_449);
      var $phi$16 = (Pair_3($phi$17.$0))(f_446($phi$17.$1));
      return $phi$16
    });
    return $phi$15
  }
});
var $instance$Applicative$10 = ($class$Applicative(function(a_452){
  return State_6(function(s_453){
    return (Pair_3(s_453))(a_452)
  })
}))(function(f_454){
  return function(a_455){
    var $phi$19 = State_6(function(s_458){
      var $phi$21 = f_454.$0(s_458);
      var $phi$23 = a_455.$0($phi$21.$0);
      var $phi$22 = (Pair_3($phi$23.$0))($phi$21.$1($phi$23.$1));
      var $phi$20 = $phi$22;
      return $phi$20
    });
    var $phi$18 = $phi$19;
    return $phi$18
  }
});
var $instance$Monad$11 = ($class$Monad(pure($instance$Applicative$10)))(function(a_463){
  return function(f_464){
    var $phi$24 = State_6(function(s_466){
      var $phi$26 = a_463.$0(s_466);
      var $phi$28 = f_464($phi$26.$1);
      var $phi$27 = $phi$28.$0($phi$26.$0);
      var $phi$25 = $phi$27;
      return $phi$25
    });
    return $phi$24
  }
});
var $instance$Hashable$12 = $class$Hashable(function(n_470){
  return n_470
});
var $instance$Hashable$13 = $class$Hashable(function(s_471){
  return strHashCode(s_471)
});
var $instance$Functor$14 = $class$Functor(function(f_472){
  return function(i_473){
    var $phi$29 = Identity_11(f_472(i_473.$0));
    return $phi$29
  }
});
var $instance$Applicative$15 = ($class$Applicative(function(x_475){
  return Identity_11(x_475)
}))(function(f_476){
  return function(x_477){
    var $phi$30 = ((fmap($instance$Functor$14))(f_476.$0))(x_477);
    return $phi$30
  }
});
var $instance$Monad$16 = ($class$Monad(pure($instance$Applicative$15)))(function(a_479){
  return function(f_480){
    var $phi$31 = f_480(a_479.$0);
    return $phi$31
  }
});
var mapSnd_84 = function(f_425){
  return function(p_426){
    var $phi$32 = (Pair_3(p_426.$0))(f_425(p_426.$1));
    return $phi$32
  }
};
var mapFst_83 = function(f_421){
  return function(p_422){
    var $phi$33 = (Pair_3(f_421(p_422.$0)))(p_422.$1);
    return $phi$33
  }
};
var $gt$eq$gt_82 = function(local$instance$Monad$0){
  return function(a_418){
    return function(b_419){
      return function(x_420){
        return (($gt$gt$eq(local$instance$Monad$0))(a_418(x_420)))(b_419)
      }
    }
  }
};
var snd_23 = function(p_127){
  var $phi$34 = p_127.$1;
  return $phi$34
};
var debug2_81 = function(p_416){
  return function(x_417){
    return snd_23((Pair_3(debug(p_416)))(x_417))
  }
};
var isJust_21 = function(m_122){
  if(m_122.$tag==0){
    var $phi$35 = true
  } else if(m_122.$tag==1){
    var $phi$35 = false
  } else error("pattern match fail",m_122);
  return $phi$35
};
var $_12 = function(f_100){
  return function(a_101){
    return f_100(a_101)
  }
};
var fst_22 = function(p_124){
  var $phi$36 = p_124.$0;
  return $phi$36
};
var loop_27 = function(f_145){
  return function(start_146){
    var shouldStop_147 = function(x_151){
      if(x_151.$1.$tag==1){
        var $phi$37 = false
      } else var $phi$37 = true;
      return $phi$37
    };
    var next_148 = function(xr_154){
      var $phi$40 = f_145(xr_154.$0);
      if($phi$40.$tag==0){
        var $phi$39 = (Pair_3($phi$40.$0))(Nothing_2)
      } else if($phi$40.$tag==1){
        var $phi$39 = (Pair_3(xr_154.$0))(Just_1($phi$40.$0))
      } else error("pattern match fail",$phi$40);
      var $phi$38 = $phi$39;
      return $phi$38
    };
    var sp_149 = (Pair_3(start_146))(Nothing_2);
    var result_150 = ((iterate(sp_149))(shouldStop_147))(next_148);
    var $phi$42 = snd_23(result_150);
    if($phi$42.$tag==0){
      var $phi$41 = $phi$42.$0
    } else error("pattern match fail",$phi$42);
    return $phi$41
  }
};
var find_29 = function(predicate_164){
  return function(xs_165){
    var f_166 = function(i_167){
      var $phi$44 = (($lt($instance$Ord$2))(i_167))(length(xs_165));
      if(!$phi$44){
        var $phi$43 = Right_5(Nothing_2)
      } else if($phi$44){
        var $phi$46 = predicate_164((getIx(i_167))(xs_165));
        if($phi$46){
          var $phi$45 = Right_5(Just_1((getIx(i_167))(xs_165)))
        } else if(!$phi$46){
          var $phi$45 = Left_4(i_167+1)
        } else error("pattern match fail",$phi$46);
        var $phi$43 = $phi$45
      } else error("pattern match fail",$phi$44);
      return $phi$43
    };
    return (loop_27(f_166))(0)
  }
};
var hamtMask_58 = function(depth_255){
  return function(hash_256){
    var h_257 = (hash_256>>>(depth_255*5))&31;
    return 1<<h_257
  }
};
var popCount_57 = function(n_249){
  var n2_250 = n_249-((n_249>>>1)&1431655765);
  var n3_251 = (n2_250&858993459)+((n2_250>>>2)&858993459);
  var n4_252 = (n3_251+(n3_251>>>4))&252645135;
  var n5_253 = n4_252+(n4_252>>>8);
  var n6_254 = n5_253+(n5_253>>>16);
  return n6_254&127
};
var hamtIndex_59 = function(bitmap_258){
  return function(mask_259){
    return popCount_57(bitmap_258&(mask_259-1))
  }
};
var lookup_60 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_260){
      return function(t_261){
        var hash_262 = (hashCode(local$instance$Hashable$1))(k_260);
        var f_263 = function(depth_264){
          return function(t_265){
            if(t_265.$tag==0){
              var $phi$47 = Nothing_2
            } else if(t_265.$tag==1){
              var $phi$51 = (($eq$eq(local$instance$Eq$0))(k_260))(t_265.$1);
              if(!$phi$51){
                var $phi$50 = Nothing_2
              } else if($phi$51){
                var $phi$50 = Just_1(t_265.$2)
              } else error("pattern match fail",$phi$51);
              var $phi$47 = $phi$50
            } else if(t_265.$tag==2){
              var $phi$47 = ($_12((fmap($instance$Functor$4))(snd_23)))((find_29(function(e_271){
                return (($eq$eq(local$instance$Eq$0))(fst_22(e_271)))(k_260)
              }))(t_265.$1))
            } else if(t_265.$tag==3){
              var m_275 = (hamtMask_58(depth_264))(hash_262);
              var $phi$49 = m_275&t_265.$1;
              if(0==$phi$49){
                var $phi$48 = Nothing_2
              } else var $phi$48 = (f_263(depth_264+1))((getIx((hamtIndex_59(t_265.$1))(m_275)))(t_265.$2));
              var $phi$47 = $phi$48
            } else error("pattern match fail",t_265);
            return $phi$47
          }
        };
        return (f_263(0))(t_261)
      }
    }
  }
};
var setContains_76 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_400){
      return function(s_401){
        return isJust_21((((lookup_60(local$instance$Hashable$1))(local$instance$Eq$0))(a_400))(s_401))
      }
    }
  }
};
var foldTrie_66 = function(f_350){
  return function(a_351){
    return function(t_352){
      if(t_352.$tag==0){
        var $phi$52 = a_351
      } else if(t_352.$tag==1){
        var $phi$52 = ((f_350(a_351))(t_352.$1))(t_352.$2)
      } else if(t_352.$tag==2){
        var $phi$52 = ((foldl(function(a_358){
          return function(e_359){
            return ((f_350(a_358))(fst_22(e_359)))(snd_23(e_359))
          }
        }))(a_351))(t_352.$1)
      } else if(t_352.$tag==3){
        var $phi$52 = ((foldl(foldTrie_66(f_350)))(a_351))(t_352.$2)
      } else error("pattern match fail",t_352);
      return $phi$52
    }
  }
};
var emptySet_72 = Empty_7;
var not_26 = function(b_144){
  if(b_144){
    var $phi$53 = false
  } else if(!b_144){
    var $phi$53 = true
  } else error("pattern match fail",b_144);
  return $phi$53
};
var $div$eq_13 = function(local$instance$Eq$0){
  return function(a_102){
    return function(b_103){
      return not_26((($eq$eq(local$instance$Eq$0))(a_102))(b_103))
    }
  }
};
var mapIx_30 = function(f_168){
  return function(ix_169){
    return function(xs_170){
      return ((setIx(ix_169))(f_168((getIx(ix_169))(xs_170))))(xs_170)
    }
  }
};
var insert_61 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_277){
      return function(v_278){
        return function(t_279){
          var hash_280 = (hashCode(local$instance$Hashable$1))(k_277);
          var f_281 = function(depth_282){
            return function(t_283){
              if(t_283.$tag==0){
                var $phi$54 = ((Leaf_8(0))(k_277))(v_278)
              } else if(t_283.$tag==2){
                var $phi$54 = (Collision_9(t_283.$0))((push((Pair_3(k_277))(v_278)))((filter(function(e_286){
                  return (($div$eq_13(local$instance$Eq$0))(fst_22(e_286)))(k_277)
                }))(t_283.$1)))
              } else if(t_283.$tag==1){
                var $phi$58 = (($eq$eq(local$instance$Eq$0))(k_277))(t_283.$1);
                if($phi$58){
                  var $phi$57 = ((Leaf_8(t_283.$0))(k_277))(v_278)
                } else if(!$phi$58){
                  if(7==depth_282){
                    var $phi$59 = (Collision_9(t_283.$0))([(Pair_3(t_283.$1))(t_283.$2),(Pair_3(k_277))(v_278)])
                  } else {
                    var m_291 = (hamtMask_58(depth_282))((hashCode(local$instance$Hashable$1))(t_283.$1));
                    var $phi$59 = (f_281(depth_282))(((BitmapIndexed_10(t_283.$0))(m_291))([((Leaf_8(m_291))(t_283.$1))(t_283.$2)]))
                  };
                  var $phi$57 = $phi$59
                } else error("pattern match fail",$phi$58);
                var $phi$54 = $phi$57
              } else if(t_283.$tag==3){
                var m_295 = (hamtMask_58(depth_282))(hash_280);
                var bitmap2_296 = m_295|t_283.$1;
                var ix_297 = (hamtIndex_59(bitmap2_296))(m_295);
                var $phi$56 = m_295&t_283.$1;
                if(0==$phi$56){
                  var $phi$55 = ((BitmapIndexed_10(t_283.$0))(bitmap2_296))(((arrIns(ix_297))(((Leaf_8(m_295))(k_277))(v_278)))(t_283.$2))
                } else var $phi$55 = ((BitmapIndexed_10(t_283.$0))(bitmap2_296))(((mapIx_30(f_281(depth_282+1)))(ix_297))(t_283.$2));
                var $phi$54 = $phi$55
              } else error("pattern match fail",t_283);
              return $phi$54
            }
          };
          return (f_281(0))(t_279)
        }
      }
    }
  }
};
var setAdd_73 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_394){
      return function(s_395){
        return ((((insert_61(local$instance$Hashable$1))(local$instance$Eq$0))(a_394))(Unit_0))(s_395)
      }
    }
  }
};
var setIntersection_80 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_410){
      return function(b_411){
        var f_412 = function(r_413){
          return function(k_414){
            return function(__415){
              var $phi$61 = (((setContains_76(local$instance$Hashable$1))(local$instance$Eq$0))(k_414))(a_410);
              if(!$phi$61){
                var $phi$60 = r_413
              } else if($phi$61){
                var $phi$60 = (((setAdd_73(local$instance$Hashable$1))(local$instance$Eq$0))(k_414))(r_413)
              } else error("pattern match fail",$phi$61);
              return $phi$60
            }
          }
        };
        return ((foldTrie_66(f_412))(emptySet_72))(b_411)
      }
    }
  }
};
var remove_63 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_304){
      return function(t_305){
        var hash_306 = (hashCode(local$instance$Hashable$1))(k_304);
        var f_307 = function(depth_308){
          return function(t_309){
            if(t_309.$tag==0){
              var $phi$62 = Empty_7
            } else if(t_309.$tag==1){
              var $phi$72 = (($eq$eq(local$instance$Eq$0))(t_309.$1))(k_304);
              if($phi$72){
                var $phi$71 = Empty_7
              } else if(!$phi$72){
                var $phi$71 = t_309
              } else error("pattern match fail",$phi$72);
              var $phi$62 = $phi$71
            } else if(t_309.$tag==2){
              var entries2_315 = (filter(function(e_316){
                return (($div$eq_13(local$instance$Eq$0))(fst_22(e_316)))(k_304)
              }))(t_309.$1);
              var $phi$70 = length(entries2_315);
              if(0==$phi$70){
                var $phi$69 = Empty_7
              } else if(1==$phi$70){
                var $phi$69 = ((Leaf_8(t_309.$0))(fst_22((getIx(0))(entries2_315))))(snd_23((getIx(0))(entries2_315)))
              } else var $phi$69 = (Collision_9(t_309.$0))(entries2_315);
              var $phi$62 = $phi$69
            } else if(t_309.$tag==3){
              var m_321 = (hamtMask_58(depth_308))(hash_306);
              var ix_322 = (hamtIndex_59(t_309.$1))(m_321);
              var $phi$64 = m_321&t_309.$1;
              if(0==$phi$64){
                var $phi$63 = t_309
              } else {
                var $phi$66 = (f_307(depth_308+1))((getIx(ix_322))(t_309.$2));
                if($phi$66.$tag==0){
                  var bitmap2_324 = (bitNot(m_321))&t_309.$1;
                  var $phi$68 = length(t_309.$2);
                  if(1==$phi$68){
                    var $phi$67 = Empty_7
                  } else if(2==$phi$68){
                    var $phi$67 = (getIx(1&(bitNot(ix_322))))(t_309.$2)
                  } else var $phi$67 = ((BitmapIndexed_10(t_309.$0))(bitmap2_324))(((arrDel(ix_322))(1))(t_309.$2));
                  var $phi$65 = $phi$67
                } else var $phi$65 = ((BitmapIndexed_10(t_309.$0))(t_309.$1))(((setIx(ix_322))($phi$66))(t_309.$2));
                var $phi$63 = $phi$65
              };
              var $phi$62 = $phi$63
            } else error("pattern match fail",t_309);
            return $phi$62
          }
        };
        return (f_307(0))(t_305)
      }
    }
  }
};
var setDiff_79 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_405){
      return function(b_406){
        return ((foldTrie_66(function(r_407){
          return function(k_408){
            return function(__409){
              return (((remove_63(local$instance$Hashable$1))(local$instance$Eq$0))(k_408))(r_407)
            }
          }
        }))(a_405))(b_406)
      }
    }
  }
};
var setToArray_78 = (foldTrie_66(function(vs_402){
  return function(v_403){
    return function(__404){
      return (push(v_403))(vs_402)
    }
  }
}))([]);
var mergeTrie_70 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_385){
      return function(b_386){
        return ((foldTrie_66(function(a_387){
          return function(k_388){
            return function(v_389){
              return ((((insert_61(local$instance$Hashable$1))(local$instance$Eq$0))(k_388))(v_389))(a_387)
            }
          }
        }))(a_385))(b_386)
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
    return function(vs_396){
      return function(s_397){
        return ((foldl(function(s_398){
          return function(v_399){
            return (((setAdd_73(local$instance$Hashable$1))(local$instance$Eq$0))(v_399))(s_398)
          }
        }))(s_397))(vs_396)
      }
    }
  }
};
var trieKeys_71 = function(m_390){
  return ((foldTrie_66(function(ks_391){
    return function(k_392){
      return function(__393){
        return (push(k_392))(ks_391)
      }
    }
  }))([]))(m_390)
};
var size_68 = function(t_374){
  if(t_374.$tag==0){
    var $phi$73 = 0
  } else if(t_374.$tag==1){
    var $phi$73 = 1
  } else if(t_374.$tag==2){
    var $phi$73 = length(t_374.$1)
  } else if(t_374.$tag==3){
    var $phi$73 = ((foldl($add))(0))((map(size_68))(t_374.$2))
  } else error("pattern match fail",t_374);
  return $phi$73
};
var mapTrie_67 = function(f_363){
  return function(t_364){
    if(t_364.$tag==0){
      var $phi$74 = Empty_7
    } else if(t_364.$tag==1){
      var $phi$74 = ((Leaf_8(t_364.$0))(t_364.$1))((f_363(t_364.$1))(t_364.$2))
    } else if(t_364.$tag==2){
      var $phi$74 = ($_12(Collision_9(t_364.$0)))((map(function(e_370){
        return ($_12(Pair_3(fst_22(e_370))))((f_363(fst_22(e_370)))(snd_23(e_370)))
      }))(t_364.$1))
    } else if(t_364.$tag==3){
      var $phi$74 = ($_12((BitmapIndexed_10(t_364.$0))(t_364.$1)))((map(mapTrie_67(f_363)))(t_364.$2))
    } else error("pattern match fail",t_364);
    return $phi$74
  }
};
var nodeMask_56 = function(t_240){
  if(t_240.$tag==0){
    var $phi$75 = 0
  } else if(t_240.$tag==1){
    var $phi$75 = t_240.$0
  } else if(t_240.$tag==2){
    var $phi$75 = t_240.$0
  } else if(t_240.$tag==3){
    var $phi$75 = t_240.$0
  } else error("pattern match fail",t_240);
  return $phi$75
};
var isEmpty_69 = function(t_383){
  if(t_383.$tag==0){
    var $phi$76 = true
  } else var $phi$76 = false;
  return $phi$76
};
var filterTrie_65 = function(f_330){
  return function(t_331){
    if(t_331.$tag==0){
      var $phi$77 = Empty_7
    } else if(t_331.$tag==1){
      var $phi$82 = (f_330(t_331.$1))(t_331.$2);
      if(!$phi$82){
        var $phi$81 = Empty_7
      } else if($phi$82){
        var $phi$81 = t_331
      } else error("pattern match fail",$phi$82);
      var $phi$77 = $phi$81
    } else if(t_331.$tag==2){
      var entries2_337 = (filter(function(e_338){
        return (f_330(fst_22(e_338)))(snd_23(e_338))
      }))(t_331.$1);
      var $phi$80 = length(entries2_337);
      if(0==$phi$80){
        var $phi$79 = Empty_7
      } else if(1==$phi$80){
        var $phi$79 = ((Leaf_8(t_331.$0))(fst_22((getIx(0))(entries2_337))))(snd_23((getIx(0))(entries2_337)))
      } else var $phi$79 = (Collision_9(t_331.$0))(entries2_337);
      var $phi$77 = $phi$79
    } else if(t_331.$tag==3){
      var pred_343 = function(e_346){
        return not_26(isEmpty_69(e_346))
      };
      var entries2_344 = (filter(pred_343))((map(filterTrie_65(f_330)))(t_331.$2));
      var bitmap2_345 = ((foldl(function(r_347){
        return function(e_348){
          return r_347|(nodeMask_56(e_348))
        }
      }))(0))(entries2_344);
      if(0==bitmap2_345){
        var $phi$78 = Empty_7
      } else var $phi$78 = ((BitmapIndexed_10(t_331.$0))(bitmap2_345))(entries2_344);
      var $phi$77 = $phi$78
    } else error("pattern match fail",t_331);
    return $phi$77
  }
};
var nextSetBitMask_64 = function(m_327){
  return function(n_328){
    var $phi$84 = m_327&n_328;
    if(0==$phi$84){
      var $phi$83 = (nextSetBitMask_64(m_327<<1))(n_328)
    } else var $phi$83 = m_327;
    return $phi$83
  }
};
var updateOrSet_62 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_299){
      return function(f_300){
        return function(d_301){
          return function(m_302){
            var $phi$86 = (((lookup_60(local$instance$Hashable$1))(local$instance$Eq$0))(k_299))(m_302);
            if($phi$86.$tag==1){
              var $phi$85 = ((((insert_61(local$instance$Hashable$1))(local$instance$Eq$0))(k_299))(d_301))(m_302)
            } else if($phi$86.$tag==0){
              var $phi$85 = ((((insert_61(local$instance$Hashable$1))(local$instance$Eq$0))(k_299))(f_300($phi$86.$0)))(m_302)
            } else error("pattern match fail",$phi$86);
            return $phi$85
          }
        }
      }
    }
  }
};
var runState_54 = function(s_235){
  return function(m_236){
    var $phi$87 = m_236.$0(s_235);
    return $phi$87
  }
};
var evalState_55 = function(s_238){
  return function(m_239){
    return snd_23((runState_54(s_238))(m_239))
  }
};
var sets_53 = function(s_233){
  return State_6(function(__234){
    return (Pair_3(s_233))(Unit_0)
  })
};
var gets_52 = State_6(function(s_232){
  return (Pair_3(s_232))(s_232)
});
var foldM_49 = function(local$instance$Monad$0){
  return function(f_219){
    return function(r_220){
      return function(xs_221){
        return ((foldl(function(r_222){
          return function(x_223){
            return (($gt$gt$eq(local$instance$Monad$0))(r_222))(function(r_224){
              return (f_219(r_224))(x_223)
            })
          }
        }))((ret(local$instance$Monad$0))(r_220)))(xs_221)
      }
    }
  }
};
var mapM_50 = function(local$instance$Monad$0){
  return function(f_225){
    return function(xs_226){
      return (((foldM_49(local$instance$Monad$0))(function(xs_227){
        return function(x_228){
          return (($gt$gt$eq(local$instance$Monad$0))(f_225(x_228)))(function(x_229){
            return (ret(local$instance$Monad$0))((push(x_229))(xs_227))
          })
        }
      }))([]))(xs_226)
    }
  }
};
var forM_51 = function(local$instance$Monad$0){
  return function(xs_230){
    return function(f_231){
      return ((mapM_50(local$instance$Monad$0))(f_231))(xs_230)
    }
  }
};
var strToArray_48 = function(s_214){
  var f_215 = function(p_216){
    var $phi$90 = (($lt($instance$Ord$2))(p_216.$0))(length(s_214));
    if(!$phi$90){
      var $phi$89 = Right_5(p_216.$1)
    } else if($phi$90){
      var $phi$89 = Left_4((Pair_3(p_216.$0+1))((push((getChar(p_216.$0))(s_214)))(p_216.$1)))
    } else error("pattern match fail",$phi$90);
    var $phi$88 = $phi$89;
    return $phi$88
  };
  return (loop_27(f_215))((Pair_3(0))([]))
};
var toRecord_47 = (foldl(function(r_210){
  return function(p_211){
    var $phi$91 = ((set(p_211.$0))(p_211.$1))(r_210);
    return $phi$91
  }
}))(empty);
var reverse_46 = (foldl(function(xs_208){
  return function(x_209){
    return (enqueue(x_209))(xs_208)
  }
}))([]);
var tail_41 = slice(1);
var head_40 = getIx(0);
var uniq_45 = function(local$instance$Eq$0){
  return function(xs_207){
    var $phi$93 = (($lt($instance$Ord$2))(length(xs_207)))(2);
    if($phi$93){
      var $phi$92 = xs_207
    } else if(!$phi$93){
      var $phi$95 = (($eq$eq(local$instance$Eq$0))((getIx(0))(xs_207)))((getIx(1))(xs_207));
      if(!$phi$95){
        var $phi$94 = (enqueue(head_40(xs_207)))((uniq_45(local$instance$Eq$0))(tail_41(xs_207)))
      } else if($phi$95){
        var $phi$94 = (uniq_45(local$instance$Eq$0))(tail_41(xs_207))
      } else error("pattern match fail",$phi$95);
      var $phi$92 = $phi$94
    } else error("pattern match fail",$phi$93);
    return $phi$92
  }
};
var mergeSet_44 = function(local$instance$Ord$1){
  return function(local$instance$Eq$0){
    return function(xs_203){
      return function(ys_204){
        var $phi$97 = length(xs_203);
        if(0==$phi$97){
          var $phi$96 = ys_204
        } else {
          var $phi$99 = length(ys_204);
          if(0==$phi$99){
            var $phi$98 = xs_203
          } else {
            var $phi$101 = (($lt(local$instance$Ord$1))(head_40(xs_203)))(head_40(ys_204));
            if($phi$101){
              var $phi$100 = (enqueue(head_40(xs_203)))((((mergeSet_44(local$instance$Ord$1))(local$instance$Eq$0))(tail_41(xs_203)))(ys_204))
            } else if(!$phi$101){
              var $phi$103 = (($eq$eq(local$instance$Eq$0))(head_40(xs_203)))(head_40(ys_204));
              if($phi$103){
                var $phi$102 = (enqueue(head_40(xs_203)))((((mergeSet_44(local$instance$Ord$1))(local$instance$Eq$0))(tail_41(xs_203)))(tail_41(ys_204)))
              } else if(!$phi$103){
                var $phi$102 = (enqueue(head_40(ys_204)))((((mergeSet_44(local$instance$Ord$1))(local$instance$Eq$0))(xs_203))(tail_41(ys_204)))
              } else error("pattern match fail",$phi$103);
              var $phi$100 = $phi$102
            } else error("pattern match fail",$phi$101);
            var $phi$98 = $phi$100
          };
          var $phi$96 = $phi$98
        };
        return $phi$96
      }
    }
  }
};
var init_43 = function(l_202){
  return ((slice2(0))((length(l_202))-1))(l_202)
};
var last_42 = function(l_201){
  return (getIx((length(l_201))-1))(l_201)
};
var mapJust_39 = function(f_195){
  return function(xs_196){
    var g_197 = function(r_198){
      return function(x_199){
        var $phi$105 = f_195(x_199);
        if($phi$105.$tag==1){
          var $phi$104 = r_198
        } else if($phi$105.$tag==0){
          var $phi$104 = (push($phi$105.$0))(r_198)
        } else error("pattern match fail",$phi$105);
        return $phi$104
      }
    };
    return ((foldl(g_197))([]))(xs_196)
  }
};
var concatMap_38 = function(f_193){
  return function(a_194){
    return ((foldl(concat))([]))((map(f_193))(a_194))
  }
};
var zip_37 = function(xs_191){
  return function(ys_192){
    var $phi$107 = ($or((($eq$eq($instance$Eq$0))(length(xs_191)))(0)))((($eq$eq($instance$Eq$0))(length(ys_192)))(0));
    if($phi$107){
      var $phi$106 = []
    } else if(!$phi$107){
      var $phi$106 = (enqueue((Pair_3(head_40(xs_191)))(head_40(ys_192))))((zip_37(tail_41(xs_191)))(tail_41(ys_192)))
    } else error("pattern match fail",$phi$107);
    return $phi$106
  }
};
var zipWithIndex2_35 = function(n_188){
  return function(xs_189){
    var $phi$109 = length(xs_189);
    if(0==$phi$109){
      var $phi$108 = []
    } else var $phi$108 = (enqueue((Pair_3(n_188))(head_40(xs_189))))((zipWithIndex2_35(n_188+1))(tail_41(xs_189)));
    return $phi$108
  }
};
var zipWithIndex_36 = zipWithIndex2_35(0);
var join_34 = function(xs_183){
  return function(s_184){
    var $phi$111 = length(xs_183);
    if(0==$phi$111){
      var $phi$110 = ""
    } else var $phi$110 = (foldl1(function(a_186){
      return function(b_187){
        return ($concat(($concat(a_186))(s_184)))(b_187)
      }
    }))(xs_183);
    return $phi$110
  }
};
var all_33 = function(f_179){
  return function(xs_180){
    return ((foldl(function(r_181){
      return function(x_182){
        return ($and(f_179(x_182)))(r_181)
      }
    }))(true))(xs_180)
  }
};
var exists_32 = function(f_175){
  return function(xs_176){
    return ((foldl(function(r_177){
      return function(x_178){
        return ($or(f_175(x_178)))(r_177)
      }
    }))(false))(xs_176)
  }
};
var containsChar_31 = function(x_171){
  return function(xs_172){
    var f_173 = function(i_174){
      var $phi$113 = (($lt($instance$Ord$2))(i_174))(length(xs_172));
      if(!$phi$113){
        var $phi$112 = false
      } else if($phi$113){
        var $phi$115 = (($eq$eq($instance$Eq$1))((getChar(i_174))(xs_172)))(x_171);
        if($phi$115){
          var $phi$114 = true
        } else if(!$phi$115){
          var $phi$114 = f_173(i_174+1)
        } else error("pattern match fail",$phi$115);
        var $phi$112 = $phi$114
      } else error("pattern match fail",$phi$113);
      return $phi$112
    };
    return f_173(0)
  }
};
var contains_28 = function(local$instance$Eq$0){
  return function(x_160){
    return function(xs_161){
      var f_162 = function(i_163){
        var $phi$117 = (($lt($instance$Ord$2))(i_163))(length(xs_161));
        if(!$phi$117){
          var $phi$116 = Right_5(false)
        } else if($phi$117){
          var $phi$119 = (($eq$eq(local$instance$Eq$0))(x_160))((getIx(i_163))(xs_161));
          if($phi$119){
            var $phi$118 = Right_5(true)
          } else if(!$phi$119){
            var $phi$118 = Left_4(i_163+1)
          } else error("pattern match fail",$phi$119);
          var $phi$116 = $phi$118
        } else error("pattern match fail",$phi$117);
        return $phi$116
      };
      return (loop_27(f_162))(0)
    }
  }
};
var either_24 = function(f_130){
  return function(g_131){
    return function(e_132){
      if(e_132.$tag==0){
        var $phi$120 = f_130(e_132.$0)
      } else if(e_132.$tag==1){
        var $phi$120 = g_131(e_132.$0)
      } else error("pattern match fail",e_132);
      return $phi$120
    }
  }
};
var splitEither_25 = function(a_135){
  return (Pair_3((map(function(e_136){
    if(e_136.$tag==0){
      var $phi$121 = e_136.$0
    } else error("pattern match fail",e_136);
    return $phi$121
  }))((filter((either_24(function(__138){
    return true
  }))(function(__139){
    return false
  })))(a_135))))((map(function(e_140){
    if(e_140.$tag==1){
      var $phi$122 = e_140.$0
    } else error("pattern match fail",e_140);
    return $phi$122
  }))((filter((either_24(function(__142){
    return false
  }))(function(__143){
    return true
  })))(a_135)))
};
var fromJust_20 = function(m_120){
  if(m_120.$tag==0){
    var $phi$123 = m_120.$0
  } else if(m_120.$tag==1){
    var $phi$123 = error("expected Just but got Nothing")
  } else error("pattern match fail",m_120);
  return $phi$123
};
var justOr_19 = function(d_117){
  return function(m_118){
    if(m_118.$tag==0){
      var $phi$124 = m_118.$0
    } else if(m_118.$tag==1){
      var $phi$124 = d_117
    } else error("pattern match fail",m_118);
    return $phi$124
  }
};
var maybe_18 = function(a_113){
  return function(b_114){
    return function(m_115){
      if(m_115.$tag==0){
        var $phi$125 = a_113(m_115.$0)
      } else if(m_115.$tag==1){
        var $phi$125 = b_114
      } else error("pattern match fail",m_115);
      return $phi$125
    }
  }
};
var $gt$gt_17 = function(local$instance$Monad$0){
  return function(a_110){
    return function(b_111){
      return (($gt$gt$eq(local$instance$Monad$0))(a_110))(function(__112){
        return b_111
      })
    }
  }
};
var $gt$eq_16 = function(local$instance$Ord$0){
  return function(a_108){
    return function(b_109){
      return not_26((($lt(local$instance$Ord$0))(a_108))(b_109))
    }
  }
};
var $lt$eq_15 = function(local$instance$Ord$0){
  return function(a_106){
    return function(b_107){
      return not_26((($lt(local$instance$Ord$0))(b_107))(a_106))
    }
  }
};
var $gt_14 = function(local$instance$Ord$0){
  return function(a_104){
    return function(b_105){
      return (($lt(local$instance$Ord$0))(b_105))(a_104)
    }
  }
};
var Pair_482 = Pair_3;
var mapSnd_483 = mapSnd_84;
var mapFst_484 = mapFst_83;
var $gt$eq$gt_485 = $gt$eq$gt_82;
var snd_486 = snd_23;
var debug2_487 = debug2_81;
var Just_488 = Just_1;
var Nothing_489 = Nothing_2;
var isJust_490 = isJust_21;
var Empty_491 = Empty_7;
var Leaf_492 = Leaf_8;
var Collision_493 = Collision_9;
var BitmapIndexed_494 = BitmapIndexed_10;
var $_495 = $_12;
var fst_496 = fst_22;
var Left_497 = Left_4;
var Right_498 = Right_5;
var loop_499 = loop_27;
var find_500 = find_29;
var hamtMask_501 = hamtMask_58;
var popCount_502 = popCount_57;
var hamtIndex_503 = hamtIndex_59;
var lookup_504 = lookup_60;
var setContains_505 = setContains_76;
var foldTrie_506 = foldTrie_66;
var emptySet_507 = emptySet_72;
var Unit_508 = Unit_0;
var not_509 = not_26;
var $div$eq_510 = $div$eq_13;
var mapIx_511 = mapIx_30;
var insert_512 = insert_61;
var setAdd_513 = setAdd_73;
var setIntersection_514 = setIntersection_80;
var remove_515 = remove_63;
var setDiff_516 = setDiff_79;
var setToArray_517 = setToArray_78;
var mergeTrie_518 = mergeTrie_70;
var setUnion_519 = setUnion_77;
var setRemove_520 = setRemove_75;
var setAddAll_521 = setAddAll_74;
var trieKeys_522 = trieKeys_71;
var size_523 = size_68;
var mapTrie_524 = mapTrie_67;
var nodeMask_525 = nodeMask_56;
var isEmpty_526 = isEmpty_69;
var filterTrie_527 = filterTrie_65;
var nextSetBitMask_528 = nextSetBitMask_64;
var updateOrSet_529 = updateOrSet_62;
var State_530 = State_6;
var runState_531 = runState_54;
var evalState_532 = evalState_55;
var sets_533 = sets_53;
var gets_534 = gets_52;
var foldM_535 = foldM_49;
var mapM_536 = mapM_50;
var forM_537 = forM_51;
var strToArray_538 = strToArray_48;
var toRecord_539 = toRecord_47;
var reverse_540 = reverse_46;
var tail_541 = tail_41;
var head_542 = head_40;
var uniq_543 = uniq_45;
var mergeSet_544 = mergeSet_44;
var init_545 = init_43;
var last_546 = last_42;
var mapJust_547 = mapJust_39;
var concatMap_548 = concatMap_38;
var zip_549 = zip_37;
var zipWithIndex2_550 = zipWithIndex2_35;
var zipWithIndex_551 = zipWithIndex_36;
var join_552 = join_34;
var all_553 = all_33;
var exists_554 = exists_32;
var containsChar_555 = containsChar_31;
var contains_556 = contains_28;
var either_557 = either_24;
var splitEither_558 = splitEither_25;
var fromJust_559 = fromJust_20;
var justOr_560 = justOr_19;
var maybe_561 = maybe_18;
var $gt$gt_562 = $gt$gt_17;
var $gt$eq_563 = $gt$eq_16;
var $lt$eq_564 = $lt$eq_15;
var $gt_565 = $gt_14;
var Identity_566 = Identity_11;
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
var dfs_567 = function(g_571){
  return function(visited_572){
    return function(v_573){
      var visit_574 = function(r_577){
        return function(e_578){
          var $phi$127 = ((contains_556($import1$instance$Eq$1))(e_578))(r_577);
          if($phi$127){
            var $phi$126 = r_577
          } else if(!$phi$127){
            var $phi$126 = (concat(((dfs_567(g_571))((push(v_573))((concat(r_577))(visited_572))))(e_578)))(r_577)
          } else error("pattern match fail",$phi$127);
          return $phi$126
        }
      };
      var es_575 = (filter(function(v_579){
        return not_509(((contains_556($import1$instance$Eq$1))(v_579))(visited_572))
      }))((get(v_573))(g_571));
      var r_576 = ((foldr(visit_574))([]))(es_575);
      return (enqueue(v_573))(r_576)
    }
  }
};
var fullDfs_568 = function(g_580){
  var visit_581 = function(result_583){
    return function(v_584){
      return function(__585){
        var $phi$129 = ((contains_556($import1$instance$Eq$1))(v_584))(result_583);
        if($phi$129){
          var $phi$128 = result_583
        } else if(!$phi$129){
          var $phi$128 = (concat(((dfs_567(g_580))(result_583))(v_584)))(result_583)
        } else error("pattern match fail",$phi$129);
        return $phi$128
      }
    }
  };
  var result_582 = ((foldRecord(visit_581))([]))(g_580);
  return result_582
};
var scc_569 = function(g_586){
  var invertEdge_591 = function(v_593){
    return function(ig_594){
      return function(e_595){
        var $phi$131 = (has(e_595))(ig_594);
        if($phi$131){
          var $phi$130 = ((set(e_595))((push(v_593))((get(e_595))(ig_594))))(ig_594)
        } else if(!$phi$131){
          var $phi$130 = ((set(e_595))([v_593]))(ig_594)
        } else error("pattern match fail",$phi$131);
        return $phi$130
      }
    }
  };
  var invert_592 = function(ig_596){
    return function(v_597){
      return function(es_598){
        var $phi$133 = (has(v_597))(ig_596);
        if($phi$133){
          var $phi$132 = ig_596
        } else if(!$phi$133){
          var $phi$132 = ((set(v_597))([]))(ig_596)
        } else error("pattern match fail",$phi$133);
        var ig2_599 = $phi$132;
        return ((foldl(invertEdge_591(v_597)))(ig2_599))(es_598)
      }
    }
  };
  var invertedG_587 = ((foldRecord(invert_592))(empty))(g_586);
  var assembleCc_588 = function(gs_600){
    return function(v_601){
      var $phi$136 = (exists_554((contains_556($import1$instance$Eq$1))(v_601)))(gs_600.$1);
      if($phi$136){
        var $phi$135 = (Pair_482(gs_600.$0))(gs_600.$1)
      } else if(!$phi$136){
        var cc_604 = ((dfs_567(gs_600.$0))([]))(v_601);
        var ig2_605 = ((foldl(function(g_606){
          return function(v_607){
            return (del(v_607))((mapRecord(filter(function(w_608){
              return (($div$eq_510($import1$instance$Eq$1))(w_608))(v_607)
            })))(g_606))
          }
        }))(gs_600.$0))(cc_604);
        var $phi$135 = (Pair_482(ig2_605))((push(cc_604))(gs_600.$1))
      } else error("pattern match fail",$phi$136);
      var $phi$134 = $phi$135;
      return $phi$134
    }
  };
  var firstDfs_589 = fullDfs_568(g_586);
  var ccs_590 = snd_486(((foldl(assembleCc_588))((Pair_482(invertedG_587))([])))(firstDfs_589));
  return ccs_590
};
var sccSorted_570 = function(g_609){
  var ccs_610 = scc_569(g_609);
  var topSort_611 = function(ccs_613){
    var f_618 = function(r_619){
      return function(icc_620){
        var $phi$137 = ((foldl(function(r_623){
          return function(c_624){
            return ((set(c_624))(intToString(icc_620.$0)))(r_623)
          }
        }))(r_619))(icc_620.$1);
        return $phi$137
      }
    };
    var g2g_614 = ((foldl(f_618))(empty))(zipWithIndex_551(ccs_613));
    var addGraph_615 = function(r_625){
      return function(v_626){
        return function(es_627){
          var rv_628 = (get(v_626))(g2g_614);
          var res_629 = (uniq_543($import1$instance$Eq$1))(sort((filter(function(re_630){
            return (($div$eq_510($import1$instance$Eq$1))(re_630))(rv_628)
          }))((map(function(e_631){
            return (get(e_631))(g2g_614)
          }))(es_627))));
          var $phi$139 = (has(rv_628))(r_625);
          if(!$phi$139){
            var $phi$138 = ((set(rv_628))(res_629))(r_625)
          } else if($phi$139){
            var $phi$138 = ((set(rv_628))((((mergeSet_544($import1$instance$Ord$3))($import1$instance$Eq$1))(res_629))((get(rv_628))(r_625))))(r_625)
          } else error("pattern match fail",$phi$139);
          return $phi$138
        }
      }
    };
    var cg_616 = ((foldRecord(addGraph_615))(empty))(g_609);
    var ord_617 = fullDfs_568(cg_616);
    return reverse_540((map(function(i_632){
      return (getIx(unsafeStringToInt(i_632)))(ccs_613)
    }))(ord_617))
  };
  var result_612 = topSort_611(ccs_610);
  return result_612
};
var Pair_633 = Pair_3;
var mapSnd_634 = mapSnd_84;
var mapFst_635 = mapFst_83;
var $gt$eq$gt_636 = $gt$eq$gt_82;
var snd_637 = snd_23;
var debug2_638 = debug2_81;
var Just_639 = Just_1;
var Nothing_640 = Nothing_2;
var isJust_641 = isJust_21;
var Empty_642 = Empty_7;
var Leaf_643 = Leaf_8;
var Collision_644 = Collision_9;
var BitmapIndexed_645 = BitmapIndexed_10;
var $_646 = $_12;
var fst_647 = fst_22;
var Left_648 = Left_4;
var Right_649 = Right_5;
var loop_650 = loop_27;
var find_651 = find_29;
var hamtMask_652 = hamtMask_58;
var popCount_653 = popCount_57;
var hamtIndex_654 = hamtIndex_59;
var lookup_655 = lookup_60;
var setContains_656 = setContains_76;
var foldTrie_657 = foldTrie_66;
var emptySet_658 = emptySet_72;
var Unit_659 = Unit_0;
var not_660 = not_26;
var $div$eq_661 = $div$eq_13;
var mapIx_662 = mapIx_30;
var insert_663 = insert_61;
var setAdd_664 = setAdd_73;
var setIntersection_665 = setIntersection_80;
var remove_666 = remove_63;
var setDiff_667 = setDiff_79;
var setToArray_668 = setToArray_78;
var mergeTrie_669 = mergeTrie_70;
var setUnion_670 = setUnion_77;
var setRemove_671 = setRemove_75;
var setAddAll_672 = setAddAll_74;
var trieKeys_673 = trieKeys_71;
var size_674 = size_68;
var mapTrie_675 = mapTrie_67;
var nodeMask_676 = nodeMask_56;
var isEmpty_677 = isEmpty_69;
var filterTrie_678 = filterTrie_65;
var nextSetBitMask_679 = nextSetBitMask_64;
var updateOrSet_680 = updateOrSet_62;
var State_681 = State_6;
var runState_682 = runState_54;
var evalState_683 = evalState_55;
var sets_684 = sets_53;
var gets_685 = gets_52;
var foldM_686 = foldM_49;
var mapM_687 = mapM_50;
var forM_688 = forM_51;
var strToArray_689 = strToArray_48;
var toRecord_690 = toRecord_47;
var reverse_691 = reverse_46;
var tail_692 = tail_41;
var head_693 = head_40;
var uniq_694 = uniq_45;
var mergeSet_695 = mergeSet_44;
var init_696 = init_43;
var last_697 = last_42;
var mapJust_698 = mapJust_39;
var concatMap_699 = concatMap_38;
var zip_700 = zip_37;
var zipWithIndex2_701 = zipWithIndex2_35;
var zipWithIndex_702 = zipWithIndex_36;
var join_703 = join_34;
var all_704 = all_33;
var exists_705 = exists_32;
var containsChar_706 = containsChar_31;
var contains_707 = contains_28;
var either_708 = either_24;
var splitEither_709 = splitEither_25;
var fromJust_710 = fromJust_20;
var justOr_711 = justOr_19;
var maybe_712 = maybe_18;
var $gt$gt_713 = $gt$gt_17;
var $gt$eq_714 = $gt$eq_16;
var $lt$eq_715 = $lt$eq_15;
var $gt_716 = $gt_14;
var Identity_717 = Identity_11;
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
var App_726 = function($_0_791){
  return function($_1_792){
    return function($_2_793){
      return {$0:$_0_791,$1:$_1_792,$2:$_2_793,$tag:2}
    }
  }
};
var Lam_727 = function($_0_794){
  return function($_1_795){
    return function($_2_796){
      return {$0:$_0_794,$1:$_1_795,$2:$_2_796,$tag:3}
    }
  }
};
var Case_728 = function($_0_797){
  return function($_1_798){
    return function($_2_799){
      return {$0:$_0_797,$1:$_1_798,$2:$_2_799,$tag:4}
    }
  }
};
var Let_729 = function($_0_800){
  return function($_1_801){
    return function($_2_802){
      return {$0:$_0_800,$1:$_1_801,$2:$_2_802,$tag:5}
    }
  }
};
var New_730 = function($_0_803){
  return function($_1_804){
    return function($_2_805){
      return {$0:$_0_803,$1:$_1_804,$2:$_2_805,$tag:6}
    }
  }
};
var AnnType_718 = function($_0_780){
  return {$0:$_0_780,$tag:0}
};
var TUnknown_749 = {$tag:6};
var Var_724 = function($_0_787){
  return function($_1_788){
    return {$0:$_0_787,$1:$_1_788,$tag:0}
  }
};
var Const_725 = function($_0_789){
  return function($_1_790){
    return {$0:$_0_789,$1:$_1_790,$tag:1}
  }
};
var Data_738 = function($_0_825){
  return function($_1_826){
    return function($_2_827){
      return function($_3_828){
        return {$0:$_0_825,$1:$_1_826,$2:$_2_827,$3:$_3_828}
      }
    }
  }
};
var DataCon_739 = function($_0_829){
  return function($_1_830){
    return function($_2_831){
      return {$0:$_0_829,$1:$_1_830,$2:$_2_831}
    }
  }
};
var TCBound_742 = function($_0_840){
  return function($_1_841){
    return function($_2_842){
      return {$0:$_0_840,$1:$_1_841,$2:$_2_842}
    }
  }
};
var TConst_743 = function($_0_843){
  return function($_1_844){
    return {$0:$_0_843,$1:$_1_844,$tag:0}
  }
};
var TVar_744 = function($_0_845){
  return function($_1_846){
    return {$0:$_0_845,$1:$_1_846,$tag:1}
  }
};
var TApp_745 = function($_0_847){
  return function($_1_848){
    return function($_2_849){
      return {$0:$_0_847,$1:$_1_848,$2:$_2_849,$tag:2}
    }
  }
};
var TRow_746 = function($_0_850){
  return function($_1_851){
    return function($_2_852){
      return {$0:$_0_850,$1:$_1_851,$2:$_2_852,$tag:3}
    }
  }
};
var TBot_747 = {$tag:4};
var TForall_748 = function($_0_853){
  return function($_1_854){
    return function($_2_855){
      return function($_3_856){
        return {$0:$_0_853,$1:$_1_854,$2:$_2_855,$3:$_3_856,$tag:5}
      }
    }
  }
};
var AnnCodeLoc_719 = function($_0_781){
  return function($_1_782){
    return function($_2_783){
      return {$0:$_0_781,$1:$_1_782,$2:$_2_783,$tag:1}
    }
  }
};
var ImportAll_752 = function($_0_863){
  return function($_1_864){
    return {$0:$_0_863,$1:$_1_864,$tag:2}
  }
};
var ImportOpen_751 = function($_0_860){
  return function($_1_861){
    return function($_2_862){
      return {$0:$_0_860,$1:$_1_861,$2:$_2_862,$tag:1}
    }
  }
};
var ImportClosed_750 = function($_0_857){
  return function($_1_858){
    return function($_2_859){
      return {$0:$_0_857,$1:$_1_858,$2:$_2_859,$tag:0}
    }
  }
};
var Instance_741 = function($_0_836){
  return function($_1_837){
    return function($_2_838){
      return function($_3_839){
        return {$0:$_0_836,$1:$_1_837,$2:$_2_838,$3:$_3_839}
      }
    }
  }
};
var Class_740 = function($_0_832){
  return function($_1_833){
    return function($_2_834){
      return function($_3_835){
        return {$0:$_0_832,$1:$_1_833,$2:$_2_834,$3:$_3_835}
      }
    }
  }
};
var ModuleInterface_737 = function($_0_822){
  return function($_1_823){
    return function($_2_824){
      return {$0:$_0_822,$1:$_1_823,$2:$_2_824}
    }
  }
};
var Module_736 = function($_0_815){
  return function($_1_816){
    return function($_2_817){
      return function($_3_818){
        return function($_4_819){
          return function($_5_820){
            return function($_6_821){
              return {$0:$_0_815,$1:$_1_816,$2:$_2_817,$3:$_3_818,$4:$_4_819,$5:$_5_820,$6:$_6_821}
            }
          }
        }
      }
    }
  }
};
var PData_735 = function($_0_812){
  return function($_1_813){
    return function($_2_814){
      return {$0:$_0_812,$1:$_1_813,$2:$_2_814,$tag:2}
    }
  }
};
var PConst_734 = function($_0_810){
  return function($_1_811){
    return {$0:$_0_810,$1:$_1_811,$tag:1}
  }
};
var PVar_733 = function($_0_808){
  return function($_1_809){
    return {$0:$_0_808,$1:$_1_809,$tag:0}
  }
};
var CStr_732 = function($_0_807){
  return {$0:$_0_807,$tag:1}
};
var CNum_731 = function($_0_806){
  return {$0:$_0_806,$tag:0}
};
var AnnExport_723 = function($_0_786){
  return {$0:$_0_786,$tag:5}
};
var AnnTag_722 = {$tag:4};
var AnnData_721 = function($_0_785){
  return {$0:$_0_785,$tag:3}
};
var AnnUseCount_720 = function($_0_784){
  return {$0:$_0_784,$tag:2}
};
var breakableDownAndUpM_775 = function(local$instance$Monad$0){
  return function(down_1068){
    return function(up_1069){
      return function(e_1070){
        var go_1071 = ((breakableDownAndUpM_775(local$instance$Monad$0))(down_1068))(up_1069);
        var gos_1072 = (mapM_687(local$instance$Monad$0))(function(d_1073){
          var $phi$140 = (($gt$gt$eq(local$instance$Monad$0))(go_1071(d_1073.$1)))(function(e_1076){
            return (ret(local$instance$Monad$0))((Pair_633(d_1073.$0))(e_1076))
          });
          return $phi$140
        });
        return (($gt$gt$eq(local$instance$Monad$0))(down_1068(e_1070)))(function(e_1077){
          if(e_1077.$tag==1){
            var $phi$141 = (ret(local$instance$Monad$0))(e_1077.$0)
          } else if(e_1077.$tag==0){
            if(e_1077.$0.$tag==3){
              var $phi$142 = (($gt$gt$eq(local$instance$Monad$0))(go_1071(e_1077.$0.$2)))(function(e_1083){
                return up_1069(((Lam_727(e_1077.$0.$0))(e_1077.$0.$1))(e_1083))
              })
            } else if(e_1077.$0.$tag==2){
              var $phi$142 = (($gt$gt$eq(local$instance$Monad$0))(go_1071(e_1077.$0.$1)))(function(f_1087){
                return (($gt$gt$eq(local$instance$Monad$0))(go_1071(e_1077.$0.$2)))(function(x_1088){
                  return up_1069(((App_726(e_1077.$0.$0))(f_1087))(x_1088))
                })
              })
            } else if(e_1077.$0.$tag==4){
              var $phi$142 = (($gt$gt$eq(local$instance$Monad$0))(go_1071(e_1077.$0.$1)))(function(e_1092){
                return (($gt$gt$eq(local$instance$Monad$0))(gos_1072(e_1077.$0.$2)))(function(ps_1093){
                  return up_1069(((Case_728(e_1077.$0.$0))(e_1092))(ps_1093))
                })
              })
            } else if(e_1077.$0.$tag==5){
              var $phi$142 = (($gt$gt$eq(local$instance$Monad$0))(gos_1072(e_1077.$0.$1)))(function(bs_1097){
                return (($gt$gt$eq(local$instance$Monad$0))(go_1071(e_1077.$0.$2)))(function(e_1098){
                  return up_1069(((Let_729(e_1077.$0.$0))(bs_1097))(e_1098))
                })
              })
            } else if(e_1077.$0.$tag==6){
              var $phi$142 = (($gt$gt$eq(local$instance$Monad$0))(((mapM_687(local$instance$Monad$0))(go_1071))(e_1077.$0.$2)))(function(es_1102){
                return up_1069(((New_730(e_1077.$0.$0))(e_1077.$0.$1))(es_1102))
              })
            } else var $phi$142 = up_1069(e_1077.$0);
            var $phi$141 = $phi$142
          } else error("pattern match fail",e_1077);
          return $phi$141
        })
      }
    }
  }
};
var breakableDownM_779 = function(local$instance$Monad$0){
  return function(f_1109){
    return ((breakableDownAndUpM_775(local$instance$Monad$0))(f_1109))(ret(local$instance$Monad$0))
  }
};
var downAndUpM_776 = function(local$instance$Monad$0){
  return function(down_1104){
    return function(up_1105){
      return ((breakableDownAndUpM_775(local$instance$Monad$0))(function(e_1106){
        return (($gt$gt$eq(local$instance$Monad$0))(down_1104(e_1106)))(function(e_1107){
          return (ret(local$instance$Monad$0))(Left_648(e_1107))
        })
      }))(up_1105)
    }
  }
};
var downM_778 = function(local$instance$Monad$0){
  return function(f_1108){
    return ((downAndUpM_776(local$instance$Monad$0))(f_1108))(ret(local$instance$Monad$0))
  }
};
var upM_777 = function(local$instance$Monad$0){
  return (downAndUpM_776(local$instance$Monad$0))(ret(local$instance$Monad$0))
};
var breakableDownAndUp_770 = function(down_1006){
  return function(up_1007){
    return function(a_1008){
      return function(e_1009){
        var go_1010 = (breakableDownAndUp_770(down_1006))(up_1007);
        var gos_1011 = function(a_1012){
          return (foldl(function(ar_1013){
            return function(p_1014){
              var $phi$144 = (go_1010(fst_647(ar_1013)))(snd_637(p_1014));
              var $phi$143 = (Pair_633($phi$144.$0))((push((Pair_633(fst_647(p_1014)))($phi$144.$1)))(snd_637(ar_1013)));
              return $phi$143
            }
          }))((Pair_633(a_1012))([]))
        };
        var $phi$146 = (down_1006(a_1008))(e_1009);
        if($phi$146.$tag==1){
          var $phi$145 = $phi$146.$0
        } else if($phi$146.$tag==0){
          if($phi$146.$0.$1.$tag==3){
            var $phi$166 = (go_1010($phi$146.$0.$0))($phi$146.$0.$1.$2);
            var $phi$165 = (Pair_633($phi$166.$0))(((Lam_727($phi$146.$0.$1.$0))($phi$146.$0.$1.$1))($phi$166.$1));
            var $phi$147 = $phi$165
          } else if($phi$146.$0.$1.$tag==2){
            var $phi$162 = (go_1010($phi$146.$0.$0))($phi$146.$0.$1.$1);
            var $phi$164 = (go_1010($phi$162.$0))($phi$146.$0.$1.$2);
            var $phi$163 = (Pair_633($phi$164.$0))(((App_726($phi$146.$0.$1.$0))($phi$162.$1))($phi$164.$1));
            var $phi$161 = $phi$163;
            var $phi$147 = $phi$161
          } else if($phi$146.$0.$1.$tag==4){
            var $phi$158 = (go_1010($phi$146.$0.$0))($phi$146.$0.$1.$1);
            var $phi$160 = (gos_1011($phi$158.$0))($phi$146.$0.$1.$2);
            var $phi$159 = (Pair_633($phi$160.$0))(((Case_728($phi$146.$0.$1.$0))($phi$158.$1))($phi$160.$1));
            var $phi$157 = $phi$159;
            var $phi$147 = $phi$157
          } else if($phi$146.$0.$1.$tag==5){
            var $phi$154 = (gos_1011($phi$146.$0.$0))($phi$146.$0.$1.$1);
            var $phi$156 = (go_1010($phi$154.$0))($phi$146.$0.$1.$2);
            var $phi$155 = (Pair_633($phi$156.$0))(((Let_729($phi$146.$0.$1.$0))($phi$154.$1))($phi$156.$1));
            var $phi$153 = $phi$155;
            var $phi$147 = $phi$153
          } else if($phi$146.$0.$1.$tag==6){
            var f_1050 = function(aes_1051){
              return function(e_1052){
                var $phi$150 = (go_1010(aes_1051.$0))(e_1052);
                var $phi$149 = (Pair_633($phi$150.$0))((push($phi$150.$1))(aes_1051.$1));
                var $phi$148 = $phi$149;
                return $phi$148
              }
            };
            var $phi$152 = ((foldl(f_1050))((Pair_633(a_1008))([])))($phi$146.$0.$1.$2);
            var $phi$151 = (Pair_633($phi$152.$0))(((New_730($phi$146.$0.$1.$0))($phi$146.$0.$1.$1))($phi$152.$1));
            var $phi$147 = $phi$151
          } else var $phi$147 = (Pair_633($phi$146.$0.$0))($phi$146.$0.$1);
          var ae_1020 = $phi$147;
          var $phi$167 = (up_1007(ae_1020.$0))(ae_1020.$1);
          var $phi$145 = $phi$167
        } else error("pattern match fail",$phi$146);
        return $phi$145
      }
    }
  }
};
var breakableDown_774 = function(f_1067){
  return (breakableDownAndUp_770(f_1067))(Pair_633)
};
var downAndUp_771 = function(down_1062){
  return function(up_1063){
    return (breakableDownAndUp_770(function(a_1064){
      return function(e_1065){
        return Left_648((down_1062(a_1064))(e_1065))
      }
    }))(up_1063)
  }
};
var down_773 = function(f_1066){
  return (downAndUp_771(f_1066))(Pair_633)
};
var up_772 = downAndUp_771(Pair_633);
var getAnn_754 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(name_865){
      return function(ann_866){
        return (((lookup_655(local$instance$Hashable$1))(local$instance$Eq$0))(name_865))(ann_866)
      }
    }
  }
};
var getAnnType_757 = function(ann_876){
  var $phi$169 = (((getAnn_754($import1$instance$Hashable$13))($import1$instance$Eq$1))("type"))(ann_876);
  if(($phi$169.$tag==0)&&($phi$169.$0.$tag==0)){
    var $phi$168 = $phi$169.$0.$0
  } else if($phi$169.$tag==1){
    var $phi$168 = TUnknown_749
  } else error("pattern match fail",$phi$169);
  return $phi$168
};
var annOf_767 = function(e_964){
  if(e_964.$tag==0){
    var $phi$170 = e_964.$0
  } else if(e_964.$tag==1){
    var $phi$170 = e_964.$0
  } else if(e_964.$tag==2){
    var $phi$170 = e_964.$0
  } else if(e_964.$tag==3){
    var $phi$170 = e_964.$0
  } else if(e_964.$tag==4){
    var $phi$170 = e_964.$0
  } else if(e_964.$tag==5){
    var $phi$170 = e_964.$0
  } else if(e_964.$tag==6){
    var $phi$170 = e_964.$0
  } else error("pattern match fail",e_964);
  return $phi$170
};
var getType_769 = function(e_1005){
  return ($_646(getAnnType_757))(annOf_767(e_1005))
};
var withAnn_768 = function(ann_984){
  return function(e_985){
    if(e_985.$tag==0){
      var $phi$171 = (Var_724(ann_984))(e_985.$1)
    } else if(e_985.$tag==1){
      var $phi$171 = (Const_725(ann_984))(e_985.$1)
    } else if(e_985.$tag==2){
      var $phi$171 = ((App_726(ann_984))(e_985.$1))(e_985.$2)
    } else if(e_985.$tag==3){
      var $phi$171 = ((Lam_727(ann_984))(e_985.$1))(e_985.$2)
    } else if(e_985.$tag==4){
      var $phi$171 = ((Case_728(ann_984))(e_985.$1))(e_985.$2)
    } else if(e_985.$tag==5){
      var $phi$171 = ((Let_729(ann_984))(e_985.$1))(e_985.$2)
    } else if(e_985.$tag==6){
      var $phi$171 = ((New_730(ann_984))(e_985.$1))(e_985.$2)
    } else error("pattern match fail",e_985);
    return $phi$171
  }
};
var setAnn_755 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(name_867){
      return function(val_868){
        return function(ann_869){
          return ((((insert_663(local$instance$Hashable$1))(local$instance$Eq$0))(name_867))(val_868))(ann_869)
        }
      }
    }
  }
};
var setAnnType_758 = function(t_878){
  return function(ann_879){
    return ((((setAnn_755($import1$instance$Hashable$13))($import1$instance$Eq$1))("type"))(AnnType_718(t_878)))(ann_879)
  }
};
var setType_766 = function(t_943){
  return function(e_944){
    if(e_944.$tag==0){
      var $phi$172 = (Var_724((setAnnType_758(t_943))(e_944.$0)))(e_944.$1)
    } else if(e_944.$tag==1){
      var $phi$172 = (Const_725((setAnnType_758(t_943))(e_944.$0)))(e_944.$1)
    } else if(e_944.$tag==2){
      var $phi$172 = ((App_726((setAnnType_758(t_943))(e_944.$0)))(e_944.$1))(e_944.$2)
    } else if(e_944.$tag==3){
      var $phi$172 = ((Lam_727((setAnnType_758(t_943))(e_944.$0)))(e_944.$1))(e_944.$2)
    } else if(e_944.$tag==4){
      var $phi$172 = ((Case_728((setAnnType_758(t_943))(e_944.$0)))(e_944.$1))(e_944.$2)
    } else if(e_944.$tag==5){
      var $phi$172 = ((Let_729((setAnnType_758(t_943))(e_944.$0)))(e_944.$1))(e_944.$2)
    } else if(e_944.$tag==6){
      var $phi$172 = ((New_730((setAnnType_758(t_943))(e_944.$0)))(e_944.$1))(e_944.$2)
    } else error("pattern match fail",e_944);
    return $phi$172
  }
};
var dataConName_764 = function(dc_934){
  var $phi$173 = dc_934.$1;
  return $phi$173
};
var dataConNames_765 = function(d_938){
  var $phi$174 = (map(dataConName_764))(d_938.$3);
  return $phi$174
};
var equivBound_762 = function(a_889){
  return function(b_890){
    var $phi$176 = ($and((($eq$eq($import1$instance$Eq$1))(a_889.$1))(b_890.$1)))((equivType_763(a_889.$2))(b_890.$2));
    var $phi$175 = $phi$176;
    return $phi$175
  }
};
var equivType_763 = function(a_897){
  return function(b_898){
    if(a_897.$tag==0){
      if(b_898.$tag==0){
        var $phi$183 = (($eq$eq($import1$instance$Eq$1))(a_897.$1))(b_898.$1)
      } else var $phi$183 = false;
      var $phi$177 = $phi$183
    } else if(a_897.$tag==1){
      if(b_898.$tag==1){
        var $phi$182 = (($eq$eq($import1$instance$Eq$1))(a_897.$1))(b_898.$1)
      } else var $phi$182 = false;
      var $phi$177 = $phi$182
    } else if(a_897.$tag==2){
      if(b_898.$tag==2){
        var $phi$181 = ($and((equivType_763(a_897.$1))(b_898.$1)))((equivType_763(a_897.$2))(b_898.$2))
      } else var $phi$181 = false;
      var $phi$177 = $phi$181
    } else if(a_897.$tag==4){
      if(b_898.$tag==4){
        var $phi$180 = true
      } else var $phi$180 = false;
      var $phi$177 = $phi$180
    } else if(a_897.$tag==6){
      if(b_898.$tag==6){
        var $phi$179 = true
      } else var $phi$179 = false;
      var $phi$177 = $phi$179
    } else if(a_897.$tag==3){
      var $phi$177 = error("nop support for TRow in equivType yet")
    } else if(a_897.$tag==5){
      if(b_898.$tag==5){
        var rbs_930 = (all_704(function(p_932){
          return (equivBound_762(fst_647(p_932)))(snd_637(p_932))
        }))((zip_700(a_897.$2))(b_898.$2));
        var rvs_929 = (all_704(function(p_931){
          return (($eq$eq($import1$instance$Eq$1))(fst_647(p_931)))(snd_637(p_931))
        }))((zip_700(a_897.$1))(b_898.$1));
        var $phi$178 = ($and(($and(rvs_929))(rbs_930)))((equivType_763(a_897.$3))(b_898.$3))
      } else var $phi$178 = false;
      var $phi$177 = $phi$178
    } else error("pattern match fail",a_897);
    return $phi$177
  }
};
var printCodeLoc_761 = function(l_885){
  if(l_885.$tag==1){
    var $phi$184 = ($concat(($concat(($concat(($concat(($concat("in "))(l_885.$0)))(" at line ")))(intToString(l_885.$1+1))))(", column ")))(intToString(l_885.$2+1))
  } else error("pattern match fail",l_885);
  return $phi$184
};
var setAnnCodeLoc_760 = function(file_881){
  return function(line_882){
    return function(col_883){
      return function(ann_884){
        return ((((setAnn_755($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(((AnnCodeLoc_719(file_881))(line_882))(col_883)))(ann_884)
      }
    }
  }
};
var getAnnCodeLoc_759 = function(ann_880){
  return (((getAnn_754($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(ann_880)
};
var copyAnn_756 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(names_870){
      return function(ann_871){
        var f_872 = function(r_873){
          return function(n_874){
            var $phi$186 = (((getAnn_754(local$instance$Hashable$1))(local$instance$Eq$0))(n_874))(ann_871);
            if($phi$186.$tag==1){
              var $phi$185 = r_873
            } else if($phi$186.$tag==0){
              var $phi$185 = ((((setAnn_755(local$instance$Hashable$1))(local$instance$Eq$0))(n_874))($phi$186.$0))(r_873)
            } else error("pattern match fail",$phi$186);
            return $phi$185
          }
        };
        return ((foldl(f_872))(Empty_642))(names_870)
      }
    }
  }
};
var emptyAnn_753 = Empty_642;
var Pair_1110 = Pair_3;
var mapSnd_1111 = mapSnd_84;
var mapFst_1112 = mapFst_83;
var $gt$eq$gt_1113 = $gt$eq$gt_82;
var snd_1114 = snd_23;
var debug2_1115 = debug2_81;
var Just_1116 = Just_1;
var Nothing_1117 = Nothing_2;
var isJust_1118 = isJust_21;
var Empty_1119 = Empty_7;
var Leaf_1120 = Leaf_8;
var Collision_1121 = Collision_9;
var BitmapIndexed_1122 = BitmapIndexed_10;
var $_1123 = $_12;
var fst_1124 = fst_22;
var Left_1125 = Left_4;
var Right_1126 = Right_5;
var loop_1127 = loop_27;
var find_1128 = find_29;
var hamtMask_1129 = hamtMask_58;
var popCount_1130 = popCount_57;
var hamtIndex_1131 = hamtIndex_59;
var lookup_1132 = lookup_60;
var setContains_1133 = setContains_76;
var foldTrie_1134 = foldTrie_66;
var emptySet_1135 = emptySet_72;
var Unit_1136 = Unit_0;
var not_1137 = not_26;
var $div$eq_1138 = $div$eq_13;
var mapIx_1139 = mapIx_30;
var insert_1140 = insert_61;
var setAdd_1141 = setAdd_73;
var setIntersection_1142 = setIntersection_80;
var remove_1143 = remove_63;
var setDiff_1144 = setDiff_79;
var setToArray_1145 = setToArray_78;
var mergeTrie_1146 = mergeTrie_70;
var setUnion_1147 = setUnion_77;
var setRemove_1148 = setRemove_75;
var setAddAll_1149 = setAddAll_74;
var trieKeys_1150 = trieKeys_71;
var size_1151 = size_68;
var mapTrie_1152 = mapTrie_67;
var nodeMask_1153 = nodeMask_56;
var isEmpty_1154 = isEmpty_69;
var filterTrie_1155 = filterTrie_65;
var nextSetBitMask_1156 = nextSetBitMask_64;
var updateOrSet_1157 = updateOrSet_62;
var State_1158 = State_6;
var runState_1159 = runState_54;
var evalState_1160 = evalState_55;
var sets_1161 = sets_53;
var gets_1162 = gets_52;
var foldM_1163 = foldM_49;
var mapM_1164 = mapM_50;
var forM_1165 = forM_51;
var strToArray_1166 = strToArray_48;
var toRecord_1167 = toRecord_47;
var reverse_1168 = reverse_46;
var tail_1169 = tail_41;
var head_1170 = head_40;
var uniq_1171 = uniq_45;
var mergeSet_1172 = mergeSet_44;
var init_1173 = init_43;
var last_1174 = last_42;
var mapJust_1175 = mapJust_39;
var concatMap_1176 = concatMap_38;
var zip_1177 = zip_37;
var zipWithIndex2_1178 = zipWithIndex2_35;
var zipWithIndex_1179 = zipWithIndex_36;
var join_1180 = join_34;
var all_1181 = all_33;
var exists_1182 = exists_32;
var containsChar_1183 = containsChar_31;
var contains_1184 = contains_28;
var either_1185 = either_24;
var splitEither_1186 = splitEither_25;
var fromJust_1187 = fromJust_20;
var justOr_1188 = justOr_19;
var maybe_1189 = maybe_18;
var $gt$gt_1190 = $gt$gt_17;
var $gt$eq_1191 = $gt$eq_16;
var $lt$eq_1192 = $lt$eq_15;
var $gt_1193 = $gt_14;
var Identity_1194 = Identity_11;
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
var App_1195 = App_726;
var Lam_1196 = Lam_727;
var Case_1197 = Case_728;
var Let_1198 = Let_729;
var New_1199 = New_730;
var breakableDownAndUpM_1200 = breakableDownAndUpM_775;
var breakableDownM_1201 = breakableDownM_779;
var downAndUpM_1202 = downAndUpM_776;
var downM_1203 = downM_778;
var upM_1204 = upM_777;
var breakableDownAndUp_1205 = breakableDownAndUp_770;
var breakableDown_1206 = breakableDown_774;
var downAndUp_1207 = downAndUp_771;
var down_1208 = down_773;
var up_1209 = up_772;
var AnnType_1210 = AnnType_718;
var TUnknown_1211 = TUnknown_749;
var getAnn_1212 = getAnn_754;
var getAnnType_1213 = getAnnType_757;
var Var_1214 = Var_724;
var Const_1215 = Const_725;
var annOf_1216 = annOf_767;
var getType_1217 = getType_769;
var withAnn_1218 = withAnn_768;
var setAnn_1219 = setAnn_755;
var setAnnType_1220 = setAnnType_758;
var setType_1221 = setType_766;
var Data_1222 = Data_738;
var DataCon_1223 = DataCon_739;
var dataConName_1224 = dataConName_764;
var dataConNames_1225 = dataConNames_765;
var TCBound_1226 = TCBound_742;
var TConst_1227 = TConst_743;
var TVar_1228 = TVar_744;
var TApp_1229 = TApp_745;
var TRow_1230 = TRow_746;
var TBot_1231 = TBot_747;
var TForall_1232 = TForall_748;
var equivBound_1233 = equivBound_762;
var equivType_1234 = equivType_763;
var AnnCodeLoc_1235 = AnnCodeLoc_719;
var printCodeLoc_1236 = printCodeLoc_761;
var setAnnCodeLoc_1237 = setAnnCodeLoc_760;
var getAnnCodeLoc_1238 = getAnnCodeLoc_759;
var copyAnn_1239 = copyAnn_756;
var emptyAnn_1240 = emptyAnn_753;
var ImportAll_1241 = ImportAll_752;
var ImportOpen_1242 = ImportOpen_751;
var ImportClosed_1243 = ImportClosed_750;
var Instance_1244 = Instance_741;
var Class_1245 = Class_740;
var ModuleInterface_1246 = ModuleInterface_737;
var Module_1247 = Module_736;
var PData_1248 = PData_735;
var PConst_1249 = PConst_734;
var PVar_1250 = PVar_733;
var CStr_1251 = CStr_732;
var CNum_1252 = CNum_731;
var AnnExport_1253 = AnnExport_723;
var AnnTag_1254 = AnnTag_722;
var AnnData_1255 = AnnData_721;
var AnnUseCount_1256 = AnnUseCount_720;
var sccSorted_1257 = sccSorted_570;
var splitLetsPass_1263 = function(local$instance$Monad$0){
  return function(m_1320){
    return (ret(local$instance$Monad$0))(m_1320)
  }
};
var addRef_1258 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(n_1264){
      return (($gt$gt$eq($import1$instance$Monad$11))(gets_1162))(function(ns_1265){
        return sets_1161((((setAdd_1141(local$instance$Hashable$1))(local$instance$Eq$0))(n_1264))(ns_1265))
      })
    }
  }
};
var delRef_1259 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(n_1266){
      return (($gt$gt$eq($import1$instance$Monad$11))(gets_1162))(function(ns_1267){
        return sets_1161((((setRemove_1148(local$instance$Hashable$1))(local$instance$Eq$0))(n_1266))(ns_1267))
      })
    }
  }
};
var getRefs_1260 = gets_1162;
var splitExpr_1261 = function(e_1268){
  var handleLet_1271 = function(e_1291){
    if(e_1291.$tag==5){
      var $phi$187 = (($gt$gt$eq($import1$instance$Monad$11))(splitExpr_1261(e_1291.$2)))(function(e_1295){
        return (($gt$gt$eq($import1$instance$Monad$11))(splitBindings_1262(e_1291.$1)))(function(gbs_1296){
          var l_1297 = ((foldr(function(e_1298){
            return function(bs_1299){
              return ((Let_1198(emptyAnn_1240))(bs_1299))(e_1298)
            }
          }))(e_1295))(gbs_1296);
          return (ret($import1$instance$Monad$11))(Right_1126((withAnn_1218(e_1291.$0))(l_1297)))
        })
      })
    } else var $phi$187 = (ret($import1$instance$Monad$11))(Left_1125(e_1291));
    return $phi$187
  };
  var splitPat_1270 = function(p_1283){
    if(p_1283.$tag==1){
      var $phi$188 = (ret($import1$instance$Monad$11))(Unit_1136)
    } else if(p_1283.$tag==0){
      var $phi$188 = ((delRef_1259($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_1283.$1)
    } else if(p_1283.$tag==2){
      var $phi$188 = (($gt$gt_1190($import1$instance$Monad$11))(((mapM_1164($import1$instance$Monad$11))(splitPat_1270))(p_1283.$2)))(((addRef_1258($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_1283.$1))
    } else error("pattern match fail",p_1283);
    return $phi$188
  };
  var split_1269 = function(e_1272){
    if(e_1272.$tag==0){
      var $phi$189 = (($gt$gt_1190($import1$instance$Monad$11))(((addRef_1258($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_1272.$1)))((ret($import1$instance$Monad$11))(e_1272))
    } else if(e_1272.$tag==4){
      var $phi$189 = (($gt$gt_1190($import1$instance$Monad$11))(((mapM_1164($import1$instance$Monad$11))(function(p_1278){
        return splitPat_1270(fst_1124(p_1278))
      }))(e_1272.$2)))((ret($import1$instance$Monad$11))(e_1272))
    } else if(e_1272.$tag==3){
      var $phi$189 = (($gt$gt_1190($import1$instance$Monad$11))(((delRef_1259($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_1272.$1)))((ret($import1$instance$Monad$11))(e_1272))
    } else var $phi$189 = (ret($import1$instance$Monad$11))(e_1272);
    return $phi$189
  };
  return (((breakableDownAndUpM_1200($import1$instance$Monad$11))(handleLet_1271))(split_1269))(e_1268)
};
var splitBindings_1262 = function(bs_1301){
  var ns_1302 = (map(fst_1124))(bs_1301);
  var processBinding_1303 = function(gbs_1304){
    return function(b_1305){
      var $phi$191 = (($gt$gt$eq($import1$instance$Monad$11))(splitExpr_1261(b_1305.$1)))(function(e_1310){
        return (($gt$gt$eq($import1$instance$Monad$11))(getRefs_1260))(function(refs_1311){
          var uses_1312 = (filter(function(n_1313){
            return (((setContains_1133($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1313))(refs_1311)
          }))(ns_1302);
          return (($gt$gt_1190($import1$instance$Monad$11))(((mapM_1164($import1$instance$Monad$11))((delRef_1259($import1$instance$Hashable$13))($import1$instance$Eq$1)))(uses_1312)))((ret($import1$instance$Monad$11))((Pair_1110(((set(b_1305.$0))((filter(($div$eq_1138($import1$instance$Eq$1))(b_1305.$0)))(uses_1312)))(gbs_1304.$0)))((push((Pair_1110(b_1305.$0))(e_1310)))(gbs_1304.$1))))
        })
      });
      var $phi$190 = $phi$191;
      return $phi$190
    }
  };
  return (($gt$gt$eq($import1$instance$Monad$11))((((foldM_1163($import1$instance$Monad$11))(processBinding_1303))((Pair_1110(empty))([])))(bs_1301)))(function(gbs_1314){
    var ccs_1318 = sccSorted_1257(gbs_1314.$0);
    var bsm_1317 = toRecord_1167(gbs_1314.$1);
    var $phi$192 = (ret($import1$instance$Monad$11))((map(map(function(n_1319){
      return (Pair_1110(n_1319))((get(n_1319))(bsm_1317))
    })))(ccs_1318));
    return $phi$192
  })
};
var Pair_1321 = Pair_3;
var mapSnd_1322 = mapSnd_84;
var mapFst_1323 = mapFst_83;
var $gt$eq$gt_1324 = $gt$eq$gt_82;
var snd_1325 = snd_23;
var debug2_1326 = debug2_81;
var Just_1327 = Just_1;
var Nothing_1328 = Nothing_2;
var isJust_1329 = isJust_21;
var Empty_1330 = Empty_7;
var Leaf_1331 = Leaf_8;
var Collision_1332 = Collision_9;
var BitmapIndexed_1333 = BitmapIndexed_10;
var $_1334 = $_12;
var fst_1335 = fst_22;
var Left_1336 = Left_4;
var Right_1337 = Right_5;
var loop_1338 = loop_27;
var find_1339 = find_29;
var hamtMask_1340 = hamtMask_58;
var popCount_1341 = popCount_57;
var hamtIndex_1342 = hamtIndex_59;
var lookup_1343 = lookup_60;
var setContains_1344 = setContains_76;
var foldTrie_1345 = foldTrie_66;
var emptySet_1346 = emptySet_72;
var Unit_1347 = Unit_0;
var not_1348 = not_26;
var $div$eq_1349 = $div$eq_13;
var mapIx_1350 = mapIx_30;
var insert_1351 = insert_61;
var setAdd_1352 = setAdd_73;
var setIntersection_1353 = setIntersection_80;
var remove_1354 = remove_63;
var setDiff_1355 = setDiff_79;
var setToArray_1356 = setToArray_78;
var mergeTrie_1357 = mergeTrie_70;
var setUnion_1358 = setUnion_77;
var setRemove_1359 = setRemove_75;
var setAddAll_1360 = setAddAll_74;
var trieKeys_1361 = trieKeys_71;
var size_1362 = size_68;
var mapTrie_1363 = mapTrie_67;
var nodeMask_1364 = nodeMask_56;
var isEmpty_1365 = isEmpty_69;
var filterTrie_1366 = filterTrie_65;
var nextSetBitMask_1367 = nextSetBitMask_64;
var updateOrSet_1368 = updateOrSet_62;
var State_1369 = State_6;
var runState_1370 = runState_54;
var evalState_1371 = evalState_55;
var sets_1372 = sets_53;
var gets_1373 = gets_52;
var foldM_1374 = foldM_49;
var mapM_1375 = mapM_50;
var forM_1376 = forM_51;
var strToArray_1377 = strToArray_48;
var toRecord_1378 = toRecord_47;
var reverse_1379 = reverse_46;
var tail_1380 = tail_41;
var head_1381 = head_40;
var uniq_1382 = uniq_45;
var mergeSet_1383 = mergeSet_44;
var init_1384 = init_43;
var last_1385 = last_42;
var mapJust_1386 = mapJust_39;
var concatMap_1387 = concatMap_38;
var zip_1388 = zip_37;
var zipWithIndex2_1389 = zipWithIndex2_35;
var zipWithIndex_1390 = zipWithIndex_36;
var join_1391 = join_34;
var all_1392 = all_33;
var exists_1393 = exists_32;
var containsChar_1394 = containsChar_31;
var contains_1395 = contains_28;
var either_1396 = either_24;
var splitEither_1397 = splitEither_25;
var fromJust_1398 = fromJust_20;
var justOr_1399 = justOr_19;
var maybe_1400 = maybe_18;
var $gt$gt_1401 = $gt$gt_17;
var $gt$eq_1402 = $gt$eq_16;
var $lt$eq_1403 = $lt$eq_15;
var $gt_1404 = $gt_14;
var Identity_1405 = Identity_11;
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
var App_1406 = App_726;
var Lam_1407 = Lam_727;
var Case_1408 = Case_728;
var Let_1409 = Let_729;
var New_1410 = New_730;
var breakableDownAndUpM_1411 = breakableDownAndUpM_775;
var breakableDownM_1412 = breakableDownM_779;
var downAndUpM_1413 = downAndUpM_776;
var downM_1414 = downM_778;
var upM_1415 = upM_777;
var breakableDownAndUp_1416 = breakableDownAndUp_770;
var breakableDown_1417 = breakableDown_774;
var downAndUp_1418 = downAndUp_771;
var down_1419 = down_773;
var up_1420 = up_772;
var AnnType_1421 = AnnType_718;
var TUnknown_1422 = TUnknown_749;
var getAnn_1423 = getAnn_754;
var getAnnType_1424 = getAnnType_757;
var Var_1425 = Var_724;
var Const_1426 = Const_725;
var annOf_1427 = annOf_767;
var getType_1428 = getType_769;
var withAnn_1429 = withAnn_768;
var setAnn_1430 = setAnn_755;
var setAnnType_1431 = setAnnType_758;
var setType_1432 = setType_766;
var Data_1433 = Data_738;
var DataCon_1434 = DataCon_739;
var dataConName_1435 = dataConName_764;
var dataConNames_1436 = dataConNames_765;
var TCBound_1437 = TCBound_742;
var TConst_1438 = TConst_743;
var TVar_1439 = TVar_744;
var TApp_1440 = TApp_745;
var TRow_1441 = TRow_746;
var TBot_1442 = TBot_747;
var TForall_1443 = TForall_748;
var equivBound_1444 = equivBound_762;
var equivType_1445 = equivType_763;
var AnnCodeLoc_1446 = AnnCodeLoc_719;
var printCodeLoc_1447 = printCodeLoc_761;
var setAnnCodeLoc_1448 = setAnnCodeLoc_760;
var getAnnCodeLoc_1449 = getAnnCodeLoc_759;
var copyAnn_1450 = copyAnn_756;
var emptyAnn_1451 = emptyAnn_753;
var ImportAll_1452 = ImportAll_752;
var ImportOpen_1453 = ImportOpen_751;
var ImportClosed_1454 = ImportClosed_750;
var Instance_1455 = Instance_741;
var Class_1456 = Class_740;
var ModuleInterface_1457 = ModuleInterface_737;
var Module_1458 = Module_736;
var PData_1459 = PData_735;
var PConst_1460 = PConst_734;
var PVar_1461 = PVar_733;
var CStr_1462 = CStr_732;
var CNum_1463 = CNum_731;
var AnnExport_1464 = AnnExport_723;
var AnnTag_1465 = AnnTag_722;
var AnnData_1466 = AnnData_721;
var AnnUseCount_1467 = AnnUseCount_720;
var CompilerState_1468 = function($_0_1478){
  return function($_1_1479){
    return function($_2_1480){
      return {$0:$_0_1478,$1:$_1_1479,$2:$_2_1480}
    }
  }
};
var reportTimes_1477 = function(i_1516){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1373))(function(s_1517){
    var report_1521 = function(i_1522){
      return function(n_1523){
        return function(ts_1524){
          var count_1525 = length(ts_1524);
          var total_1526 = ((foldl($add))(0))(ts_1524);
          var msg_1527 = ($concat(($concat(($concat(($concat(($concat(($concat("# pass <"))(n_1523)))("> executed ")))(intToString(count_1525))))(" times, total runtime ")))(intToString(total_1526))))("ms");
          return (debug2_1326(msg_1527))(i_1522)
        }
      }
    };
    var $phi$193 = (ret($import1$instance$Monad$11))(((foldTrie_1345(report_1521))(i_1516))(s_1517.$2));
    return $phi$193
  })
};
var timingStart_1474 = function(n_1499){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1373))(function(s_1500){
    var nts_1504 = (justOr_1399([]))((((lookup_1343($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1499))(s_1500.$2));
    var $phi$194 = sets_1372(((CompilerState_1468(s_1500.$0))(s_1500.$1))(((((insert_1351($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1499))((push(currentTimeMs(Unit_1347)))(nts_1504)))(s_1500.$2)));
    return $phi$194
  })
};
var timingEnd_1475 = function(n_1505){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1373))(function(s_1506){
    var nts_1510 = (justOr_1399([]))((((lookup_1343($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1505))(s_1506.$2));
    var start_1511 = last_1385(nts_1510);
    var $phi$195 = sets_1372(((CompilerState_1468(s_1506.$0))(s_1506.$1))(((((insert_1351($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_1505))((push((currentTimeMs(Unit_1347))-start_1511))(init_1384(nts_1510))))(s_1506.$2)));
    return $phi$195
  })
};
var timed_1476 = function(n_1512){
  return function(p_1513){
    return function(i_1514){
      return (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_1401($import1$instance$Monad$11))(timingStart_1474(n_1512)))(p_1513(i_1514))))(function(o_1515){
        return (($gt$gt_1401($import1$instance$Monad$11))(timingEnd_1475(n_1512)))((ret($import1$instance$Monad$11))(o_1515))
      })
    }
  }
};
var perModule_1473 = function(local$instance$Monad$0){
  return mapM_1375(local$instance$Monad$0)
};
var setUid_1472 = function(uid_1494){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1373))(function(s_1495){
    var $phi$196 = sets_1372(((CompilerState_1468(s_1495.$0))(uid_1494))(s_1495.$2));
    return $phi$196
  })
};
var getUid_1471 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1373))(function(s_1490){
  var $phi$197 = (ret($import1$instance$Monad$11))(s_1490.$1);
  return $phi$197
});
var setExports_1470 = function(ex_1485){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1373))(function(s_1486){
    var $phi$198 = sets_1372(((CompilerState_1468(ex_1485))(s_1486.$1))(s_1486.$2));
    return $phi$198
  })
};
var getExports_1469 = (($gt$gt$eq($import1$instance$Monad$11))(gets_1373))(function(s_1481){
  var $phi$199 = (ret($import1$instance$Monad$11))(s_1481.$0);
  return $phi$199
});
var Pair_1528 = Pair_3;
var mapSnd_1529 = mapSnd_84;
var mapFst_1530 = mapFst_83;
var $gt$eq$gt_1531 = $gt$eq$gt_82;
var snd_1532 = snd_23;
var debug2_1533 = debug2_81;
var Just_1534 = Just_1;
var Nothing_1535 = Nothing_2;
var isJust_1536 = isJust_21;
var Empty_1537 = Empty_7;
var Leaf_1538 = Leaf_8;
var Collision_1539 = Collision_9;
var BitmapIndexed_1540 = BitmapIndexed_10;
var $_1541 = $_12;
var fst_1542 = fst_22;
var Left_1543 = Left_4;
var Right_1544 = Right_5;
var loop_1545 = loop_27;
var find_1546 = find_29;
var hamtMask_1547 = hamtMask_58;
var popCount_1548 = popCount_57;
var hamtIndex_1549 = hamtIndex_59;
var lookup_1550 = lookup_60;
var setContains_1551 = setContains_76;
var foldTrie_1552 = foldTrie_66;
var emptySet_1553 = emptySet_72;
var Unit_1554 = Unit_0;
var not_1555 = not_26;
var $div$eq_1556 = $div$eq_13;
var mapIx_1557 = mapIx_30;
var insert_1558 = insert_61;
var setAdd_1559 = setAdd_73;
var setIntersection_1560 = setIntersection_80;
var remove_1561 = remove_63;
var setDiff_1562 = setDiff_79;
var setToArray_1563 = setToArray_78;
var mergeTrie_1564 = mergeTrie_70;
var setUnion_1565 = setUnion_77;
var setRemove_1566 = setRemove_75;
var setAddAll_1567 = setAddAll_74;
var trieKeys_1568 = trieKeys_71;
var size_1569 = size_68;
var mapTrie_1570 = mapTrie_67;
var nodeMask_1571 = nodeMask_56;
var isEmpty_1572 = isEmpty_69;
var filterTrie_1573 = filterTrie_65;
var nextSetBitMask_1574 = nextSetBitMask_64;
var updateOrSet_1575 = updateOrSet_62;
var State_1576 = State_6;
var runState_1577 = runState_54;
var evalState_1578 = evalState_55;
var sets_1579 = sets_53;
var gets_1580 = gets_52;
var foldM_1581 = foldM_49;
var mapM_1582 = mapM_50;
var forM_1583 = forM_51;
var strToArray_1584 = strToArray_48;
var toRecord_1585 = toRecord_47;
var reverse_1586 = reverse_46;
var tail_1587 = tail_41;
var head_1588 = head_40;
var uniq_1589 = uniq_45;
var mergeSet_1590 = mergeSet_44;
var init_1591 = init_43;
var last_1592 = last_42;
var mapJust_1593 = mapJust_39;
var concatMap_1594 = concatMap_38;
var zip_1595 = zip_37;
var zipWithIndex2_1596 = zipWithIndex2_35;
var zipWithIndex_1597 = zipWithIndex_36;
var join_1598 = join_34;
var all_1599 = all_33;
var exists_1600 = exists_32;
var containsChar_1601 = containsChar_31;
var contains_1602 = contains_28;
var either_1603 = either_24;
var splitEither_1604 = splitEither_25;
var fromJust_1605 = fromJust_20;
var justOr_1606 = justOr_19;
var maybe_1607 = maybe_18;
var $gt$gt_1608 = $gt$gt_17;
var $gt$eq_1609 = $gt$eq_16;
var $lt$eq_1610 = $lt$eq_15;
var $gt_1611 = $gt_14;
var Identity_1612 = Identity_11;
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
var App_1613 = App_726;
var Lam_1614 = Lam_727;
var Case_1615 = Case_728;
var Let_1616 = Let_729;
var New_1617 = New_730;
var breakableDownAndUpM_1618 = breakableDownAndUpM_775;
var breakableDownM_1619 = breakableDownM_779;
var downAndUpM_1620 = downAndUpM_776;
var downM_1621 = downM_778;
var upM_1622 = upM_777;
var breakableDownAndUp_1623 = breakableDownAndUp_770;
var breakableDown_1624 = breakableDown_774;
var downAndUp_1625 = downAndUp_771;
var down_1626 = down_773;
var up_1627 = up_772;
var AnnType_1628 = AnnType_718;
var TUnknown_1629 = TUnknown_749;
var getAnn_1630 = getAnn_754;
var getAnnType_1631 = getAnnType_757;
var Var_1632 = Var_724;
var Const_1633 = Const_725;
var annOf_1634 = annOf_767;
var getType_1635 = getType_769;
var withAnn_1636 = withAnn_768;
var setAnn_1637 = setAnn_755;
var setAnnType_1638 = setAnnType_758;
var setType_1639 = setType_766;
var Data_1640 = Data_738;
var DataCon_1641 = DataCon_739;
var dataConName_1642 = dataConName_764;
var dataConNames_1643 = dataConNames_765;
var TCBound_1644 = TCBound_742;
var TConst_1645 = TConst_743;
var TVar_1646 = TVar_744;
var TApp_1647 = TApp_745;
var TRow_1648 = TRow_746;
var TBot_1649 = TBot_747;
var TForall_1650 = TForall_748;
var equivBound_1651 = equivBound_762;
var equivType_1652 = equivType_763;
var AnnCodeLoc_1653 = AnnCodeLoc_719;
var printCodeLoc_1654 = printCodeLoc_761;
var setAnnCodeLoc_1655 = setAnnCodeLoc_760;
var getAnnCodeLoc_1656 = getAnnCodeLoc_759;
var copyAnn_1657 = copyAnn_756;
var emptyAnn_1658 = emptyAnn_753;
var ImportAll_1659 = ImportAll_752;
var ImportOpen_1660 = ImportOpen_751;
var ImportClosed_1661 = ImportClosed_750;
var Instance_1662 = Instance_741;
var Class_1663 = Class_740;
var ModuleInterface_1664 = ModuleInterface_737;
var Module_1665 = Module_736;
var PData_1666 = PData_735;
var PConst_1667 = PConst_734;
var PVar_1668 = PVar_733;
var CStr_1669 = CStr_732;
var CNum_1670 = CNum_731;
var AnnExport_1671 = AnnExport_723;
var AnnTag_1672 = AnnTag_722;
var AnnData_1673 = AnnData_721;
var AnnUseCount_1674 = AnnUseCount_720;
var mkConFun_1677 = function(tag_1701){
  return function(dt_1702){
    return function(vs_1703){
      return function(n_1704){
        return function(ts_1705){
          var nts_1706 = (map(function(it_1712){
            return (Pair_1528(($concat("$_"))(intToString(fst_1542(it_1712)))))(snd_1532(it_1712))
          }))(zipWithIndex_1597(ts_1705));
          var new_1707 = (setType_1639(dt_1702))(((New_1617(emptyAnn_1658))(n_1704))((map(function(nt_1713){
            return (Var_1632(emptyAnn_1658))(fst_1542(nt_1713))
          }))(nts_1706)));
          var mkCon_1708 = function(r_1714){
            return function(nt_1715){
              var $phi$200 = (setType_1639(((TApp_1647(emptyAnn_1658))(((TApp_1647(emptyAnn_1658))((TConst_1645(emptyAnn_1658))("->")))(nt_1715.$1)))(getType_1635(r_1714))))(((Lam_1614(emptyAnn_1658))(nt_1715.$0))(r_1714));
              return $phi$200
            }
          };
          var con_1709 = ((foldr(mkCon_1708))(new_1707))(nts_1706);
          var conT_1710 = (((TForall_1650(emptyAnn_1658))(vs_1703))([]))(getType_1635(con_1709));
          var ann_1711 = ((((setAnn_1637($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_1671(n_1704)))(((((setAnn_1637($import1$instance$Hashable$13))($import1$instance$Eq$1))("type"))(AnnType_1628(conT_1710)))(((((setAnn_1637($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(AnnData_1673(tag_1701)))(emptyAnn_1658)));
          return (Pair_1528(n_1704))((withAnn_1636(ann_1711))(con_1709))
        }
      }
    }
  }
};
var rewriteData_1676 = function(d_1686){
  var dt_1691 = ((foldl(function(r_1693){
    return function(v_1694){
      return ((TApp_1647(emptyAnn_1658))(r_1693))((TVar_1646(emptyAnn_1658))(v_1694))
    }
  }))((TConst_1645(emptyAnn_1658))(d_1686.$1)))(d_1686.$2);
  var rewriteCon_1692 = function(c_1695){
    var $phi$203 = length(d_1686.$3);
    if(1==$phi$203){
      var $phi$202 = Nothing_1535
    } else var $phi$202 = Just_1534(fst_1542(c_1695));
    var tag_1696 = $phi$202;
    var $phi$205 = snd_1532(c_1695);
    var $phi$204 = ((((mkConFun_1677(tag_1696))(dt_1691))(d_1686.$2))($phi$205.$1))($phi$205.$2);
    return $phi$204
  };
  var $phi$201 = (map(rewriteCon_1692))(zipWithIndex_1597(d_1686.$3));
  return $phi$201
};
var translateAdts_1675 = function(m_1678){
  var $phi$206 = ((((((Module_1665(m_1678.$0))(m_1678.$1))(m_1678.$2))([]))(m_1678.$4))(m_1678.$5))((concat((concatMap_1594(rewriteData_1676))(m_1678.$3)))(m_1678.$6));
  return $phi$206
};
var Pair_1718 = Pair_3;
var mapSnd_1719 = mapSnd_84;
var mapFst_1720 = mapFst_83;
var $gt$eq$gt_1721 = $gt$eq$gt_82;
var snd_1722 = snd_23;
var debug2_1723 = debug2_81;
var Just_1724 = Just_1;
var Nothing_1725 = Nothing_2;
var isJust_1726 = isJust_21;
var Empty_1727 = Empty_7;
var Leaf_1728 = Leaf_8;
var Collision_1729 = Collision_9;
var BitmapIndexed_1730 = BitmapIndexed_10;
var $_1731 = $_12;
var fst_1732 = fst_22;
var Left_1733 = Left_4;
var Right_1734 = Right_5;
var loop_1735 = loop_27;
var find_1736 = find_29;
var hamtMask_1737 = hamtMask_58;
var popCount_1738 = popCount_57;
var hamtIndex_1739 = hamtIndex_59;
var lookup_1740 = lookup_60;
var setContains_1741 = setContains_76;
var foldTrie_1742 = foldTrie_66;
var emptySet_1743 = emptySet_72;
var Unit_1744 = Unit_0;
var not_1745 = not_26;
var $div$eq_1746 = $div$eq_13;
var mapIx_1747 = mapIx_30;
var insert_1748 = insert_61;
var setAdd_1749 = setAdd_73;
var setIntersection_1750 = setIntersection_80;
var remove_1751 = remove_63;
var setDiff_1752 = setDiff_79;
var setToArray_1753 = setToArray_78;
var mergeTrie_1754 = mergeTrie_70;
var setUnion_1755 = setUnion_77;
var setRemove_1756 = setRemove_75;
var setAddAll_1757 = setAddAll_74;
var trieKeys_1758 = trieKeys_71;
var size_1759 = size_68;
var mapTrie_1760 = mapTrie_67;
var nodeMask_1761 = nodeMask_56;
var isEmpty_1762 = isEmpty_69;
var filterTrie_1763 = filterTrie_65;
var nextSetBitMask_1764 = nextSetBitMask_64;
var updateOrSet_1765 = updateOrSet_62;
var State_1766 = State_6;
var runState_1767 = runState_54;
var evalState_1768 = evalState_55;
var sets_1769 = sets_53;
var gets_1770 = gets_52;
var foldM_1771 = foldM_49;
var mapM_1772 = mapM_50;
var forM_1773 = forM_51;
var strToArray_1774 = strToArray_48;
var toRecord_1775 = toRecord_47;
var reverse_1776 = reverse_46;
var tail_1777 = tail_41;
var head_1778 = head_40;
var uniq_1779 = uniq_45;
var mergeSet_1780 = mergeSet_44;
var init_1781 = init_43;
var last_1782 = last_42;
var mapJust_1783 = mapJust_39;
var concatMap_1784 = concatMap_38;
var zip_1785 = zip_37;
var zipWithIndex2_1786 = zipWithIndex2_35;
var zipWithIndex_1787 = zipWithIndex_36;
var join_1788 = join_34;
var all_1789 = all_33;
var exists_1790 = exists_32;
var containsChar_1791 = containsChar_31;
var contains_1792 = contains_28;
var either_1793 = either_24;
var splitEither_1794 = splitEither_25;
var fromJust_1795 = fromJust_20;
var justOr_1796 = justOr_19;
var maybe_1797 = maybe_18;
var $gt$gt_1798 = $gt$gt_17;
var $gt$eq_1799 = $gt$eq_16;
var $lt$eq_1800 = $lt$eq_15;
var $gt_1801 = $gt_14;
var Identity_1802 = Identity_11;
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
var App_1803 = App_726;
var Lam_1804 = Lam_727;
var Case_1805 = Case_728;
var Let_1806 = Let_729;
var New_1807 = New_730;
var breakableDownAndUpM_1808 = breakableDownAndUpM_775;
var breakableDownM_1809 = breakableDownM_779;
var downAndUpM_1810 = downAndUpM_776;
var downM_1811 = downM_778;
var upM_1812 = upM_777;
var breakableDownAndUp_1813 = breakableDownAndUp_770;
var breakableDown_1814 = breakableDown_774;
var downAndUp_1815 = downAndUp_771;
var down_1816 = down_773;
var up_1817 = up_772;
var AnnType_1818 = AnnType_718;
var TUnknown_1819 = TUnknown_749;
var getAnn_1820 = getAnn_754;
var getAnnType_1821 = getAnnType_757;
var Var_1822 = Var_724;
var Const_1823 = Const_725;
var annOf_1824 = annOf_767;
var getType_1825 = getType_769;
var withAnn_1826 = withAnn_768;
var setAnn_1827 = setAnn_755;
var setAnnType_1828 = setAnnType_758;
var setType_1829 = setType_766;
var Data_1830 = Data_738;
var DataCon_1831 = DataCon_739;
var dataConName_1832 = dataConName_764;
var dataConNames_1833 = dataConNames_765;
var TCBound_1834 = TCBound_742;
var TConst_1835 = TConst_743;
var TVar_1836 = TVar_744;
var TApp_1837 = TApp_745;
var TRow_1838 = TRow_746;
var TBot_1839 = TBot_747;
var TForall_1840 = TForall_748;
var equivBound_1841 = equivBound_762;
var equivType_1842 = equivType_763;
var AnnCodeLoc_1843 = AnnCodeLoc_719;
var printCodeLoc_1844 = printCodeLoc_761;
var setAnnCodeLoc_1845 = setAnnCodeLoc_760;
var getAnnCodeLoc_1846 = getAnnCodeLoc_759;
var copyAnn_1847 = copyAnn_756;
var emptyAnn_1848 = emptyAnn_753;
var ImportAll_1849 = ImportAll_752;
var ImportOpen_1850 = ImportOpen_751;
var ImportClosed_1851 = ImportClosed_750;
var Instance_1852 = Instance_741;
var Class_1853 = Class_740;
var ModuleInterface_1854 = ModuleInterface_737;
var Module_1855 = Module_736;
var PData_1856 = PData_735;
var PConst_1857 = PConst_734;
var PVar_1858 = PVar_733;
var CStr_1859 = CStr_732;
var CNum_1860 = CNum_731;
var AnnExport_1861 = AnnExport_723;
var AnnTag_1862 = AnnTag_722;
var AnnData_1863 = AnnData_721;
var AnnUseCount_1864 = AnnUseCount_720;
var getUid_1865 = getUid_1471;
var setUid_1866 = setUid_1472;
var getExports_1867 = getExports_1469;
var newIdent_1868 = function(n_1875){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_1770))(function(i_1876){
    return (($gt$gt_1798($import1$instance$Monad$11))(sets_1769(i_1876+1)))((ret($import1$instance$Monad$11))(($concat(($concat(n_1875))("_")))(intToString(i_1876))))
  })
};
var rewriteExpr_1869 = function(env_1877){
  return function(e_1878){
    var rename_1879 = function(n_1883){
      return newIdent_1868(n_1883)
    };
    var renamePat_1880 = function(p_1884){
      if(p_1884.$tag==1){
        var $phi$207 = (ret($import1$instance$Monad$11))((Pair_1718(p_1884))(empty))
      } else if(p_1884.$tag==0){
        var $phi$207 = (($gt$gt$eq($import1$instance$Monad$11))(rename_1879(p_1884.$1)))(function(n_1889){
          return (ret($import1$instance$Monad$11))((Pair_1718((PVar_1858(p_1884.$0))(n_1889)))(((set(p_1884.$1))(n_1889))(empty)))
        })
      } else if(p_1884.$tag==2){
        var $phi$207 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1772($import1$instance$Monad$11))(renamePat_1880))(p_1884.$2)))(function(ps_1893){
          var $phi$209 = (has(p_1884.$1))(env_1877);
          if(!$phi$209){
            var $phi$208 = (ret($import1$instance$Monad$11))((Pair_1718(((PData_1856(p_1884.$0))(p_1884.$1))((map(fst_1732))(ps_1893))))(((foldl(merge))(empty))((map(snd_1722))(ps_1893))))
          } else if($phi$209){
            var $phi$208 = (ret($import1$instance$Monad$11))((Pair_1718(((PData_1856(p_1884.$0))((get(p_1884.$1))(env_1877)))((map(fst_1732))(ps_1893))))(((foldl(merge))(empty))((map(snd_1722))(ps_1893))))
          } else error("pattern match fail",$phi$209);
          return $phi$208
        })
      } else error("pattern match fail",p_1884);
      return $phi$207
    };
    var rewritePat_1881 = function(p_1894){
      var $phi$210 = (($gt$gt$eq($import1$instance$Monad$11))(renamePat_1880(p_1894.$0)))(function(pe_1897){
        var $phi$211 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_1869((merge(env_1877))(pe_1897.$1)))(p_1894.$1)))(function(e_1900){
          return (ret($import1$instance$Monad$11))((Pair_1718(pe_1897.$0))(e_1900))
        });
        return $phi$211
      });
      return $phi$210
    };
    var f_1882 = function(e_1901){
      if(e_1901.$tag==3){
        var $phi$212 = (($gt$gt$eq($import1$instance$Monad$11))(rename_1879(e_1901.$1)))(function(n_1905){
          return (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_1869(((set(e_1901.$1))(n_1905))(env_1877)))(e_1901.$2)))(function(e_1906){
            return (ret($import1$instance$Monad$11))(Right_1734(((Lam_1804(e_1901.$0))(n_1905))(e_1906)))
          })
        })
      } else if(e_1901.$tag==5){
        var $phi$212 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteBindings_1871(env_1877))(e_1901.$1)))(function(ebs_1910){
          var $phi$217 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_1869(ebs_1910.$0))(e_1901.$2)))(function(e_1913){
            return (ret($import1$instance$Monad$11))(Right_1734(((Let_1806(e_1901.$0))(ebs_1910.$1))(e_1913)))
          });
          return $phi$217
        })
      } else if(e_1901.$tag==4){
        var $phi$212 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_1869(env_1877))(e_1901.$1)))(function(e_1917){
          return (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1772($import1$instance$Monad$11))(rewritePat_1881))(e_1901.$2)))(function(ps_1918){
            return (ret($import1$instance$Monad$11))(Right_1734(((Case_1805(e_1901.$0))(e_1917))(ps_1918)))
          })
        })
      } else if(e_1901.$tag==0){
        var $phi$216 = (has(e_1901.$1))(env_1877);
        if($phi$216){
          var $phi$215 = (ret($import1$instance$Monad$11))(Left_1733((Var_1822(e_1901.$0))((get(e_1901.$1))(env_1877))))
        } else if(!$phi$216){
          var $phi$215 = (ret($import1$instance$Monad$11))(Left_1733(e_1901))
        } else error("pattern match fail",$phi$216);
        var $phi$212 = $phi$215
      } else if(e_1901.$tag==6){
        var $phi$214 = (has(e_1901.$1))(env_1877);
        if($phi$214){
          var $phi$213 = (ret($import1$instance$Monad$11))(Left_1733(((New_1807(e_1901.$0))((get(e_1901.$1))(env_1877)))(e_1901.$2)))
        } else if(!$phi$214){
          var $phi$213 = (ret($import1$instance$Monad$11))(Left_1733(e_1901))
        } else error("pattern match fail",$phi$214);
        var $phi$212 = $phi$213
      } else var $phi$212 = (ret($import1$instance$Monad$11))(Left_1733(e_1901));
      return $phi$212
    };
    return ((breakableDownM_1809($import1$instance$Monad$11))(f_1882))(e_1878)
  }
};
var rewriteBindings_1871 = function(env_1936){
  return function(bs_1937){
    var ns_1938 = (map(fst_1732))(bs_1937);
    var ns2_1939 = ((mapM_1772($import1$instance$Monad$11))(newIdent_1868))(ns_1938);
    return (($gt$gt$eq($import1$instance$Monad$11))(ns2_1939))(function(ns_1940){
      var env2_1941 = (merge(env_1936))(toRecord_1775((zip_1785((map(fst_1732))(bs_1937)))(ns_1940)));
      var bs2_1942 = ((mapM_1772($import1$instance$Monad$11))(rewriteExpr_1869(env2_1941)))((map(snd_1722))(bs_1937));
      return (($gt$gt$eq($import1$instance$Monad$11))(bs2_1942))(function(bs_1943){
        return (ret($import1$instance$Monad$11))((Pair_1718(env2_1941))((zip_1785(ns_1940))(bs_1943)))
      })
    })
  }
};
var rewriteInstance_1870 = function(env_1925){
  return function(i_1926){
    var $phi$218 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1772($import1$instance$Monad$11))(function(d_1931){
      var $phi$219 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExpr_1869(env_1925))(d_1931.$1)))(function(e_1934){
        return (ret($import1$instance$Monad$11))((Pair_1718(d_1931.$0))(e_1934))
      });
      return $phi$219
    }))(i_1926.$3)))(function(bs_1935){
      return (ret($import1$instance$Monad$11))((((Instance_1852(i_1926.$0))(i_1926.$1))(i_1926.$2))(bs_1935))
    });
    return $phi$218
  }
};
var renameImport_1872 = function(er_1944){
  return function(i_1945){
    if((i_1945.$tag==1)&&("./builtins.js"==i_1945.$1)){
      var $phi$221 = (ret($import1$instance$Monad$11))((Pair_1718(er_1944.$0))((push(i_1945))(er_1944.$1)))
    } else if(i_1945.$tag==1){
      var rename_1953 = function(er_1954){
        return function(p_1955){
          var $phi$223 = (($gt$gt$eq($import1$instance$Monad$11))(newIdent_1868(p_1955.$1)))(function(n_1960){
            return (ret($import1$instance$Monad$11))((Pair_1718(((set(p_1955.$1))(n_1960))(er_1954.$0)))((push((Pair_1718(p_1955.$0))(n_1960)))(er_1954.$1)))
          });
          var $phi$222 = $phi$223;
          return $phi$222
        }
      };
      var $phi$221 = (($gt$gt$eq($import1$instance$Monad$11))((((foldM_1771($import1$instance$Monad$11))(rename_1953))((Pair_1718(er_1944.$0))([])))(i_1945.$2)))(function(ens_1961){
        var $phi$224 = (ret($import1$instance$Monad$11))((Pair_1718(ens_1961.$0))((push(((ImportOpen_1850(i_1945.$0))(i_1945.$1))(ens_1961.$1)))(er_1944.$1)));
        return $phi$224
      })
    } else error("pattern match fail",i_1945);
    var $phi$220 = $phi$221;
    return $phi$220
  }
};
var rewriteModule_1873 = function(ms_1964){
  return function(m_1965){
    var $phi$225 = (($gt$gt$eq($import1$instance$Monad$11))((((foldM_1771($import1$instance$Monad$11))(renameImport_1872))((Pair_1718(empty))([])))(m_1965.$2)))(function(eis_1973){
      var $phi$226 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteBindings_1871(eis_1973.$0))(m_1965.$6)))(function(ebs_1976){
        var $phi$227 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_1772($import1$instance$Monad$11))(rewriteInstance_1870(ebs_1976.$0)))(m_1965.$5)))(function(ins_1979){
          return (ret($import1$instance$Monad$11))(((((((Module_1855(m_1965.$0))(m_1965.$1))(eis_1973.$1))(m_1965.$3))(m_1965.$4))(ins_1979))(ebs_1976.$1))
        });
        return $phi$227
      });
      return $phi$226
    });
    return $phi$225
  }
};
var uniquify_1874 = function(m_1980){
  return (($gt$gt$eq($import1$instance$Monad$11))(getUid_1865))(function(uid_1981){
    return (($gt$gt$eq($import1$instance$Monad$11))(getExports_1867))(function(ex_1982){
      var r_1983 = (runState_1767(uid_1981))((rewriteModule_1873(ex_1982))(m_1980));
      return (($gt$gt_1798($import1$instance$Monad$11))(setUid_1866(fst_1732(r_1983))))((ret($import1$instance$Monad$11))(snd_1722(r_1983)))
    })
  })
};
var Pair_1984 = Pair_3;
var mapSnd_1985 = mapSnd_84;
var mapFst_1986 = mapFst_83;
var $gt$eq$gt_1987 = $gt$eq$gt_82;
var snd_1988 = snd_23;
var debug2_1989 = debug2_81;
var Just_1990 = Just_1;
var Nothing_1991 = Nothing_2;
var isJust_1992 = isJust_21;
var Empty_1993 = Empty_7;
var Leaf_1994 = Leaf_8;
var Collision_1995 = Collision_9;
var BitmapIndexed_1996 = BitmapIndexed_10;
var $_1997 = $_12;
var fst_1998 = fst_22;
var Left_1999 = Left_4;
var Right_2000 = Right_5;
var loop_2001 = loop_27;
var find_2002 = find_29;
var hamtMask_2003 = hamtMask_58;
var popCount_2004 = popCount_57;
var hamtIndex_2005 = hamtIndex_59;
var lookup_2006 = lookup_60;
var setContains_2007 = setContains_76;
var foldTrie_2008 = foldTrie_66;
var emptySet_2009 = emptySet_72;
var Unit_2010 = Unit_0;
var not_2011 = not_26;
var $div$eq_2012 = $div$eq_13;
var mapIx_2013 = mapIx_30;
var insert_2014 = insert_61;
var setAdd_2015 = setAdd_73;
var setIntersection_2016 = setIntersection_80;
var remove_2017 = remove_63;
var setDiff_2018 = setDiff_79;
var setToArray_2019 = setToArray_78;
var mergeTrie_2020 = mergeTrie_70;
var setUnion_2021 = setUnion_77;
var setRemove_2022 = setRemove_75;
var setAddAll_2023 = setAddAll_74;
var trieKeys_2024 = trieKeys_71;
var size_2025 = size_68;
var mapTrie_2026 = mapTrie_67;
var nodeMask_2027 = nodeMask_56;
var isEmpty_2028 = isEmpty_69;
var filterTrie_2029 = filterTrie_65;
var nextSetBitMask_2030 = nextSetBitMask_64;
var updateOrSet_2031 = updateOrSet_62;
var State_2032 = State_6;
var runState_2033 = runState_54;
var evalState_2034 = evalState_55;
var sets_2035 = sets_53;
var gets_2036 = gets_52;
var foldM_2037 = foldM_49;
var mapM_2038 = mapM_50;
var forM_2039 = forM_51;
var strToArray_2040 = strToArray_48;
var toRecord_2041 = toRecord_47;
var reverse_2042 = reverse_46;
var tail_2043 = tail_41;
var head_2044 = head_40;
var uniq_2045 = uniq_45;
var mergeSet_2046 = mergeSet_44;
var init_2047 = init_43;
var last_2048 = last_42;
var mapJust_2049 = mapJust_39;
var concatMap_2050 = concatMap_38;
var zip_2051 = zip_37;
var zipWithIndex2_2052 = zipWithIndex2_35;
var zipWithIndex_2053 = zipWithIndex_36;
var join_2054 = join_34;
var all_2055 = all_33;
var exists_2056 = exists_32;
var containsChar_2057 = containsChar_31;
var contains_2058 = contains_28;
var either_2059 = either_24;
var splitEither_2060 = splitEither_25;
var fromJust_2061 = fromJust_20;
var justOr_2062 = justOr_19;
var maybe_2063 = maybe_18;
var $gt$gt_2064 = $gt$gt_17;
var $gt$eq_2065 = $gt$eq_16;
var $lt$eq_2066 = $lt$eq_15;
var $gt_2067 = $gt_14;
var Identity_2068 = Identity_11;
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
var App_2069 = App_726;
var Lam_2070 = Lam_727;
var Case_2071 = Case_728;
var Let_2072 = Let_729;
var New_2073 = New_730;
var breakableDownAndUpM_2074 = breakableDownAndUpM_775;
var breakableDownM_2075 = breakableDownM_779;
var downAndUpM_2076 = downAndUpM_776;
var downM_2077 = downM_778;
var upM_2078 = upM_777;
var breakableDownAndUp_2079 = breakableDownAndUp_770;
var breakableDown_2080 = breakableDown_774;
var downAndUp_2081 = downAndUp_771;
var down_2082 = down_773;
var up_2083 = up_772;
var AnnType_2084 = AnnType_718;
var TUnknown_2085 = TUnknown_749;
var getAnn_2086 = getAnn_754;
var getAnnType_2087 = getAnnType_757;
var Var_2088 = Var_724;
var Const_2089 = Const_725;
var annOf_2090 = annOf_767;
var getType_2091 = getType_769;
var withAnn_2092 = withAnn_768;
var setAnn_2093 = setAnn_755;
var setAnnType_2094 = setAnnType_758;
var setType_2095 = setType_766;
var Data_2096 = Data_738;
var DataCon_2097 = DataCon_739;
var dataConName_2098 = dataConName_764;
var dataConNames_2099 = dataConNames_765;
var TCBound_2100 = TCBound_742;
var TConst_2101 = TConst_743;
var TVar_2102 = TVar_744;
var TApp_2103 = TApp_745;
var TRow_2104 = TRow_746;
var TBot_2105 = TBot_747;
var TForall_2106 = TForall_748;
var equivBound_2107 = equivBound_762;
var equivType_2108 = equivType_763;
var AnnCodeLoc_2109 = AnnCodeLoc_719;
var printCodeLoc_2110 = printCodeLoc_761;
var setAnnCodeLoc_2111 = setAnnCodeLoc_760;
var getAnnCodeLoc_2112 = getAnnCodeLoc_759;
var copyAnn_2113 = copyAnn_756;
var emptyAnn_2114 = emptyAnn_753;
var ImportAll_2115 = ImportAll_752;
var ImportOpen_2116 = ImportOpen_751;
var ImportClosed_2117 = ImportClosed_750;
var Instance_2118 = Instance_741;
var Class_2119 = Class_740;
var ModuleInterface_2120 = ModuleInterface_737;
var Module_2121 = Module_736;
var PData_2122 = PData_735;
var PConst_2123 = PConst_734;
var PVar_2124 = PVar_733;
var CStr_2125 = CStr_732;
var CNum_2126 = CNum_731;
var AnnExport_2127 = AnnExport_723;
var AnnTag_2128 = AnnTag_722;
var AnnData_2129 = AnnData_721;
var AnnUseCount_2130 = AnnUseCount_720;
var printType_2131 = function(t_2137){
  var printParen_2138 = function(t_2142){
    return ($concat(($concat("("))(printType_2131(t_2142))))(")")
  };
  var printSecondTypeInApp_2141 = function(t_2165){
    if(t_2165.$tag==2){
      var $phi$228 = printParen_2138(t_2165)
    } else if(t_2165.$tag==5){
      var $phi$228 = printParen_2138(t_2165)
    } else var $phi$228 = printType_2131(t_2165);
    return $phi$228
  };
  var printFirstTypeInApp_2140 = function(t_2154){
    if((t_2154.$tag==2)&&((t_2154.$1.$tag==2)&&((t_2154.$1.$1.$tag==0)&&("->"==t_2154.$1.$1.$1)))){
      var $phi$229 = printParen_2138(t_2154)
    } else if(t_2154.$tag==5){
      var $phi$229 = printParen_2138(t_2154)
    } else var $phi$229 = printType_2131(t_2154);
    return $phi$229
  };
  var printTypeInFun_2139 = function(t_2143){
    if((t_2143.$tag==2)&&((t_2143.$1.$tag==2)&&((t_2143.$1.$1.$tag==0)&&("->"==t_2143.$1.$1.$1)))){
      var $phi$230 = printParen_2138(t_2143)
    } else if(t_2143.$tag==5){
      var $phi$230 = printParen_2138(t_2143)
    } else var $phi$230 = printType_2131(t_2143);
    return $phi$230
  };
  if(t_2137.$tag==0){
    var $phi$231 = t_2137.$1
  } else if(t_2137.$tag==1){
    var $phi$231 = t_2137.$1
  } else if(t_2137.$tag==4){
    var $phi$231 = "~bottom~"
  } else if(t_2137.$tag==6){
    var $phi$231 = "?"
  } else if((t_2137.$tag==2)&&((t_2137.$1.$tag==2)&&((t_2137.$1.$1.$tag==0)&&("->"==t_2137.$1.$1.$1)))){
    var $phi$231 = ($concat(($concat(printTypeInFun_2139(t_2137.$1.$2)))(" -> ")))(printType_2131(t_2137.$2))
  } else if(t_2137.$tag==2){
    var $phi$231 = ($concat(($concat(printFirstTypeInApp_2140(t_2137.$1)))(" ")))(printSecondTypeInApp_2141(t_2137.$2))
  } else if(t_2137.$tag==5){
    var $phi$233 = length(t_2137.$2);
    if(0==$phi$233){
      var $phi$232 = ""
    } else var $phi$232 = ($concat(" with "))((intercalate(", "))((map(printTypeBound_2132))(t_2137.$2)));
    var bounds_2190 = $phi$232;
    var $phi$231 = ($concat(($concat(($concat(($concat("forall "))((intercalate(", "))(t_2137.$1))))(bounds_2190)))(". ")))(printType_2131(t_2137.$3))
  } else var $phi$231 = error(($concat("cannot print "))(jsonStringify(t_2137)));
  return $phi$231
};
var printTypeBound_2132 = function(b_2193){
  var $phi$234 = ($concat(($concat(($concat(($concat(b_2193.$1))(" ")))("(")))(printType_2131(b_2193.$2))))(")");
  return $phi$234
};
var indent_2135 = map(function(l_2253){
  return ($concat("  "))(l_2253)
});
var printExprTyped_2133 = function(typed_2197){
  return function(e_2198){
    var sameLine_2200 = function(xs_2209){
      return function(ys_2210){
        return (concat(init_2047(xs_2209)))((enqueue(($concat(last_2048(xs_2209)))(head_2044(ys_2210))))(tail_2043(ys_2210)))
      }
    };
    var sameLine3_2201 = function(a_2211){
      return function(b_2212){
        return function(c_2213){
          return (sameLine_2200(a_2211))((sameLine_2200(b_2212))(c_2213))
        }
      }
    };
    var printT_2205 = function(e_2246){
      var t_2247 = getType_2091(e_2246);
      return printType_2131(t_2247)
    };
    var printPat_2203 = function(p_2217){
      if(p_2217.$tag==0){
        var $phi$235 = p_2217.$1
      } else if((p_2217.$tag==1)&&(p_2217.$1.$tag==0)){
        var $phi$235 = jsonStringify(p_2217.$1.$0)
      } else if((p_2217.$tag==1)&&(p_2217.$1.$tag==1)){
        var $phi$235 = jsonStringify(p_2217.$1.$0)
      } else if(p_2217.$tag==2){
        var $phi$235 = ($concat(($concat(($concat(p_2217.$1))(" (")))((join_2054((map(printPat_2203))(p_2217.$2)))(") ("))))(")")
      } else error("pattern match fail",p_2217);
      return $phi$235
    };
    var printParen_2199 = function(e_2208){
      return ((sameLine3_2201(["("]))(printExpr_2206(e_2208)))([")"])
    };
    var printCasePat_2202 = function(cp_2214){
      var $phi$236 = (enqueue(($concat(printPat_2203(cp_2214.$0)))(" ->")))(indent_2135(printExpr_2206(cp_2214.$1)));
      return $phi$236
    };
    var printE_2204 = function(e_2227){
      if(e_2227.$tag==0){
        var $phi$237 = [e_2227.$1]
      } else if((e_2227.$tag==1)&&(e_2227.$1.$tag==0)){
        var $phi$237 = [jsonStringify(e_2227.$1.$0)]
      } else if((e_2227.$tag==1)&&(e_2227.$1.$tag==1)){
        var $phi$237 = [jsonStringify(e_2227.$1.$0)]
      } else if(e_2227.$tag==2){
        var $phi$237 = ((sameLine3_2201(printParen_2199(e_2227.$1)))([" "]))(printParen_2199(e_2227.$2))
      } else if(e_2227.$tag==3){
        var $phi$237 = (enqueue(($concat(($concat("\\"))(e_2227.$1)))(" ->")))(indent_2135(printExpr_2206(e_2227.$2)))
      } else if(e_2227.$tag==4){
        var $phi$237 = (concat(((sameLine3_2201(["case "]))(printParen_2199(e_2227.$1)))([" of"])))(indent_2135((concatMap_2050(printCasePat_2202))(e_2227.$2)))
      } else if(e_2227.$tag==5){
        var $phi$237 = (concat((push("in"))((enqueue("let"))(indent_2135((concatMap_2050(printDef_2134(typed_2197)))(e_2227.$1))))))(indent_2135(printExpr_2206(e_2227.$2)))
      } else error("pattern match fail",e_2227);
      return $phi$237
    };
    var printExpr_2206 = function(e_2248){
      if(!typed_2197){
        var $phi$238 = printE_2204(e_2248)
      } else if(typed_2197){
        var $phi$238 = ((sameLine3_2201(["("]))(printE_2204(e_2248)))([($concat(($concat(" :: "))(printT_2205(e_2248))))(" )")])
      } else error("pattern match fail",typed_2197);
      return $phi$238
    };
    var pe_2207 = printE_2204(e_2198);
    return printExpr_2206(e_2198)
  }
};
var printDef_2134 = function(typed_2249){
  return function(d_2250){
    var $phi$239 = (enqueue(($concat(d_2250.$0))(" =")))(indent_2135((printExprTyped_2133(typed_2249))(d_2250.$1)));
    return $phi$239
  }
};
var reallyPrintExpr_2136 = function(typed_2254){
  return function(e_2255){
    return (join_2054((printExprTyped_2133(typed_2254))(e_2255)))("\n")
  }
};
var Pair_2256 = Pair_3;
var mapSnd_2257 = mapSnd_84;
var mapFst_2258 = mapFst_83;
var $gt$eq$gt_2259 = $gt$eq$gt_82;
var snd_2260 = snd_23;
var debug2_2261 = debug2_81;
var Just_2262 = Just_1;
var Nothing_2263 = Nothing_2;
var isJust_2264 = isJust_21;
var Empty_2265 = Empty_7;
var Leaf_2266 = Leaf_8;
var Collision_2267 = Collision_9;
var BitmapIndexed_2268 = BitmapIndexed_10;
var $_2269 = $_12;
var fst_2270 = fst_22;
var Left_2271 = Left_4;
var Right_2272 = Right_5;
var loop_2273 = loop_27;
var find_2274 = find_29;
var hamtMask_2275 = hamtMask_58;
var popCount_2276 = popCount_57;
var hamtIndex_2277 = hamtIndex_59;
var lookup_2278 = lookup_60;
var setContains_2279 = setContains_76;
var foldTrie_2280 = foldTrie_66;
var emptySet_2281 = emptySet_72;
var Unit_2282 = Unit_0;
var not_2283 = not_26;
var $div$eq_2284 = $div$eq_13;
var mapIx_2285 = mapIx_30;
var insert_2286 = insert_61;
var setAdd_2287 = setAdd_73;
var setIntersection_2288 = setIntersection_80;
var remove_2289 = remove_63;
var setDiff_2290 = setDiff_79;
var setToArray_2291 = setToArray_78;
var mergeTrie_2292 = mergeTrie_70;
var setUnion_2293 = setUnion_77;
var setRemove_2294 = setRemove_75;
var setAddAll_2295 = setAddAll_74;
var trieKeys_2296 = trieKeys_71;
var size_2297 = size_68;
var mapTrie_2298 = mapTrie_67;
var nodeMask_2299 = nodeMask_56;
var isEmpty_2300 = isEmpty_69;
var filterTrie_2301 = filterTrie_65;
var nextSetBitMask_2302 = nextSetBitMask_64;
var updateOrSet_2303 = updateOrSet_62;
var State_2304 = State_6;
var runState_2305 = runState_54;
var evalState_2306 = evalState_55;
var sets_2307 = sets_53;
var gets_2308 = gets_52;
var foldM_2309 = foldM_49;
var mapM_2310 = mapM_50;
var forM_2311 = forM_51;
var strToArray_2312 = strToArray_48;
var toRecord_2313 = toRecord_47;
var reverse_2314 = reverse_46;
var tail_2315 = tail_41;
var head_2316 = head_40;
var uniq_2317 = uniq_45;
var mergeSet_2318 = mergeSet_44;
var init_2319 = init_43;
var last_2320 = last_42;
var mapJust_2321 = mapJust_39;
var concatMap_2322 = concatMap_38;
var zip_2323 = zip_37;
var zipWithIndex2_2324 = zipWithIndex2_35;
var zipWithIndex_2325 = zipWithIndex_36;
var join_2326 = join_34;
var all_2327 = all_33;
var exists_2328 = exists_32;
var containsChar_2329 = containsChar_31;
var contains_2330 = contains_28;
var either_2331 = either_24;
var splitEither_2332 = splitEither_25;
var fromJust_2333 = fromJust_20;
var justOr_2334 = justOr_19;
var maybe_2335 = maybe_18;
var $gt$gt_2336 = $gt$gt_17;
var $gt$eq_2337 = $gt$eq_16;
var $lt$eq_2338 = $lt$eq_15;
var $gt_2339 = $gt_14;
var Identity_2340 = Identity_11;
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
var App_2341 = App_726;
var Lam_2342 = Lam_727;
var Case_2343 = Case_728;
var Let_2344 = Let_729;
var New_2345 = New_730;
var breakableDownAndUpM_2346 = breakableDownAndUpM_775;
var breakableDownM_2347 = breakableDownM_779;
var downAndUpM_2348 = downAndUpM_776;
var downM_2349 = downM_778;
var upM_2350 = upM_777;
var breakableDownAndUp_2351 = breakableDownAndUp_770;
var breakableDown_2352 = breakableDown_774;
var downAndUp_2353 = downAndUp_771;
var down_2354 = down_773;
var up_2355 = up_772;
var AnnType_2356 = AnnType_718;
var TUnknown_2357 = TUnknown_749;
var getAnn_2358 = getAnn_754;
var getAnnType_2359 = getAnnType_757;
var Var_2360 = Var_724;
var Const_2361 = Const_725;
var annOf_2362 = annOf_767;
var getType_2363 = getType_769;
var withAnn_2364 = withAnn_768;
var setAnn_2365 = setAnn_755;
var setAnnType_2366 = setAnnType_758;
var setType_2367 = setType_766;
var Data_2368 = Data_738;
var DataCon_2369 = DataCon_739;
var dataConName_2370 = dataConName_764;
var dataConNames_2371 = dataConNames_765;
var TCBound_2372 = TCBound_742;
var TConst_2373 = TConst_743;
var TVar_2374 = TVar_744;
var TApp_2375 = TApp_745;
var TRow_2376 = TRow_746;
var TBot_2377 = TBot_747;
var TForall_2378 = TForall_748;
var equivBound_2379 = equivBound_762;
var equivType_2380 = equivType_763;
var AnnCodeLoc_2381 = AnnCodeLoc_719;
var printCodeLoc_2382 = printCodeLoc_761;
var setAnnCodeLoc_2383 = setAnnCodeLoc_760;
var getAnnCodeLoc_2384 = getAnnCodeLoc_759;
var copyAnn_2385 = copyAnn_756;
var emptyAnn_2386 = emptyAnn_753;
var ImportAll_2387 = ImportAll_752;
var ImportOpen_2388 = ImportOpen_751;
var ImportClosed_2389 = ImportClosed_750;
var Instance_2390 = Instance_741;
var Class_2391 = Class_740;
var ModuleInterface_2392 = ModuleInterface_737;
var Module_2393 = Module_736;
var PData_2394 = PData_735;
var PConst_2395 = PConst_734;
var PVar_2396 = PVar_733;
var CStr_2397 = CStr_732;
var CNum_2398 = CNum_731;
var AnnExport_2399 = AnnExport_723;
var AnnTag_2400 = AnnTag_722;
var AnnData_2401 = AnnData_721;
var AnnUseCount_2402 = AnnUseCount_720;
var reallyPrintExpr_2403 = reallyPrintExpr_2136;
var renameExpr_2404 = rewriteExpr_1869;
var getUid_2405 = getUid_1471;
var setUid_2406 = setUid_1472;
var mergeCount_2409 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_2444){
      return function(b_2445){
        return ((foldTrie_2280(function(a_2446){
          return function(k_2447){
            return function(v_2448){
              return ((((insert_2286(local$instance$Hashable$1))(local$instance$Eq$0))(k_2447))(v_2448+((justOr_2334(0))((((lookup_2278(local$instance$Hashable$1))(local$instance$Eq$0))(k_2447))(a_2446)))))(a_2446)
            }
          }
        }))(a_2444))(b_2445)
      }
    }
  }
};
var getCount_2408 = function(e_2442){
  var $phi$241 = (((getAnn_2358($import1$instance$Hashable$13))($import1$instance$Eq$1))("useCount"))(annOf_2362(e_2442));
  if(($phi$241.$tag==0)&&($phi$241.$0.$tag==2)){
    var $phi$240 = $phi$241.$0.$0
  } else error("pattern match fail",$phi$241);
  return $phi$240
};
var annWithUseCount_2410 = function(e_2449){
  var dropCount_2450 = function(local$instance$Hashable$1){
    return function(local$instance$Eq$0){
      return function(n_2454){
        return function(c_2455){
          return (((remove_2289(local$instance$Hashable$1))(local$instance$Eq$0))(n_2454))(c_2455)
        }
      }
    }
  };
  var countPat_2452 = function(c_2459){
    return function(p_2460){
      if(p_2460.$tag==0){
        var $phi$242 = (((dropCount_2450($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_2460.$1))(c_2459)
      } else if(p_2460.$tag==2){
        var $phi$242 = ((foldl(countPat_2452))(c_2459))(p_2460.$2)
      } else var $phi$242 = c_2459;
      return $phi$242
    }
  };
  var countCase_2451 = function(pe_2456){
    var $phi$243 = (countPat_2452(getCount_2408(pe_2456.$1)))(pe_2456.$0);
    return $phi$243
  };
  var countExpr_2453 = function(e_2467){
    if(e_2467.$tag==0){
      var $phi$244 = ((((insert_2286($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_2467.$1))(1))(Empty_2265)
    } else if(e_2467.$tag==2){
      var $phi$244 = (((mergeCount_2409($import1$instance$Hashable$13))($import1$instance$Eq$1))(getCount_2408(e_2467.$1)))(getCount_2408(e_2467.$2))
    } else if(e_2467.$tag==3){
      var $phi$244 = (((dropCount_2450($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_2467.$1))(getCount_2408(e_2467.$2))
    } else if(e_2467.$tag==5){
      var $phi$244 = ((foldl(function(c_2479){
        return function(n_2480){
          return (((dropCount_2450($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_2480))(c_2479)
        }
      }))(((foldl(function(c_2481){
        return function(e_2482){
          return (((mergeCount_2409($import1$instance$Hashable$13))($import1$instance$Eq$1))(c_2481))(getCount_2408(e_2482))
        }
      }))(getCount_2408(e_2467.$2)))((map(snd_2260))(e_2467.$1))))((map(fst_2270))(e_2467.$1))
    } else if(e_2467.$tag==4){
      var $phi$244 = ((foldl((mergeCount_2409($import1$instance$Hashable$13))($import1$instance$Eq$1)))(getCount_2408(e_2467.$1)))((map(countCase_2451))(e_2467.$2))
    } else if(e_2467.$tag==1){
      var $phi$244 = Empty_2265
    } else if(e_2467.$tag==6){
      var $phi$244 = ((foldl((mergeCount_2409($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_2265))((map(getCount_2408))(e_2467.$2))
    } else error("pattern match fail",e_2467);
    return $phi$244
  };
  return ((up_2355(function(a_2491){
    return function(e_2492){
      return ($_2269(Pair_2256(a_2491)))((withAnn_2364(((((setAnn_2365($import1$instance$Hashable$13))($import1$instance$Eq$1))("useCount"))(($_2269(AnnUseCount_2402))(countExpr_2453(e_2492))))(annOf_2362(e_2492))))(e_2492))
    }
  }))(Unit_2282))(e_2449)
};
var patSize_2418 = function(p_2560){
  if(p_2560.$tag==0){
    var $phi$245 = 1
  } else if(p_2560.$tag==1){
    var $phi$245 = 1
  } else if(p_2560.$tag==2){
    var $phi$245 = ((foldl(function(c_2568){
      return function(p_2569){
        return c_2568+(patSize_2418(p_2569))
      }
    }))(1))(p_2560.$2)
  } else error("pattern match fail",p_2560);
  return $phi$245
};
var exprSize_2417 = function(e_2532){
  if(e_2532.$tag==0){
    var $phi$246 = 1
  } else if(e_2532.$tag==1){
    var $phi$246 = 1
  } else if(e_2532.$tag==2){
    var $phi$246 = (1+(exprSize_2417(e_2532.$1)))+(exprSize_2417(e_2532.$2))
  } else if(e_2532.$tag==3){
    var $phi$246 = 1+(exprSize_2417(e_2532.$2))
  } else if(e_2532.$tag==4){
    var $phi$246 = 1+(((foldl(function(c_2546){
      return function(p_2547){
        var $phi$247 = (c_2546+(patSize_2418(p_2547.$0)))+(exprSize_2417(p_2547.$1));
        return $phi$247
      }
    }))(exprSize_2417(e_2532.$1)))(e_2532.$2))
  } else if(e_2532.$tag==5){
    var $phi$246 = 1+(((foldl(function(c_2553){
      return function(b_2554){
        return c_2553+(exprSize_2417(snd_2260(b_2554)))
      }
    }))(exprSize_2417(e_2532.$2)))(e_2532.$1))
  } else if(e_2532.$tag==6){
    var $phi$246 = ((foldl(function(c_2558){
      return function(e_2559){
        return c_2558+(exprSize_2417(e_2559))
      }
    }))(1))(e_2532.$2)
  } else error("pattern match fail",e_2532);
  return $phi$246
};
var chooseForInlining_2419 = function(baseCount_2570){
  return function(bs_2571){
    var useCount_2572 = ((foldl((mergeCount_2409($import1$instance$Hashable$13))($import1$instance$Eq$1)))(baseCount_2570))((map(function(b_2574){
      return getCount_2408(snd_2260(b_2574))
    }))(bs_2571));
    var f_2573 = function(r_2575){
      return function(b_2576){
        if(b_2576.$1.$tag==0){
          var $phi$249 = ((((insert_2286($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2576.$0))(b_2576.$1))(r_2575)
        } else if(b_2576.$1.$tag==1){
          var $phi$249 = ((((insert_2286($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2576.$0))(b_2576.$1))(r_2575)
        } else if(b_2576.$1.$tag==3){
          var $phi$253 = ($or((($lt($import1$instance$Ord$2))(exprSize_2417(b_2576.$1)))(10)))((($eq$eq($import1$instance$Eq$0))(1))((justOr_2334(0))((((lookup_2278($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2576.$0))(useCount_2572))));
          if(!$phi$253){
            var $phi$252 = r_2575
          } else if($phi$253){
            var $phi$252 = ((((insert_2286($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2576.$0))(b_2576.$1))(r_2575)
          } else error("pattern match fail",$phi$253);
          var $phi$249 = $phi$252
        } else if(b_2576.$1.$tag==6){
          var $phi$251 = (($eq$eq($import1$instance$Eq$0))(1))((justOr_2334(0))((((lookup_2278($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2576.$0))(useCount_2572)));
          if(!$phi$251){
            var $phi$250 = r_2575
          } else if($phi$251){
            var $phi$250 = ((((insert_2286($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2576.$0))(b_2576.$1))(r_2575)
          } else error("pattern match fail",$phi$251);
          var $phi$249 = $phi$250
        } else var $phi$249 = r_2575;
        var $phi$248 = $phi$249;
        return $phi$248
      }
    };
    return ((foldl(f_2573))(Empty_2265))(bs_2571)
  }
};
var mapBindingsM_2412 = function(local$instance$Monad$0){
  return function(f_2498){
    return function(bs_2499){
      return ((mapM_2310(local$instance$Monad$0))(function(b_2500){
        var $phi$254 = (($gt$gt$eq(local$instance$Monad$0))((f_2498(b_2500.$0))(b_2500.$1)))(function(e_2503){
          return (ret(local$instance$Monad$0))((Pair_2256(b_2500.$0))(e_2503))
        });
        return $phi$254
      }))(bs_2499)
    }
  }
};
var inlineCode_2421 = function(always_2604){
  return function(e_2605){
    var withAnnCopy_2606 = function(ann_2609){
      return function(e_2610){
        return (withAnn_2364((((mergeTrie_2292($import1$instance$Hashable$13))($import1$instance$Eq$1))((((remove_2289($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_2362(e_2610))))((((copyAnn_2385($import1$instance$Hashable$13))($import1$instance$Eq$1))(["export"]))(ann_2609))))(e_2610)
      }
    };
    var inlinePat_2608 = function(p_2632){
      if(p_2632.$tag==2){
        var $phi$257 = (((lookup_2278($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_2632.$1))(always_2604);
        if(($phi$257.$tag==0)&&($phi$257.$0.$tag==0)){
          var $phi$256 = ((PData_2394(p_2632.$0))($phi$257.$0.$1))((map(inlinePat_2608))(p_2632.$2))
        } else var $phi$256 = ((PData_2394(p_2632.$0))(p_2632.$1))((map(inlinePat_2608))(p_2632.$2));
        var $phi$255 = $phi$256
      } else var $phi$255 = p_2632;
      return $phi$255
    };
    var inlineExpr_2607 = function(e_2611){
      if(e_2611.$tag==0){
        var $phi$263 = (((lookup_2278($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_2611.$1))(always_2604);
        if($phi$263.$tag==1){
          var $phi$262 = (ret($import1$instance$Monad$11))(Left_2271(e_2611))
        } else if($phi$263.$tag==0){
          var $phi$262 = ((fmap($import1$instance$Functor$9))(function(e_2615){
            return Left_2271((withAnnCopy_2606(e_2611.$0))(e_2615))
          }))((renameExpr_2404(empty))($phi$263.$0))
        } else error("pattern match fail",$phi$263);
        var $phi$258 = $phi$262
      } else if(e_2611.$tag==5){
        var always2_2619 = (((mergeTrie_2292($import1$instance$Hashable$13))($import1$instance$Eq$1))(always_2604))((chooseForInlining_2419(getCount_2408(e_2611.$2)))(e_2611.$1));
        var $phi$258 = (($gt$gt$eq($import1$instance$Monad$11))(((mapBindingsM_2412($import1$instance$Monad$11))(function(n_2620){
          return function(e_2621){
            return (inlineCode_2421((((remove_2289($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_2620))(always2_2619)))(e_2621)
          }
        }))(e_2611.$1)))(function(bs_2622){
          return (($gt$gt$eq($import1$instance$Monad$11))((inlineCode_2421(always2_2619))(e_2611.$2)))(function(e_2623){
            var $phi$261 = length(bs_2622);
            if(0==$phi$261){
              var $phi$260 = (ret($import1$instance$Monad$11))(Right_2272((withAnnCopy_2606(e_2611.$0))(e_2623)))
            } else var $phi$260 = (ret($import1$instance$Monad$11))(Right_2272(((Let_2344(e_2611.$0))(bs_2622))(e_2623)));
            return $phi$260
          })
        })
      } else if(e_2611.$tag==4){
        var $phi$258 = (ret($import1$instance$Monad$11))(Left_2271(((Case_2343(e_2611.$0))(e_2611.$1))((map(function(p_2628){
          var $phi$259 = (Pair_2256(inlinePat_2608(p_2628.$0)))(p_2628.$1);
          return $phi$259
        }))(e_2611.$2))))
      } else var $phi$258 = (ret($import1$instance$Monad$11))(Left_2271(e_2611));
      return $phi$258
    };
    return ((breakableDownM_2347($import1$instance$Monad$11))(inlineExpr_2607))(e_2605)
  }
};
var dropDeadBindings_2422 = function(useCount_2640){
  return function(bs_2641){
    var isExport_2642 = function(e_2644){
      return isJust_2264((((getAnn_2358($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_2362(e_2644)))
    };
    var f_2643 = function(b_2645){
      var totalCount_2648 = (justOr_2334(0))((((lookup_2278($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2645.$0))(useCount_2640));
      var recursiveCount_2649 = (justOr_2334(0))((((lookup_2278($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_2645.$0))(getCount_2408(b_2645.$1)));
      var keep_2650 = ($or(isExport_2642(b_2645.$1)))((($gt_2339($import1$instance$Ord$2))(totalCount_2648-recursiveCount_2649))(0));
      if(keep_2650){
        var $phi$265 = Just_2262((Pair_2256(b_2645.$0))(b_2645.$1))
      } else if(!keep_2650){
        var ann_2651 = annOf_2362(b_2645.$1);
        var $phi$267 = (((getAnn_2358($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(ann_2651);
        if($phi$267.$tag==1){
          var $phi$266 = Nothing_2263
        } else if($phi$267.$tag==0){
          var $phi$266 = Just_2262((Pair_2256(b_2645.$0))((withAnn_2364(((((setAnn_2365($import1$instance$Hashable$13))($import1$instance$Eq$1))("dead"))(AnnTag_2400))(ann_2651)))(b_2645.$1)))
        } else error("pattern match fail",$phi$267);
        var $phi$265 = $phi$266
      } else error("pattern match fail",keep_2650);
      var $phi$264 = $phi$265;
      return $phi$264
    };
    return (mapJust_2321(f_2643))(bs_2641)
  }
};
var deadCode_2416 = function(e_2520){
  var f_2521 = function(e_2522){
    if(e_2522.$tag==5){
      var useCount_2526 = ((foldl((mergeCount_2409($import1$instance$Hashable$13))($import1$instance$Eq$1)))(getCount_2408(e_2522.$2)))((map(function(b_2528){
        return getCount_2408(snd_2260(b_2528))
      }))(e_2522.$1));
      var bs2_2527 = (dropDeadBindings_2422(useCount_2526))(e_2522.$1);
      var $phi$268 = ((Let_2344(e_2522.$0))(bs2_2527))(e_2522.$2)
    } else var $phi$268 = e_2522;
    return $phi$268
  };
  return snd_2260(((down_2354(function(a_2530){
    return function(e_2531){
      return (Pair_2256(a_2530))(f_2521(e_2531))
    }
  }))(Unit_2282))(e_2520))
};
var betaReduction_2420 = function(e_2590){
  var f_2591 = function(e_2592){
    if((e_2592.$tag==2)&&(e_2592.$1.$tag==3)){
      if(e_2592.$2.$tag==0){
        var $phi$272 = (($eq$eq($import1$instance$Eq$1))(e_2592.$1.$1))(e_2592.$2.$1);
        if($phi$272){
          var $phi$271 = e_2592.$1.$2
        } else if(!$phi$272){
          var $phi$271 = ((Let_2344(e_2592.$0))([(Pair_2256(e_2592.$1.$1))((Var_2360(e_2592.$2.$0))(e_2592.$2.$1))]))(e_2592.$1.$2)
        } else error("pattern match fail",$phi$272);
        var $phi$270 = $phi$271
      } else var $phi$270 = ((Let_2344(e_2592.$0))([(Pair_2256(e_2592.$1.$1))(e_2592.$2)]))(e_2592.$1.$2);
      var $phi$269 = $phi$270
    } else var $phi$269 = e_2592;
    return $phi$269
  };
  return snd_2260(((down_2354(function(a_2602){
    return function(e_2603){
      return (Pair_2256(a_2602))(f_2591(e_2603))
    }
  }))(Unit_2282))(e_2590))
};
var mapBindings_2411 = function(f_2493){
  return function(bs_2494){
    return (map(function(b_2495){
      var $phi$273 = (Pair_2256(b_2495.$0))(f_2493(b_2495.$1));
      return $phi$273
    }))(bs_2494)
  }
};
var pass_2414 = function(bs_2508){
  var bs2_2509 = (mapBindings_2411(function(e_2513){
    return ($_2269(snd_2260))(annWithUseCount_2410(e_2513))
  }))(bs_2508);
  var useCount_2510 = ((foldl((mergeCount_2409($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_2265))((map(function(b_2514){
    return getCount_2408(snd_2260(b_2514))
  }))(bs2_2509));
  var bs3_2511 = (mapBindings_2411(deadCode_2416))((dropDeadBindings_2422(useCount_2510))(bs2_2509));
  var always_2512 = (chooseForInlining_2419(Empty_2265))(bs3_2511);
  return (($gt$gt$eq($import1$instance$Monad$11))(((mapBindingsM_2412($import1$instance$Monad$11))(function(n_2515){
    return function(e_2516){
      return (inlineCode_2421((((remove_2289($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_2515))(always_2512)))(e_2516)
    }
  }))(bs3_2511)))(function(bs_2517){
    return (ret($import1$instance$Monad$11))((mapBindings_2411(betaReduction_2420))(bs_2517))
  })
};
var processImports_2415 = function(useCount_2518){
  return function(is_2519){
    return is_2519
  }
};
var loopPasses_2413 = function(local$instance$Monad$0){
  return function(n_2504){
    return function(p_2505){
      return function(bs_2506){
        if(0==n_2504){
          var $phi$274 = (ret(local$instance$Monad$0))(bs_2506)
        } else var $phi$274 = (($gt$gt$eq(local$instance$Monad$0))(p_2505(bs_2506)))(((loopPasses_2413(local$instance$Monad$0))(n_2504-1))(p_2505));
        return $phi$274
      }
    }
  }
};
var inline_2407 = function(enable_2423){
  return function(m_2424){
    return (($gt$gt$eq($import1$instance$Monad$11))(getUid_2405))(function(uid_2425){
      if(enable_2423){
        var $phi$276 = 10
      } else if(!enable_2423){
        var $phi$276 = 0
      } else error("pattern match fail",enable_2423);
      var iterCount_2433 = $phi$276;
      var r_2434 = (runState_2305(uid_2425))((((loopPasses_2413($import1$instance$Monad$11))(iterCount_2433))(pass_2414))(m_2424.$6));
      var bs2_2435 = snd_2260(r_2434);
      var bs3_2437 = (mapBindings_2411(function(e_2440){
        return ($_2269(snd_2260))(annWithUseCount_2410(e_2440))
      }))(bs2_2435);
      var useCount_2438 = ((foldl((mergeCount_2409($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_2265))((map(function(b_2441){
        return getCount_2408(snd_2260(b_2441))
      }))(bs3_2437));
      var is2_2439 = (processImports_2415(useCount_2438))(m_2424.$2);
      var uid2_2436 = fst_2270(r_2434);
      var $phi$275 = (($gt$gt_2336($import1$instance$Monad$11))(setUid_2406(uid2_2436)))((ret($import1$instance$Monad$11))(((((((Module_2393(m_2424.$0))(m_2424.$1))(is2_2439))(m_2424.$3))(m_2424.$4))(m_2424.$5))(bs3_2437)));
      return $phi$275
    })
  }
};
var Pair_2653 = Pair_3;
var mapSnd_2654 = mapSnd_84;
var mapFst_2655 = mapFst_83;
var $gt$eq$gt_2656 = $gt$eq$gt_82;
var snd_2657 = snd_23;
var debug2_2658 = debug2_81;
var Just_2659 = Just_1;
var Nothing_2660 = Nothing_2;
var isJust_2661 = isJust_21;
var Empty_2662 = Empty_7;
var Leaf_2663 = Leaf_8;
var Collision_2664 = Collision_9;
var BitmapIndexed_2665 = BitmapIndexed_10;
var $_2666 = $_12;
var fst_2667 = fst_22;
var Left_2668 = Left_4;
var Right_2669 = Right_5;
var loop_2670 = loop_27;
var find_2671 = find_29;
var hamtMask_2672 = hamtMask_58;
var popCount_2673 = popCount_57;
var hamtIndex_2674 = hamtIndex_59;
var lookup_2675 = lookup_60;
var setContains_2676 = setContains_76;
var foldTrie_2677 = foldTrie_66;
var emptySet_2678 = emptySet_72;
var Unit_2679 = Unit_0;
var not_2680 = not_26;
var $div$eq_2681 = $div$eq_13;
var mapIx_2682 = mapIx_30;
var insert_2683 = insert_61;
var setAdd_2684 = setAdd_73;
var setIntersection_2685 = setIntersection_80;
var remove_2686 = remove_63;
var setDiff_2687 = setDiff_79;
var setToArray_2688 = setToArray_78;
var mergeTrie_2689 = mergeTrie_70;
var setUnion_2690 = setUnion_77;
var setRemove_2691 = setRemove_75;
var setAddAll_2692 = setAddAll_74;
var trieKeys_2693 = trieKeys_71;
var size_2694 = size_68;
var mapTrie_2695 = mapTrie_67;
var nodeMask_2696 = nodeMask_56;
var isEmpty_2697 = isEmpty_69;
var filterTrie_2698 = filterTrie_65;
var nextSetBitMask_2699 = nextSetBitMask_64;
var updateOrSet_2700 = updateOrSet_62;
var State_2701 = State_6;
var runState_2702 = runState_54;
var evalState_2703 = evalState_55;
var sets_2704 = sets_53;
var gets_2705 = gets_52;
var foldM_2706 = foldM_49;
var mapM_2707 = mapM_50;
var forM_2708 = forM_51;
var strToArray_2709 = strToArray_48;
var toRecord_2710 = toRecord_47;
var reverse_2711 = reverse_46;
var tail_2712 = tail_41;
var head_2713 = head_40;
var uniq_2714 = uniq_45;
var mergeSet_2715 = mergeSet_44;
var init_2716 = init_43;
var last_2717 = last_42;
var mapJust_2718 = mapJust_39;
var concatMap_2719 = concatMap_38;
var zip_2720 = zip_37;
var zipWithIndex2_2721 = zipWithIndex2_35;
var zipWithIndex_2722 = zipWithIndex_36;
var join_2723 = join_34;
var all_2724 = all_33;
var exists_2725 = exists_32;
var containsChar_2726 = containsChar_31;
var contains_2727 = contains_28;
var either_2728 = either_24;
var splitEither_2729 = splitEither_25;
var fromJust_2730 = fromJust_20;
var justOr_2731 = justOr_19;
var maybe_2732 = maybe_18;
var $gt$gt_2733 = $gt$gt_17;
var $gt$eq_2734 = $gt$eq_16;
var $lt$eq_2735 = $lt$eq_15;
var $gt_2736 = $gt_14;
var Identity_2737 = Identity_11;
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
var App_2738 = App_726;
var Lam_2739 = Lam_727;
var Case_2740 = Case_728;
var Let_2741 = Let_729;
var New_2742 = New_730;
var breakableDownAndUpM_2743 = breakableDownAndUpM_775;
var breakableDownM_2744 = breakableDownM_779;
var downAndUpM_2745 = downAndUpM_776;
var downM_2746 = downM_778;
var upM_2747 = upM_777;
var breakableDownAndUp_2748 = breakableDownAndUp_770;
var breakableDown_2749 = breakableDown_774;
var downAndUp_2750 = downAndUp_771;
var down_2751 = down_773;
var up_2752 = up_772;
var AnnType_2753 = AnnType_718;
var TUnknown_2754 = TUnknown_749;
var getAnn_2755 = getAnn_754;
var getAnnType_2756 = getAnnType_757;
var Var_2757 = Var_724;
var Const_2758 = Const_725;
var annOf_2759 = annOf_767;
var getType_2760 = getType_769;
var withAnn_2761 = withAnn_768;
var setAnn_2762 = setAnn_755;
var setAnnType_2763 = setAnnType_758;
var setType_2764 = setType_766;
var Data_2765 = Data_738;
var DataCon_2766 = DataCon_739;
var dataConName_2767 = dataConName_764;
var dataConNames_2768 = dataConNames_765;
var TCBound_2769 = TCBound_742;
var TConst_2770 = TConst_743;
var TVar_2771 = TVar_744;
var TApp_2772 = TApp_745;
var TRow_2773 = TRow_746;
var TBot_2774 = TBot_747;
var TForall_2775 = TForall_748;
var equivBound_2776 = equivBound_762;
var equivType_2777 = equivType_763;
var AnnCodeLoc_2778 = AnnCodeLoc_719;
var printCodeLoc_2779 = printCodeLoc_761;
var setAnnCodeLoc_2780 = setAnnCodeLoc_760;
var getAnnCodeLoc_2781 = getAnnCodeLoc_759;
var copyAnn_2782 = copyAnn_756;
var emptyAnn_2783 = emptyAnn_753;
var ImportAll_2784 = ImportAll_752;
var ImportOpen_2785 = ImportOpen_751;
var ImportClosed_2786 = ImportClosed_750;
var Instance_2787 = Instance_741;
var Class_2788 = Class_740;
var ModuleInterface_2789 = ModuleInterface_737;
var Module_2790 = Module_736;
var PData_2791 = PData_735;
var PConst_2792 = PConst_734;
var PVar_2793 = PVar_733;
var CStr_2794 = CStr_732;
var CNum_2795 = CNum_731;
var AnnExport_2796 = AnnExport_723;
var AnnTag_2797 = AnnTag_722;
var AnnData_2798 = AnnData_721;
var AnnUseCount_2799 = AnnUseCount_720;
var newIdent_2800 = newIdent_1868;
var rewriteExpr_2801 = rewriteExpr_1869;
var importAsBindings_2805 = function(ens_2838){
  return function(dataAnns_2839){
    return function(i_2840){
      if((i_2840.$tag==1)&&("./builtins.js"==i_2840.$1)){
        var $phi$277 = []
      } else if(i_2840.$tag==1){
        var f_2846 = function(p_2847){
          var $phi$280 = (((lookup_2675($import1$instance$Hashable$13))($import1$instance$Eq$1))(($concat(($concat(i_2840.$1))("#")))(p_2847.$0)))(ens_2838);
          if($phi$280.$tag==0){
            var $phi$279 = (Pair_2653(p_2847.$1))((Var_2757(($_2666(justOr_2731(emptyAnn_2783)))((((lookup_2675($import1$instance$Hashable$13))($import1$instance$Eq$1))($phi$280.$0))(dataAnns_2839))))($phi$280.$0))
          } else if($phi$280.$tag==1){
            var $phi$279 = error(($concat(($concat(($concat("mod merger encountered unknown import "))(i_2840.$1)))("#")))(p_2847.$0))
          } else error("pattern match fail",$phi$280);
          var $phi$278 = $phi$279;
          return $phi$278
        };
        var $phi$277 = (map(f_2846))((filter(function(p_2851){
          return (($div$eq_2681($import1$instance$Eq$1))(fst_2667(p_2851)))(snd_2657(p_2851))
        }))(i_2840.$2))
      } else error("pattern match fail",i_2840);
      return $phi$277
    }
  }
};
var dropExport_2803 = function(f_2807){
  return function(b_2808){
    var $phi$283 = (((getAnn_2755($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_2759(b_2808.$1));
    if($phi$283.$tag==1){
      var $phi$282 = (ret($import1$instance$Monad$11))(b_2808)
    } else if(($phi$283.$tag==0)&&($phi$283.$0.$tag==5)){
      var $phi$282 = (($gt$gt$eq($import1$instance$Monad$11))(gets_2705))(function(ns_2812){
        return (($gt$gt_2733($import1$instance$Monad$11))(sets_2704(((((insert_2683($import1$instance$Hashable$13))($import1$instance$Eq$1))(($concat(($concat(f_2807))("#")))($phi$283.$0.$0)))(b_2808.$0))(ns_2812))))((ret($import1$instance$Monad$11))((Pair_2653(b_2808.$0))((withAnn_2761((((remove_2686($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_2759(b_2808.$1))))(b_2808.$1))))
      })
    } else error("pattern match fail",$phi$283);
    var $phi$281 = $phi$282;
    return $phi$281
  }
};
var mergeInto_2804 = function(a_2813){
  return function(b_2814){
    var $phi$284 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_2707($import1$instance$Monad$11))(dropExport_2803(a_2813.$1)))(a_2813.$6)))(function(bs_2822){
      return (($gt$gt$eq($import1$instance$Monad$11))(gets_2705))(function(ns_2823){
        var f_2825 = function(local$instance$Hashable$1){
          return function(local$instance$Eq$0){
            return function(r_2826){
              return function(b_2827){
                var $phi$287 = (((getAnn_2755($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(annOf_2759(b_2827.$1));
                if($phi$287.$tag==1){
                  var $phi$286 = r_2826
                } else if($phi$287.$tag==0){
                  var $phi$286 = ((((insert_2683(local$instance$Hashable$1))(local$instance$Eq$0))(b_2827.$0))(((((setAnn_2762($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))($phi$287.$0))(emptyAnn_2783)))(r_2826)
                } else error("pattern match fail",$phi$287);
                var $phi$285 = $phi$286;
                return $phi$285
              }
            }
          }
        };
        var dataAnns_2824 = ((foldl((f_2825($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_2662))(bs_2822);
        var $phi$288 = (ret($import1$instance$Monad$11))(((((((Module_2790(a_2813.$0))(b_2814.$1))(a_2813.$2))([]))([]))([]))((concat(bs_2822))((concat((concatMap_2719((importAsBindings_2805(ns_2823))(dataAnns_2824)))(b_2814.$2)))(b_2814.$6))));
        return $phi$288
      })
    });
    return $phi$284
  }
};
var mergeModules_2802 = function(ms_2806){
  return (evalState_2703(Empty_2662))((((foldM_2706($import1$instance$Monad$11))(mergeInto_2804))(head_2713(ms_2806)))(tail_2712(ms_2806)))
};
var Pair_2852 = Pair_3;
var mapSnd_2853 = mapSnd_84;
var mapFst_2854 = mapFst_83;
var $gt$eq$gt_2855 = $gt$eq$gt_82;
var snd_2856 = snd_23;
var debug2_2857 = debug2_81;
var Just_2858 = Just_1;
var Nothing_2859 = Nothing_2;
var isJust_2860 = isJust_21;
var Empty_2861 = Empty_7;
var Leaf_2862 = Leaf_8;
var Collision_2863 = Collision_9;
var BitmapIndexed_2864 = BitmapIndexed_10;
var $_2865 = $_12;
var fst_2866 = fst_22;
var Left_2867 = Left_4;
var Right_2868 = Right_5;
var loop_2869 = loop_27;
var find_2870 = find_29;
var hamtMask_2871 = hamtMask_58;
var popCount_2872 = popCount_57;
var hamtIndex_2873 = hamtIndex_59;
var lookup_2874 = lookup_60;
var setContains_2875 = setContains_76;
var foldTrie_2876 = foldTrie_66;
var emptySet_2877 = emptySet_72;
var Unit_2878 = Unit_0;
var not_2879 = not_26;
var $div$eq_2880 = $div$eq_13;
var mapIx_2881 = mapIx_30;
var insert_2882 = insert_61;
var setAdd_2883 = setAdd_73;
var setIntersection_2884 = setIntersection_80;
var remove_2885 = remove_63;
var setDiff_2886 = setDiff_79;
var setToArray_2887 = setToArray_78;
var mergeTrie_2888 = mergeTrie_70;
var setUnion_2889 = setUnion_77;
var setRemove_2890 = setRemove_75;
var setAddAll_2891 = setAddAll_74;
var trieKeys_2892 = trieKeys_71;
var size_2893 = size_68;
var mapTrie_2894 = mapTrie_67;
var nodeMask_2895 = nodeMask_56;
var isEmpty_2896 = isEmpty_69;
var filterTrie_2897 = filterTrie_65;
var nextSetBitMask_2898 = nextSetBitMask_64;
var updateOrSet_2899 = updateOrSet_62;
var State_2900 = State_6;
var runState_2901 = runState_54;
var evalState_2902 = evalState_55;
var sets_2903 = sets_53;
var gets_2904 = gets_52;
var foldM_2905 = foldM_49;
var mapM_2906 = mapM_50;
var forM_2907 = forM_51;
var strToArray_2908 = strToArray_48;
var toRecord_2909 = toRecord_47;
var reverse_2910 = reverse_46;
var tail_2911 = tail_41;
var head_2912 = head_40;
var uniq_2913 = uniq_45;
var mergeSet_2914 = mergeSet_44;
var init_2915 = init_43;
var last_2916 = last_42;
var mapJust_2917 = mapJust_39;
var concatMap_2918 = concatMap_38;
var zip_2919 = zip_37;
var zipWithIndex2_2920 = zipWithIndex2_35;
var zipWithIndex_2921 = zipWithIndex_36;
var join_2922 = join_34;
var all_2923 = all_33;
var exists_2924 = exists_32;
var containsChar_2925 = containsChar_31;
var contains_2926 = contains_28;
var either_2927 = either_24;
var splitEither_2928 = splitEither_25;
var fromJust_2929 = fromJust_20;
var justOr_2930 = justOr_19;
var maybe_2931 = maybe_18;
var $gt$gt_2932 = $gt$gt_17;
var $gt$eq_2933 = $gt$eq_16;
var $lt$eq_2934 = $lt$eq_15;
var $gt_2935 = $gt_14;
var Identity_2936 = Identity_11;
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
var App_2937 = App_726;
var Lam_2938 = Lam_727;
var Case_2939 = Case_728;
var Let_2940 = Let_729;
var New_2941 = New_730;
var breakableDownAndUpM_2942 = breakableDownAndUpM_775;
var breakableDownM_2943 = breakableDownM_779;
var downAndUpM_2944 = downAndUpM_776;
var downM_2945 = downM_778;
var upM_2946 = upM_777;
var breakableDownAndUp_2947 = breakableDownAndUp_770;
var breakableDown_2948 = breakableDown_774;
var downAndUp_2949 = downAndUp_771;
var down_2950 = down_773;
var up_2951 = up_772;
var AnnType_2952 = AnnType_718;
var TUnknown_2953 = TUnknown_749;
var getAnn_2954 = getAnn_754;
var getAnnType_2955 = getAnnType_757;
var Var_2956 = Var_724;
var Const_2957 = Const_725;
var annOf_2958 = annOf_767;
var getType_2959 = getType_769;
var withAnn_2960 = withAnn_768;
var setAnn_2961 = setAnn_755;
var setAnnType_2962 = setAnnType_758;
var setType_2963 = setType_766;
var Data_2964 = Data_738;
var DataCon_2965 = DataCon_739;
var dataConName_2966 = dataConName_764;
var dataConNames_2967 = dataConNames_765;
var TCBound_2968 = TCBound_742;
var TConst_2969 = TConst_743;
var TVar_2970 = TVar_744;
var TApp_2971 = TApp_745;
var TRow_2972 = TRow_746;
var TBot_2973 = TBot_747;
var TForall_2974 = TForall_748;
var equivBound_2975 = equivBound_762;
var equivType_2976 = equivType_763;
var AnnCodeLoc_2977 = AnnCodeLoc_719;
var printCodeLoc_2978 = printCodeLoc_761;
var setAnnCodeLoc_2979 = setAnnCodeLoc_760;
var getAnnCodeLoc_2980 = getAnnCodeLoc_759;
var copyAnn_2981 = copyAnn_756;
var emptyAnn_2982 = emptyAnn_753;
var ImportAll_2983 = ImportAll_752;
var ImportOpen_2984 = ImportOpen_751;
var ImportClosed_2985 = ImportClosed_750;
var Instance_2986 = Instance_741;
var Class_2987 = Class_740;
var ModuleInterface_2988 = ModuleInterface_737;
var Module_2989 = Module_736;
var PData_2990 = PData_735;
var PConst_2991 = PConst_734;
var PVar_2992 = PVar_733;
var CStr_2993 = CStr_732;
var CNum_2994 = CNum_731;
var AnnExport_2995 = AnnExport_723;
var AnnTag_2996 = AnnTag_722;
var AnnData_2997 = AnnData_721;
var AnnUseCount_2998 = AnnUseCount_720;
var printType_2999 = printType_2131;
var printTypeBound_3000 = printTypeBound_2132;
var reallyPrintExpr_3001 = reallyPrintExpr_2136;
var sccSorted_3002 = sccSorted_570;
var ICtx_3004 = function($_0_3062){
  return function($_1_3063){
    return function($_2_3064){
      return function($_3_3065){
        return {$0:$_0_3062,$1:$_1_3063,$2:$_2_3064,$3:$_3_3065}
      }
    }
  }
};
var IEnv_3005 = function($_0_3066){
  return function($_1_3067){
    return function($_2_3068){
      return {$0:$_0_3066,$1:$_1_3067,$2:$_2_3068}
    }
  }
};
var Subs_3003 = function($_0_3060){
  return function($_1_3061){
    return {$0:$_0_3060,$1:$_1_3061}
  }
};
var instanceToTypeBound_3054 = function(i_3655){
  var $phi$289 = ((TCBound_2968(emptyAnn_2982))(i_3655.$1))(i_3655.$2);
  return $phi$289
};
var getTypedExports_3057 = function(m_3740){
  var collectExports_3748 = function(es_3750){
    return function(b_3751){
      var e_3752 = snd_2856(b_3751);
      var $phi$292 = (((getAnn_2954($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_2958(e_3752));
      if($phi$292.$tag==1){
        var $phi$291 = es_3750
      } else if(($phi$292.$tag==0)&&($phi$292.$0.$tag==5)){
        var $phi$291 = ((set($phi$292.$0.$0))(getType_2959(e_3752)))(es_3750)
      } else error("pattern match fail",$phi$292);
      return $phi$291
    }
  };
  var bs_3749 = ((foldl(collectExports_3748))(empty))(m_3740.$6);
  var $phi$290 = ((ModuleInterface_2988(bs_3749))(m_3740.$4))((map(instanceToTypeBound_3054))(m_3740.$5));
  return $phi$290
};
var getBounds_3018 = function(ctx_3157){
  var $phi$293 = ctx_3157.$1;
  return $phi$293
};
var setBounds_3019 = function(bs_3162){
  return function(ctx_3163){
    var $phi$294 = (((ICtx_3004(ctx_3163.$0))(bs_3162))(ctx_3163.$2))(ctx_3163.$3);
    return $phi$294
  }
};
var getInstances_3032 = function(env_3225){
  var $phi$295 = env_3225.$1;
  return $phi$295
};
var satisfies_3058 = function(a_3754){
  return function(b_3755){
    if(a_3754.$tag==1){
      var $phi$296 = true
    } else if(a_3754.$tag==0){
      if(b_3755.$tag==0){
        var $phi$298 = (($eq$eq($import1$instance$Eq$1))(a_3754.$1))(b_3755.$1)
      } else var $phi$298 = false;
      var $phi$296 = $phi$298
    } else if(a_3754.$tag==2){
      if(b_3755.$tag==2){
        var $phi$297 = ($and((satisfies_3058(a_3754.$1))(b_3755.$1)))((satisfies_3058(a_3754.$2))(b_3755.$2))
      } else var $phi$297 = false;
      var $phi$296 = $phi$297
    } else var $phi$296 = error(($concat("unexpected type in satisfies "))(printType_2999(a_3754)));
    return $phi$296
  }
};
var satisfiesBound_3059 = function(a_3771){
  return function(b_3772){
    var $phi$300 = ($and((($eq$eq($import1$instance$Eq$1))(a_3771.$1))(b_3772.$1)))((satisfies_3058(a_3771.$2))(b_3772.$2));
    var $phi$299 = $phi$300;
    return $phi$299
  }
};
var dropSatisfiedBounds_3046 = function(env_3509){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_2904))(function(ctx_3510){
    var is_3511 = getInstances_3032(env_3509);
    var bs_3512 = getBounds_3018(ctx_3510);
    var bs2_3513 = (filter(function(b_3514){
      return not_2879((exists_2924(function(i_3515){
        return (satisfiesBound_3059(i_3515))(b_3514)
      }))(is_3511))
    }))(bs_3512);
    return sets_2903((setBounds_3019(bs2_3513))(ctx_3510))
  })
};
var getSub_3006 = function(v_3069){
  return function(subs_3070){
    var $phi$301 = (($lt$pip$gt($import1$instance$Alternative$6))((((lookup_2874($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3069))(subs_3070.$0)))((((lookup_2874($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3069))(subs_3070.$1));
    return $phi$301
  }
};
var mkTForall_3034 = function(ann_3231){
  return function(vs_3232){
    return function(bs_3233){
      return function(t_3234){
        var f_3235 = function(bs_3236){
          return function(b_3237){
            var $phi$303 = (exists_2924(equivBound_2975(b_3237)))(bs_3236);
            if($phi$303){
              var $phi$302 = bs_3236
            } else if(!$phi$303){
              var $phi$302 = (push(b_3237))(bs_3236)
            } else error("pattern match fail",$phi$303);
            return $phi$302
          }
        };
        return (((TForall_2974(ann_3231))(vs_3232))(((foldl(f_3235))([]))(bs_3233)))(t_3234)
      }
    }
  }
};
var dropSubs_3011 = function(vs_3119){
  return function(subs_3120){
    var $phi$304 = (Subs_3003(((foldl(function(r_3123){
      return function(v_3124){
        return (((remove_2885($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3124))(r_3123)
      }
    }))(subs_3120.$0))(vs_3119)))(((foldl(function(r_3125){
      return function(v_3126){
        return (((remove_2885($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3126))(r_3125)
      }
    }))(subs_3120.$1))(vs_3119));
    return $phi$304
  }
};
var applySubs_3037 = function(subs_3264){
  return function(t_3265){
    if(t_3265.$tag==5){
      var subs2_3270 = (dropSubs_3011(t_3265.$1))(subs_3264);
      var $phi$305 = (((mkTForall_3034(t_3265.$0))(t_3265.$1))((map(applySubsBound_3038(subs2_3270)))(t_3265.$2)))((applySubs_3037(subs2_3270))(t_3265.$3))
    } else if(t_3265.$tag==1){
      var $phi$308 = (getSub_3006(t_3265.$1))(subs_3264);
      if($phi$308.$tag==1){
        var $phi$307 = t_3265
      } else if($phi$308.$tag==0){
        var $phi$307 = $phi$308.$0
      } else error("pattern match fail",$phi$308);
      var $phi$305 = $phi$307
    } else if(t_3265.$tag==2){
      var $phi$305 = ((TApp_2971(t_3265.$0))((applySubs_3037(subs_3264))(t_3265.$1)))((applySubs_3037(subs_3264))(t_3265.$2))
    } else if(t_3265.$tag==3){
      var $phi$305 = ((TRow_2972(t_3265.$0))((map(function(m_3280){
        var $phi$306 = (Pair_2852((applySubs_3037(subs_3264))(m_3280.$0)))((applySubs_3037(subs_3264))(m_3280.$1));
        return $phi$306
      }))(t_3265.$1)))(((fmap($import1$instance$Functor$4))(applySubs_3037(subs_3264)))(t_3265.$2))
    } else var $phi$305 = t_3265;
    return $phi$305
  }
};
var applySubsBound_3038 = function(subs_3284){
  return function(b_3285){
    var $phi$309 = ((TCBound_2968(b_3285.$0))(b_3285.$1))((applySubs_3037(subs_3284))(b_3285.$2));
    return $phi$309
  }
};
var applySubsE_3051 = function(subs_3577){
  return function(e_3578){
    var f_3579 = function(a_3580){
      return function(e_3581){
        var t2_3582 = (applySubs_3037(subs_3577))(getType_2959(e_3581));
        return (Pair_2852(a_3580))((setType_2963(t2_3582))(e_3581))
      }
    };
    return snd_2856(((down_2950(f_3579))(true))(e_3578))
  }
};
var getSubs_3015 = function(ctx_3140){
  var $phi$310 = ctx_3140.$0;
  return $phi$310
};
var applySubsDef_3050 = function(d_3573){
  var $phi$311 = (($gt$gt$eq($import1$instance$Monad$11))(gets_2904))(function(ctx_3576){
    return ($_2865(ret($import1$instance$Monad$11)))((Pair_2852(d_3573.$0))((applySubsE_3051(getSubs_3015(ctx_3576)))(d_3573.$1)))
  });
  return $phi$311
};
var freeVars_3052 = function(e_3583){
  var namesInPat_3586 = function(p_3596){
    if(p_3596.$tag==0){
      var $phi$312 = [p_3596.$1]
    } else if(p_3596.$tag==1){
      var $phi$312 = []
    } else if(p_3596.$tag==2){
      var $phi$312 = ((foldl((mergeSet_2914($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(namesInPat_3586))(p_3596.$2))
    } else error("pattern match fail",p_3596);
    return $phi$312
  };
  var freeVarsInPData_3585 = function(p_3591){
    if(p_3591.$tag==2){
      var $phi$313 = ((foldl((mergeSet_2914($import1$instance$Ord$3))($import1$instance$Eq$1)))([p_3591.$1]))((map(freeVarsInPData_3585))(p_3591.$2))
    } else var $phi$313 = [];
    return $phi$313
  };
  var freeVarsInPat_3584 = function(p_3587){
    var $phi$314 = (((mergeSet_2914($import1$instance$Ord$3))($import1$instance$Eq$1))((filter(function(v_3590){
      return not_2879(((contains_2926($import1$instance$Eq$1))(v_3590))(namesInPat_3586(p_3587.$0)))
    }))(freeVars_3052(p_3587.$1))))(freeVarsInPData_3585(p_3587.$0));
    return $phi$314
  };
  if(e_3583.$tag==0){
    var $phi$315 = [e_3583.$1]
  } else if(e_3583.$tag==1){
    var $phi$315 = []
  } else if(e_3583.$tag==2){
    var $phi$315 = (((mergeSet_2914($import1$instance$Ord$3))($import1$instance$Eq$1))(freeVars_3052(e_3583.$1)))(freeVars_3052(e_3583.$2))
  } else if(e_3583.$tag==3){
    var $phi$315 = (filter(function(v_3614){
      return (($div$eq_2880($import1$instance$Eq$1))(v_3614))(e_3583.$1)
    }))(freeVars_3052(e_3583.$2))
  } else if(e_3583.$tag==4){
    var $phi$315 = ((foldl((mergeSet_2914($import1$instance$Ord$3))($import1$instance$Eq$1)))(freeVars_3052(e_3583.$1)))((map(freeVarsInPat_3584))(e_3583.$2))
  } else if(e_3583.$tag==5){
    var $phi$315 = (filter(function(v_3621){
      return not_2879(((contains_2926($import1$instance$Eq$1))(v_3621))((map(fst_2866))(e_3583.$1)))
    }))(((foldl((mergeSet_2914($import1$instance$Ord$3))($import1$instance$Eq$1)))(freeVars_3052(e_3583.$2)))((map(function(d_3622){
      return freeVars_3052(snd_2856(d_3622))
    }))(e_3583.$1)))
  } else if(e_3583.$tag==6){
    var $phi$315 = ((foldl((mergeSet_2914($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(freeVars_3052))(e_3583.$2))
  } else error("pattern match fail",e_3583);
  return $phi$315
};
var newTVarM_3013 = (($gt$gt$eq($import1$instance$Monad$11))(gets_2904))(function(ctx_3133){
  var n_3138 = ($concat("$"))(intToString(ctx_3133.$2));
  var $phi$316 = (($gt$gt_2932($import1$instance$Monad$11))(sets_2903((((ICtx_3004(ctx_3133.$0))(ctx_3133.$1))(ctx_3133.$2+1))(ctx_3133.$3))))((ret($import1$instance$Monad$11))((TVar_2970(emptyAnn_2982))(n_3138)));
  return $phi$316
});
var errorM_3020 = function(s_3168){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_2904))(function(ctx_3169){
    var $phi$317 = error(ctx_3169.$3(s_3168));
    return $phi$317
  })
};
var getBinding_3025 = function(n_3189){
  return function(env_3190){
    var $phi$318 = (((lookup_2874($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_3189))(env_3190.$0);
    return $phi$318
  }
};
var getBindingM_3026 = function(n_3194){
  return function(env_3195){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_2904))(function(ctx_3196){
      return ($_2865(ret($import1$instance$Monad$11)))(((fmap($import1$instance$Functor$4))(applySubs_3037(getSubs_3015(ctx_3196))))((getBinding_3025(n_3194))(env_3195)))
    })
  }
};
var getBindings_3027 = function(env_3197){
  var $phi$319 = env_3197.$0;
  return $phi$319
};
var freeTVars_3041 = function(t_3337){
  if(t_3337.$tag==1){
    var $phi$320 = (((setAdd_2883($import1$instance$Hashable$13))($import1$instance$Eq$1))(t_3337.$1))(emptySet_2877)
  } else if(t_3337.$tag==4){
    var $phi$320 = emptySet_2877
  } else if(t_3337.$tag==6){
    var $phi$320 = emptySet_2877
  } else if(t_3337.$tag==0){
    var $phi$320 = emptySet_2877
  } else if(t_3337.$tag==5){
    var $phi$320 = ((foldl(function(s_3346){
      return function(v_3347){
        return (((setRemove_2890($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3347))(s_3346)
      }
    }))(((foldl((setUnion_2889($import1$instance$Hashable$13))($import1$instance$Eq$1)))(freeTVars_3041(t_3337.$3)))((map(freeTVarsInBound_3042))(t_3337.$2))))(t_3337.$1)
  } else if(t_3337.$tag==2){
    var $phi$320 = (((setUnion_2889($import1$instance$Hashable$13))($import1$instance$Eq$1))(freeTVars_3041(t_3337.$1)))(freeTVars_3041(t_3337.$2))
  } else if(t_3337.$tag==3){
    var $phi$320 = ((foldl((setUnion_2889($import1$instance$Hashable$13))($import1$instance$Eq$1)))(($_2865(justOr_2930(emptySet_2877)))(((fmap($import1$instance$Functor$4))(freeTVars_3041))(t_3337.$2))))((map(function(m_3354){
      return (((setUnion_2889($import1$instance$Hashable$13))($import1$instance$Eq$1))(freeTVars_3041(fst_2866(m_3354))))(freeTVars_3041(snd_2856(m_3354)))
    }))(t_3337.$1))
  } else error("pattern match fail",t_3337);
  return $phi$320
};
var freeTVarsInBound_3042 = function(b_3355){
  var $phi$321 = freeTVars_3041(b_3355.$2);
  return $phi$321
};
var addBinding_3028 = function(n_3201){
  return function(t_3202){
    return function(env_3203){
      var u_3207 = (((setUnion_2889($import1$instance$Hashable$13))($import1$instance$Eq$1))(env_3203.$2))(freeTVars_3041(t_3202));
      var $phi$322 = ((IEnv_3005(((((insert_2882($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_3201))(t_3202))(env_3203.$0)))(env_3203.$1))(u_3207);
      return $phi$322
    }
  }
};
var addBindings_3029 = function(nbs_3208){
  return function(env_3209){
    var $phi$323 = ((IEnv_3005((((mergeTrie_2888($import1$instance$Hashable$13))($import1$instance$Eq$1))(env_3209.$0))(nbs_3208)))(env_3209.$1))(((foldTrie_2876(function(fvs_3213){
      return function(__3214){
        return function(t_3215){
          return (((setUnion_2889($import1$instance$Hashable$13))($import1$instance$Eq$1))(fvs_3213))(freeTVars_3041(t_3215))
        }
      }
    }))(env_3209.$2))(nbs_3208));
    return $phi$323
  }
};
var f1_3033 = function(a_3229){
  return function(b_3230){
    return ((TApp_2971(emptyAnn_2982))(((TApp_2971(emptyAnn_2982))((TConst_2969(emptyAnn_2982))("->")))(a_3229)))(b_3230)
  }
};
var emptySubs_3007 = (Subs_3003(Empty_2861))(Empty_2861);
var composeSubs_3008 = function(ef_3073){
  return function(sa_3074){
    return function(sb_3075){
      var $phi$324 = ((foldTrie_2876(function(r_3078){
        return function(v_3079){
          return function(t_3080){
            return (((addSub_3009(ef_3073))(v_3079))(t_3080))(r_3078)
          }
        }
      }))(((foldTrie_2876(function(r_3081){
        return function(v_3082){
          return function(t_3083){
            return (((addSatSub_3010(ef_3073))(v_3082))(t_3083))(r_3081)
          }
        }
      }))(sa_3074))(sb_3075.$0)))(sb_3075.$1);
      return $phi$324
    }
  }
};
var addSub_3009 = function(ef_3084){
  return function(v_3085){
    return function(t_3086){
      return function(subs_3087){
        var t2_3088 = (applySubs_3037(subs_3087))(t_3086);
        var $phi$326 = (getSub_3006(v_3085))(subs_3087);
        if($phi$326.$tag==1){
          var subUnsat_3091 = function(local$instance$Hashable$1){
            return function(local$instance$Eq$0){
              return function(su_3095){
                return function(uv_3096){
                  return function(ut_3097){
                    var ut2_3100 = ((substitute_3036(v_3085))(t2_3088))(ut_3097);
                    var $phi$330 = isEmpty_2896(freeTVars_3041(ut2_3100));
                    if($phi$330){
                      var $phi$329 = (Pair_2852(((((insert_2882(local$instance$Hashable$1))(local$instance$Eq$0))(uv_3096))(ut2_3100))(su_3095.$0)))(su_3095.$1)
                    } else if(!$phi$330){
                      var $phi$329 = (Pair_2852(su_3095.$0))(((((insert_2882(local$instance$Hashable$1))(local$instance$Eq$0))(uv_3096))(ut2_3100))(su_3095.$1))
                    } else error("pattern match fail",$phi$330);
                    var $phi$328 = $phi$329;
                    return $phi$328
                  }
                }
              }
            }
          };
          var su_3092 = ((foldTrie_2876((subUnsat_3091($import1$instance$Hashable$13))($import1$instance$Eq$1)))((Pair_2852(subs_3087.$0))(Empty_2861)))(subs_3087.$1);
          var unsat2_3094 = snd_2856(su_3092);
          var sat2_3093 = fst_2866(su_3092);
          var $phi$332 = isEmpty_2896(freeTVars_3041(t2_3088));
          if($phi$332){
            var $phi$331 = (Subs_3003(((((insert_2882($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3085))(t2_3088))(sat2_3093)))(unsat2_3094)
          } else if(!$phi$332){
            var $phi$331 = (Subs_3003(sat2_3093))(((((insert_2882($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3085))(t2_3088))(unsat2_3094))
          } else error("pattern match fail",$phi$332);
          var $phi$327 = $phi$331;
          var $phi$325 = $phi$327
        } else if($phi$326.$tag==0){
          var $phi$325 = ((composeSubs_3008(ef_3084))(subs_3087))(((unify_3040(ef_3084))($phi$326.$0))(t2_3088))
        } else error("pattern match fail",$phi$326);
        return $phi$325
      }
    }
  }
};
var addSatSub_3010 = function(ef_3102){
  return function(v_3103){
    return function(t_3104){
      return function(subs_3105){
        var $phi$334 = (getSub_3006(v_3103))(subs_3105);
        if($phi$334.$tag==1){
          var subUnsat_3108 = function(local$instance$Hashable$1){
            return function(local$instance$Eq$0){
              return function(su_3112){
                return function(uv_3113){
                  return function(ut_3114){
                    var ut2_3117 = ((substitute_3036(v_3103))(t_3104))(ut_3114);
                    var $phi$338 = isEmpty_2896(freeTVars_3041(ut2_3117));
                    if($phi$338){
                      var $phi$337 = (Pair_2852(((((insert_2882(local$instance$Hashable$1))(local$instance$Eq$0))(uv_3113))(ut2_3117))(su_3112.$0)))(su_3112.$1)
                    } else if(!$phi$338){
                      var $phi$337 = (Pair_2852(su_3112.$0))(((((insert_2882(local$instance$Hashable$1))(local$instance$Eq$0))(uv_3113))(ut2_3117))(su_3112.$1))
                    } else error("pattern match fail",$phi$338);
                    var $phi$336 = $phi$337;
                    return $phi$336
                  }
                }
              }
            }
          };
          var su_3109 = ((foldTrie_2876((subUnsat_3108($import1$instance$Hashable$13))($import1$instance$Eq$1)))((Pair_2852(subs_3105.$0))(Empty_2861)))(subs_3105.$1);
          var unsat2_3111 = snd_2856(su_3109);
          var sat2_3110 = fst_2866(su_3109);
          var $phi$335 = (Subs_3003(((((insert_2882($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3103))(t_3104))(sat2_3110)))(unsat2_3111);
          var $phi$333 = $phi$335
        } else if($phi$334.$tag==0){
          var $phi$333 = ((composeSubs_3008(ef_3102))(subs_3105))(((unify_3040(ef_3102))($phi$334.$0))(t_3104))
        } else error("pattern match fail",$phi$334);
        return $phi$333
      }
    }
  }
};
var substitute_3036 = function(n_3260){
  return function(s_3261){
    return function(t_3262){
      return (applySubs_3037((((addSub_3009(function(s_3263){
        return ($concat("substitute: "))(s_3263)
      }))(n_3260))(s_3261))(emptySubs_3007)))(t_3262)
    }
  }
};
var unify_3040 = function(ef_3295){
  return function(a_3296){
    return function(b_3297){
      var err_3299 = function(a_3305){
        return function(b_3306){
          return error(ef_3295(($concat(($concat(($concat("cannot unify "))(printType_2999(a_3305))))(" with ")))(printType_2999(b_3306))))
        }
      };
      var bind_3298 = function(n_3300){
        return function(t_3301){
          if(t_3301.$tag==1){
            var $phi$343 = (($eq$eq($import1$instance$Eq$1))(n_3300))(t_3301.$1);
            if($phi$343){
              var $phi$342 = emptySubs_3007
            } else if(!$phi$343){
              var $phi$342 = (((addSub_3009(ef_3295))(n_3300))(t_3301))(emptySubs_3007)
            } else error("pattern match fail",$phi$343);
            var $phi$339 = $phi$342
          } else {
            var $phi$341 = (((setContains_2875($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_3300))(freeTVars_3041(t_3301));
            if($phi$341){
              var $phi$340 = error(ef_3295("occurs check failed"))
            } else if(!$phi$341){
              var $phi$340 = (((addSub_3009(ef_3295))(n_3300))(t_3301))(emptySubs_3007)
            } else error("pattern match fail",$phi$341);
            var $phi$339 = $phi$340
          };
          return $phi$339
        }
      };
      if(a_3296.$tag==1){
        var $phi$344 = (bind_3298(a_3296.$1))(b_3297)
      } else if(a_3296.$tag==0){
        if(b_3297.$tag==0){
          var $phi$349 = (($eq$eq($import1$instance$Eq$1))(a_3296.$1))(b_3297.$1);
          if($phi$349){
            var $phi$348 = emptySubs_3007
          } else if(!$phi$349){
            var $phi$348 = (err_3299(a_3296))(b_3297)
          } else error("pattern match fail",$phi$349);
          var $phi$347 = $phi$348
        } else if(b_3297.$tag==1){
          var $phi$347 = (bind_3298(b_3297.$1))(a_3296)
        } else var $phi$347 = (err_3299(a_3296))(b_3297);
        var $phi$344 = $phi$347
      } else if(a_3296.$tag==6){
        var $phi$344 = (err_3299(a_3296))(b_3297)
      } else if(a_3296.$tag==4){
        var $phi$344 = (err_3299(a_3296))(b_3297)
      } else if(a_3296.$tag==2){
        if(b_3297.$tag==1){
          var $phi$346 = (bind_3298(b_3297.$1))(a_3296)
        } else if(b_3297.$tag==2){
          var fsubs_3324 = ((unify_3040(ef_3295))(a_3296.$1))(b_3297.$1);
          var xsubs_3325 = ((unify_3040(ef_3295))((applySubs_3037(fsubs_3324))(a_3296.$2)))((applySubs_3037(fsubs_3324))(b_3297.$2));
          var $phi$346 = ((composeSubs_3008(ef_3295))(fsubs_3324))(xsubs_3325)
        } else var $phi$346 = (err_3299(a_3296))(b_3297);
        var $phi$344 = $phi$346
      } else if(a_3296.$tag==3){
        if(b_3297.$tag==1){
          var $phi$345 = (bind_3298(b_3297.$1))(a_3296)
        } else if(b_3297.$tag==3){
          var $phi$345 = (err_3299(a_3296))(b_3297)
        } else var $phi$345 = (err_3299(a_3296))(b_3297);
        var $phi$344 = $phi$345
      } else var $phi$344 = (err_3299(a_3296))(b_3297);
      return $phi$344
    }
  }
};
var newTVar_3012 = function(ctx_3127){
  var n_3132 = ($concat("$"))(intToString(ctx_3127.$2));
  var $phi$350 = (Pair_2852((((ICtx_3004(ctx_3127.$0))(ctx_3127.$1))(ctx_3127.$2+1))(ctx_3127.$3)))((TVar_2970(emptyAnn_2982))(n_3132));
  return $phi$350
};
var addBound_3017 = function(b_3151){
  return function(ctx_3152){
    var $phi$351 = (((ICtx_3004(ctx_3152.$0))((push(b_3151))(ctx_3152.$1)))(ctx_3152.$2))(ctx_3152.$3);
    return $phi$351
  }
};
var instantiate_3035 = function(t_3238){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_2904))(function(ctx_3239){
    var mkvar_3240 = function(cs_3241){
      return function(v_3242){
        var $phi$354 = newTVar_3012(cs_3241.$0);
        var $phi$353 = (Pair_2852($phi$354.$0))((((addSub_3009(function(s_3247){
          return ($concat("instantiate: "))(s_3247)
        }))(v_3242))($phi$354.$1))(cs_3241.$1));
        var $phi$352 = $phi$353;
        return $phi$352
      }
    };
    if(t_3238.$tag==5){
      var $phi$357 = ((foldl(mkvar_3240))((Pair_2852(ctx_3239))(emptySubs_3007)))(t_3238.$1);
      var bs2_3255 = (map(applySubsBound_3038($phi$357.$1)))(t_3238.$2);
      var ctx3_3256 = ((foldl(function(ctx_3257){
        return function(b_3258){
          return (addBound_3017(b_3258))(ctx_3257)
        }
      }))($phi$357.$0))(bs2_3255);
      var t2_3254 = (applySubs_3037($phi$357.$1))(t_3238.$3);
      var $phi$356 = (($gt$gt_2932($import1$instance$Monad$11))(sets_2903(ctx3_3256)))((ret($import1$instance$Monad$11))(t2_3254));
      var $phi$355 = $phi$356
    } else var $phi$355 = (ret($import1$instance$Monad$11))(t_3238);
    return $phi$355
  })
};
var setSubs_3016 = function(subs_3145){
  return function(ctx_3146){
    var $phi$358 = (((ICtx_3004(subs_3145))((map(applySubsBound_3038(subs_3145)))(ctx_3146.$1)))(ctx_3146.$2))(ctx_3146.$3);
    return $phi$358
  }
};
var getErrorF_3023 = (($gt$gt$eq($import1$instance$Monad$11))(gets_2904))(function(ctx_3184){
  var $phi$359 = (ret($import1$instance$Monad$11))(ctx_3184.$3);
  return $phi$359
});
var unifyM_3039 = function(a_3289){
  return function(b_3290){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_2904))(function(ctx_3291){
      return (($gt$gt$eq($import1$instance$Monad$11))(getErrorF_3023))(function(ef_3292){
        var ef2_3293 = function(s_3294){
          return ef_3292(($concat(($concat(($concat(($concat(($concat("unifying "))(printType_2999(a_3289))))(" and ")))(printType_2999(b_3290))))(": ")))(s_3294))
        };
        return sets_2903((setSubs_3016(((composeSubs_3008(ef2_3293))(getSubs_3015(ctx_3291)))(((unify_3040(ef2_3293))(a_3289))(b_3290))))(ctx_3291))
      })
    })
  }
};
var onError_3021 = function(e_3174){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_2904))(function(ctx_3175){
    var $phi$360 = sets_2903((((ICtx_3004(ctx_3175.$0))(ctx_3175.$1))(ctx_3175.$2))(e_3174));
    return $phi$360
  })
};
var withError_3022 = function(e_3180){
  return function(f_3181){
    return (($gt$gt$eq($import1$instance$Monad$11))(getErrorF_3023))(function(old_3182){
      return (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_2932($import1$instance$Monad$11))(onError_3021(e_3180)))(f_3181)))(function(r_3183){
        return (($gt$gt_2932($import1$instance$Monad$11))(onError_3021(old_3182)))((ret($import1$instance$Monad$11))(r_3183))
      })
    })
  }
};
var withLocError_3043 = function(e_3359){
  return function(f_3360){
    var $phi$362 = getAnnCodeLoc_2980(annOf_2958(e_3359));
    if($phi$362.$tag==1){
      var $phi$361 = f_3360
    } else if($phi$362.$tag==0){
      var $phi$361 = (withError_3022(function(s_3362){
        return ($concat(($concat(s_3362))(" ")))(printCodeLoc_2978($phi$362.$0))
      }))(f_3360)
    } else error("pattern match fail",$phi$362);
    return $phi$361
  }
};
var unrollDataConType_3049 = function(t_3564){
  if((t_3564.$tag==2)&&((t_3564.$1.$tag==2)&&((t_3564.$1.$1.$tag==0)&&("->"==t_3564.$1.$1.$1)))){
    var $phi$365 = unrollDataConType_3049(t_3564.$2);
    var $phi$364 = (Pair_2852((enqueue(t_3564.$1.$2))($phi$365.$0)))($phi$365.$1);
    var $phi$363 = $phi$364
  } else var $phi$363 = (Pair_2852([]))(t_3564);
  return $phi$363
};
var freeTVarsInEnv_3030 = function(env_3216){
  var $phi$366 = env_3216.$2;
  return $phi$366
};
var generalize_3048 = function(env_3532){
  return function(t_3533){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_2904))(function(ctx_3534){
      var subs_3535 = getSubs_3015(ctx_3534);
      var envTVars_3536 = freeTVarsInEnv_3030(env_3532);
      var $phi$367 = ((foldTrie_2876(function(s_3543){
        return function(v_3544){
          return function(__3545){
            return (((setUnion_2889($import1$instance$Hashable$13))($import1$instance$Eq$1))(s_3543))((justOr_2930(Empty_2861))(((fmap($import1$instance$Functor$4))(freeTVars_3041))((((lookup_2874($import1$instance$Hashable$13))($import1$instance$Eq$1))(v_3544))(subs_3535.$1))))
          }
        }
      }))(envTVars_3536))(envTVars_3536);
      var nonFree_3537 = $phi$367;
      var vs_3538 = (((setDiff_2886($import1$instance$Hashable$13))($import1$instance$Eq$1))(freeTVars_3041(t_3533)))(nonFree_3537);
      var processBounds_3540 = function(vbb_3546){
        return function(b_3547){
          var boundVars_3551 = freeTVarsInBound_3042(b_3547);
          var sharedVars_3552 = (((setIntersection_2884($import1$instance$Hashable$13))($import1$instance$Eq$1))(boundVars_3551))(vs_3538);
          var $phi$370 = isEmpty_2896(sharedVars_3552);
          if($phi$370){
            var $phi$369 = (Pair_2852(vbb_3546.$0))((Pair_2852(vbb_3546.$1.$0))((push(b_3547))(vbb_3546.$1.$1)))
          } else if(!$phi$370){
            var $phi$372 = (($eq$eq($import1$instance$Eq$0))(size_2893(sharedVars_3552)))(size_2893(boundVars_3551));
            if($phi$372){
              var $phi$371 = (Pair_2852(vbb_3546.$0))((Pair_2852((push(b_3547))(vbb_3546.$1.$0)))(vbb_3546.$1.$1))
            } else if(!$phi$372){
              var $phi$371 = (Pair_2852((((setUnion_2889($import1$instance$Hashable$13))($import1$instance$Eq$1))(vbb_3546.$0))(sharedVars_3552)))((Pair_2852(vbb_3546.$1.$0))((push(b_3547))(vbb_3546.$1.$1)))
            } else error("pattern match fail",$phi$372);
            var $phi$369 = $phi$371
          } else error("pattern match fail",$phi$370);
          var $phi$368 = $phi$369;
          return $phi$368
        }
      };
      var vbb_3539 = ((foldl(processBounds_3540))((Pair_2852(emptySet_2877))((Pair_2852([]))([]))))(getBounds_3018(ctx_3534));
      var finalVars_3556 = (((setDiff_2886($import1$instance$Hashable$13))($import1$instance$Eq$1))(vs_3538))(vbb_3539.$0);
      var drop_3557 = function(local$instance$Hashable$1){
        return function(local$instance$Eq$0){
          return function(r_3559){
            return function(v_3560){
              return function(t_3561){
                var $phi$375 = ($_2865(isEmpty_2896))((((setIntersection_2884($import1$instance$Hashable$13))($import1$instance$Eq$1))(finalVars_3556))(freeTVars_3041(t_3561)));
                if($phi$375){
                  var $phi$374 = ((((insert_2882(local$instance$Hashable$1))(local$instance$Eq$0))(v_3560))(t_3561))(r_3559)
                } else if(!$phi$375){
                  var $phi$374 = r_3559
                } else error("pattern match fail",$phi$375);
                return $phi$374
              }
            }
          }
        }
      };
      var $phi$376 = (Subs_3003(subs_3535.$0))(((foldTrie_2876((drop_3557($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_2861))(subs_3535.$1));
      var subs2_3558 = $phi$376;
      var $phi$378 = ($or(($_2865(not_2879))(isEmpty_2896(finalVars_3556))))((($gt_2935($import1$instance$Ord$2))(length(vbb_3539.$1.$0)))(0));
      if($phi$378){
        var $phi$377 = (ret($import1$instance$Monad$11))((((mkTForall_3034(emptyAnn_2982))(setToArray_2887(finalVars_3556)))(vbb_3539.$1.$0))(t_3533))
      } else if(!$phi$378){
        var $phi$377 = (ret($import1$instance$Monad$11))(t_3533)
      } else error("pattern match fail",$phi$378);
      var $phi$373 = (($gt$gt_2932($import1$instance$Monad$11))(sets_2903((setBounds_3019(vbb_3539.$1.$1))((setSubs_3016(subs2_3558))(ctx_3534)))))($phi$377);
      return $phi$373
    })
  }
};
var infer_3044 = function(env_3363){
  return function(e_3364){
    var inferPat_3367 = function(env_3385){
      return function(te_3386){
        return function(pat_3387){
          if(pat_3387.$tag==0){
            var $phi$379 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_3013))(function(tv_3390){
              return (($gt$gt_2932($import1$instance$Monad$11))((unifyM_3039(te_3386))(tv_3390)))((ret($import1$instance$Monad$11))((Pair_2852(((((insert_2882($import1$instance$Hashable$13))($import1$instance$Eq$1))(pat_3387.$1))(tv_3390))(Empty_2861)))((PVar_2992((setAnnType_2962(tv_3390))(pat_3387.$0)))(pat_3387.$1))))
            })
          } else if((pat_3387.$tag==1)&&(pat_3387.$1.$tag==0)){
            var $phi$379 = (($gt$gt_2932($import1$instance$Monad$11))((unifyM_3039(te_3386))((TConst_2969(emptyAnn_2982))("Number"))))((ret($import1$instance$Monad$11))((Pair_2852(Empty_2861))(pat_3387)))
          } else if((pat_3387.$tag==1)&&(pat_3387.$1.$tag==1)){
            var $phi$379 = (($gt$gt_2932($import1$instance$Monad$11))((unifyM_3039(te_3386))((TConst_2969(emptyAnn_2982))("String"))))((ret($import1$instance$Monad$11))((Pair_2852(Empty_2861))(pat_3387)))
          } else if(pat_3387.$tag==2){
            var $phi$379 = (($gt$gt$eq($import1$instance$Monad$11))((getBindingM_3026(pat_3387.$1))(env_3385)))(function(bt_3398){
              if(bt_3398.$tag==1){
                var $phi$380 = error(($concat("unknown data type "))(pat_3387.$1))
              } else if(bt_3398.$tag==0){
                var $phi$380 = (($gt$gt$eq($import1$instance$Monad$11))(instantiate_3035(bt_3398.$0)))(function(t_3400){
                  var $phi$382 = unrollDataConType_3049(t_3400);
                  var $phi$384 = (($eq$eq($import1$instance$Eq$0))(length(pat_3387.$2)))(length($phi$382.$0));
                  if(!$phi$384){
                    var $phi$383 = errorM_3020("number of pattern params does not match the number of constructor params")
                  } else if($phi$384){
                    var $phi$383 = (($gt$gt$eq($import1$instance$Monad$11))((((foldM_2905($import1$instance$Monad$11))(inferSubPat_3368(env_3385)))((Pair_2852(Empty_2861))([])))((zip_2919(pat_3387.$2))($phi$382.$0))))(function(bps_3403){
                      var $phi$385 = (($gt$gt_2932($import1$instance$Monad$11))((unifyM_3039(te_3386))($phi$382.$1)))(($_2865(ret($import1$instance$Monad$11)))((Pair_2852(bps_3403.$0))(((PData_2990(pat_3387.$0))(pat_3387.$1))(bps_3403.$1))));
                      return $phi$385
                    })
                  } else error("pattern match fail",$phi$384);
                  var $phi$381 = $phi$383;
                  return $phi$381
                })
              } else error("pattern match fail",bt_3398);
              return $phi$380
            })
          } else error("pattern match fail",pat_3387);
          return $phi$379
        }
      }
    };
    var inferSubPat_3368 = function(env_3406){
      return function(bp_3407){
        return function(pt_3408){
          var $phi$387 = (($gt$gt$eq($import1$instance$Monad$11))(((inferPat_3367(env_3406))(pt_3408.$1))(pt_3408.$0)))(function(bp_3413){
            var $phi$388 = ($_2865(ret($import1$instance$Monad$11)))((Pair_2852((((mergeTrie_2888($import1$instance$Hashable$13))($import1$instance$Eq$1))(bp_3407.$0))(bp_3413.$0)))((push(bp_3413.$1))(bp_3407.$1)));
            return $phi$388
          });
          var $phi$386 = $phi$387;
          return $phi$386
        }
      }
    };
    var inferCase_3366 = function(env_3376){
      return function(te_3377){
        return function(p_3378){
          var $phi$389 = (($gt$gt$eq($import1$instance$Monad$11))(((inferPat_3367(env_3376))(te_3377))(p_3378.$0)))(function(cb_3381){
            var $phi$390 = (($gt$gt$eq($import1$instance$Monad$11))((infer_3044((addBindings_3029(cb_3381.$0))(env_3376)))(p_3378.$1)))(function(e_3384){
              return (ret($import1$instance$Monad$11))((Pair_2852(cb_3381.$1))(e_3384))
            });
            return $phi$390
          });
          return $phi$389
        }
      }
    };
    var setFinalType_3365 = function(t_3369){
      return function(e_3370){
        var $phi$392 = getType_2959(e_3370);
        if($phi$392.$tag==6){
          var $phi$391 = (ret($import1$instance$Monad$11))((setType_2963(t_3369))(e_3370))
        } else if($phi$392.$tag==5){
          var $phi$391 = (ret($import1$instance$Monad$11))(e_3370)
        } else var $phi$391 = (($gt$gt_2932($import1$instance$Monad$11))((unifyM_3039(t_3369))($phi$392)))((ret($import1$instance$Monad$11))(e_3370));
        return $phi$391
      }
    };
    if((e_3364.$tag==1)&&(e_3364.$1.$tag==0)){
      var $phi$393 = (setFinalType_3365((TConst_2969(emptyAnn_2982))("Number")))(e_3364)
    } else if((e_3364.$tag==1)&&(e_3364.$1.$tag==1)){
      var $phi$393 = (setFinalType_3365((TConst_2969(emptyAnn_2982))("String")))(e_3364)
    } else if(e_3364.$tag==0){
      var $phi$393 = (($gt$gt$eq($import1$instance$Monad$11))((getBindingM_3026(e_3364.$1))(env_3363)))(function(vt_3422){
        if(vt_3422.$tag==1){
          var $phi$401 = errorM_3020(($concat(($concat(($concat("unknown identifier "))(e_3364.$1)))(", env: ")))(jsonStringify(($_2865(trieKeys_2892))(getBindings_3027(env_3363)))))
        } else if(vt_3422.$tag==0){
          var $phi$401 = (($gt$gt$eq($import1$instance$Monad$11))(instantiate_3035(vt_3422.$0)))(function(t_3424){
            return (setFinalType_3365(t_3424))(e_3364)
          })
        } else error("pattern match fail",vt_3422);
        return $phi$401
      })
    } else if(e_3364.$tag==3){
      var $phi$393 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_3013))(function(tv_3428){
        return (($gt$gt$eq($import1$instance$Monad$11))((infer_3044(((addBinding_3028(e_3364.$1))(tv_3428))(env_3363)))(e_3364.$2)))(function(a_3429){
          return (setFinalType_3365(((TApp_2971(emptyAnn_2982))(((TApp_2971(emptyAnn_2982))((TConst_2969(emptyAnn_2982))("->")))(tv_3428)))(getType_2959(a_3429))))(((Lam_2938(e_3364.$0))(e_3364.$1))(a_3429))
        })
      })
    } else if(e_3364.$tag==2){
      var $phi$393 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_3013))(function(tv_3433){
        return (($gt$gt$eq($import1$instance$Monad$11))((infer_3044(env_3363))(e_3364.$1)))(function(f_3434){
          return (($gt$gt$eq($import1$instance$Monad$11))((infer_3044(env_3363))(e_3364.$2)))(function(a_3435){
            var synth_3436 = (f1_3033(getType_2959(a_3435)))(tv_3433);
            return (($gt$gt_2932($import1$instance$Monad$11))((unifyM_3039(getType_2959(f_3434)))(synth_3436)))((setFinalType_3365(tv_3433))(((App_2937(e_3364.$0))(f_3434))(a_3435)))
          })
        })
      })
    } else if(e_3364.$tag==4){
      var $phi$393 = (($gt$gt$eq($import1$instance$Monad$11))((infer_3044(env_3363))(e_3364.$1)))(function(e_3440){
        return (($gt$gt$eq($import1$instance$Monad$11))(((mapM_2906($import1$instance$Monad$11))((inferCase_3366(env_3363))(getType_2959(e_3440))))(e_3364.$2)))(function(ps_3441){
          var t_3442 = getType_2959(snd_2856(head_2912(ps_3441)));
          return (($gt$gt_2932($import1$instance$Monad$11))(((mapM_2906($import1$instance$Monad$11))(function(p_3443){
            return (unifyM_3039(t_3442))(($_2865(getType_2959))(snd_2856(p_3443)))
          }))(tail_2911(ps_3441))))((setFinalType_3365(t_3442))(((Case_2939(e_3364.$0))(e_3440))(ps_3441)))
        })
      })
    } else if(e_3364.$tag==5){
      var $phi$393 = (($gt$gt$eq($import1$instance$Monad$11))((inferDefs_3047(env_3363))(e_3364.$1)))(function(ds_3447){
        var env2_3448 = ((foldl(function(env_3449){
          return function(d_3450){
            var $phi$400 = ((addBinding_3028(d_3450.$0))(getType_2959(d_3450.$1)))(env_3449);
            return $phi$400
          }
        }))(env_3363))(ds_3447);
        return (($gt$gt$eq($import1$instance$Monad$11))((infer_3044(env2_3448))(e_3364.$2)))(function(e_3453){
          return (setFinalType_3365(getType_2959(e_3453)))(((Let_2940(e_3364.$0))(ds_3447))(e_3453))
        })
      })
    } else if((e_3364.$tag==6)&&("Array"==e_3364.$1)){
      var $phi$393 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_2906($import1$instance$Monad$11))(infer_3044(env_3363)))(e_3364.$2)))(function(es_3456){
        return (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_3013))(function(tv_3457){
          return (($gt$gt_2932($import1$instance$Monad$11))(((mapM_2906($import1$instance$Monad$11))(function(e_3458){
            return (unifyM_3039(tv_3457))(getType_2959(e_3458))
          }))(es_3456)))((setFinalType_3365(((TApp_2971(emptyAnn_2982))((TConst_2969(emptyAnn_2982))("Array")))(tv_3457)))(((New_2941(e_3364.$0))("Array"))(es_3456)))
        })
      })
    } else if(e_3364.$tag==6){
      var $phi$393 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_2906($import1$instance$Monad$11))(infer_3044(env_3363)))(e_3364.$2)))(function(es_3462){
        return (($gt$gt$eq($import1$instance$Monad$11))((getBindingM_3026(e_3364.$1))(env_3363)))(function(t_3463){
          if(t_3463.$tag==1){
            var $phi$394 = error(($concat("unknown data constructor "))(e_3364.$1))
          } else if(t_3463.$tag==0){
            var $phi$394 = (($gt$gt$eq($import1$instance$Monad$11))(instantiate_3035(t_3463.$0)))(function(t_3465){
              var $phi$396 = unrollDataConType_3049(t_3465);
              var $phi$398 = (($eq$eq($import1$instance$Eq$0))(length(es_3462)))(length($phi$396.$0));
              if(!$phi$398){
                var $phi$397 = errorM_3020(($concat(($concat(($concat("number of New args does not match the number of constructor params "))(jsonStringify(es_3462))))(" ")))(printType_2999(t_3465)))
              } else if($phi$398){
                var $phi$397 = (($gt$gt_2932($import1$instance$Monad$11))(((mapM_2906($import1$instance$Monad$11))(function(p_3468){
                  var $phi$399 = (unifyM_3039(p_3468.$0))(getType_2959(p_3468.$1));
                  return $phi$399
                }))((zip_2919($phi$396.$0))(es_3462))))((setFinalType_3365($phi$396.$1))(((New_2941(e_3364.$0))(e_3364.$1))(es_3462)))
              } else error("pattern match fail",$phi$398);
              var $phi$395 = $phi$397;
              return $phi$395
            })
          } else error("pattern match fail",t_3463);
          return $phi$394
        })
      })
    } else var $phi$393 = error("type inference not supported for this AST node");
    return ($_2865(withLocError_3043(e_3364)))($phi$393)
  }
};
var inferSccDefs_3045 = function(env_3472){
  return function(ds_3473){
    var generalizeDef_3477 = function(env_3496){
      return function(d_3497){
        var $phi$404 = getType_2959(d_3497.$1);
        if($phi$404.$tag==5){
          var $phi$403 = (ret($import1$instance$Monad$11))(d_3497)
        } else var $phi$403 = (($gt$gt$eq($import1$instance$Monad$11))((generalize_3048(env_3496))($phi$404)))(function(t_3505){
          return (ret($import1$instance$Monad$11))((Pair_2852(d_3497.$0))((setType_2963(t_3505))(d_3497.$1)))
        });
        var $phi$402 = $phi$403;
        return $phi$402
      }
    };
    var unifyDef_3476 = function(env_3487){
      return function(d_3488){
        var $phi$407 = getType_2959(d_3488.$1);
        if($phi$407.$tag==5){
          var $phi$406 = (ret($import1$instance$Monad$11))(Unit_2878)
        } else var $phi$406 = (unifyM_3039($phi$407))(($_2865(fromJust_2929))((getBinding_3025(d_3488.$0))(env_3487)));
        var $phi$405 = $phi$406;
        return $phi$405
      }
    };
    var inferDef_3475 = function(env_3482){
      return function(d_3483){
        var $phi$408 = (($gt$gt$eq($import1$instance$Monad$11))((infer_3044(env_3482))(d_3483.$1)))(function(e_3486){
          return (ret($import1$instance$Monad$11))((Pair_2852(d_3483.$0))(e_3486))
        });
        return $phi$408
      }
    };
    var generateTVar_3474 = function(env_3478){
      return function(d_3479){
        var $phi$410 = getType_2959(snd_2856(d_3479));
        if($phi$410.$tag==6){
          var $phi$409 = (($gt$gt$eq($import1$instance$Monad$11))(newTVarM_3013))(function(tv_3480){
            return (ret($import1$instance$Monad$11))(((addBinding_3028(fst_2866(d_3479)))(tv_3480))(env_3478))
          })
        } else var $phi$409 = (ret($import1$instance$Monad$11))(((addBinding_3028(fst_2866(d_3479)))($phi$410))(env_3478));
        return $phi$409
      }
    };
    return (($gt$gt$eq($import1$instance$Monad$11))((((foldM_2905($import1$instance$Monad$11))(generateTVar_3474))(env_3472))(ds_3473)))(function(env2_3506){
      return (($gt$gt$eq($import1$instance$Monad$11))(((mapM_2906($import1$instance$Monad$11))(inferDef_3475(env2_3506)))(ds_3473)))(function(ds2_3507){
        return (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_2932($import1$instance$Monad$11))(((mapM_2906($import1$instance$Monad$11))(unifyDef_3476(env2_3506)))(ds2_3507)))(((mapM_2906($import1$instance$Monad$11))(applySubsDef_3050))(ds2_3507))))(function(ds3_3508){
          return (($gt$gt_2932($import1$instance$Monad$11))(dropSatisfiedBounds_3046(env_3472)))(((mapM_2906($import1$instance$Monad$11))(generalizeDef_3477(env_3472)))(ds3_3508))
        })
      })
    })
  }
};
var inferDefs_3047 = function(env_3516){
  return function(ds_3517){
    var infer_3521 = function(rs_3527){
      return function(cc_3528){
        return ((fmap($import1$instance$Functor$9))(concat(rs_3527)))((inferSccDefs_3045(((foldl(function(env_3529){
          return function(r_3530){
            return ((addBinding_3028(fst_2866(r_3530)))(getType_2959(snd_2856(r_3530))))(env_3529)
          }
        }))(env_3516))(rs_3527)))((filter(function(d_3531){
          return ((contains_2926($import1$instance$Eq$1))(fst_2866(d_3531)))(cc_3528)
        }))(ds_3517)))
      }
    };
    var ns_3518 = (map(fst_2866))(ds_3517);
    var g_3519 = ((foldl(function(g_3522){
      return function(d_3523){
        var $phi$411 = ((set(d_3523.$0))((filter(function(v_3526){
          return ($and(((contains_2926($import1$instance$Eq$1))(v_3526))(ns_3518)))((($div$eq_2880($import1$instance$Eq$1))(v_3526))(d_3523.$0))
        }))(freeVars_3052(d_3523.$1))))(g_3522);
        return $phi$411
      }
    }))(empty))(ds_3517);
    var ccs_3520 = sccSorted_3002(g_3519);
    return (((foldM_2905($import1$instance$Monad$11))(infer_3521))([]))(ccs_3520)
  }
};
var newCtx_3014 = (((ICtx_3004(emptySubs_3007))([]))(1))(function(s_3139){
  return ($concat("unknown error context: "))(s_3139)
});
var inferInstance_3053 = function(env_3626){
  return function(cs_3627){
    return function(i_3628){
      var inferE_3629 = function(e_3630){
        var $phi$413 = ($_2865(runState_2901(newCtx_3014)))((infer_3044(env_3626))(e_3630));
        var $phi$412 = (applySubsE_3051(getSubs_3015($phi$413.$0)))($phi$413.$1);
        return $phi$412
      };
      var $phi$417 = (find_2870(function(c_3637){
        var $phi$416 = (($eq$eq($import1$instance$Eq$1))(i_3628.$1))(c_3637.$1);
        return $phi$416
      }))(cs_3627);
      if($phi$417.$tag==1){
        var $phi$415 = error(($concat("Cannot find clas "))(i_3628.$1))
      } else if($phi$417.$tag==0){
        var bs2_3646 = ((foldl(function(bs_3648){
          return function(b_3649){
            var $phi$418 = ((((insert_2882($import1$instance$Hashable$13))($import1$instance$Eq$1))(b_3649.$0))(((substitute_3036($phi$417.$0.$2))(i_3628.$2))(b_3649.$1)))(bs_3648);
            return $phi$418
          }
        }))(Empty_2861))($phi$417.$0.$3);
        var ds2_3647 = (map(function(d_3652){
          var $phi$419 = (Pair_2852(d_3652.$0))(inferE_3629((setType_2963(($_2865(fromJust_2929))((((lookup_2874($import1$instance$Hashable$13))($import1$instance$Eq$1))(d_3652.$0))(bs2_3646))))(d_3652.$1)));
          return $phi$419
        }))(i_3628.$3);
        var $phi$415 = (((Instance_2986(i_3628.$0))(i_3628.$1))(i_3628.$2))(ds2_3647)
      } else error("pattern match fail",$phi$417);
      var $phi$414 = $phi$415;
      return $phi$414
    }
  }
};
var emptyEnv_3024 = ((IEnv_3005(Empty_2861))([]))(emptySet_2877);
var classToBindings_3055 = function(c_3660){
  var process_3665 = function(b_3666){
    var ftv_3669 = freeTVars_3041(b_3666.$1);
    var $phi$423 = (((setContains_2875($import1$instance$Hashable$13))($import1$instance$Eq$1))(c_3660.$2))(ftv_3669);
    if(!$phi$423){
      var $phi$422 = error(($concat(($concat(($concat("invalid clas definition "))(c_3660.$1)))(", binding ")))(b_3666.$0))
    } else if($phi$423){
      var $phi$422 = (Pair_2852(b_3666.$0))((((mkTForall_3034(emptyAnn_2982))(setToArray_2887(ftv_3669)))([((TCBound_2968(emptyAnn_2982))(c_3660.$1))((TVar_2970(emptyAnn_2982))(c_3660.$2))]))(b_3666.$1))
    } else error("pattern match fail",$phi$423);
    var $phi$421 = $phi$422;
    return $phi$421
  };
  var $phi$420 = (map(process_3665))(c_3660.$3);
  return $phi$420
};
var addInstance_3031 = function(b_3220){
  return function(env_3221){
    var $phi$424 = ((IEnv_3005(env_3221.$0))((push(b_3220))(env_3221.$1)))(env_3221.$2);
    return $phi$424
  }
};
var inferTypeModule_3056 = function(ms_3670){
  return function(m_3671){
    var checkForUnsatisfiedBounds_3676 = function(d_3704){
      var $phi$426 = getType_2959(snd_2856(d_3704));
      if($phi$426.$tag==5){
        if(($phi$426.$3.$tag==2)&&(($phi$426.$3.$1.$tag==2)&&(($phi$426.$3.$1.$1.$tag==0)&&("->"==$phi$426.$3.$1.$1.$1)))){
          var $phi$427 = d_3704
        } else {
          var $phi$429 = length($phi$426.$2);
          if(0==$phi$429){
            var $phi$428 = d_3704
          } else var $phi$428 = error(($concat(($concat(($concat("unsatisfied bounds in def of "))(fst_2866(d_3704))))(" :: ")))(printType_2999(getType_2959(snd_2856(d_3704)))));
          var $phi$427 = $phi$428
        };
        var $phi$425 = $phi$427
      } else var $phi$425 = d_3704;
      return $phi$425
    };
    var addIns_3675 = function(env_3702){
      return function(i_3703){
        return (addInstance_3031(instanceToTypeBound_3054(i_3703)))(env_3702)
      }
    };
    var getFile_3672 = function(i_3677){
      if(i_3677.$tag==1){
        var $phi$430 = i_3677.$1
      } else error("pattern match fail",i_3677);
      return $phi$430
    };
    var addClass_3674 = function(env_3698){
      return function(c_3699){
        return ((foldl(function(env_3700){
          return function(b_3701){
            return ((addBinding_3028(fst_2866(b_3701)))(snd_2856(b_3701)))(env_3700)
          }
        }))(env_3698))(classToBindings_3055(c_3699))
      }
    };
    var addImports_3673 = function(env_3681){
      return function(i_3682){
        var $phi$432 = (get(getFile_3672(i_3682)))(ms_3670);
        if(i_3682.$tag==1){
          var $phi$433 = ((foldl(function(env_3692){
            return function(n_3693){
              var $phi$434 = ((addBinding_3028(n_3693.$1))((get(n_3693.$0))($phi$432.$0)))(env_3692);
              return $phi$434
            }
          }))(env_3681))(i_3682.$2)
        } else error("pattern match fail",i_3682);
        var env2_3686 = $phi$433;
        var env3_3687 = ((foldl(addClass_3674))(env2_3686))($phi$432.$1);
        var env4_3688 = ((foldl(function(env_3696){
          return function(i_3697){
            return (addInstance_3031(i_3697))(env_3696)
          }
        }))(env3_3687))($phi$432.$2);
        var $phi$431 = env4_3688;
        return $phi$431
      }
    };
    var env_3724 = emptyEnv_3024;
    var env2_3725 = ((foldl(addImports_3673))(env_3724))(m_3671.$2);
    var env3_3726 = ((foldl(addClass_3674))(env2_3725))(m_3671.$4);
    var env4_3727 = ((foldl(addIns_3675))(env3_3726))(m_3671.$5);
    var ds2_3728 = (evalState_2902(newCtx_3014))((inferDefs_3047(env4_3727))(m_3671.$6));
    var ds3_3729 = (map(checkForUnsatisfiedBounds_3676))(ds2_3728);
    var env5_3730 = ((foldl(function(env_3732){
      return function(d_3733){
        var $phi$436 = ((addBinding_3028(d_3733.$0))(getType_2959(d_3733.$1)))(env_3732);
        return $phi$436
      }
    }))(env4_3727))(ds3_3729);
    var ins2_3731 = (map((inferInstance_3053(env5_3730))((concat(m_3671.$4))((concatMap_2918(function(i_3736){
      var $phi$438 = (get(getFile_3672(i_3736)))(ms_3670);
      var $phi$437 = $phi$438.$1;
      return $phi$437
    }))(m_3671.$2)))))(m_3671.$5);
    var $phi$435 = ((((((Module_2989(m_3671.$0))(m_3671.$1))(m_3671.$2))(m_3671.$3))(m_3671.$4))(ins2_3731))(ds3_3729);
    return $phi$435
  }
};
var Pair_3779 = Pair_3;
var mapSnd_3780 = mapSnd_84;
var mapFst_3781 = mapFst_83;
var $gt$eq$gt_3782 = $gt$eq$gt_82;
var snd_3783 = snd_23;
var debug2_3784 = debug2_81;
var Just_3785 = Just_1;
var Nothing_3786 = Nothing_2;
var isJust_3787 = isJust_21;
var Empty_3788 = Empty_7;
var Leaf_3789 = Leaf_8;
var Collision_3790 = Collision_9;
var BitmapIndexed_3791 = BitmapIndexed_10;
var $_3792 = $_12;
var fst_3793 = fst_22;
var Left_3794 = Left_4;
var Right_3795 = Right_5;
var loop_3796 = loop_27;
var find_3797 = find_29;
var hamtMask_3798 = hamtMask_58;
var popCount_3799 = popCount_57;
var hamtIndex_3800 = hamtIndex_59;
var lookup_3801 = lookup_60;
var setContains_3802 = setContains_76;
var foldTrie_3803 = foldTrie_66;
var emptySet_3804 = emptySet_72;
var Unit_3805 = Unit_0;
var not_3806 = not_26;
var $div$eq_3807 = $div$eq_13;
var mapIx_3808 = mapIx_30;
var insert_3809 = insert_61;
var setAdd_3810 = setAdd_73;
var setIntersection_3811 = setIntersection_80;
var remove_3812 = remove_63;
var setDiff_3813 = setDiff_79;
var setToArray_3814 = setToArray_78;
var mergeTrie_3815 = mergeTrie_70;
var setUnion_3816 = setUnion_77;
var setRemove_3817 = setRemove_75;
var setAddAll_3818 = setAddAll_74;
var trieKeys_3819 = trieKeys_71;
var size_3820 = size_68;
var mapTrie_3821 = mapTrie_67;
var nodeMask_3822 = nodeMask_56;
var isEmpty_3823 = isEmpty_69;
var filterTrie_3824 = filterTrie_65;
var nextSetBitMask_3825 = nextSetBitMask_64;
var updateOrSet_3826 = updateOrSet_62;
var State_3827 = State_6;
var runState_3828 = runState_54;
var evalState_3829 = evalState_55;
var sets_3830 = sets_53;
var gets_3831 = gets_52;
var foldM_3832 = foldM_49;
var mapM_3833 = mapM_50;
var forM_3834 = forM_51;
var strToArray_3835 = strToArray_48;
var toRecord_3836 = toRecord_47;
var reverse_3837 = reverse_46;
var tail_3838 = tail_41;
var head_3839 = head_40;
var uniq_3840 = uniq_45;
var mergeSet_3841 = mergeSet_44;
var init_3842 = init_43;
var last_3843 = last_42;
var mapJust_3844 = mapJust_39;
var concatMap_3845 = concatMap_38;
var zip_3846 = zip_37;
var zipWithIndex2_3847 = zipWithIndex2_35;
var zipWithIndex_3848 = zipWithIndex_36;
var join_3849 = join_34;
var all_3850 = all_33;
var exists_3851 = exists_32;
var containsChar_3852 = containsChar_31;
var contains_3853 = contains_28;
var either_3854 = either_24;
var splitEither_3855 = splitEither_25;
var fromJust_3856 = fromJust_20;
var justOr_3857 = justOr_19;
var maybe_3858 = maybe_18;
var $gt$gt_3859 = $gt$gt_17;
var $gt$eq_3860 = $gt$eq_16;
var $lt$eq_3861 = $lt$eq_15;
var $gt_3862 = $gt_14;
var Identity_3863 = Identity_11;
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
var App_3864 = App_726;
var Lam_3865 = Lam_727;
var Case_3866 = Case_728;
var Let_3867 = Let_729;
var New_3868 = New_730;
var breakableDownAndUpM_3869 = breakableDownAndUpM_775;
var breakableDownM_3870 = breakableDownM_779;
var downAndUpM_3871 = downAndUpM_776;
var downM_3872 = downM_778;
var upM_3873 = upM_777;
var breakableDownAndUp_3874 = breakableDownAndUp_770;
var breakableDown_3875 = breakableDown_774;
var downAndUp_3876 = downAndUp_771;
var down_3877 = down_773;
var up_3878 = up_772;
var AnnType_3879 = AnnType_718;
var TUnknown_3880 = TUnknown_749;
var getAnn_3881 = getAnn_754;
var getAnnType_3882 = getAnnType_757;
var Var_3883 = Var_724;
var Const_3884 = Const_725;
var annOf_3885 = annOf_767;
var getType_3886 = getType_769;
var withAnn_3887 = withAnn_768;
var setAnn_3888 = setAnn_755;
var setAnnType_3889 = setAnnType_758;
var setType_3890 = setType_766;
var Data_3891 = Data_738;
var DataCon_3892 = DataCon_739;
var dataConName_3893 = dataConName_764;
var dataConNames_3894 = dataConNames_765;
var TCBound_3895 = TCBound_742;
var TConst_3896 = TConst_743;
var TVar_3897 = TVar_744;
var TApp_3898 = TApp_745;
var TRow_3899 = TRow_746;
var TBot_3900 = TBot_747;
var TForall_3901 = TForall_748;
var equivBound_3902 = equivBound_762;
var equivType_3903 = equivType_763;
var AnnCodeLoc_3904 = AnnCodeLoc_719;
var printCodeLoc_3905 = printCodeLoc_761;
var setAnnCodeLoc_3906 = setAnnCodeLoc_760;
var getAnnCodeLoc_3907 = getAnnCodeLoc_759;
var copyAnn_3908 = copyAnn_756;
var emptyAnn_3909 = emptyAnn_753;
var ImportAll_3910 = ImportAll_752;
var ImportOpen_3911 = ImportOpen_751;
var ImportClosed_3912 = ImportClosed_750;
var Instance_3913 = Instance_741;
var Class_3914 = Class_740;
var ModuleInterface_3915 = ModuleInterface_737;
var Module_3916 = Module_736;
var PData_3917 = PData_735;
var PConst_3918 = PConst_734;
var PVar_3919 = PVar_733;
var CStr_3920 = CStr_732;
var CNum_3921 = CNum_731;
var AnnExport_3922 = AnnExport_723;
var AnnTag_3923 = AnnTag_722;
var AnnData_3924 = AnnData_721;
var AnnUseCount_3925 = AnnUseCount_720;
var freeVars_3926 = freeVars_3052;
var normalize_3928 = function(ms_3957){
  return function(freeVars_3958){
    return function(i_3959){
      if(i_3959.$tag==0){
        var $phi$439 = error("closed imports not supported")
      } else if(i_3959.$tag==1){
        var $phi$439 = i_3959
      } else if((i_3959.$tag==2)&&("./builtins.js"==i_3959.$1)){
        var $phi$445 = (get("./builtins.js"))(ms_3957);
        var $phi$444 = ((ImportOpen_3911(i_3959.$0))("./builtins.js"))((map(function(n_3970){
          return (Pair_3779(n_3970))(n_3970)
        }))(keys($phi$445.$0)));
        var $phi$439 = $phi$444
      } else if(i_3959.$tag==2){
        var $phi$441 = (has(i_3959.$1))(ms_3957);
        if($phi$441){
          var $phi$443 = (get(i_3959.$1))(ms_3957);
          var $phi$442 = ((ImportOpen_3911(i_3959.$0))(i_3959.$1))((map(function(n_3976){
            return (Pair_3779(n_3976))(n_3976)
          }))(keys($phi$443.$0)));
          var $phi$440 = $phi$442
        } else if(!$phi$441){
          var $phi$440 = error(($concat(($concat(($concat("no mod "))(i_3959.$1)))(" in ")))(jsonStringify(keys(ms_3957))))
        } else error("pattern match fail",$phi$441);
        var $phi$439 = $phi$440
      } else error("pattern match fail",i_3959);
      return $phi$439
    }
  }
};
var normalizeImports_3927 = function(ms_3929){
  return function(m_3930){
    var getFromDefs_3938 = function(ds_3944){
      return ((foldl((mergeSet_3841($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(function(v_3945){
        return freeVars_3926(snd_3783(v_3945))
      }))(ds_3944))
    };
    var freeVarsInDefs_3939 = getFromDefs_3938(m_3930.$6);
    var freeVarsInIns_3940 = ((foldl((mergeSet_3841($import1$instance$Ord$3))($import1$instance$Eq$1)))([]))((map(function(i_3946){
      var $phi$447 = getFromDefs_3938(i_3946.$3);
      return $phi$447
    }))(m_3930.$5));
    var topLevelNames_3941 = (concat((map(fst_3793))(m_3930.$6)))((concatMap_3845(function(i_3951){
      var $phi$448 = (map(fst_3793))(i_3951.$3);
      return $phi$448
    }))(m_3930.$5));
    var fvs_3942 = (filter(function(v_3956){
      return not_3806(((contains_3853($import1$instance$Eq$1))(v_3956))(topLevelNames_3941))
    }))((((mergeSet_3841($import1$instance$Ord$3))($import1$instance$Eq$1))(freeVarsInDefs_3939))(freeVarsInIns_3940));
    var is2_3943 = (map((normalize_3928(ms_3929))(fvs_3942)))((enqueue((ImportAll_3910(emptyAnn_3909))("./builtins.js")))(m_3930.$2));
    var $phi$446 = ((((((Module_3916(m_3930.$0))(m_3930.$1))(is2_3943))(m_3930.$3))(m_3930.$4))(m_3930.$5))(m_3930.$6);
    return $phi$446
  }
};
var Pair_3977 = Pair_3;
var mapSnd_3978 = mapSnd_84;
var mapFst_3979 = mapFst_83;
var $gt$eq$gt_3980 = $gt$eq$gt_82;
var snd_3981 = snd_23;
var debug2_3982 = debug2_81;
var Just_3983 = Just_1;
var Nothing_3984 = Nothing_2;
var isJust_3985 = isJust_21;
var Empty_3986 = Empty_7;
var Leaf_3987 = Leaf_8;
var Collision_3988 = Collision_9;
var BitmapIndexed_3989 = BitmapIndexed_10;
var $_3990 = $_12;
var fst_3991 = fst_22;
var Left_3992 = Left_4;
var Right_3993 = Right_5;
var loop_3994 = loop_27;
var find_3995 = find_29;
var hamtMask_3996 = hamtMask_58;
var popCount_3997 = popCount_57;
var hamtIndex_3998 = hamtIndex_59;
var lookup_3999 = lookup_60;
var setContains_4000 = setContains_76;
var foldTrie_4001 = foldTrie_66;
var emptySet_4002 = emptySet_72;
var Unit_4003 = Unit_0;
var not_4004 = not_26;
var $div$eq_4005 = $div$eq_13;
var mapIx_4006 = mapIx_30;
var insert_4007 = insert_61;
var setAdd_4008 = setAdd_73;
var setIntersection_4009 = setIntersection_80;
var remove_4010 = remove_63;
var setDiff_4011 = setDiff_79;
var setToArray_4012 = setToArray_78;
var mergeTrie_4013 = mergeTrie_70;
var setUnion_4014 = setUnion_77;
var setRemove_4015 = setRemove_75;
var setAddAll_4016 = setAddAll_74;
var trieKeys_4017 = trieKeys_71;
var size_4018 = size_68;
var mapTrie_4019 = mapTrie_67;
var nodeMask_4020 = nodeMask_56;
var isEmpty_4021 = isEmpty_69;
var filterTrie_4022 = filterTrie_65;
var nextSetBitMask_4023 = nextSetBitMask_64;
var updateOrSet_4024 = updateOrSet_62;
var State_4025 = State_6;
var runState_4026 = runState_54;
var evalState_4027 = evalState_55;
var sets_4028 = sets_53;
var gets_4029 = gets_52;
var foldM_4030 = foldM_49;
var mapM_4031 = mapM_50;
var forM_4032 = forM_51;
var strToArray_4033 = strToArray_48;
var toRecord_4034 = toRecord_47;
var reverse_4035 = reverse_46;
var tail_4036 = tail_41;
var head_4037 = head_40;
var uniq_4038 = uniq_45;
var mergeSet_4039 = mergeSet_44;
var init_4040 = init_43;
var last_4041 = last_42;
var mapJust_4042 = mapJust_39;
var concatMap_4043 = concatMap_38;
var zip_4044 = zip_37;
var zipWithIndex2_4045 = zipWithIndex2_35;
var zipWithIndex_4046 = zipWithIndex_36;
var join_4047 = join_34;
var all_4048 = all_33;
var exists_4049 = exists_32;
var containsChar_4050 = containsChar_31;
var contains_4051 = contains_28;
var either_4052 = either_24;
var splitEither_4053 = splitEither_25;
var fromJust_4054 = fromJust_20;
var justOr_4055 = justOr_19;
var maybe_4056 = maybe_18;
var $gt$gt_4057 = $gt$gt_17;
var $gt$eq_4058 = $gt$eq_16;
var $lt$eq_4059 = $lt$eq_15;
var $gt_4060 = $gt_14;
var Identity_4061 = Identity_11;
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
var App_4062 = App_726;
var Lam_4063 = Lam_727;
var Case_4064 = Case_728;
var Let_4065 = Let_729;
var New_4066 = New_730;
var breakableDownAndUpM_4067 = breakableDownAndUpM_775;
var breakableDownM_4068 = breakableDownM_779;
var downAndUpM_4069 = downAndUpM_776;
var downM_4070 = downM_778;
var upM_4071 = upM_777;
var breakableDownAndUp_4072 = breakableDownAndUp_770;
var breakableDown_4073 = breakableDown_774;
var downAndUp_4074 = downAndUp_771;
var down_4075 = down_773;
var up_4076 = up_772;
var AnnType_4077 = AnnType_718;
var TUnknown_4078 = TUnknown_749;
var getAnn_4079 = getAnn_754;
var getAnnType_4080 = getAnnType_757;
var Var_4081 = Var_724;
var Const_4082 = Const_725;
var annOf_4083 = annOf_767;
var getType_4084 = getType_769;
var withAnn_4085 = withAnn_768;
var setAnn_4086 = setAnn_755;
var setAnnType_4087 = setAnnType_758;
var setType_4088 = setType_766;
var Data_4089 = Data_738;
var DataCon_4090 = DataCon_739;
var dataConName_4091 = dataConName_764;
var dataConNames_4092 = dataConNames_765;
var TCBound_4093 = TCBound_742;
var TConst_4094 = TConst_743;
var TVar_4095 = TVar_744;
var TApp_4096 = TApp_745;
var TRow_4097 = TRow_746;
var TBot_4098 = TBot_747;
var TForall_4099 = TForall_748;
var equivBound_4100 = equivBound_762;
var equivType_4101 = equivType_763;
var AnnCodeLoc_4102 = AnnCodeLoc_719;
var printCodeLoc_4103 = printCodeLoc_761;
var setAnnCodeLoc_4104 = setAnnCodeLoc_760;
var getAnnCodeLoc_4105 = getAnnCodeLoc_759;
var copyAnn_4106 = copyAnn_756;
var emptyAnn_4107 = emptyAnn_753;
var ImportAll_4108 = ImportAll_752;
var ImportOpen_4109 = ImportOpen_751;
var ImportClosed_4110 = ImportClosed_750;
var Instance_4111 = Instance_741;
var Class_4112 = Class_740;
var ModuleInterface_4113 = ModuleInterface_737;
var Module_4114 = Module_736;
var PData_4115 = PData_735;
var PConst_4116 = PConst_734;
var PVar_4117 = PVar_733;
var CStr_4118 = CStr_732;
var CNum_4119 = CNum_731;
var AnnExport_4120 = AnnExport_723;
var AnnTag_4121 = AnnTag_722;
var AnnData_4122 = AnnData_721;
var AnnUseCount_4123 = AnnUseCount_720;
var f1_4124 = f1_3033;
var classToBindings_4125 = classToBindings_3055;
var unify_4126 = unify_3040;
var applySubs_4127 = applySubs_3037;
var applySubsBound_4128 = applySubsBound_3038;
var instanceToTypeBound_4129 = instanceToTypeBound_3054;
var satisfiesBound_4130 = satisfiesBound_3059;
var emptySubs_4131 = emptySubs_3007;
var addSub_4132 = addSub_3009;
var printType_4133 = printType_2131;
var printTypeBound_4134 = printTypeBound_2132;
var reallyPrintExpr_4135 = reallyPrintExpr_2136;
var mkConFun_4136 = mkConFun_1677;
var S_4137 = function($_0_4157){
  return function($_1_4158){
    return function($_2_4159){
      return {$0:$_0_4157,$1:$_1_4158,$2:$_2_4159}
    }
  }
};
var setEnv_4145 = function(env_4260){
  return function(s_4261){
    var $phi$449 = ((S_4137(env_4260))(s_4261.$1))(s_4261.$2);
    return $phi$449
  }
};
var instanceNameFromBound_4154 = function(ix_4501){
  return function(b_4502){
    var $phi$450 = ($concat(($concat(($concat("local$instance$"))(b_4502.$1)))("$")))(intToString(ix_4501));
    return $phi$450
  }
};
var getEnv_4144 = function(s_4256){
  var $phi$451 = s_4256.$0;
  return $phi$451
};
var breakableDownAndUpWithEnv_4149 = function(getEnv_4366){
  return function(setEnv_4367){
    return function(down_4368){
      return function(up_4369){
        return function(a_4370){
          return function(e_4371){
            var exitScope_4374 = function(a_4385){
              return (setEnv_4367(tail_4036(getEnv_4366(a_4385))))(a_4385)
            };
            var processUp_4377 = function(a_4434){
              return function(e_4435){
                if(e_4435.$tag==3){
                  var $phi$452 = exitScope_4374(a_4434)
                } else if(e_4435.$tag==5){
                  var $phi$452 = exitScope_4374(a_4434)
                } else var $phi$452 = a_4434;
                var a2_4436 = $phi$452;
                return (up_4369(a2_4436))(e_4435)
              }
            };
            var patBindings_4378 = function(p_4444){
              if(p_4444.$tag==1){
                var $phi$453 = empty
              } else if(p_4444.$tag==0){
                var $phi$453 = ((set(p_4444.$1))(getAnnType_4080(p_4444.$0)))(empty)
              } else if(p_4444.$tag==2){
                var $phi$453 = ((foldr(function(env_4452){
                  return function(p_4453){
                    return (merge(patBindings_4378(p_4453)))(env_4452)
                  }
                }))(empty))(p_4444.$2)
              } else error("pattern match fail",p_4444);
              return $phi$453
            };
            var enterScope_4373 = function(bs_4381){
              return function(a_4382){
                var es_4383 = getEnv_4366(a_4382);
                var e_4384 = (merge(head_4037(es_4383)))(bs_4381);
                return (setEnv_4367((enqueue(e_4384))(es_4383)))(a_4382)
              }
            };
            var go_4372 = function(a_4379){
              return function(e_4380){
                return (((breakableDownAndUp_4072(processDown_4375))(processUp_4377))(a_4379))(e_4380)
              }
            };
            var processDown_4375 = function(a_4386){
              return function(e_4387){
                var $phi$455 = (down_4368(a_4386))(e_4387);
                if($phi$455.$tag==1){
                  var $phi$454 = Right_3993($phi$455.$0)
                } else if($phi$455.$tag==0){
                  if($phi$455.$0.$1.$tag==3){
                    var $phi$463 = getType_4084($phi$455.$0.$1);
                    if(($phi$463.$tag==2)&&(($phi$463.$1.$tag==2)&&(($phi$463.$1.$1.$tag==0)&&("->"==$phi$463.$1.$1.$1)))){
                      var $phi$462 = $phi$463.$1.$2
                    } else if(($phi$463.$tag==5)&&(($phi$463.$3.$tag==2)&&(($phi$463.$3.$1.$tag==2)&&(($phi$463.$3.$1.$1.$tag==0)&&("->"==$phi$463.$3.$1.$1.$1))))){
                      var $phi$462 = $phi$463.$3.$1.$2
                    } else var $phi$462 = TUnknown_4078;
                    var t_4394 = $phi$462;
                    var $phi$456 = Left_3992((Pair_3977((enterScope_4373(((set($phi$455.$0.$1.$1))(t_4394))(empty)))($phi$455.$0.$0)))($phi$455.$0.$1))
                  } else if($phi$455.$0.$1.$tag==5){
                    var ts_4412 = ((foldl(function(ts_4413){
                      return function(b_4414){
                        var $phi$461 = ((set(b_4414.$0))(getType_4084(b_4414.$1)))(ts_4413);
                        return $phi$461
                      }
                    }))(empty))($phi$455.$0.$1.$1);
                    var $phi$456 = Left_3992((Pair_3977((enterScope_4373(ts_4412))($phi$455.$0.$0)))($phi$455.$0.$1))
                  } else if($phi$455.$0.$1.$tag==4){
                    var $phi$458 = (go_4372($phi$455.$0.$0))($phi$455.$0.$1.$1);
                    var $phi$460 = ((foldl(processPat_4376))((Pair_3977($phi$458.$0))([])))($phi$455.$0.$1.$2);
                    var $phi$459 = Right_3993((Pair_3977($phi$460.$0))(((Case_4064($phi$455.$0.$1.$0))($phi$458.$1))($phi$460.$1)));
                    var $phi$457 = $phi$459;
                    var $phi$456 = $phi$457
                  } else var $phi$456 = Left_3992((Pair_3977($phi$455.$0.$0))($phi$455.$0.$1));
                  var $phi$454 = $phi$456
                } else error("pattern match fail",$phi$455);
                return $phi$454
              }
            };
            var processPat_4376 = function(ar_4425){
              return function(pat_4426){
                var bs_4431 = patBindings_4378(pat_4426.$0);
                var $phi$467 = (go_4372((enterScope_4373(bs_4431))(ar_4425.$0)))(pat_4426.$1);
                var $phi$466 = (Pair_3977(exitScope_4374($phi$467.$0)))((push((Pair_3977(pat_4426.$0))($phi$467.$1)))(ar_4425.$1));
                var $phi$465 = $phi$466;
                var $phi$464 = $phi$465;
                return $phi$464
              }
            };
            return (go_4372(a_4370))(e_4371)
          }
        }
      }
    }
  }
};
var addPrefix_4148 = function(p_4354){
  return function(t_4355){
    if(t_4355.$tag==5){
      var subs_4360 = ((foldl(function(subs_4361){
        return function(v_4362){
          return (((addSub_4132(function(s_4363){
            return ($concat("declasser: "))(s_4363)
          }))(v_4362))((TVar_4095(emptyAnn_4107))(($concat(p_4354))(v_4362))))(subs_4361)
        }
      }))(emptySubs_4131))(t_4355.$1);
      var $phi$468 = (applySubs_4127(subs_4360))((((TForall_4099(t_4355.$0))((map(function(v_4364){
        return ($concat(p_4354))(v_4364)
      }))(t_4355.$1)))(t_4355.$2))(t_4355.$3))
    } else var $phi$468 = t_4355;
    return $phi$468
  }
};
var rewriteExpr_4147 = function(is_4269){
  return function(env_4270){
    return function(e_4271){
      var fromEnv_4272 = function(n_4280){
        return function(envs_4281){
          var env_4282 = head_4037(envs_4281);
          var $phi$470 = (has(n_4280))(env_4282);
          if(!$phi$470){
            var $phi$469 = error(($concat(($concat(($concat("no "))(n_4280)))(" in env ")))(jsonStringify(keys(env_4282))))
          } else if($phi$470){
            var $phi$469 = (get(n_4280))(env_4282)
          } else error("pattern match fail",$phi$470);
          return $phi$469
        }
      };
      var dropInstance_4273 = function(v_4283){
        return function(a_4284){
          var $phi$471 = ((S_4137(a_4284.$0))((filter(function(p_4288){
            return (($div$eq_4005($import1$instance$Eq$1))(fst_3991(p_4288)))(v_4283)
          }))(a_4284.$1)))(a_4284.$2);
          return $phi$471
        }
      };
      var findMatching_4275 = function(b_4295){
        return function(a_4296){
          var $phi$475 = (find_3995(function(p_4300){
            var $phi$474 = (satisfiesBound_4130(p_4300.$1))(b_4295);
            return $phi$474
          }))(a_4296.$1);
          if($phi$475.$tag==0){
            var $phi$473 = $phi$475.$0.$0
          } else var $phi$473 = error(($concat("declasser failed to find satisfying instance for "))(printTypeBound_4134(b_4295)));
          var $phi$472 = $phi$473;
          return $phi$472
        }
      };
      var requiredInstances_4276 = function(tv_4306){
        return function(td_4307){
          var $phi$477 = (addPrefix_4148("ins$"))(td_4307);
          if($phi$477.$tag==5){
            var subs_4312 = ((unify_4126(function(s_4313){
              return ($concat("declasser: "))(s_4313)
            }))(tv_4306))($phi$477.$3);
            var $phi$476 = (map(applySubsBound_4128(subs_4312)))($phi$477.$2)
          } else var $phi$476 = [];
          return $phi$476
        }
      };
      var rewriteVar_4279 = function(a_4332){
        return function(e_4333){
          if(e_4333.$tag==0){
            var $phi$480 = getType_4084(e_4333);
            if($phi$480.$tag==5){
              var $phi$479 = (Pair_3977(a_4332))(e_4333)
            } else {
              var t_4341 = (fromEnv_4272(e_4333.$1))(getEnv_4144(a_4332));
              var is_4342 = (requiredInstances_4276($phi$480))(t_4341);
              var mis_4343 = (map(function(b_4345){
                return (findMatching_4275(b_4345))(a_4332)
              }))(is_4342);
              var e2_4344 = ((foldl(function(e_4346){
                return function(v_4347){
                  return ((App_4062(emptyAnn_4107))(e_4346))((Var_4081(emptyAnn_4107))(v_4347))
                }
              }))(e_4333))(mis_4343);
              var $phi$479 = (Pair_3977(a_4332))(e2_4344)
            };
            var $phi$478 = $phi$479
          } else if(e_4333.$tag==3){
            var $phi$478 = (Pair_3977((dropInstance_4273(e_4333.$1))(a_4332)))(e_4333)
          } else var $phi$478 = (Pair_3977(a_4332))(e_4333);
          return $phi$478
        }
      };
      var addInstance_4274 = function(b_4289){
        return function(a_4290){
          var name_4294 = (instanceNameFromBound_4154(a_4290.$2))(b_4289);
          var $phi$481 = (Pair_3977(((S_4137(a_4290.$0))((push((Pair_3977(name_4294))(b_4289)))(a_4290.$1)))(a_4290.$2+1)))(name_4294);
          return $phi$481
        }
      };
      var rewriteBound_4278 = function(ae_4324){
        return function(ib_4325){
          var $phi$485 = (addInstance_4274(ib_4325.$1))(ae_4324.$0);
          var $phi$484 = (Pair_3977($phi$485.$0))(((Lam_4063(emptyAnn_4107))($phi$485.$1))(ae_4324.$1));
          var $phi$483 = $phi$484;
          var $phi$482 = $phi$483;
          return $phi$482
        }
      };
      var rewriteBounds_4277 = function(a_4315){
        return function(e_4316){
          var $phi$487 = getType_4084(e_4316);
          if($phi$487.$tag==5){
            var $phi$489 = (($gt_4060($import1$instance$Ord$2))(length($phi$487.$2)))(0);
            if(!$phi$489){
              var $phi$488 = (Pair_3977(a_4315))(e_4316)
            } else if($phi$489){
              var rewritten_4321 = ((foldr(rewriteBound_4278))((Pair_3977(a_4315))((setType_4088($phi$487.$3))(e_4316))))(zipWithIndex_4046($phi$487.$2));
              var $phi$488 = (mapSnd_3978(function(re_4322){
                return (withAnn_4085((((copyAnn_4106($import1$instance$Hashable$13))($import1$instance$Eq$1))(["export"]))(annOf_4083(e_4316))))(re_4322)
              }))(rewritten_4321)
            } else error("pattern match fail",$phi$489);
            var $phi$486 = $phi$488
          } else var $phi$486 = (Pair_3977(a_4315))(e_4316);
          return $phi$486
        }
      };
      return snd_3981((((((breakableDownAndUpWithEnv_4149(getEnv_4144))(setEnv_4145))(function(a_4352){
        return function(e_4353){
          return Left_3992((rewriteBounds_4277(a_4352))(e_4353))
        }
      }))(rewriteVar_4279))(((S_4137([env_4270]))(is_4269))(0)))(e_4271))
    }
  }
};
var rewriteTopExpr_4146 = function(is_4265){
  return function(env_4266){
    return function(e_4267){
      var __4268 = debug((reallyPrintExpr_4135(true))(e_4267));
      return ((rewriteExpr_4147(is_4265))(env_4266))(e_4267)
    }
  }
};
var instanceNameFromImport_4156 = function(imix_4511){
  return function(inix_4512){
    return function(b_4513){
      var $phi$490 = ($concat(($concat(($concat(($concat(($concat("$import"))(intToString(imix_4511))))("$instance$")))(b_4513.$1)))("$")))(intToString(inix_4512));
      return $phi$490
    }
  }
};
var instanceName2_4155 = function(ix_4506){
  return function(i_4507){
    var $phi$491 = ($concat(($concat(($concat("$instance$"))(i_4507.$1)))("$")))(intToString(ix_4506));
    return $phi$491
  }
};
var rewriteImportedBound_4140 = function(imix_4214){
  return function(nbs_4215){
    return function(ib_4216){
      var alias_4222 = ((instanceNameFromImport_4156(imix_4214))(ib_4216.$0))(ib_4216.$1);
      var symbol_4221 = (instanceName2_4155(ib_4216.$0))(ib_4216.$1);
      var $phi$493 = (Pair_3977((push((Pair_3977(symbol_4221))(alias_4222)))(nbs_4215.$0)))((push((Pair_3977(alias_4222))(ib_4216.$1)))(nbs_4215.$1));
      var $phi$492 = $phi$493;
      return $phi$492
    }
  }
};
var className_4151 = function(n_4489){
  return ($concat("$class$"))(n_4489)
};
var rewriteImportedInstances_4139 = function(ms_4193){
  return function(isi_4194){
    return function(ixi_4195){
      if(ixi_4195.$1.$tag==1){
        var $phi$497 = (get(ixi_4195.$1.$1))(ms_4193);
        var $phi$499 = ((foldl(rewriteImportedBound_4140(ixi_4195.$0)))((Pair_3977([]))([])))(zipWithIndex_4046($phi$497.$2));
        var cns_4207 = (map(function(n_4208){
          return (Pair_3977(n_4208))(n_4208)
        }))((concatMap_4043(function(c_4209){
          var $phi$500 = (enqueue(className_4151(c_4209.$1)))((map(fst_3991))(c_4209.$3));
          return $phi$500
        }))($phi$497.$1));
        var $phi$498 = (Pair_3977((push(((ImportOpen_4109(ixi_4195.$1.$0))(ixi_4195.$1.$1))((concat(ixi_4195.$1.$2))((concat($phi$499.$0))(cns_4207)))))(isi_4194.$0)))((concat(isi_4194.$1))($phi$499.$1));
        var $phi$496 = $phi$498;
        var $phi$495 = $phi$496
      } else error("pattern match fail",ixi_4195);
      var $phi$494 = $phi$495;
      return $phi$494
    }
  }
};
var className2_4152 = function(c_4490){
  var $phi$501 = className_4151(c_4490.$1);
  return $phi$501
};
var rewriteClassToFun_4142 = function(c_4231){
  var name_4236 = className2_4152(c_4231);
  var f_4240 = function(b_4241){
    return (PVar_4117(emptyAnn_4107))(($concat(fst_3991(b_4241)))("_"))
  };
  var bsForPat_4237 = (map(f_4240))(sort(c_4231.$3));
  var v_4238 = ($concat("x_"))(name_4236);
  var rewrite_4239 = function(b_4242){
    var $phi$503 = (Pair_3977(b_4242.$0))((setType_4088(b_4242.$1))(((Lam_4063(((((setAnn_4086($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_4120(b_4242.$0)))(emptyAnn_4107)))(v_4238))(((Case_4064(emptyAnn_4107))((Var_4081(emptyAnn_4107))(v_4238)))([(Pair_3977(((PData_4115(emptyAnn_4107))(name_4236))(bsForPat_4237)))((Var_4081(emptyAnn_4107))(($concat(b_4242.$0))("_")))]))));
    return $phi$503
  };
  var $phi$502 = (map(rewrite_4239))(classToBindings_4125(c_4231));
  return $phi$502
};
var rewriteClassToData_4141 = function(c_4223){
  var t_4230 = ((TApp_4096(emptyAnn_4107))((TConst_4094(emptyAnn_4107))(c_4223.$1)))((TVar_4095(emptyAnn_4107))(c_4223.$2));
  var ps_4229 = (map(snd_3981))(sort(classToBindings_4125(c_4223)));
  var name_4228 = className_4151(c_4223.$1);
  var $phi$504 = ((((mkConFun_4136(Nothing_3984))(t_4230))([c_4223.$2]))(name_4228))(ps_4229);
  return $phi$504
};
var importsToTypeEnv_4150 = function(ms_4454){
  return function(is_4455){
    var getFile_4456 = function(i_4459){
      if(i_4459.$tag==2){
        var $phi$505 = i_4459.$1
      } else if(i_4459.$tag==1){
        var $phi$505 = i_4459.$1
      } else if(i_4459.$tag==0){
        var $phi$505 = i_4459.$1
      } else error("pattern match fail",i_4459);
      return $phi$505
    };
    var addClass_4457 = function(env_4468){
      return function(c_4469){
        return ((foldl(function(env_4470){
          return function(b_4471){
            return ((set(fst_3991(b_4471)))(snd_3981(b_4471)))(env_4470)
          }
        }))(env_4468))(classToBindings_4125(c_4469))
      }
    };
    var addImports_4458 = function(env_4472){
      return function(i_4473){
        var $phi$507 = (get(getFile_4456(i_4473)))(ms_4454);
        if(i_4473.$tag==2){
          var $phi$508 = (merge(env_4472))($phi$507.$0)
        } else if(i_4473.$tag==1){
          var $phi$508 = ((foldl(function(env_4484){
            return function(n_4485){
              var $phi$509 = ((set(n_4485.$1))((get(n_4485.$0))($phi$507.$0)))(env_4484);
              return $phi$509
            }
          }))(env_4472))(i_4473.$2)
        } else var $phi$508 = error("import type not supported in type inference");
        var env2_4477 = $phi$508;
        var env3_4478 = ((foldl(addClass_4457))(env2_4477))($phi$507.$1);
        var $phi$506 = env3_4478;
        return $phi$506
      }
    };
    return ((foldl(addImports_4458))(empty))((enqueue((ImportAll_4108(emptyAnn_4107))("./builtins.js")))(is_4455))
  }
};
var instanceName_4153 = function(ix_4495){
  return function(i_4496){
    var $phi$510 = ($concat(($concat(($concat("$instance$"))(i_4496.$1)))("$")))(intToString(ix_4495));
    return $phi$510
  }
};
var rewriteInstance_4143 = function(is_4245){
  return function(env_4246){
    return function(ix_4247){
      return function(i_4248){
        var args_4254 = (map((rewriteExpr_4147(is_4245))(env_4246)))((map(snd_3981))(sort(i_4248.$3)));
        var e_4255 = ((foldl(App_4062(emptyAnn_4107)))((Var_4081(emptyAnn_4107))(className_4151(i_4248.$1))))(args_4254);
        var name_4253 = (instanceName_4153(ix_4247))(i_4248);
        var $phi$511 = (Pair_3977(name_4253))((withAnn_4085(((((setAnn_4086($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_4120(name_4253)))(emptyAnn_4107)))(e_4255));
        return $phi$511
      }
    }
  }
};
var declassModule_4138 = function(ms_4160){
  return function(m_4161){
    var isi_4169 = ((foldl(rewriteImportedInstances_4139(ms_4160)))((Pair_3977([]))([])))(zipWithIndex_4046(m_4161.$2));
    var importedInstances_4171 = snd_3981(isi_4169);
    var availableInstances_4174 = (concat(importedInstances_4171))((map(function(p_4180){
      var $phi$513 = (Pair_3977((instanceName_4153(p_4180.$0))(p_4180.$1)))(instanceToTypeBound_4129(p_4180.$1));
      return $phi$513
    }))(zipWithIndex_4046(m_4161.$5)));
    var classesAsData_4172 = (map(rewriteClassToData_4141))(m_4161.$4);
    var classFuns_4173 = (concat(classesAsData_4172))((concatMap_4043(rewriteClassToFun_4142))(m_4161.$4));
    var env_4175 = ((foldl(function(env_4183){
      return function(b_4184){
        var $phi$514 = ((set(b_4184.$0))(getType_4084(b_4184.$1)))(env_4183);
        return $phi$514
      }
    }))((importsToTypeEnv_4150(ms_4160))(m_4161.$2)))((concat(classFuns_4173))(m_4161.$6));
    var instancesAsDefs_4179 = (map(function(p_4190){
      var $phi$515 = (((rewriteInstance_4143(availableInstances_4174))(env_4175))(p_4190.$0))(p_4190.$1);
      return $phi$515
    }))(zipWithIndex_4046(m_4161.$5));
    var splitData_4176 = function(d_4187){
      var $phi$517 = (((lookup_3999($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(annOf_4083(snd_3981(d_4187)));
      if($phi$517.$tag==1){
        var $phi$516 = Right_3993(d_4187)
      } else if($phi$517.$tag==0){
        var $phi$516 = Left_3992(d_4187)
      } else error("pattern match fail",$phi$517);
      return $phi$516
    };
    var sds_4177 = splitEither_4053((map(splitData_4176))(m_4161.$6));
    var ds2_4178 = (map(function(d_4189){
      return (Pair_3977(fst_3991(d_4189)))(((rewriteExpr_4147(availableInstances_4174))(env_4175))(snd_3981(d_4189)))
    }))(snd_3981(sds_4177));
    var is2_4170 = fst_3991(isi_4169);
    var $phi$512 = ((((((Module_4114(m_4161.$0))(m_4161.$1))(is2_4170))(m_4161.$3))([]))([]))((concat(fst_3991(sds_4177)))((concat(classFuns_4173))((concat(instancesAsDefs_4179))(ds2_4178))));
    return $phi$512
  }
};
var Pair_4517 = Pair_3;
var mapSnd_4518 = mapSnd_84;
var mapFst_4519 = mapFst_83;
var $gt$eq$gt_4520 = $gt$eq$gt_82;
var snd_4521 = snd_23;
var debug2_4522 = debug2_81;
var Just_4523 = Just_1;
var Nothing_4524 = Nothing_2;
var isJust_4525 = isJust_21;
var Empty_4526 = Empty_7;
var Leaf_4527 = Leaf_8;
var Collision_4528 = Collision_9;
var BitmapIndexed_4529 = BitmapIndexed_10;
var $_4530 = $_12;
var fst_4531 = fst_22;
var Left_4532 = Left_4;
var Right_4533 = Right_5;
var loop_4534 = loop_27;
var find_4535 = find_29;
var hamtMask_4536 = hamtMask_58;
var popCount_4537 = popCount_57;
var hamtIndex_4538 = hamtIndex_59;
var lookup_4539 = lookup_60;
var setContains_4540 = setContains_76;
var foldTrie_4541 = foldTrie_66;
var emptySet_4542 = emptySet_72;
var Unit_4543 = Unit_0;
var not_4544 = not_26;
var $div$eq_4545 = $div$eq_13;
var mapIx_4546 = mapIx_30;
var insert_4547 = insert_61;
var setAdd_4548 = setAdd_73;
var setIntersection_4549 = setIntersection_80;
var remove_4550 = remove_63;
var setDiff_4551 = setDiff_79;
var setToArray_4552 = setToArray_78;
var mergeTrie_4553 = mergeTrie_70;
var setUnion_4554 = setUnion_77;
var setRemove_4555 = setRemove_75;
var setAddAll_4556 = setAddAll_74;
var trieKeys_4557 = trieKeys_71;
var size_4558 = size_68;
var mapTrie_4559 = mapTrie_67;
var nodeMask_4560 = nodeMask_56;
var isEmpty_4561 = isEmpty_69;
var filterTrie_4562 = filterTrie_65;
var nextSetBitMask_4563 = nextSetBitMask_64;
var updateOrSet_4564 = updateOrSet_62;
var State_4565 = State_6;
var runState_4566 = runState_54;
var evalState_4567 = evalState_55;
var sets_4568 = sets_53;
var gets_4569 = gets_52;
var foldM_4570 = foldM_49;
var mapM_4571 = mapM_50;
var forM_4572 = forM_51;
var strToArray_4573 = strToArray_48;
var toRecord_4574 = toRecord_47;
var reverse_4575 = reverse_46;
var tail_4576 = tail_41;
var head_4577 = head_40;
var uniq_4578 = uniq_45;
var mergeSet_4579 = mergeSet_44;
var init_4580 = init_43;
var last_4581 = last_42;
var mapJust_4582 = mapJust_39;
var concatMap_4583 = concatMap_38;
var zip_4584 = zip_37;
var zipWithIndex2_4585 = zipWithIndex2_35;
var zipWithIndex_4586 = zipWithIndex_36;
var join_4587 = join_34;
var all_4588 = all_33;
var exists_4589 = exists_32;
var containsChar_4590 = containsChar_31;
var contains_4591 = contains_28;
var either_4592 = either_24;
var splitEither_4593 = splitEither_25;
var fromJust_4594 = fromJust_20;
var justOr_4595 = justOr_19;
var maybe_4596 = maybe_18;
var $gt$gt_4597 = $gt$gt_17;
var $gt$eq_4598 = $gt$eq_16;
var $lt$eq_4599 = $lt$eq_15;
var $gt_4600 = $gt_14;
var Identity_4601 = Identity_11;
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
var ArgBool_4602 = function($_0_4610){
  return function($_1_4611){
    return {$0:$_0_4610,$1:$_1_4611,$tag:0}
  }
};
var ParsedArgs_4604 = function($_0_4614){
  return function($_1_4615){
    return function($_2_4616){
      return {$0:$_0_4614,$1:$_1_4615,$2:$_2_4616}
    }
  }
};
var ArgString_4603 = function($_0_4612){
  return function($_1_4613){
    return {$0:$_0_4612,$1:$_1_4613,$tag:1}
  }
};
var $instance$Eq$0 = $class$Eq(function(a_4656){
  return function(b_4657){
    return a_4656===b_4657
  }
});
var getBool_4609 = function(p_4646){
  return function(def_4647){
    var $phi$520 = ((contains_4591($instance$Eq$0))(def_4647))(p_4646.$2);
    if(!$phi$520){
      var $phi$519 = error("unrecognized arg that was not present for parsing")
    } else if($phi$520){
      if(def_4647.$tag==0){
        var $phi$523 = (has(def_4647.$0))(p_4646.$1);
        if(!$phi$523){
          if(def_4647.$1.$tag==0){
            var $phi$526 = def_4647.$1.$0
          } else if(def_4647.$1.$tag==1){
            var $phi$526 = error(($concat("no value for required arg "))(def_4647.$0))
          } else error("pattern match fail",def_4647.$1);
          var $phi$522 = $phi$526
        } else if($phi$523){
          var $phi$525 = (get(def_4647.$0))(p_4646.$1);
          if(""==$phi$525){
            var $phi$524 = true
          } else if("True"==$phi$525){
            var $phi$524 = true
          } else if("true"==$phi$525){
            var $phi$524 = true
          } else if("1"==$phi$525){
            var $phi$524 = true
          } else if("False"==$phi$525){
            var $phi$524 = false
          } else if("false"==$phi$525){
            var $phi$524 = false
          } else if("0"==$phi$525){
            var $phi$524 = false
          } else var $phi$524 = error(($concat("invalid value for a bool argument: "))($phi$525));
          var $phi$522 = $phi$524
        } else error("pattern match fail",$phi$523);
        var $phi$521 = $phi$522
      } else var $phi$521 = error("arg is not a bool");
      var $phi$519 = $phi$521
    } else error("pattern match fail",$phi$520);
    var $phi$518 = $phi$519;
    return $phi$518
  }
};
var getString_4608 = function(p_4637){
  return function(def_4638){
    var $phi$529 = ((contains_4591($instance$Eq$0))(def_4638))(p_4637.$2);
    if(!$phi$529){
      var $phi$528 = error("unrecognized arg that was not present for parsing")
    } else if($phi$529){
      if(def_4638.$tag==1){
        var $phi$532 = (has(def_4638.$0))(p_4637.$1);
        if(!$phi$532){
          if(def_4638.$1.$tag==0){
            var $phi$533 = def_4638.$1.$0
          } else if(def_4638.$1.$tag==1){
            var $phi$533 = error(($concat("no value for required arg "))(def_4638.$0))
          } else error("pattern match fail",def_4638.$1);
          var $phi$531 = $phi$533
        } else if($phi$532){
          var $phi$531 = (get(def_4638.$0))(p_4637.$1)
        } else error("pattern match fail",$phi$532);
        var $phi$530 = $phi$531
      } else var $phi$530 = error("arg is not a string");
      var $phi$528 = $phi$530
    } else error("pattern match fail",$phi$529);
    var $phi$527 = $phi$528;
    return $phi$527
  }
};
var getPositional_4607 = function(p_4633){
  var $phi$534 = p_4633.$0;
  return $phi$534
};
var argName_4605 = function(a_4617){
  if(a_4617.$tag==0){
    var $phi$535 = a_4617.$0
  } else if(a_4617.$tag==1){
    var $phi$535 = a_4617.$0
  } else error("pattern match fail",a_4617);
  return $phi$535
};
var parseArgs_4606 = function(defs_4622){
  return function(argv_4623){
    var parse_4624 = function(r_4625){
      return function(arg_4626){
        var $phi$538 = ($and((($eq$eq($import1$instance$Eq$1))((getChar(0))(arg_4626)))("-")))((($eq$eq($import1$instance$Eq$1))((getChar(1))(arg_4626)))("-"));
        if(!$phi$538){
          var $phi$537 = (Pair_4517((push(arg_4626))(r_4625.$0)))(r_4625.$1)
        } else if($phi$538){
          var value_4630 = (drop(1))((match("=.*"))(arg_4626));
          var name_4629 = (match("[^=]+"))((drop(2))(arg_4626));
          var $phi$540 = ((contains_4591($import1$instance$Eq$1))(name_4629))((map(argName_4605))(defs_4622));
          if(!$phi$540){
            var $phi$539 = error(($concat("unrecognized argument "))(arg_4626))
          } else if($phi$540){
            var $phi$539 = (Pair_4517(r_4625.$0))(((set(name_4629))(value_4630))(r_4625.$1))
          } else error("pattern match fail",$phi$540);
          var $phi$537 = $phi$539
        } else error("pattern match fail",$phi$538);
        var $phi$536 = $phi$537;
        return $phi$536
      }
    };
    var $phi$542 = ((foldl(parse_4624))((Pair_4517([]))(empty)))(argv_4623);
    var $phi$541 = ((ParsedArgs_4604($phi$542.$0))($phi$542.$1))(defs_4622);
    return $phi$541
  }
};
var JSIf_4681 = function($_0_4715){
  return function($_1_4716){
    return function($_2_4717){
      return {$0:$_0_4715,$1:$_1_4716,$2:$_2_4717,$tag:6}
    }
  }
};
var JSAssign_4680 = function($_0_4713){
  return function($_1_4714){
    return {$0:$_0_4713,$1:$_1_4714,$tag:5}
  }
};
var JSBreak_4679 = {$tag:4};
var JSSwitch_4678 = function($_0_4711){
  return function($_1_4712){
    return {$0:$_0_4711,$1:$_1_4712,$tag:3}
  }
};
var JSVar_4677 = function($_0_4709){
  return function($_1_4710){
    return {$0:$_0_4709,$1:$_1_4710,$tag:2}
  }
};
var JSReturn_4676 = function($_0_4708){
  return {$0:$_0_4708,$tag:1}
};
var JSExpr_4675 = function($_0_4707){
  return {$0:$_0_4707,$tag:0}
};
var JSSeq_4674 = function($_0_4706){
  return {$0:$_0_4706,$tag:16}
};
var JSNew_4673 = function($_0_4704){
  return function($_1_4705){
    return {$0:$_0_4704,$1:$_1_4705,$tag:15}
  }
};
var JSInstanceOf_4672 = function($_0_4702){
  return function($_1_4703){
    return {$0:$_0_4702,$1:$_1_4703,$tag:14}
  }
};
var JSUndefined_4671 = {$tag:13};
var JSNull_4670 = {$tag:12};
var JSArray_4669 = function($_0_4701){
  return {$0:$_0_4701,$tag:11}
};
var JSObject_4668 = function($_0_4700){
  return {$0:$_0_4700,$tag:10}
};
var JSBool_4667 = function($_0_4699){
  return {$0:$_0_4699,$tag:9}
};
var JSString_4666 = function($_0_4698){
  return {$0:$_0_4698,$tag:8}
};
var JSNum_4665 = function($_0_4697){
  return {$0:$_0_4697,$tag:7}
};
var JSTernary_4664 = function($_0_4694){
  return function($_1_4695){
    return function($_2_4696){
      return {$0:$_0_4694,$1:$_1_4695,$2:$_2_4696,$tag:6}
    }
  }
};
var JSFun_4663 = function($_0_4692){
  return function($_1_4693){
    return {$0:$_0_4692,$1:$_1_4693,$tag:5}
  }
};
var JSCall_4662 = function($_0_4690){
  return function($_1_4691){
    return {$0:$_0_4690,$1:$_1_4691,$tag:4}
  }
};
var JSBinOp_4661 = function($_0_4687){
  return function($_1_4688){
    return function($_2_4689){
      return {$0:$_0_4687,$1:$_1_4688,$2:$_2_4689,$tag:3}
    }
  }
};
var JSUnOp_4660 = function($_0_4685){
  return function($_1_4686){
    return {$0:$_0_4685,$1:$_1_4686,$tag:2}
  }
};
var JSIndex_4659 = function($_0_4683){
  return function($_1_4684){
    return {$0:$_0_4683,$1:$_1_4684,$tag:1}
  }
};
var JSRef_4658 = function($_0_4682){
  return {$0:$_0_4682,$tag:0}
};
var Pair_4718 = Pair_3;
var mapSnd_4719 = mapSnd_84;
var mapFst_4720 = mapFst_83;
var $gt$eq$gt_4721 = $gt$eq$gt_82;
var snd_4722 = snd_23;
var debug2_4723 = debug2_81;
var Just_4724 = Just_1;
var Nothing_4725 = Nothing_2;
var isJust_4726 = isJust_21;
var Empty_4727 = Empty_7;
var Leaf_4728 = Leaf_8;
var Collision_4729 = Collision_9;
var BitmapIndexed_4730 = BitmapIndexed_10;
var $_4731 = $_12;
var fst_4732 = fst_22;
var Left_4733 = Left_4;
var Right_4734 = Right_5;
var loop_4735 = loop_27;
var find_4736 = find_29;
var hamtMask_4737 = hamtMask_58;
var popCount_4738 = popCount_57;
var hamtIndex_4739 = hamtIndex_59;
var lookup_4740 = lookup_60;
var setContains_4741 = setContains_76;
var foldTrie_4742 = foldTrie_66;
var emptySet_4743 = emptySet_72;
var Unit_4744 = Unit_0;
var not_4745 = not_26;
var $div$eq_4746 = $div$eq_13;
var mapIx_4747 = mapIx_30;
var insert_4748 = insert_61;
var setAdd_4749 = setAdd_73;
var setIntersection_4750 = setIntersection_80;
var remove_4751 = remove_63;
var setDiff_4752 = setDiff_79;
var setToArray_4753 = setToArray_78;
var mergeTrie_4754 = mergeTrie_70;
var setUnion_4755 = setUnion_77;
var setRemove_4756 = setRemove_75;
var setAddAll_4757 = setAddAll_74;
var trieKeys_4758 = trieKeys_71;
var size_4759 = size_68;
var mapTrie_4760 = mapTrie_67;
var nodeMask_4761 = nodeMask_56;
var isEmpty_4762 = isEmpty_69;
var filterTrie_4763 = filterTrie_65;
var nextSetBitMask_4764 = nextSetBitMask_64;
var updateOrSet_4765 = updateOrSet_62;
var State_4766 = State_6;
var runState_4767 = runState_54;
var evalState_4768 = evalState_55;
var sets_4769 = sets_53;
var gets_4770 = gets_52;
var foldM_4771 = foldM_49;
var mapM_4772 = mapM_50;
var forM_4773 = forM_51;
var strToArray_4774 = strToArray_48;
var toRecord_4775 = toRecord_47;
var reverse_4776 = reverse_46;
var tail_4777 = tail_41;
var head_4778 = head_40;
var uniq_4779 = uniq_45;
var mergeSet_4780 = mergeSet_44;
var init_4781 = init_43;
var last_4782 = last_42;
var mapJust_4783 = mapJust_39;
var concatMap_4784 = concatMap_38;
var zip_4785 = zip_37;
var zipWithIndex2_4786 = zipWithIndex2_35;
var zipWithIndex_4787 = zipWithIndex_36;
var join_4788 = join_34;
var all_4789 = all_33;
var exists_4790 = exists_32;
var containsChar_4791 = containsChar_31;
var contains_4792 = contains_28;
var either_4793 = either_24;
var splitEither_4794 = splitEither_25;
var fromJust_4795 = fromJust_20;
var justOr_4796 = justOr_19;
var maybe_4797 = maybe_18;
var $gt$gt_4798 = $gt$gt_17;
var $gt$eq_4799 = $gt$eq_16;
var $lt$eq_4800 = $lt$eq_15;
var $gt_4801 = $gt_14;
var Identity_4802 = Identity_11;
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
var JSIf_4803 = JSIf_4681;
var JSAssign_4804 = JSAssign_4680;
var JSBreak_4805 = JSBreak_4679;
var JSSwitch_4806 = JSSwitch_4678;
var JSVar_4807 = JSVar_4677;
var JSReturn_4808 = JSReturn_4676;
var JSExpr_4809 = JSExpr_4675;
var JSSeq_4810 = JSSeq_4674;
var JSNew_4811 = JSNew_4673;
var JSInstanceOf_4812 = JSInstanceOf_4672;
var JSUndefined_4813 = JSUndefined_4671;
var JSNull_4814 = JSNull_4670;
var JSArray_4815 = JSArray_4669;
var JSObject_4816 = JSObject_4668;
var JSBool_4817 = JSBool_4667;
var JSString_4818 = JSString_4666;
var JSNum_4819 = JSNum_4665;
var JSTernary_4820 = JSTernary_4664;
var JSFun_4821 = JSFun_4663;
var JSCall_4822 = JSCall_4662;
var JSBinOp_4823 = JSBinOp_4661;
var JSUnOp_4824 = JSUnOp_4660;
var JSIndex_4825 = JSIndex_4659;
var JSRef_4826 = JSRef_4658;
var tryDCE_4827 = function(e_4830){
  if(((e_4830.$tag==3)&&("&&"==e_4830.$0))&&((e_4830.$1.$tag==9)&&e_4830.$1.$0)){
    var $phi$543 = e_4830.$2
  } else if(((e_4830.$tag==3)&&("&&"==e_4830.$0))&&((e_4830.$2.$tag==9)&&e_4830.$2.$0)){
    var $phi$543 = e_4830.$1
  } else if((e_4830.$tag==6)&&((e_4830.$0.$tag==9)&&e_4830.$0.$0)){
    var $phi$543 = e_4830.$1
  } else if((e_4830.$tag==6)&&((e_4830.$0.$tag==9)&&(!e_4830.$0.$0))){
    var $phi$543 = e_4830.$2
  } else var $phi$543 = e_4830;
  return $phi$543
};
var rewriteDCE_4828 = function(e_4838){
  if(e_4838.$tag==1){
    var $phi$544 = (JSIndex_4825(rewriteDCE_4828(e_4838.$0)))(rewriteDCE_4828(e_4838.$1))
  } else if(e_4838.$tag==3){
    var $phi$544 = tryDCE_4827(((JSBinOp_4823(e_4838.$0))(rewriteDCE_4828(e_4838.$1)))(rewriteDCE_4828(e_4838.$2)))
  } else if(e_4838.$tag==4){
    var $phi$544 = (JSCall_4822(rewriteDCE_4828(e_4838.$0)))((map(rewriteDCE_4828))(e_4838.$1))
  } else if(e_4838.$tag==5){
    var $phi$544 = (JSFun_4821(e_4838.$0))((concatMap_4784(rewriteStmt_4829))(e_4838.$1))
  } else if(e_4838.$tag==6){
    var $phi$544 = tryDCE_4827(((JSTernary_4820(rewriteDCE_4828(e_4838.$0)))(rewriteDCE_4828(e_4838.$1)))(rewriteDCE_4828(e_4838.$2)))
  } else if(e_4838.$tag==10){
    var $phi$544 = JSObject_4816((map(function(kv_4852){
      var $phi$545 = (Pair_4718(kv_4852.$0))(rewriteDCE_4828(kv_4852.$1));
      return $phi$545
    }))(e_4838.$0))
  } else if(e_4838.$tag==14){
    var $phi$544 = (JSInstanceOf_4812(rewriteDCE_4828(e_4838.$0)))(rewriteDCE_4828(e_4838.$1))
  } else if(e_4838.$tag==15){
    var $phi$544 = (JSNew_4811(rewriteDCE_4828(e_4838.$0)))((map(rewriteDCE_4828))(e_4838.$1))
  } else if(e_4838.$tag==11){
    var $phi$544 = JSArray_4815((map(rewriteDCE_4828))(e_4838.$0))
  } else var $phi$544 = e_4838;
  return $phi$544
};
var rewriteStmt_4829 = function(s_4861){
  if(s_4861.$tag==0){
    var $phi$546 = [JSExpr_4809(rewriteDCE_4828(s_4861.$0))]
  } else if(s_4861.$tag==1){
    var $phi$546 = [JSReturn_4808(rewriteDCE_4828(s_4861.$0))]
  } else if(s_4861.$tag==2){
    var $phi$546 = [(JSVar_4807(s_4861.$0))(rewriteDCE_4828(s_4861.$1))]
  } else if(s_4861.$tag==5){
    var $phi$546 = [(JSAssign_4804(rewriteDCE_4828(s_4861.$0)))(rewriteDCE_4828(s_4861.$1))]
  } else if((s_4861.$tag==6)&&((s_4861.$0.$tag==9)&&s_4861.$0.$0)){
    var $phi$546 = (concatMap_4784(rewriteStmt_4829))(s_4861.$1)
  } else if((s_4861.$tag==6)&&((s_4861.$0.$tag==9)&&(!s_4861.$0.$0))){
    var $phi$546 = (concatMap_4784(rewriteStmt_4829))(s_4861.$2)
  } else if(s_4861.$tag==6){
    var $phi$548 = rewriteDCE_4828(s_4861.$0);
    if(($phi$548.$tag==9)&&$phi$548.$0){
      var $phi$547 = (concatMap_4784(rewriteStmt_4829))(s_4861.$1)
    } else if(($phi$548.$tag==9)&&(!$phi$548.$0)){
      var $phi$547 = (concatMap_4784(rewriteStmt_4829))(s_4861.$2)
    } else var $phi$547 = [((JSIf_4803($phi$548))((concatMap_4784(rewriteStmt_4829))(s_4861.$1)))((concatMap_4784(rewriteStmt_4829))(s_4861.$2))];
    var $phi$546 = $phi$547
  } else var $phi$546 = [s_4861];
  return $phi$546
};
var Pair_4877 = Pair_3;
var mapSnd_4878 = mapSnd_84;
var mapFst_4879 = mapFst_83;
var $gt$eq$gt_4880 = $gt$eq$gt_82;
var snd_4881 = snd_23;
var debug2_4882 = debug2_81;
var Just_4883 = Just_1;
var Nothing_4884 = Nothing_2;
var isJust_4885 = isJust_21;
var Empty_4886 = Empty_7;
var Leaf_4887 = Leaf_8;
var Collision_4888 = Collision_9;
var BitmapIndexed_4889 = BitmapIndexed_10;
var $_4890 = $_12;
var fst_4891 = fst_22;
var Left_4892 = Left_4;
var Right_4893 = Right_5;
var loop_4894 = loop_27;
var find_4895 = find_29;
var hamtMask_4896 = hamtMask_58;
var popCount_4897 = popCount_57;
var hamtIndex_4898 = hamtIndex_59;
var lookup_4899 = lookup_60;
var setContains_4900 = setContains_76;
var foldTrie_4901 = foldTrie_66;
var emptySet_4902 = emptySet_72;
var Unit_4903 = Unit_0;
var not_4904 = not_26;
var $div$eq_4905 = $div$eq_13;
var mapIx_4906 = mapIx_30;
var insert_4907 = insert_61;
var setAdd_4908 = setAdd_73;
var setIntersection_4909 = setIntersection_80;
var remove_4910 = remove_63;
var setDiff_4911 = setDiff_79;
var setToArray_4912 = setToArray_78;
var mergeTrie_4913 = mergeTrie_70;
var setUnion_4914 = setUnion_77;
var setRemove_4915 = setRemove_75;
var setAddAll_4916 = setAddAll_74;
var trieKeys_4917 = trieKeys_71;
var size_4918 = size_68;
var mapTrie_4919 = mapTrie_67;
var nodeMask_4920 = nodeMask_56;
var isEmpty_4921 = isEmpty_69;
var filterTrie_4922 = filterTrie_65;
var nextSetBitMask_4923 = nextSetBitMask_64;
var updateOrSet_4924 = updateOrSet_62;
var State_4925 = State_6;
var runState_4926 = runState_54;
var evalState_4927 = evalState_55;
var sets_4928 = sets_53;
var gets_4929 = gets_52;
var foldM_4930 = foldM_49;
var mapM_4931 = mapM_50;
var forM_4932 = forM_51;
var strToArray_4933 = strToArray_48;
var toRecord_4934 = toRecord_47;
var reverse_4935 = reverse_46;
var tail_4936 = tail_41;
var head_4937 = head_40;
var uniq_4938 = uniq_45;
var mergeSet_4939 = mergeSet_44;
var init_4940 = init_43;
var last_4941 = last_42;
var mapJust_4942 = mapJust_39;
var concatMap_4943 = concatMap_38;
var zip_4944 = zip_37;
var zipWithIndex2_4945 = zipWithIndex2_35;
var zipWithIndex_4946 = zipWithIndex_36;
var join_4947 = join_34;
var all_4948 = all_33;
var exists_4949 = exists_32;
var containsChar_4950 = containsChar_31;
var contains_4951 = contains_28;
var either_4952 = either_24;
var splitEither_4953 = splitEither_25;
var fromJust_4954 = fromJust_20;
var justOr_4955 = justOr_19;
var maybe_4956 = maybe_18;
var $gt$gt_4957 = $gt$gt_17;
var $gt$eq_4958 = $gt$eq_16;
var $lt$eq_4959 = $lt$eq_15;
var $gt_4960 = $gt_14;
var Identity_4961 = Identity_11;
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
var JSIf_4962 = JSIf_4681;
var JSAssign_4963 = JSAssign_4680;
var JSBreak_4964 = JSBreak_4679;
var JSSwitch_4965 = JSSwitch_4678;
var JSVar_4966 = JSVar_4677;
var JSReturn_4967 = JSReturn_4676;
var JSExpr_4968 = JSExpr_4675;
var JSSeq_4969 = JSSeq_4674;
var JSNew_4970 = JSNew_4673;
var JSInstanceOf_4971 = JSInstanceOf_4672;
var JSUndefined_4972 = JSUndefined_4671;
var JSNull_4973 = JSNull_4670;
var JSArray_4974 = JSArray_4669;
var JSObject_4975 = JSObject_4668;
var JSBool_4976 = JSBool_4667;
var JSString_4977 = JSString_4666;
var JSNum_4978 = JSNum_4665;
var JSTernary_4979 = JSTernary_4664;
var JSFun_4980 = JSFun_4663;
var JSCall_4981 = JSCall_4662;
var JSBinOp_4982 = JSBinOp_4661;
var JSUnOp_4983 = JSUnOp_4660;
var JSIndex_4984 = JSIndex_4659;
var JSRef_4985 = JSRef_4658;
var printIndent_4991 = function(indent_5062){
  if(0==indent_5062){
    var $phi$549 = ""
  } else var $phi$549 = ($concat("  "))(printIndent_4991(indent_5062-1));
  return $phi$549
};
var paren_4992 = function(s_5064){
  return ($concat(($concat("("))(s_5064)))(")")
};
var jsExprToString_4986 = function(indent_4993){
  return function(e_4994){
    var printParen_4996 = function(e_4998){
      return (jsExprToParenString_4987(indent_4993))(e_4998)
    };
    var print_4995 = function(e_4997){
      return (jsExprToString_4986(indent_4993))(e_4997)
    };
    if(e_4994.$tag==12){
      var $phi$550 = "null"
    } else if(e_4994.$tag==13){
      var $phi$550 = "undefined"
    } else if((e_4994.$tag==9)&&e_4994.$0){
      var $phi$550 = "true"
    } else if((e_4994.$tag==9)&&(!e_4994.$0)){
      var $phi$550 = "false"
    } else if(e_4994.$tag==7){
      var $phi$550 = jsonStringify(e_4994.$0)
    } else if(e_4994.$tag==8){
      var $phi$550 = jsonStringify(e_4994.$0)
    } else if(e_4994.$tag==0){
      var $phi$550 = e_4994.$0
    } else if((e_4994.$tag==1)&&(e_4994.$1.$tag==8)){
      var $phi$552 = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))(e_4994.$1.$0);
      if(""==$phi$552){
        var $phi$551 = ($concat(($concat(($concat(printParen_4996(e_4994.$0)))("[")))(e_4994.$1.$0)))("]")
      } else var $phi$551 = ($concat(($concat(printParen_4996(e_4994.$0)))(".")))($phi$552);
      var $phi$550 = $phi$551
    } else if(e_4994.$tag==1){
      var $phi$550 = ($concat(($concat(($concat(printParen_4996(e_4994.$0)))("[")))(print_4995(e_4994.$1))))("]")
    } else if(e_4994.$tag==2){
      var $phi$550 = ($concat(e_4994.$0))(printParen_4996(e_4994.$1))
    } else if(e_4994.$tag==3){
      var $phi$550 = ($concat(($concat(printParen_4996(e_4994.$1)))(e_4994.$0)))(printParen_4996(e_4994.$2))
    } else if(e_4994.$tag==4){
      var $phi$550 = ($concat(printParen_4996(e_4994.$0)))(paren_4992((intercalate(","))((map(print_4995))(e_4994.$1))))
    } else if(e_4994.$tag==15){
      var $phi$550 = ($concat(($concat("new "))(printParen_4996(e_4994.$0))))(paren_4992((intercalate(","))((map(print_4995))(e_4994.$1))))
    } else if(e_4994.$tag==5){
      var $phi$550 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat("function("))((intercalate(","))(e_4994.$0))))("){\n")))(printIndent_4991(indent_4993+1))))((intercalate(($concat(";\n"))(printIndent_4991(indent_4993+1))))((map(jsStmtToString_4989(indent_4993+1)))(e_4994.$1)))))("\n")))(printIndent_4991(indent_4993))))("}")
    } else if(e_4994.$tag==6){
      var $phi$550 = ($concat(($concat(($concat(($concat(printParen_4996(e_4994.$0)))("?")))(printParen_4996(e_4994.$1))))(":")))(printParen_4996(e_4994.$2))
    } else if(e_4994.$tag==10){
      var $phi$550 = ($concat(($concat("{"))((intercalate(","))((map(keyValueToString_4988(indent_4993)))(e_4994.$0)))))("}")
    } else if(e_4994.$tag==11){
      var $phi$550 = ($concat(($concat("["))((intercalate(","))((map(print_4995))(e_4994.$0)))))("]")
    } else if(e_4994.$tag==14){
      var $phi$550 = ($concat(($concat(printParen_4996(e_4994.$0)))(" instanceof ")))(printParen_4996(e_4994.$1))
    } else if(e_4994.$tag==16){
      var $phi$550 = (intercalate(","))((map(print_4995))(e_4994.$0))
    } else var $phi$550 = error(e_4994);
    return $phi$550
  }
};
var jsExprToParenString_4987 = function(indent_5027){
  return function(e_5028){
    if(e_5028.$tag==0){
      var $phi$553 = (jsExprToString_4986(indent_5027))(e_5028)
    } else if(e_5028.$tag==7){
      var $phi$553 = (jsExprToString_4986(indent_5027))(e_5028)
    } else if(e_5028.$tag==8){
      var $phi$553 = (jsExprToString_4986(indent_5027))(e_5028)
    } else if(e_5028.$tag==9){
      var $phi$553 = (jsExprToString_4986(indent_5027))(e_5028)
    } else if(e_5028.$tag==1){
      var $phi$553 = (jsExprToString_4986(indent_5027))(e_5028)
    } else if(e_5028.$tag==15){
      var $phi$553 = (jsExprToString_4986(indent_5027))(e_5028)
    } else if(e_5028.$tag==10){
      var $phi$553 = (jsExprToString_4986(indent_5027))(e_5028)
    } else var $phi$553 = paren_4992((jsExprToString_4986(indent_5027))(e_5028));
    return $phi$553
  }
};
var keyValueToString_4988 = function(indent_5039){
  return function(kv_5040){
    var $phi$554 = ($concat(($concat(kv_5040.$0))(":")))((jsExprToString_4986(indent_5039))(kv_5040.$1));
    return $phi$554
  }
};
var jsStmtToString_4989 = function(indent_5043){
  return function(s_5044){
    if(s_5044.$tag==0){
      var $phi$555 = (jsExprToString_4986(indent_5043))(s_5044.$0)
    } else if(s_5044.$tag==1){
      var $phi$555 = ($concat("return "))((jsExprToString_4986(indent_5043))(s_5044.$0))
    } else if(s_5044.$tag==2){
      var $phi$555 = ($concat(($concat(($concat("var "))(s_5044.$0)))(" = ")))((jsExprToString_4986(indent_5043))(s_5044.$1))
    } else if(s_5044.$tag==4){
      var $phi$555 = "break"
    } else if(s_5044.$tag==3){
      var $phi$555 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat("switch"))(paren_4992((jsExprToString_4986(indent_5043))(s_5044.$0)))))("{\n")))(printIndent_4991(indent_5043+1))))((intercalate(($concat(";\n"))(printIndent_4991(indent_5043+1))))((map(caseToString_4990(indent_5043+1)))(s_5044.$1)))))("\n")))(printIndent_4991(indent_5043))))("}")
    } else if(s_5044.$tag==5){
      var $phi$555 = ($concat(($concat((jsExprToParenString_4987(indent_5043))(s_5044.$0)))(" = ")))((jsExprToParenString_4987(indent_5043))(s_5044.$1))
    } else if(s_5044.$tag==6){
      var $phi$557 = length(s_5044.$2);
      if(1==$phi$557){
        var $phi$556 = (jsStmtToString_4989(indent_5043))((getIx(0))(s_5044.$2))
      } else var $phi$556 = ($concat(($concat(($concat(($concat(($concat("{\n"))(printIndent_4991(indent_5043+1))))((intercalate(($concat(";\n"))(printIndent_4991(indent_5043+1))))((map(jsStmtToString_4989(indent_5043+1)))(s_5044.$2)))))("\n")))(printIndent_4991(indent_5043))))("}");
      var els_5056 = $phi$556;
      var $phi$555 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat(($concat("if("))((jsExprToString_4986(indent_5043))(s_5044.$0))))("){\n")))(printIndent_4991(indent_5043+1))))((intercalate(($concat(";\n"))(printIndent_4991(indent_5043+1))))((map(jsStmtToString_4989(indent_5043+1)))(s_5044.$1)))))("\n")))(printIndent_4991(indent_5043))))("} else ")))(els_5056)
    } else error("pattern match fail",s_5044);
    return $phi$555
  }
};
var caseToString_4990 = function(indent_5058){
  return function(c_5059){
    var $phi$558 = ($concat(($concat(($concat(($concat("case "))(paren_4992((jsExprToString_4986(indent_5058))(c_5059.$0)))))(":\n")))(printIndent_4991(indent_5058+1))))((intercalate(($concat(";\n"))(printIndent_4991(indent_5058+1))))((map(jsStmtToString_4989(indent_5058)))(c_5059.$1)));
    return $phi$558
  }
};
var Pair_5065 = Pair_3;
var mapSnd_5066 = mapSnd_84;
var mapFst_5067 = mapFst_83;
var $gt$eq$gt_5068 = $gt$eq$gt_82;
var snd_5069 = snd_23;
var debug2_5070 = debug2_81;
var Just_5071 = Just_1;
var Nothing_5072 = Nothing_2;
var isJust_5073 = isJust_21;
var Empty_5074 = Empty_7;
var Leaf_5075 = Leaf_8;
var Collision_5076 = Collision_9;
var BitmapIndexed_5077 = BitmapIndexed_10;
var $_5078 = $_12;
var fst_5079 = fst_22;
var Left_5080 = Left_4;
var Right_5081 = Right_5;
var loop_5082 = loop_27;
var find_5083 = find_29;
var hamtMask_5084 = hamtMask_58;
var popCount_5085 = popCount_57;
var hamtIndex_5086 = hamtIndex_59;
var lookup_5087 = lookup_60;
var setContains_5088 = setContains_76;
var foldTrie_5089 = foldTrie_66;
var emptySet_5090 = emptySet_72;
var Unit_5091 = Unit_0;
var not_5092 = not_26;
var $div$eq_5093 = $div$eq_13;
var mapIx_5094 = mapIx_30;
var insert_5095 = insert_61;
var setAdd_5096 = setAdd_73;
var setIntersection_5097 = setIntersection_80;
var remove_5098 = remove_63;
var setDiff_5099 = setDiff_79;
var setToArray_5100 = setToArray_78;
var mergeTrie_5101 = mergeTrie_70;
var setUnion_5102 = setUnion_77;
var setRemove_5103 = setRemove_75;
var setAddAll_5104 = setAddAll_74;
var trieKeys_5105 = trieKeys_71;
var size_5106 = size_68;
var mapTrie_5107 = mapTrie_67;
var nodeMask_5108 = nodeMask_56;
var isEmpty_5109 = isEmpty_69;
var filterTrie_5110 = filterTrie_65;
var nextSetBitMask_5111 = nextSetBitMask_64;
var updateOrSet_5112 = updateOrSet_62;
var State_5113 = State_6;
var runState_5114 = runState_54;
var evalState_5115 = evalState_55;
var sets_5116 = sets_53;
var gets_5117 = gets_52;
var foldM_5118 = foldM_49;
var mapM_5119 = mapM_50;
var forM_5120 = forM_51;
var strToArray_5121 = strToArray_48;
var toRecord_5122 = toRecord_47;
var reverse_5123 = reverse_46;
var tail_5124 = tail_41;
var head_5125 = head_40;
var uniq_5126 = uniq_45;
var mergeSet_5127 = mergeSet_44;
var init_5128 = init_43;
var last_5129 = last_42;
var mapJust_5130 = mapJust_39;
var concatMap_5131 = concatMap_38;
var zip_5132 = zip_37;
var zipWithIndex2_5133 = zipWithIndex2_35;
var zipWithIndex_5134 = zipWithIndex_36;
var join_5135 = join_34;
var all_5136 = all_33;
var exists_5137 = exists_32;
var containsChar_5138 = containsChar_31;
var contains_5139 = contains_28;
var either_5140 = either_24;
var splitEither_5141 = splitEither_25;
var fromJust_5142 = fromJust_20;
var justOr_5143 = justOr_19;
var maybe_5144 = maybe_18;
var $gt$gt_5145 = $gt$gt_17;
var $gt$eq_5146 = $gt$eq_16;
var $lt$eq_5147 = $lt$eq_15;
var $gt_5148 = $gt_14;
var Identity_5149 = Identity_11;
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
var App_5150 = App_726;
var Lam_5151 = Lam_727;
var Case_5152 = Case_728;
var Let_5153 = Let_729;
var New_5154 = New_730;
var breakableDownAndUpM_5155 = breakableDownAndUpM_775;
var breakableDownM_5156 = breakableDownM_779;
var downAndUpM_5157 = downAndUpM_776;
var downM_5158 = downM_778;
var upM_5159 = upM_777;
var breakableDownAndUp_5160 = breakableDownAndUp_770;
var breakableDown_5161 = breakableDown_774;
var downAndUp_5162 = downAndUp_771;
var down_5163 = down_773;
var up_5164 = up_772;
var AnnType_5165 = AnnType_718;
var TUnknown_5166 = TUnknown_749;
var getAnn_5167 = getAnn_754;
var getAnnType_5168 = getAnnType_757;
var Var_5169 = Var_724;
var Const_5170 = Const_725;
var annOf_5171 = annOf_767;
var getType_5172 = getType_769;
var withAnn_5173 = withAnn_768;
var setAnn_5174 = setAnn_755;
var setAnnType_5175 = setAnnType_758;
var setType_5176 = setType_766;
var Data_5177 = Data_738;
var DataCon_5178 = DataCon_739;
var dataConName_5179 = dataConName_764;
var dataConNames_5180 = dataConNames_765;
var TCBound_5181 = TCBound_742;
var TConst_5182 = TConst_743;
var TVar_5183 = TVar_744;
var TApp_5184 = TApp_745;
var TRow_5185 = TRow_746;
var TBot_5186 = TBot_747;
var TForall_5187 = TForall_748;
var equivBound_5188 = equivBound_762;
var equivType_5189 = equivType_763;
var AnnCodeLoc_5190 = AnnCodeLoc_719;
var printCodeLoc_5191 = printCodeLoc_761;
var setAnnCodeLoc_5192 = setAnnCodeLoc_760;
var getAnnCodeLoc_5193 = getAnnCodeLoc_759;
var copyAnn_5194 = copyAnn_756;
var emptyAnn_5195 = emptyAnn_753;
var ImportAll_5196 = ImportAll_752;
var ImportOpen_5197 = ImportOpen_751;
var ImportClosed_5198 = ImportClosed_750;
var Instance_5199 = Instance_741;
var Class_5200 = Class_740;
var ModuleInterface_5201 = ModuleInterface_737;
var Module_5202 = Module_736;
var PData_5203 = PData_735;
var PConst_5204 = PConst_734;
var PVar_5205 = PVar_733;
var CStr_5206 = CStr_732;
var CNum_5207 = CNum_731;
var AnnExport_5208 = AnnExport_723;
var AnnTag_5209 = AnnTag_722;
var AnnData_5210 = AnnData_721;
var AnnUseCount_5211 = AnnUseCount_720;
var JSIf_5212 = JSIf_4681;
var JSAssign_5213 = JSAssign_4680;
var JSBreak_5214 = JSBreak_4679;
var JSSwitch_5215 = JSSwitch_4678;
var JSVar_5216 = JSVar_4677;
var JSReturn_5217 = JSReturn_4676;
var JSExpr_5218 = JSExpr_4675;
var JSSeq_5219 = JSSeq_4674;
var JSNew_5220 = JSNew_4673;
var JSInstanceOf_5221 = JSInstanceOf_4672;
var JSUndefined_5222 = JSUndefined_4671;
var JSNull_5223 = JSNull_4670;
var JSArray_5224 = JSArray_4669;
var JSObject_5225 = JSObject_4668;
var JSBool_5226 = JSBool_4667;
var JSString_5227 = JSString_4666;
var JSNum_5228 = JSNum_4665;
var JSTernary_5229 = JSTernary_4664;
var JSFun_5230 = JSFun_4663;
var JSCall_5231 = JSCall_4662;
var JSBinOp_5232 = JSBinOp_4661;
var JSUnOp_5233 = JSUnOp_4660;
var JSIndex_5234 = JSIndex_4659;
var JSRef_5235 = JSRef_4658;
var RewriteState_5236 = function($_0_5257){
  return function($_1_5258){
    return function($_2_5259){
      return function($_3_5260){
        return {$0:$_0_5257,$1:$_1_5258,$2:$_2_5259,$3:$_3_5260}
      }
    }
  }
};
var opChar_5256 = function(c_5503){
  if("-"==c_5503){
    var $phi$559 = "$mns"
  } else if("+"==c_5503){
    var $phi$559 = "$pls"
  } else if("*"==c_5503){
    var $phi$559 = "$mul"
  } else if("/"==c_5503){
    var $phi$559 = "$div"
  } else if("="==c_5503){
    var $phi$559 = "$eq"
  } else if(":"==c_5503){
    var $phi$559 = "$col"
  } else if("&"==c_5503){
    var $phi$559 = "$amp"
  } else if("|"==c_5503){
    var $phi$559 = "$pip"
  } else if("<"==c_5503){
    var $phi$559 = "$lt"
  } else if(">"==c_5503){
    var $phi$559 = "$gt"
  } else if("^"==c_5503){
    var $phi$559 = "$rof"
  } else var $phi$559 = c_5503;
  return $phi$559
};
var opName_5255 = function(op_5499){
  if("+"==op_5499){
    var $phi$560 = "$add"
  } else if("-"==op_5499){
    var $phi$560 = "$del"
  } else if("*"==op_5499){
    var $phi$560 = "$mul"
  } else if("&&"==op_5499){
    var $phi$560 = "$and"
  } else if("||"==op_5499){
    var $phi$560 = "$or"
  } else if("++"==op_5499){
    var $phi$560 = "$concat"
  } else var $phi$560 = ((foldl(function(s_5501){
    return function(c_5502){
      return ($concat(s_5501))(opChar_5256(c_5502))
    }
  }))(""))(strToArray_5121(op_5499));
  return $phi$560
};
var processPattern_5248 = function(cons_5423){
  return function(pm_5424){
    return function(p_5425){
      if((p_5425.$tag==0)&&("_"==p_5425.$1)){
        var $phi$561 = (Pair_5065(JSBool_5226(true)))((Pair_5065([]))([]))
      } else if(p_5425.$tag==0){
        var $phi$561 = (Pair_5065(JSBool_5226(true)))((Pair_5065([opName_5255(p_5425.$1)]))([pm_5424]))
      } else if((p_5425.$tag==1)&&(p_5425.$1.$tag==0)){
        var $phi$561 = (Pair_5065(((JSBinOp_5232("=="))(JSNum_5228(p_5425.$1.$0)))(pm_5424)))((Pair_5065([]))([]))
      } else if((p_5425.$tag==1)&&(p_5425.$1.$tag==1)){
        var $phi$561 = (Pair_5065(((JSBinOp_5232("=="))(JSString_5227(p_5425.$1.$0)))(pm_5424)))((Pair_5065([]))([]))
      } else if((p_5425.$tag==2)&&("True"==p_5425.$1)){
        var $phi$561 = (Pair_5065(pm_5424))((Pair_5065([]))([]))
      } else if((p_5425.$tag==2)&&("False"==p_5425.$1)){
        var $phi$561 = (Pair_5065((JSUnOp_5233("!"))(pm_5424)))((Pair_5065([]))([]))
      } else if(p_5425.$tag==2){
        var $phi$563 = (((lookup_5087($import1$instance$Hashable$13))($import1$instance$Eq$1))(p_5425.$1))(cons_5423);
        if(($phi$563.$tag==0)&&($phi$563.$0.$tag==1)){
          var $phi$562 = JSBool_5226(true)
        } else if(($phi$563.$tag==0)&&($phi$563.$0.$tag==0)){
          var $phi$562 = ((JSBinOp_5232("=="))((JSIndex_5234(pm_5424))(JSString_5227("$tag"))))(JSNum_5228($phi$563.$0.$0))
        } else var $phi$562 = error(($concat("unknown data type in code gen: "))(p_5425.$1));
        var tagCheck_5440 = $phi$562;
        var $phi$561 = ((foldl(function(a_5443){
          return function(b_5444){
            var $phi$565 = (Pair_5065(((JSBinOp_5232("&&"))(a_5443.$0))(b_5444.$0)))((Pair_5065((concat(a_5443.$1.$0))(b_5444.$1.$0)))((concat(a_5443.$1.$1))(b_5444.$1.$1)));
            var $phi$564 = $phi$565;
            return $phi$564
          }
        }))((Pair_5065(tagCheck_5440))((Pair_5065([]))([]))))((map(function(p_5451){
          var $phi$566 = ((processPattern_5248(cons_5423))((JSIndex_5234(pm_5424))(JSString_5227(($concat("$"))(intToString(p_5451.$0))))))(p_5451.$1);
          return $phi$566
        }))(zipWithIndex_5134(p_5425.$2)))
      } else var $phi$561 = error("failure to match pattern during processing");
      return $phi$561
    }
  }
};
var addStmt_5238 = function(stmt_5266){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_5117))(function(s_5267){
    var $phi$567 = sets_5116((((RewriteState_5236(s_5267.$0))(s_5267.$1))((push(stmt_5266))(s_5267.$2)))(s_5267.$3));
    return $phi$567
  })
};
var addVar_5239 = function(n_5272){
  return function(e_5273){
    return addStmt_5238((JSVar_5216(opName_5255(n_5272)))(e_5273))
  }
};
var newPhi_5240 = (($gt$gt$eq($import1$instance$Monad$11))(gets_5117))(function(s_5274){
  var $phi$568 = (($gt$gt_5145($import1$instance$Monad$11))(sets_5116((((RewriteState_5236(s_5274.$0))(s_5274.$1))(s_5274.$2))(s_5274.$3+1))))((ret($import1$instance$Monad$11))(($concat("$phi$"))(intToString(s_5274.$3))));
  return $phi$568
});
var getRep_5243 = function(n_5305){
  return (($gt$gt$eq($import1$instance$Monad$11))(gets_5117))(function(s_5306){
    var $phi$569 = (ret($import1$instance$Monad$11))((((lookup_5087($import1$instance$Hashable$13))($import1$instance$Eq$1))(n_5305))(s_5306.$1));
    return $phi$569
  })
};
var getCons_5244 = (($gt$gt$eq($import1$instance$Monad$11))(gets_5117))(function(s_5311){
  var $phi$570 = (ret($import1$instance$Monad$11))(s_5311.$0);
  return $phi$570
});
var dataConFieldIds_5252 = function(ts_5465){
  return (map(function(p_5466){
    return ($concat("$"))(intToString(fst_5079(p_5466)))
  }))(zipWithIndex_5134(ts_5465))
};
var withRep_5242 = function(rep_5292){
  return function(m_5293){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_5117))(function(s_5294){
      var $phi$571 = (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_5145($import1$instance$Monad$11))(sets_5116((((RewriteState_5236(s_5294.$0))((((mergeTrie_5101($import1$instance$Hashable$13))($import1$instance$Eq$1))(s_5294.$1))(rep_5292)))(s_5294.$2))(s_5294.$3))))(m_5293)))(function(r_5299){
        return (($gt$gt$eq($import1$instance$Monad$11))(gets_5117))(function(s_5300){
          var $phi$572 = (($gt$gt_5145($import1$instance$Monad$11))(sets_5116((((RewriteState_5236(s_5300.$0))(s_5294.$1))(s_5300.$2))(s_5300.$3))))((ret($import1$instance$Monad$11))(r_5299));
          return $phi$572
        })
      });
      return $phi$571
    })
  }
};
var binOp2_5237 = function(op_5261){
  return function(a_5262){
    return function(b_5263){
      return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5245(a_5262)))(function(a_5264){
        return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5245(b_5263)))(function(b_5265){
          return (ret($import1$instance$Monad$11))(((JSBinOp_5232(op_5261))(a_5264))(b_5265))
        })
      })
    }
  }
};
var rewriteExprToStmts_5241 = function(w_5279){
  return function(e_5280){
    return (($gt$gt$eq($import1$instance$Monad$11))(gets_5117))(function(s_5281){
      var $phi$573 = (($gt$gt$eq($import1$instance$Monad$11))((($gt$gt_5145($import1$instance$Monad$11))(sets_5116((((RewriteState_5236(s_5281.$0))(s_5281.$1))([]))(s_5281.$3))))(rewriteExpr_5245(e_5280))))(function(e_5286){
        return (($gt$gt$eq($import1$instance$Monad$11))(gets_5117))(function(s_5287){
          var $phi$574 = (($gt$gt_5145($import1$instance$Monad$11))(sets_5116((((RewriteState_5236(s_5287.$0))(s_5287.$1))(s_5281.$2))(s_5287.$3))))((ret($import1$instance$Monad$11))((push(w_5279(e_5286)))(s_5287.$2)));
          return $phi$574
        })
      });
      return $phi$573
    })
  }
};
var rewriteExpr_5245 = function(e_5316){
  if((e_5316.$tag==0)&&("True"==e_5316.$1)){
    var $phi$575 = (ret($import1$instance$Monad$11))(JSBool_5226(true))
  } else if((e_5316.$tag==0)&&("False"==e_5316.$1)){
    var $phi$575 = (ret($import1$instance$Monad$11))(JSBool_5226(false))
  } else if(e_5316.$tag==0){
    var $phi$575 = (($gt$gt$eq($import1$instance$Monad$11))(getRep_5243(opName_5255(e_5316.$1))))(function(r_5321){
      if(r_5321.$tag==1){
        var $phi$580 = (ret($import1$instance$Monad$11))(JSRef_5235(opName_5255(e_5316.$1)))
      } else if(r_5321.$tag==0){
        var $phi$580 = (ret($import1$instance$Monad$11))(r_5321.$0)
      } else error("pattern match fail",r_5321);
      return $phi$580
    })
  } else if((e_5316.$tag==1)&&(e_5316.$1.$tag==0)){
    var $phi$575 = (ret($import1$instance$Monad$11))(JSNum_5228(e_5316.$1.$0))
  } else if((e_5316.$tag==1)&&(e_5316.$1.$tag==1)){
    var $phi$575 = (ret($import1$instance$Monad$11))(JSString_5227(e_5316.$1.$0))
  } else if((e_5316.$tag==2)&&((e_5316.$1.$tag==2)&&((e_5316.$1.$1.$tag==0)&&("+"==e_5316.$1.$1.$1)))){
    var $phi$575 = ((binOp2_5237("+"))(e_5316.$1.$2))(e_5316.$2)
  } else if((e_5316.$tag==2)&&((e_5316.$1.$tag==2)&&((e_5316.$1.$1.$tag==0)&&("-"==e_5316.$1.$1.$1)))){
    var $phi$575 = ((binOp2_5237("-"))(e_5316.$1.$2))(e_5316.$2)
  } else if((e_5316.$tag==2)&&((e_5316.$1.$tag==2)&&((e_5316.$1.$1.$tag==0)&&("*"==e_5316.$1.$1.$1)))){
    var $phi$575 = ((binOp2_5237("*"))(e_5316.$1.$2))(e_5316.$2)
  } else if((e_5316.$tag==2)&&((e_5316.$1.$tag==2)&&((e_5316.$1.$1.$tag==0)&&("jsLt"==e_5316.$1.$1.$1)))){
    var $phi$575 = ((binOp2_5237("<"))(e_5316.$1.$2))(e_5316.$2)
  } else if((e_5316.$tag==2)&&((e_5316.$1.$tag==2)&&((e_5316.$1.$1.$tag==0)&&("jsEq"==e_5316.$1.$1.$1)))){
    var $phi$575 = ((binOp2_5237("==="))(e_5316.$1.$2))(e_5316.$2)
  } else if((e_5316.$tag==2)&&((e_5316.$1.$tag==2)&&((e_5316.$1.$1.$tag==0)&&("bitAnd"==e_5316.$1.$1.$1)))){
    var $phi$575 = ((binOp2_5237("&"))(e_5316.$1.$2))(e_5316.$2)
  } else if((e_5316.$tag==2)&&((e_5316.$1.$tag==2)&&((e_5316.$1.$1.$tag==0)&&("bitOr"==e_5316.$1.$1.$1)))){
    var $phi$575 = ((binOp2_5237("|"))(e_5316.$1.$2))(e_5316.$2)
  } else if((e_5316.$tag==2)&&((e_5316.$1.$tag==2)&&((e_5316.$1.$1.$tag==0)&&("bitShiftLeft"==e_5316.$1.$1.$1)))){
    var $phi$575 = ((binOp2_5237("<<"))(e_5316.$1.$2))(e_5316.$2)
  } else if((e_5316.$tag==2)&&((e_5316.$1.$tag==2)&&((e_5316.$1.$1.$tag==0)&&("bitShiftRight"==e_5316.$1.$1.$1)))){
    var $phi$575 = ((binOp2_5237(">>>"))(e_5316.$1.$2))(e_5316.$2)
  } else if(e_5316.$tag==2){
    var $phi$575 = (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5245(e_5316.$1)))(function(f_5375){
      return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5245(e_5316.$2)))(function(a_5376){
        return (ret($import1$instance$Monad$11))((JSCall_5231(f_5375))([a_5376]))
      })
    })
  } else if(e_5316.$tag==3){
    var $phi$575 = (($gt$gt$eq($import1$instance$Monad$11))((rewriteExprToStmts_5241(JSReturn_5217))(e_5316.$2)))(function(stmts_5380){
      return (ret($import1$instance$Monad$11))((JSFun_5230([e_5316.$1]))(stmts_5380))
    })
  } else if(e_5316.$tag==4){
    var $phi$575 = (($gt$gt$eq($import1$instance$Monad$11))(newPhi_5240))(function(phiOut_5384){
      return (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5245(e_5316.$1)))(function(e_5385){
        if(e_5385.$tag==0){
          var $phi$579 = (ret($import1$instance$Monad$11))(e_5385)
        } else if(e_5385.$tag==1){
          var $phi$579 = (ret($import1$instance$Monad$11))(e_5385)
        } else var $phi$579 = (($gt$gt$eq($import1$instance$Monad$11))(newPhi_5240))(function(p_5390){
          return (($gt$gt_5145($import1$instance$Monad$11))((addVar_5239(p_5390))(e_5385)))((ret($import1$instance$Monad$11))(JSRef_5235(p_5390)))
        });
        return (($gt$gt$eq($import1$instance$Monad$11))($phi$579))(function(phiIn_5391){
          return (($gt$gt_5145($import1$instance$Monad$11))((($gt$gt$eq($import1$instance$Monad$11))((((foldM_5118($import1$instance$Monad$11))((assemblePatternMatch2_5246(phiIn_5391))(phiOut_5384)))(JSExpr_5218((JSCall_5231(JSRef_5235("error")))([JSString_5227("pattern match fail"),phiIn_5391]))))(reverse_5123(e_5316.$2))))(addStmt_5238)))((ret($import1$instance$Monad$11))(JSRef_5235(phiOut_5384)))
        })
      })
    })
  } else if(e_5316.$tag==5){
    var $phi$575 = (($gt$gt_5145($import1$instance$Monad$11))(((mapM_5119($import1$instance$Monad$11))(function(d_5395){
      var $phi$578 = (($gt$gt$eq($import1$instance$Monad$11))(rewriteExpr_5245(d_5395.$1)))(addVar_5239(d_5395.$0));
      return $phi$578
    }))(e_5316.$1)))(rewriteExpr_5245(e_5316.$2))
  } else if((e_5316.$tag==6)&&("Array"==e_5316.$1)){
    var $phi$575 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_5119($import1$instance$Monad$11))(rewriteExpr_5245))(e_5316.$2)))(function(es_5400){
      return (ret($import1$instance$Monad$11))(JSArray_5224(es_5400))
    })
  } else if(e_5316.$tag==6){
    var $phi$575 = (($gt$gt$eq($import1$instance$Monad$11))(((mapM_5119($import1$instance$Monad$11))(rewriteExpr_5245))(e_5316.$2)))(function(es_5404){
      return (($gt$gt$eq($import1$instance$Monad$11))(getCons_5244))(function(cons_5405){
        var $phi$577 = (((lookup_5087($import1$instance$Hashable$13))($import1$instance$Eq$1))(e_5316.$1))(cons_5405);
        if($phi$577.$tag==1){
          var $phi$576 = error(($concat("unrecognized tag in New: "))(e_5316.$1))
        } else if(($phi$577.$tag==0)&&($phi$577.$0.$tag==1)){
          var $phi$576 = (ret($import1$instance$Monad$11))(JSObject_5225((zip_5132(dataConFieldIds_5252(es_5404)))(es_5404)))
        } else if(($phi$577.$tag==0)&&($phi$577.$0.$tag==0)){
          var $phi$576 = (ret($import1$instance$Monad$11))(JSObject_5225((push((Pair_5065("$tag"))(JSNum_5228($phi$577.$0.$0))))((zip_5132(dataConFieldIds_5252(es_5404)))(es_5404))))
        } else error("pattern match fail",$phi$577);
        return $phi$576
      })
    })
  } else error("pattern match fail",e_5316);
  return $phi$575
};
var assemblePatternMatch2_5246 = function(phiIn_5407){
  return function(phiOut_5408){
    return function(alt_5409){
      return function(p_5410){
        return (($gt$gt$eq($import1$instance$Monad$11))(getCons_5244))(function(cons_5411){
          var $phi$583 = ((processPattern_5248(cons_5411))(phiIn_5407))(p_5410.$0);
          var rep_5417 = ((foldl(function(r_5418){
            return function(p_5419){
              return ((((insert_5095($import1$instance$Hashable$13))($import1$instance$Eq$1))(fst_5079(p_5419)))(snd_5069(p_5419)))(r_5418)
            }
          }))(Empty_5074))((zip_5132($phi$583.$1.$0))($phi$583.$1.$1));
          var $phi$582 = (($gt$gt$eq($import1$instance$Monad$11))((withRep_5242(rep_5417))((rewriteExprToStmts_5241(JSVar_5216(phiOut_5408)))(p_5410.$1))))(function(stmts_5420){
            return (ret($import1$instance$Monad$11))(((JSIf_5212($phi$583.$0))(stmts_5420))([alt_5409]))
          });
          var $phi$581 = $phi$582;
          return $phi$581
        })
      }
    }
  }
};
var requireExpr_5249 = function(f_5455){
  return (JSCall_5231(JSRef_5235("_require")))([JSString_5227(f_5455)])
};
var buildImports_5250 = function(f_5456){
  return function(ns_5457){
    return (map(function(n_5458){
      var $phi$584 = (JSVar_5216(opName_5255(n_5458.$1)))((JSIndex_5234(requireExpr_5249(f_5456)))(JSString_5227(opName_5255(n_5458.$0))));
      return $phi$584
    }))(ns_5457)
  }
};
var importToJs_5251 = function(i_5461){
  if(i_5461.$tag==1){
    var $phi$585 = (buildImports_5250(i_5461.$1))(i_5461.$2)
  } else error("pattern match fail",i_5461);
  return $phi$585
};
var exportObject_5253 = function(bs_5467){
  var f_5468 = function(b_5469){
    var $phi$588 = (((getAnn_5167($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(annOf_5171(b_5469.$1));
    if($phi$588.$tag==1){
      var $phi$587 = Nothing_5072
    } else if(($phi$588.$tag==0)&&($phi$588.$0.$tag==5)){
      var $phi$587 = Just_5071((Pair_5065(opName_5255($phi$588.$0.$0)))(JSRef_5235(opName_5255(b_5469.$0))))
    } else error("pattern match fail",$phi$588);
    var $phi$586 = $phi$587;
    return $phi$586
  };
  return JSObject_5225((mapJust_5130(f_5468))(bs_5467))
};
var moduleToJs_5254 = function(m_5473){
  var f_5492 = function(p_5493){
    var $phi$590 = not_5092(isJust_5073((((getAnn_5167($import1$instance$Hashable$13))($import1$instance$Eq$1))("dead"))(annOf_5171(p_5493.$1))));
    return $phi$590
  };
  var vs2_5484 = (filter(f_5492))(m_5473.$6);
  var exportDef_5486 = (JSVar_5216("exports"))(exportObject_5253(vs2_5484));
  var gatherCons_5482 = function(local$instance$Hashable$1){
    return function(local$instance$Eq$0){
      return function(m_5487){
        return function(d_5488){
          var $phi$593 = (((getAnn_5167($import1$instance$Hashable$13))($import1$instance$Eq$1))("data"))(annOf_5171(d_5488.$1));
          if($phi$593.$tag==1){
            var $phi$592 = m_5487
          } else if(($phi$593.$tag==0)&&($phi$593.$0.$tag==3)){
            var $phi$592 = ((((insert_5095(local$instance$Hashable$1))(local$instance$Eq$0))(d_5488.$0))($phi$593.$0.$0))(m_5487)
          } else error("pattern match fail",$phi$593);
          var $phi$591 = $phi$592;
          return $phi$591
        }
      }
    }
  };
  var cons_5483 = ((foldl((gatherCons_5482($import1$instance$Hashable$13))($import1$instance$Eq$1)))(Empty_5074))(m_5473.$6);
  var defs_5485 = ($_5078(foldl1(concat)))((evalState_5115((((RewriteState_5236(cons_5483))(Empty_5074))([]))(0)))(((mapM_5119($import1$instance$Monad$11))(function(v_5496){
    var $phi$594 = (rewriteExprToStmts_5241(JSVar_5216(opName_5255(v_5496.$0))))(v_5496.$1);
    return $phi$594
  }))(vs2_5484)));
  var imports_5481 = (concatMap_5131(importToJs_5251))(m_5473.$2);
  var $phi$589 = (push(exportDef_5486))((concat(imports_5481))(defs_5485));
  return $phi$589
};
var checkUndefined_5247 = function(label_5421){
  return function(expr_5422){
    return ((JSTernary_5229(((JSBinOp_5232("==="))(expr_5422))(JSUndefined_5222)))((JSCall_5231(JSRef_5235("error")))([JSString_5227(label_5421)])))(expr_5422)
  }
};
var Pair_5505 = Pair_3;
var mapSnd_5506 = mapSnd_84;
var mapFst_5507 = mapFst_83;
var $gt$eq$gt_5508 = $gt$eq$gt_82;
var snd_5509 = snd_23;
var debug2_5510 = debug2_81;
var Just_5511 = Just_1;
var Nothing_5512 = Nothing_2;
var isJust_5513 = isJust_21;
var Empty_5514 = Empty_7;
var Leaf_5515 = Leaf_8;
var Collision_5516 = Collision_9;
var BitmapIndexed_5517 = BitmapIndexed_10;
var $_5518 = $_12;
var fst_5519 = fst_22;
var Left_5520 = Left_4;
var Right_5521 = Right_5;
var loop_5522 = loop_27;
var find_5523 = find_29;
var hamtMask_5524 = hamtMask_58;
var popCount_5525 = popCount_57;
var hamtIndex_5526 = hamtIndex_59;
var lookup_5527 = lookup_60;
var setContains_5528 = setContains_76;
var foldTrie_5529 = foldTrie_66;
var emptySet_5530 = emptySet_72;
var Unit_5531 = Unit_0;
var not_5532 = not_26;
var $div$eq_5533 = $div$eq_13;
var mapIx_5534 = mapIx_30;
var insert_5535 = insert_61;
var setAdd_5536 = setAdd_73;
var setIntersection_5537 = setIntersection_80;
var remove_5538 = remove_63;
var setDiff_5539 = setDiff_79;
var setToArray_5540 = setToArray_78;
var mergeTrie_5541 = mergeTrie_70;
var setUnion_5542 = setUnion_77;
var setRemove_5543 = setRemove_75;
var setAddAll_5544 = setAddAll_74;
var trieKeys_5545 = trieKeys_71;
var size_5546 = size_68;
var mapTrie_5547 = mapTrie_67;
var nodeMask_5548 = nodeMask_56;
var isEmpty_5549 = isEmpty_69;
var filterTrie_5550 = filterTrie_65;
var nextSetBitMask_5551 = nextSetBitMask_64;
var updateOrSet_5552 = updateOrSet_62;
var State_5553 = State_6;
var runState_5554 = runState_54;
var evalState_5555 = evalState_55;
var sets_5556 = sets_53;
var gets_5557 = gets_52;
var foldM_5558 = foldM_49;
var mapM_5559 = mapM_50;
var forM_5560 = forM_51;
var strToArray_5561 = strToArray_48;
var toRecord_5562 = toRecord_47;
var reverse_5563 = reverse_46;
var tail_5564 = tail_41;
var head_5565 = head_40;
var uniq_5566 = uniq_45;
var mergeSet_5567 = mergeSet_44;
var init_5568 = init_43;
var last_5569 = last_42;
var mapJust_5570 = mapJust_39;
var concatMap_5571 = concatMap_38;
var zip_5572 = zip_37;
var zipWithIndex2_5573 = zipWithIndex2_35;
var zipWithIndex_5574 = zipWithIndex_36;
var join_5575 = join_34;
var all_5576 = all_33;
var exists_5577 = exists_32;
var containsChar_5578 = containsChar_31;
var contains_5579 = contains_28;
var either_5580 = either_24;
var splitEither_5581 = splitEither_25;
var fromJust_5582 = fromJust_20;
var justOr_5583 = justOr_19;
var maybe_5584 = maybe_18;
var $gt$gt_5585 = $gt$gt_17;
var $gt$eq_5586 = $gt$eq_16;
var $lt$eq_5587 = $lt$eq_15;
var $gt_5588 = $gt_14;
var Identity_5589 = Identity_11;
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
var moduleToJs_5590 = moduleToJs_5254;
var jsExprToString_5591 = jsExprToString_4986;
var jsStmtToString_5592 = jsStmtToString_4989;
var rewriteStmt_5593 = rewriteStmt_4829;
var compileModule_5594 = function(builtinsPath_5595){
  return function(m_5596){
    var runStmt_5600 = "if (module.exports.main)module.exports.main(process.argv)";
    var requireFun_5599 = ($concat(($concat(($concat(($concat(($concat("var cache = {}\n"))("function _require(f) {\n")))("  return cache[f] || require(f == \"./builtins.js\" ? process.cwd() + \"/\" + \"")))(builtinsPath_5595)))("\" : f);\n")))("}\n");
    var js_5597 = (join_5575((map(jsStmtToString_5592(0)))((concatMap_5571(rewriteStmt_5593))(moduleToJs_5590(m_5596)))))(";\n");
    var wrapModule_5598 = function(m_5601){
      return ($concat(($concat("(function() {"))(js_5597)))("\nmodule.exports = exports;})();")
    };
    return ($concat(($concat(requireFun_5599))(wrapModule_5598(m_5596))))(runStmt_5600)
  }
};
var Pair_5602 = Pair_3;
var mapSnd_5603 = mapSnd_84;
var mapFst_5604 = mapFst_83;
var $gt$eq$gt_5605 = $gt$eq$gt_82;
var snd_5606 = snd_23;
var debug2_5607 = debug2_81;
var Just_5608 = Just_1;
var Nothing_5609 = Nothing_2;
var isJust_5610 = isJust_21;
var Empty_5611 = Empty_7;
var Leaf_5612 = Leaf_8;
var Collision_5613 = Collision_9;
var BitmapIndexed_5614 = BitmapIndexed_10;
var $_5615 = $_12;
var fst_5616 = fst_22;
var Left_5617 = Left_4;
var Right_5618 = Right_5;
var loop_5619 = loop_27;
var find_5620 = find_29;
var hamtMask_5621 = hamtMask_58;
var popCount_5622 = popCount_57;
var hamtIndex_5623 = hamtIndex_59;
var lookup_5624 = lookup_60;
var setContains_5625 = setContains_76;
var foldTrie_5626 = foldTrie_66;
var emptySet_5627 = emptySet_72;
var Unit_5628 = Unit_0;
var not_5629 = not_26;
var $div$eq_5630 = $div$eq_13;
var mapIx_5631 = mapIx_30;
var insert_5632 = insert_61;
var setAdd_5633 = setAdd_73;
var setIntersection_5634 = setIntersection_80;
var remove_5635 = remove_63;
var setDiff_5636 = setDiff_79;
var setToArray_5637 = setToArray_78;
var mergeTrie_5638 = mergeTrie_70;
var setUnion_5639 = setUnion_77;
var setRemove_5640 = setRemove_75;
var setAddAll_5641 = setAddAll_74;
var trieKeys_5642 = trieKeys_71;
var size_5643 = size_68;
var mapTrie_5644 = mapTrie_67;
var nodeMask_5645 = nodeMask_56;
var isEmpty_5646 = isEmpty_69;
var filterTrie_5647 = filterTrie_65;
var nextSetBitMask_5648 = nextSetBitMask_64;
var updateOrSet_5649 = updateOrSet_62;
var State_5650 = State_6;
var runState_5651 = runState_54;
var evalState_5652 = evalState_55;
var sets_5653 = sets_53;
var gets_5654 = gets_52;
var foldM_5655 = foldM_49;
var mapM_5656 = mapM_50;
var forM_5657 = forM_51;
var strToArray_5658 = strToArray_48;
var toRecord_5659 = toRecord_47;
var reverse_5660 = reverse_46;
var tail_5661 = tail_41;
var head_5662 = head_40;
var uniq_5663 = uniq_45;
var mergeSet_5664 = mergeSet_44;
var init_5665 = init_43;
var last_5666 = last_42;
var mapJust_5667 = mapJust_39;
var concatMap_5668 = concatMap_38;
var zip_5669 = zip_37;
var zipWithIndex2_5670 = zipWithIndex2_35;
var zipWithIndex_5671 = zipWithIndex_36;
var join_5672 = join_34;
var all_5673 = all_33;
var exists_5674 = exists_32;
var containsChar_5675 = containsChar_31;
var contains_5676 = contains_28;
var either_5677 = either_24;
var splitEither_5678 = splitEither_25;
var fromJust_5679 = fromJust_20;
var justOr_5680 = justOr_19;
var maybe_5681 = maybe_18;
var $gt$gt_5682 = $gt$gt_17;
var $gt$eq_5683 = $gt$eq_16;
var $lt$eq_5684 = $lt$eq_15;
var $gt_5685 = $gt_14;
var Identity_5686 = Identity_11;
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
var Success_5687 = function($_0_5702){
  return function($_1_5703){
    return {$0:$_0_5702,$1:$_1_5703,$tag:0}
  }
};
var Error_5688 = function($_0_5704){
  return {$0:$_0_5704,$tag:1}
};
var Parser_5689 = function($_0_5705){
  return {$0:$_0_5705}
};
var $instance$Functor$0 = $class$Functor(function(f_5739){
  return function(pa_5740){
    var $phi$595 = Parser_5689(function(i_5742){
      var $phi$597 = pa_5740.$0(i_5742);
      if($phi$597.$tag==1){
        var $phi$596 = Error_5688($phi$597.$0)
      } else if($phi$597.$tag==0){
        var $phi$596 = (Success_5687(f_5739($phi$597.$0)))($phi$597.$1)
      } else error("pattern match fail",$phi$597);
      return $phi$596
    });
    return $phi$595
  }
});
var $instance$Applicative$1 = ($class$Applicative(function(x_5746){
  return Parser_5689(Success_5687(x_5746))
}))(function(pf_5747){
  return function(pa_5748){
    var $phi$599 = Parser_5689(function(i_5751){
      var $phi$601 = pf_5747.$0(i_5751);
      if($phi$601.$tag==1){
        var $phi$600 = Error_5688($phi$601.$0)
      } else if($phi$601.$tag==0){
        var $phi$603 = pa_5748.$0($phi$601.$1);
        if($phi$603.$tag==1){
          var $phi$602 = Error_5688($phi$603.$0)
        } else if($phi$603.$tag==0){
          var $phi$602 = (Success_5687($phi$601.$0($phi$603.$0)))($phi$603.$1)
        } else error("pattern match fail",$phi$603);
        var $phi$600 = $phi$602
      } else error("pattern match fail",$phi$601);
      return $phi$600
    });
    var $phi$598 = $phi$599;
    return $phi$598
  }
});
var $instance$Alternative$2 = ($class$Alternative(Parser_5689(function(__5758){
  return Error_5688("parser failure")
})))(function(pa_5759){
  return function(pb_5760){
    var $phi$605 = Parser_5689(function(i_5763){
      var $phi$607 = pa_5759.$0(i_5763);
      if($phi$607.$tag==1){
        var $phi$606 = pb_5760.$0(i_5763)
      } else if($phi$607.$tag==0){
        var $phi$606 = (Success_5687($phi$607.$0))($phi$607.$1)
      } else error("pattern match fail",$phi$607);
      return $phi$606
    });
    var $phi$604 = $phi$605;
    return $phi$604
  }
});
var upperCaseLetters_5700 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var letters_5701 = ($concat("abcdefghijklmnopqrstuvwxyz"))(upperCaseLetters_5700);
var digits_5699 = "0123456789";
var applyParser_5690 = function(p_5706){
  return function(i_5707){
    var $phi$608 = p_5706.$0(i_5707);
    return $phi$608
  }
};
var many_5693 = function(p_5717){
  var manyIterate_5718 = function(s_5719){
    var r_5720 = ((iterate(Left_5617((Success_5687([]))(s_5719))))(function(r_5721){
      if(r_5721.$tag==0){
        var $phi$609 = false
      } else if(r_5721.$tag==1){
        var $phi$609 = true
      } else error("pattern match fail",r_5721);
      return $phi$609
    }))(function(rs_5724){
      if((rs_5724.$tag==0)&&(rs_5724.$0.$tag==0)){
        var $phi$612 = (applyParser_5690(p_5717))(rs_5724.$0.$1);
        if($phi$612.$tag==0){
          var $phi$611 = Left_5617((Success_5687((push($phi$612.$0))(rs_5724.$0.$0)))($phi$612.$1))
        } else if($phi$612.$tag==1){
          var $phi$611 = Right_5618((Success_5687(rs_5724.$0.$0))(rs_5724.$0.$1))
        } else error("pattern match fail",$phi$612);
        var $phi$610 = $phi$611
      } else error("pattern match fail",rs_5724);
      return $phi$610
    });
    if(r_5720.$tag==1){
      var $phi$613 = r_5720.$0
    } else if(r_5720.$tag==0){
      var $phi$613 = error("manyIterate should never return a Left")
    } else error("pattern match fail",r_5720);
    return $phi$613
  };
  return Parser_5689(manyIterate_5718)
};
var $pip$gt_5691 = function(local$instance$Applicative$0){
  return function(a_5709){
    return function(b_5710){
      return (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(function(__5711){
        return function(b_5712){
          return b_5712
        }
      })))(a_5709)))(b_5710)
    }
  }
};
var sepBy1_5696 = function(p_5734){
  return function(sp_5735){
    return (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(enqueue)))(p_5734)))(many_5693((($pip$gt_5691($instance$Applicative$1))(sp_5735))(p_5734)))
  }
};
var success_5695 = function(a_5733){
  return Parser_5689(Success_5687(a_5733))
};
var opt_5698 = function(a_5738){
  return (($lt$pip$gt($instance$Alternative$2))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(Just_5608)))(a_5738)))(success_5695(Nothing_5609))
};
var sepBy_5697 = function(p_5736){
  return function(sp_5737){
    return (($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(justOr_5680([]))))(opt_5698((sepBy1_5696(p_5736))(sp_5737)))
  }
};
var some_5694 = function(p_5732){
  return (($lt$mul$gt($instance$Applicative$1))((($lt$mul$gt($instance$Applicative$1))((pure($instance$Applicative$1))(enqueue)))(p_5732)))(many_5693(p_5732))
};
var $lt$pip_5692 = function(local$instance$Applicative$0){
  return function(a_5713){
    return function(b_5714){
      return (($lt$mul$gt(local$instance$Applicative$0))((($lt$mul$gt(local$instance$Applicative$0))((pure(local$instance$Applicative$0))(function(a_5715){
        return function(__5716){
          return a_5715
        }
      })))(a_5713)))(b_5714)
    }
  }
};
var Pair_5767 = Pair_3;
var mapSnd_5768 = mapSnd_84;
var mapFst_5769 = mapFst_83;
var $gt$eq$gt_5770 = $gt$eq$gt_82;
var snd_5771 = snd_23;
var debug2_5772 = debug2_81;
var Just_5773 = Just_1;
var Nothing_5774 = Nothing_2;
var isJust_5775 = isJust_21;
var Empty_5776 = Empty_7;
var Leaf_5777 = Leaf_8;
var Collision_5778 = Collision_9;
var BitmapIndexed_5779 = BitmapIndexed_10;
var $_5780 = $_12;
var fst_5781 = fst_22;
var Left_5782 = Left_4;
var Right_5783 = Right_5;
var loop_5784 = loop_27;
var find_5785 = find_29;
var hamtMask_5786 = hamtMask_58;
var popCount_5787 = popCount_57;
var hamtIndex_5788 = hamtIndex_59;
var lookup_5789 = lookup_60;
var setContains_5790 = setContains_76;
var foldTrie_5791 = foldTrie_66;
var emptySet_5792 = emptySet_72;
var Unit_5793 = Unit_0;
var not_5794 = not_26;
var $div$eq_5795 = $div$eq_13;
var mapIx_5796 = mapIx_30;
var insert_5797 = insert_61;
var setAdd_5798 = setAdd_73;
var setIntersection_5799 = setIntersection_80;
var remove_5800 = remove_63;
var setDiff_5801 = setDiff_79;
var setToArray_5802 = setToArray_78;
var mergeTrie_5803 = mergeTrie_70;
var setUnion_5804 = setUnion_77;
var setRemove_5805 = setRemove_75;
var setAddAll_5806 = setAddAll_74;
var trieKeys_5807 = trieKeys_71;
var size_5808 = size_68;
var mapTrie_5809 = mapTrie_67;
var nodeMask_5810 = nodeMask_56;
var isEmpty_5811 = isEmpty_69;
var filterTrie_5812 = filterTrie_65;
var nextSetBitMask_5813 = nextSetBitMask_64;
var updateOrSet_5814 = updateOrSet_62;
var State_5815 = State_6;
var runState_5816 = runState_54;
var evalState_5817 = evalState_55;
var sets_5818 = sets_53;
var gets_5819 = gets_52;
var foldM_5820 = foldM_49;
var mapM_5821 = mapM_50;
var forM_5822 = forM_51;
var strToArray_5823 = strToArray_48;
var toRecord_5824 = toRecord_47;
var reverse_5825 = reverse_46;
var tail_5826 = tail_41;
var head_5827 = head_40;
var uniq_5828 = uniq_45;
var mergeSet_5829 = mergeSet_44;
var init_5830 = init_43;
var last_5831 = last_42;
var mapJust_5832 = mapJust_39;
var concatMap_5833 = concatMap_38;
var zip_5834 = zip_37;
var zipWithIndex2_5835 = zipWithIndex2_35;
var zipWithIndex_5836 = zipWithIndex_36;
var join_5837 = join_34;
var all_5838 = all_33;
var exists_5839 = exists_32;
var containsChar_5840 = containsChar_31;
var contains_5841 = contains_28;
var either_5842 = either_24;
var splitEither_5843 = splitEither_25;
var fromJust_5844 = fromJust_20;
var justOr_5845 = justOr_19;
var maybe_5846 = maybe_18;
var $gt$gt_5847 = $gt$gt_17;
var $gt$eq_5848 = $gt$eq_16;
var $lt$eq_5849 = $lt$eq_15;
var $gt_5850 = $gt_14;
var Identity_5851 = Identity_11;
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
var upperCaseLetters_5852 = upperCaseLetters_5700;
var letters_5853 = letters_5701;
var digits_5854 = digits_5699;
var Success_5855 = Success_5687;
var Error_5856 = Error_5688;
var Parser_5857 = Parser_5689;
var applyParser_5858 = applyParser_5690;
var many_5859 = many_5693;
var $pip$gt_5860 = $pip$gt_5691;
var sepBy1_5861 = sepBy1_5696;
var success_5862 = success_5695;
var opt_5863 = opt_5698;
var sepBy_5864 = sepBy_5697;
var some_5865 = some_5694;
var $lt$pip_5866 = $lt$pip_5692;
var $import2$instance$Functor$0 = $instance$Functor$0;
var $import2$instance$Applicative$1 = $instance$Applicative$1;
var $import2$instance$Alternative$2 = $instance$Alternative$2;
var LexerState_5867 = function($_0_5897){
  return function($_1_5898){
    return function($_2_5899){
      return function($_3_5900){
        return {$0:$_0_5897,$1:$_1_5898,$2:$_2_5899,$3:$_3_5900}
      }
    }
  }
};
var WsTok_5868 = {$tag:0};
var Token_5875 = function($_0_5901){
  return function($_1_5902){
    return function($_2_5903){
      return function($_3_5904){
        return {$0:$_0_5901,$1:$_1_5902,$2:$_2_5903,$3:$_3_5904}
      }
    }
  }
};
var NumTok_5870 = {$tag:2};
var ComTok_5874 = {$tag:6};
var SymTok_5869 = {$tag:1};
var IdTok_5873 = {$tag:5};
var OpTok_5872 = {$tag:4};
var StrTok_5871 = {$tag:3};
var runLexer_5878 = function(p_5915){
  return function(s_5916){
    var $phi$614 = p_5915.$0((((LexerState_5867(s_5916))(0))(0))(0));
    return $phi$614
  }
};
var mkTok_5876 = function(t_5905){
  var parse_5906 = function(i_5907){
    var $phi$615 = (Success_5855(function(r_5912){
      return (((Token_5875(t_5905))(r_5912))(i_5907.$2))(i_5907.$3)
    }))(i_5907);
    return $phi$615
  };
  return Parser_5857(parse_5906)
};
var parseChar_5879 = function(p_5918){
  var parse_5919 = function(s_5920){
    var $phi$618 = (($lt($import1$instance$Ord$2))(s_5920.$1))(length(s_5920.$0));
    if(!$phi$618){
      var $phi$617 = Error_5856("no more input available")
    } else if($phi$618){
      var $phi$620 = p_5918((getChar(s_5920.$1))(s_5920.$0));
      if(!$phi$620){
        var $phi$619 = Error_5856("parser failed")
      } else if($phi$620){
        var $phi$622 = (getChar(s_5920.$1))(s_5920.$0);
        if("\n"==$phi$622){
          var $phi$621 = (Success_5855((getChar(s_5920.$1))(s_5920.$0)))((((LexerState_5867(s_5920.$0))(s_5920.$1+1))(s_5920.$2+1))(0))
        } else var $phi$621 = (Success_5855((getChar(s_5920.$1))(s_5920.$0)))((((LexerState_5867(s_5920.$0))(s_5920.$1+1))(s_5920.$2))(s_5920.$3+1));
        var $phi$619 = $phi$621
      } else error("pattern match fail",$phi$620);
      var $phi$617 = $phi$619
    } else error("pattern match fail",$phi$618);
    var $phi$616 = $phi$617;
    return $phi$616
  };
  return Parser_5857(parse_5919)
};
var charP_5881 = function(cs_5927){
  return parseChar_5879(function(c_5928){
    return (containsChar_5840(c_5928))(cs_5927)
  })
};
var concatStr_5877 = (foldl(function(cs_5913){
  return function(c_5914){
    return ($concat(cs_5913))(c_5914)
  }
}))("");
var someStr_5884 = function(p_5932){
  return (($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))(concatStr_5877)))(some_5865(p_5932))
};
var whitespaceP_5887 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5876(WsTok_5868)))(someStr_5884(charP_5881(" \n")));
var intP_5888 = someStr_5884(charP_5881(digits_5854));
var numP_5889 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5876(NumTok_5870)))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(intP_5888)))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(charP_5881("."))))(intP_5888)))((pure($import2$instance$Applicative$1))(""))));
var notCharP_5882 = function(cs_5929){
  return parseChar_5879(function(c_5930){
    return not_5794((containsChar_5840(c_5930))(cs_5929))
  })
};
var manyStr_5883 = function(p_5931){
  return (($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))(concatStr_5877)))(many_5859(p_5931))
};
var lineCommentP_5890 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5876(ComTok_5874)))((($pip$gt_5860($import2$instance$Applicative$1))((($pip$gt_5860($import2$instance$Applicative$1))(charP_5881("/")))(charP_5881("/"))))(manyStr_5883(notCharP_5882("\n"))));
var symbolP_5891 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5876(SymTok_5869)))(charP_5881("()[]{},\\"));
var identP_5892 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5876(IdTok_5873)))((($lt$mul$gt($import2$instance$Applicative$1))((($lt$mul$gt($import2$instance$Applicative$1))((pure($import2$instance$Applicative$1))($concat)))(charP_5881(($concat(letters_5853))("_")))))(manyStr_5883(charP_5881(($concat(($concat(letters_5853))(digits_5854)))("_")))));
var opIdentP_5893 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5876(IdTok_5873)))((($lt$pip_5866($import2$instance$Applicative$1))((($pip$gt_5860($import2$instance$Applicative$1))(charP_5881("(")))(someStr_5884(charP_5881("-+*/=:&|<>^$")))))(charP_5881(")")));
var opP_5894 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5876(OpTok_5872)))(someStr_5884(charP_5881("-+*/=:&|<>^$~")));
var anyCharP_5880 = parseChar_5879(function(__5926){
  return true
});
var notEndOfStringP_5935 = notCharP_5882("'");
var escapeP_5934 = (($pip$gt_5860($import2$instance$Applicative$1))(charP_5881("\\")))(anyCharP_5880);
var newLineP_5933 = (($pip$gt_5860($import2$instance$Applicative$1))((($pip$gt_5860($import2$instance$Applicative$1))(charP_5881("\\")))(charP_5881("n"))))((pure($import2$instance$Applicative$1))("\n"));
var stringCharP_5885 = (($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))(newLineP_5933))(escapeP_5934)))(notEndOfStringP_5935);
var stringP_5886 = (($lt$mul$gt($import2$instance$Applicative$1))(mkTok_5876(StrTok_5871)))((($lt$pip_5866($import2$instance$Applicative$1))((($pip$gt_5860($import2$instance$Applicative$1))(charP_5881("'")))(manyStr_5883(stringCharP_5885))))(charP_5881("'")));
var jaguarTokenP_5895 = many_5859((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))((($lt$pip$gt($import2$instance$Alternative$2))(stringP_5886))(whitespaceP_5887)))(numP_5889)))(lineCommentP_5890)))(identP_5892)))(opIdentP_5893)))(opP_5894)))(symbolP_5891));
var tokenize_5896 = runLexer_5878(jaguarTokenP_5895);
var Pair_5936 = Pair_3;
var mapSnd_5937 = mapSnd_84;
var mapFst_5938 = mapFst_83;
var $gt$eq$gt_5939 = $gt$eq$gt_82;
var snd_5940 = snd_23;
var debug2_5941 = debug2_81;
var Just_5942 = Just_1;
var Nothing_5943 = Nothing_2;
var isJust_5944 = isJust_21;
var Empty_5945 = Empty_7;
var Leaf_5946 = Leaf_8;
var Collision_5947 = Collision_9;
var BitmapIndexed_5948 = BitmapIndexed_10;
var $_5949 = $_12;
var fst_5950 = fst_22;
var Left_5951 = Left_4;
var Right_5952 = Right_5;
var loop_5953 = loop_27;
var find_5954 = find_29;
var hamtMask_5955 = hamtMask_58;
var popCount_5956 = popCount_57;
var hamtIndex_5957 = hamtIndex_59;
var lookup_5958 = lookup_60;
var setContains_5959 = setContains_76;
var foldTrie_5960 = foldTrie_66;
var emptySet_5961 = emptySet_72;
var Unit_5962 = Unit_0;
var not_5963 = not_26;
var $div$eq_5964 = $div$eq_13;
var mapIx_5965 = mapIx_30;
var insert_5966 = insert_61;
var setAdd_5967 = setAdd_73;
var setIntersection_5968 = setIntersection_80;
var remove_5969 = remove_63;
var setDiff_5970 = setDiff_79;
var setToArray_5971 = setToArray_78;
var mergeTrie_5972 = mergeTrie_70;
var setUnion_5973 = setUnion_77;
var setRemove_5974 = setRemove_75;
var setAddAll_5975 = setAddAll_74;
var trieKeys_5976 = trieKeys_71;
var size_5977 = size_68;
var mapTrie_5978 = mapTrie_67;
var nodeMask_5979 = nodeMask_56;
var isEmpty_5980 = isEmpty_69;
var filterTrie_5981 = filterTrie_65;
var nextSetBitMask_5982 = nextSetBitMask_64;
var updateOrSet_5983 = updateOrSet_62;
var State_5984 = State_6;
var runState_5985 = runState_54;
var evalState_5986 = evalState_55;
var sets_5987 = sets_53;
var gets_5988 = gets_52;
var foldM_5989 = foldM_49;
var mapM_5990 = mapM_50;
var forM_5991 = forM_51;
var strToArray_5992 = strToArray_48;
var toRecord_5993 = toRecord_47;
var reverse_5994 = reverse_46;
var tail_5995 = tail_41;
var head_5996 = head_40;
var uniq_5997 = uniq_45;
var mergeSet_5998 = mergeSet_44;
var init_5999 = init_43;
var last_6000 = last_42;
var mapJust_6001 = mapJust_39;
var concatMap_6002 = concatMap_38;
var zip_6003 = zip_37;
var zipWithIndex2_6004 = zipWithIndex2_35;
var zipWithIndex_6005 = zipWithIndex_36;
var join_6006 = join_34;
var all_6007 = all_33;
var exists_6008 = exists_32;
var containsChar_6009 = containsChar_31;
var contains_6010 = contains_28;
var either_6011 = either_24;
var splitEither_6012 = splitEither_25;
var fromJust_6013 = fromJust_20;
var justOr_6014 = justOr_19;
var maybe_6015 = maybe_18;
var $gt$gt_6016 = $gt$gt_17;
var $gt$eq_6017 = $gt$eq_16;
var $lt$eq_6018 = $lt$eq_15;
var $gt_6019 = $gt_14;
var Identity_6020 = Identity_11;
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
var App_6021 = App_726;
var Lam_6022 = Lam_727;
var Case_6023 = Case_728;
var Let_6024 = Let_729;
var New_6025 = New_730;
var breakableDownAndUpM_6026 = breakableDownAndUpM_775;
var breakableDownM_6027 = breakableDownM_779;
var downAndUpM_6028 = downAndUpM_776;
var downM_6029 = downM_778;
var upM_6030 = upM_777;
var breakableDownAndUp_6031 = breakableDownAndUp_770;
var breakableDown_6032 = breakableDown_774;
var downAndUp_6033 = downAndUp_771;
var down_6034 = down_773;
var up_6035 = up_772;
var AnnType_6036 = AnnType_718;
var TUnknown_6037 = TUnknown_749;
var getAnn_6038 = getAnn_754;
var getAnnType_6039 = getAnnType_757;
var Var_6040 = Var_724;
var Const_6041 = Const_725;
var annOf_6042 = annOf_767;
var getType_6043 = getType_769;
var withAnn_6044 = withAnn_768;
var setAnn_6045 = setAnn_755;
var setAnnType_6046 = setAnnType_758;
var setType_6047 = setType_766;
var Data_6048 = Data_738;
var DataCon_6049 = DataCon_739;
var dataConName_6050 = dataConName_764;
var dataConNames_6051 = dataConNames_765;
var TCBound_6052 = TCBound_742;
var TConst_6053 = TConst_743;
var TVar_6054 = TVar_744;
var TApp_6055 = TApp_745;
var TRow_6056 = TRow_746;
var TBot_6057 = TBot_747;
var TForall_6058 = TForall_748;
var equivBound_6059 = equivBound_762;
var equivType_6060 = equivType_763;
var AnnCodeLoc_6061 = AnnCodeLoc_719;
var printCodeLoc_6062 = printCodeLoc_761;
var setAnnCodeLoc_6063 = setAnnCodeLoc_760;
var getAnnCodeLoc_6064 = getAnnCodeLoc_759;
var copyAnn_6065 = copyAnn_756;
var emptyAnn_6066 = emptyAnn_753;
var ImportAll_6067 = ImportAll_752;
var ImportOpen_6068 = ImportOpen_751;
var ImportClosed_6069 = ImportClosed_750;
var Instance_6070 = Instance_741;
var Class_6071 = Class_740;
var ModuleInterface_6072 = ModuleInterface_737;
var Module_6073 = Module_736;
var PData_6074 = PData_735;
var PConst_6075 = PConst_734;
var PVar_6076 = PVar_733;
var CStr_6077 = CStr_732;
var CNum_6078 = CNum_731;
var AnnExport_6079 = AnnExport_723;
var AnnTag_6080 = AnnTag_722;
var AnnData_6081 = AnnData_721;
var AnnUseCount_6082 = AnnUseCount_720;
var upperCaseLetters_6083 = upperCaseLetters_5700;
var letters_6084 = letters_5701;
var digits_6085 = digits_5699;
var Success_6086 = Success_5687;
var Error_6087 = Error_5688;
var Parser_6088 = Parser_5689;
var applyParser_6089 = applyParser_5690;
var many_6090 = many_5693;
var $pip$gt_6091 = $pip$gt_5691;
var sepBy1_6092 = sepBy1_5696;
var success_6093 = success_5695;
var opt_6094 = opt_5698;
var sepBy_6095 = sepBy_5697;
var some_6096 = some_5694;
var $lt$pip_6097 = $lt$pip_5692;
var $import3$instance$Functor$0 = $instance$Functor$0;
var $import3$instance$Applicative$1 = $instance$Applicative$1;
var $import3$instance$Alternative$2 = $instance$Alternative$2;
var tokenize_6098 = tokenize_5896;
var Token_6099 = Token_5875;
var WsTok_6100 = WsTok_5868;
var SymTok_6101 = SymTok_5869;
var NumTok_6102 = NumTok_5870;
var StrTok_6103 = StrTok_5871;
var OpTok_6104 = OpTok_5872;
var IdTok_6105 = IdTok_5873;
var ComTok_6106 = ComTok_5874;
var ParserState_6107 = function($_0_6174){
  return function($_1_6175){
    return function($_2_6176){
      return function($_3_6177){
        return function($_4_6178){
          return {$0:$_0_6174,$1:$_1_6175,$2:$_2_6176,$3:$_3_6177,$4:$_4_6178}
        }
      }
    }
  }
};
var mkParserState_6108 = function(ts_6179){
  return function(f_6180){
    var $phi$624 = (getIx(0))(ts_6179);
    var $phi$623 = $phi$624.$3;
    return ((((ParserState_6107(ts_6179))(0))($phi$623))(0))(f_6180)
  }
};
var filterWhitespaceAndComments_6109 = filter(function(t_6185){
  if(t_6185.$0.$tag==0){
    var $phi$625 = false
  } else if(t_6185.$0.$tag==6){
    var $phi$625 = false
  } else var $phi$625 = true;
  return $phi$625
});
var runParser_6110 = function(p_6193){
  return function(s_6194){
    return function(f_6195){
      var $phi$627 = tokenize_6098(s_6194);
      if($phi$627.$tag==0){
        var $phi$626 = (applyParser_6089(p_6193))((mkParserState_6108(filterWhitespaceAndComments_6109($phi$627.$0)))(f_6195))
      } else if($phi$627.$tag==1){
        var $phi$626 = Error_6087($phi$627.$0)
      } else error("pattern match fail",$phi$627);
      return $phi$626
    }
  }
};
var $lt$mul$mns$gt_6113 = function(pf_6227){
  return function(pa_6228){
    var parse_6231 = function(s_6232){
      var $phi$632 = pf_6227.$0(s_6232);
      if($phi$632.$tag==0){
        var $phi$634 = pa_6228.$0(((((ParserState_6107($phi$632.$1.$0))($phi$632.$1.$1))($phi$632.$1.$2))(s_6232.$2+1))($phi$632.$1.$4));
        if($phi$634.$tag==0){
          var $phi$633 = (Success_6086($phi$632.$0($phi$634.$0)))(((((ParserState_6107($phi$634.$1.$0))($phi$634.$1.$1))($phi$634.$1.$2))(s_6232.$3))($phi$634.$1.$4))
        } else if($phi$634.$tag==1){
          var $phi$633 = Error_6087($phi$634.$0)
        } else error("pattern match fail",$phi$634);
        var $phi$631 = $phi$633
      } else if($phi$632.$tag==1){
        var $phi$631 = Error_6087($phi$632.$0)
      } else error("pattern match fail",$phi$632);
      var $phi$630 = $phi$631;
      return $phi$630
    };
    var $phi$629 = Parser_6088(parse_6231);
    var $phi$628 = $phi$629;
    return $phi$628
  }
};
var parseToken_6111 = function(f_6199){
  var parse_6200 = function(s_6201){
    var $phi$637 = (($lt($import1$instance$Ord$2))(s_6201.$1))(length(s_6201.$0));
    if(!$phi$637){
      var $phi$636 = Error_6087("run out of tokens")
    } else if($phi$637){
      var $phi$639 = (getIx(s_6201.$1))(s_6201.$0);
      var $phi$641 = (($lt($import1$instance$Ord$2))($phi$639.$3))(s_6201.$3);
      if($phi$641){
        var $phi$640 = Error_6087("token not indented sufficiently")
      } else if(!$phi$641){
        var $phi$643 = f_6199((getIx(s_6201.$1))(s_6201.$0));
        if($phi$643.$tag==1){
          var $phi$642 = Error_6087("parser fun failed")
        } else if($phi$643.$tag==0){
          var $phi$645 = (($lt($import1$instance$Ord$2))(s_6201.$1+1))(length(s_6201.$0));
          if(!$phi$645){
            var $phi$644 = (Success_6086($phi$643.$0))(((((ParserState_6107(s_6201.$0))(s_6201.$1+1))(s_6201.$2))(s_6201.$3))(s_6201.$4))
          } else if($phi$645){
            var $phi$647 = (getIx(s_6201.$1+1))(s_6201.$0);
            var $phi$649 = (($gt_6019($import1$instance$Ord$2))($phi$647.$2))($phi$639.$2);
            if(!$phi$649){
              var $phi$648 = (Success_6086($phi$643.$0))(((((ParserState_6107(s_6201.$0))(s_6201.$1+1))(s_6201.$2))(s_6201.$3))(s_6201.$4))
            } else if($phi$649){
              var $phi$648 = (Success_6086($phi$643.$0))(((((ParserState_6107(s_6201.$0))(s_6201.$1+1))($phi$647.$3))(s_6201.$3))(s_6201.$4))
            } else error("pattern match fail",$phi$649);
            var $phi$646 = $phi$648;
            var $phi$644 = $phi$646
          } else error("pattern match fail",$phi$645);
          var $phi$642 = $phi$644
        } else error("pattern match fail",$phi$643);
        var $phi$640 = $phi$642
      } else error("pattern match fail",$phi$641);
      var $phi$638 = $phi$640;
      var $phi$636 = $phi$638
    } else error("pattern match fail",$phi$637);
    var $phi$635 = $phi$636;
    return $phi$635
  };
  return Parser_6088(parse_6200)
};
var operatorP_6117 = function(s_6262){
  return parseToken_6111(function(t_6263){
    if(t_6263.$0.$tag==4){
      var $phi$652 = (($eq$eq($import1$instance$Eq$1))(t_6263.$1))(s_6262);
      if($phi$652){
        var $phi$651 = Just_5942(s_6262)
      } else if(!$phi$652){
        var $phi$651 = Nothing_5943
      } else error("pattern match fail",$phi$652);
      var $phi$650 = $phi$651
    } else var $phi$650 = Nothing_5943;
    return $phi$650
  })
};
var symP_6116 = function(s_6256){
  return parseToken_6111(function(t_6257){
    if(t_6257.$0.$tag==1){
      var $phi$655 = (($eq$eq($import1$instance$Eq$1))(t_6257.$1))(s_6256);
      if($phi$655){
        var $phi$654 = Just_5942(s_6256)
      } else if(!$phi$655){
        var $phi$654 = Nothing_5943
      } else error("pattern match fail",$phi$655);
      var $phi$653 = $phi$654
    } else var $phi$653 = Nothing_5943;
    return $phi$653
  })
};
var parenP_6123 = function(p_6294){
  return (($lt$pip_6097($import3$instance$Applicative$1))((($pip$gt_6091($import3$instance$Applicative$1))(symP_6116("(")))(p_6294)))(symP_6116(")"))
};
var reserved_6115 = ["as","class","where","instance","let","in","from","import","case","of","data"];
var notUpperCaseId_6122 = parseToken_6111(function(t_6289){
  if(t_6289.$0.$tag==5){
    var $phi$658 = (containsChar_6009((getChar(0))(t_6289.$1)))(upperCaseLetters_6083);
    if(!$phi$658){
      var $phi$660 = ((contains_6010($import1$instance$Eq$1))(t_6289.$1))(reserved_6115);
      if(!$phi$660){
        var $phi$659 = Just_5942(t_6289.$1)
      } else if($phi$660){
        var $phi$659 = Nothing_5943
      } else error("pattern match fail",$phi$660);
      var $phi$657 = $phi$659
    } else if($phi$658){
      var $phi$657 = Nothing_5943
    } else error("pattern match fail",$phi$658);
    var $phi$656 = $phi$657
  } else var $phi$656 = Nothing_5943;
  return $phi$656
});
var tvarP_6151 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(TVar_6054(emptyAnn_6066))))(notUpperCaseId_6122);
var upperCaseId_6121 = parseToken_6111(function(t_6284){
  if(t_6284.$0.$tag==5){
    var $phi$663 = (containsChar_6009((getChar(0))(t_6284.$1)))(upperCaseLetters_6083);
    if($phi$663){
      var $phi$662 = Just_5942(t_6284.$1)
    } else if(!$phi$663){
      var $phi$662 = Nothing_5943
    } else error("pattern match fail",$phi$663);
    var $phi$661 = $phi$662
  } else var $phi$661 = Nothing_5943;
  return $phi$661
});
var tconstP_6150 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(TConst_6053(emptyAnn_6066))))(upperCaseId_6121);
var typeP_6149 = Parser_6088(function(s_6354){
  return (applyParser_6089(tfunP_6154))(s_6354)
});
var simpleTypeP_6152 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(tconstP_6150))(tvarP_6151)))(parenP_6123(typeP_6149));
var tappP_6153 = ($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(foldl(TApp_6055(emptyAnn_6066)))))(simpleTypeP_6152)))(many_6090(simpleTypeP_6152));
var tfunP_6154 = ($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(t_6355){
  return function(ts_6356){
    return (foldr1(function(b_6357){
      return function(a_6358){
        return ((TApp_6055(emptyAnn_6066))(((TApp_6055(emptyAnn_6066))((TConst_6053(emptyAnn_6066))("->")))(a_6358)))(b_6357)
      }
    }))((enqueue(t_6355))(ts_6356))
  }
})))(tappP_6153)))(many_6090((($pip$gt_6091($import3$instance$Applicative$1))(operatorP_6117("->")))(tappP_6153)));
var parseType_6173 = runParser_6110(typeP_6149);
var withLocAnn_6124 = function(a_6295){
  return ((((setAnn_6045($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(a_6295))(emptyAnn_6066)
};
var parse_6216 = function(s_6217){
  var $phi$666 = (($lt($import1$instance$Ord$2))(s_6217.$1))(length(s_6217.$0));
  if(!$phi$666){
    var $phi$665 = Error_6087("run out of tokens")
  } else if($phi$666){
    var $phi$668 = (getIx(s_6217.$1))(s_6217.$0);
    var $phi$667 = (Success_6086(($_5949(withLocAnn_6124))(((AnnCodeLoc_6061(s_6217.$4))($phi$668.$2))($phi$668.$3))))(s_6217);
    var $phi$665 = $phi$667
  } else error("pattern match fail",$phi$666);
  var $phi$664 = $phi$665;
  return $phi$664
};
var locP_6112 = Parser_6088(parse_6216);
var $pip$mns$gt_6114 = function(pa_6252){
  return function(pb_6253){
    return ($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(__6254){
      return function(b_6255){
        return b_6255
      }
    })))(pa_6252)))(pb_6253)
  }
};
var anyOpP_6118 = parseToken_6111(function(t_6268){
  if(t_6268.$0.$tag==4){
    var $phi$669 = Just_5942(t_6268.$1)
  } else var $phi$669 = Nothing_5943;
  return $phi$669
});
var reservedP_6119 = function(s_6273){
  return parseToken_6111(function(t_6274){
    if(t_6274.$0.$tag==5){
      var $phi$672 = (($eq$eq($import1$instance$Eq$1))(t_6274.$1))(s_6273);
      if($phi$672){
        var $phi$671 = Just_5942(s_6273)
      } else if(!$phi$672){
        var $phi$671 = Nothing_5943
      } else error("pattern match fail",$phi$672);
      var $phi$670 = $phi$671
    } else var $phi$670 = Nothing_5943;
    return $phi$670
  })
};
var withLocOf_6125 = function(e_6296){
  return withLocAnn_6124(($_5949(fromJust_6013))((((getAnn_6038($import1$instance$Hashable$13))($import1$instance$Eq$1))("codeLoc"))(annOf_6042(e_6296))))
};
var varP_6126 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Var_6040)))(locP_6112)))(parseToken_6111(function(t_6297){
  if(t_6297.$0.$tag==5){
    var $phi$675 = ((contains_6010($import1$instance$Eq$1))(t_6297.$1))(reserved_6115);
    if($phi$675){
      var $phi$674 = Nothing_5943
    } else if(!$phi$675){
      var $phi$674 = Just_5942(t_6297.$1)
    } else error("pattern match fail",$phi$675);
    var $phi$673 = $phi$674
  } else var $phi$673 = Nothing_5943;
  return $phi$673
}));
var cnumP_6127 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Const_6041)))(locP_6112)))(parseToken_6111(function(t_6302){
  if(t_6302.$0.$tag==2){
    var $phi$676 = Just_5942(CNum_6078(unsafeStringToInt(t_6302.$1)))
  } else var $phi$676 = Nothing_5943;
  return $phi$676
}));
var cstrP_6128 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Const_6041)))(locP_6112)))(parseToken_6111(function(t_6307){
  if(t_6307.$0.$tag==3){
    var $phi$677 = Just_5942(CStr_6077(t_6307.$1))
  } else var $phi$677 = Nothing_5943;
  return $phi$677
}));
var constP_6129 = (($lt$pip$gt($import3$instance$Alternative$2))(cstrP_6128))(cnumP_6127);
var pvarP_6136 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PVar_6076)))(locP_6112)))(notUpperCaseId_6122);
var pcstrP_6138 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PConst_6075)))(locP_6112)))(parseToken_6111(function(t_6328){
  if(t_6328.$0.$tag==3){
    var $phi$678 = Just_5942(CStr_6077(t_6328.$1))
  } else var $phi$678 = Nothing_5943;
  return $phi$678
}));
var pcnumP_6137 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PConst_6075)))(locP_6112)))(parseToken_6111(function(t_6323){
  if(t_6323.$0.$tag==2){
    var $phi$679 = Just_5942(CNum_6078(unsafeStringToInt(t_6323.$1)))
  } else var $phi$679 = Nothing_5943;
  return $phi$679
}));
var pconstP_6140 = (($lt$pip$gt($import3$instance$Alternative$2))(pcnumP_6137))(pcstrP_6138);
var patP_6135 = Parser_6088(function(s_6322){
  return (applyParser_6089(allPatP_6142))(s_6322)
});
var pdataP_6141 = ($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(PData_6074)))(locP_6112)))(upperCaseId_6121)))(many_6090((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(pvarP_6136))(pconstP_6140)))(parenP_6123(patP_6135))));
var allPatP_6142 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(pvarP_6136))(pconstP_6140)))(pdataP_6141);
var exprP_6130 = Parser_6088(function(s_6312){
  return (applyParser_6089(opP_6148))(s_6312)
});
var arrayLitP_6131 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(ann_6313){
  return function(xs_6314){
    return ((New_6025(ann_6313))("Array"))(xs_6314)
  }
})))(locP_6112)))((($lt$pip_6097($import3$instance$Applicative$1))((($pip$gt_6091($import3$instance$Applicative$1))(symP_6116("[")))((sepBy_6095(exprP_6130))(symP_6116(",")))))(symP_6116("]")));
var simpleExprP_6132 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(varP_6126))(constP_6129)))(arrayLitP_6131)))(parenP_6123(exprP_6130));
var appP_6133 = ($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(foldl(function(f_6315){
  return function(a_6316){
    return ((App_6021(withLocOf_6125(f_6315)))(f_6315))(a_6316)
  }
}))))((($lt$pip$gt($import3$instance$Alternative$2))(varP_6126))(parenP_6123(exprP_6130)))))(many_6090(simpleExprP_6132));
var lamP_6134 = ($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(l_6317){
  return function(ps_6318){
    return function(a_6319){
      return ((foldr(function(a_6320){
        return function(p_6321){
          return ((Lam_6022(l_6317))(p_6321))(a_6320)
        }
      }))(a_6319))(ps_6318)
    }
  }
})))(locP_6112)))(($pip$mns$gt_6114(symP_6116("\\")))(some_6096(notUpperCaseId_6122)))))((($pip$gt_6091($import3$instance$Applicative$1))(operatorP_6117("->")))(exprP_6130));
var ofP_6143 = ($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Pair_5936)))(patP_6135)))((($pip$gt_6091($import3$instance$Applicative$1))(operatorP_6117("->")))(exprP_6130));
var caseP_6144 = ($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Case_6023)))(locP_6112)))(($pip$mns$gt_6114(reservedP_6119("case")))(simpleExprP_6132))))((($pip$gt_6091($import3$instance$Applicative$1))(reservedP_6119("of")))(some_6096(ofP_6143)));
var defP_6145 = ($lt$mul$mns$gt_6113(($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(l_6338){
  return function(n_6339){
    return function(ps_6340){
      return function(e_6341){
        return (Pair_5936(n_6339))(((foldr(function(e_6342){
          return function(p_6343){
            return ((Lam_6022(l_6338))(p_6343))(e_6342)
          }
        }))(e_6341))(ps_6340))
      }
    }
  }
})))(locP_6112)))(notUpperCaseId_6122)))(many_6090(notUpperCaseId_6122))))((($pip$gt_6091($import3$instance$Applicative$1))(operatorP_6117("=")))(exprP_6130));
var letP_6146 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Let_6024)))(locP_6112)))(($pip$mns$gt_6114(reservedP_6119("let")))(some_6096(defP_6145)))))(($pip$mns$gt_6114(reservedP_6119("in")))(exprP_6130));
var primaryExprP_6147 = (($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))((($lt$pip$gt($import3$instance$Alternative$2))(appP_6133))(constP_6129)))(lamP_6134)))(caseP_6144)))(letP_6146)))(arrayLitP_6131);
var opP_6148 = ($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(e_6344){
  return function(oes_6345){
    return ((foldl(function(a_6346){
      return function(lob_6347){
        var $phi$680 = ((App_6021(lob_6347.$0))(((App_6021(lob_6347.$0))((Var_6040(lob_6347.$0))(lob_6347.$1.$0)))(a_6346)))(lob_6347.$1.$1);
        return $phi$680
      }
    }))(e_6344))(oes_6345)
  }
})))(primaryExprP_6147)))(many_6090((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(l_6351){
  return function(op_6352){
    return function(e_6353){
      return (Pair_5936(l_6351))((Pair_5936(op_6352))(e_6353))
    }
  }
})))(locP_6112)))(anyOpP_6118)))(primaryExprP_6147)));
var parseExpr_6172 = runParser_6110(exprP_6130);
var strP_6139 = parseToken_6111(function(t_6333){
  if(t_6333.$0.$tag==3){
    var $phi$681 = Just_5942(t_6333.$1)
  } else var $phi$681 = Nothing_5943;
  return $phi$681
});
var nonReservedP_6120 = parseToken_6111(function(t_6279){
  if(t_6279.$0.$tag==5){
    var $phi$684 = ((contains_6010($import1$instance$Eq$1))(t_6279.$1))(reserved_6115);
    if($phi$684){
      var $phi$683 = Nothing_5943
    } else if(!$phi$684){
      var $phi$683 = Just_5942(t_6279.$1)
    } else error("pattern match fail",$phi$684);
    var $phi$682 = $phi$683
  } else var $phi$682 = Nothing_5943;
  return $phi$682
});
var importNoAliasP_6160 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(n_6365){
  return (Pair_5936(n_6365))(n_6365)
})))(nonReservedP_6120);
var importAliasP_6161 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Pair_5936)))(nonReservedP_6120)))((($pip$gt_6091($import3$instance$Applicative$1))(reservedP_6119("as")))(nonReservedP_6120));
var importOpenP_6162 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(ns_6366){
  return function(f_6367){
    return ((ImportOpen_6068(emptyAnn_6066))(f_6367))(ns_6366)
  }
})))((($lt$pip_6097($import3$instance$Applicative$1))((($pip$gt_6091($import3$instance$Applicative$1))(symP_6116("{")))((sepBy1_6092((($lt$pip$gt($import3$instance$Alternative$2))(importAliasP_6161))(importNoAliasP_6160)))(symP_6116(",")))))(symP_6116("}")))))((($pip$gt_6091($import3$instance$Applicative$1))(reservedP_6119("from")))(strP_6139));
var importAllP_6163 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(ImportAll_6067(emptyAnn_6066))))((($pip$gt_6091($import3$instance$Applicative$1))((($pip$gt_6091($import3$instance$Applicative$1))(operatorP_6117("*")))(reservedP_6119("from"))))(strP_6139));
var importP_6164 = (($pip$gt_6091($import3$instance$Applicative$1))(reservedP_6119("import")))((($lt$pip$gt($import3$instance$Alternative$2))(importOpenP_6162))(importAllP_6163));
var parseImports_6171 = runParser_6110(many_6090(importP_6164));
var addExportAnn_6384 = function(d_6385){
  var $phi$685 = (Pair_5936(d_6385.$0))((withAnn_6044(((((setAnn_6045($import1$instance$Hashable$13))($import1$instance$Eq$1))("export"))(AnnExport_6079(d_6385.$0)))(annOf_6042(d_6385.$1))))(d_6385.$1));
  return $phi$685
};
var topLevelDef_6168 = (($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(addExportAnn_6384)))(defP_6145);
var eitherP_6167 = function(a_6381){
  return function(b_6382){
    return ($_5949(Parser_6088))(function(s_6383){
      return (applyParser_6089((($lt$pip$gt($import3$instance$Alternative$2))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Left_5951)))(a_6381)))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Right_5952)))(b_6382))))(s_6383)
    })
  }
};
var classMemberP_6156 = ($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Pair_5936)))(notUpperCaseId_6122)))((($pip$gt_6091($import3$instance$Applicative$1))(operatorP_6117("::")))(typeP_6149));
var classP_6155 = ($lt$mul$mns$gt_6113(($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(name_6359){
  return function(tv_6360){
    return function(maybeDefs_6361){
      return (((Class_6071(emptyAnn_6066))(name_6359))(tv_6360))((justOr_6014([]))(maybeDefs_6361))
    }
  }
})))(($pip$mns$gt_6114(reservedP_6119("class")))(upperCaseId_6121))))(notUpperCaseId_6122)))(opt_6094((($pip$gt_6091($import3$instance$Applicative$1))(reservedP_6119("where")))(some_6096(classMemberP_6156))));
var instanceP_6157 = ($lt$mul$mns$gt_6113(($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(name_6362){
  return function(t_6363){
    return function(maybeDefs_6364){
      return (((Instance_6070(emptyAnn_6066))(name_6362))(t_6363))((justOr_6014([]))(maybeDefs_6364))
    }
  }
})))(($pip$mns$gt_6114(reservedP_6119("instance")))(upperCaseId_6121))))(simpleTypeP_6152)))(opt_6094((($pip$gt_6091($import3$instance$Applicative$1))(reservedP_6119("where")))(some_6096(defP_6145))));
var dataConP_6158 = ($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(DataCon_6049(emptyAnn_6066))))(upperCaseId_6121)))(many_6090(simpleTypeP_6152));
var dataP_6159 = ($lt$mul$mns$gt_6113(($lt$mul$mns$gt_6113((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(Data_6048(emptyAnn_6066))))(($pip$mns$gt_6114(reservedP_6119("data")))(upperCaseId_6121))))(many_6090(notUpperCaseId_6122))))((($pip$gt_6091($import3$instance$Applicative$1))(operatorP_6117("=")))((sepBy1_6092(dataConP_6158))(operatorP_6117("|"))));
var topLevelP_6169 = (eitherP_6167((eitherP_6167(dataP_6159))(topLevelDef_6168)))((eitherP_6167(classP_6155))(instanceP_6157));
var splitFourWay_6166 = function(e_6378){
  var $phi$687 = splitEither_6012(e_6378);
  var $phi$686 = (Pair_5936(splitEither_6012($phi$687.$0)))(splitEither_6012($phi$687.$1));
  return $phi$686
};
var moduleP_6165 = (($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((($lt$mul$gt($import3$instance$Applicative$1))((pure($import3$instance$Applicative$1))(function(loc_6368){
  return function(is_6369){
    return function(es_6370){
      var $phi$689 = splitFourWay_6166(es_6370);
      var $phi$691 = getAnnCodeLoc_6064(loc_6368);
      if(($phi$691.$tag==0)&&($phi$691.$0.$tag==1)){
        var $phi$690 = $phi$691.$0.$0
      } else error("pattern match fail",$phi$691);
      var $phi$688 = ((((((Module_6073(loc_6368))($phi$690))(is_6369))($phi$689.$0.$0))($phi$689.$1.$0))($phi$689.$1.$1))($phi$689.$0.$1);
      return $phi$688
    }
  }
})))(locP_6112)))(many_6090(importP_6164))))(some_6096(topLevelP_6169));
var parseModule_6170 = runParser_6110(moduleP_6165);
var Pair_6388 = Pair_3;
var mapSnd_6389 = mapSnd_84;
var mapFst_6390 = mapFst_83;
var $gt$eq$gt_6391 = $gt$eq$gt_82;
var snd_6392 = snd_23;
var debug2_6393 = debug2_81;
var Just_6394 = Just_1;
var Nothing_6395 = Nothing_2;
var isJust_6396 = isJust_21;
var Empty_6397 = Empty_7;
var Leaf_6398 = Leaf_8;
var Collision_6399 = Collision_9;
var BitmapIndexed_6400 = BitmapIndexed_10;
var $_6401 = $_12;
var fst_6402 = fst_22;
var Left_6403 = Left_4;
var Right_6404 = Right_5;
var loop_6405 = loop_27;
var find_6406 = find_29;
var hamtMask_6407 = hamtMask_58;
var popCount_6408 = popCount_57;
var hamtIndex_6409 = hamtIndex_59;
var lookup_6410 = lookup_60;
var setContains_6411 = setContains_76;
var foldTrie_6412 = foldTrie_66;
var emptySet_6413 = emptySet_72;
var Unit_6414 = Unit_0;
var not_6415 = not_26;
var $div$eq_6416 = $div$eq_13;
var mapIx_6417 = mapIx_30;
var insert_6418 = insert_61;
var setAdd_6419 = setAdd_73;
var setIntersection_6420 = setIntersection_80;
var remove_6421 = remove_63;
var setDiff_6422 = setDiff_79;
var setToArray_6423 = setToArray_78;
var mergeTrie_6424 = mergeTrie_70;
var setUnion_6425 = setUnion_77;
var setRemove_6426 = setRemove_75;
var setAddAll_6427 = setAddAll_74;
var trieKeys_6428 = trieKeys_71;
var size_6429 = size_68;
var mapTrie_6430 = mapTrie_67;
var nodeMask_6431 = nodeMask_56;
var isEmpty_6432 = isEmpty_69;
var filterTrie_6433 = filterTrie_65;
var nextSetBitMask_6434 = nextSetBitMask_64;
var updateOrSet_6435 = updateOrSet_62;
var State_6436 = State_6;
var runState_6437 = runState_54;
var evalState_6438 = evalState_55;
var sets_6439 = sets_53;
var gets_6440 = gets_52;
var foldM_6441 = foldM_49;
var mapM_6442 = mapM_50;
var forM_6443 = forM_51;
var strToArray_6444 = strToArray_48;
var toRecord_6445 = toRecord_47;
var reverse_6446 = reverse_46;
var tail_6447 = tail_41;
var head_6448 = head_40;
var uniq_6449 = uniq_45;
var mergeSet_6450 = mergeSet_44;
var init_6451 = init_43;
var last_6452 = last_42;
var mapJust_6453 = mapJust_39;
var concatMap_6454 = concatMap_38;
var zip_6455 = zip_37;
var zipWithIndex2_6456 = zipWithIndex2_35;
var zipWithIndex_6457 = zipWithIndex_36;
var join_6458 = join_34;
var all_6459 = all_33;
var exists_6460 = exists_32;
var containsChar_6461 = containsChar_31;
var contains_6462 = contains_28;
var either_6463 = either_24;
var splitEither_6464 = splitEither_25;
var fromJust_6465 = fromJust_20;
var justOr_6466 = justOr_19;
var maybe_6467 = maybe_18;
var $gt$gt_6468 = $gt$gt_17;
var $gt$eq_6469 = $gt$eq_16;
var $lt$eq_6470 = $lt$eq_15;
var $gt_6471 = $gt_14;
var Identity_6472 = Identity_11;
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
var App_6473 = App_726;
var Lam_6474 = Lam_727;
var Case_6475 = Case_728;
var Let_6476 = Let_729;
var New_6477 = New_730;
var breakableDownAndUpM_6478 = breakableDownAndUpM_775;
var breakableDownM_6479 = breakableDownM_779;
var downAndUpM_6480 = downAndUpM_776;
var downM_6481 = downM_778;
var upM_6482 = upM_777;
var breakableDownAndUp_6483 = breakableDownAndUp_770;
var breakableDown_6484 = breakableDown_774;
var downAndUp_6485 = downAndUp_771;
var down_6486 = down_773;
var up_6487 = up_772;
var AnnType_6488 = AnnType_718;
var TUnknown_6489 = TUnknown_749;
var getAnn_6490 = getAnn_754;
var getAnnType_6491 = getAnnType_757;
var Var_6492 = Var_724;
var Const_6493 = Const_725;
var annOf_6494 = annOf_767;
var getType_6495 = getType_769;
var withAnn_6496 = withAnn_768;
var setAnn_6497 = setAnn_755;
var setAnnType_6498 = setAnnType_758;
var setType_6499 = setType_766;
var Data_6500 = Data_738;
var DataCon_6501 = DataCon_739;
var dataConName_6502 = dataConName_764;
var dataConNames_6503 = dataConNames_765;
var TCBound_6504 = TCBound_742;
var TConst_6505 = TConst_743;
var TVar_6506 = TVar_744;
var TApp_6507 = TApp_745;
var TRow_6508 = TRow_746;
var TBot_6509 = TBot_747;
var TForall_6510 = TForall_748;
var equivBound_6511 = equivBound_762;
var equivType_6512 = equivType_763;
var AnnCodeLoc_6513 = AnnCodeLoc_719;
var printCodeLoc_6514 = printCodeLoc_761;
var setAnnCodeLoc_6515 = setAnnCodeLoc_760;
var getAnnCodeLoc_6516 = getAnnCodeLoc_759;
var copyAnn_6517 = copyAnn_756;
var emptyAnn_6518 = emptyAnn_753;
var ImportAll_6519 = ImportAll_752;
var ImportOpen_6520 = ImportOpen_751;
var ImportClosed_6521 = ImportClosed_750;
var Instance_6522 = Instance_741;
var Class_6523 = Class_740;
var ModuleInterface_6524 = ModuleInterface_737;
var Module_6525 = Module_736;
var PData_6526 = PData_735;
var PConst_6527 = PConst_734;
var PVar_6528 = PVar_733;
var CStr_6529 = CStr_732;
var CNum_6530 = CNum_731;
var AnnExport_6531 = AnnExport_723;
var AnnTag_6532 = AnnTag_722;
var AnnData_6533 = AnnData_721;
var AnnUseCount_6534 = AnnUseCount_720;
var Success_6535 = Success_5687;
var $import3$instance$Functor$0 = $instance$Functor$0;
var $import3$instance$Applicative$1 = $instance$Applicative$1;
var $import3$instance$Alternative$2 = $instance$Alternative$2;
var parseExpr_6536 = parseExpr_6172;
var parseModule_6537 = parseModule_6170;
var parseType_6538 = parseType_6173;
var ParserState_6539 = ParserState_6107;
var generateJs_6540 = compileModule_5594;
var printType_6541 = printType_2131;
var reallyPrintExpr_6542 = reallyPrintExpr_2136;
var newCtx_6543 = newCtx_3014;
var inferTypeModule_6544 = inferTypeModule_3056;
var getTypedExports_6545 = getTypedExports_3057;
var generalize_6546 = generalize_3048;
var emptyEnv_6547 = emptyEnv_3024;
var dfs_6548 = dfs_567;
var ArgBool_6549 = ArgBool_4602;
var ArgString_6550 = ArgString_4603;
var parseArgs_6551 = parseArgs_4606;
var getPositional_6552 = getPositional_4607;
var getString_6553 = getString_4608;
var getBool_6554 = getBool_4609;
var $import9$instance$Eq$0 = $instance$Eq$0;
var declassModule_6555 = declassModule_4138;
var normalizeImports_6556 = normalizeImports_3927;
var uniquify_6557 = uniquify_1874;
var mergeModules_6558 = mergeModules_2802;
var inline_6559 = inline_2407;
var translateAdts_6560 = translateAdts_1675;
var CompilerState_6561 = CompilerState_1468;
var reportTimes_6562 = reportTimes_1477;
var timingStart_6563 = timingStart_1474;
var timingEnd_6564 = timingEnd_1475;
var timed_6565 = timed_1476;
var perModule_6566 = perModule_1473;
var setUid_6567 = setUid_1472;
var getUid_6568 = getUid_1471;
var setExports_6569 = setExports_1470;
var getExports_6570 = getExports_1469;
var splitLetsPass_6571 = splitLetsPass_1263;
var mainArg_6581 = (ArgString_6550("main"))(Nothing_6395);
var profileArg_6582 = (ArgBool_6549("profile"))(Just_6394(false));
var optArg_6583 = (ArgBool_6549("opt"))(Just_6394(false));
var builtinsPathArg_6579 = (ArgString_6550("builtins"))(Nothing_6395);
var outPathArg_6580 = (ArgString_6550("out"))(Nothing_6395);
var argDefs_6584 = [builtinsPathArg_6579,outPathArg_6580,mainArg_6581,profileArg_6582,optArg_6583];
var liftPass_6585 = function(local$instance$Monad$0){
  return function(p_6668){
    return function(a_6669){
      return (ret(local$instance$Monad$0))(p_6668(a_6669))
    }
  }
};
var normalizeImportsPass_6586 = function(m_6670){
  return (($gt$gt$eq($import1$instance$Monad$11))(getExports_6570))(function(es_6671){
    return (ret($import1$instance$Monad$11))((normalizeImports_6556(es_6671))(m_6670))
  })
};
var moduleFile_6572 = function(m_6591){
  var $phi$692 = m_6591.$1;
  return $phi$692
};
var typerPass_6587 = function(m_6672){
  return (($gt$gt$eq($import1$instance$Monad$11))(getExports_6570))(function(es_6673){
    var typed_6674 = (inferTypeModule_6544(es_6673))(m_6672);
    var e_6675 = getTypedExports_6545(typed_6674);
    return (($gt$gt_6468($import1$instance$Monad$11))(setExports_6569(((set(moduleFile_6572(m_6672)))(e_6675))(es_6673))))((ret($import1$instance$Monad$11))(typed_6674))
  })
};
var declasserPass_6588 = function(m_6676){
  return (($gt$gt$eq($import1$instance$Monad$11))(getExports_6570))(function(es_6677){
    return (ret($import1$instance$Monad$11))((declassModule_6555(es_6677))(m_6676))
  })
};
var parse_6573 = function(fn_6599){
  var $phi$694 = (parseModule_6537(readFile(fn_6599)))(($concat("//"))(fn_6599));
  if($phi$694.$tag==0){
    var $phi$696 = (($eq$eq($import1$instance$Eq$0))($phi$694.$1.$1))(length($phi$694.$1.$0));
    if($phi$696){
      var $phi$695 = $phi$694.$0
    } else if(!$phi$696){
      var $phi$695 = error(($concat("failed to parse all tokens, stopped at "))(jsonStringify((getIx($phi$694.$1.$1))($phi$694.$1.$0))))
    } else error("pattern match fail",$phi$696);
    var $phi$693 = $phi$695
  } else var $phi$693 = error($phi$694);
  return $phi$693
};
var findImports_6575 = function(m_6615){
  var importFileName_6616 = function(i_6617){
    if(i_6617.$tag==2){
      var $phi$697 = i_6617.$1
    } else if(i_6617.$tag==1){
      var $phi$697 = i_6617.$1
    } else if(i_6617.$tag==0){
      var $phi$697 = i_6617.$1
    } else error("pattern match fail",i_6617);
    return $phi$697
  };
  var $phi$698 = (map(importFileName_6616))(m_6615.$2);
  return $phi$698
};
var depSort_6574 = function(mainName_6607){
  return function(ms_6608){
    var modules_6609 = ((foldl(function(r_6612){
      return function(m_6613){
        return ((set(moduleFile_6572(m_6613)))(m_6613))(r_6612)
      }
    }))(empty))(ms_6608);
    var imports_6610 = (mapRecord(findImports_6575))(modules_6609);
    var ordered_6611 = ((dfs_6548(imports_6610))([]))(mainName_6607);
    return ($_6401(reverse_6446))((map(function(n_6614){
      return (get(n_6614))(modules_6609)
    }))(ordered_6611))
  }
};
var parseT_6576 = function(s_6633){
  var $phi$700 = (parseType_6538(s_6633))("");
  if($phi$700.$tag==0){
    var $phi$699 = $phi$700.$0
  } else var $phi$699 = error($phi$700);
  return $phi$699
};
var parseExports_6577 = function(e_6637){
  var bs_6638 = (mapRecord(function(s_6639){
    return (evalState_6438(newCtx_6543))((generalize_6546(emptyEnv_6547))(parseT_6576(s_6639)))
  }))(e_6637);
  return ((ModuleInterface_6524(bs_6638))([]))([])
};
var instrument_6578 = function(m_6640){
  var addImport_6643 = function(i_6657){
    if((i_6657.$tag==1)&&("./builtins.js"==i_6657.$1)){
      var $phi$701 = ((ImportOpen_6520(i_6657.$0))("./builtins.js"))((push((Pair_6388("perfTime"))("perfTime")))(i_6657.$2))
    } else var $phi$701 = i_6657;
    return $phi$701
  };
  var instrumentExpr_6642 = function(n_6650){
    return function(e_6651){
      if(e_6651.$tag==3){
        var $phi$702 = ((Lam_6474(e_6651.$0))(e_6651.$1))((instrumentExpr_6642(n_6650))(e_6651.$2))
      } else {
        var we_6656 = ((Lam_6474(emptyAnn_6518))("$unused$"))(e_6651);
        var $phi$702 = ((App_6473(emptyAnn_6518))(((App_6473(emptyAnn_6518))((Var_6492(emptyAnn_6518))("perfTime")))((Const_6493(emptyAnn_6518))(CStr_6529(n_6650)))))(we_6656)
      };
      return $phi$702
    }
  };
  var instrumentDef_6641 = function(d_6644){
    if(d_6644.$1.$tag==3){
      var $phi$703 = (Pair_6388(d_6644.$0))((instrumentExpr_6642(d_6644.$0))(((Lam_6474(d_6644.$1.$0))(d_6644.$1.$1))(d_6644.$1.$2)))
    } else var $phi$703 = d_6644;
    return $phi$703
  };
  var $phi$704 = ((((((Module_6525(m_6640.$0))(m_6640.$1))((map(addImport_6643))(m_6640.$2)))(m_6640.$3))(m_6640.$4))(m_6640.$5))((map(instrumentDef_6641))(m_6640.$6));
  return $phi$704
};
var instrumentPass_6589 = function(local$instance$Monad$0){
  return function(profile_6678){
    return function(m_6679){
      if(!profile_6678){
        var $phi$705 = (ret(local$instance$Monad$0))(m_6679)
      } else if(profile_6678){
        var $phi$705 = (ret(local$instance$Monad$0))(instrument_6578(m_6679))
      } else error("pattern match fail",profile_6678);
      return $phi$705
    }
  }
};
var main_6590 = function(argv_6680){
  var args_6681 = (parseArgs_6551(argDefs_6584))((slice(2))(argv_6680));
  var srcFiles_6685 = getPositional_6552(args_6681);
  var builtinsPath_6682 = (getString_6553(args_6681))(builtinsPathArg_6579);
  var baseExports_6688 = ((set("./builtins.js"))(parseExports_6577(loadJSExports(builtinsPath_6682))))(empty);
  var mainName_6684 = ($concat("//"))((getString_6553(args_6681))(mainArg_6581));
  var profile_6686 = (getBool_6554(args_6681))(profileArg_6582);
  var opt_6687 = (getBool_6554(args_6681))(optArg_6583);
  var passes_6689 = (($gt$eq$gt_6391($import1$instance$Monad$11))((($gt$eq$gt_6391($import1$instance$Monad$11))((($gt$eq$gt_6391($import1$instance$Monad$11))((($gt$eq$gt_6391($import1$instance$Monad$11))((($gt$eq$gt_6391($import1$instance$Monad$11))((($gt$eq$gt_6391($import1$instance$Monad$11))((($gt$eq$gt_6391($import1$instance$Monad$11))((perModule_6566($import1$instance$Monad$11))(($_6401(timed_6565("parse")))((liftPass_6585($import1$instance$Monad$11))(parse_6573)))))((timed_6565("dep-sort"))((liftPass_6585($import1$instance$Monad$11))(depSort_6574(mainName_6684))))))((perModule_6566($import1$instance$Monad$11))((($gt$eq$gt_6391($import1$instance$Monad$11))((($gt$eq$gt_6391($import1$instance$Monad$11))((($gt$eq$gt_6391($import1$instance$Monad$11))((($gt$eq$gt_6391($import1$instance$Monad$11))((($gt$eq$gt_6391($import1$instance$Monad$11))((timed_6565("translate-adts"))((liftPass_6585($import1$instance$Monad$11))(translateAdts_6560))))((timed_6565("normalize-imports"))(normalizeImportsPass_6586))))((timed_6565("uniquify"))(uniquify_6557))))((timed_6565("split-lets"))(splitLetsPass_6571($import1$instance$Monad$11)))))((timed_6565("typer"))(typerPass_6587))))((timed_6565("declasser"))(declasserPass_6588))))))((timed_6565("merge-modules"))((liftPass_6585($import1$instance$Monad$11))(mergeModules_6558)))))((timed_6565("opt"))(inline_6559(opt_6687)))))((timed_6565("instrument"))((instrumentPass_6589($import1$instance$Monad$11))(profile_6686)))))((timed_6565("generate-js"))((liftPass_6585($import1$instance$Monad$11))(generateJs_6540(builtinsPath_6682))))))(reportTimes_6562);
  var js_6690 = (evalState_6438(((CompilerState_6561(baseExports_6688))(0))(Empty_6397)))(passes_6689(srcFiles_6685));
  var outPath_6683 = (getString_6553(args_6681))(outPathArg_6580);
  return (writeFile(js_6690))(outPath_6683)
};
var exports = {mainArg:mainArg_6581,profileArg:profileArg_6582,optArg:optArg_6583,builtinsPathArg:builtinsPathArg_6579,outPathArg:outPathArg_6580,argDefs:argDefs_6584,liftPass:liftPass_6585,normalizeImportsPass:normalizeImportsPass_6586,moduleFile:moduleFile_6572,typerPass:typerPass_6587,declasserPass:declasserPass_6588,parse:parse_6573,findImports:findImports_6575,depSort:depSort_6574,parseT:parseT_6576,parseExports:parseExports_6577,instrument:instrument_6578,instrumentPass:instrumentPass_6589,main:main_6590}
module.exports = exports;})();if (module.exports.main)module.exports.main(process.argv)
