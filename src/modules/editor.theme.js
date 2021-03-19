// DreamTime.
// Copyright (C) DreamNet. All rights reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License 3.0 as published by
// the Free Software Foundation. See <https://www.gnu.org/licenses/gpl-3.0.html>
//
// Written by Ivan Bravo Bravo <ivan@dreamnet.tech>, 2019.

import color from 'tinycolor2'
import config from '~/tailwind.config'

// https://github.com/nhn/tui.image-editor/blob/master/apps/image-editor/src/js/ui/theme/standard.js
export const blackTheme = {
  'common.bi.display': 'none',
  'common.bisize.display': 'none',

  'common.backgroundImage': 'none',
  'common.backgroundColor': config.theme.extend.colors.menus.DEFAULT,
  'common.border': '0px',

  // header
  'header.backgroundImage': 'none',
  'header.backgroundColor': 'transparent',
  'header.border': '0px',

  // load button
  'loadButton.display': 'none',

  // download button
  'downloadButton.display': 'none',

  // main icons
  'menu.normalIcon.color': '#8a8a8a',
  'menu.activeIcon.color': '#555555',
  'menu.disabledIcon.color': '#434343',
  'menu.hoverIcon.color': '#e9e9e9',

  // submenu icons
  'submenu.normalIcon.color': '#8a8a8a',
  'submenu.activeIcon.color': '#e9e9e9',

  'menu.iconSize.width': '24px',
  'menu.iconSize.height': '24px',

  'submenu.iconSize.width': '32px',
  'submenu.iconSize.height': '32px',

  // submenu primary color
  'submenu.backgroundColor': color(config.theme.extend.colors.menus.DEFAULT).darken(10).toString(),
  'submenu.partition.color': '#3c3c3c',

  // submenu labels
  'submenu.normalLabel.color': '#8a8a8a',
  'submenu.normalLabel.fontWeight': 'lighter',
  'submenu.activeLabel.color': '#fff',
  'submenu.activeLabel.fontWeight': 'lighter',

  // checkbox style
  'checkbox.border': '0px',
  'checkbox.backgroundColor': '#fff',

  // range style
  'range.pointer.color': '#fff',
  'range.bar.color': '#666',
  'range.subbar.color': '#d1d1d1',

  'range.disabledPointer.color': '#414141',
  'range.disabledBar.color': '#282828',
  'range.disabledSubbar.color': '#414141',

  'range.value.color': '#fff',
  'range.value.fontWeight': 'lighter',
  'range.value.fontSize': '11px',
  'range.value.border': '1px solid #353535',
  'range.value.backgroundColor': color(config.theme.extend.colors.menus.DEFAULT).darken(15).toString(),
  'range.title.color': '#fff',
  'range.title.fontWeight': 'lighter',

  // colorpicker style
  'colorpicker.button.border': '1px solid #1e1e1e',
}

/*
export const blackTheme = {
  'common.bi.display': 'none',
  'common.bisize.display': 'none',
  'common.backgroundImage': 'none',
  'common.backgroundColor': config.theme.extend.colors.background,
  'common.border': '0px',

  // header
  'header.backgroundImage': 'none',
  'header.backgroundColor': 'transparent',
  'header.border': '0px',

  // load button
  'loadButton.display': 'none',

  // download button
  'downloadButton.display': 'none',

  // main icons
  'menu.normalIcon.path': './assets/images/svg/icon-d.svg',
  'menu.normalIcon.name': 'icon-d',
  'menu.activeIcon.path': './assets/images/svg/icon-b.svg',
  'menu.activeIcon.name': 'icon-b',
  'menu.disabledIcon.path': './assets/images/svg/icon-a.svg',
  'menu.disabledIcon.name': 'icon-a',
  'menu.hoverIcon.path': './assets/images/svg/icon-c.svg',
  'menu.hoverIcon.name': 'icon-c',
  'menu.iconSize.width': '24px',
  'menu.iconSize.height': '24px',

  // submenu primary color
  'submenu.backgroundColor': config.theme.extend.colors.dark[500],
  'submenu.partition.color': config.theme.extend.colors.dark[100],

  // submenu icons
  'submenu.normalIcon.path': './assets/images/svg/icon-d.svg',
  'submenu.normalIcon.name': 'icon-d',
  'submenu.activeIcon.path': './assets/images/svg/icon-c.svg',
  'submenu.activeIcon.name': 'icon-c',
  'submenu.iconSize.width': '32px',
  'submenu.iconSize.height': '32px',

  // submenu labels
  'submenu.normalLabel.color': '#8a8a8a',
  'submenu.normalLabel.fontWeight': 'lighter',
  'submenu.activeLabel.color': '#fff',
  'submenu.activeLabel.fontWeight': 'lighter',

  // checkbox style
  'checkbox.border': '0px',
  'checkbox.backgroundColor': '#fff',

  // range style
  'range.pointer.color': '#fff',
  'range.bar.color': '#666',
  'range.subbar.color': '#d1d1d1',

  'range.disabledPointer.color': '#414141',
  'range.disabledBar.color': '#282828',
  'range.disabledSubbar.color': '#414141',

  'range.value.color': '#fff',
  'range.value.fontWeight': 'lighter',
  'range.value.fontSize': '11px',
  'range.value.border': '1px solid #353535',
  'range.value.backgroundColor': '#151515',
  'range.title.color': '#fff',
  'range.title.fontWeight': 'lighter',

  // colorpicker style
  'colorpicker.button.border': '1px solid #1e1e1e',
  'colorpicker.title.color': '#fff',
}
*/
