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
import {keyChainTree} from "./";
import {keys} from "./";
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
import {onlyKeys} from "./";
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
import {sortBy} from "./";
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
import {withoutKeys} from "./";
import {zip} from "./";

test("allObjectP is a function", () => {
  assertType(allObjectP, Function);
});

test("allP is a function", () => {
  assertType(allP, Function);
});

test("always is a function", () => {
  assertType(always, Function);
});

test("append is a function", () => {
  assertType(append, Function);
});

test("appendM is a function", () => {
  assertType(appendM, Function);
});

test("applicator is a function", () => {
  assertType(applicator, Function);
});

test("applicators is a function", () => {
  assertType(applicators, Function);
});

test("arrayify is a function", () => {
  assertType(arrayify, Function);
});

test("aside is a function", () => {
  assertType(aside, Function);
});

test("attach is a function", () => {
  assertType(attach, Function);
});

test("catchP is a function", () => {
  assertType(catchP, Function);
});

test("compact is a function", () => {
  assertType(compact, Function);
});

test("compose is a function", () => {
  assertType(compose, Function);
});

test("computedProp is a function", () => {
  assertType(computedProp, Function);
});

test("couple is a function", () => {
  assertType(couple, Function);
});

test("dig is a function", () => {
  assertType(dig, Function);
});

test("domEvents is a function", () => {
  assertType(domEvents, Function);
});

test("domEventsMany is a function", () => {
  assertType(domEventsMany, Function);
});

test("dropFirst is a function", () => {
  assertType(dropFirst, Function);
});

test("dropLast is a function", () => {
  assertType(dropLast, Function);
});

test("endsWith is a function", () => {
  assertType(endsWith, Function);
});

test("equals is a function", () => {
  assertType(equals, Function);
});

test("everyP is a function", () => {
  assertType(everyP, Function);
});

test("exceptKey is a function", () => {
  assertType(exceptKey, Function);
});

test("first is a function", () => {
  assertType(first, Function);
});

test("flatten is a function", () => {
  assertType(flatten, Function);
});

test("flattenTree is a function", () => {
  assertType(flattenTree, Function);
});

test("flip is a function", () => {
  assertType(flip, Function);
});

test("forEach is a function", () => {
  assertType(forEach, Function);
});

test("fresh is a function", () => {
  assertType(fresh, Function);
});

test("fromArrayToObject is a function", () => {
  assertType(fromArrayToObject, Function);
});

test("fromFunctorToPairs is a function", () => {
  assertType(fromFunctorToPairs, Function);
});

test("fromIteratorToArray is a function", () => {
  assertType(fromIteratorToArray, Function);
});

test("get is a function", () => {
  assertType(get, Function);
});

test("getMany is a function", () => {
  assertType(getMany, Function);
});

test("greaterThan is a function", () => {
  assertType(greaterThan, Function);
});

test("groupBy is a function", () => {
  assertType(groupBy, Function);
});

test("hammer is a function", () => {
  assertType(hammer, Function);
});

test("ifThenElse is a function", () => {
  assertType(ifThenElse, Function);
});

test("indexBy is a function", () => {
  assertType(indexBy, Function);
});

test("inflateTree is a function", () => {
  assertType(inflateTree, Function);
});

test("initial is a function", () => {
  assertType(initial, Function);
});

test("isArray is a function", () => {
  assertType(isArray, Function);
});

test("isEnumerable is a function", () => {
  assertType(isEnumerable, Function);
});

test("isNil is a function", () => {
  assertType(isNil, Function);
});

test("isObject is a function", () => {
  assertType(isObject, Function);
});

test("isPopulated is a function", () => {
  assertType(isPopulated, Function);
});

test("isPresent is a function", () => {
  assertType(isPresent, Function);
});

test("isType is a function", () => {
  assertType(isType, Function);
});

test("itself is a function", () => {
  assertType(itself, Function);
});

test("keyChainTree is a function", () => {
  assertType(keyChainTree, Function);
});

test("keys is a function", () => {
  assertType(keys, Function);
});

test("lacksText is a function", () => {
  assertType(lacksText, Function);
});

test("last is a function", () => {
  assertType(last, Function);
});

test("length is a function", () => {
  assertType(length, Function);
});

test("lessThan is a function", () => {
  assertType(lessThan, Function);
});

test("mapKeys is a function", () => {
  assertType(mapKeys, Function);
});

test("mapKeysWithValueKey is a function", () => {
  assertType(mapKeysWithValueKey, Function);
});

test("mapValues is a function", () => {
  assertType(mapValues, Function);
});

test("mapValuesWithValueKey is a function", () => {
  assertType(mapValuesWithValueKey, Function);
});

test("mergeAllLeft is a function", () => {
  assertType(mergeAllLeft, Function);
});

test("mergeAllRight is a function", () => {
  assertType(mergeAllRight, Function);
});

test("mergeDeepLeft is a function", () => {
  assertType(mergeDeepLeft, Function);
});

test("mergeDeepRight is a function", () => {
  assertType(mergeDeepRight, Function);
});

test("mergeLeft is a function", () => {
  assertType(mergeLeft, Function);
});

test("mergeRight is a function", () => {
  assertType(mergeRight, Function);
});

test("mergeWith is a function", () => {
  assertType(mergeWith, Function);
});

test("mergeWithKey is a function", () => {
  assertType(mergeWithKey, Function);
});

test("nestedApply is a function", () => {
  assertType(nestedApply, Function);
});

test("objectFrom is a function", () => {
  assertType(objectFrom, Function);
});

test("of is a function", () => {
  assertType(of, Function);
});

test("onlyKeys is a function", () => {
  assertType(onlyKeys, Function);
});

test("optimisticP is a function", () => {
  assertType(optimisticP, Function);
});

test("pairsKeys is a function", () => {
  assertType(pairsKeys, Function);
});

test("pairsValues is a function", () => {
  assertType(pairsValues, Function);
});

test("partition is a function", () => {
  assertType(partition, Function);
});

test("pipe is a function", () => {
  assertType(pipe, Function);
});

test("pluck is a function", () => {
  assertType(pluck, Function);
});

test("plucks is a function", () => {
  assertType(plucks, Function);
});

test("prepend is a function", () => {
  assertType(prepend, Function);
});

test("range is a function", () => {
  assertType(range, Function);
});

test("reduceKeys is a function", () => {
  assertType(reduceKeys, Function);
});

test("reduceValues is a function", () => {
  assertType(reduceValues, Function);
});

test("reduceWithValueKey is a function", () => {
  assertType(reduceWithValueKey, Function);
});

test("rejectByValue is a function", () => {
  assertType(rejectByValue, Function);
});

test("rejectP is a function", () => {
  assertType(rejectP, Function);
});

test("remaining is a function", () => {
  assertType(remaining, Function);
});

test("replaceWhen is a function", () => {
  assertType(replaceWhen, Function);
});

test("resolveP is a function", () => {
  assertType(resolveP, Function);
});

test("reversal is a function", () => {
  assertType(reversal, Function);
});

test("reverse is a function", () => {
  assertType(reverse, Function);
});

test("sample is a function", () => {
  assertType(sample, Function);
});

test("sampleSize is a function", () => {
  assertType(sampleSize, Function);
});

test("selectByValue is a function", () => {
  assertType(selectByValue, Function);
});

test("sequence is a function", () => {
  assertType(sequence, Function);
});

test("shuffle is a function", () => {
  assertType(shuffle, Function);
});

test("sortBy is a function", () => {
  assertType(sortBy, Function);
});

test("splat is a function", () => {
  assertType(splat, Function);
});

test("split is a function", () => {
  assertType(split, Function);
});

test("startsWith is a function", () => {
  assertType(startsWith, Function);
});

test("streamSatisfies is a function", () => {
  assertType(streamSatisfies, Function);
});

test("supertype is a function", () => {
  assertType(supertype, Function);
});

test("takeFirst is a function", () => {
  assertType(takeFirst, Function);
});

test("takeLast is a function", () => {
  assertType(takeLast, Function);
});

test("thenCatchP is a function", () => {
  assertType(thenCatchP, Function);
});

test("thenP is a function", () => {
  assertType(thenP, Function);
});

test("thrush is a function", () => {
  assertType(thrush, Function);
});

test("treeify is a function", () => {
  assertType(treeify, Function);
});

test("type is a function", () => {
  assertType(type, Function);
});

test("upTo is a function", () => {
  assertType(upTo, Function);
});

test("values is a function", () => {
  assertType(values, Function);
});

test("where is a function", () => {
  assertType(where, Function);
});

test("withoutKeyRecursive is a function", () => {
  assertType(withoutKeyRecursive, Function);
});

test("withoutKeys is a function", () => {
  assertType(withoutKeys, Function);
});

test("zip is a function", () => {
  assertType(zip, Function);
});
