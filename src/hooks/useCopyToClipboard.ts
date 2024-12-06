export default function useCopyToClipboard() {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('클립보드에 복사되었습니다.')
    } catch (e) {
      alert('복사에 실패하였습니다')
    }
  }
  return handleCopy
}
