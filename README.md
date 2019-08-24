# unction.js

unction.js is a collection of many functions. THese functions are bound by a set of three principles that are detailed below.


## Raison d'exister

There are a few similar libraries out there and they all have good standing with the community, so why make unctionjs? Well the original package started off as ramda-extra, a set of functions in a package that ramda seemed to never want to implement (like at the time mapKeys). Then eventually I got to the point where I wanted to have functions be curried for clarity and found that many ramda functions don't fully support only currying. While ramda is amazing and I still use it to this day I knew I had to fork off and write my own path.

Here's a list of (I believe) fair reasons why I don't use these popular and *really good libraries*:

  - *ramda*: Ramda has all functions in a single package, it relies on internal private functions to ensure compatibility, does not have real type checking, prefers "autocurrying" which can lead to issues with curried functions, and finally as described above ramda has an interest in retaining a small surface layer.
  - *lodash*: Lodash only does curried as a second class citizen, doesn't have type checking, prefers "autocurrying" when it has support for it, and doesn't have a very clear picture about what some of the functions are polymorphic.

That said every unctionjs function will work with every ramda and lodash function where currying is allowed.


## Using unction libraries

You can install a package individually:

```
npm install --save @unction/treeify
```

``` javascript
import treeify from "@unction/treeify"
```

Or you can install the **complete** package:

``` bash
npm install --save @unction/complete
```

and import the function from package:

``` javascript
import {treeify} from "@unction/complete"
```


## Principle 1

**All functions are curried**. Due to the nature of functional programming it's exceedingly valuable to have functions that are, by default, curried. Here's an erxample:


``` javascript
// asStateTree.js
import treeify from "@unction/treeify"
import get from "@unction/get"
import dig from "@unction/dig"
import indexBy from "@unction/indexby"
import groupBy from "@unction/groupby"

export default treeify(
  [
    // Group by type
    groupBy(get("type")),
    // Index by id
    indexBy(get("id")),
  ]
)
```

We can use this function like so:

``` javascript
// resources.js
import asStateTree from "./asStateTree"

// Take resources from the HTTP API, turn it into a state tree
pipe([fetchResources, asStateTree])
```


## Principle 2

**All functions know how to deal with a finite set of primitives**. When using a unctionjs function you can be sure that we'll be able to handle all 6 enumerable types:

  - Array
  - Object
  - Set
  - Map
  - String
  - Stream (see: most.js)


## Principle 3

**All functions are pure by default**. No function will ever have any side-effects (unless otherwise noted with a `I` suffix like `shuffleI()`) and are referentially transparent.


## Principle 4

**All functions are immutable by default**. These functions do not mutate (unless otherwise noted with a `M` suffix like `appendM()`) the original values.


## Functions

### [allObjectP](https://github.com/unctionjs/allObjectP#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Record => Promise<Record>
```

This takes an object where the values are probably promises and returns a promise that has that same object but with the resolved values.

Here's a good example of this function in use:

``` javascript
function signUp (attributes, slug) {
  return function thunk (dispatch, getState, {client}) {
    return allObjectP({
      loading: startLoading(slug),
      session: pushSession(attributes, client)
    })
      .then(({session}) => {
        return allObjectP({
          merge: mergeResource(session),
          current: storeCurrent(session.id),
          account: pullAccount(session.relationship.account.data.id, client),
        })
      })
      .then(({account}) => {
        return {
          merge: mergeResource(account),
          current: storeCurrent(account.id),
        }
      })
      .then(() => stopLoading(slug))
      .then(() => dispatch({type: "signUp"}))
      .catch(logger.error.bind(error))
  }
}
```

If we use `allP` or `Promise.all` we're getting an array back, but that's annoying to destructure. The `allObjectP` function gives us the concurrency we want with a named interface for the returned resolutions.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/allObjectP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/allObjectP.svg?maxAge=2592000&style=flat-square

### [allP](https://github.com/unctionjs/allP#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array => Promise<Array>
```

A port of the `Promise.all()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/allP.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/allP.svg?maxAge=2592000&style=flat-square

### [always](https://github.com/unctionjs/always#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Value => (Value | void) => Value
```

Always returns the value given when called

``` javascript
always(1)() // 1
always(1)(0) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/always.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/always.svg?maxAge=2592000&style=flat-square

### [append](https://github.com/unctionjs/append#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
mixed => (Array | string) => (Array | string)
```

Takes a value and puts it at the end of the given list.


``` javascript
append(4)([5]) // => [5, 4]
append("c")("ab") // => "abc"
```

```
NOTE: While there is a type annotation in the README, this function cannot have type annotations due to a bug in flow.
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/append.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/append.svg?maxAge=2592000&style=flat-square

### [appendM](https://github.com/unctionjs/appendM#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Value => Array => Array
```

Takes an array and an item and returns the combination of both, appended.

NOTE: This mutates the array

``` javascript
const data = [1, 2, 3]

appendM(4)(data)
```

Would return:

``` javascript
[1, 2, 3, 4]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/appendM.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/appendM.svg?maxAge=2592000&style=flat-square

### [applicator](https://github.com/unctionjs/applicator#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
UnaryFunction => Value
```

Takes a function and a value and applies that function to that value.

``` javascript
applicator(inc)(1) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/applicator.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/applicator.svg?maxAge=2592000&style=flat-square

### [applicators](https://github.com/unctionjs/applicators#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Array<mixed => mixed> | Record<Key, mixed => mixed>)<T> => (Array | Record)<T> => (Array | Record)<T>
```

Takes a list of functions and a list of values and applies the values to the functions.

``` javascript
applicators([
  recordfrom(["point", "x"]),
  recordfrom(["point", "y"]),
  recordfrom(["point", "z"]),
])([
  40.453,
  2.2,
  423.0,
])
```

returns

``` javascript
[
  {point: {x: 40.453}},
  {point: {y: 2.2}},
  {point: {z: 423.0}},
]
```

``` javascript
applicators({
  x: inc,
  y: dec
})({
  x: -1,
  y: 1
})
```

returns

``` javascript
{
  x: 0,
  y: 0
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/applicators.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/applicators.svg?maxAge=2592000&style=flat-square

### [arrayify](https://github.com/unctionjs/arrayify#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Value => [Value] | Array
```

Takes a value and turns it into an array of that value, unless the value is already an array.

``` javascript
arrayify("a")
```

returns

``` javascript
["a"]
```

``` javascript
arrayify(["a"])
```

returns

``` javascript
["a"]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/arrayify.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/arrayify.svg?maxAge=2592000&style=flat-square

### [aside](https://github.com/unctionjs/aside#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<mixed => mixed> => mixed => mixed
```

Takes a stack of functions, like `pipe()`, but always returns the second argument.

``` javascript
pipe(
  aside([(value) => value.toLowerCase(), console.log]),
  processData
)(
  "Hello, world"
) // "Hello, world"
```

But also logs:

``` javascript
"hello, world"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/aside.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/aside.svg?maxAge=2592000&style=flat-square

### [attach](https://github.com/unctionjs/attach#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
ObjectKey => Value => Object => Object
```
```
MapKey => Value => Map => Map
```
```
ArrayKey => Value => Array => Array
```
```
null => Value => Set => Set
```
```
null => Value => Stream => Stream
```

A polymorphic way to attach a value to the key on a keyed functor. When dealing with a sorted list type and the key is larger than the list, it will append to the list. When the key is an index that already exists it will place the value at that index and shift remaining values to the right.

``` javascript
attach("hello")("world")({}) // => {hello: "world"}
attach(3)("x")([1, 2, 3]) // => [1, 2, 3, "x"]
attach(1)("x")([1, 2, 3]) // => [1, "x", 2, 3]
attach(null)("x")(new Set([1, 2, 3])) // => {1 2 3 "x"}
attach(10)("x")([]) // => ["x"]
attach(0)("a")("bc") // => "abc"
attach(null)("a")(xstream.of("b")) // => a---b--=>
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/attach.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/attach.svg?maxAge=2592000&style=flat-square

### [catchP](https://github.com/unctionjs/catchP#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
UnaryFunction => Promise => Promise
```

A port of the `Promise.prototype.catch()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/catchP.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/catchP.svg?maxAge=2592000&style=flat-square

### [compact](https://github.com/unctionjs/compact#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<Value | void> => Array
```

Takes a collection (Array or Object) and returns a copy of that value without `null` or `undefined` values.


``` javascript
avatarUrls // => [null, "/1.jpg", null, "/3.jpg"]
compact(avatarUrls)  // => ["/1.jpg", "/3.jpg"]

head(users) // {"avatar": null, "name": "Kurtis Rainbolt-Greene"}
compact(head(users)) // {"name": "Kurtis Rainbolt-Greene"}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/compact.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/compact.svg?maxAge=2592000&style=flat-square

### [compose](https://github.com/unctionjs/compose#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<mixed => mixed> => mixed => mixed
```

Takes a list of functions and runs a value through that stack from right to left.

``` javascript
compose([toInteger, toString])(0) // 0
compose([append("b"), append("a")])("c") // "cab"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/compose.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/compose.svg?maxAge=2592000&style=flat-square

### [computedProp](https://github.com/unctionjs/computedProp#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Functor => mixed) => KeyChain => Functor => Functor
```

Given an object this function will return that object but with a new property, where the value is computed. The computation is given the object you'll be copying.

``` javascript
const computer = ({id, attributes: {username}}) => `${username}#${id}`
const key = "tag"
const payload = {
  id: "1",
  attributes: {
    username: "krainboltgreene"
  }
}

computedProp(computer)(key)(payload)
```

Would return:

``` javascript
{
  id: "1",
  tag: "krainboltgreene#1",
  attributes: {
    username: "krainboltgreene"
  }
}
```

``` javascript
const multiKey = ["attributes", "tag"]

computedProp(computer)(key)(payload)
```

Would return:

``` javascript
{
  id: "1",
  attributes: {
    tag: "krainboltgreene#1",
    username: "krainboltgreene"
  }
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/computedProp.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/computedProp.svg?maxAge=2592000&style=flat-square

### [couple](https://github.com/unctionjs/couple#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
mixed => mixed => [mixed, mixed]
```

Takes any value and then any value and returns an array containing those values.

``` javascript
couple(4)(5) // => [4, 5]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/couple.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/couple.svg?maxAge=2592000&style=flat-square

### [dig](https://github.com/unctionjs/dig#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
KeyChain => Tree => Value
```

Takes a chain of keys and a tree, traversing down and reaching the last value. If any part of the chain is undefined or not an object the result will always be undefined.

``` javascript
dig(["aaa", "bbb", "ccc"])({aaa: {bbb: {ccc: "1"}}}) // "1"
dig(["aaa", "ddd", "ccc"])({aaa: {bbb: {ccc: "1"}}}) // undefined
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/dig.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/dig.svg?maxAge=2592000&style=flat-square

### [domEvents](https://github.com/unctionjs/domEvents#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
DOMEventsConfiguration => DOMEventName => DOMStream => DOMEventStream
```

Takes a configuration, an event name, and a DOM source and returns an observable of that event type

``` javascript
domEvents({})("click")(DOM)
```

returns

``` javascript
--click--click--click-=>
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/domEvents.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/domEvents.svg?maxAge=2592000&style=flat-square

### [domEventsMany](https://github.com/unctionjs/domEventsMany#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
DOMEventsManyConfiguration => Array<DOMEventName> => DOMEventStream
```

Takes many event names and returns an observable of those events.

``` javascript
domEventsMany({})(["click", "input"])(DOM)
```

returns

``` javascript
--click--input--input--click--input
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/domEventsMany.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/domEventsMany.svg?maxAge=2592000&style=flat-square

### [dropFirst](https://github.com/unctionjs/dropFirst#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
number => (Array | string) => (Array | string)
```

Returns all but the first N of a list of ordered values.

``` javascript
dropFirst(2)([1, 2, 3]) // [3]
dropFirst(1)([1, 2, 3]) // [2, 3]
dropFirst(2)("abc") // "c"
dropFirst(1)("abc") // "bc"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/dropFirst.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/dropFirst.svg?maxAge=2592000&style=flat-square

### [dropLast](https://github.com/unctionjs/dropLast#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
number => (Array | string) => (Array | string)
```

Returns all but the last N of a list of ordered values.

``` javascript
dropLast(2)([1, 2, 3]) // [1]
dropLast(1)([1, 2, 3]) // [1, 2]
dropLast(2)("abc") // "a"
dropLast(1)("abc") // "ab"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/dropLast.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/dropLast.svg?maxAge=2592000&style=flat-square

### [endsWith](https://github.com/unctionjs/endsWith#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
string => string => boolean
```

Determines if a given subset of text is at the end of another set of text.

``` javascript
endsWith("!")("Hello, world!") // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/endsWith.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/endsWith.svg?maxAge=2592000&style=flat-square

### [equals](https://github.com/unctionjs/equals#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
mixed => mixed => boolean
```

Compares two values and attempts to discern if they are truly equal.

``` javascript
equals(true)(true) // true
equals([1, 2, 3])([1, 2, 3]) // true
equals({aaa: "aaa", bbb: "bbb"})({aaa: "aaa", bbb: "bbb"}) // true
equals("abc")("abc") // true
equals(null)(null) // true
equals(undefined)(undefined) // true
equals(false)(true) // false
equals([1, 2, 3])([3, 2, 1]) // false
equals([1, 2, 3])([1]) // false
equals([1, 2, 3])([]) // false
equals({aaa: "aaa", bbb: "bbb"})({aaa: "aaa"}) // false
equals({aaa: "aaa", bbb: "bbb"})({}) // false
equals({aaa: "aaa", bbb: "bbb"})({aaa: "bbb", bbb: "ccc"}) // false
equals("abc")("bac") // false
equals(null)(undefined) // false
equals(undefined)(null) // false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/equals.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/equals.svg?maxAge=2592000&style=flat-square

### [everyP](https://github.com/unctionjs/everyP#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Array | Array<Promise>) => Promise<[ResolvedPromises, RejectedPromises]>
```

Returns both resolved and rejected promises as distinct lists.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/everyP.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/everyP.svg?maxAge=2592000&style=flat-square

### [exceptKey](https://github.com/unctionjs/exceptKey#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Key => KeyedFunctor => KeyedFunctor
```

Takes a key and a keyed functor, returning the keyed functor without the key given.

``` javascript
exceptKey(1)([1, 2, 3]) // [1, 3]
exceptKey(1)("abc") // "ac"
exceptKey("aaa")({aaa: "aaa", bbb: "bbb", ccc: "ccc"}) // {bbb: "bbb", ccc: "ccc"}
exceptKey("aaa")(new Map([["aaa", "aaa"], ["bbb", "bbb"], ["ccc", "ccc"]])) // new Map([["bbb", "bbb"], ["ccc", "ccc"]])
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/exceptKey.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/exceptKey.svg?maxAge=2592000&style=flat-square

### [first](https://github.com/unctionjs/first#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Array | string) => mixed
```

Returns the first item of an ordered list.

``` javascript
first([1, 2, 3]) // 1
first("abc") // "a"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/first.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/first.svg?maxAge=2592000&style=flat-square

### [flatten](https://github.com/unctionjs/flatten#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Functor => Functor
```

Takes a multi-dimensional functor and decreases the nesting by one.

``` javascript
import {from} from "most"

flatten([["a", "b"], ["c", "d"]]) // ["a", "b", "c", "d"]
flatten(["a", "b", ["c", "d"]]) // ["a", "b", "c", "d"]
flatten(
  from([
    from(["a", "b"]),
    from(["c", "d"]),
  ])
) // ---a---b---c---d---|
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/flatten.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/flatten.svg?maxAge=2592000&style=flat-square

### [flattenTree](https://github.com/unctionjs/flattenTree#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
String => RecordTree => Record
```

Takes a tree and creates a single object where the root keys are conjoined nested keys.

``` javascript
flattenTree(
  "-"
)(
  {
    data: {
      profile: {
        name: "Kurtis Rainbolt-Greene",
        age: 24,
      },
      metadata: {
        interval: "10s",
      },
      location: "http://api.example.com/profiles/24",
    }
  }
)
```

Would return:

``` javascript
{
  "data-profile-name": "Kurtis Rainbolt-Greene",
  "data-profile-age": 24,
  "data-metadata-interval": "10s",
  "data-location": "http://api.example.com/profiles/24"
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/flattenTree.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/flattenTree.svg?maxAge=2592000&style=flat-square

### [flip](https://github.com/unctionjs/flip#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
MapperFunction => Value => Value => mixed
```

Flips a function's first and second arguments.

``` javascript
flip(key)({aaa: "1"})("aaa") // "1"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/flip.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/flip.svg?maxAge=2592000&style=flat-square

### [forEach](https://github.com/unctionjs/forEach#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
MapperFunction => Functor => Functor
```

Takes any kind of iterable object and figures out the best way to iterate over it.

``` javascript
forEach((x) => y)([])
forEach((x) => y)(new Map)
forEach((x) => y)({})
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/forEach.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/forEach.svg?maxAge=2592000&style=flat-square

### [fresh](https://github.com/unctionjs/fresh#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
mixed => mixed
```

Takes a value and returns an empty fresh version of that value.

``` javascript
fresh({aaa: "aaa"}) // {}
fresh(["aaa"]) // []
fresh({}) // {}
fresh([]) // []
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/fresh.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/fresh.svg?maxAge=2592000&style=flat-square

### [fromArrayToObject](https://github.com/unctionjs/fromArrayToObject#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<[Key, Value]> => Object
```

Takes an array that looks like a primitive Object and turns it into a proper object. Duplicate keys get overwritten.

``` javascript
fromArrayToObject([["aaa", "1"], ["bbb", "2"]]) // {aaa: 1, bbb: 2}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/fromArrayToObject.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/fromArrayToObject.svg?maxAge=2592000&style=flat-square

### [fromFunctorToPairs](https://github.com/unctionjs/fromFunctorToPairs#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Functor => Array<[Key?, Value?]>
```

Takes a functor and tries to transform it into a list of key-value pairs.

``` javascript
fromFunctorToPairs({aaa: "a", bbb: "b", ccc: "c"})) // [["aaa", "a"], ["bbb", "b"], ["ccc", "c"]]
fromFunctorToPairs(["a", "b", "c"]) // [[0, "a"], [1, "b"], [2, "c"]]
fromFunctorToPairs(new Map([["aaa", "a"], ["bbb", "b"], ["ccc", "c"]])) // [["aaa", "a"], ["bbb", "b"], ["ccc", "c"]]
fromFunctorToPairs(new Set(["a", "b", "c"])) // [[undefined, "a"], [undefined, "b"], [undefined, "c"]]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/fromFunctorToPairs.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/fromFunctorToPairs.svg?maxAge=2592000&style=flat-square

### [fromIteratorToArray](https://github.com/unctionjs/fromIteratorToArray#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Iterator => Array<mixed>
```

Takes an Iterator (SetIterator, MapIterator, etc) and turns it into an array.

``` javascript
fromIteratorToArray(new Set([1, 2, 3]).entries()) // [[1, 1], [2, 2], [3, 3]]
fromIteratorToArray(new Map([["aaa", "a"], ["bbb", "b"], ["ccc", "c"]]).entries()) // [["aaa", "a"], ["bbb", "b"], ["ccc", "c"]]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/fromIteratorToArray.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/fromIteratorToArray.svg?maxAge=2592000&style=flat-square

### [get](https://github.com/unctionjs/get#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Key => mixed => Value
```

Returns the value of a specific key on an iterable. If no key is found it returns undefined. If the second argument isn't an iterable we return undefined, to allow for graceful failure.

``` javascript
get("aaa")({aaa: "1"}) // "1"
get("bbb")({aaa: "1"}) // undefined
get("bbb")(undefined) // undefined
get(0)(["aaa"]) // "aaa"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/get.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/get.svg?maxAge=2592000&style=flat-square

### [getMany](https://github.com/unctionjs/getMany#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<Key> => KeyedEnumerable => Array<Value>
```

Takes a list of keys and a keyed enumerable, and returns the values for those keys. If no key exists, the value is undefined.

``` javascript
getMany(["aaa", "bbb"])({aaa: "111", bbb: "222"}) // ["111", "222"]
getMany(["aaa", "ccc"])({aaa: "111", bbb: "222"}) // ["111", undefined]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/getMany.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/getMany.svg?maxAge=2592000&style=flat-square

### [greaterThan](https://github.com/unctionjs/greaterThan#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
number => number => boolean
```

Determines if one number is greater than another number.

``` javascript
greaterThan(1)(0) // true
greaterThan(0)(1) // false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/greaterThan.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/greaterThan.svg?maxAge=2592000&style=flat-square

### [groupBy](https://github.com/unctionjs/groupBy#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Enumerable<Value> => Key) => (Enumerable<Value>) => Map<Key, Enumerable<Value>>
```

Creates a record tree where the key is a computation on the value and the value is a list of the values that match with that computation.

``` javascript
groupBy(
  key("type")
)([
  {
    id: "aaa",
    name: "Kurtis Rainbolt-Greene",
    type: "person",
  },
  {
    id: "bbb",
    name: "Angela Rainbolt-Greene",
    type: "person",
  },
])
```

Which returns:

``` javascript
Map {
  "person" => [
    {
      id: "aaa",
      name: "Kurtis Rainbolt-Greene",
      type: "person",
    },
    {
      id: "bbb",
      name: "Angela Rainbolt-Greene",
      type: "person",
    },
  ],
}

```

``` javascript
groupBy(
  key("type")
)(
  Set [
    Map {
      "id" => "aaa",
      "name" => "Kurtis Rainbolt-Greene"
      "type" => "person",
    },
    Map {
      "id" => "bbb",
      "name" => "Angela Rainbolt-Greene"
      "type" => "person",
    }
  ]
)
```

Which returns:

``` javascript
Map {
  "person" => Set [
    Map {
      "id" => "aaa",
      "name" => "Kurtis Rainbolt-Greene",
      "type" => "person",
    },
    Map {
      "id" => "bbb",
      "name" => "Angela Rainbolt-Greene",
      "type" => "person",
    }
  ],
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/groupBy.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/groupBy.svg?maxAge=2592000&style=flat-square

### [hammer](https://github.com/unctionjs/hammer#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Key => KeyedEnumerable => KeyedEnumerable
```

Use this to de-nest a nested keyed enumerable.

``` javascript
const payload = {
  id: 1
  attributes: {
    name: "Kurtis Rainbolt-Greene",
    age: 26
  }
}

hammer("attributes")(payload)
```

Which returns:

``` javascript
{
  id: 1,
  name: "Kurtis Rainbolt-Greene",
  age: 26
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/hammer.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/hammer.svg?maxAge=2592000&style=flat-square

### [ifThenElse](https://github.com/unctionjs/ifThenElse#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
PredicateFunction => UnaryFunction => UnaryFunction => mixed
```

Based on a predicate it passes the value to a consequent or alternative function

``` javascript
ifThenElse(isEven)(toString)(toFloat)(1) // 1.0
ifThenElse(isEven)(toString)(toFloat)(2) // "2"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/ifThenElse.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/ifThenElse.svg?maxAge=2592000&style=flat-square

### [indexBy](https://github.com/unctionjs/indexBy#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Record => Key) => List<Record> => Record<Record>
```

Creates a record tree where the key is a computation on the value and the value is the original value.

``` javascript
indexBy(
  key("id")
)([
  {
    id: "aaa",
    name: "Kurtis Rainbolt-Greene",
  },
  {
    id: "bbb",
    name: "Angela Rainbolt-Greene",
  },
])
```

Which returns:

``` javascript
{
  aaa: {
    id: "aaa",
    name: "Kurtis Rainbolt-Greene",
  },
  bbb: {
    id: "bbb",
    name: "Angela Rainbolt-Greene",
  },
}
```

``` javascript
indexBy(
  key("id")
)(
  new Set([
    new Map([
      ["id", "aaa"],
      ["name", "Kurtis Rainbolt-Greene"]
    ]),
    new Map([
      ["id", "bbb"],
      ["name", "Angela Rainbolt-Greene"]
    ])
  ])
)
```

Which returns:

``` javascript
new Map([
  ["aaa", new Map([
    ["id", "aaa"],
    ["name", "Kurtis Rainbolt-Greene"]
  ])],
  ["bbb", new Map([
    ["id", "bbb"],
    ["name", "Angela Rainbolt-Greene"]
  ])],
])
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/indexBy.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/indexBy.svg?maxAge=2592000&style=flat-square

### [inflateTree](https://github.com/unctionjs/inflateTree#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
String => Record => NestedRecord
```

Takes a flat record with a specific key pattern and turns it into a nested record.

``` javascript
inflateTree(
  "-"
)(
  {
    "data-profile-name": "Kurtis Rainbolt-Greene",
    "data-profile-age": 24,
    "data-metadata-interval": "10s",
    "data-location": "http://api.example.com/profiles/24",
  }
)
```

which returns

``` javascript
{
  data: {
    profile: {
      name: "Kurtis Rainbolt-Greene",
      age: 24,
    },
    metadata: {interval: "10s"},
    location: "http://api.example.com/profiles/24",
  },
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/inflateTree.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/inflateTree.svg?maxAge=2592000&style=flat-square

### [initial](https://github.com/unctionjs/initial#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Array | string) => (Array | string)
```

Returns all but the last item in an ordered list.

``` javascript
initial([1, 2, 3]) // [1, 2]
initial("abc") // "ab"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/initial.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/initial.svg?maxAge=2592000&style=flat-square

### [isArray](https://github.com/unctionjs/isArray#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Value => boolean
```

Takes any value and then any value and returns an array containing those values.

``` javascript
isArray([]) // => true
isArray({}) // => false
isArray("") // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isArray.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isArray.svg?maxAge=2592000&style=flat-square

### [isEnumerable](https://github.com/unctionjs/isEnumerable#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
mixed => Boolean
```

Determines if the value is an enumerable and if so returns true, else false.

``` javascript
isEnumerable(1) // false
isEnumerable("") // true
isEnumerable([]) // true
isEnumerable({}) // true
isEnumerable(new Map()) // true
isEnumerable(new Set()) // true
isEnumerable(most.from([])) // true
isEnumerable(most.from([])) // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isEnumerable.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isEnumerable.svg?maxAge=2592000&style=flat-square

### [isNil](https://github.com/unctionjs/isNil#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
mixed => boolean
```

Determines if a value is not a value.

``` javascript
isNil(null) // true
isNil(undefined) // true
isNil(0) // false
isNil("") // false
isNil([]) // false
isNil({}) // false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isNil.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isNil.svg?maxAge=2592000&style=flat-square

### [isObject](https://github.com/unctionjs/isObject#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
mixed => boolean
```

Takes a value and determines if it's an object.

``` javascript
isObject({}) // => true
isObject([]) // => false
isObject("") // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isObject.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isObject.svg?maxAge=2592000&style=flat-square

### [isPopulated](https://github.com/unctionjs/isPopulated#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Functor => boolean
```

Allows you to check if a iterable has any items.

``` javascript
isPopulated([1]) // true
isPopulated({a: 'b'}) // true
isPopulated({}) // false
isPopulated([]) // false
isPopulated("") // false
isPopulated("a") // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isPopulated.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isPopulated.svg?maxAge=2592000&style=flat-square

### [isPresent](https://github.com/unctionjs/isPresent#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
mixed => boolean
```

This lets you know if it's a non-null, non-undefined value.

``` javascript
isPresent('x') // true
isPresent([]) // true
isPresent(null) // false
isPresent(undefined) // false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isPresent.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isPresent.svg?maxAge=2592000&style=flat-square

### [is](https://github.com/unctionjs/is#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
String => Value => boolean
```

Takes any value and then any value and returns an array containing those values.

``` javascript
is("Object")({}) // => true
is("Array")([]) // => true
is("String")("") // => true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/is.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/is.svg?maxAge=2592000&style=flat-square

### [itself](https://github.com/unctionjs/itself#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Value => Value
```

Always returns the value given when calling.

``` javascript
itself(1) // 1
itself(1) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/itself.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/itself.svg?maxAge=2592000&style=flat-square

### [keyChainTree](https://github.com/unctionjs/keyChainTree#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
RecordTree => Array<KeyChain>
```

Takes a tree and returns all keychains for that tree. Note, it only follows record types (types with keys).

``` javascript
keyChainTree({
  id: "1",
  attributes: {
    name: "Kurtis Rainbolt-Greene",
    age: 24,
  },
  meta: new Map([
    ["version", "1.0.0"],
  ]),
  included: [
    {
      id: "2",
      attributes: {
        name: "Angela Englund",
      },
    },
  ],
})
```

which would return

``` javascript
[
  ["id"],
  ["attributes", "name"],
  ["attributes", "age"],
  ["meta", "version"],
  ["included"],
]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/keyChainTree.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/keyChainTree.svg?maxAge=2592000&style=flat-square

### [keys](https://github.com/unctionjs/keys#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
KeyedFunctor => Array<Key>
```

Takes a keyed iterable and returns the keys as an Array.

``` javascript
keys({aaa: "111", bbb: "222"}) // ["aaa", "bbb"]
keys(["111", "222"]) // [0, 1]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/keys.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/keys.svg?maxAge=2592000&style=flat-square

### [lacksText](https://github.com/unctionjs/lacksText#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
String => String => boolean
```

Determines if a set of text does not have a subset of text.

``` javascript
const data = "I love pies!"
const lacksBestFood = lacksText("pizza")

lacksBestFood(data) // false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/lacksText.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/lacksText.svg?maxAge=2592000&style=flat-square

### [last](https://github.com/unctionjs/last#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Array | string) => mixed
```

Returns the last item of an ordered list.

``` javascript
last([1, 2, 3]) // 3
last("abc") // "c"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/last.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/last.svg?maxAge=2592000&style=flat-square

### [length](https://github.com/unctionjs/length#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Functor => number
```

Returns the number of values contained in the iterable.

``` javascript
length([1, 2, 3]) // 3
length({aaa: "aaa", bbb: "bbb"}) // 2
length(new Map([["aaa", "aaa"], ["bbb", "bbb"]])) // 2
length(new Set([1, 2, 3])) // 3
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/length.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/length.svg?maxAge=2592000&style=flat-square

### [lessThan](https://github.com/unctionjs/lessThan#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
number => number => boolean
```

Determines if one number is greater than another number.

``` javascript
lessThan(0)(1) // true
lessThan(1)(0) // false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/lessThan.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/lessThan.svg?maxAge=2592000&style=flat-square

### [mapKeys](https://github.com/unctionjs/mapKeys#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
MapperFunction => KeyedFunctor => KeyedFunctor
```

Map over a keyed functor's keys and return a new keyed functor having mapped the keys

``` javascript
const attributes = {
  name: "Kurtis Rainbolt-Greene",
  createdAt: new Date()
}

mapKeys(kebab)(attributes)
```

Would return:

``` javascript
{
  name: "Kurtis Rainbolt-Greene",
  "created-at": new Date()
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mapKeys.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mapKeys.svg?maxAge=2592000&style=flat-square

### [mapKeysWithValueKey](https://github.com/unctionjs/mapKeysWithValueKey#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Value => Key => Key) => Functor => Functor
```

Map over keys with the context of the value and key.

``` javascript
const attributes = {
  name: "Kurtis Rainbolt-Greene",
  createdAt: new Date()
}

mapKeys((value) => (key) => )(attributes)
```

Would return:

``` javascript
{
  name: "Kurtis Rainbolt-Greene",
  "created-at": new Date()
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mapKeysWithValueKey.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mapKeysWithValueKey.svg?maxAge=2592000&style=flat-square

### [mapValues](https://github.com/unctionjs/mapValues#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
MapperFunction => Functor => Functor
```

A pretty standard `mapValues()`, but with enforced unary currying.

``` javascript
mapValues(
  (value) => value + 1
)(
  [1, 2, 3]
)
```

Which will return:

``` javascript
[2, 3, 4]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mapValues.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mapValues.svg?maxAge=2592000&style=flat-square

### [mapValuesWithValueKey](https://github.com/unctionjs/mapValuesWithValueKey#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Value => ObjectKey => Value) => Object => Object
```
```
(Value => ArrayKey => Value) => Array => Array
```
```
(Value => MapKey => Value) => Map => Map
```
```
(Value => ArrayKey => Value) => String => String
```
```
(Value => null => Value) => Set => Set
```

Just like map, but gives back the index argument (as an integer, not a string if array)

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mapValuesWithValueKey.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mapValuesWithValueKey.svg?maxAge=2592000&style=flat-square

### [mergeAllLeft](https://github.com/unctionjs/mergeAllLeft#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<Functor> => Functor
```

Merges a list of iterables (of the same type) into a single iterable.

``` javascript
mergeAllLeft([["0"], ["1"], ["2"]]) // ["2", "1", "0"]
mergeAllLeft([{aaa: "aaa"}, {bbb: "bbb"}, {ccc: "ccc"}]) // {aaa: "aaa", bbb: "bbb", ccc: "ccc",}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeAllLeft.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeAllLeft.svg?maxAge=2592000&style=flat-square

### [mergeAllRight](https://github.com/unctionjs/mergeAllRight#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<Functor> => Functor
```

Merges a list of iterables (of the same type) into a single iterable.

``` javascript
mergeAllRight([["0"], ["1"], ["2"]]) // ["0", "1", "2"]
mergeAllRight([{aaa: "aaa"}, {bbb: "bbb"}, {ccc: "ccc"}]) // {aaa: "aaa", bbb: "bbb", ccc: "ccc",}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeAllRight.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeAllRight.svg?maxAge=2592000&style=flat-square

### [mergeDeepLeft](https://github.com/unctionjs/mergeDeepLeft#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Functor => Functor => Functor
```

Recursively merges two objects/arrays. Merges objects with `merge` and arrays with concat. Prefers left. THAT IS ALL.

``` javascript
const left = {
  alpha: "1"
}
const right = {
  beta: "2"
}

mergeDeepLeft(left)(right)
{
  alpha: "1",
  beta: "2"
}
```

``` javascript
const left = {
  alpha: {
    alpha1: "1"
  }
}
const right = {
  beta: {
    beta1: "1"
  }
}

mergeDeepLeft(left)(right)
{
  alpha: {
    alpha1: "1"
  },
  beta: {
    beta1: "1"
  }
}
```

``` javascript
const left = {
  alpha: [
    "1"
  ]
}
const right = {
  alpha: [
    "1"
  ]
}

mergeDeepLeft(left)(right)
{
  alpha: [
    "1",
    "1"
  ]
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeDeepLeft.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeDeepLeft.svg?maxAge=2592000&style=flat-square

### [mergeDeepRight](https://github.com/unctionjs/mergeDeepRight#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Functor => Functor => Functor
```

Recursively merges two objects/arrays. Merges objects with `merge` and arras with concat. Prefers right. THAT IS ALL.

``` javascript
const left = {
  alpha: "1"
}
const right = {
  beta: "2"
}

mergeDeepRight(left)(right)
{
  alpha: "1",
  beta: "2"
}
```

``` javascript
const left = {
  alpha: {
    alpha1: "1"
  }
}
const right = {
  beta: {
    beta1: "1"
  }
}

mergeDeepRight(left)(right)
{
  alpha: {
    alpha1: "1"
  },
  beta: {
    beta1: "1"
  }
}
```

``` javascript
const left = {
  alpha: [
    "1"
  ]
}
const right = {
  alpha: [
    "1"
  ]
}

mergeDeepRight(left)(right)
{
  alpha: [
    "1",
    "1"
  ]
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeDeepRight.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeDeepRight.svg?maxAge=2592000&style=flat-square

### [mergeLeft](https://github.com/unctionjs/mergeLeft#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Functor => Functor => Functor
```

Merges two iterables, preferring left.

``` javascript
const left = {
  alpha: "1",
  beta: "1"
}
const right = {
  beta: "2",
  zeta: "3"
}

mergeLeft(left)(right)
```

Which returns:

``` javascript
{
  alpha: "1",
  beta: "1",
  zeta: "3"
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeLeft.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeLeft.svg?maxAge=2592000&style=flat-square

### [mergeRight](https://github.com/unctionjs/mergeRight#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Functor => Functor => Functor
```

Merges two iterables, preferring right.

``` javascript
const left = {
  alpha: "1",
  beta: "1"
}
const right = {
  beta: "2",
  zeta: "3"
}

mergeRight(left)(right)
```

Which returns:

``` javascript
{
  alpha: "1"
  beta: "2",
  zeta: "3"
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeRight.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeRight.svg?maxAge=2592000&style=flat-square

### [mergeWith](https://github.com/unctionjs/mergeWith#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Value => Value => Value) => Functor => Functor => Functor
```

Merges two iterables and uses a provided function to handle conflicts. The function is given the the left value and the right value.

``` javascript
const left = {
  alpha: "0",
  beta: "1",
  zeta: "3"
}
const right = {
  alpha: "0",
  beta: "2",
  zeta: "3"
}

mergeWith((l) => (r) => l+r)(left)(right)
```

Which returns:

``` javascript
{
  alpha: "0",
  beta: "12",
  zeta: "3"
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeWith.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeWith.svg?maxAge=2592000&style=flat-square

### [mergeWithKey](https://github.com/unctionjs/mergeWithKey#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Functor => Functor => Key => mixed) => Functor => Functor => Functor
```

Merges two iterables and uses a provided function to handle conflicts. The function is given the key, the left value, and the right value.

``` javascript
const left = {
  beta: "1"
}
const right = {
  beta: "2"
}

mergeWith((key, leftValue, rightValue) => key+leftValue+rightValue)(left)(right)
```

Which returns:

``` javascript
{
  beta: "beta12"
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeWithKey.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeWithKey.svg?maxAge=2592000&style=flat-square

### [nestedApply](https://github.com/unctionjs/nestedApply#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(MapFunction => Functor => Functor) => MapFunction => number => Functor => Functor
```

Takes a function (the application) that takes function(s) (later referred to as
the inner) and value(s) (`mapValues()`, `forEach()`, `selectValues()`), a function (the inner)
that will be applied to a value(s), and finally a number (depth) to apply that
applicator around the inner.

In the below example we want to take two sets of records and index them by id:

``` javascript
const records = [
  [
    {
      id: "a1",
      type: "commercial",
    },
    {
      id: "a2",
      type: "commercial",
    }
  ],
  [
    {
      id: "b1",
      type: "residential",
    },
    {
      id: "b2",
      type: "residential",
    }
  ]
]
```

Normally we'd just do `mapValues(indexBy(key("id")))`, however we can make this easier and dynamic:

``` javascript
const nestedIndexById = nestedApply(mapValues)(indexBy(key("id")))(1)

nestedIndexById(records)
```

And the result:

``` javascript
[
  {
    a1: {
      id: "a1",
      type: "commercial",
    },
    a2: {
      id: "a2",
      type: "commercial",
    },
  },
  {
    b1: {
      id: "b1",
      type: "residential",
    },
    b2: {
      id: "b2",
      type: "residential",
    },
  },
]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/nestedApply.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/nestedApply.svg?maxAge=2592000&style=flat-square

### [objectFrom](https://github.com/unctionjs/objectFrom#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
KeyChain => Value => Enumerable
```

Given a keychain and a value it creates an object that has keys based on the keychain.

``` javascript
objectFrom(["key", "subkey"])("value")
```

Which returns:

``` javascript
{
  key: {
    subkey: "value"
  }
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/objectFrom.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/objectFrom.svg?maxAge=2592000&style=flat-square

### [of](https://github.com/unctionjs/of#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Key | void) => Value => Functor
```

Creates a functor based on a value and optional key.

``` javascript
of("aaa")("bbb")({}) // {aaa: "bbb"}
of(null)("bbb")([]) // ["bbb"]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/of.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/of.svg?maxAge=2592000&style=flat-square

### [onlyKeys](https://github.com/unctionjs/onlyKeys#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<Key> => KeyedEnumerable => KeyedEnumerable
```

Reduces the keyed enumerable to an object with only the keys provided.

``` javascript
onlyKeys(
  ["alpha", "beta", "delta"]
)(
  {
    feta: "0",
    alpha: "1",
    beta: "2",
    delta: "3",
  }
)

// {
//   alpha: "1",
//   beta: "2",
//   delta: "3",
// }
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/onlyKeys.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/onlyKeys.svg?maxAge=2592000&style=flat-square

### [optimisticP](https://github.com/unctionjs/optimisticP#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<mixed | Promise<mixed>> => Promise<Array<mixed>>
```

Will take an array of promises and returns a promise of only the resolved promises.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/optimisticP.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/optimisticP.svg?maxAge=2592000&style=flat-square

### [pairsKeys](https://github.com/unctionjs/pairsKeys#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<[Key, Value]> => Array<Key>
```

Takes an array that looks like a list of pairs (key, values) and returns all the keys.

Lets say you have this data:

``` javascript
const data = {
  a: 1,
  b: 2,
  c: 3,
}
```

And you turn it into pairs:

``` javascript
const pairings = toPairs(data)
```

You would end up with this:

``` javascript
[
  ['a', 1],
  ['b', 2],
  ['c', 3],
]
```

Now you just want the keys:

``` javascript
pairsKeys(pairings)
```

You would get the following:

``` javascript
[
  'a',
  'b',
  'c',
]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/pairsKeys.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/pairsKeys.svg?maxAge=2592000&style=flat-square

### [pairsValues](https://github.com/unctionjs/pairsValues#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<[Key, Value]> => Array
```

Takes an array that looks like a list of pairs (key, values) and returns all the values.

Lets say you have this data:

``` javascript
const data = {
  a: 1,
  b: 2,
  c: 3,
}
```

And you turn it into pairs:

``` javascript
const pairings = toPairs(data)
```

You would end up with this:

``` javascript
[
  ['a', 1],
  ['b', 2],
  ['c', 3],
]
```

Now you just want the keys:

``` javascript
pairsValues(pairings)
```

You would get the following:

``` javascript
[
  1,
  2,
  3,
]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/pairsValues.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/pairsValues.svg?maxAge=2592000&style=flat-square

### [partition](https://github.com/unctionjs/partition#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
PredicateFunction => Functor => [Functor, Functor]
```

This function takes an functgor and returns an array of two of the same type of functor. the first of which contains elements which satisfy the predicate, the second of which contains element which do not.

``` javascript
partition(isOdd)([1,2,3,4]) // [[1,3],[2,4]]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/partition.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/partition.svg?maxAge=2592000&style=flat-square

### [pipe](https://github.com/unctionjs/pipe#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<mixed => mixed> => mixed => mixed
```

Takes a list of functions and runs a value through that stack from left to right.

``` javascript
pipe([toString, toInteger])(0) // 0
pipe([append("b"), append("a")])("c") // "cba"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/pipe.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/pipe.svg?maxAge=2592000&style=flat-square

### [pluck](https://github.com/unctionjs/pluck#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
KeyChain => KeyedEnumerable => Array
```

Given a keychain and records return the values at the keychain for each record.

``` javascript
pluck(
  ["attributes", "name"]
)(
  [
    {
      id: "1",
      attributes: {
        name: "Kurtis",
        age: 29,
        height: "5'10\"",
      },
    },
    {
      id: "2",
      attributes: {
        name: "Chris",
        age: 29,
        height: "5'8\"",
      },
    },
  ]
)
```

Which will return:

``` javascript
[
  "Kurtis",
  "Chris"
]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/pluck.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/pluck.svg?maxAge=2592000&style=flat-square

### [plucks](https://github.com/unctionjs/plucks#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<KeyChain> => Functor => Array
```

Given keychain and records, return the values at the keychain for each record.

``` javascript
plucks(
  [
    ["attributes", "name"],
    ["attributes", "age"],
    ["attributes", "friends"],
    ["id"]
  ]
)(
  [
    {
      id: "1",
      attributes: {
        name: "Kurtis",
        age: 29,
        height: "5'10\"",
      },
    },
    {
      id: "2",
      attributes: {
        name: "Chris",
        age: 29,
        height: "5'8\"",
      },
    },
  ]
)
```

Which will return:

``` javascript
[
  ["Kurtis", 29, null, "1"],
  ["Chris", 29, null, "2"]
]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/plucks.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/plucks.svg?maxAge=2592000&style=flat-square

### [prepend](https://github.com/unctionjs/prepend#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
mixed => (Array | string) => (Array | string)
```

Takes a value and puts it at the beginning of the given list.


``` javascript
prepend(4)([5]) // => [4, 5]
prepend("c")("ab") // => "cab"
```

```
NOTE: While there is a type annotation in the README, this function cannot have type annotations due to a bug in flow.
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/prepend.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/prepend.svg?maxAge=2592000&style=flat-square

### [range](https://github.com/unctionjs/range#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Number => Number => Number
```

Takes a minimum number, a maximum number, and returns a random value from that inclusive range.

``` javascript
range(1)(2) // Sometimes 1, sometimes 2
range(0)(0) // 0
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/range.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/range.svg?maxAge=2592000&style=flat-square

### [reduceKeys](https://github.com/unctionjs/reduceKeys#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Accumulated => Key => Accumulated) => Initial => Functor => Accumulated
```

Reduce over a iterable's keys.

``` javascript
reduceValues(
  (accumulation) => (current) => `${accumulation}/${current}`
)(
  "~"
)(
  ["Users", "krainboltgreene", "Code"]
)
```

Which will return:

``` javascript
"~/0/1/2"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/reduceValues.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/reduceValues.svg?maxAge=2592000&style=flat-square

### [reduceValues](https://github.com/unctionjs/reduceValues#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Accumulated => Value => Accumulated) => Initial => Functor => Accumulated
```

Reduce over a iterable's values.

``` javascript
reduceValues(
  (accumulation) => (current) => `${accumulation}/${current}`
)(
  "~"
)(
  ["Users", "krainboltgreene", "Code"]
)
```

Which will return:

``` javascript
"~/Users/krainboltgreene/Code"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/reduceValues.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/reduceValues.svg?maxAge=2592000&style=flat-square

### [reduceWithValueKey](https://github.com/unctionjs/reduceWithValueKey#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(mixed => Value => (Key | void) => mixed) => mixed => Functor => mixed
```

Reduces over a functor, providing the reducer with the value and key.

``` javascript
reduceWithValueKey(
  (accumulation) => (current) => (key) => `${accumulation}/${current}:${key}`
)(
  "~"
)(
  ["Users", "krainboltgreene", "Code"]
)
```

Which will return:

``` javascript
"~/Users:0/krainboltgreene:1/Code:2"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/reduceWithValueKey.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/reduceWithValueKey.svg?maxAge=2592000&style=flat-square

### [rejectByValue](https://github.com/unctionjs/rejectByValue#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
mixed => mixed
```

An example function.

``` javascript
rejectByValue(1) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/rejectByValue.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/rejectByValue.svg?maxAge=2592000&style=flat-square

### [rejectP](https://github.com/unctionjs/rejectP#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
any => Promise<any>
```

A port of the `Promise.reject()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/rejectP.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/rejectP.svg?maxAge=2592000&style=flat-square

### [remaining](https://github.com/unctionjs/remaining#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Array | string) => (Array | string)
```

Returns all but the first item in an ordered list

``` javascript
remaining([1, 2, 3]) // [2, 3]
remaining("abc") // "bc"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/remaining.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/remaining.svg?maxAge=2592000&style=flat-square

### [replaceWhen](https://github.com/unctionjs/replaceWhen#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
PredicateFunction => mixed => Functor
```

Replaces values in an functor with another value based on a predicate.

``` javascript
replaceWhen(isEven)(null)([1, 2, 3]) // [1, null, 3]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/replaceWhen.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/replaceWhen.svg?maxAge=2592000&style=flat-square

### [resolveP](https://github.com/unctionjs/resolveP#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Value => Promise<Value>
```

A port of the `Promise.resolve()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/resolveP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/resolveP.svg?maxAge=2592000&style=flat-square

### [reversal](https://github.com/unctionjs/reversal#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
PredicateFunction => PredicateFunction
```

Takes a predicate and returns the reverse of that predicate.

``` javascript
reversal(isNull)(null) // false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/reversal.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/reversal.svg?maxAge=2592000&style=flat-square

### [reverse](https://github.com/unctionjs/reverse#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Array | string) => (Array | string)
```

Takes an ordered list type and returns the reverse version of it.

``` javascript
reverse([1, 2, 3]) // [3, 2, 1]
reverse("abc") // "cba"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/reverse.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/reverse.svg?maxAge=2592000&style=flat-square

### [sample](https://github.com/unctionjs/sample#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
OrderedFunctor<T> => T
```

Takes an Array or string and randomly one element to return.

``` javascript
users() // => [{"id": 1, "name": "Kurtis Rainbolt-Greene"}, {"id": 2, "name": "Angela Englund"}]

sample(users()) // => {"id": 2, "name": "Angela Englund"}

sample(users()) // => {"id": 2, "name": "Angela Englund"}

sample(users()) // => {"id": 1, "name": "Kurtis Rainbolt-Greene"}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/sample.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/sample.svg?maxAge=2592000&style=flat-square

### [sampleSize](https://github.com/unctionjs/sampleSize#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
number => OrderedFunctor => OrderedFunctor
```

Takes an Array or string and randomly picks *n* elements to return, but never the same one.

``` javascript
users() // => [{"id": 1, "name": "Kurtis Rainbolt-Greene"}, {"id": 2, "name": "Angela Englund"}]

sample(1)(users()) // => [{"id": 2, "name": "Angela Englund"}]

sample(2)(users()) // => [{"id": 2, "name": "Angela Englund"}, {"id": 1, "name": "Kurtis Rainbolt-Greene"}]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/sampleSize.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/sampleSize.svg?maxAge=2592000&style=flat-square

### [selectByValue](https://github.com/unctionjs/selectByValue#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
PredicateFunction => Enumerable => Enumerable
```

Given an enumerable and a predicate and produce the set or subset of that based on the predicate matched to the values.

``` javascript
selectByValue(isOdd)([1, 2, 3, 4]) // [1, 3]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/selectByValue.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/selectByValue.svg?maxAge=2592000&style=flat-square

### [sequence](https://github.com/unctionjs/sequence#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<MapFunction> => mixed => Array
```
```
Set<MapFunction> => mixed => Set
```
```
Object<ObjectKey, MapFunction> => mixed => Object
```
```
Map<MapKey, MapFunction> => mixed => Map
```

Takes a list of functions, a value, and applies that value to each function, returning an array of results.

``` javascript
sequence([increment, decrement])(1) // [2, 0]
sequence(new Set([increment, decrement]))(1) // {2 0}
sequence(new Map([["a", increment], ["b", decrement]]))(1) // {{"a" 2}, {"b" 0}}
sequence({x: increment, y: decrement, z: itself})(1) // {x: 2, y: 0, z: 1}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/sequence.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/sequence.svg?maxAge=2592000&style=flat-square

### [shuffle](https://github.com/unctionjs/shuffle#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
OrderedFunctor => OrderedFunctor
```

Takes an Ordered Functor and returns an Ordered Functor with the same content, but in a random order.

``` javascript
users()
```

Would return:

``` javascript
[{"id": 1, "name": "Kurtis Rainbolt-Greene"}, {"id": 2, "name": "Angela Englund"}, {"id": 3, "name": "Joshua Benitez"}]
```

``` javascript
shuffle(users())
```

Would return:

``` javascript
[{"id": 1, "name": "Kurtis Rainbolt-Greene"}, {"id": 3, "name": "Joshua Benitez"}, {"id": 2, "name": "Angela Englund"}]
```

``` javascript
shuffle(users())
```

Would return:

``` javascript
[{"id": 3, "name": "Joshua Benitez"}, {"id": 1, "name": "Kurtis Rainbolt-Greene"}, {"id": 2, "name": "Angela Englund"}]
```

``` javascript
shuffle(users())
```

Would return:

``` javascript
[{"id": 2, "name": "Angela Englund"}, {"id": 3, "name": "Joshua Benitez"}, {"id": 1, "name": "Kurtis Rainbolt-Greene"}]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/shuffle.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/shuffle.svg?maxAge=2592000&style=flat-square

### [sortBy](https://github.com/unctionjs/sortBy#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(mixed => mixed) => Array<mixed> => Array<mixed>
```

Sorts an array by a given computer function.

``` javascript
sortBy(({id}) => id)([{id: 3}, {id: 1}, {id: 2}]) // [{id: 1}, {id: 2}, {id: 3}]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/sortBy.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/sortBy.svg?maxAge=2592000&style=flat-square

### [splat](https://github.com/unctionjs/splat#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Function => Array<Value> => mixed
```

Takes a function and a list of values and recursively applies the value to the functions.

``` javascript
splat((a) => (b) => a + b)([1, 2]) // 3
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/splat.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/splat.svg?maxAge=2592000&style=flat-square

### [split](https://github.com/unctionjs/split#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
String => (String | Regexp) => Array<String>
```

Splits up a string by a delimiter.

``` javascript
split(" ")("a b") // ["a", "b"]
split(/-+/)("a---b") // ["a", "b"]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/split.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/split.svg?maxAge=2592000&style=flat-square

### [startsWith](https://github.com/unctionjs/startsWith#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
string => string => boolean
```

Determines if a given subset of text is at the start of another set of text.

``` javascript
startsWith("Hello")("Hello, world!") // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/startsWith.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/startsWith.svg?maxAge=2592000&style=flat-square

### [streamSatisfies](https://github.com/unctionjs/streamSatisfies#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
string => (mixed => mixed => boolean) => (string => position => any | any => any) => Stream => any
```

Takes a marble string, an assertion, a final state callback, and a stream so that you can assert in tests how a stream will function. Each marble should be deliniated by a `"---"` notation. If the last marble node is a "|" then it will make sure the stream has ended. Each "marble" will be evaluated before being compared.

``` javascript
test("String diagram", ({equal, doesNotThrow, end}) => {
  const left = xstream.of("a")
  const right = xstream.of("b")

  streamSatisfies(
    "'b'---'a'---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})

test("String diagram", ({equal, doesNotThrow, end}) => {
  const left = xstream.of(1)
  const right = xstream.of(2)

  streamSatisfies(
    "2---1---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})

test("String diagram", ({same, equal, doesNotThrow, end}) => {
  const left = xstream.of({aaa: "aaa"})
  const right = xstream.of({bbb: "bbb"})

  streamSatisfies(
    "{bbb: \"bbb\"}---{aaa: \"aaa\"}---|"
  )(
    (given) => (expected) => same(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})

test("String diagram", ({equal, doesNotThrow, end}) => {
  const left = xstream.of("a")
  const right = xstream.of("b")

  streamSatisfies(
    "'b'---'a'--=>"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})

test("Array diagram", ({equal, doesNotThrow, end}) => {
  const left = xstream.of("a")
  const right = xstream.of("b")

  streamSatisfies(
    ["b", "a"]
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})

test("Array diagram", ({equal, doesNotThrow, end}) => {
  const left = xstream.of(1)
  const right = xstream.of(2)

  streamSatisfies(
    [2, 1]
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})

test("Array diagram", ({same, equal, doesNotThrow, end}) => {
  const left = xstream.of({aaa: "aaa"})
  const right = xstream.of({bbb: "bbb"})

  streamSatisfies(
    [{bbb: "bbb"}, {aaa: "aaa"}]
  )(
    (given) => (expected) => same(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    mergeRight(left)(right)
  )
})


test("Array diagram with error", ({equal, match, end}) => {
  const stream = xstream
    .from([
      {unction: () => true},
      {unction: () => true},
      null,
    ])
    .map((object) => object.unction())

  streamSatisfies(
    [true, true]
  )(
    (given) => (expected) => equal(given, expected)
  )(
    (exception) => {
      match(exception, TypeError)
      end()
    }
  )(
    ({length}) => (size) => {
      equal(length, size)

      end()
    }
  )(
    stream
  )
})
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/streamSatisfies.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/streamSatisfies.svg?maxAge=2592000&style=flat-square

### [supertype](https://github.com/unctionjs/supertype#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
mixed => String
```

Return the super type of an value.

``` javascript
class A {}
class B extends A {}

supertype(new B()) // "A"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/supertype.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/supertype.svg?maxAge=2592000&style=flat-square

### [takeFirst](https://github.com/unctionjs/takeFirst#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
number => (Array | string) => (Array | string)
```

Returns the first N of a list of ordered values.

``` javascript
takeFirst(2)([1, 2, 3]) // [1, 2]
takeFirst(1)([1, 2, 3]) // [1]
takeFirst(2)("abc") // "ab"
takeFirst(1)("abc") // "a"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/takeFirst.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/takeFirst.svg?maxAge=2592000&style=flat-square

### [takeLast](https://github.com/unctionjs/takeLast#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
number => (Array | string) => (Array | string)
```

Returns the last N of a list of ordered values.

``` javascript
takeLast(2)([1, 2, 3]) // [2, 3]
takeLast(1)([1, 2, 3]) // [3]
takeLast(2)("abc") // "bc"
takeLast(1)("abc") // "c"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/takeLast.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/takeLast.svg?maxAge=2592000&style=flat-square

### [thenCatchP](https://github.com/unctionjs/thenCatchP#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
UnaryFunction => UnaryFunction => Promise<mixed> =>  Promise<mixed>
```

A port of the `Promise.prototype.then()` function, but with the extra catch argument.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thenCatchP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thenCatchP.svg?maxAge=2592000&style=flat-square

### [thenP](https://github.com/unctionjs/thenP#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
UnaryFunction => Promise<mixed> => Promise<mixed>
```

A port of the `Promise.prototype.then()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thenP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thenP.svg?maxAge=2592000&style=flat-square

### [thrush](https://github.com/unctionjs/thrush#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
mixed => UnaryFunction => mixed
```

One of the fantasy birds: it takes a value, a function, and then applies that value to as the first argument to that function.

``` javascript
thrush(0)((value) => `${value}`) // "0"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thrush.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thrush.svg?maxAge=2592000&style=flat-square

### [treeify](https://github.com/unctionjs/treeify#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Array<ReducerFunction> => Array<Functor> => Tree
```

This takes a list of functions (the folders) and an array of objects or an
object of objects (the collection) to create a tree. Each function in
the list of folders will in some way return a new object. All of the objects
produced are then turned into a final tree.

``` javascript
const collection = [
  {
    id: "a1",
    type: "resources",
    attributes: {
      version: "v1",
      namespace: "accounts",
    }
  },
  {
    id: "a2",
    type: "resources",
    attributes: {
      version: "v1",
      namespace: "accounts",
    }
  },
  {
    id: "b1",
    type: "resources",
    attributes: {
      version: "v1",
      namespace: "profiles",
    }
  },
  {
    id: "b1",
    type: "resources",
    attributes: {
      version: "v2",
      namespace: "profiles",
    }
  }
]
````

The order goes from outer layer to deeper layer, so in this case the outer
level properties will be based on `key("type")`, and the deepest layer
properties will be based on `key("id")`.

``` javascript
const functions =

treeify(
  [
    groupBy(key("type")),
    groupBy(keyChain(["attributes", "namespace"])),
    groupBy(keyChain(["attributes", "version"])),
    indexBy(key("id")),
  ]
)(
  collection
)
```

The resulting object looks like this:

``` javascript
{
  resources: {
    accounts: {
      v1: {
        a1: {
          id: "a1",
          type: "resources",
          attributes: {
            version: "v1",
            namespace: "accounts",
          }
        },
        a2: {
          id: "a2",
          type: "resources",
          attributes: {
            version: "v1",
            namespace: "accounts",
          }
        }
      }
    },
    profiles: {
      v1: {
        b1: {
          id: "b1",
          type: "resources",
          attributes: {
            version: "v1",
            namespace: "profiles",
          }
        }
      },
      v2: {
        b1: {
          id: "b1",
          type: "resources",
          attributes: {
            version: "v2",
            namespace: "profiles",
          }
        }
      }
    }
  }
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/treeify.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/treeify.svg?maxAge=2592000&style=flat-square

### [type](https://github.com/unctionjs/type#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
null | void | {constructor: {name: string}} => string
```

Returns the type name of the value provided.

``` javascript
type("a") // "String"
type(1) // "Number"
type({}) // "Object"
type([]) // "Array"
type(true) // "Boolean"
type(null) // "null"
type(undefined) // "undefined"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/type.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/type.svg?maxAge=2592000&style=flat-square

### [upTo](https://github.com/unctionjs/upTo#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
number => Array<number>
```

Just takes a maximum and produces an array of 1 to that number.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/upTo.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/upTo.svg?maxAge=2592000&style=flat-square

### [values](https://github.com/unctionjs/values#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Functor => Array<Value>
```

Takes an iterable and returns it's values.

``` javascript
values({aaa: "111", bbb: "222"}) // ["111", "222"]
values(["aaa", "bbb"]) // ["aaa", "bbb"]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/values.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/values.svg?maxAge=2592000&style=flat-square

### [where](https://github.com/unctionjs/where#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
KeyedEnumerable<PredicateFunction> => KeyedEnumerable => boolean
```

Compares a Keyed Enumerable of Predicate Functions to a Enumerable of values. It is partial and prefers truthiness (meaning it only checks a key on the Functor if there is a key on the matcher).

``` javascript
where(
  {name: equals("Kurtis Rainbolt-Greene")}
)({
  name: "Kurtis Rainbolt-Greene",
  age: 30,
}) // true
```

``` javascript
where(
  {name: equals("Kurtis Rainbolt-Greene")}
)(
  new Map([
    [
      "name",
      "Kurtis Rainbolt-Greene",
    ],
    [
      "age",
      30,
    ],
  ])
)
```

``` javascript
where(
  new Map([
    [
      [
        "attributes",
        "name",
      ],
      equals("Kurtis Rainbolt-Greene"),
    ],
  ])
)({
  attributes: {
    name: "Kurtis Rainbolt-Greene",
    age: 30,
  },
}) // true
```

``` javascript
where(
  [
    equals("Kurtis Rainbolt-Greene"),
  ]
)(
  [
    "Kurtis Rainbolt-Greene",
    30,
  ]
) // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/where.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/where.svg?maxAge=2592000&style=flat-square

### [withoutKeyRecursive](https://github.com/unctionjs/withoutKeyRecursive#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
Key => Functor => Functor
```

Returns a copy of an iterable without a key, no matter how deep the tree.

``` javascript
withoutKeyRecursive("__abstraction__")(
  {
    id: "1",
    name: "Kurtis Rainbolt-Greene",
    attributes: {
      version: "v1",
      namespace: "accounts",
      __abstraction__: {errors: []},
    },
    __abstraction__: {errors: []},
  }
)
```

Which will return:

``` javascript
{
  id: "1",
  name: "Kurtis Rainbolt-Greene",
  attributes: {
    version: "v1",
    namespace: "accounts",
  },
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/withoutKeyRecursive.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/withoutKeyRecursive.svg?maxAge=2592000&style=flat-square

### [withoutKeys](https://github.com/unctionjs/withoutKeys#readme)()

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
KeyList => KeyValueEnumerable<T> => KeyValueEnumerable<T>
```

Takes a enumerable that has keys and returns the same type where all the given keys don't exist.

``` javascript
withoutKeys(["a", "b", "c"])({b: 2, d: 3}) // {d: 3}
withoutKeys(["a", "b", "c"])(new Map([["b", 2], ["d", 3]])) // Map([["d", 3]]))
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/withoutKeys.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/withoutKeys.svg?maxAge=2592000&style=flat-square

### [zip](https://github.com/unctionjs/zip#readme)()


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

```
(Array | Object) => Array | Object => Array | Object
```

Takes two iterables and merges them together, combining their values into an array

``` javascript
zip([1, 2, 3])([4, 5, 6])
```

returns

``` javascript
[[1, 4], [2, 5], [3, 6]]
```

``` javascript
zip({x: 1, y: 2, z: 0})({x: 0, y: 0, z: 0})
```

returns

``` javascript
{x: [1, 0], y: [2, 0], z: [0, 0]}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/zip.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/zip.svg?maxAge=2592000&style=flat-square

