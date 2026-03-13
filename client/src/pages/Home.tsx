import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Package, Calendar, Building2, Wrench, FileText, BarChart3 } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const modules = [
    {
      icon: Package,
      label: "Inventário",
      description: "Controlo de entrada/saída e alertas de stock",
      path: "/inventory",
      color: "bg-blue-50 hover:bg-blue-100",
    },
    {
      icon: Calendar,
      label: "Escala",
      description: "Atribuição automática por sector e turno",
      path: "/schedule",
      color: "bg-purple-50 hover:bg-purple-100",
    },
    {
      icon: Building2,
      label: "Salas",
      description: "Calendário visual com status em tempo real",
      path: "/rooms",
      color: "bg-cyan-50 hover:bg-cyan-100",
    },
    {
      icon: Wrench,
      label: "Manutenção",
      description: "Preventiva e correctiva com priorização",
      path: "/maintenance",
      color: "bg-orange-50 hover:bg-orange-100",
    },
    {
      icon: FileText,
      label: "Fornecedores",
      description: "Alertas de vencimento e histórico",
      path: "/suppliers",
      color: "bg-amber-50 hover:bg-amber-100",
    },
    {
      icon: BarChart3,
      label: "Dashboard",
      description: "KPIs, gráficos e relatórios executivos",
      path: "/dashboard",
      color: "bg-green-50 hover:bg-green-100",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-gray-900">SGA Grupo FRZ</h1>
          <p className="text-gray-600 mb-8">Sistema de Gestão de Facilities</p>
          <Button 
            onClick={() => window.location.href = getLoginUrl()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Entrar na Plataforma
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Bem-vindo, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-gray-600 mt-2">Sistema de Gestão de Facilities - SGA Grupo FRZ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const IconComponent = module.icon;
          return (
            <button
              key={module.path}
              onClick={() => setLocation(module.path)}
              className={`${module.color} rounded-lg p-6 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200 cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {module.label}
                  </h3>
                </div>
                <IconComponent className="w-8 h-8 text-blue-600 ml-2 flex-shrink-0" />
              </div>
              <p className="text-sm text-gray-600">{module.description}</p>
            </button>
          );
        })}
      </div>

      <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle>Dicas de Utilização</CardTitle>
          <CardDescription>Maximize a eficiência da sua gestão de facilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</div>
            <p className="text-sm text-gray-700">Use o <strong>Dashboard</strong> para monitorar KPIs em tempo real e tomar decisões informadas.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">2</div>
            <p className="text-sm text-gray-700">Mantenha o <strong>Inventário</strong> actualizado para evitar stock crítico e desperdícios.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">3</div>
            <p className="text-sm text-gray-700">Priorize <strong>Chamados Urgentes</strong> de manutenção para minimizar impactos operacionais.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
