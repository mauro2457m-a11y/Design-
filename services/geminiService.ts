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

// Armazena a instância do cliente para evitar recriações.
let aiClient: any = null;

/**
 * Inicializa e retorna o cliente GoogleGenAI de forma tardia (lazy),
 * importando a biblioteca dinamicamente no primeiro uso.
 * Lança um erro se a chave de API não estiver disponível no ambiente.
 */
async function getAiClient(): Promise<any> {
  if (aiClient) {
    return aiClient;
  }
  
  const { GoogleGenAI } = await import('@google/genai');

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("A chave de API (API_KEY) não foi encontrada no ambiente.");
    throw new Error("A chave de API do Google não está configurada. Não é possível gerar imagens.");
  }
  
  aiClient = new GoogleGenAI({ apiKey });
  return aiClient;
}


async function generateSingleDesign(basePrompt: string, config: DesignConfig, index: number): Promise<Design> {
  const fullPrompt = `Para uma marca sobre "${basePrompt}", crie um ${config.type}: ${config.promptSuffix}`;

  try {
    const ai = await getAiClient(); // Inicializa e importa o cliente no primeiro uso

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: config.aspectRatio,
        },
      },
    });

    // Encontra a parte da imagem na resposta
    const imagePart = response.candidates?.[0]?.content?.parts.find((p: any) => p.inlineData);
    if (!imagePart || !imagePart.inlineData) {
      throw new Error(`Não foi possível encontrar dados da imagem para: ${config.type}`);
    }

    const base64ImageData = imagePart.inlineData.data;
    const imageUrl = `data:image/png;base64,${base64ImageData}`;

    return {
      id: `${Date.now()}-${index}`,
      type: config.type,
      imageUrl,
      prompt: fullPrompt,
    };
  } catch (error) {
    console.error(`Erro ao gerar design (${config.type}):`, error);
    // Relança o erro para ser capturado pelo Promise.allSettled
    throw error;
  }
}

export async function generateDesigns(basePrompt: string): Promise<Design[]> {
  const generationPromises = designConfigs.map((config, index) =>
    generateSingleDesign(basePrompt, config, index)
  );

  // Usa Promise.allSettled para lidar com falhas individuais de forma graciosa
  const results = await Promise.allSettled(generationPromises);

  const successfulDesigns: Design[] = [];
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      successfulDesigns.push(result.value);
    } else {
      // Registra o erro, mas não interrompe todo o processo
      console.error("Um design falhou ao ser gerado:", result.reason);
    }
  });

  if (successfulDesigns.length === 0) {
    // Se todos falharem, lança um erro geral para ser exibido ao usuário
    throw new Error("Todos os designs falharam ao serem gerados. Verifique o console para mais detalhes.");
  }
  
  // Embaralha aleatoriamente para parecer mais "gerado"
  return successfulDesigns.sort(() => Math.random() - 0.5);
}