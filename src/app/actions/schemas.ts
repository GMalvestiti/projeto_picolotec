import { z } from 'zod';

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
