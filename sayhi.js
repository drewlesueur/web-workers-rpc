importScripts("dmodule.js", "rpc-general.js", "web-workers-rpc.js")

WebWorkersRpc = dModule.require("web-workers-rpc")
Boss = WebWorkersRpc.Boss

boss = new Boss(self)
boss.setMethods({
  sayHi: function (name, cb) {
    cb(null, "Hi " + name)
  }
})
    
