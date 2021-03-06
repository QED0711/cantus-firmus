# Index

- [About](#about)
- [Installation](#installation)
- [Quick Start](#quick-start)
    - [Initialization](#initialization)
    - [Wrapping components with the state provider](#wrapping-components-with-the-state-provider)
    - [Subscribing to the state context](#subscribing-to-the-state-context)
    - [Adding custom setters](#adding-custom-setters)
- [Basic Configuration](#basic-configuration)
    - [Initializing & Configuring a New CF Instance](#initializing--configuring-a-new-cf-instance)
        - [Initialization Options](#initialization-options)
        - [Instant Methods](#instance-methods)
    - [Setters](#setters)
    - [Methods](#methods)
        - [Defining Custom Setters & Methods](#defining-custom-setters--methods)
        - [Setters Vs Methods](#setters-vs-methods)
    - [Getters](#getters)
    - [Reducers](#reducers)
    - [Constants](#constants)
- [Advanced Configuration](#advanced-configuration)
    - [Efficient Updating](#efficient-updating)
    - [ConnectToLocalStorage](#connecttolocalstorage)
    - [Persisting State with Local Storage](#persisting-state-with-local-storage)
    - [Inter-Window Communication through Local Storage](#inter-window-communication-through-local-storage)
- [Command Line Interface](#command-line-interface)
    - [File Structure](#file-structure)
    - [CLI Flags & Options](#cli-flags--options)


___

<h1 id="about">About:</h1>

**Cantus Firmus** is a React state management package with a focus on simplicity, pattern familiarity, and the automation of repetitive and sometimes complex tasks. CF handles the mundane parts of state management, while also providing simple ways to accomplish typically challenging things.  

At a glance, some of the main features of Cantus Firmus are:

- Minimal boilerplate, and an included CLI to get complex state management setup quickly
- Dynamically generated setter and getter functions to easily set and access global state
- Efficiency measures to prevent unnecessary re-renders on global state changes
- Async/Await syntax with `setState`
- Configurable state persistence on page reloads
- Multi-window state sharing and communication


---
# Installation:

```
npm install cantus-firmus
```
___
# Quick Start:

### Initialization:

The following example shows how to implement the most basic version of a CantusFirmus state manager context and provider.

First, we create a CF instance, and pass it our default state.

```
    // myState.js

    import CantusFirmus from 'cantus-firmus'

    const state = {
        greeting: "Hello", 
        subject: "world"
    }

    const myState = new CantusFirmus(state)

    export const MyContext = myState.context
    export const MyProvider = myState.createProvider()
```

### Wrapping components with the state provider:

Once you have created and exported your state context and provider, you can use them as you would any context/provider pair. See [Efficient Updating](#efficient-updating) for how to mitigate some of the efficiency issues inherent in the React context API. 

First, wrap whichever children components you want to have access to the state context in your provider. This example wraps the entire component tree in the provider, giving all children access to the state. 

```
    // index.js

    import React from 'react';
    import ReactDOM from 'react-dom';

    import { MyProvider } from './myState.js'
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

> *See [Efficient Updating](#efficient-updating) for an alternate approach to component subscription*

```
    // ExampleChildComponent.js (within the tree structure inheriting from your provider component)

    import React, { useContext } from 'react'
    import { MyContext } from './myState.js'

    const ExampleChildComponent = () => {
        const { state, setters } = useContext(MyContext);
        
        // state = {greeting: "Hello", subject: "world"}
        // setters = {setGreeting: function(...), setSubject: function(...)}

        return (
            <>
                <h1>{state.greeting}, {state.subject}</h1>

                <button onClick={
                    e => {setters.setGreeting("Hey there")}
                }>
                    Change Greeting
                </button>

                <button onClick={
                    e => {setters.setSubject("friend")}
                }>
                    Change Subject
                </button>
            </>
        )
    }
```

Cantus Firmus is based on React's context API, and is easily accessed by traditional means (useContext, Context.Consumer). Using destructuring in the above example, we get access to a `state` variable containing the state of our CF instance, and a `setters` variable, which is an object containing dynamically generated setter methods for that state. If you are familiar with the `useState` hook that provides you with an accessor variable and a setter for that variable, this is the same pattern, but placed over your entire state definition at a global level, and available throughout your state tree. See [Dynamic Setters](#dynamic-setters) for more details on naming conventions and other options.

From even this basic setup, you can see that Cantus Firmus handles the basic parts of state management for you by creating an accessible context for your state, and providing your with methods to change that state. Now, you get to spend more time thinking about and designing your application, and less time worrying about state management!

### Adding custom setters

In the above example, we have some strings, and the ability to change those string on button clicks. But what if you wanted to change both strings at the same time? Fortunately, this is quite easy to accomplish with custom setters. 

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

        changeHeader(newGreeting, newSubject){
            this.setState({
                greeting: newGreeting,
                subject: newSubject
            })
        }

    })


    export const MyContext = myState.context
    export const MyProvider = myState.createProvider()
```

Notice that we are able to access the `this` keyword within our custom setters. `this` becomes bound to the value of our provider, and so `this.setState` will set the global state handed down from that provider. In fact, any value or method that we get when subscribing to the provider is also accessible via the `this` keyword within our custom setters (e.g. `this.state`, `this.setters`. etc.).

We'll now update our subscribing component to use our new custom setters.

```
    // ExampleChildComponent.js

    import React, { useContext } from 'react'
    import { MyContext } from './myState.js'

    const ExampleChildComponent = () => {
        const { state, setters } = useContext(MyContext);

        return (
            <>
                <h1>{state.greeting}, {state.subject}</h1>

                <button onClick={e => setters.changeHeader("Hi there", "friend")}>
                    Update header
                </button>

            </>
        )
    }
```

This is of course a very simple, and not incredibly practical example. But it shows how we can access state and dynamic setters, and create our own setter logic with minimal work. Read on to [Basic Condifuration](#basic-configuration) and [Advanced Configuration](#advanced-configuration) to learn more about these and other features. 

___

# Basic Configuration:

## Initializing & Configuring a New CF Instance

CF instances are initialized with a default state and an options object. 

```
import CantusFirmus from 'cantus-firmus'

const defaultState = {
    value1: 1,
    value2: 2,
    nested: {
        value: "I'm a nested value"
    }
}

const options = {
    nestedSetters: true
    nestedGetters: true
}

const main = new CantusFirmus(defaultState, options)

export const MainContext = main.context;
export const MainProvider = main.createProvider();


```

## Initialization Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| dynamicSetters | Boolean | true | specifies if setters should be dynamically generated based on the provided state object. |
| dynamicGetters | Boolean | true | specifies if getters should be dynamically generated based on the provided state object. |
| nestedSetters | Boolean | false | Specifies if setters should be dynamically created for nested state values.
| nestedGetters | Boolean | true | Specifies if getters should be dynamically created for nested state values.
| allowSetterOverwrite | Boolean | true | If true, allows a custom defined setter to overwrite the functionality of a dynamic setter of the same name. |
| developmentWarnings | Boolean | true | if `allowSetterOverwrite` is false, developmentWarnings will warn the developer if they try to overwrite a dynamic setter with custom logic. | 
| overwriteProtectionLevel | Number (0, 1, >= 2) | 1 | if `allowSetterOverwrite` is false, sets the warning type that a developer will get when overwriting a dynamic setter. `0` will silence warnings, `1` print a console.warn message, and 2 or greater will throw an error and halt execution. |

## Instance Methods

| Name | Arguments | Description | 
| --- | --- | --- |
| addCustomSetters | Setters Object | The setters object contains custom setter methods that internally call `this.setState`. See [Custom Setters](#custom-setters) for more detail. | 
| addMethods | Methods Object | The methods object contains custom methods that internally have access to the `this` keyword, and can therefore access the instance state and setters. See [Methods](#methods) for more detail. | 
| addNamespacedMethods (v0.1.4+) | Namespaced Methods Object | Like `addMethods`, `addNamespacedMethods` allows you to create custom functions that have internal access to the `this` keyword. Rather than providing a single methods object, you provide an object with keys pointing to multiple method objects. See [Namespaced Methods](#namespaced-methods) for more detail. | 
| addReducers | Reducers Object | The reducers object contains custom reducer methods. See [Reducers](#reducers) for more detail. |
| addConstants | Constants Object | The constants object is a standard JS object with properties and methods. As the name indicates, these values are not configurable after initialization. Useful for passing down configuration, styles, or helpers methods in your context. Note that any methods added here will not be bound to the provider component, and therefore will not have access to the `this` keyword to reference state, setters, etc. |  
| ignoreSetters | [String or [String]] | The `ignoreSetters` method is used in conjunction with dynamically generated setters. You may pass in the name of any state property as a string (top level or nested), and no setter for the property will be created. Note that you may still add a custom setter of the same name and this will be included. If your array contains an array of strings, this will be considered the path to a nested value. | 
| ignoreGetters | [String or [String]] | The `ignoreGetters` method is used in conjunction with dynamically generated getters. You may pass in the name of any state property as a string (top level or nested), and no getter method for the property will be created. Note that you may still add a custom getter of the same name and this will be included. If your array contains an array of strings, this will be considered the path to a nested value. | 
| rename | Name Map Object | The `rename` method allows you to rename any property passed in the instance context. This is typically done for symantec reasons. For example, if you passed in {methods: "API"}, you can now destructure `API` from your context value to reference all your methods. This also adds an internal reference, so you could also access `this.API` from your custom setters, for example. |
| connectToLocalStorage | Options Obeject | Duplicates local state to the browser's local storage for persistence or for sharing between multiple windows under the same domain. See [ConnectToLocalStorage](#connecttolocalstorage) for more detail. |

___

## Setters

### **Dynamic Setters**

Dynamic setters are automatically generated functions that can perform state updates on single properties in your state. They are generated based on your your default state. For example, if you have a state property called `myValue`, a dynamic setter would be created called `setMyValue`, and any argument passed to `setMyValue` would set `myValue` in state to that argument value

Dynamic setters are turned on by default, and can be turned off by passing `{dynamicSetters: false}` to your CF initialization. 

```
const defaultState = {
    myValue: 0
}

const main = new CantusFirmus(defaultState)

// other initialization steps... 
```

With that initialization, your `setters` object now has a `setMyValue` method, and you can do something like the following.
```
setters.setMyValue(1)
```

In the event that you wish to use a dynamic setter to set the value based on the previous state, you have two options. 

**Option 1: Use async/await**

```
const someAsyncFunction = async () => {
    await setters.setMyValue(state.myValue + 1)
    await setters.setMyValue(state.myValue + 1)
    await setters.setMyValue(state.myValue + 1)
}
```

By the end of this state transaction, myValue will be increased by 3. This is very clean and concise, but requires the setter call to be wrapped in an async function. Additionally, because the `await` keyword will block execution, excessive use of this pattern can cause a minor performance hit.

**Option 2: Pass a function as the argument**

```
const addOne = prevState => {
    return {myValue: prevState.myValue + 1}
}

setters.setMyValue(addOne)
setters.setMyValue(addOne)
setters.setMyValue(addOne)
```

This will also result in `myValue` being increased by 3. This is slightly more verbose, but does not require that the setter call be wrapped in an async function.

### **Nested Setters**

If you initialize you CF instance with the `{nestedSetters: true}` option, you will get dynamic setters for any nested properties in your state.

```
const defaultState = {
    myValue: 0,
    nested: {
        value: "Hello"
    }
}

const main = new CantusFirmus(defaultState, {nestedSetters: true})

// other initialization steps... 
```

Now, if you check what setters are available in your setters object, you'll find one named `setNested_value`. Nested setters work the same as any other dynamic setter. Note that the path to the nested property is delimited by an underscore. This is the naming convention for nested setters. 

### **Custom Setters**

Dynamic setters only allow you to set a single state property at a time, and to the single value that is passed as an argument to the setter. If you desire lower level control over the state change for a specific property, or you want to update multiple state properties with one method, you can add custom setters to achieve these goals. 

Custom setters are just methods that get bound to the provider component, and *typically* internally call `this.setState`. Nothing enforces that custom setters must call `this.setState`, but it is recommended that you maintain this pattern for predictable functionality. 

Custom setters are added via the `addCustomSetters` method available on the CF instance. 

```
const defaultState = {
    userID: 12345,
    username: "cantus-firmus"
} 

const main = new CantusFirmus(defaultState)

const customSetters = {
    logout(){
        this.setState({
            userID: null,
            username: null
        })
    }
}

main.addCustomSetters(customSetters)
```

In the above example, we have a state with a `userID` and `username`. When a user logs out, we probably want to clear all user related fields. With the dynamic setters of CF, we could accomplish this in two calls: `setUserID(null)`, and `setUsername(null)`. Since the logout behavior will always change both, it makes more sense to bundle these state operations together. Our custom `logout` setter above does just that, so we now have a convenient, and syntactically correct setter to call to logout a user. 

Custom setters are accessed in the same way as dynamic setters.

```
const myComponent = () => {
    
    // destructure setters from context;
    const { setters } = useContext(MainContext);

    // destructure individuals setter functions from setters
    // Note that our custom logout setter is available here along with our dynamic setters
    const { logout, setUserID, setUsername } = setters;

    /*
    other component stuff...
    */
    
}

```
### **A note on `this.setState`** 

Custom setters internally call `this.setState`. Inline with the focus on familiarity, `this.setState` works as you would expect from vanilla React. However, Cantus Firmus allows for the extended ability to use the async/await syntax with `this.setState`.

```
const customSetters = {
    async example(){
        const updatedState = await this.setState(/* some state change here */)

        // updatedState now reflects the state with the state change.
    }
}
```

If you are performing a state change that requires information from the previous state, the vanilla React pattern is to pass a function with the previous state as the first argument. This is because React batches state changes, and you cannot be sure that the current value in state will be the same when you execute your setter function. This will still work in CF, but you may also use setState with async/await.

The following two examples accomplish the same thing. They both increase some `count` value in state by 1 while referencing the current value in state.

```
const customSetters = {
    standardWay(){
        this.setState(prevState => {
            return {count: prevState.count + 1}
        })
    },

    async asyncAwaitWay(){
        await this.setState({count: this.state.count + 1})
    }
}
```

Also of note, `this.setState` returns a promise in CF. One completed, the promise resolves to the newly updated state.

## Methods

It may be the case that you have some helper function that requires access to state and/or state setters. In vanilla React, you would have to pass your state and setters as arguments to the helper function and then reference/execute them within the scope of that helper function. Cantus Firmus provides a much simpler way of accomplishing this via `methods`. 

In CF, you can add custom methods to your CF instance that, like custom setters, get bound to the provider component and get access to the `this` keyword. These methods can then access `this.state` and `this.setters` internally, without you having to pass them in as arguments. This can greatly simplify your code.

Methods are added to your CF instance via the `addMethods` method.

```
const main = new CantusFirmus(defaultState)

const customMethods = {
    someCustomMethod(){
        // can access `this` in here
    }
}

main.addMethods(customMethods)
```

A common use for methods might be to send API calls and then set state based on the response. 

```
const customMethods = {
    getUserFriends(){
        fetch(`https://someAPI.com?userID=${this.state.userID}`)
            .then(response => response.json())
            .then(data => this.setters.setUserFriends(data))
    }
}
```
In the above example, we access both `this.state` and `this.setters`. Now, we can simply call `getUserFriends` without having to pass in state or setters and it will automatically call and set our state for us. 

## Namespaced Methods

Namespaced methods allow you to segment your methods based on function by giving them unique names. The resulting method groups in your context value will be identical to the `methods` value described above in that they are simply functions that will have access to the `this` keyword.

For example, if you had a set of methods that accessed some REST API, and another set of methods that derived values from multiple parts of you state, you may want to segment the logic of those two groups so that you are not accessing the `methods` value from your context for both. The `addNamespacedMethods` instance method allows you to do this very easily. 

```
const main = new CantusFirmus(defaultState)

const methodGroups = {
    API: {
        getData(){
            fetch(url)...
        }
    },
    derivedState: {
        deriveFullName(){
            return `${this.firstName} ${this.lastName}`
        }
    }
}

main.addNamespacedMethods(methodGroups);
```

Now, in your context value, you will have access to `API` and `derivedState` as separate method groups.

```
const MyComponent = () => {
    // we can destructure these methods individually making for cleaner, more readable code.
    const {API, derivedState} = useContext(MainContext);

    // other component setup ...

    return (
        <>
            <h1>{derivedState.deriveFullName()}</h1>
            <button onClick={e => API.getData()}>Call API</button>
        </>
    )

}
```


### **Defining Custom Setters & Methods**

You define your custom setters and methods as functions in a standard JS object. When you add them to your CF Instance, they get bound to the provider component so that you have access to the `this` keyword. Since custom setters and methods will require a `this` keyword, you cannot use arrow functions when you define them. 

```
{
    someSetter(){
        // this is the recommended syntax
    },

    someOtherSetter: function(){
        // this will also work
    },

    badIdea: () => {
        // this will not work
    }
}
```
### Setters Vs Methods

Setters and methods may seem rather similar as they are just collections of functions bound to a provider component. While you *can* substitute one for the other in any situation, they have been provided as separate utilities so that their function and purpose do not conflict. 

Setters are intended to house the logic that changes state. Each setter should call `this.setState`. Methods are a level of abstraction higher. They should not concern themselves with directly setting state or any of the logic that is required in that action. Rather, they allow for simple access to state and setters, and house any logic that later calls on these items.  

## Getters

In most cases, the easiest way to access your CF instance state is by the standard dot notation.

```
const { state } = useContext(MyContext)

state.myValue
```

However, there are situations, such as closures, where this way of accessing state may become problematic.

```
// This will not work!

const { state } = useContext(MyContext)

useEffect(() => {

    const myInterval = setInterval(() => {
        if(state.myValue){
            // execute some additional code here
        } else {
            clearInterval(myInterval)
        }
    }, 1000)

    return () => { clearInterval(myInterval) }

}, [])
```

In the above example, inside the `useEffect` callback, we have defined an interval that performs some action every second so long as `myValue` in the state is truthy. Presumably, we would want to be able to change the value of `myValue` to something falsy in some other component, and to have that cancel the interval. Due to the closure, this will not work as `state.myValue` will be set inside the interval callback to whatever its initial value was, and no updates will be read.  

For situations such as these, all CF contexts are initialized with dynamic getter methods by default. As the name implies, these getters serve as wrappers by which to access your state. Just as we get a `setters` object in our context, we also get a `getters` object that is auto populated with getter functions. The syntax is also similar to our setters: if you have a value, `myValue`, you will then have a getter called `getMyValue`. If you require nested getters, you can set `nestedGetters` to `true` in your CF initialization. Nested getters would then look something like `getNested_value`

We can very easily change the code above to work with one of these dynamic getters. 

```
// This will work!

const { getters } = useContext(MyContext)

useEffect(() => {

    const myInterval = setInterval(() => {
        if(getters.getMyValue()){
            // execute some additional code here
        } else {
            clearInterval(myInterval)
        }
    }, 1000)

    return () => { clearInterval(myInterval) }

}, [])
```
Now, each time the interval is run, it accesses the `myValue` property in our state via the getter, `getMyValue`, and so updates to the property are observed. 

In short, getters are an excellent option for any situation where closures prevent state updates from being observed. 

## Reducers

> **Note:** Reducers are an experimental feature in Cantus Firmus, and are still in development at this time. They currently offer less functionality and flexibility than the previously mentioned `setters`. 

For those how prefer the reducer/dispatch format for setting state, you can add custom reducers to your CF instance with the `addReducers` method. Reducers are just functions that return the updated (not directly mutated) state.

```
const defaultState = {
    num1: 0,
    num2: 0,

    str1: "Hello",
    str2: "world",
}

const main = new CantusFirmus(defaultState)

const customReducers = {

    numReducer(state={}, action){
        switch(action.type){
            case "UPDATE_NUM_1":
                return {...state, num1: action.payload}
            case "UPDATE_NUM_2":
                return {...state, num1: action.payload}
            default:
                return state
        }
    },

    stringReducer(state={}, action){
        switch(action.type){
            case "UPDATE_STR_1":
                return {...state, str1: action.payload}
            case "UPDATE_STR_2":
                return {...state, str2: action.payload}
            default:
                return state
        }
    }
}
```

We can define multiple reducer functions to separate the logic of our state changes. In the above example, we have one reducer that handles updates to the `num` properties, and one that updates the `str` properties.

Internally, a dispatch function is generated for each reducer. When you access reducers in a child component, you aren't actually accessing the reducer that you made, but an object containing these auto generated dispatch functions namespaced to the reducer name you specified. When we want to execute a specific action, we do the following:

```
const myComponent = () => {

    // destructure state and reducers
    const { state, reducers } = useContext(MyContext);
    
    // destructure specific reducer function we want
    const { stringReducer } = reducers

    const handleClick = e => {
        // execute the auto generated dispatch function
        stringReducer.dispatch(state, {type: "UPDATE_STR_1", payload: "Goodbye"})
    }
    
    // do other component stuff...
}

```

Like the modified `this.setState`, the generated dispatch function is asynchronous. It returns a promise that resolves to the updated state. So something like the following will work (though it's not necessarily recommended):

```
const newState = await numReducer.dispatch(state, {
    type: "UPDATE_NUM_1", 
    payload: state.num1 + 1
})

await numReducer.dispatch(newState, {
    type: "UPDATE_NUM_1",
    payload: newState.num1 + 1
})

```

## Constants

As the name suggests, constants are values passed down in your context that cannot be changed. Constants are useful for providing things like configuration and styles to your subscribed components. 

Constants are defined in an object, and are added to your CF instance via the `addConstants` method.

```
const main = new CantusFirmus ({})

const myConstants = {
    largeRedText: {
        color: "red",
        fontSize: "2rem"
    },

    myConfigValue: "some config value here"
}

main.addConstants(myConstants)
```

Note that you can also include functions in your constants definition. However, Unlike `setters` and `methods`, any function defined in your constants will not be bound to your provider component, and will therefore not have a `this` keyword associated with the provider/context. This is fine for utility functions which do not require knowledge of state or setters. 

___

# Advanced Configuration
___

## Efficient Updating

### Subscriber

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

Context definitions are just objects with the following properties:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| context | React Context | true | A reference to a context |
| key | String | false | Defines how the context will be named when it is passed down in props. If omitted, it will default to the following naming convention: if only one context is passed, it will be called "context". If multiple contexts are passed and keys are omitted for all of them, the first context will be named "context1", the second, "context2" and so on. |
| dependencies | [String or [String]] | true | An array of strings listing the context properties that should trigger a re-render if changed. Nested properties can be indicated by passing an array of strings into the dependency array. |

___


## ConnectToLocalStorage

Cantus Firmus makes two typically challenging scenarios quite simple to achieve: state persistance, and sharing state between windows under the same domain. Both are accomplished by saving and updating state in the browser's local storage. 

Connecting a CF instance's state to local storage is done through the `connectToLocalStorage` method. There are several options that can be defined when establishing this connection. 

### ConnectToLocalStorage Options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| name | String (required) | null | A string that is unique from any other `localStorage` key name (including any other names set in other CF instances). This will become the key name under which the instances state is stored in `localStorage`. | 
| initializeFromLocalStorage | Boolean | false | Specifies if the state should be loaded from the `localStorage` rather than with the default initialization values. Note that if the `localStorage` does not contain a reference to the state, default values will be loaded. Regardless of what value is set in this field, windows with names provided in the `subscriberWindows` parameter will initialize from localStorage. | 
| providerWindow | String | null | Specifies the `window.name` property of the parent window. If no value is given, it will default to the same string specified in the `name` option. | 
| subscriberWindows | [String] | Empty Array | An array of strings that has a comprehensive list of the names of the windows that may subscribe to the shared state through `localStorage`. These windows will automatically initialize from localStorage regardless of the value set in `initializeFromLocalStorage`| 
| removeChildrenOnUnload | Boolean | true | If true, will close all children windows spawned from the `windowManager.open` method. Note that if a child window spawns another window (grandchild), that window will also be closed if this parameter is set to true. |
| clearStorageOnUnload | Boolean | true | If true, when the `providerWindow` is closed, all associated state stored in `localStorage` will be removed. |
| privateStatePaths | [String or [String]] | Empty Array | Specifies state parameters of the provider window that will not be saved to local storage. Elements in the array may be strings or arrays of strings. The latter options allows for you to specify a nested parameter as private while still passing parameters higher in the state structure. This feature is useful if you do not wish to share parts of your state with child/grandchild windows, or if you have marginally sensitive data in your state and do not wish to expose it to local storage. |

> Note: Local storage is easily accessible and editable by the end user. Keep this in mind when you choose what state to expose in local storage. 

### Initialization:

```
const main = new CantusFirmus({value1: 1, value2: 2})

main.connectToLocalStorage({
    name: "main", // this is a required parameter
    providerWindow: "mainWindow",
    subscriberWindows: ["child", "grandchild"]
    removeChildrenOnUnload: true,
    clearStorageOnUnload: false,
    privateStatePaths: ["value1"]
})
```

## Persisting State with Local Storage

Persisting state over page reloads is very easy with CF. If you set `initializeFromLocalStorage` to true, your main/provider window will load default state values from those specified in the local storage. If this is the desired functionality, make sure to also set `clearStorageOnUnload` to false, so the local storage persists in that domain even if the user leaves the page. 

If there are some state values that you wish not to initialize from local storage, you can set them in the `privateStatePaths` parameter. Any value indicated in this parameter will not ever be saved to local storage. If you are initializing from a persisted local storage, and have private state values specified, those values will initialize to whatever you have set in your default state object. 

```
const main = new CantusFirmus({value1: 1, value2: 2})

main.connectToLocalStorage({
    name: "main",
    initializeFromLocalStorage: true,
    clearStorageOnUnload: false,
    privateStatePaths: ["value1"]
})

// other CF configuration...
```

## Inter-Window Communication through Local Storage

Local storage is synced between all windows on the same domain. In saving our state to local storage, it becomes available to all other open windows on that domain. Even though this is the default behavior of your browser, there is still typically substantial work that goes into managing state across windows. Cantus Firmus handles many common scenarios in the background, such as listening for local storage updates and then updating the window's state. It also provides a custom `windowManager` method for spawning new windows and keeping track of those spawned windows. 

Just like the provider/subscriber pattern in React context, windows are organized into provider and subscriber roles. The original window becomes the provider, and all children spawned from it with the windowManager become subscribers. Provider windows will have access to the whole state object. Subscribers only have access to those state parameters not set in `privateStatePaths`.   

#### **WindowManager**

Each CF instance connected to local storage gets a windows manager. The window manager has three methods:

| Name | Arguments | Description |
| --- | --- | --- |
| open | url: string, name: string, params: object | Opens a new window and keeps reference to that window locally so it can later close it. The url and name arguments are both required. The params object is options and allows you to set query params on the new window |
| close | name: string | Closes the target window with the given name. Note that it is best to close a window through this method as it will also remove the local reference to that window. If you close a window without this method, the reference will still exist in the provider window. | 
| getChildren | none | Returns an object with references to all spawned windows. |  


```
const myComponent = () => {
    const { windowManager } = useContext(MyContext)


    const handleOpenClick = e => {
        // the call below will open a new window at "/config?theme=dark_mode", and name the window "config"
        windowManager.open(
            `${window.location.hostname}/config`,
            "config",
            {theme: "dark_mode"}
        )
    }

    const handleCloseClick = e => {
        windowManager.close("config")
    }

    return (
        <>
            <button onClick={handleOpenClick}>Open Config Window</button>
            <button onClick={handleCloseClick}>Close Config Window</button>
        </>
    )

}

```

# Command Line Interface

A CLI is included with the Cantus Firmus install, and it allows you to quickly create a CF state manager and associated support files (setters, methods, etc.). 

## Package.json Script

The easiest way to execute the CLI script is to add a shortcut to your `package.json` file. 

```
"scripts": {
    "cf-cli": "node ./node_modules/cantus-firmus/cli.js"
}
```

## File Structure

A CF state manager created through the CLI will save all its files in the following format:

> `NAME` replaced by user defined name for their state manager

```
src
|___state
    |___<NAME>
        |___<NAME>Provider.js (CF initialization & configuration)
        |___state.js (required: default state for CF instance)
        |___setters.js (optional: custom setter definitions)
        |___methods.js (optional: custom method definitions)
        |___reducers.js (optional: custom reducer definitions)
        |___constants.js (optional: constant values) 
```
## CLI Flags & Options

> Note: the examples below assume you have setup a `package.json` script like the one shown above. Replace `cf-cli` with your script name, or simply run directly through node. If you are running through a `package.json` script, make sure to include the `--` before any arguments/flags so they get passed to the script.

If you run the cli without any options or flags set, you will be taken to a setup wizard which will walk you through setting up your CF instance. Simply follow the instructions printed to your terminal. 

### Specifying a Name

The first parameter you might set is the name of your state manager.

```
npm run cf-cli -- --name=main
```

The above with create a directory called `main` inside your state management directory. With this command, you will still be walked through the setup wizard to select your desired support files. 

### Support File Flags

If you indicate any of the flags below, a support file for that item will be created, and it will automatically be added to your CF instance. 

| Flag | Support File | Description |
| --- | --- | --- |
| -s | state.js | Default state | 
| -c | setters.js | Custom setters |  
| -m | methods.js | Custom methods | 
| -r | reducers.js | Custom Reducers | 
| -k | constants.js | Constants | 

**Example:**

In the example below, a file called `mainProvider.js` will be created for you housing the CF instance configuration, as well as three support files, `state.js`, `setters.js`, and `methods.js`. These will all be saved into a directory called `main`.

```
npm run cf-cli -- --name=main -scm
```

### Changing Default Names

If you want to change the name of a support file to be more syntactically correct based on your usage, you can do that by specifying `--<SUPPORT_FILE_NAME>=<DESIRED_NAME>`. If you specify a support file in this way, you do not need to include its flag also.  

Possible support file names are `state`, `setters`, `methods`, `reducers`, and, `constants`

**Example:**

```
npm run cf-cli -- --name=main -sc --methods=API 
```

Now, rather than a file named `methods.js`, you will have a file called `API.js`. Note that this only changes the file name, and not the name within your CF instance. If you want the value in your context to also be named `API`, make sure to use the CF instance's `rename` method to do so. 

As the example above shows, you can combine flags and rename files in the same command. The above will create the following state management resource for you:

```
src
|___state
    |___main
        |___mainProvider.js
        |___state.js
        |___setters.js
        |___API.js
```

