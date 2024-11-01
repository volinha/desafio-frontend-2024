# Aplicação de Previsão do Tempo

Uma aplicação Angular que exibe informações meteorológicas usando a API OpenWeather.

## Pré-requisitos

- Node.js
- Angular CLI
- Chave API do OpenWeather

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/volinha/desafio-frontend-2024
```


2. Instale as dependências:

```bash
npm install
```

3. Configure sua chave API do OpenWeather em `src/app/environment/environment.ts`

## Executando a aplicação

Inicie o servidor de desenvolvimento:

```bash
ng serve
```

## Configuração da API

Para configurar sua chave API, crie um arquivo `environment/environment.ts`:

```typescript
export const environment = {
  production: false,
  openWeatherApiKey: 'SUA_CHAVE_AQUI',
};

```

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
