/**
 * @author Marenin Alex
 * September 2012
 */

/**
 * @param {String} name
 * @param {Array|null} parents
 * @param {Array?} mro
 * @return Function
 */
function makeMockClass( name, parents, mro ){
	var Class = function(){};

	Class.toString = function(){
		return name;
	};

	if ( parents )
		Class.getParents = function(){
			return parents;
		};

	if ( mro )
		Class.mro = function(){
			return mro && mro.length ? [Class].concat(mro) : Class;
		};

	return Class;
}


function mroToString( l ){
	return l.join( ' ' );
}