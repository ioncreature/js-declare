/**
 * Marenin Alex
 * June 2012
 */

(function(){
//	"use strict";
	var glob = this;

	function declare( parents, newProto ){

		var Cls = function(){
			if ( this.init && typeof this.init == 'function' )
				this.init.apply( this, Array.prototype.slice.call(arguments) );
		};

		// passed only new class prototype
		if ( arguments.length == 1 ){
			var proto = parents,
				k;

			for ( k in proto ) if ( proto.hasOwnProperty(k) )
				Cls.prototype[k] = proto[k];
		}


		// For single parent inheritance
		else if ( arguments.length == 2 && typeof parents == 'function' && typeof newProto == 'object' ){
			var P = function(){};
			P.prototype = parents.prototype;
			Cls.prototype = new P;
			Cls.prototype.constructor = Cls;
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
	if ( glob.define && glob.define.amd )
		define( [], function(){
			return declare;
		});
	else
		glob.declare = declare;
})();

