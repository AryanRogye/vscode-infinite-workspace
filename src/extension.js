const vscode = require('vscode');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const registerCommand = vscode.commands.registerCommand('infi.openCanvas', function () {

		// First Thing is to get the current active text editor

		const config = vscode.workspace.getConfiguration();


		// Update the setting to hide the tabs
		config.update(
			"workbench.editor.showTabs",
			false,
			vscode.ConfigurationTarget.Global
		);

		// Create a new webview

		const panel = vscode.window.createWebviewPanel(
			"infinite-workspace",
			"",
			vscode.ViewColumn.One,
			{
				// Allow scripts in the webview
				enableScripts: true,
				// And restrict the webview to only loading content from our extension's `media` directory.
				retainContextWhenHidden: true,
			}
		);	

		// This is the icon that will be displayed in the title bar of the webview
		(panel.iconPath = {
			light: vscode.Uri.file(
				path.join(context.extensionPath, "assets", "icon.png")
			),
			dark: vscode.Uri.file(
				path.join(context.extensionPath, "assets", "icon.png")
			),
		});
		panel.webview.onDidReceiveMessage(
			(message) => {
				const { command, requestId, payload } = message;

				switch (command)
				{
				}

			}
		);
		panel.webview.html = getWebviewContent(context, panel.webview);
	});

	context.subscriptions.push(registerCommand);
}


const getWebviewContent = (context, webview) => {
    const jsFile = "webview.js";
    const localServerUrl = "http://localhost:5173";

	let scriptUrl = null;

	const production = context.extensionMode === vscode.ExtensionMode.Production;
	if (production) 
	{
		scriptUrl = webview
		.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, "dist", jsFile)))
		.toString();
	} else {
		scriptUrl = `${localServerUrl}/${jsFile}`;
	}

	const openEditors = vscode.window.tabGroups.all.flatMap(group =>
		group.tabs
			.filter(tab => tab.input instanceof vscode.TabInputText)
			.map(tab => {
				if (tab.input instanceof vscode.TabInputText)
				{
					return tab.input.uri.fsPath
				}
			})
	);

	console.log(openEditors);


	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Infinite Code Canvas</title>
    <style>
        html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: stretch;
            justify-content: stretch;
        }
        iframe {
            width: 100vw;
            height: 100vh;
            border: none;
            margin: 0;
            padding: 0;
            display: block;
        }
    </style>
	</head>
	<body>
        <iframe src="${scriptUrl}"></iframe> <!-- Loads full React app inside webview -->
    </body>
	</html>`;
}

function deactivate() {}


module.exports = {
	activate,
	deactivate
}
