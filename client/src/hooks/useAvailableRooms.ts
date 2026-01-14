import { AvailableRoomType } from "@/api/room.types";
import { useQuery } from "@tanstack/react-query";

export const useAvailableRooms = (startDate: string, endDate: string, adults: string | number = 1, children: string | number = 0, rooms: string | number = 1, location: string) => {
  return useQuery({
    queryKey: ["availableRooms", startDate, endDate, adults, children, rooms, location],
    queryFn: async () => {
      const response = await fetch(`/api/availableRooms?startDate=${startDate}&endDate=${endDate}&adults=${adults}&children=${children}&rooms=${rooms}&location=${location}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log({availableRooms: result.data})
      return setCategories(result.data);
    },
  })
}

const setCategories = (rooms: AvailableRoomType[])=>{
  rooms.forEach((room)=>{
    room.roomType = getRoomType(room.roomTypeName);
    room.bedType = getBedType(room.roomTypeName);
    room.bathroomType = getBathroomType(room.roomTypeName);
  })
  console.log({rooms})
  return rooms;
}

const privateRoomRegex = /^(?:private|double|single|family|mixed pod twin)/i
const sharedRoomRegex = /\d+/

function getRoomType(roomName: string){
  if(privateRoomRegex.test(roomName)) return "private_bedroom";
  const nOfRooms = roomName.match(sharedRoomRegex);
  if(nOfRooms) return `${nOfRooms[0]}_shared`;
  return "private_bedroom";
}

function getBedType(roomName: string) {
  if (roomName.toLowerCase().includes("double")) {
    return "double_bed";
  } else if (roomName.toLowerCase().includes("single")) {
    return "single_bed";
  } 
  return "bunk_bed";
}

function getBathroomType(roomName: string){
  if (roomName.toLowerCase().includes("shared")) return "shared_bathroom";
  return "private_bathroom";
}