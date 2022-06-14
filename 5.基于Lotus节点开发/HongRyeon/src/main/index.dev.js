/* eslint-disable */

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })
import {  BrowserWindow } from 'electron';
// Install `vue-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')
  // installExtension.default(installExtension.VUEJS_DEVTOOLS)
  //   .then(() => {})
  //  .catch(err => {
  //     console.log('Unable to install `vue-devtools`: \n', err)
  //   })
  //参考 https://www.cnblogs.com/wozho/p/10782654.html 和 https://github.com/SimulatedGREG/electron-vue/issues/242
  BrowserWindow.addDevToolsExtension('node_modules/vue-devtools/vender')  //手动加载vue-devtools，前提是 npm install vue-devtools --save-dev
  
})

// Require `main` process to boot app
require('./index')