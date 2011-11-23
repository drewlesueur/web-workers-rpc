(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  dModule.define("rpc-general", function() {
    var RpcGeneral;
    return RpcGeneral = (function() {
      function RpcGeneral() {
        this.send = __bind(this.send, this);
        this.receive = __bind(this.receive, this);
        this.setMethods = __bind(this.setMethods, this);
        this.setCallingMethod = __bind(this.setCallingMethod, this);
        this.uuid = __bind(this.uuid, this);        this.callbacks = {};
        this.methods = {};
      }
      RpcGeneral.prototype.uuid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});;
      };
      RpcGeneral.prototype.setCallingMethod = function(method) {
        return this.callingMethod = method;
      };
      RpcGeneral.prototype.setMethods = function(methods) {
        return this.methods = methods;
      };
      RpcGeneral.prototype.receive = function(obj) {
        var cb, error, id, method, params, result, _base, _base2;
        if (obj.result || obj.error) {
          result = obj.result, error = obj.error, id = obj.id;
          if (typeof (_base = this.callbacks)[id] === "function") {
            _base[id](error, result);
          }
          return delete this.callbacks[id];
        } else if (obj.method) {
          method = obj.method, params = obj.params, id = obj.id;
          cb = __bind(function(err, result) {
            return this.send({
              result: result,
              error: err,
              id: id
            });
          }, this);
          if (typeof (_base2 = this.methods)[method] === "function") {
            _base2[method](params, cb);
          }
          return cb;
        }
      };
      RpcGeneral.prototype.send = function(method, args, callback) {
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
