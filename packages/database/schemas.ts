import { z } from 'zod'

const tally = z.object({
    name: z.string(),
    value: z.number()
})

export const adminSchema = z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
})

export const offersSchema = z.object({
    companyId: z.string(),
    companyName: z.string(),
    title: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    isIndefinite: z.boolean()
})

export const experienceSchema = offersSchema.extend({
    displayName: z.string(),
    logo: z.string(),
    rating: z.number()
})

export const schoolSchema = z.object({
    id: z.string(),
    alpha_two_code: z.string().optional(),
    companyTally: tally.array().optional(),
    country: z.string().optional(),
    domains: z.string().array().optional(),
    logo: z.string(),
    name: z.string(),
    rank: z.number(),
    schoolTally: tally.array().optional(),
    stateProvince: z.string().optional(),
    webPages: z.string().array().optional()
})

export const profileSchema = z.object({
    id: z.string(),
    anonymous: z.boolean(),
    firstName: z.string(),
    lastName:  z.string(),
    linkedin:  z.string(),
    location:  z.string(),
    offers:    offersSchema.optional(),
    pfp:       z.string(),
    pipeline:  experienceSchema.array(),
    position:  z.string(),
    school:    z.string(),
    userId:    z.string(),
    username:  z.string()
})

export const companySchema = z.object({
    name: z.string(),
    displayName: z.string(),
    logo: z.string(),
    description: z.string(),
    rating: z.number(),
    prevCompanies: tally.array(),
    postCompanies: tally.array(),
    tenure: z.number(),
    Employees: z.string().array(),
    interns: z.string().array(),
    ratedEmployees: z.string().array()
})