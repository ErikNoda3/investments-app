'use client'

import { ClientForm } from "@/components/ClientForm";
import { Button } from "@/components/ui/button";
import { useClients } from "@/hooks/useClients"
import { Client } from "@/types/client";
import { useState } from "react";

import type { ClientFormData } from '@/components/ClientForm'

export default function ClientsPage() {
  const { clientsQuery, createClient, updateClient } = useClients();
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showForm, setShowForm] = useState(false)

  if (clientsQuery.isLoading) return <p>Carregando clientes</p>
  if (clientsQuery.isError) return <p>Erro ao carregar clientes</p>

  function handleCreate(data: ClientFormData) {
    createClient.mutate(data, {
      onSuccess: () => setShowForm(false)
    });
  }

  function handleUpdate(data: ClientFormData) {
    if (!editingClient) return;

    updateClient.mutate({ ...editingClient, ...data }, {
      onSuccess: () => {
        setEditingClient(null);
        setShowForm(false)
      }
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button
          className="mb-4"
          onClick={() => {
            setEditingClient(null);
            setShowForm(true);
          }}
        >
          Novo Cliente
        </Button>
      </div>

      {showForm && (
        <ClientForm
          initialData={editingClient ?? undefined}
          onSubmit={editingClient ? handleUpdate : handleCreate}
        />
      )}

      <table className="table-auto w-full mt-6 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-3 py-1">ID</th>
            <th className="border border-gray-300 px-3 py-1">Nome</th>
            <th className="border border-gray-300 px-3 py-1">Email</th>
            <th className="border border-gray-300 px-3 py-1">Status</th>
            <th className="border border-gray-300 px-3 py-1">Ações</th>
          </tr>
        </thead>

        <tbody>
          {clientsQuery.data?.map(client => (
            <tr key={client.id} className="text-center">
              <td className="border border-gray-300 px-3 py-1">{client.id}</td>
              <td className="border border-gray-300 px-3 py-1">{client.name}</td>
              <td className="border border-gray-300 px-3 py-1">{client.email}</td>
              <td className="border border-gray-300 px-3 py-1">{client.status ? 'Ativo' : 'Inativo'}</td>
              <td className="border border-gray-300 px-3 py-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingClient(client)
                    setShowForm(true)
                  }}
                >
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}