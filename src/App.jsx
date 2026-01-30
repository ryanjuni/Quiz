import React, { useState, useEffect, useMemo } from 'react';


const QUESTOES_MARISTA = [
  // PÁGINA 1
  { cat: "PARENTESCO", q: "Quais os nomes das noras de Noemi?", opts: ["Orfa e Rute", "Raquel e Lia", "Ana e Penina", "Sará e Agar"], ok: "Orfa e Rute", ref: "Rute 1:4", exp: "Mulheres moabitas que se casaram com os filhos de Noemi." },
  { cat: "CRUCIFICAÇÃO", q: "Qual descrição estava escrita na cruz de Jesus?", opts: ["Este é o Rei dos Judeus", "Jesus de Nazaré", "O Messias Prometido", "Rei de Israel"], ok: "Este é o Rei dos Judeus", ref: "Lucas 23:38", exp: "Escrito em grego, latim e hebraico por ordem de Pilatos." },
  { cat: "ATOS", q: "Quem ungiu os olhos de Paulo para que voltasse a enxergar?", opts: ["Ananias", "Pedro", "Barnabé", "Silas"], ok: "Ananias", ref: "Atos 9:17-18", exp: "Ananias foi o instrumento de Deus para a cura e batismo de Saulo." },
  { cat: "NATIVIDADE", q: "Quais os presentes que Jesus ganhou dos magos ao visitá-lo?", opts: ["Ouro, Incenso e Mirra", "Ouro, Prata e Bronze", "Incenso, Seda e Mirra", "Joias e Especiarias"], ok: "Ouro, Incenso e Mirra", ref: "Mateus 2:11", exp: "Presentes que reconheciam Jesus como Rei, Deus e Homem." },
  { cat: "MINISTÉRIO", q: "Quantos anos durou o ministério de Jesus na Terra?", opts: ["3 anos", "1 ano", "7 anos", "12 anos"], ok: "3 anos", ref: "Registros Bíblicos", exp: "Período compreendido entre seu batismo e sua ascensão." },
  { cat: "PROFETAS", q: "Quem foi o sucessor do profeta Elias?", opts: ["Eliseu", "Isaías", "Jeremias", "Enoque"], ok: "Eliseu", ref: "2 Reis 2:15", exp: "Ele presenciou a subida de Elias em um redemoinho." },
  { cat: "PARENTESCO", q: "Qual o nome da mãe do profeta Samuel?", opts: ["Ana", "Isabel", "Miriã", "Débora"], ok: "Ana", ref: "1 Samuel 1:20", exp: "Seu nome significa 'Graça' ou 'Favor'." },
  { cat: "PROFETAS", q: "Por que Jonas foi parar no ventre do peixe?", opts: ["Desobedeceu a Deus", "Caiu do barco", "Queria pescar", "Foi um castigo de Nínive"], ok: "Desobedeceu a Deus", ref: "Jonas 1:17", exp: "Tentou fugir do chamado de Deus para pregar em Nínive." },
  { cat: "DISCÍPULOS", q: "Quem foram os três discípulos mais próximos de Jesus?", opts: ["Pedro, Tiago e João", "Pedro, André e Filipe", "Mateus, Tomé e Judas", "João, Judas e Tiago"], ok: "Pedro, Tiago e João", ref: "Mateus 17:1", exp: "O círculo íntimo que presenciou a Transfiguração." },
  { cat: "APOCALIPSE", q: "Quais eram os nomes das igrejas citadas no livro de Apocalipse?", opts: ["As 7 igrejas da Ásia", "As 12 igrejas de Israel", "Igrejas da Galileia", "Igrejas de Roma e Corinto"], ok: "As 7 igrejas da Ásia", ref: "Apocalipse 1:11", exp: "Mensagens enviadas para comunidades específicas na Ásia Menor." },
  { cat: "DILÚVIO", q: "Quais os nomes dos filhos de Noé?", opts: ["Sem, Cam e Jafé", "Caim, Abel e Sete", "Isaac, Jacó e Esaú", "Rúben, Simeão e Levi"], ok: "Sem, Cam e Jafé", ref: "Gênesis 6:10", exp: "Eles repovoaram a terra após o dilúvio." },
  { cat: "DILÚVIO", q: "Quantos dias durou a chuva do dilúvio?", opts: ["40 dias e 40 noites", "7 dias", "100 dias", "12 meses"], ok: "40 dias e 40 noites", ref: "Gênesis 7:12", exp: "O período em que as comportas do céu se abriram." },
  { cat: "ISRAEL", q: "Quais os nomes dos espiões que trouxeram relatório bom de Canaã?", opts: ["Josué e Calebe", "Moisés e Arão", "Gideão e Sansão", "Davi e Jônatas"], ok: "Josué e Calebe", ref: "Números 14:6", exp: "Os únicos que acreditaram na vitória dada por Deus." },
  { cat: "MILAGRES", q: "Quantas pessoas Jesus ressuscitou segundo os Evangelhos?", opts: ["3 pessoas", "1 pessoa", "7 pessoas", "12 pessoas"], ok: "3 pessoas", ref: "Evangelhos", exp: "Lázaro, a filha de Jairo e o filho da viúva de Naim." },
  { cat: "FESTAS", q: "Quais os nomes das principais festas bíblicas?", opts: ["Páscoa, Pentecostes e Tabernáculos", "Natal, Páscoa e Epifania", "Purim e Hanukkah", "Festa das Luzes e Trombetas"], ok: "Páscoa, Pentecostes e Tabernáculos", ref: "Levítico 23", exp: "As celebrações solenes do calendário judaico." },
  { cat: "PARENTESCO", q: "Quais os nomes dos filhos de José no Egito?", opts: ["Manassés e Efraim", "Rúben e Simeão", "Fares e Zerá", "Gerson e Eliezer"], ok: "Manassés e Efraim", ref: "Gênesis 41:51-52", exp: "Nascidos antes dos anos de fome no Egito." },
  { cat: "REALEZA", q: "Qual o nome da rainha que perseguiu o profeta Elias?", opts: ["Jezabel", "Ester", "Atalia", "Vasti"], ok: "Jezabel", ref: "1 Reis 19:1-2", exp: "Esposa de Acabe, introduziu o culto a Baal em Israel." },
  { cat: "APOCALIPSE", q: "Qual o número dos selados segundo o livro de Apocalipse?", opts: ["144.000", "12.000", "7.000", "Uma multidão incontável"], ok: "144.000", ref: "Apocalipse 7:4", exp: "Doze mil de cada tribo dos filhos de Israel." },
  { cat: "PROFECIA", q: "Quanto tempo as duas testemunhas vão profetizar sobre a terra?", opts: ["1.260 dias", "7 anos", "40 dias", "3 anos"], ok: "1.260 dias", ref: "Apocalipse 11:3", exp: "Período em que estarão vestidas de saco." },
  { cat: "PROFECIA", q: "Segundo a Bíblia, por quantos anos Satanás ficará preso?", opts: ["1.000 anos", "100 anos", "Para sempre", "7 anos"], ok: "1.000 anos", ref: "Apocalipse 20:2", exp: "O período do reinado milenar de Cristo." },
  { cat: "PROFECIA", q: "Segundo o Apocalipse, onde ocorrerá a batalha final?", opts: ["Armagedom", "Vale de Josafá", "Jerusalém", "Monte Sinai"], ok: "Armagedom", ref: "Apocalipse 16:16", exp: "O monte Megido, local de decisão espiritual." },
  { cat: "ÊXODO", q: "Qual o nome do monte onde Moisés viu a sarça ardente?", opts: ["Horebe", "Sinai", "Moriá", "Carmelo"], ok: "Horebe", ref: "Êxodo 3:1", exp: "Onde Deus se revelou como 'EU SOU O QUE SOU'." },
  { cat: "APOCALIPSE", q: "Qual a semelhança da 2ª Besta descrita em Apocalipse?", opts: ["Semelhante a um cordeiro", "Semelhante a um leão", "Semelhante a um dragão", "Semelhante a um homem"], ok: "Semelhante a um cordeiro", ref: "Apocalipse 13:11", exp: "Tinha aparência de mansidão, mas voz de destruição." }
];

export default function SanctuaryQuizElite() {
  const [iniciado, setIniciado] = useState(false);
  const filaSorteada = useMemo(() => [...QUESTOES_MARISTA].sort(() => Math.random() - 0.5), []);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [timer, setTimer] = useState(25);
  const [isPaused, setIsPaused] = useState(false);
  const [fim, setFim] = useState(false);

  const ativarFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    setIniciado(true);
  };

  useEffect(() => {
    if (!iniciado || revealed || fim || isPaused) return;
    const itv = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { setRevealed(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(itv);
  }, [iniciado, revealed, index, fim, isPaused]);

  const nav = () => {
    if (index < filaSorteada.length - 1) {
      setIndex(index + 1); setRevealed(false); setTimer(25); setIsPaused(false);
    } else { setFim(true); }
  };

  if (!iniciado) {
    return (
      <div style={ui.app} onClick={ativarFullscreen}>
        <div style={ui.backgroundOverlay} />
        <div style={ui.centerBox}>
          <div style={ui.brand}>QUIZ BÍBLICO</div>
          <h1 style={{...ui.hugeText, fontSize: '8rem', marginBottom: '40px'}}>CLIQUE PARA<br/>INICIAR</h1>
        </div>
      </div>
    );
  }

  if (fim) return (
    <div style={ui.app}>
      <div style={ui.centerBox}>
        <h1 style={ui.hugeText}>FIM</h1>
        <button onClick={() => window.location.reload()} style={ui.mainBtn}>REINICIAR</button>
      </div>
    </div>
  );

  const q = filaSorteada[index];

  return (
    <div style={ui.app}>
      <div style={ui.backgroundOverlay} />
      <header style={ui.header}>
        <div style={ui.brand}>BIBLE</div>
        <div style={ui.navGroup}>
          <div style={ui.counter}>{index + 1} / {filaSorteada.length}</div>
          <button onClick={() => setIsPaused(!isPaused)} style={ui.stopBtn}>{isPaused ? 'RESUME' : 'STOP'}</button>
          <button onClick={nav} style={ui.mainBtn}>PRÓXIMA</button>
        </div>
      </header>

      <main style={ui.stage}>
        <div style={ui.wrapper}>
          <div style={ui.timerContainer}>
             <div style={{...ui.progressBar, width: `${(timer / 25) * 100}%`, background: isPaused ? '#facc15' : '#FFF'}} />
          </div>

          <div style={ui.contentBody}>
            {/* Pergunta: Diminui opacidade ao revelar para dar foco na resposta */}
            <h1 style={{...ui.question, fontSize: q.q.length > 60 ? '3rem' : '4.5rem', opacity: revealed ? 0.3 : 1}}>
              {q.q}
            </h1>

            <div style={ui.optionsGrid}>
              {q.opts.map((o, i) => (
                <div key={i} style={{
                  ...ui.optionCard,
                  background: revealed && o === q.ok ? '#FFFFFF' : 'transparent',
                  color: revealed ? (o === q.ok ? '#000' : '#333') : '#FFF',
                  borderColor: revealed && o === q.ok ? '#FFF' : '#222',
                  transform: revealed && o === q.ok ? 'scale(1.02)' : 'scale(1)',
                }}>
                  <span style={ui.letter}>{String.fromCharCode(65 + i)}</span>{o}
                </div>
              ))}
            </div>

            <div style={ui.revealZone}>
              {revealed ? (
                <div style={ui.ansBox}>
                  <h2 style={ui.referenceText}>{q.ref}</h2>
                  <p style={ui.explanationText}>{q.exp}</p>
                </div>
              ) : (
                <button onClick={() => setRevealed(true)} style={ui.revealBtn}>REVELAR RESPOSTA</button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const ui = {
  app: { height: '100vh', width: '100vw', background: '#000', color: '#FFF', fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' },
  backgroundOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, #111 0%, #000 100%)', zIndex: -1 },
  header: { padding: '40px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontSize: '12px', fontWeight: '900', letterSpacing: '8px', opacity: 0.4 },
  navGroup: { display: 'flex', alignItems: 'center', gap: '30px' },
  counter: { fontSize: '20px', fontWeight: '900', opacity: 0.7 },
  stopBtn: { background: 'none', border: '1px solid #333', color: '#666', padding: '10px 20px', borderRadius: '100px', fontSize: '12px', fontWeight: '900', cursor: 'pointer' },
  mainBtn: { background: '#FFF', color: '#000', border: 'none', padding: '12px 35px', fontWeight: '900', fontSize: '14px', borderRadius: '100px', cursor: 'pointer' },
  stage: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '5vh' },
  wrapper: { width: '100%', maxWidth: '1200px' },
  timerContainer: { width: '100%', height: '3px', background: '#111', marginBottom: '60px' },
  progressBar: { height: '100%', transition: 'width 1s linear' },
  contentBody: { textAlign: 'center' },
  question: { fontWeight: '900', lineHeight: '1.1', marginBottom: '60px', letterSpacing: '-0.02em', transition: '0.5s' },
  optionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  optionCard: { padding: '30px 40px', fontSize: '2.2rem', fontWeight: '900', border: '2px solid', borderRadius: '12px', textAlign: 'left', display: 'flex', alignItems: 'center', transition: '0.4s' },
  letter: { opacity: 0.3, marginRight: '20px', fontSize: '18px' },
  revealZone: { marginTop: '50px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  revealBtn: { background: 'none', border: '1px solid #333', color: '#444', padding: '15px 40px', borderRadius: '100px', fontSize: '12px', fontWeight: '900', cursor: 'pointer', letterSpacing: '3px' },
  ansBox: { animation: 'fadeIn 0.6s ease' },
  // TAMANHO AJUSTADO DO VERSÍCULO
  referenceText: { fontSize: '3.5rem', fontWeight: '900', color: '#FFF', margin: '0 0 10px 0', letterSpacing: '-1px' },
  explanationText: { fontSize: '1.4rem', color: '#888', maxWidth: '800px', margin: '0 auto', lineHeight: '1.4', fontWeight: '500' },
  centerBox: { textAlign: 'center', margin: 'auto' },
  hugeText: { fontSize: '12rem', fontWeight: '900', letterSpacing: '-10px' }
};
