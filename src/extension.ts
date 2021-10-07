import * as vscode from 'vscode';
import {path, uri, open, show, del, cpy, reloadWindow, restore} from './utils/interfaces';
import { convertToJSON } from './utils/slconfigToJSON';
import { convertToLatex} from './utils/slspecToLatex';

export function activate(context: vscode.ExtensionContext): void 
{	
	console.log('activando smallLang grammar.');
	// sample //
	let sample = vscode.commands.registerCommand(
		'smallLang-spec.sample', 
		() => cmdSample(context));
	context.subscriptions.push(sample);

	// edición del tema //
	let editTheme = vscode.commands.registerCommand(
		'smallLang-spec.editTheme',
		() => cmdEditTheme(context));
	context.subscriptions.push(editTheme);

	// restore tema //
	let restoreTheme = vscode.commands.registerCommand(
		'smallLang-spec.restoreTheme', 
		() => cmdRestoreTheme(context));
	context.subscriptions.push(restoreTheme);

	// edición de los snippets //
	let editSnippets = vscode.commands.registerCommand(
		'smallLang-spec.editSnippets', 
		() => cmdEditSnippets(context));
	context.subscriptions.push(editSnippets);

	// commit snippets //
	let commitSnippets = vscode.commands.registerCommand(
		'smallLang-spec.commitSnippets', 
		() => cmdCommitSnippets(context));
	context.subscriptions.push(commitSnippets);

	// restore snippets //
	let restoreSnippets = vscode.commands.registerCommand(
		'smallLang-spec.restoreSnippets', 
		() => cmdRestoreSnippets(context));
	context.subscriptions.push(restoreSnippets);

	let latexify = vscode.commands.registerCommand(
		'smallLang-spec.latexify', 
		() => cmdLatexify(context));
	context.subscriptions.push(latexify);
} 

export function deactivate() 
{
	console.log('desactivando smallLang grammar.');
}


// === commands === //

function cmdSample(context : vscode.ExtensionContext) : void
{
	show(path(context, './samples/sample.slspec'));
}

function cmdEditTheme(context : vscode.ExtensionContext) : void
{
	show(path(context, './syntaxes/color-theme.json'));
}

function cmdRestoreTheme(context : vscode.ExtensionContext) : void
{
	restore(
		context, 
		'./syntaxes/sc/sc.color-theme.json', 
		'./syntaxes/color-theme.json'
	);
}

function cmdEditSnippets(context : vscode.ExtensionContext) : void
{
	show(path(context, './syntaxes/snippets.slconfig'));
}

function cmdCommitSnippets(context : vscode.ExtensionContext) : void
{
	convertToJSON(
		path(context, './syntaxes/snippets.slconfig'), 
		path(context, './syntaxes/snippets.json'))
	.then(
		() => reloadWindow()
	);
}

function cmdRestoreSnippets(context : vscode.ExtensionContext) : void
{
	restore(context, 
		'./syntaxes/config/sc/sc.snippets.slconfig', 
		'./syntaxes/config/snippets.slconfig,',
		cmdCommitSnippets);
}

function cmdLatexify(context : vscode.ExtensionContext) : void
{
	let document = vscode.window.activeTextEditor?.document;
	if (document) {
		let path = vscode.workspace.getWorkspaceFolder(document.uri);
		let text = document.getText();
		let head = '\\documentclass[a4paper]{article}\n\\usepackage[utf8]{inputenc}\n\\begin{document}\n';
		let tail = '\n\\end{document}';
		text = head + convertToLatex(text) + tail;
		vscode.workspace.openTextDocument({
			content: text, 
			language: "latex"
		}).then(
			document => vscode.window.showTextDocument(document, vscode.ViewColumn.Beside)
		);
	}
}