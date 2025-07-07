import { Button } from '@/components/ui/button';
import { fetchCheckoutRedirectUrl } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import { Product } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Check, ShoppingCart } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState } from 'react';

type ProductCardProps = {
    product: Product;
};

// Define types for component props
interface AddToCartButtonProps {
    onAddToCart?: () => void;
    productName?: string;
    variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link' | 'premium';
    size?: 'sm' | 'default' | 'lg' | 'icon';
    disabled?: boolean;
}

const AddToCartButton = ({ onAddToCart, productName = 'Item', size = 'default', variant = 'default', disabled = false }: AddToCartButtonProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const resetTimer = useRef<NodeJS.Timeout | null>(null);
    const successTimer = useRef<NodeJS.Timeout | null>(null);

    type SizeClasses = {
        [key in NonNullable<AddToCartButtonProps['size']>]: {
            button: string;
            icon: number;
        };
    };

    const sizeClasses: SizeClasses = {
        sm: {
            button: 'h-8 w-8',
            icon: 16,
        },
        default: {
            button: 'h-9 w-9',
            icon: 18,
        },
        lg: {
            button: 'h-10 w-10',
            icon: 20,
        },
        icon: {
            button: 'h-9 w-9',
            icon: 18,
        },
    };

    // Define variants
    const variantClasses = {
        default: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground text-foreground',
        outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        premium: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90',
    };

    const handleClick = () => {
        if (disabled) return;

        // Clear any existing timers
        if (resetTimer.current) clearTimeout(resetTimer.current);
        if (successTimer.current) clearTimeout(successTimer.current);

        // Trigger animations
        setIsAnimating(true);

        // Call the provided callback
        if (onAddToCart) {
            onAddToCart();
        }

        // Reset animations after 300ms
        resetTimer.current = setTimeout(() => {
            setIsAnimating(false);
        }, 300);

        // Show success state
        setIsAdded(true);

        // Reset success state after 1 second
        successTimer.current = setTimeout(() => {
            setIsAdded(false);
        }, 1000);
    };

    // Cleanup timers on component unmount
    useEffect(() => {
        return () => {
            if (resetTimer.current) clearTimeout(resetTimer.current);
            if (successTimer.current) clearTimeout(successTimer.current);
        };
    }, []);

    return (
        <div className="relative">
            <Head>
                <style>{`
                    @keyframes bounce {
                        0%, 100% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.1);
                        }
                    }

                    .animate-bounce-click {
                        animation: bounce 0.3s ease-out;
                    }
                `}</style>
            </Head>

            <Button
                variant={variant === 'premium' ? 'default' : variant}
                size="icon"
                className={`group relative transition-all duration-300 hover:shadow-lg ${sizeClasses[size].button} ${variantClasses[variant]} ${isAnimating ? 'animate-bounce-click' : ''} ${
                    isAdded ? '!bg-green-400 !text-green-50 hover:!bg-green-500' : ''
                } ${disabled ? 'cursor-not-allowed opacity-50' : ''} `}
                onClick={handleClick}
                aria-label={`Add ${productName} to cart`}
                disabled={disabled}
            >
                {isAdded ? (
                    <Check size={sizeClasses[size].icon} className="transition-all" />
                ) : (
                    <>
                        <ShoppingCart size={sizeClasses[size].icon} className="transition-all" />
                    </>
                )}
            </Button>
        </div>
    );
};

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({ product }, ref) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    return (
        <>
            <div
                ref={ref}
                className="group max-w-60 shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.03)]"
            >
                {/* Image with badge */}
                <div className="relative h-52 overflow-hidden">
                    <img
                        src={
                            product.galleries.length !== 0
                                ? product.galleries[0].media_url
                                : 'https://placehold.jp/c7c7c7/ffffff/900x900.jpg?text=Coming%20Soon'
                        }
                        loading="lazy"
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/*todo: if sale remove hidden*/}
                    <div className="absolute top-3 right-3 hidden rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                        SALE
                    </div>
                </div>

                {/* Content */}
                <div className="flex h-[calc(100%-13rem)] flex-col p-4">
                    <div className="mb-3 flex w-full grow items-start justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{product.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
                        </div>
                    </div>

                    <div className="mb-5 flex h-fit items-center justify-between">
                        <div className="flex flex-col gap-1">
                            {/*todo: if sale remove hidden*/}
                            <span className="hidden text-sm text-gray-400 line-through">
                                {parseFloat(product.price).toLocaleString('en-US', {
                                    currency: 'USD',
                                    style: 'currency',
                                })}
                            </span>
                            <span className="text-xl font-semibold text-gray-900">
                                {parseFloat(product.price).toLocaleString('en-US', {
                                    currency: 'USD',
                                    style: 'currency',
                                })}
                            </span>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <div className="flex space-x-3">
                            <Button
                                className="grow"
                                disabled={isLoading}
                                onClick={() => {
                                    setIsLoading(true);
                                    fetchCheckoutRedirectUrl(
                                        {
                                            slug: product.slug,
                                            qty: 1,
                                        },
                                        {
                                            onSuccess: (checkoutUrl) => {
                                                router.get(checkoutUrl);
                                            },
                                            onError: (error) => {
                                                console.error('Error fetching checkout URL:', error);
                                            },
                                            onFinally: () => {
                                                setIsLoading(false);
                                            },
                                        },
                                    );
                                }}
                            >
                                Buy It Now
                            </Button>
                            <AddToCartButton
                                productName={product.title}
                                variant="default"
                                onAddToCart={() => {
                                    addToCart(product.slug, 1);
                                    setIsAnimating(true);
                                }}
                            />
                        </div>
                        <Button asChild className="grow" variant="outline">
                            <Link href={route('products.show', product.slug)}>View Details</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
