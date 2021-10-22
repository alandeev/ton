# **TON API**

API do TON.

O objetivo é mostrar uma API com uma arquitetura desacoplada, utilizando TDD como metodologia de trabalho, Clean Architecture para a distribuição de responsabilidades em camadas, sempre seguindo os princípios do SOLID.
<br /><br />


> ## APIs construídas no desafio

1. [Cadastro de uma Conta] /account ( É necessário estar autenticado, para criar uma nova conta pode se logar como adminitrador, igual o exemplo da documentação do swagger )
2. [Login] /login ( Não é necessário estar autenticado )
3. [Listagem de uma conta] /account/:id ( É necessário estar autenticado )
4. [Atualização de uma conta] /account/:id ( É necessário estar autenticado )
5. [Exclusão de uma conta] /account/:id ( É necessário estar autenticado )
6. [Listagem da quantidade de acessos no site do TON] /find-amount-access ( É necessário estar autenticado )
7. [Incremento da quantidade de acessos no site do TON] /increment-amount-access ( É necessário estar autenticado )
8. [Documentação com Swagger] /api-docs ( Não é necessário estar autenticado )
9. [Rotas de Permissionamento para a segurança] /permission-group ( É necessário estar autenticado )


> ## Ponderações Importantes
 * Visando a segurança e um sistema resiliente foi implementado autenticação e permissionamento
 * Para agilidade e melhor aproveitamento o account entity conta com um filter e um group, capaz de filtrar e ordenar os dados vindos do banco de dados.
 * A implementação da aws ficaria na camada de infra, comprovando o quanto é eficiente uma arquitetura desacoplada, as funções serverless do lambda ficariam no repository da camada.
 * Seria interessante rodar um workflow do github para a pipeline de deploy da aws

> ## Testes

* Testes Unitários
* Testes de Integração (API Rest)
* Cobertura de Testes
* Mocks
* Stubs
* Fakes
> ## Princípios e Patterns

* Single Responsibility Principle (SRP)
* Open Closed Principle (OCP)
* Liskov Substitution Principle (LSP)
* Interface Segregation Principle (ISP)
* Dependency Inversion Principle (DIP)
* Separation of Concerns (SOC)
* Don't Repeat Yourself (DRY)
* You Aren't Gonna Need It (YAGNI)
* Keep It Simple, Silly (KISS)

* Factory
* Adapter
* Composite
* Decorator
* Proxy
* Dependency Injection
* Abstract Server
* Composition Root
* Builder
* Singleton
> ## Node Js

* Documentação de API com Swagger
* API Rest com Express
* Segurança (Hashing, Encryption e Encoding)
* CORS
* Middlewares
* Nível de Acesso nas Rotas (Admin)

> ## Typescript

* POO Avançado
* Interface
* TypeAlias
* Namespace
* Utility Types
* Modularização de Paths
* Configurações
* Build

> ## PostgreSQL

* connect
* create
* save
* getOne
* delete
* update
* Aggregation (Group e Sort)

## Como executar o banco de dados
```bash
Instalar o Potgres
Iniciar uma nova conexão ( Port: 5433 )
$ create database ton
```
## Como executar o servidor 

```bash
git clone https://github.com/GustavoNoronha0/ton
$ cd ton
$ yarn 
$ yarn typeorm migration:run
$ yarn dev:server
```

