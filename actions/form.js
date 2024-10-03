"use server";

import prisma from "@/lib/prisma";
import { formSchema } from '@/schemas/form';


class userNotFoundError extends Error {

}

export async function getFormStats(userId) {
    if (!userId)
        throw new userNotFoundError()

    const stats = await prisma.form.aggregate({
        where: {
            userId: userId,
        },
        _sum: {
            visits: true,
            submissions: true,
        }
    })

    const visits = stats._sum.visits || 0
    const submissions = stats._sum.submissions || 0

    let submissionRate = 0

    if (visits > 0)
        submissionRate = (submissions / visits) * 100

    const bounceRate = 100 - submissionRate

    return {
        visits, submissions, submissionRate, bounceRate
    }
}

export async function createForm(data, userId) {
    const validation = formSchema.safeParse(data)
    if (!validation.success)
        throw new Error("Form not valid")

    if (!userId)
        throw new userNotFoundError()

    const { name, description } = data

    const form = await prisma.form.create({
        data: {
            userId: userId,
            name,
            description,
        }
    })

    if(!form)
        throw new Error("Something went wrong")
    
    console.log("form: ", form)
    return form.id

    // console.log("On server: ", data)
}
