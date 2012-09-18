/**
 * @author Marenin Alex
 * September 2012
 */

function slice( val ){
	return Array.prototype.slice.apply( val );
}


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
			return mro;
		};

	return Class;
}


function mroToString( l ){
	return l.join( ' ' );
}