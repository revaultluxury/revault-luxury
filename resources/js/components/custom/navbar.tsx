import { Menu, ShoppingBag, Trash } from 'lucide-react';

import QuantityInput from '@/components/custom/qty-input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { fetchCheckoutRedirectUrl } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import { Product } from '@/types';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface NavbarProps {
    logo?: {
        url: string;
        title: string;
    };
    menu?: MenuItem[];
}

const LocaleDropdown = () => {
    return (
        <div className="hidden">
            <Select>
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="cn">简体中文</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

const SearchInput = () => {
    return (
        <>
            {/*<Popover>
                <PopoverTrigger asChild>
                    <Button variant="secondary" size="icon" className="size-8">
                        <Search />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Input type="search" placeholder="Search" />
                </PopoverContent>
            </Popover>*/}
        </>
    );
};
type ShoppingCartItem = Pick<Product, 'id' | 'title' | 'price' | 'slug' | 'stock' | 'galleries' | 'category'> & {
    qty: number;
};
const ShoppingCart = () => {
    const cartStorage = useCartStore((state) => state.cart);
    const rawSetCartQty = useCartStore((state) => state.setCartQty);
    const rawRemoveFromCart = useCartStore((state) => state.removeFromCart);
    const [cart, setCart] = useState<ShoppingCartItem[]>([]);

    const handleUpdateCartQty = (slug: string, qty: number) => {
        setCart((prev) => prev.map((item) => (item.slug === slug ? { ...item, qty } : item)));

        rawSetCartQty(slug, qty);
    };

    function handleDeleteCart(slug: string) {
        setCart((prev) => prev.filter((item) => item.slug !== slug));
        rawRemoveFromCart(slug);
    }

    useEffect(() => {
        const controller = new AbortController();
        axios
            .post(
                route('products.cart'),
                {
                    cart: cartStorage.map((item) => ({
                        slug: item.slug,
                        qty: item.qty,
                    })),
                },
                {
                    signal: controller.signal,
                },
            )
            .then((response) => {
                setCart(response.data.products);
                const removedItems = response.data['products_not_found'] as string[];

                if (removedItems?.length > 0) {
                    removedItems.forEach((slug: string) => {
                        rawRemoveFromCart(slug);
                    });
                }
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    setCart([]);
                    console.error('Error fetching cart items:', error);
                }
            });
        return () => controller.abort();
    }, [cartStorage]);

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="secondary" size="icon" className="relative size-8">
                        <ShoppingBag />
                        {cartStorage.length > 0 && (
                            <>
                                <span className="absolute top-0 right-0 size-2.5 animate-ping rounded-full bg-red-400"></span>
                                <span className="absolute top-0 right-0 size-2.5 rounded-full bg-red-400"></span>
                            </>
                        )}
                    </Button>
                </SheetTrigger>

                <SheetContent className="w-11/12">
                    <SheetHeader>
                        <SheetTitle>Your Cart</SheetTitle>
                    </SheetHeader>
                    <div className="h-[calc(100%-var(--spacing)*4*2*2-0.5rem)] px-3 pb-2">
                        {cart.length === 0 ? (
                            <div className="inline-flex h-full w-full items-center justify-center text-muted-foreground">Your cart is empty</div>
                        ) : (
                            <>
                                <div className="flex flex-row justify-between">
                                    <span>Items</span>
                                    <span>Total</span>
                                </div>
                                <div className="h-[calc(100%-(var(--spacing)*18+var(--spacing)*10))] overflow-y-auto">
                                    <ul className="scroll-m-2 space-y-2">
                                        {cart.map((item) => (
                                            <li key={item.id} className="flex items-center justify-between border-b pb-2">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={item.galleries[0].media_url}
                                                        alt={item.title}
                                                        className="size-20 rounded object-contain"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-lg font-bold">{item.title}</span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {parseFloat(item.price).toLocaleString('en-US', {
                                                                currency: 'USD',
                                                                style: 'currency',
                                                            })}{' '}
                                                            &bull; {item.stock} item{item.stock > 1 ? 's' : ''} left
                                                        </span>
                                                        <div className="flex w-fit origin-left scale-90 flex-row items-center gap-2">
                                                            <QuantityInput
                                                                value={item.qty}
                                                                max={item.stock}
                                                                onChange={(value) => handleUpdateCartQty(item.slug, value)}
                                                            />
                                                            <Button onClick={() => handleDeleteCart(item.slug)} variant="destructive">
                                                                <Trash />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span>
                                                    {(parseFloat(item.price) * item.qty).toLocaleString('en-US', {
                                                        currency: 'USD',
                                                        style: 'currency',
                                                    })}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                        <div className="h-20 w-full">
                            <div className="flex items-center justify-between border-t py-2">
                                <span className="text-lg font-semibold">Total</span>
                                <span className="text-lg font-semibold">
                                    {cart
                                        .reduce((total, item) => total + parseFloat(item.price) * item.qty, 0)
                                        .toLocaleString('en-US', {
                                            currency: 'USD',
                                            style: 'currency',
                                        })}
                                </span>
                            </div>
                            <Button
                                className="w-full"
                                onClick={() => {
                                    fetchCheckoutRedirectUrl(
                                        cart.map((item) => ({
                                            slug: item.slug,
                                            qty: item.qty,
                                        })),
                                        {
                                            onSuccess: (checkoutUrl) => {
                                                router.get(checkoutUrl);
                                            },
                                            onError: (error) => {
                                                console.error('Error fetching checkout URL:', error);
                                            },
                                        },
                                    );
                                }}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};

const Navbar = ({
    logo = {
        url: 'https://www.shadcnblocks.com',
        title: 'Shadcnblocks.com',
    },
    menu = [
        { title: 'Home', url: '/' },
        // {
        //     title: 'Products',
        //     url: '#',
        //     items: [
        //         {
        //             title: 'Blog',
        //             description: 'The latest industry news, updates, and info',
        //             icon: <Book className="size-5 shrink-0" />,
        //             url: '#',
        //         },
        //         {
        //             title: 'Company',
        //             description: 'Our mission is to innovate and empower the world',
        //             icon: <Trees className="size-5 shrink-0" />,
        //             url: '#',
        //         },
        //         {
        //             title: 'Careers',
        //             description: 'Browse job listing and discover our workspace',
        //             icon: <Sunset className="size-5 shrink-0" />,
        //             url: '#',
        //         },
        //         {
        //             title: 'Support',
        //             description: 'Get in touch with our support team or visit our community forums',
        //             icon: <Zap className="size-5 shrink-0" />,
        //             url: '#',
        //         },
        //     ],
        // },
        {
            title: 'Pricing',
            url: '#',
        },
        {
            title: 'Blog',
            url: '#',
        },
    ],
}: NavbarProps) => {
    return (
        <section className="px-4 py-4 shadow-lg">
            <div className="container mx-auto">
                {/* Desktop Menu */}
                <nav className="hidden justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <Link href={logo.url} className="flex items-center gap-2">
                            <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
                        </Link>
                        <div className="flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <LocaleDropdown />
                        <ShoppingCart />
                        <SearchInput />
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href={logo.url} className="flex items-center gap-2">
                            <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
                        </Link>
                        <div className="flex flex-row gap-2">
                            <ShoppingCart />
                            <SearchInput />

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Menu className="size-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <Link href={logo.url} className="flex items-center gap-2">
                                                <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
                                            </Link>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-6 p-4">
                                        <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                                            {menu.map((item) => renderMobileMenuItem(item))}
                                        </Accordion>

                                        <div className="flex flex-col gap-3">
                                            <LocaleDropdown />
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="w-80">
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink asChild>
                <Link
                    href={item.url}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                >
                    {item.title}
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">{item.title}</AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <Link key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </Link>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <Link
            className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
            href={item.url}
        >
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>}
            </div>
        </Link>
    );
};

export { Navbar };
