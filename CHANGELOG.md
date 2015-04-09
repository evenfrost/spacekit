## 0.0.3 (2015-04-09)

#### Breaking changes

 - change Session helper logic. New syntax is ```{{$.Session.a}}```, that means you can combine it with other helpers (e.g. ```{{$eq $.Session.a 5}}``` returns true when ```Session.get('a') === 5```).

## 0.0.2 (2015-04-08)

 - make possible for $and, $or and $nor to take infinite number of arguments

## 0.0.1 (2015-04-07)
  
Initial release.
