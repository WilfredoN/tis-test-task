import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://tis-test-task.onrender.com:3001'

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error proxying users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error saving user:', error)
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 })
  }
}
