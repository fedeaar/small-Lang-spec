import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void 
{
	console.log('smallLang grammar esta activo.');
	
	let sampleFn = vscode.commands.registerCommand('smallLang-spec.sample', () => {
		let uri = context.asAbsolutePath('./samples/sample.slspec');
		vscode.workspace.openTextDocument(uri).then(
			document => vscode.window.showTextDocument(document));
	});
	context.subscriptions.push(sampleFn);

	let editTheme = vscode.commands.registerCommand('smallLang-spec.editTheme', () => {
		let uri = context.asAbsolutePath('./syntaxes/smallLang-spec.tmTheme.json');
		vscode.workspace.openTextDocument(uri).then(
			document => vscode.window.showTextDocument(document));
	});
	context.subscriptions.push(editTheme);

	let restoreTheme = vscode.commands.registerCommand('smallLang-spec.restoreTheme', () => {
		const uriSC = vscode.Uri.file(context.asAbsolutePath('./syntaxes/smallLang-spec.tmTheme.safecopy.json'));
		const uriCu = vscode.Uri.file(context.asAbsolutePath('./syntaxes/smallLang-spec.tmTheme.json'));
		vscode.workspace.fs.delete(uriCu).then( () => 
			vscode.workspace.fs.copy(uriSC, uriCu).then( () =>
				vscode.commands.executeCommand('workbench.action.reloadWindow')
			)
		);
	});
	context.subscriptions.push(restoreTheme);
}

export function deactivate() 
{
	console.log('desactivando smallLang grammar.');
}
