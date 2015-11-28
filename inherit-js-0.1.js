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
Function.prototype.Parent = function(method, args){
    if (this._parentDepth === null || typeof this._parentDepth === 'undefined'){
        this._parentDepth = 0;
    }else{
        this._parentDepth += 1;
    }
    if (!this._parent.length-this._parentDepth > 0) {console.error('Parent call stack overflow.'); return;}

    var parent = this._parent[this._parent.length-this._parentDepth-1];

    if (parent && !method) {
        parent.apply(this, args);
    }else if (parent && parent.prototype[method]){
        parent.prototype[method].apply(this, args);
    }

    if (this._parentDepth){
        this._parentDepth -= 1;
    }else{
        this._parentDepth = null;
    }
};
