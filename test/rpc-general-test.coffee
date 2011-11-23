describe "RpcGeneral", ->
  Rpc = dModule.require("rpc-general")
  rpc = new Rpc() 
 
  it "should do an rpc request and receive response", ->
    rpc.setCallingMethod -> 
    spyOn rpc, "callingMethod"
    theError = null
    theResult = null
    myCallback = (err, result) ->
      theError = err
      theResult = result

    rpc.makeRequest "someCoolMethod", ["arg1", "arg2"], myCallback
    expect(rpc.lastId).toBeTruthy()
    id = rpc.lastId
    expect(rpc.callbacks[id]).toBe(myCallback)
    expect(rpc.callingMethod).toHaveBeenCalledWith
      method: "someCoolMethod"
      params: ["arg1", "arg2"] 
      id: id

    expect(theResult).toBe(null)

    rpc.receiveResponse
      result: [1, "two"]
      error: null
      id: id 

    expect(theResult).toEqual([1, "two"])
    expect(theError).toBe(null)
    expect(rpc.callbacks[id]).not.toBeTruthy()

  it "should do an rpc request and receive response with an error", ->
    rpc.setCallingMethod -> 
    spyOn rpc, "callingMethod"
    theError = null
    theResult = null
    myCallback = (err, result) ->
      theError = err
      theResult = result

    rpc.makeRequest "someCoolMethod", ["arg1", "arg2"], myCallback
    id = rpc.lastId
    rpc.receiveResponse
      result: null
      error: "an error"
      id: id 

    expect(theResult).toEqual(null)
    expect(theError).toBe("an error")



