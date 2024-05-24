"use client"
import { useState } from "react";

export default function Page({ params }: {
    params: {
        productId: string,
        reviewId: string
    }
}) {
    const [count, setCount] = useState<number>(0);

    return (
        <div>The given id {params.reviewId} of review of product id is {params.productId}
            <button onClick={e => {
                setCount(count + 1);
                 if (count === 2) {
                    throw new Error("Error on Logging")
                }
            }}>Count {count}</button></div>
    );
}