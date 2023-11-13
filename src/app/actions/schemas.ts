import { z } from 'zod';

export const UserPostSchema = z.object({
  name: z.string({
    invalid_type_error: "Por favor, informe um nome.",
  }).min(5),
  email: z.string({
    invalid_type_error: "Por favor, informe o email.",
  }).email(),
  password: z.string({
    invalid_type_error: "Por favor, a senha.",
  }).min(5),
});

export const CarPostSchema = z.object({
  description: z.string({
    invalid_type_error: "Por favor, informe uma descrição.",
  }),
  make: z.string({
    invalid_type_error: "Por favor, informe a marca.",
  }),
  model: z.string({
    invalid_type_error: "Por favor, informe o modelo.",
  }),
  cost: z.coerce
    .number()
    .gt(0, { message: "Por favor, informe um valor maior que 0." }),
});

export const CarPutSchema = z.object({
  id: z.string(),
  description: z.string({
    invalid_type_error: "Por favor, informe uma descrição.",
  }),
  make: z.string({
    invalid_type_error: "Por favor, informe a marca.",
  }),
  model: z.string({
    invalid_type_error: "Por favor, informe o modelo.",
  }),
  cost: z.coerce
    .number()
    .gt(0, { message: "Por favor, informe um valor maior que 0." }),
});

export const CarDeleteSchema = z.object({
  uuid: z.string({
    invalid_type_error: "Por favor, informe o UUID.",
  }),
});
