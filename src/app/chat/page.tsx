"use client";

const Chat = () => {
  return (
    <div className="min-h-screen bg_ text-white flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">{`흑백요리사 즐거우셨나요?`}</h2>
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-500">{`자유롭게 얘기 나누어봅시다.`}</h2>
        <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-gray-700 rounded-md">
          <div className="flex items-start space-x-3">
            <div className="bg-gray-600 p-3 rounded-lg">
              <p className="text-sm">{`I'm good, thanks! And you?`}</p>
              <span className="text-xs text-gray-400">{`10:01`}</span>
            </div>
          </div>

          <div className="flex items-end justify-end space-x-3">
            <div className="bg-blue-600 p-3 rounded-lg">
              <p className="text-sm">{`I'm good, thanks! And you?`}</p>
              <span className="text-xs text-gray-400">{`10:01`}</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none"
          />
          <button className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
