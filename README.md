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

## Usage
_Better usage description and examples are on the way._
```handlebars
              {{!-- true if --}}
{{$eq a b}}   {{!-- a equals b --}}
{{$ne a b}}   {{!-- a doesn't equal b --}}
{{$gt a b}}   {{!-- a is greater than b --}}
{{$gte a b}}  {{!-- a is greater than or equals b --}}
{{$lt a b}}   {{!-- a is less than b --}}
{{$lte a b}}  {{!-- a is less than or equals b --}}
{{$in a b}}   {{!-- a contains b --}}
{{$nin a b}}  {{!-- a doesn't contain b --}}
{{$and ...}}  {{!-- all arguments are truthy --}}
{{$or ...}}   {{!-- at least one argument is truthy --}}
{{$nor ...}}  {{!-- none of arguments are truthy --}}
{{$exists a}} {{!-- a exists (is not undefined) --}}

<ul>
  {{!-- iterable can be array, object or cursor --}}
  {{each $ iterable}}

    {{#if $first}}
      <li>first item</li>
    {{/if}}

    <li>{{$index}}: {{.}}</li>

    {{#if $last}}
      <li>last item</li>
    {{/if}}

  {{/each}}
</ul>

{{$.Meteor.userId}}
{{!-- any property of Meteor object that is available on the client --}}

{{$.Session.a}}
{{!-- same as Session.get('a') outside helpers. Is reactive.
Can be combined with other helpers (e.g. {{$eq $.Session.a 5}}) --}}
```
