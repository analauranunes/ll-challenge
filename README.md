Primeiramente, resolvi utilizar do docker-compose e postgreSQL por serem de fácil acesso, possibilitando ter uma aplicação com boa escalabilidade.
Sobre a arquitetura do código, tenho em mente aplicar o padrão REST, visto que a implementação é referente uma construção de API.
Para receber o arquivo a ser processado, escolhi utilizar o Google Sheets, é uma ferramenta gratuita podendo ser utilizada por todos e precisamos simplesmente do id da planilha e que a mesma esteja pública pra acessar os dados.
O Prisma foi implementado para melhor comunicação com o banco de dados PostgreSQL.
