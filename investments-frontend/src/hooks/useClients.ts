import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Client } from "@/types/client";

export function useClients() {
  const queryClient = useQueryClient();

  const clientsQuery = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await api.get("/clients");
      return response.data;
    },
  });

  const createClient = useMutation<Client, Error, Omit<Client, "id">>({
    mutationFn: async (data) => {
      const response = await api.post("/clients", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const updateClient = useMutation<Client, Error, Client>({
    mutationFn: async (data) => {
      const response = await api.put(`/clients/${data.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  return {
    clientsQuery,
    createClient,
    updateClient,
  };
}
