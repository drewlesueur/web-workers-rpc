(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  dModule.define("rpc-general", function() {
    var RpcGeneral;
    return RpcGeneral = (function() {
      function RpcGeneral() {
        this.makeRequest = __bind(this.makeRequest, this);
        this.receiveResponse = __bind(this.receiveResponse, this);
        this.setCallingMethod = __bind(this.setCallingMethod, this);
        this.uuid = __bind(this.uuid, this);        this.callbacks = {};
      }
      RpcGeneral.prototype.uuid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});;
      };
      RpcGeneral.prototype.setCallingMethod = function(method) {
        return this.callingMethod = method;
      };
      RpcGeneral.prototype.receiveResponse = function(obj) {
        var error, id, result, _base;
        result = obj.result, error = obj.error, id = obj.id;
        if (typeof (_base = this.callbacks)[id] === "function") {
          _base[id](error, result);
        }
        return delete this.callbacks[id];
      };
      RpcGeneral.prototype.makeRequest = function(method, args, callback) {
        this.lastId = this.uuid();
        this.callbacks[this.lastId] = callback;
        return this.callingMethod({
          method: method,
          params: args,
          id: this.lastId
        });
      };
      return RpcGeneral;
    })();
  });
}).call(this);
