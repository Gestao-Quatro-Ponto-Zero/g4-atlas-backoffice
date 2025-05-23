
import React from 'react';
import Layout from '../components/Layout';

const Produtos = () => {
  return (
    <Layout>
      <div className="w-full mx-auto px-2 sm:px-0" style={{ maxWidth: "900px" }}>
        <div className="mb-5 text-center md:text-left">
          <h1 className="text-2xl font-bold sm:text-3xl">Produtos</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Gerencie os produtos do sistema
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <p className="text-gray-500 text-center py-8">
            Módulo de produtos em desenvolvimento...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Produtos;
