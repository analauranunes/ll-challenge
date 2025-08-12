### Sobre o projeto

Primeiramente, resolvi utilizar do docker-compose e postgreSQL por serem de fácil acesso, possibilitando ter uma aplicação com boa escalabilidade.
Sobre a arquitetura do código, tenho em mente aplicar o padrão REST, visto que a implementação é referente uma construção de API.
Para receber o arquivo a ser processado, escolhi utilizar o Google Sheets, é uma ferramenta gratuita podendo ser utilizada por todos e precisamos simplesmente do id da planilha pra passar na rota e que a mesma esteja pública pra acessar os dados.
O Prisma foi implementado para melhor comunicação com o banco de dados PostgreSQL.

### Para rodar o projeto

Ao fazer um clone do repositório, é importante lembrar de rodar o comando para ter todos os módulos do projeto instalado:

```
  npm install ou yarn
```

Ao rodar o comando do docker, precisamos instalar cliente do prisma:

```
  docker compose up
```

```
  npx prisma generate ou yarn prisma generate
```

Agora, pra acessarmos a aplicação de fato:

```
  npm run dev ou yarn dev
```

Para poder rodar os testes do projeto:

```
  npm test ou yarn test
```

### Rotas do projeto

```
  /orders/sheet?id=1Nzb5LzUWeQAoqTJZUdsGoks03Se9N4QTvfrRD_LD6FY
```

Essa rota recebe o id do google sheets pra podermos retornar os dados dos pedidos formatados como queremos. Deixamos salvo no nosso banco todos os pedidos, assim conseguimos fazer buscas com nosso filtro.

```
  /orders?filterBy=PERIOD&start=2023-12-08&end=2023-12-10
```

Com essa rota get, conseguimos acessar todos os pedidos já existentes no banco e com o JSON de retorno formatado. Também conseguimos utilizar os filtros, sendo eles: ALL | PERIOD | ORDER_ID. O filtro PERIOD necessita das datas de "start" e "end". Já o ORDER_ID precisa receber o id do pedido.
