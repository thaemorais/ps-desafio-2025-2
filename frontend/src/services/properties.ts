import { propertyType } from '@/types/property'
import { propertiesMock } from '@/mocks/properties'

export async function listarPropriedades(): Promise<propertyType[]> {
  // TODO: Substituir por chamada à API quando o backend estiver disponível.
  return propertiesMock
}

export async function buscarImovelPorId(id: string): Promise<propertyType | null> {
  // TODO: Substituir por chamada à API quando o backend estiver disponível.
  const imovelEncontrado = propertiesMock.find((item) => item.id === id)
  return imovelEncontrado ?? null
}


