# Index

- [About](#about)
- [Installation](#installation)
- [Quick Start](#quick-start)
    - [initialization](#qs-initialization)

___

<h1 id="about">About:</h1>

**Cantus Firmus** is a React state management package with a focus on simplicity, pattern familiarity, and the automation of repetitive and sometimes complex tasks. CF handles the mundane parts of state management, while also providing simple ways to accomplish typically challenging things.  

At a glance, some of the main features of Cantus Firmus are:

- Minimal boilerplate, and an included CLI to get complex state management setup quickly
- Dynamically generated setter and getter functions to easily set and access global state
- Configurable state persistence on page reloads
- Multi-window state sharing and communication
- Efficiency measures to prevent unnecessary re-renders on global state changes

---
# Installation:

```
npm install cantus-firmus
```
___
# Quick Start:

### Initialization:

The following example shows how to implement a basic configuration of a CantusFirmus state manager context and provider.

First, we create a CF instance, and pass it our default state.

```
    // myState.js

    import CantusFirmus from 'cantus-firmus'

    const state = {
        variable1: 1,
        variable2: 2
    }

    const myState = new CantusFirmus(state)

    export const MyContext = myState.context
    export const MyProvider = myState.createProvider()
```

### Wrapping components with the state provider:

Once you have created and exported your state context and provider, you can use them as you would any context/provider pair. See [CantusFirmusSubscriber](#) for how to mitigate some of the efficiency issues inherent in the React context API. 

First, wrap whichever children components you want to have access to the state context in your provider. This example wraps the entire component tree in the provider, giving all children access to the state. 

```
    // index.js

    import React from 'react';
    import ReactDOM from 'react-dom';

    import { myProvider } from './myState.js'
    ...

    ReactDOM.render(
        <MyProvider>
            <MyChildrenComponentsHere />
        </MyProvider>,
        document.getElementById('root')
    )

```

With this basic setup, you are already provided with a number of useful ways to access and set the state of your CF instance. As an example using the useContext hook: 

### Subscribing to the state context

```
    // ExampleChildComponent.js (within the tree structure inheriting from your provider component)

    import React, { useContext } from 'react'
    import { MyContext } from './myState.js'

    const ExampleChildComponent = () => {
        const { state, setters } = useContext(MyContext);
        
        // state = {variable1: 1, variable2: 2}
        // setters = {setVariable1: function(...), setVariable2: function(...)}

        return (
            <>
                <button onClick={
                    async e => {await setters.setVariable1(state.variable1 + 1)}
                }>
                    Button 1
                </button>

                <button onClick={
                    async e => {await setters.setVariable2(state.variable2 - 1)}
                }>
                    Button 2
                </button>
            </>
        )
    }
```

Using destructuring in the above example, we get access to a `state` variable containing the state of our CF instance, and a `setters` variable, which is an object containing dynamically generated setter methods for that state. If you are familiar with the `useState` hook that provides you with an accessor variable and a setter for that variable, this is the same pattern, but placed over your entire state definition and available throughout your state tree. See [Dynamic Setters](#dynamic-setters) for more details on naming conventions and other options.

### Adding custom setters

In the above example, we have made a basic increment/decrement counter using our state and provided setters. But what if you wanted setter methods called `incrementVariable1` and `decrementVariable2` so you didn't have to hard code the functionality every time? Fortunately, this is quite easy to accomplish with custom setters. 

Like the standard setState pattern of vanilla React, we can define methods that use `setState` to alter the state of a variable (or variables) without changing it directly. However, we then typically have to deal with binding so as to keep the `setState` call in the correct scope. CF handles all the background binding for us so we can just tell it what we want our method to do. 

We'll adjust our `myState.js` file as follows:

```
    // myState.js

    import CantusFirmus from 'cantus-firmus'

    const state = {
        variable1: 1,
        variable2: 2
    }

    const myState = new CantusFirmus(state)
    
    // :::::::::::::::::::::::::::::
    // :: ADD CUSTOM SETTERS HERE ::
    // :::::::::::::::::::::::::::::

    myState.addCustomSetters({
        incrementVariable1(){
            this.setState({
                variable1: this.state.variable1 + 1
            })
        },

        decrementVariable2(){
            this.setState({
                variable2: this.state.variable2 - 1
            })
        }
    })


    export const MyContext = myState.context
    export const MyProvider = myState.createProvider()
```

Notice that we are able to access the `this` keyword within our custom setters. `this` becomes bound to the value of our provider, so we are given access to the state itself through `this.state`. In fact, any value or method that we get when subscribing to the provider is also accessible via the `this` keyword within our custom setters.

We'll now update our subscribing component to use our new custom setters.

```
    // ExampleChildComponent.js

    import React, { useContext } from 'react'
    import { MyContext } from './myState.js'

    const ExampleChildComponent = () => {
        const { state, setters } = useContext(MyContext);

        return (
            <>
                <button onClick={setters.incrementVariable1}>
                    Button 1
                </button>

                <button onClick={setters.decrementVariable2}>
                    Button 2
                </button>
            </>
        )
    }
```

And with that we have a quick and easy way to implement our own setter logic.

___

# Efficient Rendering

## Subscriber

CF is built on the React context API. While it inherits the ease of use from React Context, it also inherits some efficiency pitfalls regarding subscriber component updates and re-renders. CF comes with a custom `subscribe` wrapper that uses React's memoization to mitigate these issues and prevent unnecessary re-renders. It is very easy to refactor a component to use the `subscribe` HOC.

Rather than subscribing to a context via traditional means like `Context.Consumer`, or the `useContext` hook, we use the included `subscribe` wrapper. It is even possible to subscribe to multiple contexts this way.

```
import React from 'react';

// 1. import the subscribe function from CF 
import { subscribe } from 'cantus-firmus'; 

// 2. import your context(s)
import { MainContext } from './state/main/contextProvider'; 
import { SecondaryContext } from './state/secondary/contextProvider';

// 3. define your component
const MyCustomComponent = (props) => {

    // Context(s) will get passed in the props, and can be destructured from there 
    const { main, secondary } = props; 

    // do other component stuff...
}

// 4. subscribe component to context(s)
export default subscribe(MyCustomComponent, [
    {context: MainContext, key: "main", dependencies: ["value1", ["nested", "value"]]},
    {context: SecondaryContext, key: "secondary", dependencies: ["someOtherValue"]},
])
```

Components that subscribe to contexts in this way receive those contexts via their props. The `subscribe` function takes in two arguments: your component, and an array of context definitions and relevant dependencies. 

Context definitions are just object with the following properties:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| context | React Context | true | A reference to a context |
| key | String | false | Defines how the context will be named when it is passed down in props. If omitted, it will default to the following naming convention: if only one context is passed, it will be called "context". If multiple contexts are passed and keys are omitted for all of them, the first context will be named "context1", the second, "context2" and so on. |
| dependencies | [String or [String]] | true | An array of strings listing the context properties that should trigger a re-render if changed. Nested properties can be indicated by passing an array of strings into the dependency array. |

___

<h1 id="configuration">Configuration</h1>

## Initialization Options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| dynamicSetters | Boolean | true | specifies if setters should be dynamically generated based on the provided state object. |
| dynamicGetters | Boolean | true | specifies if getters should be dynamically generated based on the provided state object. |
| nestedSetters | Boolean | false | Specifies if setters should be dynamically created for nested state values.
| nestedGetters | Boolean | true | Specifies if getters should be dynamically created for nested state values.
| allowSetterOverwrite | Boolean | true | If true, allows a custom defined setter to overwrite the functionality of a dynamic setter of the same name. |
| developmentWarnings | Boolean | true | if `allowSetterOverwrite` is false, developmentWarnings will warn the developer if they try to overwrite a dynamic setter with custom logic. | 
| overwriteProtectionLevel | Number (0, 1, >= 2) | 1 | if `allowSetterOverwrite` is false, sets the warning type that a developer will get when overwriting a dynamic setter. `0` will silence warnings, `1` print a console.warn message, and 2 or greater will throw an error and halt execution. |

___
## Connecting to Local Storage

You can easily connect your entire state, or selected parts of your state to the browser's local storage for persistance, or to share with child windows spawned from the parent window. 

```
// initialize a new CF instance and call it "main"
const main = new CantusFirmus({value1: 1, value2: 2})

// connect your CF instance to localStorage
main.connectToLocalStorage({
    name: "main", // this is a required parameter
    providerWindow: "mainWindow",
    subscriberWindows: ["child", "grandchild"]
    removeChildrenOnUnload: true,
    clearStorageOnUnload: false,
    privateStatePaths: ["value1"]
})
```
For the second step in the above code example, we connect our CF instance to our local storage, and set a number of parameters for how it will behave. Those parameters are explained in more detail in the table below, but one very important parameter to remember is `name`. You must provide a unique name in this field.

## Multiwindow Support Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| name | String (required) | null | A string that is unique from any other `localStorage` key name (including any other names set in other CF instances). This will become the key name under which the state is stored in `localStorage`. | 
| initializeFromLocalStorage | Boolean | false | Specifies if the state should be loaded from the `localStorage` rather than with the default initialization values. Note that if the `localStorage` does not contain a reference to the state, default values will be loaded. Regardless of what value is set here, windows with names provided in the `subscriberWindows` parameter will initialize from localStorage. | 
| providerWindow | String | null | Specifies the `window.name` property of the parent window. If no value is given, it will default to the same string specified in the `name` option. | 
| subscriberWindows | [String] | Empty Array | An array of strings that has a comprehensive list of the names of the windows that may subscribe to the shared state through `localStorage`. These windows will automatically initialize from localStorage regardless of the value set in `initializeFromLocalStorage`| 
| removeChildrenOnUnload | Boolean | true | If true, will close all children windows spawned from the `windowManager.open` method. Note that if a child window spawns another window (grandchild), that window will also be closed if this parameter is set to true. |
| clearStorageOnUnload | Boolean | true | If true, when the `providerWindow` is closed, all associated state stored in `localStorage` will be removed. |
| privateStatePaths | [String or [String]] | Empty Array | Specifies state parameters of the provider window that will not be passed down to any spawned children or grandchildren. Elements in the array may be strings or arrays of strings. The latter options allows for you to specify a nested parameter as private while still passing parameters higher in the state structure. |

## Persisting with Local Storage

While many of the options that you set in `connectToLocalStorage` are aimed at providing functionality for sharing state between multiple windows, you can forgo many of them for clean and easy *persistance on page reload* functionality. If you set `initializeFromLocalStorage` to true, your main/provider window will load default state values from those specified in the local storage. If this is the desired functionality, make sure to also set `clearStorageOnUnload` to false, so the local storage persists if you reload the page. 

If there are some state values that you wish not to initialize from local storage, you can set them in the `privateStatePaths` parameter. Any value indicated in this parameter will not ever be saved to local storage. If you are initializing from a persisted local storage, and have private state values specified, those values will initialize to whatever you have set in your default state object. 