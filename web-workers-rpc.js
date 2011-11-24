(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __slice = Array.prototype.slice;
  dModule.define("web-workers-rpc", function() {
    var Boss, Hire, RpcGeneral;
    RpcGeneral = dModule.require("rpc-general");
    Hire = (function() {
      __extends(Hire, RpcGeneral);
      function Hire(file) {
        this.sendMethod = __bind(this.sendMethod, this);
        this.receiveMethod = __bind(this.receiveMethod, this);        Hire.__super__.constructor.call(this);
        this.worker = new Worker(file);
        this.worker.onmessage = this.receiveMethod;
      }
      Hire.prototype.receiveMethod = function(event) {
        return this.receive(event.data);
      };
      Hire.prototype.sendMethod = function() {
        var args, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (_ref = this.worker).postMessage.apply(_ref, args);
      };
      return Hire;
    })();
    Boss = (function() {
      __extends(Boss, RpcGeneral);
      function Boss(self) {
        this.self = self;
        this.receiveMethod = __bind(this.receiveMethod, this);
        this.sendMethod = __bind(this.sendMethod, this);
        Boss.__super__.constructor.call(this);
        this.self.onmessage = this.receiveMethod;
      }
      Boss.prototype.sendMethod = function() {
        var args, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (_ref = this.self).postMessage.apply(_ref, args);
      };
      Boss.prototype.receiveMethod = function(event) {
        return this.receive(event.data);
      };
      return Boss;
    })();
    return {
      Boss: Boss,
      Hire: Hire
    };
  });
}).call(this);
