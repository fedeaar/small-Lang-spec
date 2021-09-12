import {SLError, SLinvalidCharError} from './errorHandlers';

// === CONSTANTS ===  //

const lNUMBER    = '0123456789';
const lALPHA     = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
const lOPERATOR  = '+-*:/,.=';
const lSPACE     = ' \n\t';
const lPAREN     = '()';
const lDELIMITER = lSPACE + lPAREN + ';';


// === LEXER CLASSES === //

class Position 
{
	i   : number;
	ln  : number;
	col : number;

	constructor(i : number, ln : number, col : number)
	{
		this.i   = i;
		this.ln  = ln;
		this.col = col;
	}

	advance(cChar : string | null) : number
	{
		this.i++;
		if (cChar === '\n') 
		{
			this.ln ++;
			this.col = 0;
		} 
		else {
			this.col++;
		}
		return this.i;
	}

	position() : [number, number] 
	{
		return [this.ln, this.col];
	}
}

class Token 
{
	type  : string;
	value : string;
	start : [number, number];
	end   : [number, number];

	constructor(
		type_ : string, 
		value_: string = '', 
		posStart:[number, number], 
		posEnd:[number, number]
	){
		this.type  =  type_;
		this.value = value_;
		this.start = posStart; 
		this.end   = posEnd;
 	}
}

class Lexer 
{
	text     : string;
	position : Position;
	cChar    : string | null;
	cStart   : [number, number];
	error    : SLError | null;
	tokens   : Token[];

	constructor(text : string)
	{
		this.text = text;
		
		this.position = new Position(-1, 0, -1); // TODO fix index start logic
		this.cChar = null; // current char
		this.advance();
		this.cStart = this.position.position();

		this.error = null;
		this.tokens = [];
	}
	
    makeTokens() : [Token[], SLError | null] 
	{
		if (this.tokens.length > 0) 
		{	
			return [this.tokens, null];
		}
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
                this.tokens.push(this.operatorToken());
            }
			else if (lDELIMITER.includes(this.cChar)) 
			{
                this.tokens.push(this.delimToken());
            } 
			else {
				this.errorHandler('invalidCharError');
				break;
			}
		}
		return [this.tokens, this.error];
	}
	
	private advance() : void 
	{
		let i = this.position.advance(this.cChar);
		if (i < this.text.length) 
		{
			this.cChar = this.text[i];
		} 
		else 
		{
			this.cChar = null;
		}
	}

	private genToken (
		type: string, 
		loop: boolean,
		include: (cChar : string) => boolean, 
		breakOn: (cChar : string) => boolean, 
		raiseError: (cChar : string, cToken : string) => [boolean, string]
	) : Token 
	{
		let token : string = '';
		this.cStart = this.position.position();
		while (this.cChar !== null) 
		{
			let error = raiseError(this.cChar, token);
			if (error[0]) 
			{
				this.errorHandler(error[1]);
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
				this.errorHandler('invalidCharError');
				break;
			}
			this.advance();
			if (!loop) {
				break;
			}
		}
		let cEnd : [number, number] = this.position.position();
		return new Token(type, token, this.cStart, [cEnd[0], cEnd[1] - 1]); 
	}

	private errorHandler(type : string) : void 
	{
		this.cChar = null;
		this.tokens = [];
		switch(type) {
			case 'invalidCharError':
				let msg = `caracter invalido en lectura del archivo.`;
				this.error = new SLinvalidCharError(msg, this.cStart, this.position.position());
		}
		
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
			(cChar : string, cToken : string) : [boolean, string] => { 
				if (lALPHA.includes(cChar) || (cChar === '.' && cToken.includes('.'))) 
				{
					return [true, 'invalidCharError'];
				}
				return [false, ''];
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
			(cChar : string, cToken : string) : [boolean, string] => { 
				return [false, ''];
			}
		);
    }

	private operatorToken() : Token 
	{
		return this.genToken(
			'O', true,
			(cChar : string) : boolean => { 
				return lOPERATOR.includes(cChar); 
			},
			(cChar : string) : boolean => { 
				return !lOPERATOR.includes(cChar); 
			},
			(cChar : string, cToken : string) : [boolean, string] => { 
				return [false, ''];
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
			(cChar : string, cToken : string) : [boolean, string] => { 
				return [false, ''];
			}
		);
	}
}

export function execLexer (text: string) : [Token[], SLError | null] 
{
	let lex : Lexer = new Lexer(text);
	return lex.makeTokens();
}