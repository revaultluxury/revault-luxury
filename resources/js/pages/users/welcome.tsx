import ProductCard from '@/components/custom/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { useWebsiteData } from '@/hooks/use-website-data';
import MainLayout from '@/layouts/custom/main-layout';
import { Product, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';

export default function Welcome() {
    const { productsByCategory } = usePage<
        SharedData & {
            productsByCategory: { category: { slug: string; name: string }; data: Product[] }[];
        }
    >().props;
    const { carouselData } = useWebsiteData();

    if (!productsByCategory) {
        return <div>Loading</div>;
    }

    return (
        <>
            <Head />
            <MainLayout>
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 2500,
                        }),
                    ]}
                    className="mx-auto mt-3 w-full"
                >
                    <CarouselContent>
                        {carouselData.map((carousel, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card className="min-h-96">
                                        <CardContent className="flex h-96 items-center justify-center">
                                            <img className="h-full w-full object-cover" src={carousel.image} alt={carousel.alt} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="top-1/2 left-12" />
                    <CarouselNext className="top-1/2 right-12" />
                </Carousel>
                {productsByCategory.map((product) => {
                    if (!product.data || product.data.length === 0) {
                        return null;
                    }
                    return (
                        <section key={product.category.slug} className="container mx-auto px-4 py-5">
                            <h1 className="text-center text-xl font-semibold">{product.category.name}</h1>
                            <Separator className="my-4" />
                            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                                {product.data.map((item) => (
                                    <ProductCard key={item.id} product={item} />
                                ))}
                            </div>
                            <div className="mt-5 flex w-full justify-center">
                                <Button size="lg" asChild variant="outline" className="px-10 py-6 shadow-lg">
                                    <Link href={route('products.per-category', product.category.slug)}>See More</Link>
                                </Button>
                            </div>
                        </section>
                    );
                })}
                {/*<section className="container mx-auto px-4 py-5">
                    <h1 className="text-center text-xl font-semibold">Fashion 2 </h1>
                    <Separator className="my-4" />
                    <div className="flex flex-row gap-5 overflow-x-auto py-3 lg:gap-8">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </section>*/}
            </MainLayout>
        </>
    );
}
