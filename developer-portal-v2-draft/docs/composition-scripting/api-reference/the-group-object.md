# The group object

Use `comp.findGroup()` to locate a group in the composition. It returns an array; check that a group was found before accessing it.

```javascript
const group = comp.findGroup("Lowers Group")[0];
if (!group) {
  throw new Error('Group "Lowers Group" was not found');
}
```

Groups can be layout and visibility targets. Confirm the available methods and units for your supported runtime before using a method copied from another object type.

- [Published object lookup reference](https://developer.singular.live/composition-scripting/cheat-sheets/fundamentals#findgroup)
- [Work with layout](../how-to-guides/work-with-layout.md)
- [Data ownership](../core-concepts/data-ownership.md)
