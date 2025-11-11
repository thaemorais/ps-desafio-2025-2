import categoriesMock from './categories'
import { propertyType } from '../types/property'
import { Category } from '../types/category'

const categoryById = categoriesMock.reduce<Record<string, Category>>(
  (accumulator, category) => {
    accumulator[category.id] = category
    return accumulator
  },
  {},
)

const getCategory = (categoryId: string): Category =>
  categoryById[categoryId] ?? categoriesMock[0]

export const propertiesMock: propertyType[] = [
  {
    id: 'b2c7e7dd-2f1b-4c6d-9a3f-8e1d0b6c5a4f',
    imagem: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80',
    titulo: 'Cobertura moderna com vista panorâmica',
    descricao:
      'Cobertura duplex com três suítes, área gourmet integrada e vista privilegiada da cidade.',
    preco: 2350000,
    caracteristicas: ['3 suítes', '2 vagas', 'Área gourmet', 'Piscina privativa'],
    endereco: 'Av. Oceânica, 1200 - Barra, Salvador - BA',
    categoriaId: '2a37a1f0-86cd-4f62-af9f-6b4219c9ba17',
    categoria: getCategory('2a37a1f0-86cd-4f62-af9f-6b4219c9ba17'),
    adquirido: false,
  },
  {
    id: '0f6d9c32-1b4e-49a7-8c20-3d5f6a7b8c9d',
    imagem: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    titulo: 'Casa térrea em condomínio fechado',
    descricao:
      'Residência térrea com conceito aberto, jardim amplo e segurança 24h em condomínio consolidado.',
    preco: 850000,
    caracteristicas: ['3 quartos', '1 suíte', 'Área gourmet', 'Condomínio fechado'],
    endereco: 'Rua das Paineiras, 45 - Lago Sul, Brasília - DF',
    categoriaId: '6f3b1c92-5a3c-4a54-b3b0-0f3afc7dbe4a',
    categoria: getCategory('6f3b1c92-5a3c-4a54-b3b0-0f3afc7dbe4a'),
    adquirido: true,
  },
  {
    id: '5e4d3c2b-1a0f-4c9e-8b7a-6d5c4f3a2b1c',
    imagem: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=1200&q=80',
    titulo: 'Apartamento compacto mobiliado',
    descricao:
      'Studio mobiliado em região central, ideal para quem busca praticidade e proximidade do metrô.',
    preco: 320000,
    caracteristicas: ['1 dormitório', 'Mobília completa', 'Próximo ao metrô', 'Academia'],
    endereco: 'Rua Augusta, 1120 - Consolação, São Paulo - SP',
    categoriaId: '9b70f5a8-51ee-4fdd-9c52-8e4691a3f2af',
    categoria: getCategory('9b70f5a8-51ee-4fdd-9c52-8e4691a3f2af'),
    adquirido: false,
  },
  {
    id: '7a8b9c0d-1e2f-4a5b-8c9d-0e1f2a3b4c5d',
    imagem: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
    titulo: 'Casa de campo com pomar',
    descricao:
      'Chalé rústico com lareira, pomar formado e riacho próximo, perfeito para descanso em família.',
    preco: 690000,
    caracteristicas: ['4 quartos', 'Lareira', 'Pomar', 'Área verde preservada'],
    endereco: 'Estrada do Lago, km 12 - Campos do Jordão - SP',
    categoriaId: 'a2d3f4b5-6c7d-48e9-9f01-2a3b4c5d6e7f',
    categoria: getCategory('a2d3f4b5-6c7d-48e9-9f01-2a3b4c5d6e7f'),
    adquirido: false,
  },
  {
    id: '9d8c7b6a-5f4e-4d3c-8b2a-1c0d9e8f7a6b',
    imagem: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
    titulo: 'Loft industrial com pé-direito duplo',
    descricao:
      'Loft inspirador com pé-direito duplo, mezanino para home office e acabamento industrial sofisticado.',
    preco: 540000,
    caracteristicas: ['Pé-direito duplo', 'Mezanino', 'Acabamento industrial', 'Vaga coberta'],
    endereco: 'Rua do Porto, 78 - Bairro do Recife, Recife - PE',
    categoriaId: 'f0f7a21c-1f4a-4e8c-9d0b-7b368ddc01d3',
    categoria: getCategory('f0f7a21c-1f4a-4e8c-9d0b-7b368ddc01d3'),
    adquirido: false,
  },
  {
    id: '1a2b3c4d-5e6f-4789-8a0b-1c2d3e4f5a6b',
    imagem: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
    titulo: 'Residência sustentável com energia solar',
    descricao:
      'Projeto contemporâneo com painéis solares, reuso de água e materiais ecologicamente corretos.',
    preco: 1280000,
    caracteristicas: ['Energia solar', 'Reuso de água', 'Isolamento térmico', 'Automação'],
    endereco: 'Rua das Seringueiras, 310 - Ecovillage, Curitiba - PR',
    categoriaId: 'e1f2a3b4-c5d6-4789-8a7b-9c0d1e2f3a4b',
    categoria: getCategory('e1f2a3b4-c5d6-4789-8a7b-9c0d1e2f3a4b'),
    adquirido: true,
  },
]

export default propertiesMock

