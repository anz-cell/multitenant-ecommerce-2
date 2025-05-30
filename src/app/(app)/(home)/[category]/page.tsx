import { ProductFilters } from "@/modules/products/ui/components/product-filters";
import { ProductList, ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductSort } from "@/modules/products/ui/components/product-sort";
import { ProductView } from "@/modules/products/ui/views/product-list-view";

interface Props {
    params: Promise<{
        category: string;
    }>,
    searchParams: Promise<SearchParams>;
}
const Page = async ({ params, searchParams }: Props) => {
    const { category } = await params;
    const filters = await loadProductFilters(searchParams);

    console.log(JSON.stringify(filters), "THIS IS FROM RSC");

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
        category,
        ...filters,
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductView category={category}/>
        </HydrationBoundary>
    );
};

export default Page;