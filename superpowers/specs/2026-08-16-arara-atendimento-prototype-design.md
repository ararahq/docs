# AraraHQ atendimento — protótipo completo

## Decisão de produto

A Arara é **atendimento no WhatsApp que responde, organiza e não deixa oportunidade escapar**.

- Suporte, cobrança e agendamento são os três resultados principais.
- Inbound, outbound, campanhas, chatbot, IA e integrações são mecanismos do atendimento.
- Visão Geral é a home operacional; Atendimento é o lugar de execução.
- Campanhas só existem como continuidade de uma conversa: lembrar pagamento, confirmar agenda ou retomar pendência.

## Guardrail de posicionamento

O protótipo principal é horizontal e não pode parecer um produto para provedores, clínicas, lojas ou qualquer outra vertical específica. Exemplos concretos demonstram o núcleo comum da operação — suporte, cobrança, agendamento e handoff — sem transformar um segmento em tese. Casos verticais ficam em demos próprias, como `demo-iknet`.

## Arquitetura do protótipo

1. **Visão Geral** — resumo editorial do turno, alertas, métricas e atividade.
2. **Atendimento** — fila, conversa, resumo da Arara, SLA e próximo passo.
3. **Time** — pessoas, cobertura, horário e distribuição.
4. **Automações** — receitas de suporte, cobrança e agendamento.
5. **Campanhas** — outbound conectado ao inbox.
6. **Assistente** — chatbot, conhecimento, regras e handoff.
7. **Plano e cartão** — cota, uso, forma de pagamento e canal.

Todas as telas usam o tema claro, a composição editorial, Geist, teal restrito a ações e linhas, e superfícies planas da identidade Arara.

## Estados vazios

O modo vazio representa uma conta que concluiu o onboarding, mas ainda não conectou o número real nem recebeu conversas. Ele nunca é uma tela crua: precisa mostrar a prova conquistada, uma única próxima ação e progresso iniciado.

- Visão Geral: confirma a mensagem entregue no onboarding, conduz uma simulação de atendimento e só então revela o checklist operacional.
- Atendimento: nenhuma conversa real; teste cria uma conversa e abre o inbox.
- Time: convite do primeiro atendente e definição de cobertura.
- Automações: escolha da primeira receita.
- Campanhas: primeiro lembrete de continuidade.
- Assistente: primeira rotina guiada e primeira fonte de conhecimento.
- Plano: cartão configurado no onboarding e uso zerado.

## Onboarding e ativação

O wizard visual existente permanece. O conteúdo muda para:

1. proposta de atendimento;
2. primeiro resultado: suporte, cobrança ou agendamento;
3. empresa;
4. mensagem de teste no próprio celular;
5. time;
6. cartão de pagamento;
7. confirmação e entrada na Visão Geral vazia.

O evento de ativação do protótipo é: **simular a primeira conversa, ver a Arara responder e abrir o inbox com contexto**. Dados demonstrativos nunca aparecem como se fossem dados reais.

## Interações

- Navegação lateral troca telas completas.
- Controles de preview alternam conta com dados, conta vazia e onboarding.
- Alertas da Visão Geral abrem o Atendimento filtrado.
- Ações secundárias usam feedback de protótipo sem páginas mortas.
- Onboarding termina em `preview-atendimento/?state=empty`.

## Verificação

- JavaScript do HTML precisa compilar via `new Function`.
- Assets e fontes devem responder no servidor local.
- Visão Geral, Atendimento, telas secundárias, modo vazio e onboarding precisam ser inspecionados em navegador.
- O protótipo principal comunica atendimento no WhatsApp, apresenta suporte, cobrança e agendamento como fluxos e não contém fixtures de Iknet ou provedores; essas ficam somente em `demo-iknet`.
- O protótipo é HTML isolado; builds de Next.js, Kotlin e TypeScript não se aplicam.
