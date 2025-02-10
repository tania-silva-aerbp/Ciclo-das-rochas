document.addEventListener('DOMContentLoaded', () => {
  const rockGroups = document.querySelectorAll('.rock-group');
  const rockInfo = document.getElementById('rock-info');
  
  const rockData = {
    'metamórfica': {
      title: 'Rochas Metamórficas',
      description: 'Formadas quando rochas existentes são submetidas a altas temperaturas e pressões. Exemplos incluem mármore e xisto.',
      process: 'O metamorfismo ocorre quando rochas são submetidas a condições extremas de temperatura e pressão, sem chegar a derreter completamente.',
      interactions: [
        'Pode se transformar em rocha ígnea através de fusão completa',
        'Pode se transformar em sedimentos através de intemperismo e erosão',
        'Pode sofrer metamorfismo adicional sob novas condições de pressão e temperatura'
      ]
    },
    'ígnea': {
      title: 'Rochas Ígneas',
      description: 'Formadas pelo resfriamento e solidificação do magma ou lava. Exemplos incluem granito e basalto.',
      process: 'O magma resfria e cristaliza, tanto na superfície (rochas vulcânicas) quanto em profundidade (rochas plutônicas).',
      interactions: [
        'Pode se transformar em rocha metamórfica através de pressão e temperatura',
        'Pode se transformar em sedimentos através de intemperismo e erosão',
        'Pode ser refundida para formar novo magma'
      ]
    },
    'sedimentar': {
      title: 'Rochas Sedimentares',
      description: 'Formadas pela compactação e cimentação de sedimentos. Exemplos incluem arenito e calcário.',
      process: 'Sedimentos são depositados em camadas e, ao longo do tempo, são compactados e cimentados para formar rochas.',
      interactions: [
        'Pode se transformar em rocha metamórfica através de pressão e temperatura',
        'Pode ser erodida para formar novos sedimentos',
        'Pode ser dissolvida e recristalizada (diagênese)'
      ]
    },
    'magma': {
      title: 'Magma',
      description: 'Material rochoso fundido que existe abaixo da superfície da Terra. Quando chega à superfície, é chamado de lava.',
      process: 'O magma é formado pela fusão parcial ou total de rochas devido a altas temperaturas e pressões no interior da Terra.',
      interactions: [
        'Resfria e solidifica para formar rochas ígneas',
        'Pode incorporar e fundir outras rochas',
        'Interage com rochas encaixantes causando metamorfismo de contato'
      ]
    }
  };

  let activeRock = null;

  rockGroups.forEach(group => {
    group.addEventListener('click', () => {
      if (activeRock) {
        activeRock.classList.remove('active');
      }
      
      group.classList.add('active');
      activeRock = group;
      
      const rockType = group.dataset.type;
      const data = rockData[rockType];
      
      rockInfo.innerHTML = `
        <h3>${data.title}</h3>
        <p><strong>Descrição:</strong> ${data.description}</p>
        <p><strong>Processo de Formação:</strong> ${data.process}</p>
        <div class="interaction-details">
          <h4>Interações com outros tipos de rochas:</h4>
          <ul>
            ${data.interactions.map(interaction => `<li>${interaction}</li>`).join('')}
          </ul>
        </div>
      `;
    });
    
    group.addEventListener('mouseenter', () => {
      group.style.filter = 'brightness(1.2)';
    });
    
    group.addEventListener('mouseleave', () => {
      group.style.filter = 'brightness(1)';
    });
  });

  // Glossário de termos
  const glossary = {
    'fusão': 'Processo onde a rocha é aquecida até derreter, transformando-se em magma.',
    'magma': 'Rocha derretida no interior da Terra, rica em minerais e gases dissolvidos.',
    'intemperismo': 'Conjunto de processos que causam a decomposição e desintegração das rochas expostas na superfície terrestre.',
    'erosão': 'Processo de desgaste, transporte e deposição de materiais da superfície terrestre.',
    'metamorfismo': 'Transformação de rochas através de alterações na temperatura, pressão ou ambiente químico, sem derretimento completo.',
    'pressão': 'Força exercida sobre as rochas, geralmente pelo peso das camadas superiores ou movimentos tectônicos.',
    'temperatura': 'Nível de calor que afeta as rochas, podendo causar mudanças em sua estrutura e composição.',
    'sedimentação': 'Acúmulo e deposição de partículas minerais e orgânicas transportadas pela água, vento ou gelo.',
    'recristalização': 'Reorganização dos minerais em uma rocha, formando novos cristais sem mudança na composição química.',
    'refusão': 'Processo onde uma rocha ígnea é novamente derretida, voltando ao estado de magma.',
    'diagênese': 'Conjunto de processos físicos e químicos que transformam sedimentos em rochas sedimentares.'
  };

  // Criar popup de informação
  const createInfoPopup = () => {
    const popup = document.createElement('div');
    popup.className = 'term-popup';
    document.body.appendChild(popup);
    return popup;
  };

  const popup = createInfoPopup();

  // Adicionar listeners para os termos
  document.querySelectorAll('.process-label').forEach(label => {
    const text = label.textContent.toLowerCase().trim();
    
    Object.keys(glossary).forEach(term => {
      if (text.includes(term)) {
        label.classList.add('has-info');
        label.addEventListener('mouseenter', (e) => {
          popup.textContent = glossary[term];
          popup.style.left = `${e.pageX + 10}px`;
          popup.style.top = `${e.pageY + 10}px`;
          popup.classList.add('visible');
        });
        
        label.addEventListener('mouseleave', () => {
          popup.classList.remove('visible');
        });
      }
    });
  });
});