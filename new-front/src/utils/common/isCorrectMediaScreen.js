import { DESKTOP_MEDIA, TABLET_MEDIA, TABLET_MINI_MEDIA, MOBILE_MEDIA } from "../../consts"

export function isCorrectMediaScreen(width, parameterMedia) {
  switch (parameterMedia) {
    case DESKTOP_MEDIA.name:
      return width >= DESKTOP_MEDIA.size;
    case TABLET_MEDIA.name:
      return width >= TABLET_MEDIA.size;
    case TABLET_MINI_MEDIA.name:
      return width >= TABLET_MINI_MEDIA.size;
    case MOBILE_MEDIA.name:
      return width >= MOBILE_MEDIA.size;
    default:
      break;
  }
}