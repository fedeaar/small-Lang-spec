# === Change Log === #

## [0.0.1] - 2021-09-12 initial release 
highlighting para SmallLang (como aparece en David Gries: Science of Programming - 1981) y la notación para especificación de Algoritmos y Estructuras de Datos I (UBA).

### added ###
<grammar y highlighting>

- keywords.SmallLang                >   := , if , then , else , fi , while , do , endwhile , skip 
- keywords.especificacion           >   proc ,  pre , post , pred , aux , enum, type, wp
- keywords.especificacion.IO        >   in , out , inout
- keywords.especificacion.types     >   ℤ , ℝ , Char , Bool , T , seq[<type>]
- keywords.otros                    >   true , false , ∑ , ∏ , from , to
- logicalConnectors                 >   ∧L , ∨L , ∧ , ∨ , ⟹L , ⟹ , ⟺ , ≡
- comentarios                       >   /*  */
- parentesis                        >   ( ) , { } , [ ]
- type.char                         >   " "
- type.boolen (sin highlighting)
- type.number (sin highlighting)
- folding por tabulación

<snippets : símbolos lógicos y matemáticos> 

- integer       >   ℤ
- float         >   ℝ
- forall        >   ∀
- exists        >   ∃
- nexists       >   ∄
- not           >   ¬
- product       >   ∏
- sum           >   ∑
- y             >   ∧
- o             >   ∨
- yluego        >   ∧L
- oluego        >   ∨L
- interseccion  >   ⋂
- union         >   ⋃
- neq           >   ≠
- equivalente   >   ≡
- leq           >   ≤ 
- geq           >   ≥
- subconjunto   >   ⊂
- nsubconjunto  >   ⊄
- pertenece     >   ∈
- npertenece    >   ∉
- iff           >   ⟺
- implicaR      >   ⟹
- implicaL      >   ⟸
- cruz          >   ⨉
- indefinido    >   ⊥
- QED           >   ∎
- subconjunto igual  >  ⊆ 
- nsubconjunto igual >  ⊈

<snippets : regExp>

- proc
- pred
- aux
- type
- enum
- if then else
- while do endwhile
- skip 

<comandos>

- SmallLang-Spec < sample file >
- SmallLang-Spec < edit theme >
- SmallLang-Spec < restore theme >
      
    