/**
 * @author Marenin Alex
 * September 2012
 */

(function( global ){

	function base(){
		var descendant = arguments.callee.caller,
			args = arguments.length ? arguments : descendant.arguments,
			ancestor = descendant._class.Super.prototype[descendant._name];
		return isFn( ancestor ) && ancestor.apply( this, args );
	}

	function mixin( Ctor, source ){
		var prototype = Ctor.prototype,
			k;
		for ( k in source ) if ( source.hasOwnProperty(k) ){
			prototype[k] = source[k];
			if ( isFn(prototype[k]) ){
				prototype[k]._name = k;
				prototype[k]._class = Ctor;
			}
		}
	}

	function isFn( val ){
		return typeof val === 'function';
	}

	/**
	 * Simple classy single parent inheritance
	 * @param {Function?} Parent
	 * @param {Object} prototype
	 */
	function declare( Parent, prototype ){
		function Tmp(){}
		function Ctor(){
			if ( isFn(this.init) )
				this.init.apply( this, arguments );
		}

		if ( isFn(Parent) ){
			Tmp.prototype = Parent.prototype;
			Ctor.prototype = new Tmp;
			Ctor.Super = Parent;
		}

		mixin( Ctor, prototype );
		Ctor.prototype.constructor = Ctor;
		Ctor.prototype.base = base;

		return Ctor;
	}

	// register as AMD module if possible, or add to global scope
	if ( typeof define !== 'undefined' && define.amd )
		define( [], function(){
			return declare;
		});
	else
		global.declare = declare;

})( this );