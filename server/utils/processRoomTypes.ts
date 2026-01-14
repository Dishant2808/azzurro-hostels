import { RoomType, RoomTypeProcessed } from "../services/cloudbeds/api/types/roomTypes.types";
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export function processRoomTypes(data: RoomType[]): RoomTypeProcessed[] {
  return data.map((room): RoomTypeProcessed => {
    const safeHTML = DOMPurify.sanitize(room.roomTypeDescription);

    // Convert HTML to plain text
    const tempEl = window.document.createElement('div');
    tempEl.innerHTML = safeHTML;
    const plainText = tempEl.textContent || tempEl.innerText || '';

    return {
      ...room,
      roomTypeDescriptionText: plainText,
      roomTypeDescriptionJSX: safeHTML, // for Node this would just be HTML string
    };
  });
}
