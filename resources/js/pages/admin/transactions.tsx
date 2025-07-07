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
import { PaginatedResponse, SharedData, Transaction } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Fragment, useEffect, useRef, useState } from 'react';

export default function AdminTransactions() {
    const { transactions, search } = usePage<
        SharedData & {
            transactions: PaginatedResponse<Transaction>;
            search: string;
        }
    >().props;
    const [openTransactionId, setOpenTransactionId] = useState<string | null>(null);
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
            route('admin.transactions'),
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
                            <Input type="text" placeholder="Search by invoice number" value={input} onChange={(e) => setInput(e.target.value)} />
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Transaction Date</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.data.map((tx) => (
                                    <Fragment key={tx.id}>
                                        <TableRow>
                                            <TableCell>{tx.invoice_number}</TableCell>
                                            <TableCell>
                                                {tx.customer_shipping_first_name} {tx.customer_shipping_last_name}
                                                <div className="text-xs text-muted-foreground">{tx.customer_contact}</div>
                                            </TableCell>
                                            <TableCell>
                                                {parseFloat(tx.total_amount).toLocaleString('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                })}{' '}
                                                <span className="text-xs text-muted-foreground">({tx.total_weight}g)</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className={
                                                        tx.status.toUpperCase() === 'PENDING'
                                                            ? 'bg-yellow-400 dark:bg-yellow-600'
                                                            : 'bg-green-400 dark:bg-green-600'
                                                    }
                                                >
                                                    {tx.status.toUpperCase()}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(tx.transaction_date).toLocaleString('en-UK', {
                                                    dateStyle: 'short',
                                                    timeStyle: 'short',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => setOpenTransactionId((prev) => (prev === tx.id ? null : tx.id))}
                                                >
                                                    {openTransactionId === tx.id ? 'Hide Products' : 'View Products'}
                                                </Button>
                                            </TableCell>
                                        </TableRow>

                                        {openTransactionId === tx.id && (
                                            <TableRow>
                                                <TableCell colSpan={6}>
                                                    <Table className="mt-2">
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>Image</TableHead>
                                                                <TableHead>Title</TableHead>
                                                                <TableHead>Category</TableHead>
                                                                <TableHead>Price</TableHead>
                                                                <TableHead>Quantity</TableHead>
                                                                <TableHead>Weight</TableHead>
                                                                <TableHead>Subtotal</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {tx.detail_transactions.map((dt) => (
                                                                <TableRow key={dt.product_id}>
                                                                    <TableCell>
                                                                        <img
                                                                            src={dt.snapshot_image}
                                                                            alt={dt.snapshot_title}
                                                                            className="h-16 w-16 rounded object-cover"
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>{dt.snapshot_title}</TableCell>
                                                                    <TableCell>{dt.snapshot_category}</TableCell>
                                                                    <TableCell>
                                                                        {parseFloat(dt.snapshot_price).toLocaleString('en-US', {
                                                                            style: 'currency',
                                                                            currency: 'USD',
                                                                        })}
                                                                    </TableCell>
                                                                    <TableCell>{dt.quantity}</TableCell>
                                                                    <TableCell>{dt.snapshot_weight}g</TableCell>
                                                                    <TableCell>
                                                                        {parseFloat(dt.subtotal).toLocaleString('en-US', {
                                                                            style: 'currency',
                                                                            currency: 'USD',
                                                                        })}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </Fragment>
                                ))}
                            </TableBody>
                        </Table>
                        <div>
                            <Pagination>
                                <PaginationContent>
                                    {transactions.current_page > 1 && (
                                        <>
                                            <PaginationItem>
                                                <PaginationPrevious href={transactions.prev_page_url || ''} />
                                            </PaginationItem>
                                        </>
                                    )}
                                    <PaginationItem>
                                        <PaginationLink href={'#'} isActive>
                                            {transactions.current_page}
                                        </PaginationLink>
                                    </PaginationItem>
                                    {transactions.current_page < transactions.last_page && (
                                        <>
                                            <PaginationItem>
                                                <PaginationLink href={transactions.next_page_url || ''}>
                                                    {transactions.current_page + 1}
                                                </PaginationLink>
                                            </PaginationItem>

                                            {transactions.current_page < transactions.last_page - 1 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}

                                            <PaginationItem>
                                                <PaginationLink href={transactions.last_page_url || ''}>{transactions.last_page}</PaginationLink>
                                            </PaginationItem>

                                            <PaginationItem>
                                                <PaginationNext href={transactions.next_page_url || ''} />
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
AdminTransactions.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
