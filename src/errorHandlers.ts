// === ERROR CLASSES === //

export class SLError 
{
	name    : string;
	details : string;
	start   : [number, number];
	end     : [number, number];

	constructor(
		errorName : string, 
		details : string, 
		start : [number, number], 
		end : [number, number]
	){
		this.name = errorName;
		this.details = details;
		this.start = start;
		this.end = end;
	}

	msg() : string 
	{
		return `${this.name} - ${this.details} en ${this.start} a ${this.end}.`;
	}
}

export class SLinvalidCharError extends SLError 
{
	constructor(
		details : string, 
		start : [number, number], 
		end : [number, number]
	){
		super('illegalCharacterError', details, start, end);
	}
}