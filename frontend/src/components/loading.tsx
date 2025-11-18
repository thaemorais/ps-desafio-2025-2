import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoadingSpinner = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: ${({ $size }) => $size / 10}px solid rgba(11, 18, 44, 0.1);
  border-top-color: #0b122c;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

const LoadingContainer = styled.div<{ $fullScreen?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  width: 100%;
  ${({ $fullScreen }) => $fullScreen && `
    min-height: 100vh;
    flex-direction: column;
  `}
`

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoadingText = styled.p`
  margin-top: 16px;
  color: #4a4a4a;
  font-size: 0.95rem;
`

type LoadingProps = {
  text?: string
  size?: number
  fullScreen?: boolean
}

export function Loading({ text, size = 40, fullScreen = false }: LoadingProps) {
  return (
    <LoadingContainer $fullScreen={fullScreen}>
      <LoadingContent>
        <LoadingSpinner $size={size} />
        {text && <LoadingText>{text}</LoadingText>}
      </LoadingContent>
    </LoadingContainer>
  )
}

export function LoadingInline({ size = 20 }: { size?: number }) {
  return <LoadingSpinner $size={size} />
}

