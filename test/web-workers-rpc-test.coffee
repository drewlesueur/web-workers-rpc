WebWorkersRpc = dModule.require("web-workers-rpc") 
Boss = WebWorkersRpc.Boss 
Hire = WebWorkersRpc.Hire


describe "Boss", ->
  boss = null
  beforeEach ->
  

  it "shou have an instance of a real web worker", ->
    spyOn(window, "Worker").andReturn({a:1})
    boss = new Boss("fakeWorkerScript.js")
    expect(window.Worker).toHaveBeenCalledWith "fakeWorkerScript.js"
    expect(boss.worker).toEqual({a: 1})

  it "shou"


describe "Hire", ->
  WebWorkersRpc = dModule.require("web-workers-rpc") 
  Boss = WebWorkersRpc.Boss 
  Hire = WebWorkersRpc.Hire

  it "should have a reference to self", ->
    hire = new Hire a:1
    expect(hire.self).toEqual a:1
