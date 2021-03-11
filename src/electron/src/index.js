// DreamTime.
// Copyright (C) DreamNet. All rights reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License 3.0 as published by
// the Free Software Foundation. See <https://www.gnu.org/licenses/gpl-3.0.html>
//
// Written by Ivan Bravo Bravo <ivan@dreamnet.tech>, 2019.

import { startsWith, debounce } from 'lodash'
import {
  app, BrowserWindow, shell, protocol, nativeImage, session,
} from 'electron'
import { dirname, resolve } from 'path'
import Logger from '@dreamnet/logplease'
import fs from 'fs-extra'
import { AppError } from './modules/app-error'
import { system } from './modules/tools/system'
import { getPath, getAppPath } from './modules/tools/paths'
import { settings } from './modules'
import config from '~/nuxt.config'

const logger = Logger.create('electron')

// NuxtJS root directory
config.rootDir = dirname(dirname(__dirname))

if (process.env.NODE_ENV !== 'development') {
  // make sure that the working directory is where the executable is
  process.chdir(getPath('exe', '..'))
}

require('dotenv').config()

if (process.env.BUILD_PORTABLE) {
  // Save Chromium/Electron data in the portable folder.
  app.setPath('appData', getAppPath('AppData'))
  app.setPath('userData', getAppPath('AppData', 'dreamtime'))
}

class DreamApp {
  /**
   * @type {BrowserWindow}
   */
  window

  /**
   *
   */
  static async boot() {
    const logDir = getPath('userData', 'logs', new Date().toJSON().slice(0, 10))
    fs.ensureDirSync(logDir)

    // logger setup
    Logger.setOptions({
      filename: resolve(logDir, 'main.log'),
      logLevel: process.env.LOG || 'debug',
    })

    logger.info('Booting...')
    logger.debug(`Enviroment: ${process.env.NODE_ENV}`)
    logger.debug(`Portable: ${process.env.BUILD_PORTABLE ? 'Yes' : 'No'}`)
    logger.debug(`App Path: ${app.getAppPath()}`)
    logger.debug(`Exe Path: ${app.getPath('exe')}`)
    logger.debug(`ENV Path: ${resolve(process.cwd(), '.env')}`)

    // catch errors
    process.on('uncaughtException', (err) => {
      logger.warn('Unhandled exception!', err)
      AppError.handle(err)

      return true
    })

    process.on('unhandledRejection', (err) => {
      logger.warn('Unhandled rejection!', err)
      AppError.handle(err, 'warning')

      return true
    })

    if (!process.env.BUILD_TARGET || !process.env.npm_package_displayName) {
      throw new Error('This installation is corrupt, please contact the developers.')
    }

    // https://electronjs.org/docs/tutorial/notifications#windows
    app.setAppUserModelId(process.execPath)

    // https://pracucci.com/electron-slow-background-performances.html
    // app.commandLine.appendSwitch('disable-renderer-backgrounding')
    app.commandLine.appendSwitch('enable-features', 'ImpulseScrollAnimations,SmoothScrolling')

    // https://github.com/electron/electron/issues/17972
    if (process.platform === 'linux') {
      app.commandLine.appendSwitch('no-sandbox')
    }

    if (process.env.BUILD_PORTABLE) {
      this.bootPortable()
    }

    // user settings.
    await settings.boot()

    // this may increase performance on some systems.
    if (!settings.app?.hardwareAcceleration) {
      logger.debug('Hardware Acceleration disabled.')
      app.disableHardwareAcceleration()
    }

    app.allowRendererProcessReuse = true
  }

  /**
  *
   */
  static bootPortable() {
    // Portable component files
    fs.ensureDirSync(getAppPath('AppData'))

    const settingsPath = getPath('userData', 'settings.json')
    const portableSettingsPath = getAppPath('AppData', 'settings.json')

    const powerPath = getPath('userData', 'dreampower')
    const portablePowerPath = getAppPath('AppData', 'dreampower')

    try {
      if (fs.existsSync(settingsPath)) {
        fs.moveSync(settingsPath, portableSettingsPath)
      }

      if (fs.existsSync(powerPath)) {
        fs.moveSync(powerPath, portablePowerPath)
      }
    } catch (error) {
      logger.warn('Portable boot fail!', error)
    }
  }

  /**
   * Start the app!
   */
  static async start() {
    logger.info('Starting...')

    await this.setup()

    this.createWindow()
  }

  /**
   * Prepare the application.
   */
  static async setup() {
    if (process.platform === 'darwin') {
      if (!process.env.BUILD_PORTABLE && !process.env.DISABLE_ENFORCE_APP_LOCATION) {
        const { enforceMacOSAppLocation } = require('electron-util')

        // https://github.com/sindresorhus/electron-util#enforcemacosapplocation-macos
        enforceMacOSAppLocation()
      }

      // PyTorch does not have support for GPU in macOS
      settings.preferences.advanced.device = 'CPU'
    }

    // application exit.
    app.on('will-quit', async (event) => {
      logger.debug('Received exit event.')

      event.preventDefault()

      await this.shutdown()

      logger.debug('Bye!')
      app.exit()
    })

    // windows closed, exit.
    app.on('window-all-closed', () => {
      app.quit()
    })

    app.on('web-contents-created', (e, contents) => {
      contents.on('will-navigate', (event, navigationUrl) => {
        const { URL } = require('url')

        const url = new URL(navigationUrl)

        const host = process.env.SERVER_HOST
        const port = process.env.SERVER_PORT

        if (url.host === `${host}:${port}`) {
          // ok
          return
        }

        if (url.host === 'github.com' || url.host === 'dreamnet.tech' || url.host === 'dreamtime.tech' || url.host === 'dreamcore.tech') {
          // Probably come from the changelog, we open in the browser.
          event.preventDefault()
          shell.openExternal(navigationUrl)
          return
        }

        event.preventDefault()

        logger.warn('Illegal page load blocked!', {
          url,
        })
      })

      contents.on('new-window', (event, url) => {
        if (startsWith(url, 'http') || startsWith(url, 'mailto') || startsWith(url, 'ipfs')) {
          event.preventDefault()
          shell.openExternal(url)
          return
        }

        logger.debug('Opening new window.', {
          event,
          url,
        })
      })
    })

    // https://www.electronjs.org/docs/api/web-request
    session.defaultSession.webRequest.onBeforeSendHeaders({
      urls: ['https://*.4cdn.org/*'],
    }, (details, next) => {
      details.requestHeaders.referer = 'https://boards.4chan.org'
      next({ requestHeaders: details.requestHeaders })
    })

    // https://github.com/electron/electron/issues/23757#issuecomment-640146333
    protocol.registerFileProtocol('media', (request, callback) => {
      const pathname = decodeURI(request.url.replace('media://', ''))
      const parts = pathname.split('?')

      callback(parts[0])
    })

    /*
    if (process.env.DEVTOOLS) {
      const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')

      installExtension(VUEJS_DEVTOOLS)
        .then((extension) => logger.debug(`Added Extension:  ${extension.name}`))
        .catch((err) => logger.debug('An error occurred: ', err))
    }
    */

    const contextMenu = require('electron-context-menu')

    // allow save image option
    contextMenu({
      showSaveImageAs: true,
    })

    // System setup.
    await system.setup()

    // user settings.
    await settings.setup()
  }

  /**
   *
   */
  static async shutdown() {
    logger.debug('Shutting down services...')
  }

  /**
   * Create the program window and load the interface
   */
  static createWindow() {
    logger.info('Creating window...')

    const options = {
      width: settings.get('app.window.width', 1200),
      height: settings.get('app.window.height', 700),
      minWidth: 1200,
      minHeight: 700,
      frame: false,
      // backgroundColor: tailwind.theme.extend.colors.background,

      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        webSecurity: false, // Necessary to load filesystem photos.
        contextIsolation: false, // Legacy
        preload: resolve(app.getAppPath(), 'electron', 'dist', 'provider.js'),
      },
    }

    const iconPath = resolve(config.rootDir, 'dist', 'icon.png')

    if (fs.existsSync(iconPath)) {
      options.icon = nativeImage.createFromPath(iconPath)
    }

    // browser window.
    this.window = new BrowserWindow(options)

    // disable menu
    this.window.setMenu(null)

    //
    this.window.webContents.once('dom-ready', () => {
      if (settings.get('app.window.maximized', true)) {
        this.window.maximize()
      }
    })

    // Resize
    this.window.on('will-resize', debounce(function (data, newBounds) {
      settings.set('app.window.width', newBounds.width)
      settings.set('app.window.height', newBounds.height)
      settings.save()
    }, 1000))

    this.window.on('maximize', function () {
      settings.set('app.window.maximized', true)
      settings.save()
    })

    this.window.on('unmaximize', function () {
      settings.set('app.window.maximized', false)
      settings.save()
    })

    // ui location
    this.interfaceURL = this.getInterfaceURL()

    if (config.dev) {
      this.loadServer()
    } else {
      this.window.loadFile(this.interfaceURL)
    }

    if (process.env.DEVTOOLS) {
      this.window.webContents.once('dom-ready', () => {
        // DevTools
        this.window.webContents.openDevTools()
      })
    }
  }

  /**
   * Wait until the NuxtJS server is ready.
   */
  static loadServer() {
    logger.debug(`Requesting server (${this.interfaceURL})...`)

    const http = require('http')

    http
      .get(this.interfaceURL, (response) => {
        if (response.statusCode === 200) {
          logger.debug('Server ready!')
          this.window.loadURL(this.interfaceURL)
        } else {
          logger.warn(`Server reported: ${response.statusCode}`)
          setTimeout(this.loadServer.bind(this), 300)
        }
      })
      .on('error', (error) => {
        logger.warn('Server error', error)
        setTimeout(this.loadServer.bind(this), 300)
      })
  }

  /**
   * Returns the url of the user interface
   *
   * @return {string}
   */
  static getInterfaceURL() {
    if (!config.dev) {
      return resolve(config.rootDir, 'dist', 'index.html')
    }

    return `http://${config.server.host}:${config.server.port}`
  }
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    const { window } = DreamApp

    // Someone tried to run a second instance, we should focus our window.
    if (window) {
      if (window.isMinimized()) {
        window.restore()
      }

      window.focus()
    }
  })

  app.on('ready', async () => {
    try {
      await DreamApp.start()
    } catch (error) {
      throw new AppError(error, { title: 'DreamTime failed to start.', level: 'error' })
    }
  })

  DreamApp.boot()
}
