# **TON API**

API feita para o desafio técnico do TON.

O é mostrar uma API com uma arquitetura desacoplada, utilizando TDD como metodologia de trabalho, Clean Architecture para a distribuição de responsabilidades em camadas, sempre seguindo os princípios do SOLID.
<br /><br />


> ## APIs construídas no desafio

1. [Cadastro de uma Conta] /login
2. [Login] /account
3. [Listagem de uma conta] /account/:id
4. [Atualização de uma conta] /account/:id
5. [Exclusão de uma conta] /account/:id
6. [Listagem da quantidade de acessos no site do TON] /find-amount-access
7. [Incremento da quantidade de acessos no site do TON] /increment-amount-access
8. [Documentação com Swagger] /api-docs 
9. [Rotas de Permissionamento para a segurança] /permission-group


> ## Ponderações
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