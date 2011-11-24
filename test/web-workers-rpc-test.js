(function() {
  var Boss, Hire, RpcGeneral, WebWorkersRpc;
  WebWorkersRpc = dModule.require("web-workers-rpc");
  RpcGeneral = dModule.require("rpc-general");
  Boss = WebWorkersRpc.Boss;
  Hire = WebWorkersRpc.Hire;
  describe("hire", function() {
    var hire;
    hire = null;
    beforeEach(function() {
      return hire = new Hire;
    });
    it("shou have an instance of a real web worker and set it up with rpc", function() {
      spyOn(window, "Worker").andReturn({
        a: 1
      });
      hire = new Hire("fakeWorkerScript.js");
      expect(window.Worker).toHaveBeenCalledWith("fakeWorkerScript.js");
      expect(hire.worker.a).toEqual(1);
      expect(hire instanceof RpcGeneral).toBe(true);
      return expect(hire.worker.onmessage).toBe(hire.receiveMethod);
    });
    it("should know the correct send method for the web worker", function() {
      spyOn(hire.worker, "postMessage");
      hire.sendMethod("hello world");
      return expect(hire.worker.postMessage).toHaveBeenCalledWith("hello world");
    });
    return it("should know how to receive a message", function() {
      spyOn(hire, "receive");
      hire.receiveMethod({
        data: "yow"
      });
      return expect(hire.receive).toHaveBeenCalledWith("yow");
    });
  });
  describe("boss", function() {
    var boss, self;
    WebWorkersRpc = dModule.require("web-workers-rpc");
    Boss = WebWorkersRpc.Boss;
    self = {
      postMessage: function() {}
    };
    boss = null;
    beforeEach(function() {
      return boss = new Boss(self);
    });
    it("should have a reference to self", function() {
      boss = new Boss(self);
      return expect(boss.self).toEqual(self);
    });
    it("should have a receiveMethod that goes to rpc", function() {
      boss = new Boss(self);
      expect(boss instanceof RpcGeneral).toBe(true);
      return expect(boss.self.onmessage).toBe(boss.receiveMethod);
    });
    it("should have a sendMethod that works", function() {
      spyOn(boss.self, "postMessage");
      boss.sendMethod("test");
      return expect(boss.self.postMessage).toHaveBeenCalledWith("test");
    });
    return it("should have a receiveMethod that works", function() {
      spyOn(boss, "receive");
      boss.receiveMethod({
        data: "stuff"
      });
      return expect(boss.receive).toHaveBeenCalledWith("stuff");
    });
  });
}).call(this);
