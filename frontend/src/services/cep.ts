export interface CepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export async function buscarCep(cep: string): Promise<CepResponse | null> {
  const cepLimpo = cep.replace(/\D/g, '')
  if (cepLimpo.length !== 8) return null

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    const data: CepResponse = await response.json()
    return data.erro ? null : data
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    return null
  }
}

export function formatarEndereco(
  cepData: CepResponse,
  numero: string,
  complemento?: string,
): string {
  const partes = [
    cepData.logradouro,
    numero?.trim(),
    complemento?.trim(),
    cepData.bairro,
    cepData.localidade,
    cepData.uf,
    cepData.cep && `CEP: ${cepData.cep.replace(/(\d{5})(\d{3})/, '$1-$2')}`,
  ].filter(Boolean) as string[]

  return partes.join(', ')
}

export function extrairDadosEndereco(endereco: string): {
  cep: string
  numero: string
  complemento: string
} {
  const resultado = { cep: '', numero: '', complemento: '' }

  const cepMatch = endereco.match(/CEP:\s*(\d{5}-?\d{3})/i)
  if (cepMatch) {
    resultado.cep = cepMatch[1].replace(/-/g, '')
  }

  const partes = endereco.split(',').map((p) => p.trim())
  if (partes.length <= 1) return resultado

  const segundaParte = partes[1]
  const numeroMatch = segundaParte?.match(/^(\d+)/)

  if (numeroMatch) {
    resultado.numero = numeroMatch[1]
    const resto = segundaParte.substring(numeroMatch[0].length).trim()
    if (resto) resultado.complemento = resto
  } else if (partes.length > 2) {
    resultado.complemento = segundaParte
    const numeroMatch2 = partes[2]?.match(/^(\d+)/)
    if (numeroMatch2) resultado.numero = numeroMatch2[1]
  }

  return resultado
}

