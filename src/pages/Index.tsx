
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Users, Package, TrendingUp, Activity } from 'lucide-react';

// Dados mock para os gráficos
const salesData = [
  { month: 'Jan', vendas: 4000 },
  { month: 'Fev', vendas: 3000 },
  { month: 'Mar', vendas: 5000 },
  { month: 'Abr', vendas: 4500 },
  { month: 'Mai', vendas: 6000 },
  { month: 'Jun', vendas: 5500 },
];

const usersData = [
  { month: 'Jan', usuarios: 100 },
  { month: 'Fev', usuarios: 150 },
  { month: 'Mar', usuarios: 200 },
  { month: 'Abr', usuarios: 180 },
  { month: 'Mai', usuarios: 250 },
  { month: 'Jun', usuarios: 300 },
];

const productsData = [
  { month: 'Jan', produtos: 50 },
  { month: 'Fev', produtos: 45 },
  { month: 'Mar', produtos: 60 },
  { month: 'Abr', produtos: 55 },
  { month: 'Mai', produtos: 70 },
  { month: 'Jun', produtos: 65 },
];

const conversionData = [
  { month: 'Jan', conversao: 2.1 },
  { month: 'Fev', conversao: 2.3 },
  { month: 'Mar', conversao: 2.8 },
  { month: 'Abr', conversao: 2.5 },
  { month: 'Mai', conversao: 3.0 },
  { month: 'Jun', conversao: 3.2 },
];

const activityData = [
  { name: 'Usuários', value: 35, color: '#3b82f6' },
  { name: 'Produtos', value: 25, color: '#10b981' },
  { name: 'Vendas', value: 30, color: '#f59e0b' },
  { name: 'Outros', value: 10, color: '#8b5cf6' },
];

const chartConfig = {
  vendas: { label: 'Vendas', color: '#3b82f6' },
  usuarios: { label: 'Usuários', color: '#10b981' },
  produtos: { label: 'Produtos', color: '#f59e0b' },
  conversao: { label: 'Conversão', color: '#8b5cf6' },
};

const Index = () => {
  return (
    <Layout>
      <div className="w-full mx-auto px-2 sm:px-0" style={{ maxWidth: "900px" }}>
        <div className="mb-5 text-center md:text-left">
          <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Visão geral do sistema
          </p>
        </div>
        
        {/* Cards de estatísticas com mini gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground mb-2">
                +12% em relação ao mês anterior
              </p>
              <ChartContainer config={chartConfig} className="h-16">
                <LineChart data={usersData}>
                  <Line 
                    type="monotone" 
                    dataKey="usuarios" 
                    stroke="var(--color-usuarios)" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">567</div>
              <p className="text-xs text-muted-foreground mb-2">
                +5% em relação ao mês anterior
              </p>
              <ChartContainer config={chartConfig} className="h-16">
                <BarChart data={productsData}>
                  <Bar dataKey="produtos" fill="var(--color-produtos)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 12.234</div>
              <p className="text-xs text-muted-foreground mb-2">
                +20% em relação ao mês anterior
              </p>
              <ChartContainer config={chartConfig} className="h-16">
                <AreaChart data={salesData}>
                  <Area 
                    type="monotone" 
                    dataKey="vendas" 
                    stroke="var(--color-vendas)" 
                    fill="var(--color-vendas)" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversão</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground mb-2">
                +0.5% em relação ao mês anterior
              </p>
              <ChartContainer config={chartConfig} className="h-16">
                <LineChart data={conversionData}>
                  <Line 
                    type="monotone" 
                    dataKey="conversao" 
                    stroke="var(--color-conversao)" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Gráficos principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendas por Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="vendas" fill="var(--color-vendas)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Atividade por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64">
                <PieChart>
                  <Pie
                    data={activityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="flex justify-center mt-4 space-x-4">
                {activityData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
