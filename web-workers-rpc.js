(function() {
  dModule.define("web-workers-rpc", function() {
    var Boss, Hire;
    Boss = (function() {
      function Boss(file) {
        this.worker = new Worker(file);
      }
      return Boss;
    })();
    Hire = (function() {
      function Hire(self) {
        this.self = self;
      }
      return Hire;
    })();
    return {
      Boss: Boss,
      Hire: Hire
    };
  });
}).call(this);
