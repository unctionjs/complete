# @unction/complete

![Tests](https://img.shields.io/travis/unctionjs/complete.svg?maxAge=2592000&style=flat-square)
![Stability](https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square)
![Dependencies](https://img.shields.io/david/unctionjs/complete.svg?maxAge=2592000&style=flat-square)

The complete package of unction functions. See below for documentation.

## Usage

You can use each of these packages individually:

``` javascript
import {hammer} from "@unction/complete"

hammer()
```

## @unction/allObjectP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> RecordType => Promise<RecordType>

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

## @unction/allP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<any | Promise<any>> -> Promise<Array<any>>

A port of the `Promise.all()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/allP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/allP.svg?maxAge=2592000&style=flat-square

## @unction/always


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> any -> any

Always returns the value given when called

``` javascript
always(1)() // 1
always(1)(0) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/always.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/always.svg?maxAge=2592000&style=flat-square

## @unction/append


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Array<any> -> Array<any>

Takes a value and puts it at the end of the given list

``` javascript
append(4)([5]) // => [5, 4]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/append.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/append.svg?maxAge=2592000&style=flat-square

## @unction/appendM


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Array<any> -> Array<any>

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

## @unction/applicator


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType -> any) -> any

Takes a function and a value and applies that function to that value.

``` javascript
applicator(inc)(1) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/applicator.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/applicator.svg?maxAge=2592000&style=flat-square

## @unction/applicators

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (Array<mixed -> mixed> | RecordType<KeyType, mixed -> mixed>)<T> -> (ArrayType | RecordType)<T> -> (ArrayType | RecordType)<T>

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

## @unction/arrayify


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> [any] | Array<any>

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

## @unction/aside

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<mixed => mixed> -> mixed -> mixed

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

## @unction/attach


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> ValueType -> IterableType -> IterableType

A polymorphic way to attach a value to an iterable

``` javascript
attach("hello")("world")({}) // => {hello: "world"}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/attach.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/attach.svg?maxAge=2592000&style=flat-square

## @unction/cascadingKeyChain


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<UnfinishedKeyChainType> -> IterableType -> ValueType

Cascades through multiple keychains in order to arrive at a value. Null keys are replaced with the previous keychain's value.

``` javascript
cascadingKeyChain(
  [
    ["ephemeral", "current", "session"],
    ["resources", "sessions", null, "relationships", "account", "data", "id"],
    ["resources", "accounts", null, "attributes", "name"]
  ]
)(
  {
    ephemeral: {current: {session: "1"}},
    resources: {
      sessions: {
        1: {
          id: "1",
          relationships: {account: {data: {id: "2"}}},
        },
      },
      accounts: {
        2: {
          id: "2",
          attributes: {name: "Kurtis Rainbolt-Greene"},
        },
      },
    },
  }
)
```

returns

``` javascript
"Kurtis Rainbolt-Greene"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/cascadingKeyChain.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/cascadingKeyChain.svg?maxAge=2592000&style=flat-square

## @unction/catchP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> Promise<any> -> Promise<any>

A port of the `Promise.prototype.catch()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/catchP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/catchP.svg?maxAge=2592000&style=flat-square

## @unction/compact


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<any> -> Array<mixed>

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

## @unction/complete

![Tests](https://img.shields.io/travis/unctionjs/complete.svg?maxAge=2592000&style=flat-square)
![Stability](https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square)
![Dependencies](https://img.shields.io/david/unctionjs/complete.svg?maxAge=2592000&style=flat-square)

The complete package of unction functions. See below for documentation.

## @unction/allObjectP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> RecordType => Promise<RecordType>

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

## @unction/allP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<any | Promise<any>> -> Promise<Array<any>>

A port of the `Promise.all()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/allP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/allP.svg?maxAge=2592000&style=flat-square

## @unction/always


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> any -> any

Always returns the value given when called

``` javascript
always(1)() // 1
always(1)(0) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/always.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/always.svg?maxAge=2592000&style=flat-square

## @unction/append


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Array<any> -> Array<any>

Takes a value and puts it at the end of the given list

``` javascript
append(4)([5]) // => [5, 4]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/append.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/append.svg?maxAge=2592000&style=flat-square

## @unction/appendM


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Array<any> -> Array<any>

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

## @unction/applicator


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType -> any) -> any

Takes a function and a value and applies that function to that value.

``` javascript
applicator(inc)(1) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/applicator.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/applicator.svg?maxAge=2592000&style=flat-square

## @unction/applicators

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (Array<mixed -> mixed> | RecordType<KeyType, mixed -> mixed>)<T> -> (ArrayType | RecordType)<T> -> (ArrayType | RecordType)<T>

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

## @unction/arrayify


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> [any] | Array<any>

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

## @unction/aside

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<mixed => mixed> -> mixed -> mixed

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

## @unction/attach


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> ValueType -> IterableType -> IterableType

A polymorphic way to attach a value to an iterable

``` javascript
attach("hello")("world")({}) // => {hello: "world"}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/attach.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/attach.svg?maxAge=2592000&style=flat-square

## @unction/cascadingKeyChain


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<UnfinishedKeyChainType> -> IterableType -> ValueType

Cascades through multiple keychains in order to arrive at a value. Null keys are replaced with the previous keychain's value.

``` javascript
cascadingKeyChain(
  [
    ["ephemeral", "current", "session"],
    ["resources", "sessions", null, "relationships", "account", "data", "id"],
    ["resources", "accounts", null, "attributes", "name"]
  ]
)(
  {
    ephemeral: {current: {session: "1"}},
    resources: {
      sessions: {
        1: {
          id: "1",
          relationships: {account: {data: {id: "2"}}},
        },
      },
      accounts: {
        2: {
          id: "2",
          attributes: {name: "Kurtis Rainbolt-Greene"},
        },
      },
    },
  }
)
```

returns

``` javascript
"Kurtis Rainbolt-Greene"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/cascadingKeyChain.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/cascadingKeyChain.svg?maxAge=2592000&style=flat-square

## @unction/catchP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> Promise<any> -> Promise<any>

A port of the `Promise.prototype.catch()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/catchP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/catchP.svg?maxAge=2592000&style=flat-square

## @unction/compact


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<any> -> Array<mixed>

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

## @unction/complete

![Tests](https://img.shields.io/travis/unctionjs/complete.svg?maxAge=2592000&style=flat-square)
![Stability](https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square)
![Dependencies](https://img.shields.io/david/unctionjs/complete.svg?maxAge=2592000&style=flat-square)

The complete package of unction functions. See below for documentation.

## @unction/allObjectP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> RecordType => Promise<RecordType>

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

## @unction/allP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<any | Promise<any>> -> Promise<Array<any>>

A port of the `Promise.all()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/allP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/allP.svg?maxAge=2592000&style=flat-square

## @unction/always


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> any -> any

Always returns the value given when called

``` javascript
always(1)() // 1
always(1)(0) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/always.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/always.svg?maxAge=2592000&style=flat-square

## @unction/append


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Array<any> -> Array<any>

Takes a value and puts it at the end of the given list

``` javascript
append(4)([5]) // => [5, 4]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/append.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/append.svg?maxAge=2592000&style=flat-square

## @unction/appendM


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Array<any> -> Array<any>

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

## @unction/applicator


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType -> any) -> any

Takes a function and a value and applies that function to that value.

``` javascript
applicator(inc)(1) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/applicator.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/applicator.svg?maxAge=2592000&style=flat-square

## @unction/applicators

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (Array<mixed -> mixed> | RecordType<KeyType, mixed -> mixed>)<T> -> (ArrayType | RecordType)<T> -> (ArrayType | RecordType)<T>

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

## @unction/arrayify


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> [any] | Array<any>

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

## @unction/aside

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<mixed => mixed> -> mixed -> mixed

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

## @unction/attach


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> ValueType -> IterableType -> IterableType

A polymorphic way to attach a value to an iterable

``` javascript
attach("hello")("world")({}) // => {hello: "world"}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/attach.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/attach.svg?maxAge=2592000&style=flat-square

## @unction/cascadingKeyChain


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<UnfinishedKeyChainType> -> IterableType -> ValueType

Cascades through multiple keychains in order to arrive at a value. Null keys are replaced with the previous keychain's value.

``` javascript
cascadingKeyChain(
  [
    ["ephemeral", "current", "session"],
    ["resources", "sessions", null, "relationships", "account", "data", "id"],
    ["resources", "accounts", null, "attributes", "name"]
  ]
)(
  {
    ephemeral: {current: {session: "1"}},
    resources: {
      sessions: {
        1: {
          id: "1",
          relationships: {account: {data: {id: "2"}}},
        },
      },
      accounts: {
        2: {
          id: "2",
          attributes: {name: "Kurtis Rainbolt-Greene"},
        },
      },
    },
  }
)
```

returns

``` javascript
"Kurtis Rainbolt-Greene"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/cascadingKeyChain.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/cascadingKeyChain.svg?maxAge=2592000&style=flat-square

## @unction/catchP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> Promise<any> -> Promise<any>

A port of the `Promise.prototype.catch()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/catchP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/catchP.svg?maxAge=2592000&style=flat-square

## @unction/compact


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<any> -> Array<mixed>

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

## @unction/complete

![Tests](https://img.shields.io/travis/unctionjs/complete.svg?maxAge=2592000&style=flat-square)
![Stability](https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square)
![Dependencies](https://img.shields.io/david/unctionjs/complete.svg?maxAge=2592000&style=flat-square)

The complete package of unction functions. See below for documentation.

## @unction/allObjectP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> RecordType => Promise<RecordType>

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

## @unction/allP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<any | Promise<any>> -> Promise<Array<any>>

A port of the `Promise.all()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/allP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/allP.svg?maxAge=2592000&style=flat-square

## @unction/always


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> any -> any

Always returns the value given when called

``` javascript
always(1)() // 1
always(1)(0) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/always.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/always.svg?maxAge=2592000&style=flat-square

## @unction/append


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Array<any> -> Array<any>

Takes a value and puts it at the end of the given list

``` javascript
append(4)([5]) // => [5, 4]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/append.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/append.svg?maxAge=2592000&style=flat-square

## @unction/appendM


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Array<any> -> Array<any>

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

## @unction/applicator


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType -> any) -> any

Takes a function and a value and applies that function to that value.

``` javascript
applicator(inc)(1) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/applicator.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/applicator.svg?maxAge=2592000&style=flat-square

## @unction/applicators

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (Array<mixed -> mixed> | RecordType<KeyType, mixed -> mixed>)<T> -> (ArrayType | RecordType)<T> -> (ArrayType | RecordType)<T>

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

## @unction/arrayify


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> [any] | Array<any>

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

## @unction/aside

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<mixed => mixed> -> mixed -> mixed

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

## @unction/attach


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> ValueType -> IterableType -> IterableType

A polymorphic way to attach a value to an iterable

``` javascript
attach("hello")("world")({}) // => {hello: "world"}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/attach.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/attach.svg?maxAge=2592000&style=flat-square

## @unction/cascadingKeyChain


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<UnfinishedKeyChainType> -> IterableType -> ValueType

Cascades through multiple keychains in order to arrive at a value. Null keys are replaced with the previous keychain's value.

``` javascript
cascadingKeyChain(
  [
    ["ephemeral", "current", "session"],
    ["resources", "sessions", null, "relationships", "account", "data", "id"],
    ["resources", "accounts", null, "attributes", "name"]
  ]
)(
  {
    ephemeral: {current: {session: "1"}},
    resources: {
      sessions: {
        1: {
          id: "1",
          relationships: {account: {data: {id: "2"}}},
        },
      },
      accounts: {
        2: {
          id: "2",
          attributes: {name: "Kurtis Rainbolt-Greene"},
        },
      },
    },
  }
)
```

returns

``` javascript
"Kurtis Rainbolt-Greene"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/cascadingKeyChain.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/cascadingKeyChain.svg?maxAge=2592000&style=flat-square

## @unction/catchP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> Promise<any> -> Promise<any>

A port of the `Promise.prototype.catch()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/catchP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/catchP.svg?maxAge=2592000&style=flat-square

## @unction/compact


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<any> -> Array<mixed>

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

## @unction/complete

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

See: https://github.com/unctionjs/complete

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/complete.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/complete.svg?maxAge=2592000&style=flat-square

## @unction/computedProp


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (IterableType -> mixed) -> KeyChainType -> IterableType -> IterableType

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

## @unction/couple


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> mixed -> [mixed, mixed]

Takes any value and then any value and returns an array containing those values.

``` javascript
couple(4)(5) // => [4, 5]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/couple.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/couple.svg?maxAge=2592000&style=flat-square

## @unction/domEvents


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> DOMEventsConfigurationType -> DOMEventNameType -> DOMStreamType -> DOMEventStreamType

Takes a configuration, an event name, and a DOM source and returns an observable of that event type

``` javascript
domEvents({})("click")(DOM)
```

returns

``` javascript
--click--click--click-->
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/domEvents.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/domEvents.svg?maxAge=2592000&style=flat-square

## @unction/domEventsMany


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> domEventsManyConfigurationType -> (string | Array<DOMEventNameType>) -> DOMEventStreamType

Takes many events or * and returns an observable of those events

``` javascript
domEventsMany({})(["click", "input"])(DOM)
```

returns

``` javascript
--click--input--input--click--input
```

``` javascript
domEventsMany({})("*")(DOM)
```

returns

``` javascript
--click--input--hover--change--click-->
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/domEventsMany.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/domEventsMany.svg?maxAge=2592000&style=flat-square

## @unction/endsWith

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string -> string -> boolean

Determines if a given subset of text is at the end of another set of text.

``` javascript
endsWith("!")("Hello, world!") // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/endsWith.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/endsWith.svg?maxAge=2592000&style=flat-square

## @unction/everyP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (Array<any | Promise<any>>) -> Promise<[ResolvedPromisesType, RejectedPromisesType]>

Returns both resolved and rejected promises as distinct lists.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/everyP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/everyP.svg?maxAge=2592000&style=flat-square

## @unction/flattenTree


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> ((any -> any) -> IterableType -> IterableType) -> (any -> any) -> number -> IterableType -> IterableType

Takes a tree and creates a single object where the root keys are conjoined nested keys.

``` javascript
flattenTree({
  data: {
    profile: {
      name: "Kurtis Rainbolt-Greene"
      age: 24
    },
    metadata: {
      interval: "10s"
    },
    location: "http://api.example.com/profiles/24"
  }
})
```

Would return:

``` javascript
{
  "data-profile-name": "Kurtis Rainbolt-Greene",
  "data-profile-age": 24,
  "data-interval": "10s",
  "data-location": "Kurtis Rainbolt-Greene"
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/flattenTree.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/flattenTree.svg?maxAge=2592000&style=flat-square

## @unction/flip


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> any -> any -> any

Flips a function's first and second arguments.

``` javascript
flip(key)({aaa: "1"})("aaa") // "1"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/flip.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/flip.svg?maxAge=2592000&style=flat-square

## @unction/forEach


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> KeyType -> any) -> IterableType -> IterableType

Takes any kind of iterable object and figures out the best way to iterate over it.

``` javascript
forEach((x) => y)([])
forEach((x) => y)(new Map)
forEach((x) => y)({})
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/forEach.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/forEach.svg?maxAge=2592000&style=flat-square

## @unction/fresh

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType

Takes a iterable and returns an empty fresh version of that iterable.

``` javascript
fresh({aaa: "aaa"}) // {}
fresh(["aaa"]) // []
fresh({}) // {}
fresh([]) // []
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/fresh.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/fresh.svg?maxAge=2592000&style=flat-square

## @unction/hammer


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> IterableType -> IterableType

Use this to de-nest a nested object.

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

## @unction/ifThenElse


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> PredicateType -> (any -> any) -> (any -> any) -> any

Based on a predicate it passes the value to a consequent or alternative function

``` javascript
ifThenElse(isEven)(toString)(toFloat)(1) // 1.0
ifThenElse(isEven)(toString)(toFloat)(2) // "2"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/ifThenElse.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/ifThenElse.svg?maxAge=2592000&style=flat-square

## @unction/isArray


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

Takes any value and then any value and returns an array containing those values.

``` javascript
isArray([]) // => true
isArray({}) // => false
isArray("") // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isArray.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isArray.svg?maxAge=2592000&style=flat-square

## @unction/isIterable


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

Takes any value and then any value and returns an array containing those values.

``` javascript
isIterable({}) // => true
isIterable([]) // => true
isIterable("") // => true
isIterable(1) // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isIterable.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isIterable.svg?maxAge=2592000&style=flat-square

## @unction/isNil


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

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

## @unction/isObject


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

Takes a value and determines if it's an object.

``` javascript
isObject({}) // => true
isObject([]) // => false
isObject("") // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isObject.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isObject.svg?maxAge=2592000&style=flat-square

## @unction/isPopulated


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

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

## @unction/isPresent


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

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

## @unction/isType

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string -> mixed -> boolean

Takes any value and then any value and returns an array containing those values.

``` javascript
isType("Object")({}) // => true
isType("Array")([]) // => true
isType("String")("") // => true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isType.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isType.svg?maxAge=2592000&style=flat-square

## @unction/itself


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> any

Always returns the value given when calling.

``` javascript
itself(1) // 1
itself(1) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/itself.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/itself.svg?maxAge=2592000&style=flat-square

## @unction/key


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> any -> ValueType

Returns the value of a specific key on an iterable. If no key is found it returns undefined. If the second argument isn't an iterable we return undefined, to allow for graceful failure.

``` javascript
key("aaa")({aaa: "1"}) // "1"
key("bbb")({aaa: "1"}) // undefined
key("bbb")(undefined) // undefined
key(0)(["aaa"]) // "aaa"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/key.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/key.svg?maxAge=2592000&style=flat-square

## @unction/keyChain


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyChainType -> TreeType -> ValueType

Takes a chain of keys and a tree, traversing down and reaching the last value. If any part of the chain is undefined or not an object the result will always be undefined.

``` javascript
keyChain(["aaa", "bbb", "ccc"])({aaa: {bbb: {ccc: "1"}}}) // "1"
keyChain(["aaa", "ddd", "ccc"])({aaa: {bbb: {ccc: "1"}}}) // undefined
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/keyChain.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/keyChain.svg?maxAge=2592000&style=flat-square

## @unction/lacksText


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (string | RegExp) -> string -> boolean

Determines if a set of text does not have a subset of text.

``` javascript
const data = "I love pies!"
const lacksBestFood = lacksText("pizza")

lacksBestFood(data) // false
```

``` javascript
const data = "I love pies!"
const lacksPuncation = lacksText(/\!|\?|\./)

lacksPuncation(data) // false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/lacksText.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/lacksText.svg?maxAge=2592000&style=flat-square

## @unction/mapKeys


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (KeyType -> KeyType) -> IterableType -> IterableType

Like ramda's map, but instead of the value it maps over keys.

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

## @unction/mapKeysWithValueKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType => KeyType => KeyType) -> IterableType -> IterableType

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

## @unction/mapValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> IterableType -> IterableType

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

## @unction/mapValuesWithValueKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any => KeyType => any) -> IterableType -> IterableType

Just like map, but gives back the index argument (as an integer, not a string if array)

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mapValuesWithValueKey.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mapValuesWithValueKey.svg?maxAge=2592000&style=flat-square

## @unction/mergeAllLeft

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<IterableType> -> IterableType

Merges a list of iterables (of the same type) into a single iterable.

``` javascript
mergeAllLeft([["0"], ["1"], ["2"]]) // ["2", "1", "0"]
mergeAllLeft([{aaa: "aaa"}, {bbb: "bbb"}, {ccc: "ccc"}]) // {aaa: "aaa", bbb: "bbb", ccc: "ccc",}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeAllLeft.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeAllLeft.svg?maxAge=2592000&style=flat-square

## @unction/mergeAllRight

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<IterableType> -> IterableType

Merges a list of iterables (of the same type) into a single iterable.

``` javascript
mergeAllRight([["0"], ["1"], ["2"]]) // ["0", "1", "2"]
mergeAllRight([{aaa: "aaa"}, {bbb: "bbb"}, {ccc: "ccc"}]) // {aaa: "aaa", bbb: "bbb", ccc: "ccc",}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeAllRight.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeAllRight.svg?maxAge=2592000&style=flat-square

## @unction/mergeDeepLeft

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType => IterableType => IterableType

Recursively merges two objects/arrays. Merges objects with `merge` and arras with concat. Prefers left. THAT IS ALL.

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

## @unction/mergeDeepRight


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType -> IterableType

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

## @unction/mergeLeft


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType -> IterableType

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

## @unction/mergeRight


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType -> IterableType

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

## @unction/mergeWith


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType -> ValueType -> ValueType) -> IterableType -> IterableType -> IterableType

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

## @unction/mergeWithKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (IterableType -> IterableType -> KeyType -> any) -> IterableType -> IterableType -> IterableType

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

## @unction/nestedApply


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> ((any -> any) -> IterableType -> IterableType) -> (any -> any) -> number -> IterableType -> IterableType

Takes a function (the application) that takes function(s) (later referred to as
the inner) and value(s) (`map()`, `forEach()`, `find()`), a function (the inner)
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

## @unction/optimisticP

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<mixed | Promise<mixed>> -> Promise<Array<mixed>>

Will take an array of promises and returns a promise of only the resolved promises.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/optimisticP.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/optimisticP.svg?maxAge=2592000&style=flat-square

## @unction/pairsKeys


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<[string, any]> -> Array<string>

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

## @unction/pairsValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<[KeyType, any]> -> Array<any>

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

## @unction/partition

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> PredicateType -> IterableType -> [IterableType, IterableType]

This function takes an IterableType and returns an array of two IterableTypes,
the first of which contains elements which satisfy the predicate,
the second of which contains element which do not.

``` javascript
partition(isOdd)([1,2,3,4]) // [[1,3],[2,4]]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/partition.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/partition.svg?maxAge=2592000&style=flat-square

## @unction/pluck


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyChainType -> IterableType -> Array<any>

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

## @unction/plucks


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<KeyChainType> -> IterableType -> Array<any>

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

## @unction/prepend


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Array<any> -> Array<any>

Takes a value and puts it at the end of the given list

``` javascript
prepend(4)([5]) // => [4, 5]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/prepend.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/prepend.svg?maxAge=2592000&style=flat-square

## @unction/recordFrom


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyChain -> any -> IterableType

Given a keychain and a value it creates an object that has keys based on the keychain.

``` javascript
recordFrom(["key", "subkey"])("value")
```

Which returns:

``` javascript
{
  key: {
    subkey: "value"
  }
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/recordFrom.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/recordFrom.svg?maxAge=2592000&style=flat-square

## @unction/reduceValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (AccumulatedType -> ValueType -> AccumulatedType) -> InitialType -> IterableType -> AccumulatedType

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

## @unction/reduceWithValueKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (AccumulatedType -> ValueType -> KeyType -> AccumulatedType) -> InitialType -> IterableType -> AccumulatedType

A pretty standard `reduceWithValueKey()`, but where the `𝑓()` is unary curries.

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

## @unction/rejectP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Promise<any>

A port of the `Promise.reject()` function.

Credit: @keithamus


[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/rejectP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/rejectP.svg?maxAge=2592000&style=flat-square

## @unction/replacewhen


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> PredicateType -> ValueType -> IterableType

Replaces values in an iterable with another value based on a predicate.

``` javascript
replaceWhen(isEven)(null)([1, 2, 3]) // [1, null, 3]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/replaceWhen.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/replaceWhen.svg?maxAge=2592000&style=flat-square

## @unction/resolveP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Promise<any>

A port of the `Promise.resolve()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/resolveP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/resolveP.svg?maxAge=2592000&style=flat-square

## @unction/sample


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (string | Array<any>) -> (string | any)

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

## @unction/sampleSize


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> number -> (string | Array<any>) -> (string | any)

Takes an Array or string and randomly picks *n* elements to return, but never the same one.

``` javascript
users() // => [{"id": 1, "name": "Kurtis Rainbolt-Greene"}, {"id": 2, "name": "Angela Englund"}]

sample(1)(users()) // => [{"id": 2, "name": "Angela Englund"}]

sample(2)(users()) // => [{"id": 2, "name": "Angela Englund"}, {"id": 1, "name": "Kurtis Rainbolt-Greene"}]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/sampleSize.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/sampleSize.svg?maxAge=2592000&style=flat-square

## @unction/shuffle


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (string | Array<any>) -> (string | Array<any>)

Takes an Array and returns an Array with the same content, but in a random order.

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

## @unction/splat


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType -> any) -> Array<ValueType> -> any

Takes a function and a list of values and recursively applies the value to the functions.

``` javascript
splat((a) => (b) => a + b)([1, 2]) // 3
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/splat.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/splat.svg?maxAge=2592000&style=flat-square

## @unction/startsWith

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string -> string -> boolean

Determines if a given subset of text is at the start of another set of text.

``` javascript
startsWith("Hello")("Hello, world!") // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/startsWith.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/startsWith.svg?maxAge=2592000&style=flat-square

## @unction/thenCatchP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> (any -> any) -> Promise<any> ->  Promise<any>

A port of the `Promise.prototype.then()` function, but with the extra catch argument.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thenCatchP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thenCatchP.svg?maxAge=2592000&style=flat-square

## @unction/thenP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> Promise<any> -> Promise<any>

A port of the `Promise.prototype.then()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thenP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thenP.svg?maxAge=2592000&style=flat-square

## @unction/thrush


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> (any -> any) -> any

One of the fantasy birds: it takes a value, a function, and then applies that value to as the first argument to that function.

``` javascript
thrush(0)((value) => `${value}`) // "0"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thrush.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thrush.svg?maxAge=2592000&style=flat-square

## @unction/treeify


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<(any -> IterableType -> IterableType)> -> Array<IterableType> -> IterableType

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
const functions = [
  groupBy(key("type")),
  groupBy(keyChain(["attributes", "namespace"])),
  groupBy(keyChain(["attributes", "version"])),
  indexBy(key("id")),
]

treeify(functions)(collection)
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

## @unction/type

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> null | void | {constructor: {name: string}} -> string

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

## @unction/upTo


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> number -> Array<number>

Just takes a maximum and produces an array of 1 to that number.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/upTo.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/upTo.svg?maxAge=2592000&style=flat-square

## @unction/withoutKeyRecursive


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> IterableType -> IterableType

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

## @unction/zip


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ArrayType | ObjectType) -> ArrayType | ObjectType -> ArrayType | ObjectType

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

## @unction/values

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> Array<ValueType>

Takes an iterable and returns it's values.

``` javascript
values({aaa: "111", bbb: "222"}) // ["111", "222"]
values(["aaa", "bbb"]) // ["aaa", "bbb"]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/values.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/values.svg?maxAge=2592000&style=flat-square

## @unction/reduceValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (AccumulatedType -> KeyType -> AccumulatedType) -> InitialType -> IterableType -> AccumulatedType

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

## @unction/keys

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyedIterableType -> Array<KeyType>

Takes a keyed iterable and returns the keys as an Array.

``` javascript
keys({aaa: "111", bbb: "222"}) // ["aaa", "bbb"]
keys(["111", "222"]) // [0, 1]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/keys.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/keys.svg?maxAge=2592000&style=flat-square

## @unction/pipe

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<mixed -> mixed> -> mixed -> mixed

Takes a list of functions and runs a value through that stack from left to right.

``` javascript
pipe([toString, toInteger])(0) // 0
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/pipe.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/pipe.svg?maxAge=2592000&style=flat-square

## @unction/fromArrayToObject

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<[KeyType, ValueType]> => ObjectType

Takes an array that looks like a primitive Object and turns it into a proper object. Duplicate keys get overwritten.

``` javascript
fromArrayToObject([["aaa", "1"], ["bbb", "2"]]) // {aaa: 1, bbb: 2}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/fromArrayToObject.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/fromArrayToObject.svg?maxAge=2592000&style=flat-square


## @unction/computedProp


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (IterableType -> mixed) -> KeyChainType -> IterableType -> IterableType

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

## @unction/couple


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> mixed -> [mixed, mixed]

Takes any value and then any value and returns an array containing those values.

``` javascript
couple(4)(5) // => [4, 5]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/couple.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/couple.svg?maxAge=2592000&style=flat-square

## @unction/domEvents


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> DOMEventsConfigurationType -> DOMEventNameType -> DOMStreamType -> DOMEventStreamType

Takes a configuration, an event name, and a DOM source and returns an observable of that event type

``` javascript
domEvents({})("click")(DOM)
```

returns

``` javascript
--click--click--click-->
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/domEvents.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/domEvents.svg?maxAge=2592000&style=flat-square

## @unction/domEventsMany


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> domEventsManyConfigurationType -> (string | Array<DOMEventNameType>) -> DOMEventStreamType

Takes many events or * and returns an observable of those events

``` javascript
domEventsMany({})(["click", "input"])(DOM)
```

returns

``` javascript
--click--input--input--click--input
```

``` javascript
domEventsMany({})("*")(DOM)
```

returns

``` javascript
--click--input--hover--change--click-->
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/domEventsMany.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/domEventsMany.svg?maxAge=2592000&style=flat-square

## @unction/endsWith

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string -> string -> boolean

Determines if a given subset of text is at the end of another set of text.

``` javascript
endsWith("!")("Hello, world!") // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/endsWith.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/endsWith.svg?maxAge=2592000&style=flat-square

## @unction/everyP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (Array<any | Promise<any>>) -> Promise<[ResolvedPromisesType, RejectedPromisesType]>

Returns both resolved and rejected promises as distinct lists.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/everyP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/everyP.svg?maxAge=2592000&style=flat-square

## @unction/flattenTree


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> ((any -> any) -> IterableType -> IterableType) -> (any -> any) -> number -> IterableType -> IterableType

Takes a tree and creates a single object where the root keys are conjoined nested keys.

``` javascript
flattenTree({
  data: {
    profile: {
      name: "Kurtis Rainbolt-Greene"
      age: 24
    },
    metadata: {
      interval: "10s"
    },
    location: "http://api.example.com/profiles/24"
  }
})
```

Would return:

``` javascript
{
  "data-profile-name": "Kurtis Rainbolt-Greene",
  "data-profile-age": 24,
  "data-interval": "10s",
  "data-location": "Kurtis Rainbolt-Greene"
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/flattenTree.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/flattenTree.svg?maxAge=2592000&style=flat-square

## @unction/flip


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> any -> any -> any

Flips a function's first and second arguments.

``` javascript
flip(key)({aaa: "1"})("aaa") // "1"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/flip.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/flip.svg?maxAge=2592000&style=flat-square

## @unction/forEach


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> KeyType -> any) -> IterableType -> IterableType

Takes any kind of iterable object and figures out the best way to iterate over it.

``` javascript
forEach((x) => y)([])
forEach((x) => y)(new Map)
forEach((x) => y)({})
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/forEach.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/forEach.svg?maxAge=2592000&style=flat-square

## @unction/fresh

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType

Takes a iterable and returns an empty fresh version of that iterable.

``` javascript
fresh({aaa: "aaa"}) // {}
fresh(["aaa"]) // []
fresh({}) // {}
fresh([]) // []
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/fresh.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/fresh.svg?maxAge=2592000&style=flat-square

## @unction/hammer


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> IterableType -> IterableType

Use this to de-nest a nested object.

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

## @unction/ifThenElse


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> PredicateType -> (any -> any) -> (any -> any) -> any

Based on a predicate it passes the value to a consequent or alternative function

``` javascript
ifThenElse(isEven)(toString)(toFloat)(1) // 1.0
ifThenElse(isEven)(toString)(toFloat)(2) // "2"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/ifThenElse.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/ifThenElse.svg?maxAge=2592000&style=flat-square

## @unction/isArray


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

Takes any value and then any value and returns an array containing those values.

``` javascript
isArray([]) // => true
isArray({}) // => false
isArray("") // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isArray.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isArray.svg?maxAge=2592000&style=flat-square

## @unction/isIterable


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

Takes any value and then any value and returns an array containing those values.

``` javascript
isIterable({}) // => true
isIterable([]) // => true
isIterable("") // => true
isIterable(1) // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isIterable.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isIterable.svg?maxAge=2592000&style=flat-square

## @unction/isNil


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

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

## @unction/isObject


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

Takes a value and determines if it's an object.

``` javascript
isObject({}) // => true
isObject([]) // => false
isObject("") // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isObject.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isObject.svg?maxAge=2592000&style=flat-square

## @unction/isPopulated


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

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

## @unction/isPresent


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

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

## @unction/isType

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string -> mixed -> boolean

Takes any value and then any value and returns an array containing those values.

``` javascript
isType("Object")({}) // => true
isType("Array")([]) // => true
isType("String")("") // => true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isType.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isType.svg?maxAge=2592000&style=flat-square

## @unction/itself


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> any

Always returns the value given when calling.

``` javascript
itself(1) // 1
itself(1) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/itself.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/itself.svg?maxAge=2592000&style=flat-square

## @unction/key


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> any -> ValueType

Returns the value of a specific key on an iterable. If no key is found it returns undefined. If the second argument isn't an iterable we return undefined, to allow for graceful failure.

``` javascript
key("aaa")({aaa: "1"}) // "1"
key("bbb")({aaa: "1"}) // undefined
key("bbb")(undefined) // undefined
key(0)(["aaa"]) // "aaa"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/key.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/key.svg?maxAge=2592000&style=flat-square

## @unction/keyChain


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyChainType -> TreeType -> ValueType

Takes a chain of keys and a tree, traversing down and reaching the last value. If any part of the chain is undefined or not an object the result will always be undefined.

``` javascript
keyChain(["aaa", "bbb", "ccc"])({aaa: {bbb: {ccc: "1"}}}) // "1"
keyChain(["aaa", "ddd", "ccc"])({aaa: {bbb: {ccc: "1"}}}) // undefined
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/keyChain.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/keyChain.svg?maxAge=2592000&style=flat-square

## @unction/lacksText


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (string | RegExp) -> string -> boolean

Determines if a set of text does not have a subset of text.

``` javascript
const data = "I love pies!"
const lacksBestFood = lacksText("pizza")

lacksBestFood(data) // false
```

``` javascript
const data = "I love pies!"
const lacksPuncation = lacksText(/\!|\?|\./)

lacksPuncation(data) // false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/lacksText.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/lacksText.svg?maxAge=2592000&style=flat-square

## @unction/mapKeys


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (KeyType -> KeyType) -> IterableType -> IterableType

Like ramda's map, but instead of the value it maps over keys.

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

## @unction/mapKeysWithValueKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType => KeyType => KeyType) -> IterableType -> IterableType

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

## @unction/mapValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> IterableType -> IterableType

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

## @unction/mapValuesWithValueKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any => KeyType => any) -> IterableType -> IterableType

Just like map, but gives back the index argument (as an integer, not a string if array)

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mapValuesWithValueKey.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mapValuesWithValueKey.svg?maxAge=2592000&style=flat-square

## @unction/mergeAllLeft

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<IterableType> -> IterableType

Merges a list of iterables (of the same type) into a single iterable.

``` javascript
mergeAllLeft([["0"], ["1"], ["2"]]) // ["2", "1", "0"]
mergeAllLeft([{aaa: "aaa"}, {bbb: "bbb"}, {ccc: "ccc"}]) // {aaa: "aaa", bbb: "bbb", ccc: "ccc",}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeAllLeft.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeAllLeft.svg?maxAge=2592000&style=flat-square

## @unction/mergeAllRight

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<IterableType> -> IterableType

Merges a list of iterables (of the same type) into a single iterable.

``` javascript
mergeAllRight([["0"], ["1"], ["2"]]) // ["0", "1", "2"]
mergeAllRight([{aaa: "aaa"}, {bbb: "bbb"}, {ccc: "ccc"}]) // {aaa: "aaa", bbb: "bbb", ccc: "ccc",}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeAllRight.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeAllRight.svg?maxAge=2592000&style=flat-square

## @unction/mergeDeepLeft

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType => IterableType => IterableType

Recursively merges two objects/arrays. Merges objects with `merge` and arras with concat. Prefers left. THAT IS ALL.

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

## @unction/mergeDeepRight


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType -> IterableType

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

## @unction/mergeLeft


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType -> IterableType

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

## @unction/mergeRight


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType -> IterableType

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

## @unction/mergeWith


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType -> ValueType -> ValueType) -> IterableType -> IterableType -> IterableType

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

## @unction/mergeWithKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (IterableType -> IterableType -> KeyType -> any) -> IterableType -> IterableType -> IterableType

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

## @unction/nestedApply


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> ((any -> any) -> IterableType -> IterableType) -> (any -> any) -> number -> IterableType -> IterableType

Takes a function (the application) that takes function(s) (later referred to as
the inner) and value(s) (`map()`, `forEach()`, `find()`), a function (the inner)
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

## @unction/optimisticP

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<mixed | Promise<mixed>> -> Promise<Array<mixed>>

Will take an array of promises and returns a promise of only the resolved promises.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/optimisticP.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/optimisticP.svg?maxAge=2592000&style=flat-square

## @unction/pairsKeys


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<[string, any]> -> Array<string>

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

## @unction/pairsValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<[KeyType, any]> -> Array<any>

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

## @unction/partition

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> PredicateType -> IterableType -> [IterableType, IterableType]

This function takes an IterableType and returns an array of two IterableTypes,
the first of which contains elements which satisfy the predicate,
the second of which contains element which do not.

``` javascript
partition(isOdd)([1,2,3,4]) // [[1,3],[2,4]]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/partition.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/partition.svg?maxAge=2592000&style=flat-square

## @unction/pluck


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyChainType -> IterableType -> Array<any>

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

## @unction/plucks


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<KeyChainType> -> IterableType -> Array<any>

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

## @unction/prepend


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Array<any> -> Array<any>

Takes a value and puts it at the end of the given list

``` javascript
prepend(4)([5]) // => [4, 5]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/prepend.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/prepend.svg?maxAge=2592000&style=flat-square

## @unction/recordFrom


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyChain -> any -> IterableType

Given a keychain and a value it creates an object that has keys based on the keychain.

``` javascript
recordFrom(["key", "subkey"])("value")
```

Which returns:

``` javascript
{
  key: {
    subkey: "value"
  }
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/recordFrom.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/recordFrom.svg?maxAge=2592000&style=flat-square

## @unction/reduceValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (AccumulatedType -> ValueType -> AccumulatedType) -> InitialType -> IterableType -> AccumulatedType

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

## @unction/reduceWithValueKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (AccumulatedType -> ValueType -> KeyType -> AccumulatedType) -> InitialType -> IterableType -> AccumulatedType

A pretty standard `reduceWithValueKey()`, but where the `𝑓()` is unary curries.

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

## @unction/rejectP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Promise<any>

A port of the `Promise.reject()` function.

Credit: @keithamus


[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/rejectP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/rejectP.svg?maxAge=2592000&style=flat-square

## @unction/replacewhen


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> PredicateType -> ValueType -> IterableType

Replaces values in an iterable with another value based on a predicate.

``` javascript
replaceWhen(isEven)(null)([1, 2, 3]) // [1, null, 3]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/replaceWhen.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/replaceWhen.svg?maxAge=2592000&style=flat-square

## @unction/resolveP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Promise<any>

A port of the `Promise.resolve()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/resolveP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/resolveP.svg?maxAge=2592000&style=flat-square

## @unction/sample


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (string | Array<any>) -> (string | any)

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

## @unction/sampleSize


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> number -> (string | Array<any>) -> (string | any)

Takes an Array or string and randomly picks *n* elements to return, but never the same one.

``` javascript
users() // => [{"id": 1, "name": "Kurtis Rainbolt-Greene"}, {"id": 2, "name": "Angela Englund"}]

sample(1)(users()) // => [{"id": 2, "name": "Angela Englund"}]

sample(2)(users()) // => [{"id": 2, "name": "Angela Englund"}, {"id": 1, "name": "Kurtis Rainbolt-Greene"}]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/sampleSize.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/sampleSize.svg?maxAge=2592000&style=flat-square

## @unction/shuffle


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (string | Array<any>) -> (string | Array<any>)

Takes an Array and returns an Array with the same content, but in a random order.

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

## @unction/splat


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType -> any) -> Array<ValueType> -> any

Takes a function and a list of values and recursively applies the value to the functions.

``` javascript
splat((a) => (b) => a + b)([1, 2]) // 3
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/splat.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/splat.svg?maxAge=2592000&style=flat-square

## @unction/startsWith

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string -> string -> boolean

Determines if a given subset of text is at the start of another set of text.

``` javascript
startsWith("Hello")("Hello, world!") // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/startsWith.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/startsWith.svg?maxAge=2592000&style=flat-square

## @unction/thenCatchP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> (any -> any) -> Promise<any> ->  Promise<any>

A port of the `Promise.prototype.then()` function, but with the extra catch argument.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thenCatchP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thenCatchP.svg?maxAge=2592000&style=flat-square

## @unction/thenP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> Promise<any> -> Promise<any>

A port of the `Promise.prototype.then()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thenP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thenP.svg?maxAge=2592000&style=flat-square

## @unction/thrush


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> (any -> any) -> any

One of the fantasy birds: it takes a value, a function, and then applies that value to as the first argument to that function.

``` javascript
thrush(0)((value) => `${value}`) // "0"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thrush.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thrush.svg?maxAge=2592000&style=flat-square

## @unction/treeify


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<(any -> IterableType -> IterableType)> -> Array<IterableType> -> IterableType

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
const functions = [
  groupBy(key("type")),
  groupBy(keyChain(["attributes", "namespace"])),
  groupBy(keyChain(["attributes", "version"])),
  indexBy(key("id")),
]

treeify(functions)(collection)
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

## @unction/type

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> null | void | {constructor: {name: string}} -> string

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

## @unction/upTo


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> number -> Array<number>

Just takes a maximum and produces an array of 1 to that number.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/upTo.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/upTo.svg?maxAge=2592000&style=flat-square

## @unction/withoutKeyRecursive


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> IterableType -> IterableType

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

## @unction/zip


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ArrayType | ObjectType) -> ArrayType | ObjectType -> ArrayType | ObjectType

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

## @unction/values

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> Array<ValueType>

Takes an iterable and returns it's values.

``` javascript
values({aaa: "111", bbb: "222"}) // ["111", "222"]
values(["aaa", "bbb"]) // ["aaa", "bbb"]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/values.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/values.svg?maxAge=2592000&style=flat-square

## @unction/reduceValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (AccumulatedType -> KeyType -> AccumulatedType) -> InitialType -> IterableType -> AccumulatedType

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

## @unction/keys

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyedIterableType -> Array<KeyType>

Takes a keyed iterable and returns the keys as an Array.

``` javascript
keys({aaa: "111", bbb: "222"}) // ["aaa", "bbb"]
keys(["111", "222"]) // [0, 1]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/keys.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/keys.svg?maxAge=2592000&style=flat-square

## @unction/pipe

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<mixed -> mixed> -> mixed -> mixed

Takes a list of functions and runs a value through that stack from left to right.

``` javascript
pipe([toString, toInteger])(0) // 0
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/pipe.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/pipe.svg?maxAge=2592000&style=flat-square

## @unction/fromArrayToObject

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<[KeyType, ValueType]> => ObjectType

Takes an array that looks like a primitive Object and turns it into a proper object. Duplicate keys get overwritten.

``` javascript
fromArrayToObject([["aaa", "1"], ["bbb", "2"]]) // {aaa: 1, bbb: 2}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/fromArrayToObject.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/fromArrayToObject.svg?maxAge=2592000&style=flat-square


## @unction/computedProp


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (IterableType -> mixed) -> KeyChainType -> IterableType -> IterableType

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

## @unction/couple


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> mixed -> [mixed, mixed]

Takes any value and then any value and returns an array containing those values.

``` javascript
couple(4)(5) // => [4, 5]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/couple.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/couple.svg?maxAge=2592000&style=flat-square

## @unction/domEvents


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> DOMEventsConfigurationType -> DOMEventNameType -> DOMStreamType -> DOMEventStreamType

Takes a configuration, an event name, and a DOM source and returns an observable of that event type

``` javascript
domEvents({})("click")(DOM)
```

returns

``` javascript
--click--click--click-->
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/domEvents.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/domEvents.svg?maxAge=2592000&style=flat-square

## @unction/domEventsMany


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> domEventsManyConfigurationType -> (string | Array<DOMEventNameType>) -> DOMEventStreamType

Takes many events or * and returns an observable of those events

``` javascript
domEventsMany({})(["click", "input"])(DOM)
```

returns

``` javascript
--click--input--input--click--input
```

``` javascript
domEventsMany({})("*")(DOM)
```

returns

``` javascript
--click--input--hover--change--click-->
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/domEventsMany.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/domEventsMany.svg?maxAge=2592000&style=flat-square

## @unction/endsWith

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string -> string -> boolean

Determines if a given subset of text is at the end of another set of text.

``` javascript
endsWith("!")("Hello, world!") // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/endsWith.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/endsWith.svg?maxAge=2592000&style=flat-square

## @unction/everyP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (Array<any | Promise<any>>) -> Promise<[ResolvedPromisesType, RejectedPromisesType]>

Returns both resolved and rejected promises as distinct lists.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/everyP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/everyP.svg?maxAge=2592000&style=flat-square

## @unction/flattenTree


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> ((any -> any) -> IterableType -> IterableType) -> (any -> any) -> number -> IterableType -> IterableType

Takes a tree and creates a single object where the root keys are conjoined nested keys.

``` javascript
flattenTree({
  data: {
    profile: {
      name: "Kurtis Rainbolt-Greene"
      age: 24
    },
    metadata: {
      interval: "10s"
    },
    location: "http://api.example.com/profiles/24"
  }
})
```

Would return:

``` javascript
{
  "data-profile-name": "Kurtis Rainbolt-Greene",
  "data-profile-age": 24,
  "data-interval": "10s",
  "data-location": "Kurtis Rainbolt-Greene"
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/flattenTree.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/flattenTree.svg?maxAge=2592000&style=flat-square

## @unction/flip


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> any -> any -> any

Flips a function's first and second arguments.

``` javascript
flip(key)({aaa: "1"})("aaa") // "1"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/flip.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/flip.svg?maxAge=2592000&style=flat-square

## @unction/forEach


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> KeyType -> any) -> IterableType -> IterableType

Takes any kind of iterable object and figures out the best way to iterate over it.

``` javascript
forEach((x) => y)([])
forEach((x) => y)(new Map)
forEach((x) => y)({})
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/forEach.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/forEach.svg?maxAge=2592000&style=flat-square

## @unction/fresh

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType

Takes a iterable and returns an empty fresh version of that iterable.

``` javascript
fresh({aaa: "aaa"}) // {}
fresh(["aaa"]) // []
fresh({}) // {}
fresh([]) // []
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/fresh.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/fresh.svg?maxAge=2592000&style=flat-square

## @unction/hammer


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> IterableType -> IterableType

Use this to de-nest a nested object.

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

## @unction/ifThenElse


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> PredicateType -> (any -> any) -> (any -> any) -> any

Based on a predicate it passes the value to a consequent or alternative function

``` javascript
ifThenElse(isEven)(toString)(toFloat)(1) // 1.0
ifThenElse(isEven)(toString)(toFloat)(2) // "2"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/ifThenElse.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/ifThenElse.svg?maxAge=2592000&style=flat-square

## @unction/isArray


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

Takes any value and then any value and returns an array containing those values.

``` javascript
isArray([]) // => true
isArray({}) // => false
isArray("") // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isArray.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isArray.svg?maxAge=2592000&style=flat-square

## @unction/isIterable


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

Takes any value and then any value and returns an array containing those values.

``` javascript
isIterable({}) // => true
isIterable([]) // => true
isIterable("") // => true
isIterable(1) // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isIterable.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isIterable.svg?maxAge=2592000&style=flat-square

## @unction/isNil


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

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

## @unction/isObject


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

Takes a value and determines if it's an object.

``` javascript
isObject({}) // => true
isObject([]) // => false
isObject("") // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isObject.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isObject.svg?maxAge=2592000&style=flat-square

## @unction/isPopulated


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

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

## @unction/isPresent


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

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

## @unction/isType

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string -> mixed -> boolean

Takes any value and then any value and returns an array containing those values.

``` javascript
isType("Object")({}) // => true
isType("Array")([]) // => true
isType("String")("") // => true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isType.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isType.svg?maxAge=2592000&style=flat-square

## @unction/itself


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> any

Always returns the value given when calling.

``` javascript
itself(1) // 1
itself(1) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/itself.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/itself.svg?maxAge=2592000&style=flat-square

## @unction/key


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> any -> ValueType

Returns the value of a specific key on an iterable. If no key is found it returns undefined. If the second argument isn't an iterable we return undefined, to allow for graceful failure.

``` javascript
key("aaa")({aaa: "1"}) // "1"
key("bbb")({aaa: "1"}) // undefined
key("bbb")(undefined) // undefined
key(0)(["aaa"]) // "aaa"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/key.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/key.svg?maxAge=2592000&style=flat-square

## @unction/keyChain


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyChainType -> TreeType -> ValueType

Takes a chain of keys and a tree, traversing down and reaching the last value. If any part of the chain is undefined or not an object the result will always be undefined.

``` javascript
keyChain(["aaa", "bbb", "ccc"])({aaa: {bbb: {ccc: "1"}}}) // "1"
keyChain(["aaa", "ddd", "ccc"])({aaa: {bbb: {ccc: "1"}}}) // undefined
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/keyChain.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/keyChain.svg?maxAge=2592000&style=flat-square

## @unction/lacksText


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (string | RegExp) -> string -> boolean

Determines if a set of text does not have a subset of text.

``` javascript
const data = "I love pies!"
const lacksBestFood = lacksText("pizza")

lacksBestFood(data) // false
```

``` javascript
const data = "I love pies!"
const lacksPuncation = lacksText(/\!|\?|\./)

lacksPuncation(data) // false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/lacksText.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/lacksText.svg?maxAge=2592000&style=flat-square

## @unction/mapKeys


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (KeyType -> KeyType) -> IterableType -> IterableType

Like ramda's map, but instead of the value it maps over keys.

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

## @unction/mapKeysWithValueKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType => KeyType => KeyType) -> IterableType -> IterableType

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

## @unction/mapValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> IterableType -> IterableType

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

## @unction/mapValuesWithValueKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any => KeyType => any) -> IterableType -> IterableType

Just like map, but gives back the index argument (as an integer, not a string if array)

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mapValuesWithValueKey.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mapValuesWithValueKey.svg?maxAge=2592000&style=flat-square

## @unction/mergeAllLeft

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<IterableType> -> IterableType

Merges a list of iterables (of the same type) into a single iterable.

``` javascript
mergeAllLeft([["0"], ["1"], ["2"]]) // ["2", "1", "0"]
mergeAllLeft([{aaa: "aaa"}, {bbb: "bbb"}, {ccc: "ccc"}]) // {aaa: "aaa", bbb: "bbb", ccc: "ccc",}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeAllLeft.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeAllLeft.svg?maxAge=2592000&style=flat-square

## @unction/mergeAllRight

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<IterableType> -> IterableType

Merges a list of iterables (of the same type) into a single iterable.

``` javascript
mergeAllRight([["0"], ["1"], ["2"]]) // ["0", "1", "2"]
mergeAllRight([{aaa: "aaa"}, {bbb: "bbb"}, {ccc: "ccc"}]) // {aaa: "aaa", bbb: "bbb", ccc: "ccc",}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeAllRight.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeAllRight.svg?maxAge=2592000&style=flat-square

## @unction/mergeDeepLeft

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType => IterableType => IterableType

Recursively merges two objects/arrays. Merges objects with `merge` and arras with concat. Prefers left. THAT IS ALL.

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

## @unction/mergeDeepRight


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType -> IterableType

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

## @unction/mergeLeft


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType -> IterableType

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

## @unction/mergeRight


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType -> IterableType

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

## @unction/mergeWith


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType -> ValueType -> ValueType) -> IterableType -> IterableType -> IterableType

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

## @unction/mergeWithKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (IterableType -> IterableType -> KeyType -> any) -> IterableType -> IterableType -> IterableType

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

## @unction/nestedApply


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> ((any -> any) -> IterableType -> IterableType) -> (any -> any) -> number -> IterableType -> IterableType

Takes a function (the application) that takes function(s) (later referred to as
the inner) and value(s) (`map()`, `forEach()`, `find()`), a function (the inner)
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

## @unction/optimisticP

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<mixed | Promise<mixed>> -> Promise<Array<mixed>>

Will take an array of promises and returns a promise of only the resolved promises.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/optimisticP.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/optimisticP.svg?maxAge=2592000&style=flat-square

## @unction/pairsKeys


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<[string, any]> -> Array<string>

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

## @unction/pairsValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<[KeyType, any]> -> Array<any>

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

## @unction/partition

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> PredicateType -> IterableType -> [IterableType, IterableType]

This function takes an IterableType and returns an array of two IterableTypes,
the first of which contains elements which satisfy the predicate,
the second of which contains element which do not.

``` javascript
partition(isOdd)([1,2,3,4]) // [[1,3],[2,4]]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/partition.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/partition.svg?maxAge=2592000&style=flat-square

## @unction/pluck


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyChainType -> IterableType -> Array<any>

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

## @unction/plucks


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<KeyChainType> -> IterableType -> Array<any>

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

## @unction/prepend


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Array<any> -> Array<any>

Takes a value and puts it at the end of the given list

``` javascript
prepend(4)([5]) // => [4, 5]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/prepend.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/prepend.svg?maxAge=2592000&style=flat-square

## @unction/recordFrom


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyChain -> any -> IterableType

Given a keychain and a value it creates an object that has keys based on the keychain.

``` javascript
recordFrom(["key", "subkey"])("value")
```

Which returns:

``` javascript
{
  key: {
    subkey: "value"
  }
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/recordFrom.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/recordFrom.svg?maxAge=2592000&style=flat-square

## @unction/reduceValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (AccumulatedType -> ValueType -> AccumulatedType) -> InitialType -> IterableType -> AccumulatedType

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

## @unction/reduceWithValueKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (AccumulatedType -> ValueType -> KeyType -> AccumulatedType) -> InitialType -> IterableType -> AccumulatedType

A pretty standard `reduceWithValueKey()`, but where the `𝑓()` is unary curries.

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

## @unction/rejectP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Promise<any>

A port of the `Promise.reject()` function.

Credit: @keithamus


[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/rejectP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/rejectP.svg?maxAge=2592000&style=flat-square

## @unction/replacewhen


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> PredicateType -> ValueType -> IterableType

Replaces values in an iterable with another value based on a predicate.

``` javascript
replaceWhen(isEven)(null)([1, 2, 3]) // [1, null, 3]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/replaceWhen.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/replaceWhen.svg?maxAge=2592000&style=flat-square

## @unction/resolveP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Promise<any>

A port of the `Promise.resolve()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/resolveP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/resolveP.svg?maxAge=2592000&style=flat-square

## @unction/sample


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (string | Array<any>) -> (string | any)

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

## @unction/sampleSize


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> number -> (string | Array<any>) -> (string | any)

Takes an Array or string and randomly picks *n* elements to return, but never the same one.

``` javascript
users() // => [{"id": 1, "name": "Kurtis Rainbolt-Greene"}, {"id": 2, "name": "Angela Englund"}]

sample(1)(users()) // => [{"id": 2, "name": "Angela Englund"}]

sample(2)(users()) // => [{"id": 2, "name": "Angela Englund"}, {"id": 1, "name": "Kurtis Rainbolt-Greene"}]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/sampleSize.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/sampleSize.svg?maxAge=2592000&style=flat-square

## @unction/shuffle


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (string | Array<any>) -> (string | Array<any>)

Takes an Array and returns an Array with the same content, but in a random order.

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

## @unction/splat


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType -> any) -> Array<ValueType> -> any

Takes a function and a list of values and recursively applies the value to the functions.

``` javascript
splat((a) => (b) => a + b)([1, 2]) // 3
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/splat.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/splat.svg?maxAge=2592000&style=flat-square

## @unction/startsWith

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string -> string -> boolean

Determines if a given subset of text is at the start of another set of text.

``` javascript
startsWith("Hello")("Hello, world!") // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/startsWith.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/startsWith.svg?maxAge=2592000&style=flat-square

## @unction/thenCatchP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> (any -> any) -> Promise<any> ->  Promise<any>

A port of the `Promise.prototype.then()` function, but with the extra catch argument.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thenCatchP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thenCatchP.svg?maxAge=2592000&style=flat-square

## @unction/thenP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> Promise<any> -> Promise<any>

A port of the `Promise.prototype.then()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thenP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thenP.svg?maxAge=2592000&style=flat-square

## @unction/thrush


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> (any -> any) -> any

One of the fantasy birds: it takes a value, a function, and then applies that value to as the first argument to that function.

``` javascript
thrush(0)((value) => `${value}`) // "0"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thrush.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thrush.svg?maxAge=2592000&style=flat-square

## @unction/treeify


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<(any -> IterableType -> IterableType)> -> Array<IterableType> -> IterableType

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
const functions = [
  groupBy(key("type")),
  groupBy(keyChain(["attributes", "namespace"])),
  groupBy(keyChain(["attributes", "version"])),
  indexBy(key("id")),
]

treeify(functions)(collection)
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

## @unction/type

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> null | void | {constructor: {name: string}} -> string

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

## @unction/upTo


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> number -> Array<number>

Just takes a maximum and produces an array of 1 to that number.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/upTo.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/upTo.svg?maxAge=2592000&style=flat-square

## @unction/withoutKeyRecursive


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> IterableType -> IterableType

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

## @unction/zip


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ArrayType | ObjectType) -> ArrayType | ObjectType -> ArrayType | ObjectType

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

## @unction/values

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> Array<ValueType>

Takes an iterable and returns it's values.

``` javascript
values({aaa: "111", bbb: "222"}) // ["111", "222"]
values(["aaa", "bbb"]) // ["aaa", "bbb"]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/values.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/values.svg?maxAge=2592000&style=flat-square

## @unction/reduceValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (AccumulatedType -> KeyType -> AccumulatedType) -> InitialType -> IterableType -> AccumulatedType

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

## @unction/keys

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyedIterableType -> Array<KeyType>

Takes a keyed iterable and returns the keys as an Array.

``` javascript
keys({aaa: "111", bbb: "222"}) // ["aaa", "bbb"]
keys(["111", "222"]) // [0, 1]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/keys.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/keys.svg?maxAge=2592000&style=flat-square

## @unction/pipe

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<mixed -> mixed> -> mixed -> mixed

Takes a list of functions and runs a value through that stack from left to right.

``` javascript
pipe([toString, toInteger])(0) // 0
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/pipe.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/pipe.svg?maxAge=2592000&style=flat-square

## @unction/fromArrayToObject

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<[KeyType, ValueType]> => ObjectType

Takes an array that looks like a primitive Object and turns it into a proper object. Duplicate keys get overwritten.

``` javascript
fromArrayToObject([["aaa", "1"], ["bbb", "2"]]) // {aaa: 1, bbb: 2}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/fromArrayToObject.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/fromArrayToObject.svg?maxAge=2592000&style=flat-square


## @unction/computedProp


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (IterableType -> mixed) -> KeyChainType -> IterableType -> IterableType

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

## @unction/couple


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> mixed -> [mixed, mixed]

Takes any value and then any value and returns an array containing those values.

``` javascript
couple(4)(5) // => [4, 5]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/couple.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/couple.svg?maxAge=2592000&style=flat-square

## @unction/domEvents


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> DOMEventsConfigurationType -> DOMEventNameType -> DOMStreamType -> DOMEventStreamType

Takes a configuration, an event name, and a DOM source and returns an observable of that event type

``` javascript
domEvents({})("click")(DOM)
```

returns

``` javascript
--click--click--click-->
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/domEvents.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/domEvents.svg?maxAge=2592000&style=flat-square

## @unction/domEventsMany


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> domEventsManyConfigurationType -> (string | Array<DOMEventNameType>) -> DOMEventStreamType

Takes many events or * and returns an observable of those events

``` javascript
domEventsMany({})(["click", "input"])(DOM)
```

returns

``` javascript
--click--input--input--click--input
```

``` javascript
domEventsMany({})("*")(DOM)
```

returns

``` javascript
--click--input--hover--change--click-->
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/domEventsMany.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/domEventsMany.svg?maxAge=2592000&style=flat-square

## @unction/endsWith

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string -> string -> boolean

Determines if a given subset of text is at the end of another set of text.

``` javascript
endsWith("!")("Hello, world!") // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/endsWith.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/endsWith.svg?maxAge=2592000&style=flat-square

## @unction/everyP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (Array<any | Promise<any>>) -> Promise<[ResolvedPromisesType, RejectedPromisesType]>

Returns both resolved and rejected promises as distinct lists.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/everyP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/everyP.svg?maxAge=2592000&style=flat-square

## @unction/flattenTree


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> ((any -> any) -> IterableType -> IterableType) -> (any -> any) -> number -> IterableType -> IterableType

Takes a tree and creates a single object where the root keys are conjoined nested keys.

``` javascript
flattenTree({
  data: {
    profile: {
      name: "Kurtis Rainbolt-Greene"
      age: 24
    },
    metadata: {
      interval: "10s"
    },
    location: "http://api.example.com/profiles/24"
  }
})
```

Would return:

``` javascript
{
  "data-profile-name": "Kurtis Rainbolt-Greene",
  "data-profile-age": 24,
  "data-interval": "10s",
  "data-location": "Kurtis Rainbolt-Greene"
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/flattenTree.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/flattenTree.svg?maxAge=2592000&style=flat-square

## @unction/flip


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> any -> any -> any

Flips a function's first and second arguments.

``` javascript
flip(key)({aaa: "1"})("aaa") // "1"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/flip.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/flip.svg?maxAge=2592000&style=flat-square

## @unction/forEach


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> KeyType -> any) -> IterableType -> IterableType

Takes any kind of iterable object and figures out the best way to iterate over it.

``` javascript
forEach((x) => y)([])
forEach((x) => y)(new Map)
forEach((x) => y)({})
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/forEach.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/forEach.svg?maxAge=2592000&style=flat-square

## @unction/fresh

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType

Takes a iterable and returns an empty fresh version of that iterable.

``` javascript
fresh({aaa: "aaa"}) // {}
fresh(["aaa"]) // []
fresh({}) // {}
fresh([]) // []
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/fresh.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/fresh.svg?maxAge=2592000&style=flat-square

## @unction/hammer


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> IterableType -> IterableType

Use this to de-nest a nested object.

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

## @unction/ifThenElse


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> PredicateType -> (any -> any) -> (any -> any) -> any

Based on a predicate it passes the value to a consequent or alternative function

``` javascript
ifThenElse(isEven)(toString)(toFloat)(1) // 1.0
ifThenElse(isEven)(toString)(toFloat)(2) // "2"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/ifThenElse.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/ifThenElse.svg?maxAge=2592000&style=flat-square

## @unction/isArray


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

Takes any value and then any value and returns an array containing those values.

``` javascript
isArray([]) // => true
isArray({}) // => false
isArray("") // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isArray.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isArray.svg?maxAge=2592000&style=flat-square

## @unction/isIterable


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

Takes any value and then any value and returns an array containing those values.

``` javascript
isIterable({}) // => true
isIterable([]) // => true
isIterable("") // => true
isIterable(1) // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isIterable.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isIterable.svg?maxAge=2592000&style=flat-square

## @unction/isNil


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

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

## @unction/isObject


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

Takes a value and determines if it's an object.

``` javascript
isObject({}) // => true
isObject([]) // => false
isObject("") // => false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isObject.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isObject.svg?maxAge=2592000&style=flat-square

## @unction/isPopulated


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

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

## @unction/isPresent


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> mixed -> boolean

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

## @unction/isType

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string -> mixed -> boolean

Takes any value and then any value and returns an array containing those values.

``` javascript
isType("Object")({}) // => true
isType("Array")([]) // => true
isType("String")("") // => true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/isType.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/isType.svg?maxAge=2592000&style=flat-square

## @unction/itself


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> any

Always returns the value given when calling.

``` javascript
itself(1) // 1
itself(1) // 1
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/itself.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/itself.svg?maxAge=2592000&style=flat-square

## @unction/key


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> any -> ValueType

Returns the value of a specific key on an iterable. If no key is found it returns undefined. If the second argument isn't an iterable we return undefined, to allow for graceful failure.

``` javascript
key("aaa")({aaa: "1"}) // "1"
key("bbb")({aaa: "1"}) // undefined
key("bbb")(undefined) // undefined
key(0)(["aaa"]) // "aaa"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/key.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/key.svg?maxAge=2592000&style=flat-square

## @unction/keyChain


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyChainType -> TreeType -> ValueType

Takes a chain of keys and a tree, traversing down and reaching the last value. If any part of the chain is undefined or not an object the result will always be undefined.

``` javascript
keyChain(["aaa", "bbb", "ccc"])({aaa: {bbb: {ccc: "1"}}}) // "1"
keyChain(["aaa", "ddd", "ccc"])({aaa: {bbb: {ccc: "1"}}}) // undefined
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/keyChain.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/keyChain.svg?maxAge=2592000&style=flat-square

## @unction/lacksText


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (string | RegExp) -> string -> boolean

Determines if a set of text does not have a subset of text.

``` javascript
const data = "I love pies!"
const lacksBestFood = lacksText("pizza")

lacksBestFood(data) // false
```

``` javascript
const data = "I love pies!"
const lacksPuncation = lacksText(/\!|\?|\./)

lacksPuncation(data) // false
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/lacksText.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/lacksText.svg?maxAge=2592000&style=flat-square

## @unction/mapKeys


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (KeyType -> KeyType) -> IterableType -> IterableType

Like ramda's map, but instead of the value it maps over keys.

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

## @unction/mapKeysWithValueKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType => KeyType => KeyType) -> IterableType -> IterableType

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

## @unction/mapValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> IterableType -> IterableType

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

## @unction/mapValuesWithValueKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any => KeyType => any) -> IterableType -> IterableType

Just like map, but gives back the index argument (as an integer, not a string if array)

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mapValuesWithValueKey.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mapValuesWithValueKey.svg?maxAge=2592000&style=flat-square

## @unction/mergeAllLeft

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<IterableType> -> IterableType

Merges a list of iterables (of the same type) into a single iterable.

``` javascript
mergeAllLeft([["0"], ["1"], ["2"]]) // ["2", "1", "0"]
mergeAllLeft([{aaa: "aaa"}, {bbb: "bbb"}, {ccc: "ccc"}]) // {aaa: "aaa", bbb: "bbb", ccc: "ccc",}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeAllLeft.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeAllLeft.svg?maxAge=2592000&style=flat-square

## @unction/mergeAllRight

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<IterableType> -> IterableType

Merges a list of iterables (of the same type) into a single iterable.

``` javascript
mergeAllRight([["0"], ["1"], ["2"]]) // ["0", "1", "2"]
mergeAllRight([{aaa: "aaa"}, {bbb: "bbb"}, {ccc: "ccc"}]) // {aaa: "aaa", bbb: "bbb", ccc: "ccc",}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeAllRight.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeAllRight.svg?maxAge=2592000&style=flat-square

## @unction/mergeDeepLeft

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType => IterableType => IterableType

Recursively merges two objects/arrays. Merges objects with `merge` and arras with concat. Prefers left. THAT IS ALL.

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

## @unction/mergeDeepRight


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType -> IterableType

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

## @unction/mergeLeft


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType -> IterableType

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

## @unction/mergeRight


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> IterableType -> IterableType

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

## @unction/mergeWith


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType -> ValueType -> ValueType) -> IterableType -> IterableType -> IterableType

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

## @unction/mergeWithKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (IterableType -> IterableType -> KeyType -> any) -> IterableType -> IterableType -> IterableType

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

## @unction/nestedApply


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> ((any -> any) -> IterableType -> IterableType) -> (any -> any) -> number -> IterableType -> IterableType

Takes a function (the application) that takes function(s) (later referred to as
the inner) and value(s) (`map()`, `forEach()`, `find()`), a function (the inner)
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

## @unction/optimisticP

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<mixed | Promise<mixed>> -> Promise<Array<mixed>>

Will take an array of promises and returns a promise of only the resolved promises.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/optimisticP.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/optimisticP.svg?maxAge=2592000&style=flat-square

## @unction/pairsKeys


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<[string, any]> -> Array<string>

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

## @unction/pairsValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<[KeyType, any]> -> Array<any>

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

## @unction/partition

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> PredicateType -> IterableType -> [IterableType, IterableType]

This function takes an IterableType and returns an array of two IterableTypes,
the first of which contains elements which satisfy the predicate,
the second of which contains element which do not.

``` javascript
partition(isOdd)([1,2,3,4]) // [[1,3],[2,4]]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/partition.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/partition.svg?maxAge=2592000&style=flat-square

## @unction/pluck


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyChainType -> IterableType -> Array<any>

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

## @unction/plucks


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<KeyChainType> -> IterableType -> Array<any>

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

## @unction/prepend


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Array<any> -> Array<any>

Takes a value and puts it at the end of the given list

``` javascript
prepend(4)([5]) // => [4, 5]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/prepend.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/prepend.svg?maxAge=2592000&style=flat-square

## @unction/recordFrom


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyChain -> any -> IterableType

Given a keychain and a value it creates an object that has keys based on the keychain.

``` javascript
recordFrom(["key", "subkey"])("value")
```

Which returns:

``` javascript
{
  key: {
    subkey: "value"
  }
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/recordFrom.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/recordFrom.svg?maxAge=2592000&style=flat-square

## @unction/reduceValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (AccumulatedType -> ValueType -> AccumulatedType) -> InitialType -> IterableType -> AccumulatedType

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

## @unction/reduceWithValueKey


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (AccumulatedType -> ValueType -> KeyType -> AccumulatedType) -> InitialType -> IterableType -> AccumulatedType

A pretty standard `reduceWithValueKey()`, but where the `𝑓()` is unary curries.

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

## @unction/rejectP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Promise<any>

A port of the `Promise.reject()` function.

Credit: @keithamus


[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/rejectP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/rejectP.svg?maxAge=2592000&style=flat-square

## @unction/replacewhen


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> PredicateType -> ValueType -> IterableType

Replaces values in an iterable with another value based on a predicate.

``` javascript
replaceWhen(isEven)(null)([1, 2, 3]) // [1, null, 3]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/replaceWhen.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/replaceWhen.svg?maxAge=2592000&style=flat-square

## @unction/resolveP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> Promise<any>

A port of the `Promise.resolve()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/resolveP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/resolveP.svg?maxAge=2592000&style=flat-square

## @unction/sample


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (string | Array<any>) -> (string | any)

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

## @unction/sampleSize


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> number -> (string | Array<any>) -> (string | any)

Takes an Array or string and randomly picks *n* elements to return, but never the same one.

``` javascript
users() // => [{"id": 1, "name": "Kurtis Rainbolt-Greene"}, {"id": 2, "name": "Angela Englund"}]

sample(1)(users()) // => [{"id": 2, "name": "Angela Englund"}]

sample(2)(users()) // => [{"id": 2, "name": "Angela Englund"}, {"id": 1, "name": "Kurtis Rainbolt-Greene"}]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/sampleSize.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/sampleSize.svg?maxAge=2592000&style=flat-square

## @unction/shuffle


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (string | Array<any>) -> (string | Array<any>)

Takes an Array and returns an Array with the same content, but in a random order.

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

## @unction/splat


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ValueType -> any) -> Array<ValueType> -> any

Takes a function and a list of values and recursively applies the value to the functions.

``` javascript
splat((a) => (b) => a + b)([1, 2]) // 3
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/splat.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/splat.svg?maxAge=2592000&style=flat-square

## @unction/startsWith

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> string -> string -> boolean

Determines if a given subset of text is at the start of another set of text.

``` javascript
startsWith("Hello")("Hello, world!") // true
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/startsWith.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/startsWith.svg?maxAge=2592000&style=flat-square

## @unction/thenCatchP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> (any -> any) -> Promise<any> ->  Promise<any>

A port of the `Promise.prototype.then()` function, but with the extra catch argument.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thenCatchP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thenCatchP.svg?maxAge=2592000&style=flat-square

## @unction/thenP


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (any -> any) -> Promise<any> -> Promise<any>

A port of the `Promise.prototype.then()` function.

Credit: @keithamus

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thenP.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thenP.svg?maxAge=2592000&style=flat-square

## @unction/thrush


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> any -> (any -> any) -> any

One of the fantasy birds: it takes a value, a function, and then applies that value to as the first argument to that function.

``` javascript
thrush(0)((value) => `${value}`) // "0"
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/thrush.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/thrush.svg?maxAge=2592000&style=flat-square

## @unction/treeify


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<(any -> IterableType -> IterableType)> -> Array<IterableType> -> IterableType

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
const functions = [
  groupBy(key("type")),
  groupBy(keyChain(["attributes", "namespace"])),
  groupBy(keyChain(["attributes", "version"])),
  indexBy(key("id")),
]

treeify(functions)(collection)
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

## @unction/type

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> null | void | {constructor: {name: string}} -> string

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

## @unction/upTo


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> number -> Array<number>

Just takes a maximum and produces an array of 1 to that number.

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/upTo.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/upTo.svg?maxAge=2592000&style=flat-square

## @unction/withoutKeyRecursive


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyType -> IterableType -> IterableType

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

## @unction/zip


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (ArrayType | ObjectType) -> ArrayType | ObjectType -> ArrayType | ObjectType

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

## @unction/values

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> IterableType -> Array<ValueType>

Takes an iterable and returns it's values.

``` javascript
values({aaa: "111", bbb: "222"}) // ["111", "222"]
values(["aaa", "bbb"]) // ["aaa", "bbb"]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/values.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/values.svg?maxAge=2592000&style=flat-square

## @unction/reduceValues


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> (AccumulatedType -> KeyType -> AccumulatedType) -> InitialType -> IterableType -> AccumulatedType

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

## @unction/keys

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> KeyedIterableType -> Array<KeyType>

Takes a keyed iterable and returns the keys as an Array.

``` javascript
keys({aaa: "111", bbb: "222"}) // ["aaa", "bbb"]
keys(["111", "222"]) // [0, 1]
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/keys.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/keys.svg?maxAge=2592000&style=flat-square

## @unction/pipe

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<mixed -> mixed> -> mixed -> mixed

Takes a list of functions and runs a value through that stack from left to right.

``` javascript
pipe([toString, toInteger])(0) // 0
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/pipe.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/pipe.svg?maxAge=2592000&style=flat-square

## @unction/fromArrayToObject

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> Array<[KeyType, ValueType]> => ObjectType

Takes an array that looks like a primitive Object and turns it into a proper object. Duplicate keys get overwritten.

``` javascript
fromArrayToObject([["aaa", "1"], ["bbb", "2"]]) // {aaa: 1, bbb: 2}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/fromArrayToObject.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/fromArrayToObject.svg?maxAge=2592000&style=flat-square

