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
  // Para rotas públicas (site), não precisa buscar token
  const isPublicRoute = config.url?.startsWith('/properties') || 
                        config.url?.startsWith('/categories')
  
  if (isPublicRoute && !isServerSide()) {
    // Rotas públicas no cliente não precisam de autenticação
    return config
  }

  let token = null
  try {
    if (isServerSide()) {
      const session = await auth()
      token = session?.user?.token
    } else {
      const session = await getSession()
      token = session?.user?.token
    }
  } catch (error) {
    // Se falhar ao buscar sessão, continua sem token (para rotas públicas)
    console.warn('Erro ao buscar sessão:', error)
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

baseApi.interceptors.response.use(
  (response) => {
    return response.data
  },
  async ({ response }) => {
    
    if (response?.status === 422) {
      const errors = firstItemToObject(response.data.errors)
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
  try {
    const response = await baseApi.request<T>({
      method,
      url,
      ...config,
    })
    
    return { response: response as T, error: undefined }
  } catch (e) {
    const error = e as ResponseErrorType

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
