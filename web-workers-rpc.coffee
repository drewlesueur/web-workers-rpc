dModule.define "web-workers-rpc", ->
  class Boss
    constructor: (file) -> 
      @worker = new Worker(file)
      
  class Hire
    constructor: (@self) ->

  return {Boss, Hire}
