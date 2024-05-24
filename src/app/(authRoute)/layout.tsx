import ProtectedRoute from "@/context/ProtectedRoute";


interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	return <ProtectedRoute>{children}</ProtectedRoute>;
}
