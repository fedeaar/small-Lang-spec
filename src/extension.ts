import * as vscode from 'vscode';

export function activate(): void {
	console.log('small Lang grammar is active.');
}
export function deactivate() {
	console.log('deactivating small Lang grammar.');
}


// === ERROR CLASSES === //

class SLError {
	name    : string;
	details : string;
	constructor(errorName : string, details : string){
		this.name = errorName;
		this.details = details;
	}
	msg() : string {
		return `${this.name} - ${this.details}`;
	}
}
class SLinvalidCharError extends SLError {
	constructor(details : string) {
		super('illegalCharacterError', details);
	}
}

// === LEXER CLASSES === //

const lNUMBER    = '0123456789';
const lALPHA     = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
const lOPERATOR  = '+-*/:,.=';
const lSPACE     = ' \n\t';
const lPAREN     = '()';
const lDELIMITER = lSPACE + lPAREN + ';';
class Token {
	type  : string;
	value : string;
	constructor(type_ : string, value_: string = ''){
		this.type  =  type_;
		this.value = value_;
	}
	toString() {
        return `${this.type}: ${this.value}`;
    }
}

class Position {
	i   : number;
	ln  : number;
	col : number;
	constructor(i : number, ln : number, pos : number){
		this.i = i;
		this.ln = ln;
		this.col = pos;
	}
	advance(text : string) : string | null
	{
		let nChar : string | null = '';
		if (this.i < text.length) 
		{
			nChar = text[this.i];
			this.i++;
		} 
		else 
		{
			nChar = null;
		}
		if (nChar === '\n') 
		{
			this.ln ++;
			this.col = 0;
		} else {
			this.col++;
		}
		return nChar;
	}
	display() : string {
		return `ln: ${this.ln}, col: ${this.col}`;
	}
}

class Lexer {
	text     : string;
	position : Position;
	cChar    : string | null;
	error    : SLError | null;
	tokens   : Array<Token>;
	constructor(text : string)
	{
		this.text = text;
		this.position = new Position(0, 1, 0);
		this.cChar = null; // current char
		this.error = null;
		this.tokens = [];
		this.advance();
	}
    // === public === //
    makeTokens() : [Array<Token>, SLError | null] 
	{
		this.tokens = [];
		while (this.cChar !== null) 
		{
			if (lNUMBER.includes(this.cChar)) 
			{
                this.tokens.push(this.numberToken());
            } 
			else if (lALPHA.includes(this.cChar)) 
			{
                this.tokens.push(this.alphaToken());
            }
			else if (lOPERATOR.includes(this.cChar)) 
			{
                this.tokens.push(this.opToken());
            }
			else if (lDELIMITER.includes(this.cChar)) 
			{
                this.tokens.push(this.delimToken());
            } 
			else {
				this.errorHandler('invalidCharError', 
					`caracter invalido en lectura del archivo : '${this.cChar}' en ${this.position.display()}`);
				break;
			}
		}
		return [this.tokens, this.error];
	}
    // === private === //
	private errorHandler(type : string, msg : string) : void 
	{
		this.cChar = null;
		this.tokens = [];
		switch(type) {
			case 'invalidCharError':
				this.error = new SLinvalidCharError(msg);
		}
		
	}
	private advance() : void 
	{
		this.cChar = this.position.advance(this.text);
	}

	private genToken (
		type: string, 
		loop: boolean,
		include: (cChar : string) => boolean, 
		breakOn: (cChar : string) => boolean, 
		raiseError: (cChar : string, cToken : string) => [boolean, string, string]
	) : Token 
	{
		let token : string = '';
		while (this.cChar !== null) 
		{
			let error = raiseError(this.cChar, token);
			if (error[0]) 
			{
				this.errorHandler(error[1], error[2]);
				type = 'ERROR';
				break;
			}
			if (include(this.cChar)) 
			{ 
				token += this.cChar; 
			}
			else if (breakOn(this.cChar)) 
			{
				break; 
			} else {
				this.errorHandler('invalidCharError', 
					`caracter invalido en lectura del archivo : '${this.cChar}' en ${this.position.display()}`);
				break;
			}
			this.advance();
			if (!loop) {
				break;
			}
		}
		return new Token(type, token);
	}

	// === tipos de token === //
	private numberToken() : Token 
	{
		return this.genToken(
			'N', true,
			(cChar : string) : boolean => { 
				return lNUMBER.includes(cChar) || cChar === '.'; 
			},
			(cChar : string) : boolean => { 
				return (lDELIMITER + lOPERATOR).includes(cChar); 
			},
			(cChar : string, cToken : string) : [boolean, string, string] => { 
				if (lALPHA.includes(cChar) || (cChar === '.' && cToken.includes('.'))) 
				{
					return [true, 'invalidCharError', 
						`character invalido en lectura de NUMBER: '${cToken}' en ${this.position.display()}`];
				}
				return [false, '', ''];
			}
		);
	}

	private alphaToken() : Token 
	{
		return this.genToken(
			'A', true,
			(cChar : string) : boolean => { 
				return (lALPHA + lNUMBER).includes(cChar); 
			},
			(cChar : string) : boolean => { 
				return (lDELIMITER + lOPERATOR).includes(cChar); 
			},
			(cChar : string, cToken : string) : [boolean, string, string] => { 
				return [false, '', ''];
			}
		);
    }

	private opToken() : Token 
	{
		return this.genToken(
			'O', true,
			(cChar : string) : boolean => { 
				return lOPERATOR.includes(cChar); 
			},
			(cChar : string) : boolean => { 
				return !lOPERATOR.includes(cChar); 
			},
			(cChar : string, cToken : string) : [boolean, string, string] => { 
				return [false, '', ''];
			}
		);
    }

	private delimToken() : Token 
	{
		return this.genToken(
			'D', false, 
			(cChar : string) : boolean => { 
				return lDELIMITER.includes(cChar); 
			},
			(cChar : string) : boolean => { 
				return !lDELIMITER.includes(cChar); 
			},
			(cChar : string, cToken : string) : [boolean, string, string] => { 
				return [false, '', ''];
			}
		);
	}
}

function execLexer (text: string) : [Array<Token>, SLError | null] 
{
	let lex : Lexer = new Lexer(text);
	return lex.makeTokens();
}

let test = 'aux sumar(xvalor: Z, y_valor: Z):Z = xvalor + y_valor + 2.33;';
console.log(test, '\n', execLexer(test));

