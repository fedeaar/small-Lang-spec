const fs = require('fs');


interface ConfigJSON {
	[name : string]:  string | {[key: string]: string | string[]} 
}


export async function convertToJSON(from: string, to: string): Promise<void> {
    fs.readFile(from, 'utf-8', (err: string, data: string) => {
        if (err) {
            console.error(err);
        } 
        let configfile: ConfigJSON | null = createConfigFile(data.split('\r\n'));
        if (configfile !== null) {
            let json = JSON.stringify(configfile, null, 4);
            fs.writeFile(to, json, (err : string) => {
                if (err) {
                    console.error(err);
                }
            });
        } else {
            console.error('error al crear el archivo.');
        }
    });  
}

function createConfigFile(file : string[]) : ConfigJSON | null {

    let configfile: ConfigJSON = {};
    let schema: string | null = null;
    
    for (let i = 0; i < file.length; ++i) {
        let line: string = file[i];
        if (line.replace(/\s+/g, '') === '') {
            continue;
        }
        let command : string = line.slice(0,2); 
        if (command === '##') {
            continue;
        }
        else if(command === '$$') {
            schema = line.slice(2,).trim();
        }
        else if (schema !== null) {
            let args : string[] = line.split(' ; ');
            let entry = null;
            switch(schema) {
                // agregar schemas acá
                case 'snippets':
                    entry = makeSnippet(args);
            }
            if (entry) {
                configfile[args[0].trim()] = entry;
            }
            else {
                console.error(`error al crear la entrada ${i}`);
                return null;
            }
        } 
        else {
            console.log(`no hay schema seleccionado para la entrada ${i}`);
            return null;
        }
    }
    return configfile;
}


function makeSnippet(args: string[]) {
    let res = {};
    if (args.length < 3) {
        return null;
    } else {
        let prefix = args[1].split(' , ').map(v => v.trim());
        let body = args[2].split(' , ').map(v => v.trim().replace('\\t', '\t').replace('\\n', '\n'));
        let description = '';
        if (args.length === 4) {
            description = args[3];
        }
        res = {
            "prefix" : prefix, 
            "body" : body, 
            "description" : description
        };
    }
    return res;
}
        
              