import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const user = await clerkClient.users.getUser(userId);
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const userId = req.nextUrl.pathname.split('/').pop();

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        await clerkClient.users.deleteUser(userId);
        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
