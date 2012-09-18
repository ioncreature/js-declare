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

	deepEqual( linearization, [], 'Check than linearization of class without parents is empty' );
});


test( 'Linearization with single parent', function(){
	var B = makeMockParentClass( 'B', [] ),
		C = makeMockParentClass( 'C', [B] ),
		A = makeMockClass([ B ]),
		A2 = makeMockClass([ C ]),
		mroA = c3mro( A ),
		mroA2 = c3mro( A2 );

	equal( 'B', mroToString(mroA), 'Checks that linearization of A is [A, B]' );
	equal( 'CB', mroToString(mroA2), 'Checks that linearization of A2 is [A2, C, B]' );
});