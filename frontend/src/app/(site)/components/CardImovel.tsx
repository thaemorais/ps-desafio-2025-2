import { BsChevronRight } from "react-icons/bs";
import styled from "styled-components";

export default function CardImovel() {
    return (
        <CardImovelContainer>
            <CardImovelImage backgroundImage="https://picsum.photos/250/500">
                <CardImovelContent>
                    <h4>Categoria</h4>
                    <h3>Nome do imovel</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis tortor finibus, venenatis metus laoreet, aliquam tellus. Suspendisse potenti. Duis lacinia sollicitudin sapien eget laoreet. Integer sem sapien, egestas in odio a, auctor sagittis lacus. Donec ac orci vitae dolor consectetur pulvinar. Praesent quis nunc sed dui malesuada cursus id in quam. Pellentesque suscipit orci ut risus tristique facilisis. Nam non massa iaculis, gravida lectus at, pretium mi. Aenean at efficitur augue, vel ultricies diam.</p>
                    <a>Ver detalhes<BsChevronRight size={20} /></a>
                </CardImovelContent>
            </CardImovelImage>
        </CardImovelContainer>
    )
}
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

    h4 {
        font-size: 1rem;
        font-weight: 400;
        color: #fff;
        text-transform: uppercase;
        padding: 6px 16px;
        border-radius: 999px;
        position: absolute;
        top: 20px;
        left: 20px;
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
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
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