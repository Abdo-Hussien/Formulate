"use client";
import React from 'react'
import { createForm } from '@/actions/form'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogHeader
} from "./ui/dialog"
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ImSpinner2 } from 'react-icons/im'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from '@/hooks/use-toast';
import { formSchema } from '@/schemas/form';
import { useUser } from '@clerk/nextjs';


function CreateFormBtn() {
    const form = useForm({
        resolver: zodResolver(formSchema)
    })

    const { user } = useUser();
    async function onSubmit(values) {
        
        try {
            const formId = await createForm(values, user.id)
            toast({
                title: "Success",
                description: "Form created successfully",
            })
            console.log("formId: ", formId)
        } catch (error) {
            toast({
                title: "Error Occurred",
                description: "Please try again later",
                variant: "destructive",
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Form</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create new form
                    </DialogTitle>
                    <DialogDescription>
                        Create a new form to start collecting responses.
                    </DialogDescription>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field}></Input>
                                    </FormControl>
                                    <FormMessage>

                                    </FormMessage>
                                </FormItem>
                            )}
                            />
                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} {...field}></Textarea>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </form>
                    </Form>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="w-full mt-4">
                        {!form.formState.isSubmitting && <span>Save</span>}
                        {form.formState.isSubmitting && <ImSpinner2 className="animate-spin"></ImSpinner2>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateFormBtn