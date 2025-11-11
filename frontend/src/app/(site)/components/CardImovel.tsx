import Link from 'next/link'
import { BsChevronRight } from 'react-icons/bs'
import styled from 'styled-components'

import { propertyType } from '@/types/property'

type CardImovelProps = {
  property: propertyType
}

export default function CardImovel({ property }: CardImovelProps) {
  const image = property.imagem ?? 'https://via.placeholder.com/600x800?text=Im%C3%B3vel'

  return (
    <CardImovelContainer>
      <CardImovelImage backgroundImage={image}>
        <CardImovelContent>
          <FlexCenterBetween>
              <h4>{property.categoria.nome}</h4>
            <StatusBadge adquirido={property.adquirido}>
              {property.adquirido ? 'Adquirido' : 'Disponível'}
            </StatusBadge>
          </FlexCenterBetween>
          <h3>{property.titulo}</h3>
            {property.descricao && <p>{property.descricao}</p>}
          <div>
            <Link href={`/${property.id}`}>
              Ver detalhes
              <BsChevronRight size={20} />
            </Link>
          </div>
        </CardImovelContent>
      </CardImovelImage>
    </CardImovelContainer>
  )
}

const FlexCenterBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;

const CardImovelContainer = styled.div`
    width: 100%;
    height: 500px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    transition: scale 0.3s ease;
`;

const CardImovelImage = styled.div<{ backgroundImage: string }>`
    background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    transition: scale 0.3s ease;
    &:hover {
        scale: 1.05;
        transition: scale 0.3s ease;
    }
`;

const CardImovelContent = styled.div`
    border-radius: 10px;
    background: rgb(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 10px;
    height: 100%;
    padding: 10px 20px 20px;
    position: relative;

    > ${FlexCenterBetween} {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 1;
    }

    h4 {
        font-size: 1rem;
        font-weight: 400;
        color: #fff;
        text-transform: uppercase;
        padding: 6px 16px;
        border-radius: 999px;
        
        min-width: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background-color: rgba(11, 18, 44, 0.45);
        transition: bottom 0.45s ease, background-color 0.3s ease;
    }
    h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #fff;
    }
    p {
        font-size: 1rem;
        font-weight: 400;
        color: #fff;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    small {
        font-size: 0.9rem;
        color: #f0f0f0;
        opacity: 0.85;
    }
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }
    h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #fff;
        text-wrap-mode: nowrap;
    }
    a {
        width: fit-content;
        border: none;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 10px;
        transition: all 0.3s ease;
        font-weight: 600;
        border: none;
        position: relative;
        padding-bottom: 10px;
        cursor: pointer;
        margin-top: 20px;
        margin-left: auto;
        &:hover {
            transform: translateY(-10px);
            transition: all 0.3s ease;
            &::after {
                width: 100%;
                transition: all 0.3s ease;
                opacity: 1;
            }
        }
        &::after {
            content: '';
            width: 0;
            transition: all 0.3s ease;
            opacity: 0;
            height: 2px;
            background-color: #fff;
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
`;

const StatusBadge = styled.span<{ adquirido: boolean }>`
    font-size: 0.875rem;
    font-weight: 600;
    width: fit-content;
    padding: 6px 16px;
    border-radius: 999px;
    background-color: ${({ adquirido }) => (adquirido ? 'rgba(229, 57, 53, 0.7)' : 'rgba(76, 175, 80, 0.7)')};
    color: #fff;
    margin-bottom: auto;
    align-self: flex-end;
`;