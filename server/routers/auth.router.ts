import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from '../_core/trpc';
import { TRPCError } from '@trpc/server';
import * as auth from '../auth.helpers';
import { generateToken } from '../auth.helpers';

// Definimos o usuário padrão para facilitar a manutenção
const DEFAULT_USER = {
  id: 1,
  name: 'Administrador',
  email: 'admin@sistema.com',
  role: 'superadmin', // Mantemos como superadmin para não quebrar outras partes do sistema
};

export const authRouter = router({
  /**
   * Login Simplificado (Admin Padrão)
   */
  login: publicProcedure
    .input(
      z.object({
        email: z.string(), // Mudamos de .email() para .string() para aceitar o termo "admin"
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Validação Hardcoded: admin / admin123
      if (input.email === 'admin' && input.password === 'admin123') {
        
        // Gerar token real usando o helper existente para manter a compatibilidade
        const token = generateToken(DEFAULT_USER.id, DEFAULT_USER.role);

        return {
          success: true,
          token,
          user: DEFAULT_USER,
        };
      }

      // Se não for o admin padrão, bloqueia
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Usuário ou senha mestre incorretos',
      });
    }),

  /**
   * Obter dados do usuário logado (Simplificado)
   */
  me: protectedProcedure.query(async () => {
    // Retorna sempre o perfil admin para quem estiver autenticado com o token básico
    return {
      ...DEFAULT_USER,
      isActive: true,
    };
  }),

  /**
   * Logout (Apenas sucesso)
   */
  logout: protectedProcedure.mutation(async () => {
    return { success: true };
  }),

  /**
   * Listar usuários (Agora retorna apenas o admin logado)
   */
  listUsers: protectedProcedure.query(async () => {
    return [DEFAULT_USER];
  }),

  // As outras rotas (createUser, deactivateUser, etc.) podem ser mantidas, 
  // mas como o login é apenas um, elas perdem a utilidade prática agora.
});
