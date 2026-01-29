import React, { useState, useEffect, useMemo } from 'react';

const QUESTOES_MARISTA = [
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
  const filaSorteada = useMemo(() => [...QUESTOES_MARISTA].sort(() => Math.random() - 0.5), []);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [timer, setTimer] = useState(25);
  const [isPaused, setIsPaused] = useState(false);
  const [fim, setFim] = useState(false);

  const q = filaSorteada[index];

  useEffect(() => {
    if (isPaused || revealed || fim) return;
    const itv = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { setRevealed(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(itv);
  }, [isPaused, revealed, index, fim]);

  const nav = () => {
    if (index < filaSorteada.length - 1) {
      setIndex(index + 1); setRevealed(false); setTimer(25);
    } else { setFim(true); }
  };

  if (fim) return (
    <div style={ui.app}>
      <div style={ui.centerBox}>
        <h1 style={ui.hugeText}>Fim</h1>
        <p style={ui.subText}>O ciclo de questões foi concluído com sucesso.</p>
        <button onClick={() => window.location.reload()} style={ui.mainBtn}>RECOMEÇAR</button>
      </div>
    </div>
  );

  return (
    <div style={ui.app}>
      <header style={ui.header}>
        <div style={ui.brand}>QUIZ <span></span></div>
        <div style={ui.navGroup}>
          <div style={ui.counter}>Q. {index + 1} / {filaSorteada.length}</div>
          <button onClick={() => setIsPaused(!isPaused)} style={ui.ghostBtn}>{isPaused ? 'PLAY' : 'STOP'}</button>
          <button onClick={nav} style={ui.mainBtn}>PRÓXIMA</button>
        </div>
      </header>

      <main style={ui.stage}>
        <div style={ui.wrapper}>
          <div style={ui.timeline}>
            <div style={{...ui.progress, width: `${(timer / 25) * 100}%`, background: revealed ? '#333' : '#fff'}} />
          </div>

          <div style={ui.contentBody}>
            <span style={ui.category}>{q.cat}</span>
            <h1 style={{...ui.question, fontSize: q.q.length > 75 ? '3rem' : '4.5rem'}}>
              {q.q}
            </h1>

            <div style={ui.optionsGrid}>
              {q.opts.map((o, i) => (
                <div key={i} style={{
                  ...ui.optionCard,
                  background: revealed ? (o === q.ok ? '#1e3a8a' : '#111') : '#111',
                  color: revealed && o !== q.ok ? '#444' : '#fff',
                  border: revealed && o === q.ok ? '4px solid #3b82f6' : '2px solid #222'
                }}>
                  <span style={ui.letter}>{String.fromCharCode(65 + i)}</span>
                  {o}
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
                <button onClick={() => setRevealed(true)} style={ui.revealLink}>Revelar Gabarito</button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const ui = {
  app: { height: '100vh', width: '100vw', background: '#000000', color: '#ffffff', fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  header: { padding: '20px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222' },
  brand: { fontSize: '14px', fontWeight: '900', letterSpacing: '4px', color: '#444' },
  navGroup: { display: 'flex', alignItems: 'center', gap: '20px' },
  counter: { fontSize: '14px', fontWeight: '900', color: '#fff', background: '#222', padding: '8px 16px', borderRadius: '4px' },
  ghostBtn: { background: 'none', border: 'none', color: '#666', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' },
  mainBtn: { background: '#fff', color: '#000', border: 'none', padding: '12px 28px', borderRadius: '4px', fontSize: '12px', fontWeight: '900', cursor: 'pointer' },
  stage: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 5%' },
  wrapper: { width: '100%', maxWidth: '1200px' },
  timeline: { width: '100%', height: '6px', background: '#111', marginBottom: '40px', borderRadius: '10px', overflow: 'hidden' },
  progress: { height: '100%', transition: 'width 1s linear' },
  contentBody: { textAlign: 'center' },
  category: { fontSize: '14px', fontWeight: '900', color: '#3b82f6', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '20px', display: 'block' },
  question: { fontWeight: '900', color: '#ffffff', lineHeight: '1.1', marginBottom: '50px', letterSpacing: '-0.02em' },
  optionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
  optionCard: { padding: '35px 45px', borderRadius: '12px', fontSize: '2.2rem', fontWeight: '900', textAlign: 'left', display: 'flex', alignItems: 'center', transition: 'all 0.3s ease' },
  letter: { color: '#3b82f6', fontWeight: '900', fontSize: '20px', marginRight: '30px' },
  revealZone: { marginTop: '50px', height: '180px' },
  revealLink: { background: 'none', border: '2px solid #333', color: '#666', padding: '10px 30px', borderRadius: '30px', fontSize: '14px', fontWeight: '900', cursor: 'pointer' },
  ansBox: { animation: 'fadeIn 0.5s ease' },
  referenceText: { fontSize: '6rem', fontWeight: '900', color: '#fff', margin: 0 },
  explanationText: { fontSize: '1.5rem', color: '#888', marginTop: '10px', maxWidth: '800px', margin: '10px auto' },
  centerBox: { textAlign: 'center' },
  hugeText: { fontSize: '12rem', fontWeight: '900', margin: 0 },
  subText: { color: '#444', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '14px' }
};
