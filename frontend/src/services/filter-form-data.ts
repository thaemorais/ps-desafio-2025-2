import { imageCompress } from './image-compress'

export async function filterFormData(form: FormData) {
  console.log('🟢 [FILTER FORM DATA] Iniciando filtro do FormData...')
  const newFormData = new FormData()
  
  let totalEntries = 0
  let skippedEntries = 0
  let addedEntries = 0
  let hasIdField = false

  for (const [key, value] of form.entries()) {
    totalEntries++
    console.log(`🟢 [FILTER FORM DATA] Processando entrada ${totalEntries}:`, {
      key,
      value: value instanceof File 
        ? `[File: ${value.name}, ${value.size} bytes, type: ${value.type}]`
        : `[String: "${value}" (length: ${value.length}, trimmed: "${value.trim()}")]`,
      isFile: value instanceof File,
      isString: typeof value === 'string',
    })
    
    if (key === 'id') {
      console.log('🟢 [FILTER FORM DATA] Detectado campo "id" (será usado para method spoofing)')
      hasIdField = true
      skippedEntries++
      continue
    }

    const isValidFile = value instanceof File && value.size > 0
    const isValidString = typeof value === 'string' && value.trim() !== ''
    
    console.log(`🟢 [FILTER FORM DATA] Validação para "${key}":`, {
      isValidFile,
      isValidString,
      willInclude: isValidFile || isValidString,
    })

    if (isValidFile || isValidString) {
      if (value instanceof File && value.type.startsWith('image/')) {
        console.log(`🟢 [FILTER FORM DATA] Comprimindo imagem para "${key}"...`)
        const compressed = await imageCompress(value)
        newFormData.append(key, compressed)
        console.log(`🟢 [FILTER FORM DATA] Imagem comprimida adicionada:`, {
          originalSize: value.size,
          compressedSize: compressed.size,
        })
      } else {
        console.log(`🟢 [FILTER FORM DATA] Adicionando "${key}" = "${value}"`)
        newFormData.append(key, value)
      }
      addedEntries++
    } else {
      console.log(`🟡 [FILTER FORM DATA] Campo "${key}" não atendeu aos critérios e foi ignorado`)
      skippedEntries++
    }
  }

  // Adiciona method spoofing se houver campo id (indica que é um update)
  if (hasIdField) {
    console.log('🟢 [FILTER FORM DATA] Adicionando _method: PUT para method spoofing')
    newFormData.append('_method', 'PUT')
  }

  console.log('🟢 [FILTER FORM DATA] Resumo do filtro:', {
    totalEntries,
    addedEntries,
    skippedEntries,
    hasIdField,
    methodSpoofing: hasIdField ? 'PUT' : 'nenhum',
  })
  
  // Log final do FormData
  const finalEntries: Record<string, string> = {}
  for (const [key, value] of newFormData.entries()) {
    finalEntries[key] = value instanceof File 
      ? `[File: ${value.name}, ${value.size} bytes]`
      : String(value)
  }
  console.log('🟢 [FILTER FORM DATA] FormData final:', finalEntries)

  return newFormData
}

