import {allObjectP} from "./index";
import {allP} from "./index";
import {always} from "./index";
import {append} from "./index";
import {appendM} from "./index";
import {applicator} from "./index";
import {applicators} from "./index";
import {arrayify} from "./index";
import {aside} from "./index";
import {attach} from "./index";
import {catchP} from "./index";
import {compact} from "./index";
import {compose} from "./index";
import {computedProp} from "./index";
import {couple} from "./index";
import {dig} from "./index";
import {domEvents} from "./index";
import {domEventsMany} from "./index";
import {dropFirst} from "./index";
import {dropLast} from "./index";
import {endsWith} from "./index";
import {equals} from "./index";
import {everyP} from "./index";
import {exceptKey} from "./index";
import {first} from "./index";
import {flatten} from "./index";
import {flattenTree} from "./index";
import {flip} from "./index";
import {forEach} from "./index";
import {fresh} from "./index";
import {fromArrayToObject} from "./index";
import {fromFunctorToPairs} from "./index";
import {fromIteratorToArray} from "./index";
import {get} from "./index";
import {getMany} from "./index";
import {greaterThan} from "./index";
import {groupBy} from "./index";
import {hammer} from "./index";
import {ifThenElse} from "./index";
import {indexBy} from "./index";
import {inflateTree} from "./index";
import {initial} from "./index";
import {isArray} from "./index";
import {isEnumerable} from "./index";
import {isNil} from "./index";
import {isObject} from "./index";
import {isPopulated} from "./index";
import {isPresent} from "./index";
import {isType} from "./index";
import {itself} from "./index";
import {keyChainTree} from "./index";
import {keys} from "./index";
import {lacksText} from "./index";
import {last} from "./index";
import {length} from "./index";
import {lessThan} from "./index";
import {mapKeys} from "./index";
import {mapKeysWithValueKey} from "./index";
import {mapValues} from "./index";
import {mapValuesWithValueKey} from "./index";
import {mergeAllLeft} from "./index";
import {mergeAllRight} from "./index";
import {mergeDeepLeft} from "./index";
import {mergeDeepRight} from "./index";
import {mergeLeft} from "./index";
import {mergeRight} from "./index";
import {mergeWith} from "./index";
import {mergeWithKey} from "./index";
import {nestedApply} from "./index";
import {objectFrom} from "./index";
import {of} from "./index";
import {onlyKeys} from "./index";
import {optimisticP} from "./index";
import {pairsKeys} from "./index";
import {pairsValues} from "./index";
import {partition} from "./index";
import {pipe} from "./index";
import {pluck} from "./index";
import {plucks} from "./index";
import {prepend} from "./index";
import {range} from "./index";
import {reduceKeys} from "./index";
import {reduceValues} from "./index";
import {reduceWithValueKey} from "./index";
import {rejectByValue} from "./index";
import {rejectP} from "./index";
import {remaining} from "./index";
import {replaceWhen} from "./index";
import {resolveP} from "./index";
import {reversal} from "./index";
import {reverse} from "./index";
import {sample} from "./index";
import {sampleSize} from "./index";
import {selectByValue} from "./index";
import {sequence} from "./index";
import {shuffle} from "./index";
import {sortBy} from "./index";
import {splat} from "./index";
import {split} from "./index";
import {startsWith} from "./index";
import {streamSatisfies} from "./index";
import {supertype} from "./index";
import {takeFirst} from "./index";
import {takeLast} from "./index";
import {thenCatchP} from "./index";
import {thenP} from "./index";
import {thrush} from "./index";
import {treeify} from "./index";
import {type} from "./index";
import {upTo} from "./index";
import {values} from "./index";
import {where} from "./index";
import {withoutKeyRecursive} from "./index";
import {withoutKeys} from "./index";
import {zip} from "./index";
import {matchesRegExp} from "./index";

test("allObjectP is a function", () => expect(allObjectP).toBeInstanceOf(Function));

test("allP is a function", () => expect(allP).toBeInstanceOf(Function));

test("always is a function", () => expect(always).toBeInstanceOf(Function));

test("append is a function", () => expect(append).toBeInstanceOf(Function));

test("appendM is a function", () => expect(appendM).toBeInstanceOf(Function));

test("applicator is a function", () => expect(applicator).toBeInstanceOf(Function));

test("applicators is a function", () => expect(applicators).toBeInstanceOf(Function));

test("arrayify is a function", () => expect(arrayify).toBeInstanceOf(Function));

test("aside is a function", () => expect(aside).toBeInstanceOf(Function));

test("attach is a function", () => expect(attach).toBeInstanceOf(Function));

test("catchP is a function", () => expect(catchP).toBeInstanceOf(Function));

test("compact is a function", () => expect(compact).toBeInstanceOf(Function));

test("compose is a function", () => expect(compose).toBeInstanceOf(Function));

test("computedProp is a function", () => expect(computedProp).toBeInstanceOf(Function));

test("couple is a function", () => expect(couple).toBeInstanceOf(Function));

test("dig is a function", () => expect(dig).toBeInstanceOf(Function));

test("domEvents is a function", () => expect(domEvents).toBeInstanceOf(Function));

test("domEventsMany is a function", () => expect(domEventsMany).toBeInstanceOf(Function));

test("dropFirst is a function", () => expect(dropFirst).toBeInstanceOf(Function));

test("dropLast is a function", () => expect(dropLast).toBeInstanceOf(Function));

test("endsWith is a function", () => expect(endsWith).toBeInstanceOf(Function));

test("equals is a function", () => expect(equals).toBeInstanceOf(Function));

test("everyP is a function", () => expect(everyP).toBeInstanceOf(Function));

test("exceptKey is a function", () => expect(exceptKey).toBeInstanceOf(Function));

test("first is a function", () => expect(first).toBeInstanceOf(Function));

test("flatten is a function", () => expect(flatten).toBeInstanceOf(Function));

test("flattenTree is a function", () => expect(flattenTree).toBeInstanceOf(Function));

test("flip is a function", () => expect(flip).toBeInstanceOf(Function));

test("forEach is a function", () => expect(forEach).toBeInstanceOf(Function));

test("fresh is a function", () => expect(fresh).toBeInstanceOf(Function));

test("fromArrayToObject is a function", () => expect(fromArrayToObject).toBeInstanceOf(Function));

test("fromFunctorToPairs is a function", () => expect(fromFunctorToPairs).toBeInstanceOf(Function));

test("fromIteratorToArray is a function", () => expect(fromIteratorToArray).toBeInstanceOf(Function));

test("get is a function", () => expect(get).toBeInstanceOf(Function));

test("getMany is a function", () => expect(getMany).toBeInstanceOf(Function));

test("greaterThan is a function", () => expect(greaterThan).toBeInstanceOf(Function));

test("groupBy is a function", () => expect(groupBy).toBeInstanceOf(Function));

test("hammer is a function", () => expect(hammer).toBeInstanceOf(Function));

test("ifThenElse is a function", () => expect(ifThenElse).toBeInstanceOf(Function));

test("indexBy is a function", () => expect(indexBy).toBeInstanceOf(Function));

test("inflateTree is a function", () => expect(inflateTree).toBeInstanceOf(Function));

test("initial is a function", () => expect(initial).toBeInstanceOf(Function));

test("isArray is a function", () => expect(isArray).toBeInstanceOf(Function));

test("isEnumerable is a function", () => expect(isEnumerable).toBeInstanceOf(Function));

test("isNil is a function", () => expect(isNil).toBeInstanceOf(Function));

test("isObject is a function", () => expect(isObject).toBeInstanceOf(Function));

test("isPopulated is a function", () => expect(isPopulated).toBeInstanceOf(Function));

test("isPresent is a function", () => expect(isPresent).toBeInstanceOf(Function));

test("isType is a function", () => expect(isType).toBeInstanceOf(Function));

test("itself is a function", () => expect(itself).toBeInstanceOf(Function));

test("keyChainTree is a function", () => expect(keyChainTree).toBeInstanceOf(Function));

test("keys is a function", () => expect(keys).toBeInstanceOf(Function));

test("lacksText is a function", () => expect(lacksText).toBeInstanceOf(Function));

test("last is a function", () => expect(last).toBeInstanceOf(Function));

test("length is a function", () => expect(length).toBeInstanceOf(Function));

test("lessThan is a function", () => expect(lessThan).toBeInstanceOf(Function));

test("mapKeys is a function", () => expect(mapKeys).toBeInstanceOf(Function));

test("mapKeysWithValueKey is a function", () => expect(mapKeysWithValueKey).toBeInstanceOf(Function));

test("mapValues is a function", () => expect(mapValues).toBeInstanceOf(Function));

test("mapValuesWithValueKey is a function", () => expect(mapValuesWithValueKey).toBeInstanceOf(Function));

test("mergeAllLeft is a function", () => expect(mergeAllLeft).toBeInstanceOf(Function));

test("mergeAllRight is a function", () => expect(mergeAllRight).toBeInstanceOf(Function));

test("mergeDeepLeft is a function", () => expect(mergeDeepLeft).toBeInstanceOf(Function));

test("mergeDeepRight is a function", () => expect(mergeDeepRight).toBeInstanceOf(Function));

test("mergeLeft is a function", () => expect(mergeLeft).toBeInstanceOf(Function));

test("mergeRight is a function", () => expect(mergeRight).toBeInstanceOf(Function));

test("mergeWith is a function", () => expect(mergeWith).toBeInstanceOf(Function));

test("mergeWithKey is a function", () => expect(mergeWithKey).toBeInstanceOf(Function));

test("nestedApply is a function", () => expect(nestedApply).toBeInstanceOf(Function));

test("objectFrom is a function", () => expect(objectFrom).toBeInstanceOf(Function));

test("of is a function", () => expect(of).toBeInstanceOf(Function));

test("onlyKeys is a function", () => expect(onlyKeys).toBeInstanceOf(Function));

test("optimisticP is a function", () => expect(optimisticP).toBeInstanceOf(Function));

test("pairsKeys is a function", () => expect(pairsKeys).toBeInstanceOf(Function));

test("pairsValues is a function", () => expect(pairsValues).toBeInstanceOf(Function));

test("partition is a function", () => expect(partition).toBeInstanceOf(Function));

test("pipe is a function", () => expect(pipe).toBeInstanceOf(Function));

test("pluck is a function", () => expect(pluck).toBeInstanceOf(Function));

test("plucks is a function", () => expect(plucks).toBeInstanceOf(Function));

test("prepend is a function", () => expect(prepend).toBeInstanceOf(Function));

test("range is a function", () => expect(range).toBeInstanceOf(Function));

test("reduceKeys is a function", () => expect(reduceKeys).toBeInstanceOf(Function));

test("reduceValues is a function", () => expect(reduceValues).toBeInstanceOf(Function));

test("reduceWithValueKey is a function", () => expect(reduceWithValueKey).toBeInstanceOf(Function));

test("rejectByValue is a function", () => expect(rejectByValue).toBeInstanceOf(Function));

test("rejectP is a function", () => expect(rejectP).toBeInstanceOf(Function));

test("remaining is a function", () => expect(remaining).toBeInstanceOf(Function));

test("replaceWhen is a function", () => expect(replaceWhen).toBeInstanceOf(Function));

test("resolveP is a function", () => expect(resolveP).toBeInstanceOf(Function));

test("reversal is a function", () => expect(reversal).toBeInstanceOf(Function));

test("reverse is a function", () => expect(reverse).toBeInstanceOf(Function));

test("sample is a function", () => expect(sample).toBeInstanceOf(Function));

test("sampleSize is a function", () => expect(sampleSize).toBeInstanceOf(Function));

test("selectByValue is a function", () => expect(selectByValue).toBeInstanceOf(Function));

test("sequence is a function", () => expect(sequence).toBeInstanceOf(Function));

test("shuffle is a function", () => expect(shuffle).toBeInstanceOf(Function));

test("sortBy is a function", () => expect(sortBy).toBeInstanceOf(Function));

test("splat is a function", () => expect(splat).toBeInstanceOf(Function));

test("split is a function", () => expect(split).toBeInstanceOf(Function));

test("startsWith is a function", () => expect(startsWith).toBeInstanceOf(Function));

test("streamSatisfies is a function", () => expect(streamSatisfies).toBeInstanceOf(Function));

test("supertype is a function", () => expect(supertype).toBeInstanceOf(Function));

test("takeFirst is a function", () => expect(takeFirst).toBeInstanceOf(Function));

test("takeLast is a function", () => expect(takeLast).toBeInstanceOf(Function));

test("thenCatchP is a function", () => expect(thenCatchP).toBeInstanceOf(Function));

test("thenP is a function", () => expect(thenP).toBeInstanceOf(Function));

test("thrush is a function", () => expect(thrush).toBeInstanceOf(Function));

test("treeify is a function", () => expect(treeify).toBeInstanceOf(Function));

test("type is a function", () => expect(type).toBeInstanceOf(Function));

test("upTo is a function", () => expect(upTo).toBeInstanceOf(Function));

test("values is a function", () => expect(values).toBeInstanceOf(Function));

test("where is a function", () => expect(where).toBeInstanceOf(Function));

test("withoutKeyRecursive is a function", () => expect(withoutKeyRecursive).toBeInstanceOf(Function));

test("withoutKeys is a function", () => expect(withoutKeys).toBeInstanceOf(Function));

test("zip is a function", () => expect(zip).toBeInstanceOf(Function));

test("matchesRegExp is a function", () => expect(matchesRegExp).toBeInstanceOf(Function));
