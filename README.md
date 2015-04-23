# spacekit
A Spacebars helpers kit.

**Note:** This is a very early release, implementation may be changed dramatically in further versions.

_I promise to follow semver as soon as it hits 0.1.0._

## Installation
`meteor add evenfrost:spacekit`

## Features
Helpers are named after MongoDB [comparison](http://docs.mongodb.org/manual/reference/operator/query-comparison/) and [logical](http://docs.mongodb.org/manual/reference/operator/query-logical/) query operators.

`$each` with `$index`, `$first` and `$last` keys is available.

`Meteor` and `Session` variables are available.

## Available helpers
#### $eq a b
Returns true if `a` equals `b`.
```handlebars
{{#if $eq 42 42}}
  <p>True.</p>
{{/if}}
```
#### $ne a b
Returns true if `a` doesn't equal `b`.
```handlebars
{{#if $ne 1 42}}
  <p>True.</p>
{{/if}}
```
#### $gt a b
Returns true if `a` is greater than `b`.
```handlebars
{{#if $gt 42 1}}
  <p>True.</p>
{{/if}}
```
#### $gte a b
Returns true if `a` is greater than or equals `b`.
```handlebars
{{#if $gte 42 1}}
  <p>True.</p>
{{/if}}
```
#### $lt a b
Returns true if `a` is less than `b`.
```handlebars
{{#if $lt 1 42}}
  <p>True.</p>
{{/if}}
```
#### $lte a b
Returns true if `a` is less than or equals `b`.
```handlebars
{{#if $lte 1 42}}
  <p>True.</p>
{{/if}}
```
#### $in arr b
Returns true if `arr` contains `b`.

`arr` is array provided either as helper variable or raw string ( e.g. `'["foo", 42, "bar"]'`).
```handlebars
{{#if $in '["foo", 42, "bar"]' 42}}
  <p>True.</p>
{{/if}}
```
#### $nin arr b
Returns true if `arr` doesn't contain `b`.
```handlebars
{{#if $nin '["foo", 42, "bar"]' 'baz'}}
  <p>True.</p>
{{/if}}
```
#### $and ...
Returns true if all arguments are truthy.
```handlebars
{{#if $and true 42 'foo' 'bar'}}
  <p>True.</p>
{{/if}}
```
#### $or ...
Returns true if at least one argument is truthy.
```handlebars
{{#if $or false 0 undefined true}}
  <p>True.</p>
{{/if}}
```
#### $nor ...
Returns true if none of arguments are truthy.
```handlebars
{{#if $or false 0 undefined}}
  <p>True.</p>
{{/if}}
```
#### $exists a
Returns true if `a` exists (is not undefined).
```handlebars
{{#if $exists 42}}
  <p>True.</p>
{{/if}}
```
#### $eval str
Evaluates a string expression and returns its result.
Should be used [carefully](http://stackoverflow.com/questions/197769/when-is-javascripts-eval-not-evil).
```handlebars
<p>{{$eval '1 + 42'}}</p> {{!-- <p>43</p> --}}

{{#if $eval "42 > 1 && 'bar' !== 'foo'"}}
  <p>True.</p>
{{/if}}
```
#### $ iterable
Iterates over array, object or cursor.

Provides additional inner helpers such as `$first`, `$last` and `$index`.
```handlebars
<ul>
  {{#each $ iterable}}

    {{#if $first}}
      <li>first item</li>
    {{/if}}

    <li>{{$index}}: {{.}}</li>

    {{#if $last}}
      <li>last item</li>
    {{/if}}

  {{/each}}
</ul>
```

#### $Meteor
Provides access to any property of Meteor object that is available on the client.
```handlebars
<p>{{$Meteor.userId}}</p> {{!-- <p>LmHYCh3PQGTS72C3br</p> --}}

{{#if $Meteor.loggingIn}}
 <p>Still logging in...</p>
{{/if}}
```

#### $Session
An object which keys are currently defined `Session` variables.

`{{$Session.a}}` is the same as `Session.get('a')` outside helpers. Is reactive.
Can be combined with other helpers.
```handlebars
{{!-- Session.set('a', 42) somewhere --}}

<p>{{$Session.a}}</p> {{!-- <p>42</p> --}}

{{#if $eq $Session.a 42}}
  <p>True.</p>
{{/if}}
```
