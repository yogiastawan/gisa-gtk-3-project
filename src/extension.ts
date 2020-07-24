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
function createFolderStructureNewProject(nameProject:string){
	var currentDirectory=vscode.workspace.rootPath;
	console.log(currentDirectory);
	if(currentDirectory===null){
		vscode.window.showErrorMessage("Cannot Create Project. Please open folder first.");
		return false;
	}else{
		var name=nameProject.replace(' ','');
		fs.mkdirSync(currentDirectory+"/"+name+"/src",{recursive: true});
		fs.mkdirSync(currentDirectory+"/"+name+"/res/ui",{recursive:true});
		fs.mkdirSync(currentDirectory+"/"+name+"/res/menu",{recursive:true});
		fs.mkdirSync(currentDirectory+"/"+name+"/res/drawable",{recursive:true});
		fs.mkdirSync(currentDirectory+"/"+name+"/res/drawable-vector",{recursive:true});
		return true;
	}	
}

//create file project
function createFileNewProject(nameProject:string) {
	var currentDirectory=vscode.workspace.rootPath;
	var name=nameProject.replace(' ','_').toLowerCase();
	var nameDir=nameProject.replace(' ','');
	var content=createCContent(nameProject);
	fs.writeFileSync(currentDirectory+"/"+nameDir+"/src/"+name+".c",content);
	content=createWindowUIContent(nameProject);
	fs.writeFileSync(currentDirectory+"/"+nameDir+"/res/ui/"+name+".ui",content);
}

//create c content
function createCContent(nameProject:string){
	var content="This is C";
	return content;
}

//create window xml
function createWindowUIContent(nameProject:string){
	var content="This is ui xml";
	return content;
}

//create application menu bar xml
function createMenuUI(nameProject:string){
	var content="this is menu xml";
	return content;
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
		let name=createNameInput().then(async function(res){
			if(!res){
				vscode.window.showErrorMessage("Cannot create project");
			}else{
				console.log("input: "+res);
				//create folder
				var folderSuccess=createFolderStructureNewProject(res);
				if (!folderSuccess) {
					vscode.window.showErrorMessage("Cannot create project: Create base folder failed.");
				}else{
					//create file
					createFileNewProject(res);
				}
			}
		});
						
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
