// Real-time collaboration utilities
export const collaborationHandler = {
  activeRooms: new Map(),

  joinRoom(roomId, userId) {
    if (!this.activeRooms.has(roomId)) {
      this.activeRooms.set(roomId, {
        users: new Set(),
        code: '',
        cursors: new Map(),
      });
    }
    this.activeRooms.get(roomId).users.add(userId);
  },

  updateCode(roomId, code) {
    if (this.activeRooms.has(roomId)) {
      this.activeRooms.get(roomId).code = code;
    }
  },

  getCursorPosition(roomId) {
    return this.activeRooms.get(roomId)?.cursors || new Map();
  },

  leaveRoom(roomId, userId) {
    if (this.activeRooms.has(roomId)) {
      this.activeRooms.get(roomId).users.delete(userId);
      if (this.activeRooms.get(roomId).users.size === 0) {
        this.activeRooms.delete(roomId);
      }
    }
  },
};
