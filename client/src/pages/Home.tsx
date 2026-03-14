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
      color: "bg-orange-900/20 hover:bg-orange-900/30 border-orange-700/30",
    },
    {
      icon: Calendar,
      label: "Escala",
      description: "Atribuição automática por sector e turno",
      path: "/schedule",
      color: "bg-orange-900/20 hover:bg-orange-900/30 border-orange-700/30",
    },
    {
      icon: Building2,
      label: "Salas",
      description: "Calendário visual com status em tempo real",
      path: "/rooms",
      color: "bg-orange-900/20 hover:bg-orange-900/30 border-orange-700/30",
    },
    {
      icon: Wrench,
      label: "Manutenção",
      description: "Preventiva e correctiva com priorização",
      path: "/maintenance",
      color: "bg-orange-900/20 hover:bg-orange-900/30 border-orange-700/30",
    },
    {
      icon: FileText,
      label: "Fornecedores",
      description: "Alertas de vencimento e histórico",
      path: "/suppliers",
      color: "bg-orange-900/20 hover:bg-orange-900/30 border-orange-700/30",
    },
    {
      icon: BarChart3,
      label: "Dashboard",
      description: "KPIs, gráficos e relatórios executivos",
      path: "/dashboard",
      color: "bg-orange-900/20 hover:bg-orange-900/30 border-orange-700/30",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center max-w-md px-4">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663029190932/Ztp8T7Vpr2FQpGULvKFpsw/frz-logo_2746a9e1.png" 
            alt="FRZ Logo" 
            className="h-24 mx-auto mb-8 opacity-90"
          />
          <h1 className="text-4xl font-bold text-white mb-2">SGA Grupo FRZ</h1>
          <p className="text-gray-400 mb-8">Sistema de Gestão de Facilities</p>
          <Button 
            onClick={() => window.location.href = getLoginUrl()}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Entrar na Plataforma
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-8 flex items-center gap-4">
        <img 
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663029190932/Ztp8T7Vpr2FQpGULvKFpsw/frz-logo_2746a9e1.png" 
          alt="FRZ Logo" 
          className="h-12 opacity-90"
        />
        <div>
          <h1 className="text-4xl font-bold text-white">Bem-vindo, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-400 mt-2">Sistema de Gestão de Facilities - SGA Grupo FRZ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const IconComponent = module.icon;
          return (
            <button
              key={module.path}
              onClick={() => setLocation(module.path)}
              className={`${module.color} rounded-lg p-6 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-orange-700/30 cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {module.label}
                  </h3>
                </div>
                <IconComponent className="w-8 h-8 text-orange-500 ml-2 flex-shrink-0 group-hover:text-orange-400 transition-colors" />
              </div>
              <p className="text-sm text-gray-400">{module.description}</p>
            </button>
          );
        })}
      </div>

      <Card className="mt-12 bg-slate-800/50 border-orange-700/30">
        <CardHeader>
          <CardTitle className="text-white">Dicas de Utilização</CardTitle>
          <CardDescription className="text-gray-400">Maximize a eficiência da sua gestão de facilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">1</div>
            <p className="text-sm text-gray-300">Use o <strong className="text-orange-400">Dashboard</strong> para monitorar KPIs em tempo real e tomar decisões informadas.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">2</div>
            <p className="text-sm text-gray-300">Mantenha o <strong className="text-orange-400">Inventário</strong> actualizado para evitar stock crítico e desperdícios.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">3</div>
            <p className="text-sm text-gray-300">Priorize <strong className="text-orange-400">Chamados Urgentes</strong> de manutenção para minimizar impactos operacionais.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
