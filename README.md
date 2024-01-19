# App

GymPass style app

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário;
- [ ] Deve ser possível o usuario obter seu histórico de check-ins;
- [ ] Deve ser possível o usuario buscar academias próximas;
- [ ] Deve ser possível o usuario buscar academias pelo nome;
- [ ] Deve ser possível o usuario realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

# RNs (Regras de negócio)

- [ ] O usuário não pode se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer dois check-ins do mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver a 100 metros da academia;
- [ ] O check-in só pode ser validado até 20 minutos criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastradada por administradores;

# RNFs (Requisitos não funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisão estar persistidos em um bando PostGreSQL;
- [ ] Todas listas de dados precisam  estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (Json Web Token);