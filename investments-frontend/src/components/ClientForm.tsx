'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Client } from '@/types/client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Input } from './ui/input'
import { Button } from './ui/button'

const clientSchema = z.object({
  name: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
  email: z.string().email('Email inválido'),
  status: z.boolean()
});

export type ClientFormData = z.infer<typeof clientSchema>;

interface ClientFormProps {
  initialData?: Client;
  onSubmit: (data: ClientFormData) => void;
}

export function ClientForm({ initialData, onSubmit }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: initialData ?? { name: '', email: '', status: true }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1 font-semibold">Nome</label>
        <Input {...register('name')} />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <Input type="email" {...register('email')} />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-semibold">Ativo</label>
        <input
          type="checkbox"
          {...register('status')}
          className="h-5 w-5"
          defaultChecked={initialData?.status ?? true}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {initialData ? 'Salvar' : 'Criar'}
      </Button>
    </form>
  );
}