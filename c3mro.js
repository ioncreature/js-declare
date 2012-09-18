/**
 * @author Marenin Alex
 * June 2012
 */

(function( global ){

	/**
	 * Linearization using C3MRO algorithm (see http://www.python.org/download/releases/2.3/mro/)
	 * if class A extends B,C,D then L[A] = A + merge( L[B], L[C], L[D], [B,C,D] );
	 * @param {Function} Class
	 * @return {Array}
	 */
	function linearize( Class ){
		var mergeArgs = [],
			parents = Class.getParents();

		if ( !(parents && parents.length) )
			return [];

		// Prepare merge arguments
		parents.forEach( function( parent ){
			mergeArgs.push( parent.mro() );
		});
		mergeArgs.push( parents );

		return [Class].concat( merge(mergeArgs) );
	}


	/**
	 * @param {...Array}
	 */
	function merge(){
		if ( arguments.length === 0 )
			return [];
		// Simple parent inheritance
		else if ( arguments.length === 1 )
			return arguments[0];

		var result = [],
			lists = slice( arguments ),
			currentHead,
			i;

		while ( lists.length ){
			// find available head
			i = 0;
			do {
				currentHead = lists[i][0];
				i++;
			}
			while ( existsInTails(currentHead, lists) || i < lists.length );

			// check for errors
			if ( existsInTails(currentHead, lists) )
				throw new Error( 'Incorrect inheritance graph' );

			result.push( currentHead );
			lists = removeFromHeads( currentHead, lists );
			currentHead = lists[0][0];
		}

		return result;
	}


	function existsInTails( value, lists ){
		for ( var i = 0; i < lists.length; i++ )
			if ( lists.lastIndexOf(value) > 0 )
				return i;

		return false;
	}


	function removeFromHeads( head, lists ){
		return lists
			.map( function( list ){
				if ( list[0] === head )
					list.shift();
				return list;
			})
			.filter( function( list ){
				return list.length !== 0;
			});
	}


	/**
	 * @param {Array|Arguments} array
	 * @return {Array}
	 */
	function slice( array ){
		return Array.prototype.slice.call( array );
	}


	// register as AMD module if possible, or add to global scope
	if ( typeof define !== 'undefined' && define.amd )
		define( [], function(){
			return linearize;
		});
	else
		global.c3mro = linearize;

})( this );
