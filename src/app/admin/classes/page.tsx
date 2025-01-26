'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ClassesTable } from '@/components/admin/classes/ClassesTable'
import { CreateClassDialog } from '@/components/admin/classes/CreateClassDialog'
import { EditClassDialog } from '@/components/admin/classes/EditClassDialog'
import { DeleteClassDialog } from '@/components/admin/classes/DeleteClassDialog'
import { useClasses } from '@/hooks/useClasses'
import { useState, useEffect } from 'react'

export default function ClassesPage() {
  const {
    classes,
    loading,
    isOpen,
    setIsOpen,
    isEditOpen,
    setIsEditOpen,
    formData,
    setFormData,
    classToDelete,
    setClassToDelete,
    handleSubmit,
    handleEdit,
    openEditModal,
    handleDelete,
    deleteSchedule
  } = useClasses()

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Clases Disponibles</h2>
        <CreateClassDialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clases Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <ClassesTable
            classes={classes}
            onEdit={openEditModal}
            onDelete={(classItem) => setClassToDelete(classItem)}
          />
        </CardContent>
      </Card>

      <EditClassDialog
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSubmit={handleEdit}
        formData={formData}
        setFormData={setFormData}
        deleteSchedule={deleteSchedule}
      />

      <DeleteClassDialog
        classToDelete={classToDelete}
        onOpenChange={() => setClassToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
