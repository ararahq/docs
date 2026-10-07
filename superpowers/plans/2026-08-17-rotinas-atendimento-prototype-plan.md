# Plano de implementação — protótipo de Rotinas

## Escopo

Implementar em `prototypes/preview-atendimento/index.html` a especificação
`2026-08-17-rotinas-atendimento-operacao-design.md`, preservando o shell, o
Inbox, o onboarding, a identidade Arara e os estados `dados` e `vazio`.

## Etapas

### 1. Navegação e roteamento

- Renomear visualmente `Automações` para `Rotinas`.
- Manter a chave interna `automation` para evitar regressão no roteamento.
- Remover `Assistente` do menu principal.
- Manter `brain` como subrota interna e deixar `Rotinas` ativa ao editar uma rotina.
- Fazer o onboarding abrir a receita selecionada em Rotinas.

### 2. Estado operacional por rotina

- Criar `routineConfigs` para Suporte, Cobrança e Agendamento.
- Armazenar por rotina: estado, versão, gatilhos, IA, ações, acompanhamento,
  handoff, destino, horário, estágios e resultados.
- Eliminar vazamento de destinatário, horário e publicação entre receitas.
- Preservar `assistantRecipes` como fixture do editor técnico avançado.

### 3. Visão consolidada de Rotinas

- Reescrever `automation-page-template` com as três receitas simultâneas.
- Mostrar entrada, ação, acompanhamento, resultado, volume e estado.
- Oferecer `Abrir rotina`, `Testar` e `Adaptar uma receita`.
- Reescrever o estado vazio sem tela crua.

### 4. Detalhe guiado da rotina

- Substituir o wizard centrado em chatbot por quatro passos:
  1. escolher a rotina, quando necessário;
  2. configurar `Quando começa` e IA;
  3. revisar ação, acompanhamento, ajuda humana e resultado;
  4. testar jornada e publicar.
- Mostrar as cinco partes no detalhe e no resumo publicado.
- Mover chatbot/menu para um controle opcional dentro do gatilho inbound.
- Remover nomes técnicos da configuração principal.

### 5. Simulações específicas

- Suporte: inbound, IA, orientação, handoff e resolução.
- Cobrança: outbound por vencimento, integração ausente e handoff publicável.
- Agendamento: inbound, consulta simulada, confirmação outbound e resultado.
- Atualizar o Inbox de teste conforme a receita escolhida.

### 6. Visão Geral, Atendimento e Campanhas

- Acrescentar resultados por rotina e acompanhamentos vencendo na Visão Geral.
- Mostrar rotina, estágio, próximo passo e resultado no contexto do Inbox.
- Manter Campanhas ligada a uma rotina e a um próximo passo.

### 7. Identidade e responsividade

- Reutilizar linhas editoriais, fios de 1 px, Geist e teal restrito.
- Adicionar somente as classes de ciclo de vida e detalhe necessárias.
- Garantir CTAs acessíveis no mobile.

## Verificação

- Compilar o script inline com `new Function`.
- Verificar IDs duplicados.
- Percorrer estados `dados`, `vazio` e onboarding.
- Percorrer as três rotinas e suas simulações.
- Conferir Visão Geral, Atendimento, Rotinas, Campanhas e configuração avançada.
- Validar `1440 × 1000` e `390 × 844` sem rolagem horizontal.
- Verificar controles sem nome, imagens sem `alt` e campos sem rótulo.

O arquivo é um protótipo HTML isolado; TypeScript, Next.js, Gradle, Flyway,
banco e testes de backend não se aplicam.
