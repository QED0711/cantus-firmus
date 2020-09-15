"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribe = exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _this3 = void 0;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// const React = require('react')
// const { createContext, Component } = React
// ========================== HELPER METHODS ==========================
var bindMethods = function bindMethods(methods, self) {
  /* 
  takes an object of methods and binds them to a given "self"
  */
  var bound = {};

  for (var method in methods) {
    bound[method] = methods[method].bind(self);
  }

  return bound;
};

var formatStateName = function formatStateName(name) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  /* 
  Takes an object key (name) as an input, and returns that name capitalized with the word "set" prepended to it.
  If the word already starts with a capital letter (or and underscore _), returns null. 
   This functionality allows for standard key names to automatically get setters, while also allowing for users to specify key names that should not be changed or should not get setters. 
  */
  name = name.split("");
  if (name[0] === name[0].toUpperCase()) return null;
  name[0] = name[0].toUpperCase();
  return prefix + name.join("");
};

var getNestedRoutes = function getNestedRoutes(state) {
  /* 
  takes a state object and returns paths (as arrays) of all routes, including nested object structures
  */
  var paths = [];

  var traverse = function traverse(element) {
    var currentPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    // base cases
    if (_typeof(element) !== "object" || Array.isArray(element) || !element) {
      currentPath.length > 1 && paths.push(currentPath);
      return;
    }

    currentPath.length > 1 && paths.push(currentPath);

    for (var _i = 0, _Object$keys = Object.keys(element); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      traverse(element[key], [].concat(_toConsumableArray(currentPath), [key]));
    }
  };

  traverse(state);
  return paths;
};

var nestedSetterFactory = function nestedSetterFactory(state, nsPath) {
  return function (newValue) {
    var copy = _objectSpread({}, state);

    var currentPath = copy;
    var key;

    for (var i = 0; i < nsPath.length; i++) {
      key = nsPath[i];

      if (i < nsPath.length - 1) {
        // if not on the last key in the provided path
        currentPath[key] = _objectSpread({}, currentPath[key]);
      } else {
        // if on last key, reassign value to the new value
        currentPath[key] = newValue;
      }

      currentPath = currentPath[key];
    }

    return copy;
  };
};

var getNestedValue = function getNestedValue(state, nsPath) {
  var copy = _objectSpread({}, state),
      currentPath = copy,
      key;

  for (var i = 0; i < nsPath.length; i++) {
    key = nsPath[i];

    if (i === nsPath.length - 1) {
      // we have reached the desired nested level
      return currentPath[key];
    }

    currentPath = currentPath[key];
  }
};

var createStateSetters = function createStateSetters(state) {
  var ignoredSetters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var nestedSetters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var setters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  /* 
  iterates through a provided state object, and takes each key name (state value) and creates a setter method for that value. 
  Following the standard React convention, a key called "myKey" would get a setter method called "setMyKey".
  */
  var formattedName;

  var _loop = function _loop(s) {
    formattedName = formatStateName(s, "set");

    if (formattedName && !ignoredSetters.includes(s)) {
      setters[formattedName] = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(value) {
          var _this2 = this;

          var cb,
              newState,
              _args5 = arguments;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  cb = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : function () {};

                  if (!(typeof value === "function")) {
                    _context5.next = 5;
                    break;
                  }

                  return _context5.abrupt("return", new Promise( /*#__PURE__*/function () {
                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve) {
                      return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              _context3.t0 = resolve;
                              _context3.next = 3;
                              return _this2.setState(value, cb);

                            case 3:
                              _context3.t1 = _context3.sent;
                              (0, _context3.t0)(_context3.t1);

                            case 5:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, _callee3);
                    }));

                    return function (_x4) {
                      return _ref4.apply(this, arguments);
                    };
                  }()));

                case 5:
                  newState = {};
                  newState[s] = value;
                  return _context5.abrupt("return", new Promise( /*#__PURE__*/function () {
                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve) {
                      return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              _context4.t0 = resolve;
                              _context4.next = 3;
                              return _this2.setState(newState, cb);

                            case 3:
                              _context4.t1 = _context4.sent;
                              (0, _context4.t0)(_context4.t1);

                            case 5:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    }));

                    return function (_x5) {
                      return _ref5.apply(this, arguments);
                    };
                  }()));

                case 8:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }();
    }
  };

  for (var s in state) {
    _loop(s);
  } // handle creation of nested setters


  if (nestedSetters) {
    var nestedPaths = getNestedRoutes(state);
    var nestedName;

    var _iterator = _createForOfIteratorHelper(nestedPaths),
        _step;

    try {
      var _loop2 = function _loop2() {
        var nsPath = _step.value;
        nestedName = nsPath.join("_");
        formattedName = formatStateName(nestedName);

        if (formattedName && !ignoredSetters.includes(nestedName)) {
          setters[formattedName] = /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
              var _this = this;

              var newState;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      newState = nestedSetterFactory(this.state, nsPath)(value); // reassign the nested value and return whole state object;

                      return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
                          return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.t0 = resolve;
                                  _context.next = 3;
                                  return _this.setState(newState);

                                case 3:
                                  _context.t1 = _context.sent;
                                  (0, _context.t0)(_context.t1);

                                case 5:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee);
                        }));

                        return function (_x2) {
                          return _ref2.apply(this, arguments);
                        };
                      }()));

                    case 2:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));

            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }();
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop2();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return setters;
};

var createStateGetters = function createStateGetters(state) {
  var ignoredGetters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var nestedGetters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var getters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  /* 
  iterates through a provided state object and creates getter wrapper functions to retrieve the state (rather than grabbing directly from the state object)
  */
  var formattedName;

  var _loop3 = function _loop3(s) {
    formattedName = formatStateName(s, "get");

    if (formattedName && !ignoredGetters.includes(s)) {
      getters[formattedName] = function () {
        return this.state[s];
      };
    }
  };

  for (var s in state) {
    _loop3(s);
  } // handle creation of nested getters


  if (nestedGetters) {
    var nestedPaths = getNestedRoutes(state);
    var nestedName;

    var _iterator2 = _createForOfIteratorHelper(nestedPaths),
        _step2;

    try {
      var _loop4 = function _loop4() {
        var nsPath = _step2.value;
        nestedName = nsPath.join("_");
        formattedName = formatStateName(nestedName, "get");

        if (formattedName && !ignoredGetters.includes(nestedName)) {
          getters[formattedName] = function () {
            return getNestedValue(this.state, nsPath);
          };
        }
      };

      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        _loop4();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return getters;
};

var createParamsString = function createParamsString() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var str = "";

  for (var _i2 = 0, _Object$keys2 = Object.keys(params); _i2 < _Object$keys2.length; _i2++) {
    var param = _Object$keys2[_i2];
    str += param + "=" + params[param] + ",";
  }

  return str;
};

var cleanState = function cleanState(state, privatePaths) {
  /* 
  takes a state object and list of private paths as inputs, and returns the state with the private paths removed. 
  */
  var cleaned = _objectSpread({}, state); // make a copy of state


  var np, nestedPath;

  var _iterator3 = _createForOfIteratorHelper(privatePaths),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var path = _step3.value;

      if (Array.isArray(path)) {
        // if provided with a nested path, traverse down and delete final entry
        nestedPath = cleaned;

        for (var i = 0; i < path.length; i++) {
          np = path[i];

          try {
            if (i === path.length - 1) {
              delete nestedPath[np];
            } else {
              nestedPath = nestedPath[np];
            }
          } catch (err) {
            // if a provided key along the path does not exist, inform user
            console.error("Provided key, [\"".concat(path[i - 1], "\"] does not exist\n\nFull error message reads:\n\n"), err);
            break;
          }
        }
      } else {
        delete cleaned[path];
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return cleaned;
};

var createReducerDispatchers = function createReducerDispatchers(reducers) {
  var reducerMethods = {};

  var _loop5 = function _loop5(r) {
    // console.log(r)
    reducerMethods[r] = function (state, action) {
      _this3.setState(reducers[r](state, action));
    };
  };

  for (var r in reducers) {
    _loop5(r);
  } // console.log(reducerMethods.stateReducer)


  return reducerMethods;
}; // ========================== DEFAULT OPTIONS ==========================


var DEFAULT_OPTIONS = {
  dynamicSetters: true,
  dynamicGetters: true,
  allowSetterOverwrite: true,
  developmentWarnings: true,
  overwriteProtectionLevel: 1,
  nestedSetters: false,
  nestedGetters: true
};
var DEFAULT_STORAGE_OPTIONS = {
  name: null,
  unmountBehavior: "all",
  initializeFromLocalStorage: false,
  subscriberWindows: [],
  removeChildrenOnUnload: true,
  clearStorageOnUnload: true,
  privateStatePaths: []
}; // ========================== CANTUS_FIRMUS CLASS ==========================

var CantusFirmus = /*#__PURE__*/function () {
  function CantusFirmus(state) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CantusFirmus);

    this.context = /*#__PURE__*/(0, _react.createContext)(null);
    this.state = state;
    this.setters = {};
    this.getters = {};
    this.reducers = {};
    this.constants = {};
    this.methods = {}; // OPTIONS

    this.options = _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), options);
    this.dynamicSetters = this.options.dynamicSetters;
    this.dynamicGetters = this.options.dynamicGetters;
    this.allowSetterOverwrite = this.options.allowSetterOverwrite;
    this.developmentWarnings = this.options.developmentWarnings;
    this.overwriteProtectionLevel = this.options.overwriteProtectionLevel;
    this.nestedSetters = this.options.nestedSetters; // initialize blank storageOptions (will be populated later if user chooses)

    this.storageOptions = {}; // Local Storage Connection

    this.bindToLocalStorage = false;
  }

  _createClass(CantusFirmus, [{
    key: "addCustomSetters",
    value: function addCustomSetters(setters) {
      this.setters = setters;
    }
  }, {
    key: "ignoreSetters",
    value: function ignoreSetters(settersArr) {
      this.ignoredSetters = settersArr || [];
    }
  }, {
    key: "addCustomGetters",
    value: function addCustomGetters(getters) {
      this.getters = getters;
    }
  }, {
    key: "ignoreGetters",
    value: function ignoreGetters(gettersArr) {
      this.ignoredGetters = gettersArr || [];
    }
  }, {
    key: "addReducers",
    value: function addReducers(reducers) {
      this.reducers = reducers;
    }
  }, {
    key: "addConstants",
    value: function addConstants(newConstants) {
      this.constants = _objectSpread(_objectSpread({}, this.constants), newConstants);
    }
  }, {
    key: "addMethods",
    value: function addMethods(methods) {
      this.methods = methods;
    }
  }, {
    key: "rename",
    value: function rename(nameMap) {
      this.renameMap = nameMap || {};
    }
  }, {
    key: "connectToLocalStorage",
    value: function connectToLocalStorage() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.bindToLocalStorage = true;
      this.storageOptions = _objectSpread(_objectSpread({}, DEFAULT_STORAGE_OPTIONS), options); // if no name is specified, throw an error, as this is a required field to manage multiple localStorage instances

      if (!this.storageOptions.name) throw new Error("When connecting your cf instance to the local storage, you must provide an unique name (string) to avoid conflicts with other local storage parameters."); // default the provider window name to the localStorage name if providerWindow param not given

      this.storageOptions.providerWindow = this.storageOptions.providerWindow || this.storageOptions.name; // if user has specified to load state from local storage (this only impacts the provider window)

      if (this.storageOptions.initializeFromLocalStorage) {
        if (window.localStorage.getItem(this.storageOptions.name)) this.state = JSON.parse(window.localStorage.getItem(this.storageOptions.name));
      } // if the window is a subscriber window, automatically initialize from local storage


      if (this.storageOptions.subscriberWindows.includes(window.name)) {
        if (window.localStorage.getItem(this.storageOptions.name)) {
          this.state = JSON.parse(window.localStorage.getItem(this.storageOptions.name)); // remove any state paths designated as private (only belonging to the provider window)
          // for(let path of this.storageOptions.privateStatePaths){
          //     delete this.state[path]
          // }
        }
      }

      if (!window.name && this.storageOptions.providerWindow) window.name = this.storageOptions.providerWindow;
    } // _clearStateFromStorage() {
    //     function handleUnload(e){
    //         this.storageOptions.name && localStorage.removeItem(this.storageOptions.name)
    //         if(this.storageOptions.removeChildrenOnUnload){
    //         }
    //     }
    //     handleUnload = handleUnload.bind(this)
    //     window.onbeforeunload = handleUnload
    //     window.onunload = handleUnload
    // }

  }, {
    key: "createProvider",
    value: function createProvider() {
      // copy instance properties/methods
      var Context = this.context;
      var state = this.state;
      var constants = this.constants;
      var reducers = this.reducers;
      var methods = this.methods;
      var ignoredSetters = this.ignoredSetters;
      var ignoredGetters = this.ignoredGetters;
      var renameMap = this.renameMap || {};
      var bindToLocalStorage = this.bindToLocalStorage;
      var storageOptions = this.storageOptions;
      var setters, getters; // initialize local storage with state
      // also check to make sure that any state paths marked as private are removed before setting local storage

      if (storageOptions.name) {
        var authorizedState = cleanState(state, storageOptions.privateStatePaths);
        storageOptions.name && localStorage.setItem(storageOptions.name, JSON.stringify(authorizedState));
      } // Pre class definition setup
      // GETTER CREATION


      getters = this.dynamicGetters ? _objectSpread(_objectSpread({}, createStateGetters(state, ignoredGetters, this.nestedGetters)), this.getters) : _objectSpread({}, this.getters); // SETTER CREATION

      if (this.allowSetterOverwrite) {
        setters = this.dynamicSetters ? _objectSpread(_objectSpread({}, createStateSetters(state, ignoredSetters, this.nestedSetters)), this.setters) : _objectSpread({}, this.setters);
      } else {
        var dynamicSetters = createStateSetters(state, ignoredSetters);
        var dynamicKeys = Object.keys(dynamicSetters);

        for (var _i3 = 0, _Object$keys3 = Object.keys(this.setters); _i3 < _Object$keys3.length; _i3++) {
          var key = _Object$keys3[_i3];

          if (dynamicKeys.includes(key)) {
            if (this.developmentWarnings) {
              this.overwriteProtectionLevel === 1 && console.warn("The user defined setter, '".concat(key, "', was blocked from overwriting a dynamically generated setter of the same name. To change this behavior, set allowSetterOverwrite to true in the CantusFirmus options."));

              if (this.overwriteProtectionLevel >= 2) {
                throw new Error("The user defined setter, '".concat(key, "', was blocked from overwriting a dynamically generated setter of the same name. To change this behavior, set allowSetterOverwrite to true in the CantusFirmus options."));
              }
            }

            delete this.setters[key];
          }
        }

        setters = this.dynamicSetters ? _objectSpread(_objectSpread({}, createStateSetters(state, ignoredSetters, this.nestedSetters)), this.setters) : _objectSpread({}, this.setters);
      } // define Provider class component


      var Provider = /*#__PURE__*/function (_PureComponent) {
        _inherits(Provider, _PureComponent);

        var _super = _createSuper(Provider);

        function Provider(props) {
          var _this4;

          _classCallCheck(this, Provider);

          _this4 = _super.call(this, props);
          _this4.state = state;
          _this4.setters = bindMethods(setters, _assertThisInitialized(_this4));
          _this4.getters = bindMethods(getters, _assertThisInitialized(_this4)); // set this.reducers to the reducers added in the CantusFirmus Class 

          _this4.reducers = reducers; // bind generateDispatchers

          _this4.generateDispatchers = _this4.generateDispatchers.bind(_assertThisInitialized(_this4)); // Create reducers that are copies in name of the previously added reducers
          // Then, give a dispatch method to each that will execute the actual reducer

          _this4.reducersWithDispatchers = _this4.generateDispatchers(reducers);
          _this4.methods = bindMethods(methods, _assertThisInitialized(_this4));
          _this4.bindToLocalStorage = bindToLocalStorage;
          _this4.storageOptions = storageOptions;
          _this4.updateStateFromLocalStorage = _this4.updateStateFromLocalStorage.bind(_assertThisInitialized(_this4)); // Save master version of setState prior to reassignment

          _this4.setStateMaster = _this4.setState; // Reassign setState function to return a promise, and by default, handle localStorage changes

          _this4.setState = function (state) {
            var _this5 = this;

            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
            return new Promise(function (resolve) {
              _this5.setStateMaster(state, function () {
                // handle local storage updates to state
                if (_this5.bindToLocalStorage) {
                  if (_this5.storageOptions.privateStatePaths.length && window.name === _this5.storageOptions.providerWindow) {
                    // if there are any private paths that need to be removed (only proceed if fired from the provider window)
                    var _authorizedState = cleanState(_this5.state, _this5.storageOptions.privateStatePaths); // const authorizedState = { ...this.state }
                    // for (let path of this.storageOptions.privateStatePaths) {
                    //     delete authorizedState[path]
                    // }


                    localStorage.setItem(_this5.storageOptions.name, JSON.stringify(_authorizedState));
                  } else {
                    localStorage.setItem(_this5.storageOptions.name, JSON.stringify(_this5.state));
                  }
                }

                callback(_this5.state);
                resolve(_this5.state);
              });
            });
          };

          _this4.setState = _this4.setState.bind(_assertThisInitialized(_this4));
          return _this4;
        }

        _createClass(Provider, [{
          key: "generateDispatchers",
          value: function generateDispatchers(reducers) {
            var reducersWithDispatchers = {}; // define a dispatcher factory to handle the creation of new dispatchers

            var dispatcherFactory = function dispatcherFactory(reducerKey) {
              return function (state, action) {
                this.setState(this.reducers[reducerKey](state, action));
              };
            };

            var dispatch;

            for (var reducer in reducers) {
              dispatch = dispatcherFactory(reducer).bind(this);
              reducersWithDispatchers[reducer] = {
                dispatch: dispatch
              };
            }

            return reducersWithDispatchers;
          }
        }, {
          key: "updateStateFromLocalStorage",
          value: function updateStateFromLocalStorage() {
            try {
              this.setState(_objectSpread(_objectSpread({}, this.state), JSON.parse(window.localStorage.getItem(storageOptions.name))));
            } catch (err) {
              // bug check: is this still needed?
              var updatedState = typeof localStorage[storageOptions.name] === "string" ? _objectSpread(_objectSpread({}, this.state), JSON.parse(localStorage[storageOptions.name])) : _objectSpread({}, this.state);
              this.setState(updatedState);
            }
          }
        }, {
          key: "createWindowManager",
          value: function createWindowManager() {
            // storage object for opened child windows
            this.windows = this.windows || {}; // window manager methods passed to user

            var windowManagerMethods = {
              open: function open(url, name) {
                var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                this.windows[name] = window.open(url, name, createParamsString(params));
              },
              close: function close(name) {
                if (this.windows[name]) {
                  this.windows[name].close();
                }

                delete this.windows[name];
              },
              getChildren: function getChildren() {
                return this.windows;
              }
            }; // instruct the window what to do when it closes
            // we define this here, and not up in the CantusFirmus class because we need access to all generated child windows

            if (window.name === storageOptions.providerWindow || storageOptions.removeChildrenOnUnload) {
              var handleUnload = function handleUnload(e) {
                // clear local storage only if specified by user AND the window being closed is the provider window 
                if (storageOptions.clearStorageOnUnload && storageOptions.providerWindow === window.name) {
                  localStorage.removeItem(storageOptions.name);
                } // close all children (and grand children) windows if this functionality has been specified by the user


                if (storageOptions.removeChildrenOnUnload) {
                  for (var _i4 = 0, _Object$keys4 = Object.keys(this.windows); _i4 < _Object$keys4.length; _i4++) {
                    var w = _Object$keys4[_i4];
                    this.windows[w].close();
                  }
                } // return "uncomment to debug unload functionality"

              };

              handleUnload = handleUnload.bind(this); // set the unload functionality

              window.onbeforeunload = handleUnload;
              window.onunload = handleUnload;
            } // bind methods to 'this'


            return bindMethods(windowManagerMethods, this);
          }
        }, {
          key: "componentDidMount",
          value: function componentDidMount() {
            var _this6 = this;

            // When component mounts, if bindToLocalStorage has been set to true, make the window listen for storage change events and update the state 
            // if the window is already listening for storage events, then do nothing
            if (bindToLocalStorage && !window.onstorage) {
              window.onstorage = function (e) {
                console.log("ON STORAGE FIRED");

                _this6.updateStateFromLocalStorage();
              };
            }
          }
        }, {
          key: "componentDidUpdate",
          value: function componentDidUpdate(prevProps, prevState) {// Object.entries(this.props).forEach(([key, val]) =>
            //     prevProps[key] !== val && console.log(`Prop '${key}' changed`)
            // );
            // if (this.state) {
            //     Object.entries(this.state).forEach(([key, val]) =>
            //         prevState[key] !== val && console.log(`State '${key}' changed`)
            //     );
            // }
          }
        }, {
          key: "render",
          value: function render() {
            var value = {
              state: this.state,
              setters: this.setters,
              getters: this.getters,
              methods: this.methods,
              constants: constants
            }; // add reducers with dispatchers

            if (Object.keys(reducers).length) value.reducers = this.reducersWithDispatchers; // initialize a window manager if within a multi-window state management system

            if (this.bindToLocalStorage) value.windowManager = this.createWindowManager(); // rename value keys to user specifications

            for (var _i5 = 0, _Object$keys5 = Object.keys(renameMap); _i5 < _Object$keys5.length; _i5++) {
              var _key = _Object$keys5[_i5];

              if (value[_key]) {
                value[renameMap[_key]] = value[_key];
                delete value[_key]; // reassign the value in 'this' for reference in across method types (setters, methods, etc.)

                this[renameMap[_key]] = this[_key];
              }
            }

            return /*#__PURE__*/_react["default"].createElement(Context.Provider, {
              value: value
            }, this.props.children);
          }
        }]);

        return Provider;
      }(_react.PureComponent); // return provider class


      return Provider;
    }
  }]);

  return CantusFirmus;
}();

var _default = CantusFirmus; // ============================ Subscribe ============================

/* 
contextDependencies = [
    {context: Context, key: string name of context in props, dependencies: [string names of deps]},
    ...
]
 */

exports["default"] = _default;

var subscribe = function subscribe(Component, contextDependencies) {
  CantusFirmusSubscriber = function CantusFirmusSubscriber(props) {
    var contexts = {},
        dependencies = [],
        nestedDep = null; // apply default key value when only 1 context is subscribed to, and no key value given

    if (contextDependencies.length === 1 && !contextDependencies[0].key) contextDependencies[0].key = "context";
    contextDependencies.forEach(function (ctx, i) {
      ctx.key = ctx.key || "context".concat(i + 1); // if not key value is set, apply default here

      contexts[ctx.key] = (0, _react.useContext)(ctx.context); // assign the entire context object so it can be passed into props

      var _iterator4 = _createForOfIteratorHelper(ctx.dependencies),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var dep = _step4.value;

          if (typeof dep === "string") {
            dependencies.push(contexts[ctx.key].state[dep]); // save just the desired state dependencies
          } else if (Array.isArray(dep)) {
            // allow for nested dependencies
            nestedDep = contexts[ctx.key].state[dep[0]];

            for (var _i6 = 1; _i6 < dep.length; _i6++) {
              // looping from 1 because we have already handled the first step in the nested path
              nestedDep = nestedDep[dep[_i6]];
            }

            dependencies.push(nestedDep);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }); // add props to dependencies

    for (var _i7 = 0, _Object$keys6 = Object.keys(props); _i7 < _Object$keys6.length; _i7++) {
      var propKey = _Object$keys6[_i7];
      dependencies.push(props[propKey]);
    }

    return (0, _react.useMemo)(function () {
      return /*#__PURE__*/_react["default"].createElement(Component, _extends({}, props, contexts));
    }, dependencies);
  };

  return CantusFirmusSubscriber;
};

exports.subscribe = subscribe;
