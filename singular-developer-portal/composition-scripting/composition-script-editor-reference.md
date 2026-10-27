---
description: Get to know the composition script editor
---

# Composition script editor reference

The composition script editor is the place to write and edit composition scripts.&#x20;

### Composition script editor modes

There are two ways to run the composition script editor:

* Normal mode
* Safe mode

### Accessing the composition script editor

* Normal mode can be accessed in Composer by selecting the **\</> button** above the property panel.
* Safe mode can be accessed by selecting the **ambulance button**. This is available so that if a script contains a bug or sets off an infinite loop, you can close the browser and fix the bug in safe mode before returning to the normal mode editor again.

Both open the composition script editor in a new browser tab.

<figure><img src="../.gitbook/assets/image (14).png" alt=""><figcaption><p>Accessing the composition script editor</p></figcaption></figure>

### Composition script editor layout

The composition script editor provides a code editor, composition navigator, and output preview in a single view.&#x20;

In addition, the menu bar offers a boilerplate script template that provides access to the composition's SingularPlayer object and starter code for the object's most commonly integrated events (message, state\_changed, payload\_changed, datanode\_payload\_changed, error).

1. [Menu bar](composition-script-editor-reference.md#menu-bar)
2. [Code editor](composition-script-editor-reference.md#code-editor)
3. [Preview panel](composition-script-editor-reference.md#preview-panel)
4. [Composition navigator panel](composition-script-editor-reference.md#bottom-right)

<figure><img src="../.gitbook/assets/image (21).png" alt=""><figcaption><p>Composition script editor layout</p></figcaption></figure>

### 1. Menu bar

1. **Save all scripts**: compiles and executes all the composition scripts in the editor. The latest version of the composition scripts are also uploaded to the composition.
2. **Reload composition**: updates the incoming link from the composition so that the composition script access shows the current state of the composition.
3. **Beautify JavaScript**: beautifies/reformats code in the code editor.
4. **Script Library**: provides JavaScript boilerplate code for each type of composition script that describes its structure and available event listeners.
5. **Developer resources:** provides links to the following:
   * Singular graphics SDK documentation
   * Singular overlay SDK documentation
   * Code editor keyboard shortcuts
6. **Code editor settings**: provides option to customize the look of the code editor. Options include tab and font size, toggling the dark theme on and off, line numbers, wrap lines, indent with tabs, and render whitespace.
7. **Toggle interactive zones**: toggles a composition's interactive zones if any have been set up.
8. **Output orientation**: Toggles between landscape and portrait mode.
9. **Screen size**: Provides options for setting the output to the screen size of various devices.
10. **Support**: Opens a support window.

<figure><img src="../.gitbook/assets/image (16).png" alt=""><figcaption><p>Menu bar</p></figcaption></figure>

### 2. Code editor

This is the place to write composition scripts.&#x20;

**The + button**

Selecting the **+** **button** opens a drop-down list of possible composition scripts to add to a composition. They include:

* An overlay script
* A global script
* A script for the root composition
* One script for each sub-composition

{% hint style="info" %}
The mark next to the name also conveys valuable information:

* **Circle**: a composition script has been created.
* **Checkmark**: the composition script is error-free.
* **Red circle**: the composition script contains an error.
{% endhint %}

**Error checker**

The bottom left of the code editor shows any errors in the code and displays **OK** when there are none.

<figure><img src="../.gitbook/assets/image (11).png" alt=""><figcaption><p>The code editor</p></figcaption></figure>

### 3. Preview panel

This panel displays a preview of the composition scripts' effect on the sub-composition.

<figure><img src="../.gitbook/assets/image (15).png" alt=""><figcaption><p>The preview panel</p></figcaption></figure>

### 4. Composition navigator

The compostion navigator contains various information about compositions that are needed to write composition scripts.

From left to right, the panels are:

* [Composition control](composition-script-editor-reference.md#composition-control-panel)
* [Globals](composition-script-editor-reference.md#globals-panel)
* [Widget explorer](composition-script-editor-reference.md#widget-explorer-panel)
* [Overlay SDK simulator](composition-script-editor-reference.md#overlay-sdk-simulator-panel)

<figure><img src="../.gitbook/assets/image (13).png" alt=""><figcaption><p>Composition navigator</p></figcaption></figure>

#### Composition control panel

The composition control panel shows information about the composition's root composition and sub-compositions that are needed when writing composition scripts.

The left side of the panel shows the sub-composition's assigned logic layer and current In-Out state.

The right side of the panel shows additional information in the following tabs:

* **Fill-in form**: the editable text and its positioning of the selected root or sub-composition. When changed, the payload updates.
* **Sub-comp info**: the sub-composition's name and ID, as well as the ID, name, type, and current value of the elements of the sub-composition that have been made editable though a control node.
* **Model**: the model of the app in JSON, which is required for specific use cases.
* **Payload**: the JSON data for the selected sub-composition, which is needed in many Singular REST API requests.

<figure><img src="../.gitbook/assets/image (12).png" alt=""><figcaption><p>Composition control panel</p></figcaption></figure>

#### Globals panel

The globals panel contains the composition's screen size, layout, text direction, interactive status, and language. Globals are required for adaptive graphics and other specific use cases.

<figure><img src="../.gitbook/assets/image (20).png" alt=""><figcaption><p>Globals panel</p></figcaption></figure>

#### Widget explorer panel

The widget explorer shows all the widgets used in a composition, including their name, ID, version, and status. It also shows the ID, name, and type of each widget's editable fields.

<figure><img src="../.gitbook/assets/image (19).png" alt=""><figcaption><p>Widget explorer</p></figcaption></figure>

{% hint style="info" %}
Widgets can be updated to the published version in Composer by selecting the widget in the composition tree panel. This opens a drop down menu that shows available widget versions.&#x20;
{% endhint %}

<figure><img src="../.gitbook/assets/image (17).png" alt=""><figcaption><p>Updating widgets</p></figcaption></figure>

#### Overlay SDK simulator panel

The SDK overlay simulator is used to integrate Singular overlays with video players.

<figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption><p>The overlay SDK simulator panel</p></figcaption></figure>
