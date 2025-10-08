import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, feedback } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // In a real application, you would save this to a database
    // For now, we'll just log it and return success
    console.log('Beta feedback received:', {
      email,
      feedback,
      timestamp: new Date().toISOString(),
    });

    // You can integrate with services like:
    // - Airtable
    // - Google Sheets
    // - Email service (SendGrid, etc.)
    // - Database (PostgreSQL, MongoDB, etc.)

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
    });

  } catch (error) {
    console.error('Feedback API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}
