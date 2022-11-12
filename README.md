# Exemplo API LISTA DE TAREFAS
> _a.k.a.: Todo list_

Esse repositório foi feito seguindo as direções do exercício proposto para a turma 78 de Web Development da Ironhack SP.

Para ver o exercício proposto clique aqui: [Self-guided - Lista de Tarefas](https://gist.github.com/D-Kunrath/a8e8636cdd0baa3d84cb5e990b10c3ea).

## Dependências

Para utilizar esse repositório basta clonar e seguir os seguintes passos:

1. Criar o arquivo `.env`, nele deve-se ter as seguintes variáveis:
```.env
PORT=<port, opcional>
MONGO_URI=<link para o banco de dados>
JWT_SECRET=<sua senha>
```
O `PORT` é opcional, pois tem uma redundância que cai para a porta `5000`

2. Instalar as dependências:
```shell
npm i
```

3. Executar o servidor:
Caso vc tenha o nodemon instalado pode usar o _script_ `dev`, caso contrário use o _script_ `start`
```shell
npm start
# OU
npm run dev
```

## Endpoints
Rotas públicas:
| method | endpoint | body | response | action |
| --- | --- | --- | --- | --- |
| POST | /auth/signup | { username, password } | n/a | cadastra um novo usuário |
| POST | /auth/login | { username, password } | { token } | verifica informações de cadastro e devolve um JWT |

Rotas privadas, que necessitam de um _JWT_ válido no _header_ da requisição:
| method | endpoint | body | response | action |
| --- | --- | --- | --- | --- |
| GET | /auth/verify | n/a | { _id, username }, | Valida o token do Header e retorna informações do usuário. |
| GET | /api?done=yes | n/a | [ { _id, description, done } ] | Retorna um array com as tarefas do usuário. [*] |
| POST | /api | { description } | { _id, description, userId }, | Cria uma tarefa não resolvida, atrelada ao usuário. |
| PUT | /api/edit/:todoId | { description } | { message } | Edita a descrição de uma tarefa |
| put | /api/done/:todoId | { done } | { _id, description, userId }, | Marca a tarefa como completa ou não, dependendo do que vier no body. |
| delete | /api/:todoId | n/a | n/a | Apaga tarefa do usuário. |

[*]: Sem query, retorna todas as tarefas criadas pelo próprio usuário. Com query "done=yes" retorna um array com as tarefas marcadas como completas. Qualquer outro valor diferente de "yes", retorna um array apenas com as tarefas não completas.
