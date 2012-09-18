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
	var D = makeMockClass( 'D', null, [] ),
		C = makeMockClass( 'C', null, [D] ),
		B = makeMockClass( 'B', null, [C, D] ),
		A = makeMockClass( 'A', [D] ),
		A2 = makeMockClass( 'A2', [C] ),
		A3 = makeMockClass( 'A3', [B] ),
		mroA = c3mro( A ),
		mroA2 = c3mro( A2 ),
		mroA3 = c3mro( A3 );

	equal( mroToString(mroA), 'A D', 'L[A] = [A, D]' );
	equal( mroToString(mroA2), 'A2 C D', 'L[A2] = [A2, C, D]' );
	equal( mroToString(mroA3), 'A3 B C D', 'L[A3] = [A3, B, C, D]' );
});