importScripts("dmodules.js")
importScripts("web-workers-rpc.js")

WebWorkersRpc = dModule.require("web-workers-rpc")
Boss = WebWorkersRpc.Boss

boss = new Boss(self)

