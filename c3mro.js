/**
 * @author Marenin Alex
 * June, September 2012
 */

(function( global ){

	/**
	 * Linearization using C3MRO algorithm (see http://www.python.org/download/releases/2.3/mro/)
	 * if class A extends B,C,D then L[A] = [A] + merge( L[B], L[C], L[D], [B,C,D] );
	 * @param {Function} Class
	 * @return {Array}
	 */
	function linearize( Class ){
		var mergeArgs = [],
			parents = Class.getParents();

		if ( !(parents && parents.length) )
			return [];

		if ( parents.length === 1 )
			return [Class].concat( parents[0].mro() );

		// Prepare merge arguments
		parents.forEach( function( parent ){
			var mro = parent.mro();
			if ( mro && mro.length )
				mergeArgs.push( mro );
		});
		mergeArgs.push( parents );

		return [Class].concat( merge(mergeArgs) );
	}


	/**
	 * @param {Array} lists
	 * @return Array
	 */
	function merge( lists ){

		if ( lists.length === 0 )
			return [];
		// Simple parent inheritance
		else if ( lists.length === 1 )
			return lists[0];

		var result = [],
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
			if ( (lists[i].length == 1 && lists[i][0] === value) || lists[i].lastIndexOf(value) > 0 )
				return true;

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
