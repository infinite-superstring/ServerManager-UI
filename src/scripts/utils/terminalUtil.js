import {Terminal} from "@xterm/xterm";

/**
 * 初始化终端
 * 基本参数
 * @param config 可覆盖或者基本参数
 */
export function initTerminal(config = {}) {
  return new Terminal({
    rendererType: "canvas",
    convertEol: true,
    cursorBlink: true,
    macOptionIsMeta: true,
    theme: {
      background: '#272822',
      foreground: '#F8F8F2',
      cursor: '#F8F8F2',
      selection: 'rgba(248, 248, 242, 0.3)',
      black: '#272822',
      red: '#F92672',
      green: '#A6E22E',
      yellow: '#F4BF75',
      blue: '#66D9EF',
      magenta: '#AE81FF',
      cyan: '#A1EFE4',
      white: '#F8F8F2',
      brightBlack: '#75715E',
      brightRed: '#F92672',
      brightGreen: '#A6E22E',
      brightYellow: '#F4BF75',
      brightBlue: '#66D9EF',
      brightMagenta: '#AE81FF',
      brightCyan: '#A1EFE4',
      brightWhite: '#F8F8F2',
    },
    ...config
  })
}
