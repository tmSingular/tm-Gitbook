# Best practices

Use these cheat sheets to follow best practices in common scripting tasks.

### Communication between sub-compositions

An efficient option for exchanging data between sub-compositions is by adding functions to the composition object.

#### Receiving data in a sub-composition

Extend a composition object by adding the function comp.updateContent()&#x20;

{% code title="Lower subcomposition Script" %}
```javascript
(function() {
  return {

    init: function(comp, context) {
      console.log("Initialize Composition script " + comp.name);

      // extend the composition object
      // receive data in the updateContent function
      comp.updateContent = function(data) {
        console.log("updateContent() - data =", data);
      }

    },

    close: function(comp, context) {
      console.log("Close Composition script " + comp.name);
    }
  };
})();
```
{% endcode %}

#### Sending data to a sub-composition

Get reference to the receiving composition and send data by calling its updateContent() function.

{% code title="Root Script" %}
```javascript
((function() {

  return {

    init: function(comp, context) {
      console.log("Initialize Composition script " + comp.name);

      // get composition reference
      const compLower = comp.find("Lower")[0];

      comp.addListener('payload_changed', (event, msg, e) => {
        console.log("Composition payload " + comp.name, event, msg);
        const payload = comp.getPayload2();

        // send data to destination
        compLower.updateContent(payload);
        e.stopPropagation();
      });

    },

    close: function(comp, context) {
      console.log("Close Composition script " + comp.name);
    }
  };
})();
```
{% endcode %}

### Updating overlay content from the composition script

A typical use case is receiving data in sub-composition control nodes, interpreting them, and updating properties within the sub-composition.

In such a case, it is recommended to unlink the receiving control nodes from properties and directly update widget properties.

#### **Reading control nodes, generating HTML, and updating the widget’s text property**

{% code title="Lower subcomposition Script" %}
```javascript
(function() {
  return {

    init: function(comp, context) {
      console.log("Initialize Composition script " + comp.name);

      const wiFullname = comp.findWidget("fullname")[0];

      comp.addListener('payload_changed', (event, msg, e) => {
        console.log("Composition payload " + comp.name, event, msg);
        
        // read control nodes content
        const p = comp.getPayload2();
        const htmlText = `<HTML>${p.firstname} <b>${p.lastname}</b></HTML>`;

        // update text widget
        wiFullname.setPayload({
          "text": htmlText
        });
        
        e.stopPropagation();
      });

    },

    close: function(comp, context) {
      console.log("Close Composition script " + comp.name);
    }
  };
})();
```
{% endcode %}
