# API Reference

## API Reference

| class          | function                                                                   | description                        |
| -------------- | -------------------------------------------------------------------------- | ---------------------------------- |
| singularApp.   |                                                                            |                                    |
|                | .storage                                                                   | {}                                 |
|                | getOutputById(id)                                                          | output                             |
|                | .getCompositionById(id)                                                    | composition                        |
|                | .getCompositionByName(name defined from app template or importComposition) | composition                        |
|                | .listCompositions()                                                        |                                    |
|                | .listOutputs()                                                             |                                    |
|                | .log                                                                       | {}                                 |
|                | .listIdsByName(array, name)                                                |                                    |
|                | .getCompositionBrowserUrl()                                                |                                    |
|                | .compositionBrowserEventCallback()                                         |                                    |
|                | .importComposition                                                         |                                    |
|                | .renderSingularForm(dom, controlNode)                                      | \*not available in standalone mode |
|                | .removeSingularForm(dom)                                                   | \*not available in standalone mode |
|                | .removeCompositionById(id, callback);                                      |                                    |
|                | .removeCompositionByName(name, callback);                                  |                                    |
|                | .removeAllCompositions(callback);                                          |                                    |
|                | ServerDate()                                                               | Singular server time details       |
| storage        |                                                                            |                                    |
|                | .set(key, json)                                                            |                                    |
|                | .update(key, json)                                                         |                                    |
|                | .get(key, callback)                                                        |                                    |
|                | .on(key, callback)                                                         |                                    |
|                | .off(key, callback)                                                        |                                    |
|                | .callback = function(value)                                                | {};                                |
| output         |                                                                            |                                    |
|                | .setComposition(composition)                                               |                                    |
|                | .getComposition()                                                          | composition                        |
|                | .getUrl()                                                                  | string                             |
| composition    |                                                                            |                                    |
|                | .playTo(to)                                                                |                                    |
|                | .jumpTo(to)                                                                |                                    |
|                | .setPayload(payload)                                                       |                                    |
|                | .listSubcompositions()                                                     |                                    |
|                | .getSubcompositionById(id)                                                 | subcomposition                     |
|                | .getSubcompositionByName(name)                                             | subcompositioncontrol node         |
|                | .getControlNode()                                                          |                                    |
|                | .getPayload()                                                              |                                    |
|                | .getSequencer()                                                            | sequencer                          |
|                | .remove(callback)                                                          |                                    |
|                | .getModel()                                                                |                                    |
| subcomposition |                                                                            |                                    |
|                | .playTo(to)                                                                |                                    |
|                | .jumpTo(to)                                                                |                                    |
|                | .setPayload(payload)                                                       |                                    |
|                | .getSubcompositionById(id)                                                 | subcomposition                     |
|                | .getSubcompositionByName(name)                                             | subcomposition                     |
|                | .getControlNode()                                                          | control node                       |
|                | .getPayload()                                                              |                                    |
|                | .getModel()                                                                |                                    |
|                | .getSequencer()                                                            | sequencer                          |
| sequencer      |                                                                            |                                    |
|                | .start()                                                                   |                                    |
|                | .stop()                                                                    |                                    |
|                | .seek(time)                                                                |                                    |
|                | .setPayload()                                                              | sequencer payload                  |
|                | .restoreControlNodeDefaultValue()                                          |                                    |
|                | .setDuration(duration)                                                     |                                    |
