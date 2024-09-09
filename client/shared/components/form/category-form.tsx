'use client';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/shared/components/ui/form';
import { Separator } from '@/shared/components/ui/separator';
import { Heading } from '@/shared/components/ui/heading';

import { useCreateCategory, useUpdateCategory } from '@/server/_actions/category-action';
import { ICategory } from '@/server/_types/category-type';

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Category name must be at least 3 characters' }),
    description: z
        .string()
        .min(3, { message: 'Category description must be at least 3 characters' }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
    initialData: ICategory | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,
}) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? 'Edit Category' : 'Create Category';
    const description = initialData ? 'Edit a category.' : 'Add a new category';
    const action = initialData ? 'Save changes' : 'Create';

    const defaultValues = initialData
        ? {
            name: initialData.name,
            description: initialData.description,
        }
        : {
            name: '',
            description: '',
        };
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    const doCreateCategory = useCreateCategory();
    const doUpdateCategory = useUpdateCategory();

    const onSubmit = async (data: CategoryFormValues) => {
        if (initialData) {
            await doUpdateCategory.mutateAsync({ ...data, id: initialData.id });
        } else {
            await doCreateCategory.mutateAsync(data);
        }
        form.reset();
        router.refresh();
    };

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                description: initialData.description,
            });
        }
    }, [initialData, form]);

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <div className="gap-8 md:grid md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Category name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Category description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
