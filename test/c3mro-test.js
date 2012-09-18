/**
 * @author Marenin Alex
 * September 2012
 */

module( 'C3 Linearization(mro)' );

test( 'Check for existence', function(){
	ok( typeof c3mro === 'function' );
});


test( 'Linearization without parents', function(){
	var Class = {
			getParents: function(){
				return [];
			}
		},
		linearization = c3mro( Class );

	deepEqual( linearization, [], 'Check that linearization of class without parents is empty' );
});


test( 'Linearization with single parent', function(){
	var C = makeMockClass( 'C', null, [] ),
		B = makeMockClass( 'B', null, [C] ),
		A = makeMockClass( 'A', [C] ),
		A2 = makeMockClass( 'A2', [B] ),
		mroA = c3mro( A ),
		mroA2 = c3mro( A2 );

	equal( mroToString(mroA), 'A C', 'Checks that linearization of A is [A, B]' );
	equal( mroToString(mroA2), 'A2 B C', 'Checks that linearization of A2 is [A2, C, B]' );
});