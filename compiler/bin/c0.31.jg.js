var cache = {}
function _require(f) {
  return cache[f] || require(f == "./builtins.js" ? process.cwd() + "/" + "compiler/builtins.js" : f);
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
var Nothing_2 = {$tag:1};
var Empty_7 = {$tag:0};
var Unit_0 = {};
var $instance$Eq$0 = {$0:jsEq};
var $instance$Eq$1 = {$0:jsEq};
var $instance$Ord$2 = {$0:jsLt};
var $instance$Ord$3 = {$0:jsLt};
var $instance$Functor$4 = {$0:function(f_440_13130){
  return function(m_441_13131){
    if(m_441_13131.$tag==0){
      var $_0_85_6452_13133 = f_440_13130(m_441_13131.$0);
      var $phi$0 = {$0:$_0_85_6452_13133,$tag:0}
    } else if(m_441_13131.$tag==1){
      var $phi$0 = Nothing_2
    } else error("pattern match fail",m_441_13131);
    return $phi$0
  }
}};
var $instance$Functor$9 = {$0:function(f_457_13141){
  return function(s_458_13142){
    var $phi$1 = {$0:function(s_460_13145_15741){
      var $phi$3 = s_458_13142.$0(s_460_13145_15741);
      var $_1_87_6471_13149_15744 = f_457_13141($phi$3.$1);
      var $phi$2 = {$0:$phi$3.$0,$1:$_1_87_6471_13149_15744};
      return $phi$2
    }};
    return $phi$1
  }
}};
var $phi$11 = {$0:function(a_463_13153_16195){
  return {$0:function(s_464_13155_13158_16196){
    return {$0:s_464_13155_13158_16196,$1:a_463_13153_16195}
  }}
},$1:function(f_465_16083_16197){
  return function(a_466_16084_16198){
    var $phi$6 = {$0:function(s_469_13161_16087_16201){
      var $phi$8 = f_465_16083_16197.$0(s_469_13161_16087_16201);
      var $phi$10 = a_466_16084_16198.$0($phi$8.$0);
      var $_1_87_6479_13167_16092_16206 = $phi$8.$1($phi$10.$1);
      var $phi$9 = {$0:$phi$10.$0,$1:$_1_87_6479_13167_16092_16206};
      var $phi$7 = $phi$9;
      return $phi$7
    }};
    var $phi$5 = $phi$6;
    return $phi$5
  }
}};
var $phi$4 = $phi$11.$0;
var $_0_6480 = $phi$4;
var $instance$Monad$11 = (function($_1_6481){
  return {$0:$_0_6480,$1:$_1_6481}
})(function(a_474){
  return function(f_475){
    var $phi$12 = {$0:function(s_477_13168){
      var $phi$14 = a_474.$0(s_477_13168);
      var $phi$16 = f_475($phi$14.$1);
      var $phi$15 = $phi$16.$0($phi$14.$0);
      var $phi$13 = $phi$15;
      return $phi$13
    }};
    return $phi$12
  }
});
var $instance$Hashable$13 = {$0:function(s_482_13172){
  return strHashCode(s_482_13172)
}};
var $gt$eq$gt_82 = function(local$instance$Monad$0){
  return function(a_429){
    return function(b_430){
      return function(x_431){
        var $phi$17 = local$instance$Monad$0.$1;
        return ($phi$17(a_429(x_431)))(b_430)
      }
    }
  }
};
var loop_27 = function(f_145){
  return function(start_146){
    var result_150 = ((iterate({$0:start_146,$1:Nothing_2}))(function(x_151_6519){
      if(x_151_6519.$1.$tag==1){
        var $phi$18 = false
      } else var $phi$18 = true;
      return $phi$18
    }))(function(xr_154_6522){
      var $phi$21 = f_145(xr_154_6522.$0);
      if($phi$21.$tag==0){
        var $phi$20 = {$0:$phi$21.$0,$1:Nothing_2}
      } else if($phi$21.$tag==1){
        var $phi$20 = {$0:xr_154_6522.$0,$1:{$0:$phi$21.$0,$tag:0}}
      } else error("pattern match fail",$phi$21);
      var $phi$19 = $phi$20;
      return $phi$19
    });
    var $phi$23 = result_150.$1;
    if($phi$23.$tag==0){
      var $phi$22 = $phi$23.$0
    } else error("pattern match fail",$phi$23);
    return $phi$22
  }
};
var find_29 = function(predicate_164){
  return function(xs_165){
    return (loop_27(function(i_167_6541){
      var $phi$25 = $instance$Ord$2.$0;
      var $phi$26 = ($phi$25(i_167_6541))(length(xs_165));
      if(!$phi$26){
        var $phi$24 = {$0:Nothing_2,$tag:1}
      } else if($phi$26){
        var $phi$28 = predicate_164((getIx(i_167_6541))(xs_165));
        if($phi$28){
          var $_0_85_6546 = (getIx(i_167_6541))(xs_165);
          var $_0_89_6545 = {$0:$_0_85_6546,$tag:0};
          var $phi$27 = {$0:$_0_89_6545,$tag:1}
        } else if(!$phi$28){
          var $_0_88_6547 = i_167_6541+1;
          var $phi$27 = {$0:$_0_88_6547,$tag:0}
        } else error("pattern match fail",$phi$28);
        var $phi$24 = $phi$27
      } else error("pattern match fail",$phi$26);
      return $phi$24
    }))(0)
  }
};
var hamtMask_58 = function(depth_255){
  return function(hash_256){
    var h_257 = (hash_256>>>(depth_255*5))&31;
    return 1<<h_257
  }
};
var hamtIndex_59 = function(bitmap_258){
  return function(mask_259){
    var n_249_6548 = bitmap_258&(mask_259-1);
    var n2_250_6549 = n_249_6548-((n_249_6548>>>1)&1431655765);
    var n3_251_6550 = (n2_250_6549&858993459)+((n2_250_6549>>>2)&858993459);
    var n4_252_6551 = (n3_251_6550+(n3_251_6550>>>4))&252645135;
    var n5_253_6552 = n4_252_6551+(n4_252_6551>>>8);
    var n6_254_6553 = n5_253_6552+(n5_253_6552>>>16);
    return n6_254_6553&127
  }
};
var lookup_60 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_260){
      return function(t_261){
        var $phi$29 = local$instance$Hashable$1.$0;
        var hash_262 = $phi$29(k_260);
        var f_263 = function(depth_264){
          return function(t_265){
            if(t_265.$tag==0){
              var $phi$30 = Nothing_2
            } else if(t_265.$tag==1){
              var $phi$38 = local$instance$Eq$0.$0;
              var $phi$39 = ($phi$38(k_260))(t_265.$1);
              if(!$phi$39){
                var $phi$37 = Nothing_2
              } else if($phi$39){
                var $phi$37 = {$0:t_265.$2,$tag:0}
              } else error("pattern match fail",$phi$39);
              var $phi$30 = $phi$37
            } else if(t_265.$tag==2){
              var $phi$33 = $instance$Functor$4.$0;
              var f_100_6559 = $phi$33(function(p_127_6563){
                var $phi$34 = p_127_6563.$1;
                return $phi$34
              });
              var $phi$30 = (function(a_101_6560){
                return f_100_6559(a_101_6560)
              })((find_29(function(e_271){
                var $phi$35 = local$instance$Eq$0.$0;
                var $phi$36 = e_271.$0;
                return ($phi$35($phi$36))(k_260)
              }))(t_265.$1))
            } else if(t_265.$tag==3){
              var m_275 = (hamtMask_58(depth_264))(hash_262);
              var $phi$32 = m_275&t_265.$1;
              if(0==$phi$32){
                var $phi$31 = Nothing_2
              } else var $phi$31 = (f_263(depth_264+1))((getIx((hamtIndex_59(t_265.$1))(m_275)))(t_265.$2));
              var $phi$30 = $phi$31
            } else error("pattern match fail",t_265);
            return $phi$30
          }
        };
        return (f_263(0))(t_261)
      }
    }
  }
};
var setContains_76 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_414){
      return function(s_415){
        var m_122_6571 = (((lookup_60(local$instance$Hashable$1))(local$instance$Eq$0))(a_414))(s_415);
        if(m_122_6571.$tag==0){
          var $phi$40 = true
        } else if(m_122_6571.$tag==1){
          var $phi$40 = false
        } else error("pattern match fail",m_122_6571);
        return $phi$40
      }
    }
  }
};
var nextSetBitMask_64 = function(m_327){
  return function(n_328){
    var $phi$42 = m_327&n_328;
    if(0==$phi$42){
      var $phi$41 = (nextSetBitMask_64(m_327<<1))(n_328)
    } else var $phi$41 = m_327;
    return $phi$41
  }
};
var filterTrie_65 = function(f_330){
  return function(t_331){
    if(t_331.$tag==0){
      var $phi$43 = Empty_7
    } else if(t_331.$tag==1){
      var $phi$59 = (f_330(t_331.$1))(t_331.$2);
      if(!$phi$59){
        var $phi$58 = Empty_7
      } else if($phi$59){
        var $phi$58 = t_331
      } else error("pattern match fail",$phi$59);
      var $phi$43 = $phi$58
    } else if(t_331.$tag==2){
      var entries2_337 = (filter(function(e_338){
        var $phi$52 = e_338.$0;
        var $phi$53 = e_338.$1;
        return (f_330($phi$52))($phi$53)
      }))(t_331.$1);
      var $phi$55 = length(entries2_337);
      if(0==$phi$55){
        var $phi$54 = Empty_7
      } else if(1==$phi$55){
        var p_124_6582 = (getIx(0))(entries2_337);
        var $phi$56 = p_124_6582.$0;
        var $_1_92_6580 = $phi$56;
        var p_127_6585 = (getIx(0))(entries2_337);
        var $phi$57 = p_127_6585.$1;
        var $phi$54 = (function($_2_93_6581){
          return {$0:t_331.$0,$1:$_1_92_6580,$2:$_2_93_6581,$tag:1}
        })($phi$57)
      } else var $phi$54 = {$0:t_331.$0,$1:entries2_337,$tag:2};
      var $phi$43 = $phi$54
    } else if(t_331.$tag==3){
      var bes_344 = ((foldl(function(bes_345_6598){
        return function(e_346_6599){
          var mask_350_6603 = (nextSetBitMask_64(bes_345_6598.$0.$1))(bes_345_6598.$0.$0);
          var next_351_6604 = mask_350_6603<<1;
          var $phi$46 = (filterTrie_65(f_330))(e_346_6599);
          if($phi$46.$tag==0){
            var bitmap2_352_6605 = bes_345_6598.$0.$0&(bitNot(mask_350_6603));
            var $phi$45 = {$0:{$0:bitmap2_352_6605,$1:next_351_6604},$1:bes_345_6598.$1}
          } else {
            var $_1_87_6612 = (push(e_346_6599))(bes_345_6598.$1);
            var $phi$45 = {$0:{$0:bes_345_6598.$0.$0,$1:next_351_6604},$1:$_1_87_6612}
          };
          var $phi$44 = $phi$45;
          return $phi$44
        }
      }))({$0:{$0:t_331.$1,$1:1},$1:[]}))(t_331.$2);
      if(0==bes_344.$0.$0){
        var $phi$47 = Empty_7
      } else {
        var $phi$49 = length(bes_344.$1);
        if(1==$phi$49){
          var $phi$51 = (getIx(0))(bes_344.$1);
          if($phi$51.$tag==1){
            var $phi$50 = (getIx(0))(bes_344.$1)
          } else var $phi$50 = {$0:t_331.$0,$1:bes_344.$0.$0,$2:bes_344.$1,$tag:3};
          var $phi$48 = $phi$50
        } else var $phi$48 = {$0:t_331.$0,$1:bes_344.$0.$0,$2:bes_344.$1,$tag:3};
        var $phi$47 = $phi$48
      };
      var $phi$43 = $phi$47
    } else error("pattern match fail",t_331);
    return $phi$43
  }
};
var setIntersection_80 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_423){
      return function(b_424){
        return (filterTrie_65(function(k_425){
          return function(__426){
            return (((setContains_76(local$instance$Hashable$1))(local$instance$Eq$0))(k_425))(b_424)
          }
        }))(a_423)
      }
    }
  }
};
var setDiff_79 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_419){
      return function(b_420){
        return (filterTrie_65(function(k_421){
          return function(__422){
            var b_144_6625 = (((setContains_76(local$instance$Hashable$1))(local$instance$Eq$0))(k_421))(b_420);
            if(b_144_6625){
              var $phi$60 = false
            } else if(!b_144_6625){
              var $phi$60 = true
            } else error("pattern match fail",b_144_6625);
            return $phi$60
          }
        }))(a_419)
      }
    }
  }
};
var foldTrie_66 = function(f_364){
  return function(a_365){
    return function(t_366){
      if(t_366.$tag==0){
        var $phi$61 = a_365
      } else if(t_366.$tag==1){
        var $phi$61 = ((f_364(a_365))(t_366.$1))(t_366.$2)
      } else if(t_366.$tag==2){
        var $phi$61 = ((foldl(function(a_372){
          return function(e_373){
            var $phi$62 = e_373.$0;
            var $phi$63 = e_373.$1;
            return ((f_364(a_372))($phi$62))($phi$63)
          }
        }))(a_365))(t_366.$1)
      } else if(t_366.$tag==3){
        var $phi$61 = ((foldl(foldTrie_66(f_364)))(a_365))(t_366.$2)
      } else error("pattern match fail",t_366);
      return $phi$61
    }
  }
};
var setToArray_78 = (foldTrie_66(function(vs_416){
  return function(v_417){
    return function(__418){
      return (push(v_417))(vs_416)
    }
  }
}))([]);
var $div$eq_13 = function(local$instance$Eq$0){
  return function(a_102){
    return function(b_103){
      var $phi$64 = local$instance$Eq$0.$0;
      var b_144_6632 = ($phi$64(a_102))(b_103);
      if(b_144_6632){
        var $phi$65 = false
      } else if(!b_144_6632){
        var $phi$65 = true
      } else error("pattern match fail",b_144_6632);
      return $phi$65
    }
  }
};
var insert_61 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_277){
      return function(v_278){
        return function(t_279){
          var $phi$66 = local$instance$Hashable$1.$0;
          var hash_280 = $phi$66(k_277);
          var f_281 = function(depth_282){
            return function(t_283){
              if(t_283.$tag==0){
                var $phi$67 = {$0:0,$1:k_277,$2:v_278,$tag:1}
              } else if(t_283.$tag==2){
                var $_1_95_6641 = (push({$0:k_277,$1:v_278}))((filter(function(e_286){
                  var $phi$75 = e_286.$0;
                  return (($div$eq_13(local$instance$Eq$0))($phi$75))(k_277)
                }))(t_283.$1));
                var $phi$67 = {$0:t_283.$0,$1:$_1_95_6641,$tag:2}
              } else if(t_283.$tag==1){
                var $phi$71 = local$instance$Eq$0.$0;
                var $phi$72 = ($phi$71(k_277))(t_283.$1);
                if($phi$72){
                  var $phi$70 = {$0:t_283.$0,$1:k_277,$2:v_278,$tag:1}
                } else if(!$phi$72){
                  if(7==depth_282){
                    var $phi$73 = {$0:t_283.$0,$1:[{$0:t_283.$1,$1:t_283.$2},{$0:k_277,$1:v_278}],$tag:2}
                  } else {
                    var $phi$74 = local$instance$Hashable$1.$0;
                    var m_291 = (hamtMask_58(depth_282))($phi$74(t_283.$1));
                    var $phi$73 = (f_281(depth_282))({$0:t_283.$0,$1:m_291,$2:[{$0:m_291,$1:t_283.$1,$2:t_283.$2,$tag:1}],$tag:3})
                  };
                  var $phi$70 = $phi$73
                } else error("pattern match fail",$phi$72);
                var $phi$67 = $phi$70
              } else if(t_283.$tag==3){
                var m_295 = (hamtMask_58(depth_282))(hash_280);
                var bitmap2_296 = m_295|t_283.$1;
                var ix_297 = (hamtIndex_59(bitmap2_296))(m_295);
                var $phi$69 = m_295&t_283.$1;
                if(0==$phi$69){
                  var $_2_98_6668 = (((splice(ix_297))(0))([{$0:m_295,$1:k_277,$2:v_278,$tag:1}]))(t_283.$2);
                  var $phi$68 = {$0:t_283.$0,$1:bitmap2_296,$2:$_2_98_6668,$tag:3}
                } else {
                  var f_168_6675 = f_281(depth_282+1);
                  var $_2_98_6674 = ((function(ix_169_6676){
                    return function(xs_170_6677){
                      return ((setIx(ix_169_6676))(f_168_6675((getIx(ix_169_6676))(xs_170_6677))))(xs_170_6677)
                    }
                  })(ix_297))(t_283.$2);
                  var $phi$68 = {$0:t_283.$0,$1:bitmap2_296,$2:$_2_98_6674,$tag:3}
                };
                var $phi$67 = $phi$68
              } else error("pattern match fail",t_283);
              return $phi$67
            }
          };
          return (f_281(0))(t_279)
        }
      }
    }
  }
};
var mergeTrie_70 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_399){
      return function(b_400){
        return ((foldTrie_66(function(a_401){
          return function(k_402){
            return function(v_403){
              return ((((insert_61(local$instance$Hashable$1))(local$instance$Eq$0))(k_402))(v_403))(a_401)
            }
          }
        }))(a_399))(b_400)
      }
    }
  }
};
var remove_63 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(k_304){
      return function(t_305){
        var $phi$76 = local$instance$Hashable$1.$0;
        var hash_306 = $phi$76(k_304);
        var f_307 = function(depth_308){
          return function(t_309){
            if(t_309.$tag==0){
              var $phi$77 = Empty_7
            } else if(t_309.$tag==1){
              var $phi$89 = local$instance$Eq$0.$0;
              var $phi$90 = ($phi$89(t_309.$1))(k_304);
              if($phi$90){
                var $phi$88 = Empty_7
              } else if(!$phi$90){
                var $phi$88 = t_309
              } else error("pattern match fail",$phi$90);
              var $phi$77 = $phi$88
            } else if(t_309.$tag==2){
              var entries2_315 = (filter(function(e_316){
                var $phi$83 = e_316.$0;
                return (($div$eq_13(local$instance$Eq$0))($phi$83))(k_304)
              }))(t_309.$1);
              var $phi$85 = length(entries2_315);
              if(0==$phi$85){
                var $phi$84 = Empty_7
              } else if(1==$phi$85){
                var p_124_6688 = (getIx(0))(entries2_315);
                var $phi$86 = p_124_6688.$0;
                var $_1_92_6686 = $phi$86;
                var p_127_6691 = (getIx(0))(entries2_315);
                var $phi$87 = p_127_6691.$1;
                var $phi$84 = (function($_2_93_6687){
                  return {$0:t_309.$0,$1:$_1_92_6686,$2:$_2_93_6687,$tag:1}
                })($phi$87)
              } else var $phi$84 = {$0:t_309.$0,$1:entries2_315,$tag:2};
              var $phi$77 = $phi$84
            } else if(t_309.$tag==3){
              var m_321 = (hamtMask_58(depth_308))(hash_306);
              var ix_322 = (hamtIndex_59(t_309.$1))(m_321);
              var $phi$79 = m_321&t_309.$1;
              if(0==$phi$79){
                var $phi$78 = t_309
              } else {
                var $phi$81 = (f_307(depth_308+1))((getIx(ix_322))(t_309.$2));
                if($phi$81.$tag==0){
                  var bitmap2_324 = (bitNot(m_321))&t_309.$1;
                  if(0==bitmap2_324){
                    var $phi$82 = Empty_7
                  } else {
                    var $_2_98_6698 = (((splice(ix_322))(1))([]))(t_309.$2);
                    var $phi$82 = {$0:t_309.$0,$1:bitmap2_324,$2:$_2_98_6698,$tag:3}
                  };
                  var $phi$80 = $phi$82
                } else {
                  var $_2_98_6701 = ((setIx(ix_322))($phi$81))(t_309.$2);
                  var $phi$80 = {$0:t_309.$0,$1:t_309.$1,$2:$_2_98_6701,$tag:3}
                };
                var $phi$78 = $phi$80
              };
              var $phi$77 = $phi$78
            } else error("pattern match fail",t_309);
            return $phi$77
          }
        };
        return (f_307(0))(t_305)
      }
    }
  }
};
var size_68 = function(t_388){
  if(t_388.$tag==0){
    var $phi$91 = 0
  } else if(t_388.$tag==1){
    var $phi$91 = 1
  } else if(t_388.$tag==2){
    var $phi$91 = length(t_388.$1)
  } else if(t_388.$tag==3){
    var $phi$91 = ((foldl($add))(0))((map(size_68))(t_388.$2))
  } else error("pattern match fail",t_388);
  return $phi$91
};
var evalState_55 = function(s_238){
  return function(m_239){
    var $phi$92 = m_239.$0(s_238);
    var p_127_6727 = $phi$92;
    var $phi$93 = p_127_6727.$1;
    return $phi$93
  }
};
var gets_52 = {$0:function(s_232_13182){
  return {$0:s_232_13182,$1:s_232_13182}
}};
var foldM_49 = function(local$instance$Monad$0){
  return function(f_219){
    return function(r_220){
      return function(xs_221){
        var $phi$95 = local$instance$Monad$0.$0;
        return ((foldl(function(r_222){
          return function(x_223){
            var $phi$94 = local$instance$Monad$0.$1;
            return ($phi$94(r_222))(function(r_224){
              return (f_219(r_224))(x_223)
            })
          }
        }))($phi$95(r_220)))(xs_221)
      }
    }
  }
};
var mapM_50 = function(local$instance$Monad$0){
  return function(f_225){
    return function(xs_226){
      return (((foldM_49(local$instance$Monad$0))(function(xs_227){
        return function(x_228){
          var $phi$96 = local$instance$Monad$0.$1;
          return ($phi$96(f_225(x_228)))(function(x_229){
            var $phi$97 = local$instance$Monad$0.$0;
            return $phi$97((push(x_229))(xs_227))
          })
        }
      }))([]))(xs_226)
    }
  }
};
var toRecord_47 = (foldl(function(r_210){
  return function(p_211){
    var $phi$98 = ((set(p_211.$0))(p_211.$1))(r_210);
    return $phi$98
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
    var $phi$100 = $instance$Ord$2.$0;
    var $phi$101 = ($phi$100(length(xs_207)))(2);
    if($phi$101){
      var $phi$99 = xs_207
    } else if(!$phi$101){
      var $phi$103 = local$instance$Eq$0.$0;
      var $phi$104 = ($phi$103((getIx(0))(xs_207)))((getIx(1))(xs_207));
      if(!$phi$104){
        var $phi$102 = (enqueue(head_40(xs_207)))((uniq_45(local$instance$Eq$0))(tail_41(xs_207)))
      } else if($phi$104){
        var $phi$102 = (uniq_45(local$instance$Eq$0))(tail_41(xs_207))
      } else error("pattern match fail",$phi$104);
      var $phi$99 = $phi$102
    } else error("pattern match fail",$phi$101);
    return $phi$99
  }
};
var mergeSet_44 = function(local$instance$Ord$1){
  return function(local$instance$Eq$0){
    return function(xs_203){
      return function(ys_204){
        var $phi$106 = length(xs_203);
        if(0==$phi$106){
          var $phi$105 = ys_204
        } else {
          var $phi$108 = length(ys_204);
          if(0==$phi$108){
            var $phi$107 = xs_203
          } else {
            var $phi$110 = local$instance$Ord$1.$0;
            var $phi$111 = ($phi$110(head_40(xs_203)))(head_40(ys_204));
            if($phi$111){
              var $phi$109 = (enqueue(head_40(xs_203)))((((mergeSet_44(local$instance$Ord$1))(local$instance$Eq$0))(tail_41(xs_203)))(ys_204))
            } else if(!$phi$111){
              var $phi$113 = local$instance$Eq$0.$0;
              var $phi$114 = ($phi$113(head_40(xs_203)))(head_40(ys_204));
              if($phi$114){
                var $phi$112 = (enqueue(head_40(xs_203)))((((mergeSet_44(local$instance$Ord$1))(local$instance$Eq$0))(tail_41(xs_203)))(tail_41(ys_204)))
              } else if(!$phi$114){
                var $phi$112 = (enqueue(head_40(ys_204)))((((mergeSet_44(local$instance$Ord$1))(local$instance$Eq$0))(xs_203))(tail_41(ys_204)))
              } else error("pattern match fail",$phi$114);
              var $phi$109 = $phi$112
            } else error("pattern match fail",$phi$111);
            var $phi$107 = $phi$109
          };
          var $phi$105 = $phi$107
        };
        return $phi$105
      }
    }
  }
};
var mapJust_39 = function(f_195){
  return function(xs_196){
    return ((foldl(function(r_198_6776){
      return function(x_199_6777){
        var $phi$116 = f_195(x_199_6777);
        if($phi$116.$tag==1){
          var $phi$115 = r_198_6776
        } else if($phi$116.$tag==0){
          var $phi$115 = (push($phi$116.$0))(r_198_6776)
        } else error("pattern match fail",$phi$116);
        return $phi$115
      }
    }))([]))(xs_196)
  }
};
var concatMap_38 = function(f_193){
  return function(a_194){
    return ((foldl(concat))([]))((map(f_193))(a_194))
  }
};
var zip_37 = function(xs_191){
  return function(ys_192){
    var $phi$118 = $instance$Eq$0.$0;
    var $phi$119 = $instance$Eq$0.$0;
    var $phi$120 = ($or(($phi$118(length(xs_191)))(0)))(($phi$119(length(ys_192)))(0));
    if($phi$120){
      var $phi$117 = []
    } else if(!$phi$120){
      var $_0_86_6783 = head_40(xs_191);
      var $phi$117 = (enqueue((function($_1_87_6784){
        return {$0:$_0_86_6783,$1:$_1_87_6784}
      })(head_40(ys_192))))((zip_37(tail_41(xs_191)))(tail_41(ys_192)))
    } else error("pattern match fail",$phi$120);
    return $phi$117
  }
};
var zipWithIndex2_35 = function(n_188){
  return function(xs_189){
    var $phi$122 = length(xs_189);
    if(0==$phi$122){
      var $phi$121 = []
    } else {
      var $_1_87_6786 = head_40(xs_189);
      var $phi$121 = (enqueue({$0:n_188,$1:$_1_87_6786}))((zipWithIndex2_35(n_188+1))(tail_41(xs_189)))
    };
    return $phi$121
  }
};
var zipWithIndex_36 = zipWithIndex2_35(0);
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
      var $phi$124 = $instance$Ord$2.$0;
      var $phi$125 = ($phi$124(i_174))(length(xs_172));
      if(!$phi$125){
        var $phi$123 = false
      } else if($phi$125){
        var $phi$127 = $instance$Eq$1.$0;
        var $phi$128 = ($phi$127((getChar(i_174))(xs_172)))(x_171);
        if($phi$128){
          var $phi$126 = true
        } else if(!$phi$128){
          var $phi$126 = f_173(i_174+1)
        } else error("pattern match fail",$phi$128);
        var $phi$123 = $phi$126
      } else error("pattern match fail",$phi$125);
      return $phi$123
    };
    return f_173(0)
  }
};
var contains_28 = function(local$instance$Eq$0){
  return function(x_160){
    return function(xs_161){
      return (loop_27(function(i_163_6798){
        var $phi$130 = $instance$Ord$2.$0;
        var $phi$131 = ($phi$130(i_163_6798))(length(xs_161));
        if(!$phi$131){
          var $phi$129 = {$0:false,$tag:1}
        } else if($phi$131){
          var $phi$133 = local$instance$Eq$0.$0;
          var $phi$134 = ($phi$133(x_160))((getIx(i_163_6798))(xs_161));
          if($phi$134){
            var $phi$132 = {$0:true,$tag:1}
          } else if(!$phi$134){
            var $_0_88_6805 = i_163_6798+1;
            var $phi$132 = {$0:$_0_88_6805,$tag:0}
          } else error("pattern match fail",$phi$134);
          var $phi$129 = $phi$132
        } else error("pattern match fail",$phi$131);
        return $phi$129
      }))(0)
    }
  }
};
var either_24 = function(f_130){
  return function(g_131){
    return function(e_132){
      if(e_132.$tag==0){
        var $phi$135 = f_130(e_132.$0)
      } else if(e_132.$tag==1){
        var $phi$135 = g_131(e_132.$0)
      } else error("pattern match fail",e_132);
      return $phi$135
    }
  }
};
var splitEither_25 = function(a_135){
  var $_0_86_6806 = (map(function(e_136){
    if(e_136.$tag==0){
      var $phi$136 = e_136.$0
    } else error("pattern match fail",e_136);
    return $phi$136
  }))((filter((either_24(function(__138){
    return true
  }))(function(__139){
    return false
  })))(a_135));
  return (function($_1_87_6807){
    return {$0:$_0_86_6806,$1:$_1_87_6807}
  })((map(function(e_140){
    if(e_140.$tag==1){
      var $phi$137 = e_140.$0
    } else error("pattern match fail",e_140);
    return $phi$137
  }))((filter((either_24(function(__142){
    return false
  }))(function(__143){
    return true
  })))(a_135)))
};
var fromJust_20 = function(m_120){
  if(m_120.$tag==0){
    var $phi$138 = m_120.$0
  } else if(m_120.$tag==1){
    var $phi$138 = error("expected Just but got Nothing")
  } else error("pattern match fail",m_120);
  return $phi$138
};
var $gt$gt_17 = function(local$instance$Monad$0){
  return function(a_110){
    return function(b_111){
      var $phi$139 = local$instance$Monad$0.$1;
      return ($phi$139(a_110))(function(__112){
        return b_111
      })
    }
  }
};
var $gt_14 = function(local$instance$Ord$0){
  return function(a_104){
    return function(b_105){
      var $phi$140 = local$instance$Ord$0.$0;
      return ($phi$140(b_105))(a_104)
    }
  }
};
var TUnknown_608 = {$tag:5};
var TBot_606 = {$tag:3};
var Module_596 = function($_0_674){
  return function($_1_675){
    return function($_2_676){
      return function($_3_677){
        return function($_4_678){
          return function($_5_679){
            return function($_6_680){
              return {$0:$_0_674,$1:$_1_675,$2:$_2_676,$3:$_3_677,$4:$_4_678,$5:$_5_679,$6:$_6_680}
            }
          }
        }
      }
    }
  }
};
var AnnTag_582 = {$tag:4};
var breakableDownAndUpM_634 = function(local$instance$Monad$0){
  return function(down_920){
    return function(up_921){
      return function(e_922){
        var go_923 = ((breakableDownAndUpM_634(local$instance$Monad$0))(down_920))(up_921);
        var gos_924 = (mapM_50(local$instance$Monad$0))(function(d_925){
          var $phi$142 = local$instance$Monad$0.$1;
          var $phi$141 = ($phi$142(go_923(d_925.$1)))(function(e_928){
            var $phi$143 = local$instance$Monad$0.$0;
            return $phi$143({$0:d_925.$0,$1:e_928})
          });
          return $phi$141
        });
        var $phi$144 = local$instance$Monad$0.$1;
        return ($phi$144(down_920(e_922)))(function(e_929){
          if(e_929.$tag==1){
            var $phi$155 = local$instance$Monad$0.$0;
            var $phi$145 = $phi$155(e_929.$0)
          } else if(e_929.$tag==0){
            if(e_929.$0.$tag==3){
              var $phi$154 = local$instance$Monad$0.$1;
              var $phi$146 = ($phi$154(go_923(e_929.$0.$2)))(function(e_935){
                return up_921({$0:e_929.$0.$0,$1:e_929.$0.$1,$2:e_935,$tag:3})
              })
            } else if(e_929.$0.$tag==2){
              var $phi$152 = local$instance$Monad$0.$1;
              var $phi$146 = ($phi$152(go_923(e_929.$0.$1)))(function(f_939){
                var $phi$153 = local$instance$Monad$0.$1;
                return ($phi$153(go_923(e_929.$0.$2)))(function(x_940){
                  return up_921({$0:e_929.$0.$0,$1:f_939,$2:x_940,$tag:2})
                })
              })
            } else if(e_929.$0.$tag==4){
              var $phi$150 = local$instance$Monad$0.$1;
              var $phi$146 = ($phi$150(go_923(e_929.$0.$1)))(function(e_944){
                var $phi$151 = local$instance$Monad$0.$1;
                return ($phi$151(gos_924(e_929.$0.$2)))(function(ps_945){
                  return up_921({$0:e_929.$0.$0,$1:e_944,$2:ps_945,$tag:4})
                })
              })
            } else if(e_929.$0.$tag==5){
              var $phi$148 = local$instance$Monad$0.$1;
              var $phi$146 = ($phi$148(gos_924(e_929.$0.$1)))(function(bs_949){
                var $phi$149 = local$instance$Monad$0.$1;
                return ($phi$149(go_923(e_929.$0.$2)))(function(e_950){
                  return up_921({$0:e_929.$0.$0,$1:bs_949,$2:e_950,$tag:5})
                })
              })
            } else if(e_929.$0.$tag==6){
              var $phi$147 = local$instance$Monad$0.$1;
              var $phi$146 = ($phi$147(((mapM_50(local$instance$Monad$0))(go_923))(e_929.$0.$2)))(function(es_954){
                return up_921({$0:e_929.$0.$0,$1:e_929.$0.$1,$2:es_954,$tag:6})
              })
            } else var $phi$146 = up_921(e_929.$0);
            var $phi$145 = $phi$146
          } else error("pattern match fail",e_929);
          return $phi$145
        })
      }
    }
  }
};
var breakableDownM_638 = function(local$instance$Monad$0){
  return function(f_961){
    var $phi$156 = local$instance$Monad$0.$0;
    return ((breakableDownAndUpM_634(local$instance$Monad$0))(f_961))($phi$156)
  }
};
var breakableDownAndUp_629 = function(down_858){
  return function(up_859){
    return function(a_860){
      return function(e_861){
        var go_862 = (breakableDownAndUp_629(down_858))(up_859);
        var gos_863 = function(a_864){
          return (foldl(function(ar_865){
            return function(p_866){
              var $phi$158 = ar_865.$0;
              var $phi$159 = p_866.$1;
              var $phi$160 = (go_862($phi$158))($phi$159);
              var $phi$161 = p_866.$0;
              var $_0_86_13196 = $phi$161;
              var $phi$162 = ar_865.$1;
              var $_1_87_13195 = (push((function($_1_87_13197){
                return {$0:$_0_86_13196,$1:$_1_87_13197}
              })($phi$160.$1)))($phi$162);
              var $phi$157 = {$0:$phi$160.$0,$1:$_1_87_13195};
              return $phi$157
            }
          }))({$0:a_864,$1:[]})
        };
        var $phi$164 = (down_858(a_860))(e_861);
        if($phi$164.$tag==1){
          var $phi$163 = $phi$164.$0
        } else if($phi$164.$tag==0){
          if($phi$164.$0.$1.$tag==3){
            var $phi$184 = (go_862($phi$164.$0.$0))($phi$164.$0.$1.$2);
            var $phi$183 = {$0:$phi$184.$0,$1:{$0:$phi$164.$0.$1.$0,$1:$phi$164.$0.$1.$1,$2:$phi$184.$1,$tag:3}};
            var $phi$165 = $phi$183
          } else if($phi$164.$0.$1.$tag==2){
            var $phi$180 = (go_862($phi$164.$0.$0))($phi$164.$0.$1.$1);
            var $phi$182 = (go_862($phi$180.$0))($phi$164.$0.$1.$2);
            var $phi$181 = {$0:$phi$182.$0,$1:{$0:$phi$164.$0.$1.$0,$1:$phi$180.$1,$2:$phi$182.$1,$tag:2}};
            var $phi$179 = $phi$181;
            var $phi$165 = $phi$179
          } else if($phi$164.$0.$1.$tag==4){
            var $phi$176 = (go_862($phi$164.$0.$0))($phi$164.$0.$1.$1);
            var $phi$178 = (gos_863($phi$176.$0))($phi$164.$0.$1.$2);
            var $phi$177 = {$0:$phi$178.$0,$1:{$0:$phi$164.$0.$1.$0,$1:$phi$176.$1,$2:$phi$178.$1,$tag:4}};
            var $phi$175 = $phi$177;
            var $phi$165 = $phi$175
          } else if($phi$164.$0.$1.$tag==5){
            var $phi$172 = (gos_863($phi$164.$0.$0))($phi$164.$0.$1.$1);
            var $phi$174 = (go_862($phi$172.$0))($phi$164.$0.$1.$2);
            var $phi$173 = {$0:$phi$174.$0,$1:{$0:$phi$164.$0.$1.$0,$1:$phi$172.$1,$2:$phi$174.$1,$tag:5}};
            var $phi$171 = $phi$173;
            var $phi$165 = $phi$171
          } else if($phi$164.$0.$1.$tag==6){
            var $phi$170 = ((foldl(function(aes_903_6924){
              return function(e_904_6925){
                var $phi$169 = (go_862(aes_903_6924.$0))(e_904_6925);
                var $_1_87_13215 = (push($phi$169.$1))(aes_903_6924.$1);
                var $phi$168 = {$0:$phi$169.$0,$1:$_1_87_13215};
                var $phi$167 = $phi$168;
                return $phi$167
              }
            }))({$0:a_860,$1:[]}))($phi$164.$0.$1.$2);
            var $phi$166 = {$0:$phi$170.$0,$1:{$0:$phi$164.$0.$1.$0,$1:$phi$164.$0.$1.$1,$2:$phi$170.$1,$tag:6}};
            var $phi$165 = $phi$166
          } else var $phi$165 = {$0:$phi$164.$0.$0,$1:$phi$164.$0.$1};
          var ae_872 = $phi$165;
          var $phi$185 = (up_859(ae_872.$0))(ae_872.$1);
          var $phi$163 = $phi$185
        } else error("pattern match fail",$phi$164);
        return $phi$163
      }
    }
  }
};
var downAndUp_630 = function(down_914){
  return function(up_915){
    return (breakableDownAndUp_629(function(a_916){
      return function(e_917){
        var $_0_88_13222 = (down_914(a_916))(e_917);
        return {$0:$_0_88_13222,$tag:0}
      }
    }))(up_915)
  }
};
var up_631 = downAndUp_630(function($_0_86_13225){
  return function($_1_87_13226){
    return {$0:$_0_86_13225,$1:$_1_87_13226}
  }
});
var getAnn_613 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(name_721){
      return function(ann_722){
        return (((lookup_60(local$instance$Hashable$1))(local$instance$Eq$0))(name_721))(ann_722)
      }
    }
  }
};
var getAnnType_616 = function(ann_732){
  var $phi$187 = (((getAnn_613($instance$Hashable$13))($instance$Eq$1))("type"))(ann_732);
  if(($phi$187.$tag==0)&&($phi$187.$0.$tag==0)){
    var $phi$186 = $phi$187.$0.$0
  } else if($phi$187.$tag==1){
    var $phi$186 = TUnknown_608
  } else error("pattern match fail",$phi$187);
  return $phi$186
};
var annOf_626 = function(e_816){
  if(e_816.$tag==0){
    var $phi$188 = e_816.$0
  } else if(e_816.$tag==1){
    var $phi$188 = e_816.$0
  } else if(e_816.$tag==2){
    var $phi$188 = e_816.$0
  } else if(e_816.$tag==3){
    var $phi$188 = e_816.$0
  } else if(e_816.$tag==4){
    var $phi$188 = e_816.$0
  } else if(e_816.$tag==5){
    var $phi$188 = e_816.$0
  } else if(e_816.$tag==6){
    var $phi$188 = e_816.$0
  } else error("pattern match fail",e_816);
  return $phi$188
};
var withAnn_627 = function(ann_836){
  return function(e_837){
    if(e_837.$tag==0){
      var $phi$189 = {$0:ann_836,$1:e_837.$1,$tag:0}
    } else if(e_837.$tag==1){
      var $phi$189 = {$0:ann_836,$1:e_837.$1,$tag:1}
    } else if(e_837.$tag==2){
      var $phi$189 = {$0:ann_836,$1:e_837.$1,$2:e_837.$2,$tag:2}
    } else if(e_837.$tag==3){
      var $phi$189 = {$0:ann_836,$1:e_837.$1,$2:e_837.$2,$tag:3}
    } else if(e_837.$tag==4){
      var $phi$189 = {$0:ann_836,$1:e_837.$1,$2:e_837.$2,$tag:4}
    } else if(e_837.$tag==5){
      var $phi$189 = {$0:ann_836,$1:e_837.$1,$2:e_837.$2,$tag:5}
    } else if(e_837.$tag==6){
      var $phi$189 = {$0:ann_836,$1:e_837.$1,$2:e_837.$2,$tag:6}
    } else error("pattern match fail",e_837);
    return $phi$189
  }
};
var setAnn_614 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(name_723){
      return function(val_724){
        return function(ann_725){
          return ((((insert_61(local$instance$Hashable$1))(local$instance$Eq$0))(name_723))(val_724))(ann_725)
        }
      }
    }
  }
};
var setAnnType_617 = function(t_734){
  return function(ann_735){
    return ((((setAnn_614($instance$Hashable$13))($instance$Eq$1))("type"))({$0:t_734,$tag:0}))(ann_735)
  }
};
var setType_625 = function(t_795){
  return function(e_796){
    if(e_796.$tag==0){
      var $_0_646_6953 = (setAnnType_617(t_795))(e_796.$0);
      var $phi$190 = (function($_1_647_6954){
        return {$0:$_0_646_6953,$1:$_1_647_6954,$tag:0}
      })(e_796.$1)
    } else if(e_796.$tag==1){
      var $_0_648_6955 = (setAnnType_617(t_795))(e_796.$0);
      var $phi$190 = (function($_1_649_6956){
        return {$0:$_0_648_6955,$1:$_1_649_6956,$tag:1}
      })(e_796.$1)
    } else if(e_796.$tag==2){
      var $_0_650_6957 = (setAnnType_617(t_795))(e_796.$0);
      var $phi$190 = ((function($_1_651_6958){
        return function($_2_652_6959){
          return {$0:$_0_650_6957,$1:$_1_651_6958,$2:$_2_652_6959,$tag:2}
        }
      })(e_796.$1))(e_796.$2)
    } else if(e_796.$tag==3){
      var $_0_653_6960 = (setAnnType_617(t_795))(e_796.$0);
      var $phi$190 = ((function($_1_654_6961){
        return function($_2_655_6962){
          return {$0:$_0_653_6960,$1:$_1_654_6961,$2:$_2_655_6962,$tag:3}
        }
      })(e_796.$1))(e_796.$2)
    } else if(e_796.$tag==4){
      var $_0_656_6963 = (setAnnType_617(t_795))(e_796.$0);
      var $phi$190 = ((function($_1_657_6964){
        return function($_2_658_6965){
          return {$0:$_0_656_6963,$1:$_1_657_6964,$2:$_2_658_6965,$tag:4}
        }
      })(e_796.$1))(e_796.$2)
    } else if(e_796.$tag==5){
      var $_0_659_6966 = (setAnnType_617(t_795))(e_796.$0);
      var $phi$190 = ((function($_1_660_6967){
        return function($_2_661_6968){
          return {$0:$_0_659_6966,$1:$_1_660_6967,$2:$_2_661_6968,$tag:5}
        }
      })(e_796.$1))(e_796.$2)
    } else if(e_796.$tag==6){
      var $_0_662_6969 = (setAnnType_617(t_795))(e_796.$0);
      var $phi$190 = ((function($_1_663_6970){
        return function($_2_664_6971){
          return {$0:$_0_662_6969,$1:$_1_663_6970,$2:$_2_664_6971,$tag:6}
        }
      })(e_796.$1))(e_796.$2)
    } else error("pattern match fail",e_796);
    return $phi$190
  }
};
var equivBound_621 = function(a_745){
  return function(b_746){
    var $phi$193 = $instance$Eq$1.$0;
    var $phi$192 = ($and(($phi$193(a_745.$1))(b_746.$1)))((equivType_622(a_745.$2))(b_746.$2));
    var $phi$191 = $phi$192;
    return $phi$191
  }
};
var equivType_622 = function(a_753){
  return function(b_754){
    if(a_753.$tag==0){
      if(b_754.$tag==0){
        var $phi$207 = $instance$Eq$1.$0;
        var $phi$206 = ($phi$207(a_753.$1))(b_754.$1)
      } else var $phi$206 = false;
      var $phi$194 = $phi$206
    } else if(a_753.$tag==1){
      if(b_754.$tag==1){
        var $phi$205 = $instance$Eq$1.$0;
        var $phi$204 = ($phi$205(a_753.$1))(b_754.$1)
      } else var $phi$204 = false;
      var $phi$194 = $phi$204
    } else if(a_753.$tag==2){
      if(b_754.$tag==2){
        var $phi$203 = ($and((equivType_622(a_753.$1))(b_754.$1)))((equivType_622(a_753.$2))(b_754.$2))
      } else var $phi$203 = false;
      var $phi$194 = $phi$203
    } else if(a_753.$tag==3){
      if(b_754.$tag==3){
        var $phi$202 = true
      } else var $phi$202 = false;
      var $phi$194 = $phi$202
    } else if(a_753.$tag==5){
      if(b_754.$tag==5){
        var $phi$201 = true
      } else var $phi$201 = false;
      var $phi$194 = $phi$201
    } else if(a_753.$tag==4){
      if(b_754.$tag==4){
        var rbs_783 = (all_33(function(p_785){
          var $phi$196 = p_785.$0;
          var $phi$197 = p_785.$1;
          return (equivBound_621($phi$196))($phi$197)
        }))((zip_37(a_753.$2))(b_754.$2));
        var rvs_782 = (all_33(function(p_784){
          var $phi$198 = $instance$Eq$1.$0;
          var $phi$199 = p_784.$0;
          var $phi$200 = p_784.$1;
          return ($phi$198($phi$199))($phi$200)
        }))((zip_37(a_753.$1))(b_754.$1));
        var $phi$195 = ($and(($and(rvs_782))(rbs_783)))((equivType_622(a_753.$3))(b_754.$3))
      } else error("pattern match fail",b_754);
      var $phi$194 = $phi$195
    } else error("pattern match fail",a_753);
    return $phi$194
  }
};
var getAnnCodeLoc_618 = function(ann_736){
  return (((getAnn_613($instance$Hashable$13))($instance$Eq$1))("codeLoc"))(ann_736)
};
var copyAnn_615 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(names_726){
      return function(ann_727){
        return ((foldl(function(r_729_6987){
          return function(n_730_6988){
            var $phi$209 = (((getAnn_613(local$instance$Hashable$1))(local$instance$Eq$0))(n_730_6988))(ann_727);
            if($phi$209.$tag==1){
              var $phi$208 = r_729_6987
            } else if($phi$209.$tag==0){
              var $phi$208 = ((((setAnn_614(local$instance$Hashable$1))(local$instance$Eq$0))(n_730_6988))($phi$209.$0))(r_729_6987)
            } else error("pattern match fail",$phi$209);
            return $phi$208
          }
        }))(Empty_7))(names_726)
      }
    }
  }
};
var timed_1116 = function(n_1152){
  return function(p_1153){
    return function(i_1154){
      var $phi$210 = $instance$Monad$11.$1;
      var $phi$211 = $instance$Monad$11.$1;
      return ($phi$210((($gt$gt_17($instance$Monad$11))(($phi$211(gets_52))(function(s_1140_7123){
        var m_118_13242 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(n_1152))(s_1140_7123.$2);
        if(m_118_13242.$tag==0){
          var $phi$213 = m_118_13242.$0
        } else if(m_118_13242.$tag==1){
          var $phi$213 = []
        } else error("pattern match fail",m_118_13242);
        var nts_1144_7127 = $phi$213;
        var $_2_1120_7133 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(n_1152))((push(currentTimeMs(Unit_0)))(nts_1144_7127)))(s_1140_7123.$2);
        var s_233_16095 = {$0:s_1140_7123.$0,$1:s_1140_7123.$1,$2:$_2_1120_7133};
        var $phi$212 = {$0:function(__234_13179_16096){
          return {$0:s_233_16095,$1:Unit_0}
        }};
        return $phi$212
      })))(p_1153(i_1154))))(function(o_1155){
        var $phi$214 = $instance$Monad$11.$1;
        var $phi$217 = $instance$Monad$11.$0;
        return (($gt$gt_17($instance$Monad$11))(($phi$214(gets_52))(function(s_1146_7135){
          var m_118_13245 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(n_1152))(s_1146_7135.$2);
          if(m_118_13245.$tag==0){
            var $phi$216 = m_118_13245.$0
          } else if(m_118_13245.$tag==1){
            var $phi$216 = []
          } else error("pattern match fail",m_118_13245);
          var nts_1150_7139 = $phi$216;
          var start_1151_7140 = (getIx((length(nts_1150_7139))-1))(nts_1150_7139);
          var $_2_1120_7146 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(n_1152))((push((currentTimeMs(Unit_0))-start_1151_7140))(((slice2(0))((length(nts_1150_7139))-1))(nts_1150_7139))))(s_1146_7135.$2);
          var s_233_16098 = {$0:s_1146_7135.$0,$1:s_1146_7135.$1,$2:$_2_1120_7146};
          var $phi$215 = {$0:function(__234_13179_16099){
            return {$0:s_233_16098,$1:Unit_0}
          }};
          return $phi$215
        })))($phi$217(o_1155))
      })
    }
  }
};
var setUid_1112 = function(uid_1134){
  var $phi$218 = $instance$Monad$11.$1;
  return ($phi$218(gets_52))(function(s_1135){
    var $phi$219 = {$0:function(__234_13179_16102){
      return {$0:{$0:s_1135.$0,$1:uid_1134,$2:s_1135.$2},$1:Unit_0}
    }};
    return $phi$219
  })
};
var $phi$220 = $instance$Monad$11.$1;
var getUid_1111 = ($phi$220(gets_52))(function(s_1130){
  var $phi$222 = $instance$Monad$11.$0;
  var $phi$221 = $phi$222(s_1130.$1);
  return $phi$221
});
var setExports_1110 = function(ex_1125){
  var $phi$223 = $instance$Monad$11.$1;
  return ($phi$223(gets_52))(function(s_1126){
    var $phi$224 = {$0:function(__234_13179_16105){
      return {$0:{$0:ex_1125,$1:s_1126.$1,$2:s_1126.$2},$1:Unit_0}
    }};
    return $phi$224
  })
};
var $phi$225 = $instance$Monad$11.$1;
var getExports_1109 = ($phi$225(gets_52))(function(s_1121){
  var $phi$227 = $instance$Monad$11.$0;
  var $phi$226 = $phi$227(s_1121.$0);
  return $phi$226
});
var mkConFun_1316 = function(tag_1340){
  return function(dt_1341){
    return function(vs_1342){
      return function(n_1343){
        return function(ts_1344){
          var nts_1345 = (map(function(it_1351){
            var $phi$228 = it_1351.$0;
            var $_0_86_13247 = ($concat("$_"))(intToString($phi$228));
            var $phi$229 = it_1351.$1;
            return (function($_1_87_13248){
              return {$0:$_0_86_13247,$1:$_1_87_13248}
            })($phi$229)
          }))(zipWithIndex_36(ts_1344));
          var $_0_662_13255 = Empty_7;
          var new_1346 = (setType_625(dt_1341))(((function($_1_663_13256){
            return function($_2_664_13257){
              return {$0:Empty_7,$1:$_1_663_13256,$2:$_2_664_13257,$tag:6}
            }
          })(n_1343))((map(function(nt_1352){
            var $_0_646_13258 = Empty_7;
            var $phi$230 = nt_1352.$0;
            return (function($_1_647_13259){
              return {$0:Empty_7,$1:$_1_647_13259,$tag:0}
            })($phi$230)
          }))(nts_1345)));
          var con_1348 = ((foldr(function(r_1353_7271){
            return function(nt_1354_7272){
              var $_0_706_13263 = Empty_7;
              var $_0_706_13266 = Empty_7;
              var $_0_702_13269 = Empty_7;
              var a_101_13273 = annOf_626(r_1353_7271);
              var $_0_653_13274 = Empty_7;
              var $phi$231 = (setType_625(((function($_1_707_13264){
                return function($_2_708_13265){
                  return {$0:Empty_7,$1:$_1_707_13264,$2:$_2_708_13265,$tag:2}
                }
              })(((function($_1_707_13267){
                return function($_2_708_13268){
                  return {$0:Empty_7,$1:$_1_707_13267,$2:$_2_708_13268,$tag:2}
                }
              })((function($_1_703_13270){
                return {$0:Empty_7,$1:$_1_703_13270,$tag:0}
              })("->")))(nt_1354_7272.$1)))(getAnnType_616(a_101_13273))))(((function($_1_654_13275){
                return function($_2_655_13276){
                  return {$0:Empty_7,$1:$_1_654_13275,$2:$_2_655_13276,$tag:3}
                }
              })(nt_1354_7272.$0))(r_1353_7271));
              return $phi$231
            }
          }))(new_1346))(nts_1345);
          var $_0_709_13277 = Empty_7;
          var a_101_13283 = annOf_626(con_1348);
          var conT_1349 = (((function($_1_710_13278){
            return function($_2_711_13279){
              return function($_3_712_13280){
                return {$0:Empty_7,$1:$_1_710_13278,$2:$_2_711_13279,$3:$_3_712_13280,$tag:4}
              }
            }
          })(vs_1342))([]))(getAnnType_616(a_101_13283));
          var ann_1350 = ((((setAnn_614($instance$Hashable$13))($instance$Eq$1))("export"))({$0:n_1343,$tag:5}))(((((setAnn_614($instance$Hashable$13))($instance$Eq$1))("type"))({$0:conT_1349,$tag:0}))(((((setAnn_614($instance$Hashable$13))($instance$Eq$1))("data"))({$0:tag_1340,$tag:3}))(Empty_7)));
          var $_1_87_13288 = (withAnn_627(ann_1350))(con_1348);
          return {$0:n_1343,$1:$_1_87_13288}
        }
      }
    }
  }
};
var newIdent_1506 = function(n_1513){
  var $phi$232 = $instance$Monad$11.$1;
  return ($phi$232(gets_52))(function(i_1514){
    var s_233_16107 = i_1514+1;
    var $phi$233 = $instance$Monad$11.$0;
    return (($gt$gt_17($instance$Monad$11))({$0:function(__234_13179_16108){
      return {$0:s_233_16107,$1:Unit_0}
    }}))($phi$233(($concat(($concat(n_1513))("_")))(intToString(i_1514))))
  })
};
var rewriteExpr_1507 = function(env_1515){
  return function(e_1516){
    var renamePat_1518 = function(p_1522){
      if(p_1522.$tag==1){
        var $phi$246 = $instance$Monad$11.$0;
        var $phi$234 = $phi$246({$0:p_1522,$1:empty})
      } else if(p_1522.$tag==0){
        var $phi$244 = $instance$Monad$11.$1;
        var $phi$234 = ($phi$244(newIdent_1506(p_1522.$1)))(function(n_1527){
          var $phi$245 = $instance$Monad$11.$0;
          var $_1_87_13319 = ((set(p_1522.$1))(n_1527))(empty);
          return $phi$245({$0:{$0:p_1522.$0,$1:n_1527,$tag:0},$1:$_1_87_13319})
        })
      } else if(p_1522.$tag==2){
        var $phi$235 = $instance$Monad$11.$1;
        var $phi$234 = ($phi$235(((mapM_50($instance$Monad$11))(renamePat_1518))(p_1522.$2)))(function(ps_1531){
          var $phi$237 = (has(p_1522.$1))(env_1515);
          if(!$phi$237){
            var $phi$241 = $instance$Monad$11.$0;
            var $_2_673_13326 = (map(function(p_124_13327){
              var $phi$242 = p_124_13327.$0;
              return $phi$242
            }))(ps_1531);
            var $_0_86_13322 = {$0:p_1522.$0,$1:p_1522.$1,$2:$_2_673_13326,$tag:2};
            var $phi$236 = $phi$241((function($_1_87_13323){
              return {$0:$_0_86_13322,$1:$_1_87_13323}
            })(((foldl(merge))(empty))((map(function(p_127_13330){
              var $phi$243 = p_127_13330.$1;
              return $phi$243
            }))(ps_1531))))
          } else if($phi$237){
            var $phi$238 = $instance$Monad$11.$0;
            var $_1_672_13336 = (get(p_1522.$1))(env_1515);
            var $_0_86_13333 = (function($_2_673_13337){
              return {$0:p_1522.$0,$1:$_1_672_13336,$2:$_2_673_13337,$tag:2}
            })((map(function(p_124_13338){
              var $phi$239 = p_124_13338.$0;
              return $phi$239
            }))(ps_1531));
            var $phi$236 = $phi$238((function($_1_87_13334){
              return {$0:$_0_86_13333,$1:$_1_87_13334}
            })(((foldl(merge))(empty))((map(function(p_127_13341){
              var $phi$240 = p_127_13341.$1;
              return $phi$240
            }))(ps_1531))))
          } else error("pattern match fail",$phi$237);
          return $phi$236
        })
      } else error("pattern match fail",p_1522);
      return $phi$234
    };
    return ((breakableDownM_638($instance$Monad$11))(function(e_1539_7493){
      if(e_1539_7493.$tag==3){
        var $phi$269 = $instance$Monad$11.$1;
        var $phi$247 = ($phi$269(newIdent_1506(e_1539_7493.$1)))(function(n_1543_7497){
          var $phi$270 = $instance$Monad$11.$1;
          return ($phi$270((rewriteExpr_1507(((set(e_1539_7493.$1))(n_1543_7497))(env_1515)))(e_1539_7493.$2)))(function(e_1544_7498){
            var $phi$271 = $instance$Monad$11.$0;
            return $phi$271({$0:{$0:e_1539_7493.$0,$1:n_1543_7497,$2:e_1544_7498,$tag:3},$tag:1})
          })
        })
      } else if(e_1539_7493.$tag==5){
        var $phi$265 = $instance$Monad$11.$1;
        var $phi$247 = ($phi$265((rewriteBindings_1509(env_1515))(e_1539_7493.$1)))(function(ebs_1548_7502){
          var $phi$267 = $instance$Monad$11.$1;
          var $phi$266 = ($phi$267((rewriteExpr_1507(ebs_1548_7502.$0))(e_1539_7493.$2)))(function(e_1551_7505){
            var $phi$268 = $instance$Monad$11.$0;
            return $phi$268({$0:{$0:e_1539_7493.$0,$1:ebs_1548_7502.$1,$2:e_1551_7505,$tag:5},$tag:1})
          });
          return $phi$266
        })
      } else if(e_1539_7493.$tag==4){
        var $phi$257 = $instance$Monad$11.$1;
        var $phi$247 = ($phi$257((rewriteExpr_1507(env_1515))(e_1539_7493.$1)))(function(e_1555_7509){
          var $phi$258 = $instance$Monad$11.$1;
          return ($phi$258(((mapM_50($instance$Monad$11))(function(p_1532_7542){
            var $phi$260 = $instance$Monad$11.$1;
            var $phi$259 = ($phi$260(renamePat_1518(p_1532_7542.$0)))(function(pe_1535_7545){
              var $phi$262 = $instance$Monad$11.$1;
              var $phi$261 = ($phi$262((rewriteExpr_1507((merge(env_1515))(pe_1535_7545.$1)))(p_1532_7542.$1)))(function(e_1538_7548){
                var $phi$263 = $instance$Monad$11.$0;
                return $phi$263({$0:pe_1535_7545.$0,$1:e_1538_7548})
              });
              return $phi$261
            });
            return $phi$259
          }))(e_1539_7493.$2)))(function(ps_1556_7510){
            var $phi$264 = $instance$Monad$11.$0;
            return $phi$264({$0:{$0:e_1539_7493.$0,$1:e_1555_7509,$2:ps_1556_7510,$tag:4},$tag:1})
          })
        })
      } else if(e_1539_7493.$tag==0){
        var $phi$254 = (has(e_1539_7493.$1))(env_1515);
        if($phi$254){
          var $phi$256 = $instance$Monad$11.$0;
          var $_1_647_13360 = (get(e_1539_7493.$1))(env_1515);
          var $_0_88_13358 = {$0:e_1539_7493.$0,$1:$_1_647_13360,$tag:0};
          var $phi$253 = $phi$256({$0:$_0_88_13358,$tag:0})
        } else if(!$phi$254){
          var $phi$255 = $instance$Monad$11.$0;
          var $phi$253 = $phi$255({$0:e_1539_7493,$tag:0})
        } else error("pattern match fail",$phi$254);
        var $phi$247 = $phi$253
      } else if(e_1539_7493.$tag==6){
        var $phi$250 = (has(e_1539_7493.$1))(env_1515);
        if($phi$250){
          var $phi$252 = $instance$Monad$11.$0;
          var $_1_663_13364 = (get(e_1539_7493.$1))(env_1515);
          var $_0_88_13362 = (function($_2_664_13365){
            return {$0:e_1539_7493.$0,$1:$_1_663_13364,$2:$_2_664_13365,$tag:6}
          })(e_1539_7493.$2);
          var $phi$249 = $phi$252({$0:$_0_88_13362,$tag:0})
        } else if(!$phi$250){
          var $phi$251 = $instance$Monad$11.$0;
          var $phi$249 = $phi$251({$0:e_1539_7493,$tag:0})
        } else error("pattern match fail",$phi$250);
        var $phi$247 = $phi$249
      } else {
        var $phi$248 = $instance$Monad$11.$0;
        var $phi$247 = $phi$248({$0:e_1539_7493,$tag:0})
      };
      return $phi$247
    }))(e_1516)
  }
};
var rewriteBindings_1509 = function(env_1574){
  return function(bs_1575){
    var ns_1576 = (map(function(p_124_13368){
      var $phi$272 = p_124_13368.$0;
      return $phi$272
    }))(bs_1575);
    var ns2_1577 = ((mapM_50($instance$Monad$11))(newIdent_1506))(ns_1576);
    var $phi$273 = $instance$Monad$11.$1;
    return ($phi$273(ns2_1577))(function(ns_1578){
      var env2_1579 = (merge(env_1574))(toRecord_47((zip_37((map(function(p_124_13371){
        var $phi$274 = p_124_13371.$0;
        return $phi$274
      }))(bs_1575)))(ns_1578)));
      var bs2_1580 = ((mapM_50($instance$Monad$11))(rewriteExpr_1507(env2_1579)))((map(function(p_127_13374){
        var $phi$275 = p_127_13374.$1;
        return $phi$275
      }))(bs_1575));
      var $phi$276 = $instance$Monad$11.$1;
      return ($phi$276(bs2_1580))(function(bs_1581){
        var $phi$277 = $instance$Monad$11.$0;
        var $_1_87_13378 = (zip_37(ns_1578))(bs_1581);
        return $phi$277({$0:env2_1579,$1:$_1_87_13378})
      })
    })
  }
};
var printType_1768 = function(t_1774){
  var printParen_1775 = function(t_1779){
    return ($concat(($concat("("))(printType_1768(t_1779))))(")")
  };
  if(t_1774.$tag==0){
    var $phi$278 = t_1774.$1
  } else if(t_1774.$tag==1){
    var $phi$278 = t_1774.$1
  } else if(t_1774.$tag==3){
    var $phi$278 = "~bottom~"
  } else if(t_1774.$tag==5){
    var $phi$278 = "?"
  } else if((t_1774.$tag==2)&&((t_1774.$1.$tag==2)&&((t_1774.$1.$1.$tag==0)&&("->"==t_1774.$1.$1.$1)))){
    if((t_1774.$1.$2.$tag==2)&&((t_1774.$1.$2.$1.$tag==2)&&((t_1774.$1.$2.$1.$1.$tag==0)&&("->"==t_1774.$1.$2.$1.$1.$1)))){
      var $phi$283 = printParen_1775(t_1774.$1.$2)
    } else if(t_1774.$1.$2.$tag==4){
      var $phi$283 = printParen_1775(t_1774.$1.$2)
    } else var $phi$283 = printType_1768(t_1774.$1.$2);
    var $phi$278 = ($concat(($concat($phi$283))(" -> ")))(printType_1768(t_1774.$2))
  } else if(t_1774.$tag==2){
    if((t_1774.$1.$tag==2)&&((t_1774.$1.$1.$tag==2)&&((t_1774.$1.$1.$1.$tag==0)&&("->"==t_1774.$1.$1.$1.$1)))){
      var $phi$281 = printParen_1775(t_1774.$1)
    } else if(t_1774.$1.$tag==4){
      var $phi$281 = printParen_1775(t_1774.$1)
    } else var $phi$281 = printType_1768(t_1774.$1);
    if(t_1774.$2.$tag==2){
      var $phi$282 = printParen_1775(t_1774.$2)
    } else if(t_1774.$2.$tag==4){
      var $phi$282 = printParen_1775(t_1774.$2)
    } else var $phi$282 = printType_1768(t_1774.$2);
    var $phi$278 = ($concat(($concat($phi$281))(" ")))($phi$282)
  } else if(t_1774.$tag==4){
    var $phi$280 = length(t_1774.$2);
    if(0==$phi$280){
      var $phi$279 = ""
    } else var $phi$279 = ($concat(" with "))((intercalate(", "))((map(printTypeBound_1769))(t_1774.$2)));
    var bounds_1827 = $phi$279;
    var $phi$278 = ($concat(($concat(($concat(($concat("forall "))((intercalate(", "))(t_1774.$1))))(bounds_1827)))(". ")))(printType_1768(t_1774.$3))
  } else var $phi$278 = error(($concat("cannot print "))(jsonStringify(t_1774)));
  return $phi$278
};
var printTypeBound_1769 = function(b_1830){
  var $phi$284 = ($concat(($concat(($concat(($concat(b_1830.$1))(" ")))("(")))(printType_1768(b_1830.$2))))(")");
  return $phi$284
};
var mergeCount_2045 = function(local$instance$Hashable$1){
  return function(local$instance$Eq$0){
    return function(a_2078){
      return function(b_2079){
        return ((foldTrie_66(function(a_2080){
          return function(k_2081){
            return function(v_2082){
              var m_118_13430 = (((lookup_60(local$instance$Hashable$1))(local$instance$Eq$0))(k_2081))(a_2080);
              if(m_118_13430.$tag==0){
                var $phi$285 = m_118_13430.$0
              } else if(m_118_13430.$tag==1){
                var $phi$285 = 0
              } else error("pattern match fail",m_118_13430);
              return ((((insert_61(local$instance$Hashable$1))(local$instance$Eq$0))(k_2081))(v_2082+$phi$285))(a_2080)
            }
          }
        }))(a_2078))(b_2079)
      }
    }
  }
};
var getCount_2044 = function(e_2076){
  var $phi$287 = (((getAnn_613($instance$Hashable$13))($instance$Eq$1))("useCount"))(annOf_626(e_2076));
  if(($phi$287.$tag==0)&&($phi$287.$0.$tag==2)){
    var $phi$286 = $phi$287.$0.$0
  } else error("pattern match fail",$phi$287);
  return $phi$286
};
var annWithUseCount_2046 = function(e_2083){
  var dropCount_2084 = function(local$instance$Hashable$1){
    return function(local$instance$Eq$0){
      return function(n_2088){
        return function(c_2089){
          return (((remove_63(local$instance$Hashable$1))(local$instance$Eq$0))(n_2088))(c_2089)
        }
      }
    }
  };
  var countPat_2086 = function(c_2093){
    return function(p_2094){
      if(p_2094.$tag==0){
        var $phi$288 = (((dropCount_2084($instance$Hashable$13))($instance$Eq$1))(p_2094.$1))(c_2093)
      } else if(p_2094.$tag==2){
        var $phi$288 = ((foldl(countPat_2086))(c_2093))(p_2094.$2)
      } else var $phi$288 = c_2093;
      return $phi$288
    }
  };
  return ((up_631(function(a_2125){
    return function(e_2126){
      var f_100_13436 = function($_0_643_13438){
        return {$0:$_0_643_13438,$tag:2}
      };
      if(e_2126.$tag==0){
        var $phi$289 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(e_2126.$1))(1))(Empty_7)
      } else if(e_2126.$tag==2){
        var $phi$289 = (((mergeCount_2045($instance$Hashable$13))($instance$Eq$1))(getCount_2044(e_2126.$1)))(getCount_2044(e_2126.$2))
      } else if(e_2126.$tag==3){
        var $phi$289 = (((dropCount_2084($instance$Hashable$13))($instance$Eq$1))(e_2126.$1))(getCount_2044(e_2126.$2))
      } else if(e_2126.$tag==5){
        var $phi$289 = ((foldl(function(c_2113_8043){
          return function(n_2114_8044){
            return (((dropCount_2084($instance$Hashable$13))($instance$Eq$1))(n_2114_8044))(c_2113_8043)
          }
        }))(((foldl(function(c_2115_8045){
          return function(e_2116_8046){
            return (((mergeCount_2045($instance$Hashable$13))($instance$Eq$1))(c_2115_8045))(getCount_2044(e_2116_8046))
          }
        }))(getCount_2044(e_2126.$2)))((map(function(p_127_13439){
          var $phi$291 = p_127_13439.$1;
          return $phi$291
        }))(e_2126.$1))))((map(function(p_124_13442){
          var $phi$292 = p_124_13442.$0;
          return $phi$292
        }))(e_2126.$1))
      } else if(e_2126.$tag==4){
        var $phi$289 = ((foldl((mergeCount_2045($instance$Hashable$13))($instance$Eq$1)))(getCount_2044(e_2126.$1)))((map(function(pe_2090_8055){
          var $phi$290 = (countPat_2086(getCount_2044(pe_2090_8055.$1)))(pe_2090_8055.$0);
          return $phi$290
        }))(e_2126.$2))
      } else if(e_2126.$tag==1){
        var $phi$289 = Empty_7
      } else if(e_2126.$tag==6){
        var $phi$289 = ((foldl((mergeCount_2045($instance$Hashable$13))($instance$Eq$1)))(Empty_7))((map(getCount_2044))(e_2126.$2))
      } else error("pattern match fail",e_2126);
      var a_101_13433 = (withAnn_627(((((setAnn_614($instance$Hashable$13))($instance$Eq$1))("useCount"))((function(a_101_13437){
        return {$0:a_101_13437,$tag:2}
      })($phi$289)))(annOf_626(e_2126))))(e_2126);
      return {$0:a_2125,$1:a_101_13433}
    }
  }))(Unit_0))(e_2083)
};
var patSize_2054 = function(p_2194){
  if(p_2194.$tag==0){
    var $phi$293 = 1
  } else if(p_2194.$tag==1){
    var $phi$293 = 1
  } else if(p_2194.$tag==2){
    var $phi$293 = ((foldl(function(c_2202){
      return function(p_2203){
        return c_2202+(patSize_2054(p_2203))
      }
    }))(1))(p_2194.$2)
  } else error("pattern match fail",p_2194);
  return $phi$293
};
var exprSize_2053 = function(e_2166){
  if(e_2166.$tag==0){
    var $phi$294 = 1
  } else if(e_2166.$tag==1){
    var $phi$294 = 1
  } else if(e_2166.$tag==2){
    var $phi$294 = (1+(exprSize_2053(e_2166.$1)))+(exprSize_2053(e_2166.$2))
  } else if(e_2166.$tag==3){
    var $phi$294 = 1+(exprSize_2053(e_2166.$2))
  } else if(e_2166.$tag==4){
    var $phi$294 = 1+(((foldl(function(c_2180){
      return function(p_2181){
        var $phi$296 = (c_2180+(patSize_2054(p_2181.$0)))+(exprSize_2053(p_2181.$1));
        return $phi$296
      }
    }))(exprSize_2053(e_2166.$1)))(e_2166.$2))
  } else if(e_2166.$tag==5){
    var $phi$294 = 1+(((foldl(function(c_2187){
      return function(b_2188){
        var $phi$295 = b_2188.$1;
        return c_2187+(exprSize_2053($phi$295))
      }
    }))(exprSize_2053(e_2166.$2)))(e_2166.$1))
  } else if(e_2166.$tag==6){
    var $phi$294 = ((foldl(function(c_2192){
      return function(e_2193){
        return c_2192+(exprSize_2053(e_2193))
      }
    }))(1))(e_2166.$2)
  } else error("pattern match fail",e_2166);
  return $phi$294
};
var chooseForInlining_2055 = function(baseCount_2204){
  return function(bs_2205){
    var useCount_2206 = ((foldl((mergeCount_2045($instance$Hashable$13))($instance$Eq$1)))(baseCount_2204))((map(function(b_2208){
      var $phi$297 = b_2208.$1;
      return getCount_2044($phi$297)
    }))(bs_2205));
    return ((foldl(function(r_2209_8064){
      return function(b_2210_8065){
        if(b_2210_8065.$1.$tag==0){
          var $phi$299 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(b_2210_8065.$0))(b_2210_8065.$1))(r_2209_8064)
        } else if(b_2210_8065.$1.$tag==1){
          var $phi$299 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(b_2210_8065.$0))(b_2210_8065.$1))(r_2209_8064)
        } else if(b_2210_8065.$1.$tag==3){
          var $phi$305 = $instance$Ord$2.$0;
          var $phi$306 = $instance$Eq$0.$0;
          var m_118_13452 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(b_2210_8065.$0))(useCount_2206);
          if(m_118_13452.$tag==0){
            var $phi$307 = m_118_13452.$0
          } else if(m_118_13452.$tag==1){
            var $phi$307 = 0
          } else error("pattern match fail",m_118_13452);
          var $phi$308 = ($or(($phi$305(exprSize_2053(b_2210_8065.$1)))(10)))(($phi$306(1))($phi$307));
          if(!$phi$308){
            var $phi$304 = r_2209_8064
          } else if($phi$308){
            var $phi$304 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(b_2210_8065.$0))(b_2210_8065.$1))(r_2209_8064)
          } else error("pattern match fail",$phi$308);
          var $phi$299 = $phi$304
        } else if(b_2210_8065.$1.$tag==6){
          var $phi$301 = $instance$Eq$0.$0;
          var m_118_13455 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(b_2210_8065.$0))(useCount_2206);
          if(m_118_13455.$tag==0){
            var $phi$302 = m_118_13455.$0
          } else if(m_118_13455.$tag==1){
            var $phi$302 = 0
          } else error("pattern match fail",m_118_13455);
          var $phi$303 = ($phi$301(1))($phi$302);
          if(!$phi$303){
            var $phi$300 = r_2209_8064
          } else if($phi$303){
            var $phi$300 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(b_2210_8065.$0))(b_2210_8065.$1))(r_2209_8064)
          } else error("pattern match fail",$phi$303);
          var $phi$299 = $phi$300
        } else var $phi$299 = r_2209_8064;
        var $phi$298 = $phi$299;
        return $phi$298
      }
    }))(Empty_7))(bs_2205)
  }
};
var mapBindingsM_2048 = function(local$instance$Monad$0){
  return function(f_2132){
    return function(bs_2133){
      return ((mapM_50(local$instance$Monad$0))(function(b_2134){
        var $phi$310 = local$instance$Monad$0.$1;
        var $phi$309 = ($phi$310((f_2132(b_2134.$0))(b_2134.$1)))(function(e_2137){
          var $phi$311 = local$instance$Monad$0.$0;
          return $phi$311({$0:b_2134.$0,$1:e_2137})
        });
        return $phi$309
      }))(bs_2133)
    }
  }
};
var inlineCode_2057 = function(always_2238){
  return function(e_2239){
    var withAnnCopy_2240 = function(ann_2243){
      return function(e_2244){
        return (withAnn_627((((mergeTrie_70($instance$Hashable$13))($instance$Eq$1))((((remove_63($instance$Hashable$13))($instance$Eq$1))("export"))(annOf_626(e_2244))))((((copyAnn_615($instance$Hashable$13))($instance$Eq$1))(["export"]))(ann_2243))))(e_2244)
      }
    };
    var inlinePat_2242 = function(p_2266){
      if(p_2266.$tag==2){
        var $phi$314 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(p_2266.$1))(always_2238);
        if(($phi$314.$tag==0)&&($phi$314.$0.$tag==0)){
          var $_2_673_13461 = (map(inlinePat_2242))(p_2266.$2);
          var $phi$313 = {$0:p_2266.$0,$1:$phi$314.$0.$1,$2:$_2_673_13461,$tag:2}
        } else {
          var $_2_673_13464 = (map(inlinePat_2242))(p_2266.$2);
          var $phi$313 = {$0:p_2266.$0,$1:p_2266.$1,$2:$_2_673_13464,$tag:2}
        };
        var $phi$312 = $phi$313
      } else var $phi$312 = p_2266;
      return $phi$312
    };
    return ((breakableDownM_638($instance$Monad$11))(function(e_2245_8114){
      if(e_2245_8114.$tag==0){
        var $phi$326 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(e_2245_8114.$1))(always_2238);
        if($phi$326.$tag==1){
          var $phi$328 = $instance$Monad$11.$0;
          var $phi$325 = $phi$328({$0:e_2245_8114,$tag:0})
        } else if($phi$326.$tag==0){
          var $phi$327 = $instance$Functor$9.$0;
          var $phi$325 = ($phi$327(function(e_2249_8118){
            var $_0_88_13466 = (withAnnCopy_2240(e_2245_8114.$0))(e_2249_8118);
            return {$0:$_0_88_13466,$tag:0}
          }))((rewriteExpr_1507(empty))($phi$326.$0))
        } else error("pattern match fail",$phi$326);
        var $phi$315 = $phi$325
      } else if(e_2245_8114.$tag==5){
        var always2_2253_8122 = (((mergeTrie_70($instance$Hashable$13))($instance$Eq$1))(always_2238))((chooseForInlining_2055(getCount_2044(e_2245_8114.$2)))(e_2245_8114.$1));
        var $phi$319 = $instance$Monad$11.$1;
        var $phi$315 = ($phi$319(((mapBindingsM_2048($instance$Monad$11))(function(n_2254_8123){
          return function(e_2255_8124){
            return (inlineCode_2057((((remove_63($instance$Hashable$13))($instance$Eq$1))(n_2254_8123))(always2_2253_8122)))(e_2255_8124)
          }
        }))(e_2245_8114.$1)))(function(bs_2256_8125){
          var $phi$320 = $instance$Monad$11.$1;
          return ($phi$320((inlineCode_2057(always2_2253_8122))(e_2245_8114.$2)))(function(e_2257_8126){
            var $phi$322 = length(bs_2256_8125);
            if(0==$phi$322){
              var $phi$324 = $instance$Monad$11.$0;
              var $_0_89_13467 = (withAnnCopy_2240(e_2245_8114.$0))(e_2257_8126);
              var $phi$321 = $phi$324({$0:$_0_89_13467,$tag:1})
            } else {
              var $phi$323 = $instance$Monad$11.$0;
              var $phi$321 = $phi$323({$0:{$0:e_2245_8114.$0,$1:bs_2256_8125,$2:e_2257_8126,$tag:5},$tag:1})
            };
            return $phi$321
          })
        })
      } else if(e_2245_8114.$tag==4){
        var $phi$317 = $instance$Monad$11.$0;
        var $_2_658_13475 = (map(function(p_2262_8131){
          var $_0_86_13476 = inlinePat_2242(p_2262_8131.$0);
          var $phi$318 = (function($_1_87_13477){
            return {$0:$_0_86_13476,$1:$_1_87_13477}
          })(p_2262_8131.$1);
          return $phi$318
        }))(e_2245_8114.$2);
        var $_0_88_13472 = {$0:e_2245_8114.$0,$1:e_2245_8114.$1,$2:$_2_658_13475,$tag:4};
        var $phi$315 = $phi$317({$0:$_0_88_13472,$tag:0})
      } else {
        var $phi$316 = $instance$Monad$11.$0;
        var $phi$315 = $phi$316({$0:e_2245_8114,$tag:0})
      };
      return $phi$315
    }))(e_2239)
  }
};
var dropDeadBindings_2058 = function(useCount_2274){
  return function(bs_2275){
    return (mapJust_39(function(b_2279_8159){
      var m_118_13480 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(b_2279_8159.$0))(useCount_2274);
      if(m_118_13480.$tag==0){
        var $phi$330 = m_118_13480.$0
      } else if(m_118_13480.$tag==1){
        var $phi$330 = 0
      } else error("pattern match fail",m_118_13480);
      var totalCount_2282_8162 = $phi$330;
      var m_118_13483 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(b_2279_8159.$0))(getCount_2044(b_2279_8159.$1));
      if(m_118_13483.$tag==0){
        var $phi$331 = m_118_13483.$0
      } else if(m_118_13483.$tag==1){
        var $phi$331 = 0
      } else error("pattern match fail",m_118_13483);
      var recursiveCount_2283_8163 = $phi$331;
      var m_122_13485 = (((getAnn_613($instance$Hashable$13))($instance$Eq$1))("export"))(annOf_626(b_2279_8159.$1));
      if(m_122_13485.$tag==0){
        var $phi$332 = true
      } else if(m_122_13485.$tag==1){
        var $phi$332 = false
      } else error("pattern match fail",m_122_13485);
      var keep_2284_8164 = ($or($phi$332))((($gt_14($instance$Ord$2))(totalCount_2282_8162-recursiveCount_2283_8163))(0));
      if(keep_2284_8164){
        var $phi$333 = {$0:{$0:b_2279_8159.$0,$1:b_2279_8159.$1},$tag:0}
      } else if(!keep_2284_8164){
        var ann_2285_8165 = annOf_626(b_2279_8159.$1);
        var $phi$335 = (((getAnn_613($instance$Hashable$13))($instance$Eq$1))("data"))(ann_2285_8165);
        if($phi$335.$tag==1){
          var $phi$334 = Nothing_2
        } else if($phi$335.$tag==0){
          var $_1_87_13492 = (withAnn_627(((((setAnn_614($instance$Hashable$13))($instance$Eq$1))("dead"))(AnnTag_582))(ann_2285_8165)))(b_2279_8159.$1);
          var $_0_85_13490 = {$0:b_2279_8159.$0,$1:$_1_87_13492};
          var $phi$334 = {$0:$_0_85_13490,$tag:0}
        } else error("pattern match fail",$phi$335);
        var $phi$333 = $phi$334
      } else error("pattern match fail",keep_2284_8164);
      var $phi$329 = $phi$333;
      return $phi$329
    }))(bs_2275)
  }
};
var mapBindings_2047 = function(f_2127){
  return function(bs_2128){
    return (map(function(b_2129){
      var $_1_87_13494 = f_2127(b_2129.$1);
      var $phi$336 = {$0:b_2129.$0,$1:$_1_87_13494};
      return $phi$336
    }))(bs_2128)
  }
};
var loopPasses_2049 = function(local$instance$Monad$0){
  return function(n_2138){
    return function(p_2139){
      return function(bs_2140){
        if(0==n_2138){
          var $phi$339 = local$instance$Monad$0.$0;
          var $phi$337 = $phi$339(bs_2140)
        } else {
          var $phi$338 = local$instance$Monad$0.$1;
          var $phi$337 = ($phi$338(p_2139(bs_2140)))(((loopPasses_2049(local$instance$Monad$0))(n_2138-1))(p_2139))
        };
        return $phi$337
      }
    }
  }
};
var dfs_2570 = function(g_2574){
  return function(visited_2575){
    return function(v_2576){
      var es_2578 = (filter(function(v_2582){
        var b_144_13629 = ((contains_28($instance$Eq$1))(v_2582))(visited_2575);
        if(b_144_13629){
          var $phi$340 = false
        } else if(!b_144_13629){
          var $phi$340 = true
        } else error("pattern match fail",b_144_13629);
        return $phi$340
      }))((get(v_2576))(g_2574));
      var r_2579 = ((foldr(function(r_2580_8538){
        return function(e_2581_8539){
          var $phi$342 = ((contains_28($instance$Eq$1))(e_2581_8539))(r_2580_8538);
          if($phi$342){
            var $phi$341 = r_2580_8538
          } else if(!$phi$342){
            var $phi$341 = (concat(((dfs_2570(g_2574))((push(v_2576))((concat(r_2580_8538))(visited_2575))))(e_2581_8539)))(r_2580_8538)
          } else error("pattern match fail",$phi$342);
          return $phi$341
        }
      }))([]))(es_2578);
      return (enqueue(v_2576))(r_2579)
    }
  }
};
var fullDfs_2571 = function(g_2583){
  var result_2585 = ((foldRecord(function(result_2586_8540){
    return function(v_2587_8541){
      return function(__2588_8542){
        var $phi$344 = ((contains_28($instance$Eq$1))(v_2587_8541))(result_2586_8540);
        if($phi$344){
          var $phi$343 = result_2586_8540
        } else if(!$phi$344){
          var $phi$343 = (concat(((dfs_2570(g_2583))(result_2586_8540))(v_2587_8541)))(result_2586_8540)
        } else error("pattern match fail",$phi$344);
        return $phi$343
      }
    }
  }))([]))(g_2583);
  return result_2585
};
var instanceToTypeBound_2837 = function(i_3419){
  var $_0_699_13675 = Empty_7;
  var $phi$345 = ((function($_1_700_13676){
    return function($_2_701_13677){
      return {$0:Empty_7,$1:$_1_700_13676,$2:$_2_701_13677}
    }
  })(i_3419.$1))(i_3419.$2);
  return $phi$345
};
var getTypedExports_2840 = function(m_3504){
  var bs_3513 = ((foldl(function(es_3514_8812){
    return function(b_3515_8813){
      var $phi$347 = b_3515_8813.$1;
      var e_3516_8814 = $phi$347;
      var $phi$349 = (((getAnn_613($instance$Hashable$13))($instance$Eq$1))("export"))(annOf_626(e_3516_8814));
      if($phi$349.$tag==1){
        var $phi$348 = es_3514_8812
      } else if(($phi$349.$tag==0)&&($phi$349.$0.$tag==5)){
        var a_101_13683 = annOf_626(e_3516_8814);
        var $phi$348 = ((set($phi$349.$0.$0))(getAnnType_616(a_101_13683)))(es_3514_8812)
      } else error("pattern match fail",$phi$349);
      return $phi$348
    }
  }))(empty))(m_3504.$6);
  var $_2_683_13686 = (map(instanceToTypeBound_2837))(m_3504.$5);
  var $phi$346 = {$0:bs_3513,$1:m_3504.$4,$2:$_2_683_13686};
  return $phi$346
};
var setBounds_2802 = function(bs_2945){
  return function(ctx_2946){
    var $phi$350 = {$0:ctx_2946.$0,$1:bs_2945,$2:ctx_2946.$2,$3:ctx_2946.$3};
    return $phi$350
  }
};
var satisfies_2841 = function(a_3518){
  return function(b_3519){
    if(a_3518.$tag==1){
      var $phi$351 = true
    } else if(a_3518.$tag==0){
      if(b_3519.$tag==0){
        var $phi$354 = $instance$Eq$1.$0;
        var $phi$353 = ($phi$354(a_3518.$1))(b_3519.$1)
      } else var $phi$353 = false;
      var $phi$351 = $phi$353
    } else if(a_3518.$tag==2){
      if(b_3519.$tag==2){
        var $phi$352 = ($and((satisfies_2841(a_3518.$1))(b_3519.$1)))((satisfies_2841(a_3518.$2))(b_3519.$2))
      } else var $phi$352 = false;
      var $phi$351 = $phi$352
    } else var $phi$351 = error(($concat("unexpected type in satisfies "))(printType_1768(a_3518)));
    return $phi$351
  }
};
var satisfiesBound_2842 = function(a_3535){
  return function(b_3536){
    var $phi$357 = $instance$Eq$1.$0;
    var $phi$356 = ($and(($phi$357(a_3535.$1))(b_3536.$1)))((satisfies_2841(a_3535.$2))(b_3536.$2));
    var $phi$355 = $phi$356;
    return $phi$355
  }
};
var getSub_2789 = function(v_2852){
  return function(subs_2853){
    var $phi$361 = {$0:Nothing_2,$1:function(a_447_16080_16208){
      return function(b_448_16081_16209){
        if(a_447_16080_16208.$tag==1){
          var $phi$360 = b_448_16081_16209
        } else var $phi$360 = a_447_16080_16208;
        return $phi$360
      }
    }};
    var $phi$359 = $phi$361.$1;
    var $phi$358 = ($phi$359((((lookup_60($instance$Hashable$13))($instance$Eq$1))(v_2852))(subs_2853.$0)))((((lookup_60($instance$Hashable$13))($instance$Eq$1))(v_2852))(subs_2853.$1));
    return $phi$358
  }
};
var mkTForall_2817 = function(ann_3014){
  return function(vs_3015){
    return function(bs_3016){
      return function(t_3017){
        var $_2_711_13689 = ((foldl(function(bs_3019_8839){
          return function(b_3020_8840){
            var $phi$363 = (exists_32(equivBound_621(b_3020_8840)))(bs_3019_8839);
            if($phi$363){
              var $phi$362 = bs_3019_8839
            } else if(!$phi$363){
              var $phi$362 = (push(b_3020_8840))(bs_3019_8839)
            } else error("pattern match fail",$phi$363);
            return $phi$362
          }
        }))([]))(bs_3016);
        return (function($_3_712_13690){
          return {$0:ann_3014,$1:vs_3015,$2:$_2_711_13689,$3:$_3_712_13690,$tag:4}
        })(t_3017)
      }
    }
  }
};
var applySubs_2820 = function(subs_3047){
  return function(t_3048){
    if(t_3048.$tag==4){
      var $_0_2843_8851 = ((foldl(function(r_2906_8847){
        return function(v_2907_8848){
          return (((remove_63($instance$Hashable$13))($instance$Eq$1))(v_2907_8848))(r_2906_8847)
        }
      }))(subs_3047.$0))(t_3048.$1);
      var $phi$367 = (function($_1_2844_8852){
        return {$0:$_0_2843_8851,$1:$_1_2844_8852}
      })(((foldl(function(r_2908_8849){
        return function(v_2909_8850){
          return (((remove_63($instance$Hashable$13))($instance$Eq$1))(v_2909_8850))(r_2908_8849)
        }
      }))(subs_3047.$1))(t_3048.$1));
      var subs2_3053 = $phi$367;
      var $phi$364 = (((mkTForall_2817(t_3048.$0))(t_3048.$1))((map(applySubsBound_2821(subs2_3053)))(t_3048.$2)))((applySubs_2820(subs2_3053))(t_3048.$3))
    } else if(t_3048.$tag==1){
      var $phi$366 = (getSub_2789(t_3048.$1))(subs_3047);
      if($phi$366.$tag==1){
        var $phi$365 = t_3048
      } else if($phi$366.$tag==0){
        var $phi$365 = $phi$366.$0
      } else error("pattern match fail",$phi$366);
      var $phi$364 = $phi$365
    } else if(t_3048.$tag==2){
      var $_1_707_13692 = (applySubs_2820(subs_3047))(t_3048.$1);
      var $phi$364 = (function($_2_708_13693){
        return {$0:t_3048.$0,$1:$_1_707_13692,$2:$_2_708_13693,$tag:2}
      })((applySubs_2820(subs_3047))(t_3048.$2))
    } else var $phi$364 = t_3048;
    return $phi$364
  }
};
var applySubsBound_2821 = function(subs_3061){
  return function(b_3062){
    var $_2_701_13696 = (applySubs_2820(subs_3061))(b_3062.$2);
    var $phi$368 = {$0:b_3062.$0,$1:b_3062.$1,$2:$_2_701_13696};
    return $phi$368
  }
};
var applySubsE_2834 = function(subs_3341){
  return function(e_3342){
    var p_127_13697 = (((downAndUp_630(function(a_3344_8853_15748){
      return function(e_3345_8854_15749){
        var a_101_13705_15753 = annOf_626(e_3345_8854_15749);
        var t2_3346_8855_15750 = (applySubs_2820(subs_3341))(getAnnType_616(a_101_13705_15753));
        var $_1_87_13707_15755 = (setType_625(t2_3346_8855_15750))(e_3345_8854_15749);
        return {$0:a_3344_8853_15748,$1:$_1_87_13707_15755}
      }
    }))(function($_0_86_13701){
      return function($_1_87_13702){
        return {$0:$_0_86_13701,$1:$_1_87_13702}
      }
    }))(true))(e_3342);
    var $phi$369 = p_127_13697.$1;
    return $phi$369
  }
};
var freeVars_2835 = function(e_3347){
  var namesInPat_3350 = function(p_3360){
    if(p_3360.$tag==0){
      var $phi$370 = [p_3360.$1]
    } else if(p_3360.$tag==1){
      var $phi$370 = []
    } else if(p_3360.$tag==2){
      var $phi$370 = ((foldl((mergeSet_44($instance$Ord$3))($instance$Eq$1)))([]))((map(namesInPat_3350))(p_3360.$2))
    } else error("pattern match fail",p_3360);
    return $phi$370
  };
  var freeVarsInPData_3349 = function(p_3355){
    if(p_3355.$tag==2){
      var $phi$371 = ((foldl((mergeSet_44($instance$Ord$3))($instance$Eq$1)))([p_3355.$1]))((map(freeVarsInPData_3349))(p_3355.$2))
    } else var $phi$371 = [];
    return $phi$371
  };
  if(e_3347.$tag==0){
    var $phi$372 = [e_3347.$1]
  } else if(e_3347.$tag==1){
    var $phi$372 = []
  } else if(e_3347.$tag==2){
    var $phi$372 = (((mergeSet_44($instance$Ord$3))($instance$Eq$1))(freeVars_2835(e_3347.$1)))(freeVars_2835(e_3347.$2))
  } else if(e_3347.$tag==3){
    var $phi$372 = (filter(function(v_3378){
      return (($div$eq_13($instance$Eq$1))(v_3378))(e_3347.$1)
    }))(freeVars_2835(e_3347.$2))
  } else if(e_3347.$tag==4){
    var $phi$372 = ((foldl((mergeSet_44($instance$Ord$3))($instance$Eq$1)))(freeVars_2835(e_3347.$1)))((map(function(p_3351_8867){
      var $phi$376 = (((mergeSet_44($instance$Ord$3))($instance$Eq$1))((filter(function(v_3354_8870){
        var b_144_13708 = ((contains_28($instance$Eq$1))(v_3354_8870))(namesInPat_3350(p_3351_8867.$0));
        if(b_144_13708){
          var $phi$377 = false
        } else if(!b_144_13708){
          var $phi$377 = true
        } else error("pattern match fail",b_144_13708);
        return $phi$377
      }))(freeVars_2835(p_3351_8867.$1))))(freeVarsInPData_3349(p_3351_8867.$0));
      return $phi$376
    }))(e_3347.$2))
  } else if(e_3347.$tag==5){
    var $phi$372 = (filter(function(v_3385){
      var b_144_13709 = ((contains_28($instance$Eq$1))(v_3385))((map(function(p_124_13710){
        var $phi$373 = p_124_13710.$0;
        return $phi$373
      }))(e_3347.$1));
      if(b_144_13709){
        var $phi$374 = false
      } else if(!b_144_13709){
        var $phi$374 = true
      } else error("pattern match fail",b_144_13709);
      return $phi$374
    }))(((foldl((mergeSet_44($instance$Ord$3))($instance$Eq$1)))(freeVars_2835(e_3347.$2)))((map(function(d_3386){
      var $phi$375 = d_3386.$1;
      return freeVars_2835($phi$375)
    }))(e_3347.$1)))
  } else if(e_3347.$tag==6){
    var $phi$372 = ((foldl((mergeSet_44($instance$Ord$3))($instance$Eq$1)))([]))((map(freeVars_2835))(e_3347.$2))
  } else error("pattern match fail",e_3347);
  return $phi$372
};
var $phi$378 = $instance$Monad$11.$1;
var newTVarM_2796 = ($phi$378(gets_52))(function(ctx_2916){
  var n_2921 = ($concat("$"))(intToString(ctx_2916.$2));
  var $_2_2847_8876 = ctx_2916.$2+1;
  var s_233_16110 = (function($_3_2848_8877){
    return {$0:ctx_2916.$0,$1:ctx_2916.$1,$2:$_2_2847_8876,$3:$_3_2848_8877}
  })(ctx_2916.$3);
  var $phi$380 = $instance$Monad$11.$0;
  var $_0_704_13716 = Empty_7;
  var $phi$379 = (($gt$gt_17($instance$Monad$11))({$0:function(__234_13179_16111){
    return {$0:s_233_16110,$1:Unit_0}
  }}))($phi$380((function($_1_705_13717){
    return {$0:Empty_7,$1:$_1_705_13717,$tag:1}
  })(n_2921)));
  return $phi$379
});
var errorM_2803 = function(s_2951){
  var $phi$381 = $instance$Monad$11.$1;
  return ($phi$381(gets_52))(function(ctx_2952){
    var $phi$382 = error(ctx_2952.$3(s_2951));
    return $phi$382
  })
};
var getBinding_2808 = function(n_2972){
  return function(env_2973){
    var $phi$383 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(n_2972))(env_2973.$0);
    return $phi$383
  }
};
var getBindingM_2809 = function(n_2977){
  return function(env_2978){
    var $phi$384 = $instance$Monad$11.$1;
    return ($phi$384(gets_52))(function(ctx_2979){
      var $phi$385 = $instance$Monad$11.$0;
      var f_100_13718 = $phi$385;
      var $phi$386 = $instance$Functor$4.$0;
      var $phi$387 = ctx_2979.$0;
      return (function(a_101_13719){
        return f_100_13718(a_101_13719)
      })(($phi$386(applySubs_2820($phi$387)))((getBinding_2808(n_2977))(env_2978)))
    })
  }
};
var freeTVars_2824 = function(t_3105){
  if(t_3105.$tag==1){
    var $phi$388 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(t_3105.$1))(Unit_0))(Empty_7)
  } else if(t_3105.$tag==3){
    var $phi$388 = Empty_7
  } else if(t_3105.$tag==5){
    var $phi$388 = Empty_7
  } else if(t_3105.$tag==0){
    var $phi$388 = Empty_7
  } else if(t_3105.$tag==4){
    var $phi$388 = ((foldl(function(s_3114){
      return function(v_3115){
        return (((remove_63($instance$Hashable$13))($instance$Eq$1))(v_3115))(s_3114)
      }
    }))(((foldl((mergeTrie_70($instance$Hashable$13))($instance$Eq$1)))(freeTVars_2824(t_3105.$3)))((map(freeTVarsInBound_2825))(t_3105.$2))))(t_3105.$1)
  } else if(t_3105.$tag==2){
    var $phi$388 = (((mergeTrie_70($instance$Hashable$13))($instance$Eq$1))(freeTVars_2824(t_3105.$1)))(freeTVars_2824(t_3105.$2))
  } else error("pattern match fail",t_3105);
  return $phi$388
};
var freeTVarsInBound_2825 = function(b_3119){
  var $phi$389 = freeTVars_2824(b_3119.$2);
  return $phi$389
};
var addBinding_2811 = function(n_2984){
  return function(t_2985){
    return function(env_2986){
      var u_2990 = (((mergeTrie_70($instance$Hashable$13))($instance$Eq$1))(env_2986.$2))(freeTVars_2824(t_2985));
      var $_0_2849_8897 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(n_2984))(t_2985))(env_2986.$0);
      var $phi$390 = ((function($_1_2850_8898){
        return function($_2_2851_8899){
          return {$0:$_0_2849_8897,$1:$_1_2850_8898,$2:$_2_2851_8899}
        }
      })(env_2986.$1))(u_2990);
      return $phi$390
    }
  }
};
var $_0_2843_8903 = Empty_7;
var emptySubs_2790 = (function($_1_2844_8904){
  return {$0:Empty_7,$1:$_1_2844_8904}
})(Empty_7);
var composeSubs_2791 = function(ef_2856){
  return function(sa_2857){
    return function(sb_2858){
      var $phi$391 = ((foldTrie_66(function(r_2861){
        return function(v_2862){
          return function(t_2863){
            return (((addSub_2792(ef_2856))(v_2862))(t_2863))(r_2861)
          }
        }
      }))(((foldTrie_66(function(r_2864){
        return function(v_2865){
          return function(t_2866){
            var $phi$393 = (getSub_2789(v_2865))(r_2864);
            if($phi$393.$tag==1){
              var $_1_87_13753 = Empty_7;
              var su_2892_8912 = ((foldTrie_66(function(su_2895_8917_13740){
                return function(uv_2896_8918_13741){
                  return function(ut_2897_8919_13742){
                    var ut2_2900_8922_13745 = ((substitute_2819(v_2865))(t_2866))(ut_2897_8919_13742);
                    var t_397_13746 = freeTVars_2824(ut2_2900_8922_13745);
                    if(t_397_13746.$tag==0){
                      var $phi$397 = true
                    } else var $phi$397 = false;
                    if($phi$397){
                      var $_0_86_13748 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(uv_2896_8918_13741))(ut2_2900_8922_13745))(su_2895_8917_13740.$0);
                      var $phi$396 = (function($_1_87_13749){
                        return {$0:$_0_86_13748,$1:$_1_87_13749}
                      })(su_2895_8917_13740.$1)
                    } else if(!$phi$397){
                      var $_1_87_13751 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(uv_2896_8918_13741))(ut2_2900_8922_13745))(su_2895_8917_13740.$1);
                      var $phi$396 = {$0:su_2895_8917_13740.$0,$1:$_1_87_13751}
                    } else error("pattern match fail",$phi$397);
                    var $phi$395 = $phi$396;
                    return $phi$395
                  }
                }
              }))({$0:r_2864.$0,$1:Empty_7}))(r_2864.$1);
              var $phi$398 = su_2892_8912.$1;
              var unsat2_2894_8913 = $phi$398;
              var $phi$399 = su_2892_8912.$0;
              var sat2_2893_8914 = $phi$399;
              var $_0_2843_8924 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(v_2865))(t_2866))(sat2_2893_8914);
              var $phi$394 = (function($_1_2844_8925){
                return {$0:$_0_2843_8924,$1:$_1_2844_8925}
              })(unsat2_2894_8913);
              var $phi$392 = $phi$394
            } else if($phi$393.$tag==0){
              var $phi$392 = ((composeSubs_2791(ef_2856))(r_2864))(((unify_2823(ef_2856))($phi$393.$0))(t_2866))
            } else error("pattern match fail",$phi$393);
            return $phi$392
          }
        }
      }))(sa_2857))(sb_2858.$0)))(sb_2858.$1);
      return $phi$391
    }
  }
};
var addSub_2792 = function(ef_2867){
  return function(v_2868){
    return function(t_2869){
      return function(subs_2870){
        var t2_2871 = (applySubs_2820(subs_2870))(t_2869);
        var $phi$401 = (getSub_2789(v_2868))(subs_2870);
        if($phi$401.$tag==1){
          var $_1_87_13767 = Empty_7;
          var su_2875 = ((foldTrie_66(function(su_2878_8928){
            return function(uv_2879_8929){
              return function(ut_2880_8930){
                var ut2_2883_8933 = ((substitute_2819(v_2868))(t2_2871))(ut_2880_8930);
                var t_397_13760 = freeTVars_2824(ut2_2883_8933);
                if(t_397_13760.$tag==0){
                  var $phi$405 = true
                } else var $phi$405 = false;
                if($phi$405){
                  var $_0_86_13762 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(uv_2879_8929))(ut2_2883_8933))(su_2878_8928.$0);
                  var $phi$404 = (function($_1_87_13763){
                    return {$0:$_0_86_13762,$1:$_1_87_13763}
                  })(su_2878_8928.$1)
                } else if(!$phi$405){
                  var $_1_87_13765 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(uv_2879_8929))(ut2_2883_8933))(su_2878_8928.$1);
                  var $phi$404 = {$0:su_2878_8928.$0,$1:$_1_87_13765}
                } else error("pattern match fail",$phi$405);
                var $phi$403 = $phi$404;
                return $phi$403
              }
            }
          }))({$0:subs_2870.$0,$1:Empty_7}))(subs_2870.$1);
          var $phi$406 = su_2875.$1;
          var unsat2_2877 = $phi$406;
          var $phi$407 = su_2875.$0;
          var sat2_2876 = $phi$407;
          var t_397_13774 = freeTVars_2824(t2_2871);
          if(t_397_13774.$tag==0){
            var $phi$409 = true
          } else var $phi$409 = false;
          if($phi$409){
            var $_0_2843_8934 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(v_2868))(t2_2871))(sat2_2876);
            var $phi$408 = (function($_1_2844_8935){
              return {$0:$_0_2843_8934,$1:$_1_2844_8935}
            })(unsat2_2877)
          } else if(!$phi$409){
            var $_1_2844_8937 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(v_2868))(t2_2871))(unsat2_2877);
            var $phi$408 = {$0:sat2_2876,$1:$_1_2844_8937}
          } else error("pattern match fail",$phi$409);
          var $phi$402 = $phi$408;
          var $phi$400 = $phi$402
        } else if($phi$401.$tag==0){
          var $phi$400 = ((composeSubs_2791(ef_2867))(subs_2870))(((unify_2823(ef_2867))($phi$401.$0))(t2_2871))
        } else error("pattern match fail",$phi$401);
        return $phi$400
      }
    }
  }
};
var substitute_2819 = function(n_3043){
  return function(s_3044){
    return function(t_3045){
      return (applySubs_2820((((addSub_2792(function(s_3046){
        return ($concat("substitute: "))(s_3046)
      }))(n_3043))(s_3044))(emptySubs_2790)))(t_3045)
    }
  }
};
var unify_2823 = function(ef_3072){
  return function(a_3073){
    return function(b_3074){
      var err_3076 = function(a_3082){
        return function(b_3083){
          return error(ef_3072(($concat(($concat(($concat("cannot unify "))(printType_1768(a_3082))))(" with ")))(printType_1768(b_3083))))
        }
      };
      var bind_3075 = function(n_3077){
        return function(t_3078){
          if(t_3078.$tag==1){
            var $phi$414 = $instance$Eq$1.$0;
            var $phi$415 = ($phi$414(n_3077))(t_3078.$1);
            if($phi$415){
              var $phi$413 = emptySubs_2790
            } else if(!$phi$415){
              var $phi$413 = (((addSub_2792(ef_3072))(n_3077))(t_3078))(emptySubs_2790)
            } else error("pattern match fail",$phi$415);
            var $phi$410 = $phi$413
          } else {
            var $phi$412 = (((setContains_76($instance$Hashable$13))($instance$Eq$1))(n_3077))(freeTVars_2824(t_3078));
            if($phi$412){
              var $phi$411 = error(ef_3072("occurs check failed"))
            } else if(!$phi$412){
              var $phi$411 = (((addSub_2792(ef_3072))(n_3077))(t_3078))(emptySubs_2790)
            } else error("pattern match fail",$phi$412);
            var $phi$410 = $phi$411
          };
          return $phi$410
        }
      };
      if(a_3073.$tag==1){
        var $phi$416 = (bind_3075(a_3073.$1))(b_3074)
      } else if(a_3073.$tag==0){
        if(b_3074.$tag==0){
          var $phi$420 = $instance$Eq$1.$0;
          var $phi$421 = ($phi$420(a_3073.$1))(b_3074.$1);
          if($phi$421){
            var $phi$419 = emptySubs_2790
          } else if(!$phi$421){
            var $phi$419 = (err_3076(a_3073))(b_3074)
          } else error("pattern match fail",$phi$421);
          var $phi$418 = $phi$419
        } else if(b_3074.$tag==1){
          var $phi$418 = (bind_3075(b_3074.$1))(a_3073)
        } else var $phi$418 = (err_3076(a_3073))(b_3074);
        var $phi$416 = $phi$418
      } else if(a_3073.$tag==5){
        var $phi$416 = (err_3076(a_3073))(b_3074)
      } else if(a_3073.$tag==3){
        var $phi$416 = (err_3076(a_3073))(b_3074)
      } else if(a_3073.$tag==2){
        if(b_3074.$tag==1){
          var $phi$417 = (bind_3075(b_3074.$1))(a_3073)
        } else if(b_3074.$tag==2){
          var fsubs_3101 = ((unify_2823(ef_3072))(a_3073.$1))(b_3074.$1);
          var xsubs_3102 = ((unify_2823(ef_3072))((applySubs_2820(fsubs_3101))(a_3073.$2)))((applySubs_2820(fsubs_3101))(b_3074.$2));
          var $phi$417 = ((composeSubs_2791(ef_3072))(fsubs_3101))(xsubs_3102)
        } else var $phi$417 = (err_3076(a_3073))(b_3074);
        var $phi$416 = $phi$417
      } else var $phi$416 = (err_3076(a_3073))(b_3074);
      return $phi$416
    }
  }
};
var instantiate_2818 = function(t_3021){
  var $phi$422 = $instance$Monad$11.$1;
  return ($phi$422(gets_52))(function(ctx_3022){
    if(t_3021.$tag==4){
      var $phi$429 = ((foldl(function(cs_3024_8973){
        return function(v_3025_8974){
          var n_2915_8985 = ($concat("$"))(intToString(cs_3024_8973.$0.$2));
          var $_2_2847_8988 = cs_3024_8973.$0.$2+1;
          var $_0_86_13776 = (function($_3_2848_8989){
            return {$0:cs_3024_8973.$0.$0,$1:cs_3024_8973.$0.$1,$2:$_2_2847_8988,$3:$_3_2848_8989}
          })(cs_3024_8973.$0.$3);
          var $_0_704_13778 = Empty_7;
          var $phi$428 = (function($_1_87_13777){
            return {$0:$_0_86_13776,$1:$_1_87_13777}
          })((function($_1_705_13779){
            return {$0:Empty_7,$1:$_1_705_13779,$tag:1}
          })(n_2915_8985));
          var $_1_87_13781 = (((addSub_2792(function(s_3030_8979){
            return ($concat("instantiate: "))(s_3030_8979)
          }))(v_3025_8974))($phi$428.$1))(cs_3024_8973.$1);
          var $phi$427 = {$0:$phi$428.$0,$1:$_1_87_13781};
          var $phi$426 = $phi$427;
          return $phi$426
        }
      }))({$0:ctx_3022,$1:emptySubs_2790}))(t_3021.$1);
      var bs2_3038 = (map(applySubsBound_2821($phi$429.$1)))(t_3021.$2);
      var ctx3_3039 = ((foldl(function(ctx_3040){
        return function(b_3041){
          var $_1_2846_8997 = (push(b_3041))(ctx_3040.$1);
          var $phi$430 = ((function($_2_2847_8998){
            return function($_3_2848_8999){
              return {$0:ctx_3040.$0,$1:$_1_2846_8997,$2:$_2_2847_8998,$3:$_3_2848_8999}
            }
          })(ctx_3040.$2))(ctx_3040.$3);
          return $phi$430
        }
      }))($phi$429.$0))(bs2_3038);
      var t2_3037 = (applySubs_2820($phi$429.$1))(t_3021.$3);
      var $phi$431 = $instance$Monad$11.$0;
      var $phi$425 = (($gt$gt_17($instance$Monad$11))({$0:function(__234_13179_16114){
        return {$0:ctx3_3039,$1:Unit_0}
      }}))($phi$431(t2_3037));
      var $phi$423 = $phi$425
    } else {
      var $phi$424 = $instance$Monad$11.$0;
      var $phi$423 = $phi$424(t_3021)
    };
    return $phi$423
  })
};
var setSubs_2799 = function(subs_2928){
  return function(ctx_2929){
    var $_1_2846_9007 = (map(applySubsBound_2821(subs_2928)))(ctx_2929.$1);
    var $phi$432 = ((function($_2_2847_9008){
      return function($_3_2848_9009){
        return {$0:subs_2928,$1:$_1_2846_9007,$2:$_2_2847_9008,$3:$_3_2848_9009}
      }
    })(ctx_2929.$2))(ctx_2929.$3);
    return $phi$432
  }
};
var $phi$433 = $instance$Monad$11.$1;
var getErrorF_2806 = ($phi$433(gets_52))(function(ctx_2967){
  var $phi$435 = $instance$Monad$11.$0;
  var $phi$434 = $phi$435(ctx_2967.$3);
  return $phi$434
});
var unifyM_2822 = function(a_3066){
  return function(b_3067){
    var $phi$436 = $instance$Monad$11.$1;
    return ($phi$436(gets_52))(function(ctx_3068){
      var $phi$437 = $instance$Monad$11.$1;
      return ($phi$437(getErrorF_2806))(function(ef_3069){
        var ef2_3070 = function(s_3071){
          return ef_3069(($concat(($concat(($concat(($concat(($concat("unifying "))(printType_1768(a_3066))))(" and ")))(printType_1768(b_3067))))(": ")))(s_3071))
        };
        var $phi$438 = ctx_3068.$0;
        var s_233_16116 = (setSubs_2799(((composeSubs_2791(ef2_3070))($phi$438))(((unify_2823(ef2_3070))(a_3066))(b_3067))))(ctx_3068);
        return {$0:function(__234_13179_16117){
          return {$0:s_233_16116,$1:Unit_0}
        }}
      })
    })
  }
};
var onError_2804 = function(e_2957){
  var $phi$439 = $instance$Monad$11.$1;
  return ($phi$439(gets_52))(function(ctx_2958){
    var s_233_16119 = {$0:ctx_2958.$0,$1:ctx_2958.$1,$2:ctx_2958.$2,$3:e_2957};
    var $phi$440 = {$0:function(__234_13179_16120){
      return {$0:{$0:ctx_2958.$0,$1:ctx_2958.$1,$2:ctx_2958.$2,$3:e_2957},$1:Unit_0}
    }};
    return $phi$440
  })
};
var unrollDataConType_2832 = function(t_3328){
  if((t_3328.$tag==2)&&((t_3328.$1.$tag==2)&&((t_3328.$1.$1.$tag==0)&&("->"==t_3328.$1.$1.$1)))){
    var $phi$443 = unrollDataConType_2832(t_3328.$2);
    var $_0_86_13784 = (enqueue(t_3328.$1.$2))($phi$443.$0);
    var $phi$442 = (function($_1_87_13785){
      return {$0:$_0_86_13784,$1:$_1_87_13785}
    })($phi$443.$1);
    var $phi$441 = $phi$442
  } else var $phi$441 = {$0:[],$1:t_3328};
  return $phi$441
};
var generalize_2831 = function(env_3296){
  return function(t_3297){
    var $phi$444 = $instance$Monad$11.$1;
    return ($phi$444(gets_52))(function(ctx_3298){
      var $phi$445 = ctx_3298.$0;
      var subs_3299 = $phi$445;
      var $phi$446 = env_3296.$2;
      var envTVars_3300 = $phi$446;
      var $phi$447 = ((foldTrie_66(function(s_3307){
        return function(v_3308){
          return function(__3309){
            var d_117_13790 = Empty_7;
            var $phi$449 = $instance$Functor$4.$0;
            return (((mergeTrie_70($instance$Hashable$13))($instance$Eq$1))(s_3307))((function(m_118_13791){
              if(m_118_13791.$tag==0){
                var $phi$448 = m_118_13791.$0
              } else if(m_118_13791.$tag==1){
                var $phi$448 = Empty_7
              } else error("pattern match fail",m_118_13791);
              return $phi$448
            })(($phi$449(freeTVars_2824))((((lookup_60($instance$Hashable$13))($instance$Eq$1))(v_3308))(subs_3299.$1))))
          }
        }
      }))(envTVars_3300))(envTVars_3300);
      var nonFree_3301 = $phi$447;
      var vs_3302 = (((setDiff_79($instance$Hashable$13))($instance$Eq$1))(freeTVars_2824(t_3297)))(nonFree_3301);
      var $phi$456 = ctx_3298.$1;
      var vbb_3303 = ((foldl(function(vbb_3310_9072){
        return function(b_3311_9073){
          var boundVars_3315_9077 = freeTVarsInBound_2825(b_3311_9073);
          var sharedVars_3316_9078 = (((setIntersection_80($instance$Hashable$13))($instance$Eq$1))(boundVars_3315_9077))(vs_3302);
          if(sharedVars_3316_9078.$tag==0){
            var $phi$452 = true
          } else var $phi$452 = false;
          if($phi$452){
            var $_1_87_13798 = (push(b_3311_9073))(vbb_3310_9072.$1.$1);
            var $_1_87_13796 = {$0:vbb_3310_9072.$1.$0,$1:$_1_87_13798};
            var $phi$451 = {$0:vbb_3310_9072.$0,$1:$_1_87_13796}
          } else if(!$phi$452){
            var $phi$454 = $instance$Eq$0.$0;
            var $phi$455 = ($phi$454(size_68(sharedVars_3316_9078)))(size_68(boundVars_3315_9077));
            if($phi$455){
              var $_0_86_13801 = (push(b_3311_9073))(vbb_3310_9072.$1.$0);
              var $_1_87_13800 = (function($_1_87_13802){
                return {$0:$_0_86_13801,$1:$_1_87_13802}
              })(vbb_3310_9072.$1.$1);
              var $phi$453 = {$0:vbb_3310_9072.$0,$1:$_1_87_13800}
            } else if(!$phi$455){
              var $_0_86_13803 = (((mergeTrie_70($instance$Hashable$13))($instance$Eq$1))(vbb_3310_9072.$0))(sharedVars_3316_9078);
              var $_1_87_13808 = (push(b_3311_9073))(vbb_3310_9072.$1.$1);
              var $phi$453 = (function($_1_87_13804){
                return {$0:$_0_86_13803,$1:$_1_87_13804}
              })({$0:vbb_3310_9072.$1.$0,$1:$_1_87_13808})
            } else error("pattern match fail",$phi$455);
            var $phi$451 = $phi$453
          } else error("pattern match fail",$phi$452);
          var $phi$450 = $phi$451;
          return $phi$450
        }
      }))({$0:Empty_7,$1:{$0:[],$1:[]}}))($phi$456);
      var finalVars_3320 = (((setDiff_79($instance$Hashable$13))($instance$Eq$1))(vs_3302))(vbb_3303.$0);
      var $_1_2844_9087 = ((foldTrie_66(function(r_3323_9090){
        return function(v_3324_9091){
          return function(t_3325_9092){
            var a_101_13814 = (((setIntersection_80($instance$Hashable$13))($instance$Eq$1))(finalVars_3320))(freeTVars_2824(t_3325_9092));
            if(a_101_13814.$tag==0){
              var $phi$460 = true
            } else var $phi$460 = false;
            if($phi$460){
              var $phi$459 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(v_3324_9091))(t_3325_9092))(r_3323_9090)
            } else if(!$phi$460){
              var $phi$459 = r_3323_9090
            } else error("pattern match fail",$phi$460);
            return $phi$459
          }
        }
      }))(Empty_7))(subs_3299.$1);
      var $phi$458 = {$0:subs_3299.$0,$1:$_1_2844_9087};
      var subs2_3322 = $phi$458;
      var s_233_16122 = (setBounds_2802(vbb_3303.$1.$1))((setSubs_2799(subs2_3322))(ctx_3298));
      if(finalVars_3320.$tag==0){
        var $phi$462 = true
      } else var $phi$462 = false;
      var a_101_13818 = $phi$462;
      if(a_101_13818){
        var $phi$463 = false
      } else if(!a_101_13818){
        var $phi$463 = true
      } else error("pattern match fail",a_101_13818);
      var $phi$464 = ($or($phi$463))((($gt_14($instance$Ord$2))(length(vbb_3303.$1.$0)))(0));
      if($phi$464){
        var $phi$466 = $instance$Monad$11.$0;
        var $phi$461 = $phi$466((((mkTForall_2817(Empty_7))(setToArray_78(finalVars_3320)))(vbb_3303.$1.$0))(t_3297))
      } else if(!$phi$464){
        var $phi$465 = $instance$Monad$11.$0;
        var $phi$461 = $phi$465(t_3297)
      } else error("pattern match fail",$phi$464);
      var $phi$457 = (($gt$gt_17($instance$Monad$11))({$0:function(__234_13179_16123){
        return {$0:s_233_16122,$1:Unit_0}
      }}))($phi$461);
      return $phi$457
    })
  }
};
var infer_2827 = function(env_3127){
  return function(e_3128){
    var inferPat_3131 = function(env_3149){
      return function(te_3150){
        return function(pat_3151){
          if(pat_3151.$tag==0){
            var $phi$486 = $instance$Monad$11.$1;
            var $phi$467 = ($phi$486(newTVarM_2796))(function(tv_3154){
              var $phi$487 = $instance$Monad$11.$0;
              var $_0_86_13822 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(pat_3151.$1))(tv_3154))(Empty_7);
              var $_0_667_13824 = (setAnnType_617(tv_3154))(pat_3151.$0);
              return (($gt$gt_17($instance$Monad$11))((unifyM_2822(te_3150))(tv_3154)))($phi$487((function($_1_87_13823){
                return {$0:$_0_86_13822,$1:$_1_87_13823}
              })((function($_1_668_13825){
                return {$0:$_0_667_13824,$1:$_1_668_13825,$tag:0}
              })(pat_3151.$1))))
            })
          } else if((pat_3151.$tag==1)&&(pat_3151.$1.$tag==0)){
            var $_0_702_13826 = Empty_7;
            var $phi$485 = $instance$Monad$11.$0;
            var $_0_86_13828 = Empty_7;
            var $phi$467 = (($gt$gt_17($instance$Monad$11))((unifyM_2822(te_3150))((function($_1_703_13827){
              return {$0:Empty_7,$1:$_1_703_13827,$tag:0}
            })("Number"))))($phi$485((function($_1_87_13829){
              return {$0:Empty_7,$1:$_1_87_13829}
            })(pat_3151)))
          } else if((pat_3151.$tag==1)&&(pat_3151.$1.$tag==1)){
            var $_0_702_13830 = Empty_7;
            var $phi$484 = $instance$Monad$11.$0;
            var $_0_86_13832 = Empty_7;
            var $phi$467 = (($gt$gt_17($instance$Monad$11))((unifyM_2822(te_3150))((function($_1_703_13831){
              return {$0:Empty_7,$1:$_1_703_13831,$tag:0}
            })("String"))))($phi$484((function($_1_87_13833){
              return {$0:Empty_7,$1:$_1_87_13833}
            })(pat_3151)))
          } else if(pat_3151.$tag==2){
            var $phi$468 = $instance$Monad$11.$1;
            var $phi$467 = ($phi$468((getBindingM_2809(pat_3151.$1))(env_3149)))(function(bt_3162){
              if(bt_3162.$tag==1){
                var $phi$469 = error(($concat("unknown data type "))(pat_3151.$1))
              } else if(bt_3162.$tag==0){
                var $phi$470 = $instance$Monad$11.$1;
                var $phi$469 = ($phi$470(instantiate_2818(bt_3162.$0)))(function(t_3164){
                  var $phi$472 = unrollDataConType_2832(t_3164);
                  var $phi$474 = $instance$Eq$0.$0;
                  var $phi$475 = ($phi$474(length(pat_3151.$2)))(length($phi$472.$0));
                  if(!$phi$475){
                    var $phi$473 = errorM_2803("number of pattern params does not match the number of constructor params")
                  } else if($phi$475){
                    var $phi$476 = $instance$Monad$11.$1;
                    var $_0_86_13838 = Empty_7;
                    var $phi$473 = ($phi$476((((foldM_49($instance$Monad$11))(function(bp_3171_9123){
                      return function(pt_3172_9124){
                        var $phi$479 = $instance$Monad$11.$1;
                        var $phi$478 = ($phi$479(((inferPat_3131(env_3149))(pt_3172_9124.$1))(pt_3172_9124.$0)))(function(bp_3177_9129){
                          var $phi$481 = $instance$Monad$11.$0;
                          var f_100_13834 = $phi$481;
                          var $_0_86_13836 = (((mergeTrie_70($instance$Hashable$13))($instance$Eq$1))(bp_3171_9123.$0))(bp_3177_9129.$0);
                          var $phi$480 = (function(a_101_13835){
                            return f_100_13834(a_101_13835)
                          })((function($_1_87_13837){
                            return {$0:$_0_86_13836,$1:$_1_87_13837}
                          })((push(bp_3177_9129.$1))(bp_3171_9123.$1)));
                          return $phi$480
                        });
                        var $phi$477 = $phi$478;
                        return $phi$477
                      }
                    }))((function($_1_87_13839){
                      return {$0:Empty_7,$1:$_1_87_13839}
                    })([])))((zip_37(pat_3151.$2))($phi$472.$0))))(function(bps_3167){
                      var $phi$483 = $instance$Monad$11.$0;
                      var f_100_13840 = $phi$483;
                      var $phi$482 = (($gt$gt_17($instance$Monad$11))((unifyM_2822(te_3150))($phi$472.$1)))((function(a_101_13841){
                        return f_100_13840(a_101_13841)
                      })({$0:bps_3167.$0,$1:{$0:pat_3151.$0,$1:pat_3151.$1,$2:bps_3167.$1,$tag:2}}));
                      return $phi$482
                    })
                  } else error("pattern match fail",$phi$475);
                  var $phi$471 = $phi$473;
                  return $phi$471
                })
              } else error("pattern match fail",bt_3162);
              return $phi$469
            })
          } else error("pattern match fail",pat_3151);
          return $phi$467
        }
      }
    };
    var setFinalType_3129 = function(t_3133){
      return function(e_3134){
        var a_101_13849 = annOf_626(e_3134);
        var $phi$489 = getAnnType_616(a_101_13849);
        if($phi$489.$tag==5){
          var $phi$492 = $instance$Monad$11.$0;
          var $phi$488 = $phi$492((setType_625(t_3133))(e_3134))
        } else if($phi$489.$tag==4){
          var $phi$491 = $instance$Monad$11.$0;
          var $phi$488 = $phi$491(e_3134)
        } else {
          var $phi$490 = $instance$Monad$11.$0;
          var $phi$488 = (($gt$gt_17($instance$Monad$11))((unifyM_2822(t_3133))($phi$489)))($phi$490(e_3134))
        };
        return $phi$488
      }
    };
    if((e_3128.$tag==1)&&(e_3128.$1.$tag==0)){
      var $_0_702_13861 = Empty_7;
      var $phi$493 = (setFinalType_3129((function($_1_703_13862){
        return {$0:Empty_7,$1:$_1_703_13862,$tag:0}
      })("Number")))(e_3128)
    } else if((e_3128.$tag==1)&&(e_3128.$1.$tag==1)){
      var $_0_702_13863 = Empty_7;
      var $phi$493 = (setFinalType_3129((function($_1_703_13864){
        return {$0:Empty_7,$1:$_1_703_13864,$tag:0}
      })("String")))(e_3128)
    } else if(e_3128.$tag==0){
      var $phi$524 = $instance$Monad$11.$1;
      var $phi$493 = ($phi$524((getBindingM_2809(e_3128.$1))(env_3127)))(function(vt_3186){
        if(vt_3186.$tag==1){
          var $phi$527 = env_3127.$0;
          var a_101_13866 = $phi$527;
          var $phi$525 = errorM_2803(($concat(($concat(($concat("unknown identifier "))(e_3128.$1)))(", env: ")))(jsonStringify(((foldTrie_66(function(ks_405_13868_15760){
            return function(k_406_13869_15761){
              return function(__407_13870_15762){
                return (push(k_406_13869_15761))(ks_405_13868_15760)
              }
            }
          }))([]))(a_101_13866))))
        } else if(vt_3186.$tag==0){
          var $phi$526 = $instance$Monad$11.$1;
          var $phi$525 = ($phi$526(instantiate_2818(vt_3186.$0)))(function(t_3188){
            return (setFinalType_3129(t_3188))(e_3128)
          })
        } else error("pattern match fail",vt_3186);
        return $phi$525
      })
    } else if(e_3128.$tag==3){
      var $phi$522 = $instance$Monad$11.$1;
      var $phi$493 = ($phi$522(newTVarM_2796))(function(tv_3192){
        var $phi$523 = $instance$Monad$11.$1;
        return ($phi$523((infer_2827(((addBinding_2811(e_3128.$1))(tv_3192))(env_3127)))(e_3128.$2)))(function(a_3193){
          var $_0_706_13871 = Empty_7;
          var $_0_706_13874 = Empty_7;
          var $_0_702_13877 = Empty_7;
          var a_101_13881 = annOf_626(a_3193);
          return (setFinalType_3129(((function($_1_707_13872){
            return function($_2_708_13873){
              return {$0:Empty_7,$1:$_1_707_13872,$2:$_2_708_13873,$tag:2}
            }
          })(((function($_1_707_13875){
            return function($_2_708_13876){
              return {$0:Empty_7,$1:$_1_707_13875,$2:$_2_708_13876,$tag:2}
            }
          })((function($_1_703_13878){
            return {$0:Empty_7,$1:$_1_703_13878,$tag:0}
          })("->")))(tv_3192)))(getAnnType_616(a_101_13881))))({$0:e_3128.$0,$1:e_3128.$1,$2:a_3193,$tag:3})
        })
      })
    } else if(e_3128.$tag==2){
      var $phi$519 = $instance$Monad$11.$1;
      var $phi$493 = ($phi$519(newTVarM_2796))(function(tv_3197){
        var $phi$520 = $instance$Monad$11.$1;
        return ($phi$520((infer_2827(env_3127))(e_3128.$1)))(function(f_3198){
          var $phi$521 = $instance$Monad$11.$1;
          return ($phi$521((infer_2827(env_3127))(e_3128.$2)))(function(a_3199){
            var a_101_13887 = annOf_626(a_3199);
            var a_3012_9218 = getAnnType_616(a_101_13887);
            var synth_3200 = (function(b_3013_9219){
              var $_0_706_13888 = Empty_7;
              var $_0_706_13891 = Empty_7;
              var $_0_702_13894 = Empty_7;
              return ((function($_1_707_13889){
                return function($_2_708_13890){
                  return {$0:Empty_7,$1:$_1_707_13889,$2:$_2_708_13890,$tag:2}
                }
              })(((function($_1_707_13892){
                return function($_2_708_13893){
                  return {$0:Empty_7,$1:$_1_707_13892,$2:$_2_708_13893,$tag:2}
                }
              })((function($_1_703_13895){
                return {$0:Empty_7,$1:$_1_703_13895,$tag:0}
              })("->")))(a_3012_9218)))(b_3013_9219)
            })(tv_3197);
            var a_101_13898 = annOf_626(f_3198);
            return (($gt$gt_17($instance$Monad$11))((unifyM_2822(getAnnType_616(a_101_13898)))(synth_3200)))((setFinalType_3129(tv_3197))({$0:e_3128.$0,$1:f_3198,$2:a_3199,$tag:2}))
          })
        })
      })
    } else if(e_3128.$tag==4){
      var $phi$509 = $instance$Monad$11.$1;
      var $phi$493 = ($phi$509((infer_2827(env_3127))(e_3128.$1)))(function(e_3204){
        var $phi$510 = $instance$Monad$11.$1;
        var a_101_13908 = annOf_626(e_3204);
        var te_3141_9227 = getAnnType_616(a_101_13908);
        return ($phi$510(((mapM_50($instance$Monad$11))(function(p_3142_9228){
          var $phi$512 = $instance$Monad$11.$1;
          var $phi$511 = ($phi$512(((inferPat_3131(env_3127))(te_3141_9227))(p_3142_9228.$0)))(function(cb_3145_9231){
            var $phi$514 = $instance$Monad$11.$1;
            var $_0_2849_9249 = (((mergeTrie_70($instance$Hashable$13))($instance$Eq$1))(env_3127.$0))(cb_3145_9231.$0);
            var $phi$515 = ((function($_1_2850_9250){
              return function($_2_2851_9251){
                return {$0:$_0_2849_9249,$1:$_1_2850_9250,$2:$_2_2851_9251}
              }
            })(env_3127.$1))(((foldTrie_66(function(fvs_2996_9246){
              return function(__2997_9247){
                return function(t_2998_9248){
                  return (((mergeTrie_70($instance$Hashable$13))($instance$Eq$1))(fvs_2996_9246))(freeTVars_2824(t_2998_9248))
                }
              }
            }))(env_3127.$2))(cb_3145_9231.$0));
            var $phi$513 = ($phi$514((infer_2827($phi$515))(p_3142_9228.$1)))(function(e_3148_9234){
              var $phi$516 = $instance$Monad$11.$0;
              return $phi$516({$0:cb_3145_9231.$1,$1:e_3148_9234})
            });
            return $phi$513
          });
          return $phi$511
        }))(e_3128.$2)))(function(ps_3205){
          var p_127_13912 = head_40(ps_3205);
          var $phi$517 = p_127_13912.$1;
          var e_857_13909 = $phi$517;
          var a_101_13911 = annOf_626(e_857_13909);
          var t_3206 = getAnnType_616(a_101_13911);
          return (($gt$gt_17($instance$Monad$11))(((mapM_50($instance$Monad$11))(function(p_3207){
            var $phi$518 = p_3207.$1;
            var a_101_13916 = $phi$518;
            var a_101_13919_15765 = annOf_626(a_101_13916);
            return (unifyM_2822(t_3206))(getAnnType_616(a_101_13919_15765))
          }))(tail_41(ps_3205))))((setFinalType_3129(t_3206))({$0:e_3128.$0,$1:e_3204,$2:ps_3205,$tag:4}))
        })
      })
    } else if(e_3128.$tag==5){
      var $phi$506 = $instance$Monad$11.$1;
      var $phi$493 = ($phi$506((inferDefs_2830(env_3127))(e_3128.$1)))(function(ds_3211){
        var env2_3212 = ((foldl(function(env_3213){
          return function(d_3214){
            var a_101_13928 = annOf_626(d_3214.$1);
            var $phi$507 = ((addBinding_2811(d_3214.$0))(getAnnType_616(a_101_13928)))(env_3213);
            return $phi$507
          }
        }))(env_3127))(ds_3211);
        var $phi$508 = $instance$Monad$11.$1;
        return ($phi$508((infer_2827(env2_3212))(e_3128.$2)))(function(e_3217){
          var a_101_13931 = annOf_626(e_3217);
          return (setFinalType_3129(getAnnType_616(a_101_13931)))({$0:e_3128.$0,$1:ds_3211,$2:e_3217,$tag:5})
        })
      })
    } else if((e_3128.$tag==6)&&("Array"==e_3128.$1)){
      var $phi$504 = $instance$Monad$11.$1;
      var $phi$493 = ($phi$504(((mapM_50($instance$Monad$11))(infer_2827(env_3127)))(e_3128.$2)))(function(es_3220){
        var $phi$505 = $instance$Monad$11.$1;
        return ($phi$505(newTVarM_2796))(function(tv_3221){
          var $_0_706_13938 = Empty_7;
          var $_0_702_13941 = Empty_7;
          return (($gt$gt_17($instance$Monad$11))(((mapM_50($instance$Monad$11))(function(e_3222){
            var a_101_13937 = annOf_626(e_3222);
            return (unifyM_2822(tv_3221))(getAnnType_616(a_101_13937))
          }))(es_3220)))((setFinalType_3129(((function($_1_707_13939){
            return function($_2_708_13940){
              return {$0:Empty_7,$1:$_1_707_13939,$2:$_2_708_13940,$tag:2}
            }
          })((function($_1_703_13942){
            return {$0:Empty_7,$1:$_1_703_13942,$tag:0}
          })("Array")))(tv_3221)))({$0:e_3128.$0,$1:"Array",$2:es_3220,$tag:6}))
        })
      })
    } else if(e_3128.$tag==6){
      var $phi$494 = $instance$Monad$11.$1;
      var $phi$493 = ($phi$494(((mapM_50($instance$Monad$11))(infer_2827(env_3127)))(e_3128.$2)))(function(es_3226){
        var $phi$495 = $instance$Monad$11.$1;
        return ($phi$495((getBindingM_2809(e_3128.$1))(env_3127)))(function(t_3227){
          if(t_3227.$tag==1){
            var $phi$496 = error(($concat("unknown data constructor "))(e_3128.$1))
          } else if(t_3227.$tag==0){
            var $phi$497 = $instance$Monad$11.$1;
            var $phi$496 = ($phi$497(instantiate_2818(t_3227.$0)))(function(t_3229){
              var $phi$499 = unrollDataConType_2832(t_3229);
              var $phi$501 = $instance$Eq$0.$0;
              var $phi$502 = ($phi$501(length(es_3226)))(length($phi$499.$0));
              if(!$phi$502){
                var $phi$500 = errorM_2803(($concat(($concat(($concat("number of New args does not match the number of constructor params "))(jsonStringify(es_3226))))(" ")))(printType_1768(t_3229)))
              } else if($phi$502){
                var $phi$500 = (($gt$gt_17($instance$Monad$11))(((mapM_50($instance$Monad$11))(function(p_3232){
                  var a_101_13948 = annOf_626(p_3232.$1);
                  var $phi$503 = (unifyM_2822(p_3232.$0))(getAnnType_616(a_101_13948));
                  return $phi$503
                }))((zip_37($phi$499.$0))(es_3226))))((setFinalType_3129($phi$499.$1))({$0:e_3128.$0,$1:e_3128.$1,$2:es_3226,$tag:6}))
              } else error("pattern match fail",$phi$502);
              var $phi$498 = $phi$500;
              return $phi$498
            })
          } else error("pattern match fail",t_3227);
          return $phi$496
        })
      })
    } else var $phi$493 = error("type inference not supported for this AST node");
    var a_101_13851 = $phi$493;
    var $phi$529 = getAnnCodeLoc_618(annOf_626(e_3128));
    if($phi$529.$tag==1){
      var $phi$528 = a_101_13851
    } else if($phi$529.$tag==0){
      var $phi$530 = $instance$Monad$11.$1;
      var $phi$528 = ($phi$530(getErrorF_2806))(function(old_2965_9182_16130){
        var $phi$531 = $instance$Monad$11.$1;
        return ($phi$531((($gt$gt_17($instance$Monad$11))(onError_2804(function(s_3126_9179_13856_16133){
          if($phi$529.$0.$tag==1){
            var $phi$532 = ($concat(($concat(($concat(($concat(($concat("in "))($phi$529.$0.$0)))(" at line ")))(intToString($phi$529.$0.$1+1))))(", column ")))(intToString($phi$529.$0.$2+1))
          } else error("pattern match fail",$phi$529.$0);
          return ($concat(($concat(s_3126_9179_13856_16133))(" ")))($phi$532)
        })))(a_101_13851)))(function(r_2966_9183_16137){
          var $phi$533 = $instance$Monad$11.$0;
          return (($gt$gt_17($instance$Monad$11))(onError_2804(old_2965_9182_16130)))($phi$533(r_2966_9183_16137))
        })
      })
    } else error("pattern match fail",$phi$529);
    return $phi$528
  }
};
var inferDefs_2830 = function(env_3280){
  return function(ds_3281){
    var ns_3282 = (map(function(p_124_13952){
      var $phi$534 = p_124_13952.$0;
      return $phi$534
    }))(ds_3281);
    var g_3283 = ((foldl(function(g_3286){
      return function(d_3287){
        var $phi$535 = ((set(d_3287.$0))((filter(function(v_3290){
          return ($and(((contains_28($instance$Eq$1))(v_3290))(ns_3282)))((($div$eq_13($instance$Eq$1))(v_3290))(d_3287.$0))
        }))(freeVars_2835(d_3287.$1))))(g_3286);
        return $phi$535
      }
    }))(empty))(ds_3281);
    var invertedG_2590_8563_13959 = ((foldRecord(function(ig_2599_8572_13968_15769){
      return function(v_2600_8573_13969_15770){
        return function(es_2601_8574_13970_15771){
          var $phi$537 = (has(v_2600_8573_13969_15770))(ig_2599_8572_13968_15769);
          if($phi$537){
            var $phi$536 = ig_2599_8572_13968_15769
          } else if(!$phi$537){
            var $phi$536 = ((set(v_2600_8573_13969_15770))([]))(ig_2599_8572_13968_15769)
          } else error("pattern match fail",$phi$537);
          var ig2_2602_8575_13971_15772 = $phi$536;
          return ((foldl(function(ig_2597_8570_13966_15774){
            return function(e_2598_8571_13967_15775){
              var $phi$539 = (has(e_2598_8571_13967_15775))(ig_2597_8570_13966_15774);
              if($phi$539){
                var $phi$538 = ((set(e_2598_8571_13967_15775))((push(v_2600_8573_13969_15770))((get(e_2598_8571_13967_15775))(ig_2597_8570_13966_15774))))(ig_2597_8570_13966_15774)
              } else if(!$phi$539){
                var $phi$538 = ((set(e_2598_8571_13967_15775))([v_2600_8573_13969_15770]))(ig_2597_8570_13966_15774)
              } else error("pattern match fail",$phi$539);
              return $phi$538
            }
          }))(ig2_2602_8575_13971_15772))(es_2601_8574_13970_15771)
        }
      }
    }))(empty))(g_3283);
    var firstDfs_2592_8565_13961 = fullDfs_2571(g_3283);
    var p_127_14005 = ((foldl(function(gs_2603_8576_13972_15776){
      return function(v_2604_8577_13973_15777){
        var $phi$542 = (exists_32((contains_28($instance$Eq$1))(v_2604_8577_13973_15777)))(gs_2603_8576_13972_15776.$1);
        if($phi$542){
          var $phi$541 = {$0:gs_2603_8576_13972_15776.$0,$1:gs_2603_8576_13972_15776.$1}
        } else if(!$phi$542){
          var cc_2607_8580_13976_15782 = ((dfs_2570(gs_2603_8576_13972_15776.$0))([]))(v_2604_8577_13973_15777);
          var ig2_2608_8581_13977_15783 = ((foldl(function(g_2609_8582_13978_15784){
            return function(v_2610_8583_13979_15785){
              return (del(v_2610_8583_13979_15785))((mapRecord(filter(function(w_2611_8584_13980_15786){
                return (($div$eq_13($instance$Eq$1))(w_2611_8584_13980_15786))(v_2610_8583_13979_15785)
              })))(g_2609_8582_13978_15784))
            }
          }))(gs_2603_8576_13972_15776.$0))(cc_2607_8580_13976_15782);
          var $_1_87_14004_15788 = (push(cc_2607_8580_13976_15782))(gs_2603_8576_13972_15776.$1);
          var $phi$541 = {$0:ig2_2608_8581_13977_15783,$1:$_1_87_14004_15788}
        } else error("pattern match fail",$phi$542);
        var $phi$540 = $phi$541;
        return $phi$540
      }
    }))({$0:invertedG_2590_8563_13959,$1:[]}))(firstDfs_2592_8565_13961);
    var $phi$543 = p_127_14005.$1;
    var ccs_2593_8566_13962 = $phi$543;
    var ccs_2613_13956 = ccs_2593_8566_13962;
    var g2g_2617_8599_13982 = ((foldl(function(r_2622_8604_13987_15789){
      return function(icc_2623_8605_13988_15790){
        var $phi$544 = ((foldl(function(r_2626_8608_13991_15793){
          return function(c_2627_8609_13992_15794){
            return ((set(c_2627_8609_13992_15794))(intToString(icc_2623_8605_13988_15790.$0)))(r_2626_8608_13991_15793)
          }
        }))(r_2622_8604_13987_15789))(icc_2623_8605_13988_15790.$1);
        return $phi$544
      }
    }))(empty))(zipWithIndex_36(ccs_2613_13956));
    var cg_2619_8601_13984 = ((foldRecord(function(r_2628_8610_13993_15795){
      return function(v_2629_8611_13994_15796){
        return function(es_2630_8612_13995_15797){
          var rv_2631_8613_13996_15798 = (get(v_2629_8611_13994_15796))(g2g_2617_8599_13982);
          var res_2632_8614_13997_15799 = (uniq_45($instance$Eq$1))(sort((filter(function(re_2633_8615_13998_15800){
            return (($div$eq_13($instance$Eq$1))(re_2633_8615_13998_15800))(rv_2631_8613_13996_15798)
          }))((map(function(e_2634_8616_13999_15801){
            return (get(e_2634_8616_13999_15801))(g2g_2617_8599_13982)
          }))(es_2630_8612_13995_15797))));
          var $phi$546 = (has(rv_2631_8613_13996_15798))(r_2628_8610_13993_15795);
          if(!$phi$546){
            var $phi$545 = ((set(rv_2631_8613_13996_15798))(res_2632_8614_13997_15799))(r_2628_8610_13993_15795)
          } else if($phi$546){
            var $phi$545 = ((set(rv_2631_8613_13996_15798))((((mergeSet_44($instance$Ord$3))($instance$Eq$1))(res_2632_8614_13997_15799))((get(rv_2631_8613_13996_15798))(r_2628_8610_13993_15795))))(r_2628_8610_13993_15795)
          } else error("pattern match fail",$phi$546);
          return $phi$545
        }
      }
    }))(empty))(g_3283);
    var ord_2620_8602_13985 = fullDfs_2571(cg_2619_8601_13984);
    var result_2615_13957 = reverse_46((map(function(i_2635_8617_14000){
      return (getIx(unsafeStringToInt(i_2635_8617_14000)))(ccs_2613_13956)
    }))(ord_2620_8602_13985));
    var ccs_3284 = result_2615_13957;
    return (((foldM_49($instance$Monad$11))(function(rs_3291_9512){
      return function(cc_3292_9513){
        var $phi$547 = $instance$Functor$9.$0;
        var env_3236_9519 = ((foldl(function(env_3293_9514){
          return function(r_3294_9515){
            var $phi$548 = r_3294_9515.$0;
            var $phi$549 = r_3294_9515.$1;
            var e_857_14013 = $phi$549;
            var a_101_14015 = annOf_626(e_857_14013);
            return ((addBinding_2811($phi$548))(getAnnType_616(a_101_14015)))(env_3293_9514)
          }
        }))(env_3280))(rs_3291_9512);
        return ($phi$547(concat(rs_3291_9512)))((function(ds_3237_9520){
          var $phi$550 = $instance$Monad$11.$1;
          return ($phi$550((((foldM_49($instance$Monad$11))(function(env_3242_9549_14043){
            return function(d_3243_9550_14044){
              var $phi$552 = d_3243_9550_14044.$1;
              var e_857_14056 = $phi$552;
              var a_101_14058 = annOf_626(e_857_14056);
              var $phi$553 = getAnnType_616(a_101_14058);
              if($phi$553.$tag==5){
                var $phi$556 = $instance$Monad$11.$1;
                var $phi$551 = ($phi$556(newTVarM_2796))(function(tv_3244_9551_14048){
                  var $phi$557 = $instance$Monad$11.$0;
                  var $phi$558 = d_3243_9550_14044.$0;
                  return $phi$557(((addBinding_2811($phi$558))(tv_3244_9551_14048))(env_3242_9549_14043))
                })
              } else {
                var $phi$554 = $instance$Monad$11.$0;
                var $phi$555 = d_3243_9550_14044.$0;
                var $phi$551 = $phi$554(((addBinding_2811($phi$555))($phi$553))(env_3242_9549_14043))
              };
              return $phi$551
            }
          }))(env_3236_9519))(ds_3237_9520)))(function(env2_3270_9553){
            var $phi$559 = $instance$Monad$11.$1;
            return ($phi$559(((mapM_50($instance$Monad$11))(function(d_3247_9545_14069){
              var $phi$561 = $instance$Monad$11.$1;
              var $phi$560 = ($phi$561((infer_2827(env2_3270_9553))(d_3247_9545_14069.$1)))(function(e_3250_9548_14075){
                var $phi$562 = $instance$Monad$11.$0;
                return $phi$562({$0:d_3247_9545_14069.$0,$1:e_3250_9548_14075})
              });
              return $phi$560
            }))(ds_3237_9520)))(function(ds2_3271_9554){
              var $phi$563 = $instance$Monad$11.$1;
              return ($phi$563((($gt$gt_17($instance$Monad$11))(((mapM_50($instance$Monad$11))(function(d_3252_9536_14082){
                var a_101_14095 = annOf_626(d_3252_9536_14082.$1);
                var $phi$566 = getAnnType_616(a_101_14095);
                if($phi$566.$tag==4){
                  var $phi$567 = $instance$Monad$11.$0;
                  var $phi$565 = $phi$567(Unit_0)
                } else {
                  var a_101_14097 = (getBinding_2808(d_3252_9536_14082.$0))(env2_3270_9553);
                  var $phi$565 = (unifyM_2822($phi$566))(fromJust_20(a_101_14097))
                };
                var $phi$564 = $phi$565;
                return $phi$564
              }))(ds2_3271_9554)))(((mapM_50($instance$Monad$11))(function(d_3337_9592){
                var $phi$569 = $instance$Monad$11.$1;
                var $phi$568 = ($phi$569(gets_52))(function(ctx_3340_9595){
                  var $phi$570 = $instance$Monad$11.$0;
                  var f_100_14098 = $phi$570;
                  var $phi$571 = ctx_3340_9595.$0;
                  var $_1_87_14101 = (applySubsE_2834($phi$571))(d_3337_9592.$1);
                  return (function(a_101_14099){
                    return f_100_14098(a_101_14099)
                  })({$0:d_3337_9592.$0,$1:$_1_87_14101})
                });
                return $phi$568
              }))(ds2_3271_9554))))(function(ds3_3272_9555){
                var $phi$572 = $instance$Monad$11.$1;
                return (($gt$gt_17($instance$Monad$11))(($phi$572(gets_52))(function(ctx_3274_9608){
                  var $phi$573 = env_3236_9519.$1;
                  var is_3275_9609 = $phi$573;
                  var $phi$574 = ctx_3274_9608.$1;
                  var bs_3276_9610 = $phi$574;
                  var bs2_3277_9611 = (filter(function(b_3278_9612){
                    var b_144_14102 = (exists_32(function(i_3279_9613){
                      return (satisfiesBound_2842(i_3279_9613))(b_3278_9612)
                    }))(is_3275_9609);
                    if(b_144_14102){
                      var $phi$575 = false
                    } else if(!b_144_14102){
                      var $phi$575 = true
                    } else error("pattern match fail",b_144_14102);
                    return $phi$575
                  }))(bs_3276_9610);
                  var s_233_16140 = (setBounds_2802(bs2_3277_9611))(ctx_3274_9608);
                  return {$0:function(__234_13179_16141){
                    return {$0:s_233_16140,$1:Unit_0}
                  }}
                })))(((mapM_50($instance$Monad$11))(function(d_3261_9526_14104){
                  var a_101_14124 = annOf_626(d_3261_9526_14104.$1);
                  var $phi$578 = getAnnType_616(a_101_14124);
                  if($phi$578.$tag==4){
                    var $phi$581 = $instance$Monad$11.$0;
                    var $phi$577 = $phi$581(d_3261_9526_14104)
                  } else {
                    var $phi$579 = $instance$Monad$11.$1;
                    var $phi$577 = ($phi$579((generalize_2831(env_3236_9519))($phi$578)))(function(t_3269_9534_14118){
                      var $phi$580 = $instance$Monad$11.$0;
                      var $_1_87_14126 = (setType_625(t_3269_9534_14118))(d_3261_9526_14104.$1);
                      return $phi$580({$0:d_3261_9526_14104.$0,$1:$_1_87_14126})
                    })
                  };
                  var $phi$576 = $phi$577;
                  return $phi$576
                }))(ds3_3272_9555))
              })
            })
          })
        })((filter(function(d_3295_9516){
          var $phi$582 = d_3295_9516.$0;
          return ((contains_28($instance$Eq$1))($phi$582))(cc_3292_9513)
        }))(ds_3281)))
      }
    }))([]))(ccs_3284)
  }
};
var newCtx_2797 = {$0:emptySubs_2790,$1:[],$2:1,$3:function(s_2922_16219){
  return ($concat("unknown error context: "))(s_2922_16219)
}};
var $_0_2849_9645 = Empty_7;
var emptyEnv_2807 = ((function($_1_2850_9646){
  return function($_2_2851_9647){
    return {$0:Empty_7,$1:$_1_2850_9646,$2:$_2_2851_9647}
  }
})([]))(Empty_7);
var classToBindings_2838 = function(c_3424){
  var $phi$583 = (map(function(b_3430_9648){
    var ftv_3433_9651 = freeTVars_2824(b_3430_9648.$1);
    var $phi$586 = (((setContains_76($instance$Hashable$13))($instance$Eq$1))(c_3424.$2))(ftv_3433_9651);
    if(!$phi$586){
      var $phi$585 = error(($concat(($concat(($concat("invalid clas definition "))(c_3424.$1)))(", binding ")))(b_3430_9648.$0))
    } else if($phi$586){
      var $_0_699_14132 = Empty_7;
      var $_0_704_14135 = Empty_7;
      var $_1_87_14131 = (((mkTForall_2817(Empty_7))(setToArray_78(ftv_3433_9651)))([((function($_1_700_14133){
        return function($_2_701_14134){
          return {$0:Empty_7,$1:$_1_700_14133,$2:$_2_701_14134}
        }
      })(c_3424.$1))((function($_1_705_14136){
        return {$0:Empty_7,$1:$_1_705_14136,$tag:1}
      })(c_3424.$2))]))(b_3430_9648.$1);
      var $phi$585 = {$0:b_3430_9648.$0,$1:$_1_87_14131}
    } else error("pattern match fail",$phi$586);
    var $phi$584 = $phi$585;
    return $phi$584
  }))(c_3424.$3);
  return $phi$583
};
var addInstance_2814 = function(b_3003){
  return function(env_3004){
    var $_1_2850_9653 = (push(b_3003))(env_3004.$1);
    var $phi$587 = (function($_2_2851_9654){
      return {$0:env_3004.$0,$1:$_1_2850_9653,$2:$_2_2851_9654}
    })(env_3004.$2);
    return $phi$587
  }
};
var inferTypeModule_2839 = function(ms_3434){
  return function(m_3435){
    var addClass_3438 = function(env_3462){
      return function(c_3463){
        return ((foldl(function(env_3464){
          return function(b_3465){
            var $phi$588 = b_3465.$0;
            var $phi$589 = b_3465.$1;
            return ((addBinding_2811($phi$588))($phi$589))(env_3464)
          }
        }))(env_3462))(classToBindings_2838(c_3463))
      }
    };
    var env2_3489 = ((foldl(function(env_3445_9659){
      return function(i_3446_9660){
        if(i_3446_9660.$tag==1){
          var $phi$592 = i_3446_9660.$1
        } else error("pattern match fail",i_3446_9660);
        var $phi$593 = (get($phi$592))(ms_3434);
        if(i_3446_9660.$tag==1){
          var $phi$594 = ((foldl(function(env_3456_9670){
            return function(n_3457_9671){
              var $phi$595 = ((addBinding_2811(n_3457_9671.$1))((get(n_3457_9671.$0))($phi$593.$0)))(env_3456_9670);
              return $phi$595
            }
          }))(env_3445_9659))(i_3446_9660.$2)
        } else error("pattern match fail",i_3446_9660);
        var env2_3450_9664 = $phi$594;
        var env3_3451_9665 = ((foldl(addClass_3438))(env2_3450_9664))($phi$593.$1);
        var env4_3452_9666 = ((foldl(function(env_3460_9674){
          return function(i_3461_9675){
            return (addInstance_2814(i_3461_9675))(env_3460_9674)
          }
        }))(env3_3451_9665))($phi$593.$2);
        var $phi$591 = env4_3452_9666;
        return $phi$591
      }
    }))(emptyEnv_2807))(m_3435.$2);
    var env3_3490 = ((foldl(addClass_3438))(env2_3489))(m_3435.$4);
    var env4_3491 = ((foldl(function(env_3466_9680){
      return function(i_3467_9681){
        return (addInstance_2814(instanceToTypeBound_2837(i_3467_9681)))(env_3466_9680)
      }
    }))(env3_3490))(m_3435.$5);
    var ds2_3492 = (evalState_55(newCtx_2797))((inferDefs_2830(env4_3491))(m_3435.$6));
    var ds3_3493 = (map(function(d_3468_9682){
      var $phi$597 = d_3468_9682.$1;
      var e_857_14143 = $phi$597;
      var a_101_14145 = annOf_626(e_857_14143);
      var $phi$598 = getAnnType_616(a_101_14145);
      if($phi$598.$tag==4){
        if(($phi$598.$3.$tag==2)&&(($phi$598.$3.$1.$tag==2)&&(($phi$598.$3.$1.$1.$tag==0)&&("->"==$phi$598.$3.$1.$1.$1)))){
          var $phi$599 = d_3468_9682
        } else {
          var $phi$601 = length($phi$598.$2);
          if(0==$phi$601){
            var $phi$600 = d_3468_9682
          } else {
            var $phi$602 = d_3468_9682.$0;
            var $phi$603 = d_3468_9682.$1;
            var e_857_14152 = $phi$603;
            var a_101_14154 = annOf_626(e_857_14152);
            var $phi$600 = error(($concat(($concat(($concat("unsatisfied bounds in def of "))($phi$602)))(" :: ")))(printType_1768(getAnnType_616(a_101_14154))))
          };
          var $phi$599 = $phi$600
        };
        var $phi$596 = $phi$599
      } else var $phi$596 = d_3468_9682;
      return $phi$596
    }))(ds2_3492);
    var env5_3494 = ((foldl(function(env_3496){
      return function(d_3497){
        var a_101_14160 = annOf_626(d_3497.$1);
        var $phi$604 = ((addBinding_2811(d_3497.$0))(getAnnType_616(a_101_14160)))(env_3496);
        return $phi$604
      }
    }))(env4_3491))(ds3_3493);
    var cs_3391_9696 = (concat(m_3435.$4))((concatMap_38(function(i_3500){
      if(i_3500.$tag==1){
        var $phi$606 = i_3500.$1
      } else error("pattern match fail",i_3500);
      var $phi$607 = (get($phi$606))(ms_3434);
      var $phi$605 = $phi$607.$1;
      return $phi$605
    }))(m_3435.$2));
    var ins2_3495 = (map(function(i_3392_9697){
      var $phi$612 = (find_29(function(c_3401_9706){
        var $phi$611 = $instance$Eq$1.$0;
        var $phi$610 = ($phi$611(i_3392_9697.$1))(c_3401_9706.$1);
        return $phi$610
      }))(cs_3391_9696);
      if($phi$612.$tag==1){
        var $phi$609 = error(($concat("Cannot find clas "))(i_3392_9697.$1))
      } else if($phi$612.$tag==0){
        var bs2_3410_9715 = ((foldl(function(bs_3412_9717){
          return function(b_3413_9718){
            var $phi$613 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(b_3413_9718.$0))(((substitute_2819($phi$612.$0.$2))(i_3392_9697.$2))(b_3413_9718.$1)))(bs_3412_9717);
            return $phi$613
          }
        }))(Empty_7))($phi$612.$0.$3);
        var ds2_3411_9716 = (map(function(d_3416_9721){
          var a_101_14182 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(d_3416_9721.$0))(bs2_3410_9715);
          var e_3394_9699_14168 = (setType_625(fromJust_20(a_101_14182)))(d_3416_9721.$1);
          var a_101_14177 = (infer_2827(env5_3494))(e_3394_9699_14168);
          var $phi$616 = a_101_14177.$0(newCtx_2797);
          var $phi$617 = $phi$616.$0.$0;
          var $phi$615 = (applySubsE_2834($phi$617))($phi$616.$1);
          var $_1_87_14167 = $phi$615;
          var $phi$614 = {$0:d_3416_9721.$0,$1:$_1_87_14167};
          return $phi$614
        }))(i_3392_9697.$3);
        var $phi$609 = {$0:i_3392_9697.$0,$1:i_3392_9697.$1,$2:i_3392_9697.$2,$3:ds2_3411_9716}
      } else error("pattern match fail",$phi$612);
      var $phi$608 = $phi$609;
      return $phi$608
    }))(m_3435.$5);
    var $phi$590 = ((((((Module_596(m_3435.$0))(m_3435.$1))(m_3435.$2))(m_3435.$3))(m_3435.$4))(ins2_3495))(ds3_3493);
    return $phi$590
  }
};
var normalizeImports_3690 = function(ms_3692){
  return function(m_3693){
    var $_0_719_14207 = Empty_7;
    var is2_3706 = (map(function(i_3722_9834){
      if(i_3722_9834.$tag==0){
        var $phi$619 = error("closed imports not supported")
      } else if(i_3722_9834.$tag==1){
        var $phi$619 = i_3722_9834
      } else if((i_3722_9834.$tag==2)&&("./builtins.js"==i_3722_9834.$1)){
        var $phi$625 = (get("./builtins.js"))(ms_3692);
        var $_2_718_14199 = (map(function(n_3733_9845){
          return {$0:n_3733_9845,$1:n_3733_9845}
        }))(keys($phi$625.$0));
        var $phi$624 = {$0:i_3722_9834.$0,$1:"./builtins.js",$2:$_2_718_14199,$tag:1};
        var $phi$619 = $phi$624
      } else if(i_3722_9834.$tag==2){
        var $phi$621 = (has(i_3722_9834.$1))(ms_3692);
        if($phi$621){
          var $phi$623 = (get(i_3722_9834.$1))(ms_3692);
          var $_2_718_14204 = (map(function(n_3739_9851){
            return {$0:n_3739_9851,$1:n_3739_9851}
          }))(keys($phi$623.$0));
          var $phi$622 = {$0:i_3722_9834.$0,$1:i_3722_9834.$1,$2:$_2_718_14204,$tag:1};
          var $phi$620 = $phi$622
        } else if(!$phi$621){
          var $phi$620 = error(($concat(($concat(($concat("no mod "))(i_3722_9834.$1)))(" in ")))(jsonStringify(keys(ms_3692))))
        } else error("pattern match fail",$phi$621);
        var $phi$619 = $phi$620
      } else error("pattern match fail",i_3722_9834);
      return $phi$619
    }))((enqueue((function($_1_720_14208){
      return {$0:Empty_7,$1:$_1_720_14208,$tag:2}
    })("./builtins.js")))(m_3693.$2));
    var $phi$618 = ((((((Module_596(m_3693.$0))(m_3693.$1))(is2_3706))(m_3693.$3))(m_3693.$4))(m_3693.$5))(m_3693.$6);
    return $phi$618
  }
};
var rewriteExpr_3909 = function(is_4031){
  return function(env_4032){
    return function(e_4033){
      var setEnv_4129_10135 = function(env_4022_10226){
        return function(s_4023_10227){
          var $phi$626 = {$0:env_4022_10226,$1:s_4023_10227.$1,$2:s_4023_10227.$2};
          return $phi$626
        }
      };
      var p_127_14209 = ((((function(down_4130_10136){
        return function(up_4131_10137){
          return function(a_4132_10138){
            return function(e_4133_10139){
              var exitScope_4136_10140 = function(a_4147_10147){
                var $phi$627 = a_4147_10147.$0;
                return (setEnv_4129_10135(tail_41($phi$627)))(a_4147_10147)
              };
              var patBindings_4140_10142 = function(p_4206_10158){
                if(p_4206_10158.$tag==1){
                  var $phi$628 = empty
                } else if(p_4206_10158.$tag==0){
                  var $phi$628 = ((set(p_4206_10158.$1))(getAnnType_616(p_4206_10158.$0)))(empty)
                } else if(p_4206_10158.$tag==2){
                  var $phi$628 = ((foldr(function(env_4214_10166){
                    return function(p_4215_10167){
                      return (merge(patBindings_4140_10142(p_4215_10167)))(env_4214_10166)
                    }
                  }))(empty))(p_4206_10158.$2)
                } else error("pattern match fail",p_4206_10158);
                return $phi$628
              };
              var enterScope_4135_10143 = function(bs_4143_10168){
                return function(a_4144_10169){
                  var $phi$629 = a_4144_10169.$0;
                  var es_4145_10170 = $phi$629;
                  var e_4146_10171 = (merge(head_40(es_4145_10170)))(bs_4143_10168);
                  return (setEnv_4129_10135((enqueue(e_4146_10171))(es_4145_10170)))(a_4144_10169)
                }
              };
              var go_4134_10144 = function(a_4141_10172){
                return function(e_4142_10173){
                  return (((breakableDownAndUp_629(function(a_4148_10174_14220){
                    return function(e_4149_10175_14221){
                      var $phi$631 = (down_4130_10136(a_4148_10174_14220))(e_4149_10175_14221);
                      if($phi$631.$tag==1){
                        var $phi$630 = {$0:$phi$631.$0,$tag:1}
                      } else if($phi$631.$tag==0){
                        if($phi$631.$0.$1.$tag==3){
                          var a_101_14262 = annOf_626($phi$631.$0.$1);
                          var $phi$643 = getAnnType_616(a_101_14262);
                          if(($phi$643.$tag==2)&&(($phi$643.$1.$tag==2)&&(($phi$643.$1.$1.$tag==0)&&("->"==$phi$643.$1.$1.$1)))){
                            var $phi$642 = $phi$643.$1.$2
                          } else if(($phi$643.$tag==4)&&(($phi$643.$3.$tag==2)&&(($phi$643.$3.$1.$tag==2)&&(($phi$643.$3.$1.$1.$tag==0)&&("->"==$phi$643.$3.$1.$1.$1))))){
                            var $phi$642 = $phi$643.$3.$1.$2
                          } else var $phi$642 = TUnknown_608;
                          var t_4156_10182_14228 = $phi$642;
                          var $_0_86_14264 = (enterScope_4135_10143(((set($phi$631.$0.$1.$1))(t_4156_10182_14228))(empty)))($phi$631.$0.$0);
                          var $_0_88_14263 = (function($_1_87_14265){
                            return {$0:$_0_86_14264,$1:$_1_87_14265}
                          })($phi$631.$0.$1);
                          var $phi$632 = {$0:$_0_88_14263,$tag:0}
                        } else if($phi$631.$0.$1.$tag==5){
                          var ts_4174_10200_14246 = ((foldl(function(ts_4175_10201_14247){
                            return function(b_4176_10202_14248){
                              var a_101_14268 = annOf_626(b_4176_10202_14248.$1);
                              var $phi$641 = ((set(b_4176_10202_14248.$0))(getAnnType_616(a_101_14268)))(ts_4175_10201_14247);
                              return $phi$641
                            }
                          }))(empty))($phi$631.$0.$1.$1);
                          var $_0_86_14270 = (enterScope_4135_10143(ts_4174_10200_14246))($phi$631.$0.$0);
                          var $_0_88_14269 = (function($_1_87_14271){
                            return {$0:$_0_86_14270,$1:$_1_87_14271}
                          })($phi$631.$0.$1);
                          var $phi$632 = {$0:$_0_88_14269,$tag:0}
                        } else if($phi$631.$0.$1.$tag==4){
                          var $phi$634 = (go_4134_10144($phi$631.$0.$0))($phi$631.$0.$1.$1);
                          var $phi$640 = ((foldl(function(ar_4187_10213_14272){
                            return function(pat_4188_10214_14273){
                              var bs_4193_10219_14278 = patBindings_4140_10142(pat_4188_10214_14273.$0);
                              var $phi$639 = (go_4134_10144((enterScope_4135_10143(bs_4193_10219_14278))(ar_4187_10213_14272.$0)))(pat_4188_10214_14273.$1);
                              var $_0_86_14281 = exitScope_4136_10140($phi$639.$0);
                              var $phi$638 = (function($_1_87_14282){
                                return {$0:$_0_86_14281,$1:$_1_87_14282}
                              })((push({$0:pat_4188_10214_14273.$0,$1:$phi$639.$1}))(ar_4187_10213_14272.$1));
                              var $phi$637 = $phi$638;
                              var $phi$636 = $phi$637;
                              return $phi$636
                            }
                          }))({$0:$phi$634.$0,$1:[]}))($phi$631.$0.$1.$2);
                          var $_0_89_14287 = {$0:$phi$640.$0,$1:{$0:$phi$631.$0.$1.$0,$1:$phi$634.$1,$2:$phi$640.$1,$tag:4}};
                          var $phi$635 = {$0:$_0_89_14287,$tag:1};
                          var $phi$633 = $phi$635;
                          var $phi$632 = $phi$633
                        } else var $phi$632 = {$0:{$0:$phi$631.$0.$0,$1:$phi$631.$0.$1},$tag:0};
                        var $phi$630 = $phi$632
                      } else error("pattern match fail",$phi$631);
                      return $phi$630
                    }
                  }))(function(a_4196_10148_14296){
                    return function(e_4197_10149_14297){
                      if(e_4197_10149_14297.$tag==3){
                        var $phi$644 = exitScope_4136_10140(a_4196_10148_14296)
                      } else if(e_4197_10149_14297.$tag==5){
                        var $phi$644 = exitScope_4136_10140(a_4196_10148_14296)
                      } else var $phi$644 = a_4196_10148_14296;
                      var a2_4198_10150_14298 = $phi$644;
                      return (up_4131_10137(a2_4198_10150_14298))(e_4197_10149_14297)
                    }
                  }))(a_4141_10172))(e_4142_10173)
                }
              };
              return (go_4134_10144(a_4132_10138))(e_4133_10139)
            }
          }
        }
      })(function(a_4114){
        return function(e_4115){
          var a_101_14350 = annOf_626(e_4115);
          var $phi$646 = getAnnType_616(a_101_14350);
          if($phi$646.$tag==4){
            var $phi$648 = (($gt_14($instance$Ord$2))(length($phi$646.$2)))(0);
            if(!$phi$648){
              var $phi$647 = {$0:a_4114,$1:e_4115}
            } else if($phi$648){
              var $_1_87_14363 = (setType_625($phi$646.$3))(e_4115);
              var rewritten_4083_10240 = ((foldr(function(ae_4086_10243){
                return function(ib_4087_10244){
                  var $phi$653 = ($concat(($concat(($concat("local$instance$"))(ib_4087_10244.$1.$1)))("$")))(intToString(ae_4086_10243.$0.$2));
                  var name_4056_10256 = $phi$653;
                  var $_1_3920_10263 = (push({$0:name_4056_10256,$1:ib_4087_10244.$1}))(ae_4086_10243.$0.$1);
                  var $_0_86_14353 = (function($_2_3921_10264){
                    return {$0:ae_4086_10243.$0.$0,$1:$_1_3920_10263,$2:$_2_3921_10264}
                  })(ae_4086_10243.$0.$2+1);
                  var $phi$652 = (function($_1_87_14354){
                    return {$0:$_0_86_14353,$1:$_1_87_14354}
                  })(name_4056_10256);
                  var $_0_653_14359 = Empty_7;
                  var $_1_87_14358 = ((function($_1_654_14360){
                    return function($_2_655_14361){
                      return {$0:Empty_7,$1:$_1_654_14360,$2:$_2_655_14361,$tag:3}
                    }
                  })($phi$652.$1))(ae_4086_10243.$1);
                  var $phi$651 = {$0:$phi$652.$0,$1:$_1_87_14358};
                  var $phi$650 = $phi$651;
                  var $phi$649 = $phi$650;
                  return $phi$649
                }
              }))({$0:a_4114,$1:$_1_87_14363}))(zipWithIndex_36($phi$646.$2));
              var $_1_87_6501_15806 = (withAnn_627((((copyAnn_615($instance$Hashable$13))($instance$Eq$1))(["export"]))(annOf_626(e_4115))))(rewritten_4083_10240.$1);
              var $phi$654 = {$0:rewritten_4083_10240.$0,$1:$_1_87_6501_15806};
              var $phi$647 = $phi$654
            } else error("pattern match fail",$phi$648);
            var $phi$645 = $phi$647
          } else var $phi$645 = {$0:a_4114,$1:e_4115};
          var $_0_88_14347 = $phi$645;
          return {$0:$_0_88_14347,$tag:0}
        }
      }))(function(a_4094_10265){
        return function(e_4095_10266){
          if(e_4095_10266.$tag==0){
            var a_101_14368 = annOf_626(e_4095_10266);
            var $phi$659 = getAnnType_616(a_101_14368);
            if($phi$659.$tag==4){
              var $phi$658 = {$0:a_4094_10265,$1:e_4095_10266}
            } else {
              var $phi$660 = a_4094_10265.$0;
              var envs_4043_10286 = $phi$660;
              var env_4044_10287 = head_40(envs_4043_10286);
              var $phi$662 = (has(e_4095_10266.$1))(env_4044_10287);
              if(!$phi$662){
                var $phi$661 = error(($concat(($concat(($concat("no "))(e_4095_10266.$1)))(" in env ")))(jsonStringify(keys(env_4044_10287))))
              } else if($phi$662){
                var $phi$661 = (get(e_4095_10266.$1))(env_4044_10287)
              } else error("pattern match fail",$phi$662);
              var t_4103_10274 = $phi$661;
              if(t_4103_10274.$tag==4){
                var subs_4122_10307 = ((foldl(function(subs_4123_10308){
                  return function(v_4124_10309){
                    var $_0_704_14371 = Empty_7;
                    return (((addSub_2792(function(s_4125_10310){
                      return ($concat("declasser: "))(s_4125_10310)
                    }))(v_4124_10309))((function($_1_705_14372){
                      return {$0:Empty_7,$1:$_1_705_14372,$tag:1}
                    })(($concat("ins$"))(v_4124_10309))))(subs_4123_10308)
                  }
                }))(emptySubs_2790))(t_4103_10274.$1);
                var $_1_710_14374 = (map(function(v_4126_10311){
                  return ($concat("ins$"))(v_4126_10311)
                }))(t_4103_10274.$1);
                var $phi$664 = (applySubs_2820(subs_4122_10307))(((function($_2_711_14375){
                  return function($_3_712_14376){
                    return {$0:t_4103_10274.$0,$1:$_1_710_14374,$2:$_2_711_14375,$3:$_3_712_14376,$tag:4}
                  }
                })(t_4103_10274.$2))(t_4103_10274.$3))
              } else var $phi$664 = t_4103_10274;
              if($phi$664.$tag==4){
                var subs_4074_10298 = ((unify_2823(function(s_4075_10299){
                  return ($concat("declasser: "))(s_4075_10299)
                }))($phi$659))($phi$664.$3);
                var $phi$663 = (map(applySubsBound_2821(subs_4074_10298)))($phi$664.$2)
              } else var $phi$663 = [];
              var is_4104_10275 = $phi$663;
              var mis_4105_10276 = (map(function(b_4107_10278){
                var $phi$668 = (find_29(function(p_4062_10318){
                  var $phi$667 = (satisfiesBound_2842(p_4062_10318.$1))(b_4107_10278);
                  return $phi$667
                }))(a_4094_10265.$1);
                if($phi$668.$tag==0){
                  var $phi$666 = $phi$668.$0.$0
                } else var $phi$666 = error(($concat("declasser failed to find satisfying instance for "))(printTypeBound_1769(b_4107_10278)));
                var $phi$665 = $phi$666;
                return $phi$665
              }))(is_4104_10275);
              var e2_4106_10277 = ((foldl(function(e_4108_10279){
                return function(v_4109_10280){
                  var $_0_650_14377 = Empty_7;
                  var $_0_646_14380 = Empty_7;
                  return ((function($_1_651_14378){
                    return function($_2_652_14379){
                      return {$0:Empty_7,$1:$_1_651_14378,$2:$_2_652_14379,$tag:2}
                    }
                  })(e_4108_10279))((function($_1_647_14381){
                    return {$0:Empty_7,$1:$_1_647_14381,$tag:0}
                  })(v_4109_10280))
                }
              }))(e_4095_10266))(mis_4105_10276);
              var $phi$658 = {$0:a_4094_10265,$1:e2_4106_10277}
            };
            var $phi$655 = $phi$658
          } else if(e_4095_10266.$tag==3){
            var $_1_3920_10331 = (filter(function(p_4050_10329){
              var $phi$657 = p_4050_10329.$0;
              return (($div$eq_13($instance$Eq$1))($phi$657))(e_4095_10266.$1)
            }))(a_4094_10265.$1);
            var $phi$656 = (function($_2_3921_10332){
              return {$0:a_4094_10265.$0,$1:$_1_3920_10331,$2:$_2_3921_10332}
            })(a_4094_10265.$2);
            var $_0_86_14384 = $phi$656;
            var $phi$655 = (function($_1_87_14385){
              return {$0:$_0_86_14384,$1:$_1_87_14385}
            })(e_4095_10266)
          } else var $phi$655 = {$0:a_4094_10265,$1:e_4095_10266};
          return $phi$655
        }
      }))({$0:[env_4032],$1:is_4031,$2:0}))(e_4033);
      var $phi$669 = p_127_14209.$1;
      return $phi$669
    }
  }
};
var instanceName_3915 = function(ix_4257){
  return function(i_4258){
    var $phi$670 = ($concat(($concat(($concat("$instance$"))(i_4258.$1)))("$")))(intToString(ix_4257));
    return $phi$670
  }
};
var declassModule_3900 = function(ms_3922){
  return function(m_3923){
    var isi_3931 = ((foldl(function(isi_3956_10425){
      return function(ixi_3957_10426){
        if(ixi_3957_10426.$1.$tag==1){
          var $phi$675 = (get(ixi_3957_10426.$1.$1))(ms_3922);
          var $phi$681 = ((foldl(function(nbs_3977_10446){
            return function(ib_3978_10447){
              var $phi$679 = ($concat(($concat(($concat(($concat(($concat("$import"))(intToString(ixi_3957_10426.$0))))("$instance$")))(ib_3978_10447.$1.$1)))("$")))(intToString(ib_3978_10447.$0));
              var alias_3984_10452 = $phi$679;
              var $phi$680 = ($concat(($concat(($concat("$instance$"))(ib_3978_10447.$1.$1)))("$")))(intToString(ib_3978_10447.$0));
              var symbol_3983_10453 = $phi$680;
              var $_0_86_14391 = (push({$0:symbol_3983_10453,$1:alias_3984_10452}))(nbs_3977_10446.$0);
              var $phi$678 = (function($_1_87_14392){
                return {$0:$_0_86_14391,$1:$_1_87_14392}
              })((push({$0:alias_3984_10452,$1:ib_3978_10447.$1}))(nbs_3977_10446.$1));
              var $phi$677 = $phi$678;
              return $phi$677
            }
          }))({$0:[],$1:[]}))(zipWithIndex_36($phi$675.$2));
          var cns_3969_10438 = (map(function(n_3970_10439){
            return {$0:n_3970_10439,$1:n_3970_10439}
          }))((concatMap_38(function(c_3971_10440){
            var $phi$682 = (enqueue(($concat("$class$"))(c_3971_10440.$1)))((map(function(p_124_14401){
              var $phi$683 = p_124_14401.$0;
              return $phi$683
            }))(c_3971_10440.$3));
            return $phi$682
          }))($phi$675.$1));
          var $_2_718_14408 = (concat(ixi_3957_10426.$1.$2))((concat($phi$681.$0))(cns_3969_10438));
          var $_0_86_14404 = (push({$0:ixi_3957_10426.$1.$0,$1:ixi_3957_10426.$1.$1,$2:$_2_718_14408,$tag:1}))(isi_3956_10425.$0);
          var $phi$676 = (function($_1_87_14405){
            return {$0:$_0_86_14404,$1:$_1_87_14405}
          })((concat(isi_3956_10425.$1))($phi$681.$1));
          var $phi$674 = $phi$676;
          var $phi$673 = $phi$674
        } else error("pattern match fail",ixi_3957_10426);
        var $phi$672 = $phi$673;
        return $phi$672
      }
    }))({$0:[],$1:[]}))(zipWithIndex_36(m_3923.$2));
    var $phi$684 = isi_3931.$1;
    var importedInstances_3933 = $phi$684;
    var availableInstances_3936 = (concat(importedInstances_3933))((map(function(p_3942){
      var $_0_86_14414 = (instanceName_3915(p_3942.$0))(p_3942.$1);
      var $phi$685 = (function($_1_87_14415){
        return {$0:$_0_86_14414,$1:$_1_87_14415}
      })(instanceToTypeBound_2837(p_3942.$1));
      return $phi$685
    }))(zipWithIndex_36(m_3923.$5)));
    var classesAsData_3934 = (map(function(c_3985_10466){
      var $_0_706_14416 = Empty_7;
      var $_0_702_14419 = Empty_7;
      var $_0_704_14421 = Empty_7;
      var t_3992_10471 = ((function($_1_707_14417){
        return function($_2_708_14418){
          return {$0:Empty_7,$1:$_1_707_14417,$2:$_2_708_14418,$tag:2}
        }
      })((function($_1_703_14420){
        return {$0:Empty_7,$1:$_1_703_14420,$tag:0}
      })(c_3985_10466.$1)))((function($_1_705_14422){
        return {$0:Empty_7,$1:$_1_705_14422,$tag:1}
      })(c_3985_10466.$2));
      var ps_3991_10472 = (map(function(p_127_14423){
        var $phi$687 = p_127_14423.$1;
        return $phi$687
      }))(sort(classToBindings_2838(c_3985_10466)));
      var name_3990_10473 = ($concat("$class$"))(c_3985_10466.$1);
      var $phi$686 = ((((mkConFun_1316(Nothing_2))(t_3992_10471))([c_3985_10466.$2]))(name_3990_10473))(ps_3991_10472);
      return $phi$686
    }))(m_3923.$4);
    var classFuns_3935 = (concat(classesAsData_3934))((concatMap_38(function(c_3993_10475){
      var $phi$689 = ($concat("$class$"))(c_3993_10475.$1);
      var name_3998_10480 = $phi$689;
      var bsForPat_3999_10481 = (map(function(b_4003_10485_14431){
        var $_0_667_14432 = Empty_7;
        var $phi$690 = b_4003_10485_14431.$0;
        return (function($_1_668_14433){
          return {$0:Empty_7,$1:$_1_668_14433,$tag:0}
        })(($concat($phi$690))("_"))
      }))(sort(c_3993_10475.$3));
      var v_4000_10482 = ($concat("x_"))(name_3998_10480);
      var $phi$688 = (map(function(b_4004_10486_14455){
        var $_0_653_14460 = ((((setAnn_614($instance$Hashable$13))($instance$Eq$1))("export"))({$0:b_4004_10486_14455.$0,$tag:5}))(Empty_7);
        var $_0_656_14464 = Empty_7;
        var $_0_646_14467 = Empty_7;
        var $_0_671_14471 = Empty_7;
        var $_0_86_14469 = ((function($_1_672_14472){
          return function($_2_673_14473){
            return {$0:Empty_7,$1:$_1_672_14472,$2:$_2_673_14473,$tag:2}
          }
        })(name_3998_10480))(bsForPat_3999_10481);
        var $_0_646_14474 = Empty_7;
        var $_1_87_14459 = (setType_625(b_4004_10486_14455.$1))(((function($_1_654_14461){
          return function($_2_655_14462){
            return {$0:$_0_653_14460,$1:$_1_654_14461,$2:$_2_655_14462,$tag:3}
          }
        })(v_4000_10482))(((function($_1_657_14465){
          return function($_2_658_14466){
            return {$0:Empty_7,$1:$_1_657_14465,$2:$_2_658_14466,$tag:4}
          }
        })((function($_1_647_14468){
          return {$0:Empty_7,$1:$_1_647_14468,$tag:0}
        })(v_4000_10482)))([(function($_1_87_14470){
          return {$0:$_0_86_14469,$1:$_1_87_14470}
        })((function($_1_647_14475){
          return {$0:Empty_7,$1:$_1_647_14475,$tag:0}
        })(($concat(b_4004_10486_14455.$0))("_")))])));
        var $phi$691 = {$0:b_4004_10486_14455.$0,$1:$_1_87_14459};
        return $phi$691
      }))(classToBindings_2838(c_3993_10475));
      return $phi$688
    }))(m_3923.$4));
    var $_0_719_14540 = Empty_7;
    var env_3937 = ((foldl(function(env_3945){
      return function(b_3946){
        var a_101_14478 = annOf_626(b_3946.$1);
        var $phi$692 = ((set(b_3946.$0))(getAnnType_616(a_101_14478)))(env_3945);
        return $phi$692
      }
    }))(((foldl(function(env_4234_10513_14504){
      return function(i_4235_10514_14505){
        if(i_4235_10514_14505.$tag==2){
          var $phi$694 = i_4235_10514_14505.$1
        } else if(i_4235_10514_14505.$tag==1){
          var $phi$694 = i_4235_10514_14505.$1
        } else if(i_4235_10514_14505.$tag==0){
          var $phi$694 = i_4235_10514_14505.$1
        } else error("pattern match fail",i_4235_10514_14505);
        var $phi$695 = (get($phi$694))(ms_3922);
        if(i_4235_10514_14505.$tag==2){
          var $phi$696 = (merge(env_4234_10513_14504))($phi$695.$0)
        } else if(i_4235_10514_14505.$tag==1){
          var $phi$696 = ((foldl(function(env_4246_10525_14516){
            return function(n_4247_10526_14517){
              var $phi$697 = ((set(n_4247_10526_14517.$1))((get(n_4247_10526_14517.$0))($phi$695.$0)))(env_4246_10525_14516);
              return $phi$697
            }
          }))(env_4234_10513_14504))(i_4235_10514_14505.$2)
        } else var $phi$696 = error("import type not supported in type inference");
        var env2_4239_10518_14509 = $phi$696;
        var env3_4240_10519_14510 = ((foldl(function(env_4230_10509_14530){
          return function(c_4231_10510_14531){
            return ((foldl(function(env_4232_10511_14532){
              return function(b_4233_10512_14533){
                var $phi$698 = b_4233_10512_14533.$0;
                var $phi$699 = b_4233_10512_14533.$1;
                return ((set($phi$698))($phi$699))(env_4232_10511_14532)
              }
            }))(env_4230_10509_14530))(classToBindings_2838(c_4231_10510_14531))
          }
        }))(env2_4239_10518_14509))($phi$695.$1);
        var $phi$693 = env3_4240_10519_14510;
        return $phi$693
      }
    }))(empty))((enqueue((function($_1_720_14541){
      return {$0:Empty_7,$1:$_1_720_14541,$tag:2}
    })("./builtins.js")))(m_3923.$2))))((concat(classFuns_3935))(m_3923.$6));
    var instancesAsDefs_3941 = (map(function(p_3952){
      var args_4016_10538 = (map((rewriteExpr_3909(availableInstances_3936))(env_3937)))((map(function(p_127_14542){
        var $phi$702 = p_127_14542.$1;
        return $phi$702
      }))(sort(p_3952.$1.$3)));
      var $_0_650_14545 = Empty_7;
      var $_0_646_14548 = Empty_7;
      var e_4017_10539 = ((foldl(function($_1_651_14546){
        return function($_2_652_14547){
          return {$0:Empty_7,$1:$_1_651_14546,$2:$_2_652_14547,$tag:2}
        }
      }))((function($_1_647_14549){
        return {$0:Empty_7,$1:$_1_647_14549,$tag:0}
      })(($concat("$class$"))(p_3952.$1.$1))))(args_4016_10538);
      var name_4015_10540 = (instanceName_3915(p_3952.$0))(p_3952.$1);
      var $_1_87_14551 = (withAnn_627(((((setAnn_614($instance$Hashable$13))($instance$Eq$1))("export"))({$0:name_4015_10540,$tag:5}))(Empty_7)))(e_4017_10539);
      var $phi$701 = {$0:name_4015_10540,$1:$_1_87_14551};
      var $phi$700 = $phi$701;
      return $phi$700
    }))(zipWithIndex_36(m_3923.$5));
    var sds_3939 = splitEither_25((map(function(d_3949_10542){
      var $phi$704 = d_3949_10542.$1;
      var $phi$705 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))("data"))(annOf_626($phi$704));
      if($phi$705.$tag==1){
        var $phi$703 = {$0:d_3949_10542,$tag:1}
      } else if($phi$705.$tag==0){
        var $phi$703 = {$0:d_3949_10542,$tag:0}
      } else error("pattern match fail",$phi$705);
      return $phi$703
    }))(m_3923.$6));
    var $phi$708 = sds_3939.$1;
    var ds2_3940 = (map(function(d_3951){
      var $phi$706 = d_3951.$0;
      var $_0_86_14558 = $phi$706;
      var $phi$707 = d_3951.$1;
      return (function($_1_87_14559){
        return {$0:$_0_86_14558,$1:$_1_87_14559}
      })(((rewriteExpr_3909(availableInstances_3936))(env_3937))($phi$707))
    }))($phi$708);
    var $phi$709 = isi_3931.$0;
    var is2_3932 = $phi$709;
    var $phi$710 = sds_3939.$0;
    var $phi$671 = ((((((Module_596(m_3923.$0))(m_3923.$1))(is2_3932))(m_3923.$3))([]))([]))((concat($phi$710))((concat(classFuns_3935))((concat(instancesAsDefs_3941))(ds2_3940))));
    return $phi$671
  }
};
var $instance$Eq$0 = {$0:function(a_4418_14575){
  return function(b_4419_14576){
    return a_4418_14575===b_4419_14576
  }
}};
var getString_4370 = function(p_4399){
  return function(def_4400){
    var $phi$713 = ((contains_28($instance$Eq$0))(def_4400))(p_4399.$2);
    if(!$phi$713){
      var $phi$712 = error("unrecognized arg that was not present for parsing")
    } else if($phi$713){
      if(def_4400.$tag==1){
        var $phi$716 = (has(def_4400.$0))(p_4399.$1);
        if(!$phi$716){
          if(def_4400.$1.$tag==0){
            var $phi$717 = def_4400.$1.$0
          } else if(def_4400.$1.$tag==1){
            var $phi$717 = error(($concat("no value for required arg "))(def_4400.$0))
          } else error("pattern match fail",def_4400.$1);
          var $phi$715 = $phi$717
        } else if($phi$716){
          var $phi$715 = (get(def_4400.$0))(p_4399.$1)
        } else error("pattern match fail",$phi$716);
        var $phi$714 = $phi$715
      } else var $phi$714 = error("arg is not a string");
      var $phi$712 = $phi$714
    } else error("pattern match fail",$phi$713);
    var $phi$711 = $phi$712;
    return $phi$711
  }
};
var JSBreak_4441 = {$tag:4};
var JSUndefined_4433 = {$tag:13};
var JSNull_4432 = {$tag:12};
var tryDCE_4589 = function(e_4592){
  if(((e_4592.$tag==3)&&("&&"==e_4592.$0))&&((e_4592.$1.$tag==9)&&e_4592.$1.$0)){
    var $phi$718 = e_4592.$2
  } else if(((e_4592.$tag==3)&&("&&"==e_4592.$0))&&((e_4592.$2.$tag==9)&&e_4592.$2.$0)){
    var $phi$718 = e_4592.$1
  } else if((e_4592.$tag==6)&&((e_4592.$0.$tag==9)&&e_4592.$0.$0)){
    var $phi$718 = e_4592.$1
  } else if((e_4592.$tag==6)&&((e_4592.$0.$tag==9)&&(!e_4592.$0.$0))){
    var $phi$718 = e_4592.$2
  } else var $phi$718 = e_4592;
  return $phi$718
};
var rewriteDCE_4590 = function(e_4600){
  if(e_4600.$tag==1){
    var $_0_4445_14583 = rewriteDCE_4590(e_4600.$0);
    var $phi$719 = (function($_1_4446_14584){
      return {$0:$_0_4445_14583,$1:$_1_4446_14584,$tag:1}
    })(rewriteDCE_4590(e_4600.$1))
  } else if(e_4600.$tag==3){
    var $_1_4450_14586 = rewriteDCE_4590(e_4600.$1);
    var $phi$719 = tryDCE_4589((function($_2_4451_14587){
      return {$0:e_4600.$0,$1:$_1_4450_14586,$2:$_2_4451_14587,$tag:3}
    })(rewriteDCE_4590(e_4600.$2)))
  } else if(e_4600.$tag==4){
    var $_0_4452_14588 = rewriteDCE_4590(e_4600.$0);
    var $phi$719 = (function($_1_4453_14589){
      return {$0:$_0_4452_14588,$1:$_1_4453_14589,$tag:4}
    })((map(rewriteDCE_4590))(e_4600.$1))
  } else if(e_4600.$tag==5){
    var $_1_4455_14591 = (concatMap_38(rewriteStmt_4591))(e_4600.$1);
    var $phi$719 = {$0:e_4600.$0,$1:$_1_4455_14591,$tag:5}
  } else if(e_4600.$tag==6){
    var $_0_4456_14592 = rewriteDCE_4590(e_4600.$0);
    var $phi$719 = tryDCE_4589(((function($_1_4457_14593){
      return function($_2_4458_14594){
        return {$0:$_0_4456_14592,$1:$_1_4457_14593,$2:$_2_4458_14594,$tag:6}
      }
    })(rewriteDCE_4590(e_4600.$1)))(rewriteDCE_4590(e_4600.$2)))
  } else if(e_4600.$tag==10){
    var $_0_4462_14595 = (map(function(kv_4614){
      var $_1_87_14597 = rewriteDCE_4590(kv_4614.$1);
      var $phi$720 = {$0:kv_4614.$0,$1:$_1_87_14597};
      return $phi$720
    }))(e_4600.$0);
    var $phi$719 = {$0:$_0_4462_14595,$tag:10}
  } else if(e_4600.$tag==14){
    var $_0_4464_14598 = rewriteDCE_4590(e_4600.$0);
    var $phi$719 = (function($_1_4465_14599){
      return {$0:$_0_4464_14598,$1:$_1_4465_14599,$tag:14}
    })(rewriteDCE_4590(e_4600.$1))
  } else if(e_4600.$tag==15){
    var $_0_4466_14600 = rewriteDCE_4590(e_4600.$0);
    var $phi$719 = (function($_1_4467_14601){
      return {$0:$_0_4466_14600,$1:$_1_4467_14601,$tag:15}
    })((map(rewriteDCE_4590))(e_4600.$1))
  } else if(e_4600.$tag==11){
    var $_0_4463_14602 = (map(rewriteDCE_4590))(e_4600.$0);
    var $phi$719 = {$0:$_0_4463_14602,$tag:11}
  } else var $phi$719 = e_4600;
  return $phi$719
};
var rewriteStmt_4591 = function(s_4623){
  if(s_4623.$tag==0){
    var $_0_4469_14603 = rewriteDCE_4590(s_4623.$0);
    var $phi$721 = [{$0:$_0_4469_14603,$tag:0}]
  } else if(s_4623.$tag==1){
    var $_0_4470_14604 = rewriteDCE_4590(s_4623.$0);
    var $phi$721 = [{$0:$_0_4470_14604,$tag:1}]
  } else if(s_4623.$tag==2){
    var $_1_4472_14606 = rewriteDCE_4590(s_4623.$1);
    var $phi$721 = [{$0:s_4623.$0,$1:$_1_4472_14606,$tag:2}]
  } else if(s_4623.$tag==5){
    var $_0_4475_14607 = rewriteDCE_4590(s_4623.$0);
    var $phi$721 = [(function($_1_4476_14608){
      return {$0:$_0_4475_14607,$1:$_1_4476_14608,$tag:5}
    })(rewriteDCE_4590(s_4623.$1))]
  } else if((s_4623.$tag==6)&&((s_4623.$0.$tag==9)&&s_4623.$0.$0)){
    var $phi$721 = (concatMap_38(rewriteStmt_4591))(s_4623.$1)
  } else if((s_4623.$tag==6)&&((s_4623.$0.$tag==9)&&(!s_4623.$0.$0))){
    var $phi$721 = (concatMap_38(rewriteStmt_4591))(s_4623.$2)
  } else if(s_4623.$tag==6){
    var $phi$723 = rewriteDCE_4590(s_4623.$0);
    if(($phi$723.$tag==9)&&$phi$723.$0){
      var $phi$722 = (concatMap_38(rewriteStmt_4591))(s_4623.$1)
    } else if(($phi$723.$tag==9)&&(!$phi$723.$0)){
      var $phi$722 = (concatMap_38(rewriteStmt_4591))(s_4623.$2)
    } else {
      var $_1_4478_14610 = (concatMap_38(rewriteStmt_4591))(s_4623.$1);
      var $phi$722 = [(function($_2_4479_14611){
        return {$0:$phi$723,$1:$_1_4478_14610,$2:$_2_4479_14611,$tag:6}
      })((concatMap_38(rewriteStmt_4591))(s_4623.$2))]
    };
    var $phi$721 = $phi$722
  } else var $phi$721 = [s_4623];
  return $phi$721
};
var printIndent_4753 = function(indent_4824){
  if(0==indent_4824){
    var $phi$724 = ""
  } else var $phi$724 = ($concat("  "))(printIndent_4753(indent_4824-1));
  return $phi$724
};
var paren_4754 = function(s_4826){
  return ($concat(($concat("("))(s_4826)))(")")
};
var jsExprToString_4748 = function(indent_4755){
  return function(e_4756){
    if(e_4756.$tag==12){
      var $phi$725 = "null"
    } else if(e_4756.$tag==13){
      var $phi$725 = "undefined"
    } else if((e_4756.$tag==9)&&e_4756.$0){
      var $phi$725 = "true"
    } else if((e_4756.$tag==9)&&(!e_4756.$0)){
      var $phi$725 = "false"
    } else if(e_4756.$tag==7){
      var $phi$725 = jsonStringify(e_4756.$0)
    } else if(e_4756.$tag==8){
      var $phi$725 = jsonStringify(e_4756.$0)
    } else if(e_4756.$tag==0){
      var $phi$725 = e_4756.$0
    } else if((e_4756.$tag==1)&&(e_4756.$1.$tag==8)){
      var $phi$728 = (match("^[a-zA-Z_$][a-zA-Z0-9_$]*$"))(e_4756.$1.$0);
      if(""==$phi$728){
        var $phi$727 = ($concat(($concat(($concat((jsExprToParenString_4749(indent_4755))(e_4756.$0)))("[")))(e_4756.$1.$0)))("]")
      } else var $phi$727 = ($concat(($concat((jsExprToParenString_4749(indent_4755))(e_4756.$0)))(".")))($phi$728);
      var $phi$725 = $phi$727
    } else if(e_4756.$tag==1){
      var $phi$725 = ($concat(($concat(($concat((jsExprToParenString_4749(indent_4755))(e_4756.$0)))("[")))((jsExprToString_4748(indent_4755))(e_4756.$1))))("]")
    } else if(e_4756.$tag==2){
      var $phi$725 = ($concat(e_4756.$0))((jsExprToParenString_4749(indent_4755))(e_4756.$1))
    } else if(e_4756.$tag==3){
      var $phi$725 = ($concat(($concat((jsExprToParenString_4749(indent_4755))(e_4756.$1)))(e_4756.$0)))((jsExprToParenString_4749(indent_4755))(e_4756.$2))
    } else if(e_4756.$tag==4){
      var $phi$725 = ($concat((jsExprToParenString_4749(indent_4755))(e_4756.$0)))(paren_4754((intercalate(","))((map(function(e_4759_10697){
        return (jsExprToString_4748(indent_4755))(e_4759_10697)
      }))(e_4756.$1))))
    } else if(e_4756.$tag==15){
      var $phi$725 = ($concat(($concat("new "))((jsExprToParenString_4749(indent_4755))(e_4756.$0))))(paren_4754((intercalate(","))((map(function(e_4759_10699){
        return (jsExprToString_4748(indent_4755))(e_4759_10699)
      }))(e_4756.$1))))
    } else if(e_4756.$tag==5){
      var $phi$725 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat("function("))((intercalate(","))(e_4756.$0))))("){\n")))(printIndent_4753(indent_4755+1))))((intercalate(($concat(";\n"))(printIndent_4753(indent_4755+1))))((map(jsStmtToString_4751(indent_4755+1)))(e_4756.$1)))))("\n")))(printIndent_4753(indent_4755))))("}")
    } else if(e_4756.$tag==6){
      var $phi$725 = ($concat(($concat(($concat(($concat((jsExprToParenString_4749(indent_4755))(e_4756.$0)))("?")))((jsExprToParenString_4749(indent_4755))(e_4756.$1))))(":")))((jsExprToParenString_4749(indent_4755))(e_4756.$2))
    } else if(e_4756.$tag==10){
      var $phi$725 = ($concat(($concat("{"))((intercalate(","))((map(function(kv_4802_10704){
        var $phi$726 = ($concat(($concat(kv_4802_10704.$0))(":")))((jsExprToString_4748(indent_4755))(kv_4802_10704.$1));
        return $phi$726
      }))(e_4756.$0)))))("}")
    } else if(e_4756.$tag==11){
      var $phi$725 = ($concat(($concat("["))((intercalate(","))((map(function(e_4759_10707){
        return (jsExprToString_4748(indent_4755))(e_4759_10707)
      }))(e_4756.$0)))))("]")
    } else if(e_4756.$tag==14){
      var $phi$725 = ($concat(($concat((jsExprToParenString_4749(indent_4755))(e_4756.$0)))(" instanceof ")))((jsExprToParenString_4749(indent_4755))(e_4756.$1))
    } else if(e_4756.$tag==16){
      var $phi$725 = (intercalate(","))((map(function(e_4759_10710){
        return (jsExprToString_4748(indent_4755))(e_4759_10710)
      }))(e_4756.$0))
    } else var $phi$725 = error(e_4756);
    return $phi$725
  }
};
var jsExprToParenString_4749 = function(indent_4789){
  return function(e_4790){
    if(e_4790.$tag==0){
      var $phi$729 = (jsExprToString_4748(indent_4789))(e_4790)
    } else if(e_4790.$tag==7){
      var $phi$729 = (jsExprToString_4748(indent_4789))(e_4790)
    } else if(e_4790.$tag==8){
      var $phi$729 = (jsExprToString_4748(indent_4789))(e_4790)
    } else if(e_4790.$tag==9){
      var $phi$729 = (jsExprToString_4748(indent_4789))(e_4790)
    } else if(e_4790.$tag==1){
      var $phi$729 = (jsExprToString_4748(indent_4789))(e_4790)
    } else if(e_4790.$tag==15){
      var $phi$729 = (jsExprToString_4748(indent_4789))(e_4790)
    } else if(e_4790.$tag==10){
      var $phi$729 = (jsExprToString_4748(indent_4789))(e_4790)
    } else var $phi$729 = paren_4754((jsExprToString_4748(indent_4789))(e_4790));
    return $phi$729
  }
};
var jsStmtToString_4751 = function(indent_4805){
  return function(s_4806){
    if(s_4806.$tag==0){
      var $phi$730 = (jsExprToString_4748(indent_4805))(s_4806.$0)
    } else if(s_4806.$tag==1){
      var $phi$730 = ($concat("return "))((jsExprToString_4748(indent_4805))(s_4806.$0))
    } else if(s_4806.$tag==2){
      var $phi$730 = ($concat(($concat(($concat("var "))(s_4806.$0)))(" = ")))((jsExprToString_4748(indent_4805))(s_4806.$1))
    } else if(s_4806.$tag==4){
      var $phi$730 = "break"
    } else if(s_4806.$tag==3){
      var indent_4820_10711 = indent_4805+1;
      var $phi$730 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat("switch"))(paren_4754((jsExprToString_4748(indent_4805))(s_4806.$0)))))("{\n")))(printIndent_4753(indent_4805+1))))((intercalate(($concat(";\n"))(printIndent_4753(indent_4805+1))))((map(function(c_4821_10712){
        var $phi$733 = ($concat(($concat(($concat(($concat("case "))(paren_4754((jsExprToString_4748(indent_4820_10711))(c_4821_10712.$0)))))(":\n")))(printIndent_4753(indent_4820_10711+1))))((intercalate(($concat(";\n"))(printIndent_4753(indent_4820_10711+1))))((map(jsStmtToString_4751(indent_4820_10711)))(c_4821_10712.$1)));
        return $phi$733
      }))(s_4806.$1)))))("\n")))(printIndent_4753(indent_4805))))("}")
    } else if(s_4806.$tag==5){
      var $phi$730 = ($concat(($concat((jsExprToParenString_4749(indent_4805))(s_4806.$0)))(" = ")))((jsExprToParenString_4749(indent_4805))(s_4806.$1))
    } else if(s_4806.$tag==6){
      var $phi$732 = length(s_4806.$2);
      if(1==$phi$732){
        var $phi$731 = (jsStmtToString_4751(indent_4805))((getIx(0))(s_4806.$2))
      } else var $phi$731 = ($concat(($concat(($concat(($concat(($concat("{\n"))(printIndent_4753(indent_4805+1))))((intercalate(($concat(";\n"))(printIndent_4753(indent_4805+1))))((map(jsStmtToString_4751(indent_4805+1)))(s_4806.$2)))))("\n")))(printIndent_4753(indent_4805))))("}");
      var els_4818 = $phi$731;
      var $phi$730 = ($concat(($concat(($concat(($concat(($concat(($concat(($concat(($concat("if("))((jsExprToString_4748(indent_4805))(s_4806.$0))))("){\n")))(printIndent_4753(indent_4805+1))))((intercalate(($concat(";\n"))(printIndent_4753(indent_4805+1))))((map(jsStmtToString_4751(indent_4805+1)))(s_4806.$1)))))("\n")))(printIndent_4753(indent_4805))))("} else ")))(els_4818)
    } else error("pattern match fail",s_4806);
    return $phi$730
  }
};
var opName_5016 = function(op_5260){
  if("+"==op_5260){
    var $phi$734 = "$add"
  } else if("-"==op_5260){
    var $phi$734 = "$del"
  } else if("*"==op_5260){
    var $phi$734 = "$mul"
  } else if("&&"==op_5260){
    var $phi$734 = "$and"
  } else if("||"==op_5260){
    var $phi$734 = "$or"
  } else if("++"==op_5260){
    var $phi$734 = "$concat"
  } else var $phi$734 = ((foldl(function(s_5262){
    return function(c_5263){
      if("-"==c_5263){
        var $phi$735 = "$mns"
      } else if("+"==c_5263){
        var $phi$735 = "$pls"
      } else if("*"==c_5263){
        var $phi$735 = "$mul"
      } else if("/"==c_5263){
        var $phi$735 = "$div"
      } else if("="==c_5263){
        var $phi$735 = "$eq"
      } else if(":"==c_5263){
        var $phi$735 = "$col"
      } else if("&"==c_5263){
        var $phi$735 = "$amp"
      } else if("|"==c_5263){
        var $phi$735 = "$pip"
      } else if("<"==c_5263){
        var $phi$735 = "$lt"
      } else if(">"==c_5263){
        var $phi$735 = "$gt"
      } else if("^"==c_5263){
        var $phi$735 = "$rof"
      } else var $phi$735 = c_5263;
      return ($concat(s_5262))($phi$735)
    }
  }))(""))((loop_27(function(p_216_6757_14613){
    var $phi$738 = $instance$Ord$2.$0;
    var $phi$739 = ($phi$738(p_216_6757_14613.$0))(length(op_5260));
    if(!$phi$739){
      var $phi$737 = {$0:p_216_6757_14613.$1,$tag:1}
    } else if($phi$739){
      var $_0_86_6764_14620 = p_216_6757_14613.$0+1;
      var $_0_88_6763_14619 = (function($_1_87_6765_14621){
        return {$0:$_0_86_6764_14620,$1:$_1_87_6765_14621}
      })((push((getChar(p_216_6757_14613.$0))(op_5260)))(p_216_6757_14613.$1));
      var $phi$737 = {$0:$_0_88_6763_14619,$tag:0}
    } else error("pattern match fail",$phi$739);
    var $phi$736 = $phi$737;
    return $phi$736
  }))({$0:0,$1:[]}));
  return $phi$734
};
var processPattern_5009 = function(cons_5184){
  return function(pm_5185){
    return function(p_5186){
      if((p_5186.$tag==0)&&("_"==p_5186.$1)){
        var $phi$740 = {$0:{$0:true,$tag:9},$1:{$0:[],$1:[]}}
      } else if(p_5186.$tag==0){
        var $phi$740 = {$0:{$0:true,$tag:9},$1:{$0:[opName_5016(p_5186.$1)],$1:[pm_5185]}}
      } else if((p_5186.$tag==1)&&(p_5186.$1.$tag==0)){
        var $_1_87_14635 = {$0:[],$1:[]};
        var $phi$740 = {$0:{$0:"==",$1:{$0:p_5186.$1.$0,$tag:7},$2:pm_5185,$tag:3},$1:$_1_87_14635}
      } else if((p_5186.$tag==1)&&(p_5186.$1.$tag==1)){
        var $_1_87_14643 = {$0:[],$1:[]};
        var $phi$740 = {$0:{$0:"==",$1:{$0:p_5186.$1.$0,$tag:8},$2:pm_5185,$tag:3},$1:$_1_87_14643}
      } else if((p_5186.$tag==2)&&("True"==p_5186.$1)){
        var $phi$740 = {$0:pm_5185,$1:{$0:[],$1:[]}}
      } else if((p_5186.$tag==2)&&("False"==p_5186.$1)){
        var $phi$740 = {$0:{$0:"!",$1:pm_5185,$tag:2},$1:{$0:[],$1:[]}}
      } else if(p_5186.$tag==2){
        var $phi$742 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(p_5186.$1))(cons_5184);
        if(($phi$742.$tag==0)&&($phi$742.$0.$tag==1)){
          var $phi$741 = {$0:true,$tag:9}
        } else if(($phi$742.$tag==0)&&($phi$742.$0.$tag==0)){
          var $phi$741 = {$0:"==",$1:{$0:pm_5185,$1:{$0:"$tag",$tag:8},$tag:1},$2:{$0:$phi$742.$0.$0,$tag:7},$tag:3}
        } else var $phi$741 = error(($concat("unknown data type in code gen: "))(p_5186.$1));
        var tagCheck_5201 = $phi$741;
        var $phi$740 = ((foldl(function(a_5204){
          return function(b_5205){
            var $_0_86_14673 = (concat(a_5204.$1.$0))(b_5205.$1.$0);
            var $_1_87_14669 = (function($_1_87_14674){
              return {$0:$_0_86_14673,$1:$_1_87_14674}
            })((concat(a_5204.$1.$1))(b_5205.$1.$1));
            var $phi$744 = {$0:{$0:"&&",$1:a_5204.$0,$2:b_5205.$0,$tag:3},$1:$_1_87_14669};
            var $phi$743 = $phi$744;
            return $phi$743
          }
        }))({$0:tagCheck_5201,$1:{$0:[],$1:[]}}))((map(function(p_5212){
          var $_0_4460_14681 = ($concat("$"))(intToString(p_5212.$0));
          var $_1_4446_14680 = {$0:$_0_4460_14681,$tag:8};
          var $phi$745 = ((processPattern_5009(cons_5184))({$0:pm_5185,$1:$_1_4446_14680,$tag:1}))(p_5212.$1);
          return $phi$745
        }))(zipWithIndex_36(p_5186.$2)))
      } else var $phi$740 = error("failure to match pattern during processing");
      return $phi$740
    }
  }
};
var addStmt_4999 = function(stmt_5027){
  var $phi$746 = $instance$Monad$11.$1;
  return ($phi$746(gets_52))(function(s_5028){
    var $_2_5020_10885 = (push(stmt_5027))(s_5028.$2);
    var s_233_16144 = (function($_3_5021_10886){
      return {$0:s_5028.$0,$1:s_5028.$1,$2:$_2_5020_10885,$3:$_3_5021_10886}
    })(s_5028.$3);
    var $phi$747 = {$0:function(__234_13179_16145){
      return {$0:s_233_16144,$1:Unit_0}
    }};
    return $phi$747
  })
};
var addVar_5000 = function(n_5033){
  return function(e_5034){
    var $_0_4471_14682 = opName_5016(n_5033);
    return addStmt_4999((function($_1_4472_14683){
      return {$0:$_0_4471_14682,$1:$_1_4472_14683,$tag:2}
    })(e_5034))
  }
};
var $phi$748 = $instance$Monad$11.$1;
var newPhi_5001 = ($phi$748(gets_52))(function(s_5035){
  var $_3_5021_10893 = s_5035.$3+1;
  var s_233_16147 = {$0:s_5035.$0,$1:s_5035.$1,$2:s_5035.$2,$3:$_3_5021_10893};
  var $phi$750 = $instance$Monad$11.$0;
  var $phi$749 = (($gt$gt_17($instance$Monad$11))({$0:function(__234_13179_16148){
    return {$0:s_233_16147,$1:Unit_0}
  }}))($phi$750(($concat("$phi$"))(intToString(s_5035.$3))));
  return $phi$749
});
var $phi$751 = $instance$Monad$11.$1;
var getCons_5005 = ($phi$751(gets_52))(function(s_5072){
  var $phi$753 = $instance$Monad$11.$0;
  var $phi$752 = $phi$753(s_5072.$0);
  return $phi$752
});
var dataConFieldIds_5013 = function(ts_5226){
  return (map(function(p_5227){
    var $phi$754 = p_5227.$0;
    return ($concat("$"))(intToString($phi$754))
  }))(zipWithIndex_36(ts_5226))
};
var binOp2_4998 = function(op_5022){
  return function(a_5023){
    return function(b_5024){
      var $phi$755 = $instance$Monad$11.$1;
      return ($phi$755(rewriteExpr_5006(a_5023)))(function(a_5025){
        var $phi$756 = $instance$Monad$11.$1;
        return ($phi$756(rewriteExpr_5006(b_5024)))(function(b_5026){
          var $phi$757 = $instance$Monad$11.$0;
          return $phi$757({$0:op_5022,$1:a_5025,$2:b_5026,$tag:3})
        })
      })
    }
  }
};
var rewriteExprToStmts_5002 = function(w_5040){
  return function(e_5041){
    var $phi$758 = $instance$Monad$11.$1;
    return ($phi$758(gets_52))(function(s_5042){
      var $phi$760 = $instance$Monad$11.$1;
      var s_233_16150 = {$0:s_5042.$0,$1:s_5042.$1,$2:[],$3:s_5042.$3};
      var $phi$759 = ($phi$760((($gt$gt_17($instance$Monad$11))({$0:function(__234_13179_16151){
        return {$0:{$0:s_5042.$0,$1:s_5042.$1,$2:[],$3:s_5042.$3},$1:Unit_0}
      }}))(rewriteExpr_5006(e_5041))))(function(e_5047){
        var $phi$761 = $instance$Monad$11.$1;
        return ($phi$761(gets_52))(function(s_5048){
          var s_233_16153 = {$0:s_5048.$0,$1:s_5048.$1,$2:s_5042.$2,$3:s_5048.$3};
          var $phi$763 = $instance$Monad$11.$0;
          var $phi$762 = (($gt$gt_17($instance$Monad$11))({$0:function(__234_13179_16154){
            return {$0:{$0:s_5048.$0,$1:s_5048.$1,$2:s_5042.$2,$3:s_5048.$3},$1:Unit_0}
          }}))($phi$763((push(w_5040(e_5047)))(s_5048.$2)));
          return $phi$762
        })
      });
      return $phi$759
    })
  }
};
var rewriteExpr_5006 = function(e_5077){
  if((e_5077.$tag==0)&&("True"==e_5077.$1)){
    var $phi$814 = $instance$Monad$11.$0;
    var $phi$764 = $phi$814({$0:true,$tag:9})
  } else if((e_5077.$tag==0)&&("False"==e_5077.$1)){
    var $phi$813 = $instance$Monad$11.$0;
    var $phi$764 = $phi$813({$0:false,$tag:9})
  } else if(e_5077.$tag==0){
    var $phi$806 = $instance$Monad$11.$1;
    var n_5066_10967 = opName_5016(e_5077.$1);
    var $phi$807 = $instance$Monad$11.$1;
    var $phi$764 = ($phi$806(($phi$807(gets_52))(function(s_5067_10968){
      var $phi$809 = $instance$Monad$11.$0;
      var $phi$808 = $phi$809((((lookup_60($instance$Hashable$13))($instance$Eq$1))(n_5066_10967))(s_5067_10968.$1));
      return $phi$808
    })))(function(r_5082){
      if(r_5082.$tag==1){
        var $phi$812 = $instance$Monad$11.$0;
        var $_0_4444_14692 = opName_5016(e_5077.$1);
        var $phi$810 = $phi$812({$0:$_0_4444_14692,$tag:0})
      } else if(r_5082.$tag==0){
        var $phi$811 = $instance$Monad$11.$0;
        var $phi$810 = $phi$811(r_5082.$0)
      } else error("pattern match fail",r_5082);
      return $phi$810
    })
  } else if((e_5077.$tag==1)&&(e_5077.$1.$tag==0)){
    var $phi$805 = $instance$Monad$11.$0;
    var $phi$764 = $phi$805({$0:e_5077.$1.$0,$tag:7})
  } else if((e_5077.$tag==1)&&(e_5077.$1.$tag==1)){
    var $phi$804 = $instance$Monad$11.$0;
    var $phi$764 = $phi$804({$0:e_5077.$1.$0,$tag:8})
  } else if((e_5077.$tag==2)&&((e_5077.$1.$tag==2)&&((e_5077.$1.$1.$tag==0)&&("+"==e_5077.$1.$1.$1)))){
    var $phi$764 = ((binOp2_4998("+"))(e_5077.$1.$2))(e_5077.$2)
  } else if((e_5077.$tag==2)&&((e_5077.$1.$tag==2)&&((e_5077.$1.$1.$tag==0)&&("-"==e_5077.$1.$1.$1)))){
    var $phi$764 = ((binOp2_4998("-"))(e_5077.$1.$2))(e_5077.$2)
  } else if((e_5077.$tag==2)&&((e_5077.$1.$tag==2)&&((e_5077.$1.$1.$tag==0)&&("*"==e_5077.$1.$1.$1)))){
    var $phi$764 = ((binOp2_4998("*"))(e_5077.$1.$2))(e_5077.$2)
  } else if((e_5077.$tag==2)&&((e_5077.$1.$tag==2)&&((e_5077.$1.$1.$tag==0)&&("jsLt"==e_5077.$1.$1.$1)))){
    var $phi$764 = ((binOp2_4998("<"))(e_5077.$1.$2))(e_5077.$2)
  } else if((e_5077.$tag==2)&&((e_5077.$1.$tag==2)&&((e_5077.$1.$1.$tag==0)&&("jsEq"==e_5077.$1.$1.$1)))){
    var $phi$764 = ((binOp2_4998("==="))(e_5077.$1.$2))(e_5077.$2)
  } else if((e_5077.$tag==2)&&((e_5077.$1.$tag==2)&&((e_5077.$1.$1.$tag==0)&&("bitAnd"==e_5077.$1.$1.$1)))){
    var $phi$764 = ((binOp2_4998("&"))(e_5077.$1.$2))(e_5077.$2)
  } else if((e_5077.$tag==2)&&((e_5077.$1.$tag==2)&&((e_5077.$1.$1.$tag==0)&&("bitOr"==e_5077.$1.$1.$1)))){
    var $phi$764 = ((binOp2_4998("|"))(e_5077.$1.$2))(e_5077.$2)
  } else if((e_5077.$tag==2)&&((e_5077.$1.$tag==2)&&((e_5077.$1.$1.$tag==0)&&("bitShiftLeft"==e_5077.$1.$1.$1)))){
    var $phi$764 = ((binOp2_4998("<<"))(e_5077.$1.$2))(e_5077.$2)
  } else if((e_5077.$tag==2)&&((e_5077.$1.$tag==2)&&((e_5077.$1.$1.$tag==0)&&("bitShiftRight"==e_5077.$1.$1.$1)))){
    var $phi$764 = ((binOp2_4998(">>>"))(e_5077.$1.$2))(e_5077.$2)
  } else if(e_5077.$tag==2){
    var $phi$801 = $instance$Monad$11.$1;
    var $phi$764 = ($phi$801(rewriteExpr_5006(e_5077.$1)))(function(f_5136){
      var $phi$802 = $instance$Monad$11.$1;
      return ($phi$802(rewriteExpr_5006(e_5077.$2)))(function(a_5137){
        var $phi$803 = $instance$Monad$11.$0;
        return $phi$803({$0:f_5136,$1:[a_5137],$tag:4})
      })
    })
  } else if(e_5077.$tag==3){
    var $phi$799 = $instance$Monad$11.$1;
    var $phi$764 = ($phi$799((rewriteExprToStmts_5002(function($_0_4470_14697){
      return {$0:$_0_4470_14697,$tag:1}
    }))(e_5077.$2)))(function(stmts_5141){
      var $phi$800 = $instance$Monad$11.$0;
      return $phi$800({$0:[e_5077.$1],$1:stmts_5141,$tag:5})
    })
  } else if(e_5077.$tag==4){
    var $phi$775 = $instance$Monad$11.$1;
    var $phi$764 = ($phi$775(newPhi_5001))(function(phiOut_5145){
      var $phi$776 = $instance$Monad$11.$1;
      return ($phi$776(rewriteExpr_5006(e_5077.$1)))(function(e_5146){
        var $phi$777 = $instance$Monad$11.$1;
        if(e_5146.$tag==0){
          var $phi$782 = $instance$Monad$11.$0;
          var $phi$778 = $phi$782(e_5146)
        } else if(e_5146.$tag==1){
          var $phi$781 = $instance$Monad$11.$0;
          var $phi$778 = $phi$781(e_5146)
        } else {
          var $phi$779 = $instance$Monad$11.$1;
          var $phi$778 = ($phi$779(newPhi_5001))(function(p_5151){
            var $phi$780 = $instance$Monad$11.$0;
            return (($gt$gt_17($instance$Monad$11))((addVar_5000(p_5151))(e_5146)))($phi$780({$0:p_5151,$tag:0}))
          })
        };
        return ($phi$777($phi$778))(function(phiIn_5152){
          var $phi$783 = $instance$Monad$11.$1;
          var $phi$798 = $instance$Monad$11.$0;
          return (($gt$gt_17($instance$Monad$11))(($phi$783((((foldM_49($instance$Monad$11))(function(alt_5170_11032){
            return function(p_5171_11033){
              var $phi$784 = $instance$Monad$11.$1;
              return ($phi$784(getCons_5005))(function(cons_5172_11034){
                var $phi$787 = ((processPattern_5009(cons_5172_11034))(phiIn_5152))(p_5171_11033.$0);
                var rep_5178_11040 = ((foldl(function(r_5179_11041){
                  return function(p_5180_11042){
                    var $phi$788 = p_5180_11042.$0;
                    var $phi$789 = p_5180_11042.$1;
                    return ((((insert_61($instance$Hashable$13))($instance$Eq$1))($phi$788))($phi$789))(r_5179_11041)
                  }
                }))(Empty_7))((zip_37($phi$787.$1.$0))($phi$787.$1.$1));
                var $phi$790 = $instance$Monad$11.$1;
                var m_5054_11051 = (rewriteExprToStmts_5002(function($_1_4472_14708){
                  return {$0:phiOut_5145,$1:$_1_4472_14708,$tag:2}
                }))(p_5171_11033.$1);
                var $phi$791 = $instance$Monad$11.$1;
                var $phi$786 = ($phi$790(($phi$791(gets_52))(function(s_5055_11052){
                  var $phi$793 = $instance$Monad$11.$1;
                  var $_1_5019_11070 = (((mergeTrie_70($instance$Hashable$13))($instance$Eq$1))(s_5055_11052.$1))(rep_5178_11040);
                  var s_233_16156 = ((function($_2_5020_11071){
                    return function($_3_5021_11072){
                      return {$0:s_5055_11052.$0,$1:$_1_5019_11070,$2:$_2_5020_11071,$3:$_3_5021_11072}
                    }
                  })(s_5055_11052.$2))(s_5055_11052.$3);
                  var $phi$792 = ($phi$793((($gt$gt_17($instance$Monad$11))({$0:function(__234_13179_16157){
                    return {$0:s_233_16156,$1:Unit_0}
                  }}))(m_5054_11051)))(function(r_5060_11057){
                    var $phi$794 = $instance$Monad$11.$1;
                    return ($phi$794(gets_52))(function(s_5061_11058){
                      var s_233_16159 = {$0:s_5061_11058.$0,$1:s_5055_11052.$1,$2:s_5061_11058.$2,$3:s_5061_11058.$3};
                      var $phi$796 = $instance$Monad$11.$0;
                      var $phi$795 = (($gt$gt_17($instance$Monad$11))({$0:function(__234_13179_16160){
                        return {$0:{$0:s_5061_11058.$0,$1:s_5055_11052.$1,$2:s_5061_11058.$2,$3:s_5061_11058.$3},$1:Unit_0}
                      }}))($phi$796(r_5060_11057));
                      return $phi$795
                    })
                  });
                  return $phi$792
                })))(function(stmts_5181_11043){
                  var $phi$797 = $instance$Monad$11.$0;
                  return $phi$797({$0:$phi$787.$0,$1:stmts_5181_11043,$2:[alt_5170_11032],$tag:6})
                });
                var $phi$785 = $phi$786;
                return $phi$785
              })
            }
          }))({$0:{$0:{$0:"error",$tag:0},$1:[{$0:"pattern match fail",$tag:8},phiIn_5152],$tag:4},$tag:0}))(reverse_46(e_5077.$2))))(addStmt_4999)))($phi$798({$0:phiOut_5145,$tag:0}))
        })
      })
    })
  } else if(e_5077.$tag==5){
    var $phi$764 = (($gt$gt_17($instance$Monad$11))(((mapM_50($instance$Monad$11))(function(d_5156){
      var $phi$774 = $instance$Monad$11.$1;
      var $phi$773 = ($phi$774(rewriteExpr_5006(d_5156.$1)))(addVar_5000(d_5156.$0));
      return $phi$773
    }))(e_5077.$1)))(rewriteExpr_5006(e_5077.$2))
  } else if((e_5077.$tag==6)&&("Array"==e_5077.$1)){
    var $phi$771 = $instance$Monad$11.$1;
    var $phi$764 = ($phi$771(((mapM_50($instance$Monad$11))(rewriteExpr_5006))(e_5077.$2)))(function(es_5161){
      var $phi$772 = $instance$Monad$11.$0;
      return $phi$772({$0:es_5161,$tag:11})
    })
  } else if(e_5077.$tag==6){
    var $phi$765 = $instance$Monad$11.$1;
    var $phi$764 = ($phi$765(((mapM_50($instance$Monad$11))(rewriteExpr_5006))(e_5077.$2)))(function(es_5165){
      var $phi$766 = $instance$Monad$11.$1;
      return ($phi$766(getCons_5005))(function(cons_5166){
        var $phi$768 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(e_5077.$1))(cons_5166);
        if($phi$768.$tag==1){
          var $phi$767 = error(($concat("unrecognized tag in New: "))(e_5077.$1))
        } else if(($phi$768.$tag==0)&&($phi$768.$0.$tag==1)){
          var $phi$770 = $instance$Monad$11.$0;
          var $_0_4462_14719 = (zip_37(dataConFieldIds_5013(es_5165)))(es_5165);
          var $phi$767 = $phi$770({$0:$_0_4462_14719,$tag:10})
        } else if(($phi$768.$tag==0)&&($phi$768.$0.$tag==0)){
          var $phi$769 = $instance$Monad$11.$0;
          var $_0_4462_14720 = (push({$0:"$tag",$1:{$0:$phi$768.$0.$0,$tag:7}}))((zip_37(dataConFieldIds_5013(es_5165)))(es_5165));
          var $phi$767 = $phi$769({$0:$_0_4462_14720,$tag:10})
        } else error("pattern match fail",$phi$768);
        return $phi$767
      })
    })
  } else error("pattern match fail",e_5077);
  return $phi$764
};
var $instance$Applicative$1 = {$0:function(x_5507_14824){
  return {$0:function($_1_5464_11284_14827_16162){
    return {$0:x_5507_14824,$1:$_1_5464_11284_14827_16162,$tag:0}
  }}
},$1:function(pf_5508_16163){
  return function(pa_5509_16164){
    var $phi$816 = {$0:function(i_5512_14828_16167){
      var $phi$818 = pf_5508_16163.$0(i_5512_14828_16167);
      if($phi$818.$tag==1){
        var $phi$817 = {$0:$phi$818.$0,$tag:1}
      } else if($phi$818.$tag==0){
        var $phi$820 = pa_5509_16164.$0($phi$818.$1);
        if($phi$820.$tag==1){
          var $phi$819 = {$0:$phi$820.$0,$tag:1}
        } else if($phi$820.$tag==0){
          var $_0_5463_11288_14837_16174 = $phi$818.$0($phi$820.$0);
          var $phi$819 = (function($_1_5464_11289_14838_16175){
            return {$0:$_0_5463_11288_14837_16174,$1:$_1_5464_11289_14838_16175,$tag:0}
          })($phi$820.$1)
        } else error("pattern match fail",$phi$820);
        var $phi$817 = $phi$819
      } else error("pattern match fail",$phi$818);
      return $phi$817
    }};
    var $phi$815 = $phi$816;
    return $phi$815
  }
}};
var $instance$Alternative$2 = {$0:{$0:function(__5519_14839_16176){
  return {$0:"parser failure",$tag:1}
}},$1:function(pa_5520_16211){
  return function(pb_5521_16212){
    var $phi$822 = {$0:function(i_5524_14841_16215){
      var $phi$824 = pa_5520_16211.$0(i_5524_14841_16215);
      if($phi$824.$tag==1){
        var $phi$823 = pb_5521_16212.$0(i_5524_14841_16215)
      } else if($phi$824.$tag==0){
        var $phi$823 = {$0:$phi$824.$0,$1:$phi$824.$1,$tag:0}
      } else error("pattern match fail",$phi$824);
      return $phi$823
    }};
    var $phi$821 = $phi$822;
    return $phi$821
  }
}};
var letters_5462 = ($concat("abcdefghijklmnopqrstuvwxyz"))("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
var many_5454 = function(p_5478){
  return {$0:function(s_5480_11307_14850){
    var r_5481_11308_14851 = ((iterate({$0:{$0:[],$1:s_5480_11307_14850,$tag:0},$tag:0}))(function(r_5482_11309_14854){
      if(r_5482_11309_14854.$tag==0){
        var $phi$825 = false
      } else if(r_5482_11309_14854.$tag==1){
        var $phi$825 = true
      } else error("pattern match fail",r_5482_11309_14854);
      return $phi$825
    }))(function(rs_5485_11312_14857){
      if((rs_5485_11312_14857.$tag==0)&&(rs_5485_11312_14857.$0.$tag==0)){
        var $phi$828 = p_5478.$0(rs_5485_11312_14857.$0.$1);
        if($phi$828.$tag==0){
          var $_0_5463_11325_14865 = (push($phi$828.$0))(rs_5485_11312_14857.$0.$0);
          var $_0_88_14873 = (function($_1_5464_11326_14866){
            return {$0:$_0_5463_11325_14865,$1:$_1_5464_11326_14866,$tag:0}
          })($phi$828.$1);
          var $phi$827 = {$0:$_0_88_14873,$tag:0}
        } else if($phi$828.$tag==1){
          var $phi$827 = {$0:{$0:rs_5485_11312_14857.$0.$0,$1:rs_5485_11312_14857.$0.$1,$tag:0},$tag:1}
        } else error("pattern match fail",$phi$828);
        var $phi$826 = $phi$827
      } else error("pattern match fail",rs_5485_11312_14857);
      return $phi$826
    });
    if(r_5481_11308_14851.$tag==1){
      var $phi$829 = r_5481_11308_14851.$0
    } else if(r_5481_11308_14851.$tag==0){
      var $phi$829 = error("manyIterate should never return a Left")
    } else error("pattern match fail",r_5481_11308_14851);
    return $phi$829
  }}
};
var $pip$gt_5452 = function(local$instance$Applicative$0){
  return function(a_5470){
    return function(b_5471){
      var $phi$830 = local$instance$Applicative$0.$1;
      var $phi$831 = local$instance$Applicative$0.$1;
      var $phi$832 = local$instance$Applicative$0.$0;
      return ($phi$830(($phi$831($phi$832(function(__5472){
        return function(b_5473){
          return b_5473
        }
      })))(a_5470)))(b_5471)
    }
  }
};
var sepBy1_5457 = function(p_5495){
  return function(sp_5496){
    var $phi$833 = $instance$Applicative$1.$1;
    var $phi$834 = $instance$Applicative$1.$1;
    var $phi$835 = $instance$Applicative$1.$0;
    return ($phi$833(($phi$834($phi$835(enqueue)))(p_5495)))(many_5454((($pip$gt_5452($instance$Applicative$1))(sp_5496))(p_5495)))
  }
};
var opt_5459 = function(a_5499){
  var $phi$836 = $instance$Alternative$2.$1;
  var $phi$837 = $instance$Applicative$1.$1;
  var $phi$838 = $instance$Applicative$1.$0;
  var a_5494_11359 = Nothing_2;
  var $_0_5463_11361 = Nothing_2;
  var $_0_5466_11360 = function($_1_5464_11362){
    return {$0:Nothing_2,$1:$_1_5464_11362,$tag:0}
  };
  return ($phi$836(($phi$837($phi$838(function($_0_85_14875){
    return {$0:$_0_85_14875,$tag:0}
  })))(a_5499)))({$0:$_0_5466_11360})
};
var some_5455 = function(p_5493){
  var $phi$839 = $instance$Applicative$1.$1;
  var $phi$840 = $instance$Applicative$1.$1;
  var $phi$841 = $instance$Applicative$1.$0;
  return ($phi$839(($phi$840($phi$841(enqueue)))(p_5493)))(many_5454(p_5493))
};
var $lt$pip_5453 = function(local$instance$Applicative$0){
  return function(a_5474){
    return function(b_5475){
      var $phi$842 = local$instance$Applicative$0.$1;
      var $phi$843 = local$instance$Applicative$0.$1;
      var $phi$844 = local$instance$Applicative$0.$0;
      return ($phi$842(($phi$843($phi$844(function(a_5476){
        return function(__5477){
          return a_5476
        }
      })))(a_5474)))(b_5475)
    }
  }
};
var WsTok_5629 = {$tag:0};
var NumTok_5631 = {$tag:2};
var ComTok_5635 = {$tag:6};
var SymTok_5630 = {$tag:1};
var IdTok_5634 = {$tag:5};
var OpTok_5633 = {$tag:4};
var StrTok_5632 = {$tag:3};
var mkTok_5637 = function(t_5666){
  return {$0:function(i_5668_11415_15811){
    var $phi$845 = {$0:function(r_5673_11420_15817_16177){
      return {$0:t_5666,$1:r_5673_11420_15817_16177,$2:i_5668_11415_15811.$2,$3:i_5668_11415_15811.$3}
    },$1:i_5668_11415_15811,$tag:0};
    return $phi$845
  }}
};
var parseChar_5640 = function(p_5679){
  return {$0:function(s_5681_11435_15822){
    var $phi$848 = $instance$Ord$2.$0;
    var $phi$849 = ($phi$848(s_5681_11435_15822.$1))(length(s_5681_11435_15822.$0));
    if(!$phi$849){
      var $phi$847 = {$0:"no more input available",$tag:1}
    } else if($phi$849){
      var $phi$851 = p_5679((getChar(s_5681_11435_15822.$1))(s_5681_11435_15822.$0));
      if(!$phi$851){
        var $phi$850 = {$0:"parser failed",$tag:1}
      } else if($phi$851){
        var $phi$853 = (getChar(s_5681_11435_15822.$1))(s_5681_11435_15822.$0);
        if("\n"==$phi$853){
          var $_0_5463_14885_15830 = (getChar(s_5681_11435_15822.$1))(s_5681_11435_15822.$0);
          var $_1_5659_11444_15832 = s_5681_11435_15822.$1+1;
          var $phi$852 = (function($_1_5464_14886_15831){
            return {$0:$_0_5463_14885_15830,$1:$_1_5464_14886_15831,$tag:0}
          })(((function($_2_5660_11445_15833){
            return function($_3_5661_11446_15834){
              return {$0:s_5681_11435_15822.$0,$1:$_1_5659_11444_15832,$2:$_2_5660_11445_15833,$3:$_3_5661_11446_15834}
            }
          })(s_5681_11435_15822.$2+1))(0))
        } else {
          var $_0_5463_14887_15836 = (getChar(s_5681_11435_15822.$1))(s_5681_11435_15822.$0);
          var $_1_5659_11448_15838 = s_5681_11435_15822.$1+1;
          var $phi$852 = (function($_1_5464_14888_15837){
            return {$0:$_0_5463_14887_15836,$1:$_1_5464_14888_15837,$tag:0}
          })(((function($_2_5660_11449_15839){
            return function($_3_5661_11450_15840){
              return {$0:s_5681_11435_15822.$0,$1:$_1_5659_11448_15838,$2:$_2_5660_11449_15839,$3:$_3_5661_11450_15840}
            }
          })(s_5681_11435_15822.$2))(s_5681_11435_15822.$3+1))
        };
        var $phi$850 = $phi$852
      } else error("pattern match fail",$phi$851);
      var $phi$847 = $phi$850
    } else error("pattern match fail",$phi$849);
    var $phi$846 = $phi$847;
    return $phi$846
  }}
};
var concatStr_5638 = (foldl(function(cs_5674){
  return function(c_5675){
    return ($concat(cs_5674))(c_5675)
  }
}))("");
var someStr_5645 = function(p_5693){
  var $phi$854 = $instance$Applicative$1.$1;
  var $phi$855 = $instance$Applicative$1.$0;
  return ($phi$854($phi$855(concatStr_5638)))(some_5455(p_5693))
};
var $phi$856 = $instance$Applicative$1.$1;
var whitespaceP_5648 = ($phi$856(mkTok_5637(WsTok_5629)))(someStr_5645(parseChar_5640(function(c_5689_11461){
  return (containsChar_31(c_5689_11461))(" \n")
})));
var intP_5649 = someStr_5645(parseChar_5640(function(c_5689_11463){
  return (containsChar_31(c_5689_11463))("0123456789")
}));
var $phi$857 = $instance$Applicative$1.$1;
var $phi$858 = $instance$Applicative$1.$1;
var $phi$859 = $instance$Applicative$1.$1;
var $phi$860 = $instance$Applicative$1.$0;
var $phi$861 = $instance$Alternative$2.$1;
var $phi$862 = $instance$Applicative$1.$1;
var $phi$863 = $instance$Applicative$1.$1;
var $phi$864 = $instance$Applicative$1.$0;
var $phi$865 = $instance$Applicative$1.$0;
var numP_5650 = ($phi$857(mkTok_5637(NumTok_5631)))(($phi$858(($phi$859($phi$860($concat)))(intP_5649)))(($phi$861(($phi$862(($phi$863($phi$864($concat)))(parseChar_5640(function(c_5689_11489){
  return (containsChar_31(c_5689_11489))(".")
}))))(intP_5649)))($phi$865(""))));
var notCharP_5643 = function(cs_5690){
  return parseChar_5640(function(c_5691){
    var b_144_14889 = (containsChar_31(c_5691))(cs_5690);
    if(b_144_14889){
      var $phi$866 = false
    } else if(!b_144_14889){
      var $phi$866 = true
    } else error("pattern match fail",b_144_14889);
    return $phi$866
  })
};
var manyStr_5644 = function(p_5692){
  var $phi$867 = $instance$Applicative$1.$1;
  var $phi$868 = $instance$Applicative$1.$0;
  return ($phi$867($phi$868(concatStr_5638)))(many_5454(p_5692))
};
var $phi$869 = $instance$Applicative$1.$1;
var lineCommentP_5651 = ($phi$869(mkTok_5637(ComTok_5635)))((($pip$gt_5452($instance$Applicative$1))((($pip$gt_5452($instance$Applicative$1))(parseChar_5640(function(c_5689_11503){
  return (containsChar_31(c_5689_11503))("/")
})))(parseChar_5640(function(c_5689_11505){
  return (containsChar_31(c_5689_11505))("/")
}))))(manyStr_5644(notCharP_5643("\n"))));
var $phi$870 = $instance$Applicative$1.$1;
var symbolP_5652 = ($phi$870(mkTok_5637(SymTok_5630)))(parseChar_5640(function(c_5689_11510){
  return (containsChar_31(c_5689_11510))("()[]{},\\")
}));
var $phi$871 = $instance$Applicative$1.$1;
var $phi$872 = $instance$Applicative$1.$1;
var $phi$873 = $instance$Applicative$1.$1;
var $phi$874 = $instance$Applicative$1.$0;
var cs_5688_11523 = ($concat(letters_5462))("_");
var cs_5688_11525 = ($concat(($concat(letters_5462))("0123456789")))("_");
var identP_5653 = ($phi$871(mkTok_5637(IdTok_5634)))(($phi$872(($phi$873($phi$874($concat)))(parseChar_5640(function(c_5689_11524){
  return (containsChar_31(c_5689_11524))(cs_5688_11523)
}))))(manyStr_5644(parseChar_5640(function(c_5689_11526){
  return (containsChar_31(c_5689_11526))(cs_5688_11525)
}))));
var $phi$875 = $instance$Applicative$1.$1;
var opIdentP_5654 = ($phi$875(mkTok_5637(IdTok_5634)))((($lt$pip_5453($instance$Applicative$1))((($pip$gt_5452($instance$Applicative$1))(parseChar_5640(function(c_5689_11531){
  return (containsChar_31(c_5689_11531))("(")
})))(someStr_5645(parseChar_5640(function(c_5689_11533){
  return (containsChar_31(c_5689_11533))("-+*/=:&|<>^$")
})))))(parseChar_5640(function(c_5689_11535){
  return (containsChar_31(c_5689_11535))(")")
})));
var $phi$876 = $instance$Applicative$1.$1;
var opP_5655 = ($phi$876(mkTok_5637(OpTok_5633)))(someStr_5645(parseChar_5640(function(c_5689_11540){
  return (containsChar_31(c_5689_11540))("-+*/=:&|<>^$~")
})));
var anyCharP_5641 = parseChar_5640(function(__5687){
  return true
});
var notEndOfStringP_5696 = notCharP_5643("'");
var escapeP_5695 = (($pip$gt_5452($instance$Applicative$1))(parseChar_5640(function(c_5689_11542){
  return (containsChar_31(c_5689_11542))("\\")
})))(anyCharP_5641);
var $phi$877 = $instance$Applicative$1.$0;
var newLineP_5694 = (($pip$gt_5452($instance$Applicative$1))((($pip$gt_5452($instance$Applicative$1))(parseChar_5640(function(c_5689_11544){
  return (containsChar_31(c_5689_11544))("\\")
})))(parseChar_5640(function(c_5689_11546){
  return (containsChar_31(c_5689_11546))("n")
}))))($phi$877("\n"));
var $phi$878 = $instance$Alternative$2.$1;
var $phi$879 = $instance$Alternative$2.$1;
var stringCharP_5646 = ($phi$878(($phi$879(newLineP_5694))(escapeP_5695)))(notEndOfStringP_5696);
var $phi$880 = $instance$Applicative$1.$1;
var stringP_5647 = ($phi$880(mkTok_5637(StrTok_5632)))((($lt$pip_5453($instance$Applicative$1))((($pip$gt_5452($instance$Applicative$1))(parseChar_5640(function(c_5689_11560){
  return (containsChar_31(c_5689_11560))("'")
})))(manyStr_5644(stringCharP_5646))))(parseChar_5640(function(c_5689_11562){
  return (containsChar_31(c_5689_11562))("'")
})));
var $phi$881 = $instance$Alternative$2.$1;
var $phi$882 = $instance$Alternative$2.$1;
var $phi$883 = $instance$Alternative$2.$1;
var $phi$884 = $instance$Alternative$2.$1;
var $phi$885 = $instance$Alternative$2.$1;
var $phi$886 = $instance$Alternative$2.$1;
var $phi$887 = $instance$Alternative$2.$1;
var jaguarTokenP_5656 = many_5454(($phi$881(($phi$882(($phi$883(($phi$884(($phi$885(($phi$886(($phi$887(stringP_5647))(whitespaceP_5648)))(numP_5650)))(lineCommentP_5651)))(identP_5653)))(opIdentP_5654)))(opP_5655)))(symbolP_5652));
var ParserState_5867 = function($_0_5934){
  return function($_1_5935){
    return function($_2_5936){
      return function($_3_5937){
        return function($_4_5938){
          return {$0:$_0_5934,$1:$_1_5935,$2:$_2_5936,$3:$_3_5937,$4:$_4_5938}
        }
      }
    }
  }
};
var filterWhitespaceAndComments_5869 = filter(function(t_5945){
  if(t_5945.$0.$tag==0){
    var $phi$888 = false
  } else if(t_5945.$0.$tag==6){
    var $phi$888 = false
  } else var $phi$888 = true;
  return $phi$888
});
var runParser_5870 = function(p_5953){
  return function(s_5954){
    return function(f_5955){
      var $phi$890 = jaguarTokenP_5656.$0({$0:s_5954,$1:0,$2:0,$3:0});
      if($phi$890.$tag==0){
        var ts_5939_11705 = filterWhitespaceAndComments_5869($phi$890.$0);
        var i_5468_14891 = (function(f_5940_11706){
          var $phi$892 = (getIx(0))(ts_5939_11705);
          var $phi$891 = $phi$892.$3;
          return ((((ParserState_5867(ts_5939_11705))(0))($phi$891))(0))(f_5940_11706)
        })(f_5955);
        var $phi$893 = p_5953.$0(i_5468_14891);
        var $phi$889 = $phi$893
      } else if($phi$890.$tag==1){
        var $phi$889 = {$0:$phi$890.$0,$tag:1}
      } else error("pattern match fail",$phi$890);
      return $phi$889
    }
  }
};
var $lt$mul$mns$gt_5873 = function(pf_5987){
  return function(pa_5988){
    var $phi$895 = {$0:function(s_5992_11711_15841){
      var $phi$898 = pf_5987.$0(s_5992_11711_15841);
      if($phi$898.$tag==0){
        var $phi$900 = pa_5988.$0(((((ParserState_5867($phi$898.$1.$0))($phi$898.$1.$1))($phi$898.$1.$2))(s_5992_11711_15841.$2+1))($phi$898.$1.$4));
        if($phi$900.$tag==0){
          var $_0_5463_14895_15859 = $phi$898.$0($phi$900.$0);
          var $phi$899 = (function($_1_5464_14896_15860){
            return {$0:$_0_5463_14895_15859,$1:$_1_5464_14896_15860,$tag:0}
          })(((((ParserState_5867($phi$900.$1.$0))($phi$900.$1.$1))($phi$900.$1.$2))(s_5992_11711_15841.$3))($phi$900.$1.$4))
        } else if($phi$900.$tag==1){
          var $phi$899 = {$0:$phi$900.$0,$tag:1}
        } else error("pattern match fail",$phi$900);
        var $phi$897 = $phi$899
      } else if($phi$898.$tag==1){
        var $phi$897 = {$0:$phi$898.$0,$tag:1}
      } else error("pattern match fail",$phi$898);
      var $phi$896 = $phi$897;
      return $phi$896
    }};
    var $phi$894 = $phi$895;
    return $phi$894
  }
};
var parseToken_5871 = function(f_5959){
  return {$0:function(s_5961_11737_15865){
    var $phi$903 = $instance$Ord$2.$0;
    var $phi$904 = ($phi$903(s_5961_11737_15865.$1))(length(s_5961_11737_15865.$0));
    if(!$phi$904){
      var $phi$902 = {$0:"run out of tokens",$tag:1}
    } else if($phi$904){
      var $phi$906 = (getIx(s_5961_11737_15865.$1))(s_5961_11737_15865.$0);
      var $phi$908 = $instance$Ord$2.$0;
      var $phi$909 = ($phi$908($phi$906.$3))(s_5961_11737_15865.$3);
      if($phi$909){
        var $phi$907 = {$0:"token not indented sufficiently",$tag:1}
      } else if(!$phi$909){
        var $phi$911 = f_5959((getIx(s_5961_11737_15865.$1))(s_5961_11737_15865.$0));
        if($phi$911.$tag==1){
          var $phi$910 = {$0:"parser fun failed",$tag:1}
        } else if($phi$911.$tag==0){
          var $phi$913 = $instance$Ord$2.$0;
          var $phi$914 = ($phi$913(s_5961_11737_15865.$1+1))(length(s_5961_11737_15865.$0));
          if(!$phi$914){
            var $_1_5464_14904_15883 = ((((ParserState_5867(s_5961_11737_15865.$0))(s_5961_11737_15865.$1+1))(s_5961_11737_15865.$2))(s_5961_11737_15865.$3))(s_5961_11737_15865.$4);
            var $phi$912 = {$0:$phi$911.$0,$1:$_1_5464_14904_15883,$tag:0}
          } else if($phi$914){
            var $phi$916 = (getIx(s_5961_11737_15865.$1+1))(s_5961_11737_15865.$0);
            var $phi$918 = (($gt_14($instance$Ord$2))($phi$916.$2))($phi$906.$2);
            if(!$phi$918){
              var $_1_5464_14906_15889 = ((((ParserState_5867(s_5961_11737_15865.$0))(s_5961_11737_15865.$1+1))(s_5961_11737_15865.$2))(s_5961_11737_15865.$3))(s_5961_11737_15865.$4);
              var $phi$917 = {$0:$phi$911.$0,$1:$_1_5464_14906_15889,$tag:0}
            } else if($phi$918){
              var $_1_5464_14908_15891 = ((((ParserState_5867(s_5961_11737_15865.$0))(s_5961_11737_15865.$1+1))($phi$916.$3))(s_5961_11737_15865.$3))(s_5961_11737_15865.$4);
              var $phi$917 = {$0:$phi$911.$0,$1:$_1_5464_14908_15891,$tag:0}
            } else error("pattern match fail",$phi$918);
            var $phi$915 = $phi$917;
            var $phi$912 = $phi$915
          } else error("pattern match fail",$phi$914);
          var $phi$910 = $phi$912
        } else error("pattern match fail",$phi$911);
        var $phi$907 = $phi$910
      } else error("pattern match fail",$phi$909);
      var $phi$905 = $phi$907;
      var $phi$902 = $phi$905
    } else error("pattern match fail",$phi$904);
    var $phi$901 = $phi$902;
    return $phi$901
  }}
};
var operatorP_5877 = function(s_6022){
  return parseToken_5871(function(t_6023){
    if(t_6023.$0.$tag==4){
      var $phi$921 = $instance$Eq$1.$0;
      var $phi$922 = ($phi$921(t_6023.$1))(s_6022);
      if($phi$922){
        var $phi$920 = {$0:s_6022,$tag:0}
      } else if(!$phi$922){
        var $phi$920 = Nothing_2
      } else error("pattern match fail",$phi$922);
      var $phi$919 = $phi$920
    } else var $phi$919 = Nothing_2;
    return $phi$919
  })
};
var symP_5876 = function(s_6016){
  return parseToken_5871(function(t_6017){
    if(t_6017.$0.$tag==1){
      var $phi$925 = $instance$Eq$1.$0;
      var $phi$926 = ($phi$925(t_6017.$1))(s_6016);
      if($phi$926){
        var $phi$924 = {$0:s_6016,$tag:0}
      } else if(!$phi$926){
        var $phi$924 = Nothing_2
      } else error("pattern match fail",$phi$926);
      var $phi$923 = $phi$924
    } else var $phi$923 = Nothing_2;
    return $phi$923
  })
};
var parenP_5883 = function(p_6054){
  return (($lt$pip_5453($instance$Applicative$1))((($pip$gt_5452($instance$Applicative$1))(symP_5876("(")))(p_6054)))(symP_5876(")"))
};
var reserved_5875 = ["as","class","where","instance","let","in","from","import","case","of","data"];
var notUpperCaseId_5882 = parseToken_5871(function(t_6049){
  if(t_6049.$0.$tag==5){
    var $phi$929 = (containsChar_31((getChar(0))(t_6049.$1)))("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if(!$phi$929){
      var $phi$931 = ((contains_28($instance$Eq$1))(t_6049.$1))(reserved_5875);
      if(!$phi$931){
        var $phi$930 = {$0:t_6049.$1,$tag:0}
      } else if($phi$931){
        var $phi$930 = Nothing_2
      } else error("pattern match fail",$phi$931);
      var $phi$928 = $phi$930
    } else if($phi$929){
      var $phi$928 = Nothing_2
    } else error("pattern match fail",$phi$929);
    var $phi$927 = $phi$928
  } else var $phi$927 = Nothing_2;
  return $phi$927
});
var $phi$932 = $instance$Applicative$1.$1;
var $phi$933 = $instance$Applicative$1.$0;
var $_0_704_14912 = Empty_7;
var tvarP_5911 = ($phi$932($phi$933(function($_1_705_14913){
  return {$0:Empty_7,$1:$_1_705_14913,$tag:1}
})))(notUpperCaseId_5882);
var upperCaseId_5881 = parseToken_5871(function(t_6044){
  if(t_6044.$0.$tag==5){
    var $phi$936 = (containsChar_31((getChar(0))(t_6044.$1)))("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if($phi$936){
      var $phi$935 = {$0:t_6044.$1,$tag:0}
    } else if(!$phi$936){
      var $phi$935 = Nothing_2
    } else error("pattern match fail",$phi$936);
    var $phi$934 = $phi$935
  } else var $phi$934 = Nothing_2;
  return $phi$934
});
var $phi$937 = $instance$Applicative$1.$1;
var $phi$938 = $instance$Applicative$1.$0;
var $_0_702_14915 = Empty_7;
var tconstP_5910 = ($phi$937($phi$938(function($_1_703_14916){
  return {$0:Empty_7,$1:$_1_703_14916,$tag:0}
})))(upperCaseId_5881);
var typeP_5909 = {$0:function(s_6114_15892){
  var $phi$939 = tfunP_5914.$0(s_6114_15892);
  return $phi$939
}};
var $phi$940 = $instance$Alternative$2.$1;
var $phi$941 = $instance$Alternative$2.$1;
var simpleTypeP_5912 = ($phi$940(($phi$941(tconstP_5910))(tvarP_5911)))(parenP_5883(typeP_5909));
var $phi$942 = $instance$Applicative$1.$1;
var $phi$943 = $instance$Applicative$1.$0;
var $_0_706_14921 = Empty_7;
var tappP_5913 = ($lt$mul$mns$gt_5873(($phi$942($phi$943(foldl(function($_1_707_14922){
  return function($_2_708_14923){
    return {$0:Empty_7,$1:$_1_707_14922,$2:$_2_708_14923,$tag:2}
  }
}))))(simpleTypeP_5912)))(many_5454(simpleTypeP_5912));
var $phi$944 = $instance$Applicative$1.$1;
var $phi$945 = $instance$Applicative$1.$0;
var tfunP_5914 = ($lt$mul$mns$gt_5873(($phi$944($phi$945(function(t_6115){
  return function(ts_6116){
    return (foldr1(function(b_6117){
      return function(a_6118){
        var $_0_706_14924 = Empty_7;
        var $_0_706_14927 = Empty_7;
        var $_0_702_14930 = Empty_7;
        return ((function($_1_707_14925){
          return function($_2_708_14926){
            return {$0:Empty_7,$1:$_1_707_14925,$2:$_2_708_14926,$tag:2}
          }
        })(((function($_1_707_14928){
          return function($_2_708_14929){
            return {$0:Empty_7,$1:$_1_707_14928,$2:$_2_708_14929,$tag:2}
          }
        })((function($_1_703_14931){
          return {$0:Empty_7,$1:$_1_703_14931,$tag:0}
        })("->")))(a_6118)))(b_6117)
      }
    }))((enqueue(t_6115))(ts_6116))
  }
})))(tappP_5913)))(many_5454((($pip$gt_5452($instance$Applicative$1))(operatorP_5877("->")))(tappP_5913)));
var parseType_5933 = runParser_5870(typeP_5909);
var withLocAnn_5884 = function(a_6055){
  return ((((setAnn_614($instance$Hashable$13))($instance$Eq$1))("codeLoc"))(a_6055))(Empty_7)
};
var locP_5872 = {$0:function(s_5977_11794_15896){
  var $phi$948 = $instance$Ord$2.$0;
  var $phi$949 = ($phi$948(s_5977_11794_15896.$1))(length(s_5977_11794_15896.$0));
  if(!$phi$949){
    var $phi$947 = {$0:"run out of tokens",$tag:1}
  } else if($phi$949){
    var $phi$951 = (getIx(s_5977_11794_15896.$1))(s_5977_11794_15896.$0);
    var $_0_5463_14934_15908 = withLocAnn_5884({$0:s_5977_11794_15896.$4,$1:$phi$951.$2,$2:$phi$951.$3,$tag:1});
    var $phi$950 = (function($_1_5464_14935_15914){
      return {$0:$_0_5463_14934_15908,$1:$_1_5464_14935_15914,$tag:0}
    })(s_5977_11794_15896);
    var $phi$947 = $phi$950
  } else error("pattern match fail",$phi$949);
  var $phi$946 = $phi$947;
  return $phi$946
}};
var $pip$mns$gt_5874 = function(pa_6012){
  return function(pb_6013){
    var $phi$952 = $instance$Applicative$1.$1;
    var $phi$953 = $instance$Applicative$1.$0;
    return ($lt$mul$mns$gt_5873(($phi$952($phi$953(function(__6014){
      return function(b_6015){
        return b_6015
      }
    })))(pa_6012)))(pb_6013)
  }
};
var anyOpP_5878 = parseToken_5871(function(t_6028){
  if(t_6028.$0.$tag==4){
    var $phi$954 = {$0:t_6028.$1,$tag:0}
  } else var $phi$954 = Nothing_2;
  return $phi$954
});
var reservedP_5879 = function(s_6033){
  return parseToken_5871(function(t_6034){
    if(t_6034.$0.$tag==5){
      var $phi$957 = $instance$Eq$1.$0;
      var $phi$958 = ($phi$957(t_6034.$1))(s_6033);
      if($phi$958){
        var $phi$956 = {$0:s_6033,$tag:0}
      } else if(!$phi$958){
        var $phi$956 = Nothing_2
      } else error("pattern match fail",$phi$958);
      var $phi$955 = $phi$956
    } else var $phi$955 = Nothing_2;
    return $phi$955
  })
};
var $phi$959 = $instance$Applicative$1.$1;
var $phi$960 = $instance$Applicative$1.$1;
var $phi$961 = $instance$Applicative$1.$0;
var varP_5886 = ($phi$959(($phi$960($phi$961(function($_0_646_14943){
  return function($_1_647_14944){
    return {$0:$_0_646_14943,$1:$_1_647_14944,$tag:0}
  }
})))(locP_5872)))(parseToken_5871(function(t_6057){
  if(t_6057.$0.$tag==5){
    var $phi$964 = ((contains_28($instance$Eq$1))(t_6057.$1))(reserved_5875);
    if($phi$964){
      var $phi$963 = Nothing_2
    } else if(!$phi$964){
      var $phi$963 = {$0:t_6057.$1,$tag:0}
    } else error("pattern match fail",$phi$964);
    var $phi$962 = $phi$963
  } else var $phi$962 = Nothing_2;
  return $phi$962
}));
var $phi$965 = $instance$Applicative$1.$1;
var $phi$966 = $instance$Applicative$1.$1;
var $phi$967 = $instance$Applicative$1.$0;
var cnumP_5887 = ($phi$965(($phi$966($phi$967(function($_0_648_14946){
  return function($_1_649_14947){
    return {$0:$_0_648_14946,$1:$_1_649_14947,$tag:1}
  }
})))(locP_5872)))(parseToken_5871(function(t_6062){
  if(t_6062.$0.$tag==2){
    var $_0_665_14949 = unsafeStringToInt(t_6062.$1);
    var $_0_85_14948 = {$0:$_0_665_14949,$tag:0};
    var $phi$968 = {$0:$_0_85_14948,$tag:0}
  } else var $phi$968 = Nothing_2;
  return $phi$968
}));
var $phi$969 = $instance$Applicative$1.$1;
var $phi$970 = $instance$Applicative$1.$1;
var $phi$971 = $instance$Applicative$1.$0;
var cstrP_5888 = ($phi$969(($phi$970($phi$971(function($_0_648_14950){
  return function($_1_649_14951){
    return {$0:$_0_648_14950,$1:$_1_649_14951,$tag:1}
  }
})))(locP_5872)))(parseToken_5871(function(t_6067){
  if(t_6067.$0.$tag==3){
    var $phi$972 = {$0:{$0:t_6067.$1,$tag:1},$tag:0}
  } else var $phi$972 = Nothing_2;
  return $phi$972
}));
var $phi$973 = $instance$Alternative$2.$1;
var constP_5889 = ($phi$973(cstrP_5888))(cnumP_5887);
var $phi$974 = $instance$Applicative$1.$1;
var $phi$975 = $instance$Applicative$1.$1;
var $phi$976 = $instance$Applicative$1.$0;
var pvarP_5896 = ($phi$974(($phi$975($phi$976(function($_0_667_14954){
  return function($_1_668_14955){
    return {$0:$_0_667_14954,$1:$_1_668_14955,$tag:0}
  }
})))(locP_5872)))(notUpperCaseId_5882);
var $phi$977 = $instance$Applicative$1.$1;
var $phi$978 = $instance$Applicative$1.$1;
var $phi$979 = $instance$Applicative$1.$0;
var pcstrP_5898 = ($phi$977(($phi$978($phi$979(function($_0_669_14956){
  return function($_1_670_14957){
    return {$0:$_0_669_14956,$1:$_1_670_14957,$tag:1}
  }
})))(locP_5872)))(parseToken_5871(function(t_6088){
  if(t_6088.$0.$tag==3){
    var $phi$980 = {$0:{$0:t_6088.$1,$tag:1},$tag:0}
  } else var $phi$980 = Nothing_2;
  return $phi$980
}));
var $phi$981 = $instance$Applicative$1.$1;
var $phi$982 = $instance$Applicative$1.$1;
var $phi$983 = $instance$Applicative$1.$0;
var pcnumP_5897 = ($phi$981(($phi$982($phi$983(function($_0_669_14960){
  return function($_1_670_14961){
    return {$0:$_0_669_14960,$1:$_1_670_14961,$tag:1}
  }
})))(locP_5872)))(parseToken_5871(function(t_6083){
  if(t_6083.$0.$tag==2){
    var $_0_665_14963 = unsafeStringToInt(t_6083.$1);
    var $_0_85_14962 = {$0:$_0_665_14963,$tag:0};
    var $phi$984 = {$0:$_0_85_14962,$tag:0}
  } else var $phi$984 = Nothing_2;
  return $phi$984
}));
var $phi$985 = $instance$Alternative$2.$1;
var pconstP_5900 = ($phi$985(pcnumP_5897))(pcstrP_5898);
var patP_5895 = {$0:function(s_6082_15915){
  var $phi$986 = allPatP_5902.$0(s_6082_15915);
  return $phi$986
}};
var $phi$987 = $instance$Applicative$1.$1;
var $phi$988 = $instance$Applicative$1.$1;
var $phi$989 = $instance$Applicative$1.$0;
var $phi$990 = $instance$Alternative$2.$1;
var $phi$991 = $instance$Alternative$2.$1;
var pdataP_5901 = ($lt$mul$mns$gt_5873(($phi$987(($phi$988($phi$989(function($_0_671_14968){
  return function($_1_672_14969){
    return function($_2_673_14970){
      return {$0:$_0_671_14968,$1:$_1_672_14969,$2:$_2_673_14970,$tag:2}
    }
  }
})))(locP_5872)))(upperCaseId_5881)))(many_5454(($phi$990(($phi$991(pvarP_5896))(pconstP_5900)))(parenP_5883(patP_5895))));
var $phi$992 = $instance$Alternative$2.$1;
var $phi$993 = $instance$Alternative$2.$1;
var allPatP_5902 = ($phi$992(($phi$993(pvarP_5896))(pconstP_5900)))(pdataP_5901);
var exprP_5890 = {$0:function(s_6072_15919){
  var $phi$994 = opP_5908.$0(s_6072_15919);
  return $phi$994
}};
var $phi$995 = $instance$Applicative$1.$1;
var $phi$996 = $instance$Applicative$1.$1;
var $phi$997 = $instance$Applicative$1.$0;
var sp_5498_14979 = symP_5876(",");
var $phi$998 = $instance$Applicative$1.$1;
var $phi$999 = $instance$Applicative$1.$0;
var arrayLitP_5891 = ($phi$995(($phi$996($phi$997(function(ann_6073){
  return function(xs_6074){
    return {$0:ann_6073,$1:"Array",$2:xs_6074,$tag:6}
  }
})))(locP_5872)))((($lt$pip_5453($instance$Applicative$1))((($pip$gt_5452($instance$Applicative$1))(symP_5876("[")))(($phi$998($phi$999(function(m_118_14987){
  if(m_118_14987.$tag==0){
    var $phi$1000 = m_118_14987.$0
  } else if(m_118_14987.$tag==1){
    var $phi$1000 = []
  } else error("pattern match fail",m_118_14987);
  return $phi$1000
})))(opt_5459((sepBy1_5457(exprP_5890))(sp_5498_14979))))))(symP_5876("]")));
var $phi$1001 = $instance$Alternative$2.$1;
var $phi$1002 = $instance$Alternative$2.$1;
var $phi$1003 = $instance$Alternative$2.$1;
var simpleExprP_5892 = ($phi$1001(($phi$1002(($phi$1003(varP_5886))(constP_5889)))(arrayLitP_5891)))(parenP_5883(exprP_5890));
var $phi$1004 = $instance$Applicative$1.$1;
var $phi$1005 = $instance$Applicative$1.$0;
var $phi$1006 = $instance$Alternative$2.$1;
var appP_5893 = ($lt$mul$mns$gt_5873(($phi$1004($phi$1005(foldl(function(f_6075){
  return function(a_6076){
    var a_101_14993 = (((getAnn_613($instance$Hashable$13))($instance$Eq$1))("codeLoc"))(annOf_626(f_6075));
    var $_0_650_14989 = withLocAnn_5884(fromJust_20(a_101_14993));
    return ((function($_1_651_14990){
      return function($_2_652_14991){
        return {$0:$_0_650_14989,$1:$_1_651_14990,$2:$_2_652_14991,$tag:2}
      }
    })(f_6075))(a_6076)
  }
}))))(($phi$1006(varP_5886))(parenP_5883(exprP_5890)))))(many_5454(simpleExprP_5892));
var $phi$1007 = $instance$Applicative$1.$1;
var $phi$1008 = $instance$Applicative$1.$1;
var $phi$1009 = $instance$Applicative$1.$0;
var lamP_5894 = ($lt$mul$mns$gt_5873(($phi$1007(($phi$1008($phi$1009(function(l_6077){
  return function(ps_6078){
    return function(a_6079){
      return ((foldr(function(a_6080){
        return function(p_6081){
          return {$0:l_6077,$1:p_6081,$2:a_6080,$tag:3}
        }
      }))(a_6079))(ps_6078)
    }
  }
})))(locP_5872)))(($pip$mns$gt_5874(symP_5876("\\")))(some_5455(notUpperCaseId_5882)))))((($pip$gt_5452($instance$Applicative$1))(operatorP_5877("->")))(exprP_5890));
var $phi$1010 = $instance$Applicative$1.$1;
var $phi$1011 = $instance$Applicative$1.$0;
var ofP_5903 = ($lt$mul$mns$gt_5873(($phi$1010($phi$1011(function($_0_86_14997){
  return function($_1_87_14998){
    return {$0:$_0_86_14997,$1:$_1_87_14998}
  }
})))(patP_5895)))((($pip$gt_5452($instance$Applicative$1))(operatorP_5877("->")))(exprP_5890));
var $phi$1012 = $instance$Applicative$1.$1;
var $phi$1013 = $instance$Applicative$1.$1;
var $phi$1014 = $instance$Applicative$1.$0;
var caseP_5904 = ($lt$mul$mns$gt_5873(($phi$1012(($phi$1013($phi$1014(function($_0_656_14999){
  return function($_1_657_15000){
    return function($_2_658_15001){
      return {$0:$_0_656_14999,$1:$_1_657_15000,$2:$_2_658_15001,$tag:4}
    }
  }
})))(locP_5872)))(($pip$mns$gt_5874(reservedP_5879("case")))(simpleExprP_5892))))((($pip$gt_5452($instance$Applicative$1))(reservedP_5879("of")))(some_5455(ofP_5903)));
var $phi$1015 = $instance$Applicative$1.$1;
var $phi$1016 = $instance$Applicative$1.$1;
var $phi$1017 = $instance$Applicative$1.$0;
var defP_5905 = ($lt$mul$mns$gt_5873(($lt$mul$mns$gt_5873(($phi$1015(($phi$1016($phi$1017(function(l_6098){
  return function(n_6099){
    return function(ps_6100){
      return function(e_6101){
        var $_1_87_15003 = ((foldr(function(e_6102){
          return function(p_6103){
            return {$0:l_6098,$1:p_6103,$2:e_6102,$tag:3}
          }
        }))(e_6101))(ps_6100);
        return {$0:n_6099,$1:$_1_87_15003}
      }
    }
  }
})))(locP_5872)))(notUpperCaseId_5882)))(many_5454(notUpperCaseId_5882))))((($pip$gt_5452($instance$Applicative$1))(operatorP_5877("=")))(exprP_5890));
var $phi$1018 = $instance$Applicative$1.$1;
var $phi$1019 = $instance$Applicative$1.$1;
var $phi$1020 = $instance$Applicative$1.$1;
var $phi$1021 = $instance$Applicative$1.$0;
var letP_5906 = ($phi$1018(($phi$1019(($phi$1020($phi$1021(function($_0_659_15007){
  return function($_1_660_15008){
    return function($_2_661_15009){
      return {$0:$_0_659_15007,$1:$_1_660_15008,$2:$_2_661_15009,$tag:5}
    }
  }
})))(locP_5872)))(($pip$mns$gt_5874(reservedP_5879("let")))(some_5455(defP_5905)))))(($pip$mns$gt_5874(reservedP_5879("in")))(exprP_5890));
var $phi$1022 = $instance$Alternative$2.$1;
var $phi$1023 = $instance$Alternative$2.$1;
var $phi$1024 = $instance$Alternative$2.$1;
var $phi$1025 = $instance$Alternative$2.$1;
var $phi$1026 = $instance$Alternative$2.$1;
var primaryExprP_5907 = ($phi$1022(($phi$1023(($phi$1024(($phi$1025(($phi$1026(appP_5893))(constP_5889)))(lamP_5894)))(caseP_5904)))(letP_5906)))(arrayLitP_5891);
var $phi$1027 = $instance$Applicative$1.$1;
var $phi$1028 = $instance$Applicative$1.$0;
var $phi$1030 = $instance$Applicative$1.$1;
var $phi$1031 = $instance$Applicative$1.$1;
var $phi$1032 = $instance$Applicative$1.$1;
var $phi$1033 = $instance$Applicative$1.$0;
var opP_5908 = ($lt$mul$mns$gt_5873(($phi$1027($phi$1028(function(e_6104){
  return function(oes_6105){
    return ((foldl(function(a_6106){
      return function(lob_6107){
        var $_1_651_15011 = {$0:lob_6107.$0,$1:{$0:lob_6107.$0,$1:lob_6107.$1.$0,$tag:0},$2:a_6106,$tag:2};
        var $phi$1029 = (function($_2_652_15012){
          return {$0:lob_6107.$0,$1:$_1_651_15011,$2:$_2_652_15012,$tag:2}
        })(lob_6107.$1.$1);
        return $phi$1029
      }
    }))(e_6104))(oes_6105)
  }
})))(primaryExprP_5907)))(many_5454(($phi$1030(($phi$1031(($phi$1032($phi$1033(function(l_6111){
  return function(op_6112){
    return function(e_6113){
      return {$0:l_6111,$1:{$0:op_6112,$1:e_6113}}
    }
  }
})))(locP_5872)))(anyOpP_5878)))(primaryExprP_5907)));
var strP_5899 = parseToken_5871(function(t_6093){
  if(t_6093.$0.$tag==3){
    var $phi$1034 = {$0:t_6093.$1,$tag:0}
  } else var $phi$1034 = Nothing_2;
  return $phi$1034
});
var nonReservedP_5880 = parseToken_5871(function(t_6039){
  if(t_6039.$0.$tag==5){
    var $phi$1037 = ((contains_28($instance$Eq$1))(t_6039.$1))(reserved_5875);
    if($phi$1037){
      var $phi$1036 = Nothing_2
    } else if(!$phi$1037){
      var $phi$1036 = {$0:t_6039.$1,$tag:0}
    } else error("pattern match fail",$phi$1037);
    var $phi$1035 = $phi$1036
  } else var $phi$1035 = Nothing_2;
  return $phi$1035
});
var $phi$1038 = $instance$Applicative$1.$1;
var $phi$1039 = $instance$Applicative$1.$0;
var importNoAliasP_5920 = ($phi$1038($phi$1039(function(n_6125){
  return {$0:n_6125,$1:n_6125}
})))(nonReservedP_5880);
var $phi$1040 = $instance$Applicative$1.$1;
var $phi$1041 = $instance$Applicative$1.$1;
var $phi$1042 = $instance$Applicative$1.$0;
var importAliasP_5921 = ($phi$1040(($phi$1041($phi$1042(function($_0_86_15026){
  return function($_1_87_15027){
    return {$0:$_0_86_15026,$1:$_1_87_15027}
  }
})))(nonReservedP_5880)))((($pip$gt_5452($instance$Applicative$1))(reservedP_5879("as")))(nonReservedP_5880));
var $phi$1043 = $instance$Applicative$1.$1;
var $phi$1044 = $instance$Applicative$1.$1;
var $phi$1045 = $instance$Applicative$1.$0;
var $phi$1046 = $instance$Alternative$2.$1;
var importOpenP_5922 = ($phi$1043(($phi$1044($phi$1045(function(ns_6126){
  return function(f_6127){
    var $_0_716_15028 = Empty_7;
    return ((function($_1_717_15029){
      return function($_2_718_15030){
        return {$0:Empty_7,$1:$_1_717_15029,$2:$_2_718_15030,$tag:1}
      }
    })(f_6127))(ns_6126)
  }
})))((($lt$pip_5453($instance$Applicative$1))((($pip$gt_5452($instance$Applicative$1))(symP_5876("{")))((sepBy1_5457(($phi$1046(importAliasP_5921))(importNoAliasP_5920)))(symP_5876(",")))))(symP_5876("}")))))((($pip$gt_5452($instance$Applicative$1))(reservedP_5879("from")))(strP_5899));
var $phi$1047 = $instance$Applicative$1.$1;
var $phi$1048 = $instance$Applicative$1.$0;
var $_0_719_15031 = Empty_7;
var importAllP_5923 = ($phi$1047($phi$1048(function($_1_720_15032){
  return {$0:Empty_7,$1:$_1_720_15032,$tag:2}
})))((($pip$gt_5452($instance$Applicative$1))((($pip$gt_5452($instance$Applicative$1))(operatorP_5877("*")))(reservedP_5879("from"))))(strP_5899));
var $phi$1049 = $instance$Alternative$2.$1;
var importP_5924 = (($pip$gt_5452($instance$Applicative$1))(reservedP_5879("import")))(($phi$1049(importOpenP_5922))(importAllP_5923));
var $phi$1050 = $instance$Applicative$1.$1;
var $phi$1051 = $instance$Applicative$1.$0;
var topLevelDef_5928 = ($phi$1050($phi$1051(function(d_6145_12043){
  var $_1_87_15034 = (withAnn_627(((((setAnn_614($instance$Hashable$13))($instance$Eq$1))("export"))({$0:d_6145_12043.$0,$tag:5}))(annOf_626(d_6145_12043.$1))))(d_6145_12043.$1);
  var $phi$1052 = {$0:d_6145_12043.$0,$1:$_1_87_15034};
  return $phi$1052
})))(defP_5905);
var eitherP_5927 = function(a_6141){
  return function(b_6142){
    var f_100_15036 = function($_0_5466_15038){
      return {$0:$_0_5466_15038}
    };
    return (function(a_101_15037){
      return {$0:a_101_15037}
    })(function(s_6143){
      var $phi$1053 = $instance$Alternative$2.$1;
      var $phi$1054 = $instance$Applicative$1.$1;
      var $phi$1055 = $instance$Applicative$1.$0;
      var $phi$1056 = $instance$Applicative$1.$1;
      var $phi$1057 = $instance$Applicative$1.$0;
      var p_5467_15039 = ($phi$1053(($phi$1054($phi$1055(function($_0_88_15042){
        return {$0:$_0_88_15042,$tag:0}
      })))(a_6141)))(($phi$1056($phi$1057(function($_0_89_15043){
        return {$0:$_0_89_15043,$tag:1}
      })))(b_6142));
      return (function(i_5468_15040){
        var $phi$1058 = p_5467_15039.$0(i_5468_15040);
        return $phi$1058
      })(s_6143)
    })
  }
};
var $phi$1059 = $instance$Applicative$1.$1;
var $phi$1060 = $instance$Applicative$1.$0;
var classMemberP_5916 = ($lt$mul$mns$gt_5873(($phi$1059($phi$1060(function($_0_86_15044){
  return function($_1_87_15045){
    return {$0:$_0_86_15044,$1:$_1_87_15045}
  }
})))(notUpperCaseId_5882)))((($pip$gt_5452($instance$Applicative$1))(operatorP_5877("::")))(typeP_5909));
var $phi$1061 = $instance$Applicative$1.$1;
var $phi$1062 = $instance$Applicative$1.$0;
var classP_5915 = ($lt$mul$mns$gt_5873(($lt$mul$mns$gt_5873(($phi$1061($phi$1062(function(name_6119){
  return function(tv_6120){
    return function(maybeDefs_6121){
      var $_0_691_15046 = Empty_7;
      if(maybeDefs_6121.$tag==0){
        var $phi$1063 = maybeDefs_6121.$0
      } else if(maybeDefs_6121.$tag==1){
        var $phi$1063 = []
      } else error("pattern match fail",maybeDefs_6121);
      return (((function($_1_692_15047){
        return function($_2_693_15048){
          return function($_3_694_15049){
            return {$0:Empty_7,$1:$_1_692_15047,$2:$_2_693_15048,$3:$_3_694_15049}
          }
        }
      })(name_6119))(tv_6120))($phi$1063)
    }
  }
})))(($pip$mns$gt_5874(reservedP_5879("class")))(upperCaseId_5881))))(notUpperCaseId_5882)))(opt_5459((($pip$gt_5452($instance$Applicative$1))(reservedP_5879("where")))(some_5455(classMemberP_5916))));
var $phi$1064 = $instance$Applicative$1.$1;
var $phi$1065 = $instance$Applicative$1.$0;
var instanceP_5917 = ($lt$mul$mns$gt_5873(($lt$mul$mns$gt_5873(($phi$1064($phi$1065(function(name_6122){
  return function(t_6123){
    return function(maybeDefs_6124){
      var $_0_695_15053 = Empty_7;
      if(maybeDefs_6124.$tag==0){
        var $phi$1066 = maybeDefs_6124.$0
      } else if(maybeDefs_6124.$tag==1){
        var $phi$1066 = []
      } else error("pattern match fail",maybeDefs_6124);
      return (((function($_1_696_15054){
        return function($_2_697_15055){
          return function($_3_698_15056){
            return {$0:Empty_7,$1:$_1_696_15054,$2:$_2_697_15055,$3:$_3_698_15056}
          }
        }
      })(name_6122))(t_6123))($phi$1066)
    }
  }
})))(($pip$mns$gt_5874(reservedP_5879("instance")))(upperCaseId_5881))))(simpleTypeP_5912)))(opt_5459((($pip$gt_5452($instance$Applicative$1))(reservedP_5879("where")))(some_5455(defP_5905))));
var $phi$1067 = $instance$Applicative$1.$1;
var $phi$1068 = $instance$Applicative$1.$0;
var $_0_688_15060 = Empty_7;
var dataConP_5918 = ($lt$mul$mns$gt_5873(($phi$1067($phi$1068(function($_1_689_15061){
  return function($_2_690_15062){
    return {$0:Empty_7,$1:$_1_689_15061,$2:$_2_690_15062}
  }
})))(upperCaseId_5881)))(many_5454(simpleTypeP_5912));
var $phi$1069 = $instance$Applicative$1.$1;
var $phi$1070 = $instance$Applicative$1.$0;
var $_0_684_15063 = Empty_7;
var dataP_5919 = ($lt$mul$mns$gt_5873(($lt$mul$mns$gt_5873(($phi$1069($phi$1070(function($_1_685_15064){
  return function($_2_686_15065){
    return function($_3_687_15066){
      return {$0:Empty_7,$1:$_1_685_15064,$2:$_2_686_15065,$3:$_3_687_15066}
    }
  }
})))(($pip$mns$gt_5874(reservedP_5879("data")))(upperCaseId_5881))))(many_5454(notUpperCaseId_5882))))((($pip$gt_5452($instance$Applicative$1))(operatorP_5877("=")))((sepBy1_5457(dataConP_5918))(operatorP_5877("|"))));
var topLevelP_5929 = (eitherP_5927((eitherP_5927(dataP_5919))(topLevelDef_5928)))((eitherP_5927(classP_5915))(instanceP_5917));
var $phi$1071 = $instance$Applicative$1.$1;
var $phi$1072 = $instance$Applicative$1.$1;
var $phi$1073 = $instance$Applicative$1.$1;
var $phi$1074 = $instance$Applicative$1.$0;
var moduleP_5925 = ($phi$1071(($phi$1072(($phi$1073($phi$1074(function(loc_6128){
  return function(is_6129){
    return function(es_6130){
      var $phi$1077 = splitEither_25(es_6130);
      var $_0_86_15067 = splitEither_25($phi$1077.$0);
      var $phi$1076 = (function($_1_87_15068){
        return {$0:$_0_86_15067,$1:$_1_87_15068}
      })(splitEither_25($phi$1077.$1));
      var $phi$1079 = getAnnCodeLoc_618(loc_6128);
      if(($phi$1079.$tag==0)&&($phi$1079.$0.$tag==1)){
        var $phi$1078 = $phi$1079.$0.$0
      } else error("pattern match fail",$phi$1079);
      var $phi$1075 = ((((((Module_596(loc_6128))($phi$1078))(is_6129))($phi$1076.$0.$0))($phi$1076.$1.$0))($phi$1076.$1.$1))($phi$1076.$0.$1);
      return $phi$1075
    }
  }
})))(locP_5872)))(many_5454(importP_5924))))(some_5455(topLevelP_5929));
var parseModule_5930 = runParser_5870(moduleP_5925);
var $_1_4375_15070 = Nothing_2;
var outPathArg_6338 = {$0:"out",$1:Nothing_2,$tag:1};
var $_1_4375_15072 = Nothing_2;
var mainArg_6339 = {$0:"main",$1:Nothing_2,$tag:1};
var profileArg_6340 = {$0:"profile",$1:{$0:false,$tag:0},$tag:0};
var $_1_4375_15077 = Nothing_2;
var builtinsPathArg_6337 = {$0:"builtins",$1:Nothing_2,$tag:1};
var argDefs_6341 = (push(builtinsPathArg_6337))((push(outPathArg_6338))((push(mainArg_6339))((push(profileArg_6340))([]))));
var liftPass_6342 = function(local$instance$Monad$0){
  return function(p_6425){
    return function(a_6426){
      var $phi$1080 = local$instance$Monad$0.$0;
      return $phi$1080(p_6425(a_6426))
    }
  }
};
var normalizeImportsPass_6343 = function(m_6427){
  var $phi$1081 = $instance$Monad$11.$1;
  return ($phi$1081(getExports_1109))(function(es_6428){
    var $phi$1082 = $instance$Monad$11.$0;
    return $phi$1082((normalizeImports_3690(es_6428))(m_6427))
  })
};
var moduleFile_6330 = function(m_6348){
  var $phi$1083 = m_6348.$1;
  return $phi$1083
};
var typerPass_6344 = function(m_6429){
  var $phi$1084 = $instance$Monad$11.$1;
  return ($phi$1084(getExports_1109))(function(es_6430){
    var typed_6431 = (inferTypeModule_2839(es_6430))(m_6429);
    var e_6432 = getTypedExports_2840(typed_6431);
    var $phi$1085 = $instance$Monad$11.$0;
    return (($gt$gt_17($instance$Monad$11))(setExports_1110(((set(moduleFile_6330(m_6429)))(e_6432))(es_6430))))($phi$1085(typed_6431))
  })
};
var declasserPass_6345 = function(m_6433){
  var $phi$1086 = $instance$Monad$11.$1;
  return ($phi$1086(getExports_1109))(function(es_6434){
    var $phi$1087 = $instance$Monad$11.$0;
    return $phi$1087((declassModule_3900(es_6434))(m_6433))
  })
};
var parse_6331 = function(fn_6356){
  var $phi$1089 = (parseModule_5930(readFile(fn_6356)))(($concat("//"))(fn_6356));
  if($phi$1089.$tag==0){
    var $phi$1091 = $instance$Eq$0.$0;
    var $phi$1092 = ($phi$1091($phi$1089.$1.$1))(length($phi$1089.$1.$0));
    if($phi$1092){
      var $phi$1090 = $phi$1089.$0
    } else if(!$phi$1092){
      var $phi$1090 = error(($concat("failed to parse all tokens, stopped at "))(jsonStringify((getIx($phi$1089.$1.$1))($phi$1089.$1.$0))))
    } else error("pattern match fail",$phi$1092);
    var $phi$1088 = $phi$1090
  } else var $phi$1088 = error($phi$1089);
  return $phi$1088
};
var findImports_6333 = function(m_6372){
  var $phi$1093 = (map(function(i_6374_12949){
    if(i_6374_12949.$tag==2){
      var $phi$1094 = i_6374_12949.$1
    } else if(i_6374_12949.$tag==1){
      var $phi$1094 = i_6374_12949.$1
    } else if(i_6374_12949.$tag==0){
      var $phi$1094 = i_6374_12949.$1
    } else error("pattern match fail",i_6374_12949);
    return $phi$1094
  }))(m_6372.$2);
  return $phi$1093
};
var depSort_6332 = function(mainName_6364){
  return function(ms_6365){
    var modules_6366 = ((foldl(function(r_6369){
      return function(m_6370){
        return ((set(moduleFile_6330(m_6370)))(m_6370))(r_6369)
      }
    }))(empty))(ms_6365);
    var imports_6367 = (mapRecord(function(m_6372_12958){
      var $phi$1095 = (map(function(i_6374_12960_15078){
        if(i_6374_12960_15078.$tag==2){
          var $phi$1096 = i_6374_12960_15078.$1
        } else if(i_6374_12960_15078.$tag==1){
          var $phi$1096 = i_6374_12960_15078.$1
        } else if(i_6374_12960_15078.$tag==0){
          var $phi$1096 = i_6374_12960_15078.$1
        } else error("pattern match fail",i_6374_12960_15078);
        return $phi$1096
      }))(m_6372_12958.$2);
      return $phi$1095
    }))(modules_6366);
    var ordered_6368 = ((dfs_2570(imports_6367))([]))(mainName_6364);
    var a_101_15088 = (map(function(n_6371){
      return (get(n_6371))(modules_6366)
    }))(ordered_6368);
    return reverse_46(a_101_15088)
  }
};
var parseT_6334 = function(s_6390){
  var $phi$1098 = (parseType_5933(s_6390))("");
  if($phi$1098.$tag==0){
    var $phi$1097 = $phi$1098.$0
  } else var $phi$1097 = error($phi$1098);
  return $phi$1097
};
var parseExports_6335 = function(e_6394){
  var bs_6395 = (mapRecord(function(s_6396){
    var $phi$1100 = (parseType_5933(s_6396))("");
    if($phi$1100.$tag==0){
      var $phi$1099 = $phi$1100.$0
    } else var $phi$1099 = error($phi$1100);
    return (evalState_55(newCtx_2797))((generalize_2831(emptyEnv_2807))($phi$1099))
  }))(e_6394);
  return {$0:bs_6395,$1:[],$2:[]}
};
var instrument_6336 = function(m_6397){
  var instrumentExpr_6399 = function(n_6407){
    return function(e_6408){
      if(e_6408.$tag==3){
        var $_2_655_15094 = (instrumentExpr_6399(n_6407))(e_6408.$2);
        var $phi$1101 = {$0:e_6408.$0,$1:e_6408.$1,$2:$_2_655_15094,$tag:3}
      } else {
        var $_0_653_15095 = Empty_7;
        var we_6413 = ((function($_1_654_15096){
          return function($_2_655_15097){
            return {$0:Empty_7,$1:$_1_654_15096,$2:$_2_655_15097,$tag:3}
          }
        })("$unused$"))(e_6408);
        var $_0_650_15098 = Empty_7;
        var $_0_650_15101 = Empty_7;
        var $_0_646_15104 = Empty_7;
        var $_0_648_15106 = Empty_7;
        var $phi$1101 = ((function($_1_651_15099){
          return function($_2_652_15100){
            return {$0:Empty_7,$1:$_1_651_15099,$2:$_2_652_15100,$tag:2}
          }
        })(((function($_1_651_15102){
          return function($_2_652_15103){
            return {$0:Empty_7,$1:$_1_651_15102,$2:$_2_652_15103,$tag:2}
          }
        })((function($_1_647_15105){
          return {$0:Empty_7,$1:$_1_647_15105,$tag:0}
        })("perfTime")))((function($_1_649_15107){
          return {$0:Empty_7,$1:$_1_649_15107,$tag:1}
        })({$0:n_6407,$tag:1}))))(we_6413)
      };
      return $phi$1101
    }
  };
  var $phi$1102 = ((((((Module_596(m_6397.$0))(m_6397.$1))((map(function(i_6414_12980){
    if((i_6414_12980.$tag==1)&&("./builtins.js"==i_6414_12980.$1)){
      var $_2_718_15111 = (push({$0:"perfTime",$1:"perfTime"}))(i_6414_12980.$2);
      var $phi$1103 = {$0:i_6414_12980.$0,$1:"./builtins.js",$2:$_2_718_15111,$tag:1}
    } else var $phi$1103 = i_6414_12980;
    return $phi$1103
  }))(m_6397.$2)))(m_6397.$3))(m_6397.$4))(m_6397.$5))((map(function(d_6401_12984){
    if(d_6401_12984.$1.$tag==3){
      var $_1_87_15115 = (instrumentExpr_6399(d_6401_12984.$0))({$0:d_6401_12984.$1.$0,$1:d_6401_12984.$1.$1,$2:d_6401_12984.$1.$2,$tag:3});
      var $phi$1104 = {$0:d_6401_12984.$0,$1:$_1_87_15115}
    } else var $phi$1104 = d_6401_12984;
    return $phi$1104
  }))(m_6397.$6));
  return $phi$1102
};
var instrumentPass_6346 = function(local$instance$Monad$0){
  return function(profile_6435){
    return function(m_6436){
      if(!profile_6435){
        var $phi$1111 = local$instance$Monad$0.$0;
        var $phi$1105 = $phi$1111(m_6436)
      } else if(profile_6435){
        var $phi$1106 = local$instance$Monad$0.$0;
        var instrumentExpr_6399_12998 = function(n_6407_13004){
          return function(e_6408_13005){
            if(e_6408_13005.$tag==3){
              var $_2_655_15126 = (instrumentExpr_6399_12998(n_6407_13004))(e_6408_13005.$2);
              var $phi$1107 = {$0:e_6408_13005.$0,$1:e_6408_13005.$1,$2:$_2_655_15126,$tag:3}
            } else {
              var $_0_653_15127 = Empty_7;
              var we_6413_13010 = ((function($_1_654_15128){
                return function($_2_655_15129){
                  return {$0:Empty_7,$1:$_1_654_15128,$2:$_2_655_15129,$tag:3}
                }
              })("$unused$"))(e_6408_13005);
              var $_0_650_15130 = Empty_7;
              var $_0_650_15133 = Empty_7;
              var $_0_646_15136 = Empty_7;
              var $_0_648_15138 = Empty_7;
              var $phi$1107 = ((function($_1_651_15131){
                return function($_2_652_15132){
                  return {$0:Empty_7,$1:$_1_651_15131,$2:$_2_652_15132,$tag:2}
                }
              })(((function($_1_651_15134){
                return function($_2_652_15135){
                  return {$0:Empty_7,$1:$_1_651_15134,$2:$_2_652_15135,$tag:2}
                }
              })((function($_1_647_15137){
                return {$0:Empty_7,$1:$_1_647_15137,$tag:0}
              })("perfTime")))((function($_1_649_15139){
                return {$0:Empty_7,$1:$_1_649_15139,$tag:1}
              })({$0:n_6407_13004,$tag:1}))))(we_6413_13010)
            };
            return $phi$1107
          }
        };
        var $phi$1108 = ((((((Module_596(m_6436.$0))(m_6436.$1))((map(function(i_6414_13000_15146){
          if((i_6414_13000_15146.$tag==1)&&("./builtins.js"==i_6414_13000_15146.$1)){
            var $_2_718_15152 = (push({$0:"perfTime",$1:"perfTime"}))(i_6414_13000_15146.$2);
            var $phi$1109 = {$0:i_6414_13000_15146.$0,$1:"./builtins.js",$2:$_2_718_15152,$tag:1}
          } else var $phi$1109 = i_6414_13000_15146;
          return $phi$1109
        }))(m_6436.$2)))(m_6436.$3))(m_6436.$4))(m_6436.$5))((map(function(d_6401_13011_15155){
          if(d_6401_13011_15155.$1.$tag==3){
            var $_1_87_15162 = (instrumentExpr_6399_12998(d_6401_13011_15155.$0))({$0:d_6401_13011_15155.$1.$0,$1:d_6401_13011_15155.$1.$1,$2:d_6401_13011_15155.$1.$2,$tag:3});
            var $phi$1110 = {$0:d_6401_13011_15155.$0,$1:$_1_87_15162}
          } else var $phi$1110 = d_6401_13011_15155;
          return $phi$1110
        }))(m_6436.$6));
        var $phi$1105 = $phi$1106($phi$1108)
      } else error("pattern match fail",profile_6435);
      return $phi$1105
    }
  }
};
var main_6347 = function(argv_6437){
  var argv_4385_15167 = (slice(2))(argv_6437);
  var $phi$1121 = ((foldl(function(r_4387_10569_15168){
    return function(arg_4388_10570_15169){
      var $phi$1115 = $instance$Eq$1.$0;
      var $phi$1116 = $instance$Eq$1.$0;
      var $phi$1117 = ($and(($phi$1115((getChar(0))(arg_4388_10570_15169)))("-")))(($phi$1116((getChar(1))(arg_4388_10570_15169)))("-"));
      if(!$phi$1117){
        var $_0_86_15188 = (push(arg_4388_10570_15169))(r_4387_10569_15168.$0);
        var $phi$1114 = (function($_1_87_15189){
          return {$0:$_0_86_15188,$1:$_1_87_15189}
        })(r_4387_10569_15168.$1)
      } else if($phi$1117){
        var value_4392_10573_15176 = (drop(1))((match("=.*"))(arg_4388_10570_15169));
        var name_4391_10574_15177 = (match("[^=]+"))((drop(2))(arg_4388_10570_15169));
        var $phi$1120 = ((contains_28($instance$Eq$1))(name_4391_10574_15177))((map(function(a_4379_10579_15178){
          if(a_4379_10579_15178.$tag==0){
            var $phi$1119 = a_4379_10579_15178.$0
          } else if(a_4379_10579_15178.$tag==1){
            var $phi$1119 = a_4379_10579_15178.$0
          } else error("pattern match fail",a_4379_10579_15178);
          return $phi$1119
        }))(argDefs_6341));
        if(!$phi$1120){
          var $phi$1118 = error(($concat("unrecognized argument "))(arg_4388_10570_15169))
        } else if($phi$1120){
          var $_1_87_15191 = ((set(name_4391_10574_15177))(value_4392_10573_15176))(r_4387_10569_15168.$1);
          var $phi$1118 = {$0:r_4387_10569_15168.$0,$1:$_1_87_15191}
        } else error("pattern match fail",$phi$1120);
        var $phi$1114 = $phi$1118
      } else error("pattern match fail",$phi$1117);
      var $phi$1113 = $phi$1114;
      return $phi$1113
    }
  }))({$0:[],$1:empty}))(argv_4385_15167);
  var $phi$1112 = {$0:$phi$1121.$0,$1:$phi$1121.$1,$2:argDefs_6341};
  var args_6438 = $phi$1112;
  var $phi$1122 = args_6438.$0;
  var srcFiles_6442 = $phi$1122;
  var builtinsPath_6439 = (getString_4370(args_6438))(builtinsPathArg_6337);
  var e_6394_13024 = loadJSExports(builtinsPath_6439);
  var bs_6395_13025 = (mapRecord(function(s_6396_13026){
    var $phi$1124 = (parseType_5933(s_6396_13026))("");
    if($phi$1124.$tag==0){
      var $phi$1123 = $phi$1124.$0
    } else var $phi$1123 = error($phi$1124);
    return (evalState_55(newCtx_2797))((generalize_2831(emptyEnv_2807))($phi$1123))
  }))(e_6394_13024);
  var baseExports_6444 = ((set("./builtins.js"))({$0:bs_6395_13025,$1:[],$2:[]}))(empty);
  var mainName_6441 = ($concat("//"))((getString_4370(args_6438))(mainArg_6339));
  var $phi$1127 = ((contains_28($instance$Eq$0))(profileArg_6340))(args_6438.$2);
  if(!$phi$1127){
    var $phi$1126 = error("unrecognized arg that was not present for parsing")
  } else if($phi$1127){
    if(profileArg_6340.$tag==0){
      var $phi$1130 = (has(profileArg_6340.$0))(args_6438.$1);
      if(!$phi$1130){
        if(profileArg_6340.$1.$tag==0){
          var $phi$1133 = profileArg_6340.$1.$0
        } else if(profileArg_6340.$1.$tag==1){
          var $phi$1133 = error(($concat("no value for required arg "))(profileArg_6340.$0))
        } else error("pattern match fail",profileArg_6340.$1);
        var $phi$1129 = $phi$1133
      } else if($phi$1130){
        var $phi$1132 = (get(profileArg_6340.$0))(args_6438.$1);
        if(""==$phi$1132){
          var $phi$1131 = true
        } else if("True"==$phi$1132){
          var $phi$1131 = true
        } else if("true"==$phi$1132){
          var $phi$1131 = true
        } else if("1"==$phi$1132){
          var $phi$1131 = true
        } else if("False"==$phi$1132){
          var $phi$1131 = false
        } else if("false"==$phi$1132){
          var $phi$1131 = false
        } else if("0"==$phi$1132){
          var $phi$1131 = false
        } else var $phi$1131 = error(($concat("invalid value for a bool argument: "))($phi$1132));
        var $phi$1129 = $phi$1131
      } else error("pattern match fail",$phi$1130);
      var $phi$1128 = $phi$1129
    } else var $phi$1128 = error("arg is not a bool");
    var $phi$1126 = $phi$1128
  } else error("pattern match fail",$phi$1127);
  var $phi$1125 = $phi$1126;
  var profile_6443 = $phi$1125;
  var f_100_15212 = timed_1116("parse");
  var passes_6445 = (($gt$eq$gt_82($instance$Monad$11))((($gt$eq$gt_82($instance$Monad$11))((($gt$eq$gt_82($instance$Monad$11))((($gt$eq$gt_82($instance$Monad$11))((($gt$eq$gt_82($instance$Monad$11))((($gt$eq$gt_82($instance$Monad$11))((($gt$eq$gt_82($instance$Monad$11))((mapM_50($instance$Monad$11))((function(a_101_15213){
    return f_100_15212(a_101_15213)
  })((liftPass_6342($instance$Monad$11))(function(fn_6356_13031){
    var $phi$1135 = (parseModule_5930(readFile(fn_6356_13031)))(($concat("//"))(fn_6356_13031));
    if($phi$1135.$tag==0){
      var $phi$1137 = $instance$Eq$0.$0;
      var $phi$1138 = ($phi$1137($phi$1135.$1.$1))(length($phi$1135.$1.$0));
      if($phi$1138){
        var $phi$1136 = $phi$1135.$0
      } else if(!$phi$1138){
        var $phi$1136 = error(($concat("failed to parse all tokens, stopped at "))(jsonStringify((getIx($phi$1135.$1.$1))($phi$1135.$1.$0))))
      } else error("pattern match fail",$phi$1138);
      var $phi$1134 = $phi$1136
    } else var $phi$1134 = error($phi$1135);
    return $phi$1134
  })))))((timed_1116("dep-sort"))((liftPass_6342($instance$Monad$11))(function(ms_6365_13042){
    var modules_6366_13043 = ((foldl(function(r_6369_13046){
      return function(m_6370_13047){
        return ((set(moduleFile_6330(m_6370_13047)))(m_6370_13047))(r_6369_13046)
      }
    }))(empty))(ms_6365_13042);
    var imports_6367_13044 = (mapRecord(function(m_6372_13049){
      var $phi$1139 = (map(function(i_6374_13051_15214){
        if(i_6374_13051_15214.$tag==2){
          var $phi$1140 = i_6374_13051_15214.$1
        } else if(i_6374_13051_15214.$tag==1){
          var $phi$1140 = i_6374_13051_15214.$1
        } else if(i_6374_13051_15214.$tag==0){
          var $phi$1140 = i_6374_13051_15214.$1
        } else error("pattern match fail",i_6374_13051_15214);
        return $phi$1140
      }))(m_6372_13049.$2);
      return $phi$1139
    }))(modules_6366_13043);
    var ordered_6368_13045 = ((dfs_2570(imports_6367_13044))([]))(mainName_6441);
    var a_101_15224 = (map(function(n_6371_13048){
      return (get(n_6371_13048))(modules_6366_13043)
    }))(ordered_6368_13045);
    return reverse_46(a_101_15224)
  })))))((mapM_50($instance$Monad$11))((($gt$eq$gt_82($instance$Monad$11))((($gt$eq$gt_82($instance$Monad$11))((($gt$eq$gt_82($instance$Monad$11))((($gt$eq$gt_82($instance$Monad$11))((timed_1116("translate-adts"))((liftPass_6342($instance$Monad$11))(function(m_1317_15226){
    var $phi$1141 = ((((((Module_596(m_1317_15226.$0))(m_1317_15226.$1))(m_1317_15226.$2))([]))(m_1317_15226.$4))(m_1317_15226.$5))((concat((concatMap_38(function(d_1325_7281_15234){
      var $_0_702_15254 = Empty_7;
      var dt_1330_7286_15239 = ((foldl(function(r_1332_7288_15241){
        return function(v_1333_7289_15242){
          var $_0_706_15249 = Empty_7;
          var $_0_704_15252 = Empty_7;
          return ((function($_1_707_15250){
            return function($_2_708_15251){
              return {$0:Empty_7,$1:$_1_707_15250,$2:$_2_708_15251,$tag:2}
            }
          })(r_1332_7288_15241))((function($_1_705_15253){
            return {$0:Empty_7,$1:$_1_705_15253,$tag:1}
          })(v_1333_7289_15242))
        }
      }))((function($_1_703_15255){
        return {$0:Empty_7,$1:$_1_703_15255,$tag:0}
      })(d_1325_7281_15234.$1)))(d_1325_7281_15234.$2);
      var $phi$1142 = (map(function(c_1334_7290_15243_15924){
        var $phi$1144 = length(d_1325_7281_15234.$3);
        if(1==$phi$1144){
          var $phi$1143 = Nothing_2
        } else {
          var $phi$1145 = c_1334_7290_15243_15924.$0;
          var $_0_85_15256_15927 = $phi$1145;
          var $phi$1143 = {$0:$_0_85_15256_15927,$tag:0}
        };
        var tag_1335_7291_15244_15925 = $phi$1143;
        var $phi$1147 = c_1334_7290_15243_15924.$1;
        var $phi$1146 = ((((mkConFun_1316(tag_1335_7291_15244_15925))(dt_1330_7286_15239))(d_1325_7281_15234.$2))($phi$1147.$1))($phi$1147.$2);
        return $phi$1146
      }))(zipWithIndex_36(d_1325_7281_15234.$3));
      return $phi$1142
    }))(m_1317_15226.$3)))(m_1317_15226.$6));
    return $phi$1141
  }))))((timed_1116("normalize-imports"))(function(m_6427_13067){
    var $phi$1148 = $instance$Monad$11.$1;
    return ($phi$1148(getExports_1109))(function(es_6428_13068){
      var $phi$1149 = $instance$Monad$11.$0;
      return $phi$1149((normalizeImports_3690(es_6428_13068))(m_6427_13067))
    })
  }))))((timed_1116("uniquify"))(function(m_1618_15263){
    var $phi$1150 = $instance$Monad$11.$1;
    return ($phi$1150(getUid_1111))(function(uid_1619_15267){
      var $phi$1151 = $instance$Monad$11.$1;
      return ($phi$1151(getExports_1109))(function(ex_1620_15271){
        var $phi$1153 = $instance$Monad$11.$1;
        var $phi$1152 = ($phi$1153((((foldM_49($instance$Monad$11))(function(er_1582_7720_15284){
          return function(i_1583_7721_15285){
            if((i_1583_7721_15285.$tag==1)&&("./builtins.js"==i_1583_7721_15285.$1)){
              var $phi$1163 = $instance$Monad$11.$0;
              var $_1_87_15365 = (push(i_1583_7721_15285))(er_1582_7720_15284.$1);
              var $phi$1155 = $phi$1163({$0:er_1582_7720_15284.$0,$1:$_1_87_15365})
            } else if(i_1583_7721_15285.$tag==1){
              var $phi$1156 = $instance$Monad$11.$1;
              var $phi$1155 = ($phi$1156((((foldM_49($instance$Monad$11))(function(er_1592_7730_15297_15937){
                return function(p_1593_7731_15298_15938){
                  var $phi$1159 = $instance$Monad$11.$1;
                  var $phi$1158 = ($phi$1159(newIdent_1506(p_1593_7731_15298_15938.$1)))(function(n_1598_7736_15306_15945){
                    var $phi$1160 = $instance$Monad$11.$0;
                    var $_0_86_15366_15948 = ((set(p_1593_7731_15298_15938.$1))(n_1598_7736_15306_15945))(er_1592_7730_15297_15937.$0);
                    return $phi$1160((function($_1_87_15367_15949){
                      return {$0:$_0_86_15366_15948,$1:$_1_87_15367_15949}
                    })((push({$0:p_1593_7731_15298_15938.$0,$1:n_1598_7736_15306_15945}))(er_1592_7730_15297_15937.$1)))
                  });
                  var $phi$1157 = $phi$1158;
                  return $phi$1157
                }
              }))({$0:er_1582_7720_15284.$0,$1:[]}))(i_1583_7721_15285.$2)))(function(ens_1599_7737_15313){
                var $phi$1162 = $instance$Monad$11.$0;
                var $_1_87_15373 = (push({$0:i_1583_7721_15285.$0,$1:i_1583_7721_15285.$1,$2:ens_1599_7737_15313.$1,$tag:1}))(er_1582_7720_15284.$1);
                var $phi$1161 = $phi$1162({$0:ens_1599_7737_15313.$0,$1:$_1_87_15373});
                return $phi$1161
              })
            } else error("pattern match fail",i_1583_7721_15285);
            var $phi$1154 = $phi$1155;
            return $phi$1154
          }
        }))({$0:empty,$1:[]}))(m_1618_15263.$2)))(function(eis_1611_7710_15319){
          var $phi$1165 = $instance$Monad$11.$1;
          var $phi$1164 = ($phi$1165((rewriteBindings_1509(eis_1611_7710_15319.$0))(m_1618_15263.$6)))(function(ebs_1614_7713_15325){
            var $phi$1167 = $instance$Monad$11.$1;
            var $phi$1166 = ($phi$1167(((mapM_50($instance$Monad$11))(function(i_1564_7762_15332){
              var $phi$1169 = $instance$Monad$11.$1;
              var $phi$1168 = ($phi$1169(((mapM_50($instance$Monad$11))(function(d_1569_7767_15340){
                var $phi$1171 = $instance$Monad$11.$1;
                var $phi$1170 = ($phi$1171((rewriteExpr_1507(ebs_1614_7713_15325.$0))(d_1569_7767_15340.$1)))(function(e_1572_7770_15346){
                  var $phi$1172 = $instance$Monad$11.$0;
                  return $phi$1172({$0:d_1569_7767_15340.$0,$1:e_1572_7770_15346})
                });
                return $phi$1170
              }))(i_1564_7762_15332.$3)))(function(bs_1573_7771_15350){
                var $phi$1173 = $instance$Monad$11.$0;
                return $phi$1173({$0:i_1564_7762_15332.$0,$1:i_1564_7762_15332.$1,$2:i_1564_7762_15332.$2,$3:bs_1573_7771_15350})
              });
              return $phi$1168
            }))(m_1618_15263.$5)))(function(ins_1617_7716_15354){
              var $phi$1174 = $instance$Monad$11.$0;
              return $phi$1174(((((((Module_596(m_1618_15263.$0))(m_1618_15263.$1))(eis_1611_7710_15319.$1))(m_1618_15263.$3))(m_1618_15263.$4))(ins_1617_7716_15354))(ebs_1614_7713_15325.$1))
            });
            return $phi$1166
          });
          return $phi$1164
        });
        var m_236_15362 = $phi$1152;
        var $phi$1175 = m_236_15362.$0(uid_1619_15267);
        var r_1621_15272 = $phi$1175;
        var $phi$1176 = r_1621_15272.$0;
        var $phi$1177 = $instance$Monad$11.$0;
        var $phi$1178 = r_1621_15272.$1;
        return (($gt$gt_17($instance$Monad$11))(setUid_1112($phi$1176)))($phi$1177($phi$1178))
      })
    })
  }))))((timed_1116("typer"))(function(m_6429_13075){
    var $phi$1179 = $instance$Monad$11.$1;
    return ($phi$1179(getExports_1109))(function(es_6430_13076){
      var typed_6431_13077 = (inferTypeModule_2839(es_6430_13076))(m_6429_13075);
      var e_6432_13078 = getTypedExports_2840(typed_6431_13077);
      var $phi$1180 = $instance$Monad$11.$0;
      return (($gt$gt_17($instance$Monad$11))(setExports_1110(((set(moduleFile_6330(m_6429_13075)))(e_6432_13078))(es_6430_13076))))($phi$1180(typed_6431_13077))
    })
  }))))((timed_1116("declasser"))(function(m_6433_13085){
    var $phi$1181 = $instance$Monad$11.$1;
    return ($phi$1181(getExports_1109))(function(es_6434_13086){
      var $phi$1182 = $instance$Monad$11.$0;
      return $phi$1182((declassModule_3900(es_6434_13086))(m_6433_13085))
    })
  }))))))((timed_1116("merge-modules"))((liftPass_6342($instance$Monad$11))(function(ms_2439_15391){
    return (evalState_55(Empty_7))((((foldM_49($instance$Monad$11))(function(a_2446_8454_15392){
      return function(b_2447_8455_15393){
        var $phi$1184 = $instance$Monad$11.$1;
        var $phi$1183 = ($phi$1184(((mapM_50($instance$Monad$11))(function(b_2441_8485_15405){
          var $phi$1187 = (((getAnn_613($instance$Hashable$13))($instance$Eq$1))("export"))(annOf_626(b_2441_8485_15405.$1));
          if($phi$1187.$tag==1){
            var $phi$1190 = $instance$Monad$11.$0;
            var $phi$1186 = $phi$1190(b_2441_8485_15405)
          } else if(($phi$1187.$tag==0)&&($phi$1187.$0.$tag==5)){
            var $phi$1188 = $instance$Monad$11.$1;
            var $phi$1186 = ($phi$1188(gets_52))(function(ns_2445_8489_15415){
              var s_233_16186 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(($concat(($concat(a_2446_8454_15392.$1))("#")))($phi$1187.$0.$0)))(b_2441_8485_15405.$0))(ns_2445_8489_15415);
              var $phi$1189 = $instance$Monad$11.$0;
              var $_1_87_15458 = (withAnn_627((((remove_63($instance$Hashable$13))($instance$Eq$1))("export"))(annOf_626(b_2441_8485_15405.$1))))(b_2441_8485_15405.$1);
              return (($gt$gt_17($instance$Monad$11))({$0:function(__234_13179_16187){
                return {$0:s_233_16186,$1:Unit_0}
              }}))($phi$1189({$0:b_2441_8485_15405.$0,$1:$_1_87_15458}))
            })
          } else error("pattern match fail",$phi$1187);
          var $phi$1185 = $phi$1186;
          return $phi$1185
        }))(a_2446_8454_15392.$6)))(function(bs_2455_8463_15419){
          var $phi$1191 = $instance$Monad$11.$1;
          return ($phi$1191(gets_52))(function(ns_2456_8464_15423){
            var dataAnns_2457_8465_15424 = ((foldl(function(r_2459_8469_15428_15954){
              return function(b_2460_8470_15429_15955){
                var $phi$1194 = (((getAnn_613($instance$Hashable$13))($instance$Eq$1))("data"))(annOf_626(b_2460_8470_15429_15955.$1));
                if($phi$1194.$tag==1){
                  var $phi$1193 = r_2459_8469_15428_15954
                } else if($phi$1194.$tag==0){
                  var $phi$1193 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(b_2460_8470_15429_15955.$0))(((((setAnn_614($instance$Hashable$13))($instance$Eq$1))("data"))($phi$1194.$0))(Empty_7)))(r_2459_8469_15428_15954)
                } else error("pattern match fail",$phi$1194);
                var $phi$1192 = $phi$1193;
                return $phi$1192
              }
            }))(Empty_7))(bs_2455_8463_15419);
            var $phi$1196 = $instance$Monad$11.$0;
            var $phi$1195 = $phi$1196(((((((Module_596(a_2446_8454_15392.$0))(b_2447_8455_15393.$1))(a_2446_8454_15392.$2))([]))([]))([]))((concat(bs_2455_8463_15419))((concat((concatMap_38(function(i_2473_8507_15445){
              if((i_2473_8507_15445.$tag==1)&&("./builtins.js"==i_2473_8507_15445.$1)){
                var $phi$1197 = []
              } else if(i_2473_8507_15445.$tag==1){
                var $phi$1197 = (map(function(p_2480_8514_15452_15959){
                  var $phi$1200 = (((lookup_60($instance$Hashable$13))($instance$Eq$1))(($concat(($concat(i_2473_8507_15445.$1))("#")))(p_2480_8514_15452_15959.$0)))(ns_2456_8464_15423);
                  if($phi$1200.$tag==0){
                    var d_117_15465_15967 = Empty_7;
                    var f_100_15463_15966 = function(m_118_15466_15968){
                      if(m_118_15466_15968.$tag==0){
                        var $phi$1201 = m_118_15466_15968.$0
                      } else if(m_118_15466_15968.$tag==1){
                        var $phi$1201 = Empty_7
                      } else error("pattern match fail",m_118_15466_15968);
                      return $phi$1201
                    };
                    var $_0_646_15461_15965 = (function(a_101_15464_15970){
                      return f_100_15463_15966(a_101_15464_15970)
                    })((((lookup_60($instance$Hashable$13))($instance$Eq$1))($phi$1200.$0))(dataAnns_2457_8465_15424));
                    var $_1_87_15460_15964 = (function($_1_647_15462_15971){
                      return {$0:$_0_646_15461_15965,$1:$_1_647_15462_15971,$tag:0}
                    })($phi$1200.$0);
                    var $phi$1199 = {$0:p_2480_8514_15452_15959.$1,$1:$_1_87_15460_15964}
                  } else if($phi$1200.$tag==1){
                    var $phi$1199 = error(($concat(($concat(($concat("mod merger encountered unknown import "))(i_2473_8507_15445.$1)))("#")))(p_2480_8514_15452_15959.$0))
                  } else error("pattern match fail",$phi$1200);
                  var $phi$1198 = $phi$1199;
                  return $phi$1198
                }))((filter(function(p_2484_8518_15456){
                  var $phi$1202 = p_2484_8518_15456.$0;
                  var $phi$1203 = p_2484_8518_15456.$1;
                  return (($div$eq_13($instance$Eq$1))($phi$1202))($phi$1203)
                }))(i_2473_8507_15445.$2))
              } else error("pattern match fail",i_2473_8507_15445);
              return $phi$1197
            }))(b_2447_8455_15393.$2)))(b_2447_8455_15393.$6))));
            return $phi$1195
          })
        });
        return $phi$1183
      }
    }))(head_40(ms_2439_15391)))(tail_41(ms_2439_15391)))
  })))))((timed_1116("opt"))(function(m_2059_15474){
    var $phi$1204 = $instance$Monad$11.$1;
    return ($phi$1204(getUid_1111))(function(uid_2060_15478){
      var m_236_15543 = (((loopPasses_2049($instance$Monad$11))(10))(function(bs_2142_8233_15492){
        var bs2_2143_8234_15493 = (mapBindings_2047(function(e_2147_8238_15497){
          var a_101_15546 = annWithUseCount_2046(e_2147_8238_15497);
          var $phi$1206 = a_101_15546.$1;
          return $phi$1206
        }))(bs_2142_8233_15492);
        var useCount_2144_8235_15494 = ((foldl((mergeCount_2045($instance$Hashable$13))($instance$Eq$1)))(Empty_7))((map(function(b_2148_8239_15498){
          var $phi$1207 = b_2148_8239_15498.$1;
          return getCount_2044($phi$1207)
        }))(bs2_2143_8234_15493));
        var bs3_2145_8236_15495 = (mapBindings_2047(function(e_2154_8243_15499){
          var p_127_15559 = (((downAndUp_630(function(a_2164_8253_15509_15989){
            return function(e_2165_8254_15510_15990){
              if(e_2165_8254_15510_15990.$tag==5){
                var useCount_2160_8249_15505_15997 = ((foldl((mergeCount_2045($instance$Hashable$13))($instance$Eq$1)))(getCount_2044(e_2165_8254_15510_15990.$2)))((map(function(b_2162_8251_15507_15999){
                  var $phi$1209 = b_2162_8251_15507_15999.$1;
                  return getCount_2044($phi$1209)
                }))(e_2165_8254_15510_15990.$1));
                var bs2_2161_8250_15506_15998 = (dropDeadBindings_2058(useCount_2160_8249_15505_15997))(e_2165_8254_15510_15990.$1);
                var $phi$1208 = {$0:e_2165_8254_15510_15990.$0,$1:bs2_2161_8250_15506_15998,$2:e_2165_8254_15510_15990.$2,$tag:5}
              } else var $phi$1208 = e_2165_8254_15510_15990;
              var $_1_87_15566_15992 = $phi$1208;
              return {$0:a_2164_8253_15509_15989,$1:$_1_87_15566_15992}
            }
          }))(function($_0_86_15563){
            return function($_1_87_15564){
              return {$0:$_0_86_15563,$1:$_1_87_15564}
            }
          }))(Unit_0))(e_2154_8243_15499);
          var $phi$1210 = p_127_15559.$1;
          return $phi$1210
        }))((dropDeadBindings_2058(useCount_2144_8235_15494))(bs2_2143_8234_15493));
        var always_2146_8237_15496 = (chooseForInlining_2055(Empty_7))(bs3_2145_8236_15495);
        var $phi$1211 = $instance$Monad$11.$1;
        return ($phi$1211(((mapBindingsM_2048($instance$Monad$11))(function(n_2149_8240_15514){
          return function(e_2150_8241_15515){
            return (inlineCode_2057((((remove_63($instance$Hashable$13))($instance$Eq$1))(n_2149_8240_15514))(always_2146_8237_15496)))(e_2150_8241_15515)
          }
        }))(bs3_2145_8236_15495)))(function(bs_2151_8242_15516){
          var $phi$1212 = $instance$Monad$11.$0;
          return $phi$1212((mapBindings_2047(function(e_2224_8261_15520){
            var p_127_15579 = (((downAndUp_630(function(a_2236_8273_15534_16030){
              return function(e_2237_8274_15535_16031){
                if((e_2237_8274_15535_16031.$tag==2)&&(e_2237_8274_15535_16031.$1.$tag==3)){
                  if(e_2237_8274_15535_16031.$2.$tag==0){
                    var $phi$1216 = $instance$Eq$1.$0;
                    var $phi$1217 = ($phi$1216(e_2237_8274_15535_16031.$1.$1))(e_2237_8274_15535_16031.$2.$1);
                    if($phi$1217){
                      var $phi$1215 = e_2237_8274_15535_16031.$1.$2
                    } else if(!$phi$1217){
                      var $phi$1215 = {$0:e_2237_8274_15535_16031.$0,$1:[{$0:e_2237_8274_15535_16031.$1.$1,$1:{$0:e_2237_8274_15535_16031.$2.$0,$1:e_2237_8274_15535_16031.$2.$1,$tag:0}}],$2:e_2237_8274_15535_16031.$1.$2,$tag:5}
                    } else error("pattern match fail",$phi$1217);
                    var $phi$1214 = $phi$1215
                  } else var $phi$1214 = {$0:e_2237_8274_15535_16031.$0,$1:[{$0:e_2237_8274_15535_16031.$1.$1,$1:e_2237_8274_15535_16031.$2}],$2:e_2237_8274_15535_16031.$1.$2,$tag:5};
                  var $phi$1213 = $phi$1214
                } else var $phi$1213 = e_2237_8274_15535_16031;
                var $_1_87_15586_16033 = $phi$1213;
                return {$0:a_2236_8273_15534_16030,$1:$_1_87_15586_16033}
              }
            }))(function($_0_86_15583){
              return function($_1_87_15584){
                return {$0:$_0_86_15583,$1:$_1_87_15584}
              }
            }))(Unit_0))(e_2224_8261_15520);
            var $phi$1218 = p_127_15579.$1;
            return $phi$1218
          }))(bs_2151_8242_15516))
        })
      }))(m_2059_15474.$6);
      var $phi$1219 = m_236_15543.$0(uid_2060_15478);
      var r_2068_15486 = $phi$1219;
      var $phi$1220 = r_2068_15486.$1;
      var bs2_2069_15487 = $phi$1220;
      var bs3_2071_15488 = (mapBindings_2047(function(e_2074_15536){
        var a_101_15591 = annWithUseCount_2046(e_2074_15536);
        var $phi$1221 = a_101_15591.$1;
        return $phi$1221
      }))(bs2_2069_15487);
      var $phi$1222 = r_2068_15486.$0;
      var uid2_2070_15491 = $phi$1222;
      var $phi$1223 = $instance$Monad$11.$0;
      var $phi$1205 = (($gt$gt_17($instance$Monad$11))(setUid_1112(uid2_2070_15491)))($phi$1223(((((((Module_596(m_2059_15474.$0))(m_2059_15474.$1))(m_2059_15474.$2))(m_2059_15474.$3))(m_2059_15474.$4))(m_2059_15474.$5))(bs3_2071_15488)));
      return $phi$1205
    })
  }))))((timed_1116("instrument"))(function(m_6436_13095){
    if(!profile_6443){
      var $phi$1230 = $instance$Monad$11.$0;
      var $phi$1224 = $phi$1230(m_6436_13095)
    } else if(profile_6443){
      var $phi$1225 = $instance$Monad$11.$0;
      var instrumentExpr_6399_13104 = function(n_6407_13110){
        return function(e_6408_13111){
          if(e_6408_13111.$tag==3){
            var $_2_655_15608 = (instrumentExpr_6399_13104(n_6407_13110))(e_6408_13111.$2);
            var $phi$1226 = {$0:e_6408_13111.$0,$1:e_6408_13111.$1,$2:$_2_655_15608,$tag:3}
          } else {
            var $_0_653_15609 = Empty_7;
            var we_6413_13116 = ((function($_1_654_15610){
              return function($_2_655_15611){
                return {$0:Empty_7,$1:$_1_654_15610,$2:$_2_655_15611,$tag:3}
              }
            })("$unused$"))(e_6408_13111);
            var $_0_650_15612 = Empty_7;
            var $_0_650_15615 = Empty_7;
            var $_0_646_15618 = Empty_7;
            var $_0_648_15620 = Empty_7;
            var $phi$1226 = ((function($_1_651_15613){
              return function($_2_652_15614){
                return {$0:Empty_7,$1:$_1_651_15613,$2:$_2_652_15614,$tag:2}
              }
            })(((function($_1_651_15616){
              return function($_2_652_15617){
                return {$0:Empty_7,$1:$_1_651_15616,$2:$_2_652_15617,$tag:2}
              }
            })((function($_1_647_15619){
              return {$0:Empty_7,$1:$_1_647_15619,$tag:0}
            })("perfTime")))((function($_1_649_15621){
              return {$0:Empty_7,$1:$_1_649_15621,$tag:1}
            })({$0:n_6407_13110,$tag:1}))))(we_6413_13116)
          };
          return $phi$1226
        }
      };
      var $phi$1227 = ((((((Module_596(m_6436_13095.$0))(m_6436_13095.$1))((map(function(i_6414_13106_15628){
        if((i_6414_13106_15628.$tag==1)&&("./builtins.js"==i_6414_13106_15628.$1)){
          var $_2_718_15634 = (push({$0:"perfTime",$1:"perfTime"}))(i_6414_13106_15628.$2);
          var $phi$1228 = {$0:i_6414_13106_15628.$0,$1:"./builtins.js",$2:$_2_718_15634,$tag:1}
        } else var $phi$1228 = i_6414_13106_15628;
        return $phi$1228
      }))(m_6436_13095.$2)))(m_6436_13095.$3))(m_6436_13095.$4))(m_6436_13095.$5))((map(function(d_6401_13117_15637){
        if(d_6401_13117_15637.$1.$tag==3){
          var $_1_87_15644 = (instrumentExpr_6399_13104(d_6401_13117_15637.$0))({$0:d_6401_13117_15637.$1.$0,$1:d_6401_13117_15637.$1.$1,$2:d_6401_13117_15637.$1.$2,$tag:3});
          var $phi$1229 = {$0:d_6401_13117_15637.$0,$1:$_1_87_15644}
        } else var $phi$1229 = d_6401_13117_15637;
        return $phi$1229
      }))(m_6436_13095.$6));
      var $phi$1224 = $phi$1225($phi$1227)
    } else error("pattern match fail",profile_6443);
    return $phi$1224
  }))))((timed_1116("generate-js"))((liftPass_6342($instance$Monad$11))(function(m_5357_15649){
    var requireFun_5360_15650 = ($concat(($concat(($concat(($concat(($concat("var cache = {}\n"))("function _require(f) {\n")))("  return cache[f] || require(f == \"./builtins.js\" ? process.cwd() + \"/\" + \"")))(builtinsPath_6439)))("\" : f);\n")))("}\n");
    var vs2_5245_15660 = (filter(function(p_5254_11163_15665){
      var m_122_15699 = (((getAnn_613($instance$Hashable$13))($instance$Eq$1))("dead"))(annOf_626(p_5254_11163_15665.$1));
      if(m_122_15699.$tag==0){
        var $phi$1233 = true
      } else if(m_122_15699.$tag==1){
        var $phi$1233 = false
      } else error("pattern match fail",m_122_15699);
      var b_144_15698 = $phi$1233;
      if(b_144_15698){
        var $phi$1234 = false
      } else if(!b_144_15698){
        var $phi$1234 = true
      } else error("pattern match fail",b_144_15698);
      var $phi$1232 = $phi$1234;
      return $phi$1232
    }))(m_5357_15649.$6);
    var $_0_4462_15707 = (mapJust_39(function(b_5230_11168_15670_16065){
      var $phi$1237 = (((getAnn_613($instance$Hashable$13))($instance$Eq$1))("export"))(annOf_626(b_5230_11168_15670_16065.$1));
      if($phi$1237.$tag==1){
        var $phi$1236 = Nothing_2
      } else if(($phi$1237.$tag==0)&&($phi$1237.$0.$tag==5)){
        var $_0_86_15704_16070 = opName_5016($phi$1237.$0.$0);
        var $_0_4444_15706_16072 = opName_5016(b_5230_11168_15670_16065.$0);
        var $_0_85_15703_16069 = (function($_1_87_15705_16071){
          return {$0:$_0_86_15704_16070,$1:$_1_87_15705_16071}
        })({$0:$_0_4444_15706_16072,$tag:0});
        var $phi$1236 = {$0:$_0_85_15703_16069,$tag:0}
      } else error("pattern match fail",$phi$1237);
      var $phi$1235 = $phi$1236;
      return $phi$1235
    }))(vs2_5245_15660);
    var $_1_4472_15702 = {$0:$_0_4462_15707,$tag:10};
    var exportDef_5247_15661 = {$0:"exports",$1:$_1_4472_15702,$tag:2};
    var cons_5244_15662 = ((foldl(function(m_5248_11174_15676){
      return function(d_5249_11175_15677){
        var $phi$1240 = (((getAnn_613($instance$Hashable$13))($instance$Eq$1))("data"))(annOf_626(d_5249_11175_15677.$1));
        if($phi$1240.$tag==1){
          var $phi$1239 = m_5248_11174_15676
        } else if(($phi$1240.$tag==0)&&($phi$1240.$0.$tag==3)){
          var $phi$1239 = ((((insert_61($instance$Hashable$13))($instance$Eq$1))(d_5249_11175_15677.$0))($phi$1240.$0.$0))(m_5248_11174_15676)
        } else error("pattern match fail",$phi$1240);
        var $phi$1238 = $phi$1239;
        return $phi$1238
      }
    }))(Empty_7))(m_5357_15649.$6);
    var f_100_15708 = foldl1(concat);
    var $_1_5019_11180_15682 = Empty_7;
    var defs_5246_15663 = (function(a_101_15709){
      return f_100_15708(a_101_15709)
    })((evalState_55(((function($_2_5020_11181_15683){
      return function($_3_5021_11182_15684){
        return {$0:cons_5244_15662,$1:Empty_7,$2:$_2_5020_11181_15683,$3:$_3_5021_11182_15684}
      }
    })([]))(0)))(((mapM_50($instance$Monad$11))(function(v_5257_15685){
      var $_0_4471_15710 = opName_5016(v_5257_15685.$0);
      var $phi$1241 = (rewriteExprToStmts_5002(function($_1_4472_15711){
        return {$0:$_0_4471_15710,$1:$_1_4472_15711,$tag:2}
      }))(v_5257_15685.$1);
      return $phi$1241
    }))(vs2_5245_15660)));
    var imports_5242_15664 = (concatMap_38(function(i_5222_11183_15688){
      if(i_5222_11183_15688.$tag==1){
        var $phi$1242 = (map(function(n_5219_11189_15694){
          var $_0_4471_15712 = opName_5016(n_5219_11189_15694.$1);
          var $_0_4460_15720 = opName_5016(n_5219_11189_15694.$0);
          var $_1_4446_15715 = {$0:$_0_4460_15720,$tag:8};
          var $phi$1243 = (function($_1_4472_15713){
            return {$0:$_0_4471_15712,$1:$_1_4472_15713,$tag:2}
          })({$0:{$0:{$0:"_require",$tag:0},$1:[{$0:i_5222_11183_15688.$1,$tag:8}],$tag:4},$1:$_1_4446_15715,$tag:1});
          return $phi$1243
        }))(i_5222_11183_15688.$2)
      } else error("pattern match fail",i_5222_11183_15688);
      return $phi$1242
    }))(m_5357_15649.$2);
    var $phi$1231 = (push(exportDef_5247_15661))((concat(imports_5242_15664))(defs_5246_15663));
    var xs_183_16060 = (map(jsStmtToString_4751(0)))((concatMap_38(rewriteStmt_4591))($phi$1231));
    var js_5358_15651 = (function(s_184_16061){
      var $phi$1245 = length(xs_183_16060);
      if(0==$phi$1245){
        var $phi$1244 = ""
      } else var $phi$1244 = (foldl1(function(a_186_16063){
        return function(b_187_16064){
          return ($concat(($concat(a_186_16063))(s_184_16061)))(b_187_16064)
        }
      }))(xs_183_16060);
      return $phi$1244
    })(";\n");
    return ($concat(($concat(requireFun_5360_15650))(($concat(($concat("(function() {"))(js_5358_15651)))("\nmodule.exports = exports;})();"))))("if (module.exports.main)module.exports.main(process.argv)")
  })))))(function(i_1156_15721){
    var $phi$1246 = $instance$Monad$11.$1;
    return ($phi$1246(gets_52))(function(s_1157_15725){
      var $phi$1248 = $instance$Monad$11.$0;
      var $phi$1247 = $phi$1248(((foldTrie_66(function(i_1162_7101_15732){
        return function(n_1163_7102_15733){
          return function(ts_1164_7103_15734){
            var count_1165_7104_15735 = length(ts_1164_7103_15734);
            var total_1166_7105_15736 = ((foldl($add))(0))(ts_1164_7103_15734);
            var msg_1167_7106_15737 = ($concat(($concat(($concat(($concat(($concat(($concat("# pass <"))(n_1163_7102_15733)))("> executed ")))(intToString(count_1165_7104_15735))))(" times, total runtime ")))(intToString(total_1166_7105_15736))))("ms");
            var $_0_86_6510_16076 = debug(msg_1167_7106_15737);
            var p_127_6507_16075 = (function($_1_87_6511_16077){
              return {$0:$_0_86_6510_16076,$1:$_1_87_6511_16077}
            })(i_1162_7101_15732);
            var $phi$1249 = p_127_6507_16075.$1;
            return $phi$1249
          }
        }
      }))(i_1156_15721))(s_1157_15725.$2));
      return $phi$1247
    })
  });
  var $_2_1120_15740 = Empty_7;
  var js_6446 = (evalState_55({$0:baseExports_6444,$1:0,$2:Empty_7}))(passes_6445(srcFiles_6442));
  var outPath_6440 = (getString_4370(args_6438))(outPathArg_6338);
  return (writeFile(js_6446))(outPath_6440)
};
var exports = {outPathArg:outPathArg_6338,mainArg:mainArg_6339,profileArg:profileArg_6340,builtinsPathArg:builtinsPathArg_6337,argDefs:argDefs_6341,liftPass:liftPass_6342,normalizeImportsPass:normalizeImportsPass_6343,moduleFile:moduleFile_6330,typerPass:typerPass_6344,declasserPass:declasserPass_6345,parse:parse_6331,findImports:findImports_6333,depSort:depSort_6332,parseT:parseT_6334,parseExports:parseExports_6335,instrument:instrument_6336,instrumentPass:instrumentPass_6346,main:main_6347}
module.exports = exports;})();if (module.exports.main)module.exports.main(process.argv)