/**
 * @author Marenin Alex
 * September 2012
 */

module( 'Single parent inheritance' );


test( 'Class creation', function(){
	ok( typeof declare == 'function', 'declare function exists' );

	var Super = declare( null, {
		init: function( param ){
			this.param = param;
		},
		getParam: function(){
			return this.param;
		},
		setParam: function( value ){
			this.param = value;
		}
	});

	ok( typeof Super === 'function', 'Test whether Super is Constructor' );

	var s = new Super( 10 );
	ok( typeof s === 'object', 'Check type of instance' );
	equal( 10, s.getParam(), 'Check param value(10)' );

	s.setParam( 20 );
	equal( 20, s.getParam(), 'Check param value(20)' );
});


test( 'Inheritance', function(){
	var Super = declare( null, {
			init: function( param ){
				this.param = param;
			},
			getParam: function(){
				return this.param;
			},
			setParam: function( value ){
				this.param = value;
			}
		}),
		Child = declare( Super, {
			init: function( param ){
				this.base();
				this.param ++;
			},
			setParam: function( value ){
				this.base();
				this.param --;
			}
		}),
		ChildChild = declare( Child, {
			getParam: function(){
				return this.base() * 2;
			}
		}),
		child = new Child( 10 ),
		child2 = new ChildChild( 10 );

	equal( 11, child.getParam(), 'Check for base method' );

	child.setParam( 20 );
	equal( 19, child.getParam(), 'Check for base method 2' );

	equal( 22, child2.getParam(), 'Check for base method 3' );

	child2.setParam( 10 );
	equal( 18, child2.getParam(), 'Check for base method 4' );
});