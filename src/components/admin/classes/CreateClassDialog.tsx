import { ClassFormData } from '@/types/classes/classes'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { generateTimeOptions } from '@/lib/utils'

interface CreateClassDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
  formData: ClassFormData
  setFormData: React.Dispatch<React.SetStateAction<ClassFormData>>
}

export function CreateClassDialog({ 
  isOpen, 
  onOpenChange, 
  onSubmit, 
  formData, 
  setFormData 
}: CreateClassDialogProps) {
  const addSchedule = () => {
    setFormData(prev => ({
      ...prev,
      schedules: [...prev.schedules, { weekDay: 'LUNES', startTime: '', endTime: '' }]
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Agregar Clase</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Clase</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacidad</Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              value={formData.capacity}
              onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Horarios</Label>
            {formData.schedules.map((schedule, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <Select
                  value={schedule.weekDay}
                  onValueChange={(value) => {
                    const newSchedules = [...formData.schedules]
                    newSchedules[index].weekDay = value
                    setFormData(prev => ({ ...prev, schedules: newSchedules }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Día" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LUNES">Lunes</SelectItem>
                    <SelectItem value="MARTES">Martes</SelectItem>
                    <SelectItem value="MIERCOLES">Miércoles</SelectItem>
                    <SelectItem value="JUEVES">Jueves</SelectItem>
                    <SelectItem value="VIERNES">Viernes</SelectItem>
                    <SelectItem value="SABADO">Sábado</SelectItem>
                    <SelectItem value="DOMINGO">Domingo</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={schedule.startTime}
                  onValueChange={(value) => {
                    const newSchedules = [...formData.schedules]
                    newSchedules[index].startTime = value
                    setFormData(prev => ({ ...prev, schedules: newSchedules }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Hora inicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateTimeOptions().map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={schedule.endTime}
                  onValueChange={(value) => {
                    const newSchedules = [...formData.schedules]
                    newSchedules[index].endTime = value
                    setFormData(prev => ({ ...prev, schedules: newSchedules }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Hora fin" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateTimeOptions().map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSchedule}>
              Agregar Horario
            </Button>
          </div>

          <Button type="submit">Crear Clase</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 