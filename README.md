### Instalação

Instalar `node` e `npm` utilize os comandos abaixo:
```
sudo apt install nodejs 
sudo apt install npm
```
Clone o repositório na pasta de sua preferência:
```
git clone https://github.com/edineia-goncalves/grupo-acert.git
```
Instale as dependências utilizando o comando abaixo:
```
npm install
``` 
### Desenvolvimento

Para rodar o projeto em modo de desenvolvimento utilize `npm start` na porta [http://localhost:3000](http://localhost:3000) do seu browser.

### VS Code settings

Sugiro a instalação do [settings sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) para sincronizar todas as extensões que foram utilizadas no desenvolvimento do projeto

Após instalar, na página inicial terá opção para logar com sua conta no GitHub abra a barra de comandos ou
` Ctrl+Shift+P ` e  digite ` sync ` para mostrar todas as opções e selecione 
` Sync: Update / Upload Settings ` e por último ` Sync: Share Settings with public GIST ` para sincronizar e utilizar a url: 
[https://gist.github.com/edineia-goncalves/c6b769e91cbc2e77efc5dad59fd4dc21](https://gist.github.com/edineia-goncalves/c6b769e91cbc2e77efc5dad59fd4dc21)

### Funcionalidades

- Login de novos usuários com e-mail e senha
- Login de usuários existentes com e-mail e senha
- Login de usuários existentes com Google
- Recuperação de senha por e-mail
- Persistência do estado do Auth  por sessão: Indica que o estado será mantido somente na sessão ou guia atual
- Logout
- Busca por artistas
- Busca por álbuns dos artistas
- Salvar resultados de pesquisa de álbuns e artistas do usuário logado
- Consultar resultado de histórico das pesquisas de álbuns e artistas do usuário logado
