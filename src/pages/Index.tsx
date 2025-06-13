import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, Package, TrendingUp, Activity, Clock } from 'lucide-react';

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
        
        {/* Cards de estatísticas simplificados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Usuários</CardTitle>
              <Users className="h-4 w-4 text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-300">---</div>
              <div className="flex items-center mt-2">
                <Clock className="h-3 w-3 text-yellow-500 mr-1" />
                <p className="text-xs text-yellow-600">Em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Produtos</CardTitle>
              <Package className="h-4 w-4 text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-300">---</div>
              <div className="flex items-center mt-2">
                <Clock className="h-3 w-3 text-yellow-500 mr-1" />
                <p className="text-xs text-yellow-600">Em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Vendas</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-300">R$ ---</div>
              <div className="flex items-center mt-2">
                <Clock className="h-3 w-3 text-yellow-500 mr-1" />
                <p className="text-xs text-yellow-600">Em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Conversão</CardTitle>
              <BarChart3 className="h-4 w-4 text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-300">---%</div>
              <div className="flex items-center mt-2">
                <Clock className="h-3 w-3 text-yellow-500 mr-1" />
                <p className="text-xs text-yellow-600">Em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Seções de gráficos em placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">Vendas por Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Gráfico será implementado</p>
                  <div className="flex items-center justify-center mt-1">
                    <Clock className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-xs text-yellow-600">Em breve</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-400">Atividade por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Gráfico será implementado</p>
                  <div className="flex items-center justify-center mt-1">
                    <Clock className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-xs text-yellow-600">Em breve</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Seção adicional para futuras features */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-400">Funcionalidades Futuras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <Users className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-400 mb-1">Gestão de Usuários</h3>
                  <p className="text-xs text-gray-400">Cadastro e controle de usuários</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <Package className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-400 mb-1">Catálogo de Produtos</h3>
                  <p className="text-xs text-gray-400">Gerenciamento de produtos</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <BarChart3 className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-400 mb-1">Relatórios Avançados</h3>
                  <p className="text-xs text-gray-400">Analytics e insights detalhados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;