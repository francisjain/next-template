"use client"
export default function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div>Error is {error.message}</div>
    );
}  