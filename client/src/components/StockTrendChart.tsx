import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StockTrendData {
  weekStartDate: string;
  weekNumber: number;
  year: number;
  stock: number;
  consumption: number;
  status: string;
  label: string;
}

interface StockAnalysis {
  averageConsumption: number;
  maxConsumption: number;
  minConsumption: number;
  trend: "increasing" | "decreasing" | "stable";
  totalConsumption: number;
}

interface StockTrendChartProps {
  data: StockTrendData[];
  analysis?: StockAnalysis;
  consumableName: string;
  isLoading?: boolean;
}

export function StockTrendChart({
  data,
  analysis,
  consumableName,
  isLoading = false,
}: StockTrendChartProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Histórico de Estoque - {consumableName}</CardTitle>
          <CardDescription>Carregando dados...</CardDescription>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <div className="text-muted-foreground">Carregando gráfico...</div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Histórico de Estoque - {consumableName}</CardTitle>
          <CardDescription>Sem dados disponíveis</CardDescription>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <div className="text-muted-foreground">Nenhum histórico de estoque disponível</div>
        </CardContent>
      </Card>
    );
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "increasing":
        return "text-red-500";
      case "decreasing":
        return "text-green-500";
      default:
        return "text-yellow-500";
    }
  };

  const getTrendLabel = (trend: string) => {
    switch (trend) {
      case "increasing":
        return "Consumo Crescente ↑";
      case "decreasing":
        return "Consumo Decrescente ↓";
      default:
        return "Consumo Estável →";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Histórico de Estoque - {consumableName}</CardTitle>
            <CardDescription>Últimas {data.length} semanas</CardDescription>
          </div>
          {analysis && (
            <Badge className={getTrendColor(analysis.trend)}>
              {getTrendLabel(analysis.trend)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Análise de Padrões */}
        {analysis && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Consumo Médio</div>
              <div className="text-2xl font-bold">{analysis.averageConsumption}</div>
              <div className="text-xs text-muted-foreground">por semana</div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Máximo</div>
              <div className="text-2xl font-bold">{analysis.maxConsumption}</div>
              <div className="text-xs text-muted-foreground">consumo</div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Mínimo</div>
              <div className="text-2xl font-bold">{analysis.minConsumption}</div>
              <div className="text-xs text-muted-foreground">consumo</div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="text-2xl font-bold">{analysis.totalConsumption}</div>
              <div className="text-xs text-muted-foreground">período</div>
            </div>
          </div>
        )}

        {/* Gráfico Combinado: Estoque (linha) + Consumo (barra) */}
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis yAxisId="left" label={{ value: "Estoque", angle: -90, position: "insideLeft" }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{ value: "Consumo", angle: 90, position: "insideRight" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  color: "#fff",
                }}
                formatter={(value: any) => value.toFixed(0)}
              />
              <Legend />
              <Bar yAxisId="right" dataKey="consumption" fill="#ef4444" name="Consumo" opacity={0.7} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="stock"
                stroke="#3b82f6"
                name="Estoque"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico Adicional: Apenas Consumo */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis label={{ value: "Consumo Semanal", angle: -90, position: "insideLeft" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  color: "#fff",
                }}
                formatter={(value: any) => value.toFixed(0)}
              />
              <Area
                type="monotone"
                dataKey="consumption"
                fill="#fbbf24"
                stroke="#f59e0b"
                name="Consumo"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Insights</div>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            {analysis && (
              <>
                <li>
                  • Consumo médio semanal: <strong>{analysis.averageConsumption}</strong> unidades
                </li>
                <li>
                  • Tendência: <strong>{getTrendLabel(analysis.trend)}</strong>
                </li>
                <li>
                  • Variação: de <strong>{analysis.minConsumption}</strong> a{" "}
                  <strong>{analysis.maxConsumption}</strong> unidades
                </li>
                <li>
                  • Total consumido no período: <strong>{analysis.totalConsumption}</strong> unidades
                </li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
