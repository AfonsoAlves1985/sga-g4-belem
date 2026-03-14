import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, AlertTriangle, CheckCircle, Clock, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Maintenance() {
  const [status, setStatus] = useState<string | undefined>();
  const [priority, setPriority] = useState<string | undefined>();
  const [editingRequest, setEditingRequest] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "media" as "urgente" | "alta" | "media" | "baixa",
    type: "correctiva" as "preventiva" | "correctiva",
    status: "aberto" as "aberto" | "em_progresso" | "concluido" | "cancelado",
  });

  const { data: requests = [], isLoading, refetch } = trpc.maintenance.list.useQuery({
    status,
    priority,
  });

  const createMutation = trpc.maintenance.create.useMutation({
    onSuccess: () => {
      toast.success("Chamado criado com sucesso!");
      setFormData({ title: "", description: "", priority: "media", type: "correctiva", status: "aberto" });
      setIsDialogOpen(false);
      refetch();
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const updateMutation = trpc.maintenance.update.useMutation({
    onSuccess: () => {
      toast.success("Chamado actualizado com sucesso!");
      setEditingRequest(null);
      setFormData({ title: "", description: "", priority: "media", type: "correctiva", status: "aberto" });
      setIsDialogOpen(false);
      refetch();
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const deleteMutation = trpc.maintenance.delete.useMutation({
    onSuccess: () => {
      toast.success("Chamado eliminado com sucesso!");
      refetch();
    },
    onError: (error) => {
      toast.error(`Erro: ${error.message}`);
    },
  });

  const handleCreateSample = () => {
    setEditingRequest(null);
    setFormData({ title: "", description: "", priority: "media", type: "correctiva", status: "aberto" });
    setIsDialogOpen(true);
  };

  const handleEditRequest = (request: any) => {
    setEditingRequest(request);
    setFormData({
      title: request.title,
      description: request.description,
      priority: request.priority,
      type: request.type,
      status: request.status,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (editingRequest) {
      updateMutation.mutate({
        id: editingRequest.id,
        ...formData,
      });
    } else {
      createMutation.mutate({
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        type: formData.type,
      });
    }
  };

  const handleDeleteRequest = (id: number) => {
    if (confirm("Tem certeza que deseja eliminar este chamado?")) {
      deleteMutation.mutate(id);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgente":
        return "bg-red-900/30 text-red-400 border border-red-700/30";
      case "alta":
        return "bg-orange-900/30 text-orange-400 border border-orange-700/30";
      case "media":
        return "bg-yellow-900/30 text-yellow-400 border border-yellow-700/30";
      case "baixa":
        return "bg-green-900/30 text-green-400 border border-green-700/30";
      default:
        return "bg-gray-900/30 text-gray-400 border border-gray-700/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aberto":
        return <AlertTriangle className="w-4 h-4" />;
      case "em_progresso":
        return <Clock className="w-4 h-4" />;
      case "concluido":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const stats = {
    total: requests.length,
    abertos: requests.filter((r: any) => r.status === "aberto").length,
    urgentes: requests.filter((r: any) => r.priority === "urgente").length,
    concluidos: requests.filter((r: any) => r.status === "concluido").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manutenção</h1>
          <p className="text-gray-400 mt-1">Gestão de chamados preventivos e correctivos</p>
        </div>
        <Button onClick={handleCreateSample} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Chamado
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-orange-700/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white">Total de Chamados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.total}</div>
            <p className="text-xs text-gray-400 mt-1">Todos os chamados</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-orange-700/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white">Abertos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.abertos}</div>
            <p className="text-xs text-gray-400 mt-1">Aguardando atendimento</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-orange-700/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white">Urgentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.urgentes}</div>
            <p className="text-xs text-gray-400 mt-1">Prioridade máxima</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-orange-700/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white">Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.concluidos}</div>
            <p className="text-xs text-gray-400 mt-1">Resolvidos</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-orange-700/30">
        <CardHeader>
          <CardTitle className="text-white">Filtros</CardTitle>
          <CardDescription className="text-gray-400">Filtre chamados por status e prioridade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aberto">Aberto</SelectItem>
                  <SelectItem value="em_progresso">Em Progresso</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300">Prioridade</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Selecione uma prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgente">Urgente</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-orange-700/30">
        <CardHeader>
          <CardTitle className="text-white">Chamados de Manutenção</CardTitle>
          <CardDescription className="text-gray-400">{requests.length} chamados encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
              <p className="text-gray-400 mt-2">Carregando...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-400">Nenhum chamado encontrado</p>
              <Button onClick={handleCreateSample} variant="outline" className="mt-4 border-orange-600 text-orange-500 hover:bg-orange-600/10">
                Criar primeiro chamado
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-orange-700/30 hover:bg-slate-700/50">
                    <TableHead className="text-gray-300">Título</TableHead>
                    <TableHead className="text-gray-300">Tipo</TableHead>
                    <TableHead className="text-gray-300">Prioridade</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Data</TableHead>
                    <TableHead className="text-gray-300">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request: any) => (
                    <TableRow key={request.id} className="border-orange-700/20 hover:bg-slate-700/30">
                      <TableCell className="font-medium text-white">{request.title}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-orange-900/30 text-orange-400 rounded text-xs font-medium border border-orange-700/30">
                          {request.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-gray-300">
                          {getStatusIcon(request.status)}
                          <span className="capitalize">{request.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-orange-600 text-orange-500 hover:bg-orange-600/10"
                            onClick={() => handleEditRequest(request)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-500 hover:bg-red-600/10"
                            onClick={() => handleDeleteRequest(request.id)}
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
            <DialogTitle className="text-white">{editingRequest ? "Editar Chamado" : "Novo Chamado"}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingRequest ? "Actualizar informações do chamado" : "Criar um novo chamado de manutenção"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-gray-300">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Reparação de ar condicionado"
                className="mt-1 bg-slate-700 border-slate-600 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300">Descrição</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva o problema..."
                className="mt-1 bg-slate-700 border-slate-600 text-white placeholder-gray-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type" className="text-gray-300">Tipo</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preventiva">Preventiva</SelectItem>
                    <SelectItem value="correctiva">Correctiva</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority" className="text-gray-300">Prioridade</Label>
                <Select value={formData.priority} onValueChange={(value: any) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgente">Urgente</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {editingRequest && (
              <div>
                <Label htmlFor="status" className="text-gray-300">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aberto">Aberto</SelectItem>
                    <SelectItem value="em_progresso">Em Progresso</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSubmit}
                className="bg-orange-600 hover:bg-orange-700 text-white flex-1"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending ? "Guardando..." : editingRequest ? "Actualizar" : "Criar"}
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
