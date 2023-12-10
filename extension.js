const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const vimModeStatusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    Number.MIN_SAFE_INTEGER,
  );

  let ignoreTypeCommand;

  const enableVimModeCommand = vscode.commands.registerCommand(
    'vsce-vim-mode.enableVimMode',
    async () => {
      vimModeStatusBar.text = '-- VIM MODE --';
      vimModeStatusBar.color = '#0dbc79';
      vimModeStatusBar.show();

      ignoreTypeCommand = vscode.commands.registerCommand('type', () => {
        return null;
      });
      context.subscriptions.push(ignoreTypeCommand);

      await vscode.commands.executeCommand('setContext', 'vsce-vim-mode.isVimModeEnabled', true);
    },
  );

  const disableVimModeCommand = vscode.commands.registerCommand(
    'vsce-vim-mode.disableVimMode',
    async () => {
      vimModeStatusBar.hide();

      await vscode.commands.executeCommand('setContext', 'vsce-vim-mode.isVimModeEnabled', false);

      if (ignoreTypeCommand) {
        ignoreTypeCommand.dispose();
      }
    },
  );

  context.subscriptions.push(enableVimModeCommand, disableVimModeCommand);

  vscode.commands.executeCommand('vsce-vim-mode.enableVimMode');
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
