import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Calendar, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format, startOfWeek, addDays } from "date-fns";
import { pt } from "date-fns/locale";

export default function Schedule() {
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>();
  const [selectedShift, setSelectedShift] = useState<string>("manha");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    teamId: "",
    shift: "manha" as "manha" | "tarde" | "noite",
    date: new Date(),
    sector: "Geral",
    status: "confirmada" as "confirmada" | "pendente" | "cancelada",
  });

  const { data: schedules = [], isLoading, refetch } = trpc.schedules.list.useQuery({
    teamId: selectedTeam ? parseInt(selectedTeam) : undefined,
    date: selectedDate,
  });

  const { data: teams = [] } = trpc.teams.list.useQuery();

  const createMutation = trpc.schedules.create.useMutation({
    onSuccess: () => {
      toast.success("Escala criada com sucesso!");
      setSelectedTeam(undefined);
      setSelectedShift("manha");
      setSelectedDate(new Date());
      refetch();
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const updateMutation = trpc.schedules.update.useMutation({
    onSuccess: () => {
      toast.success("Escala actualizada com sucesso!");
      setEditingSchedule(null);
      setFormData({ teamId: "", shift: "manha", date: new Date(), sector: "Geral", status: "confirmada" });
      setIsDialogOpen(false);
      refetch();
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const deleteMutation = trpc.schedules.delete.useMutation({
    onSuccess: () => {
      toast.success("Escala eliminada com sucesso!");
      refetch();
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const handleCreateSchedule = () => {
    if (!selectedTeam) {
      toast.error("Selecione um membro da equipa");
      return;
    }

    createMutation.mutate({
      teamId: parseInt(selectedTeam),
      date: selectedDate,
      shift: selectedShift as "manha" | "tarde" | "noite",
      sector: "Geral",
    });
  };

  const handleEditSchedule = (schedule: any) => {
    setEditingSchedule(schedule);
    setFormData({
      teamId: schedule.teamId.toString(),
      shift: schedule.shift,
      date: new Date(schedule.date),
      sector: schedule.sector,
      status: schedule.status,
    });
    setIsDialogOpen(true);
  };

  const handleSubmitEdit = () => {
    if (!formData.teamId || !formData.sector) {
      toast.error("Preencha todos os campos");
      return;
    }

    updateMutation.mutate({
      id: editingSchedule.id,
      teamId: parseInt(formData.teamId),
      shift: formData.shift,
      date: formData.date,
      sector: formData.sector,
      status: formData.status,
    });
  };

  const handleDeleteSchedule = (id: number) => {
    if (confirm("Tem certeza que deseja eliminar esta escala?")) {
      deleteMutation.mutate(id);
    }
  };

  const weekStart = startOfWeek(selectedDate, { locale: pt });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Escala de Equipa</h1>
          <p className="text-gray-400 mt-1">Gestão de turnos e atribuição por sector</p>
        </div>
        <Button onClick={handleCreateSchedule} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Escala
        </Button>
      </div>

      <Card className="bg-slate-800/50 border-orange-700/30">
        <CardHeader>
          <CardTitle className="text-white">Criar Nova Escala</CardTitle>
          <CardDescription className="text-gray-400">Atribua um membro da equipa a um turno</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Membro da Equipa</label>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Selecione um membro" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team: any) => (
                    <SelectItem key={team.id} value={team.id.toString()}>
                      {team.name} ({team.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300">Turno</label>
              <Select value={selectedShift} onValueChange={setSelectedShift}>
                <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manha">Manhã (6h-14h)</SelectItem>
                  <SelectItem value="tarde">Tarde (14h-22h)</SelectItem>
                  <SelectItem value="noite">Noite (22h-6h)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300">Data</label>
              <input
                type="date"
                value={format(selectedDate, "yyyy-MM-dd")}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="mt-1 w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
              />
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleCreateSchedule}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Atribuir
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-orange-700/30">
        <CardHeader>
          <CardTitle className="text-white">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              Semana de {format(weekStart, "d 'de' MMMM", { locale: pt })}
            </div>
          </CardTitle>
          <CardDescription className="text-gray-400">Visualize a escala da semana</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
              <p className="text-gray-400 mt-2">Carregando...</p>
            </div>
          ) : schedules.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>Nenhuma escala atribuída para esta semana</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-orange-700/30 hover:bg-slate-700/50">
                    <TableHead className="text-gray-300">Membro</TableHead>
                    <TableHead className="text-gray-300">Turno</TableHead>
                    <TableHead className="text-gray-300">Data</TableHead>
                    <TableHead className="text-gray-300">Sector</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule: any) => (
                    <TableRow key={schedule.id} className="border-orange-700/20 hover:bg-slate-700/30">
                      <TableCell className="font-medium text-white">{schedule.teamId}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-orange-900/30 text-orange-400 rounded text-xs font-medium border border-orange-700/30">
                          {schedule.shift}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-300">{format(new Date(schedule.date), "dd/MM/yyyy")}</TableCell>
                      <TableCell className="text-gray-300">{schedule.sector}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          schedule.status === "confirmada" ? "bg-green-900/30 text-green-400 border border-green-700/30" :
                          schedule.status === "pendente" ? "bg-yellow-900/30 text-yellow-400 border border-yellow-700/30" :
                          "bg-red-900/30 text-red-400 border border-red-700/30"
                        }`}>
                          {schedule.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-orange-600 text-orange-500 hover:bg-orange-600/10"
                            onClick={() => handleEditSchedule(schedule)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-500 hover:bg-red-600/10"
                            onClick={() => handleDeleteSchedule(schedule.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-800 border-orange-700/30">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Escala</DialogTitle>
            <DialogDescription className="text-gray-400">
              Actualizar informações da escala
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-team" className="text-gray-300">Membro da Equipa</Label>
              <Select value={formData.teamId} onValueChange={(value) => setFormData({ ...formData, teamId: value })}>
                <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team: any) => (
                    <SelectItem key={team.id} value={team.id.toString()}>
                      {team.name} ({team.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-shift" className="text-gray-300">Turno</Label>
                <Select value={formData.shift} onValueChange={(value: any) => setFormData({ ...formData, shift: value })}>
                  <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manha">Manhã</SelectItem>
                    <SelectItem value="tarde">Tarde</SelectItem>
                    <SelectItem value="noite">Noite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-date" className="text-gray-300">Data</Label>
                <input
                  type="date"
                  value={format(formData.date, "yyyy-MM-dd")}
                  onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                  className="mt-1 w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-sector" className="text-gray-300">Sector</Label>
                <Select value={formData.sector} onValueChange={(value) => setFormData({ ...formData, sector: value })}>
                  <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Geral">Geral</SelectItem>
                    <SelectItem value="Limpeza">Limpeza</SelectItem>
                    <SelectItem value="Manutenção">Manutenção</SelectItem>
                    <SelectItem value="Segurança">Segurança</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-status" className="text-gray-300">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmada">Confirmada</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSubmitEdit}
                className="bg-orange-600 hover:bg-orange-700 text-white flex-1"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Guardando..." : "Actualizar"}
              </Button>
              <Button
                onClick={() => setIsDialogOpen(false)}
                variant="outline"
                className="border-slate-600 text-gray-300 hover:bg-slate-700"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
