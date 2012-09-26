/**
 * @author Marenin Alex
 * September 2012
 */

module( 'C3 Linearization(mro)' );


test( 'Check for existence', function(){
	ok( typeof c3mro === 'function' );
});


test( 'Linearization without parents', function(){
	var A = makeMockClass( 'A', [] ),
		mroA = c3mro( A );

	deepEqual( mroA, [A], 'L[A] = [A]. Check that linearization of class without parents is class itself' );
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


test( 'Simple linearization with two parents', function(){
	var P1 = makeMockClass( 'P1', null, [] ),
		P2 = makeMockClass( 'P2', null, [] ),
		C = makeMockClass( 'C', [P1, P2] ),
		mroC = c3mro( C );

	equal( mroToString(mroC), 'C P1 P2', 'L[C] = [C, P1, P2]' );
});


test( 'Simple diamond linearization', function(){
	var SP = makeMockClass( 'SP' ),
		P1 = makeMockClass( 'P1', null, [SP] ),
		P2 = makeMockClass( 'P2', null, [SP] ),
		C = makeMockClass( 'C', [P1, P2] ),
		mroC = c3mro( C );

	equal( mroToString(mroC), 'C P1 P2 SP', 'L[C] = [C, P1, P2, SP]' );
});