import React, { createContext, PureComponent, useContext, useMemo } from "react";

// const React = require('react')
// const { createContext, Component } = React

// ========================== HELPER METHODS ==========================

const bindMethods = (methods, self) => {
    /* 
    takes an object of methods and binds them to a given "self"
    */
    const bound = {}
    for (let method in methods) {
        bound[method] = methods[method].bind(self)
    }
    return bound;
}


const formatStateName = (name, prefix = "") => {
    /* 
    Takes an object key (name) as an input, and returns that name capitalized with the word "set" prepended to it.
    If the word already starts with a capital letter (or and underscore _), returns null. 

    This functionality allows for standard key names to automatically get setters, while also allowing for users to specify key names that should not be changed or should not get setters. 
    */
    name = name.split("");

    if (name[0] === name[0].toUpperCase()) return null;

    name[0] = name[0].toUpperCase()
    return prefix + name.join("");
}

const getNestedRoutes = (state) => {
    /* 
    takes a state object and returns paths (as arrays) of all routes, including nested object structures
    */
    const paths = []

    const traverse = (element, currentPath = []) => {
        // base cases
        if (typeof element !== "object" || Array.isArray(element) || !element) {
            currentPath.length > 1 && paths.push(currentPath);
            return;
        }

        currentPath.length > 1 && paths.push(currentPath)
        for (let key of Object.keys(element)) {
            traverse(element[key], [...currentPath, key])
        }
    }
    traverse(state)
    return paths;
}


const nestedSetterFactory = (state, nsPath) => (newValue) => {
    let copy = { ...state };
    let currentPath = copy;
    let key;
    for (let i = 0; i < nsPath.length; i++) {
        key = nsPath[i];

        if (i < nsPath.length - 1) { // if not on the last key in the provided path
            currentPath[key] = { ...currentPath[key] }
        } else { // if on last key, reassign value to the new value
            currentPath[key] = newValue
        }

        currentPath = currentPath[key]
    }

    return copy
}

const getNestedValue = (state, nsPath) => {
    let copy = { ...state },
        currentPath = copy,
        key;

    for (let i = 0; i < nsPath.length; i++) {
        key = nsPath[i]
        if (i === nsPath.length - 1) { // we have reached the desired nested level
            return currentPath[key]
        }
        currentPath = currentPath[key]
    }
}


const createStateSetters = (state, ignoredSetters = [], nestedSetters = false, setters = {}) => {
    /* 
    iterates through a provided state object, and takes each key name (state value) and creates a setter method for that value. 
    Following the standard React convention, a key called "myKey" would get a setter method called "setMyKey".
    */

    let formattedName;
    for (let s in state) {
        formattedName = formatStateName(s, "set");

        if (formattedName && !ignoredSetters.includes(s)) {
            setters[formattedName] = async function (value, cb = () => {}) {
                if(typeof value === "function"){
                    return new Promise(async resolve => {
                        resolve(await this.setState(value, cb))
                    })
                } else {
                    const newState = {}
                    newState[s] = value;
                    return new Promise(async resolve => {
                        resolve(await this.setState(newState, cb))
                    })
                }
            }
        }
    }

    // handle creation of nested setters
    if (nestedSetters) {
        const nestedPaths = getNestedRoutes(state);
        let nestedName;
        for (let nsPath of nestedPaths) {
            nestedName = nsPath.join("_");
            formattedName = formatStateName(nestedName, "set")
            if (formattedName && !ignoredSetters.includes(nestedName)) {
                setters[formattedName] = async function (value) {
                    const newState = nestedSetterFactory(this.state, nsPath)(value) // reassign the nested value and return whole state object;
                    return new Promise(async resolve => {
                        resolve(await this.setState(newState))
                    })
                }
            }
        }
    }

    return setters;
}

const createStateGetters = (state, ignoredGetters = [], nestedGetters = true, getters = {}) => {
    /* 
    iterates through a provided state object and creates getter wrapper functions to retrieve the state (rather than grabbing directly from the state object)
    */
    let formattedName;
    for (let s in state) {
        formattedName = formatStateName(s, "get");
        if (formattedName && !ignoredGetters.includes(s)) {
            getters[formattedName] = function () {
                return this.state[s]
            }
        }
    }

    // handle creation of nested getters
    if (nestedGetters) {
        const nestedPaths = getNestedRoutes(state);
        let nestedName;
        for (let nsPath of nestedPaths) {
            nestedName = nsPath.join("_");
            formattedName = formatStateName(nestedName, "get")
            if (formattedName && !ignoredGetters.includes(nestedName)) {
                getters[formattedName] = function () {
                    return getNestedValue(this.state, nsPath)
                }
            }
        }
    }

    return getters
}

const createParamsString = (params = {}) => {
    let str = ""
    for (let param of Object.keys(params)) {
        str += (param + "=" + params[param] + ",")
    }
    return str;
}

const cleanState = (state, privatePaths) => {

    /* 
    takes a state object and list of private paths as inputs, and returns the state with the private paths removed. 
    */
    const cleaned = { ...state } // make a copy of state
    let np, nestedPath;
    for (let path of privatePaths) {
        if (Array.isArray(path)) { // if provided with a nested path, traverse down and delete final entry
            nestedPath = cleaned;
            for (let i = 0; i < path.length; i++) {
                np = path[i];
                try {
                    if (i === path.length - 1) {
                        delete nestedPath[np]
                    } else {
                        nestedPath = nestedPath[np]
                    }
                } catch (err) { // if a provided key along the path does not exist, inform user
                    console.error(`Provided key, ["${path[i - 1]}"] does not exist\n\nFull error message reads:\n\n`, err)
                    break;
                }
            }
        } else {
            delete cleaned[path];
        }
    }

    return cleaned;

}

const createReducerDispatchers = (reducers) => {
    const reducerMethods = {}
    for (let r in reducers) {
        // console.log(r)
        reducerMethods[r] = (state, action) => {
            this.setState(reducers[r](state, action))
        }

    }

    // console.log(reducerMethods.stateReducer)

    return reducerMethods
}


// ========================== DEFAULT OPTIONS ==========================


const DEFAULT_OPTIONS = {
    dynamicSetters: true,
    dynamicGetters: true,
    allowSetterOverwrite: true,
    developmentWarnings: true,
    overwriteProtectionLevel: 1,
    nestedSetters: false,
    nestedGetters: true
}

const DEFAULT_STORAGE_OPTIONS = {
    name: null,
    unmountBehavior: "all",
    initializeFromLocalStorage: false,
    subscriberWindows: [],
    removeChildrenOnUnload: true,
    clearStorageOnUnload: true,
    privateStatePaths: []
}

const PROTECTED_NAMESPACES = [
    "props",
    "context",
    "refs",
    "updater",
    "state",
    "setters",
    "getters",
    "reducers",
    "generateDispatchers",
    "reducersWithDispatchers",
    "methods",
    "_boundNamespacedMethods",
    "bindToLocalStorage",
    "storageOptions",
    "updateStateFromLocalStorage",
    "setStateMaster",
    "setState",
    "_reactInternals",
    "_reactInternalInstance",
    "windows"
]


// ========================== CANTUS_FIRMUS CLASS ==========================

class CantusFirmus {
    constructor(state, options = {}) {
        this.context = createContext(null);
        this.state = state;

        this.setters = {};
        this.getters = {};
        this.reducers = {};
        this.constants = {};
        this.methods = {};
        this.namespacedMethods = {};

        // OPTIONS
        this.options = { ...DEFAULT_OPTIONS, ...options }

        this.dynamicSetters = this.options.dynamicSetters
        this.dynamicGetters = this.options.dynamicGetters
        this.allowSetterOverwrite = this.options.allowSetterOverwrite
        this.developmentWarnings = this.options.developmentWarnings
        this.overwriteProtectionLevel = this.options.overwriteProtectionLevel
        this.nestedSetters = this.options.nestedSetters

        // initialize blank storageOptions (will be populated later if user chooses)
        this.storageOptions = {}

        // Local Storage Connection
        this.bindToLocalStorage = false


    }

    addCustomSetters(setters) {
        this.setters = setters
    }

    ignoreSetters(settersArr) {

        settersArr = settersArr.map(s => {
            return Array.isArray(s)
                ? s.join("_")
                : s
        })

        this.ignoredSetters = settersArr || []
    }

    addCustomGetters(getters) {
        this.getters = getters
    }

    ignoreGetters(gettersArr) {

        gettersArr = gettersArr.map(g => {
            return Array.isArray(g)    
                ? g.join("_") 
                : g
        })

        this.ignoredGetters = gettersArr || []
    }

    addReducers(reducers) {
        this.reducers = reducers
    }

    addConstants(newConstants) {
        this.constants = { ...this.constants, ...newConstants }
    }

    addMethods(methods) {
        this.methods = methods;
    }

    addNamespacedMethods(methodsMap){
        this.namespacedMethods = methodsMap;
    }

    rename(nameMap) {
        this.renameMap = nameMap || {}
    }

    connectToLocalStorage(options = {}) {
        this.bindToLocalStorage = true
        this.storageOptions = { ...DEFAULT_STORAGE_OPTIONS, ...options }

        // if no name is specified, throw an error, as this is a required field to manage multiple localStorage instances
        if (!this.storageOptions.name) throw new Error("When connecting your cf instance to the local storage, you must provide an unique name (string) to avoid conflicts with other local storage parameters.")

        // default the provider window name to the localStorage name if providerWindow param not given
        this.storageOptions.providerWindow = this.storageOptions.providerWindow || this.storageOptions.name

        // if user has specified to load state from local storage (this only impacts the provider window)
        if (this.storageOptions.initializeFromLocalStorage) {
            if (window.localStorage.getItem(this.storageOptions.name)) this.state = {
                ...this.state,
                ...JSON.parse(window.localStorage.getItem(this.storageOptions.name))
            }
        }

        // if the window is a subscriber window, automatically initialize from local storage
        // Note that the implementation here is slightly different from the stand initializeFromLocalStorage above because if a state resource is desginated as private, subscriber windows should not initialize default values for those private resources.
        if (this.storageOptions.subscriberWindows.includes(window.name)) {
            if (window.localStorage.getItem(this.storageOptions.name)) {
                this.state = JSON.parse(window.localStorage.getItem(this.storageOptions.name))                
            }
        }

        if (!window.name && this.storageOptions.providerWindow) window.name = this.storageOptions.providerWindow



    }

    createProvider() {
        // copy instance properties/methods
        const Context = this.context;
        const state = this.state;
        let constants = this.constants
        let reducers = this.reducers
        let methods = this.methods;
        let namespacedMethods = this.namespacedMethods;
        let ignoredSetters = this.ignoredSetters;
        let ignoredGetters = this.ignoredGetters;
        let renameMap = this.renameMap || {}

        const bindToLocalStorage = this.bindToLocalStorage;
        const storageOptions = this.storageOptions
        let setters,
            getters;

        // initialize local storage with state
        // also check to make sure that any state paths marked as private are removed before setting local storage
        if (storageOptions.name) {
            const authorizedState = cleanState(state, storageOptions.privateStatePaths)
            storageOptions.name && localStorage.setItem(storageOptions.name, JSON.stringify(authorizedState))
        }


        // Pre class definition setup

        // GETTER CREATION
        getters = this.dynamicGetters ? { ...createStateGetters(state, ignoredGetters, this.nestedGetters), ...this.getters } : { ...this.getters }

        // SETTER CREATION
        if (this.allowSetterOverwrite) {
            setters = this.dynamicSetters ? { ...createStateSetters(state, ignoredSetters, this.nestedSetters), ...this.setters } : { ...this.setters };
        } else {
            let dynamicSetters = createStateSetters(state, ignoredSetters)
            const dynamicKeys = Object.keys(dynamicSetters);

            for (let key of Object.keys(this.setters)) {
                if (dynamicKeys.includes(key)) {

                    if (this.developmentWarnings) {

                        this.overwriteProtectionLevel === 1
                            &&
                            console.warn(`The user defined setter, '${key}', was blocked from overwriting a dynamically generated setter of the same name. To change this behavior, set allowSetterOverwrite to true in the CantusFirmus options.`)

                        if (this.overwriteProtectionLevel >= 2) {
                            throw new Error(`The user defined setter, '${key}', was blocked from overwriting a dynamically generated setter of the same name. To change this behavior, set allowSetterOverwrite to true in the CantusFirmus options.`)
                        }


                    }
                    delete this.setters[key]
                }
            }
            setters = this.dynamicSetters ? { ...createStateSetters(state, ignoredSetters, this.nestedSetters), ...this.setters } : { ...this.setters };
        }

        // define Provider class component
        class Provider extends PureComponent {
            constructor(props) {
                super(props);
                this.state = state
                this.setters = bindMethods(setters, this);
                this.getters = bindMethods(getters, this);
                this.constants = constants;

                // set this.reducers to the reducers added in the CantusFirmus Class 
                this.reducers = reducers
                // bind generateDispatchers
                this.generateDispatchers = this.generateDispatchers.bind(this);
                // Create reducers that are copies in name of the previously added reducers
                // Then, give a dispatch method to each that will execute the actual reducer
                this.reducersWithDispatchers = this.generateDispatchers(reducers)

                // Bind methods
                this.methods = bindMethods(methods, this);
                // create and bind namespaced methods
                this._boundNamespacedMethods = {};
                
                for(let [key, methodGroup] of Object.entries(namespacedMethods)){
                    if(PROTECTED_NAMESPACES.includes(key)) throw new Error(`The namespace, ${key}, was provided as a key in 'addNamespacedMethods'. ${key} is a protected value, and cannot be reassigned. Please select a different name.`)

                    this._boundNamespacedMethods[key] = bindMethods(methodGroup, this)
                    // add the namespaced values to `this` so they are accessible in other bound functions (setters, other methods)
                    this[key] = this._boundNamespacedMethods[key]
                }

                this.bindToLocalStorage = bindToLocalStorage;
                this.storageOptions = storageOptions;

                this.updateStateFromLocalStorage = this.updateStateFromLocalStorage.bind(this);

                // Save master version of setState prior to reassignment
                this.setStateMaster = this.setState;

                // Reassign setState function to return a promise, and by default, handle localStorage changes
                this.setState = function (state, callback = () => { }) {
                    return new Promise(resolve => {
                        this.setStateMaster(state, () => {
                            // handle local storage updates to state
                            if (this.bindToLocalStorage) {
                                if (this.storageOptions.privateStatePaths.length && window.name === this.storageOptions.providerWindow) { // if there are any private paths that need to be removed (only proceed if fired from the provider window)
                                    const authorizedState = cleanState(this.state, this.storageOptions.privateStatePaths)
                                    // const authorizedState = { ...this.state }
                                    // for (let path of this.storageOptions.privateStatePaths) {
                                    //     delete authorizedState[path]
                                    // }
                                    localStorage.setItem(this.storageOptions.name, JSON.stringify(authorizedState))
                                } else {
                                    localStorage.setItem(this.storageOptions.name, JSON.stringify(this.state))
                                }
                            }
                            callback(this.state)
                            resolve(this.state)
                        })
                    })
                }

                this.setState = this.setState.bind(this);
            }

            generateDispatchers(reducers) {
                const reducersWithDispatchers = {}

                // define a dispatcher factory to handle the creation of new dispatchers
                const dispatcherFactory = function (reducerKey) {
                    return async function (state, action) {
                        return await this.setState(this.reducers[reducerKey](state, action))
                    }
                }

                let dispatch;
                for (let reducer in reducers) {
                    dispatch = dispatcherFactory(reducer).bind(this);
                    reducersWithDispatchers[reducer] = { dispatch }
                }

                return reducersWithDispatchers
            }

            updateStateFromLocalStorage() {

                try {
                    this.setState({ ...this.state, ...JSON.parse(window.localStorage.getItem(storageOptions.name)) })
                } catch (err) { // bug check: is this still needed?
                    const updatedState = typeof localStorage[storageOptions.name] === "string"
                        ?
                        { ...this.state, ...JSON.parse(localStorage[storageOptions.name]) }
                        :
                        { ...this.state }

                    this.setState(updatedState)
                }
            }

            createWindowManager() {

                // storage object for opened child windows
                this.windows = this.windows || {};

                // window manager methods passed to user
                const windowManagerMethods = {
                    open(url, name, params = {}) {
                        this.windows[name] = window.open(url, name, createParamsString(params))
                    },
                    close(name) {
                        if (this.windows[name]) {
                            this.windows[name].close();
                        }
                        delete this.windows[name]
                    },
                    getChildren() {
                        return this.windows;
                    }
                }

                // bind methods to 'this'
                return bindMethods(windowManagerMethods, this)

            }

            _getWindows(){
                return this.windows
            }

            componentDidMount() {
                
                // When component mounts, if bindToLocalStorage has been set to true, make the window listen for storage change events and update the state 
                // if the window is already listening for storage events, then do nothing
                if (bindToLocalStorage) {
                    window.addEventListener("storage", () => {
                        this.updateStateFromLocalStorage()
                    })
                }

                // instruct the window what to do when it closes
                // we define this here, and not up in the CantusFirmus class because we need access to all generated child windows
                if (window.name === storageOptions.providerWindow || storageOptions.removeChildrenOnUnload) {
                    
                    function handleUnload(e) {
                        
                        // clear local storage only if specified by user AND the window being closed is the provider window 
                        if (storageOptions.clearStorageOnUnload && storageOptions.providerWindow === window.name) {
                            localStorage.removeItem(storageOptions.name)
                        }

                        // close all children (and grand children) windows if this functionality has been specified by the user
                        if (storageOptions.removeChildrenOnUnload) {
                            for (let w of Object.values(this._getWindows())) {
                                w.close()
                            }
                        }

                        // return "uncomment to debug unload functionality"
                    }

                    handleUnload = handleUnload.bind(this)

                    // set the unload functionality
                    window.addEventListener("beforeunload", handleUnload);
                    window.addEventListener("unload", handleUnload);

                }
            }

            componentDidUpdate(prevProps, prevState) {
                // Object.entries(this.props).forEach(([key, val]) =>
                //     prevProps[key] !== val && console.log(`Prop '${key}' changed`)
                // );
                // if (this.state) {
                //     Object.entries(this.state).forEach(([key, val]) =>
                //         prevState[key] !== val && console.log(`State '${key}' changed`)
                //     );
                // }
            }



            render() {

                const value = {
                    state: this.state,
                    setters: this.setters,
                    getters: this.getters,
                    methods: this.methods,
                    constants: this.constants,
                    ...this._boundNamespacedMethods, // expand any namespaced methods into the distributed value
                }

                // add reducers with dispatchers
                if (Object.keys(reducers).length) value.reducers = this.reducersWithDispatchers

                // initialize a window manager if within a multi-window state management system
                if (this.bindToLocalStorage) value.windowManager = this.createWindowManager();

                // rename value keys to user specifications
                for (let key of Object.keys(renameMap)) {
                    
                    if(PROTECTED_NAMESPACES.includes(renameMap[key])) throw new Error(`The name, ${renameMap[key]}, was provided in call to '.rename'. ${renameMap[key]} is a protected value and cannot be reassigned. Please select a different name.`)
                    
                    if (value[key]) {
                        value[renameMap[key]] = value[key];
                        delete value[key];
                        // reassign the value in 'this' for reference in across method types (setters, methods, etc.)
                        this[renameMap[key]] = this[key];
                    }
                }

                return (
                    <Context.Provider value={value}>
                        {this.props.children}
                    </Context.Provider>
                )
            }
        }

        // return provider class
        return Provider;
    }
}

export default CantusFirmus;




// ============================ Subscribe ============================

/* 
contextDependencies = [
    {context: Context, key: string name of context in props, dependencies: [string names of deps]},
    ...
]
 */

export const subscribe = (Component, contextDependencies) => {

    const CantusFirmusSubscriber = (props) => {

        let contexts = {},
            dependencies = [],
            nestedDep = null;

        // apply default key value when only 1 context is subscribed to, and no key value given
        if (contextDependencies.length === 1 && !contextDependencies[0].key) contextDependencies[0].key = "context"

        contextDependencies.forEach((ctx, i) => {

            ctx.key = ctx.key || `context${i + 1}` // if not key value is set, apply default here
            contexts[ctx.key] = useContext(ctx.context); // assign the entire context object so it can be passed into props

            for (let dep of ctx.dependencies) {

                if (typeof dep === "string") {

                    dependencies.push(contexts[ctx.key].state[dep]) // save just the desired state dependencies

                } else if (Array.isArray(dep)) { // allow for nested dependencies

                    nestedDep = contexts[ctx.key].state[dep[0]]
                    for (let i = 1; i < dep.length; i++) { // looping from 1 because we have already handled the first step in the nested path
                        nestedDep = nestedDep[dep[i]]
                    }
                    dependencies.push(nestedDep)

                }
            }

        })

        // add props to dependencies
        for (let propKey of Object.keys(props)) {
            dependencies.push(props[propKey])
        }

        return useMemo(
            () => <Component {...props} {...contexts} />,
            dependencies
        )
    }

    return CantusFirmusSubscriber;


}

