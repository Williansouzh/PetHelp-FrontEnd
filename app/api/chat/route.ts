import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Prompt do sistema para orientar o comportamento do assistente
const systemPrompt = `Você é um assistente virtual especializado em cuidados com animais, primeiros socorros para pets, identificação de raças e doenças em animais domésticos.

DIRETRIZES:
1. Forneça informações precisas e úteis sobre primeiros socorros para animais em situações de emergência.
2. Ajude a identificar raças de cães e gatos com base em descrições.
3. Forneça informações sobre possíveis doenças com base em sintomas descritos.
4. Sempre enfatize a importância de buscar atendimento veterinário profissional, especialmente em emergências.
5. Seja claro, conciso e empático em suas respostas.
6. Quando não tiver certeza, indique isso claramente e sugira consultar um veterinário.
7. Não forneça diagnósticos definitivos, apenas orientações gerais.
8. Use linguagem simples e acessível.

IMPORTANTE: Sempre inclua um aviso de que suas orientações não substituem o atendimento veterinário profissional quando estiver respondendo sobre emergências ou possíveis doenças.

Responda em português do Brasil.`

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Adiciona o prompt do sistema como a primeira mensagem
    const apiMessages = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ]

    const result = streamText({
      model: openai("gpt-4o"),
      messages: apiMessages,
    })

    // Retorna o stream como resposta
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "Erro ao processar a solicitação" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
