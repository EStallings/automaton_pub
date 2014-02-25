//From t3h w3bs


function _Engine (options) {
  this.options = options;
  

  this.run = function() {

    var now,
        dt       = 0,
        last     = timestamp(),
        slow     = this.options.slow || 1, // slow motion scaling factor
        step     = 1/this.options.fps,
        slowStep = slow * step,
        update   = this.options.update,
        render   = this.options.render,
        fpsmeter = new FPSMeter(this.options.fpsmeter || { decimals: 0, graph: true, theme: 'dark', left: '500px' });

    function frame() {
      fpsmeter.tickStart();
      now = timestamp();
      dt = dt + Math.min(1, (now - last) / 1000);
      while(dt > slowStep) {
        dt = dt - slowStep;
        update(step);
      }
      render(dt/slow);
      last = now;
      fpsmeter.tick();

      requestAnimationFrame(frame, that.options.canvas);
    }

    var that = this;

    requestAnimationFrame(frame);
  }
}
