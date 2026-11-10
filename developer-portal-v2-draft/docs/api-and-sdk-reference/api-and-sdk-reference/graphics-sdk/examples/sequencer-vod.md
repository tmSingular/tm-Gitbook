# Sequencer with video

This host webpage loads a composition, defines two timed headline entries, and coordinates its sequencer with an HTML video element. It replaces the external-only VOD demo with complete local source.

## Setup

1. Create a sub-composition named Lower Third with a Text Control Node whose public ID is Title, linked to its text widget.
2. Author effective In/Out motion in that composition and obtain the extracted JSON URL.
3. Choose a browser-playable video longer than 10 seconds and provide its URL.
4. Serve the example over HTTP. The video and composition assets need browser/network access.

[Download sequencer-vod.html](../../../../.gitbook/assets/graphics-sdk/sequencer-vod.html).

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Graphics SDK — sequencer and video</title>
  <script src="https://app.singular.live/libs/singulargraphics/1.0.0/singulargraphics.js"></script>
</head>
<body>
  <label>Composition JSON URL <input id="compositionUrl" type="url" size="70"></label>
  <label>Video URL <input id="videoUrl" type="url" size="70"></label>
  <button id="load" type="button">Load video and graphic</button>
  <p id="status" role="status">Use a composition with a Lower Third child and a Title control.</p>
  <video id="video" controls style="width:48%;vertical-align:top"></video>
  <iframe id="SingularOverlay" title="Sequenced graphic" style="width:48%;height:400px;border:0"
    src="https://app.singular.live/singularplayer/client"></iframe>
  <script>
    (function() {
      const graphics = SingularGraphics("SingularOverlay");
      const video = document.getElementById("video");
      const elLoad = document.getElementById("load");
      const elStatus = document.getElementById("status");
      let sequencer = null;

      function setDuration() {
        if (sequencer && Number.isFinite(video.duration)) sequencer.setDuration(video.duration);
      }
      function syncPlaying() {
        if (!sequencer) return;
        sequencer.seek(video.currentTime);
        if (!video.paused && video.playbackRate === 1) sequencer.play();
        else sequencer.stop();
      }
      function stopAtVideoTime() {
        if (!sequencer) return;
        sequencer.stop();
        sequencer.seek(video.currentTime);
      }
      function syncOtherRates() {
        if (sequencer && video.playbackRate !== 1) sequencer.seek(video.currentTime);
      }
      const bindings = [
        ["loadedmetadata", setDuration], ["playing", syncPlaying], ["pause", stopAtVideoTime],
        ["waiting", stopAtVideoTime], ["seeking", stopAtVideoTime], ["seeked", syncPlaying],
        ["ended", stopAtVideoTime], ["ratechange", syncPlaying], ["timeupdate", syncOtherRates]
      ];
      bindings.forEach(function(binding) { video.addEventListener(binding[0], binding[1]); });

      elLoad.addEventListener("click", function() {
        if (elLoad.disabled) return;
        elLoad.disabled = true;
        video.pause();
        sequencer = null;
        video.src = document.getElementById("videoUrl").value.trim();
        graphics.loadComposition(document.getElementById("compositionUrl").value.trim(), function(result) {
          elLoad.disabled = false;
          if (!result.success) { elStatus.textContent = "Graphic did not load."; return; }
          const compMain = graphics.getMainComposition();
          const compLowerThird = compMain.find("Lower Third")[0];
          const sequence = {};
          sequence[compLowerThird.id] = [
            { beginTime: 2, endTime: 5, controlNode: { payload: { Title: "First headline" } } },
            { beginTime: 7, endTime: 10, controlNode: { payload: { Title: "Second headline" } } }
          ];
          sequencer = graphics.getSequencer();
          sequencer.setDuration(120);
          sequencer.setPayload(sequence);
          setDuration();
          syncPlaying();
          elStatus.textContent = "Ready. Play, pause, and seek the video.";
        });
      });
      window.addEventListener("pagehide", function() {
        bindings.forEach(function(binding) { video.removeEventListener(binding[0], binding[1]); });
        if (sequencer) sequencer.stop();
      });
    })();
  </script>
</body>
</html>
```

## Event mapping

| Video event | Sequencer action |
| --- | --- |
| loadedmetadata | Apply the video duration in seconds |
| playing | Seek to currentTime, then play at normal video rate |
| pause, waiting, seeking, ended | Stop and align to currentTime |
| seeked | Align and resume only when video is playing |
| ratechange | Reevaluate whether the running sequencer or stepped seeks should drive the preview |
| timeupdate at a non-1 rate | Update sequence position by seeking; no unsupported speed method is invented |

The sequence keys are resolved composition IDs. Timed payloads address local Control Node IDs. `setPayload` on the sequencer also requests Out on its target compositions in this bridge, so define the initial presentation intentionally.

The inspected `play(time)` implementation ignores its time argument. This example uses `seek(video.currentTime)` and `play()` as separate calls. Normal-speed playback uses the sequencer’s running clock; non-1 rates are stepped by media timeupdate notifications and are not presented as smooth or frame-accurate synchronization.

The host removes its owned video listeners on pagehide and stops the sequencer. Verify pause/resume, buffering, forward/backward seek, end of media, both sequence entries, and normal-speed timing in a real Player. Static source and mocked event tests establish the command wiring, not rendered timing.
