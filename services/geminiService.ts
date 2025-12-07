import { DesignType, type Design } from '../types';

interface DesignConfig {
  type: DesignType;
  promptSuffix: string;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3';
}

const designConfigs: DesignConfig[] = [
  // 3 Logos
  { type: DesignType.LOGO, promptSuffix: 'logo minimalista vetorial, fundo branco sólido, design limpo.', aspectRatio: '1:1' },
  { type: DesignType.LOGO, promptSuffix: 'logotipo em formato de emblema, estilo premium e elegante.', aspectRatio: '1:1' },
  { type: DesignType.LOGO, promptSuffix: 'logotipo moderno com ícone abstrato, cores vibrantes.', aspectRatio: '1:1' },
  // 2 Covers
  { type: DesignType.COVER, promptSuffix: 'capa para perfil de rede social (Facebook), imagem cinematográfica de alta resolução.', aspectRatio: '16:9' },
  { type: DesignType.COVER, promptSuffix: 'arte de capa para canal (YouTube), design gráfico arrojado e chamativo.', aspectRatio: '16:9' },
  // 3 Banners
  { type: DesignType.BANNER, promptSuffix: 'banner para website (wide), profissional, com espaço para texto.', aspectRatio: '16:9' },
  { type: DesignType.BANNER, promptSuffix: 'banner promocional, anunciando uma oferta especial, visualmente impactante.', aspectRatio: '4:3' },
  { type: DesignType.BANNER, promptSuffix: 'banner vertical para anúncio digital, focado em conversão.', aspectRatio: '9:16' },
  // 2 Posts
  { type: DesignType.POST, promptSuffix: 'post para rede social (Instagram), foto estilizada do produto ou conceito.', aspectRatio: '1:1' },
  { type: DesignType.POST, promptSuffix: 'post para rede social (Instagram), design gráfico informativo com tipografia forte.', aspectRatio: '1:1' },
];

// Helper to get dimensions from aspect ratio
const getDimensions = (aspectRatio: '1:1' | '16:9' | '9:16' | '4:3'): { width: number, height: number } => {
    switch (aspectRatio) {
        case '16:9': return { width: 800, height: 450 };
        case '9:16': return { width: 450, height: 800 };
        case '4:3': return { width: 800, height: 600 };
        case '1:1':
        default: return { width: 500, height: 500 };
    }
}


export async function generateDesigns(basePrompt: string): Promise<Design[]> {
  // Simulate API call delay for a better UX
  await new Promise(resolve => setTimeout(resolve, 3000));

  const results: Design[] = designConfigs.map((config, index) => {
    const fullPrompt = `Para uma marca sobre "${basePrompt}", crie um ${config.type}: ${config.promptSuffix}`;
    const { width, height } = getDimensions(config.aspectRatio);
    // Use a unique seed for each image based on prompt and index to get different images per generation
    const seed = `${basePrompt.slice(0, 10)}-${index}-${Date.now()}`;
    
    const imageUrl = `https://picsum.photos/seed/${seed}/${width}/${height}`;

    return {
      id: `${Date.now()}-${index}`,
      type: config.type,
      imageUrl,
      prompt: fullPrompt,
    };
  });
  
  // Randomly shuffle to make it feel more "generated"
  return results.sort(() => Math.random() - 0.5);
}