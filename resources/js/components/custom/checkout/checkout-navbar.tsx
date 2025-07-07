import { Button } from '@/components/ui/button';
import { useWebsiteData } from '@/hooks/use-website-data';
import { Link } from '@inertiajs/react';
import { X } from 'lucide-react';

export const CheckoutNavbar = () => {
    const {
        navbarData: { logo },
    } = useWebsiteData();

    return (
        <section className="px-4 py-4 shadow-lg">
            <div className="container mx-auto">
                {/* Desktop Menu */}
                <nav className="hidden h-10 justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        <Link href={logo.url} className="flex items-center gap-2">
                            <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">{/*<LocaleDropdown />*/}</div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex h-9 items-center justify-between">
                        <Link href={logo.url} className="flex items-center gap-2">
                            <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
                        </Link>
                        <div className="flex flex-row gap-2">
                            <Button variant="ghost" size="icon" className="relative size-8" asChild>
                                <Link href={route('index')}>
                                    <X />
                                </Link>
                            </Button>
                            {/*<LocaleDropdown />*/}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
