# Class storage

## Methods

<table><thead><tr><th width="279">Method</th><th width="119">Return type</th><th>Description</th></tr></thead><tbody><tr><td>get(key, callback)</td><td>Object</td><td>Returns data specified by key from firebase storage.</td></tr><tr><td>off(key, callback)</td><td>-</td><td>Unregisters callback for a specific key.</td></tr><tr><td>on(key, callback)</td><td>-</td><td>Registers callback for a specific key.</td></tr><tr><td>remove(key, callback)</td><td>-</td><td>Removes data defined by a key from storage.</td></tr><tr><td>set(key, data, callback)</td><td>-</td><td>Sets data defined by a key in storage.</td></tr><tr><td>update(key, data, callback)</td><td>-</td><td>Updates data defined by a key in storage.</td></tr></tbody></table>

### get(key, callback) <a href="#get-key-callback" id="get-key-callback"></a>

Gets data specified by a key from firebase storage.

### off(key, callback) <a href="#off-key-callback" id="off-key-callback"></a>

Unregisters callback for a specific key.

### on(key, callback) <a href="#on-key-callback" id="on-key-callback"></a>

Registers callback for a specific key.

```javascript
// This code registers a callback for a specific key
var storageDataKey = "titleText";
storageObject.on(storageDataKey, (data) => {
  console.log("Storage data changed!", data);
  // update the composition object ...
});
```

### remove(key, callback) <a href="#remove-key-callback" id="remove-key-callback"></a>

Removes data defined by a key from storage.

### set(key, data, callback) <a href="#set-key-data-callback" id="set-key-data-callback"></a>

Sets data defined by a key in storage.

```javascript
// This code updates data in the storage object without registering a callback
var storageDataKey = "titleText";
var storageData = { Title: "New title text..."}
storageObject.set(storageDataKey, storageData, null);
```

### update(key, data, callback) <a href="#update-key-data-callback" id="update-key-data-callback"></a>

Updates data defined by a key in storage.
