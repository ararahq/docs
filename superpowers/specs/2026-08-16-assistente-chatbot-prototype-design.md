# Assistente e chatbot no protótipo de atendimento

## Objetivo

Tornar configurável o mecanismo que hoje só aparece executando nas Conversas. O usuário deve entender onde define a primeira resposta, os caminhos determinísticos, o uso de conhecimento e o momento de transferir ao time.

## Arquitetura aprovada

- Renomear a entrada principal `Cérebro` para `Assistente`.
- Organizar a tela em quatro áreas: `Chatbot`, `Conhecimento`, `Comportamento` e `Handoff`.
- Abrir `Chatbot` por padrão, preservando Conhecimento e limites já existentes como áreas secundárias.
- Manter `Automações` como receitas operacionais de suporte, cobrança e agendamento. A receita aponta para o fluxo do chatbot que a executa.

## Tela Chatbot

A tela usa três regiões contínuas, separadas por fios e espaço, sem cards decorativos:

1. uma lista curta de etapas do fluxo;
2. o detalhe editável da etapa selecionada;
3. uma prévia de WhatsApp que muda conforme a etapa.

Cada receita entrega um fluxo navegável com conteúdo próprio. O fluxo inicial de
Suporte vem pronto com um exemplo horizontal, sem assumir a vertical do cliente:

1. `Acolhimento`: "Oi. Sou a Arara da sua empresa. Como posso ajudar?";
2. `Escolha`: problema de acesso, dúvida sobre o serviço, cobrança ou falar com alguém;
3. `Condição`: cada escolha aponta para uma próxima etapa diferente;
4. `Ação`: consultar cadastro, buscar fatura, consultar agenda ou coletar contexto;
5. `Fallback`: depois de duas respostas não entendidas, pedir uma descrição livre;
6. `Handoff`: resumir o que foi coletado e transferir para a fila correta;
7. `Encerramento`: confirmar a solução e perguntar se falta algo.

O painel da etapa selecionada permite editar mensagem, opções, destino de cada
opção, regra de fallback, ação externa simulada e destino humano. A prévia mostra
a conversa completa até a etapa selecionada. No modo de teste, o usuário escolhe
uma opção, percorre o branch, pode provocar o fallback e vê o handoff com resumo.

Suporte, Cobrança e Agendamento possuem fluxos correspondentes. Quando o usuário
abre o Assistente a partir de Automações, a receita de origem permanece
selecionada e existe navegação explícita de volta.

Iknet e outros segmentos são demonstrações separadas. Nenhuma mensagem, opção, ação ou dado do protótipo principal deve sugerir que a Arara é um produto vertical para provedores.

## Conhecimento, comportamento e handoff

- `Conhecimento`: fontes conectadas e indicação de quais etapas as consultam;
- `Comportamento`: nome, apresentação, tom e instrução de resposta, refletidos na prévia;
- `Handoff`: condições, fila de destino, horário e resumo exigido, refletidos na etapa final.

As áreas não podem ser abas mortas. Cada uma oferece ao menos uma configuração
interativa e uma consequência visível no fluxo ou na prévia.

## Estado de edição e publicação

- abertura: `Publicado · versão 3`;
- primeira alteração: `Rascunho · alterações não publicadas`;
- mensagem vazia ou caminho sem destino: publicação desabilitada e erro junto ao campo;
- publicação: botão mostra `Publicando...` por um intervalo curto;
- sucesso do protótipo: `Publicado agora · versão 4`, com aviso explícito de simulação;
- falha simulável: estado inline preserva o rascunho e oferece tentar novamente.

O protótipo não afirma salvar no servidor. O feedback usa "simulado neste
protótipo" quando necessário.

## Empty state e onboarding

No estado vazio, o usuário não recebe um canvas cru. Se nenhuma receita foi
escolhida, vê Suporte, Cobrança e Agendamento com seus resultados concretos. Ao
escolher, o modo guiado abre com a receita pré-configurada. Se a receita veio do
onboarding ou de Automações, ela é preservada. O usuário personaliza o chatbot,
testa como cliente e só então publica. O editor técnico existe apenas em
`Configurações avançadas`.

## Linguagem visual

- tema claro e identidade editorial já usada no protótipo;
- preservar o shell atual: sidebar textual, busca no topo, largura editorial central e fundo branco;
- Geist e Geist Mono;
- teal apenas para estado ativo e voz da Arara;
- hierarquia por tipografia, espaço e fios de 1 px;
- superfícies planas, sem gradientes, canvas pontilhado, cards elevados, badges em excesso ou ilustração genérica;
- controles seguem os tokens atuais: `#10191a`, `#1c99a7`, `#d9e1e3`, botões primários escuros e raios somente em controles e balões;
- interação por seleção, foco, teste e publicação com estados visíveis.

## Responsividade e acessibilidade

- alvo principal: 1440 x 900 ou maior, com lista, edição e prévia lado a lado;
- de 821 a 1180 px: lista e edição permanecem; prévia vira painel acionado por botão;
- até 820 px: lista de etapas vira trilho horizontal; edição e prévia são alternadas;
- sem scroll horizontal da página;
- tabs e etapas usam semântica de tablist/tab, estado selecionado e foco visível;
- campos têm label; erros usam `aria-live`; publicação inválida permanece desabilitada;
- teclado percorre tabs, etapas, campos e ações na ordem visual.

## Critérios de aceite

- `Assistente` é descobrível na navegação principal;
- em `Configurações avançadas`, `Chatbot` abre diretamente e mostra um fluxo configurável;
- no editor avançado, cada etapa altera o painel de configuração e a prévia;
- no editor avançado, escolhas, caminhos, ação, fallback, handoff e encerramento são configuráveis;
- no editor avançado, Conhecimento, Comportamento e Handoff têm conteúdo interativo e efeito observável;
- Suporte, Cobrança e Agendamento em `Automações` abrem suas receitas no fluxo guiado e preservam origem; o chatbot técnico abre somente por `Configurações avançadas`;
- o protótipo principal não contém fixtures de Iknet ou provedores; exemplos verticais ficam somente em `demo-iknet`;
- o estado vazio oferece uma receita pronta em vez de canvas vazio;
- rascunho, validação, publicação simulada, sucesso e falha têm feedback explícito;
- o resultado é utilizável nos três breakpoints definidos e atende aos requisitos de teclado e foco.
