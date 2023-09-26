export function useTitle(title: string) {
  if (title || title !== "") {
    document.title = title;
  }
}
