import { Device } from '../ContextAds';
import { DeviceType } from '../../../generic/enums';

export const getDeviceWidth = () =>
  window.screen.width ||
  window.innerWidth ||
  window.document.documentElement.clientWidth ||
  Math.min(window.innerWidth, window.document.documentElement.clientWidth) ||
  window.innerWidth ||
  window.document.documentElement.clientWidth ||
  window.document.getElementsByTagName('body')[0].clientWidth;

export const getDevice = (): Device => {
  const width = getDeviceWidth();

  if (width < 641) {
    return DeviceType.Mobile;
  }

  if (width >= 641 && width < 1008) {
    return DeviceType.Tablet;
  }

  return DeviceType.Desktop;
};
