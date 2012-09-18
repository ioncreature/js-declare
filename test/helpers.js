/**
 * @author Marenin Alex
 * September 2012
 */

function slice( val ){
	return Array.prototype.slice.apply( val );
}


/**
 * @param {Array} parents
 * @return {Object}
 */
function makeMockClass( parents ){
	var Class = {};

	Class.getParents = function(){
		return parents;
	};

	return Class;
}


function makeMockParentClass( name, mro ){
	var Parent = new String( name );
	Parent.mro = function(){
		return mro;
	};
	return Parent;
}


function mroToString( l ){
	var str = '';
	l.forEach( function( val ){
		str += ' ' + val.toString();
	});
	return str;
}