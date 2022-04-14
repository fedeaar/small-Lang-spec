# Small Lang Grammar README

## Features 

- gramática para SmallLang (como aparece en David Gries: Science of Programming - 1981) y la notación para especificación de Algoritmos y Estructuras de Datos I (UBA).
- gramática para lógica de primer orden y la axiomatización de TADs de Algoritmos y Estructuras de Datos II (UBA).
- dos temas opcionales que extienden a dark_plus de vscode para funcionar mejor con smallLang (no lo alteran).
- compatibilidad con otros temas que siguen las convenciones de macromates.
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
- Fede Arienti: @fedeaar (fa.arienti@gmail.com) 
- Natán Vekselman: @NatanVek 
- Joni Bekenstein: @honi
- Eduardo Rosselot: @earosselot

## Release Notes 

## [0.0.6] - 2022-04-14 fixes y TADs
### added ###
- agregado de gramáticas y snippets para TADs @earosselot
- corrección de diversas gramáticas @NatanVek
