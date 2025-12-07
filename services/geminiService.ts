import { GoogleGenAI } from '@google/genai';
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

export async function generateDesigns(basePrompt: string): Promise<Design[]> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const generationPromises = designConfigs.map(async (config, index) => {
    const fullPrompt = `Para uma marca sobre "${basePrompt}", crie um ${config.type}: ${config.promptSuffix}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: config.aspectRatio,
          imageSize: '1K',
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        const imageUrl = `data:image/png;base64,${base64EncodeString}`;
        return {
          id: `${Date.now()}-${index}`,
          type: config.type,
          imageUrl,
          prompt: fullPrompt,
        };
      }
    }
    throw new Error(`Nenhuma imagem gerada para o prompt: ${fullPrompt}`);
  });

  const results = await Promise.all(generationPromises);
  return results;
}
