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

	var obj  = new Ctor( 100 ),
		obj2 = new Ctor( 101 );

	try {
		var obj3 = Ctor( 102 );
		ok( false, 'Construction of object must use "new" statement' );
	}
	catch ( e ){
		equal( e.message, "Constructor must be called with 'new' statement" );
	}

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
				this.val -= val;
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

    console.log( obj1, obj2, obj3 );

	ok( obj1.init, 'obj1 has init method' );
	ok( obj2.init, 'obj2 has init method' );
	ok( obj2.add,  'obj2 has add method' );
	ok( obj3.init, 'obj3 has init method' );
	ok( obj3.add,  'obj3 has add method' );
	ok( obj3.sub,  'obj3 has sub method' );

	obj2.add( 10 );
	equal( obj2.val, 210, 'check for add methods' );

	obj3.add( 10 );
	obj3.sub( 1 );
	equal( obj3.val, 309, 'check for add and sub methods' );
});


test( 'Using inherited method', function(){
    var Class = declare({
			init: function( val ){
				this.val = val;
			},
            add: function( val ){
                this.val += val;
            }
		}),
		Subclass = declare( Class, {
            add: function add( val ){
				add.parent.apply( this, arguments );
                this.val += val;
            }
		}),
		Subsubclass = declare( Subclass, {
            add: function add( val ){
				add.parent.apply( this, arguments );
                this.val += val;
            }
		}),
		obj1 = new Class( 100 ),
		obj2 = new Subclass( 200 ),
		obj3 = new Subsubclass( 300 );

    obj1.add( 1 );
    equal( obj1.val, 101, 'add 1 without calling parent' );

    obj2.add( 1 );
    equal( obj2.val, 202, 'add 1 with calling overridden method' );

	obj3.add( 1 );
    equal( obj3.val, 303, 'add 1 with calling overridden method' );
});