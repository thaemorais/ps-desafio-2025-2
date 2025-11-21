import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { propertyType } from '@/types/property'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateProperty } from './dialog-update-property'
import { DialogPropertyDelete } from './dialog-delete-property'
import { DialogInformationProperty } from './dialog-information-property'
import { DialogCreateProperty } from './dialog-create-property'
import { listarImoveis } from '@/services/properties'
import { listarCategorias } from '@/services/category'

export default async function ListProperties() {
  const properties = await listarImoveis();
  const categories = await listarCategorias();

  // Criar um mapa de category_id -> category name para acesso rápido
  const categoryMap = new Map(
    categories.map((category) => [category.id, category.name])
  );

  if (!properties) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os imóveis.
      </DashboardContainer>
    )
  }

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateProperty>
          <Button size="sm">
            <LuPlusCircle />
            Novo imóvel
          </Button>
        </DialogCreateProperty>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Características</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Adquirido</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties?.map((property: propertyType) => (
              <TableRow key={property.id}>
                <TableCell>
                  <TabbleCellImage src={property.image ?? ''} />
                </TableCell>
                
                <TableCell>{property.title}</TableCell>
                <TableCell>{property.description}</TableCell>
                <TableCell>{property.price}</TableCell>
                <TableCell>{categoryMap.get(property.category_id) ?? ''}</TableCell>
                <TableCell>
                  {Array.isArray(property.features) && property.features.length > 0
                    ? property.features.join(', ')
                    : ''}
                </TableCell>
                <TableCell>{property.address}</TableCell>
                <TableCell>{property.acquired ? 'Sim' : 'Não'}</TableCell>

                
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationProperty id={property.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationProperty>
                  <DialogUpdateProperty id={property.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateProperty>
                  <DialogPropertyDelete id={property.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogPropertyDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!properties.length && (
            <TableCaption>Nenhum imóvel encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
