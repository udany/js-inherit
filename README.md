# js-inherit
Enables basic polymorfism in JS.

## Example usage
```javascript
function A(){
    this.x = 15;
}
A.prototype.f = function(){ this.x += 10; };

function B(){
    this.Parent(null, arguments);
}
B.inherit(A);
B.prototype.f2 = function(){ this.x -= 5; };

function C(){
    this.Parent(null, arguments);
    this.x = 30;
}
C.inherit(B);

var test = new A();
test.f();
//{x: 25}

var test2 = new B();
test.f();
test.f2();
//{x: 20}

var test3 = new C();
test.f();
test.f2();
//{x: 35}
```