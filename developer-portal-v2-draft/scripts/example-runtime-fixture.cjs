// Model only the documented local script-uninstall contract, not a full Player.
// Local event slots are cleared before close; close receives the init arguments.
function withScriptLifecycle(script) {
  if (!script || typeof script.init !== 'function') return script;
  const initialize = script.init;
  const finalize = script.close;
  let argumentsForClose = [];
  script.init = function(...args) {
    argumentsForClose = args;
    return initialize.apply(script, args);
  };
  script.close = function(...args) {
    const compCurrent = argumentsForClose[0];
    if (compCurrent && compCurrent.handlers) {
      Object.keys(compCurrent.handlers).forEach(event => { delete compCurrent.handlers[event]; });
    }
    if (finalize) return finalize.apply(script, args.length ? args : argumentsForClose);
  };
  return script;
}
module.exports = { withScriptLifecycle };
