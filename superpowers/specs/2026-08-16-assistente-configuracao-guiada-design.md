# Assistente com configuração guiada

## Decisão

A configuração principal do Assistente deixa de ser um editor de fluxo. O
cliente não precisa entender etapas, condições, branches, fallback ou handoff.
Ele descreve a própria operação por meio de escolhas simples; a Arara traduz
essas escolhas para o fluxo técnico existente.

O editor detalhado continua disponível em `Configurações avançadas`, fora do
caminho principal. Ele não aparece durante a primeira ativação.

Esta especificação substitui
`2026-08-16-assistente-chatbot-prototype-design.md` onde houver conflito. A
especificação anterior continua válida somente para o editor técnico acessado
em `Configurações avançadas`.

## Resultado esperado

Uma pessoa deve conseguir preparar a primeira rotina antes mesmo de conectar o
WhatsApp e sem conhecer chatbots. O caminho principal tem quatro passos e
termina com uma conversa de teste:

1. escolher `Suporte`, `Cobrança` ou `Agendamento`;
2. escolher entre responder e resolver ou somente organizar e chamar o time;
3. indicar quando e para quem pedir ajuda;
4. testar como cliente e publicar uma rotina de teste.

O onboarding já escolhe uma primeira rotina. Quando o usuário chega por esse
caminho, a receita é preservada e o Assistente abre no passo 2. Convites feitos
no onboarding alimentam a lista de pessoas, mas não criam fila nem horário. O
proprietário da conta é o destino padrão e o horário é perguntado se estiver
ausente.

## Entrada do Assistente

### Sem rotina publicada

A tela abre diretamente no primeiro passo. Não há dashboard vazio, canvas,
lista de etapas ou abas técnicas. O título é `o que você quer colocar para
funcionar primeiro?` e apresenta três linhas:

- `Suporte`: entender o problema, tentar resolver e chamar o time;
- `Cobrança`: enviar segunda via ou Pix e encaminhar negociação;
- `Agendamento`: consultar horário, confirmar e lembrar o cliente.

Cada linha explica o resultado em uma frase. Uma única rotina é escolhida para
a primeira ativação. As outras podem ser adicionadas depois.

Quando a entrada vem de `Automações`, a receita clicada já vem selecionada. Se
ela estiver publicada, abre a visão resumida; se ainda não estiver, abre o
passo 2. O estado `Ativa` não participa dessa decisão de navegação.

### Com rotina publicada

O Assistente abre em uma visão resumida da operação, não no editor técnico. A
tela mostra:

- o estado da rotina;
- o que a Arara resolve;
- quando chama o time;
- quem recebe;
- a ação `Testar como cliente`;
- a ação `Ajustar atendimento`;
- o acesso secundário `Configurações avançadas`;
- a ação secundária `Adicionar outra rotina`.

O resumo usa frases de operação. Exemplo: `A Arara acolhe pedidos de suporte,
tenta a primeira resolução e chama a fila de suporte quando não resolve.`

Sem WhatsApp conectado, o estado é `Pronta para conectar` e a rotina não afirma
estar atendendo. Com canal conectado, o estado é `Ativa`. `Conectar WhatsApp` é
a ação principal do primeiro estado.

## Fluxo guiado

### Passo 1: escolher uma rotina

O usuário seleciona uma das três receitas. A seleção altera o texto do botão:
`Continuar com Suporte`, `Continuar com Cobrança` ou `Continuar com
Agendamento`.

Não há configuração de múltiplas rotinas nesse momento. Isso evita que a pessoa
tenha de modelar toda a operação antes de perceber valor.

`Adicionar outra rotina`, na visão ativa, reabre o passo 1 mostrando somente as
receitas ainda não configuradas. O retorno a `Automações` preserva a rotina de
origem.

### Passo 2: confirmar o que a Arara faz

A receita já vem pronta. Primeiro, a tela faz uma única escolha de autonomia:

- `Responder e tentar resolver`: usa regras e, quando autorizado, IA e
  conhecimento conectado;
- `Só organizar e chamar meu time`: acolhe, classifica, coleta dados e
  transfere sem tentar resolver.

Depois, apresenta de duas a quatro capacidades em linguagem concreta. O usuário
apenas confirma ou desmarca. Recursos que dependem de IA ficam desligados no
segundo modo.

#### Suporte

- acolher e identificar o problema;
- usar o conhecimento conectado para orientar, quando autorizado;
- coletar os dados necessários antes de chamar alguém.

#### Cobrança

- identificar cliente e cobrança em aberto;
- enviar segunda via ou Pix quando a integração permitir;
- confirmar pagamento ou encaminhar divergência;
- enviar lembrete proativo de vencimento, desligado por padrão.

#### Agendamento

- entender serviço, região e preferência de horário;
- oferecer horários disponíveis quando houver agenda conectada;
- confirmar o cliente;
- enviar lembrete proativo do compromisso, desligado por padrão.

As três receitas recebem mensagens inbound. Lembretes são outbound, aparecem
separados como `Enviar lembretes`, começam desligados e explicam que exigem
consentimento, template aprovado e canal conectado. Disparo amplo de campanhas
continua em `Campanhas` e não entra neste assistente.

Se uma capacidade depender de integração ausente, ela começa desmarcada e
aparece como `Conectar para usar`, não como opção quebrada. O usuário pode
testá-la com dados simulados. Sem a integração, a rotina ainda pode ser
publicada em modo de triagem e handoff. O fluxo inteiro só é bloqueado quando
não existe nenhum caminho executável nem destino humano.

### Passo 3: definir a ajuda humana

A tela pergunta `quando a Arara deve chamar seu time?`. As condições vêm
preenchidas conforme a receita.

Condições comuns:

- quando o cliente pedir uma pessoa;
- quando a Arara não conseguir resolver;
- no Suporte, quando o diagnóstico inicial não resolver;
- na Cobrança, quando houver negociação, contestação ou pagamento não localizado;
- no Agendamento, quando não houver horário ou existir uma exceção.

O pedido explícito por uma pessoa sempre transfere, independentemente das outras
condições.

Depois, a tela pergunta `quem recebe?`. Se já existir uma equipe ou fila, ela
vem selecionada. Em conta solo, o destino é `Você`. Se houver pessoas
convidadas, mas nenhuma fila, o padrão é `Fila geral`. O horário aparece na
mesma frase: `Fila de suporte, de segunda a sexta, das 8h às 18h`. Quando não
existe horário salvo, a pergunta é obrigatória neste passo.

O comportamento fora do horário é explícito: a Arara acolhe, coleta contexto e
avisa quando o time retorna. A interface não promete atendimento humano 24/7.

### Passo 4: testar e publicar

O usuário assume o papel de cliente em uma simulação. A conversa mostra somente
o comportamento resultante:

- acolhimento;
- resposta ou ação da receita;
- transferência com resumo, quando necessária.

O teste não mostra nomes de etapas nem detalhes do motor. A simulação termina em
uma prévia embutida do Inbox dentro do mesmo passo, com a conversa na fila e o
resumo que o atendente receberia. O usuário não navega para fora antes de
publicar. Ao final, a tela resume em três frases o que acontecerá e oferece
`Publicar rotina de teste`.

No protótipo, a publicação é simulada e isso aparece no feedback. Depois da
publicação, `Ver conversa no Inbox` abre a mesma conversa demonstrada no teste.
`Conectar WhatsApp` é uma ação separada, apresentada depois da prova de valor, e
não é simulada como conexão real. Uma capacidade sem integração permanece
desmarcada; o usuário volta ao passo 2 somente se tentar ligá-la sem conectar a
fonte.

## Ajustes depois da publicação

`Ajustar atendimento` reabre o mesmo fluxo guiado com os valores atuais. A
pessoa altera uma decisão por vez e testa novamente antes de publicar. Quando o
canal está conectado, a versão ativa continua atendendo enquanto existe um
rascunho. Sem canal, a versão publicada permanece `Pronta para conectar`.
Somente uma nova publicação substitui a configuração publicada.

Configurações secundárias ficam fora do caminho inicial:

- nome e forma de apresentação;
- fontes de conhecimento;
- tom de voz;
- regras detalhadas;
- editor técnico do fluxo.

Esses itens são acessados por links contextuais ou por `Configurações
avançadas`. Não são quatro abas competindo com a ativação principal.

## Estados

### Carregando

O passo mantém título e estrutura enquanto os dados preenchidos são carregados.
Não troca toda a tela por um spinner central.

### Integração ausente

A capacidade afetada fica desmarcada, explica o que falta e oferece `Conectar`.
O restante da receita continua configurável e publicável em modo de triagem e
handoff. Nenhum progresso é apagado.

### Erro ao salvar ou publicar

O rascunho é preservado. O erro aparece junto da ação e oferece tentar
novamente. A tela informa qual decisão não foi salva.

### Retorno ao fluxo

Ao voltar, o usuário continua do último passo incompleto. Uma rotina já
publicada nunca volta para o primeiro passo sem uma ação explícita de ajuste,
esteja `Pronta para conectar` ou `Ativa`.

### Rascunho sobre rotina publicada

A visão resumida mostra `alterações não publicadas`. A versão ativa permanece
identificada e executando somente quando existe canal conectado. Sem canal, a
versão publicada permanece identificada como `Pronta para conectar`.
`Descartar alterações` restaura os valores publicados; `Testar mudanças` usa
somente o rascunho na simulação.

## Linguagem visual

- tema claro e shell existente da Arara;
- uma pergunta principal por tela;
- no máximo uma ação primária por passo;
- escolhas em linhas separadas por fios de 1 px, não em cards decorativos;
- Geist e Geist Mono;
- teal apenas para seleção, voz da Arara e progresso;
- hierarquia por tipografia e espaço;
- sem canvas, grafo, canvas pontilhado, gradiente, badges de IA ou ilustração
  genérica;
- progressão discreta `passo 1 de 4`, sem barra gamificada.

## Responsividade e acessibilidade

- desktop: navegação lateral e uma coluna editorial central;
- celular: navegação compacta e a mesma pergunta em coluna única;
- nenhuma etapa depende de hover;
- opções são botões com estado pressionado;
- controles têm rótulo visível;
- foco segue a ordem da leitura;
- sem scroll horizontal;
- mensagens de erro usam região de alerta e permanecem junto da ação.

## Critérios de aceite do protótipo

- `Assistente` abre no fluxo guiado quando não há rotina publicada;
- o usuário escolhe Suporte, Cobrança ou Agendamento sem ver conceitos técnicos;
- os quatro passos funcionam e preservam as escolhas ao avançar e voltar;
- entrada pelo onboarding preserva a receita e abre no passo 2;
- fixture com conta solo usa `Você` como destino e pede o horário ausente;
- fixture com convidados e sem fila usa `Fila geral`;
- o passo 2 oferece os modos `Responder e tentar resolver` e `Só organizar e
  chamar meu time`;
- lembretes outbound começam desligados e mostram seus pré-requisitos;
- integrações ausentes têm tratamento explícito;
- fixture sem integração publica triagem e handoff com a ação dependente
  desmarcada;
- o teste mostra uma conversa completa e uma prévia embutida do Inbox com
  handoff e resumo;
- `Publicar rotina de teste` leva à visão resumida `Pronta para conectar` sem
  canal e `Ativa` com canal;
- `Ver conversa no Inbox` abre a conversa demonstrada somente depois da
  publicação;
- `Ajustar atendimento` retorna ao fluxo guiado;
- fixture com canal conectado e rotina `Ativa` mantém a versão publicada
  executando enquanto identifica o rascunho;
- fixture de erro preserva o rascunho e permite tentar novamente;
- `Automações` abre a receita correspondente e `Adicionar outra rotina` mostra
  apenas as restantes;
- `Configurações avançadas` existe, mas não disputa atenção no caminho
  principal;
- viewport desktop de 1440 px e móvel de 390 px não têm overflow horizontal;
- o protótipo não promete persistência ou ação real.

## Fora de escopo

- implementar o motor real de execução;
- criar integrações novas;
- alterar o onboarding aprovado;
- remover o editor técnico existente;
- configurar várias receitas simultaneamente na primeira ativação;
- redesenhar Atendimento, Time, Campanhas ou Plano e cartão.
