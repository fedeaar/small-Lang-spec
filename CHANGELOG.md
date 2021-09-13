# === Change Log === #

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
