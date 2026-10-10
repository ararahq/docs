export const DemoWhatsApp = () => {
  const ENDPOINT = 'https://ararahq.com/api/demo-recuperacao';
  const PAGINA_DEMO = 'https://ararahq.com/demo';
  const CENARIO = 'carrinho';
  const DIGITOS_CELULAR = 11;
  const TEMPO_LIMITE_MS = 15000;
  const HTTP_CRIADO = 201;
  const HTTP_INVALIDO = 400;
  const HTTP_LIMITE = 429;

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [aceite, setAceite] = useState(false);
  const [envio, setEnvio] = useState({ estado: 'parado', mensagem: '' });

  const soDigitos = (valor) => {
    const digitos = valor.replace(/\D/g, '');
    const semDdi = digitos.length > DIGITOS_CELULAR && digitos.startsWith('55') ? digitos.slice(2) : digitos;
    return semDdi.slice(0, DIGITOS_CELULAR);
  };

  const mascara = (digitos) => {
    if (digitos.length <= 2) return digitos.length === 0 ? '' : `(${digitos}`;
    const resto = digitos.slice(2);
    if (resto.length <= 5) return `(${digitos.slice(0, 2)}) ${resto}`;
    return `(${digitos.slice(0, 2)}) ${resto.slice(0, 5)}-${resto.slice(5)}`;
  };

  const digitos = soDigitos(telefone);
  const telefoneOk = digitos.length === DIGITOS_CELULAR && digitos[2] === '9';
  const pronto = nome.trim().length >= 2 && telefoneOk && aceite && envio.estado !== 'enviando';

  const mensagemDe = (corpo) =>
    corpo && typeof corpo === 'object' && corpo.error && typeof corpo.error.message === 'string'
      ? corpo.error.message
      : '';

  const enviar = async (evento) => {
    evento.preventDefault();
    if (!pronto) return;
    setEnvio({ estado: 'enviando', mensagem: '' });
    try {
      const resposta = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome.trim(), phone: digitos, scenario: CENARIO, consent: true }),
        signal: AbortSignal.timeout(TEMPO_LIMITE_MS),
      });
      if (resposta.status === HTTP_CRIADO) {
        setEnvio({ estado: 'enviado', mensagem: '' });
        return;
      }
      const corpo = await resposta.json().catch(() => null);
      if (resposta.status === HTTP_INVALIDO) {
        setEnvio({ estado: 'invalido', mensagem: 'Confira o nome e o número com DDD.' });
        return;
      }
      if (resposta.status === HTTP_LIMITE) {
        setEnvio({ estado: 'limite', mensagem: mensagemDe(corpo) || 'Limite de demonstrações atingido. Tente mais tarde.' });
        return;
      }
      setEnvio({ estado: 'erro', mensagem: '' });
    } catch {
      setEnvio({ estado: 'erro', mensagem: '' });
    }
  };

  const campo =
    'w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400';
  const rotulo = 'mb-1 block text-sm font-medium text-gray-900 dark:text-gray-100';

  if (envio.estado === 'enviado') {
    return (
      <div role="status" className="not-prose my-6 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <p className="text-base font-semibold text-gray-900 dark:text-gray-100">Enviado. Olhe o seu WhatsApp.</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          A mensagem chega em alguns segundos, pelo número de demonstração da Arara. Abaixo está a chamada que acabou
          de rodar.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="not-prose my-6 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="demo-nome" className={rotulo}>
            Seu nome
          </label>
          <input
            id="demo-nome"
            name="nome"
            type="text"
            autoComplete="given-name"
            maxLength={60}
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
            className={campo}
            required
          />
        </div>
        <div>
          <label htmlFor="demo-telefone" className={rotulo}>
            Seu WhatsApp, com DDD
          </label>
          <input
            id="demo-telefone"
            name="telefone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="(11) 99999-9999"
            value={mascara(digitos)}
            onChange={(evento) => setTelefone(evento.target.value)}
            className={campo}
            required
          />
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
        <input
          id="demo-aceite"
          name="aceite"
          type="checkbox"
          checked={aceite}
          onChange={(evento) => setAceite(evento.target.checked)}
          className="mt-0.5"
          required
        />
        <span>Autorizo a Arara a enviar esta demonstração para este número.</span>
      </label>

      <button
        type="submit"
        disabled={!pronto}
        className="mt-4 rounded-lg bg-primary dark:bg-primary-light px-4 py-2 text-sm font-semibold text-white dark:text-gray-950 disabled:opacity-50"
      >
        {envio.estado === 'enviando' ? 'Enviando...' : 'Receber no meu WhatsApp'}
      </button>

      {envio.estado === 'invalido' || envio.estado === 'limite' ? (
        <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
          {envio.mensagem}
        </p>
      ) : null}

      {envio.estado === 'erro' ? (
        <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
          Não foi possível enviar daqui agora.{' '}
          <a href={PAGINA_DEMO} target="_blank" rel="noopener noreferrer" className="underline">
            Abra a demonstração em outra aba
          </a>
          .
        </p>
      ) : null}

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Uma demonstração por número por dia.
      </p>
    </form>
  );
};
