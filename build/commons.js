/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkvigitec"] = self["webpackChunkvigitec"] || []).push([["commons"],{

/***/ "./node_modules/aframe/dist/aframe-master.js":
/*!***************************************************!*\
  !*** ./node_modules/aframe/dist/aframe-master.js ***!
  \***************************************************/
/***/ ((module) => {


/***/ }),

/***/ "./tests/__init.test.js":
/*!******************************!*\
  !*** ./tests/__init.test.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/* global sinon, setup, teardown */\n\n/**\r\n * __init.test.js is run before every test case.\r\n */\nwindow.debug = true;\nnavigator.getVRDisplays = function () {\n  var resolvePromise = Promise.resolve();\n  var mockVRDisplay = {\n    cancelAnimationFrame: function (h) {\n      return window.cancelAnimationFrame(1);\n    },\n    capabilities: {},\n    exitPresent: resolvePromise,\n    getPose: function () {\n      return {\n        orientation: null,\n        position: null\n      };\n    },\n    requestAnimationFrame: function () {\n      return 1;\n    },\n    requestPresent: resolvePromise,\n    submitFrame: function () {\n      return;\n    }\n  };\n  return Promise.resolve([mockVRDisplay]);\n};\nconst AFRAME = __webpack_require__(/*! aframe */ \"./node_modules/aframe/dist/aframe-master.js\");\nvar AScene = AFRAME.AScene;\n// Make sure WebGL context is not created since Travix CT runs headless.\n// Stubs below failed once in a while due to asynchronous tesst setup / teardown.\nAScene.prototype.setupRenderer = function () {};\nsetup(function () {\n  window.AFRAME = AFRAME;\n  this.sinon = sinon.createSandbox();\n  // Stubs to not create a WebGL context since Travis CI runs headless.\n  this.sinon.stub(AScene.prototype, 'render');\n  this.sinon.stub(AScene.prototype, 'setupRenderer');\n  // Mock renderer.\n  AScene.prototype.renderer = {\n    xr: {\n      getDevice: function () {\n        return {\n          requestPresent: function () {}\n        };\n      },\n      isPresenting: function () {\n        return true;\n      },\n      setDevice: function () {},\n      setSession: function () {\n        return Promise.resolve();\n      },\n      setFoveation: function () {},\n      setPoseTarget: function () {},\n      dispose: function () {},\n      setReferenceSpaceType: function () {},\n      enabled: false\n    },\n    dispose: function () {},\n    getContext: function () {\n      return undefined;\n    },\n    render: function () {},\n    setAnimationLoop: function () {},\n    setOpaqueSort: function () {},\n    setPixelRatio: function () {},\n    setSize: function () {},\n    setTransparentSort: function () {},\n    shadowMap: {\n      enabled: false\n    }\n  };\n});\n\n// Ensure that uncaught exceptions between tests result in the tests failing.\n// This works around an issue with mocha / karma-mocha, see\n// https://github.com/karma-runner/karma-mocha/issues/227\nvar pendingError = null;\nvar pendingErrorNotice = null;\nwindow.addEventListener('error', event => {\n  pendingError = event.error;\n  pendingErrorNotice = 'An uncaught exception was thrown between tests';\n});\nwindow.addEventListener('unhandledrejection', event => {\n  pendingError = event.reason;\n  pendingErrorNotice = 'An uncaught promise rejection occurred between tests';\n});\nteardown(function (done) {\n  // Clean up any attached elements.\n  var attachedEls = ['canvas', 'a-assets', 'a-scene'];\n  var els = document.querySelectorAll(attachedEls.join(','));\n  for (var i = 0; i < els.length; i++) {\n    els[i].parentNode.removeChild(els[i]);\n  }\n  this.sinon.restore();\n  delete AFRAME.components.test;\n  delete AFRAME.systems.test;\n\n  // Allow detachedCallbacks to clean themselves up.\n  setTimeout(function () {\n    done();\n  });\n  if (pendingError) {\n    console.error(pendingErrorNotice);\n    throw pendingError;\n  }\n});\n\n//# sourceURL=webpack://vigitec/./tests/__init.test.js?");

/***/ }),

/***/ "./tests/components/chart-component.test.js":
/*!**************************************************!*\
  !*** ./tests/components/chart-component.test.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/* global  assert, setup, suite, test */\nvar entityFactory = (__webpack_require__(/*! ../helpers */ \"./tests/helpers.js\").entityFactory);\nsuite('chart', function () {\n  setup(function (done) {\n    var el = this.el = entityFactory();\n    el.setAttribute('chart', 'target_charts: example; origin_posX: 0; origin_posY: 0; origin_posZ: 0; dir: true;');\n    if (el.hasLoaded) {\n      done();\n    }\n    el.addEventListener('loaded', function () {\n      done();\n    });\n  });\n  test('default values', function () {\n    var el = this.el;\n    assert.equal(el.getAttribute('chart'), 'target_charts: example; origin_posX: 0; origin_posY: 0; origin_posZ: 0; dir: true;');\n  });\n  suite('schema', function () {\n    test('can get defined attributes', function () {\n      var el = this.el;\n      el.setAttribute('chart', 'target_charts: example2; origin_posX: 5; origin_posY: 5; origin_posZ: 5; dir: true;');\n      assert.shallowDeepEqual(el.getAttribute('chart'), 'target_charts: example2; origin_posX: 5; origin_posY: 5; origin_posZ: 5; dir: true;');\n    });\n  });\n  suite('events', function () {\n    setup(function (done) {\n      var el = this.el;\n      // Creando el panel GUI\n      var gui = entityFactory();\n      gui.setAttribute('gui-flex-container', '');\n      gui.addEventListener('loaded', function () {\n        // Creando botones para interactuar\n        // Botón de rotar a la izquierda\n        var rotate_left__button = entityFactory();\n        rotate_left__button.setAttribute('gui-button', '');\n        rotate_left__button.classList.add('rotate_left__button');\n        // Botón de rotar a la derecha\n        var rotate_rigth_button = entityFactory();\n        rotate_rigth_button.setAttribute('gui-button', '');\n        rotate_rigth_button.classList.add('rotate_rigth_button');\n\n        // Botón de mover a la izquierda\n        var left_button = entityFactory();\n        left_button.setAttribute('gui-button', '');\n        left_button.classList.add('left_button');\n        // Botón de mover a la derecha\n        var rigth_button = entityFactory();\n        rigth_button.setAttribute('gui-button', '');\n        rigth_button.classList.add('rigth_button');\n\n        // Botón de mover arriba\n        var top_button = entityFactory();\n        top_button.setAttribute('gui-button', '');\n        top_button.classList.add('top_button');\n        // Botón de mover abajo\n        var bottom_button = entityFactory();\n        bottom_button.setAttribute('gui-button', '');\n        bottom_button.classList.add('bottom_button');\n\n        // Botón de mover atrás\n        var forward_button = entityFactory();\n        forward_button.setAttribute('gui-button', '');\n        forward_button.classList.add('forward_button');\n        // Botón de mover adelante\n        var after_button = entityFactory();\n        after_button.setAttribute('gui-button', '');\n        after_button.classList.add('after_button');\n\n        // Botón de aumentar escala\n        var increase_scale__button = entityFactory();\n        increase_scale__button.setAttribute('gui-button', '');\n        increase_scale__button.classList.add('increase_scale__button');\n        // Botón de decrementar escala\n        var decrease_scale__button = entityFactory();\n        decrease_scale__button.setAttribute('gui-button', '');\n        decrease_scale__button.classList.add('decrease_scale__button');\n        var elements = [rotate_left__button, rotate_left__button, left_button, rigth_button, top_button, bottom_button, forward_button, after_button, increase_scale__button, decrease_scale__button];\n        elements.forEach(elem => {\n          gui.appendChild(elem);\n        });\n        done();\n      });\n    });\n    test('click to rotate_left__button', function () {});\n  });\n});\n\n//# sourceURL=webpack://vigitec/./tests/components/chart-component.test.js?");

/***/ }),

/***/ "./tests/components/cursor-listener-component.test.js":
/*!************************************************************!*\
  !*** ./tests/components/cursor-listener-component.test.js ***!
  \************************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://vigitec/./tests/components/cursor-listener-component.test.js?");

/***/ }),

/***/ "./tests/components/movement-component.test.js":
/*!*****************************************************!*\
  !*** ./tests/components/movement-component.test.js ***!
  \*****************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://vigitec/./tests/components/movement-component.test.js?");

/***/ }),

/***/ "./tests/components/spawn-in-circle.test.js":
/*!**************************************************!*\
  !*** ./tests/components/spawn-in-circle.test.js ***!
  \**************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://vigitec/./tests/components/spawn-in-circle.test.js?");

/***/ }),

/***/ "./tests/helpers.js":
/*!**************************!*\
  !*** ./tests/helpers.js ***!
  \**************************/
/***/ ((module) => {

eval("/* global suite, test */\n\n/**\r\n * Add an event listener to be executed only once. Help when reusing entities across\r\n * tests and an event emitted in one may be picked up by another, causing test failures.\r\n */\nmodule.exports.once = function (el, eventName, handler) {\n  var done = false;\n  el.addEventListener(eventName, function onceHandler(evt) {\n    if (done) {\n      return;\n    }\n    handler(evt);\n    done = true;\n  });\n};\n\n/**\r\n * Helper method to create a scene, create an entity, add entity to scene,\r\n * add scene to document.\r\n *\r\n * Deprecated in favor of elFactory.\r\n *\r\n * @returns {object} An `<a-entity>` element.\r\n */\nfunction entityFactory(opts) {\n  var scene = document.createElement('a-scene');\n  var assets = document.createElement('a-assets');\n  var entity = document.createElement('a-entity');\n  scene.appendChild(assets);\n  scene.appendChild(entity);\n  opts = opts || {};\n  if (opts.assets) {\n    opts.assets.forEach(function (asset) {\n      assets.appendChild(asset);\n    });\n  }\n  document.body.appendChild(scene);\n  return entity;\n}\nmodule.exports.entityFactory = entityFactory;\n\n/**\r\n * A more robust entity factory that resolves once stuff is loaded without having to wait\r\n * on fragile asynchrony.\r\n *\r\n * @returns {Promise}\r\n */\nmodule.exports.elFactory = function (opts) {\n  let entity = entityFactory(opts);\n  return new Promise(resolve => {\n    if (entity.sceneEl) {\n      if (entity.sceneEl.hasLoaded) {\n        return resolve(entity);\n      }\n      entity.sceneEl.addEventListener('loaded', () => {\n        resolve(entity);\n      });\n      return;\n    }\n    entity.addEventListener('nodeready', () => {\n      if (entity.sceneEl.hasLoaded) {\n        return resolve(entity);\n      }\n      entity.sceneEl.addEventListener('loaded', () => {\n        resolve(entity);\n      });\n    });\n  });\n};\n\n/**\r\n * Creates and attaches a mixin element (and an `<a-assets>` element if necessary).\r\n *\r\n * @param {string} id - ID of mixin.\r\n * @param {object} obj - Map of component names to attribute values.\r\n * @param {Element} scene - Indicate which scene to apply mixin to if necessary.\r\n * @returns {object} An attached `<a-mixin>` element.\r\n */\nmodule.exports.mixinFactory = function (id, obj, scene) {\n  var mixinEl = document.createElement('a-mixin');\n  mixinEl.setAttribute('id', id);\n  Object.keys(obj).forEach(function (componentName) {\n    mixinEl.setAttribute(componentName, obj[componentName]);\n  });\n  var assetsEl = scene ? scene.querySelector('a-assets') : document.querySelector('a-assets');\n  assetsEl.appendChild(mixinEl);\n  return mixinEl;\n};\n\n/**\r\n * Test that is only run locally and is skipped on CI.\r\n */\nmodule.exports.getSkipCISuite = function () {\n  if (window.__env__.TEST_ENV === 'ci') {\n    return suite.skip;\n  } else {\n    return suite;\n  }\n};\n\n/**\r\n * Test that is only run locally and is skipped on CI.\r\n */\nmodule.exports.getSkipCITest = function () {\n  if (window.__env__.TEST_ENV === 'ci') {\n    return test.skip;\n  } else {\n    return test;\n  }\n};\n\n//# sourceURL=webpack://vigitec/./tests/helpers.js?");

/***/ }),

/***/ "./tests/node/easyrtc-server.test.js":
/*!*******************************************!*\
  !*** ./tests/node/easyrtc-server.test.js ***!
  \*******************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://vigitec/./tests/node/easyrtc-server.test.js?");

/***/ })

}]);