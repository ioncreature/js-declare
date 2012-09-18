/**
 * @author Marenin Alex
 * June 2012
 */

(function( global ){

	/**
	 * @param {Array|Arguments} array - array-like object
	 * @param {int?} start
	 * @param {int?} end
	 * @return {Array}
	 */
	function slice( array, start, end ){
		return Array.prototype.slice.call( array, start || 0, end );
	}


	var C3 = {

		lists: null,

		/**
		 * Linearization using C3MRO algorithm (see http://www.python.org/download/releases/2.3/mro/)
		 * if class A extends B,C,D then L[A] = A + merge( L[B], L[C], L[D], [B,C,D] );
		 * @param {function} Class
		 * @return {Array}
		 */
		linearize: function( Class ){
			var mergeArgs = [],
				parents = Class.getParents();

			if ( !(parents && parents.length) )
				return [];

			// Prepare merge arguments
			parents.forEach( function( parent ){
				mergeArgs.push( parent.mro() );
			});
			mergeArgs.push( parents );

			return [Class].concat( this.merge.apply(this, mergeArgs) );
		},


		/**
		 * @param {...Array}
		 */
		merge: function(){

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
				while ( this.existsInTails(currentHead, lists) || i < lists.length );

				// check for errors
				if ( this.existsInTails(currentHead, lists) )
					throw new Error( 'Incorrect inheritance graph' );

				result.push( currentHead );
				lists = this.removeFromHeads( currentHead, lists );
				currentHead = lists[0][0];
			}

			return result;
		},


		existsInTails: function( value, lists ){
			for ( var i = 0; i < lists.length; i++ )
				if ( lists.lastIndexOf(value) > 0 )
					return i;

			return false;
		},


		removeFromHeads: function( head, lists ){
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
	};


	// register as AMD module if possible, or add to global scope
	if ( typeof define !== 'undefined' && define.amd )
		define( [], function(){
			return C3.linearize;
		});
	else
		global.c3mro = C3.linearize;

})( this );
