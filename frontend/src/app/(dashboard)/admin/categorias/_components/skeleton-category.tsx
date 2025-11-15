import { FormField, FormFieldsGroup } from '@/components/dashboard/form'
import { Skeleton } from '@/components/skeleton'

interface SkeletonFormFieldsCategoryProps {
  readOnly?: boolean
}

export default function SkeletonFormFieldsCategory(
  _: SkeletonFormFieldsCategoryProps,
) {
  return (
    <FormFieldsGroup>
      <FormField>
        <Skeleton className="h-4 w-16 justify-self-end" />
        <Skeleton className="h-10 col-span-3" />
      </FormField>

      <FormField>
        <Skeleton className="h-4 w-24 justify-self-end" />
        <Skeleton className="h-10 col-span-3" />
      </FormField>

      <FormField>
        <Skeleton className="h-4 w-28 justify-self-end" />
        <Skeleton className="h-24 col-span-3" />
      </FormField>
    </FormFieldsGroup>
  )
}

