import { ClassObj } from '@/types/classes/classes'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'

interface ClassesTableProps {
  classes: ClassObj[]
  onEdit: (classItem: ClassObj) => void
  onDelete: (classItem: ClassObj) => void
}

type WeekDay = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES' | 'SABADO' | 'DOMINGO';

const weekDayOrder: Record<WeekDay, number> = {
  'LUNES': 1,
  'MARTES': 2,
  'MIERCOLES': 3,
  'JUEVES': 4,
  'VIERNES': 5,
  'SABADO': 6,
  'DOMINGO': 7
};

export function ClassesTable({ classes, onEdit, onDelete }: ClassesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Capacidad</TableHead>
          <TableHead>Horarios</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classes.map((classItem) => (
          <TableRow key={classItem.id}>
            <TableCell>{classItem.name}</TableCell>
            <TableCell>{classItem.description}</TableCell>
            <TableCell>{classItem.capacity}</TableCell>
            <TableCell>
              {[...classItem.schedules]
                .sort((a, b) => weekDayOrder[a.weekDay as WeekDay] - weekDayOrder[b.weekDay as WeekDay])
                .map((schedule) => (
                  <div key={schedule.id}>
                    {schedule.weekDay}: {schedule.startTime} - {schedule.endTime}
                  </div>
                ))}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(classItem)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onDelete(classItem)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
