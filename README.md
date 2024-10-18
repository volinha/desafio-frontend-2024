# Desafio Pokémon para Desenvolvedores

## Definições

- **Leia todo o conteúdo antes de iniciar e busque entender de fato o desafio proposto;**
- Utilizar o angular na versão 12 ou superior.
- Não se trata de um desafio complexo, apesar da leitura ser extensa;
- O desafio baseia-se em consumir 2 APIs de diferentes fontes de dados com intuito de agregar as informações e solucionar o problema de acordo com o que foi proposto;

## O Desafio

E se os pokémons fossem reais, em que lugares de mundo poderíamos encontrar cada tipo?

Eles se dividiram de acordo com o clima do nosso planeta, por exemplo, em lugares quentes poderíamos encontrar pokémons de fogo.

O objetivo é criar uma aplicação web seguindo os seguintes critérios:

- Em uma tela deve ser possível informar uma cidade de qualquer lugar do mundo;
- De acordo com as condições climáticas desta cidade deve-se exibir um Pokémon baseado em seu tipo (fogo, água, elétrico, etc) seguindo as seguintes regras:
  - Lugares onde a temperatura for menor **(<) que 5ºC**, deve-se retornar um pokémon de **gelo (ice)**.
  - Lugares onde a temperatura estiver entre **(>=) 5ºC e (<) 10ºC**, deve-se retornar um pokémon do tipo **água (water)**.
  - Lugares onde a temperatura estiver entre **(>=) 12ºC e (<) 15ºC**, deve-se retornar um pokémon do tipo **grama (grass)**.
  - Lugares onde a temperatura estiver entre **(>=) 15ºC e (<) 21ºC**, deve-se retornar um pokémon do tipo **terra (ground)**.
  - Lugares onde a temperatura estiver entre **(>=) 23ºC e (<) 27ºC**, deve-se retornar um pokémon do tipo **inseto (bug)**.
  - Lugares onde a temperatura estiver entre **(>=) 27ºC e 33ºC inclusive**, deve-se retornar um pokémon do tipo **pedra (rock)**.
  - Lugares onde a temperatura for **maior que 33ºC**, deve-se retornar um pokémon do tipo **fogo (fire)**.
  - **Para qualquer outra temperatura**, deve-se retornar um pokémon do tipo **normal**.
  - E, no caso em que **esteja chovendo na região** um pokémon **elétrico (electric)** deve ser retornado, independente da temperatura.
- O pokémon mostrado deve ser aleatório e não deve aparecer duas vezes consecutivas;
- Após a consulta deve-se exibir na tela:
  - Temperatura atual da cidade em graus Celcius;
  - Se está chovendo ou não;
  - Nome do Pokémon seguindo as regras acima.

## Orientações

- Para consultas de condições climáticas utilize a API [OpenWeatherMap](https://openweathermap.org/api);
- Para consultas de Pokémons utilize a API [PokéAPI](https://pokeapi.co/docs/v2).

### Passo 1 - Configurando o OpenweatherMap

- Acesse o link da plataforma em https://openweathermap.org/;
- No topo da página procure e clique no botão de "Sign In";
- Clique no link "Create an Account";
- Entre com as suas credenciais e crie um novo acesso, para que possa gerar um `APPID`, na plataforma;
- Quanto estiver logado entre na URL https://home.openweathermap.org/api_keys;
- Visualize um pequeno formulário chamado "Create Key";
- No input "API key name", coloque o nome que achar mais conveniente, por exemplo: "Default";
- Em seguida clique no botão "Generate";
- Ao lado do formulário uma "Key" (chave), será gerada com o nome que você informou no passo anterior, essa chave é o que a plataforma chama de `APPID` e será utilizada ao realizarmos as requisições Rest para as API(s) da plataforma.

### Passo 2 - API do PokeAPI

A plataforma PokéAPI não exige token de autenticação o que torna sua utilização bem mais simples, então acesse o link https://pokeapi.co/

- Logo na página inicial é possível testar a API, basta seguir os exemplos clicando nos links abaixo do input de submit, por exemplo **"/type/3/"**;
- A API que nos interessa nesse caso é exatamente a de tipo, porém ao invés de passar um valor numérico iremos passar o nome do tipo como parâmetro, como pode ser visto na documentação: https://pokeapi.co/docs/v2.html/#types

## Informações Adicionais

- Uma breve documentação com os passos para executar a aplicação deve ser elaborada; **(requisito obrigatório)**
- Qualquer coisa adicionada como extra por parte do desenvolvedor, por exemplo exibir a imagem do pokémon na tela, será contabilizada como ponto extra, desde que os outros requisitos estejam 100% funcionais; **(não é um requisito obrigatório)**

## O que será avaliado

- Seu domínio com o framework
- Organização
- Coesão e design de código
- Lógica
- Preocupação com o resultado final
- Documentação
- Tratamentos de erro

## Dicas

> Para qualquer desenvolvedor independente de seu conhecimento técnico saber entender a documentação das ferramentas, plataformas, frameworks, etc, é um requisito básico, então sempre dê uma passadinha na área de documentação, mesmo que já tenha utilizado determinada ferramenta, as coisas sempre podem mudar e novas podem surgir.
