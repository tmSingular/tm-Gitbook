# Widget callback functions

## onSingularInit()

{% code title="Debug Console" overflow="wrap" %}
```log
onSingularInit(): {OffsetToServerTime: -589.5, adaptationGlobals: {…}}
> OffsetToServerTime: -589.5
> adaptationGlobals: {}
```
{% endcode %}

## onSingularValue()

{% code title="Debug Console" overflow="wrap" %}
```log
onSingularValue(): {idLabel: ' ', idText: 'enter text here ...', idTextArea: 'Enter text into this area...', idNumber: '50.0', idCheckbox: false, …}
> idCheckbox: false
> idColor: {r: 155, g: 155, b: 155, a: 1}
> idComposition: "325724b5-03b8-46cf-93cb-16a2587dfb21"
> idGradient: "#9B9B9B"
> idImage: "https://app.singular.live/images/logo.png"
> idJson: "{}"
> idLabel: " "
> idNumber: "50.0"
> idSelection: "1"
> idText: "enter text here ..."
> idTextArea: "Enter text into this area..."
> idUseCustomParameter: false
```
{% endcode %}

## onSingularButtonClicked()

{% code title="Debug Console" overflow="wrap" %}
```log
onSingularButtonClicked(): idButton
```
{% endcode %}

## onSingularEditComp()

{% code title="Debug Console" overflow="wrap" %}
```log
onSingularEditComp(): idComposition
```
{% endcode %}

## onSingularAnimation()

{% code title="Debug Console" overflow="wrap" %}
```log
onSingularAnimation(): {event: 'init', timeline: 'In', duration: 0.5, animationEvent: 'play', direction: 'forward', …}
> animationEvent: "play"
> direction: "forward"
> duration: 0.5
> easing: {easing: 'linear', inOut: 'out'}
> event: "init"
> newState: "In"
> oldState: "Out1"
> state: "In"
> timeline: "In"
```
{% endcode %}

