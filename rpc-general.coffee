dModule.define "rpc-general", ->
  class RpcGeneral
    constructor: ->
      @callbacks = {}

    uuid: =>
      #http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
      `'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});` 
            
    setCallingMethod: (method) => 
      @callingMethod = method
    
    receiveResponse: (obj) =>
      {result, error, id} = obj 
      @callbacks[id]?(error, result)
      delete @callbacks[id]

    makeRequest: (method, args, callback) =>
      @lastId = @uuid()
      @callbacks[@lastId] = callback

      @callingMethod
        method: method
        params: args
        id: @lastId

