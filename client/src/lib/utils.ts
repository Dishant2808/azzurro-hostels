import { AvailableRoomType } from "@/api/room.types"
import { clsx, type ClassValue } from "clsx"
import QueryString from "qs"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRoomCategoriesAsUrlQuery = (room: AvailableRoomType): string=>QueryString.stringify(getRoomCategories(room))

export const getRoomCategories = (room: AvailableRoomType)=>{
  const roomFilters = {
    roomType : getRoomType(room.roomTypeName),
    bedType : getBedType(room.roomTypeName),
    bathroomType : getBathroomType(room.roomTypeName)
  }
    
  return roomFilters;
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


