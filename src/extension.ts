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
	var workspaces: ReadonlyArray<vscode.WorkspaceFolder> | undefined;
	workspaces = vscode.workspace.workspaceFolders;
	if (workspaces) {
		var name = nameProject.replace(/ /g, "");
		fs.mkdirSync(`${workspaces[0].uri.path}/${name}/src`, { recursive: true });
		fs.mkdirSync(`${workspaces[0].uri.path}/${name}/res/ui`, { recursive: true });
		fs.mkdirSync(`${workspaces[0].uri.path}/${name}/res/menu`, { recursive: true });
		fs.mkdirSync(`${workspaces[0].uri.path}/${name}/res/drawable`, { recursive: true });
		fs.mkdirSync(`${workspaces[0].uri.path}/${name}/res/drawable-vector`, { recursive: true });
		fs.mkdirSync(`${workspaces[0].uri.path}/${name}/res/style`, { recursive: true });
		return true;
	} else {
		vscode.window.showErrorMessage("Cannot Create Project. Please open folder first.");
		return false;
	}
}

//create file project
function createFileNewProjectWithUI(nameProject: string) {
	var workspaces: ReadonlyArray<vscode.WorkspaceFolder> | undefined;
	workspaces = vscode.workspace.workspaceFolders;
	if (workspaces) {
		var name = nameProject.replace(/ /g, '_').toLowerCase();
		var nameDir = nameProject.replace(/ /g, '');
		//create main c file
		var content = mainC.mainWithUI(nameProject);
		fs.writeFileSync(`${workspaces[0].uri.path}/${nameDir}/src/main_${name}.c`, content);
		//create ui window file
		content = windowContentxml.createWindowContent(nameProject);
		fs.writeFileSync(`${workspaces[0].uri.path}/${nameDir}/res/ui/${name}.ui`, content);
		//create menu.ui file
		content = menuContentxml.menuxmlcontent();
		fs.writeFileSync(`${workspaces[0].uri.path}/${nameDir}/res/menu/menu.ui`, content);
		//create resource file
		content = gResource.contentRes(nameProject);
		fs.writeFileSync(`${workspaces[0].uri.path}/${nameDir}/res/res_${nameDir}.gresource.xml`, content);
		//create Makefile project	
		content = makefileCreator.contentMakeFileProject(nameProject);
		fs.writeFileSync(`${workspaces[0].uri.path}/${nameDir}/Makefile`, content);
		//create Makefile src project	
		content = makefileCreator.contentMakeFileSrc(nameProject);
		fs.writeFileSync(`${workspaces[0].uri.path}/${nameDir}/src/source.mk`, content);
		//create Makefile res project	
		content = makefileCreator.contentMakeFileRes(nameProject);
		fs.writeFileSync(`${workspaces[0].uri.path}/${nameDir}/res/resource.mk`, content);
		vscode.commands.executeCommand('vscode.openFolder',vscode.Uri.file(`${workspaces[0].uri.path}/${nameDir}`));
		
	} else {
		vscode.window.showErrorMessage("Cannot Create File to Project");
	}
}

function createFileNewProject(nameProject: string) {
	var workspaces: ReadonlyArray<vscode.WorkspaceFolder> | undefined;
	workspaces = vscode.workspace.workspaceFolders;
	if (workspaces) {
		var name = nameProject.replace(/ /g, '_').toLowerCase();
		var nameDir = nameProject.replace(/ /g, '');
		//create main c file
		var content = mainC.mainWithoutUI(nameProject);
		fs.writeFileSync(`${workspaces[0].uri.path}/${nameDir}/src/main_${name}.c`, content);		
		//create Makefile project	
		content = makefileCreator.contentMakeFileProjetPureC(nameProject);
		fs.writeFileSync(`${workspaces[0].uri.path}/${nameDir}/Makefile`, content);
		//create Makefile src project	
		content = makefileCreator.contentMakeFileSrc(nameProject);
		fs.writeFileSync(`${workspaces[0].uri.path}/${nameDir}/src/source.mk`, content);
		vscode.commands.executeCommand('vscode.openFolder',vscode.Uri.file(`${workspaces[0].uri.path}/${nameDir}`));
		
	} else {
		vscode.window.showErrorMessage("Cannot Create File to Project");
	}
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

function createFolderCustomWidget() {
	var workspaces: ReadonlyArray<vscode.WorkspaceFolder> | undefined;
	workspaces = vscode.workspace.workspaceFolders;
	if (workspaces) {
		fs.mkdirSync(`${workspaces[0].uri.path}/src/customWidget`, { recursive: true });
		return true;
	} else {
		vscode.window.showErrorMessage("Cannot Create Custom Widget. Please open folder first.");
		return false;
	}
}

function createFileNewCustomWidget(nameWidget: string) {
	var workspaces: ReadonlyArray<vscode.WorkspaceFolder> | undefined;
	workspaces = vscode.workspace.workspaceFolders;
	if (workspaces) {
		var name = nameWidget.replace(/ /g, '').toLowerCase();
		var headDir = `${workspaces[0].uri.path}/src/customWidget/${name}.h`;
		var cDir = `${workspaces[0].uri.path}/src/customWidget/${name}.c`;
		//create widget file
		var content = customWidgetContent.customWidgetHeader(nameWidget);
		fs.writeFileSync(`${headDir}`, content);
		var content = customWidgetContent.customWidgetCFile(nameWidget);
		fs.writeFileSync(`${cDir}`, content);
	}

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
	let disposable = vscode.commands.registerCommand('gisa-gtk-3-project.createprojectwithUI', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from Gisa Gtk+3 Project!');
		let name = createNameInput().then(async function (res) {
			if (!res) {
				vscode.window.showErrorMessage("Cannot create project");
			} else {
				// console.log("input: " + res);
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

	let pureCproj = vscode.commands.registerCommand('gisa-gtk-3-project.createproject', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from Gisa Gtk+3 Project!');
		let name = createNameInput().then(async function (res) {
			if (!res) {
				vscode.window.showErrorMessage("Cannot create project");
			} else {
				// console.log("input: " + res);
				//create folder
				var folderSuccess = createFolderStructureNewProject(res);
				if (!folderSuccess) {
					vscode.window.showErrorMessage("Cannot create project: Create base folder failed.");
				} else {
					//create file
					createFileNewProject(res);					
				}
			}
		});

	});

	let disposable2 = vscode.commands.registerCommand('gisa-gtk-3-project.createcustomwidget', () => {
		let name = createNameWidget().then(async function (res) {
			if (!res) {
				vscode.window.showErrorMessage("Cannot create Custom Widget");
			} else {
				console.log("input: " + res);
				var folderSuccess = createFolderCustomWidget();
				if (!folderSuccess) {
					vscode.window.showErrorMessage("Cannot create widget: Create folder failed.");
				} else {
					createFileNewCustomWidget(res);
				}
			}
		});

	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() { }
