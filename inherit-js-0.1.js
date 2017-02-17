/**
 * Simple prototype inheritance
 * @param {Function} from
 */
Function.prototype.inherit = function(from){
    var thisProto = this.prototype;
    var fromProto = from.prototype;
    for (var i in fromProto){
        if (i != 'constructor' && fromProto.hasOwnProperty(i) && !thisProto.hasOwnProperty(i)){
            thisProto[i] = fromProto[i];
        }
    }

    if (!fromProto.__parent){
        thisProto.__parent = [from];
    }else{
        thisProto.__parent = fromProto.__parent.concat([from]);
    }

    thisProto.Parent = Function.prototype.Parent;

    // Copies arbitrarily set properties as well
    for (i in from){
        if (from.hasOwnProperty(i)){
            this[i] = from[i];
        }
    }
};
/**
 * Invokes a parent class method
 * @param {string|null} method Method name
 * @param {Array} args Method arguments
 * @param {Function} sourceClass The class that originated the call
 * @constructor
 */
Function.prototype.Parent = function(method, args, sourceClass){
    var parent;
    if (sourceClass === this.constructor){
        parent = this.__parent[this.__parent.length-1];
    }else{
        var idx = this.__parent.indexOf(sourceClass);
        if (idx > 0){
            parent = this.__parent[idx-1];
        }
    }
    if (!parent){
        throw "Couldn't find source class in inheritance stack";
    }

    if (parent && !method) {
        parent.apply(this, args);
    }else if (parent && parent.prototype[method]){
        if (parent.prototype[method] instanceof Function)
            return parent.prototype[method].apply(this, args);
    }
};

/**
 * @param obj
 * @returns {boolean}
 */
Function.prototype.IsInstance = function(obj){
    if (obj.constructor === this) return true;
    if (obj.__parent){
        return obj.__parent.indexOf(this) !== -1;
    }
    return false;
};
Function.prototype.IsParent = function(constructor){
    if (constructor === this) return true;
    if ((constructor instanceof Function) && constructor.prototype.__parent){
        return constructor.prototype.__parent.indexOf(this) !== -1;
    }
    return false;
};