// https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearTimeout
var Timer = function(action) {
    this.action = action;
};

Timer.prototype = {
  setup: function() {
      var self = this;
      if (typeof this.timeoutID === "number") {
          this.cancel();
      } else {
          this.timeoutID = window.setTimeout(function(msg) {
              self.action();
          }, 1000);
      }
  },

  cancel: function() {
      window.clearTimeout(this.timeoutID);
      this.timeoutID = undefined;
  }
}
