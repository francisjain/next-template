import { notFound } from "next/navigation";
import { Metadata } from 'next'

type Props = {
    params: { productId: string }
}
export const generateMetadata = ({ params }: Props): Metadata => {
    return {
        title: `Product ID ${params.productId}`
    }
}

export default function ProductDetails({ params }: Props) {
    if (parseInt(params.productId) > 100) {
        notFound();
    }
    return (
        <div>
            The Given Details of Product {params.productId}
        </div>
    );
}