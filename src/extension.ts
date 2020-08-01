// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as menuContentxml from "./menuxml";
import * as windowContentxml from "./windowxml";
import * as mainC from "./mainc";
import * as makefileCreator from "./makefile";
import * as gResource from "./res";
import * as customWidgetContent from "./customwidget";

//create name input
function createNameInput() {
	var option: vscode.InputBoxOptions = {
		ignoreFocusOut: false,
		placeHolder: "Input here your project name...",
		prompt: "Type here your project name."
	};
	return vscode.window.showInputBox(option);
}

//create folder structure
function createFolderStructureNewProject(nameProject: string) {
	var currentDirectory = vscode.workspace.rootPath;
	console.log(currentDirectory);
	if (currentDirectory === null) {
		vscode.window.showErrorMessage("Cannot Create Project. Please open folder first.");
		return false;
	} else {
		var name = nameProject.replace(/ /g , "");
		fs.mkdirSync(currentDirectory + "/" + name + "/src", { recursive: true });
		fs.mkdirSync(currentDirectory + "/" + name + "/res/ui", { recursive: true });
		fs.mkdirSync(currentDirectory + "/" + name + "/res/menu", { recursive: true });
		fs.mkdirSync(currentDirectory + "/" + name + "/res/drawable", { recursive: true });
		fs.mkdirSync(currentDirectory + "/" + name + "/res/drawable-vector", { recursive: true });
		return true;
	}
}

//create file project
function createFileNewProjectWithUI(nameProject: string) {
	var currentDirectory = vscode.workspace.rootPath;
	var name = nameProject.replace(/ /g, '_').toLowerCase();
	var nameDir = nameProject.replace(/ /g, '');
	//create main c file
	var content = mainC.mainWithUI(nameProject);
	fs.writeFileSync(currentDirectory + "/" + nameDir + "/src/main_" + name + ".c", content);
	//create ui window file
	content = windowContentxml.createWindowContent(nameProject);
	fs.writeFileSync(currentDirectory + "/" + nameDir + "/res/ui/" + name + ".ui", content);
	//create menu.ui file
	content = menuContentxml.menuxmlcontent();
	fs.writeFileSync(currentDirectory + "/" + nameDir + "/res/menu/menu.ui", content);
	//create resource file
	content=gResource.contentRes(nameProject);
	fs.writeFileSync(currentDirectory + "/" + nameDir + "/res/res_"+nameDir+".gresource.xml", content);
	//create Makefile project	
	content=makefileCreator.contentMakeFileProject(nameProject);
	fs.writeFileSync(currentDirectory + "/" + nameDir + "/Makefile", content);
	//create Makefile src project	
	content=makefileCreator.contentMakeFileSrc(nameProject);
	fs.writeFileSync(currentDirectory + "/" + nameDir + "/src/source.mk", content);
	//create Makefile res project	
	content=makefileCreator.contentMakeFileRes(nameProject);
	fs.writeFileSync(currentDirectory + "/" + nameDir + "/res/resource.mk", content);
}

//new custom_widget
function createNameWidget() {
	var option: vscode.InputBoxOptions = {
		ignoreFocusOut: false,
		placeHolder: "Input here your widget name...",
		prompt: "Type here your widget name."
	};
	return vscode.window.showInputBox(option);
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "gisa-gtk-3-project" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('gisa-gtk-3-project.createproject', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Gisa Gtk+3 Project!');
		let name = createNameInput().then(async function (res) {
			if (!res) {
				vscode.window.showErrorMessage("Cannot create project");
			} else {
				console.log("input: " + res);
				//create folder
				var folderSuccess = createFolderStructureNewProject(res);
				if (!folderSuccess) {
					vscode.window.showErrorMessage("Cannot create project: Create base folder failed.");
				} else {
					//create file
					createFileNewProjectWithUI(res);
				}
			}
		});

	});

	let disposable2=vscode.commands.registerCommand('gisa-gtk-3-project.createcustomwidget',()=>{

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
