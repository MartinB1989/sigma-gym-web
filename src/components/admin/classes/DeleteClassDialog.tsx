import { ClassObj } from '@/types/classes/classes'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteClassDialogProps {
  classToDelete: ClassObj | null
  onOpenChange: (open: boolean) => void
  onConfirm: (classId: string) => Promise<void>
}

export function DeleteClassDialog({ 
  classToDelete, 
  onOpenChange, 
  onConfirm 
}: DeleteClassDialogProps) {
  return (
    <AlertDialog open={!!classToDelete} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará la clase &apos;{classToDelete?.name}&apos; y todos sus horarios asociados.
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => classToDelete && onConfirm(classToDelete.id)}
            className="bg-red-600 hover:bg-red-700"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 