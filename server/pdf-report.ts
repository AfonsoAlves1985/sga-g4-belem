import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { join } from 'path';
import * as db from './db';

export interface WeeklyReportData {
  spaceName: string;
  weekStartDate: Date;
  weekEndDate: Date;
  generatedAt: Date;
  consumables: Array<{
    id: number;
    name: string;
    category: string | null;
    currentStock: number;
    minStock: number;
    maxStock: number;
    status: string;
  }>;
  statistics: {
    totalConsumables: number;
    criticalStock: number;
    lowStock: number;
    normalStock: number;
  };
}

export async function generateWeeklyReportPDF(reportData: WeeklyReportData): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const outputPath = join('/tmp', `relatorio_${Date.now()}.pdf`);
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
      });

      const stream = createWriteStream(outputPath);
      doc.pipe(stream);

      // Cabeçalho
      doc.fontSize(20).font('Helvetica-Bold').text('Relatório de Consumo Semanal', { align: 'center' });
      doc.fontSize(12).font('Helvetica').text(`Unidade: ${reportData.spaceName}`, { align: 'center' });
      doc.fontSize(10).text(
        `Semana de ${reportData.weekStartDate.toLocaleDateString('pt-BR')} a ${reportData.weekEndDate.toLocaleDateString('pt-BR')}`,
        { align: 'center' }
      );
      doc.text(`Gerado em: ${reportData.generatedAt.toLocaleString('pt-BR')}`, { align: 'center' });
      doc.moveDown();

      // Estatísticas
      doc.fontSize(12).font('Helvetica-Bold').text('Resumo de Estoque', { underline: true });
      doc.fontSize(10).font('Helvetica');
      doc.text(`Total de Consumíveis: ${reportData.statistics.totalConsumables}`);
      doc.fillColor('#FF0000').text(`Estoque Crítico: ${reportData.statistics.criticalStock}`);
      doc.fillColor('#FFA500').text(`Estoque Baixo: ${reportData.statistics.lowStock}`);
      doc.fillColor('#00AA00').text(`Estoque Normal: ${reportData.statistics.normalStock}`);
      doc.fillColor('#000000');
      doc.moveDown();

      // Tabela de consumíveis
      doc.fontSize(12).font('Helvetica-Bold').text('Consumíveis', { underline: true });
      doc.moveDown(0.5);

      // Cabeçalho da tabela
      const tableTop = doc.y;
      const col1 = 50;
      const col2 = 200;
      const col3 = 300;
      const col4 = 400;
      const col5 = 500;

      doc.fontSize(9).font('Helvetica-Bold');
      doc.text('Produto', col1, tableTop);
      doc.text('Categoria', col2, tableTop);
      doc.text('Est. Atual', col3, tableTop);
      doc.text('Est. Mín.', col4, tableTop);
      doc.text('Status', col5, tableTop);

      // Linha separadora
      doc.moveTo(col1, tableTop + 15).lineTo(550, tableTop + 15).stroke();

      // Dados da tabela
      let y = tableTop + 25;
      doc.fontSize(8).font('Helvetica');

      for (const consumable of reportData.consumables.slice(0, 20)) {
        if (y > 700) {
          doc.addPage();
          y = 50;
        }

        const statusColor = consumable.currentStock < consumable.minStock ? '#FF0000' : '#00AA00';

        doc.fillColor('#000000');
        doc.text(consumable.name, col1, y);
        doc.text(consumable.category || '-', col2, y);
        doc.text(consumable.currentStock.toString(), col3, y);
        doc.text(consumable.minStock.toString(), col4, y);
        doc.fillColor(statusColor);
        doc.text(consumable.status, col5, y);
        doc.fillColor('#000000');

        y += 20;
      }

      // Rodapé
      doc.fontSize(8).text(`Página ${doc.bufferedPageRange().count}`, 50, 750, { align: 'center' });

      doc.end();

      stream.on('finish', () => {
        resolve(outputPath);
      });

      stream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function generateReportData(spaceId: number, weekStartDateStr: string): Promise<WeeklyReportData> {
  // Parse da data
  const [year, month, day] = weekStartDateStr.split('-').map(Number);
  const startDate = new Date(year, month - 1, day);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
  


  // Buscar dados de consumíveis
  const consumables = await db.listConsumablesWithWeeklyData(spaceId, startDate);

  // Buscar informações da unidade (placeholder)
  const space = { name: 'Unidade' };

  // Calcular estatísticas
  const statistics = {
    totalConsumables: consumables.length,
    criticalStock: consumables.filter((c: any) => c.currentStock < c.minStock).length,
    lowStock: consumables.filter((c: any) => c.currentStock >= c.minStock && c.currentStock < (c.maxStock * 0.3)).length,
    normalStock: consumables.filter((c: any) => c.currentStock >= (c.maxStock * 0.3)).length,
  };

  return {
    spaceName: space.name || 'Unidade Desconhecida',
    weekStartDate: startDate,
    weekEndDate: endDate,
    generatedAt: new Date(),
    consumables: (consumables as any[]).map((c: any) => ({
      id: c.id,
      name: c.name,
      category: c.category,
      currentStock: c.currentStock,
      minStock: c.minStock,
      maxStock: c.maxStock,
      status: c.currentStock < c.minStock ? 'CRÍTICO' : c.currentStock < (c.maxStock * 0.3) ? 'BAIXO' : 'OK',
    })),
    statistics,
  };
}
