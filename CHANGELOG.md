## 0.0.6 (2015-04-23)

 - add `$eval` helper

## 0.0.5 (2015-04-17)

 - make possible to provide raw array as first argument for $in and $nin helpers

## 0.0.4 (2015-04-10)

#### Breaking changes

 - change global scope helpers logic. New syntax is ```{{$Session.a}}``` or ```{{$Meteor.userId}}``` instead of ```{{$.Session.a}}``` or ```{{$.Meteor.userId}}```. This is made for better API consistency and performance.

## 0.0.3 (2015-04-09)

#### Breaking changes

 - change Session helper logic. New syntax is ```{{$.Session.a}}```, that means you can combine it with other helpers (e.g. ```{{$eq $.Session.a 5}}``` returns true when ```Session.get('a') === 5```).

## 0.0.2 (2015-04-08)

 - make possible for $and, $or and $nor to take infinite number of arguments

## 0.0.1 (2015-04-07)
  
Initial release.
