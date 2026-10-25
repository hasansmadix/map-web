'use client'

import ApiError from '@/components/shared/api-error'
import FormSkeleton from '@/components/shared/skeletons/form-skeleton'
import { useEquipmentById } from '@/hooks/api/equipments/use-equipments'
import { EquipmentEditor } from './equipment-editor'

interface EditEquipmentFormProps {
  equipmentId: string | number
}

function EditEquipmentForm({ equipmentId }: EditEquipmentFormProps) {
  const { equipment, isLoading, error, refetch } = useEquipmentById(equipmentId, true)

  if (isLoading) return <FormSkeleton />
  if (error || !equipment) return <ApiError errorMessage={error ?? 'Please try again.'} refetchFunction={refetch} />

  return <EquipmentEditor equipment={equipment} />
}

export default EditEquipmentForm
