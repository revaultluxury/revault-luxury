/*
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWebsiteData } from '@/hooks/use-website-data';
import { Product, SharedData } from '@/types';
import { InertiaFormProps, Link, useForm, usePage } from '@inertiajs/react';
import { ChevronDownIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const UserDetails = ({ form, type }: { form: InertiaFormProps<CheckoutForm>; type: 'shipping' | 'billing' }) => {
    const { setData, data, errors } = form;
    const userData = data[type];

    const handleChange = (field: keyof ShippingForm | keyof BillingForm, value: string) => {
        setData(type, {
            ...userData,
            [field]: value,
        });
    };

    return (
        <>
            <div className="flex w-full flex-col gap-4 md:flex-row">
                <Label className="grid w-full items-center gap-3">
                    First Name
                    <Input
                        type="text"
                        placeholder="First Name"
                        className="font-normal"
                        value={userData.first_name}
                        onChange={(e) => handleChange('first_name', e.target.value)}
                    />
                </Label>

                <Label className="grid w-full items-center gap-3">
                    Last Name
                    <Input
                        type="text"
                        placeholder="Last Name"
                        className="font-normal"
                        value={userData.last_name}
                        onChange={(e) => handleChange('last_name', e.target.value)}
                    />
                </Label>
            </div>

            <Label className="grid w-full items-center gap-3">
                Address
                <Input
                    type="text"
                    placeholder="Address"
                    className="font-normal"
                    value={userData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                />
            </Label>

            <Label className="grid w-full items-center gap-3">
                Apartment, suite, etc. (optional)
                <Input
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    className="font-normal"
                    value={userData.detail_address}
                    onChange={(e) => handleChange('detail_address', e.target.value)}
                />
            </Label>

            <div className="flex w-full flex-col gap-4 md:flex-row">
                <Label className="grid w-full items-center gap-3">
                    City
                    <Input
                        type="text"
                        placeholder="City"
                        className="font-normal"
                        value={userData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                    />
                </Label>

                <Label className="grid w-full items-center gap-3">
                    Province
                    <Input
                        type="text"
                        placeholder="Province"
                        className="font-normal"
                        value={userData.province}
                        onChange={(e) => handleChange('province', e.target.value)}
                    />
                </Label>

                <Label className="grid w-full items-center gap-3">
                    Postal Code
                    <Input
                        type="text"
                        placeholder="Postal Code"
                        className="font-normal"
                        value={userData.postal_code}
                        onChange={(e) => handleChange('postal_code', e.target.value)}
                    />
                </Label>
            </div>
            <Label className="grid w-full items-center gap-3">
                Country
                <Input
                    type="text"
                    placeholder="Country"
                    className="font-normal"
                    value={userData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                />
            </Label>
        </>
    );
};

type OrderSummaryAccordion = 'close' | 'open';
const orderSummaryAccordionValue: OrderSummaryAccordion = 'close';

type BillingAccordion = 'same' | 'different';
const billingAccordionValues: BillingAccordion = 'same';
const billingAccordionOptions: BillingAccordion[] = ['same', 'different'];

const AccordionDisc = ({ checked }: { checked: boolean }) => {
    return (
        <>
            <span className="relative inline-block size-4 translate-y-[1px] rounded-full border border-muted-foreground bg-background p-0.5">
                <span
                    className={`absolute top-1/2 left-1/2 size-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-transform ${checked ? 'scale-100' : 'scale-0'}`}
                ></span>
            </span>
        </>
    );
};

const Order = ({ product, quantity }: { product: Pick<Product, 'price' | 'title' | 'galleries'>; quantity: number }) => {
    return (
        <>
            <div className="flex w-full gap-2 border-b pb-4 last:border-b-0">
                <div className="inline-flex size-16 shrink-0 items-center justify-center rounded border-1 p-0.5 md:size-24">
                    <img src={product.galleries[0].media_url} loading="lazy" alt={product.title} className="w-full object-contain" />
                </div>
                <div className="flex grow flex-col gap-2">
                    <span className="font-semibold">{product.title}</span>
                    <span className="text-sm text-muted-foreground">Quantity: {quantity}</span>
                </div>
                <div className="flex items-center justify-end">
                    <span className="text-lg font-semibold">
                        {(parseFloat(product.price) * quantity).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}
                    </span>
                </div>
            </div>
        </>
    );
};
type CheckoutData = Pick<Product, 'id' | 'title' | 'price' | 'slug' | 'galleries' | 'category'> & {
    qty: number;
};
type ShippingForm = {
    first_name: string;
    last_name: string;
    address: string;
    detail_address?: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
};
type BillingForm = {
    first_name: string;
    last_name: string;
    address: string;
    detail_address?: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
};
type CheckoutForm = {
    contact: string;
    shipping: ShippingForm;
    billing: BillingForm;
};
export default function Checkout() {
    const {
        navbarData: { logo },
    } = useWebsiteData();

    const { checkoutItems, path } = usePage<
        SharedData & {
            checkoutItems: CheckoutData[];
            path: string;
        }
    >().props;

    const [open, setOpen] = useState<OrderSummaryAccordion>(orderSummaryAccordionValue);
    const [billing, setBilling] = useState<BillingAccordion>(billingAccordionValues);

    const form = useForm<CheckoutForm>({
        contact: '',
        shipping: {
            first_name: '',
            last_name: '',
            address: '',
            detail_address: '',
            city: '',
            province: '',
            postal_code: '',
            country: '',
        },
        billing: {
            first_name: '',
            last_name: '',
            address: '',
            detail_address: '',
            city: '',
            province: '',
            postal_code: '',
            country: '',
        },
    });
    const { submit, setData, data, errors } = form;

    useEffect(() => {
        if (billing === 'same') {
            setData('billing', { ...data.shipping });
        } else {
            setData('billing', {
                first_name: '',
                last_name: '',
                address: '',
                detail_address: '',
                city: '',
                province: '',
                postal_code: '',
                country: '',
            });
        }
        console.table(data);
    }, [billing, data.shipping, setData]);

    const toggleAccordion = () => setOpen((prev) => (prev === orderSummaryAccordionValue ? 'open' : orderSummaryAccordionValue));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        submit('post', route('products.checkout.session', path), {
            onSuccess: (response) => {
                console.log('Checkout successful:', response);
            },
            onError: (error) => {
                console.error('Checkout error:', error);
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    const total = checkoutItems.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0);

    return (
        <>
            {/!*navbar*!/}
            <section className="px-4 py-4 shadow-lg">
                <div className="container mx-auto">
                    {/!* Desktop Menu *!/}
                    <nav className="hidden h-10 justify-between lg:flex">
                        <div className="flex items-center gap-6">
                            {/!* Logo *!/}
                            <Link href={logo.url} className="flex items-center gap-2">
                                <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">{/!*<LocaleDropdown />*!/}</div>
                    </nav>

                    {/!* Mobile Menu *!/}
                    <div className="block lg:hidden">
                        <div className="flex h-9 items-center justify-between">
                            {/!* Logo *!/}
                            <Link href={logo.url} className="flex items-center gap-2">
                                <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
                            </Link>
                            <div className="flex flex-row gap-2">
                                <Button variant="ghost" size="icon" className="relative size-8" asChild>
                                    <Link href={route('index')}>
                                        <X />
                                    </Link>
                                </Button>
                                {/!*<LocaleDropdown />*!/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/!*end navbar*!/}
            <div className="container mx-auto px-4 py-4 md:px-32 lg:px-4">
                {/!*Mobile View*!/}
                <form onSubmit={handleSubmit} className="block space-y-5 lg:hidden">
                    <Card className="gap-0">
                        <a role="button" onClick={() => toggleAccordion()}>
                            <CardHeader className="gap-6">
                                <CardTitle className="inline-flex w-full flex-row items-center justify-between">
                                    <span>Order Summary</span>
                                    <span className="text-lg font-bold">
                                        {total.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                    </span>
                                </CardTitle>
                                <CardDescription className="flex flex-row items-center justify-center gap-2">
                                    <span className="pointer-events-none">Order Summary</span>
                                    <ChevronDownIcon
                                        className={`pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200 ${open === orderSummaryAccordionValue ? '-rotate-180' : 'rotate-0'}`}
                                    />
                                </CardDescription>
                            </CardHeader>
                        </a>
                        <CardContent className="px-4">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                                value={open}
                                onValueChange={(value) => setOpen(value as OrderSummaryAccordion)}
                            >
                                <AccordionItem value="open">
                                    <AccordionContent className="flex flex-col gap-4 p-0 pt-4 text-balance">
                                        <div className="flex w-full flex-col gap-4 p-2">
                                            {checkoutItems.map((item) => (
                                                <Order key={item.id} product={item} quantity={item.qty} />
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Contact</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">Please provide your contact information.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="contact">Email or Phone Number</Label>
                                <Input
                                    type="text"
                                    inputMode="email"
                                    id="contact"
                                    placeholder="Email or Phone Number"
                                    value={data.contact}
                                    onChange={(e) => setData('contact', e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Delivery</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">Please provide your shipping information.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <UserDetails form={form} type="shipping" />

                            <Label className="flex items-center gap-3">
                                <Checkbox />
                                Save this information for next time
                            </Label>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Billing Address</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <Accordion
                                type="single"
                                collapsible
                                className="rounded border px-3"
                                value={billing}
                                onValueChange={(value) => setBilling(value as BillingAccordion)}
                            >
                                <AccordionItem value={billingAccordionOptions[0]}>
                                    <a
                                        role="button"
                                        onClick={() => setBilling(billingAccordionOptions[0])}
                                        className="flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180"
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <AccordionDisc checked={billing === billingAccordionOptions[0]} />
                                            Same as shipping address
                                        </span>
                                    </a>
                                </AccordionItem>
                                <AccordionItem value={billingAccordionOptions[1]}>
                                    <a
                                        role="button"
                                        onClick={() => setBilling(billingAccordionOptions[1])}
                                        className="flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180"
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <AccordionDisc checked={billing === billingAccordionOptions[1]} />
                                            Use a different billing address
                                        </span>
                                    </a>
                                    <AccordionContent className="flex flex-col gap-4 text-balance">
                                        <UserDetails form={form} type="billing" />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="space-y-4">
                            <div className="inline-flex w-full items-center justify-between">
                                <span className="font-bold">Total:</span>
                                <span className="text-xl font-black">
                                    {total.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                </span>
                            </div>
                            <Button size="lg" className="w-full">
                                Pay
                            </Button>
                        </CardContent>
                    </Card>
                </form>

                {/!*Desktop View*!/}
            </div>
        </>
    );
}
*/
import { CheckoutDesktopForm } from '@/components/custom/checkout/checkout-desktop-form';
import { CheckoutMobileForm } from '@/components/custom/checkout/checkout-mobile-form';
import { CheckoutNavbar } from '@/components/custom/checkout/checkout-navbar';
import { useCartStore } from '@/stores/cart';
import { AccordionState, BillingState, CheckoutForm, CheckoutItem, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Checkout() {
    const { checkoutItems, path } = usePage<SharedData & { checkoutItems: CheckoutItem[]; path: string }>().props;
    const removeCart = useCartStore((state) => state.removeFromCart);
    const [orderAccordion, setOrderAccordion] = useState<AccordionState>('close');
    const [billingState, setBillingState] = useState<BillingState>('same');

    const form = useForm<CheckoutForm>({
        contact: '',
        shipping: {
            first_name: '',
            last_name: '',
            address: '',
            detail_address: '',
            city: '',
            province: '',
            postal_code: '',
            country: '',
        },
        billing: {
            first_name: '',
            last_name: '',
            address: '',
            detail_address: '',
            city: '',
            province: '',
            postal_code: '',
            country: '',
        },
        save_shipping: false,
    });

    useEffect(() => {
        if (billingState === 'same') {
            form.setData('billing', { ...form.data.shipping });
        } else if (billingState === 'different') {
            form.reset('billing');
        }
    }, [billingState, form.data.shipping]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(route('products.checkout.session', path), {
            onSuccess: () => {
                checkoutItems.forEach((item) => removeCart(item.slug));
            },
            onError: (errors) => console.error(errors),
            preserveScroll: true,
            preserveState: true,
        });
    };

    const total = checkoutItems.reduce((sum, item) => sum + parseFloat(item.price) * item.qty, 0);

    return (
        <>
            <CheckoutNavbar />

            <div className="container mx-auto px-4 py-4 md:px-32 lg:px-4">
                <CheckoutMobileForm
                    form={form}
                    orderAccordion={orderAccordion}
                    setOrderAccordion={setOrderAccordion}
                    billingState={billingState}
                    setBillingState={setBillingState}
                    checkoutItems={checkoutItems}
                    total={total}
                    onSubmit={handleSubmit}
                />

                {/* Desktop View (to be implemented) */}

                <CheckoutDesktopForm
                    form={form}
                    orderAccordion={orderAccordion}
                    setOrderAccordion={setOrderAccordion}
                    billingState={billingState}
                    setBillingState={setBillingState}
                    checkoutItems={checkoutItems}
                    total={total}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );
}
