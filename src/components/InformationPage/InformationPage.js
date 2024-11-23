import React from "react";
import { Typography, Box, Button, Paper, Divider } from "@mui/material";
import "./InformationPage.css";
import acessoNegadoImg from './../../assets/acessonegado.png';
import batmanImg from './../../assets/batman.jpg';
import irisImg from './../../assets/iris.jpg';


// A componente InformationPage descreve a aplicação, seu desenvolvimento, e inclui o log de versões, detalhes sobre as ferramentas utilizadas e regras de segurança.

/* 
pagebackground: #000000
containerbackground: #1e1e1e
text: white
primary(for buttons and other stuff):  #4056A1
*/

const InformationPage = () => {
  return (
    <Box sx={{  }}>
      {/* Título principal */}
      <Typography variant="h3" gutterBottom>
        Aplicação de Agenda Pessoal
      </Typography>

      {/* Descrição da aplicação */}
      <Typography variant="h5" paragraph>
        Esta aplicação permite-lhe organizar e visualizar as suas notas e compromissos de forma eficiente.<br /> Através de uma interface simples e intuitiva, pode adicionar, editar e eliminar notas, além de visualizar as notas por data.
      </Typography>

      {/* Release Log */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Registo de Versões
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Versão 1.0:</strong> A versão inicial da aplicação está completa e inclui várias funcionalidades essenciais.
        </Typography>
        <Typography variant="body1" paragraph>
          Foi implementado um calendário com visões mensal e semanal, proporcionando aos utilizadores uma forma eficiente de visualizar os compromissos e as notas de forma organizada e clara.
          A aplicação também permite a gestão completa das notas, incluindo a criação, edição e eliminação das mesmas. <br /> Adicionalmente, oferece funcionalidades de pesquisa, ordenação e filtragem, facilitando a navegação e a localização rápida de informações específicas.
        </Typography>
        <Typography variant="body1" paragraph>
          A seguir, apresentamos algumas melhorias e funcionalidades planeadas para as próximas versões.
        </Typography>
        <ul>
          <li>Adicionar uma opção para exportar as notas (ex.: PDF ou CSV).</li>
          <li>Desenvolvimento para dispositivos móveis.</li>
          <li>Implementação de um light/dark mode</li>
        </ul>
      </Paper>


      {/* Ferramentas utilizadas */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
      <Typography variant="h5" gutterBottom>
        Ferramentas Utilizadas
      </Typography>
      <Typography variant="body1" paragraph>
        A aplicação foi desenvolvida utilizando as seguintes ferramentas:
      </Typography>
      <ul>
        <li><strong>Frontend - React:</strong> React é uma biblioteca JavaScript utilizada para construir interfaces de utilizador interativas e dinâmicas. A sua principal vantagem está na criação de componentes reutilizáveis, o que torna o desenvolvimento de interfaces mais modular e eficiente. React também é conhecido pela sua capacidade de atualização eficiente da interface, utilizando um sistema chamado "Virtual DOM", que minimiza o número de alterações no DOM real, garantindo uma experiência mais rápida e fluida para o utilizador.</li>

        <li><strong>Backend - Firebase:</strong> O Firebase é uma plataforma de backend como serviço (BaaS) que oferece uma gama de funcionalidades, como autenticação de utilizadores, banco de dados em tempo real, e notificações push. Com o Firebase, não é necessário configurar ou manter servidores, o que facilita a construção de aplicações web e móveis. No caso desta aplicação, o Firebase é utilizado para armazenar e gerir as notas, além de fornecer segurança e controlo de acessos através das regras de segurança definidas.</li>

        <li><strong>Base de dados - Firebase:</strong> O Firebase utiliza um banco de dados NoSQL em tempo real, que permite armazenar dados de forma flexível e estruturada. Este tipo de banco de dados é ideal para aplicações que exigem atualizações rápidas e sincrónicas, como o registo e consulta de notas.</li>

        <li><strong>GitHub:</strong> O GitHub é uma plataforma de controlo de versão onde é possível armazenar o código-fonte da aplicação e manter um histórico detalhado das alterações realizadas no código. Com o uso do GitHub, é possível gerir versões de forma organizada, facilitando o acompanhamento de alterações, a reversão de versões anteriores e a documentação do progresso do projeto.</li>

        <li><strong>Electron:</strong> O Electron é uma estrutura que permite criar aplicações de desktop utilizando tecnologias web como HTML, CSS e JavaScript. Com o Electron, é possível empacotar a aplicação web, criando um instalador que facilita a distribuição e execução da aplicação como um software independente, semelhante a uma aplicação nativa de desktop. Esta abordagem proporciona uma experiência de utilização consistente, seja em sistemas Windows, macOS ou Linux, sem a necessidade de reescrever o código para cada plataforma.</li>

      </ul>
      </Paper>

      {/* Firebase - Detalhes de segurança */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Segurança do Firebase
        </Typography>
        <Typography variant="body1" paragraph>
          Para garantir que as notas armazenadas no Firebase estejam seguras e acessíveis apenas por utilizadores autorizados, foi implementada uma camada de segurança baseada numa chave secreta. Esta chave é usada para autenticar as solicitações de acesso aos dados, permitindo que apenas aqueles com o valor correto da chave possam interagir com as notas.
        </Typography>
        <Typography variant="body1" paragraph>
          A chave secreta é armazenada num ficheiro de constantes dentro do código, mas este ficheiro não é incluído no repositório público no GitHub. Isso garante que a chave nunca seja exposta publicamente. Apenas as partes da aplicação que possuam a chave correta poderão aceder aos dados.
        </Typography>
        <Typography variant="body1" paragraph>
          As regras de segurança no Firebase foram configuradas de forma que a verificação da chave aconteça diretamente no lado do Firebase. Ou seja, a leitura e escrita das notas só será permitida se o valor da chave armazenada no Firebase coincidir com a chave definida na aplicação. Caso contrário, o acesso será negado, protegendo os dados da aplicação contra acessos não autorizados.
        </Typography>
        <Typography variant="body1" paragraph>
          Aqui está a estrutura das regras de segurança do Firebase que implementam este mecanismo:
        </Typography>
        <pre>
          <code>
            {`
{
  "rules": {
    "notes": {
      ".read": "root.child('secret').val() === '<secret_key_placeholder>'",
      ".write": "root.child('secret').val() === '<secret_key_placeholder>'"
    },
    "secret": {
      ".read": "true", 
      ".write": "false"
    }
  }
}
      `}
          </code>
        </pre>
        <Typography variant="body1" paragraph>
          Caso a chave secreta não seja correta, o utilizador será informado de "Acesso Negado":
        </Typography>
        <img src={acessoNegadoImg} alt="Acesso Negado" style={{ maxWidth: '40%' }} />
        <Typography variant="body1" paragraph>
        <br/>
          Essa camada adicional de segurança evita que terceiros acessem os dados mesmo que obtenham acesso ao código fonte.
        </Typography>
      </Paper>


      {/* Links */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
      <Typography variant="h5" gutterBottom>
        Links Importantes
      </Typography>
      <Typography variant="body1" paragraph>
        Aceda ao repositório do GitHub e ao Banco de Dados do Firebase através dos seguintes links:
      </Typography>
      <ul>
        <li><a href="https://github.com/TonyTheVice/agenda" target="_blank" rel="noopener noreferrer">GitHub - Repositório</a></li>
        <li><a href="https://console.firebase.google.com/u/0/project/agenda-8640a/database/agenda-8640a-default-rtdb/data" target="_blank" rel="noopener noreferrer">Firebase - Banco de Dados</a></li>
      </ul>
      </Paper>




      <Typography variant="body1" paragraph>
        Se tiver sugestões ou ideias para novas funcionalidades, fique à vontade para entrar em contacto.
      </Typography>

   
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px'}}>
          <img src={irisImg} alt="Cão" style={{ width: '45%', borderRadius: '8px' }} />
          <img src={batmanImg} alt="Gato" style={{ width: '45%', borderRadius: '8px' }} />
        </div>

      {/* Créditos */}
      <Divider sx={{ marginBottom: 2, border: "2px solid #4056A1" }} />
      <Typography variant="body2" align="center" color="white" sx={{marginBottom: "2px"}}>
        Desenvolvido por António Vitorino
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

    </Box>
  );
};

export default InformationPage;
