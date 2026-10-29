# SDK functions

## SingularOverlay(domElement, options, callback) <a href="#singularoverlaydomelement-options-callback" id="singularoverlaydomelement-options-callback"></a>

Create an instance of a Singular overlay with the following code:

```javascript
var options = {
  class: "iFrameClass",
  endpoint: "http://app.singular.live",
  interactive: true,
  syncGraphics: false,
  showPreloader: false,
  aspect: "",
};

var overlay = SingularOverlay("#DomElement", options, (params) => {
  // callback code goes here
});
```

<table><thead><tr><th width="136">Attributes</th><th width="113">Type</th><th width="115">Required</th><th>Description</th></tr></thead><tbody><tr><td>domId</td><td>String</td><td>Yes</td><td>The target <code>div</code> that the SingularOverlay will replace.</td></tr><tr><td>options</td><td>JSON</td><td>Yes</td><td>Configuration options to define how to render an overlay. See the <a href="sdk-functions.md#config-option-description">config option description </a>below.</td></tr><tr><td>callback</td><td>Function</td><td>Yes</td><td>Callback function called when the overlay object has been created.</td></tr></tbody></table>

## **Config option description**

<table><thead><tr><th width="164">Setting</th><th width="109">Type</th><th width="159">Default</th><th>Description</th></tr></thead><tbody><tr><td>class</td><td>class</td><td>iFrameClass</td><td>Can be used to style the iframe that the overlay SDK creates.</td></tr><tr><td>endpoint</td><td>String</td><td>app.singular.live</td><td>Optional. Can be used to work with different Singular servers.</td></tr><tr><td>delay</td><td>String</td><td>0</td><td>Specified in milliseconds. It tells the overlay SDK to execute commands coming through Firebase later.</td></tr><tr><td>interactive</td><td>Boolean</td><td>true</td><td>Tells the overlay if it should handle mouse events. This will simply set <code>pointer-events: none</code> on the iframe that is created.</td></tr><tr><td>syncGraphics</td><td>Boolean</td><td>false</td><td>Tells the render engine to synchronize graphics to UTC time received by <code>videoSegment</code> calls.</td></tr><tr><td>showPreloader</td><td>Boolean</td><td>false</td><td>Shows or hides the animation indicating that graphics are loading.</td></tr><tr><td>aspect</td><td>String</td><td>empty</td><td>Defines the aspect ratio of the graphics window. When unspecified, the graphics will cover 100% of the iframe.</td></tr></tbody></table>

## **Adaptive config option description**

You can also use adaptive parameters to define a specific adaptive layout define in the composition.

<table><thead><tr><th width="148">Setting</th><th width="100">Type</th><th width="155">Default</th><th>Description</th></tr></thead><tbody><tr><td>screenSize</td><td>Class</td><td>iFrameClass</td><td>Select</td></tr><tr><td>layout</td><td>String</td><td>app.singular.live</td><td></td></tr><tr><td>textDirection</td><td>String</td><td>0</td><td>0 ... left-to-right<br>1 ... right-to-left</td></tr><tr><td>interactive</td><td>Boolean</td><td>false</td><td>true ... propagate interactions to overlay<br>false ... ignore interactions</td></tr><tr><td>language</td><td>String</td><td>Empty</td><td>Language code (<code>en, fr, es, de</code>, ...)</td></tr><tr><td>custom1</td><td>String</td><td>Empty</td><td>Custom Parameter</td></tr><tr><td>custom2</td><td>String</td><td>Empty</td><td>Custom Parameter</td></tr><tr><td>custom3</td><td>String</td><td>Empty</td><td>Custom Parameter</td></tr></tbody></table>

## setContent(content, callback) <a href="#setcontentcontent-callback" id="setcontentcontent-callback"></a>

Loads a Singular graphic into the overlay instance.

<table><thead><tr><th width="136">Attributes</th><th width="164">Type</th><th width="115">Required</th><th>Description</th></tr></thead><tbody><tr><td>content</td><td>String or JSON</td><td>Yes</td><td>Content can be a string or an object and contain one of the values described below.</td></tr><tr><td>callback</td><td>Function</td><td>Yes</td><td>The callback function is called when  content has been loaded.</td></tr></tbody></table>

Options to define the content:

<table><thead><tr><th>Setting</th><th>Type</th><th width="110">Default</th><th>Description</th></tr></thead><tbody><tr><td>string</td><td>String</td><td>-</td><td>The composition revision URL.</td></tr><tr><td>compToken</td><td>String</td><td>-</td><td>The compositions token.</td></tr><tr><td>appOutputToken</td><td>String</td><td>-</td><td>The app output token.</td></tr><tr><td>webOutputToken</td><td>String</td><td>-</td><td>The web output token.</td></tr></tbody></table>

**Sample**

```javascript
overlay.setContent(content, (params) => {
  // called when content finished loading
});
```

**Content options**

```javascript
// defining composition revision URL as string
var content = "https://assets.singular.live/f12f184c9a0eb763beb40478e02a1250/jsons/5E2QFRRjiRjN7n4AZUJPzq.json";
// defining composition token as string
var content = "6IX8LkY32V3KACSNvs0MnT";
// defining composition token in content object
var content = { compToken: "6IX8LkY32V3KACSNvs0MnT" };
// defining app output token in content object
var content = { appOutputToken: "6IX8LkY32V3KACSNvs0MnT" };
// defining web output token in content object
var content = { webOutputToken: "49bb0fyieZMUWAmQdbeajI" };
```

Locate the Revision URL in  Singular Composer

![Composition revision URL](http://singular.molden.de/developer-singular-live/assets/screenshots/overlay-sdk-revision-url.jpg)

## addListener(type, callback) <a href="#addlistenertype-callback" id="addlistenertype-callback"></a>

Adds a listener for events coming from the overlay.

<table><thead><tr><th width="182">Attributes</th><th width="93">Type</th><th width="119">Required</th><th>Description</th></tr></thead><tbody><tr><td>type</td><td>String</td><td>Yes</td><td>An object containing one of the values described below.</td></tr><tr><td>callback</td><td>Function</td><td>Yes</td><td>The callback function for the <code>type</code> of event.</td></tr></tbody></table>

**Values for listener `type`**

| Setting | Description                                                                              |
| ------- | ---------------------------------------------------------------------------------------- |
| message | Listens to messages from interactive events and sends messages back to the video player. |
| error   | Listen to errors reported by the overlay instance.                                       |

**Sample: Listen to `message` from interactive events**

```javascript
overlay.addListener("message", (params) => {});
```

**Sample: Listen to `error` reported by the&#x20;**_**Overlay Instance**_

```javascript
overlay.addListener("error", (params) => {});
```

## setDelay(delay) <a href="#setdelaydelay" id="setdelaydelay"></a>

Defines the delay for the execution of incoming graphics control commands.

<table><thead><tr><th>Attributes</th><th width="102">Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>delay</td><td>Number</td><td>Yes</td><td>Delay in milliseconds.</td></tr></tbody></table>

**Sample**

```javascript
overlay.setDelay(500);
```

## show() <a href="#show" id="show"></a>

Shows the graphics overlay by setting the iFrame visibility to `visible`.

## hide() <a href="#hide" id="hide"></a>

Hides the graphics overlay by setting the iFrame visibility to `hidden`.

## destroy() <a href="#destroy" id="destroy"></a>

Deletes the graphics overlay.

## videoPlaying() <a href="#videoplaying" id="videoplaying"></a>

Notifies the overlay SDK that the video is playing.

## videoPaused() <a href="#videopaused" id="videopaused"></a>

Notifies the overlay SDK that the video is paused.

## videoBuffering() <a href="#videobuffering" id="videobuffering"></a>

Notifies the overlay SDK that the video is buffering.

## videoStopped() <a href="#videostopped" id="videostopped"></a>

Notifies the overlay SDK that the video is stopped.

## videoFinished() <a href="#videofinished" id="videofinished"></a>

Notifies the overlay SDK that the video is finished.

## videoSeeking(time) <a href="#videoseekingtime" id="videoseekingtime"></a>

Notifies the overlay SDK that the video is seeking at a specific time. Time is in seconds.

<table><thead><tr><th>Attributes</th><th width="116">Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>time</td><td>Number</td><td>Yes</td><td>Time in seconds.</td></tr></tbody></table>

**Sample**

```javascript
overlay.videoSeeking(500);
```

## videoSeeked() <a href="#videoseeked" id="videoseeked"></a>

Notifies the overlay SDK that the seeking operation is finished.

## videoTime(time) <a href="#videotimetime" id="videotimetime"></a>

Sends the current time of the video to the overlay SDK.

<table><thead><tr><th>Attributes</th><th width="127">Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>time</td><td>Number</td><td>Yes</td><td>Time in seconds.</td></tr></tbody></table>

**Sample**

```javascript
overlay.videoTime(60.0);
```

## videoMetadata(object) <a href="#videometadataobject" id="videometadataobject"></a>

Sends information about the video. This info can be received in the interactive layer code.

<table><thead><tr><th>Attributes</th><th width="90">Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td>object</td><td>object</td><td>Yes</td><td>add description</td></tr></tbody></table>

## videoMuted() <a href="#videomuted" id="videomuted"></a>

The user clicked the mute button in the video player.

## videoUnmuted(value) <a href="#videounmutedvalue" id="videounmutedvalue"></a>

The user clicked the mute button in the video player again.

<table><thead><tr><th>Attributes</th><th width="111">Type</th><th width="103">Required</th><th>Description</th></tr></thead><tbody><tr><td>value</td><td>Number</td><td>Yes</td><td>The volume of the video.</td></tr></tbody></table>

## videoVolume(value) <a href="#videovolumevalue" id="videovolumevalue"></a>

The user changed the volume of the video.

<table><thead><tr><th>Attributes</th><th width="126">Type</th><th width="103">Required</th><th>Description</th></tr></thead><tbody><tr><td>value</td><td>Number</td><td>Yes</td><td>The volume of the video.</td></tr></tbody></table>

**Sample**

```javascript
overlay.videoVolume(value);
```

## videoAdStart(), videoAdFinished(), videoAdSkip() <a href="#videoadstart-videoadfinished-videoadskip" id="videoadstart-videoadfinished-videoadskip"></a>

The video player is playing an advertisement. The interactive layer can then hide certain graphics.

## videoSegment(time) <a href="#videosegmenttime" id="videosegmenttime"></a>

UTC time received from the video that the overlay SDK can use to synchronize graphics to video. The format of time is Unix timestamp.

<table><thead><tr><th>Attributes</th><th width="286">Description</th><th>Type</th><th>Required</th></tr></thead><tbody><tr><td>time</td><td>Time in the format of the UNIX timestamp</td><td>String</td><td>Yes</td></tr></tbody></table>

**Sample**

```javascript
overlay.videoSegment(500);
```

## message(object) <a href="#messageobject" id="messageobject"></a>

Send a message to the interactive layer.

<table><thead><tr><th width="140">Attributes</th><th width="103">Type</th><th width="127">Required</th><th>Description</th></tr></thead><tbody><tr><td>object</td><td>object</td><td>Yes</td><td>Custom data as JSON object</td></tr></tbody></table>

**Sample**

```javascript
overlay.message(object);
```
