import RoomDTO from '../dtos/room.dto';
import roomService from '../service/room-service';
import { createRoom, inviteUserToRoom, leaveRoom, deleteRoom, getRoomsForUser } from './types/Room';

class roomController {
  createRoom: createRoom = async (req, res, next) => {
    try {
      const { name, userId } = req.body;
      const room = await roomService.createRoom(name, userId);
      return res.json({ room: new RoomDTO(room) });
    } catch (error) {
      next(error);
    }
  };

  inviteUserToRoom: inviteUserToRoom = async (req, res, next) => {
    try {
      const { roomId, userId } = req.body;
      const room = await roomService.inviteUserToRoom(roomId, userId);
      return res.json(room);
    } catch (error) {
      next(error);
    }
  };

  leaveRoom: leaveRoom = async (req, res, next) => {
    try {
      const { roomId, userId } = req.body;
      await roomService.leaveRoom(roomId, userId);
      return res.json({ message: 'Left room successfully' });
    } catch (error) {
      next(error);
    }
  };

  deleteRoom: deleteRoom = async (req, res, next) => {
    try {
      const { roomId, userId } = req.body;
      await roomService.deleteRoom(roomId, userId);
      return res.json({ message: 'Room deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  getRoomsForUser: getRoomsForUser = async (req, res, next) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
      }
      console.log("🚀 ~ roomController ~ getRoomsForUser:getRoomsForUser= ~ userId:", userId)
      const rooms = await roomService.getRoomsForUser(userId);
      return res.json(rooms);
    } catch (error) {
      next(error);
    }
  };
}

export default new roomController();
