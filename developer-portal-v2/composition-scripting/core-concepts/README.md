# Core concepts

#### What is a composition?

A Singular composition is a tree of objects:

* A **root composition** at the top
* One or more **sub-compositions**, each containing **widgets** (text, image, table, ticker, etc.) and **control nodes** (the editable fields exposed to operators)

Scripts are attached to specific levels of this tree. Each script has access only to the objects within its scope.
