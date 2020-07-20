// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

//create name input
function createNameInput(){
	var option: vscode.InputBoxOptions={
		ignoreFocusOut:false,
		placeHolder:"Input here your project name...",
		prompt:"Type here your project name."
	};
	return vscode.window.showInputBox(option);
}

//create folder structure
function createFolderStructureNewProject(){

}

//create file project
function createFileNewProject() {
	
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "gisa-gtk-3-project" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('gisa-gtk-3-project.createproject', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Gisa Gtk+3 Project!');
		let name=createNameInput();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
