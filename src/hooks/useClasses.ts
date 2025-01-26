import { useState, useEffect } from 'react'
import api from '@/lib/axios'
import { ClassObj, ClassFormData } from '@/types/classes/classes'
import { toast } from "@/hooks/use-toast"

export function useClasses() {
  const [classes, setClasses] = useState<ClassObj[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<ClassObj | null>(null)
  const [classToDelete, setClassToDelete] = useState<ClassObj | null>(null)
  const [formData, setFormData] = useState<ClassFormData>({
    name: '',
    description: '',
    capacity: 1,
    schedules: []
  })

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      const { data } = await api.get('/classes')
      setClasses(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data: newClass } = await api.post('/classes', {
        name: formData.name,
        description: formData.description,
        capacity: Number(formData.capacity)
      })

      await Promise.all(formData.schedules.map(schedule =>
        api.post('/class-schedules', {
          classId: newClass.id,
          weekDay: schedule.weekDay,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          active: true
        })
      ))

      await fetchClasses()
      resetForm()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingClass) return

    try {
      await api.put(`/classes/${editingClass.id}`, {
        name: formData.name,
        description: formData.description,
        capacity: Number(formData.capacity)
      })

      const { data: currentSchedules } = await api.get(`/class-schedules/class/${editingClass.id}`)
      const schedules = formData.schedules.map((schedule, index) => ({
        ...(currentSchedules[index]?.id ? { id: currentSchedules[index].id } : { classId: editingClass.id }),
        weekDay: schedule.weekDay,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        active: true
      }))

      await api.post('/class-schedules/bulk-update', { schedules })
      await fetchClasses()
      resetForm()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const openEditModal = (classItem: ClassObj) => {
    setEditingClass(classItem)
    setFormData({
      name: classItem.name,
      description: classItem.description,
      capacity: classItem.capacity,
      schedules: classItem.schedules.map(s => ({
        id: s.id,
        weekDay: s.weekDay,
        startTime: s.startTime,
        endTime: s.endTime
      }))
    })
    setIsEditOpen(true)
  }

  const handleDelete = async (classId: string) => {
    try {
      await api.delete(`/classes/${classId}`)
      setClasses(classes.filter(c => c.id !== classId))
      setClassToDelete(null)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setIsOpen(false)
    setIsEditOpen(false)
    setEditingClass(null)
    setFormData({
      name: '',
      description: '',
      capacity: 1,
      schedules: []
    })
  }

  const deleteSchedule = async (scheduleId: string) => {
    try {
      await api.delete(`/class-schedules/${scheduleId}`)
      toast({
        title: "Éxito",
        description: "Horario eliminado correctamente",
      })
      // Recargar las clases para actualizar la vista
      await fetchClasses()
    } catch (error) {
      console.error('Error al eliminar el horario:', error)
      toast({
        title: "Error",
        description: "Error al eliminar el horario",
        variant: "destructive",
      })
    }
  }

  return {
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
    deleteSchedule,
  }
} 