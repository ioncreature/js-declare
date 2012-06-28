/**
 * Marenin Alex
 * June 2012
 */

(function( global ){
	"use strict";

	//
	function Parent(){}

	// object extending
	function extend( to, from ){
		for ( var k in from ) if ( from.hasOwnProperty(k) )
			to[k] = from[k];
	}

	// Yeeaah!
	function declare( parents, newProto ){

		var Cls = function(){
			if ( !(this instanceof Cls) )
				throw new SyntaxError( "Constructor must be called with 'new' statement" );

			if ( this.init && typeof this.init == 'function' )
				this.init.apply( this, Array.prototype.slice.call(arguments, 0) );
		};

		// Passed only new class prototype
		if ( arguments.length == 1 )
			extend( Cls.prototype, parents );

		// For single parent inheritance
		else if ( arguments.length == 2 && typeof parents == 'function' && typeof newProto == 'object' ){
			Parent.prototype = parents.prototype;
			Cls.prototype = new Parent;
			Cls.prototype.constructor = Cls;
			extend( Cls.prototype, newProto );

			for ( var k in Cls.prototype ) if ( Cls.prototype.hasOwnProperty(k) )
				if ( typeof Cls.prototype[k] == 'function' && typeof parents.prototype[k] == 'function' )
					Cls.prototype[k].parent = parents.prototype[k];
		}

		// For multiple inheritance: passed parents list and new class prototype
		else if ( arguments.length == 2 && parents instanceof Array && typeof newProto == 'object' ){
			// TODO: add c3mro
		}

		else
			throw Error( 'declare :: Wrong parameters' );

		return Cls;
	}


	// register as AMD module if possible, or add to global scope
	if ( typeof define !== 'undefined' && define.amd )
		define( [], function(){
			return declare;
		});
	else
		global.declare = declare;
})( this );
