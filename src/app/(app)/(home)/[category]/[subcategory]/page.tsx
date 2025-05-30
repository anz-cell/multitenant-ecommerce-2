import { loadProductFilters } from "@/modules/products/search-params";
import { ProductList, ProductListSkeleton } from "@/modules/products/ui/components/product-list";
import { ProductView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

interface Props {
    params: Promise<{
        subcategory: string;
    }>,
    searchParams: Promise<SearchParams>;
}
const Page = async ({ params, searchParams }: Props) => {
    const { subcategory } = await params;
    const filters = await loadProductFilters(searchParams);

    console.log(JSON.stringify(filters), "THIS IS FROM RSC");

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
        category: subcategory,
        ...filters,
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductView category={subcategory}/>
        </HydrationBoundary>
    );
};

export default Page;