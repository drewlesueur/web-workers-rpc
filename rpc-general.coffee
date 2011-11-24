dModule.define "rpc-general", ->
  class RpcGeneral
    constructor: ->
      @callbacks = {}
      @methods = {}

    uuid: =>
      #http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
      `'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});` 
            
    setSendMethod: (method) => 
      @sendMethod = method

    setMethods: (methods) =>
      @methods = methods
    
    receive: (obj) =>
      if obj.result or obj.error
        {result, error, id} = obj 
        @callbacks[id]?(error, result)
        delete @callbacks[id]
      else if obj.method
        {method, params, id} = obj 
        cb = (err, result) =>
          @sendMethod
            result: result
            error: err
            id: id

        @methods[method]? params, cb
        return cb

    send: (method, args, callback) =>
      @lastId = @uuid()
      @callbacks[@lastId] = callback

      @sendMethod
        method: method
        params: args
        id: @lastId

