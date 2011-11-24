describe "RpcGeneral", ->
  Rpc = dModule.require("rpc-general")
  rpc = new Rpc() 
 
  it "should send an rpc request and receive response", ->
    rpc.setSendMethod -> 
    spyOn rpc, "sendMethod"
    theError = null
    theResult = null
    myCallback = (err, result) ->
      theError = err
      theResult = result

    rpc.send "someCoolMethod", ["arg1", "arg2"], myCallback
    expect(rpc.lastId).toBeTruthy()
    id = rpc.lastId
    expect(rpc.callbacks[id]).toBe(myCallback)
    expect(rpc.sendMethod).toHaveBeenCalledWith
      method: "someCoolMethod"
      params: ["arg1", "arg2"] 
      id: id

    expect(theResult).toBe(null)

    rpc.receive
      result: [1, "two"]
      error: null
      id: id 

    expect(theResult).toEqual([1, "two"])
    expect(theError).toBe(null)
    expect(rpc.callbacks[id]).not.toBeTruthy()

  it "should send an rpc request and receive response with an error", ->
    rpc.setSendMethod -> 
    spyOn rpc, "sendMethod"
    theError = null
    theResult = null
    myCallback = (err, result) ->
      theError = err
      theResult = result

    rpc.send "someCoolMethod", ["arg1", "arg2"], myCallback
    id = rpc.lastId
    rpc.receive
      result: null
      error: "an error"
      id: id 

    expect(theResult).toEqual(null)
    expect(theError).toBe("an error")


  it "should recieve a request and send a response", ->
    methods = sayHi: (name, cb) ->
        cb null, "hi #{name}"
    rpc.setMethods methods
    expect(rpc.methods).toBe methods

    spyOn rpc.methods, "sayHi" 

    cb = rpc.receive    
      method: "sayHi"
      params: "drew" 
      id: "123"

    expect(rpc.methods.sayHi).toHaveBeenCalledWith("drew", cb)

    spyOn rpc, "sendMethod"
    cb(null, "Hi drew")

    expect(rpc.sendMethod).toHaveBeenCalledWith
      error: null
      result: "Hi drew"
      id: "123"

  
  it "should recieve a request and send a response with an error", ->
    methods = sayHi: (name, cb) ->
        cb null, "hi #{name}"
    rpc.setMethods methods
    expect(rpc.methods).toBe methods

    spyOn rpc.methods, "sayHi" 

    cb = rpc.receive    
      method: "sayHi"
      params: "drew" 
      id: "123"

    expect(rpc.methods.sayHi).toHaveBeenCalledWith("drew", cb)

    spyOn rpc, "sendMethod"
    cb("another error", null)

    expect(rpc.sendMethod).toHaveBeenCalledWith
      error: "another error"
      result: null
      id: "123"

  #TODO: should bind and trigger in rpc as well!
  xit "should send a trigger event", ->
  xit "should send a bind event", ->
  xit "should receive a trigger event", ->
  xit "should receive a bind event", ->
   


