# AraraHQ — rotinas de atendimento como centro da operação

## Decisão

A AraraHQ continua nichada em **atendimento no WhatsApp**, mas esse recorte não
limita a plataforma a um Inbox com chatbot. A Arara opera a conversa de ponta a
ponta: recebe ou inicia o contato, entende o contexto, responde ou executa uma
ação, atribui responsabilidade, acompanha o próximo passo e mede o desfecho.

Suporte, cobrança e agendamento são as três receitas prioritárias. Inbound,
outbound, chatbot, IA, campanhas, conhecimento, integrações e time humano são
mecanismos disponíveis dentro dessas receitas.

Esta especificação corrige o protótipo criado em 16/08/2026 e substitui
explicitamente:

- os itens `Automações` e `Assistente` de `Arquitetura do protótipo` em
  `2026-08-16-arara-atendimento-prototype-design.md`;
- os trechos de `Estados vazios`, `Onboarding e ativação` e `Interações` dessa
  mesma especificação que enviam a primeira receita ao Assistente;
- `Entrada do Assistente`, `Fluxo guiado`, `Ajustes depois da publicação` e os
  critérios de aceite correspondentes em
  `2026-08-16-assistente-configuracao-guiada-design.md`.

O onboarding preserva a receita escolhida, conclui na `Visão geral` vazia e
mostra `Configurar primeira rotina` como próxima prova. Essa ação abre o detalhe
da receita escolhida em `Rotinas`, nunca o Assistente antigo. `Assistente`
configura somente capacidades globais compartilhadas. O editor técnico é
acessado pelo detalhe da rotina em `Configurações avançadas`. Nenhum caminho
principal do onboarding abre o Assistente como construtor.

## Correção do modelo mental

O produto não é configurado como um menu que aponta para nomes internos como
`Fluxo de suporte`, `Base de respostas` ou `Fila geral`. Esses termos não
explicam o resultado e exigem que o cliente compreenda a arquitetura da Arara.

O modelo principal passa a ser uma **rotina de atendimento**:

1. **Quando começa** — mensagem recebida, evento, agenda ou ação manual;
2. **O que a Arara faz** — entende, responde, consulta, envia ou registra;
3. **Como acompanha** — espera, lembra, retoma ou monitora uma mudança;
4. **Quando chama o time** — exceções, pedido humano ou baixa confiança;
5. **Qual resultado mede** — resolvido, pago, agendado, transferido ou sem resposta.

Chatbot é uma entrada opcional de uma rotina inbound. Ele não define a rotina,
não aparece como arquitetura do produto e não é obrigatório.

## Arquitetura de informação

### Visão geral

Home operacional do turno. Mostra:

- conversas aguardando e fora do SLA;
- conversas sem responsável ou próximo passo;
- resultados por rotina: resolvidos, pagos e agendados;
- acompanhamentos outbound que vencem hoje;
- alertas de integração ou publicação;
- atividade recente da Arara e do time.

### Atendimento

Local de execução humana e supervisão da IA:

- fila e conversa;
- responsável atual;
- rotina e estágio;
- resumo e contexto;
- próximo passo com prazo;
- ações sugeridas ou executáveis;
- handoff com histórico preservado.

### Rotinas

Centro de configuração operacional. Substitui `Automações` na navegação
principal e começa com:

- Suporte;
- Cobrança;
- Agendamento;
- Adaptar uma receita.

Cada rotina mostra estado, volume, resultado, integrações e próximo ajuste. Ao
abrir, o usuário vê as cinco partes do modelo mental em linguagem de negócio.

`Adaptar uma receita` não cria uma automação universal. O usuário começa por
Suporte, Cobrança ou Agendamento e pode mudar textos, perguntas, destinos,
prazos e ações dentro das primitivas fechadas daquela receita. Não pode criar
tipos livres de gatilho, ação, acompanhamento ou resultado no protótipo.

A adaptação cria uma **nova rotina derivada**, sem alterar a receita-base. No
protótipo, somente uma derivação pode ser criada. Ela recebe nome do usuário,
aparece abaixo das três receitas iniciais e começa em `Não configurada` com o
indicador `Rascunho`. Depois de completar e publicar, segue os mesmos estados
das receitas iniciais. Excluir a derivação não afeta a receita-base.

### Campanhas

Continua disponível para outbound em massa ou segmentado. Campanha sempre
define qual rotina recebe as respostas e qual próximo passo será criado. Ela
não substitui os acompanhamentos automáticos de uma rotina.

### Assistente

Configura capacidades globais compartilhadas entre rotinas:

- informações e documentos da empresa;
- tom e forma de apresentação;
- autonomia e limites;
- confiança mínima para responder;
- comportamento global fora do horário;
- integrações disponíveis.

O editor técnico permanece em `Configurações avançadas`, sem competir com a
experiência principal.

Cada rotina herda esses limites. No detalhe, duas escolhas observáveis mostram
o contrato da IA:

- `Entender mensagens com a Arara` — classifica texto livre e extrai contexto;
- `Responder usando informações da empresa` — redige respostas somente com as
  fontes autorizadas.

Uma rotina pode reduzir a autonomia herdada, mas nunca ampliar um limite
global. Se a IA global estiver desligada ou sem fonte autorizada, a capacidade
correspondente aparece indisponível e a rotina continua em triagem e handoff.
O teste identifica `entendeu com IA`, `seguiu uma regra` ou `chamou o time por
baixa confiança`, tornando o efeito visível sem expor prompts.

### Time

Pessoas, filas, horários, especialidades, limites e SLAs.

### Plano e cartão

Plano, cota, uso, custos oficiais do canal e forma de pagamento.

## Tela de Rotinas

### Visão consolidada

O topo responde `o que a Arara está operando agora?`. Três linhas editoriais
mostram sempre as receitas-base, mesmo antes da configuração:

| Rotina | Entrada | Acompanhamento | Resultado |
|---|---|---|---|
| Suporte | mensagens recebidas | retorno de solução | resolvido ou escalado |
| Cobrança | pedido e vencimento | lembrete de pendência | pago ou negociado |
| Agendamento | pedido e agenda | confirmação e lembrete | marcado ou remarcado |

Cada linha oferece `Abrir rotina`, `Testar` quando houver caminho executável e
um estado operacional explícito: `Ativa`, `Pronta para conectar`, `Precisa de
atenção` ou `Não configurada`. `Rascunho` não substitui esse estado: é um
indicador adicional quando há configuração ainda não publicada, inclusive
sobre uma versão `Ativa` ou `Pronta para conectar`.

### Detalhe da rotina

Uma rotina aberta usa uma única coluna editorial, sem canvas. As cinco partes
aparecem em sequência e podem ser editadas separadamente.

#### 1. Quando começa

Gatilhos em linguagem concreta:

- `Quando o cliente manda uma mensagem`;
- `Quando uma cobrança está perto do vencimento`;
- `Quando um horário precisa de confirmação`;
- `Quando alguém do time inicia manualmente`.

Cada gatilho informa `Inbound`, `Outbound`, `Evento` ou `Manual`, mas esses
rótulos são auxiliares. O texto principal descreve a situação real.

#### 2. O que a Arara faz

Ações resumidas por resultado:

- responder com informações da empresa;
- fazer perguntas necessárias;
- consultar uma integração;
- enviar um documento, link, Pix ou confirmação;
- registrar ou atualizar dados;
- preparar o contexto para uma pessoa.

Ao editar uma ação, o usuário responde perguntas guiadas. Nomes técnicos de
nós, condições, branches, base ou ferramentas não aparecem.

#### 3. Como acompanha

Regras de continuidade:

- aguardar resposta até um prazo;
- lembrar o cliente;
- verificar se o estado externo mudou;
- retomar uma conversa parada;
- encerrar quando o resultado for confirmado.

Acompanhamentos outbound começam desligados quando exigirem template,
consentimento ou integração. A interface explica o pré-requisito e permite
testar com dados simulados.

#### 4. Quando chama o time

Condições, destino e horário aparecem juntos. O pedido explícito por uma pessoa
sempre transfere. Baixa confiança, exceção operacional e tentativa sem sucesso
podem ser configuradas por rotina.

Os defaults preservam os estados já decididos:

- conta solo recebe em `Você`;
- convidados sem fila recebem em `Fila geral`;
- uma fila compatível existente vem selecionada;
- horário humano ausente é obrigatório antes de publicar;
- fora do horário, a Arara acolhe, coleta contexto e informa quando o time volta.

Publicação bloqueia somente quando não existe destino humano executável ou
horário definido. O teste continua disponível para completar esses dados.

#### 5. Resultado

Todo caminho termina em um estado mensurável. A configuração oferece resultados
compatíveis com a receita e um resultado genérico `Sem resposta`. O dashboard
e o Inbox usam esses estados para medir a operação.

`Aguardando cliente`, `aguardando time`, `lembrete agendado` e equivalentes são
estágios, não resultados. Todo estágio tem próximo passo e prazo. Ao receber a
resposta, expirar o prazo ou atingir o limite de tentativas, a rotina avança
para outro estágio ou para um resultado terminal.

## Receitas iniciais

### Suporte

- **Começa:** cliente envia uma dúvida ou relata um problema;
- **Faz:** identifica o assunto, usa conhecimento e integrações para orientar;
- **Acompanha:** pergunta se resolveu e retoma chamados sem confirmação;
- **Handoff:** pedido humano, baixa confiança ou tentativa sem sucesso;
- **Estágios:** orientando, aguardando cliente, aguardando time;
- **Resultado:** resolvido, escalado ou sem resposta após o limite configurado.

### Cobrança

- **Começa:** cliente pede ajuda ou um vencimento se aproxima;
- **Faz:** identifica a pendência, consulta o financeiro e envia a forma de pagamento;
- **Acompanha:** verifica pagamento e lembra quando autorizado;
- **Handoff:** negociação, contestação ou pagamento não localizado;
- **Resultado:** pago, negociado, contestado, transferido ou sem resposta.

### Agendamento

- **Começa:** cliente pede um horário ou um compromisso exige confirmação;
- **Faz:** consulta disponibilidade, agenda, confirma, remarca ou cancela;
- **Acompanha:** envia confirmação e lembrete, tenta remarcar ausência;
- **Handoff:** falta de horário, exceção ou pedido humano;
- **Resultado:** marcado, confirmado, remarcado, cancelado ou não compareceu.

## Chatbot opcional

O chatbot é configurado dentro de `Quando começa` para mensagens inbound. A
configuração oferece duas escolhas:

- `Deixar a Arara entender o pedido pela mensagem`;
- `Mostrar um menu antes de continuar`.

Quando existe menu, as opções são livres e editáveis. A interface mostra, em
frase, o comportamento resultante de cada opção. Exemplo:

> **Preciso de suporte**  
> A Arara entende o problema, tenta orientar e chama o suporte se não resolver.

O cliente pode adicionar, remover, renomear e reordenar opções. Com até três
opções, a prévia usa botões de resposta. Com mais opções, usa uma lista
interativa compatível com o WhatsApp. A prévia nunca apresenta cinco botões
como se fossem nativos.

## Configuração guiada de uma ação

Ao escolher `Editar`, abre um painel contextual com quatro perguntas:

1. `O que a Arara precisa entender ou perguntar?`
2. `O que ela pode responder ou executar?`
3. `Como sabemos que deu certo?`
4. `Quando e para quem ela deve pedir ajuda?`

O painel termina em `Testar esta parte`. O teste mostra a conversa e o efeito
operacional: consulta realizada, próximo passo criado, lembrete agendado,
resultado atualizado ou handoff enviado.

## Estados e falhas

- Integração ausente não bloqueia triagem e handoff; a ação dependente aparece
  como `Conectar para usar`.
- Template ou consentimento ausente mantém outbound desligado e explica o que falta.
- Publicação com erro preserva o rascunho e a versão ativa.
- A rotina identifica alterações não publicadas.
- Testes nunca consomem cota, enviam mensagens reais ou alteram dados externos.
- Um gatilho sem caminho executável nem destino humano impede a publicação e
  aponta exatamente a seção incompleta.

## Alterações necessárias no protótipo

1. Renomear `Automações` para `Rotinas`.
2. Transformar a tela de Automações em visão consolidada das três receitas.
3. Criar detalhe navegável de Suporte, Cobrança e Agendamento com as cinco partes.
4. Mover a configuração de chatbot para dentro do gatilho inbound.
5. Remover destinos técnicos da tela principal.
6. Reformular `Assistente` como configuração global de conhecimento, autonomia
   e integrações.
7. Atualizar Visão geral e Atendimento para mostrar rotina, estágio, próximo
   passo e resultado.
8. Demonstrar pelo menos um fluxo completo que combina inbound, handoff,
   acompanhamento outbound e resultado.
9. Preservar tema claro, identidade brutalista editorial e estados vazios guiados.

## Critérios de aceite

- a navegação mostra `Rotinas`, não `Automações`, e abre a visão consolidada das
  três receitas; `Assistente` abre somente capacidades globais;
- o onboarding termina na Visão geral vazia e `Configurar primeira rotina` abre
  em Rotinas a receita escolhida, sem passar pelo Assistente;
- o topo de Rotinas mostra simultaneamente Suporte, Cobrança e Agendamento com
  entrada, acompanhamento, resultado e estado;
- o detalhe de cada uma contém, nessa ordem, `Quando começa`, `O que a Arara
  faz`, `Como acompanha`, `Quando chama o time` e `Resultado`;
- cada receita contém ao menos um gatilho inbound e um acompanhamento outbound;
- `Adaptar uma receita` cria uma quarta linha derivada, preserva a receita-base,
  começa `Não configurada · Rascunho` e não oferece primitivas fora da receita;
- chatbot é opcional e subordinado ao gatilho inbound;
- nenhuma tela principal exige entender `fluxo`, `branch`, `base` ou `nó`;
- a rotina de Suporte testa mensagem inbound, IA ligada, orientação, handoff e
  resultado `Resolvido`;
- a rotina de Cobrança testa vencimento outbound, integração financeira ausente,
  triagem publicável e resultado `Transferido`;
- a rotina de Agendamento testa pedido inbound, consulta simulada, confirmação
  outbound e resultado `Confirmado`;
- desligar IA em uma rotina muda a prova para `seguiu uma regra`; baixa
  confiança muda a prova para `chamou o time`;
- uma conversa do Inbox mostra responsável, rotina, estágio, próximo passo com
  prazo e resultado quando encerrada;
- Campanhas envia respostas para uma rotina e cria próximo passo;
- integrações ausentes têm tratamento explícito;
- fixture solo seleciona `Você`; fixture com convidados e sem fila seleciona
  `Fila geral`; horário ausente bloqueia publicação e permanece editável;
- desktop em `1440 × 1000` e mobile em `390 × 844` não possuem rolagem
  horizontal e mantêm as cinco partes navegáveis;
- o HTML passa por compilação do script inline, não possui IDs duplicados e as
  trajetórias determinísticas acima são percorridas no navegador.

## Não objetivos

- construir um motor real de automações;
- criar integrações funcionais;
- transformar o protótipo em um canvas genérico;
- prometer resolução humana 24/7;
- verticalizar o produto para um único segmento.
