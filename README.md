# PokeClima

Uma aplicação Angular que exibe informações meteorológicas usando a API OpenWeather e PokeAPI.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js
- Angular CLI
- Chave API do OpenWeather

## Instalação

Siga os passos abaixo para configurar e executar a aplicação localmente:

1. **Clone o repositório:**

   Abra o terminal e execute o seguinte comando para clonar o repositório:

   ```bash
   git clone https://github.com/volinha/desafio-frontend-2024
   ```

2. **Instale as dependências:**

   Navegue até o diretório do projeto e execute o comando abaixo para instalar as dependências necessárias:

   ```bash
   npm install
   ```

3. **Configure sua chave API do OpenWeather:**

   Crie um arquivo `src/app/environment/environment.ts` e adicione sua chave API:

   ```typescript
   export const environment = {
     production: false,
     openWeatherApiKey: 'SUA_CHAVE_AQUI',
   };
   ```

## Executando a aplicação

Para iniciar o servidor de desenvolvimento e visualizar a aplicação, execute o seguinte comando:


```bash
ng serve
```


Após a execução, abra o navegador e acesse `http://localhost:4200/` para visualizar a aplicação.

## Utilizando a Aplicação

1. **Pesquisar por uma cidade:**

   - No campo de entrada, digite o nome da cidade que deseja consultar e pressione "Enter" ou clique no botão com a imagem de uma Pokébola.
   - A aplicação exibirá as informações meteorológicas da cidade, incluindo temperatura e condições climáticas.

2. **Interação com Pokémon:**

   - Com base nas condições climáticas, um Pokémon será exibido na tela.
   - A aplicação ajusta o tipo de Pokémon de acordo com a temperatura e se está chovendo ou não.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
