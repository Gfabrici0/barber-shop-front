export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  return `${hours}h`;
};