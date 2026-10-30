# Connection lifecycle

Handle connection state, messages, invalid input, and cleanup deliberately. Define what the graphic shows while waiting for data and when the last value becomes stale.

The [published introduction](https://developer.singular.live/data-stream-api/introduction) describes retained latest values and timestamps. Use the supported client contract when interpreting message envelopes and reconnect behavior.

Close the owned stream in the script's cleanup path and prevent late callbacks from writing after closure. Verify a second update without reloading, then test recovery separately.

* [Subscribe](subscribe.md)
* [Script lifecycle](../../../composition-scripting/composition-scripting/core-concepts/lifecycle.md)
* [Verification](../../../composition-scripting/composition-scripting/debugging-verification-and-deployment/verification.md)
