Credenly é uma aplicação completa voltada para autenticação de usuários, oferecendo um sistema robusto de login e registro. O projeto foi concebido como uma forma prática de aplicar minhas habilidades de programação, abordando problemas reais e desenvolvendo soluções que fazem parte do dia a dia em aplicações modernas.

A principal funcionalidade do Credenly é o cadastramento de novos usuários, utilizando formulários cuidadosamente projetados e validados para garantir segurança e eficiência. Além disso, a aplicação permite atualizar informações de usuários previamente registrados, atendendo cenários comuns em sistemas de autenticação e gerenciamento de perfis.

O foco do projeto está em criar formulários intuitivos e seguros, fundamentais para aplicações que exigem alto padrão de qualidade na experiência do usuário.

### FORMULÁRIOS PRINCIPAIS

<hr />

1. Formulário da Página Home

A página inicial é dedicada ao registro de novos usuários e ao login de usuários existentes, por meio de dois formulários principais:

* Formulário de Cadastro: Inclui campos para nome, sobrenome, e-mail e senha, assegurando a coleta de informações essenciais para o registro.
* Formulário de Login: Simplificado, contém apenas os campos de e-mail e senha, permitindo que usuários já registrados acessem a aplicação de forma rápida e prática.

2. Formulário para Confirmação de E-mail

Após o cadastro, o usuário é direcionado para uma página de verificação, onde insere o código enviado ao seu e-mail. Esse processo é automatizado com o uso da biblioteca Nodemailer, que gera e envia um código de seis dígitos com validade de 15 minutos.

No lado do cliente, o código é verificado para confirmar sua validade e, caso esteja correto, o status de verificação do e-mail é atualizado. A verificação não é obrigatória, mas oferece uma camada adicional de segurança. Se ignorada, a aplicação exibe um aviso persistente de "e-mail não confirmado," que só desaparece após a conclusão da verificação.

3. Formulário para Cadastro de Número de Telefone

O cadastro de número de telefone foi incluído para alinhar a aplicação às práticas modernas de autenticação. Embora a verificação de telefone ainda não esteja implementada, essa funcionalidade está prevista para futuras atualizações, com o objetivo de tornar o sistema mais robusto. Assim como a verificação de e-mail, o registro do número de telefone é opcional e pode ser ignorado, mas permanece disponível para quem deseja enriquecer seu perfil.

4. Formulário para Cadastro de Endereço

O formulário de cadastro de endereço foi projetado para oferecer uma experiência prática e eficiente ao usuário. Além das validações, o formulário conta com um sistema de preenchimento automático dos campos, baseado no CEP fornecido pelo usuário. Essa funcionalidade foi implementada utilizando a biblioteca Axios para consumir a API ViaCEP, permitindo que, ao digitar o CEP, informações como bairro, cidade e estado sejam automaticamente preenchidas.

Embora o registro de endereço não seja obrigatório, ele está disponível para usuários que desejam complementar seu perfil com mais informações.

<hr />

Após concluir todas as etapas, o usuário é redirecionado para uma página onde pode visualizar todos os dados cadastrados. Caso deseje, ele pode atualizar qualquer informação diretamente nessa mesma página. Para facilitar a experiência, os dados que não foram preenchidos durante as etapas anteriores são destacados em amarelo, sinalizando claramente as informações ausentes. Essa abordagem intuitiva permite que o usuário complete ou ajuste seus dados de maneira prática, sem a necessidade de navegar por diferentes telas.

Para enriquecer a experiência do usuário e coletar feedback, foi adicionado um formulário extra nessa página. Nele, o usuário pode deixar uma avaliação, incluindo um comentário e uma nota de 1 a 5, representada por ícones de estrelas. Essas avaliações são exibidas em um banner lateral visível nas páginas de cadastro de dados, permitindo que outros usuários vejam as opiniões sobre a aplicação.

Além de fornecer transparência, esse sistema de avaliação contribui para melhorias contínuas na aplicação, guiadas pelas sugestões e experiências compartilhadas pelos usuários.

### TECNOLOGIAS UTILIZADAS

<hr />

Optei por utilizar Next.js como framework principal, pois ele permite combinar componentes do lado do cliente e do servidor em um único projeto. Essa abordagem facilita o desenvolvimento, manutenção e futuras melhorias, além de oferecer recursos nativos como renderização híbrida, que otimiza a performance e a experiência do usuário.

Para garantir uma base sólida e segura, utilizei TypeScript, que adiciona tipagem estática ao código.

Na validação dos formulários, implementei a biblioteca React Hook Form, que proporcionou um gerenciamento eficiente e organizado. Essa ferramenta permitiu configurar validações robustas com simplicidade, mantendo o código limpo e alinhado às melhores práticas de desenvolvimento.

Para o gerenciamento da base de dados, utilizei PostgreSQL, hospedado em um banco de dados gratuito oferecido pelo Supabase. Isso garantiu uma solução com escalabilidade suficiente para atender às necessidades da aplicação.

Para simplificar a comunicação com o banco de dados, integrei o Prisma, uma ferramenta ORM (Object-Relational Mapping) moderna. O Prisma facilitou a criação, manutenção e manipulação das tabelas, permitindo escrever consultas de forma eficiente e segura, além de integrar perfeitamente com TypeScript, reforçando a tipagem e reduzindo possíveis erros durante o desenvolvimento.

A aplicação possui um sistema completo de autenticação de login, desenvolvido com o uso de NextAuth. Essa biblioteca permitiu implementar a autenticação de forma segura e eficiente, integrando perfeitamente com o ecossistema do Next.js.

Com o NextAuth, usuários previamente cadastrados podem realizar login e acessar seu perfil, incluindo todos os dados registrados. A biblioteca simplificou a gestão de sessões e credenciais, garantindo que a experiência do usuário seja fluida e protegida.

Para a estilização da interface, optei pelo uso do Tailwind CSS, uma biblioteca com a qual já possuo familiaridade. O Tailwind CSS foi fundamental para acelerar o desenvolvimento, permitindo a criação de uma interface responsiva e moderna diretamente nos componentes, sem a necessidade de escrever arquivos CSS extensos. Essa abordagem facilitou a manutenção e a personalização do design ao longo do projeto. Além disso, para garantir consistência e organização no uso das classes do Tailwind, utilizei o prettier-plugin-tailwindcss, que reordena automaticamente as classes conforme as melhores práticas da biblioteca.
