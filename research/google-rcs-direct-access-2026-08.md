# Acesso direto ao Google RCS for Business (agosto de 2026)

Pesquisa feita em 27 de agosto de 2026, exclusivamente em documentação primária oficial do Google. Este arquivo registra fatos publicados e inferências explícitas; não constitui decisão de produto da Arara.

## Resposta curta

A Arara pode solicitar ao Google uma conta de parceiro como **RCS Solution Provider** e, se aprovada, integrar diretamente às APIs do RCS for Business, sem usar a API de um BSP. Contudo, isso não elimina as operadoras da contratação comercial.

O Google fornece onboarding, Console, autenticação, APIs, roteamento e relatórios. A documentação pública não oferece uma tabela de preços Google nem contratação self-service de tráfego. Para tráfego não americano, os eventos são cobrados conforme o **rate card da operadora**. Além disso, para lançar em uma operadora gerenciada pelo Google, o agente deve primeiro estar lançado em pelo menos uma rede gerenciada por operadora no mesmo país; esta pode exigir contrato direto e rejeitar o lançamento sem ele.

Portanto, “direto do Google” significa **integração técnica direta**, não necessariamente compra direta de tráfego do Google.

## 1. Cadastro e elegibilidade publicada

O ponto de entrada é o [RCS for Business Partner Registration Interest Form](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/register-partner), incorporado na própria página oficial. O Google diz que entrará em contato com os próximos passos **se a empresa se qualificar**, mas não publica critérios objetivos de qualificação, volume mínimo, receita mínima, certificação obrigatória, SLA de análise ou garantia de aprovação.

Para a Arara, a categoria adequada no formulário é **RCS Solution Provider**, definida pelo Google como uma organização que deseja usar as APIs para criar, gerenciar ou operar um ou mais agentes.

Dados requeridos no formulário:

- responsável e cargo;
- e-mail corporativo;
- Google Account individual vinculada ao domínio corporativo; Gmail pessoal e conta de grupo não são aceitos para o owner;
- nome público, website, descrição e eventual controladora;
- nome de exibição do parceiro, que deve coincidir com o nome usado nos contratos com operadoras;
- países de operação e região da conta (`Americas` para o Brasil);
- contato técnico com e-mail corporativo e telefone;
- origem do contato: representante Google, representante de operadora ou outra.

O cadastro é uma manifestação de interesse, não criação imediata de conta. A documentação não publica prazo para a aprovação da conta de parceiro.

## 2. Partner Account e Developer Console

Após aprovação, o owner indicado recebe acesso ao [RCS for Business Developer Console](https://business-communications.cloud.google.com/). A [configuração oficial da conta](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/partner-account) permite:

- visualizar o Partner ID;
- atualizar nome, nome de exibição e contato técnico;
- cadastrar e gerenciar brands;
- adicionar usuários como Manager ou Reader; o primeiro usuário é Owner;
- configurar webhook global ou por agente;
- criar a service account e suas chaves.

O nome de exibição e o e-mail do owner aparecem nos relatórios enviados às operadoras, para que elas identifiquem o parceiro e façam o faturamento correto. O próprio Google instrui que o nome esteja alinhado aos contratos de mensageria com as operadoras.

## 3. Autenticação e APIs

A chave da service account é criada dentro de **Partner account settings > Service account > Create key**, não no fluxo comum de habilitar uma API pública qualquer no Google Cloud. Uma service account pode ter até 10 chaves. A chave autentica:

- **Business Communications / RBM Management API**, para brands, agents, testers, verificação e lançamento;
- **RCS Business Messaging API**, para capability checks, mensagens, eventos e requests como o agente.

O escopo OAuth documentado para gestão é `https://www.googleapis.com/auth/businesscommunications`. Exemplo oficial de criação de agente: `POST https://businesscommunications.googleapis.com/v1/{parent=brands/*}/agents`, conforme [`brands.agents.create`](https://developers.google.com/business-communications/rcs-business-messaging/reference/business-communications/rest/v1/brands.agents/create).

O Google usa `oauth2l` nos exemplos para gerar o bearer token a partir do JSON da service account. Em produção, a chave deve permanecer somente no backend, protegida como secret. O webhook deve validar `X-Goog-Signature` com HMAC-SHA512 antes de processar a mensagem; para a Arara, a comparação também deve ser constant-time.

## 4. Criação de brand e agent

Depois da conta:

1. Cadastrar a brand no Console ou Management API.
2. [Criar o agent](https://developers.google.com/business-communications/rcs-business-messaging/guides/build/agents) informando brand, nome, região de hospedagem, categoria de faturamento e use case.
3. Para a América Latina, o Google orienta escolher a região de agente **North America**, por proximidade; a região não deve ser escolhida com base nas operadoras-alvo.
4. Escolher o use case: OTP, Transactional, Promotional ou Multi-use. Depois do envio para lançamento, o use case não pode ser alterado.
5. Preencher identidade visual, descrição, contatos, website, Política de Privacidade e Termos.
6. Configurar webhook e implementar mensagens, eventos, capability checks e opt-out.

Antes do lançamento, agentes só falam com aparelhos convidados como testers. A [documentação de teste](https://developers.google.com/business-communications/rcs-business-messaging/guides/build/test) limita os convites a 20 por dia e 200 no total; mensagens a testers não são cobradas.

## 5. Verificação e lançamento

A [verificação de marca](https://developers.google.com/business-communications/rcs-business-messaging/guides/launch/brand-verification) exige um representante individual da marca, autorizado a confirmar tanto os dados do agente quanto o direito do parceiro de operá-lo. Não pode ser lista de distribuição. É possível anexar até cinco PDFs, cada um com até 50 MB, incluindo carta de autorização.

O checklist público de [aprovação de lançamento](https://developers.google.com/business-communications/rcs-business-messaging/guides/launch/launch-approval) requer:

- agente e infraestrutura testados;
- website, Política de Privacidade e Termos públicos e corretos;
- fluxo STOP/opt-out implementado;
- vídeo público demonstrando o caso declarado e o STOP;
- contatos responsáveis;
- gatilhos, interações e texto exato de resposta ao opt-out;
- países e operadoras desejados.

Há dois tipos de lançamento:

- **Google-managed:** Google conduz verificação e aprovação para a operadora. O prazo publicado é 1–3 dias úteis, se a marca responder em até 24 horas e os ativos estiverem corretos e públicos.
- **Carrier-managed:** a operadora conduz o processo e pode impor requisitos e prazo próprios. O Google não publica SLA geral.

Depois de o status virar `Launched`, o agente tende a ficar alcançável em cerca de 30 minutos.

## 6. Contratos, faturamento e a limitação do “direto”

A [visão oficial de lançamento](https://developers.google.com/business-communications/rcs-business-messaging/guides/launch) estabelece duas restrições importantes:

1. Para lançar em uma rede Google-managed, é obrigatório primeiro lançar em pelo menos uma rede carrier-managed **no mesmo país**.
2. Redes carrier-managed podem exigir acordo direto com o parceiro e rejeitar o lançamento se não existir contrato.

Na [visão oficial de billing](https://developers.google.com/business-communications/rcs-business-messaging/carriers/billing), o tráfego fora dos Estados Unidos segue o modelo Standard e é faturável conforme categoria do agente e **rate card de cada operadora**. O Google rastreia eventos e gera relatórios para suportar o faturamento; isso não equivale a uma oferta pública em que o Google vende créditos de tráfego à Arara.

Desde 25 de agosto de 2026, parceiros podem receber [relatórios diários agregados de faturamento](https://developers.google.com/business-communications/rcs-business-messaging/guides/learn/partner-billing-reports) por agente, evento e operadora via SFTP. O onboarding desses relatórios depende de representante comercial ou contato principal do Google e não substitui a fatura/contrato da operadora.

**Conclusão comercial:** nas fontes públicas consultadas, não há checkout, créditos pré-pagos, tabela Google por mensagem ou declaração de que o Google seja o vendedor do tráfego RBM no Brasil. A evidência aponta para Google como plataforma/clearing de eventos e operadoras como donas do rate card e possível contraparte contratual. Para confirmar a configuração brasileira exata (Claro, Vivo, TIM etc.), isso precisa ser perguntado ao Google durante o onboarding e validado com cada carrier exibida no Console.

## 7. Prazos publicados e não publicados

| Etapa | Prazo oficial publicado |
|---|---:|
| Análise do Partner Interest Form | Não publicado |
| Criação/liberação da Partner Account | Não publicado |
| Negociação ou aprovação carrier-managed | Não publicado; depende da operadora |
| Aprovação Google-managed | 1–3 dias úteis, sob condições |
| Resposta da marca para manter esse prazo | Até 24 horas |
| Propagação após `Launched` | Aproximadamente 30 minutos |
| Convites de tester | 20/dia; 200 total |

## 8. Próximo passo recomendado para a Arara

1. Submeter o formulário como `RCS Solution Provider`, região `Americas`, países incluindo Brasil, com owner individual em domínio AraraHQ.
2. Descrever claramente o modelo SaaS multicliente, criação/operação de agents para brands clientes e controles de consentimento/opt-out.
3. Perguntar por escrito ao contato Google:
   - quais redes brasileiras são carrier-managed e Google-managed;
   - qual carrier-managed aceita contrato direto com a Arara;
   - requisitos comerciais, volume mínimo, garantia e SLA por operadora;
   - quem fatura cada evento e como impostos brasileiros são tratados;
   - se um único contrato/agregação comercial Google existe para o Brasil — algo não oferecido na documentação pública;
   - se a Arara pode criar e administrar múltiplas brands/agents de clientes sob a Partner Account.
4. Só comparar “Google direto” contra BSP depois de obter os rate cards e custos operacionais de homologação das operadoras.

## Fontes oficiais principais

- [Register as a partner](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/register-partner) — atualizado em 11/05/2026.
- [Set up your partner account](https://developers.google.com/business-communications/rcs-business-messaging/guides/get-started/partner-account) — conta, brands, usuários, service account e webhook.
- [Create an agent](https://developers.google.com/business-communications/rcs-business-messaging/guides/build/agents) — região, categoria e use case.
- [Verify and launch your agent](https://developers.google.com/business-communications/rcs-business-messaging/guides/launch) — Google-managed versus carrier-managed e contratos.
- [Brand verification](https://developers.google.com/business-communications/rcs-business-messaging/guides/launch/brand-verification) — POC e documentos.
- [Launch approval](https://developers.google.com/business-communications/rcs-business-messaging/guides/launch/launch-approval) — requisitos e prazos.
- [Billing overview](https://developers.google.com/business-communications/rcs-business-messaging/carriers/billing) — modelo e rate cards das operadoras.
- [Partner billing reports](https://developers.google.com/business-communications/rcs-business-messaging/guides/learn/partner-billing-reports) — relatórios SFTP para parceiros, atualizado em 25/08/2026.
