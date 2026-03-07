import React, { useState, useEffect, useMemo } from 'react';

// --- BANCO DE DADOS INTEGRADO (30 QUESTÕES - APOCALIPSE 13) ---
const QUESTOES_BASE = [
  { q: "De onde surge a primeira besta descrita por João no início do capítulo?", ok: "Do mar", ref: "Apocalipse 13:1", exp: "Na profecia, o mar representa multidões e nações em conflito." },
  { q: "Quantas cabeças e quantos chifres tinha a besta que subiu do mar?", ok: "7 cabeças e 10 chifres", ref: "Apocalipse 13:1", exp: "Os chifres tinham diademas, indicando poder político e real." },
  { q: "A primeira besta assemelhava-se a quais três animais?", ok: "Leopardo, Urso e Leão", ref: "Apocalipse 13:2", exp: "Uma união dos impérios descritos anteriormente em Daniel 7." },
  { q: "O que aconteceu a uma das cabeças da besta que causou admiração?", ok: "Foi ferida de morte, mas sua ferida foi curada", ref: "Apocalipse 13:3", exp: "Essa cura milagrosa faz com que todo o mundo se maravilhe e a siga." },
  { q: "Por quanto tempo (meses) foi dado à primeira besta autoridade para agir?", ok: "42 meses", ref: "Apocalipse 13:5", exp: "Equivale a três anos e meio de autoridade para combater os santos." },
  { q: "Como é descrita a aparência da segunda besta que sobe da terra?", ok: "Dois chifres como de cordeiro, mas falava como dragão", ref: "Apocalipse 13:11", exp: "Sua aparência é mansa, mas sua mensagem é de destruição." },
  { q: "Qual é a principal função da segunda besta em relação à primeira?", ok: "Fazer com que a terra adore a primeira besta", ref: "Apocalipse 13:12", exp: "Ela atua como um braço religioso/ideológico que promove o culto à primeira." },
  { q: "Que sinal vindo do céu a segunda besta realiza para enganar?", ok: "Faz descer fogo do céu", ref: "Apocalipse 13:13", exp: "Ela realiza prodígios visíveis para validar seu poder espiritual enganador." },
  { q: "O que a segunda besta exige que todos recebam para comprar ou vender?", ok: "A marca na mão direita ou na testa", ref: "Apocalipse 13:16", exp: "Um sistema de exclusão financeira para forçar a adoração." },
  { q: "Qual é o número de homem atribuído à besta?", ok: "666", ref: "Apocalipse 13:18", exp: "O número representa a imperfeição humana elevada ao extremo." },
  { q: "Como o Dragão e as duas Bestas tentam 'copiar' a Santíssima Trindade?", ok: "O Dragão (Pai), a Besta do Mar (Filho) e a Besta da Terra (Espírito)", ref: "Reflexão", exp: "É uma contrafação satânica que tenta imitar a estrutura divina." },
  { q: "Qual o critério único que impede uma pessoa de adorar a Besta?", ok: "Ter o nome no Livro da Vida do Cordeiro", ref: "Apocalipse 13:8", exp: "A fidelidade a Cristo é a única proteção real contra o engano." },
  { q: "Por que o Dragão entrega seu trono à Besta do Mar?", ok: "Para governar através de uma máscara de autoridade", ref: "Estratégia", exp: "O mal prefere agir por intermédio de instituições que pareçam legítimas." },
  { q: "O que representa a marca ser na testa ou na mão direita?", ok: "Cópia do selo de Deus (Pensamento e Ação)", ref: "Deuteronômio 6:8", exp: "Testa (mente/crença) e mão (trabalho/obediência)." },
  { q: "Por que a Besta escolhe o controle financeiro?", ok: "Para forçar a conformidade através de necessidades básicas", ref: "Análise", exp: "O controle econômico é uma pressão que atinge a todos." },
  { q: "O que representa uma besta vir do mar e a outra da terra?", ok: "Mar: Povos agitados. Terra: Lugar pouco habitado", ref: "Geografia", exp: "Indica o contexto populacional de surgimento de cada poder." },
  { q: "O que o número 6 repetido três vezes sugere?", ok: "A imperfeição total tentando se passar por divina", ref: "Numerologia", exp: "O 6 é o número do homem tentando chegar ao 7 (divino)." },
  { q: "O que estava escrito nas sete cabeças da besta que subiu do mar?", ok: "Nomes de blasfêmia", ref: "Apocalipse 13:1", exp: "Isso indica uma oposição insultuosa à santidade de Deus." },
  { q: "A besta do mar era semelhante a um leopardo, mas como eram os seus pés?", ok: "Pés de urso", ref: "Apocalipse 13:2", exp: "Os pés de urso simbolizam força esmagadora e base de sustentação." },
  { q: "Além do poder e do trono, o que mais o Dragão deu à primeira besta?", ok: "Grande autoridade", ref: "Apocalipse 13:2", exp: "A besta é uma agente direta de Satanás na terra." },
  { q: "Quem a besta do mar blasfema, além de Deus e do Seu nome?", ok: "O Seu tabernáculo e os que habitam no céu", ref: "Apocalipse 13:6", exp: "Ataca toda a realidade do santuário celestial." },
  { q: "Segundo o verso 7, sobre quem a besta recebeu domínio?", ok: "Toda tribo, povo, língua e nação", ref: "Apocalipse 13:7", exp: "Isso mostra o caráter global do domínio político da besta." },
  { q: "Complete a frase do verso 10: 'Aqui está a paciência e a...'?", ok: "Fé dos santos", ref: "Apocalipse 13:10", exp: "A resistência baseia-se em confiar na justiça final de Deus." },
  { q: "A segunda besta exercia toda a autoridade de quem?", ok: "Da primeira besta", ref: "Apocalipse 13:12", exp: "Ela valida e impõe o sistema da primeira besta." },
  { q: "A segunda besta engana os habitantes da terra por meio de quê?", ok: "Dos sinais que lhe foi permitido realizar", ref: "Apocalipse 13:14", exp: "O engano é baseado em milagres visíveis e falsos prodígios." },
  { q: "O que a segunda besta deu à imagem da primeira para que ela pudesse falar?", ok: "Fôlego (espírito)", ref: "Apocalipse 13:15", exp: "Representa a capacidade de dar 'voz' legal a um sistema inanimado." },
  { q: "Qual o destino daqueles que se recusam a adorar a imagem da besta?", ok: "Seriam mortos", ref: "Apocalipse 13:15", exp: "O sistema evolui de exclusão econômica para perseguição mortal." },
  { q: "Além da marca, quais outras duas formas de identificação para comprar ou vender?", ok: "O nome ou o número do seu nome", ref: "Apocalipse 13:17", exp: "Diferentes níveis de adesão ao sistema mundial." },
  { q: "O número da besta deve ser calculado por quem tem o quê?", ok: "Sabedoria e Inteligência", ref: "Apocalipse 13:18", exp: "Exige discernimento espiritual dado por Deus." },
  { q: "Por que a segunda besta é chamada de 'Falso Profeta'?", ok: "Porque usa sinais religiosos para promover um falso deus", ref: "Teologia", exp: "Ela é o poder religioso que aponta para o poder político." }
];

const MALDICOES_POOL = [
  { cat: "MALEDICAO", q: "SENTENÇA: DECRETO DE MORTE", ref: "PENALIDADE", exp: "O quiz removeu 1 vida sua agora. Sem direito a defesa!", icon: "💀", cor: "#ef4444" },
  { cat: "MALEDICAO", q: "SENTENÇA: JUÍZO IMEDIATO", ref: "VIDA NEGATIVA", exp: "O quiz foi implacável: Você perde 2 vidas agora!", icon: "⚖️", cor: "#ef4444" },
  { cat: "MALEDICAO", q: "SENTENÇA: FOGO CONSUMIDOR", ref: "LIMPEZA", exp: "O quiz removeu todos os seus bônus acumulados agora!", icon: "🔥", cor: "#ef4444" },
  { cat: "MALEDICAO", q: "SENTENÇA: O VOTO DE SILÊNCIO", ref: "REGRA", exp: "Punição Real: Você não pode dizer uma palavra até sua próxima vez!", icon: "🙊", cor: "#ef4444" },
  { cat: "MALEDICAO", q: "SENTENÇA: MARCA DA BESTA", ref: "VULNERÁVEL", exp: "Sentença de isolamento: Você perde 1 vida e não pode pegar bônus de ninguém!", icon: "🚫", cor: "#ef4444" },
  { cat: "MALEDICAO", q: "SENTENÇA: TRIBULAÇÃO", ref: "PEDÁGIO", exp: "O quiz exige o sacrifício imediato de 1 vida sua agora!", icon: "💰", cor: "#ef4444" },
  { cat: "MALEDICAO", q: "SENTENÇA: CÁLICE DA IRA", ref: "DANO CRÍTICO", exp: "O sistema transbordou: Perda de 2 vidas neste momento!", icon: "🍷", cor: "#ef4444" },
  { cat: "MALEDICAO", q: "SENTENÇA: O ÚLTIMO SELO", ref: "LIMITE", exp: "Vulnerabilidade: Suas vidas extras sumiram, restando apenas 1!", icon: "🔓", cor: "#ef4444" },
  { cat: "MALEDICAO", q: "SENTENÇA: LÍNGUA CONFUSA", ref: "PRESSÃO", exp: "Sobrecarga: No seu próximo turno, seu tempo de resposta será cortado!", icon: "🌀", cor: "#ef4444" },
  { cat: "MALEDICAO", q: "SENTENÇA: AREIA MOVEDIÇA", ref: "BLOQUEIO", exp: "Você perdeu 1 vida e seus escudos estão desativados!", icon: "🏜️", cor: "#ef4444" }
];

const PODERES_POOL = [
  { cat: "PODER", q: "BÔNUS: MISERICÓRDIA", ref: "ESCOLHA", exp: "Decida: Ganhe 2 vidas para você OU dê 1 vida para todos os amigos!", icon: "✨", cor: "#facc15" },
  { cat: "PODER", q: "BÔNUS: HERANÇA REAL", ref: "TROCA", exp: "Escolha: Troque sua vida com quem tem mais vidas ou ganhe +1 vida agora!", icon: "🎁", cor: "#facc15" },
  { cat: "PODER", q: "BÔNUS: O INTERCESSOR", ref: "RESSURREIÇÃO", exp: "Escolha: Traga um eliminado de volta ou ganhe +2 vidas para você!", icon: "🙏", cor: "#facc15" },
  { cat: "PODER", q: "BÔNUS: USURPADOR", ref: "SAQUE", exp: "Escolha alguém para tirar 1 vida e somar à sua, ou ganhe 1 vida do sistema!", icon: "🔱", cor: "#facc15" },
  { cat: "PODER", q: "BÔNUS: ESCUDO DE FÉ", ref: "PROTEÇÃO", exp: "O quiz te protege: Na próxima vez que errar, você não perderá vida!", icon: "🛡️", cor: "#facc15" },
  { cat: "PODER", q: "BÔNUS: ARREBATAMENTO", ref: "SALTO", exp: "Invisibilidade: O quiz vai pular você nos próximos 2 giros da garrafa!", icon: "☁️", cor: "#facc15" },
  { cat: "PODER", q: "BÔNUS: DECRETO DO REI", ref: "RESTORE", exp: "O quiz restaurou todas as suas vidas perdidas agora!", icon: "📜", cor: "#facc15" },
  { cat: "PODER", q: "BÔNUS: COLUNA DE FOGO", ref: "FIREWALL", exp: "Você está imune às próximas 2 SENTENÇAS do quiz!", icon: "🔥", cor: "#facc15" },
  { cat: "PODER", q: "BÔNUS: MANÁ DO CÉU", ref: "VIDA EXTRA", exp: "O quiz te deu +2 vidas agora!", icon: "🍞", cor: "#facc15" },
  { cat: "PODER", q: "BÔNUS: ARCA DA ALIANÇA", ref: "BACKUP", exp: "Se você chegar a 0 vidas, este poder te revive com 1 vida!", icon: "📦", cor: "#facc15" }
];

export default function BibleQuizApocalypse() {
  const [iniciado, setIniciado] = useState(false);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [fim, setFim] = useState(false);

  const filaSorteada = useMemo(() => {
    let perguntas = [...QUESTOES_BASE].sort(() => Math.random() - 0.5);
    let final = [];
    perguntas.forEach((p, i) => {
      final.push(p);
      const sorteio = Math.random();
      if (i < perguntas.length - 1) {
        if (sorteio < 0.15) final.push(PODERES_POOL[Math.floor(Math.random() * PODERES_POOL.length)]);
        else if (sorteio < 0.30) final.push(MALDICOES_POOL[Math.floor(Math.random() * MALDICOES_POOL.length)]);
      }
    });
    return final;
  }, []);

  const entrarFullscreen = () => {
    const el = document.documentElement;
    const rfs = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (rfs) rfs.call(el).catch(() => {});
    setIniciado(true);
  };

  const proxima = () => {
    if (index < filaSorteada.length - 1) {
      setIndex(index + 1); setRevealed(false);
    } else { setFim(true); }
  };

  if (!iniciado) return (
    <div style={ui.app} onClick={entrarFullscreen}>
      <div style={ui.backgroundOverlay} />
      <div style={ui.centerBox}>
        <div style={ui.brand}>QUIZ ELITE - APOCALIPSE 13</div>
        <h1 style={ui.hugeText}>INICIAR</h1>
        <p style={{color: '#facc15', letterSpacing: '3px', animation: 'blink 1.5s infinite'}}>CLIQUE PARA TELA CHEIA TOTAL</p>
      </div>
    </div>
  );

  if (fim) return (
    <div style={ui.app}>
      <div style={ui.centerBox}>
        <h1 style={ui.hugeText}>FIM</h1>
        <button onClick={() => window.location.reload()} style={ui.mainBtn}>REINICIAR</button>
      </div>
    </div>
  );

  const item = filaSorteada[index];
  const isPoder = item.cat === "PODER";
  const isMalda = item.cat === "MALEDICAO";
  const anim = isMalda ? 'shake 0.5s infinite' : isPoder ? 'auraGlow 3s infinite ease-in-out' : 'none';

  return (
    <div style={{...ui.app, animation: anim}}>
      <div style={{
        ...ui.backgroundOverlay, 
        background: isMalda ? 'radial-gradient(circle, #400 0%, #000 100%)' : isPoder ? 'radial-gradient(circle, #320 0%, #000 100%)' : 'radial-gradient(circle, #151515 0%, #000 100%)'
      }} />
      
      <header style={ui.header}>
        <div style={{...ui.brand, color: item.cor || '#FFF'}}>{isPoder ? "✨ BÔNUS" : isMalda ? "⚠️ SENTENÇA" : "PERGUNTA"}</div>
        <div style={ui.navGroup}>
          <div style={ui.counter}>{index + 1} / {filaSorteada.length}</div>
          <button onClick={proxima} style={{...ui.mainBtn, background: item.cor || '#FFF'}}>{isPoder || isMalda ? 'CONTINUAR' : 'PRÓXIMA'}</button>
        </div>
      </header>

      <main style={ui.stage}>
        <div style={ui.wrapper}>
          <div style={ui.contentBody}>
            <h1 style={{
                ...ui.question, 
                fontSize: (isPoder || isMalda) ? '5.5rem' : (item.q.length > 80 ? '3rem' : '4rem'), 
                color: item.cor || '#FFF',
                animation: isPoder ? 'float 3s infinite ease-in-out' : 'none'
            }}>
              {item.q}
            </h1>

            {(isPoder || isMalda) ? (
              <div style={{...ui.powerCard, borderColor: item.cor, background: `${item.cor}08`}}>
                <div style={{fontSize: '8rem', marginBottom: '20px'}}>{item.icon}</div>
                <h2 style={{fontSize: '3rem', color: '#FFF'}}>{item.ref}</h2>
                <p style={{fontSize: '1.8rem', color: item.cor}}>{item.exp}</p>
              </div>
            ) : (
              <div style={ui.revealZone}>
                {revealed ? (
                  <div style={ui.ansBox}>
                    <div style={ui.correctBadge}>REVELAÇÃO:</div>
                    <h2 style={ui.answerText}>{item.ok}</h2>
                    <p style={ui.explanationText}><strong>{item.ref}:</strong> {item.exp}</p>
                  </div>
                ) : (
                  <button onClick={() => setRevealed(true)} style={ui.revealBtnLarge}>REVELAR RESPOSTA</button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const ui = {
  app: { position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', background: '#000', color: '#FFF', fontFamily: "system-ui, sans-serif", display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 9999 },
  backgroundOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, transition: '0.8s' },
  header: { padding: '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontSize: '14px', fontWeight: '900', letterSpacing: '6px' },
  navGroup: { display: 'flex', alignItems: 'center', gap: '20px' },
  counter: { fontSize: '18px', fontWeight: '700', opacity: 0.5 },
  mainBtn: { border: 'none', padding: '15px 40px', borderRadius: '100px', cursor: 'pointer', fontWeight: '900', transition: '0.3s' },
  stage: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 80px' },
  wrapper: { width: '100%', maxWidth: '1200px' },
  contentBody: { textAlign: 'center' },
  question: { fontWeight: '900', lineHeight: '1.2', marginBottom: '40px' },
  revealZone: { minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  revealBtnLarge: { background: 'none', border: '2px solid #333', color: '#666', padding: '40px 80px', borderRadius: '30px', fontSize: '1.8rem', fontWeight: '900', cursor: 'pointer' },
  ansBox: { animation: 'fadeIn 0.6s ease', background: 'rgba(255,255,255,0.05)', padding: '50px', borderRadius: '40px' },
  correctBadge: { color: '#facc15', fontSize: '1.2rem', fontWeight: '900', marginBottom: '10px' },
  answerText: { fontSize: '4rem', fontWeight: '900', margin: '0 0 20px 0' },
  explanationText: { fontSize: '1.5rem', color: '#aaa', lineHeight: '1.4' },
  centerBox: { textAlign: 'center', margin: 'auto' },
  hugeText: { fontSize: '12rem', fontWeight: '900', margin: '0' },
  powerCard: { padding: '60px', border: '5px solid', borderRadius: '50px' }
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    @keyframes shake { 0% { transform: translate(1px, 1px) rotate(0deg); } 10% { transform: translate(-1px, -2px) rotate(-1deg); } 20% { transform: translate(-3px, 0px) rotate(1deg); } 50% { transform: translate(-1px, 2px) rotate(-1deg); } 100% { transform: translate(1px, -2px) rotate(-1deg); } }
    @keyframes auraGlow { 0%, 100% { box-shadow: inset 0 0 50px rgba(250, 204, 21, 0.1); } 50% { box-shadow: inset 0 0 150px rgba(250, 204, 21, 0.2); } }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
    body { margin: 0; background: black; overflow: hidden; }
  `;
  document.head.appendChild(style);
}
