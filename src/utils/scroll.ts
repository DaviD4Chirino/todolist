export function scrollLeft(ref: React.RefObject<any>, scrollSpeed = 300) {
  const current = ref?.current;
  if (!current) return;
  current.scrollTo({
    left: current.scrollLeft - scrollSpeed,
    behavior: "smooth",
  });
}

export function scrollRight(ref: React.RefObject<any>, scrollSpeed = 300) {
  const current = ref?.current;
  if (!current) return;
  current.scrollTo({
    left: current.scrollLeft + scrollSpeed,
    behavior: "smooth",
  });
}
