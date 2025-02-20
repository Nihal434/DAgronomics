import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import useAuth from '../contexts/auth-context';

export default function Navbar() {
	const { address, isConnected } = useAccount();
	const [showRequest, setShowRequest] = useState(false);
	const router = useRouter();
	const { role } = useAuth();

	useEffect(() => {
		if (isConnected) {
			if (role === 'super') {
				setShowRequest(true);
			}
		}
	}, [role, isConnected]);

	const handleDashboarRoute = () => {
		if (isConnected && role) {
			if (role === 'farmer') {
				router.push(`/farmer-dashboard`);
			} else if (role === 'distributor') {
				router.push(`/distributor-dashboard`);
			} else if (role === 'retailer') {
				router.push(`/retailer-dashboard`);
			} else {
				router.push(`/farmer-dashboard`);
			}
		}
	};

	return (
		<nav className='h-[10vh] flex items-center bg-base-300 justify-between sticky top-0 w-full z-20 bg-opacity-90'>
			<span
				onClick={() => router.push('/listing')}
				className='p-6 text-2xl font-extrabold cursor-pointer'
			>
				Dagronomics
			</span>
			{showRequest && (
				<span
					onClick={() => router.push(`/requests/${address}`)}
					className='p-6 text-2xl font-extrabold ml-auto justify-end cursor-pointer'
				>
					requests
				</span>
			)}
			<span
				className='justify-end px-4 text-primary self-center cursor-pointer'
				onClick={handleDashboarRoute}
			>
				{isConnected && address}
			</span>
		</nav>
	);
}
