import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const responseText = `Chào bạn, tôi là Master AI. Tôi đã nhận được câu hỏi của bạn: "${lastMessage}". \n\nHiện tại tôi đang trong quá trình chiêm nghiệm sâu hơn về lá số của bạn. Khi hệ thống phân tích hoàn tất, tôi sẽ mang đến cho bạn những lời luận giải chi tiết nhất về sự nghiệp, tình duyên và sức khỏe. \n\nBạn hãy kiên nhẫn một chút nhé. ✨`;
      
      const words = responseText.split(" ");
      for (const word of words) {
        controller.enqueue(encoder.encode(word + " "));
        await new Promise((r) => setTimeout(r, 50)); // Simulate streaming
      }
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
