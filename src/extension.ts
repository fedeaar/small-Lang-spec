import * as vscode from 'vscode';
import {execLexer} from './Lexer';

export function activate(): void {
	console.log('small Lang grammar is active.');
}
export function deactivate() {
	console.log('deactivating small Lang grammar.');
}

let test = 
	'aux sumar(\n \
	xvalor: Z, \n \
	y_valor: Z) : Z = \n \
	xvalor + y_valor + 2.33;';
console.log(test);
console.log(execLexer(test));

 