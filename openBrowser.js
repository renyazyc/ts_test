const open = require('opn');
const execSync = require('child_process').execSync



function startBrowserProcess (url) {
  // 如果在mac os x环境下，刷新已经打开的tab页，而不是重新打开一个
  const shouldTryOpenChromeWithAppleScript = process.platform === 'darwin';

  if (shouldTryOpenChromeWithAppleScript) {
    try {
      // 执行openChrome.applescript脚本，判断已经打开的tab页，并刷新
      execSync('ps cax | grep "Google Chrome"')
      execSync('osascript openChrome.applescript "' + encodeURI(url) + '"', {
        cwd: __dirname,
        stdio: 'ignore' // 忽略文件描述符号
      })
      return true
    } catch (err) {
      // Ignore errors.
    }
  }



  // 总是打开一个新的tab页
  try {
    const options = { app: undefined }
    open(url, options).catch(() => {}) // Prevent `unhandledRejection` error.
    return true
  } catch (err) {
    return false
  }
}

module.exports = (url) => {
  return startBrowserProcess(url)
}