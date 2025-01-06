import Link from 'next/link';

export default function Dashboard() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Dashboard</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><Link href="/dashboard/progress">Track Progress</Link></li>
                <li><Link href="/dashboard/goals">Set Goals</Link></li>
                <li><Link href="/dashboard/plans">Generate Plans</Link></li>
            </ul>
        </div>
    );
}
