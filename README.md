# Small Lang Grammar README

## Features 

- gramática para SmallLang (como aparece en David Gries: Science of Programming - 1981) y la notación para especificación de Algoritmos y Estructuras de Datos I (UBA).
- dos temas opcionales que extienden a dark_plus de vscode para funcionar mejor con smallLang (no lo alteran).
- compatibilidad con otros temas que sigan las convenciones de macromates.
- snippets varios, entre ellos para los axiomas de corrección de programas, estructuración de proc, pred, aux, enum, type, if y while.
- un monton de reemplazos sintácticos (ver a través del commando > SmallLang-Spec: edit snippets).

## uso 
una vez instalado: 
- crear un archivo .txt
- cambiar su extensión a .slspec 
- abrir en vscode

## comandos 
// en el command pallete de vscode (ctrl + shift + p) //
- SmallLang-Spec: sample file -> abre una ejemplo de la aplicación
- SmallLang-Spec: edit theme -> permite editar las configuraciones de estilo de la extensión.
- SmallLang-Spec: restore theme  -> rearma el estilo predeterminado.
- SmallLang-Spec: edit snippets -> permite editar a través de un archivo slconfig los snippets de la extensión.
- SmallLang-Spec: commit snippets -> para aplicar los cambios. OJO! El commit actualiza el workspace, asique tengan todo guardado.
- SmallLang-Spec: restore snippets -> rearma los snippets predeterminados.

## cambio de tema base
- guardar en ./syntaxes/ el nuevo tema base (formato .json)
- ejecutar smallLang-Spec: edit theme
- cambiar 'dark_plus' por el nombre del nuevo tema en "include":"./dark_plus.json" 

## contribuidores 
- Fede Arienti: fa.arienti@gmail.com
- Natán Vekselman: @NatanVek 

## Release Notes 

## [0.0.5] - 2021-09-18 fixes y nuevas adiciones
### added ###
- grammar para Mat[]
- grammar para length, head, tail, addFirst, concat, ++, subSeq, setAt, apariciones
- grammar para div, mod
- grammar para log, sin, cos, tan, asin, acos, atan
- grammar para ord
- ̸strikethrough  snippet
- snippets para sumatoria y productoria (estructura)
- grammar para endif
- grammar para ⟹?
- snippet teorema del invariante

### fixed ###
- color diferente para funciones de especificación en el theme
- reescritura de axiomas 1 a 5
