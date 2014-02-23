//Just a gameloop found on the internet, PLEASE DO NOT USE


function _Engine () {

  

  this.run = function(options) {

    var now,
        dt       = 0,
        last     = timestamp(),
        slow     = options.slow || 1, // slow motion scaling factor
        step     = 1/options.fps,
        slowStep = slow * step,
        update   = options.update,
        render   = options.render,
        fpsmeter = new FPSMeter(options.fpsmeter || { decimals: 0, graph: true, theme: 'dark', left: '500px' });

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
      requestAnimationFrame(frame, options.canvas);
    }

    requestAnimationFrame(frame);
  }
}
