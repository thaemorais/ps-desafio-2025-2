import { auth } from '@/auth'
import { isServerSide } from '@/lib/is-server-side'
import axios, { AxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function firstItemToObject(
  obj: Record<string, string[]>,
): Record<string, string> {
  const newObj: Record<string, string> = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key][0]
    }
  }
  return newObj
}

export type ResponseErrorType = {
  message: string
  status: number
  errors: {
    [key: string]: string
  }
}

export class ResponseError extends Error implements ResponseErrorType {
  errors: {
    [key: string]: string
  }

  status: number

  constructor(
    message: string,
    errors: {
      [key: string]: string
    },
    status: number,
  ) {
    super(message)
    this.errors = errors
    this.status = status
  }
}

const baseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
})

baseApi.interceptors.request.use(async (config) => {
  if (!isServerSide()) {
    console.log('🟡 [API REQUEST] Preparando requisição:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      hasData: !!config.data,
      dataType: config.data instanceof FormData ? 'FormData' : typeof config.data,
    })
    
    if (config.data instanceof FormData) {
      const formEntries: Record<string, string> = {}
      for (const [key, value] of config.data.entries()) {
        formEntries[key] = value instanceof File 
          ? `[File: ${value.name}, ${value.size} bytes]`
          : String(value)
      }
      console.log('🟡 [API REQUEST] FormData sendo enviado:', formEntries)
    } else if (config.data) {
      console.log('🟡 [API REQUEST] Dados sendo enviados:', config.data)
    }
  }
  
  let token = null
  if (isServerSide()) {
    const session = await auth()
    token = session?.user?.token
  } else {
    const session = await getSession()
    token = session?.user?.token
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    if (!isServerSide()) {
      console.log('🟡 [API REQUEST] Token de autenticação adicionado')
    }
  }
  
  // Garantir que FormData defina Content-Type automaticamente (axios faz isso, mas garantir)
  if (config.data instanceof FormData) {
    // Axios automaticamente define Content-Type: multipart/form-data com boundary
    // Não devemos definir manualmente, senão o boundary não é incluído
    if (!isServerSide()) {
      console.log('🟡 [API REQUEST] FormData detectado - Content-Type será definido automaticamente pelo axios')
    }
  }
  
  if (!isServerSide()) {
    console.log('🟡 [API REQUEST] Headers finais:', {
      'Content-Type': config.headers['Content-Type'] || 'será definido automaticamente',
      'Authorization': config.headers.Authorization ? 'Bearer ***' : 'não definido',
    })
  }
  
  return config
})

baseApi.interceptors.response.use(
  (response) => {
    if (!isServerSide()) {
      console.log('🟢 [API RESPONSE] Resposta de sucesso:', {
        status: response.status,
        statusText: response.statusText,
        url: response.config.url,
        hasData: !!response.data,
      })
    }
    return response.data
  },
  async ({ response }) => {
    if (!isServerSide()) {
      console.error('🔴 [API RESPONSE] Erro na resposta:', {
        status: response?.status,
        statusText: response?.statusText,
        url: response?.config?.url,
        data: response?.data,
      })
    }
    
    if (response?.status === 422) {
      const errors = firstItemToObject(response.data.errors)
      if (!isServerSide()) {
        console.error('🔴 [API RESPONSE] Erros de validação:', errors)
      }
      throw new ResponseError(response.data.message, errors, response.status)
    }

    throw new ResponseError(response?.data?.message || 'Erro desconhecido', {}, response?.status || 500)
  },
)

export async function api<T = unknown>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  config?: AxiosRequestConfig,
): Promise<
  | { response: T; error: undefined }
  | { response: undefined; error: ResponseErrorType }
> {
  if (!isServerSide()) {
    console.log('🟠 [API] Chamando função api:', {
      method,
      url,
      hasConfig: !!config,
      hasData: !!config?.data,
    })
  }
  
  try {
    const response = await baseApi.request<T>({
      method,
      url,
      ...config,
    })
    
    if (!isServerSide()) {
      console.log('🟠 [API] Requisição bem-sucedida:', {
        method,
        url,
        hasResponse: !!response,
      })
    }
    
    return { response: response as T, error: undefined }
  } catch (e) {
    const error = e as ResponseErrorType

    if (!isServerSide()) {
      console.error('🟠 [API] Erro capturado:', {
        method,
        url,
        error: {
          message: error.message,
          status: error.status,
          errors: error.errors,
        },
      })
    }

    if (error.status === 401 || error.status === 403) {
      if (isServerSide()) {
        redirect('/auth/sign-out')
      } else {
        window.location.href = '/auth/sign-out'
      }
    }

    return {
      response: undefined,
      error: {
        message: error.message,
        status: error.status,
        errors: { ...(error.errors ?? {}) },
      },
    }
  }
}
