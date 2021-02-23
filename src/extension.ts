// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {
	let disposable = vscode.commands.registerCommand(
		"search-in-search.searchInSearch",
		async (): Promise<void> => {
			await searchInSearch();
		}
	);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

async function searchInSearch(): Promise<void> {
	await vscode.commands.executeCommand("search.action.copyAll");
	const projectPath = vscode.workspace.rootPath;
	const clipBoardResult = await vscode.env.clipboard.readText();

	if (projectPath === undefined) { return; }

	await vscode.commands.executeCommand("workbench.action.findInFiles", {
		query: "",
		filesToInclude: Array.from(clipBoardResult.matchAll(RegExp(`${projectPath}/(.*)`, "g")), m => m[1]).join(", "),
	});
}

