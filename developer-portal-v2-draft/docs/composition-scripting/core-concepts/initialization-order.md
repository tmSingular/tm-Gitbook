# Initialization order

Scripts initialise **bottom-up** — from the deepest child sub-composition up to the root — in this sequence:

1. Overlay script
2. Global script
3. Sub-composition scripts (deepest child first, up to root's direct children)
4. Root script

This means by the time the root script runs, all sub-composition scripts are already initialised and their composition objects are accessible. Widgets are also fully loaded before any script runs.
