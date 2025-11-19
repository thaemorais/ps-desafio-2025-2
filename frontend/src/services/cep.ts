export interface CepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

/**
 * Busca informações de endereço através do CEP usando a API ViaCEP
 * @param cep - CEP a ser consultado (apenas números)
 * @returns Promise com dados do endereço ou null se não encontrado
 */
export async function buscarCep(cep: string): Promise<CepResponse | null> {
  // Remove caracteres não numéricos
  const cepLimpo = cep.replace(/\D/g, '')

  // Valida se tem 8 dígitos
  if (cepLimpo.length !== 8) {
    return null
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    const data: CepResponse = await response.json()

    // Verifica se houve erro na busca
    if (data.erro) {
      return null
    }

    return data
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    return null
  }
}

/**
 * Formata o endereço completo a partir dos dados do CEP e informações adicionais
 * @param cepData - Dados retornados pela API do CEP
 * @param numero - Número do endereço
 * @param complemento - Complemento do endereço (opcional)
 * @returns String com o endereço completo formatado
 */
export function formatarEndereco(
  cepData: CepResponse,
  numero: string,
  complemento?: string,
): string {
  const partes: string[] = []

  if (cepData.logradouro) {
    partes.push(cepData.logradouro)
  }

  if (numero?.trim()) {
    partes.push(numero.trim())
  }

  if (complemento?.trim()) {
    partes.push(complemento.trim())
  }

  if (cepData.bairro) {
    partes.push(cepData.bairro)
  }

  if (cepData.localidade) {
    partes.push(cepData.localidade)
  }

  if (cepData.uf) {
    partes.push(cepData.uf)
  }

  if (cepData.cep) {
    const cepFormatado = cepData.cep.replace(/(\d{5})(\d{3})/, '$1-$2')
    partes.push(`CEP: ${cepFormatado}`)
  }

  return partes.join(', ')
}

/**
 * Extrai CEP, número e complemento de um endereço existente
 * @param endereco - Endereço completo formatado
 * @returns Objeto com cep, numero e complemento extraídos
 */
export function extrairDadosEndereco(endereco: string): {
  cep: string
  numero: string
  complemento: string
} {
  const resultado = {
    cep: '',
    numero: '',
    complemento: '',
  }

  // Extrai CEP (formato: CEP: 12345-678 ou CEP:12345678)
  const cepMatch = endereco.match(/CEP:\s*(\d{5}-?\d{3})/i)
  if (cepMatch) {
    resultado.cep = cepMatch[1].replace(/-/g, '')
  }

  // Divide o endereço por vírgulas
  const partes = endereco.split(',').map((p) => p.trim())

  // O logradouro geralmente é a primeira parte
  // O número geralmente está na segunda parte (se for apenas números)
  if (partes.length > 1) {
    const segundaParte = partes[1]
    const numeroMatch = segundaParte?.match(/^(\d+)/)
    if (numeroMatch) {
      resultado.numero = numeroMatch[1]
      // Se houver texto após o número na mesma parte, pode ser complemento
      const resto = segundaParte.substring(numeroMatch[0].length).trim()
      if (resto) {
        resultado.complemento = resto
      }
    } else if (partes.length > 2) {
      // Se a segunda parte não é número, pode ser complemento
      resultado.complemento = segundaParte
      // Tenta encontrar número na terceira parte
      const numeroMatch = partes[2]?.match(/^(\d+)/)
      if (numeroMatch) {
        resultado.numero = numeroMatch[1]
      }
    }
  }

  return resultado
}

