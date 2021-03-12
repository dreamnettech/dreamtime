// DreamTime.
// Copyright (C) DreamNet. All rights reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License 3.0 as published by
// the Free Software Foundation. See <https://www.gnu.org/licenses/gpl-3.0.html>
//
// Written by Ivan Bravo Bravo <ivan@dreamnet.tech>, 2019.

/*
import { isNil } from 'lodash'

let address

export async function connect() {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  if (!isNil(address)) {
    return address
  }

  const ngrok = require('ngrok')

  if (process.env.NGROK_ACCESS_TOKEN) {
    await ngrok.authtoken(process.env.NGROK_ACCESS_TOKEN)
  }

  address = await ngrok.connect(process.env.SERVER_PORT)

  return address
}

export function disconnect() {
  const ngrok = require('ngrok')
  return ngrok.disconnect()
}

export function getAddress() {
  return address
}
*/
