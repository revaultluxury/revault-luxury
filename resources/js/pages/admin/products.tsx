import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useSidebar } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDebouncedValue } from '@/hooks/use-debounced';
import AdminLayout from '@/layouts/custom/admin-layout';
import { PaginatedResponse, Product, SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function ShowProducts() {
    const { products, search } = usePage<SharedData & { products: PaginatedResponse<Product>; search: string }>().props;
    const { open } = useSidebar();
    const [input, setInput] = useState<string>(search);
    const initialLoad = useRef<boolean>(true);
    const debouncedValue = useDebouncedValue(input, 500);

    useEffect(() => {
        if (initialLoad.current) {
            initialLoad.current = false;
            return;
        }

        router.get(
            route('admin.products'),
            { search: debouncedValue },
            {
                preserveState: true,
            },
        );
    }, [debouncedValue]);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>View Products</CardTitle>
                    <CardDescription>List of products</CardDescription>
                </CardHeader>
                <CardContent className="mx-auto">
                    <div
                        className={`${open ? 'max-w-xs md:max-w-lg lg:max-w-3xl' : 'max-w-xs md:max-w-2xl lg:max-w-full'} space-y-5 overflow-x-auto`}
                    >
                        <div className="flex p-4">
                            <Input type="text" placeholder="Search by title" value={input} onChange={(e) => setInput(e.target.value)} />
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Weight (gram)</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Updated At</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.data.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>{product.category.name}</TableCell>
                                        <TableCell>
                                            {parseFloat(product.price).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            })}
                                        </TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell>{product.weight}</TableCell>
                                        <TableCell>
                                            {product.status.toUpperCase() === 'ACTIVE' ? (
                                                <Badge variant="secondary" className="bg-green-400 dark:bg-green-600">
                                                    {product.status.toUpperCase()}
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary" className="bg-red-400 dark:bg-red-600">
                                                    {product.status.toUpperCase()}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(product.created_at).toLocaleString('en-UK', {
                                                timeStyle: 'short',
                                                dateStyle: 'short',
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(product.updated_at).toLocaleString('en-UK', {
                                                timeStyle: 'short',
                                                dateStyle: 'short',
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            <span className="flex flex-row gap-2">
                                                <Button size="sm" variant="outline" asChild>
                                                    <Link href={route('admin.products.edit', product.id)}>Edit</Link>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        router.delete(route('admin.products.destroy', product.id), {
                                                            onSuccess: () => {
                                                                toast.success('Product deleted successfully');
                                                            },
                                                        });
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div>
                            <Pagination>
                                <PaginationContent>
                                    {products.current_page > 1 && (
                                        <>
                                            <PaginationItem>
                                                <PaginationPrevious href={products.prev_page_url || ''} />
                                            </PaginationItem>
                                        </>
                                    )}
                                    <PaginationItem>
                                        <PaginationLink href={'#'} isActive>
                                            {products.current_page}
                                        </PaginationLink>
                                    </PaginationItem>
                                    {products.current_page < products.last_page && (
                                        <>
                                            <PaginationItem>
                                                <PaginationLink href={products.next_page_url || ''}>{products.current_page + 1}</PaginationLink>
                                            </PaginationItem>

                                            {products.current_page < products.last_page - 1 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}

                                            <PaginationItem>
                                                <PaginationLink href={products.last_page_url || ''}>{products.last_page}</PaginationLink>
                                            </PaginationItem>

                                            <PaginationItem>
                                                <PaginationNext href={products.next_page_url || ''} />
                                            </PaginationItem>
                                        </>
                                    )}
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

ShowProducts.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
