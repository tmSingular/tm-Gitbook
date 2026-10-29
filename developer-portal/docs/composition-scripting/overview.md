---
description: An overview of composition scripting
---

# Overview

Singular overlays are essentially an HTML/CSS layer that sits on top of video, and composition scripting enables you to add JavaScript code to that layer. Thus, composition scripting allows you to make overlays interactive and set them up to update based on logic.

Composer includes a built-in [composition script editor](composition-script-editor-reference.md) where you can write composition scripts and test their functionality directly with a composition's output without having to deploy code to a web environment.

{% hint style="info" %}
Working with composition scripts requires experience in JavaScript and, in some cases, CSS. For recommendations for learning JavaScript, visit the [Support resources page](../support/support-resources.md).
{% endhint %}

### Common uses for composition scripts

Composition scripts can be written to perform countless functions. These are the most common:

* Interpreting and formatting data, e.g., data time, colors, add unit symbols, etc.
* Triggering animations depending on data, such as playing an animation when a team scores
* Defining lookup-tables and handle tri-codes
* Reading and writing data from/to servers
* Connecting to external data sources
* Creating interactive user experiences
* Defining custom animations and transitions

With a basic understanding of composition scripting and some of the functions they can serve, let's take a closer look into the following areas:

* [Types of composition scripts](overview.md#types-of-composition-scripts)
* [Initialization order](overview.md#initialization-order)
* [How composition scripts interact](overview.md#interaction-between-composition-scripts)
* [Essential functions of composition scripts](overview.md#essential-functions-of-every-composition-script)
* [Using the Chrome debugger to work with composition scripts](overview.md#using-the-chrome-debugger)

### **Types of composition scripts**

There are four types of composition scripts:

* The [global script](overview.md#global-script-1)
* The [root script](overview.md#root-script)
* [Sub-composition scripts](overview.md#sub-composition-scripts)
* The [overlay script](overview.md#overlay-script)

#### Global script

The global script is used to define global variables and library functions that are needed throughout the entire composition. Variables and functions are exposed using the global context of the composition scripts.

#### Root script

The root script contains root-specific functions, such as receiving or fetching data, interpreting them, and deploying the content to relevant sub-compositions.

#### Sub-composition scripts

Sub-composition scripts—there can be one per sub-composition—contain data and functions required within their scope. They are used to access control nodes and widgets within them.

{% hint style="info" %}
The root composition script and sub-compositions scripts are the same except that the root composition doesn't have a parent.
{% endhint %}

#### Overlay script

The overlay script provides the interface to communicate with parent web pages, player embed code, and native iOS and Android apps. It is only required for expert use cases and integration with video players.

#### Interaction between composition scripts

Composition scripts can share data and communicate with each other. For example, you can send data from one sub-composition to another or call functions from one sub-composition to another sub-composition.&#x20;

<figure><img src="https://lh6.googleusercontent.com/n35fnSFGc2VUMySWLRbafUdb1aH6O90lMnokesmlIMimGumnSIz6PdanHOaN2KfZYAKiMgB2zMnoSMLohU5LOkA86-HPTgPA4irsvkQFei4C2eK4sj4WC0JPP-__0t0QUHRdWKw_0W-3r_4wH71cAQ8waipVPcLsO9L-z1oxBJniW7bmLCG6awuyVmEI8g" alt=""><figcaption><p>How composition scripts interact with sub-compositions, widgets and each other</p></figcaption></figure>

### Initialization order

Composition scripts are initialized in the following order:

1. Overlay script
2. Global script
3. Sub-compositions starting from lowest child up to parent
4. Root script

Because of this initialization order, sub-composition scripts have access to the global script, and when the root script is initialized, it has access to all the data in the sub-compositions and can call them. This order ensures that when the root script is initialized, all the parent scripts already exist and it can interact with them.

{% hint style="info" %}
When the sub-compositions scripts are initialized, widgets associated with them are already there. In other words, widgets are loaded and initialized before composition scripts.
{% endhint %}

### Essential functions of every composition script

At minimum, every composition script needs two functions: `init()` and `close()`.

The `init()` function is where you write most of the code. It provides access to a composition object and context.

The composition object contains numerous methods. It can:

* Add listeners
* Access children within that sub-composition
* Find sub-compositions
* Find group widgets
* Access the `dom` element to create various animation effects
* Get payloads
* Set a payloads
* Use jump and play to control the animation

The `close()` function is used to clean up memory, clear timers, and close data streams.

### Working in Composer and the composition script editor simultaneously

While you're working in the composition script editor, another person can work independently in Composer. To bring updates made in Composer into the composition editor, select the [Reload Composition button](composition-script-editor-reference.md#1.-menu-bar) in the menu bar.

As for work done in the composition editor, it won't affect the composition until it is saved.&#x20;

### Global script

The global script is used to define global variables and library functions. Variables and functions are exposed using the “global context” of the composition scripts.

<details>

<summary>Global script boilerplate</summary>

```javascript
(function() {

  // Function must return the init function. close is optional
  return {

    // the init function is called after the script has been evaluated
		// context: gives access to common objects
    init: function(context) {
      console.log("Initialize Global script ");
    },

    // the close function will be called when the script will be unloaded. 
    // use this function to cleanup timeouts, intervals, XHR request and so on
    close: function() {
      console.log("Close Global script");
    }
  };
})();
```

</details>

**`init: function(context)`**

The `init` function is called after the script has been evaluated.

The context gives access to global objects and utilities. Use the global object to manage custom data, lookup tables, and functions with a global scope. Utility functions include tools and libraries provided by Singular R\&D.

```javascript
context
    global: {}
    utils:
        createConditionalSubCompLink: ƒ ()
        createDataStream: ƒ (t,e,i)
        createMoment: ƒ i()
        createNumeral: ƒ (n)
        createTimeControl: ƒ ()
        createTinyColor: ƒ c(e,t)
```

**`close: function()`**

The `close` function is called when the script is to be unloaded. Use this function to clean up timeouts, intervals, and XHR, and fetch requests, etc.

### **Root and** s**ub-composition scripts**

The root script contains root specific functions. For example, the root script receives or fetches data, interprets them, and deploys the content to the relevant su&#x62;**-**&#x63;ompositions.

<details>

<summary>Root and sub-composition boilerplate</summary>

```javascript
(function() {

  // Function must return the init function. close is optional
  return {

    // the init function is called after the script has been evaluated
    // comp: the composition object the script is attached to
		// context: gives access to common objects
    init: function(comp, context) {
      console.log("Initialize Composition script " + comp.name);

      // this listener receives messages from graphics SDK
      // these messages are usually triggered by the "send message to JavaScript" option
      // in the event panel of the composer. 
      // widgets can also send custom messages to the composition script using the  
      // sendCustomMessage of the widget SDK
      comp.addListener('message', (event, msg, e) => {
        console.log("Composition message " + comp.name, event, msg, e);
        e.stopPropagation();
      });
      
      // when the animation state of this comp or a sub comp changes
      comp.addListener('state_changed', (event, msg, e) => {
        console.log("Composition state " + comp.name, event, msg, e);
        e.stopPropagation();
      });

      // when the control nodes of this comp or a sub comp changes
      comp.addListener('payload_changed', (event, msg, e) => {
        console.log("Composition payload " + comp.name, event, msg);
        e.stopPropagation();
      });
      
      // when the payload of a datanode of this comp or a sub comp changes
      comp.addListener('datanode_payload_changed', (event, msg, e) => {
        console.log("Composition datanode payload " + comp.name, event, msg);
        e.stopPropagation();
      });
    },

    // the close function will be called when the script will be unloaded. 
    // use this function to cleanup timeouts, intervals, XHR request and so on
    close: function(comp, context) {
      console.log("Close Composition script " + comp.name);
    }
  };
})();
```

</details>

**`init: function(context)`**

* comp: composition object
* context: context object

**Available listeners**

* `'message'` listener
* `'state_changed'` listener
* `'timeline_event'` listener&#x20;
* `'payload_changed'` listener
* `'datanode_payload_changed'` listener&#x20;

**`'message'` listener**

* Triggered when:
  * The composition uses interactive events
  * Widgets generate custom events
  * Composition script generates custom events

```javascript
      comp.addListener('message', (event, msg, e) => {
        console.log("Composition message " + comp.name, event, msg, e);
        e.stopPropagation();
      });
```

**`'state_changed'` listener**

* Triggered when the animation state of the sub-composition has changed, e.g., when the In or Out state is reached.

```javascript
      comp.addListener('state_changed', (event, msg, e) => {
        console.log("Composition state " + comp.name, event, msg, e);
        e.stopPropagation();
      });
```

**`'timeline_event'` listener**&#x20;

* Triggered on the start and the end of an animation.

```javascript
      comp.addListener('timeline_event', (event, msg, e) => {
        console.log(comp.name + ".timeline_event() - msg =", msg);
        e.stopPropagation();
      });
```

**`'payload_changed'` listener**

* Triggered when the content of any control node of the sub-composition changes.

```javascript
      comp.addListener('payload_changed', (event, msg, e) => {
        console.log("Composition payload " + comp.name, event, msg);
        e.stopPropagation();
      });
```

**`'datanode_payload_changed'` listener**&#x20;

* Triggered when the content of any data node added to the sub-composition changes.

```javascript
      comp.addListener('datanode_payload_changed', (event, msg, e) => {
        console.log("Composition datanode payload " + comp.name, event, msg);
        e.stopPropagation();
      });
```

**`close: function()`**

* comp: composition object
* context: context object

Cleans up memory and clears timers in the close function.

### Overlay script

The overlay script provides the interface to communicate with parent web pages, player embed code, and native iOS and Android apps.

{% hint style="info" %}
The overlay script is general only required in very specific cases and requires advanced composition scripting skills.
{% endhint %}

<details>

<summary>Overlay script boilerplate</summary>

```javascript
(function() {

  // Function must return the init function. close is optional
  return {
		
    // the init function gives you access to the graphics SDK object and the overlay SDK object
    // more information in the resources menu
    init: function(graphics, overlay) {

      console.log("Initialize Overlay script ");

      // this listener receives messages from graphics SDK
      // these messages are usually triggered by the "send message to JavaScript" option
      // in the event panel of the composer. 
      // widgets can also send custom messages to the composition script using the  
      // sendCustomMessage of the widget SDK
      graphics.addListener('message', (event, msg) => {
        console.log("Graphics SDK message", event, msg);
      });
      
      // when the animation state of a sub composition changes
      graphics.addListener('state_changed', (event, msg) => {
        console.log("Graphics SDK state changed", event, msg);
      });

      // when the control nodes of a sub composition changes
      graphics.addListener('payload_changed', (event, msg) => {
        console.log("Graphics SDK payload changed", event, msg);
      });
      
      // when the payload of a datanode in the composition changes
      graphics.addListener('datanode_payload_changed', (event, msg) => {
        console.log("Graphics SDK datanode payload changed", event, msg);
      });

      // errors will be reported here
      graphics.addListener('error', (event, msg) => {
        console.log("Graphics SDK error", event, msg);
      });
      
      // overlay only exists if the composition is instanciated using the Overlay SDK
      // more info in the resources menu
      if (overlay) {
        overlay.addListener((event, msg) => {
          console.log("Overlay SDK message", event, msg);
        });
      }
    },

    // the close function will be called when the script will be unloaded. 
    // use this function to cleanup timeouts, intervals, XHR request and so on
    close: function() {
      console.log("Close Overlay script");
    }
  };
})();

```

</details>

**`init: function(graphics, overlay)`**

* graphics: Graphics SDK object
* overlay: overlay object

**Available listeners**

* ‘`message`’ listener
* ‘`state_changed`’ listener
* ‘`timeline_event`’ listener
* ‘`payload_changed`’ listener
* ‘`datanode_payload_changed`’ listener
* Listener ‘`error`’ listener

**`close: function()`**

* comp: composition object
* context: context object&#x20;

### Using the Chrome debugger

An important tool in singular composition script is the chrome debugger. It gives you access to all your scripts. To open the chrome debugger click F12 on your keyboard or go to the development tools and select the development tools button.

If you don't have any of the files open, enter ctrl b in the chrome debugger and write the name of your sub-composition to open the composition script.

You can add breakpoints and look at the variables.

To trigger that, just save it and have the windows side by side.

