/**
 * Marenin Alex
 * June 2012
 */

(function(){
	"use strict";
	var glob = this;

	function declare( parentClasses, newProto ){
		// passed only new class prototype
		if ( arguments.length == 1 ){
			var proto = parentClasses,
				Cls = function(){
					if ( this.init && typeof this.init == 'function' )
						this.init.apply( this, Array.prototype.slice.call(arguments) );
				},
				k;

			for ( k in proto ) if ( proto.hasOwnProperty(k) )
				Cls.prototype[k] = proto[k];
			Cls.prototype.constructor = Cls;
			return Cls;
		}

		else if ( arguments.length == 2 && parentClasses instanceof Array && typeof newProto == 'object' ){
			// TODO: add c3mro
		}
	}


	// register as AMD module if possible, or add to global scope
	if ( glob.define && glob.define.amd )
		define( [], function(){
			return declare;
		});
	else
		glob.declare = declare;
})();

