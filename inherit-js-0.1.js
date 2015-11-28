/**
 * Simple prototype inheritance
 * @param from Function
 */
Function.prototype.inherit = function(from){
    var thisProto = this.prototype;
    var fromProto = from.prototype;
    for (var i in fromProto){
        if (i != 'constructor' && fromProto.hasOwnProperty(i) && !thisProto.hasOwnProperty(i)){
            thisProto[i] = fromProto[i];
        }
    }

    if (!fromProto._parent){
        thisProto._parent = [from];
    }else{
        thisProto._parent = fromProto._parent.concat([from]);
    }

    thisProto.Parent = Function.prototype.Parent;
};
/**
 * Invokes a parent class method
 * @param method Method name
 * @param args Method arguments
 * @constructor
 */
Function.prototype.Parent = function(method, args, sourceClass){
    var parent;
    if (sourceClass === this.constructor){
        parent = this._parent[this._parent.length-1];
    }else{
        var idx = this._parent.indexOf(sourceClass);
        if (idx > 0){
            parent = this._parent[idx-1];
        }
    }
    if (!parent){
        throw "Couldn't find source class in inheritance stack";
    }

    if (parent && !method) {
        parent.apply(this, args);
    }else if (parent && parent.prototype[method]){
        parent.prototype[method].apply(this, args);
    }
};