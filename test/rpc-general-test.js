(function() {
  describe("RpcGeneral", function() {
    var Rpc, rpc;
    Rpc = dModule.require("rpc-general");
    rpc = new Rpc();
    it("should do an rpc request and receive response", function() {
      var id, myCallback, theError, theResult;
      rpc.setCallingMethod(function() {});
      spyOn(rpc, "callingMethod");
      theError = null;
      theResult = null;
      myCallback = function(err, result) {
        theError = err;
        return theResult = result;
      };
      rpc.makeRequest("someCoolMethod", ["arg1", "arg2"], myCallback);
      expect(rpc.lastId).toBeTruthy();
      id = rpc.lastId;
      expect(rpc.callbacks[id]).toBe(myCallback);
      expect(rpc.callingMethod).toHaveBeenCalledWith({
        method: "someCoolMethod",
        params: ["arg1", "arg2"],
        id: id
      });
      expect(theResult).toBe(null);
      rpc.receiveResponse({
        result: [1, "two"],
        error: null,
        id: id
      });
      expect(theResult).toEqual([1, "two"]);
      expect(theError).toBe(null);
      return expect(rpc.callbacks[id]).not.toBeTruthy();
    });
    return it("should do an rpc request and receive response with an error", function() {
      var id, myCallback, theError, theResult;
      rpc.setCallingMethod(function() {});
      spyOn(rpc, "callingMethod");
      theError = null;
      theResult = null;
      myCallback = function(err, result) {
        theError = err;
        return theResult = result;
      };
      rpc.makeRequest("someCoolMethod", ["arg1", "arg2"], myCallback);
      id = rpc.lastId;
      rpc.receiveResponse({
        result: null,
        error: "an error",
        id: id
      });
      expect(theResult).toEqual(null);
      return expect(theError).toBe("an error");
    });
  });
}).call(this);
