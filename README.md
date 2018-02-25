#### 1st test on old idea.

### toggle buttons that stick to the edges of the screen deppending on their value
mainly used for a filter's section, where the user sees the list/grid of items in he background;

* use [@shopify/draggable](https://github.com/Shopify/draggable) for heavy lifting on touch/drag&drop detection and events

future:
* rename isOff isOn to isLeft isRight
* create option prop with optional parameters and default values
    * values
        * isLeft
        * isRight 
    * texts
        * isLeft
        * isRight
    * styles
        * style isLeft
        * style isRight
        * style onDrag
        * style container
* fix don't scroll background while dragging toggles
* demo page
* decople behaviour from ui
* create slider
* create select