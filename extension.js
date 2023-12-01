const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "vsce-vim-mode" is now active!');

  const disposable = vscode.commands.registerCommand('vsce-vim-mode.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from Alex Gudkov Vim Mode!');
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
