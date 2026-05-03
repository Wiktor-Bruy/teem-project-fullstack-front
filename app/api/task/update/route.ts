import { NextResponse } from 'next/server';

interface UpdateTaskRequest {
  status: string;
}

export async function PATCH(request: Request, { params }: { params: { taskId: string } }) {
  const { taskId } = params;
  const body: UpdateTaskRequest = await request.json();
  
  try {
    const response = await fetch(`https://your-backend-api-url/task/update/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: body.status,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ message: 'Task status updated successfully', data }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || 'Failed to update task status' },
        { status: response.status }
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else if (typeof error === 'string') {
      return NextResponse.json({ message: error }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
    }
  }
}