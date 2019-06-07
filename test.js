import {test} from "tap";
import {allObjectP} from "./";
import {allP} from "./";
import {always} from "./";
import {append} from "./";
import {appendM} from "./";
import {applicator} from "./";
import {applicators} from "./";
import {arrayify} from "./";
import {aside} from "./";
import {attach} from "./";
import {catchP} from "./";
import {compact} from "./";
import {compose} from "./";
import {computedProp} from "./";
import {couple} from "./";
import {dig} from "./";
import {domEvents} from "./";
import {domEventsMany} from "./";
import {dropFirst} from "./";
import {dropLast} from "./";
import {endsWith} from "./";
import {equals} from "./";
import {everyP} from "./";
import {exceptKey} from "./";
import {first} from "./";
import {flatten} from "./";
import {flattenTree} from "./";
import {flip} from "./";
import {forEach} from "./";
import {fresh} from "./";
import {fromArrayToObject} from "./";
import {fromFunctorToPairs} from "./";
import {fromIteratorToArray} from "./";
import {get} from "./";
import {getMany} from "./";
import {greaterThan} from "./";
import {groupBy} from "./";
import {hammer} from "./";
import {ifThenElse} from "./";
import {indexBy} from "./";
import {inflateTree} from "./";
import {initial} from "./";
import {isArray} from "./";
import {isEnumerable} from "./";
import {isNil} from "./";
import {isObject} from "./";
import {isPopulated} from "./";
import {isPresent} from "./";
import {isType} from "./";
import {itself} from "./";
import {keys} from "./";
import {keyChainTree} from "./";
import {lacksText} from "./";
import {last} from "./";
import {length} from "./";
import {lessThan} from "./";
import {mapKeys} from "./";
import {mapKeysWithValueKey} from "./";
import {mapValues} from "./";
import {mapValuesWithValueKey} from "./";
import {mergeAllLeft} from "./";
import {mergeAllRight} from "./";
import {mergeDeepLeft} from "./";
import {mergeDeepRight} from "./";
import {mergeLeft} from "./";
import {mergeRight} from "./";
import {mergeWith} from "./";
import {mergeWithKey} from "./";
import {nestedApply} from "./";
import {objectFrom} from "./";
import {of} from "./";
import {optimisticP} from "./";
import {pairsKeys} from "./";
import {pairsValues} from "./";
import {partition} from "./";
import {pipe} from "./";
import {pluck} from "./";
import {plucks} from "./";
import {prepend} from "./";
import {range} from "./";
import {reduceKeys} from "./";
import {reduceValues} from "./";
import {reduceWithValueKey} from "./";
import {rejectByValue} from "./";
import {rejectP} from "./";
import {remaining} from "./";
import {replaceWhen} from "./";
import {resolveP} from "./";
import {reversal} from "./";
import {reverse} from "./";
import {sample} from "./";
import {sampleSize} from "./";
import {selectByValue} from "./";
import {sequence} from "./";
import {shuffle} from "./";
import {splat} from "./";
import {split} from "./";
import {startsWith} from "./";
import {streamSatisfies} from "./";
import {supertype} from "./";
import {takeFirst} from "./";
import {takeLast} from "./";
import {thenCatchP} from "./";
import {thenP} from "./";
import {thrush} from "./";
import {treeify} from "./";
import {type} from "./";
import {upTo} from "./";
import {values} from "./";
import {where} from "./";
import {withoutKeyRecursive} from "./";
import {zip} from "./";

test("allObjectP is a function", ({type: assertType, end}) => {
  assertType(allObjectP, Function);
  end();
});

test("allP is a function", ({type: assertType, end}) => {
  assertType(allP, Function);
  end();
});

test("always is a function", ({type: assertType, end}) => {
  assertType(always, Function);
  end();
});

test("append is a function", ({type: assertType, end}) => {
  assertType(append, Function);
  end();
});

test("appendM is a function", ({type: assertType, end}) => {
  assertType(appendM, Function);
  end();
});

test("applicator is a function", ({type: assertType, end}) => {
  assertType(applicator, Function);
  end();
});

test("applicators is a function", ({type: assertType, end}) => {
  assertType(applicators, Function);
  end();
});

test("arrayify is a function", ({type: assertType, end}) => {
  assertType(arrayify, Function);
  end();
});

test("aside is a function", ({type: assertType, end}) => {
  assertType(aside, Function);
  end();
});

test("attach is a function", ({type: assertType, end}) => {
  assertType(attach, Function);
  end();
});

test("catchP is a function", ({type: assertType, end}) => {
  assertType(catchP, Function);
  end();
});

test("compact is a function", ({type: assertType, end}) => {
  assertType(compact, Function);
  end();
});

test("compose is a function", ({type: assertType, end}) => {
  assertType(compose, Function);
  end();
});

test("computedProp is a function", ({type: assertType, end}) => {
  assertType(computedProp, Function);
  end();
});

test("couple is a function", ({type: assertType, end}) => {
  assertType(couple, Function);
  end();
});

test("dig is a function", ({type: assertType, end}) => {
  assertType(dig, Function);
  end();
});

test("domEvents is a function", ({type: assertType, end}) => {
  assertType(domEvents, Function);
  end();
});

test("domEventsMany is a function", ({type: assertType, end}) => {
  assertType(domEventsMany, Function);
  end();
});

test("dropFirst is a function", ({type: assertType, end}) => {
  assertType(dropFirst, Function);
  end();
});

test("dropLast is a function", ({type: assertType, end}) => {
  assertType(dropLast, Function);
  end();
});

test("endsWith is a function", ({type: assertType, end}) => {
  assertType(endsWith, Function);
  end();
});

test("equals is a function", ({type: assertType, end}) => {
  assertType(equals, Function);
  end();
});

test("everyP is a function", ({type: assertType, end}) => {
  assertType(everyP, Function);
  end();
});

test("exceptKey is a function", ({type: assertType, end}) => {
  assertType(exceptKey, Function);
  end();
});

test("first is a function", ({type: assertType, end}) => {
  assertType(first, Function);
  end();
});

test("flatten is a function", ({type: assertType, end}) => {
  assertType(flatten, Function);
  end();
});

test("flattenTree is a function", ({type: assertType, end}) => {
  assertType(flattenTree, Function);
  end();
});

test("flip is a function", ({type: assertType, end}) => {
  assertType(flip, Function);
  end();
});

test("forEach is a function", ({type: assertType, end}) => {
  assertType(forEach, Function);
  end();
});

test("fresh is a function", ({type: assertType, end}) => {
  assertType(fresh, Function);
  end();
});

test("fromArrayToObject is a function", ({type: assertType, end}) => {
  assertType(fromArrayToObject, Function);
  end();
});

test("fromFunctorToPairs is a function", ({type: assertType, end}) => {
  assertType(fromFunctorToPairs, Function);
  end();
});

test("fromIteratorToArray is a function", ({type: assertType, end}) => {
  assertType(fromIteratorToArray, Function);
  end();
});

test("get is a function", ({type: assertType, end}) => {
  assertType(get, Function);
  end();
});

test("getMany is a function", ({type: assertType, end}) => {
  assertType(getMany, Function);
  end();
});

test("greaterThan is a function", ({type: assertType, end}) => {
  assertType(greaterThan, Function);
  end();
});

test("groupBy is a function", ({type: assertType, end}) => {
  assertType(groupBy, Function);
  end();
});

test("hammer is a function", ({type: assertType, end}) => {
  assertType(hammer, Function);
  end();
});

test("ifThenElse is a function", ({type: assertType, end}) => {
  assertType(ifThenElse, Function);
  end();
});

test("indexBy is a function", ({type: assertType, end}) => {
  assertType(indexBy, Function);
  end();
});

test("inflateTree is a function", ({type: assertType, end}) => {
  assertType(inflateTree, Function);
  end();
});

test("initial is a function", ({type: assertType, end}) => {
  assertType(initial, Function);
  end();
});

test("isArray is a function", ({type: assertType, end}) => {
  assertType(isArray, Function);
  end();
});

test("isEnumerable is a function", ({type: assertType, end}) => {
  assertType(isEnumerable, Function);
  end();
});

test("isNil is a function", ({type: assertType, end}) => {
  assertType(isNil, Function);
  end();
});

test("isObject is a function", ({type: assertType, end}) => {
  assertType(isObject, Function);
  end();
});

test("isPopulated is a function", ({type: assertType, end}) => {
  assertType(isPopulated, Function);
  end();
});

test("isPresent is a function", ({type: assertType, end}) => {
  assertType(isPresent, Function);
  end();
});

test("isType is a function", ({type: assertType, end}) => {
  assertType(isType, Function);
  end();
});

test("itself is a function", ({type: assertType, end}) => {
  assertType(itself, Function);
  end();
});

test("keys is a function", ({type: assertType, end}) => {
  assertType(keys, Function);
  end();
});

test("keyChainTree is a function", ({type: assertType, end}) => {
  assertType(keyChainTree, Function);
  end();
});

test("lacksText is a function", ({type: assertType, end}) => {
  assertType(lacksText, Function);
  end();
});

test("last is a function", ({type: assertType, end}) => {
  assertType(last, Function);
  end();
});

test("length is a function", ({type: assertType, end}) => {
  assertType(length, Function);
  end();
});

test("lessThan is a function", ({type: assertType, end}) => {
  assertType(lessThan, Function);
  end();
});

test("mapKeys is a function", ({type: assertType, end}) => {
  assertType(mapKeys, Function);
  end();
});

test("mapKeysWithValueKey is a function", ({type: assertType, end}) => {
  assertType(mapKeysWithValueKey, Function);
  end();
});

test("mapValues is a function", ({type: assertType, end}) => {
  assertType(mapValues, Function);
  end();
});

test("mapValuesWithValueKey is a function", ({type: assertType, end}) => {
  assertType(mapValuesWithValueKey, Function);
  end();
});

test("mergeAllLeft is a function", ({type: assertType, end}) => {
  assertType(mergeAllLeft, Function);
  end();
});

test("mergeAllRight is a function", ({type: assertType, end}) => {
  assertType(mergeAllRight, Function);
  end();
});

test("mergeDeepLeft is a function", ({type: assertType, end}) => {
  assertType(mergeDeepLeft, Function);
  end();
});

test("mergeDeepRight is a function", ({type: assertType, end}) => {
  assertType(mergeDeepRight, Function);
  end();
});

test("mergeLeft is a function", ({type: assertType, end}) => {
  assertType(mergeLeft, Function);
  end();
});

test("mergeRight is a function", ({type: assertType, end}) => {
  assertType(mergeRight, Function);
  end();
});

test("mergeWith is a function", ({type: assertType, end}) => {
  assertType(mergeWith, Function);
  end();
});

test("mergeWithKey is a function", ({type: assertType, end}) => {
  assertType(mergeWithKey, Function);
  end();
});

test("nestedApply is a function", ({type: assertType, end}) => {
  assertType(nestedApply, Function);
  end();
});

test("objectFrom is a function", ({type: assertType, end}) => {
  assertType(objectFrom, Function);
  end();
});

test("of is a function", ({type: assertType, end}) => {
  assertType(of, Function);
  end();
});

test("optimisticP is a function", ({type: assertType, end}) => {
  assertType(optimisticP, Function);
  end();
});

test("pairsKeys is a function", ({type: assertType, end}) => {
  assertType(pairsKeys, Function);
  end();
});

test("pairsValues is a function", ({type: assertType, end}) => {
  assertType(pairsValues, Function);
  end();
});

test("partition is a function", ({type: assertType, end}) => {
  assertType(partition, Function);
  end();
});

test("pipe is a function", ({type: assertType, end}) => {
  assertType(pipe, Function);
  end();
});

test("pluck is a function", ({type: assertType, end}) => {
  assertType(pluck, Function);
  end();
});

test("plucks is a function", ({type: assertType, end}) => {
  assertType(plucks, Function);
  end();
});

test("prepend is a function", ({type: assertType, end}) => {
  assertType(prepend, Function);
  end();
});

test("range is a function", ({type: assertType, end}) => {
  assertType(range, Function);
  end();
});

test("reduceKeys is a function", ({type: assertType, end}) => {
  assertType(reduceKeys, Function);
  end();
});

test("reduceValues is a function", ({type: assertType, end}) => {
  assertType(reduceValues, Function);
  end();
});

test("reduceWithValueKey is a function", ({type: assertType, end}) => {
  assertType(reduceWithValueKey, Function);
  end();
});

test("rejectByValue is a function", ({type: assertType, end}) => {
  assertType(rejectByValue, Function);
  end();
});

test("rejectP is a function", ({type: assertType, end}) => {
  assertType(rejectP, Function);
  end();
});

test("remaining is a function", ({type: assertType, end}) => {
  assertType(remaining, Function);
  end();
});

test("replaceWhen is a function", ({type: assertType, end}) => {
  assertType(replaceWhen, Function);
  end();
});

test("resolveP is a function", ({type: assertType, end}) => {
  assertType(resolveP, Function);
  end();
});

test("reversal is a function", ({type: assertType, end}) => {
  assertType(reversal, Function);
  end();
});

test("reverse is a function", ({type: assertType, end}) => {
  assertType(reverse, Function);
  end();
});

test("sample is a function", ({type: assertType, end}) => {
  assertType(sample, Function);
  end();
});

test("sampleSize is a function", ({type: assertType, end}) => {
  assertType(sampleSize, Function);
  end();
});

test("selectByValue is a function", ({type: assertType, end}) => {
  assertType(selectByValue, Function);
  end();
});

test("sequence is a function", ({type: assertType, end}) => {
  assertType(sequence, Function);
  end();
});

test("shuffle is a function", ({type: assertType, end}) => {
  assertType(shuffle, Function);
  end();
});

test("splat is a function", ({type: assertType, end}) => {
  assertType(splat, Function);
  end();
});

test("split is a function", ({type: assertType, end}) => {
  assertType(split, Function);
  end();
});

test("startsWith is a function", ({type: assertType, end}) => {
  assertType(startsWith, Function);
  end();
});

test("streamSatisfies is a function", ({type: assertType, end}) => {
  assertType(streamSatisfies, Function);
  end();
});

test("supertype is a function", ({type: assertType, end}) => {
  assertType(supertype, Function);
  end();
});

test("takeFirst is a function", ({type: assertType, end}) => {
  assertType(takeFirst, Function);
  end();
});

test("takeLast is a function", ({type: assertType, end}) => {
  assertType(takeLast, Function);
  end();
});

test("thenCatchP is a function", ({type: assertType, end}) => {
  assertType(thenCatchP, Function);
  end();
});

test("thenP is a function", ({type: assertType, end}) => {
  assertType(thenP, Function);
  end();
});

test("thrush is a function", ({type: assertType, end}) => {
  assertType(thrush, Function);
  end();
});

test("treeify is a function", ({type: assertType, end}) => {
  assertType(treeify, Function);
  end();
});

test("type is a function", ({type: assertType, end}) => {
  assertType(type, Function);
  end();
});

test("upTo is a function", ({type: assertType, end}) => {
  assertType(upTo, Function);
  end();
});

test("values is a function", ({type: assertType, end}) => {
  assertType(values, Function);
  end();
});

test("where is a function", ({type: assertType, end}) => {
  assertType(where, Function);
  end();
});

test("withoutKeyRecursive is a function", ({type: assertType, end}) => {
  assertType(withoutKeyRecursive, Function);
  end();
});

test("zip is a function", ({type: assertType, end}) => {
  assertType(zip, Function);
  end();
});
