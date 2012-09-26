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


test( 'Full featured linearization', function(){
	/*
	A
	|\
	B \
	|\ \
	D C E
	|/_/
	O
	 */
	var O = makeMockClass( 'O' ),
		D = makeMockClass( 'D', null, [O] ),
		C = makeMockClass( 'C', null, [O] ),
		E = makeMockClass( 'E', null, [O] ),
		B = makeMockClass( 'B', null, [C, D, O] ),
		A = makeMockClass( 'A', [B, E] ),
		mroA = c3mro( A );

	equal( mroToString(mroA), 'A B C D E O', 'L[A] = [A, B, C, D, E, O]' );
});


test( 'Full featured linearization 2', function(){
	/*
	A _
	|  \
	B _ \
	|\ \|
	C D E
	|/_/
	O
	 */
	var O = makeMockClass( 'O' ),
		D = makeMockClass( 'D', null, [O] ),
		C = makeMockClass( 'C', null, [O] ),
		E = makeMockClass( 'E', null, [O] ),
		B = makeMockClass( 'B', null, [C, D, E, O] ),
		A = makeMockClass( 'A', [B, E] ),
		mroA = c3mro( A );

	equal( mroToString(mroA), 'A B C D E O', 'L[A] = [A, B, C, D, E, O]' );
});


test( 'Full featured linearization 3', function(){
	/*
	B-->A
	|\ /
	C D
	|/
	O
	 */
	var O = makeMockClass( 'O' ),
		D = makeMockClass( 'D', null, [O] ),
		C = makeMockClass( 'C', null, [O] ),
		B = makeMockClass( 'B', null, [C, D, O] ),
		A = makeMockClass( 'A', [B, D] ),
		mroA = c3mro( A );

	equal( mroToString(mroA), 'A B C D O', 'L[A] = [A, B, C, D, O]' );
});


test( 'Incorrect inheritance graph', function(){
	var O = makeMockClass( 'O' ),
		X = makeMockClass( 'X', null, [O] ),
		Y = makeMockClass( 'Y', null, [O] ),
		A = makeMockClass( 'A', null, [X, Y, O] ),
		B = makeMockClass( 'B', null, [Y, X, O] ),
		C = makeMockClass( 'C', [A, B] );

	try {
		c3mro( C );
		ok( false, 'It is impossible!' );
	}
	catch ( e ){
		equal( e.message, 'Incorrect inheritance graph', 'Throws an error on incorrect graph' );
	}
});