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

	// function for calling overridden methods
	function inherited( methodName, args ){
		var p = Object.getPrototypeOf( this),
			ctor = p.constructor,
			_super = ctor._super;

		console.log( ctor );
		return;
		if ( p[methodName] )
			return p[methodName].apply( this, args );
	}

	// Yeeaah!
	function declare( parents, newProto ){

		var Cls = function(){
			if ( !(this instanceof Cls) )
				throw new SyntaxError( "Constructor must be called with 'new' statement" );

			if ( this.init && typeof this.init == 'function' )
				this.init.apply( this, Array.prototype.slice.call(arguments) );
		};

		// Passed only new class prototype
		if ( arguments.length == 1 ){
			extend( Cls.prototype, parents );
			Cls.prototype.inherited = inherited;
		}

		// For single parent inheritance
		else if ( arguments.length == 2 && typeof parents == 'function' && typeof newProto == 'object' ){
			Parent.prototype = parents.prototype;
			Cls.prototype = new Parent;
			Cls.prototype.constructor = Cls;
			extend( Cls.prototype, newProto );
			Cls._super = parents;
		}

		// For multiple inheritance: passed parents list and new class prototype
		else if ( arguments.length == 2 && parents instanceof Array && typeof newProto == 'object' ){
			// TODO: add c3mro
		}

		else
			throw Error( 'Wrong parameters' );

		return Cls;
	}


	// register as AMD module if possible, or add to global scope
	if ( global.define && global.define.amd )
		define( [], function(){
			return declare;
		});
	else
		global.declare = declare;
})( this );
