import * as vscode from 'vscode';

export function path(context: vscode.ExtensionContext, relativePath : string) : string
{
	return context.asAbsolutePath(relativePath);
}
export function uri(fullPath : string) : vscode.Uri
{
	return vscode.Uri.file(fullPath);
}
export function open(fullPath: string) : Thenable<vscode.TextDocument>
{
	return vscode.workspace.openTextDocument(fullPath);
}
export function show(fullPath: string | undefined) : Thenable<vscode.TextEditor> | void
{
	if (fullPath === undefined) return;
	return open(fullPath).then(document => vscode.window.showTextDocument(document, vscode.ViewColumn.Beside));
}
export function del(uri:vscode.Uri) : Thenable<void>
{
	return vscode.workspace.fs.delete(uri);
}
export function cpy(from:vscode.Uri, to:vscode.Uri) : Thenable<void>
{
	return vscode.workspace.fs.copy(from, to);
}
export function reloadWindow() : void
{	
	vscode.workspace.saveAll().then(
		() => vscode.commands.executeCommand('workbench.action.reloadWindow')
	);
}
export function restore (
	context: vscode.ExtensionContext, 
	safecopyRelativePath : string,
	replaceDestination : string,
	beforeReload : Function | null = null
	) : void
{
	const uriSC = uri(path(context, safecopyRelativePath));
	const uriCu = uri(path(context, replaceDestination));
	del(uriCu)
	.then(() => cpy(uriSC, uriCu))
	.then(() => {
		if (beforeReload)
		{
			beforeReload(context);
		}
	})
	.then(() => reloadWindow());
}
