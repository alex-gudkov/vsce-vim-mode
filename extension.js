const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const vimModeStatusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    Number.MIN_SAFE_INTEGER,
  );

  const enableVimModeCommand = vscode.commands.registerCommand(
    'vsce-vim-mode.enableVimMode',
    async () => {
      vimModeStatusBar.text = '-- VIM MODE --';
      vimModeStatusBar.color = '#0dbc79';
      vimModeStatusBar.show();

      await vscode.commands.executeCommand('setContext', 'vsce-vim-mode.isVimModeEnabled', true);
    },
  );

  const disableVimModeCommand = vscode.commands.registerCommand(
    'vsce-vim-mode.disableVimMode',
    async () => {
      vimModeStatusBar.text = '';
      vimModeStatusBar.hide();

      await vscode.commands.executeCommand('setContext', 'vsce-vim-mode.isVimModeEnabled', false);
    },
  );

  context.subscriptions.push(enableVimModeCommand, disableVimModeCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
