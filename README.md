# Small Lang Grammar README

## Features 

- gramática para SmallLang (como aparece en David Gries: Science of Programming - 1981) y la notación para especificación de Algoritmos y Estructuras de Datos I (UBA).
- dos temas opcionales que extienden a dark_plus de vscode para funcionar mejor con smallLang (no lo altera).
- compatibilidad con otros temas que sigan las convenciones de macromates.
- snippets varios, entre ellos para los axiomas de corrección de programas, estructuración de proc, pred, aux, enum, type, if y while
- un monton de reemplazos sintácticos (ver a través del commando > SmallLang-Spec: edit snippets)

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
- SmallLang-Spec: edit snippets -> permite editar através de un archivo slconfig los snippets de la extensión
- SmallLang-Spec: commit snippets -> para aplicar los cambios. OJO! El commit actualiza el workspace, asique tengan todo guardado.
- SmallLang-Spec: restore snippets -> rearma los snippets predeterminados.

## cambio de tema base
- guardar en ./syntaxes/ el nuevo tema base (formato .json)
- ejecutar smallLang-Spec: edit theme
- cambiar 'dark_plus' por el nombre del nuevo tema en "include":"./dark_plus.json" 

## contribuidores 
Fede Arienti: fa.arienti@gmail.com
Natan Vekselman: @natanvek 

## Release Notes 
## [0.0.3] - 2021-09-13 quick fixes
### added ###
- for como palabra clave para las sumatorias
- snippet yluego
- snippets generales par sub y superscript
- highlighting basico para funciones y sequencias
- snippets para los axiomas generales (ax1 a ax5) por @Natanvek
- un nuevo theme por @Natanvek
- snippets para ⅀ ℿ ⟨ ⟩
- un formato para crear y editar los snippets  a través de los comandos edit y commit snippets 
- comandos nuevos: SmallLang-Spec : edit snippets, SmallLang-Spec: commit snippets (ojo tener todo guardado antes de usar, recargar el workspace), SmallLang-Spec: restore snippets

### removed ###
- case sensitivity para palabras claves

### fixed ###
- matching para nested seq
- matching de numeros
- bugs varios
## [0.0.2] - 2021-09-13 quick fixes
### fixed ###
- especificación de la gramática para evitar overlapping con el tema base.
- normalización de los identificadores para que funcione con diversos temas.

## [0.0.1] - 2021-09-12 initial release 
### added ###
#### gramática y configuraciones

- funciones SmallLang ≡ := , if , then , else , fi , while , do , endwhile , skip 
- funciones especificación ≡ proc ,  pre , post , pred , aux , enum, type, wp
- funciones extendidas ≡ ∑ | sum , ∏ | prod , from , to
- argumentos IO ≡  in , out , inout
- tipos ≡ ℤ , ℝ , Char , Bool , T , seq[], T ⨉ T
- constantes ≡ bool , char, numéricas
- operadores lógicos
- operadores matemáticos
- comentarios ≡ /*  */ , //
- parentesis ≡ ( ) , { } , [ ]
- folding por tabulación

#### snippets : símbolos lógicos y matemáticos

- integer       =>   ℤ
- float         =>   ℝ
- forall        =>   ∀
- exists        =>   ∃
- nexists       =>   ∄
- not           =>   ¬
- product       =>   ∏
- sum           =>   ∑
- y             =>   ∧
- o             =>   ∨
- yluego        =>   ∧L
- oluego        =>   ∨L
- interseccion  =>   ⋂
- union         =>   ⋃
- neq           =>   ≠
- equivalente   =>   ≡
- leq           =>   ≤ 
- geq           =>   ≥
- subconjunto   =>   ⊂
- nsubconjunto  =>   ⊄
- pertenece     =>   ∈
- npertenece    =>   ∉
- iff           =>   ⟺
- implicaR      =>   ⟹
- implicaL      =>   ⟸
- cruz          =>   ⨉
- indefinido    =>   ⊥
- QED           =>   ∎
- subconjunto igual  =>  ⊆ 
- nsubconjunto igual =>  ⊈

#### snippets : regExp

- proc
- pred
- aux
- type
- enum
- if then else
- while do endwhile
- skip 

#### comandos

- SmallLang-Spec: sample file 
- SmallLang-Spec: edit theme 
- SmallLang-Spec: restore theme 
      
## Planes 
- crear un interprete de smallLang
- crear un conversor .slspec a .tex
- implementar un evaluador wp()
