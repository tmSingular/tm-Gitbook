# The script editor

Before writing any scripts, open the composition script editor — this is where all scripts are written, tested, and saved.

## Accessing the editor

Inside Composer, two buttons above the property panel open the editor in a new browser tab:

<table><thead><tr><th width="163">Button</th><th width="142">Mode</th><th>When to use</th></tr></thead><tbody><tr><td><code>&#x3C;/></code></td><td><strong>Normal mode</strong></td><td>Everyday scripting and testing</td></tr><tr><td>🚑 (Ambulance)</td><td><strong>Safe mode</strong></td><td>When a buggy script causes an infinite loop — fix the script here before returning to normal mode</td></tr></tbody></table>

## Editor layout

The editor is divided into four areas:

### **1. Menu bar** — key actions from left to right:

* **Save all scripts** — compiles, executes, and uploads all scripts to the composition
* **Reload composition** — pulls the latest composition state from Composer into the editor
* **Beautify JavaScript** — auto-formats the code in the editor
* **Script Library** — inserts boilerplate for any script type
* **Developer resources** — links to Graphics SDK and Overlay SDK docs, plus keyboard shortcuts
* **Code editor settings** — tab size, font size, dark theme, line numbers, whitespace rendering
* **Toggle interactive zones** — enables/disables any interactive zones defined in the composition
* **Output orientation** — landscape / portrait toggle
* **Screen size** — preview at various device resolutions

### **2. Code editor** — where scripts are written. The `+` button adds a new script:

* Overlay script
* Global script
* Root composition script
* One script per sub-composition

The icon next to each script name indicates its state:

* **Circle** — script exists but has not been evaluated
* **Checkmark** — script is error-free
* **Red circle** — script contains an error

The bottom-left corner shows **OK** or the current error message.

### **3. Preview panel** — live preview of the composition output, updated whenever you save.

### **4. Composition navigator** — four tabs:

<table><thead><tr><th width="258">Tab</th><th>Contents</th></tr></thead><tbody><tr><td><strong>Composition control</strong></td><td>Sub-composition names, IDs, In/Out state, fill-in form, payload JSON, model JSON</td></tr><tr><td><strong>Globals</strong></td><td>Screen size, layout, text direction, interactive status, language</td></tr><tr><td><strong>Widget explorer</strong></td><td>All widgets: name, ID, version, status, editable fields</td></tr><tr><td><strong>Overlay SDK simulator</strong></td><td>Simulates video player integration for overlay script testing</td></tr></tbody></table>

> **Tip:** You and a colleague can work simultaneously — they in Composer, you in the script editor. Use **Reload Composition** to pull in their latest changes. Your script edits have no effect on the live composition until you click **Save all scripts**.
