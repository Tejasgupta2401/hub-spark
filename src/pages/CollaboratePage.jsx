import React, { useState } from 'react';
import { Users, Copy, AlertCircle } from 'lucide-react';

export const CollaboratePage = () => {
  const [roomId, setRoomId] = useState('');
  const [joined, setJoined] = useState(false);
  const [participants, setParticipants] = useState([]);

  const generateRoomId = () => {
    const id = Math.random().toString(36).substr(2, 9).toUpperCase();
    setRoomId(id);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      setJoined(true);
      setParticipants([
        { id: 1, name: 'You', color: '#3b82f6' },
        { id: 2, name: 'User 2', color: '#ef4444' },
      ]);
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    alert('Room ID copied!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Real-Time Collaboration</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Room Management */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
            <h3 className="text-xl font-semibold mb-4">Join Room</h3>

            <div className="space-y-4">
              {!joined ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room ID
                    </label>
                    <input
                      type="text"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                      placeholder="Enter room ID or generate one"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-center text-lg tracking-widest"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={generateRoomId}
                      className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition font-semibold"
                    >
                      Generate
                    </button>
                    <button
                      onClick={copyRoomId}
                      disabled={!roomId}
                      className="flex-1 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>

                  <button
                    onClick={handleJoinRoom}
                    disabled={!roomId}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
                  >
                    Join Room
                  </button>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      Generate a room ID or enter an existing one to start collaborating in real-time.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-800 mb-2">Room ID</p>
                    <p className="font-mono text-lg font-bold text-green-900 text-center">{roomId}</p>
                  </div>

                  <button
                    onClick={() => {
                      setJoined(false);
                      setRoomId('');
                    }}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-lg font-semibold transition"
                  >
                    Leave Room
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Collaboration Area */}
        <div className="lg:col-span-2">
          {joined ? (
            <div className="space-y-6">
              {/* Participants */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Active Participants</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ backgroundColor: participant.color }}
                      >
                        {participant.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{participant.name}</p>
                        <p className="text-xs text-gray-500">Online</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collaborative Editor Preview */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Shared Code Editor</h3>
                <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-auto">
                  <pre className="text-gray-300 font-mono text-sm">
{`function collaborative() {
  // Your code here
  // Changes update in real-time
  // for all participants
  return "Live editing enabled";
}`}
                  </pre>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  💡 Type code above and see it update in real-time for all participants
                </p>
              </div>

              {/* Activity Log */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Activity</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>✓ You joined the room</p>
                  <p>✓ User 2 joined the room</p>
                  <p>→ User 2 is editing line 5</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-12 text-center">
              <Users className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to Collaborate?
              </h3>
              <p className="text-gray-600">
                Generate or join a room to start real-time code collaboration with your team.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaboratePage;
