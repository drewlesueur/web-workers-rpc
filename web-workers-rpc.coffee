dModule.define "web-workers-rpc", ->
  RpcGeneral = dModule.require "rpc-general"

  class Hire extends RpcGeneral
    constructor: (file) -> 
      super()
      @worker = new Worker(file)
      @worker.onmessage = @receiveMethod

    receiveMethod: (event) =>
      console.log "received"
      console.log event.data
      @receive event.data

    sendMethod: (args...) =>
      @worker.postMessage args...

  class Boss extends RpcGeneral
    constructor: (@self) ->
      super()
      @self.onmessage = @receiveMethod
      
    sendMethod: (args...) =>
      @self.postMessage args...

    receiveMethod: (event) =>
      @receive event.data


      

  return {Boss, Hire}
