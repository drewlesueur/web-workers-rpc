(function() {
  var Boss, Hire, WebWorkersRpc;
  WebWorkersRpc = dModule.require("web-workers-rpc");
  Boss = WebWorkersRpc.Boss;
  Hire = WebWorkersRpc.Hire;
  describe("Boss", function() {
    var boss;
    boss = null;
    beforeEach(function() {});
    it("shou have an instance of a real web worker", function() {
      spyOn(window, "Worker").andReturn({
        a: 1
      });
      boss = new Boss("fakeWorkerScript.js");
      expect(window.Worker).toHaveBeenCalledWith("fakeWorkerScript.js");
      return expect(boss.worker).toEqual({
        a: 1
      });
    });
    return it("shou");
  });
  describe("Hire", function() {
    WebWorkersRpc = dModule.require("web-workers-rpc");
    Boss = WebWorkersRpc.Boss;
    Hire = WebWorkersRpc.Hire;
    return it("should have a reference to self", function() {
      var hire;
      hire = new Hire({
        a: 1
      });
      return expect(hire.self).toEqual({
        a: 1
      });
    });
  });
}).call(this);
