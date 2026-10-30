# ServerDate object

`app.ServerDate()` returns the SDK's server-adjusted clock helper.

| Method | Return value |
| --- | --- |
| `now()` | Number: corrected Unix epoch time in milliseconds. |
| `getOffset()` | Number: offset in milliseconds applied to the local clock. |

```javascript
const clock = app.ServerDate();
const epochMs = clock.now();
console.log(new Date(epochMs).toISOString());
```

In the inspected library, `now()` computes local `Date.now()` plus the maintained offset. It does not issue a new HTTP request for every call. Do not interpret the number as seconds, a duration, a timezone offset, or an accuracy guarantee. Use it when coordinating timestamp-based app data; animation commands still use the composition API.
