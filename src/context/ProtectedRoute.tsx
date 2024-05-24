'use client';

import { redirect } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { loginPageSlices } from '@/app/(unAuthRoute)/login/loginPageSlice';

interface Props {
	children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
	const { isAuthenticated } = useAppSelector(loginPageSlices);


	if (!isAuthenticated) {
		redirect('/login');
		return null;
	}

	return <>{children}</>;
}
