/**
 * @author Marenin Alex
 * June 2012
 */

module( 'Class creation' );

test( 'Simple class creation', function(){
	ok( typeof declare == 'function', 'Declare function exists' );

	var Ctor = declare({
		primitive: 200,
		byRef: { a: 300 },
		init: function( x ){
			this.x = x;
		},
		sum: function( value ){
			return this.x + value;
		}
	});

	ok( typeof Ctor == 'function', 'Constructor must be a function' );
	ok( typeof Ctor.prototype.init == 'function', 'Init must be in constructor prototype' );

	var obj  = new Ctor( 100 );
	var obj2 = new Ctor( 101 );

	ok( obj instanceof Ctor, 'Check instanceof operator' );
	strictEqual( obj.x, 100, 'Check for instance property' );
	strictEqual( obj.primitive, obj2.primitive, 'Check for class primitive property' );
	deepEqual( obj.byRef, obj2.byRef, 'Check for class object property' );
	ok( !obj.hasOwnProperty('primitive') && !obj.hasOwnProperty('byRef'), 'Class properties must be in prototype' );
	ok( typeof obj.sum == 'function', 'Check for class method "sum"' );
	strictEqual( obj.sum(100), 200, 'Check class method' );
});


test( 'Extending classes', function(){
	var Class = declare({
			init: function( val ){
				this.val = val;
			}
		}),
		Subclass = declare( Class, {
			add: function( val ){
				this.val += val;
			}
		}),
		Subsubclass = declare( Subclass, {
			sub: function( val ){
				this.value -= val;
			}
		}),
		obj1 = new Class( 100 ),
		obj2 = new Subclass( 200 ),
		obj3 = new Subsubclass( 300 );

	ok( obj1 instanceof Class, 'obj1 instanceof Class' );
	ok( obj2 instanceof Class, 'obj2 instanceof Class' );
	ok( obj2 instanceof Subclass, 'obj2 instanceof Subclass' );
	ok( obj3 instanceof Class, 'obj3 instanceof Class' );
	ok( obj3 instanceof Subclass, 'obj3 instanceof Subclass' );
	ok( obj3 instanceof Subsubclass, 'obj3 instanceof Subsubclass' );
});