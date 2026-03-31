import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "pt-PT" | "pt-BR" | "en-US" | "es";

interface Translations {
  [key: string]: {
    [key: string]: string | { [key: string]: string };
  };
}

const translations: Translations = {
  "pt-PT": {
    "app.title": "Sistema de Gestão de Facilities - SGA Grupo FRZ",
    "app.welcome": "Bem-vindo",
    "nav.dashboard": "Dashboard",
    "nav.home": "Início",
    "nav.inventory": "Inventário",

    "nav.rooms": "Salas",
    "nav.maintenance": "Manutenção",
    "nav.suppliers": "Fornecedores",
    "home.title": "Sistema de Gestão de Facilities - SGA Grupo FRZ",
    "home.subtitle": "Centralize operações e melhore a eficiência da sua equipa",
    "home.inventory": "Inventário",
    "home.inventory.desc": "Controlo de entrada/saída e alertas de stock",

    "home.rooms": "Salas",
    "home.rooms.desc": "Calendário visual com status em tempo real",
    "home.maintenance": "Manutenção",
    "home.maintenance.desc": "Preventiva e correctiva com priorização",
    "home.suppliers": "Fornecedores",
    "home.suppliers.desc": "Alertas de vencimento e histórico",
    "home.dashboard": "Dashboard",
    "home.dashboard.desc": "KPIs, gráficos e relatórios executivos",
    "home.tips": "Dicas de Utilização",
    "home.tips.maximize": "Maximize a eficiência da sua gestão de facilities",
    "home.tips.1": "Use o Dashboard para monitorar KPIs em tempo real e tomar decisões informadas.",
    "home.tips.2": "Mantenha o Inventário actualizado para evitar stock crítico e desperdícios.",
    "home.tips.3": "Priorize Chamados Urgentes de manutenção para minimizar impactos operacionais.",
    "inventory.title": "Inventário",
    "inventory.subtitle": "Gestão centralizada de materiais e equipamentos",
    "inventory.new": "Novo Item",
    "inventory.filters": "Filtros",
    "inventory.search": "Pesquisar por nome...",
    "inventory.category": "Categoria",
    "inventory.status": "Status",
    "inventory.registered": "Itens Registados",
    "inventory.found": "itens encontrados",
    "inventory.loading": "Carregando...",
    "inventory.empty": "Nenhum item encontrado",
    "inventory.create_first": "Criar primeiro item",
    "inventory.name": "Nome do Item",
    "inventory.quantity": "Quantidade",
    "inventory.min_quantity": "Quantidade Mínima",
    "inventory.unit": "Unidade",
    "inventory.location": "Localização",
    "inventory.add_category": "Adicionar Nova Categoria",
    "inventory.category_name": "Digite o nome da nova categoria de consumível",
    "inventory.category_placeholder": "Ex: Papel, Tinta, etc.",
    "inventory.create": "Criar",
    "inventory.update": "Actualizar",
    "inventory.cancel": "Cancelar",
    "inventory.save": "Guardar",
    "inventory.edit": "Editar",
    "inventory.delete": "Eliminar",
    "inventory.actions": "Ações",
    "inventory.success_created": "Item criado com sucesso!",
    "inventory.success_updated": "Item actualizado com sucesso!",
    "inventory.success_deleted": "Item eliminado com sucesso!",
    "inventory.error": "Erro",
    "inventory.confirm_delete": "Tem certeza que deseja eliminar este item?",

    "rooms.title": "Salas",
    "rooms.subtitle": "Gestão de reservas e calendário visual",
    "rooms.new": "Nova Sala",
    "maintenance.title": "Manutenção",
    "maintenance.subtitle": "Gestão de chamados preventivos e correctivos",
    "maintenance.new": "Novo Chamado",
    "suppliers.title": "Fornecedores",
    "suppliers.subtitle": "Gestão de fornecedores e contratos",
    "suppliers.new": "Novo Fornecedor",
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "KPIs, gráficos e relatórios executivos",
    "language": "Idioma",
  },
  "pt-BR": {
    "app.title": "Sistema de Gestão de Facilities - SGA Grupo FRZ",
    "app.welcome": "Bem-vindo",
    "nav.dashboard": "Dashboard",
    "nav.home": "Início",
    "nav.inventory": "Inventário",

    "nav.rooms": "Salas",
    "nav.maintenance": "Manutenção",
    "nav.suppliers": "Fornecedores",
    "home.title": "Sistema de Gestão de Facilities - SGA Grupo FRZ",
    "home.subtitle": "Centralize operações e melhore a eficiência da sua equipe",
    "home.inventory": "Inventário",
    "home.inventory.desc": "Controle de entrada/saída e alertas de estoque",

    "home.rooms": "Salas",
    "home.rooms.desc": "Calendário visual com status em tempo real",
    "home.maintenance": "Manutenção",
    "home.maintenance.desc": "Preventiva e corretiva com priorização",
    "home.suppliers": "Fornecedores",
    "home.suppliers.desc": "Alertas de vencimento e histórico",
    "home.dashboard": "Dashboard",
    "home.dashboard.desc": "KPIs, gráficos e relatórios executivos",
    "home.tips": "Dicas de Utilização",
    "home.tips.maximize": "Maximize a eficiência da sua gestão de facilities",
    "home.tips.1": "Use o Dashboard para monitorar KPIs em tempo real e tomar decisões informadas.",
    "home.tips.2": "Mantenha o Inventário atualizado para evitar estoque crítico e desperdícios.",
    "home.tips.3": "Priorize Chamados Urgentes de manutenção para minimizar impactos operacionais.",
    "inventory.title": "Inventário",
    "inventory.subtitle": "Gestão centralizada de materiais e equipamentos",
    "inventory.new": "Novo Item",
    "inventory.filters": "Filtros",
    "inventory.search": "Pesquisar por nome...",
    "inventory.category": "Categoria",
    "inventory.status": "Status",
    "inventory.registered": "Itens Registrados",
    "inventory.found": "itens encontrados",
    "inventory.loading": "Carregando...",
    "inventory.empty": "Nenhum item encontrado",
    "inventory.create_first": "Criar primeiro item",
    "inventory.name": "Nome do Item",
    "inventory.quantity": "Quantidade",
    "inventory.min_quantity": "Quantidade Mínima",
    "inventory.unit": "Unidade",
    "inventory.location": "Localização",
    "inventory.add_category": "Adicionar Nova Categoria",
    "inventory.category_name": "Digite o nome da nova categoria de consumível",
    "inventory.category_placeholder": "Ex: Papel, Tinta, etc.",
    "inventory.create": "Criar",
    "inventory.update": "Atualizar",
    "inventory.cancel": "Cancelar",
    "inventory.save": "Guardar",
    "inventory.edit": "Editar",
    "inventory.delete": "Eliminar",
    "inventory.actions": "Ações",
    "inventory.success_created": "Item criado com sucesso!",
    "inventory.success_updated": "Item atualizado com sucesso!",
    "inventory.success_deleted": "Item eliminado com sucesso!",
    "inventory.error": "Erro",
    "inventory.confirm_delete": "Tem certeza que deseja eliminar este item?",

    "rooms.title": "Salas",
    "rooms.subtitle": "Gestão de reservas e calendário visual",
    "rooms.new": "Nova Sala",
    "maintenance.title": "Manutenção",
    "maintenance.subtitle": "Gestão de chamados preventivos e corretivos",
    "maintenance.new": "Novo Chamado",
    "suppliers.title": "Fornecedores",
    "suppliers.subtitle": "Gestão de fornecedores e contratos",
    "suppliers.new": "Novo Fornecedor",
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "KPIs, gráficos e relatórios executivos",
    "language": "Idioma",
  },
  "en-US": {
    "app.title": "Facilities Management System - SGA Grupo FRZ",
    "app.welcome": "Welcome",
    "nav.dashboard": "Dashboard",
    "nav.home": "Home",
    "nav.inventory": "Inventory",

    "nav.rooms": "Rooms",
    "nav.maintenance": "Maintenance",
    "nav.suppliers": "Suppliers",
    "home.title": "Facilities Management System - SGA Grupo FRZ",
    "home.subtitle": "Centralize operations and improve your team's efficiency",
    "home.inventory": "Inventory",
    "home.inventory.desc": "Inbound/outbound control and stock alerts",

    "home.rooms": "Rooms",
    "home.rooms.desc": "Visual calendar with real-time status",
    "home.maintenance": "Maintenance",
    "home.maintenance.desc": "Preventive and corrective with prioritization",
    "home.suppliers": "Suppliers",
    "home.suppliers.desc": "Expiration alerts and history",
    "home.dashboard": "Dashboard",
    "home.dashboard.desc": "KPIs, charts and executive reports",
    "home.tips": "Usage Tips",
    "home.tips.maximize": "Maximize the efficiency of your facilities management",
    "home.tips.1": "Use the Dashboard to monitor KPIs in real-time and make informed decisions.",
    "home.tips.2": "Keep Inventory updated to avoid critical stock and waste.",
    "home.tips.3": "Prioritize Urgent Maintenance Calls to minimize operational impacts.",
    "inventory.title": "Inventory",
    "inventory.subtitle": "Centralized management of materials and equipment",
    "inventory.new": "New Item",
    "inventory.filters": "Filters",
    "inventory.search": "Search by name...",
    "inventory.category": "Category",
    "inventory.status": "Status",
    "inventory.registered": "Registered Items",
    "inventory.found": "items found",
    "inventory.loading": "Loading...",
    "inventory.empty": "No items found",
    "inventory.create_first": "Create first item",
    "inventory.name": "Item Name",
    "inventory.quantity": "Quantity",
    "inventory.min_quantity": "Minimum Quantity",
    "inventory.unit": "Unit",
    "inventory.location": "Location",
    "inventory.add_category": "Add New Category",
    "inventory.category_name": "Enter the name of the new consumable category",
    "inventory.category_placeholder": "Ex: Paper, Ink, etc.",
    "inventory.create": "Create",
    "inventory.update": "Update",
    "inventory.cancel": "Cancel",
    "inventory.save": "Save",
    "inventory.edit": "Edit",
    "inventory.delete": "Delete",
    "inventory.actions": "Actions",
    "inventory.success_created": "Item created successfully!",
    "inventory.success_updated": "Item updated successfully!",
    "inventory.success_deleted": "Item deleted successfully!",
    "inventory.error": "Error",
    "inventory.confirm_delete": "Are you sure you want to delete this item?",

    "rooms.title": "Rooms",
    "rooms.subtitle": "Reservation management and visual calendar",
    "rooms.new": "New Room",
    "maintenance.title": "Maintenance",
    "maintenance.subtitle": "Management of preventive and corrective calls",
    "maintenance.new": "New Call",
    "suppliers.title": "Suppliers",
    "suppliers.subtitle": "Supplier and contract management",
    "suppliers.new": "New Supplier",
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "KPIs, charts and executive reports",
    "language": "Language",
  },
  "es": {
    "app.title": "Sistema de Gestión de Facilities - SGA Grupo FRZ",
    "app.welcome": "Bienvenido",
    "nav.dashboard": "Panel",
    "nav.home": "Inicio",
    "nav.inventory": "Inventario",

    "nav.rooms": "Salas",
    "nav.maintenance": "Mantenimiento",
    "nav.suppliers": "Proveedores",
    "home.title": "Sistema de Gestión de Facilities - SGA Grupo FRZ",
    "home.subtitle": "Centralice operaciones y mejore la eficiencia de su equipo",
    "home.inventory": "Inventario",
    "home.inventory.desc": "Control de entrada/salida y alertas de stock",

    "home.rooms": "Salas",
    "home.rooms.desc": "Calendario visual con estado en tiempo real",
    "home.maintenance": "Mantenimiento",
    "home.maintenance.desc": "Preventivo y correctivo con priorización",
    "home.suppliers": "Proveedores",
    "home.suppliers.desc": "Alertas de vencimiento e historial",
    "home.dashboard": "Panel",
    "home.dashboard.desc": "KPIs, gráficos e informes ejecutivos",
    "home.tips": "Consejos de Uso",
    "home.tips.maximize": "Maximice la eficiencia de su gestión de facilities",
    "home.tips.1": "Use el Panel para monitorear KPIs en tiempo real y tomar decisiones informadas.",
    "home.tips.2": "Mantenga el Inventario actualizado para evitar stock crítico y desperdicio.",
    "home.tips.3": "Priorice Llamadas Urgentes de mantenimiento para minimizar impactos operacionales.",
    "inventory.title": "Inventario",
    "inventory.subtitle": "Gestión centralizada de materiales y equipos",
    "inventory.new": "Nuevo Artículo",
    "inventory.filters": "Filtros",
    "inventory.search": "Buscar por nombre...",
    "inventory.category": "Categoría",
    "inventory.status": "Estado",
    "inventory.registered": "Artículos Registrados",
    "inventory.found": "artículos encontrados",
    "inventory.loading": "Cargando...",
    "inventory.empty": "No se encontraron artículos",
    "inventory.create_first": "Crear primer artículo",
    "inventory.name": "Nombre del Artículo",
    "inventory.quantity": "Cantidad",
    "inventory.min_quantity": "Cantidad Mínima",
    "inventory.unit": "Unidad",
    "inventory.location": "Ubicación",
    "inventory.add_category": "Agregar Nueva Categoría",
    "inventory.category_name": "Ingrese el nombre de la nueva categoría de consumible",
    "inventory.category_placeholder": "Ej: Papel, Tinta, etc.",
    "inventory.create": "Crear",
    "inventory.update": "Actualizar",
    "inventory.cancel": "Cancelar",
    "inventory.save": "Guardar",
    "inventory.edit": "Editar",
    "inventory.delete": "Eliminar",
    "inventory.actions": "Acciones",
    "inventory.success_created": "¡Artículo creado exitosamente!",
    "inventory.success_updated": "¡Artículo actualizado exitosamente!",
    "inventory.success_deleted": "¡Artículo eliminado exitosamente!",
    "inventory.error": "Error",
    "inventory.confirm_delete": "¿Está seguro de que desea eliminar este artículo?",

    "rooms.title": "Salas",
    "rooms.subtitle": "Gestión de reservas y calendario visual",
    "rooms.new": "Nueva Sala",
    "maintenance.title": "Mantenimiento",
    "maintenance.subtitle": "Gestión de llamadas preventivas y correctivas",
    "maintenance.new": "Nueva Llamada",
    "suppliers.title": "Proveedores",
    "suppliers.subtitle": "Gestión de proveedores y contratos",
    "suppliers.new": "Nuevo Proveedor",
    "dashboard.title": "Panel",
    "dashboard.subtitle": "KPIs, gráficos e informes ejecutivos",
    "language": "Idioma",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "pt-PT";
    }
    return "pt-PT";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return (translations[language]?.[key] as string) || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
