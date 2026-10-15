import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, 'Please add your first name').max(80),
  lastName: z.string().trim().min(1, 'Please add your last name').max(80),
  email: z.string().trim().email('Please check your email address'),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+()\d\s.-]*$/, 'Use digits, spaces and an optional +country code')
    .optional()
    .or(z.literal('')),
  message: z.string().trim().min(10, 'Tell us a little about your season (10+ characters)').max(4000),
  /** Honeypot: must stay empty */
  company: z.string().max(0).optional().or(z.literal('')),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;

export const lengthOptions = ['1', '2', '3', '6', '9', '12', 'custom'] as const;
export const vibeOptions = ['city', 'surf', 'countryside', 'island', 'wine', 'unsure'] as const;
export const workspaceOptions = ['home-desk', 'coworking', 'both'] as const;
export const homeTypeOptions = ['city-apartment', 'beach-house', 'quinta', 'island-home', 'no-preference'] as const;
export const mustHaveOptions = ['sea-view', 'walkable', 'outdoor-space', 'pet-friendly'] as const;
export const incomeOptions = ['remote-salary', 'freelance', 'passive', 'not-working'] as const;
export const contactMethodOptions = ['email', 'whatsapp', 'telephone'] as const;
export const nationalityGroups = ['eu-eea-swiss', 'visa-exempt', 'visa-required', 'unsure'] as const;

const childSchema = z.object({
  age: z.coerce.number({ invalid_type_error: 'Add an age' }).int().min(0, 'Age 0–17').max(17, 'Age 0–17'),
  schoolNeeds: z.string().trim().max(200).optional().or(z.literal('')),
});

export const plannerSteps = {
  when: z
    .object({
      startMonth: z.enum(months, { errorMap: () => ({ message: 'Choose a start month' }) }),
      startYear: z.coerce.number().int().min(2026).max(2030),
      length: z.enum(lengthOptions, { errorMap: () => ({ message: 'Choose how long you’d like to stay' }) }),
      customLength: z.string().trim().max(40).optional().or(z.literal('')),
      flexible: z.enum(['yes', 'no'], { errorMap: () => ({ message: 'Let us know if your dates are flexible' }) }),
    })
    .refine((v) => v.length !== 'custom' || (v.customLength ?? '').length > 0, {
      message: 'Tell us roughly how long',
      path: ['customLength'],
    }),
  where: z.object({
    vibes: z.array(z.enum(vibeOptions)).min(1, 'Pick at least one vibe (or “not sure yet”)'),
    destinations: z.array(z.string()).max(12),
  }),
  life: z.object({
    remote: z.enum(['yes', 'no'], { errorMap: () => ({ message: 'Are you working remotely?' }) }),
    workspace: z.enum(workspaceOptions).optional(),
    homeType: z.enum(homeTypeOptions, { errorMap: () => ({ message: 'Choose a home type' }) }),
    bedrooms: z.coerce.number().int().min(0).max(6),
    mustHaves: z.array(z.enum(mustHaveOptions)),
  }).refine((v) => v.remote === 'no' || !!v.workspace, { message: 'Choose a workspace option', path: ['workspace'] }),
  who: z.object({
    adults: z.coerce.number().int().min(1, 'At least one adult').max(8),
    children: z.array(childSchema).max(8),
    nationality: z.enum(nationalityGroups, { errorMap: () => ({ message: 'Choose the closest option' }) }),
    nationalityDetail: z.string().trim().max(60).optional().or(z.literal('')),
    income: z.enum(incomeOptions, { errorMap: () => ({ message: 'Choose your main income type' }) }),
    budget: z.coerce.number({ invalid_type_error: 'Add a monthly budget' }).int().min(500, 'Budget looks low: at least €500').max(100000),
  }),
  contact: z.object({
    name: z.string().trim().min(2, 'Please add your name').max(120),
    email: z.string().trim().email('Please check your email address'),
    phoneCountry: z.string().trim().regex(/^\+\d{1,4}$/, 'Country code like +44'),
    phone: z.string().trim().regex(/^[\d\s().-]{5,20}$/, 'Please check your phone number'),
    methods: z.array(z.enum(contactMethodOptions)).min(1, 'Choose at least one way to reach you'),
    notes: z.string().trim().max(4000).optional().or(z.literal('')),
    consent: z.literal(true, { errorMap: () => ({ message: 'Please agree so we can contact you' }) }),
  }),
};

export const plannerSchema = z.object({
  when: plannerSteps.when,
  where: plannerSteps.where,
  life: plannerSteps.life,
  who: plannerSteps.who,
  contact: plannerSteps.contact,
});
export type PlannerInput = z.infer<typeof plannerSchema>;
