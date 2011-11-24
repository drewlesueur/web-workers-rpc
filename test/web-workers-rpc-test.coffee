WebWorkersRpc = dModule.require("web-workers-rpc") 
RpcGeneral = dModule.require("rpc-general")
Boss = WebWorkersRpc.Boss 
Hire = WebWorkersRpc.Hire


describe "hire", ->
  hire = null
  beforeEach ->
    hire = new Hire

  it "shou have an instance of a real web worker and set it up with rpc", ->
    spyOn(window, "Worker").andReturn({a:1})
    hire = new Hire("fakeWorkerScript.js")
    expect(window.Worker).toHaveBeenCalledWith "fakeWorkerScript.js"
    expect(hire.worker.a).toEqual(1)
    expect(hire instanceof RpcGeneral).toBe(true)
    expect(hire.worker.onmessage).toBe(hire.receiveMethod)

  
  it "should know the correct send method for the web worker", ->
    spyOn hire.worker, "postMessage"
    hire.sendMethod("hello world") 
    expect(hire.worker.postMessage).toHaveBeenCalledWith(
      "hello world" 
    )
  
  it "should know how to receive a message", ->
    spyOn hire, "receive"
    hire.receiveMethod({data: "yow"})
    expect(hire.receive).toHaveBeenCalledWith("yow")
    

describe "boss", ->
  WebWorkersRpc = dModule.require("web-workers-rpc") 
  Boss = WebWorkersRpc.Boss
  self =
    postMessage: ->
  boss = null
  beforeEach ->
    boss = new Boss self
  
  it "should have a reference to self", ->
    boss = new Boss self
    expect(boss.self).toEqual self

  it "should have a receiveMethod that goes to rpc", ->
    boss = new Boss self
    expect(boss instanceof RpcGeneral).toBe(true)
    expect(boss.self.onmessage).toBe(boss.receiveMethod)

  it "should have a sendMethod that works", ->
    spyOn boss.self, "postMessage" 
    boss.sendMethod("test")
    expect(boss.self.postMessage).toHaveBeenCalledWith("test")

  it "should have a receiveMethod that works", ->
    spyOn boss, "receive"
    boss.receiveMethod data: "stuff"
    expect(boss.receive).toHaveBeenCalledWith("stuff")

